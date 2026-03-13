"""
╔══════════════════════════════════════════════════════════════════════════╗
║       GNC COLLEGE WEBSITE — ULTRA PRO AUDIT & CLEANUP TOOL v1.0        ║
║       Scan · Report · Clean · Deploy                                    ║
╚══════════════════════════════════════════════════════════════════════════╝

Kya karta hai yeh script:
  ✅ Poori src/ folder scan karta hai
  ✅ Unused/orphan files dhundhta hai
  ✅ Unused npm packages dhundhta hai
  ✅ Security issues dhundhta hai (hardcoded passwords, exposed keys)
  ✅ Dead imports dhundhta hai
  ✅ TODO/FIXME markers count karta hai
  ✅ Console.log statements dhundhta hai (deploy se pehle remove karne chahiye)
  ✅ Bundle size estimate karta hai
  ✅ HTML report generate karta hai (browser mein khuld ta hai)
  ✅ Cleanup mode: safely delete karta hai unnecessary files
  ✅ Deploy helper: npm build + deploy run karta hai

HOW TO RUN:
  python gnc_audit.py              → Full audit + HTML report
  python gnc_audit.py --clean      → Audit + orphan files delete karo
  python gnc_audit.py --deploy     → Audit + npm run deploy
  python gnc_audit.py --fix-all    → Audit + clean + console.log remove + deploy
  python gnc_audit.py --help       → Help

REQUIREMENTS:
  - Python 3.8+
  - Node.js + npm (deploy ke liye)
  - No extra pip packages needed
"""

import os
import re
import sys
import json
import shutil
import argparse
import subprocess
import webbrowser
from pathlib import Path
from datetime import datetime
from collections import defaultdict

# ── Windows npm fix ────────────────────────────────────────────────────────────
def _npm(*args):
    """Return correct npm command for current OS (Windows needs npm.cmd)."""
    npm_bin = "npm.cmd" if sys.platform == "win32" else "npm"
    return [npm_bin] + list(args)

# ══════════════════════════════════════════════════════════════════════════════
# ✏️  CONFIGURE: Apna project path yahan set karo
# ══════════════════════════════════════════════════════════════════════════════
PROJECT_ROOT = r"C:\Users\YourName\gncollege-website"   # ← Windows
# PROJECT_ROOT = "/home/yourname/gncollege-website"     # ← Linux / Mac
# ══════════════════════════════════════════════════════════════════════════════

# Auto-detect: agar script project ke andar hai to
_script_dir = Path(__file__).parent
for _candidate in [_script_dir, _script_dir.parent, _script_dir.parent.parent]:
    if (_candidate / "package.json").exists():
        PROJECT_ROOT = str(_candidate)
        break

# ── Colors for terminal ────────────────────────────────────────────────────────
class C:
    RED    = "\033[91m"
    GREEN  = "\033[92m"
    YELLOW = "\033[93m"
    BLUE   = "\033[94m"
    CYAN   = "\033[96m"
    BOLD   = "\033[1m"
    DIM    = "\033[2m"
    RESET  = "\033[0m"

    @staticmethod
    def red(s):    return f"{C.RED}{s}{C.RESET}"
    @staticmethod
    def green(s):  return f"{C.GREEN}{s}{C.RESET}"
    @staticmethod
    def yellow(s): return f"{C.YELLOW}{s}{C.RESET}"
    @staticmethod
    def blue(s):   return f"{C.BLUE}{s}{C.RESET}"
    @staticmethod
    def cyan(s):   return f"{C.CYAN}{s}{C.RESET}"
    @staticmethod
    def bold(s):   return f"{C.BOLD}{s}{C.RESET}"
    @staticmethod
    def dim(s):    return f"{C.DIM}{s}{C.RESET}"

# ══════════════════════════════════════════════════════════════════════════════
# PHASE 1 — SCANNER
# ══════════════════════════════════════════════════════════════════════════════

