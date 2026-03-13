// src/pages/HomePage.jsx
// GNC College — Premium Homepage with Scroll Animations
// Animations: IntersectionObserver only — zero scroll listeners, GPU transforms

import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Link }         from 'react-router-dom';
import { createPortal } from 'react-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db }           from '../firebase';
import { COLORS }       from '../styles/colors';
import { SOCIAL_LINKS } from '../data/db';

import HeroSlider          from '../components/HeroSlider';
import PremiumTicker       from '../components/PremiumTicker';
import HomeFeatures        from '../components/HomeFeatures';
import SectionTitle        from '../components/home/SectionTitle';
import NotificationSection from '../components/home/NotificationSection';
import PlacementsSection   from '../components/home/PlacementsSection';

// ── Theme ──────────────────────────────────────────────────────────────────────
const N  = COLORS.navy     || '#0f2347';
const G  = COLORS.gold     || '#f4a023';
const ND = COLORS.navyDark || '#060e1c';

const getEmbedUrl = (url = '') => {
  if (url.includes('drive.google.com/file/d/'))
    return `https://drive.google.com/file/d/${url.split('/d/')[1].split('/')[0]}/preview`;
  return url;
};
const getEventImg = t => ({ SEMINAR:'/images/slider_seminar.jpg', WORKSHOP:'/images/slider_ncc.jpg', SPORTS:'/images/slider_cricket.jpg', CULTURAL:'/images/slider_baisakhi.jpg' }[t] || '/images/college_photo.jpg');

const TICKER_ITEMS = [
  { text:'B.A./B.Com. Semester 1 Admissions are now open for 2024-25 session.', link:'/admission/info' },
  { text:'Results for the Semester 6 internal examinations have been published.', link:'/results' },
  { text:'The college will remain closed on account of Holi from 24th to 26th March.', link:'#' },
];
const GALLERY_TABS  = ['All Moments','Seminars','Cultural Fest','Guest Visit','Campus','Departments','NSS Programs'];
const LINKS_DATA    = [
  { name:'NAAC',       url:'https://naac.gov.in',     icon:'🏅' },
  { name:'UGC',        url:'https://ugc.ac.in',       icon:'📜' },
  { name:'INFLIBNET',  url:'https://inflibnet.ac.in', icon:'📚' },
  { name:'NDL INDIA',  url:'https://ndl.gov.in',      icon:'🔬' },
  { name:'SWAYAM',     url:'https://swayam.gov.in',   icon:'🌐' },
  { name:'BBMK UNIV.', url:'https://bbmku.ac.in',     icon:'🏛️' },
];
const COUNTERS = [
  { label:'Students Enrolled', value:'4,000+', icon:'👨‍🎓' },
  { label:'Successful Alumni',  value:'45,000+',icon:'🎓'  },
  { label:'Expert Faculty',     value:'50+',    icon:'👨‍🏫' },
  { label:'Years of Legacy',    value:'56',     icon:'🏛️'  },
];
const ABOUT_FEATS = [
  { icon:'🛡️', title:'NAAC Accredited', desc:'Grade B Institution'   },
  { icon:'👨‍🏫', title:'Expert Faculty',  desc:'Highly Experienced'    },
  { icon:'🔬', title:'Modern Labs',      desc:'Tech-enabled Learning' },
  { icon:'🏅', title:'NSS & NCC',        desc:'Character Building'    },
];

// ── SCROLL ANIMATION HOOK ──────────────────────────────────────────────────────
// Uses IntersectionObserver — no scroll listeners, no layout thrashing
// Only animates opacity + transform (GPU composited, zero repaint)
function useScrollAnim(options = {}) {
  const { threshold = 0.12, rootMargin = '0px 0px -60px 0px' } = options;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Respect user's motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.unobserve(el); // fire once, then stop watching
      }
    }, { threshold, rootMargin });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}

