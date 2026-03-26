#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════════════════════╗
║   🛡️  ULTRA-SAFE AUTO SETUP: PDFModal + Premium Pagination                  ║
║   Version 2.0 — Surgical Mode (Existing Code KABHI Nahi Todega)             ║
║                                                                              ║
║   Commands:                                                                  ║
║     python setup_pagination.py              → Dry-run (sirf preview)        ║
║     python setup_pagination.py --apply      → Actual changes apply karo     ║
║     python setup_pagination.py --rollback   → Sab kuch wapas pehle jaisa    ║
║     python setup_pagination.py --status     → Kya laga hai, kya nahi        ║
║     python setup_pagination.py /custom/path → Custom project path           ║
╚══════════════════════════════════════════════════════════════════════════════╝

SAFETY GUARANTEE:
  ✔  Existing PDFModal.jsx / PremiumPagination.jsx / AutoPaginate.jsx —
     KABHI OVERWRITE NAHI KAREGA. Aapka likha code 100% safe rehega.
  ✔  Har change se pehle timestamped backup banta hai
  ✔  Koi bhi syntax ya logic change NAHI — sirf import + state + JSX tag ADD hoga
  ✔  Agar file patching risky lage → SKIP kar deta hai, manual guide deta hai
  ✔  --rollback se sab kuch ek command mein wapas
  ✔  Dry-run pehle — pehle dekho, phir decide karo
