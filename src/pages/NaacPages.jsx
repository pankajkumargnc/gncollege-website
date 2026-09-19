// src/pages/NaacPages.jsx
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import toast from 'react-hot-toast';
import { Building2, Trophy, Scale, BarChart2, BookOpen, GraduationCap, Microscope, Award } from 'lucide-react';

const PDFModal = lazy(() => import('../components/PDFModal'));

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

const PageHeader = ({ title, subtitle, icon, badge = "NAAC & IQAC ACCREDITATION" }) => (
  <div className="premium-hero">
    <div className="kinetic-bg" />
    <div className="hero-content-wrapper anim-fade-in">
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244, 160, 35, 0.18)', border: '1px solid rgba(244, 160, 35, 0.4)', borderRadius: 20, padding: '4px 14px', marginBottom: 14 }}>
        <span style={{ fontSize: 12, color: GOLD, fontWeight: 800, letterSpacing: 0.5 }}>{badge}</span>
      </div>
      <h1 className="hero-title" style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 900, letterSpacing: '-0.5px', margin: '0 0 10px' }}>
        {icon && <span style={{ marginRight: 10 }}>{icon}</span>}
        {(() => {
          const words = (title || "").trim().split(' ');
          if (words.length <= 1) return title;
          const last = words.pop();
          return <>{words.join(' ')} <span>{last}</span></>;
        })()}
      </h1>
      {subtitle && <p className="hero-subtitle" style={{ maxWidth: 760, margin: '0 auto', fontSize: 15, opacity: 0.92, color: 'rgba(255,255,255,0.9)' }}>{subtitle}</p>}
    </div>
  </div>
);