// ── ANIMATION CSS ──────────────────────────────────────────────────────────────
// All transitions use only opacity + transform — never width/height/top/margin
// This ensures the browser uses the compositor thread (zero main-thread jank)
const ANIM_CSS = `
  /* Base hidden state — rendered but invisible */
  .sa { opacity: 0; will-change: opacity, transform; }
  .sa.visible { will-change: auto; } /* release after animation */

  /* Transition curves */
  .sa { transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1); }

  /* Variants — initial state */
  .sa-up    { transform: translateY(38px); }
  .sa-down  { transform: translateY(-28px); }
  .sa-left  { transform: translateX(-40px); }
  .sa-right { transform: translateX(40px); }
  .sa-scale { transform: scale(.93); }
  .sa-fade  { transform: none; }
  .sa-rise  { transform: translateY(22px) scale(.97); }

  /* Visible state — all variants reset to natural */
  .sa.visible { opacity: 1; transform: none; }

  /* Delay helpers (stagger children) */
  .sa-d1 { transition-delay: .08s; }
  .sa-d2 { transition-delay: .16s; }
  .sa-d3 { transition-delay: .24s; }
  .sa-d4 { transition-delay: .32s; }
  .sa-d5 { transition-delay: .40s; }
  .sa-d6 { transition-delay: .48s; }

  /* Slower for big hero-like elements */
  .sa-slow { transition-duration: .9s; }

  /* @media: reduce delays on mobile to feel snappier */
  @media (max-width: 600px) {
    .sa { transition-duration: .45s; }
    .sa-d1,.sa-d2,.sa-d3,.sa-d4,.sa-d5,.sa-d6 { transition-delay: 0s; }
    .sa-up,.sa-down { transform: translateY(22px); }
    .sa-left,.sa-right { transform: translateX(22px); }
  }
`;

// ── Animated wrapper component ─────────────────────────────────────────────────
// Lightweight — just a div with IntersectionObserver ref
const SA = ({ children, variant = 'up', delay = '', slow = false, className = '', style = {}, tag: Tag = 'div' }) => {
  const [ref, vis] = useScrollAnim();
  return (
    <Tag
      ref={ref}
      className={`sa sa-${variant}${slow ? ' sa-slow' : ''}${delay ? ` sa-${delay}` : ''}${vis ? ' visible' : ''}${className ? ' ' + className : ''}`}
      style={style}
    >
      {children}
    </Tag>
  );
};

