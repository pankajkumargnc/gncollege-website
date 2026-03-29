// src/pages/EmbeddedPDFPage.jsx
// 🚀 ULTRA PRO MAX PDF ENGINE (Height Increased for Full Page View)

import React, { useState, useRef } from 'react';
import { COLORS } from '../styles/colors';

export default function EmbeddedPDFPage({ title, subtitle, pdfUrl }) {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  // ── URL Formatting Engine (ABSOLUTE PATH FIX) ──
  const isDrive = pdfUrl.includes('drive.google.com');
  const driveUrl = isDrive ? pdfUrl.replace(/\/view(\?.*)?$/, '/preview') : '';
  
  // ✅ FIX: "Inception Bug" rokne ke liye URL ko exact origin point par set kiya
  const cleanUrl = pdfUrl.startsWith('/') ? pdfUrl.slice(1) : pdfUrl;
  const finalLocalUrl = pdfUrl.startsWith('http') 
    ? pdfUrl 
    : `${window.location.origin}${import.meta.env.BASE_URL}${cleanUrl}`;

  const displayUrl = isDrive ? driveUrl : `${finalLocalUrl}#toolbar=0&navpanes=0&scrollbar=0`;
  const downloadUrl = isDrive ? pdfUrl : finalLocalUrl;

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="epdf-root">
      <style>{`
        .epdf-root {
          position: relative;
          background: #030914; 
          min-height: 100vh;
          padding-bottom: 60px;
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          overflow: hidden;
          z-index: 1;
        }

        .epdf-aura {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.4;
          z-index: -1;
          animation: floatAura 15s ease-in-out infinite alternate;
        }
        .aura-1 { background: ${COLORS?.gold || '#f4a023'}; width: 400px; height: 400px; top: -100px; left: -100px; }
        .aura-2 { background: ${COLORS?.navy || '#0f2347'}; width: 600px; height: 600px; bottom: 10%; right: -100px; animation-delay: -5s; opacity: 0.6; }

        @keyframes floatAura {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 30px) scale(1.1); }
          100% { transform: translate(-30px, 80px) scale(0.9); }
        }

        .epdf-header {
          padding: clamp(60px, 8vw, 80px) 20px clamp(40px, 5vw, 60px);
          text-align: center;
          color: #fff;
          position: relative;
          z-index: 2;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: linear-gradient(180deg, rgba(3,9,20,0.8) 0%, rgba(3,9,20,0) 100%);
        }
        .epdf-title {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 900;
          margin: 0 0 12px;
          letter-spacing: -1px;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .epdf-subtitle {
          color: ${COLORS?.gold || '#f4a023'};
          font-size: clamp(12px, 1.5vw, 15px);
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .epdf-container {
          max-width: 1100px;
          margin: -30px auto 0;
          padding: 0 20px;
          position: relative;
          z-index: 10;
          animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .epdf-glass-box {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 15px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .epdf-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          padding: 10px 15px;
          background: rgba(0,0,0,0.3);
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .epdf-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #94a3b8;
          font-size: 13px;
          font-weight: 600;
        }
        .epdf-badge-dot {
          width: 8px; height: 8px;
          background: ${COLORS?.gold || '#f4a023'};
          border-radius: 50%;
          box-shadow: 0 0 10px ${COLORS?.gold || '#f4a023'};
          animation: pulse 2s infinite;
        }

        .epdf-actions { display: flex; gap: 10px; }

        .epdf-btn {
          background: rgba(255,255,255,0.05);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s;
        }
        .epdf-btn:hover {
          background: ${COLORS?.gold || '#f4a023'};
          color: #000;
          border-color: ${COLORS?.gold || '#f4a023'};
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(244,160,35,0.3);
        }

        /* 🔥 HEIGHT INCREASED HERE 🔥 */
        .epdf-iframe-wrap {
          position: relative;
          width: 100%;
          height: clamp(800px, 85vh, 1400px); /* Pura page dikhane ke liye lamba kiya gaya */
          border-radius: 12px;
          overflow: hidden;
          background: #e2e8f0;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .epdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
          position: relative;
          z-index: 2;
        }

        .epdf-loader {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: #0f172a;
          z-index: 1;
          color: #fff;
        }
        .epdf-spinner {
          width: 50px; height: 50px;
          border: 4px solid rgba(244,160,35,0.2);
          border-top-color: ${COLORS?.gold || '#f4a023'};
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        
        .epdf-iframe-wrap:fullscreen {
          height: 100vh;
          border-radius: 0;
        }
      `}</style>

      <div className="epdf-aura aura-1"></div>
      <div className="epdf-aura aura-2"></div>

      <div className="epdf-header">
        <h1 className="epdf-title">{title}</h1>
        <div className="epdf-subtitle">{subtitle || 'Official Document'}</div>
      </div>

      <div className="epdf-container">
        <div className="epdf-glass-box">
          <div className="epdf-toolbar">
            <div className="epdf-badge">
              <span className="epdf-badge-dot"></span>
              {loading ? 'Loading Document...' : 'Document Ready'}
            </div>
            
            <div className="epdf-actions">
              <button onClick={toggleFullScreen} className="epdf-btn">
                🔲 Full Screen
              </button>
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="epdf-btn" style={{ background: COLORS?.gold || '#f4a023', color: '#000' }}>
                📥 Download
              </a>
            </div>
          </div>

          <div className="epdf-iframe-wrap" ref={containerRef}>
            {loading && (
              <div className="epdf-loader">
                <div className="epdf-spinner"></div>
                <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '2px', color: '#cbd5e1' }}>
                  FETCHING PDF...
                </div>
              </div>
            )}
            <iframe
              src={displayUrl}
              title={title}
              onLoad={() => setLoading(false)}
              className="epdf-iframe"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}