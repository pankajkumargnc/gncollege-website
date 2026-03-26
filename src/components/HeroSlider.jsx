// src/components/HeroSlider.jsx
// ✅ WebP support with JPG fallback
// ✅ Smart lazy loading — sirf current + next slide load hoga
// ✅ Touch swipe support
// ✅ Premium Cinematic Animations & Glassmorphism
// ✅ LCP optimized — first slide eager load

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

const FALLBACK_SLIDES = [
  { id:'f1', image:'images/slider_baisakhi.webp',      title:'BAISAKHI DI SHAAM Celebration',           subtitle:'Celebrating culture and traditions'                        },
  { id:'f2', image:'images/slider_cricket.webp',       title:'Inter College BBMKU Cricket Winners',      subtitle:'Celebrating sportsmanship and victory'                     },
  { id:'f3', image:'images/slider_ncc.webp',           title:'NCC "At Home Function" Participants',      subtitle:'Dedicated NCC Cadets & Commanders'                         },
  { id:'f4', image:'images/slider_youth_winners.webp', title:'BBMKU Youth Festival Champions',           subtitle:'Winners of BBMKU Inter College Youth Festival — अंतर्नाद' },
  { id:'f5', image:'images/slider_seminar.webp',       title:'ICSSR Multidisciplinary National Seminar', subtitle:'G20: A Global Platform for Economic Development'            },
];

// ── WebP path generator ───────────────────────────────────────────
// JPG → WebP automatically try karta hai, fallback pe JPG use karta hai
const resolveImage = (src) => {
  if (!src) return { webp: '', jpg: '' };
  const isExternal = src.startsWith('http://') || src.startsWith('https://');
  if (isExternal) return { webp: src, jpg: src };
  const clean  = src.startsWith('/') ? src.slice(1) : src;
  const base   = `${import.meta.env.BASE_URL}${clean}`;
  const webp   = base.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  return { webp, jpg: base };
};

// ── Preload hint for LCP image ────────────────────────────────────
const preloadLCP = (src) => {
  const { webp } = resolveImage(src);
  const existing = document.querySelectorAll('link[rel="preload"][as="image"]');
  const urls = Array.from(existing).map(l => l.href);
  if (urls.some(u => u.includes('slider_baisakhi'))) return;

  const linkWebp = document.createElement('link');
  linkWebp.rel = 'preload'; linkWebp.as = 'image';
  linkWebp.href = webp;
  linkWebp.type = 'image/webp';
  document.head.appendChild(linkWebp);
};

