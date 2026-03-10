import React, { useState, useMemo, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const CATEGORIES   = ['All','General','Examination','Admission','Holiday','Sports','Cultural','Academic'];

const getTS   = ts => ts?.toDate ? ts.toDate() : new Date(ts || Date.now());

export default function NotificationsPage() {
  const [notices,  setNotices]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selYear,  setSelYear]  = useState('All');
  const [selMonth, setSelMonth] = useState('All');
  const [selCat,   setSelCat]   = useState('All');
  const [search,   setSearch]   = useState('');

  const navy = COLORS.navy || '#0B1F4E';
  const gold = COLORS.gold || '#C9A227';

  useEffect(() => {
    window.scrollTo(0, 0);
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => {
      setNotices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, []);

  const years = useMemo(() => {
    const s = new Set(notices.map(n => getTS(n.createdAt).getFullYear()));
    return ['All', ...Array.from(s).sort((a, b) => b - a)];
  }, [notices]);

  const filtered = useMemo(() => notices.filter(n => {
    const d = getTS(n.createdAt);
    if (selYear  !== 'All' && d.getFullYear() !== Number(selYear))        return false;
    if (selMonth !== 'All' && MONTHS_SHORT[d.getMonth()] !== selMonth)    return false;
    if (selCat   !== 'All' && (n.type || 'General') !== selCat)           return false;
    if (search && !n.text?.toLowerCase().includes(search.toLowerCase()))  return false;
    return true;
  }), [notices, selYear, selMonth, selCat, search]);

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
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        /* PREMIUM FILTER UI */
        .filter-container { background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px; margin-bottom: 40px; box-shadow: 0 10px 40px -10px rgba(15,23,42,0.05); }
        .search-wrapper { position: relative; flex: 1; }
        .search-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); font-size: 18px; opacity: 0.4; pointer-events: none; }
        .premium-input { width: 100%; padding: 15px 20px 15px 48px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; font-size: 15px; color: ${navy}; font-family: inherit; font-weight: 600; outline: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-sizing: border-box; }
        .premium-input:focus { background: #fff; border-color: ${gold}; box-shadow: 0 0 0 4px rgba(244,160,35,0.15); }
        .premium-input::placeholder { color: #94a3b8; font-weight: 500; }
        .filter-row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-top: 20px; padding-top: 20px; border-top: 1px dashed #e2e8f0; }
        .filter-label { font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1px; min-width: 80px; }
        .pill-group { display: flex; gap: 10px; flex-wrap: wrap; }
        .premium-pill { background: #f1f5f9; border: 1px solid transparent; color: #475569; padding: 8px 20px; border-radius: 50px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .premium-pill:hover { background: #e2e8f0; color: #0f172a; }
        .premium-pill.active { background: ${navy}; color: #fff; box-shadow: 0 6px 15px rgba(15,35,71,0.2); transform: translateY(-2px); }
        .clear-btn { background: #fef2f2; color: #ef4444; border: none; padding: 15px 24px; border-radius: 14px; font-size: 14px; font-weight: 800; cursor: pointer; transition: 0.2s; white-space: nowrap; height: fit-content; }
        .clear-btn:hover { background: #fee2e2; }

        /* FLAT CARD */
        .flat-card { border: 1px solid #e2e8f0; background: #fff; border-radius: 16px; padding: 24px; margin-bottom: 16px; transition: all 0.2s; display: flex; align-items: flex-start; gap: 20px; }
        .flat-card:hover { background: #f8fafc; border-color: ${gold}; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
      `}</style>

      {/* Hero */}
      <header style={{ position: 'relative', padding: '100px 20px 80px', background: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop') center/cover`, borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${navy}f2, ${navy}cc)` }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(244, 160, 35, 0.15)', color: gold, padding: '6px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: 800, letterSpacing: '1px', marginBottom: '15px', border: `1px solid rgba(244, 160, 35, 0.3)` }}>GURU NANAK COLLEGE</div>
          <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: 900, margin: '0 0 15px', letterSpacing: '-1px' }}>Notice Board</h1>
          <p style={{ color: '#cbd5e1', fontSize: '18px', maxWidth: '600px', margin: 0, lineHeight: 1.6 }}>Official announcements, circulars, and administrative updates.</p>
        </div>
      </header>

      {/* Stats */}
      <div style={{ maxWidth: '1000px', margin: '-40px auto 40px', position: 'relative', zIndex: 10, display: 'flex', gap: '15px', padding: '0 20px', flexWrap: 'wrap' }}>
        {[ { val: notices.length, label: 'Total Notices' }, { val: notices.filter(n=>n.isNew).length, label: 'New Updates' }, { val: years.length - 1, label: 'Years of Data' } ].map((s, i) => (
          <div key={i} style={{ flex: 1, minWidth: '150px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '4px', height: '40px', background: gold, borderRadius: '4px' }} />
            <div><div style={{ fontSize: '24px', fontWeight: 900, color: navy, lineHeight: 1 }}>{s.val}</div><div style={{ fontSize: '12px', color: '#64748b', fontWeight: 700, marginTop: '4px', textTransform: 'uppercase' }}>{s.label}</div></div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto 80px', padding: '0 20px' }}>
        
        {/* 🌟 PREMIUM FILTER DASHBOARD 🌟 */}
        <div className="filter-container">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input className="premium-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notices by title, keyword, or subject..." />
            </div>
            {(selYear!=='All'||selMonth!=='All'||selCat!=='All'||search) && (
              <button className="clear-btn" onClick={() => { setSelYear('All'); setSelMonth('All'); setSelCat('All'); setSearch(''); }}>✕ Clear All</button>
            )}
          </div>

          <div className="filter-row">
            <div className="filter-label">Category</div>
            <div className="pill-group">
              {CATEGORIES.map(c => <button key={c} className={`premium-pill ${selCat===c?'active':''}`} onClick={() => setSelCat(c)}>{c}</button>)}
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-label">Timeline</div>
            <div className="pill-group">
              {years.map(y => <button key={y} className={`premium-pill ${selYear===String(y)?'active':''}`} onClick={() => setSelYear(String(y))}>{y}</button>)}
            </div>
          </div>
        </div>

        {/* List */}
        {loading ? <div style={{ textAlign: 'center', padding: '40px', color: '#64748b', fontWeight: 700 }}>Syncing Database...</div> : 
         filtered.length === 0 ? <div style={{ textAlign: 'center', padding: '60px', border: '2px dashed #cbd5e1', borderRadius: '16px', color: '#64748b' }}><span style={{fontSize: '40px', display:'block', marginBottom:'10px'}}>📭</span>No notices match your advanced filter.</div> : (
          Object.entries(grouped).map(([monthYear, items]) => (
            <div key={monthYear} style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 900, color: navy, borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: gold }}>📅</span> {monthYear}</h3>
              {items.map(n => {
                const d = getTS(n.createdAt);
                return (
                  <div key={n.id} className="flat-card">
                    <div style={{ textAlign: 'center', minWidth: '65px', background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '14px 10px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{MONTHS_SHORT[d.getMonth()]}</div>
                      <div style={{ fontSize: '26px', fontWeight: 900, color: navy, lineHeight: 1, marginTop: '4px' }}>{d.getDate()}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 12px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '50px', color: navy, textTransform: 'uppercase' }}>{n.type || 'General'}</span>
                        {n.isNew && <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: '#ef4444', padding: '3px 8px', borderRadius: '50px' }}>NEW</span>}
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: n.text }} style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6, fontWeight: 500 }} />
                      {n.link && <a href={n.link} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '16px', fontSize: '13px', fontWeight: 800, color: navy, textDecoration: 'none', background: '#f1f5f9', padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', transition: 'all .2s' }} onMouseOver={e=>{e.target.style.background=navy; e.target.style.color='#fff';}} onMouseOut={e=>{e.target.style.background='#f1f5f9'; e.target.style.color=navy;}}>📎 View Attachment Document</a>}
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
}