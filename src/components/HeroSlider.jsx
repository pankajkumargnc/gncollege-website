// src/components/HeroSlider.jsx — 3D Immersive Parallax & Mobile Touch-Optimized Slider
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { resolveUrl } from '../utils/resolver';

const FALLBACK_SLIDES = [
  { id:'f1', image:'images/slider_baisakhi.webp',      title:'BAISAKHI DI SHAAM Celebration',           subtitle:'Celebrating culture and traditions'                        },
  { id:'f2', image:'images/slider_cricket.webp',       title:'Inter College BBMKU Cricket Winners',      subtitle:'Celebrating sportsmanship and victory'                     },
  { id:'f3', image:'images/slider_ncc.webp',           title:'NCC "At Home Function" Participants',      subtitle:'Dedicated NCC Cadets & Commanders'                         },
  { id:'f4', image:'images/slider_youth_winners.webp', title:'BBMKU Youth Festival Champions',           subtitle:'Winners of BBMKU Inter College Youth Festival — अंतर्नाद' },
  { id:'f5', image:'images/slider_seminar.webp',       title:'ICSSR Multidisciplinary National Seminar', subtitle:'G20: A Global Platform for Economic Development'            },
];

const resolveImage = (src) => {
  if (!src) return { webp: '', jpg: '' };
  const resolved = resolveUrl(src);
  if (!resolved) return { webp: '', jpg: '' };
  if (resolved.startsWith('http')) return { webp: resolved, jpg: resolved };
  return { webp: resolved.replace(/\.(jpg|jpeg|png)$/i, '.webp'), jpg: resolved };
};

