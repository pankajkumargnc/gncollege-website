// src/pages/AboutPages.jsx
import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
const PDFModal = lazy(() => import('../components/PDFModal'));
import usePageContent, { DynamicSectionsContainer } from '../hooks/usePageContent'; // ✅ CMS Content Hook
import DOMPurify from 'dompurify';
import {
  FileText, PhoneCall, Compass, Target, GraduationCap, Users,
  Scale, Building2, UserCheck, FolderArchive, Calendar, Download,
  Info, ShieldCheck, AlertCircle, Award, Sparkles, HeartHandshake,
  Lightbulb, BookOpen, Briefcase, Landmark, Ban, Moon, FileCheck, Loader2,
  CheckCircle2, Shield, ArrowRight, ExternalLink
} from 'lucide-react';
import '../styles/index.css';
import { resolveUrl } from '../utils/resolver';
import { splitHeading } from '../utils/splitTitle';

const N = COLORS.navy || '#0f2347';
const G = COLORS.gold || '#f4a023';

// ─── Committees Navigation Registry ──────────────────────────────
export const COMMITTEES_NAV = [
  { id: 'placement', label: 'Placement Cell', path: '/about-us/various-committees/placement', icon: Briefcase, color: '#0d9488' },
  { id: 'womens-cell', label: "Women's Cell", path: '/about-us/various-committees/womens-cell', icon: UserCheck, color: '#db2777' },
  { id: 'grievance', label: 'Grievance Redressal', path: '/about-us/various-committees/grievance', icon: Scale, color: '#d97706' },
  { id: 'anti-ragging', label: 'Anti-Ragging', path: '/about-us/various-committees/anti-ragging', icon: Ban, color: '#dc2626' },
  { id: 'sc-st', label: 'SC/ST Cell', path: '/about-us/various-committees/sc-st', icon: HeartHandshake, color: '#2563eb' },
  { id: 'obc', label: 'OBC Cell', path: '/about-us/various-committees/obc', icon: BookOpen, color: '#7c3aed' },
  { id: 'icc', label: 'ICC (Internal Complaints)', path: '/about-us/various-committees/icc', icon: ShieldCheck, color: '#059669' },
  { id: 'minority', label: 'Minority Cell', path: '/about-us/various-committees/minority', icon: Moon, color: '#0284c7' },
  { id: 'rusa', label: 'RUSA Cell', path: '/about-us/various-committees/rusa', icon: Landmark, color: '#4f46e5' },
];

// ─── Organogram Helpers ───────────────────────────────────────────
const ORG_VARIANTS = {
  apex:     { bg:'linear-gradient(135deg,#c8a84b,#b8943a)',        color:'#0a1628', border:'#c8a84b',              shadow:'0 8px 28px rgba(200,168,75,0.45)' },
  council:  { bg:'linear-gradient(135deg,#162a52,#0f1f3d)',        color:'#e5c96a', border:'rgba(200,168,75,0.6)', shadow:'0 6px 20px rgba(200,168,75,0.2)'  },
  primary:  { bg:'linear-gradient(135deg,#0f2347,#162a52)',        color:'#f0f4ff', border:'rgba(255,255,255,0.15)',shadow:'0 4px 14px rgba(0,0,0,0.4)'       },
  incharge: { bg:'linear-gradient(135deg,#0d9488,#0a7567)',        color:'#fff',    border:'#2dd4bf',              shadow:'0 4px 18px rgba(13,148,136,0.35)'  },
  body:     { bg:'linear-gradient(135deg,#0f1f3d,#1a2840)',        color:'#e2e8f0', border:'rgba(255,255,255,0.1)',shadow:'0 3px 10px rgba(0,0,0,0.35)'       },
  special:  { bg:'linear-gradient(135deg,#1e3a5f,#0f2a47)',        color:'#93c5fd', border:'rgba(147,197,253,0.3)',shadow:'0 3px 10px rgba(0,0,0,0.3)'        },
  leaf:     { bg:'rgba(255,255,255,0.04)',                          color:'#7a8ba0', border:'rgba(255,255,255,0.07)',shadow:'0 2px 6px rgba(0,0,0,0.2)'        },
};

