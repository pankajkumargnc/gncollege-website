import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../styles/index.css';

const CollegeProfile = () => {
  // Page load hone par top par scroll karein
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="profile-page-wrapper">
      <style>{`
        @media (min-width: 1024px) {
          .stats-grid-override {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        .stat-card-small {
          padding: 1.5rem !important;
        }
        .stat-value-small {
          font-size: 1.8rem !important;
        }
        .social-icon-btn {
          width: 45px; height: 45px; border-radius: 50%; background: #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.08); display: flex; align-items: center; justify-content: center; color: var(--primary-navy); font-size: 20px; text-decoration: none; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); border: 1px solid #f0f2f5;
        }
        .social-icon-btn:hover { 
          background: var(--accent-gold); color: var(--primary-navy); transform: translateY(-5px) scale(1.1); box-shadow: 0 10px 25px rgba(244,160,35,0.4); border-color: var(--accent-gold);
        }
        .rich-text-content {
          text-align: justify;
        }
      `}</style>
      
      {/* 1. HERO SECTION (Parallax Effect) */}
      <header className="profile-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content anim-fade-in">
          <h1 className="hero-title">College Profile</h1>
          <p className="hero-subtitle">Excellence in Education Since 1970</p>
        </div>
      </header>

      {/* 2. MAIN CONTENT CONTAINER (Overlapping Hero) */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto 0', padding: '0 20px', position: 'relative', zIndex: 20 }}>
        <div className="profile-layout">
        <main className="profile-main">
        <section className="profile-section anim-slide-up" style={{animationDelay: '0.2s', background: '#fff', borderRadius: '24px'}}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="section-heading">College Profile</h2>
            <div className="heading-underline"></div>
            <img 
              src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop" 
              alt="College Campus" 
              loading="lazy"
              decoding="async"
              width="350"
              height="233"
              className="profile-img hover-scale"
              style={{ float: 'right', width: '350px', maxWidth: '100%', marginLeft: '2rem', marginBottom: '1rem', borderRadius: '12px' }}
            />
            <p className="rich-text-content">
              Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was Established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru after whom this college is named.
            </p>
            <p className="rich-text-content mt-4">
              The college is managed by a Governing Council nominated by the Gurudwara Prabandhak Committee, Dhanbad, and draws its inspiration from the teachings of the faith propounded by Guru Nanak Devji.
            </p>
            <div style={{ clear: 'both' }}></div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 className="section-heading">About the College</h2>
          <div className="heading-underline"></div>
          <p className="rich-text-content">
            Initially the college got affiliated to the Ranchi University – Ranchi since 1970 the year it was started. But with the passage of time, Binod Bihari Mahto Koylanchal University, Dhanbad came into existence in 2017; and the affiliation of the college got transferred to this new University in 2017.
          </p>
          <p className="rich-text-content mt-4">
            At present, the college has got permanent affiliation with Binod Bihari Mahto Koylanchal University, Dhanbad in the faculties of Humanities, Social Sciences, commerce and such vocational courses as Bachelor of Computer Applications. The college has got “Deficit Grant College Status” by the government of Jharkhand. Also the college is registered u/s 2F and 12B of the UGC Act.
          </p>
          <p className="rich-text-content mt-4">
            The main aim and objective behind sponsoring this college was to impart value-based teaching to the young men and women of Dhanbad. The college attaches great importance to moral teaching. The college does not merely offer teaching in such subjects as would enable young students to earn their bread and butter, but it also emphasizes grooming them into worthy (morally sound) citizens.
          </p>
          </div>

          <div>
            <h2 className="section-heading">Our Campuses</h2>
          <div className="heading-underline"></div>
          <p className="rich-text-content" style={{ marginBottom: '3rem' }}>Guru Nanak College, Dhanbad functions at two main campuses:</p>
          
          <div className="grid-2-col gap-6">
             <div className="campus-box">
                <h3 style={{fontSize: 'var(--h3)', color: 'var(--navy)', fontWeight: '700', marginBottom: '10px'}}>1. Bank More Campus (Girls Wing)</h3>
                <p className="rich-text-content">
                  The women’s wing of the College was started in the year 2000 in the Bank More Campus of the College in the morning hours. As an exclusive centre of teaching for girls, this wing has earned high reputation among stakeholders during the last few years. In the Women’s wing also, teaching is imparted for B.A./B.Com. (Hons/General) Course.
                </p>
             </div>

             <div className="campus-box">
                <h3 style={{fontSize: 'var(--h3)', color: 'var(--navy)', fontWeight: '700', marginBottom: '10px'}}>2. Bhuda Campus (Boys Wing)</h3>
                <p className="rich-text-content">
                  The main building – the Boys’ wing of the College is situated at Bhuda. The main building is spaciously designed in an airy surrounding quite suitable for the environment of an academic institution. The present campus has been so planned as to cater to the needs of the students for a long time.
                </p>
             </div>
          </div>
          </div>

          {/* ── HISTORIC MILESTONES TIMELINE ── */}
          <div style={{ marginTop: '3.5rem' }}>
            <h2 className="section-heading">Historic Milestones</h2>
            <div className="heading-underline"></div>
            <p className="rich-text-content" style={{ marginBottom: '2rem' }}>
              Trace our transformative journey from 1970 to the present day:
            </p>

            <VerticalTimeline lineColor="#e2e8f0" layout="1-column-left">
              <VerticalTimelineElement
                date="1970"
                contentStyle={{ background: '#0f2347', color: '#fff', borderRadius: '14px', boxShadow: '0 8px 25px rgba(15,35,71,0.15)' }}
                contentArrowStyle={{ borderRight: '7px solid #0f2347' }}
                iconStyle={{ background: '#f4a023', color: '#0f2347', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}
                icon={<span>🏛️</span>}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#f4a023', margin: '0 0 6px' }}>Foundation & Affiliation</h3>
                <p style={{ margin: 0, fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.6 }}>
                  Established by Gurudwara Prabandhak Committee, Dhanbad to mark the 500th Birth Centenary of Sri Guru Nanak Dev Ji. First affiliated with Ranchi University.
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                date="1985"
                contentStyle={{ background: '#ffffff', color: '#0f2347', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 8px 25px rgba(0,0,0,0.05)' }}
                contentArrowStyle={{ borderRight: '7px solid #ffffff' }}
                iconStyle={{ background: '#0f2347', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}
                icon={<span>📜</span>}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f2347', margin: '0 0 6px' }}>UGC 2(f) & 12(B) Recognition</h3>
                <p style={{ margin: 0, fontSize: '13.5px', color: '#475569', lineHeight: 1.6 }}>
                  Conferred "Deficit Grant College Status" by the Government of Jharkhand and permanently recognized under sections 2(f) and 12(B) of the UGC Act.
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                date="2000"
                contentStyle={{ background: '#ffffff', color: '#0f2347', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 8px 25px rgba(0,0,0,0.05)' }}
                contentArrowStyle={{ borderRight: '7px solid #ffffff' }}
                iconStyle={{ background: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}
                icon={<span>👩‍🎓</span>}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f2347', margin: '0 0 6px' }}>Bank More Women's Wing Launched</h3>
                <p style={{ margin: 0, fontSize: '13.5px', color: '#475569', lineHeight: 1.6 }}>
                  Dedicated women's wing inaugurated at Bank More Campus, providing specialized morning degree education for girl students of the coal belt.
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                date="2017"
                contentStyle={{ background: '#ffffff', color: '#0f2347', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 8px 25px rgba(0,0,0,0.05)' }}
                contentArrowStyle={{ borderRight: '7px solid #ffffff' }}
                iconStyle={{ background: '#3b82f6', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}
                icon={<span>🎓</span>}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f2347', margin: '0 0 6px' }}>Affiliation to BBMKU Dhanbad</h3>
                <p style={{ margin: 0, fontSize: '13.5px', color: '#475569', lineHeight: 1.6 }}>
                  Affiliation permanently shifted to newly established Binod Bihari Mahto Koyalanchal University (BBMKU) as a premier constituent degree institution.
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                date="Present"
                contentStyle={{ background: 'linear-gradient(135deg, #0f2347, #1e3a8a)', color: '#fff', borderRadius: '14px', boxShadow: '0 8px 25px rgba(15,35,71,0.2)' }}
                contentArrowStyle={{ borderRight: '7px solid #0f2347' }}
                iconStyle={{ background: '#f4a023', color: '#0f2347', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}
                icon={<span>🚀</span>}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#f4a023', margin: '0 0 6px' }}>NEP 2020 & Digital Campus</h3>
                <p style={{ margin: 0, fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.6 }}>
                  Full implementation of NEP-2020 4-year FYUGP degree courses, smart classrooms, AI student portal, and comprehensive vocational skilling.
                </p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>
        </section>

        {/* Key Statistics (Plain Grid) */}
        <section className="stats-grid stats-grid-override mb-16 anim-slide-up" style={{animationDelay: '0.4s'}}>
          {[
            { label: "Years of Legacy", value: "56+", icon: "🏛️" },
            { label: "Expert Faculty", value: "120+", icon: "👨‍🏫" },
            { label: "Students", value: "5000+", icon: "🎓" },
            { label: "Courses", value: "30+", icon: "📚" }
          ].map((stat, idx) => (
            <div key={idx} className="stat-card stat-card-small" style={{background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0'}}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value stat-value-small">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </section>

      </main>

      {/* 3. SIDEBAR SECTION (Quick Links & Helpdesk) */}
      <aside className="profile-sidebar anim-slide-up" style={{animationDelay: '0.5s'}}>
            
            {/* Quick Links Widget */}
            <div className="widget">
              <h3 className="widget-title"><span>📑</span> Quick Links</h3>
              <ul className="quick-links">
                {[
                  { label: 'Principal Message', path: '/about-us/principal-message' },
                  { label: 'Governing Body', path: '/about-us/governing-body' },
                  { label: 'Latest Notifications', path: '/admission/notification/latest' },
                  { label: 'Admission Rules', path: '/admission/rule' },
                  { label: 'Fee Structure', path: '/admission/fee-structure' },
                  { label: 'Academic Departments', path: '/academics/departments' },
                  { label: 'Career & Placements', path: '/academics/placements' },
                  { label: 'NSS & NCC Units', path: '/activity/nss' },
                  { label: 'Sports & Games', path: '/activity/games-sports' },
                  { label: 'Course Syllabus', path: '/syllabus' },
                  { label: 'Academic Calendar', path: '/academics/academic-calendar' },
                  { label: 'Photo Gallery', path: '/gallery' },
                ].map((link, i) => (
                  <li key={i} className="quick-link-item">
                    <Link to={link.path} className="quick-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                      <span className="link-arrow">›</span> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Helpdesk Widget */}
            <div className="helpdesk-widget">
              <div style={{ fontSize: '45px', marginBottom: '15px', position: 'relative', zIndex: 2 }}>📞</div>
              <h4 style={{ margin: '0 0 12px', fontSize: '19px', color: '#f4a023', position: 'relative', zIndex: 2 }}>Need Assistance?</h4>
              <p style={{ fontSize: '14px', margin: '0 0 20px', color: '#e2e8f0', lineHeight: '1.6', position: 'relative', zIndex: 2 }}>
                Contact our administration office for any queries related to admission or academics.
              </p>
              <a href="tel:+917903340991" className="helpdesk-btn">Call Helpdesk Now</a>
            </div>
            
            {/* Social Media Widget */}
            <div style={{ marginTop: '30px' }}>
              <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--primary-navy)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>🌐</span> Connect With Us
              </h4>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn">f</a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn">𝕏</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn">📸</a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon-btn">▶</a>
              </div>
            </div>

          </aside>
        </div>
      </div>

    </div>
  );
};

export default CollegeProfile;