/* ─── Document List Component with Real-time Firestore & Instant In-Modal PDF ─── */
function NaacDocumentList({ categoryKey, emptyMsg = "Documents will be available soon." }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewPdf, setPreviewPdf] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'pdfReports'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setDocs(all.filter(d => {
        const target = (d.targetPage || '').toLowerCase();
        const cat = (d.type || '').toLowerCase();
        const tit = (d.title || '').toLowerCase();
        const k = categoryKey.toLowerCase();
        return target.includes(k) || cat.includes(k) || tit.includes(k);
      }));
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, [categoryKey]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8', background: '#fff', borderRadius: 16 }}>
      <div style={{ width: 36, height: 36, border: `3px solid ${GOLD}`, borderTop: '3px solid transparent', borderRadius: '50%', animation: 'spin .8s linear infinite', margin: '0 auto 12px' }} />
      Loading NAAC documents...
    </div>
  );

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 18 }}>
        {docs.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 48, background: '#fff', borderRadius: 16, border: '2px dashed #e2e8f0', color: '#64748b' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📂</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: NAVY }}>{emptyMsg}</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>Institutional records are synchronized via the IQAC Document Vault.</div>
          </div>
        ) : (
          docs.map((d, i) => (
            <Fade key={d.id} delay={i * 0.04}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 20,
                  background: '#fff',
                  borderRadius: 14,
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 14px rgba(15,35,71,0.04)',
                  transition: 'all 0.2s ease',
                  height: '100%',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                    📄
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontWeight: 800, color: NAVY, fontSize: 14.5, lineHeight: 1.4, margin: '0 0 4px' }}>{d.title}</h4>
                    {d.fileSize && <span style={{ fontSize: 11, color: '#64748b', background: '#f8fafc', padding: '2px 8px', borderRadius: 4, border: '1px solid #e2e8f0' }}>{d.fileSize}</span>}
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid #f1f5f9', display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => setPreviewPdf({ url: d.pdfUrl || d.link, title: d.title })}
                    style={{
                      flex: 1,
                      background: NAVY,
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 12px',
                      fontSize: 12.5,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6
                    }}
                  >
                    <span>👁️</span> Preview PDF
                  </button>
                  <a
                    href={d.pdfUrl || d.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: '#f8fafc',
                      color: NAVY,
                      border: '1px solid #cbd5e1',
                      borderRadius: 8,
                      padding: '8px 12px',
                      fontSize: 12.5,
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Open in new tab"
                  >
                    ↗
                  </a>
                </div>
              </div>
            </Fade>
          ))
        )}
      </div>

      {previewPdf && (
        <Suspense fallback={null}>
          <PDFModal url={previewPdf.url} title={previewPdf.title} onClose={() => setPreviewPdf(null)} />
        </Suspense>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   1. NAAC INSTITUTIONAL MEGA-PORTAL DASHBOARD
══════════════════════════════════════════════════════════════════════ */
export function NaacPortalPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <PageHeader
        title="NAAC Accreditation Portal"
        subtitle="National Assessment and Accreditation Council (NAAC) Institutional Repository & Quality Assurance Framework of Guru Nanak College, Dhanbad."
      />

      <div style={{ maxWidth: 1200, margin: '32px auto 50px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        {/* Overview Banner Card */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '28px 32px', boxShadow: '0 12px 36px rgba(15,35,71,0.08)', border: '1px solid #e2e8f0', marginBottom: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'center' }}>
            <div>
              <span style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '4px 12px', borderRadius: 20, fontSize: 11.5, fontWeight: 800 }}>
                UGC 2(f) &amp; 12(B) • BBMKU AFFILIATED
              </span>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: NAVY, margin: '12px 0 8px' }}>
                Commitment to Quality &amp; Transparency
              </h2>
              <p style={{ margin: 0, fontSize: 14.5, color: '#475569', lineHeight: 1.7 }}>
                Guru Nanak College, Dhanbad, sponsored by the Gurudwara Prabandhak Committee, stands dedicated to continuous enhancement in teaching-learning, student progression, research innovations, and community outreach. The Internal Quality Assurance Cell (IQAC) acts as the nodal mechanism steering institutional benchmarks.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {[
                { label: 'Accreditation Status', val: 'Cycle 1 & 2 Completed', color: '#1e40af', icon: Trophy },
                { label: 'Quality Cell', val: 'Active IQAC Cell', color: '#047857', icon: Scale },
                { label: 'Evaluation Metrics', val: '7 Criteria Aligned', color: '#9333ea', icon: BarChart2 },
                { label: 'Affiliated Univ.', val: 'BBMKU Dhanbad', color: '#d97706', icon: Building2 },
              ].map((s, idx) => {
                const IconComp = s.icon;
                return (
                  <div key={idx} style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <div style={{ marginBottom: 6 }}><IconComp size={20} style={{ color: s.color }} /></div>
                    <div style={{ fontSize: 13.5, fontWeight: 800, color: NAVY }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginTop: 2 }}>{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 6 Key Portal Navigation Cards */}
        <h3 style={{ fontSize: 20, fontWeight: 900, color: NAVY, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>📑</span> Core NAAC Accreditation Subsystems
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            {
              title: 'Internal Quality Assurance Cell (IQAC)',
              desc: 'IQAC committee composition, quality mandates, meeting minutes, and annual Action Taken Reports (ATRs).',
              link: '/naac/iqac',
              icon: '⚖️',
              badge: 'Quality Nodal Cell',
            },
            {
              title: '7 NAAC Criteria Explorer',
              desc: 'Comprehensive evidence hub for Criteria 1 to 7: Curricular Aspects, Teaching-Learning, Research, Infrastructure, and Student Support.',
              link: '/naac/criteria',
              icon: '📊',
              badge: 'Assessment Metrics',
            },
            {
              title: 'SSR Cycles 1 & 2',
              desc: 'Self Study Reports (SSR), Peer Team Visit Reports, and Grade Certificates for Cycle 1 and Cycle 2 assessments.',
              link: '/naac/ssr-2nd-cycle/cycle-2-documents',
              icon: '📜',
              badge: 'Accreditation Cycles',
            },
            {
              title: 'AQAR Repository',
              desc: 'Annual Quality Assurance Reports submitted annually to the National Assessment and Accreditation Council.',
              link: '/naac/aqar',
              icon: '📁',
              badge: 'Annual Submissions',
            },
            {
              title: 'Best Practices & Distinctiveness',
              desc: 'Institutional best practices including Bank More Women’s Morning Degree Wing and value-based community service (Seva).',
              link: '/naac/best-practices',
              icon: '🌟',
              badge: 'Institutional Identity',
            },
            {
              title: 'NIRF & Perspective Plan',
              desc: 'National Institutional Ranking Framework data submissions and long-term 10-year institutional roadmap.',
              link: '/naac/nirf',
              icon: '🗺️',
              badge: 'Roadmap & Rankings',
            },
          ].map((card, i) => (
            <Link
              key={i}
              to={card.link}
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: '24px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(15,35,71,0.05)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.boxShadow = '0 12px 28px rgba(15,35,71,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,35,71,0.05)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 32 }}>{card.icon}</span>
                <span style={{ background: '#f1f5f9', color: NAVY, fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>
                  {card.badge}
                </span>
              </div>
              <h4 style={{ fontSize: 16.5, fontWeight: 800, color: NAVY, margin: '0 0 8px' }}>
                {card.title}
              </h4>
              <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.6, margin: '0 0 16px', flex: 1 }}>
                {card.desc}
              </p>
              <div style={{ fontSize: 13, fontWeight: 800, color: GOLD, display: 'flex', alignItems: 'center', gap: 4 }}>
                Explore Portal Section →
              </div>
            </Link>
          ))}
        </div>

        {/* Institutional Audits Strip */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '24px 28px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: '0 0 6px' }}>
            🌿 Academic, Environmental &amp; Gender Audits
          </h3>
          <p style={{ margin: '0 0 18px', fontSize: 13.5, color: '#64748b' }}>
            Periodic external audits certifying Green Campus benchmarks, Solar energy adoption, Gender parity, and Academic standards at Guru Nanak College.
          </p>
          <NaacDocumentList categoryKey="audit" emptyMsg="Institutional audit certifications are currently being archived." />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   2. IQAC CELL & COMMITTEE COMPOSITION
══════════════════════════════════════════════════════════════════════ */
export function NaacIqacPage() {
  const iqacMembers = [
    { role: 'Chairperson', name: 'Dr. Sanjay Prasad', designation: 'Principal, Guru Nanak College, Dhanbad' },
    { role: 'Management Nominee', name: 'S. Gurjeet Singh', designation: 'Secretary, Gurudwara Prabandhak Committee' },
    { role: 'Management Nominee', name: 'S. Jagjit Singh', designation: 'Member, Governing Council' },
    { role: 'Coordinator', name: 'Dr. Munishwar Prasad', designation: 'Associate Professor & Senior Faculty' },
    { role: 'Teacher Member', name: 'Prof. Amarjeet Singh', designation: 'Department of Commerce' },
    { role: 'Teacher Member', name: 'Dr. Sanjay Kumar Sinha', designation: 'Department of Humanities' },
    { role: 'Teacher Member', name: 'Prof. Pushpa Tiwari', designation: 'In-charge, Bank More Women’s Wing' },
    { role: 'Teacher Member', name: 'Prof. Arvind Kumar', designation: 'Department of Computer Applications (BCA)' },
    { role: 'Admin Officer', name: 'Sri Santosh Kumar', designation: 'Head Clerk / Office Superintendent' },
    { role: 'Local Society Nominee', name: 'Sri R. K. Sharma', designation: 'Eminent Citizen & Educationist' },
    { role: 'Alumni Representative', name: 'Sri Amit Agarwal', designation: 'Entrepreneur & President, GNC Alumni' },
    { role: 'Student Representative', name: 'Ms. Simran Kaur', designation: 'PG / Final Year Scholar' },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <PageHeader
        title="Internal Quality Assurance Cell (IQAC)"
        subtitle="The driving engine for institutional quality enhancement, academic benchmarks, and value-based pedagogical standards."
        icon="⚖️"
      />

      <div style={{ maxWidth: 1140, margin: '32px auto 50px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        {/* Quality Mandate */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '28px 32px', boxShadow: '0 8px 24px rgba(15,35,71,0.06)', border: '1px solid #e2e8f0', marginBottom: 28 }}>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: '0 0 10px' }}>
            IQAC Vision &amp; Quality Mandate
          </h3>
          <p style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.7, margin: 0 }}>
            In pursuance of the National Action Plan of NAAC for performance evaluation, assessment, and accreditation of higher education institutions, Guru Nanak College established its Internal Quality Assurance Cell (IQAC). The IQAC channels the efforts and measures of the college towards academic excellence, digital education infrastructure, learner-centric methodologies, and ethical grooming.
          </p>
        </div>

        {/* Committee Table */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '28px 32px', boxShadow: '0 8px 24px rgba(15,35,71,0.06)', border: '1px solid #e2e8f0', marginBottom: 28 }}>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: '0 0 16px' }}>
            🏛️ IQAC Cell Composition
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', fontSize: 12.5, fontWeight: 800, color: NAVY }}>ROLE</th>
                  <th style={{ padding: '12px 16px', fontSize: 12.5, fontWeight: 800, color: NAVY }}>MEMBER NAME</th>
                  <th style={{ padding: '12px 16px', fontSize: 12.5, fontWeight: 800, color: NAVY }}>DESIGNATION &amp; AFFILIATION</th>
                </tr>
              </thead>
              <tbody>
                {iqacMembers.map((m, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: '#047857' }}>
                      <span style={{ background: '#ecfdf5', padding: '3px 8px', borderRadius: 6 }}>{m.role}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 800, color: NAVY }}>{m.name}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#64748b' }}>{m.designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Minutes & Action Taken Reports (ATRs) */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '28px 32px', boxShadow: '0 8px 24px rgba(15,35,71,0.06)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: '0 0 8px' }}>
            📑 IQAC Meeting Minutes &amp; Action Taken Reports
          </h3>
          <p style={{ fontSize: 13.5, color: '#64748b', margin: '0 0 20px' }}>
            Official records of quarterly IQAC meetings and subsequent institutional actions taken to uphold academic and infrastructural standards.
          </p>
          <NaacDocumentList categoryKey="iqac" emptyMsg="IQAC minutes and action taken reports will appear here." />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   3. 7 NAAC CRITERIA EXPLORER