// ── Global page CSS ────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap&subset=latin');
  *,*::before,*::after{box-sizing:border-box;}

  .hp-watermark{position:fixed;inset:0;background-image:url(${import.meta.env.BASE_URL}images/logo.png);background-repeat:repeat;background-size:320px;opacity:.025;z-index:-1;background-color:#f4f7f9;pointer-events:none;}

  /* quick pills */
  .hp-quick{background:#fff;border-top:1px solid #edf2f7;border-bottom:1px solid #edf2f7;padding:16px 20px;}
  .hp-quick-inner{max-width:1280px;margin:0 auto;display:flex;gap:12px;flex-wrap:wrap;justify-content:center;}
  .hp-pill{display:inline-flex;align-items:center;gap:8px;padding:11px 26px;border-radius:50px;font-size:14px;font-weight:700;text-decoration:none;transition:transform .22s,box-shadow .22s;font-family:'Inter',sans-serif;}
  .hp-pill:hover{transform:translateY(-3px);}

  /* about */
  .hp-about{background:#fff;padding:clamp(60px,8vw,100px) 20px;overflow:hidden;}
  .hp-about-inner{max-width:1250px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:56px;align-items:center;}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
  .hp-imgstack{position:relative;width:100%;height:420px;}
  .hp-img-main{width:90%;height:100%;object-fit:cover;border-radius:20px;box-shadow:20px 20px 0 ${G};position:relative;z-index:2;transition:transform .5s;}
  .hp-imgstack:hover .hp-img-main{transform:scale(1.02);}
  .hp-img-accent{position:absolute;bottom:-28px;right:0;background:${N};color:#fff;padding:22px 26px;border-radius:14px;z-index:3;box-shadow:0 10px 30px rgba(0,0,0,.2);animation:float 3s ease-in-out infinite;}
  .hp-at{font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,38px);font-weight:800;color:${N};line-height:1.2;margin-bottom:8px;}
  .hp-at span{color:${G};}
  .hp-asub{color:${G};font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:22px;font-size:13px;}
  .hp-adesc{color:#555;line-height:1.8;font-size:15.5px;margin-bottom:28px;font-family:'Inter',sans-serif;}
  .hp-afeat-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:32px;}
  .hp-afeat{display:flex;gap:11px;align-items:flex-start;}
  .hp-afeat-t{font-weight:800;font-size:13.5px;color:${N};}
  .hp-afeat-d{font-size:12px;color:#888;}
  .hp-disc{background:${N};color:#fff;padding:14px 32px;border:none;border-radius:50px;font-weight:700;cursor:pointer;text-decoration:none;display:inline-block;font-size:14px;transition:background .3s,box-shadow .3s,transform .2s;box-shadow:0 5px 18px rgba(15,35,71,.25);}
  .hp-disc:hover{background:${G};color:${N};transform:translateY(-2px);box-shadow:0 8px 24px rgba(244,160,35,.35);}
  .hp-soc{width:38px;height:38px;border-radius:50%;background:#f0f2f5;display:flex;align-items:center;justify-content:center;color:${N};font-size:17px;text-decoration:none;transition:background .3s,transform .3s;}
  .hp-soc:hover{background:${N};color:${G};transform:rotate(360deg);}

  /* section divider */
  .hp-sec-divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(15,35,71,.08),transparent);margin:0;}

  /* events */
  .hp-events{padding:clamp(60px,8vw,80px) 20px;background:#f8fafc;}
  .hp-ev-inner{max-width:1400px;margin:0 auto;}
  @keyframes hp-ev-scroll{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
  .hp-ev-scroller{overflow:hidden;padding:20px 0;margin-top:28px;mask:linear-gradient(90deg,transparent,#fff 5%,#fff 95%,transparent);-webkit-mask:linear-gradient(90deg,transparent,#fff 5%,#fff 95%,transparent);}
  .hp-ev-track{display:flex;width:max-content;gap:28px;animation:hp-ev-scroll 36s linear infinite;will-change:transform;}
  .hp-ev-track:hover{animation-play-state:paused;}
  .hp-ev-card{width:310px;flex-shrink:0;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.07);border:1px solid #edf2f7;transition:transform .35s,box-shadow .35s,border-color .35s;display:flex;flex-direction:column;}
  .hp-ev-card:hover{transform:translateY(-10px) scale(1.02);box-shadow:0 20px 40px rgba(15,35,71,.14);border-color:${G};}
  .hp-ev-imgbox{position:relative;height:190px;overflow:hidden;}
  .hp-ev-img{width:100%;height:100%;object-fit:cover;transition:transform .55s;}
  .hp-ev-card:hover .hp-ev-img{transform:scale(1.08);}
  .hp-ev-bdg{position:absolute;top:14px;right:14px;background:${G};color:#000;padding:4px 11px;font-size:9.5px;font-weight:800;border-radius:50px;text-transform:uppercase;z-index:2;letter-spacing:.5px;}
  .hp-ev-dt{position:absolute;bottom:0;left:0;background:${N};color:#fff;padding:8px 14px;border-top-right-radius:12px;z-index:2;}
  .hp-ev-info{padding:20px;flex:1;display:flex;flex-direction:column;}
  .hp-ev-title{font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:800;color:${N};margin:0 0 9px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .hp-ev-desc{font-size:13px;color:#64748b;line-height:1.6;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
  .hp-ev-foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #f1f5f9;padding-top:12px;margin-top:14px;}
  .hp-ev-loc{font-size:11px;color:#94a3b8;font-weight:600;}
  .hp-ev-more{background:none;border:none;font-size:11px;color:${G};font-weight:800;cursor:pointer;transition:color .2s;padding:0;display:flex;align-items:center;gap:5px;}
  .hp-ev-more:hover{color:${N};}
  .hp-pdf-bdg{background:#fee2e2;color:#b91c1c;padding:2px 7px;border-radius:4px;font-size:9px;font-weight:800;}
  .hp-ev-empty{text-align:center;background:#f8fafc;padding:40px;border-radius:12px;border:1px solid #e2e8f0;margin-top:28px;}

  /* counters */
  .hp-cnt{background:linear-gradient(135deg,#f0f4ff 0%,#e8eef8 100%);padding:clamp(60px,8vw,80px) 20px;position:relative;overflow:hidden;border-top:1px solid #dde8f5;border-bottom:1px solid #dde8f5;}
  .hp-cnt-bg{position:absolute;inset:0;opacity:.4;pointer-events:none;background-image:radial-gradient(${N}18 1px,transparent 1px);background-size:30px 30px;}
  .hp-cnt-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:36px;text-align:center;position:relative;z-index:2;}
  .hp-cnt-box{padding:28px 18px;transition:transform .35s,box-shadow .35s;border-radius:16px;cursor:default;background:#fff;border:1.5px solid #dde8f5;box-shadow:0 4px 16px rgba(15,35,71,.06);}
  .hp-cnt-box:hover{transform:translateY(-8px);box-shadow:0 16px 36px rgba(15,35,71,.12);border-color:${G};}
  .hp-cnt-icon{font-size:42px;margin-bottom:14px;display:inline-block;transition:transform .35s;}
  .hp-cnt-box:hover .hp-cnt-icon{transform:scale(1.18) rotate(8deg);}
  .hp-cnt-num{font-family:'Space Grotesk',sans-serif;font-size:40px;font-weight:800;color:${N};line-height:1;margin-bottom:8px;}
  .hp-cnt-lbl{font-size:12.5px;color:#64748b;font-weight:700;letter-spacing:1px;text-transform:uppercase;}

  /* links */
  .hp-links{padding:clamp(60px,8vw,80px) 20px;background:#fff;}
  .hp-links-inner{max-width:1200px;margin:0 auto;}
  .hp-links-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:18px;margin-top:38px;}
  .hp-link-tile{background:#fff;border:1.5px solid #edf2f7;border-radius:12px;padding:24px 14px;text-align:center;text-decoration:none;transition:transform .3s,border-color .3s,box-shadow .3s,background .3s;display:flex;flex-direction:column;align-items:center;gap:10px;box-shadow:0 2px 8px rgba(0,0,0,.04);}
  .hp-link-tile:hover{transform:translateY(-7px) scale(1.03);border-color:${G};box-shadow:0 12px 28px rgba(15,35,71,.1);background:#fff;}
  .hp-link-icon{width:56px;height:56px;background:#f1f5f9;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;transition:background .3s,transform .3s;}
  .hp-link-tile:hover .hp-link-icon{background:${N};transform:rotate(15deg);}
  .hp-link-name{font-size:12.5px;font-weight:800;color:${N};letter-spacing:.4px;}

  /* gallery */
  .hp-gal{padding:clamp(70px,9vw,100px) 20px;background:#fff;}
  .hp-gal-inner{max-width:1300px;margin:0 auto;}
  .hp-gal-filters{display:flex;justify-content:center;gap:10px;margin-bottom:44px;flex-wrap:wrap;}
  .hp-filter{padding:9px 22px;border-radius:50px;border:2px solid #edf2f7;background:#fff;color:${N};font-weight:700;font-size:13px;cursor:pointer;transition:background .25s,color .25s,border-color .25s,transform .25s,box-shadow .25s;}
  .hp-filter:hover,.hp-filter.active{background:${N};color:#fff;border-color:${N};transform:translateY(-2px);box-shadow:0 5px 14px rgba(15,35,71,.2);}
  .hp-gal-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;}
  .hp-gal-item{position:relative;border-radius:14px;overflow:hidden;aspect-ratio:4/3;box-shadow:0 4px 14px rgba(0,0,0,.06);cursor:pointer;}
  .hp-gal-img{width:100%;height:100%;object-fit:cover;transition:transform .55s;}
  .hp-gal-item:hover .hp-gal-img{transform:scale(1.1);}
  .hp-gal-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(15,35,71,.88),transparent);opacity:0;transition:opacity .35s;display:flex;flex-direction:column;justify-content:flex-end;padding:18px;}
  .hp-gal-item:hover .hp-gal-ov{opacity:1;}
  .hp-gal-cat{color:${G};font-size:10px;font-weight:800;letter-spacing:.5px;transform:translateY(8px);opacity:0;transition:all .35s .05s;}
  .hp-gal-ttl{color:#fff;font-size:13.5px;font-weight:700;margin-top:4px;transform:translateY(8px);opacity:0;transition:all .35s .12s;}
  .hp-gal-item:hover .hp-gal-cat,.hp-gal-item:hover .hp-gal-ttl{transform:translateY(0);opacity:1;}
  .hp-gal-empty{grid-column:1/-1;text-align:center;background:#f8fafc;padding:48px 20px;border-radius:16px;border:1px dashed #cbd5e1;}

  /* youtube */
  .hp-yt{padding:clamp(60px,8vw,80px) 20px;background:#f8fafc;text-align:center;}
  .hp-yt-inner{max-width:1200px;margin:0 auto;}
  .hp-yt-h{font-family:'Space Grotesk',sans-serif;font-size:clamp(24px,3.5vw,36px);font-weight:800;color:${N};margin-bottom:10px;}
  .hp-yt-h span{color:${G};}
  .hp-yt-sub{color:#64748b;font-size:14px;margin-bottom:38px;}
  .hp-yt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;}
  .hp-yt-frame{border-radius:16px;border:none;box-shadow:0 10px 32px rgba(0,0,0,.1);width:100%;height:220px;}
  .hp-yt-ph{background:#fff;border:1.5px solid #e2e8f0;border-radius:16px;height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;}
  .hp-yt-ph-icon{font-size:34px;opacity:.35;}
  .hp-yt-ph-txt{color:#94a3b8;font-size:13px;}

  /* modal */
  .hp-modal-ov{position:fixed;inset:0;z-index:9999999;background:rgba(15,35,71,.95);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;}
  .hp-modal-box{background:#fff;width:90%;max-width:1000px;height:85vh;border-radius:20px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 30px 60px rgba(0,0,0,.5);}
  .hp-modal-head{padding:14px 22px;background:${N};color:#fff;display:flex;justify-content:space-between;align-items:center;font-family:'Inter',sans-serif;font-weight:800;}
  .hp-modal-close{background:rgba(255,255,255,.15);border:none;color:#fff;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:background .2s;}
  .hp-modal-close:hover{background:#e53e3e;}

  /* responsive */
  @media(max-width:768px){
    .hp-imgstack{height:300px;} .hp-img-accent{display:none;} .hp-afeat-grid{grid-template-columns:1fr;}
    .hp-cnt-grid{grid-template-columns:1fr 1fr;} .hp-links-grid{grid-template-columns:repeat(3,1fr);}
  }
  @media(max-width:480px){
    .hp-about-inner{grid-template-columns:1fr;} .hp-imgstack{height:240px;}
    .hp-cnt-grid{grid-template-columns:1fr 1fr;gap:18px;} .hp-cnt-num{font-size:30px;}
    .hp-links-grid{grid-template-columns:repeat(2,1fr);} .hp-gal-grid{grid-template-columns:1fr;}
    .hp-yt-grid{grid-template-columns:1fr;}
  }
`;

// ── Sub-components ─────────────────────────────────────────────────────────────
const EventCard = memo(({ ev, onPdf }) => (
  <div className="hp-ev-card">
    <div className="hp-ev-imgbox">
      <div className="hp-ev-bdg">{ev.type}</div>
      <div className="hp-ev-dt">
        <div style={{ fontSize:18, fontWeight:900, lineHeight:1 }}>{ev.day||'--'}</div>
        <div style={{ fontSize:10, fontWeight:700 }}>{ev.month||'---'}</div>
      </div>
      <img src={ev.imageUrl||getEventImg(ev.type)} alt={ev.title} className="hp-ev-img" loading="lazy" decoding="async" />
    </div>
    <div className="hp-ev-info">
      <h3 className="hp-ev-title">{ev.title}</h3>
      <div className="hp-ev-desc" dangerouslySetInnerHTML={{ __html: ev.desc }} />
      <div className="hp-ev-foot">
        <span className="hp-ev-loc">📍 {ev.location||'Campus'}</span>
        <button className="hp-ev-more" onClick={() => onPdf(ev)}>
          {ev.reportLink ? <><span className="hp-pdf-bdg">PDF</span> READ REPORT →</> : 'READ MORE →'}
        </button>
      </div>
    </div>
  </div>
));

const GalItem = memo(({ img, index }) => {
  const [ref, vis] = useScrollAnim({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  const delay = (index % 6) * 0.07;
  return (
    <div
      ref={ref}
      className={`hp-gal-item sa sa-scale${vis ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <img src={img.src} alt={img.title} className="hp-gal-img" loading="lazy" decoding="async" />
      <div className="hp-gal-ov">
        <div className="hp-gal-cat">{img.cat}</div>
        <div className="hp-gal-ttl">{img.title}</div>
      </div>
    </div>
  );
});

// ── YouTube Section ────────────────────────────────────────────────────────────
function YouTubeSection() {
  const [ytData, setYt] = useState(null);
  const [ready, setR]   = useState(false);
  useEffect(() => {
    return onSnapshot(doc(db, 'settings', 'youtube'), s => {
      setYt(s.exists() ? s.data() : null); setR(true);
    }, () => setR(true));
  }, []);
  if (!ready) return null;
  const videos  = ytData?.videoIds ? ytData.videoIds.split(/[\n,]/).map(s=>s.trim()).filter(Boolean).slice(0,3) : [];
  const channel = ytData?.channelName || 'GNC College Official';
  return (
    <section className="hp-yt">
      <div className="hp-yt-inner">
        <SA variant="up"><h2 className="hp-yt-h">🎬 Campus <span>Video Highlights</span></h2></SA>
        <SA variant="fade" delay="d1"><p className="hp-yt-sub">Official {channel} channel se latest videos</p></SA>
        <div className="hp-yt-grid">
          {videos.length > 0
            ? videos.map((vid, i) => (
                <SA key={vid} variant="up" delay={`d${i+1}`}>
                  <iframe className="hp-yt-frame" src={`https://www.youtube.com/embed/${vid}`} allowFullScreen title={vid} loading="lazy" />
                </SA>
              ))
            : [1,2,3].map(i => (
                <SA key={i} variant="up" delay={`d${i}`}>
                  <div className="hp-yt-ph">
                    <div className="hp-yt-ph-icon">▶️</div>
                    <div className="hp-yt-ph-txt">Admin Panel → Settings → YouTube<br/>mein Video IDs add karein</div>
                  </div>
                </SA>
              ))
          }
        </div>
      </div>
    </section>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
const HomePage = ({ notices, announcements, pdfReports, sliderSlides, events, gallery }) => {
  const [tab, setTab] = useState('All Moments');
  const [pdf, setPdf] = useState(null);

  const allGal   = gallery || [];
  const filtered = tab === 'All Moments' ? allGal : allGal.filter(i => i.cat === tab);
  const recentEv = (events || []).filter(e => e.status === 'recent');
  const upcomEv  = (events || []).filter(e => e.status === 'upcoming');
  const evTriple = [...recentEv, ...recentEv, ...recentEv];

  const handlePdf = useCallback(ev => {
    if (ev.reportLink) setPdf(getEmbedUrl(ev.reportLink));
    else alert('Full details coming soon!');
  }, []);

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", background:'#f8fafc', minHeight:'100vh', overflowX:'hidden' }}>
      <style>{ANIM_CSS + CSS}</style>
      <div className="hp-watermark" />

      {/* ── HERO (no animation — above the fold) ── */}
      <HeroSlider slides={sliderSlides} />
      <PremiumTicker items={TICKER_ITEMS} />
      <NotificationSection notices={notices} announcements={announcements} pdfReports={pdfReports} upcomingEvents={upcomEv} />

      {/* ── QUICK PILLS ── animate as a row sliding up */}
      <div className="hp-quick">
        <SA variant="up" className="hp-quick-inner" tag="div">
          {[
            { to:'/notifications', icon:'📢', label:'All Notices & News', bg:N,        shadow:`${N}33`    },
            { to:'/documents',     icon:'📁', label:'All Documents',      bg:'#16213e', shadow:'#16213e33' },
          ].map((b, i) => (
            <Link key={b.to} to={b.to} className={`hp-pill sa sa-up sa-d${i+1} visible`}
              style={{ background:b.bg, color:'#fff', boxShadow:`0 4px 14px ${b.shadow}` }}
              onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
            >
              <span style={{ fontSize:17 }}>{b.icon}</span>{b.label}
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          ))}
        </SA>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="hp-about">
        <div className="hp-about-inner">
          {/* Image — slides from left */}
          <SA variant="left" slow>
            <div className="hp-imgstack">
              <img src={`${import.meta.env.BASE_URL}images/college_photo.jpg`} alt="Guru Nanak College" className="hp-img-main" loading="lazy" decoding="async" />
              <div className="hp-img-accent">
                <div style={{ fontSize:30, fontWeight:900, color:G, lineHeight:1 }}>56+</div>
                <div style={{ fontSize:11, opacity:.8, letterSpacing:1 }}>YEARS OF EXCELLENCE</div>
              </div>
            </div>
          </SA>

          {/* Text — slides from right, staggered children */}
          <SA variant="right" slow>
            <h2 className="hp-at">About the <span>College</span></h2>
            <div className="hp-asub">Established 1970</div>
            <p className="hp-adesc">
              Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was established by the
              Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great
              Guru. We draw inspiration from the teachings of Guru Nanak Devji, fostering an
              environment of academic progress and individual development.
            </p>
            <div className="hp-afeat-grid">
              {ABOUT_FEATS.map(f => (
                <div key={f.title} className="hp-afeat">
                  <span style={{ fontSize:19, marginTop:2 }}>{f.icon}</span>
                  <div><div className="hp-afeat-t">{f.title}</div><div className="hp-afeat-d">{f.desc}</div></div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:22, flexWrap:'wrap' }}>
              <Link to="/about-us/college-profile" className="hp-disc">DISCOVER MORE →</Link>
              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                <span style={{ fontSize:12, fontWeight:700, color:'#888' }}>FOLLOW US:</span>
                {SOCIAL_LINKS.map(s => (
                  <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" className="hp-soc">
                    {s.id==='twitter'?'𝕏':s.id==='youtube'?'▶':s.label.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </SA>
        </div>
      </section>

      <div className="hp-sec-divider" />
      <HomeFeatures />
      <div className="hp-sec-divider" />

      {/* ── EVENTS ── */}
      <section id="events" className="hp-events">
        <div className="hp-ev-inner">
          <SA variant="up"><SectionTitle title="Recent Events & Happenings" subtitle="Seminars, workshops aur campus activities ki ek jhalak" /></SA>

          {recentEv.length > 0 ? (
            <SA variant="fade" delay="d1">
              <div className="hp-ev-scroller">
                <div className="hp-ev-track">
                  {evTriple.map((ev, i) => <EventCard key={`${ev.id||i}-${i}`} ev={ev} onPdf={handlePdf} />)}
                </div>
              </div>
            </SA>
          ) : (
            <SA variant="scale">
              <div className="hp-ev-empty">
                <div style={{ fontSize:38, marginBottom:10 }}>📅</div>
                <h3 style={{ color:N, margin:'0 0 8px' }}>No Recent Events</h3>
                <p style={{ color:'#64748b', fontSize:13 }}>Admin Panel → Events se data add karein</p>
              </div>
            </SA>
          )}

          <SA variant="right" delay="d2" style={{ display:'flex', justifyContent:'flex-end', marginTop:24 }}>
            <Link to="/events" style={{ display:'inline-flex', alignItems:'center', gap:8, background:`linear-gradient(135deg,${G},#a07010)`, color:N, padding:'12px 28px', borderRadius:50, fontSize:14, fontWeight:900, textDecoration:'none', boxShadow:`0 4px 18px ${G}55` }}>
              🏆 View All Events
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </SA>
        </div>
      </section>

      {/* ── ALUMNI WALL — PlacementsSection has its own animation system internally ── */}
      <PlacementsSection />

      {/* ── COUNTERS — each box rises up with stagger ── */}
      <section className="hp-cnt">
        <div className="hp-cnt-bg" />
        <div className="hp-cnt-grid">
          {COUNTERS.map((c, i) => (
            <SA key={c.label} variant="rise" delay={`d${i+1}`}>
              <div className="hp-cnt-box">
                <div className="hp-cnt-icon">{c.icon}</div>
                <div className="hp-cnt-num">{c.value}</div>
                <div className="hp-cnt-lbl">{c.label}</div>
              </div>
            </SA>
          ))}
        </div>
      </section>

      {/* ── LINKS — alternating left/right per row ── */}
      <section className="hp-links">
        <div className="hp-links-inner">
          <SA variant="up"><SectionTitle title="Important External Links" subtitle="Official education and government portals ka quick access" /></SA>
          <div className="hp-links-grid">
            {LINKS_DATA.map((l, i) => (
              <SA key={l.name} variant="scale" delay={`d${(i % 4) + 1}`}>
                <a href={l.url} target="_blank" rel="noopener noreferrer" className="hp-link-tile">
                  <div className="hp-link-icon">{l.icon}</div>
                  <div className="hp-link-name">{l.name}</div>
                </a>
              </SA>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="hp-gal">
        <div className="hp-gal-inner">
          <SA variant="up"><SectionTitle title="📸 Photo Gallery" subtitle="Academic excellence aur cultural heritage ki yadgar jhalak" /></SA>
          <SA variant="fade" delay="d1">
            <div className="hp-gal-filters">
              {GALLERY_TABS.map(t => (
                <button key={t} className={`hp-filter ${tab===t?'active':''}`} onClick={() => setTab(t)}>{t}</button>
              ))}
            </div>
          </SA>
          <div className="hp-gal-grid">
            {filtered.length > 0
              ? filtered.map((img, i) => <GalItem key={i} img={img} index={i} />)
              : (
                <SA variant="scale" className="hp-gal-empty">
                  <div style={{ fontSize:32, marginBottom:10 }}>📸</div>
                  <h3 style={{ color:N, margin:'0 0 6px' }}>Gallery Empty</h3>
                  <p style={{ color:'#64748b', fontSize:13 }}>Admin Panel → Gallery se photos upload karein</p>
                </SA>
              )
            }
          </div>
        </div>
      </section>

      {/* ── YOUTUBE ── */}
      <YouTubeSection />

      {/* ── PDF MODAL ── */}
      {pdf && createPortal(
        <div className="hp-modal-ov" onClick={() => setPdf(null)}>
          <div className="hp-modal-box" onClick={e => e.stopPropagation()}>
            <div className="hp-modal-head">
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:20 }}>📄</span> Official Event Report
              </div>
              <button className="hp-modal-close" onClick={() => setPdf(null)}>✕</button>
            </div>
            <div style={{ flex:1, background:'#f1f5f9' }}>
              <iframe src={pdf} title="Event PDF" width="100%" height="100%" style={{ border:'none' }} allow="autoplay" />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default HomePage;