// src/pages/CollegeProfile.jsx
import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import '../styles/index.css';
import usePageContent, { DynamicSectionsContainer } from '../hooks/usePageContent';

const CollegeProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { content, getText, getList } = usePageContent('college-profile');
  const heroTitle = content?.title || "College Profile & History";
  const heroSubtitle = content?.subtitle || "Excellence in Value-Based Degree Education Since 1970";

  const profileHtml = getText(
    'intro',
    '<p>Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was established by the Gurudwara Prabandhak Committee in 1970 to commemorate the 500th Birth Centenary of Sri Guru Nanak Dev Ji, the revered founder of Sikhism.</p><p style="margin-top: 14px;">The college is governed by an eminent Governing Council nominated by the Gurudwara Prabandhak Committee, Dhanbad, and draws its perennial inspiration from the timeless teachings of universal brotherhood, selfless service (Seva), and moral rectitude propounded by Guru Nanak Dev Ji.</p>'
  );

  const aboutHtml = getText(
    'about',
    '<p>Initially affiliated with Ranchi University upon its founding in 1970, the college became a premier constituent pillar of Binod Bihari Mahto Koyalanchal University (BBMKU), Dhanbad upon its establishment in 2017.</p><p style="margin-top: 14px;">At present, Guru Nanak College enjoys permanent affiliation with BBMKU across Humanities, Social Sciences, Commerce, and premier vocational disciplines including Bachelor of Computer Applications (BCA). The college holds the prestigious "Deficit Grant College Status" conferred by the Government of Jharkhand and is permanently recognized under Sections 2(f) and 12(B) of the UGC Act, 1956.</p><p style="margin-top: 14px;">The foundational objective of the Gurudwara Prabandhak Committee in sponsoring this institution was to provide value-grounded higher education to the youth of Dhanbad and the surrounding coal belt. Beyond academic degree qualifications, the college places vital emphasis on moral consciousness, character building, and social responsibility.</p>'
  );

  const stats = getList('stats', [
    { label: "Years of Heritage", value: "56+", icon: "🏛️" },
    { label: "Qualified Faculty", value: "65+", icon: "👨‍🏫" },
    { label: "Enrolled Scholars", value: "5,000+", icon: "🎓" },
    { label: "Academic Programs", value: "15+", icon: "📚" }
  ]);

  const milestones = [
    {
      year: "1970",
      title: "Foundation & Inception",
      desc: "Established by Gurudwara Prabandhak Committee, Dhanbad on the auspicious occasion of the 500th Birth Centenary of Sri Guru Nanak Dev Ji. First affiliated with Ranchi University.",
      badge: "Inception",
      icon: "🏛️"
    },
    {
      year: "1985",
      title: "UGC 2(f) & 12(B) Recognition",
      desc: "Conferred permanent recognition under Sections 2(f) and 12(B) of the UGC Act and granted Deficit Grant College Status by the Government of Jharkhand.",
      badge: "Recognition",
      icon: "📜"
    },
    {
      year: "2000",
      title: "Bank More Women's Wing Inception",
      desc: "Dedicated women's campus inaugurated at Bank More, Dhanbad to empower female scholars across the coal belt with specialized morning degree classes.",
      badge: "Expansion",
      icon: "👩‍🎓"
    },
    {
      year: "2017",
      title: "Affiliation to BBMKU Dhanbad",
      desc: "Permanently affiliated with the newly established Binod Bihari Mahto Koyalanchal University (BBMKU) as a premier Sikh Minority Degree College.",
      badge: "University Shift",
      icon: "🎓"
    },
    {
      year: "Present",
      title: "NEP-2020 & Digital Campus",
      desc: "Complete rollout of NEP 2020 4-year FYUGP degree courses, smart audio-visual lecture theatres, digitized library resources, and active placement drives.",
      badge: "Modern Era",
      icon: "🚀"
    }
  ];

  return (
    <div className="profile-page-wrapper">
      <style>{`
        .profile-fact-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          padding: 20px;
          box-shadow: 0 4px 16px rgba(15,35,71,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .profile-fact-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(15,35,71,0.1);
        }
        .campus-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          padding: 24px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(15,35,71,0.05);
          transition: transform 0.2s ease;
        }
        .campus-card:hover {
          transform: translateY(-4px);
        }
        .campus-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0f2347, #f4a023);
        }
        .milestone-step {
          position: relative;
          padding-left: 36px;
          padding-bottom: 28px;
          border-left: 2px solid #e2e8f0;
        }
        .milestone-step:last-child {
          border-left: 2px solid transparent;
          padding-bottom: 0;
        }
        .milestone-dot {
          position: absolute;
          left: -14px;
          top: 0;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #0f2347;
          color: #f4a023;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          box-shadow: 0 0 0 4px #fff, 0 2px 8px rgba(15,35,71,0.2);
        }
      `}</style>

      {/* Hero */}
      <header className="profile-hero" style={{ backgroundImage: `url('/images/college_photo.webp')` }}>
        <div className="hero-overlay" style={{ background: 'linear-gradient(135deg, rgba(15, 35, 71, 0.94) 0%, rgba(10, 25, 47, 0.88) 100%)' }} />
        <div className="hero-content anim-fade-in">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244, 160, 35, 0.18)', border: '1px solid rgba(244, 160, 35, 0.4)', borderRadius: 20, padding: '4px 14px', marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: '#f4a023', fontWeight: 800, letterSpacing: 0.5 }}>ESTABLISHED 1970 • UGC 2(F) &amp; 12(B)</span>
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 900, letterSpacing: '-0.5px' }}>
            {heroTitle}
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: 700, margin: '0 auto', fontSize: 15, opacity: 0.9 }}>
            {heroSubtitle}
          </p>
        </div>
      </header>

      {/* Overlapping Institutional Stats Strip */}
      <div style={{ maxWidth: '1120px', margin: '-50px auto 30px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '20px 28px', boxShadow: '0 12px 36px rgba(15,35,71,0.09)', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(244,160,35,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                {stat.icon || '📊'}
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#0f2347', lineHeight: 1.1 }}>{stat.value || stat.num || '0'}</div>
                <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{stat.label || stat.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px 60px' }}>
        <div className="profile-layout">
          <main className="profile-main">
            {/* 1. College Profile & Institutional Identity Card */}
            <section style={{ background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
              <h2 className="section-heading" style={{ fontSize: '24px', color: '#0f2347', fontWeight: 900, margin: '0 0 8px' }}>
                Institutional Profile
              </h2>
              <div className="heading-underline" style={{ width: 50, height: 4, background: '#f4a023', borderRadius: 2, marginBottom: 24 }} />

              {/* 2-Column Responsive Layout: Photo & Key Facts + Narrative */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28, alignItems: 'start', marginBottom: 24 }}>
                {/* Real Campus Photo Card with Official Seal */}
                <div style={{ background: '#f8fafc', borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(15,35,71,0.06)' }}>
                  <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                    <img
                      src="/images/college_photo.webp"
                      alt="Guru Nanak College Dhanbad Campus"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(15,35,71,0.85) 100%)' }} />
                    <span style={{ position: 'absolute', bottom: 12, left: 14, color: '#fff', fontWeight: 800, fontSize: 13 }}>
                      📍 Bhuda Campus, Dhanbad
                    </span>
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#0f2347', textTransform: 'uppercase' }}>Affiliated University</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#1e40af' }}>BBMKU, Dhanbad</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#0f2347', textTransform: 'uppercase' }}>UGC Status</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#047857' }}>2(f) &amp; 12(B) Permanent</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
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

            {/* 2. Dual Campuses Section */}
            <section style={{ background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
              <h2 className="section-heading" style={{ fontSize: '24px', color: '#0f2347', fontWeight: 900, margin: '0 0 8px' }}>
                Our Campuses
              </h2>
              <div className="heading-underline" style={{ width: 50, height: 4, background: '#f4a023', borderRadius: 2, marginBottom: 20 }} />
              <p style={{ fontSize: 14.5, color: '#64748b', marginBottom: 24 }}>
                To serve both co-educational scholars and dedicated female education, Guru Nanak College operates across two prominent campuses in Dhanbad:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                {/* Campus 1: Bhuda */}
                <div className="campus-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: 24 }}>🏛️</span>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#0f2347' }}>Bhuda Campus (Main Wing)</h4>
                      <span style={{ fontSize: 12, color: '#f4a023', fontWeight: 700 }}>Boys &amp; Co-Educational Complex</span>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: '#475569', lineHeight: 1.65 }}>
                    Situated in the peaceful, green surroundings of Bhuda, the main campus hosts expansive administrative offices, modern BCA computer laboratories, central library archives, seminar halls, NCC/NSS activity hubs, and athletic grounds.
                  </p>
                </div>

                {/* Campus 2: Bank More */}
                <div className="campus-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: 24 }}>👩‍🎓</span>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#0f2347' }}>Bank More Campus (Women's Wing)</h4>
                      <span style={{ fontSize: 12, color: '#047857', fontWeight: 700 }}>Dedicated Morning Degree Wing</span>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: '#475569', lineHeight: 1.65 }}>
                    Established in the year 2000 in the heart of Dhanbad at Bank More, this dedicated morning wing provides an exclusive, empowering educational environment for female students pursuing B.A. and B.Com. (Hons &amp; General) courses.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Historic Milestones (Clean Modern Steps) */}
            <section style={{ background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
              <h2 className="section-heading" style={{ fontSize: '24px', color: '#0f2347', fontWeight: 900, margin: '0 0 8px' }}>
                Historic Milestones
              </h2>
              <div className="heading-underline" style={{ width: 50, height: 4, background: '#f4a023', borderRadius: 2, marginBottom: 24 }} />

              <div style={{ marginTop: 10 }}>
                {milestones.map((m, idx) => (
                  <div key={idx} className="milestone-step">
                    <div className="milestone-dot">{m.icon}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span style={{ background: '#0f2347', color: '#f4a023', padding: '2px 10px', borderRadius: 6, fontSize: 12, fontWeight: 800 }}>
                        {m.year}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                        {m.badge}
                      </span>
                    </div>
                    <h4 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 800, color: '#0f2347' }}>
                      {m.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: 13.5, color: '#475569', lineHeight: 1.6 }}>
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Dynamic sections from Content Manager */}
            <DynamicSectionsContainer sections={content?.sections} excludeIds={['intro', 'about', 'stats', 'timeline']} />
          </main>

          {/* Sidebar */}
          <aside className="profile-sidebar anim-slide-up" style={{ animationDelay: '0.4s' }}>
            {/* Quick Links Widget */}
            <div className="widget">
              <h3 className="widget-title"><span>📑</span> Institutional Links</h3>
              <ul className="quick-links">
                {[
                  { label: "Principal's Desk", path: '/about-us/principal-message' },
                  { label: 'Governing Council', path: '/about-us/governing-body' },
                  { label: 'College Notifications', path: '/notifications' },
                  { label: 'Media & Press Coverage', path: '/news?tab=press' },
                  { label: 'Document Vault & Syllabi', path: '/documents' },
                  { label: 'NAAC Accreditation Cell', path: '/naac/portal' },
                  { label: 'Departments & Programs', path: '/academics/departments' },
                  { label: 'NSS & NCC Wings', path: '/activity/nss' },
                  { label: 'Campus Photo Gallery', path: '/gallery' },
                ].map((link, i) => (
                  <li key={i} className="quick-link-item">
                    <Link to={link.path} className="quick-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                      <span className="link-arrow">›</span> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Minority Institution Badge */}
            <div style={{ background: 'linear-gradient(135deg, #0f2347, #1e3a8a)', color: '#fff', borderRadius: 16, padding: '22px', marginBottom: 24, boxShadow: '0 8px 24px rgba(15,35,71,0.15)' }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>☬</div>
              <h4 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 800, color: '#f4a023' }}>
                Sikh Minority Degree College
              </h4>
              <p style={{ margin: 0, fontSize: 12.5, color: '#cbd5e1', lineHeight: 1.6 }}>
                Committed to universal brotherhood, self-discipline, and high moral integrity under the patronage of Gurudwara Prabandhak Committee, Dhanbad.
              </p>
            </div>

            {/* Helpdesk Widget */}
            <div className="helpdesk-widget">
              <div style={{ fontSize: '38px', marginBottom: '12px', position: 'relative', zIndex: 2 }}>📞</div>
              <h4 style={{ margin: '0 0 8px', fontSize: '18px', color: '#f4a023', position: 'relative', zIndex: 2 }}>Administrative Desk</h4>
              <p style={{ fontSize: '13px', margin: '0 0 16px', color: '#e2e8f0', lineHeight: '1.6', position: 'relative', zIndex: 2 }}>
                For admissions, transcripts, or institutional verification queries:
              </p>
              <a href="tel:+917903340991" className="helpdesk-btn" style={{ fontSize: 13, padding: '10px 18px' }}>
                Contact Administrative Office
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CollegeProfile;