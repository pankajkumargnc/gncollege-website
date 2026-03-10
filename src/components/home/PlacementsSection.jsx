// src/components/home/PlacementsSection.jsx
// Alumni Wall of Fame - auto-scrolling slider

import React, { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';

const COMPANY_COLORS = {
  TCS:       '#0066cc', Wipro:  '#9b59b6', Infosys: '#007dc1',
  Accenture: '#a100ff', HCL:    '#00b0ea', IBM:     '#054ada',
  Bank:      '#27ae60', BSNL:   '#d35400', SBI:     '#2980b9',
};
const getCompanyColor = (company = '') => {
  for (const [key, color] of Object.entries(COMPANY_COLORS)) {
    if (company.toLowerCase().includes(key.toLowerCase())) return color;
  }
  return COLORS.navy || '#0B1F4E';
};

export default function PlacementsSection() {
  const [placements, setPlacements] = useState([]);
  const trackRef = useRef(null);
  const navy = COLORS.navy || '#0B1F4E';
  const gold  = COLORS.gold || '#C9A227';

  useEffect(() => {
    const q = query(collection(db, 'placements'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => setPlacements(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);

  if (placements.length === 0) return null;

  const cards = [...placements, ...placements, ...placements]; // triple for seamless loop

  return (
    <section style={{
      padding: '80px 0', background: `linear-gradient(135deg, ${navy} 0%, #1a3a7c 100%)`,
      overflow: 'hidden', position: 'relative',
    }}>
      {/* bg dots */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)',
        backgroundSize: '30px 30px', pointerEvents: 'none',
      }} />

      <style>{`
        @keyframes plc-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        .plc-track { display: flex; width: max-content; gap: 24px; animation: plc-scroll 40s linear infinite; }
        .plc-track:hover { animation-play-state: paused; }
        .plc-card { width: 280px; background: rgba(255,255,255,.07); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,.1); border-radius: 18px; padding: 24px 20px; flex-shrink: 0; transition: all .3s; cursor: default; text-align: center; }
        .plc-card:hover { background: rgba(255,255,255,.13); border-color: rgba(255,255,255,.25); transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,.3); }
        .plc-mask { overflow: hidden; mask: linear-gradient(90deg, transparent, white 8%, white 92%, transparent); -webkit-mask: linear-gradient(90deg, transparent, white 8%, white 92%, transparent); padding: 20px 0; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{
            background: `rgba(201,162,39,.2)`, color: gold,
            border: `1px solid ${gold}44`,
            padding: '6px 20px', borderRadius: 50, fontSize: 11.5, fontWeight: 800,
            letterSpacing: 1.5, textTransform: 'uppercase', display: 'inline-block', marginBottom: 14,
          }}>Our Alumni</span>
          <h2 style={{
            fontSize: 'clamp(26px,4vw,38px)', fontWeight: 900, color: '#fff',
            margin: '0 0 12px', letterSpacing: '-.5px',
          }}>
            🏆 Wall of <span style={{ color: gold }}>Fame</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
            Our alumni building careers at India's top companies
          </p>
          <div style={{ width: 60, height: 4, background: `linear-gradient(90deg,${gold},${navy})`, borderRadius: 4, margin: '18px auto 0' }} />
        </div>
      </div>

      {/* Slider */}
      <div className="plc-mask">
        <div className="plc-track" ref={trackRef}>
          {cards.map((p, i) => {
            const color = getCompanyColor(p.company);
            return (
              <div key={`${p.id}-${i}`} className="plc-card">
                {/* Photo */}
                <div style={{ position: 'relative', width: 90, height: 90, margin: '0 auto 16px' }}>
                  <img
                    src={p.imageUrl || `${import.meta.env.BASE_URL || '/'}images/college_photo.jpg`}
                    alt={p.name}
                    style={{
                      width: 90, height: 90, borderRadius: '50%', objectFit: 'cover',
                      border: `3px solid ${gold}`, boxShadow: `0 8px 20px rgba(0,0,0,.3)`,
                    }}
                  />
                  <div style={{
                    position: 'absolute', bottom: 0, right: 0,
                    background: color, width: 26, height: 26, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid #fff', fontSize: 12,
                  }}>💼</div>
                </div>

                <div style={{ fontWeight: 900, color: '#fff', fontSize: 16, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,.45)', fontWeight: 700, marginBottom: 12 }}>
                  Batch {p.year || '—'}
                </div>

                {/* Company tag */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  background: `${color}22`, border: `1px solid ${color}55`,
                  color: '#fff', padding: '7px 16px', borderRadius: 20, fontSize: 13, fontWeight: 800,
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  {p.company}
                </div>

                {p.package && (
                  <div style={{
                    marginTop: 10, fontSize: 12, color: gold, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                  }}>
                    💰 {p.package}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* count strip */}
      <div style={{ textAlign: 'center', marginTop: 36, position: 'relative', zIndex: 1 }}>
        <span style={{
          background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)',
          color: 'rgba(255,255,255,.7)', padding: '8px 22px', borderRadius: 50, fontSize: 13, fontWeight: 700,
        }}>
          ✨ {placements.length} success stories aur badh rahi hain
        </span>
      </div>
    </section>
  );
}