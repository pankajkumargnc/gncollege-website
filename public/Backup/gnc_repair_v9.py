#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════════════════╗
║      GNC COLLEGE — SURGICAL REGEX RESCUE v10.0                          ║
║  Repairs corrupted arrow functions and broken JSX tags without backups  ║
╚══════════════════════════════════════════════════════════════════════════╝
"""
import os, re, sys
from pathlib import Path

def find_root():
    for p in [Path.cwd()] + list(Path.cwd().parents):
        if (p / "package.json").exists():
            return p
    return Path.cwd()

def fix_mangled_code(content):
    # 1. Fix broken arrow functions: e = name="something"> OR () = name="something">
    # Converts them back to: e =>  or  () =>
    content = re.sub(r'(\b[a-zA-Z0-9_]+\b|\([a-zA-Z0-9_,\s]*\))\s*=\s*name="[^"]*">', r'\1 =>', content)
    
    # 2. Fix corrupted self-closing tags: / name="xxx">
    # Converts back to: />
    content = re.sub(r'/\s*name="[^"]*">', r'/>', content)
    
    # 3. Fix duplicate name attributes: name="file" name="file"
    content = re.sub(r'(name="[^"]*")\s+name="[^"]*"', r'\1', content)

    # 4. Fallback for any other weird "=>" replacements
    content = re.sub(r'=>\s*name="[^"]*">', r'=>', content)
    
    return content

def main():
    root = find_root()
    print(f"\n🚀 \033[96m\033[1mGNC RESCUE SCANNER v10.0 (Surgical Regex Fixer)\033[0m")
    print(f"   Root Directory: {root}\n")
    
    target_files = list((root / "src").rglob("*.jsx")) + list((root / "src").rglob("*.js"))
    fixed_count = 0
    
    for fp in target_files:
        if not fp.exists(): continue
        try:
            original = fp.read_text(encoding="utf-8")
            fixed = fix_mangled_code(original)
            
            if fixed != original:
                fp.write_text(fixed, encoding="utf-8")
                print(f"  ✅ Fixed corruption in: {fp.name}")
                fixed_count += 1
        except Exception as e:
            print(f"  ❌ Error reading {fp.name}: {e}")
            
    if fixed_count == 0:
        print("\n  👍 No corrupted files found! Your code is clean.")
    else:
        print(f"\n  🎉 MAGIC SUCCESS! {fixed_count} files have been surgically repaired.")
        print("  ▶ Now run: npm run dev")

if __name__ == "__main__":
    main()