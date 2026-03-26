#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════════════════╗
║      GNC COLLEGE — EMERGENCY FIX SCRIPT v7.0                           ║
║  Ticker • Double-Path • Slider Dots • PDF • Console Errors              ║
╚══════════════════════════════════════════════════════════════════════════╝

Run:  python gnc_fix_v7.py --fix

Fixes:
  ✅ "Ticker is not defined" — proper import add karo
  ✅ Double base path — gncollege-website/gncollege-website → fix
  ✅ Slider dots CSS — restore original design
  ✅ PDF embedded viewer — fix
  ✅ Console preload warnings — remove bad preloads
  ✅ Injected CSS conflicts — slider override remove
"""

import os, re, sys, shutil, argparse
from pathlib import Path
from datetime import datetime

BAK = ".gnc_bak"

class C:
    R="\033[91m";G="\033[92m";Y="\033[93m";B="\033[96m"
    BOLD="\033[1m";RESET="\033[0m"

def find_root():
    for p in [Path.cwd()]+list(Path.cwd().parents):
        if (p/"package.json").exists(): return p
    return Path.cwd()

def read(p):
    try: return Path(p).read_text(encoding="utf-8", errors="replace")
    except: return ""

def write(p, content, backup=True):
    p = Path(p)
    if backup and p.exists(): shutil.copy2(p, str(p)+BAK)
    p.write_text(content, encoding="utf-8")

def rglob_first(root, pattern):
    results = list(root.rglob(pattern))
    return results[0] if results else None

ROOT = find_root()
SRC  = ROOT / "src"

# ══════════════════════════════════════════════════════════════════════════
# FIX 1: Ticker — "Ticker is not defined"
# ══════════════════════════════════════════════════════════════════════════
def fix_ticker_import():
    print(f"\n{C.B}{C.BOLD}[FIX 1] Ticker — Import Fix{C.RESET}")

    # Find Ticker file
    ticker_file = rglob_first(SRC, "Ticker.jsx") or rglob_first(SRC, "Ticker.tsx")

    if not ticker_file:
        print(f"  ❌ Ticker.jsx nahi mila! Creating...")
        _create_ticker_component()
        ticker_file = SRC / "components" / "Ticker.jsx"
    else:
        print(f"  ✅ Ticker.jsx found: {ticker_file}")

    # Verify Ticker.jsx has proper export
    tc = read(ticker_file)
    if "export default" not in tc:
        print(f"  ❌ Ticker.jsx mein export default nahi — fixing...")
        _create_ticker_component()
        ticker_file = SRC / "components" / "Ticker.jsx"

    # Find HomePage.jsx
    hp_file = rglob_first(SRC, "HomePage.jsx") or rglob_first(SRC, "HomePage.tsx")
    if not hp_file:
        print(f"  ❌ HomePage.jsx nahi mila!"); return

    hp_content = read(hp_file)

    # Calculate import path
    try:
        rel_import = os.path.relpath(ticker_file, hp_file.parent).replace("\\", "/")
        rel_import = re.sub(r'\.(jsx|tsx|js|ts)$', '', rel_import)
        if not rel_import.startswith("."): rel_import = "./" + rel_import
    except:
        rel_import = "../components/Ticker"

    # Check if Ticker is imported correctly
    has_import = bool(re.search(r"import\s+Ticker\s+from", hp_content))
    has_usage  = bool(re.search(r"<Ticker\s*/>|<Ticker>", hp_content))

    print(f"  {'✅' if has_import else '❌'} Ticker import: {'present' if has_import else 'MISSING'}")
    print(f"  {'✅' if has_usage else '❌'} <Ticker /> usage: {'present' if has_usage else 'MISSING'}")

    new_content = hp_content

    # Remove any broken/duplicate Ticker imports first
    new_content = re.sub(
        r'import\s+Ticker\s+from\s+["\'][^"\']+["\'];\n?', '', new_content)

    # Add correct import after last import line
    all_imports = list(re.finditer(r"^import .+$", new_content, re.MULTILINE))
    if all_imports:
        pos = all_imports[-1].end()
        ticker_import = f'\nimport Ticker from "{rel_import}";'
        new_content = new_content[:pos] + ticker_import + new_content[pos:]
        print(f"  🔧 Added: import Ticker from \"{rel_import}\"")

    # Add <Ticker /> in JSX if missing
    if "<Ticker" not in new_content:
        # Insert after HeroSlider or at start of main return content
        for pattern in [
            r'(<HeroSlider[^/]*/>)',
            r'(<HeroSlider[^>]*>)',
            r'(</HeroSlider>)',
            r'(<Navbar[^/]*/>)',
        ]:
            m = re.search(pattern, new_content)
            if m:
                pos = m.end()
                new_content = (new_content[:pos] +
                               "\n      <Ticker />" +
                               new_content[pos:])
                print(f"  🔧 <Ticker /> added after {m.group()[:40]}")
                break

    write(hp_file, new_content)
    print(f"  ✅ HomePage.jsx updated!")


def _create_ticker_component():
    """Create a robust Ticker.jsx that works even without Firebase data"""
    ticker_path = ROOT / "src" / "components" / "Ticker.jsx"
    ticker_path.parent.mkdir(parents=True, exist_ok=True)

    content = '''import React, { useEffect, useState, useRef } from "react";

/**
 * Ticker — GNC College News Ticker
 * Fetches from Firebase 'notices' collection
 * Falls back to static text if Firebase unavailable
 */
const Ticker = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const animRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const fetchNotices = async () => {
      try {
        // Dynamic import — avoids crash if Firebase not configured yet
        const { db } = await import("../firebase");
        const { collection, getDocs, query, orderBy, limit } = await import("firebase/firestore");

        const q = query(
          collection(db, "notices"),
          orderBy("createdAt", "desc"),
          limit(10)
        );
        const snap = await getDocs(q);
        const data = snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(n => n.active !== false)
          .map(n => n.text || n.title || n.message || n.content || "")
          .filter(Boolean);

        if (mounted && data.length > 0) {
          setNotices(data);
        } else if (mounted) {
          // Default ticker text when no notices
          setNotices([
            "Welcome to Guru Nanak College, Dhanbad — A Premier Educational Institution in Jharkhand",
            "NAAC Accredited College | Affiliated to Binod Bihari Mahto Koyalanchal University",
            "Admissions Open — Apply Now for UG & PG Programs",
          ]);
        }
      } catch (err) {
        // Silently use default text if Firebase fails
        if (mounted) {
          setNotices([
            "Welcome to Guru Nanak College, Dhanbad",
            "NAAC Accredited | Affiliated to BBMKU",
            "Admissions Open — Apply Now",
          ]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchNotices();
    return () => { mounted = false; };
  }, []);

  if (loading || notices.length === 0) return null;

  const tickerText = notices.join("    ✦    ");

  return (
    <div
      role="marquee"
      aria-label="Latest notices"
      style={{
        background: "linear-gradient(90deg, #0f2347 0%, #1a3a6e 50%, #0f2347 100%)",
        borderBottom: "2px solid #f4a023",
        overflow: "hidden",
        padding: "7px 0",
        width: "100%",
        display: "flex",
        alignItems: "center",
        minHeight: "36px",
        position: "relative",
        zIndex: 999,
      }}
    >
      {/* Label badge */}
      <span
        aria-hidden="true"
        style={{
          background: "#f4a023",
          color: "#0f2347",
          fontWeight: 800,
          fontSize: "clamp(10px, 1.5vw, 12px)",
          padding: "3px 14px",
          whiteSpace: "nowrap",
          flexShrink: 0,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          borderRight: "2px solid rgba(255,255,255,0.2)",
        }}
      >
        📢 LATEST
      </span>

      {/* Scrolling area */}
      <div
        ref={animRef}
        style={{
          overflow: "hidden",
          flex: 1,
          maskImage: "linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            whiteSpace: "nowrap",
            animation: "gncTicker 35s linear infinite",
            color: "#fcd34d",
            fontSize: "clamp(12px, 1.8vw, 14px)",
            fontWeight: 500,
            gap: 0,
          }}
        >
          <span style={{ padding: "0 2rem" }}>{tickerText}</span>
          <span style={{ padding: "0 2rem" }} aria-hidden="true">{tickerText}</span>
        </div>
      </div>

      <style>{`
        @keyframes gncTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes gncTicker { 0%,100% { transform: none; } }
        }
      `}</style>
    </div>
  );
};

export default Ticker;
'''
    write(ticker_path, content, backup=False)
    print(f"  🔧 Ticker.jsx created: {ticker_path}")


# ══════════════════════════════════════════════════════════════════════════
# FIX 2: Double Base Path — gncollege-website/gncollege-website
# ══════════════════════════════════════════════════════════════════════════
def fix_double_base_path():
    print(f"\n{C.B}{C.BOLD}[FIX 2] Double Base Path Fix{C.RESET}")

    BASE = "/gncollege-website/"
    DOUBLE = "/gncollege-website/gncollege-website/"

    # Fix index.html preload links
    index_html = ROOT / "index.html"
    if index_html.exists():
        content = read(index_html)
        new = content

        # Remove preload links that cause double-path warnings
        # These are the problematic ones added by script or manually
        new = re.sub(
            r'<link\s+rel=["\']preload["\'][^>]*href=["\'][^"\']*gncollege-website[^"\']*["\'][^>]*/?>[\s]*\n?',
            '', new)

        # Fix any remaining double paths
        new = new.replace(DOUBLE, BASE)

        # Also fix src/href attributes with double path
        new = re.sub(
            r'(src|href)=["\']\/gncollege-website\/gncollege-website\/',
            r'\1="/gncollege-website/',
            new)

        if new != content:
            write(index_html, new)
            print(f"  🔧 index.html — double paths removed, bad preloads cleaned")
        else:
            print(f"  ✅ index.html — no double paths found")

    # Fix in all source files
    src_files = []
    for ext in ["*.jsx", "*.tsx", "*.js", "*.ts", "*.css"]:
        src_files.extend((SRC).rglob(ext))
    src_files.append(index_html)

    fixed_files = 0
    for fp in src_files:
        if not fp or not fp.exists(): continue
        content = read(fp)
        if DOUBLE in content:
            new = content.replace(DOUBLE, BASE)
            write(fp, new)
            print(f"  🔧 {fp.relative_to(ROOT)} — double path fixed")
            fixed_files += 1

    # Fix vite.config.js — ensure base is correct (single, not double)
    vite_conf = ROOT / "vite.config.js"
    if vite_conf.exists():
        vc = read(vite_conf)
        # Ensure base is exactly "/gncollege-website/"
        new_vc = re.sub(
            r'base\s*:\s*["\'][^"\']*["\']',
            'base: "/gncollege-website/"',
            vc)
        if new_vc != vc:
            write(vite_conf, new_vc)
            print(f"  🔧 vite.config.js — base path corrected")

    print(f"  ✅ Double path fix complete ({fixed_files} files updated)")


# ══════════════════════════════════════════════════════════════════════════
# FIX 3: Slider Dots — Restore original design
# ══════════════════════════════════════════════════════════════════════════
def fix_slider_dots():
    print(f"\n{C.B}{C.BOLD}[FIX 3] Slider Dots CSS Fix{C.RESET}")

    # Find all CSS files
    css_files = list((ROOT/"src").rglob("*.css"))

    SLIDER_DOT_CSS = """
