import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Fade, NAVY, Spin } from './DepartmentUI';

export const SubjectGrid = ({ deptSlug, color, fallbackSubjects = [] }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, 'departments'),
      where('parentStream', '==', deptSlug)
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map(doc => ({
        slug: doc.id,
        ...doc.data()
      }));
      
      // If Firestore is empty, use the hardcoded fallback list from DEPT_META
      if (list.length === 0 && fallbackSubjects.length > 0) {
        setSubjects(fallbackSubjects);
      } else {
        setSubjects(list);
      }
      setLoading(false);
    }, (err) => {
      console.error("SubjectGrid error:", err);
      // On error, also try fallback
      if (fallbackSubjects.length > 0) setSubjects(fallbackSubjects);
      setLoading(false);
    });

    return () => unsub();
  }, [deptSlug, fallbackSubjects]);

  if (loading) return <div style={{ padding: '60px 0', textAlign: 'center' }}><Spin color={color} /></div>;
  if (subjects.length === 0) return null;

  return (
    <div id="subjects-grid" style={{ padding: 'clamp(44px,6vw,60px) 0 60px' }}>
      <style>{`
        .sj-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
        }
        .sj-fade-wrap {
          width: calc(33.333% - 16px);
          display: flex;
        }
        @media(max-width: 1024px) { .sj-fade-wrap { width: calc(50% - 12px); } }
        @media(max-width: 640px) { .sj-fade-wrap { width: 100%; } }

        .sj-card{width:100%;background:#fff;border:1.5px solid #f1f5f9;border-radius:24px;padding:32px;text-decoration:none;transition:all .4s cubic-bezier(.175,.885,.32,1.275);display:flex;flex-direction:column;position:relative;overflow:hidden;box-shadow:0 10px 30px rgba(15,35,71,.03);}
        .sj-card:hover{transform:translateY(-8px);border-color:${color}40;box-shadow:0 25px 50px ${color}12;}
        .sj-icon{width:56px;height:56px;border-radius:18px;background:${color}10;display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:20px;transition:all .4s;}
        .sj-card:hover .sj-icon{transform:scale(1.1) rotate(-5deg);background:${color}20;}
        .sj-arrow{width:36px;height:36px;border-radius:50%;background:#f8fafc;display:flex;align-items:center;justify-content:center;color:${color};font-size:16px;border:1.5px solid #f1f5f9;transition:all .3s;margin-left:auto;opacity:0.6;}
        .sj-card:hover .sj-arrow{background:${color};color:#fff;border-color:transparent;transform:translateX(4px);opacity:1;}
        .sj-badge{position:absolute;top:20px;right:-30px;background:${color};color:#fff;font-size:10px;font-weight:800;padding:4px 30px;transform:rotate(45deg);letter-spacing:1px;text-transform:uppercase;opacity:0;transition:opacity .3s;}
        .sj-card:hover .sj-badge{opacity:1;}
      `}</style>

      <Fade>
        <div style={{ marginBottom: 38, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 40, height: 2, background: color }} />
            <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: 2, color: '#94a3b8', textTransform: 'uppercase' }}>Academic Portal</span>
            <div style={{ width: 40, height: 2, background: color }} />
          </div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(26px,4vw,38px)', fontWeight: 900, color: NAVY, margin: 0, letterSpacing: '-0.8px' }}>
            Choose your <span style={{ color }}>Specialization</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: 15.5, margin: '12px auto 0', maxWidth: 600, lineHeight: 1.6 }}>
            Select a subject below to view detailed curriculum, dedicated faculty, and departmental resources for your academic journey.
          </p>
        </div>
      </Fade>

      <div className="sj-grid">
        {subjects.map((sub, i) => (
          <div key={sub.slug} className="sj-fade-wrap">
            <Fade delay={i * 0.06} y={20} style={{ width: '100%', display: 'flex' }}>
              <Link to={`/academics/departments/${deptSlug}/${sub.slug}`} className="sj-card">
                <div className="sj-badge">New</div>
                <div className="sj-icon">{sub.icon || '📚'}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: '0 0 10px', lineHeight: 1.3, letterSpacing: '-0.3px' }}>
                    {sub.fullName || sub.short || sub.label || sub.slug.charAt(0).toUpperCase() + sub.slug.slice(1)}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.65, margin: '0 0 24px', textAlign: 'justify' }}>
                    {sub.tagline || sub.desc || `Specialized course modules, expert guidance, and dedicated resources tailored specifically for ${sub.short || sub.slug}.`}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>{sub.stats?.[0]?.value || 'Full Time'} Course</span>
                  <div className="sj-arrow">→</div>
                </div>
              </Link>
            </Fade>
          </div>
        ))}
      </div>
    </div>
  );
};
