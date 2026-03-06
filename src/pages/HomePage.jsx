import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../styles/colors';
import { SOCIAL_LINKS } from '../data/db';
import HeroSlider from '../components/HeroSlider';
import QuickRibbon from '../components/QuickRibbon';
import HomeFeatures from '../components/HomeFeatures';
import SectionTitle from '../components/home/SectionTitle';
import NotificationSection from '../components/home/NotificationSection';

const HomePage = ({ notices, announcements, pdfReports, sliderSlides, events, gallery }) => {
  
  // 🌟 GALLERY LOGIC
  const [activeTab, setActiveTab] = useState('All Moments');
  const combinedGalleryImages = gallery || [];
  const filteredImages = activeTab === 'All Moments' ? combinedGalleryImages : combinedGalleryImages.filter(img => img.cat === activeTab);

  // 🌟 EVENTS LOGIC: Sirf recent aur upcoming filter kar rahe hain
  const upcomingEvents = (events || []).filter(e => e.status === 'upcoming');
  const recentEvents = (events || []).filter(e => e.status === 'recent');

  const getEventImage = (type) => {
    switch (type) {
      case 'SEMINAR': return '/images/slider_seminar.jpg';
      case 'WORKSHOP': return '/images/slider_ncc.jpg';
      case 'SPORTS': return '/images/slider_cricket.jpg';
      case 'CULTURAL': return '/images/slider_baisakhi.jpg';
      default: return '/images/college_photo.jpg';
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI',sans-serif", background: '#f8f9fa', minHeight: '100vh' }}>

      <HeroSlider slides={sliderSlides} />
      <QuickRibbon />
      <NotificationSection notices={notices} announcements={announcements} pdfReports={pdfReports} upcomingEvents={upcomingEvents} />

      {/* WELCOME SECTION */}
      <section id="about" style={{ background: '#fff', padding: '100px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1250, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <div style={{ position: 'relative', animation: 'fadeInLeft 1s ease' }}>
            <style>
              {`
                @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
                .image-stack { position: relative; width: 100%; height: 450px; }
                .main-img { width: 90%; height: 100%; object-fit: cover; border-radius: 20px; box-shadow: 20px 20px 0px ${COLORS.gold}; position: relative; z-index: 2; transition: transform 0.5s ease; }
                .image-stack:hover .main-img { transform: scale(1.02); }
                .accent-box { position: absolute; bottom: -30px; right: 0; background: ${COLORS.navy}; color: #fff; padding: 25px; border-radius: 15px; z-index: 3; box-shadow: 0 10px 30px rgba(0,0,0,0.2); animation: float 3s ease-in-out infinite; }
              `}
            </style>
            <div className="image-stack">
              <img src="images/college_photo.jpg" alt="Guru Nanak College Campus" className="main-img" />
              <div className="accent-box">
                <h4 style={{ fontSize: '32px', margin: 0, fontWeight: 900, color: COLORS.gold }}>56+</h4>
                <p style={{ fontSize: '12px', margin: 0, opacity: 0.8, letterSpacing: '1px' }}>YEARS OF EXCELLENCE</p>
              </div>
            </div>
          </div>

          <div style={{ animation: 'fadeInRight 1s ease' }}>
            <style>{` @keyframes fadeInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } } `}</style>
            <h2 style={{ fontSize: '38px', fontWeight: 900, color: COLORS.navy, lineHeight: 1.2, marginBottom: '10px' }}>
              About the <span style={{ color: COLORS.gold }}>College</span>
            </h2>
            <h4 style={{ color: COLORS.gold, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '25px', fontSize: '14px' }}>Established 1970</h4>
            <p style={{ color: '#555', lineHeight: 1.8, fontSize: '16px', marginBottom: '30px' }}>
              Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru. We draw inspiration from the teachings of Guru Nanak Devji, fostering an environment of academic progress and individual development.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '35px' }}>
              {[
                { icon: '🛡️', title: 'NAAC Accredited', desc: 'Grade B Institution' },
                { icon: '👨‍🏫', title: 'Expert Faculty', desc: 'Highly Experienced' },
                { icon: '🔬', title: 'Modern Labs', desc: 'Tech-enabled Learning' },
                { icon: '🏅', title: 'NSS & NCC', desc: 'Character Building' }
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                  <span style={{ fontSize: '20px' }}>{f.icon}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '14px', color: COLORS.navy }}>{f.title}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '25px', flexWrap: 'wrap' }}>
              <style>{`
                .discover-btn {
                  background: ${COLORS.navy}; color: #fff; padding: 15px 35px; border: none; border-radius: 50px; 
                  font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(15,35,71,0.3);
                  text-decoration: none; display: inline-block;
                }
                .discover-btn:hover {
                  transform: translateY(-3px) scale(1.05);
                  background: ${COLORS.gold}; color: ${COLORS.navy};
                  box-shadow: 0 8px 25px rgba(244,160,35,0.4);
                }
                .social-icon-btn {
                  width: 40px; height: 40px; border-radius: 50%; background: #f0f2f5; display: flex; align-items: center; 
                  justify-content: center; color: ${COLORS.navy}; font-size: 18px; text-decoration: none; transition: all 0.3s ease;
                }
                .social-icon-btn:hover { background: ${COLORS.navy}; color: ${COLORS.gold}; transform: rotate(360deg); }
              `}</style>
              <Link to="/about-us/college-profile" className="discover-btn">DISCOVER MORE →</Link>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#666' }}>FOLLOW US:</span>
                {SOCIAL_LINKS.map(s => (
                  <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                    {s.id === 'twitter' ? '𝕏' : s.id === 'youtube' ? '▶' : s.label.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeFeatures />

      {/* --- PROFESSIONAL INFINITE SCROLL EVENTS SECTION --- */}
      <section id="events" style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <SectionTitle title="Recent Events & Happenings" subtitle="Insights into our seminars, workshops, and vibrant campus activities" />

          <style>{`
            /* Smooth Infinite Scrolling Animation */
            @keyframes scrollLeft { 
              0% { transform: translateX(0); } 
              100% { transform: translateX(-50%); } 
            }
            .events-scroller { 
              overflow: hidden; 
              padding: 20px 0;
              margin-top: 30px;
              /* Fades edges nicely so cards don't just cut off sharply */
              -webkit-mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent); 
              mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent); 
            }
            .events-track { 
              display: flex; 
              width: max-content; 
              gap: 30px; /* Space between cards */
              /* Time controls speed: 30s is smooth. */
              animation: scrollLeft 35s linear infinite; 
            }
            .events-track:hover { 
              animation-play-state: paused; /* Pause on hover */
            }
            
            /* Card Design for Single Row */
            .event-loop-card { 
              width: 320px; 
              background: #fff; 
              border-radius: 16px; 
              overflow: hidden; 
              box-shadow: 0 10px 25px rgba(0,0,0,0.04); 
              border: 1px solid #edf2f7; 
              flex-shrink: 0; 
              transition: all 0.4s ease;
              display: flex;
              flex-direction: column;
            }
            .event-loop-card:hover { 
              transform: translateY(-8px); 
              box-shadow: 0 15px 35px rgba(15, 35, 71, 0.12); 
              border-color: ${COLORS.gold};
            }
            
            .el-img-box { position: relative; height: 200px; overflow: hidden; }
            .el-img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s ease; }
            .event-loop-card:hover .el-img { transform: scale(1.08); }
            
            .el-badge { position: absolute; top: 15px; right: 15px; background: ${COLORS.gold}; color: #000; padding: 5px 12px; font-size: 10px; font-weight: 800; border-radius: 50px; text-transform: uppercase; z-index: 2; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
            .el-date { position: absolute; bottom: 0; left: 0; background: ${COLORS.navy}; color: #fff; padding: 8px 15px; border-top-right-radius: 12px; text-align: center; z-index: 2; }
            .el-info { padding: 22px; flex: 1; display: flex; flex-direction: column; }
            .el-title { font-size: 16px; font-weight: 800; color: ${COLORS.navy}; margin: 0 0 10px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
            .el-desc { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 15px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; flex: 1;}
            .el-footer { display: flex; justifyContent: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px; margin-top: auto;}
          `}</style>

          {recentEvents.length > 0 ? (
            <div className="events-scroller">
              <div className="events-track">
                {/* 🌟 MAGIC: Array ko 2 baar print kiya hai taki scroll seamless (infinite) lage */}
                {[...recentEvents, ...recentEvents, ...recentEvents].map((ev, i) => (
                  <div key={i} className="event-loop-card">
                    <div className="el-img-box">
                      <div className="el-badge">{ev.type}</div>
                      <div className="el-date">
                        <div style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1 }}>{ev.day || '--'}</div>
                        <div style={{ fontSize: '10px', fontWeight: 700 }}>{ev.month || '---'}</div>
                      </div>
                      <img src={ev.imageUrl || getEventImage(ev.type)} alt={ev.title} className="el-img" />
                    </div>
                    
                    <div className="el-info">
                      <h3 className="el-title">{ev.title}</h3>
                      {/* Description Rich Text ko safely render karne ke liye */}
                      <div className="el-desc" dangerouslySetInnerHTML={{ __html: ev.desc }} />
                      
                      <div className="el-footer">
                        <span style={{ fontSize: '11px', color: '#888', fontWeight: 700 }}>📍 {ev.location || 'Campus'}</span>
                        {/* Fake link for UI aesthetics */}
                        <span style={{ fontSize: '11px', color: COLORS.gold, fontWeight: 800 }}>READ MORE →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{textAlign: 'center', background: '#fff', padding: '40px', borderRadius: '12px', border: '1px dashed #e2e8f0', marginTop: '30px'}}>
              <div style={{fontSize: '40px', marginBottom: '10px'}}>📅</div>
              <h3 style={{color: COLORS.navy, margin: '0 0 10px'}}>No Recent Events</h3>
              <p style={{color: '#64748b', margin: 0, fontSize: '14px'}}>There are no events to display at the moment. Please check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* COUNTER SECTION */}
      <section style={{ background: `linear-gradient(135deg, ${COLORS.navyDark} 0%, ${COLORS.navy} 100%)`, padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, pointerEvents: 'none', backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <style>{`
            .counter-box { padding: 20px; transition: transform 0.3s ease; }
            .counter-box:hover { transform: translateY(-10px); }
            .counter-icon { font-size: 50px; margin-bottom: 15px; display: inline-block; filter: drop-shadow(0 0 10px rgba(244,160,35,0.3)); }
            .counter-number { font-size: 45px; font-weight: 900; color: ${COLORS.gold}; line-height: 1; margin-bottom: 10px; font-family: 'Arial Black', sans-serif; }
            .counter-label { font-size: 14px; color: #e2e8f0; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
          `}</style>
          {[ { label: 'STUDENTS ENROLLED', value: '4,000+', icon: '👨‍🎓' }, { label: 'SUCCESSFUL ALUMNI', value: '45,000+', icon: '🎓' }, { label: 'EXPERT FACULTY', value: '50+', icon: '👨‍🏫' }, { label: 'YEARS OF LEGACY', value: '56', icon: '🏛️' } ].map((item, i) => (
            <div key={i} className="counter-box">
              <div className="counter-icon">{item.icon}</div><div className="counter-number">{item.value}</div><div className="counter-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* IMPORTANT LINKS SECTION */}
      <section style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionTitle title="Important External Links" subtitle="Quick access to official education and government portals" />
          <style>{`
            .links-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; margin-top: 40px; }
            .link-tile { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px 15px; text-align: center; text-decoration: none; transition: all 0.3s; display: flex; flex-direction: column; align-items: center; gap: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
            .link-tile:hover { transform: translateY(-8px); border-color: ${COLORS.gold}; box-shadow: 0 12px 20px rgba(15, 35, 71, 0.08); }
            .link-icon-circle { width: 60px; height: 60px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; transition: 0.3s; }
            .link-tile:hover .link-icon-circle { background: ${COLORS.navy}; color: #fff; }
            .link-name { font-size: 13px; font-weight: 800; color: ${COLORS.navy}; letter-spacing: 0.5px; }
          `}</style>
          <div className="links-grid">
            {[ { name: 'NAAC', url: 'https://naac.gov.in', icon: '🏅' }, { name: 'UGC', url: 'https://ugc.ac.in', icon: '📜' }, { name: 'INFLIBNET', url: 'https://inflibnet.ac.in', icon: '📚' }, { name: 'NDL INDIA', url: 'https://ndl.gov.in', icon: '🔬' }, { name: 'SWAYAM', url: 'https://swayam.gov.in', icon: '🌐' }, { name: 'BBMK UNIVERSITY', url: 'https://bbmku.ac.in', icon: '🏛️' } ].map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="link-tile"><div className="link-icon-circle">{link.icon}</div><div className="link-name">{link.name}</div></a>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section id="gallery" style={{ padding: '100px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <SectionTitle title="📸 Photo Gallery" subtitle="Memorable glimpses of academic excellence and cultural heritage" />
          <style>{`
            .gallery-filters { display: flex; justify-content: center; gap: 12px; margin-bottom: 50px; flex-wrap: wrap; }
            .filter-btn { padding: 10px 24px; border-radius: 50px; border: 2px solid #edf2f7; background: #fff; color: #0f2347; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.3s ease; }
            .filter-btn:hover, .filter-btn.active { background: #0f2347; color: #fff; border-color: #0f2347; box-shadow: 0 5px 15px rgba(15,35,71,0.2); }
            .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; animation: fadeIn 0.5s ease-in; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            .gallery-item { position: relative; border-radius: 15px; overflow: hidden; aspect-ratio: 4/3; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
            .gallery-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
            .gallery-item:hover .gallery-img { transform: scale(1.1); }
            .gallery-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,35,71,0.9), transparent); opacity: 0; transition: 0.4s; display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; }
            .gallery-item:hover .gallery-overlay { opacity: 1; }
          `}</style>
          
          <div className="gallery-filters">
            {['All Moments', 'Seminars', 'Cultural Fest', 'Guest Visit', 'Campus', 'Departments', 'NSS Programs'].map((tab) => (
              <button key={tab} className={`filter-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab}
              </button>
            ))}
          </div>

          <div className="gallery-grid" key={activeTab}> 
            {filteredImages.length > 0 ? filteredImages.map((img, i) => (
              <div key={i} className="gallery-item">
                <img src={img.src} alt={img.title} className="gallery-img" />
                <div className="gallery-overlay">
                  <span style={{ color: '#f4a023', fontSize: '10px', fontWeight: '800' }}>{img.cat}</span>
                  <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '700', marginTop: '5px' }}>{img.title}</h4>
                </div>
              </div>
            )) : (
               <div style={{gridColumn: '1 / -1', textAlign: 'center', background: '#f8fafc', padding: '50px 20px', borderRadius: '16px', border: '1px dashed #cbd5e1'}}>
                  <div style={{fontSize: '32px', marginBottom: '10px'}}>📸</div>
                  <h3 style={{color: COLORS.navy, margin: '0 0 5px'}}>Gallery is Empty</h3>
                  <p style={{color: '#64748b', margin: 0, fontSize: '14px'}}>Upload photos from the Admin Panel to see them here.</p>
               </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage;