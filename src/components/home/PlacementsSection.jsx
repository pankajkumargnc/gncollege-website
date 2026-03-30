// src/components/home/PlacementsSection.jsx
import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { COLORS } from '../../styles/colors';

const N = COLORS.navy;
const G = COLORS.gold;

const COMPANY_COLORS = {
  tcs:'#0066cc', wipro:'#7c3aed', infosys:'#007dc1', accenture:'#a100ff',
  hcl:'#00b0ea', ibm:'#054ada', bank:'#16a34a', bsnl:'#ea580c', sbi:'#1d4ed8',
  google:'#4285f4', amazon:'#f59e0b', microsoft:'#0284c7', flipkart:'#2874f0',
  zomato:'#e23744', cognizant:'#1a77c9', capgemini:'#0070c0',
};

const getColor = (c = '') => {
  const lc = c.toLowerCase();
  for (const [k, v] of Object.entries(COMPANY_COLORS)) if (lc.includes(k)) return v;
  return N;
};

const S = `
  .wof-root {
    padding: clamp(60px, 10vw, 120px) 0;
    background: #f8fafc;
    position: relative;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  }
  
  .wof-inner { 
    max-width: 1400px; 
    margin: 0 auto; 
    padding: 0 20px;
  }

  .wof-head { text-align: center; margin-bottom: 60px; }
  
  .wof-stats { 
      display: flex; justify-content: center; gap: clamp(30px, 6vw, 80px); 
      margin-top: 40px; 
  }
  .wof-stat { text-align: center; position: relative; }
  .wof-stat::after {
      content: ''; position: absolute; right: -40px; top: 10px; bottom: 10px; width: 1px;
      background: linear-gradient(to bottom, transparent, rgba(15,35,71,0.1), transparent);
  }
  .wof-stat:last-child::after { display: none; }
  
  .wof-stat-num { 
      font-family: 'Plus Jakarta Sans', sans-serif; 
      font-size: clamp(24px, 3.5vw, 44px); font-weight: 800; color: ${N}; 
      line-height: 1; margin-bottom: 5px;
  }
  .wof-stat-lbl { 
      font-size: 11px; color: #64748b; letter-spacing: 2px; text-transform: uppercase; 
      font-weight: 700; 
  }

  /* Marquee Mask */
  .wof-mask {
    width: 100%; overflow: hidden;
    mask: linear-gradient(90deg, transparent 0%, #fff 5%, #fff 95%, transparent 100%);
    -webkit-mask: linear-gradient(90deg, transparent 0%, #fff 10%, #fff 90%, transparent 100%);
    padding: 40px 0;
  }
  .wof-track {
    display: flex; width: max-content; gap: 30px;
    animation: wof-scroll 50s linear infinite; will-change: transform;
  }
  .wof-track:hover { animation-play-state: paused; }
  @keyframes wof-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.3333%); } }

  /* Premium Card Design */
  .wof-card {
    width: 280px;
    background: #fff; border: 1px solid #f1f5f9; border-radius: 28px;
    padding: 35px 25px 25px; text-align: center;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative; 
    box-shadow: 0 10px 30px rgba(15,35,71,0.04);
  }
  .wof-card:hover {
    transform: translateY(-15px);
    box-shadow: 0 40px 70px rgba(15,35,71,0.12);
    border-color: ${G}30;
  }

  .wof-avatar-wrap { position: relative; width: 85px; height: 85px; margin: 0 auto 20px; }
  .wof-avatar {
    width: 85px; height: 85px; border-radius: 50%; object-fit: cover;
    border: 3px solid #fff; box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    transition: all 0.5s;
  }
  .wof-card:hover .wof-avatar { transform: scale(1.1); border-color: ${G}; }
  
  .wof-badge {
    position: absolute; top: 10px; right: 20px; font-size: 20px;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2)); animation: wof-float 3s ease-in-out infinite;
  }

  @keyframes wof-float { 
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
  }

  .wof-name { 
      font-family: 'Plus Jakarta Sans', sans-serif; 
      font-size: 18px; font-weight: 800; color: ${N}; margin-bottom: 5px; 
  }
  .wof-course { font-size: 12px; color: #64748b; margin-bottom: 8px; font-weight: 500; }
  
  .wof-company-tag {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 16px; border-radius: 50px; font-size: 13px; font-weight: 800;
    color: #fff; margin-bottom: 15px; border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 8px 20px -5px rgba(0,0,0,0.2);
  }

  .wof-role { font-size: 11.5px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  
  .wof-pkg-pill {
    position: absolute; top: 20px; left: 20px;
    background: #fffbeb; color: ${G}; font-size: 10px; font-weight: 900;
    padding: 4px 10px; border-radius: 50px; border: 1px solid ${G}30;
  }

  .wof-foot { text-align: center; margin-top: 40px; }
  .wof-btn {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 12px 28px; background: ${N}; color: #fff; border-radius: 50px;
      font-size: 14px; font-weight: 700; text-decoration: none; transition: all 0.3s;
  }
  .wof-btn:hover { background: ${G}; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(244,160,35,0.3); }

  @media(max-width: 768px) {
    .wof-stat::after { display: none; }
    .wof-stats { gap: 30px; }
    .wof-card { width: 240px; }
  }

  [data-theme="dark"] .wof-root { background: #0b1121; }
  [data-theme="dark"] .wof-card { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08); }
  [data-theme="dark"] .wof-name { color: #fff; }
  [data-theme="dark"] .wof-stat-num { color: #fff; }
`;

