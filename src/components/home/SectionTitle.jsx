import React from "react";
// src/components/home/SectionTitle.jsx
import { COLORS } from '../../styles/colors';

const SectionTitle = ({ title, subtitle, darkBg = false }) => (
  <div style={{ textAlign: 'center', marginBottom: 40 }}>
    <h2 style={{ fontSize: 28, fontWeight: 800, color: darkBg ? '#fff' : COLORS.navy, marginBottom: 8 }}>
      {title}
    </h2>
    <div style={{ width: 60, height: 4, background: COLORS.gold, margin: '0 auto 12px', borderRadius: 2 }} />
    {subtitle && (
      <p style={{ color: darkBg ? 'rgba(255,255,255,0.72)' : '#666', fontSize: 15 , textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionTitle;
