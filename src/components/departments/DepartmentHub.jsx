import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { NAVY, Fade, Spin } from './DepartmentUI';

export const DepartmentHub = ({ DEPT_META }) => {
  const [cards, setCards] = useState([]);
  const [loading, setL] = useState(true);

  useEffect(() => {
    const slugs = Object.keys(DEPT_META);
    const map = {};
    const loaded = new Set();
    
    const unsubs = slugs.map(slug => {
      return onSnapshot(doc(db, 'departments', slug), snap => {
        map[slug] = { slug, ...DEPT_META[slug], ...(snap.exists() ? snap.data() : {}) };
        loaded.add(slug);
        if (loaded.size >= slugs.length) {
          setCards(slugs.map(s => map[s]));
          setL(false);
        }
      }, () => {
        map[slug] = { slug, ...DEPT_META[slug] };
        loaded.add(slug);
        if (loaded.size >= slugs.length) {
          setCards(slugs.map(s => map[s]));
          setL(false);
        }
      });
    });
    return () => unsubs.forEach(u => u());
  }, []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", background: '#f8fafc', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        .hub-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
        }
        .hub-fade-wrap {
          width: calc(33.333% - 16px);
          display: flex;
        }
        @media(max-width: 1024px) { .hub-fade-wrap { width: calc(50% - 12px); } }
        @media(max-width: 640px) { .hub-fade-wrap { width: 100%; } }

        .hub-bg-blob{position:absolute;width:400px;height:400px;background:radial-gradient(circle,rgba(14,165,233,0.08) 0%,transparent 70%);border-radius:50%;filter:blur(60px);z-index:0;pointer-events:none;}
        .hub-card{width:100%;background:rgba(255,255,255,0.7);backdrop-filter:blur(10px);border:1.5px solid #fff;border-radius:24px;overflow:hidden;transition:all .4s cubic-bezier(.175,.885,.32,1.275);box-shadow:0 4px 6px rgba(15,35,71,.02);text-decoration:none;display:flex;flex-direction:column;position:relative;}
        .hub-card:hover{transform:translateY(-10px) scale(1.02);border-color:#edf2f7;box-shadow:0 30px 60px rgba(15,35,71,.08),0 0 0 1px rgba(15,35,71,.02);background:rgba(255,255,255,1);}
        .hub-icon-box{width:60px;height:60px;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:28px;transition:all .4s;}
        .hub-card:hover .hub-icon-box{transform:scale(1.1) rotate(8deg);box-shadow:0 10px 20px rgba(0,0,0,0.05);}
        .hub-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:12px;font-size:13px;fontWeight:800;transition:all .3s;margin-top:auto;}
        .hub-card:hover .hub-btn{padding-left:24px;padding-right:16px;}
        .hub-card::after{content:'';position:absolute;top:0;left:-100%;width:50%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent);transition:all .6s;transform:skewX(-25deg);pointer-events:none;}
        .hub-card:hover::after{left:150%;}
      `}</style>

      {/* 🚀 Hero Section */}
      <div style={{ background: 'linear-gradient(135deg,#fff,#f8fafc)', padding: 'clamp(64px,10vw,96px) 20px clamp(48px,6vw,64px)', position: 'relative' }}>
        <div className="hub-bg-blob" style={{ top: -100, left: -100 }} />
        <div className="hub-bg-blob" style={{ bottom: -50, right: -100, background: 'radial-gradient(circle,rgba(115,103,240,0.06) 0%,transparent 70%)' }} />
        
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Fade>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg,#0ea5e9, #2563eb)', color: '#fff', fontSize: 12, fontWeight: 800, padding: '6px 18px', borderRadius: 100, marginBottom: 24, boxShadow: '0 8px 16px rgba(14,165,233,0.2)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <span>🏢</span> Academic Excellence
            </div>
            <h1 style={{ fontSize: 'clamp(32px,6vw,58px)', fontWeight: 900, color: NAVY, lineHeight: 1, letterSpacing: '-2px', marginBottom: 20 }}>
              Future-Ready <span style={{ background: 'linear-gradient(135deg,#0ea5e9, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Departments</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: 'clamp(16px,2vw,18px)', maxWidth: 640, margin: '0 auto', lineHeight: 1.8 }}>
              GNC College ke specialized academic sections — jahan innovation aur traditional learning milti hai perfect career growth ke liye.
            </p>
          </Fade>
        </div>
      </div>

      {/* 🏛️ Departments Grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px 100px' }}>
        {loading ? (
          <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spin /></div>
        ) : (
          <div className="hub-grid">
            {cards.map((dept, i) => (
              <div key={dept.slug} className="hub-fade-wrap">
                <Fade delay={i * .08} y={30} style={{ width: '100%', display: 'flex' }}>
                  <Link to={`/academics/departments/${dept.slug}`} className="hub-card">
                    <div style={{ height: 6, background: `linear-gradient(90deg, ${dept.color}, ${dept.color}88)` }} />
                    <div style={{ padding: '32px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div className="hub-icon-box" style={{ background: `${dept.color}14`, border: `1px solid ${dept.color}22`, marginBottom: 24, color: dept.color }}>
                        {dept.icon}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 900, color: dept.color, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>{dept.short}</div>
                      <h3 style={{ fontSize: 22, fontWeight: 900, color: NAVY, marginBottom: 12, lineHeight: 1.25, letterSpacing: '-0.3px' }}>{dept.fullName || dept.name || dept.full}</h3>
                      <p style={{ fontSize: 14.5, color: '#64748b', lineHeight: 1.65, marginBottom: 28, flex: 1, textAlign: 'justify' }}>{dept.tagline || 'Excellence in education and professional growth.'}</p>
                      
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(241,245,249,0.6)' }}>
                        <span style={{ fontSize: 12.5, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>Explore Stream</span>
                        <div className="hub-btn" style={{ background: `${dept.color}10`, color: dept.color, border: `1.5px solid ${dept.color}28`, margin: 0, padding: '8px 16px' }}>
                          View <span>→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Fade>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

