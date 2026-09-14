import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from '../../data/db';
import LanguageToggle from '../LanguageToggle';

// ☬ SACRED SIKH INSPIRATIONS & GURU NANAK DEV JI'S TEACHINGS
const SIKH_DIVINE_QUOTES = [
  {
    badge: "☬ ਕਾਲਜ ਆਦਰਸ਼",
    gurmukhi: "ਵਿਦਿਆ ਵੀਚਾਰੀ ਤਾਂ ਪਰਉਪਕਾਰੀ ॥",
    english: "Contemplate and reflect upon true knowledge, and become a benefactor to humanity.",
    author: "College Motto • Sri Guru Granth Sahib Ji (Ang 356)"
  },
  {
    badge: "☬ ਮੂਲ ਮੰਤਰ",
    gurmukhi: "ੴ ਸਤਿਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥",
    english: "One Universal Creator God, Truth is the Name, Creative Being Personified, Without Fear, Without Hatred, Timeless Form, Beyond Birth, Self-Existent, By Guru's Grace.",
    author: "Mool Mantar • Sri Guru Nanak Dev Ji"
  },
  {
    badge: "☬ ਤਿੰਨ ਸੁਨਹਿਰੀ ਅਸੂਲ",
    gurmukhi: "ਨਾਮ ਜਪੋ • ਕਿਰਤ ਕਰੋ • ਵੰਡ ਛਕੋ",
    english: "Meditate on the Divine Name • Earn through honest labor • Selflessly share with society.",
    author: "Three Pillars of Sikh Philosophy • Guru Nanak Dev Ji"
  },
  {
    badge: "☬ ਸਰਬੱਤ ਦਾ ਭਲਾ",
    gurmukhi: "ਨਾਨਕ ਨਾਮ ਚੜ੍ਹਦੀ ਕਲਾ ॥ ਤੇਰੇ ਭਾਣੇ ਸਰਬੱਤ ਦਾ ਭਲਾ ॥",
    english: "O Nanak, may the Divine Name remain in high spirits; by Thy Will, may peace and prosperity bless all mankind.",
    author: "Sikh Ardaas (Universal Supplication)"
  },
  {
    badge: "☬ ਸੱਚਾ ਆਚਾਰ",
    gurmukhi: "ਸਚਹੁ ਓਰੈ ਸਭੁ ਕੋ ਉਪਰਿ ਸਚੁ ਆਚਾਰੁ ॥",
    english: "Truth is the highest virtue, but higher still is truthful living.",
    author: "Sri Guru Nanak Dev Ji • Ang 62"
  },
  {
    badge: "☬ ਸ਼ੁਭ ਕਰਮਨ",
    gurmukhi: "ਦੇਹ ਸਿਵਾ ਬਰੁ ਮੋਹਿ ਇਹੈ ਸੁਭ ਕਰਮਨ ਤੇ ਕਬਹੂੰ ਨ ਟਰੋਂ ॥",
    english: "Grant me this boon, O Lord, that I may never waver from performing righteous deeds.",
    author: "Sri Guru Gobind Singh Ji • Dasam Granth"
  },
  {
    badge: "☬ ਜਪੁਜੀ ਸਾਹਿਬ",
    gurmukhi: "ਮਨਿ ਜੀਤੈ ਜਗੁ ਜੀਤੁ ॥",
    english: "Conquering one's mind is conquering the entire world.",
    author: "Sri Guru Nanak Dev Ji • Japji Sahib (Pauri 28)"
  }
];

