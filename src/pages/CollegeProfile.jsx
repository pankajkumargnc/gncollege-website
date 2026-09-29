// src/pages/CollegeProfile.jsx
import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import '../styles/index.css';
import usePageContent, { DynamicSectionsContainer } from '../hooks/usePageContent';
import { Building2, GraduationCap, Users, BookOpen, MapPin, Award, Landmark, Sparkles, BookmarkCheck, CheckCircle2 } from 'lucide-react';
import { AboutSidebar, SikhMinoritySpotlightCard, PageHero } from './AboutPages';

const CollegeProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { content, getText, getList } = usePageContent('college-profile');
  const heroTitle = content?.title || "College Profile & History";
  const heroSubtitle = content?.subtitle || "Excellence in Value-Based Higher Degree Education Since 1970";

  const profileHtml = getText(
    'intro',
    '<p>Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was established by the Gurudwara Prabandhak Committee in 1970 to commemorate the 500th Birth Centenary of Sri Guru Nanak Dev Ji, the revered founder of Sikhism.</p><p style="margin-top: 14px;">The college is governed by an eminent Governing Council nominated by the Gurudwara Prabandhak Committee, Dhanbad, and draws its perennial inspiration from the timeless teachings of universal brotherhood, selfless service (Seva), and moral rectitude propounded by Guru Nanak Dev Ji.</p>'
  );

  const aboutHtml = getText(
    'about',
    '<p>Initially affiliated with Ranchi University upon its founding in 1970, the college became a premier constituent pillar of Binod Bihari Mahto Koyalanchal University (BBMKU), Dhanbad upon its establishment in 2017.</p><p style="margin-top: 14px;">At present, Guru Nanak College enjoys permanent affiliation with BBMKU across Humanities, Social Sciences, Commerce, and premier vocational disciplines including Bachelor of Computer Applications (BCA). The college holds the prestigious "Deficit Grant College Status" conferred by the Government of Jharkhand and is permanently recognized under Sections 2(f) and 12(B) of the UGC Act, 1956.</p><p style="margin-top: 14px;">The foundational objective of the Gurudwara Prabandhak Committee in sponsoring this institution was to provide value-grounded higher education to the youth of Dhanbad and the surrounding coal belt. Beyond academic degree qualifications, the college places vital emphasis on moral consciousness, character building, and social responsibility.</p>'
  );

  const stats = getList('stats', [
    { label: "Years of Heritage", value: "56+", icon: <Building2 size={22} style={{ color: '#f4a023' }} /> },
    { label: "Qualified Faculty", value: "65+", icon: <GraduationCap size={22} style={{ color: '#f4a023' }} /> },
    { label: "Enrolled Scholars", value: "5,000+", icon: <Users size={22} style={{ color: '#f4a023' }} /> },
    { label: "Academic Programs", value: "15+", icon: <BookOpen size={22} style={{ color: '#f4a023' }} /> }
  ]);

  const milestones = [
    {
      year: "1970",
      title: "Foundation & Inception",
      desc: "Established by Gurudwara Prabandhak Committee, Dhanbad on the auspicious occasion of the 500th Birth Centenary of Sri Guru Nanak Dev Ji. First affiliated with Ranchi University.",
      badge: "Inception",
      icon: <Building2 size={18} />
    },
    {
      year: "1985",
      title: "UGC 2(f) & 12(B) Recognition",
      desc: "Conferred permanent recognition under Sections 2(f) and 12(B) of the UGC Act and granted Deficit Grant College Status by the Government of Jharkhand.",
      badge: "Recognition",
      icon: <Award size={18} />
    },
    {
      year: "2000",
      title: "Bank More Women's Wing Inception",
      desc: "Dedicated women's campus inaugurated at Bank More, Dhanbad to empower female scholars across the coal belt with specialized morning degree classes.",
      badge: "Expansion",
      icon: <GraduationCap size={18} />
    },
    {
      year: "2017",
      title: "Affiliation to BBMKU Dhanbad",
      desc: "Permanently affiliated with the newly established Binod Bihari Mahto Koyalanchal University (BBMKU) as a premier Sikh Minority Degree College.",
      badge: "University Shift",
      icon: <Landmark size={18} />
    },
    {
      year: "Present",
      title: "NEP-2020 & Digital Campus",
      desc: "Complete rollout of NEP 2020 4-year FYUGP degree courses, smart audio-visual lecture theatres, digitized library resources, and active placement drives.",
      badge: "Modern Era",
      icon: <Sparkles size={18} />
    }
  ];

  return (
    <div className="profile-page-wrapper">
      <style>{`
        /* Historic Milestones Enhanced Modern Timeline */
        .milestones-timeline-track {
          position: relative;
          padding-left: 36px;
          margin-top: 18px;
        }
        .milestones-timeline-track::before {
          content: '';
          position: absolute;
          left: 14px;
          top: 14px;
          bottom: 24px;
          width: 3px;
          background: linear-gradient(180deg, #f4a023 0%, #1e40af 50%, #0f2347 100%);
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(244, 160, 35, 0.3);
        }
        .milestone-card-interactive {
          position: relative;
          margin-bottom: 24px;
          animation: milestoneFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .milestone-card-interactive:last-child {
          margin-bottom: 0;
        }
        @keyframes milestoneFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .milestone-node {
          position: absolute;
          left: -36px;
          top: 14px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0f2347, #1e3a8a);
          color: #f4a023;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          box-shadow: 0 0 0 4px #ffffff, 0 4px 12px rgba(15, 35, 71, 0.25);
          z-index: 2;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .milestone-pulse {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 2px solid rgba(244, 160, 35, 0.6);
          animation: milestonePulse 2.4s infinite ease-out;
        }
        @keyframes milestonePulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .milestone-card-body {
          margin-left: 14px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px 24px;
          box-shadow: 0 4px 16px rgba(15, 35, 71, 0.04);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .milestone-card-body::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #f4a023, #0f2347);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .milestone-card-interactive:hover .milestone-card-body {
          transform: translateX(8px) translateY(-3px);
          box-shadow: 0 14px 32px rgba(15, 35, 71, 0.1), 0 0 0 1px rgba(244, 160, 35, 0.4);
          border-color: rgba(244, 160, 35, 0.4);
          background: linear-gradient(180deg, #ffffff 0%, #fafcff 100%);
        }
        .milestone-card-interactive:hover .milestone-card-body::before {
          opacity: 1;
        }
        .milestone-card-interactive:hover .milestone-node {
          transform: scale(1.2) rotate(8deg);
          background: linear-gradient(135deg, #f4a023, #d97706);
          color: #0f2347;
          box-shadow: 0 0 0 6px #ffffff, 0 6px 20px rgba(244, 160, 35, 0.4);
        }
        .milestone-year-pill {
          background: linear-gradient(135deg, #0f2347, #1e3a8a);
          color: #f4a023;
          padding: 3px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 6px rgba(15, 35, 71, 0.2);
        }
        .milestone-badge-pill {
          font-size: 11px;
          font-weight: 800;
          color: #475569;
          background: #f1f5f9;
          padding: 3px 10px;
          border-radius: 6px;
          text-transform: uppercase;
          letterSpacing: 0.5px;
        }
        .milestone-card-title {
          margin: 0 0 6px;
          font-size: 16.5px;
          font-weight: 800;
          color: #0f2347;
          letter-spacing: -0.2px;
          transition: color 0.2s ease;
        }
        .milestone-card-interactive:hover .milestone-card-title {
          color: #1e3a8a;
        }
        .milestone-card-desc {
          margin: 0;
          font-size: 13.5px;
          color: #475569;
          line-height: 1.65;
        }
      `}</style>

      {/* Unified Signature Hero matching all pages */}
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        icon={<Building2 size={30} />}
        badge="☬ SIKH MINORITY INSTITUTION • ESTD. 1970"
      />

      {/* Institutional Stats Strip — Glowing 3D Cards */}
      <div style={{ maxWidth: '1200px', margin: '28px auto 24px', padding: '0 clamp(16px, 3vw, 24px)', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="gnc-hover-card gnc-about-card"
              style={{
                '--card-accent': '#f4a023',
                '--card-glow': 'rgba(244, 160, 35, 0.22)',
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 14
              }}
            >
              <div className="card-top-bar" />
              <div className="card-icon-box" style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'rgba(244,160,35,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(244,160,35,0.25)',
                flexShrink: 0
              }}>
                {stat.icon || '📊'}
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#0f2347', lineHeight: 1.1 }}>
                  {stat.value || stat.num || '0'}
                </div>
                <div style={{ fontSize: 12.5, color: '#64748b', fontWeight: 600, marginTop: 2 }}>
                  {stat.label || stat.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(10px, 2vw, 20px) clamp(16px, 3vw, 24px) clamp(50px, 6vw, 80px)' }}>
        <div className="profile-layout">
          <main className="profile-main">
            {/* 1. College Profile & Institutional Identity Card */}
            <section
              className="gnc-hover-card gnc-about-card"
              style={{
                '--card-accent': '#0f2347',
                '--card-glow': 'rgba(15, 35, 71, 0.15)',
                padding: 'clamp(24px, 4vw, 36px)',
                marginBottom: 30
              }}
            >
              <div className="card-top-bar" />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 8 }}>
                <h2 className="section-heading" style={{ fontSize: '24px', fontWeight: 900, margin: 0 }}>
                  Institutional <span>Profile</span>
                </h2>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#0f2347', background: '#f1f5f9', padding: '4px 12px', borderRadius: 20 }}>
                  Permanent Affiliation
                </span>
              </div>
              <div className="heading-underline" style={{ width: 50, height: 4, background: '#f4a023', borderRadius: 2, marginBottom: 24 }} />

              {/* 2-Column Responsive Layout: Photo & Key Facts + Narrative */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, alignItems: 'start', marginBottom: 24 }}>
                {/* Real Campus Photo Card with Official Seal */}
                <div style={{ background: '#f8fafc', borderRadius: 16, overflow: 'hidden', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 14px rgba(15,35,71,0.06)' }}>
                  <div style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
                    <img
                      src="/images/college_photo.webp"
                      alt="Guru Nanak College Dhanbad Campus"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(15,35,71,0.85) 100%)' }} />
                    <span style={{ position: 'absolute', bottom: 12, left: 14, color: '#fff', fontWeight: 800, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <MapPin size={13} style={{ color: '#f4a023' }} /> Bhuda Campus, Dhanbad
                    </span>
                  </div>
                  <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#0f2347', textTransform: 'uppercase', flexShrink: 0 }}>Affiliated University</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#1e40af', textAlign: 'right' }}>Binod Bihari Mahto Koyalanchal University (BBMKU), Dhanbad</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#0f2347', textTransform: 'uppercase' }}>UGC Status</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#047857' }}>2(f) &amp; 12(B) Permanent</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#0f2347', textTransform: 'uppercase' }}>Institution Category</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#9333ea' }}>Deficit Grant Sikh Minority</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#0f2347', textTransform: 'uppercase' }}>Sponsoring Body</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#d97706' }}>Gurudwara Prabandhak Comm.</span>
                    </div>
                  </div>
                </div>

                {/* Narrative Intro Text */}
                <div style={{ fontSize: 15, color: '#334155', lineHeight: 1.8 }}>
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(profileHtml) }} />
                </div>
              </div>

              {/* Detailed About College Section */}
              <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: 19, fontWeight: 800, color: '#0f2347', marginBottom: 12 }}>
                  Academic Roots &amp; Evolution
                </h3>
                <div style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.75 }}>
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutHtml) }} />
                </div>
              </div>
            </section>

            {/* 2. Dual Campuses Section — Glowing 3D Cards */}
            <section
              className="gnc-hover-card gnc-about-card"
              style={{
                '--card-accent': '#0284c7',
                '--card-glow': 'rgba(2, 132, 199, 0.2)',
                padding: 'clamp(24px, 4vw, 36px)',
                marginBottom: 30
              }}
            >
              <div className="card-top-bar" />
              <h2 className="section-heading" style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 8px' }}>
                Our <span>Campuses</span>
              </h2>
              <div className="heading-underline" style={{ width: 50, height: 4, background: '#f4a023', borderRadius: 2, marginBottom: 20 }} />
              <p style={{ fontSize: 14.5, color: '#64748b', marginBottom: 24 }}>
                To serve both co-educational scholars and dedicated female education, Guru Nanak College operates across two prominent campuses in Dhanbad:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                {/* Campus 1: Bhuda */}
                <div
                  className="gnc-hover-card"
                  style={{
                    '--card-accent': '#0f2347',
                    '--card-glow': 'rgba(15, 35, 71, 0.2)',
                    padding: '24px',
                    borderRadius: 16
                  }}
                >
                  <div className="card-top-bar" />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <div className="card-icon-box" style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'rgba(15, 35, 71, 0.1)',
                      color: '#0f2347',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22
                    }}>
                      🏛️
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 16.5, fontWeight: 800, color: '#0f2347' }}>Bhuda Campus (Main Wing)</h4>
                      <span style={{ fontSize: 12, color: '#f4a023', fontWeight: 700 }}>Boys &amp; Co-Educational Complex</span>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: '#475569', lineHeight: 1.65 }}>
                    Situated in the peaceful, green surroundings of Bhuda, the main campus hosts expansive administrative offices, modern BCA computer laboratories, central library archives, seminar halls, NCC/NSS activity hubs, and athletic grounds.
                  </p>
                </div>

                {/* Campus 2: Bank More */}
                <div
                  className="gnc-hover-card"
                  style={{
                    '--card-accent': '#047857',
                    '--card-glow': 'rgba(4, 120, 87, 0.2)',
                    padding: '24px',
                    borderRadius: 16
                  }}
                >
                  <div className="card-top-bar" />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <div className="card-icon-box" style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'rgba(4, 120, 87, 0.1)',
                      color: '#047857',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22
                    }}>
                      👩‍🎓
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 16.5, fontWeight: 800, color: '#0f2347' }}>Bank More Campus (Women's Wing)</h4>
                      <span style={{ fontSize: 12, color: '#047857', fontWeight: 700 }}>Dedicated Morning Degree Wing</span>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: '#475569', lineHeight: 1.65 }}>
                    Established in the year 2000 in the heart of Dhanbad at Bank More, this dedicated morning wing provides an exclusive, empowering educational environment for female students pursuing B.A. and B.Com. (Hons &amp; General) courses.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Historic Milestones (Interactive & Animated Journey) */}
            <section
              className="gnc-hover-card gnc-about-card"
              style={{
                '--card-accent': '#f4a023',
                '--card-glow': 'rgba(244, 160, 35, 0.2)',
                padding: 'clamp(24px, 4vw, 36px)',
                marginBottom: 30
              }}
            >
              <div className="card-top-bar" />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
                <h2 className="section-heading" style={{ fontSize: '24px', fontWeight: 900, margin: 0 }}>
                  Historic Milestones &amp; <span>Heritage</span>
                </h2>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#f4a023', background: 'rgba(244,160,35,0.12)', padding: '4px 12px', borderRadius: 20, border: '1px solid rgba(244,160,35,0.3)' }}>
                  EST. 1970 ➔ 2026+
                </span>
              </div>
              <div className="heading-underline" style={{ width: 50, height: 4, background: '#f4a023', borderRadius: 2, marginBottom: 24 }} />

              <div className="milestones-timeline-track">
                {milestones.map((m, idx) => (
                  <div key={idx} className="milestone-card-interactive" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="milestone-node">
                      <span style={{ position: 'relative', zIndex: 3 }}>{m.icon}</span>
                      <span className="milestone-pulse" />
                    </div>
                    <div className="milestone-card-body">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                        <span className="milestone-year-pill">
                          {m.year}
                        </span>
                        <span className="milestone-badge-pill">
                          {m.badge}
                        </span>
                      </div>
                      <h4 className="milestone-card-title">
                        {m.title}
                      </h4>
                      <p className="milestone-card-desc">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Dynamic sections from Content Manager */}
            <DynamicSectionsContainer sections={content?.sections} excludeIds={['intro', 'about', 'stats', 'timeline']} />
          </main>

          {/* Unified Sidebar — 100% Synchronized with all About Us pages */}
          <AboutSidebar />
        </div>
      </div>
    </div>
  );
};

export default CollegeProfile;