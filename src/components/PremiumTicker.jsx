import React from 'react';
import { COLORS } from '../styles/colors';

const PremiumTicker = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }
  
  const extendedItems = [...items, ...items];

  return (
    <div className="ticker-wrapper">
      <style>{`
        .ticker-wrapper {
          display: flex;
          align-items: center;
          background: #0f2347; /* Elegant Navy Background */
          color: #fff;
          padding: 10px 0; 
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          border-bottom: 2px solid ${COLORS.gold};
        }
        .ticker-label {
          background: ${COLORS.gold};
          color: #0f2347;
          font-weight: 800;
          font-size: 13px;
          padding: 8px 24px;
          border-radius: 0 20px 20px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
          flex-shrink: 0;
          margin-right: 20px;
          z-index: 2;
          box-shadow: 4px 0 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ticker-container {
          flex-grow: 1;
          overflow: hidden;
          /* Yeh gradient mask text ko side se smoothly fade karta hai */
          mask-image: linear-gradient(to right, transparent, white 5%, white 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 5%, white 95%, transparent);
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: scrollTicker 35s linear infinite;
        }
        .ticker-wrapper:hover .ticker-track {
          animation-play-state: paused;
        }
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 30px;
          font-size: 14.5px;
          color: #e2e8f0;
          white-space: nowrap;
        }
        .ticker-item a { 
          color: #fff; 
          text-decoration: none; 
          font-weight: 500; 
          transition: color 0.3s; 
        }
        .ticker-item a:hover { 
          color: ${COLORS.gold}; 
        }
        /* Stylish separator */
        .ticker-item::before { 
          content: '✦'; 
          color: ${COLORS.gold}; 
          font-size: 14px; 
          animation: pulse 2s infinite;
        }
        @keyframes scrollTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; text-shadow: 0 0 8px ${COLORS.gold}; }
        }
      `}</style>
      
      <div className="ticker-label">
        <span style={{ fontSize: '16px' }}>🔔</span> Latest Updates
      </div>
      
      <div className="ticker-container">
        <div className="ticker-track">
          {extendedItems.map((item, index) => (
            <div key={index} className="ticker-item">
              <a 
                href={item.link || item.fileUrl || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {/* Firebase 'title' ya direct 'text' dono ko support karega */}
                {item.text || item.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumTicker;