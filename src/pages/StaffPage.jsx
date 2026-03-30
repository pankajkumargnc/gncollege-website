// src/pages/StaffPage.jsx
// ✅ BUG FIX: f.type → f.staffType (AdminPanel 'staffType' save karta hai, 'type' nahi)
// ✅ ENHANCED: Department grouping, qualification, email, specialization show hoti hai

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { COLORS } from '../styles/colors';

const N = COLORS.navy || '#0f2347';
const G = COLORS.gold || '#f4a023';

export default function StaffPage({ faculties, headless, type: forcedType }) {
  const { staffType: urlType } = useParams(); 
  const staffType = forcedType || urlType || 'teaching-staff';
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // ✅ FIX: AdminPanel 'staffType' field use karta hai — 'Teaching' ya 'Non-Teaching'
  const isTeaching = staffType === 'teaching-staff';
  const label      = isTeaching ? 'Teaching' : 'Non-Teaching';

  const filteredStaff = (faculties || []).filter(f =>
    (f.staffType || 'Teaching') === label &&
    (f.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     f.dept?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     f.desig?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group by department
  const grouped = filteredStaff.reduce((acc, f) => {
    const key = f.dept || 'General';
    if (!acc[key]) acc[key] = [];
    acc[key].push(f);
    return acc;
  }, {});

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Hero */}
      {!headless && (
      <div style={{ background: `linear-gradient(135deg, ${N} 0%, #1a3a7c 100%)`, padding: '70px 20px 50px', textAlign: 'center', color: '#fff' }}>
        <div style={{ fontSize: 48, marginBottom: 14 }}>{isTeaching ? '🎓' : '🏢'}</div>
        <h1 style={{ fontSize: 'clamp(28px,5vw,42px)', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.5px' }}>
          {label} Staff
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: 15, margin: 0, textAlign: 'center' }}>
          Guru Nanak College, Dhanbad
        </p>
      </div>
      )}

      {/* ── Content ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: headless ? '0' : '40px 20px' }}>
        <div style={{ maxWidth: 500, margin: '25px auto 0', position: 'relative' }}>
          <span style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>🔍</span>
          <input
            type="text"
            placeholder={`Search by Name, Department, or Designation...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 20px 14px 45px',
              borderRadius: '30px',
              border: '2px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: '15px',
              fontFamily: "'Inter', sans-serif",
              outline: 'none',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.border = `2px solid ${G}`; }}
            onBlur={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.border = '2px solid rgba(255,255,255,0.2)'; }}
          />
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '40px 20px' }}>
        {filteredStaff.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: 20, border: '2px dashed #e2e8f0' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>👨‍🏫</div>
            <h3 style={{ color: N, fontWeight: 800, margin: '0 0 8px' }}>Koi data nahi mila</h3>
            <p style={{ color: '#64748b', margin: 0 }}>
              Admin Panel → Faculty &amp; Staff → <strong>{label}</strong> mein staff add karein
            </p>
          </div>
        ) : (
          Object.entries(grouped).sort(([a],[b]) => a.localeCompare(b)).map(([dept, members]) => (
            <div key={dept} style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{ background: `linear-gradient(135deg, ${N}, #1a3a7c)`, color: G, borderRadius: 10, padding: '6px 20px', fontWeight: 800, fontSize: 13 }}>
                  {isTeaching ? '📚' : '🏢'} {dept}
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
                        <img
                          src={staff.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.name || 'Staff')}&background=0f2347&color=f4a023&size=120`}
                          alt={staff.name}
                          style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${G}` }}
                          onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.name || 'S')}&background=0f2347&color=f4a023&size=120`; }}
                        />
                        <div style={{ position: 'absolute', bottom: 2, right: 2, width: 18, height: 18, borderRadius: '50%', background: isTeaching ? '#10b981' : '#3b82f6', border: '2px solid #fff' }} />
                      </div>
                      <h3 style={{ margin: '0 0 4px', fontSize: 15.5, fontWeight: 800, color: N, lineHeight: 1.3 }}>{staff.name}</h3>
                      {staff.desig && <p style={{ margin: '0 0 4px', fontSize: 13, color: '#64748b', fontWeight: 600 }}>{staff.desig}</p>}
                      {staff.qual && <p style={{ margin: '0 0 8px', fontSize: 12, color: G, fontWeight: 700 }}>🎓 {staff.qual}</p>}
                      {staff.specialization && <p style={{ margin: '0 0 8px', fontSize: 12, color: '#94a3b8', lineHeight: 1.4 }}>{staff.specialization}</p>}
                      {staff.email && (
                        <a href={`mailto:${staff.email}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 12, color: N, textDecoration: 'none', background: '#f0f4ff', borderRadius: 20, padding: '4px 12px', minHeight: 44, fontWeight: 600, marginTop: 4 }}>
                          ✉️ {staff.email}
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
