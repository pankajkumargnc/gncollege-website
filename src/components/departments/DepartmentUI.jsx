import { useState, useEffect, useRef } from 'react';
import { COLORS } from '../../styles/colors';

export const NAVY = COLORS?.navy || '#0f2347';

export function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) { setVis(true); return; }
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.07, rootMargin: '0px 0px -36px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

export const Fade = ({ children, delay = 0, y = 22, style = {} }) => {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : `translateY(${y}px)`,
      transition: `opacity .58s cubic-bezier(.22,1,.36,1) ${delay}s, transform .58s cubic-bezier(.22,1,.36,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
};

export const Pill = ({ txt, color }) => (
  <span style={{
    background: `${color}14`, border: `1px solid ${color}2a`,
    color, fontSize: 11, fontWeight: 700,
    padding: '3px 10px', borderRadius: 20,
    display: 'inline-block',
  }}>{txt}</span>
);

export const SectionLabel = ({ txt, color }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
    <div style={{ width: 18, height: 2, background: `linear-gradient(90deg,${color},transparent)`, borderRadius: 2 }} />
    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color }}>
      {txt}
    </span>
  </div>
);

export const SectionHead = ({ label, title, color }) => (
  <Fade>
    <SectionLabel txt={label} color={color} />
    <h2 style={{
      fontFamily: "'Plus Jakarta Sans',sans-serif",
      fontSize: 'clamp(20px,2.8vw,28px)', fontWeight: 800,
      color: NAVY, margin: '0 0 28px', letterSpacing: '-.4px',
    }}>{title}</h2>
  </Fade>
);

export const EmptyBox = ({ icon, msg, sub, color }) => (
  <div style={{
    textAlign: 'center', padding: '44px 24px',
    background: `${color}07`, borderRadius: 16,
    border: `1.5px dashed ${color}28`,
  }}>
    <div style={{ fontSize: 38, marginBottom: 10 }}>{icon}</div>
    <div style={{ fontWeight: 700, color: NAVY, fontSize: 14, marginBottom: 5 }}>{msg}</div>
    {sub && <div style={{ color: '#94a3b8', fontSize: 12.5 }}>{sub}</div>}
  </div>
);

export const Spin = ({ color = NAVY }) => (
  <>
    <style>{`@keyframes dp-spin{to{transform:rotate(360deg)}}`}</style>
    <div style={{
      width: 38, height: 38, margin: '60px auto',
      border: `3px solid ${color}22`, borderTopColor: color,
      borderRadius: '50%', animation: 'dp-spin .75s linear infinite',
    }} />
  </>
);
