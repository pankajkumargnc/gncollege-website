// src/components/Footer.jsx — HYPER-ULTIMA REFINED (Compact + Gold Moving BG + Pinlink + Gmail + Logo Side Title)
import { useState, useEffect, memo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import { SOCIAL_LINKS } from '../data/db';

const N = COLORS?.navy || '#0f2347';
const G = COLORS?.gold || '#f4a023';

const StarField = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let mouse = { x: -100, y: -100 };
    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initStars();
    };
    const initStars = () => {
      stars = [];
      const count = Math.floor(canvas.width / 15);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          color: Math.random() > 0.8 ? G : '#fff',
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3
        });
      }
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
        if (s.y < 0 || s.y > canvas.height) s.vy *= -1;
        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) { s.x -= dx / 50; s.y -= dy / 50; }
        ctx.beginPath();ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color; ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    window.addEventListener('resize', resize); resize(); animate();
    return () => window.removeEventListener('resize', resize);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }} />;
};

const SA = ({ children, variant = 'up', delay = '', style = {}, className = '' }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`sa sa-${variant}${delay ? ` sa-${delay}` : ''}${vis ? ' visible' : ''}${className ? ' ' + className : ''}`} style={style}>{children}</div>;
};

const Footer = memo(() => {
  const [firebaseSocials, setFirebaseSocials] = useState(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const ticker = setInterval(() => setTime(new Date()), 1000);
    const unsub = onSnapshot(doc(db, 'settings', 'socialLinks'), snap => {
      if (snap.exists() && snap.data().links) setFirebaseSocials(snap.data().links);
    });
    return () => { clearInterval(ticker); unsub(); };
  }, []);

  const rawLinks = firebaseSocials || SOCIAL_LINKS || [];
  const getIcon = (link) => {
    if (link.icon) return link.icon;
    const id = (link.id || '').toLowerCase();
    if (id.includes('twitter') || id.includes('x')) return '𝕏';
    if (id.includes('youtube')) return '▶';
    if (id.includes('facebook')) return 'f';
    if (id.includes('instagram')) return '📸';
    return link.label?.charAt(0) || '🌐';
  };

  return (
    <footer className="f-ultima-re">
      <style>{`
        .f-ultima-re {
          position: relative; background: #01040a; color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden;
          padding: 60px 0 0; z-index: 10;
        }

        /* 🏆 Moving Gold Hybrid Gradient Background */
        .f-ultima-re::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(1,4,10,1) 0%, rgba(244,160,35,0.05) 50%, rgba(1,4,10,1) 100%);
          background-size: 300% 300%; animation: gradientMove 10s ease infinite; z-index: -2;
        }
        @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

        .f-ultima-re::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg, transparent, ${G}, #fff, ${G}, transparent);
          background-size: 200% auto; animation: glowMove 4s linear infinite; box-shadow: 0 0 15px ${G};
        }
        @keyframes glowMove { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }

        .f-container { max-width: 1440px; margin: 0 auto; padding: 30px; position: relative; }

        .f-reach-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 40px; }
        .f-card-3d { perspective: 1000px; height: 100px; cursor: pointer; }
        .f-card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-style: preserve-3d; }
        .f-card-3d:hover .f-card-inner { transform: rotateX(180deg); }
        .f-card-front, .f-card-back {
          position: absolute; width: 100%; height: 100%; backface-visibility: hidden;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 15px; display: flex; align-items: center; gap: 12px; backdrop-filter: blur(10px);
        }
        .f-card-back { 
           transform: rotateX(180deg); background: ${G}; border-color: ${G};
           justify-content: center; font-weight: 900; color: #000; font-size: 13px; text-decoration: none;
           display: flex; align-items: center; gap: 5px;
        }
        .f-card-icon { font-size: 28px; }
        .f-card-info b { display: block; color: ${G}; font-size: 11px; text-transform: uppercase; margin-bottom: 2px; }
        .f-card-info span { font-size: 13px; color: rgba(255,255,255,0.9); }

        .f-sitemap { display: grid; grid-template-columns: 2fr repeat(3, 1fr) 1.5fr; gap: 30px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 40px; }
        .f-brand-side { display: flex; flex-direction: column; }
        .f-brand-header { display: flex; align-items: center; gap: 15px; margin-bottom: 12px; }
        .f-brand-header h2 { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; margin: 0; background: linear-gradient(90deg, #fff, ${G}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .f-brand-side p { font-size: 12.5px; color: rgba(255,255,255,0.5); line-height: 1.5; margin-bottom: 25px; }

        .f-col h4 { font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; color: ${G}; margin-bottom: 20px; }
        .f-links { list-style: none; padding: 0; margin: 0; }
        .f-links li { margin-bottom: 10px; }
        .f-links a { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 13px; transition: 0.3s; display: flex; align-items: center; gap: 8px; }
        .f-links a:hover { color: #fff; transform: translateX(8px); }

        /* 🏀 Bouncing Social Icons */
        @keyframes socialBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .f-soc-hub { display: flex; gap: 12px; }
        .f-soc-btn {
          width: 40px; height: 40px; border-radius: 12px; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 18px; transition: 0.4s; text-decoration: none;
          animation: socialBounce 3s ease-in-out infinite;
        }
        .f-soc-btn:nth-child(2) { animation-delay: 0.2s; }
        .f-soc-btn:nth-child(3) { animation-delay: 0.4s; }
        .f-soc-btn:nth-child(4) { animation-delay: 0.6s; }
        .f-soc-btn:nth-child(5) { animation-delay: 0.8s; }
        .f-soc-btn:hover { animation-play-state: paused; transform: scale(1.15); border-color: ${G}; color: #000; background: ${G}; box-shadow: 0 10px 25px ${G}55; }

        .f-hud-ultima { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 10px 25px; border-radius: 100px; margin-top: 40px; backdrop-filter: blur(15px); }
        .hud-left { display: flex; gap: 20px; align-items: center; }
        .hud-status { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; color: #22c55e; }
        .pulse { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 10px #22c55e; animation: p 1.5s infinite; }
        @keyframes p { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }
        
        .f-final-line { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; font-size: 11.5px; color: rgba(255,255,255,0.35); }
        .f-dev-pill { background: #000; border: 1px solid rgba(255,255,255,0.05); padding: 4px 12px; border-radius: 50px; color: rgba(255,255,255,0.5); }

        .sa { opacity: 0; transition: 1s cubic-bezier(0.22, 1, 0.36, 1); }
        .sa-up { transform: translateY(40px); }
        .sa.visible { opacity: 1; transform: none; }

        @media (max-width: 1200px) { .f-sitemap { grid-template-columns: 2fr repeat(2, 1fr) 1.5fr; } .f-reach-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .f-sitemap { grid-template-columns: 1fr 1fr; } .f-reach-grid { grid-template-columns: 1fr; } .f-final-line { flex-direction: column; gap: 15px; text-align: center; } }
      `}</style>
      <StarField />
      <div className="f-container">
        <div className="f-reach-grid">
          <SA variant="up" className="f-card-3d">
            <div className="f-card-inner">
              <div className="f-card-front"><span className="f-card-icon">📍</span><div className="f-card-info"><b>Bhuda Campus</b><span>Rani Road, Barmasiya</span></div></div>
              <a href="https://www.google.com/maps/search/?api=1&query=Guru+Nanak+College+Bhuda+Campus+Dhanbad" target="_blank" rel="noopener noreferrer" className="f-card-back">📌 OPEN PINPOINT MAP</a>
            </div>
          </SA>
          <SA variant="up" className="f-card-3d" delay="sa-d1">
            <div className="f-card-inner">
              <div className="f-card-front"><span className="f-card-icon">🏢</span><div className="f-card-info"><b>Bank More Campus</b><span>Main Road, Dhanbad</span></div></div>
              <a href="https://www.google.com/maps/search/?api=1&query=Guru+Nanak+College+Bank+More+Campus+Dhanbad" target="_blank" rel="noopener noreferrer" className="f-card-back">📌 OPEN PINPOINT MAP</a>
            </div>
          </SA>
          <SA variant="up" className="f-card-3d" delay="sa-d2">
            <div className="f-card-inner">
              <div className="f-card-front"><span className="f-card-icon">📧</span><div className="f-card-info"><b>Official Email</b><span>principal@gncollege.org</span></div></div>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=principal@gncollege.org" target="_blank" rel="noopener noreferrer" className="f-card-back">✉️ OPEN IN GMAIL</a>
            </div>
          </SA>
        </div>

        <div className="f-sitemap">
          <SA variant="up" className="f-brand-side">
            <div className="f-brand-header">
              <img src={`${import.meta.env.BASE_URL}images/logo.webp`} width="55" alt="GNC" />
              <h2>Guru Nanak College</h2>
            </div>
            <p>NAAC Accredited degree college committed to providing quality education with social values since 1970.</p>
            <div className="f-soc-hub">
              {rawLinks.map(l => (
                <a key={l.id} href={l.href} target="_blank" rel="noopener noreferrer" className="f-soc-btn">{getIcon(l)}</a>
              ))}
            </div>
          </SA>
          <SA variant="up" delay="sa-d1" className="f-col">
            <h4>Institution</h4>
            <ul className="f-links">
              <li><Link to="/about-us/college-profile">College Profile</Link></li>
              <li><Link to="/about-us/sikh-heritage">Sikh Heritage</Link></li>
              <li><Link to="/naac/aqar">AQAR 2024</Link></li>
              <li><Link to="/p/contact-directory">Directory</Link></li>
            </ul>
          </SA>
          <SA variant="up" delay="sa-d2" className="f-col">
            <h4>Students</h4>
            <ul className="f-links">
              <li><Link to="/scholarships">Scholarships</Link></li>
              <li><Link to="/admission/fee-structure">Fee Structure</Link></li>
              <li><Link to="/academics/placements">Placements</Link></li>
              <li><Link to="/notifications">Notices</Link></li>
            </ul>
          </SA>
          <SA variant="up" delay="sa-d3" className="f-col">
            <h4>Resource</h4>
            <ul className="f-links">
              <li><Link to="/publication/college-library">E-Library</Link></li>
              <li><Link to="/publication/e-magazine">Magazine</Link></li>
              <li><Link to="/syllabus">Syllabus</Link></li>
              <li><Link to="/contact">Support</Link></li>
            </ul>
          </SA>
          <SA variant="up" delay="sa-d3" className="f-col" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h4>Command</h4>
            <Link to="/admin" target="_blank" rel="noopener noreferrer" style={{ background: G, color: '#000', padding: '10px', borderRadius: 10, textAlign: 'center', fontWeight: 900, textDecoration: 'none', fontSize: 12 }}>ADMIN PORTAL</Link>
            <div style={{ padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
              <b>💡 Tip:</b> Press <b>Ctrl + K</b> to search anything.
            </div>
          </SA>
        </div>

        <SA variant="up" className="f-hud-ultima">
          <div className="hud-left">
            <div className="hud-status"><div className="pulse"></div> GNC SERVER: ONLINE</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 700 }}>⏲️ {time.toLocaleTimeString('en-IN', { hour12: true })}</div>
          </div>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 0.5, color: G }}>ESTD: 1970 | DHANBAD</div>
        </SA>
        <div className="f-final-line">
          <div>© {new Date().getFullYear()} <b>Guru Nanak College.</b> All rights reserved.</div>
          <div className="f-dev-pill">⚡ <b>React + Firebase</b> | Dev: <b>Pankaj Kumar</b></div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;