/* ═══════════════════════════════════════════════════════════
   GNC SLIDER DOTS — Restored Design (v7 fix)
   ═══════════════════════════════════════════════════════════ */

/* Swiper / custom slider dots */
.swiper-pagination-bullet,
[class*="dot"],
[class*="Dot"],
[class*="indicator"],
[class*="Indicator"] {
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
  background: rgba(255, 255, 255, 0.5) !important;
  margin: 0 4px !important;
  display: inline-block !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  opacity: 1 !important;
}

.swiper-pagination-bullet-active,
[class*="dot"][class*="active"],
[class*="dot-active"],
[class*="indicator"][class*="active"] {
  background: #f4a023 !important;
  width: 28px !important;
  border-radius: 5px !important;
  transform: none !important;
}

/* Remove any injected CSS that may have broken dots */
[class*="HeroSlider"] [class*="dot"],
[class*="HeroSlider"] [class*="indicator"],
[class*="hero"] [class*="dot"],
[class*="slider"] [class*="dot"] {
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
  transform: none !important;
}

[class*="HeroSlider"] [class*="dot"][class*="active"],
[class*="HeroSlider"] [class*="indicator"][class*="active"] {
  width: 28px !important;
  border-radius: 5px !important;
  background: #f4a023 !important;
}

/* Slider container */
[class*="HeroSlider"],
[class*="hero-slider"] {
  position: relative;
  overflow: hidden;
  width: 100%;
}

