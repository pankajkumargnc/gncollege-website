// src/components/home/TestimonialsSection.jsx
import React, { useRef, useState, useEffect, memo } from 'react';
import { COLORS } from '../../styles/colors';

const N = COLORS.navy;
const G = COLORS.gold;

const TESTIMONIALS = [
  {
    name: "Dr. Sanjay Kumar",
    role: "Eminent Alumni, Batch 1985",
    content: "My years at Guru Nanak College were instrumental in shaping not just my career, but my entire perspective on lifelong learning and community service. The faculty's dedication to academic excellence is unmatched.",
    avatar: "👨‍⚕️"
  },
  {
    name: "Ritu Sharma",
    role: "University Gold Medalist, 2022",
    content: "The support I received from the professors at GNC was phenomenal. The modern labs, competitive environment, and the constant push for excellence led me to secure the university's highest academic honors.",
    avatar: "👩‍🎓"
  },
  {
    name: "Vikash Singh",
    role: "Corporate Executive, TCS",
    content: "Guru Nanak College provided me a platform where academic rigor meets extracurricular brilliance. The placement cell played a massive role in opening doors to premium IT sectors for me.",
    avatar: "👨‍💼"
  }
];

export default function TestimonialsSection({ testimonials = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeTestis = (testimonials || []).filter(t => t.active !== false);
  const displayList = activeTestis.length > 0 ? activeTestis : TESTIMONIALS;

  useEffect(() => {
    if (displayList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % displayList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [displayList.length]);

  return (
    <section className="ts-root">
      <style>{`
        .ts-root {
          padding: clamp(60px, 10vw, 120px) 20px;
          background: #f8fafc;
          position: relative;
          overflow: hidden;
        }
        
        /* Premium Background Decorations */
        .ts-root::before {
            content: ''; position: absolute; top: -10%; left: -5%; width: 500px; height: 500px;
            background: radial-gradient(circle, ${G}05 0%, transparent 70%);
            pointer-events: none;
        }

        .ts-inner {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .ts-slider {
          margin-top: 50px;
          position: relative;
          height: 450px;
          perspective: 1000px;
        }

        .ts-card {
          position: absolute;
          inset: 0;
          background: #fff;
          border-radius: 32px;
          padding: clamp(30px, 6vw, 60px);
          box-shadow: 0 30px 60px rgba(15, 35, 71, 0.08);
          border: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(20px) rotateX(-10deg) scale(0.9);
          pointer-events: none;
        }

        .ts-card.active {
          opacity: 1;
          transform: translateY(0) rotateX(0) scale(1);
          pointer-events: auto;
          z-index: 10;
        }

        .ts-quote-icon {
          font-size: 80px;
          line-height: 1;
          background: linear-gradient(135deg, ${G}40, transparent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: serif;
          margin-bottom: -15px;
        }

        .ts-content {
          font-family: 'Inter', sans-serif;
          font-size: clamp(17px, 2.2vw, 22px);
          line-height: 1.6;
          color: ${N};
          margin-bottom: 35px;
          font-weight: 500;
          font-style: italic;
        }

        .ts-author {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .ts-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 4px solid #fff;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.5s;
          object-fit: cover;
        }
        .ts-card.active .ts-avatar { transform: scale(1.1); }

        .ts-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          font-weight: 900;
          color: ${N};
          margin-bottom: 3px;
        }

        .ts-role {
          font-size: 12px;
          font-weight: 800;
          color: ${G};
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .ts-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 30px;
        }

        .ts-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #e2e8f0;
          cursor: pointer;
          transition: all 0.4s;
        }

        .ts-dot.active {
          background: ${G};
          width: 32px;
          border-radius: 10px;
          box-shadow: 0 4px 10px ${G}40;
        }

        [data-theme="dark"] .ts-root { background: #0b1121; }
        [data-theme="dark"] .ts-card { 
            background: rgba(255,255,255,0.03); 
            border-color: rgba(255,255,255,0.08); 
            backdrop-filter: blur(15px);
        }
        [data-theme="dark"] .ts-content { color: #f1f5f9; }
        [data-theme="dark"] .ts-name { color: #fff; }
      `}</style>

      <div className="ts-inner">
        <div className="wof-head">
          <div className="uni-label">💬 Voices of GNC</div>
          <h2 className="uni-h">Students & <span>Alumni Experience</span></h2>
          <p className="uni-sub">Unki kahani, unki zubaani — kaise GNC ne badli unki zindagi.</p>
        </div>

        <div className="ts-slider">
          {displayList.map((t, i) => (
            <div key={i} className={`ts-card ${currentIndex === i ? 'active' : ''}`}>
              <div className="ts-quote-icon">“</div>
              <p className="ts-content">“{t.content}”</p>
              <div className="ts-author">
                <img 
                  src={t.image || t.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0f2347&color=f4a023`} 
                  alt={t.name}
                  className="ts-avatar"
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0f2347&color=f4a023`; }}
                />
                <div>
                  <h4 className="ts-name">{t.name}</h4>
                  <p className="ts-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="ts-dots">
          {displayList.map((_, i) => (
            <div 
              key={i} 
              className={`ts-dot ${currentIndex === i ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
