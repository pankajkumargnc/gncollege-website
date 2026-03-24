import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../styles/colors';
import {
  SOCIAL_LINKS
} from '../data/db';
import HeroSlider from '../components/HeroSlider';
import QuickRibbon from '../components/QuickRibbon';
import HomeFeatures from '../components/HomeFeatures';
import SectionTitle from '../components/home/SectionTitle';
import NotificationSection from '../components/home/NotificationSection';

const HomePage = ({ notices, announcements, pdfReports, sliderSlides, events, gallery }) => {
  // 1. Sabse pehle Gallery ki images ka ek permanent array banaiye (App function ke bahar ya andar)
  const allGalleryImages = [
    { src: '/images/pf10.jpeg', cat: 'Seminars', title: 'National Seminar on G20 Performance' },
    { src: '/images/pf9.jpeg', cat: 'Seminars', title: 'Traditional Welcome at ICSSR Seminar' },
    { src: '/images/pf6.jpeg', cat: 'Seminars', title: 'Academic Multidisciplinary Event' },
    { src: '/images/pf5.jpeg', cat: 'Cultural Fest', title: 'Baisakhi Di Shaam Group Dance' },
    { src: '/images/pf4.jpeg', cat: 'Cultural Fest', title: 'Gidda Performance by Students' },
    { src: '/images/pf1.jpeg', cat: 'Cultural Fest', title: 'Cultural Heritage Celebration' },
    { src: '/images/pf7.jpeg', cat: 'Guest Visit', title: 'Inauguration by Honorable Guests' },
    { src: '/images/pf8.jpeg', cat: 'Guest Visit', title: 'Classical Dance by Guest Artist' },
    { src: '/images/pf2.jpeg', cat: 'Guest Visit', title: 'Stage Lighting & Performance' },
    { src: '/images/pf3.jpeg', cat: 'Guest Visit', title: 'Guest Faculty & Student Interaction' }
  ];

  // 2. App function ke andar state banaiye
  const [activeTab, setActiveTab] = useState('All Moments');

  // 3. Filtered data nikalne ka logic
  const combinedGalleryImages = [...allGalleryImages, ...(gallery || [])];
  const filteredImages = activeTab === 'All Moments' ? combinedGalleryImages : combinedGalleryImages.filter(img => img.cat === activeTab);

  const upcomingEvents = (events || []).filter(e => e.status === 'upcoming');
  const recentEvents = (events || []).filter(e => e.status === 'recent');

  // Static "featured" events that the user wants to keep
  const featuredRecentEvents = [
    {
      type: 'SEMINAR',
      title: 'ICSSR Multidisciplinary National Seminar on G20',
      desc: 'A comprehensive discussion on G20 as a global platform for economic development and cooperation.',
      day: '21',
      month: 'JUL',
      location: 'Seminar Hall',
    },
    {
      type: 'WORKSHOP',
      title: 'NCC "At Home Function" & Skill Training',
      desc: 'Special training session for NCC Cadets focused on leadership and national service.',
      day: '23',
      month: 'FEB',
      location: 'College Campus',
    },
    {
      type: 'SPORTS',
      title: 'BBMKU Inter-College Cricket Tournament',
      desc: "Celebrating our cricket team's spectacular victory at the university level tournament.",
      day: '18',
      month: 'DEC',
      location: 'Railway Stadium',
    },
    {
      type: 'CULTURAL',
      title: 'Baisakhi Di Shaam: Cultural Festival',
      desc: 'An evening dedicated to Punjabi culture, traditional folk dance, and music.',
      day: '14',
      month: 'APR',
      location: 'Outdoor Stage',
    },
  ];
  const featuredTitles = new Set(featuredRecentEvents.map(e => e.title));
  const sliderRecentEvents = (events || []).filter(e => e.status === 'recent' && !featuredTitles.has(e.title));
  const allRecentEventsForSlider = [...featuredRecentEvents, ...sliderRecentEvents];
  const getEventImage = (type) => {
    switch (type) {
      case 'SEMINAR':
        return '/images/slider_seminar.jpg';
      case 'WORKSHOP':
        return '/images/slider_ncc.jpg';
      case 'SPORTS':
        return '/images/slider_cricket.jpg';
      case 'CULTURAL':
        return '/images/slider_baisakhi.webp';
      default:
        return '/images/college_photo.webp';
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI',sans-serif", background: '#f8f9fa', minHeight: '100vh' }}>

      <HeroSlider slides={sliderSlides} />
      <QuickRibbon />

      {/* --- PROFESSIONAL & ANIMATED NOTIFICATION SECTION --- */}
      <NotificationSection notices={notices} announcements={announcements} pdfReports={pdfReports} upcomingEvents={upcomingEvents} />

      {/* 3. WELCOME SECTION (Redesigned) */}
      <section id="about" style={{ background: '#fff', padding: '100px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1250, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center' }}>

          {/* LEFT SIDE: Image Design with Decorative Elements */}
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
              {/* College ki koi bhi real image yahan use kar sakte hain */}
              <img src="images/college_photo.webp" alt="Guru Nanak College Campus" className="main-img" />
              <div className="accent-box">
                <h4 style={{ fontSize: '32px', margin: 0, fontWeight: 900, color: COLORS.gold }}>56+</h4>
                <p style={{ fontSize: '12px', margin: 0, opacity: 0.8, letterSpacing: '1px' }}>YEARS OF EXCELLENCE</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Content & Features */}
          <div style={{ animation: 'fadeInRight 1s ease' }}>
            <style>{` @keyframes fadeInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } } `}</style>
            <h2 style={{ fontSize: '38px', fontWeight: 900, color: COLORS.navy, lineHeight: 1.2, marginBottom: '10px' }}>
              About the <span style={{ color: COLORS.gold }}>College</span>
            </h2>
            <h4 style={{ color: COLORS.gold, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '25px', fontSize: '14px' }}>Established 1970</h4>
            <p style={{ color: '#555', lineHeight: 1.8, fontSize: '16px', marginBottom: '30px', textAlign: 'justify' }}>
              Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru. We draw inspiration from the teachings of Guru Nanak Devji, fostering an environment of academic progress and individual development.
            </p>

            {/* Important Features Grid */}
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

            {/* Action Buttons & Social Links */}
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
                .social-icon-btn:hover {
                  background: ${COLORS.navy}; color: ${COLORS.gold}; transform: rotate(360deg);
                }
              `}</style>
              <Link to="/about-us/college-profile" className="discover-btn">
                DISCOVER MORE →
              </Link>

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

      {/* 4. OUR DEPARTMENTS & 5. COLLEGE FACILITIES (Combined in HomeFeatures) */}
      <HomeFeatures />

      {/* --- PROFESSIONAL EVENTS SECTION WITH REALISTIC DATA --- */}
      <section id="events" style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <SectionTitle
            title="Recent Events & Happenings"
            subtitle="Insights into our seminars, workshops, and vibrant campus activities"
          />

          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .scroller {
              overflow: hidden;
              width: 100%;
              padding: 20px 0;
              -webkit-mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent);
              mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent);
            }
            .scroller-track {
              display: flex;
              width: max-content;
              animation: scroll 60s linear infinite;
            }
            .scroller-track:hover {
              animation-play-state: paused;
            }
            .event-card-slide {
              width: 320px;
              margin: 0 15px;
              background: #fff;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(0,0,0,0.05);
              transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
              position: relative;
              border: 1px solid #eee;
              flex-shrink: 0;
            }
            .event-card-slide:hover {
              transform: translateY(-12px);
              box-shadow: 0 20px 45px rgba(15, 35, 71, 0.15);
            }
            .event-img-box {
              position: relative;
              height: 200px;
              overflow: hidden;
            }
            .event-img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: 0.6s ease;
            }
            .event-card-slide:hover .event-img {
              transform: scale(1.1);
            }
            .event-badge {
              position: absolute;
              top: 15px;
              right: 15px;
              background: ${COLORS.gold};
              color: #000;
              padding: 5px 12px;
              font-size: 10px;
              font-weight: 800;
              border-radius: 50px;
              text-transform: uppercase;
              z-index: 2;
            }
            .event-date {
              position: absolute;
              bottom: 0;
              left: 0;
              background: ${COLORS.navy};
              color: #fff;
              padding: 8px 15px;
              border-top-right-radius: 15px;
              text-align: center;
              z-index: 2;
            }
            .event-info {
              padding: 20px;
            }
            .event-title {
              font-size: 17px;
              font-weight: 800;
              color: ${COLORS.navy};
              margin-bottom: 10px;
              min-height: 48px;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          `}</style>

          <div className="scroller">
            <div className="scroller-track">
              {/* Combine static and dynamic events, duplicate for infinite loop */}
              {[...allRecentEventsForSlider, ...allRecentEventsForSlider].map((ev, i) => (
                <div key={i} className="event-card-slide">
                  <div className="event-img-box">
                    <div className="event-badge">{ev.type}</div>
                    <div className="event-date">
                      <div style={{ fontSize: '16px', fontWeight: 900 }}>{ev.day}</div>
                      <div style={{ fontSize: '9px', fontWeight: 700 }}>{ev.month}</div>
                    </div>
                    <img src={ev.imageUrl || getEventImage(ev.type)} alt={ev.title} className="event-img" />
                  </div>
                  <div className="event-info">
                    <h3 className="event-title">{ev.title}</h3>
                    <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', marginBottom: '15px', height: '60px', overflow: 'hidden' }}>
                      {ev.desc}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '12px' }}>
                      <span style={{ fontSize: '11px', color: '#888', fontWeight: 600 }}>📍 {ev.location}</span>
                      <a href="#" style={{ fontSize: '11px', color: COLORS.navy, fontWeight: 800, textDecoration: 'none' }}>DETAILS →</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- PROFESSIONAL & ANIMATED COLLEGE OVERVIEW (COUNTER) --- */}
      <section style={{
        background: `linear-gradient(135deg, ${COLORS.navyDark} 0%, ${COLORS.navy} 100%)`,
        padding: '80px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Decorative Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.05,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', textAlign: 'center', position: 'relative', zIndex: 2 }}>

          <style>{`
            .counter-box {
              padding: 20px;
              transition: transform 0.3s ease;
            }
            .counter-box:hover {
              transform: translateY(-10px);
            }
            .counter-icon {
              font-size: 50px;
              margin-bottom: 15px;
              display: inline-block;
              filter: drop-shadow(0 0 10px rgba(244,160,35,0.3));
            }
            .counter-number {
              font-size: 45px;
              font-weight: 900;
              color: ${COLORS.gold};
              line-height: 1;
              margin-bottom: 10px;
              font-family: 'Arial Black', sans-serif;
            }
            .counter-label {
              font-size: 14px;
              color: #e2e8f0;
              font-weight: 700;
              letter-spacing: 1.5px;
              text-transform: uppercase;
            }
          `}</style>

          {[
            { label: 'STUDENTS ENROLLED', value: '4,000+', icon: '👨‍🎓' },
            { label: 'SUCCESSFUL ALUMNI', value: '45,000+', icon: '🎓' },
            { label: 'EXPERT FACULTY', value: '50+', icon: '👨‍🏫' },
            { label: 'YEARS OF LEGACY', value: '56', icon: '🏛️' }
          ].map((item, i) => (
            <div key={i} className="counter-box">
              <div className="counter-icon">{item.icon}</div>
              <div className="counter-number">{item.value}</div>
              <div className="counter-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROFESSIONAL & CLEAN IMPORTANT LINKS SECTION --- */}
      <section style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionTitle
            title="Important External Links"
            subtitle="Quick access to official education and government portals"
          />

          <style>{`
            .links-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
              gap: 20px;
              margin-top: 40px;
            }
            .link-tile {
              background: #fff;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 25px 15px;
              text-align: center;
              text-decoration: none;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 12px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.02);
            }
            .link-tile:hover {
              transform: translateY(-8px);
              border-color: ${COLORS.gold};
              box-shadow: 0 12px 20px rgba(15, 35, 71, 0.08);
              background: #fff;
            }
            .link-icon-circle {
              width: 60px;
              height: 60px;
              background: #f1f5f9;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 28px;
              transition: 0.3s;
            }
            .link-tile:hover .link-icon-circle {
              background: ${COLORS.navy};
              color: #fff;
            }
            .link-name {
              font-size: 13px;
              font-weight: 800;
              color: ${COLORS.navy};
              letter-spacing: 0.5px;
            }
          `}</style>

          <div className="links-grid">
            {[
              { name: 'NAAC', url: 'https://naac.gov.in', icon: '🏅' },
              { name: 'UGC', url: 'https://ugc.ac.in', icon: '📜' },
              { name: 'INFLIBNET', url: 'https://inflibnet.ac.in', icon: '📚' },
              { name: 'NDL INDIA', url: 'https://ndl.gov.in', icon: '🔬' },
              { name: 'SWAYAM', url: 'https://swayam.gov.in', icon: '🌐' },
              { name: 'BBMK UNIVERSITY', url: 'https://bbmku.ac.in', icon: '🏛️' }
            ].map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="link-tile">
                <div className="link-icon-circle">{link.icon}</div>
                <div className="link-name">{link.name}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- FUNCTIONAL FILTERABLE PHOTO GALLERY --- */}
      <section id="gallery" style={{ padding: '100px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <SectionTitle
            title="📸 Photo Gallery"
            subtitle="Memorable glimpses of academic excellence and cultural heritage"
          />

          <style>{`
            .gallery-filters {
              display: flex;
              justify-content: center;
              gap: 12px;
              margin-bottom: 50px;
              flex-wrap: wrap;
            }
            .filter-btn {
              padding: 10px 24px;
              border-radius: 50px;
              border: 2px solid #edf2f7;
              background: #fff;
              color: #0f2347;
              font-weight: 700;
              font-size: 13px;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            .filter-btn:hover, .filter-btn.active {
              background: #0f2347;
              color: #fff;
              border-color: #0f2347;
              box-shadow: 0 5px 15px rgba(15,35,71,0.2);
            }
            .gallery-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
              gap: 15px;
              /* Animation for smooth appearance */
              animation: fadeIn 0.5s ease-in;
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .gallery-item {
              position: relative;
              border-radius: 15px;
              overflow: hidden;
              aspect-ratio: 4/3;
              box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            }
            .gallery-img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 0.6s ease;
            }
            .gallery-item:hover .gallery-img {
              transform: scale(1.1);
            }
            .gallery-overlay {
              position: absolute;
              inset: 0;
              background: linear-gradient(to top, rgba(15,35,71,0.9), transparent);
              opacity: 0;
              transition: 0.4s;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              padding: 20px;
            }
            .gallery-item:hover .gallery-overlay {
              opacity: 1;
            }
          `}</style>

          {/* Tab Buttons with onClick Logic */}
          <div className="gallery-filters">
            {['All Moments', 'Seminars', 'Cultural Fest', 'Guest Visit'].map((tab) => (
              <button
                key={tab}
                className={`filter-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid rendering filteredImages */}
          <div className="gallery-grid" key={activeTab}> {/* key={activeTab} se animation trigger hoga */}
            {filteredImages.map((img, i) => (
              <div key={i} className="gallery-item">
                <img src={img.src} alt={img.title} className="gallery-img" />
                <div className="gallery-overlay">
                  <span style={{ color: '#f4a023', fontSize: '10px', fontWeight: '800' }}>{img.cat}</span>
                  <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '700', marginTop: '5px' }}>{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage;
