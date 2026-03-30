// src/pages/EventsPage.jsx
// ✅ BUG FIX: READ REPORT link — undefined href fix, opens PDFModal properly
// ✅ Pagination added, all existing features preserved

import React, { useState, useMemo, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import PDFModal from '../components/PDFModal';
import PremiumPagination from '../components/PremiumPagination';

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const EVENT_TYPES  = ['All','WORKSHOP','SEMINAR','CULTURAL','SPORTS','NSS','NCC','ACADEMIC'];
const ITEMS_PER_PAGE = 12;

const TYPE_META = {
  WORKSHOP: { icon:'🛠️', grad:'linear-gradient(135deg,#667eea,#764ba2)', light:'#FAF5FF', text:'#44337a', border:'#E9D8FD', color:'#805ad5' },
  SEMINAR:  { icon:'🎤', grad:'linear-gradient(135deg,#f093fb,#f5576c)', light:'#FFF5F5', text:'#742a2a', border:'#FEB2B2', color:'#e53e3e' },
  CULTURAL: { icon:'🎭', grad:'linear-gradient(135deg,#4facfe,#00f2fe)', light:'#EBF8FF', text:'#1a365d', border:'#BED0FF', color:'#3182ce' },
  SPORTS:   { icon:'🏆', grad:'linear-gradient(135deg,#43e97b,#38f9d7)', light:'#F0FFF4', text:'#1c4532', border:'#9AE6B4', color:'#38a169' },
  NSS:      { icon:'🤝', grad:'linear-gradient(135deg,#fa709a,#fee140)', light:'#FFFBEB', text:'#744210', border:'#FAF089', color:'#d69e2e' },
  NCC:      { icon:'🎖️', grad:'linear-gradient(135deg,#a18cd1,#fbc2eb)', light:'#FAF5FF', text:'#44337a', border:'#E9D8FD', color:'#805ad5' },
  ACADEMIC: { icon:'📚', grad:'linear-gradient(135deg,#a18cd1,#fbc2eb)', light:'#FAF5FF', text:'#44337a', border:'#E9D8FD', color:'#805ad5' },
};

const getTS = ts => ts?.toDate ? ts.toDate() : new Date(ts || Date.now());

export default function EventsPage({ headless }) {
  const [events,     setEvents]     = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [tab,        setTab]        = useState('all');
  const [selType,    setSelType]    = useState('All');
  const [selYear,    setSelYear]    = useState('All');
  const [selMonth,   setSelMonth]   = useState('All');
  const [search,     setSearch]     = useState('');
  const [expandId,   setExpandId]   = useState(null);
  const [currentPage,setCurrentPage]= useState(1);
  const [previewPdf, setPreviewPdf] = useState(null);

  const navy = COLORS.navy || '#0B1F4E';
  const gold = COLORS.gold || '#C9A227';

  useEffect(() => {
    window.scrollTo(0, 0);
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      const formattedEvents = snap.docs.map(docSnap => {
        const d = docSnap.data();
        let m = d.month || 'Other';
        let dy = d.day || '';
        if (d.date) {
          const dt = new Date(d.date);
          if (!isNaN(dt)) {
            dy = dt.getDate();
            m  = dt.toLocaleString('en-US', { month: 'short' }).toUpperCase();
          }
        }
        return {
          id: docSnap.id, ...d,
          displayMonth: m, displayDay: dy,
          displayImage: d.image || d.imageUrl,
          displayDesc:  d.description || d.desc || '',
          // ✅ FIX: normalise report link field name
          reportLink: d.reportLink || d.pdfLink || d.reportUrl || '',
        };
      });
      setEvents(formattedEvents);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const upcoming = useMemo(() => events.filter(e => e.status === 'upcoming'), [events]);
  const past     = useMemo(() => events.filter(e => e.status !== 'upcoming'),  [events]);
  const years    = useMemo(() => {
    const s = new Set(events.map(e => getTS(e.createdAt).getFullYear()));
    return ['All', ...Array.from(s).sort((a,b) => b-a)];
  }, [events]);

  const filtered = useMemo(() => {
    setCurrentPage(1);
    return events.filter(e => {
      if (tab === 'upcoming' && e.status !== 'upcoming') return false;
      if (tab === 'past'     && e.status === 'upcoming') return false;
      if (selType  !== 'All' && e.type !== selType) return false;
      if (selYear  !== 'All' && getTS(e.createdAt).getFullYear() !== Number(selYear)) return false;
      if (selMonth !== 'All' && (e.displayMonth||'').toUpperCase() !== selMonth.toUpperCase()) return false;
      if (search && !e.title?.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [events, tab, selType, selYear, selMonth, search]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const grouped = useMemo(() => {
    const map = {};
    paginated.forEach(e => {
      const k = e.displayMonth || 'Other';
      if (!map[k]) map[k] = [];
      map[k].push(e);
    });
    return map;
  }, [paginated]);

  // ✅ Resolve relative paths for GitHub Pages
  const resolveUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return `${import.meta.env.BASE_URL}${url.slice(1)}`;
    return `${import.meta.env.BASE_URL}${url}`;
  };

  // ✅ Open PDF in modal or new tab depending on URL type
  const openReport = (e, ev) => {
    e.preventDefault();
    const link = ev.reportLink;
    if (!link) return;
    setPreviewPdf({ url: link, title: ev.title || 'Event Report' });
  };

  return (
    <div className="profile-page-wrapper">
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes glow{0%,100%{box-shadow:0 8px 28px rgba(11,31,78,.1)}50%{box-shadow:0 8px 28px rgba(201,162,39,.25)}}
        .evt-fb{border:none;font-family:inherit;cursor:pointer;transition:all .15s}
        .evt-card{transition:all .22s;display:flex;flex-direction:column;height:100%}
        .evt-card:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(11,31,78,.13)!important}
        .evt-upcoming{animation:glow 3s ease-in-out infinite}
        .evt-img{transition:transform .4s}
        .evt-card:hover .evt-img{transform:scale(1.06)}
      `}</style>

      {/* ── HERO ── */}
      {!headless && (
      <header className="profile-hero" style={{ backgroundImage:`url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2070&auto=format&fit=crop')` }}>
        <div className="hero-overlay" />
        <div className="hero-content anim-fade-in">
          <h1 className="hero-title">🏛️ Campus Events</h1>
          <p className="hero-subtitle">Workshops, seminars, cultural fests aur khel-kud — saari activities ek jagah</p>
        </div>
      </header>
      )}

      <div style={{ maxWidth:'1200px', margin:headless ? '0' : '-50px auto 0', padding:headless ? '0' : '0 20px', position:'relative', zIndex:10 }}>

        {/* Counters */}
        <div style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center', marginBottom:40 }}>
          {[
            { val:events.length,   label:'Total Events', icon:'📆', hi:true },
            { val:upcoming.length, label:'Upcoming',     icon:'🔜' },
            { val:past.length,     label:'Past Events',  icon:'📜' },
            { val:[...new Set(events.map(e=>e.type))].filter(Boolean).length, label:'Categories', icon:'🏷️' },
          ].map((s,i) => (
            <div key={i} style={{ background:'#fff', border:`1px solid ${s.hi?gold:'#e2e8f0'}`, borderRadius:14, padding:'16px 20px', display:'flex', alignItems:'center', gap:14, boxShadow:'0 8px 20px rgba(0,0,0,0.06)', flex:1, minWidth:'200px' }}>
              <div style={{ fontSize:22, background:s.hi?'#fffbeb':'#f1f5f9', width:46, height:46, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:12 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize:20, fontWeight:800, color:s.hi?'#d97706':navy, lineHeight:1.1 }}>{s.val}</div>
                <div style={{ fontSize:11, color:'#64748b', marginTop:4, fontWeight:700, textTransform:'uppercase', letterSpacing:0.5 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <main>
          {/* ── Filters ── */}
          <section style={{ background:'#fff', padding:'30px 40px', borderRadius:'16px', boxShadow:'0 8px 25px rgba(0,0,0,0.07)', marginTop:'30px' }}>
            <div style={{ display:'flex', gap:3, marginBottom:16, background:'#f4f7fa', borderRadius:11, padding:3, width:'fit-content' }}>
              {[
                { id:'all',      label:'📆 All',      count:events.length   },
                { id:'upcoming', label:'🔜 Upcoming', count:upcoming.length },
                { id:'past',     label:'📜 Past',     count:past.length     },
              ].map(t => (
                <button key={t.id} className="evt-fb" onClick={() => setTab(t.id)} style={{ padding:'8px 18px', borderRadius:9, background:tab===t.id?navy:'transparent', color:tab===t.id?'#fff':'#718096', fontWeight:700, fontSize:13, display:'flex', alignItems:'center', gap:7 }}>
                  {t.label}
                  <span style={{ background:tab===t.id?gold:'#e2e8f0', color:tab===t.id?navy:'#718096', borderRadius:20, padding:'1px 8px', fontSize:11.5, fontWeight:800 }}>{t.count}</span>
                </button>
              ))}
            </div>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
              <div style={{ flex:1, minWidth:200, position:'relative' }}>
                <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', opacity:.4, fontSize:16, pointerEvents:'none' }}>🔍</span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Event search karo..."
                  style={{ width:'100%', padding:'10px 14px 10px 38px', border:'2px solid #e2e8f0', borderRadius:10, fontSize:14, fontFamily:'inherit', background:'#f8fafc', outline:'none', boxSizing:'border-box' }} />
              </div>
              <span style={{ background:'#f0f4ff', color:navy, borderRadius:20, padding:'5px 14px', fontSize:12.5, fontWeight:800 }}>
                {filtered.length} event{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </section>

          {/* ── Events Grid ── */}
          <section style={{ background:'#fff', padding:'30px 40px', borderRadius:'16px', boxShadow:'0 8px 25px rgba(0,0,0,0.07)', marginTop:'30px', marginBottom:'60px' }}>
            <h2 style={{ fontSize:'clamp(24px,4vw,32px)', fontWeight:800, color:navy, margin:'0 0 10px', letterSpacing:'-0.5px' }}>
              Recent Events &amp; Happenings
            </h2>
            <div style={{ width:80, height:4, background:`linear-gradient(90deg,${gold},#fde68a)`, borderRadius:2, marginBottom:35 }} />

            {loading ? (
              <div style={{ textAlign:'center', padding:'60px 20px' }}>⏳ Events load ho rahe hain...</div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign:'center', padding:'50px 20px', color:'#94a3b8', fontSize:15, fontWeight:600 }}>🎭 Koi event nahi mila</div>
            ) : (
              <>
                {Object.entries(grouped).map(([month, items]) => (
                  <div key={month} style={{ marginBottom:40 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                      <div style={{ background:`linear-gradient(135deg,${navy},#1a3a7c)`, color:gold, borderRadius:9, padding:'6px 18px', fontWeight:900, fontSize:13.5 }}>📅 {month}</div>
                      <div style={{ flex:1, height:2, background:`linear-gradient(90deg,${gold}44,transparent)` }} />
                    </div>

                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:24 }}>
                      {items.map(ev => {
                        const m    = TYPE_META[ev.type] || { icon:'🏆', grad:`linear-gradient(135deg,${navy},#1a3a7c)`, light:'#EBF0FF', text:'#1a365d' };
                        const isUp = ev.status === 'upcoming';
                        const exp  = expandId === ev.id;
                        const plainText = (ev.displayDesc || '').replace(/<[^>]*>?/gm, '');
                        const imgSrc    = resolveUrl(ev.displayImage);
                        // ✅ FIX: only show report button if link actually exists
                        const hasReport = !!ev.reportLink;

                        return (
                          <div key={ev.id} className={`evt-card${isUp?' evt-upcoming':''}`}
                            style={{ background:'#fff', borderRadius:16, overflow:'hidden', boxShadow:'0 4px 16px rgba(11,31,78,.06)', border:`1px solid ${isUp?gold:'#edf2f7'}` }}>

                            {/* Image */}
                            {imgSrc ? (
                              <div style={{ height:180, position:'relative', overflow:'hidden', flexShrink:0 }}>
                                <img src={imgSrc} alt={ev.title} className="evt-img"
                                  style={{ width:'100%', height:'100%', objectFit:'cover' }}
                                  onError={e => { e.target.parentElement.style.background=m.grad; e.target.style.display='none'; }} />
                                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 50%,rgba(11,31,78,.75))' }} />
                                <div style={{ position:'absolute', top:12, left:12, background:'rgba(255,255,255,.92)', borderRadius:9, padding:'6px 10px', textAlign:'center' }}>
                                  <div style={{ fontSize:10, fontWeight:700, color:'#718096' }}>{ev.displayMonth}</div>
                                  <div style={{ fontSize:18, fontWeight:900, color:navy }}>{ev.displayDay||'?'}</div>
                                </div>
                              </div>
                            ) : (
                              <div style={{ height:180, background:m.grad, padding:20, flexShrink:0 }}>
                                <div style={{ fontSize:40, textAlign:'center', paddingTop:40 }}>{m.icon}</div>
                              </div>
                            )}

                            {/* Content */}
                            <div style={{ padding:20, flex:1, display:'flex', flexDirection:'column' }}>
                              <h3 style={{ margin:'0 0 8px', fontSize:16, fontWeight:800, color:navy, lineHeight:1.3 }}>{ev.title}</h3>

                              {plainText.length > 0 && (
                                <div style={{ marginBottom:12 }}>
                                  <p style={{ margin:0, fontSize:13, color:'#4a5568', lineHeight:1.6 }}>
                                    {exp ? plainText : plainText.substring(0,120) + (plainText.length>120?'…':'')}
                                  </p>
                                  {plainText.length > 120 && (
                                    <button onClick={() => setExpandId(exp?null:ev.id)}
                                      style={{ background:'none', border:'none', color:gold, fontWeight:800, fontSize:12, cursor:'pointer', padding:'4px 0 0' }}>
                                      {exp ? '▲ Read Less' : '▼ Read More'}
                                    </button>
                                  )}
                                </div>
                              )}

                              {/* Footer — always at bottom */}
                              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10, marginTop:'auto', width:'100%', paddingTop:12 }}>

                                {/* Venue */}
                                <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'#718096', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:'55%' }}>
                                  <span style={{ color:'#e53e3e' }}>📍</span>
                                  <span style={{ overflow:'hidden', textOverflow:'ellipsis' }}>
                                    {ev.venue || ev.location || 'College Campus'}
                                  </span>
                                </div>

                                {/* ✅ FIX: Only render if reportLink exists AND is non-empty */}
                                {hasReport && (
                                  <div style={{ flexShrink:0, display:'flex', alignItems:'center', gap:6 }}>
                                    <span style={{ background:'#fee2e2', color:'#e53e3e', padding:'2px 6px', fontSize:10, fontWeight:800, borderRadius:4 }}>PDF</span>
                                    <button
                                      onClick={e => openReport(e, ev)}
                                      style={{ background:'none', border:'none', color:'#d97706', fontSize:12, fontWeight:800, cursor:'pointer', padding:0 }}
                                    >
                                      READ REPORT ❯
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <PremiumPagination
                  totalItems={filtered.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </>
            )}
          </section>
        </main>
      </div>

      {previewPdf && <PDFModal url={previewPdf.url} title={previewPdf.title} onClose={() => setPreviewPdf(null)} />}
    </div>
  );
}