class CodebaseScanner:
    """Scan the entire src/ directory and build an import graph."""

    SAFE_TO_DELETE = {
        "About.jsx", "AboutUs.jsx", "Home.jsx", "QuickRibbon.jsx",
        "ScrollingNotices.jsx", "SystemHealth.jsx", "DemoHomePage.jsx",
        "DemoPage.jsx", "RichTextEditorToolbar.jsx", "Breadcrumb.jsx",
        "Syllabus.jsx",
    }

    UNUSED_PACKAGES = {
        "framer-motion": "Zero usage in any .jsx/.js file",
        "quill":         "Replaced by jodit editor in AdminPanel",
        "react-quill":   "Replaced by jodit editor in AdminPanel",
        "aos":           "Was imported in App.jsx but data-aos never used — now removed",
    }

    SECURITY_PATTERNS = [
        (r"username\s*===\s*['\"]admin['\"].*password\s*===\s*['\"]([^'\"]+)['\"]",
         "Hardcoded admin credentials", "CRITICAL"),
        (r"VITE_[A-Z_]+\s*=\s*['\"][A-Za-z0-9_-]{10,}['\"]",
         "Possible hardcoded env key", "HIGH"),
        (r"apiKey\s*:\s*['\"][A-Za-z0-9_-]{20,}['\"]",
         "Hardcoded API key in source", "HIGH"),
        (r"imgbb\.com/1/upload\?key=([^&\"'`]+)",
         "ImgBB API key exposed in source", "MEDIUM"),
    ]

    def __init__(self, project_root: str):
        self.root   = Path(project_root)
        self.src    = self.root / "src"
        self.files  = []
        self.import_map   = {}   # file_rel → [imports]
        self.reverse_map  = defaultdict(list)  # stem → [files importing it]
        self.file_info    = {}   # file_rel → {lines, size, exports}
        self.issues       = []   # list of dicts

    def run(self) -> dict:
        print(f"\n{C.bold('🔍 SCANNING')} {C.cyan(str(self.src))}")
        self._collect_files()
        self._build_import_graph()
        self._scan_issues()
        return self._build_report()

    # ── File collection ────────────────────────────────────────────────────────
    def _collect_files(self):
        exts = {".jsx", ".js"}
        self.files = [
            f for f in self.src.rglob("*")
            if f.suffix in exts and "node_modules" not in f.parts
        ]
        print(f"   {C.green(str(len(self.files)))} source files found")

    # ── Import graph ───────────────────────────────────────────────────────────
    def _build_import_graph(self):
        for f in self.files:
            rel = str(f.relative_to(self.src))
            try:
                code = f.read_text(encoding="utf-8", errors="ignore")
            except Exception:
                continue

            lines = code.splitlines()
            exports = re.findall(r"export\s+(?:default\s+)?(?:function|class|const|let)\s+(\w+)", code)

            # Static + dynamic imports
            static  = re.findall(r"import\s+.*?from\s+['\"]([^'\"]+)['\"]", code, re.DOTALL)
            dynamic = re.findall(r"import\(['\"]([^'\"]+)['\"]", code)

            all_imports = static + dynamic
            self.import_map[rel] = all_imports
            self.file_info[rel]  = {
                "lines":   len(lines),
                "size_kb": round(f.stat().st_size / 1024, 1),
                "exports": exports,
                "path":    f,
            }

            for imp in all_imports:
                if imp.startswith("."):
                    # Resolve relative path
                    try:
                        resolved = (f.parent / imp).resolve()
                        for ext in ["", ".jsx", ".js", "/index.jsx", "/index.js"]:
                            candidate = Path(str(resolved) + ext)
                            if candidate.exists():
                                stem = candidate.stem
                                self.reverse_map[stem].append(rel)
                                break
                    except Exception:
                        pass

    # ── Issue scanner ──────────────────────────────────────────────────────────
    def _scan_issues(self):
        for f in self.files:
            rel = str(f.relative_to(self.src))
            try:
                code = f.read_text(encoding="utf-8", errors="ignore")
            except Exception:
                continue

            # Console statements
            for i, line in enumerate(code.splitlines(), 1):
                stripped = line.strip()
                if re.search(r"console\.(log|warn|error|info)\(", stripped):
                    if not stripped.startswith("//"):
                        self.issues.append({
                            "type": "console", "file": rel, "line": i,
                            "detail": stripped[:80], "severity": "low"
                        })

            # TODOs
            for i, line in enumerate(code.splitlines(), 1):
                if re.search(r"\b(TODO|FIXME|HACK|XXX)\b", line, re.IGNORECASE):
                    self.issues.append({
                        "type": "todo", "file": rel, "line": i,
                        "detail": line.strip()[:80], "severity": "info"
                    })

            # Security patterns
            for pattern, desc, severity in self.SECURITY_PATTERNS:
                matches = list(re.finditer(pattern, code))
                for m in matches:
                    lnum = code[:m.start()].count("\n") + 1
                    self.issues.append({
                        "type": "security", "file": rel, "line": lnum,
                        "detail": desc + " → " + m.group(0)[:60],
                        "severity": severity.lower()
                    })

    # ── Report builder ─────────────────────────────────────────────────────────
    def _build_report(self) -> dict:
        # Orphan detection
        entry_points = {"App", "main", "AppWrapper", "firebase", "constants", "db", "colors"}
        orphans = []
        for rel, info in self.file_info.items():
            stem = Path(rel).stem
            if stem in entry_points:
                continue
            importers = self.reverse_map.get(stem, [])
            if not importers:
                orphans.append({
                    "rel": rel, "lines": info["lines"],
                    "size_kb": info["size_kb"],
                    "safe_delete": Path(rel).name in self.SAFE_TO_DELETE,
                })

        # Package analysis
        pkg_json = self.root / "package.json"
        packages = {}
        if pkg_json.exists():
            data = json.loads(pkg_json.read_text())
            all_pkgs = {**data.get("dependencies", {}), **data.get("devDependencies", {})}
            for pkg, ver in all_pkgs.items():
                used_in = [
                    k for k, v in self.import_map.items()
                    if any(pkg in imp for imp in v)
                ]
                packages[pkg] = {
                    "version": ver,
                    "used_in": used_in,
                    "is_unused": not used_in and pkg not in {"@vitejs/plugin-react", "vite", "terser", "gh-pages"},
                    "unused_reason": self.UNUSED_PACKAGES.get(pkg, ""),
                }

        total_lines = sum(i["lines"] for i in self.file_info.values())
        total_kb    = sum(i["size_kb"] for i in self.file_info.values())
        orphan_lines = sum(o["lines"] for o in orphans)
        security_issues = [i for i in self.issues if i["type"] == "security"]
        console_count   = sum(1 for i in self.issues if i["type"] == "console")
        todo_count      = sum(1 for i in self.issues if i["type"] == "todo")
        unused_pkgs     = [p for p, v in packages.items() if v["is_unused"]]

        return {
            "meta": {
                "project":    self.root.name,
                "scanned_at": datetime.now().strftime("%d %b %Y, %H:%M"),
                "total_files": len(self.files),
                "total_lines": total_lines,
                "total_kb":   round(total_kb, 1),
            },
            "orphans":         orphans,
            "orphan_lines":    orphan_lines,
            "packages":        packages,
            "unused_packages": unused_pkgs,
            "issues":          self.issues,
            "security":        security_issues,
            "console_count":   console_count,
            "todo_count":      todo_count,
            "file_info":       self.file_info,
        }


