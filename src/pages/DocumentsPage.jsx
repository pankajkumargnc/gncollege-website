import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DOC_TYPES    = ['All','Document','Report','Syllabus','Circular','Result'];
const DOC_META = {
  Document: { icon:'📄', bg:'#EBF0FF', text:'#1a365d', border:'#BED0FF', color:'#4a7fd4' },
  Report:   { icon:'📊', bg:'#F0FFF4', text:'#1c4532', border:'#9AE6B4', color:'#38a169' },
  Syllabus: { icon:'📚', bg:'#FFFBEB', text:'#744210', border:'#FAF089', color:'#d69e2e' },
  Circular: { icon:'📋', bg:'#FFF5F5', text:'#742a2a', border:'#FEB2B2', color:'#e53e3e' },
  Result:   { icon:'🏆', bg:'#E6FFFA', text:'#1d4044', border:'#81E6D9', color:'#319795' },
};

const getTS  = ts => ts?.toDate ? ts.toDate() : new Date(ts || Date.now());
const fmtDt  = ts => { const d=getTS(ts); return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`; };

const Sidebar = ({ navy, gold, typeCounts }) => (
  <aside className="profile-sidebar anim-slide-up" style={{ animationDelay:'0.4s' }}>
    <div className="widget">
      <h3 className="widget-title"><span>📊</span> Document Types</h3>
      <ul className="quick-links">
        {Object.entries(typeCounts).map(([type, count]) => {
          const m = DOC_META[type] || { icon:'📄', color:'#718096' };
          return (
            <li key={type} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #f0f4f8' }}>
              <span style={{ fontSize:13.5, color:'#334155', fontWeight:600, display:'flex', alignItems:'center', gap:7 }}>
                {m.icon} {type}
              </span>
              <span style={{ background:`${m.color}18`, color:m.color, padding:'2px 9px', borderRadius:20, fontSize:12, fontWeight:800 }}>{count}</span>
            </li>
          );
        })}
      </ul>
    </div>
    <div className="widget" style={{ marginTop:20 }}>
      <h3 className="widget-title"><span>📑</span> Quick Links</h3>
      <ul className="quick-links">
        {[
          { label:'📢 Notice Board',    path:'/notifications' },
          { label:'🏆 Campus Events',   path:'/events' },
          { label:'Syllabus',           path:'/syllabus' },
          { label:'Admission Rules',    path:'/admission/rule' },
          { label:'Fee Structure',      path:'/admission/fee-structure' },
          { label:'Academic Calendar',  path:'/academics/academic-calendar' },
          { label:'NAAC',               path:'/naac/nirf' },
          { label:'IQAC',               path:'/academics/iqac' },
          { label:'Photo Gallery',      path:'/gallery' },
          { label:'Contact Us',         path:'/contact' },
        ].map((link, i) => (
          <li key={i} className="quick-link-item">
            <Link to={link.path} className="quick-link" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}>
              <span className="link-arrow">›</span> {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <div className="helpdesk-widget">
      <div style={{ fontSize:'45px', marginBottom:'15px', position:'relative', zIndex:2 }}>📞</div>
      <h4 style={{ margin:'0 0 12px', fontSize:'19px', color:'#f4a023', position:'relative', zIndex:2 }}>Need Assistance?</h4>
      <p style={{ fontSize:'14px', margin:'0 0 20px', color:'#e2e8f0', lineHeight:'1.6', position:'relative', zIndex:2 }}>
        Contact our administration office for any queries related to admission or academics.
      </p>
      <a href="tel:+917903340991" className="helpdesk-btn">Call Helpdesk Now</a>
    </div>
  </aside>
);

export default function DocumentsPage() {
  const [docs,     setDocs]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selYear,  setSelYear]  = useState('All');
  const [selMonth, setSelMonth] = useState('All');
  const [selType,  setSelType]  = useState('All');
  const [search,   setSearch]   = useState('');
  const [view,     setView]     = useState('grid');

  const navy = COLORS.navy || '#0B1F4E';
  const gold = COLORS.gold || '#C9A227';

  useEffect(() => {
    window.scrollTo(0, 0);
    const q = query(collection(db, 'pdfReports'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => {
      setDocs(snap.docs.map(d => ({ id:d.id, ...d.data() })));
      setLoading(false);
    });
  }, []);

  const years = useMemo(() => {
    const s = new Set(docs.map(d => getTS(d.createdAt).getFullYear()));
    return ['All', ...Array.from(s).sort((a,b) => b-a)];
  }, [docs]);

  const typeCounts = useMemo(() => {
    const m = {};
    docs.forEach(d => { const t = d.type||'Document'; m[t]=(m[t]||0)+1; });
    return m;
  }, [docs]);

  const filtered = useMemo(() => docs.filter(d => {
    const dt = getTS(d.createdAt);
    if (selYear  !== 'All' && dt.getFullYear() !== Number(selYear))         return false;
    if (selMonth !== 'All' && MONTHS_SHORT[dt.getMonth()] !== selMonth)     return false;
    if (selType  !== 'All' && (d.type||'Document') !== selType)             return false;
    if (search && !d.title?.toLowerCase().includes(search.toLowerCase()))   return false;
    return true;
  }), [docs, selYear, selMonth, selType, search]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(d => {
      const y = String(getTS(d.createdAt).getFullYear());
      if (!map[y]) map[y] = [];
      map[y].push(d);
    });
    return map;
  }, [filtered]);

  return (
    <div className="profile-page-wrapper">
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        .doc-fb{border:none;font-family:inherit;cursor:pointer;transition:all .15s}
        .doc-card-hover{transition:all .2s}
        .doc-card-hover:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(11,31,78,.13)!important}
        .doc-row-hover{transition:all .15s}
        .doc-row-hover:hover{background:#f8fafc!important;border-color:${gold}55!important}
        .dl-btn-hover{transition:all .18s}
        .dl-btn-hover:hover{background:${gold}!important;color:${navy}!important}
      `}</style>

      {/* ── HERO ── */}
      <header className="profile-hero"
        style={{ backgroundImage:`url('https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2070&auto=format&fit=crop')` }}>
        <div className="hero-overlay" />
        <div className="hero-content anim-fade-in">
          <nav style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14, fontSize:13, fontWeight:600 }}>
            <Link to="/" style={{ color:'rgba(255,255,255,.55)', textDecoration:'none' }}>🏠 Home</Link>
            <span style={{ color:'rgba(255,255,255,.3)' }}>›</span>
            <span style={{ color:gold }}>Document Archive</span>
          </nav>
          <h1 className="hero-title">📁 Document Archive</h1>
          <p className="hero-subtitle">Syllabus, circulars, reports aur important documents — year aur type wise filter karo</p>
          {/* type count pills */}
          <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginTop:22 }}>
            {Object.entries(typeCounts).map(([type,count]) => {
              const m = DOC_META[type]||{icon:'📄'};
              return (
                <button key={type} onClick={() => setSelType(selType===type?'All':type)}
                  style={{ background:selType===type?`rgba(201,162,39,.25)`:'rgba(255,255,255,.1)', border:`1px solid ${selType===type?gold:'rgba(255,255,255,.18)'}`, borderRadius:11, padding:'10px 18px', color:'#fff', cursor:'pointer', textAlign:'center', transition:'all .2s', backdropFilter:'blur(6px)' }}>
                  <span style={{ display:'block', fontSize:19 }}>{m.icon}</span>
                  <span style={{ display:'block', fontSize:22, fontWeight:900, color:gold, lineHeight:1 }}>{count}</span>
                  <span style={{ display:'block', fontSize:11, color:'rgba(255,255,255,.55)', marginTop:2 }}>{type}</span>
                </button>
              );
            })}
            <div style={{ background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.18)', borderRadius:11, padding:'10px 18px', textAlign:'center', backdropFilter:'blur(6px)' }}>
              <span style={{ display:'block', fontSize:19 }}>📂</span>
              <span style={{ display:'block', fontSize:22, fontWeight:900, color:gold, lineHeight:1 }}>{docs.length}</span>
              <span style={{ display:'block', fontSize:11, color:'rgba(255,255,255,.55)', marginTop:2 }}>Total</span>
            </div>
          </div>
        </div>
      </header>

      <div className="profile-container">
        <div className="profile-layout">
          <main className="profile-main">

            {/* ── Filter Panel ── */}
            <section className="glass-panel profile-section anim-slide-up" style={{ padding:'20px 24px', animationDelay:'.1s' }}>
              {/* search + toggle */}
              <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center', marginBottom:16 }}>
                <div style={{ flex:1, minWidth:200, position:'relative' }}>
                  <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', opacity:.4, fontSize:16, pointerEvents:'none' }}>🔍</span>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Document search karo..."
                    style={{ width:'100%', padding:'10px 14px 10px 38px', border:'2px solid #e2e8f0', borderRadius:10, fontSize:14, fontFamily:'inherit', background:'#f8fafc', outline:'none', boxSizing:'border-box', transition:'border-color .2s' }}
                    onFocus={e => e.target.style.borderColor=gold}
                    onBlur={e  => e.target.style.borderColor='#e2e8f0'} />
                </div>
                <div style={{ display:'flex', gap:7 }}>
                  {['grid','list'].map(v => (
                    <button key={v} className="doc-fb" onClick={() => setView(v)}
                      style={{ padding:'9px 16px', borderRadius:9, border:`2px solid ${view===v?navy:'#e2e8f0'}`, background:view===v?navy:'transparent', color:view===v?'#fff':'#718096', fontWeight:700, fontSize:12.5 }}>
                      {v==='grid'?'⊞ Grid':'☰ List'}
                    </button>
                  ))}
                  <span style={{ background:'#f0f4ff', color:navy, borderRadius:20, padding:'5px 14px', fontSize:12.5, fontWeight:800, alignSelf:'center' }}>{filtered.length}</span>
                </div>
              </div>

              {/* Year */}
              <div style={{ display:'flex', gap:7, flexWrap:'wrap', alignItems:'center', marginBottom:10 }}>
                <span style={{ fontSize:10.5, fontWeight:700, color:'#a0aec0', textTransform:'uppercase', letterSpacing:.8, flexShrink:0 }}>YEAR:</span>
                {years.map(y => (
                  <button key={y} className="doc-fb" onClick={() => setSelYear(String(y))}
                    style={{ padding:'4px 14px', borderRadius:20, border:`2px solid ${selYear===String(y)?gold:'#e2e8f0'}`, background:selYear===String(y)?gold:'transparent', color:selYear===String(y)?navy:'#718096', fontWeight:700, fontSize:12.5 }}>
                    {y}
                  </button>
                ))}
              </div>

              {/* Month + Type */}
              <div style={{ display:'flex', gap:7, flexWrap:'wrap', alignItems:'center', marginBottom:10 }}>
                <span style={{ fontSize:10.5, fontWeight:700, color:'#a0aec0', textTransform:'uppercase', letterSpacing:.8, flexShrink:0 }}>MONTH:</span>
                {['All',...MONTHS_SHORT].map(m => (
                  <button key={m} className="doc-fb" onClick={() => setSelMonth(m)}
                    style={{ padding:'4px 10px', borderRadius:7, border:`1.5px solid ${selMonth===m?navy:'#e2e8f0'}`, background:selMonth===m?navy:'transparent', color:selMonth===m?'#fff':'#718096', fontWeight:600, fontSize:12 }}>
                    {m}
                  </button>
                ))}
              </div>

              <div style={{ display:'flex', gap:6, flexWrap:'wrap', alignItems:'center' }}>
                <span style={{ fontSize:10.5, fontWeight:700, color:'#a0aec0', textTransform:'uppercase', letterSpacing:.8, flexShrink:0 }}>TYPE:</span>
                {DOC_TYPES.map(t => {
                  const m = DOC_META[t]||{bg:'#f4f7fa',text:'#4a5568',border:'#e2e8f0'};
                  return (
                    <button key={t} className="doc-fb" onClick={() => setSelType(t)}
                      style={{ padding:'4px 13px', borderRadius:20, border:`2px solid ${selType===t?m.border:'#e2e8f0'}`, background:selType===t?m.bg:'transparent', color:selType===t?m.text:'#718096', fontWeight:700, fontSize:12 }}>
                      {t!=='All'&&((DOC_META[t]?.icon||'📄')+' ')}{t}
                    </button>
                  );
                })}
                {(selYear!=='All'||selMonth!=='All'||selType!=='All'||search) && (
                  <button className="doc-fb" onClick={() => { setSelYear('All'); setSelMonth('All'); setSelType('All'); setSearch(''); }}
                    style={{ padding:'4px 12px', borderRadius:20, border:'2px solid #FEB2B2', background:'#FFF5F5', color:'#e53e3e', fontWeight:700, fontSize:12 }}>
                    ✕ Clear
                  </button>
                )}
              </div>
            </section>

            {/* ── Documents List ── */}
            <section className="glass-panel profile-section anim-slide-up" style={{ animationDelay:'.2s' }}>
              <h2 className="section-heading">📚 Official Documents ({filtered.length})</h2>
              <div className="heading-underline" />

              {loading ? (
                <div style={{ textAlign:'center', padding:'60px 20px' }}>
                  <div style={{ width:40, height:40, border:`4px solid ${gold}`, borderTop:'4px solid transparent', borderRadius:'50%', animation:'spin .8s linear infinite', margin:'0 auto 14px' }} />
                  <p style={{ color:'#718096', fontWeight:600 }}>Documents load ho rahe hain...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign:'center', padding:'50px 20px' }}>
                  <div style={{ fontSize:44, marginBottom:10 }}>📂</div>
                  <h3 style={{ color:navy, fontWeight:800, margin:'0 0 6px' }}>Koi document nahi mila</h3>
                  <p style={{ color:'#718096', fontSize:13.5 }}>Filter ya search change karo</p>
                </div>
              ) : view === 'grid' ? (

                /* ── GRID VIEW ── */
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:18 }}>
                  {filtered.map(d => {
                    const m = DOC_META[d.type]||DOC_META.Document;
                    return (
                      <div key={d.id} className="doc-card-hover"
                        style={{ background:'#fff', borderRadius:14, overflow:'hidden', boxShadow:'0 4px 16px rgba(11,31,78,.06)', border:'1px solid #edf2f7' }}>
                        <div style={{ height:5, background:`linear-gradient(90deg,${navy},${gold})` }} />
                        <div style={{ padding:'18px 20px 16px' }}>
                          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                            <div style={{ width:50, height:50, borderRadius:12, background:m.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, border:`1px solid ${m.border}` }}>
                              {m.icon}
                            </div>
                            <span style={{ background:m.bg, color:m.text, border:`1px solid ${m.border}`, padding:'3px 11px', borderRadius:20, fontSize:11.5, fontWeight:700 }}>{d.type||'Document'}</span>
                          </div>
                          <h3 style={{ margin:'0 0 7px', fontSize:14.5, fontWeight:800, color:navy, lineHeight:1.4 }}>{d.title}</h3>
                          <p style={{ margin:'0 0 16px', fontSize:12, color:'#a0aec0', fontWeight:600 }}>📅 {fmtDt(d.createdAt)}</p>
                          <a href={d.link} target="_blank" rel="noreferrer" className="dl-btn-hover"
                            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:navy, color:'#fff', padding:'10px 16px', borderRadius:9, fontSize:13.5, fontWeight:700, textDecoration:'none', border:'none' }}>
                            ⬇️ Download / View
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>

              ) : (
                /* ── LIST VIEW grouped by year ── */
                Object.entries(grouped).sort((a,b) => b[0]-a[0]).map(([year, items]) => (
                  <div key={year} style={{ marginBottom:28 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                      <div style={{ background:'linear-gradient(135deg,#16213e,#0a3d62)', color:gold, borderRadius:8, padding:'5px 16px', fontWeight:800, fontSize:12.5, whiteSpace:'nowrap' }}>
                        📂 {year}
                      </div>
                      <div style={{ flex:1, height:1, background:'linear-gradient(90deg,#0f346044,transparent)' }} />
                      <span style={{ fontSize:11.5, color:'#a0aec0', fontWeight:700 }}>{items.length} file{items.length>1?'s':''}</span>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                      {items.map(d => {
                        const m = DOC_META[d.type]||DOC_META.Document;
                        return (
                          <div key={d.id} className="doc-row-hover"
                            style={{ background:'#fff', borderRadius:11, padding:'13px 16px', display:'flex', alignItems:'center', gap:13, border:'1px solid #edf2f7', boxShadow:'0 2px 8px rgba(11,31,78,.04)' }}>
                            <div style={{ width:44, height:44, borderRadius:10, background:m.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:21, flexShrink:0, border:`1px solid ${m.border}` }}>
                              {m.icon}
                            </div>
                            <div style={{ flex:1, overflow:'hidden' }}>
                              <div style={{ fontWeight:700, fontSize:14.5, color:navy, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.title}</div>
                              <div style={{ display:'flex', gap:8, marginTop:4, alignItems:'center' }}>
                                <span style={{ background:m.bg, color:m.text, border:`1px solid ${m.border}`, padding:'2px 8px', borderRadius:20, fontSize:11, fontWeight:700 }}>{d.type||'Document'}</span>
                                <span style={{ fontSize:12, color:'#a0aec0' }}>📅 {fmtDt(d.createdAt)}</span>
                              </div>
                            </div>
                            <a href={d.link} target="_blank" rel="noreferrer" className="dl-btn-hover"
                              style={{ display:'inline-flex', alignItems:'center', gap:6, background:navy, color:'#fff', padding:'9px 18px', borderRadius:9, fontSize:13, fontWeight:700, textDecoration:'none', flexShrink:0, whiteSpace:'nowrap' }}>
                              ⬇️ Open
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </section>

          </main>
          <Sidebar navy={navy} gold={gold} typeCounts={typeCounts} />
        </div>
      </div>

      <style>{`
        .download-btn { display:inline-block; background:#f8fafc; color:${navy}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .download-btn:hover { background:${navy}; color:#fff; border-color:${navy}; }
      `}</style>
    </div>
  );
}