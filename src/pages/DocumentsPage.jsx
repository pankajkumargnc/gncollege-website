import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
const PDFModal = lazy(() => import('../components/PDFModal'));
import PremiumPagination from '../components/PremiumPagination';

const ITEMS_PER_PAGE = 15;

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DOC_TYPES = ['All','Document','Report','Syllabus','Circular','Result','Regulation','Affiliation','Magazine','Poster'];
const DOC_META = {
  Document:   { icon:'📄', bg:'#EBF0FF', text:'#1a365d', border:'#BED0FF', color:'#4a7fd4' },
  Report:     { icon:'📊', bg:'#F0FFF4', text:'#1c4532', border:'#9AE6B4', color:'#38a169' },
  Syllabus:   { icon:'📚', bg:'#FFFBEB', text:'#744210', border:'#FAF089', color:'#d69e2e' },
  Circular:   { icon:'📋', bg:'#FFF5F5', text:'#742a2a', border:'#FEB2B2', color:'#e53e3e' },
  Result:     { icon:'🏆', bg:'#E6FFFA', text:'#1d4044', border:'#81E6D9', color:'#319795' },
  Regulation: { icon:'⚖️', bg:'#F5F3FF', text:'#4C1D95', border:'#DDD6FE', color:'#7C3AED' },
  Affiliation:{ icon:'🏛️', bg:'#F0F9FF', text:'#0C4A6E', border:'#BAE6FD', color:'#0284C7' },
  Magazine:   { icon:'📖', bg:'#FEF3C7', text:'#92400E', border:'#FCD34D', color:'#F59E0B' },
  Poster:     { icon:'🎨', bg:'#FDF2F8', text:'#9D174D', border:'#FBCFE8', color:'#EC4899' },
};

