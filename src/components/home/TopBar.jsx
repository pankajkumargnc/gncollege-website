import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from '../../data/db';

const SIKH_DIVINE_QUOTES = [
  {
    gurmukhi: "ੴ ਸਤਿਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ",
    english: "One Universal Creator God, The Name Is Truth, Creative Being Personified, Without Fear, Without Hatred",
    author: "Mool Mantar — Guru Nanak Dev Ji"
  },
  {
    gurmukhi: "ਵਿਦਿਆ ਵੀਚਾਰੀ ਤਾਂ ਪਰਉਪਕਾਰੀ ॥",
    english: "Contemplate on knowledge and become a benefactor to humanity",
    author: "Sri Guru Granth Sahib Ji (Ang 356)"
  },
  {
    gurmukhi: "ਕਿਰਤ ਕਰੋ • ਨਾਮ ਜਪੋ • ਵੰਡ ਛਕੋ",
    english: "Honest hard work, remembrance of the Divine, and selfless sharing with society",
    author: "Three Pillars of Sikh Philosophy"
  },
  {
    gurmukhi: "ਨਾਨਕ ਨਾਮ ਚੜ੍ਹਦੀ ਕਲਾ, ਤੇਰੇ ਭਾਣੇ ਸਰਬੱਤ ਦਾ ਭਲਾ ॥",
    english: "May high spirits prevail, and by Thy Will, may peace and prosperity bless all mankind",
    author: "Sikh Ardaas"
  },
  {
    gurmukhi: "ਸਚਹੁ ਓਰੈ ਸਭੁ ਕੋ ਉਪਰਿ ਸਚੁ ਆਚਾਰੁ ॥",
    english: "Truth is the highest virtue, but higher still is truthful living",
    author: "Guru Nanak Dev Ji (Ang 62)"
  }
];

