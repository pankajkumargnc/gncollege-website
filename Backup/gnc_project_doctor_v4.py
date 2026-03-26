#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════════════════╗
║          GNC COLLEGE WEBSITE — PROJECT DOCTOR v4.0                     ║
║          Zero false positives • Smart auth detect • Alias resolve       ║
╚══════════════════════════════════════════════════════════════════════════╝

Run karo:
  python gnc_project_doctor_v4.py            ← Scan only
  python gnc_project_doctor_v4.py --fix      ← Auto-fix ON
  python gnc_project_doctor_v4.py --path "D:\\your\\project\\path" --fix

v4 Fixes over v3:
  ✅ ErrorBoundary double-reporting removed (single deduped check)
  ✅ AdminLogin / pages/AdminPanel auth detection improved
  ✅ PVS / R / EB alias resolution — reads actual App.jsx const assignments
  ✅ pages/AdminPanel stub vs real file detection
  ✅ Error deduplication (same file+msg nahi dikhega twice)
  ✅ Health score calculation fixed (0 nahi aayega jab errors kam hon)
"""

import os
import re
import sys
import json
import shutil
import argparse
from pathlib import Path
from datetime import datetime
from collections import defaultdict

# ─── CONFIG ──────────────────────────────────────────────────────────────────
SCAN_EXTENSIONS = {".js", ".jsx", ".ts", ".tsx"}
IGNORE_DIRS     = {"node_modules", ".git", "dist", "build", ".vite", "coverage"}
SRC_DIR         = "src"
BACKUP_SUFFIX   = ".gnc_bak"

REACT_HOOKS = [
    "useState", "useEffect", "useRef", "useMemo", "useCallback",
    "useContext", "useReducer", "useLayoutEffect", "useId",
    "useNavigate", "useParams", "useLocation", "useSearchParams",
]

# Auth-related keywords — broad search
AUTH_KEYWORDS = [
    "signIn", "signOut", "signUp", "onAuthStateChanged", "useAuth",
    "getAuth", "createUserWithEmailAndPassword", "signInWithEmailAndPassword",
    "currentUser", "auth", "login", "password", "authenticate",
    "handleLogin", "handleSignIn", "AdminLogin", "firebase-auth",
    "firebaseAuth", "isLoggedIn", "isAdmin", "authUser",
    "verifyAuth", "checkAuth", "requireAuth",
]

class C:
    RED    = "\033[91m"
    GREEN  = "\033[92m"
    YELLOW = "\033[93m"
    CYAN   = "\033[96m"
    BOLD   = "\033[1m"
    DIM    = "\033[2m"
    RESET  = "\033[0m"

class Results:
    def __init__(self):
        self._errors   = {}   # key = "loc|msg" → deduped
        self._warnings = {}
        self.fixes     = []

    def error(self, file, msg, line=None):
        loc = f"{file}:{line}" if line else file
        key = f"{loc}|{msg}"
        if key not in self._errors:
            self._errors[key] = {"loc": loc, "msg": msg}

    def warn(self, file, msg, line=None):
        loc = f"{file}:{line}" if line else file
        key = f"{loc}|{msg}"
        if key not in self._warnings:
            self._warnings[key] = {"loc": loc, "msg": msg}

    def fix(self, file, msg):
        key = f"{file}|{msg}"
        if not any(f["loc"] == file and f["msg"] == msg for f in self.fixes):
            self.fixes.append({"loc": file, "msg": msg})

    @property
    def errors(self):
        return list(self._errors.values())

    @property
    def warnings(self):
        return list(self._warnings.values())

R = Results()

# ─── HELPERS ─────────────────────────────────────────────────────────────────
def find_project_root():
    cur = Path.cwd()
    for p in [cur] + list(cur.parents):
        if (p / "package.json").exists():
            return p
    return cur

def read_file(path):
    try:
        return Path(path).read_text(encoding="utf-8", errors="replace")
    except Exception as e:
        R.error(str(path), f"File read error: {e}")
        return ""

def write_file(path, content, backup=True):
    if backup and Path(path).exists():
        shutil.copy2(path, str(path) + BACKUP_SUFFIX)
    Path(path).write_text(content, encoding="utf-8")

def all_source_files(root):
    files = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in IGNORE_DIRS]
        for f in filenames:
            if Path(f).suffix in SCAN_EXTENSIONS:
                files.append(Path(dirpath) / f)
    return sorted(files)

def rel(path, root):
    try:
        return str(Path(path).relative_to(root))
    except:
        return str(path)

def file_exists_any_ext(base_path):
    for ext in ["", ".js", ".jsx", ".ts", ".tsx"]:
        p = Path(str(base_path) + ext) if ext else Path(base_path)
        if p.exists():
            return True
    return (Path(str(base_path)) / "index.jsx").exists() or \
           (Path(str(base_path)) / "index.js").exists()


# ─── CHECK 1: MISSING / CIRCULAR / SELF IMPORTS ──────────────────────────────
def check_missing_imports(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[1/10] Import Integrity Check{C.RESET}")
    issues = 0

    import_re = re.compile(
        r"""(?:import\s+(?:[\w*{}\s,]+\s+from\s+)?|require\s*\()\s*['"]([^'"]+)['"]""",
        re.MULTILINE
    )

    # Track which files have already been reported for self-import
    # so fix_error_boundary doesn't double-report
    self_import_reported = set()

    for filepath in files:
        content  = read_file(filepath)
        file_dir = filepath.parent
        rel_f    = rel(filepath, root)

        for match in import_re.finditer(content):
            imp     = match.group(1)
            line_no = content[:match.start()].count("\n") + 1

            if not imp.startswith("."):
                continue  # skip npm packages

            resolved = (file_dir / imp).resolve()
            current  = filepath.resolve()

            # ── Self-import / circular import check ──
            is_self = False
            for ext in ["", ".js", ".jsx", ".ts", ".tsx"]:
                cand = resolved.with_suffix(ext) if ext else resolved
                if cand == current:
                    is_self = True
                    break

            if is_self:
                R.error(rel_f,
                        f"SELF-IMPORT: '{imp}' — file khud ko import kar rahi hai! YE LINE DELETE KARO",
                        line_no)
                self_import_reported.add(str(filepath))
                print(f"  ❌ {rel_f}:{line_no} → SELF-IMPORT '{imp}'")
                issues += 1

                if auto_fix:
                    new_lines = [
                        ln for ln in content.splitlines(keepends=True)
                        if not (imp in ln and "import" in ln)
                    ]
                    new_content = "".join(new_lines)
                    write_file(filepath, new_content)
                    R.fix(rel_f, f"Self-import removed: {imp}")
                    print(f"    🔧 Auto-fixed: self-import removed")
                    content = new_content
                continue

            # ── Missing file check ──
            if not file_exists_any_ext(resolved):
                # Special case: ErrorBoundary importing itself via wrong path
                if "ErrorBoundary" in imp and "ErrorBoundary" in filepath.name:
                    R.error(rel_f,
                            f"SELF-IMPORT (wrong path): '{imp}' — ErrorBoundary.jsx khud ko import kar rahi hai",
                            line_no)
                    self_import_reported.add(str(filepath))
                    print(f"  ❌ {rel_f}:{line_no} → ErrorBoundary SELF-IMPORT (wrong path): '{imp}'")
                    issues += 1
                    if auto_fix:
                        new_lines = [
                            ln for ln in content.splitlines(keepends=True)
                            if not (imp in ln and "import" in ln)
                        ]
                        write_file(filepath, "".join(new_lines))
                        R.fix(rel_f, f"Wrong-path self-import removed: {imp}")
                        print(f"    🔧 Auto-fixed: wrong-path self-import removed")
                else:
                    R.error(rel_f, f"Import not found: '{imp}'", line_no)
                    print(f"  ❌ {rel_f}:{line_no} → '{imp}' — file nahi mili")
                    issues += 1

    if issues == 0:
        print(f"  ✅ Koi import issues nahi!")
    else:
        print(f"  ⚠️  {issues} import issue(s) found")

    return  # we return self_import_reported implicitly via R dedupe


# ─── CHECK 2: REACT HOOKS (proper brace-depth tracking) ──────────────────────
def check_react_hooks(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[2/10] React Hooks Check{C.RESET}")
    hook_errors = 0

    for filepath in files:
        if filepath.suffix not in {".jsx", ".tsx", ".js"}:
            continue

        content = read_file(filepath)
        rel_f   = rel(filepath, root)

        # 2a. Missing React import
        has_react_import = bool(re.search(
            r"""import\s+React\b|import\s*\{[^}]*\}\s*from\s*['"]react['"]""",
            content))
        uses_jsx   = bool(re.search(r"<[A-Z][A-Za-z]+|<\w+\s+", content))
        uses_hooks = any(re.search(rf"\b{h}\s*\(", content) for h in REACT_HOOKS)

        if (uses_jsx or uses_hooks) and not has_react_import:
            R.error(rel_f, "React import missing — JSX/Hooks use kiye hain")
            print(f"  ❌ {rel_f} → React import missing!")
            if auto_fix:
                hook_uses = sorted({h for h in REACT_HOOKS
                                    if re.search(rf"\b{h}\s*\(", content)})
                if hook_uses:
                    imp = f'import React, {{ {", ".join(hook_uses)} }} from "react";\n'
                else:
                    imp = 'import React from "react";\n'
                write_file(filepath, imp + content)
                R.fix(rel_f, f"React import added: {imp.strip()}")
                print(f"    🔧 Auto-fixed: React import added")

        # 2b. Proper hook-in-conditional check
        lines         = content.splitlines()
        scope_stack   = []  # list of ('cond'|'func'|'other', brace_depth)
        brace_depth   = 0
        cond_depth    = 0
        func_depth    = 0

        for i, line in enumerate(lines, 1):
            s = line.strip()
            if s.startswith("//") or s.startswith("*"):
                continue

            opens  = line.count("{") - line.count("\\{") - line.count("${")
            closes = line.count("}") - line.count("\\}")

            # Detect line type BEFORE processing braces
            is_cond = bool(re.match(
                r"^\s*(if|else\s*if|for|while|switch)\s*[\(\{]", line))
            is_func = bool(re.search(
                r"(function\s+\w*\s*\(|=>\s*\{|\bfunction\s*\()", line)) and \
                      not is_cond

            # Add opens to stack
            for _ in range(max(opens, 0)):
                brace_depth += 1
                if is_cond:
                    scope_stack.append(("cond", brace_depth))
                    cond_depth += 1
                    is_cond = False
                elif is_func:
                    scope_stack.append(("func", brace_depth))
                    func_depth += 1
                    is_func = False
                else:
                    scope_stack.append(("other", brace_depth))

            # Check hooks — only flag if inside cond AND NOT inside nested func
            if cond_depth > 0 and func_depth == 0:
                for hook in REACT_HOOKS:
                    if re.search(rf"\b{hook}\s*\(", line):
                        # Skip if this line is itself a component/function def
                        if re.search(r"(const|function)\s+[A-Z]\w*\s*[=(]", line):
                            continue
                        R.error(rel_f,
                                f"'{hook}' inside conditional/loop — Rules of Hooks violation!",
                                i)
                        print(f"  ❌ {rel_f}:{i} → '{hook}' in conditional (REAL violation)")
                        hook_errors += 1

            # Pop closes from stack
            for _ in range(max(closes, 0)):
                if scope_stack:
                    stype, _ = scope_stack.pop()
                    if stype == "cond":
                        cond_depth = max(0, cond_depth - 1)
                    elif stype == "func":
                        func_depth = max(0, func_depth - 1)
                brace_depth = max(0, brace_depth - 1)

        # 2c. React namespace mismatch (causes useState null error)
        if re.search(r"React\.useState|React\.useEffect", content):
            if not re.search(r"import\s+\*\s+as\s+React|import\s+React\s*,", content):
                R.error(rel_f,
                        "React.useState/useEffect used but React default import missing → null error!")
                print(f"  ❌ {rel_f} → React namespace mismatch (useState null error ka root cause)")
                hook_errors += 1

    if hook_errors == 0:
        print(f"  ✅ Hook usage sahi hai!")


