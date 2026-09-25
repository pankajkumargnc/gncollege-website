// src/pages/StudentCornerPage.jsx — Digital Student Gateway
// 🎓 Comprehensive Student Governance, Academic & Support Portal (Sections 6 & 18)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap, FileText, Calendar, Award, Send, AlertTriangle,
  HelpCircle, ExternalLink, Download, Search, CheckCircle2, Shield,
  BookOpen, Clock, PhoneCall, ChevronRight, Sparkles, Building
} from 'lucide-react';
import { COLORS } from '../styles/colors';

const N = COLORS.navy;
const G = COLORS.gold;

const QUICK_SERVICES = [
  {
    title: 'Document Request & Verification',
    desc: 'Apply online for TC, Character Certificate, Bonafide, or Verification with live tracking.',
    icon: Send,
    link: '/documents/request',
    badge: 'Online Tracking',
    color: '#0284c7'
  },
  {
    title: 'Official Circulars & Notices',
    desc: 'Real-time examination dates, internal schedules, holidays, and campus circulars.',
    icon: Calendar,
    link: '/notifications',
    badge: 'Live Board',
    color: '#d97706'
  },
  {
    title: 'Semester Examination Results',
    desc: 'Access university examination tabulations, marksheets, and previous semester archives.',
    icon: Award,
    link: '/publication/examination-results/2024',
    badge: 'BBMKU',
    color: '#16a34a'
  },
  {
    title: 'Syllabus & NEP FYUGP Structure',
    desc: 'Comprehensive semester-wise curriculum, course outcomes, and evaluation patterns.',
    icon: BookOpen,
    link: '/syllabus',
    badge: 'NEP-2020',
    color: '#7c3aed'
  },
  {
    title: 'Academic Calendar',
    desc: 'Yearly schedule of classes, mid-terms, holidays, sports meet, and annual events.',
    icon: Clock,
    link: '/academics/academic-calendar',
    badge: 'Session 2026-27',
    color: '#059669'
  },
  {
    title: 'Scholarships & Financial Aid',
    desc: 'E-Kalyan Jharkhand, National Scholarship Portal (NSP), and Sikh Minority concessions.',
    icon: GraduationCap,
    link: '/scholarships',
    badge: 'Government & Aid',
    color: '#ea580c'
  },
  {
    title: 'Grievance Redressal Cell',
    desc: 'Confidential online portal for academic or administrative grievance submission.',
    icon: HelpCircle,
    link: '/about-us/various-committees/grievance',
    badge: 'Statutory Cell',
    color: '#dc2626'
  },
  {
    title: 'Anti-Ragging & Safety Cell',
    desc: 'Zero-tolerance policy helpline, committee contacts, and UGC safety declarations.',
    icon: Shield,
    link: '/about-us/various-committees/anti-ragging',
    badge: 'Zero Tolerance',
    color: '#475569'
  }
];

const EXTERNAL_PORTALS = [
  {
    name: 'Jharkhand Chancellor Portal',
    desc: 'Single-window admissions, registration, and university enrollment for all UG programs.',
    url: 'https://jharkhanduniversities.nic.in/',
    tag: 'Govt. of Jharkhand'
  },
  {
    name: 'BBMK University Examination Portal',
    desc: 'Online exam form submission, admit card download, and provisional result publishing.',
    url: 'https://bbmku.ac.in/',
    tag: 'Affiliating University'
  },
  {
    name: 'DigiLocker NAD Repository',
    desc: 'Access verified digital diplomas, degrees, and academic grade transcripts.',
    url: 'https://www.digilocker.gov.in/',
    tag: 'Govt. of India'
  },
  {
    name: 'National Scholarship Portal (NSP)',
    desc: 'Central scholarship applications for minorities, post-matric, and merit awards.',
    url: 'https://scholarships.gov.in/',
    tag: 'Ministry of Education'
  }
];

export default function StudentCornerPage() {
  const [trackToken, setTrackToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const clean = trackToken.trim();
    if (!clean) return;
    navigate(`/documents/request?token=${encodeURIComponent(clean)}`);
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#F7F9FC', fontFamily: "'Inter', sans-serif" }}>
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

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(212, 167, 44, 0.15)',
            border: '1px solid rgba(212, 167, 44, 0.3)',
            borderRadius: 30,
            padding: '6px 16px',
            fontSize: 12,
            fontWeight: 800,
            color: '#F4B942',
            marginBottom: 16,
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            <Sparkles size={14} /> Student Governance &amp; Services
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-1px',
            margin: '0 0 16px',
            color: '#ffffff'
          }}>
            Student <span style={{ color: '#F4B942' }}>Corner</span>
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 2vw, 17px)',
            color: '#cbd5e1',
            maxWidth: 720,
            lineHeight: 1.6,
            margin: '0 0 32px'
          }}>
            Centralized digital gateway for Guru Nanak College students. Access exam schedules, official circulars, syllabi, request verified certificates, and connect with student support cells.
          </p>

          {/* Quick Document Status Tracker Bar */}
          <div style={{
            background: '#ffffff',
            borderRadius: 18,
            padding: '8px 8px 8px 20px',
            maxWidth: 620,
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
        </div>
      </header>

      {/* ── Main Services Grid ── */}
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(40px, 6vw, 64px) 20px' }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: N, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
            Academic &amp; Student Services
          </h2>
          <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>
            Quick access to all essential student utilities, statutory committees, and institutional repositories.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
          marginBottom: 60
        }}>
          {QUICK_SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <Link
                key={idx}
                to={srv.link}
                style={{
                  background: '#ffffff',
                  borderRadius: 20,
                  padding: 24,
                  border: '1.5px solid #e2e8f0',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 4px 14px rgba(11, 31, 58, 0.03)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = G;
                  e.currentTarget.style.boxShadow = '0 16px 30px rgba(11, 31, 58, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(11, 31, 58, 0.03)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: `${srv.color}15`,
                      color: srv.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={22} />
                    </div>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 800,
                      background: '#f1f5f9',
                      color: '#475569',
                      padding: '3px 10px',
                      borderRadius: 20,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {srv.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 16, fontWeight: 800, color: N, margin: '0 0 8px', lineHeight: 1.3 }}>
                    {srv.title}
                  </h3>
                  <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                    {srv.desc}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: N,
                  fontWeight: 800,
                  fontSize: 12.5,
                  marginTop: 20
                }}>
                  Access Service <ChevronRight size={14} color={G} />
                </div>
              </Link>
            );
          })}
        </div>

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
            {EXTERNAL_PORTALS.map((port, idx) => (
              <a
                key={idx}
                href={port.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#ffffff',
                  borderRadius: 16,
                  padding: 20,
                  border: '1px solid #e2e8f0',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = G;
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: 8 }}>
                      {port.tag}
                    </span>
                    <ExternalLink size={14} color="#94a3b8" />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: N, margin: '0 0 6px' }}>
                    {port.name}
                  </div>
                  <div style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.4 }}>
                    {port.desc}
                  </div>
                </div>
                <div style={{ marginTop: 14, fontSize: 12, fontWeight: 800, color: G, display: 'flex', alignItems: 'center', gap: 4 }}>
                  Visit Portal →
                </div>
              </a>
            ))}
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
