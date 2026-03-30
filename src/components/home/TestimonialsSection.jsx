import React, { useRef, useState, useEffect } from 'react';
import { COLORS } from '../../styles/colors';

const TESTIMONIALS = [
  {
    name: "Dr. Sanjay Kumar",
    role: "Eminent Alumni, Batch 1985",
    content: "My years at Guru Nanak College were instrumental in shaping not just my career, but my entire perspective on lifelong learning and community service. The faculty's dedication to academic excellence is unmatched in Dhanbad.",
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
    content: "Guru Nanak College provided me a platform where academic rigor meets extracurricular brilliance. The placement cell played a massive role in opening doors to premium IT sectors for me and my batchmates.",
    avatar: "👨‍💼"
  },
  {
    name: "Pooja Gupta",
    role: "Entrepreneur & NGO Founder",
    content: "Being part of the NSS unit at GNC taught me the true meaning of leadership and social responsibility. It’s an institution that molds character while delivering top-tier education.",
    avatar: "👩‍💻"
  }
];

export default function TestimonialsSection({ testimonials = [] }) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter active and non-deleted ones. Fallback to static if empty.
  const activeTestis = (testimonials || []).filter(t => t.active !== false);
  const displayList = activeTestis.length > 0 ? activeTestis : TESTIMONIALS;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate effect
  useEffect(() => {
    if (displayList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % displayList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [displayList.length]);

  return (
    <section 
      ref={sectionRef} 
      className={`hp-testi-sec ${inView ? ' visible' : ''}`}
    >
      <style>{`
        .hp-testi-sec {
          padding: clamp(60px, 8vw, 100px) 20px;
          background: #f8fafc;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .hp-testi-sec.visible { opacity: 1; transform: none; }
        
        .hp-testi-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .testi-slider-container {
          position: relative;
          height: 380px;
          margin-top: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hp-testi-card {
          position: absolute;
          background: #fff;
          border-radius: 24px;
          padding: clamp(30px, 5vw, 60px);
          box-shadow: 0 20px 50px rgba(15, 35, 71, 0.08);
          border: 1px solid #edf2f7;
          width: 100%;
          opacity: 0;
          transform: scale(0.9) translateY(20px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hp-testi-card.active {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: auto;
          z-index: 2;
        }

        .testi-quote-mark {
          font-size: 80px;
          line-height: 1;
          color: ${COLORS.gold}33;
          font-family: Georgia, serif;
          margin-bottom: -20px;
        }

        .testi-content {
          font-size: clamp(16px, 2vw, 20px);
          line-height: 1.6;
          color: ${COLORS.navy};
          margin-bottom: 32px;
          font-style: italic;
          font-weight: 600;
          text-align: center;
        }

        .testi-author {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .testi-avatar-img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid ${COLORS.gold};
          box-shadow: 0 8px 20px rgba(244, 160, 35, 0.3);
        }

        .testi-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: ${COLORS.navy};
        }

        .testi-role {
          font-size: 13px;
          color: ${COLORS.gold};
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .testi-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }

        .testi-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #cbd5e1;
          cursor: pointer;
          transition: all 0.3s;
        }

        .testi-dot.active {
          background: ${COLORS.gold};
          width: 24px;
          border-radius: 10px;
        }

        [data-theme="dark"] .hp-testi-sec { background: #060e1c !important; }
        [data-theme="dark"] .hp-testi-card { 
          background: rgba(15, 35, 71, 0.4) !important; 
          border-color: rgba(255,255,255,0.05) !important;
          backdrop-filter: blur(10px);
        }
        [data-theme="dark"] .testi-content { color: #f1f5f9 !important; }
        [data-theme="dark"] .testi-name { color: #fff !important; }
      `}</style>

      <div className="hp-testi-inner">
        <div className="uni-header" style={{ marginBottom: 0 }}>
          <div className="uni-label">💬 Voices of Excellence</div>
          <h2 className="uni-h">
            Together we <span>Excel</span>
          </h2>
          <p className="uni-sub">
            GNC students aur alumni ke prerak anubhav padhein.
          </p>
        </div>

        <div className="testi-slider-container">
          {displayList.map((t, i) => (
            <div 
              key={t.id || i} 
              className={`hp-testi-card ${currentIndex === i ? 'active' : ''}`}
            >
              <div className="testi-quote-mark">“</div>
              <div className="testi-content">“{t.content}”</div>
              <div className="testi-author">
                <img 
                  src={t.image || t.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0f2347&color=f4a023`} 
                  alt={t.name}
                  className="testi-avatar-img"
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0f2347&color=f4a023`; }}
                />
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role} {t.year ? `· ${t.year}` : ''}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testi-dots">
          {displayList.map((_, i) => (
            <div 
              key={i} 
              className={`testi-dot ${currentIndex === i ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

