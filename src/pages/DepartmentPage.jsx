// src/pages/DepartmentPage.jsx
// ══════════════════════════════════════════════════════════════════
//  UNIVERSAL DEPARTMENT TEMPLATE  —  100 % Firebase-driven
//  Ek hi file → sab 5 departments handle karti hai
//  Admin Panel se data change karo → page auto-update hoga
//
//  Firebase path:  departments/{slug}
//  Faculty path:   faculties  (where dept == slug-label)
// ══════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  doc, collection, query, where, onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';

/* ── brand colours ─────────────────────────────────────────────── */
const NAVY = COLORS?.navy || '#0f2347';
const FALLBACK_IMG = '/images/college_photo.jpg';

/* ── per-department static config (icon / palette / faculty keys) ─ */
const DEPT_META = {
  bca: {
    short: 'BCA', icon: '💻', color: '#0ea5e9',
    heroBg: 'linear-gradient(145deg,#f0f9ff,#dbeafe 50%,#fef9ec)',
    facultyKeys: ['BCA'],
  },
  bba: {
    short: 'BBA', icon: '📊', color: '#f59e0b',
    heroBg: 'linear-gradient(145deg,#fffbeb,#fef3c7 50%,#f0f9ff)',
    facultyKeys: ['BBA'],
  },
  commerce: {
    short: 'Commerce', icon: '🏦', color: '#10b981',
    heroBg: 'linear-gradient(145deg,#f0fdf4,#d1fae5 50%,#fef9ec)',
    facultyKeys: ['Commerce'],
  },
  humanities: {
    short: 'Humanities', icon: '📚', color: '#8b5cf6',
    heroBg: 'linear-gradient(145deg,#faf5ff,#ede9fe 50%,#f0f9ff)',
    facultyKeys: ['Hindi', 'English'],
    tabs: [
      { label: 'Dept. of Hindi',   key: 'Hindi',   icon: '📖' },
      { label: 'Dept. of English', key: 'English', icon: '📝' },
    ],
  },
  'social-science': {
    short: 'Social Science', icon: '🌍', color: '#ef4444',
    heroBg: 'linear-gradient(145deg,#fff5f5,#fee2e2 50%,#fef9ec)',
    facultyKeys: ['History', 'Political Science', 'Economics'],
    tabs: [
      { label: 'History',            key: 'History',            icon: '🏛️' },
      { label: 'Political Science',  key: 'Political Science',  icon: '⚖️' },
      { label: 'Economics',          key: 'Economics',          icon: '📈' },
    ],
  },
};

/* ══════════════════════════════════════════════════════════════════
   SMALL HELPERS
══════════════════════════════════════════════════════════════════ */
function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) { setVis(true); return; }
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.07, rootMargin: '0px 0px -36px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

