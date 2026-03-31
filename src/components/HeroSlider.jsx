// src/components/HeroSlider.jsx — 3D Immersive Parallax Slider
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

const FALLBACK_SLIDES = [
  { id:'f1', image:'images/slider_baisakhi.webp',      title:'BAISAKHI DI SHAAM Celebration',           subtitle:'Celebrating culture and traditions'                        },
  { id:'f2', image:'images/slider_cricket.webp',       title:'Inter College BBMKU Cricket Winners',      subtitle:'Celebrating sportsmanship and victory'                     },
  { id:'f3', image:'images/slider_ncc.webp',           title:'NCC "At Home Function" Participants',      subtitle:'Dedicated NCC Cadets & Commanders'                         },
  { id:'f4', image:'images/slider_youth_winners.webp', title:'BBMKU Youth Festival Champions',           subtitle:'Winners of BBMKU Inter College Youth Festival — अंतर्नाद' },
  { id:'f5', image:'images/slider_seminar.webp',       title:'ICSSR Multidisciplinary National Seminar', subtitle:'G20: A Global Platform for Economic Development'            },
];

const resolveImage = (src) => {
  if (!src) return { webp: '', jpg: '' };
  const isExternal = src.startsWith('http');
  if (isExternal) return { webp: src, jpg: src };
  const clean  = src.startsWith('/') ? src.slice(1) : src;
  const base   = `${import.meta.env.BASE_URL}${clean}`;
  return { webp: base.replace(/\.(jpg|jpeg|png)$/i, '.webp'), jpg: base };
};

