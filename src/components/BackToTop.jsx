// src/components/BackToTop.jsx — v6 Upgrade: SVG progress ring + scroll percentage
// ✅ Commandment 2: Hover feedback | Commandment 10: Microinteractions
import { useState, useEffect, useCallback } from 'react';

const NAVY = '#0f2347';
const GOLD = '#f4a023';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    setVisible(scrollY > 400);
    setScrollPct(docH > 0 ? Math.round((scrollY / docH) * 100) : 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // SVG circle progress
  const R = 18;
  const C = 2 * Math.PI * R;
  const offset = C - (scrollPct / 100) * C;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title={`Back to top (${scrollPct}%)`}
      tabIndex={visible ? 0 : -1}
      style={{
        position: 'fixed',
        bottom: 'clamp(175px, 22vw, 195px)',
        right: 'clamp(20px, 3vw, 26px)',
        zIndex: 999980,
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: NAVY,
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(15,35,71,.35)',
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity .3s, visibility .3s, transform .3s, box-shadow .2s',
        padding: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,35,71,.45)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = visible ? 'translateY(0)' : 'translateY(12px)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,35,71,.35)';
      }}
    >
      {/* SVG: progress ring + arrow */}
      <svg width="44" height="44" viewBox="0 0 44 44" style={{ position: 'absolute' }} aria-hidden="true">
        {/* Background ring */}
        <circle
          cx="22" cy="22" r={R}
          fill="none"
          stroke="rgba(244,160,35,0.25)"
          strokeWidth="2.5"
        />
        {/* Progress ring */}
        <circle
          cx="22" cy="22" r={R}
          fill="none"
          stroke={GOLD}
          strokeWidth="2.5"
          strokeDasharray={C}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 22 22)"
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      {/* Up arrow — SVG icon (Commandment 1: no emoji) */}
      <svg
        width="16" height="16" viewBox="0 0 16 16"
        fill="none"
        style={{ position: 'relative', zIndex: 1 }}
        aria-hidden="true"
      >
        <path
          d="M8 12V4M4 8l4-4 4 4"
          stroke={GOLD}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}