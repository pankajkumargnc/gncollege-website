// src/pages/StaffPage.jsx
// ✅ v6 uupm.cc Skill Applied:
// Commandment 3: LazyImg for all faculty photos
// Commandment 5: Contextual empty state with search CTA
// Commandment 7: Skeleton loading cards
// Commandment 2: Hover feedback on all interactive elements

import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { COLORS } from '../styles/colors';
import LazyImg from '../components/LazyImg';

const N = COLORS.navy || '#0f2347';
const G = COLORS.gold || '#f4a023';

// ── Commandment 7: Skeleton Card ──
function SkeletonCard() {
  return (
    <div style={{
      background: '#fff', borderRadius: 18, overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(15,35,71,0.07)', border: '1px solid #e2e8f0',
    }}>
      <div style={{ height: 4, background: '#e2e8f0' }} />
      <div style={{ padding: '24px 20px', textAlign: 'center' }}>
        <div style={{
          width: 100, height: 100, borderRadius: '50%', margin: '0 auto 14px',
          background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',
          backgroundSize: '200% 100%', animation: 'gnc-shimmer 1.4s ease-in-out infinite',
        }} />
        <div style={{
          height: 16, borderRadius: 8, width: '70%', margin: '0 auto 8px',
          background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',
          backgroundSize: '200% 100%', animation: 'gnc-shimmer 1.4s ease-in-out infinite',
        }} />
        <div style={{
          height: 12, borderRadius: 6, width: '50%', margin: '0 auto',
          background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',
          backgroundSize: '200% 100%', animation: 'gnc-shimmer 1.4s ease-in-out infinite',
        }} />
      </div>
    </div>
  );
}

