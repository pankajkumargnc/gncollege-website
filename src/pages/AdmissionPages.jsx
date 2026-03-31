// src/pages/AdmissionPages.jsx
import React, { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import DOMPurify from 'dompurify';

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

const PageHeader = ({ title, subtitle, icon }) => (
  <header className="premium-hero">
    <div className="kinetic-bg" />
    <Fade>
      <div className="hero-content-wrapper">
        {icon && <div className="hero-icon">{icon}</div>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </Fade>
  </header>
);

/* ════════════════════════════════════════════════════════════
   1. ADMISSION RULE (Step-by-Step Flow)
════════════════════════════════════════════════════════════ */
export function AdmissionRule() {
  const steps = [
    { title: 'Apply via Chancellor Portal', desc: 'Desirous students must apply through the Chancellor Portal (https://jharkhanduniversities.nic.in/) under NEP-2020.', fee: 'Application Fee: Rs. 100/-' },
    { title: 'Merit List & Verification', desc: 'Selected students must visit respective campuses (Main/Bhuda/Bank More) with original documents for physical verification.', fee: 'Check Document Required Page' },
    { title: 'University Registration', desc: 'After verification, pay the BBMKU Registration Fee on Chancellor Portal again.', fee: 'JAC Board: Rs. 308/- | Others: Rs. 758/-' },
    { title: 'College Online Admission Form', desc: 'Register on www.gncollege.org or enrollonline.co.in. Upload Chancellor Portal fee receipt and marksheet.', fee: 'Wait for approval message' },
    { title: 'Final Fee Payment', desc: 'After approval, pay the college fee via Student Diary Cloud App or CIMS portal using Card/UPI/NetBanking.', fee: 'Online Payment Only' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="Admission Procedure" subtitle="Complete step-by-step guide for UG and Vocational admission under NEP 2020." icon="📝" />
      <div style={{ maxWidth: 900, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Fade>
          <div style={{ background: '#fff', padding: 40, borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.05)' }}>
            <div style={{ background: '#fef2f2', borderLeft: `4px solid #ef4444`, padding: 16, borderRadius: '0 12px 12px 0', marginBottom: 30 }}>
              <strong style={{ color: '#b91c1c' }}>Important Rule:</strong> <span style={{ color: '#ef4444' }}>Students attending less than 75% classes will not be eligible to fill up university examination forms. Violation of discipline may lead to removal.</span>
            </div>
            
            <div style={{ position: 'relative', paddingLeft: 24 }}>
              <div style={{ position: 'absolute', top: 10, bottom: 20, left: 9, width: 3, background: '#e2e8f0', borderRadius: 3 }} />
              {steps.map((s, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: 30 }}>
                  <div style={{ position: 'absolute', left: -24, top: 4, width: 18, height: 18, borderRadius: '50%', background: NAVY, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, border: '3px solid #fff', boxShadow: `0 0 0 2px ${NAVY}` }}>{i+1}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: NAVY, marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6, marginBottom: 6 }}>{s.desc}</div>
                  <div style={{ display: 'inline-block', background: `${GOLD}15`, color: '#b45309', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>{s.fee}</div>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   2. DOCUMENTS REQUIRED (Checklist)
════════════════════════════════════════════════════════════ */
export function DocumentRequired() {
  const docs = [
    { t: 'Chancellor Portal Form', d: 'Printed copy of the submitted application form.', type: 'Print' },
    { t: 'Application Fee Receipt', d: 'Proof of Rs. 100/- payment on Chancellor Portal.', type: 'Print' },
    { t: 'Original CLC/TC', d: 'Original copy will be kept by the college (keep photocopies for yourself).', type: 'Original' },
    { t: 'Qualifying Marksheet', d: 'Self-attested photocopy of previous exam.', type: 'Photocopy' },
    { t: 'Admit Card', d: 'Self-attested photocopy of qualifying exam admit card.', type: 'Photocopy' },
    { t: 'Migration Certificate', d: 'Original or Downloaded from Digilocker (Required for non-JAC board).', type: 'Original' },
    { t: 'Caste Certificate', d: 'If applicable for reservation claims.', type: 'Photocopy' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="Documents Required" subtitle="Bring these documents during physical verification at the campus." icon="📂" />
      <div style={{ maxWidth: 1000, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Fade>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {docs.map((d, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e2e8f0', display: 'flex', gap: 16, boxShadow: '0 4px 15px rgba(15,35,71,0.03)' }}>
                <div style={{ fontSize: 32 }}>{d.type === 'Original' ? '📜' : d.type === 'Print' ? 's🖨️' : '📄'}</div>
                <div>
                  <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 4, background: d.type === 'Original' ? '#fee2e2' : '#f1f5f9', color: d.type === 'Original' ? '#ef4444' : '#64748b', marginBottom: 6 }}>{d.type.toUpperCase()}</div>
                  <div style={{ fontWeight: 800, color: NAVY, fontSize: 16, marginBottom: 4 }}>{d.t}</div>
                  <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{d.d}</div>
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
   3. FEE STRUCTURE (Live Tables)
════════════════════════════════════════════════════════════ */
export function FeeStructure() {
  const [activeTab, setActiveTab] = useState('UG');

  // Exact data from PDF, updated for 8 Semesters (FYUGP)
  const ugFee = [
    { head: 'Tuition Fee', b1: '120', b2: '120', g1: '0', g2: '0' },
    { head: 'Admission fee', b1: '20', b2: '0', g1: '20', g2: '0' },
    { head: 'Electric Charge', b1: '30', b2: '30', g1: '30', g2: '30' },
    { head: 'Library Fee', b1: '50', b2: '0', g1: '50', g2: '0' },
    { head: 'NSS', b1: '20', b2: '20', g1: '20', g2: '20' },
    { head: 'Students Union', b1: '20', b2: '0', g1: '20', g2: '0' },
    { head: 'Students Fund', b1: '80', b2: '80', g1: '80', g2: '80' },
    { head: 'Annual Charge', b1: '191', b2: '0', g1: '191', g2: '0' },
    { head: 'College Fund', b1: '1650', b2: '1650', g1: '1650', g2: '1650' },
    { head: 'Internal Exam Fee', b1: '50', b2: '50', g1: '50', g2: '50' },
    { head: 'Development Fund', b1: '500', b2: '500', g1: '500', g2: '500' },
    { head: 'Practical fee (Vocational Paper)', b1: '150', b2: '150', g1: '150', g2: '150' },
    { head: 'ERP & Mobile App Charge', b1: '165', b2: '0', g1: '165', g2: '0' },
    { head: 'Hand Book Charge', b1: '100', b2: '0', g1: '100', g2: '0' },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="Fee Structure" subtitle="Detailed semester-wise fee breakdown for 4-Year FYUGP (8 Semesters), BCA, and BBA." icon="💳" />
      <div style={{ maxWidth: 1100, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Fade>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
            {['UG', 'BCA', 'BBA'].map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{ padding: '12px 30px', minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 99, border: 'none', background: activeTab === t ? NAVY : '#fff', color: activeTab === t ? '#fff' : '#64748b', fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: activeTab === t ? `0 8px 20px ${NAVY}40` : '0 2px 10px rgba(0,0,0,0.05)', transition: '0.3s' }}>
                {t === 'UG' ? 'UG Regular (8 Semesters)' : `${t} (Vocational)`}
              </button>
            ))}
          </div>

          <div style={{ background: '#fff', borderRadius: 24, padding: '30px 40px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.05)', overflowX: 'auto' }}>
            
            {activeTab === 'UG' && (
              <>
                <div style={{ background: '#eff6ff', borderLeft: '4px solid #3b82f6', padding: '12px 16px', borderRadius: '0 8px 8px 0', marginBottom: 20, fontSize: 13, color: '#1e3a8a', fontWeight: 600 }}>
                  Note: Under NEP 2020 (FYUGP), the undergraduate course is spread over 8 semesters. The fee pattern generally repeats for Odd (1, 3, 5, 7) and Even (2, 4, 6, 8) semesters.
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
                  <thead>
                    <tr style={{ background: NAVY, color: '#fff', textAlign: 'left' }}>
                      <th style={{ padding: 16, borderRadius: '12px 0 0 0' }}>Fee Head</th>
                      <th style={{ padding: 16 }}>Boys<br/><span style={{ fontSize: 11, color: '#cbd5e1' }}>Odd Sem (1,3,5,7)</span></th>
                      <th style={{ padding: 16 }}>Boys<br/><span style={{ fontSize: 11, color: '#cbd5e1' }}>Even Sem (2,4,6,8)</span></th>
                      <th style={{ padding: 16 }}>Girls<br/><span style={{ fontSize: 11, color: '#cbd5e1' }}>Odd Sem (1,3,5,7)</span></th>
                      <th style={{ padding: 16, borderRadius: '0 12px 0 0' }}>Girls<br/><span style={{ fontSize: 11, color: '#cbd5e1' }}>Even Sem (2,4,6,8)</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {ugFee.map((f, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: 12, paddingLeft: 16, fontWeight: 700, color: NAVY, fontSize: 14 }}>{f.head}</td>
                        <td style={{ padding: 12, paddingLeft: 16, color: '#64748b', fontSize: 14 }}>₹{f.b1}</td>
                        <td style={{ padding: 12, paddingLeft: 16, color: '#64748b', fontSize: 14 }}>₹{f.b2}</td>
                        <td style={{ padding: 12, paddingLeft: 16, color: '#64748b', fontSize: 14 }}>₹{f.g1}</td>
                        <td style={{ padding: 12, paddingLeft: 16, color: '#64748b', fontSize: 14 }}>₹{f.g2}</td>
                      </tr>
                    ))}
                    <tr style={{ background: `${GOLD}15`, fontWeight: 900, color: NAVY }}>
                      <td style={{ padding: 16 }}>Grand Total</td>
                      <td style={{ padding: 16 }}>₹3146</td>
                      <td style={{ padding: 16 }}>₹2600</td>
                      <td style={{ padding: 16 }}>₹3026</td>
                      <td style={{ padding: 16 }}>₹2480</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}

            {(activeTab === 'BCA' || activeTab === 'BBA') && (
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
                <thead>
                  <tr style={{ background: NAVY, color: '#fff', textAlign: 'left' }}>
                    <th style={{ padding: 16, borderRadius: '12px 0 0 0' }}>Particulars</th>
                    <th style={{ padding: 16 }}>Odd Semesters (1,3,5)</th>
                    <th style={{ padding: 16, borderRadius: '0 12px 0 0' }}>Even Semesters (2,4,6)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: 16, fontWeight: 700, color: NAVY }}>Course Fee</td>
                    <td style={{ padding: 16, color: '#64748b' }}>₹{activeTab === 'BCA' ? '15,000' : '13,000'}</td>
                    <td style={{ padding: 16, color: '#64748b' }}>₹{activeTab === 'BCA' ? '15,000' : '13,000'}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: 16, fontWeight: 700, color: NAVY }}>Development & ERP Fee</td>
                    <td style={{ padding: 16, color: '#64748b' }}>₹{activeTab === 'BCA' ? '916' : '916'}</td>
                    <td style={{ padding: 16, color: '#64748b' }}>₹{activeTab === 'BCA' ? '165' : '165'}</td>
                  </tr>
                  <tr style={{ background: `${GOLD}15`, fontWeight: 900, color: NAVY }}>
                    <td style={{ padding: 16 }}>Grand Total</td>
                    <td style={{ padding: 16 }}>₹{activeTab === 'BCA' ? '15,916' : '13,916'}</td>
                    <td style={{ padding: 16 }}>₹{activeTab === 'BCA' ? '15,165' : '13,165'}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </Fade>
      </div>
    </div>
  );
}
/* ════════════════════════════════════════════════════════════
   4. ADMISSION NOTIFICATIONS (Live from Firebase)
════════════════════════════════════════════════════════════ */
export function AdmissionNotification() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      // Filter only Admission notices
      setNotices(all.filter(n => n.type === 'Admission'));
    });
    return () => unsub();
  }, []);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="Admission Notifications" subtitle="Latest updates, merit lists, and announcements regarding admissions." icon="📢" />
      <div style={{ maxWidth: 900, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Fade>
          {notices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, background: '#fff', borderRadius: 20, border: '2px dashed #e2e8f0' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: NAVY }}>No Admission Notices</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {notices.map((n, i) => (
                <div key={n.id} style={{ background: '#fff', padding: 24, borderRadius: 16, borderLeft: `4px solid ${n.isNew ? '#ef4444' : NAVY}`, boxShadow: '0 4px 15px rgba(15,35,71,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
                  <div>
                    {n.isNew && <span style={{ display: 'inline-block', background: '#fee2e2', color: '#ef4444', fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 4, marginBottom: 8, animation: 'pulse 2s infinite' }}>🔴 NEW UPDATE</span>}
                    <div style={{ fontWeight: 700, fontSize: 16, color: NAVY, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(n.text) }} />
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>🗓️ {new Date(n.date).toLocaleDateString()}</div>
                  </div>
                  {n.link && (
                    <a href={n.link} target="_blank" rel="noreferrer" style={{ background: `${NAVY}15`, color: NAVY, padding: '10px 20px', minHeight: 44, display: 'inline-flex', alignItems: 'center', borderRadius: 10, textDecoration: 'none', fontWeight: 800, fontSize: 13, whiteSpace: 'nowrap' }}>View Details ↗</a>
                  )}
                </div>
              ))}
            </div>
          )}
        </Fade>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   5. INTAKE CAPACITY (Bento Box Stats)
════════════════════════════════════════════════════════════ */
export function IntakeCapacity() {
  const data = [
    { title: 'Commerce', seats: 550, icon: '📈', color: GOLD, sub: 'B.Com Honours' },
    { title: 'Arts (History & Pol. Sc)', seats: 312, icon: '🏛️', color: NAVY, sub: '156 Seats Each' },
    { title: 'Arts (Eng, Eco, Psy, Hin)', seats: 512, icon: '📚', color: '#0ea5e9', sub: '128 Seats Each' },
    { title: 'BCA', seats: 90, icon: '💻', color: '#ef4444', sub: 'Vocational Course' },
    { title: 'BBA', seats: 90, icon: '💼', color: '#10b981', sub: 'Vocational Course' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="Intake Capacity" subtitle="Subject-wise maximum seat availability for the current academic session." icon="🪑" />
      <div style={{ maxWidth: 1000, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Fade>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {data.map((d, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 20, padding: 30, border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.04)', display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: `${d.color}15`, color: d.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>{d.icon}</div>
                <div>
                  <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{d.title}</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: NAVY, lineHeight: 1 }}>{d.seats}</div>
                  <div style={{ fontSize: 12, color: d.color, fontWeight: 800, marginTop: 4 }}>{d.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </div>
  );
}