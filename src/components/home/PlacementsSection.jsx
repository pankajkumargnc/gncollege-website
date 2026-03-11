// src/components/home/PlacementsSection.jsx
// 🏆 Alumni Wall of Fame — Firebase placements collection se auto-connected

import React, { useState, useEffect, memo } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase'; // ✅ src/components/home/ → src/firebase.js

const NAVY = '#0f2347';
const GOLD = '#f4a023';

const COMPANY_COLORS = {
  tcs:'#0066cc', wipro:'#9b59b6', infosys:'#007dc1', accenture:'#a100ff',
  hcl:'#00b0ea', ibm:'#054ada', bank:'#27ae60', bsnl:'#d35400', sbi:'#2980b9',
  google:'#4285f4', amazon:'#ff9900', microsoft:'#00a4ef', flipkart:'#2874f0',
  zomato:'#e23744', byju:'#7b2ff7', cognizant:'#1a77c9', capgemini:'#0070c0',
};
const getColor = (c = '') => {
  const lc = c.toLowerCase();
  for (const [k, v] of Object.entries(COMPANY_COLORS)) if (lc.includes(k)) return v;
  return NAVY;
};

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  .plc-root,.plc-root *,.plc-root *::before,.plc-root *::after{box-sizing:border-box;margin:0;padding:0;}
  .plc-root{padding:90px 0 70px;background:linear-gradient(160deg,#060e1c 0%,#0f2347 50%,#060e1c 100%);overflow:hidden;position:relative;font-family:'DM Sans',sans-serif;}

  .plc-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(244,160,35,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(244,160,35,.04) 1px,transparent 1px);background-size:48px 48px;}
  .plc-orb1{position:absolute;width:580px;height:580px;border-radius:50%;background:radial-gradient(circle,rgba(244,160,35,.07) 0%,transparent 65%);top:-180px;left:-160px;pointer-events:none;}
  .plc-orb2{position:absolute;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(15,35,71,.9) 0%,transparent 70%);bottom:-80px;right:-80px;pointer-events:none;}

  .plc-head{text-align:center;padding:0 20px 52px;position:relative;z-index:2;}
  .plc-pill{display:inline-flex;align-items:center;gap:8px;background:rgba(244,160,35,.1);border:1px solid rgba(244,160,35,.25);color:#f4a023;padding:7px 20px;border-radius:50px;font-size:10.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:18px;}
  .plc-dot{width:6px;height:6px;border-radius:50%;background:#f4a023;animation:plc-blink 2s infinite;}
  @keyframes plc-blink{0%,100%{opacity:1;}50%{opacity:.2;}}
  .plc-h2{font-family:'Syne',sans-serif;font-size:clamp(28px,4vw,44px);font-weight:800;color:#fff;letter-spacing:-1px;line-height:1.15;margin-bottom:12px;}
  .plc-h2 span{color:#f4a023;}
  .plc-sub{font-size:15px;color:rgba(255,255,255,.4);font-weight:300;}
  .plc-divider{width:56px;height:3px;margin:18px auto 0;border-radius:2px;background:linear-gradient(90deg,#f4a023,transparent);}

  .plc-stats{display:flex;justify-content:center;gap:40px;flex-wrap:wrap;margin-top:28px;}
  .plc-stat-num{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;color:#f4a023;}
  .plc-stat-lbl{font-size:11px;color:rgba(255,255,255,.3);letter-spacing:1px;text-transform:uppercase;margin-top:2px;}

  .plc-mask{overflow:hidden;mask:linear-gradient(90deg,transparent 0%,#fff 10%,#fff 90%,transparent 100%);-webkit-mask:linear-gradient(90deg,transparent 0%,#fff 10%,#fff 90%,transparent 100%);padding:16px 0 24px;position:relative;z-index:2;}
  .plc-track{display:flex;width:max-content;gap:22px;animation:plc-scroll 45s linear infinite;will-change:transform;}
  .plc-track:hover{animation-play-state:paused;}
  @keyframes plc-scroll{0%{transform:translateX(0);}100%{transform:translateX(-33.3333%);}}

  .plc-card{width:262px;flex-shrink:0;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:28px 22px 22px;text-align:center;cursor:default;transition:transform .35s cubic-bezier(.22,1,.36,1),background .3s,border-color .3s,box-shadow .3s;position:relative;overflow:hidden;}
  .plc-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(244,160,35,.07) 0%,transparent 60%);opacity:0;transition:opacity .3s;border-radius:20px;}
  .plc-card:hover{transform:translateY(-9px);background:rgba(255,255,255,.1);border-color:rgba(244,160,35,.4);box-shadow:0 24px 48px rgba(0,0,0,.4),0 0 0 1px rgba(244,160,35,.12);}
  .plc-card:hover::before{opacity:1;}

  .plc-photo-wrap{position:relative;width:82px;height:82px;margin:0 auto 18px;}
  .plc-photo{width:82px;height:82px;border-radius:50%;object-fit:cover;border:2.5px solid rgba(244,160,35,.4);box-shadow:0 8px 24px rgba(0,0,0,.35);transition:border-color .3s;}
  .plc-card:hover .plc-photo{border-color:#f4a023;}
  .plc-photo-wrap::after{content:'';position:absolute;inset:-4px;border-radius:50%;border:2px solid rgba(244,160,35,0);transition:all .35s;}
  .plc-card:hover .plc-photo-wrap::after{border-color:rgba(244,160,35,.25);inset:-7px;}
  .plc-badge{position:absolute;bottom:1px;right:1px;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;border:2px solid #0f2347;box-shadow:0 2px 8px rgba(0,0,0,.3);}

  .plc-name{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;color:#fff;margin-bottom:4px;line-height:1.3;}
  .plc-course{font-size:11px;color:rgba(255,255,255,.35);font-weight:500;letter-spacing:.3px;margin-bottom:6px;}
  .plc-batch{display:inline-block;background:rgba(244,160,35,.1);border:1px solid rgba(244,160,35,.2);color:#f4a023;font-size:10px;font-weight:700;padding:3px 12px;border-radius:50px;letter-spacing:.5px;margin-bottom:14px;}
  .plc-tag{display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:50px;font-size:12.5px;font-weight:700;color:#fff;border:1px solid transparent;transition:all .3s;}
  .plc-tag-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
  .plc-card:hover .plc-tag{transform:scale(1.05);box-shadow:0 4px 14px rgba(0,0,0,.3);}
  .plc-role{font-size:11px;color:rgba(255,255,255,.4);margin-top:7px;}
  .plc-pkg{margin-top:10px;font-size:12px;color:#f4a023;font-weight:700;display:flex;align-items:center;justify-content:center;gap:5px;opacity:.85;}

  .plc-foot{text-align:center;padding:10px 20px 0;position:relative;z-index:2;}
  .plc-foot-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.45);padding:10px 24px;border-radius:50px;font-size:12.5px;font-weight:600;}
  .plc-foot-badge b{color:#f4a023;font-weight:800;}

  .plc-empty{text-align:center;padding:60px 20px;color:rgba(255,255,255,.3);position:relative;z-index:2;}

  @media(max-width:768px){.plc-root{padding:64px 0 50px;}.plc-stats{gap:24px;}.plc-card{width:232px;padding:22px 16px 18px;}.plc-photo,.plc-photo-wrap{width:70px;height:70px;}}
  @media(max-width:480px){.plc-root{padding:50px 0 40px;}.plc-h2{font-size:24px;}.plc-card{width:210px;}.plc-stats{gap:14px;}.plc-stat-num{font-size:20px;}}
`;

const PlcCard = memo(({ p }) => {
  const color    = getColor(p.company || '');
  const fallback = `${import.meta.env.BASE_URL || '/'}images/college_photo.jpg`;
  return (
    <div className="plc-card">
      <div className="plc-photo-wrap">
        <img src={p.imageUrl || fallback} alt={p.name || 'Alumni'} className="plc-photo"
          loading="lazy" decoding="async" onError={e => { e.currentTarget.src = fallback; }} />
        <div className="plc-badge" style={{ background: color }}>💼</div>
      </div>
      <div className="plc-name">{p.name}</div>
      {p.course  && <div className="plc-course">{p.course}</div>}
      <div className="plc-batch">Batch {p.year || '—'}</div>
      <div className="plc-tag" style={{ background:`${color}22`, borderColor:`${color}44` }}>
        <span className="plc-tag-dot" style={{ background: color }} />
        {p.company || 'Industry'}
      </div>
      {p.role    && <div className="plc-role">{p.role}</div>}
      {p.package && <div className="plc-pkg">💰 {p.package} LPA</div>}
    </div>
  );
});

export default function PlacementsSection() {
  const [placements, set] = useState([]);
  const [loading, setL]   = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'placements'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, s => { set(s.docs.map(d => ({ id: d.id, ...d.data() }))); setL(false); }, () => setL(false));
  }, []);

  if (loading) return null;

  const companies = [...new Set(placements.map(p => p.company).filter(Boolean))];
  const pkgs      = placements.map(p => parseFloat(p.package)).filter(n => !isNaN(n));
  const maxPkg    = pkgs.length ? Math.max(...pkgs) : null;
  const triple    = [...placements, ...placements, ...placements];

  return (
    <section className="plc-root">
      <style>{S}</style>
      <div className="plc-grid" /><div className="plc-orb1" /><div className="plc-orb2" />

      <div className="plc-head">
        <div className="plc-pill"><div className="plc-dot" />Our Alumni</div>
        <h2 className="plc-h2">🏆 Wall of <span>Fame</span></h2>
        <p className="plc-sub">India's top companies mein apna career bana rahe hain GNC ke alumni</p>
        <div className="plc-divider" />
        {placements.length > 0 && (
          <div className="plc-stats">
            <div className="plc-stat"><div className="plc-stat-num">{placements.length}+</div><div className="plc-stat-lbl">Placed Students</div></div>
            <div className="plc-stat"><div className="plc-stat-num">{companies.length}+</div><div className="plc-stat-lbl">Companies</div></div>
            {maxPkg && <div className="plc-stat"><div className="plc-stat-num">{maxPkg} LPA</div><div className="plc-stat-lbl">Highest Package</div></div>}
          </div>
        )}
      </div>

      {placements.length === 0 ? (
        <div className="plc-empty">
          <div style={{ fontSize:42, marginBottom:14, opacity:.5 }}>🎓</div>
          <div style={{ fontSize:15, fontWeight:500 }}>Alumni stories loading soon</div>
          <div style={{ fontSize:13, marginTop:6, opacity:.6 }}>Admin Panel → Placements tab se data add karein</div>
        </div>
      ) : (
        <div className="plc-mask">
          <div className="plc-track">
            {triple.map((p, i) => <PlcCard key={`${p.id}-${i}`} p={p} />)}
          </div>
        </div>
      )}

      {placements.length > 0 && (
        <div className="plc-foot">
          <div className="plc-foot-badge">✨ <b>{placements.length}</b> success stories — aur badh rahi hain</div>
        </div>
      )}
    </section>
  );
}