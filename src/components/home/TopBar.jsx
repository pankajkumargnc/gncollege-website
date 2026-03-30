// src/components/home/TopBar.jsx
// 🚀 COMPACT ULTRA PRO MAX EDITION - Liquid Fill & Floating Wave
import React from "react";
import { COLORS } from '../../styles/colors';
import { SOCIAL_LINKS } from '../../data/db';

const TopBar = ({ isDark, onToggleDark, onSearchOpen }) => {
  const whatsappLink = { id: 'whatsapp', label: 'W', href: 'https://wa.me/917903340991' };

  return (
    <div style={{
      background: `linear-gradient(to right, #060e1c, #0a1832, #060e1c)`,
      color: '#e2e8f0',
      borderBottom: `1px solid rgba(244,160,35,0.15)`,
      width: '100%',
      maxWidth: '100vw',
      overflow: 'hidden',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 100
    }}>
      <style>{`
        .tb-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px clamp(12px, 2vw, 20px);
          gap: 8px;
          min-width: 0;
          max-width: 100%;
          flex-wrap: nowrap;
        }

        /* ── Left Contact Info ── */
        .tb-left {
          display: flex;
          align-items: center;
          gap: clamp(10px, 2vw, 24px);
          flex-shrink: 1;
          min-width: 0;
          overflow: hidden;
        }
        .tb-link {
          display: flex; align-items: center; gap: 6px;
          text-decoration: none; color: #cbd5e1;
          font-size: clamp(11px, 1.1vw, 13px);
          font-weight: 600; white-space: nowrap;
          transition: color .3s, transform .3s;
          min-width: 0;
        }
        .tb-link:hover { color: #f4a023; transform: translateX(2px); }
        .tb-email { display: flex; }
        @media(max-width: 520px) { .tb-email { display: none; } }

        /* ── Right Section ── */
        .tb-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        /* ── Quick Link Buttons ── */
        .tb-qlinks { display: flex; align-items: center; gap: 6px; }
        .tb-qbtn {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;
          padding: 4px 10px; border-radius: 6px;
          text-decoration: none; white-space: nowrap;
          border: 1px solid; flex-shrink: 0;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          position: relative; overflow: hidden; z-index: 1;
        }
        
        .tb-qbtn::before {
          content: ''; position: absolute; inset: 0;
          z-index: -1; transform: scaleX(0); transform-origin: right;
          transition: transform 0.3s ease-in-out;
        }
        .tb-qbtn:hover::before { transform: scaleX(1); transform-origin: left; }

        .tb-res { border-color: rgba(244,160,35,0.3); color: #f4a023; }
        .tb-res::before { background: #f4a023; }
        .tb-res:hover { color: #0f2347; border-color: #f4a023; box-shadow: 0 0 10px rgba(244,160,35,0.3); }

        .tb-fee { border-color: rgba(16,185,129,0.3); color: #10b981; }
        .tb-fee::before { background: #10b981; }
        .tb-fee:hover { color: #fff; border-color: #10b981; box-shadow: 0 0 10px rgba(16,185,129,0.3); }

        .tb-adm { border-color: rgba(99,102,241,0.3); color: #818cf8; }
        .tb-adm::before { background: #6366f1; }
        .tb-adm:hover { color: #fff; border-color: #6366f1; box-shadow: 0 0 10px rgba(99,102,241,0.3); }

        @media(max-width: 900px) { .tb-adm   { display: none; } }
        @media(max-width: 720px) { .tb-fee   { display: none; } }
        @media(max-width: 580px) { .tb-qlinks { display: none; } }

        /* Divider */
        .tb-div { width: 1px; height: 18px; background: rgba(255,255,255,0.1); flex-shrink: 0; }
        @media(max-width: 580px) { .tb-div { display: none; } }

        /* 🚀 FLOATING WAVE & LIQUID FILL ICONS */
        @keyframes tbFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .tb-soc-wrap { display: flex; gap: 6px; align-items: center; }

        .tb-soc {
          position: relative; overflow: hidden; z-index: 1;
          width: clamp(24px, 2.8vw, 28px);
          height: clamp(24px, 2.8vw, 28px);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: #cbd5e1;
          text-decoration: none; flex-shrink: 0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation: tbFloat 3s ease-in-out infinite;
        }

        /* Staggered Delay for Wave Effect */
        .tb-soc-wrap a:nth-child(1) { animation-delay: 0s; }
        .tb-soc-wrap a:nth-child(2) { animation-delay: 0.15s; }
        .tb-soc-wrap a:nth-child(3) { animation-delay: 0.3s; }
        .tb-soc-wrap a:nth-child(4) { animation-delay: 0.45s; }
        .tb-soc-wrap a:nth-child(5) { animation-delay: 0.6s; }

        /* Liquid Fill Element */
        .tb-soc::before {
          content: ''; position: absolute; 
          bottom: -100%; left: 0; width: 100%; height: 100%;
          background: linear-gradient(180deg, #f4a023, #d97706); /* Default Gold */
          transition: all 0.4s ease; z-index: -1;
          border-radius: 50% 50% 0 0;
        }

        /* Liquid Hover Trigger */
        .tb-soc:hover::before { bottom: 0; border-radius: 0; }
        .tb-soc:hover { 
          transform: translateY(-4px) scale(1.15) !important; 
          animation: none; /* Pause float on hover */
          color: #fff; border-color: transparent;
        }

        /* Brand Colors for Liquid Fill & Glow */
        .tb-soc.x::before { background: linear-gradient(180deg, #ffffff, #94a3b8); }
        .tb-soc.x:hover { color: #000; box-shadow: 0 4px 10px rgba(255,255,255,0.3); }

        .tb-soc.yt::before { background: linear-gradient(180deg, #ff0000, #cc0000); }
        .tb-soc.yt:hover { box-shadow: 0 4px 10px rgba(255,0,0,0.4); }

        .tb-soc.fb::before { background: linear-gradient(180deg, #1877f2, #0b50b3); }
        .tb-soc.fb:hover { box-shadow: 0 4px 10px rgba(24,119,242,0.4); }

        .tb-soc.li::before { background: linear-gradient(180deg, #0a66c2, #074c94); }
        .tb-soc.li:hover { box-shadow: 0 4px 10px rgba(10,102,194,0.4); }

        .tb-soc.wa::before { background: linear-gradient(180deg, #25d366, #128c7e); }
        .tb-soc.wa:hover { box-shadow: 0 4px 10px rgba(37,211,102,0.4); }
      `}</style>

      <div className="tb-wrap">
        {/* ── Left: Phone + Email ── */}
        <div className="tb-left">
          <a href="tel:+917903340991" className="tb-link">
            <span style={{ color: COLORS.gold, fontSize: 13, filter: 'drop-shadow(0 0 5px rgba(244,160,35,0.4))' }}>📞</span>
            <span>+91-7903340991</span>
          </a>
          <a href="mailto:principal@gncollege.org" className="tb-link tb-email">
            <span style={{ color: COLORS.gold, fontSize: 13, filter: 'drop-shadow(0 0 5px rgba(244,160,35,0.4))' }}>✉️</span>
            <span>principal@gncollege.org</span>
          </a>
        </div>

        {/* ── Right: Quick Links + Divider + Social ── */}
        <div className="tb-right">

          {/* Quick links */}
          <div className="tb-qlinks">
            <a href="https://bbmkuniv.in/login"
               target="_blank" rel="noopener noreferrer"
               className="tb-qbtn tb-res">
              📋 Results
            </a>
            <a href="https://cimsstudentnewui.mastersofterp.in/"
               target="_blank" rel="noopener noreferrer"
               className="tb-qbtn tb-fee">
              💳 Fee Payment
            </a>
            <a href="https://jharkhanduniversities.nic.in/"
               target="_blank" rel="noopener noreferrer"
               className="tb-qbtn tb-adm">
              🎓 Apply Online
            </a>
          </div>

          <div className="tb-div" />

          {/* Search + Dark Mode */}
          {onSearchOpen && (
            <button
              onClick={onSearchOpen}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                padding: '4px 14px',
                color: '#94a3b8',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all .2s',
                fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap',
              }}
              title="Search (Ctrl+K)"
            >
              🔍 <span style={{ opacity: 0.6 }}>Ctrl+K</span>
            </button>
          )}
          {onToggleDark && (
            <button
              onClick={onToggleDark}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                width: 32,
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 14,
                transition: 'all .25s',
                flexShrink: 0,
                color: '#fff',
              }}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          )}

          <div className="tb-div" />

          {/* Social icons with Floating Wave & Liquid Fill */}
          <div className="tb-soc-wrap">
            {SOCIAL_LINKS.map(s => {
              let icon = s.label;
              let cls  = '';
              if (s.id === 'twitter')  { icon = '𝕏'; cls = 'x'; }
              if (s.id === 'youtube')  { icon = '▶'; cls = 'yt'; }
              if (s.id === 'facebook') { cls = 'fb'; }
              if (s.id === 'linkedin') { cls = 'li'; }
              return (
                <a key={s.id} href={s.href}
                   target="_blank" rel="noopener noreferrer"
                   className={`tb-soc ${cls}`}
                   aria-label={s.id}>
                  <span style={{ position: 'relative', zIndex: 2 }}>{icon}</span>
                </a>
              );
            })}
            <a href={whatsappLink.href}
               target="_blank" rel="noopener noreferrer"
               className="tb-soc wa"
               aria-label="whatsapp">
              <span style={{ position: 'relative', zIndex: 2 }}>W</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;