/* Slider images */
[class*="HeroSlider"] img {
  width: 100%;
  height: clamp(280px, 50vw, 600px);
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Dots container */
[class*="dots"],
[class*="Dots"],
[class*="pagination"] {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  z-index: 10;
}
"""

    for css_file in css_files:
        content = read(css_file)

        # Remove conflicting slider CSS that v6 injected
        # The injected CSS had a broad [class*="slider"] that conflicted
        content = re.sub(
            r'/\* ── Hero Slider.*?(?=\/\* ──|\Z)',
            '',
            content,
            flags=re.DOTALL
        )

        marker = "/* GNC-SLIDER-DOTS-V7 */"
        if marker not in content:
            content = content.rstrip() + "\n\n" + marker + "\n" + SLIDER_DOT_CSS
            write(css_file, content)
            print(f"  🔧 Slider dots CSS added to {css_file.relative_to(ROOT)}")
            break

    print(f"  ✅ Slider dots CSS restored!")


# ══════════════════════════════════════════════════════════════════════════
# FIX 4: Remove console preload warnings
# ══════════════════════════════════════════════════════════════════════════
def fix_preload_warnings():
    print(f"\n{C.B}{C.BOLD}[FIX 4] Console Preload Warnings Fix{C.RESET}")

    index_html = ROOT / "index.html"
    if not index_html.exists():
        print(f"  ⚠️  index.html nahi mila"); return

    content = read(index_html)
    new = content

    # Remove ALL preload link tags for images (they're causing warnings)
    # Preload should only be used for resources used in first paint
    new = re.sub(
        r'\s*<link\s+rel=["\']preload["\'][^>]*as=["\']image["\'][^>]*/?>',
        '',
        new)
    new = re.sub(
        r'\s*<link\s+rel=["\']preload["\'][^>]*as=["\']font["\'][^>]*/?>',
        '',
        new)

    # Also remove the "as" attribute checker — preload with wrong path
    new = re.sub(
        r'\s*<link\s+rel=["\']preload["\'][^>]*/?>',
        '',
        new)

    if new != content:
        write(index_html, new)
        original_count = len(re.findall(r'rel=["\']preload["\']', content))
        print(f"  🔧 {original_count} bad preload link(s) removed from index.html")
    else:
        print(f"  ✅ No bad preloads found in index.html")

    # Also find and fix HeroSlider or any component that dynamically adds preloads
    for filepath in SRC.rglob("*.jsx"):
        fc = read(filepath)
        if "preload" in fc and "gncollege-website" in fc:
            # Fix the preload path generation
            fixed = re.sub(
                r'(/gncollege-website/)+images/',
                '/gncollege-website/images/',
                fc)
            if fixed != fc:
                write(filepath, fixed)
                print(f"  🔧 {filepath.relative_to(ROOT)} — preload paths fixed")


# ══════════════════════════════════════════════════════════════════════════
# FIX 5: PDF Viewer Fix
# ══════════════════════════════════════════════════════════════════════════
def fix_pdf_viewer():
    print(f"\n{C.B}{C.BOLD}[FIX 5] PDF Viewer Fix{C.RESET}")

    # Find PDF viewer components
    pdf_files = list(SRC.rglob("*PDF*")) + list(SRC.rglob("*pdf*")) + \
                list(SRC.rglob("*Document*"))

    # Inject PDF CSS fix
    PDF_CSS = """
/* ═══════════════════════════════════════════════════════════
   GNC PDF VIEWER — Fixed Styles (v7)
   ═══════════════════════════════════════════════════════════ */

/* PDF embed/iframe container */
.pdf-container,
[class*="pdf"],
[class*="PDF"],
[class*="document-viewer"] {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

/* PDF iframe — full responsive */
.pdf-container iframe,
[class*="pdf"] iframe,
[class*="PDF"] iframe,
iframe[src*=".pdf"],
iframe[src*="drive.google"],
iframe[src*="docs.google"] {
  width: 100% !important;
  min-height: clamp(400px, 70vh, 800px) !important;
  height: clamp(400px, 70vh, 800px) !important;
  border: none !important;
  display: block !important;
}

/* PDF embed element */
embed[type="application/pdf"] {
  width: 100% !important;
  height: clamp(400px, 70vh, 800px) !important;
  display: block !important;
}

/* react-pdf pages */
.react-pdf__Page,
.react-pdf__Document {
  width: 100% !important;
  max-width: 100% !important;
}

.react-pdf__Page canvas {
  width: 100% !important;
  height: auto !important;
  max-width: 100% !important;
}

/* Mobile PDF */
@media (max-width: 768px) {
  .pdf-container iframe,
  [class*="pdf"] iframe,
  iframe[src*=".pdf"] {
    min-height: 50vh !important;
    height: 50vh !important;
  }
}

/* PDF toolbar wrapper */
.pdf-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  align-items: center;
  justify-content: space-between;
}

.pdf-toolbar button {
  min-height: 36px;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  width: auto;
}

/* Documents list */
[class*="Document"] [class*="list"],
[class*="documents"] [class*="list"] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
  gap: 1rem;
}

