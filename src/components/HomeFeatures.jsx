// src/components/HomeFeatures.jsx
// ✅ Ultra Premium Fully Responsive — fluid grids, clamp() fonts
// ✅ Dept: 5col→3col→2col→1col, Facilities: auto-fill fluid
// ✅ Zero horizontal scroll, touch-friendly

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
  { slug:'bca',           short:'BCA',       full:'Bachelor of Computer\nApplications',   icon:'💻', color:'#0ea5e9', gradient:'linear-gradient(145deg,#0c1f5e 0%,#0369a1 55%,#0ea5e9 100%)', tagline:'Programming · Database\nSoftware Development', symbol:'{ }', path:'/academics/departments/bca'          },
  { slug:'bba',           short:'BBA',        full:'Bachelor of Business\nAdministration', icon:'📊', color:'#f59e0b', gradient:'linear-gradient(145deg,#3b1a02 0%,#b45309 55%,#f59e0b 100%)', tagline:'Management · Finance\nEntrepreneurship',       symbol:'↗',   path:'/academics/departments/bba'          },
  { slug:'commerce',      short:'Commerce',   full:'Department of\nCommerce',              icon:'🏦', color:'#10b981', gradient:'linear-gradient(145deg,#022c22 0%,#065f46 55%,#10b981 100%)', tagline:'Accounting · Business\nTax & Economics',       symbol:'₹',   path:'/academics/departments/commerce'     },
  { slug:'humanities',    short:'Humanities', full:'Department of\nHumanities',            icon:'📚', color:'#a78bfa', gradient:'linear-gradient(145deg,#1e0a4a 0%,#5b21b6 55%,#a78bfa 100%)', tagline:'English · Hindi\nLiterature & Philosophy',     symbol:'Aa',  path:'/academics/departments/humanities'   },
  { slug:'social-science',short:'Social Sci', full:'Department of\nSocial Science',        icon:'🌍', color:'#f87171', gradient:'linear-gradient(145deg,#3b0a0a 0%,#991b1b 55%,#f87171 100%)', tagline:'History · Geography\nPolitical Science',        symbol:'⊕',   path:'/academics/departments/social-science'},
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;600;700;800&display=swap');
  .hf-wrap { font-family:"Amazon Ember","DM Sans",-apple-system,BlinkMacSystemFont,sans-serif; }

  /* ── Glow card ── */
  .gc{position:relative;z-index:0;display:block;}
  .gc::before{content:'';position:absolute;inset:-3px;border-radius:inherit;background:conic-gradient(from 0deg,#a855f7,#ec4899,#f97316,#eab308,#06b6d4,#6366f1,#a855f7);opacity:0;filter:blur(10px);z-index:-1;transition:opacity .35s ease;}
  .gc:hover::before{opacity:.55;}
  .gc.r18{border-radius:20px;} .gc.r22{border-radius:24px;}

  /* ── Scroll anim ── */
  .sa2{opacity:0;transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1);}
  .sa2.up{transform:translateY(32px);} .sa2.scale{transform:scale(.94);} .sa2.fade{transform:none;}
  .sa2.vis{opacity:1;transform:none;}
  .sa2-d1{transition-delay:.06s;} .sa2-d2{transition-delay:.12s;} .sa2-d3{transition-delay:.18s;}
  .sa2-d4{transition-delay:.24s;} .sa2-d5{transition-delay:.30s;}
  @media(max-width:600px){
    .sa2{transition-duration:.4s;}
    .sa2-d1,.sa2-d2,.sa2-d3,.sa2-d4,.sa2-d5{transition-delay:0s;}
    .sa2.up{transform:translateY(18px);}
  }

  /* ── Section header ── */
  .hf-section-header{text-align:center;margin-bottom:clamp(32px,5vw,52px);}
  .hf-sec-label{
    display:inline-flex;align-items:center;gap:8px;
    background:rgba(15,35,71,.06);border:1px solid rgba(15,35,71,.12);
    color:${N};padding:5px 16px;border-radius:20px;
    font-size:clamp(9px,.75vw,11px);font-weight:800;letter-spacing:2px;
    text-transform:uppercase;margin-bottom:12px;
  }
  .hf-sec-h{
    font-family:'Syne',sans-serif;color:#111827;
    font-size:clamp(22px,3.5vw,42px);font-weight:900;
    margin:0 0 10px;letter-spacing:clamp(-.5px,-.05vw,-1px);line-height:1.1;
  }
  .hf-sec-h span{color:${G};}
  .hf-sec-sub{
    color:#6b7280;font-size:clamp(13px,.95vw,15px);
    max-width:520px;line-height:1.65;margin:0 auto;
  }

  /* ═══════════════════════════
     DEPARTMENTS SECTION
  ═══════════════════════════ */
  .hf-dept-sec{
    padding:clamp(50px,8vw,110px) clamp(16px,3vw,32px);
    background:#fff;position:relative;overflow:hidden;
  }
  .hf-dept-sec::before{
    content:'';position:absolute;inset:0;
    background-image:radial-gradient(#e5e7eb 1px,transparent 1px);
    background-size:28px 28px;opacity:.5;pointer-events:none;
  }
  .hf-dept-inner{max-width:1360px;margin:0 auto;position:relative;z-index:1;}

  /* Fluid 5-col grid */
  .hf-dept-grid{
    display:grid;
    grid-template-columns:repeat(5,1fr);
    gap:clamp(10px,1.5vw,18px);
  }

  /* Dept card */
  .hf-dc{
    position:relative;border-radius:22px;overflow:hidden;
    height:clamp(260px,28vw,360px);
    cursor:pointer;text-decoration:none;display:block;
    transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s;
  }
  .gc:hover .hf-dc{transform:translateY(-7px) scale(1.02);box-shadow:0 10px 32px rgba(0,0,0,.18);}
  .hf-dc-bg{position:absolute;inset:0;}
  .hf-dc::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 20%,rgba(0,0,0,.72) 100%);z-index:1;}
  .hf-dc-sym{position:absolute;top:10px;right:12px;font-size:clamp(44px,6vw,72px);font-weight:900;font-family:'Syne',sans-serif;color:rgba(255,255,255,.12);line-height:1;transition:transform .4s,opacity .4s;pointer-events:none;z-index:2;user-select:none;}
  .gc:hover .hf-dc-sym{transform:scale(1.2) rotate(-8deg);opacity:.22;}
  .hf-dc-top{position:absolute;top:14px;left:14px;z-index:3;background:rgba(255,255,255,.12);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.18);color:#fff;font-size:clamp(8px,.65vw,10px);font-weight:800;letter-spacing:1.5px;text-transform:uppercase;padding:4px 10px;border-radius:20px;}
  .hf-dc-body{position:absolute;bottom:0;left:0;right:0;padding:clamp(14px,2vw,22px);z-index:3;}
  .hf-dc-icon{width:clamp(36px,4vw,46px);height:clamp(36px,4vw,46px);border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:clamp(18px,2.2vw,23px);margin-bottom:10px;background:rgba(255,255,255,.18);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.25);transition:transform .3s;flex-shrink:0;}
  .gc:hover .hf-dc-icon{transform:rotate(-8deg) scale(1.1);}
  .hf-dc-name{font-family:'Syne',sans-serif;font-size:clamp(13px,1.3vw,17px);font-weight:900;color:#fff;white-space:pre-line;line-height:1.2;margin-bottom:7px;}
  .hf-dc-tag{font-size:clamp(10px,.85vw,12px);color:rgba(255,255,255,.65);white-space:pre-line;line-height:1.45;margin-bottom:14px;}
  .hf-dc-cta{display:inline-flex;align-items:center;gap:5px;font-size:clamp(9px,.75vw,11px);font-weight:800;letter-spacing:1px;text-transform:uppercase;padding:6px 12px;border-radius:7px;background:rgba(255,255,255,.14);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.2);color:#fff;transition:background .2s;}
  .gc:hover .hf-dc-cta{background:rgba(255,255,255,.26);}
  .hf-dc-cta .arr{display:inline-block;transition:transform .2s;}
  .gc:hover .hf-dc-cta .arr{transform:translateX(5px);}

  /* View all */
  .hf-viewall-wrap{display:flex;justify-content:center;margin-top:clamp(24px,3vw,38px);}
  .hf-viewall{display:inline-flex;align-items:center;gap:9px;background:${N};border:1px solid ${N};color:#fff;padding:clamp(10px,1.2vw,13px) clamp(20px,2.5vw,28px);border-radius:4px;font-size:clamp(12px,.9vw,13.5px);font-weight:700;text-decoration:none;transition:background .2s,transform .2s,box-shadow .2s;}
  .hf-viewall .arr{display:inline-block;transition:transform .2s;}
  .hf-viewall:hover{background:${G};border-color:${G};color:${N};box-shadow:0 4px 16px rgba(244,160,35,.35);transform:translateY(-2px);}
  .hf-viewall:hover .arr{transform:translateX(5px);}

  /* ═══════════════════════════
     FACILITIES SECTION
  ═══════════════════════════ */
  .hf-fac-sec{
    padding:clamp(50px,8vw,110px) clamp(16px,3vw,32px);
    background:#fff;position:relative;
    border-top:1px solid #f3f4f6;overflow:hidden;
  }
  .hf-fac-sec::before{content:'';position:absolute;inset:0;background-image:radial-gradient(#e5e7eb 1px,transparent 1px);background-size:28px 28px;opacity:.45;pointer-events:none;}
  .hf-fac-inner{max-width:1300px;margin:0 auto;position:relative;z-index:1;}
  .hf-fac-label{display:inline-flex;align-items:center;gap:8px;background:rgba(15,35,71,.06);border:1px solid rgba(15,35,71,.12);color:${N};padding:5px 16px;border-radius:20px;font-size:clamp(9px,.75vw,11px);font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;}
  .hf-fac-h{font-family:'Syne',sans-serif;color:#111827;font-size:clamp(22px,3vw,38px);font-weight:900;margin:0 0 10px;letter-spacing:-.7px;}
  .hf-fac-h span{color:${G};}
  .hf-fac-sub{color:#6b7280;font-size:clamp(13px,.95vw,15px);margin:0 auto clamp(30px,4vw,46px);max-width:500px;line-height:1.65;}

  /* Fluid facility grid */
  .hf-fac-grid{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(clamp(100px,11vw,145px),1fr));
    gap:clamp(10px,1.2vw,16px);
  }

  /* Facility card */
  .hf-fc{
    background:rgba(255,255,255,.9);backdrop-filter:blur(12px);
    border:1px solid #e5e7eb;border-radius:16px;
    padding:clamp(18px,2.5vw,28px) clamp(8px,1.2vw,14px) clamp(16px,2vw,22px);
    text-align:center;display:flex;flex-direction:column;align-items:center;
    gap:clamp(8px,1vw,12px);position:relative;overflow:hidden;
    transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s,border-color .25s;
    cursor:default;box-shadow:0 1px 4px rgba(0,0,0,.06);
  }
  .hf-fc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${G},${N});opacity:0;transition:opacity .25s;border-radius:16px 16px 0 0;}
  .gc:hover .hf-fc{transform:translateY(-6px) scale(1.03);box-shadow:0 10px 26px rgba(15,35,71,.1);border-color:transparent;}
  .gc:hover .hf-fc::before{opacity:1;}
  .hf-fc-icon{font-size:clamp(26px,3.5vw,38px);line-height:1;transition:transform .3s;filter:drop-shadow(0 3px 6px rgba(0,0,0,.1));}
  .gc:hover .hf-fc-icon{transform:scale(1.25) rotate(-8deg);}
  .hf-fc-name{font-size:clamp(9.5px,.8vw,12px);font-weight:800;color:${N};text-transform:uppercase;letter-spacing:.5px;line-height:1.3;text-align:center;transition:color .2s;}
  .gc:hover .hf-fc-name{color:${G};}

  /* ═══════════════════════════
     RESPONSIVE BREAKPOINTS
  ═══════════════════════════ */
  /* Large tablets */
  @media(max-width:1200px){
    .hf-dept-grid{grid-template-columns:repeat(3,1fr);}
    .hf-dc{height:clamp(240px,26vw,300px);}
  }
  /* Small tablets */
  @media(max-width:768px){
    .hf-dept-grid{grid-template-columns:repeat(2,1fr);}
    .hf-dc{height:clamp(220px,40vw,280px);}
    .hf-fac-grid{grid-template-columns:repeat(auto-fill,minmax(90px,1fr));}
  }
  /* Large phones */
  @media(max-width:480px){
    .hf-dept-grid{grid-template-columns:1fr 1fr;}
    .hf-dc{height:clamp(200px,48vw,250px);}
    .hf-dc-tag{display:none;}
    .hf-fac-grid{grid-template-columns:repeat(3,1fr);}
  }
  /* Small phones */
  @media(max-width:360px){
    .hf-dept-grid{grid-template-columns:1fr;}
    .hf-dc{height:200px;}
    .hf-fac-grid{grid-template-columns:repeat(2,1fr);}
  }
  /* Wide screens */
  @media(min-width:1400px){
    .hf-fac-grid{grid-template-columns:repeat(8,1fr);}
  }
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
      <div className="gc r22">
        <Link to={dept.path} className="hf-dc">
          <div className="hf-dc-bg" style={{ background: dept.gradient }} />
          <div className="hf-dc-sym">{dept.symbol}</div>
          <div className="hf-dc-top">{dept.short}</div>
          <div className="hf-dc-body">
            <div className="hf-dc-icon">{dept.icon}</div>
            <div className="hf-dc-name">{dept.full}</div>
            <div className="hf-dc-tag">{dept.tagline}</div>
            <div className="hf-dc-cta">Explore <span className="arr">›</span></div>
          </div>
        </Link>
      </div>
    </div>
  );
};

const FacCard = ({ ft, delay }) => {
  const [ref, vis] = useSA(0.05);
  return (
    <div ref={ref} className={`sa2 scale${vis?' vis':''} sa2-d${Math.min(delay+1,5)}`}>
      <div className="gc r18">
        <div className="hf-fc">
          <div className="hf-fc-icon">{ft.emoji}</div>
          <div className="hf-fc-name">{ft.name}</div>
        </div>
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
              <p className="hf-sec-sub">Har department mein expert faculty, modern curriculum aur career-ready approach</p>
            </div>
          </SA2>
          <div className="hf-dept-grid">
            {DEPTS.map((dept, i) => (
              <DeptCard key={dept.slug} dept={dept} delay={Math.min(i+1,5)} />
            ))}
          </div>
          <SA2 variant="fade">
            <div className="hf-viewall-wrap">
              <Link to="/academics/departments" className="hf-viewall">
                View All Departments <span className="arr">›</span>
              </Link>
            </div>
          </SA2>
        </div>
      </section>

      {/* ── FACILITIES ── */}
      <section className="hf-fac-sec">
        <div className="hf-fac-inner">
          <SA2 variant="up">
            <div className="hf-section-header" style={{ textAlign:'center', marginBottom:'clamp(30px,4vw,46px)' }}>
              <div><div className="hf-fac-label">⭐ World-Class Infrastructure</div></div>
              <h2 className="hf-fac-h">College <span>Facilities</span></h2>
              <p className="hf-fac-sub">Students ke holistic development ke liye — modern labs, library, sports aur bahut kuch</p>
            </div>
          </SA2>
          <div className="hf-fac-grid">
            {(facilities || []).map((ft, i) => (
              <FacCard key={i} ft={ft} delay={i % 5} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}