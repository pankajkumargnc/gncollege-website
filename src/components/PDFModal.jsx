// src/components/PDFModal.jsx
// ═══════════════════════════════════════════════════════════════
// GNC PDFModal — Ultra Pro Max Native Engine v4
//
// Strategy per URL type:
//   Google Drive     → iframe (Drive ka native preview)
//   Firebase Storage → react-pdf direct (CORS ok)
//   ImgBB / github.io/ direct .pdf → react-pdf direct
//   Any other external URL → Google Docs Viewer iframe
//   Local /public path → react-pdf direct
//
// ❌ NO PROXY — allorigins/cors-anywhere binary data corrupt karte hain
// ✅ Google Docs Viewer — baaki sab external PDFs ke liye best free solution
// ✅ Zoom in/out, page jump input, keyboard navigation
// ✅ 8-sec iframe timeout fallback
// ✅ CORS error pe Google Docs Viewer + Direct Open buttons
//
// 🔧 v4 FIX: Worker ab cdnjs CDN se nahi, local node_modules se load hota hai.
//    Isse "Setting up fake worker failed" error permanently fix ho gaya.
// ═══════════════════════════════════════════════════════════════

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// ✅ CRITICAL FIX: Local worker via Vite's ?url import
// CDN (cdnjs/unpkg) pe v5.4.x exist nahi karta → "fake worker" error
// ?url → Vite build time pe worker file ka local URL resolve karta hai
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

// ─────────────────────────────────────────────────────────────
// URL type detector
// ─────────────────────────────────────────────────────────────
function detectType(url) {
  if (!url) return "unknown";
  const u = url.toLowerCase();
  if (u.includes("drive.google.com")) return "gdrive";
  if (u.includes("firebasestorage.googleapis.com")) return "firebase";
  if (u.includes("firebasestorage.app")) return "firebase";
  if (u.startsWith("/") || u.startsWith("./")) return "local";
  if (u.startsWith("blob:")) return "blob";
  if (u.includes("github.io") || u.includes("i.ibb.co") || u.endsWith(".pdf"))
    return "direct";
  return "external";
}

function driveEmbed(url) {
  const m1 = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  const m2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const id = m1?.[1] || m2?.[1];
  if (id) return `https://drive.google.com/file/d/${id}/preview`;
  return url.replace(/\/view(\?.*)?$/, "/preview");
}

function gDocsViewer(url) {
  return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
}

function resolveEngine(url) {
  const type = detectType(url);
  if (type === "gdrive")
    return { engine: "iframe", src: driveEmbed(url), type };
  if (type === "external")
    return { engine: "iframe", src: gDocsViewer(url), type };
  return { engine: "react-pdf", src: url, type };
}