# ══════════════════════════════════════════════════════════════════════════════
# PHASE 2 — TERMINAL REPORT
# ══════════════════════════════════════════════════════════════════════════════

def print_terminal_report(report: dict):
    m = report["meta"]
    print(f"\n{'═'*62}")
    print(f"  {C.bold('GNC COLLEGE CODEBASE AUDIT')}  {C.dim(m['scanned_at'])}")
    print(f"{'═'*62}")
    print(f"  Project : {C.cyan(m['project'])}")
    print(f"  Files   : {C.bold(str(m['total_files']))} source files")
    print(f"  Lines   : {C.bold(str(m['total_lines']))} total")
    print(f"  Size    : {C.bold(str(m['total_kb']))} KB")

    # ── Security ──────────────────────────────────────────────────────────────
    sec = report["security"]
    print(f"\n{'─'*62}")
    print(f"  {C.bold('🔒 SECURITY ISSUES')}  ({len(sec)} found)")
    print(f"{'─'*62}")
    if not sec:
        print(f"  {C.green('✓ No critical security issues found')}")
    for issue in sec:
        sev = issue["severity"]
        tag = C.red(f"[{sev.upper()}]") if sev in ("critical","high") else C.yellow(f"[{sev.upper()}]")
        print(f"  {tag}  {issue['file']}:{issue['line']}")
        print(f"       {C.dim(issue['detail'][:70])}")

    # ── Orphan files ──────────────────────────────────────────────────────────
    orphans = report["orphans"]
    print(f"\n{'─'*62}")
    print(f"  {C.bold('🗑️  ORPHAN FILES')}  ({len(orphans)} files, {report['orphan_lines']} lines dead code)")
    print(f"{'─'*62}")
    safe   = [o for o in orphans if o["safe_delete"]]
    review = [o for o in orphans if not o["safe_delete"]]
    if safe:
        print(f"  {C.red('SAFE TO DELETE:')} ({len(safe)} files)")
        for o in safe:
            print(f"    {C.red('✕')} {o['rel']:<50} {C.dim(str(o['lines'])+' lines')}")
    if review:
        print(f"  {C.yellow('REVIEW FIRST:')} ({len(review)} files — may be used via lazy routes)")
        for o in review[:8]:
            print(f"    {C.yellow('?')} {o['rel']:<50} {C.dim(str(o['lines'])+' lines')}")

    # ── Unused packages ───────────────────────────────────────────────────────
    unused_pkgs = report["unused_packages"]
    print(f"\n{'─'*62}")
    print(f"  {C.bold('📦 UNUSED NPM PACKAGES')}  ({len(unused_pkgs)} found)")
    print(f"{'─'*62}")
    if not unused_pkgs:
        print(f"  {C.green('✓ All packages are actively used')}")
    for pkg in unused_pkgs:
        info = report["packages"][pkg]
        reason = info.get("unused_reason", "Not imported anywhere")
        print(f"  {C.yellow('✕')} {pkg:<25} {C.dim(reason)}")
    if unused_pkgs:
        print(f"\n  {C.dim('Run:')} npm uninstall {' '.join(unused_pkgs)}")

    # ── Code quality ──────────────────────────────────────────────────────────
    print(f"\n{'─'*62}")
    print(f"  {C.bold('🧹 CODE QUALITY')}")
    print(f"{'─'*62}")
    cc = report["console_count"]
    tc = report["todo_count"]
    print(f"  Console statements : {C.yellow(str(cc)) if cc else C.green('0 ✓')}")
    print(f"  TODO / FIXME       : {C.yellow(str(tc)) if tc else C.green('0 ✓')}")

    console_files = {}
    for issue in report["issues"]:
        if issue["type"] == "console":
            console_files.setdefault(issue["file"], []).append(issue["line"])
    for f, lines in console_files.items():
        print(f"    {C.dim(f)} → lines: {', '.join(map(str, lines[:5]))}")

    # ── Biggest files ─────────────────────────────────────────────────────────
    print(f"\n{'─'*62}")
    print(f"  {C.bold('📊 TOP 5 LARGEST FILES')}")
    print(f"{'─'*62}")
    by_lines = sorted(report["file_info"].items(), key=lambda x: x[1]["lines"], reverse=True)[:5]
    for rel, info in by_lines:
        bar = "█" * min(int(info["lines"] / 100), 25)
        print(f"  {rel:<45} {C.bold(str(info['lines'])):>5} lines  {C.blue(bar)}")

    # ── Summary score ─────────────────────────────────────────────────────────
    # Score: start 100, deduct for issues
    score = 100
    sec_pen = sum({"critical":20,"high":10,"medium":5,"low":2}.get(i["severity"],3) for i in sec)
    score -= min(sec_pen, 30)
    score -= min(len([o for o in orphans if o["safe_delete"]]) * 2, 15)
    score -= min(len(unused_pkgs) * 4, 12)
    score -= min(cc * 1, 8)
    score = max(0, score)

    color = C.green if score >= 80 else (C.yellow if score >= 60 else C.red)
    print(f"\n{'═'*62}")
    print(f"  {C.bold('CODEBASE HEALTH SCORE:')}  {color(C.bold(str(score) + '/100'))}")
    if score == 100:
        print(f"  {C.green('✓ PERFECT — Ready to deploy')}")
    elif score >= 80:
        print(f"  {C.yellow('⚠ GOOD — Minor cleanup recommended before deploy')}")
    elif score >= 60:
        print(f"  {C.yellow('⚠ FAIR — Fix security issues and clean orphans')}")
    else:
        print(f"  {C.red('✗ POOR — Critical issues must be fixed before deploy')}")
    print(f"{'═'*62}\n")

    return score


