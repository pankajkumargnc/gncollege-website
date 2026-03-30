import React from 'react';
import { COLORS } from '../styles/colors';

export default function Ticker({ items }) {
  // Original Logic: Agar items nahi hain toh kuch render mat karo
  if (!items || items.length === 0) return null;

  // Original Logic: Dynamic duration based on array length
  const duration = Math.max(20, items.length * 6);

  return (
    <div className="gnc-ticker-root">
      <style>{`
        /* ── PREMIUM ANIMATIONS ── */
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes gncTextShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* ── ROOT CONTAINER ── */
        .gnc-ticker-root {
          width: 100%;
          height: 40px;
          /* Dark Navy Background */
          background: #0a1832;
          color: #fff;
          font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
          display: flex;
          align-items: center;
          overflow: hidden;
          position: relative;
          z-index: 10;
          border-bottom: 2px solid rgba(244,160,35,0.4);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        /* ── RED RIBBON BADGE (Screenshot Accurate) ── */
        .gnc-ribbon-wrapper {
          height: 100%;
          flex-shrink: 0;
          /* Drop-shadow se 3D depth aayegi ribbon ke peechhe */
          filter: drop-shadow(4px 0px 5px rgba(0,0,0,0.6)); 
          z-index: 20;
        }

        .gnc-ribbon {
          height: 100%;
          /* GNC Gold Gradient for Ribbon */
          background: linear-gradient(to bottom, ${COLORS.gold} 0%, #d97706 100%); 
          color: ${COLORS.navy};
          display: flex;
          align-items: center;
          padding: 0 30px 0 15px; /* Right side padding zyada di hai point ke liye */
          font-weight: 900;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          /* ✅ Yahi wo CSS hai jo Ribbon ko Right Pointing Arrow ka shape degi */
          clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%);
          white-space: nowrap;
        }

        /* Blinking White Dot inside Red Ribbon */
        .gnc-ribbon-dot {
          width: 6px;
          height: 6px;
          background-color: #fff;
          border-radius: 50%;
          margin-right: 8px;
          animation: ribbonBlink 1s infinite alternate;
          box-shadow: 0 0 6px #fff;
        }
        @keyframes ribbonBlink {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }

        /* ── TICKER TRACK ── */
        .gnc-ticker-area {
          flex: 1;
          height: 100%;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          mask-image: linear-gradient(90deg, transparent 0%, #000 2%, #000 98%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 2%, #000 98%, transparent 100%);
        }

        .gnc-marquee-track {
          display: flex;
          align-items: center; /* ✅ FIX: Vertically centers items */
          height: 100%; /* ✅ FIX: Takes full height of container */
          width: max-content;
          animation: tickerScroll ${duration}s linear infinite;
          will-change: transform;
        }
        .gnc-ticker-root:hover .gnc-marquee-track {
          animation-play-state: paused;
        }

        /* ── TICKER ITEMS ── */
        .gnc-ticker-item {
          display: flex; /* ✅ FIX: Changed to flex for perfect centering */
          align-items: center; /* ✅ FIX: Centers text & star */
          height: 100%; /* ✅ FIX: Full height */
          flex-shrink: 0; /* ✅ FIX: Prevents overlap/squishing on Mobile */
          padding: 0 20px;
          font-size: 13.5px;
          font-weight: 600;
          position: relative;
          white-space: nowrap;
        }
        
        .gnc-ticker-item::before {
          content: '★';
          display: flex;
          align-items: center; /* ✅ FIX: Perfect center */
          color: ${COLORS.gold}90;
          font-size: 10px;
          margin-right: 12px;
        }

        .gnc-ticker-item a {
          display: flex;
          align-items: center; /* ✅ FIX: Text centered */
          height: 100%;
          color: rgba(255,255,255,0.95);
          text-decoration: none;
          transition: color 0.3s;
          background: linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.95) 45%, #fff 50%, rgba(255,255,255,0.95) 55%, rgba(255,255,255,0.95) 100%);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent !important;
          animation: gncTextShimmer 6s linear infinite;
        }
        
        .gnc-ticker-item:hover a {
          color: ${COLORS.gold} !important;
          background: none;
          -webkit-background-clip: initial;
          text-shadow: 0 0 10px rgba(244,160,35,0.4);
          animation: none;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .gnc-ticker-root { height: 36px; }
          .gnc-ribbon { padding: 0 24px 0 12px; font-size: 10px; clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%); }
          .gnc-ticker-item { font-size: 12px; padding: 0 15px; }
        }
        @media (max-width: 480px) {
          .gnc-ticker-item { padding: 0 15px; }
          .gnc-ribbon-text { display: none; }
          .gnc-ribbon { padding: 0 20px 0 12px; }
          .gnc-ribbon-dot { margin-right: 0; }
        }
        /* Reduced motion — animation bahut slow ho jaati hai */
        @media (prefers-reduced-motion: reduce) {
          .gnc-marquee-track { animation-duration: 120s !important; }
          .gnc-ribbon-dot { animation: none !important; opacity: 1; }
        }
      `}</style>
      
      {/* ── Red Ribbon Label ── */}
      <div className="gnc-ribbon-wrapper" aria-hidden="true">
        <div className="gnc-ribbon">
          <span className="gnc-ribbon-dot"></span>
          <span className="gnc-ribbon-text">LATEST UPDATES</span>
        </div>
      </div>
      
      {/* ── Ticker Text Area ── */}
      {/* aria-live="off" — moving text pe screen reader continuously announce nahi karta */}
      {/* Screen readers ke liye static list #ticker-sr-list use karo */}
      <div className="gnc-ticker-area" aria-hidden="true">
        <div className="gnc-marquee-track">
          {items.map((item, idx) => (
            <div key={idx} className="gnc-ticker-item">
              <a href={item.link || '#'} target={item.link && item.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" tabIndex={-1}>
                {item.text || item.title}
              </a>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {items.map((item, idx) => (
            <div key={'dup-' + idx} className="gnc-ticker-item" aria-hidden="true">
              <a href={item.link || '#'} target={item.link && item.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" tabIndex={-1}>
                {item.text || item.title}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Screen reader only — static list of all notices */}
      <ul
        id="ticker-sr-list"
        style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
        aria-label="Latest updates list"
      >
        {items.map((item, idx) => (
          <li key={`sr-${idx}`}>
            <a href={item.link || '#'} rel="noopener noreferrer">
              {item.text || item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}