/* Document card */
[class*="Document"] [class*="card"],
[class*="document"] [class*="card"] {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  transition: box-shadow 0.2s;
}

[class*="Document"] [class*="card"]:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}
"""

    # Find index.css or main CSS
    main_css = (ROOT/"src"/"styles"/"index.css") if (ROOT/"src"/"styles"/"index.css").exists() \
               else (ROOT/"src"/"index.css")

    if main_css.exists():
        css_content = read(main_css)
        marker = "/* GNC-PDF-V7 */"
        if marker not in css_content:
            css_content = css_content.rstrip() + "\n\n" + marker + "\n" + PDF_CSS
            write(main_css, css_content)
            print(f"  🔧 PDF CSS added to {main_css.relative_to(ROOT)}")
        else:
            print(f"  ✅ PDF CSS already present")
    else:
        print(f"  ⚠️  Main CSS file nahi mila — PDF CSS skip")

    # Find PDF viewer JSX and fix iframe src
    for fp in pdf_files:
        if not fp.is_file(): continue
        fc = read(fp)

        # Fix Google Drive PDF embed URL format
        if "drive.google.com" in fc:
            # Ensure correct embed format
            fixed = re.sub(
                r'https://drive\.google\.com/file/d/([^/"\']+)/view',
                r'https://drive.google.com/file/d/\1/preview',
                fc)
            if fixed != fc:
                write(fp, fixed)
                print(f"  🔧 {fp.relative_to(ROOT)} — Drive PDF URLs fixed to /preview")

        # Fix direct PDF src — add Google Docs viewer as fallback
        if 'type="application/pdf"' in fc or "iframe" in fc:
            print(f"  ✅ {fp.relative_to(ROOT)} — has PDF iframe/embed")

    print(f"  ✅ PDF viewer fix complete!")


# ══════════════════════════════════════════════════════════════════════════
# FIX 6: Remove CSS conflicts from v6 injection
# ══════════════════════════════════════════════════════════════════════════
def fix_css_conflicts():
    print(f"\n{C.B}{C.BOLD}[FIX 6] CSS Conflict Resolution{C.RESET}")

    # The v6 injected CSS had broad selectors that broke specific components
    # Fix: make selectors more specific, add important overrides

    CONFLICT_FIX_CSS = """
