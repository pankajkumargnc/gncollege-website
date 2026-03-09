import React from 'react';
import { COLORS } from '../styles/colors';

const PremiumTicker = ({ items }) => {
  // Agar koi item nahi hai to kuch bhi render na karein
  if (!items || items.length === 0) {
    return null;
  }
  
  // Loop ko seamless banane ke liye items ko duplicate karein
  const extendedItems = [...items, ...items];

  return (
    <div className="ticker-wrapper">
      <style>{`
        .ticker-wrapper {
          display: flex;
          align-items: center;
          background: #0f2347; /* Navy Background */
          color: #fff;
          padding: 12px 0; /* Sirf vertical padding */
          overflow: hidden;
          position: relative;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .ticker-label {
          background: ${COLORS.gold};
          color: #0f2347;
          font-weight: 800;
          font-size: 12px;
          padding: 8px 20px;
          border-radius: 0 6px 6px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
          flex-shrink: 0;
          margin-right: 20px;
          z-index: 2;
          box-shadow: 5px 0 15px rgba(0,0,0,0.2);
        }
        .ticker-container {
          flex-grow: 1;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, white 10%, white 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 10%, white 95%, transparent);
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: scrollTicker 40s linear infinite;
        }
        .ticker-wrapper:hover .ticker-track {
          animation-play-state: paused;
        }
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 25px;
          font-size: 14px;
          color: #e2e8f0;
          white-space: nowrap;
        }
        .ticker-item a { color: #fff; text-decoration: none; font-weight: 600; transition: color 0.3s; }
        .ticker-item a:hover { color: ${COLORS.gold}; }
        .ticker-item::before { content: '✦'; color: ${COLORS.gold}; font-size: 10px; opacity: 0.7; }
        @keyframes scrollTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="ticker-label">Latest Updates</div>
      <div className="ticker-container">
        <div className="ticker-track">
          {extendedItems.map((item, index) => (
            <div key={index} className="ticker-item">
              <a href={item.link || '#'} target="_blank" rel="noopener noreferrer">
                {item.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumTicker;