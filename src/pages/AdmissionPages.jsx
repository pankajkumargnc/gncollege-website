// src/pages/AdmissionPages.jsx
// 🏛️ Official Admission Portal & Procedures for Guru Nanak College, Dhanbad
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import DOMPurify from 'dompurify';
import usePageContent, { DynamicSectionsContainer } from '../hooks/usePageContent';
import {
  ClipboardList, FolderCheck, CreditCard, Bell, Inbox,
  Calendar, FileCheck, Printer, FileText, TrendingUp,
  Landmark, BookOpen, Laptop, Briefcase, Users, ExternalLink,
  Sparkles, PhoneCall, CheckCircle2, ArrowRight, ShieldCheck,
  GraduationCap, ChevronRight, Award, LayoutGrid, Table2, Info, Clock, Check
} from 'lucide-react';
import { splitHeading } from '../utils/splitTitle';
import '../styles/index.css';

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

/* ─── Shared Scroll Animation ─── */
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
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : `translateY(${y}px)`,
      transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`
    }}>
      {children}
    </div>
  );
}

/* ─── Unified Signature Hero Banner (Student Corner Standard) ─── */
export function AdmissionPageHero({
  title,
  subtitle,
  icon,
  badge = "ADMISSION SESSION 2026–27 • NEP 2020"
}) {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #0B1F3A 0%, #1a3a6b 100%)',
      color: '#ffffff',
      padding: 'clamp(44px, 7vw, 76px) 20px clamp(40px, 6vw, 60px)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Radial Gold Ambient Aura */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 80% 20%, rgba(244, 160, 35, 0.16) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: 960,
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Golden Pill Badge */}
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
    </header>
  );
}

/* ─── Dedicated Admission Sidebar ─── */
export function AdmissionSidebar() {
  const location = useLocation();
  const hashPath = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
  const currentPath = hashPath || location.pathname;

  const admissionNavLinks = [
    { label: 'Admission Procedure',   path: '/admission/rule', icon: ClipboardList },
    { label: 'Documents Required',    path: '/admission/document-required', icon: FolderCheck },
    { label: 'Fee Structure (8 Sem)', path: '/admission/fee-structure', icon: CreditCard },
    { label: 'Intake Capacity & Seats', path: '/admission/intake-capacity', icon: Users },
    { label: 'Admission Notices',     path: '/admission/notification/latest', icon: Bell },
  ];

  return (
    <aside className="profile-sidebar">
      <Fade delay={0.08}>
        {/* Official Chancellor Portal Quick Card */}
        <div
          className="gnc-spotlight-card"
          style={{
            '--card-accent': '#0284c7',
            '--card-glow': 'rgba(2, 132, 199, 0.3)',
            background: 'linear-gradient(145deg, #0B1F3A 0%, #0369a1 100%)',
            color: '#ffffff',
            borderRadius: 18,
            padding: '22px 20px',
            border: '1.5px solid rgba(56, 189, 248, 0.35)',
            boxShadow: '0 8px 30px rgba(11, 31, 58, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: 20
          }}
        >
          <div className="card-top-bar" style={{ background: 'linear-gradient(90deg, #38bdf8, #0284c7)' }} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(56, 189, 248, 0.2)', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: 20, padding: '4px 10px', fontSize: 10.5, fontWeight: 800, color: '#bae6fd', textTransform: 'uppercase', marginBottom: 12 }}>
            <Sparkles size={11} /> Chancellor Portal
          </div>
          <h4 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 800, color: '#ffffff' }}>
            Direct Online Application
          </h4>
          <p style={{ margin: '0 0 14px', fontSize: 12.5, color: '#e0f2fe', lineHeight: 1.55 }}>
            All UG Degree admissions under BBMKU NEP-2020 are processed through the Jharkhand Chancellor Portal.
          </p>
          <a
            href="https://universities.jharkhand.gov.in/home"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: '#F4B942',
              color: '#0f2347',
              padding: '10px 16px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(244, 185, 66, 0.35)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            <span>Apply on Chancellor Portal</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Admission Quick Navigation Widget */}
        <div className="widget" style={{ borderRadius: 16, border: '1.5px solid #e2e8f0', boxShadow: '0 4px 18px rgba(11,31,58,0.04)', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #f4f7fa', paddingBottom: 12, marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: NAVY, display: 'flex', alignItems: 'center', gap: 8 }}>
              <GraduationCap size={18} color={GOLD} /> Admission Desk
            </h3>
            <span style={{ fontSize: 11, fontWeight: 800, background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: 12 }}>
              2026–27
            </span>
          </div>
          <ul className="quick-links" style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {admissionNavLinks.map((l, i) => {
              const Icon = l.icon;
              const isActive = currentPath === l.path || (l.path.includes('notification') && currentPath.includes('notification'));
              return (
                <li key={i} className="quick-link-item" style={{ borderBottom: 'none' }}>
                  <Link
                    to={l.path}
                    className={`quick-link ${isActive ? 'active' : ''}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <Icon size={15} style={{ opacity: isActive ? 1 : 0.7, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 13 }}>{l.label}</span>
                    <span className="link-arrow">›</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Sikh Minority Quota Callout Card */}
        <div
          className="gnc-spotlight-card"
          style={{
            '--card-accent': '#f4a023',
            '--card-glow': 'rgba(244, 160, 35, 0.25)',
            background: 'linear-gradient(145deg, #0B1F3A 0%, #172554 100%)',
            color: '#ffffff',
            borderRadius: 16,
            padding: '18px 20px',
            border: '1.5px solid rgba(244, 185, 66, 0.35)',
            marginBottom: 20
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 16 }}>☬</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#F4B942', textTransform: 'uppercase', letterSpacing: '0.6px' }}>50% Minority Quota</span>
          </div>
          <h4 style={{ margin: '0 0 6px', fontSize: 14.5, fontWeight: 800, color: '#ffffff' }}>Sikh Minority Reservation</h4>
          <p style={{ margin: 0, fontSize: 12, color: '#cbd5e1', lineHeight: 1.55 }}>
            50% seats in all UG &amp; Vocational streams are reserved for Sikh Minority students with fee concession assistance.
          </p>
        </div>

        {/* Admission Helpdesk Phone Widget */}
        <div className="helpdesk-widget" style={{ borderRadius: 16, padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, position: 'relative', zIndex: 2 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: 'rgba(244, 160, 35, 0.18)',
              border: '1px solid rgba(244, 160, 35, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <PhoneCall size={18} color={GOLD} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: 14.5, color: GOLD, fontWeight: 800 }}>Admission Helpline</h4>
              <p style={{ margin: '2px 0 0', fontSize: 11.5, color: '#cbd5e1' }}>10:00 AM – 4:00 PM</p>
            </div>
          </div>
          <a href="tel:+917903340991" className="helpdesk-btn" style={{ minHeight: 36, padding: '7px 12px', fontSize: 12.5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 8 }}>
            Call: +91-79033 40991
          </a>
        </div>
      </Fade>
    </aside>
  );
}

