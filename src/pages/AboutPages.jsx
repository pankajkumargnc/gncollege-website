// src/pages/AboutPages.jsx  ✅ CLEAN REWRITE — no duplicate code, all functions balanced
// EXPORTS:
//   VisionMission, PrincipalMessage, Organogram
//   CommitteePage (+ 9 pre-configured: WomensCell, AntiRagging, ScStCell, ObcCell,
//                    GrievanceCell, IccCell, MinorityCell, PlacementCell, RusaCell)
//   GoverningBody, StaffCouncil

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import '../styles/index.css';

const N = COLORS.navy    || '#0f2347';
const G = COLORS.gold    || '#f4a023';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function useScrollTop() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
}

function Fade({ children, delay = 0, y = 20 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : `translateY(${y}px)`,
      transition: `all 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function PageHero({ title, subtitle, icon }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${N} 0%, #1a3a7c 100%)`,
      padding: '70px 20px 55px', textAlign: 'center', color: '#fff',
    }}>
      {icon && <div style={{ fontSize: 48, marginBottom: 14 }}>{icon}</div>}
      <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.5px' }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ color: '#cbd5e1', fontSize: 16, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function AboutSidebar() {
  return (
    <aside className="profile-sidebar">
      <Fade delay={0.1}>
        <div className="widget">
          <h3 className="widget-title"><span>📑</span> About Us</h3>
          <ul className="quick-links">
            {[
              { label: 'College Profile',    path: '/about-us/college-profile' },
              { label: 'Vision & Mission',   path: '/about-us/vision-mission' },
              { label: "Principal's Message",path: '/about-us/principal-message' },
              { label: 'Organogram',         path: '/about-us/college-management/organogram' },
              { label: 'Presidents',         path: '/about-us/college-management/presidents' },
              { label: 'Secretaries',        path: '/about-us/college-management/secretaries' },
              { label: 'Principals',         path: '/about-us/college-management/principal' },
              { label: 'Governing Body',     path: '/about-us/governing-body' },
              { label: 'Staff Council',      path: '/about-us/staff-council' },
              { label: 'Teaching Staff',     path: '/about-us/college-staff/teaching-staff' },
              { label: 'Non-Teaching Staff', path: '/about-us/college-staff/non-teaching-staff' },
              { label: 'Audit Report',       path: '/about-us/audit-report' },
            ].map((l, i) => (
              <li key={i} className="quick-link-item">
                <Link to={l.path} className="quick-link"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <span className="link-arrow">›</span> {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="helpdesk-widget">
          <div style={{ fontSize: 42, marginBottom: 14, position: 'relative', zIndex: 2 }}>📞</div>
          <h4 style={{ margin: '0 0 10px', fontSize: 18, color: G, position: 'relative', zIndex: 2 }}>Need Help?</h4>
          <p style={{ fontSize: 13, margin: '0 0 18px', color: '#e2e8f0', lineHeight: 1.6, position: 'relative', zIndex: 2 }}>
            {/* ✏️ MESSAGE BADLEIN */}
            Contact our admin office for admissions or academic queries.
          </p>
          {/* ✏️ PHONE NUMBER YAHAN */}
          <a href="tel:+917903340991" className="helpdesk-btn">Call: 79033 40991</a>
        </div>
      </Fade>
    </aside>
  );
}

// ✏️ Data placeholder marker (visible on page — remove when data added)
function DataMarker({ label }) {
  return (
    <div style={{
      margin: '16px 0', padding: '10px 16px',
      background: '#fffbeb', border: '1.5px dashed #f59e0b',
      borderRadius: 10, color: '#92400e', fontSize: 13, fontWeight: 700,
    }}>
      ✏️ DATA YAHAN DALEIN: {label}
    </div>
  );
}

// Shared wrapper used on every page
function PageLayout({ children }) {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '50px 20px 80px' }}>
      <div className="profile-layout">
        <main className="profile-main">{children}</main>
        <AboutSidebar />
      </div>
    </div>
  );
}

