import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const EVENT_TYPES  = ['All','WORKSHOP','SEMINAR','CULTURAL','SPORTS','NSS','NCC', 'ACADEMIC'];

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

export default function EventsPage() {
  const [events,   setEvents]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [tab,      setTab]      = useState('upcoming');
  const [selType,  setSelType]  = useState('All');
  const [selYear,  setSelYear]  = useState('All');
  const [selMonth, setSelMonth] = useState('All');
  const [search,   setSearch]   = useState('');
  const [expandId, setExpandId] = useState(null);

  const navy = COLORS.navy || '#0B1F4E';
  const gold = COLORS.gold || '#C9A227';

  useEffect(() => {
    window.scrollTo(0, 0);
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => {
      setEvents(snap.docs.map(d => ({ id:d.id, ...d.data() })));
      setLoading(false);
    });
  }, []);

  const upcoming = useMemo(() => events.filter(e => e.status === 'upcoming'), [events]);
  const past     = useMemo(() => events.filter(e => e.status !== 'upcoming'), [events]);
  const years    = useMemo(() => {
    const s = new Set(events.map(e => getTS(e.createdAt).getFullYear()));
    return ['All', ...Array.from(s).sort((a,b)=>b-a)];
  }, [events]);

  const filtered = useMemo(() => events.filter(e => {
    if (tab==='upcoming' && e.status!=='upcoming') return false;
    if (tab==='past'     && e.status==='upcoming') return false;
    if (selType  !== 'All' && e.type !== selType)   return false;
    if (selYear  !== 'All' && getTS(e.createdAt).getFullYear() !== Number(selYear)) return false;
    if (selMonth !== 'All' && (e.month||'').toUpperCase() !== selMonth.toUpperCase()) return false;
    if (search && !e.title?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [events, tab, selType, selYear, selMonth, search]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(e => {
      const k = e.month || 'Other';
      if (!map[k]) map[k] = [];
      map[k].push(e);
    });
    return map;
  }, [filtered]);

  const featured = upcoming[0];

  return (
    <div className="profile-page-wrapper">
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes glow{0%,100%{box-shadow:0 8px 28px rgba(11,31,78,.1)}50%{box-shadow:0 8px 28px rgba(201,162,39,.25)}}
        .evt-fb{border:none;font-family:inherit;cursor:pointer;transition:all .15s}
        .evt-card{transition:all .22s}
        .evt-card:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(11,31,78,.13)!important}
        .evt-upcoming{animation:glow 3s ease-in-out infinite}
        .evt-img{transition:transform .4s}
        .evt-card:hover .evt-img{transform:scale(1.06)}
      `}</style>

      {/* ── HERO ── */}
      <header className="profile-hero" style={{ backgroundImage:`url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2070&auto=format&fit=crop')` }}>
        <div className="hero-overlay" />
        <div className="hero-content anim-fade-in">
          <h1 className="hero-title">🏛️ Campus Events</h1>
          <p className="hero-subtitle">Workshops, seminars, cultural fests aur khel-kud — saari activities ek jagah</p>
        </div>
      </header>

      {/* Counters Section */}
      <div style={{ maxWidth: '1000px', margin: '-80px auto 40px', padding: '20px', position: 'relative', zIndex: 10, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <div style={{ display:'flex', gap:14, flexWrap:'wrap', justifyContent: 'center' }}>
          {[
            { val:events.length,   label:'Total Events', icon:'📆' },
            { val:upcoming.length, label:'Upcoming',     icon:'🔜', hi:true },
            { val:past.length,     label:'Past Events',  icon:'📜' },
            { val:[...new Set(events.map(e=>e.type))].filter(Boolean).length, label:'Types', icon:'🏷️' },
          ].map((s,i) => (
            <div key={i} style={{ background:s.hi?'#fffbeb':'#fff', border:`1px solid ${s.hi?gold:'#e2e8f0'}`, borderRadius:11, padding:'10px 20px', textAlign:'center', transition: 'all .2s', flex: 1, minWidth: '150px' }}>
              <span style={{ display:'block', fontSize:17 }}>{s.icon}</span>
              <div style={{ fontSize:24, fontWeight:900, color:s.hi?gold:navy, lineHeight:1, marginTop:2 }}>{s.val}</div>
              <div style={{ fontSize:11, color:'#64748b', marginTop:2, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <main>

            {/* ── Featured upcoming banner ── */}
            {featured && (
              <section className="glass-panel profile-section anim-slide-up" style={{ padding:'18px 22px', animationDelay:'.05s', border:`2px solid ${gold}44` }}>
                {(() => {
                  const m = TYPE_META[featured.type]||{icon:'🏆',grad:`linear-gradient(135deg,${navy},#1a3a7c)`,light:'#EBF0FF',text:'#1a365d'};
                  return (
                    <div style={{ display:'flex', gap:14, alignItems:'center', flexWrap:'wrap' }}>
                      <span style={{ fontSize:11, fontWeight:900, color:gold, letterSpacing:1.5, textTransform:'uppercase', flexShrink:0 }}>⭐ Featured</span>
                      <div style={{ display:'flex', alignItems:'center', gap:14, background:`linear-gradient(135deg,${navy},#1a3a7c)`, borderRadius:13, padding:'14px 20px', flex:1, minWidth:260 }}>
                        <div style={{ width:50, height:50, borderRadius:11, background:m.grad, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>{m.icon}</div>
                        <div>
                          <div style={{ display:'flex', gap:8, marginBottom:5, flexWrap:'wrap' }}>
                            <span style={{ background:m.light, color:m.text, padding:'2px 10px', borderRadius:20, fontSize:11, fontWeight:700 }}>{featured.type}</span>
                            {featured.day && <span style={{ background:`${gold}22`, color:gold, padding:'2px 10px', borderRadius:20, fontSize:11, fontWeight:700 }}>📅 {featured.day} {featured.month}</span>}
                          </div>
                          <h3 style={{ margin:0, fontSize:17, fontWeight:800, color:'#fff' }}>{featured.title}</h3>
                          <p style={{ margin:'3px 0 0', fontSize:12.5, color:'rgba(255,255,255,.55)' }}>📍 {featured.location||'College Campus'}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </section>
            )}

            {/* ── Filters ── */}
            <section style={{ background: '#fff', padding: '30px 40px', borderRadius: '16px', boxShadow: '0 8px 25px rgba(0,0,0,0.07)', marginTop: '30px', animationDelay:'.1s' }}>
              {/* Tab buttons */}
              <div style={{ display:'flex', gap:3, marginBottom:16, background:'#f4f7fa', borderRadius:11, padding:3, width:'fit-content' }}>
                {[
                  { id:'upcoming', label:'🔜 Upcoming', count:upcoming.length },
                  { id:'all',      label:'📆 All',      count:events.length   },
                  { id:'past',     label:'📜 Past',      count:past.length     },
                ].map(t => (
                  <button key={t.id} className="evt-fb" onClick={() => setTab(t.id)}
                    style={{ padding:'8px 18px', borderRadius:9, background:tab===t.id?navy:'transparent', color:tab===t.id?'#fff':'#718096', fontWeight:700, fontSize:13, display:'flex', alignItems:'center', gap:7 }}>
                    {t.label}
                    <span style={{ background:tab===t.id?gold:'#e2e8f0', color:tab===t.id?navy:'#718096', borderRadius:20, padding:'1px 8px', fontSize:11.5, fontWeight:800 }}>{t.count}</span>
                  </button>
                ))}
              </div>

              {/* Search */}
              <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center', marginBottom:12 }}>
                <div style={{ flex:1, minWidth:200, position:'relative' }}>
                  <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', opacity:.4, fontSize:16, pointerEvents:'none' }}>🔍</span>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Event search karo..."
                    style={{ width:'100%', padding:'10px 14px 10px 38px', border:'2px solid #e2e8f0', borderRadius:10, fontSize:14, fontFamily:'inherit', background:'#f8fafc', outline:'none', boxSizing:'border-box', transition:'border-color .2s' }}
                    onFocus={e => e.target.style.borderColor=gold}
                    onBlur={e  => e.target.style.borderColor='#e2e8f0'} />
                </div>
                <span style={{ background:'#f0f4ff', color:navy, borderRadius:20, padding:'5px 14px', fontSize:12.5, fontWeight:800 }}>{filtered.length} events</span>
              </div>

              {/* Type */}
              <div style={{ display:'flex', gap:7, flexWrap:'wrap', alignItems:'center', marginBottom:10 }}>
                <span style={{ fontSize:10.5, fontWeight:700, color:'#a0aec0', textTransform:'uppercase', letterSpacing:.8, flexShrink:0 }}>TYPE:</span>
                {EVENT_TYPES.map(t => {
                  const m = TYPE_META[t]||{light:'#f4f7fa',text:'#4a5568',border:'#e2e8f0'};
                  return (
                    <button key={t} className="evt-fb" onClick={() => setSelType(t)}
                      style={{ padding:'4px 13px', borderRadius:20, border:`2px solid ${selType===t?m.border||'#e2e8f0':'#e2e8f0'}`, background:selType===t?m.light:'transparent', color:selType===t?m.text:'#718096', fontWeight:700, fontSize:12 }}>
                      {t!=='All'&&((TYPE_META[t]?.icon||'')+' ')}{t}
                    </button>
                  );
                })}
              </div>

              {/* Year + Month */}
              <div style={{ display:'flex', gap:14, flexWrap:'wrap', alignItems:'center' }}>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', alignItems:'center' }}>
                  <span style={{ fontSize:10.5, fontWeight:700, color:'#a0aec0', textTransform:'uppercase', letterSpacing:.8, flexShrink:0 }}>YEAR:</span>
                  {years.map(y => (
                    <button key={y} className="evt-fb" onClick={() => setSelYear(String(y))}
                      style={{ padding:'4px 13px', borderRadius:20, border:`2px solid ${selYear===String(y)?gold:'#e2e8f0'}`, background:selYear===String(y)?gold:'transparent', color:selYear===String(y)?navy:'#718096', fontWeight:700, fontSize:12 }}>
                      {y}
                    </button>
                  ))}
                </div>
                <div style={{ display:'flex', gap:5, flexWrap:'wrap', alignItems:'center' }}>
                  <span style={{ fontSize:10.5, fontWeight:700, color:'#a0aec0', textTransform:'uppercase', letterSpacing:.8, flexShrink:0 }}>MONTH:</span>
                  {['All',...MONTHS_SHORT].map(m => (
                    <button key={m} className="evt-fb" onClick={() => setSelMonth(m)}
                      style={{ padding:'3px 9px', borderRadius:6, border:`1.5px solid ${selMonth===m?navy:'#e2e8f0'}`, background:selMonth===m?navy:'transparent', color:selMonth===m?'#fff':'#718096', fontWeight:600, fontSize:11.5 }}>
                      {m}
                    </button>
                  ))}
                </div>
                {(selType!=='All'||selYear!=='All'||selMonth!=='All'||search) && (
                  <button className="evt-fb" onClick={() => { setSelType('All'); setSelYear('All'); setSelMonth('All'); setSearch(''); }}
                    style={{ padding:'4px 12px', borderRadius:20, border:'2px solid #FEB2B2', background:'#FFF5F5', color:'#e53e3e', fontWeight:700, fontSize:12 }}>
                    ✕ Clear
                  </button>
                )}
              </div>
            </section>

            {/* ── Events ── */}
            <section style={{ background: '#fff', padding: '30px 40px', borderRadius: '16px', boxShadow: '0 8px 25px rgba(0,0,0,0.07)', marginTop: '30px', animationDelay:'.2s' }}>
              <h2 className="section-heading">📅 Events ({filtered.length})</h2>
              <div className="heading-underline" />

              {loading ? (
                <div style={{ textAlign:'center', padding:'60px 20px' }}>
                  <div style={{ width:40, height:40, border:`4px solid ${gold}`, borderTop:'4px solid transparent', borderRadius:'50%', animation:'spin .8s linear infinite', margin:'0 auto 14px' }} />
                  <p style={{ color:'#718096', fontWeight:600 }}>Events load ho rahe hain...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign:'center', padding:'50px 20px' }}>
                  <div style={{ fontSize:44, marginBottom:10 }}>🎭</div>
                  <h3 style={{ color:navy, fontWeight:800, margin:'0 0 6px' }}>Koi event nahi mila</h3>
                  <p style={{ color:'#718096', fontSize:13.5 }}>Tab ya filter change karo</p>
                </div>
              ) : (
                Object.entries(grouped).map(([month, items]) => (
                  <div key={month} style={{ marginBottom:32 }}>
                    {/* Month header */}
                    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
                      <div style={{ background:`linear-gradient(135deg,${navy},#1a3a7c)`, color:gold, borderRadius:9, padding:'6px 18px', fontWeight:900, fontSize:13.5, whiteSpace:'nowrap', boxShadow:`0 4px 14px ${navy}22` }}>
                        📅 {month}
                      </div>
                      <div style={{ flex:1, height:2, background:`linear-gradient(90deg,${gold}44,transparent)` }} />
                      <span style={{ fontSize:11.5, color:'#a0aec0', fontWeight:700 }}>{items.length} event{items.length>1?'s':''}</span>
                    </div>

                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:18 }}>
                      {items.map(ev => {
                        const m   = TYPE_META[ev.type]||{icon:'🏆',grad:`linear-gradient(135deg,${navy},#1a3a7c)`,light:'#EBF0FF',text:'#1a365d'};
                        const isUp = ev.status === 'upcoming';
                        const exp  = expandId === ev.id;
                        const desc = (ev.desc||'').replace(/<[^>]*>/g,'');

                        return (
                          <div key={ev.id}
                            className={`evt-card${isUp?' evt-upcoming':''}`}
                            style={{ background:'#fff', borderRadius:16, overflow:'hidden', boxShadow:isUp?'0 8px 28px rgba(11,31,78,.1)':'0 4px 16px rgba(11,31,78,.06)', border:isUp?`2px solid ${gold}`:'1px solid #edf2f7', position:'relative' }}>

                            {/* image or gradient header */}
                            {ev.imageUrl ? (
                              <div style={{ height:190, position:'relative', overflow:'hidden' }}>
                                <img src={ev.imageUrl} alt={ev.title} className="evt-img"
                                  style={{ width:'100%', height:'100%', objectFit:'cover' }}
                                  onError={e => { e.target.parentElement.style.background=m.grad; e.target.style.display='none'; }} />
                                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 50%,rgba(11,31,78,.75))' }} />
                                <div style={{ position:'absolute', top:12, left:12, background:'rgba(255,255,255,.92)', borderRadius:9, padding:'6px 10px', textAlign:'center', backdropFilter:'blur(4px)', minWidth:44 }}>
                                  <div style={{ fontSize:9.5, fontWeight:700, color:'#718096', textTransform:'uppercase' }}>{ev.month}</div>
                                  <div style={{ fontSize:20, fontWeight:900, color:navy, lineHeight:1 }}>{ev.day||'?'}</div>
                                </div>
                                <span style={{ position:'absolute', top:12, right:12, background:m.light, color:m.text, padding:'4px 12px', borderRadius:20, fontSize:11.5, fontWeight:700 }}>
                                  {m.icon} {ev.type}
                                </span>
                              </div>
                            ) : (
                              <div style={{ background:m.grad, padding:'20px 18px 16px' }}>
                                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                                  <div style={{ background:'rgba(255,255,255,.22)', borderRadius:9, padding:'7px 10px', textAlign:'center', backdropFilter:'blur(4px)', minWidth:44 }}>
                                    <div style={{ fontSize:9.5, fontWeight:700, color:'rgba(255,255,255,.7)', textTransform:'uppercase' }}>{ev.month||'?'}</div>
                                    <div style={{ fontSize:22, fontWeight:900, color:'#fff', lineHeight:1 }}>{ev.day||'?'}</div>
                                  </div>
                                  <span style={{ background:'rgba(255,255,255,.22)', color:'#fff', padding:'4px 12px', borderRadius:20, fontSize:11, fontWeight:700, backdropFilter:'blur(4px)' }}>
                                    {m.icon} {ev.type}
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* upcoming strip */}
                            {isUp && (
                              <div style={{ background:'linear-gradient(135deg,#f6ad55,#ed8936)', color:'#fff', textAlign:'center', padding:'3px 0', fontSize:10.5, fontWeight:900, letterSpacing:.8 }}>
                                🔜 UPCOMING EVENT
                              </div>
                            )}

                            <div style={{ padding:'16px 18px 18px' }}>
                              <h3 style={{ margin:'0 0 6px', fontSize:15.5, fontWeight:800, color:navy, lineHeight:1.35 }}>{ev.title}</h3>
                              <p style={{ margin:'0 0 10px', fontSize:12.5, color:'#718096', display:'flex', alignItems:'center', gap:5 }}>
                                <span>📍</span> {ev.location||'College Campus'}
                              </p>
                              {desc && (
                                <>
                                  <p style={{ margin:0, fontSize:13, color:'#4a5568', lineHeight:1.65 }}>
                                    {exp ? desc : desc.substring(0, 100) + (desc.length > 100 ? '…' : '')}
                                  </p>
                                  {desc.length > 100 && (
                                    <button onClick={() => setExpandId(exp?null:ev.id)}
                                      style={{ background:'none', border:'none', color:gold, fontWeight:800, fontSize:12.5, cursor:'pointer', padding:'6px 0 0', fontFamily:'inherit' }}>
                                      {exp?'▲ Less':'▼ Read More'}
                                    </button>
                                  )}
                                </>
                              )}
                              {ev.reportLink && (
                                <a href={ev.reportLink} target="_blank" rel="noreferrer" className="download-btn"
                                  style={{ marginTop:12, display:'inline-flex', alignItems:'center', gap:6 }}>
                                  📄 PDF Report
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </section>

          </main>
      </div>
      <style>{`
        .download-btn { display:inline-block; background:#f8fafc; color:${navy}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .download-btn:hover { background:${navy}; color:#fff; border-color:${navy}; }
      `}</style>
    </div>
  );
}