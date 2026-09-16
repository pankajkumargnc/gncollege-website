// src/pages/CampusPages.jsx
import React, { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import usePageContent, { DynamicSectionsContainer } from '../hooks/usePageContent';
import { resolveUrl } from '../utils/resolver';
import DOMPurify from 'dompurify';

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
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'campus_gallery', categoryId), snap => {
      if(snap.exists()) {
        setPhotos(snap.data().photos || []);
      } else {
        setPhotos([]);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [categoryId]);

  if (!loading && photos.length === 0) return null; // Sirf tab hide hoga jab truly emtpy ho

  const shimmer = {
    background: '#f1f5f9',
    backgroundImage: 'linear-gradient(to right, #f1f5f9 0%, #e2e8f0 20%, #f1f5f9 40%, #f1f5f9 100%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '800px 100%', 
    animation: 'shimmer 1.5s infinite linear'
  };

  return (
    <div style={{ marginTop: 40 }}>
      <Fade>
        <div style={{ display: 'inline-block', background: `${GOLD}15`, color: '#b45309', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 800, letterSpacing: 1, marginBottom: 16 }}>
          📸 LIVE GALLERY
        </div>
      </Fade>
      <style>{`@keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }`}</style>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 24 }}>
        {loading ? (
          [1, 2, 3].map((n) => (
            <div key={n} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #f1f5f9', background: '#fff' }}>
              <div style={{ width: '100%', height: 220, ...shimmer }} />
              <div style={{ padding: '14px 18px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ height: 16, width: '60%', borderRadius: 4, ...shimmer }} />
              </div>
            </div>
          ))
        ) : (
          photos.map((p, i) => (
            <Fade key={p.id} delay={i * 0.1}>
              <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 30px rgba(15,35,71,0.06)', border: '1px solid #f1f5f9', background: '#fff', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                <img 
                  src={resolveUrl(p.url || p) || `${import.meta.env.BASE_URL}images/college_photo.webp`} 
                  alt={p.caption || 'Campus photo'} 
                  referrerPolicy="no-referrer"
                  style={{ width: '100%', height: 220, objectFit: 'cover' }} 
                  onError={(e) => {
                    const fallback = `${import.meta.env.BASE_URL}images/college_photo.webp`;
                    if (e.target.src !== fallback) e.target.src = fallback;
                  }}
                />
                {p.caption && p.caption !== 'Campus View' && (
                  <div style={{ padding: '14px 18px', fontSize: 13.5, fontWeight: 700, color: NAVY, borderTop: '1px solid #f1f5f9' }}>
                    {p.caption}
                  </div>
                )}
              </div>
            </Fade>
          ))
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   1. CAMPUS VISUALS (Ab 100% Live hai)
════════════════════════════════════════════════════════════ */
export function CampusVisuals({ title, desc, categoryId }) {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <header className="premium-hero">
        <div className="kinetic-bg" />
        <div className="hero-content-wrapper">
          <Fade><h1>{title}</h1></Fade>
          <Fade delay={0.1}><p>{desc}</p></Fade>
        </div>
      </header>
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
  const { content, getList } = usePageContent('infrastructure');
  const boxes = getList('facilities', [
    { title: 'Central Library', icon: '📚', span: 2, bg: '#fff', color: NAVY, desc: 'Over 50,000 books and digital journals.' },
    { title: 'Science Labs', icon: '🔬', span: 1, bg: `${NAVY}0a`, color: NAVY, desc: 'State-of-the-art equipments.' },
    { title: 'Auditorium', icon: '🎭', span: 1, bg: `${GOLD}15`, color: '#b45309', desc: '500+ seating capacity.' },
    { title: 'Sports Ground', icon: '⚽', span: 2, bg: '#fff', color: NAVY, desc: 'Vast playground for outdoor sports.' }
  ]);

  return (
    <div style={{ background: '#f8fafc', padding: 'clamp(56px,8vw,80px) clamp(16px,3vw,24px)', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Fade>
          <div style={{ color: GOLD, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>OVERVIEW</div>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: NAVY, marginBottom: 40 }}>{content?.title || 'World-Class Infrastructure'}</h1>
          {content?.subtitle && (
            <p style={{ color: '#64748b', fontSize: 16, marginTop: -20, marginBottom: 36 }}>{content.subtitle}</p>
          )}
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 24, marginBottom: 40 }}>
          {boxes.map((b, i) => (
            <Fade key={i} delay={i * 0.1} style={{ gridColumn: `span ${window.innerWidth > 768 ? (b.span || 1) : 1}` }}>
              <div style={{ background: b.bg || '#fff', borderRadius: 24, padding: 32, height: '100%', border: '1.5px solid #e2e8f0' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{b.icon || '🏛️'}</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: b.color || NAVY, margin: '0 0 10px' }}>{b.title}</h3>
                <p style={{ color: '#64748b', fontSize: 15, margin: 0, lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
        <DynamicSectionsContainer sections={content?.sections} excludeIds={['facilities']} />
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
  const { content, getList, getText } = usePageContent('classrooms');
  const features = getList('features', ['Spacious & Well-Ventilated', 'Ergonomic Seating', 'Interactive Smart Boards']);
  const descText = getText('desc', '<p>Comfortable, well-ventilated, and equipped with smart tech.</p>');
  return (
    <div style={{ background: '#fff', padding: 'clamp(56px,8vw,80px) clamp(16px,3vw,24px)', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: 60, alignItems: 'center', marginBottom: 40 }}>
          <Fade>
            <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: `0 20px 40px ${NAVY}15` }}>
              <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80" alt="Classroom" style={{ width: '100%', display: 'block' }} />
            </div>
          </Fade>
          <Fade delay={0.2}>
            <div style={{ background: `${GOLD}15`, padding: '8px 16px', borderRadius: 20, color: '#b45309', fontWeight: 700, display: 'inline-block', marginBottom: 16, fontSize: 13 }}>MODERN LEARNING</div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, color: NAVY, margin: '0 0 24px', lineHeight: 1.2 }}>{content?.title || 'Smart Classrooms'}</h1>
            <div className="rich-text-content" style={{ color: '#64748b', fontSize: 16, lineHeight: 1.8, marginBottom: 24 }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(descText) }} />
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {features.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, fontWeight: 600, color: NAVY }}>
                  <span style={{ background: '#d1fae5', color: '#059669', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</span>
                  {typeof item === 'object' ? (item.title || item.name || JSON.stringify(item)) : item}
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        <DynamicSectionsContainer sections={content?.sections} excludeIds={['features', 'desc']} />
        <LiveGallery categoryId="classrooms" />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   4. ICT ROOMS
════════════════════════════════════════════════════════════ */
export function IctRooms() {
  const { content, getText } = usePageContent('ict-rooms');
  const aboutHtml = getText('about', '<p>Our ICT rooms and computer laboratories are equipped with high-performance workstations, latest software, high-speed internet connectivity, and multimedia projectors to facilitate modern digital learning experiences for students across all departments.</p>');
  return (
    <div style={{ background: NAVY, padding: 'clamp(56px,8vw,80px) clamp(16px,3vw,24px)', color: '#fff', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", minHeight: '100dvh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Fade><h1 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, margin: '0 0 16px' }}>{content?.title || 'ICT & Computer Labs'}</h1></Fade>
          <Fade delay={0.1}><p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 600, margin: '0 auto 24px', lineHeight: 1.7 }}>{content?.subtitle || 'Empowering students with high-end workstations.'}</p></Fade>
          {aboutHtml && (
            <Fade delay={0.2}>
              <div className="rich-text-content" style={{ maxWidth: 800, margin: '0 auto 30px', color: '#cbd5e1', fontSize: 15.5, lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutHtml) }} />
            </Fade>
          )}
        </div>
        <DynamicSectionsContainer sections={content?.sections} excludeIds={['about']} />
        <LiveGallery categoryId="ict-rooms" />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   5. GREEN CAMPUS
════════════════════════════════════════════════════════════ */
export function GreenCampus() {
  const { content, getText } = usePageContent('green-campus');
  const aboutHtml = getText('about', '<p>Guru Nanak College is committed to maintaining an eco-friendly campus with extensive green cover, rainwater harvesting, solar panels for clean energy, ban on single-use plastic, and regular tree plantation drives led by the NSS unit. Our green campus initiatives align with the UGC guidelines on sustainable development in higher education.</p>');
  return (
    <div style={{ background: 'linear-gradient(145deg, #f0fdf4 0%, #ffffff 100%)', padding: 'clamp(56px,8vw,80px) clamp(16px,3vw,24px)', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", minHeight: '100dvh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Fade>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#064e3b', margin: '0 0 16px' }}>{content?.title || 'Our Green Initiatives'}</h1>
            {content?.subtitle && (
              <p style={{ color: '#047857', fontSize: 16, maxWidth: 600, margin: '0 auto 20px', fontWeight: 600 }}>{content.subtitle}</p>
            )}
          </Fade>
          {aboutHtml && (
            <Fade delay={0.15}>
              <div style={{ maxWidth: 840, margin: '0 auto 32px', background: '#fff', padding: '24px 32px', borderRadius: 20, boxShadow: '0 8px 24px rgba(6,78,59,0.06)', border: '1px solid #d1fae5', textAlign: 'justify', textJustify: 'inter-word', color: '#334155', fontSize: 15, lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutHtml) }} />
            </Fade>
          )}
        </div>
        <DynamicSectionsContainer sections={content?.sections} excludeIds={['about']} />
        <LiveGallery categoryId="green-campus" />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   6. 360° VIRTUAL CAMPUS TOUR
════════════════════════════════════════════════════════════ */
const VirtualTour = React.lazy(() => import('../components/VirtualTour'));

export function VirtualTourPage() {
  return (
    <div style={{ background: '#f8fafc', padding: 'clamp(40px,6vw,64px) clamp(16px,3vw,24px)', minHeight: '100dvh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <React.Suspense fallback={
          <div style={{ textAlign: 'center', padding: '100px 0', color: NAVY, fontWeight: 700 }}>
            Loading 360° Panoramic Campus Tour...
          </div>
        }>
          <VirtualTour />
        </React.Suspense>
      </div>
    </div>
  );
}