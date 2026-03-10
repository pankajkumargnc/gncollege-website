import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';

/* ─── constants ─── */
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// 🌟 FIX: Categories ab Announcements ke hisaab se hain
const CATEGORIES   = ['All','News','Achievement','Update','Result','Scholarship'];

const TYPE_COLORS = {
  News:        { bg:'#EBF0FF', text:'#1a365d', border:'#BED0FF', dot:'#4a7fd4' },
  Achievement: { bg:'#F0FFF4', text:'#1c4532', border:'#9AE6B4', dot:'#38a169' },
  Update:      { bg:'#FFFBEB', text:'#744210', border:'#FAF089', dot:'#d69e2e' },
  Result:      { bg:'#FFF5F5', text:'#742a2a', border:'#FEB2B2', dot:'#e53e3e' },
  Scholarship: { bg:'#FAF5FF', text:'#44337a', border:'#E9D8FD', dot:'#805ad5' },
};

const getTS   = ts => ts?.toDate ? ts.toDate() : new Date(ts || Date.now());
const fmtFull = ts => { const d = getTS(ts); return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`; };

/* ─── sidebar ─── */
const Sidebar = ({ navy, gold }) => (
  <aside className="profile-sidebar anim-slide-up" style={{ animationDelay: '0.4s' }}>
    <div className="widget">
      <h3 className="widget-title"><span>📑</span> Quick Links</h3>
      <ul className="quick-links">
        {[
          { label: '📢 Official Notices',        path: '/notifications' },
          { label: '📁 Document Archive',        path: '/documents' },
          { label: '🏆 Campus Events',           path: '/events' },
          { label: 'Principal Message',          path: '/about-us/principal-message' },
          { label: 'Admission Rules',            path: '/admission/rule' },
          { label: 'Photo Gallery',              path: '/gallery' },
          { label: 'Contact Us',                 path: '/contact' },
        ].map((link, i) => (
          <li key={i} className="quick-link-item">
            <Link to={link.path} className="quick-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="link-arrow">›</span> {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    
    <div className="widget" style={{ marginTop: 20 }}>
      <h3 className="widget-title"><span>📊</span> Categories</h3>
      <ul className="quick-links">
        {Object.entries(TYPE_COLORS).map(([cat, col]) => (
          <li key={cat} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #f0f4f8' }}>
            <span style={{ fontSize: 13, color: col.text, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: col.dot, display: 'inline-block' }} />
              {cat}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

/* ══════════════════════════════════════════════
   NEWS PAGE COMPONENT
══════════════════════════════════════════════ */
export default function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selYear,  setSelYear]  = useState('All');
  const [selMonth, setSelMonth] = useState('All');
  const [selCat,   setSelCat]   = useState('All');
  const [search,   setSearch]   = useState('');
  const [view,     setView]     = useState('list');

  const navy = COLORS.navy || '#0B1F4E';
  const gold = COLORS.gold || '#C9A227';

  // 🌟 FIX: Fetching from 'announcements' collection
  useEffect(() => {
    window.scrollTo(0, 0);
    const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => {
      setNewsList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, []);

  const years = useMemo(() => {
    const s = new Set(newsList.map(n => getTS(n.createdAt).getFullYear()));
    return ['All', ...Array.from(s).sort((a, b) => b - a)];
  }, [newsList]);

  const filtered = useMemo(() => newsList.filter(n => {
    const d = getTS(n.createdAt);
    if (selYear  !== 'All' && d.getFullYear() !== Number(selYear))        return false;
    if (selMonth !== 'All' && MONTHS_SHORT[d.getMonth()] !== selMonth)    return false;
    if (selCat   !== 'All' && (n.type || 'News') !== selCat)              return false;
    if (search && !n.text?.toLowerCase().includes(search.toLowerCase()))  return false;
    return true;
  }), [newsList, selYear, selMonth, selCat, search]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(n => {
      const d = getTS(n.createdAt);
      const k = `${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
      if (!map[k]) map[k] = [];
      map[k].push(n);
    });
    return map;
  }, [filtered]);

  return (
    <div className="profile-page-wrapper">
      <style>{`
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:.35; } }
        .ntf-fb { border: none; font-family: inherit; cursor: pointer; transition: all .15s; }
        .ntf-row-hover { transition: all .15s; }
        .ntf-row-hover:hover { background: #f8fafc !important; transform: translateX(4px); }
        .ntf-card-hover { transition: all .2s; }
        .ntf-card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(11,31,78,.12) !important; }
      `}</style>

      {/* ── HERO ── */}
      <header className="profile-hero"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')` }}>
        <div className="hero-overlay" />
        <div className="hero-content anim-fade-in">
          <nav style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14, fontSize:13, fontWeight:600 }}>
            <Link to="/" style={{ color:'rgba(255,255,255,.55)', textDecoration:'none' }}>🏠 Home</Link>
            <span style={{ color:'rgba(255,255,255,.3)' }}>›</span>
            <span style={{ color:gold }}>Academic News</span>
          </nav>
          <h1 className="hero-title">📣 News & Updates</h1>
          <p className="hero-subtitle">College ke latest achievements, academic news aur recent updates yahan dekhein</p>
          
          <div style={{ display:'flex', gap:14, flexWrap:'wrap', marginTop:22 }}>
            {[
              { val:newsList.length,                                      label:'Total News' },
              { val:newsList.filter(n=>n.type==='Achievement').length,    label:'Achievements' },
              { val:newsList.filter(n=>n.type==='Result').length,         label:'Results' },
              { val:years.length - 1,                                     label:'Active Years' },
            ].map((s, i) => (
              <div key={i} style={{ background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.18)', borderRadius:11, padding:'10px 20px', textAlign:'center', backdropFilter:'blur(8px)' }}>
                <div style={{ fontSize:24, fontWeight:900, color:gold, lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.55)', marginTop:3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="profile-container">
        <div className="profile-layout">
          <main className="profile-main">

            {/* ── Filter panel ── */}
            <section className="glass-panel profile-section anim-slide-up" style={{ padding:'20px 24px', animationDelay:'.1s' }}>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center', marginBottom:16 }}>
                <div style={{ flex:1, minWidth:200, position:'relative' }}>
                  <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', opacity:.4, fontSize:16, pointerEvents:'none' }}>🔍</span>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="News search karo..."
                    style={{ width:'100%', padding:'10px 14px 10px 38px', border:'2px solid #e2e8f0', borderRadius:10, fontSize:14, fontFamily:'inherit', background:'#f8fafc', outline:'none', boxSizing:'border-box', transition:'border-color .2s' }}
                    onFocus={e => e.target.style.borderColor = gold}
                    onBlur={e  => e.target.style.borderColor = '#e2e8f0'} />
                </div>
                <div style={{ display:'flex', gap:7 }}>
                  {['list','card'].map(v => (
                    <button key={v} className="ntf-fb" onClick={() => setView(v)}
                      style={{ padding:'9px 16px', borderRadius:9, border:`2px solid ${view===v?navy:'#e2e8f0'}`, background:view===v?navy:'transparent', color:view===v?'#fff':'#718096', fontWeight:700, fontSize:12.5 }}>
                      {v==='list' ? '☰ List' : '⊞ Cards'}
                    </button>
                  ))}
                  <span style={{ background:'#f0f4ff', color:navy, borderRadius:20, padding:'5px 14px', fontSize:12.5, fontWeight:800, alignSelf:'center' }}>
                    {filtered.length}
                  </span>
                </div>
              </div>

              {/* Year */}
              <div style={{ display:'flex', gap:7, flexWrap:'wrap', alignItems:'center', marginBottom:10 }}>
                <span style={{ fontSize:10.5, fontWeight:700, color:'#a0aec0', textTransform:'uppercase', letterSpacing:.8, flexShrink:0 }}>YEAR:</span>
                {years.map(y => (
                  <button key={y} className="ntf-fb" onClick={() => setSelYear(String(y))}
                    style={{ padding:'4px 14px', borderRadius:20, border:`2px solid ${selYear===String(y)?gold:'#e2e8f0'}`, background:selYear===String(y)?gold:'transparent', color:selYear===String(y)?navy:'#718096', fontWeight:700, fontSize:12.5 }}>
                    {y}
                  </button>
                ))}
              </div>

              {/* Month */}
              <div style={{ display:'flex', gap:5, flexWrap:'wrap', alignItems:'center', marginBottom:10 }}>
                <span style={{ fontSize:10.5, fontWeight:700, color:'#a0aec0', textTransform:'uppercase', letterSpacing:.8, flexShrink:0 }}>MONTH:</span>
                {['All', ...MONTHS_SHORT].map(m => (
                  <button key={m} className="ntf-fb" onClick={() => setSelMonth(m)}
                    style={{ padding:'4px 10px', borderRadius:7, border:`1.5px solid ${selMonth===m?navy:'#e2e8f0'}`, background:selMonth===m?navy:'transparent', color:selMonth===m?'#fff':'#718096', fontWeight:600, fontSize:12 }}>
                    {m}
                  </button>
                ))}
              </div>

              {/* Category */}
              <div style={{ display:'flex', gap:6, flexWrap:'wrap', alignItems:'center' }}>
                <span style={{ fontSize:10.5, fontWeight:700, color:'#a0aec0', textTransform:'uppercase', letterSpacing:.8, flexShrink:0 }}>CATEGORY:</span>
                {CATEGORIES.map(c => {
                  const col = TYPE_COLORS[c] || { bg:'#f4f7fa', text:'#4a5568', border:'#e2e8f0' };
                  return (
                    <button key={c} className="ntf-fb" onClick={() => setSelCat(c)}
                      style={{ padding:'4px 13px', borderRadius:20, border:`2px solid ${selCat===c?col.border:'#e2e8f0'}`, background:selCat===c?col.bg:'transparent', color:selCat===c?col.text:'#718096', fontWeight:700, fontSize:12 }}>
                      {c}
                    </button>
                  );
                })}
                {(selYear!=='All'||selMonth!=='All'||selCat!=='All'||search) && (
                  <button className="ntf-fb" onClick={() => { setSelYear('All'); setSelMonth('All'); setSelCat('All'); setSearch(''); }}
                    style={{ padding:'4px 12px', borderRadius:20, border:'2px solid #FEB2B2', background:'#FFF5F5', color:'#e53e3e', fontWeight:700, fontSize:12 }}>
                    ✕ Clear
                  </button>
                )}
              </div>
            </section>

            {/* ── Results ── */}
            <section className="glass-panel profile-section anim-slide-up" style={{ animationDelay:'.2s' }}>
              <h2 className="section-heading">📰 Latest News ({filtered.length})</h2>
              <div className="heading-underline" />

              {loading ? (
                <div style={{ textAlign:'center', padding:'60px 20px' }}>
                  <div style={{ width:40, height:40, border:`4px solid ${gold}`, borderTop:'4px solid transparent', borderRadius:'50%', animation:'spin .8s linear infinite', margin:'0 auto 14px' }} />
                  <p style={{ color:'#718096', fontWeight:600 }}>News load ho rahi hain...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign:'center', padding:'50px 20px' }}>
                  <div style={{ fontSize:44, marginBottom:10 }}>🔍</div>
                  <h3 style={{ color:navy, fontWeight:800, margin:'0 0 6px' }}>Koi news nahi mili</h3>
                  <p style={{ color:'#718096', fontSize:13.5 }}>Filter ya search change karo</p>
                </div>
              ) : view === 'list' ? (

                /* ── LIST VIEW ── */
                Object.entries(grouped).map(([monthYear, items]) => (
                  <div key={monthYear} style={{ marginBottom:28 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                      <div style={{ background:navy, color:gold, borderRadius:8, padding:'5px 16px', fontWeight:800, fontSize:12.5, whiteSpace:'nowrap', flexShrink:0 }}>
                        📅 {monthYear}
                      </div>
                      <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${navy}44,transparent)` }} />
                      <span style={{ fontSize:11.5, color:'#a0aec0', fontWeight:700, flexShrink:0 }}>{items.length} update{items.length>1?'s':''}</span>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                      {items.map(n => {
                        const d  = getTS(n.createdAt);
                        const tc = TYPE_COLORS[n.type] || TYPE_COLORS.News;
                        return (
                          <div key={n.id} className="ntf-row-hover"
                            style={{ background:'#fff', borderRadius:11, padding:'14px 18px', display:'flex', alignItems:'flex-start', gap:14, borderLeft:`4px solid ${tc.dot}`, border:`1px solid #edf2f7`, boxShadow:'0 2px 10px rgba(11,31,78,.04)' }}>
                            <div style={{ textAlign:'center', minWidth:44, flexShrink:0 }}>
                              <div style={{ fontSize:9.5, fontWeight:700, color:'#a0aec0', textTransform:'uppercase' }}>{MONTHS_SHORT[d.getMonth()]}</div>
                              <div style={{ fontSize:22, fontWeight:900, color:navy, lineHeight:1 }}>{d.getDate()}</div>
                              <div style={{ fontSize:11, color:'#a0aec0' }}>{d.getFullYear()}</div>
                            </div>
                            <div style={{ flex:1, overflow:'hidden' }}>
                              <div style={{ display:'flex', gap:7, marginBottom:7, flexWrap:'wrap', alignItems:'center' }}>
                                <span style={{ background:tc.bg, color:tc.text, border:`1px solid ${tc.border}`, padding:'2px 9px', borderRadius:20, fontSize:11, fontWeight:700 }}>{n.type||'News'}</span>
                              </div>
                              <div dangerouslySetInnerHTML={{ __html: n.text }}
                                style={{ fontSize:14.5, color:'#334155', fontWeight:500, lineHeight:1.65 }} />
                              {n.link && (
                                <a href={n.link} target="_blank" rel="noreferrer"
                                  style={{ display:'inline-flex', alignItems:'center', gap:5, marginTop:8, background:'#f8fafc', border:`1px solid ${navy}22`, color:navy, padding:'5px 12px', borderRadius:7, fontSize:12.5, fontWeight:700, textDecoration:'none' }}>
                                  🔗 Read Full Article
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))

              ) : (
                /* ── CARD VIEW ── */
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16, marginTop:4 }}>
                  {filtered.map(n => {
                    const d  = getTS(n.createdAt);
                    const tc = TYPE_COLORS[n.type] || TYPE_COLORS.News;
                    return (
                      <div key={n.id} className="ntf-card-hover"
                        style={{ background:'#fff', borderRadius:13, overflow:'hidden', boxShadow:'0 4px 16px rgba(11,31,78,.07)', border:'1px solid #edf2f7', position:'relative' }}>
                        <div style={{ background:`linear-gradient(135deg,${navy},#1a3a7c)`, padding:'13px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                          <span style={{ background:tc.bg, color:tc.text, border:`1px solid ${tc.border}`, padding:'3px 10px', borderRadius:20, fontSize:11.5, fontWeight:700 }}>{n.type||'News'}</span>
                          <span style={{ color:gold, fontSize:11.5, fontWeight:700 }}>📅 {fmtFull(n.createdAt)}</span>
                        </div>
                        <div style={{ padding:'15px 16px' }}>
                          <div dangerouslySetInnerHTML={{ __html: n.text }}
                            style={{ fontSize:13.5, color:'#334155', lineHeight:1.7, marginBottom:12 }} />
                          {n.link && (
                            <a href={n.link} target="_blank" rel="noreferrer" className="download-btn">🔗 Read More</a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

          </main>
          <Sidebar navy={navy} gold={gold} />
        </div>
      </div>

      <style>{`
        .download-btn { display:inline-block; background:#f8fafc; color:${navy}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .download-btn:hover { background:${navy}; color:#fff; border-color:${navy}; }
      `}</style>
    </div>
  );
}