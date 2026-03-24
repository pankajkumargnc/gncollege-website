import React from 'react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS } from '../data/db';

const Footer = () => {
  return (
    <footer className="premium-footer">
      {/* INTERNAL CSS FOR PREMIUM LOOK */}
      <style>{`
        .premium-footer {
          background: linear-gradient(135deg, #071022 0%, #0f172a 100%);
          color: #e2e8f0;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          position: relative;
          overflow: hidden;
          border-top: 4px solid #f4a023; /* Gold accent line */
        }
        
        /* Subtle Glow Effect in Background */
        .premium-footer::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle at center, rgba(244, 160, 35, 0.03) 0%, transparent 50%);
          pointer-events: none;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 50px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 20px;
          position: relative;
          z-index: 1;
        }

        .footer-widget {
          display: flex;
          flex-direction: column;
        }

        .footer-heading {
          color: #fff;
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 30px;
          position: relative;
          display: inline-block;
          letter-spacing: 0.5px;
        }
        
        .footer-heading::after {
          content: '';
          position: absolute;
          left: 0; bottom: -10px;
          width: 40px; height: 3px;
          background: #f4a023;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        
        .footer-widget:hover .footer-heading::after {
          width: 70px;
        }

        .footer-desc {
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.8;
          margin-bottom: 25px;
        }

        /* Social Icons */
        .social-btn {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
          display: inline-flex; align-items: center; justify-content: center;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255,255,255,0.05);
          font-size: 1.1rem;
        }
        
        .social-btn:hover {
          background: #f4a023;
          color: #071022;
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(244, 160, 35, 0.25);
          border-color: #f4a023;
        }

        /* Links */
        .footer-links {
          list-style: none; padding: 0; margin: 0;
        }
        
        .footer-link-item {
          margin-bottom: 15px;
        }

        .footer-link {
          display: inline-flex;
          align-items: center;
          color: #cbd5e1;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          font-weight: 500;
        }
        
        .footer-link:hover {
          color: #f4a023;
          transform: translateX(8px);
        }
        
        .footer-link span {
          margin-right: 10px;
          font-size: 1.2rem;
          color: #f4a023;
          transition: transform 0.3s ease;
        }
        
        .footer-link:hover span {
          transform: translateX(3px);
        }

        /* Contact Details */
        .contact-item {
          display: flex; align-items: flex-start; gap: 15px; margin-bottom: 25px;
        }
        
        .contact-icon {
          width: 40px; height: 40px;
          background: rgba(244, 160, 35, 0.1);
          color: #f4a023;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 1.2rem;
          border: 1px solid rgba(244, 160, 35, 0.2);
          transition: all 0.3s ease;
        }

        .contact-item:hover .contact-icon {
          background: #f4a023;
          color: #071022;
          transform: rotate(10deg);
        }
        
        .contact-text {
          color: #94a3b8; font-size: 0.95rem; line-height: 1.5;
        }
        
        .contact-text strong {
          color: #fff; display: block; margin-bottom: 5px; font-size: 1rem; font-weight: 700;
        }
        
        .contact-link {
          color: #94a3b8; text-decoration: none; transition: 0.2s;
        }
        .contact-link:hover { color: #f4a023; text-decoration: underline; }

        /* Newsletter */
        .newsletter-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 6px;
          display: flex;
          margin-top: 10px;
          transition: all 0.3s ease;
        }
        .newsletter-box:focus-within {
          border-color: rgba(244, 160, 35, 0.5);
          box-shadow: 0 0 20px rgba(244, 160, 35, 0.1);
          background: rgba(255,255,255,0.05);
        }
        
        .newsletter-input {
          background: transparent; border: none; outline: none;
          color: #fff; padding: 12px 15px; width: 100%;
          font-size: 0.95rem;
        }
        .newsletter-input::placeholder { color: #64748b; }
        
        .newsletter-btn {
          background: #f4a023; color: #071022;
          border: none; border-radius: 8px;
          padding: 0 22px; font-weight: 800; cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }
        .newsletter-btn:hover {
          background: #ffb142; 
          box-shadow: 0 5px 15px rgba(244, 160, 35, 0.3);
        }

        /* Bottom Bar */
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 25px 20px;
          background: #040a15;
          position: relative;
          z-index: 1;
        }
        
        .footer-bottom-content {
          max-width: 1400px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 15px;
        }
        
        .footer-copyright { margin: 0; color: #94a3b8; font-size: 0.95rem; }
        .footer-dev { margin: 0; font-size: 0.85rem; color: #64748b; }
        
        @media (max-width: 768px) {
          .footer-bottom-content { justify-content: center; text-align: center; flex-direction: column; }
        }
      `}</style>

      <div className="footer-grid">
        
        {/* WIDGET 1: Premium Brand Logo & About */}
        <div className="footer-widget">
           <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '25px' }}>
              <div style={{
                width: '75px', height: '75px', background: 'rgba(255,255,255,0.95)', borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
              }}>
                <img src={`${import.meta.env.BASE_URL}images/logo.webp`} alt="GNC Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fff', margin: '0 0 2px 0', lineHeight: '1.1' }}>
                  GURU NANAK
                </h2>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#f4a023', margin: 0, lineHeight: '1.1' }}>
                  COLLEGE
                </h2>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '6px 0 0', fontWeight: '700', letterSpacing: '1.5px' }}>
                  DHANBAD, JHARKHAND
                </p>
              </div>
           </div>

           <p className="footer-desc">
             A Sikh Minority Degree College established in 1970. We are dedicated to providing premium quality education and fostering holistic development based on the core teachings of Guru Nanak Dev Ji.
           </p>

           <div style={{ display: 'flex', gap: '12px' }}>
              {SOCIAL_LINKS && SOCIAL_LINKS.map(s => (
                <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="social-btn" aria-label={s.label}>
                  {s.id === 'twitter' ? '𝕏' : s.id === 'youtube' ? '▶' : s.id === 'facebook' ? 'f' : s.id === 'instagram' ? 'in' : s.label.charAt(0)}
                </a>
              ))}
           </div>
        </div>

        {/* WIDGET 2: Quick Navigation */}
        <div className="footer-widget">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            {[
              { label: 'Home', path: '/' },
              { label: 'College Profile', path: '/about-us/college-profile' },
              { label: 'Admission Rules', path: '/admission/rule' },
              { label: 'Courses Offered', path: '/academics/course-offered' },
              { label: 'Photo Gallery', path: '/gallery' },
              { label: 'Contact Us', path: '/contact' }
            ].map((link, idx) => (
              <li key={idx} className="footer-link-item">
                <Link to={link.path} onClick={() => window.scrollTo(0,0)} className="footer-link">
                  <span>›</span> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* WIDGET 3: Enhanced Contact Info */}
        <div className="footer-widget">
          <h3 className="footer-heading">Get In Touch</h3>
          
          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <div className="contact-text">
              <strong>Main Campus</strong>
              Bhuda, Dhanbad,<br/>Jharkhand - 826001, India
            </div>
          </div>
          
          <div className="contact-item">
            <div className="contact-icon">📞</div>
            <div className="contact-text">
              <strong>Phone Enquiries</strong>
              <a href="tel:+917903340991" className="contact-link">+91 79033 40991</a>
            </div>
          </div>
          
          <div className="contact-item">
            <div className="contact-icon">✉️</div>
            <div className="contact-text">
              <strong>Email Us</strong>
              <a href="mailto:principal@gncollege.org" className="contact-link">principal@gncollege.org</a>
            </div>
          </div>
        </div>

        {/* WIDGET 4: Newsletter */}
        <button className="newsletter-btn" onClick={() => alert('Newsletter coming soon!')}>
  Subscribe
</button>

      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} <span style={{color: '#f4a023', fontWeight: '800'}}>Guru Nanak College, Dhanbad</span>. All Rights Reserved.
          </p>
          <p className="footer-dev">
            Designed & Developed dynamically with ❤️ By Pankaj Kumar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;