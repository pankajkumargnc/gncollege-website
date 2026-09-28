// src/pages/StudentCornerPage.jsx — Digital Student Gateway
// 🎓 Comprehensive Student Governance, Academic & Support Portal (Sections 6 & 18)
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap, FileText, Calendar, Award, Send, AlertTriangle,
  HelpCircle, ExternalLink, Download, Search, CheckCircle2, Shield,
  BookOpen, Clock, PhoneCall, ChevronRight, Sparkles, Building, CreditCard,
  Library, Briefcase, Trophy, Laptop, TrendingUp, X, Filter, ArrowRight
} from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { decodePayload } from '../utils/cachedFetch';
import { COLORS } from '../styles/colors';

const N = COLORS.navy;
const G = COLORS.gold;

const DIVISIONS = [
  {
    id: 'academic',
    title: 'Academic & Digital ERP Portals',
    subtitle: 'Direct access to official examination portals, fee payment ERP, university syllabus, and institutional knowledge archives.',
    badge: 'Core Academics',
    icon: BookOpen,
    accent: '#0284c7'
  },
  {
    id: 'professional',
    title: 'AICTE Approved Professional & Vocational Wings',
    subtitle: 'Career-accelerating technical & management degrees featuring AICTE recognized BCA & BBA departments.',
    badge: 'AICTE Approved',
    icon: Laptop,
    accent: '#2563eb'
  },
  {
    id: 'welfare',
    title: 'Student Welfare, Governance & Statutory Support',
    subtitle: 'Institutional support systems ensuring financial aid, zero-tolerance safety, and transparent administrative guidance.',
    badge: 'Statutory Care',
    icon: Shield,
    accent: '#e11d48'
  }
];

const QUICK_SERVICES = [
  // ── Division 1: Academic & Digital ERP ──
  {
    title: 'College Fee Payment (CIMS ERP)',
    desc: 'Pay semester, admission, and examination fees online securely via MasterSoft CIMS Portal.',
    icon: CreditCard,
    link: 'https://cimsstudentnewui.mastersofterp.in/',
    badge: 'CIMS ERP',
    color: '#0284c7',
    category: 'academic',
    external: true
  },
  {
    title: 'Central & Digital E-Library (OPAC / INFLIBNET)',
    desc: 'Access college library catalog, e-books, journals via INFLIBNET N-LIST, and book issue/renewal rules.',
    icon: Library,
    link: '/publication/college-library',
    badge: 'E-Resources',
    color: '#0891b2',
    category: 'academic'
  },
  {
    title: 'Semester Examination Results',
    desc: 'Access university examination tabulations, marksheets, and previous semester archives.',
    icon: Award,
    link: '/publication/examination-results/2024',
    badge: 'BBMKU Results',
    color: '#16a34a',
    category: 'academic'
  },
  {
    title: 'Syllabus & NEP FYUGP Structure',
    desc: 'Comprehensive semester-wise curriculum, course outcomes, and evaluation patterns.',
    icon: BookOpen,
    link: '/syllabus',
    badge: 'NEP-2020',
    color: '#7c3aed',
    category: 'academic'
  },
  {
    title: 'Academic Calendar',
    desc: 'Yearly schedule of classes, mid-terms, holidays, sports meet, and annual events.',
    icon: Clock,
    link: '/academics/academic-calendar',
    badge: 'Session 2026-27',
    color: '#059669',
    category: 'academic'
  },

  // ── Division 2: AICTE Professional & Vocational Wings ──
  {
    title: 'BCA (Bachelor of Computer Applications)',
    desc: 'AICTE recognized 4-Year NEP FYUGP. High-tech computer labs, Python, Java, Web Tech, AI & project incubation.',
    icon: Laptop,
    link: '/academics/departments/bca',
    badge: 'AICTE Approved',
    color: '#2563eb',
    category: 'professional',
    highlight: true
  },
  {
    title: 'BBA (Bachelor of Business Administration)',
    desc: 'AICTE approved executive business education, marketing, finance, corporate internships, and industrial visits.',
    icon: TrendingUp,
    link: '/academics/departments/bba',
    badge: 'AICTE Approved',
    color: '#9333ea',
    category: 'professional',
    highlight: true
  },
  {
    title: 'Training & Placement Cell (Career & Drives)',
    desc: 'Campus recruitment drives, internship notifications, resume submission, and career counseling sessions.',
    icon: Briefcase,
    link: '/academics/placements',
    badge: 'Career Desk',
    color: '#0d9488',
    category: 'professional'
  },
  {
    title: 'NSS, NCC & Sports Youth Wings',
    desc: 'Enroll in National Cadet Corps, National Service Scheme community outreach, and annual athletics meet.',
    icon: Trophy,
    link: '/activity/ncc',
    badge: 'Youth Wings',
    color: '#ea580c',
    category: 'professional'
  },

  // ── Division 3: Student Welfare & Statutory Support ──
  {
    title: 'Scholarships & Financial Aid',
    desc: 'E-Kalyan Jharkhand, National Scholarship Portal (NSP), and Sikh Minority concessions.',
    icon: GraduationCap,
    link: '/scholarships',
    badge: 'Govt. & Aid',
    color: '#e11d48',
    category: 'welfare'
  },
  {
    title: 'Official Circulars & Notices',
    desc: 'Real-time examination dates, internal schedules, holidays, and campus circulars.',
    icon: Calendar,
    link: '/notifications',
    badge: 'Live Board',
    color: '#d97706',
    category: 'welfare'
  },
  {
    title: 'Grievance Redressal Cell',
    desc: 'Confidential online portal for academic or administrative grievance submission.',
    icon: HelpCircle,
    link: '/about-us/various-committees/grievance',
    badge: 'Statutory Cell',
    color: '#dc2626',
    category: 'welfare'
  },
  {
    title: 'Anti-Ragging & Safety Cell',
    desc: 'Zero-tolerance policy helpline, committee contacts, and UGC safety declarations.',
    icon: Shield,
    link: '/about-us/various-committees/anti-ragging',
    badge: 'Zero Tolerance',
    color: '#475569',
    category: 'welfare'
  },
  {
    title: 'Document Request & Verification',
    desc: 'Apply online for TC, Character Certificate, Bonafide, or Verification with live tracking.',
    icon: Send,
    link: '/documents/request',
    badge: 'Online Tracking',
    color: '#0284c7',
    category: 'welfare'
  }
];

