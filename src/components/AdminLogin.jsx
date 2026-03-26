import React, { useState, useEffect, useRef } from 'react';

// ── GNC College Theme ─────────────────────────────────────────────────────────
const NAVY  = '#0f2347';
const GOLD  = '#f4a023';
const GOLD2 = '#c97e10';

export default function AdminLogin({ onSuccess, onClose }) {
  const [username, setUsername]   = useState('');
  const [password, setPassword]   = useState('');
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [showPass, setShowPass]   = useState(false);
  const [phase, setPhase]         = useState('idle'); // idle | checking | success | fail
  const [capsLock, setCapsLock]   = useState(false);
  const [focusU, setFocusU]       = useState(false);
  const [focusP, setFocusP]       = useState(false);
  const [dots, setDots]           = useState(0);
  const [mounted, setMounted]     = useState(false);
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  // Mount animation
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  // Animated dots while loading
  useEffect(() => {
    if (!loading) return;
    const t = setInterval(() => setDots(d => (d + 1) % 4), 350);
    return () => clearInterval(t);
  }, [loading]);

  // Particle canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      o: Math.random() * 0.45 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244,160,35,${p.o})`;
        ctx.fill();
      });
      // Lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(244,160,35,${0.07 * (1 - dist/90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, []);

  // Caps lock detection
  const handleKeyDown = e => {
    if (e.key === 'CapsLock') setCapsLock(e.getModifierState('CapsLock'));
  };
  const handleKeyUp = e => {
    if (e.key === 'CapsLock') setCapsLock(e.getModifierState('CapsLock'));
  };

  const handleLogin = e => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) { setError('Please fill in all fields.'); return; }
    setError(''); setLoading(true); setPhase('checking');

    setTimeout(() => {
      const validUser = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
      const validPass = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
      if (username === validUser && password === validPass) {
        setPhase('success');
        setTimeout(() => onSuccess(), 1000);
      } else {
        setPhase('fail');
        setError('Invalid credentials. Please try again.');
        setLoading(false);
        setTimeout(() => setPhase('idle'), 600);
      }
    }, 1400);
  };

  // ── ✅ PURE GLASSMORPHISM CSS ────────────────────────────────────────────────
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap&subset=latin');

    .gnc-login-root *, .gnc-login-root *::before, .gnc-login-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .gnc-login-root {
      position: fixed; inset: 0; z-index: 100000;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Inter', sans-serif;
      overflow: hidden;
    }

    /* ── BACKGROUND (High-Quality Image + Dark Navy Gradient Overlay) ── */
    .gnc-bg {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(15, 35, 71, 0.85) 0%, rgba(6, 14, 28, 0.5) 100%),
                  url('https://images.unsplash.com/photo-1541339907198-e08756defefe?q=80&w=2070&auto=format&fit=crop') center/cover no-repeat;
    }
    .gnc-bg canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; }
    .gnc-bg-grid {
      position: absolute; inset: 0; z-index: 2;
      background-image:
        linear-gradient(rgba(244,160,35,.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(244,160,35,.05) 1px, transparent 1px);
      background-size: 44px 44px;
    }

    /* ── WRAPPER (Transparent Glass) ── */
    .gnc-wrap {
      position: relative; z-index: 5;
      display: flex; width: 860px; max-width: 95vw;
      border-radius: 24px; overflow: hidden;
      
      /* GLASS EFFECT PROPERTIES */
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(25px);
      -webkit-backdrop-filter: blur(25px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 40px 100px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05);
      
      opacity: 0; transform: translateY(28px) scale(0.97);
      transition: opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);
    }
    .gnc-wrap.show { opacity: 1; transform: translateY(0) scale(1); }

    /* ── LEFT PANEL (Fully Transparent) ── */
    .gnc-left {
      width: 42%; 
      background: transparent; /* Changed from solid NAVY */
      padding: 48px 40px;
      display: flex; flex-direction: column; justify-content: space-between;
      position: relative; overflow: hidden;
      border-right: 1px solid rgba(255,255,255,.12); /* Glass divider */
    }
    .gnc-left-pattern {
      position: absolute; inset: 0; pointer-events: none;
      background-image: repeating-linear-gradient(
        45deg, rgba(244,160,35,.04) 0px, rgba(244,160,35,.04) 1px,
        transparent 1px, transparent 22px
      );
    }
    .gnc-badge {
      display: inline-flex; align-items: center; gap: 7px;
      background: rgba(244,160,35,.15); border: 1px solid rgba(244,160,35,.25);
      border-radius: 6px; padding: 6px 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; font-weight: 600; color: ${GOLD};
      letter-spacing: 1.5px; text-transform: uppercase;
      width: fit-content;
    }
    .gnc-badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: ${GOLD}; animation: blink 2s infinite;
    }
    @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.2;} }

    .gnc-logo-wrap {
      display: flex; align-items: center; gap: 16px; margin: 36px 0 20px;
    }
    .gnc-logo-icon {
      width: 58px; height: 58px; border-radius: 16px; flex-shrink: 0;
      background: linear-gradient(135deg, ${GOLD} 0%, ${GOLD2} 100%);
      display: flex; align-items: center; justify-content: center;
      font-size: 26px;
      box-shadow: 0 8px 24px rgba(244,160,35,.3);
    }
    .gnc-college-name {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 19px; font-weight: 800;
      color: #fff; line-height: 1.2; letter-spacing: -.3px;
    }
    .gnc-college-sub {
      font-size: 11px; color: rgba(255,255,255,.6);
      font-weight: 400; margin-top: 4px; line-height: 1.5;
    }

    .gnc-left-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 28px; font-weight: 800; color: #fff;
      line-height: 1.25; letter-spacing: -.5px; margin-bottom: 14px;
    }
    .gnc-left-title span { color: ${GOLD}; }
    .gnc-left-desc {
      font-size: 13px; color: rgba(255,255,255,.6);
      line-height: 1.7; font-weight: 400;
    }

    .gnc-features { margin-top: 32px; display: flex; flex-direction: column; gap: 12px; }
    .gnc-feature {
      display: flex; align-items: center; gap: 12px;
      font-size: 12.5px; color: rgba(255,255,255,.8); font-weight: 500;
    }
    .gnc-feature-icon {
      width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
      background: rgba(244,160,35,.15); border: 1px solid rgba(244,160,35,.2);
      display: flex; align-items: center; justify-content: center; font-size: 13px;
    }

    .gnc-left-footer {
      font-size: 11px; color: rgba(255,255,255,.4);
      font-family: 'JetBrains Mono', monospace;
    }

    /* ── RIGHT PANEL (Fully Transparent) ── */
    .gnc-right {
      flex: 1; 
      background: transparent; /* Changed from solid dark blue */
      padding: 48px 44px;
      display: flex; flex-direction: column; justify-content: center;
      position: relative;
    }
    .gnc-close {
      position: absolute; top: 20px; right: 20px;
      width: 34px; height: 34px; border-radius: 9px;
      background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15);
      color: rgba(255,255,255,.8); font-size: 14px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all .2s;
    }
    .gnc-close:hover { background: rgba(239,68,68,.2); border-color: rgba(239,68,68,.4); color: #ef4444; }

    .gnc-right-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; font-weight: 600; color: ${GOLD};
      letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;
      opacity: .9;
    }
    .gnc-right-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 26px; font-weight: 800; color: #fff;
      letter-spacing: -.4px; margin-bottom: 6px;
    }
    .gnc-right-sub {
      font-size: 13px; color: rgba(255,255,255,.6);
      margin-bottom: 36px; font-weight: 400;
    }

    /* ── INPUT GROUP (Glass Input) ── */
    .gnc-field { margin-bottom: 20px; }
    .gnc-field-label {
      display: flex; align-items: center; justify-content: space-between;
      font-size: 11px; font-weight: 600; color: rgba(255,255,255,.7);
      text-transform: uppercase; letter-spacing: .8px; margin-bottom: 9px;
    }
    .gnc-input-wrap {
      position: relative;
      border-radius: 12px; overflow: hidden;
      transition: all .2s;
    }
    .gnc-input-wrap::before {
      content: '';
      position: absolute; inset: 0;
      border-radius: 12px;
      border: 1.5px solid rgba(255,255,255,.15);
      pointer-events: none; z-index: 2;
      transition: border-color .2s;
    }
    .gnc-input-wrap.focused::before { border-color: rgba(244,160,35,.7); }
    .gnc-input-wrap.focused { box-shadow: 0 0 0 3px rgba(244,160,35,.2); }

    .gnc-input-icon {
      position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
      font-size: 15px; z-index: 3; opacity: .5; pointer-events: none;
      transition: opacity .2s;
    }
    .gnc-input-wrap.focused .gnc-input-icon { opacity: 1; }

    .gnc-input {
      width: 100%; padding: 14px 46px;
      background: rgba(255,255,255,.08); /* Transparent input background */
      border: none; outline: none;
      font-size: 14.5px; font-weight: 500;
      color: #fff; font-family: 'Inter', sans-serif;
      border-radius: 12px;
      transition: background .2s;
    }
    .gnc-input:focus { background: rgba(255,255,255,.15); }
    .gnc-input::placeholder { color: rgba(255,255,255,.4); }
    
    /* Fix autofill bug with transparent inputs */
    .gnc-input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 100px rgba(15,35,71,0.8) inset !important;
      -webkit-text-fill-color: #fff !important;
    }

    .gnc-eye-btn {
      position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer;
      font-size: 14px; color: rgba(255,255,255,.5); z-index: 3;
      transition: color .2s; padding: 4px;
    }
    .gnc-eye-btn:hover { color: rgba(255,255,255,.9); }

    .gnc-caps {
      font-size: 10.5px; color: #f59e0b; font-weight: 600;
      display: flex; align-items: center; gap: 4px;
    }

    /* ── ERROR ── */
    .gnc-error {
      display: flex; align-items: center; gap: 10px;
      background: rgba(239,68,68,.15); border: 1px solid rgba(239,68,68,.3);
      border-radius: 10px; padding: 11px 14px;
      font-size: 13px; color: #fca5a5; font-weight: 500;
      margin-bottom: 20px;
      animation: shake .4s cubic-bezier(.36,.07,.19,.97) both;
    }
    @keyframes shake {
      10%,90%{transform:translateX(-2px);}
      20%,80%{transform:translateX(3px);}
      30%,50%,70%{transform:translateX(-4px);}
      40%,60%{transform:translateX(4px);}
    }

    /* ── SUBMIT BUTTON ── */
    .gnc-btn {
      width: 100%; padding: 15px;
      background: linear-gradient(135deg, ${GOLD} 0%, ${GOLD2} 100%);
      border: none; border-radius: 12px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 15px; font-weight: 700;
      color: ${NAVY}; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      transition: all .25s; position: relative; overflow: hidden;
      box-shadow: 0 6px 24px rgba(244,160,35,.25);
      letter-spacing: .2px;
    }
    .gnc-btn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,.15) 0%, transparent 60%);
      pointer-events: none;
    }
    .gnc-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(244,160,35,.4);
    }
    .gnc-btn:active:not(:disabled) { transform: translateY(0); }
    .gnc-btn:disabled { opacity: .75; cursor: not-allowed; transform: none !important; }

    .gnc-btn.success-btn {
      background: linear-gradient(135deg, #10b981, #059669) !important;
      box-shadow: 0 8px 24px rgba(16,185,129,.35) !important;
      color: #fff;
    }
    .gnc-btn.fail-btn {
      background: linear-gradient(135deg, #ef4444, #dc2626) !important;
      color: #fff;
      animation: shake .4s ease both;
    }

    /* ── SPINNER ── */
    .gnc-spinner {
      width: 18px; height: 18px; border-radius: 50%;
      border: 2px solid rgba(15,35,71,.25);
      border-top-color: ${NAVY};
      animation: spin .7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── PROGRESS BAR ── */
    .gnc-progress {
      height: 2px; background: rgba(255,255,255,.1);
      border-radius: 99px; overflow: hidden; margin-bottom: 28px;
    }
    .gnc-progress-inner {
      height: 100%; background: linear-gradient(90deg, ${GOLD}, ${GOLD2});
      border-radius: 99px;
      transition: width 1.4s cubic-bezier(.4,0,.2,1);
      width: 0%;
    }
    .gnc-progress-inner.go { width: 100%; }

    /* ── FOOTER ── */
    .gnc-right-footer {
      margin-top: 28px;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      font-size: 11.5px; color: rgba(255,255,255,.4);
    }
    .gnc-right-footer span { color: rgba(244,160,35,.6); }

    /* ── SECURITY BADGE ── */
    .gnc-security {
      display: flex; align-items: center; gap: 8px;
      margin-bottom: 28px;
      padding: 10px 14px;
      background: rgba(16,185,129,.15);
      border: 1px solid rgba(16,185,129,.25);
      border-radius: 9px;
    }
    .gnc-security-icon { font-size: 13px; }
    .gnc-security-text { font-size: 11.5px; color: rgba(16,185,129,.9); font-weight: 600; }
    .gnc-security-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: #10b981; margin-left: auto; flex-shrink: 0;
      animation: blink 2.5s infinite;
    }

    /* ── RESPONSIVE ── */

    @media (max-width: 1199px) {
      .gnc-wrap { width: 820px; }
      .gnc-left { padding: 40px 32px; }
      .gnc-right { padding: 40px 36px; }
      .gnc-left-title { font-size: 24px; }
    }

    @media (max-width: 860px) {
      .gnc-wrap { width: 96vw; flex-direction: column; max-height: 96vh; overflow-y: auto; }
      .gnc-left { width: 100%; padding: 28px 28px 24px; flex-direction: row; flex-wrap: wrap; gap: 0; }
      .gnc-left-circle1, .gnc-left-circle2 { display: none; }
      .gnc-logo-wrap { margin: 0 0 0 0; }
      .gnc-badge { margin-bottom: 0; }
      .gnc-left > div:first-child { display: flex; align-items: center; gap: 20px; width: 100%; }
      .gnc-left-title { font-size: 18px; margin-bottom: 6px; }
      .gnc-left-desc { font-size: 12px; }
      .gnc-features { flex-direction: row; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
      .gnc-feature { font-size: 11.5px; }
      .gnc-left-footer { display: none; }
      .gnc-right { padding: 32px 28px; }
      .gnc-right-title { font-size: 22px; }
    }

    @media (max-width: 768px) {
      .gnc-wrap { width: 96vw; border-radius: 20px; }
      .gnc-left {
        width: 100%; padding: 22px 24px 20px;
        border-right: none;
        border-bottom: 1px solid rgba(255,255,255,.15);
      }
      .gnc-left > div:first-child { flex-direction: column; align-items: flex-start; gap: 14px; }
      .gnc-logo-wrap { margin: 12px 0 8px; }
      .gnc-left-title { font-size: 20px; display: none; }
      .gnc-left-desc { display: none; }
      .gnc-features { display: none; }
      .gnc-badge { margin-bottom: 0; }
      .gnc-left-footer { display: none; }
      .gnc-left { display: flex; flex-direction: row; align-items: center; gap: 16px; padding: 18px 24px; }
      .gnc-left-pattern { border-radius: 0; }
      .gnc-right { padding: 28px 24px 32px; }
      .gnc-right-title { font-size: 22px; }
      .gnc-right-sub { margin-bottom: 24px; font-size: 12.5px; }
      .gnc-security { padding: 9px 12px; }
      .gnc-security-text { font-size: 11px; }
      .gnc-progress { margin-bottom: 20px; }
    }

    @media (max-width: 480px) {
      .gnc-wrap { width: 100vw; height: 100vh; border-radius: 0; max-height: 100vh; border: none; }
      .gnc-left { display: none; }
      .gnc-right { padding: 32px 22px 28px; justify-content: flex-start; padding-top: 52px; }
      .gnc-close { top: 14px; right: 14px; }
      .gnc-right-eyebrow { font-size: 9.5px; }
      .gnc-right-title { font-size: 24px; }
      .gnc-right-sub { font-size: 12.5px; margin-bottom: 22px; }
      .gnc-input { font-size: 16px; padding: 13px 46px; }
      .gnc-btn { padding: 14px; font-size: 14.5px; }
      .gnc-field { margin-bottom: 16px; }
      .gnc-security { margin-bottom: 20px; }
      .gnc-right-footer { font-size: 10.5px; margin-top: 20px; }
    }
  `;

  const btnLabel = () => {
    if (phase === 'success') return <><span>✓</span> Access Granted</>;
    if (phase === 'fail')    return <><span>✕</span> Invalid Credentials</>;
    if (phase === 'checking') return <><div className="gnc-spinner" /><span>Authenticating{'.'  .repeat(dots)}</span></>;
    return <><span>🔐</span> Secure Login</>;
  };

  return (
    <div className="gnc-login-root">
      <style>{CSS}</style>

      {/* ── BACKGROUND IMAGE + CANVAS PARTICLES ── */}
      <div className="gnc-bg">
        <canvas ref={canvasRef} style={{ width:'100%', height:'100%' }} />
        <div className="gnc-bg-grid" />
        <div className="gnc-bg-glow1" />
        <div className="gnc-bg-glow2" />
      </div>

      {/* ── TRANSPARENT GLASS CARD ── */}
      <div className={`gnc-wrap ${mounted ? 'show' : ''}`}>

        {/* ── LEFT PANEL ── */}
        <div className="gnc-left">
          <div className="gnc-left-pattern" />
          <div className="gnc-left-circle1" />
          <div className="gnc-left-circle2" />

          <div>
            <div className="gnc-badge">
              <div className="gnc-badge-dot" />
              Secured Portal
            </div>

            <div className="gnc-logo-wrap">
              {/* ✅ Naya Logo Image */}
              <img 
                src="images/logo.webp" 
                alt="GNC Logo" 
                style={{ 
                  width: 58, height: 58, borderRadius: 12, 
                  objectFit: 'contain', background: '#fff', padding: 4, 
                  boxShadow: '0 8px 24px rgba(244,160,35,.3)', flexShrink: 0 
                }} 
              />
              <div>
                <div className="gnc-college-name">Guru Nanak College</div>
                {/* ✅ Naya Pincode wala Address */}
                <div className="gnc-college-sub">Dhanbad, Jharkhand - 826001</div>
              </div>
            </div>

            <div className="gnc-left-title">
              Website <span>Control</span><br/>Center
            </div>
            <div className="gnc-left-desc">
              Manage notices, events, faculty, gallery,
              documents and all website content from
              one unified dashboard.
            </div>

            <div className="gnc-features">
              {[
                ['📢', 'Real-time Notice Board'],
                ['👨‍🏫', 'Faculty & Staff Directory'],
                ['📊', 'Live Dashboard Analytics'],
                ['🛡️', '25-Phase System Diagnostics'],
              ].map(([icon, text]) => (
                <div key={text} className="gnc-feature">
                  <div className="gnc-feature-icon">{icon}</div>
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="gnc-left-footer">
            v11.0 · Admin Panel · GNC Dhanbad
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="gnc-right">
          <button className="gnc-close" onClick={onClose} title="Close">✕</button>

          <div className="gnc-right-eyebrow">Admin Access</div>
          <div className="gnc-right-title">Welcome Back</div>
          <div className="gnc-right-sub">Sign in to manage your college website</div>

          {/* Progress bar */}
          <div className="gnc-progress">
            <div className={`gnc-progress-inner ${loading ? 'go' : ''}`} />
          </div>

          {/* Security indicator */}
          <div className="gnc-security">
            <span className="gnc-security-icon">🔒</span>
            <span className="gnc-security-text">256-bit encrypted · Secure session</span>
            <div className="gnc-security-dot" />
          </div>

          <form onSubmit={handleLogin} autoComplete="off">
            {error && (
              <div className="gnc-error">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Username */}
            <div className="gnc-field">
              <div className="gnc-field-label"><span>Username</span></div>
              <div className={`gnc-input-wrap ${focusU ? 'focused' : ''}`}>
                <span className="gnc-input-icon">👤</span>
                <input
                  className="gnc-input"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusU(true)}
                  onBlur={() => setFocusU(false)}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="gnc-field">
              <div className="gnc-field-label">
                <span>Password</span>
                {capsLock && (
                  <span className="gnc-caps">⇪ Caps Lock ON</span>
                )}
              </div>
              <div className={`gnc-input-wrap ${focusP ? 'focused' : ''}`}>
                <span className="gnc-input-icon">🔑</span>
                <input
                  className="gnc-input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusP(true)}
                  onBlur={() => setFocusP(false)}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="gnc-eye-btn"
                  onClick={() => setShowPass(s => !s)}
                  tabIndex={-1}
                  title={showPass ? 'Hide' : 'Show'}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`gnc-btn ${phase === 'success' ? 'success-btn' : ''} ${phase === 'fail' ? 'fail-btn' : ''}`}
              disabled={loading}
            >
              {btnLabel()}
            </button>
          </form>

          <div className="gnc-right-footer">
            <span>🛡️</span>
            Authorized personnel only &nbsp;·&nbsp; GNC Admin v11.0
          </div>
        </div>

      </div>
    </div>
  );
}