import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';
import { SOCIAL_LINKS } from '../data/db';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        
        {/* Widget 1: Logo & About */}
        <div className="footer-widget">
           {/* Logo Section - Flexbox for Left Align */}
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{
                width: '60px', height: '60px', background: '#fff', borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px'
              }}>
                <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                {/* Force Left Align & Single Line */}
                <h2 className="footer-logo-text" style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', margin: 0, lineHeight: '1' }}>
                  GURU NANAK COLLEGE
                </h2>
                <p className="footer-logo-text" style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', margin: '4px 0 0', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  DHANBAD, JHARKHAND
                </p>
              </div>
           </div>

           <p className="footer-desc">
             A Sikh Minority Degree College established in 1970, dedicated to providing quality education and fostering holistic development based on the teachings of Guru Nanak Dev Ji.
           </p>

           {/* Social Icons */}
           <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              {SOCIAL_LINKS.map(s => (
                <a key={s.id} href={s.href} target="_blank" rel="noreferrer" 
                   className="social-icon-btn" 
                   style={{ width: '40px', height: '40px', fontSize: '16px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {s.id === 'twitter' ? '𝕏' : s.id === 'youtube' ? '▶' : s.label.charAt(0)}
                </a>
              ))}
           </div>
        </div>

        {/* Widget 2: Quick Links */}
        <div className="footer-widget">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us/college-profile">College Profile</Link></li>
            <li><Link to="/admission/rule">Admission Rules</Link></li>
            <li><Link to="/academics/course-offered">Courses Offered</Link></li>
            <li><Link to="/gallery">Photo Gallery</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Widget 3: Contact Info */}
        <div className="footer-widget">
          <h3>Get In Touch</h3>
          <div className="footer-contact-item">
            <span className="footer-icon">📍</span>
            <div>
              <strong style={{color: '#fff'}}>Main Campus:</strong><br/>
              Bhuda, Dhanbad, Jharkhand - 826001
            </div>
          </div>
          <div className="footer-contact-item">
            <span className="footer-icon">📞</span>
            <a href="tel:+917903340991" style={{color: 'inherit', textDecoration: 'none'}}>+91 79033 40991</a>
          </div>
          <div className="footer-contact-item">
            <span className="footer-icon">✉️</span>
            <a href="mailto:principal@gncollege.org" style={{color: 'inherit', textDecoration: 'none'}}>principal@gncollege.org</a>
          </div>
        </div>

        {/* Widget 4: Newsletter (Premium Feature) */}
        <div className="footer-widget">
          <h3>Stay Updated</h3>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '15px', textAlign: 'left' }}>
            Subscribe to our newsletter for the latest notices and announcements.
          </p>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email..." className="newsletter-input" />
            <button className="newsletter-btn">Subscribe Now</button>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} <span style={{color: 'var(--accent-gold)', fontWeight: 'bold'}}>Guru Nanak College, Dhanbad</span>. All Rights Reserved.</p>
        <p style={{fontSize: '0.8rem', marginTop: '5px', opacity: 0.6}}>Designed & Developed with ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;