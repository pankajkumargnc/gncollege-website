// src/components/SectionHeader.jsx — Reusable section header (v6 Commandment 8)
// ✅ Consistent headings across all pages
// ✅ clamp() fluid typography, GNC design system

import React from 'react';

export default function SectionHeader({ title, subtitle, badge, align = 'center', className = '' }) {
  return (
    <div
      className={className}
      style={{
        textAlign: align,
        marginBottom: 'clamp(24px, 4vw, 40px)',
      }}
    >
      {badge && (
        <div style={{
          display: 'inline-block',
          background: 'rgba(244,160,35,.12)',
          color: '#c97e10',
          border: '1px solid rgba(244,160,35,.3)',
          padding: '4px 14px',
          borderRadius: 20,
          fontSize: 'clamp(10px, 1.2vw, 12px)',
          fontWeight: 800,
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          {badge}
        </div>
      )}

      <h2 style={{
        color: '#0f2347',
        fontWeight: 900,
        fontSize: 'clamp(20px, 3.5vw, 30px)',
        lineHeight: 1.2,
        margin: '0 0 12px',
        letterSpacing: '-0.5px',
      }}>
        {title}
      </h2>

      <div style={{
        width: 'clamp(32px, 4vw, 48px)',
        height: 3,
        background: '#f4a023',
        borderRadius: 2,
        margin: align === 'center' ? '0 auto 16px' : '0 0 16px',
      }} />

      {subtitle && (
        <p style={{
          color: '#64748b',
          margin: 0,
          fontSize: 'clamp(13px, 1.8vw, 16px)',
          lineHeight: 1.7,
          maxWidth: 560,
          marginLeft: align === 'center' ? 'auto' : 0,
          marginRight: align === 'center' ? 'auto' : 0,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
