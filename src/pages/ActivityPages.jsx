// src/pages/ActivityPages.jsx
import React, { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

/* ─── Shared Scroll Animation ─── */
function Fade({ children, delay = 0, y = 20 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current); return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : `translateY(${y}px)`, transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s` }}>{children}</div>;
}

/* ─── Shared Hero Header ─── */
const PageHeader = ({ title, subtitle, icon, theme = NAVY }) => (
  <div style={{ background: theme, padding: '80px 20px 60px', textAlign: 'center', color: '#fff' }}>
    <Fade>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, margin: '0 0 16px', letterSpacing: '-0.5px' }}>{title}</h1>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>{subtitle}</p>
    </Fade>
  </div>
);

/* ════════════════════════════════════════════════════════════
   1. NSS (National Service Scheme)
════════════════════════════════════════════════════════════ */
export function NssPage() {
  const stats = [
    { num: '500+', label: 'Active Volunteers', icon: '🙋‍♂️' },
    { num: '50+', label: 'Blood Units Donated', icon: '🩸' },
    { num: '20+', label: 'Adopted Villages', icon: '🏡' },
    { num: '1000+', label: 'Trees Planted', icon: '🌳' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="National Service Scheme (NSS)" subtitle='Motto: "Not Me But You". Developing student personality through community service.' icon="🤝" />
      <div style={{ maxWidth: 1100, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Fade>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 40 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 20, padding: 30, textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.05)' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: NAVY, marginBottom: 4 }}>{s.num}</div>
                <div style={{ fontSize: 14, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Fade>
        
        <Fade delay={0.2}>
          <div style={{ background: '#fff', borderRadius: 24, padding: 40, border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 24 }}>Major Activities</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {['Swachh Bharat Abhiyan', 'Blood Donation Camps', 'Traffic Awareness Drives', 'Disaster Relief & Rescue', 'National Integration Camps'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px', background: '#f8fafc', borderRadius: 12, border: '1px solid #f1f5f9' }}>
                  <span style={{ background: `${GOLD}20`, color: '#b45309', padding: 8, borderRadius: 8, fontSize: 18 }}>⭐</span>
                  <span style={{ fontWeight: 700, color: NAVY }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Fade>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   2. NCC (National Cadet Corps)
════════════════════════════════════════════════════════════ */
export function NccPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      {/* NCC Theme is slightly greenish/military blue */}
      <PageHeader title="National Cadet Corps (NCC)" subtitle='Motto: "Unity and Discipline". Shaping the youth into patriotic and disciplined citizens.' icon="🎖️" theme="#1e3a8a" />
      <div style={{ maxWidth: 1000, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Fade>
          <div style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.05)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <img src="https://images.unsplash.com/photo-1595844730298-b960fad9722a?auto=format&fit=crop&q=80" alt="NCC Parade" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 300 }} />
            <div style={{ padding: 40 }}>
              <div style={{ display: 'inline-block', background: '#dbeafe', color: '#1d4ed8', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 800, letterSpacing: 1, marginBottom: 16 }}>GNC NCC WING</div>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: NAVY, marginBottom: 16 }}>Building Future Leaders</h2>
              <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: 24 }}>The NCC unit of Guru Nanak College actively participates in Republic Day Camps (RDC), Combined Annual Training Camps (CATC), and Trekking expeditions. Cadets are trained in drill, map reading, and weapon handling.</p>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ background: '#f8fafc', padding: '10px 20px', borderRadius: 12, border: '1px solid #e2e8f0', fontWeight: 700, color: NAVY }}>B-Certificate</div>
                <div style={{ background: '#f8fafc', padding: '10px 20px', borderRadius: 12, border: '1px solid #e2e8f0', fontWeight: 700, color: NAVY }}>C-Certificate</div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   3. WORKSHOPS
════════════════════════════════════════════════════════════ */
export function WorkshopPage() {
  const workshops = [
    { title: 'Intellectual Property Rights (IPR)', dept: 'IQAC Cell', date: 'October 2023' },
    { title: 'New Education Policy (NEP 2020) Seminar', dept: 'Education Dept', date: 'August 2023' },
    { title: 'Cyber Security & Ethical Hacking', dept: 'BCA Department', date: 'July 2023' },
    { title: 'Financial Literacy for Youth', dept: 'Commerce Dept', date: 'May 2023' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="Workshops & Seminars" subtitle="Bridging the gap between academia and industry through expert sessions." icon="🎤" />
      <div style={{ maxWidth: 1000, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Fade>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 20 }}>
            {workshops.map((w, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 20, padding: 30, border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.03)', transition: 'transform 0.3s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-5px)'} onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                <div style={{ fontSize: 12, fontWeight: 800, color: GOLD, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{w.date}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, margin: '0 0 12px', lineHeight: 1.4 }}>{w.title}</h3>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f1f5f9', color: '#64748b', padding: '6px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>
                  <span>🏢</span> Organized by {w.dept}
                </div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   4. GAMES & SPORTS
════════════════════════════════════════════════════════════ */
export function SportsPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="Games & Sports" subtitle="Promoting physical fitness, teamwork, and sportsmanship among students." icon="🏆" />
      <div style={{ maxWidth: 1000, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Fade>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {/* Outdoor Sports */}
            <div style={{ background: '#fff', borderRadius: 24, padding: 40, border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.05)' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🏏</div>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: NAVY, marginBottom: 16 }}>Outdoor Sports</h2>
              <p style={{ color: '#64748b', marginBottom: 20, lineHeight: 1.6 }}>Our campus features a vast playground suitable for major athletic events and team sports.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {['Cricket', 'Football', 'Volleyball', 'Athletics'].map(s => <span key={s} style={{ background: `${NAVY}10`, color: NAVY, padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>{s}</span>)}
              </div>
            </div>

            {/* Indoor Sports */}
            <div style={{ background: '#fff', borderRadius: 24, padding: 40, border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.05)' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🏓</div>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: NAVY, marginBottom: 16 }}>Indoor Games</h2>
              <p style={{ color: '#64748b', marginBottom: 20, lineHeight: 1.6 }}>Dedicated indoor facilities for mind games and fast-paced table sports.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {['Table Tennis', 'Chess', 'Carrom', 'Badminton'].map(s => <span key={s} style={{ background: `${GOLD}20`, color: '#b45309', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>{s}</span>)}
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   5. ROTARACT CLUB
════════════════════════════════════════════════════════════ */
export function RotaractClub() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Rotaract Theme Color (Cranberry/Pinkish Red) */}
      <PageHeader title="Rotaract Club" subtitle='Motto: "Fellowship Through Service". A global movement of young leaders.' icon="⚙️" theme="#d91b5c" />
      <div style={{ maxWidth: 900, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Fade>
          <div style={{ background: '#fff', borderRadius: 24, padding: 40, border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(217,27,92,0.08)', textAlign: 'center' }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#d91b5c', marginBottom: 20 }}>Empowering Youth</h2>
            <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.8, marginBottom: 30 }}>The Rotaract Club of Guru Nanak College operates under the guidance of Rotary International. It provides an opportunity for young men and women to enhance the knowledge and skills that will assist them in personal development, to address the physical and social needs of their communities.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
              {['Leadership Development', 'Community Service', 'Professional Networking'].map((k, i) => (
                <div key={i} style={{ background: '#fdf2f8', color: '#be185d', padding: '10px 20px', borderRadius: 12, fontWeight: 800, fontSize: 14 }}>{k}</div>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   6. SADBHAVANA DIWAS
════════════════════════════════════════════════════════════ */
export function SadbhavanaDiwas() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Peaceful Green Theme */}
      <PageHeader title="Sadbhavana Diwas" subtitle="Promoting National Integration, Peace, and Communal Harmony." icon="🕊️" theme="#059669" />
      <div style={{ maxWidth: 900, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Fade>
          <div style={{ background: '#fff', borderRadius: 24, padding: 40, border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(5,150,105,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 48 }}>🕯️</div>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: NAVY, margin: '0 0 8px' }}>Harmony & Peace Pledge</h2>
                <div style={{ color: '#059669', fontWeight: 700 }}>Observed Annually on 20th August</div>
              </div>
            </div>
            <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.8, fontStyle: 'italic', background: '#ecfdf5', padding: 24, borderRadius: 16, borderLeft: '4px solid #10b981' }}>
              "I take this solemn pledge that I will work for the emotional oneness and harmony of all the people of India regardless of caste, region, religion, or language. I further pledge that I shall resolve all differences among us through dialogue and constitutional means without resorting to violence."
            </p>
          </div>
        </Fade>
      </div>
    </div>
  );
}