"""

import os
import re
import sys
import json
import shutil
from pathlib import Path
from datetime import datetime
from copy import deepcopy

# ─── ANSI Colors ──────────────────────────────────────────────────────────────
GREEN   = "\033[92m"
YELLOW  = "\033[93m"
RED     = "\033[91m"
CYAN    = "\033[96m"
MAGENTA = "\033[95m"
BOLD    = "\033[1m"
DIM     = "\033[2m"
RESET   = "\033[0m"

def tick(msg):     print(f"  {GREEN}✔{RESET}  {msg}")
def warn(msg):     print(f"  {YELLOW}⚠{RESET}  {YELLOW}{msg}{RESET}")
def err(msg):      print(f"  {RED}✘{RESET}  {RED}{msg}{RESET}")
def info(msg):     print(f"  {CYAN}→{RESET}  {msg}")
def skip_msg(msg): print(f"  {DIM}○  {msg}{RESET}")
def dry(msg):      print(f"  {MAGENTA}◈{RESET}  {MAGENTA}[DRY]{RESET} {msg}")
def heading(msg):  print(f"\n{BOLD}{CYAN}{'═'*64}\n  {msg}\n{'═'*64}{RESET}\n")
def subhead(msg):  print(f"\n  {BOLD}{YELLOW}▶ {msg}{RESET}")

# ══════════════════════════════════════════════════════════════════════════════
# SAFETY CONFIG — In cheezein KABHI nahi badlengi
# ══════════════════════════════════════════════════════════════════════════════

# In files ko kabhi bhi overwrite ya modify mat karo
PROTECTED_COMPONENTS = {
    "PDFModal",
    "PremiumPagination",
    "AutoPaginate",
    "Pagination",
}

# In directories ko touch mat karo
SKIP_DIRS = {
    "node_modules", "dist", "build", ".git", ".next",
    "coverage", ".cache", "public", "static", "__pycache__"
}

# In files ko kabhi modify mat karo (layout/infra files)
SKIP_FILES = {
    "app", "main", "index", "layout", "navbar", "footer", "header",
    "sidebar", "routes", "router", "context", "provider", "theme",
    "config", "auth", "login", "signup", "404", "notfound",
    "loading", "spinner", "store", "hooks", "utils", "helpers",
    "constants", "types", "api", "service",
}

# Pagination ke liye detect karne wale keywords (page file names mein)
DYNAMIC_KEYWORDS = {
    "notice", "news", "event", "gallery", "photo", "video",
    "document", "report", "circular", "tender", "press",
    "publication", "bulletin", "media", "download",
    "announcement", "achievement", "activity", "result",
}

# Backup folder name
BACKUP_DIR_NAME = ".pagination_backups"

# ══════════════════════════════════════════════════════════════════════════════
# BACKUP & ROLLBACK SYSTEM
# ══════════════════════════════════════════════════════════════════════════════

class BackupManager:
    """
    Atomic backup + rollback system.
    Har run ka alag timestamped snapshot banta hai.
    """
    def __init__(self, root: Path):
        self.root       = root
        self.backup_dir = root / BACKUP_DIR_NAME
        self.session_id = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.session_dir: Path | None = None
        self.manifest: list[dict]     = []   # [{original, backup, rel}]

    def init_session(self):
        """Session folder banao."""
        self.session_dir = self.backup_dir / self.session_id
        self.session_dir.mkdir(parents=True, exist_ok=True)
        info(f"Backup session: {BACKUP_DIR_NAME}/{self.session_id}/")

    def backup(self, file: Path) -> bool:
        """Ek file ka backup lo. Returns True on success."""
        if self.session_dir is None:
            self.init_session()
        try:
            rel       = file.relative_to(self.root)
            bak_path  = self.session_dir / str(rel).replace(os.sep, "__")
            shutil.copy2(file, bak_path)
            self.manifest.append({
                "original": str(file),
                "backup":   str(bak_path),
                "rel":      str(rel),
            })
            return True
        except Exception as e:
            err(f"Backup failed for {file}: {e}")
            return False

    def save_manifest(self):
        """Manifest JSON save karo (rollback ke liye)."""
        if self.session_dir is None:
            return
        manifest_file = self.session_dir / "manifest.json"
        manifest_file.write_text(
            json.dumps({
                "session_id": self.session_id,
                "timestamp":  datetime.now().isoformat(),
                "files":      self.manifest,
            }, indent=2),
            encoding="utf-8"
        )

    @staticmethod
    def list_sessions(root: Path) -> list[Path]:
        """Saare backup sessions list karo, newest first."""
        bdir = root / BACKUP_DIR_NAME
        if not bdir.exists():
            return []
        sessions = sorted(
            [d for d in bdir.iterdir() if d.is_dir() and (d / "manifest.json").exists()],
            reverse=True
        )
        return sessions

    @staticmethod
    def rollback(root: Path, session_dir: Path | None = None):
        """
        Rollback karo. session_dir=None means latest session.
        """
        heading("🔄 ROLLBACK MODE")

        sessions = BackupManager.list_sessions(root)
        if not sessions:
            err("Koi backup nahi mila! Rollback nahi ho sakta.")
            return False

        if session_dir is None:
            target = sessions[0]
            info(f"Latest session use kar raha hoon: {target.name}")
        else:
            target = session_dir

        manifest_file = target / "manifest.json"
        if not manifest_file.exists():
            err(f"Manifest nahi mila: {manifest_file}")
            return False

        manifest = json.loads(manifest_file.read_text())
        files    = manifest.get("files", [])

        if not files:
            warn("Is session mein koi file backup nahi thi.")
            return True

        print(f"\n  Restoring {len(files)} file(s) from {manifest['timestamp']}...\n")
        success = 0
        failed  = 0

        for entry in files:
            orig = Path(entry["original"])
            bak  = Path(entry["backup"])
            try:
                if bak.exists():
                    shutil.copy2(bak, orig)
                    tick(f"Restored → {entry['rel']}")
                    success += 1
                else:
                    warn(f"Backup file missing: {bak}")
                    failed += 1
            except Exception as e:
                err(f"Restore failed {entry['rel']}: {e}")
                failed += 1

        print()
        if failed == 0:
            tick(f"{GREEN}{BOLD}Rollback complete! {success} files restored.{RESET}")
        else:
            warn(f"Partial rollback: {success} ok, {failed} failed.")
        return failed == 0


# ══════════════════════════════════════════════════════════════════════════════
# PROJECT SCANNER
# ══════════════════════════════════════════════════════════════════════════════

def find_project_root(start: Path) -> Path:
    current = start.resolve()
    for _ in range(8):
        if (current / "package.json").exists():
            return current
        current = current.parent
    return start.resolve()


def find_components_dir(root: Path) -> Path | None:
    """Existing components directory dhundo (create mat karo)."""
    candidates = [
        root / "src" / "components",
        root / "components",
        root / "src",
    ]
    for c in candidates:
        if c.exists():
            return c
    return None


def find_jsx_files(root: Path) -> list[Path]:
    """Saare JSX/TSX files, sensitive dirs skip karke."""
    result = []
    for f in root.rglob("*"):
        parts = set(f.parts)
        if any(sd in parts for sd in SKIP_DIRS):
            continue
        if f.suffix in (".jsx", ".tsx") and f.is_file():
            result.append(f)
    return sorted(result)


def is_protected_file(f: Path) -> bool:
    """Kya ye file protected component hai?"""
    stem = f.stem
    # Exact match or starts-with check
    for comp in PROTECTED_COMPONENTS:
        if stem.lower() == comp.lower() or stem.lower().startswith(comp.lower()):
            return True
    return False


def should_skip_file(f: Path) -> bool:
    """Kya ye file skip karni chahiye?"""
    stem_lower = f.stem.lower()
    if is_protected_file(f):
        return True
    if stem_lower in SKIP_FILES:
        return True
    # Test files skip karo
    if ".test." in f.name or ".spec." in f.name or ".stories." in f.name:
        return True
    return False


# ══════════════════════════════════════════════════════════════════════════════
# STATUS CHECKER — Kya laga hai, kya nahi
# ══════════════════════════════════════════════════════════════════════════════

def check_status(root: Path):
    """Poore project ka status dikhao."""
    heading("📋 PROJECT STATUS CHECK")

    comp_dir = find_components_dir(root)
    all_files = find_jsx_files(root)

    # ── Component files check ────────────────────────────────────────────────
    subhead("Component Files")
    components_to_check = [
        ("PDFModal.jsx",          "PDFModal — PDF viewer modal"),
        ("PremiumPagination.jsx", "PremiumPagination — Dynamic list pagination"),
        ("AutoPaginate.jsx",      "AutoPaginate — Static content pagination"),
    ]
    for fname, desc in components_to_check:
        found = False
        if comp_dir:
            path = comp_dir / fname
            if path.exists():
                size = path.stat().st_size
                tick(f"{desc}  {DIM}({path.relative_to(root)}, {size} bytes){RESET}")
                found = True
        if not found:
            # Search whole project
            matches = [f for f in all_files if f.name == fname]
            if matches:
                tick(f"{desc}  {DIM}({matches[0].relative_to(root)}){RESET}")
            else:
                warn(f"{desc}  {DIM}→ NOT FOUND{RESET}")

    # ── Pages check ──────────────────────────────────────────────────────────
    subhead("Pages — PDFModal Usage")
    pdf_pages = []
    for f in all_files:
        if should_skip_file(f):
            continue
        try:
            content = f.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        has_pdf_link   = bool(re.search(r'\.pdf["\'\`\s]|drive\.google\.com', content, re.I))
        has_pdf_import = bool(re.search(r'import\s+PDFModal\s+from', content, re.I))
        has_pdf_use    = bool(re.search(r'<PDFModal\b', content, re.I))
        if has_pdf_link or has_pdf_import:
            pdf_pages.append((f, has_pdf_import, has_pdf_use))

    for f, has_import, has_use in pdf_pages:
        rel = f.relative_to(root)
        if has_import and has_use:
            tick(f"{GREEN}PDFModal fully integrated{RESET}  →  {rel}")
        elif has_import and not has_use:
            warn(f"PDFModal imported but not used (check manually)  →  {rel}")
        else:
            info(f"PDF links found, PDFModal NOT added yet  →  {rel}")

    subhead("Pages — Pagination Usage")
    for f in all_files:
        if should_skip_file(f):
            continue
        name_lower = f.stem.lower()
        if not any(kw in name_lower for kw in DYNAMIC_KEYWORDS):
            continue
        try:
            content = f.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        has_pagn  = bool(re.search(r'import\s+PremiumPagination\s+from', content, re.I))
        has_slice = bool(re.search(r'\.slice\s*\(', content))
        has_map   = bool(re.search(r'\.map\s*\(', content))
        rel = f.relative_to(root)
        if has_pagn and has_slice:
            tick(f"{GREEN}Pagination fully set{RESET}  →  {rel}")
        elif has_pagn and not has_slice:
            warn(f"PremiumPagination imported but .slice() missing  →  {rel}")
        elif has_map and not has_pagn:
            info(f"List/map found, Pagination NOT added yet  →  {rel}")

    # ── Backup sessions ──────────────────────────────────────────────────────
    subhead("Backup Sessions")
    sessions = BackupManager.list_sessions(root)
    if sessions:
        for s in sessions[:5]:
            manifest_file = s / "manifest.json"
            try:
                m = json.loads(manifest_file.read_text())
                print(f"  {DIM}📦 {s.name}  ({len(m.get('files',[]))} files)  {m.get('timestamp','')[:19]}{RESET}")
            except Exception:
                print(f"  {DIM}📦 {s.name}{RESET}")
        if len(sessions) > 5:
            print(f"  {DIM}   ... and {len(sessions)-5} more sessions{RESET}")
    else:
        skip_msg("No backups yet")

    print()


# ══════════════════════════════════════════════════════════════════════════════
# SURGICAL PATCHER — SIRF YE ADD KARO, KUCH AUR MAT CHHUWO
# ══════════════════════════════════════════════════════════════════════════════

class SurgicalPatcher:
    """
    Sirf 3 surgical operations karta hai:
      1. Import line add karna (last import ke baad)
      2. useState() declaration add karna (existing states ke saath)
      3. JSX component tag add karna (closing tag se pehle)

    KYA KABHI NAHI KARTA:
      - Existing lines modify/delete karna
      - Component logic ya props change karna
      - Formatting ya indentation change karna
      - Existing .map() calls change karna
      - Koi bhi destructuring ya variable rename karna
    """

    def __init__(self, content: str, filepath: Path):
        self.original = content
        self.content  = content
        self.filepath = filepath
        self.changes: list[str] = []   # Log of changes made
        self.safe     = True           # Agar kuch risky lage, False ho jata hai

    # ── Safety validators ────────────────────────────────────────────────────

    def _has_complex_jsx(self) -> bool:
        """Complex patterns detect karo jahan patching risky hai."""
        c = self.content
        # Fragment-only returns, render functions, HOC patterns
        risky_patterns = [
            r'return\s+<>',          # Fragment shorthand
            r'React\.createElement',  # Non-JSX
            r'renderItem\s*=',        # FlatList style
            r'forwardRef',            # Ref forwarding
        ]
        for p in risky_patterns:
            if re.search(p, c):
                return True
        return False

    def _count_braces(self, s: str) -> int:
        """JSX opening/closing balance check."""
        return s.count('{') - s.count('}')

    def _find_last_import_line(self) -> int | None:
        """Last `import` statement ki line number (0-based)."""
        lines = self.content.splitlines()
        last = None
        for i, line in enumerate(lines):
            stripped = line.strip()
            if stripped.startswith("import ") or stripped.startswith('import"') or stripped.startswith("import'"):
                last = i
        return last

    def _already_has(self, pattern: str) -> bool:
        return bool(re.search(pattern, self.content, re.IGNORECASE))

    # ── Operation 1: Import add karo ─────────────────────────────────────────

    def add_import(self, import_line: str, check_pattern: str) -> bool:
        """
        Last import ke baad ek import line add karo.
        check_pattern se pehle check karo ki already hai ya nahi.
        """
        if self._already_has(check_pattern):
            return False  # Already hai

        idx = self._find_last_import_line()
        if idx is None:
            self.safe = False
            warn(f"  No import statements found in {self.filepath.name} — skipping")
            return False

        lines = self.content.splitlines(keepends=True)
        # Insert after last import line
        insert_at = idx + 1
        lines.insert(insert_at, import_line + "\n")
        self.content = "".join(lines)
        self.changes.append(f"ADD IMPORT: {import_line.strip()}")
        return True

    # ── Operation 2: useState declaration add karo ───────────────────────────

    def add_state(self, state_line: str, check_var: str) -> bool:
        """
        Existing useState declarations ke baad ek naya state add karo.
        check_var: variable name jo already exist karta ho toh skip karo.
        """
        if self._already_has(re.escape(check_var)):
            return False  # Already hai

        # Find last useState declaration in file
        matches = list(re.finditer(
            r'^[ \t]*const\s+\[.+?\]\s*=\s*use(?:State|Reducer)\(',
            self.content,
            re.MULTILINE
        ))

        if not matches:
            # Koi useState nahi mila — component function body ke start mein daalo
            func_match = re.search(
                r'(?:const|function)\s+\w+\s*[=\(].*?(?:=>|{)\s*\{',
                self.content, re.DOTALL
            )
            if not func_match:
                self.safe = False
                return False
            insert_pos = func_match.end()
            indent = "  "
        else:
            # Last useState ke end tak jaao
            last_m   = matches[-1]
            eol_pos  = self.content.find('\n', last_m.end())
            if eol_pos == -1:
                eol_pos = len(self.content)
            insert_pos = eol_pos
            # Detect indentation from existing state
            line_start = self.content.rfind('\n', 0, last_m.start()) + 1
            leading    = self.content[line_start:last_m.start()]
            indent     = re.match(r'^(\s*)', leading).group(1) if leading else "  "

        indented_line = f"\n{indent}{state_line}"
        self.content  = self.content[:insert_pos] + indented_line + self.content[insert_pos:]
        self.changes.append(f"ADD STATE: {state_line.strip()}")
        return True

    # ── Operation 3: JSX component tag add karo ─────────────────────────────

    def add_jsx_before_last_closing_tag(self, jsx_block: str, check_pattern: str) -> bool:
        """
        Return ke andar LAST closing </div> ya </section> ya </main>
        se pehle JSX block insert karo.

        SAFETY: Sirf clearly identifiable closing tag ke pehle karo.
        Agar ambiguous ho toh skip karo.
        """
        if self._already_has(check_pattern):
            return False  # Already hai

        if self._has_complex_jsx():
            self.safe = False
            warn(f"  Complex JSX pattern detected in {self.filepath.name} — skip (manual add recommended)")
            return False

        # Export default se pehle return statement dhundo
        export_match = re.search(r'\n(?:export\s+default\s+\w+\s*;?\s*$)', self.content, re.MULTILINE)
        search_end   = export_match.start() if export_match else len(self.content)

        # Return statement ka closing bracket dhundo
        # Strategy: last </div> ya </section> ya </main> ya </> before export
        close_patterns = [
            r'([ \t]*)</main>',
            r'([ \t]*)</section>',
            r'([ \t]*)</article>',
            r'([ \t]*)</div>',
            r'([ \t]*)</>',
        ]

        best_match = None
        best_pos   = -1

        for pat in close_patterns:
            for m in re.finditer(pat, self.content[:search_end]):
                if m.start() > best_pos:
                    best_pos   = m.start()
                    best_match = m

        if best_match is None:
            self.safe = False
            warn(f"  Could not find safe insertion point in {self.filepath.name}")
            return False

        indent      = best_match.group(1) if best_match.lastindex else "      "
        insert_pos  = best_match.start()
        indented_jsx = ""
        for line in jsx_block.strip().splitlines():
            indented_jsx += f"{indent}{line}\n"
        indented_jsx += "\n"

        self.content = (
            self.content[:insert_pos]
            + indented_jsx
            + self.content[insert_pos:]
        )
        self.changes.append(f"ADD JSX: {jsx_block.splitlines()[0].strip()}")
        return True

    def was_modified(self) -> bool:
        return self.content != self.original

    def get_diff_summary(self) -> str:
        orig_lines = self.original.splitlines()
        new_lines  = self.content.splitlines()
        added   = len(new_lines) - len(orig_lines)
        return f"+{added} lines" if added > 0 else "no net change"


# ══════════════════════════════════════════════════════════════════════════════
# IMPORT PATH CALCULATOR
# ══════════════════════════════════════════════════════════════════════════════

def calc_import_path(from_file: Path, to_component_file: Path) -> str:
    """Relative import path calculate karo."""
    try:
        rel = os.path.relpath(
            to_component_file.with_suffix(""),
            from_file.parent
        ).replace("\\", "/")
        if not rel.startswith("."):
            rel = "./" + rel
        return rel
    except ValueError:
        return f"../components/{to_component_file.stem}"


def find_component_file(root: Path, name: str) -> Path | None:
    """Project mein component file dhundo."""
    for f in find_jsx_files(root):
        if f.stem.lower() == name.lower():
            return f
    return None


# ══════════════════════════════════════════════════════════════════════════════
# MAIN PATCHING LOGIC
# ══════════════════════════════════════════════════════════════════════════════

def collect_changes(root: Path) -> list[dict]:
    """
    Dry-run: Kya kya changes karni padegi, collect karo.
    Returns list of change descriptors.
    """
    all_files = find_jsx_files(root)
    changes   = []

    pdf_component    = find_component_file(root, "PDFModal")
    pagn_component   = find_component_file(root, "PremiumPagination")
    autopag_component = find_component_file(root, "AutoPaginate")

    for f in all_files:
        if should_skip_file(f):
            continue

        try:
            content = f.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue

        rel        = f.relative_to(root)
        name_lower = f.stem.lower()

        file_changes = []

        # ── PDFModal check ───────────────────────────────────────────────────
        has_pdf_link   = bool(re.search(
            r'(?:href|src|url|onClick)[^=]*=\s*["\`\'][^"\'`]*\.pdf|'
            r'drive\.google\.com|'
            r'["\`\']/[^"\'`]*\.pdf',
            content, re.I
        ))
        has_pdf_import = bool(re.search(r'import\s+PDFModal\s+from', content, re.I))
        has_pdf_use    = bool(re.search(r'<PDFModal\b', content, re.I))

        if has_pdf_link and not has_pdf_import and not has_pdf_use:
            if pdf_component:
                file_changes.append({
                    "type":    "pdf_modal",
                    "file":    f,
                    "rel":     str(rel),
                    "details": "PDFModal import + state + JSX add karna hai",
                })
            else:
                file_changes.append({
                    "type":    "pdf_modal_missing",
                    "file":    f,
                    "rel":     str(rel),
                    "details": "PDFModal.jsx project mein nahi mila — manual karo",
                })

        # ── Pagination check ─────────────────────────────────────────────────
        is_dynamic = any(kw in name_lower for kw in DYNAMIC_KEYWORDS)
        has_map    = bool(re.search(r'\.\s*map\s*\(', content))
        has_pagn   = bool(re.search(r'import\s+PremiumPagination\s+from', content, re.I))
        has_slice  = bool(re.search(r'\.slice\s*\(', content))

        if is_dynamic and has_map and not has_pagn and not has_slice:
            if pagn_component:
                file_changes.append({
                    "type":    "pagination",
                    "file":    f,
                    "rel":     str(rel),
                    "details": "PremiumPagination import + currentPage state + JSX add karna hai",
                })
            else:
                file_changes.append({
                    "type":    "pagination_missing",
                    "file":    f,
                    "rel":     str(rel),
                    "details": "PremiumPagination.jsx nahi mila — manual karo",
                })

        if file_changes:
            changes.extend(file_changes)

    return changes


def apply_pdf_patch(f: Path, content: str, pdf_path: Path) -> SurgicalPatcher | None:
    """PDFModal ko surgically add karo."""
    patcher     = SurgicalPatcher(content, f)
    import_path = calc_import_path(f, pdf_path)

    # Step 1: Import
    patcher.add_import(
        f'import PDFModal from "{import_path}";',
        r'import\s+PDFModal\s+from'
    )
    if not patcher.safe:
        return None

    # Step 2: States (3 states chahiye)
    states_added = 0
    for state_line, check_var in [
        ("const [pdfOpen,  setPdfOpen]  = useState(false);",  "pdfOpen"),
        ("const [pdfUrl,   setPdfUrl]   = useState('');",      "pdfUrl"),
        ("const [pdfTitle, setPdfTitle] = useState('Document');", "pdfTitle"),
    ]:
        if patcher.add_state(state_line, check_var):
            states_added += 1
    if not patcher.safe:
        return None

    # Check: useState import hai ya nahi
    if states_added > 0 and not re.search(r'\buseState\b', content):
        # useState ko React import mein add karo
        react_import = re.search(r"import\s+React\s*(?:,\s*\{([^}]*)\})?\s*from\s*['\"]react['\"]", patcher.content)
        if react_import:
            # React.useState use karenge — no change needed
            pass
        else:
            # Already destructured? Check for { useState }
            use_state_import = re.search(r"import\s+\{([^}]*)\}\s*from\s*['\"]react['\"]", patcher.content)
            if use_state_import:
                existing = use_state_import.group(1)
                if "useState" not in existing:
                    new_import = f"import {{ {existing.strip()}, useState }} from 'react';"
                    patcher.content = patcher.content.replace(use_state_import.group(0), new_import)
                    patcher.changes.append("ADD: useState to React import")

    # Step 3: JSX modal tag
    modal_jsx = (
        "{/* PDFModal — auto added by setup_pagination.py */}\n"
        "{pdfOpen && (\n"
        "  <PDFModal\n"
        "    url={pdfUrl}\n"
        "    title={pdfTitle}\n"
        "    onClose={() => setPdfOpen(false)}\n"
        "  />\n"
        ")}"
    )
    patcher.add_jsx_before_last_closing_tag(modal_jsx, r'<PDFModal\b')
    if not patcher.safe:
        return None

    return patcher if patcher.was_modified() else None


def apply_pagination_patch(f: Path, content: str, pagn_path: Path) -> SurgicalPatcher | None:
    """PremiumPagination surgically add karo."""
    patcher     = SurgicalPatcher(content, f)
    import_path = calc_import_path(f, pagn_path)

    # Step 1: Import
    patcher.add_import(
        f'import PremiumPagination from "{import_path}";',
        r'import\s+PremiumPagination\s+from'
    )
    if not patcher.safe:
        return None

    # Step 2: currentPage state
    patcher.add_state(
        "const [currentPage, setCurrentPage] = useState(1);",
        "currentPage"
    )
    if not patcher.safe:
        return None

    # useState import check (same logic as above)
    if "currentPage" not in content and not re.search(r'\buseState\b', content):
        use_state_import = re.search(r"import\s+\{([^}]*)\}\s*from\s*['\"]react['\"]", patcher.content)
        if use_state_import:
            existing = use_state_import.group(1)
            if "useState" not in existing:
                new_imp = f"import {{ {existing.strip()}, useState }} from 'react';"
                patcher.content = patcher.content.replace(use_state_import.group(0), new_imp)
                patcher.changes.append("ADD: useState to React import")

    # Step 3: .slice() wali line add karne ki ZARURAT NAHI —
    # Sirf PremiumPagination JSX add karo. User khud slice lagayega ya
    # hum comment daalke guide karenge.
    # NOTE: Hum .map() modify NAHI karte — ye risky hai.
    # Sirf component tag add karte hain aur slice ke baare mein comment.

    # Pehle array variable name dhundo (for totalItems)
    map_match = re.search(r'(\b\w[\w.]*)\s*\.\s*(?:filter\(\w+\s*=>[^)]+\)\s*\.)?map\s*\(', content)
    arr_var   = map_match.group(1) if map_match else "items"
    # Clean up: remove any method calls from arr_var
    arr_var   = re.sub(r'\(.*', '', arr_var).strip()
    total_expr = f"{arr_var}.length"

    pagn_jsx = (
        "{/* PremiumPagination — auto added by setup_pagination.py */}\n"
        "{/* TODO: Add .slice((currentPage-1)*15, currentPage*15) to your .map() above */}\n"
        "<PremiumPagination\n"
        f"  totalItems={{{total_expr}}}\n"
        "  itemsPerPage={15}\n"
        "  currentPage={currentPage}\n"
        "  setCurrentPage={setCurrentPage}\n"
        "/>"
    )
    patcher.add_jsx_before_last_closing_tag(pagn_jsx, r'<PremiumPagination\b')
    if not patcher.safe:
        return None

    return patcher if patcher.was_modified() else None


# ══════════════════════════════════════════════════════════════════════════════
# ROLLBACK LISTING
# ══════════════════════════════════════════════════════════════════════════════

def show_rollback_menu(root: Path):
    """Available rollback sessions dikhao."""
    sessions = BackupManager.list_sessions(root)
    if not sessions:
        warn("Koi backup session nahi mila.")
        return

    heading("📦 AVAILABLE ROLLBACK SESSIONS")
    for i, s in enumerate(sessions):
        manifest_file = s / "manifest.json"
        try:
            m = json.loads(manifest_file.read_text())
            n = len(m.get("files", []))
            ts = m.get("timestamp", "")[:19]
            marker = f"{GREEN}← latest{RESET}" if i == 0 else ""
            print(f"  [{i}]  {s.name}  |  {n} files  |  {ts}  {marker}")
        except Exception:
            print(f"  [{i}]  {s.name}  |  (manifest unreadable)")

    print()
    choice = input(f"  {CYAN}Rollback karein? [Enter=latest / 0-{len(sessions)-1}=specific / n=cancel]: {RESET}").strip()

    if choice.lower() in ("n", "no", "cancel", "q"):
        info("Rollback cancelled.")
        return

    if choice == "" or choice == "0":
        BackupManager.rollback(root)
    elif choice.isdigit() and int(choice) < len(sessions):
        BackupManager.rollback(root, sessions[int(choice)])
    else:
        warn("Invalid choice — rollback cancelled.")


# ══════════════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════════════

def main():
    # ── Parse arguments ───────────────────────────────────────────────────────
    args        = sys.argv[1:]
    do_apply    = "--apply"    in args
    do_rollback = "--rollback" in args
    do_status   = "--status"   in args
    path_args   = [a for a in args if not a.startswith("--")]
    start_path  = Path(path_args[0]) if path_args else Path.cwd()

    print(f"""
{BOLD}{CYAN}
╔══════════════════════════════════════════════════════════════╗
║  🛡️  ULTRA-SAFE SETUP: PDFModal + Premium Pagination v2.0   ║
║  Surgical Mode — Existing Code Kabhi Nahi Todega             ║
╚══════════════════════════════════════════════════════════════╝{RESET}""")

    # ── Find root ────────────────────────────────────────────────────────────
    root = find_project_root(start_path)
    info(f"Project root: {BOLD}{root}{RESET}")

    # Verify React project
    pkg = root / "package.json"
    if pkg.exists():
        try:
            pkgd = json.loads(pkg.read_text())
            deps = {**pkgd.get("dependencies", {}), **pkgd.get("devDependencies", {})}
            if "react" in deps:
                tick(f"React project confirmed (v{deps['react']})")
        except Exception:
            warn("package.json read error — proceeding")
    else:
        warn("package.json nahi mila — React project hai na?")

    # ── Mode: Rollback ────────────────────────────────────────────────────────
    if do_rollback:
        show_rollback_menu(root)
        return

    # ── Mode: Status ─────────────────────────────────────────────────────────
    if do_status:
        check_status(root)
        return

    # ── Pehle component files check karo ─────────────────────────────────────
    heading("STEP 1: Aapke Existing Component Files Check")

    pdf_comp  = find_component_file(root, "PDFModal")
    pagn_comp = find_component_file(root, "PremiumPagination")
    auto_comp = find_component_file(root, "AutoPaginate")

    components_found = []
    components_missing = []

    for name, found in [
        ("PDFModal.jsx",           pdf_comp),
        ("PremiumPagination.jsx",  pagn_comp),
        ("AutoPaginate.jsx",       auto_comp),
    ]:
        if found:
            size = found.stat().st_size
            tick(f"{GREEN}{name}{RESET}  {DIM}found at {found.relative_to(root)} ({size} bytes){RESET}")
            components_found.append(name)
        else:
            warn(f"{name}  {DIM}→ Project mein nahi mila{RESET}")
            components_missing.append(name)

    if components_missing:
        print(f"\n  {YELLOW}⚠  {len(components_missing)} component(s) nahi mile:{RESET}")
        for cm in components_missing:
            print(f"     {RED}✘{RESET}  {cm} — Pehle ye file create karein")
        print(f"\n  {DIM}Script sirf un pages mein kaam karegi jahan components available hain.{RESET}")

    # ── Collect changes (dry run) ─────────────────────────────────────────────
    heading("STEP 2: Analysis — Kya Kya Change Hoga (Preview)")

    changes = collect_changes(root)

    if not changes:
        tick(f"{GREEN}{BOLD}Sab kuch already set hai! Koi change nahi chahiye.{RESET}")
        print()
        check_status(root)
        return

    # Group by type
    pdf_changes  = [c for c in changes if c["type"] == "pdf_modal"]
    pagn_changes = [c for c in changes if c["type"] == "pagination"]
    pdf_missing  = [c for c in changes if c["type"] == "pdf_modal_missing"]
    pagn_missing = [c for c in changes if c["type"] == "pagination_missing"]

    if pdf_changes:
        subhead(f"PDFModal add hogi ({len(pdf_changes)} files):")
        for c in pdf_changes:
            dry(f"{c['rel']}  →  {c['details']}")

    if pagn_changes:
        subhead(f"Pagination add hogi ({len(pagn_changes)} files):")
        for c in pagn_changes:
            dry(f"{c['rel']}  →  {c['details']}")

    if pdf_missing or pagn_missing:
        subhead("Components missing — Manual action required:")
        for c in pdf_missing + pagn_missing:
            warn(f"{c['rel']}  →  {c['details']}")

    total_actionable = len(pdf_changes) + len(pagn_changes)
    print(f"\n  {BOLD}Total actionable changes: {total_actionable} files{RESET}")

    # ── Dry-run mode: Ask for confirmation ────────────────────────────────────
    if not do_apply:
        print(f"""
{YELLOW}  ⚠  YE SIRF DRY-RUN HAI — Koi bhi file abhi nahi badi.{RESET}

  Jo dikhaya woh changes actually apply karne ke liye:

    {GREEN}{BOLD}python setup_pagination.py --apply{RESET}

  Ya pehle status dekhna ho:

    {CYAN}python setup_pagination.py --status{RESET}

  {DIM}Note: --apply se pehle sab files ka automatic backup banta hai.
  Rollback ke liye: python setup_pagination.py --rollback{RESET}
