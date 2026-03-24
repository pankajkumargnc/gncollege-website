var H=Object.defineProperty;var R=Object.getOwnPropertySymbols;var U=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable;var D=(i,a,t)=>a in i?H(i,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[a]=t,B=(i,a)=>{for(var t in a||(a={}))U.call(a,t)&&D(i,t,a[t]);if(R)for(var t of R(a))_.call(a,t)&&D(i,t,a[t]);return i};import{r as f,j as e,L as A}from"./vendor-react-BUo8HIok.js";import{q as M,w as F,c as W,d as G,a as I,o as $}from"./vendor-firebase-DZMN3sO6.js";import{C as O}from"./page-gallery-BZVwQR8Z.js";const J=()=>(f.useEffect(()=>{window.scrollTo(0,0)},[]),e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @media (min-width: 1024px) {
          .stats-grid-override {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        .stat-card-small {
          padding: 1.5rem !important;
        }
        .stat-value-small {
          font-size: 1.8rem !important;
        }
        .social-icon-btn {
          width: 45px; height: 45px; border-radius: 50%; background: #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.08); display: flex; align-items: center; justify-content: center; color: var(--primary-navy); font-size: 20px; text-decoration: none; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); border: 1px solid #f0f2f5;
        }
        .social-icon-btn:hover { 
          background: var(--accent-gold); color: var(--primary-navy); transform: translateY(-5px) scale(1.1); box-shadow: 0 10px 25px rgba(244,160,35,0.4); border-color: var(--accent-gold);
        }
        .rich-text-content {
          text-align: justify;
        }
      `}),e.jsxs("header",{className:"profile-hero",children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"College Profile"}),e.jsx("p",{className:"hero-subtitle",children:"Excellence in Education Since 1970"})]})]}),e.jsx("div",{style:{maxWidth:"1200px",margin:"3rem auto 0",padding:"0 20px",position:"relative",zIndex:20},children:e.jsxs("div",{className:"profile-layout",children:[e.jsxs("main",{className:"profile-main",children:[e.jsxs("section",{className:"profile-section anim-slide-up",style:{animationDelay:"0.2s",background:"#fff",borderRadius:"24px"},children:[e.jsxs("div",{style:{marginBottom:"3rem"},children:[e.jsx("h2",{className:"section-heading",children:"College Profile"}),e.jsx("div",{className:"heading-underline"}),e.jsx("img",{src:"https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",alt:"College Campus",loading:"lazy",decoding:"async",width:"350",height:"233",className:"profile-img hover-scale",style:{float:"right",width:"350px",maxWidth:"100%",marginLeft:"2rem",marginBottom:"1rem",borderRadius:"12px"}}),e.jsx("p",{className:"rich-text-content",children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was Established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru after whom this college is named."}),e.jsx("p",{className:"rich-text-content mt-4",children:"The college is managed by a Governing Council nominated by the Gurudwara Prabandhak Committee, Dhanbad, and draws its inspiration from the teachings of the faith propounded by Guru Nanak Devji."}),e.jsx("div",{style:{clear:"both"}})]}),e.jsxs("div",{style:{marginBottom:"3rem"},children:[e.jsx("h2",{className:"section-heading",children:"About the College"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"Initially the college got affiliated to the Ranchi University – Ranchi since 1970 the year it was stared. But with the passage of time, Binod Bihari Mahto Koylanchal University, Dhanbad came into existence in 2017; and the affiliation of the college got transferred to this new University in 2017."}),e.jsx("p",{className:"rich-text-content mt-4",children:"At present, the college has got permanent affiliation with Binod Bihari Mahto Koylanchal University, Dhanbad in the faculties of Humanities, Social Sciences, commerce and such vocational courses as Bachelor of Computer Applications. The college has got “Deficit Grant College Status” by the government of Jharkhand. Also the college is registered u/s 2F and 12B of the UGC Act."}),e.jsx("p",{className:"rich-text-content mt-4",children:"The main aim and objective behind sponsoring this college was to impart value - based teaching to the young men and women of Dhanbad. The college attaches great importance to moral teaching. The college does not merely offer teaching in such subject as would enable young students to earn their bread and butter, but it also emphasizes grooming them into worthy (morally sound) citizens."})]}),e.jsxs("div",{children:[e.jsx("h2",{className:"section-heading",children:"Our Campuses"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",style:{marginBottom:"3rem"},children:"Guru Nanak College, Dhanbad functions at two main campuses:"}),e.jsxs("div",{className:"grid-2-col gap-6",children:[e.jsxs("div",{className:"campus-box",children:[e.jsx("h3",{style:{fontSize:"1.5rem",color:"var(--primary-navy)",fontWeight:"700",marginBottom:"10px"},children:"1. Bank More Campus (Girls Wing)"}),e.jsx("p",{className:"rich-text-content",children:"The women’s wing of the College was started in the year 2000 in the Bank More Campus of the College in the morning hours. As an exclusive centre of teaching for girls, this wing has earned high reputation among stakeholders during the last few years. In the Women’s wing also, teaching is imparted for B.A./B.Com. (Hons/General) Course."})]}),e.jsxs("div",{className:"campus-box",children:[e.jsx("h3",{style:{fontSize:"1.5rem",color:"var(--primary-navy)",fontWeight:"700",marginBottom:"10px"},children:"2. Bhuda Campus (Boys Wing)"}),e.jsx("p",{className:"rich-text-content",children:"The main building – the Boys’ wing of the College is situated at Bhuda. The main building is spaciously designed in an airy surrounding quite suitable for the environment of an academic institution. The present campus has been so planned as to cater to the needs of the students for a long time."})]})]})]})]}),e.jsx("section",{className:"stats-grid stats-grid-override mb-16 anim-slide-up",style:{animationDelay:"0.4s"},children:[{label:"Years of Legacy",value:"56+",icon:"🏛️"},{label:"Expert Faculty",value:"120+",icon:"👨‍🏫"},{label:"Students",value:"5000+",icon:"🎓"},{label:"Courses",value:"30+",icon:"📚"}].map((i,a)=>e.jsxs("div",{className:"stat-card stat-card-small",style:{background:"#fff",borderRadius:"16px",border:"1px solid #e2e8f0"},children:[e.jsx("div",{className:"stat-icon",children:i.icon}),e.jsx("div",{className:"stat-value stat-value-small",children:i.value}),e.jsx("div",{className:"stat-label",children:i.label})]},a))})]}),e.jsxs("aside",{className:"profile-sidebar anim-slide-up",style:{animationDelay:"0.5s"},children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"Principal Message",path:"/about-us/principal-message"},{label:"Admission Rules",path:"/admission/rule"},{label:"Fee Structure",path:"/admission/fee-structure"},{label:"Departments",path:"/academics/course-offered"},{label:"NSS",path:"/activity/nss"},{label:"NCC",path:"/activity/ncc"},{label:"Sports",path:"/activity/games-sports"},{label:"Workshop",path:"/activity/workshop"},{label:"Syllabus",path:"/syllabus"},{label:"Academic Calendar",path:"/academics/academic-calendar"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((i,a)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(A,{to:i.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",i.label]})},a))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:"45px",marginBottom:"15px",position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 12px",fontSize:"19px",color:"#f4a023",position:"relative",zIndex:2},children:"Need Assistance?"}),e.jsx("p",{style:{fontSize:"14px",margin:"0 0 20px",color:"#e2e8f0",lineHeight:"1.6",position:"relative",zIndex:2},children:"Contact our administration office for any queries related to admission or academics."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call Helpdesk Now"})]}),e.jsxs("div",{style:{marginTop:"30px"},children:[e.jsxs("h4",{style:{fontSize:"17px",fontWeight:"700",color:"var(--primary-navy)",marginBottom:"20px",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("span",{children:"🌐"})," Connect With Us"]}),e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx("a",{href:"https://facebook.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"f"}),e.jsx("a",{href:"https://twitter.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"𝕏"}),e.jsx("a",{href:"https://instagram.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"📸"}),e.jsx("a",{href:"https://youtube.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"▶"})]})]})]})]})})]})),me=Object.freeze(Object.defineProperty({__proto__:null,default:J},Symbol.toStringTag,{value:"Module"})),T={president:{icon:"🏛️",color:"#0f2347",accent:"#f4a023",label:"President",plural:"Presidents",subtitle:"Visionary leaders who shaped our institution"},secretary:{icon:"📋",color:"#1a3a7c",accent:"#f4a023",label:"Secretary",plural:"Secretaries",subtitle:"Dedicated administrators who guided our growth"},principal:{icon:"🎓",color:"#0f2347",accent:"#f4a023",label:"Principal",plural:"Principals",subtitle:"Academic leaders who nurtured excellence"}},N="/images/college_photo.webp",V=`
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

  .lp-wrap * { box-sizing: border-box; }

  /* Hero */
  .lp-hero {
    background: linear-gradient(135deg, #060e1c 0%, #0f2347 50%, #1a3a7c 100%);
    padding: 64px 24px 56px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .lp-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 70% 50%, rgba(244,160,35,0.08) 0%, transparent 60%);
    pointer-events: none;
  }
  .lp-hero-topbar {
    position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, #f4a023, #ffd57e, #f4a023);
  }
  .lp-hero-icon {
    font-size: 52px; margin-bottom: 16px; display: block;
    filter: drop-shadow(0 4px 16px rgba(244,160,35,0.4));
  }
  .lp-hero h1 {
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: 900;
    color: #fff;
    margin: 0 0 10px;
    letter-spacing: -0.025em;
    line-height: 1.2;
  }
  .lp-hero-sub {
    color: rgba(255,255,255,0.6);
    font-size: 0.95rem;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    margin: 0 0 24px;
  }
  .lp-hero-line {
    width: 56px; height: 3px; background: #f4a023;
    border-radius: 2px; margin: 0 auto 24px;
  }
  .lp-hero-badge {
    display: inline-block;
    background: rgba(244,160,35,0.15);
    border: 1px solid rgba(244,160,35,0.4);
    color: #ffd57e;
    padding: 5px 16px;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }

  /* View toggle */
  .lp-toggle-bar {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 24px 24px 0;
    max-width: 900px;
    margin: 0 auto;
  }
  .lp-toggle-btn {
    display: flex; align-items: center; gap: 7px;
    padding: 9px 22px;
    border-radius: 8px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    color: #64748b;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }
  .lp-toggle-btn:hover { border-color: #0f2347; color: #0f2347; }
  .lp-toggle-btn.active {
    background: #0f2347; color: #fff; border-color: #0f2347;
  }
  .lp-toggle-btn.active svg { opacity: 1; }

  /* Content area */
  .lp-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 36px 24px 80px;
  }

  /* ── TIMELINE CARDS VIEW ── */
  .lp-timeline {
    position: relative;
    padding-left: 40px;
  }
  .lp-timeline::before {
    content: '';
    position: absolute;
    left: 14px; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #f4a023, #e2e8f0 80%, transparent);
  }

  .lp-card {
    position: relative;
    background: #fff;
    border: 1px solid #e8f0fa;
    border-radius: 14px;
    padding: 24px 24px 20px;
    margin-bottom: 20px;
    transition: all 0.25s ease;
    box-shadow: 0 2px 8px rgba(15,35,71,0.05);
    animation: lp-fadein 0.4s ease both;
  }
  .lp-card:hover {
    transform: translateX(4px);
    box-shadow: 0 8px 28px rgba(15,35,71,0.1);
    border-color: #c8d8f5;
  }

  /* Timeline dot */
  .lp-dot {
    position: absolute;
    left: -33px;
    top: 24px;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: #f4a023;
    border: 3px solid #fff;
    box-shadow: 0 0 0 2px #f4a023;
    z-index: 1;
  }
  .lp-card.current .lp-dot {
    background: #0f2347;
    box-shadow: 0 0 0 2px #0f2347, 0 0 12px rgba(15,35,71,0.3);
    animation: lp-pulse 2s infinite;
  }

  @keyframes lp-pulse {
    0%, 100% { box-shadow: 0 0 0 2px #0f2347, 0 0 0 rgba(15,35,71,0.3); }
    50%       { box-shadow: 0 0 0 2px #0f2347, 0 0 16px rgba(15,35,71,0.25); }
  }

  /* Current badge */
  .lp-card.current {
    border-color: #0f2347;
    background: linear-gradient(135deg, #f8faff 0%, #fff 100%);
  }
  .lp-current-badge {
    display: inline-flex; align-items: center; gap: 5px;
    background: #0f2347; color: #fff;
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 3px 10px; border-radius: 20px;
    margin-bottom: 10px;
  }
  .lp-current-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #4ade80; animation: lp-blink 1.5s infinite;
  }
  @keyframes lp-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

  /* Card inner layout */
  .lp-card-inner {
    display: flex; gap: 18px; align-items: flex-start;
  }
  .lp-avatar {
    width: 70px; height: 70px;
    border-radius: 10px;
    object-fit: cover;
    border: 2px solid #e2e8f0;
    flex-shrink: 0;
    background: #f1f5f9;
  }
  .lp-card-body { flex: 1; min-width: 0; }
  .lp-card-name {
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    font-size: 1.08rem; font-weight: 800;
    color: #0f2347; margin: 0 0 4px;
    line-height: 1.3;
  }
  .lp-card-tenure {
    display: inline-flex; align-items: center; gap: 6px;
    background: #f4a023;
    color: #fff;
    font-size: 0.78rem; font-weight: 700;
    padding: 3px 10px; border-radius: 6px;
    margin-bottom: 8px;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }
  .lp-card-duration {
    font-size: 0.75rem; opacity: 0.85;
    border-left: 1px solid rgba(255,255,255,0.4);
    padding-left: 6px;
  }
  .lp-card-note {
    font-size: 0.87rem; color: #64748b;
    margin: 0; line-height: 1.6;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }

  /* ── TABLE VIEW ── */
  .lp-table-wrap {
    overflow-x: auto;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(15,35,71,0.1);
    border: 1px solid #dde8f5;
  }
  .lp-table {
    width: 100%; border-collapse: collapse;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    font-size: 0.93rem;
    min-width: 500px;
  }
  .lp-table thead tr {
    background: linear-gradient(135deg, #0f2347 0%, #1a3a7c 100%);
  }
  .lp-table thead th {
    color: #fff; font-weight: 700;
    font-size: 0.82rem; letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 14px 18px;
    text-align: left;
    border-right: 1px solid rgba(255,255,255,0.12);
    white-space: nowrap;
  }
  .lp-table thead th:first-child { border-left: 3px solid #f4a023; }
  .lp-table thead th:last-child  { border-right: none; }
  .lp-table tbody tr {
    border-bottom: 1px solid #e8f0fa;
    transition: background 0.15s ease;
  }
  .lp-table tbody tr:nth-child(even) { background: #f8faff; }
  .lp-table tbody tr:hover           { background: #edf3ff !important; }
  .lp-table tbody tr.lp-row-current  {
    background: #fff8ed !important;
    border-left: 3px solid #f4a023;
  }
  .lp-table td {
    padding: 13px 18px; color: #334155;
    border-right: 1px solid #e8f0fa;
    vertical-align: middle;
  }
  .lp-table td:last-child { border-right: none; }
  .lp-tname {
    font-weight: 700; color: #0f2347;
    display: flex; align-items: center; gap: 10px;
  }
  .lp-tavatar {
    width: 36px; height: 36px; border-radius: 6px;
    object-fit: cover; border: 1.5px solid #e2e8f0;
    flex-shrink: 0; background: #f1f5f9;
  }
  .lp-ttenure {
    display: inline-flex; align-items: center; gap: 4px;
    background: #f4a023; color: #fff;
    font-size: 0.78rem; font-weight: 700;
    padding: 2px 9px; border-radius: 5px;
    white-space: nowrap;
  }
  .lp-tnote { color: #64748b; font-size: 0.85rem; }
  .lp-tcurrent {
    display: inline-flex; align-items: center; gap: 5px;
    background: #0f2347; color: #fff;
    font-size: 0.72rem; font-weight: 700;
    padding: 2px 8px; border-radius: 20px;
  }

  /* Stats strip */
  .lp-stats {
    display: flex; gap: 16px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }
  .lp-stat {
    flex: 1; min-width: 100px;
    background: #fff; border: 1px solid #e8f0fa;
    border-radius: 10px; padding: 14px 16px;
    text-align: center;
  }
  .lp-stat-num {
    font-size: 1.6rem; font-weight: 900; color: #0f2347;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    line-height: 1;
  }
  .lp-stat-label {
    font-size: 0.78rem; color: #94a3b8; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.05em;
    margin-top: 4px;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }

  /* Empty state */
  .lp-empty {
    text-align: center; padding: 80px 24px; color: #94a3b8;
  }
  .lp-empty-icon { font-size: 48px; margin-bottom: 12px; display: block; }

  /* Animations */
  @keyframes lp-fadein {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Responsive */
  @media (max-width: 600px) {
    .lp-timeline { padding-left: 28px; }
    .lp-timeline::before { left: 10px; }
    .lp-dot { left: -24px; }
    .lp-card-inner { flex-direction: column; gap: 12px; }
    .lp-avatar { width: 54px; height: 54px; }
    .lp-stats { gap: 10px; }
    .lp-stat-num { font-size: 1.3rem; }
  }
`,C=(i,a)=>{const t=parseInt(i,10),d=(a==null?void 0:a.toLowerCase())==="present"?new Date().getFullYear():parseInt(a,10);if(!t||!d||isNaN(t)||isNaN(d))return null;const o=d-t;return o<=0?"< 1 yr":o===1?"1 yr":`${o} yrs`},w=i=>!i||i.toLowerCase()==="present",Y=({type:i="president",title:a})=>{const[t,d]=f.useState([]),[o,p]=f.useState(!0),[s,h]=f.useState("timeline"),l=T[i]||T.president,z=a||`${l.plural} Over the Years`;f.useEffect(()=>{const n=M(W(G,"leadership"),F("type","==",i)),u=I(n,x=>{const E=x.docs.map(k=>B({id:k.id},k.data())).sort((k,q)=>parseInt(q.from||0)-parseInt(k.from||0));d(E),p(!1)},()=>p(!1));return()=>u()},[i]);const S=t.reduce((n,u)=>{const x=C(u.from,u.to);return!x||x==="< 1 yr"?n+1:n+parseInt(x,10)},0),P=t.find(n=>w(n.to));return e.jsxs("div",{className:"lp-wrap",style:{minHeight:"60vh",background:"#f8fafc"},children:[e.jsx("style",{children:V}),e.jsxs("div",{className:"lp-hero",children:[e.jsx("div",{className:"lp-hero-topbar"}),e.jsx("span",{className:"lp-hero-icon",children:l.icon}),e.jsx("h1",{children:z}),e.jsx("p",{className:"lp-hero-sub",children:l.subtitle}),e.jsx("div",{className:"lp-hero-line"}),e.jsx("span",{className:"lp-hero-badge",children:"Guru Nanak College, Dhanbad"})]}),e.jsxs("div",{className:"lp-content",children:[!o&&t.length>0&&e.jsxs("div",{className:"lp-stats",children:[e.jsxs("div",{className:"lp-stat",children:[e.jsx("div",{className:"lp-stat-num",children:t.length}),e.jsxs("div",{className:"lp-stat-label",children:["Total ",l.plural]})]}),e.jsxs("div",{className:"lp-stat",children:[e.jsxs("div",{className:"lp-stat-num",children:[S,"+"]}),e.jsx("div",{className:"lp-stat-label",children:"Years of Leadership"})]}),P&&e.jsxs("div",{className:"lp-stat",style:{flex:2,textAlign:"left",paddingLeft:20},children:[e.jsxs("div",{style:{fontSize:"0.75rem",color:"#94a3b8",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:4,fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"},children:["Current ",l.label]}),e.jsx("div",{style:{fontWeight:800,color:"#0f2347",fontSize:"1rem",fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"},children:P.name}),e.jsxs("div",{style:{fontSize:"0.8rem",color:"#64748b",marginTop:2,fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"},children:["Since ",P.from]})]})]}),!o&&t.length>0&&e.jsxs("div",{className:"lp-toggle-bar",style:{padding:"0 0 28px",justifyContent:"flex-start"},children:[e.jsxs("button",{className:`lp-toggle-btn${s==="timeline"?" active":""}`,onClick:()=>h("timeline"),children:[e.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",children:[e.jsx("circle",{cx:"3",cy:"4",r:"2",fill:"currentColor",opacity:".4"}),e.jsx("circle",{cx:"3",cy:"7.5",r:"2",fill:"currentColor",opacity:".4"}),e.jsx("circle",{cx:"3",cy:"11",r:"2",fill:"currentColor",opacity:".4"}),e.jsx("rect",{x:"7",y:"3",width:"8",height:"2",rx:"1",fill:"currentColor"}),e.jsx("rect",{x:"7",y:"6.5",width:"8",height:"2",rx:"1",fill:"currentColor"}),e.jsx("rect",{x:"7",y:"10",width:"8",height:"2",rx:"1",fill:"currentColor"})]}),"Timeline Cards"]}),e.jsxs("button",{className:`lp-toggle-btn${s==="table"?" active":""}`,onClick:()=>h("table"),children:[e.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:"13",height:"3",rx:"1",fill:"currentColor",opacity:".5"}),e.jsx("rect",{x:"1",y:"5.5",width:"13",height:"2.5",rx:"1",fill:"currentColor",opacity:".3"}),e.jsx("rect",{x:"1",y:"9.5",width:"13",height:"2.5",rx:"1",fill:"currentColor",opacity:".3"}),e.jsx("rect",{x:"1",y:"13",width:"13",height:"1",rx:".5",fill:"currentColor",opacity:".2"})]}),"Table View"]})]}),o&&e.jsx("div",{style:{paddingLeft:40},children:[1,2,3].map(n=>e.jsxs("div",{style:{background:"#fff",border:"1px solid #e8f0fa",borderRadius:14,padding:24,marginBottom:20,display:"flex",gap:18,alignItems:"flex-start",opacity:1-(n-1)*.2},children:[e.jsx("div",{style:{width:70,height:70,borderRadius:10,background:"#f1f5f9",flexShrink:0}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{height:18,width:"50%",background:"#f1f5f9",borderRadius:6,marginBottom:10}}),e.jsx("div",{style:{height:24,width:"30%",background:"#f4a02333",borderRadius:6,marginBottom:10}}),e.jsx("div",{style:{height:13,width:"70%",background:"#f1f5f9",borderRadius:4}})]})]},n))}),!o&&t.length===0&&e.jsxs("div",{className:"lp-empty",children:[e.jsx("span",{className:"lp-empty-icon",children:"📋"}),e.jsx("h3",{style:{color:"#64748b",fontWeight:700,fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"},children:"No records yet"}),e.jsxs("p",{style:{fontSize:14,margin:"6px 0 0"},children:["Admin Panel → Leadership tab → Add ",l.plural.toLowerCase()]})]}),!o&&t.length>0&&s==="timeline"&&e.jsx("div",{className:"lp-timeline",children:t.map((n,u)=>e.jsxs("div",{className:`lp-card${w(n.to)?" current":""}`,style:{animationDelay:`${u*.06}s`},children:[e.jsx("div",{className:"lp-dot"}),w(n.to)&&e.jsxs("div",{className:"lp-current-badge",children:[e.jsx("span",{className:"lp-current-dot"}),"Current ",l.label]}),e.jsxs("div",{className:"lp-card-inner",children:[e.jsx("img",{src:n.photo||N,alt:n.name,className:"lp-avatar",onError:x=>{x.target.src=N}}),e.jsxs("div",{className:"lp-card-body",children:[e.jsx("div",{className:"lp-card-name",children:n.name}),e.jsxs("div",{className:"lp-card-tenure",children:[e.jsxs("span",{children:["📅 ",n.from," – ",n.to||"Present"]}),C(n.from,n.to)&&e.jsx("span",{className:"lp-card-duration",children:C(n.from,n.to)})]}),n.note&&e.jsx("p",{className:"lp-card-note",children:n.note})]})]})]},n.id))}),!o&&t.length>0&&s==="table"&&e.jsx("div",{className:"lp-table-wrap",children:e.jsxs("table",{className:"lp-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#"}),e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Tenure"}),e.jsx("th",{children:"Duration"}),e.jsx("th",{children:"Note"})]})}),e.jsx("tbody",{children:t.map((n,u)=>e.jsxs("tr",{className:w(n.to)?"lp-row-current":"",children:[e.jsx("td",{style:{color:"#94a3b8",fontWeight:700,fontSize:"0.85rem",width:44},children:t.length-u}),e.jsx("td",{children:e.jsxs("div",{className:"lp-tname",children:[e.jsx("img",{src:n.photo||N,alt:n.name,className:"lp-tavatar",onError:x=>{x.target.src=N}}),e.jsxs("div",{children:[e.jsx("div",{children:n.name}),w(n.to)&&e.jsxs("div",{className:"lp-tcurrent",style:{marginTop:4},children:[e.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:"#4ade80",display:"inline-block"}}),"Current"]})]})]})}),e.jsx("td",{children:e.jsxs("span",{className:"lp-ttenure",children:[n.from," – ",n.to||"Present"]})}),e.jsx("td",{style:{color:"#64748b",fontWeight:600,whiteSpace:"nowrap"},children:C(n.from,n.to)||"—"}),e.jsx("td",{className:"lp-tnote",children:n.note||"—"})]},n.id))})]})})]})]})},xe=Object.freeze(Object.defineProperty({__proto__:null,default:Y},Symbol.toStringTag,{value:"Module"})),r=O.navy,g=O.gold;function y(){f.useEffect(()=>{window.scrollTo(0,0)},[])}function c({children:i,delay:a=0,y:t=20}){const d=f.useRef(null),[o,p]=f.useState(!1);return f.useEffect(()=>{const s=new IntersectionObserver(([h])=>{h.isIntersecting&&(p(!0),s.disconnect())},{threshold:.05});return d.current&&s.observe(d.current),()=>s.disconnect()},[]),e.jsx("div",{ref:d,style:{opacity:o?1:0,transform:o?"none":`translateY(${t}px)`,transition:`all 0.65s cubic-bezier(0.22,1,0.36,1) ${a}s`},children:i})}function j({title:i,subtitle:a,icon:t}){return e.jsxs("div",{style:{background:`linear-gradient(135deg, ${r} 0%, #1a3a7c 100%)`,padding:"70px 20px 55px",textAlign:"center",color:"#fff"},children:[t&&e.jsx("div",{style:{fontSize:48,marginBottom:14},children:t}),e.jsx("h1",{style:{fontSize:"clamp(28px, 4.5vw, 42px)",fontWeight:900,margin:"0 0 12px",letterSpacing:"-0.5px"},children:i}),a&&e.jsx("p",{style:{color:"#cbd5e1",fontSize:16,maxWidth:600,margin:"0 auto",lineHeight:1.6},children:a})]})}function K(){return e.jsx("aside",{className:"profile-sidebar",children:e.jsxs(c,{delay:.1,children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," About Us"]}),e.jsx("ul",{className:"quick-links",children:[{label:"College Profile",path:"/about-us/college-profile"},{label:"Vision & Mission",path:"/about-us/vision-mission"},{label:"Principal's Message",path:"/about-us/principal-message"},{label:"Organogram",path:"/about-us/college-management/organogram"},{label:"Presidents",path:"/about-us/college-management/presidents"},{label:"Secretaries",path:"/about-us/college-management/secretaries"},{label:"Principals",path:"/about-us/college-management/principal"},{label:"Governing Body",path:"/about-us/governing-body"},{label:"Staff Council",path:"/about-us/staff-council"},{label:"Teaching Staff",path:"/about-us/college-staff/teaching-staff"},{label:"Non-Teaching Staff",path:"/about-us/college-staff/non-teaching-staff"},{label:"Audit Report",path:"/about-us/audit-report"}].map((i,a)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(A,{to:i.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",i.label]})},a))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:42,marginBottom:14,position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 10px",fontSize:18,color:g,position:"relative",zIndex:2},children:"Need Help?"}),e.jsx("p",{style:{fontSize:13,margin:"0 0 18px",color:"#e2e8f0",lineHeight:1.6,position:"relative",zIndex:2},children:"Contact our admin office for admissions or academic queries."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call: 79033 40991"})]})]})})}function b({label:i}){return e.jsxs("div",{style:{margin:"16px 0",padding:"10px 16px",background:"#fffbeb",border:"1.5px dashed #f59e0b",borderRadius:10,color:"#92400e",fontSize:13,fontWeight:700},children:["✏️ DATA YAHAN DALEIN: ",i]})}function v({children:i}){return e.jsx("div",{style:{maxWidth:1200,margin:"0 auto",padding:"50px 20px 80px"},children:e.jsxs("div",{className:"profile-layout",children:[e.jsx("main",{className:"profile-main",children:i}),e.jsx(K,{})]})})}function L({collectionName:i,accentColor:a,emptyText:t}){const[d,o]=f.useState([]),[p,s]=f.useState(!0);return f.useEffect(()=>{const h=M(W(G,i),$("date","desc")),l=I(h,z=>{o(z.docs.map(S=>B({id:S.id},S.data()))),s(!1)},()=>s(!1));return()=>l()},[i]),p?e.jsx("div",{style:{padding:20,textAlign:"center",color:"#94a3b8"},children:"⏳ Loading…"}):d.length===0?e.jsxs("div",{style:{padding:32,textAlign:"center",color:"#94a3b8",background:"#f8fafc",borderRadius:12},children:[e.jsx("div",{style:{fontSize:36,marginBottom:8},children:"📂"}),e.jsx("div",{style:{fontWeight:700},children:t||"Koi meetings nahi mili."}),e.jsxs("div",{style:{fontSize:12,marginTop:4},children:["Admin Panel → ",i==="gb_meetings"?"GB Meetings":"Staff Council"," tab se add karein"]})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:d.map(h=>{const l=h.date?new Date(h.date):null;return e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"flex-start",background:"#fff",borderRadius:14,padding:18,border:"1.5px solid #e2e8f0",borderLeft:`5px solid ${a||r}`,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},children:[e.jsxs("div",{style:{background:a||r,color:"#fff",borderRadius:10,padding:"8px 12px",textAlign:"center",flexShrink:0,minWidth:56},children:[e.jsx("div",{style:{fontSize:20,fontWeight:900,lineHeight:1},children:l?l.getDate().toString().padStart(2,"0"):"--"}),e.jsx("div",{style:{fontSize:10,fontWeight:700,marginTop:2,opacity:.85},children:l?l.toLocaleString("en-IN",{month:"short"}).toUpperCase():"--"}),e.jsx("div",{style:{fontSize:9,opacity:.7},children:l?l.getFullYear():""})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontWeight:800,color:r,fontSize:15},children:h.title}),h.notes&&e.jsx("div",{style:{fontSize:13,color:"#64748b",marginTop:4,lineHeight:1.6},children:h.notes}),e.jsx("div",{style:{marginTop:10},children:e.jsx("a",{href:h.pdfUrl,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:7,background:a||r,color:"#fff",padding:"7px 16px",borderRadius:8,fontWeight:700,fontSize:13,textDecoration:"none"},children:"📄 View Meeting PDF"})})]})]},h.id)})})}function X(){return y(),e.jsxs("div",{children:[e.jsx(j,{title:"Vision & Mission",subtitle:"Our guiding principles and future aspirations",icon:"🌟"}),e.jsxs(v,{children:[e.jsx(c,{children:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24,marginBottom:32},children:[e.jsxs("div",{style:{background:"#fff",borderRadius:20,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",overflow:"hidden"},children:[e.jsx("div",{style:{height:6,background:g}}),e.jsxs("div",{style:{padding:32},children:[e.jsx("div",{style:{fontSize:42,marginBottom:14},children:"🎯"}),e.jsx("h2",{style:{color:r,fontSize:22,fontWeight:800,marginBottom:16},children:"Our Vision"}),e.jsx("p",{style:{color:"#475569",lineHeight:1.8,fontSize:15},children:"To be a premier institution of higher learning that nurtures leaders of tomorrow — intellectually competent, ethically grounded, and socially responsible — drawing inspiration from the teachings of Guru Nanak Devji."})]})]}),e.jsxs("div",{style:{background:"#fff",borderRadius:20,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",overflow:"hidden"},children:[e.jsx("div",{style:{height:6,background:r}}),e.jsxs("div",{style:{padding:32},children:[e.jsx("div",{style:{fontSize:42,marginBottom:14},children:"📌"}),e.jsx("h2",{style:{color:r,fontSize:22,fontWeight:800,marginBottom:16},children:"Our Mission"}),e.jsx("p",{style:{color:"#475569",lineHeight:1.8,fontSize:15},children:"To provide quality and inclusive higher education to all sections of society, with special focus on the underprivileged, empowering students through academic excellence, skill development, and value-based learning."})]})]})]})}),e.jsx(c,{delay:.15,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:36,boxShadow:"0 8px 30px rgba(0,0,0,0.07)"},children:[e.jsx("h2",{className:"section-heading",children:"Core Values"}),e.jsx("div",{className:"heading-underline"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:16,marginTop:24},children:[{icon:"🕊️",label:"Peace & Harmony"},{icon:"🎓",label:"Academic Excellence"},{icon:"🤝",label:"Inclusivity"},{icon:"💡",label:"Innovation"},{icon:"🌿",label:"Service to Society"},{icon:"⚖️",label:"Integrity"}].map((i,a)=>e.jsxs("div",{style:{textAlign:"center",padding:"20px 12px",background:"#f8fafc",borderRadius:14,border:"1.5px solid #e2e8f0"},children:[e.jsx("div",{style:{fontSize:32,marginBottom:8},children:i.icon}),e.jsx("div",{style:{fontSize:13,fontWeight:700,color:r},children:i.label})]},a))})]})})]})]})}function Q(){return y(),e.jsxs("div",{children:[e.jsx(j,{title:"Principal's Message",subtitle:"A word from our Principal to students and parents",icon:"🎓"}),e.jsx(v,{children:e.jsx(c,{children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:40,boxShadow:"0 8px 30px rgba(0,0,0,0.07)"},children:[e.jsxs("div",{style:{display:"flex",gap:36,alignItems:"flex-start",flexWrap:"wrap",marginBottom:36},children:[e.jsxs("div",{style:{textAlign:"center",flexShrink:0},children:[e.jsx(b,{label:"Principal ki photo ka path — src mein dalein"}),e.jsx("div",{style:{width:180,height:180,borderRadius:"50%",border:`6px solid ${g}`,boxShadow:"0 10px 30px rgba(15,35,71,0.2)",overflow:"hidden",margin:"0 auto",background:"#f1f5f9",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("span",{style:{fontSize:72},children:"👨‍💼"})}),e.jsx(b,{label:"Principal ka naam, qualification, experience"}),e.jsx("div",{style:{marginTop:14,fontWeight:800,fontSize:18,color:r},children:"Prof. [Principal Name]"}),e.jsx("div",{style:{fontSize:13,color:"#64748b",marginTop:4},children:"Principal"}),e.jsx("div",{style:{fontSize:13,color:"#64748b"},children:"Guru Nanak College, Dhanbad"}),e.jsx("div",{style:{fontSize:12,color:"#94a3b8",marginTop:4},children:"[M.A., Ph.D.]"})]}),e.jsx("div",{style:{flex:1,minWidth:260},children:e.jsx("div",{style:{borderLeft:`5px solid ${g}`,paddingLeft:24,marginBottom:24},children:e.jsx("p",{style:{fontSize:20,fontStyle:"italic",color:r,fontWeight:700,lineHeight:1.6},children:'"Education is not merely the acquisition of knowledge, but the transformation of character and the cultivation of a purposeful life."'})})})]}),e.jsx("h2",{className:"section-heading",children:"Message to Students & Parents"}),e.jsx("div",{className:"heading-underline"}),e.jsx(b,{label:"Principal ka poora sandesh — 3-4 paragraphs"}),e.jsx("p",{className:"rich-text-content",children:"Dear Students and Parents, it gives me immense pleasure to welcome you to Guru Nanak College, Dhanbad — an institution that has been nurturing young minds for over five decades."}),e.jsx("p",{className:"rich-text-content mt-4",children:"Our college stands as a beacon of quality education in Jharkhand, offering a rich blend of academic rigour, co-curricular activities, and personal development."}),e.jsx("p",{className:"rich-text-content mt-4",children:"I invite you to be part of our vibrant community and assure you of our complete support at every step of your academic journey."})]})})})]})}function Z(){return y(),e.jsxs("div",{children:[e.jsx(j,{title:"Organogram",subtitle:"Organizational structure and hierarchy of Guru Nanak College, Dhanbad",icon:"🏛️"}),e.jsx(v,{children:e.jsx(c,{delay:.15,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:32,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:24},children:[e.jsx("h2",{className:"section-heading",children:"Official Organogram (Image)"}),e.jsx("div",{className:"heading-underline"}),e.jsx("div",{style:{textAlign:"center",marginTop:20},children:e.jsx("img",{src:"/gncollege-website/images/organogram.jpg",alt:"College Organogram",style:{maxWidth:"100%",borderRadius:10,boxShadow:"0 4px 16px rgba(0,0,0,0.1)"}})}),e.jsx("div",{style:{textAlign:"center",marginTop:20},children:e.jsx("a",{href:"/gncollege-website/images/organogram.jpg",download:!0,style:{display:"inline-flex",alignItems:"center",gap:8,background:"#0f2347",color:"#fff",padding:"10px 22px",borderRadius:10,fontWeight:700,fontSize:14,textDecoration:"none"},children:"📥 Download Organogram PDF"})})]})})})]})}function m({name:i,desc:a,icon:t,purpose:d=[],responsibilities:o=[]}){return y(),e.jsxs("div",{children:[e.jsx(j,{title:i,subtitle:a,icon:t}),e.jsxs(v,{children:[e.jsx(c,{children:e.jsx("div",{style:{background:"#fff",borderRadius:20,padding:32,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:20},children:e.jsxs("div",{style:{display:"flex",gap:20,alignItems:"center",padding:20,background:`linear-gradient(135deg,${r},#1a3a7c)`,borderRadius:14,color:"#fff",flexWrap:"wrap"},children:[e.jsx("div",{style:{width:72,height:72,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,border:`3px solid ${g}`,flexShrink:0},children:t}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:11,color:g,fontWeight:700,textTransform:"uppercase",letterSpacing:1},children:"Chairperson / Convener"}),e.jsx(b,{label:`${i} ke Chairperson ka naam aur designation`}),e.jsx("div",{style:{fontSize:18,fontWeight:800},children:"✏️ [Chairperson Name]"}),e.jsx("div",{style:{fontSize:13,color:"#cbd5e1",marginTop:4},children:"✏️ [Designation, Department]"})]})]})})}),d.length>0&&e.jsx(c,{delay:.1,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:32,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:20},children:[e.jsx("h2",{className:"section-heading",children:"Purpose"}),e.jsx("div",{className:"heading-underline"}),e.jsx("ul",{style:{marginTop:12,paddingLeft:20},children:d.map((p,s)=>e.jsx("li",{style:{marginBottom:8,color:"#475569",lineHeight:1.7},children:p},s))})]})}),o.length>0&&e.jsx(c,{delay:.15,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:32,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:20},children:[e.jsx("h2",{className:"section-heading",children:"Key Responsibilities"}),e.jsx("div",{className:"heading-underline"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:12,marginTop:16},children:o.map((p,s)=>e.jsx("div",{style:{padding:"12px 16px",background:"#f8fafc",borderRadius:10,borderLeft:`4px solid ${g}`,fontSize:14,color:"#334155"},children:p},s))})]})}),e.jsx(c,{delay:.2,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:32,boxShadow:"0 8px 30px rgba(0,0,0,0.07)"},children:[e.jsx("h2",{className:"section-heading",children:"Committee Members"}),e.jsx("div",{className:"heading-underline"}),e.jsx(b,{label:`${i} ke members — naam, designation, role`}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:14},children:[e.jsx("thead",{children:e.jsx("tr",{style:{background:r,color:"#fff"},children:["S.No.","Name","Designation","Department","Role"].map(p=>e.jsx("th",{style:{padding:"12px 16px",textAlign:"left",fontWeight:700},children:p},p))})}),e.jsx("tbody",{children:[1,2,3,4,5].map((p,s)=>e.jsxs("tr",{style:{background:s%2===0?"#f8fafc":"#fff",borderBottom:"1px solid #e2e8f0"},children:[e.jsx("td",{style:{padding:"11px 16px",color:"#64748b"},children:s+1}),e.jsx("td",{style:{padding:"11px 16px",fontWeight:600,color:"#94a3b8"},children:"✏️ [Name]"}),e.jsx("td",{style:{padding:"11px 16px",color:"#94a3b8"},children:"✏️ [Designation]"}),e.jsx("td",{style:{padding:"11px 16px",color:"#94a3b8"},children:"✏️ [Dept]"}),e.jsx("td",{style:{padding:"11px 16px"},children:e.jsx("span",{style:{background:s===0?"#fef3c7":"#f1f5f9",color:s===0?"#92400e":"#475569",padding:"3px 10px",borderRadius:6,fontSize:12,fontWeight:700},children:s===0?"Chairperson":s===1?"Member Secretary":"Member"})})]},s))})]})})]})})]})]})}function ee(){return e.jsx(m,{name:"Women's Cell",icon:"👩‍💼",desc:"Dedicated to the safety, empowerment, and welfare of female students and staff at GNC.",purpose:["Ensure a safe and harassment-free environment for women on campus.","Conduct awareness programs on women's rights and legal provisions.","Provide counselling and support to female students in need."],responsibilities:["Monitor campus safety for women","Handle complaints related to women's issues","Organize gender sensitization workshops","Coordinate with ICC for harassment cases"]})}function ie(){return e.jsx(m,{name:"Anti-Ragging Committee",icon:"🚫",desc:"Committed to maintaining a 100% ragging-free campus in compliance with UGC & Supreme Court guidelines.",purpose:["Prevent and prohibit ragging in all forms on campus.","Create awareness among students about legal consequences of ragging.","Investigate complaints and take strict action against offenders."],responsibilities:["Display anti-ragging notices","Collect anti-ragging affidavits","Investigate complaints promptly","Coordinate with police if required","Conduct orientation programs"]})}function ae(){return e.jsx(m,{name:"SC/ST Cell",icon:"🤝",desc:"A dedicated welfare and support centre for Scheduled Caste and Scheduled Tribe students.",purpose:["Ensure equal educational opportunities for SC/ST students.","Guide students about government scholarships and reservations.","Resolve academic and social issues faced by SC/ST students."],responsibilities:["Facilitate scholarship applications","Address grievances of SC/ST students","Organize awareness camps","Maintain data of SC/ST enrollment","Liaison with government welfare departments"]})}function te(){return e.jsx(m,{name:"OBC Cell",icon:"📚",desc:"Supporting students from Other Backward Classes with their academic and welfare needs.",purpose:["Facilitate awareness of OBC reservations and government schemes.","Guide OBC students for scholarship applications.","Provide academic and career counselling."],responsibilities:["Scholarship guidance for OBC students","Address academic grievances","Facilitate income/caste certificate help","Organize career awareness programs"]})}function ne(){return e.jsx(m,{name:"Grievance Redressal Cell",icon:"⚖️",desc:"An official platform for students and staff to raise and resolve their academic and administrative grievances.",purpose:["Provide a fair and transparent mechanism for addressing grievances.","Ensure prompt redressal of student and staff complaints.","Maintain a record of grievances and their resolution."],responsibilities:["Receive and register grievances","Investigate complaints within stipulated time","Maintain grievance register","Submit reports to Principal","Ensure confidentiality and impartiality"]})}function se(){return e.jsx(m,{name:"Internal Complaints Committee (ICC)",icon:"🛡️",desc:"Constituted under Sexual Harassment of Women at Workplace Act, 2013.",purpose:["Prevent, prohibit, and redress sexual harassment complaints.","Conduct sensitization programs for students and staff.","Ensure impartial inquiry and fair resolution of complaints."],responsibilities:["Receive complaints of sexual harassment","Conduct inquiry within 90 days","Maintain confidentiality of complainant","Submit annual report to District Officer","Organize prevention workshops"]})}function re(){return e.jsx(m,{name:"Minority Cell",icon:"🌙",desc:"A welfare cell to support and guide students from minority communities in their academic journey.",purpose:["Guide minority students about government scholarships and schemes.","Create an inclusive environment for minority students.","Address specific academic and personal issues."],responsibilities:["Pre-matric and post-matric scholarship guidance","Address minority student grievances","Organize awareness programs","Maintain enrollment data"]})}function oe(){return e.jsx(m,{name:"Placement Cell",icon:"💼",desc:"Bridging students with career opportunities through training, internships, and campus placements.",purpose:["Facilitate campus placements and internship opportunities.","Organize skill development and career guidance programs.","Maintain industry-academia partnerships."],responsibilities:["Coordinate with companies for campus drives","Organize mock interviews and GD sessions","Maintain placement records","Career counselling for final year students","Organize job fairs"]})}function le(){return e.jsx(m,{name:"RUSA Cell",icon:"🏛️",desc:"Rashtriya Uchchatar Shiksha Abhiyan — implementing central schemes for quality improvement in higher education.",purpose:["Implement RUSA-funded projects and infrastructure development.","Ensure compliance with RUSA guidelines and reporting requirements."],responsibilities:["Coordinate RUSA grant utilization","Maintain RUSA project documentation","Submit utilization certificates","Monitor RUSA-funded activities","Liaison with State Higher Education Council"]})}function de(){return y(),e.jsxs("div",{children:[e.jsx(j,{title:"Governing Body",subtitle:"The apex decision-making body of Guru Nanak College, Dhanbad",icon:"🏛️"}),e.jsxs(v,{children:[e.jsx(c,{children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:36,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:24},children:[e.jsx("h2",{className:"section-heading",children:"About the Governing Body"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"The Governing Body of Guru Nanak College, Dhanbad is the supreme authority responsible for the overall management, policy decisions, and financial matters of the college. It is constituted as per UGC guidelines and the regulations of Binod Bihari Mahto Koylanchal University (BBMKU), Dhanbad."}),e.jsx(b,{label:"Current session, total members, chairperson naam — niche stats box mein dalein"}),e.jsxs("div",{style:{marginTop:20,padding:"16px 24px",background:`linear-gradient(135deg,${r},#1a3a7c)`,borderRadius:12,color:"#fff",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:11,color:g,fontWeight:700,textTransform:"uppercase"},children:"Current Session"}),e.jsx("div",{style:{fontWeight:800,fontSize:18},children:"✏️ [Session Year]"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:11,color:g,fontWeight:700,textTransform:"uppercase"},children:"Total Members"}),e.jsx("div",{style:{fontWeight:800,fontSize:18},children:"✏️ [Number]"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:11,color:g,fontWeight:700,textTransform:"uppercase"},children:"Chairperson"}),e.jsx("div",{style:{fontWeight:800,fontSize:18},children:"✏️ [Name]"})]})]})]})}),e.jsx(c,{delay:.1,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:36,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:24},children:[e.jsx("h2",{className:"section-heading",children:"Members of Governing Body"}),e.jsx("div",{className:"heading-underline"}),e.jsx(b,{label:"Saare members ka naam, designation, category, role dalein"}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:14},children:[e.jsx("thead",{children:e.jsx("tr",{style:{background:r,color:"#fff"},children:["S.No.","Name","Designation","Category","Role in GB"].map(i=>e.jsx("th",{style:{padding:"12px 16px",textAlign:"left",fontWeight:700},children:i},i))})}),e.jsx("tbody",{children:[{name:"✏️ [Name]",desig:"President, GPC",cat:"Management Nominee",role:"Chairperson"},{name:"✏️ [Name]",desig:"Secretary, GPC",cat:"Management Nominee",role:"Member"},{name:"✏️ [Name]",desig:"Principal, GNC",cat:"Ex-officio",role:"Member Secretary"},{name:"✏️ [Name]",desig:"✏️ [Designation]",cat:"Management Nominee",role:"Member"},{name:"✏️ [Name]",desig:"✏️ [Designation]",cat:"UGC Nominee",role:"Member"},{name:"✏️ [Name]",desig:"✏️ [Designation]",cat:"University Nominee",role:"Member"},{name:"✏️ [Name]",desig:"✏️ [Designation]",cat:"Teaching Staff Rep.",role:"Member"},{name:"✏️ [Name]",desig:"✏️ [Designation]",cat:"Non-Teaching Rep.",role:"Member"}].map((i,a)=>e.jsxs("tr",{style:{background:a%2===0?"#f8fafc":"#fff",borderBottom:"1px solid #e2e8f0"},children:[e.jsx("td",{style:{padding:"11px 16px",color:"#64748b"},children:a+1}),e.jsx("td",{style:{padding:"11px 16px",fontWeight:700,color:r},children:i.name}),e.jsx("td",{style:{padding:"11px 16px",color:"#475569"},children:i.desig}),e.jsx("td",{style:{padding:"11px 16px",fontSize:12},children:e.jsx("span",{style:{background:"#e0f2fe",color:"#0369a1",padding:"3px 8px",borderRadius:5,fontWeight:600},children:i.cat})}),e.jsx("td",{style:{padding:"11px 16px"},children:e.jsx("span",{style:{background:i.role==="Chairperson"?"#fef3c7":i.role==="Member Secretary"?"#dcfce7":"#f1f5f9",color:i.role==="Chairperson"?"#92400e":i.role==="Member Secretary"?"#166534":"#475569",padding:"3px 10px",borderRadius:6,fontSize:12,fontWeight:700},children:i.role})})]},a))})]})})]})}),e.jsx(c,{delay:.2,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:36,boxShadow:"0 8px 30px rgba(0,0,0,0.07)"},children:[e.jsx("h2",{className:"section-heading",children:"GB Meeting Reports"}),e.jsx("div",{className:"heading-underline"}),e.jsxs("p",{style:{color:"#64748b",fontSize:14,marginBottom:20,lineHeight:1.7},children:["🔒 ",e.jsx("strong",{children:"Admin Panel → GB Meetings"})," tab se date-wise PDF reports yahan automatically dikhte hain."]}),e.jsx(L,{collectionName:"gb_meetings",accentColor:r,emptyText:"Abhi tak koi GB Meeting report upload nahi ki gayi."})]})})]})]})}function ce(){return y(),e.jsxs("div",{children:[e.jsx(j,{title:"Staff Council",subtitle:"The collective voice of teaching and non-teaching staff at GNC",icon:"👨‍🏫"}),e.jsxs(v,{children:[e.jsx(c,{children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:36,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:24},children:[e.jsx("h2",{className:"section-heading",children:"About Staff Council"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"The Staff Council of Guru Nanak College, Dhanbad is a representative body of the teaching and non-teaching staff. It serves as an advisory body to the Principal on academic and administrative matters, and acts as a platform for raising and resolving staff concerns."})]})}),e.jsx(c,{delay:.1,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:36,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:24},children:[e.jsx("h2",{className:"section-heading",children:"Staff Council Members"}),e.jsx("div",{className:"heading-underline"}),e.jsx(b,{label:"Staff Council ke members — naam, designation, department, role"}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:14},children:[e.jsx("thead",{children:e.jsx("tr",{style:{background:r,color:"#fff"},children:["S.No.","Name","Designation","Department","Role"].map(i=>e.jsx("th",{style:{padding:"12px 16px",textAlign:"left",fontWeight:700},children:i},i))})}),e.jsx("tbody",{children:[{desig:"Principal",dept:"Administration",role:"President / Chairman"},{desig:"✏️ [Designation]",dept:"✏️ [Dept]",role:"Secretary"},{desig:"✏️ [Designation]",dept:"✏️ [Dept]",role:"Joint Secretary"},{desig:"✏️ [Designation]",dept:"✏️ [Dept]",role:"Member"},{desig:"✏️ [Designation]",dept:"✏️ [Dept]",role:"Member"},{desig:"✏️ [Designation]",dept:"✏️ [Dept]",role:"Member"},{desig:"✏️ [Designation]",dept:"✏️ [Dept]",role:"Non-Teaching Rep."}].map((i,a)=>e.jsxs("tr",{style:{background:a%2===0?"#f8fafc":"#fff",borderBottom:"1px solid #e2e8f0"},children:[e.jsx("td",{style:{padding:"11px 16px",color:"#64748b"},children:a+1}),e.jsx("td",{style:{padding:"11px 16px",fontWeight:700,color:r},children:"✏️ [Name]"}),e.jsx("td",{style:{padding:"11px 16px",color:"#475569"},children:i.desig}),e.jsx("td",{style:{padding:"11px 16px",color:"#64748b",fontSize:13},children:i.dept}),e.jsx("td",{style:{padding:"11px 16px"},children:e.jsx("span",{style:{background:i.role.includes("President")?"#fef3c7":i.role==="Secretary"?"#dcfce7":"#f1f5f9",color:i.role.includes("President")?"#92400e":i.role==="Secretary"?"#166534":"#475569",padding:"3px 10px",borderRadius:6,fontSize:12,fontWeight:700},children:i.role})})]},a))})]})}),e.jsxs("div",{style:{marginTop:24,padding:20,background:"#f8fafc",borderRadius:12,border:"1px solid #e2e8f0"},children:[e.jsx("h4",{style:{color:r,fontWeight:800,marginBottom:12,fontSize:16},children:"Key Functions"}),e.jsx("ul",{style:{paddingLeft:20,margin:0},children:["Academic planning and curriculum discussions","Implementation of university and UGC guidelines","Student welfare and discipline matters","Organizing college events and programs","Grievance redressal of staff members","Annual academic calendar preparation"].map((i,a)=>e.jsx("li",{style:{color:"#475569",lineHeight:1.8,marginBottom:4},children:i},a))})]})]})}),e.jsx(c,{delay:.2,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:36,boxShadow:"0 8px 30px rgba(0,0,0,0.07)"},children:[e.jsx("h2",{className:"section-heading",children:"Staff Council Meeting Reports"}),e.jsx("div",{className:"heading-underline"}),e.jsxs("p",{style:{color:"#64748b",fontSize:14,marginBottom:20,lineHeight:1.7},children:["🔒 ",e.jsx("strong",{children:"Admin Panel → Staff Council"})," tab se date-wise PDF reports yahan automatically dikhte hain."]}),e.jsx(L,{collectionName:"staff_council",accentColor:"#1a3a7c",emptyText:"Abhi tak koi Staff Council Meeting report upload nahi ki gayi."})]})})]})]})}const ue=Object.freeze(Object.defineProperty({__proto__:null,AntiRagging:ie,CommitteePage:m,GoverningBody:de,GrievanceCell:ne,IccCell:se,MinorityCell:re,ObcCell:te,Organogram:Z,PlacementCell:oe,PrincipalMessage:Q,RusaCell:le,ScStCell:ae,StaffCouncil:ce,VisionMission:X,WomensCell:ee},Symbol.toStringTag,{value:"Module"}));export{ue as A,me as C,xe as L};