export default function StaffPage({ faculties, headless, type: forcedType }) {
  const { staffType: urlType } = useParams(); 
  const staffType = forcedType || urlType || 'teaching-staff';
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const isTeaching = staffType === 'teaching-staff';
  const label      = isTeaching ? 'Teaching' : 'Non-Teaching';
  const isLoading  = !faculties;

  const filteredStaff = useMemo(() => (faculties || []).filter(f =>
    (f.staffType || 'Teaching') === label &&
    (f.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     f.dept?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     f.desig?.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [faculties, label, searchTerm]);

  // Group by department
  const grouped = useMemo(() => filteredStaff.reduce((acc, f) => {
    const key = f.dept || 'General';
    if (!acc[key]) acc[key] = [];
    acc[key].push(f);
    return acc;
  }, {}), [filteredStaff]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Premium Hero */}
      {!headless && (
        <div className="premium-hero">
          <div className="kinetic-bg" />
          <div className="hero-content-wrapper">
            <div className="hero-icon">{isTeaching ? '👨‍🏫' : '👥'}</div>
            <h1 className="anim-fade-in">{label} Staff</h1>
            <p className="anim-slide-up">
              Hon'ble members of the {label.toLowerCase()} fraternity dedicated to academic excellence at Guru Nanak College, Dhanbad
            </p>
          </div>
        </div>
      )}

      {/* ── Search ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: headless ? '0' : '40px 20px' }}>
        <div style={{ maxWidth: 500, margin: '25px auto 0', position: 'relative' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder={`Search by Name, Department, or Designation...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '14px 20px 14px 48px', borderRadius: '30px',
              border: '1.5px solid #e2e8f0', background: '#fff', color: N,
              fontSize: 'clamp(14px, 2vw, 15px)', fontFamily: "'Plus Jakarta Sans', sans-serif",
              outline: 'none', boxShadow: '0 10px 30px rgba(15,35,71,0.05)',
              transition: 'all 0.3s', boxSizing: 'border-box',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = G; e.currentTarget.style.boxShadow = `0 10px 40px ${N}15`; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(15,35,71,0.05)'; }}
          />
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '40px 20px' }}>

        {/* ── Commandment 7: Skeleton Loading ── */}
        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredStaff.length === 0 ? (
          /* ── Commandment 5: Contextual Empty State ── */
          <div style={{ textAlign: 'center', padding: 'clamp(40px,6vw,64px) 20px', background: '#fff', borderRadius: 20, border: '2px dashed #e2e8f0' }}>
            <div style={{ fontSize: 'clamp(40px,8vw,52px)', marginBottom: 16 }}>👨‍🏫</div>
            <h3 style={{ color: N, fontWeight: 800, margin: '0 0 8px', fontSize: 'clamp(16px,2.5vw,20px)' }}>
              Koi data nahi mila
            </h3>
            <p style={{ color: '#64748b', margin: '0 0 24px', fontSize: 'clamp(13px,1.8vw,15px)', lineHeight: 1.7, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
              {searchTerm
                ? `"${searchTerm}" ke liye koi result nahi. Search clear karein.`
                : `Admin Panel → Faculty & Staff → ${label} mein staff add karein`}
            </p>
            {searchTerm && (
              <button onClick={() => setSearchTerm('')}
                style={{ background: N, color: G, border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, minHeight: 44, fontSize: 'clamp(13px,1.5vw,15px)' }}>
                Clear Search
              </button>
            )}
          </div>
        ) : (
          Object.entries(grouped).sort(([a],[b]) => a.localeCompare(b)).map(([dept, members]) => (
            <div key={dept} style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{ background: `linear-gradient(135deg, ${N}, #1a3a7c)`, color: G, borderRadius: 10, padding: '6px 20px', fontWeight: 800, fontSize: 13 }}>
                  {dept}
                </div>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#0f346044,transparent)' }} />
                <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>{members.length} member{members.length > 1 ? 's' : ''}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                {members.map(staff => (
                  <div key={staff.id} style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 4px 20px rgba(15,35,71,0.07)', border: '1px solid #e2e8f0', transition: 'transform 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(15,35,71,0.13)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,35,71,0.07)'; }}
                  >
                    <div style={{ height: 4, background: `linear-gradient(90deg, ${N}, ${G})` }} />
                    <div style={{ padding: '24px 20px', textAlign: 'center' }}>
                      <div style={{ position: 'relative', display: 'inline-block', marginBottom: 14 }}>
                        {/* ── Commandment 3: LazyImg with fallback ── */}
                        <LazyImg
                          src={staff.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.name || 'Staff')}&background=0f2347&color=f4a023&size=120`}
                          alt={staff.name || 'Faculty member'}
                          style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${G}` }}
                        />
                        <div style={{ position: 'absolute', bottom: 2, right: 2, width: 18, height: 18, borderRadius: '50%', background: isTeaching ? '#10b981' : '#3b82f6', border: '2px solid #fff' }} />
                      </div>
                      <h3 style={{ margin: '0 0 4px', fontSize: 'clamp(14px, 2vw, 15.5px)', fontWeight: 800, color: N, lineHeight: 1.3 }}>{staff.name}</h3>
                      {staff.desig && <p style={{ margin: '0 0 4px', fontSize: 'clamp(12px, 1.6vw, 13px)', color: '#64748b', fontWeight: 600 }}>{staff.desig}</p>}
                      {staff.qual && <p style={{ margin: '0 0 8px', fontSize: 12, color: G, fontWeight: 700 }}>{staff.qual}</p>}
                      {staff.specialization && <p style={{ margin: '0 0 8px', fontSize: 12, color: '#94a3b8', lineHeight: 1.4 }}>{staff.specialization}</p>}
                      {staff.email && (
                        <a href={`mailto:${staff.email}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 12, color: N, textDecoration: 'none', background: '#f0f4ff', borderRadius: 20, padding: '4px 12px', minHeight: 44, fontWeight: 600, marginTop: 4, transition: 'background 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#dbeafe'}
                          onMouseLeave={e => e.currentTarget.style.background = '#f0f4ff'}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                          {staff.email}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
