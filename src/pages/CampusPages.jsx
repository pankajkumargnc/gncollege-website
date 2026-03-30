// src/pages/CampusPages.jsx
import React, { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Firebase import zaroori hai
import { COLORS } from '../styles/colors';

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

/* ─── Shared Scroll Animation ─── */
function Fade({ children, delay = 0, y = 20 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0, transform: vis ? 'none' : `translateY(${y}px)`,
      transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`
    }}>
      {children}
    </div>
  );
}

/* ─── NAYA: LIVE GALLERY COMPONENT (Fetches from Firebase) ─── */
function LiveGallery({ categoryId }) {
  const [photos, setPhotos] = useState([]);
  
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'campus_gallery', categoryId), snap => {
      if(snap.exists()) setPhotos(snap.data().photos || []);
    });
    return () => unsub();
  }, [categoryId]);

  if (photos.length === 0) return null; // Agar photo nahi hai toh hide rahega

  return (
    <div style={{ marginTop: 40 }}>
      <Fade>
        <div style={{ display: 'inline-block', background: `${GOLD}15`, color: '#b45309', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 800, letterSpacing: 1, marginBottom: 16 }}>
          📸 LIVE GALLERY
        </div>
      </Fade>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {photos.map((p, i) => (
          <Fade key={p.id} delay={i * 0.1}>
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 30px rgba(15,35,71,0.06)', border: '1px solid #f1f5f9', background: '#fff', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              <img src={p.url} alt={p.caption} style={{ width: '100%', height: 220, objectFit: 'cover' }} />
              {p.caption && p.caption !== 'Campus View' && (
                <div style={{ padding: '14px 18px', fontSize: 13.5, fontWeight: 700, color: NAVY, borderTop: '1px solid #f1f5f9' }}>
                  {p.caption}
                </div>
              )}
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   1. CAMPUS VISUALS (Ab 100% Live hai)
════════════════════════════════════════════════════════════ */
export function CampusVisuals({ title, desc, categoryId }) {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ background: NAVY, padding: 'clamp(56px,8vw,80px) clamp(16px,3vw,24px) clamp(44px,6vw,60px)', textAlign: 'center', color: '#fff' }}>
        <Fade><h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, margin: '0 0 16px' }}>{title}</h1></Fade>
        <Fade delay={0.1}><p style={{ color: '#cbd5e1', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>{desc}</p></Fade>
      </div>
      <div style={{ maxWidth: 1200, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        {/* Yahan direct live photos aayengi */}
        <LiveGallery categoryId={categoryId} /> 
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   2. INFRASTRUCTURE 
════════════════════════════════════════════════════════════ */
export function Infrastructure() {
  const boxes = [
    { title: 'Central Library', icon: '📚', span: 2, bg: '#fff', color: NAVY, desc: 'Over 50,000 books and digital journals.' },
    { title: 'Science Labs', icon: '🔬', span: 1, bg: `${NAVY}0a`, color: NAVY, desc: 'State-of-the-art equipments.' },
    { title: 'Auditorium', icon: '🎭', span: 1, bg: `${GOLD}15`, color: '#b45309', desc: '500+ seating capacity.' },
    { title: 'Sports Ground', icon: '⚽', span: 2, bg: '#fff', color: NAVY, desc: 'Vast playground for outdoor sports.' }
  ];

  return (
    <div style={{ background: '#f8fafc', padding: 'clamp(56px,8vw,80px) clamp(16px,3vw,24px)', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Fade>
          <div style={{ color: GOLD, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>OVERVIEW</div>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: NAVY, marginBottom: 40 }}>World-Class Infrastructure</h1>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 60 }}>
          {boxes.map((b, i) => (
            <Fade key={i} delay={i * 0.1} style={{ gridColumn: `span ${window.innerWidth > 768 ? b.span : 1}` }}>
              <div style={{ background: b.bg, borderRadius: 24, padding: 32, height: '100%', border: '1.5px solid #e2e8f0' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{b.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: b.color, margin: '0 0 10px' }}>{b.title}</h3>
                <p style={{ color: '#64748b', fontSize: 15, margin: 0, lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
        {/* Live Gallery added below static content */}
        <LiveGallery categoryId="infrastructure" />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   3. CLASSROOMS
════════════════════════════════════════════════════════════ */
export function Classrooms() {
  return (
    <div style={{ background: '#fff', padding: 'clamp(56px,8vw,80px) clamp(16px,3vw,24px)', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 60, alignItems: 'center', marginBottom: 60 }}>
          <Fade>
            <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: `0 20px 40px ${NAVY}15` }}>
              <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80" alt="Classroom" style={{ width: '100%', display: 'block' }} />
            </div>
          </Fade>
          <Fade delay={0.2}>
            <div style={{ background: `${GOLD}15`, padding: '8px 16px', borderRadius: 20, color: '#b45309', fontWeight: 700, display: 'inline-block', marginBottom: 16, fontSize: 13 }}>MODERN LEARNING</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, color: NAVY, margin: '0 0 24px', lineHeight: 1.2 }}>Smart Classrooms</h2>
            <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>Comfortable, well-ventilated, and equipped with smart tech.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Spacious & Well-Ventilated', 'Ergonomic Seating', 'Interactive Smart Boards'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, fontWeight: 600, color: NAVY }}>
                  <span style={{ background: '#d1fae5', color: '#059669', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        <LiveGallery categoryId="classrooms" />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   4. ICT ROOMS
════════════════════════════════════════════════════════════ */
export function IctRooms() {
  return (
    <div style={{ background: NAVY, padding: 'clamp(56px,8vw,80px) clamp(16px,3vw,24px)', color: '#fff', fontFamily: "'DM Sans', sans-serif", minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <Fade><h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, margin: '0 0 16px' }}>ICT & Computer Labs</h2></Fade>
          <Fade delay={0.1}><p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>Empowering students with high-end workstations.</p></Fade>
        </div>
        <LiveGallery categoryId="ict-rooms" />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   5. GREEN CAMPUS
════════════════════════════════════════════════════════════ */
export function GreenCampus() {
  return (
    <div style={{ background: 'linear-gradient(145deg, #f0fdf4 0%, #ffffff 100%)', padding: 'clamp(56px,8vw,80px) clamp(16px,3vw,24px)', fontFamily: "'DM Sans', sans-serif", minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <Fade>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#064e3b', margin: '0 0 16px' }}>Our Green Initiatives</h2>
          </Fade>
        </div>
        <LiveGallery categoryId="green-campus" />
      </div>
    </div>
  );
}