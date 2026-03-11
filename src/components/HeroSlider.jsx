// src/components/HeroSlider.jsx
// ✅ FALLBACK component ke bahar — stale closure fix

import React, { useState, useEffect, useMemo } from 'react';

// ✅ FIX: FALLBACK ko component ke bahar rakha — har render pe naya object nahi banega
const FALLBACK_SLIDES = [
  { id: 'f1', image: 'images/slider_baisakhi.jpg',      title: 'BAISAKHI DI SHAAM Celebration',           subtitle: 'Celebrating culture and traditions'                                    },
  { id: 'f2', image: 'images/slider_cricket.jpg',       title: 'Inter College BBMKU Cricket Winners',      subtitle: 'Celebrating sportsmanship and victory'                                 },
  { id: 'f3', image: 'images/slider_ncc.jpg',           title: 'NCC "At Home Function" Participants',      subtitle: 'Dedicated NCC Cadets & Commanders'                                    },
  { id: 'f4', image: 'images/slider_youth_winners.jpg', title: 'BBMKU Youth Festival Champions',           subtitle: 'Winners of BBMKU Inter College Youth Festival - अंतर्नाद'             },
  { id: 'f5', image: 'images/slider_seminar.jpg',       title: 'ICSSR Multidisciplinary National Seminar', subtitle: 'G20: A Global Platform for Economic Development'                       },
];

const HeroSlider = ({ slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ FALLBACK_SLIDES ab stable reference hai — useMemo mein dependency issue nahi
  const displaySlides = useMemo(() => {
    if (!slides || slides.length === 0) return FALLBACK_SLIDES;
    return [...slides].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
  }, [slides]);

  const slideLength = displaySlides.length;

  // Auto-scroll — sirf slideLength change hone par restart hoga
  useEffect(() => {
    if (slideLength <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === slideLength - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slideLength]);

  // Naya slide add/delete hone par pehle slide par wapas
  useEffect(() => {
    setCurrentSlide(0);
  }, [slideLength]);

  const nextSlide = () => setCurrentSlide(prev => (prev === slideLength - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? slideLength - 1 : prev - 1));

  const resolveImage = (src) => {
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://')) return src;
    const clean = src.startsWith('/') ? src.slice(1) : src;
    return `${import.meta.env.BASE_URL}${clean}`;
  };

  return (
    <div className="slider">
      {slideLength > 1 && (
        <>
          <div className="arrow prev" onClick={prevSlide}>&#10094;</div>
          <div className="arrow next" onClick={nextSlide}>&#10095;</div>
        </>
      )}

      <div className="slider-dots">
        {displaySlides.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentSlide === index ? 'current' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {displaySlides.map((slide, index) => (
        <div className={index === currentSlide ? 'slide current' : 'slide'} key={slide.id || index}>
          {index === currentSlide && (
            <>
              <img
                src={resolveImage(slide.image)}
                alt={slide.title}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="image"
                onError={e => { e.target.style.opacity = '0.2'; }}
              />
              <div className="content">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <hr />
              </div>
            </>
          )}
        </div>
      ))}

      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1.05) translate(0, 0);   filter: brightness(0.9); }
          100% { transform: scale(1.15) translate(-1%,-1%); filter: brightness(1);   }
        }
        @keyframes contentFadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes grow-width {
          from { width: 0;    }
          to   { width: 80px; }
        }

        .slider {
          width: 100%; height: 60vh; min-height: 450px; max-height: 550px;
          position: relative; overflow: hidden; background-color: #0f2347;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .slide {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          opacity: 0; transform: scale(1.15);
          transition: opacity 1.5s cubic-bezier(0.33,1,0.68,1);
          will-change: opacity, transform;
        }
        .slide::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(15,35,71,0.6), transparent 60%);
          z-index: 1;
        }
        .slide.current { opacity: 1; transform: scale(1); transition-delay: 0.2s; }
        .image { width: 100%; height: 100%; object-fit: cover; object-position: center 20%; will-change: transform; }
        .slide.current .image { animation: kenburns 12s ease-out forwards; }

        .content {
          position: absolute; bottom: 0; left: 0; width: 100%;
          text-align: center; color: #fff;
          padding: 80px 20px 30px; z-index: 2;
        }
        .content h2 {
          font-size: 2.2rem; margin-bottom: 8px; font-weight: 800;
          letter-spacing: 0.5px; text-shadow: 0 2px 15px rgba(0,0,0,0.5);
          opacity: 0;
        }
        .content p {
          font-size: 1.2rem; margin-bottom: 18px; font-weight: 500;
          color: #e2e8f0; text-shadow: 1px 1px 5px rgba(0,0,0,0.5);
          opacity: 0;
        }
        .content hr {
          border: 2px solid #f4a023; width: 80px; margin: 0 auto;
          border-radius: 4px; opacity: 0;
        }
        .slide.current .content h2 { animation: contentFadeInUp 0.8s 0.4s both cubic-bezier(0.2,0.6,0.2,1); }
        .slide.current .content p  { animation: contentFadeInUp 0.8s 0.6s both cubic-bezier(0.2,0.6,0.2,1); }
        .slide.current .content hr { animation: grow-width   0.8s 0.8s both cubic-bezier(0.2,0.6,0.2,1); opacity: 1; }

        .arrow {
          position: absolute; top: 50%; transform: translateY(-50%) scale(0.8);
          width: 45px; height: 45px;
          background-color: rgba(15,35,71,0.3); color: #fff;
          font-size: 1.5rem; display: flex; justify-content: center; align-items: center;
          cursor: pointer; border-radius: 50%; z-index: 11;
          transition: all 0.3s; backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.1); opacity: 0;
        }
        .slider:hover .arrow { opacity: 1; transform: translateY(-50%) scale(1); }
        .arrow:hover {
          background-color: #f4a023; color: #000;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 0 15px rgba(244,160,35,0.4);
        }
        .prev { left: 30px; }
        .next { right: 30px; }

        .slider-dots {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 10px; z-index: 11;
        }
        .dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: rgba(255,255,255,0.4); cursor: pointer;
          transition: all 0.4s ease;
        }
        .dot.current {
          background: #f4a023; transform: scale(1.3);
          box-shadow: 0 0 10px rgba(244,160,35,0.5);
        }

        @media (max-width: 768px) {
          .slider  { height: 40vh; min-height: 300px; }
          .content { padding: 60px 15px 20px; }
          .content h2 { font-size: 1.5rem; }
          .content p  { font-size: 0.95rem; margin-bottom: 12px; }
          .arrow   { width: 35px; height: 35px; font-size: 1.2rem; }
          .prev { left: 10px; }
          .next { right: 10px; }
        }
        @media (max-width: 480px) {
          .slider  { height: 35vh; min-height: 260px; }
          .content h2 { font-size: 1.25rem; }
          .content p  { font-size: 0.85rem; }
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;