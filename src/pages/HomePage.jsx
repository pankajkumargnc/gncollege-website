// src/pages/HomePage.jsx
import { useState, useEffect, useCallback, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { COLORS } from "../styles/colors";
import { SOCIAL_LINKS } from "../data/db";
import { useDriveDocs } from "../hooks/useDriveDocs";


import HeroSlider from "../components/HeroSlider";
import HomeFeatures from "../components/HomeFeatures";
import NotificationSection from "../components/home/NotificationSection";
import PlacementsSection from "../components/home/PlacementsSection";
import Ticker from "../components/Ticker";
import PremiumTicker from "../components/PremiumTicker";
import PDFModal from "../components/PDFModal";

const N = COLORS.navy || "#0f2347";
const G = COLORS.gold || "#f4a023";

// Fallback image path resolving
const getEventImg = (t) => {
  const base = import.meta.env.BASE_URL;
  const paths = {
    SEMINAR: `${base}images/slider_seminar.webp`,
    WORKSHOP: `${base}images/slider_ncc.webp`,
    SPORTS: `${base}images/slider_cricket.webp`,
    CULTURAL: `${base}images/slider_baisakhi.webp`,
  };
  return paths[t?.toUpperCase()] || `${base}images/college_photo.webp`;
};

const TICKER_ITEMS = [
  {
    text: "Welcome to Guru Nanak College, Dhanbad — A Sikh Minority Degree College.",
    link: "/about-us/college-profile",
  },
];
const GALLERY_TABS = [
  "All Moments",
  "Seminars",
  "Cultural Fest",
  "Guest Visit",
  "Campus",
  "Departments",
  "NSS Programs",
];
const LINKS_DATA = [
  { name: "NAAC", url: "https://naac.gov.in", icon: "🏅" },
  { name: "UGC", url: "https://ugc.ac.in", icon: "📜" },
  { name: "INFLIBNET", url: "https://inflibnet.ac.in", icon: "📚" },
  { name: "NDL INDIA", url: "https://ndl.gov.in", icon: "🔬" },
  { name: "SWAYAM", url: "https://swayam.gov.in", icon: "🌐" },
  { name: "BBMK UNIV.", url: "https://bbmku.ac.in", icon: "🏛️" },
];
const COUNTERS = [
  { label: "Students Enrolled", value: "4,000+", icon: "👨‍🎓" },
  { label: "Successful Alumni", value: "45,000+", icon: "🎓" },
  { label: "Expert Faculty", value: "50+", icon: "👨‍🏫" },
  { label: "Years of Legacy", value: "56", icon: "🏛️" },
];
const ABOUT_FEATS = [
  { icon: "🛡️", title: "NAAC Accredited", desc: "Grade B Institution" },
  { icon: "👨‍🏫", title: "Expert Faculty", desc: "Highly Experienced" },
  { icon: "🔬", title: "Modern Labs", desc: "Tech-enabled Learning" },
  { icon: "🏅", title: "NSS & NCC", desc: "Character Building" },
];

const QUICK_ACTIONS = [
  {
    icon: "📋",
    title: "Exam Results",
    sub: "BBMKU result portal",
    href: "https://bbmkuniv.in/login",
    color: "#f4a023",
    bg: "#fffbeb",
    hoverBg: "#fef3c7",
    iconBg: "linear-gradient(135deg,#fef3c7,#fde68a)",
    external: true,
  },
  {
    icon: "💳",
    title: "Fee Payment",
    sub: "Online fee portal",
    href: "https://cimsstudentnewui.mastersofterp.in/",
    color: "#10b981",
    bg: "#fff",
    hoverBg: "#f0fdf4",
    iconBg: "linear-gradient(135deg,#dcfce7,#bbf7d0)",
    external: true,
  },
  {
    icon: "🎓",
    title: "Apply for Admission",
    sub: "Chancellor portal",
    href: "https://jharkhanduniversities.nic.in/",
    color: "#3b82f6",
    bg: "#fff",
    hoverBg: "#eff6ff",
    iconBg: "linear-gradient(135deg,#dbeafe,#bfdbfe)",
    external: true,
  },
  {
    icon: "📢",
    title: "Notice Board",
    sub: "Latest updates",
    href: "#notifications",
    color: "#8b5cf6",
    bg: "#fff",
    hoverBg: "#fdf4ff",
    iconBg: "linear-gradient(135deg,#f3e8ff,#e9d5ff)",
    external: false,
  },
];

function useScrollAnim(options = {}) {
  const { threshold = 0.12, rootMargin = "0px 0px -60px 0px" } = options;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return [ref, visible];
}

const ANIM_CSS = `
  .hp-root {
    font-family: "Amazon Ember","Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  }
  .sa{opacity:0;will-change:opacity,transform;}
  .sa.visible{will-change:auto;}
  .sa{transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1);}
  .sa-up{transform:translateY(38px);}
  .sa-down{transform:translateY(-28px);}
  .sa-left{transform:translateX(-40px);}
  .sa-right{transform:translateX(40px);}
  .sa-scale{transform:scale(.93);}
  .sa-fade{transform:none;}
  .sa-rise{transform:translateY(22px) scale(.97);}
  .sa.visible{opacity:1;transform:none;}
  .sa-d1{transition-delay:.08s;} .sa-d2{transition-delay:.16s;} .sa-d3{transition-delay:.24s;}
  .sa-d4{transition-delay:.32s;} .sa-d5{transition-delay:.40s;} .sa-d6{transition-delay:.48s;}
  .sa-slow{transition-duration:.9s;}
  @media(max-width:600px){
    .sa{transition-duration:.45s;}
    .sa-d1,.sa-d2,.sa-d3,.sa-d4,.sa-d5,.sa-d6{transition-delay:0s;}
    .sa-up,.sa-down{transform:translateY(22px);}
    .sa-left,.sa-right{transform:translateX(22px);}
  }

  .gc{position:relative;z-index:0;display:block;}
  .gc::before{
    content:'';position:absolute;inset:-3px;border-radius:inherit;
    background:conic-gradient(from 0deg,#a855f7,#ec4899,#f97316,#eab308,#06b6d4,#6366f1,#a855f7);
    opacity:0;filter:blur(10px);z-index:-1;transition:opacity .35s ease;
  }
  .gc:hover::before{opacity:.6;}
  .gc.r4{border-radius:6px;} .gc.r12{border-radius:14px;}
  .gc.r14{border-radius:16px;} .gc.r16{border-radius:18px;} .gc.r50{border-radius:52px;}

  .arr-link .arr{display:inline-block;transition:transform .2s ease;}
  .arr-link:hover .arr{transform:translateX(5px);}
  
  .uni-header{text-align:center;margin-bottom:clamp(32px,5vw,52px);}
  .uni-label{
    display:inline-flex;align-items:center;gap:8px;
    background:rgba(15,35,71,.06);border:1px solid rgba(15,35,71,.12);
    color:${N};padding:5px 16px;border-radius:20px;
    font-size:clamp(9px,.75vw,11px);font-weight:800;letter-spacing:2px;
    text-transform:uppercase;margin-bottom:12px;
  }
  .uni-h{
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(28px, 5vw, 50px);
    font-weight: 800;
    color: ${N};
    line-height: 1.08;
    letter-spacing: -1.5px;
    margin: 0 0 14px;
  }
  .uni-h span{color:${G};}
  .uni-sub{
    color:#6b7280;font-size:clamp(13px,.95vw,15px);
    max-width:600px;line-height:1.65;margin:0 auto;
  }
`;

const CSS = `
  *,*::before,*::after{box-sizing:border-box;}
  p { text-align: justify; }
  .hp-watermark{position:fixed;inset:0;background-image:url(${import.meta.env.BASE_URL}images/logo.webp);background-repeat:repeat;background-size:320px;opacity:.025;z-index:-1;background-color:#f4f7f9;pointer-events:none;}

  .hp-qab{background:#fff;border-bottom:1.5px solid #f1f5f9;box-shadow:0 2px 12px rgba(15,35,71,.06);}
  .hp-qab-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);}
  .hp-qab-item{display:flex;align-items:center;gap:14px;padding:16px 22px;text-decoration:none;transition:background .18s;border-right:1px solid #f1f5f9;position:relative;overflow:hidden;}
  .hp-qab-item:last-child{border-right:none;}
  .hp-qab-item::after{content:'';position:absolute;bottom:0;left:0;width:0;height:2.5px;transition:width .25s ease;}
  .hp-qab-item:hover::after{width:100%;}
  .hp-qab-icon{width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;transition:transform .2s;}
  .hp-qab-item:hover .hp-qab-icon{transform:scale(1.1) rotate(-5deg);}
  .hp-qab-title{font-size:13.5px;font-weight:800;color:#0f2347;line-height:1.2;}
  .hp-qab-sub{font-size:11px;color:#94a3b8;margin-top:2px;}
  .hp-qab-arr{margin-left:auto;font-size:18px;font-weight:700;transition:transform .2s;flex-shrink:0;}
  .hp-qab-item:hover .hp-qab-arr{transform:translateX(4px);}
  @media(max-width:768px){ .hp-qab-inner{grid-template-columns:repeat(2,1fr);} .hp-qab-item{padding:13px 16px;border-right:none;border-bottom:1px solid #f1f5f9;} .hp-qab-item:nth-child(odd){border-right:1px solid #f1f5f9;} .hp-qab-item:nth-last-child(-n+2){border-bottom:none;} }
  @media(max-width:420px){ .hp-qab-inner{grid-template-columns:1fr;} .hp-qab-item{border-right:none !important;} .hp-qab-item:last-child{border-bottom:none;} }

  .hp-about{background:#fff;padding:clamp(60px,8vw,100px) 20px;overflow:hidden;}
  .hp-about-inner{max-width:1250px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:56px;align-items:center;}
  .hp-imgstack{position:relative;width:100%;height:420px;}
  .hp-img-main{width:90%;height:100%;object-fit:cover;border-radius:20px;box-shadow:20px 20px 0 ${G};position:relative;z-index:2;transition:transform .5s;}
  .hp-imgstack:hover .hp-img-main{transform:scale(1.02);}
  .hp-img-accent{position:absolute;bottom:-28px;right:0;background:${N};color:#fff;padding:22px 26px;border-radius:14px;z-index:3;box-shadow:0 10px 30px rgba(0,0,0,.2);animation:float 3s ease-in-out infinite;}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
  .hp-adesc{color:#555;line-height:1.8;font-size:15.5px;margin-bottom:28px;text-align:justify;}
  .hp-afeat-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:32px;}
  .hp-afeat{display:flex;gap:11px;align-items:flex-start;}
  .hp-afeat-t{font-weight:800;font-size:13.5px;color:${N};}
  .hp-afeat-d{font-size:12px;color:#888;}
  .hp-disc{background:${N};color:#fff;padding:14px 32px;border:none;border-radius:50px;font-weight:700;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;font-size:14px;transition:background .3s,box-shadow .3s,transform .2s;box-shadow:0 5px 18px rgba(15,35,71,.25);}
  .hp-disc .arr{display:inline-block;transition:transform .2s;}
  .hp-disc:hover{background:${G};color:${N};transform:translateY(-2px);box-shadow:0 8px 24px rgba(244,160,35,.35);}
  .hp-disc:hover .arr{transform:translateX(5px);}
  .hp-soc{width:38px;height:38px;border-radius:50%;background:#f0f2f5;display:flex;align-items:center;justify-content:center;color:${N};font-size:17px;text-decoration:none;transition:background .3s,transform .3s;}
  .hp-soc:hover{background:${N};color:${G};transform:rotate(360deg);}
  .hp-cta-row{display:flex;align-items:center;gap:22px;flex-wrap:wrap;justify-content:center;}

  .hp-sec-divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(15,35,71,.08),transparent);}

  .hp-events{padding:clamp(60px,8vw,80px) 20px;background:#f8fafc;}
  .hp-ev-inner{max-width:1400px;margin:0 auto;}
  @keyframes hp-ev-scroll{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
  .hp-ev-scroller{overflow:hidden;padding:20px 0;mask:linear-gradient(90deg,transparent,#fff 5%,#fff 95%,transparent);-webkit-mask:linear-gradient(90deg,transparent,#fff 5%,#fff 95%,transparent);}
  .hp-ev-track{display:flex;width:max-content;gap:28px;animation:hp-ev-scroll 36s linear infinite;will-change:transform;}
  .hp-ev-track:hover{animation-play-state:paused;}
  
  .hp-ev-card{width:310px;height:425px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.07);border:1px solid #edf2f7;transition:transform .35s,box-shadow .35s,border-color .35s;display:flex;flex-direction:column;}
  .gc:hover .hp-ev-card{transform:translateY(-10px) scale(1.02);box-shadow:0 20px 40px rgba(15,35,71,.14);border-color:transparent;}
  .hp-ev-imgbox{position:relative;height:190px;overflow:hidden;flex-shrink:0;}
  .hp-ev-img{width:100%;height:100%;object-fit:cover;transition:transform .55s;}
  .gc:hover .hp-ev-img{transform:scale(1.08);}
  .hp-ev-bdg{position:absolute;top:14px;right:14px;background:${G};color:#000;padding:4px 11px;font-size:9.5px;font-weight:800;border-radius:50px;text-transform:uppercase;z-index:2;letter-spacing:.5px;}
  .hp-ev-dt{position:absolute;bottom:0;left:0;background:${N};color:#fff;padding:8px 14px;border-top-right-radius:12px;z-index:2;}
  
  .hp-ev-info{padding:20px;display:flex;flex-direction:column;flex:1;}
  .hp-ev-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:800;color:${N};margin:0 0 8px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;height:44px;flex-shrink:0;}
  .hp-ev-desc-wrap{flex:1; display:flex; flex-direction:column;}
  .hp-ev-desc{font-size:13px;color:#64748b;line-height:1.6;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;height:62px;text-align:justify;margin:0;}
  
  .hp-ev-foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #f1f5f9;padding-top:0px;margin-top:auto; gap:8px;}
  .hp-ev-loc{font-size:11px;color:#94a3b8;font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; flex:1;}
  .hp-ev-more{flex-shrink:0; background:none;border:none;font-size:11px;color:${G};font-weight:800;cursor:pointer;padding:0;display:flex;align-items:center;gap:4px;}
  .hp-ev-more .arr{display:inline-block;transition:transform .2s;}
  .hp-ev-more:hover{color:${N};}
  .hp-ev-more:hover .arr{transform:translateX(5px);}
  .hp-pdf-bdg{background:#fee2e2;color:#b91c1c;padding:2px 7px;border-radius:4px;font-size:9px;font-weight:800;}
  .hp-ev-empty{text-align:center;background:#f8fafc;padding:40px;border-radius:12px;border:1px solid #e2e8f0;margin-top:28px;}

  .hp-cnt{background:linear-gradient(135deg,#f0f4ff 0%,#e8eef8 100%);padding:clamp(60px,8vw,80px) 20px;position:relative;overflow:hidden;border-top:1px solid #dde8f5;border-bottom:1px solid #dde8f5;}
  .hp-cnt-bg{position:absolute;inset:0;opacity:.4;pointer-events:none;background-image:radial-gradient(${N}18 1px,transparent 1px);background-size:30px 30px;}
  .hp-cnt-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:36px;text-align:center;position:relative;z-index:2;}
  .hp-cnt-box{padding:28px 18px;border-radius:16px;cursor:default;background:#fff;border:1.5px solid #dde8f5;box-shadow:0 4px 16px rgba(15,35,71,.06);transition:transform .35s,box-shadow .35s,border-color .35s;}
  .gc:hover .hp-cnt-box{transform:translateY(-8px);box-shadow:0 16px 36px rgba(15,35,71,.12);border-color:transparent;}
  .hp-cnt-icon{font-size:42px;margin-bottom:14px;display:inline-block;transition:transform .35s;}
  .gc:hover .hp-cnt-icon{transform:scale(1.18) rotate(8deg);}
  .hp-cnt-num{font-family:'Plus Jakarta Sans',sans-serif;font-size:40px;font-weight:800;color:${N};line-height:1;margin-bottom:8px;}
  .hp-cnt-lbl{font-size:12.5px;color:#64748b;font-weight:700;letter-spacing:1px;text-transform:uppercase;}

  .hp-links{padding:clamp(60px,8vw,80px) 20px;background:#fff;}
  .hp-links-inner{max-width:1200px;margin:0 auto;}
  .hp-links-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:18px;}
  .hp-link-tile{background:#fff;border:1.5px solid #edf2f7;border-radius:12px;padding:24px 14px;text-align:center;text-decoration:none;transition:transform .3s,border-color .3s,box-shadow .3s;display:flex;flex-direction:column;align-items:center;gap:10px;box-shadow:0 2px 8px rgba(0,0,0,.04);}
  .gc:hover .hp-link-tile{transform:translateY(-7px) scale(1.03);border-color:transparent;box-shadow:0 12px 28px rgba(15,35,71,.1);}
  .hp-link-icon{width:56px;height:56px;background:#f1f5f9;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;transition:background .3s,transform .3s;}
  .gc:hover .hp-link-icon{background:${N};transform:rotate(15deg);}
  .hp-link-name{font-size:12.5px;font-weight:800;color:${N};letter-spacing:.4px;}

  .hp-gal{padding:clamp(70px,9vw,100px) 20px;background:#fff;}
  .hp-gal-inner{max-width:1300px;margin:0 auto;}
  .hp-gal-filters{display:flex;justify-content:center;gap:10px;margin-bottom:44px;flex-wrap:wrap;}
  .hp-filter{padding:9px 22px;border-radius:50px;border:2px solid #edf2f7;background:#fff;color:${N};font-weight:700;font-size:13px;cursor:pointer;transition:background .25s,color .25s,border-color .25s,transform .25s,box-shadow .25s;}
  .hp-filter:hover,.hp-filter.active{background:${N};color:#fff;border-color:${N};transform:translateY(-2px);box-shadow:0 5px 14px rgba(15,35,71,.2);}
  .hp-gal-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;}
  .hp-gal-item{position:relative;border-radius:14px;overflow:hidden;aspect-ratio:4/3;box-shadow:0 4px 14px rgba(0,0,0,.06);cursor:pointer;transition:box-shadow .3s;}
  .gc:hover .hp-gal-item{box-shadow:0 8px 24px rgba(0,0,0,.12);}
  .hp-gal-img{width:100%;height:100%;object-fit:cover;transition:transform .55s;}
  .gc:hover .hp-gal-img{transform:scale(1.1);}
  .hp-gal-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(15,35,71,.88),transparent);opacity:0;transition:opacity .35s;display:flex;flex-direction:column;justify-content:flex-end;padding:18px;}
  .gc:hover .hp-gal-ov{opacity:1;}
  .hp-gal-cat{color:${G};font-size:10px;font-weight:800;letter-spacing:.5px;transform:translateY(8px);opacity:0;transition:all .35s .05s;}
  .hp-gal-ttl{color:#fff;font-size:13.5px;font-weight:700;margin-top:4px;transform:translateY(8px);opacity:0;transition:all .35s .12s;}
  .gc:hover .hp-gal-cat,.gc:hover .hp-gal-ttl{transform:translateY(0);opacity:1;}
  .hp-gal-empty{grid-column:1/-1;text-align:center;background:#f8fafc;padding:48px 20px;border-radius:16px;border:1px dashed #cbd5e1;}

  .hp-yt{padding:clamp(60px,8vw,80px) 20px;background:#f8fafc;}
  .hp-yt-inner{max-width:1200px;margin:0 auto;}
  .hp-yt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;}
  .hp-yt-frame{border-radius:16px;border:none;box-shadow:0 10px 32px rgba(0,0,0,.1);width:100%;height:220px;}
  .hp-yt-ph{background:#fff;border:1.5px solid #e2e8f0;border-radius:16px;height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;}
  .hp-yt-ph-icon{font-size:34px;opacity:.35;}
  .hp-yt-ph-txt{color:#94a3b8;font-size:13px;text-align:center;}

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

const SA = ({
  children,
  variant = "up",
  delay = "",
  slow = false,
  className = "",
  style = {},
  tag: Tag = "div",
}) => {
  const [ref, vis] = useScrollAnim();
  return (
    <Tag
      ref={ref}
      className={`sa sa-${variant}${slow ? " sa-slow" : ""}${delay ? ` sa-${delay}` : ""}${vis ? " visible" : ""}${className ? " " + className : ""}`}
      style={style}
    >
      {children}
    </Tag>
  );
};

const UniHeader = ({ label, title1, title2, sub }) => {
  return (
    <div className="uni-header">
      <div>
        <div className="uni-label">{label}</div>
      </div>
      <h2 className="uni-h">
        {title1} <span>{title2}</span>
      </h2>
      <p className="uni-sub">{sub}</p>
    </div>
  );
};

const QuickActionBar = () => (
  <div className="hp-qab">
    <div className="hp-qab-inner">
      {QUICK_ACTIONS.map((item) => {
        const commonProps = {
          className: "hp-qab-item",
          style: { background: item.bg },
          onMouseEnter: (e) => {
            e.currentTarget.style.background = item.hoverBg;
            e.currentTarget.querySelector(".hp-qab-arr").style.color = item.color;
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.background = item.bg;
            e.currentTarget.querySelector(".hp-qab-arr").style.color = "#cbd5e1";
          },
        };

        const inner = (
          <>
            <style>{`.hp-qab-item[data-id="${item.title}"]::after{background:${item.color};}`}</style>
            <div className="hp-qab-icon" style={{ background: item.iconBg }}>
              {item.icon}
            </div>
            <div>
              <div className="hp-qab-title">{item.title}</div>
              <div className="hp-qab-sub">{item.sub}</div>
            </div>
            <div className="hp-qab-arr" style={{ color: "#cbd5e1" }}>
              ›
            </div>
          </>
        );

        return item.external ? (
          <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" {...commonProps}>
            {inner}
          </a>
        ) : (
          <a key={item.title} href={item.href} {...commonProps}>
            {inner}
          </a>
        );
      })}
    </div>
  </div>
);

// ── EventCard ──────────────────────────────────────────────
const EventCard = memo(({ ev, onPdf }) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = ev.description || ev.desc || "";
  const plainText = tempDiv.textContent || tempDiv.innerText || "";

  let displayDay = ev.day || "--";
  let displayMonth = ev.month || "---";
  if (ev.date) {
    const d = new Date(ev.date);
    if (!isNaN(d)) {
      displayDay = d.getDate();
      displayMonth = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
    }
  }

  let imgSrc = ev.image || ev.imageUrl || getEventImg(ev.type?.toUpperCase());
  if (imgSrc && imgSrc.startsWith("images/")) {
    imgSrc = `${import.meta.env.BASE_URL}${imgSrc}`; 
  }

  return (
    <div className="gc r16" style={{ flexShrink: 0 }}>
      <div className="hp-ev-card">
        <div className="hp-ev-imgbox">
          <div className="hp-ev-bdg">{ev.type}</div>
          <div className="hp-ev-dt">
            <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1 }}>
              {displayDay}
            </div>
            <div style={{ fontSize: 10, fontWeight: 700 }}>{displayMonth}</div>
          </div>
          <img
            src={imgSrc}
            alt={ev.title}
            className="hp-ev-img"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="hp-ev-info">
          <h3 className="hp-ev-title" title={ev.title}>
            {ev.title}
          </h3>

          <div className="hp-ev-desc-wrap">
            <p className="hp-ev-desc">{plainText}</p>
            {plainText.length > 0 && (
              <Link
                to="/events"
                style={{ display: "inline-block", color: "#f4a023", fontWeight: 800, fontSize: 12, textDecoration: "none", marginTop: 8 }}
              >
                Read More ↗
              </Link>
            )}
          </div>

          <div className="hp-ev-foot">
            <span className="hp-ev-loc">
              📍 {ev.venue || ev.location || "Campus"}
            </span>
            <button className="hp-ev-more" onClick={() => onPdf(ev)}>
              {ev.reportLink || ev.pdfLink ? (
                <>
                  <span className="hp-pdf-bdg">PDF</span> READ REPORT{" "}
                  <span className="arr">›</span>
                </>
              ) : (
                <>
                  FULL DETAILS <span className="arr">›</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// ✅ FIXED: Image Priority and React Key logic updated
const GalItem = memo(({ img, index }) => {
  const [ref, vis] = useScrollAnim({
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
  });
  const delay = (index % 6) * 0.07;
  return (
    <div className="gc r14" ref={ref} style={{ transitionDelay: `${delay}s` }}>
      <div className={`hp-gal-item sa sa-scale${vis ? " visible" : ""}`}>
        {/* ✅ Naya `img.image` pehle check hoga, purana `img.src` fallback me aayega */}
        <img
          src={img.image || img.src} 
          alt={img.title}
          className="hp-gal-img"
          loading="lazy"
          decoding="async"
        />
        <div className="hp-gal-ov">
          <div className="hp-gal-cat">{img.cat || img.album || 'Gallery'}</div>
          <div className="hp-gal-ttl">{img.title}</div>
        </div>
      </div>
    </div>
  );
});

function YouTubeSection() {
  const [ytData, setYt] = useState(null);
  const [videos, setVids] = useState([]);
  const [ready, setR] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    return onSnapshot(
      doc(db, "settings", "youtube"),
      (s) => {
        setYt(s.exists() ? s.data() : null);
        setR(true);
      },
      () => setR(true),
    );
  }, [inView]);

  useEffect(() => {
    if (!inView || !ytData) return;
    if (!ytData?.apiKey || !ytData?.channelId) {
      if (ytData?.videoIds) {
        const ids = ytData.videoIds
          .split(/[\n,]/)
          .map((s) => s.trim())
          .filter(Boolean)
          .slice(0, 3);
        setVids(ids);
      }
      return;
    }
    const { apiKey, channelId } = ytData;
    (async () => {
      try {
        const chRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
        );
        const chData = await chRes.json();
        if (chData.error || !chData.items?.length) return;
        const uploadId =
          chData.items[0].contentDetails.relatedPlaylists.uploads;
        const plRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadId}&maxResults=3&key=${apiKey}`,
        );
        const plData = await plRes.json();
        if (plData.error) return;
        setVids(plData.items.map((i) => i.snippet.resourceId.videoId));
      } catch (_) {}
    })();
  }, [inView, ytData]);

  const channel = ytData?.channelName || "GNC College Official";
  const hasVideos = videos.length > 0;

  return (
    <section className="hp-yt" ref={sectionRef}>
      <div className="hp-yt-inner">
        <SA variant="up">
          <UniHeader
            label="🎬 Campus Video Highlights"
            title1="Campus Video"
            title2="Highlights"
            sub={`Official ${channel} channel se latest videos`}
          />
        </SA>
        <div className="hp-yt-grid">
          {!inView
            ? [1, 2, 3].map((i) => (
                <SA key={i} variant="up" delay={`d${i}`}>
                  <div className="gc r16">
                    <div
                      className="hp-yt-ph"
                      style={{
                        background: "#f1f5f9",
                        animation: "yt-shimmer 1.5s infinite",
                      }}
                    >
                      <style>{`@keyframes yt-shimmer { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }`}</style>
                      <div className="hp-yt-ph-icon" style={{ opacity: 0.3 }}>
                        ▶️
                      </div>
                    </div>
                  </div>
                </SA>
              ))
            : !ready
              ? [1, 2, 3].map((i) => (
                  <SA key={i} variant="up" delay={`d${i}`}>
                    <div className="gc r16">
                      <div className="hp-yt-ph">
                        <div className="hp-yt-ph-icon">⏳</div>
                        <div className="hp-yt-ph-txt">Loading...</div>
                      </div>
                    </div>
                  </SA>
                ))
              : hasVideos
                ? videos.map((vid, i) => (
                    <SA key={vid} variant="up" delay={`d${i + 1}`}>
                      <div className="gc r16">
                        <iframe
                          className="hp-yt-frame"
                          src={`https://www.youtube.com/embed/${vid}`}
                          allowFullScreen
                          title={vid}
                          loading="lazy"
                        />
                      </div>
                    </SA>
                  ))
                : [1, 2, 3].map((i) => (
                    <SA key={i} variant="up" delay={`d${i}`}>
                      <div className="gc r16">
                        <div className="hp-yt-ph">
                          <div className="hp-yt-ph-icon">▶️</div>
                          <div className="hp-yt-ph-txt">
                            Admin Panel → YouTube tab mein
                            <br />
                            API Key aur Channel ID add karein
                          </div>
                        </div>
                      </div>
                    </SA>
                  ))}
        </div>
        {hasVideos && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
            <Link
              to="/video-gallery"
              className="arr-link"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#ff0000", color: "#fff",
                padding: "12px 30px", borderRadius: 50,
                fontSize: 14, fontWeight: 800, textDecoration: "none",
                boxShadow: "0 4px 18px rgba(255,0,0,.35)",
                transition: "transform .2s, box-shadow .2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(255,0,0,.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 18px rgba(255,0,0,.35)"; }}
            >
              🎬 View All Videos <span className="arr">›</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

const HomePage = ({ notices, announcements, pdfReports, sliderSlides, events, gallery, updates }) => {
  const [tab, setTab] = useState("All Moments");
  const [selectedPdf, setSelectedPdf] = useState(null);

  // ✅ NAYA LOGIC: Google Drive se latest notices fetch karna
  const NOTICE_FOLDER_ID = import.meta.env.VITE_DRIVE_NOTICE_FOLDER;
  const { docs: driveNotices } = useDriveDocs(NOTICE_FOLDER_ID);
  
  // In notices ko UI format me map karna
  const liveDriveNotices = driveNotices.map(doc => ({
    id: doc.id,
    text: doc.name,
    createdAt: { toDate: () => new Date(doc.rawDate) },
    link: doc.previewUrl,
    isNew: (new Date() - new Date(doc.rawDate)) < 7 * 24 * 60 * 60 * 1000
  }));

  // Agar Drive se notice aagaye toh wo use karo, warna fallback wale (props) use karo
  const finalNotices = liveDriveNotices.length > 0 ? liveDriveNotices : notices;

  // ✅ YAHAN GADBAD THI (Variables Restored)
  const allGal = gallery || [];
  const filtered = tab === "All Moments" 
      ? allGal 
      : allGal.filter((i) => (i.cat === tab) || (i.album === tab));

  const recentEv = (events || []).filter((e) => e.status !== "upcoming").slice(0, 6);
  const upcomEv = (events || []).filter((e) => e.status === "upcoming");
  const evTriple = [...recentEv, ...recentEv, ...recentEv];

  const handlePdf = useCallback((ev) => {
    if (ev.reportLink || ev.pdfLink) setSelectedPdf({ url: ev.reportLink || ev.pdfLink, title: ev.title || "Event Report" });
    else alert("Full details coming soon!");
  }, []);

  return (
    <div className="hp-root" style={{ background: "#f8fafc", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{ANIM_CSS + CSS}</style>
      <div className="hp-watermark" />
      <HeroSlider slides={sliderSlides} />
      <Ticker />
      <PremiumTicker items={updates?.length > 0 ? updates : TICKER_ITEMS} />
      <QuickActionBar />
      {/* Yahan 'notices' ki jagah 'finalNotices' paas kar diya gaya hai */}
      <NotificationSection notices={finalNotices} announcements={announcements} pdfReports={pdfReports} upcomingEvents={upcomEv} />
      <section id="about" className="hp-about">
        <div className="hp-about-inner">
          <SA variant="left" slow>
            <div className="hp-imgstack">
              <img
                src={`${import.meta.env.BASE_URL}images/college_photo.webp`}
                alt="Guru Nanak College"
                className="hp-img-main"
                loading="lazy"
                decoding="async"
              />
              <div className="hp-img-accent">
                <div style={{ fontSize: 30, fontWeight: 900, color: G, lineHeight: 1 }}>56+</div>
                <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 1 }}>YEARS OF EXCELLENCE</div>
              </div>
            </div>
          </SA>
          <SA variant="right" slow>
            <UniHeader label="📚 Established 1970" title1="About the" title2="College" sub="" />
            <p className="hp-adesc">
              Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was
              established by the Gurudwara Prabandhak Committee in 1970 to mark
              the fifth Birth Centenary of the great Guru. We draw inspiration
              from the teachings of Guru Nanak Devji, fostering an environment
              of academic progress and individual development.
            </p>
            <div className="hp-afeat-grid">
              {ABOUT_FEATS.map((f) => (
                <div key={f.title} className="hp-afeat">
                  <span style={{ fontSize: 19, marginTop: 2 }}>{f.icon}</span>
                  <div>
                    <div className="hp-afeat-t">{f.title}</div>
                    <div className="hp-afeat-d">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="hp-cta-row">
              <Link to="/about-us/college-profile" className="hp-disc arr-link">
                DISCOVER MORE <span className="arr">›</span>
              </Link>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#888" }}>FOLLOW US:</span>
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" className="hp-soc">
                    {s.id === "twitter" ? "𝕏" : s.id === "youtube" ? "▶" : s.label.charAt(0)}
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

      <section id="events" className="hp-events">
        <div className="hp-ev-inner">
          <SA variant="up">
            <UniHeader label="🌟 Campus Life" title1="Recent Events &" title2="Happenings" sub="Seminars, workshops aur campus activities ki ek jhalak" />
          </SA>
          {recentEv.length > 0 ? (
            <SA variant="fade" delay="d1">
              <div className="hp-ev-scroller">
                <div className="hp-ev-track">
                  {evTriple.map((ev, i) => (
                    <EventCard key={`${ev.id || i}-${i}`} ev={ev} onPdf={handlePdf} />
                  ))}
                </div>
              </div>
            </SA>
          ) : (
            <SA variant="scale">
              <div className="hp-ev-empty">
                <div style={{ fontSize: 38, marginBottom: 10 }}>📅</div>
                <h3 style={{ color: N, margin: "0 0 8px", textAlign: "center" }}>No Recent Events</h3>
                <p style={{ color: "#64748b", fontSize: 13, textAlign: "center" }}>Admin Panel → Events se data add karein</p>
              </div>
            </SA>
          )}
          <SA variant="right" delay="d2" style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
            <Link to="/events" className="arr-link" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: `linear-gradient(135deg,${G},#a07010)`, color: N,
                padding: "12px 28px", borderRadius: 50, fontSize: 14, fontWeight: 900,
                textDecoration: "none", boxShadow: `0 4px 18px ${G}55`,
              }}>
              🏆 View All Events <span className="arr">›</span>
            </Link>
          </SA>
        </div>
      </section>

      <PlacementsSection />

      <section className="hp-cnt">
        <div className="hp-cnt-bg" />
        <div className="hp-cnt-grid">
          {COUNTERS.map((c, i) => (
            <SA key={c.label} variant="rise" delay={`d${i + 1}`}>
              <div className="gc r16">
                <div className="hp-cnt-box">
                  <div className="hp-cnt-icon">{c.icon}</div>
                  <div className="hp-cnt-num">{c.value}</div>
                  <div className="hp-cnt-lbl">{c.label}</div>
                </div>
              </div>
            </SA>
          ))}
        </div>
      </section>

      <section className="hp-links">
        <div className="hp-links-inner">
          <SA variant="up">
            <UniHeader label="🔗 Quick Access" title1="Important External" title2="Links" sub="Official education and government portals ka quick access" />
          </SA>
          <div className="hp-links-grid">
            {LINKS_DATA.map((l, i) => (
              <SA key={l.name} variant="scale" delay={`d${(i % 4) + 1}`}>
                <div className="gc r12">
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="hp-link-tile">
                    <div className="hp-link-icon">{l.icon}</div>
                    <div className="hp-link-name">{l.name}</div>
                  </a>
                </div>
              </SA>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="hp-gal">
        <div className="hp-gal-inner">
          <SA variant="up">
            <UniHeader label="📸 Memories" title1="Photo" title2="Gallery" sub="Academic excellence aur cultural heritage ki yadgar jhalak" />
          </SA>
          <SA variant="fade" delay="d1">
            <div className="hp-gal-filters">
              {GALLERY_TABS.map((t) => (
                <button key={t} className={`hp-filter${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
                  {t}
                </button>
              ))}
            </div>
          </SA>
          <div className="hp-gal-grid">
            {filtered.length > 0 ? (
              // ✅ FIXED: Har photo map hote waqt unique 'img.id' ko key banaya! (Pehle 'i' tha)
              filtered.map((img, i) => <GalItem key={img.id || i} img={img} index={i} />)
            ) : (
              <SA variant="scale" className="hp-gal-empty">
                <div style={{ fontSize: 32, marginBottom: 10, textAlign: "center" }}>📸</div>
                <h3 style={{ color: N, margin: "0 0 6px", textAlign: "center" }}>Gallery Empty</h3>
                <p style={{ color: "#64748b", fontSize: 13, textAlign: "center" }}>Admin Panel → Gallery se photos upload karein</p>
              </SA>
            )}
          </div>
          {allGal.length > 0 && (
            <SA variant="up" delay="d2" style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
              <Link to="/gallery" className="arr-link" style={{
                  display: "inline-flex", alignItems: "center", gap: 8, background: N, color: "#fff",
                  padding: "12px 30px", borderRadius: 50, fontSize: 14, fontWeight: 800, textDecoration: "none",
                  boxShadow: `0 4px 18px ${N}44`, transition: "background .2s, transform .2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = G; e.currentTarget.style.color = N; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = N; e.currentTarget.style.color = "#fff"; }}
              >
                📸 View All Photos <span className="arr">›</span>
              </Link>
            </SA>
          )}
        </div>
      </section>

      <YouTubeSection />

      {selectedPdf && (
        <PDFModal url={selectedPdf.url} title={selectedPdf.title} onClose={() => setSelectedPdf(null)} />
      )}
    </div>
  );
};

export default HomePage;