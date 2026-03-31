// src/components/Footer.jsx — ULTRA PRO MAX (Fixed Animated Social Icons)

import { useState, useEffect, memo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import { SOCIAL_LINKS } from '../data/db';

const N = COLORS?.navy || '#0f2347';
const G = COLORS?.gold || '#f4a023';

// 🎬 Smart Scroll Animation Hook
function useIntersectAnim(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVis(true); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

// 🌀 Animation Wrapper
const SA = ({ children, variant = 'up', delay = '', style = {}, className = '' }) => {
  const [ref, vis] = useIntersectAnim();
  return (
    <div
      ref={ref}
      className={`sa sa-${variant}${delay ? ` sa-${delay}` : ''}${vis ? ' visible' : ''}${className ? ' ' + className : ''}`}
      style={style}
    >
      {children}
    </div>
  );
};

// 🗺️ Premium Glass Map
const DualCampusMap = () => (
  <div className="glass-map-wrapper">
    <div className="map-glow"></div>
    <iframe
      title="GNC Dual Campus Map"
      className="g-map-frame"
      loading="lazy"
      allowFullScreen
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.9730352447!2d86.35338166046033!3d23.780635391515366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6a74b0fb59bb3%3A0xc3dfbb016c905ed4!2sDhanbad%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1711532163901!5m2!1sen!2sin"
    />
    <div className="map-badge">🗺️ Campus Locator</div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ✅ Removed external dependency, Footer is now self-sufficient!
const Footer = memo(() => {
  const [firebaseSocials, setFirebaseSocials] = useState(null);

  useEffect(() => {
    return onSnapshot(doc(db, 'settings', 'socialLinks'), snap => {
      if (snap.exists() && snap.data().links) setFirebaseSocials(snap.data().links);
    });
  }, []);

  // ✅ Fallback Database if nothing is found
  const FALLBACK_SOCIALS = [
    { id: 'facebook', label: 'Facebook', href: '#' },
    { id: 'twitter', label: 'Twitter', href: '#' },
    { id: 'instagram', label: 'Instagram', href: '#' },
    { id: 'youtube', label: 'YouTube', href: '#' }
  ];

  // Logic to determine which links to show
  const rawLinks = (firebaseSocials && firebaseSocials.length > 0) 
                   ? firebaseSocials 
                   : (SOCIAL_LINKS && SOCIAL_LINKS.length > 0 ? SOCIAL_LINKS : FALLBACK_SOCIALS);

  // Auto-detect Icons logic
  const getIcon = (link) => {
    if (link.icon) return link.icon;
    const id = link.id?.toLowerCase() || '';
    if (id.includes('twitter') || id.includes('x')) return '𝕏';
    if (id.includes('youtube')) return '▶';
    if (id.includes('facebook')) return 'f';
    if (id.includes('instagram')) return '📸';
    if (id.includes('linkedin')) return 'in';
    return link.label?.charAt(0) || '🌐';
  };

  return (
    <footer className="f-ultra-root">
      <style>{`
        /* 🌌 Deep Premium Background */
        .f-ultra-root {
          position: relative;
          background: #030914; 
          color: #e2e8f0;
          font-family: 'Plus Jakarta Sans', "Inter", sans-serif;
          overflow: hidden;
          padding-top: 25px; 
          z-index: 10;
        }

        /* ✨ Animated Aura Blobs */
        .aura-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.35;
          z-index: -1;
          animation: floatAura 15s ease-in-out infinite alternate;
        }
        .aura-1 { background: ${G}; width: 350px; height: 350px; top: -50px; left: -50px; }
        .aura-2 { background: ${N}; width: 500px; height: 500px; bottom: -150px; right: -50px; animation-delay: -5s; opacity: 0.5; }

        @keyframes floatAura {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 20px) scale(1.05); }
          100% { transform: translate(-20px, 40px) scale(0.95); }
        }

        /* 🧊 True Glassmorphism Container */
        .f-glass-panel {
          position: relative;
          max-width: var(--container-max, 1280px);
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-left: 1px solid rgba(255, 255, 255, 0.05);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px 24px 0 0;
          padding: 40px 40px 20px; 
          box-shadow: 0 -10px 40px rgba(0,0,0,0.2);
        }

        .f-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 3rem;
        }

        @media(max-width: 1400px) {
          .f-grid { grid-template-columns: 2fr 1.5fr 1fr 1.5fr; }
        }
        @media(max-width: 1100px) {
          .f-grid { grid-template-columns: 1fr 1fr; }
        }
        @media(max-width: 650px) {
          .f-grid { grid-template-columns: 1fr; gap: 40px; }
          .f-glass-panel { padding: 30px 20px; }
          .f-bottom { flex-direction: column; text-align: center; }
        }

        /* 🎓 Logo & Brand Styling */
        .f-brand-logo { width: 50px; height: 50px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5)); transition: transform 0.5s; }
        .f-brand-logo:hover { transform: rotateY(180deg); }
        .f-brand-title { font-size: 18px; font-weight: 900; color: #fff; line-height: 1.15; letter-spacing: -0.5px; }
        .f-brand-title span { background: linear-gradient(90deg, ${G}, #fde68a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .f-brand-desc { font-size: 12px; color: rgba(255,255,255,0.6); line-height: 1.5; font-weight: 500; margin-bottom: 12px; }

        /* 📍 Contact / Addresses */
        .f-heading { font-size: 13px; font-weight: 800; color: #fff; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
        .f-heading::before { content: ''; width: 16px; height: 3px; background: ${G}; border-radius: 2px; }
        
        .f-address-card { background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); padding: 10px 14px; border-radius: 10px; margin-bottom: 8px; transition: background 0.3s ease, border-color 0.3s ease, transform 0.25s cubic-bezier(.22,1,.36,1); display: flex; align-items: center; gap: 10px; min-height: 44px; }
        .f-address-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(244,160,35,0.3); transform: translateX(4px); }
        .f-address-icon { font-size: 16px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); flex-shrink: 0; }
        .f-address-title { color: ${G}; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
        .f-address-text { color: rgba(255,255,255,0.8); font-size: 11px; line-height: 1.3; }

        /* 🔗 Links */
        .f-link-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px; }
        .f-link { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 12.5px; font-weight: 600; display: inline-flex; align-items: center; min-height: 40px; padding: 6px 0; transition: color 0.3s ease, transform 0.3s cubic-bezier(.22,1,.36,1); position: relative; }
        .f-link::before { content: '→'; position: absolute; left: 0; opacity: 0; color: ${G}; transform: translateX(-8px); transition: 0.3s; }
        .f-link:hover { color: #fff; transform: translateX(14px); }
        .f-link:hover::before { opacity: 1; transform: translateX(-12px); }

        /* 🗺️ Glass Map Styling */
        .glass-map-wrapper { position: relative; width: 100%; height: 140px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
        .map-glow { position: absolute; inset: 0; background: ${G}; opacity: 0; transition: 0.4s; z-index: 1; pointer-events: none; mix-blend-mode: overlay; }
        .glass-map-wrapper:hover .map-glow { opacity: 0.3; }
        .g-map-frame { width: 100%; height: 100%; border: none; filter: grayscale(80%) invert(100%) contrast(120%); transition: 0.5s; }
        .glass-map-wrapper:hover .g-map-frame { filter: grayscale(20%) invert(90%); }
        .map-badge { position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.6); backdrop-filter: blur(10px); color: #fff; padding: 4px 10px; border-radius: 20px; font-size: 9px; font-weight: 800; border: 1px solid rgba(255,255,255,0.1); z-index: 2; pointer-events: none; }

        /* 🚀 ULTRA PRO MAX ANIMATED SOCIAL ICONS */
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        
        .f-socials { display: flex; gap: 12px; flex-wrap: wrap; padding-top: 5px; }
        
        .f-soc-btn { 
          position: relative;
          width: 44px; height: 44px; 
          border-radius: 12px; 
          background: rgba(255,255,255,0.03); 
          border: 1px solid rgba(255,255,255,0.1); 
          display: flex; align-items: center; justify-content: center; 
          color: #fff; font-size: 17px; text-decoration: none; 
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
          animation: floatIcon 3s ease-in-out infinite;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          z-index: 1;
        }

        /* Staggered Floating Wave Delay */
        .f-socials a:nth-child(1) { animation-delay: 0s; }
        .f-socials a:nth-child(2) { animation-delay: 0.2s; }
        .f-socials a:nth-child(3) { animation-delay: 0.4s; }
        .f-socials a:nth-child(4) { animation-delay: 0.6s; }
        .f-socials a:nth-child(5) { animation-delay: 0.8s; }

        /* Liquid Fill Effect on Hover */
        .f-soc-btn::before {
          content: ''; position: absolute; 
          bottom: -100%; left: 0; width: 100%; height: 100%;
          background: linear-gradient(180deg, ${G}, #f59e0b); 
          transition: all 0.4s ease; z-index: -1;
          border-radius: 50% 50% 0 0;
        }

        .f-soc-btn:hover::before { 
          bottom: 0; 
          border-radius: 0;
        }

        .f-soc-btn:hover { 
          color: #000; 
          transform: translateY(-8px) scale(1.15) rotate(10deg) !important; 
          border-color: ${G}; 
          animation: none; 
          box-shadow: 0 10px 25px rgba(244,160,35,0.5); 
        }

        /* © Bottom Bar */
        .f-bottom { margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
        .f-copy { font-size: 11px; color: rgba(255,255,255,0.5); font-weight: 500; }
        .f-dev { font-size: 11px; color: rgba(255,255,255,0.4); background: rgba(0,0,0,0.3); padding: 5px 12px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); }

        /* Animations */
        .sa { opacity: 0; transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
        .sa-up { transform: translateY(20px); }
        .sa.visible { opacity: 1; transform: none; }
        .sa-d1 { transition-delay: 0.1s; } .sa-d2 { transition-delay: 0.15s; } .sa-d3 { transition-delay: 0.2s; }

        @media(max-width: 1100px) { .f-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width: 600px) { .f-grid { grid-template-columns: 1fr; gap: 25px; } .f-glass-panel { padding: 25px 20px 15px; } .f-bottom { flex-direction: column; text-align: center; } }
      `}</style>

      {/* 🌌 Animated Background Aura */}
      <div className="aura-blob aura-1"></div>
      <div className="aura-blob aura-2"></div>

      {/* 🧊 Glass Container */}
      <div className="f-glass-panel">
        <div className="f-grid">
          
          {/* COL 1: Brand & Logo */}
          <SA variant="up">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <img src={`${import.meta.env.BASE_URL}images/logo.webp`} alt="GNC Logo" className="f-brand-logo" />
              <h2 className="f-brand-title" style={{ margin: 0 }}>Guru Nanak College,<br/><span>Dhanbad</span></h2>
            </div>
            
            <p className="f-brand-desc">
              A Sikh Minority Degree College Established & Managed by Gurudwara Prabhandhak Committee, Dhanbad. Fostering excellence since 1970.
            </p>
            
            {/* 🚀 ANIMATED SOCIAL ICONS */}
            <div className="f-socials">
              {rawLinks.map(link => (
                <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" className="f-soc-btn" title={link.label}>
                  <span style={{ position: 'relative', zIndex: 2, fontWeight: 'bold' }}>
                    {getIcon(link)}
                  </span>
                </a>
              ))}
            </div>
          </SA>

          {/* COL 2: Contact Info */}
          <SA variant="up" delay="d1">
            <h4 className="f-heading">Get In Touch</h4>
            
            <div className="f-address-card">
              <div className="f-address-icon">🏢</div>
              <div>
                <div className="f-address-title">Bank More Campus</div>
                <div className="f-address-text">Bank More, Dhanbad - 826001</div>
              </div>
            </div>

            <div className="f-address-card">
              <div className="f-address-icon">🏫</div>
              <div>
                <div className="f-address-title">Bhuda Campus</div>
                <div className="f-address-text">Rani Road, Barmasiya - 826001</div>
              </div>
            </div>

            <div className="f-address-card">
              <div className="f-address-icon">📞</div>
              <div>
                <div className="f-address-title">Contact No.</div>
                <div className="f-address-text">+91 79033 40991</div>
              </div>
            </div>

            <div className="f-address-card">
              <div className="f-address-icon">✉️</div>
              <div>
                <div className="f-address-title">Email Address</div>
                <div className="f-address-text" style={{ wordBreak: 'break-all' }}>principal@gncollege.org</div>
              </div>
            </div>
          </SA>

          {/* COL 3: Quick Links */}
          <SA variant="up" delay="d2">
            <h4 className="f-heading">Quick Links</h4>
            <ul className="f-link-list">
              {[ 
                {name: "About College", href: "/about-us/college-profile"}, 
                {name: "Academic Courses", href: "/academics/course-offered"}, 
                {name: "Admission 2024", href: "/admission/notification/latest"}, 
                {name: "Campus Events", href: "/events"}, 
                {name: "Photo Gallery", href: "/gallery"},
                {name: "BBMKU Portal", href: "https://bbmku.ac.in/", external: true} 
              ].map(link => (
                <li key={link.name}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="f-link">{link.name}</a>
                  ) : (
                    <Link to={link.href} className="f-link">{link.name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </SA>

          {/* COL 4: Map & Admin */}
          <SA variant="up" delay="d3" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h4 className="f-heading">Location Map</h4>
            <DualCampusMap />
            
            <Link to="/#/admin" style={{ 
              background: 'rgba(255,255,255,0.05)', color: '#fff', border: `1px solid rgba(255,255,255,0.1)`, 
              padding: '10px 18px', borderRadius: '10px', fontSize: 11.5, fontWeight: 800, textDecoration: 'none', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, 
              transition: 'background 0.3s ease, color 0.2s ease, border-color 0.3s ease',
              minHeight: '44px', letterSpacing: '0.3px',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = G; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = G; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              🔒 Admin Access Portal
            </Link>
          </SA>

        </div>

        {/* © Bottom Bar */}
        <div className="f-bottom">
          <div className="f-copy">
            © {new Date().getFullYear()} <strong>Guru Nanak College, Dhanbad.</strong> All Rights Reserved.
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.2)' }}>|</span>
            Sikh Minority Degree College
          </div>
          <div className="f-dev">
            Design & Developed dynamically with <span style={{ color: '#ef4444' }}>❤️</span> By Pankaj Kumar
          </div>
        </div>

      </div>
    </footer>
  );
});

export default Footer;