══════════════════════════════════════════════════════════════════════ */
export function NaacCriteriaPage() {
  const [activeCriterion, setActiveCriterion] = useState(1);

  const criteriaData = [
    {
      num: 1,
      title: 'Curricular Aspects',
      score: 'NEP 2020 & CBCS Alignment',
      icon: '📚',
      overview: 'Curricular design and implementation in affiliation with BBMKU Dhanbad. Implementation of 4-Year Undergraduate Programmes (FYUGP) under NEP 2020, value-added courses, academic flexibility, and systematic stakeholder feedback loops (students, teachers, alumni, employers).',
      highlights: [
        'Adoption of NEP-2020 Multi-disciplinary FYUGP Curriculum across Arts, Commerce, and BCA.',
        'Structured Feedback Collection from Students, Faculty, and Alumni on syllabus relevance.',
        'Add-on vocational certificates in Tally ERP, Web Development, and Soft Skills.',
      ],
      keyDoc: 'criteria-1'
    },
    {
      num: 2,
      title: 'Teaching-Learning & Evaluation',
      score: 'Student-Centric Pedagogy',
      icon: '👨‍🏫',
      overview: 'Catering to student diversity, transparent admission procedures with 50% Sikh Minority quota, ICT-enabled classrooms, experiential learning, continuous internal evaluation (CIE), and mentor-mentee counseling system.',
      highlights: [
        'Dedicated mentor allocated for batches of 35-40 students for academic guidance.',
        'Continuous assessment via mid-term tests, class seminars, and viva-voce.',
        'Special remedial classes for slow learners and research mentoring for advanced learners.',
      ],
      keyDoc: 'criteria-2'
    },
    {
      num: 3,
      title: 'Research, Innovations & Extension',
      score: 'Community Extension & NSS/NCC',
      icon: '🔬',
      overview: 'Fostering research culture, publication in UGC Care journals, active extension activities through NSS & 36 Jharkhand Bn NCC, national seminars, and active community health and blood donation camps in the coal belt.',
      highlights: [
        '3 Active NSS Units driving tree plantation, pulse polio, and literacy campaigns in Bhuda.',
        'Regular blood donation camps organized in partnership with PMCH / SNMMCH Blood Bank.',
        'Faculty research publications in national and international peer-reviewed journals.',
      ],
      keyDoc: 'criteria-3'
    },
    {
      num: 4,
      title: 'Infrastructure & Learning Resources',
      score: 'Dual Campus Facilities',
      icon: '🏛️',
      overview: 'State-of-the-art campus facilities across Bhuda Main Campus and Bank More Women’s Wing. Air-conditioned BCA computer laboratories, Wi-Fi connectivity, automated central library with inflibnet N-LIST access, seminar hall, and sports ground.',
      highlights: [
        'High-speed optical fiber internet and smart audio-visual lecture rooms.',
        'Library holding over 28,000+ volumes, reference encyclopedias, and e-journals.',
        'Spacious open athletic ground and indoor games facilities.',
      ],
      keyDoc: 'criteria-4'
    },
    {
      num: 5,
      title: 'Student Support & Progression',
      score: 'Scholarships & Career Guidance',
      icon: '🎓',
      overview: 'Comprehensive student support services including government minority scholarships (E-Kalyan), merit-cum-means assistance by Gurudwara Prabandhak Committee, career placement cell, anti-ragging cell, and grievance redressal.',
      highlights: [
        '100% processing assistance for Jharkhand Post-Matric & National Minority Scholarships.',
        'Active Training & Placement Cell coordinating campus recruitment with TCS, Wipro, and ICICI.',
        'Zero tolerance anti-ragging policy with CCTV monitored campus corridors.',
      ],
      keyDoc: 'criteria-5'
    },
    {
      num: 6,
      title: 'Governance, Leadership & Management',
      score: 'Transparent Minority Governance',
      icon: '🤝',
      overview: 'Visionary leadership under the Gurudwara Prabandhak Committee, Dhanbad. Decentralized governance through Academic Council, Deficit Grant financial budgeting, regular external audits, and professional development support for teaching & non-teaching staff.',
      highlights: [
        'Transparent governance by the Governing Council nominated by Gurudwara Prabandhak Committee.',
        'Deficit Grant College Status ensuring regular government salary and fiscal audits.',
        'Financial support for faculty to attend national seminars, FDPs, and workshops.',
      ],
      keyDoc: 'criteria-6'
    },
    {
      num: 7,
      title: 'Institutional Values & Best Practices',
      score: 'Moral Ethics & Green Campus',
      icon: '🌱',
      overview: 'Promotion of universal brotherhood, communal harmony (Sadbhavana), gender equity, environmental sustainability, solar energy utilization, rainwater harvesting, and pride in Sikh heritage and Indian multicultural ethos.',
      highlights: [
        'Installation of rooftop solar panels minimizing institutional carbon footprint.',
        'Dedicated Women’s Wing at Bank More ensuring safe higher education for girls.',
        'Celebration of Gurpurabs, National Integration Day, and Inter-Faith harmony symposiums.',
      ],
      keyDoc: 'criteria-7'
    },
  ];

  const curr = criteriaData.find(c => c.num === activeCriterion) || criteriaData[0];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <PageHeader
        title="7 NAAC Assessment Criteria Hub"
        subtitle="Detailed metrics, qualitative narratives, and documentary evidence aligned with NAAC Revised Accreditation Framework (RAF)."
        icon="📊"
      />

      <div style={{ maxWidth: 1200, margin: '32px auto 50px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        {/* Criteria Tabs */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, marginBottom: 24 }}>
          {criteriaData.map(c => (
            <button
              key={c.num}
              onClick={() => setActiveCriterion(c.num)}
              style={{
                background: activeCriterion === c.num ? NAVY : '#fff',
                color: activeCriterion === c.num ? '#fff' : NAVY,
                border: `1.5px solid ${activeCriterion === c.num ? NAVY : '#e2e8f0'}`,
                borderRadius: 12,
                padding: '12px 18px',
                fontSize: 13,
                fontWeight: 800,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: activeCriterion === c.num ? '0 4px 14px rgba(15,35,71,0.18)' : 'none',
                transition: 'all 0.18s ease'
              }}
            >
              <span>{c.icon}</span>
              <span>Criterion {c.num}</span>
            </button>
          ))}
        </div>

        {/* Active Criterion Detail Box */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '32px', boxShadow: '0 8px 24px rgba(15,35,71,0.06)', border: '1px solid #e2e8f0', marginBottom: 30 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div>
              <span style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 800 }}>
                CRITERION {curr.num}
              </span>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: NAVY, margin: '8px 0 4px' }}>
                {curr.icon} {curr.title}
              </h2>
            </div>
            <span style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '6px 14px', borderRadius: 20, fontSize: 12.5, fontWeight: 800 }}>
              {curr.score}
            </span>
          </div>

          <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.75, marginBottom: 24 }}>
            {curr.overview}
          </p>

          <h4 style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 12 }}>
            Key Institutional Benchmarks:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: 30 }}>
            {curr.highlights.map((h, i) => (
              <div key={i} style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', gap: 10 }}>
                <span style={{ color: '#047857', fontWeight: 900 }}>✓</span>
                <span style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.5 }}>{h}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 24 }}>
            <h4 style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 14 }}>
              📁 Supporting Evidence &amp; Metric Documents (Criterion {curr.num}):
            </h4>
            <NaacDocumentList categoryKey={curr.keyDoc} emptyMsg={`Metric files for Criterion ${curr.num} (${curr.title}) are currently being indexed.`} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   4. BEST PRACTICES & INSTITUTIONAL DISTINCTIVENESS