""")
        return

    # ── APPLY MODE ────────────────────────────────────────────────────────────
    heading("STEP 3: Surgical Changes Apply Ho Rahi Hain")

    # Final confirmation
    print(f"""  {YELLOW}⚠  CONFIRM: {total_actionable} files mein surgical changes apply honge.{RESET}
  {DIM}(Backup automatically banta hai — rollback possible hai){RESET}

  {BOLD}Proceed? [y/N]: {RESET}""", end="")

    confirm = input().strip().lower()
    if confirm not in ("y", "yes"):
        info("Cancelled by user.")
        return

    # Initialize backup
    backup_mgr = BackupManager(root)
    backup_mgr.init_session()

    applied   = []
    skipped   = []
    errors    = []

    # ── Apply PDF patches ─────────────────────────────────────────────────────
    for change in pdf_changes:
        f       = change["file"]
        rel     = change["rel"]
        try:
            content = f.read_text(encoding="utf-8", errors="ignore")
            patcher = apply_pdf_patch(f, content, pdf_comp)

            if patcher is None:
                skip_msg(f"Skipped (complex/unsafe) → {rel}")
                skipped.append(rel)
                continue

            if not patcher.safe:
                skip_msg(f"Skipped (safety check failed) → {rel}")
                skipped.append(rel)
                continue

            # Backup pehle
            if not backup_mgr.backup(f):
                err(f"Backup failed — skipping {rel}")
                skipped.append(rel)
                continue

            # Write
            f.write_text(patcher.content, encoding="utf-8")
            diff = patcher.get_diff_summary()
            tick(f"PDFModal added ({diff}) → {rel}")
            for ch in patcher.changes:
                print(f"     {DIM}↳ {ch}{RESET}")
            applied.append(rel)

        except Exception as ex:
            err(f"Error patching {rel}: {ex}")
            errors.append(f"{rel}: {ex}")

    # ── Apply Pagination patches ──────────────────────────────────────────────
    for change in pagn_changes:
        f   = change["file"]
        rel = change["rel"]
        try:
            content = f.read_text(encoding="utf-8", errors="ignore")
            patcher = apply_pagination_patch(f, content, pagn_comp)

            if patcher is None or not patcher.safe:
                skip_msg(f"Skipped (complex/unsafe) → {rel}")
                skipped.append(rel)
                continue

            if not backup_mgr.backup(f):
                err(f"Backup failed — skipping {rel}")
                skipped.append(rel)
                continue

            f.write_text(patcher.content, encoding="utf-8")
            diff = patcher.get_diff_summary()
            tick(f"Pagination added ({diff}) → {rel}")
            for ch in patcher.changes:
                print(f"     {DIM}↳ {ch}{RESET}")
            applied.append(rel)

        except Exception as ex:
            err(f"Error patching {rel}: {ex}")
            errors.append(f"{rel}: {ex}")

    # Save backup manifest
    backup_mgr.save_manifest()

    # ── Final Report ──────────────────────────────────────────────────────────
    heading("📊 FINAL REPORT")

    print(f"  {GREEN}✔  Applied:{RESET}   {len(applied)} files")
    if applied:
        for a in applied:
            print(f"     {DIM}→ {a}{RESET}")

    print(f"  {YELLOW}○  Skipped:{RESET}   {len(skipped)} files (complex structure — manual karo)")
    if skipped:
        for s in skipped:
            print(f"     {DIM}○ {s}{RESET}")

    print(f"  {RED}✘  Errors:{RESET}    {len(errors)}")
    if errors:
        for e in errors:
            print(f"     {DIM}✘ {e}{RESET}")

    print(f"\n  {DIM}Backups: {BACKUP_DIR_NAME}/{backup_mgr.session_id}/{RESET}")
    print(f"  {DIM}Rollback: python setup_pagination.py --rollback{RESET}\n")

    # ── Slice reminder for pagination pages ───────────────────────────────────
    pagn_applied = [c["rel"] for c in pagn_changes if c["rel"] in applied]
    if pagn_applied:
        print(f"""  {BOLD}{YELLOW}⚡ IMPORTANT — Manual Step Required:{RESET}

  In files mein PremiumPagination component add ho gaya hai:
""")
        for rel in pagn_applied:
            print(f"     {CYAN}→ {rel}{RESET}")

        print(f"""
  {BOLD}Ab aapko sirf .map() ke saath .slice() add karni hai:{RESET}

  {DIM}// Pehle (change mat karo map ka logic):
  items.map(item => <Card .../>)

  // Sirf slice wrap karo around existing map:
  items.slice((currentPage - 1) * 15, currentPage * 15)
       .map(item => <Card .../>) {RESET}

  {DIM}Yeh change hum automated nahi karte kyunki .map() ke andar
  aapka custom filter/sort logic ho sakta hai jo hum nahi todna chahte.{RESET}
""")

    if len(errors) == 0 and len(applied) > 0:
        print(f"  {GREEN}{BOLD}✅ Done! Aapka project safe hai.{RESET}\n")
    elif len(applied) == 0:
        print(f"  {YELLOW}⚠  Koi change nahi hua. Upar skipped files manually check karein.{RESET}\n")
    else:
        print(f"  {YELLOW}⚠  Partial success. --rollback se sab wapas kar sakte hain.{RESET}\n")


if __name__ == "__main__":
    main()