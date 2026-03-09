import{a as r,j as e,R as yt}from"./react-B9mKIQH5.js";import{R as vt}from"./react-dom-D7_rhL9o.js";import{A as jt}from"./aos-B-Mw6r96.js";import{z as h,F as wt}from"./react-hot-toast-Dhq_btiz.js";import{L as F,u as Le,R as Nt,a as oe,b as kt,H as St}from"./react-router-CmInjhsw.js";import{i as ve}from"./jodit-react-CQyzVq-v.js";import"./firebase-BDBr1_Th.js";import{i as Ct,g as zt,a as At,b as Dt,d as P,s as $e,c as $,u as xe,e as ee,f as V,h as le,q as Fe,o as Ie,j as Et}from"./@firebase-PYxhKkJh.js";import{p as Xe}from"./dompurify-J9PU_gBl.js";import{p as He}from"./html-react-parser-BjJRHc4P.js";import"./scheduler-CWG1rEj-.js";import"./goober-wofAfydu.js";import"./jodit-CDy6uk5e.js";import"./idb-BXWtuYvb.js";import"./html-dom-parser-C9V9aTyI.js";import"./domhandler-C7h-c356.js";import"./domelementtype-CqltyNbl.js";import"./react-property-DkBHvQjb.js";import"./style-to-js-3xM98LKa.js";import"./style-to-object-Cg2xzs12.js";import"./inline-style-parser-BlqBsVO4.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))g(c);new MutationObserver(c=>{for(const m of c)if(m.type==="childList")for(const b of m.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&g(b)}).observe(document,{childList:!0,subtree:!0});function x(c){const m={};return c.integrity&&(m.integrity=c.integrity),c.referrerPolicy&&(m.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?m.credentials="include":c.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function g(c){if(c.ep)return;c.ep=!0;const m=x(c);fetch(c.href,m)}})();const we=[{id:"facebook",label:"f",href:"https://facebook.com/"},{id:"twitter",label:"t",href:"https://twitter.com/"},{id:"youtube",label:"y",href:"https://youtube.com/"},{id:"linkedin",label:"in",href:"https://linkedin.com/"}],Tt=[{name:"Class Rooms",emoji:"🏫"},{name:"Computer Lab",emoji:"💻"},{name:"Library",emoji:"📚"},{name:"Seminar Hall",emoji:"🎤"},{name:"Auditorium",emoji:"🎭"},{name:"Playground",emoji:"⚽"},{name:"Badminton Court",emoji:"🏸"},{name:"Gymnasium",emoji:"🏋️"},{name:"Digital Classrooms",emoji:"📱"},{name:"Cultural Dept.",emoji:"🎵"},{name:"Washroom (B)",emoji:"🚿"},{name:"Washroom (G)",emoji:"🚿"},{name:"Water Purifier",emoji:"💧"},{name:"Canteen",emoji:"🍽️"},{name:"Girls Common Room",emoji:"👩"},{name:"Online Lecture",emoji:"📡"}],Ge=[{label:"Home",href:"/"},{label:"About Us",href:"/",sub:[{label:"College Profile",href:"/about-us/college-profile"},{label:"Vision & Mission",href:"/about-us/vision-mission"},{label:"Principal Message",href:"/about-us/principal-message"},{label:"College Management",sub:[{label:"Organogram",href:"/about-us/college-management/organogram"},{label:"Presidents",href:"/about-us/college-management/presidents"},{label:"Secretaries",href:"/about-us/college-management/secretaries"},{label:"Principal",href:"/about-us/college-management/principal"}]},{label:"Various Committees",sub:[{label:"Women's Cell",href:"/about-us/various-committees/womens-cell"},{label:"Anti Ragging",href:"/about-us/various-committees/anti-ragging"},{label:"SC/ST",href:"/about-us/various-committees/sc-st"},{label:"OBC",href:"/about-us/various-committees/obc"},{label:"Grievance",href:"/about-us/various-committees/grievance"},{label:"ICC",href:"/about-us/various-committees/icc"},{label:"Minority",href:"/about-us/various-committees/minority"},{label:"Placement",href:"/about-us/various-committees/placement"},{label:"RUSA",href:"/about-us/various-committees/rusa"}]},{label:"College Staff",sub:[{label:"Teaching Staff",href:"/about-us/college-staff/teaching-staff"},{label:"Non-Teaching Staff",href:"/about-us/college-staff/non-teaching-staff"}]},{label:"Regulations",sub:[{label:"B.B.M.K. University Dhanbad",sub:[{label:"Special UG Regulation (CBCS) Session 2020-23",href:"/about-us/regulations/bbmku/special-ug-regulation"},{label:"UG Regulation (FYUGP)",href:"/about-us/regulations/bbmku/ug-regulation-fyugp"},{label:"UG Regulation (CBCS)",href:"/about-us/regulations/bbmku/ug-regulation-cbcs"}]},{label:"College Affiliation Paper B.B.M.K.U.",href:"/about-us/regulations/college-affiliation"},{label:"UGC Under Section 2(f) & 12(B)",href:"/about-us/regulations/ugc-section"},{label:"V.B.U. Hazaribag",sub:[{label:"UG Regulation 2015",href:"/about-us/regulations/vbu/ug-regulation-2015"},{label:"BCA Regulation",href:"/about-us/regulations/vbu/bca-regulation"}]},{label:"ByeLaws",href:"/about-us/regulations/byelaws"},{label:"Exemption",href:"/about-us/regulations/exemption"}]},{label:"Audit Report",href:"/about-us/audit-report"}]},{label:"Campus",href:"/",sub:[{label:"Campus Visuals",sub:[{label:"Bhuda",href:"/campus/visuals/bhuda"},{label:"Bank More",href:"/campus/visuals/bank-more"},{label:"Vocational Building",href:"/campus/visuals/vocational-building"}]},{label:"Infrastructure",href:"/campus/infrastructure"},{label:"Classroom",href:"/campus/classroom"},{label:"ICT Rooms",href:"/campus/ict-rooms"},{label:"Green Campus",href:"/campus/green-campus"}]},{label:"Academics",href:"/",sub:[{label:"IQAC",href:"/academics/iqac"},{label:"Course Offered",href:"/academics/course-offered"},{label:"Departments",sub:[{label:"Humanities",href:"/academics/departments/humanities"},{label:"Social Science",href:"/academics/departments/social-science"},{label:"Commerce",href:"/academics/departments/commerce"},{label:"BCA",href:"/academics/departments/bca"},{label:"BBA",href:"/academics/departments/bba"}]},{label:"Syllabus",href:"/syllabus"},{label:"Academic Calendar",href:"/academics/academic-calendar"}]},{label:"Admission",href:"/",sub:[{label:"Admission Rule",href:"/admission/rule"},{label:"Document Required",href:"/admission/document-required"},{label:"Fee Structure",href:"/admission/fee-structure"},{label:"Notification",sub:[{label:"Latest",href:"/admission/notification/latest"},{label:"Upcoming News",href:"/admission/notification/upcoming"}]},{label:"Intake Capacity",href:"/admission/intake-capacity"}]},{label:"Activity",href:"/",sub:[{label:"NSS",href:"/activity/nss"},{label:"NCC",href:"/activity/ncc"},{label:"Workshop",href:"/activity/workshop"},{label:"Game & Sports",href:"/activity/games-sports"},{label:"Collaboration",sub:[{label:"Rotaract Club",href:"/activity/collaboration/rotaract-club"},{label:"Sadbhavana Diwas",href:"/activity/collaboration/sadbhavana-diwas"}]}]},{label:"NAAC",href:"/",sub:[{label:"SSR 1st Cycle",sub:[{label:"Cycle 1 Documents",href:"/naac/ssr-1st-cycle/cycle-1-documents"},{label:"Peer Team Report",href:"/naac/ssr-1st-cycle/peer-team-report"}]},{label:"SSR 2nd Cycle",sub:[{label:"Cycle 2 Documents",href:"/naac/ssr-2nd-cycle/cycle-2-documents"},{label:"Executive Summary",href:"/naac/ssr-2nd-cycle/executive-summary"}]},{label:"AQAR",href:"/naac/aqar"},{label:"NIRF",href:"/naac/nirf"},{label:"Perspective Plan",href:"/naac/perspective-plan"}]},{label:"Publication",href:"/",sub:[{label:"College Library",href:"/publication/college-library"},{label:"E-Magazine",href:"/publication/e-magazine"},{label:"Examination Results",sub:[{label:"Result 2024",href:"/publication/examination-results/2024"},{label:"Result 2023",href:"/publication/examination-results/2023"}]},{label:"SSS Report",sub:[{label:"Report 2023-24",href:"/publication/sss-report/2023-24"},{label:"Report 2022-23",href:"/publication/sss-report/2022-23"}]}]},{label:"Gallery",href:"#gallery"},{label:"Contact Us",href:"/contact"}],It=[{text:"🏆 Winner - 4th Inter-College Youth Festival"},{text:"🎓 Admission 2024-28 Now Open - Apply Today!"},{text:"✅ NAAC Accredited Institution - Excellence in Education"},{text:"💻 AICTE Approved BCA & BBA Courses Available"},{text:"📚 Affiliated to B.B.M.K. University, Dhanbad"}],a={navy:"#1a3a6b",navyDark:"#0f2347",gold:"#f4a023"},Te=[{image:"images/slider_baisakhi.jpg",title:"BAISAKHI DI SHAAM Celebration",subtitle:"Celebrating culture and traditions"},{image:"images/slider_cricket.jpg",title:"Inter College BBMKU Cricket Winners",subtitle:"Celebrating sportsmanship and victory"},{image:"images/slider_ncc.jpg",title:'NCC "At Home Function" Participants',subtitle:"Dedicated NCC Cadets & Commanders"},{image:"images/slider_youth_winners.jpg",title:"BBMKU Youth Festival Champions",subtitle:"Winners of BBMKU Inter College Youth Festival - अंतर्नाद"},{image:"images/slider_seminar.jpg",title:"ICSSR Multidisciplinary National Seminar",subtitle:"G20: A Global Platform for Economic Development"}],Lt=()=>{const[i,o]=r.useState(0),x=Te.length;let g;const c=5e3,m=()=>{o(i===x-1?0:i+1)},b=()=>{o(i===0?x-1:i-1)};function y(){g=setInterval(m,c)}return r.useEffect(()=>{o(0)},[]),r.useEffect(()=>(y(),()=>clearInterval(g)),[i]),e.jsxs("div",{className:"slider",children:[e.jsx("div",{className:"arrow prev",onClick:b,children:"❮"}),e.jsx("div",{className:"arrow next",onClick:m,children:"❯"}),e.jsx("div",{className:"slider-dots",children:Te.map((n,f)=>e.jsx("div",{className:`dot ${i===f?"current":""}`,onClick:()=>o(f)},f))}),Te.map((n,f)=>e.jsx("div",{className:f===i?"slide current":"slide",children:f===i&&e.jsxs(e.Fragment,{children:[e.jsx("img",{src:`/gncollege-website/${n.image}`,alt:n.title,className:"image"}),e.jsxs("div",{className:"content",children:[e.jsx("h2",{children:n.title}),e.jsx("p",{children:n.subtitle}),e.jsx("hr",{})]})]})},f)),e.jsx("style",{children:`
          /* --- 🌟 NEW: Performance & Smoothness Animations 🌟 --- */
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

          /* Animations */
          @keyframes kenburns {
            0% {
              transform: scale(1.05) translate(0, 0);
              filter: brightness(0.9);
            }
            100% {
              transform: scale(1.15) translate(-1%, -1%);
              filter: brightness(1);
            }
          }
          @keyframes contentFadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes grow-width {
            from { width: 0; }
            to { width: 80px; }
          }

          /* --- 🌟 REFINED: Main Slider Styles 🌟 --- */
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
            transform: scale(1.15); /* Start slightly more zoomed in */
            transition: opacity 1.5s cubic-bezier(0.33, 1, 0.68, 1); /* Smoother fade */
            will-change: opacity, transform; /* Performance Boost */
          }

          .slide::after {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(to top, rgba(15, 35, 71, 0.6), transparent 60%); /* Darker at bottom */
            z-index: 1;
          }

          .slide.current {
            opacity: 1;
            transform: scale(1);
            transition-delay: 0.2s;
          }

          .image {
            width: 100%;
            height: 100%;
            object-fit: cover; 
            object-position: center 20%; /* Image ka focus thoda upar rakha hai taaki chehre clear dikhein */
            transition: transform 12s cubic-bezier(0.2, 0.8, 0.2, 1); /* Slower transition for smoothness */
            will-change: transform; /* Performance Boost */
          }

          .slide.current .image {
            animation: kenburns 12s ease-out forwards;
          }

          /* NAYA TEXT DESIGN: Bottom Center with Gradient */
          .content {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center; /* Text Center me */
            color: #fff;
            /* Gradient is now on the ::after pseudo-element */
            padding: 80px 20px 30px; /* Text ko upar push karne ke liye padding */
            z-index: 2;
          }

          .content h2 {
            font-size: 2.2rem; 
            margin-bottom: 8px;
            font-weight: 800;
            letter-spacing: 0.5px;
            text-shadow: 0px 2px 15px rgba(0,0,0,0.5);
            opacity: 0;
          }

          .content p {
            font-size: 1.2rem;
            margin-bottom: 18px;
            font-weight: 500;
            color: #e2e8f0;
            text-shadow: 1px 1px 5px rgba(0,0,0,0.5);
            opacity: 0;
          }

          .content hr {
            border: 2px solid #f4a023; 
            width: 80px;
            margin: 0 auto; /* Gold line ko center me lane ke liye */
            border-radius: 4px;
            opacity: 0;
          }

          .slide.current .content h2 { animation: contentFadeInUp 0.8s 0.4s both cubic-bezier(0.2, 0.6, 0.2, 1); }
          .slide.current .content p { animation: contentFadeInUp 0.8s 0.6s both cubic-bezier(0.2, 0.6, 0.2, 1); }
          .slide.current .content hr { animation: grow-width 0.8s 0.8s both cubic-bezier(0.2, 0.6, 0.2, 1); opacity: 1; }

          /* Controls Style */
          .arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 45px;
            height: 45px;
            background-color: rgba(15, 35, 71, 0.3); /* Darker, more subtle */
            color: #fff;
            font-size: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border-radius: 50%;
            z-index: 11; /* Above the overlay */
            transition: all 0.3s;
            backdrop-filter: blur(4px); /* Glassmorphism effect */
            border: 1px solid rgba(255, 255, 255, 0.1);
            opacity: 0; /* 🌟 Hide by default */
            transform: translateY(-50%) scale(0.8);
          }

          .slider:hover .arrow {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }

          .arrow:hover {
            background-color: #f4a023; /* Hover par gold */
            color: #000;
            transform: translateY(-50%) scale(1.1); /* Keep the hover effect */
            box-shadow: 0 0 15px rgba(244, 160, 35, 0.4);
          }

          /* --- 🌟 NEW: Slide Indicator Dots 🌟 --- */
          .slider-dots {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 11;
          }
          .dot {
            width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.4s ease;
          }
          .dot.current {
            background: #f4a023; transform: scale(1.3); box-shadow: 0 0 10px rgba(244, 160, 35, 0.5);
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
        `})]})};function Rt(){const i=[{label:"Admission 2024-28",icon:"🎓",href:"#"},{label:"BCA & BBA Portal",icon:"💻",href:"#"},{label:"Internal Exam",icon:"📋",href:"#"},{label:"Online Fee",icon:"💳",href:"#"},{label:"Syllabus",icon:"📚",href:"#"}];return e.jsx("div",{style:{background:"#fff",padding:"12px 0",borderBottom:"1px solid #eee"},children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"center",gap:"12px",flexWrap:"wrap",padding:"0 15px"},children:[e.jsx("style",{children:`
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
          `}),i.map((o,x)=>e.jsxs("a",{href:o.href,className:"ribbon-box",children:[e.jsx("span",{style:{fontSize:"16px"},children:o.icon}),o.label]},x))]})})}const Ue=({title:i,subtitle:o})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:32},children:[e.jsx("h2",{style:{fontSize:26,fontWeight:800,color:a.navy,marginBottom:6},children:i}),e.jsx("div",{style:{width:60,height:3,background:a.gold,margin:"0 auto 10px"}}),o&&e.jsx("p",{style:{color:"#666",fontSize:14},children:o})]});function Mt(){return e.jsxs("div",{style:{padding:"40px 16px",background:"#f8f9fa"},children:[e.jsxs("section",{style:{marginBottom:"100px",padding:"0 20px"},children:[e.jsx(Ue,{title:"Our Academic Departments",subtitle:"Excellence in specialized education for future leaders"}),e.jsx("style",{children:`
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
    .modern-dept-card:hover .explore-arrow {
      transform: translateX(5px);
      transition: transform 0.3s ease;
    }

    /* Mobile Responsive */
    @media (max-width: 1024px) {
      .dept-container { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .dept-container { grid-template-columns: 1fr; }
    }
  `}),e.jsx("div",{className:"dept-container",children:[{name:"B.C.A",icon:"💻",symbol:"展开",desc:"Bachelor of Computer Applications - Future of IT."},{name:"B.B.A",icon:"📈",symbol:"📊",desc:"Bachelor of Business Administration - Master the Market."},{name:"COMMERCE",icon:"💰",symbol:"📒",desc:"Expertise in Finance, Accounts, and Trade."},{name:"ARTS",icon:"🎨",symbol:"🎭",desc:"Exploring Humanity, Culture, and Social Science."}].map((i,o)=>e.jsxs("div",{className:"modern-dept-card","data-aos":"fade-up","data-aos-delay":o*100,children:[e.jsx("div",{className:"dept-bg-symbol",children:i.symbol}),e.jsxs("div",{className:"dept-content",children:[e.jsx("div",{className:"dept-icon-box",children:i.icon}),e.jsx("h3",{style:{color:"#fff",fontSize:"20px",fontWeight:"800",marginBottom:"8px"},children:i.name}),e.jsx("p",{style:{color:"rgba(255,255,255,0.8)",fontSize:"12.5px",lineHeight:"1.5",margin:0},children:i.desc}),e.jsxs("div",{style:{marginTop:"15px",color:a.gold,fontSize:"12px",fontWeight:"bold",display:"flex",alignItems:"center"},children:["EXPLORE PROGRAM ",e.jsx("span",{className:"explore-arrow",style:{marginLeft:"5px",display:"inline-block"},children:"→"})]})]})]},o))})]}),e.jsx("section",{style:{padding:"80px 20px",background:"#ffffff"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1250,margin:"0 auto"},children:[e.jsx(Ue,{title:"College Facilities",subtitle:"World-class infrastructure to support your academic excellence"}),e.jsx("style",{children:`
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
    `}),e.jsx("div",{className:"facility-container",children:Tt.map((i,o)=>e.jsxs("div",{className:"facility-card","data-aos":"zoom-in","data-aos-delay":o*50,children:[e.jsx("div",{className:"facility-icon-wrap",children:i.emoji}),e.jsx("div",{className:"facility-text",children:i.name})]},o))})]})})]})}const je=({title:i,subtitle:o})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:40},children:[e.jsx("h2",{style:{fontSize:28,fontWeight:800,color:a.navy,marginBottom:8},children:i}),e.jsx("div",{style:{width:60,height:4,background:a.gold,margin:"0 auto 12px",borderRadius:2}}),o&&e.jsx("p",{style:{color:"#666",fontSize:15},children:o})]}),Pt=({notices:i,announcements:o,pdfReports:x,upcomingEvents:g})=>{const c=r.useRef(null),m=r.useRef(null),b=r.useRef(null),y=r.useRef(null),n=r.useRef(null),f=r.useRef(null),v=r.useMemo(()=>[...i||[],...i||[]],[i]),z=r.useMemo(()=>{const d=(g||[]).map(l=>({...l,text:l.title,date:l.createdAt?.toDate(),type:l.type||"Event"})),D=(o||[]).map(l=>({...l,date:l.createdAt?.toDate(),type:l.type||"News"}));return[...d,...D].sort((l,w)=>(w.date||0)-(l.date||0))},[g,o]),B=r.useMemo(()=>[...z,...z],[z]),p=r.useMemo(()=>{const d=(x||[]).map(D=>({...D,text:D.title,date:D.createdAt?.toDate(),type:"Document"}));return[...d,...d]},[x]),S=(d,D)=>{const l=d.current;if(!l)return;let w=0;const k=()=>{w-=.6,w<-l.scrollHeight/2&&(w=0),l.style.transform=`translateY(${w}px)`,D.current=requestAnimationFrame(k)};D.current=requestAnimationFrame(k)},R=d=>{d.current&&cancelAnimationFrame(d.current)};return r.useEffect(()=>{S(c,y);const d=c.current;return d&&(d.addEventListener("mouseenter",()=>R(y)),d.addEventListener("mouseleave",()=>S(c,y))),()=>R(y)},[v]),r.useEffect(()=>{S(m,n);const d=m.current;return d&&(d.addEventListener("mouseenter",()=>R(n)),d.addEventListener("mouseleave",()=>S(m,n))),()=>R(n)},[B]),r.useEffect(()=>{S(b,f);const d=b.current;return d&&(d.addEventListener("mouseenter",()=>R(f)),d.addEventListener("mouseleave",()=>S(b,f))),()=>R(f)},[p]),e.jsxs("section",{style:{padding:"90px 20px",background:"#f8fafc",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"300px",background:"linear-gradient(180deg, #f1f5f9 0%, rgba(248,250,252,0) 100%)",zIndex:0}}),e.jsxs("div",{style:{maxWidth:1350,margin:"0 auto",position:"relative",zIndex:1},children:[e.jsx(je,{title:"Notification & Announcements",subtitle:"Stay informed with the latest official updates and campus news"}),e.jsx("style",{children:`
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
        `}),e.jsxs("div",{className:"notif-grid",children:[e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-notice",children:[e.jsx("span",{style:{fontSize:"26px"},children:"🔔"})," Official Notices"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:c,children:v.map((d,D)=>{const l=d.isNew&&(new Date-new Date(d.date))/864e5<5;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",d.date?new Date(d.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#1e3a8a"},children:d.type||"Notice"}),l&&e.jsx("span",{className:"new-badge-pulse",children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:d.text}}),d.link&&e.jsx("a",{href:d.link,target:"_blank",rel:"noreferrer",style:{fontSize:"0.8rem",color:"#2563eb",fontWeight:800,textDecoration:"none",display:"flex",alignItems:"center",gap:"5px"},children:"📎 View Attachment"})]},D)})})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx("div",{className:"view-all-btn",children:"View All Notices"})})]}),e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-news",children:[e.jsx("span",{style:{fontSize:"26px"},children:"📣"})," News & Events"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:m,children:B.map((d,D)=>{const l=d.date&&(new Date-new Date(d.date))/864e5<5;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",d.date?new Date(d.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#e11d48"},children:d.type||"Update"}),l&&e.jsx("span",{className:"new-badge-pulse",children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:d.text||d.title}}),d.desc&&e.jsx("div",{className:"rich-text-desc",dangerouslySetInnerHTML:{__html:d.desc}}),d.link&&e.jsx("a",{href:d.link,target:"_blank",rel:"noreferrer",style:{fontSize:"0.8rem",color:"#e11d48",fontWeight:800,textDecoration:"none",display:"flex",alignItems:"center",gap:"5px"},children:"🔗 Read More"})]},D)})})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx("div",{className:"view-all-btn",children:"Explore News"})})]}),e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-docs",children:[e.jsx("span",{style:{fontSize:"26px"},children:"📄"})," E-Documents"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:b,children:p.map((d,D)=>e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",d.date?new Date(d.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#059669"},children:d.type||"Document"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:d.text||d.title}}),d.link&&e.jsx("a",{href:d.link,target:"_blank",rel:"noreferrer",style:{fontSize:"0.8rem",color:"#059669",fontWeight:800,textDecoration:"none",display:"flex",alignItems:"center",gap:"5px"},children:"⬇️ Download PDF"})]},D))})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx("div",{className:"view-all-btn",children:"Document Archive"})})]})]})]})]})},Bt=({notices:i,announcements:o,pdfReports:x,sliderSlides:g,events:c,gallery:m})=>{const[b,y]=r.useState("All Moments"),n=m||[],f=b==="All Moments"?n:n.filter(p=>p.cat===b),v=(c||[]).filter(p=>p.status==="upcoming"),z=(c||[]).filter(p=>p.status==="recent"),B=p=>{switch(p){case"SEMINAR":return"/images/slider_seminar.jpg";case"WORKSHOP":return"/images/slider_ncc.jpg";case"SPORTS":return"/images/slider_cricket.jpg";case"CULTURAL":return"/images/slider_baisakhi.jpg";default:return"/images/college_photo.jpg"}};return e.jsxs("div",{style:{fontFamily:"'Segoe UI',sans-serif",background:"transparent",minHeight:"100vh",overflowX:"hidden"},children:[e.jsx("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundImage:"url(/gncollege-website/images/logo.png)",backgroundRepeat:"repeat",backgroundSize:"350px",opacity:.03,zIndex:-1,backgroundColor:"#f4f7f9"}}),e.jsx(Lt,{slides:g}),e.jsx(Rt,{}),e.jsx(Pt,{notices:i,announcements:o,pdfReports:x,upcomingEvents:v}),e.jsx("section",{id:"about",style:{background:"#fff",padding:"100px 20px",position:"relative",overflow:"hidden"},children:e.jsxs("div",{style:{maxWidth:1250,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(350px, 1fr))",gap:"60px",alignItems:"center"},children:[e.jsxs("div",{"data-aos":"fade-right",style:{position:"relative"},children:[e.jsx("style",{children:`
                @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
                .image-stack { position: relative; width: 100%; height: 450px; }
                .main-img { width: 90%; height: 100%; object-fit: cover; border-radius: 20px; box-shadow: 20px 20px 0px ${a.gold}; position: relative; z-index: 2; transition: transform 0.5s ease; }
                .image-stack:hover .main-img { transform: scale(1.02); }
                .accent-box { position: absolute; bottom: -30px; right: 0; background: ${a.navy}; color: #fff; padding: 25px; border-radius: 15px; z-index: 3; box-shadow: 0 10px 30px rgba(0,0,0,0.2); animation: float 3s ease-in-out infinite; }
              `}),e.jsxs("div",{className:"image-stack",children:[e.jsx("img",{src:"images/college_photo.jpg",alt:"Guru Nanak College Campus",className:"main-img"}),e.jsxs("div",{className:"accent-box",children:[e.jsx("h4",{style:{fontSize:"32px",margin:0,fontWeight:900,color:a.gold},children:"56+"}),e.jsx("p",{style:{fontSize:"12px",margin:0,opacity:.8,letterSpacing:"1px"},children:"YEARS OF EXCELLENCE"})]})]})]}),e.jsxs("div",{"data-aos":"fade-left",children:[e.jsxs("h2",{style:{fontSize:"38px",fontWeight:900,color:a.navy,lineHeight:1.2,marginBottom:"10px"},children:["About the ",e.jsx("span",{style:{color:a.gold},children:"College"})]}),e.jsx("h4",{style:{color:a.gold,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"25px",fontSize:"14px"},children:"Established 1970"}),e.jsx("p",{style:{color:"#555",lineHeight:1.8,fontSize:"16px",marginBottom:"30px"},children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru. We draw inspiration from the teachings of Guru Nanak Devji, fostering an environment of academic progress and individual development."}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"15px",marginBottom:"35px"},children:[{icon:"🛡️",title:"NAAC Accredited",desc:"Grade B Institution"},{icon:"👨‍🏫",title:"Expert Faculty",desc:"Highly Experienced"},{icon:"🔬",title:"Modern Labs",desc:"Tech-enabled Learning"},{icon:"🏅",title:"NSS & NCC",desc:"Character Building"}].map((p,S)=>e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"start"},children:[e.jsx("span",{style:{fontSize:"20px"},children:p.icon}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:800,fontSize:"14px",color:a.navy},children:p.title}),e.jsx("div",{style:{fontSize:"12px",color:"#888"},children:p.desc})]})]},S))}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"25px",flexWrap:"wrap"},children:[e.jsx("style",{children:`
                .discover-btn {
                  background: ${a.navy}; color: #fff; padding: 15px 35px; border: none; border-radius: 50px; 
                  font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(15,35,71,0.3);
                  text-decoration: none; display: inline-block;
                }
                .discover-btn:hover { background: ${a.gold}; color: ${a.navy}; box-shadow: 0 8px 25px rgba(244,160,35,0.4); }
                .social-icon-btn { width: 40px; height: 40px; border-radius: 50%; background: #f0f2f5; display: flex; align-items: center; justify-content: center; color: ${a.navy}; font-size: 18px; text-decoration: none; transition: all 0.3s ease; }
                .social-icon-btn:hover { background: ${a.navy}; color: ${a.gold}; transform: rotate(360deg); }
              `}),e.jsx(F,{to:"/about-us/college-profile",className:"discover-btn",children:"DISCOVER MORE →"}),e.jsxs("div",{style:{display:"flex",gap:"15px",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"13px",fontWeight:700,color:"#666"},children:"FOLLOW US:"}),we.map(p=>e.jsx("a",{href:p.href,target:"_blank",rel:"noopener noreferrer",className:"social-icon-btn",children:p.id==="twitter"?"𝕏":p.id==="youtube"?"▶":p.label.charAt(0)},p.id))]})]})]})]})}),e.jsx("section",{style:{padding:"80px 20px",background:"#f4f7fa"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"50px",alignItems:"center"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("img",{src:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",alt:"Principal",style:{width:"220px",height:"220px",borderRadius:"50%",objectFit:"cover",border:`6px solid ${a.gold}`,boxShadow:"0 10px 30px rgba(0,0,0,0.15)",marginBottom:"20px"}}),e.jsx("h4",{style:{color:a.navy,margin:"0 0 5px",fontSize:"20px",fontWeight:800},children:"Dr. [Principal's Name]"}),e.jsx("p",{style:{color:"#666",margin:0,fontSize:"14px",fontWeight:600},children:"Principal, Guru Nanak College"})]}),e.jsxs("div",{style:{borderLeft:"4px solid #f4a023",paddingLeft:"30px"},children:[e.jsx("h3",{style:{fontSize:"28px",fontWeight:800,color:a.navy,marginBottom:"15px",textAlign:"left"},children:"A Message from the Principal"}),e.jsx("p",{style:{fontStyle:"italic",color:"#555",lineHeight:1.7,fontSize:"16px",borderLeft:"3px solid #ddd",paddingLeft:"20px",margin:0},children:'"We are committed to providing an environment where students can discover their potential and achieve their dreams. Our focus is on building character, fostering innovation, and nurturing the leaders of tomorrow."'})]})]})}),e.jsx(Mt,{}),e.jsx("section",{id:"events",style:{padding:"80px 20px",background:"transparent"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1400,margin:"0 auto"},children:[e.jsx(je,{title:"Recent Events & Happenings",subtitle:"Insights into our seminars, workshops, and vibrant campus activities"}),e.jsx("style",{children:`
            @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .events-scroller { overflow: hidden; padding: 20px 0; margin-top: 30px; mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent); -webkit-mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent); }
            .events-track { display: flex; width: max-content; gap: 30px; animation: scrollLeft 35s linear infinite; transform: translateZ(0); }
            .events-track:hover { animation-play-state: paused; }
            .event-loop-card { width: 320px; background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.04); border: 1px solid rgba(255,255,255,0.5); flex-shrink: 0; transition: all 0.4s ease; display: flex; flex-direction: column; }
            .event-loop-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 18px 40px rgba(15, 35, 71, 0.15); border-color: ${a.gold}; }
            .el-img-box { position: relative; height: 200px; overflow: hidden; }
            .el-img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s ease; }
            .event-loop-card:hover .el-img { transform: scale(1.08); }
            .el-badge { position: absolute; top: 15px; right: 15px; background: ${a.gold}; color: #000; padding: 5px 12px; font-size: 10px; font-weight: 800; border-radius: 50px; text-transform: uppercase; z-index: 2; box-shadow: 0 4px 10px rgba(0,0,0,0.2); transition: all 0.3s ease; }
            .event-loop-card:hover .el-badge { transform: scale(1.1); box-shadow: 0 6px 15px rgba(0,0,0,0.3); }
            .el-date { position: absolute; bottom: 0; left: 0; background: ${a.navy}; color: #fff; padding: 8px 15px; border-top-right-radius: 12px; text-align: center; z-index: 2; transition: all 0.3s ease; }
            .event-loop-card:hover .el-date { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
            .el-info { padding: 22px; flex: 1; display: flex; flex-direction: column; }
            .el-title { font-size: 16px; font-weight: 800; color: ${a.navy}; margin: 0 0 10px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
            .el-desc { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 15px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; flex: 1;}
            .el-footer { display: flex; justifyContent: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px; margin-top: auto;}
            .read-more-link { font-size: 11px; color: ${a.gold}; font-weight: 800; text-decoration: none; transition: all 0.3s ease; }
            .event-loop-card:hover .read-more-link { color: ${a.navy}; letter-spacing: 0.5px; }
          `}),z.length>0?e.jsx("div",{className:"events-scroller",children:e.jsx("div",{className:"events-track",children:[...z,...z,...z].map((p,S)=>e.jsxs("div",{className:"event-loop-card",children:[e.jsxs("div",{className:"el-img-box",children:[e.jsx("div",{className:"el-badge",children:p.type}),e.jsxs("div",{className:"el-date",children:[e.jsx("div",{style:{fontSize:"18px",fontWeight:900,lineHeight:1},children:p.day||"--"}),e.jsx("div",{style:{fontSize:"10px",fontWeight:700},children:p.month||"---"})]}),e.jsx("img",{src:p.imageUrl||B(p.type),alt:p.title,className:"el-img"})]}),e.jsxs("div",{className:"el-info",children:[e.jsx("h3",{className:"el-title",children:p.title}),e.jsx("div",{className:"el-desc",dangerouslySetInnerHTML:{__html:p.desc}}),e.jsxs("div",{className:"el-footer",children:[e.jsxs("span",{style:{fontSize:"11px",color:"#888",fontWeight:700},children:["📍 ",p.location||"Campus"]}),e.jsx("a",{href:"#",className:"read-more-link",children:"READ MORE →"})]})]})]},S))})}):e.jsxs("div",{style:{textAlign:"center",background:"rgba(255,255,255,0.7)",padding:"40px",borderRadius:"12px",border:"1px dashed #e2e8f0",marginTop:"30px"},children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"10px"},children:"📅"}),e.jsx("h3",{style:{color:a.navy,margin:"0 0 10px"},children:"No Recent Events"}),e.jsx("p",{style:{color:"#64748b",margin:0,fontSize:"14px"},children:"There are no events to display at the moment."})]})]})}),e.jsxs("section",{style:{background:`linear-gradient(135deg, ${a.navyDark} 0%, ${a.navy} 100%)`,padding:"80px 20px",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:.05,pointerEvents:"none",backgroundImage:"radial-gradient(#fff 1px, transparent 1px)",backgroundSize:"30px 30px"}}),e.jsxs("div",{"data-aos":"zoom-in",style:{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"40px",textAlign:"center",position:"relative",zIndex:2},children:[e.jsx("style",{children:`
            .counter-box { padding: 20px; transition: all 0.4s ease; }
            .counter-box:hover { 
              transform: translateY(-10px); 
              background: rgba(255, 255, 255, 0.05);
              border-radius: 15px;
              box-shadow: 0 0 25px rgba(244,160,35,0.1);
            }
            .counter-icon { font-size: 50px; margin-bottom: 15px; display: inline-block; filter: drop-shadow(0 0 10px rgba(244,160,35,0.3)); transition: all 0.4s ease; }
            .counter-box:hover .counter-icon { transform: scale(1.2) rotate(10deg); filter: drop-shadow(0 0 20px rgba(244,160,35,0.6)); }
            .counter-number { font-size: 45px; font-weight: 900; color: ${a.gold}; line-height: 1; margin-bottom: 10px; font-family: 'Arial Black', sans-serif; }
            .counter-label { font-size: 14px; color: #e2e8f0; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
          `}),[{label:"STUDENTS ENROLLED",value:"4,000+",icon:"👨‍🎓"},{label:"SUCCESSFUL ALUMNI",value:"45,000+",icon:"🎓"},{label:"EXPERT FACULTY",value:"50+",icon:"👨‍🏫"},{label:"YEARS OF LEGACY",value:"56",icon:"🏛️"}].map((p,S)=>e.jsxs("div",{className:"counter-box",children:[e.jsx("div",{className:"counter-icon",children:p.icon}),e.jsx("div",{className:"counter-number",children:p.value}),e.jsx("div",{className:"counter-label",children:p.label})]},S))]})]}),e.jsx("section",{style:{padding:"80px 20px",background:"transparent"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsx(je,{title:"Important External Links",subtitle:"Quick access to official education and government portals"}),e.jsx("style",{children:`
            .links-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; margin-top: 40px; }
            .link-tile { background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.6); border-radius: 12px; padding: 25px 15px; text-align: center; text-decoration: none; transition: all 0.3s; display: flex; flex-direction: column; align-items: center; gap: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); transform: translateZ(0); }
            .link-tile:hover { transform: translateY(-8px) scale(1.03); border-color: ${a.gold}; box-shadow: 0 12px 25px rgba(15, 35, 71, 0.1); background: #fff; }
            .link-icon-circle { width: 60px; height: 60px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; transition: 0.3s; }
            .link-tile:hover .link-icon-circle { background: ${a.navy}; color: #fff; transform: rotate(15deg); }
            .link-name { font-size: 13px; font-weight: 800; color: ${a.navy}; letter-spacing: 0.5px; }
          `}),e.jsx("div",{className:"links-grid",children:[{name:"NAAC",url:"https://naac.gov.in",icon:"🏅"},{name:"UGC",url:"https://ugc.ac.in",icon:"📜"},{name:"INFLIBNET",url:"https://inflibnet.ac.in",icon:"📚"},{name:"NDL INDIA",url:"https://ndl.gov.in",icon:"🔬"},{name:"SWAYAM",url:"https://swayam.gov.in",icon:"🌐"},{name:"BBMK UNIVERSITY",url:"https://bbmku.ac.in",icon:"🏛️"}].map((p,S)=>e.jsxs("a",{href:p.url,target:"_blank",rel:"noopener noreferrer",className:"link-tile","data-aos":"fade-up","data-aos-delay":S*50,children:[e.jsx("div",{className:"link-icon-circle",children:p.icon}),e.jsx("div",{className:"link-name",children:p.name})]},S))})]})}),e.jsx("section",{id:"gallery",style:{padding:"100px 20px",background:"#fff"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1300,margin:"0 auto"},children:[e.jsx(je,{title:"📸 Photo Gallery",subtitle:"Memorable glimpses of academic excellence and cultural heritage"}),e.jsx("style",{children:`
            .gallery-filters { display: flex; justify-content: center; gap: 12px; margin-bottom: 50px; flex-wrap: wrap; }
            .filter-btn { padding: 10px 24px; border-radius: 50px; border: 2px solid #edf2f7; background: #fff; color: #0f2347; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.3s ease; }
            .filter-btn:hover { background: #0f2347; color: #fff; border-color: #0f2347; transform: translateY(-2px); }
            .filter-btn.active { background: #0f2347; color: #fff; border-color: #0f2347; box-shadow: 0 5px 15px rgba(15,35,71,0.2); transform: translateY(-2px); }
            .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; }
            .gallery-item { position: relative; border-radius: 15px; overflow: hidden; aspect-ratio: 4/3; box-shadow: 0 5px 15px rgba(0,0,0,0.05); cursor: pointer; }
            .gallery-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
            .gallery-item:hover .gallery-img { transform: scale(1.1); }
            .gallery-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,35,71,0.9), transparent); opacity: 0; transition: 0.4s; display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; }
            .gallery-item:hover .gallery-overlay { opacity: 1; }
            .gallery-overlay span, .gallery-overlay h4 { transform: translateY(10px); opacity: 0; transition: all 0.4s ease; }
            .gallery-item:hover .gallery-overlay span { transform: translateY(0); opacity: 1; transition-delay: 0.1s; }
            .gallery-item:hover .gallery-overlay h4 { transform: translateY(0); opacity: 1; transition-delay: 0.2s; }
          `}),e.jsx("div",{className:"gallery-filters",children:["All Moments","Seminars","Cultural Fest","Guest Visit","Campus","Departments","NSS Programs"].map(p=>e.jsx("button",{className:`filter-btn ${b===p?"active":""}`,onClick:()=>y(p),children:p},p))}),e.jsx("div",{className:"gallery-grid",children:f.length>0?f.map((p,S)=>e.jsxs("div",{className:"gallery-item","data-aos":"zoom-in","data-aos-delay":S*50,children:[e.jsx("img",{src:p.src,alt:p.title,className:"gallery-img"}),e.jsxs("div",{className:"gallery-overlay",children:[e.jsx("span",{style:{color:"#f4a023",fontSize:"10px",fontWeight:"800"},children:p.cat}),e.jsx("h4",{style:{color:"#fff",fontSize:"14px",fontWeight:"700",marginTop:"5px"},children:p.title})]})]},S)):e.jsxs("div",{style:{gridColumn:"1 / -1",textAlign:"center",background:"#f8fafc",padding:"50px 20px",borderRadius:"16px",border:"1px dashed #cbd5e1"},children:[e.jsx("div",{style:{fontSize:"32px",marginBottom:"10px"},children:"📸"}),e.jsx("h3",{style:{color:a.navy,margin:"0 0 5px"},children:"Gallery is Empty"}),e.jsx("p",{style:{color:"#64748b",margin:0,fontSize:"14px"},children:"Upload photos from the Admin Panel to see them here."})]})},b)]})})]})};function Wt({items:i}){return!i||i.length===0?null:e.jsxs("div",{style:{background:a.gold,color:"#000",padding:"8px 0",display:"flex",alignItems:"center",overflow:"hidden",borderBottom:"1px solid rgba(0,0,0,0.1)",zIndex:10,width:"100%",boxSizing:"border-box"},children:[e.jsx("style",{children:`
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
        `}),e.jsx("div",{className:"ticker-badge",children:"🚨 LATEST"}),e.jsx("div",{style:{flex:1,overflow:"hidden",minWidth:0},children:e.jsx("div",{className:"ticker-track",children:[...i,...i].map((o,x)=>e.jsxs("div",{className:"ticker-item",children:[e.jsx("span",{style:{color:"#d32f2f",marginRight:"8px"},children:"•"}),o.text||o.title]},x))})})]})}function $t({onAdminClick:i,navLinks:o}){const[x,g]=r.useState(null),[c,m]=r.useState(null),[b,y]=r.useState(null),[n,f]=r.useState(window.innerWidth<1250),[v,z]=r.useState(!1),[B,p]=r.useState(!1);r.useEffect(()=>{const l=()=>{f(window.innerWidth<1250),window.innerWidth>=1250&&z(!1)},w=()=>{p(window.scrollY>40)};return window.addEventListener("resize",l),window.addEventListener("scroll",w),()=>{window.removeEventListener("resize",l),window.removeEventListener("scroll",w)}},[]);const S=l=>{x===l?(g(null),m(null),y(null)):(g(l),m(null),y(null))},R=l=>{c===l?(m(null),y(null)):(m(l),y(null))},d=l=>{y(b===l?null:l)},D=l=>l?l.startsWith("/#")?l.substring(2):l:"#";return e.jsxs("nav",{className:"glass-navbar",style:{position:"-webkit-sticky",position:"sticky",top:0,zIndex:99999,background:B?"rgba(255, 255, 255, 0.98)":"#ffffff",boxShadow:B?"0 10px 30px rgba(0, 0, 0, 0.15)":"0 4px 15px rgba(0,0,0,0.05)",backdropFilter:B?"blur(12px)":"none",WebkitBackdropFilter:B?"blur(12px)":"none",transition:"all 0.3s ease",width:"100%"},children:[e.jsx("style",{children:`
        /* 🚨 MASTER OVERRIDE: Ye sticky behavior ko fail hone se rokega 🚨 */
        html, body, #root {
          overflow-x: clip !important;
          overflow-y: visible !important;
        }

        /* 3D Spin for Logo */
        @keyframes coinSpin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        
        /* Shimmering effect for Text */
        @keyframes shineText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .spinning-logo {
          animation: coinSpin 6s linear infinite;
          transform-style: preserve-3d;
        }
        
        .logo-box-container:hover .spinning-logo {
          animation-play-state: paused;
        }

        .shimmering-title {
          background: linear-gradient(90deg, ${a.navy} 0%, #1e3a8a 30%, #d4af37 50%, #1e3a8a 70%, ${a.navy} 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shineText 5s linear infinite;
        }

        .clean-divider {
          border-left: 2.5px solid ${a.gold};
          border-radius: 2px;
        }
      `}),e.jsxs("div",{style:{width:"100%",maxWidth:"98%",margin:"0 auto",padding:"0 15px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:n?"5px":"20px"},children:[e.jsxs(F,{to:"/",style:{display:"flex",alignItems:"center",padding:"8px 0",flexShrink:1,textDecoration:"none",gap:n?"8px":"15px",marginLeft:n?"0":"-20px",minWidth:0},children:[e.jsx("div",{className:"logo-box-container",style:{background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:n?"45px":"75px",height:n?"45px":"75px"},children:e.jsx("img",{className:"spinning-logo",src:"/gncollege-website/images/logo.png",alt:"Guru Nanak College Logo",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{className:"clean-divider",style:{display:"flex",flexDirection:"column",justifyContent:"center",paddingLeft:n?"8px":"15px",textAlign:"left",alignItems:"flex-start",overflow:"hidden"},children:[e.jsx("h1",{className:"shimmering-title",style:{margin:"0 0 5px 0",fontSize:n?"13px":"21.5px",fontWeight:"900",fontFamily:"Georgia, serif",whiteSpace:"nowrap",letterSpacing:n?"0px":"2.5px",textAlign:"left",lineHeight:"1.1"},children:"GURU NANAK COLLEGE, DHANBAD"}),!n&&e.jsx("p",{style:{margin:"0 0 3px 0",fontSize:"11px",color:"#475569",fontWeight:"700",whiteSpace:"nowrap",textAlign:"left"},children:"A Sikh Minority Degree College Established & Managed by Gurudwara Prabhandhak Committee, Dhanbad."}),e.jsx("p",{style:{margin:0,fontSize:n?"8.5px":"10.5px",color:a.gold,fontWeight:"800",letterSpacing:n?"0.2px":"1.8px",textTransform:"uppercase",whiteSpace:"nowrap",textAlign:"left"},children:n?"Est. 1970 | Dhanbad, Jharkhand":"Affiliated to Binod Bihari Mahto Koyalanchal University, Dhanbad."})]})]}),n&&e.jsx("button",{onClick:()=>z(!v),style:{background:"transparent",border:"none",color:a.navy,fontSize:28,cursor:"pointer",padding:"4px",flexShrink:0,zIndex:200},children:v?"✕":"☰"}),e.jsxs("div",{style:{display:n?v?"flex":"none":"flex",flexDirection:n?"column":"row",alignItems:n?"flex-start":"center",position:n?"absolute":"static",top:"100%",left:0,right:0,background:n?"rgba(255,255,255,0.98)":"transparent",padding:n?"10px 20px 20px":0,gap:n?10:0,boxShadow:n&&v?"0 10px 20px rgba(0,0,0,.15)":"none",maxHeight:n?"80vh":"auto",overflowY:n?"auto":"visible",flex:1,justifyContent:n?"flex-start":"flex-end",marginLeft:n?"0":"auto",marginRight:n?"0":"10px",borderTop:n&&v?"1px solid #eee":"none",zIndex:250},children:[o.map(l=>e.jsxs("div",{style:{position:"relative",width:n?"100%":"auto"},onMouseEnter:()=>!n&&g(l.label),onMouseLeave:()=>{n||(g(null),m(null),y(null))},children:[e.jsxs("div",{onClick:()=>n&&l.sub&&S(l.label),style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:n&&l.sub?"pointer":"default"},children:[e.jsxs(F,{to:D(l.href),onClick:()=>{l.label==="Home"&&window.scrollTo(0,0)},style:{color:a.navy,padding:n?"12px 0":"24px 11px",display:"block",fontSize:13.5,fontWeight:700,whiteSpace:"nowrap",textDecoration:"none",transition:"all .2s",width:"100%"},children:[l.label==="Home"?"🏠 ":"",l.label]}),n&&l.sub&&e.jsx("span",{style:{color:a.navy,fontSize:20},children:x===l.label?"▴":"▾"}),!n&&l.sub&&e.jsx("span",{style:{color:a.navy,fontSize:11,marginLeft:2,marginRight:8,marginTop:2},children:"▾"})]}),l.sub&&x===l.label&&e.jsx("div",{style:{position:n?"static":"absolute",top:"100%",left:0,background:"#fff",minWidth:240,boxShadow:n?"none":"0 12px 30px rgba(0,0,0,.15)",borderTop:n?"none":"3px solid "+a.navy,borderRadius:n?8:"0 0 8px 8px",zIndex:200,padding:n?"5px 0":"8px 0"},children:l.sub.map(w=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!n&&m(w.label),onMouseLeave:()=>!n&&m(null),children:[e.jsxs("div",{onClick:k=>{n&&w.sub&&(k.stopPropagation(),R(w.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:n?"10px 16px":"10px 18px",borderBottom:n?"none":"1px solid #f8f9fa",cursor:n&&w.sub?"pointer":"default"},onMouseEnter:k=>{n||(k.currentTarget.style.background="#f4f6f9")},onMouseLeave:k=>{n||(k.currentTarget.style.background="transparent")},children:[e.jsx(F,{to:D(w.href),style:{fontSize:13,fontWeight:600,color:a.navy,display:"block",width:"100%",textDecoration:"none"},children:w.label}),w.sub&&e.jsx("span",{style:{fontSize:12,color:a.gold,marginLeft:8},children:n?c===w.label?"▴":"▾":"▶"})]}),w.sub&&c===w.label&&e.jsx("div",{style:{position:n?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:240,boxShadow:n?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:n?"none":"3px solid "+a.gold,borderRadius:n?4:"0 8px 8px 8px",margin:n?"0 16px 10px":0,borderLeft:n?"2px solid "+a.gold:"none"},children:w.sub.map(k=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!n&&y(k.label),onMouseLeave:()=>!n&&y(null),children:[e.jsxs("div",{onClick:W=>{n&&k.sub&&(W.stopPropagation(),d(k.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderBottom:n?"none":"1px solid #f8f9fa",cursor:n&&k.sub?"pointer":"default"},onMouseEnter:W=>{n||(W.currentTarget.style.background="#f4f6f9")},onMouseLeave:W=>{n||(W.currentTarget.style.background="transparent")},children:[e.jsx(F,{to:D(k.href),style:{fontSize:12.5,fontWeight:600,color:"#444",display:"block",width:"100%",textDecoration:"none"},children:k.label}),k.sub&&e.jsx("span",{style:{fontSize:11,color:a.gold,marginLeft:8},children:n?b===k.label?"▴":"▾":"▶"})]}),k.sub&&b===k.label&&e.jsx("div",{style:{position:n?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:240,boxShadow:n?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:n?"none":"3px solid "+a.navy,borderRadius:n?4:"0 8px 8px 8px",margin:n?"0 16px 10px":0,borderLeft:n?"2px solid "+a.navy:"none"},children:k.sub.map(W=>e.jsx(F,{to:D(W.href),style:{display:"block",padding:"10px 16px",fontSize:12,color:"#555",borderBottom:n?"none":"1px solid #f8f9fa",textDecoration:"none"},onMouseEnter:T=>{n||(T.currentTarget.style.background="#f4f6f9")},onMouseLeave:T=>{n||(T.currentTarget.style.background="transparent")},children:W.label},W.label))})]},k.label))})]},w.label))})]},l.label)),e.jsxs("button",{onClick:i,style:{flexShrink:0,background:a.gold,color:"#000",border:"none",padding:"7px 18px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:800,marginLeft:n?0:10,marginTop:n?12:0,width:n?"100%":"auto",boxShadow:"0 4px 15px rgba(244,160,35,0.3)",whiteSpace:"nowrap",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",transition:"all 0.3s ease"},onMouseEnter:l=>l.currentTarget.style.transform="translateY(-2px)",onMouseLeave:l=>l.currentTarget.style.transform="translateY(0)",children:[e.jsx("span",{style:{fontSize:16},children:"⚙️"})," Admin Login"]})]})]})]})}const Gt=()=>e.jsxs("footer",{className:"premium-footer",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"footer-grid",children:[e.jsxs("div",{className:"footer-widget",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"18px",marginBottom:"25px"},children:[e.jsx("div",{style:{width:"75px",height:"75px",background:"rgba(255,255,255,0.95)",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",padding:"8px",boxShadow:"0 10px 25px rgba(0,0,0,0.5)"},children:e.jsx("img",{src:"/gncollege-website/images/logo.png",alt:"GNC Logo",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center"},children:[e.jsx("h2",{style:{fontSize:"1.4rem",fontWeight:"900",color:"#fff",margin:"0 0 2px 0",lineHeight:"1.1"},children:"GURU NANAK"}),e.jsx("h2",{style:{fontSize:"1.4rem",fontWeight:"900",color:"#f4a023",margin:0,lineHeight:"1.1"},children:"COLLEGE"}),e.jsx("p",{style:{fontSize:"0.75rem",color:"#94a3b8",margin:"6px 0 0",fontWeight:"700",letterSpacing:"1.5px"},children:"DHANBAD, JHARKHAND"})]})]}),e.jsx("p",{className:"footer-desc",children:"A Sikh Minority Degree College established in 1970. We are dedicated to providing premium quality education and fostering holistic development based on the core teachings of Guru Nanak Dev Ji."}),e.jsx("div",{style:{display:"flex",gap:"12px"},children:we&&we.map(i=>e.jsx("a",{href:i.href,target:"_blank",rel:"noreferrer",className:"social-btn","aria-label":i.label,children:i.id==="twitter"?"𝕏":i.id==="youtube"?"▶":i.id==="facebook"?"f":i.id==="instagram"?"in":i.label.charAt(0)},i.id))})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Quick Links"}),e.jsx("ul",{className:"footer-links",children:[{label:"Home",path:"/"},{label:"College Profile",path:"/about-us/college-profile"},{label:"Admission Rules",path:"/admission/rule"},{label:"Courses Offered",path:"/academics/course-offered"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((i,o)=>e.jsx("li",{className:"footer-link-item",children:e.jsxs(F,{to:i.path,onClick:()=>window.scrollTo(0,0),className:"footer-link",children:[e.jsx("span",{children:"›"})," ",i.label]})},o))})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Get In Touch"}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"📍"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Main Campus"}),"Bhuda, Dhanbad,",e.jsx("br",{}),"Jharkhand - 826001, India"]})]}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"📞"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Phone Enquiries"}),e.jsx("a",{href:"tel:+917903340991",className:"contact-link",children:"+91 79033 40991"})]})]}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"✉️"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Email Us"}),e.jsx("a",{href:"mailto:principal@gncollege.org",className:"contact-link",children:"principal@gncollege.org"})]})]})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Stay Updated"}),e.jsx("p",{className:"footer-desc",style:{marginBottom:"15px"},children:"Subscribe to our digital newsletter to receive the latest academic notices and campus announcements directly in your inbox."}),e.jsxs("div",{className:"newsletter-box",children:[e.jsx("input",{type:"email",placeholder:"Enter email address...",className:"newsletter-input"}),e.jsx("button",{className:"newsletter-btn",children:"Subscribe"})]})]})]}),e.jsx("div",{className:"footer-bottom",children:e.jsxs("div",{className:"footer-bottom-content",children:[e.jsxs("p",{className:"footer-copyright",children:["© ",new Date().getFullYear()," ",e.jsx("span",{style:{color:"#f4a023",fontWeight:"800"},children:"Guru Nanak College, Dhanbad"}),". All Rights Reserved."]}),e.jsx("p",{className:"footer-dev",children:"Designed & Developed dynamically with ❤️ By Pankaj Kumar"})]})})]}),Ut=()=>e.jsxs("div",{className:"top-bar-container",style:{background:a.navyDark,color:"#e2e8f0",padding:"8px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12.5,fontWeight:500,letterSpacing:"0.4px",borderBottom:"1px solid rgba(255,255,255,0.05)"},children:[e.jsx("style",{children:`
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
        `}),e.jsxs("div",{className:"contact-group",children:[e.jsxs("a",{href:"tel:+917903340991",className:"top-bar-link",children:[e.jsx("span",{style:{fontSize:"15px",color:a.gold},children:"📞"})," +91-7903340991"]}),e.jsxs("a",{href:"mailto:principal@gncollege.org",className:"top-bar-link",children:[e.jsx("span",{style:{fontSize:"15px",color:a.gold},children:"✉️"})," principal@gncollege.org"]})]}),e.jsx("div",{style:{display:"flex",gap:12},children:we.map(i=>{let o=i.label;return i.id==="twitter"&&(o="𝕏"),i.id==="youtube"&&(o="▶"),e.jsx("a",{href:i.href,"aria-label":i.id,target:"_blank",rel:"noopener noreferrer",className:"social-icon",children:o},i.id)})})]}),Ot={apiKey:"AIzaSyDeJWUUoU_MJ4ubpbfaLZemvnEr82LF5YA",authDomain:"gnc-college-web.firebaseapp.com",projectId:"gnc-college-web",storageBucket:"gnc-college-web.firebasestorage.app",messagingSenderId:"78901559372",appId:"1:78901559372:web:f76cb101f8aec2daadb4e9"},Ye=Ct(Ot),A=zt(Ye);At(Ye);function Ft({onClose:i,notices:o,pages:x,events:g,gallery:c,placeholderPaths:m,announcements:b,pdfReports:y,navLinks:n}){const[f,v]=r.useState("pages"),[z,B]=r.useState(""),[p,S]=r.useState("all"),R=r.useRef(null),d=r.useMemo(()=>({readonly:!1,placeholder:"Start typing your content here...",height:400,processPasteHTML:!0,processPasteFromWord:!0,askBeforePasteHTML:!1,askBeforePasteFromWord:!1,buttons:["source","|","bold","italic","underline","|","ul","ol","|","font","fontsize","brush","paragraph","|","image","table","link","|","align","undo","redo","|","hr","eraser","fullsize"]}),[]),[D,l]=r.useState(!1),[w,k]=r.useState(""),W=t=>{k(t),l(!0)},[T,E]=r.useState(!1),[he,C]=r.useState(!1),[M,j]=r.useState(window.innerWidth<1024),[L,Q]=r.useState("update"),[J,ue]=r.useState(null),[q,Re]=r.useState(null),[te,Me]=r.useState(null),[ae,Pe]=r.useState(null),[ie,Be]=r.useState(null),[ta,aa]=r.useState([]),[ce,ge]=r.useState([]),[de,fe]=r.useState(""),[G,ne]=r.useState({label:"",href:""}),[U,be]=r.useState({label:"",href:"",parentId:"top"});r.useEffect(()=>{const t=()=>j(window.innerWidth<1024);return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]),r.useEffect(()=>{(async()=>{const s=await Dt(P(A,"settings","navbar"));s.exists()&&s.data().links&&s.data().links.length>0?ge(s.data().links):n&&n.length>0&&ge(n)})()},[n]);const qe=async()=>{if(!window.confirm("Kya aap apna original lamba menu wapas laana chahte hain? Yeh live menu ko replace kar dega."))return;if(!n||n.length===0)return h.error("Original menu nahi mila!");E(!0);const t=h.loading("Restoring Original Menu...");try{await $e(P(A,"settings","navbar"),{links:n}),ge(n),h.success("Aapka original menu wapas aa gaya!",{id:t})}catch(s){h.error(s.message,{id:t})}E(!1)},Z=r.useMemo(()=>{const t=[];return ce.forEach((s,u)=>{t.push({id:`${u}`,label:s.label,href:s.href,pathStr:`[L1: Main] ${s.label}`,level:0}),s.sub&&s.sub.forEach((_,We)=>{t.push({id:`${u}-${We}`,label:_.label,href:_.href,pathStr:`[L2: Sub] ${s.label} > ${_.label}`,level:1}),_.sub&&_.sub.forEach((Ee,bt)=>{t.push({id:`${u}-${We}-${bt}`,label:Ee.label,href:Ee.href,pathStr:`[L3: Sub-Sub] ${s.label} > ${_.label} > ${Ee.label}`,level:2})})})}),t},[ce]),Ne=async(t,s)=>{E(!0);const u=h.loading("Saving Menu...");try{await $e(P(A,"settings","navbar"),{links:t}),ge(t),h.success(s,{id:u})}catch(_){h.error(_.message,{id:u})}E(!1)},ke=t=>{fe(t);const s=Z.find(u=>u.id===t);s&&ne({label:s.label,href:s.href||""})},Ke=()=>{if(!de||!G.label)return h.error("Please select a menu and enter a name.");const t=[...ce],s=de.split("-");s.length===1?(t[s[0]].label=G.label,t[s[0]].href=G.href):s.length===2?(t[s[0]].sub[s[1]].label=G.label,t[s[0]].sub[s[1]].href=G.href):s.length===3&&(t[s[0]].sub[s[1]].sub[s[2]].label=G.label,t[s[0]].sub[s[1]].sub[s[2]].href=G.href),Ne(t,"Menu Updated Successfully!"),fe(""),ne({label:"",href:""})},Ve=()=>{if(!U.label)return h.error("Menu Name is required!");const t=[...ce],s={label:U.label,href:U.href};if(U.parentId==="top")t.push(s);else{const u=U.parentId.split("-");u.length===1?(t[u[0]].sub||(t[u[0]].sub=[]),t[u[0]].sub.push(s)):u.length===2&&(t[u[0]].sub[u[1]].sub||(t[u[0]].sub[u[1]].sub=[]),t[u[0]].sub[u[1]].sub.push(s))}Ne(t,"New Menu Added Successfully!"),be({label:"",href:"",parentId:"top"})},Je=t=>{if(!window.confirm("Are you sure you want to delete this menu?"))return;const s=[...ce],u=t.split("-");u.length===1?s.splice(u[0],1):u.length===2?s[u[0]].sub.splice(u[1],1):u.length===3&&s[u[0]].sub[u[1]].sub.splice(u[2],1),Ne(s,"Menu Deleted!"),de===t&&(fe(""),ne({label:"",href:""}))},[I,X]=r.useState({title:"",desc:"",type:"WORKSHOP",day:"",month:"",location:"",status:"upcoming",imageUrl:""}),[O,se]=r.useState({text:"",link:"",type:"General",isNew:!0}),[N,re]=r.useState({title:"",content:"",path:"",slug:"",contentType:"html"}),[K,pe]=r.useState({text:"",link:"",type:"News"}),[H,me]=r.useState({title:"",link:"",type:"Document"}),[Y,ye]=r.useState({title:"",cat:"Seminars",src:""}),Qe=async t=>{t.preventDefault(),E(!0);try{if(J){if(!N.title){h.error("Title cannot be empty."),E(!1);return}const s={title:N.title.trim(),content:N.content,contentType:N.contentType,updatedAt:$()};await xe(P(A,"pages",J.id),s),h.success("Page updated successfully!")}else if(L==="update"){if(!N.title||!N.path){h.error("Title and Menu Link are required."),E(!1);return}let s=N.path.startsWith("/#")?N.path.replace("/#",""):N.path;const u={title:N.title.trim(),content:N.content,contentType:N.contentType,path:s,slug:"",createdAt:$()};await ee(V(A,"pages"),u),h.success("Page linked to menu successfully!")}else{if(!N.title||!N.slug){h.error("Title and Custom URL Slug are required."),E(!1);return}const s=N.slug.toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\w-]+/g,""),u={title:N.title.trim(),content:N.content,contentType:N.contentType,path:"",slug:s,createdAt:$()};await ee(V(A,"pages"),u),h.success('Page created! It is automatically added to the "More" menu.')}De()}catch(s){h.error("Error: "+s.message)}E(!1)},Ze=t=>{ue(t);const s=t.path?t.path.startsWith("/#")?t.path:`/#${t.path}`:"",u=Z.some(_=>_.href===s);re({title:t.title||"",content:t.content||"",path:u?s:"",slug:t.slug||"",contentType:t.contentType||"html"}),Q(u?"update":"create"),M||document.querySelector(".admin-main").scrollTo({top:0,behavior:"smooth"})},et=async t=>{if(t.preventDefault(),!Y.src.trim())return alert("Image path is required.");E(!0);try{await ee(V(A,"gallery"),{title:Y.title.trim(),cat:Y.cat.trim(),src:Y.src.trim(),createdAt:$()}),h.success("Photo published to Gallery!"),ye({title:"",cat:"Seminars",src:""})}catch(s){alert("Upload Error: "+s.message)}E(!1)},tt=async t=>{if(window.confirm("Are you sure you want to remove this photo?"))try{await le(P(A,"gallery",t)),h.success("Photo removed successfully!")}catch(s){h.error("Error: "+s.message)}},at=async t=>{t.preventDefault(),E(!0);try{q?(await xe(P(A,"events",q.id),{...I,updatedAt:$()}),h.success("Event updated!")):(await ee(V(A,"events"),{...I,createdAt:$()}),h.success("Event added!")),Se()}catch(s){h.error("Error: "+s.message)}E(!1)},it=async t=>{if(t.preventDefault(),!O.text.trim())return h.error("Notice text is required");E(!0);try{te?(await xe(P(A,"notices",te.id),{...O,updatedAt:$()}),h.success("Notice Updated successfully! 🎉")):(await ee(V(A,"notices"),{...O,date:new Date().toISOString(),createdAt:$()}),h.success("Notice published successfully! 🎉")),Ce()}catch(s){h.error("Error: "+s.message)}E(!1)},nt=async t=>{if(t.preventDefault(),!K.text.trim())return h.error("Announcement text is required");E(!0);try{ae?(await xe(P(A,"announcements",ae.id),{...K,updatedAt:$()}),h.success("News updated successfully! 🎉")):(await ee(V(A,"announcements"),{...K,date:new Date().toISOString(),createdAt:$()}),h.success("News published successfully! 🎉")),ze()}catch(s){h.error("Error: "+s.message)}E(!1)},st=async t=>{if(t.preventDefault(),!H.title.trim()||!H.link.trim())return h.error("Title and Link are required");E(!0);try{ie?(await xe(P(A,"pdfReports",ie.id),{...H,updatedAt:$()}),h.success("Document updated successfully! 🎉")):(await ee(V(A,"pdfReports"),{...H,date:new Date().toISOString(),createdAt:$()}),h.success("Document published successfully! 🎉")),Ae()}catch(s){h.error("Error: "+s.message)}E(!1)},rt=t=>{Re(t),X({title:t.title||"",desc:t.desc||"",type:t.type||"WORKSHOP",day:t.day||"",month:t.month||"",location:t.location||"",status:t.status||"upcoming",imageUrl:t.imageUrl||""})},ot=t=>{Me(t),se({text:t.text||"",link:t.link||"",type:t.type||"General",isNew:t.isNew!==!1})},lt=t=>{Pe(t),pe({text:t.text||"",link:t.link||"",type:t.type||"News"})},ct=t=>{Be(t),me({title:t.title||"",link:t.link||"",type:t.type||"Document"})},Se=()=>{Re(null),X({title:"",desc:"",type:"WORKSHOP",day:"",month:"",location:"",status:"upcoming",imageUrl:""})},Ce=()=>{Me(null),se({text:"",link:"",type:"General",isNew:!0})},ze=()=>{Pe(null),pe({text:"",link:"",type:"News"})},Ae=()=>{Be(null),me({title:"",link:"",type:"Document"})},De=()=>{ue(null),re({title:"",content:"",path:"",slug:"",contentType:"html"})},dt=async t=>{if(window.confirm("Delete this event?"))try{await le(P(A,"events",t)),h.success("Event Deleted!"),q?.id===t&&Se()}catch(s){h.error(s.message)}},pt=async t=>{if(window.confirm("Delete this notice?"))try{await le(P(A,"notices",t)),h.success("Notice Deleted!"),te?.id===t&&Ce()}catch(s){h.error(s.message)}},mt=async t=>{if(window.confirm("Delete this news?"))try{await le(P(A,"announcements",t)),h.success("News Deleted!"),ae?.id===t&&ze()}catch(s){h.error(s.message)}},xt=async t=>{if(window.confirm("Delete this Document?"))try{await le(P(A,"pdfReports",t)),h.success("Document Deleted!"),ie?.id===t&&Ae()}catch(s){h.error(s.message)}},ht=async t=>{if(window.confirm("Delete this page?"))try{await le(P(A,"pages",t)),h.success("Page Deleted!"),J?.id===t&&De()}catch(s){h.error(s.message)}},ut=Z.map(t=>({id:`menu-${t.id}`,realId:t.id,docType:"Menu",contentType:"Menu",title:t.label,displayText:`Hierarchy: ${t.pathStr}`,createdAt:{toMillis:()=>Date.now()+1e6},path:t.href||"Dropdown Menu"})),gt=[...x.map(t=>({...t,contentType:"Page"})),...o.map(t=>({...t,title:t.text.substring(0,50)+"...",contentType:"Notice"})),...b.map(t=>({...t,title:t.text.substring(0,50)+"...",contentType:"News"})),...g.map(t=>({...t,contentType:"Event"})),...y.map(t=>({...t,contentType:"Document"})),...c.map(t=>({...t,contentType:"Gallery"})),...ut].sort((t,s)=>(s.createdAt?.toMillis()||0)-(t.createdAt?.toMillis()||0)).filter(t=>{const s=t.title?.toLowerCase().includes(z.toLowerCase()),u=p==="all"||t.contentType.toLowerCase()===p;return s&&u}),ft=t=>{t.contentType==="Menu"?(v("menu_builder"),ke(t.realId),document.querySelector(".main-scroll-area").scrollTo({top:0,behavior:"smooth"})):v(t.contentType.toLowerCase()+"s")};return e.jsxs("div",{className:"admin-wrapper",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"mobile-topbar",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px"},children:[e.jsx("button",{onClick:()=>C(!0),style:{background:"transparent",border:"none",color:"#fff",fontSize:"28px"},children:"☰"}),e.jsx("h2",{style:{margin:0,fontSize:"18px",fontWeight:800,color:a.gold},children:"GNC Admin"})]}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px",fontSize:"13px"},onClick:i,children:"Exit"})]}),e.jsxs("div",{className:`admin-sidebar ${he?"open":""}`,children:[e.jsxs("div",{className:"sidebar-header",children:[e.jsx("h2",{className:"sidebar-title",children:"Workspace"}),he&&e.jsx("button",{onClick:()=>C(!1),style:{background:"transparent",color:"#fff",border:"none",fontSize:"24px"},children:"✕"})]}),e.jsx("div",{className:"nav-menu",children:[{id:"dashboard",label:"Dashboard",icon:"📊"},{id:"menu_builder",label:"Menu Editor",icon:"🧭"},{id:"pages",label:"Dynamic Pages",icon:"📄"},{id:"gallery",label:"Photo Gallery",icon:"📸"},{id:"notices",label:"Notice Board",icon:"📢"},{id:"announcements",label:"Academic News",icon:"📣"},{id:"pdfReports",label:"E-Documents",icon:"📁"},{id:"events",label:"Campus Events",icon:"🏆"}].map(t=>e.jsxs("div",{className:`nav-item ${f===t.id?"active":""}`,onClick:()=>{v(t.id),C(!1)},children:[e.jsx("span",{className:"nav-icon",children:t.icon})," ",e.jsx("span",{children:t.label})]},t.id))}),e.jsx("div",{style:{marginTop:"auto",padding:"20px"},children:e.jsx("button",{onClick:i,className:"btn btn-primary",style:{width:"100%",background:"red"},children:"Logout"})})]}),e.jsxs("div",{className:"admin-main",children:[f==="menu_builder"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{background:"#fff3cd",padding:"20px",borderRadius:"12px",borderLeft:"5px solid #856404",marginBottom:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("h4",{style:{margin:"0 0 5px 0",color:"#856404",fontSize:"18px"},children:"Missing your original Menu?"}),e.jsx("p",{style:{margin:0,color:"#666",fontSize:"14px"},children:"Click the button to automatically restore all your original menus from your database code."})]}),e.jsx("button",{className:"btn btn-gold",onClick:qe,disabled:T,children:"🔄 Restore Original Menu"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"30px"},children:[e.jsxs("div",{className:"card",style:{borderTop:`4px solid ${a.navy}`},children:[e.jsx("div",{className:"card-title",children:"✏️ 1. Edit Existing Menu"}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Select Menu to Edit"}),e.jsxs("select",{className:"input",value:de,onChange:t=>ke(t.target.value),children:[e.jsx("option",{value:"",children:"-- Choose an Existing Menu --"}),Z.map(t=>e.jsxs("option",{value:t.id,children:[t.pathStr," ",t.href?`(${t.href})`:""]},t.id))]})]}),de&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Change Menu Name"}),e.jsx("input",{className:"input",value:G.label,onChange:t=>ne({...G,label:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Change Menu Link URL (Optional)"}),e.jsx("input",{className:"input",value:G.href,onChange:t=>ne({...G,href:t.target.value}),placeholder:"/#/p/page-slug"})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{className:"btn btn-gold",onClick:Ke,disabled:T,children:"💾 Update Menu"}),e.jsx("button",{className:"btn btn-secondary",onClick:()=>{fe(""),ne({label:"",href:""})},children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",style:{borderTop:`4px solid ${a.gold}`},children:[e.jsx("div",{className:"card-title",children:"➕ 2. Add New Menu / Sub-menu"}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"New Menu Name"}),e.jsx("input",{className:"input",value:U.label,onChange:t=>be({...U,label:t.target.value}),placeholder:"e.g. Gallery"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"New Menu Link URL (Optional)"}),e.jsx("input",{className:"input",value:U.href,onChange:t=>be({...U,href:t.target.value}),placeholder:"/#/gallery"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Select Parent Location"}),e.jsxs("select",{className:"input",value:U.parentId,onChange:t=>be({...U,parentId:t.target.value}),children:[e.jsx("option",{value:"top",children:"--- Make Top Level Menu (Main Navbar) ---"}),Z.filter(t=>t.level<2).map(t=>e.jsxs("option",{value:t.id,children:["Add under: ",t.pathStr]},t.id))]})]}),e.jsx("button",{className:"btn btn-primary",onClick:Ve,disabled:T,children:"🚀 Add to Website"})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📂 3. Live Menu Structure List"}),e.jsx("div",{className:"data-list",children:Z.map(t=>e.jsxs("div",{className:"data-item",style:{marginLeft:`${t.level*30}px`,borderLeft:t.level===0?`4px solid ${a.navy}`:t.level===1?`2px dashed ${a.gold}`:"2px dotted #94a3b8"},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsxs("h4",{style:{display:"flex",alignItems:"center",gap:"10px",fontSize:t.level===0?"16px":"14px"},children:[t.level>0&&e.jsx("span",{style:{color:"#cbd5e1"},children:"↳"})," ",t.label]}),t.href&&e.jsxs("div",{style:{fontSize:"12px",color:a.success,fontWeight:700,marginTop:"5px"},children:["🔗 ",t.href]})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"6px 12px",fontSize:"12px"},onClick:()=>{ke(t.id),window.scrollTo({top:0,behavior:"smooth"})},children:"✏️ Edit"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"6px 12px",fontSize:"12px"},onClick:()=>Je(t.id),children:"🗑️ Delete"})]})]},t.id))})]})]}),f==="dashboard"&&e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📊 Content Dashboard"}),e.jsxs("div",{style:{display:"flex",gap:"20px",marginBottom:"20px"},children:[e.jsx("input",{type:"text",placeholder:"Search all content...",className:"input",value:z,onChange:t=>B(t.target.value)}),e.jsxs("select",{className:"input",value:p,onChange:t=>S(t.target.value),children:[e.jsx("option",{value:"all",children:"All Types"}),e.jsx("option",{value:"menu",children:"Navbar Menu"}),e.jsx("option",{value:"page",children:"Page"}),e.jsx("option",{value:"notice",children:"Notice"}),e.jsx("option",{value:"news",children:"News"}),e.jsx("option",{value:"event",children:"Event"}),e.jsx("option",{value:"document",children:"Document"}),e.jsx("option",{value:"gallery",children:"Gallery"})]})]}),e.jsx("div",{className:"data-list",children:gt.map(t=>e.jsxs("div",{className:"data-item",children:[e.jsxs("div",{className:"data-content",children:[e.jsx("span",{className:"badge",style:{background:"#eee",color:"#333"},children:t.contentType}),e.jsx("h4",{style:{whiteSpace:"normal",wordBreak:"break-all"},children:t.title}),t.path&&e.jsx("p",{style:{margin:"5px 0 0",fontSize:"12px",color:"#666"},children:t.displayText||t.path})]}),e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>ft(t),children:"Go to Edit"})]},t.id))})]}),f==="gallery"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📸 Add to Photo Gallery"}),e.jsxs("form",{onSubmit:et,children:[e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Photo Title"}),e.jsx("input",{className:"input",value:Y.title,onChange:t=>ye({...Y,title:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Category"}),e.jsxs("select",{className:"input",value:Y.cat,onChange:t=>ye({...Y,cat:t.target.value}),children:[e.jsx("option",{value:"Seminars",children:"Seminars"}),e.jsx("option",{value:"Cultural Fest",children:"Cultural Fest"}),e.jsx("option",{value:"Guest Visit",children:"Guest Visit"}),e.jsx("option",{value:"Campus",children:"Campus"}),e.jsx("option",{value:"Departments",children:"Departments"}),e.jsx("option",{value:"NSS Programs",children:"NSS Programs"})]})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Image Path (from public folder)"}),e.jsx("input",{className:"input",value:Y.src,onChange:t=>ye({...Y,src:t.target.value}),required:!0})]}),e.jsx("div",{className:"btn-group",children:e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:T,children:T?"Processing...":"🚀 Publish Photo"})})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"🖼️ Live Cloud Gallery Images"}),e.jsx("div",{className:"data-list",style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))",gap:"20px",flexDirection:"unset"},children:(c||[]).map(t=>e.jsxs("div",{style:{border:"1px solid #edf2f7",borderRadius:"12px",overflow:"hidden",background:"#fff"},children:[e.jsx("img",{src:t.src,alt:t.title,style:{width:"100%",height:"180px",objectFit:"cover"}}),e.jsxs("div",{style:{padding:"15px"},children:[e.jsx("span",{className:"badge",style:{background:"#fff3cd",color:"#856404"},children:t.cat}),e.jsx("h4",{style:{margin:"5px 0",fontSize:"15px",color:a.navy},children:t.title}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 0",width:"100%",marginTop:"10px",fontSize:"13px"},onClick:()=>tt(t.id),children:"🗑️ Remove Photo"})]})]},t.id))})]})]}),f==="pages"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📄 ",J?"Edit Page Details":"Design New Page"]}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"20px",marginBottom:"30px",background:"#f8fafc",padding:"20px",borderRadius:"12px",border:"1px solid #edf2f7"},children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer",fontWeight:600,color:a.navy},children:[e.jsx("input",{type:"radio",value:"update",checked:L==="update",onChange:()=>Q("update")})," Update Existing Menu Link"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer",fontWeight:600,color:a.navy},children:[e.jsx("input",{type:"radio",value:"create",checked:L==="create",onChange:()=>Q("create")})," Create Custom URL Page"]})]}),e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Page Title"}),e.jsx("input",{className:"input",placeholder:"e.g. Computer Science",value:N.title,onChange:t=>{const s=t.target.value;re({...N,title:s,slug:L==="create"?s.toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\w-]+/g,""):N.slug})},required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:L==="update"?"Target Menu Link":"Custom URL Slug"}),L==="update"?e.jsxs("select",{className:"input",value:N.path,onChange:t=>re({...N,path:t.target.value,slug:""}),required:!0,children:[e.jsx("option",{value:"",children:"-- Select Menu --"}),Z.filter(t=>t.href).map(t=>e.jsxs("option",{value:t.href,children:[t.pathStr," ",t.href?`(${t.href})`:""]},t.id))]}):e.jsx("input",{className:"input",placeholder:"e.g. computer-science",value:N.slug,onChange:t=>re({...N,slug:t.target.value.toLowerCase().trim().replace(/\s+/g,"-"),path:""}),required:!0})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Page Content"}),e.jsx(ve,{ref:R,value:N.content,config:d,tabIndex:1,onBlur:t=>re({...N,content:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>W(N.content),children:"👁️ Preview"}),e.jsx("button",{className:"btn btn-gold",onClick:Qe,disabled:T,children:T?"Processing...":J?"💾 Save Changes":"🚀 Publish Page"}),J&&e.jsx("button",{className:"btn btn-secondary",onClick:De,children:"Cancel"})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📂 Live Pages Database"}),e.jsx("div",{className:"data-list",children:(x||[]).map(t=>{const s=t.path?t.path.startsWith("/#")?t.path:`/#${t.path}`:`/#/p/${t.slug}`;return e.jsxs("div",{className:"data-item",style:{borderLeft:`4px solid ${a.navy}`},children:[e.jsxs("div",{className:"data-content",style:{wordBreak:"break-all"},children:[e.jsx("h4",{children:t.title}),e.jsx("a",{href:s,target:"_blank",rel:"noopener noreferrer",style:{fontSize:"13px",color:a.gold,textDecoration:"none",fontWeight:700},children:"🔗 View Live Page"})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>Ze(t),children:"✏️ Edit"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>ht(t.id),children:"🗑️"})]})]},t.id)})})]})]}),f==="notices"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📢 ",te?"Edit Notice":"Broadcast New Notice"]}),e.jsxs("form",{onSubmit:it,children:[e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Category"}),e.jsxs("select",{className:"input",value:O.type,onChange:t=>se({...O,type:t.target.value}),children:[e.jsx("option",{children:"General"}),e.jsx("option",{children:"Examination"}),e.jsx("option",{children:"Admission"}),e.jsx("option",{children:"Holiday"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Attachment URL (Drive/PDF)"}),e.jsx("input",{className:"input",placeholder:"Optional Link",value:O.link,onChange:t=>se({...O,link:t.target.value})})]}),e.jsx("div",{className:"form-group",style:{alignSelf:"center"},children:e.jsxs("label",{className:"label",style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("input",{type:"checkbox",checked:O.isNew,onChange:t=>se({...O,isNew:t.target.checked})}),' Show "NEW" Badge']})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Notice Message (Rich Text)"}),e.jsx(ve,{ref:R,value:O.text,config:d,onBlur:t=>se({...O,text:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:T,children:T?"Processing...":te?"💾 Update Notice":"🚀 Broadcast Notice"}),te&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:Ce,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📋 Recent Notices"}),e.jsx("div",{className:"data-list",children:(o||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:`5px solid ${a.gold}`},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsxs("span",{className:"badge",style:{background:"#fff3cd",color:"#856404"},children:[t.type," ",t.isNew&&e.jsx("span",{style:{color:"red",marginLeft:"5px"},children:" (NEW)"})]}),e.jsxs("span",{style:{fontSize:"12px",marginLeft:"12px",color:"#718096",fontWeight:600},children:["📅 ",t.date?new Date(t.date).toLocaleDateString("en-GB"):"N/A"]}),e.jsx("div",{dangerouslySetInnerHTML:{__html:t.text},style:{margin:"8px 0",fontSize:"15px",color:"#1a202c",fontWeight:600}}),t.link&&e.jsx("a",{href:t.link,target:"_blank",rel:"noreferrer",style:{fontSize:"12.5px",color:a.navy,fontWeight:700,textDecoration:"none"},children:"📎 Open Attachment"})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>ot(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>pt(t.id),children:"🗑️"})]})]},t.id))})]})]}),f==="announcements"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📣 ",ae?"Edit News":"Publish Academic News"]}),e.jsxs("form",{onSubmit:nt,children:[e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"News Category"}),e.jsxs("select",{className:"input",value:K.type,onChange:t=>pe({...K,type:t.target.value}),children:[e.jsx("option",{children:"News"}),e.jsx("option",{children:"Achievement"}),e.jsx("option",{children:"Update"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Reference Link (Optional)"}),e.jsx("input",{className:"input",placeholder:"URL",value:K.link,onChange:t=>pe({...K,link:t.target.value})})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"News Content (Rich Text)"}),e.jsx(ve,{ref:R,value:K.text,config:d,onBlur:t=>pe({...K,text:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:T,children:ae?"💾 Update News":"🚀 Publish News"}),ae&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:ze,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"🗞️ Published News"}),e.jsx("div",{className:"data-list",children:(b||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:"5px solid #d32f2f"},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsx("span",{className:"badge",style:{background:"#ffe5e5",color:"#d32f2f"},children:t.type}),e.jsx("div",{dangerouslySetInnerHTML:{__html:t.text},style:{margin:"8px 0",fontSize:"15px",color:"#1a202c",fontWeight:600}})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>lt(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>mt(t.id),children:"🗑️"})]})]},t.id))})]})]}),f==="pdfReports"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["📁 ",ie?"Edit Document":"Upload E-Document"]}),e.jsxs("form",{onSubmit:st,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Document Title"}),e.jsx("input",{className:"input",value:H.title,onChange:t=>me({...H,title:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Document URL (Drive/PDF Link)"}),e.jsx("input",{className:"input",value:H.link,onChange:t=>me({...H,link:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Document Type"}),e.jsxs("select",{className:"input",value:H.type,onChange:t=>me({...H,type:t.target.value}),children:[e.jsx("option",{children:"Document"}),e.jsx("option",{children:"Report"}),e.jsx("option",{children:"Syllabus"})]})]})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:T,children:ie?"💾 Update Doc":"🚀 Publish Doc"}),ie&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:Ae,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📚 Live Documents"}),e.jsx("div",{className:"data-list",children:(y||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:"5px solid #10b981"},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsx("span",{className:"badge",style:{background:"#e6f7f1",color:"#047857"},children:t.type}),e.jsx("h4",{children:t.title}),e.jsx("a",{href:t.link,target:"_blank",rel:"noreferrer",style:{fontSize:"13px",color:"#10b981",textDecoration:"none",fontWeight:700},children:"⬇️ View / Download Source"})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>ct(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>xt(t.id),children:"🗑️"})]})]},t.id))})]})]}),f==="events"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["🏆 ",q?"Edit Campus Event":"Add Campus Event"]}),e.jsxs("form",{onSubmit:at,children:[e.jsxs("div",{className:"form-grid",style:{gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))"},children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Event Title"}),e.jsx("input",{className:"input",value:I.title,onChange:t=>X({...I,title:t.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Event Type"}),e.jsxs("select",{className:"input",value:I.type,onChange:t=>X({...I,type:t.target.value}),children:[e.jsx("option",{children:"WORKSHOP"}),e.jsx("option",{children:"SEMINAR"}),e.jsx("option",{children:"CULTURAL"}),e.jsx("option",{children:"SPORTS"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Day (e.g. 24)"}),e.jsx("input",{className:"input",value:I.day,onChange:t=>X({...I,day:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Month (e.g. MAR)"}),e.jsx("input",{className:"input",value:I.month,onChange:t=>X({...I,month:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Location"}),e.jsx("input",{className:"input",value:I.location,onChange:t=>X({...I,location:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Status"}),e.jsxs("select",{className:"input",value:I.status,onChange:t=>X({...I,status:t.target.value}),children:[e.jsx("option",{value:"upcoming",children:"Upcoming Event"}),e.jsx("option",{value:"recent",children:"Recent Event"})]})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Image Path (from public folder)"}),e.jsx("input",{className:"input",placeholder:"e.g. /images/sports-day.jpg",value:I.imageUrl,onChange:t=>X({...I,imageUrl:t.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"label",children:"Event Description (Rich Text)"}),e.jsx(ve,{ref:R,value:I.desc,config:d,onBlur:t=>X({...I,desc:t})})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:T,children:q?"💾 Update Event":"🚀 Publish Event"}),q&&e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:Se,children:"Cancel"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"📆 Event Roster"}),e.jsx("div",{className:"data-list",children:(g||[]).map(t=>e.jsxs("div",{className:"data-item",style:{borderLeft:"5px solid #8b5cf6"},children:[e.jsxs("div",{className:"data-content",style:{flex:1},children:[e.jsx("span",{className:"badge",style:{background:"#ede9fe",color:"#6d28d9"},children:t.type}),e.jsx("h4",{children:t.title}),e.jsx("div",{dangerouslySetInnerHTML:{__html:t.desc},style:{fontSize:"13px",color:"#666",marginTop:"5px"}}),e.jsxs("p",{style:{marginTop:"5px",fontSize:"12px",fontWeight:"bold"},children:["📍 ",t.location||"Campus","   |   📅 ",t.day," ",t.month]})]}),e.jsxs("div",{className:"btn-group action-btns",children:[e.jsx("button",{className:"btn btn-secondary",style:{padding:"8px 16px"},onClick:()=>rt(t),children:"✏️"}),e.jsx("button",{className:"btn btn-danger",style:{padding:"8px 16px"},onClick:()=>dt(t.id),children:"🗑️"})]})]},t.id))})]})]}),D&&e.jsx("div",{className:"preview-modal-overlay",children:e.jsxs("div",{className:"preview-modal-content",children:[e.jsxs("div",{className:"preview-modal-header",children:[e.jsx("h3",{children:"Live Content Preview"}),e.jsx("button",{onClick:()=>l(!1),children:"✕"})]}),e.jsx("div",{className:"preview-modal-body dynamic-rich-content",children:He(Xe.sanitize(w,{ADD_TAGS:["iframe"],ADD_ATTR:["allow","allowfullscreen","frameborder","scrolling"]}))})]})})]})]})}function Xt({onSuccess:i,onClose:o}){const[x,g]=r.useState(""),[c,m]=r.useState(""),[b,y]=r.useState(""),[n,f]=r.useState(!1),v=z=>{z.preventDefault(),y(""),f(!0),setTimeout(()=>{x==="admin"&&c==="admin123"?i():(y("❌ Incorrect Username or Password"),f(!1))},800)};return e.jsxs("div",{className:"login-overlay",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"login-box",children:[e.jsx("button",{className:"close-btn",onClick:o,title:"Close",children:"✕"}),e.jsxs("div",{className:"login-header",children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"10px"},children:"🛡️"}),e.jsx("h2",{children:"Admin Portal"}),e.jsx("p",{children:"Authorized Personnel Only"})]}),e.jsxs("form",{className:"login-form",onSubmit:v,children:[b&&e.jsx("div",{className:"error-box",children:b}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"input-label",children:"Username"}),e.jsx("input",{type:"text",className:"login-input",placeholder:"Enter your username",value:x,onChange:z=>g(z.target.value),required:!0})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"input-label",children:"Password"}),e.jsx("input",{type:"password",className:"login-input",placeholder:"Enter your password",value:c,onChange:z=>m(z.target.value),required:!0})]}),e.jsx("button",{type:"submit",className:"login-btn",disabled:n,children:n?"Authenticating...":"Secure Login 🚀"})]})]})]})}const Ht=()=>{const i=Le();let o=i.pathname;o==="/"&&i.hash.startsWith("#/")&&(o=i.hash.substring(1));const x=o.split("/").filter(g=>g);return x.length===0?null:e.jsx("div",{style:{background:"#f8f9fa",borderBottom:"1px solid #e0e0e0"},children:e.jsxs("div",{style:{maxWidth:"1400px",margin:"0 auto",padding:"12px 20px",fontSize:"13.5px",color:"#666",display:"flex",alignItems:"center",fontWeight:"500"},children:[e.jsxs(F,{to:"/",style:{color:a.navy,textDecoration:"none",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{children:"🏠"})," Home"]}),x.map((g,c)=>{const m=`/${x.slice(0,c+1).join("/")}`,b=c===x.length-1,y=g.replace(/-/g," ").replace(/\b\w/g,n=>n.toUpperCase());return e.jsxs("span",{style:{display:"flex",alignItems:"center"},children:[e.jsx("span",{style:{margin:"0 10px",color:"#ccc",fontSize:"10px"},children:"❯"}),b?e.jsx("span",{style:{color:a.gold,fontWeight:"700"},children:y}):e.jsx(F,{to:m,style:{color:a.navy,textDecoration:"none"},children:y})]},m)})]})})};function Yt(){const i=[{label:"Principal Message",icon:"👨‍🏫",href:"#/about-us/principal-message"},{label:"Admission Rules",icon:"🎓",href:"#/admission/rule"},{label:"Departments",icon:"🏛️",href:"#/academics/course-offered"},{label:"NSS / NCC",icon:"🎖️",href:"#/activity/nss"},{label:"Syllabus",icon:"📚",href:"#/syllabus"},{label:"Photo Gallery",icon:"📸",href:"#/gallery"},{label:"Contact Us",icon:"📞",href:"#/contact"}];return e.jsx("div",{style:{position:"fixed",right:0,top:"50%",transform:"translateY(-50%)",zIndex:990,display:"flex",flexDirection:"column",gap:"4px"},children:i.map((o,x)=>e.jsx(_t,{action:o,index:x},x))})}const _t=({action:i,index:o})=>{const[x,g]=r.useState(!1);return e.jsxs("a",{href:i.href,onMouseEnter:()=>g(!0),onMouseLeave:()=>g(!1),style:{display:"flex",alignItems:"center",justifyContent:"flex-start",padding:"12px 15px",backgroundColor:x?a.gold:a.navy,color:x?a.navy:"#fff",textDecoration:"none",width:x?"200px":"55px",height:"55px",borderTopLeftRadius:"12px",borderBottomLeftRadius:"12px",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",overflow:"hidden",whiteSpace:"nowrap",boxShadow:x?"-5px 5px 15px rgba(0,0,0,0.2)":"-2px 2px 8px rgba(0,0,0,0.1)",position:"relative",right:x?"0":"-5px",animation:`slideInRight 0.5s ease forwards ${o*.1}s`,opacity:0},children:[e.jsx("span",{style:{fontSize:"22px",minWidth:"30px",textAlign:"center",display:"block"},children:i.icon}),e.jsx("span",{style:{fontWeight:"800",fontSize:"14px",marginLeft:"12px",opacity:x?1:0,transition:"opacity 0.3s ease 0.1s"},children:i.label}),e.jsx("style",{children:"@keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }"})]})};function _e({page:i}){const[o,x]=r.useState([]);if(r.useEffect(()=>{if(!i)return;window.scrollTo(0,0);const c=i.path||`/p/${i.slug}`,m=Fe(V(A,"pdfReports")),b=Ie(m,y=>{const f=y.docs.map(v=>({id:v.id,...v.data()})).filter(v=>v.targetPage===c);f.sort((v,z)=>new Date(z.date)-new Date(v.date)),x(f)});return()=>b()},[i]),!i)return e.jsx("div",{style:{minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f4f7fa"},children:e.jsxs("div",{style:{textAlign:"center",padding:"50px",background:"#fff",borderRadius:"16px",boxShadow:"0 10px 30px rgba(0,0,0,0.05)"},children:[e.jsx("div",{style:{fontSize:"50px",marginBottom:"15px"},children:"🚧"}),e.jsx("h2",{style:{color:a.navy,fontSize:"28px",margin:"0 0 10px"},children:"Content Updating..."}),e.jsx("p",{style:{color:"#64748b",margin:0},children:"This section is currently being updated by the administration."})]})});const g=Xe.sanitize(i.content,{ADD_TAGS:["iframe"],ADD_ATTR:["allow","allowfullscreen","frameborder","scrolling"]});return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:i.title}),e.jsx("p",{className:"hero-subtitle",children:"Guru Nanak College, Dhanbad"})]})]}),e.jsx("div",{className:"profile-container",children:e.jsxs("div",{className:"profile-layout",children:[e.jsxs("main",{className:"profile-main",children:[e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:"0.2s"},children:[e.jsx("h2",{className:"section-heading",children:i.title}),e.jsx("div",{className:"heading-underline"}),e.jsx("div",{className:"dynamic-rich-content",children:He(g)})]}),o.length>0&&e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:"0.3s"},children:[e.jsx("h2",{className:"section-heading",children:"📚 Official Documents"}),e.jsx("div",{className:"heading-underline"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:"20px"},children:o.map(c=>e.jsxs("div",{style:{display:"flex",background:"#fff",border:"1px solid #e2e8f0",borderRadius:"10px",overflow:"hidden",transition:"all 0.3s ease",boxShadow:"0 4px 6px rgba(0,0,0,0.02)"},onMouseOver:m=>{m.currentTarget.style.transform="translateY(-4px)",m.currentTarget.style.borderColor=a.gold},onMouseOut:m=>{m.currentTarget.style.transform="translateY(0)",m.currentTarget.style.borderColor="#e2e8f0"},children:[e.jsx("div",{style:{width:"80px",background:"#f1f5f9",borderRight:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"center"},children:c.coverImage?e.jsx("img",{src:c.coverImage,alt:"cover",style:{width:"100%",height:"100%",objectFit:"cover"}}):e.jsx("div",{style:{fontSize:"30px",opacity:.3},children:"📄"})}),e.jsxs("div",{style:{padding:"15px",flex:1,display:"flex",flexDirection:"column",justifyContent:"center"},children:[c.isNew&&e.jsx("span",{className:"new-badge",children:"NEW"}),e.jsx("h4",{style:{margin:"0 0 5px 0",fontSize:"14px",color:a.navy,lineHeight:"1.4"},children:c.title}),e.jsxs("p",{style:{margin:"0 0 10px 0",fontSize:"11px",color:"#64748b",fontWeight:600},children:["📅 ",c.date]}),e.jsx("a",{href:c.pdfLink||c.link,target:"_blank",rel:"noreferrer",className:"download-btn",children:"⬇️ View Document"})]})]},c.id))})]})]}),e.jsxs("aside",{className:"profile-sidebar anim-slide-up",style:{animationDelay:"0.5s"},children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"Principal Message",path:"/about-us/principal-message"},{label:"Admission Rules",path:"/admission/rule"},{label:"Fee Structure",path:"/admission/fee-structure"},{label:"Departments",path:"/academics/course-offered"},{label:"NSS",path:"/activity/nss"},{label:"NCC",path:"/activity/ncc"},{label:"Sports",path:"/activity/games-sports"},{label:"Workshop",path:"/activity/workshop"},{label:"Syllabus",path:"/syllabus"},{label:"Academic Calendar",path:"/academics/academic-calendar"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((c,m)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(F,{to:c.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",c.label]})},m))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:"45px",marginBottom:"15px",position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 12px",fontSize:"19px",color:"#f4a023",position:"relative",zIndex:2},children:"Need Assistance?"}),e.jsx("p",{style:{fontSize:"14px",margin:"0 0 20px",color:"#e2e8f0",lineHeight:"1.6",position:"relative",zIndex:2},children:"Contact our administration office for any queries related to admission or academics."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call Helpdesk Now"})]})]})]})}),e.jsx("style",{children:`
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
      `})]})}const qt=()=>(r.useEffect(()=>{window.scrollTo(0,0)},[]),e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("header",{className:"contact-header",children:[e.jsxs("h1",{className:"header-title",children:["Get In ",e.jsx("span",{children:"Touch"})]}),e.jsx("p",{className:"header-sub",children:"We are here to assist you. Reach out to our respective campuses or directly contact our administration team for any queries."})]}),e.jsxs("div",{className:"campus-container",children:[e.jsxs("div",{className:"campus-card card-1",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏛️"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bhuda Campus"}),e.jsx("span",{className:"campus-badge",style:{background:a.navy},children:"Main Campus • Boys Wing"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsxs("p",{children:["Guru Nanak College, Bhuda",e.jsx("br",{}),"Dhanbad, Jharkhand - 826001"]})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:"tel:+917903340991",children:"+91 79033 40991"})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:"mailto:info@gncollege.org",children:"info@gncollege.org"})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bhuda Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.089853381653!2d86.43232147533682!3d23.797658878638367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69707963d7e8b%3A0x86733221469e7f7b!2sGuru%20Nanak%20College%20Dhanbad!5e0!3m2!1sen!2sin!4v1708688000000!5m2!1sen!2sin",allowFullScreen:"",loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})})]}),e.jsxs("div",{className:"campus-card card-2",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏢"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bank More Campus"}),e.jsx("span",{className:"campus-badge",style:{background:a.gold,color:a.navyDark},children:"Girls Wing • Vocational Studies"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsxs("p",{children:["Guru Nanak College, Bank More",e.jsx("br",{}),"Dhanbad, Jharkhand - 826001"]})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:"tel:+910000000000",children:"+91 (Add Number)"})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:"mailto:vocational@gncollege.org",children:"vocational@gncollege.org"})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bank More Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.630325992144!2d86.4175863149822!3d23.77601898456687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6a3048817a859%3A0x8d365f7d34c52968!2sGuru%20Nanak%20College%20Womens%20Wing!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",allowFullScreen:"",loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})})]})]}),e.jsx("div",{className:"profile-container",style:{marginTop:0},children:e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:"0.3s",background:"transparent",boxShadow:"none",border:"none",padding:"0 !important"},children:[e.jsx("h2",{className:"section-heading",style:{textAlign:"center !important",fontSize:"32px"},children:"Administration Directory"}),e.jsx("div",{className:"heading-underline",style:{margin:"0 auto 30px"}}),e.jsx("div",{className:"directory-grid",children:[{title:"Prof. In-Charge (Bhuda Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫"},{title:"Prof. In-Charge (Bank More Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫"},{title:"BCA Coordinator",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"💻"},{title:"Member, Women's Cell",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛡️"},{title:"Member, Anti-Ragging Squad",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛑"},{title:"P.A. to Principal",name:"Mr. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"📝"}].map((i,o)=>e.jsxs("div",{className:"directory-card",children:[e.jsx("div",{className:"dir-icon",children:i.icon}),e.jsxs("div",{children:[e.jsx("div",{className:"dir-title",children:i.title}),e.jsx("div",{className:"dir-name",children:i.name}),e.jsxs("a",{href:`tel:${i.phone}`,className:"dir-contact",children:["📞 ",i.phone]})]})]},o))})]})})]})),Kt=()=>(r.useEffect(()=>{window.scrollTo(0,0)},[]),e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("header",{className:"profile-hero",children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"College Profile"}),e.jsx("p",{className:"hero-subtitle",children:"Excellence in Education Since 1970"})]})]}),e.jsx("div",{className:"profile-container",children:e.jsxs("div",{className:"profile-layout",children:[e.jsxs("main",{className:"profile-main",children:[e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:"0.2s"},children:[e.jsxs("div",{className:"section-grid",style:{marginBottom:"3rem"},children:[e.jsxs("div",{className:"text-content",children:[e.jsx("h2",{className:"section-heading",children:"College Profile"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was Established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru after whom this college is named."}),e.jsx("p",{className:"rich-text-content mt-4",children:"The college is managed by a Governing Council nominated by the Gurudwara Prabandhak Committee, Dhanbad, and draws its inspiration from the teachings of the faith propounded by Guru Nanak Devji."})]}),e.jsx("div",{className:"image-content",children:e.jsx("img",{src:"https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop",alt:"College Campus",className:"profile-img hover-scale"})})]}),e.jsxs("div",{style:{marginBottom:"3rem"},children:[e.jsx("h2",{className:"section-heading",children:"About the College"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"Initially the college got affiliated to the Ranchi University – Ranchi since 1970 the year it was stared. But with the passage of time, Binod Bihari Mahto Koylanchal University, Dhanbad came into existence in 2017; and the affiliation of the college got transferred to this new University in 2017."}),e.jsx("p",{className:"rich-text-content mt-4",children:"At present, the college has got permanent affiliation with Binod Bihari Mahto Koylanchal University, Dhanbad in the faculties of Humanities, Social Sciences, commerce and such vocational courses as Bachelor of Computer Applications. The college has got “Deficit Grant College Status” by the government of Jharkhand. Also the college is registered u/s 2F and 12B of the UGC Act."}),e.jsx("p",{className:"rich-text-content mt-4",children:"The main aim and objective behind sponsoring this college was to impart value - based teaching to the young men and women of Dhanbad. The college attaches great importance to moral teaching. The college does not merely offer teaching in such subject as would enable young students to earn their bread and butter, but it also emphasizes grooming them into worthy (morally sound) citizens."})]}),e.jsxs("div",{children:[e.jsx("h2",{className:"section-heading",children:"Our Campuses"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",style:{marginBottom:"3rem"},children:"Guru Nanak College, Dhanbad functions at two main campuses:"}),e.jsxs("div",{className:"grid-2-col gap-6",children:[e.jsxs("div",{className:"campus-box",children:[e.jsx("h3",{style:{fontSize:"1.5rem",color:"var(--primary-navy)",fontWeight:"700",marginBottom:"10px"},children:"1. Bank More Campus (Girls Wing)"}),e.jsx("p",{className:"rich-text-content",children:"The women’s wing of the College was started in the year 2000 in the Bank More Campus of the College in the morning hours. As an exclusive centre of teaching for girls, this wing has earned high reputation among stakeholders during the last few years. In the Women’s wing also, teaching is imparted for B.A./B.Com. (Hons/General) Course."})]}),e.jsxs("div",{className:"campus-box",children:[e.jsx("h3",{style:{fontSize:"1.5rem",color:"var(--primary-navy)",fontWeight:"700",marginBottom:"10px"},children:"2. Bhuda Campus (Boys Wing)"}),e.jsx("p",{className:"rich-text-content",children:"The main building – the Boys’ wing of the College is situated at Bhuda. The main building is spaciously designed in an airy surrounding quite suitable for the environment of an academic institution. The present campus has been so planned as to cater to the needs of the students for a long time."})]})]})]})]}),e.jsx("section",{className:"stats-grid stats-grid-override mb-16 anim-slide-up",style:{animationDelay:"0.7s"},children:[{label:"Years of Legacy",value:"50+",icon:"🏛️"},{label:"Expert Faculty",value:"120+",icon:"👨‍🏫"},{label:"Students",value:"5000+",icon:"🎓"},{label:"Courses",value:"30+",icon:"📚"}].map((i,o)=>e.jsxs("div",{className:"glass-card stat-card stat-card-small",children:[e.jsx("div",{className:"stat-icon",children:i.icon}),e.jsx("div",{className:"stat-value stat-value-small",children:i.value}),e.jsx("div",{className:"stat-label",children:i.label})]},o))})]}),e.jsxs("aside",{className:"profile-sidebar anim-slide-up",style:{animationDelay:"0.5s"},children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"Principal Message",path:"/about-us/principal-message"},{label:"Admission Rules",path:"/admission/rule"},{label:"Fee Structure",path:"/admission/fee-structure"},{label:"Departments",path:"/academics/course-offered"},{label:"NSS",path:"/activity/nss"},{label:"NCC",path:"/activity/ncc"},{label:"Sports",path:"/activity/games-sports"},{label:"Workshop",path:"/activity/workshop"},{label:"Syllabus",path:"/syllabus"},{label:"Academic Calendar",path:"/academics/academic-calendar"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((i,o)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(F,{to:i.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",i.label]})},o))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:"45px",marginBottom:"15px",position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 12px",fontSize:"19px",color:"#f4a023",position:"relative",zIndex:2},children:"Need Assistance?"}),e.jsx("p",{style:{fontSize:"14px",margin:"0 0 20px",color:"#e2e8f0",lineHeight:"1.6",position:"relative",zIndex:2},children:"Contact our administration office for any queries related to admission or academics."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call Helpdesk Now"})]}),e.jsxs("div",{style:{marginTop:"30px"},children:[e.jsxs("h4",{style:{fontSize:"17px",fontWeight:"700",color:"var(--primary-navy)",marginBottom:"20px",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("span",{children:"🌐"})," Connect With Us"]}),e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx("a",{href:"https://facebook.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"f"}),e.jsx("a",{href:"https://twitter.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"𝕏"}),e.jsx("a",{href:"https://instagram.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"📸"}),e.jsx("a",{href:"https://youtube.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"▶"})]})]})]})]})})]})),Oe=["/syllabus","/about-us","/about-us/vision-mission","/about-us/principal-message","/about-us/college-management/organogram","/about-us/college-management/presidents","/about-us/college-management/secretaries","/about-us/college-management/principal","/about-us/various-committees/womens-cell","/about-us/various-committees/anti-ragging","/about-us/various-committees/sc-st","/about-us/various-committees/obc","/about-us/various-committees/grievance","/about-us/various-committees/icc","/about-us/various-committees/minority","/about-us/various-committees/placement","/about-us/various-committees/rusa","/about-us/college-staff/teaching-staff","/about-us/college-staff/non-teaching-staff","/about-us/regulations/bbmku/special-ug-regulation","/about-us/regulations/bbmku/ug-regulation-fyugp","/about-us/regulations/bbmku/ug-regulation-cbcs","/about-us/regulations/college-affiliation","/about-us/regulations/ugc-section","/about-us/regulations/vbu/ug-regulation-2015","/about-us/regulations/vbu/bca-regulation","/about-us/regulations/byelaws","/about-us/regulations/exemption","/about-us/audit-report","/campus/visuals/bhuda","/campus/visuals/bank-more","/campus/visuals/vocational-building","/campus/infrastructure","/campus/classroom","/campus/ict-rooms","/campus/green-campus","/academics/iqac","/academics/course-offered","/academics/departments/humanities","/academics/departments/social-science","/academics/departments/commerce","/academics/departments/bca","/academics/departments/bba","/academics/academic-calendar","/admission/rule","/admission/document-required","/admission/fee-structure","/admission/notification/latest","/admission/notification/upcoming","/admission/intake-capacity","/activity/nss","/activity/ncc","/activity/workshop","/activity/games-sports","/activity/collaboration/rotaract-club","/activity/collaboration/sadbhavana-diwas","/naac/ssr-1st-cycle/cycle-1-documents","/naac/ssr-1st-cycle/peer-team-report","/naac/ssr-2nd-cycle/cycle-2-documents","/naac/ssr-2nd-cycle/executive-summary","/naac/aqar","/naac/nirf","/naac/perspective-plan","/publication/college-library","/publication/e-magazine","/publication/examination-results/2024","/publication/examination-results/2023","/publication/sss-report/2023-24","/publication/sss-report/2022-23","/gallery"],Vt=({pages:i})=>{const{slug:o}=kt(),[x,g]=r.useState(null);return r.useEffect(()=>{if(i&&o){const c=i.find(m=>m.slug===o);g(c)}},[o,i]),!i||i.length===0?e.jsx("div",{style:{padding:"40px 20px",textAlign:"center"},children:"Loading pages..."}):e.jsx(_e,{page:x})},Jt=({notices:i,announcements:o,events:x,gallery:g,pdfReports:c,pages:m,placeholderPaths:b,navLinks:y})=>{const[n,f]=r.useState(()=>localStorage.getItem("isGncAdmin")==="true");return n?e.jsx(Ft,{notices:i,announcements:o,events:x,gallery:g,pdfReports:c,pages:m,placeholderPaths:b,navLinks:y,onClose:()=>{f(!1),localStorage.removeItem("isGncAdmin"),window.close()}}):e.jsx(Xt,{onSuccess:()=>{f(!0),localStorage.setItem("isGncAdmin","true")},onClose:()=>window.close()})},Qt=i=>i&&new DOMParser().parseFromString(i,"text/html").body.textContent||"";function Zt(){const[i,o]=r.useState([]),[x,g]=r.useState([]),[c,m]=r.useState([]),[b,y]=r.useState([]),[n,f]=r.useState([]),[v,z]=r.useState([]),[B,p]=r.useState(null),S=Le(),[R,d]=r.useState(!0),[D,l]=r.useState(window.innerWidth<768),w=S.pathname.startsWith("/admin");r.useEffect(()=>{const C=()=>l(window.innerWidth<768);return window.addEventListener("resize",C),()=>window.removeEventListener("resize",C)},[]),r.useEffect(()=>{const C=setTimeout(()=>d(!1),2e3);return()=>clearTimeout(C)},[]),r.useEffect(()=>{jt.init({duration:800,easing:"ease-in-out",once:!1,mirror:!0,offset:50})},[]),r.useEffect(()=>{const C=Ie(P(A,"settings","navbar"),M=>{M.exists()&&M.data().links&&M.data().links.length>0?p(M.data().links):p(Ge)});return()=>C()},[]);const k=B||Ge,W=r.useMemo(()=>{const C=v.filter(j=>j.slug&&(!j.path||j.path==="")).sort((j,L)=>(L.createdAt?.toMillis()||0)-(j.createdAt?.toMillis()||0)).map(j=>({label:j.title,href:`/p/${j.slug}`})),M=JSON.parse(JSON.stringify(k));if(C.length>0){let j=M.find(L=>L.label.toLowerCase()==="more");j||(j={label:"More",href:"#",sub:[]},M.push(j)),j.sub||(j.sub=[]),C.forEach(L=>{j.sub.some(Q=>Q.href===L.href)||j.sub.push(L)})}return M},[v,k]),T=r.useMemo(()=>{const C=new Map;return[...v].sort((j,L)=>(L.createdAt?.toMillis()||0)-(j.createdAt?.toMillis()||0)).forEach(j=>{j.path&&!C.has(j.path)&&C.set(j.path,j)}),C},[v]);r.useEffect(()=>{const M=[["notices",o],["announcements",g],["events",m],["gallery",y],["pdfReports",f],["pages",z]].map(([j,L])=>{const Q=Fe(V(A,j),Et("createdAt","desc"));return Ie(Q,J=>{const ue=J.docs.map(q=>({id:q.id,...q.data()}));L(ue)})});return()=>M.forEach(j=>j())},[]);const E=()=>{window.open("#/admin","_blank")},he=[...i.slice(0,3),...x.slice(0,2)].map(C=>({...C,text:Qt(C.text||C.title)}));return e.jsxs(e.Fragment,{children:[e.jsx(wt,{position:"top-right",gutter:12,containerStyle:{top:20,right:20,zIndex:999999},toastOptions:{style:{background:"rgba(15, 35, 71, 0.85)",backdropFilter:"blur(12px)",color:"#fff",border:"1px solid rgba(255, 255, 255, 0.15)",boxShadow:"0 8px 32px 0 rgba(0, 0, 0, 0.3)",padding:"16px",borderRadius:"14px",fontSize:"15px",fontWeight:"600"},success:{icon:"✅",duration:3e3},error:{icon:"❌",duration:4e3}}}),e.jsxs("div",{className:`splash-screen ${R?"":"hide"}`,children:[e.jsx("img",{src:"/gncollege-website/images/logo.png",alt:"Guru Nanak College",className:"splash-logo"}),e.jsx("div",{className:"splash-text",children:"Loading Portal..."})]}),!w&&e.jsxs(e.Fragment,{children:[e.jsx(Ut,{}),e.jsx(Wt,{items:he}),e.jsx($t,{onAdminClick:E,navLinks:W}),e.jsx(Ht,{}),!D&&e.jsx(Yt,{})]}),e.jsx("div",{className:w?"":"page-transition",children:e.jsxs(Nt,{location:S,children:[e.jsx(oe,{path:"/",element:e.jsx(Bt,{notices:i,announcements:x,pdfReports:n,sliderSlides:It,events:c,gallery:b})}),e.jsx(oe,{path:"/contact",element:e.jsx(qt,{})}),e.jsx(oe,{path:"/about-us/college-profile",element:e.jsx(Kt,{})}),e.jsx(oe,{path:"/admin",element:e.jsx(Jt,{notices:i,announcements:x,events:c,gallery:b,pdfReports:n,pages:v,placeholderPaths:Oe,navLinks:k})}),e.jsx(oe,{path:"/p/:slug",element:e.jsx(Vt,{pages:v})}),Oe.map(C=>{const M=T.get(C);return e.jsx(oe,{path:C,element:e.jsx(_e,{page:M})},C)})]})},S.pathname),!w&&e.jsxs(e.Fragment,{children:[e.jsx(Gt,{}),e.jsx("button",{onClick:E,style:{position:"fixed",bottom:25,right:25,background:a.navy,color:"#fff",border:`3px solid ${a.gold}`,borderRadius:"50%",width:60,height:60,cursor:"pointer",zIndex:500},children:e.jsx("span",{style:{fontSize:18},children:"⚙️"})})]})]})}function ea(){const i=Le();return r.useEffect(()=>{"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.scrollTo(0,0)},[]),r.useEffect(()=>{const o=i.hash;if(o){const x=o.replace("#",""),g=document.getElementById(x);g&&g.scrollIntoView({behavior:"smooth"})}else window.scrollTo(0,0)},[i]),e.jsx(Zt,{})}vt.createRoot(document.getElementById("root")).render(e.jsx(yt.StrictMode,{children:e.jsx(St,{children:e.jsx(ea,{})})}));
