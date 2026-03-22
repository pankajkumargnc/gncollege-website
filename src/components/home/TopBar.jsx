import { COLORS } from '../../styles/colors';
import { SOCIAL_LINKS } from '../../data/db';

const TopBar = () => {
  const whatsappLink = { id: 'whatsapp', label: 'W', href: 'https://wa.me/917903340991' };

  return (
    <div className="top-bar-container" style={{ background: `linear-gradient(to right, ${COLORS.navyDark}, #0a1832)`, color: '#e2e8f0', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, fontWeight: 500, letterSpacing: '0.4px', borderBottom: `1px solid ${COLORS.gold}20` }}>
      <style>{`
        .top-bar-link {
          display: flex; align-items: center; gap: 8px;
          cursor: pointer; transition: all 0.3s ease;
          text-decoration: none; color: inherit;
        }
        .top-bar-link:hover { color: #f4a023; transform: scale(1.05); }
        .social-icon {
          width: 30px; height: 30px;
          background: rgba(255,255,255,0.05); border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: bold; color: #fff;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .social-icon:hover {
          background: #f4a023; color: #0f2347;
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(244,160,35,0.3);
        }
        .social-icon.whatsapp-icon:hover {
          background: #25D366; color: #fff;
          box-shadow: 0 8px 15px rgba(37,211,102,0.3);
        }
        .social-icon-facebook:hover {
          background: #1877F2 !important; color: #fff !important;
          box-shadow: 0 8px 15px rgba(24,119,242,0.3) !important;
        }
        .social-icon-youtube:hover {
          background: #FF0000 !important; color: #fff !important;
          box-shadow: 0 8px 15px rgba(255,0,0,0.3) !important;
        }
        .social-icon-linkedin:hover {
          background: #0A66C2 !important; color: #fff !important;
          box-shadow: 0 8px 15px rgba(10,102,194,0.3) !important;
        }
        .contact-group { display: flex; gap: 28px; }

        /* ── Quick Link Buttons ── */
        .tb-qlink {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 800;
          padding: 4px 10px; border-radius: 5px;
          text-decoration: none; white-space: nowrap;
          transition: all .18s; letter-spacing: 0.3px;
          border: 1px solid;
        }
        .tb-result {
          background: rgba(244,160,35,0.12);
          border-color: rgba(244,160,35,0.45);
          color: #f4a023;
        }
        .tb-result:hover { background: #f4a023; color: #0f2347; border-color: #f4a023; transform: translateY(-2px); }
        .tb-fee {
          background: rgba(16,185,129,0.12);
          border-color: rgba(16,185,129,0.45);
          color: #10b981;
        }
        .tb-fee:hover { background: #10b981; color: #fff; border-color: #10b981; transform: translateY(-2px); }
        .tb-admission {
          background: rgba(99,102,241,0.12);
          border-color: rgba(99,102,241,0.45);
          color: #818cf8;
        }
        .tb-admission:hover { background: #6366f1; color: #fff; border-color: #6366f1; transform: translateY(-2px); }

        @media (max-width: 900px) { .tb-quick-links { display: none; } }
        @media (max-width: 650px) {
          .contact-group { flex-direction: column; gap: 8px; align-items: center; }
          .top-bar-container { flex-direction: column; gap: 14px; padding: 12px 20px; }
        }
      `}</style>

      {/* ── Left: Phone + Email ── */}
      <div className="contact-group">
        <a href="tel:+917903340991" className="top-bar-link">
          <span style={{ fontSize: 15, color: COLORS.gold }}>📞</span> +91-7903340991
        </a>
        <a href="mailto:principal@gncollege.org" className="top-bar-link">
          <span style={{ fontSize: 15, color: COLORS.gold }}>✉️</span> principal@gncollege.org
        </a>
      </div>

      {/* ── Right: Quick Links + Social Icons ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

        {/* Quick Action Buttons */}
        <div className="tb-quick-links" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <a
            href="https://bbmkuniv.in/login"
            target="_blank"
            rel="noopener noreferrer"
            className="tb-qlink tb-result"
            title="BBMKU Exam Results"
          >
            📋 Results
          </a>
          <a
            href="https://cimsstudentnewui.mastersofterp.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="tb-qlink tb-fee"
            title="Online Fee Payment"
          >
            💳 Fee Payment
          </a>
          <a
            href="https://jharkhanduniversities.nic.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="tb-qlink tb-admission"
            title="Apply for Admission"
          >
            🎓 Apply Now
          </a>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.15)', margin: '0 4px' }} />

        {/* Social Icons */}
        {SOCIAL_LINKS.map(s => {
          let iconText = s.label;
          if (s.id === 'twitter') iconText = '𝕏';
          if (s.id === 'youtube') iconText = '▶';
          return (
            <a key={s.id} href={s.href} aria-label={s.id} target="_blank" rel="noopener noreferrer"
              className={`social-icon social-icon-${s.id}`}>
              {iconText}
            </a>
          );
        })}

        {/* WhatsApp */}
        <a href={whatsappLink.href} aria-label="whatsapp" target="_blank" rel="noopener noreferrer"
          className="social-icon whatsapp-icon">
          W
        </a>

      </div>
    </div>
  );
};

export default TopBar;