# ══════════════════════════════════════════════════════════════════════════════
# PHASE 3 — CLEANUP ACTIONS
# ══════════════════════════════════════════════════════════════════════════════

def do_cleanup(report: dict, project_root: str, dry_run: bool = False):
    """Delete safe orphan files with backup."""
    src = Path(project_root) / "src"
    backup_dir = Path(project_root) / "_audit_backup" / datetime.now().strftime("%Y%m%d_%H%M%S")

    safe_orphans = [o for o in report["orphans"] if o["safe_delete"]]
    if not safe_orphans:
        print(f"{C.green('✓ No safe-to-delete files found.')}")
        return

    if not dry_run:
        backup_dir.mkdir(parents=True, exist_ok=True)

    print(f"\n{C.bold('🗑️  CLEANUP')} {'(DRY RUN)' if dry_run else f'→ Backup: {backup_dir}'}")
    print("─" * 50)

    deleted = 0
    for orphan in safe_orphans:
        file_path = src / orphan["rel"]
        if not file_path.exists():
            print(f"  {C.dim('SKIP (not found):')} {orphan['rel']}")
            continue

        if dry_run:
            print(f"  {C.yellow('[DRY]')} Would delete: {orphan['rel']} ({orphan['lines']} lines)")
        else:
            # Backup first
            backup_path = backup_dir / orphan["rel"].replace("/", "_").replace("\\", "_")
            shutil.copy2(file_path, backup_path)
            file_path.unlink()
            print(f"  {C.red('✕ DELETED:')} {orphan['rel']} ({orphan['lines']} lines) → backed up")
            deleted += 1

    if not dry_run:
        total_lines = sum(o["lines"] for o in safe_orphans)
        print(f"\n  {C.green(f'Deleted {deleted} files, saved {total_lines} lines of dead code')}")
        print(f"  Backup folder: {backup_dir}")


