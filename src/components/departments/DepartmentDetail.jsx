import { Fade, Pill, SectionLabel, SectionHead, EmptyBox, NAVY } from './DepartmentUI';
import { FacultySection } from './DepartmentFaculty';
import { SubjectGrid } from './SubjectGrid';

export const DepartmentDetail = ({ d, meta, activeSem, setSem, setPreviewPdf, deptSlug, subSlug }) => {
  const C = meta.color;
  const curriculum = d.curriculum || {};
  const semKeys = Object.keys(curriculum);
  const feeRows = d.feeStructure || [];
  const achievements = d.achievements || [];
  const reports = d.programReports || [];
  const highlights = d.highlights || [];
  const facilities = d.facilities || [];
  // Use subSlug for faculty filtering if provided, otherwise fallback to meta/short
  const facultyKeys = subSlug ? [subSlug.charAt(0).toUpperCase() + subSlug.slice(1)] : (meta.facultyKeys || [meta.short]);

  const isStreamOverview = !subSlug && meta.subjects;

  return (
    <>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        {/* If we're on a faculty/stream page without a specific subject, show the faculty hub and STOP */}
        {isStreamOverview && (
          <>
            <div style={{ padding: 'clamp(48px,6vw,64px) 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 60, alignItems: 'center' }}>
              <Fade>
                <SectionLabel txt={`About the Faculty`} color={C} />
                <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 900, color: NAVY, margin: '0 0 16px', letterSpacing: '-1px' }}>
                  {meta.fullName || meta.short} <span style={{ color: C }}>Overview</span>
                </h2>
                <p style={{ color: '#64748b', lineHeight: 1.9, fontSize: 16, margin: 0 }}>
                  {d.about || `The ${meta.short} Faculty at GNC College is a vibrant academic community dedicated to critical inquiry, creative expression, and social understanding. We house multiple specialized departments that prepare students for leadership, research, and professional excellence.`}
                </p>
                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                   <div style={{ background: `${C}08`, border: `1px solid ${C}1e`, borderRadius: 12, padding: '12px 18px', textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 900, color: NAVY }}>{meta.subjects?.length || '6+'}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C, textTransform: 'uppercase' }}>Subjects</div>
                   </div>
                   <div style={{ background: `${C}08`, border: `1px solid ${C}1e`, borderRadius: 12, padding: '12px 18px', textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 900, color: NAVY }}>PhD/PF</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C, textTransform: 'uppercase' }}>Expertise</div>
                   </div>
                </div>
              </Fade>
              <Fade delay={0.15}>
                 <div style={{ position: 'relative' }}>
                    <div style={{ width: '100%', height: 300, background: `linear-gradient(135deg, ${C}22, ${C}06)`, borderRadius: 30, overflow: 'hidden' }}>
                       <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 80, opacity: 0.3 }}>🎓</div>
                    </div>
                    <div style={{ position: 'absolute', bottom: -20, right: -20, background: '#fff', padding: '16px 20px', borderRadius: 20, boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                       <div style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>Academic Portal</div>
                       <div style={{ fontSize: 12, color: '#64748b' }}>Select your subject below</div>
                    </div>
                 </div>
              </Fade>
            </div>
            <SubjectGrid deptSlug={deptSlug} color={C} fallbackSubjects={meta.subjects} />
          </>
        )}
        
        {!isStreamOverview && (
          <>
            {/* About + Vision/Mission */}
            {(d.about || d.vision || d.mission) && (
              <div style={{ padding: 'clamp(48px,6vw,64px) 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40 }}>
                {d.about && (
                  <Fade>
                    <SectionLabel txt="About the Department" color={C} />
                    <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 800, color: NAVY, margin: '0 0 14px', letterSpacing: '-.4px' }}>
                      About <span style={{ color: C }}>{subSlug ? (subSlug.charAt(0).toUpperCase() + subSlug.slice(1)) : meta.short} Department</span>
                    </h2>
                    <p style={{ color: '#64748b', lineHeight: 1.9, fontSize: 15, margin: 0 }}>{d.about}</p>
                  </Fade>
                )}
                {(d.vision || d.mission) && (
                  <Fade delay={0.1}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {d.vision && (
                        <div style={{ background: `${C}08`, border: `1.5px solid ${C}1e`, borderRadius: 16, padding: '20px 22px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 9, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎯</div>
                            <span style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>Vision</span>
                          </div>
                          <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: 13.5, margin: 0 }}>{d.vision}</p>
                        </div>
                      )}
                      {d.mission && (
                        <div style={{ background: '#fef9ec', border: '1.5px solid #fed7aa', borderRadius: 16, padding: '20px 22px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 9, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🚀</div>
                            <span style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>Mission</span>
                          </div>
                          <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: 13.5, margin: 0 }}>{d.mission}</p>
                        </div>
                      )}
                    </div>
                  </Fade>
                )}
              </div>
            )}

            {/* Highlights */}
            {highlights.length > 0 && (
              <div style={{ padding: 'clamp(48px,6vw,64px) 0 0' }}>
                <SectionHead label="Highlights" title="Academic Excellence" color={C} />
                <div className="dp-g3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
                  {highlights.map((h, i) => (
                    <Fade key={i} delay={i * .06} y={18}>
                      <div className="dp-hl">
                        <div style={{ width: 42, height: 42, borderRadius: 12, background: `${C}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 12 }}>{h.icon}</div>
                        <div style={{ fontWeight: 700, color: NAVY, fontSize: 13.5, marginBottom: 6, lineHeight: 1.4 }}>{h.title}</div>
                        <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.65 }}>{h.desc}</div>
                      </div>
                    </Fade>
                  ))}
                </div>
              </div>
            )}

            {/* Facilities */}
            {facilities.length > 0 && (
              <div style={{ padding: 'clamp(48px,6vw,64px) 0 0' }}>
                <SectionHead label="Infrastructure" title="Modern Facilities" color={C} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14 }}>
                  {facilities.map((f, i) => (
                    <Fade key={i} delay={i * .07} y={16}>
                      <div style={{ display: 'flex', gap: 14, background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: 14, padding: '18px 20px', alignItems: 'flex-start', transition: 'all .2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = `${C}38`; e.currentTarget.style.boxShadow = `0 6px 18px ${C}0c`; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${C}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{f.icon}</div>
                        <div>
                          <div style={{ fontWeight: 700, color: NAVY, fontSize: 14, marginBottom: 4 }}>{f.name}</div>
                          <div style={{ color: '#64748b', fontSize: 12.5, lineHeight: 1.6 }}>{f.desc}</div>
                        </div>
                      </div>
                    </Fade>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum */}
            {semKeys.length > 0 && (
              <div id="curriculum" style={{ padding: 'clamp(48px,6vw,64px) 0 0' }}>
                <SectionHead label="Study Plan" title="Semester Curriculum" color={C} />
                <Fade delay={0.06}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
                    {semKeys.map(k => (
                      <button key={k} className={`dp-sem${activeSem === k ? ' on' : ''}`} onClick={() => setSem(k)}>{k}</button>
                    ))}
                  </div>
                </Fade>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 10 }}>
                  {(curriculum[activeSem] || []).map((subj, i) => (
                    <Fade key={i} delay={i * .04} y={14}>
                      <div className="dp-subj">
                        <div style={{ width: 27, height: 27, borderRadius: 7, background: `linear-gradient(135deg,${NAVY},#1a3a7c)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#fff' }}>
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <span style={{ fontSize: 13.5, color: '#334155', fontWeight: 500, lineHeight: 1.4 }}>{subj}</span>
                      </div>
                    </Fade>
                  ))}
                </div>
              </div>
            )}

            {/* Faculty */}
            <div id="faculty" style={{ padding: 'clamp(48px,6vw,64px) 0 0' }}>
              <FacultySection keys={facultyKeys} tabs={meta.tabs} color={C} />
            </div>

            {/* Fees */}
            <div id="fees" style={{ padding: 'clamp(48px,6vw,64px) 0 0' }}>
              <SectionHead label="Education Investment" title="Fee Structure" color={C} />
              {feeRows.length === 0 ? (
                <Fade><EmptyBox icon="💰" msg="No fee data available" sub="Details will be updated soon." color={C} /></Fade>
              ) : (
                <Fade delay={0.06}>
                  <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(15,35,71,.06)' }}>
                    <div className="dp-fee-hd">
                      {['Fee Category', 'Amount (₹)', 'Notes'].map(h => (
                        <div key={h} className={h === 'Notes' ? 'dp-fee-note' : ''} style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,.75)', letterSpacing: '.5px', textTransform: 'uppercase' }}>{h}</div>
                      ))}
                    </div>
                    {feeRows.map((row, i) => (
                      <div key={i} className="dp-fee-row">
                        <div style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>{row.category}</div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: C }}>₹ {Number(row.amount).toLocaleString('en-IN')}</div>
                        <div className="dp-fee-note" style={{ fontSize: 13, color: '#64748b' }}>{row.note || '—'}</div>
                      </div>
                    ))}
                    {feeRows.length > 1 && (
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', padding: '14px 20px', background: `${C}0a`, borderTop: `2px solid ${C}1e` }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>Total Estimate</div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: C }}>
                          ₹ {feeRows.reduce((s, r) => s + (Number(r.amount) || 0), 0).toLocaleString('en-IN')}
                        </div>
                        <div />
                      </div>
                    )}
                  </div>
                </Fade>
              )}
            </div>

            {/* Reports */}
            <div style={{ padding: 'clamp(48px,6vw,64px) 0 0' }}>
              <SectionHead label="Resources" title="Activity & Program Reports" color={C} />
              {reports.length === 0 ? (
                <Fade><EmptyBox icon="📋" msg="No reports listed" sub="Departmental activity reports will appear here." color={C} /></Fade>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
                  {reports.map((rep, i) => (
                    <Fade key={i} delay={i * .06} y={14}>
                      <div className="dp-rep" onClick={() => {
                        const pdfLink = rep.pdfUrl || rep.link;
                        if (pdfLink) setPreviewPdf({ url: pdfLink, title: rep.title || 'Report' });
                      }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>📄</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 700, color: NAVY, fontSize: 13.5, marginBottom: 3, lineHeight: 1.3 }}>{rep.title}</div>
                          <div style={{ fontSize: 12, color: '#94a3b8' }}>{rep.year || ''}</div>
                        </div>
                        <div style={{ background: `${C}12`, border: `1.5px solid ${C}28`, color: C, fontSize: 11.5, fontWeight: 800, padding: '5px 12px', borderRadius: 8, flexShrink: 0 }}>
                          VIEW →
                        </div>
                      </div>
                    </Fade>
                  ))}
                </div>
              )}
            </div>

            {/* Achievements */}
            <div style={{ padding: 'clamp(48px,6vw,64px) 0 0' }}>
              <SectionHead label="Milestones" title="Our Achievements" color={C} />
              {achievements.length === 0 ? (
                <Fade><EmptyBox icon="🏆" msg="No achievements added" sub="Student and faculty success stories." color={C} /></Fade>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 12 }}>
                  {achievements.map((a, i) => (
                    <Fade key={i} delay={i * .05} y={14}>
                      <div className="dp-ach">
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: `linear-gradient(135deg,${C},${C}88)`, flexShrink: 0, marginTop: 7, boxShadow: `0 0 6px ${C}55` }} />
                        <span style={{ color: '#475569', fontSize: 13.5, lineHeight: 1.65 }}>{a}</span>
                      </div>
                    </Fade>
                  ))}
                </div>
              )}
            </div>

            {/* HOD Message */}
            <div style={{ padding: 'clamp(48px,6vw,64px) 0 clamp(64px,8vw,80px)' }}>
              <SectionHead label="Leadership" title="HOD's Desk" color={C} />
              <Fade delay={0.08}>
                <div className="dp-g2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
                  <div style={{ background: `linear-gradient(145deg,${C}0a,${C}04)`, border: `1.5px solid ${C}1e`, borderRadius: 20, padding: '28px 26px' }}>
                    <div style={{ width: 68, height: 68, borderRadius: 16, overflow: 'hidden', background: `${C}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, marginBottom: 16, border: `2px solid ${C}28` }}>
                      {d.hod?.imageUrl
                        ? <img src={d.hod.imageUrl} alt={d.hod?.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                        : '👨‍🏫'}
                    </div>
                    <div style={{ fontWeight: 800, color: NAVY, fontSize: 17, marginBottom: 3 }}>{d.hod?.name || 'Prof. Name'}</div>
                    <div style={{ color: C, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{d.hod?.desig || `HOD, ${meta.short}`}</div>
                    <div style={{ borderTop: `1px solid ${C}1e`, paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 9 }}>
                      {d.hod?.email && <a href={`mailto:${d.hod.email}`} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#475569', fontSize: 13, textDecoration: 'none' }}><span style={{ color: C }}>✉</span>{d.hod.email}</a>}
                      {d.hod?.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#475569', fontSize: 13 }}><span style={{ color: C }}>📞</span>{d.hod.phone}</div>}
                    </div>
                  </div>
                  <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: 20, padding: '28px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: 48, color: `${C}35`, fontFamily: 'Georgia,serif', lineHeight: 1, marginBottom: 12 }}>"</div>
                    <p style={{ color: '#475569', lineHeight: 1.9, fontSize: 15, margin: '0 0 14px', fontStyle: 'italic' }}>
                      {d.hod?.message || 'Academic success starts with a dedicated environment and clear guidance.'}
                    </p>
                    <div style={{ fontSize: 48, color: `${C}35`, fontFamily: 'Georgia,serif', lineHeight: 1, textAlign: 'right' }}>"</div>
                  </div>
                </div>
              </Fade>
            </div>
          </>
        )}
      </div>
    </>
  );
};