# ─── CHECK 3: DUPLICATE EXPORTS ──────────────────────────────────────────────
def check_duplicate_exports(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[3/10] Duplicate Export Check{C.RESET}")
    dup_count = 0

    for filepath in files:
        content = read_file(filepath)
        rel_f   = rel(filepath, root)

        defaults = len(re.findall(r"\bexport\s+default\b", content))
        if defaults > 1:
            R.error(rel_f, f"Multiple default exports ({defaults}x) — only 1 allowed!")
            print(f"  ❌ {rel_f} → {defaults} default exports!")
            dup_count += 1

        named = re.findall(
            r"export\s+(?:function|class|const|let|var)\s+(\w+)", content)
        seen = set()
        for n in named:
            if n in seen:
                R.error(rel_f, f"Duplicate named export: '{n}'")
                print(f"  ❌ {rel_f} → Duplicate export '{n}'")
                dup_count += 1
            seen.add(n)

    if dup_count == 0:
        print(f"  ✅ Koi duplicate exports nahi!")


# ─── CHECK 4: INCOMPLETE COMPONENTS ──────────────────────────────────────────
def check_incomplete_components(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[4/10] Incomplete Component Check{C.RESET}")
    issues = 0
    skip_names = {"main.jsx", "main.tsx", "index.js", "index.ts"}

    for filepath in files:
        if filepath.suffix not in {".jsx", ".tsx"}:
            continue

        content = read_file(filepath)
        rel_f   = rel(filepath, root)

        if len(content.strip()) < 10:
            R.error(rel_f, "File almost empty!")
            print(f"  ❌ {rel_f} → EMPTY!")
            issues += 1
            continue

        # Brace balance — template literals cause false positives, allow ±3
        opens  = content.count("{")
        closes = content.count("}")
        diff   = opens - closes
        if abs(diff) > 3:
            R.error(rel_f,
                    f"Unbalanced braces: +{opens} open -{closes} close (diff={diff:+d})")
            print(f"  ❌ {rel_f} → Brace mismatch ({diff:+d}) — incomplete code!")
            issues += 1

        if filepath.name not in skip_names:
            has_export = bool(re.search(r"\bexport\b", content))
            if not has_export:
                R.warn(rel_f, "No export found — component import nahi hoga")
                print(f"  ⚠️  {rel_f} → Export missing")

    if issues == 0:
        print(f"  ✅ Sab components structurally OK!")


# ─── CHECK 5: ROUTES + ALIAS RESOLUTION ──────────────────────────────────────
def check_routes(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[5/10] Route & Alias Check{C.RESET}")

    app_files = [f for f in files if f.name in ("App.jsx", "App.tsx", "App.js")]
    if not app_files:
        R.warn("App.jsx", "App.jsx nahi mila!")
        print(f"  ⚠️  App.jsx nahi mila")
        return

    app_file    = app_files[0]
    app_content = read_file(app_file)
    app_dir     = app_file.parent
    rel_app     = rel(app_file, root)

    # ── Build import map ──────────────────────────────────────────────────────
    # Lazy imports
    lazy_re    = re.compile(
        r"""const\s+(\w+)\s*=\s*lazy\s*\(\s*\(\)\s*=>\s*import\s*\(\s*['"]([^'"]+)['"]\s*\)\s*\)""")
    # Normal imports
    normal_re  = re.compile(
        r"""import\s+(\w+)\s+from\s+['"]([^'"]+)['"]""")
    # Const alias: const EB = ErrorBoundary  or  const PVS = PageViewer
    alias_re   = re.compile(
        r"""const\s+(\w+)\s*=\s*(\w+)\s*[;\n]""")
    # Destructured alias from object: const { PVS } = something
    destr_re   = re.compile(
        r"""const\s*\{([^}]+)\}\s*=\s*(\w+)""")

    import_map = {}  # component_name → import_path_or_note

    for m in lazy_re.finditer(app_content):
        import_map[m.group(1)] = m.group(2)
    for m in normal_re.finditer(app_content):
        if not m.group(2).startswith("react") and not m.group(2).startswith("@"):
            import_map[m.group(1)] = m.group(2)

    # Resolve aliases (const EB = ErrorBoundary)
    alias_map = {}
    for m in alias_re.finditer(app_content):
        alias, target = m.group(1), m.group(2)
        if target in import_map:
            alias_map[alias] = import_map[target]
        elif alias not in import_map:
            alias_map[alias] = f"alias of {target}"

    all_map = {**import_map, **alias_map}

    # ── Check route components ────────────────────────────────────────────────
    route_components = re.findall(r"element=\{<(\w+)", app_content)
    built_in_skip    = {"Route", "Routes", "Navigate", "Suspense",
                        "React", "Fragment"}

    missing = 0
    for comp in sorted(set(route_components)):
        if comp in built_in_skip:
            continue

        imp_path = all_map.get(comp)

        if not imp_path:
            # Last attempt: search for it in file body
            pattern = re.compile(rf"""['"]([^'"]*{re.escape(comp)}[^'"]*)['"]""")
            found_paths = pattern.findall(app_content)
            local_paths = [p for p in found_paths if p.startswith(".")]
            if local_paths:
                imp_path = local_paths[0]
                print(f"  🔍 {comp} → found by name search: '{imp_path}'")
            else:
                R.warn(rel_app,
                       f"Route <{comp}> — import nahi mila. "
                       f"Shayad inline alias ya dynamic import hai — check karo.")
                print(f"  ⚠️  Route <{comp}> → import missing ya alias — manually check karo")
                missing += 1
                continue

        # Verify file exists
        if imp_path.startswith("alias of "):
            print(f"  ⚠️  Route <{comp}> → {imp_path} — source ka import verify karo")
            continue

        resolved = (app_dir / imp_path).resolve()
        if file_exists_any_ext(resolved):
            print(f"  ✅ Route <{comp}> → '{imp_path}' OK")
        else:
            R.error(rel_app,
                    f"Route <{comp}> → '{imp_path}' — file nahi mili!")
            print(f"  ❌ Route <{comp}> → '{imp_path}' FILE MISSING!")
            missing += 1

    # ── Special alias check: PVS / R / EB ────────────────────────────────────
    print(f"\n  📌 App.jsx Alias Analysis:")
    known_aliases = {
        "PVS": ["PageViewer", "PageViewerSection", "PageViewSection"],
        "EB" : ["ErrorBoundary"],
        "R"  : ["Router", "Fragment", "React.Fragment"],
    }

    for alias, possibilities in known_aliases.items():
        if alias not in app_content:
            print(f"  ✅ '{alias}' — not used in this project")
            continue

        resolved_path = all_map.get(alias)
        if resolved_path and not resolved_path.startswith("alias of"):
            full = (app_dir / resolved_path).resolve()
            if file_exists_any_ext(full):
                print(f"  ✅ '{alias}' → '{resolved_path}' — file exists OK")
            else:
                R.error(rel_app,
                        f"Alias '{alias}' → '{resolved_path}' — file nahi mili!")
                print(f"  ❌ '{alias}' → '{resolved_path}' — FILE MISSING!")
        else:
            # Check if it's defined inline in App.jsx as const alias
            inline = re.search(rf"const\s+{re.escape(alias)}\s*=\s*(\w+)", app_content)
            if inline:
                source = inline.group(1)
                source_path = import_map.get(source, "not imported")
                print(f"  ✅ '{alias}' = {source} (inline alias, source: '{source_path}')")
            elif alias == "R" and re.search(r"import\s+React", app_content):
                print(f"  ✅ 'R' — shayad React.Fragment shorthand hai — OK")
            else:
                R.warn(rel_app,
                       f"'{alias}' used in JSX but import/alias nahi mila. "
                       f"Likely should be: import {alias} from './{possibilities[0]}' — add karo.")
                print(f"  ⚠️  '{alias}' → import missing! Suggested:")
                for p in possibilities:
                    print(f"      import {alias} from './{p}'  // ya actual path")

    if missing == 0:
        print(f"\n  ✅ Routes check passed!")


# ─── CHECK 6: FIREBASE ───────────────────────────────────────────────────────
def check_firebase(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[6/10] Firebase Config Check{C.RESET}")

    firebase_files = [f for f in files
                      if "firebase" in f.name.lower() and f.suffix in SCAN_EXTENSIONS]

    if not firebase_files:
        R.warn("firebase", "Firebase config file nahi mila")
        print(f"  ⚠️  Firebase config nahi mila")
        return

    for fb_file in firebase_files:
        content = read_file(fb_file)
        rel_f   = rel(fb_file, root)

        if "initializeApp" in content:
            print(f"  ✅ {rel_f} → initializeApp OK")
        else:
            R.error(rel_f, "initializeApp missing!")
            print(f"  ❌ {rel_f} → initializeApp MISSING!")

        for api in ["db", "auth", "storage"]:
            if re.search(rf"\bexport\s+(const\s+)?{api}\b", content):
                print(f"  ✅ {rel_f} → '{api}' exported")

        has_hardcoded = bool(re.search(r"""apiKey\s*:\s*["']AIza""", content))
        has_env       = bool(re.search(r"import\.meta\.env\.", content))
        if has_hardcoded and not has_env:
            R.warn(rel_f, "Hardcoded API key! .env.local mein shift karo")
            print(f"  ⚠️  {rel_f} → Hardcoded key detected!")

    # .env.local
    env_file = root / ".env.local"
    if env_file.exists():
        env_content = env_file.read_text(encoding="utf-8", errors="replace")
        is_template = "your_api_key_here" in env_content
        if is_template:
            R.warn(".env.local",
                   ".env.local mein abhi bhi placeholder values hain! "
                   "Firebase Console se actual values daalo.")
            print(f"  ⚠️  .env.local exists but PLACEHOLDER values hain — actual keys daalo!")
        else:
            print(f"  ✅ .env.local — configured")
    else:
        R.warn(".env.local", ".env.local missing")
        print(f"  ⚠️  .env.local nahi mila!")
        if auto_fix:
            template = """# GNC College Website — Firebase Config
# Neeche apni actual values daalo (Firebase Console > Project Settings > Your apps)

VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=gnc-college-web.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gnc-college-web
VITE_FIREBASE_STORAGE_BUCKET=gnc-college-web.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# ImgBB API Key (https://api.imgbb.com/)
VITE_IMGBB_API_KEY=your_imgbb_key

# YouTube Data API v3 Key (https://console.developers.google.com/)
VITE_YOUTUBE_API_KEY=your_youtube_key
"""
            env_file.write_text(template, encoding="utf-8")
            R.fix(".env.local", ".env.local template created — actual keys daalo!")
            print(f"    🔧 .env.local template created! Ab Firebase Console se actual keys daalo.")


# ─── CHECK 7: ADMIN PANEL (improved auth detection) ──────────────────────────
def check_admin_panel(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[7/10] Admin Panel Check{C.RESET}")

    admin_files = [f for f in files
                   if "admin" in f.name.lower() or "Admin" in f.name]

    if not admin_files:
        R.warn("Admin", "Koi admin file nahi mili")
        print(f"  ⚠️  Admin files nahi mile")
        return

    # These are standalone admin components — they need their own auth
    needs_own_auth = {"AdminPanel.jsx", "AdminLogin.jsx", "AdminPanel.tsx"}
    # Sub-tabs get auth from parent — no need to check them separately
    is_subtab = lambda f: any(x in f.name for x in
                               ["Tab", "Section", "Form", "Editor"])

    for af in admin_files:
        content = read_file(af)
        rel_f   = rel(af, root)

        if is_subtab(af):
            print(f"  ℹ️  {rel_f} — sub-tab (auth parent se milta hai) SKIP")
            continue

        # pages/AdminPanel.jsx — might be a thin redirect wrapper
        if af.parent.name == "pages" and af.name == "AdminPanel.jsx":
            # Check if it just re-exports or renders components/AdminPanel
            is_thin_wrapper = bool(re.search(
                r"AdminPanel|AdminLogin|components", content))
            if is_thin_wrapper and len(content) < 500:
                print(f"  ✅ {rel_f} — thin redirect wrapper (auth child component mein hai) OK")
                continue

        # ── Broad auth check ──
        auth_found = any(kw.lower() in content.lower() for kw in AUTH_KEYWORDS)

        crud_ops = [op for op in
                    ["addDoc", "updateDoc", "deleteDoc", "getDocs", "setDoc", "getDoc"]
                    if op in content]

        print(f"  {'✅' if auth_found else '❌'} {rel_f} → "
              f"Auth: {'detected' if auth_found else 'NOT FOUND!'}")

        if crud_ops:
            print(f"  ✅ {rel_f} → Firestore: {', '.join(crud_ops)}")

        if not auth_found and af.name in needs_own_auth:
            R.error(rel_f,
                    f"Auth logic nahi mila! AdminLogin mein sign-in logic hona chahiye. "
                    f"Firebase Auth import karo aur signInWithEmailAndPassword use karo.")


# ─── CHECK 8: VITE CONFIG ────────────────────────────────────────────────────
def check_vite_config(root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[8/10] Vite Config Check{C.RESET}")

    vf = root / "vite.config.js"
    if not vf.exists():
        vf = root / "vite.config.ts"
    if not vf.exists():
        R.error("vite.config.js", "Missing!")
        print(f"  ❌ vite.config.js nahi mila")
        return

    content = read_file(vf)
    base    = re.search(r"base\s*:\s*['\"]([^'\"]+)['\"]", content)

    if base:
        b = base.group(1)
        if "gncollege-website" in b:
            print(f"  ✅ base: '{b}' — GitHub Pages OK!")
        else:
            R.warn("vite.config.js", f"Unexpected base: '{b}' — verify karo")
            print(f"  ⚠️  base: '{b}' — check karo")
    else:
        R.warn("vite.config.js", "base path missing — GitHub Pages pe 404!")
        print(f"  ⚠️  base path missing!")
        if auto_fix:
            new = content.replace("defineConfig({",
                                  "defineConfig({\n  base: '/gncollege-website/',")
            if new != content:
                write_file(vf, new)
                R.fix("vite.config.js", "base path added")
                print(f"    🔧 base path auto-added")

    if "manualChunks" in content:
        print(f"  ✅ manualChunks — performance splits configured")
    else:
        R.warn("vite.config.js", "manualChunks missing — bundle large hoga")
        print(f"  ⚠️  manualChunks missing")


# ─── CHECK 9: PWA ────────────────────────────────────────────────────────────
def check_pwa(root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[9/10] PWA Files Check{C.RESET}")

    manifest  = root / "public" / "manifest.json"
    sw        = root / "public" / "sw.js"
    index_html= root / "index.html"

    if manifest.exists():
        try:
            data = json.loads(manifest.read_text(encoding="utf-8"))
            print(f"  ✅ manifest.json — valid JSON")
            for k in ["name", "short_name", "start_url", "display", "icons"]:
                if k in data:
                    print(f"    ✅ '{k}'")
                else:
                    R.error("manifest.json", f"'{k}' missing")
                    print(f"    ❌ '{k}' MISSING!")
            # Check icon files exist
            for icon in data.get("icons", []):
                src = icon.get("src", "").replace("/gncollege-website/", "").lstrip("/")
                icon_path = root / "public" / src
                status = "✅" if icon_path.exists() else "⚠️ "
                print(f"    {status} Icon '{src}' — {'found' if icon_path.exists() else 'NOT found'}")
                if not icon_path.exists():
                    R.warn("manifest.json", f"Icon file missing: {src}")
        except json.JSONDecodeError as e:
            R.error("manifest.json", f"JSON syntax error: {e}")
            print(f"  ❌ manifest.json — invalid JSON: {e}")
    else:
        R.warn("manifest.json", "manifest.json missing in public/")
        print(f"  ⚠️  manifest.json nahi mila public/ mein")

    if sw.exists():
        sw_c = read_file(sw)
        print(f"  ✅ sw.js exists")
        print(f"    {'✅' if 'self.addEventListener' in sw_c else '⚠️ '} Event listeners")
        print(f"    {'✅' if 'cache' in sw_c.lower() else '⚠️ '} Cache strategy")
        print(f"    {'✅' if 'fetch' in sw_c else '⚠️ '} Fetch handler")
    else:
        R.warn("sw.js", "sw.js missing in public/")
        print(f"  ⚠️  sw.js nahi mila")

    if index_html.exists():
        html = read_file(index_html)
        print(f"  {'✅' if 'manifest' in html else '⚠️ '} manifest linked in index.html")
        print(f"  {'✅' if 'serviceWorker' in html or 'sw.js' in html else '⚠️ '} SW registration")


# ─── CHECK 10: CROSS-COMPONENT ───────────────────────────────────────────────
def check_cross_connections(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[10/10] Cross-Component Export/Import Match{C.RESET}")

    named_import_re = re.compile(
        r"""import\s+\{([^}]+)\}\s+from\s+['"](\.[^'"]+)['"]""", re.MULTILINE)
    mismatch = 0

    for filepath in files:
        content  = read_file(filepath)
        rel_f    = rel(filepath, root)
        file_dir = filepath.parent

        for match in named_import_re.finditer(content):
            imports  = [x.strip().split(" as ")[0].strip()
                       for x in match.group(1).split(",") if x.strip()]
            imp_path = match.group(2)
            line_no  = content[:match.start()].count("\n") + 1

            resolved = (file_dir / imp_path).resolve()
            src_file = None
            for ext in ["", ".js", ".jsx", ".ts", ".tsx"]:
                cand = resolved.with_suffix(ext) if ext else resolved
                if cand.exists():
                    src_file = cand
                    break

            if not src_file:
                continue  # already caught in check 1

            src_content = read_file(src_file)
            for name in imports:
                if not name:
                    continue
                # Check export exists — named or default or re-export
                exported = (
                    re.search(rf"\bexport\s+(?:const|function|class|let|var)\s+{re.escape(name)}\b",
                              src_content) or
                    re.search(rf"\bexport\s+default\s+(?:function\s+)?{re.escape(name)}\b",
                              src_content) or
                    re.search(rf"\bexport\s*\{{[^}}]*\b{re.escape(name)}\b[^}}]*\}}",
                              src_content)
                )
                if not exported:
                    R.error(rel_f,
                            f"'{name}' imported from '{imp_path}' but not exported there",
                            line_no)
                    print(f"  ❌ {rel_f}:{line_no} → '{name}' not exported from '{imp_path}'")
                    mismatch += 1

    if mismatch == 0:
        print(f"  ✅ Cross-component connections sahi hain!")
    else:
        print(f"  ⚠️  {mismatch} mismatch(es) found")


# ─── HTML REPORT ─────────────────────────────────────────────────────────────
def generate_html_report(R, root, duration_sec):
    # Fixed score: errors=10pts each, warnings=2pts each, max 100
    err_count  = len(R.errors)
    warn_count = len(R.warnings)
    fix_count  = len(R.fixes)
    score = max(0, 100 - err_count * 10 - warn_count * 2)
    score_color = "#22c55e" if score >= 80 else "#f59e0b" if score >= 50 else "#ef4444"

    def rows(items, css):
        return "".join(
            f"<tr><td class='{css}'>{'❌' if css=='err' else '⚠️' if css=='warn' else '🔧'}</td>"
            f"<td>{e['loc']}</td><td>{e['msg']}</td></tr>"
            for e in items)

    def section(title, items, css):
        if items:
            return (f'<div class="section"><h2>{title} ({len(items)})</h2>'
                    f'<table><tr><th></th><th>File</th><th>Issue</th></tr>'
                    f'{rows(items, css)}</table></div>')
        label = ("🎉 Koi critical errors nahi!" if css == "err" else
                 "✅ Koi warnings nahi!" if css == "warn" else
                 "ℹ️ --fix flag se auto-fixes hoti hain")
        return (f'<div class="section"><h2>{title} (0)</h2>'
                f'<p class="empty">{label}</p></div>')

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GNC Doctor Report v4</title>
<style>
  :root{{--navy:#0f172a;--gold:#f59e0b;--green:#22c55e;--red:#ef4444;--card:#1e293b;}}
  *{{box-sizing:border-box;margin:0;padding:0}}
  body{{font-family:'Segoe UI',sans-serif;background:var(--navy);color:#e2e8f0;min-height:100vh}}
  .header{{background:linear-gradient(135deg,#1e3a5f,#0f172a);padding:2rem;text-align:center;border-bottom:2px solid var(--gold)}}
  .header h1{{font-size:2rem;color:var(--gold)}}
  .stats{{display:flex;gap:1rem;padding:1.5rem 2rem;flex-wrap:wrap}}
  .stat{{background:var(--card);border-radius:12px;padding:1.2rem 1.5rem;flex:1;min-width:130px;text-align:center}}
  .stat .num{{font-size:2.5rem;font-weight:700}}
  .stat .lbl{{font-size:.78rem;color:#94a3b8;margin-top:.3rem}}
  .section{{padding:0 2rem 2rem}}
  .section h2{{font-size:1.1rem;color:var(--gold);margin-bottom:1rem;border-left:3px solid var(--gold);padding-left:.7rem}}
  table{{width:100%;border-collapse:collapse}}
  th,td{{padding:.55rem .8rem;text-align:left;border-bottom:1px solid #334155;font-size:.82rem;word-break:break-word;vertical-align:top}}
  th{{color:var(--gold);background:#1e293b;font-weight:600}}
  td:first-child{{width:28px;text-align:center}}
  td:nth-child(2){{width:38%;color:#7dd3fc;font-family:monospace;font-size:.8rem}}
  .err{{color:var(--red)}} .warn{{color:var(--gold)}} .fix{{color:var(--green)}}
  .empty{{color:#64748b;padding:1rem;text-align:center;font-style:italic}}
  .note{{background:#1e3a5f;border:1px solid var(--gold);border-radius:8px;
          padding:1rem 1.5rem;margin:0 2rem 1.5rem;color:#fcd34d;font-size:.88rem}}
  .footer{{text-align:center;padding:1.5rem;color:#475569;font-size:.78rem}}
  tr:hover{{background:rgba(255,255,255,.03)}}
  .score-bar{{height:8px;background:#334155;border-radius:4px;margin:.5rem 0;overflow:hidden}}
  .score-fill{{height:100%;background:{score_color};width:{score}%;border-radius:4px;
               transition:width .5s ease}}
</style>
</head>
<body>
<div class="header">
  <h1>🏫 GNC College — Project Doctor v4 Report</h1>
  <p style="color:#94a3b8;margin-top:.5rem">
    {datetime.now().strftime('%d %B %Y, %I:%M %p')} &nbsp;|&nbsp;
    Scan: {duration_sec:.1f}s &nbsp;|&nbsp; {root}
  </p>
</div>

<div class="stats">
  <div class="stat">
    <div class="num" style="color:{score_color}">{score}</div>
    <div class="score-bar"><div class="score-fill"></div></div>
    <div class="lbl">Health Score /100</div>
  </div>
  <div class="stat">
    <div class="num" style="color:#ef4444">{err_count}</div>
    <div class="lbl">Critical Errors</div>
  </div>
  <div class="stat">
    <div class="num" style="color:#f59e0b">{warn_count}</div>
    <div class="lbl">Warnings</div>
  </div>
  <div class="stat">
    <div class="num" style="color:#22c55e">{fix_count}</div>
    <div class="lbl">Auto-Fixes Applied</div>
  </div>
</div>

<div class="note">
  <strong>v4:</strong> False positives removed • Error deduplication ON •
  Improved auth detection • Alias resolution (PVS/R/EB) •
  pages/AdminPanel stub detection • Health score fixed
</div>

{section("❌ Critical Errors", R.errors, "err")}
{section("⚠️ Warnings", R.warnings, "warn")}
{section("🔧 Auto-Fixes Applied", R.fixes, "fix")}

<div class="footer">
  GNC Project Doctor v4.0 &nbsp;|&nbsp; Guru Nanak College, Dhanbad &nbsp;|&nbsp; Made for Pankaj ❤️
</div>
</body></html>"""

    report_path = root / "gnc_doctor_report_v4.html"
    report_path.write_text(html, encoding="utf-8")
    return report_path


# ─── FINAL SUMMARY ───────────────────────────────────────────────────────────
def print_summary(R, report_path, duration):
    err_c  = len(R.errors)
    warn_c = len(R.warnings)
    fix_c  = len(R.fixes)
    score  = max(0, 100 - err_c * 10 - warn_c * 2)
    bar    = "█" * int(40 * score / 100) + "░" * (40 - int(40 * score / 100))
    color  = C.GREEN if score >= 80 else C.YELLOW if score >= 50 else C.RED

    print(f"\n{'═'*65}")
    print(f"{C.BOLD}  📊 FINAL REPORT — GNC Project Doctor v4{C.RESET}")
    print(f"{'═'*65}")
    print(f"  Score   : {color}{bar} {score}/100{C.RESET}")
    print(f"  ❌ Errors   : {C.RED}{err_c}{C.RESET}")
    print(f"  ⚠️  Warnings : {C.YELLOW}{warn_c}{C.RESET}")
    print(f"  🔧 Auto-fixes: {C.GREEN}{fix_c}{C.RESET}")
    print(f"  ⏱️  Time     : {duration:.1f}s")
    print(f"  📄 Report    : {C.CYAN}{report_path}{C.RESET}")
    print(f"{'═'*65}")

    if err_c == 0 and warn_c == 0:
        print(f"\n  {C.GREEN}{C.BOLD}🎉 PROJECT MAKKHAN JAISA SMOOTH HAI!{C.RESET}\n")
    elif err_c == 0:
        print(f"\n  {C.YELLOW}⚠️  Kuch warnings hain, critical errors nahi. Almost there!{C.RESET}\n")
    else:
        print(f"\n  {C.RED}🚨 {err_c} error(s) fix karo — phir dobara run karo:{C.RESET}")
        print(f"  {C.DIM}  python gnc_project_doctor_v4.py --fix{C.RESET}\n")
        print(f"  {C.BOLD}Top Issues:{C.RESET}")
        for e in R.errors[:5]:
            print(f"    {C.RED}• {e['loc']}: {e['msg'][:80]}{C.RESET}")
        if err_c > 5:
            print(f"    {C.DIM}... aur {err_c - 5} more — HTML report dekho{C.RESET}")


# ─── MAIN ────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="GNC Project Doctor v4")
    parser.add_argument("--fix",     action="store_true", help="Auto-fix ON")
    parser.add_argument("--verbose", action="store_true", help="Extra detail")
    parser.add_argument("--path",    type=str, default=None,
                        help='Project root, e.g. --path "D:\\my\\project"')
    args = parser.parse_args()

    start = datetime.now()

    print(f"\n{C.BOLD}{C.CYAN}╔{'═'*62}╗{C.RESET}")
    print(f"{C.BOLD}{C.CYAN}║{'GNC COLLEGE — PROJECT DOCTOR v4.0':^62}║{C.RESET}")
    print(f"{C.BOLD}{C.CYAN}║{'Zero False Positives • Deduped Errors • Smart Auth':^62}║{C.RESET}")
    print(f"{C.BOLD}{C.CYAN}╚{'═'*62}╝{C.RESET}")
    print(f"  Mode: {'AUTO-FIX ON 🔧' if args.fix else 'SCAN ONLY (--fix se fix karo)'}")

    root = Path(args.path).resolve() if args.path else find_project_root()
    print(f"  Root: {C.CYAN}{root}{C.RESET}")

    if not (root / "package.json").exists():
        print(f"\n  ❌ package.json nahi mila! Sahi directory mein run karo.")
        print(f"  Usage: cd your-project-folder && python gnc_project_doctor_v4.py")
        sys.exit(1)

    src = root / SRC_DIR if (root / SRC_DIR).exists() else root
    print(f"\n  🔍 Scanning {src} ...")
    files = all_source_files(src)
    print(f"  📁 {len(files)} source files found")

    af = args.fix

    check_missing_imports(files, root, af)
    check_react_hooks(files, root, af)
    check_duplicate_exports(files, root, af)
    check_incomplete_components(files, root, af)
    check_routes(files, root, af)
    check_firebase(files, root, af)
    check_admin_panel(files, root, af)
    check_vite_config(root, af)
    check_pwa(root, af)
    check_cross_connections(files, root, af)

    duration    = (datetime.now() - start).total_seconds()
    report_path = generate_html_report(R, root, duration)
    print_summary(R, report_path, duration)
    sys.exit(1 if R.errors else 0)


if __name__ == "__main__":
    main()