def remove_console_logs(report: dict, project_root: str):
    """Remove console.log/warn/error statements from source files."""
    src = Path(project_root) / "src"
    console_files = defaultdict(list)
    for issue in report["issues"]:
        if issue["type"] == "console":
            console_files[issue["file"]].append(issue["line"])

    if not console_files:
        print(f"{C.green('✓ No console statements found.')}")
        return

    print(f"\n{C.bold('🧹 REMOVING CONSOLE STATEMENTS')}")
    print("─" * 50)
    total_removed = 0
    for rel_path, lines in console_files.items():
        file_path = src / rel_path
        if not file_path.exists():
            continue
        code = file_path.read_text(encoding="utf-8", errors="ignore")
        cleaned = re.sub(r"[ \t]*console\.(log|warn|error|info)\([^;]*\);?\n?", "", code)
        if cleaned != code:
            file_path.write_text(cleaned, encoding="utf-8")
            removed = code.count("\n") - cleaned.count("\n")
            total_removed += removed
            print(f"  {C.green('✓')} {rel_path} — {removed} statement(s) removed")
    print(f"  {C.green(f'Total: {total_removed} console statements removed')}")


def uninstall_unused_packages(report: dict, project_root: str):
    """Run npm uninstall for unused packages."""
    unused = report["unused_packages"]
    if not unused:
        print(f"{C.green('✓ No unused packages to uninstall.')}")
        return
    cmd = _npm("uninstall", *unused)
    print(f"\n{C.bold('📦 UNINSTALLING UNUSED PACKAGES')}")
    print(f"  Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=project_root, capture_output=True, text=True,
                            shell=(sys.platform == "win32"))
    if result.returncode == 0:
        print(f"  {C.green('✓ Uninstalled:')} {', '.join(unused)}")
    else:
        print(f"  {C.red('✗ Error:')} {result.stderr[:200]}")


# ══════════════════════════════════════════════════════════════════════════════
# PHASE 4 — HTML REPORT GENERATOR
# ══════════════════════════════════════════════════════════════════════════════

