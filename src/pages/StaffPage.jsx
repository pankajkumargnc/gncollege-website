import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../styles/colors';

export default function StaffPage({ faculties, staffType }) {
  const [search, setSearch] = useState('');
  const [selDept, setSelDept] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [staffType]);

  // Data Filter Logic
  const filteredStaff = useMemo(() => {
    return (faculties || []).filter(f => {
      const type = f.staffType || 'Teaching'; // Default to Teaching for older data
      if (type !== staffType) return false;
      if (selDept !== 'All' && f.dept !== selDept) return false;
      if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [faculties, staffType, selDept, search]);

  // Extract unique departments for the current staff type
  const departments = useMemo(() => {
    const s = new Set((faculties || []).filter(f => (f.staffType || 'Teaching') === staffType).map(f => f.dept));
    return ['All', ...Array.from(s).sort()];
  }, [faculties, staffType]);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '80px' }}>
      
      {/* Premium Hero Section */}
      <header style={{ 
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, #1a365d 100%)`, 
        padding: '80px 20px 60px', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.05 }}></div>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <h1 style={{ color: '#fff', fontSize: '42px', fontWeight: 900, margin: '0 0 15px' }}>{staffType} Staff Directory</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Meet our dedicated and highly qualified {staffType.toLowerCase()} members who shape the future of Guru Nanak College.
          </p>
        </div>
      </header>

      {/* Filter Section */}
      <div style={{ maxWidth: 1300, margin: '-30px auto 40px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(15,35,71,0.08)', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', border: '1px solid #e2e8f0' }}>
          
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
            <input 
              type="text" 
              placeholder={`Search ${staffType.toLowerCase()} by name...`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 15px 12px 40px', borderRadius: '10px', border: '2px solid #e2e8f0', outline: 'none', fontSize: '14px', fontWeight: 600, background: '#f8fafc', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Department:</span>
            {departments.map(d => (
              <button 
                key={d}
                onClick={() => setSelDept(d)}
                style={{ 
                  padding: '8px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                  background: selDept === d ? COLORS.navy : '#f1f5f9',
                  color: selDept === d ? '#fff' : '#475569',
                  border: `1px solid ${selDept === d ? COLORS.navy : '#cbd5e1'}`
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 20px' }}>
        {filteredStaff.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>👨‍🏫</div>
            <h3 style={{ color: COLORS.navy, margin: '0 0 10px' }}>No Staff Found</h3>
            <p style={{ color: '#64748b' }}>Try adjusting your search or department filter.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {filteredStaff.map(f => (
              <div key={f.id} style={{ 
                background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.04)', 
                border: '1px solid #edf2f7', transition: 'transform 0.3s ease, box-shadow 0.3s ease', display: 'flex', flexDirection: 'column' 
              }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(15,35,71,0.1)'; e.currentTarget.style.borderColor = COLORS.gold; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#edf2f7'; }}
              >
                <div style={{ padding: '25px 20px 0', textAlign: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 15, right: 15, background: '#f0fdf4', color: '#166534', fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '50px', border: '1px solid #bbf7d0' }}>
                    {f.dept}
                  </div>
                  <img 
                    src={f.imageUrl || '/images/college_photo.jpg'} 
                    alt={f.name} 
                    style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: `4px solid #fff`, boxShadow: '0 10px 20px rgba(0,0,0,0.1)', margin: '0 auto' }} 
                  />
                </div>
                <div style={{ padding: '20px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: COLORS.navy, margin: '0 0 5px' }}>{f.name}</h3>
                  <div style={{ fontSize: '13px', color: COLORS.gold, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '15px' }}>
                    {f.desig}
                  </div>
                  <div style={{ marginTop: 'auto', background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Qualification</div>
                    <div style={{ fontSize: '13px', color: COLORS.navy, fontWeight: 600 }}>{f.qual}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}