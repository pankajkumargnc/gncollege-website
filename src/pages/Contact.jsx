import React, { useEffect } from 'react';
import '../styles/index.css';
import { COLORS } from '../styles/colors';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="profile-page-wrapper">
      {/* INTERNAL CSS FOR CONTACT PAGE SPECIFIC STYLES */}
      <style>{`
        /* --- ANIMATIONS --- */
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(244, 160, 35, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(244, 160, 35, 0); }
          100% { box-shadow: 0 0 0 0 rgba(244, 160, 35, 0); }
        }

        /* --- HERO HEADER --- */
        .contact-header {
          background: linear-gradient(135deg, ${COLORS.navy} 0%, #0a1832 100%);
          color: white;
          padding: 80px 20px 140px; /* Increased bottom padding */
          text-align: center;
          position: relative;
        }
        .header-title {
          font-size: 46px;
          font-weight: 900;
          margin: 0;
          letter-spacing: -1px;
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .header-title span { color: ${COLORS.gold}; }
        .header-sub {
          font-size: 16px;
          color: #cbd5e1;
          margin-top: 15px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          animation: fadeInUp 0.6s ease-out 0.2s forwards;
          opacity: 0;
          line-height: 1.6;
        }

        /* --- CAMPUS SECTION --- */
        .campus-container {
          max-width: 1200px;
          margin: -120px auto 40px; /* Overlap effect */
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 40px;
          position: relative;
          z-index: 10;
        }
        .campus-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,0.07);
          border: 1px solid #e2e8f0;
          transition: all 0.4s ease;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
          display: flex;
          flex-direction: column;
        }
        .campus-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(15, 35, 71, 0.12);
          border-color: var(--accent-gold);
        }
        .card-1 { animation-delay: 0.3s; }
        .card-2 { animation-delay: 0.5s; }

        .card-header {
          padding: 25px 30px;
          display: flex;
          align-items: center;
          gap: 15px;
          background: #fafbfc;
          border-bottom: 1px solid #edf2f7;
        }
        .campus-icon {
          width: 55px;
          height: 55px;
          background: rgba(244, 160, 35, 0.15);
          color: var(--accent-gold);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          flex-shrink: 0;
        }
        .campus-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--primary-navy);
          margin: 0;
        }
        .campus-badge {
          font-size: 11px;
          background: var(--primary-navy);
          color: #fff;
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 700;
          margin-top: 6px;
          display: inline-block;
          letter-spacing: 0.5px;
        }
        .card-details { padding: 25px 30px; flex-grow: 1; }
        .detail-row { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px; }
        .detail-row:last-child { margin-bottom: 0; }
        .d-icon { font-size: 20px; color: var(--primary-navy); margin-top: 2px; }
        .d-text h4 { margin: 0 0 4px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; color: #718096; }
        .d-text p, .d-text a { margin: 0; font-size: 15px; color: #2d3748; font-weight: 600; text-decoration: none; line-height: 1.5; transition: color 0.2s; }
        .d-text a:hover { color: var(--accent-gold); }
        .map-container {
          width: 100%;
          height: 250px;
          border-top: 1px solid #edf2f7;
          background: #e2e8f0;
        }
        .map-container iframe {
          width: 100%;
          height: 100%;
          border: none;
          filter: grayscale(10%) contrast(1.05);
          transition: all 0.4s ease;
        }
        .campus-card:hover .map-container iframe { filter: grayscale(0%) contrast(1); }

        /* --- DIRECTORY SECTION --- */
        .directory-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .directory-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.3s ease;
        }
        .directory-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-gold);
          box-shadow: 0 8px 25px rgba(15, 35, 71, 0.08);
        }
        .dir-icon { font-size: 1.8rem; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: #f1f5f9; border-radius: 50%; flex-shrink: 0; }
        .dir-title { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; margin-bottom: 4px; }
        .dir-name { font-size: 1.1rem; font-weight: 800; color: var(--primary-navy); margin-bottom: 6px; }
        .dir-contact { font-size: 0.9rem; font-weight: 600; color: #4a5568; text-decoration: none; }
        .dir-contact:hover { color: var(--accent-gold); }

        @media (max-width: 900px) {
          .campus-container { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .contact-header { padding: 60px 20px 80px; }
          .header-title { font-size: 36px; }
          .campus-container { margin-top: -60px; }
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <header className="contact-header">
        <h1 className="header-title">Get In <span>Touch</span></h1>
        <p className="header-sub">We are here to assist you. Reach out to our respective campuses or directly contact our administration team for any queries.</p>
      </header>

      {/* 2. CAMPUS CARDS CONTAINER */}
      <div className="campus-container">
        {/* Bhuda Campus Card */}
        <div className="campus-card card-1">
          <div className="card-header">
            <div className="campus-icon">🏛️</div>
            <div>
              <h2 className="campus-title">Bhuda Campus</h2>
              <span className="campus-badge" style={{background: COLORS.navy}}>Main Campus • Boys Wing</span>
            </div>
          </div>
          <div className="card-details">
            <div className="detail-row"><div className="d-icon">📍</div><div className="d-text"><h4>Location</h4><p>Guru Nanak College, Bhuda<br/>Dhanbad, Jharkhand - 826001</p></div></div>
            <div className="detail-row"><div className="d-icon">📞</div><div className="d-text"><h4>Helpdesk</h4><a href="tel:+917903340991">+91 79033 40991</a></div></div>
            <div className="detail-row"><div className="d-icon">✉️</div><div className="d-text"><h4>Email ID</h4><a href="mailto:info@gncollege.org">info@gncollege.org</a></div></div>
          </div>
          <div className="map-container">
            <iframe title="Bhuda Campus Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.089853381653!2d86.43232147533682!3d23.797658878638367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69707963d7e8b%3A0x86733221469e7f7b!2sGuru%20Nanak%20College%20Dhanbad!5e0!3m2!1sen!2sin!4v1708688000000!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>

        {/* Bank More Campus Card */}
        <div className="campus-card card-2">
          <div className="card-header">
            <div className="campus-icon">🏢</div>
            <div>
              <h2 className="campus-title">Bank More Campus</h2>
              <span className="campus-badge" style={{background: COLORS.gold, color: COLORS.navyDark}}>Girls Wing • Vocational Studies</span>
            </div>
          </div>
          <div className="card-details">
            <div className="detail-row"><div className="d-icon">📍</div><div className="d-text"><h4>Location</h4><p>Guru Nanak College, Bank More<br/>Dhanbad, Jharkhand - 826001</p></div></div>
            <div className="detail-row"><div className="d-icon">📞</div><div className="d-text"><h4>Helpdesk</h4><a href="tel:+910000000000">+91 (Add Number)</a></div></div>
            <div className="detail-row"><div className="d-icon">✉️</div><div className="d-text"><h4>Email ID</h4><a href="mailto:vocational@gncollege.org">vocational@gncollege.org</a></div></div>
          </div>
          <div className="map-container">
            <iframe title="Bank More Campus Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.630325992144!2d86.4175863149822!3d23.77601898456687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6a3048817a859%3A0x8d365f7d34c52968!2sGuru%20Nanak%20College%20Womens%20Wing!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>

      <div className="profile-container" style={{marginTop: 0}}>
        {/* Administration Directory Section */}
        <section className="glass-panel profile-section anim-slide-up" style={{ animationDelay: '0.3s', background: 'transparent', boxShadow: 'none', border: 'none', padding: '0 !important' }}>
          <h2 className="section-heading" style={{textAlign: 'center !important', fontSize: '32px'}}>Administration Directory</h2>
          <div className="heading-underline" style={{margin: '0 auto 30px'}}></div>

          <div className="directory-grid">
            {[
              { title: "Prof. In-Charge (Bhuda Campus)", name: "Prof. [Name Here]", phone: "+91 XXXXX XXXXX", icon: "👩‍🏫" },
              { title: "Prof. In-Charge (Bank More Campus)", name: "Prof. [Name Here]", phone: "+91 XXXXX XXXXX", icon: "👩‍🏫" },
              { title: "BCA Coordinator", name: "Prof. [Name Here]", phone: "+91 XXXXX XXXXX", icon: "💻" },
              { title: "Member, Women's Cell", name: "Prof. [Name Here]", phone: "+91 XXXXX XXXXX", icon: "🛡️" },
              { title: "Member, Anti-Ragging Squad", name: "Prof. [Name Here]", phone: "+91 XXXXX XXXXX", icon: "🛑" },
              { title: "P.A. to Principal", name: "Mr. [Name Here]", phone: "+91 XXXXX XXXXX", icon: "📝" },
            ].map((person, index) => (
              <div key={index} className="directory-card">
                <div className="dir-icon">{person.icon}</div>
                <div>
                  <div className="dir-title">{person.title}</div>
                  <div className="dir-name">{person.name}</div>
                  <a href={`tel:${person.phone}`} className="dir-contact">📞 {person.phone}</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
