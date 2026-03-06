import { COLORS } from '../../styles/colors';
import { SOCIAL_LINKS } from '../../data/db';

const TopBar = () => (
    <div className="top-bar-container" style={{ background: COLORS.navyDark, color: '#e2e8f0', padding: '8px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5, fontWeight: 500, letterSpacing: '0.4px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
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
            transform: translateX(5px); /* Hover par right slide */
          }
          .social-icon {
            width: 28px;
            height: 28px;
            background: rgba(255,255,255,0.08);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            font-weight: bold;
            color: #fff;
            text-decoration: none;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Bouncy Animation */
          }
          .social-icon:hover {
            background: #f4a023; /* Gold BG */
            color: #0f2347; /* Navy Dark Icon */
            transform: translateY(-4px) scale(1.15); /* Upar uthega aur bada hoga */
            box-shadow: 0 6px 12px rgba(244,160,35,0.4); /* Gold Glow */
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

      <div style={{ display: 'flex', gap: 12 }}>
        {SOCIAL_LINKS.map(s => {
          let iconText = s.label;
          if (s.id === 'twitter') iconText = '𝕏';
          if (s.id === 'youtube') iconText = '▶';
          
          return (
            <a key={s.id} href={s.href} aria-label={s.id} target="_blank" rel="noopener noreferrer" className="social-icon">
              {iconText}
            </a>
          )
        })}
      </div>
    </div>
);

export default TopBar;
