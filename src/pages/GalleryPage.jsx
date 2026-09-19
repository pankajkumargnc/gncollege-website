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
import { resolveUrl } from '../utils/resolver';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { splitHeading } from '../utils/splitTitle';
import { Camera } from 'lucide-react';

const ITEMS_PER_PAGE = 12;
const FALLBACK_IMG = `${import.meta.env.BASE_URL}images/college_photo.webp`;

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

  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>

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
          font-family:inherit; min-height: 44px;
          display: inline-flex; align-items: center; justify-content: center;
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
          color:#fff; width:44px; height:44px; border-radius:50%; cursor:pointer;
          font-size:18px; display:flex; align-items:center; justify-content:center;
        }

        @keyframes gal-fade { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        .gal-in { animation:gal-fade .5s ease both; }
      `}</style>

      {/* ── HERO ── */}
      {!headless && (
      <div className="premium-hero">
        <div className="kinetic-bg" />
        <div className="hero-content-wrapper anim-fade-in">
          <h1 className="hero-title">{splitHeading('Photo Gallery')}</h1>
          <p className="hero-subtitle">Memorable moments of campus life, events, and achievements • {images.length}+ Photos</p>
        </div>
      </div>
      )}

      {/* ── CONTENT ── */}
      <div style={{ maxWidth:1300, margin:'0 auto', padding:headless ? '10px 0' : '48px 20px' }}>

        {/* Filter tabs */}
        <div style={{ display:'flex', justifyContent:'center', gap:8, flexWrap:'wrap', marginBottom:40 }}>
          {CATS.map(cat => (
            <button key={cat} className={`gal-filter${filter===cat?' active':''}`} onClick={() => setFilter(cat)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {cat === 'All Moments' ? <><Camera size={13} /> All</> : cat}
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
            <p style={{ color:'#94a3b8', fontWeight:600 }}>Loading gallery...</p>
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
                    src={resolveUrl(img) || FALLBACK_IMG}
                    alt={img.title || img.cat || img.album || 'Gallery photo'}
                    className="gal-img"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (e.target.src !== FALLBACK_IMG) e.target.src = FALLBACK_IMG;
                    }}
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
              {filter === 'All Moments' ? 'Gallery Empty' : `No photos found in ${filter}`}
            </h3>
            <p style={{ color:'#94a3b8', fontSize:13 }}>
              {filter === 'All Moments'
                ? 'Upload photos via the Gallery tab in the Admin Panel'
                : 'Select another category or add photos via the Admin Panel'
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

      {/* ── PRO LIGHTBOX (Swipe, Pinch-to-Zoom, Keyboard & Fullscreen) ── */}
      <Lightbox
        open={light !== null}
        close={() => setLight(null)}
        index={light ?? 0}
        slides={filtered.map(img => ({
          src: resolveUrl(img) || FALLBACK_IMG,
          title: img.title || 'Campus Moment',
          description: img.cat || img.album || 'Guru Nanak College'
        }))}
      />
    </div>
  );
}