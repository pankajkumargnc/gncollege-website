// src/components/HomeFeatures.jsx
// ✅ All headings + eyebrow labels + subtitles — center aligned
// ✅ White bg both sections
// ✅ Glow hover on all cards
// ✅ Trailing arrow on CTA links

import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../styles/colors';
import { facilities } from '../data/db';

const N  = COLORS?.navy     || '#0f2347';
const G  = COLORS?.gold     || '#f4a023';
const ND = COLORS?.navyDark || '#060e1c';

function useSA(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) { setVis(true); return; }
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

const DEPTS = [
  { slug:'bca',          short:'BCA',      full:'Bachelor of Computer\nApplications', icon:'💻', color:'#0ea5e9', gradient:'linear-gradient(145deg,#0c1f5e 0%,#0369a1 55%,#0ea5e9 100%)', tagline:'Programming · Database\nSoftware Development', symbol:'{ }', path:'/academics/departments/bca' },
  { slug:'bba',          short:'BBA',      full:'Bachelor of Business\nAdministration', icon:'📊', color:'#f59e0b', gradient:'linear-gradient(145deg,#3b1a02 0%,#b45309 55%,#f59e0b 100%)', tagline:'Management · Finance\nEntrepreneurship', symbol:'↗', path:'/academics/departments/bba' },
  { slug:'commerce',     short:'Commerce', full:'Department of\nCommerce', icon:'🏦', color:'#10b981', gradient:'linear-gradient(145deg,#022c22 0%,#065f46 55%,#10b981 100%)', tagline:'Accounting · Business\nTax & Economics', symbol:'₹', path:'/academics/departments/commerce' },
  { slug:'humanities',   short:'Humanities',full:'Department of\nHumanities', icon:'📚', color:'#a78bfa', gradient:'linear-gradient(145deg,#1e0a4a 0%,#5b21b6 55%,#a78bfa 100%)', tagline:'English · Hindi\nLiterature & Philosophy', symbol:'Aa', path:'/academics/departments/humanities' },
  { slug:'social-science',short:'Social\nScience',full:'Department of\nSocial Science', icon:'🌍', color:'#f87171', gradient:'linear-gradient(145deg,#3b0a0a 0%,#991b1b 55%,#f87171 100%)', tagline:'History · Geography\nPolitical Science', symbol:'⊕', path:'/academics/departments/social-science' },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;600;700;800&display=swap');
  .hf-wrap{font-family:"Amazon Ember","DM Sans",-apple-system,BlinkMacSystemFont,sans-serif;}

  /* ── Glow wrapper ── */
  .gc{position:relative;z-index:0;display:block;}
  .gc::before{content:'';position:absolute;inset:-3px;border-radius:inherit;background:conic-gradient(from 0deg,#a855f7,#ec4899,#f97316,#eab308,#06b6d4,#6366f1,#a855f7);opacity:0;filter:blur(10px);z-index:-1;transition:opacity .35s ease;}
  .gc:hover::before{opacity:.6;}
  .gc.r4{border-radius:6px;} .gc.r18{border-radius:20px;} .gc.r22{border-radius:24px;}

  /* ── Dept Section — white bg ── */
  .hf-dept-sec{
    padding:clamp(70px,9vw,110px) 20px;
    background:#fff;
    position:relative;overflow:hidden;
  }
  .hf-dept-sec::before{
    content:'';position:absolute;inset:0;
    background-image:radial-gradient(#e5e7eb 1px,transparent 1px);
    background-size:28px 28px;opacity:.55;pointer-events:none;
  }
  .hf-dept-inner{max-width:1340px;margin:0 auto;position:relative;z-index:1;}

  /* ── CENTER: Eyebrow + heading + subtitle ── */
  .hf-section-header{text-align:center;margin-bottom:48px;}

  .hf-sec-label{
    display:inline-flex;align-items:center;gap:8px;
    background:rgba(15,35,71,.06);border:1px solid rgba(15,35,71,.12);
    color:${N};padding:5px 16px;border-radius:20px;font-size:11px;
    font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;
  }
  .hf-sec-h{
    font-family:'Syne',sans-serif;color:#111827;
    font-size:clamp(26px,4vw,42px);font-weight:900;
    margin:0 0 10px;letter-spacing:-1px;line-height:1.1;
  }
  .hf-sec-h span{color:${G};}
  .hf-sec-sub{
    color:#6b7280;font-size:14.5px;
    max-width:500px;line-height:1.6;margin:0 auto;  /* auto = center */
  }

  /* 5-column grid */
  .hf-dept-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;}

  /* Inner dept card */
  .hf-dc{position:relative;border-radius:22px;overflow:hidden;height:340px;cursor:pointer;text-decoration:none;display:block;transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s;}
  .gc:hover .hf-dc{transform:translateY(-8px) scale(1.02);box-shadow:0 8px 32px rgba(0,0,0,.18);}
  .hf-dc-bg{position:absolute;inset:0;}
  .hf-dc::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 20%,rgba(0,0,0,.72) 100%);z-index:1;}
  .hf-dc-sym{position:absolute;top:12px;right:16px;font-size:72px;font-weight:900;font-family:'Syne',sans-serif;color:rgba(255,255,255,.12);line-height:1;transition:transform .4s,opacity .4s;pointer-events:none;z-index:2;user-select:none;}
  .gc:hover .hf-dc-sym{transform:scale(1.2) rotate(-8deg);opacity:.22;}
  .hf-dc-top{position:absolute;top:18px;left:18px;z-index:3;background:rgba(255,255,255,.12);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.18);color:#fff;font-size:10px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;padding:4px 10px;border-radius:20px;}
  .hf-dc-body{position:absolute;bottom:0;left:0;right:0;padding:22px 20px;z-index:3;}
  .hf-dc-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:12px;background:rgba(255,255,255,.18);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.25);transition:transform .3s;}
  .gc:hover .hf-dc-icon{transform:rotate(-8deg) scale(1.1);}
  .hf-dc-name{font-family:'Syne',sans-serif;font-size:17px;font-weight:900;color:#fff;white-space:pre-line;line-height:1.2;margin-bottom:8px;}
  .hf-dc-tag{font-size:11.5px;color:rgba(255,255,255,.65);white-space:pre-line;line-height:1.5;margin-bottom:16px;}
  .hf-dc-cta{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;padding:7px 14px;border-radius:8px;background:rgba(255,255,255,.15);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.2);color:#fff;transition:background .2s;}
  .gc:hover .hf-dc-cta{background:rgba(255,255,255,.28);}
  .hf-dc-cta .arr{display:inline-block;transition:transform .2s;}
  .gc:hover .hf-dc-cta .arr{transform:translateX(5px);}
  .hf-dc::before{content:'';position:absolute;top:-100%;left:-60%;width:40%;height:300%;background:linear-gradient(105deg,transparent,rgba(255,255,255,.1),transparent);transform:rotate(10deg);transition:left .6s;z-index:4;pointer-events:none;}
  .gc:hover .hf-dc::before{left:130%;}

  /* View all btn */
  .hf-viewall{display:inline-flex;align-items:center;gap:9px;margin-top:36px;background:${N};border:1px solid ${N};color:#fff;padding:12px 28px;border-radius:4px;font-size:13.5px;font-weight:700;text-decoration:none;transition:background .2s,box-shadow .2s,transform .2s;}
  .hf-viewall .arr{display:inline-block;transition:transform .2s;}
  .hf-viewall:hover{background:${G};border-color:${G};color:${N};box-shadow:0 4px 16px rgba(244,160,35,.35);transform:translateY(-2px);}
  .hf-viewall:hover .arr{transform:translateX(5px);}
  /* Center the view all btn */
  .hf-viewall-wrap{display:flex;justify-content:center;}

  /* ── Facilities Section — white bg ── */
  .hf-fac-sec{padding:clamp(70px,9vw,110px) 20px;background:#fff;position:relative;border-top:1px solid #f3f4f6;overflow:hidden;}
  .hf-fac-sec::before{content:'';position:absolute;inset:0;background-image:radial-gradient(#e5e7eb 1px,transparent 1px);background-size:28px 28px;opacity:.5;pointer-events:none;}
  .hf-fac-inner{max-width:1280px;margin:0 auto;position:relative;z-index:1;}

  .hf-fac-label{display:inline-flex;align-items:center;gap:8px;background:rgba(15,35,71,.06);border:1px solid rgba(15,35,71,.12);color:${N};padding:5px 16px;border-radius:20px;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;}
  .hf-fac-h{font-family:'Syne',sans-serif;color:#111827;font-size:clamp(24px,3.5vw,38px);font-weight:900;margin:0 0 10px;letter-spacing:-.8px;}
  .hf-fac-h span{color:${G};}
  .hf-fac-sub{color:#6b7280;font-size:14.5px;margin:0 auto 44px;max-width:480px;line-height:1.6;}

  /* Facilities grid */
  .hf-fac-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:14px;}

  /* Facility card */
  .hf-fc{background:rgba(255,255,255,.9);backdrop-filter:blur(12px);border:1px solid #e5e7eb;border-radius:18px;padding:28px 12px 22px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:11px;position:relative;overflow:hidden;transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s,border-color .25s;cursor:default;box-shadow:0 1px 4px rgba(0,0,0,.06);}
  .hf-fc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${G},${N});opacity:0;transition:opacity .25s;border-radius:18px 18px 0 0;}
  .gc:hover .hf-fc{transform:translateY(-6px) scale(1.03);box-shadow:0 8px 24px rgba(15,35,71,.1);border-color:transparent;}
  .gc:hover .hf-fc::before{opacity:1;}
  .hf-fc-icon{font-size:36px;line-height:1;transition:transform .3s;filter:drop-shadow(0 4px 8px rgba(0,0,0,.12));}
  .gc:hover .hf-fc-icon{transform:scale(1.25) rotate(-8deg);}
  .hf-fc-name{font-size:11.5px;font-weight:800;color:${N};text-transform:uppercase;letter-spacing:.6px;line-height:1.3;text-align:center;transition:color .2s;}
  .gc:hover .hf-fc-name{color:${G};}

  /* Responsive */
  @media(max-width:1100px){.hf-dept-grid{grid-template-columns:repeat(3,1fr);}.hf-dc{height:300px;}}
  @media(max-width:700px){.hf-dept-grid{grid-template-columns:repeat(2,1fr);}}
  @media(max-width:420px){.hf-dept-grid{grid-template-columns:1fr;}.hf-dc{height:260px;}}
  @media(min-width:1200px){.hf-fac-grid{grid-template-columns:repeat(8,1fr);}}

  /* Scroll animations */
  .sa2{opacity:0;transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1);}
  .sa2.up{transform:translateY(36px);} .sa2.scale{transform:scale(.93);} .sa2.fade{transform:none;}
  .sa2.vis{opacity:1;transform:none;}
  .sa2-d1{transition-delay:.06s;} .sa2-d2{transition-delay:.12s;} .sa2-d3{transition-delay:.18s;}
  .sa2-d4{transition-delay:.24s;} .sa2-d5{transition-delay:.30s;}
  @media(max-width:600px){.sa2{transition-duration:.42s;}.sa2-d1,.sa2-d2,.sa2-d3,.sa2-d4,.sa2-d5{transition-delay:0s;}}
`;

const SA2 = ({ children, variant='up', d='', tag:Tag='div', style={}, className='' }) => {
  const [ref, vis] = useSA();
  return (
    <Tag ref={ref}
      className={`sa2 ${variant}${vis?' vis':''}${d?` sa2-${d}`:''}${className?' '+className:''}`}
      style={style}
    >
      {children}
    </Tag>
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
          <div className="hf-dc-top">{dept.short.replace('\n',' ')}</div>
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

      {/* ════ SECTION 1 — DEPARTMENTS ════ */}
      <section className="hf-dept-sec">
        <div className="hf-dept-inner">

          {/* ✅ CENTER: eyebrow + heading + subtitle */}
          <SA2 variant="up">
            <div className="hf-section-header">
              <div><div className="hf-sec-label">🏛️ Academic Excellence</div></div>
              <h2 className="hf-sec-h">Our Academic <span>Departments</span></h2>
              <p className="hf-sec-sub">
                Har department mein expert faculty, modern curriculum aur career-ready approach — future leaders ke liye
              </p>
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

      {/* ════ SECTION 2 — FACILITIES ════ */}
      <section className="hf-fac-sec">
        <div className="hf-fac-inner">

          {/* ✅ CENTER: eyebrow + heading + subtitle */}
          <SA2 variant="up">
            <div className="hf-section-header" style={{ textAlign:'center', marginBottom:44 }}>
              <div><div className="hf-fac-label">⭐ World-Class Infrastructure</div></div>
              <h2 className="hf-fac-h">College <span>Facilities</span></h2>
              <p className="hf-fac-sub">
                Students ke holistic development ke liye — modern labs, library, sports aur bahut kuch
              </p>
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
