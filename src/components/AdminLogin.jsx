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
  X,
  ArrowLeft,
  Mail,
  HelpCircle,
  Copy
} from 'lucide-react';
import toast from 'react-hot-toast';
import { 
  loginAdmin, 
  verifyTwoFactorPin, 
  sendAdminPasswordReset, 
  recoverAdminUsername,
  PRIMARY_OWNER_EMAIL,
  PRIMARY_OWNER_NAME 
} from '../firebase-auth';
import '../styles/admin-login.css';

// ── GNC College Theme ─────────────────────────────────────────────────────────
const NAVY  = '#0f2347';
const GOLD  = '#f4a023';

export default function AdminLogin({ onSuccess, onClose }) {
  // Step 1 State: Credentials
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

  // Step 2 State: 2FA Master Verification
  const [authStep, setAuthStep]   = useState('credentials'); // 'credentials' | '2fa'
  const [pinDigits, setPinDigits] = useState(['', '', '', '', '', '']);
  const [cooldownSecs, setCooldownSecs] = useState(0);
  const pinInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  // Account Recovery Modal State
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryTab, setRecoveryTab]   = useState('password'); // 'password' | 'username'
  const [recLoading, setRecLoading]     = useState(false);
  const [recMessage, setRecMessage]     = useState('');
  const [recError, setRecError]         = useState('');
  const [masterKeyInput, setMasterKeyInput] = useState('');
  const [recoveredIdentity, setRecoveredIdentity] = useState(null);

  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  // Mount animation
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  // Check initial cooldown lock if any
  useEffect(() => {
    const lockTimeStr = sessionStorage.getItem('gnc_2fa_lock_until');
    if (lockTimeStr) {
      const remaining = Math.ceil((parseInt(lockTimeStr, 10) - Date.now()) / 1000);
      if (remaining > 0) setCooldownSecs(remaining);
    }
  }, []);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldownSecs <= 0) return;
    const timer = setInterval(() => {
      setCooldownSecs(s => {
        if (s <= 1) {
          clearInterval(timer);
          sessionStorage.removeItem('gnc_2fa_lock_until');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSecs]);

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

  // ── Step 1: Submit Credentials ──────────────────────────────────────────────
  const handleCredentialSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) { 
      setError('Please provide administrator credentials.'); 
      return; 
    }
    setError(''); 
    setLoading(true); 
    setPhase('checking');

    try {
      await loginAdmin(username, password);
      setLoading(false);
      setPhase('idle');
      // Advance to Step 2 (2FA PIN)
      setAuthStep('2fa');
      setTimeout(() => {
        pinInputRefs[0]?.current?.focus();
      }, 100);
      toast.success('Credentials verified. Please enter Master 2FA PIN.');
    } catch (fbErr) {
      console.warn('[AdminLogin] Auth error:', fbErr.message);
      setPhase('fail');
      setError(fbErr.message || 'Authentication failed. Please verify credentials.');
      setLoading(false);
      setTimeout(() => setPhase('idle'), 600);
    }
  };

  // ── Step 2: 2FA PIN Input Handlers ──────────────────────────────────────────
  const handlePinChange = (index, value) => {
    if (cooldownSecs > 0) return;
    const cleanVal = value.replace(/\D/g, '');
    const newDigits = [...pinDigits];

    if (cleanVal.length > 1) {
      // User pasted full PIN
      const chars = cleanVal.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newDigits[i] = chars[i] || '';
      }
      setPinDigits(newDigits);
      const nextFocus = Math.min(chars.length, 5);
      pinInputRefs[nextFocus]?.current?.focus();
      if (chars.length === 6) {
        verifyPin(newDigits.join(''));
      }
      return;
    }

    newDigits[index] = cleanVal.slice(-1);
    setPinDigits(newDigits);

    if (cleanVal && index < 5) {
      pinInputRefs[index + 1]?.current?.focus();
    }

    if (newDigits.every(d => d !== '')) {
      verifyPin(newDigits.join(''));
    }
  };

  const handlePinKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
      pinInputRefs[index - 1]?.current?.focus();
    }
  };

  const verifyPin = (fullPin) => {
    setError('');
    setLoading(true);
    setPhase('checking');

    try {
      verifyTwoFactorPin(fullPin);
      setPhase('success');
      toast.success(`Identity Confirmed. Welcome ${PRIMARY_OWNER_NAME}!`);
      setTimeout(() => {
        onSuccess();
      }, 800);
    } catch (err) {
      setPhase('fail');
      setError(err.message || 'Incorrect Master PIN.');
      setLoading(false);
      setPinDigits(['', '', '', '', '', '']);
      pinInputRefs[0]?.current?.focus();

      // Check if locked
      const lockTimeStr = sessionStorage.getItem('gnc_2fa_lock_until');
      if (lockTimeStr) {
        const remaining = Math.ceil((parseInt(lockTimeStr, 10) - Date.now()) / 1000);
        if (remaining > 0) setCooldownSecs(remaining);
      }
      setTimeout(() => setPhase('idle'), 600);
    }
  };

  // ── Recovery Handlers ───────────────────────────────────────────────────────
  const handleTriggerPasswordReset = async () => {
    setRecLoading(true);
    setRecError('');
    setRecMessage('');
    try {
      const res = await sendAdminPasswordReset();
      setRecMessage(res.message);
      toast.success('Password reset email dispatched successfully!');
    } catch (err) {
      setRecError(err.message || 'Failed to send password reset email.');
    } finally {
      setRecLoading(false);
    }
  };

  const handleRecoverUsername = (e) => {
    e.preventDefault();
    setRecLoading(true);
    setRecError('');
    setRecoveredIdentity(null);
    try {
      const res = recoverAdminUsername(masterKeyInput);
      setRecoveredIdentity(res);
      toast.success('Administrator identity verified!');
    } catch (err) {
      setRecError(err.message || 'Invalid Master Verification Key.');
    } finally {
      setRecLoading(false);
    }
  };

  const btnLabel = () => {
    if (phase === 'success') return <><Check size={18} /><span>Access Granted</span></>;
    if (phase === 'fail')    return <><X size={18} /><span>Verification Failed</span></>;
    if (phase === 'checking') return <><div className="gnc-spinner" /><span>Verifying{'.'.repeat(dots)}</span></>;
    return <><Lock size={16} /><span>{authStep === '2fa' ? 'Confirm Master PIN' : 'Proceed to Security Check'}</span></>;
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
              Secured Enterprise Core
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
              Centralized college governance and administrative operations. 
              Protected with Two-Factor Master PIN & single-owner root security.
            </div>

            <div className="gnc-features">
              {[
                [<ShieldCheck size={14} key="sec" />, '2FA Master PIN Protected'],
                [<Sparkles size={14} key="ai" />, 'AI-Powered Campus Command'],
                [<Zap size={14} key="fast" />, 'Excel & CSV Bulk Importer'],
                [<GraduationCap size={14} key="owner" />, 'Sole Administrator: Pankaj Kumar Prasad'],
              ].map(([icon, text]) => (
                <div key={text} className="gnc-feature">
                  <div className="gnc-feature-icon">{icon}</div>
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="gnc-left-footer">
            Administered by Pankaj Kumar Prasad · Super Admin Core v11.0
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="gnc-right" style={{ position: 'relative' }}>
          <button className="gnc-close" onClick={onClose} title="Close" aria-label="Close login modal">
            <X size={16} />
          </button>

          <div className="gnc-right-eyebrow">Root Administrator Verification</div>
          <div className="gnc-right-title">
            {authStep === '2fa' ? 'Master 2FA Verification' : 'Welcome Back'}
          </div>
          <div className="gnc-right-sub">
            {authStep === '2fa' 
              ? `Enter the 6-digit Master PIN for ${PRIMARY_OWNER_NAME}` 
              : 'Sign in to access Guru Nanak College administrative core'}
          </div>

          {/* Progress bar */}
          <div className="gnc-progress">
            <div className={`gnc-progress-inner ${loading ? 'go' : ''}`} />
          </div>

          {/* Security indicator */}
          <div className="gnc-security">
            <span className="gnc-security-icon"><Lock size={14} /></span>
            <span className="gnc-security-text">
              {authStep === '2fa' ? 'Step 2: Master Security PIN Active' : 'Step 1: Credential Authentication'}
            </span>
            <div className="gnc-security-dot" />
          </div>

          {error && (
            <div className="gnc-error" style={{ marginBottom: 16 }}>
              <AlertTriangle size={15} /> <span>{error}</span>
            </div>
          )}

          {/* ── STEP 1: CREDENTIALS FORM ── */}
          {authStep === 'credentials' && (
            <form onSubmit={handleCredentialSubmit} autoComplete="off">
              {/* Username */}
              <div className="gnc-field">
                <label htmlFor="admin-username" className="gnc-field-label">
                  <span>Username or Admin Email</span>
                </label>
                <div className={`gnc-input-wrap ${focusU ? 'focused' : ''}`}>
                  <span className="gnc-input-icon" aria-hidden="true"><User size={16} /></span>
                  <input
                    id="admin-username"
                    className="gnc-input"
                    type="text"
                    placeholder="e.g. admin or pankajkumargnc@gmail.com"
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
                    placeholder="Enter root password"
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

              {/* Single-Role Super Admin Attribution Display */}
              <div style={{
                background: 'rgba(244,160,35,0.08)',
                border: '1px solid rgba(244,160,35,0.3)',
                borderRadius: 10,
                padding: '10px 14px',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, background: 'rgba(244,160,35,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, flexShrink: 0
                }}>
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 800, textTransform: 'uppercase' }}>
                    Sole Authorized System Owner
                  </div>
                  <div style={{ fontSize: 13, color: '#fff', fontWeight: 900 }}>
                    {PRIMARY_OWNER_NAME} <span style={{ color: GOLD, fontSize: 11 }}>• Super Admin</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`gnc-btn ${phase === 'success' ? 'success-btn' : ''} ${phase === 'fail' ? 'fail-btn' : ''}`}
                disabled={loading}
              >
                {btnLabel()}
              </button>

              {/* Recovery trigger */}
              <div className="gnc-recovery-links">
                <button
                  type="button"
                  className="gnc-recovery-link-btn"
                  onClick={() => { setShowRecovery(true); setRecoveryTab('password'); }}
                >
                  Forgot Password?
                </button>
                <button
                  type="button"
                  className="gnc-recovery-link-btn"
                  onClick={() => { setShowRecovery(true); setRecoveryTab('username'); }}
                >
                  Recover Admin Identity
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 2: 2FA MASTER PIN FORM ── */}
          {authStep === '2fa' && (
            <div>
              <div style={{ textAlign: 'center', margin: '10px 0 20px' }}>
                <div className="gnc-2fa-badge">
                  <Shield size={14} /> Master Security Verification
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                  Enter the 6-digit Master PIN to authorize administrative execution for <strong>{PRIMARY_OWNER_NAME}</strong>.
                </div>
              </div>

              {cooldownSecs > 0 ? (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: 10,
                  padding: '14px',
                  textAlign: 'center',
                  color: '#fca5a5',
                  marginBottom: 16
                }}>
                  <AlertTriangle size={20} style={{ margin: '0 auto 6px' }} />
                  <div style={{ fontWeight: 800, fontSize: 14 }}>Security Cooldown Active</div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>
                    Too many failed attempts. Try again in <strong>{cooldownSecs}s</strong>.
                  </div>
                </div>
              ) : (
                <div className="gnc-pin-inputs">
                  {pinDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={pinInputRefs[idx]}
                      type="password"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handlePinChange(idx, e.target.value)}
                      onKeyDown={(e) => handlePinKeyDown(idx, e)}
                      className="gnc-pin-digit"
                      aria-label={`Digit ${idx + 1} of 2FA PIN`}
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => verifyPin(pinDigits.join(''))}
                className={`gnc-btn ${phase === 'success' ? 'success-btn' : ''} ${phase === 'fail' ? 'fail-btn' : ''}`}
                disabled={loading || cooldownSecs > 0 || pinDigits.some(d => !d)}
              >
                {btnLabel()}
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                <button
                  type="button"
                  onClick={() => { setAuthStep('credentials'); setError(''); }}
                  style={{
                    background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)',
                    display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, cursor: 'pointer', fontWeight: 600
                  }}
                >
                  <ArrowLeft size={14} /> Back to Credentials
                </button>
                <button
                  type="button"
                  className="gnc-recovery-link-btn"
                  onClick={() => { setShowRecovery(true); setRecoveryTab('username'); }}
                >
                  Master PIN Assistance
                </button>
              </div>
            </div>
          )}

          <div className="gnc-right-footer">
            <ShieldCheck size={14} />
            <span>Sole Root Authority: {PRIMARY_OWNER_NAME} &nbsp;·&nbsp; v11.0</span>
          </div>

          {/* ── ACCOUNT RECOVERY MODAL ── */}
          {showRecovery && (
            <div className="gnc-recovery-modal-overlay">
              <div className="gnc-recovery-modal-card">
                <button
                  onClick={() => { setShowRecovery(false); setRecError(''); setRecMessage(''); }}
                  style={{
                    position: 'absolute', top: 16, right: 16, background: 'none',
                    border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer'
                  }}
                  aria-label="Close recovery modal"
                >
                  <X size={18} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <ShieldCheck size={20} color={GOLD} />
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>
                    Single-Owner System Recovery
                  </div>
                </div>

                <div className="gnc-rec-nav">
                  <button
                    className={`gnc-rec-tab ${recoveryTab === 'password' ? 'active' : ''}`}
                    onClick={() => { setRecoveryTab('password'); setRecError(''); setRecMessage(''); }}
                  >
                    Reset Password
                  </button>
                  <button
                    className={`gnc-rec-tab ${recoveryTab === 'username' ? 'active' : ''}`}
                    onClick={() => { setRecoveryTab('username'); setRecError(''); setRecMessage(''); }}
                  >
                    Recover Admin Identity
                  </button>
                </div>

                {recError && (
                  <div style={{
                    background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#fca5a5', padding: '10px 14px', borderRadius: 8, fontSize: 12.5, marginBottom: 14
                  }}>
                    {recError}
                  </div>
                )}

                {recMessage && (
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)',
                    color: '#6ee7b7', padding: '10px 14px', borderRadius: 8, fontSize: 12.5, marginBottom: 14
                  }}>
                    {recMessage}
                  </div>
                )}

                {recoveryTab === 'password' && (
                  <div>
                    <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: 16 }}>
                      Security policy strictly dispatches password reset instructions only to the primary system administrator:
                      <div style={{ 
                        marginTop: 8, padding: '8px 12px', background: 'rgba(255,255,255,0.06)', 
                        borderRadius: 6, color: GOLD, fontWeight: 800, fontSize: 13, border: '1px solid rgba(244,160,35,0.2)' 
                      }}>
                        {PRIMARY_OWNER_EMAIL}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleTriggerPasswordReset}
                      disabled={recLoading}
                      className="abtn abtn-navy"
                      style={{
                        width: '100%', background: GOLD, color: NAVY, padding: '12px',
                        borderRadius: 8, fontWeight: 900, border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                      }}
                    >
                      <Mail size={16} />
                      {recLoading ? 'Dispatching Reset Email...' : 'Send Password Reset Email'}
                    </button>
                  </div>
                )}

                {recoveryTab === 'username' && (
                  <form onSubmit={handleRecoverUsername}>
                    <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: 12 }}>
                      Enter your Master Verification Key to reveal registered administrator identity and root access credentials.
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <input
                        type="password"
                        placeholder="Enter Master Security Key or 2FA PIN"
                        value={masterKeyInput}
                        onChange={e => setMasterKeyInput(e.target.value)}
                        required
                        style={{
                          width: '100%', padding: '10px 14px', borderRadius: 8,
                          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
                          color: '#fff', fontSize: 13, outline: 'none'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={recLoading}
                      style={{
                        width: '100%', background: GOLD, color: NAVY, padding: '10px',
                        borderRadius: 8, fontWeight: 900, border: 'none', cursor: 'pointer'
                      }}
                    >
                      {recLoading ? 'Verifying...' : 'Verify & Reveal Identity'}
                    </button>

                    {recoveredIdentity && (
                      <div style={{
                        marginTop: 16, padding: '12px', background: 'rgba(255,255,255,0.05)',
                        borderRadius: 8, border: '1px solid rgba(16,185,129,0.3)'
                      }}>
                        <div style={{ color: '#10b981', fontWeight: 800, fontSize: 12, marginBottom: 6 }}>
                          VERIFIED ROOT ADMINISTRATOR:
                        </div>
                        <div style={{ fontSize: 12.5, color: '#fff', lineHeight: 1.6 }}>
                          <div><strong>Owner:</strong> {recoveredIdentity.name}</div>
                          <div><strong>Login Username:</strong> {recoveredIdentity.username}</div>
                          <div><strong>Official Email:</strong> {recoveredIdentity.email}</div>
                          <div><strong>Access Role:</strong> {recoveredIdentity.role}</div>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}