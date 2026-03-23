// src/components/HeroSlider.jsx
// ✅ WebP support with JPG fallback
// ✅ Smart lazy loading — sirf current + next slide load hoga
// ✅ Touch swipe support
// ✅ Fluid responsive height
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
  const { webp, jpg } = resolveImage(src);
  // WebP preload
  const linkWebp = document.createElement('link');
  linkWebp.rel = 'preload'; linkWebp.as = 'image';
  linkWebp.href = webp;
  linkWebp.type = 'image/webp';
  // JPG fallback preload
  const linkJpg = document.createElement('link');
  linkJpg.rel = 'preload'; linkJpg.as = 'image';
  linkJpg.href = jpg;
  document.head.appendChild(linkWebp);
  document.head.appendChild(linkJpg);
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
    const id = setInterval(next, 5000);
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
        @keyframes hs-kenburns {
          0%   { transform: scale(1.05); filter: brightness(.88); }
          100% { transform: scale(1.15) translate(-1%,-1%); filter: brightness(1); }
        }
        @keyframes hs-fadeup {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes hs-hr {
          from { width:0; }
          to   { width: clamp(50px,8vw,80px); }
        }

        .hs-root {
          width:100%; position:relative; overflow:hidden;
          background:#0f2347;
          height: clamp(260px,52vw,580px);
          max-height: 600px;
          contain: layout style;
        }
        @media(max-width:480px) { .hs-root { height: clamp(220px,55vw,340px); } }

        .hs-slide {
          position:absolute; inset:0;
          opacity:0;
          transition: opacity 1.4s cubic-bezier(.33,1,.68,1);
          will-change: opacity;
          pointer-events:none;
        }
        .hs-slide::after {
          content:''; position:absolute; inset:0; z-index:1;
          background: linear-gradient(to top, rgba(15,35,71,.75) 0%, rgba(15,35,71,.25) 50%, transparent 100%);
        }
        .hs-slide.cur {
          opacity:1; transition-delay:.1s; pointer-events:auto;
        }

        /* ── Picture/Image ── */
        .hs-pic { width:100%; height:100%; display:block; }
        .hs-img {
          width:100%; height:100%; object-fit:cover;
          object-position: center 20%;
          will-change: transform;
          display:block;
        }
        .hs-slide.cur .hs-img { animation: hs-kenburns 12s ease-out forwards; }

        /* ── Skeleton loader while image loading ── */
        .hs-skeleton {
          position:absolute; inset:0;
          background: linear-gradient(90deg, #0f2347 25%, #1a3a6c 50%, #0f2347 75%);
          background-size: 200% 100%;
          animation: hs-shimmer 1.5s infinite;
        }
        @keyframes hs-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Content ── */
        .hs-content {
          position:absolute; bottom:0; left:0; right:0; z-index:2;
          padding: clamp(40px,8vw,90px) clamp(16px,4vw,48px) clamp(20px,3.5vw,36px);
          text-align:center; color:#fff;
        }
        .hs-title {
          font-size: clamp(16px,3.5vw,34px);
          font-weight:800; letter-spacing:.4px;
          text-shadow: 0 2px 14px rgba(0,0,0,.5);
          margin-bottom: clamp(6px,.8vw,10px);
          line-height:1.25; opacity:0;
        }
        .hs-subtitle {
          font-size: clamp(12px,1.8vw,19px);
          font-weight:500; color:#e2e8f0;
          text-shadow: 1px 1px 5px rgba(0,0,0,.45);
          margin-bottom: clamp(12px,2vw,20px);
          opacity:0; line-height:1.4;
        }
        .hs-hr {
          border: 2px solid #f4a023;
          width: clamp(50px,8vw,80px); margin:0 auto;
          border-radius:4px; opacity:0;
        }
        .hs-slide.cur .hs-title    { animation: hs-fadeup .8s .4s both cubic-bezier(.2,.6,.2,1); }
        .hs-slide.cur .hs-subtitle { animation: hs-fadeup .8s .6s both cubic-bezier(.2,.6,.2,1); }
        .hs-slide.cur .hs-hr       { animation: hs-hr    .8s .8s both cubic-bezier(.2,.6,.2,1); opacity:1; }

        /* ── Arrows ── */
        .hs-arrow {
          position:absolute; top:50%; transform:translateY(-50%) scale(.85);
          width: clamp(36px,4.5vw,48px); height: clamp(36px,4.5vw,48px);
          background:rgba(15,35,71,.32); color:#fff;
          font-size: clamp(14px,2vw,20px);
          display:flex; justify-content:center; align-items:center;
          cursor:pointer; border-radius:50%; z-index:11;
          transition:all .3s; backdrop-filter:blur(4px);
          border:1px solid rgba(255,255,255,.12); opacity:0;
        }
        .hs-root:hover .hs-arrow { opacity:1; transform:translateY(-50%) scale(1); }
        .hs-arrow:hover { background:#f4a023; color:#000; transform:translateY(-50%) scale(1.1); }
        .hs-prev { left: clamp(10px,2vw,28px); }
        .hs-next { right: clamp(10px,2vw,28px); }
        @media(hover:none) { .hs-arrow { opacity:.7 !important; } }

        /* ── Dots ── */
        .hs-dots {
          position:absolute; bottom: clamp(12px,2vw,20px);
          left:50%; transform:translateX(-50%);
          display:flex; gap: clamp(7px,1vw,12px); z-index:11;
        }
        .hs-dot {
          width: clamp(7px,1vw,10px); height: clamp(7px,1vw,10px);
          border-radius:50%; background:rgba(255,255,255,.4);
          cursor:pointer; transition:all .4s; border:none; padding:0;
        }
        .hs-dot.cur { background:#f4a023; transform:scale(1.3); box-shadow:0 0 10px rgba(244,160,35,.5); }
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