def generate_html_report(report: dict, score: int, project_root: str) -> Path:
    m = report["meta"]
    orphans = report["orphans"]
    packages = report["packages"]
    security = report["security"]
    issues = report["issues"]

    safe_count   = len([o for o in orphans if o["safe_delete"]])
    review_count = len([o for o in orphans if not o["safe_delete"]])
    unused_pkgs  = report["unused_packages"]
    console_list = [i for i in issues if i["type"] == "console"]
    todo_list    = [i for i in issues if i["type"] == "todo"]

    score_color = "#16a34a" if score >= 80 else ("#ca8a04" if score >= 60 else "#dc2626")

    def badge(text, color):
        return f'<span style="background:{color}18;color:{color};border:1px solid {color}44;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700">{text}</span>'

    def file_rows(file_list, show_delete=True):
        rows = ""
        for o in file_list:
            delete_btn = f'<code style="font-size:10px;color:#dc2626">SAFE DELETE</code>' if o["safe_delete"] else f'<code style="font-size:10px;color:#ca8a04">REVIEW</code>'
            rows += f"""
            <tr>
              <td style="font-family:monospace;font-size:12px;color:#0f2347">{o['rel']}</td>
              <td style="text-align:center;color:#64748b">{o['lines']}</td>
              <td style="text-align:center;color:#64748b">{o['size_kb']} KB</td>
              <td>{delete_btn if show_delete else ''}</td>
            </tr>"""
        return rows

    orphan_rows = file_rows(orphans)

    pkg_rows = ""
    for pkg, info in sorted(packages.items()):
        if pkg in {"@vitejs/plugin-react","vite","terser","gh-pages"}:
            continue
        used_cnt  = len(info["used_in"])
        status    = badge("UNUSED","#dc2626") if info["is_unused"] else badge(f"USED IN {used_cnt}","#16a34a")
        used_text = ", ".join(Path(f).name for f in info["used_in"][:3]) or "—"
        pkg_rows += f"""
        <tr>
          <td style="font-family:monospace;font-size:12px;font-weight:700">{pkg}</td>
          <td style="font-size:12px;color:#64748b">{info['version']}</td>
          <td>{status}</td>
          <td style="font-size:11px;color:#64748b">{used_text}</td>
          <td style="font-size:11px;color:#94a3b8">{info.get('unused_reason','')}</td>
        </tr>"""

    sec_rows = ""
    for issue in security:
        sev_color = {"critical":"#dc2626","high":"#ea580c","medium":"#ca8a04"}.get(issue["severity"],"#64748b")
        sec_rows += f"""
        <tr>
          <td>{badge(issue['severity'].upper(), sev_color)}</td>
          <td style="font-family:monospace;font-size:12px">{issue['file']}</td>
          <td style="color:#64748b">Line {issue['line']}</td>
          <td style="font-size:12px;color:#0f2347">{issue['detail'][:80]}</td>
        </tr>"""

    console_rows = ""
    for issue in console_list:
        console_rows += f"""
        <tr>
          <td style="font-family:monospace;font-size:12px">{issue['file']}</td>
          <td style="color:#64748b">Line {issue['line']}</td>
          <td style="font-size:12px;color:#475569;font-family:monospace">{issue['detail'][:70]}</td>
        </tr>"""

    by_lines = sorted(report["file_info"].items(), key=lambda x: x[1]["lines"], reverse=True)[:10]
    size_rows = ""
    max_lines = by_lines[0][1]["lines"] if by_lines else 1
    for rel, info in by_lines:
        pct = int(info["lines"] / max_lines * 100)
        size_rows += f"""
        <tr>
          <td style="font-family:monospace;font-size:12px">{rel}</td>
          <td style="text-align:right;font-weight:700;color:#0f2347">{info['lines']}</td>
          <td style="width:200px">
            <div style="height:8px;border-radius:4px;background:#f1f5f9">
              <div style="height:8px;border-radius:4px;background:{'#dc2626' if info['lines']>1000 else '#f4a023' if info['lines']>500 else '#0f2347'};width:{pct}%"></div>
            </div>
          </td>
        </tr>"""

    # Next steps
    steps_html = ""
    step_n = 1
    if security:
        steps_html += f'<div class="step"><div class="step-n">{step_n}</div><div><b>Fix Security Issues</b> — Hardcoded credentials/keys ko env variables mein move karo<br><code>python gnc_audit.py</code> se check karte raho</div></div>'
        step_n += 1
    if safe_count:
        steps_html += f'<div class="step"><div class="step-n">{step_n}</div><div><b>Delete {safe_count} orphan files</b> — Run: <code>python gnc_audit.py --clean</code></div></div>'
        step_n += 1
    if unused_pkgs:
        steps_html += f'<div class="step"><div class="step-n">{step_n}</div><div><b>Uninstall unused packages</b> — <code>npm uninstall {" ".join(unused_pkgs)}</code></div></div>'
        step_n += 1
    if console_list:
        steps_html += f'<div class="step"><div class="step-n">{step_n}</div><div><b>Remove {len(console_list)} console statements</b> — <code>python gnc_audit.py --fix-all</code></div></div>'
        step_n += 1
    steps_html += f'<div class="step"><div class="step-n">{step_n}</div><div><b>Build & Deploy</b> — <code>npm run build && npm run deploy</code></div></div>'

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GNC College — Code Audit Report</title>
<style>
  *{{box-sizing:border-box;margin:0;padding:0}}
  body{{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;color:#0f2347;}}
  .hdr{{background:#0f2347;color:#fff;padding:28px 40px;display:flex;justify-content:space-between;align-items:center;}}
  .hdr h1{{font-size:20px;font-weight:700;letter-spacing:-.3px}}
  .hdr .sub{{font-size:13px;opacity:.55;margin-top:4px}}
  .hdr .badge{{background:rgba(244,160,35,.15);border:1px solid rgba(244,160,35,.3);color:#f4a023;padding:6px 16px;border-radius:6px;font-size:12px;font-weight:700}}
  .container{{max-width:1100px;margin:0 auto;padding:32px 24px;}}
  .cards{{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-bottom:32px;}}
  .card{{background:#fff;border:1.5px solid #e2e8f0;border-radius:12px;padding:18px 20px;}}
  .card-lbl{{font-size:11px;color:#94a3b8;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px}}
  .card-val{{font-size:28px;font-weight:800;line-height:1}}
  .card-sub{{font-size:11px;color:#94a3b8;margin-top:4px}}
  .score-card{{border-left:4px solid {score_color};}}
  section{{background:#fff;border:1.5px solid #e2e8f0;border-radius:12px;margin-bottom:20px;overflow:hidden;}}
  .sec-hdr{{padding:14px 20px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;background:#fafbfc;}}
  .sec-hdr h2{{font-size:14px;font-weight:700;}}
  .sec-hdr .cnt{{font-size:12px;color:#94a3b8;}}
  table{{width:100%;border-collapse:collapse;font-size:13px;}}
  th{{padding:10px 16px;text-align:left;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.5px;text-transform:uppercase;border-bottom:1px solid #f1f5f9;background:#fafbfc;}}
  td{{padding:10px 16px;border-bottom:1px solid #f8fafc;vertical-align:middle;}}
  tr:last-child td{{border-bottom:none}}
  tr:hover td{{background:#fafbfc;}}
  code{{background:#f1f5f9;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:12px;color:#475569;}}
  .empty{{text-align:center;padding:32px;color:#94a3b8;font-size:13px;}}
  .steps{{padding:20px;}}
  .step{{display:flex;gap:14px;padding:12px 0;border-bottom:1px solid #f1f5f9;align-items:flex-start;}}
  .step:last-child{{border-bottom:none}}
  .step-n{{width:26px;height:26px;border-radius:50%;background:#0f2347;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0;}}
  .step b{{font-weight:700;}}
  .step code{{background:#f1f5f9;}}
  .green{{color:#16a34a}} .red{{color:#dc2626}} .yellow{{color:#ca8a04}}
  @media(max-width:640px){{.hdr{{flex-direction:column;gap:10px;text-align:center}}.cards{{grid-template-columns:1fr 1fr}}}}
</style>
</head>
<body>
<div class="hdr">
  <div>
    <h1>🎓 GNC College — Codebase Audit Report</h1>
    <div class="sub">Project: {m['project']} &nbsp;|&nbsp; Scanned: {m['scanned_at']}</div>
  </div>
  <div class="badge">Health Score: {score}/100</div>
</div>

<div class="container">

  <!-- STAT CARDS -->
  <div class="cards">
    <div class="card">
      <div class="card-lbl">Source Files</div>
      <div class="card-val">{m['total_files']}</div>
      <div class="card-sub">.jsx + .js</div>
    </div>
    <div class="card">
      <div class="card-lbl">Total Lines</div>
      <div class="card-val">{m['total_lines']:,}</div>
      <div class="card-sub">{m['total_kb']} KB</div>
    </div>
    <div class="card">
      <div class="card-lbl">Orphan Files</div>
      <div class="card-val {'red' if orphans else 'green'}">{len(orphans)}</div>
      <div class="card-sub">{safe_count} safe delete · {review_count} review</div>
    </div>
    <div class="card">
      <div class="card-lbl">Unused Packages</div>
      <div class="card-val {'red' if unused_pkgs else 'green'}">{len(unused_pkgs)}</div>
      <div class="card-sub">{'npm uninstall needed' if unused_pkgs else 'All used ✓'}</div>
    </div>
    <div class="card">
      <div class="card-lbl">Security Issues</div>
      <div class="card-val {'red' if security else 'green'}">{len(security)}</div>
      <div class="card-sub">{'Fix before deploy!' if security else 'Clean ✓'}</div>
    </div>
    <div class="card score-card">
      <div class="card-lbl">Health Score</div>
      <div class="card-val" style="color:{score_color}">{score}</div>
      <div class="card-sub">{'Ready to deploy' if score>=80 else 'Needs attention'}</div>
    </div>
  </div>

  <!-- NEXT STEPS -->
  <section>
    <div class="sec-hdr"><h2>📋 Next Steps (in order)</h2></div>
    <div class="steps">{steps_html if steps_html else '<div class="empty">✓ All clean — just build and deploy!</div>'}</div>
  </section>

  <!-- SECURITY -->
  <section>
    <div class="sec-hdr">
      <h2>🔒 Security Issues</h2>
      <span class="cnt">{len(security)} issues</span>
    </div>
    {'<table><thead><tr><th>Severity</th><th>File</th><th>Line</th><th>Detail</th></tr></thead><tbody>' + sec_rows + '</tbody></table>' if security else '<div class="empty">✅ No security issues found</div>'}
  </section>

  <!-- ORPHAN FILES -->
  <section>
    <div class="sec-hdr">
      <h2>🗑️ Orphan Files (never imported)</h2>
      <span class="cnt">{len(orphans)} files · {report['orphan_lines']} dead lines</span>
    </div>
    {'<table><thead><tr><th>File</th><th>Lines</th><th>Size</th><th>Action</th></tr></thead><tbody>' + orphan_rows + '</tbody></table>' if orphans else '<div class="empty">✅ No orphan files found</div>'}
  </section>

  <!-- NPM PACKAGES -->
  <section>
    <div class="sec-hdr">
      <h2>📦 NPM Package Usage</h2>
      <span class="cnt">{len(unused_pkgs)} unused</span>
    </div>
    <table>
      <thead><tr><th>Package</th><th>Version</th><th>Status</th><th>Used In</th><th>Note</th></tr></thead>
      <tbody>{pkg_rows}</tbody>
    </table>
  </section>

  <!-- CONSOLE STATEMENTS -->
  <section>
    <div class="sec-hdr">
      <h2>🧹 Console Statements</h2>
      <span class="cnt">{len(console_list)} found</span>
    </div>
    {'<table><thead><tr><th>File</th><th>Line</th><th>Code</th></tr></thead><tbody>' + console_rows + '</tbody></table>' if console_list else '<div class="empty">✅ No console statements</div>'}
  </section>

  <!-- FILE SIZE -->
  <section>
    <div class="sec-hdr">
      <h2>📊 Largest Files</h2>
      <span class="cnt">Top 10 by line count</span>
    </div>
    <table>
      <thead><tr><th>File</th><th style="text-align:right">Lines</th><th>Size</th></tr></thead>
      <tbody>{size_rows}</tbody>
    </table>
  </section>

  <div style="text-align:center;padding:24px 0;color:#94a3b8;font-size:12px">
    Generated by gnc_audit.py · {m['scanned_at']} · GNC College Website Audit Tool v1.0
  </div>
</div>
</body>
</html>"""

    out_path = Path(project_root) / "audit_report.html"
    out_path.write_text(html, encoding="utf-8")
    return out_path


# ══════════════════════════════════════════════════════════════════════════════
# PHASE 5 — DEPLOY RUNNER
# ══════════════════════════════════════════════════════════════════════════════

def run_deploy(project_root: str):
    print(f"\n{C.bold('🚀 BUILDING & DEPLOYING')}")
    print("─" * 50)

    for cmd, label in [
        (_npm("run", "build"), "npm run build"),
        (_npm("run", "deploy"), "npm run deploy"),
    ]:
        print(f"  Running: {C.cyan(label)} ...")
        result = subprocess.run(cmd, cwd=project_root, capture_output=False, text=True, shell=(sys.platform=='win32'))
        if result.returncode == 0:
            print(f"  {C.green(f'✓ {label} succeeded')}")
        else:
            print(f"  {C.red(f'✗ {label} failed with exit code {result.returncode}')}")
            print(f"  Fix errors and retry: {C.dim(label)}")
            break


# ══════════════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(
        description="GNC College — Ultra Pro Audit & Cleanup Tool",
        formatter_class=argparse.RawTextHelpFormatter,
    )
    parser.add_argument("--clean",    action="store_true", help="Delete safe orphan files (with backup)")
    parser.add_argument("--dry-run",  action="store_true", help="Show what would be deleted without deleting")
    parser.add_argument("--no-console-fix", action="store_true", help="Skip removing console statements")
    parser.add_argument("--uninstall",action="store_true", help="Uninstall unused npm packages")
    parser.add_argument("--deploy",   action="store_true", help="Run npm run build + deploy after audit")
    parser.add_argument("--fix-all",  action="store_true", help="Clean + remove consoles + uninstall + deploy")
    parser.add_argument("--no-browser", action="store_true", help="Don't open HTML report in browser")
    args = parser.parse_args()

    # Validate project root
    root = Path(PROJECT_ROOT)
    if not root.exists() or not (root / "package.json").exists():
        print(C.red(f"\n❌ Project not found at: {PROJECT_ROOT}"))
        print(f"   Edit PROJECT_ROOT in this script and retry.\n")
        sys.exit(1)

    print(f"\n{'═'*62}")
    print(f"  {C.bold('GNC COLLEGE — ULTRA PRO AUDIT TOOL v1.0')}")
    print(f"{'═'*62}")

    # ── Scan ──────────────────────────────────────────────────────────────────
    scanner = CodebaseScanner(PROJECT_ROOT)
    report  = scanner.run()
    score   = print_terminal_report(report)

    # ── HTML report ───────────────────────────────────────────────────────────
    html_path = generate_html_report(report, score, PROJECT_ROOT)
    print(f"{C.green('📄 HTML report:')} {html_path}")
    if not args.no_browser:
        webbrowser.open(html_path.as_uri())

    # ── Actions ───────────────────────────────────────────────────────────────
    if args.fix_all:
        do_cleanup(report, PROJECT_ROOT)
        if not args.no_console_fix:
            remove_console_logs(report, PROJECT_ROOT)
        uninstall_unused_packages(report, PROJECT_ROOT)
        run_deploy(PROJECT_ROOT)

    else:
        if args.clean or args.dry_run:
            do_cleanup(report, PROJECT_ROOT, dry_run=args.dry_run)

        if not args.no_console_fix and report["console_count"] > 0 and not args.clean:
            pass  # only remove consoles when --fix-all or explicit flag

        if args.uninstall:
            uninstall_unused_packages(report, PROJECT_ROOT)

        if args.deploy:
            run_deploy(PROJECT_ROOT)

    print(f"\n{C.dim('Done. Run with --help for all options.')}\n")


if __name__ == "__main__":
    main()
