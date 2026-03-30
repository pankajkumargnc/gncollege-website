// src/components/HomeFeatures.jsx
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../styles/colors';
import { facilities } from '../data/db';

const N  = COLORS?.navy     || '#0f2347';
const G  = COLORS?.gold     || '#f4a023';

function useSA(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) { setVis(true); return; }
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

const DEPTS = [
  { slug:'bca',           short:'BCA',       full:'Bachelor of Computer Applications',   icon:'💻', grad:'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', desc:'Master the world of Programming, AI, and Cloud computing.', symbol:'{ }', path:'/academics/departments/bca' },
  { slug:'bba',           short:'BBA',       full:'Bachelor of Business Administration', icon:'📊', grad:'linear-gradient(135deg, #3b0a0a 0%, #7f1d1d 100%)', desc:'Develop leadership, finance, and entrepreneurial skills.', symbol:'↗', path:'/academics/departments/bba' },
  { slug:'commerce',      short:'Commerce',  full:'Department of Commerce',              icon:'🏦', grad:'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', desc:'Advanced studies in Accounting, Taxation, and Trade.', symbol:'₹', path:'/academics/departments/commerce' },
  { slug:'humanities',    short:'Humanities',full:'Department of Humanities',            icon:'📚', grad:'linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%)', desc:'Explore the richness of English and Hindi Literature.', symbol:'Aa', path:'/academics/departments/humanities' },
  { slug:'social-science',short:'Social Sci',full:'Department of Social Science',        icon:'🌍', grad:'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)', desc:'In-depth look into History, Geography, and Politics.', symbol:'⊕', path:'/academics/departments/social-science' },
];

const CSS = `
  .hf-wrap { font-family:"Plus Jakarta Sans", "Inter", sans-serif; }

  /* ── Glow card ── */
  .gc{position:relative;z-index:0;display:block;}
  .gc::before{content:'';position:absolute;inset:-3px;border-radius:inherit;background:conic-gradient(from 0deg,#a855f7,#ec4899,#f97316,#eab308,#06b6d4,#6366f1,#a855f7);opacity:0;filter:blur(10px);z-index:-1;transition:opacity .35s ease;}
  .gc:hover::before{opacity:.55;}
  .gc.r30{border-radius:30px;} 

  /* ── Scroll anim ── */
  .sa2{opacity:0;transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1);}
  .sa2.up{transform:translateY(32px);} .sa2.scale{transform:scale(.94);} .sa2.fade{transform:none;}
  .sa2.vis{opacity:1;transform:none;}
  .sa2-d1{transition-delay:.06s;} .sa2-d2{transition-delay:.12s;} .sa2-d3{transition-delay:.18s;}
  .sa2-d4{transition-delay:.24s;} .sa2-d5{transition-delay:.30s;}

  /* ── Section header ── */
  .hf-section-header{text-align:center;margin-bottom:clamp(40px,6vw,64px);}
  .hf-sec-label{
    display:inline-flex;align-items:center;gap:8px;
    background:rgba(15,35,71,.06);border:1px solid rgba(15,35,71,.12);
    color:${N};padding:6px 18px;border-radius:50px;
    font-size:clamp(10px,.8vw,12px);font-weight:800;letter-spacing:2px;
    text-transform:uppercase;margin-bottom:14px;
  }
  
  .hf-sec-h{
    color: ${N}; font-size: clamp(32px, 5vw, 54px); font-weight: 800; line-height: 1.1; letter-spacing: -1.5px; margin: 0 0 16px;
  }
  .hf-sec-h span{color:${G};}
  .hf-sec-sub{ color:#64748b; font-size:clamp(14px,1vw,16px); max-width:580px; line-height:1.7; margin:0 auto; }

  /* ═══════════════════════════
     ULTRA PRO MAX DEPARTMENTS
  ═══════════════════════════ */
  .hf-dept-sec {
    padding: clamp(60px, 10vw, 130px) clamp(16px, 4vw, 40px);
    background: #f8fafc; position: relative; overflow: hidden;
  }
  
  .hf-dept-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: clamp(16px, 2.2vw, 30px);
    max-width: 1440px; margin: 0 auto;
  }

  .hf-dc {
    position: relative; border-radius: 24px; overflow: hidden;
    height: clamp(190px, 18vw, 260px);
    background: #0f172a;
    cursor: pointer; text-decoration: none; display: flex; flex-direction: column;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    border: 1px solid rgba(255,255,255,0.05);
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.3);
  }
  
  .hf-dc::before {
    content: ''; position: absolute; inset: 0;
    background: var(--grad); opacity: 0.85; z-index: 1;
    transition: opacity 0.5s ease;
  }
  
  .hf-dc-bg-gfx {
    position: absolute; inset: 0; z-index: 1; opacity: 0.35;
    background-image: 
      radial-gradient(circle at 100% 0%, rgba(255,255,255,0.12) 0%, transparent 50%),
      linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.06) 50%, transparent 55%);
    background-size: 100% 100%, 20px 20px;
    transition: transform 1.2s ease;
  }

  .gc:hover .hf-dc {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px -15px rgba(0,0,0,0.45);
    border-color: rgba(255,255,255,0.22);
  }
  .gc:hover .hf-dc-bg-gfx { transform: scale(1.3) rotate(8deg); }

  .hf-dc-sym {
    position: absolute; top: -10px; right: -10px;
    font-size: 100px; font-weight: 900; opacity: 0.08;
    color: #fff; z-index: 2; transition: all 0.8s ease;
    filter: blur(1.5px); pointer-events: none;
    font-family: 'Syne', sans-serif;
  }
  .gc:hover .hf-dc-sym { transform: translate(-20px, 20px) scale(1.1) rotate(-15deg); opacity: 0.18; filter: blur(0); }

  .hf-dc-content {
    position: relative; z-index: 10; flex: 1;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 20px 25px;
  }

  .hf-dc-badge {
    position: absolute; top: 20px; left: 20px;
    padding: 5px 12px; background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px); border-radius: 50px;
    font-size: 9px; font-weight: 900; color: #fff;
    text-transform: uppercase; letter-spacing: 1.5px;
    border: 1px solid rgba(255,255,255,0.1);
  }

  .hf-dc-icon-box {
    width: 54px; height: 54px; border-radius: 15px;
    background: rgba(255,255,255,0.18);
    backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; margin-bottom: 12px;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .gc:hover .hf-dc-icon-box { transform: scale(1.1) rotate(-10deg); background: #fff; color: ${N}; }

  .hf-dc-name {
    font-size: clamp(17px, 2vw, 22px); font-weight: 900;
    color: #fff; line-height: 1.15; margin-bottom: 10px;
    letter-spacing: -0.6px;
  }

  .hf-dc-desc {
    display: none;
  }

  .hf-dc-btn {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 900; color: #fff;
    text-transform: uppercase; letter-spacing: 1.2px;
    transition: all 0.3s;
  }
  .hf-dc-btn::after { content: '→'; font-size: 16px; transition: transform 0.3s; }
  .gc:hover .hf-dc-btn { color: ${G}; }
  .gc:hover .hf-dc-btn::after { transform: translateX(7px); }

  /* Facility card */
  .hf-fc{
    background: #fff; border: 1px solid #eef2f6; border-radius: 24px;
    padding: 35px 20px; text-align: center;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 5px 15px rgba(15,35,71,0.03);
    display: flex; flex-direction: column; align-items: center; gap: 15px;
  }
  .hf-fc-icon { font-size: 44px; transition: transform 0.4s; }
  .hf-fc-name { font-size: 12px; font-weight: 800; color: ${N}; text-transform: uppercase; letter-spacing: 1px; }
  .gc:hover .hf-fc { transform: translateY(-12px); box-shadow: 0 25px 50px -12px rgba(15,35,71,0.12); border-color: ${G}; }
  .gc:hover .hf-fc-icon { transform: scale(1.3) rotate(-10deg); }

  @media(max-width: 1250px){ .hf-dept-grid { grid-template-columns: repeat(3, 1fr); } }
  @media(max-width: 900px){ .hf-dept-grid { grid-template-columns: repeat(2, 1fr); } }
  @media(max-width: 550px){ .hf-dept-grid { grid-template-columns: 1fr; } .hf-dc { height: 420px; } }
`;