══════════════════════════════════════════════════════════════════════ */
export function NaacBestPracticesPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <PageHeader
        title="Best Practices & Institutional Distinctiveness"
        subtitle="Highlighting Guru Nanak College’s unique cultural ethos, minority education empowerment, and social responsibility in Dhanbad."
        icon="🌟"
      />

      <div style={{ maxWidth: 1140, margin: '32px auto 50px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        {/* Best Practice 1 */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '32px', boxShadow: '0 8px 24px rgba(15,35,71,0.06)', border: '1px solid #e2e8f0', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', background: '#eff6ff', color: '#1e40af', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>
            BEST PRACTICE — I
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: NAVY, margin: '0 0 14px' }}>
            Empowering Female Scholars of the Coalfield: Dedicated Bank More Morning Degree Wing
          </h3>
          <div style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.75 }}>
            <p><strong>1. Context:</strong> In the industrial coal-mining hub of Dhanbad, socio-economic factors and transportation challenges historically posed hurdles for young women seeking higher education after schooling.</p>
            <p style={{ marginTop: 10 }}><strong>2. Objectives:</strong> To create an exclusive, secure, and academic-intensive environment that enables female students from diverse backgrounds to pursue undergraduate degrees in Commerce, Arts, and Humanities without disruption to household or family responsibilities.</p>
            <p style={{ marginTop: 10 }}><strong>3. The Practice:</strong> Started in the year 2000, the Bank More Women’s Wing operates during dedicated morning hours in the heart of Dhanbad city. Equipped with qualified faculty, library facilities, and computer setups, it allows girls from across the district to access quality higher education.</p>
            <p style={{ marginTop: 10 }}><strong>4. Impact:</strong> Over 2,000+ female scholars graduate every cycle, with many qualifying for university merit ranks, competitive examinations, banking careers, and civil services.</p>
          </div>
        </div>

        {/* Best Practice 2 */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '32px', boxShadow: '0 8px 24px rgba(15,35,71,0.06)', border: '1px solid #e2e8f0', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', background: '#ecfdf5', color: '#047857', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>
            BEST PRACTICE — II
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: NAVY, margin: '0 0 14px' }}>
            "Sarbat Da Bhala" (Universal Welfare): Experiential Social Extension through NSS &amp; NCC
          </h3>
          <div style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.75 }}>
            <p><strong>1. Context:</strong> Academic degrees without social conscience are incomplete. Guru Nanak College blends academic curriculum with active community service rooted in the Sikh ideal of selfless service (Seva).</p>
            <p style={{ marginTop: 10 }}><strong>2. The Practice:</strong> 3 units of the National Service Scheme (NSS) and a dedicated wing of the 36 Jharkhand Battalion NCC conduct year-round community interventions: emergency blood donation drives, anti-plastic environmental rallies, adult literacy campaigns in adopted villages around Bhuda, and disaster relief.</p>
            <p style={{ marginTop: 10 }}><strong>3. Evidence of Success:</strong> College NSS volunteers have been honored by BBMKU and district authorities as leading blood donation contributors, and NCC cadets consistently participate in Republic Day and Independence Day parades.</p>
          </div>
        </div>

        {/* Institutional Distinctiveness */}
        <div style={{ background: 'linear-gradient(135deg, #0f2347, #1e3a8a)', color: '#fff', borderRadius: 20, padding: '36px', boxShadow: '0 12px 36px rgba(15,35,71,0.15)', marginBottom: 28 }}>
          <span style={{ background: 'rgba(244, 160, 35, 0.2)', color: GOLD, border: '1px solid rgba(244,160,35,0.4)', padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 800, textTransform: 'uppercase' }}>
            Institutional Distinctiveness
          </span>
          <h3 style={{ fontSize: 24, fontWeight: 900, color: '#fff', margin: '14px 0 16px' }}>
            Moral &amp; Ethical Character Building Anchored in Sri Guru Nanak Dev Ji’s Ideals
          </h3>
          <p style={{ fontSize: 15, color: '#e2e8f0', lineHeight: 1.8, margin: 0 }}>
            Guru Nanak College was established in 1970 to commemorate the 500th Birth Centenary of Sri Guru Nanak Dev Ji by the Gurudwara Prabandhak Committee, Dhanbad. What sets the institution distinctively apart from conventional degree colleges is its deep-rooted ethos: education must cultivate truthful living (Sach Achar), selfless service (Seva), and humility alongside professional competence.<br /><br />
            As a deficit grant minority institution open to scholars of all communities, castes, and creeds, the college provides affordable, non-commercial education, ensuring that coalfield families regardless of economic circumstance can fulfill their aspirations for modern degree and vocational excellence.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   5. SSR CYCLE 1 & 2
