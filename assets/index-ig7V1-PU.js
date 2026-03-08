import{a as o,j as e,R as yt}from"./react-B9mKIQH5.js";import{R as vt}from"./react-dom-D7_rhL9o.js";import{A as jt}from"./aos-B-Mw6r96.js";import{z as h,F as wt}from"./react-hot-toast-Dhq_btiz.js";import{L as _,u as Ie,R as Nt,a as re,b as kt,H as St}from"./react-router-CmInjhsw.js";import{i as ye}from"./jodit-react-CQyzVq-v.js";import"./firebase-BDBr1_Th.js";import{i as Ct,g as zt,a as At,b as Dt,d as L,s as We,c as B,u as me,e as Z,f as K,h as oe,q as Xe,o as Te,j as Et}from"./@firebase-PYxhKkJh.js";import{p as He}from"./dompurify-J9PU_gBl.js";import{p as Fe}from"./html-react-parser-BjJRHc4P.js";import"./scheduler-CWG1rEj-.js";import"./goober-wofAfydu.js";import"./jodit-CDy6uk5e.js";import"./idb-BXWtuYvb.js";import"./html-dom-parser-C9V9aTyI.js";import"./domhandler-C7h-c356.js";import"./domelementtype-CqltyNbl.js";import"./react-property-DkBHvQjb.js";import"./style-to-js-3xM98LKa.js";import"./style-to-object-Cg2xzs12.js";import"./inline-style-parser-BlqBsVO4.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))g(c);new MutationObserver(c=>{for(const p of c)if(p.type==="childList")for(const f of p.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&g(f)}).observe(document,{childList:!0,subtree:!0});function m(c){const p={};return c.integrity&&(p.integrity=c.integrity),c.referrerPolicy&&(p.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?p.credentials="include":c.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function g(c){if(c.ep)return;c.ep=!0;const p=m(c);fetch(c.href,p)}})();const je=[{id:"facebook",label:"f",href:"https://facebook.com/"},{id:"twitter",label:"t",href:"https://twitter.com/"},{id:"youtube",label:"y",href:"https://youtube.com/"},{id:"linkedin",label:"in",href:"https://linkedin.com/"}],Tt=[{name:"Class Rooms",emoji:"🏫"},{name:"Computer Lab",emoji:"💻"},{name:"Library",emoji:"📚"},{name:"Seminar Hall",emoji:"🎤"},{name:"Auditorium",emoji:"🎭"},{name:"Playground",emoji:"⚽"},{name:"Badminton Court",emoji:"🏸"},{name:"Gymnasium",emoji:"🏋️"},{name:"Digital Classrooms",emoji:"📱"},{name:"Cultural Dept.",emoji:"🎵"},{name:"Washroom (B)",emoji:"🚿"},{name:"Washroom (G)",emoji:"🚿"},{name:"Water Purifier",emoji:"💧"},{name:"Canteen",emoji:"🍽️"},{name:"Girls Common Room",emoji:"👩"},{name:"Online Lecture",emoji:"📡"}],Ge=[{label:"Home",href:"/"},{label:"About Us",href:"/",sub:[{label:"College Profile",href:"/about-us/college-profile"},{label:"Vision & Mission",href:"/about-us/vision-mission"},{label:"Principal Message",href:"/about-us/principal-message"},{label:"College Management",sub:[{label:"Organogram",href:"/about-us/college-management/organogram"},{label:"Presidents",href:"/about-us/college-management/presidents"},{label:"Secretaries",href:"/about-us/college-management/secretaries"},{label:"Principal",href:"/about-us/college-management/principal"}]},{label:"Various Committees",sub:[{label:"Women's Cell",href:"/about-us/various-committees/womens-cell"},{label:"Anti Ragging",href:"/about-us/various-committees/anti-ragging"},{label:"SC/ST",href:"/about-us/various-committees/sc-st"},{label:"OBC",href:"/about-us/various-committees/obc"},{label:"Grievance",href:"/about-us/various-committees/grievance"},{label:"ICC",href:"/about-us/various-committees/icc"},{label:"Minority",href:"/about-us/various-committees/minority"},{label:"Placement",href:"/about-us/various-committees/placement"},{label:"RUSA",href:"/about-us/various-committees/rusa"}]},{label:"College Staff",sub:[{label:"Teaching Staff",href:"/about-us/college-staff/teaching-staff"},{label:"Non-Teaching Staff",href:"/about-us/college-staff/non-teaching-staff"}]},{label:"Regulations",sub:[{label:"B.B.M.K. University Dhanbad",sub:[{label:"Special UG Regulation (CBCS) Session 2020-23",href:"/about-us/regulations/bbmku/special-ug-regulation"},{label:"UG Regulation (FYUGP)",href:"/about-us/regulations/bbmku/ug-regulation-fyugp"},{label:"UG Regulation (CBCS)",href:"/about-us/regulations/bbmku/ug-regulation-cbcs"}]},{label:"College Affiliation Paper B.B.M.K.U.",href:"/about-us/regulations/college-affiliation"},{label:"UGC Under Section 2(f) & 12(B)",href:"/about-us/regulations/ugc-section"},{label:"V.B.U. Hazaribag",sub:[{label:"UG Regulation 2015",href:"/about-us/regulations/vbu/ug-regulation-2015"},{label:"BCA Regulation",href:"/about-us/regulations/vbu/bca-regulation"}]},{label:"ByeLaws",href:"/about-us/regulations/byelaws"},{label:"Exemption",href:"/about-us/regulations/exemption"}]},{label:"Audit Report",href:"/about-us/audit-report"}]},{label:"Campus",href:"/",sub:[{label:"Campus Visuals",sub:[{label:"Bhuda",href:"/campus/visuals/bhuda"},{label:"Bank More",href:"/campus/visuals/bank-more"},{label:"Vocational Building",href:"/campus/visuals/vocational-building"}]},{label:"Infrastructure",href:"/campus/infrastructure"},{label:"Classroom",href:"/campus/classroom"},{label:"ICT Rooms",href:"/campus/ict-rooms"},{label:"Green Campus",href:"/campus/green-campus"}]},{label:"Academics",href:"/",sub:[{label:"IQAC",href:"/academics/iqac"},{label:"Course Offered",href:"/academics/course-offered"},{label:"Departments",sub:[{label:"Humanities",href:"/academics/departments/humanities"},{label:"Social Science",href:"/academics/departments/social-science"},{label:"Commerce",href:"/academics/departments/commerce"},{label:"BCA",href:"/academics/departments/bca"},{label:"BBA",href:"/academics/departments/bba"}]},{label:"Syllabus",href:"/syllabus"},{label:"Academic Calendar",href:"/academics/academic-calendar"}]},{label:"Admission",href:"/",sub:[{label:"Admission Rule",href:"/admission/rule"},{label:"Document Required",href:"/admission/document-required"},{label:"Fee Structure",href:"/admission/fee-structure"},{label:"Notification",sub:[{label:"Latest",href:"/admission/notification/latest"},{label:"Upcoming News",href:"/admission/notification/upcoming"}]},{label:"Intake Capacity",href:"/admission/intake-capacity"}]},{label:"Activity",href:"/",sub:[{label:"NSS",href:"/activity/nss"},{label:"NCC",href:"/activity/ncc"},{label:"Workshop",href:"/activity/workshop"},{label:"Game & Sports",href:"/activity/games-sports"},{label:"Collaboration",sub:[{label:"Rotaract Club",href:"/activity/collaboration/rotaract-club"},{label:"Sadbhavana Diwas",href:"/activity/collaboration/sadbhavana-diwas"}]}]},{label:"NAAC",href:"/",sub:[{label:"SSR 1st Cycle",sub:[{label:"Cycle 1 Documents",href:"/naac/ssr-1st-cycle/cycle-1-documents"},{label:"Peer Team Report",href:"/naac/ssr-1st-cycle/peer-team-report"}]},{label:"SSR 2nd Cycle",sub:[{label:"Cycle 2 Documents",href:"/naac/ssr-2nd-cycle/cycle-2-documents"},{label:"Executive Summary",href:"/naac/ssr-2nd-cycle/executive-summary"}]},{label:"AQAR",href:"/naac/aqar"},{label:"NIRF",href:"/naac/nirf"},{label:"Perspective Plan",href:"/naac/perspective-plan"}]},{label:"Publication",href:"/",sub:[{label:"College Library",href:"/publication/college-library"},{label:"E-Magazine",href:"/publication/e-magazine"},{label:"Examination Results",sub:[{label:"Result 2024",href:"/publication/examination-results/2024"},{label:"Result 2023",href:"/publication/examination-results/2023"}]},{label:"SSS Report",sub:[{label:"Report 2023-24",href:"/publication/sss-report/2023-24"},{label:"Report 2022-23",href:"/publication/sss-report/2022-23"}]}]},{label:"Gallery",href:"#gallery"},{label:"Contact Us",href:"/contact"}],It=[{text:"🏆 Winner - 4th Inter-College Youth Festival"},{text:"🎓 Admission 2024-28 Now Open - Apply Today!"},{text:"✅ NAAC Accredited Institution - Excellence in Education"},{text:"💻 AICTE Approved BCA & BBA Courses Available"},{text:"📚 Affiliated to B.B.M.K. University, Dhanbad"}],a={navy:"#1a3a6b",navyDark:"#0f2347",gold:"#f4a023"},$e=[{image:"images/slider_baisakhi.jpg",title:"BAISAKHI DI SHAAM Celebration",subtitle:"Celebrating culture and traditions"},{image:"images/slider_cricket.jpg",title:"Inter College BBMKU Cricket Winners",subtitle:"Celebrating sportsmanship and victory"},{image:"images/slider_ncc.jpg",title:'NCC "At Home Function" Participants',subtitle:"Dedicated NCC Cadets & Commanders"},{image:"images/slider_youth_winners.jpg",title:"BBMKU Youth Festival Champions",subtitle:"Winners of BBMKU Inter College Youth Festival - अंतर्नाद"},{image:"images/slider_seminar.jpg",title:"ICSSR Multidisciplinary National Seminar",subtitle:"G20: A Global Platform for Economic Development"}],Rt=()=>{const[i,l]=o.useState(0),m=$e.length;let g;const c=5e3,p=()=>{l(i===m-1?0:i+1)},f=()=>{l(i===0?m-1:i-1)};function y(){g=setInterval(p,c)}return o.useEffect(()=>{l(0)},[]),o.useEffect(()=>(y(),()=>clearInterval(g)),[i]),e.jsxs("div",{className:"slider",children:[e.jsx("div",{className:"arrow prev",onClick:f,children:"❮"}),e.jsx("div",{className:"arrow next",onClick:p,children:"❯"}),$e.map((n,b)=>e.jsx("div",{className:b===i?"slide current":"slide",children:b===i&&e.jsxs(e.Fragment,{children:[e.jsx("img",{src:`/gncollege-website/${n.image}`,alt:n.title,className:"image"}),e.jsxs("div",{className:"content",children:[e.jsx("h2",{children:n.title}),e.jsx("p",{children:n.subtitle}),e.jsx("hr",{})]})]})},b)),e.jsx("style",{children:`
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
            text-shadow: 2px 2px 8px rgba(0,0,0,0.8); /* Shadow badhaya gaya hai */
          }

          .content p {
            font-size: 1.2rem;
            margin-bottom: 18px;
            font-weight: 500;
            color: #e2e8f0;
            text-shadow: 1px 1px 5px rgba(0,0,0,0.7); /* Shadow badhaya gaya hai */
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
        `})]})};function Lt(){const i=[{label:"Admission 2024-28",icon:"🎓",href:"#"},{label:"BCA & BBA Portal",icon:"💻",href:"#"},{label:"Internal Exam",icon:"📋",href:"#"},{label:"Online Fee",icon:"💳",href:"#"},{label:"Syllabus",icon:"📚",href:"#"}];return e.jsx("div",{style:{background:"#fff",padding:"12px 0",borderBottom:"1px solid #eee"},children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"center",gap:"12px",flexWrap:"wrap",padding:"0 15px"},children:[e.jsx("style",{children:`
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
          `}),i.map((l,m)=>e.jsxs("a",{href:l.href,className:"ribbon-box",children:[e.jsx("span",{style:{fontSize:"16px"},children:l.icon}),l.label]},m))]})})}const Ue=({title:i,subtitle:l})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:32},children:[e.jsx("h2",{style:{fontSize:26,fontWeight:800,color:a.navy,marginBottom:6},children:i}),e.jsx("div",{style:{width:60,height:3,background:a.gold,margin:"0 auto 10px"}}),l&&e.jsx("p",{style:{color:"#666",fontSize:14},children:l})]});function Mt(){return e.jsxs("div",{style:{padding:"40px 16px",background:"#f8f9fa"},children:[e.jsxs("section",{style:{marginBottom:"100px",padding:"0 20px"},children:[e.jsx(Ue,{title:"Our Academic Departments",subtitle:"Excellence in specialized education for future leaders"}),e.jsx("style",{children:`
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
  `}),e.jsx("div",{className:"dept-container",children:[{name:"B.C.A",icon:"💻",symbol:"展开",desc:"Bachelor of Computer Applications - Future of IT."},{name:"B.B.A",icon:"📈",symbol:"📊",desc:"Bachelor of Business Administration - Master the Market."},{name:"COMMERCE",icon:"💰",symbol:"📒",desc:"Expertise in Finance, Accounts, and Trade."},{name:"ARTS",icon:"🎨",symbol:"🎭",desc:"Exploring Humanity, Culture, and Social Science."}].map((i,l)=>e.jsxs("div",{className:"modern-dept-card",children:[e.jsx("div",{className:"dept-bg-symbol",children:i.symbol}),e.jsxs("div",{className:"dept-content",children:[e.jsx("div",{className:"dept-icon-box",children:i.icon}),e.jsx("h3",{style:{color:"#fff",fontSize:"20px",fontWeight:"800",marginBottom:"8px"},children:i.name}),e.jsx("p",{style:{color:"rgba(255,255,255,0.8)",fontSize:"12.5px",lineHeight:"1.5",margin:0},children:i.desc}),e.jsx("div",{style:{marginTop:"15px",color:a.gold,fontSize:"12px",fontWeight:"bold"},children:"EXPLORE PROGRAM →"})]})]},l))})]}),e.jsx("section",{style:{padding:"80px 20px",background:"#ffffff"},children:e.jsxs("div",{style:{maxWidth:1250,margin:"0 auto"},children:[e.jsx(Ue,{title:"College Facilities",subtitle:"World-class infrastructure to support your academic excellence"}),e.jsx("style",{children:`
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
    `}),e.jsx("div",{className:"facility-container",children:Tt.map((i,l)=>e.jsxs("div",{className:"facility-card",children:[e.jsx("div",{className:"facility-icon-wrap",children:i.emoji}),e.jsx("div",{className:"facility-text",children:i.name})]},l))})]})})]})}const ve=({title:i,subtitle:l})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:40},children:[e.jsx("h2",{style:{fontSize:28,fontWeight:800,color:a.navy,marginBottom:8},children:i}),e.jsx("div",{style:{width:60,height:4,background:a.gold,margin:"0 auto 12px",borderRadius:2}}),l&&e.jsx("p",{style:{color:"#666",fontSize:15},children:l})]}),Pt=({notices:i,announcements:l,pdfReports:m,upcomingEvents:g})=>{const c=o.useRef(null),p=o.useRef(null),f=o.useRef(null),y=o.useRef(null),n=o.useRef(null),b=o.useRef(null),j=o.useMemo(()=>[...i||[],...i||[]],[i]),S=o.useMemo(()=>{const s=(g||[]).map(x=>({...x,text:x.title,date:x.createdAt?.toDate(),type:x.type||"Event"})),v=(l||[]).map(x=>({...x,date:x.createdAt?.toDate(),type:x.type||"News"}));return[...s,...v].sort((x,A)=>(A.date||0)-(x.date||0))},[g,l]),U=o.useMemo(()=>[...S,...S],[S]),d=o.useMemo(()=>{const s=(m||[]).map(v=>({...v,text:v.title,date:v.createdAt?.toDate(),type:"Document"}));return[...s,...s]},[m]),C=(s,v)=>{const x=s.current;if(!x)return;let A=0;const P=()=>{A-=.6,A<-x.scrollHeight/2&&(A=0),x.style.transform=`translateY(${A}px)`,v.current=requestAnimationFrame(P)};v.current=requestAnimationFrame(P)},E=s=>{s.current&&cancelAnimationFrame(s.current)};return o.useEffect(()=>{C(c,y);const s=c.current;return s&&(s.addEventListener("mouseenter",()=>E(y)),s.addEventListener("mouseleave",()=>C(c,y))),()=>E(y)},[j]),o.useEffect(()=>{C(p,n);const s=p.current;return s&&(s.addEventListener("mouseenter",()=>E(n)),s.addEventListener("mouseleave",()=>C(p,n))),()=>E(n)},[U]),o.useEffect(()=>{C(f,b);const s=f.current;return s&&(s.addEventListener("mouseenter",()=>E(b)),s.addEventListener("mouseleave",()=>C(f,b))),()=>E(b)},[d]),e.jsxs("section",{style:{padding:"90px 20px",background:"#f8fafc",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"300px",background:"linear-gradient(180deg, #f1f5f9 0%, rgba(248,250,252,0) 100%)",zIndex:0}}),e.jsxs("div",{style:{maxWidth:1350,margin:"0 auto",position:"relative",zIndex:1},children:[e.jsx(ve,{title:"Notification & Announcements",subtitle:"Stay informed with the latest official updates and campus news"}),e.jsx("style",{children:`
          .notif-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 35px;
            margin-top: 40px;
          }
          .notif-card {
            background: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.08);
            border: 1px solid rgba(226, 232, 240, 0.8);
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            display: flex;
            flex-direction: column;
            height: 520px;
            position: relative;
          }
          .notif-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 30px 60px -12px rgba(15, 23, 42, 0.15);
            border-color: rgba(244, 160, 35, 0.3);
          }
          
          /* Premium Gradient Headers */
          .header-notice { background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); }
          .header-news { background: linear-gradient(135deg, #e11d48 0%, #9f1239 100%); }
          .header-docs { background: linear-gradient(135deg, #059669 0%, #047857 100%); }
          
          .notif-header {
            padding: 25px 25px;
            display: flex;
            align-items: center;
            gap: 15px;
            color: #ffffff;
            font-weight: 800;
            font-size: 1.15rem;
            letter-spacing: 0.5px;
            position: relative;
            overflow: hidden;
          }
          .notif-header::after {
            content: ''; position: absolute; top: 0; right: 0; bottom: 0; left: 0;
            background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
            background-size: 200% 200%;
            animation: shine 4s infinite linear;
          }
          @keyframes shine { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }

          .notif-body {
            padding: 10px 20px;
            flex: 1;
            overflow-y: hidden;
            display: flex;
            flex-direction: column;
            mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
          }
          
          /* Interactive Notification Item */
          .notif-item {
            padding: 20px 15px;
            border-bottom: 1px dashed #e2e8f0;
            text-align: left; 
            position: relative;
            transition: all 0.3s ease;
            border-radius: 12px;
            margin-bottom: 5px;
          }
          .notif-item:hover {
            background: #f8fafc;
            padding-left: 22px;
            box-shadow: inset 4px 0 0 0 ${a.gold};
          }
          .notif-item:last-child { border-bottom: none; }

          /* Typography */
          .notif-meta {
            display: flex; align-items: center; justify-content: flex-start; flex-wrap: wrap; gap: 8px;
            font-size: 0.7rem; color: #64748b; font-weight: 700; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;
          }
          .cat-badge {
            padding: 3px 8px; border-radius: 6px; font-weight: 800; font-size: 0.65rem; background: #f1f5f9;
          }
          
          .rich-text-title {
            margin: 0 0 8px; font-size: 0.95rem; color: #0f172a; font-weight: 700; line-height: 1.5;
          }
          .rich-text-desc {
            margin: 0 0 8px; font-size: 0.85rem; color: #475569; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
          }

          /* View All Button */
          .view-all-wrapper {
            padding: 20px; background: #fff; border-top: 1px solid #f1f5f9; position: relative; z-index: 2;
          }
          .view-all-btn {
            display: block; width: 100%; padding: 14px;
            background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px;
            color: #334155; font-weight: 800; font-size: 0.85rem;
            cursor: pointer; transition: all 0.3s ease; text-align: center; text-transform: uppercase; letter-spacing: 1px;
          }
          .notif-card:hover .view-all-btn {
            background: ${a.navy}; color: #fff; border-color: ${a.navy}; box-shadow: 0 8px 20px rgba(15,23,42,0.2);
          }
          
          @keyframes pulse-red { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
          .new-badge-pulse { background: #ef4444; color: #fff; font-size: 0.6rem; padding: 2px 6px; border-radius: 4px; animation: pulse-red 2s infinite; font-weight: 900;}

          @media (max-width: 1100px) { .notif-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 768px) { .notif-grid { grid-template-columns: 1fr; gap: 25px; margin-top: 25px;} .notif-card { height: 480px; } }
        `}),e.jsxs("div",{className:"notif-grid",children:[e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-notice",children:[e.jsx("span",{style:{fontSize:"26px"},children:"🔔"})," Official Notices"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:c,children:j.map((s,v)=>{const x=s.isNew&&(new Date-new Date(s.date))/864e5<5;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",s.date?new Date(s.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#1e3a8a"},children:s.type||"Notice"}),x&&e.jsx("span",{className:"new-badge-pulse",children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:s.text}}),s.link&&e.jsx("a",{href:s.link,target:"_blank",rel:"noreferrer",style:{fontSize:"0.8rem",color:"#2563eb",fontWeight:800,textDecoration:"none",display:"flex",alignItems:"center",gap:"5px"},children:"📎 View Attachment"})]},v)})})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx("div",{className:"view-all-btn",children:"View All Notices"})})]}),e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-news",children:[e.jsx("span",{style:{fontSize:"26px"},children:"📣"})," News & Events"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:p,children:U.map((s,v)=>{const x=s.date&&(new Date-new Date(s.date))/864e5<5;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",s.date?new Date(s.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#e11d48"},children:s.type||"Update"}),x&&e.jsx("span",{className:"new-badge-pulse",children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:s.text||s.title}}),s.desc&&e.jsx("div",{className:"rich-text-desc",dangerouslySetInnerHTML:{__html:s.desc}}),s.link&&e.jsx("a",{href:s.link,target:"_blank",rel:"noreferrer",style:{fontSize:"0.8rem",color:"#e11d48",fontWeight:800,textDecoration:"none",display:"flex",alignItems:"center",gap:"5px"},children:"🔗 Read More"})]},v)})})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx("div",{className:"view-all-btn",children:"Explore News"})})]}),e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-docs",children:[e.jsx("span",{style:{fontSize:"26px"},children:"📄"})," E-Documents"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:f,children:d.map((s,v)=>e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",s.date?new Date(s.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#059669"},children:s.type||"Document"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:s.text||s.title}}),s.link&&e.jsx("a",{href:s.link,target:"_blank",rel:"noreferrer",style:{fontSize:"0.8rem",color:"#059669",fontWeight:800,textDecoration:"none",display:"flex",alignItems:"center",gap:"5px"},children:"⬇️ Download PDF"})]},v))})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx("div",{className:"view-all-btn",children:"Document Archive"})})]})]})]})]})},Bt=({notices:i,announcements:l,pdfReports:m,sliderSlides:g,events:c,gallery:p})=>{const[f,y]=o.useState("All Moments"),n=p||[],b=f==="All Moments"?n:n.filter(d=>d.cat===f),j=(c||[]).filter(d=>d.status==="upcoming"),S=(c||[]).filter(d=>d.status==="recent"),U=d=>{switch(d){case"SEMINAR":return"/images/slider_seminar.jpg";case"WORKSHOP":return"/images/slider_ncc.jpg";case"SPORTS":return"/images/slider_cricket.jpg";case"CULTURAL":return"/images/slider_baisakhi.jpg";default:return"/images/college_photo.jpg"}};return e.jsxs("div",{style:{fontFamily:"'Segoe UI',sans-serif",background:"#f4f7f9",minHeight:"100vh",overflowX:"hidden"},children:[e.jsx(Rt,{slides:g}),e.jsx(Lt,{}),e.jsx(Pt,{notices:i,announcements:l,pdfReports:m,upcomingEvents:j}),e.jsx("section",{id:"about",style:{background:"#fff",padding:"100px 20px",position:"relative",overflow:"hidden"},children:e.jsxs("div",{style:{maxWidth:1250,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(350px, 1fr))",gap:"60px",alignItems:"center"},children:[e.jsxs("div",{"data-aos":"fade-right",style:{position:"relative"},children:[e.jsx("style",{children:`
                @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
                .image-stack { position: relative; width: 100%; height: 450px; }
                .main-img { width: 90%; height: 100%; object-fit: cover; border-radius: 20px; box-shadow: 20px 20px 0px ${a.gold}; position: relative; z-index: 2; transition: transform 0.5s ease; }
                .image-stack:hover .main-img { transform: scale(1.02); }
                .accent-box { position: absolute; bottom: -30px; right: 0; background: ${a.navy}; color: #fff; padding: 25px; border-radius: 15px; z-index: 3; box-shadow: 0 10px 30px rgba(0,0,0,0.2); animation: float 3s ease-in-out infinite; }
              `}),e.jsxs("div",{className:"image-stack",children:[e.jsx("img",{src:"images/college_photo.jpg",alt:"Guru Nanak College Campus",className:"main-img"}),e.jsxs("div",{className:"accent-box",children:[e.jsx("h4",{style:{fontSize:"32px",margin:0,fontWeight:900,color:a.gold},children:"56+"}),e.jsx("p",{style:{fontSize:"12px",margin:0,opacity:.8,letterSpacing:"1px"},children:"YEARS OF EXCELLENCE"})]})]})]}),e.jsxs("div",{"data-aos":"fade-left",children:[e.jsxs("h2",{style:{fontSize:"38px",fontWeight:900,color:a.navy,lineHeight:1.2,marginBottom:"10px"},children:["About the ",e.jsx("span",{style:{color:a.gold},children:"College"})]}),e.jsx("h4",{style:{color:a.gold,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"25px",fontSize:"14px"},children:"Established 1970"}),e.jsx("p",{style:{color:"#555",lineHeight:1.8,fontSize:"16px",marginBottom:"30px"},children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru. We draw inspiration from the teachings of Guru Nanak Devji, fostering an environment of academic progress and individual development."}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"15px",marginBottom:"35px"},children:[{icon:"🛡️",title:"NAAC Accredited",desc:"Grade B Institution"},{icon:"👨‍🏫",title:"Expert Faculty",desc:"Highly Experienced"},{icon:"🔬",title:"Modern Labs",desc:"Tech-enabled Learning"},{icon:"🏅",title:"NSS & NCC",desc:"Character Building"}].map((d,C)=>e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"start"},children:[e.jsx("span",{style:{fontSize:"20px"},children:d.icon}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:800,fontSize:"14px",color:a.navy},children:d.title}),e.jsx("div",{style:{fontSize:"12px",color:"#888"},children:d.desc})]})]},C))}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"25px",flexWrap:"wrap"},children:[e.jsx("style",{children:`
                .discover-btn {
                  background: ${a.navy}; color: #fff; padding: 15px 35px; border: none; border-radius: 50px; 
                  font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(15,35,71,0.3);
                  text-decoration: none; display: inline-block;
                }
                .discover-btn:hover { background: ${a.gold}; color: ${a.navy}; box-shadow: 0 8px 25px rgba(244,160,35,0.4); }
                .social-icon-btn { width: 40px; height: 40px; border-radius: 50%; background: #f0f2f5; display: flex; align-items: center; justify-content: center; color: ${a.navy}; font-size: 18px; text-decoration: none; transition: all 0.3s ease; }
                .social-icon-btn:hover { background: ${a.navy}; color: ${a.gold}; transform: rotate(360deg); }
              `}),e.jsx(_,{to:"/about-us/college-profile",className:"discover-btn",children:"DISCOVER MORE →"}),e.jsxs("div",{style:{display:"flex",gap:"15px",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"13px",fontWeight:700,color:"#666"},children:"FOLLOW US:"}),je.map(d=>e.jsx("a",{href:d.href,target:"_blank",rel:"noopener noreferrer",className:"social-icon-btn",children:d.id==="twitter"?"𝕏":d.id==="youtube"?"▶":d.label.charAt(0)},d.id))]})]})]})]})}),e.jsx(Mt,{}),e.jsx("section",{id:"events",style:{padding:"80px 20px",background:"transparent"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1400,margin:"0 auto"},children:[e.jsx(ve,{title:"Recent Events & Happenings",subtitle:"Insights into our seminars, workshops, and vibrant campus activities"}),e.jsx("style",{children:`
            @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .events-scroller { overflow: hidden; padding: 20px 0; margin-top: 30px; mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent); -webkit-mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent); }
            .events-track { display: flex; width: max-content; gap: 30px; animation: scrollLeft 35s linear infinite; transform: translateZ(0); }
            .events-track:hover { animation-play-state: paused; }
            .event-loop-card { width: 320px; background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.04); border: 1px solid rgba(255,255,255,0.5); flex-shrink: 0; transition: all 0.4s ease; display: flex; flex-direction: column; }
            .event-loop-card:hover { transform: translateY(-8px); box-shadow: 0 15px 35px rgba(15, 35, 71, 0.12); border-color: ${a.gold}; }
            .el-img-box { position: relative; height: 200px; overflow: hidden; }
            .el-img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s ease; }
            .event-loop-card:hover .el-img { transform: scale(1.08); }
            .el-badge { position: absolute; top: 15px; right: 15px; background: ${a.gold}; color: #000; padding: 5px 12px; font-size: 10px; font-weight: 800; border-radius: 50px; text-transform: uppercase; z-index: 2; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
            .el-date { position: absolute; bottom: 0; left: 0; background: ${a.navy}; color: #fff; padding: 8px 15px; border-top-right-radius: 12px; text-align: center; z-index: 2; }
            .el-info { padding: 22px; flex: 1; display: flex; flex-direction: column; }
            .el-title { font-size: 16px; font-weight: 800; color: ${a.navy}; margin: 0 0 10px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
            .el-desc { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 15px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; flex: 1;}
            .el-footer { display: flex; justifyContent: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px; margin-top: auto;}
          `}),S.length>0?e.jsx("div",{className:"events-scroller",children:e.jsx("div",{className:"events-track",children:[...S,...S,...S].map((d,C)=>e.jsxs("div",{className:"event-loop-card",children:[e.jsxs("div",{className:"el-img-box",children:[e.jsx("div",{className:"el-badge",children:d.type}),e.jsxs("div",{className:"el-date",children:[e.jsx("div",{style:{fontSize:"18px",fontWeight:900,lineHeight:1},children:d.day||"--"}),e.jsx("div",{style:{fontSize:"10px",fontWeight:700},children:d.month||"---"})]}),e.jsx("img",{src:d.imageUrl||U(d.type),alt:d.title,className:"el-img"})]}),e.jsxs("div",{className:"el-info",children:[e.jsx("h3",{className:"el-title",children:d.title}),e.jsx("div",{className:"el-desc",dangerouslySetInnerHTML:{__html:d.desc}}),e.jsxs("div",{className:"el-footer",children:[e.jsxs("span",{style:{fontSize:"11px",color:"#888",fontWeight:700},children:["📍 ",d.location||"Campus"]}),e.jsx("span",{style:{fontSize:"11px",color:a.gold,fontWeight:800},children:"READ MORE →"})]})]})]},C))})}):e.jsxs("div",{style:{textAlign:"center",background:"rgba(255,255,255,0.7)",padding:"40px",borderRadius:"12px",border:"1px dashed #e2e8f0",marginTop:"30px"},children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"10px"},children:"📅"}),e.jsx("h3",{style:{color:a.navy,margin:"0 0 10px"},children:"No Recent Events"}),e.jsx("p",{style:{color:"#64748b",margin:0,fontSize:"14px"},children:"There are no events to display at the moment."})]})]})}),e.jsxs("section",{style:{background:`linear-gradient(135deg, ${a.navyDark} 0%, ${a.navy} 100%)`,padding:"80px 20px",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:.05,pointerEvents:"none",backgroundImage:"radial-gradient(#fff 1px, transparent 1px)",backgroundSize:"30px 30px"}}),e.jsxs("div",{"data-aos":"zoom-in",style:{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"40px",textAlign:"center",position:"relative",zIndex:2},children:[e.jsx("style",{children:`
            .counter-box { padding: 20px; transition: transform 0.3s ease; }
            .counter-box:hover { transform: translateY(-10px); }
            .counter-icon { font-size: 50px; margin-bottom: 15px; display: inline-block; filter: drop-shadow(0 0 10px rgba(244,160,35,0.3)); }
            .counter-number { font-size: 45px; font-weight: 900; color: ${a.gold}; line-height: 1; margin-bottom: 10px; font-family: 'Arial Black', sans-serif; }
            .counter-label { font-size: 14px; color: #e2e8f0; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
          `}),[{label:"STUDENTS ENROLLED",value:"4,000+",icon:"👨‍🎓"},{label:"SUCCESSFUL ALUMNI",value:"45,000+",icon:"🎓"},{label:"EXPERT FACULTY",value:"50+",icon:"👨‍🏫"},{label:"YEARS OF LEGACY",value:"56",icon:"🏛️"}].map((d,C)=>e.jsxs("div",{className:"counter-box",children:[e.jsx("div",{className:"counter-icon",children:d.icon}),e.jsx("div",{className:"counter-number",children:d.value}),e.jsx("div",{className:"counter-label",children:d.label})]},C))]})]}),e.jsx("section",{style:{padding:"80px 20px",background:"transparent"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsx(ve,{title:"Important External Links",subtitle:"Quick access to official education and government portals"}),e.jsx("style",{children:`
            .links-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; margin-top: 40px; }
            .link-tile { background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.6); border-radius: 12px; padding: 25px 15px; text-align: center; text-decoration: none; transition: all 0.3s; display: flex; flex-direction: column; align-items: center; gap: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); transform: translateZ(0); }
            .link-tile:hover { transform: translateY(-8px); border-color: ${a.gold}; box-shadow: 0 12px 20px rgba(15, 35, 71, 0.08); background: #fff; }
            .link-icon-circle { width: 60px; height: 60px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; transition: 0.3s; }
            .link-tile:hover .link-icon-circle { background: ${a.navy}; color: #fff; }
            .link-name { font-size: 13px; font-weight: 800; color: ${a.navy}; letter-spacing: 0.5px; }
          `}),e.jsx("div",{className:"links-grid",children:[{name:"NAAC",url:"https://naac.gov.in",icon:"🏅"},{name:"UGC",url:"https://ugc.ac.in",icon:"📜"},{name:"INFLIBNET",url:"https://inflibnet.ac.in",icon:"📚"},{name:"NDL INDIA",url:"https://ndl.gov.in",icon:"🔬"},{name:"SWAYAM",url:"https://swayam.gov.in",icon:"🌐"},{name:"BBMK UNIVERSITY",url:"https://bbmku.ac.in",icon:"🏛️"}].map((d,C)=>e.jsxs("a",{href:d.url,target:"_blank",rel:"noopener noreferrer",className:"link-tile",children:[e.jsx("div",{className:"link-icon-circle",children:d.icon}),e.jsx("div",{className:"link-name",children:d.name})]},C))})]})}),e.jsx("section",{id:"gallery",style:{padding:"100px 20px",background:"#fff"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1300,margin:"0 auto"},children:[e.jsx(ve,{title:"📸 Photo Gallery",subtitle:"Memorable glimpses of academic excellence and cultural heritage"}),e.jsx("style",{children:`
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
          `}),e.jsx("div",{className:"gallery-filters",children:["All Moments","Seminars","Cultural Fest","Guest Visit","Campus","Departments","NSS Programs"].map(d=>e.jsx("button",{className:`filter-btn ${f===d?"active":""}`,onClick:()=>y(d),children:d},d))}),e.jsx("div",{className:"gallery-grid",children:b.length>0?b.map((d,C)=>e.jsxs("div",{className:"gallery-item",children:[e.jsx("img",{src:d.src,alt:d.title,className:"gallery-img"}),e.jsxs("div",{className:"gallery-overlay",children:[e.jsx("span",{style:{color:"#f4a023",fontSize:"10px",fontWeight:"800"},children:d.cat}),e.jsx("h4",{style:{color:"#fff",fontSize:"14px",fontWeight:"700",marginTop:"5px"},children:d.title})]})]},C)):e.jsxs("div",{style:{gridColumn:"1 / -1",textAlign:"center",background:"#f8fafc",padding:"50px 20px",borderRadius:"16px",border:"1px dashed #cbd5e1"},children:[e.jsx("div",{style:{fontSize:"32px",marginBottom:"10px"},children:"📸"}),e.jsx("h3",{style:{color:a.navy,margin:"0 0 5px"},children:"Gallery is Empty"}),e.jsx("p",{style:{color:"#64748b",margin:0,fontSize:"14px"},children:"Upload photos from the Admin Panel to see them here."})]})},f)]})})]})};function Wt({items:i}){return!i||i.length===0?null:e.jsxs("div",{style:{background:a.gold,color:"#000",padding:"8px 0",display:"flex",alignItems:"center",overflow:"hidden",borderBottom:"1px solid rgba(0,0,0,0.1)",zIndex:10,width:"100%",boxSizing:"border-box"},children:[e.jsx("style",{children:`
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
            flex-shrink: 0; /* 🌟 NAYA: Badge ko dabne se roke */
            z-index: 20;
          }
          .ticker-track {
            display: flex;
            width: max-content;
            animation: tickerScroll 30s linear infinite;
            transform: translateZ(0); /* Zero Lag Scroll */
          }
          .ticker-track:hover { animation-play-state: paused; }
          .ticker-item {
            padding: 0 30px;
            font-weight: 600;
            font-size: 13.5px;
            color: #0f2347;
            white-space: nowrap;
          }
        `}),e.jsx("div",{className:"ticker-badge",children:"🚨 LATEST"}),e.jsx("div",{style:{flex:1,overflow:"hidden",minWidth:0},children:e.jsx("div",{className:"ticker-track",children:[...i,...i].map((l,m)=>e.jsxs("div",{className:"ticker-item",children:[e.jsx("span",{style:{color:"#d32f2f",marginRight:"8px"},children:"•"}),l.text||l.title]},m))})})]})}function Gt({onAdminClick:i,navLinks:l}){const[m,g]=o.useState(null),[c,p]=o.useState(null),[f,y]=o.useState(null),[n,b]=o.useState(window.innerWidth<1250),[j,S]=o.useState(!1);o.useEffect(()=>{const s=()=>{b(window.innerWidth<1250),window.innerWidth>=1250&&S(!1)};return window.addEventListener("resize",s),()=>window.removeEventListener("resize",s)},[]);const U=s=>{m===s?(g(null),p(null),y(null)):(g(s),p(null),y(null))},d=s=>{c===s?(p(null),y(null)):(p(s),y(null))},C=s=>{y(f===s?null:s)},E=s=>s?s.startsWith("/#")?s.substring(2):s:"#";return e.jsx("nav",{className:"glass-navbar",style:{position:"sticky",top:0,zIndex:100,transform:"translateZ(0)",willChange:"transform"},children:e.jsxs("div",{style:{maxWidth:1400,width:"100%",margin:"0 auto",padding:"0 15px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"20px"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",padding:"8px 0",flexShrink:0},children:e.jsx("img",{src:"/gncollege-website/images/logo1.png",alt:"Guru Nanak College Dhanbad",style:{height:n?55:80,width:"auto",objectFit:"contain"}})}),n&&e.jsx("button",{onClick:()=>S(!j),style:{background:"transparent",border:"none",color:a.navy,fontSize:32,cursor:"pointer",padding:"4px 8px",flexShrink:0,zIndex:200},children:j?"✕":"☰"}),e.jsxs("div",{style:{display:n?j?"flex":"none":"flex",flexDirection:n?"column":"row",alignItems:n?"flex-start":"center",position:n?"absolute":"static",top:"100%",left:0,right:0,background:n?"rgba(255,255,255,0.98)":"transparent",padding:n?"10px 20px 20px":0,gap:n?10:0,boxShadow:n&&j?"0 10px 20px rgba(0,0,0,.15)":"none",maxHeight:n?"80vh":"auto",overflowY:n?"auto":"visible",flex:1,justifyContent:n?"flex-start":"flex-end",borderTop:n&&j?"1px solid #eee":"none",zIndex:250},children:[l.map(s=>e.jsxs("div",{style:{position:"relative",width:n?"100%":"auto"},onMouseEnter:()=>!n&&g(s.label),onMouseLeave:()=>{n||(g(null),p(null),y(null))},children:[e.jsxs("div",{onClick:()=>n&&s.sub&&U(s.label),style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:n&&s.sub?"pointer":"default"},children:[e.jsxs(_,{to:E(s.href),onClick:()=>{s.label==="Home"&&window.scrollTo(0,0)},style:{color:a.navy,padding:n?"12px 0":"24px 8px",display:"block",fontSize:14,fontWeight:700,whiteSpace:"nowrap",textDecoration:"none",transition:"all .2s",width:"100%"},children:[s.label==="Home"?"🏠 ":"",s.label]}),n&&s.sub&&e.jsx("span",{style:{color:a.navy,fontSize:20},children:m===s.label?"▴":"▾"}),!n&&s.sub&&e.jsx("span",{style:{color:a.navy,fontSize:11,marginLeft:2,marginRight:8,marginTop:2},children:"▾"})]}),s.sub&&m===s.label&&e.jsx("div",{style:{position:n?"static":"absolute",top:"100%",left:0,background:"#fff",minWidth:260,boxShadow:n?"none":"0 12px 30px rgba(0,0,0,.15)",borderTop:n?"none":"3px solid "+a.navy,borderRadius:n?8:"0 0 8px 8px",zIndex:200,padding:n?"5px 0":"8px 0"},children:s.sub.map(v=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!n&&p(v.label),onMouseLeave:()=>!n&&p(null),children:[e.jsxs("div",{onClick:x=>{n&&v.sub&&(x.stopPropagation(),d(v.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:n?"10px 16px":"10px 18px",borderBottom:n?"none":"1px solid #f8f9fa",cursor:n&&v.sub?"pointer":"default"},onMouseEnter:x=>{n||(x.currentTarget.style.background="#f4f6f9")},onMouseLeave:x=>{n||(x.currentTarget.style.background="transparent")},children:[e.jsx(_,{to:E(v.href),style:{fontSize:13,fontWeight:600,color:a.navy,display:"block",width:"100%",textDecoration:"none"},children:v.label}),v.sub&&e.jsx("span",{style:{fontSize:12,color:a.gold,marginLeft:8},children:n?c===v.label?"▴":"▾":"▶"})]}),v.sub&&c===v.label&&e.jsx("div",{style:{position:n?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:260,boxShadow:n?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:n?"none":"3px solid "+a.gold,borderRadius:n?4:"0 8px 8px 8px",margin:n?"0 16px 10px":0,borderLeft:n?"2px solid "+a.gold:"none"},children:v.sub.map(x=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!n&&y(x.label),onMouseLeave:()=>!n&&y(null),children:[e.jsxs("div",{onClick:A=>{n&&x.sub&&(A.stopPropagation(),C(x.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderBottom:n?"none":"1px solid #f8f9fa",cursor:n&&x.sub?"pointer":"default"},onMouseEnter:A=>{n||(A.currentTarget.style.background="#f4f6f9")},onMouseLeave:A=>{n||(A.currentTarget.style.background="transparent")},children:[e.jsx(_,{to:E(x.href),style:{fontSize:12.5,fontWeight:600,color:"#444",display:"block",width:"100%",textDecoration:"none"},children:x.label}),x.sub&&e.jsx("span",{style:{fontSize:11,color:a.gold,marginLeft:8},children:n?f===x.label?"▴":"▾":"▶"})]}),x.sub&&f===x.label&&e.jsx("div",{style:{position:n?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:260,boxShadow:n?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:n?"none":"3px solid "+a.navy,borderRadius:n?4:"0 8px 8px 8px",margin:n?"0 16px 10px":0,borderLeft:n?"2px solid "+a.navy:"none"},children:x.sub.map(A=>e.jsx(_,{to:E(A.href),style:{display:"block",padding:"10px 16px",fontSize:12,color:"#555",borderBottom:n?"none":"1px solid #f8f9fa",textDecoration:"none"},onMouseEnter:P=>{n||(P.currentTarget.style.background="#f4f6f9")},onMouseLeave:P=>{n||(P.currentTarget.style.background="transparent")},children:A.label},A.label))})]},x.label))})]},v.label))})]},s.label)),e.jsxs("button",{onClick:i,style:{flexShrink:0,background:a.gold,color:"#000",border:"none",padding:"8px 24px",borderRadius:6,cursor:"pointer",fontSize:13,fontWeight:800,marginLeft:n?0:20,marginTop:n?12:0,width:n?"100%":"auto",boxShadow:"0 4px 15px rgba(244,160,35,0.3)",whiteSpace:"nowrap",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",transition:"all 0.3s ease"},onMouseEnter:s=>s.currentTarget.style.transform="translateY(-2px)",onMouseLeave:s=>s.currentTarget.style.transform="translateY(0)",children:[e.jsx("span",{style:{fontSize:18},children:"⚙️"})," Admin Login"]})]})]})})}const $t=()=>e.jsxs("footer",{className:"premium-footer",children:[e.jsx("style",{children:`
        .premium-footer {
          background: linear-gradient(135deg, #071022 0%, #0f172a 100%);
          color: #e2e8f0;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          position: relative;
          overflow: hidden;
          border-top: 4px solid #f4a023; /* Gold accent line */
        }
        
        /* Subtle Glow Effect in Background */
        .premium-footer::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle at center, rgba(244, 160, 35, 0.03) 0%, transparent 50%);
          pointer-events: none;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 50px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 20px;
          position: relative;
          z-index: 1;
        }

        .footer-widget {
          display: flex;
          flex-direction: column;
        }

        .footer-heading {
          color: #fff;
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 30px;
          position: relative;
          display: inline-block;
          letter-spacing: 0.5px;
        }
        
        .footer-heading::after {
          content: '';
          position: absolute;
          left: 0; bottom: -10px;
          width: 40px; height: 3px;
          background: #f4a023;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        
        .footer-widget:hover .footer-heading::after {
          width: 70px;
        }

        .footer-desc {
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.8;
          margin-bottom: 25px;
        }

        /* Social Icons */
        .social-btn {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
          display: inline-flex; align-items: center; justify-content: center;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255,255,255,0.05);
          font-size: 1.1rem;
        }
        
        .social-btn:hover {
          background: #f4a023;
          color: #071022;
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(244, 160, 35, 0.25);
          border-color: #f4a023;
        }

        /* Links */
        .footer-links {
          list-style: none; padding: 0; margin: 0;
        }
        
        .footer-link-item {
          margin-bottom: 15px;
        }

        .footer-link {
          display: inline-flex;
          align-items: center;
          color: #cbd5e1;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          font-weight: 500;
        }
        
        .footer-link:hover {
          color: #f4a023;
          transform: translateX(8px);
        }
        
        .footer-link span {
          margin-right: 10px;
          font-size: 1.2rem;
          color: #f4a023;
          transition: transform 0.3s ease;
        }
        
        .footer-link:hover span {
          transform: translateX(3px);
        }

        /* Contact Details */
        .contact-item {
          display: flex; align-items: flex-start; gap: 15px; margin-bottom: 25px;
        }
        
        .contact-icon {
          width: 40px; height: 40px;
          background: rgba(244, 160, 35, 0.1);
          color: #f4a023;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 1.2rem;
          border: 1px solid rgba(244, 160, 35, 0.2);
          transition: all 0.3s ease;
        }

        .contact-item:hover .contact-icon {
          background: #f4a023;
          color: #071022;
          transform: rotate(10deg);
        }
        
        .contact-text {
          color: #94a3b8; font-size: 0.95rem; line-height: 1.5;
        }
        
        .contact-text strong {
          color: #fff; display: block; margin-bottom: 5px; font-size: 1rem; font-weight: 700;
        }
        
        .contact-link {
          color: #94a3b8; text-decoration: none; transition: 0.2s;
        }
        .contact-link:hover { color: #f4a023; text-decoration: underline; }

        /* Newsletter */
        .newsletter-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 6px;
          display: flex;
          margin-top: 10px;
          transition: all 0.3s ease;
        }
        .newsletter-box:focus-within {
          border-color: rgba(244, 160, 35, 0.5);
          box-shadow: 0 0 20px rgba(244, 160, 35, 0.1);
          background: rgba(255,255,255,0.05);
        }
        
        .newsletter-input {
          background: transparent; border: none; outline: none;
          color: #fff; padding: 12px 15px; width: 100%;
          font-size: 0.95rem;
        }
        .newsletter-input::placeholder { color: #64748b; }
        
        .newsletter-btn {
          background: #f4a023; color: #071022;
          border: none; border-radius: 8px;
          padding: 0 22px; font-weight: 800; cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }
        .newsletter-btn:hover {
          background: #ffb142; 
          box-shadow: 0 5px 15px rgba(244, 160, 35, 0.3);
        }

        /* Bottom Bar */
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 25px 20px;
          background: #040a15;
          position: relative;
          z-index: 1;
        }
        
        .footer-bottom-content {
          max-width: 1400px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 15px;
        }
        
        .footer-copyright { margin: 0; color: #94a3b8; font-size: 0.95rem; }
        .footer-dev { margin: 0; font-size: 0.85rem; color: #64748b; }
        
        @media (max-width: 768px) {
          .footer-bottom-content { justify-content: center; text-align: center; flex-direction: column; }
        }
      `}),e.jsxs("div",{className:"footer-grid",children:[e.jsxs("div",{className:"footer-widget",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"18px",marginBottom:"25px"},children:[e.jsx("div",{style:{width:"75px",height:"75px",background:"rgba(255,255,255,0.95)",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",padding:"8px",boxShadow:"0 10px 25px rgba(0,0,0,0.5)"},children:e.jsx("img",{src:"/gncollege-website/images/logo.png",alt:"GNC Logo",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center"},children:[e.jsx("h2",{style:{fontSize:"1.4rem",fontWeight:"900",color:"#fff",margin:"0 0 2px 0",lineHeight:"1.1"},children:"GURU NANAK"}),e.jsx("h2",{style:{fontSize:"1.4rem",fontWeight:"900",color:"#f4a023",margin:0,lineHeight:"1.1"},children:"COLLEGE"}),e.jsx("p",{style:{fontSize:"0.75rem",color:"#94a3b8",margin:"6px 0 0",fontWeight:"700",letterSpacing:"1.5px"},children:"DHANBAD, JHARKHAND"})]})]}),e.jsx("p",{className:"footer-desc",children:"A Sikh Minority Degree College established in 1970. We are dedicated to providing premium quality education and fostering holistic development based on the core teachings of Guru Nanak Dev Ji."}),e.jsx("div",{style:{display:"flex",gap:"12px"},children:je&&je.map(i=>e.jsx("a",{href:i.href,target:"_blank",rel:"noreferrer",className:"social-btn","aria-label":i.label,children:i.id==="twitter"?"𝕏":i.id==="youtube"?"▶":i.id==="facebook"?"f":i.id==="instagram"?"in":i.label.charAt(0)},i.id))})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Quick Links"}),e.jsx("ul",{className:"footer-links",children:[{label:"Home",path:"/"},{label:"College Profile",path:"/about-us/college-profile"},{label:"Admission Rules",path:"/admission/rule"},{label:"Courses Offered",path:"/academics/course-offered"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((i,l)=>e.jsx("li",{className:"footer-link-item",children:e.jsxs(_,{to:i.path,onClick:()=>window.scrollTo(0,0),className:"footer-link",children:[e.jsx("span",{children:"›"})," ",i.label]})},l))})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Get In Touch"}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"📍"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Main Campus"}),"Bhuda, Dhanbad,",e.jsx("br",{}),"Jharkhand - 826001, India"]})]}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"📞"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Phone Enquiries"}),e.jsx("a",{href:"tel:+917903340991",className:"contact-link",children:"+91 79033 40991"})]})]}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"✉️"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Email Us"}),e.jsx("a",{href:"mailto:principal@gncollege.org",className:"contact-link",children:"principal@gncollege.org"})]})]})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Stay Updated"}),e.jsx("p",{className:"footer-desc",style:{marginBottom:"15px"},children:"Subscribe to our digital newsletter to receive the latest academic notices and campus announcements directly in your inbox."}),e.jsxs("div",{className:"newsletter-box",children:[e.jsx("input",{type:"email",placeholder:"Enter email address...",className:"newsletter-input"}),e.jsx("button",{className:"newsletter-btn",children:"Subscribe"})]})]})]}),e.jsx("div",{className:"footer-bottom",children:e.jsxs("div",{className:"footer-bottom-content",children:[e.jsxs("p",{className:"footer-copyright",children:["© ",new Date().getFullYear()," ",e.jsx("span",{style:{color:"#f4a023",fontWeight:"800"},children:"Guru Nanak College, Dhanbad"}),". All Rights Reserved."]}),e.jsx("p",{className:"footer-dev",children:"Designed & Developed dynamically with ❤️ By Pankaj Kumar"})]})})]}),Ut=()=>e.jsxs("div",{className:"top-bar-container",style:{background:a.navyDark,color:"#e2e8f0",padding:"8px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12.5,fontWeight:500,letterSpacing:"0.4px",borderBottom:"1px solid rgba(255,255,255,0.05)"},children:[e.jsx("style",{children:`
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
        `}),e.jsxs("div",{className:"contact-group",children:[e.jsxs("a",{href:"tel:+917903340991",className:"top-bar-link",children:[e.jsx("span",{style:{fontSize:"15px",color:a.gold},children:"📞"})," +91-7903340991"]}),e.jsxs("a",{href:"mailto:principal@gncollege.org",className:"top-bar-link",children:[e.jsx("span",{style:{fontSize:"15px",color:a.gold},children:"✉️"})," principal@gncollege.org"]})]}),e.jsx("div",{style:{display:"flex",gap:12},children:je.map(i=>{let l=i.label;return i.id==="twitter"&&(l="𝕏"),i.id==="youtube"&&(l="▶"),e.jsx("a",{href:i.href,"aria-label":i.id,target:"_blank",rel:"noopener noreferrer",className:"social-icon",children:l},i.id)})})]}),Ot={apiKey:"AIzaSyDeJWUUoU_MJ4ubpbfaLZemvnEr82LF5YA",authDomain:"gnc-college-web.firebaseapp.com",projectId:"gnc-college-web",storageBucket:"gnc-college-web.firebasestorage.app",messagingSenderId:"78901559372",appId:"1:78901559372:web:f76cb101f8aec2daadb4e9"},_e=Ct(Ot),z=zt(_e);At(_e);function Xt({onClose:i,notices:l,pages:m,events:g,gallery:c,placeholderPaths:p,announcements:f,pdfReports:y,navLinks:n}){const[b,j]=o.useState("pages"),[S,U]=o.useState(""),[d,C]=o.useState("all"),E=o.useRef(null),s=o.useMemo(()=>({readonly:!1,placeholder:"Start typing your content here...",height:400,processPasteHTML:!0,processPasteFromWord:!0,askBeforePasteHTML:!1,askBeforePasteFromWord:!1,buttons:["source","|","bold","italic","underline","|","ul","ol","|","font","fontsize","brush","paragraph","|","image","table","link","|","align","undo","redo","|","hr","eraser","fullsize"]}),[]),[v,x]=o.useState(!1),[A,P]=o.useState(""),we=t=>{P(t),x(!0)},[M,D]=o.useState(!1),[he,k]=o.useState(!1),[R,w]=o.useState(window.innerWidth<1024),[I,J]=o.useState("update"),[V,xe]=o.useState(null),[q,Re]=o.useState(null),[ee,Le]=o.useState(null),[te,Me]=o.useState(null),[ae,Pe]=o.useState(null),[ta,aa]=o.useState([]),[le,ue]=o.useState([]),[ce,ge]=o.useState(""),[W,ie]=o.useState({label:"",href:""}),[G,fe]=o.useState({label:"",href:"",parentId:"top"});o.useEffect(()=>{const t=()=>w(window.innerWidth<1024);return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]),o.useEffect(()=>{(async()=>{const r=await Dt(L(z,"settings","navbar"));r.exists()&&r.data().links&&r.data().links.length>0?ue(r.data().links):n&&n.length>0&&ue(n)})()},[n]);const Ye=async()=>{if(!window.confirm("Kya aap apna original lamba menu wapas laana chahte hain? Yeh live menu ko replace kar dega."))return;if(!n||n.length===0)return h.error("Original menu nahi mila!");D(!0);const t=h.loading("Restoring Original Menu...");try{await We(L(z,"settings","navbar"),{links:n}),ue(n),h.success("Aapka original menu wapas aa gaya!",{id:t})}catch(r){h.error(r.message,{id:t})}D(!1)},Q=o.useMemo(()=>{const t=[];return le.forEach((r,u)=>{t.push({id:`${u}`,label:r.label,href:r.href,pathStr:`[L1: Main] ${r.label}`,level:0}),r.sub&&r.sub.forEach((F,Be)=>{t.push({id:`${u}-${Be}`,label:F.label,href:F.href,pathStr:`[L2: Sub] ${r.label} > ${F.label}`,level:1}),F.sub&&F.sub.forEach((Ee,bt)=>{t.push({id:`${u}-${Be}-${bt}`,label:Ee.label,href:Ee.href,pathStr:`[L3: Sub-Sub] ${r.label} > ${F.label} > ${Ee.label}`,level:2})})})}),t},[le]),Ne=async(t,r)=>{D(!0);const u=h.loading("Saving Menu...");try{await We(L(z,"settings","navbar"),{links:t}),ue(t),h.success(r,{id:u})}catch(F){h.error(F.message,{id:u})}D(!1)},ke=t=>{ge(t);const r=Q.find(u=>u.id===t);r&&ie({label:r.label,href:r.href||""})},Ke=()=>{if(!ce||!W.label)return h.error("Please select a menu and enter a name.");const t=[...le],r=ce.split("-");r.length===1?(t[r[0]].label=W.label,t[r[0]].href=W.href):r.length===2?(t[r[0]].sub[r[1]].label=W.label,t[r[0]].sub[r[1]].href=W.href):r.length===3&&(t[r[0]].sub[r[1]].sub[r[2]].label=W.label,t[r[0]].sub[r[1]].sub[r[2]].href=W.href),Ne(t,"Menu Updated Successfully!"),ge(""),ie({label:"",href:""})},Ve=()=>{if(!G.label)return h.error("Menu Name is required!");const t=[...le],r={label:G.label,href:G.href};if(G.parentId==="top")t.push(r);else{const u=G.parentId.split("-");u.length===1?(t[u[0]].sub||(t[u[0]].sub=[]),t[u[0]].sub.push(r)):u.length===2&&(t[u[0]].sub[u[1]].sub||(t[u[0]].sub[u[1]].sub=[]),t[u[0]].sub[u[1]].sub.push(r))}Ne(t,"New Menu Added Successfully!"),fe({label:"",href:"",parentId:"top"})},Je=t=>{if(!window.confirm("Are you sure you want to delete this menu?"))return;const r=[...le],u=t.split("-");u.length===1?r.splice(u[0],1):u.length===2?r[u[0]].sub.splice(u[1],1):u.length===3&&r[u[0]].sub[u[1]].sub.splice(u[2],1),Ne(r,"Menu Deleted!"),ce===t&&(ge(""),ie({label:"",href:""}))},[T,O]=o.useState({title:"",desc:"",type:"WORKSHOP",day:"",month:"",location:"",status:"upcoming",imageUrl:""}),[$,ne]=o.useState({text:"",link:"",type:"General",isNew:!0}),[N,se]=o.useState({title:"",content:"",path:"",slug:"",contentType:"html"}),[Y,de]=o.useState({text:"",link:"",type:"News"}),[X,pe]=o.useState({title:"",link:"",type:"Document"}),[H,be]=o.useState({title:"",cat:"Seminars",src:""}),Qe=async t=>{t.preventDefault(),D(!0);try{if(V){if(!N.title){h.error("Title cannot be empty."),D(!1);return}const r={title:N.title.trim(),content:N.content,contentType:N.contentType,updatedAt:B()};await me(L(z,"pages",V.id),r),h.success("Page updated successfully!")}else if(I==="update"){if(!N.title||!N.path){h.error("Title and Menu Link are required."),D(!1);return}let r=N.path.startsWith("/#")?N.path.replace("/#",""):N.path;const u={title:N.title.trim(),content:N.content,contentType:N.contentType,path:r,slug:"",createdAt:B()};await Z(K(z,"pages"),u),h.success("Page linked to menu successfully!")}else{if(!N.title||!N.slug){h.error("Title and Custom URL Slug are required."),D(!1);return}const r=N.slug.toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\w-]+/g,""),u={title:N.title.trim(),content:N.content,contentType:N.contentType,path:"",slug:r,createdAt:B()};await Z(K(z,"pages"),u),h.success('Page created! It is automatically added to the "More" menu.')}De()}catch(r){h.error("Error: "+r.message)}D(!1)},Ze=t=>{xe(t);const r=t.path?t.path.startsWith("/#")?t.path:`/#${t.path}`:"",u=Q.some(F=>F.href===r);se({title:t.title||"",content:t.content||"",path:u?r:"",slug:t.slug||"",contentType:t.contentType||"html"}),J(u?"update":"create"),R||document.querySelector(".admin-main").scrollTo({top:0,behavior:"smooth"})},et=async t=>{if(t.preventDefault(),!H.src.trim())return alert("Image path is required.");D(!0);try{await Z(K(z,"gallery"),{title:H.title.trim(),cat:H.cat.trim(),src:H.src.trim(),createdAt:B()}),h.success("Photo published to Gallery!"),be({title:"",cat:"Seminars",src:""})}catch(r){alert("Upload Error: "+r.message)}D(!1)},tt=async t=>{if(window.confirm("Are you sure you want to remove this photo?"))try{await oe(L(z,"gallery",t)),h.success("Photo removed successfully!")}catch(r){h.error("Error: "+r.message)}},at=async t=>{t.preventDefault(),D(!0);try{q?(await me(L(z,"events",q.id),{...T,updatedAt:B()}),h.success("Event updated!")):(await Z(K(z,"events"),{...T,createdAt:B()}),h.success("Event added!")),Se()}catch(r){h.error("Error: "+r.message)}D(!1)},it=async t=>{if(t.preventDefault(),!$.text.trim())return h.error("Notice text is required");D(!0);try{ee?(await me(L(z,"notices",ee.id),{...$,updatedAt:B()}),h.success("Notice Updated successfully! 🎉")):(await Z(K(z,"notices"),{...$,date:new Date().toISOString(),createdAt:B()}),h.success("Notice published successfully! 🎉")),Ce()}catch(r){h.error("Error: "+r.message)}D(!1)},nt=async t=>{if(t.preventDefault(),!Y.text.trim())return h.error("Announcement text is required");D(!0);try{te?(await me(L(z,"announcements",te.id),{...Y,updatedAt:B()}),h.success("News updated successfully! 🎉")):(await Z(K(z,"announcements"),{...Y,date:new Date().toISOString(),createdAt:B()}),h.success("News published successfully! 🎉")),ze()}catch(r){h.error("Error: "+r.message)}D(!1)},st=async t=>{if(t.preventDefault(),!X.title.trim()||!X.link.trim())return h.error("Title and Link are required");D(!0);try{ae?(await me(L(z,"pdfReports",ae.id),{...X,updatedAt:B()}),h.success("Document updated successfully! 🎉")):(await Z(K(z,"pdfReports"),{...X,date:new Date().toISOString(),createdAt:B()}),h.success("Document published successfully! 🎉")),Ae()}catch(r){h.error("Error: "+r.message)}D(!1)},rt=t=>{Re(t),O({title:t.title||"",desc:t.desc||"",type:t.type||"WORKSHOP",day:t.day||"",month:t.month||"",location:t.location||"",status:t.status||"upcoming",imageUrl:t.imageUrl||""})},ot=t=>{Le(t),ne({text:t.text||"",link:t.link||"",type:t.type||"General",isNew:t.isNew!==!1})},lt=t=>{Me(t),de({text:t.text||"",link:t.link||"",type:t.type||"News"})},ct=t=>{Pe(t),pe({title:t.title||"",link:t.link||"",type:t.type||"Document"})},Se=()=>{Re(null),O({title:"",desc:"",type:"WORKSHOP",day:"",month:"",location:"",status:"upcoming",imageUrl:""})},Ce=()=>{Le(null),ne({text:"",link:"",type:"General",isNew:!0})},ze=()=>{Me(null),de({text:"",link:"",type:"News"})},Ae=()=>{Pe(null),pe({title:"",link:"",type:"Document"})},De=()=>{xe(null),se({title:"",content:"",path:"",slug:"",contentType:"html"})},dt=async t=>{if(window.confirm("Delete this event?"))try{await oe(L(z,"events",t)),h.success("Event Deleted!"),q?.id===t&&Se()}catch(r){h.error(r.message)}},pt=async t=>{if(window.confirm("Delete this notice?"))try{await oe(L(z,"notices",t)),h.success("Notice Deleted!"),ee?.id===t&&Ce()}catch(r){h.error(r.message)}},mt=async t=>{if(window.confirm("Delete this news?"))try{await oe(L(z,"announcements",t)),h.success("News Deleted!"),te?.id===t&&ze()}catch(r){h.error(r.message)}},ht=async t=>{if(window.confirm("Delete this Document?"))try{await oe(L(z,"pdfReports",t)),h.success("Document Deleted!"),ae?.id===t&&Ae()}catch(r){h.error(r.message)}},xt=async t=>{if(window.confirm("Delete this page?"))try{await oe(L(z,"pages",t)),h.success("Page Deleted!"),V?.id===t&&De()}catch(r){h.error(r.message)}},ut=Q.map(t=>({id:`menu-${t.id}`,realId:t.id,docType:"Menu",contentType:"Menu",title:t.label,displayText:`Hierarchy: ${t.pathStr}`,createdAt:{toMillis:()=>Date.now()+1e6},path:t.href||"Dropdown Menu"})),gt=[...m.map(t=>({...t,contentType:"Page"})),...l.map(t=>({...t,title:t.text.substring(0,50)+"...",contentType:"Notice"})),...f.map(t=>({...t,title:t.text.substring(0,50)+"...",contentType:"News"})),...g.map(t=>({...t,contentType:"Event"})),...y.map(t=>({...t,contentType:"Document"})),...c.map(t=>({...t,contentType:"Gallery"})),...ut].sort((t,r)=>(r.createdAt?.toMillis()||0)-(t.createdAt?.toMillis()||0)).filter(t=>{const r=t.title?.toLowerCase().includes(S.toLowerCase()),u=d==="all"||t.contentType.toLowerCase()===d;return r&&u}),ft=t=>{t.contentType==="Menu"?(j("menu_builder"),ke(t.realId),document.querySelector(".main-scroll-area").scrollTo({top:0,behavior:"smooth"})):j(t.contentType.toLowerCase()+"s")};return e.jsxs("div",{className:"admin-wrapper",children:[e.jsx("style",{children:`
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
        .preview-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 10002; backdrop-filter: blur(5px); }
        .preview-modal-content { background: #f4f7fa; width: 90%; max-width: 900px; height: 85vh; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); display: flex; flex-direction: column; overflow: hidden; }
        .preview-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 15px 25px; background: #fff; border-bottom: 1px solid #e2e8f0; }
        .preview-modal-header h3 { margin: 0; color: ${a.navy}; font-size: 18px; }
        .preview-modal-header button { background: transparent; border: none; font-size: 24px; cursor: pointer; color: #666; }
        .preview-modal-body { padding: 30px 40px; overflow-y: auto; flex: 1; }
        .dynamic-rich-content table { width: 100% !important; border-collapse: collapse; margin: 20px 0; display: block; overflow-x: auto; white-space: nowrap; font-size: 14px; }
        .dynamic-rich-content th { background: ${a.navy}; color: white; padding: 12px 15px; text-align: left; }
        .dynamic-rich-content td { padding: 12px 15px; border: 1px solid #e2e8f0; }
        .dynamic-rich-content tr:nth-child(even) { background-color: #f8fafc; }
        .dynamic-rich-content iframe { width: 100%; aspect-ratio: 16 / 9; height: auto; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 20px 0; }
        .dynamic-rich-content img { max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin: 20px 0; display: block; }
        .dynamic-rich-content h1, .dynamic-rich-content h2, .dynamic-rich-content h3 { color: ${a.navy}; margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 800; line-height: 1.3; }
        .dynamic-rich-content p { margin-bottom: 1.5em; line-height: 1.8; color: #334155; font-size: 16px; }
        .dynamic-rich-content ul, .dynamic-rich-content ol { margin-bottom: 1.5em; padding-left: 20px; color: #334155; line-height: 1.8; font-size: 16px;}
        .data-list { display: flex; flex-direction: column; gap: 15px; word-wrap: break-word; overflow-wrap: break-word; }
        .data-item { display: flex; justify-content: space-between; align-items: center; padding: 20px 25px; border: 1px solid #edf2f7; border-radius: 12px; background: #fff; }
        .data-content h4 { margin: 0 0 6px; color: ${a.navy}; font-size: 16px; font-weight: 700; }
        .badge { font-size: 11px; padding: 4px 10px; border-radius: 6px; font-weight: 700; display: inline-block; margin-bottom: 8px; }
        
        .mobile-topbar { display: none; }
        @media (max-width: 1024px) {
          .admin-sidebar { position: fixed; transform: translateX(-100%); height: 100%; }
          .admin-sidebar.open { transform: translateX(0); }
          .mobile-topbar { display: flex; background: ${a.navyDark}; color: white; padding: 15px 20px; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 10000; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .admin-main { padding: 20px; }
          .card { padding: 25px; margin-bottom: 25px; }
          .data-item { flex-direction: column; align-items: flex-start; gap: 15px; }
          .action-btns { width: 100%; display: flex; justify-content: flex-end; }
        }
      `}),e.jsxs("div",{className:"mobile-topbar",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px"},children:[e.jsx("button",{onClick:()=>k(!0),style:{background:"transparent",border:"none",color:"#fff",fontSize:"28px"},children:"☰"}),e.jsx("h2",{style:{margin:0,fontSize:"18px",fontWeight:800,color:a.gold},children:"GNC Admin"})]}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px",fontSize:"13px"},onClick:i,children:"Exit"})]}),e.jsxs("div",{className:`admin-sidebar ${he?"open":""}`,children:[e.jsxs("div",{className:"sidebar-header",children:[e.jsx("h2",{className:"sidebar-title",children:"Workspace"}),he&&e.jsx("button",{onClick:()=>k(!1),style:{background:"transparent",color:"#fff",border:"none",fontSize:"24px"},children:"✕"})]}),e.jsx("div",{className:"nav-menu",children:[{id:"dashboard",label:"Dashboard",icon:"📊"},{id:"menu_builder",label:"Menu Editor",icon:"🧭"},{id:"pages",label:"Dynamic Pages",icon:"📄"},{id:"gallery",label:"Photo Gallery",icon:"📸"},{id:"notices",label:"Notice Board",icon:"📢"},{id:"announcements",label:"Academic News",icon:"📣"},{id:"pdfReports",label:"E-Documents",icon:"📁"},{id:"events",label:"Campus Events",icon:"🏆"}].map(t=>e.jsxs("div",{className:`nav-item ${b===t.id?"active":""}`,onClick:()=>{j(t.id),k(!1)},children:[e.jsx("span",{className:"nav-icon",children:t.icon})," ",e.jsx("span",{children:t.label})]},t.id))}),e.jsx("div",{style:{marginTop:"auto",padding:"20px"},children:e.jsx("button",{onClick:i,className:"btn btn-primary",style:{width:"100%",background:"red"},children:"Logout"})})]}),e.jsxs("div",{className:"admin-main",children:[b==="menu_builder"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{background:"#fff3cd",padding:"20px",borderRadius:"12px",borderLeft:"5px solid #856404",marginBottom:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("h4",{style:{margin:"0 0 5px 0",color:"#856404",fontSize:"18px"},children:"Missing your original Menu?"}),e.jsx("p",{style:{margin:0,color:"#666",fontSize:"14px"},children:"Click the button to automatically restore all your original menus from your database code."})]}),e.jsx("button",{className:"btn btn-gold",onClick:Ye,disabled:M,children:"🔄 Restore Original Menu"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"30px"},children:[e.jsxs("div",{className:"card",style:{borderTop:`4px solid ${a.navy}`},children:[e.jsx("div",{className:"card-title",children:"✏️ 1. Edit Existing Menu"}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Select Menu to Edit"}),e.jsxs("select",{className:"input",value:ce,onChange:t=>ke(t.target.value),children:[e.jsx("option",{value:"",children:"-- Choose an Existing Menu --"}),Q.map(t=>e.jsxs("option",{value:t.id,children:[t.pathStr," ",t.href?`(${t.href})`:""]},t.id))]})]}),ce&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Change Menu Name"}),e.jsx("input",{className:"input",value:W.label,onChange:t=>ie({...W,label:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Change Menu Link URL (Optional)"}),e.jsx("input",{className:"input",value:W.href,onChange:t=>ie({...W,href:t.target.value}),placeholder:"/#/p/page-slug"})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{className:"btn btn-gold",onClick:Ke,disabled:M,children:"💾 Update Menu"}),e.jsx("button",{className:"btn btn-secondary",onClick:()=>{ge(""),ie({label:"",href:""})},children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",style:{borderTop:`4px solid ${a.gold}`},children:[e.jsx("div",{className:"card-title",children:"➕ 2. Add New Menu / Sub-menu"}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"New Menu Name"}),e.jsx("input",{className:"input",value:G.label,onChange:t=>fe({...G,label:t.target.value}),placeholder:"e.g. Gallery"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"New Menu Link URL (Optional)"}),e.jsx("input",{className:"input",value:G.href,onChange:t=>fe({...G,href:t.target.value}),placeholder:"/#/gallery"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Select Parent Location"}),e.jsxs("select",{className:"input",value:G.parentId,onChange:t=>fe({...G,parentId:t.target.value}),children:[e.jsx("option",{value:"top",children:"--- Make Top Level Menu (Main Navbar) ---"}),Q.filter(t=>t.level<2).map(t=>e.jsxs("option",{value:t.id,children:["Add under: ",t.pathStr]},t.id))]})]}),e.jsx("button",{className:"btn btn-primary",onClick:Ve,disabled:M,children:"🚀 Add to Website"})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📂 3. Live Menu Structure List"}),e.jsx("div",{className:"data-list",children:Q.map(t=>e.jsxs("div",{className:"data-item",style:{marginLeft:`${t.level*30}px`,borderLeft:t.level===0?`4px solid ${a.navy}`:t.level===1?`2px dashed ${a.gold}`:"2px dotted #94a3b8"},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsxs("h4",{style:{display:"flex",alignItems:"center",gap:"10px",fontSize:t.level===0?"16px":"14px"},children:[t.level>0&&e.jsx("span",{style:{color:"#cbd5e1"},children:"↳"})," ",t.label]}),t.href&&e.jsxs("div",{style:{fontSize:"12px",color:a.success,fontWeight:700,marginTop:"5px"},children:["🔗 ",t.href]})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"6px 12px",fontSize:"12px"},onClick:()=>{ke(t.id),window.scrollTo({top:0,behavior:"smooth"})},children:"✏️ Edit"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"6px 12px",fontSize:"12px"},onClick:()=>Je(t.id),children:"🗑️ Delete"})]})]},t.id))})]})]}),b==="dashboard"&&e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📊 Content Dashboard"}),e.jsxs("div",{style:{display:"flex",gap:"20px",marginBottom:"20px"},children:[e.jsx("input",{type:"text",placeholder:"Search all content...",className:"input",value:S,onChange:t=>U(t.target.value)}),e.jsxs("select",{className:"input",value:d,onChange:t=>C(t.target.value),children:[e.jsx("option",{value:"all",children:"All Types"}),e.jsx("option",{value:"menu",children:"Navbar Menu"}),e.jsx("option",{value:"page",children:"Page"}),e.jsx("option",{value:"notice",children:"Notice"}),e.jsx("option",{value:"news",children:"News"}),e.jsx("option",{value:"event",children:"Event"}),e.jsx("option",{value:"document",children:"Document"}),e.jsx("option",{value:"gallery",children:"Gallery"})]})]}),e.jsx("div",{className:"data-list",children:gt.map(t=>e.jsxs("div",{className:"data-item",children:[e.jsxs("div",{className:"data-content",children:[e.jsx("span",{className:"badge",style:{background:"#eee",color:"#333"},children:t.contentType}),e.jsx("h4",{style:{whiteSpace:"normal",wordBreak:"break-all"},children:t.title}),t.path&&e.jsx("p",{style:{margin:"5px 0 0",fontSize:"12px",color:"#666"},children:t.displayText||t.path})]}),e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>ft(t),children:"Go to Edit"})]},t.id))})]}),b==="gallery"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📸 Add to Photo Gallery"}),e.jsxs("form",{onSubmit:et,children:[e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Photo Title"}),e.jsx("input",{className:"input",value:H.title,onChange:t=>be({...H,title:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Category"}),e.jsxs("select",{className:"input",value:H.cat,onChange:t=>be({...H,cat:t.target.value}),children:[e.jsx("option",{value:"Seminars",children:"Seminars"}),e.jsx("option",{value:"Cultural Fest",children:"Cultural Fest"}),e.jsx("option",{value:"Guest Visit",children:"Guest Visit"}),e.jsx("option",{value:"Campus",children:"Campus"}),e.jsx("option",{value:"Departments",children:"Departments"}),e.jsx("option",{value:"NSS Programs",children:"NSS Programs"})]})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Image Path (from public folder)"}),e.jsx("input",{className:"input",value:H.src,onChange:t=>be({...H,src:t.target.value}),required:!0})]}),e.jsx("div",{className:"btn-group",children:e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:M,children:M?"Processing...":"🚀 Publish Photo"})})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"🖼️ Live Cloud Gallery Images"}),e.jsx("div",{className:"data-list",style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))",gap:"20px",flexDirection:"unset"},children:(c||[]).map(t=>e.jsxs("div",{style:{border:"1px solid #edf2f7",borderRadius:"12px",overflow:"hidden",background:"#fff"},children:[e.jsx("img",{src:t.src,alt:t.title,style:{width:"100%",height:"180px",objectFit:"cover"}}),e.jsxs("div",{style:{padding:"15px"},children:[e.jsx("span",{className:"badge",style:{background:"#fff3cd",color:"#856404"},children:t.cat}),e.jsx("h4",{style:{margin:"5px 0",fontSize:"15px",color:a.navy},children:t.title}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 0",width:"100%",marginTop:"10px",fontSize:"13px"},onClick:()=>tt(t.id),children:"🗑️ Remove Photo"})]})]},t.id))})]})]}),b==="pages"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📄 ",V?"Edit Page Details":"Design New Page"]}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"20px",marginBottom:"30px",background:"#f8fafc",padding:"20px",borderRadius:"12px",border:"1px solid #edf2f7"},children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer",fontWeight:600,color:a.navy},children:[e.jsx("input",{type:"radio",value:"update",checked:I==="update",onChange:()=>J("update")})," Update Existing Menu Link"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer",fontWeight:600,color:a.navy},children:[e.jsx("input",{type:"radio",value:"create",checked:I==="create",onChange:()=>J("create")})," Create Custom URL Page"]})]}),e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Page Title"}),e.jsx("input",{className:"input",placeholder:"e.g. Computer Science",value:N.title,onChange:t=>{const r=t.target.value;se({...N,title:r,slug:I==="create"?r.toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\w-]+/g,""):N.slug})},required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:I==="update"?"Target Menu Link":"Custom URL Slug"}),I==="update"?e.jsxs("select",{className:"input",value:N.path,onChange:t=>se({...N,path:t.target.value,slug:""}),required:!0,children:[e.jsx("option",{value:"",children:"-- Select Menu --"}),Q.filter(t=>t.href).map(t=>e.jsxs("option",{value:t.href,children:[t.pathStr," ",t.href?`(${t.href})`:""]},t.id))]}):e.jsx("input",{className:"input",placeholder:"e.g. computer-science",value:N.slug,onChange:t=>se({...N,slug:t.target.value.toLowerCase().trim().replace(/\s+/g,"-"),path:""}),required:!0})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Page Content"}),e.jsx(ye,{ref:E,value:N.content,config:s,tabIndex:1,onBlur:t=>se({...N,content:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>we(N.content),children:"👁️ Preview"}),e.jsx("button",{className:"btn btn-gold",onClick:Qe,disabled:M,children:M?"Processing...":V?"💾 Save Changes":"🚀 Publish Page"}),V&&e.jsx("button",{className:"btn btn-secondary",onClick:De,children:"Cancel"})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📂 Live Pages Database"}),e.jsx("div",{className:"data-list",children:(m||[]).map(t=>{const r=t.path?t.path.startsWith("/#")?t.path:`/#${t.path}`:`/#/p/${t.slug}`;return e.jsxs("div",{className:"data-item",style:{borderLeft:`4px solid ${a.navy}`},children:[e.jsxs("div",{className:"data-content",style:{wordBreak:"break-all"},children:[e.jsx("h4",{children:t.title}),e.jsx("a",{href:r,target:"_blank",rel:"noopener noreferrer",style:{fontSize:"13px",color:a.gold,textDecoration:"none",fontWeight:700},children:"🔗 View Live Page"})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>Ze(t),children:"✏️ Edit"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>xt(t.id),children:"🗑️"})]})]},t.id)})})]})]}),b==="notices"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📢 ",ee?"Edit Notice":"Broadcast New Notice"]}),e.jsxs("form",{onSubmit:it,children:[e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Category"}),e.jsxs("select",{className:"input",value:$.type,onChange:t=>ne({...$,type:t.target.value}),children:[e.jsx("option",{children:"General"}),e.jsx("option",{children:"Examination"}),e.jsx("option",{children:"Admission"}),e.jsx("option",{children:"Holiday"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Attachment URL (Drive/PDF)"}),e.jsx("input",{className:"input",placeholder:"Optional Link",value:$.link,onChange:t=>ne({...$,link:t.target.value})})]}),e.jsx("div",{className:"form-group",style:{alignSelf:"center"},children:e.jsxs("label",{className:"label",style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("input",{type:"checkbox",checked:$.isNew,onChange:t=>ne({...$,isNew:t.target.checked})}),' Show "NEW" Badge']})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Notice Message (Rich Text)"}),e.jsx(ye,{ref:E,value:$.text,config:s,onBlur:t=>ne({...$,text:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:M,children:M?"Processing...":ee?"💾 Update Notice":"🚀 Broadcast Notice"}),ee&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:Ce,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📋 Recent Notices"}),e.jsx("div",{className:"data-list",children:(l||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:`5px solid ${a.gold}`},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsxs("span",{className:"badge",style:{background:"#fff3cd",color:"#856404"},children:[t.type," ",t.isNew&&e.jsx("span",{style:{color:"red",marginLeft:"5px"},children:" (NEW)"})]}),e.jsxs("span",{style:{fontSize:"12px",marginLeft:"12px",color:"#718096",fontWeight:600},children:["📅 ",t.date?new Date(t.date).toLocaleDateString("en-GB"):"N/A"]}),e.jsx("div",{dangerouslySetInnerHTML:{__html:t.text},style:{margin:"8px 0",fontSize:"15px",color:"#1a202c",fontWeight:600}}),t.link&&e.jsx("a",{href:t.link,target:"_blank",rel:"noreferrer",style:{fontSize:"12.5px",color:a.navy,fontWeight:700,textDecoration:"none"},children:"📎 Open Attachment"})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>ot(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>pt(t.id),children:"🗑️"})]})]},t.id))})]})]}),b==="announcements"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📣 ",te?"Edit News":"Publish Academic News"]}),e.jsxs("form",{onSubmit:nt,children:[e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"News Category"}),e.jsxs("select",{className:"input",value:Y.type,onChange:t=>de({...Y,type:t.target.value}),children:[e.jsx("option",{children:"News"}),e.jsx("option",{children:"Achievement"}),e.jsx("option",{children:"Update"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Reference Link (Optional)"}),e.jsx("input",{className:"input",placeholder:"URL",value:Y.link,onChange:t=>de({...Y,link:t.target.value})})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"News Content (Rich Text)"}),e.jsx(ye,{ref:E,value:Y.text,config:s,onBlur:t=>de({...Y,text:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:M,children:te?"💾 Update News":"🚀 Publish News"}),te&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:ze,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"🗞️ Published News"}),e.jsx("div",{className:"data-list",children:(f||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:"5px solid #d32f2f"},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsx("span",{className:"badge",style:{background:"#ffe5e5",color:"#d32f2f"},children:t.type}),e.jsx("div",{dangerouslySetInnerHTML:{__html:t.text},style:{margin:"8px 0",fontSize:"15px",color:"#1a202c",fontWeight:600}})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>lt(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>mt(t.id),children:"🗑️"})]})]},t.id))})]})]}),b==="pdfReports"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📁 ",ae?"Edit Document":"Upload E-Document"]}),e.jsxs("form",{onSubmit:st,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Document Title"}),e.jsx("input",{className:"input",value:X.title,onChange:t=>pe({...X,title:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Document URL (Drive/PDF Link)"}),e.jsx("input",{className:"input",value:X.link,onChange:t=>pe({...X,link:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Document Type"}),e.jsxs("select",{className:"input",value:X.type,onChange:t=>pe({...X,type:t.target.value}),children:[e.jsx("option",{children:"Document"}),e.jsx("option",{children:"Report"}),e.jsx("option",{children:"Syllabus"})]})]})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:M,children:ae?"💾 Update Doc":"🚀 Publish Doc"}),ae&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:Ae,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📚 Live Documents"}),e.jsx("div",{className:"data-list",children:(y||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:"5px solid #10b981"},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsx("span",{className:"badge",style:{background:"#e6f7f1",color:"#047857"},children:t.type}),e.jsx("h4",{children:t.title}),e.jsx("a",{href:t.link,target:"_blank",rel:"noreferrer",style:{fontSize:"13px",color:"#10b981",textDecoration:"none",fontWeight:700},children:"⬇️ View / Download Source"})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>ct(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>ht(t.id),children:"🗑️"})]})]},t.id))})]})]}),b==="events"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["🏆 ",q?"Edit Campus Event":"Add Campus Event"]}),e.jsxs("form",{onSubmit:at,children:[e.jsxs("div",{className:"form-grid",style:{gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))"},children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Event Title"}),e.jsx("input",{className:"input",value:T.title,onChange:t=>O({...T,title:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Event Type"}),e.jsxs("select",{className:"input",value:T.type,onChange:t=>O({...T,type:t.target.value}),children:[e.jsx("option",{children:"WORKSHOP"}),e.jsx("option",{children:"SEMINAR"}),e.jsx("option",{children:"CULTURAL"}),e.jsx("option",{children:"SPORTS"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Day (e.g. 24)"}),e.jsx("input",{className:"input",value:T.day,onChange:t=>O({...T,day:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Month (e.g. MAR)"}),e.jsx("input",{className:"input",value:T.month,onChange:t=>O({...T,month:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Location"}),e.jsx("input",{className:"input",value:T.location,onChange:t=>O({...T,location:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Status"}),e.jsxs("select",{className:"input",value:T.status,onChange:t=>O({...T,status:t.target.value}),children:[e.jsx("option",{value:"upcoming",children:"Upcoming Event"}),e.jsx("option",{value:"recent",children:"Recent Event"})]})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Image Path (from public folder)"}),e.jsx("input",{className:"input",placeholder:"e.g. /images/sports-day.jpg",value:T.imageUrl,onChange:t=>O({...T,imageUrl:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Event Description (Rich Text)"}),e.jsx(ye,{ref:E,value:T.desc,config:s,onBlur:t=>O({...T,desc:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:M,children:q?"💾 Update Event":"🚀 Publish Event"}),q&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:Se,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📆 Event Roster"}),e.jsx("div",{className:"data-list",children:(g||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:"5px solid #8b5cf6"},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsx("span",{className:"badge",style:{background:"#ede9fe",color:"#6d28d9"},children:t.type}),e.jsx("h4",{children:t.title}),e.jsx("div",{dangerouslySetInnerHTML:{__html:t.desc},style:{fontSize:"13px",color:"#666",marginTop:"5px"}}),e.jsxs("p",{style:{marginTop:"5px",fontSize:"12px",fontWeight:"bold"},children:["📍 ",t.location||"Campus","   |   📅 ",t.day," ",t.month]})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>rt(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>dt(t.id),children:"🗑️"})]})]},t.id))})]})]}),v&&e.jsx("div",{className:"preview-modal-overlay",children:e.jsxs("div",{className:"preview-modal-content",children:[e.jsxs("div",{className:"preview-modal-header",children:[e.jsx("h3",{children:"Live Content Preview"}),e.jsx("button",{onClick:()=>x(!1),children:"✕"})]}),e.jsx("div",{className:"preview-modal-body dynamic-rich-content",children:Fe(He.sanitize(A,{ADD_TAGS:["iframe"],ADD_ATTR:["allow","allowfullscreen","frameborder","scrolling"]}))})]})})]})]})}function Ht({onSuccess:i,onClose:l}){const[m,g]=o.useState(""),[c,p]=o.useState(""),[f,y]=o.useState(""),[n,b]=o.useState(!1),j=S=>{S.preventDefault(),y(""),b(!0),setTimeout(()=>{m==="admin"&&c==="admin123"?i():(y("❌ Incorrect Username or Password"),b(!1))},800)};return e.jsxs("div",{className:"login-overlay",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"login-box",children:[e.jsx("button",{className:"close-btn",onClick:l,title:"Close",children:"✕"}),e.jsxs("div",{className:"login-header",children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"10px"},children:"🛡️"}),e.jsx("h2",{children:"Admin Portal"}),e.jsx("p",{children:"Authorized Personnel Only"})]}),e.jsxs("form",{className:"login-form",onSubmit:j,children:[f&&e.jsx("div",{className:"error-box",children:f}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"input-label",children:"Username"}),e.jsx("input",{type:"text",className:"login-input",placeholder:"Enter your username",value:m,onChange:S=>g(S.target.value),required:!0})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"input-label",children:"Password"}),e.jsx("input",{type:"password",className:"login-input",placeholder:"Enter your password",value:c,onChange:S=>p(S.target.value),required:!0})]}),e.jsx("button",{type:"submit",className:"login-btn",disabled:n,children:n?"Authenticating...":"Secure Login 🚀"})]})]})]})}const Ft=()=>{const i=Ie();let l=i.pathname;l==="/"&&i.hash.startsWith("#/")&&(l=i.hash.substring(1));const m=l.split("/").filter(g=>g);return m.length===0?null:e.jsx("div",{style:{background:"#f8f9fa",borderBottom:"1px solid #e0e0e0"},children:e.jsxs("div",{style:{maxWidth:"1400px",margin:"0 auto",padding:"12px 20px",fontSize:"13.5px",color:"#666",display:"flex",alignItems:"center",fontWeight:"500"},children:[e.jsxs(_,{to:"/",style:{color:a.navy,textDecoration:"none",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{children:"🏠"})," Home"]}),m.map((g,c)=>{const p=`/${m.slice(0,c+1).join("/")}`,f=c===m.length-1,y=g.replace(/-/g," ").replace(/\b\w/g,n=>n.toUpperCase());return e.jsxs("span",{style:{display:"flex",alignItems:"center"},children:[e.jsx("span",{style:{margin:"0 10px",color:"#ccc",fontSize:"10px"},children:"❯"}),f?e.jsx("span",{style:{color:a.gold,fontWeight:"700"},children:y}):e.jsx(_,{to:p,style:{color:a.navy,textDecoration:"none"},children:y})]},p)})]})})};function _t(){const i=[{label:"Principal Message",icon:"👨‍🏫",href:"#/about-us/principal-message"},{label:"Admission Rules",icon:"🎓",href:"#/admission/rule"},{label:"Departments",icon:"🏛️",href:"#/academics/course-offered"},{label:"NSS / NCC",icon:"🎖️",href:"#/activity/nss"},{label:"Syllabus",icon:"📚",href:"#/syllabus"},{label:"Photo Gallery",icon:"📸",href:"#/gallery"},{label:"Contact Us",icon:"📞",href:"#/contact"}];return e.jsx("div",{style:{position:"fixed",right:0,top:"50%",transform:"translateY(-50%)",zIndex:990,display:"flex",flexDirection:"column",gap:"4px"},children:i.map((l,m)=>e.jsx(qt,{action:l,index:m},m))})}const qt=({action:i,index:l})=>{const[m,g]=o.useState(!1);return e.jsxs("a",{href:i.href,onMouseEnter:()=>g(!0),onMouseLeave:()=>g(!1),style:{display:"flex",alignItems:"center",justifyContent:"flex-start",padding:"12px 15px",backgroundColor:m?a.gold:a.navy,color:m?a.navy:"#fff",textDecoration:"none",width:m?"200px":"55px",height:"55px",borderTopLeftRadius:"12px",borderBottomLeftRadius:"12px",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",overflow:"hidden",whiteSpace:"nowrap",boxShadow:m?"-5px 5px 15px rgba(0,0,0,0.2)":"-2px 2px 8px rgba(0,0,0,0.1)",position:"relative",right:m?"0":"-5px",animation:`slideInRight 0.5s ease forwards ${l*.1}s`,opacity:0},children:[e.jsx("span",{style:{fontSize:"22px",minWidth:"30px",textAlign:"center",display:"block"},children:i.icon}),e.jsx("span",{style:{fontWeight:"800",fontSize:"14px",marginLeft:"12px",opacity:m?1:0,transition:"opacity 0.3s ease 0.1s"},children:i.label}),e.jsx("style",{children:"@keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }"})]})};function qe({page:i}){const[l,m]=o.useState([]);if(o.useEffect(()=>{if(!i)return;window.scrollTo(0,0);const c=i.path||`/p/${i.slug}`,p=Xe(K(z,"pdfReports")),f=Te(p,y=>{const b=y.docs.map(j=>({id:j.id,...j.data()})).filter(j=>j.targetPage===c);b.sort((j,S)=>new Date(S.date)-new Date(j.date)),m(b)});return()=>f()},[i]),!i)return e.jsx("div",{style:{minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f4f7fa"},children:e.jsxs("div",{style:{textAlign:"center",padding:"50px",background:"#fff",borderRadius:"16px",boxShadow:"0 10px 30px rgba(0,0,0,0.05)"},children:[e.jsx("div",{style:{fontSize:"50px",marginBottom:"15px"},children:"🚧"}),e.jsx("h2",{style:{color:a.navy,fontSize:"28px",margin:"0 0 10px"},children:"Content Updating..."}),e.jsx("p",{style:{color:"#64748b",margin:0},children:"This section is currently being updated by the administration."})]})});const g=He.sanitize(i.content,{ADD_TAGS:["iframe"],ADD_ATTR:["allow","allowfullscreen","frameborder","scrolling"]});return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:i.title}),e.jsx("p",{className:"hero-subtitle",children:"Guru Nanak College, Dhanbad"})]})]}),e.jsx("div",{className:"profile-container",children:e.jsxs("div",{className:"profile-layout",children:[e.jsxs("main",{className:"profile-main",children:[e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:"0.2s"},children:[e.jsx("h2",{className:"section-heading",children:i.title}),e.jsx("div",{className:"heading-underline"}),e.jsx("div",{className:"dynamic-rich-content",children:Fe(g)})]}),l.length>0&&e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:"0.3s"},children:[e.jsx("h2",{className:"section-heading",children:"📚 Official Documents"}),e.jsx("div",{className:"heading-underline"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:"20px"},children:l.map(c=>e.jsxs("div",{style:{display:"flex",background:"#fff",border:"1px solid #e2e8f0",borderRadius:"10px",overflow:"hidden",transition:"all 0.3s ease",boxShadow:"0 4px 6px rgba(0,0,0,0.02)"},onMouseOver:p=>{p.currentTarget.style.transform="translateY(-4px)",p.currentTarget.style.borderColor=a.gold},onMouseOut:p=>{p.currentTarget.style.transform="translateY(0)",p.currentTarget.style.borderColor="#e2e8f0"},children:[e.jsx("div",{style:{width:"80px",background:"#f1f5f9",borderRight:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"center"},children:c.coverImage?e.jsx("img",{src:c.coverImage,alt:"cover",style:{width:"100%",height:"100%",objectFit:"cover"}}):e.jsx("div",{style:{fontSize:"30px",opacity:.3},children:"📄"})}),e.jsxs("div",{style:{padding:"15px",flex:1,display:"flex",flexDirection:"column",justifyContent:"center"},children:[c.isNew&&e.jsx("span",{className:"new-badge",children:"NEW"}),e.jsx("h4",{style:{margin:"0 0 5px 0",fontSize:"14px",color:a.navy,lineHeight:"1.4"},children:c.title}),e.jsxs("p",{style:{margin:"0 0 10px 0",fontSize:"11px",color:"#64748b",fontWeight:600},children:["📅 ",c.date]}),e.jsx("a",{href:c.pdfLink||c.link,target:"_blank",rel:"noreferrer",className:"download-btn",children:"⬇️ View Document"})]})]},c.id))})]})]}),e.jsxs("aside",{className:"profile-sidebar anim-slide-up",style:{animationDelay:"0.5s"},children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"Principal Message",path:"/about-us/principal-message"},{label:"Admission Rules",path:"/admission/rule"},{label:"Fee Structure",path:"/admission/fee-structure"},{label:"Departments",path:"/academics/course-offered"},{label:"NSS",path:"/activity/nss"},{label:"NCC",path:"/activity/ncc"},{label:"Sports",path:"/activity/games-sports"},{label:"Workshop",path:"/activity/workshop"},{label:"Syllabus",path:"/syllabus"},{label:"Academic Calendar",path:"/academics/academic-calendar"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((c,p)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(_,{to:c.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",c.label]})},p))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:"45px",marginBottom:"15px",position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 12px",fontSize:"19px",color:"#f4a023",position:"relative",zIndex:2},children:"Need Assistance?"}),e.jsx("p",{style:{fontSize:"14px",margin:"0 0 20px",color:"#e2e8f0",lineHeight:"1.6",position:"relative",zIndex:2},children:"Contact our administration office for any queries related to admission or academics."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call Helpdesk Now"})]})]})]})}),e.jsx("style",{children:`
        @media (max-width: 768px) { .dynamic-rich-content { padding: 25px !important; } }
        .dynamic-rich-content table { width: 100% !important; border-collapse: collapse; margin: 20px 0; display: block; overflow-x: auto; white-space: nowrap; font-size: 14px; }
        .dynamic-rich-content th { background: ${a.navy}; color: white; padding: 12px 15px; text-align: left; }
        .dynamic-rich-content td { padding: 12px 15px; border: 1px solid #e2e8f0; }
        .dynamic-rich-content tr:nth-child(even) { background-color: #f8fafc; }
        .dynamic-rich-content iframe { width: 100%; aspect-ratio: 16 / 9; height: auto; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 20px 0; }
        .dynamic-rich-content img { max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin: 20px 0; display: block; }
        .dynamic-rich-content h1, .dynamic-rich-content h2, .dynamic-rich-content h3 { color: ${a.navy}; margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 800; line-height: 1.3; }
        .dynamic-rich-content p { margin-bottom: 1.5em; line-height: 1.8; color: #334155; font-size: 16px; }
        .dynamic-rich-content ul, .dynamic-rich-content ol { margin-bottom: 1.5em; padding-left: 20px; color: #334155; line-height: 1.8; font-size: 16px;}
        .dynamic-rich-content li { margin-bottom: 8px; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        .new-badge { display: inline-block; background: #ef4444; color: #fff; fontSize: 9px; font-weight: 800; padding: 3px 6px; border-radius: 4px; margin-bottom: 8px; width: fit-content; animation: blink 1.5s infinite; letter-spacing: 0.5px;}
        .download-btn { display: inline-block; background: #f8fafc; color: ${a.navy}; padding: 8px 15px; border-radius: 6px; font-size: 12px; font-weight: 700; text-decoration: none; border: 1px solid #cbd5e1; text-align: center; transition: 0.2s; }
        .download-btn:hover { background: ${a.navy}; color: #fff; border-color: ${a.navy}; }
      `})]})}const Yt=()=>(o.useEffect(()=>{window.scrollTo(0,0)},[]),e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
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

        /* --- HERO HEADER --- */
        .contact-header {
          background: linear-gradient(135deg, ${a.navy} 0%, #0a1832 100%);
          color: white;
          padding: 80px 20px 140px; /* Increased bottom padding */
          text-align: center;
          position: relative;
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
        .campus-container {
          max-width: 1200px;
          margin: -120px auto 40px; /* Overlap effect */
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 40px;
          position: relative;
          z-index: 10;
        }
        .campus-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,0.07);
          border: 1px solid #e2e8f0;
          transition: all 0.4s ease;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
          display: flex;
          flex-direction: column;
        }
        .campus-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(15, 35, 71, 0.12);
          border-color: var(--accent-gold);
        }
        .card-1 { animation-delay: 0.3s; }
        .card-2 { animation-delay: 0.5s; }

        .card-header {
          padding: 25px 30px;
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
          color: var(--accent-gold);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          flex-shrink: 0;
        }
        .campus-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--primary-navy);
          margin: 0;
        }
        .campus-badge {
          font-size: 11px;
          background: var(--primary-navy);
          color: #fff;
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 700;
          margin-top: 6px;
          display: inline-block;
          letter-spacing: 0.5px;
        }
        .card-details { padding: 25px 30px; flex-grow: 1; }
        .detail-row { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px; }
        .detail-row:last-child { margin-bottom: 0; }
        .d-icon { font-size: 20px; color: var(--primary-navy); margin-top: 2px; }
        .d-text h4 { margin: 0 0 4px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; color: #718096; }
        .d-text p, .d-text a { margin: 0; font-size: 15px; color: #2d3748; font-weight: 600; text-decoration: none; line-height: 1.5; transition: color 0.2s; }
        .d-text a:hover { color: var(--accent-gold); }
        .map-container {
          width: 100%;
          height: 250px;
          border-top: 1px solid #edf2f7;
          background: #e2e8f0;
        }
        .map-container iframe {
          width: 100%;
          height: 100%;
          border: none;
          filter: grayscale(10%) contrast(1.05);
          transition: all 0.4s ease;
        }
        .campus-card:hover .map-container iframe { filter: grayscale(0%) contrast(1); }

        /* --- DIRECTORY SECTION --- */
        .directory-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .directory-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.3s ease;
        }
        .directory-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-gold);
          box-shadow: 0 8px 25px rgba(15, 35, 71, 0.08);
        }
        .dir-icon { font-size: 1.8rem; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: #f1f5f9; border-radius: 50%; flex-shrink: 0; }
        .dir-title { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; margin-bottom: 4px; }
        .dir-name { font-size: 1.1rem; font-weight: 800; color: var(--primary-navy); margin-bottom: 6px; }
        .dir-contact { font-size: 0.9rem; font-weight: 600; color: #4a5568; text-decoration: none; }
        .dir-contact:hover { color: var(--accent-gold); }

        @media (max-width: 900px) {
          .campus-container { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .contact-header { padding: 60px 20px 80px; }
          .header-title { font-size: 36px; }
          .campus-container { margin-top: -60px; }
        }
      `}),e.jsxs("header",{className:"contact-header",children:[e.jsxs("h1",{className:"header-title",children:["Get In ",e.jsx("span",{children:"Touch"})]}),e.jsx("p",{className:"header-sub",children:"We are here to assist you. Reach out to our respective campuses or directly contact our administration team for any queries."})]}),e.jsxs("div",{className:"campus-container",children:[e.jsxs("div",{className:"campus-card card-1",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏛️"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bhuda Campus"}),e.jsx("span",{className:"campus-badge",style:{background:a.navy},children:"Main Campus • Boys Wing"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsxs("p",{children:["Guru Nanak College, Bhuda",e.jsx("br",{}),"Dhanbad, Jharkhand - 826001"]})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:"tel:+917903340991",children:"+91 79033 40991"})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:"mailto:info@gncollege.org",children:"info@gncollege.org"})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bhuda Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.089853381653!2d86.43232147533682!3d23.797658878638367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69707963d7e8b%3A0x86733221469e7f7b!2sGuru%20Nanak%20College%20Dhanbad!5e0!3m2!1sen!2sin!4v1708688000000!5m2!1sen!2sin",allowFullScreen:"",loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})})]}),e.jsxs("div",{className:"campus-card card-2",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏢"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bank More Campus"}),e.jsx("span",{className:"campus-badge",style:{background:a.gold,color:a.navyDark},children:"Girls Wing • Vocational Studies"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsxs("p",{children:["Guru Nanak College, Bank More",e.jsx("br",{}),"Dhanbad, Jharkhand - 826001"]})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:"tel:+910000000000",children:"+91 (Add Number)"})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:"mailto:vocational@gncollege.org",children:"vocational@gncollege.org"})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bank More Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.630325992144!2d86.4175863149822!3d23.77601898456687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6a3048817a859%3A0x8d365f7d34c52968!2sGuru%20Nanak%20College%20Womens%20Wing!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",allowFullScreen:"",loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})})]})]}),e.jsx("div",{className:"profile-container",style:{marginTop:0},children:e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:"0.3s",background:"transparent",boxShadow:"none",border:"none",padding:"0 !important"},children:[e.jsx("h2",{className:"section-heading",style:{textAlign:"center !important",fontSize:"32px"},children:"Administration Directory"}),e.jsx("div",{className:"heading-underline",style:{margin:"0 auto 30px"}}),e.jsx("div",{className:"directory-grid",children:[{title:"Prof. In-Charge (Bhuda Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫"},{title:"Prof. In-Charge (Bank More Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫"},{title:"BCA Coordinator",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"💻"},{title:"Member, Women's Cell",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛡️"},{title:"Member, Anti-Ragging Squad",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛑"},{title:"P.A. to Principal",name:"Mr. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"📝"}].map((i,l)=>e.jsxs("div",{className:"directory-card",children:[e.jsx("div",{className:"dir-icon",children:i.icon}),e.jsxs("div",{children:[e.jsx("div",{className:"dir-title",children:i.title}),e.jsx("div",{className:"dir-name",children:i.name}),e.jsxs("a",{href:`tel:${i.phone}`,className:"dir-contact",children:["📞 ",i.phone]})]})]},l))})]})})]})),Kt=()=>(o.useEffect(()=>{window.scrollTo(0,0)},[]),e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("header",{className:"profile-hero",children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"College Profile"}),e.jsx("p",{className:"hero-subtitle",children:"Excellence in Education Since 1970"})]})]}),e.jsx("div",{className:"profile-container",children:e.jsxs("div",{className:"profile-layout",children:[e.jsxs("main",{className:"profile-main",children:[e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:"0.2s"},children:[e.jsxs("div",{className:"section-grid",style:{marginBottom:"3rem"},children:[e.jsxs("div",{className:"text-content",children:[e.jsx("h2",{className:"section-heading",children:"College Profile"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was Established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru after whom this college is named."}),e.jsx("p",{className:"rich-text-content mt-4",children:"The college is managed by a Governing Council nominated by the Gurudwara Prabandhak Committee, Dhanbad, and draws its inspiration from the teachings of the faith propounded by Guru Nanak Devji."})]}),e.jsx("div",{className:"image-content",children:e.jsx("img",{src:"https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop",alt:"College Campus",className:"profile-img hover-scale"})})]}),e.jsxs("div",{style:{marginBottom:"3rem"},children:[e.jsx("h2",{className:"section-heading",children:"About the College"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"Initially the college got affiliated to the Ranchi University – Ranchi since 1970 the year it was stared. But with the passage of time, Binod Bihari Mahto Koylanchal University, Dhanbad came into existence in 2017; and the affiliation of the college got transferred to this new University in 2017."}),e.jsx("p",{className:"rich-text-content mt-4",children:"At present, the college has got permanent affiliation with Binod Bihari Mahto Koylanchal University, Dhanbad in the faculties of Humanities, Social Sciences, commerce and such vocational courses as Bachelor of Computer Applications. The college has got “Deficit Grant College Status” by the government of Jharkhand. Also the college is registered u/s 2F and 12B of the UGC Act."}),e.jsx("p",{className:"rich-text-content mt-4",children:"The main aim and objective behind sponsoring this college was to impart value - based teaching to the young men and women of Dhanbad. The college attaches great importance to moral teaching. The college does not merely offer teaching in such subject as would enable young students to earn their bread and butter, but it also emphasizes grooming them into worthy (morally sound) citizens."})]}),e.jsxs("div",{children:[e.jsx("h2",{className:"section-heading",children:"Our Campuses"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",style:{marginBottom:"3rem"},children:"Guru Nanak College, Dhanbad functions at two main campuses:"}),e.jsxs("div",{className:"grid-2-col gap-6",children:[e.jsxs("div",{className:"campus-box",children:[e.jsx("h3",{style:{fontSize:"1.5rem",color:"var(--primary-navy)",fontWeight:"700",marginBottom:"10px"},children:"1. Bank More Campus (Girls Wing)"}),e.jsx("p",{className:"rich-text-content",children:"The women’s wing of the College was started in the year 2000 in the Bank More Campus of the College in the morning hours. As an exclusive centre of teaching for girls, this wing has earned high reputation among stakeholders during the last few years. In the Women’s wing also, teaching is imparted for B.A./B.Com. (Hons/General) Course."})]}),e.jsxs("div",{className:"campus-box",children:[e.jsx("h3",{style:{fontSize:"1.5rem",color:"var(--primary-navy)",fontWeight:"700",marginBottom:"10px"},children:"2. Bhuda Campus (Boys Wing)"}),e.jsx("p",{className:"rich-text-content",children:"The main building – the Boys’ wing of the College is situated at Bhuda. The main building is spaciously designed in an airy surrounding quite suitable for the environment of an academic institution. The present campus has been so planned as to cater to the needs of the students for a long time."})]})]})]})]}),e.jsx("section",{className:"stats-grid stats-grid-override mb-16 anim-slide-up",style:{animationDelay:"0.7s"},children:[{label:"Years of Legacy",value:"50+",icon:"🏛️"},{label:"Expert Faculty",value:"120+",icon:"👨‍🏫"},{label:"Students",value:"5000+",icon:"🎓"},{label:"Courses",value:"30+",icon:"📚"}].map((i,l)=>e.jsxs("div",{className:"glass-card stat-card stat-card-small",children:[e.jsx("div",{className:"stat-icon",children:i.icon}),e.jsx("div",{className:"stat-value stat-value-small",children:i.value}),e.jsx("div",{className:"stat-label",children:i.label})]},l))})]}),e.jsxs("aside",{className:"profile-sidebar anim-slide-up",style:{animationDelay:"0.5s"},children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"Principal Message",path:"/about-us/principal-message"},{label:"Admission Rules",path:"/admission/rule"},{label:"Fee Structure",path:"/admission/fee-structure"},{label:"Departments",path:"/academics/course-offered"},{label:"NSS",path:"/activity/nss"},{label:"NCC",path:"/activity/ncc"},{label:"Sports",path:"/activity/games-sports"},{label:"Workshop",path:"/activity/workshop"},{label:"Syllabus",path:"/syllabus"},{label:"Academic Calendar",path:"/academics/academic-calendar"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((i,l)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(_,{to:i.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",i.label]})},l))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:"45px",marginBottom:"15px",position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 12px",fontSize:"19px",color:"#f4a023",position:"relative",zIndex:2},children:"Need Assistance?"}),e.jsx("p",{style:{fontSize:"14px",margin:"0 0 20px",color:"#e2e8f0",lineHeight:"1.6",position:"relative",zIndex:2},children:"Contact our administration office for any queries related to admission or academics."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call Helpdesk Now"})]}),e.jsxs("div",{style:{marginTop:"30px"},children:[e.jsxs("h4",{style:{fontSize:"17px",fontWeight:"700",color:"var(--primary-navy)",marginBottom:"20px",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("span",{children:"🌐"})," Connect With Us"]}),e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx("a",{href:"https://facebook.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"f"}),e.jsx("a",{href:"https://twitter.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"𝕏"}),e.jsx("a",{href:"https://instagram.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"📸"}),e.jsx("a",{href:"https://youtube.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"▶"})]})]})]})]})})]})),Oe=["/syllabus","/about-us","/about-us/vision-mission","/about-us/principal-message","/about-us/college-management/organogram","/about-us/college-management/presidents","/about-us/college-management/secretaries","/about-us/college-management/principal","/about-us/various-committees/womens-cell","/about-us/various-committees/anti-ragging","/about-us/various-committees/sc-st","/about-us/various-committees/obc","/about-us/various-committees/grievance","/about-us/various-committees/icc","/about-us/various-committees/minority","/about-us/various-committees/placement","/about-us/various-committees/rusa","/about-us/college-staff/teaching-staff","/about-us/college-staff/non-teaching-staff","/about-us/regulations/bbmku/special-ug-regulation","/about-us/regulations/bbmku/ug-regulation-fyugp","/about-us/regulations/bbmku/ug-regulation-cbcs","/about-us/regulations/college-affiliation","/about-us/regulations/ugc-section","/about-us/regulations/vbu/ug-regulation-2015","/about-us/regulations/vbu/bca-regulation","/about-us/regulations/byelaws","/about-us/regulations/exemption","/about-us/audit-report","/campus/visuals/bhuda","/campus/visuals/bank-more","/campus/visuals/vocational-building","/campus/infrastructure","/campus/classroom","/campus/ict-rooms","/campus/green-campus","/academics/iqac","/academics/course-offered","/academics/departments/humanities","/academics/departments/social-science","/academics/departments/commerce","/academics/departments/bca","/academics/departments/bba","/academics/academic-calendar","/admission/rule","/admission/document-required","/admission/fee-structure","/admission/notification/latest","/admission/notification/upcoming","/admission/intake-capacity","/activity/nss","/activity/ncc","/activity/workshop","/activity/games-sports","/activity/collaboration/rotaract-club","/activity/collaboration/sadbhavana-diwas","/naac/ssr-1st-cycle/cycle-1-documents","/naac/ssr-1st-cycle/peer-team-report","/naac/ssr-2nd-cycle/cycle-2-documents","/naac/ssr-2nd-cycle/executive-summary","/naac/aqar","/naac/nirf","/naac/perspective-plan","/publication/college-library","/publication/e-magazine","/publication/examination-results/2024","/publication/examination-results/2023","/publication/sss-report/2023-24","/publication/sss-report/2022-23","/gallery"],Vt=({pages:i})=>{const{slug:l}=kt(),[m,g]=o.useState(null);return o.useEffect(()=>{if(i&&l){const c=i.find(p=>p.slug===l);g(c)}},[l,i]),!i||i.length===0?e.jsx("div",{style:{padding:"40px 20px",textAlign:"center"},children:"Loading pages..."}):e.jsx(qe,{page:m})},Jt=({notices:i,announcements:l,events:m,gallery:g,pdfReports:c,pages:p,placeholderPaths:f,navLinks:y})=>{const[n,b]=o.useState(()=>localStorage.getItem("isGncAdmin")==="true");return n?e.jsx(Xt,{notices:i,announcements:l,events:m,gallery:g,pdfReports:c,pages:p,placeholderPaths:f,navLinks:y,onClose:()=>{b(!1),localStorage.removeItem("isGncAdmin"),window.close()}}):e.jsx(Ht,{onSuccess:()=>{b(!0),localStorage.setItem("isGncAdmin","true")},onClose:()=>window.close()})},Qt=i=>i&&new DOMParser().parseFromString(i,"text/html").body.textContent||"";function Zt(){const[i,l]=o.useState([]),[m,g]=o.useState([]),[c,p]=o.useState([]),[f,y]=o.useState([]),[n,b]=o.useState([]),[j,S]=o.useState([]),[U,d]=o.useState(null),C=Ie(),[E,s]=o.useState(!0),[v,x]=o.useState(window.innerWidth<768),A=C.pathname.startsWith("/admin");o.useEffect(()=>{const k=()=>x(window.innerWidth<768);return window.addEventListener("resize",k),()=>window.removeEventListener("resize",k)},[]),o.useEffect(()=>{const k=setTimeout(()=>s(!1),2e3);return()=>clearTimeout(k)},[]),o.useEffect(()=>{jt.init({duration:800,easing:"ease-in-out",once:!1,mirror:!0,offset:50})},[]),o.useEffect(()=>{const k=Te(L(z,"settings","navbar"),R=>{R.exists()&&R.data().links&&R.data().links.length>0?d(R.data().links):d(Ge)});return()=>k()},[]);const P=U||Ge,we=o.useMemo(()=>{const k=j.filter(w=>w.slug&&(!w.path||w.path==="")).sort((w,I)=>(I.createdAt?.toMillis()||0)-(w.createdAt?.toMillis()||0)).map(w=>({label:w.title,href:`/p/${w.slug}`})),R=JSON.parse(JSON.stringify(P));if(k.length>0){let w=R.find(I=>I.label.toLowerCase()==="more");w||(w={label:"More",href:"#",sub:[]},R.push(w)),w.sub||(w.sub=[]),k.forEach(I=>{w.sub.some(J=>J.href===I.href)||w.sub.push(I)})}return R},[j,P]),M=o.useMemo(()=>{const k=new Map;return[...j].sort((w,I)=>(I.createdAt?.toMillis()||0)-(w.createdAt?.toMillis()||0)).forEach(w=>{w.path&&!k.has(w.path)&&k.set(w.path,w)}),k},[j]);o.useEffect(()=>{const R=[["notices",l],["announcements",g],["events",p],["gallery",y],["pdfReports",b],["pages",S]].map(([w,I])=>{const J=Xe(K(z,w),Et("createdAt","desc"));return Te(J,V=>{const xe=V.docs.map(q=>({id:q.id,...q.data()}));I(xe)})});return()=>R.forEach(w=>w())},[]);const D=()=>{window.open("#/admin","_blank")},he=[...i.slice(0,3),...m.slice(0,2)].map(k=>({...k,text:Qt(k.text||k.title)}));return e.jsxs(e.Fragment,{children:[e.jsx(wt,{position:"top-right",gutter:12,containerStyle:{top:20,right:20,zIndex:999999},toastOptions:{style:{background:"rgba(15, 35, 71, 0.85)",backdropFilter:"blur(12px)",color:"#fff",border:"1px solid rgba(255, 255, 255, 0.15)",boxShadow:"0 8px 32px 0 rgba(0, 0, 0, 0.3)",padding:"16px",borderRadius:"14px",fontSize:"15px",fontWeight:"600"},success:{icon:"✅",duration:3e3},error:{icon:"❌",duration:4e3}}}),e.jsxs("div",{className:`splash-screen ${E?"":"hide"}`,children:[e.jsx("img",{src:"/gncollege-website/images/logo.png",alt:"Guru Nanak College",className:"splash-logo"}),e.jsx("div",{className:"splash-text",children:"Loading Portal..."})]}),!A&&e.jsxs(e.Fragment,{children:[e.jsx(Ut,{}),e.jsx(Wt,{items:he}),e.jsx(Gt,{onAdminClick:D,navLinks:we}),e.jsx(Ft,{}),!v&&e.jsx(_t,{})]}),e.jsx("div",{className:A?"":"page-transition",children:e.jsxs(Nt,{location:C,children:[e.jsx(re,{path:"/",element:e.jsx(Bt,{notices:i,announcements:m,pdfReports:n,sliderSlides:It,events:c,gallery:f})}),e.jsx(re,{path:"/contact",element:e.jsx(Yt,{})}),e.jsx(re,{path:"/about-us/college-profile",element:e.jsx(Kt,{})}),e.jsx(re,{path:"/admin",element:e.jsx(Jt,{notices:i,announcements:m,events:c,gallery:f,pdfReports:n,pages:j,placeholderPaths:Oe,navLinks:P})}),e.jsx(re,{path:"/p/:slug",element:e.jsx(Vt,{pages:j})}),Oe.map(k=>{const R=M.get(k);return e.jsx(re,{path:k,element:e.jsx(qe,{page:R})},k)})]})},C.pathname),!A&&e.jsxs(e.Fragment,{children:[e.jsx($t,{}),e.jsx("button",{onClick:D,style:{position:"fixed",bottom:25,right:25,background:a.navy,color:"#fff",border:`3px solid ${a.gold}`,borderRadius:"50%",width:60,height:60,cursor:"pointer",zIndex:500},children:e.jsx("span",{style:{fontSize:18},children:"⚙️"})})]})]})}function ea(){const i=Ie();return o.useEffect(()=>{"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.scrollTo(0,0)},[]),o.useEffect(()=>{const l=i.hash;if(l){const m=l.replace("#",""),g=document.getElementById(m);g&&g.scrollIntoView({behavior:"smooth"})}else window.scrollTo(0,0)},[i]),e.jsx(Zt,{})}vt.createRoot(document.getElementById("root")).render(e.jsx(yt.StrictMode,{children:e.jsx(St,{children:e.jsx(ea,{})})}));
