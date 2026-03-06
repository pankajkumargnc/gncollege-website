import { COLORS } from '../styles/colors';
import { SOCIAL_LINKS } from '../data/db';

const Footer = () => {
    return (
        <footer style={{ background: COLORS.navyDark, color: '#fff', padding: '80px 20px 40px', borderTop: `4px solid ${COLORS.gold}` }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '50px' }}>

          {/* 1. COLLEGE INFO & LOGO (Updated with Image) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              {/* LOGO IMAGE SECTION */}
              <div style={{
                width: '70px',
                height: '70px',
                background: '#fff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                padding: '5px',
                boxShadow: `0 0 15px ${COLORS.gold}40`
              }}>
                <img src={`${import.meta.env.BASE_URL}images/logo.png`}  // Ensure karein ki aapka logo 'public' folder mein 'logo.png' naam se hai
                  alt="GNC Logo"
                  style={{ width: '100%', height: '100%', objectFormat: 'contain' }}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/70?text=GNC"; }} // Agar image na mile toh placeholder dikhega
                />
              </div>

              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, letterSpacing: '0.5px' }}>GURU NANAK COLLEGE</h3>
                <p style={{ margin: 0, color: COLORS.gold, fontSize: '11px', fontWeight: 700 }}>DHANBAD, JHARKHAND</p>
              </div>
            </div>

            <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#aab', marginBottom: '25px' }}>
              A Sikh Minority Degree College established in 1970, dedicated to providing quality education and fostering individual development.
            </p>

            {/* SOCIAL MEDIA ICONS WITH HOVER EFFECT */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <style>{`
                .footer-social-icon {
                  width: 38px;
                  height: 38px;
                  background: rgba(255, 255, 255, 0.1);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #fff;
                  text-decoration: none;
                  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                  font-size: 16px;
                  border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .footer-social-icon:hover {
                  background: ${COLORS.gold}; /* Hover par Gold background */
                  color: ${COLORS.navyDark}; /* Hover par Navy Blue icon */
                  transform: translateY(-5px) scale(1.1); /* Halka upar uthega aur bada hoga */
                  box-shadow: 0 5px 15px rgba(244, 160, 35, 0.4); /* Gold Glow effect */
                }
              `}</style>

              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label={s.label}
                >
                  {/* Har icon ke liye modern symbols */}
                  {s.id === 'twitter' ? '𝕏' : s.id === 'youtube' ? '▶' : s.label.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* 2. QUICK NAVIGATION */}
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '25px', position: 'relative', paddingBottom: '10px' }}>
              Quick Links
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '3px', background: COLORS.gold }}></span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px' }}>
              {['About College', 'Academic Programs', 'Notice Board', 'Admission 2024', 'Photo Gallery', 'Contact Us'].map(item => (
                <li key={item} style={{ marginBottom: '12px' }}>
                  <a href="#" style={{ color: '#aab', textDecoration: 'none', transition: '0.3s' }} onMouseOver={(e) => e.target.style.color = COLORS.gold} onMouseOut={(e) => e.target.style.color = '#aab'}>
                    <span style={{ color: COLORS.gold, marginRight: '8px' }}>›</span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONTACT DETAILS */}
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '25px', position: 'relative', paddingBottom: '10px' }}>
              Get In Touch
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '3px', background: COLORS.gold }}></span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '14px', color: '#aab' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: COLORS.gold }}>📍</span>
                <span>Barmasiya, Dhanbad, Jharkhand - 826001</span>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: COLORS.gold }}>📞</span>
                <a href="tel:+917903340991" style={{ color: 'inherit', textDecoration: 'none' }}>+91-7903340991</a>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: COLORS.gold }}>✉️</span>
                <a href="mailto:principal@gncollege.org" style={{ color: 'inherit', textDecoration: 'none' }}>principal@gncollege.org</a>
              </div>
            </div>
          </div>

          {/* 4. MAP LOCATION */}
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '25px', position: 'relative', paddingBottom: '10px' }}>
              Our Location
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '3px', background: COLORS.gold }}></span>
            </h4>
            <div style={{ width: '100%', height: '180px', borderRadius: '15px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}>
              {/* Dhanbad Map Placeholder */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.089853381653!2d86.43232147533682!3d23.797658878638367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69707963d7e8b%3A0x86733221469e7f7b!2sGuru%20Nanak%20College%20Dhanbad!5e0!3m2!1sen!2sin!4v1708688000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT AREA */}
        <div style={{ maxWidth: 1300, margin: '60px auto 0', padding: '30px 0 0', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#778', fontWeight: 600 }}>
            © 2026 <span style={{ color: COLORS.gold }}>Guru Nanak College, Dhanbad</span>. All Rights Reserved. | Developed by Pankaj Kumar Prasad
          </p>
        </div>
      </footer>
    )
}

export default Footer;