// src/components/home/TopBar.jsx
// 🚀 COMPACT ULTRA PRO MAX EDITION - Liquid Fill & Floating Wave
import React from "react";
import { COLORS } from '../../styles/colors';
import { SOCIAL_LINKS } from '../../data/db';

const TopBar = ({ isDark, onToggleDark, onSearchOpen }) => {
  const whatsappLink = { id: 'whatsapp', label: 'W', href: 'https://wa.me/917903340991' };

  return (
    <div style={{
      background: `linear-gradient(90deg, rgba(6,14,28,0.95) 0%, rgba(10,24,50,0.95) 50%, rgba(6,14,28,0.95) 100%)`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      color: '#e2e8f0',
      borderBottom: `1px solid rgba(244,160,35,0.25)`,
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      width: '100%',
      maxWidth: '100vw',
      overflow: 'hidden',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 100
    }}>
      {/* Animated Top Border Glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(244,160,35,0.8), transparent)',
        animation: 'scanline 3s linear infinite'
      }} />

      <style>{`
        @keyframes scanline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .tb-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px clamp(12px, 2vw, 24px);
          gap: 8px;
          min-width: 0;
          max-width: 1400px;
          margin: 0 auto;
          flex-wrap: nowrap;
        }

        /* ── Left Contact Info ── */
        .tb-left {
          display: flex;
          align-items: center;
          gap: clamp(12px, 2vw, 28px);
          flex-shrink: 1;
          min-width: 0;
          overflow: hidden;
        }
        .tb-link {
          display: flex; align-items: center; gap: 8px;
          text-decoration: none; color: #cbd5e1;
          font-size: clamp(11px, 1vw, 13.5px);
          font-weight: 600; white-space: nowrap;
          transition: all .3s cubic-bezier(0.25, 0.8, 0.25, 1);
          min-width: 0;
          padding: 4px 8px;
          border-radius: 6px;
        }
        .tb-link:hover { 
          color: #fff; 
          background: rgba(255,255,255,0.05);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .tb-email { display: flex; }
        @media(max-width: 520px) { .tb-email { display: none; } }

        /* ── Right Section ── */
        .tb-right {
          display: flex;
          align-items: center;
          gap: clamp(12px, 1.5vw, 16px);
          flex-shrink: 0;
        }

        /* ── Quick Link Buttons (Neon Glass) ── */
        .tb-qlinks { display: flex; align-items: center; gap: 8px; }
        .tb-qbtn {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;
          padding: 5px 12px; border-radius: 8px;
          text-decoration: none; white-space: nowrap;
          border: 1px solid; flex-shrink: 0;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(5px);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative; overflow: hidden; z-index: 1;
        }
        
        .tb-qbtn::after {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
          transform: rotate(45deg) translateX(-100%);
          transition: transform 0.6s ease;
          z-index: -1;
        }
        .tb-qbtn:hover::after { transform: rotate(45deg) translateX(100%); }

        .tb-res { border-color: rgba(244,160,35,0.4); color: #f4a023; }
        .tb-res:hover { background: rgba(244,160,35,0.15); color: #fff; box-shadow: 0 0 15px rgba(244,160,35,0.4); transform: translateY(-2px); }

        .tb-fee { border-color: rgba(16,185,129,0.4); color: #10b981; }
        .tb-fee:hover { background: rgba(16,185,129,0.15); color: #fff; box-shadow: 0 0 15px rgba(16,185,129,0.4); transform: translateY(-2px); }

        .tb-adm { border-color: rgba(99,102,241,0.4); color: #818cf8; }
        .tb-adm:hover { background: rgba(99,102,241,0.15); color: #fff; box-shadow: 0 0 15px rgba(99,102,241,0.4); transform: translateY(-2px); }

        @media(max-width: 900px) { .tb-adm   { display: none; } }
        @media(max-width: 720px) { .tb-fee   { display: none; } }
        @media(max-width: 580px) { .tb-qlinks { display: none; } }

        /* Divider */
        .tb-div { width: 1px; height: 20px; background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent); flex-shrink: 0; }
        @media(max-width: 580px) { .tb-div { display: none; } }

        /* 🚀 FLOATING WAVE & LIQUID FILL ICONS */
        @keyframes tbFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .tb-soc-wrap { display: flex; gap: 8px; align-items: center; }

        .tb-soc {
          position: relative; overflow: hidden; z-index: 1;
          width: clamp(26px, 3vw, 30px);
          height: clamp(26px, 3vw, 30px);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: #cbd5e1;
          text-decoration: none; flex-shrink: 0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation: tbFloat 3s ease-in-out infinite;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        /* Staggered Delay for Wave Effect */
        .tb-soc-wrap a:nth-child(1) { animation-delay: 0s; }
        .tb-soc-wrap a:nth-child(2) { animation-delay: 0.1s; }
        .tb-soc-wrap a:nth-child(3) { animation-delay: 0.2s; }
        .tb-soc-wrap a:nth-child(4) { animation-delay: 0.3s; }
        .tb-soc-wrap a:nth-child(5) { animation-delay: 0.4s; }

        /* Liquid Fill Element */
        .tb-soc::before {
          content: ''; position: absolute; 
          bottom: -100%; left: 0; width: 100%; height: 100%;
          background: linear-gradient(180deg, #f4a023, #d97706); /* Default Gold */
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); z-index: -1;
          border-radius: 50% 50% 0 0;
        }

        /* Liquid Hover Trigger */
        .tb-soc:hover::before { bottom: 0; border-radius: 0; }
        .tb-soc:hover { 
          transform: translateY(-5px) scale(1.15) !important; 
          animation: none; 
          color: #fff; border-color: transparent;
        }

        /* Brand Colors for Liquid Fill & Glow */
        .tb-soc.x::before { background: linear-gradient(180deg, #ffffff, #94a3b8); }
        .tb-soc.x:hover { color: #000; box-shadow: 0 8px 20px rgba(255,255,255,0.4); }

        .tb-soc.yt::before { background: linear-gradient(180deg, #ff0000, #cc0000); }
        .tb-soc.yt:hover { box-shadow: 0 8px 20px rgba(255,0,0,0.5); }

        .tb-soc.fb::before { background: linear-gradient(180deg, #1877f2, #0b50b3); }
        .tb-soc.fb:hover { box-shadow: 0 8px 20px rgba(24,119,242,0.5); }

        .tb-soc.li::before { background: linear-gradient(180deg, #0a66c2, #074c94); }
        .tb-soc.li:hover { box-shadow: 0 8px 20px rgba(10,102,194,0.5); }

        .tb-soc.wa::before { background: linear-gradient(180deg, #25d366, #128c7e); }
        .tb-soc.wa:hover { box-shadow: 0 8px 20px rgba(37,211,102,0.5); }
      `}</style>

      <div className="tb-wrap">
        {/* ── Left: Phone + Email ── */}
        <div className="tb-left">
          <a href="tel:+917903340991" className="tb-link">
            <span style={{ color: COLORS.gold, fontSize: 13, filter: 'drop-shadow(0 0 8px rgba(244,160,35,0.6))' }}>📞</span>
            <span>+91-7903340991</span>
          </a>
          <a href="mailto:principal@gncollege.org" className="tb-link tb-email">
            <span style={{ color: COLORS.gold, fontSize: 13, filter: 'drop-shadow(0 0 8px rgba(244,160,35,0.6))' }}>✉️</span>
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
               📊 Results
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
          {onToggleDark && (
            <button
              onClick={onToggleDark}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 15,
                transition: 'all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                flexShrink: 0,
                color: '#fff',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15) rotate(10deg)'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) rotate(0deg)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
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