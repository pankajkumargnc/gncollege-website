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
          width: 100%; height: clamp(400px, 70vh, 700px);
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
          filter: brightness(0.65) contrast(1.1);
          transform: scale(1.1); transition: transform 10s linear;
        }
        .cur .phs-img { transform: scale(1); }

        /* ── OVERLAYS ── */
        .phs-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(15,35,71,0.8) 0%, rgba(15,35,71,0.2) 50%, transparent 100%),
                      linear-gradient(to top, rgba(15,35,71,0.6) 0%, transparent 40%);
          z-index: 2;
        }

        /* ── CONTENT LAYER (GLASSMORPHISM) ── */
        .phs-content {
          position: absolute; bottom: 6%; left: clamp(15px, 6vw, 100px);
          max-width: min(780px, 85%); z-index: 10;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .phs-glass {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(2.7px);
          -webkit-backdrop-filter: blur(2.7px);
          border: 1px solid rgba(255, 255, 255, 0.33);
          border-left: 6px solid #f4a023; /* Consistent with GNC Branding */
          padding: clamp(15px, 2.5vw, 30px);
          transform-origin: left; animation: phsPopIn 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }

        .phs-badge {
          display: inline-block; background: #f4a023; color: #0f2347;
          padding: 5px 14px; border-radius: 6px; font-size: 11px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 15px;
          animation: phsFadeUp 0.8s 0.3s both;
        }
        .phs-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(28px, 5vw, 56px); font-weight: 800; color: #fff;
          line-height: 1.1; margin: 0 0 15px; letter-spacing: -1.5px;
          animation: phsFadeUp 0.8s 0.4s both;
          text-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }
        .phs-sub {
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 1.5vw, 18px); color: rgba(255,255,255,0.9);
          max-width: 600px; line-height: 1.6; margin: 0;
          animation: phsFadeUp 0.8s 0.5s both;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
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
        .phs-dots { display: flex; gap: 10px; }
        .phs-dot {
          width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.2);
          cursor: pointer; transition: all 0.4s; border: none; padding: 0;
        }
        .phs-dot.active { width: 40px; border-radius: 10px; background: #f4a023; box-shadow: 0 0 15px rgba(244,160,35,0.5); }

        .phs-arrows { display: flex; gap: 10px; }
        .phs-btn {
          width: 50px; height: 50px; border-radius: 50%;
          background: rgba(255,255,255,0.05); color: #fff;
          border: 1px solid rgba(255,255,255,0.1); cursor: pointer;
          transition: all 0.3s; display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(10px);
        }
        .phs-btn:hover { background: #f4a023; color: #0f2347; transform: scale(1.1); border-color: #f4a023; }

        @media(max-width: 768px) {
          .parallax-hs { height: 500px; }
          .phs-content { bottom: 60px; left: 0; width: 100%; max-width: 100%; }
          .phs-glass { border-radius: 0; padding: 25px 20px; border-right: none; }
          .phs-nav { right: 20px; bottom: 20px; }
          .phs-arrows { display: none; }
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
        <div className="phs-dots">
          {displaySlides.map((_, i) => (
            <button key={i} className={`phs-dot ${i===cur ? 'active':''}`} onClick={() => setCur(i)} />
          ))}
        </div>
        <div className="phs-arrows">
          <button className="phs-btn" onClick={prev}>←</button>
          <button className="phs-btn" onClick={next}>→</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;