const TopBar = ({ isDark, onToggleDark, onSearchOpen, siteSettings }) => {
  const whatsappLink = { id: 'whatsapp', label: 'W', href: 'https://wa.me/917903340991' };
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteFading, setQuoteFading] = useState(false);
  const [liveSettings, setLiveSettings] = useState(() => {
    try {
      const c = localStorage.getItem('gnc_site_settings_cache');
      return c ? JSON.parse(c) : null;
    } catch { return null; }
  });

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e?.detail) {
        setLiveSettings(prev => ({ ...(prev || {}), ...e.detail }));
      }
    };
    window.addEventListener('gnc_settings_updated', handleUpdate);
    return () => window.removeEventListener('gnc_settings_updated', handleUpdate);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteFading(true);
      setTimeout(() => {
        setQuoteIndex(prev => (prev + 1) % SIKH_DIVINE_QUOTES.length);
        setQuoteFading(false);
      }, 350);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const changeQuote = (dir) => {
    setQuoteFading(true);
    setTimeout(() => {
      setQuoteIndex(prev => (prev + dir + SIKH_DIVINE_QUOTES.length) % SIKH_DIVINE_QUOTES.length);
      setQuoteFading(false);
    }, 200);
  };

  const currentQuote = SIKH_DIVINE_QUOTES[quoteIndex];

  return (
    <div className={`premium-topbar ${isDark ? 'is-dark' : ''}`}>
      <style>{`
        /* ══════════════════════════════════════════════════════════ */
        /* ██  PREMIUM CORPORATE TOPBAR WITH GURMUKHI HERITAGE RIBBON ██ */
        /* ══════════════════════════════════════════════════════════ */

        .premium-topbar {
          width: 100%;
          max-width: 100vw;
          overflow-x: clip;
          position: relative;
          z-index: 1000;
          font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          border-top: 2.5px solid #e89222;
          background: #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
          transition: background 0.25s ease, border-color 0.25s ease;
          box-sizing: border-box;
        }

        .premium-topbar.is-dark {
          background: #091322;
          border-top-color: #f59e0b;
          box-shadow: 0 1px 5px rgba(0,0,0,0.25);
        }

        /* Explicitly prevent global CSS button / link 44px min-size bloat */
        .premium-topbar a,
        .premium-topbar button {
          min-width: unset !important;
          min-height: unset !important;
          box-sizing: border-box;
        }

        /* ── MAIN HORIZONTAL ROW ── */
        .tb-main-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2.5px clamp(8px, 2vw, 36px);
          min-height: 29px;
          border-bottom: 1.5px solid #2b3a67;
          gap: 8px;
          max-width: 100vw;
          box-sizing: border-box;
        }

        .premium-topbar.is-dark .tb-main-row {
          border-bottom-color: #1e3a8a;
        }

        /* ── LEFT: CONTACT DETAILS ── */
        .tb-contact-group {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.5vw, 18px);
          flex-shrink: 0;
        }

        .tb-contact-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          text-decoration: none;
          color: #475569;
          font-size: clamp(10.5px, 0.8vw, 11.5px);
          font-weight: 600;
          letter-spacing: 0.1px;
          white-space: nowrap;
          padding: 2px 4px;
          border-radius: 4px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-topbar.is-dark .tb-contact-link {
          color: #94a3b8;
        }

        .tb-contact-link:hover {
          color: #e89222;
          background: rgba(232,146,34,0.08);
        }

        .premium-topbar.is-dark .tb-contact-link:hover {
          color: #fbbf24;
          background: rgba(251,191,36,0.1);
        }

        .tb-icon-glyph {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          transition: color 0.2s ease;
          flex-shrink: 0;
        }

        .tb-contact-link:hover .tb-icon-glyph {
          color: #e89222;
        }

        .premium-topbar.is-dark .tb-icon-glyph {
          color: #94a3b8;
        }

        .premium-topbar.is-dark .tb-contact-link:hover .tb-icon-glyph {
          color: #fbbf24;
        }

        .tb-contact-label {
          font-weight: 700;
          color: #334155;
          font-size: 11px;
        }

        .premium-topbar.is-dark .tb-contact-label {
          color: #e2e8f0;
        }

        .tb-contact-val {
          color: #475569;
        }

        .premium-topbar.is-dark .tb-contact-val {
          color: #cbd5e1;
        }

        .tb-contact-divider {
          width: 1px;
          height: 11px;
          background: #e2e8f0;
          flex-shrink: 0;
        }

        .premium-topbar.is-dark .tb-contact-divider {
          background: #334155;
        }

        /* ── RIGHT: SOCIALS + QUICK ACTIONS ── */
        .tb-right-group {
          display: flex;
          align-items: center;
          gap: clamp(5px, 1vw, 12px);
          margin-left: auto;
          flex-shrink: 0;
        }

        /* ── CIRCULAR SOCIAL ICONS: COMPACT 22PX DISC ── */
        .tb-social-list {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .tb-social-disc {
          width: 22px !important;
          height: 22px !important;
          min-width: 22px !important;
          min-height: 22px !important;
          max-width: 22px !important;
          max-height: 22px !important;
          border-radius: 50%;
          background: #b0b7c3;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 1px 2px rgba(0,0,0,0.08);
          position: relative;
          flex-shrink: 0;
          padding: 0;
          line-height: 1;
        }

        .premium-topbar.is-dark .tb-social-disc {
          background: #475569;
        }

        .tb-social-disc:hover {
          transform: translateY(-1px) scale(1.1);
          box-shadow: 0 2px 6px rgba(0,0,0,0.22);
        }

        .tb-social-disc:active {
          transform: scale(0.94);
        }

        .tb-social-disc.fb:hover { background: #1877F2 !important; }
        .tb-social-disc.x:hover  { background: #000000 !important; }
        .tb-social-disc.yt:hover { background: #FF0000 !important; }
        .tb-social-disc.li:hover { background: #0A66C2 !important; }
        .tb-social-disc.wa:hover { background: #25D366 !important; }

        /* ── HUD QUICK LINKS (DESKTOP PILLS) ── */
        .tb-hud-list {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .tb-hud-item {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          height: 20px;
          padding: 0 7px;
          font-size: 8.5px;
          font-weight: 800;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          text-decoration: none;
          color: #334155;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 99px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          box-shadow: 0 1px 2px rgba(0,0,0,0.03);
        }

        .premium-topbar.is-dark .tb-hud-item {
          background: #1e293b;
          border-color: #334155;
          color: #e2e8f0;
        }

        .tb-hud-item:hover {
          background: #0f2347;
          color: #ffffff;
          border-color: #0f2347;
          transform: translateY(-1px);
          box-shadow: 0 2px 6px rgba(15,35,71,0.18);
        }

        .tb-hud-item.featured {
          background: #0f2347;
          color: #fbbf24;
          border-color: #0f2347;
          box-shadow: 0 1px 4px rgba(15,35,71,0.25);
        }

        .tb-hud-item.featured:hover {
          background: #e89222;
          color: #ffffff;
          border-color: #e89222;
        }

        /* ── COMPACT DARK MODE TOGGLE ── */
        .tb-dark-btn {
          position: relative;
          width: 24px !important;
          height: 24px !important;
          min-width: 24px !important;
          min-height: 24px !important;
          max-width: 24px !important;
          max-height: 24px !important;
          border-radius: 50%;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 12px;
          color: #475569;
          transition: all 0.2s ease;
          padding: 0;
          flex-shrink: 0;
          line-height: 1;
        }

        .tb-dark-btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 44px;
          height: 44px;
          min-width: 44px;
          min-height: 44px;
        }

        .premium-topbar.is-dark .tb-dark-btn {
          background: #1e293b;
          border-color: #334155;
          color: #fbbf24;
        }

        .tb-dark-btn:hover {
          background: #e2e8f0;
          transform: rotate(18deg) scale(1.08);
        }

        .premium-topbar.is-dark .tb-dark-btn:hover {
          background: #334155;
        }

        /* ══════════════════════════════════════════════════ */
        /* ██  AUTHENTIC GURMUKHI DIVINE WISDOM RIBBON      ██ */
        /* ══════════════════════════════════════════════════ */
        .tb-divine-row {
          background: #070e1a;
          border-bottom: 1px solid rgba(244,160,35,0.22);
          padding: 2.5px clamp(8px, 2vw, 36px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          min-height: 26px;
          box-sizing: border-box;
          max-width: 100vw;
          overflow: hidden;
        }

        .tb-divine-content {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
          min-width: 0;
          transition: opacity 0.25s ease;
        }

        .tb-divine-content.fading {
          opacity: 0;
        }

        .tb-quote-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          background: rgba(244,160,35,0.16);
          border: 1px solid rgba(244,160,35,0.38);
          color: #f4a023;
          padding: 0 6px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 8.5px;
          flex-shrink: 0;
          height: 17px;
          line-height: 17px;
          font-family: 'Noto Sans Gurmukhi', 'Plus Jakarta Sans', sans-serif;
          letter-spacing: 0.2px;
        }

        /* Gurmukhi Typography: Native Gurmukhi font, radiant gold, sharp rendering */
        .tb-gurmukhi {
          font-family: 'Noto Sans Gurmukhi', 'Mukta Mahee', 'Gurmukhi MN', 'Raavi', system-ui, -apple-system, sans-serif;
          font-weight: 700;
          color: #fbd38d;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: 0.3px;
          line-height: 1.45;
          text-shadow: 0 0 10px rgba(244,160,35,0.25);
          min-width: 0;
        }

        .tb-eng-text {
          color: rgba(255,255,255,0.7);
          font-size: 10px;
          font-style: italic;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }

        .tb-author {
          color: rgba(244,160,35,0.8);
          font-size: 9.5px;
          font-weight: 700;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .tb-divine-actions {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        .tb-heritage-link {
          color: #f4a023;
          text-decoration: none;
          font-size: 9.5px;
          font-weight: 700;
          padding: 0 6px;
          height: 18px;
          line-height: 18px;
          border-radius: 4px;
          border: 1px solid rgba(244,160,35,0.3);
          background: rgba(244,160,35,0.06);
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 2px;
          white-space: nowrap;
          font-family: 'Noto Sans Gurmukhi', 'Plus Jakarta Sans', sans-serif;
        }

        .tb-heritage-link:hover {
          color: #ffffff;
          background: rgba(244,160,35,0.25);
          border-color: #f4a023;
        }

        .tb-heritage-text-mobile {
          display: none;
        }

        .tb-heritage-text-desktop {
          display: inline;
        }

        .tb-quote-nav {
          position: relative;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          color: #94a3b8;
          cursor: pointer;
          font-size: 12px;
          width: 20px !important;
          height: 20px !important;
          min-width: 20px !important;
          min-height: 20px !important;
          border-radius: 3px;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: all 0.2s ease;
        }

        .tb-quote-nav::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 44px;
          height: 44px;
          min-width: 44px;
          min-height: 44px;
        }

        .tb-quote-nav:hover {
          color: #f4a023;
          border-color: rgba(244,160,35,0.5);
          background: rgba(255,255,255,0.06);
        }

        /* ══════════════════════════════════════════════════ */
        /* ██  RESPONSIVE BREAKPOINTS (FLAWLESS ON ALL SIZES)██ */
        /* ══════════════════════════════════════════════════ */
        @media(max-width: 1024px) {
          .tb-hud-list { display: none; }
          .tb-eng-text { display: none; }
        }

        @media(max-width: 768px) {
          .tb-author { display: none; }
          .tb-email-item { display: none; }
          .tb-contact-divider { display: none; }
        }

        @media(max-width: 640px) {
          .tb-main-row {
            padding: 2.5px 8px;
            min-height: 27px;
          }
          .tb-contact-label {
            display: none; /* Saves 40px width on mobile */
          }
          .tb-contact-link {
            font-size: 11px;
            padding: 1px 2px;
          }
          .tb-divine-row {
            padding: 2px 6px;
            min-height: 24px;
            gap: 5px;
          }
          .tb-gurmukhi {
            font-size: 11px;
          }
          .tb-heritage-text-desktop {
            display: none;
          }
          .tb-heritage-text-mobile {
            display: inline;
          }
          .tb-heritage-link {
            font-size: 9px;
            padding: 0 4px;
            height: 17px;
            line-height: 17px;
          }
        }

        @media(max-width: 380px) {
          .tb-social-disc.li {
            display: none; /* Hide 1 social icon on narrowest screens (< 380px) */
          }
          .tb-social-list {
            gap: 3px;
          }
          .tb-contact-val {
            font-size: 10.5px;
          }
          .tb-quote-badge {
            font-size: 8px;
            padding: 0 4px;
          }
        }
      `}</style>

      {/* ══════ MAIN TOPBAR ROW (ULTRA-SLIM, COMPACT & CLEAN) ══════ */}
      <div className="tb-main-row">

        {/* ── LEFT: Contact Links (Phone & Email with Clean Icons & Labels) ── */}
        <div className="tb-contact-group">
          <a href="tel:+917903340991" className="tb-contact-link" title="Call Guru Nanak College">
            <span className="tb-icon-glyph" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.48.69a1 1 0 011 1v3.5a1 1 0 01-1 1C10.29 22 2 13.71 2 3.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.15.24 2.36.69 3.48a1 1 0 01-.27 1.11l-2.3 2.2z"/>
              </svg>
            </span>
            <span className="tb-contact-label">Phone:</span>
            <span className="tb-contact-val">+91-7903340991</span>
          </a>

          <span className="tb-contact-divider tb-email-item"></span>

          <a href="mailto:principal@gncollege.org" className="tb-contact-link tb-email-item" title="Email Principal">
            <span className="tb-icon-glyph" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </span>
            <span className="tb-contact-label">Email:</span>
            <span className="tb-contact-val">principal@gncollege.org</span>
          </a>
        </div>

        {/* ── RIGHT: Social Media Discs + Quick HUD Actions ── */}
        <div className="tb-right-group">

          {/* Circular Grey Social Media Icons (Compact 22px, Bold Crisp Glyphs) */}
          <div className="tb-social-list" aria-label="Social links">
            {SOCIAL_LINKS.map(s => {
              let cls = (s.id === 'twitter' ? 'x' : (s.id === 'youtube' ? 'yt' : (s.id === 'facebook' ? 'fb' : (s.id === 'linkedin' ? 'li' : ''))));
              return (
                <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer"
                   className={`tb-social-disc ${cls}`} aria-label={s.id} title={s.id}>
                  {s.id === 'facebook' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translate(0.5px, 0.5px)' }}>
                      <path d="M13.5 24V13.07H17.2L17.75 8.78H13.5V6.04C13.5 4.8 13.84 3.96 15.62 3.96H17.91V0.12C17.51 0.07 16.14 0 14.54 0C11.21 0 8.93 2.03 8.93 5.75V8.78H5.2V13.07H8.93V24H13.5Z"/>
                    </svg>
                  )}
                  {s.id === 'twitter' && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )}
                  {s.id === 'youtube' && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  )}
                  {s.id === 'linkedin' && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                    </svg>
                  )}
                </a>
              );
            })}
            <a href={whatsappLink.href} target="_blank" rel="noopener noreferrer"
               className="tb-social-disc wa" aria-label="whatsapp" title="WhatsApp">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.49 1.34 5l-1.42 5.18 5.3-1.39c1.47.8 3.12 1.22 4.78 1.22 5.52 0 10-4.48 10-10s-4.48-10-10-10zm5.83 14.15c-.24.68-1.41 1.33-1.95 1.41-.5.07-1.14.1-3.29-.78-2.75-1.13-4.52-3.92-4.66-4.1-.14-.19-1.12-1.49-1.12-2.84 0-1.36.71-2.03.96-2.31.25-.28.55-.35.73-.35.19 0 .37 0 .53.01.17.01.4.06.61.56.22.52.75 1.83.82 1.96.07.14.12.3.02.49-.09.2-.14.32-.28.49-.14.17-.3.38-.43.51-.14.15-.29.31-.12.6.17.29.74 1.22 1.6 1.98 1.1 1 2.03 1.31 2.32 1.45.29.14.46.12.63-.07.17-.19.74-.86.94-1.16.2-.29.4-.24.67-.14.28.1 1.76.83 2.06.98.3.15.5.23.57.36.07.12.07.72-.17 1.4z"/>
              </svg>
            </a>
          </div>

          {/* Quick HUD Buttons (Ultra-Slim Pill Badges - Desktop) */}
          <div className="tb-hud-list">
            <a href="https://bbmkuniv.in/login" target="_blank" rel="noopener noreferrer" className="tb-hud-item">
              📊 Result
            </a>
            <a href="https://cimsstudentnewui.mastersofterp.in/" target="_blank" rel="noopener noreferrer" className="tb-hud-item">
              💳 Fee Pay
            </a>
            <a href="https://universities.jharkhand.gov.in/" target="_blank" rel="noopener noreferrer" className="tb-hud-item featured">
              🎓 Admission
            </a>
          </div>

          {/* Bilingual Language Switcher */}
          {(() => {
            if (liveSettings && typeof liveSettings.enableLanguageToggle === 'boolean') {
              return liveSettings.enableLanguageToggle;
            }
            if (siteSettings && typeof siteSettings.enableLanguageToggle === 'boolean') {
              return siteSettings.enableLanguageToggle;
            }
            try {
              const c = localStorage.getItem('gnc_site_settings_cache');
              if (c) {
                const parsed = JSON.parse(c);
                if (typeof parsed.enableLanguageToggle === 'boolean') return parsed.enableLanguageToggle;
              }
            } catch {}
            return true;
          })() && <LanguageToggle />}

          {/* Dark / Light Mode Toggle Button */}
          {onToggleDark && (
            <button onClick={onToggleDark} className="tb-dark-btn" title="Toggle Light / Dark Mode" aria-label="Toggle surface theme">
              {isDark ? '☀️' : '🌙'}
            </button>
          )}

        </div>
      </div>

      {/* ══════ AUTHENTIC GURMUKHI DIVINE WISDOM RIBBON ══════ */}
      <div className="tb-divine-row">
        <div className={`tb-divine-content${quoteFading ? ' fading' : ''}`}>
          <span className="tb-quote-badge">{currentQuote.badge}</span>
          <span className="tb-gurmukhi" title={currentQuote.gurmukhi}>{currentQuote.gurmukhi}</span>
          <span className="tb-eng-text">— "{currentQuote.english}"</span>
          <span className="tb-author">({currentQuote.author})</span>
        </div>

        <div className="tb-divine-actions">
          <Link to="/about-us/sikh-heritage" className="tb-heritage-link" title="Sikh Heritage & Minority Status">
            <span className="tb-heritage-text-desktop">ਸਿੱਖ ਵਿਰਾਸਤ →</span>
            <span className="tb-heritage-text-mobile">ਵਿਰਾਸਤ ›</span>
          </Link>
          <button onClick={() => changeQuote(-1)} className="tb-quote-nav" title="Previous Quote" aria-label="Previous quote">‹</button>
          <button onClick={() => changeQuote(1)} className="tb-quote-nav" title="Next Quote" aria-label="Next quote">›</button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;