const WofCard = memo(({ p }) => {
  const color    = getColor(p.company || '');
  const fallback = `${import.meta.env.BASE_URL || '/'}images/college_photo.webp`;
  return (
    <div className="wof-card">
      <div className="wof-pkg-pill">{p.package || '—'} LPA</div>
      <div className="wof-badge">🎓</div>
      <div className="wof-avatar-wrap">
        <img
          src={p.imageUrl || fallback} alt={p.name || 'Alumni'}
          className="wof-avatar" loading="lazy"
          onError={e => { e.currentTarget.src = fallback; }}
        />
      </div>
      <div className="wof-name">{p.name}</div>
      <div className="wof-course">{p.course || 'Graduate'}</div>
      
      <div className="wof-company-tag" style={{ background: color }}>
        {p.company || 'Industry Leader'}
      </div>
      
      <div className="wof-role">{p.role || 'Professional'}</div>
      <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 10 }}>Batch of {p.year || '—'}</div>
    </div>
  );
});

export default function PlacementsSection() {
  const [placements, set] = useState([]);
  const [loading, setL]   = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'placements'));
    const unsub = onSnapshot(q, snap => { 
      let data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
      set(data);
      setL(false); 
    }, ()  => setL(false));
    return () => unsub();
  }, []);

  if (loading) return null;

  const companies = [...new Set(placements.map(p => p.company).filter(Boolean))];
  const pkgs      = placements.map(p => parseFloat(p.package)).filter(n => !isNaN(n));
  const maxPkg    = pkgs.length ? Math.max(...pkgs) : null;
  const triple    = [...placements, ...placements, ...placements];

  return (
    <section className="wof-root">
      <style>{S}</style>
      
      <div className="wof-inner">
        <div className="wof-head">
          <div className="uni-label">🏆 Proud Alumni</div>
          <h2 className="uni-h">Wall of <span>Fame</span></h2>
          <p className="uni-sub">
            Hamare ho-nhaar students jo aaj global industries mein apna parcham lehra rahe hain.
          </p>

          {placements.length > 0 && (
            <div className="wof-stats">
              <div className="wof-stat">
                <div className="wof-stat-num">{placements.length}+</div>
                <div className="wof-stat-lbl">Placed</div>
              </div>
              <div className="wof-stat">
                <div className="wof-stat-num">{companies.length}+</div>
                <div className="wof-stat-lbl">Companies</div>
              </div>
              {maxPkg && (
                <div className="wof-stat">
                  <div className="wof-stat-num">{maxPkg} LPA</div>
                  <div className="wof-stat-lbl">Highest</div>
                </div>
              )}
            </div>
          )}
        </div>

        {placements.length === 0 ? (
          <div style={{ textAlign:'center', color:'#94a3b8', padding:'60px 0' }}>
            Alumni success stories are loading...
          </div>
        ) : (
          <div className="wof-mask">
            <div className="wof-track">
              {triple.map((p, i) => <WofCard key={`${p.id}-${i}`} p={p} />)}
            </div>
          </div>
        )}

        <div className="wof-foot">
            <Link to="/academics/placements" className="wof-btn">
                View Detailed Records <span style={{ fontSize: 18 }}>→</span>
            </Link>
        </div>
      </div>
    </section>
  );
}