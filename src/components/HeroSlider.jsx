// src/components/HeroSlider.jsx
// ✅ Fully fluid responsive — clamp() heights & fonts
// ✅ Touch swipe support for mobile
// ✅ No layout shift, hardware accelerated

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

const FALLBACK_SLIDES = [
  { id:'f1', image:'images/slider_baisakhi.jpg',      title:'BAISAKHI DI SHAAM Celebration',           subtitle:'Celebrating culture and traditions'                        },
  { id:'f2', image:'images/slider_cricket.jpg',       title:'Inter College BBMKU Cricket Winners',      subtitle:'Celebrating sportsmanship and victory'                     },
  { id:'f3', image:'images/slider_ncc.jpg',           title:'NCC "At Home Function" Participants',      subtitle:'Dedicated NCC Cadets & Commanders'                         },
  { id:'f4', image:'images/slider_youth_winners.jpg', title:'BBMKU Youth Festival Champions',           subtitle:'Winners of BBMKU Inter College Youth Festival — अंतर्नाद' },
  { id:'f5', image:'images/slider_seminar.jpg',       title:'ICSSR Multidisciplinary National Seminar', subtitle:'G20: A Global Platform for Economic Development'            },
];

const HeroSlider = ({ slides = [] }) => {
  const [cur, setCur]     = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(null);
  const touchEnd   = useRef(null);

  const displaySlides = useMemo(() => {
    if (!slides || slides.length === 0) return FALLBACK_SLIDES;
    return [...slides].sort((a, b) => (Number(a.order)||0) - (Number(b.order)||0));
  }, [slides]);

  const len = displaySlides.length;
  const next = useCallback(() => setCur(p => (p === len-1 ? 0 : p+1)), [len]);
  const prev = useCallback(() => setCur(p => (p === 0 ? len-1 : p-1)), [len]);

  useEffect(() => { setCur(0); }, [len]);

  useEffect(() => {
    if (len <= 1 || paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [len, paused, next]);

  // Touch swipe
  const onTouchStart = e => { touchStart.current = e.targetTouches[0].clientX; }
  const onTouchMove  = e => { touchEnd.current = e.targetTouches[0].clientX; }
  const onTouchEnd   = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
    touchStart.current = null; touchEnd.current = null;
  };

  const resolveImage = src => {
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://')) return src;
    const clean = src.startsWith('/') ? src.slice(1) : src;
    return `${import.meta.env.BASE_URL}${clean}`;
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
        /* ── Keyframes ── */
        @keyframes hs-kenburns {
          0%   { transform: scale(1.05) translate(0,0);    filter: brightness(.88); }
          100% { transform: scale(1.15) translate(-1%,-1%); filter: brightness(1);   }
        }
        @keyframes hs-fadeup {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes hs-hr {
          from { width:0; }
          to   { width: clamp(50px, 8vw, 80px); }
        }
        @keyframes hs-dot-pulse {
          0%,100% { transform: scale(1); }
          50%     { transform: scale(1.35); }
        }

        /* ── Container ── */
        .hs-root {
          width: 100%; position: relative; overflow: hidden;
          background: #0f2347;
          /* Fluid height: 35vh on mobile → 60vh on desktop, capped */
          height: clamp(260px, 52vw, 580px);
          max-height: 600px;
        }
        @media(max-width:480px) { .hs-root { height: clamp(220px, 55vw, 340px); } }

        /* ── Slide ── */
        .hs-slide {
          position: absolute; inset: 0;
          opacity: 0; transform: scale(1.12);
          transition: opacity 1.4s cubic-bezier(.33,1,.68,1);
          will-change: opacity, transform;
          pointer-events: none;
        }
        .hs-slide::after {
          content:''; position:absolute; inset:0; z-index:1;
          background: linear-gradient(
            to top,
            rgba(15,35,71,.75) 0%,
            rgba(15,35,71,.25) 50%,
            transparent 100%
          );
        }
        .hs-slide.cur {
          opacity: 1; transform: scale(1);
          transition-delay: .1s; pointer-events: auto;
        }

        /* ── Image ── */
        .hs-img {
          width:100%; height:100%; object-fit:cover;
          object-position: center 20%;
          will-change: transform;
        }
        .hs-slide.cur .hs-img { animation: hs-kenburns 12s ease-out forwards; }

        /* ── Content ── */
        .hs-content {
          position:absolute; bottom:0; left:0; right:0; z-index:2;
          padding: clamp(40px,8vw,90px) clamp(16px,4vw,48px) clamp(20px,3.5vw,36px);
          text-align:center; color:#fff;
        }
        .hs-title {
          font-size: clamp(16px, 3.5vw, 34px);
          font-weight:800; letter-spacing:.4px;
          text-shadow: 0 2px 14px rgba(0,0,0,.5);
          margin-bottom: clamp(6px,.8vw,10px);
          line-height: 1.25;
          opacity:0;
        }
        .hs-subtitle {
          font-size: clamp(12px, 1.8vw, 19px);
          font-weight:500; color:#e2e8f0;
          text-shadow: 1px 1px 5px rgba(0,0,0,.45);
          margin-bottom: clamp(12px,2vw,20px);
          opacity:0; line-height:1.4;
        }
        .hs-hr {
          border: clamp(1.5px,2px,2.5px) solid #f4a023;
          width: clamp(50px,8vw,80px); margin: 0 auto;
          border-radius:4px; opacity:0;
        }
        .hs-slide.cur .hs-title    { animation: hs-fadeup .8s .4s both cubic-bezier(.2,.6,.2,1); }
        .hs-slide.cur .hs-subtitle { animation: hs-fadeup .8s .6s both cubic-bezier(.2,.6,.2,1); }
        .hs-slide.cur .hs-hr       { animation: hs-hr    .8s .8s both cubic-bezier(.2,.6,.2,1); opacity:1; }

        /* ── Arrows ── */
        .hs-arrow {
          position:absolute; top:50%; transform:translateY(-50%) scale(.85);
          width: clamp(36px,4.5vw,48px); height: clamp(36px,4.5vw,48px);
          background: rgba(15,35,71,.32); color:#fff;
          font-size: clamp(14px,2vw,20px);
          display:flex; justify-content:center; align-items:center;
          cursor:pointer; border-radius:50%; z-index:11;
          transition: all .3s; backdrop-filter:blur(4px);
          border: 1px solid rgba(255,255,255,.12);
          opacity:0;
        }
        .hs-root:hover .hs-arrow { opacity:1; transform:translateY(-50%) scale(1); }
        .hs-arrow:hover {
          background: #f4a023; color:#000;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 0 16px rgba(244,160,35,.4);
        }
        .hs-prev { left: clamp(10px,2vw,28px); }
        .hs-next { right: clamp(10px,2vw,28px); }

        /* Always show arrows on touch devices */
        @media(hover:none) {
          .hs-arrow { opacity:.7 !important; }
        }

        /* ── Dots ── */
        .hs-dots {
          position:absolute; bottom: clamp(12px,2vw,20px);
          left:50%; transform:translateX(-50%);
          display:flex; gap: clamp(7px,1vw,12px); z-index:11;
        }
        .hs-dot {
          width: clamp(7px,1vw,10px); height: clamp(7px,1vw,10px);
          border-radius:50%; background:rgba(255,255,255,.4);
          cursor:pointer; transition: all .4s ease; border:none; padding:0;
        }
        .hs-dot.cur {
          background: #f4a023; transform:scale(1.3);
          box-shadow: 0 0 10px rgba(244,160,35,.5);
          animation: hs-dot-pulse 2s ease-in-out infinite;
        }

        /* Pause indicator */
        .hs-pause-badge {
          position:absolute; top:clamp(10px,1.5vw,16px); right:clamp(12px,2vw,20px);
          z-index:12; background:rgba(0,0,0,.35); color:#fff; border-radius:6px;
          padding:4px 8px; font-size:10px; font-weight:700; letter-spacing:.5px;
          opacity:0; transition:opacity .3s;
        }
        .hs-root:hover .hs-pause-badge { opacity:1; }
      `}</style>

      {/* Slides */}
      {displaySlides.map((slide, i) => (
        <div className={`hs-slide${i === cur ? ' cur' : ''}`} key={slide.id || i}>
          {Math.abs(i - cur) <= 1 && (
            <>
              <img
                src={resolveImage(slide.image)}
                alt={slide.title}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="hs-img"
                onError={e => { e.target.style.opacity = '.15'; }}
              />
              <div className="hs-content">
                <h2 className="hs-title">{slide.title}</h2>
                <p  className="hs-subtitle">{slide.subtitle}</p>
                <hr className="hs-hr" />
              </div>
            </>
          )}
        </div>
      ))}

      {/* Arrows */}
      {len > 1 && (
        <>
          <button className="hs-arrow hs-prev" onClick={prev} aria-label="Previous slide">&#10094;</button>
          <button className="hs-arrow hs-next" onClick={next} aria-label="Next slide">&#10095;</button>
        </>
      )}

      {/* Dots */}
      <div className="hs-dots">
        {displaySlides.map((_, i) => (
          <button
            key={i}
            className={`hs-dot${i === cur ? ' cur' : ''}`}
            onClick={() => setCur(i)}
            aria-label={`Go to slide ${i+1}`}
          />
        ))}
      </div>

      {/* Pause hint */}
      <div className="hs-pause-badge">⏸ PAUSED</div>
    </div>
  );
};

export default HeroSlider;