/* ─── Shared Admission Layout ─── */
function AdmissionLayout({ children }) {
  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(36px,5vw,56px) clamp(16px,3vw,24px) clamp(56px,7vw,88px)' }}>
      <div className="profile-layout">
        <main className="profile-main">{children}</main>
        <AdmissionSidebar />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   1. ADMISSION RULE (Step-by-Step Flow)
════════════════════════════════════════════════════════════ */
export function AdmissionRule() {
  const { content, getList, getText } = usePageContent('admission-rule');
  const importantRule = getText('important-rule', '<strong>Important Rule:</strong> Students attending less than 75% classes will not be eligible to fill up university examination forms. Violation of discipline may lead to removal.');
  const steps = getList('steps', [
    { title: 'Apply via Chancellor Portal', desc: 'Desirous students must apply through the Chancellor Portal (https://universities.jharkhand.gov.in/home) under NEP-2020.', fee: 'Application Fee: Rs. 100/-' },
    { title: 'Merit List & Verification', desc: 'Selected students must visit respective campuses (Main/Bhuda/Bank More) with original documents for physical verification.', fee: 'Check Document Required Page' },
    { title: 'University Registration', desc: 'After verification, pay the University Registration Fee on Chancellor Portal again.', fee: 'JAC Board: Rs. 308/- | Others: Rs. 758/-' },
    { title: 'College Online Admission Form', desc: 'Register on www.gncollege.org or enrollonline.co.in. Upload Chancellor Portal fee receipt and marksheet.', fee: 'Wait for approval message' },
    { title: 'Final Fee Payment', desc: 'After approval, pay the college fee via Student Diary Cloud App or CIMS portal using Card/UPI/NetBanking.', fee: 'Online Payment Only' }
  ]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <AdmissionPageHero
        title={content?.title || "Admission Procedure"}
        subtitle={content?.subtitle || "Complete step-by-step guide for UG and Vocational admission under NEP 2020."}
        icon={<ClipboardList size={32} />}
        badge="ADMISSION PROCEDURE • NEP-2020"
      />
      <AdmissionLayout>
        <Fade>
          {/* Statutory Rule Notice */}
          <div style={{
            background: '#fef2f2',
            borderLeft: `4px solid #ef4444`,
            padding: '16px 20px',
            borderRadius: '0 14px 14px 0',
            marginBottom: 26,
            fontSize: 14,
            lineHeight: 1.6,
            color: '#991b1b'
          }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(importantRule) }} />

          {/* Stepper Timeline Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {steps.map((s, i) => (
              <div
                key={i}
                className="gnc-hover-card"
                style={{
                  '--card-accent': '#0284c7',
                  '--card-glow': 'rgba(2, 132, 199, 0.2)',
                  background: '#ffffff',
                  borderRadius: 18,
                  padding: '22px 24px',
                  border: '1.5px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 18,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div className="card-top-bar" style={{ background: 'linear-gradient(90deg, #0284c7, #38bdf8)' }} />
                
                {/* Step Number Badge */}
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: NAVY,
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 900,
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(15, 35, 71, 0.2)'
                }}>
                  {i + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: NAVY }}>
                      {s.title}
                    </h3>
                    <span style={{
                      display: 'inline-block',
                      background: 'rgba(244, 160, 35, 0.12)',
                      color: '#b45309',
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 800,
                      border: '1px solid rgba(244, 160, 35, 0.25)'
                    }}>
                      {s.fee}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Fade>
        <DynamicSectionsContainer sections={content?.sections} excludeIds={['important-rule', 'steps']} />
      </AdmissionLayout>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   2. DOCUMENTS REQUIRED (Checklist)
