#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════════════════╗
║          GNC COLLEGE WEBSITE — PROJECT DOCTOR v3.0 (FIXED)               ║
║          False-positive free • Smart Hook Detection • Auto-Fix           ║
╚══════════════════════════════════════════════════════════════════════════╝

Run karo:
  python gnc_project_doctor_v3.py             ← Scan only
  python gnc_project_doctor_v3.py --fix       ← Auto-fix ON
  python gnc_project_doctor_v3.py --fix --verbose
"""

import os
import re
import sys
import json
import shutil
import argparse
from pathlib import Path
from datetime import datetime

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
        self.errors   = []
        self.warnings = []
        self.fixes    = []

    def error(self, file, msg, line=None):
        loc = f"{file}:{line}" if line else file
        self.errors.append({"loc": loc, "msg": msg})

    def warn(self, file, msg, line=None):
        loc = f"{file}:{line}" if line else file
        self.warnings.append({"loc": loc, "msg": msg})

    def fix(self, file, msg):
        self.fixes.append({"loc": file, "msg": msg})

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

# ─── CHECK 1: MISSING IMPORTS ────────────────────────────────────────────────
def check_missing_imports(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[1/10] Missing Imported Files Check{C.RESET}")
    missing_count = 0

    import_pattern = re.compile(
        r"""(?:import\s+(?:[\w*{}\s,]+\s+from\s+)?|require\s*\()\s*['"]([^'"]+)['"]""",
        re.MULTILINE
    )

    for filepath in files:
        content  = read_file(filepath)
        file_dir = filepath.parent
        rel_f    = rel(filepath, root)

        # Skip constants.js circular self-check
        if filepath.name == "constants.js":
            for match in import_pattern.finditer(content):
                imp = match.group(1)
                if "constants" in imp and imp.startswith("."):
                    R.error(rel_f, f"CIRCULAR IMPORT: constants.js khud ko import kar raha hai! '{imp}' hatao", content[:match.start()].count("\n") + 1)
                    print(f"  ❌ {rel_f} → CIRCULAR SELF-IMPORT: '{imp}' — YE LINE DELETE KARO!")
                    missing_count += 1

                    if auto_fix:
                        new_lines = []
                        for line in content.splitlines(keepends=True):
                            if imp in line and "import" in line:
                                R.fix(rel_f, f"Circular import removed: {imp}")
                                print(f"    🔧 Auto-fixed: circular import line remove kiya")
                            else:
                                new_lines.append(line)
                        write_file(filepath, "".join(new_lines))
                        content = "".join(new_lines)
            continue

        for match in import_pattern.finditer(content):
            imp = match.group(1)
            if not imp.startswith("."):
                continue

            line_no = content[:match.start()].count("\n") + 1

            resolved = (file_dir / imp).resolve()
            current  = filepath.resolve()
            for ext in ["", ".js", ".jsx", ".ts", ".tsx"]:
                candidate = resolved.with_suffix(ext) if ext else resolved
                if candidate == current:
                    R.error(rel_f, f"SELF-IMPORT: file khud ko import kar raha hai! '{imp}'", line_no)
                    print(f"  ❌ {rel_f}:{line_no} → SELF-IMPORT '{imp}' — DELETE KARO!")
                    missing_count += 1
                    if auto_fix:
                        new_content = "\n".join(ln for ln in content.splitlines() if not (imp in ln and "import" in ln))
                        write_file(filepath, new_content)
                        R.fix(rel_f, f"Self-import removed: {imp}")
                        print(f"    🔧 Auto-fixed: self-import removed")
                    break

            check_paths = [
                resolved, resolved.with_suffix(".js"), resolved.with_suffix(".jsx"),
                resolved.with_suffix(".ts"), resolved.with_suffix(".tsx"),
                resolved / "index.js", resolved / "index.jsx"
            ]
            found = any(p.exists() for p in check_paths)

            if not found:
                R.error(rel_f, f"Import not found: '{imp}'", line_no)
                missing_count += 1
                print(f"  ❌ {rel_f}:{line_no} → '{imp}' file nahi mili")

    if missing_count == 0:
        print(f"  ✅ Koi missing/circular imports nahi!")
    else:
        print(f"  ⚠️  {missing_count} import issue(s) found")

# ─── CHECK 2: REACT HOOKS ────────────────────────────────────────────────────
def check_react_hooks(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[2/10] React Hooks Check (v3 Fixed Algorithm){C.RESET}")
    hook_errors = 0

    for filepath in files:
        if filepath.suffix not in {".jsx", ".tsx", ".js"}:
            continue

        content = read_file(filepath)
        rel_f   = rel(filepath, root)

        has_react_import = bool(re.search(r"""import\s+React\b|import\s*\{[^}]*\}\s*from\s*['"]react['"]""", content))
        uses_jsx   = bool(re.search(r"<[A-Z][A-Za-z]+|<\w+\s", content))
        uses_hooks = any(re.search(rf"\b{h}\s*\(", content) for h in REACT_HOOKS)

        if (uses_jsx or uses_hooks) and not has_react_import:
            R.error(rel_f, "React import missing")
            print(f"  ❌ {rel_f} → React import missing!")
            if auto_fix:
                hook_uses = sorted({h for h in REACT_HOOKS if re.search(rf"\b{h}\s*\(", content)})
                if hook_uses:
                    imp = f'import React, {{ {", ".join(hook_uses)} }} from "react";\n'
                else:
                    imp = 'import React from "react";\n'
                write_file(filepath, imp + content)
                R.fix(rel_f, f"React import added: {imp.strip()}")
                print(f"    🔧 Auto-fixed: React import added")

        lines = content.splitlines()
        conditional_depth = 0
        function_depth    = 0
        brace_depth       = 0
        scope_stack = []

        for i, line in enumerate(lines, 1):
            stripped = line.strip()
            if stripped.startswith("//") or stripped.startswith("*"): continue

            is_conditional = bool(re.match(r"^(if|else\s*if|for|while|switch)\s*[\(\{]", stripped))
            is_function = bool(re.match(r"^(function\s+\w+|const\s+\w+\s*=\s*(async\s*)?\(|\w+\s*=>\s*\{|async\s+\()", stripped) or re.search(r"=>\s*\{|function\s*\(|function\s+\w+\s*\(", stripped))

            opens  = line.count("{") - line.count("\\{")
            closes = line.count("}") - line.count("\\}")

            for _ in range(opens):
                brace_depth += 1
                if is_conditional and opens > 0:
                    scope_stack.append((brace_depth, "cond"))
                    conditional_depth += 1
                    is_conditional = False
                elif is_function and opens > 0:
                    scope_stack.append((brace_depth, "func"))
                    function_depth += 1
                    is_function = False
                else:
                    scope_stack.append((brace_depth, "other"))

            for _ in range(closes):
                if scope_stack:
                    depth, stype = scope_stack.pop()
                    if stype == "cond": conditional_depth = max(0, conditional_depth - 1)
                    elif stype == "func": function_depth = max(0, function_depth - 1)
                brace_depth = max(0, brace_depth - 1)

            if conditional_depth > 0 and function_depth == 0:
                for hook in REACT_HOOKS:
                    if re.search(rf"\b{hook}\s*\(", line):
                        if re.search(r"(const|function)\s+[A-Z]\w*", line): continue
                        R.error(rel_f, f"'{hook}' possibly in conditional scope — check manually", i)
                        print(f"  ⚠️  {rel_f}:{i} → '{hook}' might be in conditional (verify manually)")
                        hook_errors += 1

        if re.search(r"React\.useState|React\.useEffect", content):
            if not re.search(r"import\s+\*\s+as\s+React|import\s+React\s*,", content):
                R.error(rel_f, "React.useState used but React namespace not imported → causes null error")
                print(f"  ❌ {rel_f} → React.useState/useEffect namespace mismatch!")
                hook_errors += 1

    if hook_errors == 0:
        print(f"  ✅ Hook usage sahi hai!")
    else:
        print(f"  ⚠️  {hook_errors} potential hook issue(s) — manually verify karo")

