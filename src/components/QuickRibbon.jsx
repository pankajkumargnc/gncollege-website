import React from 'react';
import { COLORS } from '../styles/colors';

export default function QuickRibbon() {
  const ribbonLinks = [
    { label: 'Admission 2024-28', icon: '🎓', href: '#' },
    { label: 'BCA & BBA Portal', icon: '💻', href: '#' },
    { label: 'Internal Exam', icon: '📋', href: '#' },
    { label: 'Online Fee', icon: '💳', href: '#' },
    { label: 'Syllabus', icon: '📚', href: '#' }
  ];

  return (
    <div style={{ 
      background: '#fff', 
      padding: '12px 0', 
      borderBottom: '1px solid #eee' 
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '12px', 
        flexWrap: 'wrap',
        padding: '0 15px' 
      }}>
        <style>
          {`
            .ribbon-box {
              background: ${COLORS.gold};
              color: #000;
              padding: 6px 16px;
              border-radius: 4px;
              text-decoration: none;
              font-size: 12.5px;
              font-weight: 700;
              display: flex;
              align-items: center;
              gap: 8px;
              transition: all 0.3s ease;
              box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            }
            .ribbon-box:hover {
              background: ${COLORS.navy};
              color: #fff;
              transform: translateY(-2px);
              box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            }
          `}
        </style>

        {ribbonLinks.map((link, i) => (
          <a key={i} href={link.href} className="ribbon-box">
            <span style={{ fontSize: '16px' }}>{link.icon}</span>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}