const EXTERNAL_PORTALS = [
  {
    name: 'Jharkhand Chancellor Portal',
    desc: 'Single-window admissions, registration, and university enrollment for all UG programs.',
    url: 'https://universities.jharkhand.gov.in/home',
    tag: 'Govt. of Jharkhand',
    color: '#0284c7',
    icon: GraduationCap
  },
  {
    name: 'BBMKU Examination & Admit Card Portal',
    desc: 'Direct student login for exam form fill-up, regular/ex-student hall ticket, and admit card download.',
    url: 'https://bbmkuniv.in/login',
    tag: 'University Portal',
    color: '#16a34a',
    icon: Award
  },
  {
    name: 'E-Kalyan Jharkhand Scholarship Portal',
    desc: 'Post-matric scholarship application, renewal, and DBT sanction status for SC/ST/BC/Minority students.',
    url: 'https://ekalyan.cgg.gov.in/',
    tag: 'Govt. of Jharkhand',
    color: '#ea580c',
    icon: FileText
  },
  {
    name: 'APAAR / Academic Bank of Credits (ABC ID)',
    desc: 'Mandatory 12-digit APAAR/ABC ID creation and digital credit repository under UGC & NEP 2020.',
    url: 'https://www.abc.gov.in/',
    tag: 'UGC / NEP 2020',
    color: '#7c3aed',
    icon: Sparkles
  },
  {
    name: 'DigiLocker NAD Repository',
    desc: 'Access verified digital diplomas, degrees, and academic grade transcripts.',
    url: 'https://www.digilocker.gov.in/',
    tag: 'Govt. of India',
    color: '#0891b2',
    icon: Shield
  },
  {
    name: 'National Scholarship Portal (NSP)',
    desc: 'Central scholarship applications for minorities, post-matric, and merit awards.',
    url: 'https://scholarships.gov.in/',
    tag: 'Ministry of Education',
    color: '#dc2626',
    icon: Building
  }
];

