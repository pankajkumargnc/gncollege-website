// src/pages/NotFoundPage.jsx — 404 Page
// 🎨 @UI_Agent — Premium 404 error page with college branding

import { Link } from 'react-router-dom';
import { COLORS } from '../styles/colors';

const CSS = `
.nf-wrap{min-height:80vh;display:flex;align-items:center;justify-content:center;padding:40px 20px;background:linear-gradient(135deg,#f8fafc 0%,#eef2f8 100%);}
.nf-card{text-align:center;max-width:520px;padding:clamp(32px,5vw,56px);background:#fff;border-radius:28px;box-shadow:0 20px 50px rgba(15,35,71,.08);border:1.5px solid #edf2f7;}
.nf-code{font-size:clamp(80px,15vw,140px);font-weight:900;line-height:1;color:${COLORS.navy};opacity:.1;font-family:'Space Grotesk',sans-serif;margin-bottom:-20px;}
.nf-emoji{font-size:clamp(48px,8vw,72px);margin-bottom:16px;display:block;}
.nf-title{font-size:clamp(20px,3vw,28px);font-weight:800;color:${COLORS.navy};margin-bottom:12px;font-family:'Space Grotesk',sans-serif;}
.nf-desc{color:#64748b;font-size:clamp(13px,1vw,15px);line-height:1.7;margin-bottom:28px;}
.nf-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.nf-btn{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:50px;font-weight:800;font-size:14px;text-decoration:none;transition:all .25s;cursor:pointer;border:none;font-family:'Inter',sans-serif;}
.nf-btn-primary{background:${COLORS.navy};color:#fff;box-shadow:0 5px 18px rgba(15,35,71,.25);}
.nf-btn-primary:hover{background:${COLORS.gold};color:${COLORS.navy};transform:translateY(-2px);box-shadow:0 8px 24px rgba(244,160,35,.35);}
.nf-btn-secondary{background:#f1f5f9;color:${COLORS.navy};}
.nf-btn-secondary:hover{background:#e2e8f0;transform:translateY(-2px);}
`;

export default function NotFoundPage() {
  return (
    <>
      <style>{CSS}</style>
      <div className="nf-wrap">
        <div className="nf-card page-transition">
          <div className="nf-code">404</div>
          <span className="nf-emoji">🔍</span>
          <h1 className="nf-title">Page Not Found</h1>
          <p className="nf-desc">
            Yeh page exist nahi karta ya delete ho chuka hai.<br />
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="nf-actions">
            <Link to="/" className="nf-btn nf-btn-primary">
              🏠 Go Home
            </Link>
            <Link to="/contact" className="nf-btn nf-btn-secondary">
              📞 Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