const getTS  = ts => ts?.toDate ? ts.toDate() : new Date(ts || Date.now());
const fmtDt  = ts => { const d=getTS(ts); return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`; };

export default function DocumentsPage() {
  const [docs,     setDocs]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selYear,  setSelYear]  = useState('All');
  const [selMonth, setSelMonth] = useState('All');
  const [selType,  setSelType]  = useState('All');
  const [search,   setSearch]   = useState('');
  const [view,     setView]     = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const navy = COLORS.navy || '#0B1F4E';
  const gold = COLORS.gold || '#C9A227';

  useEffect(() => {
    window.scrollTo(0, 0);
    const q = collection(db, 'pdfReports');
    const unsub = onSnapshot(q, snap => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => {
        const ta = a.createdAt?.toMillis ? a.createdAt.toMillis() : (new Date(a.createdAt || 0).getTime() || 0);
        const tb = b.createdAt?.toMillis ? b.createdAt.toMillis() : (new Date(b.createdAt || 0).getTime() || 0);
        return tb - ta;
      });
      setDocs(list);
      setLoading(false);
    }, () => setLoading(false));

    const handleSync = () => {
      // Re-query triggered automatically by Firestore listener
    };
    window.addEventListener('gnc_live_sync', handleSync);

    return () => {
      unsub();
      window.removeEventListener('gnc_live_sync', handleSync);
    };
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

  useEffect(() => {
    setCurrentPage(1);
  }, [selYear, selMonth, selType, search]);

  const filtered = useMemo(() => {
    return docs.filter(d => {
      const dt = getTS(d.createdAt);
      if (selYear  !== 'All' && dt.getFullYear() !== Number(selYear))         return false;
      if (selMonth !== 'All' && MONTHS_SHORT[dt.getMonth()] !== selMonth)     return false;
      if (selType  !== 'All' && (d.type||'Document') !== selType)             return false;
      if (search && !d.title?.toLowerCase().includes(search.toLowerCase()))   return false;
      return true;
    });
  }, [docs, selYear, selMonth, selType, search]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const grouped = useMemo(() => {
    const map = {};
    paginated.forEach(d => {
      const y = String(getTS(d.createdAt).getFullYear());
      if (!map[y]) map[y] = [];
      map[y].push(d);
    });
    return map;
  }, [paginated]);

  return (
    <div className="profile-page-wrapper">
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        .doc-fb{border:none;font-family:inherit;cursor:pointer;transition:all .15s}
        .doc-card-hover{transition:all .2s}
        .doc-card-hover:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(11,31,78,.13)!important}
        .doc-row-hover{transition:all .15s}
        .doc-row-hover:hover{background:#f8fafc!important;border-color:${gold}55!important}
        .dl-btn-hover{transition:all .18s; cursor:pointer;}
        .dl-btn-hover:hover{background:${gold}!important;color:${navy}!important}
      `}</style>

      {/* ── HERO ── */}
      <header className="profile-hero" style={{ backgroundImage:`url('https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2070&auto=format&fit=crop')` }}>
        <div className="hero-overlay" />
        <div className="hero-content anim-fade-in">
          <h1 className="hero-title">📁 Document Archive</h1>
          <p className="hero-subtitle">Official syllabi, circulars, institutional reports, and regulatory archives filtered by year and category</p>
        </div>
      </header>

      {/* Counters Section */}
      <div style={{ maxWidth: '1000px', margin: '-80px auto 40px', padding: '20px', position: 'relative', zIndex: 10, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent: 'center' }}>
          {Object.entries(typeCounts).map(([type,count]) => {
            const m = DOC_META[type]||{icon:'📄'};
            return (
              <button key={type} onClick={() => setSelType(selType===type?'All':type)}
                style={{ background:selType===type ? '#fffbeb' : '#fff', border:`1px solid ${selType===type ? gold : '#e2e8f0'}`, borderRadius:11, padding:'10px 18px', color:navy, cursor:'pointer', textAlign:'center', transition:'all .2s' }}>
                <span style={{ display:'block', fontSize:19 }}>{m.icon}</span>
                <span style={{ display:'block', fontSize:22, fontWeight:900, color:gold, lineHeight:1 }}>{count}</span>
                <span style={{ display:'block', fontSize:11, color:'#64748b', marginTop:2, fontWeight: 600 }}>{type}</span>
              </button>
            );
          })}
          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:11, padding:'10px 18px', textAlign:'center' }}>
            <span style={{ display:'block', fontSize:19 }}>📂</span>
            <span style={{ display:'block', fontSize:22, fontWeight:900, color:gold, lineHeight:1 }}>{docs.length}</span>
            <span style={{ display:'block', fontSize:11, color:'#64748b', marginTop:2, fontWeight: 600 }}>Total</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <main>
            {/* ── Filter Panel ── */}
            <section style={{ background: '#fff', padding: '30px 40px', borderRadius: '16px', boxShadow: '0 8px 25px rgba(0,0,0,0.07)', animationDelay:'.1s' }}>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center', marginBottom:16 }}>
                <div style={{ flex:1, minWidth:200, position:'relative' }}>
                  <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', opacity:.4, fontSize:16, pointerEvents:'none' }}>🔍</span>
                  <label htmlFor="doc-search" className="sr-only">Search documents</label>
                  <input id="doc-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents by title or keyword..."
                    style={{ width:'100%', padding:'10px 14px 10px 38px', border:'2px solid #e2e8f0', borderRadius:10, fontSize:14, fontFamily:'inherit', background:'#f8fafc', outline:'none', boxSizing:'border-box', transition:'border-color .2s' }}
                    onFocus={e => e.target.style.borderColor=gold}
                    onBlur={e  => e.target.style.borderColor='#e2e8f0'} />
                </div>
                <div style={{ display:'flex', gap:7 }}>
                  {['grid','list'].map(v => (
                    <button key={v} className="doc-fb" onClick={() => setView(v)}
                      style={{ padding:'9px 16px', minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius:9, border:`2px solid ${view===v?navy:'#e2e8f0'}`, background:view===v?navy:'transparent', color:view===v?'#fff':'#718096', fontWeight:700, fontSize:12.5 }}>
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
                    style={{ padding:'4px 14px', minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius:20, border:`2px solid ${selYear===String(y)?gold:'#e2e8f0'}`, background:selYear===String(y)?gold:'transparent', color:selYear===String(y)?navy:'#718096', fontWeight:700, fontSize:12.5 }}>
                    {y}
                  </button>
                ))}
              </div>

              {/* Month + Type */}
              <div style={{ display:'flex', gap:7, flexWrap:'wrap', alignItems:'center', marginBottom:10 }}>
                <span style={{ fontSize:10.5, fontWeight:700, color:'#a0aec0', textTransform:'uppercase', letterSpacing:.8, flexShrink:0 }}>MONTH:</span>
                {['All',...MONTHS_SHORT].map(m => (
                  <button key={m} className="doc-fb" onClick={() => setSelMonth(m)}
                    style={{ padding:'4px 10px', minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius:7, border:`1.5px solid ${selMonth===m?navy:'#e2e8f0'}`, background:selMonth===m?navy:'transparent', color:selMonth===m?'#fff':'#718096', fontWeight:600, fontSize:12 }}>
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
                      style={{ padding:'4px 13px', minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius:20, border:`2px solid ${selType===t?m.border:'#e2e8f0'}`, background:selType===t?m.bg:'transparent', color:selType===t?m.text:'#718096', fontWeight:700, fontSize:12 }}>
                      {t!=='All'&&((DOC_META[t]?.icon||'📄')+' ')}{t}
                    </button>
                  );
                })}
                {(selYear!=='All'||selMonth!=='All'||selType!=='All'||search) && (
                  <button className="doc-fb" onClick={() => { setSelYear('All'); setSelMonth('All'); setSelType('All'); setSearch(''); }}
                    style={{ padding:'4px 12px', minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius:20, border:'2px solid #FEB2B2', background:'#FFF5F5', color:'#e53e3e', fontWeight:700, fontSize:12 }}>
                    ✕ Clear
                  </button>
                )}
              </div>
            </section>

            {/* ── Documents List ── */}
            <section style={{ background: '#fff', padding: '30px 40px', borderRadius: '16px', boxShadow: '0 8px 25px rgba(0,0,0,0.07)', marginTop: '30px', animationDelay:'.2s' }}>
              <h2 className="section-heading">📚 Official Documents ({filtered.length})</h2>
              <div className="heading-underline" />

              {loading ? (
                <div style={{ textAlign:'center', padding:'60px 20px' }}>
                  <div style={{ width:40, height:40, border:`4px solid ${gold}`, borderTop:'4px solid transparent', borderRadius:'50%', animation:'spin .8s linear infinite', margin:'0 auto 14px' }} />
                  <p style={{ color:'#718096', fontWeight:600 }}>Loading official documents...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign:'center', padding:'50px 20px' }}>
                  <div style={{ fontSize:44, marginBottom:10 }}>📂</div>
                  <h3 style={{ color:navy, fontWeight:800, margin:'0 0 6px' }}>No documents found</h3>
                  <p style={{ color:'#718096', fontSize:13.5 }}>Try adjusting your search criteria or resetting filters</p>
                </div>
              ) : view === 'grid' ? (

                /* ── GRID VIEW ── */
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))', gap:20 }}>
                  {paginated.map(d => {
                    const m = DOC_META[d.type]||DOC_META.Document;
                    const pdfLink = d.pdfUrl || d.link;
                    const waText = encodeURIComponent(`📄 Check out "${d.title}" from Guru Nanak College:\n${pdfLink || window.location.href}`);

                    return (
                      <div key={d.id} className="doc-card-hover"
                        style={{ background:'#fff', borderRadius:16, overflow:'hidden', boxShadow:'0 4px 18px rgba(11,31,78,.06)', border:'1.5px solid #edf2f7', display:'flex', flexDirection:'column' }}>
                        
                        {d.coverImage ? (
                          <div style={{
                            width: '100%',
                            height: (d.type === 'Magazine' || d.targetPage === 'magazine') ? 260 : 180,
                            position: 'relative',
                            overflow: 'hidden',
                            background: '#09172e',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <img
                              src={d.coverImage}
                              alt=""
                              aria-hidden="true"
                              style={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'blur(22px) brightness(0.4)',
                                opacity: 0.7
                              }}
                            />
                            <img
                              src={d.coverImage}
                              alt={d.title}
                              style={{
                                maxHeight: '90%',
                                maxWidth: '90%',
                                objectFit: 'contain',
                                position: 'relative',
                                zIndex: 2,
                                borderRadius: (d.type === 'Magazine' || d.targetPage === 'magazine') ? '2px 6px 6px 2px' : 6,
                                boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                                borderLeft: (d.type === 'Magazine' || d.targetPage === 'magazine') ? '3px solid rgba(255,255,255,0.4)' : 'none'
                              }}
                            />
                            <span style={{ position:'absolute', top:10, right:10, background:m.bg, color:m.text, border:`1px solid ${m.border}`, padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:800, zIndex: 3 }}>
                              {m.icon} {d.type||'Document'}
                            </span>
                          </div>
                        ) : (
                          <div style={{ height:5, background:`linear-gradient(90deg,${navy},${gold})` }} />
                        )}

                        <div style={{ padding:'18px 20px 16px', flex:1, display:'flex', flexDirection:'column' }}>
                          {!d.coverImage && (
                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                              <div style={{ width:48, height:48, borderRadius:12, background:m.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, border:`1px solid ${m.border}` }}>
                                {m.icon}
                              </div>
                              <span style={{ background:m.bg, color:m.text, border:`1px solid ${m.border}`, padding:'3px 11px', borderRadius:20, fontSize:11.5, fontWeight:700 }}>{d.type||'Document'}</span>
                            </div>
                          )}

                          <h3 style={{ margin:'0 0 6px', fontSize:14.5, fontWeight:800, color:navy, lineHeight:1.4 }}>{d.title}</h3>
                          
                          {d.description && (
                            <p style={{ margin:'0 0 10px', fontSize:12, color:'#64748b', lineHeight:1.4, overflow:'hidden', textOverflow:'ellipsis', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
                              {d.description}
                            </p>
                          )}

                          <div style={{ marginTop:'auto', paddingTop:12, display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #f1f5f9', marginBottom:14 }}>
                            <span style={{ fontSize:11.5, color:'#a0aec0', fontWeight:600 }}>📅 {fmtDt(d.createdAt)}</span>
                            {d.fileSize && <span style={{ fontSize:11, color:'#64748b', background:'#f8fafc', padding:'2px 7px', borderRadius:6, border:'1px solid #e2e8f0', fontWeight:700 }}>{d.fileSize}</span>}
                          </div>

                          <div style={{ display:'flex', gap:8 }}>
                            <a href={pdfLink} target="_blank" rel="noreferrer" 
                              onClick={(e) => { 
                                if (pdfLink && (pdfLink.includes('drive.google') || pdfLink.toLowerCase().endsWith('.pdf') || pdfLink.includes('firebase') || pdfLink.startsWith('blob:'))) {
                                  e.preventDefault(); 
                                  setSelectedPdf({ url: pdfLink, title: d.title || 'Document' }); 
                                }
                              }} 
                              className="dl-btn-hover"
                              style={{ flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', minHeight: 42, gap:6, background:navy, color:'#fff', padding:'9px 14px', borderRadius:9, fontSize:13, fontWeight:700, textDecoration:'none', border:'none', cursor:'pointer' }}>
                              👁️ View PDF
                            </a>

                            <button
                              type="button"
                              onClick={() => window.open(`https://api.whatsapp.com/send?text=${waText}`, '_blank')}
                              style={{ background:'#25D366', color:'#fff', border:'none', borderRadius:9, minWidth:42, minHeight:42, display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:15, boxShadow:'0 2px 8px rgba(37,211,102,0.3)' }}
                              title="Share on WhatsApp">
                              📲
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              ) : (
                /* ── LIST VIEW ── */
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
                        const pdfLink = d.pdfUrl || d.link;
                        const waText = encodeURIComponent(`📄 Check out "${d.title}" from Guru Nanak College:\n${pdfLink || window.location.href}`);

                        return (
                          <div key={d.id} className="doc-row-hover"
                            style={{ background:'#fff', borderRadius:11, padding:'12px 16px', display:'flex', alignItems:'center', gap:13, border:'1px solid #edf2f7', boxShadow:'0 2px 8px rgba(11,31,78,.04)' }}>
                            {d.coverImage ? (
                              <div style={{
                                width: (d.type === 'Magazine' || d.targetPage === 'magazine') ? 38 : 44,
                                height: (d.type === 'Magazine' || d.targetPage === 'magazine') ? 50 : 44,
                                borderRadius: (d.type === 'Magazine' || d.targetPage === 'magazine') ? '2px 5px 5px 2px' : 10,
                                overflow: 'hidden',
                                flexShrink: 0,
                                background: '#09172e',
                                border: '1px solid #e2e8f0',
                                borderLeft: (d.type === 'Magazine' || d.targetPage === 'magazine') ? `3px solid ${gold}` : '1px solid #e2e8f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <img src={d.coverImage} alt="" style={{ width:'100%', height:'100%', objectFit: (d.type === 'Magazine' || d.targetPage === 'magazine') ? 'contain' : 'cover' }} />
                              </div>
                            ) : (
                              <div style={{ width:44, height:44, borderRadius:10, background:m.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:21, flexShrink:0, border:`1px solid ${m.border}` }}>
                                {m.icon}
                              </div>
                            )}

                            <div style={{ flex:1, overflow:'hidden' }}>
                              <div style={{ fontWeight:700, fontSize:14.5, color:navy, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.title}</div>
                              <div style={{ display:'flex', gap:8, marginTop:4, alignItems:'center' }}>
                                <span style={{ background:m.bg, color:m.text, border:`1px solid ${m.border}`, padding:'2px 8px', borderRadius:20, fontSize:11, fontWeight:700 }}>{d.type||'Document'}</span>
                                <span style={{ fontSize:12, color:'#a0aec0' }}>📅 {fmtDt(d.createdAt)}</span>
                                {d.fileSize && <span style={{ fontSize:11, color:'#64748b' }}>• {d.fileSize}</span>}
                              </div>
                            </div>

                            <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                              <a href={pdfLink} target="_blank" rel="noreferrer" 
                                onClick={(e) => { 
                                  if (pdfLink && (pdfLink.includes('drive.google') || pdfLink.toLowerCase().endsWith('.pdf') || pdfLink.includes('firebase') || pdfLink.startsWith('blob:'))) {
                                    e.preventDefault(); 
                                    setSelectedPdf({ url: pdfLink, title: d.title || 'Document' }); 
                                  }
                                }} 
                                className="dl-btn-hover"
                                style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', minHeight: 38, gap:6, background:navy, color:'#fff', padding:'8px 16px', borderRadius:8, fontSize:12.5, fontWeight:700, textDecoration:'none', border:'none', cursor:'pointer', whiteSpace:'nowrap' }}>
                                👁️ Open
                              </a>

                              <button
                                type="button"
                                onClick={() => window.open(`https://api.whatsapp.com/send?text=${waText}`, '_blank')}
                                style={{ background:'#25D366', color:'#fff', border:'none', borderRadius:8, width:38, minHeight:38, display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:14 }}
                                title="Share on WhatsApp">
                                📲
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
              {!loading && filtered.length > 0 && (
                <PremiumPagination
                  totalItems={filtered.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </section>

          </main>
        </div>

      {selectedPdf && (
        <Suspense fallback={null}>
          <PDFModal 
            url={selectedPdf.url} 
            title={selectedPdf.title} 
            onClose={() => setSelectedPdf(null)} 
          />
        </Suspense>
      )}
    </div>
  );
}