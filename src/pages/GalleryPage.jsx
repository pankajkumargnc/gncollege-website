// src/pages/GalleryPage.jsx
// ✅ Firebase field fix: img.image (new) & img.src (old) fallback
// ✅ Categories match AdminPanel & HomePage exactly
// ✅ Lightbox with keyboard nav
// ✅ Glow hover effect (same as homepage)
// ✅ Pagination — 12 photos per page

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import { createPortal } from 'react-dom';
import PremiumPagination from '../components/PremiumPagination';

const ITEMS_PER_PAGE = 12;

const N = COLORS?.navy || '#0f2347';
const G = COLORS?.gold || '#f4a023';

// ── Categories — EXACT match with AdminPanel & HomePage ───────────────────────
const CATS = ['All Moments', 'Seminars', 'Cultural Fest', 'Guest Visit', 'Campus', 'Departments', 'NSS Programs'];

export default function GalleryPage({ gallery: galleryProp, headless }) {
  const [images,  setImages]  = useState([]);
  const [filter,  setFilter]  = useState('All Moments');
  const [light,   setLight]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // ── Firebase realtime ───────────────────────────────────────────────────────
  useEffect(() => {
    window.scrollTo(0, 0);
    // If parent already passed gallery prop (from App.jsx), use it
    if (galleryProp && galleryProp.length > 0) { 
      setImages(galleryProp); 
      setLoading(false); 
      return; 
    }
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    return onSnapshot(q,
      snap => { setImages(snap.docs.map(d => ({ id: d.id, ...d.data() }))); setLoading(false); },
      () => setLoading(false)
    );
  }, [galleryProp]);

  // ✅ FIXED LOGIC: Checks both 'cat' (new) and 'album' (old) fields
  const filtered = useMemo(() => {
    setCurrentPage(1);
    return filter === 'All Moments'
      ? images
      : images.filter(img => (img.cat || img.album) === filter);
  }, [images, filter]);

  // Paginated slice — lightbox uses full filtered array so navigation stays correct
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const closeLB   = useCallback(() => setLight(null), []);
  const prevImg   = useCallback(() => setLight(i => (i > 0 ? i - 1 : filtered.length - 1)), [filtered.length]);
  const nextImg   = useCallback(() => setLight(i => (i < filtered.length - 1 ? i + 1 : 0)), [filtered.length]);

  useEffect(() => {
    if (light === null) return;
    const fn = e => {
      if (e.key === 'Escape')     closeLB();
      if (e.key === 'ArrowLeft')  prevImg();
      if (e.key === 'ArrowRight') nextImg();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [light, closeLB, prevImg, nextImg]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: '"Amazon Ember","Inter",sans-serif' }}>

      <style>{`
        /* glow card wrapper — same as homepage */
        .gc { position:relative; z-index:0; display:block; }
        .gc::before {
          content:''; position:absolute; inset:-3px; border-radius:inherit;
          background: conic-gradient(from 0deg,#a855f7,#ec4899,#f97316,#eab308,#06b6d4,#6366f1,#a855f7);
          opacity:0; filter:blur(10px); z-index:-1; transition:opacity .35s ease;
        }
        .gc:hover::before { opacity:.6; }
        .gc.r14 { border-radius:16px; }
        .gal-img-item {
          position:relative; border-radius:14px; overflow:hidden;
          aspect-ratio:4/3; cursor:pointer;
          box-shadow:0 4px 14px rgba(0,0,0,.06);
          transition:box-shadow .3s;
        }
        .gc:hover .gal-img-item { box-shadow:0 8px 24px rgba(0,0,0,.14); }
        .gal-img { width:100%; height:100%; object-fit:cover; transition:transform .5s ease; }
        .gc:hover .gal-img { transform:scale(1.08); }
        .gal-ov {
          position:absolute; inset:0;
          background:linear-gradient(to top,rgba(15,35,71,.88),transparent);
          opacity:0; transition:opacity .35s;
          display:flex; flex-direction:column; justify-content:flex-end; padding:16px;
        }
        .gc:hover .gal-ov { opacity:1; }
        .gal-cat {
          color:${G}; font-size:10px; font-weight:800; letter-spacing:.5px;
          transform:translateY(8px); opacity:0; transition:all .35s .05s;
        }
        .gal-ttl {
          color:#fff; font-size:13px; font-weight:700; margin-top:4px;
          transform:translateY(8px); opacity:0; transition:all .35s .12s;
        }
        .gc:hover .gal-cat, .gc:hover .gal-ttl { transform:translateY(0); opacity:1; }

        /* filter buttons */
        .gal-filter {
          padding:9px 20px; border-radius:50px;
          border:2px solid #e2e8f0; background:#fff;
          color:${N}; font-weight:700; font-size:13px;
          cursor:pointer; transition:all .2s;
          font-family:inherit;
        }
        .gal-filter:hover { border-color:${G}; transform:translateY(-2px); }
        .gal-filter.active {
          background:${N}; color:#fff; border-color:${N};
          box-shadow:0 5px 14px rgba(15,35,71,.2);
        }

        /* lightbox */
        .lb-ov {
          position:fixed; inset:0; z-index:9999999;
          background:rgba(6,14,28,.96); backdrop-filter:blur(8px);
          display:flex; align-items:center; justify-content:center;
        }
        .lb-img { max-width:90vw; max-height:85vh; border-radius:8px; box-shadow:0 30px 60px rgba(0,0,0,.5); }
        .lb-btn {
          position:fixed; top:50%; transform:translateY(-50%);
          background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.2);
          color:#fff; width:50px; height:50px; border-radius:50%; cursor:pointer;
          font-size:20px; display:flex; align-items:center; justify-content:center;
          transition:background .2s;
        }
        .lb-btn:hover { background:rgba(255,255,255,.25); }
        .lb-close {
          position:fixed; top:20px; right:20px;
          background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.2);
          color:#fff; width:42px; height:42px; border-radius:50%; cursor:pointer;
          font-size:18px; display:flex; align-items:center; justify-content:center;
        }

        @keyframes gal-fade { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        .gal-in { animation:gal-fade .5s ease both; }
      `}</style>

      {/* ── HERO ── */}
      {!headless && (
      <div style={{ background:`linear-gradient(135deg,${N} 0%,#1a3a7c 100%)`, padding:'70px 20px 60px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(244,160,35,.07) 1px, transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:G }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <nav style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'center', marginBottom:16, fontSize:13, fontWeight:600 }}>
            <Link to="/" style={{ color:'rgba(255,255,255,.5)', textDecoration:'none' }}>🏠 Home</Link>
            <span style={{ color:'rgba(255,255,255,.3)' }}>›</span>
            <span style={{ color:G }}>Photo Gallery</span>
          </nav>
          <h1 style={{ color:'#fff', fontSize:'clamp(28px,5vw,48px)', fontWeight:900, margin:'0 0 12px', letterSpacing:'-1px' }}>
            📸 Photo Gallery
          </h1>
          <p style={{ color:'rgba(255,255,255,.65)', fontSize:15, maxWidth:520, margin:'0 auto 24px' }}>
            Campus life, events, achievements aur college ke yaadgar pal
          </p>
          {/* Stats */}
          <div style={{ display:'flex', justifyContent:'center', gap:24, flexWrap:'wrap' }}>
            {[
              { n: images.length + '+', l: 'Total Photos' },
              { n: CATS.length - 1,     l: 'Categories' },
            ].map((s,i) => (
              <div key={i} style={{ background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.15)', borderRadius:10, padding:'10px 22px', backdropFilter:'blur(8px)' }}>
                <div style={{ fontSize:22, fontWeight:900, color:G, lineHeight:1 }}>{s.n}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.55)', marginTop:3, fontWeight:600 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}

      {/* ── CONTENT ── */}
      <div style={{ maxWidth:1300, margin:'0 auto', padding:headless ? '10px 0' : '48px 20px' }}>

        {/* Filter tabs */}
        <div style={{ display:'flex', justifyContent:'center', gap:8, flexWrap:'wrap', marginBottom:40 }}>
          {CATS.map(cat => (
            <button key={cat} className={`gal-filter${filter===cat?' active':''}`} onClick={() => setFilter(cat)}>
              {cat === 'All Moments' ? '📸 All' : cat}
            </button>
          ))}
        </div>

        {/* Count badge */}
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <span style={{ background:`${N}12`, color:N, fontWeight:800, fontSize:13, padding:'5px 16px', borderRadius:20 }}>
            {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
            {filter !== 'All Moments' ? ` in ${filter}` : ' total'}
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign:'center', padding:'60px 20px' }}>
            <div style={{ width:44, height:44, border:`4px solid ${G}`, borderTop:'4px solid transparent', borderRadius:'50%', animation:'spin .8s linear infinite', margin:'0 auto 14px' }} />
            <p style={{ color:'#94a3b8', fontWeight:600 }}>Gallery load ho rahi hai...</p>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:14 }}>
            {paginated.map((img, i) => {
              const globalIdx = (currentPage - 1) * ITEMS_PER_PAGE + i; // lightbox uses global index
              return (
              <div key={img.id}
                className="gc r14 gal-in"
                style={{ animationDelay:`${(i % 12) * 0.04}s` }}
                onClick={() => setLight(globalIdx)}
                role="button"
                tabIndex={0}
                aria-label={`Open photo: ${img.title || img.cat || 'Gallery image'}`}
                onKeyDown={e => e.key === 'Enter' && setLight(globalIdx)}
              >
                <div className="gal-img-item">
                  <img
                    src={img.image || img.src}
                    alt={img.title || img.cat || img.album || 'Gallery photo'}
                    className="gal-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="gal-ov">
                    <div className="gal-cat">{img.cat || img.album || 'Gallery'}</div>
                    <div className="gal-ttl">{img.title}</div>
                  </div>
                </div>
              </div>
            )})}
          </div>
          <PremiumPagination
            totalItems={filtered.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          </>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign:'center', background:'#fff', padding:'60px 20px', borderRadius:16, border:'1px dashed #e2e8f0', maxWidth:500, margin:'0 auto' }}>
            <div style={{ fontSize:48, marginBottom:14 }}>📸</div>
            <h3 style={{ color:N, margin:'0 0 8px', fontWeight:800 }}>
              {filter === 'All Moments' ? 'Gallery Empty' : `${filter} mein koi photo nahi`}
            </h3>
            <p style={{ color:'#94a3b8', fontSize:13 }}>
              {filter === 'All Moments'
                ? 'Admin Panel → Gallery tab se photos upload karein'
                : 'Doosri category select karein ya Admin Panel se photos add karein'
              }
            </p>
            {filter !== 'All Moments' && (
              <button className="gal-filter" style={{ marginTop:16 }} onClick={() => setFilter('All Moments')}>
                Show All Photos
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {light !== null && filtered[light] && createPortal(
        <div className="lb-ov" onClick={closeLB}>
          {/* Close */}
          <button className="lb-close" onClick={closeLB}>✕</button>

          {/* Prev */}
          {filtered.length > 1 && (
            <button className="lb-btn" style={{ left:20 }} onClick={e => { e.stopPropagation(); prevImg(); }}>‹</button>
          )}

          {/* Image */}
          <div onClick={e => e.stopPropagation()} style={{ textAlign:'center' }}>
            <img
              src={filtered[light].image || filtered[light].src}
              alt={filtered[light].title || 'Photo'}
              className="lb-img"
            />
            {(filtered[light].title || filtered[light].cat || filtered[light].album) && (
              <div style={{ marginTop:14, color:'rgba(255,255,255,.8)', fontSize:14, fontWeight:600 }}>
                {filtered[light].title}
                {(filtered[light].cat || filtered[light].album) && <span style={{ color:G, marginLeft:8, fontSize:12 }}>#{(filtered[light].cat || filtered[light].album)}</span>}
              </div>
            )}
            <div style={{ marginTop:8, color:'rgba(255,255,255,.35)', fontSize:12 }}>
              {light + 1} / {filtered.length} &nbsp;·&nbsp; ← → keys to navigate &nbsp;·&nbsp; Esc to close
            </div>
          </div>

          {/* Next */}
          {filtered.length > 1 && (
            <button className="lb-btn" style={{ right:20 }} onClick={e => { e.stopPropagation(); nextImg(); }}>›</button>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}