import React, { memo } from 'react';
import { COLORS } from '../styles/colors';

const Ticker = memo(function Ticker({ items }) {
  // Original Logic: Agar items nahi hain toh kuch render mat karo
  if (!items || items.length === 0) return null;

  // Original Logic: Dynamic duration based on array length
  const duration = Math.max(20, items.length * 6);

  return (
    <div className="gnc-ticker-root">
      <style>{`
        /* ═══════════════════════════════════════════════════ */
        /* ██  NEON-EDGE PREMIUM TICKER                    ██ */
        /* ═══════════════════════════════════════════════════ */

        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes gncTextShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* ── Neon Edge Glow Line ── */
        @keyframes neonEdgeFlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        /* ── Ribbon Inner Shine ── */
        @keyframes ribbonShine {
          0%   { transform: translateX(-100%) skewX(-20deg); }
          25%  { transform: translateX(200%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }

        /* ── Dot Pulse Glow ── */
        @keyframes dotPulseGlow {
          0%   { opacity: 0.3; box-shadow: 0 0 4px rgba(255,255,255,0.3); }
          50%  { opacity: 1;   box-shadow: 0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(244,160,35,0.4); }
          100% { opacity: 0.3; box-shadow: 0 0 4px rgba(255,255,255,0.3); }
        }

        /* ── Star Particle Rotation ── */
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.4; transform: scale(1) rotate(0deg); }
          50%      { opacity: 1;   transform: scale(1.15) rotate(180deg); }
        }

        /* ═════════════════════════════════════ */
        /* ██  ROOT CONTAINER                 ██ */
        /* ═════════════════════════════════════ */
        .gnc-ticker-root {
          width: 100%;
          height: 42px;
          background: linear-gradient(90deg, #060e1c 0%, #0a1832 30%, #0e2044 50%, #0a1832 70%, #060e1c 100%);
          color: #fff;
          font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
          display: flex;
          align-items: center;
          overflow: hidden;
          position: relative;
          z-index: 10;
        }

        /* ── Neon Gold Top Edge ── */
        .gnc-ticker-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(244,160,35,0.3) 10%, 
            rgba(244,160,35,0.7) 30%, 
            rgba(255,215,0,0.9) 50%, 
            rgba(244,160,35,0.7) 70%, 
            rgba(244,160,35,0.3) 90%, 
            transparent 100%
          );
          background-size: 200% 100%;
          animation: neonEdgeFlow 4s linear infinite;
          z-index: 15;
        }

        /* ── Neon Gold Bottom Edge ── */
        .gnc-ticker-root::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(244,160,35,0.2) 15%, 
            rgba(244,160,35,0.6) 35%, 
            rgba(255,215,0,0.8) 50%, 
            rgba(244,160,35,0.6) 65%, 
            rgba(244,160,35,0.2) 85%, 
            transparent 100%
          );
          background-size: 200% 100%;
          animation: neonEdgeFlow 4s linear infinite reverse;
          z-index: 15;
          box-shadow: 0 4px 15px rgba(244,160,35,0.15);
        }

        /* ═════════════════════════════════════ */
        /* ██  PREMIUM 3D RIBBON BADGE         ██ */
        /* ═════════════════════════════════════ */
        .gnc-ribbon-wrapper {
          height: 100%;
          flex-shrink: 0;
          filter: drop-shadow(4px 0px 8px rgba(0,0,0,0.7));
          z-index: 20;
        }

        .gnc-ribbon {
          height: 100%;
          /* Richer gold gradient with 3D depth */
          background: linear-gradient(
            170deg, 
            #fbbf24 0%, 
            ${COLORS.gold} 30%, 
            #d97706 70%, 
            #b45309 100%
          );
          color: ${COLORS.navy};
          display: flex;
          align-items: center;
          padding: 0 30px 0 15px;
          font-weight: 900;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%);
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          /* Inner top highlight for 3D raised look */
          box-shadow: inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.15);
        }

        /* Inner shine sweep across ribbon */
        .gnc-ribbon::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40px; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
          animation: ribbonShine 6s infinite ease-in-out;
          pointer-events: none;
        }

        /* Glowing pulsing dot */
        .gnc-ribbon-dot {
          width: 7px;
          height: 7px;
          background-color: #fff;
          border-radius: 50%;
          margin-right: 9px;
          animation: dotPulseGlow 1.2s infinite ease-in-out;
          flex-shrink: 0;
        }

        /* ═════════════════════════════════════ */
        /* ██  TICKER TRACK                   ██ */
        /* ═════════════════════════════════════ */
        .gnc-ticker-area {
          flex: 1;
          height: 100%;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          mask-image: linear-gradient(90deg, transparent 0%, #000 3%, #000 97%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 3%, #000 97%, transparent 100%);
        }

        .gnc-marquee-track {
          display: flex;
          align-items: center;
          height: 100%;
          width: max-content;
          animation: tickerScroll ${duration}s linear infinite;
          will-change: transform;
        }

        .gnc-ticker-root:hover .gnc-marquee-track {
          animation-play-state: paused;
        }

        /* ═════════════════════════════════════ */
        /* ██  TICKER ITEMS — PREMIUM SHIMMER ██ */
        /* ═════════════════════════════════════ */
        .gnc-ticker-item {
          display: flex;
          align-items: center;
          height: 100%;
          flex-shrink: 0;
          padding: 0 22px;
          font-size: 13.5px;
          font-weight: 600;
          position: relative;
          white-space: nowrap;
        }

        /* Star separator with twinkle */
        .gnc-ticker-item::before {
          content: '✦';
          display: flex;
          align-items: center;
          color: ${COLORS.gold};
          font-size: 9px;
          margin-right: 14px;
          animation: starTwinkle 3s ease-in-out infinite;
          filter: drop-shadow(0 0 3px rgba(244,160,35,0.5));
        }

        .gnc-ticker-item a {
          display: flex;
          align-items: center;
          height: 100%;
          text-decoration: none;
          /* Richer shimmer gradient */
          background: linear-gradient(
            90deg, 
            rgba(255,255,255,0.88) 0%, 
            rgba(255,255,255,0.88) 35%, 
            rgba(244,160,35,0.9) 48%,
            #ffffff 52%, 
            rgba(255,255,255,0.88) 65%, 
            rgba(255,255,255,0.88) 100%
          );
          background-size: 250% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent !important;
          animation: gncTextShimmer 5s linear infinite;
          transition: all 0.3s ease;
        }

        .gnc-ticker-item:hover a {
          color: ${COLORS.gold} !important;
          background: none;
          -webkit-background-clip: initial;
          text-shadow: 0 0 12px rgba(244,160,35,0.5), 0 0 25px rgba(244,160,35,0.2);
          animation: none;
        }

        /* ═════════════════════════════════════ */
        /* ██  RESPONSIVE                     ██ */
        /* ═════════════════════════════════════ */
        @media (max-width: 768px) {
          .gnc-ticker-root { height: 38px; }
          .gnc-ribbon { padding: 0 24px 0 12px; font-size: 10px; clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%); }
          .gnc-ticker-item { font-size: 12.5px; padding: 0 16px; }
        }
        @media (max-width: 480px) {
          .gnc-ticker-item { padding: 0 15px; }
          .gnc-ribbon-text { display: none; }
          .gnc-ribbon { padding: 0 20px 0 12px; }
          .gnc-ribbon-dot { margin-right: 0; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .gnc-marquee-track { animation-duration: 120s !important; }
          .gnc-ribbon-dot { animation: none !important; opacity: 1; }
          .gnc-ribbon::after { animation: none !important; }
          .gnc-ticker-root::before, .gnc-ticker-root::after { animation: none !important; }
          .gnc-ticker-item::before { animation: none !important; }
          .gnc-ticker-item a { animation: none !important; color: rgba(255,255,255,0.9) !important; background: none !important; -webkit-background-clip: initial !important; }
        }
      `}</style>
      
      {/* ── Premium 3D Ribbon Label ── */}
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
});

export default Ticker;