export default function StudentCornerPage() {
  const [trackToken, setTrackToken] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const [docReqEnabled, setDocReqEnabled] = useState(() => {
    try {
      const cached = localStorage.getItem('gnc_site_settings_cache');
      if (cached) {
        const parsed = decodePayload(cached);
        return Boolean(parsed?.enableDocumentRequests);
      }
    } catch {}
    return false;
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleSettingsUpdate = (e) => {
      if (e.detail && 'enableDocumentRequests' in e.detail) {
        setDocReqEnabled(Boolean(e.detail.enableDocumentRequests));
      }
    };
    window.addEventListener('gnc_settings_updated', handleSettingsUpdate);

    let unsub = () => {};
    if (db) {
      unsub = onSnapshot(doc(db, 'settings', 'site'), (snap) => {
        if (snap.exists()) {
          const d = snap.data();
          setDocReqEnabled(Boolean(d?.enableDocumentRequests));
        }
      }, () => {});
    }

    return () => {
      window.removeEventListener('gnc_settings_updated', handleSettingsUpdate);
      unsub();
    };
  }, []);

  const visibleServices = useMemo(() => {
    if (docReqEnabled) return QUICK_SERVICES;
    return QUICK_SERVICES.filter(s => s.link !== '/documents/request');
  }, [docReqEnabled]);

  const categoryCounts = useMemo(() => {
    return {
      all: visibleServices.length,
      academic: visibleServices.filter(s => s.category === 'academic').length,
      professional: visibleServices.filter(s => s.category === 'professional').length,
      welfare: visibleServices.filter(s => s.category === 'welfare').length,
    };
  }, [visibleServices]);

  const filteredServices = useMemo(() => {
    return visibleServices.filter(s => {
      const matchesCat = activeCategory === 'all' || s.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q ||
        s.title.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.badge.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [visibleServices, activeCategory, searchQuery]);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const clean = trackToken.trim();
    if (!clean) return;
    navigate(`/documents/request?token=${encodeURIComponent(clean)}`);
  };

  const renderServiceCard = (srv, idx) => {
    const Icon = srv.icon;
    const isExt = Boolean(srv.external || srv.link?.startsWith('http'));
    const CardComponent = isExt ? 'a' : Link;
    const linkProps = isExt
      ? { href: srv.link, target: '_blank', rel: 'noopener noreferrer' }
      : { to: srv.link };

    return (
      <CardComponent
        key={srv.title || idx}
        {...linkProps}
        className="gnc-service-card"
        style={{
          '--card-color': srv.color,
          '--card-glow': `${srv.color}35`,
        }}
      >
        {/* Top glowing bar */}
        <div className="srv-top-bar" />

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div className="srv-icon-box" style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              background: `${srv.color}15`,
              color: srv.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${srv.color}25`
            }}>
              <Icon size={23} />
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {srv.highlight && (
                <span style={{
                  fontSize: 10.5,
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #0B1F3A, #1e3a8a)',
                  color: '#F4B942',
                  padding: '3px 9px',
                  borderRadius: 20,
                  letterSpacing: '0.4px',
                  border: '1px solid rgba(244, 185, 66, 0.4)'
                }}>
                  ★ AICTE
                </span>
              )}
              <span style={{
                fontSize: 11,
                fontWeight: 800,
                background: `${srv.color}10`,
                color: srv.color,
                padding: '3px 10px',
                borderRadius: 20,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                border: `1px solid ${srv.color}20`
              }}>
                {srv.badge}
              </span>
            </div>
          </div>

          <h3 style={{ fontSize: 16.5, fontWeight: 800, color: N, margin: '0 0 8px', lineHeight: 1.35 }}>
            {srv.title}
          </h3>
          <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.55, margin: 0 }}>
            {srv.desc}
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 22,
          paddingTop: 14,
          borderTop: '1px solid #f1f5f9'
        }}>
          <span style={{
            color: N,
            fontWeight: 800,
            fontSize: 12.5,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            {isExt ? 'Open Portal' : 'Access Service'}
          </span>
          <span className="srv-arrow" style={{ display: 'flex', alignItems: 'center' }}>
            {isExt ? <ExternalLink size={15} color={srv.color} /> : <ChevronRight size={16} color={srv.color} />}
          </span>
        </div>
      </CardComponent>
    );
  };

  const renderAicteBanner = () => (
    <div style={{
      background: 'linear-gradient(135deg, #0B1F3A 0%, #172554 100%)',
      borderRadius: 20,
      padding: '24px 28px',
      color: '#ffffff',
      marginBottom: 24,
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(244, 185, 66, 0.3)',
      boxShadow: '0 12px 30px rgba(11, 31, 58, 0.12)'
    }}>
      <div style={{
        position: 'absolute',
        right: -20,
        top: -20,
        width: 140,
        height: 140,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(244, 185, 66, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(244, 185, 66, 0.18)',
          border: '1px solid rgba(244, 185, 66, 0.4)',
          color: '#F4B942',
          padding: '4px 12px',
          borderRadius: 20,
          fontSize: 11.5,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.6px'
        }}>
          <Sparkles size={13} /> AICTE Approved Professional Programs
        </span>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>
          Affiliated to BBMK University, Dhanbad
        </span>
      </div>
      <div style={{ fontSize: 'clamp(16px, 2vw, 19px)', fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
        Empowering Future Technocrats &amp; Business Leaders (BCA &amp; BBA)
      </div>
      <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.5, margin: 0, maxWidth: 840 }}>
        Guru Nanak College offers All India Council for Technical Education (AICTE) approved Bachelor of Computer Applications (BCA) and Bachelor of Business Administration (BBA). Equipped with air-conditioned computer labs, gigabit fiber network, tech bootcamps, and career placement mentorship.
      </p>
    </div>
  );

  return (
    <div style={{ minHeight: '100dvh', background: '#F7F9FC', fontFamily: "'Inter', sans-serif" }}>
      {/* ── World-Class Glowing Hover Styles ── */}
      <style>{`
        .gnc-service-card {
          position: relative;
          background: #ffffff;
          border-radius: 20px;
          padding: 24px;
          border: 1.5px solid #e2e8f0;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px rgba(11, 31, 58, 0.03);
          overflow: hidden;
        }
        .gnc-service-card .srv-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3.5px;
          background: var(--card-color, #0284c7);
          opacity: 0.25;
          transform: scaleX(0.2);
          transform-origin: center;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gnc-service-card:hover {
          transform: translateY(-8px);
          border-color: var(--card-color, #0284c7);
          box-shadow: 0 20px 35px -8px var(--card-glow, rgba(2, 132, 199, 0.28)), 0 0 0 1px var(--card-color, #0284c7);
          background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.96) 100%);
        }
        .gnc-service-card:hover .srv-top-bar {
          opacity: 1;
          transform: scaleX(1);
          box-shadow: 0 0 12px var(--card-color, #0284c7);
        }
        .gnc-service-card .srv-icon-box {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gnc-service-card:hover .srv-icon-box {
          transform: scale(1.08);
          box-shadow: 0 0 18px var(--card-glow, rgba(2, 132, 199, 0.25));
        }
        .gnc-service-card .srv-arrow {
          transition: transform 0.25s ease, color 0.25s ease;
        }
        .gnc-service-card:hover .srv-arrow {
          transform: translateX(5px);
        }
        .category-pill {
          padding: 8px 18px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #475569;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          outline: none;
        }
        .category-pill.active {
          background: #0B1F3A;
          color: #ffffff;
          border-color: #0B1F3A;
          box-shadow: 0 6px 18px rgba(11, 31, 58, 0.25);
        }
        .category-pill:hover:not(.active) {
          background: #f1f5f9;
          border-color: #cbd5e1;
          color: #0B1F3A;
          transform: translateY(-2px);
        }

        /* ── Educational Portal Glowing Cards ── */
        .gnc-portal-card {
          position: relative;
          background: #ffffff;
          border-radius: 18px;
          padding: 22px;
          border: 1.5px solid #e2e8f0;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px rgba(11, 31, 58, 0.03);
          overflow: hidden;
        }
        .gnc-portal-card .portal-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--portal-color, #0284c7);
          opacity: 0.25;
          transform: scaleX(0.25);
          transform-origin: center;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gnc-portal-card:hover {
          transform: translateY(-6px);
          border-color: var(--portal-color, #0284c7);
          box-shadow: 0 18px 32px -8px var(--portal-glow, rgba(2, 132, 199, 0.28)), 0 0 0 1px var(--portal-color, #0284c7);
          background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.96) 100%);
        }
        .gnc-portal-card:hover .portal-top-bar {
          opacity: 1;
          transform: scaleX(1);
          box-shadow: 0 0 10px var(--portal-color, #0284c7);
        }
        .gnc-portal-card .portal-icon-box {
          transition: all 0.3s ease;
        }
        .gnc-portal-card:hover .portal-icon-box {
          transform: scale(1.12);
          box-shadow: 0 0 12px var(--portal-glow, rgba(2, 132, 199, 0.25));
        }
        .gnc-portal-card .portal-badge {
          transition: all 0.25s ease;
        }
        .gnc-portal-card:hover .portal-badge {
          transform: translateY(-1px);
        }
        .gnc-portal-card .portal-arrow {
          transition: transform 0.25s ease;
        }
        .gnc-portal-card:hover .portal-arrow {
          transform: translateX(4px);
        }
      `}</style>

      {/* ── Page Header Hero ── */}
      <header style={{
        background: 'linear-gradient(135deg, #0B1F3A 0%, #1a3a6b 100%)',
        color: '#ffffff',
        padding: 'clamp(48px, 8vw, 84px) 20px 48px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(212, 167, 44, 0.15) 0%, transparent 60%)',
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
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(212, 167, 44, 0.15)',
            border: '1px solid rgba(212, 167, 44, 0.3)',
            borderRadius: 30,
            padding: '6px 18px',
            fontSize: 12,
            fontWeight: 800,
            color: '#F4B942',
            marginBottom: 18,
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            <Sparkles size={14} /> Student Governance &amp; Services
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 5.5vw, 52px)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-1.5px',
            margin: '0 auto 16px',
            color: '#ffffff',
            textAlign: 'center'
          }}>
            Student <span style={{ color: '#F4B942' }}>Corner</span>
          </h1>

          <p style={{
            fontSize: 'clamp(14.5px, 2vw, 17px)',
            color: '#cbd5e1',
            maxWidth: 720,
            lineHeight: 1.65,
            margin: '0 auto 36px',
            textAlign: 'center'
          }}>
            {docReqEnabled 
              ? 'Centralized digital gateway for Guru Nanak College students. Access exam schedules, official circulars, syllabi, request verified certificates, and connect with student support cells.'
              : 'Centralized digital gateway for Guru Nanak College students. Access exam schedules, official circulars, syllabi, academic calendars, and connect with student support cells.'}
          </p>

          {/* Quick Document Status Tracker Bar OR Counter Notice Banner */}
          {docReqEnabled ? (
            <div style={{
              background: '#ffffff',
              borderRadius: 18,
              padding: '8px 8px 8px 20px',
              maxWidth: 620,
              width: '100%',
              margin: '0 auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap'
            }}>
              <Search size={20} color="#64748B" style={{ flexShrink: 0 }} />
              <form onSubmit={handleTrackSubmit} style={{ display: 'flex', flex: 1, gap: 8, alignItems: 'center' }}>
                <input
                  type="text"
                  value={trackToken}
                  onChange={(e) => setTrackToken(e.target.value)}
                  placeholder="Track Request (e.g. GNC-DOC-2026-000001)..."
                  aria-label="Track Document Request Token"
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: '#172033',
                    flex: 1,
                    minWidth: 180,
                    background: 'transparent'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #0B1F3A, #1a3a6b)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 12,
                    padding: '10px 20px',
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}
                >
                  Track Status →
                </button>
              </form>
            </div>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(212, 167, 44, 0.3)',
              borderRadius: 20,
              padding: '20px 28px',
              maxWidth: 720,
              width: '100%',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: 10,
              boxShadow: '0 16px 36px rgba(0,0,0,0.22)'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(212, 167, 44, 0.2)',
                border: '1px solid rgba(212, 167, 44, 0.35)',
                color: '#F4B942',
                padding: '5px 14px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.6px',
                textTransform: 'uppercase'
              }}>
                <FileText size={15} /> Offline Certificate Issuance Counter
              </div>
              <div style={{ fontWeight: 800, fontSize: 'clamp(15px, 2.2vw, 17px)', color: '#ffffff', letterSpacing: '-0.3px' }}>
                Transfer Certificate (CLC), Bonafide &amp; Character Certificates
              </div>
              <div style={{ fontSize: 'clamp(12.5px, 1.8vw, 13.5px)', color: '#cbd5e1', lineHeight: 1.55, maxWidth: 620 }}>
                Certificates are issued manually at the Administrative Counter (Mon–Sat, 10:30 AM – 3:30 PM). Please visit the college administrative office in person with your College ID and fee receipt.
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── Main Services Content ── */}
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(40px, 6vw, 64px) 20px' }}>
        
        {/* ── Section Header with Search & Tabs ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 20,
          marginBottom: 32
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: '#e0f2fe',
              color: '#0284c7',
              padding: '4px 12px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: 8
            }}>
              <Sparkles size={14} /> Comprehensive Student Ecosystem
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: N, margin: '0 0 6px', letterSpacing: '-0.5px' }}>
              Academic &amp; Student Services
            </h2>
            <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>
              Structured in 3 professional divisions: Core Academics &amp; ERP, AICTE Professional Wings, and Student Welfare.
            </p>
          </div>

          {/* Quick Search Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: 14,
            padding: '8px 14px',
            minWidth: 260,
            maxWidth: 340,
            width: '100%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <Search size={17} color="#94a3b8" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. BCA, Fee, Exam)..."
              style={{
                border: 'none',
                outline: 'none',
                fontSize: 13,
                color: N,
                width: '100%',
                background: 'transparent',
                fontWeight: 600
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', color: '#94a3b8' }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* ── Interactive 3-Category Switcher Tabs ── */}
        <div style={{
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          marginBottom: 40,
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: 16
        }}>
          <button
            onClick={() => setActiveCategory('all')}
            className={`category-pill ${activeCategory === 'all' ? 'active' : ''}`}
          >
            <Sparkles size={14} /> All Services ({categoryCounts.all})
          </button>
          <button
            onClick={() => setActiveCategory('academic')}
            className={`category-pill ${activeCategory === 'academic' ? 'active' : ''}`}
          >
            <BookOpen size={14} /> 📚 Academic &amp; ERP ({categoryCounts.academic})
          </button>
          <button
            onClick={() => setActiveCategory('professional')}
            className={`category-pill ${activeCategory === 'professional' ? 'active' : ''}`}
          >
            <Laptop size={14} /> 🚀 AICTE &amp; Careers (BCA/BBA) ({categoryCounts.professional})
          </button>
          <button
            onClick={() => setActiveCategory('welfare')}
            className={`category-pill ${activeCategory === 'welfare' ? 'active' : ''}`}
          >
            <Shield size={14} /> 🛡️ Welfare &amp; Redressal ({categoryCounts.welfare})
          </button>
        </div>

        {/* ── Services Grid Display ── */}
        {activeCategory === 'all' && !searchQuery.trim() ? (
          /* Render the 3 designated divisions sequentially */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 50, marginBottom: 60 }}>
            {DIVISIONS.map((div) => {
              const divServices = visibleServices.filter(s => s.category === div.id);
              if (divServices.length === 0) return null;
              const DivIcon = div.icon;

              return (
                <div key={div.id}>
                  {/* Division Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 16,
                    marginBottom: 20,
                    flexWrap: 'wrap'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: 10,
                          background: `${div.accent}15`,
                          color: div.accent,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <DivIcon size={18} />
                        </div>
                        <h3 style={{ fontSize: 20, fontWeight: 900, color: N, margin: 0 }}>
                          {div.title}
                        </h3>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 800,
                          background: `${div.accent}15`,
                          color: div.accent,
                          padding: '2px 8px',
                          borderRadius: 12
                        }}>
                          {divServices.length} Services
                        </span>
                      </div>
                      <p style={{ fontSize: 13.5, color: '#64748B', margin: 0, maxWidth: 760 }}>
                        {div.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* AICTE Showcase Banner inside Professional Division */}
                  {div.id === 'professional' && renderAicteBanner()}

                  {/* Division Cards Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 20
                  }}>
                    {divServices.map(renderServiceCard)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Render Filtered Cards (by Category Tab or Search Query) */
          <div style={{ marginBottom: 60 }}>
            {activeCategory === 'professional' && renderAicteBanner()}

            {filteredServices.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 20
              }}>
                {filteredServices.map(renderServiceCard)}
              </div>
            ) : (
              <div style={{
                background: '#ffffff',
                borderRadius: 20,
                padding: '48px 24px',
                textAlign: 'center',
                border: '1.5px dashed #cbd5e1',
                margin: '20px 0'
              }}>
                <Search size={36} color="#94a3b8" style={{ marginBottom: 12 }} />
                <h3 style={{ fontSize: 18, fontWeight: 800, color: N, margin: '0 0 6px' }}>
                  No services found matching "{searchQuery}"
                </h3>
                <p style={{ fontSize: 13.5, color: '#64748B', margin: '0 0 16px' }}>
                  Try searching for keywords like "BCA", "Fee", "Exam", "Library", or reset filters.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  style={{
                    background: '#0B1F3A',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: 10,
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Official External Higher-Education Portals ── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(11, 31, 58, 0.03) 0%, rgba(212, 167, 44, 0.05) 100%)',
          borderRadius: 24,
          padding: '36px 32px',
          border: '1.5px solid rgba(11, 31, 58, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Building size={20} color={N} />
            <h2 style={{ fontSize: 20, fontWeight: 900, color: N, margin: 0 }}>
              University &amp; Government Educational Portals
            </h2>
          </div>
          <p style={{ fontSize: 13.5, color: '#64748B', margin: '0 0 24px' }}>
            Official external portals for university registrations, examination admit cards, and national scholarship disbursements.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {EXTERNAL_PORTALS.map((port, idx) => {
              const PortIcon = port.icon || ExternalLink;
              return (
                <a
                  key={idx}
                  href={port.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gnc-portal-card"
                  style={{
                    '--portal-color': port.color || '#0284c7',
                    '--portal-glow': `${port.color || '#0284c7'}35`
                  }}
                >
                  <div className="portal-top-bar" />
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span className="portal-badge" style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: port.color || '#0284c7',
                        background: `${port.color || '#0284c7'}15`,
                        padding: '3px 10px',
                        borderRadius: 8,
                        border: `1px solid ${port.color || '#0284c7'}25`
                      }}>
                        {port.tag}
                      </span>
                      <div className="portal-icon-box" style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: `${port.color || '#0284c7'}10`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: port.color || '#0284c7'
                      }}>
                        <PortIcon size={14} />
                      </div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: N, margin: '0 0 6px', lineHeight: 1.35 }}>
                      {port.name}
                    </div>
                    <div style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.45 }}>
                      {port.desc}
                    </div>
                  </div>
                  <div style={{
                    marginTop: 16,
                    paddingTop: 12,
                    borderTop: '1px solid #f1f5f9',
                    fontSize: 12,
                    fontWeight: 800,
                    color: port.color || G,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>Visit Portal</span>
                    <span className="portal-arrow" style={{ display: 'flex', alignItems: 'center' }}>
                      <ExternalLink size={13} color={port.color || G} />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* ── Helpline & Support Strip ── */}
        <div style={{
          marginTop: 40,
          background: '#ffffff',
          borderRadius: 20,
          padding: '24px 32px',
          border: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap'
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 900, color: N, marginBottom: 4 }}>
              Need Help or Facing Difficulties?
            </div>
            <div style={{ fontSize: 13, color: '#64748B' }}>
              Contact the Student Welfare Desk, Bhuda &amp; Bank More Campuses during working hours (10:00 AM – 04:00 PM).
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link
              to="/contact"
              style={{
                background: '#0B1F3A',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 800
              }}
            >
              Contact Support
            </Link>
            <Link
              to="/about-us/various-committees/anti-ragging"
              style={{
                background: '#fee2e2',
                color: '#dc2626',
                textDecoration: 'none',
                padding: '10px 16px',
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 800
              }}
            >
              Anti-Ragging Helpline
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