════════════════════════════════════════════════════════════ */
export function DocumentRequired() {
  const { content, getList } = usePageContent('document-required');
  const docs = getList('documents', [
    { t: 'Chancellor Portal Form', d: 'Printed copy of the submitted application form.', type: 'Print', color: '#0284c7' },
    { t: 'Application Fee Receipt', d: 'Proof of Rs. 100/- payment on Chancellor Portal.', type: 'Print', color: '#0284c7' },
    { t: 'Original CLC/TC', d: 'Original copy will be kept by the college (keep photocopies for yourself).', type: 'Original', color: '#ef4444' },
    { t: 'Qualifying Marksheet', d: 'Self-attested photocopy of previous exam.', type: 'Photocopy', color: '#059669' },
    { t: 'Admit Card', d: 'Self-attested photocopy of qualifying exam admit card.', type: 'Photocopy', color: '#059669' },
    { t: 'Migration Certificate', d: 'Original or Downloaded from Digilocker (Required for non-JAC board).', type: 'Original', color: '#ef4444' },
    { t: 'Caste Certificate', d: 'If applicable for reservation claims.', type: 'Photocopy', color: '#7c3aed' }
  ]);

  const getDocIcon = (type) => {
    if (type === 'Original') return <FileCheck size={26} color="#ef4444" />;
    if (type === 'Print') return <Printer size={26} color="#0284c7" />;
    return <FileText size={26} color="#059669" />;
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <AdmissionPageHero
        title={content?.title || "Documents Required"}
        subtitle={content?.subtitle || "Bring these original documents and photocopies during physical verification."}
        icon={<FolderCheck size={32} />}
        badge="VERIFICATION CHECKLIST"
      />
      <AdmissionLayout>
        <Fade>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
            {docs.map((d, i) => {
              const accentColor = d.color || (d.type === 'Original' ? '#ef4444' : '#0284c7');
              return (
                <div
                  key={i}
                  className="gnc-hover-card"
                  style={{
                    '--card-accent': accentColor,
                    '--card-glow': `${accentColor}30`,
                    background: '#ffffff',
                    borderRadius: 16,
                    padding: 20,
                    border: '1.5px solid #e2e8f0',
                    display: 'flex',
                    gap: 16,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div className="card-top-bar" style={{ background: accentColor }} />
                  <div className="card-icon-box" style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${accentColor}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {getDocIcon(d.type)}
                  </div>
                  <div>
                    <div style={{
                      display: 'inline-block',
                      fontSize: 10.5,
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: d.type === 'Original' ? '#fee2e2' : '#f1f5f9',
                      color: d.type === 'Original' ? '#ef4444' : '#475569',
                      marginBottom: 6
                    }}>
                      {(d.type || 'DOCUMENT').toUpperCase()}
                    </div>
                    <div style={{ fontWeight: 800, color: NAVY, fontSize: 15, marginBottom: 4 }}>
                      {d.t || d.title}
                    </div>
                    <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
                      {d.d || d.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Fade>
        <DynamicSectionsContainer sections={content?.sections} excludeIds={['documents']} />
      </AdmissionLayout>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   3. FEE STRUCTURE (Live Tables)
════════════════════════════════════════════════════════════ */
export function FeeStructure() {
  const [view, setView] = useState('card');
  const [activeTab, setActiveTab] = useState('UG');
  const { content } = usePageContent('fee-structure');

  // Exact data from PDF, updated for 8 Semesters (FYUGP) — GENUINE DATA, DO NOT MODIFY
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

  const comparisonCourses = [
    {
      id: 'bca',
      name: 'BCA (Bachelor of Computer Applications)',
      stream: 'Vocational / Self-Financing',
      duration: '3 Years (6 Semesters)',
      oddSem: '₹15,916',
      evenSem: '₹15,165',
      totalCost: '₹93,243',
      examFee: 'As per BBMKU Norms',
      color: '#ef4444',
      icon: Laptop,
      badge: 'HIGH DEMAND IT PROGRAM',
      highlights: [
        'Air-conditioned High-Tech Computer Lab',
        'Industry software projects & coding bootcamps',
        'Campus placement drives (TCS, Wipro, Infosys)',
        'Semester-wise installments & e-Kalyan eligible'
      ],
      breakdown: {
        tuition: '₹15,000 / Sem',
        devErp: '₹916 (Odd) / ₹165 (Even)',
        exam: 'University fees extra'
      }
    },
    {
      id: 'bba',
      name: 'BBA (Bachelor of Business Administration)',
      stream: 'Vocational / Professional',
      duration: '3 Years (6 Semesters)',
      oddSem: '₹13,916',
      evenSem: '₹13,165',
      totalCost: '₹81,243',
      examFee: 'As per BBMKU Norms',
      color: '#10b981',
      icon: Briefcase,
      badge: 'MANAGEMENT & CORPORATE',
      highlights: [
        'Corporate case studies, seminars & presentations',
        'Personality development & business communication',
        'Summer internship mentorship with local industry',
        'Comprehensive marketing & finance specialization'
      ],
      breakdown: {
        tuition: '₹13,000 / Sem',
        devErp: '₹916 (Odd) / ₹165 (Even)',
        exam: 'University fees extra'
      }
    },
    {
      id: 'bcom',
      name: 'B.Com (Honours - Commerce FYUGP)',
      stream: 'Regular NEP 2020 Faculty',
      duration: '4 Years (8 Semesters)',
      oddSem: '₹3,146 (Boys) / ₹3,026 (Girls)',
      evenSem: '₹2,600 (Boys) / ₹2,480 (Girls)',
      totalCost: '₹22,984 (Boys) / ₹22,024 (Girls)',
      examFee: 'University Examination Fee',
      color: GOLD,
      icon: TrendingUp,
      badge: 'POPULAR CHOICE • AFFORDABLE',
      highlights: [
        'Leading Commerce department in Dhanbad region',
        '100% subsidized tuition fee for girl students (₹0 Tuition)',
        'Computerized accounting & Tally workshop access',
        'National Service Scheme (NSS) & Sports included'
      ],
      breakdown: {
        tuition: '₹120 / Sem (Boys) • ₹0 (Girls)',
        devErp: 'College Fund ₹1,650 + Dev ₹500',
        exam: 'Internal ₹50 / Sem'
      }
    },
    {
      id: 'ba',
      name: 'B.A. (Honours - Humanities & Social Sciences)',
      stream: 'Regular NEP 2020 Faculty',
      duration: '4 Years (8 Semesters)',
      oddSem: '₹3,146 (Boys) / ₹3,026 (Girls)',
      evenSem: '₹2,600 (Boys) / ₹2,480 (Girls)',
      totalCost: '₹22,984 (Boys) / ₹22,024 (Girls)',
      examFee: 'University Examination Fee',
      color: '#0ea5e9',
      icon: BookOpen,
      badge: 'GOVERNMENT SUBSIDIZED',
      highlights: [
        'History, Pol. Science, English, Economics, Psychology, Hindi',
        'Zero Tuition Fee for female scholars across all 8 semesters',
        'Civil services & competitive exams foundation library',
        'e-Kalyan Jharkhand Post-Matric Scholarship eligible'
      ],
      breakdown: {
        tuition: '₹120 / Sem (Boys) • ₹0 (Girls)',
        devErp: 'College Fund ₹1,650 + Dev ₹500',
        exam: 'Internal ₹50 / Sem'
      }
    }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <AdmissionPageHero
        title="Fee Structure"
        subtitle="Detailed semester-wise fee breakdown for 4-Year FYUGP (8 Semesters), BCA, and BBA with master comparison."
        icon={<CreditCard size={32} />}
        badge="TRANSPARENT TUITION BREAKDOWN"
      />
      <AdmissionLayout>
        <Fade>
          {/* Header Controls: Title & View Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 14,
            marginBottom: 24,
            paddingBottom: 16,
            borderBottom: '1.5px solid #e2e8f0'
          }}>
            <div>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: GOLD, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                Approved College Fee Schedule
              </span>
              <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 24px)', fontWeight: 900, color: NAVY, margin: '2px 0 0' }}>
                Tuition &amp; Semester Fee Breakdown
              </h2>
            </div>

            {/* View Mode Switcher Toggle */}
            <div className="gnc-view-toggle">
              <button
                type="button"
                className={`gnc-view-btn ${view === 'card' ? 'active' : ''}`}
                onClick={() => setView('card')}
                title="Visual Fee Cards"
                aria-label="Visual Fee Cards"
              >
                <LayoutGrid size={15} />
                <span>Card View</span>
              </button>
              <button
                type="button"
                className={`gnc-view-btn ${view === 'table' ? 'active' : ''}`}
                onClick={() => setView('table')}
                title="Master Comparison Table"
                aria-label="Master Comparison Table"
              >
                <Table2 size={15} />
                <span>Table View</span>
              </button>
            </div>
          </div>

          {/* ══════ VIEW 1: VISUAL FEE CARDS ══════ */}
          {view === 'card' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 24, marginBottom: 36 }}>
              {comparisonCourses.map((c) => {
                const IconComp = c.icon;
                return (
                  <div
                    key={c.id}
                    className="gnc-hover-card"
                    style={{
                      '--card-accent': c.color,
                      '--card-glow': `${c.color}25`,
                      background: '#ffffff',
                      borderRadius: 20,
                      padding: '24px 22px',
                      border: '1.5px solid #e2e8f0',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div className="card-top-bar" style={{ background: c.color }} />

                    {/* Top Row: Icon, Stream & Badge */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
                      <div className="card-icon-box" style={{
                        width: 50,
                        height: 50,
                        borderRadius: 14,
                        background: `${c.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: c.color,
                        flexShrink: 0
                      }}>
                        <IconComp size={26} />
                      </div>
                      <span style={{
                        fontSize: 10.5,
                        fontWeight: 800,
                        color: c.color,
                        background: `${c.color}14`,
                        padding: '4px 10px',
                        borderRadius: 12,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5
                      }}>
                        {c.badge}
                      </span>
                    </div>

                    {/* Course Title & Stream */}
                    <h3 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: '0 0 4px', lineHeight: 1.3 }}>
                      {c.name}
                    </h3>
                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 16 }}>
                      {c.stream} • <span style={{ color: NAVY, fontWeight: 800 }}>{c.duration}</span>
                    </div>

                    {/* Prominent Fee Highlight Box */}
                    <div style={{
                      background: 'linear-gradient(135deg, #0B1F3A 0%, #1e293b 100%)',
                      color: '#ffffff',
                      borderRadius: 14,
                      padding: '16px 18px',
                      marginBottom: 18,
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{ fontSize: 11, color: GOLD, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>
                        Semester Installment
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 'clamp(24px, 3vw, 28px)', fontWeight: 900, color: '#ffffff' }}>
                          {c.oddSem}
                        </span>
                        <span style={{ fontSize: 12, color: '#94a3b8' }}>/ Odd Semester</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.12)', fontSize: 12 }}>
                        <span style={{ color: '#cbd5e1' }}>Even Sem: <strong>{c.evenSem}</strong></span>
                        <span style={{ color: GOLD, fontWeight: 800 }}>Est. Degree: {c.totalCost}</span>
                      </div>
                    </div>

                    {/* Installment Breakdown Pill List */}
                    <div style={{
                      background: '#f8fafc',
                      borderRadius: 12,
                      padding: '12px 14px',
                      marginBottom: 18,
                      border: '1px solid #e2e8f0',
                      fontSize: 12,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Tuition / Course Fee:</span>
                        <strong style={{ color: NAVY }}>{c.breakdown.tuition}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Dev &amp; College Fund:</span>
                        <strong style={{ color: NAVY }}>{c.breakdown.devErp}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Exam &amp; University:</span>
                        <strong style={{ color: NAVY }}>{c.breakdown.exam}</strong>
                      </div>
                    </div>

                    {/* Highlights Checklist */}
                    <div style={{ marginBottom: 20, flex: 1 }}>
                      <div style={{ fontSize: 11.5, fontWeight: 800, color: NAVY, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>
                        Key Highlights &amp; Inclusions:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {c.highlights.map((h, hi) => (
                          <div key={hi} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12.5, color: '#334155' }}>
                            <CheckCircle2 size={15} color={c.color} style={{ flexShrink: 0, marginTop: 2 }} />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setView('table');
                        if (c.id === 'bca') setActiveTab('BCA');
                        else if (c.id === 'bba') setActiveTab('BBA');
                        else setActiveTab('UG');
                      }}
                      style={{
                        width: '100%',
                        padding: '11px 16px',
                        borderRadius: 10,
                        border: `1.5px solid ${c.color}`,
                        background: '#ffffff',
                        color: c.color,
                        fontWeight: 800,
                        fontSize: 13,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = c.color; e.currentTarget.style.color = '#ffffff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = c.color; }}
                    >
                      <span>View Detailed Fee Heads</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* ══════ VIEW 2: MASTER COMPARISON TABLE VIEW ══════ */}
          {view === 'table' && (
            <div style={{ marginBottom: 36 }}>
              {/* Table 1: Master Comparison Matrix Across Courses */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 900, color: NAVY, margin: 0 }}>
                    ⚡ Master Course Fee Comparison Matrix (BCA vs BBA vs B.Com vs B.A.)
                  </h3>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Scroll horizontally on smaller screens</span>
                </div>

                <div className="gnc-table-wrapper">
                  <table className="gnc-data-table">
                    <thead>
                      <tr>
                        <th>Course / Program</th>
                        <th>Program Type</th>
                        <th>Duration</th>
                        <th>Odd Sem Fee</th>
                        <th>Even Sem Fee</th>
                        <th>Est. Annual Fee</th>
                        <th>Total Degree Cost</th>
                        <th>Special Concession / Scholarships</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonCourses.map((c) => (
                        <tr key={c.id}>
                          <td>
                            <div style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>
                              {c.name}
                            </div>
                            <div style={{ fontSize: 11, color: c.color, fontWeight: 700 }}>
                              {c.badge}
                            </div>
                          </td>
                          <td style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>
                            {c.stream}
                          </td>
                          <td style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>
                            {c.duration}
                          </td>
                          <td style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>
                            {c.oddSem}
                          </td>
                          <td style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>
                            {c.evenSem}
                          </td>
                          <td style={{ fontSize: 13.5, fontWeight: 700, color: '#475569' }}>
                            {c.id === 'bca' ? '₹31,081' : c.id === 'bba' ? '₹27,081' : '₹5,746 (Boys)'}
                          </td>
                          <td style={{ fontSize: 14, fontWeight: 900, color: c.color }}>
                            {c.totalCost}
                          </td>
                          <td style={{ fontSize: 12.5, color: '#334155' }}>
                            {c.id === 'bcom' || c.id === 'ba' ? (
                              <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: 6, fontWeight: 700 }}>
                                100% Free Tuition for Girls • e-Kalyan
                              </span>
                            ) : (
                              <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '3px 8px', borderRadius: 6, fontWeight: 700 }}>
                                e-Kalyan Post-Matric Eligible
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 2: Detailed Head-Wise Breakdown by Course Stream */}
              <div style={{ marginTop: 36 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <span style={{ fontSize: 11.5, fontWeight: 800, color: GOLD, textTransform: 'uppercase', letterSpacing: 0.6 }}>
                      Statutory Gazetted Schedule
                    </span>
                    <h3 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: '2px 0 0' }}>
                      Detailed Itemized Fee Heads (Official PDF Breakdown)
                    </h3>
                  </div>

                  {/* Stream Switcher Tabs */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[
                      { id: 'UG', label: 'UG Regular (8 Semesters FYUGP)' },
                      { id: 'BCA', label: 'BCA (Vocational)' },
                      { id: 'BBA', label: 'BBA (Vocational)' }
                    ].map(t => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveTab(t.id)}
                        style={{
                          padding: '8px 18px',
                          borderRadius: 30,
                          border: activeTab === t.id ? `1.5px solid ${GOLD}` : '1.5px solid #e2e8f0',
                          background: activeTab === t.id ? NAVY : '#ffffff',
                          color: activeTab === t.id ? '#ffffff' : '#64748b',
                          fontWeight: 800,
                          fontSize: 13,
                          cursor: 'pointer',
                          boxShadow: activeTab === t.id ? '0 4px 12px rgba(15, 35, 71, 0.18)' : 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className="gnc-hover-card"
                  style={{
                    '--card-accent': '#0284c7',
                    '--card-glow': 'rgba(2, 132, 199, 0.15)',
                    background: '#ffffff',
                    borderRadius: 20,
                    padding: '24px 20px',
                    border: '1.5px solid #e2e8f0',
                    position: 'relative'
                  }}
                >
                  <div className="card-top-bar" style={{ background: 'linear-gradient(90deg, #0284c7, #38bdf8)' }} />

                  {activeTab === 'UG' && (
                    <>
                      <div style={{ background: '#eff6ff', borderLeft: '4px solid #3b82f6', padding: '12px 16px', borderRadius: '0 8px 8px 0', marginBottom: 20, fontSize: 13, color: '#1e3a8a', fontWeight: 600 }}>
                        Note: Under NEP 2020 (FYUGP), the undergraduate course is spread over 8 semesters. The fee pattern repeats for Odd (1, 3, 5, 7) and Even (2, 4, 6, 8) semesters. Tuition fee for girl students is ₹0 (100% exempted).
                      </div>
                      <div className="gnc-table-wrapper">
                        <table className="gnc-data-table" style={{ fontVariantNumeric: 'tabular-nums' }}>
                          <thead>
                            <tr>
                              <th>Fee Head</th>
                              <th>Boys Odd Sem (1,3,5,7)</th>
                              <th>Boys Even Sem (2,4,6,8)</th>
                              <th>Girls Odd Sem (1,3,5,7)</th>
                              <th>Girls Even Sem (2,4,6,8)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ugFee.map((f, i) => (
                              <tr key={i}>
                                <td style={{ fontWeight: 700, color: NAVY }}>{f.head}</td>
                                <td>₹{f.b1}</td>
                                <td>₹{f.b2}</td>
                                <td>₹{f.g1}</td>
                                <td>₹{f.g2}</td>
                              </tr>
                            ))}
                            <tr style={{ background: `${GOLD}22`, fontWeight: 900, color: NAVY }}>
                              <td>Grand Total (Per Semester)</td>
                              <td>₹3,146</td>
                              <td>₹2,600</td>
                              <td>₹3,026</td>
                              <td>₹2,480</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {(activeTab === 'BCA' || activeTab === 'BBA') && (
                    <div className="gnc-table-wrapper">
                      <table className="gnc-data-table" style={{ fontVariantNumeric: 'tabular-nums' }}>
                        <thead>
                          <tr>
                            <th>Particulars / Head</th>
                            <th>Odd Semesters (1, 3, 5)</th>
                            <th>Even Semesters (2, 4, 6)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ fontWeight: 700, color: NAVY }}>Course Fee</td>
                            <td>₹{activeTab === 'BCA' ? '15,000' : '13,000'}</td>
                            <td>₹{activeTab === 'BCA' ? '15,000' : '13,000'}</td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, color: NAVY }}>Development &amp; ERP Fee</td>
                            <td>₹{activeTab === 'BCA' ? '916' : '916'}</td>
                            <td>₹{activeTab === 'BCA' ? '165' : '165'}</td>
                          </tr>
                          <tr style={{ background: `${GOLD}22`, fontWeight: 900, color: NAVY }}>
                            <td>Grand Total (Per Semester)</td>
                            <td>₹{activeTab === 'BCA' ? '15,916' : '13,916'}</td>
                            <td>₹{activeTab === 'BCA' ? '15,165' : '13,165'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Fade>
        <DynamicSectionsContainer sections={content?.sections} excludeIds={['ug-fee', 'vocational-fee']} />
      </AdmissionLayout>
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
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <AdmissionPageHero
        title="Admission Notifications"
        subtitle="Latest updates, merit lists, and announcements regarding admissions."
        icon={<Bell size={32} />}
        badge="OFFICIAL ADMISSION CIRCULARS"
      />
      <AdmissionLayout>
        <Fade>
          {notices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, background: '#fff', borderRadius: 20, border: '2px dashed #e2e8f0' }}>
              <Inbox size={42} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontWeight: 700, fontSize: 16, color: NAVY }}>No Admission Notices</div>
              <p style={{ margin: '6px 0 0', fontSize: 13, color: '#64748b' }}>Admission circulars and merit lists will appear here once published.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {notices.map((n) => (
                <div
                  key={n.id}
                  className="gnc-hover-card"
                  style={{
                    '--card-accent': n.isNew ? '#ef4444' : '#0284c7',
                    '--card-glow': n.isNew ? 'rgba(239, 68, 68, 0.25)' : 'rgba(2, 132, 199, 0.2)',
                    background: '#ffffff',
                    padding: 22,
                    borderRadius: 18,
                    border: '1.5px solid #e2e8f0',
                    borderLeft: `5px solid ${n.isNew ? '#ef4444' : NAVY}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 20,
                    flexWrap: 'wrap',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div className="card-top-bar" style={{ background: n.isNew ? '#ef4444' : NAVY }} />
                  <div style={{ flex: 1, minWidth: 260 }}>
                    {n.isNew && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#fee2e2', color: '#ef4444', fontSize: 10.5, fontWeight: 900, padding: '3px 8px', borderRadius: 6, marginBottom: 8 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} /> NEW UPDATE
                      </span>
                    )}
                    <div style={{ fontWeight: 800, fontSize: 15.5, color: NAVY, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(n.text) }} />
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={13} /> {new Date(n.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  {n.link && (
                    <a
                      href={n.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: `${NAVY}15`,
                        color: NAVY,
                        padding: '10px 18px',
                        minHeight: 42,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        borderRadius: 10,
                        textDecoration: 'none',
                        fontWeight: 800,
                        fontSize: 13,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      View Details <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </Fade>
      </AdmissionLayout>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   5. INTAKE CAPACITY (Bento Box Stats)
════════════════════════════════════════════════════════════ */
export function IntakeCapacity() {
  const [view, setView] = useState('card');
  const { content } = usePageContent('intake-capacity');

  const seatMatrix = [
    {
      id: 'bcom',
      title: 'B.Com (Honours - Commerce FYUGP)',
      dept: 'Department of Commerce',
      faculty: 'Commerce',
      shift: 'Morning & Day Shift',
      totalSeats: 550,
      generalSeats: 275,
      minoritySeats: 275,
      channel: 'Chancellor Portal Jharkhand',
      university: 'BBMKU, Dhanbad',
      color: GOLD,
      icon: TrendingUp,
      badge: 'LARGEST FACULTY • 550 SEATS'
    },
    {
      id: 'history',
      title: 'B.A. (Honours) - History',
      dept: 'Department of History',
      faculty: 'Humanities & Social Sciences',
      shift: 'Day Shift',
      totalSeats: 156,
      generalSeats: 78,
      minoritySeats: 78,
      channel: 'Chancellor Portal Jharkhand',
      university: 'BBMKU, Dhanbad',
      color: NAVY,
      icon: Landmark,
      badge: 'FYUGP 4-YEAR'
    },
    {
      id: 'polsc',
      title: 'B.A. (Honours) - Political Science',
      dept: 'Department of Political Science',
      faculty: 'Social Sciences',
      shift: 'Day Shift',
      totalSeats: 156,
      generalSeats: 78,
      minoritySeats: 78,
      channel: 'Chancellor Portal Jharkhand',
      university: 'BBMKU, Dhanbad',
      color: NAVY,
      icon: Landmark,
      badge: 'FYUGP 4-YEAR'
    },
    {
      id: 'eng',
      title: 'B.A. (Honours) - English Literature',
      dept: 'Department of English',
      faculty: 'Languages & Literature',
      shift: 'Day Shift',
      totalSeats: 128,
      generalSeats: 64,
      minoritySeats: 64,
      channel: 'Chancellor Portal Jharkhand',
      university: 'BBMKU, Dhanbad',
      color: '#0ea5e9',
      icon: BookOpen,
      badge: 'FYUGP 4-YEAR'
    },
    {
      id: 'eco',
      title: 'B.A. (Honours) - Economics',
      dept: 'Department of Economics',
      faculty: 'Social Sciences',
      shift: 'Day Shift',
      totalSeats: 128,
      generalSeats: 64,
      minoritySeats: 64,
      channel: 'Chancellor Portal Jharkhand',
      university: 'BBMKU, Dhanbad',
      color: '#0ea5e9',
      icon: BookOpen,
      badge: 'FYUGP 4-YEAR'
    },
    {
      id: 'psy',
      title: 'B.A. (Honours) - Psychology',
      dept: 'Department of Psychology',
      faculty: 'Social Sciences (With Lab)',
      shift: 'Day Shift',
      totalSeats: 128,
      generalSeats: 64,
      minoritySeats: 64,
      channel: 'Chancellor Portal Jharkhand',
      university: 'BBMKU, Dhanbad',
      color: '#0ea5e9',
      icon: BookOpen,
      badge: 'EXPERIMENTAL LAB'
    },
    {
      id: 'hin',
      title: 'B.A. (Honours) - Hindi Literature',
      dept: 'Department of Hindi',
      faculty: 'Languages & Literature',
      shift: 'Day Shift',
      totalSeats: 128,
      generalSeats: 64,
      minoritySeats: 64,
      channel: 'Chancellor Portal Jharkhand',
      university: 'BBMKU, Dhanbad',
      color: '#0ea5e9',
      icon: BookOpen,
      badge: 'FYUGP 4-YEAR'
    },
    {
      id: 'bca',
      title: 'BCA (Bachelor of Computer Applications)',
      dept: 'Department of Computer Applications',
      faculty: 'Vocational / Self-Financing',
      shift: 'Day Shift (Special Lab Hours)',
      totalSeats: 90,
      generalSeats: 45,
      minoritySeats: 45,
      channel: 'College Direct / Chancellor Portal',
      university: 'BBMKU, Dhanbad',
      color: '#ef4444',
      icon: Laptop,
      badge: 'VOCATIONAL • 90 SEATS'
    },
    {
      id: 'bba',
      title: 'BBA (Bachelor of Business Administration)',
      dept: 'Department of Management Studies',
      faculty: 'Vocational / Professional',
      shift: 'Day Shift',
      totalSeats: 90,
      generalSeats: 45,
      minoritySeats: 45,
      channel: 'College Direct / Chancellor Portal',
      university: 'BBMKU, Dhanbad',
      color: '#10b981',
      icon: Briefcase,
      badge: 'MANAGEMENT • 90 SEATS'
    }
  ];

  const totalAllSeats = seatMatrix.reduce((acc, curr) => acc + curr.totalSeats, 0);
  const totalGeneral = seatMatrix.reduce((acc, curr) => acc + curr.generalSeats, 0);
  const totalMinority = seatMatrix.reduce((acc, curr) => acc + curr.minoritySeats, 0);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', sans-serif" }}>
      <AdmissionPageHero
        title={content?.title || "Intake Capacity & Seat Matrix"}
        subtitle={content?.subtitle || "Approved university intake capacity, shift details, and 50% Sikh Minority Quota for academic session."}
        icon={<Users size={32} />}
        badge="APPROVED UNIVERSITY SEAT MATRIX"
      />
      <AdmissionLayout>
        <Fade>
          {/* Header Bar with View Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 14,
            marginBottom: 24,
            paddingBottom: 16,
            borderBottom: '1.5px solid #e2e8f0'
          }}>
            <div>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: GOLD, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                BBMKU Approved Capacity
              </span>
              <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 24px)', fontWeight: 900, color: NAVY, margin: '2px 0 0' }}>
                Course-Wise Seat Distribution ({totalAllSeats} Total Seats)
              </h2>
            </div>

            {/* View Mode Switcher */}
            <div className="gnc-view-toggle">
              <button
                type="button"
                className={`gnc-view-btn ${view === 'card' ? 'active' : ''}`}
                onClick={() => setView('card')}
                title="Seat Distribution Cards"
                aria-label="Seat Distribution Cards"
              >
                <LayoutGrid size={15} />
                <span>Card View</span>
              </button>
              <button
                type="button"
                className={`gnc-view-btn ${view === 'table' ? 'active' : ''}`}
                onClick={() => setView('table')}
                title="Official Seat Matrix Table"
                aria-label="Official Seat Matrix Table"
              >
                <Table2 size={15} />
                <span>Table View</span>
              </button>
            </div>
          </div>

          {/* Statutory Minority Status Notification Bar */}
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            border: '1.5px solid #bfdbfe',
            borderRadius: 16,
            padding: '16px 20px',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14
          }}>
            <ShieldCheck size={24} color="#1d4ed8" style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: 13, color: '#1e3a8a', lineHeight: 1.6 }}>
              <strong>Official Minority Quota Notice:</strong> Guru Nanak College, Dhanbad is a recognized Religious Minority Institution governed under Article 30(1) of the Constitution of India. <strong>50% of all approved intake seats</strong> in each program are reserved for Sikh Community candidates. The remaining 50% are open for General &amp; Other categories through the Chancellor Portal.
            </div>
          </div>

          {/* ══════ VIEW 1: SEAT CARDS VIEW ══════ */}
          {view === 'card' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 20, marginBottom: 36 }}>
              {seatMatrix.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.id}
                    className="gnc-hover-card"
                    style={{
                      '--card-accent': item.color,
                      '--card-glow': `${item.color}25`,
                      background: '#ffffff',
                      borderRadius: 18,
                      padding: '22px 20px',
                      border: '1.5px solid #e2e8f0',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div className="card-top-bar" style={{ background: item.color }} />

                    {/* Top row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 14 }}>
                      <div className="card-icon-box" style={{
                        width: 46,
                        height: 46,
                        borderRadius: 12,
                        background: `${item.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.color,
                        flexShrink: 0
                      }}>
                        <IconComp size={22} />
                      </div>
                      <span style={{
                        fontSize: 10.5,
                        fontWeight: 800,
                        color: item.color,
                        background: `${item.color}12`,
                        padding: '3px 9px',
                        borderRadius: 10,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5
                      }}>
                        {item.badge}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 style={{ fontSize: 17, fontWeight: 900, color: NAVY, margin: '0 0 3px', lineHeight: 1.3 }}>
                      {item.title}
                    </h3>
                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 16 }}>
                      {item.dept}
                    </div>

                    {/* Prominent Total Seats Display */}
                    <div style={{
                      background: '#f8fafc',
                      borderRadius: 14,
                      padding: '14px 16px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 16
                    }}>
                      <div>
                        <div style={{ fontSize: 11, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6 }}>
                          Total Intake
                        </div>
                        <div style={{ fontSize: 26, fontWeight: 900, color: NAVY, lineHeight: 1.1 }}>
                          {item.totalSeats} <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>Seats</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: 11.5,
                          fontWeight: 700,
                          color: '#0f2347',
                          background: '#ffffff',
                          padding: '4px 10px',
                          borderRadius: 8,
                          border: '1px solid #cbd5e1'
                        }}>
                          <Clock size={12} color={GOLD} /> {item.shift}
                        </span>
                      </div>
                    </div>

                    {/* 50-50 Quota Breakdown Pill */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 8,
                      marginBottom: 16,
                      fontSize: 12
                    }}>
                      <div style={{
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        borderRadius: 10,
                        padding: '8px 10px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: 10.5, fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase' }}>
                          General (50%)
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 900, color: '#1e3a8a' }}>
                          {item.generalSeats} Seats
                        </div>
                      </div>
                      <div style={{
                        background: '#fffbeb',
                        border: '1px solid #fde68a',
                        borderRadius: 10,
                        padding: '8px 10px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: 10.5, fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
                          Sikh Quota (50%)
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 900, color: '#78350f' }}>
                          {item.minoritySeats} Seats
                        </div>
                      </div>
                    </div>

                    {/* Footer Details */}
                    <div style={{
                      marginTop: 'auto',
                      paddingTop: 12,
                      borderTop: '1px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: 11.5,
                      color: '#64748b'
                    }}>
                      <span>Portal: <strong>{item.channel.split(' ')[0]}</strong></span>
                      <span style={{ color: NAVY, fontWeight: 700 }}>Affiliated to BBMKU</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ══════ VIEW 2: OFFICIAL SEAT MATRIX TABLE VIEW ══════ */}
          {view === 'table' && (
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: NAVY, margin: 0 }}>
                  🏛️ Official Approved Seat Matrix — Binod Bihari Mahto Koyalanchal University (BBMKU)
                </h3>
                <span style={{ fontSize: 12, color: '#64748b' }}>Scroll horizontally on smaller screens</span>
              </div>

              <div className="gnc-table-wrapper">
                <table className="gnc-data-table">
                  <thead>
                    <tr>
                      <th style={{ width: 45, textAlign: 'center' }}>#</th>
                      <th>Course / Academic Program</th>
                      <th>Department &amp; Stream</th>
                      <th>Shift &amp; Timings</th>
                      <th style={{ textAlign: 'center' }}>Total Intake</th>
                      <th style={{ textAlign: 'center' }}>General Seats (50%)</th>
                      <th style={{ textAlign: 'center' }}>Sikh Quota (50%)</th>
                      <th>Application Channel</th>
                      <th>Affiliating Body</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seatMatrix.map((item, index) => (
                      <tr key={item.id}>
                        <td style={{ textAlign: 'center', fontWeight: 800, color: '#94a3b8' }}>
                          {index + 1}
                        </td>
                        <td>
                          <div style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>
                            {item.title}
                          </div>
                          <span style={{
                            display: 'inline-block',
                            fontSize: 10.5,
                            fontWeight: 800,
                            color: item.color,
                            background: `${item.color}15`,
                            padding: '2px 7px',
                            borderRadius: 6,
                            marginTop: 3
                          }}>
                            {item.badge}
                          </span>
                        </td>
                        <td style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>
                          {item.dept}
                        </td>
                        <td style={{ fontSize: 12.5, fontWeight: 700, color: NAVY }}>
                          {item.shift}
                        </td>
                        <td style={{ textAlign: 'center', fontSize: 15, fontWeight: 900, color: NAVY }}>
                          {item.totalSeats}
                        </td>
                        <td style={{ textAlign: 'center', fontSize: 14, fontWeight: 800, color: '#1d4ed8' }}>
                          {item.generalSeats}
                        </td>
                        <td style={{ textAlign: 'center', fontSize: 14, fontWeight: 800, color: '#b45309' }}>
                          {item.minoritySeats}
                        </td>
                        <td style={{ fontSize: 12.5, color: '#334155', fontWeight: 600 }}>
                          {item.channel}
                        </td>
                        <td style={{ fontSize: 12.5, color: '#64748b' }}>
                          {item.university}
                        </td>
                      </tr>
                    ))}
                    {/* Summary Row */}
                    <tr style={{ background: `${GOLD}22`, fontWeight: 900, color: NAVY }}>
                      <td colSpan={4} style={{ textAlign: 'right', paddingRight: 16 }}>
                        TOTAL APPROVED INTAKE CAPACITY (ALL PROGRAMS):
                      </td>
                      <td style={{ textAlign: 'center', fontSize: 17, fontWeight: 900, color: NAVY }}>
                        {totalAllSeats}
                      </td>
                      <td style={{ textAlign: 'center', fontSize: 16, fontWeight: 900, color: '#1d4ed8' }}>
                        {totalGeneral}
                      </td>
                      <td style={{ textAlign: 'center', fontSize: 16, fontWeight: 900, color: '#b45309' }}>
                        {totalMinority}
                      </td>
                      <td colSpan={2} style={{ fontSize: 12, color: NAVY }}>
                        100% University Compliant
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Fade>
        <DynamicSectionsContainer sections={content?.sections} excludeIds={['seats']} />
      </AdmissionLayout>
    </div>
  );
}