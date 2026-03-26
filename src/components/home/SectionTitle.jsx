// src/components/home/SectionTitle.jsx
import React from "react";
import { COLORS } from '../../styles/colors';

const SectionTitle = ({ title, subtitle, label, darkBg = false }) => {
  // Title ko split karke last word nikal rahe hain taaki usko Gold color de sakein
  const words = title.split(' ');
  const lastWord = words.length > 1 ? words.pop() : '';
  const firstPart = words.join(' ');

  return (
    <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,52px)' }}>
      {label && (
        <div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(15,35,71,.06)', border:'1px solid rgba(15,35,71,.12)', color: darkBg ? '#fff' : COLORS.navy, padding:'5px 16px', borderRadius:'20px', fontSize:'clamp(9px,.75vw,11px)', fontWeight:800, letterSpacing:'2px', textTransform:'uppercase', marginBottom:'12px' }}>
            {label}
          </div>
        </div>
      )}
      {/* ✅ Premium Plus Jakarta Sans Heading */}
      <h2 style={{ 
        fontFamily: "'Plus Jakarta Sans', sans-serif", 
        fontSize: 'clamp(28px,5vw,50px)', 
        fontWeight: 800, 
        color: darkBg ? '#fff' : COLORS.navy, 
        lineHeight: 1.08, 
        letterSpacing: '-1.5px', 
        margin: '0 0 14px' 
      }}>
        {firstPart} {lastWord && <span style={{ color: COLORS.gold }}>{lastWord}</span>}
      </h2>
      
      {subtitle && (
        <p style={{ color: darkBg ? 'rgba(255,255,255,0.72)' : '#6b7280', fontSize: 'clamp(13px,.95vw,15px)', textAlign: 'center', maxWidth: 600, margin: '0 auto', lineHeight: 1.65 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;