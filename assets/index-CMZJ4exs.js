import{a as r,j as e,R as Le}from"./react-B9mKIQH5.js";import{R as Re}from"./react-dom-D7_rhL9o.js";import{A as Ie}from"./aos-B-Mw6r96.js";import{L as X,u as oe,R as Te,a as V,b as Pe,H as Me}from"./react-router-CmInjhsw.js";import{z as $}from"./react-hot-toast-LKiRBuYi.js";import"./firebase-ZpnICJqI.js";import{i as Be,g as We,a as $e,b as F,c as G,s as I,d as q,e as T,u as K,q as pe,w as Ue,f as He,o as Ge,h as Xe}from"./@firebase-BOi6lkSM.js";import"./scheduler-CWG1rEj-.js";import"./goober-wofAfydu.js";import"./idb-BXWtuYvb.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))x(c);new MutationObserver(c=>{for(const u of c)if(u.type==="childList")for(const b of u.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&x(b)}).observe(document,{childList:!0,subtree:!0});function p(c){const u={};return c.integrity&&(u.integrity=c.integrity),c.referrerPolicy&&(u.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?u.credentials="include":c.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function x(c){if(c.ep)return;c.ep=!0;const u=p(c);fetch(c.href,u)}})();const re=[{id:"facebook",label:"f",href:"https://facebook.com/"},{id:"twitter",label:"t",href:"https://twitter.com/"},{id:"youtube",label:"y",href:"https://youtube.com/"},{id:"linkedin",label:"in",href:"https://linkedin.com/"}],Oe=[{name:"Class Rooms",emoji:"🏫"},{name:"Computer Lab",emoji:"💻"},{name:"Library",emoji:"📚"},{name:"Seminar Hall",emoji:"🎤"},{name:"Auditorium",emoji:"🎭"},{name:"Playground",emoji:"⚽"},{name:"Badminton Court",emoji:"🏸"},{name:"Gymnasium",emoji:"🏋️"},{name:"Digital Classrooms",emoji:"📱"},{name:"Cultural Dept.",emoji:"🎵"},{name:"Washroom (B)",emoji:"🚿"},{name:"Washroom (G)",emoji:"🚿"},{name:"Water Purifier",emoji:"💧"},{name:"Canteen",emoji:"🍽️"},{name:"Girls Common Room",emoji:"👩"},{name:"Online Lecture",emoji:"📡"}],Fe=[{label:"Home",href:"/"},{label:"About Us",href:"/",sub:[{label:"College Profile",href:"/about-us/college-profile"},{label:"Vision & Mission",href:"/about-us/vision-mission"},{label:"Principal Message",href:"/about-us/principal-message"},{label:"College Management",sub:[{label:"Organogram",href:"/about-us/college-management/organogram"},{label:"Presidents",href:"/about-us/college-management/presidents"},{label:"Secretaries",href:"/about-us/college-management/secretaries"},{label:"Principal",href:"/about-us/college-management/principal"}]},{label:"Various Committees",sub:[{label:"Women's Cell",href:"/about-us/various-committees/womens-cell"},{label:"Anti Ragging",href:"/about-us/various-committees/anti-ragging"},{label:"SC/ST",href:"/about-us/various-committees/sc-st"},{label:"OBC",href:"/about-us/various-committees/obc"},{label:"Grievance",href:"/about-us/various-committees/grievance"},{label:"ICC",href:"/about-us/various-committees/icc"},{label:"Minority",href:"/about-us/various-committees/minority"},{label:"Placement",href:"/about-us/various-committees/placement"},{label:"RUSA",href:"/about-us/various-committees/rusa"}]},{label:"College Staff",sub:[{label:"Teaching Staff",href:"/about-us/college-staff/teaching-staff"},{label:"Non-Teaching Staff",href:"/about-us/college-staff/non-teaching-staff"}]},{label:"Regulations",sub:[{label:"B.B.M.K. University Dhanbad",sub:[{label:"Special UG Regulation (CBCS) Session 2020-23",href:"/about-us/regulations/bbmku/special-ug-regulation"},{label:"UG Regulation (FYUGP)",href:"/about-us/regulations/bbmku/ug-regulation-fyugp"},{label:"UG Regulation (CBCS)",href:"/about-us/regulations/bbmku/ug-regulation-cbcs"}]},{label:"College Affiliation Paper B.B.M.K.U.",href:"/about-us/regulations/college-affiliation"},{label:"UGC Under Section 2(f) & 12(B)",href:"/about-us/regulations/ugc-section"},{label:"V.B.U. Hazaribag",sub:[{label:"UG Regulation 2015",href:"/about-us/regulations/vbu/ug-regulation-2015"},{label:"BCA Regulation",href:"/about-us/regulations/vbu/bca-regulation"}]},{label:"ByeLaws",href:"/about-us/regulations/byelaws"},{label:"Exemption",href:"/about-us/regulations/exemption"}]},{label:"Audit Report",href:"/about-us/audit-report"}]},{label:"Campus",href:"/",sub:[{label:"Campus Visuals",sub:[{label:"Bhuda",href:"/campus/visuals/bhuda"},{label:"Bank More",href:"/campus/visuals/bank-more"},{label:"Vocational Building",href:"/campus/visuals/vocational-building"}]},{label:"Infrastructure",href:"/campus/infrastructure"},{label:"Classroom",href:"/campus/classroom"},{label:"ICT Rooms",href:"/campus/ict-rooms"},{label:"Green Campus",href:"/campus/green-campus"}]},{label:"Academics",href:"/",sub:[{label:"IQAC",href:"/academics/iqac"},{label:"Course Offered",href:"/academics/course-offered"},{label:"Departments",sub:[{label:"Humanities",href:"/academics/departments/humanities"},{label:"Social Science",href:"/academics/departments/social-science"},{label:"Commerce",href:"/academics/departments/commerce"},{label:"BCA",href:"/academics/departments/bca"},{label:"BBA",href:"/academics/departments/bba"}]},{label:"Syllabus",href:"/syllabus"},{label:"Academic Calendar",href:"/academics/academic-calendar"}]},{label:"Admission",href:"/",sub:[{label:"Admission Rule",href:"/admission/rule"},{label:"Document Required",href:"/admission/document-required"},{label:"Fee Structure",href:"/admission/fee-structure"},{label:"Notification",sub:[{label:"Latest",href:"/admission/notification/latest"},{label:"Upcoming News",href:"/admission/notification/upcoming"}]},{label:"Intake Capacity",href:"/admission/intake-capacity"}]},{label:"Activity",href:"/",sub:[{label:"NSS",href:"/activity/nss"},{label:"NCC",href:"/activity/ncc"},{label:"Workshop",href:"/activity/workshop"},{label:"Game & Sports",href:"/activity/games-sports"},{label:"Collaboration",sub:[{label:"Rotaract Club",href:"/activity/collaboration/rotaract-club"},{label:"Sadbhavana Diwas",href:"/activity/collaboration/sadbhavana-diwas"}]}]},{label:"NAAC",href:"/",sub:[{label:"SSR 1st Cycle",sub:[{label:"Cycle 1 Documents",href:"/naac/ssr-1st-cycle/cycle-1-documents"},{label:"Peer Team Report",href:"/naac/ssr-1st-cycle/peer-team-report"}]},{label:"SSR 2nd Cycle",sub:[{label:"Cycle 2 Documents",href:"/naac/ssr-2nd-cycle/cycle-2-documents"},{label:"Executive Summary",href:"/naac/ssr-2nd-cycle/executive-summary"}]},{label:"AQAR",href:"/naac/aqar"},{label:"NIRF",href:"/naac/nirf"},{label:"Perspective Plan",href:"/naac/perspective-plan"}]},{label:"Publication",href:"/",sub:[{label:"College Library",href:"/publication/college-library"},{label:"E-Magazine",href:"/publication/e-magazine"},{label:"Examination Results",sub:[{label:"Result 2024",href:"/publication/examination-results/2024"},{label:"Result 2023",href:"/publication/examination-results/2023"}]},{label:"SSS Report",sub:[{label:"Report 2023-24",href:"/publication/sss-report/2023-24"},{label:"Report 2022-23",href:"/publication/sss-report/2022-23"}]}]},{label:"Gallery",href:"#gallery"},{label:"Contact Us",href:"/contact"}],qe=[{text:"🏆 Winner - 4th Inter-College Youth Festival"},{text:"🎓 Admission 2024-28 Now Open - Apply Today!"},{text:"✅ NAAC Accredited Institution - Excellence in Education"},{text:"💻 AICTE Approved BCA & BBA Courses Available"},{text:"📚 Affiliated to B.B.M.K. University, Dhanbad"}],a={navy:"#1a3a6b",navyDark:"#0f2347",gold:"#f4a023",red:"#c0392b"},le=[{image:"images/slider_baisakhi.jpg",title:"BAISAKHI DI SHAAM Celebration",subtitle:"Celebrating culture and traditions"},{image:"images/slider_cricket.jpg",title:"Inter College BBMKU Cricket Winners",subtitle:"Celebrating sportsmanship and victory"},{image:"images/slider_ncc.jpg",title:'NCC "At Home Function" Participants',subtitle:"Dedicated NCC Cadets & Commanders"},{image:"images/slider_youth_winners.jpg",title:"BBMKU Youth Festival Champions",subtitle:"Winners of BBMKU Inter College Youth Festival - अंतर्नाद"},{image:"images/slider_seminar.jpg",title:"ICSSR Multidisciplinary National Seminar",subtitle:"G20: A Global Platform for Economic Development"}],Ye=()=>{const[i,s]=r.useState(0),p=le.length;let x;const c=5e3,u=()=>{s(i===p-1?0:i+1)},b=()=>{s(i===0?p-1:i-1)};function f(){x=setInterval(u,c)}return r.useEffect(()=>{s(0)},[]),r.useEffect(()=>(f(),()=>clearInterval(x)),[i]),e.jsxs("div",{className:"slider",children:[e.jsx("div",{className:"arrow prev",onClick:b,children:"❮"}),e.jsx("div",{className:"arrow next",onClick:u,children:"❯"}),le.map((n,N)=>e.jsx("div",{className:N===i?"slide current":"slide",children:N===i&&e.jsxs(e.Fragment,{children:[e.jsx("img",{src:`/gncollege-website/${n.image}`,alt:n.title,className:"image"}),e.jsxs("div",{className:"content",children:[e.jsx("h2",{children:n.title}),e.jsx("p",{children:n.subtitle}),e.jsx("hr",{})]})]})},N)),e.jsx("style",{children:`
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
        `})]})};function _e(){const i=[{label:"Admission 2024-28",icon:"🎓",href:"#"},{label:"BCA & BBA Portal",icon:"💻",href:"#"},{label:"Internal Exam",icon:"📋",href:"#"},{label:"Online Fee",icon:"💳",href:"#"},{label:"Syllabus",icon:"📚",href:"#"}];return e.jsx("div",{style:{background:"#fff",padding:"12px 0",borderBottom:"1px solid #eee"},children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"center",gap:"12px",flexWrap:"wrap",padding:"0 15px"},children:[e.jsx("style",{children:`
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
          `}),i.map((s,p)=>e.jsxs("a",{href:s.href,className:"ribbon-box",children:[e.jsx("span",{style:{fontSize:"16px"},children:s.icon}),s.label]},p))]})})}const ce=({title:i,subtitle:s})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:32},children:[e.jsx("h2",{style:{fontSize:26,fontWeight:800,color:a.navy,marginBottom:6},children:i}),e.jsx("div",{style:{width:60,height:3,background:a.gold,margin:"0 auto 10px"}}),s&&e.jsx("p",{style:{color:"#666",fontSize:14},children:s})]});function Ve(){return e.jsxs("div",{style:{padding:"40px 16px",background:"#f8f9fa"},children:[e.jsxs("section",{style:{marginBottom:"100px",padding:"0 20px"},children:[e.jsx(ce,{title:"Our Academic Departments",subtitle:"Excellence in specialized education for future leaders"}),e.jsx("style",{children:`
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
  `}),e.jsx("div",{className:"dept-container",children:[{name:"B.C.A",icon:"💻",symbol:"展开",desc:"Bachelor of Computer Applications - Future of IT."},{name:"B.B.A",icon:"📈",symbol:"📊",desc:"Bachelor of Business Administration - Master the Market."},{name:"COMMERCE",icon:"💰",symbol:"📒",desc:"Expertise in Finance, Accounts, and Trade."},{name:"ARTS",icon:"🎨",symbol:"🎭",desc:"Exploring Humanity, Culture, and Social Science."}].map((i,s)=>e.jsxs("div",{className:"modern-dept-card",children:[e.jsx("div",{className:"dept-bg-symbol",children:i.symbol}),e.jsxs("div",{className:"dept-content",children:[e.jsx("div",{className:"dept-icon-box",children:i.icon}),e.jsx("h3",{style:{color:"#fff",fontSize:"20px",fontWeight:"800",marginBottom:"8px"},children:i.name}),e.jsx("p",{style:{color:"rgba(255,255,255,0.8)",fontSize:"12.5px",lineHeight:"1.5",margin:0},children:i.desc}),e.jsx("div",{style:{marginTop:"15px",color:a.gold,fontSize:"12px",fontWeight:"bold"},children:"EXPLORE PROGRAM →"})]})]},s))})]}),e.jsx("section",{style:{padding:"80px 20px",background:"#ffffff"},children:e.jsxs("div",{style:{maxWidth:1250,margin:"0 auto"},children:[e.jsx(ce,{title:"College Facilities",subtitle:"World-class infrastructure to support your academic excellence"}),e.jsx("style",{children:`
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
    `}),e.jsx("div",{className:"facility-container",children:Oe.map((i,s)=>e.jsxs("div",{className:"facility-card",children:[e.jsx("div",{className:"facility-icon-wrap",children:i.emoji}),e.jsx("div",{className:"facility-text",children:i.name})]},s))})]})})]})}const ee=({title:i,subtitle:s})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:40},children:[e.jsx("h2",{style:{fontSize:28,fontWeight:800,color:a.navy,marginBottom:8},children:i}),e.jsx("div",{style:{width:60,height:4,background:a.gold,margin:"0 auto 12px",borderRadius:2}}),s&&e.jsx("p",{style:{color:"#666",fontSize:15},children:s})]}),Ke=({notices:i,announcements:s,pdfReports:p,upcomingEvents:x})=>{const c=r.useRef(null),u=r.useRef(null),b=r.useRef(null),f=r.useRef(null),n=r.useRef(null),N=r.useRef(null),m=r.useMemo(()=>[...i,...i],[i]),y=r.useMemo(()=>{const o=(x||[]).map(g=>({...g,text:g.title,date:g.createdAt?.toDate(),type:g.type||"Event"})),l=(s||[]).map(g=>({...g,date:g.createdAt?.toDate(),type:g.type||"News"}));return[...o,...l].sort((g,h)=>(h.date||0)-(g.date||0))},[x,s]),A=r.useMemo(()=>[...y,...y],[y]),d=r.useMemo(()=>{const o=(p||[]).map(l=>({...l,text:l.title,date:l.createdAt?.toDate(),type:"Document"}));return[...o,...o]},[p]);return r.useEffect(()=>{const o=c.current;if(!o)return;let l=0;const g=()=>{l-=.5,l<-o.scrollHeight/2&&(l=0),o.style.transform=`translateY(${l}px)`,f.current=requestAnimationFrame(g)},h=()=>{f.current=requestAnimationFrame(g)},v=()=>{f.current&&cancelAnimationFrame(f.current)};return o.addEventListener("mouseenter",v),o.addEventListener("mouseleave",h),h(),()=>{v(),o&&(o.removeEventListener("mouseenter",v),o.removeEventListener("mouseleave",h))}},[m]),r.useEffect(()=>{const o=u.current;if(!o)return;let l=0;const g=()=>{l-=.5,l<-o.scrollHeight/2&&(l=0),o.style.transform=`translateY(${l}px)`,n.current=requestAnimationFrame(g)},h=()=>{n.current=requestAnimationFrame(g)},v=()=>{n.current&&cancelAnimationFrame(n.current)};return o.addEventListener("mouseenter",v),o.addEventListener("mouseleave",h),h(),()=>{v(),o&&(o.removeEventListener("mouseenter",v),o.removeEventListener("mouseleave",h))}},[A]),r.useEffect(()=>{const o=b.current;if(!o)return;let l=0;const g=()=>{l-=.5,l<-o.scrollHeight/2&&(l=0),o.style.transform=`translateY(${l}px)`,N.current=requestAnimationFrame(g)},h=()=>{N.current=requestAnimationFrame(g)},v=()=>{N.current&&cancelAnimationFrame(N.current)};return o.addEventListener("mouseenter",v),o.addEventListener("mouseleave",h),h(),()=>{v(),o&&(o.removeEventListener("mouseenter",v),o.removeEventListener("mouseleave",h))}},[d]),e.jsx("section",{style:{padding:"80px 20px",background:"#f4f7fa"},children:e.jsxs("div",{style:{maxWidth:1300,margin:"0 auto"},children:[e.jsx(ee,{title:"Notification & Announcements",subtitle:"Stay informed with the latest official updates and campus news"}),e.jsx("style",{children:`
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
          height: 500px;
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
          overflow-y: hidden;
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
        
        /* 🌟 FIX 1: Pura Notification Item Left Align hoga */
        .notif-item {
          padding: 15px 0;
          border-bottom: 1px solid #eee;
          text-align: left; 
        }  
        
        /* 🌟 FIX 2: Rich Text (HTML) Titles Left Align honge */
        .rich-text-title {
          margin: 0 0 5px;
          font-size: 14px;
          color: ${a.navy};
          font-weight: 600;
          text-align: left; 
        }
        .rich-text-title * {
          margin: 0 !important; 
        }
        
        /* 🌟 FIX 3: Rich Text (HTML) Descriptions Left Align honge */
        .rich-text-desc {
          margin: 0 0 5px;
          font-size: 13px;
          color: #555;
          line-height: 1.4;
          text-align: left; 
        }
          
        @media (max-width: 1100px) { .notif-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 700px) { .notif-grid { grid-template-columns: 1fr; } .notif-card { height: 450px; } }
      `}),e.jsxs("div",{className:"notif-grid",children:[e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header",style:{background:a.navy},children:[e.jsx("span",{style:{fontSize:"24px"},children:"🔔"})," Official Notices"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:c,children:m.map((o,l)=>{const g=o.isNew&&(new Date-new Date(o.date))/864e5<3;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-start",fontSize:"11px",color:"#888",fontWeight:700,marginBottom:"8px"},children:[e.jsxs("span",{children:["📅 ",o.date?new Date(o.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{style:{margin:"0 8px"},children:"|"}),e.jsx("span",{style:{color:a.gold},children:o.type||"Notice"}),g&&e.jsx("span",{style:{marginLeft:"16px",background:"red",color:"#fff",fontSize:"9px",padding:"2px 6px",borderRadius:"4px",animation:"blink 1s infinite"},children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:o.text}}),o.link&&e.jsx("a",{href:o.link,target:"_blank",rel:"noreferrer",style:{fontSize:"12px",color:"#007bff",fontWeight:700,display:"inline-block",marginTop:"5px"},children:"🔗 View Document"})]},l)})})}),e.jsx("div",{className:"view-all-btn",children:"View All Notices →"})]}),e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header",style:{background:a.red},children:[e.jsx("span",{style:{fontSize:"24px"},children:"📣"})," Academic News / Upcoming Event"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:u,children:A.map((o,l)=>{const g=o.date&&(new Date-new Date(o.date))/864e5<3;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-start",fontSize:"11px",color:"#888",fontWeight:700,marginBottom:"8px"},children:[e.jsxs("span",{children:["📅 ",o.date?new Date(o.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{style:{margin:"0 8px"},children:"|"}),e.jsx("span",{style:{color:a.red},children:o.type||"Update"}),g&&e.jsx("span",{style:{marginLeft:"16px",background:"red",color:"#fff",fontSize:"9px",padding:"2px 6px",borderRadius:"4px",animation:"blink 1s infinite"},children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:o.text||o.title}}),o.desc&&e.jsx("div",{className:"rich-text-desc",dangerouslySetInnerHTML:{__html:o.desc}}),o.link&&e.jsx("a",{href:o.link,target:"_blank",rel:"noreferrer",style:{fontSize:"12px",color:"#007bff",fontWeight:700,display:"inline-block",marginTop:"5px"},children:"🔗 View Document"})]},l)})})}),e.jsx("div",{className:"view-all-btn",children:"View All News →"})]}),e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header",style:{background:"#10b981"},children:[e.jsx("span",{style:{fontSize:"24px"},children:"📄"})," E-Documents"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:b,children:d.map((o,l)=>e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-start",fontSize:"11px",color:"#888",fontWeight:700,marginBottom:"8px"},children:[e.jsxs("span",{children:["📅 ",o.date?new Date(o.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{style:{margin:"0 8px"},children:"|"}),e.jsx("span",{style:{color:"#10b981"},children:o.type||"Document"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:o.text||o.title}}),o.link&&e.jsx("a",{href:o.link,target:"_blank",rel:"noreferrer",style:{fontSize:"12px",color:"#007bff",fontWeight:700,display:"inline-block",marginTop:"5px"},children:"🔗 View Document"})]},l))})}),e.jsx("div",{className:"view-all-btn",children:"View All Documents →"})]})]})]})})},Je=({notices:i,announcements:s,pdfReports:p,sliderSlides:x,events:c,gallery:u})=>{const[b,f]=r.useState("All Moments"),n=u||[],N=b==="All Moments"?n:n.filter(d=>d.cat===b),m=(c||[]).filter(d=>d.status==="upcoming"),y=(c||[]).filter(d=>d.status==="recent"),A=d=>{switch(d){case"SEMINAR":return"/images/slider_seminar.jpg";case"WORKSHOP":return"/images/slider_ncc.jpg";case"SPORTS":return"/images/slider_cricket.jpg";case"CULTURAL":return"/images/slider_baisakhi.jpg";default:return"/images/college_photo.jpg"}};return e.jsxs("div",{style:{fontFamily:"'Segoe UI',sans-serif",background:"#f4f7f9",minHeight:"100vh",overflowX:"hidden"},children:[e.jsx(Ye,{slides:x}),e.jsx(_e,{}),e.jsx(Ke,{notices:i,announcements:s,pdfReports:p,upcomingEvents:m}),e.jsx("section",{id:"about",style:{background:"#fff",padding:"100px 20px",position:"relative",overflow:"hidden"},children:e.jsxs("div",{style:{maxWidth:1250,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(350px, 1fr))",gap:"60px",alignItems:"center"},children:[e.jsxs("div",{"data-aos":"fade-right",style:{position:"relative"},children:[e.jsx("style",{children:`
                @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
                .image-stack { position: relative; width: 100%; height: 450px; }
                .main-img { width: 90%; height: 100%; object-fit: cover; border-radius: 20px; box-shadow: 20px 20px 0px ${a.gold}; position: relative; z-index: 2; transition: transform 0.5s ease; }
                .image-stack:hover .main-img { transform: scale(1.02); }
                .accent-box { position: absolute; bottom: -30px; right: 0; background: ${a.navy}; color: #fff; padding: 25px; border-radius: 15px; z-index: 3; box-shadow: 0 10px 30px rgba(0,0,0,0.2); animation: float 3s ease-in-out infinite; }
              `}),e.jsxs("div",{className:"image-stack",children:[e.jsx("img",{src:"images/college_photo.jpg",alt:"Guru Nanak College Campus",className:"main-img"}),e.jsxs("div",{className:"accent-box",children:[e.jsx("h4",{style:{fontSize:"32px",margin:0,fontWeight:900,color:a.gold},children:"56+"}),e.jsx("p",{style:{fontSize:"12px",margin:0,opacity:.8,letterSpacing:"1px"},children:"YEARS OF EXCELLENCE"})]})]})]}),e.jsxs("div",{"data-aos":"fade-left",children:[e.jsxs("h2",{style:{fontSize:"38px",fontWeight:900,color:a.navy,lineHeight:1.2,marginBottom:"10px"},children:["About the ",e.jsx("span",{style:{color:a.gold},children:"College"})]}),e.jsx("h4",{style:{color:a.gold,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"25px",fontSize:"14px"},children:"Established 1970"}),e.jsx("p",{style:{color:"#555",lineHeight:1.8,fontSize:"16px",marginBottom:"30px"},children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru. We draw inspiration from the teachings of Guru Nanak Devji, fostering an environment of academic progress and individual development."}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"15px",marginBottom:"35px"},children:[{icon:"🛡️",title:"NAAC Accredited",desc:"Grade B Institution"},{icon:"👨‍🏫",title:"Expert Faculty",desc:"Highly Experienced"},{icon:"🔬",title:"Modern Labs",desc:"Tech-enabled Learning"},{icon:"🏅",title:"NSS & NCC",desc:"Character Building"}].map((d,o)=>e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"start"},children:[e.jsx("span",{style:{fontSize:"20px"},children:d.icon}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:800,fontSize:"14px",color:a.navy},children:d.title}),e.jsx("div",{style:{fontSize:"12px",color:"#888"},children:d.desc})]})]},o))}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"25px",flexWrap:"wrap"},children:[e.jsx("style",{children:`
                .discover-btn {
                  background: ${a.navy}; color: #fff; padding: 15px 35px; border: none; border-radius: 50px; 
                  font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(15,35,71,0.3);
                  text-decoration: none; display: inline-block;
                }
                .discover-btn:hover { background: ${a.gold}; color: ${a.navy}; box-shadow: 0 8px 25px rgba(244,160,35,0.4); }
                .social-icon-btn { width: 40px; height: 40px; border-radius: 50%; background: #f0f2f5; display: flex; align-items: center; justify-content: center; color: ${a.navy}; font-size: 18px; text-decoration: none; transition: all 0.3s ease; }
                .social-icon-btn:hover { background: ${a.navy}; color: ${a.gold}; transform: rotate(360deg); }
              `}),e.jsx(X,{to:"/about-us/college-profile",className:"discover-btn",children:"DISCOVER MORE →"}),e.jsxs("div",{style:{display:"flex",gap:"15px",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"13px",fontWeight:700,color:"#666"},children:"FOLLOW US:"}),re.map(d=>e.jsx("a",{href:d.href,target:"_blank",rel:"noopener noreferrer",className:"social-icon-btn",children:d.id==="twitter"?"𝕏":d.id==="youtube"?"▶":d.label.charAt(0)},d.id))]})]})]})]})}),e.jsx(Ve,{}),e.jsx("section",{id:"events",style:{padding:"80px 20px",background:"transparent"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1400,margin:"0 auto"},children:[e.jsx(ee,{title:"Recent Events & Happenings",subtitle:"Insights into our seminars, workshops, and vibrant campus activities"}),e.jsx("style",{children:`
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
          `}),y.length>0?e.jsx("div",{className:"events-scroller",children:e.jsx("div",{className:"events-track",children:[...y,...y,...y].map((d,o)=>e.jsxs("div",{className:"event-loop-card",children:[e.jsxs("div",{className:"el-img-box",children:[e.jsx("div",{className:"el-badge",children:d.type}),e.jsxs("div",{className:"el-date",children:[e.jsx("div",{style:{fontSize:"18px",fontWeight:900,lineHeight:1},children:d.day||"--"}),e.jsx("div",{style:{fontSize:"10px",fontWeight:700},children:d.month||"---"})]}),e.jsx("img",{src:d.imageUrl||A(d.type),alt:d.title,className:"el-img"})]}),e.jsxs("div",{className:"el-info",children:[e.jsx("h3",{className:"el-title",children:d.title}),e.jsx("div",{className:"el-desc",dangerouslySetInnerHTML:{__html:d.desc}}),e.jsxs("div",{className:"el-footer",children:[e.jsxs("span",{style:{fontSize:"11px",color:"#888",fontWeight:700},children:["📍 ",d.location||"Campus"]}),e.jsx("span",{style:{fontSize:"11px",color:a.gold,fontWeight:800},children:"READ MORE →"})]})]})]},o))})}):e.jsxs("div",{style:{textAlign:"center",background:"rgba(255,255,255,0.7)",padding:"40px",borderRadius:"12px",border:"1px dashed #e2e8f0",marginTop:"30px"},children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"10px"},children:"📅"}),e.jsx("h3",{style:{color:a.navy,margin:"0 0 10px"},children:"No Recent Events"}),e.jsx("p",{style:{color:"#64748b",margin:0,fontSize:"14px"},children:"There are no events to display at the moment."})]})]})}),e.jsxs("section",{style:{background:`linear-gradient(135deg, ${a.navyDark} 0%, ${a.navy} 100%)`,padding:"80px 20px",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:.05,pointerEvents:"none",backgroundImage:"radial-gradient(#fff 1px, transparent 1px)",backgroundSize:"30px 30px"}}),e.jsxs("div",{"data-aos":"zoom-in",style:{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"40px",textAlign:"center",position:"relative",zIndex:2},children:[e.jsx("style",{children:`
            .counter-box { padding: 20px; transition: transform 0.3s ease; }
            .counter-box:hover { transform: translateY(-10px); }
            .counter-icon { font-size: 50px; margin-bottom: 15px; display: inline-block; filter: drop-shadow(0 0 10px rgba(244,160,35,0.3)); }
            .counter-number { font-size: 45px; font-weight: 900; color: ${a.gold}; line-height: 1; margin-bottom: 10px; font-family: 'Arial Black', sans-serif; }
            .counter-label { font-size: 14px; color: #e2e8f0; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
          `}),[{label:"STUDENTS ENROLLED",value:"4,000+",icon:"👨‍🎓"},{label:"SUCCESSFUL ALUMNI",value:"45,000+",icon:"🎓"},{label:"EXPERT FACULTY",value:"50+",icon:"👨‍🏫"},{label:"YEARS OF LEGACY",value:"56",icon:"🏛️"}].map((d,o)=>e.jsxs("div",{className:"counter-box",children:[e.jsx("div",{className:"counter-icon",children:d.icon}),e.jsx("div",{className:"counter-number",children:d.value}),e.jsx("div",{className:"counter-label",children:d.label})]},o))]})]}),e.jsx("section",{style:{padding:"80px 20px",background:"transparent"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsx(ee,{title:"Important External Links",subtitle:"Quick access to official education and government portals"}),e.jsx("style",{children:`
            .links-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; margin-top: 40px; }
            .link-tile { background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.6); border-radius: 12px; padding: 25px 15px; text-align: center; text-decoration: none; transition: all 0.3s; display: flex; flex-direction: column; align-items: center; gap: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); transform: translateZ(0); }
            .link-tile:hover { transform: translateY(-8px); border-color: ${a.gold}; box-shadow: 0 12px 20px rgba(15, 35, 71, 0.08); background: #fff; }
            .link-icon-circle { width: 60px; height: 60px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; transition: 0.3s; }
            .link-tile:hover .link-icon-circle { background: ${a.navy}; color: #fff; }
            .link-name { font-size: 13px; font-weight: 800; color: ${a.navy}; letter-spacing: 0.5px; }
          `}),e.jsx("div",{className:"links-grid",children:[{name:"NAAC",url:"https://naac.gov.in",icon:"🏅"},{name:"UGC",url:"https://ugc.ac.in",icon:"📜"},{name:"INFLIBNET",url:"https://inflibnet.ac.in",icon:"📚"},{name:"NDL INDIA",url:"https://ndl.gov.in",icon:"🔬"},{name:"SWAYAM",url:"https://swayam.gov.in",icon:"🌐"},{name:"BBMK UNIVERSITY",url:"https://bbmku.ac.in",icon:"🏛️"}].map((d,o)=>e.jsxs("a",{href:d.url,target:"_blank",rel:"noopener noreferrer",className:"link-tile",children:[e.jsx("div",{className:"link-icon-circle",children:d.icon}),e.jsx("div",{className:"link-name",children:d.name})]},o))})]})}),e.jsx("section",{id:"gallery",style:{padding:"100px 20px",background:"#fff"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1300,margin:"0 auto"},children:[e.jsx(ee,{title:"📸 Photo Gallery",subtitle:"Memorable glimpses of academic excellence and cultural heritage"}),e.jsx("style",{children:`
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
          `}),e.jsx("div",{className:"gallery-filters",children:["All Moments","Seminars","Cultural Fest","Guest Visit","Campus","Departments","NSS Programs"].map(d=>e.jsx("button",{className:`filter-btn ${b===d?"active":""}`,onClick:()=>f(d),children:d},d))}),e.jsx("div",{className:"gallery-grid",children:N.length>0?N.map((d,o)=>e.jsxs("div",{className:"gallery-item",children:[e.jsx("img",{src:d.src,alt:d.title,className:"gallery-img"}),e.jsxs("div",{className:"gallery-overlay",children:[e.jsx("span",{style:{color:"#f4a023",fontSize:"10px",fontWeight:"800"},children:d.cat}),e.jsx("h4",{style:{color:"#fff",fontSize:"14px",fontWeight:"700",marginTop:"5px"},children:d.title})]})]},o)):e.jsxs("div",{style:{gridColumn:"1 / -1",textAlign:"center",background:"#f8fafc",padding:"50px 20px",borderRadius:"16px",border:"1px dashed #cbd5e1"},children:[e.jsx("div",{style:{fontSize:"32px",marginBottom:"10px"},children:"📸"}),e.jsx("h3",{style:{color:a.navy,margin:"0 0 5px"},children:"Gallery is Empty"}),e.jsx("p",{style:{color:"#64748b",margin:0,fontSize:"14px"},children:"Upload photos from the Admin Panel to see them here."})]})},b)]})})]})};function Qe({items:i}){return!i||i.length===0?null:e.jsxs("div",{style:{background:a.gold,color:"#000",padding:"8px 0",display:"flex",alignItems:"center",overflow:"hidden",borderBottom:"1px solid rgba(0,0,0,0.1)",zIndex:10,width:"100%",boxSizing:"border-box"},children:[e.jsx("style",{children:`
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
        `}),e.jsx("div",{className:"ticker-badge",children:"🚨 LATEST"}),e.jsx("div",{style:{flex:1,overflow:"hidden",minWidth:0},children:e.jsx("div",{className:"ticker-track",children:[...i,...i].map((s,p)=>e.jsxs("div",{className:"ticker-item",children:[e.jsx("span",{style:{color:"#d32f2f",marginRight:"8px"},children:"•"}),s.text||s.title]},p))})})]})}function Ze({onAdminClick:i,navLinks:s}){const[p,x]=r.useState(null),[c,u]=r.useState(null),[b,f]=r.useState(null),[n,N]=r.useState(window.innerWidth<1250),[m,y]=r.useState(!1);r.useEffect(()=>{const l=()=>{N(window.innerWidth<1250),window.innerWidth>=1250&&y(!1)};return window.addEventListener("resize",l),()=>window.removeEventListener("resize",l)},[]);const A=l=>{p===l?(x(null),u(null),f(null)):(x(l),u(null),f(null))},d=l=>{c===l?(u(null),f(null)):(u(l),f(null))},o=l=>{f(b===l?null:l)};return e.jsx("nav",{className:"glass-navbar",style:{position:"sticky",top:0,zIndex:100,transform:"translateZ(0)",willChange:"transform"},children:e.jsxs("div",{style:{maxWidth:1400,width:"100%",margin:"0 auto",padding:"0 15px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"20px"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",padding:"8px 0",flexShrink:0},children:e.jsx("img",{src:"/gncollege-website/images/logo1.png",alt:"Guru Nanak College Dhanbad",style:{height:n?55:80,width:"auto",objectFit:"contain"}})}),n&&e.jsx("button",{onClick:()=>y(!m),style:{background:"transparent",border:"none",color:a.navy,fontSize:32,cursor:"pointer",padding:"4px 8px",flexShrink:0,zIndex:200},children:m?"✕":"☰"}),e.jsxs("div",{style:{display:n?m?"flex":"none":"flex",flexDirection:n?"column":"row",alignItems:n?"flex-start":"center",position:n?"absolute":"static",top:"100%",left:0,right:0,background:n?"rgba(255,255,255,0.98)":"transparent",padding:n?"10px 20px 20px":0,gap:n?10:0,boxShadow:n&&m?"0 10px 20px rgba(0,0,0,.15)":"none",maxHeight:n?"80vh":"auto",overflowY:n?"auto":"visible",flex:1,justifyContent:"flex-end",borderTop:n&&m?"1px solid #eee":"none",zIndex:150},children:[s.map(l=>e.jsxs("div",{style:{position:"relative",width:n?"100%":"auto"},onMouseEnter:()=>!n&&x(l.label),onMouseLeave:()=>{n||(x(null),u(null),f(null))},children:[e.jsxs("div",{onClick:()=>n&&l.sub&&A(l.label),style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:n&&l.sub?"pointer":"default"},children:[e.jsxs(X,{to:l.href||"#",onClick:()=>{l.label==="Home"&&window.scrollTo(0,0)},style:{color:a.navy,padding:n?"12px 0":"24px 8px",display:"block",fontSize:14,fontWeight:700,whiteSpace:"nowrap",textDecoration:"none",transition:"all .2s",width:"100%"},children:[l.label==="Home"?"🏠 ":"",l.label]}),n&&l.sub&&e.jsx("span",{style:{color:a.navy,fontSize:20},children:p===l.label?"▴":"▾"}),!n&&l.sub&&e.jsx("span",{style:{color:a.navy,fontSize:11,marginLeft:2,marginRight:8,marginTop:2},children:"▾"})]}),l.sub&&p===l.label&&e.jsx("div",{style:{position:n?"static":"absolute",top:"100%",left:0,background:"#fff",minWidth:260,boxShadow:n?"none":"0 12px 30px rgba(0,0,0,.15)",borderTop:n?"none":"3px solid "+a.navy,borderRadius:n?8:"0 0 8px 8px",zIndex:200,padding:n?"5px 0":"8px 0"},children:l.sub.map(g=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!n&&u(g.label),onMouseLeave:()=>!n&&u(null),children:[e.jsxs("div",{onClick:h=>{n&&g.sub&&(h.stopPropagation(),d(g.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:n?"10px 16px":"10px 18px",borderBottom:n?"none":"1px solid #f8f9fa",cursor:n&&g.sub?"pointer":"default"},onMouseEnter:h=>{n||(h.currentTarget.style.background="#f4f6f9")},onMouseLeave:h=>{n||(h.currentTarget.style.background="transparent")},children:[e.jsx(X,{to:g.href||"#",style:{fontSize:13,fontWeight:600,color:a.navy,display:"block",width:"100%",textDecoration:"none"},children:g.label}),g.sub&&e.jsx("span",{style:{fontSize:12,color:a.gold,marginLeft:8},children:n?c===g.label?"▴":"▾":"▶"})]}),g.sub&&c===g.label&&e.jsx("div",{style:{position:n?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:260,boxShadow:n?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:n?"none":"3px solid "+a.gold,borderRadius:n?4:"0 8px 8px 8px",margin:n?"0 16px 10px":0,borderLeft:n?"2px solid "+a.gold:"none"},children:g.sub.map(h=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!n&&f(h.label),onMouseLeave:()=>!n&&f(null),children:[e.jsxs("div",{onClick:v=>{n&&h.sub&&(v.stopPropagation(),o(h.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderBottom:n?"none":"1px solid #f8f9fa",cursor:n&&h.sub?"pointer":"default"},onMouseEnter:v=>{n||(v.currentTarget.style.background="#f4f6f9")},onMouseLeave:v=>{n||(v.currentTarget.style.background="transparent")},children:[e.jsx(X,{to:h.href||"#",style:{fontSize:12.5,fontWeight:600,color:"#444",display:"block",width:"100%",textDecoration:"none"},children:h.label}),h.sub&&e.jsx("span",{style:{fontSize:11,color:a.gold,marginLeft:8},children:n?b===h.label?"▴":"▾":"▶"})]}),h.sub&&b===h.label&&e.jsx("div",{style:{position:n?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:260,boxShadow:n?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:n?"none":"3px solid "+a.navy,borderRadius:n?4:"0 8px 8px 8px",margin:n?"0 16px 10px":0,borderLeft:n?"2px solid "+a.navy:"none"},children:h.sub.map(v=>e.jsx(X,{to:v.href||"#",style:{display:"block",padding:"10px 16px",fontSize:12,color:"#555",borderBottom:n?"none":"1px solid #f8f9fa",textDecoration:"none"},onMouseEnter:U=>{n||(U.currentTarget.style.background="#f4f6f9")},onMouseLeave:U=>{n||(U.currentTarget.style.background="transparent")},children:v.label},v.label))})]},h.label))})]},g.label))})]},l.label)),e.jsxs("button",{onClick:i,style:{flexShrink:0,background:a.gold,color:"#000",border:"none",padding:"8px 24px",borderRadius:6,cursor:"pointer",fontSize:13,fontWeight:800,marginLeft:n?0:20,marginTop:n?12:0,width:n?"100%":"auto",boxShadow:"0 4px 15px rgba(244,160,35,0.3)",whiteSpace:"nowrap",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",transition:"all 0.3s ease"},onMouseEnter:l=>l.currentTarget.style.transform="translateY(-2px)",onMouseLeave:l=>l.currentTarget.style.transform="translateY(0)",children:[e.jsx("span",{style:{fontSize:18},children:"⚙️"})," Admin Login"]})]})]})})}const et=()=>e.jsxs("footer",{style:{background:a.navyDark,color:"#fff",padding:"80px 20px 40px",borderTop:`4px solid ${a.gold}`},children:[e.jsxs("div",{style:{maxWidth:1300,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:"50px"},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px",marginBottom:"25px"},children:[e.jsx("div",{style:{width:"70px",height:"70px",background:"#fff",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",padding:"5px",boxShadow:`0 0 15px ${a.gold}40`},children:e.jsx("img",{src:"/gncollege-website/images/logo.png",alt:"GNC Logo",style:{width:"100%",height:"100%",objectFormat:"contain"},onError:i=>{i.target.src="https://via.placeholder.com/70?text=GNC"}})}),e.jsxs("div",{children:[e.jsx("h3",{style:{margin:0,fontSize:"18px",fontWeight:800,letterSpacing:"0.5px"},children:"GURU NANAK COLLEGE"}),e.jsx("p",{style:{margin:0,color:a.gold,fontSize:"11px",fontWeight:700},children:"DHANBAD, JHARKHAND"})]})]}),e.jsx("p",{style:{fontSize:"14px",lineHeight:"1.7",color:"#aab",marginBottom:"25px"},children:"A Sikh Minority Degree College established in 1970, dedicated to providing quality education and fostering individual development."}),e.jsxs("div",{style:{display:"flex",gap:"15px",marginTop:"20px"},children:[e.jsx("style",{children:`
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
              `}),re.map(i=>e.jsx("a",{href:i.href,target:"_blank",rel:"noopener noreferrer",className:"footer-social-icon","aria-label":i.label,children:i.id==="twitter"?"𝕏":i.id==="youtube"?"▶":i.label.charAt(0)},i.id))]})]}),e.jsxs("div",{children:[e.jsxs("h4",{style:{fontSize:"18px",fontWeight:800,marginBottom:"25px",position:"relative",paddingBottom:"10px"},children:["Quick Links",e.jsx("span",{style:{position:"absolute",bottom:0,left:0,width:"40px",height:"3px",background:a.gold}})]}),e.jsx("ul",{style:{listStyle:"none",padding:0,fontSize:"14px"},children:["About College","Academic Programs","Notice Board","Admission 2024","Photo Gallery","Contact Us"].map(i=>e.jsx("li",{style:{marginBottom:"12px"},children:e.jsxs("a",{href:"#",style:{color:"#aab",textDecoration:"none",transition:"0.3s"},onMouseOver:s=>s.target.style.color=a.gold,onMouseOut:s=>s.target.style.color="#aab",children:[e.jsx("span",{style:{color:a.gold,marginRight:"8px"},children:"›"})," ",i]})},i))})]}),e.jsxs("div",{children:[e.jsxs("h4",{style:{fontSize:"18px",fontWeight:800,marginBottom:"25px",position:"relative",paddingBottom:"10px"},children:["Get In Touch",e.jsx("span",{style:{position:"absolute",bottom:0,left:0,width:"40px",height:"3px",background:a.gold}})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"15px",fontSize:"14px",color:"#aab"},children:[e.jsxs("div",{style:{display:"flex",gap:"12px"},children:[e.jsx("span",{style:{color:a.gold},children:"📍"}),e.jsx("span",{children:"Barmasiya, Dhanbad, Jharkhand - 826001"})]}),e.jsxs("div",{style:{display:"flex",gap:"12px"},children:[e.jsx("span",{style:{color:a.gold},children:"📞"}),e.jsx("a",{href:"tel:+917903340991",style:{color:"inherit",textDecoration:"none"},children:"+91-7903340991"})]}),e.jsxs("div",{style:{display:"flex",gap:"12px"},children:[e.jsx("span",{style:{color:a.gold},children:"✉️"}),e.jsx("a",{href:"mailto:principal@gncollege.org",style:{color:"inherit",textDecoration:"none"},children:"principal@gncollege.org"})]})]})]}),e.jsxs("div",{children:[e.jsxs("h4",{style:{fontSize:"18px",fontWeight:800,marginBottom:"25px",position:"relative",paddingBottom:"10px"},children:["Our Location",e.jsx("span",{style:{position:"absolute",bottom:0,left:0,width:"40px",height:"3px",background:a.gold}})]}),e.jsx("div",{style:{width:"100%",height:"180px",borderRadius:"15px",overflow:"hidden",border:"2px solid rgba(255,255,255,0.1)"},children:e.jsx("iframe",{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.089853381653!2d86.43232147533682!3d23.797658878638367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69707963d7e8b%3A0x86733221469e7f7b!2sGuru%20Nanak%20College%20Dhanbad!5e0!3m2!1sen!2sin!4v1708688000000!5m2!1sen!2sin",width:"100%",height:"100%",style:{border:0},allowFullScreen:"",loading:"lazy"})})]})]}),e.jsx("div",{style:{maxWidth:1300,margin:"60px auto 0",padding:"30px 0 0",borderTop:"1px solid rgba(255,255,255,0.05)",textAlign:"center"},children:e.jsxs("p",{style:{margin:0,fontSize:"13px",color:"#778",fontWeight:600},children:["© 2026 ",e.jsx("span",{style:{color:a.gold},children:"Guru Nanak College, Dhanbad"}),". All Rights Reserved. | Developed by Pankaj Kumar Prasad"]})})]}),tt=()=>e.jsxs("div",{className:"top-bar-container",style:{background:a.navyDark,color:"#e2e8f0",padding:"8px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12.5,fontWeight:500,letterSpacing:"0.4px",borderBottom:"1px solid rgba(255,255,255,0.05)"},children:[e.jsx("style",{children:`
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
        `}),e.jsxs("div",{className:"contact-group",children:[e.jsxs("a",{href:"tel:+917903340991",className:"top-bar-link",children:[e.jsx("span",{style:{fontSize:"15px",color:a.gold},children:"📞"})," +91-7903340991"]}),e.jsxs("a",{href:"mailto:principal@gncollege.org",className:"top-bar-link",children:[e.jsx("span",{style:{fontSize:"15px",color:a.gold},children:"✉️"})," principal@gncollege.org"]})]}),e.jsx("div",{style:{display:"flex",gap:12},children:re.map(i=>{let s=i.label;return i.id==="twitter"&&(s="𝕏"),i.id==="youtube"&&(s="▶"),e.jsx("a",{href:i.href,"aria-label":i.id,target:"_blank",rel:"noopener noreferrer",className:"social-icon",children:s},i.id)})})]}),at={apiKey:"AIzaSyDeJWUUoU_MJ4ubpbfaLZemvnEr82LF5YA",authDomain:"gnc-college-web.firebaseapp.com",projectId:"gnc-college-web",storageBucket:"gnc-college-web.firebasestorage.app",messagingSenderId:"78901559372",appId:"1:78901559372:web:f76cb101f8aec2daadb4e9"},xe=Be(at),C=We(xe);$e(xe);const Z=({value:i,onChange:s,placeholder:p})=>{const x=r.useRef(null);r.useEffect(()=>{x.current&&i!==x.current.innerHTML&&(x.current.innerHTML=i||"")},[i]);const c=(m,y=null)=>{document.execCommand(m,!1,y),x.current&&(x.current.focus(),s(x.current.innerHTML))},u=()=>{x.current&&s(x.current.innerHTML)},b=()=>{const m=prompt("Enter the link URL (e.g., https://google.com): ","https://");m&&c("createLink",m)},f=()=>{const m=prompt("Enter the Image URL: ","https://");m&&c("insertImage",m)},n={padding:"6px 10px",background:"#fff",border:"1px solid #cbd5e0",borderRadius:"6px",cursor:"pointer",fontSize:"15px",color:a.navy,fontWeight:"bold"},N={padding:"6px",background:"#fff",border:"1px solid #cbd5e0",borderRadius:"6px",cursor:"pointer",fontSize:"14px",color:a.navy,fontWeight:"bold"};return e.jsxs("div",{style:{border:"2px solid #e2e8f0",borderRadius:"10px",overflow:"hidden",background:"#fff"},children:[e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px",padding:"12px",background:"#f8fafc",borderBottom:"2px solid #e2e8f0",alignItems:"center"},children:[e.jsx("button",{type:"button",onClick:()=>c("bold"),style:n,title:"Bold",children:"B"}),e.jsx("button",{type:"button",onClick:()=>c("italic"),style:{...n,fontStyle:"italic"},title:"Italic",children:"I"}),e.jsx("button",{type:"button",onClick:()=>c("underline"),style:{...n,textDecoration:"underline"},title:"Underline",children:"U"}),e.jsx("span",{style:{width:"1px",background:"#cbd5e0",margin:"0 5px"}}),e.jsxs("select",{onChange:m=>c("formatBlock",m.target.value),style:N,children:[e.jsx("option",{value:"P",children:"Paragraph"}),e.jsx("option",{value:"H1",children:"Heading 1"}),e.jsx("option",{value:"H2",children:"Heading 2"}),e.jsx("option",{value:"H3",children:"Heading 3"})]}),e.jsxs("select",{onChange:m=>c("fontSize",m.target.value),style:N,children:[e.jsx("option",{value:"",children:"Font Size"}),e.jsx("option",{value:"1",children:"Small"}),e.jsx("option",{value:"3",children:"Normal"}),e.jsx("option",{value:"5",children:"Large"})]}),e.jsx("span",{style:{width:"1px",background:"#cbd5e0",margin:"0 5px"}}),e.jsx("input",{type:"color",onChange:m=>c("foreColor",m.target.value),title:"Text Color",style:{width:"32px",height:"32px",padding:"0",border:"none",cursor:"pointer",borderRadius:"6px"}}),e.jsx("span",{style:{width:"1px",background:"#cbd5e0",margin:"0 5px"}}),e.jsx("button",{type:"button",onClick:()=>c("justifyLeft"),style:n,children:"⫷"}),e.jsx("button",{type:"button",onClick:()=>c("justifyCenter"),style:n,children:"≡"}),e.jsx("button",{type:"button",onClick:()=>c("justifyRight"),style:n,children:"⫸"}),e.jsx("span",{style:{width:"1px",background:"#cbd5e0",margin:"0 5px"}}),e.jsx("button",{type:"button",onClick:()=>c("insertOrderedList"),style:n,children:"1."}),e.jsx("button",{type:"button",onClick:()=>c("insertUnorderedList"),style:n,children:"•"}),e.jsx("span",{style:{width:"1px",background:"#cbd5e0",margin:"0 5px"}}),e.jsx("button",{type:"button",onClick:b,style:n,children:"🔗"}),e.jsx("button",{type:"button",onClick:f,style:n,children:"🖼️"})]}),e.jsx("div",{ref:x,contentEditable:"true",onInput:u,onBlur:u,style:{minHeight:"200px",maxHeight:"500px",overflowY:"auto",padding:"20px",outline:"none",fontSize:"15px",lineHeight:"1.6"},"data-placeholder":p})]})},nt=i=>i.replace(/^\//,"").replace(/-/g," ").split("/").map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(" > ");function it({onClose:i,notices:s,pages:p,events:x,gallery:c,placeholderPaths:u,announcements:b,pdfReports:f}){const[n,N]=r.useState("pages"),[m,y]=r.useState(!1),[A,d]=r.useState(!1),[o,l]=r.useState("update"),[g,h]=r.useState(null),[v,U]=r.useState(null),[B,J]=r.useState(null),[j,E]=r.useState(null),[w,L]=r.useState(null),[S,D]=r.useState({title:"",desc:"",type:"WORKSHOP",day:"",month:"",location:"",status:"upcoming",imageUrl:""}),[R,H]=r.useState({text:"",link:"",type:"General"}),[z,O]=r.useState({title:"",content:"",path:"",slug:"",contentType:"html"}),[W,Y]=r.useState({text:"",link:"",type:"News"}),[P,_]=r.useState({title:"",link:"",type:"Document"}),[M,Q]=r.useState({title:"",cat:"Seminars",src:""}),ue=async t=>{if(t.preventDefault(),!M.src.trim())return alert("Image path is required.");y(!0);try{await F(G(C,"gallery"),{title:M.title,cat:M.cat,src:M.src,createdAt:I()}),alert("Photo published to Gallery successfully!"),Q({title:"",cat:"Seminars",src:""})}catch(k){alert("Upload Error: "+k.message)}y(!1)},ge=async t=>{if(window.confirm("Are you sure you want to remove this photo?"))try{await q(T(C,"gallery",t)),alert("Photo removed successfully!")}catch(k){alert("Error: "+k.message)}},he=async t=>{t.preventDefault(),y(!0);try{v?(await K(T(C,"events",v.id),{...S,updatedAt:I()}),alert("Event updated!")):(await F(G(C,"events"),{...S,createdAt:I()}),alert("Event added!")),te()}catch(k){alert("Error: "+k.message)}y(!1)},fe=async t=>{if(t.preventDefault(),!R.text.trim())return alert("Notice text is required");y(!0);try{B?(await K(T(C,"notices",B.id),{...R,updatedAt:I()}),$.success("Notice Updated successfully! 🎉")):(await F(G(C,"notices"),{...R,date:new Date().toISOString(),isNew:!0,createdAt:I()}),$.success("Notice published successfully! 🎉")),ae()}catch(k){$.error("Error: "+k.message)}y(!1)},be=async t=>{if(t.preventDefault(),!W.text.trim())return alert("Announcement text is required");y(!0);try{j?(await K(T(C,"announcements",j.id),{...W,updatedAt:I()}),$.success("News updated successfully! 🎉")):(await F(G(C,"announcements"),{...W,date:new Date().toISOString(),createdAt:I()}),$.success("News published successfully! 🎉")),ne()}catch(k){$.error("Error: "+k.message)}y(!1)},ye=async t=>{if(t.preventDefault(),!P.title.trim()||!P.link.trim())return alert("Title and Link are required");y(!0);try{w?(await K(T(C,"pdfReports",w.id),{...P,updatedAt:I()}),$.success("Document updated successfully! 🎉")):(await F(G(C,"pdfReports"),{...P,date:new Date().toISOString(),createdAt:I()}),$.success("Document published successfully! 🎉")),ie()}catch(k){$.error("Error: "+k.message)}y(!1)},ve=async t=>{if(t.preventDefault(),o==="update"&&(!z.title||!z.path))return alert("Title and Menu Link required");if(o==="create"&&(!z.title||!z.slug))return alert("Title and Slug required");y(!0);try{const k={title:z.title.trim(),content:z.content,contentType:z.contentType,path:o==="update"?z.path:"",slug:o==="create"?z.slug.trim():""};g?(await K(T(C,"pages",g.id),{...k,updatedAt:I()}),alert("Page updated!")):(await F(G(C,"pages"),{...k,createdAt:I()}),alert("Page created!")),se()}catch(k){alert("Error: "+k.message)}y(!1)},je=t=>{U(t),D({title:t.title||"",desc:t.desc||"",type:t.type||"WORKSHOP",day:t.day||"",month:t.month||"",location:t.location||"",status:t.status||"upcoming",imageUrl:t.imageUrl||""})},we=t=>{J(t),H({text:t.text||"",link:t.link||"",type:t.type||"General"})},ke=t=>{E(t),Y({text:t.text||"",link:t.link||"",type:t.type||"News"})},Ne=t=>{L(t),_({title:t.title||"",link:t.link||"",type:t.type||"Document"})},Se=t=>{h(t),O({title:t.title,content:t.content,path:t.path||"",slug:t.slug||"",contentType:t.contentType||"html"}),l(t.path?"update":"create")},te=()=>{U(null),D({title:"",desc:"",type:"WORKSHOP",day:"",month:"",location:"",status:"upcoming",imageUrl:""})},ae=()=>{J(null),H({text:"",link:"",type:"General"})},ne=()=>{E(null),Y({text:"",link:"",type:"News"})},ie=()=>{L(null),_({title:"",link:"",type:"Document"})},se=()=>{h(null),O({title:"",content:"",path:"",slug:"",contentType:"html"})},Ce=async t=>{if(window.confirm("Delete this event?"))try{await q(T(C,"events",t)),alert("Deleted!"),v?.id===t&&te()}catch(k){alert(k.message)}},ze=async t=>{if(window.confirm("Delete this notice?"))try{await q(T(C,"notices",t)),alert("Deleted!"),B?.id===t&&ae()}catch(k){alert(k.message)}},Ae=async t=>{if(window.confirm("Delete this news?"))try{await q(T(C,"announcements",t)),alert("Deleted!"),j?.id===t&&ne()}catch(k){alert(k.message)}},Ee=async t=>{if(window.confirm("Delete this Document?"))try{await q(T(C,"pdfReports",t)),alert("Deleted!"),w?.id===t&&ie()}catch(k){alert(k.message)}},De=async t=>{if(window.confirm("Delete this page?"))try{await q(T(C,"pages",t)),alert("Deleted!"),g?.id===t&&se()}catch(k){alert(k.message)}};return e.jsxs("div",{className:"admin-wrapper",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"mobile-topbar",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px"},children:[e.jsx("button",{onClick:()=>d(!0),style:{background:"transparent",border:"none",color:"#fff",fontSize:"28px"},children:"☰"}),e.jsx("h2",{style:{margin:0,fontSize:"18px",fontWeight:800,color:a.gold},children:"GNC Admin"})]}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px",fontSize:"13px"},onClick:i,children:"Exit"})]}),e.jsxs("div",{className:`admin-sidebar ${A?"open":""}`,children:[e.jsxs("div",{className:"sidebar-header",children:[e.jsx("h2",{className:"sidebar-title",children:"Workspace"}),A&&e.jsx("button",{onClick:()=>d(!1),style:{background:"transparent",color:"#fff",border:"none",fontSize:"24px"},children:"✕"})]}),e.jsx("div",{className:"nav-menu",children:[{id:"pages",label:"Dynamic Pages",icon:"📄"},{id:"gallery",label:"Photo Gallery",icon:"📸"},{id:"notices",label:"Notice Board",icon:"📢"},{id:"announcements",label:"Academic News",icon:"📣"},{id:"pdfReports",label:"E-Documents",icon:"📁"},{id:"events",label:"Campus Events",icon:"🏆"}].map(t=>e.jsxs("div",{className:`nav-item ${n===t.id?"active":""}`,onClick:()=>{N(t.id),d(!1)},children:[e.jsx("span",{className:"nav-icon",children:t.icon})," ",e.jsx("span",{children:t.label})]},t.id))}),e.jsx("div",{style:{marginTop:"auto",padding:"20px"},children:e.jsx("button",{onClick:i,className:"btn btn-primary",style:{width:"100%",background:"red"},children:"Logout"})})]}),e.jsxs("div",{className:"admin-main",children:[n==="gallery"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📸 Add to Photo Gallery"}),e.jsxs("form",{onSubmit:ue,children:[e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Photo Title"}),e.jsx("input",{className:"input",placeholder:"e.g. Independence Day Celebration",value:M.title,onChange:t=>Q({...M,title:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Category"}),e.jsxs("select",{className:"input",value:M.cat,onChange:t=>Q({...M,cat:t.target.value}),children:[e.jsx("option",{value:"Seminars",children:"Seminars"}),e.jsx("option",{value:"Cultural Fest",children:"Cultural Fest"}),e.jsx("option",{value:"Guest Visit",children:"Guest Visit"}),e.jsx("option",{value:"Campus",children:"Campus"}),e.jsx("option",{value:"Departments",children:"Departments"}),e.jsx("option",{value:"NSS Programs",children:"NSS Programs"})]})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Image Path (from public folder)"}),e.jsx("input",{className:"input",placeholder:"e.g. /images/pf10.jpeg",value:M.src,onChange:t=>Q({...M,src:t.target.value}),required:!0})]}),e.jsx("div",{className:"btn-group",children:e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:m,children:m?"Processing...":"🚀 Publish Photo"})})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"🖼️ Live Cloud Gallery Images"}),e.jsx("div",{className:"data-list",style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))",gap:"20px",flexDirection:"unset"},children:(c||[]).map(t=>e.jsxs("div",{style:{border:"1px solid #edf2f7",borderRadius:"12px",overflow:"hidden",background:"#fff"},children:[e.jsx("img",{src:t.src,alt:t.title,style:{width:"100%",height:"180px",objectFit:"cover"}}),e.jsxs("div",{style:{padding:"15px"},children:[e.jsx("span",{className:"badge",style:{background:"#fff3cd",color:"#856404"},children:t.cat}),e.jsx("h4",{style:{margin:"5px 0",fontSize:"15px",color:a.navy},children:t.title}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 0",width:"100%",marginTop:"10px",fontSize:"13px"},onClick:()=>ge(t.id),children:"🗑️ Remove Photo"})]})]},t.id))})]})]}),n==="pages"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📄 ",g?"Edit Page Details":"Design New Page"]}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"20px",marginBottom:"30px",background:"#f8fafc",padding:"20px",borderRadius:"12px",border:"1px solid #edf2f7"},children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer",fontWeight:600,color:a.navy},children:[e.jsx("input",{type:"radio",value:"update",checked:o==="update",onChange:()=>l("update")})," Update Existing Menu Link"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer",fontWeight:600,color:a.navy},children:[e.jsx("input",{type:"radio",value:"create",checked:o==="create",onChange:()=>l("create")})," Create Custom URL Page"]})]}),e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Page Title"}),e.jsx("input",{className:"input",placeholder:"e.g. Computer Science",value:z.title,onChange:t=>O({...z,title:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:o==="update"?"Target Menu Link":"Custom URL Slug"}),o==="update"?e.jsxs("select",{className:"input",value:z.path,onChange:t=>O({...z,path:t.target.value,slug:""}),required:!0,children:[e.jsx("option",{value:"",children:"-- Select Menu --"}),(u||[]).map(t=>e.jsx("option",{value:t,children:nt(t)},t))]}):e.jsx("input",{className:"input",placeholder:"e.g. computer-science",value:z.slug,onChange:t=>O({...z,slug:t.target.value.toLowerCase().trim().replace(/\s+/g,"-"),path:""}),required:!0})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Page Content"}),e.jsx(Z,{value:z.content,onChange:t=>O({...z,content:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{className:"btn btn-gold",onClick:ve,disabled:m,children:m?"Processing...":g?"💾 Save Changes":"🚀 Publish Page"}),g&&e.jsx("button",{className:"btn btn-secondary",onClick:se,children:"Cancel"})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📂 Live Pages Database"}),e.jsx("div",{className:"data-list",children:(p||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:`4px solid ${a.navy}`},children:[e.jsxs("div",{className:"data-content",children:[e.jsx("h4",{children:t.title}),e.jsx("a",{href:t.path?`/#${t.path}`:`/#/p/${t.slug}`,target:"_blank",rel:"noopener noreferrer",style:{fontSize:"13px",color:a.gold,textDecoration:"none",fontWeight:700},children:"🔗 View Live Page"})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>Se(t),children:"✏️ Edit"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>De(t.id),children:"🗑️"})]})]},t.id))})]})]}),n==="notices"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📢 ",B?"Edit Notice":"Broadcast New Notice"]}),e.jsxs("form",{onSubmit:fe,children:[e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Category"}),e.jsxs("select",{className:"input",value:R.type,onChange:t=>H({...R,type:t.target.value}),children:[e.jsx("option",{children:"General"}),e.jsx("option",{children:"Examination"}),e.jsx("option",{children:"Admission"}),e.jsx("option",{children:"Holiday"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Attachment URL (Drive/PDF)"}),e.jsx("input",{className:"input",placeholder:"Optional Link",value:R.link,onChange:t=>H({...R,link:t.target.value})})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Notice Message (Rich Text)"}),e.jsx(Z,{value:R.text,onChange:t=>H({...R,text:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:m,children:m?"Processing...":B?"💾 Update Notice":"🚀 Broadcast Notice"}),B&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:ae,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📋 Recent Notices"}),e.jsx("div",{className:"data-list",children:(s||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:`5px solid ${a.gold}`},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsx("span",{className:"badge",style:{background:"#fff3cd",color:"#856404"},children:t.type}),e.jsxs("span",{style:{fontSize:"12px",marginLeft:"12px",color:"#718096",fontWeight:600},children:["📅 ",t.date?new Date(t.date).toLocaleDateString("en-GB"):"N/A"]}),e.jsx("div",{dangerouslySetInnerHTML:{__html:t.text},style:{margin:"8px 0",fontSize:"15px",color:"#1a202c",fontWeight:600}}),t.link&&e.jsx("a",{href:t.link,target:"_blank",rel:"noreferrer",style:{fontSize:"12.5px",color:a.navy,fontWeight:700,textDecoration:"none"},children:"📎 Open Attachment"})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>we(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>ze(t.id),children:"🗑️"})]})]},t.id))})]})]}),n==="announcements"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📣 ",j?"Edit News":"Publish Academic News"]}),e.jsxs("form",{onSubmit:be,children:[e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"News Category"}),e.jsxs("select",{className:"input",value:W.type,onChange:t=>Y({...W,type:t.target.value}),children:[e.jsx("option",{children:"News"}),e.jsx("option",{children:"Achievement"}),e.jsx("option",{children:"Update"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Reference Link (Optional)"}),e.jsx("input",{className:"input",placeholder:"URL",value:W.link,onChange:t=>Y({...W,link:t.target.value})})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"News Content (Rich Text)"}),e.jsx(Z,{value:W.text,onChange:t=>Y({...W,text:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:m,children:j?"💾 Update News":"🚀 Publish News"}),j&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:ne,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"🗞️ Published News"}),e.jsx("div",{className:"data-list",children:(b||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:"5px solid #d32f2f"},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsx("span",{className:"badge",style:{background:"#ffe5e5",color:"#d32f2f"},children:t.type}),e.jsx("div",{dangerouslySetInnerHTML:{__html:t.text},style:{margin:"8px 0",fontSize:"15px",color:"#1a202c",fontWeight:600}})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>ke(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>Ae(t.id),children:"🗑️"})]})]},t.id))})]})]}),n==="pdfReports"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📁 ",w?"Edit Document":"Upload E-Document"]}),e.jsxs("form",{onSubmit:ye,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Document Title"}),e.jsx("input",{className:"input",value:P.title,onChange:t=>_({...P,title:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Document URL (Drive/PDF Link)"}),e.jsx("input",{className:"input",value:P.link,onChange:t=>_({...P,link:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Document Type"}),e.jsxs("select",{className:"input",value:P.type,onChange:t=>_({...P,type:t.target.value}),children:[e.jsx("option",{children:"Document"}),e.jsx("option",{children:"Report"}),e.jsx("option",{children:"Syllabus"})]})]})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:m,children:w?"💾 Update Doc":"🚀 Publish Doc"}),w&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:ie,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📚 Live Documents"}),e.jsx("div",{className:"data-list",children:(f||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:"5px solid #10b981"},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsx("span",{className:"badge",style:{background:"#e6f7f1",color:"#047857"},children:t.type}),e.jsx("h4",{children:t.title}),e.jsx("a",{href:t.link,target:"_blank",rel:"noreferrer",style:{fontSize:"13px",color:"#10b981",textDecoration:"none",fontWeight:700},children:"⬇️ View / Download Source"})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>Ne(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>Ee(t.id),children:"🗑️"})]})]},t.id))})]})]}),n==="events"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["🏆 ",v?"Edit Campus Event":"Add Campus Event"]}),e.jsxs("form",{onSubmit:he,children:[e.jsxs("div",{className:"form-grid",style:{gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))"},children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Event Title"}),e.jsx("input",{className:"input",value:S.title,onChange:t=>D({...S,title:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Event Type"}),e.jsxs("select",{className:"input",value:S.type,onChange:t=>D({...S,type:t.target.value}),children:[e.jsx("option",{children:"WORKSHOP"}),e.jsx("option",{children:"SEMINAR"}),e.jsx("option",{children:"CULTURAL"}),e.jsx("option",{children:"SPORTS"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Day (e.g. 24)"}),e.jsx("input",{className:"input",value:S.day,onChange:t=>D({...S,day:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Month (e.g. MAR)"}),e.jsx("input",{className:"input",value:S.month,onChange:t=>D({...S,month:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Location"}),e.jsx("input",{className:"input",value:S.location,onChange:t=>D({...S,location:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Status"}),e.jsxs("select",{className:"input",value:S.status,onChange:t=>D({...S,status:t.target.value}),children:[e.jsx("option",{value:"upcoming",children:"Upcoming Event"}),e.jsx("option",{value:"recent",children:"Recent Event"})]})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Image Path (from public folder)"}),e.jsx("input",{className:"input",placeholder:"e.g. /images/sports-day.jpg",value:S.imageUrl,onChange:t=>D({...S,imageUrl:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Event Description (Rich Text)"}),e.jsx(Z,{value:S.desc,onChange:t=>D({...S,desc:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:m,children:v?"💾 Update Event":"🚀 Publish Event"}),v&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:te,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📆 Event Roster"}),e.jsx("div",{className:"data-list",children:(x||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:"5px solid #8b5cf6"},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsx("span",{className:"badge",style:{background:"#ede9fe",color:"#6d28d9"},children:t.type}),e.jsx("h4",{children:t.title}),e.jsx("div",{dangerouslySetInnerHTML:{__html:t.desc},style:{fontSize:"13px",color:"#666",marginTop:"5px"}}),e.jsxs("p",{style:{marginTop:"5px",fontSize:"12px",fontWeight:"bold"},children:["📍 ",t.location||"Campus","   |   📅 ",t.day," ",t.month]})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>je(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>Ce(t.id),children:"🗑️"})]})]},t.id))})]})]})]})]})}function st({onSuccess:i,onClose:s}){const[p,x]=r.useState(""),[c,u]=r.useState(""),[b,f]=r.useState(""),[n,N]=r.useState(!1),m=y=>{y.preventDefault(),f(""),N(!0),setTimeout(()=>{p==="admin"&&c==="admin123"?i():(f("❌ Incorrect Username or Password"),N(!1))},800)};return e.jsxs("div",{className:"login-overlay",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"login-box",children:[e.jsx("button",{className:"close-btn",onClick:s,title:"Close",children:"✕"}),e.jsxs("div",{className:"login-header",children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"10px"},children:"🛡️"}),e.jsx("h2",{children:"Admin Portal"}),e.jsx("p",{children:"Authorized Personnel Only"})]}),e.jsxs("form",{className:"login-form",onSubmit:m,children:[b&&e.jsx("div",{className:"error-box",children:b}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"input-label",children:"Username"}),e.jsx("input",{type:"text",className:"login-input",placeholder:"Enter your username",value:p,onChange:y=>x(y.target.value),required:!0})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"input-label",children:"Password"}),e.jsx("input",{type:"password",className:"login-input",placeholder:"Enter your password",value:c,onChange:y=>u(y.target.value),required:!0})]}),e.jsx("button",{type:"submit",className:"login-btn",disabled:n,children:n?"Authenticating...":"Secure Login 🚀"})]})]})]})}const ot=()=>{const i=oe();let s=i.pathname;s==="/"&&i.hash.startsWith("#/")&&(s=i.hash.substring(1));const p=s.split("/").filter(x=>x);return p.length===0?null:e.jsx("div",{style:{background:"#f8f9fa",borderBottom:"1px solid #e0e0e0"},children:e.jsxs("div",{style:{maxWidth:"1400px",margin:"0 auto",padding:"12px 20px",fontSize:"13.5px",color:"#666",display:"flex",alignItems:"center",fontWeight:"500"},children:[e.jsxs(X,{to:"/",style:{color:a.navy,textDecoration:"none",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{children:"🏠"})," Home"]}),p.map((x,c)=>{const u=`/${p.slice(0,c+1).join("/")}`,b=c===p.length-1,f=x.replace(/-/g," ").replace(/\b\w/g,n=>n.toUpperCase());return e.jsxs("span",{style:{display:"flex",alignItems:"center"},children:[e.jsx("span",{style:{margin:"0 10px",color:"#ccc",fontSize:"10px"},children:"❯"}),b?e.jsx("span",{style:{color:a.gold,fontWeight:"700"},children:f}):e.jsx(X,{to:u,style:{color:a.navy,textDecoration:"none"},children:f})]},u)})]})})},rt=()=>{const i=[{label:"Admission 2024",icon:"🎓",href:"#"},{label:"Student Portal",icon:"💻",href:"#"},{label:"Exam Results",icon:"📋",href:"#"},{label:"Pay Fee Online",icon:"💳",href:"#"},{label:"Syllabus",icon:"📚",href:"#"}];return e.jsx("div",{style:{position:"fixed",right:0,top:"40%",transform:"translateY(-50%)",zIndex:999,display:"flex",flexDirection:"column",gap:"2px"},children:i.map((s,p)=>e.jsx(lt,{action:s},p))})},lt=({action:i})=>{const[s,p]=r.useState(!1);return e.jsxs("a",{href:i.href,onMouseEnter:()=>p(!0),onMouseLeave:()=>p(!1),style:{display:"flex",alignItems:"center",justifyContent:"flex-start",padding:"12px",backgroundColor:s?a.gold:a.navy,color:s?a.navy:"#fff",textDecoration:"none",width:s?"190px":"50px",height:"50px",borderTopLeftRadius:"8px",borderBottomLeftRadius:"8px",transition:"all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",overflow:"hidden",whiteSpace:"nowrap",boxShadow:"-2px 2px 8px rgba(0,0,0,0.15)",position:"relative",right:s?"0":"-5px"},children:[e.jsx("span",{style:{fontSize:"22px",minWidth:"30px",textAlign:"center",marginLeft:"-2px"},children:i.icon}),e.jsx("span",{style:{fontWeight:"700",fontSize:"14px",marginLeft:"15px",opacity:s?1:0,transition:"opacity 0.2s"},children:i.label})]})};function me({slug:i,page:s,onClose:p}){const[x,c]=r.useState(s||null),[u,b]=r.useState(!0);return r.useEffect(()=>{if(s){c(s),b(!1);return}if(i){(async()=>{b(!0);const N=pe(G(C,"pages"),Ue("slug","==",i)),m=await He(N);m.empty?c(null):c(m.docs[0].data()),b(!1)})();return}c(null);const f=setTimeout(()=>{b(!1)},1500);return()=>clearTimeout(f)},[i,s]),u?e.jsxs("div",{style:{padding:"100px 20px",textAlign:"center",minHeight:"60vh",background:"#f4f7fa",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"15px",animation:"spin 2s linear infinite"},children:"⏳"}),e.jsx("h3",{style:{color:a.navy,fontWeight:700},children:"Loading Page Content..."}),e.jsx("p",{style:{color:"#666",fontSize:"14px"},children:"Please wait while we fetch the latest data from the server."})]}):x?e.jsxs("div",{className:"page-wrapper",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"page-container",children:[e.jsxs("div",{className:"content-col",children:[p&&e.jsx("button",{onClick:p,style:{float:"right",padding:"8px 16px",background:a.red,color:"#fff",border:"none",borderRadius:"8px",cursor:"pointer",fontWeight:"bold"},children:"✕ Close"}),e.jsx("h1",{className:"page-title",children:x.title}),e.jsx("div",{className:"title-underline"}),e.jsx("div",{className:"rich-content",children:x.contentType==="html"?e.jsx("div",{dangerouslySetInnerHTML:{__html:x.content}}):e.jsx("pre",{style:{whiteSpace:"pre-wrap",fontFamily:"inherit"},children:x.content})})]}),e.jsxs("div",{className:"sidebar-col",children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{style:{color:a.gold,fontSize:"24px"},children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"College Profile",path:"/about-us/college-profile"},{label:"Admission Rules",path:"/admission/rule"},{label:"Fee Structure",path:"/admission/fee-structure"},{label:"Syllabus",path:"/syllabus"},{label:"Academic Calendar",path:"/academics/academic-calendar"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Helpdesk",path:"/contact"}].map((f,n)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(X,{to:f.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",f.label]})},n))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:"45px",marginBottom:"15px",position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 12px",fontSize:"19px",color:a.gold,position:"relative",zIndex:2},children:"Need Assistance?"}),e.jsx("p",{style:{fontSize:"14px",margin:"0",color:"#e2e8f0",lineHeight:"1.6",position:"relative",zIndex:2},children:"Contact our administration office for any queries related to admission, examinations, or syllabus."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call Helpdesk Now"})]})]})]})]}):e.jsxs("div",{style:{padding:"100px 20px",textAlign:"center",minHeight:"60vh",background:"#f4f7fa",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[e.jsx("h2",{style:{color:a.navy,fontSize:"32px",fontWeight:800},children:"404 - Page Not Found"}),e.jsx("p",{style:{color:"#666",fontSize:"16px",marginTop:"10px"},children:"The page you are looking for is currently being updated or does not exist."}),e.jsxs("p",{style:{fontSize:"14px",background:"#e2e8f0",display:"inline-block",padding:"10px 20px",borderRadius:"8px",marginTop:"20px"},children:[e.jsx("strong",{children:"Admin Note:"})," Please create this page from the Admin Dashboard."]})]})}function ct(){r.useEffect(()=>{window.scrollTo(0,0)},[]);const i=[{role:"Prof. In-Charge (Bhuda Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👨‍🏫",type:"admin"},{role:"Prof. In-Charge (Bank More Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫",type:"admin"},{role:"BCA Coordinator",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"💻",type:"academic"},{role:"Member, Women's Cell",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛡️",type:"committee"},{role:"Member, Anti-Ragging Squad",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛑",type:"committee"},{role:"P.A. to Principal",name:"Mr. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"📝",type:"admin"}];return e.jsxs("div",{className:"contact-wrapper",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"contact-header",children:[e.jsxs("h1",{className:"header-title",children:["Get In ",e.jsx("span",{children:"Touch"})]}),e.jsx("p",{className:"header-sub",children:"We are here to assist you. Reach out to our respective campuses or directly contact our administration team."})]}),e.jsxs("div",{className:"campus-container",children:[e.jsxs("div",{className:"campus-card card-1",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏛️"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bhuda Campus"}),e.jsx("span",{className:"campus-badge",style:{background:a.navy},children:"Main Campus • Boys Wing"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsxs("p",{children:["Guru Nanak College, Bhuda",e.jsx("br",{}),"Dhanbad, Jharkhand - 826001"]})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:"tel:+917903340991",children:"+91 79033 40991"})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:"mailto:info@gncollege.org",children:"info@gncollege.org"})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bhuda Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14606.874130097746!2d86.4253!3d23.7942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzM5LjEiTiA4NsKwMjUnMzEuMSJF!5e0!3m2!1sen!2sin!4v1700000000000",allowFullScreen:"",loading:"lazy"})})]}),e.jsxs("div",{className:"campus-card card-2",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏢"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bank More Campus"}),e.jsx("span",{className:"campus-badge",style:{background:a.gold,color:a.navy},children:"Girls Wing • Vocational Studies"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsxs("p",{children:["Guru Nanak College, Bank More",e.jsx("br",{}),"Dhanbad, Jharkhand - 826001"]})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:"tel:+910000000000",children:"+91 (Add Number)"})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:"mailto:vocational@gncollege.org",children:"vocational@gncollege.org"})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bank More Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14606.874130097746!2d86.4153!3d23.7942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzM5LjEiTiA4NsKwMjUnMzEuMSJF!5e0!3m2!1sen!2sin!4v1700000000000",allowFullScreen:"",loading:"lazy"})})]})]}),e.jsx("h2",{className:"section-title",children:"Administration Directory"}),e.jsx("div",{className:"contacts-grid",children:i.map((s,p)=>e.jsxs("div",{className:"contact-person-card",children:[e.jsx("div",{className:"cp-icon",children:s.icon}),e.jsxs("div",{className:"cp-details",children:[e.jsx("p",{className:"cp-role",children:s.role}),e.jsx("h3",{className:"cp-name",children:s.name}),e.jsxs("a",{href:`tel:${s.phone.replace(/\s/g,"")}`,className:"cp-phone",children:["📞 ",s.phone]})]})]},p))})]})}const de=["/about-us/college-profile","/syllabus","/about-us","/about-us/vision-mission","/about-us/principal-message","/about-us/college-management/organogram","/about-us/college-management/presidents","/about-us/college-management/secretaries","/about-us/college-management/principal","/about-us/various-committees/womens-cell","/about-us/various-committees/anti-ragging","/about-us/various-committees/sc-st","/about-us/various-committees/obc","/about-us/various-committees/grievance","/about-us/various-committees/icc","/about-us/various-committees/minority","/about-us/various-committees/placement","/about-us/various-committees/rusa","/about-us/college-staff/teaching-staff","/about-us/college-staff/non-teaching-staff","/about-us/regulations/bbmku/special-ug-regulation","/about-us/regulations/bbmku/ug-regulation-fyugp","/about-us/regulations/bbmku/ug-regulation-cbcs","/about-us/regulations/college-affiliation","/about-us/regulations/ugc-section","/about-us/regulations/vbu/ug-regulation-2015","/about-us/regulations/vbu/bca-regulation","/about-us/regulations/byelaws","/about-us/regulations/exemption","/about-us/audit-report","/campus/visuals/bhuda","/campus/visuals/bank-more","/campus/visuals/vocational-building","/campus/infrastructure","/campus/classroom","/campus/ict-rooms","/campus/green-campus","/academics/iqac","/academics/course-offered","/academics/departments/humanities","/academics/departments/social-science","/academics/departments/commerce","/academics/departments/bca","/academics/departments/bba","/academics/academic-calendar","/admission/rule","/admission/document-required","/admission/fee-structure","/admission/notification/latest","/admission/notification/upcoming","/admission/intake-capacity","/activity/nss","/activity/ncc","/activity/workshop","/activity/games-sports","/activity/collaboration/rotaract-club","/activity/collaboration/sadbhavana-diwas","/naac/ssr-1st-cycle/cycle-1-documents","/naac/ssr-1st-cycle/peer-team-report","/naac/ssr-2nd-cycle/cycle-2-documents","/naac/ssr-2nd-cycle/executive-summary","/naac/aqar","/naac/nirf","/naac/perspective-plan","/publication/college-library","/publication/e-magazine","/publication/examination-results/2024","/publication/examination-results/2023","/publication/sss-report/2023-24","/publication/sss-report/2022-23","/gallery"],dt=({pages:i})=>{const{slug:s}=Pe(),[p,x]=r.useState(null);return r.useEffect(()=>{if(i&&s){const c=i.find(u=>u.slug===s);x(c)}},[s,i]),!i||i.length===0?e.jsx("div",{style:{padding:"40px 20px",textAlign:"center"},children:"Loading pages..."}):e.jsx(me,{page:p})},pt=({notices:i,announcements:s,events:p,gallery:x,pdfReports:c,pages:u,placeholderPaths:b})=>{const[f,n]=r.useState(()=>localStorage.getItem("isGncAdmin")==="true");return f?e.jsx(it,{notices:i,announcements:s,events:p,gallery:x,pdfReports:c,pages:u,placeholderPaths:b,onClose:()=>{n(!1),localStorage.removeItem("isGncAdmin"),window.close()}}):e.jsx(st,{onSuccess:()=>{n(!0),localStorage.setItem("isGncAdmin","true")},onClose:()=>window.close()})},xt=i=>i&&new DOMParser().parseFromString(i,"text/html").body.textContent||"";function mt(){const[i,s]=r.useState([]),[p,x]=r.useState([]),[c,u]=r.useState([]),[b,f]=r.useState([]),[n,N]=r.useState([]),[m,y]=r.useState([]),A=oe(),[d,o]=r.useState(!0),[l,g]=r.useState(window.innerWidth<768),h=A.pathname.startsWith("/admin");r.useEffect(()=>{const j=()=>g(window.innerWidth<768);return window.addEventListener("resize",j),()=>window.removeEventListener("resize",j)},[]),r.useEffect(()=>{const j=setTimeout(()=>o(!1),2e3);return()=>clearTimeout(j)},[]),r.useEffect(()=>{Ie.init({duration:800,easing:"ease-in-out",once:!1,mirror:!0,offset:50})},[]);const v=r.useMemo(()=>{const j=m.filter(w=>w.slug&&!w.path).sort((w,L)=>(L.createdAt?.toMillis()||0)-(w.createdAt?.toMillis()||0)).map(w=>({label:w.title,href:`/p/${w.slug}`})),E=JSON.parse(JSON.stringify(Fe));if(j.length>0){const w={label:"More",href:"#",sub:j},L=E.findIndex(S=>S.label==="Gallery");E.splice(L>-1?L:E.length-1,0,w)}return E},[m]),U=r.useMemo(()=>{const j=new Map;return[...m].sort((w,L)=>(L.createdAt?.toMillis()||0)-(w.createdAt?.toMillis()||0)).forEach(w=>{w.path&&!j.has(w.path)&&j.set(w.path,w)}),j},[m]);r.useEffect(()=>{const E=[["notices",s],["announcements",x],["events",u],["gallery",f],["pdfReports",N],["pages",y]].map(([w,L])=>{const S=pe(G(C,w),Ge("createdAt","desc"));return Xe(S,D=>{const R=D.docs.map(H=>({id:H.id,...H.data()}));L(R)})});return()=>E.forEach(w=>w())},[]);const B=()=>{window.open("#/admin","_blank")},J=[...i.slice(0,3),...p.slice(0,2)].map(j=>({...j,text:xt(j.text||j.title)}));return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:`splash-screen ${d?"":"hide"}`,children:[e.jsx("img",{src:"/gncollege-website/images/logo.png",alt:"Guru Nanak College",className:"splash-logo"}),e.jsx("div",{className:"splash-text",children:"Loading Portal..."})]}),!h&&e.jsxs(e.Fragment,{children:[e.jsx(tt,{}),e.jsx(Qe,{items:J}),e.jsx(Ze,{onAdminClick:B,navLinks:v}),e.jsx(ot,{}),!l&&e.jsx(rt,{})]}),e.jsx("div",{className:h?"":"page-transition",children:e.jsxs(Te,{location:A,children:[e.jsx(V,{path:"/",element:e.jsx(Je,{notices:i,announcements:p,pdfReports:n,sliderSlides:qe,events:c,gallery:b})}),e.jsx(V,{path:"/contact",element:e.jsx(ct,{})}),e.jsx(V,{path:"/admin",element:e.jsx(pt,{notices:i,announcements:p,events:c,gallery:b,pdfReports:n,pages:m,placeholderPaths:de})}),e.jsx(V,{path:"/p/:slug",element:e.jsx(dt,{pages:m})}),de.map(j=>{const E=U.get(j);return e.jsx(V,{path:j,element:e.jsx(me,{page:E})},j)})]})},A.pathname),!h&&e.jsxs(e.Fragment,{children:[e.jsx(et,{}),e.jsx("button",{onClick:B,style:{position:"fixed",bottom:25,right:25,background:a.navy,color:"#fff",border:`3px solid ${a.gold}`,borderRadius:"50%",width:60,height:60,cursor:"pointer",zIndex:500},children:e.jsx("span",{style:{fontSize:18},children:"⚙️"})})]})]})}function ut(){const i=oe();return r.useEffect(()=>{"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.scrollTo(0,0)},[]),r.useEffect(()=>{const s=i.hash;if(s){const p=s.replace("#",""),x=document.getElementById(p);x&&x.scrollIntoView({behavior:"smooth"})}else window.scrollTo(0,0)},[i]),e.jsx(mt,{})}Re.createRoot(document.getElementById("root")).render(e.jsx(Le.StrictMode,{children:e.jsx(Me,{children:e.jsx(ut,{})})}));
