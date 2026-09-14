// src/pages/AlumniWall.jsx — Pinterest-style Alumni Success Wall using react-masonry-css
import React, { useState, useEffect, useMemo } from 'react';
import Masonry from 'react-masonry-css';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { resolveUrl } from '../utils/resolver';
import { COLORS } from '../styles/colors';
import { GraduationCap, Briefcase, Building2, Quote, Search, Sparkles, Filter, Award } from 'lucide-react';

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

const BREAKPOINTS = {
  default: 3,
  1100: 2,
  700: 1
};

function AlumniCardItem({ a }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = a.photo && !photoFailed;

  return (
    <div className="alumni-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        {showPhoto ? (
          <img
            src={resolveUrl(a.photo)}
            alt={a.name}
            style={{
              width: 58,
              height: 58,
              borderRadius: '50%',
              objectFit: 'cover',
              border: `2px solid ${GOLD}`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          <div style={{
            width: 58,
            height: 58,
            borderRadius: '50%',
            background: `${NAVY}15`,
            color: NAVY,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            fontWeight: 900
          }}>
            🎓
          </div>
        )}

        <div>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: NAVY }}>
            {a.name}
          </h3>
          <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 2 }}>
            {a.role} {a.company ? `@ ${a.company}` : ''}
          </div>
        </div>
      </div>

      {/* Testimonial Quote */}
      {a.testimonial && (
        <div style={{
          background: '#f8fafc',
          borderLeft: `3px solid ${GOLD}`,
          padding: '12px 14px',
          borderRadius: '0 10px 10px 0',
          marginBottom: 16,
          position: 'relative'
        }}>
          <Quote size={16} color={GOLD} style={{ opacity: 0.6, marginBottom: 4 }} />
          <p style={{ margin: 0, fontSize: 13, color: '#334155', fontStyle: 'italic', lineHeight: 1.6 }}>
            "{a.testimonial}"
          </p>
        </div>
      )}

      {/* Badges / Meta Info */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        {a.department && (
          <span style={{
            background: `${NAVY}08`,
            color: NAVY,
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 6
          }}>
            🏛️ {a.department}
          </span>
        )}
        {a.batch && (
          <span style={{
            background: '#f1f5f9',
            color: '#64748b',
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 6
          }}>
            Batch {a.batch}
          </span>
        )}
        {a.package && (
          <span style={{
            background: '#dcfce7',
            color: '#15803d',
            fontSize: 11,
            fontWeight: 800,
            padding: '4px 10px',
            borderRadius: 6
          }}>
            💰 {a.package}
          </span>
        )}
      </div>
    </div>
  );
}

export default function AlumniWall() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    const q = query(collection(db, 'placements'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setAlumni(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, () => setLoading(false));

    return () => unsub();
  }, []);

  const departments = useMemo(() => {
    return ['All', ...new Set(alumni.map(a => a.department).filter(Boolean))];
  }, [alumni]);

  const filteredAlumni = useMemo(() => {
    return alumni.filter(a => {
      const matchSearch = !search ||
        a.name?.toLowerCase().includes(search.toLowerCase()) ||
        a.company?.toLowerCase().includes(search.toLowerCase()) ||
        a.role?.toLowerCase().includes(search.toLowerCase());
      const matchDept = selectedDept === 'All' || a.department === selectedDept;
      return matchSearch && matchDept;
    });
  }, [alumni, search, selectedDept]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        .alumni-masonry-grid {
          display: flex;
          margin-left: -24px;
          width: auto;
        }
        .alumni-masonry-column {
          padding-left: 24px;
          background-clip: padding-box;
        }
        .alumni-card {
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 10px 30px rgba(15,35,71,0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .alumni-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(15,35,71,0.12);
          border-color: ${GOLD};
        }
      `}</style>

      {/* Hero Header */}
      <header className="premium-hero">
        <div className="kinetic-bg" />
        <div className="hero-content-wrapper">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(244,160,35,0.2)',
            color: GOLD,
            padding: '5px 16px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1,
            marginBottom: 12
          }}>
            <Sparkles size={14} /> GURU NANAK COLLEGE ALUMNI ASSOCIATION
          </div>
          <h1>Alumni Success Wall</h1>
          <p>Celebrating over 45,000 alumni shaping industries, academia, governance, and public life globally.</p>
        </div>
      </header>

      {/* Main Content Area */}
      <div style={{ maxWidth: 1200, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        {/* Search & Filter Toolbar */}
        <div style={{
          background: '#ffffff',
          borderRadius: 20,
          padding: '20px 24px',
          boxShadow: '0 15px 35px rgba(15,35,71,0.06)',
          border: '1px solid #e2e8f0',
          marginBottom: 36,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16
        }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 280px' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by student name, company, or role..."
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                borderRadius: 12,
                border: '1.5px solid #e2e8f0',
                background: '#f8fafc',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Department Chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {departments.slice(0, 6).map(dept => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                style={{
                  background: selectedDept === dept ? NAVY : '#f1f5f9',
                  color: selectedDept === dept ? '#ffffff' : '#64748b',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Feed */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>🎓</div>
            <div style={{ fontWeight: 700 }}>Loading Alumni Success Stories...</div>
          </div>
        ) : filteredAlumni.length === 0 ? (
          <div style={{
            textAlign: 'center',
            background: '#ffffff',
            padding: '60px 20px',
            borderRadius: 20,
            border: '2px dashed #e2e8f0'
          }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🌟</div>
            <h3 style={{ margin: '0 0 8px', color: NAVY, fontWeight: 800 }}>No Alumni Records Found</h3>
            <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Try clearing filters or search terms.</p>
          </div>
        ) : (
          <Masonry
            breakpointCols={BREAKPOINTS}
            className="alumni-masonry-grid"
            columnClassName="alumni-masonry-column"
          >
            {filteredAlumni.map((a) => (
              <AlumniCardItem key={a.id} a={a} />
            ))}
          </Masonry>
        )}
      </div>
    </div>
  );
}