const SA2 = ({ children, variant='up', d='', tag:Tag='div', style={}, className='' }) => {
  const [ref, vis] = useSA();
  return (
    <Tag ref={ref}
      className={`sa2 ${variant}${vis?' vis':''}${d?` sa2-${d}`:''}${className?' '+className:''}`}
      style={style}
    >{children}</Tag>
  );
};

const DeptCard = ({ dept, delay }) => {
  const [ref, vis] = useSA(0.08);
  return (
    <div ref={ref} className={`sa2 up${vis?' vis':''} sa2-d${delay}`}>
      <div className="gc r30">
        <Link to={dept.path} className="hf-dc" style={{ '--grad': dept.grad }}>
          <div className="hf-dc-bg-gfx" />
          <div className="hf-dc-sym">{dept.symbol}</div>
          <div className="hf-dc-badge">{dept.short}</div>
          
          <div className="hf-dc-content">
            <div className="hf-dc-icon-box">{dept.icon}</div>
            <h3 className="hf-dc-name">{dept.full}</h3>
            <p className="hf-dc-desc">{dept.desc}</p>
            <div className="hf-dc-btn">Explore Course</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default function HomeFeatures() {
  return (
    <div className="hf-wrap">
      <style>{CSS}</style>

      {/* ── DEPARTMENTS ── */}
      <section className="hf-dept-sec">
        <div className="hf-dept-inner">
          <SA2 variant="up">
            <div className="hf-section-header">
              <div><div className="hf-sec-label">🏛️ Academic Excellence</div></div>
              <h2 className="hf-sec-h">Our Academic <span>Departments</span></h2>
              <p className="hf-sec-sub">Expert faculty aur modern curriculum ke saath bright career banayein.</p>
            </div>
          </SA2>
          <div className="hf-dept-grid">
            {DEPTS.map((dept, i) => (
              <DeptCard key={dept.slug} dept={dept} delay={Math.min(i+1,5)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITIES ── */}
      <section style={{ padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <SA2 variant="up">
            <div className="hf-section-header">
              <div><div className="hf-sec-label">⭐ Campus Life</div></div>
              <h2 className="hf-sec-h">Premium <span>Facilities</span></h2>
              <p className="hf-sec-sub">Holistic development ke liye modern infrastructure aur best facilities.</p>
            </div>
          </SA2>
          <div style={{ display:'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 20 }}>
            {(facilities || []).map((ft, i) => (
              <div key={i} className="gc r30">
                <div className="hf-fc">
                  <div className="hf-fc-icon">{ft.emoji}</div>
                  <div className="hf-fc-name">{ft.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}