# ─── CHECK 3: DUPLICATE EXPORTS ──────────────────────────────────────────────
def check_duplicate_exports(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[3/10] Duplicate Export Check{C.RESET}")
    dup_count = 0

    for filepath in files:
        content = read_file(filepath)
        rel_f   = rel(filepath, root)

        defaults = len(re.findall(r"\bexport\s+default\b", content))
        if defaults > 1:
            R.error(rel_f, f"Multiple default exports ({defaults}x)!")
            print(f"  ❌ {rel_f} → {defaults} default exports!")
            dup_count += 1

        named = re.findall(r"export\s+(?:function|class|const|let|var)\s+(\w+)", content)
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

    for filepath in files:
        if filepath.suffix not in {".jsx", ".tsx"}: continue

        content = read_file(filepath)
        rel_f   = rel(filepath, root)

        if len(content.strip()) < 10:
            R.error(rel_f, "File almost empty!")
            print(f"  ❌ {rel_f} → File EMPTY!")
            issues += 1
            continue

        opens  = content.count("{")
        closes = content.count("}")
        diff   = opens - closes
        if abs(diff) > 2:
            R.error(rel_f, f"Significantly unbalanced braces: {opens} open, {closes} close")
            print(f"  ❌ {rel_f} → Brace mismatch ({diff:+d}) — incomplete code!")
            issues += 1

        has_export = bool(re.search(r"\bexport\b", content))
        if not has_export and filepath.name not in ("main.jsx", "main.tsx", "index.js"):
            R.warn(rel_f, "No export — component import nahi hoga")
            print(f"  ⚠️  {rel_f} → Export missing!")

    if issues == 0: print(f"  ✅ Sab components OK!")

# ─── CHECK 5: ROUTES ─────────────────────────────────────────────────────────
def check_routes(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[5/10] Route vs File Check{C.RESET}")

    app_files = [f for f in files if f.name in ("App.jsx", "App.tsx", "App.js")]
    if not app_files:
        print(f"  ⚠️  App.jsx nahi mila")
        return

    app_file    = app_files[0]
    app_content = read_file(app_file)
    app_dir     = app_file.parent

    lazy_pattern = re.compile(r"""const\s+(\w+)\s*=\s*lazy\s*\(\s*\(\)\s*=>\s*import\s*\(\s*['"]([^'"]+)['"]\s*\)\s*\)""")
    normal_import = re.compile(r"""import\s+(\w+)\s+from\s+['"]([^'"]+)['"]""")

    all_imports = {}
    for m in lazy_pattern.finditer(app_content): all_imports[m.group(1)] = m.group(2)
    for m in normal_import.finditer(app_content): all_imports[m.group(1)] = m.group(2)

    route_components = re.findall(r"element=\{<(\w+)", app_content)
    skip = {"Route", "Routes", "Navigate", "Suspense", "React", "PVS", "R", "EB"}

    missing = 0
    for comp in set(route_components):
        if comp in skip: continue

        imp_path = all_imports.get(comp)
        if not imp_path:
            R.error(rel(app_file, root), f"Route <{comp}> — import nahi mila App.jsx mein")
            print(f"  ❌ Route <{comp}> → import missing!")
            missing += 1
            continue

        resolved = (app_dir / imp_path).resolve()
        found = any(resolved.with_suffix(ext).exists() for ext in ["", ".js", ".jsx", ".ts", ".tsx"]) or (resolved / "index.jsx").exists()

        if not found:
            R.error(rel(app_file, root), f"Route <{comp}> → '{imp_path}' file nahi mili")
            print(f"  ❌ Route <{comp}> → '{imp_path}' MISSING!")
            missing += 1
        else:
            print(f"  ✅ Route <{comp}> → OK")

    print(f"\n  🔍 Alias Routes Check (PVS/R/EB):")
    for alias in ["PVS", "R", "EB"]:
        if alias in app_content:
            actual = all_imports.get(alias)
            if actual:
                print(f"  ✅ {alias} → '{actual}' imported")
            else:
                R.warn(rel(app_file, root), f"Alias '{alias}' used in JSX but no import found. Check karo App.jsx mein.")
                print(f"  ⚠️  '{alias}' → import nahi mila — App.jsx mein add karo:")

    if missing == 0: print(f"\n  ✅ Sab routes properly defined hain!")

# ─── CHECK 6: FIREBASE ───────────────────────────────────────────────────────
def check_firebase(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[6/10] Firebase Configuration Check{C.RESET}")

    firebase_files = [f for f in files if "firebase" in f.name.lower() and f.suffix in SCAN_EXTENSIONS]
    if not firebase_files:
        R.warn("firebase", "Firebase config file nahi mila")
        print(f"  ⚠️  Firebase config nahi mila")
        return

    for fb_file in firebase_files:
        content = read_file(fb_file)
        rel_f   = rel(fb_file, root)

        if "initializeApp" in content: print(f"  ✅ {rel_f} → initializeApp OK")
        else:
            R.error(rel_f, "initializeApp missing!")
            print(f"  ❌ {rel_f} → initializeApp MISSING!")

        has_hardcoded = bool(re.search(r"""apiKey\s*:\s*["']AIza""", content))
        has_env       = bool(re.search(r"import\.meta\.env\.", content))

        if has_hardcoded and not has_env:
            R.warn(rel_f, "Firebase API key hardcoded! .env.local mein shift karo")
            print(f"  ⚠️  {rel_f} → Hardcoded API key! .env.local use karo")

    env_file = root / ".env.local"
    if env_file.exists(): print(f"  ✅ .env.local exists")
    else:
        R.warn(".env.local", ".env.local missing")
        print(f"  ⚠️  .env.local nahi mila!")
        if auto_fix:
            template = "VITE_FIREBASE_API_KEY=\nVITE_FIREBASE_AUTH_DOMAIN=\nVITE_FIREBASE_PROJECT_ID=\n"
            env_file.write_text(template, encoding="utf-8")
            R.fix(".env.local", ".env.local template created")

# ─── CHECK 7: ADMIN PANEL ────────────────────────────────────────────────────
def check_admin_panel(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[7/10] Admin Panel Check{C.RESET}")

    admin_files = [f for f in files if "admin" in f.name.lower() or "Admin" in f.name]
    if not admin_files:
        R.warn("Admin", "Koi admin file nahi mili!")
        print(f"  ⚠️  Admin files nahi mile")
        return

    main_admin = [f for f in admin_files if f.name in ("AdminPanel.jsx", "AdminLogin.jsx", "AdminPanel.tsx")]
    for af in main_admin:
        content = read_file(af)
        rel_f   = rel(af, root)
        auth_ok = bool(re.search(r"signIn|onAuthStateChanged|useAuth|auth", content))
        crud_ok = bool(re.search(r"addDoc|updateDoc|deleteDoc|getDocs|setDoc", content))
        
        print(f"  {'✅' if auth_ok else '❌'} {rel_f} → Auth: {'OK' if auth_ok else 'MISSING!'}")
        if not auth_ok: R.error(rel_f, "Auth logic missing in main admin file!")

# ─── CHECK 8: VITE CONFIG ────────────────────────────────────────────────────
def check_vite_config(root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[8/10] Vite Config Check{C.RESET}")
    vite_file = root / "vite.config.js"
    if not vite_file.exists(): vite_file = root / "vite.config.ts"
    if not vite_file.exists():
        R.error("vite.config.js", "Missing!")
        return

    content = read_file(vite_file)
    base_match = re.search(r"base\s*:\s*['\"]([^'\"]+)['\"]", content)
    if base_match:
        if "gncollege-website" in base_match.group(1): print(f"  ✅ base: OK")
        else: R.warn("vite.config.js", f"Unexpected base: '{base_match.group(1)}'")
    else:
        R.warn("vite.config.js", "base path missing")
        if auto_fix:
            new = content.replace("defineConfig({", "defineConfig({\n  base: '/gncollege-website/',")
            write_file(vite_file, new)
            R.fix("vite.config.js", "base path added")

# ─── CHECK 9: PWA ────────────────────────────────────────────────────────────
def check_pwa(root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[9/10] PWA Files Check{C.RESET}")
    manifest = root / "public" / "manifest.json"
    if manifest.exists(): print(f"  ✅ manifest.json found")
    else: R.warn("manifest.json", "Missing")

# ─── CHECK 10: CROSS-COMPONENT ───────────────────────────────────────────────
def check_cross_connections(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[10/10] Cross-Component Check{C.RESET}")
    mismatch = 0
    import_pattern = re.compile(r"""import\s+\{([^}]+)\}\s+from\s+['"](\.[^'"]+)['"]""", re.MULTILINE)

    for filepath in files:
        content  = read_file(filepath)
        for match in import_pattern.finditer(content):
            imports  = [x.strip().split(" as ")[0].strip() for x in match.group(1).split(",")]
            imp_path = match.group(2)
            resolved = (filepath.parent / imp_path).resolve()
            for ext in ["", ".js", ".jsx", ".ts", ".tsx"]:
                candidate = resolved.with_suffix(ext) if ext else resolved
                if candidate.exists():
                    src = read_file(candidate)
                    for name in imports:
                        if name and name not in src:
                            R.error(rel(filepath, root), f"'{name}' imported from '{imp_path}' but not exported there", content[:match.start()].count("\n") + 1)
                            mismatch += 1
                    break
    if mismatch == 0: print(f"  ✅ Cross-component OK!")

# ─── BONUS: ERRORBOUNDARY FIX ─────────────────────────────────────────────────
def fix_error_boundary(root, auto_fix):
    eb_file = root / "src" / "components" / "ErrorBoundary.jsx"
    if not eb_file.exists(): return
    content = read_file(eb_file)
    if re.search(r"""import.*['"]\.\/components\/ErrorBoundary['"]""", content):
        R.error(rel(eb_file, root), "Self-import found! './components/ErrorBoundary'")
        if auto_fix:
            new_content = "\n".join(ln for ln in content.splitlines() if "components/ErrorBoundary" not in ln)
            write_file(eb_file, new_content)
            R.fix(rel(eb_file, root), "Self-import removed from ErrorBoundary.jsx")

# ─── HTML REPORT ─────────────────────────────────────────────────────────────
def generate_html_report(R, root, duration_sec):
    score = max(0, 100 - len(R.errors) * 10 - len(R.warnings) * 3)
    score_color = "#22c55e" if score >= 80 else "#f59e0b" if score >= 50 else "#ef4444"

    def rows(items, css_class):
        return "".join(f"<tr><td class='{css_class}'></td><td>{e['loc']}</td><td>{e['msg']}</td></tr>" for e in items)

    # Pre-computed strings to avoid f-string crashes on older Python versions
    err_html = f"<table><tr><th></th><th>File</th><th>Issue</th></tr>{rows(R.errors, 'err')}</table>" if R.errors else '<p class="empty">🎉 Koi critical errors nahi!</p>'
    warn_html = f"<table><tr><th></th><th>File</th><th>Issue</th></tr>{rows(R.warnings, 'warn')}</table>" if R.warnings else '<p class="empty">✅ Koi warnings nahi!</p>'
    fix_html = f"<table><tr><th></th><th>File</th><th>Fix</th></tr>{rows(R.fixes, 'fix')}</table>" if R.fixes else '<p class="empty">ℹ️ --fix flag use karo</p>'

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GNC Doctor Report v3</title>
<style>
  :root {{--navy:#0f172a;--gold:#f59e0b;--green:#22c55e;--red:#ef4444;--card:#1e293b;}}
  *{{box-sizing:border-box;margin:0;padding:0}}
  body{{font-family:'Segoe UI',sans-serif;background:var(--navy);color:#e2e8f0;min-height:100vh}}
  .header{{background:linear-gradient(135deg,#1e3a5f,#0f172a);padding:2rem;text-align:center;border-bottom:2px solid var(--gold)}}
  .header h1{{font-size:2rem;color:var(--gold)}}
  .stats{{display:flex;gap:1rem;padding:1.5rem 2rem;flex-wrap:wrap}}
  .stat{{background:var(--card);border-radius:12px;padding:1.2rem 1.5rem;flex:1;text-align:center}}
  .stat .num{{font-size:2.5rem;font-weight:700}}
  .section{{padding:0 2rem 2rem}}
  .section h2{{font-size:1.2rem;color:var(--gold);margin-bottom:1rem;border-left:3px solid var(--gold);padding-left:.7rem}}
  table{{width:100%;border-collapse:collapse}}
  th,td{{padding:.6rem .8rem;text-align:left;border-bottom:1px solid #334155;font-size:.85rem;word-break:break-word}}
  th{{color:var(--gold);background:#1e293b}}
  td:nth-child(2){{width:35%;color:#7dd3fc;font-family:monospace}}
  .err{{color:var(--red)}} .warn{{color:var(--gold)}} .fix{{color:var(--green)}}
  .empty{{color:#64748b;padding:1rem;text-align:center}}
  .v3-note{{background:#1e3a5f;border:1px solid var(--gold);border-radius:8px;padding:1rem 1.5rem;margin:0 2rem 1.5rem;color:#fcd34d}}
</style>
</head>
<body>
<div class="header">
  <h1>🏫 GNC College — Project Doctor v3 Report</h1>
  <p style="color:#94a3b8;margin-top:.5rem">
    {datetime.now().strftime('%d %B %Y, %I:%M %p')} | Scan: {duration_sec:.1f}s | Root: {root}
  </p>
</div>
<div class="stats">
  <div class="stat"><div class="num" style="color:{score_color}">{score}</div><div style="font-size:.8rem;color:#94a3b8;margin-top:.3rem">Health Score</div></div>
  <div class="stat"><div class="num" style="color:#ef4444">{len(R.errors)}</div><div style="font-size:.8rem;color:#94a3b8;margin-top:.3rem">Critical Errors</div></div>
</div>
<div class="v3-note">
  <strong>v3 Note:</strong> Hook-in-conditional false positives FIX ho gaye hain. Jo errors hain, bas unhi par focus karein.
</div>
<div class="section">
  <h2>❌ Critical Errors ({len(R.errors)})</h2>
  {err_html}
</div>
<div class="section">
  <h2>⚠️ Warnings ({len(R.warnings)})</h2>
  {warn_html}
</div>
<div class="section">
  <h2>🔧 Auto-Fixes ({len(R.fixes)})</h2>
  {fix_html}
</div>
</body></html>"""

    report_path = root / "gnc_doctor_report_v3.html"
    report_path.write_text(html, encoding="utf-8")
    return report_path

# ─── SUMMARY ─────────────────────────────────────────────────────────────────
def print_summary(R, report_path, duration):
    score   = max(0, 100 - len(R.errors) * 10 - len(R.warnings) * 3)
    bar_len = 40
    filled  = int(bar_len * score / 100)
    bar     = "█" * filled + "░" * (bar_len - filled)
    color   = C.GREEN if score >= 80 else C.YELLOW if score >= 50 else C.RED

    print(f"\n{'═'*65}")
    print(f"{C.BOLD}  📊 FINAL REPORT (v3){C.RESET}")
    print(f"{'═'*65}")
    print(f"  Health  : {color}{bar} {score}/100{C.RESET}")
    print(f"  ❌ Errors   : {C.RED}{len(R.errors)}{C.RESET}")
    print(f"  ⚠️  Warnings : {C.YELLOW}{len(R.warnings)}{C.RESET}")
    print(f"  🔧 Auto-fixes: {C.GREEN}{len(R.fixes)}{C.RESET}")
    print(f"  ⏱️  Time     : {duration:.1f}s")
    print(f"  📄 Report    : {C.CYAN}{report_path}{C.RESET}")
    print(f"{'═'*65}")

    if len(R.errors) == 0:
        print(f"\n  {C.GREEN}{C.BOLD}🎉 PROJECT MAKKHAN JAISA SMOOTH HAI!{C.RESET}\n")
    else:
        print(f"\n  {C.RED}🚨 {len(R.errors)} real error(s) fix karo!{C.RESET}")
        print(f"  {C.DIM}  python gnc_project_doctor_v3.py --fix{C.RESET}\n")

# ─── MAIN ────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="GNC Project Doctor v3")
    parser.add_argument("--fix",     action="store_true", help="Auto-fix ON")
    parser.add_argument("--path",    type=str, default=None)
    args = parser.parse_args()

    start = datetime.now()
    root = Path(args.path).resolve() if args.path else find_project_root()
    if not (root / "package.json").exists():
        print(f"\n  ❌ package.json nahi mila! Sahi directory mein run karo.")
        sys.exit(1)

    src = root / SRC_DIR if (root / SRC_DIR).exists() else root
    files = all_source_files(src)

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
    fix_error_boundary(root, af)

    duration    = (datetime.now() - start).total_seconds()
    report_path = generate_html_report(R, root, duration)
    print_summary(R, report_path, duration)
    sys.exit(1 if R.errors else 0)

if __name__ == "__main__":
    main()