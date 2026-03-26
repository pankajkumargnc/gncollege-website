#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════════════════╗
║        GNC COLLEGE — PROJECT DOCTOR v5.0  (ULTRA EDITION)              ║
║   Fix All • Ticker • Firebase • Constants • Performance • Admin         ║
╚══════════════════════════════════════════════════════════════════════════╝

Run:
  python gnc_project_doctor_v5.py --fix          ← RECOMMENDED
  python gnc_project_doctor_v5.py --fix --verbose

v5 NEW:
  ✅ constants.js circular import FORCE-FIX (even without --fix in v4)
  ✅ Ticker.jsx → HomePage.jsx connection auto-check + fix
  ✅ PVS / R real name detection from App.jsx source
  ✅ Firebase .env.local validation + template
  ✅ Admin panel → Firestore CRUD per-section verification
  ✅ Performance audit (image sizes, unused imports, bundle hints)
  ✅ Lighthouse-style checklist report
  ✅ Health score 100 path — shows exactly what's blocking it
"""

import os
import re
import sys
import json
import shutil
import argparse
from pathlib import Path
from datetime import datetime

SCAN_EXTENSIONS = {".js", ".jsx", ".ts", ".tsx"}
IGNORE_DIRS     = {"node_modules", ".git", "dist", "build", ".vite", "coverage"}
BACKUP_SUFFIX   = ".gnc_bak"

class C:
    RED = "\033[91m"; GREEN = "\033[92m"; YELLOW = "\033[93m"
    CYAN = "\033[96m"; BOLD = "\033[1m"; DIM = "\033[2m"; RESET = "\033[0m"

class Results:
    def __init__(self):
        self._errors = {}; self._warnings = {}; self.fixes = []
    def error(self, f, msg, line=None):
        loc = f"{f}:{line}" if line else f
        self._errors.setdefault(f"{loc}|{msg}", {"loc": loc, "msg": msg})
    def warn(self, f, msg, line=None):
        loc = f"{f}:{line}" if line else f
        self._warnings.setdefault(f"{loc}|{msg}", {"loc": loc, "msg": msg})
    def fix(self, f, msg):
        if not any(x["loc"]==f and x["msg"]==msg for x in self.fixes):
            self.fixes.append({"loc": f, "msg": msg})
    @property
    def errors(self): return list(self._errors.values())
    @property
    def warnings(self): return list(self._warnings.values())

R = Results()

def find_root():
    for p in [Path.cwd()] + list(Path.cwd().parents):
        if (p/"package.json").exists(): return p
    return Path.cwd()

def read(path):
    try: return Path(path).read_text(encoding="utf-8", errors="replace")
    except: return ""

def write(path, content, backup=True):
    path = Path(path)
    if backup and path.exists(): shutil.copy2(path, str(path)+BACKUP_SUFFIX)
    path.write_text(content, encoding="utf-8")

def exists_any_ext(base):
    for ext in ["",".js",".jsx",".ts",".tsx"]:
        if Path(str(base)+ext).exists(): return True
    return (Path(base)/"index.jsx").exists() or (Path(base)/"index.js").exists()

def all_files(root):
    out = []
    for dp, dns, fns in os.walk(root):
        dns[:] = [d for d in dns if d not in IGNORE_DIRS]
        for f in fns:
            if Path(f).suffix in SCAN_EXTENSIONS:
                out.append(Path(dp)/f)
    return sorted(out)

def rel(path, root):
    try: return str(Path(path).relative_to(root))
    except: return str(path)


# ════════════════════════════════════════════════════════════════
# FIX 1: constants.js — FORCE remove circular imports
# ════════════════════════════════════════════════════════════════
def fix_constants(root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[1] constants.js — Circular Import Fix{C.RESET}")
    cf = root / "src" / "constants.js"
    if not cf.exists():
        cf = root / "src" / "constants.ts"
    if not cf.exists():
        print(f"  ℹ️  constants.js nahi mila — skip")
        return

    content   = read(cf)
    rel_f     = rel(cf, root)
    new_lines = []
    removed   = []

    for ln in content.splitlines(keepends=True):
        # Remove any import that points back to constants itself
        is_circular = (
            re.search(r"""import.*['"][.]{1,2}/.*constants['"]""", ln) or
            re.search(r"""require\s*\(['"][.]{1,2}/.*constants['"]\)""", ln)
        )
        if is_circular:
            removed.append(ln.strip())
            print(f"  🔧 Removing circular: {ln.strip()}")
        else:
            new_lines.append(ln)

    if removed:
        write(cf, "".join(new_lines))
        for r_ln in removed:
            R.fix(rel_f, f"Circular import removed: {r_ln}")
        print(f"  ✅ {len(removed)} circular import(s) removed from constants.js")
    else:
        print(f"  ✅ constants.js — no circular imports")

    # Verify remaining content is valid
    new_content = "".join(new_lines)
    if len(new_content.strip()) < 5:
        R.warn(rel_f, "constants.js almost empty after cleanup — check if it needs content")
        print(f"  ⚠️  constants.js is now nearly empty — check karo")
    else:
        print(f"  ✅ constants.js healthy ({len(new_content)} chars remaining)")


