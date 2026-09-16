import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  User,
  Key,
  Eye,
  EyeOff,
  ShieldCheck,
  Shield,
  Sparkles,
  Zap,
  GraduationCap,
  Bell,
  AlertTriangle,
  Check,
  X
} from 'lucide-react';
import '../styles/admin-login.css';

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
  const [loginRole, setLoginRole] = useState('SUPER_ADMIN');
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
            ctx.lineTo(particles[i].x, particles[j].y);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) { setError('Please fill in all fields.'); return; }
    setError(''); setLoading(true); setPhase('checking');

    try {
      const { loginAdmin } = await import('../firebase-auth');
      await loginAdmin(username, password);
      sessionStorage.removeItem('gnc_admin_auth');
      sessionStorage.setItem('gnc_active_session', '1');
      sessionStorage.setItem('gnc_admin_role', loginRole);
      setPhase('success');
      setTimeout(() => onSuccess(), 800);
    } catch (fbErr) {
      console.warn('[AdminLogin] Auth error:', fbErr.message);
      setPhase('fail');
      setError(fbErr.message || 'Authentication failed. Please verify credentials.');
      setLoading(false);
      setTimeout(() => setPhase('idle'), 600);
    }
  };

  const btnLabel = () => {
    if (phase === 'success') return <><Check size={18} /><span>Access Granted</span></>;
    if (phase === 'fail')    return <><X size={18} /><span>Invalid Credentials</span></>;
    if (phase === 'checking') return <><div className="gnc-spinner" /><span>Authenticating{'.'.repeat(dots)}</span></>;
    return <><Lock size={16} /><span>Secure Login</span></>;
  };

  return (
    <div className="gnc-login-root">
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
                [<Sparkles size={14} key="ai" />, 'AI-Powered Campus Command'],
                [<Zap size={14} key="fast" />, 'Ultra-Fast Quick Publishing'],
                [<GraduationCap size={14} key="alumni" />, 'Integrated Alumni Wall'],
                [<Bell size={14} key="flash" />, 'Priority Flash Broadcaster'],
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
          <button className="gnc-close" onClick={onClose} title="Close" aria-label="Close login modal">
            <X size={16} />
          </button>

          <div className="gnc-right-eyebrow">Admin Access</div>
          <div className="gnc-right-title">Welcome Back</div>
          <div className="gnc-right-sub">Sign in to manage your college website</div>

          {/* Progress bar */}
          <div className="gnc-progress">
            <div className={`gnc-progress-inner ${loading ? 'go' : ''}`} />
          </div>

          {/* Security indicator */}
          <div className="gnc-security">
            <span className="gnc-security-icon"><Lock size={14} /></span>
            <span className="gnc-security-text">256-bit encrypted · Secure session</span>
            <div className="gnc-security-dot" />
          </div>

          <form onSubmit={handleLogin} autoComplete="off">
            {error && (
              <div className="gnc-error">
                <AlertTriangle size={15} /> <span>{error}</span>
              </div>
            )}

            {/* Username */}
            <div className="gnc-field">
              <label htmlFor="admin-username" className="gnc-field-label"><span>Username or Email</span></label>
              <div className={`gnc-input-wrap ${focusU ? 'focused' : ''}`}>
                <span className="gnc-input-icon" aria-hidden="true"><User size={16} /></span>
                <input
                  id="admin-username"
                  className="gnc-input"
                  type="text"
                  placeholder="Enter your username or email"
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
              <label htmlFor="admin-password" className="gnc-field-label">
                <span>Password</span>
                {capsLock && (
                  <span className="gnc-caps">⇪ Caps Lock ON</span>
                )}
              </label>
              <div className={`gnc-input-wrap ${focusP ? 'focused' : ''}`}>
                <span className="gnc-input-icon" aria-hidden="true"><Key size={16} /></span>
                <input
                  id="admin-password"
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
                  title={showPass ? 'Hide password' : 'Show password'}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Role / Department Selection */}
            <div className="gnc-field">
              <label htmlFor="admin-role-select" className="gnc-field-label">
                <span>Administrative Desk</span>
              </label>
              <div className="gnc-input-wrap">
                <span className="gnc-input-icon" aria-hidden="true"><Shield size={16} /></span>
                <select
                  id="admin-role-select"
                  className="gnc-input"
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value)}
                  style={{ cursor: 'pointer', background: 'rgba(15,35,71,0.7)', color: '#fff', fontWeight: 600 }}
                >
                  <option value="SUPER_ADMIN">Super Admin (Full Core Access)</option>
                  <option value="ACADEMIC_EXAM">Exam & Academic Controller</option>
                  <option value="CULTURAL_EVENTS">Events & Cultural Incharge</option>
                  <option value="FACULTY_PLACEMENT">Faculty & Placement Desk</option>
                </select>
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
            <ShieldCheck size={14} />
            <span>Authorized personnel only &nbsp;·&nbsp; GNC Admin v11.0</span>
          </div>
        </div>

      </div>
    </div>
  );
}