function OrgNode({ label, sub, variant = 'body', icon, minW = 160, delay = 0 }) {
  const [hov, setHov] = useState(false);
  const v = ORG_VARIANTS[variant];
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minWidth: minW, maxWidth: 280,
        padding: variant === 'apex' || variant === 'council' ? '14px 22px'
               : variant === 'leaf' ? '8px 12px' : '11px 18px',
        background: v.bg, color: v.color,
        border: `1.5px solid ${v.border}`, borderRadius: 10,
        boxShadow: v.shadow, textAlign: 'center', cursor: 'default',
        transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
        transform: hov ? 'translateY(-3px) scale(1.03)' : 'none',
        animation: `orgFadeUp 0.5s ease ${delay}s both`,
        position: 'relative', overflow: 'hidden',
        fontSize: variant === 'apex' ? 15 : variant === 'council' ? 14 : variant === 'leaf' ? 11 : 13,
        fontWeight: variant === 'leaf' ? 500 : variant === 'apex' || variant === 'council' ? 800 : 700,
        lineHeight: 1.3, whiteSpace: 'nowrap',
      }}
    >
      {hov && <div style={{ position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,transparent,#e5c96a,transparent)' }}/>}
      {icon && <span style={{ fontSize: variant === 'apex' ? 20 : 15, marginBottom: 3 }}>{icon}</span>}
      <span>{label}</span>
      {sub && <span style={{ fontSize:10, opacity:0.72, marginTop:3, fontWeight:400, fontStyle:'italic', whiteSpace:'normal', lineHeight:1.3 }}>{sub}</span>}
    </div>
  );
}

function OrgVLine({ h = 20, color = 'rgba(200,168,75,0.35)' }) {
  return <div style={{ width:1, height:h, background:color, margin:'0 auto', flexShrink:0 }} />;
}

// ─── Helpers ─────────────────────────────────────────────────────
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

// ─── Unified Signature Hero (Student Corner Standard) ─────────────
export function PageHero({ title, subtitle, icon, badge = "SIKH MINORITY INSTITUTION • ESTD. 1970" }) {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #0B1F3A 0%, #1a3a6b 100%)',
      color: '#ffffff',
      padding: 'clamp(44px, 7vw, 76px) 20px clamp(40px, 6vw, 60px)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Radial Gold Lighting Accent */}
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

// ─── Spotlight Card: ☬ SIKH MINORITY INSTITUTION – Heritage & 1970 Roots ───
export function SikhMinoritySpotlightCard({ variant = 'sidebar', className = '' }) {
  return (
    <div
      className={`gnc-spotlight-card ${className}`}
      style={{
        '--card-accent': '#f4a023',
        '--card-glow': 'rgba(244, 160, 35, 0.35)',
        background: 'linear-gradient(145deg, #0B1F3A 0%, #172554 50%, #0f172a 100%)',
        color: '#ffffff',
        borderRadius: 18,
        padding: variant === 'compact' ? '18px 20px' : '22px 24px',
        border: '1.5px solid rgba(244, 185, 66, 0.4)',
        boxShadow: '0 8px 30px rgba(11, 31, 58, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 22,
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div className="card-top-bar" style={{ background: 'linear-gradient(90deg, #f4a023, #fbbf24)' }} />

      {/* Khanda Watermark Accent */}
      <div style={{
        position: 'absolute',
        right: -10,
        bottom: -25,
        fontSize: 105,
        color: 'rgba(244, 160, 35, 0.08)',
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1,
        fontFamily: 'serif'
      }}>
        ☬
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(244, 185, 66, 0.18)',
          border: '1px solid rgba(244, 185, 66, 0.45)',
          borderRadius: 20,
          padding: '4px 12px',
          fontSize: 11,
          fontWeight: 800,
          color: '#F4B942',
          letterSpacing: '0.6px',
          textTransform: 'uppercase'
        }}>
          <span style={{ fontSize: 13, lineHeight: 1 }}>☬</span> SIKH MINORITY
        </div>
        <span style={{
          fontSize: 11,
          fontWeight: 800,
          color: '#e2e8f0',
          background: 'rgba(255, 255, 255, 0.12)',
          padding: '3px 9px',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.15)'
        }}>
          ESTD. 1970
        </span>
      </div>

      <h4 style={{
        margin: '0 0 6px',
        fontSize: 'clamp(15px, 1.3vw, 17px)',
        fontWeight: 800,
        color: '#ffffff',
        letterSpacing: '-0.3px',
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }}>
        Heritage &amp; 1970 Roots
      </h4>

      <p style={{
        margin: '0 0 14px',
        fontSize: 12.5,
        color: '#cbd5e1',
        lineHeight: 1.6
      }}>
        Established in 1970 commemorating the 500th Birth Centenary of Sri Guru Nanak Dev Ji under the noble patronage of Gurudwara Prabandhak Committee, Dhanbad.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 8,
        paddingTop: 12,
        borderTop: '1px solid rgba(255,255,255,0.12)'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 8,
          padding: '6px 8px',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ fontSize: 9.5, textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>Status</div>
          <div style={{ fontSize: 11.5, color: '#F4B942', fontWeight: 800 }}>Deficit Grant</div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 8,
          padding: '6px 8px',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ fontSize: 9.5, textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>UGC Act</div>
          <div style={{ fontSize: 11.5, color: '#38bdf8', fontWeight: 800 }}>2(f) &amp; 12(B)</div>
        </div>
      </div>
    </div>
  );
}

// ─── Intelligent Context-Aware About Us Sidebar ─────────────────────
export function AboutSidebar() {
  const location = useLocation();
  const hashPath = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
  const currentPath = hashPath || location.pathname;

  const isCommitteePage = currentPath.includes('/various-committees');
  const isGovernancePage = currentPath.includes('/governing-body') ||
                           currentPath.includes('/college-management') ||
                           currentPath.includes('/college-staff') ||
                           currentPath.includes('/staff-council') ||
                           currentPath.includes('/audit-report');

  // 1. Adaptive Navigation Configuration based on Page Context
  const navConfig = isGovernancePage
    ? {
        title: 'Governance & Leadership',
        badge: 'Governance',
        icon: Users,
        links: [
          { label: 'Governing Body',      path: '/about-us/governing-body', icon: Users },
          { label: 'Organogram',          path: '/about-us/college-management/organogram', icon: Landmark },
          { label: "Principal's Message", path: '/about-us/principal-message', icon: GraduationCap },
          { label: 'Staff Council',       path: '/about-us/staff-council', icon: Award },
          { label: 'Teaching Faculty',    path: '/about-us/college-staff/teaching-staff', icon: Award },
          { label: 'College Profile',     path: '/about-us/college-profile', icon: Building2 },
        ]
      }
    : isCommitteePage
    ? {
        title: 'College Overview',
        badge: 'Quick Links',
        icon: Building2,
        links: [
          { label: 'College Profile',     path: '/about-us/college-profile', icon: Building2 },
          { label: 'Vision & Mission',    path: '/about-us/vision-mission', icon: Target },
          { label: "Principal's Message", path: '/about-us/principal-message', icon: GraduationCap },
          { label: 'Governing Body',      path: '/about-us/governing-body', icon: Users },
        ]
      }
    : {
        title: 'About Us Navigation',
        badge: 'Key Links',
        icon: FileText,
        links: [
          { label: 'College Profile',     path: '/about-us/college-profile', icon: Building2 },
          { label: 'Vision & Mission',    path: '/about-us/vision-mission', icon: Target },
          { label: "Principal's Message", path: '/about-us/principal-message', icon: GraduationCap },
          { label: 'Governing Body',      path: '/about-us/governing-body', icon: Users },
          { label: 'Organogram',          path: '/about-us/college-management/organogram', icon: Landmark },
        ]
      };

  // 2. Adaptive Committees Configuration
  // On Committee pages: render all 9 cells with active highlight
  // On Overview & Governance pages: render 4 primary statutory cells + View All link
  const displayedCommittees = isCommitteePage
    ? COMMITTEES_NAV
    : [
        COMMITTEES_NAV.find(c => c.id === 'placement'),
        COMMITTEES_NAV.find(c => c.id === 'anti-ragging'),
        COMMITTEES_NAV.find(c => c.id === 'womens-cell'),
        COMMITTEES_NAV.find(c => c.id === 'grievance'),
      ].filter(Boolean);

  return (
    <aside className="profile-sidebar">
      <Fade delay={0.08}>
        {/* Spotlight Card: ☬ SIKH MINORITY INSTITUTION – Heritage & 1970 Roots */}
        <SikhMinoritySpotlightCard variant="sidebar" />

        {/* Context-Aware Navigation Widget */}
        <div className="widget" style={{ borderRadius: 16, border: '1.5px solid #e2e8f0', boxShadow: '0 4px 18px rgba(11,31,58,0.04)', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #f4f7fa', paddingBottom: 12, marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: N, display: 'flex', alignItems: 'center', gap: 8 }}>
              <navConfig.icon size={18} color={G} /> {navConfig.title}
            </h3>
            <span style={{ fontSize: 11, fontWeight: 800, background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: 12 }}>
              {navConfig.badge}
            </span>
          </div>
          <ul className="quick-links" style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {navConfig.links.map((l, i) => {
              const Icon = l.icon;
              const isActive = currentPath === l.path;
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

        {/* Statutory Committees & Cells Submenu Widget */}
        <div className="widget" style={{ borderRadius: 16, border: '1.5px solid #e2e8f0', boxShadow: '0 4px 18px rgba(11,31,58,0.04)', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #f4f7fa', paddingBottom: 12, marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: N, display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldCheck size={18} color={G} /> {isCommitteePage ? 'Various Committees' : 'Key Statutory Cells'}
            </h3>
            <span style={{ fontSize: 11, fontWeight: 800, background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: 12 }}>
              {isCommitteePage ? `${COMMITTEES_NAV.length} Cells` : 'Priority'}
            </span>
          </div>
          <ul className="quick-links" style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {displayedCommittees.map((c) => {
              const Icon = c.icon;
              const isActive = currentPath === c.path;
              return (
                <li key={c.id} className="quick-link-item" style={{ borderBottom: 'none' }}>
                  <Link
                    to={c.path}
                    className={`quick-link ${isActive ? 'active' : ''}`}
                    style={{
                      borderLeft: isActive ? `3px solid ${c.color}` : 'none',
                    }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <span style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: c.color,
                      flexShrink: 0,
                      boxShadow: isActive ? `0 0 6px ${c.color}` : 'none'
                    }} />
                    <Icon size={14} style={{ opacity: isActive ? 1 : 0.75, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 13 }}>{c.label}</span>
                    <span className="link-arrow" style={{ color: isActive ? c.color : undefined }}>›</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {!isCommitteePage && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed #e2e8f0' }}>
              <Link
                to="/about-us/various-committees/placement"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 10,
                  background: 'rgba(15, 35, 71, 0.04)',
                  color: N,
                  fontSize: 12.5,
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background 0.2s ease, color 0.2s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244, 160, 35, 0.15)'; e.currentTarget.style.color = '#b45309'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15, 35, 71, 0.04)'; e.currentTarget.style.color = N; }}
              >
                <span>View All 9 Committees &amp; Cells</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Compact Administrative Desk Widget */}
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
              <PhoneCall size={18} color={G} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: 14.5, color: G, fontWeight: 800 }}>Administrative Desk</h4>
              <p style={{ margin: '2px 0 0', fontSize: 11.5, color: '#cbd5e1' }}>Direct Office Helpline</p>
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

function DataMarker({ label }) {
  // HIDDEN FOR PRODUCTION
  return null;
}

function PageLayout({ children }) {
  return (
    <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', boxSizing: 'border-box', padding: 'clamp(28px,4vw,56px) clamp(14px,2.5vw,24px) clamp(48px,6vw,88px)' }}>
      <div className="profile-layout">
        <main className="profile-main">{children}</main>
        <AboutSidebar />
      </div>
    </div>
  );
}

function MeetingPDFList({ collectionName, accentColor, emptyText }) {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState(null); // ✅ PDF Modal State

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy('date', 'desc'));
    const unsub = onSnapshot(q,
      snap => { setMeetings(snap.docs.map(d => ({ id: d.id, ...d.data() }))); setLoading(false); },
      () => setLoading(false)
    );
    return () => unsub();
  }, [collectionName]);

  if (loading) {
    return (
      <div style={{ padding: 24, textAlign: 'center', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Loader2 size={18} className="spin-animate" /> Loading proceedings…
      </div>
    );
  }
  if (meetings.length === 0) return (
    <div style={{ padding: 32, textAlign: 'center', color: '#94a3b8', background: '#f8fafc', borderRadius: 12 }}>
      <FolderArchive size={36} color="#94a3b8" style={{ marginBottom: 10, margin: '0 auto 10px' }} />
      <div style={{ fontWeight: 700 }}>{emptyText || 'No official meeting records found.'}</div>
      <div style={{ fontSize: 12, marginTop: 4 }}>
        Official circulars and minutes will appear once published.
      </div>
    </div>
  );

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {meetings.map(m => {
          const dt = m.date ? new Date(m.date) : null;
          return (
            <div key={m.id} style={{
              display: 'flex', gap: 16, alignItems: 'flex-start',
              background: '#fff', borderRadius: 14, padding: 18,
              border: '1.5px solid #e2e8f0', borderLeft: `5px solid ${accentColor || N}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <div style={{ background: accentColor || N, color: '#fff', borderRadius: 10, padding: '8px 12px', textAlign: 'center', flexShrink: 0, minWidth: 56 }}>
                <div style={{ fontSize: 20, fontWeight: 900, lineHeight: 1 }}>{dt ? dt.getDate().toString().padStart(2,'0') : '--'}</div>
                <div style={{ fontSize: 10, fontWeight: 700, marginTop: 2, opacity: 0.85 }}>{dt ? dt.toLocaleString('en-IN',{month:'short'}).toUpperCase() : '--'}</div>
                <div style={{ fontSize: 9, opacity: 0.7 }}>{dt ? dt.getFullYear() : ''}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: N, fontSize: 15 }}>{m.title}</div>
                {m.notes && <div style={{ fontSize: 13, color: '#64748b', marginTop: 4, lineHeight: 1.6 }}>{m.notes}</div>}
                <div style={{ marginTop: 10 }}>
                  <a href={m.pdfUrl} target="_blank" rel="noreferrer"
                    onClick={(e) => {
                      if (m.pdfUrl && (m.pdfUrl.includes('drive.google') || m.pdfUrl.toLowerCase().endsWith('.pdf') || m.pdfUrl.includes('firebase'))) {
                        e.preventDefault();
                        setSelectedPdf({ url: m.pdfUrl, title: m.title || 'Meeting Report' });
                      }
                    }}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, background:accentColor||N, color:'#fff', padding:'10px 18px', borderRadius:10, fontWeight:700, fontSize:13, textDecoration:'none', minHeight:44, transition:'background .25s ease, transform .25s cubic-bezier(.22,1,.36,1)' }}>
                    <FileText size={15} /> View Meeting PDF
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedPdf && (
        <Suspense fallback={null}>
          <PDFModal 
            url={selectedPdf.url} 
            title={selectedPdf.title} 
            onClose={() => setSelectedPdf(null)} 
          />
        </Suspense>
      )}
    </>
  );
}


/* ═══════════════════════════════════════════════════════════════
   1. VISION & MISSION
═══════════════════════════════════════════════════════════════ */
export function VisionMission() {
  useScrollTop();
  const { content, getText, getList } = usePageContent('vision-mission');

  // ── CMS content with hardcoded fallbacks ──
  const visionText = getText('vision', 'To be a premier institution of higher learning that nurtures leaders of tomorrow — intellectually competent, ethically grounded, and socially responsible — drawing inspiration from the teachings of Guru Nanak Devji.');
  const missionText = getText('mission', 'To provide quality and inclusive higher education to all sections of society, with special focus on the underprivileged, empowering students through academic excellence, skill development, and value-based learning.');
  const coreValues = getList('core-values', [
    { label:'Peace & Harmony', desc: 'Promoting mutual respect, communal harmony, and peaceful coexistence among diverse communities.' },
    { label:'Academic Excellence', desc: 'Fostering deep intellectual curiosity, high quality teaching, and career readiness.' },
    { label:'Inclusivity', desc: 'Welcoming learners from all socio-economic backgrounds and empowering the underprivileged.' },
    { label:'Innovation', desc: 'Embracing modern pedagogical practices, digital learning tools, and technical problem-solving.' },
    { label:'Service to Society (Seva)', desc: 'Instilling an enduring spirit of selfless community service, empathy, and social good.' },
    { label:'Integrity & Truth', desc: 'Upholding honesty, ethical transparency, and moral courage in all spheres of life.' },
  ]);

  const getCoreValueIcon = (label) => {
    const l = String(label).toLowerCase();
    if (l.includes('peace') || l.includes('harmony')) return { icon: HeartHandshake, color: '#ec4899' };
    if (l.includes('academic') || l.includes('excellence')) return { icon: GraduationCap, color: '#0284c7' };
    if (l.includes('inclusiv')) return { icon: Users, color: '#10b981' };
    if (l.includes('innovat')) return { icon: Lightbulb, color: '#f59e0b' };
    if (l.includes('service') || l.includes('society') || l.includes('seva')) return { icon: Sparkles, color: '#8b5cf6' };
    if (l.includes('integr') || l.includes('truth')) return { icon: Scale, color: '#0ea5e9' };
    return { icon: Award, color: '#f4a023' };
  };

  return (
    <div>
      <PageHero
        title={content?.title || "Vision & Mission"}
        subtitle={content?.subtitle || "Our guiding principles, founding philosophy, and institutional commitments since 1970"}
        icon={<Target size={30} />}
        badge="☬ SIKH MINORITY INSTITUTION • 1970 ROOTS"
      />
      <PageLayout>
        {/* 1. Vision & Mission 3D Split Cards */}
        <Fade>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 30 }}>
            {/* Vision Card */}
            <div
              className="gnc-hover-card gnc-about-card"
              style={{
                '--card-accent': '#f4a023',
                '--card-glow': 'rgba(244, 160, 35, 0.28)',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div className="card-top-bar" />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div className="card-icon-box" style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: 'rgba(244, 160, 35, 0.12)',
                    color: '#f4a023',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1.5px solid rgba(244, 160, 35, 0.25)'
                  }}>
                    <Target size={28} />
                  </div>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 800,
                    background: 'rgba(244, 160, 35, 0.12)',
                    color: '#b45309',
                    padding: '4px 12px',
                    borderRadius: 20,
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    border: '1px solid rgba(244, 160, 35, 0.25)'
                  }}>
                    Guiding Horizon
                  </span>
                </div>
                <h2 style={{ color: N, fontSize: 'clamp(20px, 2.2vw, 24px)', fontWeight: 800, margin: '0 0 14px' }}>
                  Our Vision
                </h2>
                <div
                  style={{ color: '#475569', lineHeight: 1.8, fontSize: 15 }}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(visionText) }}
                />
              </div>
            </div>

            {/* Mission Card */}
            <div
              className="gnc-hover-card gnc-about-card"
              style={{
                '--card-accent': '#0284c7',
                '--card-glow': 'rgba(2, 132, 199, 0.25)',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div className="card-top-bar" />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div className="card-icon-box" style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: 'rgba(2, 132, 199, 0.12)',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1.5px solid rgba(2, 132, 199, 0.25)'
                  }}>
                    <Compass size={28} />
                  </div>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 800,
                    background: 'rgba(2, 132, 199, 0.12)',
                    color: '#0369a1',
                    padding: '4px 12px',
                    borderRadius: 20,
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    border: '1px solid rgba(2, 132, 199, 0.25)'
                  }}>
                    Institutional Mandate
                  </span>
                </div>
                <h2 style={{ color: N, fontSize: 'clamp(20px, 2.2vw, 24px)', fontWeight: 800, margin: '0 0 14px' }}>
                  Our Mission
                </h2>
                <div
                  style={{ color: '#475569', lineHeight: 1.8, fontSize: 15 }}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(missionText) }}
                />
              </div>
            </div>
          </div>
        </Fade>

        {/* 2. Institutional Philosophy Banner (Teachings of Guru Nanak Dev Ji) */}
        <Fade delay={0.1}>
          <div style={{
            background: 'linear-gradient(135deg, #0B1F3A 0%, #172554 100%)',
            borderRadius: 20,
            padding: '28px 32px',
            color: '#ffffff',
            marginBottom: 30,
            border: '1px solid rgba(244, 185, 66, 0.35)',
            boxShadow: '0 12px 30px rgba(11, 31, 58, 0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              right: -10,
              top: -20,
              fontSize: 120,
              color: 'rgba(244, 185, 66, 0.05)',
              pointerEvents: 'none',
              lineHeight: 1
            }}>
              ☬
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
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
                ☬ Founding Moral Philosophy
              </span>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>
                500th Birth Centenary Heritage (1970)
              </span>
            </div>
            <h3 style={{ fontSize: 'clamp(18px, 2.2vw, 22px)', fontWeight: 800, color: '#ffffff', margin: '0 0 10px' }}>
              Three Cardinal Pillars of Sri Guru Nanak Dev Ji
            </h3>
            <p style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.65, margin: '0 0 18px', maxWidth: 860 }}>
              Guru Nanak College was established to manifest these timeless ideals in higher degree education, empowering youth through holistic moral rectitude:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#F4B942', marginBottom: 4 }}>1. Naam Japo</div>
                <div style={{ fontSize: 12.5, color: '#e2e8f0', lineHeight: 1.5 }}>Remembrance of the Divine, inner contemplation, and adherence to highest moral rectitude.</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#F4B942', marginBottom: 4 }}>2. Kirat Karo</div>
                <div style={{ fontSize: 12.5, color: '#e2e8f0', lineHeight: 1.5 }}>Earning through honest, dedicated, and socially constructive labour and academic diligence.</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#F4B942', marginBottom: 4 }}>3. Wand Chhako</div>
                <div style={{ fontSize: 12.5, color: '#e2e8f0', lineHeight: 1.5 }}>Selfless sharing of resources, knowledge, and empathy with society and the underprivileged (Seva).</div>
              </div>
            </div>
          </div>
        </Fade>

        {/* 3. Core Values 3D Grid */}
        <Fade delay={0.15}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '36px 32px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1.5px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
              <h2 className="section-heading" style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>
                Core Institutional <span>Values</span>
              </h2>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#0f2347', background: '#f1f5f9', padding: '4px 12px', borderRadius: 20 }}>
                Values We Live By
              </span>
            </div>
            <div className="heading-underline" style={{ width: 48, height: 4, background: G, borderRadius: 2, marginBottom: 24 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {coreValues.map((v, i) => {
                const { icon: ValIcon, color } = getCoreValueIcon(v.label);
                return (
                  <div
                    key={i}
                    className="gnc-hover-card gnc-about-card"
                    style={{
                      '--card-accent': color,
                      '--card-glow': `${color}35`,
                      padding: '20px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14
                    }}
                  >
                    <div className="card-top-bar" />
                    <div className="card-icon-box" style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: `${color}15`,
                      color: color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: `1px solid ${color}30`
                    }}>
                      <ValIcon size={24} />
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 6px', fontSize: 15.5, fontWeight: 800, color: N }}>
                        {v.label}
                      </h4>
                      {v.desc && (
                        <p style={{ margin: 0, fontSize: 12.5, color: '#64748b', lineHeight: 1.55 }}>
                          {v.desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Fade>
        <DynamicSectionsContainer sections={content?.sections} excludeIds={['vision', 'mission', 'core-values']} />
      </PageLayout>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   2. PRINCIPAL'S MESSAGE
═══════════════════════════════════════════════════════════════ */
export function PrincipalMessage() {
  useScrollTop();
  const { content, getText, getObject } = usePageContent('principal-message');

  // ── CMS content with safe object resolution ──
  const pInfo = getObject('principal-info', {
    name: 'Dr. Sanjay Prasad',
    designation: 'Principal',
    qualification: 'M.Com, Ph.D.',
    institution: 'Guru Nanak College, Dhanbad',
    photo: 'images/principal.webp',
    quote: 'Education is not merely the acquisition of knowledge, but the transformation of character and the cultivation of a purposeful life.'
  });

  const messageHtml = getText('message', '<p>Dear Students, Parents, and Well-Wishers,</p><p>It gives me immense joy and pride to welcome you to Guru Nanak College, Dhanbad — a premier Sikh Minority Degree College established in 1970 to mark the auspicious 500th Birth Centenary of Sri Guru Nanak Dev Ji.</p><p>For over five decades, our institution has stood as an unwavering pillar of higher education in Jharkhand. Guided by the noble vision of the Gurudwara Prabandhak Committee, Dhanbad, we are deeply committed to nurturing young minds who are not only academically accomplished but also morally grounded and socially responsible.</p><p>As we embrace the National Education Policy (NEP 2020) and modern vocational frontiers including BCA and BBA, we ensure state-of-the-art laboratories, enriched digital library resources, active placement assistance, and vibrant student wings like NSS and NCC.</p><p>I welcome you to embark on this transformative journey with us, and assure you that our faculty and administration will support you at every milestone of your academic aspirations.</p>');

  const photoSrc = resolveUrl(pInfo.photo || 'images/principal.webp');

  return (
    <div>
      <PageHero
        title={content?.title || "Principal's Message"}
        subtitle={content?.subtitle || "Leadership vision and welcoming words from the Principal's Desk"}
        icon={<GraduationCap size={30} />}
        badge="EXECUTIVE LEADERSHIP • GURU NANAK COLLEGE"
      />
      <PageLayout>
        <Fade>
          {/* Executive Leadership Spotlight Presentation */}
          <div
            className="gnc-hover-card gnc-about-card"
            style={{
              '--card-accent': '#f4a023',
              '--card-glow': 'rgba(244, 160, 35, 0.25)',
              padding: 'clamp(24px, 4vw, 36px)',
              marginBottom: 30
            }}
          >
            <div className="card-top-bar" />

            {/* Profile Grid: Portrait + Official Bio & Key Quote */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 32,
              alignItems: 'center',
              marginBottom: 28
            }}>
              {/* Leader Photo & Credentials Box */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '20px',
                background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: 20,
                border: '1.5px solid #e2e8f0'
              }}>
                <div style={{
                  position: 'relative',
                  width: 170,
                  height: 170,
                  borderRadius: '50%',
                  padding: 5,
                  background: 'linear-gradient(135deg, #f4a023, #0f2347)',
                  boxShadow: '0 10px 28px rgba(15, 35, 71, 0.18)',
                  marginBottom: 16
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    background: '#e2e8f0'
                  }}>
                    <img
                      src={photoSrc}
                      alt={pInfo.name || "Principal"}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#94a3b8"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg></div>';
                      }}
                    />
                  </div>
                  <span style={{
                    position: 'absolute',
                    bottom: 2,
                    right: 12,
                    background: '#16a34a',
                    color: '#fff',
                    border: '2px solid #fff',
                    borderRadius: '50%',
                    width: 18,
                    height: 18
                  }} title="Active Leadership" />
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(244, 160, 35, 0.12)',
                  color: '#b45309',
                  padding: '3px 12px',
                  borderRadius: 14,
                  fontSize: 11.5,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                  border: '1px solid rgba(244, 160, 35, 0.25)'
                }}>
                  Principal's Desk
                </div>

                <h3 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 900, color: N }}>
                  {pInfo.name}
                </h3>
                <div style={{ fontSize: 13.5, color: '#f4a023', fontWeight: 800 }}>
                  {pInfo.designation || 'Principal'}
                </div>
                {pInfo.qualification && (
                  <div style={{ fontSize: 12.5, color: '#64748b', fontWeight: 600, marginTop: 3 }}>
                    {pInfo.qualification}
                  </div>
                )}
                <div style={{ fontSize: 12, color: '#475569', marginTop: 4, fontWeight: 500 }}>
                  {pInfo.institution || 'Guru Nanak College, Dhanbad'}
                </div>
              </div>

              {/* Leadership Quote & Institutional Roots */}
              <div>
                <div style={{
                  position: 'relative',
                  padding: '24px 28px',
                  background: 'linear-gradient(135deg, rgba(15, 35, 71, 0.03), rgba(244, 160, 35, 0.05))',
                  borderRadius: 16,
                  borderLeft: `5px solid ${G}`,
                  border: '1px solid #e2e8f0',
                  borderLeftWidth: 5,
                  marginBottom: 20
                }}>
                  <div style={{ fontSize: 44, color: G, lineHeight: 0.8, fontFamily: 'serif', marginBottom: 4 }}>“</div>
                  <p style={{
                    fontSize: 'clamp(15px, 1.8vw, 18px)',
                    fontStyle: 'italic',
                    color: N,
                    fontWeight: 700,
                    lineHeight: 1.65,
                    margin: '0 0 10px'
                  }}>
                    {pInfo.quote}
                  </p>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#64748b' }}>
                    — Executive Message to Scholars &amp; Parents
                  </div>
                </div>

                {/* Quick Pillar Strip */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
                  <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Legacy</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: N }}>56+ Years</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Status</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#16a34a' }}>UGC 2(f) &amp; 12(B)</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Sponsorship</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: G }}>GPC Dhanbad</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Message Body */}
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 26 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 6 }}>
                <h2 className="section-heading" style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>
                  Message to Students, Parents &amp; <span>Well-Wishers</span>
                </h2>
              </div>
              <div className="heading-underline" style={{ width: 44, height: 4, background: G, borderRadius: 2, marginBottom: 20 }} />

              <div
                className="rich-text-content"
                style={{ fontSize: 15, color: '#334155', lineHeight: 1.8 }}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(messageHtml) }}
              />

              {/* Sign-off seal */}
              <div style={{ marginTop: 28, paddingTop: 18, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
                <div>
                  <div style={{ fontWeight: 800, color: N, fontSize: 15 }}>Dr. Sanjay Prasad</div>
                  <div style={{ fontSize: 12.5, color: '#64748b' }}>Principal, Guru Nanak College, Dhanbad</div>
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  color: N
                }}>
                  ☬ In the Service of Higher Education Since 1970
                </div>
              </div>
            </div>
          </div>
        </Fade>
        <DynamicSectionsContainer sections={content?.sections} excludeIds={['principal-info', 'message']} />
      </PageLayout>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   3. ORGANOGRAM
═══════════════════════════════════════════════════════════════ */
export function Organogram() {
  useScrollTop();
  const { content, getObject } = usePageContent('organogram');
  const [selectedPdf, setSelectedPdf] = useState(null); // ✅ PDF Modal State
  const orgInfo = getObject('organogram-image', { imagePath: 'images/organogram.webp', pdfUrl: '/pdfs/organogram.pdf' });
  const pdfUrl = orgInfo.pdfUrl || '/pdfs/organogram.pdf';
  const imgPath = orgInfo.imagePath || 'images/organogram.webp';
  const fullImgSrc = imgPath.startsWith('http') || imgPath.startsWith('data:') ? imgPath : `${import.meta.env.BASE_URL}${imgPath}`;

  return (
    <div>
      <PageHero title={content?.title || "Organogram"} subtitle={content?.subtitle || "Organizational structure and hierarchy of Guru Nanak College, Dhanbad"} icon={<Landmark size={40} />} />
      <PageLayout>
        {/* Image fallback */}
        <Fade delay={0.15}>
          <div style={{ background:'#fff', borderRadius:20, padding:32, boxShadow:'0 8px 30px rgba(0,0,0,0.07)', marginBottom:24 }}>
            <h2 className="section-heading">Official Organogram (Image)</h2>
            <div className="heading-underline"/>
            <div style={{ textAlign:'center', marginTop:20 }}>
              <img src={fullImgSrc} alt="College Organogram" style={{ maxWidth:'100%', borderRadius:10, boxShadow:'0 4px 16px rgba(0,0,0,0.1)' }} onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/organogram.webp`; }} />
            </div>
            <div style={{ textAlign:'center', marginTop:20 }}>
              <a href={pdfUrl} target="_blank" rel="noreferrer"
                onClick={(e) => {
                   e.preventDefault();
                   setSelectedPdf({ url: pdfUrl, title: 'Organogram' });
                }}
                style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#0f2347', color:'#fff', padding:'10px 22px', borderRadius:10, fontWeight:700, fontSize:14, textDecoration:'none' }}>
                <FileText size={16} /> View Organogram PDF
              </a>
            </div>
          </div>
        </Fade>
        <DynamicSectionsContainer sections={content?.sections} excludeIds={['organogram-image']} />
      </PageLayout>
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


/* ═══════════════════════════════════════════════════════════════
   4. COMMITTEE PAGE (Powers all 9 statutory cells & committees)
═══════════════════════════════════════════════════════════════ */
export function CommitteePage({ name, desc, icon, purpose = [], responsibilities = [], pdfReportLink, slug }) {
  // ── CMS Content Hook — slug is derived from name if not provided ──
  const committeeSlug = slug || name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const { content, getList, getTable, getObject } = usePageContent(committeeSlug);

  // ── CMS data with prop fallbacks ──
  const purposeList = getList('purpose', purpose);
  const respList = getList('responsibilities', responsibilities);
  const chairInfo = getObject('chairperson', { name: 'Chairperson / Convener', designation: 'Faculty In-Charge' });
  const membersData = getTable('members', null);
  useScrollTop();
  const [selectedPdf, setSelectedPdf] = useState(null); // ✅ PDF Modal State

  // Committee theme colors mapping
  const committeeColors = {
    'placement': '#0d9488',
    'womens-cell': '#db2777',
    'grievance': '#d97706',
    'anti-ragging': '#dc2626',
    'sc-st': '#2563eb',
    'obc': '#7c3aed',
    'icc': '#059669',
    'minority': '#0284c7',
    'rusa': '#4f46e5',
  };
  const themeColor = committeeColors[committeeSlug] || '#f4a023';

  return (
    <div>
      <PageHero
        title={content?.title || name}
        subtitle={content?.subtitle || desc}
        icon={icon}
        badge="STATUTORY CELL &amp; STUDENT WELFARE COMMITTEE"
      />
      <PageLayout>
        {/* Quick Committee Switcher Navigation Bar */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
            <span style={{ fontSize: 11.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Statutory Committees &amp; Cells (Submenu)
            </span>
            <span style={{ fontSize: 11, color: '#94a3b8' }}>Tap to switch committees</span>
          </div>
          <div className="gnc-committee-tabs">
            {COMMITTEES_NAV.map((c) => {
              const PillIcon = c.icon;
              const isCurrent = committeeSlug === c.id;
              return (
                <Link
                  key={c.id}
                  to={c.path}
                  className={`committee-nav-pill ${isCurrent ? 'active' : ''}`}
                  style={{ '--pill-color': c.color }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <span className="pill-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: c.color }} />
                  <PillIcon size={14} />
                  <span>{c.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 1. Chairperson / Convener Spotlight Card */}
        <Fade>
          <div
            className="gnc-hover-card gnc-committee-card"
            style={{
              '--card-accent': themeColor,
              '--card-glow': `${themeColor}30`,
              marginBottom: 24
            }}
          >
            <div className="card-top-bar" />
            <div style={{
              padding: 'clamp(16px, 3.5vw, 24px)',
              background: `linear-gradient(135deg, #0B1F3A 0%, #172554 100%)`,
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
              position: 'relative',
              overflow: 'hidden',
              boxSizing: 'border-box',
              width: '100%',
              maxWidth: '100%'
            }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="card-icon-box" style={{
                  width: 58,
                  height: 58,
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `2px solid ${G}`,
                  flexShrink: 0,
                  color: '#F4B942',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
                }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: G, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 2 }}>
                    Chairperson / Convener
                  </div>
                  <div style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 900 }}>
                    {chairInfo.name}
                  </div>
                  <div style={{ fontSize: 13, color: '#cbd5e1', marginTop: 3 }}>
                    {chairInfo.designation}
                  </div>
                </div>
              </div>

              {pdfReportLink && (
                <button
                  onClick={() => setSelectedPdf({ url: pdfReportLink, title: `${name} Report` })}
                  style={{
                    background: G,
                    color: N,
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: 12,
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all 0.25s cubic-bezier(.22,1,.36,1)',
                    minHeight: 44,
                    boxShadow: '0 4px 14px rgba(244, 160, 35, 0.3)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(244,160,35,0.45)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(244,160,35,0.3)'; }}
                >
                  <FileText size={16} /> View Committee Report
                </button>
              )}
            </div>
          </div>
        </Fade>

        {/* 2. Purpose & Mandate */}
        {purposeList.length > 0 && (
          <Fade delay={0.1}>
            <div
              className="gnc-hover-card gnc-committee-card"
              style={{
                '--card-accent': themeColor,
                '--card-glow': `${themeColor}25`,
                padding: 'clamp(16px, 3.5vw, 28px)',
                marginBottom: 24,
                boxSizing: 'border-box'
              }}
            >
              <div className="card-top-bar" />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 10 }}>
                <h2 className="section-heading" style={{ margin: 0, fontSize: 21, fontWeight: 800 }}>
                  Aims &amp; <span>Purpose</span>
                </h2>
                <span style={{ fontSize: 11.5, fontWeight: 800, color: themeColor, background: `${themeColor}12`, padding: '4px 12px', borderRadius: 20 }}>
                  Statutory Mandate
                </span>
              </div>
              <div className="heading-underline" style={{ width: 44, height: 4, background: themeColor, borderRadius: 2, marginBottom: 18 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {purposeList.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: `${themeColor}15`,
                      color: themeColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 2
                    }}>
                      <CheckCircle2 size={14} />
                    </div>
                    <div style={{ color: '#334155', lineHeight: 1.65, fontSize: 14.5 }}>
                      {typeof p === 'object' ? (p.title || p.text || JSON.stringify(p)) : p}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        )}

        {/* 3. Key Responsibilities in 3D Glowing Card Grid */}
        {respList.length > 0 && (
          <Fade delay={0.15}>
            <div
              className="gnc-hover-card gnc-committee-card"
              style={{
                '--card-accent': G,
                '--card-glow': 'rgba(244, 160, 35, 0.25)',
                padding: 'clamp(16px, 3.5vw, 28px)',
                marginBottom: 24,
                boxSizing: 'border-box'
              }}
            >
              <div className="card-top-bar" />
              <h2 className="section-heading" style={{ margin: '0 0 6px', fontSize: 21, fontWeight: 800 }}>
                Key <span>Responsibilities</span>
              </h2>
              <div className="heading-underline" style={{ width: 44, height: 4, background: G, borderRadius: 2, marginBottom: 20 }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
                {respList.map((r, i) => (
                  <div
                    key={i}
                    className="gnc-hover-card"
                    style={{
                      '--card-accent': themeColor,
                      '--card-glow': `${themeColor}20`,
                      padding: '16px 18px',
                      background: '#f8fafc',
                      borderRadius: 14,
                      border: '1.5px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12
                    }}
                  >
                    <div className="card-top-bar" />
                    <span style={{
                      fontSize: 11,
                      fontWeight: 800,
                      background: themeColor,
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: 8,
                      flexShrink: 0
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: 13.5, color: '#334155', fontWeight: 600, lineHeight: 1.55 }}>
                      {typeof r === 'object' ? (r.title || r.text || JSON.stringify(r)) : r}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        )}

        {/* 4. Committee Members: Desktop Table + Mobile Responsive Cards */}
        <Fade delay={0.2}>
          <div
            className="gnc-hover-card gnc-committee-card"
            style={{
              '--card-accent': '#0f2347',
              '--card-glow': 'rgba(15, 35, 71, 0.18)',
              padding: 'clamp(16px, 3.5vw, 28px)',
              boxSizing: 'border-box'
            }}
          >
            <div className="card-top-bar" />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 10 }}>
              <h2 className="section-heading" style={{ margin: 0, fontSize: 21, fontWeight: 800 }}>
                Committee <span>Members</span>
              </h2>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: '#475569', background: '#f1f5f9', padding: '4px 12px', borderRadius: 20 }}>
                Officially Constituted
              </span>
            </div>
            <div className="heading-underline" style={{ width: 44, height: 4, background: G, borderRadius: 2, marginBottom: 20 }} />

            {/* Desktop / Tablet Table View */}
            <div className="gnc-table-wrapper" style={{ overflowX: 'auto', width: '100%', maxWidth: '100%', WebkitOverflowScrolling: 'touch', borderRadius: 12, border: '1px solid #e2e8f0', boxSizing: 'border-box' }}>
              <table style={{ width: '100%', minWidth: 520, borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: N, color: '#fff' }}>
                    {(membersData?.headers || ['S.No.', 'Name', 'Designation', 'Department', 'Role']).map((h) => (
                      <th key={h} style={{ padding: '13px 16px', textAlign: 'left', fontWeight: 800, fontSize: 13, letterSpacing: '0.4px' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(membersData?.rows || [
                    [1, 'Chairperson', 'Faculty In-Charge', 'Designated Department', 'Chairperson'],
                    [2, 'Member Secretary', 'Assistant Professor', 'Designated Department', 'Member Secretary'],
                    [3, 'Senior Faculty Member', 'Associate Professor', 'Designated Department', 'Member'],
                    [4, 'Faculty Member', 'Assistant Professor', 'Designated Department', 'Member'],
                    [5, 'Student / Community Nominee', 'Representative', 'College Council', 'Member']
                  ]).map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        background: i % 2 === 0 ? '#f8fafc' : '#ffffff',
                        borderBottom: '1px solid #e2e8f0',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          style={{
                            padding: '12px 16px',
                            fontWeight: ci === 1 ? 700 : 500,
                            color: ci === 0 ? '#64748b' : ci === 1 ? N : ci < 4 ? '#334155' : 'inherit'
                          }}
                        >
                          {ci === row.length - 1 ? (
                            <span style={{
                              background: String(cell).includes('Chairperson') ? '#fef3c7'
                                : String(cell).includes('Secretary') ? '#dcfce7'
                                : '#f1f5f9',
                              color: String(cell).includes('Chairperson') ? '#92400e'
                                : String(cell).includes('Secretary') ? '#166534'
                                : '#475569',
                              padding: '4px 10px',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 800,
                              display: 'inline-block'
                            }}>
                              {cell}
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Statutory Disclaimer Bar */}
            <div style={{
              marginTop: 20,
              padding: '12px 18px',
              background: '#f8fafc',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 12.5,
              color: '#64748b'
            }}>
              <Shield size={16} color={themeColor} style={{ flexShrink: 0 }} />
              <div>
                Constituted under UGC and statutory norms of Guru Nanak College, Dhanbad. For grievance filings or submissions, contact the Administrative Office.
              </div>
            </div>
          </div>
        </Fade>
        <DynamicSectionsContainer sections={content?.sections} excludeIds={['chairperson', 'purpose', 'responsibilities', 'members']} />
      </PageLayout>
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

export function WomensCell()    { return <CommitteePage slug="womens-cell" name="Women's Cell" icon={<UserCheck size={32} />} desc="Dedicated to the safety, empowerment, and welfare of female students and staff at GNC." purpose={["Ensure a safe and harassment-free environment for women on campus.","Conduct awareness programs on women's rights and legal provisions.","Provide counselling and support to female students in need."]} responsibilities={["Monitor campus safety for women","Handle complaints related to women's issues","Organize gender sensitization workshops","Coordinate with ICC for harassment cases"]}/>; }
export function AntiRagging()   { return <CommitteePage slug="anti-ragging" name="Anti-Ragging Committee" icon={<Ban size={32} />} desc="Committed to maintaining a 100% ragging-free campus in compliance with UGC & Supreme Court guidelines." purpose={["Prevent and prohibit ragging in all forms on campus.","Create awareness among students about legal consequences of ragging.","Investigate complaints and take strict action against offenders."]} responsibilities={["Display anti-ragging notices","Collect anti-ragging affidavits","Investigate complaints promptly","Coordinate with police if required","Conduct orientation programs"]}/>; }
export function ScStCell()      { return <CommitteePage slug="sc-st" name="SC/ST Cell" icon={<HeartHandshake size={32} />} desc="A dedicated welfare and support centre for Scheduled Caste and Scheduled Tribe students." purpose={["Ensure equal educational opportunities for SC/ST students.","Guide students about government scholarships and reservations.","Resolve academic and social issues faced by SC/ST students."]} responsibilities={["Facilitate scholarship applications","Address grievances of SC/ST students","Organize awareness camps","Maintain data of SC/ST enrollment","Liaison with government welfare departments"]}/>; }
export function ObcCell()       { return <CommitteePage slug="obc" name="OBC Cell" icon={<BookOpen size={32} />} desc="Supporting students from Other Backward Classes with their academic and welfare needs." purpose={["Facilitate awareness of OBC reservations and government schemes.","Guide OBC students for scholarship applications.","Provide academic and career counselling."]} responsibilities={["Scholarship guidance for OBC students","Address academic grievances","Facilitate income/caste certificate help","Organize career awareness programs"]}/>; }
export function GrievanceCell() { return <CommitteePage slug="grievance" name="Grievance Redressal Cell" icon={<Scale size={32} />} desc="An official platform for students and staff to raise and resolve their academic and administrative grievances." purpose={["Provide a fair and transparent mechanism for addressing grievances.","Ensure prompt redressal of student and staff complaints.","Maintain a record of grievances and their resolution."]} responsibilities={["Receive and register grievances","Investigate complaints within stipulated time","Maintain grievance register","Submit reports to Principal","Ensure confidentiality and impartiality"]}/>; }
export function IccCell()       { return <CommitteePage slug="icc" name="Internal Complaints Committee (ICC)" icon={<ShieldCheck size={32} />} desc="Constituted under Sexual Harassment of Women at Workplace Act, 2013." purpose={["Prevent, prohibit, and redress sexual harassment complaints.","Conduct sensitization programs for students and staff.","Ensure impartial inquiry and fair resolution of complaints."]} responsibilities={["Receive complaints of sexual harassment","Conduct inquiry within 90 days","Maintain confidentiality of complainant","Submit annual report to District Officer","Organize prevention workshops"]}/>; }
export function MinorityCell()  { return <CommitteePage slug="minority" name="Minority Cell" icon={<Moon size={32} />} desc="A welfare cell to support and guide students from minority communities in their academic journey." purpose={["Guide minority students about government scholarships and schemes.","Create an inclusive environment for minority students.","Address specific academic and personal issues."]} responsibilities={["Pre-matric and post-matric scholarship guidance","Address minority student grievances","Organize awareness programs","Maintain enrollment data"]}/>; }
export function PlacementCell() { return <CommitteePage slug="placement" name="Placement Cell" icon={<Briefcase size={32} />} desc="Bridging students with career opportunities through training, internships, and campus placements." purpose={["Facilitate campus placements and internship opportunities.","Organize skill development and career guidance programs.","Maintain industry-academia partnerships."]} responsibilities={["Coordinate with companies for campus drives","Organize mock interviews and GD sessions","Maintain placement records","Career counselling for final year students","Organize job fairs"]}/>; }
export function RusaCell()      { return <CommitteePage slug="rusa" name="RUSA Cell" icon={<Landmark size={32} />} desc="Rashtriya Uchchatar Shiksha Abhiyan — implementing central schemes for quality improvement in higher education." purpose={["Implement RUSA-funded projects and infrastructure development.","Ensure compliance with RUSA guidelines and reporting requirements."]} responsibilities={["Coordinate RUSA grant utilization","Maintain RUSA project documentation","Submit utilization certificates","Monitor RUSA-funded activities","Liaison with State Higher Education Council"]}/>; }


/* ═══════════════════════════════════════════════════════════════
   5. GOVERNING BODY
═══════════════════════════════════════════════════════════════ */
export function GoverningBody() {
  useScrollTop();
  const { content, getText, getTable, getObject } = usePageContent('governing-body');

  // ── CMS data with safe object resolution ──
  const aboutText = getText('about-gb', '<p>The Governing Body of Guru Nanak College, Dhanbad is the supreme authority responsible for the overall management, policy decisions, and financial matters of the college. It is constituted as per UGC guidelines and the regulations of Binod Bihari Mahto Koylanchal University (BBMKU), Dhanbad.</p>');
  const gbStats = getObject('gb-stats', { session: '2024-25', totalMembers: '8', chairperson: 'President, GPC' });
  const membersData = getTable('gb-members', null);

  return (
    <div>
      <PageHero title={content?.title || "Governing Body"} subtitle={content?.subtitle || "The apex decision-making body of Guru Nanak College, Dhanbad"} icon={<Landmark size={40} />} />
      <PageLayout>
        <Fade>
          <div style={{ background:'#fff', borderRadius:20, padding:36, boxShadow:'0 8px 30px rgba(0,0,0,0.07)', marginBottom:24 }}>
            <h2 className="section-heading">About the Governing Body</h2>
            <div className="heading-underline" />
            <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutText) }} />
            <div style={{ marginTop:20, padding:'16px 24px', background:`linear-gradient(135deg,${N},#1a3a7c)`, borderRadius:12, color:'#fff', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
              <div><div style={{ fontSize:11, color:G, fontWeight:700, textTransform:'uppercase' }}>Current Session</div><div style={{ fontWeight:800, fontSize:18 }}>{gbStats.session || '2024-25'}</div></div>
              <div><div style={{ fontSize:11, color:G, fontWeight:700, textTransform:'uppercase' }}>Total Members</div><div style={{ fontWeight:800, fontSize:18 }}>{gbStats.totalMembers || '8'}</div></div>
              <div><div style={{ fontSize:11, color:G, fontWeight:700, textTransform:'uppercase' }}>Chairperson</div><div style={{ fontWeight:800, fontSize:18 }}>{gbStats.chairperson || 'President, GPC'}</div></div>
            </div>
          </div>
        </Fade>
        <Fade delay={0.1}>
          <div style={{ background:'#fff', borderRadius:20, padding:36, boxShadow:'0 8px 30px rgba(0,0,0,0.07)', marginBottom:24 }}>
            <h2 className="section-heading">Members of Governing Body</h2>
            <div className="heading-underline" />
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:14 }}>
                <thead>
                  <tr style={{ background:N, color:'#fff' }}>
                    {(membersData?.headers || ['S.No.','Name','Designation','Category','Role in GB']).map(h=>(
                      <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontWeight:700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(membersData?.rows || [
                    ['1','President, GPC','President, Gurudwara Prabandhak Committee','Management Nominee','Chairperson'],
                    ['2','Secretary, GPC','Secretary, Gurudwara Prabandhak Committee','Management Nominee','Member'],
                    ['3','Principal, GNC','Principal, Guru Nanak College','Ex-officio','Member Secretary'],
                    ['4','Management Nominee','Nominated by Managing Committee','Management Nominee','Member'],
                    ['5','UGC Nominee','Nominated by University Grants Commission','UGC Nominee','Member'],
                    ['6','University Nominee','Nominated by Affiliating University','University Nominee','Member'],
                    ['7','Teaching Staff Rep.','Elected by Teaching Staff','Teaching Staff Rep.','Member'],
                    ['8','Non-Teaching Rep.','Elected by Non-Teaching Staff','Non-Teaching Rep.','Member'],
                  ]).map((row,i)=>(
                    <tr key={i} style={{ background:i%2===0?'#f8fafc':'#fff', borderBottom:'1px solid #e2e8f0' }}>
                      <td style={{ padding:'11px 16px', color:'#64748b' }}>{row[0]}</td>
                      <td style={{ padding:'11px 16px', fontWeight:700, color:N }}>{row[1]}</td>
                      <td style={{ padding:'11px 16px', color:'#475569' }}>{row[2]}</td>
                      <td style={{ padding:'11px 16px', fontSize:12 }}><span style={{ background:'#e0f2fe', color:'#0369a1', padding:'3px 8px', borderRadius:5, fontWeight:600 }}>{row[3]}</span></td>
                      <td style={{ padding:'11px 16px' }}><span style={{ background:String(row[4]).includes('Chairperson')?'#fef3c7':String(row[4]).includes('Secretary')?'#dcfce7':'#f1f5f9', color:String(row[4]).includes('Chairperson')?'#92400e':String(row[4]).includes('Secretary')?'#166534':'#475569', padding:'3px 10px', borderRadius:6, fontSize:12, fontWeight:700 }}>{row[4]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <div style={{ background:'#fff', borderRadius:20, padding:36, boxShadow:'0 8px 30px rgba(0,0,0,0.07)' }}>
            <h2 className="section-heading">GB Meeting Reports</h2>
            <div className="heading-underline" />
            <p style={{ color:'#64748b', fontSize:14, marginBottom:20, lineHeight:1.7 }}>
              Official date-wise Governing Body meeting minutes, proceedings, and resolutions.
            </p>
            <MeetingPDFList collectionName="gb_meetings" accentColor={N} emptyText="No Governing Body meeting reports have been uploaded yet." />
          </div>
        </Fade>
        <DynamicSectionsContainer sections={content?.sections} excludeIds={['about-gb', 'gb-stats', 'gb-members']} />
      </PageLayout>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   6. STAFF COUNCIL
═══════════════════════════════════════════════════════════════ */
export function StaffCouncil() {
  useScrollTop();
  const { content, getText, getTable, getList } = usePageContent('staff-council');

  const aboutText = getText('about-sc', '<p>The Staff Council of Guru Nanak College, Dhanbad is a representative body of the teaching and non-teaching staff. It serves as an advisory body to the Principal on academic and administrative matters, and acts as a platform for raising and resolving staff concerns.</p>');
  const scMembers = getTable('sc-members', null);
  const scFunctions = getList('sc-functions', ['Academic planning and curriculum discussions','Implementation of university and UGC guidelines','Student welfare and discipline matters','Organizing college events and programs','Grievance redressal of staff members','Annual academic calendar preparation']);

  return (
    <div>
      <PageHero title={content?.title || "Staff Council"} subtitle={content?.subtitle || "The collective voice of teaching and non-teaching staff at GNC"} icon={<Users size={40} />} />
      <PageLayout>
        <Fade>
          <div style={{ background:'#fff', borderRadius:20, padding:36, boxShadow:'0 8px 30px rgba(0,0,0,0.07)', marginBottom:24 }}>
            <h2 className="section-heading">About Staff Council</h2>
            <div className="heading-underline" />
            <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutText) }} />
          </div>
        </Fade>
        <Fade delay={0.1}>
          <div style={{ background:'#fff', borderRadius:20, padding:36, boxShadow:'0 8px 30px rgba(0,0,0,0.07)', marginBottom:24 }}>
            <h2 className="section-heading">Staff Council Members</h2>
            <div className="heading-underline" />
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:14 }}>
                <thead>
                  <tr style={{ background:N, color:'#fff' }}>
                    {(scMembers?.headers || ['S.No.','Name','Designation','Department','Role']).map(h=>(
                      <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontWeight:700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(scMembers?.rows || [
                    ['1','Principal','Principal','Administration','President / Chairman'],
                    ['2','Senior Faculty','Associate Professor','Commerce','Secretary'],
                    ['3','Faculty Member','Assistant Professor','Hindi','Joint Secretary'],
                    ['4','Faculty Member','Assistant Professor','English','Member'],
                    ['5','Faculty Member','Assistant Professor','Economics','Member'],
                    ['6','Faculty Member','Assistant Professor','History','Member'],
                    ['7','Non-Teaching Staff','Office Superintendent','Administration','Non-Teaching Rep.'],
                  ]).map((row,i)=>(
                    <tr key={i} style={{ background:i%2===0?'#f8fafc':'#fff', borderBottom:'1px solid #e2e8f0' }}>
                      <td style={{ padding:'11px 16px', color:'#64748b' }}>{row[0]}</td>
                      <td style={{ padding:'11px 16px', fontWeight:700, color:N }}>{row[1]}</td>
                      <td style={{ padding:'11px 16px', color:'#475569' }}>{row[2]}</td>
                      <td style={{ padding:'11px 16px', color:'#64748b', fontSize:13 }}>{row[3]}</td>
                      <td style={{ padding:'11px 16px' }}><span style={{ background:String(row[4]).includes('President')?'#fef3c7':String(row[4])==='Secretary'?'#dcfce7':'#f1f5f9', color:String(row[4]).includes('President')?'#92400e':String(row[4])==='Secretary'?'#166534':'#475569', padding:'3px 10px', borderRadius:6, fontSize:12, fontWeight:700 }}>{row[4]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop:24, padding:20, background:'#f8fafc', borderRadius:12, border:'1px solid #e2e8f0' }}>
              <h4 style={{ color:N, fontWeight:800, marginBottom:12, fontSize:16 }}>Key Functions</h4>
              <ul style={{ paddingLeft:20, margin:0 }}>
                {scFunctions.map((f,i)=>(
                  <li key={i} style={{ color:'#475569', lineHeight:1.8, marginBottom:4 }}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <div style={{ background:'#fff', borderRadius:20, padding:36, boxShadow:'0 8px 30px rgba(0,0,0,0.07)' }}>
            <h2 className="section-heading">Staff Council Meeting Reports</h2>
            <div className="heading-underline" />
            <p style={{ color:'#64748b', fontSize:14, marginBottom:20, lineHeight:1.7 }}>
              Official date-wise Staff Council meeting minutes, proceedings, and circulars.
            </p>
            <MeetingPDFList collectionName="staff_council" accentColor="#1a3a7c" emptyText="No Staff Council meeting reports have been uploaded yet." />
          </div>
        </Fade>
        <DynamicSectionsContainer sections={content?.sections} excludeIds={['about-sc', 'sc-members', 'sc-functions']} />
      </PageLayout>
    </div>
  );
}
export function AuditReport() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const q = query(
      collection(db, 'pdfReports'),
      where('targetPage', '==', 'audit-report'),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q,
      snap => { setDocs(snap.docs.map(d => ({ id: d.id, ...d.data() }))); setLoading(false); },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  return (
    <div>
      <PageHero
        title="Audit Report"
        subtitle="Annual audit reports and financial statements of Guru Nanak College, Dhanbad"
        icon={<FileCheck size={40} />}
      />
      <PageLayout>
        <Fade>
          <div style={{ background:'#fff', borderRadius:20, padding:36, boxShadow:'0 8px 30px rgba(0,0,0,0.07)', marginBottom:24 }}>
            <h2 className="section-heading">Audit Reports</h2>
            <div className="heading-underline" />

            {loading ? (
              <div style={{ padding:32, textAlign:'center', color:'#64748b', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                <Loader2 size={18} className="spin-animate" /> Loading audit reports…
              </div>
            ) : docs.length === 0 ? (
              <div style={{ padding:32, textAlign:'center', color:'#94a3b8', background:'#f8fafc', borderRadius:12, border:'1px solid #e2e8f0' }}>
                <FileCheck size={38} color="#94a3b8" style={{ margin: '0 auto 10px' }} />
                <div style={{ fontWeight:700, marginBottom:6 }}>No audit reports have been uploaded yet.</div>
                <div style={{ fontSize:13 }}>Annual financial statements and audit certificates will appear here once published.</div>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:14, marginTop:20 }}>
                {docs.map(doc => (
                  <div key={doc.id} style={{
                    display:'flex', alignItems:'center', gap:16,
                    padding:'16px 20px', background:'#f8fafc',
                    border:'1.5px solid #e2e8f0', borderLeft:`5px solid ${N}`,
                    borderRadius:12, transition:'all .2s',
                  }}>
                    <div style={{ flexShrink:0 }}>
                      <FileText size={28} color={N} />
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:800, color:N, fontSize:15 }}>{doc.title}</div>
                      {doc.date && (
                        <div style={{ fontSize:12, color:'#64748b', marginTop:4, display:'flex', alignItems:'center', gap:4 }}>
                          <Calendar size={13} /> {new Date(doc.date).toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' })}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedPdf({ url: doc.link, title: doc.title })}
                      style={{
                        display:'inline-flex', alignItems:'center', gap:7,
                        background:N, color:'#fff',
                        padding:'10px 20px', borderRadius:10, border:'none',
                        fontWeight:700, fontSize:13, cursor:'pointer',
                        transition:'background .25s ease, transform .25s cubic-bezier(.22,1,.36,1)', flexShrink:0,
                        minHeight:44,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = G}
                      onMouseLeave={e => e.currentTarget.style.background = N}
                    >
                      <Download size={15} /> View Report
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop:24, padding:'14px 18px', background:'#fffbeb', border:'1.5px dashed #f59e0b', borderRadius:10, fontSize:13, color:'#92400e', display:'flex', alignItems:'center', gap:8 }}>
              <Info size={18} color="#d97706" style={{ flexShrink:0 }} />
              <div>
                <strong>Administrator Guidance:</strong> Publish annual audit statements via Admin Panel → Documents → Target Page: <code style={{ background:'#fef3c7', padding:'1px 6px', borderRadius:4 }}>Audit Report (/about-us/audit-report)</code>.
              </div>
            </div>
          </div>
        </Fade>
      </PageLayout>

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