const TopBar = ({ isDark, onToggleDark, onSearchOpen }) => {
  const whatsappLink = { id: 'whatsapp', label: 'W', href: 'https://wa.me/917903340991' };
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteFading, setQuoteFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteFading(true);
      setTimeout(() => {
        setQuoteIndex(prev => (prev + 1) % SIKH_DIVINE_QUOTES.length);
        setQuoteFading(false);
      }, 400);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  const changeQuote = (dir) => {
    setQuoteFading(true);
    setTimeout(() => {
      setQuoteIndex(prev => (prev + dir + SIKH_DIVINE_QUOTES.length) % SIKH_DIVINE_QUOTES.length);
      setQuoteFading(false);
    }, 300);
  };

  const currentQuote = SIKH_DIVINE_QUOTES[quoteIndex];

  return (
    <div className="premium-topbar">
      <style>{`
        /* ═══════════════════════════════════════════════════ */
        /* ██  SPLIT DUAL-TONE TOPBAR — CORPORATE PREMIUM  ██ */
        /* ═══════════════════════════════════════════════════ */

        .premium-topbar {
          width: 100%;
          overflow: hidden;
          position: relative;
          z-index: 1000;
          font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
        }

        /* ═══════════════════════════════════ */
        /* ██  MAIN SPLIT ROW               ██ */
        /* ═══════════════════════════════════ */
        .tb-split-row {
          display: flex;
          align-items: stretch;
          width: 100%;
          min-height: 38px;
        }

        /* ── LEFT PANEL: Dark Navy ── */
        .tb-panel-left {
          background: #060e1c;
          display: flex;
          align-items: center;
          padding: 0 clamp(14px, 2vw, 28px);
          gap: clamp(8px, 1.5vw, 22px);
          flex: 1;
          position: relative;
          overflow: hidden;
        }
        /* Subtle grain texture overlay */
        .tb-panel-left::before {
          content: '';
          position: absolute; inset: 0;
          background: 
            radial-gradient(ellipse at 20% 50%, rgba(15,35,71,0.5) 0%, transparent 70%),
            radial-gradient(ellipse at 80% 50%, rgba(30,58,138,0.2) 0%, transparent 60%);
          pointer-events: none;
        }

        /* ── RIGHT PANEL: Golden Gradient ── */
        .tb-panel-right {
          background: linear-gradient(135deg, #f4a023 0%, #d97706 50%, #b45309 100%);
          display: flex;
          align-items: center;
          padding: 0 clamp(12px, 1.8vw, 24px);
          gap: clamp(8px, 1.2vw, 16px);
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        /* Diagonal join — angled edge between panels */
        .tb-panel-right::before {
          content: '';
          position: absolute;
          left: -20px; top: 0; bottom: 0;
          width: 40px;
          background: linear-gradient(135deg, #f4a023 0%, #d97706 50%, #b45309 100%);
          transform: skewX(-12deg);
          z-index: 1;
        }
        /* Shine sweep */
        .tb-panel-right::after {
          content: '';
          position: absolute;
          top: 0; left: -100px;
          width: 60px; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          animation: rightPanelSweep 6s infinite ease-in-out;
          pointer-events: none;
          z-index: 2;
        }
        @keyframes rightPanelSweep {
          0%   { left: -100px; }
          30%  { left: 110%; }
          100% { left: 110%; }
        }

        /* ═══════════════════════════════════ */
        /* ██  LEFT: CONTACT LINKS           ██ */
        /* ═══════════════════════════════════ */
        .tb-contact {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: rgba(255,255,255,0.85);
          font-size: clamp(10.5px, 0.85vw, 12.5px);
          font-weight: 600;
          white-space: nowrap;
          transition: all 0.25s ease;
          padding: 3px 0;
          position: relative;
          z-index: 2;
        }
        .tb-contact:hover { color: #fbbf24; }
        .tb-contact-icon {
          font-size: 12px;
          color: #f4a023;
          filter: drop-shadow(0 0 4px rgba(244,160,35,0.4));
        }
        .tb-contact-sep {
          width: 1px;
          height: 14px;
          background: rgba(255,255,255,0.15);
          margin: 0 4px;
          flex-shrink: 0;
        }

        @media(max-width: 640px) { .tb-email-link { display: none; } .tb-email-sep { display: none; } }

        /* ── Left: Social Icons (compact) ── */
        .tb-left-socials {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-left: auto;
          position: relative;
          z-index: 2;
        }
        .tb-soc {
          width: 26px; height: 26px;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          font-size: 11px;
          color: rgba(255,255,255,0.6);
          border-radius: 6px;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid transparent;
          position: relative;
          overflow: hidden;
        }
        .tb-soc::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        .tb-soc:hover {
          color: #fff;
          transform: translateY(-2px) scale(1.1);
          border-color: rgba(255,255,255,0.15);
        }
        .tb-soc:hover::before { opacity: 1; }
        .tb-soc.fb:hover::before { background: #1877F2; }
        .tb-soc.x:hover::before  { background: #333; }
        .tb-soc.li:hover::before { background: #0A66C2; }
        .tb-soc.yt:hover::before { background: #FF0000; }
        .tb-soc.wa:hover::before { background: #25D366; }
        .tb-soc.fb:hover { box-shadow: 0 4px 12px rgba(24,119,242,0.35); }
        .tb-soc.x:hover  { box-shadow: 0 4px 12px rgba(0,0,0,0.35); }
        .tb-soc.li:hover { box-shadow: 0 4px 12px rgba(10,102,194,0.35); }
        .tb-soc.yt:hover { box-shadow: 0 4px 12px rgba(255,0,0,0.3); }
        .tb-soc.wa:hover { box-shadow: 0 4px 12px rgba(37,211,102,0.35); }

        @media(max-width: 480px) {
          .tb-left-socials { display: none; }
        }

        /* ═══════════════════════════════════ */
        /* ██  RIGHT: HUD BUTTONS + TOGGLE  ██ */
        /* ═══════════════════════════════════ */
        .tb-hud-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 10px;
          font-size: 8.5px;
          font-weight: 900;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          text-decoration: none;
          color: #060e1c;
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 6px;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          white-space: nowrap;
          position: relative;
          z-index: 3;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .tb-hud-btn:hover {
          background: rgba(0,0,0,0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border-color: rgba(0,0,0,0.25);
        }
        /* Accent "featured" button — inverted style */
        .tb-hud-btn.featured {
          background: #060e1c;
          color: #fbbf24;
          border-color: rgba(244,160,35,0.3);
        }
        .tb-hud-btn.featured:hover {
          background: #0f2347;
          color: #fff;
          box-shadow: 0 4px 14px rgba(6,14,28,0.35);
        }

        @media(max-width: 1024px) {
          .tb-hud-btn { display: none; }
        }

        /* Dark toggle on gold bg */
        .tb-dark-toggle {
          width: 30px; height: 30px;
          background: rgba(0,0,0,0.12);
          border: 1.5px solid rgba(0,0,0,0.15);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #060e1c;
          font-size: 14px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 3;
        }
        .tb-dark-toggle:hover {
          background: rgba(0,0,0,0.22);
          transform: scale(1.1) rotate(15deg);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        /* ═══════════════════════════════════ */
        /* ██  DIVINE QUOTE RIBBON           ██ */
        /* ═══════════════════════════════════ */
        @keyframes gurmukhiGlow {
          0%, 100% { text-shadow: 0 0 6px rgba(251,211,141,0.25); }
          50%      { text-shadow: 0 0 14px rgba(251,211,141,0.55), 0 0 24px rgba(244,160,35,0.15); }
        }

        .tb-divine-row {
          background: linear-gradient(90deg, #060e1c 0%, #0a1832 50%, #060e1c 100%);
          border-top: 1px solid rgba(244,160,35,0.15);
          border-bottom: 1px solid rgba(244,160,35,0.1);
          padding: 3px clamp(14px, 2vw, 28px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          min-height: 26px;
          position: relative;
          overflow: hidden;
        }
        /* Subtle center gold accent line */
        .tb-divine-row::before {
          content: '';
          position: absolute;
          top: 0; left: 15%; right: 15%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(244,160,35,0.35), transparent);
        }

        .tb-divine-content {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .tb-divine-content.fading {
          opacity: 0;
          transform: translateY(3px);
        }

        .tb-quote-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(244,160,35,0.12);
          border: 1px solid rgba(244,160,35,0.3);
          color: #f4a023;
          padding: 1px 8px;
          border-radius: 20px;
          font-weight: 800;
          font-size: 9.5px;
          letter-spacing: 0.3px;
          flex-shrink: 0;
        }
        .tb-gurmukhi {
          font-weight: 700;
          color: #fbd38d;
          font-family: serif, 'Plus Jakarta Sans';
          font-size: clamp(11px, 0.85vw, 12.5px);
          animation: gurmukhiGlow 4s ease-in-out infinite;
        }
        .tb-eng-text {
          color: rgba(255,255,255,0.7);
          font-style: italic;
          font-size: clamp(10.5px, 0.8vw, 12px);
        }
        .tb-author {
          color: #64748b;
          font-size: 10px;
          flex-shrink: 0;
        }

        .tb-divine-actions {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .tb-heritage-link {
          color: #f4a023;
          text-decoration: none;
          font-weight: 800;
          font-size: 10.5px;
          display: inline-flex;
          align-items: center;
          gap: 3px;
          padding: 2px 7px;
          border-radius: 4px;
          border: 1px solid rgba(244,160,35,0.2);
          transition: all 0.25s ease;
        }
        .tb-heritage-link:hover {
          color: #fff;
          background: rgba(244,160,35,0.15);
          border-color: rgba(244,160,35,0.4);
          transform: translateX(2px);
        }
        .tb-quote-nav {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          color: #64748b;
          cursor: pointer;
          font-size: 12px;
          padding: 1px 6px;
          border-radius: 4px;
          line-height: 1;
          transition: all 0.2s ease;
        }
        .tb-quote-nav:hover {
          color: #f4a023;
          border-color: rgba(244,160,35,0.3);
          background: rgba(244,160,35,0.08);
        }

        /* ═══════════════════════════════════ */
        /* ██  RESPONSIVE                   ██ */
        /* ═══════════════════════════════════ */
        @media(max-width: 768px) {
          .tb-split-row { flex-direction: column; }
          .tb-panel-left {
            padding: 6px 15px;
            justify-content: center;
          }
          .tb-panel-right {
            padding: 5px 15px;
            justify-content: center;
          }
          .tb-panel-right::before { display: none; }
          .tb-eng-text { display: none; }
          .tb-author { display: none; }
          .tb-divine-row { padding: 3px 12px; }
        }

        @media(max-width: 480px) {
          .tb-hud-btn { display: none; }
          .tb-panel-right { gap: 6px; padding: 4px 12px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .tb-panel-right::after { animation: none !important; }
          .tb-gurmukhi { animation: none !important; }
        }
      `}</style>

      {/* ══════ MAIN SPLIT ROW ══════ */}
      <div className="tb-split-row">

        {/* ── LEFT: Dark Navy — Contact + Socials ── */}
        <div className="tb-panel-left">
          <a href="tel:+917903340991" className="tb-contact">
            <span className="tb-contact-icon">📞</span>
            <span>+91-7903340991</span>
          </a>
          <span className="tb-contact-sep tb-email-sep"></span>
          <a href="mailto:principal@gncollege.org" className="tb-contact tb-email-link">
            <span className="tb-contact-icon">✉️</span>
            <span>principal@gncollege.org</span>
          </a>

          {/* Social Icons */}
          <div className="tb-left-socials">
            {SOCIAL_LINKS.map(s => {
              let icon = (s.id === 'twitter' ? '𝕏' : (s.id === 'youtube' ? '▶' : s.label));
              let cls = (s.id === 'twitter' ? 'x' : (s.id === 'youtube' ? 'yt' : (s.id === 'facebook' ? 'fb' : (s.id === 'linkedin' ? 'li' : ''))));
              return (
                <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer"
                   className={`tb-soc ${cls}`} aria-label={s.id}>
                  <span style={{ position: 'relative', zIndex: 2 }}>{icon}</span>
                </a>
              );
            })}
            <a href={whatsappLink.href} target="_blank" rel="noopener noreferrer" className="tb-soc wa" aria-label="whatsapp">
              <span style={{ position: 'relative', zIndex: 2 }}>W</span>
            </a>
          </div>
        </div>

        {/* ── RIGHT: Golden Gradient — HUD Buttons + Dark Toggle ── */}
        <div className="tb-panel-right">
          <a href="https://bbmkuniv.in/login" target="_blank" rel="noopener noreferrer" className="tb-hud-btn">
            📊 Result
          </a>
          <a href="https://cimsstudentnewui.mastersofterp.in/" target="_blank" rel="noopener noreferrer" className="tb-hud-btn">
            💳 Fee Pay
          </a>
          <a href="https://universities.jharkhand.gov.in/" target="_blank" rel="noopener noreferrer" className="tb-hud-btn featured">
            🎓 Admission
          </a>

          {onToggleDark && (
            <button onClick={onToggleDark} className="tb-dark-toggle" title="Toggle Surface Mode" aria-label="Toggle dark mode">
              {isDark ? '☀️' : '🌙'}
            </button>
          )}
        </div>
      </div>

      {/* ══════ DIVINE WISDOM RIBBON ══════ */}
      <div className="tb-divine-row">
        <div className={`tb-divine-content${quoteFading ? ' fading' : ''}`}>
          <span className="tb-quote-badge">☬ ਗੁਰਬਾਣੀ</span>
          <span className="tb-gurmukhi">{currentQuote.gurmukhi}</span>
          <span className="tb-eng-text">— "{currentQuote.english}"</span>
          <span className="tb-author">({currentQuote.author})</span>
        </div>

        <div className="tb-divine-actions">
          <Link to="/about-us/sikh-heritage" className="tb-heritage-link" title="Sikh Heritage & Minority Status">
            ਸਿੱਖ ਵਿਰਾਸਤ →
          </Link>
          <button onClick={() => changeQuote(-1)} className="tb-quote-nav" title="Previous Quote" aria-label="Previous quote">‹</button>
          <button onClick={() => changeQuote(1)} className="tb-quote-nav" title="Next Quote" aria-label="Next quote">›</button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;