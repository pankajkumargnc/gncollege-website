// src/pages/GalleryPage.jsx
// ✅ FINAL UPDATED: Connected with Firebase Gallery Collection
import React, { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

function Fade({ children, delay = 0 }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current); return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: `all 0.6s ease-out ${delay}s` }}>{children}</div>;
}

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // 📸 Live Photo Sync from Admin Panel
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setImages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (error) => console.error("Gallery Sync Error:", error));
    return () => unsub();
  }, []);

  const categories = ['All', 'Campus', 'Events', 'Sports', 'Academic'];
  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ background: NAVY, padding: '80px 20px', textAlign: 'center', color: '#fff' }}>
        <Fade>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, marginBottom: 16 }}>Campus Gallery</h1>
          <p style={{ color: '#cbd5e1', maxWidth: 600, margin: '0 auto' }}>Capturing the vibrant life and infrastructure of Guru Nanak College.</p>
        </Fade>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
        {/* Category Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 40 }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)} 
              style={{ 
                padding: '10px 24px', borderRadius: 99, border: 'none', 
                background: filter === cat ? GOLD : '#fff', 
                color: filter === cat ? NAVY : '#64748b', 
                fontWeight: 800, cursor: 'pointer', 
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)', transition: '0.3s' 
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Image Grid */}
        <div style={{ columns: '3 280px', columnGap: '20px' }}>
          {filteredImages.length > 0 ? filteredImages.map((img, i) => (
            <div key={img.id} style={{ breakInside: 'avoid', marginBottom: '20px', borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', background: '#fff' }}>
              <img src={img.url} alt={img.title} style={{ width: '100%', display: 'block', transition: 'transform 0.5s' }} />
              {img.title && <div style={{ padding: '12px 16px', fontWeight: 700, color: NAVY, fontSize: 14 }}>{img.title}</div>}
            </div>
          )) : (
            <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px', color: '#94a3b8' }}>
              Admin Panel se photos upload karein...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}