const HeroSlider = ({ slides = [] }) => {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(new Set([0]));
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rootRef = useRef(null);
  const rafRef = useRef(null);

  // 👆 Touch Swipe tracking refs
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

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

  // 🖱️ 3D Parallax Effect on Mouse Move (Desktop only)
  const handleMouseMove = useCallback((e) => {
    if (!rootRef.current || window.innerWidth < 1024) return;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const { left, top, width, height } = rootRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 30;
      const y = ((e.clientY - top) / height - 0.5) * 20;
      setOffset({ x, y });
      rafRef.current = null;
    });
  }, []);

  const handleMouseLeave = () => {
    setPaused(false);
    setOffset({ x: 0, y: 0 });
  };

  // 👆 Touch Gesture Handlers for Mobile Swipe
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Minimum swipe threshold: 40px horizontal dominance
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        next();
      } else {
        prev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div 
      className="parallax-hs" 
      ref={rootRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        .parallax-hs {
          width: 100%; height: clamp(380px, 70vh, 580px);
          position: relative; overflow: hidden; background: #071124;
          perspective: 1000px;
          user-select: none;
          -webkit-user-select: none;
        }

        .phs-slide {
          position: absolute; inset: 0; opacity: 0; pointer-events: none;
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1); z-index: 1;
        }
        .phs-slide.cur { opacity: 1; pointer-events: auto; z-index: 2; }

        /* ── IMAGE LAYER ── */
        .phs-img-wrap {
          position: absolute; inset: -50px; /* Bleed for desktop parallax */
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .phs-img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: center 25%;
          filter: brightness(0.72) contrast(1.05);
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
        }
        .phs-sub {
          font-family: 'Inter', sans-serif;
          font-size: clamp(12px, 1vw, 16px); color: rgba(255,255,255,0.9);
          line-height: 1.5; margin: 0;
          animation: phsFadeUp 0.8s 0.5s both;
          white-space: nowrap;
          text-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }

        @keyframes phsFadeUp {
          from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
          to { opacity: 1; transform: none; filter: blur(0); }
        }

        /* ── UI CONTROLS (DESKTOP) ── */
        .phs-nav {
          position: absolute; bottom: 35px; right: 45px;
          display: flex; align-items: center; gap: 12px; z-index: 20;
        }

        /* Arrows stay per user request: "nhi arreow jo tha wo rehne do" */
        .phs-arrows {
          display: flex;
          gap: 8px;
        }
        .phs-btn {
          width: 38px !important;
          height: 38px !important;
          min-width: 38px !important;
          min-height: 38px !important;
          border-radius: 50%;
          background: rgba(15, 35, 71, 0.65);
          color: #ffffff;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-size: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          padding: 0;
        }
        .phs-btn:hover {
          background: #f4a023;
          color: #0f2347;
          border-color: #f4a023;
          transform: scale(1.08);
          box-shadow: 0 6px 20px rgba(244, 160, 35, 0.4);
        }

        /* Hide the big circle navigation dots on desktop */
        .phs-dots {
          display: none !important;
        }

        .phs-dots-mobile { display: none; }

        /* ══════════════════════════════════════════════════ */
        /* ██  MOBILE VIEWPORT OPTIMIZATION (< 768px)       ██ */
        /* ══════════════════════════════════════════════════ */
        @media(max-width: 768px) {
          .parallax-hs {
            /* Natural widescreen proportion preserving photo content */
            height: clamp(230px, 62vw, 310px);
          }
          /* Reset desktop parallax bleed and artificial zoom */
          .phs-img-wrap {
            inset: 0 !important;
            transform: none !important;
          }
          .phs-img {
            transform: none !important;
            object-position: center 22% !important;
            filter: brightness(0.78) contrast(1.04);
          }
          .cur .phs-img {
            transform: none !important;
          }
          /* Content layer: Sleek subtle bottom gradient */
          .phs-content {
            bottom: 0; left: 0; width: 100%; max-width: 100%;
            z-index: 10; transform: none !important;
          }
          .phs-glass {
            border-radius: 0;
            border: none;
            border-top: 2px solid rgba(244,160,35,0.7);
            background: linear-gradient(to top, rgba(7,17,36,0.94) 0%, rgba(7,17,36,0.75) 60%, transparent 100%);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: 32px 14px 10px 14px;
            box-sizing: border-box;
          }
          .phs-title {
            font-size: clamp(14px, 4.2vw, 17px);
            line-height: 1.25;
            margin: 0 0 3px 0;
            text-align: left;
            letter-spacing: -0.3px;
            padding-right: 76px; /* Prevents overlap with navigation arrows */
            white-space: normal;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .phs-sub {
            font-size: 11px;
            text-align: left;
            line-height: 1.35;
            opacity: 0.85;
            margin: 0;
            padding-right: 76px; /* Prevents overlap with navigation arrows */
            white-space: normal;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .phs-badge { display: none; }
          
          /* Clean navigation controls positioned at bottom right without overlap */
          .phs-nav {
            position: absolute;
            right: 12px;
            bottom: 8px;
            width: auto;
            display: flex;
            align-items: center;
            gap: 6px;
            z-index: 25;
            padding-right: 0;
          }
          .phs-arrows { display: flex; gap: 5px; }
          .phs-btn {
            width: 28px !important;
            height: 28px !important;
            min-width: 28px !important;
            min-height: 28px !important;
            font-size: 11px;
            background: rgba(15,35,71,0.75);
            border: 1px solid rgba(255,255,255,0.22);
            border-radius: 50%;
            padding: 0;
          }
          .phs-dots { display: none; }

          /* Sleek slide counter pill on mobile top right */
          .phs-dots-mobile {
            position: absolute;
            top: 12px;
            right: 12px;
            display: flex;
            align-items: center;
            gap: 4px;
            z-index: 20;
            background: rgba(7, 17, 36, 0.6);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            padding: 3px 7px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.15);
          }
          .phs-dot-m {
            width: 5px; height: 5px; border-radius: 50%;
            background: rgba(255,255,255,0.35);
            transition: all 0.3s ease;
          }
          .phs-dot-m.active {
            width: 13px; border-radius: 3px; background: #f4a023;
          }
        }
      `}</style>

      {/* ── TOP-RIGHT MOBILE SLIDE INDICATOR ── */}
      <div className="phs-dots-mobile" aria-hidden="true">
        {displaySlides.map((_, i) => (
          <span key={i} className={`phs-dot-m ${i === cur ? 'active' : ''}`} />
        ))}
      </div>

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
                    <img 
                      src={jpg} 
                      alt={s.title || 'Slide'} 
                      className="phs-img" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const fallback = `${import.meta.env.BASE_URL}images/slider_baisakhi.webp`;
                        if (e.target.src !== fallback) e.target.src = fallback;
                      }}
                    />
                  </picture>
                </div>
                <div className="phs-overlay" />
                
                <div 
                  className="phs-content"
                  style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
                >
                  <div className="phs-glass">
                    <span className="phs-badge">Featured Update</span>
                    <h2 className="phs-title">{s.title}</h2>
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
            <button 
              key={i}
              className={`phs-dot ${i === cur ? 'active' : ''}`}
              onClick={() => setCur(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="phs-arrows">
          <button className="phs-btn" aria-label="Previous Slide" onClick={prev}>←</button>
          <button className="phs-btn" aria-label="Next Slide" onClick={next}>→</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;