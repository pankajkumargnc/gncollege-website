// src/components/HomeFeatures.jsx
// ✅ Department section: Old 4-card design REMOVED → New 5-dept ultra-pro cards
// ✅ Each dept card links to /academics/departments/[slug]
// ✅ Facilities section: Ultra-pro glassmorphism rebuild
// ✅ Zero scroll listeners — IntersectionObserver only

import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../styles/colors';
import { facilities } from '../data/db';

const N  = COLORS?.navy     || '#0f2347';
const G  = COLORS?.gold     || '#f4a023';
const ND = COLORS?.navyDark || '#060e1c';

// ── Scroll animation hook (same pattern as HomePage) ──────────────────────────
function useSA(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) { setVis(true); return; }
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } }, { threshold, rootMargin: '0px 0px -50px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

// ── Department Config ─────────────────────────────────────────────────────────
const DEPTS = [
  {
    slug: 'bca', short: 'BCA', full: 'Bachelor of Computer\nApplications',
    icon: '💻', color: '#0ea5e9',
    gradient: 'linear-gradient(145deg,#0c1f5e 0%,#0369a1 55%,#0ea5e9 100%)',
    tagline: 'Programming · Database\nSoftware Development',
    symbol: '{ }',
    path: '/academics/departments/bca',
  },
  {
    slug: 'bba', short: 'BBA', full: 'Bachelor of Business\nAdministration',
    icon: '📊', color: '#f59e0b',
    gradient: 'linear-gradient(145deg,#3b1a02 0%,#b45309 55%,#f59e0b 100%)',
    tagline: 'Management · Finance\nEntrepreneurship',
    symbol: '↗',
    path: '/academics/departments/bba',
  },
  {
    slug: 'commerce', short: 'Commerce', full: 'Department of\nCommerce',
    icon: '🏦', color: '#10b981',
    gradient: 'linear-gradient(145deg,#022c22 0%,#065f46 55%,#10b981 100%)',
    tagline: 'Accounting · Business\nTax & Economics',
    symbol: '₹',
    path: '/academics/departments/commerce',
  },
  {
    slug: 'humanities', short: 'Humanities', full: 'Department of\nHumanities',
    icon: '📚', color: '#a78bfa',
    gradient: 'linear-gradient(145deg,#1e0a4a 0%,#5b21b6 55%,#a78bfa 100%)',
    tagline: 'English · Hindi\nLiterature & Philosophy',
    symbol: 'Aa',
    path: '/academics/departments/humanities',
  },
  {
    slug: 'social-science', short: 'Social\nScience', full: 'Department of\nSocial Science',
    icon: '🌍', color: '#f87171',
    gradient: 'linear-gradient(145deg,#3b0a0a 0%,#991b1b 55%,#f87171 100%)',
    tagline: 'History · Geography\nPolitical Science',
    symbol: '⊕',
    path: '/academics/departments/social-science',
  },
];

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;600;700;800&display=swap');

  /* ── Section wrapper ── */
  .hf-wrap { font-family:'DM Sans',sans-serif; }

  /* ── DEPARTMENTS ── */
  .hf-dept-sec {
    padding: clamp(70px,9vw,110px) 20px;
    background: ${ND};
    position: relative;
    overflow: hidden;
  }
  /* Animated noise texture */
  .hf-dept-sec::before {
    content:'';
    position:absolute;inset:0;
    background-image:
      radial-gradient(circle at 15% 85%, rgba(244,160,35,.07) 0%, transparent 45%),
      radial-gradient(circle at 85% 15%, rgba(14,165,233,.07) 0%, transparent 45%),
      radial-gradient(circle at 50% 50%, rgba(255,255,255,.02) 0%, transparent 70%);
    pointer-events:none;
  }
  .hf-dept-grid-bg {
    position:absolute;inset:0;
    background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events:none;
  }
  .hf-dept-inner { max-width:1340px; margin:0 auto; position:relative; z-index:1; }

  /* Section label */
  .hf-sec-label {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(244,160,35,.12);
    border: 1px solid rgba(244,160,35,.25);
    color: ${G}; padding: 5px 16px;
    border-radius: 20px; font-size: 11px;
    font-weight: 800; letter-spacing: 2px;
    text-transform: uppercase; margin-bottom: 14px;
  }
  .hf-sec-h { font-family:'Syne',sans-serif; color:#fff; font-size:clamp(26px,4vw,42px); font-weight:900; margin:0 0 10px; letter-spacing:-1px; line-height:1.1; }
  .hf-sec-h span { color:${G}; }
  .hf-sec-sub { color:rgba(255,255,255,.52); font-size:14.5px; max-width:500px; line-height:1.6; margin:0 0 48px; }

  /* Grid — 5 equal columns */
  .hf-dept-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }

  /* Card */
  .hf-dc {
    position: relative;
    border-radius: 22px;
    overflow: hidden;
    height: 340px;
    cursor: pointer;
    text-decoration: none;
    display: block;
    transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
  }
  .hf-dc:hover { transform: translateY(-10px) scale(1.02); }

  /* Card background gradient */
  .hf-dc-bg {
    position: absolute; inset: 0;
    transition: opacity .4s;
  }
  .hf-dc::after {
    content:'';
    position:absolute;inset:0;
    background: linear-gradient(to bottom, transparent 20%, rgba(0,0,0,.7) 100%);
    z-index:1;
  }

  /* Big symbol */
  .hf-dc-sym {
    position: absolute; top: 12px; right: 16px;
    font-size: 72px; font-weight: 900;
    font-family: 'Syne', sans-serif;
    color: rgba(255,255,255,.12);
    line-height: 1;
    transition: transform .4s, opacity .4s;
    pointer-events: none; z-index: 2;
    user-select: none;
  }
  .hf-dc:hover .hf-dc-sym { transform: scale(1.2) rotate(-8deg); opacity: .22; }

  /* Short label top-left */
  .hf-dc-top {
    position: absolute; top: 18px; left: 18px;
    z-index: 3;
    background: rgba(255,255,255,.12);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,.18);
    color: #fff; font-size: 10px; font-weight: 800;
    letter-spacing: 1.5px; text-transform: uppercase;
    padding: 4px 10px; border-radius: 20px;
  }

  /* Content at bottom */
  .hf-dc-body {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 22px 20px;
    z-index: 3;
    transform: translateY(0);
    transition: transform .3s;
  }

  /* Icon */
  .hf-dc-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; margin-bottom: 12px;
    background: rgba(255,255,255,.18);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,.25);
    transition: transform .3s;
  }
  .hf-dc:hover .hf-dc-icon { transform: rotate(-8deg) scale(1.1); }

  .hf-dc-name {
    font-family: 'Syne', sans-serif;
    font-size: 17px; font-weight: 900; color: #fff;
    white-space: pre-line; line-height: 1.2; margin-bottom: 8px;
  }
  .hf-dc-tag {
    font-size: 11.5px; color: rgba(255,255,255,.65);
    white-space: pre-line; line-height: 1.5; margin-bottom: 16px;
  }

  /* CTA */
  .hf-dc-cta {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 800; letter-spacing: 1px;
    text-transform: uppercase;
    padding: 7px 14px; border-radius: 8px;
    transition: transform .2s, background .2s;
    background: rgba(255,255,255,.15);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,.2);
    color: #fff;
  }
  .hf-dc:hover .hf-dc-cta {
    background: rgba(255,255,255,.28);
    transform: translateX(4px);
  }

  /* Shine on hover */
  .hf-dc::before {
    content:'';
    position:absolute;
    top:-100%;left:-60%;
    width:40%;height:300%;
    background:linear-gradient(105deg,transparent,rgba(255,255,255,.1),transparent);
    transform:rotate(10deg);
    transition:left .6s;
    z-index:4;
    pointer-events:none;
  }
  .hf-dc:hover::before { left:130%; }

  /* View all */
  .hf-viewall {
    display: inline-flex; align-items: center; gap: 9px;
    margin-top: 36px;
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.15);
    color: rgba(255,255,255,.8);
    padding: 12px 28px; border-radius: 50px;
    font-size: 13.5px; font-weight: 700;
    text-decoration: none;
    transition: background .22s, color .22s, border-color .22s, transform .22s;
  }
  .hf-viewall:hover {
    background: ${G}; border-color: ${G};
    color: ${N}; transform: translateY(-2px);
  }

  /* ── FACILITIES ── */
  .hf-fac-sec {
    padding: clamp(70px,9vw,110px) 20px;
    background: #f8fafc;
    position: relative;
    overflow: hidden;
  }
  .hf-fac-sec::before {
    content:'';position:absolute;inset:0;
    background: radial-gradient(circle at 90% 10%, rgba(244,160,35,.05) 0%, transparent 50%),
                radial-gradient(circle at 10% 90%, rgba(15,35,71,.04) 0%, transparent 50%);
    pointer-events:none;
  }
  .hf-fac-inner { max-width:1280px; margin:0 auto; position:relative; z-index:1; }

  /* Fac section title */
  .hf-fac-label {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(15,35,71,.07);
    border: 1px solid rgba(15,35,71,.12);
    color: ${N}; padding: 5px 16px;
    border-radius: 20px; font-size: 11px;
    font-weight: 800; letter-spacing: 2px;
    text-transform: uppercase; margin-bottom: 14px;
  }
  .hf-fac-h { font-family:'Syne',sans-serif; color:${N}; font-size:clamp(24px,3.5vw,38px); font-weight:900; margin:0 0 10px; letter-spacing:-.8px; }
  .hf-fac-h span { color:${G}; }
  .hf-fac-sub { color:#64748b; font-size:14.5px; margin:0 0 44px; max-width:480px; line-height:1.6; }

  /* Facilities grid */
  .hf-fac-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 14px;
  }

  /* Facility card — glassmorphism */
  .hf-fc {
    background: rgba(255,255,255,.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,.7);
    border-radius: 18px;
    padding: 28px 12px 22px;
    text-align: center;
    display: flex; flex-direction: column;
    align-items: center; gap: 11px;
    position: relative; overflow: hidden;
    transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s, border-color .25s;
    cursor: default;
    box-shadow: 0 2px 12px rgba(15,35,71,.05);
  }
  .hf-fc::before {
    content:'';
    position:absolute;top:0;left:0;right:0;
    height:3px;
    background: linear-gradient(90deg,${G},${N});
    opacity:0; transition:opacity .25s;
    border-radius:18px 18px 0 0;
  }
  .hf-fc:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 18px 36px rgba(15,35,71,.12);
    border-color: rgba(244,160,35,.3);
    background: #fff;
  }
  .hf-fc:hover::before { opacity:1; }

  .hf-fc-icon {
    font-size: 36px; line-height: 1;
    transition: transform .3s;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,.12));
  }
  .hf-fc:hover .hf-fc-icon { transform: scale(1.25) rotate(-8deg); }

  .hf-fc-name {
    font-size: 11.5px; font-weight: 800; color: ${N};
    text-transform: uppercase; letter-spacing: .6px;
    line-height: 1.3; text-align: center;
  }
  .hf-fc:hover .hf-fc-name { color: ${G}; }

  /* Responsive */
  @media(max-width:1100px){ .hf-dept-grid{grid-template-columns:repeat(3,1fr);} .hf-dc{height:300px;} }
  @media(max-width:700px) { .hf-dept-grid{grid-template-columns:repeat(2,1fr);} }
  @media(max-width:420px) { .hf-dept-grid{grid-template-columns:1fr;} .hf-dc{height:260px;} }
  @media(min-width:1200px){ .hf-fac-grid{grid-template-columns:repeat(8,1fr);} }

  /* Scroll animation base */
  .sa2{opacity:0;transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1);}
  .sa2.up{transform:translateY(36px);}
  .sa2.scale{transform:scale(.93);}
  .sa2.fade{transform:none;}
  .sa2.vis{opacity:1;transform:none;}
  .sa2-d1{transition-delay:.06s;} .sa2-d2{transition-delay:.12s;} .sa2-d3{transition-delay:.18s;}
  .sa2-d4{transition-delay:.24s;} .sa2-d5{transition-delay:.30s;}
  @media(max-width:600px){.sa2{transition-duration:.42s;}.sa2-d1,.sa2-d2,.sa2-d3,.sa2-d4,.sa2-d5{transition-delay:0s;}}
`;

// ── SA2 Component ─────────────────────────────────────────────────────────────
const SA2 = ({ children, variant = 'up', d = '', tag: Tag = 'div', style = {}, className = '' }) => {
  const [ref, vis] = useSA();
  return (
    <Tag ref={ref} className={`sa2 ${variant}${vis ? ' vis' : ''}${d ? ` sa2-${d}` : ''}${className ? ' ' + className : ''}`} style={style}>
      {children}
    </Tag>
  );
};

// ── Dept Card ─────────────────────────────────────────────────────────────────
const DeptCard = ({ dept, delay }) => {
  const [ref, vis] = useSA(0.08);
  return (
    <div ref={ref} className={`sa2 up${vis ? ' vis' : ''} sa2-d${delay}`}>
      <Link to={dept.path} className="hf-dc">
        {/* Gradient background */}
        <div className="hf-dc-bg" style={{ background: dept.gradient }} />

        {/* Big decorative symbol */}
        <div className="hf-dc-sym">{dept.symbol}</div>

        {/* Top badge */}
        <div className="hf-dc-top">{dept.short.replace('\n', ' ')}</div>

        {/* Content */}
        <div className="hf-dc-body">
          <div className="hf-dc-icon">{dept.icon}</div>
          <div className="hf-dc-name">{dept.full}</div>
          <div className="hf-dc-tag">{dept.tagline}</div>
          <div className="hf-dc-cta">
            Read More
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

// ── Facility Card ─────────────────────────────────────────────────────────────
const FacCard = ({ ft, delay }) => {
  const [ref, vis] = useSA(0.05);
  return (
    <div ref={ref} className={`sa2 scale${vis ? ' vis' : ''} sa2-d${Math.min(delay + 1, 5)}`}>
      <div className="hf-fc">
        <div className="hf-fc-icon">{ft.emoji}</div>
        <div className="hf-fc-name">{ft.name}</div>
      </div>
    </div>
  );
};

// ── Main Export ───────────────────────────────────────────────────────────────
export default function HomeFeatures() {
  return (
    <div className="hf-wrap">
      <style>{CSS}</style>

      {/* ═══════════════════════════════════════════════
          SECTION 1 — OUR ACADEMIC DEPARTMENTS
          Dark navy background, 5 gradient cards
      ═══════════════════════════════════════════════ */}
      <section className="hf-dept-sec">
        <div className="hf-dept-grid-bg" />

        <div className="hf-dept-inner">
          {/* Header */}
          <SA2 variant="up">
            <div className="hf-sec-label">🏛️ Academic Excellence</div>
            <h2 className="hf-sec-h">Our Academic <span>Departments</span></h2>
            <p className="hf-sec-sub">
              Har department mein expert faculty, modern curriculum aur career-ready approach — future leaders ke liye
            </p>
          </SA2>

          {/* 5 Cards */}
          <div className="hf-dept-grid">
            {DEPTS.map((dept, i) => (
              <DeptCard key={dept.slug} dept={dept} delay={Math.min(i + 1, 5)} />
            ))}
          </div>


        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          SECTION 2 — COLLEGE FACILITIES
          Light bg, glassmorphism cards, 8-col grid
      ═══════════════════════════════════════════════ */}
      <section className="hf-fac-sec">
        <div className="hf-fac-inner">
          {/* Header */}
          <SA2 variant="up">
            <div className="hf-fac-label">⭐ World-Class Infrastructure</div>
            <h2 className="hf-fac-h">College <span>Facilities</span></h2>
            <p className="hf-fac-sub">
              Students ke holistic development ke liye — modern labs, library, sports aur bahut kuch
            </p>
          </SA2>

          {/* Facilities grid */}
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