// ─── Firebase-powered Meeting PDF list ───────────────────────────────────────
function MeetingPDFList({ collectionName, accentColor, emptyText }) {
  const [meetings, setMeetings] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy('date', 'desc'));
    const unsub = onSnapshot(q,
      snap => { setMeetings(snap.docs.map(d => ({ id: d.id, ...d.data() }))); setLoading(false); },
      ()   => setLoading(false)
    );
    return () => unsub();
  }, [collectionName]);

  if (loading) {
    return (
      <div style={{ padding: 20, textAlign: 'center', color: '#94a3b8' }}>
        ⏳ Loading…
      </div>
    );
  }

  if (meetings.length === 0) {
    return (
      <div style={{ padding: 32, textAlign: 'center', color: '#94a3b8', background: '#f8fafc', borderRadius: 12 }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>📂</div>
        <div style={{ fontWeight: 700 }}>{emptyText || 'Koi meetings nahi mili.'}</div>
        <div style={{ fontSize: 12, marginTop: 4 }}>
          Admin Panel → {collectionName === 'gb_meetings' ? 'GB Meetings' : 'Staff Council'} tab se add karein
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {meetings.map(m => {
        const dt = m.date ? new Date(m.date) : null;
        return (
          <div key={m.id} style={{
            display: 'flex', gap: 16, alignItems: 'flex-start',
            background: '#fff', borderRadius: 14, padding: 18,
            border: '1.5px solid #e2e8f0',
            borderLeft: `5px solid ${accentColor || N}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            <div style={{
              background: accentColor || N, color: '#fff',
              borderRadius: 10, padding: '8px 12px',
              textAlign: 'center', flexShrink: 0, minWidth: 56,
            }}>
              <div style={{ fontSize: 20, fontWeight: 900, lineHeight: 1 }}>
                {dt ? dt.getDate().toString().padStart(2, '0') : '--'}
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, marginTop: 2, opacity: 0.85 }}>
                {dt ? dt.toLocaleString('en-IN', { month: 'short' }).toUpperCase() : '--'}
              </div>
              <div style={{ fontSize: 9, opacity: 0.7 }}>
                {dt ? dt.getFullYear() : ''}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: N, fontSize: 15 }}>{m.title}</div>
              {m.notes && (
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 4, lineHeight: 1.6 }}>{m.notes}</div>
              )}
              <div style={{ marginTop: 10 }}>
                <a href={m.pdfUrl} target="_blank" rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    background: accentColor || N, color: '#fff',
                    padding: '7px 16px', borderRadius: 8,
                    fontWeight: 700, fontSize: 13, textDecoration: 'none',
                  }}>
                  📄 View Meeting PDF
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   1. VISION & MISSION
═══════════════════════════════════════════════════════════════ */
export function VisionMission() {
  useScrollTop();
  return (
    <div>
      <PageHero title="Vision & Mission" subtitle="Our guiding principles and future aspirations" icon="🌟" />
      <PageLayout>
        <Fade>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24, marginBottom: 32 }}>
            {/* Vision */}
            <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 8px 30px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
              <div style={{ height: 6, background: G }} />
              <div style={{ padding: 32 }}>
                <div style={{ fontSize: 42, marginBottom: 14 }}>🎯</div>
                <h2 style={{ color: N, fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Our Vision</h2>
                {/* ✏️ VISION TEXT YAHAN BADLEIN */}
                <p style={{ color: '#475569', lineHeight: 1.8, fontSize: 15 }}>
                  To be a premier institution of higher learning that nurtures leaders of tomorrow —
                  intellectually competent, ethically grounded, and socially responsible — drawing
                  inspiration from the teachings of Guru Nanak Devji.
                </p>
              </div>
            </div>
            {/* Mission */}
            <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 8px 30px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
              <div style={{ height: 6, background: N }} />
              <div style={{ padding: 32 }}>
                <div style={{ fontSize: 42, marginBottom: 14 }}>📌</div>
                <h2 style={{ color: N, fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Our Mission</h2>
                {/* ✏️ MISSION TEXT YAHAN BADLEIN */}
                <p style={{ color: '#475569', lineHeight: 1.8, fontSize: 15 }}>
                  To provide quality and inclusive higher education to all sections of society, with
                  special focus on the underprivileged, empowering students through academic excellence,
                  skill development, and value-based learning.
                </p>
              </div>
            </div>
          </div>
        </Fade>
        <Fade delay={0.15}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 36, boxShadow: '0 8px 30px rgba(0,0,0,0.07)' }}>
            <h2 className="section-heading">Core Values</h2>
            <div className="heading-underline" />
            {/* ✏️ CORE VALUES LIST CUSTOMIZE KAREIN */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 16, marginTop: 24 }}>
              {[
                { icon: '🕊️', label: 'Peace & Harmony' },
                { icon: '🎓', label: 'Academic Excellence' },
                { icon: '🤝', label: 'Inclusivity' },
                { icon: '💡', label: 'Innovation' },
                { icon: '🌿', label: 'Service to Society' },
                { icon: '⚖️', label: 'Integrity' },
              ].map((v, i) => (
                <div key={i} style={{
                  textAlign: 'center', padding: '20px 12px',
                  background: '#f8fafc', borderRadius: 14, border: '1.5px solid #e2e8f0',
                }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{v.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: N }}>{v.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </PageLayout>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   2. PRINCIPAL'S MESSAGE
═══════════════════════════════════════════════════════════════ */
export function PrincipalMessage() {
  useScrollTop();
  return (
    <div>
      <PageHero title="Principal's Message" subtitle="A word from our Principal to students and parents" icon="🎓" />
      <PageLayout>
        <Fade>
          <div style={{ background: '#fff', borderRadius: 20, padding: 40, boxShadow: '0 8px 30px rgba(0,0,0,0.07)' }}>
            {/* Photo + Name */}
            <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 36 }}>
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <DataMarker label="Principal ki photo ka path — src mein dalein" />
                <div style={{
                  width: 180, height: 180, borderRadius: '50%',
                  border: `6px solid ${G}`, boxShadow: '0 10px 30px rgba(15,35,71,0.2)',
                  overflow: 'hidden', margin: '0 auto', background: '#f1f5f9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {/* ✏️ REPLACE src WITH ACTUAL PHOTO */}
                  <span style={{ fontSize: 72 }}>👨‍💼</span>
                </div>
                <DataMarker label="Principal ka naam, qualification, experience" />
                <div style={{ marginTop: 14, fontWeight: 800, fontSize: 18, color: N }}>
                  Prof. [Principal Name] {/* ✏️ */}
                </div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Principal</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>Guru Nanak College, Dhanbad</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>[M.A., Ph.D.]  {/* ✏️ */}</div>
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                {/* ✏️ QUOTE BADLEIN */}
                <div style={{ borderLeft: `5px solid ${G}`, paddingLeft: 24, marginBottom: 24 }}>
                  <p style={{ fontSize: 20, fontStyle: 'italic', color: N, fontWeight: 700, lineHeight: 1.6 }}>
                    "Education is not merely the acquisition of knowledge, but the transformation of
                    character and the cultivation of a purposeful life."
                  </p>
                </div>
              </div>
            </div>
            {/* Full Message */}
            <h2 className="section-heading">Message to Students & Parents</h2>
            <div className="heading-underline" />
            <DataMarker label="Principal ka poora sandesh — 3-4 paragraphs" />
            {/* ✏️ PARAGRAPHS YAHAN */}
            <p className="rich-text-content">
              Dear Students and Parents, it gives me immense pleasure to welcome you to Guru Nanak College,
              Dhanbad — an institution that has been nurturing young minds for over five decades with the
              guiding light of Guru Nanak Devji's teachings of service, equality, and devotion.
            </p>
            <p className="rich-text-content mt-4">
              Our college stands as a beacon of quality education in Jharkhand, offering a rich blend of
              academic rigour, co-curricular activities, and personal development.
            </p>
            <p className="rich-text-content mt-4">
              I invite you to be part of our vibrant community and assure you of our complete support at
              every step of your academic journey.
            </p>
          </div>
        </Fade>
      </PageLayout>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   3. ORGANOGRAM
═══════════════════════════════════════════════════════════════ */
export function Organogram() {
  useScrollTop();
  return (
    <div>
      <PageHero title="Organogram" subtitle="Organizational structure and hierarchy of Guru Nanak College" icon="🏛️" />
      <PageLayout>
        <Fade>
          <div style={{ background: '#fff', borderRadius: 20, padding: 36, boxShadow: '0 8px 30px rgba(0,0,0,0.07)' }}>
            <h2 className="section-heading">College Organizational Chart</h2>
            <div className="heading-underline" />
            <DataMarker label="Organogram image ya PDF ka link yahan dalein" />
            {/* ✏️ ORGANOGRAM IMAGE */}
            <div style={{ border: '2px dashed #cbd5e1', borderRadius: 16, padding: 32, textAlign: 'center', background: '#f8fafc', marginBottom: 28 }}>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>
                (Organogram image placeholder — actual image src mein dalein)
              </div>
            </div>
            <h3 style={{ color: N, fontWeight: 800, marginBottom: 16, fontSize: 18 }}>Hierarchy Overview</h3>
            <DataMarker label="Har level mein actual naam dalein — President, Principal, HODs etc." />
            {[
              { level: 1, title: 'Gurudwara Prabandhak Committee (GPC)', desc: 'Supreme Governing Authority' },
              { level: 2, title: 'President, GNC',                        desc: '✏️ [President Name]' },
              { level: 3, title: 'Secretary, GNC',                        desc: '✏️ [Secretary Name]' },
              { level: 4, title: 'Principal',                             desc: '✏️ [Principal Name]' },
              { level: 5, title: 'Vice Principal / IQAC',                 desc: 'Academic & Quality Cell' },
              { level: 6, title: 'Heads of Departments',                  desc: 'BCA, BBA, Commerce, Humanities, Social Science' },
              { level: 7, title: 'Non-Teaching Staff',                    desc: 'Administrative & Support Staff' },
            ].map((row, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '12px 18px', marginBottom: 8,
                background: i % 2 === 0 ? '#f8fafc' : '#fff',
                borderRadius: 10, border: '1px solid #e2e8f0',
                borderLeft: `4px solid ${i < 2 ? G : i < 4 ? N : '#94a3b8'}`,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: N, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, flexShrink: 0,
                }}>
                  {row.level}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: N, fontSize: 14 }}>{row.title}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{row.desc}</div>
                </div>
              </div>
            ))}
            <DataMarker label="PDF link yahan dalein" />
            <a href="#" target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 20,
                background: N, color: '#fff', padding: '12px 24px', borderRadius: 10,
                fontWeight: 700, fontSize: 14, textDecoration: 'none',
              }}>
              📥 Download Organogram PDF {/* ✏️ href mein actual link dalein */}
            </a>
          </div>
        </Fade>
      </PageLayout>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   4. COMMITTEE PAGE (universal — 9 committees use this)
═══════════════════════════════════════════════════════════════ */
export function CommitteePage({ name, desc, icon, purpose = [], responsibilities = [] }) {
  useScrollTop();
  return (
    <div>
      <PageHero title={name} subtitle={desc} icon={icon} />
      <PageLayout>
        {/* Header card */}
        <Fade>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 8px 30px rgba(0,0,0,0.07)', marginBottom: 20 }}>
            <div style={{
              display: 'flex', gap: 20, alignItems: 'center',
              padding: 20, background: `linear-gradient(135deg, ${N}, #1a3a7c)`,
              borderRadius: 14, color: '#fff', flexWrap: 'wrap',
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 34, border: `3px solid ${G}`, flexShrink: 0,
              }}>
                {icon}
              </div>
              <div>
                <div style={{ fontSize: 11, color: G, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Chairperson / Convener</div>
                <DataMarker label={`${name} ke Chairperson ka naam aur designation`} />
                <div style={{ fontSize: 18, fontWeight: 800 }}>✏️ [Chairperson Name]</div>
                <div style={{ fontSize: 13, color: '#cbd5e1', marginTop: 4 }}>✏️ [Designation, Department]</div>
              </div>
            </div>
          </div>
        </Fade>

        {/* Purpose */}
        {purpose.length > 0 && (
          <Fade delay={0.1}>
            <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 8px 30px rgba(0,0,0,0.07)', marginBottom: 20 }}>
              <h2 className="section-heading">Purpose</h2>
              <div className="heading-underline" />
              <ul style={{ marginTop: 12, paddingLeft: 20 }}>
                {purpose.map((p, i) => (
                  <li key={i} style={{ marginBottom: 8, color: '#475569', lineHeight: 1.7 }}>{p}</li>
                ))}
              </ul>
            </div>
          </Fade>
        )}

        {/* Responsibilities */}
        {responsibilities.length > 0 && (
          <Fade delay={0.15}>
            <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 8px 30px rgba(0,0,0,0.07)', marginBottom: 20 }}>
              <h2 className="section-heading">Key Responsibilities</h2>
              <div className="heading-underline" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 12, marginTop: 16 }}>
                {responsibilities.map((r, i) => (
                  <div key={i} style={{
                    padding: '12px 16px', background: '#f8fafc',
                    borderRadius: 10, borderLeft: `4px solid ${G}`,
                    fontSize: 14, color: '#334155',
                  }}>
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        )}

        {/* Members table */}
        <Fade delay={0.2}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 8px 30px rgba(0,0,0,0.07)' }}>
            <h2 className="section-heading">Committee Members</h2>
            <div className="heading-underline" />
            <DataMarker label={`${name} ke members — naam, designation, role (Chairperson / Member / Member Secretary)`} />
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: N, color: '#fff' }}>
                    {['S.No.', 'Name', 'Designation', 'Department', 'Role'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff', borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '11px 16px', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '11px 16px', fontWeight: 600, color: '#94a3b8' }}>✏️ [Name]</td>
                      <td style={{ padding: '11px 16px', color: '#94a3b8' }}>✏️ [Designation]</td>
                      <td style={{ padding: '11px 16px', color: '#94a3b8' }}>✏️ [Dept]</td>
                      <td style={{ padding: '11px 16px' }}>
                        <span style={{
                          background: i === 0 ? '#fef3c7' : '#f1f5f9',
                          color: i === 0 ? '#92400e' : '#475569',
                          padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700,
                        }}>
                          {i === 0 ? 'Chairperson' : i === 1 ? 'Member Secretary' : 'Member'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Fade>
      </PageLayout>
    </div>
  );
}

// Pre-configured committee pages
export function WomensCell() {
  return <CommitteePage name="Women's Cell" icon="👩‍💼"
    desc="Dedicated to the safety, empowerment, and welfare of female students and staff at GNC."
    purpose={[
      "Ensure a safe and harassment-free environment for women on campus.",
      "Conduct awareness programs on women's rights and legal provisions.",
      "Provide counselling and support to female students in need.",
    ]}
    responsibilities={['Monitor campus safety for women','Handle complaints related to women\'s issues','Organize gender sensitization workshops','Coordinate with ICC for harassment cases']}
  />;
}
export function AntiRagging() {
  return <CommitteePage name="Anti-Ragging Committee" icon="🚫"
    desc="Committed to maintaining a 100% ragging-free campus in compliance with UGC & Supreme Court guidelines."
    purpose={[
      "Prevent and prohibit ragging in all forms on campus.",
      "Create awareness among students about legal consequences of ragging.",
      "Investigate complaints and take strict action against offenders.",
    ]}
    responsibilities={['Display anti-ragging notices','Collect anti-ragging affidavits','Investigate complaints promptly','Coordinate with police if required','Conduct orientation programs']}
  />;
}
export function ScStCell() {
  return <CommitteePage name="SC/ST Cell" icon="🤝"
    desc="A dedicated welfare and support centre for Scheduled Caste and Scheduled Tribe students."
    purpose={['Ensure equal educational opportunities for SC/ST students.','Guide students about government scholarships and reservations.','Resolve academic and social issues faced by SC/ST students.']}
    responsibilities={['Facilitate scholarship applications','Address grievances of SC/ST students','Organize awareness camps','Maintain data of SC/ST enrollment','Liaison with government welfare departments']}
  />;
}
export function ObcCell() {
  return <CommitteePage name="OBC Cell" icon="📚"
    desc="Supporting students from Other Backward Classes with their academic and welfare needs."
    purpose={['Facilitate awareness of OBC reservations and government schemes.','Guide OBC students for scholarship applications.','Provide academic and career counselling.']}
    responsibilities={['Scholarship guidance for OBC students','Address academic grievances','Facilitate income/caste certificate help','Organize career awareness programs']}
  />;
}
export function GrievanceCell() {
  return <CommitteePage name="Grievance Redressal Cell" icon="⚖️"
    desc="An official platform for students and staff to raise and resolve their academic and administrative grievances."
    purpose={['Provide a fair and transparent mechanism for addressing grievances.','Ensure prompt redressal of student and staff complaints.','Maintain a record of grievances and their resolution.']}
    responsibilities={['Receive and register grievances','Investigate complaints within stipulated time','Maintain grievance register','Submit reports to Principal','Ensure confidentiality and impartiality']}
  />;
}
export function IccCell() {
  return <CommitteePage name="Internal Complaints Committee (ICC)" icon="🛡️"
    desc="Constituted under Sexual Harassment of Women at Workplace Act, 2013 — ensuring a safe and dignified environment."
    purpose={['Prevent, prohibit, and redress sexual harassment complaints.','Conduct sensitization programs for students and staff.','Ensure impartial inquiry and fair resolution of complaints.']}
    responsibilities={['Receive complaints of sexual harassment','Conduct inquiry within 90 days','Maintain confidentiality of complainant','Submit annual report to District Officer','Organize prevention workshops']}
  />;
}
export function MinorityCell() {
  return <CommitteePage name="Minority Cell" icon="🌙"
    desc="A welfare cell to support and guide students from minority communities in their academic journey."
    purpose={['Guide minority students about government scholarships and schemes.','Create an inclusive environment for minority students.','Address specific academic and personal issues.']}
    responsibilities={['Pre-matric and post-matric scholarship guidance','Address minority student grievances','Organize awareness programs','Maintain enrollment data']}
  />;
}
export function PlacementCell() {
  return <CommitteePage name="Placement Cell" icon="💼"
    desc="Bridging students with career opportunities through training, internships, and campus placements."
    purpose={['Facilitate campus placements and internship opportunities.','Organize skill development and career guidance programs.','Maintain industry-academia partnerships.']}
    responsibilities={['Coordinate with companies for campus drives','Organize mock interviews and GD sessions','Maintain placement records','Career counselling for final year students','Organize job fairs']}
  />;
}
export function RusaCell() {
  return <CommitteePage name="RUSA Cell" icon="🏛️"
    desc="Rashtriya Uchchatar Shiksha Abhiyan — implementing central schemes for quality improvement in higher education."
    purpose={['Implement RUSA-funded projects and infrastructure development.','Ensure compliance with RUSA guidelines and reporting requirements.']}
    responsibilities={['Coordinate RUSA grant utilization','Maintain RUSA project documentation','Submit utilization certificates','Monitor RUSA-funded activities','Liaison with State Higher Education Council']}
  />;
}


/* ═══════════════════════════════════════════════════════════════
   5. GOVERNING BODY
═══════════════════════════════════════════════════════════════ */
export function GoverningBody() {
  useScrollTop();
  return (
    <div>
      <PageHero title="Governing Body" subtitle="The apex decision-making body of Guru Nanak College, Dhanbad" icon="🏛️" />
      <PageLayout>
        {/* About */}
        <Fade>
          <div style={{ background: '#fff', borderRadius: 20, padding: 36, boxShadow: '0 8px 30px rgba(0,0,0,0.07)', marginBottom: 24 }}>
            <h2 className="section-heading">About the Governing Body</h2>
            <div className="heading-underline" />
            <p className="rich-text-content">
              The Governing Body of Guru Nanak College, Dhanbad is the supreme authority responsible for
              the overall management, policy decisions, and financial matters of the college. It is
              constituted as per UGC guidelines and the regulations of Binod Bihari Mahto Koylanchal
              University (BBMKU), Dhanbad.
            </p>
            <DataMarker label="Current session, total members, chairperson naam — niche stats box mein dalein" />
            <div style={{
              marginTop: 20, padding: '16px 24px',
              background: `linear-gradient(135deg, ${N}, #1a3a7c)`,
              borderRadius: 12, color: '#fff',
              display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
            }}>
              <div>
                <div style={{ fontSize: 11, color: G, fontWeight: 700, textTransform: 'uppercase' }}>Current Session</div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>✏️ [Session Year]</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: G, fontWeight: 700, textTransform: 'uppercase' }}>Total Members</div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>✏️ [Number]</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: G, fontWeight: 700, textTransform: 'uppercase' }}>Chairperson</div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>✏️ [Name]</div>
              </div>
            </div>
          </div>
        </Fade>

        {/* Members Table */}
        <Fade delay={0.1}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 36, boxShadow: '0 8px 30px rgba(0,0,0,0.07)', marginBottom: 24 }}>
            <h2 className="section-heading">Members of Governing Body</h2>
            <div className="heading-underline" />
            <DataMarker label="Saare members ka naam, designation, category, role dalein" />
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: N, color: '#fff' }}>
                    {['S.No.', 'Name', 'Designation', 'Category', 'Role in GB'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: '✏️ [Name]', desig: 'President, GPC',    cat: 'Management Nominee', role: 'Chairperson' },
                    { name: '✏️ [Name]', desig: 'Secretary, GPC',    cat: 'Management Nominee', role: 'Member' },
                    { name: '✏️ [Name]', desig: 'Principal, GNC',    cat: 'Ex-officio',          role: 'Member Secretary' },
                    { name: '✏️ [Name]', desig: '✏️ [Designation]',  cat: 'Management Nominee', role: 'Member' },
                    { name: '✏️ [Name]', desig: '✏️ [Designation]',  cat: 'UGC Nominee',         role: 'Member' },
                    { name: '✏️ [Name]', desig: '✏️ [Designation]',  cat: 'University Nominee',  role: 'Member' },
                    { name: '✏️ [Name]', desig: '✏️ [Designation]',  cat: 'Teaching Staff Rep.', role: 'Member' },
                    { name: '✏️ [Name]', desig: '✏️ [Designation]',  cat: 'Non-Teaching Rep.',   role: 'Member' },
                  ].map((r, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff', borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '11px 16px', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '11px 16px', fontWeight: 700, color: N }}>{r.name}</td>
                      <td style={{ padding: '11px 16px', color: '#475569' }}>{r.desig}</td>
                      <td style={{ padding: '11px 16px', fontSize: 12 }}>
                        <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: 5, fontWeight: 600 }}>
                          {r.cat}
                        </span>
                      </td>
                      <td style={{ padding: '11px 16px' }}>
                        <span style={{
                          background: r.role === 'Chairperson' ? '#fef3c7' : r.role === 'Member Secretary' ? '#dcfce7' : '#f1f5f9',
                          color: r.role === 'Chairperson' ? '#92400e' : r.role === 'Member Secretary' ? '#166534' : '#475569',
                          padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700,
                        }}>
                          {r.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Fade>

        {/* GB Meeting PDFs — auto from Firebase */}
        <Fade delay={0.2}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 36, boxShadow: '0 8px 30px rgba(0,0,0,0.07)' }}>
            <h2 className="section-heading">GB Meeting Reports</h2>
            <div className="heading-underline" />
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
              🔒 <strong>Admin Panel → GB Meetings</strong> tab se date-wise PDF reports yahan automatically dikhte hain.
            </p>
            <MeetingPDFList
              collectionName="gb_meetings"
              accentColor={N}
              emptyText="Abhi tak koi GB Meeting report upload nahi ki gayi."
            />
          </div>
        </Fade>
      </PageLayout>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   6. STAFF COUNCIL
═══════════════════════════════════════════════════════════════ */
export function StaffCouncil() {
  useScrollTop();
  return (
    <div>
      <PageHero title="Staff Council" subtitle="The collective voice of teaching and non-teaching staff at GNC" icon="👨‍🏫" />
      <PageLayout>
        {/* About */}
        <Fade>
          <div style={{ background: '#fff', borderRadius: 20, padding: 36, boxShadow: '0 8px 30px rgba(0,0,0,0.07)', marginBottom: 24 }}>
            <h2 className="section-heading">About Staff Council</h2>
            <div className="heading-underline" />
            <p className="rich-text-content">
              The Staff Council of Guru Nanak College, Dhanbad is a representative body of the teaching
              and non-teaching staff. It serves as an advisory body to the Principal on academic and
              administrative matters, and acts as a platform for raising and resolving staff concerns.
            </p>
          </div>
        </Fade>

        {/* Members Table */}
        <Fade delay={0.1}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 36, boxShadow: '0 8px 30px rgba(0,0,0,0.07)', marginBottom: 24 }}>
            <h2 className="section-heading">Staff Council Members</h2>
            <div className="heading-underline" />
            <DataMarker label="Staff Council ke members — naam, designation, department, role" />
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: N, color: '#fff' }}>
                    {['S.No.', 'Name', 'Designation', 'Department', 'Role'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { desig: 'Principal',        dept: 'Administration', role: 'President / Chairman' },
                    { desig: '✏️ [Designation]', dept: '✏️ [Dept]',      role: 'Secretary' },
                    { desig: '✏️ [Designation]', dept: '✏️ [Dept]',      role: 'Joint Secretary' },
                    { desig: '✏️ [Designation]', dept: '✏️ [Dept]',      role: 'Member' },
                    { desig: '✏️ [Designation]', dept: '✏️ [Dept]',      role: 'Member' },
                    { desig: '✏️ [Designation]', dept: '✏️ [Dept]',      role: 'Member' },
                    { desig: '✏️ [Designation]', dept: '✏️ [Dept]',      role: 'Non-Teaching Rep.' },
                  ].map((r, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff', borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '11px 16px', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '11px 16px', fontWeight: 700, color: N }}>✏️ [Name]</td>
                      <td style={{ padding: '11px 16px', color: '#475569' }}>{r.desig}</td>
                      <td style={{ padding: '11px 16px', color: '#64748b', fontSize: 13 }}>{r.dept}</td>
                      <td style={{ padding: '11px 16px' }}>
                        <span style={{
                          background: r.role.includes('President') ? '#fef3c7' : r.role === 'Secretary' ? '#dcfce7' : '#f1f5f9',
                          color: r.role.includes('President') ? '#92400e' : r.role === 'Secretary' ? '#166534' : '#475569',
                          padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700,
                        }}>
                          {r.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 24, padding: 20, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: N, fontWeight: 800, marginBottom: 12, fontSize: 16 }}>Key Functions</h4>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {[
                  'Academic planning and curriculum discussions',
                  'Implementation of university and UGC guidelines',
                  'Student welfare and discipline matters',
                  'Organizing college events and programs',
                  'Grievance redressal of staff members',
                  'Annual academic calendar preparation',
                ].map((f, i) => (
                  <li key={i} style={{ color: '#475569', lineHeight: 1.8, marginBottom: 4 }}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </Fade>

        {/* Staff Council Meeting PDFs — auto from Firebase */}
        <Fade delay={0.2}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 36, boxShadow: '0 8px 30px rgba(0,0,0,0.07)' }}>
            <h2 className="section-heading">Staff Council Meeting Reports</h2>
            <div className="heading-underline" />
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
              🔒 <strong>Admin Panel → Staff Council</strong> tab se date-wise PDF reports yahan automatically dikhte hain.
            </p>
            <MeetingPDFList
              collectionName="staff_council"
              accentColor="#1a3a7c"
              emptyText="Abhi tak koi Staff Council Meeting report upload nahi ki gayi."
            />
          </div>
        </Fade>
      </PageLayout>
    </div>
  );
}