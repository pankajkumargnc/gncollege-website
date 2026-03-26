import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// CSS for react-pdf
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// ✅ FIX: cdnjs use karo — unpkg HTTP→HTTPS redirect pe Service Worker CORS block karta tha
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFModal = ({ url, title = "Document", onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalWidth, setModalWidth] = useState(800);

  if (!url) return null;

  // 1. Check if it's a Google Drive link
  const isDrive = url.includes("drive.google.com");
  const driveUrl = isDrive ? url.replace(/\/view(\?.*)?$/, "/preview") : "";

  // 2. CORS Bypass Proxy (Bahari websites ki security todne ke liye)
  const getSecureUrl = (rawUrl) => {
    if (rawUrl.startsWith("/")) return rawUrl; // Local files (/pdfs/...) ekdum theek hain
    if (isDrive) return rawUrl; // Drive links ko proxy nahi karna
    
    // External links (usda.gov etc.) ko proxy ke through bhejo taaki CORS error na aaye
    return `https://api.allorigins.win/raw?url=${encodeURIComponent(rawUrl)}`;
  };

  const finalPdfUrl = getSecureUrl(url);

  // Resize listener for mobile screens
  useEffect(() => {
    const updateWidth = () => setModalWidth(window.innerWidth < 800 ? window.innerWidth - 60 : 750);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
    setError(false);
  };

  const onDocumentLoadError = (err) => {
    console.error("PDF Load Error:", err);
    setLoading(false);
    setError(true);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        
        {/* ── HEADER ── */}
        <div style={styles.header}>
          <h3 style={styles.title}>📄 {title}</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <a href={url} target="_blank" rel="noreferrer" style={styles.openBtn} title="Download or Print">
              ↗ Open Original
            </a>
            <button style={styles.closeBtn} onClick={onClose} title="Close">✕</button>
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={styles.body}>
          {loading && !error && (
            <div style={styles.messageBox}>
              <span style={{ fontSize: '30px', display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
              <br/>Loading Securely...
            </div>
          )}

          {error && (
             <div style={{...styles.messageBox, color: '#ef4444'}}>
                <div style={{ fontSize: '30px', marginBottom: '10px' }}>⚠️</div>
                Yeh PDF bahut badi hai ya server ise proxy karne se rok raha hai.
                <br/><br/>
                <a href={url} target="_blank" rel="noreferrer" style={{...styles.openBtn, display: 'inline-flex', padding: '10px 20px', background: '#0f2347', color: '#fff'}}>
                  Open File In New Tab
                </a>
             </div>
          )}

          {!error && (
            <div style={styles.pdfWrapper}>
              {isDrive ? (
                /* Google Drive iframe Engine */
                <iframe
                  src={driveUrl}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  onLoad={() => setLoading(false)}
                  allowFullScreen
                />
              ) : (
                /* React-PDF Proxy Engine */
                <Document
                  file={finalPdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading="" 
                >
                  <Page 
                    pageNumber={pageNumber} 
                    width={modalWidth} 
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </Document>
              )}
            </div>
          )}
        </div>

        {/* ── FOOTER (Pagination) ── */}
        {!isDrive && !loading && !error && numPages > 0 && (
          <div style={styles.footer}>
            <button 
              style={{...styles.pageBtn, opacity: pageNumber <= 1 ? 0.5 : 1}} 
              disabled={pageNumber <= 1} 
              onClick={() => setPageNumber(p => p - 1)}
            >
              ◀ Prev
            </button>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f2347' }}>
              Page {pageNumber} of {numPages}
            </span>
            <button 
              style={{...styles.pageBtn, opacity: pageNumber >= numPages ? 0.5 : 1}} 
              disabled={pageNumber >= numPages} 
              onClick={() => setPageNumber(p => p + 1)}
            >
              Next ▶
            </button>
          </div>
        )}

      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .react-pdf__Page__canvas { margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      `}</style>
    </div>
  );
};

// ── CSS STYLES ──
const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(10, 22, 40, 0.85)', zIndex: 999999,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '10px', backdropFilter: 'blur(5px)'
  },
  container: {
    background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '850px',
    height: '92vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
    boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
  },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 20px', background: '#0f2347', borderBottom: '3px solid #f4a023',
    flexShrink: 0, zIndex: 10
  },
  title: {
    margin: 0, fontSize: '16px', color: '#fff', fontWeight: 800,
    fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap',
    overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '65%'
  },
  openBtn: {
    background: '#f4a023', color: '#0f2347', border: 'none', borderRadius: '6px',
    padding: '6px 14px', fontSize: '13px', fontWeight: 800, textDecoration: 'none',
    display: 'flex', alignItems: 'center', cursor: 'pointer', transition: '0.2s'
  },
  closeBtn: {
    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff', borderRadius: '6px', width: '32px', height: '32px', cursor: 'pointer',
    fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  body: {
    flex: 1, position: 'relative', background: '#e2e8f0', 
    overflowY: 'auto', display: 'flex', justifyContent: 'center', padding: '0'
  },
  pdfWrapper: {
    display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100%', width: '100%', padding: '20px 0'
  },
  messageBox: {
    textAlign: 'center', color: '#0f2347', fontWeight: 700, fontSize: '15px',
    background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #cbd5e1',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)', margin: 'auto'
  },
  footer: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 24px', background: '#fff', borderTop: '2px solid #e2e8f0',
    flexShrink: 0
  },
  pageBtn: {
    background: '#0f2347', color: '#fff', border: 'none', padding: '8px 16px',
    borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px'
  }
};

export default PDFModal;