const Fade = ({ children, delay = 0, y = 22, style = {} }) => {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : `translateY(${y}px)`,
      transition: `opacity .58s cubic-bezier(.22,1,.36,1) ${delay}s,
                   transform  .58s cubic-bezier(.22,1,.36,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
};

const Pill = ({ txt, color }) => (
  <span style={{
    background: `${color}14`, border: `1px solid ${color}2a`,
    color, fontSize: 11, fontWeight: 700,
    padding: '3px 10px', borderRadius: 20,
    display: 'inline-block',
  }}>{txt}</span>
);

const SectionLabel = ({ txt, color }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
    <div style={{ width: 18, height: 2, background: `linear-gradient(90deg,${color},transparent)`, borderRadius: 2 }} />
    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color }}>
      {txt}
    </span>
  </div>
);

const SectionHead = ({ label, title, color }) => (
  <Fade>
    <SectionLabel txt={label} color={color} />
    <h2 style={{
      fontFamily: "'Plus Jakarta Sans',sans-serif",
      fontSize: 'clamp(20px,2.8vw,28px)', fontWeight: 800,
      color: NAVY, margin: '0 0 28px', letterSpacing: '-.4px',
    }}>{title}</h2>
  </Fade>
);

const EmptyBox = ({ icon, msg, sub, color }) => (
  <div style={{
    textAlign: 'center', padding: '44px 24px',
    background: `${color}07`, borderRadius: 16,
    border: `1.5px dashed ${color}28`,
  }}>
    <div style={{ fontSize: 38, marginBottom: 10 }}>{icon}</div>
    <div style={{ fontWeight: 700, color: NAVY, fontSize: 14, marginBottom: 5 }}>{msg}</div>
    {sub && <div style={{ color: '#94a3b8', fontSize: 12.5 }}>{sub}</div>}
  </div>
);

/* ── Spinner ─────────────────────────────────────────────────────── */
const Spin = ({ color = NAVY }) => (
  <>
    <style>{`@keyframes dp-spin{to{transform:rotate(360deg)}}`}</style>
    <div style={{
      width: 38, height: 38, margin: '60px auto',
      border: `3px solid ${color}22`, borderTopColor: color,
      borderRadius: '50%', animation: 'dp-spin .75s linear infinite',
    }} />
  </>
);

/* ══════════════════════════════════════════════════════════════════
   FACULTY CARD
══════════════════════════════════════════════════════════════════ */
const FacCard = ({ fac, color }) => {
  const [err, setErr] = useState(false);
  const isHod = fac.desig?.toLowerCase().includes('head');
  return (
    <div style={{
      background: '#fff', borderRadius: 18, overflow: 'hidden',
      border: `1.5px solid ${isHod ? color + '40' : '#f1f5f9'}`,
      boxShadow: isHod ? `0 4px 20px ${color}1a` : '0 2px 12px rgba(15,35,71,.06)',
      transition: 'transform .22s, box-shadow .22s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 14px 32px ${color}20`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = isHod ? `0 4px 20px ${color}1a` : '0 2px 12px rgba(15,35,71,.06)'; }}
    >
      {/* Photo */}
      <div style={{ position: 'relative', paddingTop: '110%', background: `linear-gradient(160deg,${color}10,${color}05)`, overflow: 'hidden' }}>
        <img
          src={err || !fac.imageUrl ? FALLBACK_IMG : fac.imageUrl}
          alt={fac.name}
          onError={() => setErr(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
        />
        {isHod && (
          <div style={{
            position: 'absolute', top: 10, left: 10,
            background: color, color: '#fff',
            fontSize: 9, fontWeight: 800, padding: '3px 10px',
            borderRadius: 20, letterSpacing: '.8px', textTransform: 'uppercase',
            boxShadow: `0 3px 10px ${color}55`,
          }}>HOD</div>
        )}
      </div>
      {/* Info */}
      <div style={{ padding: '14px 16px 18px' }}>
        <div style={{ fontWeight: 800, fontSize: 14, color: NAVY, marginBottom: 3, lineHeight: 1.3 }}>
          {fac.name || '—'}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 7 }}>{fac.desig || 'Faculty'}</div>
        {fac.qual && (
          <div style={{ fontSize: 11, color: '#64748b', background: `${color}0e`, border: `1px solid ${color}22`, borderRadius: 7, padding: '3px 8px', marginBottom: 5 }}>
            🎓 {fac.qual}
          </div>
        )}
        {fac.specialization && (
          <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.4, marginBottom: 4 }}>
            ✦ {fac.specialization}
          </div>
        )}
        {fac.email && (
          <a href={`mailto:${fac.email}`}
            style={{ display: 'block', fontSize: 10.5, color: '#94a3b8', marginTop: 7, textDecoration: 'none', wordBreak: 'break-all', transition: 'color .15s' }}
            onMouseEnter={e => e.currentTarget.style.color = color}
            onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
          >✉ {fac.email}</a>
        )}
      </div>
    </div>
  );
};


