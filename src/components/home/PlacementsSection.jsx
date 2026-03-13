// src/components/home/PlacementsSection.jsx
// 🏆 Alumni Wall of Fame — Light, compact, premium  (Inter + Space Grotesk)

import React, { useState, useEffect, memo } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const N = '#0f2347';
const G = '#f4a023';

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
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap&subset=latin');
  .wof-root,.wof-root *{box-sizing:border-box;}
  .wof-root{padding:72px 0 60px;background:#f8fafc;border-top:1px solid #e8eef5;border-bottom:1px solid #e8eef5;overflow:hidden;position:relative;font-family:'Inter',sans-serif;}

  .wof-head{text-align:center;padding:0 20px 44px;position:relative;z-index:2;}
  .wof-eyebrow{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1.5px solid #e2e8f0;color:#64748b;padding:6px 16px;border-radius:50px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,.04);}
  .wof-dot{width:6px;height:6px;border-radius:50%;background:${G};animation:wof-blink 2s infinite;}
  @keyframes wof-blink{0%,100%{opacity:1;}50%{opacity:.3;}}
  .wof-h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(24px,3.5vw,36px);font-weight:800;color:${N};letter-spacing:-0.5px;line-height:1.2;margin-bottom:8px;}
  .wof-h2 span{color:${G};}
  .wof-sub{font-size:14px;color:#64748b;font-weight:400;max-width:480px;margin:0 auto;}
  .wof-bar{width:44px;height:3px;background:linear-gradient(90deg,${G},${N});border-radius:2px;margin:14px auto 0;}

  .wof-stats{display:flex;justify-content:center;gap:32px;flex-wrap:wrap;margin-top:24px;}
  .wof-stat{text-align:center;}
  .wof-stat-num{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:800;color:${N};}
  .wof-stat-lbl{font-size:10px;color:#94a3b8;letter-spacing:1px;text-transform:uppercase;margin-top:2px;font-weight:600;}

  .wof-mask{overflow:hidden;mask:linear-gradient(90deg,transparent 0%,#fff 8%,#fff 92%,transparent 100%);-webkit-mask:linear-gradient(90deg,transparent 0%,#fff 8%,#fff 92%,transparent 100%);padding:12px 0;}
  .wof-track{display:flex;width:max-content;gap:16px;animation:wof-scroll 40s linear infinite;will-change:transform;}
  .wof-track:hover{animation-play-state:paused;}
  @keyframes wof-scroll{0%{transform:translateX(0);}100%{transform:translateX(-33.3333%)}}

  .wof-card{width:220px;flex-shrink:0;background:#fff;border:1.5px solid #e8eef5;border-radius:16px;padding:22px 18px 18px;text-align:center;cursor:default;transition:transform .3s,box-shadow .3s,border-color .3s;position:relative;overflow:hidden;}
  .wof-card:hover{transform:translateY(-6px);box-shadow:0 16px 36px rgba(15,35,71,.09);border-color:#dde8f5;}

  .wof-avatar-wrap{position:relative;width:64px;height:64px;margin:0 auto 14px;}
  .wof-avatar{width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid #e8eef5;transition:border-color .3s;}
  .wof-card:hover .wof-avatar{border-color:${G};}
  .wof-badge{position:absolute;bottom:0;right:0;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.12);}

  .wof-name{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;color:${N};margin-bottom:3px;}
  .wof-course{font-size:11px;color:#94a3b8;font-weight:500;margin-bottom:5px;}
  .wof-batch{display:inline-block;background:#f1f5f9;color:#475569;font-size:10px;font-weight:700;padding:2px 10px;border-radius:50px;letter-spacing:.5px;margin-bottom:11px;}
  .wof-company{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:50px;font-size:12px;font-weight:700;color:#fff;}
  .wof-role{font-size:11px;color:#94a3b8;margin-top:5px;font-weight:500;}
  .wof-pkg{margin-top:7px;font-size:11.5px;color:${G};font-weight:700;display:flex;align-items:center;justify-content:center;gap:4px;}

  .wof-foot{text-align:center;padding:8px 20px 0;}
  .wof-foot-badge{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1.5px solid #e2e8f0;color:#64748b;padding:8px 20px;border-radius:50px;font-size:12px;font-weight:600;box-shadow:0 2px 8px rgba(0,0,0,.04);}
  .wof-foot-badge b{color:${N};font-weight:800;}
  .wof-empty{text-align:center;padding:48px 20px;color:#94a3b8;}

  @media(max-width:768px){.wof-root{padding:52px 0 40px;}.wof-card{width:192px;padding:18px 14px 15px;}.wof-stats{gap:20px;}}
  @media(max-width:480px){.wof-h2{font-size:22px;}.wof-card{width:175px;}.wof-stats{gap:14px;}.wof-stat-num{font-size:18px;}}
`;

const WofCard = memo(({ p }) => {
  const color    = getColor(p.company || '');
  const fallback = `${import.meta.env.BASE_URL || '/'}images/college_photo.jpg`;
  return (
    <div className="wof-card">
      <div className="wof-avatar-wrap">
        <img src={p.imageUrl || fallback} alt={p.name || 'Alumni'}
          className="wof-avatar" loading="lazy" decoding="async"
          onError={e => { e.currentTarget.src = fallback; }} />
        <div className="wof-badge" style={{ background: color }}>💼</div>
      </div>
      <div className="wof-name">{p.name}</div>
      {p.course  && <div className="wof-course">{p.course}</div>}
      <div className="wof-batch">Batch {p.year || '—'}</div>
      <div className="wof-company" style={{ background: color }}>
        <span style={{ width:6,height:6,borderRadius:'50%',background:'rgba(255,255,255,.65)',flexShrink:0,display:'inline-block' }} />
        {p.company || 'Industry'}
      </div>
      {p.role    && <div className="wof-role">{p.role}</div>}
      {p.package && <div className="wof-pkg">💰 {p.package} LPA</div>}
    </div>
  );
});

export default function PlacementsSection() {
  const [placements, set] = useState([]);
  const [loading, setL]   = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'placements'), orderBy('createdAt', 'desc'));
    return onSnapshot(q,
      s => { set(s.docs.map(d => ({ id: d.id, ...d.data() }))); setL(false); },
      ()  => setL(false)
    );
  }, []);

  if (loading) return null;

  const companies = [...new Set(placements.map(p => p.company).filter(Boolean))];
  const pkgs      = placements.map(p => parseFloat(p.package)).filter(n => !isNaN(n));
  const maxPkg    = pkgs.length ? Math.max(...pkgs) : null;
  const triple    = [...placements, ...placements, ...placements];

  return (
    <section className="wof-root">
      <style>{S}</style>

      <div className="wof-head">
        <div className="wof-eyebrow"><div className="wof-dot" /> Our Alumni</div>
        <h2 className="wof-h2">🏆 Wall of <span>Fame</span></h2>
        <p className="wof-sub">GNC ke alumni — India ki top companies mein apna career bana rahe hain</p>
        <div className="wof-bar" />
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
                <div className="wof-stat-lbl">Highest Pkg</div>
              </div>
            )}
          </div>
        )}
      </div>

      {placements.length === 0 ? (
        <div className="wof-empty">
          <div style={{ fontSize:40,marginBottom:12,opacity:.4 }}>🎓</div>
          <div style={{ fontWeight:600,marginBottom:6,color:'#475569' }}>Alumni stories loading soon</div>
          <div style={{ fontSize:13 }}>Admin Panel → Alumni Wall tab se data add karein</div>
        </div>
      ) : (
        <div className="wof-mask">
          <div className="wof-track">
            {triple.map((p, i) => <WofCard key={`${p.id}-${i}`} p={p} />)}
          </div>
        </div>
      )}

      {placements.length > 0 && (
        <div className="wof-foot">
          <div className="wof-foot-badge">
            ✨ <b>{placements.length}</b> success stories — aur badh rahi hain
          </div>
        </div>
      )}
    </section>
  );
}