const HeroSlider = ({ slides = [] }) => {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(new Set([0]));
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rootRef = useRef(null);

  const displaySlides = useMemo(() => {
    const list = (!slides || slides.length === 0) ? FALLBACK_SLIDES : slides;
    return [...list].sort((a, b) => (Number(a.order)||0) - (Number(b.order)||0));
  }, [slides]);

  const len = displaySlides.length;
  const next = useCallback(() => setCur(p => (p === len-1 ? 0 : p+1)), [len]);
  const prev = useCallback(() => setCur(p => (p === 0 ? len-1 : p-1)), [len]);

  useEffect(() => {
    if (len <= 1 || paused) return;
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
  }, [len, paused, next]);

  useEffect(() => {
    setLoaded(prev => new Set([...prev, cur, (cur+1)%len, (cur-1+len)%len]));
  }, [cur, len]);

  // 🖱️ 3D Parallax Effect on Mouse Move
  const handleMouseMove = (e) => {
    if (!rootRef.current || window.innerWidth < 1024) return;
    const { left, top, width, height } = rootRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 30; // Max 30px move
    const y = ((e.clientY - top) / height - 0.5) * 20;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setPaused(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div 
      className="parallax-hs" 
      ref={rootRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500;600&display=swap');
        
        .parallax-hs {
          width: 100%; height: clamp(380px, 70vh, 580px);
          position: relative; overflow: hidden; background: #071124;
          perspective: 1000px;
        }

        .phs-slide {
          position: absolute; inset: 0; opacity: 0; pointer-events: none;
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1); z-index: 1;
        }
        .phs-slide.cur { opacity: 1; pointer-events: auto; z-index: 2; }

        /* ── IMAGE LAYER ── */
        .phs-img-wrap {
          position: absolute; inset: -50px; /* Bleed for parallax */
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .phs-img {
          width: 100%; height: 100%; object-fit: cover;
          filter: brightness(0.7) contrast(1.05);
          transform: scale(1.1); transition: transform 10s linear;
        }
        .cur .phs-img { transform: scale(1); }

        /* ── OVERLAYS ── */
        .phs-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(15,35,71,0.7) 0%, rgba(15,35,71,0.1) 60%, transparent 100%),
                      linear-gradient(to top, rgba(15,35,71,0.5) 0%, transparent 50%);
          z-index: 2;
        }

        /* ── CONTENT LAYER (GLASSMORPHISM) ── */
        .phs-content {
          position: absolute; bottom: 10%; left: clamp(15px, 6vw, 100px);
          width: fit-content; max-width: 90%; z-index: 10;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .phs-glass {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-left: 6px solid #f4a023;
          padding: clamp(15px, 2.5vw, 35px);
          display: inline-block; width: 100%;
          animation: phsPopIn 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }

        .phs-badge {
          display: inline-block; background: #f4a023; color: #0f2347;
          padding: 5px 14px; border-radius: 6px; font-size: clamp(9px, 0.7vw, 11px); font-weight: 800;
          text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px;
          animation: phsFadeUp 0.8s 0.3s both;
        }
        .phs-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(20px, 3.5vw, 42px); font-weight: 900; color: #fff;
          line-height: 1.1; margin: 0 0 12px; letter-spacing: -1.2px;
          animation: phsFadeUp 0.8s 0.4s both;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
          white-space: nowrap;
        }
        .phs-sub {
          font-family: 'Inter', sans-serif;
          font-size: clamp(12px, 1vw, 16px); color: rgba(255,255,255,0.9);
          line-height: 1.5; margin: 0;
          animation: phsFadeUp 0.8s 0.5s both;
          white-space: nowrap;
          text-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }

        @media(max-width: 900px) {
          .phs-title, .phs-sub { white-space: normal; }
          .phs-content { width: 90%; }
        }

        @keyframes phsFadeUp {
          from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
          to { opacity: 1; transform: none; filter: blur(0); }
        }

        /* ── UI ELEMENTS ── */
        .phs-nav {
          position: absolute; bottom: 40px; right: 40px;
          display: flex; align-items: center; gap: 20px; z-index: 20;
        }
        .phs-dots { display: flex; gap: 8px; }
        .phs-dot {
          width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.3);
          cursor: pointer; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); border: none; padding: 0;
        }
        .phs-dot.active { width: 18px; border-radius: 4px; background: #f4a023; box-shadow: 0 0 10px rgba(244,160,35,0.4); }

        .phs-arrows { display: flex; gap: 8px; }
        .phs-btn {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.04); color: #fff;
          border: 1px solid rgba(255,255,255,0.08); cursor: pointer;
          transition: all 0.3s; display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(8px); font-size: 14px;
        }
        .phs-btn:hover { background: #f4a023; color: #0f2347; transform: scale(1.1); border-color: #f4a023; }

        @media(max-width: 768px) {
          .parallax-hs { height: 320px; }
          .phs-content { bottom: 0; left: 0; width: 100%; max-width: 100%; border-radius: 0; z-index: 100; }
          .phs-glass { border-radius: 0; padding: 18px 15px; border-left: none; border-top: 3px solid #f4a023; background: rgba(15,35,71,0.88); backdrop-filter: blur(15px); }
          .phs-title { font-size: 18px; width: 100%; white-space: normal; line-height: 1.2; text-align: center; margin-bottom: 6px; letter-spacing: -0.5px; }
          .phs-sub { font-size: 12px; text-align: center; line-height: 1.35; opacity: 0.8; margin-top: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
          .phs-badge { display: none; }
          .phs-nav { width: 100%; right: 0; bottom: 8px; display: flex; justify-content: flex-end; padding-right: 15px; }
          .phs-arrows { display: flex; gap: 6px; }
          .phs-btn { width: 32px; height: 32px; font-size: 11px; }
        }
      `}</style>

      {displaySlides.map((s, i) => {
        const { webp, jpg } = resolveImage(s.image);
        const isCur = i === cur;
        return (
          <div key={s.id || i} className={`phs-slide ${isCur ? 'cur' : ''}`}>
            {loaded.has(i) && (
              <>
                <div 
                  className="phs-img-wrap" 
                  style={{ transform: `translate3d(${offset.x * 0.5}px, ${offset.y * 0.5}px, 0)` }}
                >
                  <picture>
                    <source srcSet={webp} type="image/webp" />
                    <img src={jpg} alt="" className="phs-img" />
                  </picture>
                </div>
                <div className="phs-overlay" />
                
                <div 
                  className="phs-content"
                  style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
                >
                  <div className="phs-glass">
                    <span className="phs-badge">Featured Update</span>
                    <h1 className="phs-title">{s.title}</h1>
                    <p className="phs-sub">{s.subtitle}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}

      <div className="phs-nav">
        <div className="phs-arrows">
          <button className="phs-btn" aria-label="Previous Slide" onClick={prev}>←</button>
          <button className="phs-btn" aria-label="Next Slide" onClick={next}>→</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;