const TYPE_BADGE = {
  gdrive: { label: "Google Drive", color: "#4285F4" },
  firebase: { label: "Firebase Storage", color: "#FF9800" },
  external: { label: "via Google Docs Viewer", color: "#34A853" },
  local: { label: "Local File", color: "#9C27B0" },
  direct: { label: "Direct PDF", color: "#0f2347" },
  blob: { label: "Blob URL", color: "#607D8B" },
};

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
export default function PDFModal({ url, title = "Document", onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loadState, setLoadState] = useState("loading");
  const [iframeOk, setIframeOk] = useState(false);
  const [pageWidth, setPageWidth] = useState(760);
  const bodyRef = useRef(null);

  if (!url) return null;

  const { engine, src, type } = resolveEngine(url);
  const badge = TYPE_BADGE[type] || { label: "PDF", color: "#607D8B" };

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      if (vw < 480) setPageWidth(vw - 48);
      else if (vw < 768) setPageWidth(vw - 64);
      else if (vw < 1024) setPageWidth(Math.min(680, vw - 80));
      else setPageWidth(760);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const onKey = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        setPage((p) => Math.min(p + 1, numPages || 1));
      if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        setPage((p) => Math.max(p - 1, 1));
      if ((e.ctrlKey || e.metaKey) && e.key === "=") {
        e.preventDefault();
        setScale((s) => Math.min(s + 0.2, 3));
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault();
        setScale((s) => Math.max(s - 0.2, 0.4));
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "0") {
        e.preventDefault();
        setScale(1);
      }
    },
    [onClose, numPages],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onKey]);

  useEffect(() => {
    setNumPages(null);
    setPage(1);
    setScale(1);
    setLoadState("loading");
    setIframeOk(false);
  }, [url]);

  const onDocLoad = ({ numPages }) => {
    setNumPages(numPages);
    setLoadState("success");
  };
  const onDocError = () => setLoadState("error");

  const zoomIn = () => setScale((s) => Math.min(+(s + 0.25).toFixed(2), 3.0));
  const zoomOut = () => setScale((s) => Math.max(+(s - 0.25).toFixed(2), 0.4));
  const zoomReset = () => setScale(1.0);

  const jumpPage = (v) => {
    const n = parseInt(v, 10);
    if (!isNaN(n) && n >= 1 && n <= numPages) setPage(n);
  };

  const showZoom = engine === "react-pdf" && loadState === "success";
  const showFooter =
    engine === "react-pdf" && loadState === "success" && numPages > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`PDF Viewer: ${title}`}
      style={S.overlay}
      onClick={onClose}
    >
      <div style={S.modal} onClick={(e) => e.stopPropagation()}>
        {/* ── HEADER ── */}
        <header style={S.header}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              minWidth: 0,
            }}
          >
            <span style={{ fontSize: 20, flexShrink: 0 }}>📄</span>
            <div style={{ minWidth: 0 }}>
              <div style={S.titleTxt} title={title}>
                {title}
              </div>
              <span
                style={{
                  ...S.typePill,
                  background: badge.color + "28",
                  color: badge.color,
                }}
              >
                {badge.label}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 7,
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {showZoom && (
              <div style={S.zoomBar}>
                <button
                  style={S.zb}
                  onClick={zoomOut}
                  title="Zoom out (Ctrl−)"
                  aria-label="Zoom out"
                >
                  −
                </button>
                <button
                  style={{ ...S.zb, minWidth: 50, fontSize: 11 }}
                  onClick={zoomReset}
                  title="Reset (Ctrl+0)"
                >
                  {Math.round(scale * 100)}%
                </button>
                <button
                  style={S.zb}
                  onClick={zoomIn}
                  title="Zoom in (Ctrl+)"
                  aria-label="Zoom in"
                >
                  +
                </button>
              </div>
            )}
            <a href={url} target="_blank" rel="noreferrer" style={S.openBtn}>
              ↗ Open
            </a>
            <button
              style={S.closeBtn}
              onClick={onClose}
              aria-label="Close PDF viewer"
            >
              ✕
            </button>
          </div>
        </header>

        {/* ── BODY ── */}
        <div ref={bodyRef} style={S.body}>
          {loadState === "loading" && (
            <div style={S.centerBox}>
              <div style={S.spinner} />
              <p
                style={{
                  color: "#0f2347",
                  fontWeight: 700,
                  fontSize: 14,
                  marginTop: 14,
                }}
              >
                {engine === "iframe"
                  ? "Viewer load ho raha hai..."
                  : "PDF parse ho raha hai..."}
              </p>
              <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 2 }}>
                {type === "gdrive"
                  ? "Google Drive se fetch ho raha hai"
                  : type === "external"
                    ? "Google Docs Viewer ke through"
                    : "Direct connection..."}
              </p>
            </div>
          )}

          {loadState === "error" && engine === "react-pdf" && (
            <div
              style={{
                ...S.centerBox,
                gap: 10,
                zIndex: 2,
                background: "#f8fafc",
              }}
            >
              <div style={{ fontSize: 48 }}>⚠️</div>
              <h3
                style={{
                  color: "#0f2347",
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                PDF load nahi ho saka
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: 13,
                  textAlign: "center",
                  maxWidth: 340,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                CORS restriction ya network issue ho sakta hai.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginTop: 8,
                }}
              >
                <a
                  href={gDocsViewer(url)}
                  target="_blank"
                  rel="noreferrer"
                  style={{ ...S.actionBtn, background: "#4285F4" }}
                >
                  🔍 Google Docs Viewer
                </a>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ ...S.actionBtn, background: "#0f2347" }}
                >
                  ↗ Direct Open
                </a>
              </div>
            </div>
          )}

          {engine === "react-pdf" && loadState !== "error" && (
            <div style={S.pdfScroll}>
              <Document
                file={src}
                onLoadSuccess={onDocLoad}
                onLoadError={onDocError}
                loading={null}
                options={{
                  cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/cmaps/`,
                  cMapPacked: true,
                  standardFontDataUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/standard_fonts/`,
                }}
              >
                {loadState === "success" && (
                  <Page
                    pageNumber={page}
                    width={pageWidth * scale}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    loading={null}
                  />
                )}
              </Document>
            </div>
          )}

          {engine === "iframe" && (
            <>
              <iframe
                src={src}
                title={title}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  display: iframeOk ? "block" : "none",
                  position: "absolute",
                  inset: 0,
                }}
                onLoad={() => {
                  setIframeOk(true);
                  setLoadState("success");
                }}
                onError={() => setLoadState("error")}
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
              {!iframeOk && <IframeTimeout url={url} onClose={onClose} />}
            </>
          )}
        </div>

        {/* ── FOOTER ── */}
        {showFooter && (
          <footer style={S.footer}>
            <span
              style={{
                fontSize: 12,
                color: "#64748b",
                fontWeight: 600,
                minWidth: 72,
              }}
            >
              {numPages} page{numPages > 1 ? "s" : ""}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                style={{ ...S.pgBtn, opacity: page <= 1 ? 0.4 : 1 }}
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                aria-label="Previous page"
              >
                ◀ Prev
              </button>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#0f2347",
                  minWidth: 90,
                  textAlign: "center",
                }}
              >
                Page {page} / {numPages}
              </span>
              <button
                style={{ ...S.pgBtn, opacity: page >= numPages ? 0.4 : 1 }}
                disabled={page >= numPages}
                onClick={() => setPage((p) => p + 1)}
                aria-label="Next page"
              >
                Next ▶
              </button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                minWidth: 88,
                justifyContent: "flex-end",
              }}
            >
              <span style={{ fontSize: 11, color: "#94a3b8" }}>Go:</span>
              <input
                type="number"
                min={1}
                max={numPages}
                defaultValue={page}
                key={page}
                onBlur={(e) => jumpPage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && jumpPage(e.target.value)}
                aria-label="Go to page"
                style={{
                  width: 46,
                  padding: "4px 6px",
                  borderRadius: 6,
                  border: "1.5px solid #0f234744",
                  fontSize: 13,
                  fontWeight: 700,
                  textAlign: "center",
                  color: "#0f2347",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>
          </footer>
        )}
      </div>

      <style>{`
        @keyframes pdfSpin { to { transform: rotate(360deg); } }
        .react-pdf__Page__canvas { margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.15); border-radius: 4px; }
        .react-pdf__Page { margin-bottom: 0; }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Iframe 8-sec timeout fallback
// ─────────────────────────────────────────────────────────────
function IframeTimeout({ url, onClose }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        gap: 12,
        padding: 24,
        textAlign: "center",
        zIndex: 5,
      }}
    >
      <div style={{ fontSize: 48 }}>⏱️</div>
      <h3
        style={{ color: "#0f2347", margin: 0, fontSize: 16, fontWeight: 800 }}
      >
        Viewer timeout ho gaya
      </h3>
      <p
        style={{
          color: "#64748b",
          fontSize: 13,
          maxWidth: 340,
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        Google Docs Viewer ne response nahi diya. File seedha open karein.
      </p>
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 4,
        }}
      >
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#0f2347",
            color: "#f4a023",
            padding: "10px 22px",
            borderRadius: 8,
            fontWeight: 800,
            fontSize: 14,
            textDecoration: "none",
          }}
        >
          ↗ Open in New Tab
        </a>
        <button
          onClick={onClose}
          style={{
            background: "#f1f5f9",
            color: "#0f2347",
            padding: "10px 22px",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 14,
            border: "1.5px solid #e2e8f0",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────
const N = "#0f2347",
  G = "#f4a023";
const S = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 999999,
    background: "rgba(6,14,28,0.9)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(8px,2vw,20px)",
  },
  modal: {
    background: "#fff",
    borderRadius: 16,
    width: "100%",
    maxWidth: 920,
    height: "clamp(500px,92vh,96vh)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "13px 18px",
    background: N,
    borderBottom: `3px solid ${G}`,
    flexShrink: 0,
  },
  titleTxt: {
    fontSize: 14,
    color: "#fff",
    fontWeight: 800,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "clamp(120px,32vw,380px)",
    lineHeight: 1.3,
    marginBottom: 3,
  },
  typePill: {
    fontSize: 10,
    fontWeight: 800,
    padding: "2px 8px",
    borderRadius: 20,
    letterSpacing: 0.4,
    display: "inline-block",
  },
  openBtn: {
    background: G,
    color: N,
    border: "none",
    borderRadius: 7,
    padding: "7px 14px",
    fontSize: 12,
    fontWeight: 800,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  closeBtn: {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#fff",
    borderRadius: 8,
    width: 34,
    height: 34,
    cursor: "pointer",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  zoomBar: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    background: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: 2,
    border: "1px solid rgba(255,255,255,0.15)",
  },
  zb: {
    background: "transparent",
    border: "none",
    color: "#fff",
    width: 30,
    height: 28,
    cursor: "pointer",
    borderRadius: 6,
    fontSize: 16,
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    position: "relative",
    background: "#dde3ea",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  pdfScroll: {
    flex: 1,
    overflowY: "auto",
    overflowX: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "24px 16px",
  },
  centerBox: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: 24,
    textAlign: "center",
  },
  spinner: {
    width: 44,
    height: 44,
    border: `4px solid ${G}`,
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "pdfSpin .8s linear infinite",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "11px 20px",
    background: "#fff",
    borderTop: "2px solid #e2e8f0",
    flexShrink: 0,
    gap: 10,
    flexWrap: "wrap",
  },
  pgBtn: {
    background: N,
    color: "#fff",
    border: "none",
    padding: "7px 15px",
    borderRadius: 7,
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 13,
    transition: "opacity .15s",
  },
  actionBtn: {
    color: "#fff",
    padding: "10px 20px",
    borderRadius: 8,
    fontWeight: 800,
    fontSize: 13,
    textDecoration: "none",
    display: "inline-block",
  },
};