/* ══════════════════════════════════════════════════════════════════
   FACULTY SECTION  (live Firestore, tabs for multi-dept)
══════════════════════════════════════════════════════════════════ */
const FacultySection = ({ keys = [], tabs, color }) => {
  const [map,    setMap]    = useState({});
  const [counts, setCounts] = useState({});
  const [active, setActive] = useState(tabs?.[0]?.key || keys[0] || '');
  const [loading, setLoading] = useState(true);
  // ✅ B5 FIX: Set tracks which keys resolved — spinner only hides when ALL done
  const resolvedRef = useRef(new Set());

  useEffect(() => {
    if (!keys.length) { setLoading(false); return; }
    setLoading(true);
    resolvedRef.current = new Set();
    const localMap = {};
    const unsubs = [];

    const markResolved = (k) => {
      resolvedRef.current.add(k);
      if (resolvedRef.current.size >= keys.length) setLoading(false);
    };

    keys.forEach(k => {
      const sort = arr =>
        [...arr].sort((a, b) => {
          if (a.desig?.toLowerCase().includes('head')) return -1;
          if (b.desig?.toLowerCase().includes('head')) return 1;
          return (a.name || '').localeCompare(b.name || '');
        });

      const q = query(
        collection(db, 'faculties'),
        where('dept', '==', k),
        where('staffType', '==', 'Teaching')
      );
      const u = onSnapshot(q, snap => {
        localMap[k] = sort(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setMap({ ...localMap });
        setCounts(p => ({ ...p, [k]: localMap[k].length }));
        markResolved(k);
      }, () => {
        // Fallback: no compound index, filter client-side
        const q2 = query(collection(db, 'faculties'), where('dept', '==', k));
        const u2 = onSnapshot(q2, snap => {
          localMap[k] = sort(
            snap.docs.map(d => ({ id: d.id, ...d.data() }))
              .filter(f => (f.staffType || 'Teaching') === 'Teaching')
          );
          setMap({ ...localMap });
          setCounts(p => ({ ...p, [k]: localMap[k].length }));
          markResolved(k);
        }, () => markResolved(k)); // Even total failure → unblock spinner
        unsubs.push(u2);
      });
      unsubs.push(u);
    });

    return () => unsubs.forEach(u => u());
  }, [keys.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps


  const total = Object.values(counts).reduce((s, v) => s + v, 0);
  const list  = map[active] || [];

  return (
    <div>
      {/* Header */}
      <Fade>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
          <div>
            <SectionLabel txt="Faculty Roster" color={color} />
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(20px,2.8vw,28px)', fontWeight: 800, color: NAVY, margin: '0 0 4px', letterSpacing: '-.4px' }}>
              Meet the Faculty
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 12.5, margin: 0 }}>Admin Panel se add/remove karein — real-time update hoga</p>
          </div>
          {total > 0 && (
            <div style={{ background: `linear-gradient(135deg,${NAVY},#1a3a7c)`, color: '#fff', padding: '7px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
              {total} Member{total !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </Fade>

      {/* Accent bar */}
      <div style={{ height: 3, borderRadius: 99, background: `linear-gradient(90deg,${color},transparent)`, margin: '16px 0 28px' }} />

      {/* Tabs (Humanities / Social Science) */}
      {tabs && tabs.length > 1 && (
        <Fade delay={0.06}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, marginBottom: 32, borderBottom: '2px solid #f1f5f9' }}>
            {tabs.map(tab => {
              const on = active === tab.key;
              return (
                <button key={tab.key} onClick={() => setActive(tab.key)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '11px 20px', border: 'none', fontFamily: 'inherit',
                    fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
                    color: on ? '#fff' : '#64748b',
                    background: on ? `linear-gradient(135deg,${NAVY},#1a3a7c)` : 'transparent',
                    borderRadius: '8px 8px 0 0', marginBottom: -2,
                    borderBottom: '3px solid transparent',
                    transition: 'all .18s',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{tab.icon}</span>
                  {tab.label}
                  {(counts[tab.key] || 0) > 0 && (
                    <span style={{
                      background: on ? 'rgba(255,255,255,.22)' : '#f1f5f9',
                      color: on ? '#fff' : '#64748b',
                      fontSize: 11, fontWeight: 800, padding: '1px 7px', borderRadius: 10,
                    }}>
                      {counts[tab.key]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Fade>
      )}

      {/* Cards */}
      {loading ? <Spin color={color} /> : list.length === 0 ? (
        <EmptyBox icon="👨‍🏫" msg="Faculty data abhi available nahi"
          sub={`Admin Panel → Faculty Directory → Dept: ${active} mein add karein`}
          color={color} />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(188px,1fr))', gap: 18 }}>
          {list.map((fac, i) => (
            <Fade key={fac.id} delay={i * 0.05} y={16}>
              <FacCard fac={fac} color={color} />
            </Fade>
          ))}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   PDF VIEWER MODAL
══════════════════════════════════════════════════════════════════ */
const PdfModal = ({ pdf, onClose }) => {
  // ✅ B12 FIX: Escape key se modal band ho
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
  <div
    onClick={onClose}
    style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(15,35,71,.72)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}
  >
    <div
      onClick={e => e.stopPropagation()}
      style={{
        background: '#fff', borderRadius: 20, overflow: 'hidden',
        width: '92%', maxWidth: 920, height: '88vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 32px 64px rgba(0,0,0,.32)',
      }}
    >
      <div style={{ background: NAVY, color: '#fff', padding: '13px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>📄</span>
          <span style={{ fontWeight: 800, fontSize: 14 }}>{pdf.title}</span>
          {pdf.year && <span style={{ fontSize: 12, opacity: .7 }}>• {pdf.year}</span>}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href={pdf.pdfUrl} target="_blank" rel="noreferrer"
            style={{ background: 'rgba(255,255,255,.15)', color: '#fff', padding: '5px 13px', borderRadius: 8, textDecoration: 'none', fontSize: 12, fontWeight: 700 }}>
            ↗ Open
          </a>
          <button onClick={onClose}
            style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: 14 }}>
            ✕
          </button>
        </div>
      </div>
      <iframe src={pdf.pdfUrl} title={pdf.title} style={{ flex: 1, border: 'none', width: '100%' }} />
    </div>
  </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   SINGLE DEPARTMENT PAGE  (universal template)
══════════════════════════════════════════════════════════════════ */
function SingleDeptPage({ slug }) {
  const meta            = DEPT_META[slug] || { short: slug.toUpperCase(), icon: '🏛️', color: NAVY, heroBg: 'linear-gradient(145deg,#f8fafc,#f1f5f9)', facultyKeys: [slug] };
  const C               = meta.color;
  const [data, setData] = useState(null);
  const [loading, setL] = useState(true);
  const [semTab, setSem] = useState(null);
  const [pdfOpen, setPdf] = useState(null);

  /* Firestore listener */
  useEffect(() => {
    setSem(null); // ✅ B10 FIX: Reset semester tab when switching departments
    const unsub = onSnapshot(doc(db, 'departments', slug), snap => {
      const d = snap.exists() ? snap.data() : {};
      setData(d);
      const sems = Object.keys(d.curriculum || {});
      if (sems.length) setSem(sems[0]);
      setL(false);
    }, () => setL(false));
    return () => unsub();
  }, [slug]);

  if (loading) return <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}><Spin color={C} /></div>;

  const d              = data || {};
  const curriculum     = d.curriculum     || {};
  const semKeys        = Object.keys(curriculum);
  const feeRows        = d.feeStructure   || [];
  const achievements   = d.achievements   || [];
  const reports        = d.programReports || [];
  const highlights     = d.highlights     || [];
  const facilities     = d.facilities     || [];
  const facultyKeys    = meta.facultyKeys || [meta.short];

  const activeSem = semTab || semKeys[0];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", background: '#f8fafc', minHeight: '100vh', color: '#334155' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        @keyframes dp-spin{to{transform:rotate(360deg)}}

        .dp-hl{background:#fff;border:1.5px solid #f1f5f9;border-radius:16px;padding:22px 20px;height:100%;transition:all .22s;}
        .dp-hl:hover{border-color:${C}3a;box-shadow:0 10px 28px ${C}12;transform:translateY(-3px);}

        .dp-fac-card{background:#fff;border:1.5px solid #f1f5f9;border-radius:14px;padding:20px;
          display:flex;gap:14px;align-items:flex-start;transition:all .2s;}
        .dp-fac-card:hover{border-color:${C}38;box-shadow:0 6px 20px ${C}0e;}

        .dp-rep{display:flex;align-items:center;gap:16px;background:#fff;border:1.5px solid #f1f5f9;
          border-radius:14px;padding:18px 20px;cursor:pointer;transition:all .2s;}
        .dp-rep:hover{border-color:${C}38;box-shadow:0 6px 20px ${C}0e;}

        .dp-ach{display:flex;gap:12px;align-items:flex-start;padding:14px 18px;
          background:#fff;border:1.5px solid #f1f5f9;border-radius:12px;transition:border-color .18s;}
        .dp-ach:hover{border-color:${C}38;}

        .dp-subj{display:flex;align-items:center;gap:11px;padding:11px 15px;
          background:#fff;border:1.5px solid #f1f5f9;border-radius:10px;transition:all .18s;}
        .dp-subj:hover{border-color:${C}38;background:${C}06;transform:translateX(4px);}

        .dp-sem{padding:8px 17px;border:1.5px solid #e2e8f0;border-radius:9px;background:#fff;
          color:#64748b;font-family:inherit;font-size:12.5px;font-weight:600;cursor:pointer;transition:all .18s;}
        .dp-sem:hover{border-color:${C};color:${C};}
        .dp-sem.on{background:linear-gradient(135deg,${NAVY},#1a3a7c);color:#fff;border-color:transparent;box-shadow:0 4px 14px ${C}28;}

        .dp-fee-hd{display:grid;grid-template-columns:2fr 1fr 2fr;
          background:linear-gradient(135deg,${NAVY},#1a3a7c);padding:13px 20px;border-radius:14px 14px 0 0;}
        .dp-fee-row{display:grid;grid-template-columns:2fr 1fr 2fr;padding:14px 20px;border-bottom:1px solid #f1f5f9;}
        .dp-fee-row:last-child{border-bottom:none;}
        .dp-fee-row:nth-child(even){background:#f8fafc;}

        @media(max-width:900px){
          .dp-g3{grid-template-columns:1fr 1fr !important;}
        }
        @media(max-width:640px){
          .dp-g3{grid-template-columns:1fr !important;}
          .dp-g2{grid-template-columns:1fr !important;}
          .dp-fee-hd,.dp-fee-row{grid-template-columns:1fr 1fr !important;}
          .dp-fee-note{display:none;}
        }
      `}</style>

      {/* ════ HERO ════════════════════════════════════════════════════ */}
      <div style={{ background: meta.heroBg, borderBottom: `1px solid ${C}1a`, padding: '60px 20px 52px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -70, width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle,${C}16 0%,transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -50, left: '8%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(244,160,35,.07) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb Start */}
          {/* <div style={{ fontSize: 12.5, color: '#94a3b8', marginBottom: 28, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            {[['Home', '/'], ['Academics', '/academics'], ['Departments', '/academics/departments']].map(([l, h]) => (
              <span key={h} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Link to={h} style={{ color: 'inherit', textDecoration: 'none', transition: 'color .15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = C}
                  onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>{l}</Link>
                <span style={{ opacity: .4 }}>›</span>
              </span>
            ))}
            <span style={{ color: NAVY, fontWeight: 600 }}>{meta.short}</span>
          </div> */}
          {/* Breadcrumb End */}
          {/* Two-col layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 40, alignItems: 'center' }}>

            {/* Left — name + CTA */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${C}16`, color: C, fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 20, marginBottom: 18, letterSpacing: '.5px' }}>
                {meta.icon} Academic Department
              </div>

              <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(28px,4.5vw,52px)', fontWeight: 800, color: NAVY, lineHeight: 1.06, letterSpacing: '-1.5px', margin: '0 0 14px' }}>
                {d.fullName || meta.fullName || d.name || meta.short}
              </h1>

              {d.tagline && (
                <p style={{ fontSize: 15.5, color: '#64748b', lineHeight: 1.8, maxWidth: 480, margin: '0 0 22px', fontWeight: 400 }}>
                  {d.tagline}
                </p>
              )}

              {/* Sub-dept pills */}
              {facultyKeys.length > 1 && (
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 24 }}>
                  {facultyKeys.map(k => <Pill key={k} txt={k} color={C} />)}
                </div>
              )}

              {/* CTA buttons — ✅ FIX: onClick+scrollIntoView, href="#" React Router mein blank page deta hai */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button
                  onClick={() => document.getElementById('faculty')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  style={{ background: `linear-gradient(135deg,${NAVY},#1a3a7c)`, color: '#fff', padding: '11px 24px', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: 13.5, boxShadow: `0 4px 16px ${NAVY}28`, display: 'inline-flex', alignItems: 'center', gap: 7, cursor: 'pointer', fontFamily: 'inherit' }}>
                  👨‍🏫 Faculty Roster
                </button>
                {feeRows.length > 0 && (
                  <button
                    onClick={() => document.getElementById('fees')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    style={{ background: '#fff', border: `1.5px solid ${C}`, color: C, padding: '11px 24px', borderRadius: 10, fontWeight: 700, fontSize: 13.5, display: 'inline-flex', alignItems: 'center', gap: 7, cursor: 'pointer', fontFamily: 'inherit' }}>
                    💰 Fee Structure
                  </button>
                )}
              </div>
            </div>

            {/* Right — info card */}
            <div style={{ background: '#fff', borderRadius: 22, padding: 26, boxShadow: `0 8px 36px ${C}16`, border: `1px solid ${C}1e` }}>

              {/* HOD row */}
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ width: 54, height: 54, borderRadius: 14, background: `${C}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0, overflow: 'hidden' }}>
                  {d.hod?.imageUrl
                    ? <img src={d.hod.imageUrl} alt={d.hod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : '👨‍🏫'}
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, letterSpacing: '.6px', textTransform: 'uppercase', marginBottom: 3 }}>Head of Department</div>
                  <div style={{ fontWeight: 800, color: NAVY, fontSize: 15 }}>{d.hod?.name || 'Add from Admin Panel'}</div>
                  {d.hod?.qual && <div style={{ fontSize: 12, color: C, fontWeight: 600, marginTop: 2 }}>{d.hod.qual}</div>}
                </div>
              </div>

              {/* Stats grid */}
              {(d.stats || []).length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  {d.stats.slice(0, 4).map((s, i) => (
                    <div key={i} style={{ padding: '14px 12px', borderRight: i % 2 === 0 ? '1px solid #f1f5f9' : 'none', borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none', textAlign: 'center' }}>
                      {s.icon && <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>}
                      <div style={{ fontSize: 18, fontWeight: 800, color: NAVY, lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: C, fontWeight: 700, marginTop: 3 }}>{s.label}</div>
                      {s.sub && <div style={{ fontSize: 10.5, color: '#94a3b8', marginTop: 2 }}>{s.sub}</div>}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  {[{ l: 'Programme', v: 'UG Degree' }, { l: 'Duration', v: '3 Years' }, { l: 'University', v: 'BBMKU' }, { l: 'Status', v: 'UGC Approved' }].map((s, i) => (
                    <div key={i} style={{ padding: '13px 12px', borderRight: i % 2 === 0 ? '1px solid #f1f5f9' : 'none', borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none', textAlign: 'center' }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: NAVY }}>{s.v}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginTop: 2 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ════ BODY ════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>

        {/* ── ABOUT + VISION / MISSION ──────────────────────────── */}
        {(d.about || d.vision || d.mission) && (
          <div style={{ padding: '64px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40 }}>
            {d.about && (
              <Fade>
                <SectionLabel txt="About the Department" color={C} />
                <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 800, color: NAVY, margin: '0 0 14px', letterSpacing: '-.4px' }}>
                  About <span style={{ color: C }}>{meta.short}</span>
                </h2>
                <p style={{ color: '#64748b', lineHeight: 1.9, fontSize: 15, margin: 0 }}>{d.about}</p>
              </Fade>
            )}
            {(d.vision || d.mission) && (
              <Fade delay={0.1}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {d.vision && (
                    <div style={{ background: `${C}08`, border: `1.5px solid ${C}1e`, borderRadius: 16, padding: '20px 22px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 9, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎯</div>
                        <span style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>Vision</span>
                      </div>
                      <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: 13.5, margin: 0 }}>{d.vision}</p>
                    </div>
                  )}
                  {d.mission && (
                    <div style={{ background: '#fef9ec', border: '1.5px solid #fed7aa', borderRadius: 16, padding: '20px 22px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 9, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🚀</div>
                        <span style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>Mission</span>
                      </div>
                      <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: 13.5, margin: 0 }}>{d.mission}</p>
                    </div>
                  )}
                </div>
              </Fade>
            )}
          </div>
        )}

        {/* ── HIGHLIGHTS ────────────────────────────────────────── */}
        {highlights.length > 0 && (
          <div style={{ padding: '64px 0 0' }}>
            <SectionHead label="Highlights" title="Why Choose Us?" color={C} />
            <div className="dp-g3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {highlights.map((h, i) => (
                <Fade key={i} delay={i * .06} y={18}>
                  <div className="dp-hl">
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: `${C}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 12 }}>{h.icon}</div>
                    <div style={{ fontWeight: 700, color: NAVY, fontSize: 13.5, marginBottom: 6, lineHeight: 1.4 }}>{h.title}</div>
                    <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.65 }}>{h.desc}</div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        )}

        {/* ── FACILITIES ────────────────────────────────────────── */}
        {facilities.length > 0 && (
          <div style={{ padding: '64px 0 0' }}>
            <SectionHead label="Infrastructure" title="Labs & Facilities" color={C} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14 }}>
              {facilities.map((f, i) => (
                <Fade key={i} delay={i * .07} y={16}>
                  <div style={{ display: 'flex', gap: 14, background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: 14, padding: '18px 20px', alignItems: 'flex-start', transition: 'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${C}38`; e.currentTarget.style.boxShadow = `0 6px 18px ${C}0c`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${C}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{f.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: NAVY, fontSize: 14, marginBottom: 4 }}>{f.name}</div>
                      <div style={{ color: '#64748b', fontSize: 12.5, lineHeight: 1.6 }}>{f.desc}</div>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        )}

        {/* ── CURRICULUM ────────────────────────────────────────── */}
        {semKeys.length > 0 && (
          <div id="curriculum" style={{ padding: '64px 0 0' }}>
            <SectionHead label="Academic Curriculum" title="Semester-wise Subjects" color={C} />
            <Fade delay={0.06}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
                {semKeys.map(k => (
                  <button key={k} className={`dp-sem${activeSem === k ? ' on' : ''}`} onClick={() => setSem(k)}>{k}</button>
                ))}
              </div>
            </Fade>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 10 }}>
              {(curriculum[activeSem] || []).map((subj, i) => (
                <Fade key={i} delay={i * .04} y={14}>
                  <div className="dp-subj">
                    <div style={{ width: 27, height: 27, borderRadius: 7, background: `linear-gradient(135deg,${NAVY},#1a3a7c)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#fff' }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <span style={{ fontSize: 13.5, color: '#334155', fontWeight: 500, lineHeight: 1.4 }}>{subj}</span>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        )}

        {/* ── FACULTY ───────────────────────────────────────────── */}
        <div id="faculty" style={{ padding: '64px 0 0' }}>
          <FacultySection keys={facultyKeys} tabs={meta.tabs} color={C} />
        </div>

        {/* ── FEE STRUCTURE ─────────────────────────────────────── */}
        <div id="fees" style={{ padding: '64px 0 0' }}>
          <SectionHead label="Academic Fees" title="Fee Structure" color={C} />
          {feeRows.length === 0 ? (
            <Fade><EmptyBox icon="💰" msg="Fee structure abhi add nahi ki gayi" sub="Admin Panel → Departments → [Dept] → Fee Structure mein add karein" color={C} /></Fade>
          ) : (
            <Fade delay={0.06}>
              <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(15,35,71,.06)' }}>
                {/* Header */}
                <div className="dp-fee-hd">
                  {['Fee Category', 'Amount (₹)', 'Notes'].map(h => (
                    <div key={h} className={h === 'Notes' ? 'dp-fee-note' : ''} style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,.75)', letterSpacing: '.5px', textTransform: 'uppercase' }}>{h}</div>
                  ))}
                </div>
                {/* Rows */}
                {feeRows.map((row, i) => (
                  <div key={i} className="dp-fee-row">
                    <div style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>{row.category}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: C }}>₹ {Number(row.amount).toLocaleString('en-IN')}</div>
                    <div className="dp-fee-note" style={{ fontSize: 13, color: '#64748b' }}>{row.note || '—'}</div>
                  </div>
                ))}
                {/* Total row */}
                {feeRows.length > 1 && (
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', padding: '14px 20px', background: `${C}0a`, borderTop: `2px solid ${C}1e` }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>Total Annual Fee</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: C }}>
                      ₹ {feeRows.reduce((s, r) => s + (Number(r.amount) || 0), 0).toLocaleString('en-IN')}
                    </div>
                    <div />
                  </div>
                )}
              </div>
            </Fade>
          )}
        </div>

        {/* ── PROGRAMME / ACTIVITY REPORTS ──────────────────────── */}
        <div style={{ padding: '64px 0 0' }}>
          <SectionHead label="Reports & Documents" title="Programme & Activity Reports" color={C} />
          {reports.length === 0 ? (
            <Fade><EmptyBox icon="📋" msg="Koi report upload nahi ki gayi" sub="Admin Panel → Departments → [Dept] → Reports mein PDF link add karein" color={C} /></Fade>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
              {reports.map((rep, i) => (
                <Fade key={i} delay={i * .06} y={14}>
                  <div className="dp-rep" onClick={() => setPdf(rep)}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>📄</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, color: NAVY, fontSize: 13.5, marginBottom: 3, lineHeight: 1.3 }}>{rep.title}</div>
                      <div style={{ fontSize: 12, color: '#94a3b8' }}>{rep.year || ''}</div>
                    </div>
                    <div style={{ background: `${C}12`, border: `1.5px solid ${C}28`, color: C, fontSize: 11.5, fontWeight: 800, padding: '5px 12px', borderRadius: 8, flexShrink: 0 }}>
                      VIEW →
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          )}
        </div>

        {/* ── ACHIEVEMENTS ──────────────────────────────────────── */}
        <div style={{ padding: '64px 0 0' }}>
          <SectionHead label="Achievements" title="Department Milestones" color={C} />
          {achievements.length === 0 ? (
            <Fade><EmptyBox icon="🏆" msg="Achievements abhi add nahi ki gayi" sub="Admin Panel → Departments → [Dept] → Achievements mein add karein" color={C} /></Fade>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 12 }}>
              {achievements.map((a, i) => (
                <Fade key={i} delay={i * .05} y={14}>
                  <div className="dp-ach">
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: `linear-gradient(135deg,${C},${C}88)`, flexShrink: 0, marginTop: 7, boxShadow: `0 0 6px ${C}55` }} />
                    <span style={{ color: '#475569', fontSize: 13.5, lineHeight: 1.65 }}>{a}</span>
                  </div>
                </Fade>
              ))}
            </div>
          )}
        </div>

        {/* ── HOD MESSAGE ───────────────────────────────────────── */}
        <div style={{ padding: '64px 0 80px' }}>
          <SectionHead label="From the Head of Department" title="HOD's Message" color={C} />
          <Fade delay={0.08}>
            <div className="dp-g2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
              {/* HOD card */}
              <div style={{ background: `linear-gradient(145deg,${C}0a,${C}04)`, border: `1.5px solid ${C}1e`, borderRadius: 20, padding: '28px 26px' }}>
                <div style={{ width: 68, height: 68, borderRadius: 16, overflow: 'hidden', background: `${C}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, marginBottom: 16, border: `2px solid ${C}28` }}>
                  {d.hod?.imageUrl
                    ? <img src={d.hod.imageUrl} alt={d.hod?.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    : '👨‍🏫'}
                </div>
                <div style={{ fontWeight: 800, color: NAVY, fontSize: 17, marginBottom: 3 }}>{d.hod?.name || 'Prof. [Name]'}</div>
                <div style={{ color: C, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{d.hod?.desig || `HOD, ${meta.short}`}</div>
                {d.hod?.qual && <div style={{ color: '#94a3b8', fontSize: 12.5, marginBottom: 16 }}>{d.hod.qual}</div>}
                <div style={{ borderTop: `1px solid ${C}1e`, paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {d.hod?.email && <a href={`mailto:${d.hod.email}`} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#475569', fontSize: 13, textDecoration: 'none' }}><span style={{ color: C }}>✉</span>{d.hod.email}</a>}
                  {d.hod?.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#475569', fontSize: 13 }}><span style={{ color: C }}>📞</span>{d.hod.phone}</div>}
                </div>
              </div>
              {/* Message */}
              <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: 20, padding: '28px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 48, color: `${C}35`, fontFamily: 'Georgia,serif', lineHeight: 1, marginBottom: 12 }}>"</div>
                <p style={{ color: '#475569', lineHeight: 1.9, fontSize: 15, margin: '0 0 14px', fontStyle: 'italic' }}>
                  {d.hod?.message || 'Admin Panel → Departments → HOD Info → Message mein add karein.'}
                </p>
                <div style={{ fontSize: 48, color: `${C}35`, fontFamily: 'Georgia,serif', lineHeight: 1, textAlign: 'right' }}>"</div>
              </div>
            </div>
          </Fade>
        </div>

      </div>{/* /body */}

      {/* Back link */}
      <div style={{ borderTop: '1px solid #f1f5f9', padding: '22px 20px', textAlign: 'center' }}>
        <Link to="/academics/departments"
          style={{ color: '#94a3b8', fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7, transition: 'color .15s' }}
          onMouseEnter={e => e.currentTarget.style.color = C}
          onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
        >← Back to All Departments</Link>
      </div>

      {/* PDF modal */}
      {pdfOpen && <PdfModal pdf={pdfOpen} onClose={() => setPdf(null)} />}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HUB PAGE  —  /academics/departments
══════════════════════════════════════════════════════════════════ */
function HubPage() {
  const [cards, setCards] = useState([]);
  const [loading, setL] = useState(true);

  useEffect(() => {
    const slugs = Object.keys(DEPT_META);
    const map = {};
    // ✅ B9 FIX: Use Set so multiple Firestore re-fires don't break the counter
    const loaded = new Set();
    const maybeSetCards = () => {
      if (loaded.size >= slugs.length) {
        setCards(slugs.map(s => map[s]));
        setL(false);
      }
    };
    const unsubs = slugs.map(slug => {
      return onSnapshot(doc(db, 'departments', slug), snap => {
        map[slug] = { slug, ...DEPT_META[slug], ...(snap.exists() ? snap.data() : {}) };
        loaded.add(slug);
        // Always update cards after initial load (real-time updates)
        if (loaded.size >= slugs.length) {
          setCards(slugs.map(s => map[s]));
          setL(false);
        }
      }, () => {
        map[slug] = { slug, ...DEPT_META[slug] };
        loaded.add(slug);
        maybeSetCards();
      });
    });
    return () => unsubs.forEach(u => u());
  }, []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", background: '#f8fafc', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        @keyframes dp-spin{to{transform:rotate(360deg)}}
        .dp-hcard{border-radius:20px;overflow:hidden;background:#fff;box-shadow:0 4px 20px rgba(15,35,71,.07);border:1.5px solid #f1f5f9;height:100%;transition:transform .22s,box-shadow .22s;text-decoration:none;display:block;color:inherit;}
        .dp-hcard:hover{transform:translateY(-6px);box-shadow:0 18px 40px rgba(15,35,71,.12);}
      `}</style>

      {/* Hero banner */}
      <div style={{ background: 'linear-gradient(145deg,#f0f9ff,#e0f2fe 40%,#fef9ec 100%)', borderBottom: '1px solid #e0f2fe', padding: '60px 20px 52px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -60, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle,rgba(14,165,233,.1) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 12.5, color: '#94a3b8', marginBottom: 22, display: 'flex', gap: 6, justifyContent: 'center' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: NAVY, fontWeight: 600 }}>Academic Departments</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e0f2fe', color: '#0ea5e9', fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 20, marginBottom: 16 }}>
            🏛️ Academics
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(28px,5vw,50px)', fontWeight: 800, color: NAVY, lineHeight: 1.08, letterSpacing: '-1.5px', margin: '0 0 14px' }}>
            Our Academic Departments
          </h1>
          <p style={{ color: '#64748b', fontSize: 15.5, maxWidth: 460, margin: '0 auto', lineHeight: 1.75 }}>
            5 vibrant departments — quality education aur career growth ke liye dedicated
          </p>
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '48px 20px 72px' }}>
        {loading ? <Spin /> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 18 }}>
            {cards.map((dept, i) => (
              <Fade key={dept.slug} delay={i * .07} y={20}>
                <Link to={`/academics/departments/${dept.slug}`} className="dp-hcard">
                  <div style={{ height: 4, background: `linear-gradient(90deg,${dept.color},${dept.color}55)` }} />
                  <div style={{ padding: '22px 20px 26px' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${dept.color}14`, border: `1.5px solid ${dept.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 14 }}>
                      {dept.icon}
                    </div>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: dept.color, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 5 }}>{dept.short}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: NAVY, lineHeight: 1.35, marginBottom: 8 }}>{dept.fullName || dept.name || dept.full}</div>
                    {dept.tagline && <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5, marginBottom: 12 }}>{dept.tagline}</div>}
                    {dept.facultyKeys?.length > 1 && (
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
                        {dept.facultyKeys.map(k => <Pill key={k} txt={k} color={dept.color} />)}
                      </div>
                    )}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: `${dept.color}12`, border: `1.5px solid ${dept.color}28`, color: dept.color, padding: '6px 14px', borderRadius: 9, fontSize: 12, fontWeight: 700 }}>
                      Read More →
                    </div>
                  </div>
                </Link>
              </Fade>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ROOT EXPORT  — decides Hub vs Single
══════════════════════════════════════════════════════════════════ */
export default function DepartmentPage() {
  const { deptSlug } = useParams();
  if (!deptSlug) return <HubPage />;
  return <SingleDeptPage slug={deptSlug} />;
}