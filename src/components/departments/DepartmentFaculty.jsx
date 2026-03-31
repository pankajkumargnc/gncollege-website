import { useState, useEffect, useRef } from 'react';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { NAVY, Fade, SectionLabel, EmptyBox, Spin } from './DepartmentUI';

const FALLBACK_IMG = '/images/college_photo.webp';

export const FacCard = ({ fac, color }) => {
  const [err, setErr] = useState(false);
  const isHod = fac.desig?.toLowerCase().includes('head');
  return (
    <div style={{
      background: '#fff', borderRadius: 18, overflow: 'hidden',
      border: `1.5px solid ${isHod ? color + '40' : '#f1f5f9'}`,
      boxShadow: isHod ? `0 4px 20px ${color}1a` : '0 2px 12px rgba(15,35,71,.06)',
      transition: 'transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease, border-color .3s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 14px 32px ${color}20`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = isHod ? `0 4px 20px ${color}1a` : '0 2px 12px rgba(15,35,71,.06)'; }}
    >
      {/* Photo */}
      <div style={{ padding: '16px 16px 0', background: `linear-gradient(160deg,${color}08,transparent)` }}>
        <div style={{ 
          position: 'relative', 
          paddingTop: '100%', 
          borderRadius: 14, 
          overflow: 'hidden', 
          border: `1.5px solid ${color}1a`,
          boxShadow: `0 4px 12px rgba(15,35,71,.04)`
        }}>
          <img
            src={err || !fac.imageUrl ? FALLBACK_IMG : fac.imageUrl}
            alt={fac.name}
            onError={() => setErr(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          />
          {isHod && (
            <div style={{
              position: 'absolute', top: 8, left: 8,
              background: color, color: '#fff',
              fontSize: 9, fontWeight: 800, padding: '2px 8px',
              borderRadius: 20, letterSpacing: '.8px', textTransform: 'uppercase',
              boxShadow: `0 3px 10px ${color}55`,
            }}>HOD</div>
          )}
        </div>
      </div>
      {/* Info */}
      <div style={{ padding: '14px 16px 18px' }}>
        <div style={{ fontWeight: 800, fontSize: 14, color: NAVY, marginBottom: 3, lineHeight: 1.3 }}>
          {fac.name || '—'}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 7 }}>{fac.desig || 'Faculty'}</div>
        {fac.qual && (
          <div style={{ fontSize: 11, color: '#64748b', background: `${color}0e`, border: `1px solid ${color}22`, borderRadius: 7, padding: '3px 8px', marginBottom: 5 }}>
            🎓 {fac.qual}
          </div>
        )}
        {fac.specialization && (
          <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.4, marginBottom: 4 }}>
            ✦ {fac.specialization}
          </div>
        )}
        {fac.email && (
          <a href={`mailto:${fac.email}`}
            style={{ display: 'block', fontSize: 10.5, color: '#94a3b8', marginTop: 7, textDecoration: 'none', wordBreak: 'break-all', transition: 'color .15s' }}
            onMouseEnter={e => e.currentTarget.style.color = color}
            onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
          >✉ {fac.email}</a>
        )}
      </div>
    </div>
  );
};

export const FacultySection = ({ keys = [], tabs, color }) => {
  const [map,    setMap]    = useState({});
  const [counts, setCounts] = useState({});
  const [active, setActive] = useState(tabs?.[0]?.key || keys[0] || '');
  const [loading, setLoading] = useState(true);
  const resolvedRef = useRef(new Set());

  useEffect(() => {
    if (!keys.length) { setLoading(false); return; }
    setLoading(true);
    resolvedRef.current = new Set();
    const localMap = {};
    const unsubs = [];

    const markResolved = (k) => {
      resolvedRef.current.add(k);
      if (resolvedRef.current.size >= keys.length) setLoading(false);
    };

    keys.forEach(k => {
      const sort = arr =>
        [...arr].sort((a, b) => {
          if (a.desig?.toLowerCase().includes('head')) return -1;
          if (b.desig?.toLowerCase().includes('head')) return 1;
          return (a.name || '').localeCompare(b.name || '');
        });

      const q = query(
        collection(db, 'faculties'),
        where('dept', '==', k),
        where('staffType', '==', 'Teaching')
      );
      const u = onSnapshot(q, snap => {
        localMap[k] = sort(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setMap({ ...localMap });
        setCounts(p => ({ ...p, [k]: localMap[k].length }));
        markResolved(k);
      }, () => {
        const q2 = query(collection(db, 'faculties'), where('dept', '==', k));
        const u2 = onSnapshot(q2, snap => {
          localMap[k] = sort(
            snap.docs.map(d => ({ id: d.id, ...d.data() }))
              .filter(f => (f.staffType || 'Teaching') === 'Teaching')
          );
          setMap({ ...localMap });
          setCounts(p => ({ ...p, [k]: localMap[k].length }));
          markResolved(k);
        }, () => markResolved(k));
        unsubs.push(u2);
      });
      unsubs.push(u);
    });

    return () => unsubs.forEach(u => u());
  }, [keys.join(',')]);

  const total = Object.values(counts).reduce((s, v) => s + v, 0);
  const list  = map[active] || [];

  return (
    <div>
      <Fade>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
          <div>
            <SectionLabel txt="Faculty Roster" color={color} />
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(20px,2.8vw,28px)', fontWeight: 800, color: NAVY, margin: '0 0 4px', letterSpacing: '-.4px' }}>
              Meet the Faculty
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 12.5, margin: 0 }}>Expert mentors aur subject matter experts se milen</p>
          </div>
          {total > 0 && (
            <div style={{ background: `linear-gradient(135deg,${NAVY},#1a3a7c)`, color: '#fff', padding: '7px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
              {total} Member{total !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </Fade>

      <div style={{ height: 3, borderRadius: 99, background: `linear-gradient(90deg,${color},transparent)`, margin: '16px 0 28px' }} />

      {tabs && tabs.length > 1 && (
        <Fade delay={0.06}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, marginBottom: 32, borderBottom: '2px solid #f1f5f9' }}>
            {tabs.map(tab => {
              const on = active === tab.key;
              return (
                <button key={tab.key} onClick={() => setActive(tab.key)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '11px 20px', border: 'none', fontFamily: 'inherit',
                    fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
                    color: on ? '#fff' : '#64748b',
                    background: on ? `linear-gradient(135deg,${NAVY},#1a3a7c)` : 'transparent',
                    borderRadius: '8px 8px 0 0', marginBottom: -2,
                    borderBottom: '3px solid transparent',
                    transition: 'all .25s ease', minHeight: '44px',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{tab.icon}</span>
                  {tab.label}
                  {(counts[tab.key] || 0) > 0 && (
                    <span style={{
                      background: on ? 'rgba(255,255,255,.22)' : '#f1f5f9',
                      color: on ? '#fff' : '#64748b',
                      fontSize: 11, fontWeight: 800, padding: '1px 7px', borderRadius: 10,
                    }}>
                      {counts[tab.key]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Fade>
      )}

      {loading ? <Spin color={color} /> : list.length === 0 ? (
        <EmptyBox icon="👨‍🏫" msg="Faculty data abhi available nahi"
          sub={`Iss department mein abhi koi faculty member listed nahi hai.`}
          color={color} />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(188px,1fr))', gap: 18 }}>
          {list.map((fac, i) => (
            <Fade key={fac.id} delay={i * 0.05} y={16}>
              <FacCard fac={fac} color={color} />
            </Fade>
          ))}
        </div>
      )}
    </div>
  );
};
