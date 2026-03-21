// src/pages/VideoGallery.jsx
// ✅ DUAL MODE:
//   Mode 1 — No API key: shows YouTube embeds from videoIds (same as homepage)
//   Mode 2 — With API key + channelId: full video details from YouTube API
// ✅ Glow hover effect on video cards
// ✅ All original functionality preserved

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';

const N = COLORS?.navy || '#0f2347';
const G = COLORS?.gold || '#f4a023';

const fmtDate = iso => {
  try { return new Date(iso).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }); }
  catch { return ''; }
};
const fmtDuration = iso8601 => {
  if (!iso8601) return '';
  const m = iso8601.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return '';
  const h=parseInt(m[1]||0), min=parseInt(m[2]||0), s=parseInt(m[3]||0);
  if (h>0) return `${h}:${String(min).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return `${min}:${String(s).padStart(2,'0')}`;
};
const fmtCount = n => {
  if (!n) return '0';
  const num = parseInt(n);
  if (num >= 1000000) return (num/1000000).toFixed(1)+'M';
  if (num >= 1000)    return (num/1000).toFixed(1)+'K';
  return String(num);
};

export default function VideoGallery() {
  const [ytConfig,  setYtConfig]  = useState(null);
  const [ready,     setReady]     = useState(false);
  const [videos,    setVideos]    = useState([]);      // full API mode
  const [videoIds,  setVideoIds]  = useState([]);      // simple embed mode
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [playingId, setPlayingId] = useState(null);
  const [filter,    setFilter]    = useState('all');

  // ── Firestore — YouTube config ────────────────────────────────────────────
  useEffect(() => {
    window.scrollTo(0, 0);
    return onSnapshot(doc(db, 'settings', 'youtube'), snap => {
      if (snap.exists()) {
        const d = snap.data();
        setYtConfig(d);
        // Parse videoIds for simple embed mode
        if (d.videoIds) {
          const ids = d.videoIds.split(/[\n,]/).map(s => s.trim()).filter(Boolean);
          setVideoIds(ids);
        }
      }
      setReady(true);
    }, () => setReady(true));
  }, []);

  // ── Full API fetch (only if apiKey + channelId both set) ──────────────────
  const fetchVideos = useCallback(async () => {
    if (!ytConfig?.apiKey || !ytConfig?.channelId) return;
    setLoading(true); setError('');
    try {
      const { apiKey, channelId, maxResults = 12 } = ytConfig;
      const chRes  = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`);
      const chData = await chRes.json();
      if (chData.error) throw new Error(chData.error.message);
      const uploadId = chData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
      if (!uploadId) throw new Error('Channel not found or no uploads');
      const plRes  = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadId}&maxResults=${maxResults}&key=${apiKey}`);
      const plData = await plRes.json();
      if (plData.error) throw new Error(plData.error.message);
      const ids = plData.items.map(i => i.snippet.resourceId.videoId).join(',');
      const vRes  = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${ids}&key=${apiKey}`);
      const vData = await vRes.json();
      if (vData.error) throw new Error(vData.error.message);
      setVideos(vData.items || []);
    } catch (e) { setError(e.message); }
    setLoading(false);
  }, [ytConfig]);

  useEffect(() => {
    if (!ytConfig?.apiKey || !ytConfig?.channelId) return;
    fetchVideos();
  }, [ytConfig, fetchVideos]);

  // Mode check
  const hasApiKey   = !!(ytConfig?.apiKey && ytConfig?.channelId);
  const hasVideoIds = videoIds.length > 0;

  const TYPES = ['all','seminar','cultural','sports','nss','ncc','workshop'];
  const filtered = filter==='all' ? videos : videos.filter(v =>
    v.snippet?.title?.toLowerCase().includes(filter) ||
    v.snippet?.description?.toLowerCase().includes(filter)
  );

  if (!ready) return null;

  // ── SIMPLE EMBED MODE (no API key, just videoIds) ─────────────────────────
  if (!hasApiKey && hasVideoIds) {
    const channel = ytConfig?.channelName || 'GNC College Official';
    return (
      <div style={{ background:'#f8fafc', minHeight:'100vh', fontFamily:'"Amazon Ember","Inter",sans-serif' }}>
        <style>{`
          .gc{position:relative;z-index:0;display:block;}
          .gc::before{content:'';position:absolute;inset:-3px;border-radius:inherit;background:conic-gradient(from 0deg,#a855f7,#ec4899,#f97316,#eab308,#06b6d4,#6366f1,#a855f7);opacity:0;filter:blur(10px);z-index:-1;transition:opacity .35s ease;}
          .gc:hover::before{opacity:.6;}
          .gc.r16{border-radius:18px;}
          .yt-embed-card{background:#fff;border-radius:16px;overflow:hidden;border:1px solid #edf2f7;box-shadow:0 4px 16px rgba(0,0,0,.07);transition:transform .3s,box-shadow .3s;}
          .gc:hover .yt-embed-card{transform:translateY(-6px);box-shadow:0 16px 36px rgba(15,35,71,.12);border-color:transparent;}
          @keyframes vf{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
          .vf{animation:vf .4s ease both;}
        `}</style>

        {/* Hero */}
        <div style={{ background:`linear-gradient(135deg,${N} 0%,#1a3a7c 100%)`, padding:'70px 20px 60px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(244,160,35,.07) 1px,transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />
          <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:G }} />
          <div style={{ position:'relative', zIndex:1 }}>
            <nav style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'center', marginBottom:16, fontSize:13, fontWeight:600 }}>
              <Link to="/" style={{ color:'rgba(255,255,255,.5)', textDecoration:'none' }}>🏠 Home</Link>
              <span style={{ color:'rgba(255,255,255,.3)' }}>›</span>
              <span style={{ color:G }}>Video Gallery</span>
            </nav>
            <h1 style={{ color:'#fff', fontSize:'clamp(28px,5vw,48px)', fontWeight:900, margin:'0 0 12px', letterSpacing:'-1px' }}>🎬 Video Gallery</h1>
            <p style={{ color:'rgba(255,255,255,.65)', fontSize:15, maxWidth:520, margin:'0 auto 24px' }}>
              Official {channel} channel ke latest campus videos
            </p>
            <div style={{ display:'inline-block', background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.15)', borderRadius:10, padding:'10px 22px' }}>
              <div style={{ fontSize:22, fontWeight:900, color:G, lineHeight:1 }}>{videoIds.length}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,.55)', marginTop:3 }}>Videos</div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth:1280, margin:'0 auto', padding:'48px 20px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:24 }}>
            {videoIds.map((vid, i) => (
              <div key={vid} className="gc r16 vf" style={{ animationDelay:`${i * .06}s` }}>
                <div className="yt-embed-card">
                  <div style={{ position:'relative', aspectRatio:'16/9' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${vid}`}
                      title={`Video ${i+1}`}
                      allowFullScreen
                      loading="lazy"
                      style={{ width:'100%', height:'100%', border:'none', position:'absolute', inset:0 }}
                    />
                  </div>
                  <div style={{ padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:12, color:'#94a3b8', fontWeight:600 }}>Video {i+1} of {videoIds.length}</span>
                    <a href={`https://youtube.com/watch?v=${vid}`} target="_blank" rel="noreferrer"
                      style={{ color:'#ff0000', fontWeight:800, textDecoration:'none', fontSize:12 }}>
                      ▶ YouTube →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {ytConfig?.channelId && (
            <div style={{ textAlign:'center', marginTop:48 }}>
              <p style={{ color:'#94a3b8', fontSize:13, marginBottom:16 }}>
                Admin Panel → YouTube Settings → API Key add karke full video details unlock karein
              </p>
              <a href={`https://youtube.com/channel/${ytConfig.channelId}`} target="_blank" rel="noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#ff0000', color:'#fff', padding:'13px 30px', borderRadius:50, fontWeight:900, fontSize:14, textDecoration:'none', boxShadow:'0 6px 20px rgba(255,0,0,.35)' }}>
                ▶ Subscribe to Our Channel
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── NO VIDEOS AT ALL ──────────────────────────────────────────────────────
  if (!hasApiKey && !hasVideoIds) {
    return (
      <div style={{ background:'#f8fafc', minHeight:'100vh', fontFamily:'"Amazon Ember","Inter",sans-serif' }}>
        {/* Hero */}
        <div style={{ background:`linear-gradient(135deg,${N} 0%,#1a3a7c 100%)`, padding:'70px 20px 60px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:G }} />
          <nav style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'center', marginBottom:16, fontSize:13, fontWeight:600 }}>
            <Link to="/" style={{ color:'rgba(255,255,255,.5)', textDecoration:'none' }}>🏠 Home</Link>
            <span style={{ color:'rgba(255,255,255,.3)' }}>›</span>
            <span style={{ color:G }}>Video Gallery</span>
          </nav>
          <h1 style={{ color:'#fff', fontSize:'clamp(28px,5vw,48px)', fontWeight:900, margin:'0 0 12px' }}>🎬 Video Gallery</h1>
        </div>
        <div style={{ maxWidth:600, margin:'60px auto', padding:'0 20px', textAlign:'center' }}>
          <div style={{ background:'#fff', borderRadius:20, padding:'48px 32px', boxShadow:'0 8px 30px rgba(15,35,71,.07)', border:'1px solid #e2e8f0' }}>
            <div style={{ fontSize:60, marginBottom:16 }}>📺</div>
            <h2 style={{ color:N, fontWeight:900, margin:'0 0 8px' }}>Videos Coming Soon</h2>
            <p style={{ color:'#64748b', fontSize:14, marginBottom:24 }}>Admin Panel → YouTube Manager tab se videos add karein</p>
            <Link to="/" style={{ display:'inline-block', background:N, color:'#fff', padding:'11px 28px', borderRadius:8, fontWeight:700, textDecoration:'none', fontSize:14 }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── FULL API MODE ─────────────────────────────────────────────────────────
  return (
    <div>
      <style>{`
        .gc{position:relative;z-index:0;display:block;}
        .gc::before{content:'';position:absolute;inset:-3px;border-radius:inherit;background:conic-gradient(from 0deg,#a855f7,#ec4899,#f97316,#eab308,#06b6d4,#6366f1,#a855f7);opacity:0;filter:blur(10px);z-index:-1;transition:opacity .35s ease;}
        .gc:hover::before{opacity:.6;}
        .gc.r16{border-radius:18px;}
        @keyframes yt-fadein { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        .yt-card{transition:all .25s;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 4px 16px rgba(11,31,78,.07);border:1px solid #edf2f7;animation:yt-fadein .4s ease both;}
        .gc:hover .yt-card{transform:translateY(-5px);box-shadow:0 14px 36px rgba(11,31,78,.13)!important;border-color:transparent;}
        .yt-thumb{position:relative;aspect-ratio:16/9;overflow:hidden;}
        .yt-thumb img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
        .gc:hover .yt-thumb img{transform:scale(1.06);}
        .yt-play{position:absolute;inset:0;background:rgba(11,31,78,.45);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s;}
        .gc:hover .yt-play{opacity:1;}
        .yt-filter-btn{border:none;font-family:inherit;cursor:pointer;transition:all .15s;}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg,${N} 0%,#1a3a7c 100%)`, padding:'70px 20px 60px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(244,160,35,.07) 1px,transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:G }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <nav style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'center', marginBottom:16, fontSize:13, fontWeight:600 }}>
            <Link to="/" style={{ color:'rgba(255,255,255,.5)', textDecoration:'none' }}>🏠 Home</Link>
            <span style={{ color:'rgba(255,255,255,.3)' }}>›</span>
            <span style={{ color:G }}>Video Gallery</span>
          </nav>
          <h1 style={{ color:'#fff', fontSize:'clamp(28px,5vw,48px)', fontWeight:900, margin:'0 0 12px' }}>🎬 Video Gallery</h1>
          <p style={{ color:'rgba(255,255,255,.65)', fontSize:15, maxWidth:520, margin:'0 auto 24px' }}>
            College ke latest events, seminars aur cultural programs
          </p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap', justifyContent:'center' }}>
            {[
              { val:videos.length, label:'Videos' },
              { val:fmtCount(videos.reduce((s,v)=>s+parseInt(v.statistics?.viewCount||0),0)), label:'Total Views' },
            ].map((s,i) => (
              <div key={i} style={{ background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.18)', borderRadius:10, padding:'10px 22px', backdropFilter:'blur(8px)' }}>
                <div style={{ fontSize:22, fontWeight:900, color:G, lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.55)', marginTop:3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 20px' }}>

        {loading && (
          <div style={{ textAlign:'center', padding:'80px 20px' }}>
            <div style={{ width:48, height:48, border:`4px solid ${G}`, borderTop:'4px solid transparent', borderRadius:'50%', animation:'spin .8s linear infinite', margin:'0 auto 16px' }} />
            <p style={{ color:'#718096', fontWeight:600 }}>YouTube se videos fetch ho rahi hain...</p>
          </div>
        )}

        {error && (
          <div style={{ textAlign:'center', padding:'60px 20px', background:'#fff5f5', borderRadius:16, border:'1px solid #fed7d7' }}>
            <div style={{ fontSize:44, marginBottom:12 }}>⚠️</div>
            <h3 style={{ color:'#c53030', margin:'0 0 8px' }}>API Error</h3>
            <p style={{ color:'#718096' }}>{error}</p>
            <button onClick={fetchVideos} style={{ marginTop:16, padding:'10px 24px', background:N, color:'#fff', border:'none', borderRadius:10, fontWeight:700, cursor:'pointer', fontSize:14, fontFamily:'inherit' }}>
              🔄 Retry
            </button>
          </div>
        )}

        {!loading && !error && videos.length > 0 && (
          <>
            {/* Filter */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:32, alignItems:'center' }}>
              <span style={{ fontSize:11, fontWeight:700, color:'#a0aec0', textTransform:'uppercase', letterSpacing:.8 }}>FILTER:</span>
              {TYPES.map(t => (
                <button key={t} className="yt-filter-btn" onClick={() => setFilter(t)}
                  style={{ padding:'6px 16px', borderRadius:20, border:`2px solid ${filter===t?N:'#e2e8f0'}`, background:filter===t?N:'transparent', color:filter===t?'#fff':'#718096', fontWeight:700, fontSize:12.5, textTransform:'capitalize' }}>
                  {t === 'all' ? '🎬 All' : t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              ))}
              <span style={{ marginLeft:'auto', background:'#f0f4ff', color:N, borderRadius:20, padding:'5px 14px', fontSize:12.5, fontWeight:800 }}>
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
                  <div key={vid} className="gc r16" style={{ animationDelay:`${i*.06}s` }}>
                    <div className="yt-card" style={{ animationDelay:`${i*.06}s` }}>
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
                            <img src={sn.thumbnails?.maxres?.url||sn.thumbnails?.high?.url||sn.thumbnails?.medium?.url} alt={sn.title} />
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
                        <h3 style={{ margin:'0 0 8px', fontSize:15, fontWeight:800, color:N, lineHeight:1.4, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
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
              <div style={{ textAlign:'center', marginTop:48 }}>
                <a href={`https://youtube.com/channel/${ytConfig.channelId}`} target="_blank" rel="noreferrer"
                  style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#ff0000', color:'#fff', padding:'14px 32px', borderRadius:50, fontWeight:900, fontSize:15, textDecoration:'none', boxShadow:'0 6px 20px rgba(255,0,0,.35)', transition:'all .2s' }}>
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
