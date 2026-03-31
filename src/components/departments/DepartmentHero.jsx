import { NAVY, Pill } from './DepartmentUI';

export const DepartmentHero = ({ slug, meta, d, C, feeRows, facultyKeys, subSlug }) => {
  // A "Subject" view is either a sub-page (e.g. humanities/hindi) 
  // OR a standalone department (BCA, BBA, etc.)
  const isFacultyHub = !subSlug && (slug === 'humanities' || slug === 'social-science');
  const isSubject = !isFacultyHub;
  
  const parentName = meta.fullName || meta.short;
  const subjectName = subSlug ? (subSlug.charAt(0).toUpperCase() + subSlug.slice(1)) : (d.fullName || meta.fullName || d.name || meta.short);

  return (
    <div style={{ background: meta.heroBg, borderBottom: `1px solid ${C}1a`, padding: 'clamp(56px,8vw,80px) clamp(16px,3vw,24px) clamp(44px,6vw,64px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -80, right: -70, width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle,${C}16 0%,transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -50, left: '8%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(244,160,35,.07) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 40, alignItems: 'center' }}>
          {/* Hero Left Content */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${C}16`, color: C, fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 20, marginBottom: 18, letterSpacing: '.5px' }}>
              {(subSlug || isFacultyHub) ? `📚 ${parentName} Faculty` : `${meta.icon} Academic Excellence`}
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(28px,4.5vw,52px)', fontWeight: 800, color: NAVY, lineHeight: 1.06, letterSpacing: '-1.5px', margin: '0 0 14px' }}>
              {subSlug ? `${subjectName} Department` : subjectName}
            </h1>
            {d.tagline ? (
              <p style={{ fontSize: 15.5, color: '#64748b', lineHeight: 1.8, maxWidth: 480, margin: '0 0 22px', fontWeight: 400 }}>
                {d.tagline}
              </p>
            ) : subSlug ? (
              <p style={{ fontSize: 15.5, color: '#64748b', lineHeight: 1.8, maxWidth: 480, margin: '0 0 22px', fontWeight: 400 }}>
                Comprehensive curriculum and dedicated faculty for {subjectName} under the {parentName} Faculty.
              </p>
            ) : null}
            
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={() => document.getElementById(isFacultyHub ? 'subjects-grid' : 'faculty')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                style={{ background: `linear-gradient(135deg,${NAVY},#1a3a7c)`, color: '#fff', padding: '11px 24px', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: 13.5, boxShadow: `0 4px 16px ${NAVY}28`, display: 'inline-flex', alignItems: 'center', gap: 7, cursor: 'pointer', fontFamily: 'inherit', minHeight: '44px', transition: 'transform 0.25s ease' }}
              >
                {isFacultyHub ? '📖 View Subjects' : '👨‍🏫 View Faculty'}
              </button>
              {(feeRows.length > 0 || !isFacultyHub) && (
                <button
                  onClick={() => document.getElementById('fees')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  style={{ background: '#fff', border: `1.5px solid ${C}`, color: C, padding: '11px 24px', borderRadius: 10, fontWeight: 700, fontSize: 13.5, display: 'inline-flex', alignItems: 'center', gap: 7, cursor: 'pointer', fontFamily: 'inherit', minHeight: '44px' }}
                >
                  💰 Fee Structure
                </button>
              )}
            </div>
          </div>

          {/* Hero Right Card Info */}
          <div style={{ background: '#fff', borderRadius: 22, padding: 26, boxShadow: `0 8px 36px ${C}16`, border: `1.5px solid ${C}1e`, position: 'relative', overflow: 'hidden' }}>
            {isFacultyHub ? (
              <>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: `linear-gradient(135deg, ${C}10, transparent)`, borderRadius: '0 0 0 100%' }} />
                <div style={{ marginBottom: 20, paddingBottom: 18, borderBottom: '1px solid #f1f5f9' }}>
                   <div style={{ fontSize: 10, color: C, fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 6 }}>Academic Foundation</div>
                   <div style={{ fontWeight: 900, color: NAVY, fontSize: 18 }}>Core Pillars of <span style={{ color: C }}>{meta.short}</span></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                   {[
                     { l: 'Research', v: 'Impactful', icon: '🔬' },
                     { l: 'Learning', v: 'Creativity', icon: '🎨' },
                     { l: 'Success', v: 'Holistic', icon: '🌟' },
                     { l: 'Future', v: 'Career Ready', icon: '🚀' }
                   ].map((p, i) => (
                     <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, background: `${C}0a`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{p.icon}</div>
                        <div>
                           <div style={{ fontSize: 12, fontWeight: 800, color: NAVY, lineHeight: 1.1 }}>{p.v}</div>
                           <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginTop: 2 }}>{p.l}</div>
                        </div>
                     </div>
                   ))}
                </div>
                <div style={{ marginTop: 20, padding: '12px 14px', background: `${C}08`, borderRadius: 12, border: `1px solid ${C}12`, fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
                   Empowering students through social understanding and behavioral sciences.
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ width: 54, height: 54, borderRadius: 14, background: `${C}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0, overflow: 'hidden' }}>
                    {d.hod?.imageUrl ? <img src={d.hod.imageUrl} alt={d.hod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '👨‍🏫'}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, letterSpacing: '.6px', textTransform: 'uppercase', marginBottom: 3 }}>Head of Department</div>
                    <div style={{ fontWeight: 800, color: NAVY, fontSize: 15 }}>{d.hod?.name || 'TBA'}</div>
                    {d.hod?.qual && <div style={{ fontSize: 12, color: C, fontWeight: 600, marginTop: 2 }}>{d.hod.qual}</div>}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  {(d.stats || [
                    { l: 'Programme', v: 'UG Degree', icon: '🎓' },
                    { l: 'Duration', v: '3 Years', icon: '⏳' },
                    { l: 'BBMKU', v: 'University', icon: '🏛️' },
                    { l: 'Status', v: 'Approved', icon: '✅' }
                  ]).slice(0, 4).map((s, i) => (
                    <div key={i} style={{ padding: '14px 12px', borderRight: i % 2 === 0 ? '1px solid #f1f5f9' : 'none', borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none', textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: NAVY, lineHeight: 1 }}>{s.value || s.v}</div>
                      <div style={{ fontSize: 11, color: C, fontWeight: 700, marginTop: 3 }}>{s.label || s.l}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
