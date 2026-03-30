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

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

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
        
        .hp-testi-sec::before {
          content: '""';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(15,35,71,0.08), transparent);
        }

        .hp-testi-inner {
          max-width: 1300px;
          margin: 0 auto;
        }

        .hp-testi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
          gap: 24px;
          margin-top: 40px;
        }

        .hp-testi-card {
          background: #fff;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(15, 35, 71, 0.04);
          border: 1px solid #edf2f7;
          position: relative;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
        }

        .hp-testi-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 40px rgba(15, 35, 71, 0.1);
        }

        .testi-quote-mark {
          position: absolute;
          top: 24px;
          right: 30px;
          font-size: 60px;
          line-height: 1;
          color: rgba(244, 160, 35, 0.15); /* Gold */
          font-family: Georgia, serif;
          pointer-events: none;
        }

        .testi-content {
          font-size: 14.5px;
          line-height: 1.7;
          color: #475569;
          margin-bottom: 24px;
          font-style: italic;
          position: relative;
          z-index: 1;
          flex: 1;
        }

        .testi-author {
          display: flex;
          align-items: center;
          gap: 16px;
          border-top: 1px solid #f1f5f9;
          padding-top: 20px;
        }

        .testi-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: ${COLORS.navy};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(15, 35, 71, 0.2);
        }

        .testi-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          font-weight: 800;
          color: ${COLORS.navy};
          line-height: 1.2;
        }

        .testi-role {
          font-size: 11.5px;
          color: #64748b;
          font-weight: 600;
          margin-top: 4px;
          letter-spacing: 0.3px;
        }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] .hp-testi-sec {
          background: #060e1c !important;
        }
        [data-theme="dark"] .hp-testi-sec::before {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
        }
        [data-theme="dark"] .hp-testi-card {
          background: rgba(10, 22, 48, 0.95) !important;
          border-color: rgba(255, 255, 255, 0.05) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
        }
        [data-theme="dark"] .hp-testi-card:hover {
          background: rgba(15, 35, 71, 0.98) !important;
          box-shadow: 0 15px 45px rgba(0,0,0,0.7) !important;
        }
        [data-theme="dark"] .testi-quote-mark { color: rgba(244, 160, 35, 0.2) !important; }
        [data-theme="dark"] .testi-content { color: #cbd5e1 !important; }
        [data-theme="dark"] .testi-author { border-top-color: rgba(255, 255, 255, 0.05) !important; }
        [data-theme="dark"] .testi-name { color: #f1f5f9 !important; }
        [data-theme="dark"] .testi-role { color: #94a3b8 !important; }
      `}</style>

      <div className="hp-testi-inner">
        <div className="uni-header">
          <div className="uni-label">💬 Voices of Excellence</div>
          <h2 className="uni-h">
            Alumni <span>Testimonials</span>
          </h2>
          <p className="uni-sub">
            GNC parvarik sadasyon ki saflata aur unke anubhav padhein.
          </p>
        </div>

        <div className="hp-testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div 
              key={i} 
              className="hp-testi-card" 
              style={{ 
                transitionDelay: `${i * 0.1}s`,
                opacity: inView ? 1 : 0, 
                transform: inView ? 'none' : 'translateY(20px)' 
              }}
            >
              <div className="testi-quote-mark">"</div>
              <div className="testi-content">{t.content}</div>
              <div className="testi-author">
                <div className="testi-avatar">{t.avatar}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