══════════════════════════════════════════════════════════════════════ */
export function SsrCyclePage({ cycle = 1 }) {
  const title = `SSR ${cycle}${cycle === 1 ? 'st' : 'nd'} Cycle`;
  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <PageHeader
        title={title}
        subtitle={`Complete Self Study Report, Peer Team Visit documentation, and NAAC Institutional Accreditation archives for Cycle ${cycle}.`}
        icon={cycle === 1 ? "🥇" : "🥈"}
      />
      <div style={{ maxWidth: 1140, margin: '32px auto 50px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: '28px 32px', boxShadow: '0 8px 24px rgba(15,35,71,0.06)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: '0 0 8px' }}>
            📜 Accreditation Cycle {cycle} Records
          </h3>
          <p style={{ fontSize: 13.5, color: '#64748b', margin: '0 0 20px' }}>
            Download or view verified Peer Team recommendations, institutional grade cards, and executive summaries.
          </p>
          <NaacDocumentList categoryKey={`cycle-${cycle}`} emptyMsg={`SSR Cycle ${cycle} documents are being synchronized.`} />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   6. AQAR REPORTS
══════════════════════════════════════════════════════════════════════ */
export function AqarPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <PageHeader
        title="Annual Quality Assurance Reports (AQAR)"
        subtitle="Annual quality benchmarks submitted by Guru Nanak College IQAC cell to the National Assessment and Accreditation Council."
        icon="📊"
      />
      <div style={{ maxWidth: 1140, margin: '32px auto 50px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: '28px 32px', boxShadow: '0 8px 24px rgba(15,35,71,0.06)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: '0 0 8px' }}>
            📁 AQAR Repository (2018–19 to 2024–25)
          </h3>
          <p style={{ fontSize: 13.5, color: '#64748b', margin: '0 0 20px' }}>
            Complete statutory annual reports detailing student progression, faculty achievements, financial allocation, and academic governance.
          </p>
          <NaacDocumentList categoryKey="aqar" emptyMsg="Annual Quality Assurance Reports (AQAR) will appear here." />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   7. NIRF RANKINGS
══════════════════════════════════════════════════════════════════════ */
export function NirfPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <PageHeader
        title="NIRF Institutional Data"
        subtitle="National Institutional Ranking Framework (Ministry of Education, Govt. of India) submission archives of Guru Nanak College."
      />
      <div style={{ maxWidth: 1140, margin: '32px auto 50px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: '28px 32px', boxShadow: '0 8px 24px rgba(15,35,71,0.06)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Building2 size={22} style={{ color: NAVY }} /> NIRF Data Submissions
          </h3>
          <p style={{ fontSize: 13.5, color: '#64748b', margin: '0 0 20px' }}>
            Standard data submitted under Teaching, Learning and Resources (TLR), Research and Professional Practice (RPC), and Graduation Outcomes (GO).
          </p>
          <NaacDocumentList categoryKey="nirf" emptyMsg="NIRF institutional data and audit files will appear here." />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   8. PERSPECTIVE PLAN
══════════════════════════════════════════════════════════════════════ */
export function PerspectivePlan() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <PageHeader
        title="Institutional Perspective Plan"
        subtitle="The strategic roadmap and future vision of Guru Nanak College for academic, infrastructural, and research growth."
        icon="🗺️"
      />
      <div style={{ maxWidth: 1140, margin: '32px auto 50px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.05)', marginBottom: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: NAVY, marginBottom: 14 }}>
            Strategic 10-Year Quality Roadmap
          </h2>
          <p style={{ color: '#475569', lineHeight: 1.8, fontSize: 15, marginBottom: 20 }}>
            Our Perspective Plan outlines key developmental horizons for the next decade, with a focus on complete NEP-2020 digitization, introduction of master’s programs in Commerce and Computer Applications, establishing a dedicated research incubation center, expanding Bank More campus facilities, and achieving excellence in NAAC Cycle 3.
          </p>
          <NaacDocumentList categoryKey="perspective" emptyMsg="Strategic plan documents will appear here." />
        </div>
      </div>
    </div>
  );
}