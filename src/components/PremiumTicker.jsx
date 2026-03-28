import React from 'react';
import { COLORS } from '../styles/colors';

const PremiumTicker = ({ items }) => {
  if (!items || items.length === 0) return null;

  // 3 baar copy kiya hai taaki scroll ekdum seamless aur infinite lage
  const extendedItems = [...items, ...items, ...items];

  return (
    <div className="pt-wrapper">
      <style>{`
        /* ── WRAPPER ── */
        .pt-wrapper {
          display: flex;
          align-items: center;
          height: 38px;
          background: linear-gradient(90deg, #071124 0%, #0f2347 50%, #071124 100%);
          color: #fff;
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          border-bottom: 2px solid ${COLORS.gold};
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
        }

        /* ── SWEEPING LIGHT ANIMATION ── */
        .pt-wrapper::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          animation: shineSweep 3.5s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
        }
        @keyframes shineSweep {
          100% { left: 200%; }
        }

        /* ── GREEN RIBBON LABEL (Arrow Shape) ── */
        .pt-ribbon-wrapper {
          height: 100%;
          flex-shrink: 0;
          /* Drop-shadow for 3D depth behind the ribbon */
          filter: drop-shadow(4px 0px 5px rgba(0,0,0,0.6)); 
          z-index: 20;
        }

        .pt-ribbon {
          height: 100%;
          /* ✅ Solid Green Color as requested */
          background: #008000; 
          color: #fff;
          display: flex;
          align-items: center;
          padding: 0 28px 0 15px; /* Right side padding for the arrow point */
          font-weight: 900;
          font-size: 11.5px;
          text-transform: uppercase;
          letter-spacing: 1px;
          /* ✅ Arrow Shape (Clip-path) */
          clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%);
          white-space: nowrap;
        }

        /* Blinking White Dot inside Green Ribbon */
        .pt-ribbon-dot {
          width: 6px;
          height: 6px;
          background-color: #fff;
          border-radius: 50%;
          margin-right: 8px;
          animation: ptRibbonBlink 1s infinite alternate;
          box-shadow: 0 0 6px #fff;
        }
        @keyframes ptRibbonBlink {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }

        /* ── TICKER TRACK ── */
        .pt-track-container {
          flex: 1;
          height: 100%;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          mask-image: linear-gradient(90deg, transparent 0%, #fff 2%, #fff 98%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #fff 2%, #fff 98%, transparent 100%);
        }
        .pt-track {
          display: flex;
          align-items: center; /* ✅ FIX: Vertically centers items */
          height: 100%; /* ✅ FIX: Takes full height of container */
          white-space: nowrap;
          width: max-content;
          animation: pt-scroll 50s linear infinite;
          will-change: transform;
        }
        .pt-track:hover {
          animation-play-state: paused;
        }
        @keyframes pt-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }

        /* ── ITEMS & GLOWING STAR ── */
        .pt-item {
          display: flex; /* ✅ FIX: Changed from inline-flex to flex */
          align-items: center; /* ✅ FIX: Center content */
          height: 100%; /* ✅ FIX: Forces full height */
          flex-shrink: 0; /* ✅ FIX: Prevents items from overlapping on Mobile */
          padding: 0 22px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.2px;
          z-index: 2;
          white-space: nowrap;
        }
        .pt-item::before {
          content: '✦';
          display: flex; /* ✅ FIX: Centering the star */
          align-items: center;
          color: ${COLORS.gold};
          font-size: 13px;
          margin-right: 22px;
          animation: starPulse 1.5s infinite alternate;
        }
        @keyframes starPulse {
          0% { opacity: 0.4; transform: scale(0.8); text-shadow: none; }
          100% { opacity: 1; transform: scale(1.2); text-shadow: 0 0 10px ${COLORS.gold}; }
        }

        /* ── LINKS HOVER EFFECT ── */
        .pt-link {
          display: flex; /* ✅ FIX: Vertically centers the text perfectly */
          align-items: center;
          height: 100%;
          color: #e2e8f0;
          text-decoration: none;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .pt-link:hover {
          color: ${COLORS.gold};
          text-shadow: 0 0 12px rgba(244,160,35,0.4);
        }

        /* ── RESPONSIVE DESIGN ── */
        @media (max-width: 768px) {
          .pt-wrapper { height: 36px; }
          .pt-ribbon { padding: 0 24px 0 12px; font-size: 10px; clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%); }
          .pt-item { font-size: 12px; padding: 0 16px; }
          .pt-item::before { margin-right: 16px; font-size: 11px; }
        }
        @media (max-width: 480px) {
          .pt-wrapper { height: 32px; }
          .pt-item { padding: 0 20px; }
          .pt-ribbon-text { display: none; } /* Mobile par jagah bachane ke liye sirf blinking dot dikhega */
          .pt-ribbon { padding: 0 18px 0 12px; }
          .pt-ribbon-dot { margin-right: 0; }
        }
      `}</style>
      
      {/* ── Green Ribbon Label ── */}
      <div className="pt-ribbon-wrapper">
        <div className="pt-ribbon">
          <span className="pt-ribbon-dot"></span>
          <span className="pt-ribbon-text">UPDATES</span>
        </div>
      </div>
      
      {/* ── Ticker Text Area ── */}
      <div className="pt-track-container">
        <div className="pt-track">
          {extendedItems.map((item, index) => (
            <div key={index} className="pt-item">
              <a 
                href={item.link || item.fileUrl || '#'} 
                target={item.link && item.link.startsWith('/') ? '_self' : '_blank'}
                rel="noreferrer"
                className="pt-link"
              >
                {item.text || item.title || 'Important Update'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumTicker;