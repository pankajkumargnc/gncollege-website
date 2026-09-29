// src/pages/AcademicsPages.jsx
// 🎓 Comprehensive Academic Systems for Guru Nanak College, Dhanbad
// Affiliated to Binod Bihari Mahto Koyalanchal University (BBMKU) & AICTE Recognized

import React, { useState, useEffect, useRef, lazy, Suspense, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import usePageContent from '../hooks/usePageContent';
import { splitHeading } from '../utils/splitTitle';
import {
  TrendingUp, Target, BarChart3, Wrench, FileText, GraduationCap,
  BookOpen, FolderOpen, Calendar, Sun, Rocket, Banknote, Download, 
  ArrowUpRight, Laptop, Briefcase, Award, Shield, CheckCircle2, Search, 
  X, Sparkles, ExternalLink, Eye, ChevronRight, ArrowRight, Layers, 
  Users, Clock, Building, School, Check, Bookmark, Share2,
  LayoutGrid, Table as TableIcon
} from 'lucide-react';
import { 
  BBMKU_SYLLABI, 
  ACADEMIC_CALENDAR_EVENTS, 
  OFFICIAL_HOLIDAYS_2026 
} from '../data/syllabusData';
import toast from 'react-hot-toast';

const PDFModal = lazy(() => import('../components/PDFModal'));

const NAVY = COLORS?.navy || '#0B1F3A';
const GOLD = COLORS?.gold || '#F4B942';

/* ─── Shared Scroll Animation (Fade In) ─── */
function Fade({ children, delay = 0, y = 20 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0, transform: vis ? 'none' : `translateY(${y}px)`,
      transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`
    }}>
      {children}
    </div>
  );
}

/* ─── Shared Hero Header ─── */
/* ─── Shared Hero Header (Unified Student Corner Signature Standard) ─── */
const PageHeader = ({ title, subtitle, icon, badge = "Academic Excellence • NEP 2020" }) => (
  <header style={{
    background: 'linear-gradient(135deg, #0B1F3A 0%, #1a3a6b 100%)',
    color: '#ffffff',
    padding: 'clamp(44px, 7vw, 76px) 20px clamp(40px, 6vw, 60px)',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(circle at 80% 20%, rgba(244, 160, 35, 0.16) 0%, transparent 60%)',
      pointerEvents: 'none'
    }} />
    <Fade>
      <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          background: 'rgba(244, 160, 35, 0.15)',
          border: '1px solid rgba(244, 160, 35, 0.35)',
          borderRadius: 30,
          padding: '5px 16px',
          fontSize: 11.5,
          fontWeight: 800,
          color: '#F4B942',
          marginBottom: 16,
          letterSpacing: '0.8px',
          textTransform: 'uppercase'
        }}>
          <Sparkles size={13} /> {badge}
        </div>

        {icon && (
          <div style={{
            width: 58,
            height: 58,
            borderRadius: 16,
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1.5px solid rgba(244, 160, 35, 0.4)',
            color: '#F4B942',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 14,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
          }}>
            {icon}
          </div>
        )}

        <h1 style={{
          fontSize: 'clamp(26px, 4.8vw, 44px)',
          fontWeight: 900,
          lineHeight: 1.18,
          letterSpacing: '-0.8px',
          margin: '0 auto 12px',
          color: '#ffffff',
          textAlign: 'center'
        }}>
          {splitHeading(title)}
        </h1>
        {subtitle && (
          <p style={{
            fontSize: 'clamp(14px, 1.8vw, 16.5px)',
            color: '#cbd5e1',
            maxWidth: 720,
            lineHeight: 1.6,
            margin: '0 auto'
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </Fade>
  </header>
);

/* ════════════════════════════════════════════════════════════
   1. IQAC (Internal Quality Assurance Cell)
════════════════════════════════════════════════════════════ */
export function IqacPage() {
  const [docs, setDocs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  
  useEffect(() => {
    if (!db) return;
    try {
      const q = query(collection(db, 'pdfReports'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, snap => {
        const allDocs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setDocs(allDocs.filter(d => 
          (d.title || '').toLowerCase().includes('aqar') || 
          (d.targetPage || '').toLowerCase().includes('iqac') ||
          (d.title || '').toLowerCase().includes('naac')
        ));
      }, () => {});
      return () => unsub();
    } catch {}
  }, []);

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <PageHeader 
        title="Internal Quality Assurance Cell (IQAC)" 
        subtitle="Sustaining institutional quality culture, academic audits, and NAAC accreditation benchmarks." 
        badge="Quality Assurance"
        icon={<TrendingUp size={36} color={GOLD} />} 
      />
      
      <div style={{ maxWidth: 1200, margin: '36px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 24, marginBottom: 50 }}>
          {[
            { i: <Target size={28} color="#0284c7" />, t: 'Quality Benchmarks', d: 'Formulating academic parameters and continuous learner assessment systems.', color: '#0284c7' },
            { i: <BarChart3 size={28} color="#059669" />, t: 'Stakeholder Feedback', d: 'Systematic feedback analysis from students, teachers, parents, and recruiters.', color: '#059669' },
            { i: <Wrench size={28} color="#7c3aed" />, t: 'Workshops & FDPs', d: 'Capacity-building faculty development programs and modern pedagogy bootcamps.', color: '#7c3aed' }
          ].map((b, i) => (
            <Fade key={i} delay={i * 0.1}>
              <div 
                className="gnc-hover-card"
                style={{ 
                  padding: 32, 
                  height: '100%',
                  '--card-accent': b.color,
                  '--card-glow': `${b.color}35`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div className="card-top-bar" />
                <div>
                  <div className="card-icon-box" style={{ 
                    marginBottom: 20, 
                    background: `${b.color}15`, 
                    width: 58, 
                    height: 58, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    borderRadius: 16 
                  }}>
                    {b.i}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: '0 0 10px' }}>{b.t}</h3>
                  <p style={{ color: '#64748B', fontSize: 14.5, margin: 0, lineHeight: 1.6 }}>{b.d}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>

        <Fade delay={0.2}>
          <div style={{ background: '#ffffff', borderRadius: 24, padding: '36px 32px', border: '1.5px solid #e2e8f0', boxShadow: '0 8px 30px rgba(11,31,58,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: NAVY, margin: '0 0 4px' }}>AQAR &amp; Institutional Quality Reports</h2>
                <p style={{ fontSize: 13.5, color: '#64748B', margin: 0 }}>Statutory NAAC &amp; IQAC documentation published for institutional compliance.</p>
              </div>
            </div>

            {docs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: '#F8FAFC', borderRadius: 16, border: '1.5px dashed #cbd5e1' }}>
                <FolderOpen size={36} color="#94a3b8" style={{ marginBottom: 10 }} />
                <div style={{ fontSize: 15, fontWeight: 800, color: NAVY, marginBottom: 4 }}>No reports uploaded yet</div>
                <div style={{ fontSize: 13, color: '#64748B' }}>Reports published via Admin Panel → Documents will appear here automatically.</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 18 }}>
                {docs.map(d => (
                  <div 
                    key={d.id} 
                    className="gnc-hover-card"
                    style={{
                      padding: 20,
                      '--card-accent': '#0284c7',
                      '--card-glow': 'rgba(2, 132, 199, 0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div className="card-top-bar" />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <FileText size={18} color="#0284c7" />
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: 6 }}>
                          Official Report
                        </span>
                      </div>
                      <h4 style={{ fontSize: 15, fontWeight: 800, color: NAVY, margin: '0 0 8px', lineHeight: 1.35 }}>
                        {d.title}
                      </h4>
                    </div>
                    <button
                      onClick={() => setSelectedPdf({ url: d.link, title: d.title })}
                      style={{
                        background: 'linear-gradient(135deg, #0B1F3A, #1a3a6b)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 10,
                        padding: '8px 14px',
                        fontSize: 12.5,
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        marginTop: 14
                      }}
                    >
                      <Eye size={14} /> View Report
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Fade>
      </div>

      {selectedPdf && (
        <Suspense fallback={null}>
          <PDFModal url={selectedPdf.url} title={selectedPdf.title} onClose={() => setSelectedPdf(null)} />
        </Suspense>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   2. COURSE OFFERED (NEP-2020 / FYUGP Framework)
════════════════════════════════════════════════════════════ */
export function CourseOffered() {
  const [activeFaculty, setActiveFaculty] = useState('all');
  const [viewMode, setViewMode] = useState('card'); // 'card' | 'table'

  const nepPathways = [
    { year: '1st Year', exit: 'UG Certificate', credits: '40 Credits', color: '#0284c7', desc: 'Entry with 10+2. Exit option with Undergraduate Certificate in Major discipline.' },
    { year: '2nd Year', exit: 'UG Diploma', credits: '80 Credits', color: '#059669', desc: '2-Year core modules & practicals. Exit option with Undergraduate Diploma.' },
    { year: '3rd Year', exit: "Bachelor's Degree", credits: '120 Credits', color: '#7c3aed', desc: 'Complete 3-year curriculum. Awarded full Bachelor of Arts / Commerce / IT Degree.' },
    { year: '4th Year', exit: 'Honours with Research', credits: '160 Credits', color: '#d97706', desc: 'Specialized 8th semester dissertation / capstone research. Direct eligibility for Ph.D.' }
  ];

  const coursesList = [
    // AICTE Wings
    {
      id: 'bca',
      faculty: 'aicte',
      title: 'Bachelor of Computer Applications (BCA)',
      badge: '★ AICTE Approved',
      accent: '#0284c7',
      duration: '3-Year Professional Degree (6 Semesters)',
      intake: '90 Seats',
      eligibility: '10+2 / Intermediate in any stream with Mathematics / Computer Science / Statistics (Min 45% aggregate).',
      curriculum: 'C/C++, Java, Python, Web Dev, RDBMS, AI & Machine Learning, Cloud Computing, Cyber Security, Capstone Project.',
      careers: 'Software Developer, Full Stack Engineer, Cloud Architect, Systems Analyst, Database Administrator.',
      syllabusHref: '/syllabus?filter=BCA'
    },
    {
      id: 'bba',
      faculty: 'aicte',
      title: 'Bachelor of Business Administration (BBA)',
      badge: '★ AICTE Approved',
      accent: '#2563eb',
      duration: '3-Year Professional Degree (6 Semesters)',
      intake: '90 Seats',
      eligibility: '10+2 / Intermediate in Arts, Science, or Commerce with minimum 45% marks.',
      curriculum: 'Principles of Management, Marketing, HRM, Corporate Finance, Business Law, Entrepreneurship, Digital Marketing.',
      careers: 'Marketing Executive, HR Business Partner, Financial Analyst, Retail Manager, Startup Founder.',
      syllabusHref: '/syllabus?filter=BBA'
    },

    // Commerce Faculty
    {
      id: 'bcom',
      faculty: 'commerce',
      title: 'Bachelor of Commerce (B.Com Honours)',
      badge: 'FYUGP NEP-2020',
      accent: '#059669',
      duration: '4-Year NEP FYUGP (8 Semesters)',
      intake: '360 Seats',
      eligibility: '10+2 / Intermediate in Commerce or Science with minimum qualifying marks.',
      curriculum: 'Advanced Financial Accounting, Corporate Law, Cost & Management Accounting, Auditing & GST, Tally Prime.',
      careers: 'Chartered Accountant (CA Foundation), Tax Consultant, Auditor, Financial Controller, Banking Officer.',
      syllabusHref: '/syllabus?filter=Commerce'
    },

    // Humanities
    {
      id: 'ba-eng',
      faculty: 'humanities',
      title: 'B.A. (Major in English Literature & Linguistics)',
      badge: 'FYUGP NEP-2020',
      accent: '#7c3aed',
      duration: '4-Year NEP FYUGP (8 Semesters)',
      intake: '150 Seats',
      eligibility: '10+2 / Intermediate in any stream with English as a compulsory subject.',
      curriculum: 'British Literature, Indian Writing in English, Literary Criticism, Applied Phonetics, Creative & Media Writing.',
      careers: 'Content Strategist, Corporate Communications, Civil Services, Journalism & Mass Media, Educator.',
      syllabusHref: '/syllabus?filter=English'
    },
    {
      id: 'ba-hin',
      faculty: 'humanities',
      title: 'B.A. (Major in Hindi Literature - हिन्दी साहित्य)',
      badge: 'FYUGP NEP-2020',
      accent: '#9333ea',
      duration: '4-Year NEP FYUGP (8 Semesters)',
      intake: '150 Seats',
      eligibility: '10+2 / Intermediate in any stream with Hindi.',
      curriculum: 'हिन्दी साहित्य का इतिहास, मध्यकालीन काव्य, आधुनिक गद्य, भाषा विज्ञान, अनुवाद सिद्धान्त एवं जनसंचार।',
      careers: 'राजभाषा अधिकारी (Official Language Officer), पत्रकारिता, अध्यापन, सिविल सेवा, सम्पादन कार्य।',
      syllabusHref: '/syllabus?filter=Hindi'
    },

    // Social Sciences
    {
      id: 'ba-his',
      faculty: 'social-science',
      title: 'B.A. (Major in History & Archaeological Studies)',
      badge: 'FYUGP NEP-2020',
      accent: '#d97706',
      duration: '4-Year NEP FYUGP (8 Semesters)',
      intake: '180 Seats',
      eligibility: '10+2 / Intermediate in Arts, Science, or Commerce.',
      curriculum: 'Ancient, Medieval & Modern Indian History, History of Jharkhand & Tribal Resistance, Modern World History.',
      careers: 'Civil Services (UPSC / JPSC), Heritage Management, Archival Officer, Museum Curator, Teacher.',
      syllabusHref: '/syllabus?filter=History'
    },
    {
      id: 'ba-pol',
      faculty: 'social-science',
      title: 'B.A. (Major in Political Science & Public Governance)',
      badge: 'FYUGP NEP-2020',
      accent: '#b45309',
      duration: '4-Year NEP FYUGP (8 Semesters)',
      intake: '180 Seats',
      eligibility: '10+2 / Intermediate in any stream.',
      curriculum: 'Indian Constitution & Polity, Political Theory, Comparative Politics, International Relations, Public Administration.',
      careers: 'Public Policy Analyst, Legal Studies, Civil Services, Political Consulting, Non-Profit Governance.',
      syllabusHref: '/syllabus?filter=Political'
    },
    {
      id: 'ba-eco',
      faculty: 'social-science',
      title: 'B.A. (Major in Economics & Public Policy)',
      badge: 'FYUGP NEP-2020',
      accent: '#ea580c',
      duration: '4-Year NEP FYUGP (8 Semesters)',
      intake: '120 Seats',
      eligibility: '10+2 / Intermediate with Mathematics or Economics preferred.',
      curriculum: 'Micro & Macroeconomics, Statistical Analytics, Public Finance, Indian Economy & Banking, Econometrics Basics.',
      careers: 'Economic Research Analyst, Banking Specialist, Data Analyst, Market Researcher, Civil Services.',
      syllabusHref: '/syllabus?filter=Economics'
    },
    {
      id: 'ba-psy',
      faculty: 'social-science',
      title: 'B.A. (Major in Psychology & Behavioral Science)',
      badge: 'FYUGP NEP-2020',
      accent: '#c2410c',
      duration: '4-Year NEP FYUGP (8 Semesters)',
      intake: '60 Seats',
      eligibility: '10+2 / Intermediate in any stream.',
      curriculum: 'General Psychology, Biopsychology, Social Psychology, Cognitive Testing Laboratory, Abnormal Psychology.',
      careers: 'Counseling Psychologist, Child Guidance Specialist, HR Talent Assessor, Clinical Research Assistant.',
      syllabusHref: '/syllabus?filter=Psychology'
    }
  ];

  const filteredCourses = activeFaculty === 'all' 
    ? coursesList 
    : coursesList.filter(c => c.faculty === activeFaculty);

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <PageHeader 
        title="Courses & Programs Offered" 
        subtitle="Four Year Undergraduate Programme (FYUGP) under NEP-2020 alongside 3-Year AICTE approved BCA & BBA professional degrees (90 seats each)."
        badge="NEP-2020 Curricular Framework"
        icon={<GraduationCap size={36} color={GOLD} />} 
      />
      
      <div style={{ maxWidth: viewMode === 'table' ? 1440 : 1240, margin: '30px auto 70px', padding: '0 20px', position: 'relative', zIndex: 10, transition: 'max-width 0.25s ease' }}>
        
        {/* NEP 4-Stage Progressive Pathway Timeline */}
        <Fade>
          <div style={{
            background: '#ffffff',
            borderRadius: 18,
            padding: '20px 24px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 6px 20px rgba(11,31,58,0.03)',
            marginBottom: 28
          }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <span style={{
                fontSize: 10.5,
                fontWeight: 800,
                color: '#0284c7',
                background: '#e0f2fe',
                padding: '3px 10px',
                borderRadius: 16,
                textTransform: 'uppercase',
                letterSpacing: '0.6px'
              }}>
                Multiple Entry &amp; Exit System
              </span>
              <h2 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: '6px 0 2px' }}>
                4-Year FYUGP Degree Architecture (NEP 2020)
              </h2>
              <p style={{ fontSize: 12.5, color: '#64748B', margin: 0 }}>
                Flexibility to enter, exit with recognized credentials, or continue toward a research degree.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: 12
            }}>
              {nepPathways.map((item, i) => (
                <div 
                  key={i} 
                  className="gnc-hover-card"
                  style={{
                    padding: '14px 16px',
                    '--card-accent': item.color,
                    '--card-glow': `${item.color}30`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div className="card-top-bar" />
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 900, color: item.color, background: `${item.color}15`, padding: '2px 6px', borderRadius: 6 }}>
                        {item.year}
                      </span>
                      <span style={{ fontSize: 10.5, fontWeight: 800, color: '#64748B' }}>
                        {item.credits}
                      </span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: NAVY, marginBottom: 4 }}>
                      {item.exit}
                    </div>
                    <div style={{ fontSize: 11.5, color: '#64748B', lineHeight: 1.45 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Fade>

        {/* Faculty Category Filter Tabs & View Mode Switcher */}
        <Fade delay={0.1}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
            marginBottom: 20
          }}>
            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              {[
                { id: 'all', label: `All Programs (${coursesList.length})` },
                { id: 'aicte', label: '🚀 AICTE Vocational (BCA & BBA)' },
                { id: 'commerce', label: '💼 Commerce (B.Com)' },
                { id: 'humanities', label: '📖 Humanities (English, Hindi, etc.)' },
                { id: 'social-science', label: '🏛️ Social Sciences (History, Pol Sci, Eco)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFaculty(tab.id)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 24,
                    border: activeFaculty === tab.id ? '1px solid #0B1F3A' : '1px solid #e2e8f0',
                    background: activeFaculty === tab.id ? '#0B1F3A' : '#ffffff',
                    color: activeFaculty === tab.id ? '#ffffff' : '#475569',
                    fontSize: 12,
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: activeFaculty === tab.id ? '0 4px 10px rgba(11,31,58,0.18)' : 'none'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle: Card vs Table */}
            <div className="gnc-view-toggle">
              <button
                type="button"
                className={`gnc-view-btn ${viewMode === 'card' ? 'active' : ''}`}
                onClick={() => setViewMode('card')}
                title="Grid Card View"
                aria-label="Grid Card View"
              >
                <LayoutGrid size={14} /> Card View
              </button>
              <button
                type="button"
                className={`gnc-view-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Tabular Data View"
                aria-label="Tabular Data View"
              >
                <TableIcon size={14} /> Table View
              </button>
            </div>
          </div>
        </Fade>

        {/* View Mode 1: Course Cards Grid */}
        {viewMode === 'card' && (
          <div className="anim-fade-in">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 16
            }}>
              {filteredCourses.map(course => (
                <div
                  key={course.id}
                  className="gnc-course-card"
                  style={{
                    padding: '16px 18px',
                    '--card-accent': course.accent,
                    '--card-glow': `${course.accent}30`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div className="course-top-bar" />
                  
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{
                        fontSize: 10.5,
                        fontWeight: 800,
                        color: course.accent,
                        background: `${course.accent}15`,
                        border: `1px solid ${course.accent}30`,
                        padding: '2px 8px',
                        borderRadius: 6
                      }}>
                        {course.badge}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>
                        {course.intake}
                      </span>
                    </div>

                    <h3 style={{ fontSize: 15.5, fontWeight: 900, color: NAVY, margin: '0 0 4px', lineHeight: 1.3 }}>
                      {course.title}
                    </h3>

                    <div style={{ fontSize: 11, color: course.accent, fontWeight: 700, marginBottom: 10 }}>
                      {course.duration}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11.5, color: '#475569' }}>
                      <div>
                        <strong style={{ color: NAVY }}>Eligibility: </strong>
                        {course.eligibility}
                      </div>
                      <div>
                        <strong style={{ color: NAVY }}>Curriculum: </strong>
                        {course.curriculum}
                      </div>
                      <div>
                        <strong style={{ color: NAVY }}>Careers: </strong>
                        {course.careers}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    marginTop: 14,
                    paddingTop: 12,
                    borderTop: '1px solid #f1f5f9',
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center'
                  }}>
                    <Link
                      to={course.syllabusHref}
                      style={{
                        flex: 1,
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        color: NAVY,
                        borderRadius: 8,
                        padding: '7px 10px',
                        fontSize: 11.5,
                        fontWeight: 800,
                        textDecoration: 'none',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 5,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <BookOpen size={13} /> View Syllabus
                    </Link>

                    <a
                      href="https://universities.jharkhand.gov.in/home"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        background: `linear-gradient(135deg, ${NAVY}, #1e3a8a)`,
                        color: '#ffffff',
                        borderRadius: 8,
                        padding: '7px 10px',
                        fontSize: 11.5,
                        fontWeight: 800,
                        textDecoration: 'none',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 5
                      }}
                    >
                      <span>Apply Online</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View Mode 2: Course Table View */}
        {viewMode === 'table' && (
          <div className="anim-fade-in">
            <div className="gnc-table-wrapper" style={{ width: '100%' }}>
              <table className="gnc-data-table" style={{ width: '100%', tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    <th style={{ width: 44, textAlign: 'center' }}>#</th>
                    <th style={{ minWidth: 200 }}>Program &amp; Degree</th>
                    <th style={{ width: 135, whiteSpace: 'nowrap' }}>Model / Framework</th>
                    <th style={{ width: 140, whiteSpace: 'nowrap' }}>Duration</th>
                    <th style={{ width: 95, textAlign: 'center', whiteSpace: 'nowrap' }}>Intake</th>
                    <th>Eligibility Criteria</th>
                    <th>Curriculum Highlights</th>
                    <th style={{ width: 170, textAlign: 'center', whiteSpace: 'nowrap' }}>Official Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((c, i) => (
                    <tr key={c.id}>
                      <td style={{ textAlign: 'center', fontWeight: 800, color: '#94a3b8' }}>
                        {i + 1}
                      </td>
                      <td>
                        <div style={{ fontWeight: 800, color: NAVY, fontSize: 13.5, marginBottom: 4 }}>
                          {c.title}
                        </div>
                        <span style={{
                          display: 'inline-block',
                          fontSize: 10,
                          fontWeight: 800,
                          color: c.accent,
                          background: `${c.accent}15`,
                          padding: '2px 8px',
                          borderRadius: 6,
                          border: `1px solid ${c.accent}30`
                        }}>
                          {c.id.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          fontSize: 11,
                          fontWeight: 800,
                          color: c.accent,
                          background: `${c.accent}12`,
                          padding: '3px 9px',
                          borderRadius: 12,
                          whiteSpace: 'nowrap'
                        }}>
                          {c.badge}
                        </span>
                      </td>
                      <td style={{ fontWeight: 700, color: NAVY, fontSize: 12.5, whiteSpace: 'nowrap' }}>
                        {c.duration}
                      </td>
                      <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          fontWeight: 900,
                          color: NAVY,
                          background: '#f1f5f9',
                          padding: '4px 10px',
                          borderRadius: 8,
                          fontSize: 12
                        }}>
                          <Users size={12} color="#64748b" /> {c.intake}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: '#475569', lineHeight: 1.45 }}>
                        {c.eligibility}
                      </td>
                      <td style={{ fontSize: 12, color: '#64748b', lineHeight: 1.4 }}>
                        {c.curriculum}
                      </td>
                      <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                          <Link
                            to={c.syllabusHref}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 5,
                              background: '#0B1F3A',
                              color: '#ffffff',
                              padding: '6px 12px',
                              borderRadius: 8,
                              fontSize: 11.5,
                              fontWeight: 800,
                              textDecoration: 'none',
                              transition: 'all 0.2s ease',
                              boxShadow: '0 2px 6px rgba(11,31,58,0.2)'
                            }}
                          >
                            <BookOpen size={12} /> Syllabus ›
                          </Link>
                          <a
                            href="https://universities.jharkhand.gov.in/home"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              background: '#f1f5f9',
                              color: NAVY,
                              border: '1px solid #cbd5e1',
                              padding: '6px 10px',
                              borderRadius: 8,
                              fontSize: 11.5,
                              fontWeight: 800,
                              textDecoration: 'none',
                              transition: 'all 0.2s ease'
                            }}
                            title="Chancellor Portal Apply"
                          >
                            <span>Apply</span>
                            <ExternalLink size={11} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   3. SYLLABUS DATABASE (Official University & GNC Comprehensive Archive)
════════════════════════════════════════════════════════════ */
export function Syllabus() {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';

  const [search, setSearch] = useState('');
  const [activeDept, setActiveDept] = useState(initialFilter);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [uploadedSyllabi, setUploadedSyllabi] = useState([]);
  const [viewMode, setViewMode] = useState('card'); // 'card' | 'table'

  // Live Fetch from Firebase pdfReports (type: 'syllabus')
  useEffect(() => {
    if (!db) return;
    try {
      const q = query(collection(db, 'pdfReports'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, snap => {
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        const list = docs.filter(d => (d.type || '').toLowerCase() === 'syllabus');
        setUploadedSyllabi(list);
      }, () => {});
      return () => unsub();
    } catch {}
  }, []);

  // Merge static syllabi with any dynamic uploaded ones
  const allSyllabi = useMemo(() => {
    const formattedDynamic = uploadedSyllabi.map(doc => ({
      id: `dyn_${doc.id}`,
      title: doc.title || 'Official Department Syllabus',
      subtitle: doc.desc || 'Uploaded via GNC Document Vault',
      code: 'GNC-DOC-VAULT',
      dept: 'uploaded',
      faculty: 'GNC Academic Vault',
      duration: '4-Year FYUGP / CBCS',
      credits: 'University Approved',
      badge: 'College Vault',
      badgeColor: '#0284c7',
      badgeBg: '#e0f2fe',
      accent: '#0284c7',
      glow: 'rgba(2, 132, 199, 0.3)',
      icon: 'BookOpen',
      description: doc.desc || 'Official academic curriculum uploaded by Guru Nanak College administrative desk.',
      highlights: ['University Approved Syllabus', 'Direct PDF Download available'],
      semesters: 'Semester Wise',
      viewUrl: doc.link,
      downloadUrl: doc.link,
      fileSize: 'PDF Document'
    }));

    return [...BBMKU_SYLLABI, ...formattedDynamic];
  }, [uploadedSyllabi]);

  // Filtered Syllabi
  const filtered = useMemo(() => {
    return allSyllabi.filter(item => {
      // Dept Tab filter
      if (activeDept !== 'all') {
        const matchesFilter = 
          item.dept === activeDept || 
          item.title.toLowerCase().includes(activeDept.toLowerCase()) ||
          item.faculty.toLowerCase().includes(activeDept.toLowerCase());
        if (!matchesFilter) return false;
      }

      // Search Query
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.faculty.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allSyllabi, activeDept, search]);

  const handleOpenPdf = (item) => {
    if (item.viewUrl) {
      setSelectedPdf({ url: item.viewUrl, title: item.title });
    } else {
      toast.error('PDF link unavailable for this syllabus.');
    }
  };

  const handleDownloadPdf = (item, e) => {
    e.stopPropagation();
    if (item.downloadUrl) {
      window.open(item.downloadUrl, '_blank', 'noopener,noreferrer');
      toast.success(`Opening ${item.title} syllabus...`);
    } else {
      toast.error('Download link not found.');
    }
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <PageHeader 
        title="Official Syllabus Database" 
        subtitle="Official university curricula for Arts, Commerce, and 3-Year AICTE Professional BCA & BBA Degrees (90 Seats each)."
        badge="University &amp; NEP Curricula"
        icon={<BookOpen size={36} color={GOLD} />} 
      />
      
      <div style={{ maxWidth: 1240, margin: '30px auto 70px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        
        {/* Quick Stats Strip */}
        <Fade>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
            marginBottom: 24
          }}>
            {[
              { num: '14+', label: 'Undergraduate Syllabi', icon: Layers, color: '#0284c7' },
              { num: '90 Seats', label: 'BCA & BBA (3-Yr AICTE)', icon: Laptop, color: '#2563eb' },
              { num: 'Sem I–VI/VIII', label: 'Complete Semester Coverage', icon: Clock, color: '#059669' },
              { num: '1-Click', label: 'Instant PDF Viewer & Download', icon: Download, color: '#d97706' }
            ].map((st, idx) => {
              const StIcon = st.icon;
              return (
                <div
                  key={idx}
                  className="gnc-hover-card"
                  style={{
                    padding: '12px 14px',
                    '--card-accent': st.color,
                    '--card-glow': `${st.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10
                  }}
                >
                  <div className="card-top-bar" />
                  <div className="card-icon-box" style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: `${st.color}15`,
                    color: st.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <StIcon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: NAVY, lineHeight: 1.1 }}>
                      {st.num}
                    </div>
                    <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, marginTop: 2 }}>
                      {st.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Fade>

        {/* Search Bar & Department Filter Tabs */}
        <Fade delay={0.1}>
          <div style={{
            background: '#ffffff',
            borderRadius: 18,
            padding: '16px 20px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 6px 20px rgba(11, 31, 58, 0.03)',
            marginBottom: 24
          }}>
            {/* Search Input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#F8FAFC',
              border: '1px solid #cbd5e1',
              borderRadius: 10,
              padding: '8px 14px',
              marginBottom: 12
            }}>
              <Search size={18} color="#94a3b8" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by subject, code, or keyword (e.g. BCA, Java, Accounts, History, VAC)..."
                aria-label="Search Syllabus Database"
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: NAVY,
                  background: 'transparent',
                  width: '100%'
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', color: '#94a3b8' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Department Filter Tabs & View Mode Switcher */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12
            }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'All Subjects' },
                  { id: 'bca', label: '🚀 BCA (AICTE)' },
                  { id: 'bba', label: '📊 BBA (AICTE)' },
                  { id: 'commerce', label: '💼 Commerce' },
                  { id: 'humanities', label: '📖 Humanities' },
                  { id: 'social-science', label: '🏛️ Social Sciences' },
                  { id: 'nep-common', label: '🧩 NEP Common (VAC/SEC/AEC/MDC)' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setActiveDept(f.id)}
                    style={{
                      padding: '6px 13px',
                      borderRadius: 24,
                      border: activeDept === f.id ? '1px solid #0B1F3A' : '1px solid #e2e8f0',
                      background: activeDept === f.id ? '#0B1F3A' : '#ffffff',
                      color: activeDept === f.id ? '#ffffff' : '#475569',
                      fontSize: 11.5,
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: activeDept === f.id ? '0 3px 8px rgba(11,31,58,0.18)' : 'none'
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle: Card vs Table */}
              <div className="gnc-view-toggle">
                <button
                  type="button"
                  className={`gnc-view-btn ${viewMode === 'card' ? 'active' : ''}`}
                  onClick={() => setViewMode('card')}
                  title="Grid Card View"
                  aria-label="Grid Card View"
                >
                  <LayoutGrid size={14} /> Card View
                </button>
                <button
                  type="button"
                  className={`gnc-view-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                  title="Tabular Data View"
                  aria-label="Tabular Data View"
                >
                  <TableIcon size={14} /> Table View
                </button>
              </div>
            </div>
          </div>
        </Fade>

        {/* Syllabi Display (Cards vs Table) */}
        <Fade delay={0.2}>
          {filtered.length > 0 ? (
            viewMode === 'card' ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                gap: 16
              }}>
                {filtered.map(item => (
                  <div
                    key={item.id}
                    className="gnc-syllabus-card"
                    style={{
                      padding: '16px 18px',
                      '--card-accent': item.accent,
                      '--card-glow': `${item.accent}30`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div className="syllabus-top-bar" />

                    <div>
                      {/* Header with Badges */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
                        <span style={{
                          fontSize: 10.5,
                          fontWeight: 800,
                          color: item.badgeColor,
                          background: item.badgeBg,
                          border: `1px solid ${item.badgeColor}30`,
                          padding: '2px 8px',
                          borderRadius: 6
                        }}>
                          {item.badge}
                        </span>
                        <span style={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8' }}>
                          {item.credits}
                        </span>
                      </div>

                      <h3 style={{ fontSize: 15.5, fontWeight: 900, color: NAVY, margin: '0 0 2px', lineHeight: 1.3 }}>
                        {item.title}
                      </h3>
                      <div style={{ fontSize: 11, color: item.accent, fontWeight: 700, marginBottom: 8 }}>
                        {item.subtitle}
                      </div>

                      <p style={{
                        fontSize: 12,
                        color: '#64748B',
                        lineHeight: 1.45,
                        margin: '0 0 10px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {item.description}
                      </p>

                      {/* Paper Highlights */}
                      <div style={{
                        background: '#F8FAFC',
                        borderRadius: 10,
                        padding: '8px 10px',
                        marginBottom: 10,
                        border: '1px solid #f1f5f9'
                      }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: NAVY, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                          Key Curricular Modules:
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          {item.highlights.slice(0, 3).map((hl, i) => (
                            <div key={i} style={{ fontSize: 11, color: '#475569', display: 'flex', alignItems: 'center', gap: 5 }}>
                              <Check size={11} color={item.accent} style={{ flexShrink: 0 }} />
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Dual Action Buttons: View & Download */}
                    <div style={{
                      marginTop: 10,
                      paddingTop: 10,
                      borderTop: '1px solid #f1f5f9',
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center'
                    }}>
                      <button
                        onClick={() => handleOpenPdf(item)}
                        style={{
                          flex: 1,
                          background: `linear-gradient(135deg, ${item.accent}, #0B1F3A)`,
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: 8,
                          padding: '7px 10px',
                          fontSize: 12,
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 5,
                          boxShadow: `0 3px 8px ${item.accent}30`
                        }}
                      >
                        <Eye size={13} /> View Syllabus
                      </button>

                      <button
                        onClick={(e) => handleDownloadPdf(item, e)}
                        title="Download PDF"
                        aria-label="Download PDF"
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #cbd5e1',
                          color: NAVY,
                          borderRadius: 8,
                          padding: '7px 10px',
                          fontSize: 12,
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 5
                        }}
                      >
                        <Download size={13} />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="gnc-table-wrapper">
                <table className="gnc-data-table">
                  <thead>
                    <tr>
                      <th style={{ width: 45, textAlign: 'center' }}>#</th>
                      <th>Curriculum &amp; Program</th>
                      <th>Code &amp; Scheme</th>
                      <th>Faculty / Stream</th>
                      <th>Structure &amp; Credits</th>
                      <th>Semesters Covered</th>
                      <th>Format</th>
                      <th style={{ textAlign: 'center' }}>Read / Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item, i) => (
                      <tr key={item.id}>
                        <td style={{ textAlign: 'center', fontWeight: 800, color: '#94a3b8' }}>
                          {i + 1}
                        </td>
                        <td>
                          <div style={{ fontWeight: 800, color: NAVY, fontSize: 13.5, marginBottom: 3 }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: 11, color: item.accent, fontWeight: 700 }}>
                            {item.subtitle}
                          </div>
                        </td>
                        <td>
                          <span style={{
                            display: 'inline-block',
                            fontSize: 10.5,
                            fontWeight: 800,
                            color: '#334155',
                            background: '#f1f5f9',
                            padding: '3px 8px',
                            borderRadius: 6,
                            fontFamily: 'monospace',
                            border: '1px solid #e2e8f0',
                            marginBottom: 4
                          }}>
                            {item.code}
                          </span>
                          <div>
                            <span style={{
                              display: 'inline-block',
                              fontSize: 10,
                              fontWeight: 800,
                              color: item.badgeColor,
                              background: item.badgeBg,
                              padding: '1px 7px',
                              borderRadius: 6,
                              border: `1px solid ${item.badgeColor}30`
                            }}>
                              {item.badge}
                            </span>
                          </div>
                        </td>
                        <td style={{ fontSize: 12.5, fontWeight: 700, color: '#475569' }}>
                          {item.faculty}
                        </td>
                        <td>
                          <div style={{ fontSize: 12.5, fontWeight: 800, color: NAVY }}>
                            {item.duration}
                          </div>
                          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>
                            {item.credits}
                          </div>
                        </td>
                        <td style={{ fontSize: 12, color: '#475569', fontWeight: 700 }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            background: '#f8fafc',
                            padding: '3px 8px',
                            borderRadius: 6,
                            border: '1px solid #e2e8f0'
                          }}>
                            <Clock size={11} color="#64748b" /> {item.semesters}
                          </span>
                        </td>
                        <td>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 11.5,
                            fontWeight: 700,
                            color: '#0284c7',
                            background: '#e0f2fe',
                            padding: '3px 8px',
                            borderRadius: 6
                          }}>
                            <FileText size={12} /> {item.fileSize || 'PDF Document'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                            <button
                              onClick={() => handleOpenPdf(item)}
                              style={{
                                background: '#0B1F3A',
                                color: '#ffffff',
                                border: 'none',
                                padding: '6px 12px',
                                borderRadius: 8,
                                fontSize: 11.5,
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 6px rgba(11,31,58,0.2)'
                              }}
                            >
                              <Eye size={12} /> Read PDF
                            </button>
                            <button
                              onClick={(e) => handleDownloadPdf(item, e)}
                              style={{
                                background: '#f1f5f9',
                                color: NAVY,
                                border: '1px solid #cbd5e1',
                                padding: '6px 9px',
                                borderRadius: 8,
                                fontSize: 11.5,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease'
                              }}
                              title="Download PDF"
                            >
                              <Download size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#ffffff',
              borderRadius: 20,
              border: '2px dashed #cbd5e1'
            }}>
              <FolderOpen size={40} color="#94a3b8" style={{ marginBottom: 12 }} />
              <div style={{ fontSize: 18, fontWeight: 900, color: NAVY, marginBottom: 4 }}>
                No syllabus found matching "{search}"
              </div>
              <div style={{ fontSize: 13.5, color: '#64748B', marginBottom: 16 }}>
                Try adjusting your search terms or clearing the department filters.
              </div>
              <button
                onClick={() => { setSearch(''); setActiveDept('all'); }}
                style={{
                  background: '#0B1F3A',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Clear Search
              </button>
            </div>
          )}
        </Fade>
      </div>

      {/* In-App PDF Modal Viewer */}
      {selectedPdf && (
        <Suspense fallback={null}>
          <PDFModal 
            url={selectedPdf.url} 
            title={selectedPdf.title} 
            onClose={() => setSelectedPdf(null)} 
          />
        </Suspense>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   4. ACADEMIC CALENDAR (Timeline & Official Holidays)
════════════════════════════════════════════════════════════ */
export function AcademicCalendar() {
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' | 'holidays'
  const [holidaySearch, setHolidaySearch] = useState('');
  const [selectedPdf, setSelectedPdf] = useState(null);

  const filteredHolidays = OFFICIAL_HOLIDAYS_2026.filter(h => 
    !holidaySearch || 
    h.name.toLowerCase().includes(holidaySearch.toLowerCase()) || 
    h.type.toLowerCase().includes(holidaySearch.toLowerCase())
  );

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <PageHeader 
        title="Official Academic Calendar" 
        subtitle="Comprehensive session schedule, examination windows, form fill-up dates, and official holiday notifications for Session 2026–27."
        badge="Session 2026–2027 Schedule"
        icon={<Calendar size={36} color={GOLD} />} 
      />
      
      <div style={{ maxWidth: 1080, margin: '30px auto 70px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        
        {/* Calendar Action & Download Banner */}
        <Fade>
          <div style={{
            background: 'linear-gradient(135deg, #0B1F3A 0%, #172554 100%)',
            borderRadius: 18,
            padding: '18px 24px',
            color: '#ffffff',
            boxShadow: '0 8px 24px rgba(11, 31, 58, 0.12)',
            border: '1px solid rgba(244, 185, 66, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 24
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(244, 185, 66, 0.2)', color: '#F4B942', padding: '2px 10px', borderRadius: 16, fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', marginBottom: 6 }}>
                <Sparkles size={11} /> Official University Notification
              </div>
              <h2 style={{ fontSize: 17, fontWeight: 900, color: '#ffffff', margin: '0 0 4px' }}>
                Download Session 2026-27 Official Calendar
              </h2>
              <p style={{ fontSize: 12, color: '#cbd5e1', margin: 0, maxWidth: 640 }}>
                Complete university gazette including odd &amp; even semester schedules, internal assessments, and breaks.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setSelectedPdf({ url: 'https://bbmku.ac.in', title: 'Official Academic Calendar 2026-27' })}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  borderRadius: 8,
                  padding: '7px 14px',
                  fontWeight: 800,
                  fontSize: 12,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5
                }}
              >
                <Eye size={13} /> View PDF
              </button>
              <a
                href="https://bbmku.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #F4B942 0%, #E5A729 100%)',
                  color: '#0B1F3A',
                  borderRadius: 8,
                  padding: '7px 14px',
                  fontWeight: 900,
                  fontSize: 12,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  boxShadow: '0 3px 10px rgba(244, 185, 66, 0.25)'
                }}
              >
                <Download size={13} /> Download Gazette
              </a>
            </div>
          </div>
        </Fade>

        {/* View Mode Tabs */}
        <Fade delay={0.1}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 24
          }}>
            <button
              onClick={() => setViewMode('timeline')}
              style={{
                padding: '7px 16px',
                borderRadius: 24,
                border: viewMode === 'timeline' ? '1px solid #0B1F3A' : '1px solid #e2e8f0',
                background: viewMode === 'timeline' ? '#0B1F3A' : '#ffffff',
                color: viewMode === 'timeline' ? '#ffffff' : '#475569',
                fontSize: 12.5,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.2s ease',
                boxShadow: viewMode === 'timeline' ? '0 3px 10px rgba(11,31,58,0.18)' : 'none'
              }}
            >
              <Calendar size={14} /> Session Milestones &amp; Exams ({ACADEMIC_CALENDAR_EVENTS.length})
            </button>
            <button
              onClick={() => setViewMode('holidays')}
              style={{
                padding: '7px 16px',
                borderRadius: 24,
                border: viewMode === 'holidays' ? '1px solid #0B1F3A' : '1px solid #e2e8f0',
                background: viewMode === 'holidays' ? '#0B1F3A' : '#ffffff',
                color: viewMode === 'holidays' ? '#ffffff' : '#475569',
                fontSize: 12.5,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.2s ease',
                boxShadow: viewMode === 'holidays' ? '0 3px 10px rgba(11,31,58,0.18)' : 'none'
              }}
            >
              <Sun size={14} /> Official Holidays ({OFFICIAL_HOLIDAYS_2026.length})
            </button>
          </div>
        </Fade>

        {/* View Mode 1: Timeline */}
        {viewMode === 'timeline' && (
          <Fade delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {ACADEMIC_CALENDAR_EVENTS.map((ev, i) => (
                <div
                  key={i}
                  className="gnc-calendar-card"
                  style={{
                    padding: '14px 18px',
                    '--card-accent': ev.color,
                    '--card-glow': `${ev.color}30`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    flexWrap: 'wrap'
                  }}
                >
                  <div className="cal-top-bar" />

                  {/* Month Pill */}
                  <div style={{
                    minWidth: 110,
                    padding: '6px 10px',
                    borderRadius: 8,
                    background: `${ev.color}15`,
                    border: `1px solid ${ev.color}35`,
                    color: ev.color,
                    fontWeight: 900,
                    fontSize: 12,
                    textAlign: 'center'
                  }}>
                    {ev.month}
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: ev.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {ev.phase}
                      </span>
                      <span style={{ fontSize: 9.5, fontWeight: 700, background: '#f1f5f9', color: '#64748B', padding: '1px 6px', borderRadius: 4 }}>
                        {ev.badge}
                      </span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: NAVY, marginBottom: 4 }}>
                      {ev.title}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.45 }}>
                      {ev.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        )}

        {/* View Mode 2: Official Holidays */}
        {viewMode === 'holidays' && (
          <Fade delay={0.2}>
            <div style={{
              background: '#ffffff',
              borderRadius: 24,
              padding: '28px 32px',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 8px 30px rgba(11,31,58,0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: 0 }}>
                  Gazetted &amp; Institutional Holidays (2026)
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#F8FAFC',
                  border: '1px solid #cbd5e1',
                  borderRadius: 10,
                  padding: '6px 12px',
                  width: 240
                }}>
                  <Search size={14} color="#94a3b8" />
                  <input
                    type="text"
                    value={holidaySearch}
                    onChange={e => setHolidaySearch(e.target.value)}
                    placeholder="Search holiday..."
                    style={{ border: 'none', outline: 'none', fontSize: 12.5, width: '100%', background: 'transparent' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
                {filteredHolidays.map((h, idx) => (
                  <div
                    key={idx}
                    className="gnc-hover-card"
                    style={{
                      padding: '14px 18px',
                      '--card-accent': h.type === 'Institutional' ? GOLD : '#0284c7',
                      '--card-glow': 'rgba(2, 132, 199, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div className="card-top-bar" />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: NAVY, marginBottom: 2 }}>
                        {h.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#64748B' }}>
                        {h.date} ({h.day})
                      </div>
                    </div>
                    <span style={{
                      fontSize: 10.5,
                      fontWeight: 800,
                      color: h.type === 'Institutional' ? '#b45309' : '#0284c7',
                      background: h.type === 'Institutional' ? '#fef3c7' : '#e0f2fe',
                      padding: '2px 8px',
                      borderRadius: 6
                    }}>
                      {h.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        )}
      </div>

      {selectedPdf && (
        <Suspense fallback={null}>
          <PDFModal url={selectedPdf.url} title={selectedPdf.title} onClose={() => setSelectedPdf(null)} />
        </Suspense>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   5. PLACEMENTS PAGE (Wall of Fame & Career Records)
════════════════════════════════════════════════════════════ */
export function PlacementsPage() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  useEffect(() => {
    if (!db) return;
    try {
      const q = query(collection(db, 'placements'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, snap => {
        setPlacements(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
      }, () => setLoading(false));
      return () => unsub();
    } catch {
      setLoading(false);
    }
  }, []);

  const filtered = placements.filter(p => {
    const matchesSearch = (p.name || '').toLowerCase().includes(search.toLowerCase()) || 
                          (p.company || '').toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || p.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const depts = ['All', ...new Set(placements.map(p => p.department).filter(Boolean))];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <PageHeader 
        title="Placements &amp; Wall of Fame" 
        subtitle="Celebrating our meritorious graduates placed in leading IT corporations, banks, and conglomerates."
        badge="Career &amp; Industry Placement Wing"
        icon={<Rocket size={36} color={GOLD} />} 
      />

      <div style={{ maxWidth: 1200, margin: '36px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        {/* Search & Filter Bar */}
        <Fade>
          <div style={{
            background: '#ffffff',
            padding: '24px 28px',
            borderRadius: 20,
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 8px 30px rgba(11, 31, 58, 0.04)',
            marginBottom: 36,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            alignItems: 'center'
          }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F8FAFC', border: '1px solid #cbd5e1', borderRadius: 12, padding: '10px 14px' }}>
                <Search size={18} color="#94a3b8" />
                <input 
                  type="text" 
                  placeholder="Search by student name or company (e.g. TCS, Wipro, ICICI)..." 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                  style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontSize: 14, fontWeight: 600, color: NAVY }} 
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {depts.map(d => (
                <button 
                  key={d} 
                  onClick={() => setDeptFilter(d)}
                  style={{ 
                    padding: '8px 16px', borderRadius: 20, border: deptFilter === d ? '1px solid #0B1F3A' : '1px solid #e2e8f0', 
                    background: deptFilter === d ? '#0B1F3A' : '#ffffff', 
                    color: deptFilter === d ? '#ffffff' : '#64748B',
                    fontSize: 12.5, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: deptFilter === d ? '0 4px 12px rgba(11,31,58,0.2)' : 'none'
                  }}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        </Fade>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div className="premium-loader" />
            <p style={{ marginTop: 16, color: '#64748B', fontWeight: 700 }}>Loading placement records...</p>
          </div>
        ) : filtered.length === 0 ? (
          <Fade>
            <div style={{ textAlign: 'center', padding: '80px 20px', background: '#ffffff', borderRadius: 24, border: '2px dashed #cbd5e1' }}>
              <GraduationCap size={44} color={GOLD} style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: 20, fontWeight: 900, color: NAVY }}>No Placement Records Found</h3>
              <p style={{ color: '#64748B', maxWidth: 400, margin: '8px auto', fontSize: 13.5 }}>Try adjusting your search criteria or explore other departments.</p>
            </div>
          </Fade>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 24 }}>
            {filtered.map((p, i) => (
              <Fade key={p.id} delay={i * 0.04}>
                <div 
                  className="gnc-academic-card"
                  style={{
                    padding: 24,
                    '--card-accent': '#0284c7',
                    '--card-glow': 'rgba(2, 132, 199, 0.3)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div className="academic-top-bar" />
                  
                  <div>
                    {p.package && (
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        background: '#fef3c7',
                        color: '#b45309',
                        fontSize: 11,
                        fontWeight: 900,
                        padding: '3px 10px',
                        borderRadius: 20,
                        marginBottom: 14,
                        border: '1px solid #fde68a'
                      }}>
                        <Banknote size={12} /> {p.package} LPA
                      </div>
                    )}

                    <div style={{ width: 84, height: 84, borderRadius: '50%', margin: '0 auto 14px', border: `3px solid ${GOLD}40`, padding: 3, background: '#ffffff' }}>
                      {p.photo ? (
                        <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <GraduationCap size={32} color="#94a3b8" />
                        </div>
                      )}
                    </div>

                    <h3 style={{ fontSize: 16.5, fontWeight: 900, color: NAVY, margin: '0 0 3px' }}>{p.name}</h3>
                    <div style={{ fontSize: 12.5, color: '#0284c7', fontWeight: 800, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      {p.company}
                    </div>
                    
                    <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>{p.role}</div>
                  </div>

                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'center', gap: 6 }}>
                    <span style={{ fontSize: 10.5, background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>
                      {p.department}
                    </span>
                    {p.batch && (
                      <span style={{ fontSize: 10.5, background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>
                        Batch {p.batch}
                      </span>
                    )}
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}