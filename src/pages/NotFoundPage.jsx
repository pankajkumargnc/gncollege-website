// src/pages/NotFoundPage.jsx — Ultra Premium 404
// 🎨 @UI_Agent — Cinematic 404 experience with particles, animated background, and premium interactions

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NAVY = '#0f2347';
const GOLD = '#f4a023';

/* ── Floating particle system ── */
const PARTICLE_COUNT = 22;

function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const pts = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      o:  Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244,160,35,${p.o})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      // Connect nearby particles
      pts.forEach((a, i) => {
        pts.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(244,160,35,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [canvasRef]);
}

/* ── Quick nav suggestions ── */
const SUGGESTIONS = [
  { icon: '🏠', label: 'Home', path: '/' },
  { icon: '📸', label: 'Gallery', path: '/gallery/photos' },
  { icon: '📌', label: 'Admission', path: '/admission/rule' },
  { icon: '🎓', label: 'Courses', path: '/academics/course-offered' },
  { icon: '📞', label: 'Contact', path: '/contact' },
  { icon: '📚', label: 'Library', path: '/publication/college-library' },
];

export default function NotFoundPage() {
  const navigate   = useNavigate();
  const canvasRef  = useRef(null);
  const [typed, setTyped]   = useState('');
  const [hov,   setHov]     = useState(null);
  const [count, setCount]   = useState(5);

  useParticles(canvasRef);

  // Countdown to redirect home
  useEffect(() => {
    if (count <= 0) { navigate('/'); return; }
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, navigate]);

  const fullText = '404 — Page Not Found';
  // Typewriter
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(t);
    }, 55);
    return () => clearInterval(t);
  }, []);

  // Progress ring for countdown
  const R = 28, C = 2 * Math.PI * R;
  const dash = C * (count / 5);

  return (
    <div style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      background: `radial-gradient(ellipse at 20% 50%, #0a1628 0%, ${NAVY} 40%, #060e1c 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter','Plus Jakarta Sans',sans-serif",
    }}>

      {/* Animated canvas background */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.9 }} />

      {/* Gradient orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 420, height: 420, borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}14 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-15%', right: '-8%', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: 'clamp(32px,5vw,60px) clamp(20px,5vw,48px)', maxWidth: 680, width: '100%' }}>

        {/* Big 404 number */}
        <div style={{
          fontSize: 'clamp(100px,20vw,200px)',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-8px',
          background: `linear-gradient(135deg, ${GOLD} 0%, #fbbf24 40%, ${GOLD}88 80%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 8,
          fontFamily: "'Space Grotesk','Plus Jakarta Sans',sans-serif",
          filter: 'drop-shadow(0 0 40px rgba(244,160,35,0.3))',
        }}>
          404
        </div>

        {/* Typewriter line */}
        <div style={{
          fontSize: 'clamp(14px,2vw,18px)',
          color: 'rgba(255,255,255,0.5)',
          fontWeight: 600,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginBottom: 28,
          minHeight: '1.4em',
          fontFamily: "'Space Grotesk',monospace",
        }}>
          {typed}<span style={{ animation: 'nf-blink 1s infinite', opacity: typed.length < fullText.length ? 1 : 0 }}>|</span>
        </div>

        {/* Glassmorphism card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 28,
          padding: 'clamp(28px,4vw,44px)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 'clamp(16px,2.5vw,20px)', fontWeight: 700, color: '#f1f5f9', marginBottom: 12, lineHeight: 1.5 }}>
            Yeh page exist nahi karta
          </div>
          <div style={{ fontSize: 'clamp(13px,1.5vw,15px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: 28 }}>
            The page you're looking for may have been moved, deleted, or the URL might be incorrect.
            Check the address or use the links below to navigate.
          </div>

          {/* Primary action buttons */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <Link to="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: `linear-gradient(135deg, ${GOLD}, #fbbf24)`,
              color: NAVY, padding: '14px 32px', borderRadius: 50,
              fontWeight: 800, fontSize: 'clamp(13px,1.2vw,15px)',
              textDecoration: 'none', border: 'none',
              boxShadow: `0 8px 28px rgba(244,160,35,0.4)`,
              transition: 'all .25s cubic-bezier(.22,1,.36,1)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(244,160,35,0.55)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 28px rgba(244,160,35,0.4)'; }}
            >
              🏠 Go Home
            </Link>
            <button onClick={() => navigate(-1)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.07)',
              color: '#e2e8f0', padding: '14px 32px', borderRadius: 50,
              fontWeight: 700, fontSize: 'clamp(13px,1.2vw,15px)',
              border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer',
              transition: 'all .25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = ''; }}
            >
              ← Go Back
            </button>
          </div>

          {/* Quick page grid */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 14 }}>
              Or explore
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {SUGGESTIONS.map((s, i) => (
                <Link key={s.path} to={s.path} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  padding: '14px 10px', borderRadius: 14,
                  background: hov === i ? 'rgba(244,160,35,0.12)' : 'rgba(255,255,255,0.04)',
                  border: hov === i ? '1px solid rgba(244,160,35,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  textDecoration: 'none',
                  transition: 'all .2s',
                  transform: hov === i ? 'translateY(-3px)' : 'none',
                }}
                  onMouseEnter={() => setHov(i)}
                  onMouseLeave={() => setHov(null)}
                >
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: hov === i ? GOLD : 'rgba(255,255,255,0.5)', letterSpacing: '0.5px' }}>{s.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Countdown ring */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <svg width="64" height="64" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="32" cy="32" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" />
            <circle cx="32" cy="32" r={R} fill="none" stroke={GOLD} strokeWidth="3"
              strokeDasharray={`${dash} ${C}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 1s linear' }}
            />
            <text x="32" y="37" textAnchor="middle" fill={GOLD} fontSize="14" fontWeight="800" style={{ transform: 'rotate(90deg)', transformOrigin: '32px 32px' }}>
              {count}
            </text>
          </svg>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Auto-redirect in</div>
            <div style={{ fontSize: 15, color: GOLD, fontWeight: 800 }}>{count}s → Home</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes nf-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media(max-width:480px) {
          .nf-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}
