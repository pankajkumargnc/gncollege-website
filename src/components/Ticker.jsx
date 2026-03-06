import React from 'react';
import { COLORS } from '../styles/colors';

export default function Ticker({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div style={{ 
      background: COLORS.gold, 
      color: '#000', 
      padding: '8px 0', 
      display: 'flex', 
      alignItems: 'center', 
      overflow: 'hidden',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      zIndex: 10
    }}>
      <style>
        {`
          @keyframes blinker { 50% { opacity: 0; } }
          @keyframes tickerScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-badge {
            background: #d32f2f;
            color: #fff;
            padding: 4px 12px;
            font-weight: 800;
            font-size: 11px;
            margin-left: 15px;
            margin-right: 15px;
            border-radius: 4px;
            animation: blinker 1s linear infinite;
            white-space: nowrap;
            z-index: 20;
          }
          .ticker-track {
            display: flex;
            width: max-content;
            animation: tickerScroll 30s linear infinite;
          }
          .ticker-track:hover { animation-play-state: paused; }
          .ticker-item {
            padding: 0 30px;
            font-weight: 600;
            font-size: 13.5px;
            color: #0f2347;
            white-space: nowrap;
          }
        `}
      </style>

      <div className="ticker-badge">🚨 LATEST</div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div className="ticker-track">
          {/* Loop ke liye items ko do baar repeat kiya gaya hai */}
          {[...items, ...items].map((item, index) => (
            <div key={index} className="ticker-item">
              <span style={{ color: '#d32f2f', marginRight: '8px' }}>•</span>
              {item.text || item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}