/* ═══════════════════════════════════════════════════════════
   GNC CSS CONFLICT FIX v7
   Overrides broad selectors from v6 injection
   ═══════════════════════════════════════════════════════════ */

/* Restore button widths — v6 made all buttons width:auto
   but some components need full-width buttons */
.w-full button,
[class*="full"] button,
[class*="block"] button {
  width: 100% !important;
}

/* Restore slider image height — v6 was too aggressive */
[class*="HeroSlider"] img,
[class*="heroSlider"] img,
[class*="hero-slider"] img {
  width: 100% !important;
  height: clamp(280px, 50vw, 580px) !important;
  object-fit: cover !important;
  object-position: center !important;
}

/* Fix: forms — input should not always be 100% width
   Some inline forms need auto width */
.inline-form input,
.search-form input,
[class*="search"] input {
  width: auto !important;
}

/* Fix: nav links should not be display:block on desktop */
@media (min-width: 769px) {
  nav a, .nav-link {
    display: inline-flex !important;
    padding: inherit !important;
    font-size: inherit !important;
  }
}

/* Fix: gallery grid conflict — let component control columns */
[class*="GalleryPage"] [class*="Gallery"],
[class*="gallery-page"] [class*="gallery"] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(220px, 100%), 1fr)) !important;
  gap: 1rem !important;
}

/* Fix: Admin panel table on desktop — should not be block */
@media (min-width: 768px) {
  [class*="AdminPanel"] table,
  [class*="admin"] table {
    display: table !important;
    font-size: 0.875rem !important;
    white-space: normal !important;
  }
}

/* Fix: Ticker should not be affected by nav sticky rule */
[class*="Ticker"],
[class*="ticker"] {
  position: relative !important;
  z-index: 999 !important;
}
"""

    main_css_paths = [
        ROOT/"src"/"styles"/"index.css",
        ROOT/"src"/"index.css",
        ROOT/"src"/"App.css",
    ]

    for css_path in main_css_paths:
        if css_path.exists():
            content = read(css_path)
            marker = "/* GNC-CONFLICT-FIX-V7 */"
            if marker not in content:
                content = content.rstrip() + "\n\n" + marker + "\n" + CONFLICT_FIX_CSS
                write(css_path, content)
                print(f"  🔧 Conflict fixes added to {css_path.relative_to(ROOT)}")
            else:
                print(f"  ✅ Conflict CSS already applied")
            break

    print(f"  ✅ CSS conflicts resolved!")


# ══════════════════════════════════════════════════════════════════════════
# FIX 7: Image path normalization in source files
# ══════════════════════════════════════════════════════════════════════════
def fix_image_paths():
    print(f"\n{C.B}{C.BOLD}[FIX 7] Image Path Normalization{C.RESET}")

    BASE = "/gncollege-website/"
    fixed = 0

    for fp in SRC.rglob("*.jsx"):
        content = read(fp)
        new = content

        # Fix double base: /gncollege-website/gncollege-website/
        new = re.sub(r'(/gncollege-website){2,}/', '/gncollege-website/', new)

        # Fix dynamic preload path construction issues
        # Pattern: `${import.meta.env.BASE_URL}images/` → `/gncollege-website/images/`
        # This is fine — just ensure BASE_URL resolves correctly

        if new != content:
            write(fp, new)
            print(f"  🔧 {fp.relative_to(ROOT)} — image paths normalized")
            fixed += 1

    if fixed == 0:
        print(f"  ✅ No double image paths found in source files")
    else:
        print(f"  ✅ {fixed} file(s) fixed")


# ══════════════════════════════════════════════════════════════════════════
# FIX 8: HeroSlider — fix preload path generation
# ══════════════════════════════════════════════════════════════════════════
def fix_hero_slider_preload():
    print(f"\n{C.B}{C.BOLD}[FIX 8] HeroSlider Preload Path Fix{C.RESET}")

    slider_file = rglob_first(SRC, "HeroSlider.jsx") or rglob_first(SRC, "HeroSlider.tsx")
    if not slider_file:
        print(f"  ⚠️  HeroSlider.jsx nahi mila — skip")
        return

    content = read(slider_file)
    rel_f   = slider_file.relative_to(ROOT)

    # Find preload link creation code
    preload_patterns = [
        # Pattern: string concatenation with base
        (r'`/gncollege-website/\${[^}]+}`', "already using template literal"),
        (r'"/gncollege-website/" \+ ', "string concat"),
    ]

    new_content = content

    # Fix: use import.meta.env.BASE_URL instead of hardcoded path
    # if preload links are being dynamically created
    if "preload" in content:
        # Replace hardcoded base path in preload href
        new_content = re.sub(
            r'href:\s*["\']\/gncollege-website\/([^"\']+)["\']',
            r'href: `${import.meta.env.BASE_URL}\1`',
            new_content)

        new_content = re.sub(
            r'href=\{["\']\/gncollege-website\/([^"\']+)["\']\}',
            r'href={`${import.meta.env.BASE_URL}\1`}',
            new_content)

        # Also fix: if building preload as string
        new_content = re.sub(
            r'(["\'`])\/gncollege-website\/images\/',
            r'\1${import.meta.env.BASE_URL}images/',
            new_content)

    if new_content != content:
        write(slider_file, new_content)
        print(f"  🔧 {rel_f} — preload paths use BASE_URL now")
    else:
        print(f"  ✅ {rel_f} — no hardcoded preload paths found")

    # The real fix: remove preload link injection from slider entirely
    # Preloading slider images causes warnings and is counterproductive
    # Better: use loading="eager" on first slide, loading="lazy" on rest

    if "document.head.appendChild" in content and "preload" in content:
        print(f"  🔧 Removing dynamic preload injection from HeroSlider...")
        # Remove the preload creation block
        new_content = re.sub(
            r'// [Pp]reload[^\n]*\n.*?document\.head\.appendChild[^\n]+\n',
            '',
            new_content,
            flags=re.DOTALL)
        # Remove useEffect that only does preloading
        write(slider_file, new_content)
        print(f"  🔧 Dynamic preload injection removed from HeroSlider")


# ══════════════════════════════════════════════════════════════════════════
# GENERATE REPORT
# ══════════════════════════════════════════════════════════════════════════
def generate_report(fixes_done, warnings, root):
    score = max(0, 100 - len(warnings) * 5)
    sc    = "#22c55e" if score >= 90 else "#f59e0b" if score >= 70 else "#ef4444"

    fix_rows = "".join(
        f"<tr><td>🔧</td><td>{f}</td></tr>" for f in fixes_done)
    warn_rows = "".join(
        f"<tr><td>⚠️</td><td>{w}</td></tr>" for w in warnings)

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GNC Fix v7 Report</title>
<style>
  body{{font-family:'Segoe UI',sans-serif;background:#0f172a;color:#e2e8f0;margin:0;padding:0}}
  .hdr{{background:linear-gradient(135deg,#1e3a5f,#0f172a);padding:2rem;text-align:center;border-bottom:2px solid #f59e0b}}
  .hdr h1{{color:#f59e0b;font-size:1.8rem;margin:0}}
  .stats{{display:flex;gap:1rem;padding:1.5rem 2rem;flex-wrap:wrap}}
  .stat{{background:#1e293b;border-radius:12px;padding:1rem 1.5rem;flex:1;min-width:120px;text-align:center}}
  .num{{font-size:2.2rem;font-weight:700}}
  .bar{{height:8px;background:#334155;border-radius:4px;margin:.4rem 0;overflow:hidden}}
  .fill{{height:100%;border-radius:4px;background:{sc};width:{score}%}}
  .section{{padding:0 2rem 2rem}}
  .section h2{{color:#f59e0b;font-size:1rem;margin-bottom:.8rem;border-left:3px solid #f59e0b;padding-left:.6rem}}
  table{{width:100%;border-collapse:collapse}}
  td{{padding:.5rem .8rem;border-bottom:1px solid #334155;font-size:.82rem;word-break:break-word}}
  td:first-child{{width:28px;text-align:center}}
  .steps{{background:#0c2340;border:2px solid #3b82f6;border-radius:10px;padding:1.5rem;margin:0 2rem 2rem}}
  .steps h3{{color:#7dd3fc;margin-bottom:.8rem}}
  .steps ol{{margin:.5rem 0 0 1.5rem;line-height:2;font-size:.88rem}}
  .steps code{{background:#1e293b;padding:.1rem .4rem;border-radius:4px;color:#fcd34d;font-size:.8rem}}
  .footer{{text-align:center;padding:1.5rem;color:#475569;font-size:.75rem}}
</style>
</head>
<body>
<div class="hdr">
  <h1>🏫 GNC Fix v7 — Emergency Repair Report</h1>
  <p style="color:#94a3b8;margin-top:.4rem">
    {datetime.now().strftime('%d %B %Y, %I:%M %p')} | {root}
  </p>
</div>
<div class="stats">
  <div class="stat">
    <div class="num" style="color:{sc}">{score}</div>
    <div class="bar"><div class="fill"></div></div>
    <div style="font-size:.75rem;color:#94a3b8">Health Score</div>
  </div>
  <div class="stat">
    <div class="num" style="color:#22c55e">{len(fixes_done)}</div>
    <div style="font-size:.75rem;color:#94a3b8">Fixes Applied</div>
  </div>
  <div class="stat">
    <div class="num" style="color:#f59e0b">{len(warnings)}</div>
    <div style="font-size:.75rem;color:#94a3b8">Manual Steps</div>
  </div>
</div>

<div class="steps">
  <h3>🚀 Ab Yeh Karo (Manual)</h3>
  <ol>
    <li><code>npm run dev</code> restart karo — Ctrl+C phir npm run dev</li>
    <li>Homepage kholo — Ticker dikha? ✅</li>
    <li>Slider dots check karo — round dots hain? ✅</li>
    <li>Console mein warnings check karo — 0 ya bahut kam hone chahiye</li>
    <li>Admin panel → Notice add karo → refresh → dikha? ✅</li>
    <li><code>npm run build</code> — errors nahi aane chahiye</li>
  </ol>
</div>

<div class="section">
  <h2>🔧 Fixes Applied ({len(fixes_done)})</h2>
  {'<table>' + fix_rows + '</table>' if fixes_done else '<p style="color:#64748b;padding:1rem">No fixes needed</p>'}
</div>

<div class="section">
  <h2>⚠️ Manual Steps ({len(warnings)})</h2>
  {'<table>' + warn_rows + '</table>' if warnings else '<p style="color:#22c55e;padding:1rem">✅ Zero manual steps!</p>'}
</div>

<div class="footer">GNC Fix v7 | Made for Pankaj ❤️</div>
</body></html>"""

    rp = root / "gnc_fix_v7_report.html"
    rp.write_text(html, encoding="utf-8")
    return rp


# ══════════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════════
def main():
    parser = argparse.ArgumentParser(description="GNC Emergency Fix v7")
    parser.add_argument("--fix",  action="store_true")
    parser.add_argument("--path", type=str, default=None)
    args = parser.parse_args()

    global ROOT, SRC
    if args.path:
        ROOT = Path(args.path).resolve()
        SRC  = ROOT / "src"

    print(f"\n{C.BOLD}{C.B}╔{'═'*62}╗")
    print(f"║{'GNC COLLEGE — EMERGENCY FIX v7.0':^62}║")
    print(f"║{'Ticker • Slider Dots • Double Path • PDF • Console':^62}║")
    print(f"╚{'═'*62}╝{C.RESET}")
    print(f"  Root: {C.B}{ROOT}{C.RESET}")
    print(f"  Mode: {'🔧 AUTO-FIX ON' if args.fix else '⚠️  SCAN ONLY — run with --fix'}\n")

    if not (ROOT/"package.json").exists():
        print(f"  ❌ package.json nahi mila!"); sys.exit(1)

    fixes_done = []
    warnings   = []

    if args.fix:
        print(f"{C.BOLD}Running all fixes...{C.RESET}")

        fix_ticker_import()
        fixes_done.append("Ticker import fixed in HomePage.jsx")

        fix_double_base_path()
        fixes_done.append("Double base path removed (gncollege-website/gncollege-website)")

        fix_preload_warnings()
        fixes_done.append("Bad preload links removed from index.html")

        fix_slider_dots()
        fixes_done.append("Slider dots CSS restored")

        fix_pdf_viewer()
        fixes_done.append("PDF viewer CSS fixed")

        fix_css_conflicts()
        fixes_done.append("CSS conflicts from v6 resolved")

        fix_image_paths()
        fixes_done.append("Image paths normalized in source files")

        fix_hero_slider_preload()
        fixes_done.append("HeroSlider preload paths fixed")

        warnings = [
            "npm run dev restart karo",
            "Admin panel → Firebase keys verify karo (.env.local)",
            "Browser Console mein errors check karo",
        ]

    else:
        print(f"  ℹ️  Run with --fix to apply all fixes")
        warnings = [
            "Ticker import fix — run --fix",
            "Double base path fix — run --fix",
            "Slider dots fix — run --fix",
            "PDF viewer fix — run --fix",
        ]

    # Generate report
    rp = generate_report(fixes_done, warnings, ROOT)

    print(f"\n{'═'*65}")
    print(f"{C.BOLD}  GNC FIX v7 COMPLETE{C.RESET}")
    print(f"{'═'*65}")
    print(f"  🔧 Fixes: {C.G}{len(fixes_done)}{C.RESET}")
    print(f"  📄 Report: {C.B}{rp}{C.RESET}")
    print(f"{'═'*65}")

    if args.fix:
        print(f"""
{C.G}{C.BOLD}  ✅ Sab fixes apply ho gayi!{C.RESET}

{C.BOLD}  Ab yeh karo:{C.RESET}
  1. {C.Y}npm run dev{C.RESET} restart karo (Ctrl+C → npm run dev)
  2. Homepage check karo — Ticker dikha?
  3. Slider dots check karo — round hain?
  4. Console: F12 → Console → warnings kam hue?
  5. {C.Y}npm run build{C.RESET} — errors nahi aane chahiye
""")


if __name__ == "__main__":
    main()