const HeroSlider = ({ slides = [] }) => {
  const [cur,    setCur]    = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(new Set([0])); // Track loaded slides
  const touchStart = useRef(null);
  const touchEnd   = useRef(null);

  const displaySlides = useMemo(() => {
    if (!slides || slides.length === 0) return FALLBACK_SLIDES;
    return [...slides].sort((a, b) => (Number(a.order)||0) - (Number(b.order)||0));
  }, [slides]);

  const len  = displaySlides.length;
  const next = useCallback(() => setCur(p => (p === len-1 ? 0 : p+1)), [len]);
  const prev = useCallback(() => setCur(p => (p === 0 ? len-1 : p-1)), [len]);

  // Reset on slide count change
  useEffect(() => { setCur(0); setLoaded(new Set([0])); }, [len]);

  // Preload LCP image on mount
  useEffect(() => {
    if (displaySlides[0]?.image) preloadLCP(displaySlides[0].image);
  }, []);

  // Auto advance
  useEffect(() => {
    if (len <= 1 || paused) return;
    const id = setInterval(next, 5500); 
    return () => clearInterval(id);
  }, [len, paused, next]);

  // Mark current + adjacent slides as "should load"
  useEffect(() => {
    setLoaded(prev => {
      const next_idx = cur === len - 1 ? 0 : cur + 1;
      const prev_idx = cur === 0 ? len - 1 : cur - 1;
      const updated  = new Set(prev);
      updated.add(cur);
      updated.add(next_idx);
      updated.add(prev_idx);
      return updated;
    });
  }, [cur, len]);

  // Touch handlers
  const onTouchStart = e => { touchStart.current = e.targetTouches[0].clientX; }
  const onTouchMove  = e => { touchEnd.current   = e.targetTouches[0].clientX; }
  const onTouchEnd   = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStart.current = null; touchEnd.current = null;
  };

  return (
    <div
      className="hs-root"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        /* ── PREMIUM ANIMATIONS ── */
        @keyframes cinematicZoom {
          0%   { transform: scale(1.12); filter: blur(4px) brightness(1.1); }
          15%  { filter: blur(0px) brightness(1); }
          100% { transform: scale(1); filter: blur(0px) brightness(1); }
        }
        @keyframes glideUpText {
          0%   { opacity: 0; transform: translateY(30px); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
        @keyframes expandLine {
          0%   { width: 0; opacity: 0; }
          100% { width: clamp(50px,8vw,100px); opacity: 1; }
        }

        .hs-root {
          width: 100%; position: relative; overflow: hidden;
          background: #071124;
          /* ✅ FIXED: Slider height kam kar di gayi hai */
          height: clamp(240px, 48vw, 540px);
          max-height: 540px;
          contain: layout style;
        }
        @media(max-width: 480px) { .hs-root { height: clamp(200px, 50vw, 300px); } }

        .hs-slide {
          position: absolute; inset: 0;
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity;
          pointer-events: none;
          z-index: 0;
        }
        
        /* ✅ FIXED: Kaali patti ko chhota aur soft kar diya gaya hai (Sirf neeche ke 35% hisse mein) */
        .hs-slide::after {
          content: ''; position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to top, rgba(10,20,40,0.85) 0%, transparent 35%);
          pointer-events: none;
        }

        .hs-slide.cur {
          opacity: 1; z-index: 1; pointer-events: auto;
        }

        /* ── Picture/Image ── */
        .hs-pic { width: 100%; height: 100%; display: block; }
        .hs-img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: center 30%;
          will-change: transform, filter;
          display: block;
        }
        .hs-slide.cur .hs-img { 
          animation: cinematicZoom 8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; 
        }

        /* ── Skeleton loader while image loading ── */
        .hs-skeleton {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, #071124 25%, #0f2347 50%, #071124 75%);
          background-size: 200% 100%;
          animation: hs-shimmer 1.5s infinite;
        }
        @keyframes hs-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Content ── */
        .hs-content {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
          /* ✅ FIXED: Content padding bhi thodi kam ki hai */
          padding: clamp(30px, 6vw, 70px) clamp(20px, 4vw, 60px) clamp(20px, 4vw, 30px);
          text-align: center; color: #fff;
        }
        .hs-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          /* ✅ FIXED: Text size kam kar diya hai */
          font-size: clamp(18px, 3.2vw, 36px);
          font-weight: 800; letter-spacing: -0.5px;
          text-shadow: 0 4px 24px rgba(0,0,0,0.7);
          margin-bottom: clamp(4px, 1vw, 8px);
          line-height: 1.15; opacity: 0;
        }
        .hs-subtitle {
          font-family: 'Inter', sans-serif;
          /* ✅ FIXED: Subtitle ka text size bhi kam kar diya hai */
          font-size: clamp(12px, 1.4vw, 16px);
          font-weight: 500; color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 2px 10px rgba(0,0,0,0.6);
          margin-bottom: clamp(12px, 2vw, 18px);
          opacity: 0; line-height: 1.4;
          max-width: 700px; margin-left: auto; margin-right: auto;
        }
        .hs-hr {
          border: none;
          height: 3px;
          background: linear-gradient(90deg, transparent, #f4a023, transparent);
          width: 0; margin: 0 auto;
          border-radius: 4px; opacity: 0;
        }
        
        .hs-slide.cur .hs-title    { animation: glideUpText 0.9s 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .hs-slide.cur .hs-subtitle { animation: glideUpText 0.9s 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .hs-slide.cur .hs-hr       { animation: expandLine  0.8s 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        /* ── Arrows ── */
        .hs-arrow {
          position: absolute; top: 50%; transform: translateY(-50%) scale(0.9);
          width: clamp(36px, 4vw, 48px); height: clamp(36px, 4vw, 48px);
          background: rgba(255, 255, 255, 0.1); color: #fff;
          font-size: clamp(14px, 1.8vw, 18px);
          display: flex; justify-content: center; align-items: center;
          cursor: pointer; border-radius: 50%; z-index: 11;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2); 
          opacity: 0;
        }
        .hs-root:hover .hs-arrow { opacity: 1; transform: translateY(-50%) scale(1); }
        .hs-arrow:hover { 
          background: #f4a023; color: #0f2347; 
          transform: translateY(-50%) scale(1.1); 
          border-color: #f4a023;
          box-shadow: 0 4px 15px rgba(244,160,35,0.4);
        }
        .hs-prev { left: clamp(10px, 3vw, 24px); }
        .hs-next { right: clamp(10px, 3vw, 24px); }
        @media(hover:none) { .hs-arrow { display: none; } }

        /* ── Dots ── */
        .hs-dots {
          position: absolute; bottom: clamp(12px, 2.5vw, 18px);
          left: 50%; transform: translateX(-50%);
          display: flex; gap: clamp(6px, 1vw, 10px); z-index: 11;
        }
        .hs-dot {
          width: clamp(14px, 2vw, 20px); height: clamp(4px, 0.5vw, 5px);
          border-radius: 4px; background: rgba(255, 255, 255, 0.35);
          cursor: pointer; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
          border: none; padding: 0;
        }
        .hs-dot:hover { background: rgba(255, 255, 255, 0.8); }
        .hs-dot.cur { 
          width: clamp(28px, 4vw, 40px); 
          background: #f4a023; 
          box-shadow: 0 0 10px rgba(244,160,35,0.6); 
        }
      `}</style>

      {/* ── Slides ── */}
      {displaySlides.map((slide, i) => {
        const shouldRender = loaded.has(i);
        const { webp, jpg } = resolveImage(slide.image);

        return (
          <div className={`hs-slide${i === cur ? ' cur' : ''}`} key={slide.id || i}>
            {shouldRender ? (
              <>
                {/* <picture> — WebP first, JPG fallback */}
                <picture className="hs-pic" style={{ width:'100%', height:'100%', display:'block' }}>
                  <source srcSet={webp} type="image/webp" />
                  <img
                    src={jpg}
                    alt={slide.title || `Slide ${i+1}`}
                    className="hs-img"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchpriority={i === 0 ? 'high' : 'low'}
                    decoding={i === 0 ? 'sync' : 'async'}
                    width="1920"
                    height="580"
                    sizes="100vw"
                    onError={e => { e.target.style.opacity = '.15'; }}
                  />
                </picture>

                {/* Slide content */}
                <div className="hs-content">
                  <h2 className="hs-title">{slide.title}</h2>
                  <p  className="hs-subtitle">{slide.subtitle}</p>
                  <hr className="hs-hr" />
                </div>
              </>
            ) : (
              /* Skeleton while not yet loaded */
              <div className="hs-skeleton" />
            )}
          </div>
        );
      })}

      {/* ── Arrows ── */}
      {len > 1 && (
        <>
          <button className="hs-arrow hs-prev" onClick={prev} aria-label="Previous slide">&#10094;</button>
          <button className="hs-arrow hs-next" onClick={next} aria-label="Next slide">&#10095;</button>
        </>
      )}

      {/* ── Dots ── */}
      <div className="hs-dots" role="tablist" aria-label="Slide navigation">
        {displaySlides.map((_, i) => (
          <button
            key={i}
            className={`hs-dot${i === cur ? ' cur' : ''}`}
            onClick={() => setCur(i)}
            aria-label={`Slide ${i+1}`}
            role="tab"
            aria-selected={i === cur}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;