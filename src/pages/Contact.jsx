import React, { useEffect } from 'react';
import { COLORS } from '../styles/colors';

export default function Contact() {
  // Page khulte hi top par scroll karne ke liye
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Important Personnel Data Array
  const keyContacts = [
    { role: 'Prof. In-Charge (Bhuda Campus)', name: 'Prof. [Name Here]', phone: '+91 XXXXX XXXXX', icon: '👨‍🏫', type: 'admin' },
    { role: 'Prof. In-Charge (Bank More Campus)', name: 'Prof. [Name Here]', phone: '+91 XXXXX XXXXX', icon: '👩‍🏫', type: 'admin' },
    { role: 'BCA Coordinator', name: 'Prof. [Name Here]', phone: '+91 XXXXX XXXXX', icon: '💻', type: 'academic' },
    { role: 'Member, Women\'s Cell', name: 'Prof. [Name Here]', phone: '+91 XXXXX XXXXX', icon: '🛡️', type: 'committee' },
    { role: 'Member, Anti-Ragging Squad', name: 'Prof. [Name Here]', phone: '+91 XXXXX XXXXX', icon: '🛑', type: 'committee' },
    { role: 'P.A. to Principal', name: 'Mr. [Name Here]', phone: '+91 XXXXX XXXXX', icon: '📝', type: 'admin' },
  ];

  return (
    <div className="contact-wrapper">
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

        .contact-wrapper {
          background: #f4f7fa;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding-bottom: 80px;
        }

        /* --- HERO HEADER --- */
        .contact-header {
          background: linear-gradient(135deg, ${COLORS.navy} 0%, #0a1832 100%);
          color: white;
          padding: 80px 20px 70px;
          text-align: center;
          position: relative;
          clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
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
        .section-title {
          text-align: center;
          font-size: 32px;
          color: ${COLORS.navy};
          font-weight: 800;
          margin: 40px 0 30px;
          position: relative;
        }
        .section-title::after {
          content: '';
          display: block;
          width: 60px;
          height: 4px;
          background: ${COLORS.gold};
          margin: 10px auto 0;
          border-radius: 2px;
        }

        .campus-container {
          max-width: 1200px;
          margin: -30px auto 0;
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 40px;
          position: relative;
          z-index: 10;
        }

        .campus-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0,0,0,0.06);
          border: 1px solid #edf2f7;
          border-bottom: 5px solid ${COLORS.navy};
          transition: all 0.4s ease;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
          display: flex;
          flex-direction: column;
        }
        .campus-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(15,35,71,0.15);
          border-bottom-color: ${COLORS.gold};
        }
        .card-1 { animation-delay: 0.3s; }
        .card-2 { animation-delay: 0.5s; }

        .card-header {
          padding: 30px 30px 20px;
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
          color: ${COLORS.gold};
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          animation: pulseGlow 2s infinite;
        }
        .campus-title { font-size: 24px; font-weight: 800; color: ${COLORS.navy}; margin: 0; }
        .campus-badge { font-size: 12px; background: ${COLORS.navy}; color: #fff; padding: 4px 12px; border-radius: 20px; font-weight: 700; margin-top: 6px; display: inline-block; letter-spacing: 0.5px;}

        .card-details { padding: 25px 30px; flex: 1; }
        .detail-row { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px; }
        .detail-row:last-child { margin-bottom: 0; }
        .d-icon { font-size: 20px; color: ${COLORS.navy}; margin-top: 2px; }
        .d-text h4 { margin: 0 0 4px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; color: #718096; }
        .d-text p, .d-text a { margin: 0; font-size: 15.5px; color: #2d3748; font-weight: 600; text-decoration: none; line-height: 1.5; transition: color 0.2s; }
        .d-text a:hover { color: ${COLORS.gold}; }

        .map-container { width: 100%; height: 250px; border-top: 1px solid #edf2f7; background: #e2e8f0; position: relative; }
        .map-container iframe { width: 100%; height: 100%; border: none; filter: grayscale(15%) contrast(1.1); transition: all 0.4s ease; }
        .campus-card:hover .map-container iframe { filter: grayscale(0%) contrast(1); }

        /* --- KEY CONTACTS SECTION --- */
        .contacts-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 25px;
        }
        .contact-person-card {
          background: #fff;
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.04);
          border: 1px solid #edf2f7;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .contact-person-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(15,35,71,0.1);
          border-color: #cbd5e0;
        }
        /* Staggered animation for grid items */
        .contact-person-card:nth-child(1) { animation-delay: 0.6s; }
        .contact-person-card:nth-child(2) { animation-delay: 0.7s; }
        .contact-person-card:nth-child(3) { animation-delay: 0.8s; }
        .contact-person-card:nth-child(4) { animation-delay: 0.9s; }
        .contact-person-card:nth-child(5) { animation-delay: 1.0s; }
        .contact-person-card:nth-child(6) { animation-delay: 1.1s; }

        .cp-icon {
          width: 55px; height: 55px;
          background: #f4f7fa;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; color: ${COLORS.navy};
        }
        .cp-details flex: 1;
        .cp-role { font-size: 12.5px; color: ${COLORS.gold}; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px; }
        .cp-name { font-size: 18px; color: ${COLORS.navy}; font-weight: 800; margin: 0 0 6px; }
        .cp-phone { display: inline-flex; align-items: center; gap: 6px; font-size: 15px; color: #4a5568; font-weight: 600; text-decoration: none; background: #f8fafc; padding: 6px 12px; border-radius: 6px; transition: all 0.2s; }
        .cp-phone:hover { background: ${COLORS.navy}; color: ${COLORS.gold}; }

        /* --- MOBILE RESPONSIVE --- */
        @media (max-width: 768px) {
          .contact-header { padding: 60px 20px 80px; clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%); }
          .header-title { font-size: 36px; }
          .campus-container { grid-template-columns: 1fr; gap: 30px; margin-top: -40px; }
          .contacts-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* --- 1. HERO SECTION --- */}
      <div className="contact-header">
        <h1 className="header-title">Get In <span>Touch</span></h1>
        <p className="header-sub">We are here to assist you. Reach out to our respective campuses or directly contact our administration team.</p>
      </div>

      

      {/* --- 2. DUAL CAMPUS SECTION --- */}
      <div className="campus-container">
        {/* BHUDA CAMPUS */}
        <div className="campus-card card-1">
          <div className="card-header">
            <div className="campus-icon">🏛️</div>
            <div>
              <h2 className="campus-title">Bhuda Campus</h2>
              <span className="campus-badge" style={{ background: COLORS.navy }}>Main Campus • Boys Wing</span>
            </div>
          </div>
          <div className="card-details">
            <div className="detail-row">
              <div className="d-icon">📍</div>
              <div className="d-text">
                <h4>Location</h4>
                <p>Guru Nanak College, Bhuda<br/>Dhanbad, Jharkhand - 826001</p>
              </div>
            </div>
            <div className="detail-row">
              <div className="d-icon">📞</div>
              <div className="d-text">
                <h4>Helpdesk</h4>
                <a href="tel:+917903340991">+91 79033 40991</a> 
              </div>
            </div>
            <div className="detail-row">
              <div className="d-icon">✉️</div>
              <div className="d-text">
                <h4>Email ID</h4>
                <a href="mailto:info@gncollege.org">info@gncollege.org</a>
              </div>
            </div>
          </div>
          <div className="map-container">
            {/* 📍 UPDATE: Replace src with actual Google Maps Embed for Bhuda */}
            <iframe title="Bhuda Campus Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14606.874130097746!2d86.4253!3d23.7942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzM5LjEiTiA4NsKwMjUnMzEuMSJF!5e0!3m2!1sen!2sin!4v1700000000000" allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>

        {/* BANK MORE CAMPUS */}
        <div className="campus-card card-2">
          <div className="card-header">
            <div className="campus-icon">🏢</div>
            <div>
              <h2 className="campus-title">Bank More Campus</h2>
              <span className="campus-badge" style={{ background: COLORS.gold, color: COLORS.navy }}>Girls Wing • Vocational Studies</span>
            </div>
          </div>
          <div className="card-details">
            <div className="detail-row">
              <div className="d-icon">📍</div>
              <div className="d-text">
                <h4>Location</h4>
                <p>Guru Nanak College, Bank More<br/>Dhanbad, Jharkhand - 826001</p>
              </div>
            </div>
            <div className="detail-row">
              <div className="d-icon">📞</div>
              <div className="d-text">
                <h4>Helpdesk</h4>
                <a href="tel:+910000000000">+91 (Add Number)</a>
              </div>
            </div>
            <div className="detail-row">
              <div className="d-icon">✉️</div>
              <div className="d-text">
                <h4>Email ID</h4>
                <a href="mailto:vocational@gncollege.org">vocational@gncollege.org</a>
              </div>
            </div>
          </div>
          <div className="map-container">
            {/* 📍 UPDATE: Replace src with actual Google Maps Embed for Bank More */}
            <iframe title="Bank More Campus Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14606.874130097746!2d86.4153!3d23.7942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzM5LjEiTiA4NsKwMjUnMzEuMSJF!5e0!3m2!1sen!2sin!4v1700000000000" allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </div>

      {/* --- 3. KEY ADMINISTRATION CONTACTS --- */}
      <h2 className="section-title">Administration Directory</h2>
      <div className="contacts-grid">
        {keyContacts.map((contact, index) => (
          <div key={index} className="contact-person-card">
            <div className="cp-icon">{contact.icon}</div>
            <div className="cp-details">
              <p className="cp-role">{contact.role}</p>
              <h3 className="cp-name">{contact.name}</h3>
              {/* Phone button */}
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="cp-phone">
                📞 {contact.phone}
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}