import { COLORS } from '../../styles/colors';
import { SOCIAL_LINKS } from '../../data/db';

const TopBar = () => {
  // WhatsApp link ko alag se define karein
  const whatsappLink = { id: 'whatsapp', label: 'W', href: 'https://wa.me/917903340991' };
  
  return (
    <div className="top-bar-container" style={{ background: `linear-gradient(to right, ${COLORS.navyDark}, #0a1832)`, color: '#e2e8f0', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, fontWeight: 500, letterSpacing: '0.4px', borderBottom: `1px solid ${COLORS.gold}20` }}>
      <style>
        {`
          .top-bar-link {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            color: inherit;
          }
          .top-bar-link:hover {
            color: #f4a023; /* Gold Text */
            transform: scale(1.05);
          }
          .social-icon {
            width: 30px;
            height: 30px;
            background: rgba(255,255,255,0.05);
            border-radius: 8px; /* Thoda modern look */
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
            color: #fff;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255,255,255,0.1);
          }
          .social-icon:hover {
            background: #f4a023; /* Gold BG */
            color: #0f2347; /* Navy Dark Icon */
            transform: translateY(-3px);
            box-shadow: 0 8px 15px rgba(244,160,35,0.3); /* Gold Glow */
          }
          /* WhatsApp ke liye alag style */
          .social-icon.whatsapp-icon:hover {
            background: #25D366; /* Green BG */
            color: #fff;
            box-shadow: 0 8px 15px rgba(37, 211, 102, 0.3); /* Green Glow */
          }
          /* 🌟 NEW: Natural Brand Colors on Hover 🌟 */
          .social-icon-facebook:hover {
            background: #1877F2;
            color: #fff;
            box-shadow: 0 8px 15px rgba(24, 119, 242, 0.3);
          }
          .social-icon-youtube:hover {
            background: #FF0000;
            color: #fff;
            box-shadow: 0 8px 15px rgba(255, 0, 0, 0.3);
          }
          .social-icon-linkedin:hover {
            background: #0A66C2;
            color: #fff;
            box-shadow: 0 8px 15px rgba(10, 102, 194, 0.3);
          }
          .contact-group {
            display: flex;
            gap: 28px;
          }
          /* Mobile par automatically adjust ho jayega */
          @media (max-width: 650px) {
            .contact-group { flex-direction: column; gap: 8px; align-items: center; }
            .top-bar-container { flex-direction: column; gap: 14px; padding: 12px 20px; }
          }
        `}
      </style>

      <div className="contact-group">
        <a href="tel:+917903340991" className="top-bar-link">
          <span style={{ fontSize: '15px', color: COLORS.gold }}>📞</span> +91-7903340991
        </a>
        <a href="mailto:principal@gncollege.org" className="top-bar-link">
          <span style={{ fontSize: '15px', color: COLORS.gold }}>✉️</span> principal@gncollege.org
        </a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {SOCIAL_LINKS.map(s => {
          let iconText = s.label;
          if (s.id === 'twitter') iconText = '𝕏';
          if (s.id === 'youtube') iconText = '▶';
          
          return (
            <a key={s.id} href={s.href} aria-label={s.id} target="_blank" rel="noopener noreferrer" className={`social-icon social-icon-${s.id}`}>
              {iconText}
            </a>
          )
        })}
        {/* WhatsApp Icon ko alag se add karein */}
        <a key={whatsappLink.id} href={whatsappLink.href} aria-label={whatsappLink.id} target="_blank" rel="noopener noreferrer" className="social-icon whatsapp-icon">
          {whatsappLink.label}
        </a>
      </div>
    </div>
  );
}

export default TopBar;
