// src/components/home/TopBar.jsx
// 🚀 ULTRA-PREMIUM EDITION - Kinetic HUD & Liquid Fill Morphing
import React from "react";
import { COLORS } from '../../styles/colors';
import { SOCIAL_LINKS } from '../../data/db';

const TopBar = ({ isDark, onToggleDark, onSearchOpen }) => {
  const whatsappLink = { id: 'whatsapp', label: 'W', href: 'https://wa.me/917903340991' };

  return (
    <div className="premium-topbar">
      <style>{`
        @keyframes movingGradient {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shineFlow {
          0%   { transform: translateX(-200%) skewX(-30deg); }
          20%  { transform: translateX(300%) skewX(-30deg); }
          100% { transform: translateX(300%) skewX(-30deg); }
        }
        @keyframes borderPulse {
          0%, 100% { border-color: rgba(244,160,35,0.3); }
          50%      { border-color: rgba(244,160,35,0.7); }
        }

        .premium-topbar {
          background: linear-gradient(-45deg, #0f2347, #1e3a8a, #060e1c, #172554);
          background-size: 400% 400%;
          animation: movingGradient 15s ease infinite;
          color: #ffffff;
          border-bottom: 1.5px solid rgba(244,160,35,0.3);
          width: 100%;
          maxWidth: 100vw;
          overflow: hidden;
          position: relative;
          z-index: 1000;
          animation: borderPulse 4s infinite alternate;
        }

        .premium-topbar::after {
          content: '';
          position: absolute; top: 0; left: 0; width: 120px; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
          animation: shineFlow 7s infinite ease-in-out;
          pointer-events: none;
        }

        .tb-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px clamp(12px, 2.5vw, 32px);
          max-width: 1536px;
          margin: 0 auto;
        }

        /* ── Left Side: Contact ── */
        .tb-left {
          display: flex;
          align-items: center;
          gap: clamp(14px, 2vw, 30px);
        }
        .tb-link {
          display: flex; align-items: center; gap: 8px;
          text-decoration: none; color: rgba(255,255,255,0.8);
          font-size: clamp(11px, 0.9vw, 13px);
          font-weight: 700; white-space: nowrap;
          transition: all 0.3s ease;
          padding: 6px 10px;
          border-radius: 8px;
          background: rgba(255,255,255,0.03);
        }
        .tb-link:hover { 
          color: #fff; background: rgba(255,255,255,0.08);
          transform: translateY(-2px);
        }
        .icon-glow {
          color: ${COLORS.gold};
          filter: drop-shadow(0 0 5px rgba(244,160,35,0.5));
        }

        @media(max-width: 640px) { .tb-email { display: none; } }

        /* ── Right Side Group ── */
        .tb-right-group {
          display: flex;
          align-items: center;
          gap: clamp(12px, 2vw, 24px);
        }

        /* ── HUD Buttons ── */
        .tb-hud-btns {
          display: flex;
          align-items: center;
          gap: 14px; 
        }
        .hud-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: clamp(80px, 9vw, 120px);
          padding: 7px 0;
          font-size: 10px; font-weight: 900; letter-spacing: 1px;
          text-transform: uppercase; border-radius: 50px;
          text-decoration: none; border: 1.5px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.04);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          color: #fff; text-align: center;
        }
        .hud-btn:hover {
          transform: translateY(-4px);
          border-color: #fff;
          background: rgba(255,255,255,0.15);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        .hud-btn.gold-cta {
          border-color: rgba(244,160,35,0.4);
          color: ${COLORS.gold};
        }
        .hud-btn.gold-cta:hover {
          background: ${COLORS.gold};
          color: #000;
          box-shadow: 0 0 25px rgba(244,160,35,0.45);
        }

        @media(max-width: 1024px) { .tb-hud-btns { display: none; } }

        /* ── Social Icons Grid (Liquid Fill) ── */
        .tb-socials { display: flex; gap: 9px; }
        .soc-icon {
          width: 32px; height: 32px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: #f1f5f9; text-decoration: none; font-size: 14px;
          position: relative; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.2, 1, 0.3, 1);
        }
        .soc-icon::before {
          content: ''; position: absolute; top: 100%; left: 0;
          width: 100%; height: 100%; transition: 0.4s; z-index: -1;
          border-radius: 50% 50% 0 0;
        }
        .soc-icon:hover { transform: translateY(-6px); border-color: transparent; color: #fff; }
        .soc-icon:hover::before { top: 0; border-radius: 0; }
        
        /* Brand Colors */
        .soc-icon.fb:hover::before { background: linear-gradient(to top, #1877f2, #0866ff); }
        .soc-icon.x:hover::before { background: linear-gradient(to top, #000000, #333333); }
        .soc-icon.yt:hover::before { background: linear-gradient(to top, #ff0000, #ff4d4d); }
        .soc-icon.li:hover::before { background: linear-gradient(to top, #0a66c2, #0077b5); }
        .soc-icon.wa:hover::before { background: linear-gradient(to top, #25d366, #128c7e); }

        @media(max-width: 480px) { .tb-socials { display: none; } }

        /* ── Dark Mode HUD ── */
        .tb-dark-btn {
          width: 38px; height: 38px;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(244,160,35,0.3);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #fff; font-size: 16px;
          transition: all 0.4s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .tb-dark-btn:hover {
          transform: rotate(20deg) scale(1.15);
          background: ${COLORS.gold};
          color: #000;
          box-shadow: 0 0 20px rgba(244,160,35,0.4);
        }
      `}</style>

      <div className="tb-wrap">
        {/* LEFT: PHONE + EMAIL */}
        <div className="tb-left">
          <a href="tel:+917903340991" className="tb-link">
            <span className="icon-glow">📞</span> <span>+91-7903340991</span>
          </a>
          <a href="mailto:principal@gncollege.org" className="tb-link tb-email">
            <span className="icon-glow">✉️</span> <span>principal@gncollege.org</span>
          </a>
        </div>

        {/* RIGHT GROUP */}
        <div className="tb-right-group">
          {/* HUD BUTTONS */}
          <div className="tb-hud-btns">
            <a href="https://bbmkuniv.in/login" target="_blank" rel="noopener noreferrer" className="hud-btn">📊 Results</a>
            <a href="https://cimsstudentnewui.mastersofterp.in/" target="_blank" rel="noopener noreferrer" className="hud-btn">💳 Pay Fees</a>
            <a href="https://jharkhanduniversities.nic.in/" target="_blank" rel="noopener noreferrer" className="hud-btn gold-cta">🎓 Admission</a>
          </div>

          {/* SOCIAL ICONS (INDIVIDUAL BRAND COLORS) */}
          <div className="tb-socials">
            {SOCIAL_LINKS.map(s => {
              let icon = (s.id === 'twitter' ? '𝕏' : (s.id === 'youtube' ? '▶' : s.label));
              let cls = (s.id === 'twitter' ? 'x' : (s.id === 'youtube' ? 'yt' : (s.id === 'facebook' ? 'fb' : (s.id === 'linkedin' ? 'li' : ''))));
              return (
                <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" 
                   className={`soc-icon ${cls}`} aria-label={s.id}>
                  <span style={{ position: 'relative', zIndex: 2 }}>{icon}</span>
                </a>
              );
            })}
            <a href={whatsappLink.href} target="_blank" rel="noopener noreferrer" className="soc-icon wa">
              <span style={{ position: 'relative', zIndex: 2 }}>W</span>
            </a>
          </div>

          {/* DARK TOGGLE (TRUE RIGHT) */}
          {onToggleDark && (
            <button onClick={onToggleDark} className="tb-dark-btn" title="Toggle Surface Mode">
              {isDark ? '☀️' : '🌙'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;