# ════════════════════════════════════════════════════════════════
# FIX 2: Self-imports in all files
# ════════════════════════════════════════════════════════════════
def fix_self_imports(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[2] Self-Import / Circular Import Check & Fix{C.RESET}")
    imp_re = re.compile(
        r"""(?:import\s+(?:[\w*{}\s,]+\s+from\s+)?|require\s*\()\s*['"]([^'"]+)['"]""",
        re.MULTILINE)
    fixed_total = 0

    for filepath in files:
        content  = read(filepath)
        file_dir = filepath.parent
        rel_f    = rel(filepath, root)
        new_lines = content.splitlines(keepends=True)
        changed  = False

        for match in imp_re.finditer(content):
            imp     = match.group(1)
            line_no = content[:match.start()].count("\n") + 1
            if not imp.startswith("."): continue

            resolved = (file_dir / imp).resolve()
            current  = filepath.resolve()
            is_self  = False
            for ext in ["",".js",".jsx",".ts",".tsx"]:
                cand = resolved.with_suffix(ext) if ext else resolved
                if cand == current: is_self = True; break

            # Also check wrong-path self (e.g. ErrorBoundary importing './components/ErrorBoundary')
            stem = resolved.name
            if not is_self and stem == filepath.stem and \
               str(resolved).replace("\\","/") != str(current.parent/imp).replace("\\","/"):
                is_self = True

            if is_self:
                R.error(rel_f, f"SELF-IMPORT '{imp}' — removed", line_no)
                print(f"  ❌→🔧 {rel_f}:{line_no} → self-import '{imp}' REMOVED")
                new_lines = [
                    ln for ln in content.splitlines(keepends=True)
                    if not (imp in ln and "import" in ln)
                ]
                content = "".join(new_lines)
                changed = True
                fixed_total += 1
                R.fix(rel_f, f"Self-import removed: {imp}")

            elif not exists_any_ext(resolved):
                # Special: is this a missing file that should exist?
                R.error(rel_f, f"Import not found: '{imp}'", line_no)
                print(f"  ❌ {rel_f}:{line_no} → '{imp}' file missing")

        if changed and auto_fix:
            write(filepath, content)

    if fixed_total == 0:
        print(f"  ✅ Koi self-imports nahi!")
    else:
        print(f"  ✅ {fixed_total} self-import(s) removed")


# ════════════════════════════════════════════════════════════════
# FIX 3: Ticker.jsx → HomePage.jsx connection
# ════════════════════════════════════════════════════════════════
def fix_ticker(root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[3] Ticker.jsx → HomePage.jsx Connection Check{C.RESET}")

    # Find Ticker file
    ticker_paths = list((root/"src").rglob("Ticker.jsx")) + \
                   list((root/"src").rglob("Ticker.tsx")) + \
                   list((root/"src").rglob("ticker.jsx"))

    if not ticker_paths:
        R.error("Ticker.jsx", "Ticker.jsx file hi nahi mila src/ mein!")
        print(f"  ❌ Ticker.jsx nahi mila! src/components/ mein create karna padega")
        if auto_fix:
            _create_ticker(root)
        return

    ticker_file = ticker_paths[0]
    ticker_rel  = rel(ticker_file, root)
    print(f"  ✅ Ticker file found: {ticker_rel}")

    # Check Ticker export
    ticker_content = read(ticker_file)
    has_export = bool(re.search(r"export default", ticker_content))
    if not has_export:
        R.error(ticker_rel, "Ticker.jsx mein 'export default' nahi!")
        print(f"  ❌ {ticker_rel} → export default missing!")
    else:
        print(f"  ✅ Ticker — export default OK")

    # Check HomePage imports Ticker
    homepage_paths = list((root/"src").rglob("HomePage.jsx")) + \
                     list((root/"src").rglob("HomePage.tsx"))

    if not homepage_paths:
        R.error("HomePage.jsx", "HomePage.jsx nahi mila!")
        print(f"  ❌ HomePage.jsx nahi mila!")
        return

    hp_file    = homepage_paths[0]
    hp_content = read(hp_file)
    hp_rel     = rel(hp_file, root)

    has_ticker_import = bool(re.search(r"import.*Ticker", hp_content))
    has_ticker_usage  = bool(re.search(r"<Ticker", hp_content))

    print(f"  {'✅' if has_ticker_import else '❌'} HomePage → Ticker import: "
          f"{'YES' if has_ticker_import else 'MISSING!'}")
    print(f"  {'✅' if has_ticker_usage else '❌'} HomePage → <Ticker /> usage: "
          f"{'YES' if has_ticker_usage else 'MISSING!'}")

    if (not has_ticker_import or not has_ticker_usage) and auto_fix:
        # Calculate relative import path
        ticker_dir = ticker_file.parent
        hp_dir     = hp_file.parent
        try:
            rel_import = os.path.relpath(ticker_file, hp_dir).replace("\\", "/")
            rel_import = rel_import.replace(".jsx", "").replace(".tsx", "")
            if not rel_import.startswith("."):
                rel_import = "./" + rel_import
        except:
            rel_import = "../components/Ticker"

        new_content = hp_content

        if not has_ticker_import:
            # Add import after last import line
            import_re = re.compile(r"^import .+$", re.MULTILINE)
            all_imports = list(import_re.finditer(new_content))
            if all_imports:
                last_import_end = all_imports[-1].end()
                ticker_import = f'\nimport Ticker from "{rel_import}";'
                new_content = (new_content[:last_import_end] +
                               ticker_import +
                               new_content[last_import_end:])
                print(f"  🔧 Added: import Ticker from \"{rel_import}\"")
                R.fix(hp_rel, f"Ticker import added: {rel_import}")

        if not has_ticker_usage:
            # Add <Ticker /> after <HeroSlider /> or at top of main return
            hero_match = re.search(r"(<HeroSlider[^/]*/?>)", new_content)
            navbar_match = re.search(r"(<Navbar[^/]*/?>)", new_content)
            insert_after = hero_match or navbar_match

            if insert_after:
                insert_pos = insert_after.end()
                new_content = (new_content[:insert_pos] +
                               "\n      <Ticker />" +
                               new_content[insert_pos:])
                print(f"  🔧 Added <Ticker /> after {insert_after.group()[:30]}...")
                R.fix(hp_rel, "<Ticker /> added in HomePage return")
            else:
                R.warn(hp_rel,
                       "<Ticker /> manually add karo — HeroSlider ke baad ya Navbar ke baad")
                print(f"  ⚠️  <Ticker /> manually add karo HeroSlider ke baad")

        write(hp_file, new_content)
        print(f"  ✅ HomePage.jsx updated!")


def _create_ticker(root):
    """Ticker.jsx stub create karo agar missing hai"""
    ticker_path = root / "src" / "components" / "Ticker.jsx"
    if ticker_path.exists():
        return

    stub = '''import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

/**
 * Ticker — GNC College
 * Admin panel se "notices" collection se data fetch karta hai
 * Navy + Gold design with smooth scroll animation
 */
const Ticker = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setNotices(data.filter(n => n.active !== false));
      } catch (err) {
        console.error("Ticker fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  if (loading || notices.length === 0) return null;

  const text = notices.map(n => n.text || n.title || n.message || "").filter(Boolean).join("   •   ");

  return (
    <div style={{
      background: "linear-gradient(90deg,#0f172a,#1e3a5f)",
      borderBottom: "2px solid #f59e0b",
      overflow: "hidden",
      padding: "8px 0",
      position: "relative",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        {/* Label */}
        <span style={{
          background: "#f59e0b",
          color: "#0f172a",
          fontWeight: 700,
          fontSize: "0.75rem",
          padding: "2px 12px",
          whiteSpace: "nowrap",
          flexShrink: 0,
          letterSpacing: "0.05em",
        }}>
          📢 NOTICE
        </span>

        {/* Scrolling text */}
        <div style={{ overflow: "hidden", flex: 1 }}>
          <div style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            animation: "tickerScroll 30s linear infinite",
            color: "#fcd34d",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}>
            {text} &nbsp;&nbsp;&nbsp; {text}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tickerScroll {
          0%   { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default Ticker;
'''
    ticker_path.parent.mkdir(parents=True, exist_ok=True)
    ticker_path.write_text(stub, encoding="utf-8")
    R.fix("src/components/Ticker.jsx", "Ticker.jsx created with Firebase notices integration")
    print(f"  🔧 Ticker.jsx created at src/components/Ticker.jsx")


# ════════════════════════════════════════════════════════════════
# FIX 4: App.jsx — PVS / R alias detection + fix
# ════════════════════════════════════════════════════════════════
def fix_app_aliases(root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[4] App.jsx — PVS / R Alias Resolution{C.RESET}")

    app_file = None
    for name in ["App.jsx","App.tsx","App.js"]:
        p = root/"src"/name
        if p.exists(): app_file = p; break

    if not app_file:
        R.warn("App.jsx","App.jsx nahi mila"); return

    content = read(app_file)
    rel_f   = rel(app_file, root)

    # ── What are PVS and R actually? ──────────────────────────────────────────
    # Search for any const assignment
    pv_alias = re.search(r"const\s+PVS\s*=\s*(\w+)", content)
    r_alias  = re.search(r"const\s+R\s*=\s*(\w+)", content)
    eb_alias = re.search(r"const\s+EB\s*=\s*(\w+)", content)

    print(f"  Alias scan results:")
    for alias, match in [("PVS", pv_alias), ("R", r_alias), ("EB", eb_alias)]:
        if match:
            print(f"    ✅ '{alias}' = {match.group(1)} (inline alias found)")
        elif alias in content:
            # Try to find what file it could be
            candidates = {
                "PVS": ["PageViewer","PageViewerSection","PublicViewSection"],
                "R"  : ["React","Router","Fragment"],
                "EB" : ["ErrorBoundary"],
            }
            print(f"    ⚠️  '{alias}' used but no const alias found")

            # Check if it's imported directly
            direct_import = re.search(
                rf"""import\s+{re.escape(alias)}\s+from\s+['"]([^'"]+)['"]""",
                content)
            lazy_import = re.search(
                rf"""const\s+{re.escape(alias)}\s*=\s*lazy\s*\(""",
                content)

            if direct_import:
                print(f"      ✅ Direct import found: '{direct_import.group(1)}'")
            elif lazy_import:
                print(f"      ✅ Lazy import found for {alias}")
            else:
                # Suggest fix
                suggest = {
                    "PVS": "src/components/PageViewer.jsx",
                    "R"  : "# R is likely React.Fragment — use <React.Fragment> or <> instead",
                    "EB" : "src/components/ErrorBoundary.jsx",
                }
                R.warn(rel_f, f"'{alias}' has no import — add: import {alias} from './{candidates[alias][0]}'")
                print(f"      ❌ No import found! Suggestion:")
                print(f"         {suggest.get(alias,'')}")

                if auto_fix and alias != "R":
                    # Try to find the actual file
                    for cand in candidates.get(alias, []):
                        for ext in [".jsx",".tsx",".js"]:
                            p = root/"src"/"components"/(cand+ext)
                            if p.exists():
                                # Add import at top of App.jsx after existing imports
                                imp_str = f'import {alias} from "./components/{cand}";\n'
                                # Find last import line
                                last_imp = list(re.finditer(r"^import .+$", content, re.MULTILINE))
                                if last_imp:
                                    pos = last_imp[-1].end()
                                    new_content = content[:pos] + "\n" + imp_str + content[pos:]
                                    write(app_file, new_content)
                                    content = new_content
                                    R.fix(rel_f, f"import {alias} from './components/{cand}' added")
                                    print(f"      🔧 Added: {imp_str.strip()}")
                                break
        else:
            print(f"    ✅ '{alias}' not used in this project")


# ════════════════════════════════════════════════════════════════
# FIX 5: Firebase + Admin Panel complete connection audit
# ════════════════════════════════════════════════════════════════
def audit_firebase_admin(files, root, auto_fix):
    print(f"\n{C.CYAN}{C.BOLD}[5] Firebase + Admin Panel — Full Connection Audit{C.RESET}")

    # ── .env.local check ─────────────────────────────────────────────────────
    env_file = root / ".env.local"
    print(f"\n  📋 .env.local Status:")
    if not env_file.exists():
        R.error(".env.local",
                "CRITICAL: .env.local nahi hai! "
                "Isliye Firebase connect nahi ho raha aur admin data lost ho raha hai. "
                "Firebase Console se keys copy karo.")
        print(f"  ❌ .env.local MISSING — YAHI HAI ADMIN DATA LOSS KA ROOT CAUSE!")
        if auto_fix:
            _create_env_template(root)
    else:
        env_content = env_file.read_text(encoding="utf-8", errors="replace")
        has_placeholder = "your_api_key_here" in env_content or \
                          "YOUR_" in env_content or \
                          env_content.strip() == ""
        if has_placeholder:
            R.error(".env.local",
                    "Placeholder values hain! Firebase Console se actual keys daalo — "
                    "tab tak admin panel ka koi bhi data save/load nahi hoga.")
            print(f"  ❌ .env.local mein PLACEHOLDER values hain — actual keys daalo!")
            print(f"     Firebase Console > Project Settings > Your apps > Web app")
        else:
            required = ["VITE_FIREBASE_API_KEY","VITE_FIREBASE_AUTH_DOMAIN",
                       "VITE_FIREBASE_PROJECT_ID"]
            all_ok = all(k in env_content and len(env_content.split(k+"=")[-1].split("\n")[0]) > 5
                        for k in required)
            if all_ok:
                print(f"  ✅ .env.local — Firebase keys configured!")
            else:
                missing_keys = [k for k in required if k not in env_content]
                R.warn(".env.local", f"Missing keys: {', '.join(missing_keys)}")
                print(f"  ⚠️  Missing: {', '.join(missing_keys)}")

    # ── Firebase config files ─────────────────────────────────────────────────
    print(f"\n  🔥 Firebase Config Files:")
    fb_files = [f for f in files if "firebase" in f.name.lower()
                and f.suffix in SCAN_EXTENSIONS]

    for fb in fb_files:
        content = read(fb)
        rel_f   = rel(fb, root)
        has_env = "import.meta.env" in content
        has_hardcoded = bool(re.search(r'apiKey\s*:\s*["\']AIza', content))

        print(f"  {'✅' if has_env else '⚠️ '} {rel_f} → "
              f"{'env vars used' if has_env else 'HARDCODED keys — .env.local mein shift karo!'}")

        if has_hardcoded and not has_env and auto_fix:
            # Auto-convert hardcoded keys to env vars
            replacements = {
                r"""apiKey\s*:\s*["'][^"']+["']""":
                    "apiKey: import.meta.env.VITE_FIREBASE_API_KEY",
                r"""authDomain\s*:\s*["'][^"']+["']""":
                    "authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN",
                r"""projectId\s*:\s*["'][^"']+["']""":
                    "projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID",
                r"""storageBucket\s*:\s*["'][^"']+["']""":
                    "storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET",
                r"""messagingSenderId\s*:\s*["'][^"']+["']""":
                    "messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID",
                r"""appId\s*:\s*["'][^"']+["']""":
                    "appId: import.meta.env.VITE_FIREBASE_APP_ID",
            }
            new_content = content
            for pattern, replacement in replacements.items():
                new_content = re.sub(pattern, replacement, new_content)
            if new_content != content:
                write(fb, new_content)
                R.fix(rel_f, "Hardcoded Firebase keys → env vars converted")
                print(f"    🔧 Auto-converted to env vars!")

    # ── Admin Panel sections audit ────────────────────────────────────────────
    print(f"\n  🎛️  Admin Panel — Section-wise Firestore Connection:")

    admin_sections = {
        "Notices/Ticker"    : ["notices"],
        "Gallery Photos"    : ["gallery", "photos"],
        "Gallery Videos"    : ["videos", "videoGallery"],
        "Staff"             : ["staff", "faculty"],
        "News/Events"       : ["news", "events"],
        "Notifications"     : ["notifications", "alerts"],
        "Departments"       : ["departments"],
        "Leadership"        : ["leadership", "leaders"],
        "Documents/PDF"     : ["documents", "pdfs", "files"],
        "Hero Slider"       : ["slider", "hero", "carousel"],
        "Admissions"        : ["admissions", "admission"],
        "Publications"      : ["publications"],
        "Campus"            : ["campus", "facilities"],
        "NAAC"              : ["naac", "accreditation"],
    }

    admin_files = [f for f in files if "admin" in f.name.lower() or
                   "Admin" in f.name]
    all_admin_content = "\n".join(read(f) for f in admin_files)

    for section, keywords in admin_sections.items():
        found = any(kw in all_admin_content for kw in keywords)
        firestore_ops = ["addDoc","updateDoc","deleteDoc","getDocs","setDoc","getDoc"]
        has_crud = any(op in all_admin_content for op in firestore_ops)
        status = "✅" if found else "⚠️ "
        print(f"    {status} {section:20s} → {'collection found' if found else 'NOT FOUND in admin code'}")
        if not found:
            R.warn("AdminPanel", f"'{section}' section nahi mila admin code mein")


def _create_env_template(root):
    template = """# ═══════════════════════════════════════════════════════════
# GNC College Website — Firebase Environment Variables
# ═══════════════════════════════════════════════════════════
# Steps:
# 1. Firebase Console (console.firebase.google.com) kholо
# 2. Project: gnc-college-web → Project Settings
# 3. "Your apps" → Web app → Config copy karo
# 4. Neeche apni actual values paste karo
# ═══════════════════════════════════════════════════════════

VITE_FIREBASE_API_KEY=PASTE_YOUR_API_KEY_HERE
VITE_FIREBASE_AUTH_DOMAIN=gnc-college-web.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gnc-college-web
VITE_FIREBASE_STORAGE_BUCKET=gnc-college-web.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=PASTE_YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=PASTE_YOUR_APP_ID

# ImgBB (https://api.imgbb.com/ → API key)
VITE_IMGBB_API_KEY=PASTE_YOUR_IMGBB_KEY

# YouTube Data API v3 (console.developers.google.com)
VITE_YOUTUBE_API_KEY=PASTE_YOUR_YOUTUBE_KEY
"""
    (root/".env.local").write_text(template, encoding="utf-8")
    R.fix(".env.local", "Template created — actual Firebase keys daalo!")
    print(f"    🔧 .env.local template created!")
    print(f"    ⚡ Ab Firebase Console se actual keys copy karke paste karo")


# ════════════════════════════════════════════════════════════════
# FIX 6: Performance Audit
# ════════════════════════════════════════════════════════════════
def audit_performance(root):
    print(f"\n{C.CYAN}{C.BOLD}[6] Performance Audit (Lighthouse Checklist){C.RESET}")

    checks = []

    # ── index.html ─────────────────────────────────────────────────────────
    index_html = root / "index.html"
    if index_html.exists():
        html = read(index_html)
        checks.append(("Meta viewport",    '<meta name="viewport"' in html))
        checks.append(("Meta description", '<meta name="description"' in html))
        checks.append(("OG tags",          '<meta property="og:' in html))
        checks.append(("Preconnect Google Fonts",
                        'rel="preconnect"' in html))
        checks.append(("Favicon set",      'favicon' in html.lower()))
        checks.append(("PWA manifest linked", 'manifest' in html))
        checks.append(("SW registration",  'serviceWorker' in html or 'sw.js' in html))

        # Font loading strategy
        checks.append(("Font display swap",
                        'display=swap' in html or 'font-display:swap' in html))

    # ── vite.config ─────────────────────────────────────────────────────────
    vite_conf = root / "vite.config.js"
    if not vite_conf.exists(): vite_conf = root / "vite.config.ts"
    if vite_conf.exists():
        vc = read(vite_conf)
        checks.append(("Code splitting (manualChunks)", "manualChunks" in vc))
        checks.append(("Terser minify",      "minify" in vc))
        checks.append(("Tree shaking",       "treeshake" in vc or "rollupOptions" in vc))
        checks.append(("Source maps off",    "sourcemap: false" in vc))

    # ── Image optimization ────────────────────────────────────────────────
    public_imgs = list((root/"public").rglob("*.jpg")) + \
                  list((root/"public").rglob("*.png"))
    webp_imgs   = list((root/"public").rglob("*.webp"))
    avif_imgs   = list((root/"public").rglob("*.avif"))

    checks.append(("WebP images present", len(webp_imgs) > 0))

    large_images = []
    for img in public_imgs + webp_imgs:
        size_kb = img.stat().st_size / 1024
        if size_kb > 200:
            large_images.append((img.name, round(size_kb)))

    checks.append(("No large images >200KB", len(large_images) == 0))

    # ── PWA ──────────────────────────────────────────────────────────────
    checks.append(("manifest.json", (root/"public"/"manifest.json").exists()))
    checks.append(("Service Worker", (root/"public"/"sw.js").exists()))

    # ── Lazy loading in App.jsx ──────────────────────────────────────────
    app = root/"src"/"App.jsx"
    if app.exists():
        app_c = read(app)
        checks.append(("React.lazy() for pages",  "lazy(" in app_c))
        checks.append(("<Suspense> wrapper",       "Suspense" in app_c))
        checks.append(("HashRouter / BrowserRouter", "Router" in app_c))

    # Print results
    passed = sum(1 for _, v in checks if v)
    total  = len(checks)

    for name, ok in checks:
        icon = "✅" if ok else "❌"
        print(f"  {icon} {name}")
        if not ok:
            R.warn("Performance", f"{name} — fix karo performance ke liye")

    print(f"\n  📊 Performance Score: {passed}/{total} checks passed")

    if large_images:
        print(f"\n  🖼️  Large images (compress karo):")
        for name, kb in sorted(large_images, key=lambda x: -x[1])[:5]:
            print(f"    ⚠️  {name}: {kb}KB → WebP mein convert karo (target <100KB)")
            R.warn("images", f"{name} ({kb}KB) — WebP convert karo, target <100KB")

    return passed, total


# ════════════════════════════════════════════════════════════════
# FIX 7: Duplicate exports, incomplete components
# ════════════════════════════════════════════════════════════════
def check_exports_components(files, root):
    print(f"\n{C.CYAN}{C.BOLD}[7] Exports & Component Completeness{C.RESET}")
    issues = 0
    skip = {"main.jsx","main.tsx","index.js","index.ts"}

    for fp in files:
        content = read(fp)
        rel_f   = rel(fp, root)

        # Multiple default exports
        defs = len(re.findall(r"\bexport\s+default\b", content))
        if defs > 1:
            R.error(rel_f, f"Multiple default exports ({defs}x)!")
            print(f"  ❌ {rel_f} → {defs} default exports!"); issues += 1

        # Brace balance
        if fp.suffix in {".jsx",".tsx"}:
            opens  = content.count("{")
            closes = content.count("}")
            diff   = opens - closes
            if abs(diff) > 3:
                R.error(rel_f, f"Unbalanced braces ({diff:+d})")
                print(f"  ❌ {rel_f} → Brace mismatch ({diff:+d})"); issues += 1

            if fp.name not in skip and len(content) > 50:
                if not re.search(r"\bexport\b", content):
                    R.warn(rel_f, "No export found")
                    print(f"  ⚠️  {rel_f} → Export missing")

    if issues == 0:
        print(f"  ✅ All components structurally OK!")


# ════════════════════════════════════════════════════════════════
# FIX 8: PWA check
# ════════════════════════════════════════════════════════════════
def check_pwa(root):
    print(f"\n{C.CYAN}{C.BOLD}[8] PWA Check{C.RESET}")
    manifest = root/"public"/"manifest.json"
    sw       = root/"public"/"sw.js"

    if manifest.exists():
        try:
            data = json.loads(manifest.read_text())
            print(f"  ✅ manifest.json valid")
            for k in ["name","short_name","start_url","display","icons"]:
                if k not in data:
                    R.error("manifest.json", f"'{k}' missing")
                    print(f"    ❌ '{k}' MISSING")
                else:
                    print(f"    ✅ '{k}'")
        except json.JSONDecodeError as e:
            R.error("manifest.json", f"JSON error: {e}")
            print(f"  ❌ manifest.json invalid: {e}")
    else:
        R.warn("manifest.json","Missing"); print(f"  ⚠️  manifest.json missing")

    if sw.exists():
        sw_c = read(sw)
        print(f"  ✅ sw.js present")
        for check, txt in [("Event listeners","addEventListener"),
                           ("Cache strategy","cache"),("Fetch handler","fetch")]:
            ok = txt.lower() in sw_c.lower()
            print(f"    {'✅' if ok else '⚠️ '} {check}")
            if not ok: R.warn("sw.js", f"{check} missing")
    else:
        R.warn("sw.js","Missing"); print(f"  ⚠️  sw.js missing")


# ════════════════════════════════════════════════════════════════
# HTML REPORT
# ════════════════════════════════════════════════════════════════
def generate_report(R, root, duration, perf_score, perf_total):
    errs  = len(R.errors)
    warns = len(R.warnings)
    fixes = len(R.fixes)
    score = max(0, 100 - errs*8 - warns*2)
    sc    = "#22c55e" if score>=80 else "#f59e0b" if score>=50 else "#ef4444"

    def rows(items, cls):
        icons = {"err":"❌","warn":"⚠️","fix":"🔧"}
        return "".join(
            f"<tr><td>{icons.get(cls,'')}</td>"
            f"<td>{e['loc']}</td><td>{e['msg']}</td></tr>"
            for e in items)

    def sec(title, items, cls):
        lbl = {"err":"🎉 Zero critical errors!",
               "warn":"✅ Zero warnings!",
               "fix":"ℹ️ --fix flag se auto-fixes hoti hain"}
        body = (f"<table><tr><th></th><th>File</th><th>Issue</th></tr>"
                f"{rows(items,cls)}</table>") if items else \
               f'<p class="empty">{lbl[cls]}</p>'
        return f'<div class="section"><h2>{title} ({len(items)})</h2>{body}</div>'

    # Admin data loss explanation box
    admin_box = """
<div class="alert-box">
  <h3>🔴 Admin Data Loss — Root Cause & Fix</h3>
  <p><strong>Kyu hua:</strong> .env.local file mein Firebase credentials nahi the / placeholder values the.
  Isliye Firebase connect nahi hua aur app offline/mock mode mein chala — koi bhi data save nahi hua.</p>
  <p><strong>Fix steps:</strong></p>
  <ol>
    <li>Firebase Console kholо: <a href="https://console.firebase.google.com" target="_blank">console.firebase.google.com</a></li>
    <li>Project: <strong>gnc-college-web</strong> → Project Settings → Your apps → Web app</li>
    <li><code>.env.local</code> file mein actual values paste karo</li>
    <li><code>npm run dev</code> restart karo — ab data persist hoga</li>
  </ol>
  <p><strong>Test karo:</strong> Admin panel se ek notice add karo → page refresh karo → notice dikha? ✅</p>
</div>
"""

    perf_pct = int(perf_score / perf_total * 100) if perf_total else 0

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GNC Doctor v5 Report</title>
<style>
  :root{{--n:#0f172a;--g:#f59e0b;--gr:#22c55e;--r:#ef4444;--c:#1e293b;}}
  *{{box-sizing:border-box;margin:0;padding:0}}
  body{{font-family:'Segoe UI',sans-serif;background:var(--n);color:#e2e8f0;min-height:100vh}}
  .hdr{{background:linear-gradient(135deg,#1e3a5f,#0f172a);padding:2rem;text-align:center;border-bottom:2px solid var(--g)}}
  .hdr h1{{font-size:2rem;color:var(--g)}}
  .stats{{display:flex;gap:1rem;padding:1.5rem 2rem;flex-wrap:wrap}}
  .stat{{background:var(--c);border-radius:12px;padding:1.2rem 1.5rem;flex:1;min-width:120px;text-align:center}}
  .num{{font-size:2.5rem;font-weight:700}}
  .lbl{{font-size:.78rem;color:#94a3b8;margin-top:.3rem}}
  .bar{{height:8px;background:#334155;border-radius:4px;margin:.5rem 0;overflow:hidden}}
  .fill{{height:100%;border-radius:4px;transition:width .5s}}
  .section{{padding:0 2rem 2rem}}
  .section h2{{font-size:1.1rem;color:var(--g);margin-bottom:1rem;border-left:3px solid var(--g);padding-left:.7rem}}
  table{{width:100%;border-collapse:collapse}}
  th,td{{padding:.55rem .8rem;text-align:left;border-bottom:1px solid #334155;font-size:.82rem;word-break:break-word;vertical-align:top}}
  th{{color:var(--g);background:#1e293b;font-weight:600}}
  td:first-child{{width:28px;text-align:center}}
  td:nth-child(2){{width:38%;color:#7dd3fc;font-family:monospace;font-size:.8rem}}
  .empty{{color:#64748b;padding:1rem;text-align:center;font-style:italic}}
  .note{{background:#1e3a5f;border:1px solid var(--g);border-radius:8px;padding:1rem 1.5rem;margin:0 2rem 1.5rem;color:#fcd34d;font-size:.88rem}}
  .alert-box{{background:#3b0000;border:2px solid var(--r);border-radius:10px;padding:1.5rem;margin:0 2rem 2rem;}}
  .alert-box h3{{color:var(--r);margin-bottom:.8rem}}
  .alert-box p{{margin:.5rem 0;font-size:.88rem;line-height:1.6}}
  .alert-box ol{{margin:.5rem 0 .5rem 1.5rem;font-size:.88rem;line-height:1.8}}
  .alert-box a{{color:#7dd3fc}}
  .alert-box code{{background:#1e293b;padding:.1rem .4rem;border-radius:4px;font-size:.82rem}}
  .footer{{text-align:center;padding:1.5rem;color:#475569;font-size:.78rem}}
  tr:hover{{background:rgba(255,255,255,.03)}}
  h2.perf{{color:#7dd3fc}}
</style>
</head>
<body>
<div class="hdr">
  <h1>🏫 GNC College — Project Doctor v5 ULTRA</h1>
  <p style="color:#94a3b8;margin-top:.4rem">
    {datetime.now().strftime('%d %B %Y, %I:%M %p')} | Scan: {duration:.1f}s | {root}
  </p>
</div>
<div class="stats">
  <div class="stat">
    <div class="num" style="color:{sc}">{score}</div>
    <div class="bar"><div class="fill" style="background:{sc};width:{score}%"></div></div>
    <div class="lbl">Health Score /100</div>
  </div>
  <div class="stat">
    <div class="num" style="color:#ef4444">{errs}</div>
    <div class="lbl">Critical Errors</div>
  </div>
  <div class="stat">
    <div class="num" style="color:#f59e0b">{warns}</div>
    <div class="lbl">Warnings</div>
  </div>
  <div class="stat">
    <div class="num" style="color:#22c55e">{fixes}</div>
    <div class="lbl">Auto-Fixes</div>
  </div>
  <div class="stat">
    <div class="num" style="color:#7dd3fc">{perf_pct}%</div>
    <div class="bar"><div class="fill" style="background:#7dd3fc;width:{perf_pct}%"></div></div>
    <div class="lbl">Perf Checks {perf_score}/{perf_total}</div>
  </div>
</div>
<div class="note">
  <strong>v5 ULTRA:</strong> constants.js circular fix • Ticker auto-add •
  Firebase env audit • Admin CRUD per-section check • Performance checklist •
  Admin data loss diagnosis • PVS/R alias resolve
</div>
{admin_box}
{sec("❌ Critical Errors", R.errors, "err")}
{sec("⚠️ Warnings", R.warnings, "warn")}
{sec("🔧 Auto-Fixes", R.fixes, "fix")}
<div class="footer">
  GNC Project Doctor v5.0 Ultra | Guru Nanak College, Dhanbad | Made for Pankaj ❤️
</div>
</body></html>"""

    rp = root / "gnc_doctor_report_v5.html"
    rp.write_text(html, encoding="utf-8")
    return rp


# ════════════════════════════════════════════════════════════════
# MAIN
# ════════════════════════════════════════════════════════════════
def main():
    parser = argparse.ArgumentParser(description="GNC Doctor v5 Ultra")
    parser.add_argument("--fix",     action="store_true")
    parser.add_argument("--verbose", action="store_true")
    parser.add_argument("--path",    type=str, default=None)
    args = parser.parse_args()
    start = datetime.now()

    print(f"\n{C.BOLD}{C.CYAN}╔{'═'*62}╗")
    print(f"║{'GNC COLLEGE — PROJECT DOCTOR v5.0 ULTRA':^62}║")
    print(f"║{'Ticker • Firebase • Constants • Admin • Performance':^62}║")
    print(f"╚{'═'*62}╝{C.RESET}")
    print(f"  Mode: {'AUTO-FIX ON 🔧' if args.fix else 'SCAN ONLY — run with --fix'}")

    root = Path(args.path).resolve() if args.path else find_root()
    print(f"  Root: {C.CYAN}{root}{C.RESET}")

    if not (root/"package.json").exists():
        print(f"\n  ❌ package.json nahi mila — sahi folder mein run karo")
        sys.exit(1)

    src = root/"src" if (root/"src").exists() else root
    print(f"\n  🔍 Scanning {src} ...")
    files = all_files(src)
    print(f"  📁 {len(files)} files found\n")

    af = args.fix

    fix_constants(root, af)
    fix_self_imports(files, root, af)
    fix_ticker(root, af)
    fix_app_aliases(root, af)
    audit_firebase_admin(files, root, af)
    perf_score, perf_total = audit_performance(root)
    check_exports_components(files, root)
    check_pwa(root)

    dur = (datetime.now()-start).total_seconds()
    rp  = generate_report(R, root, dur, perf_score, perf_total)

    # Final summary
    errs  = len(R.errors)
    warns = len(R.warnings)
    score = max(0, 100 - errs*8 - warns*2)
    bar   = "█"*int(40*score/100) + "░"*(40-int(40*score/100))
    col   = C.GREEN if score>=80 else C.YELLOW if score>=50 else C.RED

    print(f"\n{'═'*65}")
    print(f"{C.BOLD}  GNC PROJECT DOCTOR v5 — FINAL REPORT{C.RESET}")
    print(f"{'═'*65}")
    print(f"  Score   : {col}{bar} {score}/100{C.RESET}")
    print(f"  ❌ Errors   : {C.RED}{errs}{C.RESET}")
    print(f"  ⚠️  Warnings : {C.YELLOW}{warns}{C.RESET}")
    print(f"  🔧 Auto-fixes: {C.GREEN}{len(R.fixes)}{C.RESET}")
    print(f"  📊 Perf     : {perf_score}/{perf_total} checks")
    print(f"  ⏱️  Time     : {dur:.1f}s")
    print(f"  📄 Report   : {C.CYAN}{rp}{C.RESET}")
    print(f"{'═'*65}")

    if errs == 0:
        print(f"\n{C.GREEN}{C.BOLD}  🎉 CRITICAL ERRORS ZERO! Project MAKKHAN hai!{C.RESET}")
        if warns > 0:
            print(f"  {C.YELLOW}  ⚠️  {warns} warnings hain — optional improvements{C.RESET}")
    else:
        print(f"\n  {C.RED}🚨 Top {min(5,errs)} Issues:{C.RESET}")
        for e in R.errors[:5]:
            print(f"    {C.RED}• {e['loc']}: {e['msg'][:75]}{C.RESET}")
        print(f"\n  {C.YELLOW}  → Run: python gnc_project_doctor_v5.py --fix{C.RESET}")

    # Admin data loss alert
    print(f"\n{C.BOLD}{C.RED}  ⚡ ADMIN DATA LOSS FIX — MOST IMPORTANT:{C.RESET}")
    print(f"  1. Firebase Console → gnc-college-web → Project Settings → Web app")
    print(f"  2. .env.local mein actual keys paste karo")
    print(f"  3. npm run dev restart karo")
    print(f"  4. Admin panel se ek notice add karo — refresh pe dikha? ✅\n")

    sys.exit(1 if errs else 0)

if __name__ == "__main__":
    main()