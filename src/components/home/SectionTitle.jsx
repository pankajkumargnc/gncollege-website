// src/components/home/SectionTitle.jsx
import React from "react";
import { COLORS } from '../../styles/colors';

const N = COLORS.navy || '#0f2347';
const G = COLORS.gold || '#f4a023';

const SectionTitle = ({ title, subtitle, label, darkBg = false }) => {
  // Title ko split karke last word nikal rahe hain taaki usko Gold color de sakein
  const words = title.split(' ');
  const lastWord = words.length > 1 ? words.pop() : '';
  const firstPart = words.join(' ');

  return (
    <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}>
      {label && (
        <div>
          <div style={{ 
            display:'inline-flex', alignItems:'center', gap:'8px', 
            background: darkBg ? 'rgba(255,255,255,0.08)' : 'rgba(15,35,71,.05)', 
            border: `1px solid ${darkBg ? 'rgba(255,255,255,0.1)' : 'rgba(15,35,71,.12)'}`, 
            color: darkBg ? '#fff' : N, 
            padding:'6px 18px', borderRadius:'20px', 
            fontSize:'clamp(10px,.8vw,12px)', fontWeight:800, 
            letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:'14px' 
          }}>
            {label}
          </div>
        </div>
      )}
      
      <h2 style={{ 
        fontFamily: "'Plus Jakarta Sans', sans-serif", 
        fontSize: 'clamp(32px,5vw,54px)', 
        fontWeight: 800, 
        color: darkBg ? '#fff' : N, 
        lineHeight: 1.1, 
        letterSpacing: '-1.5px', 
        margin: '0 0 16px' 
      }}>
        {firstPart} {lastWord && <span style={{ color: G }}>{lastWord}</span>}
      </h2>
      
      {subtitle && (
        <p style={{ 
          color: darkBg ? 'rgba(255,255,255,0.7)' : '#64748b', 
          fontSize: 'clamp(14px,1vw,16px)', 
          textAlign: 'center', 
          maxWidth: 580, 
          margin: '0 auto', 
          lineHeight: 1.7 
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;