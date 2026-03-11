// src/pages/VideoGallery.jsx
// ✅ FIXED: fetchVideos wrapped in useCallback, dependency array correct

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';

const fmtDate = iso => {
  try { return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); }
  catch { return ''; }
};

const fmtDuration = iso8601 => {
  if (!iso8601) return '';
  const m = iso8601.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return '';
  const h = parseInt(m[1] || 0), min = parseInt(m[2] || 0), s = parseInt(m[3] || 0);
  if (h > 0) return `${h}:${String(min).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${min}:${String(s).padStart(2, '0')}`;
};

const fmtCount = n => {
  if (!n) return '0';
  const num = parseInt(n);
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000)    return (num / 1000).toFixed(1) + 'K';
  return String(num);
};

export default function VideoGallery() {
  const [ytConfig,  setYtConfig]  = useState(null);
  const [videos,    setVideos]    = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [playingId, setPlayingId] = useState(null);
  const [filter,    setFilter]    = useState('all');

  const navy = COLORS.navy || '#0f2347';
  const gold = COLORS.gold || '#f4a023';

  // ── Firestore se YouTube config ──────────────────────────────────────────
  useEffect(() => {
    window.scrollTo(0, 0);
    return onSnapshot(doc(db, 'settings', 'youtube'), snap => {
      if (snap.exists()) setYtConfig(snap.data());
    });
  }, []);

  // ── FIX: useCallback — fetchVideos stable reference ──────────────────────
  const fetchVideos = useCallback(async () => {
    if (!ytConfig?.apiKey || !ytConfig?.channelId) return;
    setLoading(true); setError('');
    try {
      const { apiKey, channelId, maxResults = 12 } = ytConfig;

      // Step 1: Uploads playlist ID
      const chRes  = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`);
      const chData = await chRes.json();
      if (chData.error) throw new Error(chData.error.message);
      const uploadId = chData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
      if (!uploadId) throw new Error('Channel not found or no uploads');

      // Step 2: Video IDs from playlist
      const plRes  = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadId}&maxResults=${maxResults}&key=${apiKey}`);
      const plData = await plRes.json();
      if (plData.error) throw new Error(plData.error.message);
      const videoIds = plData.items.map(i => i.snippet.resourceId.videoId).join(',');

      // Step 3: Full video details
      const vRes  = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`);
      const vData = await vRes.json();
      if (vData.error) throw new Error(vData.error.message);
      setVideos(vData.items || []);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [ytConfig]); // ← ytConfig pe depend karta hai

  // ── FIX: dependency array mein fetchVideos ────────────────────────────────
  useEffect(() => {
    if (!ytConfig?.apiKey || !ytConfig?.channelId) return;
    fetchVideos();
  }, [ytConfig, fetchVideos]);

  const TYPES    = ['all', 'seminar', 'cultural', 'sports', 'nss', 'ncc', 'workshop'];
  const filtered = filter === 'all' ? videos : videos.filter(v =>
    v.snippet?.title?.toLowerCase().includes(filter) ||
    v.snippet?.description?.toLowerCase().includes(filter)
  );

  return (
    <div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes yt-fadein { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .yt-card { transition:all .25s; border-radius:16px; overflow:hidden; background:#fff; box-shadow:0 4px 16px rgba(11,31,78,.07); border:1px solid #edf2f7; animation:yt-fadein .4s ease both; }
        .yt-card:hover { transform:translateY(-5px); box-shadow:0 14px 36px rgba(11,31,78,.13)!important; }
        .yt-thumb { position:relative; aspect-ratio:16/9; overflow:hidden; }
        .yt-thumb img { width:100%; height:100%; object-fit:cover; transition:transform .4s; }
        .yt-card:hover .yt-thumb img { transform:scale(1.06); }
        .yt-play { position:absolute; inset:0; background:rgba(11,31,78,.45); display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity .2s; }
        .yt-card:hover .yt-play { opacity:1; }
        .yt-filter-btn { border:none; font-family:inherit; cursor:pointer; transition:all .15s; }
      `}</style>

      {/* Hero */}
      <header className="profile-hero" style={{ backgroundImage:`url('https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2070&auto=format&fit=crop')` }}>
        <div className="hero-overlay" />
        <div className="hero-content anim-fade-in">
          <nav style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14, fontSize:13, fontWeight:600 }}>
            <Link to="/" style={{ color:'rgba(255,255,255,.55)', textDecoration:'none' }}>🏠 Home</Link>
            <span style={{ color:'rgba(255,255,255,.3)' }}>›</span>
            <span style={{ color:gold }}>Video Gallery</span>
          </nav>
          <h1 className="hero-title">▶ Video Gallery</h1>
          <p className="hero-subtitle">College ke latest events, seminars aur cultural programs — YouTube se live</p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap', marginTop:22 }}>
            {[
              { val:videos.length, label:'Videos' },
              { val:fmtCount(videos.reduce((s,v) => s + parseInt(v.statistics?.viewCount || 0), 0)), label:'Total Views' },
              { val:videos.filter(v => parseInt(v.statistics?.likeCount) > 0).length, label:'With Likes' },
            ].map((s, i) => (
              <div key={i} style={{ background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.18)', borderRadius:11, padding:'10px 20px', textAlign:'center', backdropFilter:'blur(8px)' }}>
                <div style={{ fontSize:24, fontWeight:900, color:gold, lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.55)', marginTop:3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 20px' }}>

        {!ytConfig?.apiKey ? (
          <div style={{ textAlign:'center', padding:'80px 20px', background:'#fff', borderRadius:20, boxShadow:'0 8px 30px rgba(11,31,78,.07)' }}>
            <div style={{ fontSize:60, marginBottom:16 }}>📺</div>
            <h2 style={{ color:navy, fontWeight:900, margin:'0 0 8px' }}>YouTube Setup Required</h2>
            <p style={{ color:'#64748b', fontSize:15 }}>Admin Panel → YouTube Manager tab → API Key aur Channel ID add karein.</p>
          </div>

        ) : loading ? (
          <div style={{ textAlign:'center', padding:'80px 20px' }}>
            <div style={{ width:48, height:48, border:`4px solid ${gold}`, borderTop:'4px solid transparent', borderRadius:'50%', animation:'spin .8s linear infinite', margin:'0 auto 16px' }} />
            <p style={{ color:'#718096', fontWeight:600 }}>YouTube se videos fetch ho rahi hain...</p>
          </div>

        ) : error ? (
          <div style={{ textAlign:'center', padding:'60px 20px', background:'#fff5f5', borderRadius:16, border:'1px solid #fed7d7' }}>
            <div style={{ fontSize:44, marginBottom:12 }}>⚠️</div>
            <h3 style={{ color:'#c53030', margin:'0 0 8px' }}>API Error</h3>
            <p style={{ color:'#718096' }}>{error}</p>
            <button onClick={fetchVideos}
              style={{ marginTop:16, padding:'10px 24px', background:navy, color:'#fff', border:'none', borderRadius:10, fontWeight:700, cursor:'pointer', fontSize:14, fontFamily:'inherit' }}>
              🔄 Retry
            </button>
          </div>

        ) : (
          <>
            {/* Filter */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:32, alignItems:'center' }}>
              <span style={{ fontSize:11, fontWeight:700, color:'#a0aec0', textTransform:'uppercase', letterSpacing:.8 }}>FILTER:</span>
              {TYPES.map(t => (
                <button key={t} className="yt-filter-btn" onClick={() => setFilter(t)}
                  style={{ padding:'6px 16px', borderRadius:20, border:`2px solid ${filter===t?navy:'#e2e8f0'}`, background:filter===t?navy:'transparent', color:filter===t?'#fff':'#718096', fontWeight:700, fontSize:12.5, textTransform:'capitalize' }}>
                  {t === 'all' ? '🎬 All' : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
              <span style={{ marginLeft:'auto', background:'#f0f4ff', color:navy, borderRadius:20, padding:'5px 14px', fontSize:12.5, fontWeight:800 }}>
                {filtered.length} videos
              </span>
            </div>

            {/* Grid */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:24 }}>
              {filtered.map((v, i) => {
                const vid = v.id;
                const sn  = v.snippet || {};
                const st  = v.statistics || {};
                const cd  = v.contentDetails || {};
                const isPlaying = playingId === vid;
                return (
                  <div key={vid} className="yt-card" style={{ animationDelay:`${i * .06}s` }}>
                    <div className="yt-thumb" onClick={() => setPlayingId(isPlaying ? null : vid)} style={{ cursor:'pointer' }}>
                      {isPlaying ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${vid}?autoplay=1`}
                          title={sn.title}
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          style={{ width:'100%', height:'100%', border:'none', position:'absolute', inset:0 }}
                        />
                      ) : (
                        <>
                          <img src={sn.thumbnails?.maxres?.url || sn.thumbnails?.high?.url || sn.thumbnails?.medium?.url} alt={sn.title} />
                          <div className="yt-play">
                            <div style={{ width:56, height:56, borderRadius:'50%', background:'#ff0000', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 24px rgba(255,0,0,.4)' }}>
                              <span style={{ color:'#fff', fontSize:20, marginLeft:4 }}>▶</span>
                            </div>
                          </div>
                          {cd.duration && (
                            <div style={{ position:'absolute', bottom:8, right:8, background:'rgba(0,0,0,.8)', color:'#fff', fontSize:11.5, fontWeight:700, padding:'3px 7px', borderRadius:5 }}>
                              {fmtDuration(cd.duration)}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <div style={{ padding:'16px 18px 18px' }}>
                      <h3 style={{ margin:'0 0 8px', fontSize:15, fontWeight:800, color:navy, lineHeight:1.4, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                        {sn.title}
                      </h3>
                      <p style={{ margin:'0 0 12px', fontSize:12, color:'#a0aec0', fontWeight:600 }}>📅 {fmtDate(sn.publishedAt)}</p>
                      <div style={{ display:'flex', gap:14, fontSize:12, color:'#718096', fontWeight:700 }}>
                        <span>👁 {fmtCount(st.viewCount)} views</span>
                        <span>👍 {fmtCount(st.likeCount)}</span>
                        <span style={{ marginLeft:'auto' }}>
                          <a href={`https://youtube.com/watch?v=${vid}`} target="_blank" rel="noreferrer"
                            style={{ color:'#ff0000', fontWeight:800, textDecoration:'none', fontSize:12 }}>
                            ▶ YouTube →
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign:'center', padding:'50px', color:'#a0aec0' }}>
                <div style={{ fontSize:44, marginBottom:10 }}>🎬</div>
                <p style={{ fontWeight:600 }}>Is category mein koi video nahi</p>
              </div>
            )}

            {ytConfig?.channelId && (
              <div style={{ textAlign:'center', marginTop:40 }}>
                <a href={`https://youtube.com/channel/${ytConfig.channelId}`} target="_blank" rel="noreferrer"
                  style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#ff0000', color:'#fff', padding:'14px 32px', borderRadius:50, fontWeight:900, fontSize:15, textDecoration:'none', boxShadow:'0 6px 20px rgba(255,0,0,.35)', transition:'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(255,0,0,.45)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,0,0,.35)'; }}>
                  ▶ Subscribe to Our Channel
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}