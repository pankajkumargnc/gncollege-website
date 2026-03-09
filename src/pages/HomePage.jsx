import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// 🌟 FIX: React Portal import kiya taaki Popup screen par properly freeze ho sake
import { createPortal } from 'react-dom'; 
import { COLORS } from '../styles/colors';
import { SOCIAL_LINKS } from '../data/db';
import HeroSlider from '../components/HeroSlider';
import PremiumTicker from '../components/PremiumTicker';
import HomeFeatures from '../components/HomeFeatures';
import SectionTitle from '../components/home/SectionTitle';
import NotificationSection from '../components/home/NotificationSection';

const getEmbedUrl = (url) => {
  if (!url) return '';
  if (url.includes('drive.google.com/file/d/')) {
    const fileId = url.split('/d/')[1].split('/')[0];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  return url;
};

const HomePage = ({ notices, announcements, pdfReports, sliderSlides, events, gallery }) => {
  const [activeTab, setActiveTab] = useState('All Moments');
  const [selectedPdf, setSelectedPdf] = useState(null);

  const combinedGalleryImages = gallery || [];
  const filteredImages = activeTab === 'All Moments' ? combinedGalleryImages : combinedGalleryImages.filter(img => img.cat === activeTab);

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

  const tickerItems = [
    { text: "B.A./B.Com. Semester 1 Admissions are now open for 2024-25 session.", link: "/admission/info" },
    { text: "Results for the Semester 6 internal examinations have been published.", link: "/results" },
    { text: "The college will remain closed on account of Holi from 24th to 26th March.", link: "#" },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI',sans-serif", background: 'transparent', minHeight: '100vh', overflowX: 'hidden' }}>

      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundImage: `url(${import.meta.env.BASE_URL}images/logo.png)`,
        backgroundRepeat: 'repeat', backgroundSize: '350px', opacity: 0.03,
        zIndex: -1, backgroundColor: '#f4f7f9'
      }} />

      <HeroSlider slides={sliderSlides} />
      <PremiumTicker items={tickerItems} />
      <NotificationSection notices={notices} announcements={announcements} pdfReports={pdfReports} upcomingEvents={upcomingEvents} />

      {/* ABOUT SECTION */}
      <section id="about" style={{ background: '#fff', padding: '100px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1250, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <div data-aos="fade-right" style={{ position: 'relative' }}>
            <style>
              {`
                @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
                .image-stack { position: relative; width: 100%; height: 450px; }
                .main-img { width: 90%; height: 100%; object-fit: cover; border-radius: 20px; box-shadow: 20px 20px 0px ${COLORS.gold}; position: relative; z-index: 2; transition: transform 0.5s ease; }
                .image-stack:hover .main-img { transform: scale(1.02); }
                .accent-box { position: absolute; bottom: -30px; right: 0; background: ${COLORS.navy}; color: #fff; padding: 25px; border-radius: 15px; z-index: 3; box-shadow: 0 10px 30px rgba(0,0,0,0.2); animation: float 3s ease-in-out infinite; }
              `}
            </style>
            <div className="image-stack">
              <img src={`${import.meta.env.BASE_URL}images/college_photo.jpg`} alt="Guru Nanak College Campus" className="main-img" />
              <div className="accent-box">
                <h4 style={{ fontSize: '32px', margin: 0, fontWeight: 900, color: COLORS.gold }}>56+</h4>
                <p style={{ fontSize: '12px', margin: 0, opacity: 0.8, letterSpacing: '1px' }}>YEARS OF EXCELLENCE</p>
              </div>
            </div>
          </div>

          <div data-aos="fade-left">
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
                .discover-btn:hover { background: ${COLORS.gold}; color: ${COLORS.navy}; box-shadow: 0 8px 25px rgba(244,160,35,0.4); }
                .social-icon-btn { width: 40px; height: 40px; border-radius: 50%; background: #f0f2f5; display: flex; align-items: center; justify-content: center; color: ${COLORS.navy}; font-size: 18px; text-decoration: none; transition: all 0.3s ease; }
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

      {/* EVENTS SECTION */}
      <section id="events" style={{ padding: '80px 20px', background: 'transparent' }} data-aos="fade-up">
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <SectionTitle title="Recent Events & Happenings" subtitle="Insights into our seminars, workshops, and vibrant campus activities" />
          <style>{`
            @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .events-scroller { overflow: hidden; padding: 20px 0; margin-top: 30px; mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent); -webkit-mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent); }
            .events-track { display: flex; width: max-content; gap: 30px; animation: scrollLeft 35s linear infinite; transform: translateZ(0); }
            .events-track:hover { animation-play-state: paused; }
            .event-loop-card { width: 320px; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.04); border: 1px solid rgba(255,255,255,0.5); flex-shrink: 0; transition: all 0.4s ease; display: flex; flex-direction: column; }
            .event-loop-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 18px 40px rgba(15, 35, 71, 0.15); border-color: ${COLORS.gold}; }
            .el-img-box { position: relative; height: 200px; overflow: hidden; }
            .el-img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s ease; }
            .event-loop-card:hover .el-img { transform: scale(1.08); }
            .el-badge { position: absolute; top: 15px; right: 15px; background: ${COLORS.gold}; color: #000; padding: 5px 12px; font-size: 10px; font-weight: 800; border-radius: 50px; text-transform: uppercase; z-index: 2; box-shadow: 0 4px 10px rgba(0,0,0,0.2); transition: all 0.3s ease; }
            .event-loop-card:hover .el-badge { transform: scale(1.1); box-shadow: 0 6px 15px rgba(0,0,0,0.3); }
            .el-date { position: absolute; bottom: 0; left: 0; background: ${COLORS.navy}; color: #fff; padding: 8px 15px; border-top-right-radius: 12px; text-align: center; z-index: 2; transition: all 0.3s ease; }
            .event-loop-card:hover .el-date { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
            .el-info { padding: 22px; flex: 1; display: flex; flex-direction: column; }
            .el-title { font-size: 16px; font-weight: 800; color: ${COLORS.navy}; margin: 0 0 10px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
            .el-desc { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 15px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; flex: 1;}
            
            .el-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px; margin-top: auto;}
            
            .read-more-btn { background: none; border: none; font-size: 11px; color: ${COLORS.gold}; font-weight: 800; text-decoration: none; transition: all 0.3s ease; cursor: pointer; padding: 0; display: flex; align-items: center; gap: 5px; }
            .read-more-btn:hover { color: ${COLORS.navy}; letter-spacing: 0.5px; }
            .report-badge { background: #fee2e2; color: #b91c1c; padding: 3px 8px; border-radius: 4px; font-size: 9px; font-weight: 800; }
          `}</style>

          {recentEvents.length > 0 ? (
            <div className="events-scroller">
              <div className="events-track">
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
                      <div className="el-desc" dangerouslySetInnerHTML={{ __html: ev.desc }} />
                      <div className="el-footer">
                        <span style={{ fontSize: '11px', color: '#888', fontWeight: 700 }}>📍 {ev.location || 'Campus'}</span>
                        <button 
                          className="read-more-btn"
                          onClick={(e) => { 
                            e.preventDefault(); 
                            if(ev.reportLink) setSelectedPdf(getEmbedUrl(ev.reportLink)); 
                            else alert("Full details coming soon!"); 
                          }}
                        >
                          {ev.reportLink ? <><span className="report-badge">PDF</span> READ REPORT →</> : 'READ MORE →'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{textAlign: 'center', background: 'rgba(255,255,255,0.7)', padding: '40px', borderRadius: '12px', border: '1px dashed #e2e8f0', marginTop: '30px'}}>
              <div style={{fontSize: '40px', marginBottom: '10px'}}>📅</div>
              <h3 style={{color: COLORS.navy, margin: '0 0 10px'}}>No Recent Events</h3>
              <p style={{color: '#64748b', margin: 0, fontSize: '14px'}}>There are no events to display at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* OTHER SECTIONS (Counters, Links, Gallery) */}
      <section style={{ background: `linear-gradient(135deg, ${COLORS.navyDark} 0%, ${COLORS.navy} 100%)`, padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, pointerEvents: 'none', backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div data-aos="zoom-in" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <style>{`
            .counter-box { padding: 20px; transition: all 0.4s ease; }
            .counter-box:hover { transform: translateY(-10px); background: rgba(255, 255, 255, 0.05); borderRadius: 15px; boxShadow: 0 0 25px rgba(244,160,35,0.1); }
            .counter-icon { font-size: 50px; margin-bottom: 15px; display: inline-block; filter: drop-shadow(0 0 10px rgba(244,160,35,0.3)); transition: all 0.4s ease; }
            .counter-box:hover .counter-icon { transform: scale(1.2) rotate(10deg); filter: drop-shadow(0 0 20px rgba(244,160,35,0.6)); }
            .counter-number { font-size: 45px; font-weight: 900; color: ${COLORS.gold}; line-height: 1; margin-bottom: 10px; font-family: 'Arial Black', sans-serif; }
            .counter-label { font-size: 14px; color: #e2e8f0; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
          `}</style>
          {[ { label: 'STUDENTS ENROLLED', value: '4,000+', icon: '👨‍🎓' }, { label: 'SUCCESSFUL ALUMNI', value: '45,000+', icon: '🎓' }, { label: 'EXPERT FACULTY', value: '50+', icon: '👨‍🏫' }, { label: 'YEARS OF LEGACY', value: '56', icon: '🏛️' } ].map((item, i) => (
            <div key={i} className="counter-box"><div className="counter-icon">{item.icon}</div><div className="counter-number">{item.value}</div><div className="counter-label">{item.label}</div></div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 20px', background: 'transparent' }} data-aos="fade-up">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionTitle title="Important External Links" subtitle="Quick access to official education and government portals" />
          <style>{`
            .links-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; margin-top: 40px; }
            .link-tile { background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.6); border-radius: 12px; padding: 25px 15px; text-align: center; text-decoration: none; transition: all 0.3s; display: flex; flex-direction: column; align-items: center; gap: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); transform: translateZ(0); }
            .link-tile:hover { transform: translateY(-8px) scale(1.03); border-color: ${COLORS.gold}; box-shadow: 0 12px 25px rgba(15, 35, 71, 0.1); background: #fff; }
            .link-icon-circle { width: 60px; height: 60px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; transition: 0.3s; }
            .link-tile:hover .link-icon-circle { background: ${COLORS.navy}; color: #fff; transform: rotate(15deg); }
            .link-name { font-size: 13px; font-weight: 800; color: ${COLORS.navy}; letter-spacing: 0.5px; }
          `}</style>
          <div className="links-grid">
            {[ { name: 'NAAC', url: 'https://naac.gov.in', icon: '🏅' }, { name: 'UGC', url: 'https://ugc.ac.in', icon: '📜' }, { name: 'INFLIBNET', url: 'https://inflibnet.ac.in', icon: '📚' }, { name: 'NDL INDIA', url: 'https://ndl.gov.in', icon: '🔬' }, { name: 'SWAYAM', url: 'https://swayam.gov.in', icon: '🌐' }, { name: 'BBMK UNIVERSITY', url: 'https://bbmku.ac.in', icon: '🏛️' } ].map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="link-tile" data-aos="fade-up" data-aos-delay={i * 50}><div className="link-icon-circle">{link.icon}</div><div className="link-name">{link.name}</div></a>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" style={{ padding: '100px 20px', background: '#fff' }} data-aos="fade-up">
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <SectionTitle title="📸 Photo Gallery" subtitle="Memorable glimpses of academic excellence and cultural heritage" />
          <style>{`
            .gallery-filters { display: flex; justify-content: center; gap: 12px; margin-bottom: 50px; flex-wrap: wrap; }
            .filter-btn { padding: 10px 24px; border-radius: 50px; border: 2px solid #edf2f7; background: #fff; color: #0f2347; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.3s ease; }
            .filter-btn:hover { background: #0f2347; color: #fff; border-color: #0f2347; transform: translateY(-2px); }
            .filter-btn.active { background: #0f2347; color: #fff; border-color: #0f2347; box-shadow: 0 5px 15px rgba(15,35,71,0.2); transform: translateY(-2px); }
            .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; }
            .gallery-item { position: relative; border-radius: 15px; overflow: hidden; aspect-ratio: 4/3; box-shadow: 0 5px 15px rgba(0,0,0,0.05); cursor: pointer; }
            .gallery-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
            .gallery-item:hover .gallery-img { transform: scale(1.1); }
            .gallery-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,35,71,0.9), transparent); opacity: 0; transition: 0.4s; display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; }
            .gallery-item:hover .gallery-overlay { opacity: 1; }
            .gallery-overlay span, .gallery-overlay h4 { transform: translateY(10px); opacity: 0; transition: all 0.4s ease; }
            .gallery-item:hover .gallery-overlay span { transform: translateY(0); opacity: 1; transition-delay: 0.1s; }
            .gallery-item:hover .gallery-overlay h4 { transform: translateY(0); opacity: 1; transition-delay: 0.2s; }
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
              <div key={i} className="gallery-item" data-aos="zoom-in" data-aos-delay={i * 50}>
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

      {/* 🌟 FIX: React Portal Modal - Ye kabhi parent se affect nahi hoga aur screen par chipka rahega */}
      {selectedPdf && createPortal(
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999999, 
          background: 'rgba(15,35,71,0.95)', backdropFilter: 'blur(8px)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff', width: '90%', maxWidth: '1000px', height: '85vh', 
            borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              padding: '16px 24px', background: COLORS.navy, color: '#fff', 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <span style={{fontSize: '20px'}}>📄</span>
                <span style={{fontWeight: 800, letterSpacing: '0.5px'}}>Official Event Report</span>
              </div>
              <button 
                onClick={() => setSelectedPdf(null)} 
                style={{
                  background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', 
                  width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', 
                  fontSize: '14px', transition: '0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                onMouseOver={e => e.currentTarget.style.background = COLORS.red}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              >✕</button>
            </div>
            <div style={{flex: 1, background: '#f1f5f9'}}>
              <iframe 
                src={selectedPdf} 
                title="Event PDF Report"
                width="100%" 
                height="100%" 
                style={{ border: 'none' }}
                allow="autoplay"
              />
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  )
}

export default HomePage;