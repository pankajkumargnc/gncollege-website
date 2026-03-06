import{a as l,j as e,R as De}from"./react-B9mKIQH5.js";import{R as Re}from"./react-dom-D7_rhL9o.js";import{L as W,u as ce,R as Le,a as q,b as Ie,H as Pe}from"./react-router-CmInjhsw.js";import"./firebase-ZpnICJqI.js";import{i as Te,g as Be,a as Me,b as G,c as M,s as E,d as H,e as D,u as Y,q as de,w as We,f as $e,o as Ue,h as Ge}from"./@firebase-BOi6lkSM.js";import"./scheduler-CWG1rEj-.js";import"./idb-BXWtuYvb.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))g(c);new MutationObserver(c=>{for(const h of c)if(h.type==="childList")for(const b of h.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&g(b)}).observe(document,{childList:!0,subtree:!0});function m(c){const h={};return c.integrity&&(h.integrity=c.integrity),c.referrerPolicy&&(h.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?h.credentials="include":c.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function g(c){if(c.ep)return;c.ep=!0;const h=m(c);fetch(c.href,h)}})();const ne=[{id:"facebook",label:"f",href:"https://facebook.com/"},{id:"twitter",label:"t",href:"https://twitter.com/"},{id:"youtube",label:"y",href:"https://youtube.com/"},{id:"linkedin",label:"in",href:"https://linkedin.com/"}],He=[{name:"Class Rooms",emoji:"🏫"},{name:"Computer Lab",emoji:"💻"},{name:"Library",emoji:"📚"},{name:"Seminar Hall",emoji:"🎤"},{name:"Auditorium",emoji:"🎭"},{name:"Playground",emoji:"⚽"},{name:"Badminton Court",emoji:"🏸"},{name:"Gymnasium",emoji:"🏋️"},{name:"Digital Classrooms",emoji:"📱"},{name:"Cultural Dept.",emoji:"🎵"},{name:"Washroom (B)",emoji:"🚿"},{name:"Washroom (G)",emoji:"🚿"},{name:"Water Purifier",emoji:"💧"},{name:"Canteen",emoji:"🍽️"},{name:"Girls Common Room",emoji:"👩"},{name:"Online Lecture",emoji:"📡"}],Xe=[{label:"Home",href:"/"},{label:"About Us",href:"/",sub:[{label:"College Profile",href:"/about-us/college-profile"},{label:"Vision & Mission",href:"/about-us/vision-mission"},{label:"Principal Message",href:"/about-us/principal-message"},{label:"College Management",sub:[{label:"Organogram",href:"/about-us/college-management/organogram"},{label:"Presidents",href:"/about-us/college-management/presidents"},{label:"Secretaries",href:"/about-us/college-management/secretaries"},{label:"Principal",href:"/about-us/college-management/principal"}]},{label:"Various Committees",sub:[{label:"Women's Cell",href:"/about-us/various-committees/womens-cell"},{label:"Anti Ragging",href:"/about-us/various-committees/anti-ragging"},{label:"SC/ST",href:"/about-us/various-committees/sc-st"},{label:"OBC",href:"/about-us/various-committees/obc"},{label:"Grievance",href:"/about-us/various-committees/grievance"},{label:"ICC",href:"/about-us/various-committees/icc"},{label:"Minority",href:"/about-us/various-committees/minority"},{label:"Placement",href:"/about-us/various-committees/placement"},{label:"RUSA",href:"/about-us/various-committees/rusa"}]},{label:"College Staff",sub:[{label:"Teaching Staff",href:"/about-us/college-staff/teaching-staff"},{label:"Non-Teaching Staff",href:"/about-us/college-staff/non-teaching-staff"}]},{label:"Regulations",sub:[{label:"B.B.M.K. University Dhanbad",sub:[{label:"Special UG Regulation (CBCS) Session 2020-23",href:"/about-us/regulations/bbmku/special-ug-regulation"},{label:"UG Regulation (FYUGP)",href:"/about-us/regulations/bbmku/ug-regulation-fyugp"},{label:"UG Regulation (CBCS)",href:"/about-us/regulations/bbmku/ug-regulation-cbcs"}]},{label:"College Affiliation Paper B.B.M.K.U.",href:"/about-us/regulations/college-affiliation"},{label:"UGC Under Section 2(f) & 12(B)",href:"/about-us/regulations/ugc-section"},{label:"V.B.U. Hazaribag",sub:[{label:"UG Regulation 2015",href:"/about-us/regulations/vbu/ug-regulation-2015"},{label:"BCA Regulation",href:"/about-us/regulations/vbu/bca-regulation"}]},{label:"ByeLaws",href:"/about-us/regulations/byelaws"},{label:"Exemption",href:"/about-us/regulations/exemption"}]},{label:"Audit Report",href:"/about-us/audit-report"}]},{label:"Campus",href:"/",sub:[{label:"Campus Visuals",sub:[{label:"Bhuda",href:"/campus/visuals/bhuda"},{label:"Bank More",href:"/campus/visuals/bank-more"},{label:"Vocational Building",href:"/campus/visuals/vocational-building"}]},{label:"Infrastructure",href:"/campus/infrastructure"},{label:"Classroom",href:"/campus/classroom"},{label:"ICT Rooms",href:"/campus/ict-rooms"},{label:"Green Campus",href:"/campus/green-campus"}]},{label:"Academics",href:"/",sub:[{label:"IQAC",href:"/academics/iqac"},{label:"Course Offered",href:"/academics/course-offered"},{label:"Departments",sub:[{label:"Humanities",href:"/academics/departments/humanities"},{label:"Social Science",href:"/academics/departments/social-science"},{label:"Commerce",href:"/academics/departments/commerce"},{label:"BCA",href:"/academics/departments/bca"},{label:"BBA",href:"/academics/departments/bba"}]},{label:"Syllabus",href:"/syllabus"},{label:"Academic Calendar",href:"/academics/academic-calendar"}]},{label:"Admission",href:"/",sub:[{label:"Admission Rule",href:"/admission/rule"},{label:"Document Required",href:"/admission/document-required"},{label:"Fee Structure",href:"/admission/fee-structure"},{label:"Notification",sub:[{label:"Latest",href:"/admission/notification/latest"},{label:"Upcoming News",href:"/admission/notification/upcoming"}]},{label:"Intake Capacity",href:"/admission/intake-capacity"}]},{label:"Activity",href:"/",sub:[{label:"NSS",href:"/activity/nss"},{label:"NCC",href:"/activity/ncc"},{label:"Workshop",href:"/activity/workshop"},{label:"Game & Sports",href:"/activity/games-sports"},{label:"Collaboration",sub:[{label:"Rotaract Club",href:"/activity/collaboration/rotaract-club"},{label:"Sadbhavana Diwas",href:"/activity/collaboration/sadbhavana-diwas"}]}]},{label:"NAAC",href:"/",sub:[{label:"SSR 1st Cycle",sub:[{label:"Cycle 1 Documents",href:"/naac/ssr-1st-cycle/cycle-1-documents"},{label:"Peer Team Report",href:"/naac/ssr-1st-cycle/peer-team-report"}]},{label:"SSR 2nd Cycle",sub:[{label:"Cycle 2 Documents",href:"/naac/ssr-2nd-cycle/cycle-2-documents"},{label:"Executive Summary",href:"/naac/ssr-2nd-cycle/executive-summary"}]},{label:"AQAR",href:"/naac/aqar"},{label:"NIRF",href:"/naac/nirf"},{label:"Perspective Plan",href:"/naac/perspective-plan"}]},{label:"Publication",href:"/",sub:[{label:"College Library",href:"/publication/college-library"},{label:"E-Magazine",href:"/publication/e-magazine"},{label:"Examination Results",sub:[{label:"Result 2024",href:"/publication/examination-results/2024"},{label:"Result 2023",href:"/publication/examination-results/2023"}]},{label:"SSS Report",sub:[{label:"Report 2023-24",href:"/publication/sss-report/2023-24"},{label:"Report 2022-23",href:"/publication/sss-report/2022-23"}]}]},{label:"Gallery",href:"#gallery"},{label:"Contact Us",href:"/contact"}],Oe=[{text:"🏆 Winner - 4th Inter-College Youth Festival"},{text:"🎓 Admission 2024-28 Now Open - Apply Today!"},{text:"✅ NAAC Accredited Institution - Excellence in Education"},{text:"💻 AICTE Approved BCA & BBA Courses Available"},{text:"📚 Affiliated to B.B.M.K. University, Dhanbad"}],a={navy:"#1a3a6b",navyDark:"#0f2347",gold:"#f4a023",red:"#c0392b"},oe=[{image:"images/slider_baisakhi.jpg",title:"BAISAKHI DI SHAAM Celebration",subtitle:"Celebrating culture and traditions"},{image:"images/slider_cricket.jpg",title:"Inter College BBMKU Cricket Winners",subtitle:"Celebrating sportsmanship and victory"},{image:"images/slider_ncc.jpg",title:'NCC "At Home Function" Participants',subtitle:"Dedicated NCC Cadets & Commanders"},{image:"images/slider_youth_winners.jpg",title:"BBMKU Youth Festival Champions",subtitle:"Winners of BBMKU Inter College Youth Festival - अंतर्नाद"},{image:"images/slider_seminar.jpg",title:"ICSSR Multidisciplinary National Seminar",subtitle:"G20: A Global Platform for Economic Development"}],Fe=()=>{const[i,o]=l.useState(0),m=oe.length;let g;const c=5e3,h=()=>{o(i===m-1?0:i+1)},b=()=>{o(i===0?m-1:i-1)};function f(){g=setInterval(h,c)}return l.useEffect(()=>{o(0)},[]),l.useEffect(()=>(f(),()=>clearInterval(g)),[i]),e.jsxs("div",{className:"slider",children:[e.jsx("div",{className:"arrow prev",onClick:b,children:"❮"}),e.jsx("div",{className:"arrow next",onClick:h,children:"❯"}),oe.map((n,w)=>e.jsx("div",{className:w===i?"slide current":"slide",children:w===i&&e.jsxs(e.Fragment,{children:[e.jsx("img",{src:`/gncollege-website/${n.image}`,alt:n.title,className:"image"}),e.jsxs("div",{className:"content",children:[e.jsx("h2",{children:n.title}),e.jsx("p",{children:n.subtitle}),e.jsx("hr",{})]})]})},w)),e.jsx("style",{children:`
          .slider {
            width: 100%;
            height: 60vh; /* Professional height */
            min-height: 450px;
            max-height: 550px;
            position: relative;
            overflow: hidden;
            background-color: #0f2347; 
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }

          .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transform: scale(1.05); /* Halka sa zoom out effect fade hone par */
            transition: all 0.8s ease-in-out;
          }

          .slide.current {
            opacity: 1;
            transform: scale(1); /* Wapas normal size par */
          }

          .image {
            width: 100%;
            height: 100%;
            object-fit: cover; 
            object-position: center 20%; /* Image ka focus thoda upar rakha hai taaki chehre clear dikhein */
          }

          /* NAYA TEXT DESIGN: Bottom Center with Gradient */
          .content {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center; /* Text Center me */
            color: #fff;
            background: linear-gradient(to top, rgba(15, 35, 71, 0.9) 0%, rgba(15, 35, 71, 0) 100%); /* Niche se dark, upar se transparent */
            padding: 80px 20px 30px; /* Text ko upar push karne ke liye padding */
          }

          .content h2 {
            font-size: 2.2rem; 
            margin-bottom: 8px;
            font-weight: 800;
            letter-spacing: 0.5px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.6); /* Text ko aur clear padhne ke liye shadow */
          }

          .content p {
            font-size: 1.2rem;
            margin-bottom: 18px;
            font-weight: 500;
            color: #e2e8f0;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
          }

          .content hr {
            border: 2px solid #f4a023; 
            width: 60px;
            margin: 0 auto; /* Gold line ko center me lane ke liye */
            border-radius: 4px;
          }

          /* Controls Style */
          .arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 45px;
            height: 45px;
            background-color: rgba(255, 255, 255, 0.15);
            color: #fff;
            font-size: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border-radius: 50%;
            z-index: 10;
            transition: all 0.3s;
            backdrop-filter: blur(4px); /* Glassmorphism effect */
          }

          .arrow:hover {
            background-color: #f4a023; /* Hover par gold */
            color: #000;
            transform: translateY(-50%) scale(1.1);
          }

          .prev { left: 30px; }
          .next { right: 30px; }

          /* Mobile Responsive Adjustments */
          @media (max-width: 768px) {
            .slider {
              height: 40vh; 
              min-height: 300px;
            }

            .content {
              padding: 60px 15px 20px;
            }

            .content h2 { font-size: 1.5rem; }
            .content p { font-size: 0.95rem; margin-bottom: 12px; }
            
            .arrow {
              width: 35px; height: 35px; font-size: 1.2rem;
            }
            .prev { left: 10px; }
            .next { right: 10px; }
          }
        `})]})};function qe(){const i=[{label:"Admission 2024-28",icon:"🎓",href:"#"},{label:"BCA & BBA Portal",icon:"💻",href:"#"},{label:"Internal Exam",icon:"📋",href:"#"},{label:"Online Fee",icon:"💳",href:"#"},{label:"Syllabus",icon:"📚",href:"#"}];return e.jsx("div",{style:{background:"#fff",padding:"12px 0",borderBottom:"1px solid #eee"},children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"center",gap:"12px",flexWrap:"wrap",padding:"0 15px"},children:[e.jsx("style",{children:`
            .ribbon-box {
              background: ${a.gold};
              color: #000;
              padding: 6px 16px;
              border-radius: 4px;
              text-decoration: none;
              font-size: 12.5px;
              font-weight: 700;
              display: flex;
              align-items: center;
              gap: 8px;
              transition: all 0.3s ease;
              box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            }
            .ribbon-box:hover {
              background: ${a.navy};
              color: #fff;
              transform: translateY(-2px);
              box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            }
          `}),i.map((o,m)=>e.jsxs("a",{href:o.href,className:"ribbon-box",children:[e.jsx("span",{style:{fontSize:"16px"},children:o.icon}),o.label]},m))]})})}const re=({title:i,subtitle:o})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:32},children:[e.jsx("h2",{style:{fontSize:26,fontWeight:800,color:a.navy,marginBottom:6},children:i}),e.jsx("div",{style:{width:60,height:3,background:a.gold,margin:"0 auto 10px"}}),o&&e.jsx("p",{style:{color:"#666",fontSize:14},children:o})]});function Ye(){return e.jsxs("div",{style:{padding:"40px 16px",background:"#f8f9fa"},children:[e.jsxs("section",{style:{marginBottom:"100px",padding:"0 20px"},children:[e.jsx(re,{title:"Our Academic Departments",subtitle:"Excellence in specialized education for future leaders"}),e.jsx("style",{children:`
    .dept-container {
      display: grid;
      /* Force 4 columns on desktop, auto-adjust on mobile */
      grid-template-columns: repeat(4, 1fr); 
      gap: 20px;
      max-width: 1300px;
      margin: 0 auto;
    }
    .modern-dept-card {
      position: relative;
      height: 350px;
      border-radius: 15px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      transition: all 0.4s ease;
      background: ${a.navyDark};
    }
    .dept-bg-symbol {
      position: absolute;
      top: -20px;
      right: -20px;
      font-size: 120px;
      opacity: 0.1;
      color: #fff;
      transform: rotate(-15deg);
      pointer-events: none;
    }
    .dept-content {
      position: absolute;
      inset: 0;
      padding: 25px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background: linear-gradient(to bottom, rgba(15,35,71,0.2) 0%, rgba(15,35,71,0.9) 80%);
      z-index: 2;
    }
    .dept-icon-box {
      width: 50px;
      height: 50px;
      background: ${a.gold};
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      margin-bottom: 15px;
      box-shadow: 0 4px 10px rgba(244,160,35,0.3);
    }
    .modern-dept-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 35px rgba(15,35,71,0.4);
    }
    .modern-dept-card:hover .dept-bg-symbol {
      transform: rotate(0deg) scale(1.1);
      opacity: 0.2;
      transition: 0.5s;
    }

    /* Mobile Responsive */
    @media (max-width: 1024px) {
      .dept-container { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .dept-container { grid-template-columns: 1fr; }
    }
  `}),e.jsx("div",{className:"dept-container",children:[{name:"B.C.A",icon:"💻",symbol:"展开",desc:"Bachelor of Computer Applications - Future of IT."},{name:"B.B.A",icon:"📈",symbol:"📊",desc:"Bachelor of Business Administration - Master the Market."},{name:"COMMERCE",icon:"💰",symbol:"📒",desc:"Expertise in Finance, Accounts, and Trade."},{name:"ARTS",icon:"🎨",symbol:"🎭",desc:"Exploring Humanity, Culture, and Social Science."}].map((i,o)=>e.jsxs("div",{className:"modern-dept-card",children:[e.jsx("div",{className:"dept-bg-symbol",children:i.symbol}),e.jsxs("div",{className:"dept-content",children:[e.jsx("div",{className:"dept-icon-box",children:i.icon}),e.jsx("h3",{style:{color:"#fff",fontSize:"20px",fontWeight:"800",marginBottom:"8px"},children:i.name}),e.jsx("p",{style:{color:"rgba(255,255,255,0.8)",fontSize:"12.5px",lineHeight:"1.5",margin:0},children:i.desc}),e.jsx("div",{style:{marginTop:"15px",color:a.gold,fontSize:"12px",fontWeight:"bold"},children:"EXPLORE PROGRAM →"})]})]},o))})]}),e.jsx("section",{style:{padding:"80px 20px",background:"#ffffff"},children:e.jsxs("div",{style:{maxWidth:1250,margin:"0 auto"},children:[e.jsx(re,{title:"College Facilities",subtitle:"World-class infrastructure to support your academic excellence"}),e.jsx("style",{children:`
      .facility-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 20px;
        margin-top: 40px;
      }
      .facility-card {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 30px 15px;
        text-align: center;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        position: relative;
        overflow: hidden;
      }
      .facility-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, ${a.gold}20, transparent);
        opacity: 0;
        transition: 0.4s;
      }
      .facility-card:hover {
        transform: translateY(-10px) scale(1.02);
        background: #fff;
        border-color: ${a.gold};
        box-shadow: 0 15px 30px rgba(15, 35, 71, 0.1);
      }
      .facility-card:hover::before {
        opacity: 1;
      }
      .facility-icon-wrap {
        font-size: 38px;
        transition: transform 0.3s ease;
        z-index: 2;
      }
      .facility-card:hover .facility-icon-wrap {
        transform: rotate(10deg) scale(1.2);
      }
      .facility-text {
        font-size: 13px;
        font-weight: 700;
        color: ${a.navy};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        z-index: 2;
        transition: 0.3s;
      }
      .facility-card:hover .facility-text {
        color: ${a.gold};
      }

      /* Desktop par 8 items ek line me lane ki koshish */
      @media (min-width: 1200px) {
        .facility-container {
          grid-template-columns: repeat(8, 1fr);
        }
      }
    `}),e.jsx("div",{className:"facility-container",children:He.map((i,o)=>e.jsxs("div",{className:"facility-card",children:[e.jsx("div",{className:"facility-icon-wrap",children:i.emoji}),e.jsx("div",{className:"facility-text",children:i.name})]},o))})]})})]})}const J=({title:i,subtitle:o})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:40},children:[e.jsx("h2",{style:{fontSize:28,fontWeight:800,color:a.navy,marginBottom:8},children:i}),e.jsx("div",{style:{width:60,height:4,background:a.gold,margin:"0 auto 12px",borderRadius:2}}),o&&e.jsx("p",{style:{color:"#666",fontSize:15},children:o})]}),_e=({notices:i,announcements:o,pdfReports:m,upcomingEvents:g})=>{const c=l.useRef(null),h=l.useRef(null),b=l.useRef(null),f=l.useRef(null),n=l.useRef(null),w=l.useRef(null),u=l.useMemo(()=>[...i,...i],[i]),v=l.useMemo(()=>{const s=(g||[]).map(x=>({...x,text:x.title,date:x.createdAt?.toDate(),type:x.type||"Event"})),r=(o||[]).map(x=>({...x,date:x.createdAt?.toDate(),type:x.type||"News"}));return[...s,...r].sort((x,p)=>(p.date||0)-(x.date||0))},[g,o]),z=l.useMemo(()=>[...v,...v],[v]),d=l.useMemo(()=>{const s=(m||[]).map(r=>({...r,text:r.title,date:r.createdAt?.toDate(),type:"Document"}));return[...s,...s]},[m]);return l.useEffect(()=>{const s=c.current;if(!s)return;let r=0;const x=()=>{r-=.5,r<-s.scrollHeight/2&&(r=0),s.style.transform=`translateY(${r}px)`,f.current=requestAnimationFrame(x)},p=()=>{f.current=requestAnimationFrame(x)},y=()=>{f.current&&cancelAnimationFrame(f.current)},C=()=>y(),A=()=>p();return s.addEventListener("mouseenter",C),s.addEventListener("mouseleave",A),p(),()=>{y(),s&&(s.removeEventListener("mouseenter",C),s.removeEventListener("mouseleave",A))}},[u]),l.useEffect(()=>{const s=h.current;if(!s)return;let r=0;const x=()=>{r-=.5,r<-s.scrollHeight/2&&(r=0),s.style.transform=`translateY(${r}px)`,n.current=requestAnimationFrame(x)},p=()=>{n.current=requestAnimationFrame(x)},y=()=>{n.current&&cancelAnimationFrame(n.current)};return s.addEventListener("mouseenter",y),s.addEventListener("mouseleave",p),p(),()=>{y(),s&&(s.removeEventListener("mouseenter",y),s.removeEventListener("mouseleave",p))}},[z]),l.useEffect(()=>{const s=b.current;if(!s)return;let r=0;const x=()=>{r-=.5,r<-s.scrollHeight/2&&(r=0),s.style.transform=`translateY(${r}px)`,w.current=requestAnimationFrame(x)},p=()=>{w.current=requestAnimationFrame(x)},y=()=>{w.current&&cancelAnimationFrame(w.current)};return s.addEventListener("mouseenter",y),s.addEventListener("mouseleave",p),p(),()=>{y(),s&&(s.removeEventListener("mouseenter",y),s.removeEventListener("mouseleave",p))}},[d]),e.jsx("section",{style:{padding:"80px 20px",background:"#f4f7fa"},children:e.jsxs("div",{style:{maxWidth:1300,margin:"0 auto"},children:[e.jsx(J,{title:"Notification & Announcements",subtitle:"Stay informed with the latest official updates and campus news"}),e.jsx("style",{children:`
        .notif-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .notif-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid #edf2f7;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          flex-direction: column;
          height: 500px; /* Thoda adjust kiya list ke liye */
        }
        .notif-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 40px rgba(15, 35, 71, 0.15);
          border-color: ${a.gold};
        }
        .notif-header {
          padding: 22px;
          display: flex;
          align-items: center;
          gap: 15px;
          color: #fff;
          font-weight: 800;
          font-size: 18px;
          letter-spacing: 0.5px;
        }
        .notif-body {
          padding: 20px;
          flex: 1;
          overflow-y: hidden; /* Changed from auto */
          display: flex;
          flex-direction: column;
        }
        .view-all-btn {
          margin: 15px 20px 25px;
          padding: 12px;
          background: #f8f9fa;
          border: 1.5px solid #eee;
          border-radius: 10px;
          color: ${a.navy};
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          text-transform: uppercase;
        }
        .notif-card:hover .view-all-btn {
          background: ${a.navy};
          color: #fff;
          border-color: ${a.navy};
        }
        .notif-item {
          padding: 15px 0;
          border-bottom: 1px solid #eee;
        }  
          
        @media (max-width: 1100px) { .notif-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 700px) { .notif-grid { grid-template-columns: 1fr; } .notif-card { height: 450px; } }
      `}),e.jsxs("div",{className:"notif-grid",children:[e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header",style:{background:a.navy},children:[e.jsx("span",{style:{fontSize:"24px"},children:"🔔"})," Official Notices"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:c,children:u.map((s,r)=>{const x=s.isNew&&(new Date-new Date(s.date))/864e5<3;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"11px",color:"#888",fontWeight:700,marginBottom:"8px"},children:[e.jsxs("span",{children:["📅 ",s.date?new Date(s.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{style:{margin:"0 8px"},children:"|"}),e.jsx("span",{style:{color:a.gold},children:s.type||"Notice"}),x&&e.jsx("span",{style:{marginLeft:"16px",background:"red",color:"#fff",fontSize:"9px",padding:"2px 6px",borderRadius:"4px",animation:"blink 1s infinite"},children:"NEW"})]}),e.jsx("p",{style:{margin:"0 0 5px",fontSize:"14px",color:a.navy,fontWeight:600},children:s.text}),s.link&&e.jsx("a",{href:s.link,target:"_blank",rel:"noreferrer",style:{fontSize:"12px",color:"#007bff",fontWeight:700,display:"inline-block"},children:"🔗 View Document"})]},r)})})}),e.jsx("div",{className:"view-all-btn",children:"View All Notices →"})]}),e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header",style:{background:a.red},children:[e.jsx("span",{style:{fontSize:"24px"},children:"📣"})," Academic News / Upcoming Event"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:h,children:z.map((s,r)=>{const x=s.date&&(new Date-new Date(s.date))/864e5<3;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"11px",color:"#888",fontWeight:700,marginBottom:"8px"},children:[e.jsxs("span",{children:["📅 ",s.date?new Date(s.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{style:{margin:"0 8px"},children:"|"}),e.jsx("span",{style:{color:a.red},children:s.type||"Update"}),x&&e.jsx("span",{style:{marginLeft:"16px",background:"red",color:"#fff",fontSize:"9px",padding:"2px 6px",borderRadius:"4px",animation:"blink 1s infinite"},children:"NEW"})]}),e.jsx("p",{style:{margin:"0 0 5px",fontSize:"14px",color:a.navy,fontWeight:600},children:s.text||s.title}),s.desc&&e.jsx("p",{style:{margin:"0 0 5px",fontSize:"13px",color:"#555",lineHeight:1.4},children:s.desc}),s.link&&e.jsx("a",{href:s.link,target:"_blank",rel:"noreferrer",style:{fontSize:"12px",color:"#007bff",fontWeight:700,display:"inline-block"},children:"🔗 View Document"})]},r)})})}),e.jsx("div",{className:"view-all-btn",children:"View All News →"})]}),e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header",style:{background:"#10b981"},children:[e.jsx("span",{style:{fontSize:"24px"},children:"📄"})," E-Documents"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:b,children:d.map((s,r)=>e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"11px",color:"#888",fontWeight:700,marginBottom:"8px"},children:[e.jsxs("span",{children:["📅 ",s.date?new Date(s.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{style:{margin:"0 8px"},children:"|"}),e.jsx("span",{style:{color:"#10b981"},children:s.type||"Document"})]}),e.jsx("p",{style:{margin:"0 0 5px",fontSize:"14px",color:a.navy,fontWeight:600},children:s.text||s.title}),s.link&&e.jsx("a",{href:s.link,target:"_blank",rel:"noreferrer",style:{fontSize:"12px",color:"#007bff",fontWeight:700,display:"inline-block"},children:"🔗 View Document"})]},r))})}),e.jsx("div",{className:"view-all-btn",children:"View All Documents →"})]})]})]})})},Ve=({notices:i,announcements:o,pdfReports:m,sliderSlides:g,events:c,gallery:h})=>{const[b,f]=l.useState("All Moments"),n=h||[],w=b==="All Moments"?n:n.filter(d=>d.cat===b),u=(c||[]).filter(d=>d.status==="upcoming"),v=(c||[]).filter(d=>d.status==="recent"),z=d=>{switch(d){case"SEMINAR":return"/images/slider_seminar.jpg";case"WORKSHOP":return"/images/slider_ncc.jpg";case"SPORTS":return"/images/slider_cricket.jpg";case"CULTURAL":return"/images/slider_baisakhi.jpg";default:return"/images/college_photo.jpg"}};return e.jsxs("div",{style:{fontFamily:"'Segoe UI',sans-serif",background:"#f8f9fa",minHeight:"100vh"},children:[e.jsx(Fe,{slides:g}),e.jsx(qe,{}),e.jsx(_e,{notices:i,announcements:o,pdfReports:m,upcomingEvents:u}),e.jsx("section",{id:"about",style:{background:"#fff",padding:"100px 20px",position:"relative",overflow:"hidden"},children:e.jsxs("div",{style:{maxWidth:1250,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(350px, 1fr))",gap:"60px",alignItems:"center"},children:[e.jsxs("div",{style:{position:"relative",animation:"fadeInLeft 1s ease"},children:[e.jsx("style",{children:`
                @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
                .image-stack { position: relative; width: 100%; height: 450px; }
                .main-img { width: 90%; height: 100%; object-fit: cover; border-radius: 20px; box-shadow: 20px 20px 0px ${a.gold}; position: relative; z-index: 2; transition: transform 0.5s ease; }
                .image-stack:hover .main-img { transform: scale(1.02); }
                .accent-box { position: absolute; bottom: -30px; right: 0; background: ${a.navy}; color: #fff; padding: 25px; border-radius: 15px; z-index: 3; box-shadow: 0 10px 30px rgba(0,0,0,0.2); animation: float 3s ease-in-out infinite; }
              `}),e.jsxs("div",{className:"image-stack",children:[e.jsx("img",{src:"images/college_photo.jpg",alt:"Guru Nanak College Campus",className:"main-img"}),e.jsxs("div",{className:"accent-box",children:[e.jsx("h4",{style:{fontSize:"32px",margin:0,fontWeight:900,color:a.gold},children:"56+"}),e.jsx("p",{style:{fontSize:"12px",margin:0,opacity:.8,letterSpacing:"1px"},children:"YEARS OF EXCELLENCE"})]})]})]}),e.jsxs("div",{style:{animation:"fadeInRight 1s ease"},children:[e.jsx("style",{children:" @keyframes fadeInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } } "}),e.jsxs("h2",{style:{fontSize:"38px",fontWeight:900,color:a.navy,lineHeight:1.2,marginBottom:"10px"},children:["About the ",e.jsx("span",{style:{color:a.gold},children:"College"})]}),e.jsx("h4",{style:{color:a.gold,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"25px",fontSize:"14px"},children:"Established 1970"}),e.jsx("p",{style:{color:"#555",lineHeight:1.8,fontSize:"16px",marginBottom:"30px"},children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru. We draw inspiration from the teachings of Guru Nanak Devji, fostering an environment of academic progress and individual development."}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"15px",marginBottom:"35px"},children:[{icon:"🛡️",title:"NAAC Accredited",desc:"Grade B Institution"},{icon:"👨‍🏫",title:"Expert Faculty",desc:"Highly Experienced"},{icon:"🔬",title:"Modern Labs",desc:"Tech-enabled Learning"},{icon:"🏅",title:"NSS & NCC",desc:"Character Building"}].map((d,s)=>e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"start"},children:[e.jsx("span",{style:{fontSize:"20px"},children:d.icon}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:800,fontSize:"14px",color:a.navy},children:d.title}),e.jsx("div",{style:{fontSize:"12px",color:"#888"},children:d.desc})]})]},s))}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"25px",flexWrap:"wrap"},children:[e.jsx("style",{children:`
                .discover-btn {
                  background: ${a.navy}; color: #fff; padding: 15px 35px; border: none; border-radius: 50px; 
                  font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(15,35,71,0.3);
                  text-decoration: none; display: inline-block;
                }
                .discover-btn:hover {
                  transform: translateY(-3px) scale(1.05);
                  background: ${a.gold}; color: ${a.navy};
                  box-shadow: 0 8px 25px rgba(244,160,35,0.4);
                }
                .social-icon-btn {
                  width: 40px; height: 40px; border-radius: 50%; background: #f0f2f5; display: flex; align-items: center; 
                  justify-content: center; color: ${a.navy}; font-size: 18px; text-decoration: none; transition: all 0.3s ease;
                }
                .social-icon-btn:hover { background: ${a.navy}; color: ${a.gold}; transform: rotate(360deg); }
              `}),e.jsx(W,{to:"/about-us/college-profile",className:"discover-btn",children:"DISCOVER MORE →"}),e.jsxs("div",{style:{display:"flex",gap:"15px",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"13px",fontWeight:700,color:"#666"},children:"FOLLOW US:"}),ne.map(d=>e.jsx("a",{href:d.href,target:"_blank",rel:"noopener noreferrer",className:"social-icon-btn",children:d.id==="twitter"?"𝕏":d.id==="youtube"?"▶":d.label.charAt(0)},d.id))]})]})]})]})}),e.jsx(Ye,{}),e.jsx("section",{id:"events",style:{padding:"80px 20px",background:"#f8f9fa"},children:e.jsxs("div",{style:{maxWidth:1400,margin:"0 auto"},children:[e.jsx(J,{title:"Recent Events & Happenings",subtitle:"Insights into our seminars, workshops, and vibrant campus activities"}),e.jsx("style",{children:`
            /* Smooth Infinite Scrolling Animation */
            @keyframes scrollLeft { 
              0% { transform: translateX(0); } 
              100% { transform: translateX(-50%); } 
            }
            .events-scroller { 
              overflow: hidden; 
              padding: 20px 0;
              margin-top: 30px;
              /* Fades edges nicely so cards don't just cut off sharply */
              -webkit-mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent); 
              mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent); 
            }
            .events-track { 
              display: flex; 
              width: max-content; 
              gap: 30px; /* Space between cards */
              /* Time controls speed: 30s is smooth. */
              animation: scrollLeft 35s linear infinite; 
            }
            .events-track:hover { 
              animation-play-state: paused; /* Pause on hover */
            }
            
            /* Card Design for Single Row */
            .event-loop-card { 
              width: 320px; 
              background: #fff; 
              border-radius: 16px; 
              overflow: hidden; 
              box-shadow: 0 10px 25px rgba(0,0,0,0.04); 
              border: 1px solid #edf2f7; 
              flex-shrink: 0; 
              transition: all 0.4s ease;
              display: flex;
              flex-direction: column;
            }
            .event-loop-card:hover { 
              transform: translateY(-8px); 
              box-shadow: 0 15px 35px rgba(15, 35, 71, 0.12); 
              border-color: ${a.gold};
            }
            
            .el-img-box { position: relative; height: 200px; overflow: hidden; }
            .el-img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s ease; }
            .event-loop-card:hover .el-img { transform: scale(1.08); }
            
            .el-badge { position: absolute; top: 15px; right: 15px; background: ${a.gold}; color: #000; padding: 5px 12px; font-size: 10px; font-weight: 800; border-radius: 50px; text-transform: uppercase; z-index: 2; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
            .el-date { position: absolute; bottom: 0; left: 0; background: ${a.navy}; color: #fff; padding: 8px 15px; border-top-right-radius: 12px; text-align: center; z-index: 2; }
            .el-info { padding: 22px; flex: 1; display: flex; flex-direction: column; }
            .el-title { font-size: 16px; font-weight: 800; color: ${a.navy}; margin: 0 0 10px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
            .el-desc { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 15px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; flex: 1;}
            .el-footer { display: flex; justifyContent: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px; margin-top: auto;}
          `}),v.length>0?e.jsx("div",{className:"events-scroller",children:e.jsx("div",{className:"events-track",children:[...v,...v,...v].map((d,s)=>e.jsxs("div",{className:"event-loop-card",children:[e.jsxs("div",{className:"el-img-box",children:[e.jsx("div",{className:"el-badge",children:d.type}),e.jsxs("div",{className:"el-date",children:[e.jsx("div",{style:{fontSize:"18px",fontWeight:900,lineHeight:1},children:d.day||"--"}),e.jsx("div",{style:{fontSize:"10px",fontWeight:700},children:d.month||"---"})]}),e.jsx("img",{src:d.imageUrl||z(d.type),alt:d.title,className:"el-img"})]}),e.jsxs("div",{className:"el-info",children:[e.jsx("h3",{className:"el-title",children:d.title}),e.jsx("div",{className:"el-desc",dangerouslySetInnerHTML:{__html:d.desc}}),e.jsxs("div",{className:"el-footer",children:[e.jsxs("span",{style:{fontSize:"11px",color:"#888",fontWeight:700},children:["📍 ",d.location||"Campus"]}),e.jsx("span",{style:{fontSize:"11px",color:a.gold,fontWeight:800},children:"READ MORE →"})]})]})]},s))})}):e.jsxs("div",{style:{textAlign:"center",background:"#fff",padding:"40px",borderRadius:"12px",border:"1px dashed #e2e8f0",marginTop:"30px"},children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"10px"},children:"📅"}),e.jsx("h3",{style:{color:a.navy,margin:"0 0 10px"},children:"No Recent Events"}),e.jsx("p",{style:{color:"#64748b",margin:0,fontSize:"14px"},children:"There are no events to display at the moment. Please check back later."})]})]})}),e.jsxs("section",{style:{background:`linear-gradient(135deg, ${a.navyDark} 0%, ${a.navy} 100%)`,padding:"80px 20px",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:.05,pointerEvents:"none",backgroundImage:"radial-gradient(#fff 1px, transparent 1px)",backgroundSize:"30px 30px"}}),e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"40px",textAlign:"center",position:"relative",zIndex:2},children:[e.jsx("style",{children:`
            .counter-box { padding: 20px; transition: transform 0.3s ease; }
            .counter-box:hover { transform: translateY(-10px); }
            .counter-icon { font-size: 50px; margin-bottom: 15px; display: inline-block; filter: drop-shadow(0 0 10px rgba(244,160,35,0.3)); }
            .counter-number { font-size: 45px; font-weight: 900; color: ${a.gold}; line-height: 1; margin-bottom: 10px; font-family: 'Arial Black', sans-serif; }
            .counter-label { font-size: 14px; color: #e2e8f0; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
          `}),[{label:"STUDENTS ENROLLED",value:"4,000+",icon:"👨‍🎓"},{label:"SUCCESSFUL ALUMNI",value:"45,000+",icon:"🎓"},{label:"EXPERT FACULTY",value:"50+",icon:"👨‍🏫"},{label:"YEARS OF LEGACY",value:"56",icon:"🏛️"}].map((d,s)=>e.jsxs("div",{className:"counter-box",children:[e.jsx("div",{className:"counter-icon",children:d.icon}),e.jsx("div",{className:"counter-number",children:d.value}),e.jsx("div",{className:"counter-label",children:d.label})]},s))]})]}),e.jsx("section",{style:{padding:"80px 20px",background:"#f8f9fa"},children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsx(J,{title:"Important External Links",subtitle:"Quick access to official education and government portals"}),e.jsx("style",{children:`
            .links-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; margin-top: 40px; }
            .link-tile { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px 15px; text-align: center; text-decoration: none; transition: all 0.3s; display: flex; flex-direction: column; align-items: center; gap: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
            .link-tile:hover { transform: translateY(-8px); border-color: ${a.gold}; box-shadow: 0 12px 20px rgba(15, 35, 71, 0.08); }
            .link-icon-circle { width: 60px; height: 60px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; transition: 0.3s; }
            .link-tile:hover .link-icon-circle { background: ${a.navy}; color: #fff; }
            .link-name { font-size: 13px; font-weight: 800; color: ${a.navy}; letter-spacing: 0.5px; }
          `}),e.jsx("div",{className:"links-grid",children:[{name:"NAAC",url:"https://naac.gov.in",icon:"🏅"},{name:"UGC",url:"https://ugc.ac.in",icon:"📜"},{name:"INFLIBNET",url:"https://inflibnet.ac.in",icon:"📚"},{name:"NDL INDIA",url:"https://ndl.gov.in",icon:"🔬"},{name:"SWAYAM",url:"https://swayam.gov.in",icon:"🌐"},{name:"BBMK UNIVERSITY",url:"https://bbmku.ac.in",icon:"🏛️"}].map((d,s)=>e.jsxs("a",{href:d.url,target:"_blank",rel:"noopener noreferrer",className:"link-tile",children:[e.jsx("div",{className:"link-icon-circle",children:d.icon}),e.jsx("div",{className:"link-name",children:d.name})]},s))})]})}),e.jsx("section",{id:"gallery",style:{padding:"100px 20px",background:"#fff"},children:e.jsxs("div",{style:{maxWidth:1300,margin:"0 auto"},children:[e.jsx(J,{title:"📸 Photo Gallery",subtitle:"Memorable glimpses of academic excellence and cultural heritage"}),e.jsx("style",{children:`
            .gallery-filters { display: flex; justify-content: center; gap: 12px; margin-bottom: 50px; flex-wrap: wrap; }
            .filter-btn { padding: 10px 24px; border-radius: 50px; border: 2px solid #edf2f7; background: #fff; color: #0f2347; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.3s ease; }
            .filter-btn:hover, .filter-btn.active { background: #0f2347; color: #fff; border-color: #0f2347; box-shadow: 0 5px 15px rgba(15,35,71,0.2); }
            .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; animation: fadeIn 0.5s ease-in; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            .gallery-item { position: relative; border-radius: 15px; overflow: hidden; aspect-ratio: 4/3; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
            .gallery-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
            .gallery-item:hover .gallery-img { transform: scale(1.1); }
            .gallery-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,35,71,0.9), transparent); opacity: 0; transition: 0.4s; display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; }
            .gallery-item:hover .gallery-overlay { opacity: 1; }
          `}),e.jsx("div",{className:"gallery-filters",children:["All Moments","Seminars","Cultural Fest","Guest Visit","Campus","Departments","NSS Programs"].map(d=>e.jsx("button",{className:`filter-btn ${b===d?"active":""}`,onClick:()=>f(d),children:d},d))}),e.jsx("div",{className:"gallery-grid",children:w.length>0?w.map((d,s)=>e.jsxs("div",{className:"gallery-item",children:[e.jsx("img",{src:d.src,alt:d.title,className:"gallery-img"}),e.jsxs("div",{className:"gallery-overlay",children:[e.jsx("span",{style:{color:"#f4a023",fontSize:"10px",fontWeight:"800"},children:d.cat}),e.jsx("h4",{style:{color:"#fff",fontSize:"14px",fontWeight:"700",marginTop:"5px"},children:d.title})]})]},s)):e.jsxs("div",{style:{gridColumn:"1 / -1",textAlign:"center",background:"#f8fafc",padding:"50px 20px",borderRadius:"16px",border:"1px dashed #cbd5e1"},children:[e.jsx("div",{style:{fontSize:"32px",marginBottom:"10px"},children:"📸"}),e.jsx("h3",{style:{color:a.navy,margin:"0 0 5px"},children:"Gallery is Empty"}),e.jsx("p",{style:{color:"#64748b",margin:0,fontSize:"14px"},children:"Upload photos from the Admin Panel to see them here."})]})},b)]})})]})};function Ke({items:i}){return!i||i.length===0?null:e.jsxs("div",{style:{background:a.gold,color:"#000",padding:"8px 0",display:"flex",alignItems:"center",overflow:"hidden",borderBottom:"1px solid rgba(0,0,0,0.1)",zIndex:10},children:[e.jsx("style",{children:`
          @keyframes blinker { 50% { opacity: 0; } }
          @keyframes tickerScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-badge {
            background: #d32f2f;
            color: #fff;
            padding: 4px 12px;
            font-weight: 800;
            font-size: 11px;
            margin-left: 15px;
            margin-right: 15px;
            border-radius: 4px;
            animation: blinker 1s linear infinite;
            white-space: nowrap;
            z-index: 20;
          }
          .ticker-track {
            display: flex;
            width: max-content;
            animation: tickerScroll 30s linear infinite;
          }
          .ticker-track:hover { animation-play-state: paused; }
          .ticker-item {
            padding: 0 30px;
            font-weight: 600;
            font-size: 13.5px;
            color: #0f2347;
            white-space: nowrap;
          }
        `}),e.jsx("div",{className:"ticker-badge",children:"🚨 LATEST"}),e.jsx("div",{style:{flex:1,overflow:"hidden"},children:e.jsx("div",{className:"ticker-track",children:[...i,...i].map((o,m)=>e.jsxs("div",{className:"ticker-item",children:[e.jsx("span",{style:{color:"#d32f2f",marginRight:"8px"},children:"•"}),o.text||o.title]},m))})})]})}function Je({onAdminClick:i,navLinks:o}){const[m,g]=l.useState(null),[c,h]=l.useState(null),[b,f]=l.useState(null),[n,w]=l.useState(window.innerWidth<1100),[u,v]=l.useState(!1);l.useEffect(()=>{const r=()=>{w(window.innerWidth<1100),window.innerWidth>=1100&&v(!1)};return window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[]);const z=r=>{m===r?(g(null),h(null),f(null)):(g(r),h(null),f(null))},d=r=>{c===r?(h(null),f(null)):(h(r),f(null))},s=r=>{f(b===r?null:r)};return e.jsx("nav",{style:{background:"#ffffff",position:"sticky",top:0,zIndex:100,boxShadow:"0 4px 20px rgba(0,0,0,.08)"},children:e.jsxs("div",{style:{maxWidth:1400,margin:"0 auto",padding:"0 20px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",padding:"8px 0",marginRight:n?"0":"60px",marginLeft:n?"0":"-100px"},children:e.jsx("img",{src:"/gncollege-website/images/logo1.png",alt:"Guru Nanak College Dhanbad",style:{height:80,width:"auto",objectFit:"contain"}})}),n&&e.jsx("button",{onClick:()=>v(!u),style:{background:"transparent",border:"none",color:a.navy,fontSize:32,cursor:"pointer",padding:"4px 8px"},children:u?"✕":"☰"}),e.jsxs("div",{style:{display:n?u?"flex":"none":"flex",flexDirection:n?"column":"row",alignItems:n?"flex-start":"center",position:n?"absolute":"static",top:"100%",left:0,right:0,background:"#ffffff",padding:n?"10px 20px 20px":0,gap:n?10:0,boxShadow:n&&u?"0 10px 20px rgba(0,0,0,.1)":"none",maxHeight:n?"80vh":"auto",overflowY:n?"auto":"visible",flex:1,justifyContent:"flex-end",borderTop:n&&u?"1px solid #eee":"none"},children:[o.map(r=>e.jsxs("div",{style:{position:"relative",width:n?"100%":"auto"},onMouseEnter:()=>!n&&g(r.label),onMouseLeave:()=>{n||(g(null),h(null),f(null))},children:[e.jsxs("div",{onClick:()=>n&&r.sub&&z(r.label),style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:n&&r.sub?"pointer":"default"},children:[e.jsxs(W,{to:r.href||"#",onClick:()=>{r.label==="Home"&&window.scrollTo(0,0)},style:{color:a.navy,padding:n?"12px 0":"24px 12px",display:"block",fontSize:14.5,fontWeight:700,whiteSpace:"nowrap",borderBottom:!n&&m===r.label?"3px solid "+a.gold:"3px solid transparent",transition:"all .2s",width:"100%"},children:[r.label==="Home"?"🏠 ":"",r.label]}),n&&r.sub&&e.jsx("span",{style:{color:a.navy,fontSize:20},children:m===r.label?"▴":"▾"}),!n&&r.sub&&e.jsx("span",{style:{color:a.navy,fontSize:11,marginLeft:2,marginRight:8,marginTop:2},children:"▾"})]}),r.sub&&m===r.label&&e.jsx("div",{style:{position:n?"static":"absolute",top:"100%",left:0,background:"#fff",minWidth:260,boxShadow:n?"none":"0 12px 30px rgba(0,0,0,.15)",borderTop:n?"none":"3px solid "+a.navy,borderRadius:n?8:"0 0 8px 8px",zIndex:200,padding:n?"5px 0":"8px 0"},children:r.sub.map(x=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!n&&h(x.label),onMouseLeave:()=>!n&&h(null),children:[e.jsxs("div",{onClick:p=>{n&&x.sub&&(p.stopPropagation(),d(x.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:n?"10px 16px":"10px 18px",borderBottom:n?"none":"1px solid #f8f9fa",cursor:n&&x.sub?"pointer":"default"},onMouseEnter:p=>{n||(p.currentTarget.style.background="#f4f6f9")},onMouseLeave:p=>{n||(p.currentTarget.style.background="transparent")},children:[e.jsx(W,{to:x.href||"#",style:{fontSize:13,fontWeight:600,color:a.navy,display:"block",width:"100%"},children:x.label}),x.sub&&e.jsx("span",{style:{fontSize:12,color:a.gold,marginLeft:8},children:n?c===x.label?"▴":"▾":"▶"})]}),x.sub&&c===x.label&&e.jsx("div",{style:{position:n?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:260,boxShadow:n?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:n?"none":"3px solid "+a.gold,borderRadius:n?4:"0 8px 8px 8px",margin:n?"0 16px 10px":0,borderLeft:n?"2px solid "+a.gold:"none"},children:x.sub.map(p=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!n&&f(p.label),onMouseLeave:()=>!n&&f(null),children:[e.jsxs("div",{onClick:y=>{n&&p.sub&&(y.stopPropagation(),s(p.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderBottom:n?"none":"1px solid #f8f9fa",cursor:n&&p.sub?"pointer":"default"},onMouseEnter:y=>{n||(y.currentTarget.style.background="#f4f6f9")},onMouseLeave:y=>{n||(y.currentTarget.style.background="transparent")},children:[e.jsx(W,{to:p.href||"#",style:{fontSize:12.5,fontWeight:600,color:"#444",display:"block",width:"100%"},children:p.label}),p.sub&&e.jsx("span",{style:{fontSize:11,color:a.gold,marginLeft:8},children:n?b===p.label?"▴":"▾":"▶"})]}),p.sub&&b===p.label&&e.jsx("div",{style:{position:n?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:260,boxShadow:n?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:n?"none":"3px solid "+a.navy,borderRadius:n?4:"0 8px 8px 8px",margin:n?"0 16px 10px":0,borderLeft:n?"2px solid "+a.navy:"none"},children:p.sub.map(y=>e.jsx(W,{to:y.href||"#",style:{display:"block",padding:"10px 16px",fontSize:12,color:"#555",borderBottom:n?"none":"1px solid #f8f9fa"},onMouseEnter:C=>{n||(C.currentTarget.style.background="#f4f6f9")},onMouseLeave:C=>{n||(C.currentTarget.style.background="transparent")},children:y.label},y.label))})]},p.label))})]},x.label))})]},r.label)),e.jsxs("button",{onClick:i,style:{background:a.gold,color:"#000",border:"none",padding:"8px 24px",borderRadius:6,cursor:"pointer",fontSize:13,fontWeight:800,marginLeft:n?0:20,marginTop:n?12:0,width:n?"100%":"auto",boxShadow:"0 2px 5px rgba(0,0,0,.2)",whiteSpace:"nowrap",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},children:[e.jsx("span",{style:{fontSize:18},children:"⚙️"})," Admin Login"]})]})]})})}const Qe=()=>e.jsxs("footer",{style:{background:a.navyDark,color:"#fff",padding:"80px 20px 40px",borderTop:`4px solid ${a.gold}`},children:[e.jsxs("div",{style:{maxWidth:1300,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:"50px"},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px",marginBottom:"25px"},children:[e.jsx("div",{style:{width:"70px",height:"70px",background:"#fff",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",padding:"5px",boxShadow:`0 0 15px ${a.gold}40`},children:e.jsx("img",{src:"/gncollege-website/images/logo.png",alt:"GNC Logo",style:{width:"100%",height:"100%",objectFormat:"contain"},onError:i=>{i.target.src="https://via.placeholder.com/70?text=GNC"}})}),e.jsxs("div",{children:[e.jsx("h3",{style:{margin:0,fontSize:"18px",fontWeight:800,letterSpacing:"0.5px"},children:"GURU NANAK COLLEGE"}),e.jsx("p",{style:{margin:0,color:a.gold,fontSize:"11px",fontWeight:700},children:"DHANBAD, JHARKHAND"})]})]}),e.jsx("p",{style:{fontSize:"14px",lineHeight:"1.7",color:"#aab",marginBottom:"25px"},children:"A Sikh Minority Degree College established in 1970, dedicated to providing quality education and fostering individual development."}),e.jsxs("div",{style:{display:"flex",gap:"15px",marginTop:"20px"},children:[e.jsx("style",{children:`
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
                  background: ${a.gold}; /* Hover par Gold background */
                  color: ${a.navyDark}; /* Hover par Navy Blue icon */
                  transform: translateY(-5px) scale(1.1); /* Halka upar uthega aur bada hoga */
                  box-shadow: 0 5px 15px rgba(244, 160, 35, 0.4); /* Gold Glow effect */
                }
              `}),ne.map(i=>e.jsx("a",{href:i.href,target:"_blank",rel:"noopener noreferrer",className:"footer-social-icon","aria-label":i.label,children:i.id==="twitter"?"𝕏":i.id==="youtube"?"▶":i.label.charAt(0)},i.id))]})]}),e.jsxs("div",{children:[e.jsxs("h4",{style:{fontSize:"18px",fontWeight:800,marginBottom:"25px",position:"relative",paddingBottom:"10px"},children:["Quick Links",e.jsx("span",{style:{position:"absolute",bottom:0,left:0,width:"40px",height:"3px",background:a.gold}})]}),e.jsx("ul",{style:{listStyle:"none",padding:0,fontSize:"14px"},children:["About College","Academic Programs","Notice Board","Admission 2024","Photo Gallery","Contact Us"].map(i=>e.jsx("li",{style:{marginBottom:"12px"},children:e.jsxs("a",{href:"#",style:{color:"#aab",textDecoration:"none",transition:"0.3s"},onMouseOver:o=>o.target.style.color=a.gold,onMouseOut:o=>o.target.style.color="#aab",children:[e.jsx("span",{style:{color:a.gold,marginRight:"8px"},children:"›"})," ",i]})},i))})]}),e.jsxs("div",{children:[e.jsxs("h4",{style:{fontSize:"18px",fontWeight:800,marginBottom:"25px",position:"relative",paddingBottom:"10px"},children:["Get In Touch",e.jsx("span",{style:{position:"absolute",bottom:0,left:0,width:"40px",height:"3px",background:a.gold}})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"15px",fontSize:"14px",color:"#aab"},children:[e.jsxs("div",{style:{display:"flex",gap:"12px"},children:[e.jsx("span",{style:{color:a.gold},children:"📍"}),e.jsx("span",{children:"Barmasiya, Dhanbad, Jharkhand - 826001"})]}),e.jsxs("div",{style:{display:"flex",gap:"12px"},children:[e.jsx("span",{style:{color:a.gold},children:"📞"}),e.jsx("a",{href:"tel:+917903340991",style:{color:"inherit",textDecoration:"none"},children:"+91-7903340991"})]}),e.jsxs("div",{style:{display:"flex",gap:"12px"},children:[e.jsx("span",{style:{color:a.gold},children:"✉️"}),e.jsx("a",{href:"mailto:principal@gncollege.org",style:{color:"inherit",textDecoration:"none"},children:"principal@gncollege.org"})]})]})]}),e.jsxs("div",{children:[e.jsxs("h4",{style:{fontSize:"18px",fontWeight:800,marginBottom:"25px",position:"relative",paddingBottom:"10px"},children:["Our Location",e.jsx("span",{style:{position:"absolute",bottom:0,left:0,width:"40px",height:"3px",background:a.gold}})]}),e.jsx("div",{style:{width:"100%",height:"180px",borderRadius:"15px",overflow:"hidden",border:"2px solid rgba(255,255,255,0.1)"},children:e.jsx("iframe",{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.089853381653!2d86.43232147533682!3d23.797658878638367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69707963d7e8b%3A0x86733221469e7f7b!2sGuru%20Nanak%20College%20Dhanbad!5e0!3m2!1sen!2sin!4v1708688000000!5m2!1sen!2sin",width:"100%",height:"100%",style:{border:0},allowFullScreen:"",loading:"lazy"})})]})]}),e.jsx("div",{style:{maxWidth:1300,margin:"60px auto 0",padding:"30px 0 0",borderTop:"1px solid rgba(255,255,255,0.05)",textAlign:"center"},children:e.jsxs("p",{style:{margin:0,fontSize:"13px",color:"#778",fontWeight:600},children:["© 2026 ",e.jsx("span",{style:{color:a.gold},children:"Guru Nanak College, Dhanbad"}),". All Rights Reserved. | Developed by Pankaj Kumar Prasad"]})})]}),Ze=()=>e.jsxs("div",{className:"top-bar-container",style:{background:a.navyDark,color:"#e2e8f0",padding:"8px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12.5,fontWeight:500,letterSpacing:"0.4px",borderBottom:"1px solid rgba(255,255,255,0.05)"},children:[e.jsx("style",{children:`
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
        `}),e.jsxs("div",{className:"contact-group",children:[e.jsxs("a",{href:"tel:+917903340991",className:"top-bar-link",children:[e.jsx("span",{style:{fontSize:"15px",color:a.gold},children:"📞"})," +91-7903340991"]}),e.jsxs("a",{href:"mailto:principal@gncollege.org",className:"top-bar-link",children:[e.jsx("span",{style:{fontSize:"15px",color:a.gold},children:"✉️"})," principal@gncollege.org"]})]}),e.jsx("div",{style:{display:"flex",gap:12},children:ne.map(i=>{let o=i.label;return i.id==="twitter"&&(o="𝕏"),i.id==="youtube"&&(o="▶"),e.jsx("a",{href:i.href,"aria-label":i.id,target:"_blank",rel:"noopener noreferrer",className:"social-icon",children:o},i.id)})})]}),et={apiKey:"AIzaSyDeJWUUoU_MJ4ubpbfaLZemvnEr82LF5YA",authDomain:"gnc-college-web.firebaseapp.com",projectId:"gnc-college-web",storageBucket:"gnc-college-web.firebasestorage.app",messagingSenderId:"78901559372",appId:"1:78901559372:web:f76cb101f8aec2daadb4e9"},pe=Te(et),k=Be(pe);Me(pe);const K=({value:i,onChange:o,placeholder:m})=>{const g=l.useRef(null);l.useEffect(()=>{g.current&&i!==g.current.innerHTML&&(g.current.innerHTML=i||"")},[i]);const c=(u,v=null)=>{document.execCommand(u,!1,v),g.current&&(g.current.focus(),o(g.current.innerHTML))},h=()=>{g.current&&o(g.current.innerHTML)},b=()=>{const u=prompt("Enter the link URL (e.g., https://google.com): ","https://");u&&c("createLink",u)},f=()=>{const u=prompt("Enter the Image URL: ","https://");u&&c("insertImage",u)},n={padding:"6px 10px",background:"#fff",border:"1px solid #cbd5e0",borderRadius:"6px",cursor:"pointer",fontSize:"15px",color:a.navy,fontWeight:"bold"},w={padding:"6px",background:"#fff",border:"1px solid #cbd5e0",borderRadius:"6px",cursor:"pointer",fontSize:"14px",color:a.navy,fontWeight:"bold"};return e.jsxs("div",{style:{border:"2px solid #e2e8f0",borderRadius:"10px",overflow:"hidden",background:"#fff"},children:[e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px",padding:"12px",background:"#f8fafc",borderBottom:"2px solid #e2e8f0",alignItems:"center"},children:[e.jsx("button",{type:"button",onClick:()=>c("bold"),style:n,title:"Bold",children:"B"}),e.jsx("button",{type:"button",onClick:()=>c("italic"),style:{...n,fontStyle:"italic"},title:"Italic",children:"I"}),e.jsx("button",{type:"button",onClick:()=>c("underline"),style:{...n,textDecoration:"underline"},title:"Underline",children:"U"}),e.jsx("span",{style:{width:"1px",background:"#cbd5e0",margin:"0 5px"}}),e.jsxs("select",{onChange:u=>c("formatBlock",u.target.value),style:w,children:[e.jsx("option",{value:"P",children:"Paragraph"}),e.jsx("option",{value:"H1",children:"Heading 1"}),e.jsx("option",{value:"H2",children:"Heading 2"}),e.jsx("option",{value:"H3",children:"Heading 3"})]}),e.jsxs("select",{onChange:u=>c("fontSize",u.target.value),style:w,children:[e.jsx("option",{value:"",children:"Font Size"}),e.jsx("option",{value:"1",children:"Small"}),e.jsx("option",{value:"3",children:"Normal"}),e.jsx("option",{value:"5",children:"Large"})]}),e.jsx("span",{style:{width:"1px",background:"#cbd5e0",margin:"0 5px"}}),e.jsx("input",{type:"color",onChange:u=>c("foreColor",u.target.value),title:"Text Color",style:{width:"32px",height:"32px",padding:"0",border:"none",cursor:"pointer",borderRadius:"6px"}}),e.jsx("span",{style:{width:"1px",background:"#cbd5e0",margin:"0 5px"}}),e.jsx("button",{type:"button",onClick:()=>c("justifyLeft"),style:n,children:"⫷"}),e.jsx("button",{type:"button",onClick:()=>c("justifyCenter"),style:n,children:"≡"}),e.jsx("button",{type:"button",onClick:()=>c("justifyRight"),style:n,children:"⫸"}),e.jsx("span",{style:{width:"1px",background:"#cbd5e0",margin:"0 5px"}}),e.jsx("button",{type:"button",onClick:()=>c("insertOrderedList"),style:n,children:"1."}),e.jsx("button",{type:"button",onClick:()=>c("insertUnorderedList"),style:n,children:"•"}),e.jsx("span",{style:{width:"1px",background:"#cbd5e0",margin:"0 5px"}}),e.jsx("button",{type:"button",onClick:b,style:n,children:"🔗"}),e.jsx("button",{type:"button",onClick:f,style:n,children:"🖼️"})]}),e.jsx("div",{ref:g,contentEditable:"true",onInput:h,onBlur:h,style:{minHeight:"200px",maxHeight:"500px",overflowY:"auto",padding:"20px",outline:"none",fontSize:"15px",lineHeight:"1.6"},"data-placeholder":m})]})},tt=i=>i.replace(/^\//,"").replace(/-/g," ").split("/").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" > ");function at({onClose:i,notices:o,pages:m,events:g,gallery:c,placeholderPaths:h,announcements:b,pdfReports:f}){const[n,w]=l.useState("pages"),[u,v]=l.useState(!1),[z,d]=l.useState(!1),[s,r]=l.useState("update"),[x,p]=l.useState(null),[y,C]=l.useState(null),[A,_]=l.useState(null),[P,ie]=l.useState(null),[$,se]=l.useState(null),[N,R]=l.useState({title:"",desc:"",type:"WORKSHOP",day:"",month:"",location:"",status:"upcoming",imageUrl:""}),[T,X]=l.useState({text:"",link:"",type:"General"}),[S,U]=l.useState({title:"",content:"",path:"",slug:"",contentType:"html"}),[B,O]=l.useState({text:"",link:"",type:"News"}),[L,F]=l.useState({title:"",link:"",type:"Document"}),[I,V]=l.useState({title:"",cat:"Seminars",src:""}),me=async t=>{if(t.preventDefault(),!I.src.trim())return alert("Image path is required.");v(!0);try{await G(M(k,"gallery"),{title:I.title,cat:I.cat,src:I.src,createdAt:E()}),alert("Photo published to Gallery successfully!"),V({title:"",cat:"Seminars",src:""})}catch(j){alert("Upload Error: "+j.message)}v(!1)},ge=async t=>{if(window.confirm("Are you sure you want to remove this photo?"))try{await H(D(k,"gallery",t)),alert("Photo removed successfully!")}catch(j){alert("Error: "+j.message)}},ue=async t=>{t.preventDefault(),v(!0);try{y?(await Y(D(k,"events",y.id),{...N,updatedAt:E()}),alert("Event updated!")):(await G(M(k,"events"),{...N,createdAt:E()}),alert("Event added!")),Q()}catch(j){alert("Error: "+j.message)}v(!1)},he=async t=>{if(t.preventDefault(),!T.text.trim())return alert("Notice text is required");v(!0);try{A?(await Y(D(k,"notices",A.id),{...T,updatedAt:E()}),alert("Notice updated!")):(await G(M(k,"notices"),{...T,date:new Date().toISOString(),isNew:!0,createdAt:E()}),alert("Notice published!")),Z()}catch(j){alert("Error: "+j.message)}v(!1)},fe=async t=>{if(t.preventDefault(),!B.text.trim())return alert("Announcement text is required");v(!0);try{P?(await Y(D(k,"announcements",P.id),{...B,updatedAt:E()}),alert("News updated!")):(await G(M(k,"announcements"),{...B,date:new Date().toISOString(),createdAt:E()}),alert("News published!")),ee()}catch(j){alert("Error: "+j.message)}v(!1)},be=async t=>{if(t.preventDefault(),!L.title.trim()||!L.link.trim())return alert("Title and Link are required");v(!0);try{$?(await Y(D(k,"pdfReports",$.id),{...L,updatedAt:E()}),alert("Document updated!")):(await G(M(k,"pdfReports"),{...L,date:new Date().toISOString(),createdAt:E()}),alert("Document published!")),te()}catch(j){alert("Error: "+j.message)}v(!1)},ye=async t=>{if(t.preventDefault(),s==="update"&&(!S.title||!S.path))return alert("Title and Menu Link required");if(s==="create"&&(!S.title||!S.slug))return alert("Title and Slug required");v(!0);try{const j={title:S.title.trim(),content:S.content,contentType:S.contentType,path:s==="update"?S.path:"",slug:s==="create"?S.slug.trim():""};x?(await Y(D(k,"pages",x.id),{...j,updatedAt:E()}),alert("Page updated!")):(await G(M(k,"pages"),{...j,createdAt:E()}),alert("Page created!")),ae()}catch(j){alert("Error: "+j.message)}v(!1)},ve=t=>{C(t),R({title:t.title||"",desc:t.desc||"",type:t.type||"WORKSHOP",day:t.day||"",month:t.month||"",location:t.location||"",status:t.status||"upcoming",imageUrl:t.imageUrl||""})},je=t=>{_(t),X({text:t.text||"",link:t.link||"",type:t.type||"General"})},we=t=>{ie(t),O({text:t.text||"",link:t.link||"",type:t.type||"News"})},ke=t=>{se(t),F({title:t.title||"",link:t.link||"",type:t.type||"Document"})},Ne=t=>{p(t),U({title:t.title,content:t.content,path:t.path||"",slug:t.slug||"",contentType:t.contentType||"html"}),r(t.path?"update":"create")},Q=()=>{C(null),R({title:"",desc:"",type:"WORKSHOP",day:"",month:"",location:"",status:"upcoming",imageUrl:""})},Z=()=>{_(null),X({text:"",link:"",type:"General"})},ee=()=>{ie(null),O({text:"",link:"",type:"News"})},te=()=>{se(null),F({title:"",link:"",type:"Document"})},ae=()=>{p(null),U({title:"",content:"",path:"",slug:"",contentType:"html"})},Se=async t=>{if(window.confirm("Delete this event?"))try{await H(D(k,"events",t)),alert("Deleted!"),y?.id===t&&Q()}catch(j){alert(j.message)}},Ce=async t=>{if(window.confirm("Delete this notice?"))try{await H(D(k,"notices",t)),alert("Deleted!"),A?.id===t&&Z()}catch(j){alert(j.message)}},ze=async t=>{if(window.confirm("Delete this news?"))try{await H(D(k,"announcements",t)),alert("Deleted!"),P?.id===t&&ee()}catch(j){alert(j.message)}},Ae=async t=>{if(window.confirm("Delete this Document?"))try{await H(D(k,"pdfReports",t)),alert("Deleted!"),$?.id===t&&te()}catch(j){alert(j.message)}},Ee=async t=>{if(window.confirm("Delete this page?"))try{await H(D(k,"pages",t)),alert("Deleted!"),x?.id===t&&ae()}catch(j){alert(j.message)}};return e.jsxs("div",{className:"admin-wrapper",children:[e.jsx("style",{children:`
        .admin-wrapper { display: flex; height: 100vh; width: 100vw; position: fixed; top: 0; left: 0; z-index: 99999; background: #f4f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; overflow: hidden; }
        .admin-sidebar { width: 280px; background: linear-gradient(180deg, ${a.navyDark} 0%, #0a1832 100%); color: white; display: flex; flex-direction: column; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 4px 0 25px rgba(0,0,0,0.15); z-index: 10001; }
        .sidebar-header { padding: 30px 25px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; }
        .sidebar-title { font-size: 20px; font-weight: 800; letter-spacing: 0.5px; margin: 0; color: ${a.gold}; text-transform: uppercase; }
        .nav-menu { flex: 1; padding: 20px 0; overflow-y: auto; }
        .nav-item { padding: 16px 30px; display: flex; align-items: center; gap: 16px; cursor: pointer; transition: all 0.2s ease; font-weight: 600; font-size: 15px; color: #a0aec0; border-left: 4px solid transparent; }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .nav-item.active { background: rgba(244, 160, 35, 0.1); border-left-color: ${a.gold}; color: ${a.gold}; }
        .nav-icon { font-size: 20px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); }
        .admin-main { flex: 1; overflow-y: auto; padding: 40px; position: relative; }
        .card { background: #ffffff; border-radius: 16px; padding: 35px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); margin-bottom: 35px; border: 1px solid #edf2f7; }
        .card-title { font-size: 22px; font-weight: 800; color: ${a.navy}; margin-bottom: 25px; display: flex; align-items: center; gap: 12px; border-bottom: 2px solid #f4f7fa; padding-bottom: 15px; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .form-group { margin-bottom: 20px; }
        .label { display: block; font-size: 12.5px; font-weight: 700; color: #4a5568; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .input { width: 100%; padding: 14px 18px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 15px; outline: none; transition: all 0.2s ease; background: #f8fafc; color: #2d3748; font-family: inherit; box-sizing: border-box; }
        .input:focus { border-color: ${a.gold}; background: #fff; box-shadow: 0 0 0 4px rgba(244,160,35,0.15); }
        .btn-group { display: flex; gap: 15px; margin-top: 10px; }
        .btn { padding: 14px 28px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; border: none; font-size: 14.5px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-primary { background: ${a.navy}; color: white; }
        .btn-primary:hover:not(:disabled) { background: ${a.navyDark}; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(15,35,71,0.25); }
        .btn-gold { background: ${a.gold}; color: ${a.navyDark}; }
        .btn-danger { background: #fee2e2; color: #e53e3e; }
        .btn-secondary { background: #edf2f7; color: #4a5568; }
        .data-list { display: flex; flex-direction: column; gap: 15px; }
        .data-item { display: flex; justify-content: space-between; align-items: center; padding: 20px 25px; border: 1px solid #edf2f7; border-radius: 12px; background: #fff; }
        .data-content h4 { margin: 0 0 6px; color: ${a.navy}; font-size: 16px; font-weight: 700; }
        .badge { font-size: 11px; padding: 4px 10px; border-radius: 6px; font-weight: 700; display: inline-block; margin-bottom: 8px; }
        
        .mobile-topbar { display: none; }
        .overlay { display: none; }
        @media (max-width: 1024px) {
          .admin-sidebar { position: fixed; transform: translateX(-100%); height: 100%; }
          .admin-sidebar.open { transform: translateX(0); }
          .mobile-topbar { display: flex; background: ${a.navyDark}; color: white; padding: 15px 20px; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 10000; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .admin-main { padding: 20px; }
          .card { padding: 25px; margin-bottom: 25px; }
          .data-item { flex-direction: column; align-items: flex-start; gap: 15px; }
          .action-btns { width: 100%; display: flex; justify-content: flex-end; }
        }
      `}),e.jsxs("div",{className:"mobile-topbar",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px"},children:[e.jsx("button",{onClick:()=>d(!0),style:{background:"transparent",border:"none",color:"#fff",fontSize:"28px"},children:"☰"}),e.jsx("h2",{style:{margin:0,fontSize:"18px",fontWeight:800,color:a.gold},children:"GNC Admin"})]}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px",fontSize:"13px"},onClick:i,children:"Exit"})]}),e.jsxs("div",{className:`admin-sidebar ${z?"open":""}`,children:[e.jsxs("div",{className:"sidebar-header",children:[e.jsx("h2",{className:"sidebar-title",children:"Workspace"}),z&&e.jsx("button",{onClick:()=>d(!1),style:{background:"transparent",color:"#fff",border:"none",fontSize:"24px"},children:"✕"})]}),e.jsx("div",{className:"nav-menu",children:[{id:"pages",label:"Dynamic Pages",icon:"📄"},{id:"gallery",label:"Photo Gallery",icon:"📸"},{id:"notices",label:"Notice Board",icon:"📢"},{id:"announcements",label:"Academic News",icon:"📣"},{id:"pdfReports",label:"E-Documents",icon:"📁"},{id:"events",label:"Campus Events",icon:"🏆"}].map(t=>e.jsxs("div",{className:`nav-item ${n===t.id?"active":""}`,onClick:()=>{w(t.id),d(!1)},children:[e.jsx("span",{className:"nav-icon",children:t.icon})," ",e.jsx("span",{children:t.label})]},t.id))}),e.jsx("div",{style:{padding:"25px",borderTop:"1px solid rgba(255,255,255,0.08)"},children:e.jsx("button",{className:"btn btn-danger",style:{width:"100%",justifyContent:"center"},onClick:i,children:"🚪 Logout Dashboard"})})]}),e.jsxs("div",{className:"admin-main",children:[n==="gallery"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📸 Add to Photo Gallery"}),e.jsxs("form",{onSubmit:me,children:[e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Photo Title"}),e.jsx("input",{className:"input",placeholder:"e.g. Independence Day Celebration",value:I.title,onChange:t=>V({...I,title:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Category"}),e.jsxs("select",{className:"input",value:I.cat,onChange:t=>V({...I,cat:t.target.value}),children:[e.jsx("option",{value:"Seminars",children:"Seminars"}),e.jsx("option",{value:"Cultural Fest",children:"Cultural Fest"}),e.jsx("option",{value:"Guest Visit",children:"Guest Visit"}),e.jsx("option",{value:"Campus",children:"Campus"}),e.jsx("option",{value:"Departments",children:"Departments"}),e.jsx("option",{value:"NSS Programs",children:"NSS Programs"})]})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Image Path (from public folder)"}),e.jsx("input",{className:"input",placeholder:"e.g. /images/pf10.jpeg",value:I.src,onChange:t=>V({...I,src:t.target.value}),required:!0})]}),e.jsx("div",{className:"btn-group",children:e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:u,children:u?"Processing...":"🚀 Publish Photo"})})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"🖼️ Live Cloud Gallery Images"}),e.jsx("div",{className:"data-list",style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))",gap:"20px",flexDirection:"unset"},children:(c||[]).map(t=>e.jsxs("div",{style:{border:"1px solid #edf2f7",borderRadius:"12px",overflow:"hidden",background:"#fff"},children:[e.jsx("img",{src:t.src,alt:t.title,style:{width:"100%",height:"180px",objectFit:"cover"}}),e.jsxs("div",{style:{padding:"15px"},children:[e.jsx("span",{className:"badge",style:{background:"#fff3cd",color:"#856404"},children:t.cat}),e.jsx("h4",{style:{margin:"5px 0",fontSize:"15px",color:a.navy},children:t.title}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 0",width:"100%",marginTop:"10px",fontSize:"13px"},onClick:()=>ge(t.id),children:"🗑️ Remove Photo"})]})]},t.id))})]})]}),n==="pages"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📄 ",x?"Edit Page Details":"Design New Page"]}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"20px",marginBottom:"30px",background:"#f8fafc",padding:"20px",borderRadius:"12px",border:"1px solid #edf2f7"},children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer",fontWeight:600,color:a.navy},children:[e.jsx("input",{type:"radio",value:"update",checked:s==="update",onChange:()=>r("update")})," Update Existing Menu Link"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer",fontWeight:600,color:a.navy},children:[e.jsx("input",{type:"radio",value:"create",checked:s==="create",onChange:()=>r("create")})," Create Custom URL Page"]})]}),e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Page Title"}),e.jsx("input",{className:"input",placeholder:"e.g. Computer Science",value:S.title,onChange:t=>U({...S,title:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:s==="update"?"Target Menu Link":"Custom URL Slug"}),s==="update"?e.jsxs("select",{className:"input",value:S.path,onChange:t=>U({...S,path:t.target.value,slug:""}),required:!0,children:[e.jsx("option",{value:"",children:"-- Select Menu --"}),(h||[]).map(t=>e.jsx("option",{value:t,children:tt(t)},t))]}):e.jsx("input",{className:"input",placeholder:"e.g. computer-science",value:S.slug,onChange:t=>U({...S,slug:t.target.value.toLowerCase().trim().replace(/\s+/g,"-"),path:""}),required:!0})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Page Content"}),e.jsx(K,{value:S.content,onChange:t=>U({...S,content:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{className:"btn btn-gold",onClick:ye,disabled:u,children:u?"Processing...":x?"💾 Save Changes":"🚀 Publish Page"}),x&&e.jsx("button",{className:"btn btn-secondary",onClick:ae,children:"Cancel"})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📂 Live Pages Database"}),e.jsx("div",{className:"data-list",children:(m||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:`4px solid ${a.navy}`},children:[e.jsxs("div",{className:"data-content",children:[e.jsx("h4",{children:t.title}),e.jsx("a",{href:t.path?`/#${t.path}`:`/#/p/${t.slug}`,target:"_blank",rel:"noopener noreferrer",style:{fontSize:"13px",color:a.gold,textDecoration:"none",fontWeight:700},children:"🔗 View Live Page"})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>Ne(t),children:"✏️ Edit"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>Ee(t.id),children:"🗑️"})]})]},t.id))})]})]}),n==="notices"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📢 ",A?"Edit Notice":"Broadcast New Notice"]}),e.jsxs("form",{onSubmit:he,children:[e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Category"}),e.jsxs("select",{className:"input",value:T.type,onChange:t=>X({...T,type:t.target.value}),children:[e.jsx("option",{children:"General"}),e.jsx("option",{children:"Examination"}),e.jsx("option",{children:"Admission"}),e.jsx("option",{children:"Holiday"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Attachment URL (Drive/PDF)"}),e.jsx("input",{className:"input",placeholder:"Optional Link",value:T.link,onChange:t=>X({...T,link:t.target.value})})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Notice Message (Rich Text)"}),e.jsx(K,{value:T.text,onChange:t=>X({...T,text:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:u,children:u?"Processing...":A?"💾 Update Notice":"🚀 Broadcast Notice"}),A&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:Z,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📋 Recent Notices"}),e.jsx("div",{className:"data-list",children:(o||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:`5px solid ${a.gold}`},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsx("span",{className:"badge",style:{background:"#fff3cd",color:"#856404"},children:t.type}),e.jsxs("span",{style:{fontSize:"12px",marginLeft:"12px",color:"#718096",fontWeight:600},children:["📅 ",t.date?new Date(t.date).toLocaleDateString("en-GB"):"N/A"]}),e.jsx("div",{dangerouslySetInnerHTML:{__html:t.text},style:{margin:"8px 0",fontSize:"15px",color:"#1a202c",fontWeight:600}}),t.link&&e.jsx("a",{href:t.link,target:"_blank",rel:"noreferrer",style:{fontSize:"12.5px",color:a.navy,fontWeight:700,textDecoration:"none"},children:"📎 Open Attachment"})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>je(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>Ce(t.id),children:"🗑️"})]})]},t.id))})]})]}),n==="announcements"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📣 ",P?"Edit News":"Publish Academic News"]}),e.jsxs("form",{onSubmit:fe,children:[e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"News Category"}),e.jsxs("select",{className:"input",value:B.type,onChange:t=>O({...B,type:t.target.value}),children:[e.jsx("option",{children:"News"}),e.jsx("option",{children:"Achievement"}),e.jsx("option",{children:"Update"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Reference Link (Optional)"}),e.jsx("input",{className:"input",placeholder:"URL",value:B.link,onChange:t=>O({...B,link:t.target.value})})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"News Content (Rich Text)"}),e.jsx(K,{value:B.text,onChange:t=>O({...B,text:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:u,children:P?"💾 Update News":"🚀 Publish News"}),P&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:ee,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"🗞️ Published News"}),e.jsx("div",{className:"data-list",children:(b||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:"5px solid #d32f2f"},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsx("span",{className:"badge",style:{background:"#ffe5e5",color:"#d32f2f"},children:t.type}),e.jsx("div",{dangerouslySetInnerHTML:{__html:t.text},style:{margin:"8px 0",fontSize:"15px",color:"#1a202c",fontWeight:600}})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>we(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>ze(t.id),children:"🗑️"})]})]},t.id))})]})]}),n==="pdfReports"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📁 ",$?"Edit Document":"Upload E-Document"]}),e.jsxs("form",{onSubmit:be,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Document Title"}),e.jsx("input",{className:"input",value:L.title,onChange:t=>F({...L,title:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Document URL (Drive/PDF Link)"}),e.jsx("input",{className:"input",value:L.link,onChange:t=>F({...L,link:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Document Type"}),e.jsxs("select",{className:"input",value:L.type,onChange:t=>F({...L,type:t.target.value}),children:[e.jsx("option",{children:"Document"}),e.jsx("option",{children:"Report"}),e.jsx("option",{children:"Syllabus"})]})]})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:u,children:$?"💾 Update Doc":"🚀 Publish Doc"}),$&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:te,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📚 Live Documents"}),e.jsx("div",{className:"data-list",children:(f||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:"5px solid #10b981"},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsx("span",{className:"badge",style:{background:"#e6f7f1",color:"#047857"},children:t.type}),e.jsx("h4",{children:t.title}),e.jsx("a",{href:t.link,target:"_blank",rel:"noreferrer",style:{fontSize:"13px",color:"#10b981",textDecoration:"none",fontWeight:700},children:"⬇️ View / Download Source"})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>ke(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>Ae(t.id),children:"🗑️"})]})]},t.id))})]})]}),n==="events"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["🏆 ",y?"Edit Campus Event":"Add Campus Event"]}),e.jsxs("form",{onSubmit:ue,children:[e.jsxs("div",{className:"form-grid",style:{gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))"},children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Event Title"}),e.jsx("input",{className:"input",value:N.title,onChange:t=>R({...N,title:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Event Type"}),e.jsxs("select",{className:"input",value:N.type,onChange:t=>R({...N,type:t.target.value}),children:[e.jsx("option",{children:"WORKSHOP"}),e.jsx("option",{children:"SEMINAR"}),e.jsx("option",{children:"CULTURAL"}),e.jsx("option",{children:"SPORTS"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Day (e.g. 24)"}),e.jsx("input",{className:"input",value:N.day,onChange:t=>R({...N,day:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Month (e.g. MAR)"}),e.jsx("input",{className:"input",value:N.month,onChange:t=>R({...N,month:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Location"}),e.jsx("input",{className:"input",value:N.location,onChange:t=>R({...N,location:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Status"}),e.jsxs("select",{className:"input",value:N.status,onChange:t=>R({...N,status:t.target.value}),children:[e.jsx("option",{value:"upcoming",children:"Upcoming Event"}),e.jsx("option",{value:"recent",children:"Recent Event"})]})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Image Path (from public folder)"}),e.jsx("input",{className:"input",placeholder:"e.g. /images/sports-day.jpg",value:N.imageUrl,onChange:t=>R({...N,imageUrl:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Event Description (Rich Text)"}),e.jsx(K,{value:N.desc,onChange:t=>R({...N,desc:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:u,children:y?"💾 Update Event":"🚀 Publish Event"}),y&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:Q,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📆 Event Roster"}),e.jsx("div",{className:"data-list",children:(g||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:"5px solid #8b5cf6"},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsx("span",{className:"badge",style:{background:"#ede9fe",color:"#6d28d9"},children:t.type}),e.jsx("h4",{children:t.title}),e.jsx("div",{dangerouslySetInnerHTML:{__html:t.desc},style:{fontSize:"13px",color:"#666",marginTop:"5px"}}),e.jsxs("p",{style:{marginTop:"5px",fontSize:"12px",fontWeight:"bold"},children:["📍 ",t.location||"Campus","   |   📅 ",t.day," ",t.month]})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>ve(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>Se(t.id),children:"🗑️"})]})]},t.id))})]})]})]})]})}function nt({onSuccess:i,onClose:o}){const[m,g]=l.useState(""),[c,h]=l.useState(""),[b,f]=l.useState(""),[n,w]=l.useState(!1),u=v=>{v.preventDefault(),f(""),w(!0),setTimeout(()=>{m==="admin"&&c==="admin123"?i():(f("❌ Incorrect Username or Password"),w(!1))},800)};return e.jsxs("div",{className:"login-overlay",children:[e.jsx("style",{children:`
        .login-overlay {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(15, 35, 71, 0.85); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          z-index: 100000; animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .login-box {
          background: #fff; width: 100%; max-width: 400px;
          border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          overflow: hidden; position: relative;
          transform: translateY(0); animation: slideUp 0.4s ease;
        }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .login-header {
          background: linear-gradient(135deg, ${a.navy} 0%, #0a1832 100%);
          padding: 30px 20px; text-align: center; color: #fff;
          border-bottom: 4px solid ${a.gold};
        }
        .login-header h2 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px; }
        .login-header p { margin: 8px 0 0; font-size: 13px; color: #cbd5e1; }

        .close-btn {
          position: absolute; top: 15px; right: 15px;
          background: rgba(255,255,255,0.1); border: none; color: #fff;
          width: 30px; height: 30px; border-radius: 50%; font-size: 16px;
          cursor: pointer; transition: 0.3s;
        }
        .close-btn:hover { background: #e53e3e; transform: rotate(90deg); }

        .login-form { padding: 30px; }
        .input-group { margin-bottom: 20px; }
        .input-label { display: block; font-size: 13px; font-weight: 700; color: ${a.navy}; margin-bottom: 8px; text-transform: uppercase; }
        .login-input {
          width: 100%; padding: 14px 15px; border: 2px solid #e2e8f0;
          border-radius: 10px; font-size: 15px; transition: 0.3s;
          box-sizing: border-box; outline: none; background: #f8fafc;
        }
        .login-input:focus { border-color: ${a.gold}; background: #fff; box-shadow: 0 0 0 4px rgba(244,160,35,0.1); }

        .login-btn {
          width: 100%; padding: 15px; background: ${a.gold}; color: ${a.navyDark};
          border: none; border-radius: 10px; font-size: 16px; font-weight: 800;
          cursor: pointer; transition: 0.3s; display: flex; justify-content: center; gap: 10px;
        }
        .login-btn:hover { background: #e08e1a; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(244,160,35,0.3); }
        .login-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .error-box {
          background: #fee2e2; color: #e53e3e; padding: 12px;
          border-radius: 8px; font-size: 13px; font-weight: 700;
          text-align: center; margin-bottom: 20px; border: 1px solid #fecaca;
        }
      `}),e.jsxs("div",{className:"login-box",children:[e.jsx("button",{className:"close-btn",onClick:o,title:"Close",children:"✕"}),e.jsxs("div",{className:"login-header",children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"10px"},children:"🛡️"}),e.jsx("h2",{children:"Admin Portal"}),e.jsx("p",{children:"Authorized Personnel Only"})]}),e.jsxs("form",{className:"login-form",onSubmit:u,children:[b&&e.jsx("div",{className:"error-box",children:b}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"input-label",children:"Username"}),e.jsx("input",{type:"text",className:"login-input",placeholder:"Enter your username",value:m,onChange:v=>g(v.target.value),required:!0})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"input-label",children:"Password"}),e.jsx("input",{type:"password",className:"login-input",placeholder:"Enter your password",value:c,onChange:v=>h(v.target.value),required:!0})]}),e.jsx("button",{type:"submit",className:"login-btn",disabled:n,children:n?"Authenticating...":"Secure Login 🚀"})]})]})]})}const it=()=>{const i=ce();let o=i.pathname;o==="/"&&i.hash.startsWith("#/")&&(o=i.hash.substring(1));const m=o.split("/").filter(g=>g);return m.length===0?null:e.jsx("div",{style:{background:"#f8f9fa",borderBottom:"1px solid #e0e0e0"},children:e.jsxs("div",{style:{maxWidth:"1400px",margin:"0 auto",padding:"12px 20px",fontSize:"13.5px",color:"#666",display:"flex",alignItems:"center",fontWeight:"500"},children:[e.jsxs(W,{to:"/",style:{color:a.navy,textDecoration:"none",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{children:"🏠"})," Home"]}),m.map((g,c)=>{const h=`/${m.slice(0,c+1).join("/")}`,b=c===m.length-1,f=g.replace(/-/g," ").replace(/\b\w/g,n=>n.toUpperCase());return e.jsxs("span",{style:{display:"flex",alignItems:"center"},children:[e.jsx("span",{style:{margin:"0 10px",color:"#ccc",fontSize:"10px"},children:"❯"}),b?e.jsx("span",{style:{color:a.gold,fontWeight:"700"},children:f}):e.jsx(W,{to:h,style:{color:a.navy,textDecoration:"none"},children:f})]},h)})]})})},st=()=>{const i=[{label:"Admission 2024",icon:"🎓",href:"#"},{label:"Student Portal",icon:"💻",href:"#"},{label:"Exam Results",icon:"📋",href:"#"},{label:"Pay Fee Online",icon:"💳",href:"#"},{label:"Syllabus",icon:"📚",href:"#"}];return e.jsx("div",{style:{position:"fixed",right:0,top:"40%",transform:"translateY(-50%)",zIndex:999,display:"flex",flexDirection:"column",gap:"2px"},children:i.map((o,m)=>e.jsx(ot,{action:o},m))})},ot=({action:i})=>{const[o,m]=l.useState(!1);return e.jsxs("a",{href:i.href,onMouseEnter:()=>m(!0),onMouseLeave:()=>m(!1),style:{display:"flex",alignItems:"center",justifyContent:"flex-start",padding:"12px",backgroundColor:o?a.gold:a.navy,color:o?a.navy:"#fff",textDecoration:"none",width:o?"190px":"50px",height:"50px",borderTopLeftRadius:"8px",borderBottomLeftRadius:"8px",transition:"all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",overflow:"hidden",whiteSpace:"nowrap",boxShadow:"-2px 2px 8px rgba(0,0,0,0.15)",position:"relative",right:o?"0":"-5px"},children:[e.jsx("span",{style:{fontSize:"22px",minWidth:"30px",textAlign:"center",marginLeft:"-2px"},children:i.icon}),e.jsx("span",{style:{fontWeight:"700",fontSize:"14px",marginLeft:"15px",opacity:o?1:0,transition:"opacity 0.2s"},children:i.label})]})};function xe({slug:i,page:o,onClose:m}){const[g,c]=l.useState(o||null),[h,b]=l.useState(!0);return l.useEffect(()=>{if(o){c(o),b(!1);return}if(i){(async()=>{b(!0);const w=de(M(k,"pages"),We("slug","==",i)),u=await $e(w);u.empty?c(null):c(u.docs[0].data()),b(!1)})();return}c(null);const f=setTimeout(()=>{b(!1)},1500);return()=>clearTimeout(f)},[i,o]),h?e.jsxs("div",{style:{padding:"100px 20px",textAlign:"center",minHeight:"60vh",background:"#f4f7fa",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"15px",animation:"spin 2s linear infinite"},children:"⏳"}),e.jsx("h3",{style:{color:a.navy,fontWeight:700},children:"Loading Page Content..."}),e.jsx("p",{style:{color:"#666",fontSize:"14px"},children:"Please wait while we fetch the latest data from the server."})]}):g?e.jsxs("div",{className:"page-wrapper",children:[e.jsx("style",{children:`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .page-wrapper { background: #f4f7fa; padding: 60px 20px; min-height: 70vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .page-container { max-width: 1300px; margin: 0 auto; display: flex; gap: 40px; align-items: flex-start; }
        
        .content-col { flex: 1 1 68%; background: #fff; padding: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); min-width: 300px; border: 1px solid #edf2f7; }
        .page-title { color: ${a.navy}; font-size: 36px; font-weight: 800; margin: 0 0 12px; letter-spacing: -0.5px; }
        .title-underline { width: 80px; height: 5px; background: ${a.gold}; margin-bottom: 35px; border-radius: 3px; }
        .rich-content { font-size: 16px; line-height: 1.8; color: #333; text-align: justify; }
        .rich-content h1, .rich-content h2, .rich-content h3 { color: ${a.navy}; margin-top: 30px; margin-bottom: 15px; }
        .rich-content a { color: ${a.gold}; text-decoration: none; font-weight: 600; }
        .rich-content a:hover { text-decoration: underline; }
        .rich-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .rich-content ul, .rich-content ol { margin-left: 20px; margin-bottom: 20px; }
        .rich-content li { margin-bottom: 8px; }

        .sidebar-col { flex: 1 1 28%; min-width: 300px; position: sticky; top: 110px; }
        .widget { background: #fff; padding: 30px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); margin-bottom: 30px; border: 1px solid #edf2f7; }
        .widget-title { color: ${a.navy}; font-size: 20px; font-weight: 800; margin: 0 0 20px; display: flex; align-items: center; gap: 12px; border-bottom: 2px solid #f4f7fa; padding-bottom: 15px; }
        
        .quick-links { list-style: none; padding: 0; margin: 0; }
        .quick-link-item { border-bottom: 1px solid #f4f7fa; }
        .quick-link-item:last-child { border-bottom: none; }
        .quick-link { display: flex; align-items: center; gap: 12px; padding: 14px 0; color: #4a5568; text-decoration: none; font-weight: 600; font-size: 14.5px; transition: all 0.3s ease; }
        .quick-link:hover { color: ${a.gold}; padding-left: 8px; }
        .link-arrow { color: ${a.gold}; font-size: 18px; font-weight: bold; transition: transform 0.3s; }
        .quick-link:hover .link-arrow { transform: translateX(3px); }
        
        .helpdesk-widget { background: linear-gradient(145deg, ${a.navy} 0%, #0a1832 100%); color: #fff; padding: 35px 30px; border-radius: 16px; text-align: center; box-shadow: 0 15px 35px rgba(15,35,71,0.25); position: relative; overflow: hidden; }
        .helpdesk-widget::before { content: '☎'; position: absolute; top: -20px; right: -20px; font-size: 120px; color: rgba(255,255,255,0.05); transform: rotate(15deg); pointer-events: none; }
        .helpdesk-btn { display: inline-block; background: ${a.gold}; color: ${a.navyDark}; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 14px; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(244,160,35,0.3); margin-top: 20px; position: relative; z-index: 2; }
        .helpdesk-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(244,160,35,0.5); background: #e08e1a; }

        @media (max-width: 1024px) { .page-container { flex-direction: column; } .sidebar-col { position: static; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 30px; } }
        @media (max-width: 768px) { .page-wrapper { padding: 30px 15px; } .content-col { padding: 30px 20px; } .page-title { font-size: 28px; } .sidebar-col { grid-template-columns: 1fr; gap: 20px; } }
      `}),e.jsxs("div",{className:"page-container",children:[e.jsxs("div",{className:"content-col",children:[m&&e.jsx("button",{onClick:m,style:{float:"right",padding:"8px 16px",background:a.red,color:"#fff",border:"none",borderRadius:"8px",cursor:"pointer",fontWeight:"bold"},children:"✕ Close"}),e.jsx("h1",{className:"page-title",children:g.title}),e.jsx("div",{className:"title-underline"}),e.jsx("div",{className:"rich-content",children:g.contentType==="html"?e.jsx("div",{dangerouslySetInnerHTML:{__html:g.content}}):e.jsx("pre",{style:{whiteSpace:"pre-wrap",fontFamily:"inherit"},children:g.content})})]}),e.jsxs("div",{className:"sidebar-col",children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{style:{color:a.gold,fontSize:"24px"},children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"College Profile",path:"/about-us/college-profile"},{label:"Admission Rules",path:"/admission/rule"},{label:"Fee Structure",path:"/admission/fee-structure"},{label:"Syllabus",path:"/syllabus"},{label:"Academic Calendar",path:"/academics/academic-calendar"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Helpdesk",path:"/contact"}].map((f,n)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(W,{to:f.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",f.label]})},n))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:"45px",marginBottom:"15px",position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 12px",fontSize:"19px",color:a.gold,position:"relative",zIndex:2},children:"Need Assistance?"}),e.jsx("p",{style:{fontSize:"14px",margin:"0",color:"#e2e8f0",lineHeight:"1.6",position:"relative",zIndex:2},children:"Contact our administration office for any queries related to admission, examinations, or syllabus."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call Helpdesk Now"})]})]})]})]}):e.jsxs("div",{style:{padding:"100px 20px",textAlign:"center",minHeight:"60vh",background:"#f4f7fa",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[e.jsx("h2",{style:{color:a.navy,fontSize:"32px",fontWeight:800},children:"404 - Page Not Found"}),e.jsx("p",{style:{color:"#666",fontSize:"16px",marginTop:"10px"},children:"The page you are looking for is currently being updated or does not exist."}),e.jsxs("p",{style:{fontSize:"14px",background:"#e2e8f0",display:"inline-block",padding:"10px 20px",borderRadius:"8px",marginTop:"20px"},children:[e.jsx("strong",{children:"Admin Note:"})," Please create this page from the Admin Dashboard."]})]})}function rt(){l.useEffect(()=>{window.scrollTo(0,0)},[]);const i=[{role:"Prof. In-Charge (Bhuda Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👨‍🏫",type:"admin"},{role:"Prof. In-Charge (Bank More Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫",type:"admin"},{role:"BCA Coordinator",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"💻",type:"academic"},{role:"Member, Women's Cell",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛡️",type:"committee"},{role:"Member, Anti-Ragging Squad",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛑",type:"committee"},{role:"P.A. to Principal",name:"Mr. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"📝",type:"admin"}];return e.jsxs("div",{className:"contact-wrapper",children:[e.jsx("style",{children:`
        /* --- ANIMATIONS --- */
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(244, 160, 35, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(244, 160, 35, 0); }
          100% { box-shadow: 0 0 0 0 rgba(244, 160, 35, 0); }
        }

        .contact-wrapper {
          background: #f4f7fa;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding-bottom: 80px;
        }

        /* --- HERO HEADER --- */
        .contact-header {
          background: linear-gradient(135deg, ${a.navy} 0%, #0a1832 100%);
          color: white;
          padding: 80px 20px 70px;
          text-align: center;
          position: relative;
          clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
        }
        .header-title {
          font-size: 46px;
          font-weight: 900;
          margin: 0;
          letter-spacing: -1px;
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .header-title span { color: ${a.gold}; }
        .header-sub {
          font-size: 16px;
          color: #cbd5e1;
          margin-top: 15px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          animation: fadeInUp 0.6s ease-out 0.2s forwards;
          opacity: 0;
          line-height: 1.6;
        }

        /* --- CAMPUS SECTION --- */
        .section-title {
          text-align: center;
          font-size: 32px;
          color: ${a.navy};
          font-weight: 800;
          margin: 40px 0 30px;
          position: relative;
        }
        .section-title::after {
          content: '';
          display: block;
          width: 60px;
          height: 4px;
          background: ${a.gold};
          margin: 10px auto 0;
          border-radius: 2px;
        }

        .campus-container {
          max-width: 1200px;
          margin: -30px auto 0;
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 40px;
          position: relative;
          z-index: 10;
        }

        .campus-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0,0,0,0.06);
          border: 1px solid #edf2f7;
          border-bottom: 5px solid ${a.navy};
          transition: all 0.4s ease;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
          display: flex;
          flex-direction: column;
        }
        .campus-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(15,35,71,0.15);
          border-bottom-color: ${a.gold};
        }
        .card-1 { animation-delay: 0.3s; }
        .card-2 { animation-delay: 0.5s; }

        .card-header {
          padding: 30px 30px 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          background: #fafbfc;
          border-bottom: 1px solid #edf2f7;
        }
        .campus-icon {
          width: 55px;
          height: 55px;
          background: rgba(244, 160, 35, 0.15);
          color: ${a.gold};
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          animation: pulseGlow 2s infinite;
        }
        .campus-title { font-size: 24px; font-weight: 800; color: ${a.navy}; margin: 0; }
        .campus-badge { font-size: 12px; background: ${a.navy}; color: #fff; padding: 4px 12px; border-radius: 20px; font-weight: 700; margin-top: 6px; display: inline-block; letter-spacing: 0.5px;}

        .card-details { padding: 25px 30px; flex: 1; }
        .detail-row { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px; }
        .detail-row:last-child { margin-bottom: 0; }
        .d-icon { font-size: 20px; color: ${a.navy}; margin-top: 2px; }
        .d-text h4 { margin: 0 0 4px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; color: #718096; }
        .d-text p, .d-text a { margin: 0; font-size: 15.5px; color: #2d3748; font-weight: 600; text-decoration: none; line-height: 1.5; transition: color 0.2s; }
        .d-text a:hover { color: ${a.gold}; }

        .map-container { width: 100%; height: 250px; border-top: 1px solid #edf2f7; background: #e2e8f0; position: relative; }
        .map-container iframe { width: 100%; height: 100%; border: none; filter: grayscale(15%) contrast(1.1); transition: all 0.4s ease; }
        .campus-card:hover .map-container iframe { filter: grayscale(0%) contrast(1); }

        /* --- KEY CONTACTS SECTION --- */
        .contacts-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 25px;
        }
        .contact-person-card {
          background: #fff;
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.04);
          border: 1px solid #edf2f7;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .contact-person-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(15,35,71,0.1);
          border-color: #cbd5e0;
        }
        /* Staggered animation for grid items */
        .contact-person-card:nth-child(1) { animation-delay: 0.6s; }
        .contact-person-card:nth-child(2) { animation-delay: 0.7s; }
        .contact-person-card:nth-child(3) { animation-delay: 0.8s; }
        .contact-person-card:nth-child(4) { animation-delay: 0.9s; }
        .contact-person-card:nth-child(5) { animation-delay: 1.0s; }
        .contact-person-card:nth-child(6) { animation-delay: 1.1s; }

        .cp-icon {
          width: 55px; height: 55px;
          background: #f4f7fa;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; color: ${a.navy};
        }
        .cp-details flex: 1;
        .cp-role { font-size: 12.5px; color: ${a.gold}; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px; }
        .cp-name { font-size: 18px; color: ${a.navy}; font-weight: 800; margin: 0 0 6px; }
        .cp-phone { display: inline-flex; align-items: center; gap: 6px; font-size: 15px; color: #4a5568; font-weight: 600; text-decoration: none; background: #f8fafc; padding: 6px 12px; border-radius: 6px; transition: all 0.2s; }
        .cp-phone:hover { background: ${a.navy}; color: ${a.gold}; }

        /* --- MOBILE RESPONSIVE --- */
        @media (max-width: 768px) {
          .contact-header { padding: 60px 20px 80px; clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%); }
          .header-title { font-size: 36px; }
          .campus-container { grid-template-columns: 1fr; gap: 30px; margin-top: -40px; }
          .contacts-grid { grid-template-columns: 1fr; }
        }
      `}),e.jsxs("div",{className:"contact-header",children:[e.jsxs("h1",{className:"header-title",children:["Get In ",e.jsx("span",{children:"Touch"})]}),e.jsx("p",{className:"header-sub",children:"We are here to assist you. Reach out to our respective campuses or directly contact our administration team."})]}),e.jsxs("div",{className:"campus-container",children:[e.jsxs("div",{className:"campus-card card-1",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏛️"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bhuda Campus"}),e.jsx("span",{className:"campus-badge",style:{background:a.navy},children:"Main Campus • Boys Wing"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsxs("p",{children:["Guru Nanak College, Bhuda",e.jsx("br",{}),"Dhanbad, Jharkhand - 826001"]})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:"tel:+917903340991",children:"+91 79033 40991"})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:"mailto:info@gncollege.org",children:"info@gncollege.org"})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bhuda Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14606.874130097746!2d86.4253!3d23.7942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzM5LjEiTiA4NsKwMjUnMzEuMSJF!5e0!3m2!1sen!2sin!4v1700000000000",allowFullScreen:"",loading:"lazy"})})]}),e.jsxs("div",{className:"campus-card card-2",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏢"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bank More Campus"}),e.jsx("span",{className:"campus-badge",style:{background:a.gold,color:a.navy},children:"Girls Wing • Vocational Studies"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsxs("p",{children:["Guru Nanak College, Bank More",e.jsx("br",{}),"Dhanbad, Jharkhand - 826001"]})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:"tel:+910000000000",children:"+91 (Add Number)"})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:"mailto:vocational@gncollege.org",children:"vocational@gncollege.org"})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bank More Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14606.874130097746!2d86.4153!3d23.7942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzM5LjEiTiA4NsKwMjUnMzEuMSJF!5e0!3m2!1sen!2sin!4v1700000000000",allowFullScreen:"",loading:"lazy"})})]})]}),e.jsx("h2",{className:"section-title",children:"Administration Directory"}),e.jsx("div",{className:"contacts-grid",children:i.map((o,m)=>e.jsxs("div",{className:"contact-person-card",children:[e.jsx("div",{className:"cp-icon",children:o.icon}),e.jsxs("div",{className:"cp-details",children:[e.jsx("p",{className:"cp-role",children:o.role}),e.jsx("h3",{className:"cp-name",children:o.name}),e.jsxs("a",{href:`tel:${o.phone.replace(/\s/g,"")}`,className:"cp-phone",children:["📞 ",o.phone]})]})]},m))})]})}const le=["/about-us/college-profile","/syllabus","/about-us","/about-us/vision-mission","/about-us/principal-message","/about-us/college-management/organogram","/about-us/college-management/presidents","/about-us/college-management/secretaries","/about-us/college-management/principal","/about-us/various-committees/womens-cell","/about-us/various-committees/anti-ragging","/about-us/various-committees/sc-st","/about-us/various-committees/obc","/about-us/various-committees/grievance","/about-us/various-committees/icc","/about-us/various-committees/minority","/about-us/various-committees/placement","/about-us/various-committees/rusa","/about-us/college-staff/teaching-staff","/about-us/college-staff/non-teaching-staff","/about-us/regulations/bbmku/special-ug-regulation","/about-us/regulations/bbmku/ug-regulation-fyugp","/about-us/regulations/bbmku/ug-regulation-cbcs","/about-us/regulations/college-affiliation","/about-us/regulations/ugc-section","/about-us/regulations/vbu/ug-regulation-2015","/about-us/regulations/vbu/bca-regulation","/about-us/regulations/byelaws","/about-us/regulations/exemption","/about-us/audit-report","/campus/visuals/bhuda","/campus/visuals/bank-more","/campus/visuals/vocational-building","/campus/infrastructure","/campus/classroom","/campus/ict-rooms","/campus/green-campus","/academics/iqac","/academics/course-offered","/academics/departments/humanities","/academics/departments/social-science","/academics/departments/commerce","/academics/departments/bca","/academics/departments/bba","/academics/academic-calendar","/admission/rule","/admission/document-required","/admission/fee-structure","/admission/notification/latest","/admission/notification/upcoming","/admission/intake-capacity","/activity/nss","/activity/ncc","/activity/workshop","/activity/games-sports","/activity/collaboration/rotaract-club","/activity/collaboration/sadbhavana-diwas","/naac/ssr-1st-cycle/cycle-1-documents","/naac/ssr-1st-cycle/peer-team-report","/naac/ssr-2nd-cycle/cycle-2-documents","/naac/ssr-2nd-cycle/executive-summary","/naac/aqar","/naac/nirf","/naac/perspective-plan","/publication/college-library","/publication/e-magazine","/publication/examination-results/2024","/publication/examination-results/2023","/publication/sss-report/2023-24","/publication/sss-report/2022-23","/gallery"],lt=({pages:i})=>{const{slug:o}=Ie(),[m,g]=l.useState(null);return l.useEffect(()=>{if(i&&o){const c=i.find(h=>h.slug===o);g(c)}},[o,i]),!i||i.length===0?e.jsx("div",{style:{padding:"40px 20px",textAlign:"center"},children:"Loading pages..."}):e.jsx(xe,{page:m})},ct=({notices:i,announcements:o,events:m,gallery:g,pdfReports:c,pages:h,placeholderPaths:b})=>{const[f,n]=l.useState(()=>localStorage.getItem("isGncAdmin")==="true");return f?e.jsx(at,{notices:i,announcements:o,events:m,gallery:g,pdfReports:c,pages:h,placeholderPaths:b,onClose:()=>{n(!1),localStorage.removeItem("isGncAdmin"),window.close()}}):e.jsx(nt,{onSuccess:()=>{n(!0),localStorage.setItem("isGncAdmin","true")},onClose:()=>window.close()})};function dt(){const[i,o]=l.useState([]),[m,g]=l.useState([]),[c,h]=l.useState([]),[b,f]=l.useState([]),[n,w]=l.useState([]),[u,v]=l.useState([]),z=l.useMemo(()=>{const r=u.filter(p=>p.slug&&!p.path).sort((p,y)=>(y.createdAt?.toMillis()||0)-(p.createdAt?.toMillis()||0)).map(p=>({label:p.title,href:`/p/${p.slug}`})),x=JSON.parse(JSON.stringify(Xe));if(r.length>0){const p={label:"More",href:"#",sub:r},y=x.findIndex(C=>C.label==="Gallery");x.splice(y>-1?y:x.length-1,0,p)}return x},[u]),d=l.useMemo(()=>{const r=new Map;return[...u].sort((p,y)=>(y.createdAt?.toMillis()||0)-(p.createdAt?.toMillis()||0)).forEach(p=>{p.path&&!r.has(p.path)&&r.set(p.path,p)}),r},[u]);l.useEffect(()=>{const x=[["notices",o],["announcements",g],["events",h],["gallery",f],["pdfReports",w],["pages",v]].map(([p,y])=>{const C=de(M(k,p),Ue("createdAt","desc"));return Ge(C,A=>{const _=A.docs.map(P=>({id:P.id,...P.data()}));y(_)})});return()=>x.forEach(p=>p())},[]);const s=()=>{window.open("#/admin","_blank")};return e.jsxs(e.Fragment,{children:[e.jsx(Ze,{}),e.jsx(Ke,{items:[...i.slice(0,3),...m.slice(0,2)]}),e.jsx(Je,{onAdminClick:s,navLinks:z}),e.jsx(it,{}),e.jsx(st,{}),e.jsxs(Le,{children:[e.jsx(q,{path:"/",element:e.jsx(Ve,{notices:i,announcements:m,pdfReports:n,sliderSlides:Oe,events:c,gallery:b})}),e.jsx(q,{path:"/contact",element:e.jsx(rt,{})}),e.jsx(q,{path:"/admin",element:e.jsx(ct,{notices:i,announcements:m,events:c,gallery:b,pdfReports:n,pages:u,placeholderPaths:le})}),e.jsx(q,{path:"/p/:slug",element:e.jsx(lt,{pages:u})}),le.map(r=>{const x=d.get(r);return e.jsx(q,{path:r,element:e.jsx(xe,{page:x})},r)})]}),e.jsx(Qe,{}),e.jsx("button",{onClick:s,style:{position:"fixed",bottom:25,right:25,background:a.navy,color:"#fff",border:`3px solid ${a.gold}`,borderRadius:"50%",width:60,height:60,cursor:"pointer",zIndex:500},children:"⚙️"})]})}function pt(){const i=ce();return l.useEffect(()=>{"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.scrollTo(0,0)},[]),l.useEffect(()=>{const o=i.hash;if(o){const m=o.replace("#",""),g=document.getElementById(m);g&&g.scrollIntoView({behavior:"smooth"})}else window.scrollTo(0,0)},[i]),e.jsx(dt,{})}Re.createRoot(document.getElementById("root")).render(e.jsx(De.StrictMode,{children:e.jsx(Pe,{children:e.jsx(pt,{})})}));
