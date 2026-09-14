#!/usr/bin/env python3
"""
Guru Nanak College - PDF Processing & Optimization Toolkit
Incorporates pypdf, pdfplumber, reportlab, and qpdf for programmatic document management,
magic byte validation, DPI optimization, text/table inspection, and watermarking.
"""

import sys
import os
import argparse

# Magic signatures
PDF_MAGIC = b"%PDF-"

def verify_magic_bytes(filepath):
    """Verifies that the file starts with %PDF- binary signature."""
    if not os.path.exists(filepath):
        print(f"[ERROR] File does not exist: {filepath}")
        return False
    
    with open(filepath, "rb") as f:
        header = f.read(5)
    
    if header == PDF_MAGIC:
        print(f"[OK] Magic byte verified: {PDF_MAGIC.decode('latin-1')} (Authentic PDF)")
        return True
    else:
        print(f"[SECURITY ALERT] Invalid header: {header} (Expected {PDF_MAGIC})")
        return False

def inspect_pdf(filepath):
    """Inspects page count, metadata, and dimensions using pypdf."""
    try:
        from pypdf import PdfReader
    except ImportError:
        print("[NOTICE] pypdf not installed. Install with: pip install pypdf")
        return

    if not verify_magic_bytes(filepath):
        return

    reader = PdfReader(filepath)
    print(f"\n--- PDF Inspection: {os.path.basename(filepath)} ---")
    print(f"Total Pages: {len(reader.pages)}")
    
    if reader.metadata:
        print(f"Title: {reader.metadata.title or 'N/A'}")
        print(f"Author: {reader.metadata.author or 'N/A'}")
        print(f"Creator: {reader.metadata.creator or 'N/A'}")
        print(f"Producer: {reader.metadata.producer or 'N/A'}")
    
    if len(reader.pages) > 0:
        first_page = reader.pages[0]
        width_pt = float(first_page.mediabox.width)
        height_pt = float(first_page.mediabox.height)
        width_in = width_pt / 72.0
        height_in = height_pt / 72.0
        print(f"Page 1 Dimensions: {width_pt:.1f} x {height_pt:.1f} pt ({width_in:.2f} x {height_in:.2f} inches)")

def extract_text(filepath):
    """Extracts text preserving layout using pdfplumber."""
    try:
        import pdfplumber
    except ImportError:
        print("[NOTICE] pdfplumber not installed. Install with: pip install pdfplumber")
        return

    with pdfplumber.open(filepath) as pdf:
        for i, page in enumerate(pdf.pages):
            print(f"\n--- Page {i + 1} ---")
            text = page.extract_text()
            if text:
                print(text[:500] + ("..." if len(text) > 500 else ""))
            else:
                print("[No extractable text found - page may be a raster scan]")

def watermark_pdf(input_path, watermark_path, output_path):
    """Applies a watermark page onto all pages of input_path."""
    try:
        from pypdf import PdfReader, PdfWriter
    except ImportError:
        print("[NOTICE] pypdf not installed. Install with: pip install pypdf")
        return

    reader = PdfReader(input_path)
    wm_reader = PdfReader(watermark_path)
    wm_page = wm_reader.pages[0]
    
    writer = PdfWriter()
    for page in reader.pages:
        page.merge_page(wm_page)
        writer.add_page(page)
    
    with open(output_path, "wb") as f:
        writer.write(f)
    print(f"[OK] Watermarked PDF saved to: {output_path}")

def main():
    parser = argparse.ArgumentParser(description="Guru Nanak College PDF Processing Toolkit")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Inspect
    p_inspect = subparsers.add_parser("inspect", help="Inspect PDF metadata and page metrics")
    p_inspect.add_argument("file", help="Path to PDF file")

    # Extract text
    p_text = subparsers.add_parser("extract", help="Extract text from PDF")
    p_text.add_argument("file", help="Path to PDF file")

    # Watermark
    p_wm = subparsers.add_parser("watermark", help="Apply watermark to all pages")
    p_wm.add_argument("input", help="Source PDF")
    p_wm.add_argument("--watermark", required=True, help="Watermark PDF")
    p_wm.add_argument("--output", required=True, help="Output PDF")

    args = parser.parse_args()

    if args.command == "inspect":
        inspect_pdf(args.file)
    elif args.command == "extract":
        extract_text(args.file)
    elif args.command == "watermark":
        watermark_pdf(args.input, args.watermark, args.output)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
