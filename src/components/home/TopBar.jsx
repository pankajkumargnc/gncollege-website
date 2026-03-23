import { COLORS } from '../../styles/colors';
import { SOCIAL_LINKS } from '../../data/db';

const TopBar = () => {
  const whatsappLink = { id: 'whatsapp', label: 'W', href: 'https://wa.me/917903340991' };

  return (
    <div style={{
      background: `linear-gradient(to right, ${COLORS.navyDark}, #0a1832)`,
      color: '#e2e8f0',
      borderBottom: `1px solid ${COLORS.gold}20`,
      width: '100%',
      maxWidth: '100vw',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      <style>{`
        .tb-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px clamp(12px, 2vw, 20px);
          gap: 8px;
          min-width: 0;
          max-width: 100%;
          flex-wrap: nowrap;
        }

        /* Left contact */
        .tb-left {
          display: flex;
          align-items: center;
          gap: clamp(10px, 2vw, 24px);
          flex-shrink: 1;
          min-width: 0;
          overflow: hidden;
        }
        .tb-link {
          display: flex; align-items: center; gap: 6px;
          text-decoration: none; color: #e2e8f0;
          font-size: clamp(11px, 1.1vw, 13px);
          font-weight: 500; white-space: nowrap;
          transition: color .2s;
          min-width: 0;
        }
        .tb-link:hover { color: #f4a023; }
        .tb-email { display: flex; }
        @media(max-width: 520px) { .tb-email { display: none; } }

        /* Right social + quick links */
        .tb-right {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        /* Social icons */
        .tb-soc {
          width: clamp(24px, 2.8vw, 29px);
          height: clamp(24px, 2.8vw, 29px);
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: #fff;
          text-decoration: none; flex-shrink: 0;
          transition: all .25s;
        }
        .tb-soc:hover { background: #f4a023; color: #0f2347; transform: translateY(-2px); }
        .tb-soc.wa:hover  { background: #25D366; color: #fff; }
        .tb-soc.fb:hover  { background: #1877F2; color: #fff; }
        .tb-soc.yt:hover  { background: #FF0000; color: #fff; }
        .tb-soc.li:hover  { background: #0A66C2; color: #fff; }

        /* Quick link buttons */
        .tb-qbtn {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 10.5px; font-weight: 800;
          padding: 3px 9px; border-radius: 5px;
          text-decoration: none; white-space: nowrap;
          border: 1px solid; flex-shrink: 0;
          transition: all .18s;
        }
        .tb-res { background:rgba(244,160,35,.12); border-color:rgba(244,160,35,.4); color:#f4a023; }
        .tb-res:hover { background:#f4a023; color:#0f2347; }
        .tb-fee { background:rgba(16,185,129,.12); border-color:rgba(16,185,129,.4); color:#10b981; }
        .tb-fee:hover { background:#10b981; color:#fff; }
        .tb-adm { background:rgba(99,102,241,.12); border-color:rgba(99,102,241,.4); color:#818cf8; }
        .tb-adm:hover { background:#6366f1; color:#fff; }

        /* Hide quick links on small screens */
        .tb-qlinks { display: flex; align-items: center; gap: 5px; }
        @media(max-width: 900px) { .tb-adm   { display: none; } }
        @media(max-width: 720px) { .tb-fee   { display: none; } }
        @media(max-width: 580px) { .tb-qlinks { display: none; } }

        /* Divider */
        .tb-div {
          width: 1px; height: 16px;
          background: rgba(255,255,255,.15);
          flex-shrink: 0;
        }
        @media(max-width: 580px) { .tb-div { display: none; } }
      `}</style>

      <div className="tb-wrap">
        {/* ── Left: Phone + Email ── */}
        <div className="tb-left">
          <a href="tel:+917903340991" className="tb-link">
            <span style={{ color: COLORS.gold, fontSize: 13 }}>📞</span>
            <span>+91-7903340991</span>
          </a>
          <a href="mailto:principal@gncollege.org" className="tb-link tb-email">
            <span style={{ color: COLORS.gold, fontSize: 13 }}>✉️</span>
            <span>principal@gncollege.org</span>
          </a>
        </div>

        {/* ── Right: Quick Links + Divider + Social ── */}
        <div className="tb-right">

          {/* Quick links */}
          <div className="tb-qlinks">
            <a href="https://bbmkuniv.in/login"
               target="_blank" rel="noopener noreferrer"
               className="tb-qbtn tb-res">
              📋 Results
            </a>
            <a href="https://cimsstudentnewui.mastersofterp.in/"
               target="_blank" rel="noopener noreferrer"
               className="tb-qbtn tb-fee">
              💳 Fee Paymnet
            </a>
            <a href="https://jharkhanduniversities.nic.in/"
               target="_blank" rel="noopener noreferrer"
               className="tb-qbtn tb-adm">
              🎓 Apply Online
            </a>
          </div>

          <div className="tb-div" />

          {/* Social icons */}
          {SOCIAL_LINKS.map(s => {
            let icon = s.label;
            let cls  = '';
            if (s.id === 'twitter')  { icon = '𝕏'; }
            if (s.id === 'youtube')  { icon = '▶'; cls = 'yt'; }
            if (s.id === 'facebook') { cls = 'fb'; }
            if (s.id === 'linkedin') { cls = 'li'; }
            return (
              <a key={s.id} href={s.href}
                 target="_blank" rel="noopener noreferrer"
                 className={`tb-soc ${cls}`}
                 aria-label={s.id}>
                {icon}
              </a>
            );
          })}
          <a href={whatsappLink.href}
             target="_blank" rel="noopener noreferrer"
             className="tb-soc wa"
             aria-label="whatsapp">
            W
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;