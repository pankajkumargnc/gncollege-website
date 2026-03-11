const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPanel-CZTC_5Zv.js","assets/react-B9mKIQH5.js","assets/jodit-react-CQyzVq-v.js","assets/jodit-CDy6uk5e.js","assets/jodit-BcTNBwNW.css","assets/dompurify-r8glNMJW.js","assets/html-react-parser-BjJRHc4P.js","assets/html-dom-parser-C9V9aTyI.js","assets/domhandler-C7h-c356.js","assets/domelementtype-CqltyNbl.js","assets/react-property-DkBHvQjb.js","assets/style-to-js-3xM98LKa.js","assets/style-to-object-Cg2xzs12.js","assets/inline-style-parser-BlqBsVO4.js","assets/@firebase-CnFuAgCz.js","assets/idb-BXWtuYvb.js","assets/react-hot-toast-Dhq_btiz.js","assets/goober-wofAfydu.js","assets/react-dom-D2vEXsJU.js","assets/scheduler-CWG1rEj-.js","assets/aos-B-Mw6r96.js","assets/aos-DvB2Xm2x.css","assets/firebase-DuM2HiM-.js","assets/react-router-D5LUbJ5D.js","assets/Ticker-D_a4DSEe.js"])))=>i.map(i=>d[i]);
import{a as n,j as e,R as Ie}from"./react-B9mKIQH5.js";import{r as Fe,R as $e}from"./react-dom-D2vEXsJU.js";import{A as Me}from"./aos-B-Mw6r96.js";import{F as Be}from"./react-hot-toast-Dhq_btiz.js";import{w as Le,x as Pe,y as Oe,z as _,A as K,B as X,D as P,G as pe,H as Ye}from"./@firebase-CnFuAgCz.js";import{g as Ge}from"./firebase-DuM2HiM-.js";import{L as Y,u as ue,R as He,a as U,b as Ue,H as _e}from"./react-router-D5LUbJ5D.js";import{p as be}from"./dompurify-r8glNMJW.js";import{p as Xe}from"./html-react-parser-BjJRHc4P.js";import"./scheduler-CWG1rEj-.js";import"./goober-wofAfydu.js";import"./idb-BXWtuYvb.js";import"./html-dom-parser-C9V9aTyI.js";import"./domhandler-C7h-c356.js";import"./domelementtype-CqltyNbl.js";import"./react-property-DkBHvQjb.js";import"./style-to-js-3xM98LKa.js";import"./style-to-object-Cg2xzs12.js";import"./inline-style-parser-BlqBsVO4.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))j(d);new MutationObserver(d=>{for(const f of d)if(f.type==="childList")for(const p of f.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&j(p)}).observe(document,{childList:!0,subtree:!0});function x(d){const f={};return d.integrity&&(f.integrity=d.integrity),d.referrerPolicy&&(f.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?f.credentials="include":d.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function j(d){if(d.ep)return;d.ep=!0;const f=x(d);fetch(d.href,f)}})();const qe="modulepreload",Ke=function(t){return"/gncollege-website/"+t},we={},De=function(s,x,j){let d=Promise.resolve();if(x&&x.length>0){let a=function(y){return Promise.all(y.map(h=>Promise.resolve(h).then(N=>({status:"fulfilled",value:N}),N=>({status:"rejected",reason:N}))))};document.getElementsByTagName("link");const p=document.querySelector("meta[property=csp-nonce]"),v=p?.nonce||p?.getAttribute("nonce");d=a(x.map(y=>{if(y=Ke(y),y in we)return;we[y]=!0;const h=y.endsWith(".css"),N=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${N}`))return;const w=document.createElement("link");if(w.rel=h?"stylesheet":qe,h||(w.as="script"),w.crossOrigin="",w.href=y,v&&w.setAttribute("nonce",v),document.head.appendChild(w),h)return new Promise((z,m)=>{w.addEventListener("load",z),w.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${y}`)))})}))}function f(p){const v=new Event("vite:preloadError",{cancelable:!0});if(v.payload=p,window.dispatchEvent(v),!v.defaultPrevented)throw p}return d.then(p=>{for(const v of p||[])v.status==="rejected"&&f(v.reason);return s().catch(f)})},ce=[{id:"facebook",label:"f",href:"https://facebook.com/gnc.dhanbad"},{id:"twitter",label:"t",href:"https://twitter.com/"},{id:"youtube",label:"y",href:"https://youtube.com/"},{id:"linkedin",label:"in",href:"https://linkedin.com/"}],Ve=[{name:"Class Rooms",emoji:"🏫"},{name:"Computer Lab",emoji:"💻"},{name:"Library",emoji:"📚"},{name:"Seminar Hall",emoji:"🎤"},{name:"Auditorium",emoji:"🎭"},{name:"Playground",emoji:"⚽"},{name:"Badminton Court",emoji:"🏸"},{name:"Gymnasium",emoji:"🏋️"},{name:"Digital Classrooms",emoji:"📱"},{name:"Cultural Dept.",emoji:"🎵"},{name:"Washroom (B)",emoji:"🚿"},{name:"Washroom (G)",emoji:"🚿"},{name:"Water Purifier",emoji:"💧"},{name:"Canteen",emoji:"🍽️"},{name:"Girls Common Room",emoji:"👩"},{name:"Online Lecture",emoji:"📡"}],ke=[{label:"Home",href:"/"},{label:"About Us",href:"/",sub:[{label:"College Profile",href:"/about-us/college-profile"},{label:"Vision & Mission",href:"/about-us/vision-mission"},{label:"Principal Message",href:"/about-us/principal-message"},{label:"College Management",sub:[{label:"Organogram",href:"/about-us/college-management/organogram"},{label:"Presidents",href:"/about-us/college-management/presidents"},{label:"Secretaries",href:"/about-us/college-management/secretaries"},{label:"Principal",href:"/about-us/college-management/principal"}]},{label:"Various Committees",sub:[{label:"Women's Cell",href:"/about-us/various-committees/womens-cell"},{label:"Anti Ragging",href:"/about-us/various-committees/anti-ragging"},{label:"SC/ST",href:"/about-us/various-committees/sc-st"},{label:"OBC",href:"/about-us/various-committees/obc"},{label:"Grievance",href:"/about-us/various-committees/grievance"},{label:"ICC",href:"/about-us/various-committees/icc"},{label:"Minority",href:"/about-us/various-committees/minority"},{label:"Placement",href:"/about-us/various-committees/placement"},{label:"RUSA",href:"/about-us/various-committees/rusa"}]},{label:"College Staff",sub:[{label:"Teaching Staff",href:"/about-us/college-staff/teaching-staff"},{label:"Non-Teaching Staff",href:"/about-us/college-staff/non-teaching-staff"}]},{label:"Regulations",sub:[{label:"B.B.M.K. University Dhanbad",sub:[{label:"Special UG Regulation (CBCS) Session 2020-23",href:"/about-us/regulations/bbmku/special-ug-regulation"},{label:"UG Regulation (FYUGP)",href:"/about-us/regulations/bbmku/ug-regulation-fyugp"},{label:"UG Regulation (CBCS)",href:"/about-us/regulations/bbmku/ug-regulation-cbcs"}]},{label:"College Affiliation Paper B.B.M.K.U.",href:"/about-us/regulations/college-affiliation"},{label:"UGC Under Section 2(f) & 12(B)",href:"/about-us/regulations/ugc-section"},{label:"V.B.U. Hazaribag",sub:[{label:"UG Regulation 2015",href:"/about-us/regulations/vbu/ug-regulation-2015"},{label:"BCA Regulation",href:"/about-us/regulations/vbu/bca-regulation"}]},{label:"ByeLaws",href:"/about-us/regulations/byelaws"},{label:"Exemption",href:"/about-us/regulations/exemption"}]},{label:"Audit Report",href:"/about-us/audit-report"}]},{label:"Campus",href:"/",sub:[{label:"Campus Visuals",sub:[{label:"Bhuda",href:"/campus/visuals/bhuda"},{label:"Bank More",href:"/campus/visuals/bank-more"},{label:"Vocational Building",href:"/campus/visuals/vocational-building"}]},{label:"Infrastructure",href:"/campus/infrastructure"},{label:"Classroom",href:"/campus/classroom"},{label:"ICT Rooms",href:"/campus/ict-rooms"},{label:"Green Campus",href:"/campus/green-campus"}]},{label:"Academics",href:"/",sub:[{label:"IQAC",href:"/academics/iqac"},{label:"Course Offered",href:"/academics/course-offered"},{label:"Departments",sub:[{label:"Humanities",href:"/academics/departments/humanities"},{label:"Social Science",href:"/academics/departments/social-science"},{label:"Commerce",href:"/academics/departments/commerce"},{label:"BCA",href:"/academics/departments/bca"},{label:"BBA",href:"/academics/departments/bba"}]},{label:"Syllabus",href:"/syllabus"},{label:"Academic Calendar",href:"/academics/academic-calendar"}]},{label:"Admission",href:"/",sub:[{label:"Admission Rule",href:"/admission/rule"},{label:"Document Required",href:"/admission/document-required"},{label:"Fee Structure",href:"/admission/fee-structure"},{label:"Notification",sub:[{label:"Latest",href:"/admission/notification/latest"},{label:"Upcoming News",href:"/admission/notification/upcoming"}]},{label:"Intake Capacity",href:"/admission/intake-capacity"}]},{label:"Activity",href:"/",sub:[{label:"NSS",href:"/activity/nss"},{label:"NCC",href:"/activity/ncc"},{label:"Workshop",href:"/activity/workshop"},{label:"Game & Sports",href:"/activity/games-sports"},{label:"Collaboration",sub:[{label:"Rotaract Club",href:"/activity/collaboration/rotaract-club"},{label:"Sadbhavana Diwas",href:"/activity/collaboration/sadbhavana-diwas"}]}]},{label:"NAAC",href:"/",sub:[{label:"SSR 1st Cycle",sub:[{label:"Cycle 1 Documents",href:"/naac/ssr-1st-cycle/cycle-1-documents"},{label:"Peer Team Report",href:"/naac/ssr-1st-cycle/peer-team-report"}]},{label:"SSR 2nd Cycle",sub:[{label:"Cycle 2 Documents",href:"/naac/ssr-2nd-cycle/cycle-2-documents"},{label:"Executive Summary",href:"/naac/ssr-2nd-cycle/executive-summary"}]},{label:"AQAR",href:"/naac/aqar"},{label:"NIRF",href:"/naac/nirf"},{label:"Perspective Plan",href:"/naac/perspective-plan"}]},{label:"Publication",href:"/",sub:[{label:"College Library",href:"/publication/college-library"},{label:"E-Magazine",href:"/publication/e-magazine"},{label:"Examination Results",sub:[{label:"Result 2024",href:"/publication/examination-results/2024"},{label:"Result 2023",href:"/publication/examination-results/2023"}]},{label:"SSS Report",sub:[{label:"Report 2023-24",href:"/publication/sss-report/2023-24"},{label:"Report 2022-23",href:"/publication/sss-report/2022-23"}]}]},{label:"Gallery",href:"/#gallery"},{label:"Contact Us",href:"/contact"}],Je={apiKey:"AIzaSyDeJWUUoU_MJ4ubpbfaLZemvnEr82LF5YA",authDomain:"gnc-college-web.firebaseapp.com",projectId:"gnc-college-web",storageBucket:"gnc-college-web.firebasestorage.app",messagingSenderId:"78901559372",appId:"1:78901559372:web:f76cb101f8aec2daadb4e9"},ye=Le(Je),O=Pe(ye);Oe(ye);Ge(ye);const g={navy:"#0f2347",navyDark:"#060e1c",gold:"#f4a023"},Qe=[{id:"f1",image:"images/slider_baisakhi.jpg",title:"BAISAKHI DI SHAAM Celebration",subtitle:"Celebrating culture and traditions"},{id:"f2",image:"images/slider_cricket.jpg",title:"Inter College BBMKU Cricket Winners",subtitle:"Celebrating sportsmanship and victory"},{id:"f3",image:"images/slider_ncc.jpg",title:'NCC "At Home Function" Participants',subtitle:"Dedicated NCC Cadets & Commanders"},{id:"f4",image:"images/slider_youth_winners.jpg",title:"BBMKU Youth Festival Champions",subtitle:"Winners of BBMKU Inter College Youth Festival - अंतर्नाद"},{id:"f5",image:"images/slider_seminar.jpg",title:"ICSSR Multidisciplinary National Seminar",subtitle:"G20: A Global Platform for Economic Development"}],Ze=({slides:t=[]})=>{const[s,x]=n.useState(0),j=n.useMemo(()=>!t||t.length===0?Qe:[...t].sort((a,y)=>(Number(a.order)||0)-(Number(y.order)||0)),[t]),d=j.length;n.useEffect(()=>{if(d<=1)return;const a=setInterval(()=>{x(y=>y===d-1?0:y+1)},5e3);return()=>clearInterval(a)},[d]),n.useEffect(()=>{x(0)},[d]);const f=()=>x(a=>a===d-1?0:a+1),p=()=>x(a=>a===0?d-1:a-1),v=a=>a?a.startsWith("http://")||a.startsWith("https://")?a:`/gncollege-website/${a.startsWith("/")?a.slice(1):a}`:"";return e.jsxs("div",{className:"slider",children:[d>1&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"arrow prev",onClick:p,children:"❮"}),e.jsx("div",{className:"arrow next",onClick:f,children:"❯"})]}),e.jsx("div",{className:"slider-dots",children:j.map((a,y)=>e.jsx("div",{className:`dot ${s===y?"current":""}`,onClick:()=>x(y)},y))}),j.map((a,y)=>e.jsx("div",{className:y===s?"slide current":"slide",children:y===s&&e.jsxs(e.Fragment,{children:[e.jsx("img",{src:v(a.image),alt:a.title,loading:y===0?"eager":"lazy",decoding:"async",className:"image",onError:h=>{h.target.style.opacity="0.2"}}),e.jsxs("div",{className:"content",children:[e.jsx("h2",{children:a.title}),e.jsx("p",{children:a.subtitle}),e.jsx("hr",{})]})]})},a.id||y)),e.jsx("style",{children:`
        @keyframes kenburns {
          0%   { transform: scale(1.05) translate(0, 0);   filter: brightness(0.9); }
          100% { transform: scale(1.15) translate(-1%,-1%); filter: brightness(1);   }
        }
        @keyframes contentFadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes grow-width {
          from { width: 0;    }
          to   { width: 80px; }
        }

        .slider {
          width: 100%; height: 60vh; min-height: 450px; max-height: 550px;
          position: relative; overflow: hidden; background-color: #0f2347;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .slide {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          opacity: 0; transform: scale(1.15);
          transition: opacity 1.5s cubic-bezier(0.33,1,0.68,1);
          will-change: opacity, transform;
        }
        .slide::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(15,35,71,0.6), transparent 60%);
          z-index: 1;
        }
        .slide.current { opacity: 1; transform: scale(1); transition-delay: 0.2s; }
        .image { width: 100%; height: 100%; object-fit: cover; object-position: center 20%; will-change: transform; }
        .slide.current .image { animation: kenburns 12s ease-out forwards; }

        .content {
          position: absolute; bottom: 0; left: 0; width: 100%;
          text-align: center; color: #fff;
          padding: 80px 20px 30px; z-index: 2;
        }
        .content h2 {
          font-size: 2.2rem; margin-bottom: 8px; font-weight: 800;
          letter-spacing: 0.5px; text-shadow: 0 2px 15px rgba(0,0,0,0.5);
          opacity: 0;
        }
        .content p {
          font-size: 1.2rem; margin-bottom: 18px; font-weight: 500;
          color: #e2e8f0; text-shadow: 1px 1px 5px rgba(0,0,0,0.5);
          opacity: 0;
        }
        .content hr {
          border: 2px solid #f4a023; width: 80px; margin: 0 auto;
          border-radius: 4px; opacity: 0;
        }
        .slide.current .content h2 { animation: contentFadeInUp 0.8s 0.4s both cubic-bezier(0.2,0.6,0.2,1); }
        .slide.current .content p  { animation: contentFadeInUp 0.8s 0.6s both cubic-bezier(0.2,0.6,0.2,1); }
        .slide.current .content hr { animation: grow-width   0.8s 0.8s both cubic-bezier(0.2,0.6,0.2,1); opacity: 1; }

        .arrow {
          position: absolute; top: 50%; transform: translateY(-50%) scale(0.8);
          width: 45px; height: 45px;
          background-color: rgba(15,35,71,0.3); color: #fff;
          font-size: 1.5rem; display: flex; justify-content: center; align-items: center;
          cursor: pointer; border-radius: 50%; z-index: 11;
          transition: all 0.3s; backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.1); opacity: 0;
        }
        .slider:hover .arrow { opacity: 1; transform: translateY(-50%) scale(1); }
        .arrow:hover {
          background-color: #f4a023; color: #000;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 0 15px rgba(244,160,35,0.4);
        }
        .prev { left: 30px; }
        .next { right: 30px; }

        .slider-dots {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 10px; z-index: 11;
        }
        .dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: rgba(255,255,255,0.4); cursor: pointer;
          transition: all 0.4s ease;
        }
        .dot.current {
          background: #f4a023; transform: scale(1.3);
          box-shadow: 0 0 10px rgba(244,160,35,0.5);
        }

        @media (max-width: 768px) {
          .slider  { height: 40vh; min-height: 300px; }
          .content { padding: 60px 15px 20px; }
          .content h2 { font-size: 1.5rem; }
          .content p  { font-size: 0.95rem; margin-bottom: 12px; }
          .arrow   { width: 35px; height: 35px; font-size: 1.2rem; }
          .prev { left: 10px; }
          .next { right: 10px; }
        }
        @media (max-width: 480px) {
          .slider  { height: 35vh; min-height: 260px; }
          .content h2 { font-size: 1.25rem; }
          .content p  { font-size: 0.85rem; }
        }
      `})]})},et=({items:t})=>{if(!t||t.length===0)return null;const s=[...t,...t];return e.jsxs("div",{className:"ticker-wrapper",children:[e.jsx("style",{children:`
        .ticker-wrapper {
          display: flex;
          align-items: center;
          background: #0f2347; /* Navy Background */
          color: #fff;
          padding: 12px 0; /* Sirf vertical padding */
          overflow: hidden;
          position: relative;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .ticker-label {
          background: ${g.gold};
          color: #0f2347;
          font-weight: 800;
          font-size: 12px;
          padding: 8px 20px;
          border-radius: 0 6px 6px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
          flex-shrink: 0;
          margin-right: 20px;
          z-index: 2;
          box-shadow: 5px 0 15px rgba(0,0,0,0.2);
        }
        .ticker-container {
          flex-grow: 1;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, white 10%, white 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 10%, white 95%, transparent);
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: scrollTicker 40s linear infinite;
        }
        .ticker-wrapper:hover .ticker-track {
          animation-play-state: paused;
        }
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 25px;
          font-size: 14px;
          color: #e2e8f0;
          white-space: nowrap;
        }
        .ticker-item a { color: #fff; text-decoration: none; font-weight: 600; transition: color 0.3s; }
        .ticker-item a:hover { color: ${g.gold}; }
        .ticker-item::before { content: '✦'; color: ${g.gold}; font-size: 10px; opacity: 0.7; }
        @keyframes scrollTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}),e.jsx("div",{className:"ticker-label",children:"Latest Updates"}),e.jsx("div",{className:"ticker-container",children:e.jsx("div",{className:"ticker-track",children:s.map((x,j)=>e.jsx("div",{className:"ticker-item",children:e.jsx("a",{href:x.link||"#",target:"_blank",rel:"noopener noreferrer",children:x.text})},j))})})]})},Se=({title:t,subtitle:s})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:32},children:[e.jsx("h2",{style:{fontSize:26,fontWeight:800,color:g.navy,marginBottom:6},children:t}),e.jsx("div",{style:{width:60,height:3,background:g.gold,margin:"0 auto 10px"}}),s&&e.jsx("p",{style:{color:"#666",fontSize:14},children:s})]}),tt=[{name:"B.C.A",icon:"💻",symbol:"展开",desc:"Bachelor of Computer Applications - Future of IT."},{name:"B.B.A",icon:"📈",symbol:"📊",desc:"Bachelor of Business Administration - Master the Market."},{name:"COMMERCE",icon:"💰",symbol:"📒",desc:"Expertise in Finance, Accounts, and Trade."},{name:"ARTS",icon:"🎨",symbol:"🎭",desc:"Exploring Humanity, Culture, and Social Science."}];function at(){return e.jsxs("div",{style:{padding:"40px 16px",background:"#f8f9fa"},children:[e.jsxs("section",{style:{marginBottom:"100px",padding:"0 20px"},children:[e.jsx(Se,{title:"Our Academic Departments",subtitle:"Excellence in specialized education for future leaders"}),e.jsx("style",{children:`
          .dept-container {
            display: grid;
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
            background: ${g.navyDark};
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
            background: ${g.gold};
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
          @media (max-width: 1024px) {
            .dept-container { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 600px) {
            .dept-container { grid-template-columns: 1fr; }
          }
        `}),e.jsx("div",{className:"dept-container",children:tt.map((t,s)=>e.jsxs("div",{className:"modern-dept-card",children:[e.jsx("div",{className:"dept-bg-symbol",children:t.symbol}),e.jsxs("div",{className:"dept-content",children:[e.jsx("div",{className:"dept-icon-box",children:t.icon}),e.jsx("h3",{style:{color:"#fff",fontSize:"20px",fontWeight:"800",marginBottom:"8px"},children:t.name}),e.jsx("p",{style:{color:"rgba(255,255,255,0.8)",fontSize:"12.5px",lineHeight:"1.5",margin:0},children:t.desc}),e.jsx("div",{style:{marginTop:"15px",color:g.gold,fontSize:"12px",fontWeight:"bold"},children:"EXPLORE PROGRAM →"})]})]},s))})]}),e.jsx("section",{style:{padding:"80px 20px",background:"#ffffff"},children:e.jsxs("div",{style:{maxWidth:1250,margin:"0 auto"},children:[e.jsx(Se,{title:"College Facilities",subtitle:"World-class infrastructure to support your academic excellence"}),e.jsx("style",{children:`
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
              top: 0; left: 0;
              width: 100%; height: 100%;
              background: linear-gradient(135deg, ${g.gold}20, transparent);
              opacity: 0;
              transition: 0.4s;
            }
            .facility-card:hover {
              transform: translateY(-10px) scale(1.02);
              background: #fff;
              border-color: ${g.gold};
              box-shadow: 0 15px 30px rgba(15,35,71,0.1);
            }
            .facility-card:hover::before { opacity: 1; }
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
              color: ${g.navy};
              text-transform: uppercase;
              letter-spacing: 0.5px;
              z-index: 2;
              transition: 0.3s;
            }
            .facility-card:hover .facility-text { color: ${g.gold}; }
            @media (min-width: 1200px) {
              .facility-container { grid-template-columns: repeat(8, 1fr); }
            }
          `}),e.jsx("div",{className:"facility-container",children:Ve.map((t,s)=>e.jsxs("div",{className:"facility-card",children:[e.jsx("div",{className:"facility-icon-wrap",children:t.emoji}),e.jsx("div",{className:"facility-text",children:t.name})]},s))})]})})]})}const le=({title:t,subtitle:s})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:40},children:[e.jsx("h2",{style:{fontSize:28,fontWeight:800,color:g.navy,marginBottom:8},children:t}),e.jsx("div",{style:{width:60,height:4,background:g.gold,margin:"0 auto 12px",borderRadius:2}}),s&&e.jsx("p",{style:{color:"#666",fontSize:15},children:s})]}),nt=({notices:t,announcements:s,pdfReports:x,upcomingEvents:j})=>{const d=n.useRef(null),f=n.useRef(null),p=n.useRef(null),v=n.useRef(null),a=n.useRef(null),y=n.useRef(null),h=n.useMemo(()=>[...t||[],...t||[]],[t]),N=n.useMemo(()=>{const i=(j||[]).map(c=>({...c,text:c.title,date:c.createdAt?.toDate?.()||c.date,type:c.type||"Event"})),r=(s||[]).map(c=>({...c,date:c.createdAt?.toDate?.()||c.date,type:c.type||"News"}));return[...i,...r].sort((c,l)=>(l.date||0)-(c.date||0))},[j,s]),w=n.useMemo(()=>[...N,...N],[N]),z=n.useMemo(()=>{const i=(x||[]).map(r=>({...r,text:r.title,date:r.createdAt?.toDate?.()||r.date,type:"Document"}));return[...i,...i]},[x]),m=(i,r)=>{const c=i.current;if(!c)return;let l=0;const o=()=>{l-=.6,l<-c.scrollHeight/2&&(l=0),c.style.transform=`translateY(${l}px)`,r.current=requestAnimationFrame(o)};r.current=requestAnimationFrame(o)},k=i=>{i.current&&(cancelAnimationFrame(i.current),i.current=null)};return n.useEffect(()=>{const i=d.current;if(!i)return;const r=()=>k(v),c=()=>m(d,v);return i.addEventListener("mouseenter",r),i.addEventListener("mouseleave",c),m(d,v),()=>{k(v),i.removeEventListener("mouseenter",r),i.removeEventListener("mouseleave",c)}},[h]),n.useEffect(()=>{const i=f.current;if(!i)return;const r=()=>k(a),c=()=>m(f,a);return i.addEventListener("mouseenter",r),i.addEventListener("mouseleave",c),m(f,a),()=>{k(a),i.removeEventListener("mouseenter",r),i.removeEventListener("mouseleave",c)}},[w]),n.useEffect(()=>{const i=p.current;if(!i)return;const r=()=>k(y),c=()=>m(p,y);return i.addEventListener("mouseenter",r),i.addEventListener("mouseleave",c),m(p,y),()=>{k(y),i.removeEventListener("mouseenter",r),i.removeEventListener("mouseleave",c)}},[z]),e.jsxs("section",{style:{padding:"90px 20px",background:"#f8fafc",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"300px",background:"linear-gradient(180deg,#f1f5f9 0%,rgba(248,250,252,0) 100%)",zIndex:0}}),e.jsxs("div",{style:{maxWidth:1350,margin:"0 auto",position:"relative",zIndex:1},children:[e.jsx(le,{title:"Notification & Announcements",subtitle:"Stay informed with the latest official updates and campus news"}),e.jsx("style",{children:`
          .notif-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 35px;
            margin-top: 40px;
          }
          .notif-card {
            background: #ffffff; border-radius: 24px; overflow: hidden;
            box-shadow: 0 20px 40px -10px rgba(15,23,42,0.08);
            border: 1px solid rgba(226,232,240,0.8);
            transition: transform 0.4s cubic-bezier(0.165,0.84,0.44,1), box-shadow 0.4s, border-color 0.4s;
            display: flex; flex-direction: column; height: 520px; position: relative;
          }
          .notif-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 30px 60px -12px rgba(15,23,42,0.15);
            border-color: rgba(244,160,35,0.3);
          }
          .header-notice { background: linear-gradient(135deg,#1e3a8a 0%,#0f172a 100%); }
          .header-news   { background: linear-gradient(135deg,#e11d48 0%,#9f1239 100%); }
          .header-docs   { background: linear-gradient(135deg,#059669 0%,#047857 100%); }
          .notif-header {
            padding: 25px; display: flex; align-items: center; gap: 15px;
            color: #fff; font-weight: 800; font-size: 1.15rem; letter-spacing: 0.5px;
            position: relative; overflow: hidden;
          }
          .notif-header::after {
            content:''; position:absolute; inset:0;
            background: linear-gradient(45deg,transparent 40%,rgba(255,255,255,0.1) 50%,transparent 60%);
            background-size: 200% 200%;
            animation: shine 4s infinite linear;
          }
          @keyframes shine { 0%{background-position:200% center;} 100%{background-position:-200% center;} }

          .notif-body {
            padding: 10px 20px; flex: 1; overflow-y: hidden;
            display: flex; flex-direction: column;
            mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
          }
          .notif-item {
            padding: 18px 15px; border-bottom: 1px dashed #e2e8f0;
            text-align: left; position: relative;
            transition: background 0.25s, padding-left 0.25s, box-shadow 0.25s;
            border-radius: 10px; margin-bottom: 4px;
          }
          .notif-item:hover {
            background: #f8fafc; padding-left: 22px;
            box-shadow: inset 4px 0 0 0 ${g.gold};
          }
          .notif-item:last-child { border-bottom: none; }
          .notif-meta {
            display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
            font-size: 0.7rem; color: #64748b; font-weight: 700;
            margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;
          }
          .cat-badge { padding: 3px 8px; border-radius: 6px; font-weight: 800; font-size: 0.65rem; background: #f1f5f9; }
          .rich-text-title { margin: 0 0 6px; font-size: 0.95rem; color: #0f172a; font-weight: 700; line-height: 1.5; }
          .rich-text-desc  { margin: 0 0 6px; font-size: 0.85rem; color: #475569; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

          .view-all-wrapper {
            padding: 18px 20px; background: #fff;
            border-top: 1px solid #f1f5f9; position: relative; z-index: 2;
          }
          .view-all-btn {
            display: block; width: 100%; padding: 13px;
            background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px;
            color: #334155; font-weight: 800; font-size: 0.85rem;
            cursor: pointer; transition: background 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s;
            text-align: center; text-transform: uppercase; letter-spacing: 1px; text-decoration: none;
          }
          .notif-card:hover .view-all-btn {
            background: ${g.navy}; color: #fff;
            border-color: ${g.navy}; box-shadow: 0 8px 20px rgba(15,23,42,0.2);
          }
          @keyframes pulse-red {
            0%   { box-shadow: 0 0 0 0 rgba(239,68,68,0.7); }
            70%  { box-shadow: 0 0 0 6px rgba(239,68,68,0); }
            100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
          }
          .new-badge-pulse {
            background: #ef4444; color: #fff; font-size: 0.6rem;
            padding: 2px 6px; border-radius: 4px;
            animation: pulse-red 2s infinite; font-weight: 900;
          }
          @media (max-width: 1100px) { .notif-grid { grid-template-columns: repeat(2,1fr); } }
          @media (max-width: 768px)  { .notif-grid { grid-template-columns: 1fr; gap: 20px; margin-top: 20px; } .notif-card { height: 420px; } }
        `}),e.jsxs("div",{className:"notif-grid",children:[e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-notice",children:[e.jsx("span",{style:{fontSize:26},children:"🔔"})," Official Notices"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:d,children:h.map((i,r)=>{const c=i.isNew&&i.date&&(new Date-new Date(i.date))/864e5<5;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",i.date?new Date(i.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#1e3a8a"},children:i.type||"Notice"}),c&&e.jsx("span",{className:"new-badge-pulse",children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:i.text}}),i.link&&e.jsx("a",{href:i.link,target:"_blank",rel:"noreferrer",style:{fontSize:"0.8rem",color:"#2563eb",fontWeight:800,textDecoration:"none",display:"flex",alignItems:"center",gap:5},children:"📎 View Attachment"})]},r)})})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx(Y,{to:"/notifications",className:"view-all-btn",children:"View All Notices"})})]}),e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-news",children:[e.jsx("span",{style:{fontSize:26},children:"📣"})," News & Events"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:f,children:w.map((i,r)=>{const c=i.isNew||!1||i.date&&(new Date-new Date(i.date))/864e5<5;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",i.date?new Date(i.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#e11d48"},children:i.type||"Update"}),c&&e.jsx("span",{className:"new-badge-pulse",children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:i.text||i.title}}),i.desc&&e.jsx("div",{className:"rich-text-desc",dangerouslySetInnerHTML:{__html:i.desc}}),i.link&&e.jsx("a",{href:i.link,target:"_blank",rel:"noreferrer",style:{fontSize:"0.8rem",color:"#e11d48",fontWeight:800,textDecoration:"none",display:"flex",alignItems:"center",gap:5},children:"🔗 Read More"})]},r)})})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx(Y,{to:"/news",className:"view-all-btn",children:"Explore News"})})]}),e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-docs",children:[e.jsx("span",{style:{fontSize:26},children:"📄"})," E-Documents"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:p,children:z.map((i,r)=>e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",i.date?new Date(i.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#059669"},children:i.type||"Document"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:i.text||i.title}}),i.link&&e.jsx("a",{href:i.link,target:"_blank",rel:"noreferrer",style:{fontSize:"0.8rem",color:"#059669",fontWeight:800,textDecoration:"none",display:"flex",alignItems:"center",gap:5},children:"⬇️ Download PDF"})]},r))})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx(Y,{to:"/documents",className:"view-all-btn",children:"Document Archive"})})]})]})]})]})},it="#0f2347",rt={tcs:"#0066cc",wipro:"#9b59b6",infosys:"#007dc1",accenture:"#a100ff",hcl:"#00b0ea",ibm:"#054ada",bank:"#27ae60",bsnl:"#d35400",sbi:"#2980b9",google:"#4285f4",amazon:"#ff9900",microsoft:"#00a4ef",flipkart:"#2874f0",zomato:"#e23744",byju:"#7b2ff7",cognizant:"#1a77c9",capgemini:"#0070c0"},ot=(t="")=>{const s=t.toLowerCase();for(const[x,j]of Object.entries(rt))if(s.includes(x))return j;return it},st=`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  .plc-root,.plc-root *,.plc-root *::before,.plc-root *::after{box-sizing:border-box;margin:0;padding:0;}
  .plc-root{padding:90px 0 70px;background:linear-gradient(160deg,#060e1c 0%,#0f2347 50%,#060e1c 100%);overflow:hidden;position:relative;font-family:'DM Sans',sans-serif;}

  .plc-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(244,160,35,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(244,160,35,.04) 1px,transparent 1px);background-size:48px 48px;}
  .plc-orb1{position:absolute;width:580px;height:580px;border-radius:50%;background:radial-gradient(circle,rgba(244,160,35,.07) 0%,transparent 65%);top:-180px;left:-160px;pointer-events:none;}
  .plc-orb2{position:absolute;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(15,35,71,.9) 0%,transparent 70%);bottom:-80px;right:-80px;pointer-events:none;}

  .plc-head{text-align:center;padding:0 20px 52px;position:relative;z-index:2;}
  .plc-pill{display:inline-flex;align-items:center;gap:8px;background:rgba(244,160,35,.1);border:1px solid rgba(244,160,35,.25);color:#f4a023;padding:7px 20px;border-radius:50px;font-size:10.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:18px;}
  .plc-dot{width:6px;height:6px;border-radius:50%;background:#f4a023;animation:plc-blink 2s infinite;}
  @keyframes plc-blink{0%,100%{opacity:1;}50%{opacity:.2;}}
  .plc-h2{font-family:'Syne',sans-serif;font-size:clamp(28px,4vw,44px);font-weight:800;color:#fff;letter-spacing:-1px;line-height:1.15;margin-bottom:12px;}
  .plc-h2 span{color:#f4a023;}
  .plc-sub{font-size:15px;color:rgba(255,255,255,.4);font-weight:300;}
  .plc-divider{width:56px;height:3px;margin:18px auto 0;border-radius:2px;background:linear-gradient(90deg,#f4a023,transparent);}

  .plc-stats{display:flex;justify-content:center;gap:40px;flex-wrap:wrap;margin-top:28px;}
  .plc-stat-num{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;color:#f4a023;}
  .plc-stat-lbl{font-size:11px;color:rgba(255,255,255,.3);letter-spacing:1px;text-transform:uppercase;margin-top:2px;}

  .plc-mask{overflow:hidden;mask:linear-gradient(90deg,transparent 0%,#fff 10%,#fff 90%,transparent 100%);-webkit-mask:linear-gradient(90deg,transparent 0%,#fff 10%,#fff 90%,transparent 100%);padding:16px 0 24px;position:relative;z-index:2;}
  .plc-track{display:flex;width:max-content;gap:22px;animation:plc-scroll 45s linear infinite;will-change:transform;}
  .plc-track:hover{animation-play-state:paused;}
  @keyframes plc-scroll{0%{transform:translateX(0);}100%{transform:translateX(-33.3333%);}}

  .plc-card{width:262px;flex-shrink:0;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:28px 22px 22px;text-align:center;cursor:default;transition:transform .35s cubic-bezier(.22,1,.36,1),background .3s,border-color .3s,box-shadow .3s;position:relative;overflow:hidden;}
  .plc-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(244,160,35,.07) 0%,transparent 60%);opacity:0;transition:opacity .3s;border-radius:20px;}
  .plc-card:hover{transform:translateY(-9px);background:rgba(255,255,255,.1);border-color:rgba(244,160,35,.4);box-shadow:0 24px 48px rgba(0,0,0,.4),0 0 0 1px rgba(244,160,35,.12);}
  .plc-card:hover::before{opacity:1;}

  .plc-photo-wrap{position:relative;width:82px;height:82px;margin:0 auto 18px;}
  .plc-photo{width:82px;height:82px;border-radius:50%;object-fit:cover;border:2.5px solid rgba(244,160,35,.4);box-shadow:0 8px 24px rgba(0,0,0,.35);transition:border-color .3s;}
  .plc-card:hover .plc-photo{border-color:#f4a023;}
  .plc-photo-wrap::after{content:'';position:absolute;inset:-4px;border-radius:50%;border:2px solid rgba(244,160,35,0);transition:all .35s;}
  .plc-card:hover .plc-photo-wrap::after{border-color:rgba(244,160,35,.25);inset:-7px;}
  .plc-badge{position:absolute;bottom:1px;right:1px;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;border:2px solid #0f2347;box-shadow:0 2px 8px rgba(0,0,0,.3);}

  .plc-name{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;color:#fff;margin-bottom:4px;line-height:1.3;}
  .plc-course{font-size:11px;color:rgba(255,255,255,.35);font-weight:500;letter-spacing:.3px;margin-bottom:6px;}
  .plc-batch{display:inline-block;background:rgba(244,160,35,.1);border:1px solid rgba(244,160,35,.2);color:#f4a023;font-size:10px;font-weight:700;padding:3px 12px;border-radius:50px;letter-spacing:.5px;margin-bottom:14px;}
  .plc-tag{display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:50px;font-size:12.5px;font-weight:700;color:#fff;border:1px solid transparent;transition:all .3s;}
  .plc-tag-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
  .plc-card:hover .plc-tag{transform:scale(1.05);box-shadow:0 4px 14px rgba(0,0,0,.3);}
  .plc-role{font-size:11px;color:rgba(255,255,255,.4);margin-top:7px;}
  .plc-pkg{margin-top:10px;font-size:12px;color:#f4a023;font-weight:700;display:flex;align-items:center;justify-content:center;gap:5px;opacity:.85;}

  .plc-foot{text-align:center;padding:10px 20px 0;position:relative;z-index:2;}
  .plc-foot-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.45);padding:10px 24px;border-radius:50px;font-size:12.5px;font-weight:600;}
  .plc-foot-badge b{color:#f4a023;font-weight:800;}

  .plc-empty{text-align:center;padding:60px 20px;color:rgba(255,255,255,.3);position:relative;z-index:2;}

  @media(max-width:768px){.plc-root{padding:64px 0 50px;}.plc-stats{gap:24px;}.plc-card{width:232px;padding:22px 16px 18px;}.plc-photo,.plc-photo-wrap{width:70px;height:70px;}}
  @media(max-width:480px){.plc-root{padding:50px 0 40px;}.plc-h2{font-size:24px;}.plc-card{width:210px;}.plc-stats{gap:14px;}.plc-stat-num{font-size:20px;}}
`,lt=n.memo(({p:t})=>{const s=ot(t.company||""),x="/gncollege-website/images/college_photo.jpg";return e.jsxs("div",{className:"plc-card",children:[e.jsxs("div",{className:"plc-photo-wrap",children:[e.jsx("img",{src:t.imageUrl||x,alt:t.name||"Alumni",className:"plc-photo",loading:"lazy",decoding:"async",onError:j=>{j.currentTarget.src=x}}),e.jsx("div",{className:"plc-badge",style:{background:s},children:"💼"})]}),e.jsx("div",{className:"plc-name",children:t.name}),t.course&&e.jsx("div",{className:"plc-course",children:t.course}),e.jsxs("div",{className:"plc-batch",children:["Batch ",t.year||"—"]}),e.jsxs("div",{className:"plc-tag",style:{background:`${s}22`,borderColor:`${s}44`},children:[e.jsx("span",{className:"plc-tag-dot",style:{background:s}}),t.company||"Industry"]}),t.role&&e.jsx("div",{className:"plc-role",children:t.role}),t.package&&e.jsxs("div",{className:"plc-pkg",children:["💰 ",t.package," LPA"]})]})});function dt(){const[t,s]=n.useState([]),[x,j]=n.useState(!0);if(n.useEffect(()=>{const a=_(X(O,"placements"),K("createdAt","desc"));return P(a,y=>{s(y.docs.map(h=>({id:h.id,...h.data()}))),j(!1)},()=>j(!1))},[]),x)return null;const d=[...new Set(t.map(a=>a.company).filter(Boolean))],f=t.map(a=>parseFloat(a.package)).filter(a=>!isNaN(a)),p=f.length?Math.max(...f):null,v=[...t,...t,...t];return e.jsxs("section",{className:"plc-root",children:[e.jsx("style",{children:st}),e.jsx("div",{className:"plc-grid"}),e.jsx("div",{className:"plc-orb1"}),e.jsx("div",{className:"plc-orb2"}),e.jsxs("div",{className:"plc-head",children:[e.jsxs("div",{className:"plc-pill",children:[e.jsx("div",{className:"plc-dot"}),"Our Alumni"]}),e.jsxs("h2",{className:"plc-h2",children:["🏆 Wall of ",e.jsx("span",{children:"Fame"})]}),e.jsx("p",{className:"plc-sub",children:"India's top companies mein apna career bana rahe hain GNC ke alumni"}),e.jsx("div",{className:"plc-divider"}),t.length>0&&e.jsxs("div",{className:"plc-stats",children:[e.jsxs("div",{className:"plc-stat",children:[e.jsxs("div",{className:"plc-stat-num",children:[t.length,"+"]}),e.jsx("div",{className:"plc-stat-lbl",children:"Placed Students"})]}),e.jsxs("div",{className:"plc-stat",children:[e.jsxs("div",{className:"plc-stat-num",children:[d.length,"+"]}),e.jsx("div",{className:"plc-stat-lbl",children:"Companies"})]}),p&&e.jsxs("div",{className:"plc-stat",children:[e.jsxs("div",{className:"plc-stat-num",children:[p," LPA"]}),e.jsx("div",{className:"plc-stat-lbl",children:"Highest Package"})]})]})]}),t.length===0?e.jsxs("div",{className:"plc-empty",children:[e.jsx("div",{style:{fontSize:42,marginBottom:14,opacity:.5},children:"🎓"}),e.jsx("div",{style:{fontSize:15,fontWeight:500},children:"Alumni stories loading soon"}),e.jsx("div",{style:{fontSize:13,marginTop:6,opacity:.6},children:"Admin Panel → Placements tab se data add karein"})]}):e.jsx("div",{className:"plc-mask",children:e.jsx("div",{className:"plc-track",children:v.map((a,y)=>e.jsx(lt,{p:a},`${a.id}-${y}`))})}),t.length>0&&e.jsx("div",{className:"plc-foot",children:e.jsxs("div",{className:"plc-foot-badge",children:["✨ ",e.jsx("b",{children:t.length})," success stories — aur badh rahi hain"]})})]})}const F=g.navy,H=g.gold,ct=g.navyDark,pt=(t="")=>t.includes("drive.google.com/file/d/")?`https://drive.google.com/file/d/${t.split("/d/")[1].split("/")[0]}/preview`:t,xt=t=>({SEMINAR:"/images/slider_seminar.jpg",WORKSHOP:"/images/slider_ncc.jpg",SPORTS:"/images/slider_cricket.jpg",CULTURAL:"/images/slider_baisakhi.jpg"})[t]||"/images/college_photo.jpg",gt=[{text:"B.A./B.Com. Semester 1 Admissions are now open for 2024-25 session.",link:"/admission/info"},{text:"Results for the Semester 6 internal examinations have been published.",link:"/results"},{text:"The college will remain closed on account of Holi from 24th to 26th March.",link:"#"}],ft=["All Moments","Seminars","Cultural Fest","Guest Visit","Campus","Departments","NSS Programs"],ht=[{name:"NAAC",url:"https://naac.gov.in",icon:"🏅"},{name:"UGC",url:"https://ugc.ac.in",icon:"📜"},{name:"INFLIBNET",url:"https://inflibnet.ac.in",icon:"📚"},{name:"NDL INDIA",url:"https://ndl.gov.in",icon:"🔬"},{name:"SWAYAM",url:"https://swayam.gov.in",icon:"🌐"},{name:"BBMK UNIV.",url:"https://bbmku.ac.in",icon:"🏛️"}],mt=[{label:"Students Enrolled",value:"4,000+",icon:"👨‍🎓"},{label:"Successful Alumni",value:"45,000+",icon:"🎓"},{label:"Expert Faculty",value:"50+",icon:"👨‍🏫"},{label:"Years of Legacy",value:"56",icon:"🏛️"}],ut=[{icon:"🛡️",title:"NAAC Accredited",desc:"Grade B Institution"},{icon:"👨‍🏫",title:"Expert Faculty",desc:"Highly Experienced"},{icon:"🔬",title:"Modern Labs",desc:"Tech-enabled Learning"},{icon:"🏅",title:"NSS & NCC",desc:"Character Building"}];function Ee(t={}){const{threshold:s=.12,rootMargin:x="0px 0px -60px 0px"}=t,j=n.useRef(null),[d,f]=n.useState(!1);return n.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){f(!0);return}const p=j.current;if(!p)return;const v=new IntersectionObserver(([a])=>{a.isIntersecting&&(f(!0),v.unobserve(p))},{threshold:s,rootMargin:x});return v.observe(p),()=>v.disconnect()},[s,x]),[j,d]}const bt=`
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
`,L=({children:t,variant:s="up",delay:x="",slow:j=!1,className:d="",style:f={},tag:p="div"})=>{const[v,a]=Ee();return e.jsx(p,{ref:v,className:`sa sa-${s}${j?" sa-slow":""}${x?` sa-${x}`:""}${a?" visible":""}${d?" "+d:""}`,style:f,children:t})},yt=`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;}

  .hp-watermark{position:fixed;inset:0;background-image:url(/gncollege-website/images/logo.png);background-repeat:repeat;background-size:320px;opacity:.025;z-index:-1;background-color:#f4f7f9;pointer-events:none;}

  /* quick pills */
  .hp-quick{background:#fff;border-top:1px solid #edf2f7;border-bottom:1px solid #edf2f7;padding:16px 20px;}
  .hp-quick-inner{max-width:1280px;margin:0 auto;display:flex;gap:12px;flex-wrap:wrap;justify-content:center;}
  .hp-pill{display:inline-flex;align-items:center;gap:8px;padding:11px 26px;border-radius:50px;font-size:14px;font-weight:700;text-decoration:none;transition:transform .22s,box-shadow .22s;font-family:'DM Sans',sans-serif;}
  .hp-pill:hover{transform:translateY(-3px);}

  /* about */
  .hp-about{background:#fff;padding:clamp(60px,8vw,100px) 20px;overflow:hidden;}
  .hp-about-inner{max-width:1250px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:56px;align-items:center;}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
  .hp-imgstack{position:relative;width:100%;height:420px;}
  .hp-img-main{width:90%;height:100%;object-fit:cover;border-radius:20px;box-shadow:20px 20px 0 ${H};position:relative;z-index:2;transition:transform .5s;}
  .hp-imgstack:hover .hp-img-main{transform:scale(1.02);}
  .hp-img-accent{position:absolute;bottom:-28px;right:0;background:${F};color:#fff;padding:22px 26px;border-radius:14px;z-index:3;box-shadow:0 10px 30px rgba(0,0,0,.2);animation:float 3s ease-in-out infinite;}
  .hp-at{font-family:'Syne',sans-serif;font-size:clamp(28px,4vw,38px);font-weight:800;color:${F};line-height:1.2;margin-bottom:8px;}
  .hp-at span{color:${H};}
  .hp-asub{color:${H};font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:22px;font-size:13px;}
  .hp-adesc{color:#555;line-height:1.8;font-size:15.5px;margin-bottom:28px;font-family:'DM Sans',sans-serif;}
  .hp-afeat-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:32px;}
  .hp-afeat{display:flex;gap:11px;align-items:flex-start;}
  .hp-afeat-t{font-weight:800;font-size:13.5px;color:${F};}
  .hp-afeat-d{font-size:12px;color:#888;}
  .hp-disc{background:${F};color:#fff;padding:14px 32px;border:none;border-radius:50px;font-weight:700;cursor:pointer;text-decoration:none;display:inline-block;font-size:14px;transition:background .3s,box-shadow .3s,transform .2s;box-shadow:0 5px 18px rgba(15,35,71,.25);}
  .hp-disc:hover{background:${H};color:${F};transform:translateY(-2px);box-shadow:0 8px 24px rgba(244,160,35,.35);}
  .hp-soc{width:38px;height:38px;border-radius:50%;background:#f0f2f5;display:flex;align-items:center;justify-content:center;color:${F};font-size:17px;text-decoration:none;transition:background .3s,transform .3s;}
  .hp-soc:hover{background:${F};color:${H};transform:rotate(360deg);}

  /* section divider */
  .hp-sec-divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(15,35,71,.08),transparent);margin:0;}

  /* events */
  .hp-events{padding:clamp(60px,8vw,80px) 20px;background:transparent;}
  .hp-ev-inner{max-width:1400px;margin:0 auto;}
  @keyframes hp-ev-scroll{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
  .hp-ev-scroller{overflow:hidden;padding:20px 0;margin-top:28px;mask:linear-gradient(90deg,transparent,#fff 5%,#fff 95%,transparent);-webkit-mask:linear-gradient(90deg,transparent,#fff 5%,#fff 95%,transparent);}
  .hp-ev-track{display:flex;width:max-content;gap:28px;animation:hp-ev-scroll 36s linear infinite;will-change:transform;}
  .hp-ev-track:hover{animation-play-state:paused;}
  .hp-ev-card{width:310px;flex-shrink:0;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.05);border:1px solid rgba(255,255,255,.5);transition:transform .35s,box-shadow .35s,border-color .35s;display:flex;flex-direction:column;}
  .hp-ev-card:hover{transform:translateY(-10px) scale(1.02);box-shadow:0 20px 40px rgba(15,35,71,.14);border-color:${H};}
  .hp-ev-imgbox{position:relative;height:190px;overflow:hidden;}
  .hp-ev-img{width:100%;height:100%;object-fit:cover;transition:transform .55s;}
  .hp-ev-card:hover .hp-ev-img{transform:scale(1.08);}
  .hp-ev-bdg{position:absolute;top:14px;right:14px;background:${H};color:#000;padding:4px 11px;font-size:9.5px;font-weight:800;border-radius:50px;text-transform:uppercase;z-index:2;letter-spacing:.5px;}
  .hp-ev-dt{position:absolute;bottom:0;left:0;background:${F};color:#fff;padding:8px 14px;border-top-right-radius:12px;z-index:2;}
  .hp-ev-info{padding:20px;flex:1;display:flex;flex-direction:column;}
  .hp-ev-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;color:${F};margin:0 0 9px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .hp-ev-desc{font-size:13px;color:#64748b;line-height:1.6;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
  .hp-ev-foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #f1f5f9;padding-top:12px;margin-top:14px;}
  .hp-ev-loc{font-size:11px;color:#94a3b8;font-weight:600;}
  .hp-ev-more{background:none;border:none;font-size:11px;color:${H};font-weight:800;cursor:pointer;transition:color .2s;padding:0;display:flex;align-items:center;gap:5px;}
  .hp-ev-more:hover{color:${F};}
  .hp-pdf-bdg{background:#fee2e2;color:#b91c1c;padding:2px 7px;border-radius:4px;font-size:9px;font-weight:800;}
  .hp-ev-empty{text-align:center;background:rgba(255,255,255,.7);padding:40px;border-radius:12px;border:1px dashed #e2e8f0;margin-top:28px;}

  /* counters */
  .hp-cnt{background:linear-gradient(135deg,${ct} 0%,${F} 100%);padding:clamp(60px,8vw,80px) 20px;position:relative;overflow:hidden;}
  .hp-cnt-bg{position:absolute;inset:0;opacity:.05;pointer-events:none;background-image:radial-gradient(#fff 1px,transparent 1px);background-size:30px 30px;}
  .hp-cnt-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:36px;text-align:center;position:relative;z-index:2;}
  .hp-cnt-box{padding:18px;transition:transform .35s,background .35s,box-shadow .35s;border-radius:14px;cursor:default;}
  .hp-cnt-box:hover{transform:translateY(-8px);background:rgba(255,255,255,.05);box-shadow:0 0 24px rgba(244,160,35,.12);}
  .hp-cnt-icon{font-size:46px;margin-bottom:14px;display:inline-block;filter:drop-shadow(0 0 10px rgba(244,160,35,.3));transition:transform .35s,filter .35s;}
  .hp-cnt-box:hover .hp-cnt-icon{transform:scale(1.2) rotate(10deg);filter:drop-shadow(0 0 20px rgba(244,160,35,.6));}
  .hp-cnt-num{font-family:'Syne',sans-serif;font-size:42px;font-weight:800;color:${H};line-height:1;margin-bottom:8px;}
  .hp-cnt-lbl{font-size:12.5px;color:#e2e8f0;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;}

  /* links */
  .hp-links{padding:clamp(60px,8vw,80px) 20px;background:transparent;}
  .hp-links-inner{max-width:1200px;margin:0 auto;}
  .hp-links-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:18px;margin-top:38px;}
  .hp-link-tile{background:rgba(255,255,255,.75);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.6);border-radius:12px;padding:24px 14px;text-align:center;text-decoration:none;transition:transform .3s,border-color .3s,box-shadow .3s,background .3s;display:flex;flex-direction:column;align-items:center;gap:10px;box-shadow:0 4px 10px rgba(0,0,0,.03);}
  .hp-link-tile:hover{transform:translateY(-7px) scale(1.03);border-color:${H};box-shadow:0 12px 28px rgba(15,35,71,.1);background:#fff;}
  .hp-link-icon{width:56px;height:56px;background:#f1f5f9;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;transition:background .3s,transform .3s;}
  .hp-link-tile:hover .hp-link-icon{background:${F};transform:rotate(15deg);}
  .hp-link-name{font-size:12.5px;font-weight:800;color:${F};letter-spacing:.4px;}

  /* gallery */
  .hp-gal{padding:clamp(70px,9vw,100px) 20px;background:#fff;}
  .hp-gal-inner{max-width:1300px;margin:0 auto;}
  .hp-gal-filters{display:flex;justify-content:center;gap:10px;margin-bottom:44px;flex-wrap:wrap;}
  .hp-filter{padding:9px 22px;border-radius:50px;border:2px solid #edf2f7;background:#fff;color:${F};font-weight:700;font-size:13px;cursor:pointer;transition:background .25s,color .25s,border-color .25s,transform .25s,box-shadow .25s;}
  .hp-filter:hover,.hp-filter.active{background:${F};color:#fff;border-color:${F};transform:translateY(-2px);box-shadow:0 5px 14px rgba(15,35,71,.2);}
  .hp-gal-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;}
  .hp-gal-item{position:relative;border-radius:14px;overflow:hidden;aspect-ratio:4/3;box-shadow:0 4px 14px rgba(0,0,0,.06);cursor:pointer;}
  .hp-gal-img{width:100%;height:100%;object-fit:cover;transition:transform .55s;}
  .hp-gal-item:hover .hp-gal-img{transform:scale(1.1);}
  .hp-gal-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(15,35,71,.88),transparent);opacity:0;transition:opacity .35s;display:flex;flex-direction:column;justify-content:flex-end;padding:18px;}
  .hp-gal-item:hover .hp-gal-ov{opacity:1;}
  .hp-gal-cat{color:${H};font-size:10px;font-weight:800;letter-spacing:.5px;transform:translateY(8px);opacity:0;transition:all .35s .05s;}
  .hp-gal-ttl{color:#fff;font-size:13.5px;font-weight:700;margin-top:4px;transform:translateY(8px);opacity:0;transition:all .35s .12s;}
  .hp-gal-item:hover .hp-gal-cat,.hp-gal-item:hover .hp-gal-ttl{transform:translateY(0);opacity:1;}
  .hp-gal-empty{grid-column:1/-1;text-align:center;background:#f8fafc;padding:48px 20px;border-radius:16px;border:1px dashed #cbd5e1;}

  /* youtube */
  .hp-yt{padding:clamp(60px,8vw,80px) 20px;background:#f8fafc;text-align:center;}
  .hp-yt-inner{max-width:1200px;margin:0 auto;}
  .hp-yt-h{font-family:'Syne',sans-serif;font-size:clamp(24px,3.5vw,36px);font-weight:800;color:${F};margin-bottom:10px;}
  .hp-yt-h span{color:${H};}
  .hp-yt-sub{color:#64748b;font-size:14px;margin-bottom:38px;}
  .hp-yt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;}
  .hp-yt-frame{border-radius:16px;border:none;box-shadow:0 10px 32px rgba(0,0,0,.1);width:100%;height:220px;}
  .hp-yt-ph{background:rgba(255,255,255,.8);border:1px dashed #cbd5e1;border-radius:16px;height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;}
  .hp-yt-ph-icon{font-size:34px;opacity:.35;}
  .hp-yt-ph-txt{color:#94a3b8;font-size:13px;}

  /* modal */
  .hp-modal-ov{position:fixed;inset:0;z-index:9999999;background:rgba(15,35,71,.95);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;}
  .hp-modal-box{background:#fff;width:90%;max-width:1000px;height:85vh;border-radius:20px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 30px 60px rgba(0,0,0,.5);}
  .hp-modal-head{padding:14px 22px;background:${F};color:#fff;display:flex;justify-content:space-between;align-items:center;font-family:'DM Sans',sans-serif;font-weight:800;}
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
`,vt=n.memo(({ev:t,onPdf:s})=>e.jsxs("div",{className:"hp-ev-card",children:[e.jsxs("div",{className:"hp-ev-imgbox",children:[e.jsx("div",{className:"hp-ev-bdg",children:t.type}),e.jsxs("div",{className:"hp-ev-dt",children:[e.jsx("div",{style:{fontSize:18,fontWeight:900,lineHeight:1},children:t.day||"--"}),e.jsx("div",{style:{fontSize:10,fontWeight:700},children:t.month||"---"})]}),e.jsx("img",{src:t.imageUrl||xt(t.type),alt:t.title,className:"hp-ev-img",loading:"lazy",decoding:"async"})]}),e.jsxs("div",{className:"hp-ev-info",children:[e.jsx("h3",{className:"hp-ev-title",children:t.title}),e.jsx("div",{className:"hp-ev-desc",dangerouslySetInnerHTML:{__html:t.desc}}),e.jsxs("div",{className:"hp-ev-foot",children:[e.jsxs("span",{className:"hp-ev-loc",children:["📍 ",t.location||"Campus"]}),e.jsx("button",{className:"hp-ev-more",onClick:()=>s(t),children:t.reportLink?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"hp-pdf-bdg",children:"PDF"})," READ REPORT →"]}):"READ MORE →"})]})]})]})),jt=n.memo(({img:t,index:s})=>{const[x,j]=Ee({threshold:.1,rootMargin:"0px 0px -40px 0px"}),d=s%6*.07;return e.jsxs("div",{ref:x,className:`hp-gal-item sa sa-scale${j?" visible":""}`,style:{transitionDelay:`${d}s`},children:[e.jsx("img",{src:t.src,alt:t.title,className:"hp-gal-img",loading:"lazy",decoding:"async"}),e.jsxs("div",{className:"hp-gal-ov",children:[e.jsx("div",{className:"hp-gal-cat",children:t.cat}),e.jsx("div",{className:"hp-gal-ttl",children:t.title})]})]})});function wt(){const[t,s]=n.useState(null),[x,j]=n.useState(!1);if(n.useEffect(()=>P(pe(O,"settings","youtube"),p=>{s(p.exists()?p.data():null),j(!0)},()=>j(!0)),[]),!x)return null;const d=t?.videoIds?t.videoIds.split(/[\n,]/).map(p=>p.trim()).filter(Boolean).slice(0,3):[],f=t?.channelName||"GNC College Official";return e.jsx("section",{className:"hp-yt",children:e.jsxs("div",{className:"hp-yt-inner",children:[e.jsx(L,{variant:"up",children:e.jsxs("h2",{className:"hp-yt-h",children:["🎬 Campus ",e.jsx("span",{children:"Video Highlights"})]})}),e.jsx(L,{variant:"fade",delay:"d1",children:e.jsxs("p",{className:"hp-yt-sub",children:["Official ",f," channel se latest videos"]})}),e.jsx("div",{className:"hp-yt-grid",children:d.length>0?d.map((p,v)=>e.jsx(L,{variant:"up",delay:`d${v+1}`,children:e.jsx("iframe",{className:"hp-yt-frame",src:`https://www.youtube.com/embed/${p}`,allowFullScreen:!0,title:p,loading:"lazy"})},p)):[1,2,3].map(p=>e.jsx(L,{variant:"up",delay:`d${p}`,children:e.jsxs("div",{className:"hp-yt-ph",children:[e.jsx("div",{className:"hp-yt-ph-icon",children:"▶️"}),e.jsxs("div",{className:"hp-yt-ph-txt",children:["Admin Panel → Settings → YouTube",e.jsx("br",{}),"mein Video IDs add karein"]})]})},p))})]})})}const Ne=({notices:t,announcements:s,pdfReports:x,sliderSlides:j,events:d,gallery:f})=>{const[p,v]=n.useState("All Moments"),[a,y]=n.useState(null),h=f||[],N=p==="All Moments"?h:h.filter(i=>i.cat===p),w=(d||[]).filter(i=>i.status==="recent"),z=(d||[]).filter(i=>i.status==="upcoming"),m=[...w,...w,...w],k=n.useCallback(i=>{i.reportLink?y(pt(i.reportLink)):alert("Full details coming soon!")},[]);return e.jsxs("div",{style:{fontFamily:"'DM Sans',sans-serif",background:"transparent",minHeight:"100vh",overflowX:"hidden"},children:[e.jsx("style",{children:bt+yt}),e.jsx("div",{className:"hp-watermark"}),e.jsx(Ze,{slides:j}),e.jsx(et,{items:gt}),e.jsx(nt,{notices:t,announcements:s,pdfReports:x,upcomingEvents:z}),e.jsx("div",{className:"hp-quick",children:e.jsx(L,{variant:"up",className:"hp-quick-inner",tag:"div",children:[{to:"/notifications",icon:"📢",label:"All Notices & News",bg:F,shadow:`${F}33`},{to:"/documents",icon:"📁",label:"All Documents",bg:"#16213e",shadow:"#16213e33"}].map((i,r)=>e.jsxs(Y,{to:i.to,className:`hp-pill sa sa-up sa-d${r+1} visible`,style:{background:i.bg,color:"#fff",boxShadow:`0 4px 14px ${i.shadow}`},onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{style:{fontSize:17},children:i.icon}),i.label,e.jsx("svg",{width:"13",height:"13",fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]},i.to))})}),e.jsx("section",{id:"about",className:"hp-about",children:e.jsxs("div",{className:"hp-about-inner",children:[e.jsx(L,{variant:"left",slow:!0,children:e.jsxs("div",{className:"hp-imgstack",children:[e.jsx("img",{src:"/gncollege-website/images/college_photo.jpg",alt:"Guru Nanak College",className:"hp-img-main",loading:"lazy",decoding:"async"}),e.jsxs("div",{className:"hp-img-accent",children:[e.jsx("div",{style:{fontSize:30,fontWeight:900,color:H,lineHeight:1},children:"56+"}),e.jsx("div",{style:{fontSize:11,opacity:.8,letterSpacing:1},children:"YEARS OF EXCELLENCE"})]})]})}),e.jsxs(L,{variant:"right",slow:!0,children:[e.jsxs("h2",{className:"hp-at",children:["About the ",e.jsx("span",{children:"College"})]}),e.jsx("div",{className:"hp-asub",children:"Established 1970"}),e.jsx("p",{className:"hp-adesc",children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru. We draw inspiration from the teachings of Guru Nanak Devji, fostering an environment of academic progress and individual development."}),e.jsx("div",{className:"hp-afeat-grid",children:ut.map(i=>e.jsxs("div",{className:"hp-afeat",children:[e.jsx("span",{style:{fontSize:19,marginTop:2},children:i.icon}),e.jsxs("div",{children:[e.jsx("div",{className:"hp-afeat-t",children:i.title}),e.jsx("div",{className:"hp-afeat-d",children:i.desc})]})]},i.title))}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:22,flexWrap:"wrap"},children:[e.jsx(Y,{to:"/about-us/college-profile",className:"hp-disc",children:"DISCOVER MORE →"}),e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:12,fontWeight:700,color:"#888"},children:"FOLLOW US:"}),ce.map(i=>e.jsx("a",{href:i.href,target:"_blank",rel:"noopener noreferrer",className:"hp-soc",children:i.id==="twitter"?"𝕏":i.id==="youtube"?"▶":i.label.charAt(0)},i.id))]})]})]})]})}),e.jsx("div",{className:"hp-sec-divider"}),e.jsx(at,{}),e.jsx("div",{className:"hp-sec-divider"}),e.jsx("section",{id:"events",className:"hp-events",children:e.jsxs("div",{className:"hp-ev-inner",children:[e.jsx(L,{variant:"up",children:e.jsx(le,{title:"Recent Events & Happenings",subtitle:"Seminars, workshops aur campus activities ki ek jhalak"})}),w.length>0?e.jsx(L,{variant:"fade",delay:"d1",children:e.jsx("div",{className:"hp-ev-scroller",children:e.jsx("div",{className:"hp-ev-track",children:m.map((i,r)=>e.jsx(vt,{ev:i,onPdf:k},`${i.id||r}-${r}`))})})}):e.jsx(L,{variant:"scale",children:e.jsxs("div",{className:"hp-ev-empty",children:[e.jsx("div",{style:{fontSize:38,marginBottom:10},children:"📅"}),e.jsx("h3",{style:{color:F,margin:"0 0 8px"},children:"No Recent Events"}),e.jsx("p",{style:{color:"#64748b",fontSize:13},children:"Admin Panel → Events se data add karein"})]})}),e.jsx(L,{variant:"right",delay:"d2",style:{display:"flex",justifyContent:"flex-end",marginTop:24},children:e.jsxs(Y,{to:"/events",style:{display:"inline-flex",alignItems:"center",gap:8,background:`linear-gradient(135deg,${H},#a07010)`,color:F,padding:"12px 28px",borderRadius:50,fontSize:14,fontWeight:900,textDecoration:"none",boxShadow:`0 4px 18px ${H}55`},children:["🏆 View All Events",e.jsx("svg",{width:"14",height:"14",fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})})]})}),e.jsx(dt,{}),e.jsxs("section",{className:"hp-cnt",children:[e.jsx("div",{className:"hp-cnt-bg"}),e.jsx("div",{className:"hp-cnt-grid",children:mt.map((i,r)=>e.jsx(L,{variant:"rise",delay:`d${r+1}`,children:e.jsxs("div",{className:"hp-cnt-box",children:[e.jsx("div",{className:"hp-cnt-icon",children:i.icon}),e.jsx("div",{className:"hp-cnt-num",children:i.value}),e.jsx("div",{className:"hp-cnt-lbl",children:i.label})]})},i.label))})]}),e.jsx("section",{className:"hp-links",children:e.jsxs("div",{className:"hp-links-inner",children:[e.jsx(L,{variant:"up",children:e.jsx(le,{title:"Important External Links",subtitle:"Official education and government portals ka quick access"})}),e.jsx("div",{className:"hp-links-grid",children:ht.map((i,r)=>e.jsx(L,{variant:"scale",delay:`d${r%4+1}`,children:e.jsxs("a",{href:i.url,target:"_blank",rel:"noopener noreferrer",className:"hp-link-tile",children:[e.jsx("div",{className:"hp-link-icon",children:i.icon}),e.jsx("div",{className:"hp-link-name",children:i.name})]})},i.name))})]})}),e.jsx("section",{id:"gallery",className:"hp-gal",children:e.jsxs("div",{className:"hp-gal-inner",children:[e.jsx(L,{variant:"up",children:e.jsx(le,{title:"📸 Photo Gallery",subtitle:"Academic excellence aur cultural heritage ki yadgar jhalak"})}),e.jsx(L,{variant:"fade",delay:"d1",children:e.jsx("div",{className:"hp-gal-filters",children:ft.map(i=>e.jsx("button",{className:`hp-filter ${p===i?"active":""}`,onClick:()=>v(i),children:i},i))})}),e.jsx("div",{className:"hp-gal-grid",children:N.length>0?N.map((i,r)=>e.jsx(jt,{img:i,index:r},r)):e.jsxs(L,{variant:"scale",className:"hp-gal-empty",children:[e.jsx("div",{style:{fontSize:32,marginBottom:10},children:"📸"}),e.jsx("h3",{style:{color:F,margin:"0 0 6px"},children:"Gallery Empty"}),e.jsx("p",{style:{color:"#64748b",fontSize:13},children:"Admin Panel → Gallery se photos upload karein"})]})})]})}),e.jsx(wt,{}),a&&Fe.createPortal(e.jsx("div",{className:"hp-modal-ov",onClick:()=>y(null),children:e.jsxs("div",{className:"hp-modal-box",onClick:i=>i.stopPropagation(),children:[e.jsxs("div",{className:"hp-modal-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{style:{fontSize:20},children:"📄"})," Official Event Report"]}),e.jsx("button",{className:"hp-modal-close",onClick:()=>y(null),children:"✕"})]}),e.jsx("div",{style:{flex:1,background:"#f1f5f9"},children:e.jsx("iframe",{src:a,title:"Event PDF",width:"100%",height:"100%",style:{border:"none"},allow:"autoplay"})})]})}),document.body)]})};function kt({onAdminClick:t,navLinks:s}){const[x,j]=n.useState(null),[d,f]=n.useState(null),[p,v]=n.useState(null),[a,y]=n.useState(window.innerWidth<1250),[h,N]=n.useState(!1),[w,z]=n.useState(!1);n.useEffect(()=>{const c=()=>{y(window.innerWidth<1250),window.innerWidth>=1250&&N(!1)},l=()=>{z(window.scrollY>40)};return window.addEventListener("resize",c),window.addEventListener("scroll",l),()=>{window.removeEventListener("resize",c),window.removeEventListener("scroll",l)}},[]);const m=c=>{x===c?(j(null),f(null),v(null)):(j(c),f(null),v(null))},k=c=>{d===c?(f(null),v(null)):(f(c),v(null))},i=c=>{v(p===c?null:c)},r=c=>c?c.startsWith("/#")?c.substring(2):c:"#";return e.jsxs("nav",{className:"glass-navbar",style:{position:"sticky",top:0,zIndex:99999,background:w?"rgba(255, 255, 255, 0.98)":"#ffffff",boxShadow:w?"0 10px 30px rgba(0, 0, 0, 0.15)":"0 4px 15px rgba(0,0,0,0.05)",backdropFilter:w?"blur(12px)":"none",WebkitBackdropFilter:w?"blur(12px)":"none",transition:"all 0.3s ease",width:"100%"},children:[e.jsx("style",{children:`
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
          background: linear-gradient(90deg, ${g.navy} 0%, #1e3a8a 30%, #d4af37 50%, #1e3a8a 70%, ${g.navy} 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shineText 5s linear infinite;
        }

        .clean-divider {
          border-left: 2.5px solid ${g.gold};
          border-radius: 2px;
        }
      `}),e.jsxs("div",{style:{width:"100%",maxWidth:"98%",margin:"0 auto",padding:"0 15px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:a?"5px":"20px"},children:[e.jsxs(Y,{to:"/",style:{display:"flex",alignItems:"center",padding:"8px 0",flexShrink:1,textDecoration:"none",gap:a?"8px":"15px",marginLeft:a?"0":"-20px",minWidth:0},children:[e.jsx("div",{className:"logo-box-container",style:{background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:a?"45px":"75px",height:a?"45px":"75px"},children:e.jsx("img",{className:"spinning-logo",src:"/gncollege-website/images/logo.png",alt:"Guru Nanak College Logo",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{className:"clean-divider",style:{display:"flex",flexDirection:"column",justifyContent:"center",paddingLeft:a?"8px":"15px",textAlign:"left",alignItems:"flex-start",overflow:"hidden"},children:[e.jsx("h1",{className:"shimmering-title",style:{margin:"0 0 5px 0",fontSize:a?"13px":"21.5px",fontWeight:"900",fontFamily:"Georgia, serif",whiteSpace:"nowrap",letterSpacing:a?"0px":"2.5px",textAlign:"left",lineHeight:"1.1"},children:"GURU NANAK COLLEGE, DHANBAD"}),!a&&e.jsx("p",{style:{margin:"0 0 3px 0",fontSize:"11px",color:"#475569",fontWeight:"700",whiteSpace:"nowrap",textAlign:"left"},children:"A Sikh Minority Degree College Established & Managed by Gurudwara Prabhandhak Committee, Dhanbad."}),e.jsx("p",{style:{margin:0,fontSize:a?"8.5px":"10.5px",color:g.gold,fontWeight:"800",letterSpacing:a?"0.2px":"1.8px",textTransform:"uppercase",whiteSpace:"nowrap",textAlign:"left"},children:a?"Est. 1970 | Dhanbad, Jharkhand":"Affiliated to Binod Bihari Mahto Koyalanchal University, Dhanbad."})]})]}),a&&e.jsx("button",{onClick:()=>N(!h),style:{background:"transparent",border:"none",color:g.navy,fontSize:28,cursor:"pointer",padding:"4px",flexShrink:0,zIndex:200},children:h?"✕":"☰"}),e.jsxs("div",{style:{display:a?h?"flex":"none":"flex",flexDirection:a?"column":"row",alignItems:a?"flex-start":"center",position:a?"absolute":"static",top:"100%",left:0,right:0,background:a?"rgba(255,255,255,0.98)":"transparent",padding:a?"10px 20px 20px":0,gap:a?10:0,boxShadow:a&&h?"0 10px 20px rgba(0,0,0,.15)":"none",maxHeight:a?"80vh":"auto",overflowY:a?"auto":"visible",flex:1,justifyContent:a?"flex-start":"flex-end",marginLeft:a?"0":"auto",marginRight:a?"0":"10px",borderTop:a&&h?"1px solid #eee":"none",zIndex:250},children:[s.map(c=>e.jsxs("div",{style:{position:"relative",width:a?"100%":"auto"},onMouseEnter:()=>!a&&j(c.label),onMouseLeave:()=>{a||(j(null),f(null),v(null))},children:[e.jsxs("div",{onClick:()=>a&&c.sub&&m(c.label),style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:a&&c.sub?"pointer":"default"},children:[e.jsxs(Y,{to:r(c.href),onClick:()=>{c.label==="Home"&&window.scrollTo(0,0)},style:{color:g.navy,padding:a?"12px 0":"24px 11px",display:"block",fontSize:13.5,fontWeight:700,whiteSpace:"nowrap",textDecoration:"none",transition:"all .2s",width:"100%"},children:[c.label==="Home"?"🏠 ":"",c.label]}),a&&c.sub&&e.jsx("span",{style:{color:g.navy,fontSize:20},children:x===c.label?"▴":"▾"}),!a&&c.sub&&e.jsx("span",{style:{color:g.navy,fontSize:11,marginLeft:2,marginRight:8,marginTop:2},children:"▾"})]}),c.sub&&x===c.label&&e.jsx("div",{style:{position:a?"static":"absolute",top:"100%",left:0,background:"#fff",minWidth:240,boxShadow:a?"none":"0 12px 30px rgba(0,0,0,.15)",borderTop:a?"none":"3px solid "+g.navy,borderRadius:a?8:"0 0 8px 8px",zIndex:200,padding:a?"5px 0":"8px 0"},children:c.sub.map(l=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!a&&f(l.label),onMouseLeave:()=>!a&&f(null),children:[e.jsxs("div",{onClick:o=>{a&&l.sub&&(o.stopPropagation(),k(l.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:a?"10px 16px":"10px 18px",borderBottom:a?"none":"1px solid #f8f9fa",cursor:a&&l.sub?"pointer":"default"},onMouseEnter:o=>{a||(o.currentTarget.style.background="#f4f6f9")},onMouseLeave:o=>{a||(o.currentTarget.style.background="transparent")},children:[e.jsx(Y,{to:r(l.href),style:{fontSize:13,fontWeight:600,color:g.navy,display:"block",width:"100%",textDecoration:"none"},children:l.label}),l.sub&&e.jsx("span",{style:{fontSize:12,color:g.gold,marginLeft:8},children:a?d===l.label?"▴":"▾":"▶"})]}),l.sub&&d===l.label&&e.jsx("div",{style:{position:a?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:240,boxShadow:a?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:a?"none":"3px solid "+g.gold,borderRadius:a?4:"0 8px 8px 8px",margin:a?"0 16px 10px":0,borderLeft:a?"2px solid "+g.gold:"none"},children:l.sub.map(o=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!a&&v(o.label),onMouseLeave:()=>!a&&v(null),children:[e.jsxs("div",{onClick:u=>{a&&o.sub&&(u.stopPropagation(),i(o.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderBottom:a?"none":"1px solid #f8f9fa",cursor:a&&o.sub?"pointer":"default"},onMouseEnter:u=>{a||(u.currentTarget.style.background="#f4f6f9")},onMouseLeave:u=>{a||(u.currentTarget.style.background="transparent")},children:[e.jsx(Y,{to:r(o.href),style:{fontSize:12.5,fontWeight:600,color:"#444",display:"block",width:"100%",textDecoration:"none"},children:o.label}),o.sub&&e.jsx("span",{style:{fontSize:11,color:g.gold,marginLeft:8},children:a?p===o.label?"▴":"▾":"▶"})]}),o.sub&&p===o.label&&e.jsx("div",{style:{position:a?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:240,boxShadow:a?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:a?"none":"3px solid "+g.navy,borderRadius:a?4:"0 8px 8px 8px",margin:a?"0 16px 10px":0,borderLeft:a?"2px solid "+g.navy:"none"},children:o.sub.map(u=>e.jsx(Y,{to:r(u.href),style:{display:"block",padding:"10px 16px",fontSize:12,color:"#555",borderBottom:a?"none":"1px solid #f8f9fa",textDecoration:"none"},onMouseEnter:S=>{a||(S.currentTarget.style.background="#f4f6f9")},onMouseLeave:S=>{a||(S.currentTarget.style.background="transparent")},children:u.label},u.label))})]},o.label))})]},l.label))})]},c.label)),e.jsxs("button",{onClick:t,style:{flexShrink:0,background:g.gold,color:"#000",border:"none",padding:"7px 18px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:800,marginLeft:a?0:10,marginTop:a?12:0,width:a?"100%":"auto",boxShadow:"0 4px 15px rgba(244,160,35,0.3)",whiteSpace:"nowrap",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",transition:"all 0.3s ease"},onMouseEnter:c=>c.currentTarget.style.transform="translateY(-2px)",onMouseLeave:c=>c.currentTarget.style.transform="translateY(0)",children:[e.jsx("span",{style:{fontSize:16},children:"⚙️"})," Admin Login"]})]})]})]})}const St=()=>e.jsxs("footer",{className:"premium-footer",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"footer-grid",children:[e.jsxs("div",{className:"footer-widget",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"18px",marginBottom:"25px"},children:[e.jsx("div",{style:{width:"75px",height:"75px",background:"rgba(255,255,255,0.95)",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",padding:"8px",boxShadow:"0 10px 25px rgba(0,0,0,0.5)"},children:e.jsx("img",{src:"/gncollege-website/images/logo.png",alt:"GNC Logo",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center"},children:[e.jsx("h2",{style:{fontSize:"1.4rem",fontWeight:"900",color:"#fff",margin:"0 0 2px 0",lineHeight:"1.1"},children:"GURU NANAK"}),e.jsx("h2",{style:{fontSize:"1.4rem",fontWeight:"900",color:"#f4a023",margin:0,lineHeight:"1.1"},children:"COLLEGE"}),e.jsx("p",{style:{fontSize:"0.75rem",color:"#94a3b8",margin:"6px 0 0",fontWeight:"700",letterSpacing:"1.5px"},children:"DHANBAD, JHARKHAND"})]})]}),e.jsx("p",{className:"footer-desc",children:"A Sikh Minority Degree College established in 1970. We are dedicated to providing premium quality education and fostering holistic development based on the core teachings of Guru Nanak Dev Ji."}),e.jsx("div",{style:{display:"flex",gap:"12px"},children:ce&&ce.map(t=>e.jsx("a",{href:t.href,target:"_blank",rel:"noreferrer",className:"social-btn","aria-label":t.label,children:t.id==="twitter"?"𝕏":t.id==="youtube"?"▶":t.id==="facebook"?"f":t.id==="instagram"?"in":t.label.charAt(0)},t.id))})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Quick Links"}),e.jsx("ul",{className:"footer-links",children:[{label:"Home",path:"/"},{label:"College Profile",path:"/about-us/college-profile"},{label:"Admission Rules",path:"/admission/rule"},{label:"Courses Offered",path:"/academics/course-offered"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((t,s)=>e.jsx("li",{className:"footer-link-item",children:e.jsxs(Y,{to:t.path,onClick:()=>window.scrollTo(0,0),className:"footer-link",children:[e.jsx("span",{children:"›"})," ",t.label]})},s))})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Get In Touch"}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"📍"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Main Campus"}),"Bhuda, Dhanbad,",e.jsx("br",{}),"Jharkhand - 826001, India"]})]}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"📞"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Phone Enquiries"}),e.jsx("a",{href:"tel:+917903340991",className:"contact-link",children:"+91 79033 40991"})]})]}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"✉️"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Email Us"}),e.jsx("a",{href:"mailto:principal@gncollege.org",className:"contact-link",children:"principal@gncollege.org"})]})]})]}),e.jsx("button",{className:"newsletter-btn",onClick:()=>alert("Newsletter coming soon!"),children:"Subscribe"})]}),e.jsx("div",{className:"footer-bottom",children:e.jsxs("div",{className:"footer-bottom-content",children:[e.jsxs("p",{className:"footer-copyright",children:["© ",new Date().getFullYear()," ",e.jsx("span",{style:{color:"#f4a023",fontWeight:"800"},children:"Guru Nanak College, Dhanbad"}),". All Rights Reserved."]}),e.jsx("p",{className:"footer-dev",children:"Designed & Developed dynamically with ❤️ By Pankaj Kumar"})]})})]}),Nt=()=>{const t={id:"whatsapp",label:"W",href:"https://wa.me/917903340991"};return e.jsxs("div",{className:"top-bar-container",style:{background:`linear-gradient(to right, ${g.navyDark}, #0a1832)`,color:"#e2e8f0",padding:"10px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:13,fontWeight:500,letterSpacing:"0.4px",borderBottom:`1px solid ${g.gold}20`},children:[e.jsx("style",{children:`
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
            transform: scale(1.05);
          }
          .social-icon {
            width: 30px;
            height: 30px;
            background: rgba(255,255,255,0.05);
            border-radius: 8px; /* Thoda modern look */
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
            color: #fff;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255,255,255,0.1);
          }
          .social-icon:hover {
            background: #f4a023; /* Gold BG */
            color: #0f2347; /* Navy Dark Icon */
            transform: translateY(-3px);
            box-shadow: 0 8px 15px rgba(244,160,35,0.3); /* Gold Glow */
          }
          /* WhatsApp ke liye alag style */
          .social-icon.whatsapp-icon:hover {
            background: #25D366; /* Green BG */
            color: #fff;
            box-shadow: 0 8px 15px rgba(37, 211, 102, 0.3); /* Green Glow */
          }
          /* 🌟 NEW: Natural Brand Colors on Hover 🌟 */
          .social-icon-facebook:hover {
            background: #1877F2;
            color: #fff;
            box-shadow: 0 8px 15px rgba(24, 119, 242, 0.3);
          }
          .social-icon-youtube:hover {
            background: #FF0000;
            color: #fff;
            box-shadow: 0 8px 15px rgba(255, 0, 0, 0.3);
          }
          .social-icon-linkedin:hover {
            background: #0A66C2;
            color: #fff;
            box-shadow: 0 8px 15px rgba(10, 102, 194, 0.3);
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
        `}),e.jsxs("div",{className:"contact-group",children:[e.jsxs("a",{href:"tel:+917903340991",className:"top-bar-link",children:[e.jsx("span",{style:{fontSize:"15px",color:g.gold},children:"📞"})," +91-7903340991"]}),e.jsxs("a",{href:"mailto:principal@gncollege.org",className:"top-bar-link",children:[e.jsx("span",{style:{fontSize:"15px",color:g.gold},children:"✉️"})," principal@gncollege.org"]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[ce.map(s=>{let x=s.label;return s.id==="twitter"&&(x="𝕏"),s.id==="youtube"&&(x="▶"),e.jsx("a",{href:s.href,"aria-label":s.id,target:"_blank",rel:"noopener noreferrer",className:`social-icon social-icon-${s.id}`,children:x},s.id)}),e.jsx("a",{href:t.href,"aria-label":t.id,target:"_blank",rel:"noopener noreferrer",className:"social-icon whatsapp-icon",children:t.label},t.id)]})]})},xe="#0f2347",Z="#f4a023",ge="#c97e10";function zt({onSuccess:t,onClose:s}){const[x,j]=n.useState(""),[d,f]=n.useState(""),[p,v]=n.useState(""),[a,y]=n.useState(!1),[h,N]=n.useState(!1),[w,z]=n.useState("idle"),[m,k]=n.useState(!1),[i,r]=n.useState(!1),[c,l]=n.useState(!1),[o,u]=n.useState(0),[S,D]=n.useState(!1),b=n.useRef(null),I=n.useRef(null);n.useEffect(()=>{setTimeout(()=>D(!0),50)},[]),n.useEffect(()=>{if(!a)return;const A=setInterval(()=>u($=>($+1)%4),350);return()=>clearInterval(A)},[a]),n.useEffect(()=>{const A=b.current;if(!A)return;const $=A.getContext("2d");let te=A.width=A.offsetWidth,W=A.height=A.offsetHeight;const T=Array.from({length:55},()=>({x:Math.random()*te,y:Math.random()*W,r:Math.random()*1.4+.3,dx:(Math.random()-.5)*.35,dy:(Math.random()-.5)*.35,o:Math.random()*.45+.1})),E=()=>{$.clearRect(0,0,te,W),T.forEach(R=>{R.x+=R.dx,R.y+=R.dy,(R.x<0||R.x>te)&&(R.dx*=-1),(R.y<0||R.y>W)&&(R.dy*=-1),$.beginPath(),$.arc(R.x,R.y,R.r,0,Math.PI*2),$.fillStyle=`rgba(244,160,35,${R.o})`,$.fill()});for(let R=0;R<T.length;R++)for(let G=R+1;G<T.length;G++){const J=T[R].x-T[G].x,ve=T[R].y-T[G].y,je=Math.sqrt(J*J+ve*ve);je<90&&($.beginPath(),$.moveTo(T[R].x,T[R].y),$.lineTo(T[G].x,T[G].y),$.strokeStyle=`rgba(244,160,35,${.07*(1-je/90)})`,$.lineWidth=.5,$.stroke())}I.current=requestAnimationFrame(E)};E();const M=()=>{te=A.width=A.offsetWidth,W=A.height=A.offsetHeight};return window.addEventListener("resize",M),()=>{cancelAnimationFrame(I.current),window.removeEventListener("resize",M)}},[]);const C=A=>{A.key==="CapsLock"&&k(A.getModifierState("CapsLock"))},B=A=>{A.key==="CapsLock"&&k(A.getModifierState("CapsLock"))},q=A=>{if(A.preventDefault(),!x.trim()||!d.trim()){v("Please fill in all fields.");return}v(""),y(!0),z("checking"),setTimeout(()=>{x==="admin"&&d==="admin123"?(z("success"),setTimeout(()=>t(),1e3)):(z("fail"),v("Invalid credentials. Please try again."),y(!1),setTimeout(()=>z("idle"),600))},1400)},Q=`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');

    .gnc-login-root *, .gnc-login-root *::before, .gnc-login-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .gnc-login-root {
      position: fixed; inset: 0; z-index: 100000;
      display: flex; align-items: center; justify-content: center;
      font-family: 'DM Sans', sans-serif;
      overflow: hidden;
    }

    /* ── BACKGROUND ── */
    .gnc-bg {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 20% 50%, #0a1628 0%, #060e1c 60%, #030810 100%);
    }
    .gnc-bg canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
    .gnc-bg-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(244,160,35,.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(244,160,35,.03) 1px, transparent 1px);
      background-size: 44px 44px;
    }
    .gnc-bg-glow1 {
      position: absolute; width: 500px; height: 500px; border-radius: 50%;
      background: radial-gradient(circle, rgba(244,160,35,.07) 0%, transparent 70%);
      top: -150px; left: -100px; pointer-events: none;
    }
    .gnc-bg-glow2 {
      position: absolute; width: 400px; height: 400px; border-radius: 50%;
      background: radial-gradient(circle, rgba(15,35,71,.5) 0%, transparent 70%);
      bottom: -100px; right: -80px; pointer-events: none;
    }

    /* ── WRAPPER ── */
    .gnc-wrap {
      position: relative; z-index: 1;
      display: flex; width: 860px; max-width: 95vw;
      border-radius: 24px; overflow: hidden;
      box-shadow: 0 40px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(244,160,35,.12);
      opacity: 0; transform: translateY(28px) scale(0.97);
      transition: opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);
    }
    .gnc-wrap.show { opacity: 1; transform: translateY(0) scale(1); }

    /* ── LEFT PANEL ── */
    .gnc-left {
      width: 42%; background: ${xe};
      padding: 48px 40px;
      display: flex; flex-direction: column; justify-content: space-between;
      position: relative; overflow: hidden;
      border-right: 1px solid rgba(244,160,35,.12);
    }
    .gnc-left-pattern {
      position: absolute; inset: 0; pointer-events: none;
      background-image: repeating-linear-gradient(
        45deg, rgba(244,160,35,.03) 0px, rgba(244,160,35,.03) 1px,
        transparent 1px, transparent 22px
      );
    }
    .gnc-left-circle1 {
      position: absolute; width: 260px; height: 260px; border-radius: 50%;
      border: 1px solid rgba(244,160,35,.07);
      bottom: -80px; right: -80px; pointer-events: none;
    }
    .gnc-left-circle2 {
      position: absolute; width: 180px; height: 180px; border-radius: 50%;
      border: 1px solid rgba(244,160,35,.05);
      bottom: -30px; right: -30px; pointer-events: none;
    }
    .gnc-badge {
      display: inline-flex; align-items: center; gap: 7px;
      background: rgba(244,160,35,.1); border: 1px solid rgba(244,160,35,.2);
      border-radius: 6px; padding: 6px 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; font-weight: 600; color: ${Z};
      letter-spacing: 1.5px; text-transform: uppercase;
      width: fit-content;
    }
    .gnc-badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: ${Z}; animation: blink 2s infinite;
    }
    @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.2;} }

    .gnc-logo-wrap {
      display: flex; align-items: center; gap: 16px; margin: 36px 0 20px;
    }
    .gnc-logo-icon {
      width: 58px; height: 58px; border-radius: 16px; flex-shrink: 0;
      background: linear-gradient(135deg, ${Z} 0%, ${ge} 100%);
      display: flex; align-items: center; justify-content: center;
      font-size: 26px;
      box-shadow: 0 8px 24px rgba(244,160,35,.3);
    }
    .gnc-college-name {
      font-family: 'Syne', sans-serif;
      font-size: 19px; font-weight: 800;
      color: #fff; line-height: 1.2; letter-spacing: -.3px;
    }
    .gnc-college-sub {
      font-size: 11px; color: rgba(255,255,255,.35);
      font-weight: 400; margin-top: 4px; line-height: 1.5;
    }

    .gnc-left-title {
      font-family: 'Syne', sans-serif;
      font-size: 28px; font-weight: 800; color: #fff;
      line-height: 1.25; letter-spacing: -.5px; margin-bottom: 14px;
    }
    .gnc-left-title span { color: ${Z}; }
    .gnc-left-desc {
      font-size: 13px; color: rgba(255,255,255,.4);
      line-height: 1.7; font-weight: 300;
    }

    .gnc-features { margin-top: 32px; display: flex; flex-direction: column; gap: 12px; }
    .gnc-feature {
      display: flex; align-items: center; gap: 12px;
      font-size: 12.5px; color: rgba(255,255,255,.5); font-weight: 400;
    }
    .gnc-feature-icon {
      width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
      background: rgba(244,160,35,.08); border: 1px solid rgba(244,160,35,.12);
      display: flex; align-items: center; justify-content: center; font-size: 13px;
    }

    .gnc-left-footer {
      font-size: 11px; color: rgba(255,255,255,.2);
      font-family: 'JetBrains Mono', monospace;
    }

    /* ── RIGHT PANEL ── */
    .gnc-right {
      flex: 1; background: #080f1e;
      padding: 48px 44px;
      display: flex; flex-direction: column; justify-content: center;
      position: relative;
    }
    .gnc-close {
      position: absolute; top: 20px; right: 20px;
      width: 34px; height: 34px; border-radius: 9px;
      background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07);
      color: rgba(255,255,255,.3); font-size: 14px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all .2s;
    }
    .gnc-close:hover { background: rgba(239,68,68,.15); border-color: rgba(239,68,68,.3); color: #ef4444; }

    .gnc-right-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; font-weight: 600; color: ${Z};
      letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;
      opacity: .7;
    }
    .gnc-right-title {
      font-family: 'Syne', sans-serif;
      font-size: 26px; font-weight: 800; color: #fff;
      letter-spacing: -.4px; margin-bottom: 6px;
    }
    .gnc-right-sub {
      font-size: 13px; color: rgba(255,255,255,.3);
      margin-bottom: 36px; font-weight: 300;
    }

    /* ── INPUT GROUP ── */
    .gnc-field { margin-bottom: 20px; }
    .gnc-field-label {
      display: flex; align-items: center; justify-content: space-between;
      font-size: 11px; font-weight: 600; color: rgba(255,255,255,.4);
      text-transform: uppercase; letter-spacing: .8px; margin-bottom: 9px;
    }
    .gnc-input-wrap {
      position: relative;
      border-radius: 12px; overflow: hidden;
      transition: all .2s;
    }
    .gnc-input-wrap::before {
      content: '';
      position: absolute; inset: 0;
      border-radius: 12px;
      border: 1.5px solid rgba(255,255,255,.07);
      pointer-events: none; z-index: 2;
      transition: border-color .2s;
    }
    .gnc-input-wrap.focused::before { border-color: rgba(244,160,35,.45); }
    .gnc-input-wrap.focused { box-shadow: 0 0 0 3px rgba(244,160,35,.08); }

    .gnc-input-icon {
      position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
      font-size: 15px; z-index: 3; opacity: .35; pointer-events: none;
      transition: opacity .2s;
    }
    .gnc-input-wrap.focused .gnc-input-icon { opacity: .7; }

    .gnc-input {
      width: 100%; padding: 14px 46px;
      background: rgba(255,255,255,.04);
      border: none; outline: none;
      font-size: 14.5px; font-weight: 400;
      color: #fff; font-family: 'DM Sans', sans-serif;
      border-radius: 12px;
      transition: background .2s;
    }
    .gnc-input:focus { background: rgba(255,255,255,.07); }
    .gnc-input::placeholder { color: rgba(255,255,255,.18); }
    .gnc-input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 100px #0d1929 inset !important;
      -webkit-text-fill-color: #fff !important;
    }

    .gnc-eye-btn {
      position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer;
      font-size: 14px; color: rgba(255,255,255,.25); z-index: 3;
      transition: color .2s; padding: 4px;
    }
    .gnc-eye-btn:hover { color: rgba(255,255,255,.6); }

    .gnc-caps {
      font-size: 10.5px; color: #f59e0b; font-weight: 600;
      display: flex; align-items: center; gap: 4px;
    }

    /* ── ERROR ── */
    .gnc-error {
      display: flex; align-items: center; gap: 10px;
      background: rgba(239,68,68,.08); border: 1px solid rgba(239,68,68,.2);
      border-radius: 10px; padding: 11px 14px;
      font-size: 13px; color: #fca5a5; font-weight: 500;
      margin-bottom: 20px;
      animation: shake .4s cubic-bezier(.36,.07,.19,.97) both;
    }
    @keyframes shake {
      10%,90%{transform:translateX(-2px);}
      20%,80%{transform:translateX(3px);}
      30%,50%,70%{transform:translateX(-4px);}
      40%,60%{transform:translateX(4px);}
    }

    /* ── SUBMIT BUTTON ── */
    .gnc-btn {
      width: 100%; padding: 15px;
      background: linear-gradient(135deg, ${Z} 0%, ${ge} 100%);
      border: none; border-radius: 12px;
      font-family: 'Syne', sans-serif;
      font-size: 15px; font-weight: 700;
      color: ${xe}; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      transition: all .25s; position: relative; overflow: hidden;
      box-shadow: 0 6px 24px rgba(244,160,35,.25);
      letter-spacing: .2px;
    }
    .gnc-btn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,.15) 0%, transparent 60%);
      pointer-events: none;
    }
    .gnc-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(244,160,35,.4);
    }
    .gnc-btn:active:not(:disabled) { transform: translateY(0); }
    .gnc-btn:disabled { opacity: .75; cursor: not-allowed; transform: none !important; }

    .gnc-btn.success-btn {
      background: linear-gradient(135deg, #10b981, #059669) !important;
      box-shadow: 0 8px 24px rgba(16,185,129,.35) !important;
    }
    .gnc-btn.fail-btn {
      background: linear-gradient(135deg, #ef4444, #dc2626) !important;
      animation: shake .4s ease both;
    }

    /* ── SPINNER ── */
    .gnc-spinner {
      width: 18px; height: 18px; border-radius: 50%;
      border: 2px solid rgba(15,35,71,.25);
      border-top-color: ${xe};
      animation: spin .7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── PROGRESS BAR ── */
    .gnc-progress {
      height: 2px; background: rgba(255,255,255,.05);
      border-radius: 99px; overflow: hidden; margin-bottom: 28px;
    }
    .gnc-progress-inner {
      height: 100%; background: linear-gradient(90deg, ${Z}, ${ge});
      border-radius: 99px;
      transition: width 1.4s cubic-bezier(.4,0,.2,1);
      width: 0%;
    }
    .gnc-progress-inner.go { width: 100%; }

    /* ── FOOTER ── */
    .gnc-right-footer {
      margin-top: 28px;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      font-size: 11.5px; color: rgba(255,255,255,.18);
    }
    .gnc-right-footer span { color: rgba(244,160,35,.4); }

    /* ── SECURITY BADGE ── */
    .gnc-security {
      display: flex; align-items: center; gap: 8px;
      margin-bottom: 28px;
      padding: 10px 14px;
      background: rgba(16,185,129,.06);
      border: 1px solid rgba(16,185,129,.12);
      border-radius: 9px;
    }
    .gnc-security-icon { font-size: 13px; }
    .gnc-security-text { font-size: 11.5px; color: rgba(16,185,129,.7); font-weight: 500; }
    .gnc-security-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: #10b981; margin-left: auto; flex-shrink: 0;
      animation: blink 2.5s infinite;
    }

    /* ── RESPONSIVE ── */

    /* Large Desktop (1200px+) — default styles apply */

    /* Desktop / Laptop (860px - 1199px) */
    @media (max-width: 1199px) {
      .gnc-wrap { width: 820px; }
      .gnc-left { padding: 40px 32px; }
      .gnc-right { padding: 40px 36px; }
      .gnc-left-title { font-size: 24px; }
    }

    /* Tablet Landscape (769px - 860px) */
    @media (max-width: 860px) {
      .gnc-wrap { width: 96vw; flex-direction: column; max-height: 96vh; overflow-y: auto; }
      .gnc-left { width: 100%; padding: 28px 28px 24px; flex-direction: row; flex-wrap: wrap; gap: 0; }
      .gnc-left-circle1, .gnc-left-circle2 { display: none; }
      .gnc-logo-wrap { margin: 0 0 0 0; }
      .gnc-badge { margin-bottom: 0; }
      .gnc-left > div:first-child { display: flex; align-items: center; gap: 20px; width: 100%; }
      .gnc-left-title { font-size: 18px; margin-bottom: 6px; }
      .gnc-left-desc { font-size: 12px; }
      .gnc-features { flex-direction: row; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
      .gnc-feature { font-size: 11.5px; }
      .gnc-left-footer { display: none; }
      .gnc-right { padding: 32px 28px; }
      .gnc-right-title { font-size: 22px; }
    }

    /* Tablet Portrait (481px - 768px) */
    @media (max-width: 768px) {
      .gnc-wrap { width: 96vw; border-radius: 20px; }
      .gnc-left {
        width: 100%; padding: 22px 24px 20px;
        border-right: none;
        border-bottom: 1px solid rgba(244,160,35,.12);
      }
      .gnc-left > div:first-child { flex-direction: column; align-items: flex-start; gap: 14px; }
      .gnc-logo-wrap { margin: 12px 0 8px; }
      .gnc-left-title { font-size: 20px; display: none; }
      .gnc-left-desc { display: none; }
      .gnc-features { display: none; }
      .gnc-badge { margin-bottom: 0; }
      .gnc-left-footer { display: none; }
      /* On tablet, show compact header only */
      .gnc-left { display: flex; flex-direction: row; align-items: center; gap: 16px; padding: 18px 24px; }
      .gnc-left-pattern { border-radius: 0; }
      .gnc-right { padding: 28px 24px 32px; }
      .gnc-right-title { font-size: 22px; }
      .gnc-right-sub { margin-bottom: 24px; font-size: 12.5px; }
      .gnc-security { padding: 9px 12px; }
      .gnc-security-text { font-size: 11px; }
      .gnc-progress { margin-bottom: 20px; }
    }

    /* Mobile Large (421px - 480px) */
    @media (max-width: 480px) {
      .gnc-wrap { width: 100vw; height: 100vh; border-radius: 0; max-height: 100vh; }
      .gnc-left { display: none; }
      .gnc-right { padding: 32px 22px 28px; justify-content: flex-start; padding-top: 52px; }
      .gnc-close { top: 14px; right: 14px; }
      .gnc-right-eyebrow { font-size: 9.5px; }
      .gnc-right-title { font-size: 24px; }
      .gnc-right-sub { font-size: 12.5px; margin-bottom: 22px; }
      .gnc-input { font-size: 16px; /* prevent iOS zoom */ padding: 13px 46px; }
      .gnc-btn { padding: 14px; font-size: 14.5px; }
      .gnc-field { margin-bottom: 16px; }
      .gnc-security { margin-bottom: 20px; }
      .gnc-right-footer { font-size: 10.5px; margin-top: 20px; }
    }

    /* Mobile Small (320px - 420px) */
    @media (max-width: 420px) {
      .gnc-right { padding: 28px 18px 24px; padding-top: 50px; }
      .gnc-right-title { font-size: 22px; }
      .gnc-input { font-size: 16px; padding: 12px 44px; }
      .gnc-btn { padding: 13px; font-size: 14px; }
      .gnc-field-label { font-size: 10px; }
      .gnc-right-footer { flex-wrap: wrap; justify-content: center; gap: 4px; }
    }

    /* Landscape phones */
    @media (max-height: 600px) and (orientation: landscape) {
      .gnc-wrap { max-height: 96vh; overflow-y: auto; flex-direction: row; width: 95vw; }
      .gnc-left { display: flex; width: 38%; padding: 20px 24px; }
      .gnc-left > div:first-child { flex-direction: column; }
      .gnc-left-title { font-size: 17px; margin-bottom: 6px; }
      .gnc-left-desc, .gnc-features { display: none; }
      .gnc-right { padding: 20px 28px; }
      .gnc-right-title { font-size: 20px; }
      .gnc-right-sub { margin-bottom: 14px; font-size: 12px; }
      .gnc-progress { margin-bottom: 14px; }
      .gnc-security { margin-bottom: 14px; padding: 8px 12px; }
      .gnc-field { margin-bottom: 12px; }
      .gnc-input { padding: 11px 44px; font-size: 14px; }
      .gnc-btn { padding: 12px; }
      .gnc-right-footer { margin-top: 14px; }
    }

    /* Very small landscape */
    @media (max-height: 480px) and (orientation: landscape) {
      .gnc-left { display: none; }
      .gnc-right { padding: 16px 24px; padding-top: 40px; }
      .gnc-right-eyebrow { display: none; }
      .gnc-security { display: none; }
      .gnc-progress { margin-bottom: 10px; }
    }
  `,V=()=>w==="success"?e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"✓"})," Access Granted"]}):w==="fail"?e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"✕"})," Invalid Credentials"]}):w==="checking"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"gnc-spinner"}),e.jsxs("span",{children:["Authenticating",".".repeat(o)]})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"🔐"})," Access Admin Portal"]});return e.jsxs("div",{className:"gnc-login-root",children:[e.jsx("style",{children:Q}),e.jsxs("div",{className:"gnc-bg",children:[e.jsx("canvas",{ref:b,style:{width:"100%",height:"100%"}}),e.jsx("div",{className:"gnc-bg-grid"}),e.jsx("div",{className:"gnc-bg-glow1"}),e.jsx("div",{className:"gnc-bg-glow2"})]}),e.jsxs("div",{className:`gnc-wrap ${S?"show":""}`,children:[e.jsxs("div",{className:"gnc-left",children:[e.jsx("div",{className:"gnc-left-pattern"}),e.jsx("div",{className:"gnc-left-circle1"}),e.jsx("div",{className:"gnc-left-circle2"}),e.jsxs("div",{children:[e.jsxs("div",{className:"gnc-badge",children:[e.jsx("div",{className:"gnc-badge-dot"}),"Secured Portal"]}),e.jsxs("div",{className:"gnc-logo-wrap",children:[e.jsx("div",{className:"gnc-logo-icon",children:"🏫"}),e.jsxs("div",{children:[e.jsxs("div",{className:"gnc-college-name",children:["Guru Nanak",e.jsx("br",{}),"College"]}),e.jsx("div",{className:"gnc-college-sub",children:"Dhanbad, Jharkhand"})]})]}),e.jsxs("div",{className:"gnc-left-title",children:["Website",e.jsx("br",{}),e.jsx("span",{children:"Control"}),e.jsx("br",{}),"Center"]}),e.jsx("div",{className:"gnc-left-desc",children:"Manage notices, events, faculty, gallery, documents and all website content from one unified dashboard."}),e.jsx("div",{className:"gnc-features",children:[["📢","Real-time Notice Board"],["👨‍🏫","Faculty & Staff Directory"],["📊","Live Dashboard Analytics"],["🛡️","15-Phase System Diagnostics"]].map(([A,$])=>e.jsxs("div",{className:"gnc-feature",children:[e.jsx("div",{className:"gnc-feature-icon",children:A}),$]},$))})]}),e.jsx("div",{className:"gnc-left-footer",children:"v9.1 · Admin Panel · GNC Dhanbad"})]}),e.jsxs("div",{className:"gnc-right",children:[e.jsx("button",{className:"gnc-close",onClick:s,title:"Close",children:"✕"}),e.jsx("div",{className:"gnc-right-eyebrow",children:"Admin Access"}),e.jsx("div",{className:"gnc-right-title",children:"Welcome Back"}),e.jsx("div",{className:"gnc-right-sub",children:"Sign in to manage your college website"}),e.jsx("div",{className:"gnc-progress",children:e.jsx("div",{className:`gnc-progress-inner ${a?"go":""}`})}),e.jsxs("div",{className:"gnc-security",children:[e.jsx("span",{className:"gnc-security-icon",children:"🔒"}),e.jsx("span",{className:"gnc-security-text",children:"256-bit encrypted · Secure session"}),e.jsx("div",{className:"gnc-security-dot"})]}),e.jsxs("form",{onSubmit:q,autoComplete:"off",children:[p&&e.jsxs("div",{className:"gnc-error",children:[e.jsx("span",{children:"⚠️"})," ",p]}),e.jsxs("div",{className:"gnc-field",children:[e.jsx("div",{className:"gnc-field-label",children:e.jsx("span",{children:"Username"})}),e.jsxs("div",{className:`gnc-input-wrap ${i?"focused":""}`,children:[e.jsx("span",{className:"gnc-input-icon",children:"👤"}),e.jsx("input",{className:"gnc-input",type:"text",placeholder:"Enter your username",value:x,onChange:A=>j(A.target.value),onFocus:()=>r(!0),onBlur:()=>r(!1),onKeyDown:C,onKeyUp:B,autoComplete:"username",required:!0})]})]}),e.jsxs("div",{className:"gnc-field",children:[e.jsxs("div",{className:"gnc-field-label",children:[e.jsx("span",{children:"Password"}),m&&e.jsx("span",{className:"gnc-caps",children:"⇪ Caps Lock ON"})]}),e.jsxs("div",{className:`gnc-input-wrap ${c?"focused":""}`,children:[e.jsx("span",{className:"gnc-input-icon",children:"🔑"}),e.jsx("input",{className:"gnc-input",type:h?"text":"password",placeholder:"Enter your password",value:d,onChange:A=>f(A.target.value),onFocus:()=>l(!0),onBlur:()=>l(!1),onKeyDown:C,onKeyUp:B,autoComplete:"current-password",required:!0}),e.jsx("button",{type:"button",className:"gnc-eye-btn",onClick:()=>N(A=>!A),tabIndex:-1,title:h?"Hide":"Show",children:h?"🙈":"👁️"})]})]}),e.jsx("button",{type:"submit",className:`gnc-btn ${w==="success"?"success-btn":""} ${w==="fail"?"fail-btn":""}`,disabled:a,children:V()})]}),e.jsxs("div",{className:"gnc-right-footer",children:[e.jsx("span",{children:"🛡️"}),"Authorized personnel only  ·  GNC Admin v9.1"]})]})]})]})}const Ct=()=>{const t=ue();let s=t.pathname;s==="/"&&t.hash.startsWith("#/")&&(s=t.hash.substring(1));const x=s.split("/").filter(j=>j);return x.length===0?null:e.jsx("div",{style:{background:"#f8f9fa",borderBottom:"1px solid #e0e0e0"},children:e.jsxs("div",{style:{maxWidth:"1400px",margin:"0 auto",padding:"12px 20px",fontSize:"13.5px",color:"#666",display:"flex",alignItems:"center",fontWeight:"500"},children:[e.jsxs(Y,{to:"/",style:{color:g.navy,textDecoration:"none",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{children:"🏠"})," Home"]}),x.map((j,d)=>{const f=`/${x.slice(0,d+1).join("/")}`,p=d===x.length-1,v=j.replace(/-/g," ").replace(/\b\w/g,a=>a.toUpperCase());return e.jsxs("span",{style:{display:"flex",alignItems:"center"},children:[e.jsx("span",{style:{margin:"0 10px",color:"#ccc",fontSize:"10px"},children:"❯"}),p?e.jsx("span",{style:{color:g.gold,fontWeight:"700"},children:v}):e.jsx(Y,{to:f,style:{color:g.navy,textDecoration:"none"},children:v})]},f)})]})})};function At(){const t=[{label:"Principal Message",icon:"👨‍🏫",href:"#/about-us/principal-message"},{label:"Admission Rules",icon:"🎓",href:"#/admission/rule"},{label:"Departments",icon:"🏛️",href:"#/academics/course-offered"},{label:"NSS / NCC",icon:"🎖️",href:"#/activity/nss"},{label:"Syllabus",icon:"📚",href:"#/syllabus"},{label:"Photo Gallery",icon:"📸",href:"#/gallery"},{label:"Contact Us",icon:"📞",href:"#/contact"}];return e.jsx("div",{style:{position:"fixed",right:0,top:"50%",transform:"translateY(-50%)",zIndex:990,display:"flex",flexDirection:"column",gap:"4px"},children:t.map((s,x)=>e.jsx(Rt,{action:s,index:x},x))})}const Rt=({action:t,index:s})=>{const[x,j]=n.useState(!1);return e.jsxs("a",{href:t.href,onMouseEnter:()=>j(!0),onMouseLeave:()=>j(!1),style:{display:"flex",alignItems:"center",justifyContent:"flex-start",padding:"12px 15px",backgroundColor:x?g.gold:g.navy,color:x?g.navy:"#fff",textDecoration:"none",width:x?"200px":"55px",height:"55px",borderTopLeftRadius:"12px",borderBottomLeftRadius:"12px",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",overflow:"hidden",whiteSpace:"nowrap",boxShadow:x?"-5px 5px 15px rgba(0,0,0,0.2)":"-2px 2px 8px rgba(0,0,0,0.1)",position:"relative",right:x?"0":"-5px",animation:`slideInRight 0.5s ease forwards ${s*.1}s`,opacity:0},children:[e.jsx("span",{style:{fontSize:"22px",minWidth:"30px",textAlign:"center",display:"block"},children:t.icon}),e.jsx("span",{style:{fontWeight:"800",fontSize:"14px",marginLeft:"12px",opacity:x?1:0,transition:"opacity 0.3s ease 0.1s"},children:t.label}),e.jsx("style",{children:"@keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }"})]})};function Te({page:t}){const[s,x]=n.useState([]);if(n.useEffect(()=>{if(!t)return;window.scrollTo(0,0);const d=t.path||`/p/${t.slug}`,f=_(X(O,"pdfReports"),K("createdAt","desc")),p=P(f,v=>{const y=v.docs.map(h=>({id:h.id,...h.data()})).filter(h=>h.targetPage===d);y.sort((h,N)=>new Date(N.date)-new Date(h.date)),x(y)});return()=>p()},[t]),!t)return e.jsx("div",{style:{minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f4f7fa"},children:e.jsxs("div",{style:{textAlign:"center",padding:"50px",background:"#fff",borderRadius:"16px",boxShadow:"0 10px 30px rgba(0,0,0,0.05)"},children:[e.jsx("div",{style:{fontSize:"50px",marginBottom:"15px"},children:"🚧"}),e.jsx("h2",{style:{color:g.navy,fontSize:"28px",margin:"0 0 10px"},children:"Content Updating..."}),e.jsx("p",{style:{color:"#64748b",margin:0},children:"This section is currently being updated by the administration."})]})});const j=be.sanitize(t.content,{ADD_TAGS:["iframe"],ADD_ATTR:["allow","allowfullscreen","frameborder","scrolling"]});return e.jsxs("div",{children:[e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:t.title}),e.jsx("p",{className:"hero-subtitle",children:"Guru Nanak College, Dhanbad"})]})]}),e.jsx("div",{style:{maxWidth:"1200px",margin:"40px auto",padding:"0 20px"},children:e.jsxs("main",{children:[e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)"},children:[e.jsx("h2",{style:{fontSize:"2.2rem",color:g.navy,fontWeight:700,marginBottom:"0.5rem",textAlign:"left"},children:t.title}),e.jsx("div",{style:{width:"80px",height:"5px",background:g.gold,marginBottom:"1.5rem",borderRadius:"10px"}}),e.jsx("div",{className:"dynamic-rich-content",children:Xe(j)})]}),s.length>0&&e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",marginTop:"30px"},children:[e.jsx("h2",{style:{fontSize:"2.2rem",color:g.navy,fontWeight:700,marginBottom:"0.5rem",textAlign:"left"},children:"📚 Official Documents"}),e.jsx("div",{style:{width:"80px",height:"5px",background:g.gold,marginBottom:"1.5rem",borderRadius:"10px"}}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:"20px"},children:s.map(d=>e.jsxs("div",{style:{display:"flex",background:"#fff",border:"1px solid #e2e8f0",borderRadius:"10px",overflow:"hidden",transition:"all 0.3s ease",boxShadow:"0 4px 6px rgba(0,0,0,0.02)"},onMouseOver:f=>{f.currentTarget.style.transform="translateY(-4px)",f.currentTarget.style.borderColor=g.gold},onMouseOut:f=>{f.currentTarget.style.transform="translateY(0)",f.currentTarget.style.borderColor="#e2e8f0"},children:[e.jsx("div",{style:{width:"80px",background:"#f1f5f9",borderRight:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"center"},children:d.coverImage?e.jsx("img",{src:d.coverImage,alt:"cover",style:{width:"100%",height:"100%",objectFit:"cover"}}):e.jsx("div",{style:{fontSize:"30px",opacity:.3},children:"📄"})}),e.jsxs("div",{style:{padding:"15px",flex:1,display:"flex",flexDirection:"column",justifyContent:"center"},children:[d.isNew&&e.jsx("span",{className:"new-badge",children:"NEW"}),e.jsx("h4",{style:{margin:"0 0 5px 0",fontSize:"14px",color:g.navy,lineHeight:"1.4"},children:d.title}),e.jsxs("p",{style:{margin:"0 0 10px 0",fontSize:"11px",color:"#64748b",fontWeight:600},children:["📅 ",d.date]}),e.jsx("a",{href:d.link,children:"⬇️ View Document"})]})]},d.id))})]})]})}),e.jsx("style",{children:`
        @media (max-width: 768px) { .dynamic-rich-content { padding: 25px !important; } }
        .dynamic-rich-content table { width: 100% !important; border-collapse: collapse; margin: 20px 0; display: block; overflow-x: auto; white-space: nowrap; font-size: 14px; }
        .dynamic-rich-content th { background: ${g.navy}; color: white; padding: 12px 15px; text-align: left; }
        .dynamic-rich-content td { padding: 12px 15px; border: 1px solid #e2e8f0; }
        .dynamic-rich-content tr:nth-child(even) { background-color: #f8fafc; }
        .dynamic-rich-content iframe { width: 100%; aspect-ratio: 16 / 9; height: auto; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 20px 0; }
        .dynamic-rich-content img { max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin: 20px 0; display: block; }
        .dynamic-rich-content h1, .dynamic-rich-content h2, .dynamic-rich-content h3 { color: ${g.navy}; margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 800; line-height: 1.3; text-align: left; }
        .dynamic-rich-content p { margin-bottom: 1.5em; line-height: 1.8; color: #334155; font-size: 16px; }
        .dynamic-rich-content ul, .dynamic-rich-content ol { margin-bottom: 1.5em; padding-left: 20px; color: #334155; line-height: 1.8; font-size: 16px;}
        .dynamic-rich-content li { margin-bottom: 8px; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        .new-badge { display: inline-block; background: #ef4444; color: #fff; fontSize: 9px; font-weight: 800; padding: 3px 6px; border-radius: 4px; margin-bottom: 8px; width: fit-content; animation: blink 1.5s infinite; letter-spacing: 0.5px;}
        .download-btn { display: inline-block; background: #f8fafc; color: ${g.navy}; padding: 8px 15px; border-radius: 6px; font-size: 12px; font-weight: 700; text-decoration: none; border: 1px solid #cbd5e1; text-align: center; transition: 0.2s; }
        .download-btn:hover { background: ${g.navy}; color: #fff; border-color: ${g.navy}; }
      `})]})}const fe={bhuda:{phone:"+91 79033 40991",email:"info@gncollege.org",address:`Guru Nanak College, Bhuda
Dhanbad, Jharkhand - 826001`},bankMore:{phone:"",email:"vocational@gncollege.org",address:`Guru Nanak College, Bank More
Dhanbad, Jharkhand - 826001`}},Wt=[{id:"1",title:"Prof. In-Charge (Bhuda Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫",order:1},{id:"2",title:"Prof. In-Charge (Bank More Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫",order:2},{id:"3",title:"BCA Coordinator",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"💻",order:3},{id:"4",title:"Member, Women's Cell",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛡️",order:4},{id:"5",title:"Member, Anti-Ragging Squad",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛑",order:5},{id:"6",title:"P.A. to Principal",name:"Mr. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"📝",order:6}];function Dt(){const[t,s]=n.useState(fe),[x,j]=n.useState(Wt),[d,f]=n.useState(!0);n.useEffect(()=>{window.scrollTo(0,0);const a=P(pe(O,"settings","contact"),h=>{if(h.exists()){const N=h.data();s({bhuda:{...fe.bhuda,...N.bhuda||{}},bankMore:{...fe.bankMore,...N.bankMore||{}}})}f(!1)},()=>f(!1)),y=P(_(X(O,"contactDirectory"),K("order","asc")),h=>{h.empty||j(h.docs.map(N=>({id:N.id,...N.data()})))},()=>{});return()=>{a(),y()}},[]);const{bhuda:p,bankMore:v}=t;return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes fadeInUp {
          0%   { opacity:0; transform:translateY(30px); }
          100% { opacity:1; transform:translateY(0);    }
        }
        .contact-header {
          background: linear-gradient(135deg, ${g.navy} 0%, #0a1832 100%);
          color: white; padding: 80px 20px 140px; text-align: center; position: relative;
        }
        .header-title { font-size:46px; font-weight:900; margin:0; letter-spacing:-1px; animation:fadeInUp .6s ease-out forwards; }
        .header-title span { color:${g.gold}; }
        .header-sub { font-size:16px; color:#cbd5e1; margin:15px auto 0; max-width:600px; animation:fadeInUp .6s ease-out .2s forwards; opacity:0; line-height:1.6; }

        .campus-container { max-width:1200px; margin:-120px auto 40px; padding:0 20px; display:grid; grid-template-columns:repeat(auto-fit,minmax(400px,1fr)); gap:40px; position:relative; z-index:10; }
        .campus-card { background:#fff; border-radius:20px; overflow:hidden; box-shadow:0 15px 40px rgba(0,0,0,0.07); border:1px solid #e2e8f0; transition:all .4s ease; opacity:0; animation:fadeInUp .8s ease-out forwards; display:flex; flex-direction:column; }
        .campus-card:hover { transform:translateY(-10px); box-shadow:0 25px 50px rgba(15,35,71,.12); border-color:${g.gold}; }
        .card-1 { animation-delay:.3s; } .card-2 { animation-delay:.5s; }

        .card-header { padding:25px 30px; display:flex; align-items:center; gap:15px; background:#fafbfc; border-bottom:1px solid #edf2f7; }
        .campus-icon { width:55px; height:55px; background:rgba(244,160,35,.15); color:${g.gold}; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; flex-shrink:0; }
        .campus-title { font-size:24px; font-weight:800; color:${g.navy}; margin:0; }
        .campus-badge { font-size:11px; padding:4px 10px; border-radius:20px; font-weight:700; margin-top:6px; display:inline-block; letter-spacing:.5px; }

        .card-details { padding:25px 30px; flex-grow:1; }
        .detail-row { display:flex; align-items:flex-start; gap:15px; margin-bottom:20px; }
        .detail-row:last-child { margin-bottom:0; }
        .d-icon { font-size:20px; color:${g.navy}; margin-top:2px; }
        .d-text h4 { margin:0 0 4px; font-size:13px; text-transform:uppercase; letter-spacing:.5px; font-weight:700; color:#718096; }
        .d-text p, .d-text a { margin:0; font-size:15px; color:#2d3748; font-weight:600; text-decoration:none; line-height:1.5; transition:color .2s; white-space:pre-line; }
        .d-text a:hover { color:${g.gold}; }

        .map-container { width:100%; height:250px; border-top:1px solid #edf2f7; }
        .map-container iframe { width:100%; height:100%; border:none; filter:grayscale(10%) contrast(1.05); transition:all .4s; }
        .campus-card:hover .map-container iframe { filter:grayscale(0%) contrast(1); }

        .directory-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:1.5rem; }
        .directory-card { background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:1.5rem; display:flex; align-items:center; gap:1.5rem; transition:all .3s; }
        .directory-card:hover { transform:translateY(-5px); border-color:${g.gold}; box-shadow:0 8px 25px rgba(15,35,71,.08); }
        .dir-icon { font-size:1.8rem; width:50px; height:50px; display:flex; align-items:center; justify-content:center; background:#f1f5f9; border-radius:50%; flex-shrink:0; }
        .dir-title { font-size:.8rem; text-transform:uppercase; letter-spacing:1px; color:#64748b; font-weight:700; margin-bottom:4px; }
        .dir-name  { font-size:1.1rem; font-weight:800; color:${g.navy}; margin-bottom:6px; }
        .dir-contact { font-size:.9rem; font-weight:600; color:#4a5568; text-decoration:none; }
        .dir-contact:hover { color:${g.gold}; }

        @media(max-width:900px) { .campus-container { grid-template-columns:1fr; } }
        @media(max-width:768px) { .contact-header { padding:60px 20px 80px; } .header-title { font-size:36px; } .campus-container { margin-top:-60px; } }
      `}),e.jsxs("header",{className:"contact-header",children:[e.jsxs("h1",{className:"header-title",children:["Get In ",e.jsx("span",{children:"Touch"})]}),e.jsx("p",{className:"header-sub",children:"We are here to assist you. Reach out to our respective campuses or directly contact our administration team for any queries."})]}),e.jsxs("div",{className:"campus-container",children:[e.jsxs("div",{className:"campus-card card-1",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏛️"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bhuda Campus"}),e.jsx("span",{className:"campus-badge",style:{background:g.navy,color:"#fff"},children:"Main Campus • Boys Wing"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsx("p",{children:p.address})]})]}),p.phone&&e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:`tel:${p.phone}`,children:p.phone})]})]}),p.email&&e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:`mailto:${p.email}`,children:p.email})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bhuda Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.089853381653!2d86.43232147533682!3d23.797658878638367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69707963d7e8b%3A0x86733221469e7f7b!2sGuru%20Nanak%20College%20Dhanbad!5e0!3m2!1sen!2sin!4v1708688000000!5m2!1sen!2sin",allowFullScreen:!0,loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})})]}),e.jsxs("div",{className:"campus-card card-2",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏢"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bank More Campus"}),e.jsx("span",{className:"campus-badge",style:{background:g.gold,color:g.navyDark},children:"Girls Wing • Vocational Studies"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsx("p",{children:v.address})]})]}),v.phone?e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:`tel:${v.phone}`,children:v.phone})]})]}):e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("p",{style:{color:"#a0aec0",fontStyle:"italic"},children:"Admin Panel se number add karein"})]})]}),v.email&&e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:`mailto:${v.email}`,children:v.email})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bank More Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.630325992144!2d86.4175863149822!3d23.77601898456687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6a3048817a859%3A0x8d365f7d34c52968!2sGuru%20Nanak%20College%20Womens%20Wing!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",allowFullScreen:!0,loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})})]})]}),e.jsx("div",{className:"profile-container",style:{marginTop:0},children:e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:".3s",background:"transparent",boxShadow:"none",border:"none"},children:[e.jsx("h2",{className:"section-heading",style:{textAlign:"center"},children:"Administration Directory"}),e.jsx("div",{className:"heading-underline",style:{margin:"0 auto 30px"}}),d?e.jsx("div",{style:{textAlign:"center",padding:"40px",color:"#64748b",fontWeight:700},children:"Loading directory..."}):e.jsx("div",{className:"directory-grid",children:x.map(a=>e.jsxs("div",{className:"directory-card",children:[e.jsx("div",{className:"dir-icon",children:a.icon||"👤"}),e.jsxs("div",{children:[e.jsx("div",{className:"dir-title",children:a.title}),e.jsx("div",{className:"dir-name",children:a.name}),a.phone&&e.jsxs("a",{href:`tel:${a.phone}`,className:"dir-contact",children:["📞 ",a.phone]})]})]},a.id))})]})})]})}const Et=()=>(n.useEffect(()=>{window.scrollTo(0,0)},[]),e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("header",{className:"profile-hero",children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"College Profile"}),e.jsx("p",{className:"hero-subtitle",children:"Excellence in Education Since 1970"})]})]}),e.jsx("div",{style:{maxWidth:"1200px",margin:"3rem auto 0",padding:"0 20px",position:"relative",zIndex:20},children:e.jsxs("div",{className:"profile-layout",children:[e.jsxs("main",{className:"profile-main",children:[e.jsxs("section",{className:"profile-section anim-slide-up",style:{animationDelay:"0.2s",background:"#fff",borderRadius:"24px"},children:[e.jsxs("div",{className:"section-grid",style:{marginBottom:"3rem"},children:[e.jsxs("div",{className:"text-content",children:[e.jsx("h2",{className:"section-heading",children:"College Profile"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was Established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru after whom this college is named."}),e.jsx("p",{className:"rich-text-content mt-4",children:"The college is managed by a Governing Council nominated by the Gurudwara Prabandhak Committee, Dhanbad, and draws its inspiration from the teachings of the faith propounded by Guru Nanak Devji."})]}),e.jsx("div",{className:"image-content",children:e.jsx("img",{src:"https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop",alt:"College Campus",loading:"lazy",decoding:"async",className:"profile-img hover-scale"})})]}),e.jsxs("div",{style:{marginBottom:"3rem"},children:[e.jsx("h2",{className:"section-heading",children:"About the College"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"Initially the college got affiliated to the Ranchi University – Ranchi since 1970 the year it was stared. But with the passage of time, Binod Bihari Mahto Koylanchal University, Dhanbad came into existence in 2017; and the affiliation of the college got transferred to this new University in 2017."}),e.jsx("p",{className:"rich-text-content mt-4",children:"At present, the college has got permanent affiliation with Binod Bihari Mahto Koylanchal University, Dhanbad in the faculties of Humanities, Social Sciences, commerce and such vocational courses as Bachelor of Computer Applications. The college has got “Deficit Grant College Status” by the government of Jharkhand. Also the college is registered u/s 2F and 12B of the UGC Act."}),e.jsx("p",{className:"rich-text-content mt-4",children:"The main aim and objective behind sponsoring this college was to impart value - based teaching to the young men and women of Dhanbad. The college attaches great importance to moral teaching. The college does not merely offer teaching in such subject as would enable young students to earn their bread and butter, but it also emphasizes grooming them into worthy (morally sound) citizens."})]}),e.jsxs("div",{children:[e.jsx("h2",{className:"section-heading",children:"Our Campuses"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",style:{marginBottom:"3rem"},children:"Guru Nanak College, Dhanbad functions at two main campuses:"}),e.jsxs("div",{className:"grid-2-col gap-6",children:[e.jsxs("div",{className:"campus-box",children:[e.jsx("h3",{style:{fontSize:"1.5rem",color:"var(--primary-navy)",fontWeight:"700",marginBottom:"10px"},children:"1. Bank More Campus (Girls Wing)"}),e.jsx("p",{className:"rich-text-content",children:"The women’s wing of the College was started in the year 2000 in the Bank More Campus of the College in the morning hours. As an exclusive centre of teaching for girls, this wing has earned high reputation among stakeholders during the last few years. In the Women’s wing also, teaching is imparted for B.A./B.Com. (Hons/General) Course."})]}),e.jsxs("div",{className:"campus-box",children:[e.jsx("h3",{style:{fontSize:"1.5rem",color:"var(--primary-navy)",fontWeight:"700",marginBottom:"10px"},children:"2. Bhuda Campus (Boys Wing)"}),e.jsx("p",{className:"rich-text-content",children:"The main building – the Boys’ wing of the College is situated at Bhuda. The main building is spaciously designed in an airy surrounding quite suitable for the environment of an academic institution. The present campus has been so planned as to cater to the needs of the students for a long time."})]})]})]})]}),e.jsx("section",{className:"stats-grid stats-grid-override mb-16 anim-slide-up",style:{animationDelay:"0.4s"},children:[{label:"Years of Legacy",value:"56+",icon:"🏛️"},{label:"Expert Faculty",value:"120+",icon:"👨‍🏫"},{label:"Students",value:"5000+",icon:"🎓"},{label:"Courses",value:"30+",icon:"📚"}].map((t,s)=>e.jsxs("div",{className:"stat-card stat-card-small",style:{background:"#fff",borderRadius:"16px",border:"1px solid #e2e8f0"},children:[e.jsx("div",{className:"stat-icon",children:t.icon}),e.jsx("div",{className:"stat-value stat-value-small",children:t.value}),e.jsx("div",{className:"stat-label",children:t.label})]},s))})]}),e.jsxs("aside",{className:"profile-sidebar anim-slide-up",style:{animationDelay:"0.5s"},children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"Principal Message",path:"/about-us/principal-message"},{label:"Admission Rules",path:"/admission/rule"},{label:"Fee Structure",path:"/admission/fee-structure"},{label:"Departments",path:"/academics/course-offered"},{label:"NSS",path:"/activity/nss"},{label:"NCC",path:"/activity/ncc"},{label:"Sports",path:"/activity/games-sports"},{label:"Workshop",path:"/activity/workshop"},{label:"Syllabus",path:"/syllabus"},{label:"Academic Calendar",path:"/academics/academic-calendar"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((t,s)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(Y,{to:t.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",t.label]})},s))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:"45px",marginBottom:"15px",position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 12px",fontSize:"19px",color:"#f4a023",position:"relative",zIndex:2},children:"Need Assistance?"}),e.jsx("p",{style:{fontSize:"14px",margin:"0 0 20px",color:"#e2e8f0",lineHeight:"1.6",position:"relative",zIndex:2},children:"Contact our administration office for any queries related to admission or academics."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call Helpdesk Now"})]}),e.jsxs("div",{style:{marginTop:"30px"},children:[e.jsxs("h4",{style:{fontSize:"17px",fontWeight:"700",color:"var(--primary-navy)",marginBottom:"20px",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("span",{children:"🌐"})," Connect With Us"]}),e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx("a",{href:"https://facebook.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"f"}),e.jsx("a",{href:"https://twitter.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"𝕏"}),e.jsx("a",{href:"https://instagram.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"📸"}),e.jsx("a",{href:"https://youtube.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"▶"})]})]})]})]})})]})),re=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],oe=t=>t?.toDate?t.toDate():new Date(t||Date.now());function Tt(){const[t,s]=n.useState([]),[x,j]=n.useState(!0),[d,f]=n.useState("All"),[p,v]=n.useState("All"),[a,y]=n.useState("All"),[h,N]=n.useState(""),w=g.navy,z=g.gold;n.useEffect(()=>{window.scrollTo(0,0);const r=_(X(O,"notices"),K("createdAt","desc"));return P(r,c=>{s(c.docs.map(l=>({id:l.id,...l.data()}))),j(!1)})},[]);const m=n.useMemo(()=>{const r=new Set(t.map(c=>oe(c.createdAt).getFullYear()));return["All",...Array.from(r).sort((c,l)=>l-c)]},[t]),k=n.useMemo(()=>t.filter(r=>{const c=oe(r.createdAt);return!(d!=="All"&&c.getFullYear()!==Number(d)||p!=="All"&&re[c.getMonth()]!==p||a!=="All"&&(r.type||"General")!==a||h&&!r.text?.toLowerCase().includes(h.toLowerCase()))}),[t,d,p,a,h]),i=n.useMemo(()=>{const r={};return k.forEach(c=>{const l=oe(c.createdAt),o=`${re[l.getMonth()]} ${l.getFullYear()}`;r[o]||(r[o]=[]),r[o].push(c)}),r},[k]);return e.jsxs("div",{style:{minHeight:"100vh",background:"#fff",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx("style",{children:`
        /* PREMIUM FILTER UI */
        .filter-container { background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px; margin-bottom: 40px; box-shadow: 0 10px 40px -10px rgba(15,23,42,0.05); }
        .search-wrapper { position: relative; flex: 1; }
        .search-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); font-size: 18px; opacity: 0.4; pointer-events: none; }
        .premium-input { width: 100%; padding: 15px 20px 15px 48px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; font-size: 15px; color: ${w}; font-family: inherit; font-weight: 600; outline: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-sizing: border-box; }
        .premium-input:focus { background: #fff; border-color: ${z}; box-shadow: 0 0 0 4px rgba(244,160,35,0.15); }
        .premium-input::placeholder { color: #94a3b8; font-weight: 500; }
        .filter-row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-top: 20px; padding-top: 20px; border-top: 1px dashed #e2e8f0; }
        .filter-label { font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1px; min-width: 80px; }
        .pill-group { display: flex; gap: 10px; flex-wrap: wrap; }
        .premium-pill { background: #f1f5f9; border: 1px solid transparent; color: #475569; padding: 8px 20px; border-radius: 50px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .premium-pill:hover { background: #e2e8f0; color: #0f172a; }
        .premium-pill.active { background: ${w}; color: #fff; box-shadow: 0 6px 15px rgba(15,35,71,0.2); transform: translateY(-2px); }
        .clear-btn { background: #fef2f2; color: #ef4444; border: none; padding: 15px 24px; border-radius: 14px; font-size: 14px; font-weight: 800; cursor: pointer; transition: 0.2s; white-space: nowrap; height: fit-content; }
        .clear-btn:hover { background: #fee2e2; }

        /* FLAT CARD */
        .flat-card { border: 1px solid #e2e8f0; background: #fff; border-radius: 16px; padding: 24px; margin-bottom: 16px; transition: all 0.2s; display: flex; align-items: flex-start; gap: 20px; }
        .flat-card:hover { background: #f8fafc; border-color: ${z}; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
      `}),e.jsxs("header",{style:{position:"relative",padding:"100px 20px 80px",background:"url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop') center/cover",borderBottom:"1px solid #e2e8f0"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:`linear-gradient(to right, ${w}f2, ${w}cc)`}}),e.jsx("div",{style:{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",backgroundSize:"30px 30px"}}),e.jsxs("div",{style:{position:"relative",zIndex:1,maxWidth:"1000px",margin:"0 auto"},children:[e.jsx("div",{style:{display:"inline-block",background:"rgba(244, 160, 35, 0.15)",color:z,padding:"6px 14px",borderRadius:"50px",fontSize:"12px",fontWeight:800,letterSpacing:"1px",marginBottom:"15px",border:"1px solid rgba(244, 160, 35, 0.3)"},children:"GURU NANAK COLLEGE"}),e.jsx("h1",{style:{color:"#fff",fontSize:"48px",fontWeight:900,margin:"0 0 15px",letterSpacing:"-1px"},children:"Notice Board"}),e.jsx("p",{style:{color:"#cbd5e1",fontSize:"18px",maxWidth:"600px",margin:0,lineHeight:1.6},children:"Official announcements, circulars, and administrative updates."})]})]}),e.jsx("div",{style:{maxWidth:"1000px",margin:"-40px auto 40px",position:"relative",zIndex:10,display:"flex",gap:"15px",padding:"0 20px",flexWrap:"wrap"},children:[{val:t.length,label:"Total Notices"},{val:t.filter(r=>r.isNew).length,label:"New Updates"},{val:m.length-1,label:"Years of Data"}].map((r,c)=>e.jsxs("div",{style:{flex:1,minWidth:"150px",background:"#fff",border:"1px solid #e2e8f0",borderRadius:"12px",padding:"20px",display:"flex",alignItems:"center",gap:"15px",boxShadow:"0 4px 15px rgba(0,0,0,0.02)"},children:[e.jsx("div",{style:{width:"4px",height:"40px",background:z,borderRadius:"4px"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"24px",fontWeight:900,color:w,lineHeight:1},children:r.val}),e.jsx("div",{style:{fontSize:"12px",color:"#64748b",fontWeight:700,marginTop:"4px",textTransform:"uppercase"},children:r.label})]})]},c))}),e.jsxs("div",{style:{maxWidth:"1000px",margin:"0 auto 80px",padding:"0 20px"},children:[e.jsxs("div",{className:"filter-container",children:[e.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("div",{className:"search-wrapper",children:[e.jsx("span",{className:"search-icon",children:"🔍"}),e.jsx("input",{className:"premium-input",value:h,onChange:r=>N(r.target.value),placeholder:"Search notices by title, keyword, or subject..."})]}),(d!=="All"||p!=="All"||a!=="All"||h)&&e.jsx("button",{className:"clear-btn",onClick:()=>{f("All"),v("All"),y("All"),N("")},children:"✕ Clear All"})]}),e.jsxs("div",{className:"filter-row",children:[e.jsx("div",{className:"filter-label",children:"Month"}),e.jsx("div",{className:"pill-group",children:["All",...re].map(r=>e.jsx("button",{className:`premium-pill ${p===r?"active":""}`,onClick:()=>v(r),children:r},r))})]}),e.jsxs("div",{className:"filter-row",children:[e.jsx("div",{className:"filter-label",children:"Timeline"}),e.jsx("div",{className:"pill-group",children:m.map(r=>e.jsx("button",{className:`premium-pill ${d===String(r)?"active":""}`,onClick:()=>f(String(r)),children:r},r))})]})]}),x?e.jsx("div",{style:{textAlign:"center",padding:"40px",color:"#64748b",fontWeight:700},children:"Syncing Database..."}):k.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"60px",border:"2px dashed #cbd5e1",borderRadius:"16px",color:"#64748b"},children:[e.jsx("span",{style:{fontSize:"40px",display:"block",marginBottom:"10px"},children:"📭"}),"No notices match your advanced filter."]}):Object.entries(i).map(([r,c])=>e.jsxs("div",{style:{marginBottom:"40px"},children:[e.jsxs("h3",{style:{fontSize:"16px",fontWeight:900,color:w,borderBottom:"2px solid #e2e8f0",paddingBottom:"10px",marginBottom:"20px",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("span",{style:{color:z},children:"📅"})," ",r]}),c.map(l=>{const o=oe(l.createdAt);return e.jsxs("div",{className:"flat-card",children:[e.jsxs("div",{style:{textAlign:"center",minWidth:"65px",background:"#f1f5f9",border:"1px solid #e2e8f0",padding:"14px 10px",borderRadius:"12px"},children:[e.jsx("div",{style:{fontSize:"11px",fontWeight:800,color:"#64748b",textTransform:"uppercase"},children:re[o.getMonth()]}),e.jsx("div",{style:{fontSize:"26px",fontWeight:900,color:w,lineHeight:1,marginTop:"4px"},children:o.getDate()})]}),e.jsxs("div",{style:{flex:1},children:[e.jsxs("div",{style:{display:"flex",gap:"10px",alignItems:"center",marginBottom:"10px"},children:[e.jsx("span",{style:{fontSize:"11px",fontWeight:800,padding:"4px 12px",background:"#f8fafc",border:"1px solid #cbd5e1",borderRadius:"50px",color:w,textTransform:"uppercase"},children:l.type||"General"}),l.isNew&&e.jsx("span",{style:{fontSize:"10px",fontWeight:900,color:"#fff",background:"#ef4444",padding:"3px 8px",borderRadius:"50px"},children:"NEW"})]}),e.jsx("div",{dangerouslySetInnerHTML:{__html:be.sanitize(l.text)}}),l.link&&e.jsx("a",{href:l.link,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"6px",marginTop:"16px",fontSize:"13px",fontWeight:800,color:w,textDecoration:"none",background:"#f1f5f9",padding:"8px 16px",borderRadius:"8px",border:"1px solid #e2e8f0",transition:"all .2s"},onMouseOver:u=>{u.target.style.background=w,u.target.style.color="#fff"},onMouseOut:u=>{u.target.style.background="#f1f5f9",u.target.style.color=w},children:"📎 View Attachment Document"})]})]},l.id)})]},r))]})]})}const me=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],It=["All","Document","Report","Syllabus","Circular","Result","Regulation","Affiliation"],ee={Document:{icon:"📄",bg:"#EBF0FF",text:"#1a365d",border:"#BED0FF",color:"#4a7fd4"},Report:{icon:"📊",bg:"#F0FFF4",text:"#1c4532",border:"#9AE6B4",color:"#38a169"},Syllabus:{icon:"📚",bg:"#FFFBEB",text:"#744210",border:"#FAF089",color:"#d69e2e"},Circular:{icon:"📋",bg:"#FFF5F5",text:"#742a2a",border:"#FEB2B2",color:"#e53e3e"},Result:{icon:"🏆",bg:"#E6FFFA",text:"#1d4044",border:"#81E6D9",color:"#319795"},Regulation:{icon:"⚖️",bg:"#F5F3FF",text:"#4C1D95",border:"#DDD6FE",color:"#7C3AED"},Affiliation:{icon:"🏛️",bg:"#F0F9FF",text:"#0C4A6E",border:"#BAE6FD",color:"#0284C7"}},de=t=>t?.toDate?t.toDate():new Date(t||Date.now()),ze=t=>{const s=de(t);return`${s.getDate()} ${me[s.getMonth()]} ${s.getFullYear()}`};function Ft(){const[t,s]=n.useState([]),[x,j]=n.useState(!0),[d,f]=n.useState("All"),[p,v]=n.useState("All"),[a,y]=n.useState("All"),[h,N]=n.useState(""),[w,z]=n.useState("grid"),m=g.navy,k=g.gold;n.useEffect(()=>{window.scrollTo(0,0);const o=_(X(O,"pdfReports"),K("createdAt","desc"));return P(o,u=>{s(u.docs.map(S=>({id:S.id,...S.data()}))),j(!1)})},[]);const i=n.useMemo(()=>{const o=new Set(t.map(u=>de(u.createdAt).getFullYear()));return["All",...Array.from(o).sort((u,S)=>S-u)]},[t]),r=n.useMemo(()=>{const o={};return t.forEach(u=>{const S=u.type||"Document";o[S]=(o[S]||0)+1}),o},[t]),c=n.useMemo(()=>t.filter(o=>{const u=de(o.createdAt);return!(d!=="All"&&u.getFullYear()!==Number(d)||p!=="All"&&me[u.getMonth()]!==p||a!=="All"&&(o.type||"Document")!==a||h&&!o.title?.toLowerCase().includes(h.toLowerCase()))}),[t,d,p,a,h]),l=n.useMemo(()=>{const o={};return c.forEach(u=>{const S=String(de(u.createdAt).getFullYear());o[S]||(o[S]=[]),o[S].push(u)}),o},[c]);return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes spin{to{transform:rotate(360deg)}}
        .doc-fb{border:none;font-family:inherit;cursor:pointer;transition:all .15s}
        .doc-card-hover{transition:all .2s}
        .doc-card-hover:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(11,31,78,.13)!important}
        .doc-row-hover{transition:all .15s}
        .doc-row-hover:hover{background:#f8fafc!important;border-color:${k}55!important}
        .dl-btn-hover{transition:all .18s}
        .dl-btn-hover:hover{background:${k}!important;color:${m}!important}
      `}),e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"📁 Document Archive"}),e.jsx("p",{className:"hero-subtitle",children:"Syllabus, circulars, reports aur important documents — year aur type wise filter karo"})]})]}),e.jsx("div",{style:{maxWidth:"1000px",margin:"-80px auto 40px",padding:"20px",position:"relative",zIndex:10,background:"rgba(255,255,255,0.8)",backdropFilter:"blur(10px)",borderRadius:"16px",boxShadow:"0 10px 30px rgba(0,0,0,0.1)"},children:e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"},children:[Object.entries(r).map(([o,u])=>{const S=ee[o]||{icon:"📄"};return e.jsxs("button",{onClick:()=>y(a===o?"All":o),style:{background:a===o?"#fffbeb":"#fff",border:`1px solid ${a===o?k:"#e2e8f0"}`,borderRadius:11,padding:"10px 18px",color:m,cursor:"pointer",textAlign:"center",transition:"all .2s"},children:[e.jsx("span",{style:{display:"block",fontSize:19},children:S.icon}),e.jsx("span",{style:{display:"block",fontSize:22,fontWeight:900,color:k,lineHeight:1},children:u}),e.jsx("span",{style:{display:"block",fontSize:11,color:"#64748b",marginTop:2,fontWeight:600},children:o})]},o)}),e.jsxs("div",{style:{background:"#fff",border:"1px solid #e2e8f0",borderRadius:11,padding:"10px 18px",textAlign:"center"},children:[e.jsx("span",{style:{display:"block",fontSize:19},children:"📂"}),e.jsx("span",{style:{display:"block",fontSize:22,fontWeight:900,color:k,lineHeight:1},children:t.length}),e.jsx("span",{style:{display:"block",fontSize:11,color:"#64748b",marginTop:2,fontWeight:600},children:"Total"})]})]})}),e.jsx("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"0 20px"},children:e.jsxs("main",{children:[e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",animationDelay:".1s"},children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:16},children:[e.jsxs("div",{style:{flex:1,minWidth:200,position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",opacity:.4,fontSize:16,pointerEvents:"none"},children:"🔍"}),e.jsx("input",{value:h,onChange:o=>N(o.target.value),placeholder:"Document search karo...",style:{width:"100%",padding:"10px 14px 10px 38px",border:"2px solid #e2e8f0",borderRadius:10,fontSize:14,fontFamily:"inherit",background:"#f8fafc",outline:"none",boxSizing:"border-box",transition:"border-color .2s"},onFocus:o=>o.target.style.borderColor=k,onBlur:o=>o.target.style.borderColor="#e2e8f0"})]}),e.jsxs("div",{style:{display:"flex",gap:7},children:[["grid","list"].map(o=>e.jsx("button",{className:"doc-fb",onClick:()=>z(o),style:{padding:"9px 16px",borderRadius:9,border:`2px solid ${w===o?m:"#e2e8f0"}`,background:w===o?m:"transparent",color:w===o?"#fff":"#718096",fontWeight:700,fontSize:12.5},children:o==="grid"?"⊞ Grid":"☰ List"},o)),e.jsx("span",{style:{background:"#f0f4ff",color:m,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800,alignSelf:"center"},children:c.length})]})]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"YEAR:"}),i.map(o=>e.jsx("button",{className:"doc-fb",onClick:()=>f(String(o)),style:{padding:"4px 14px",borderRadius:20,border:`2px solid ${d===String(o)?k:"#e2e8f0"}`,background:d===String(o)?k:"transparent",color:d===String(o)?m:"#718096",fontWeight:700,fontSize:12.5},children:o},o))]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"MONTH:"}),["All",...me].map(o=>e.jsx("button",{className:"doc-fb",onClick:()=>v(o),style:{padding:"4px 10px",borderRadius:7,border:`1.5px solid ${p===o?m:"#e2e8f0"}`,background:p===o?m:"transparent",color:p===o?"#fff":"#718096",fontWeight:600,fontSize:12},children:o},o))]}),e.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"TYPE:"}),It.map(o=>{const u=ee[o]||{bg:"#f4f7fa",text:"#4a5568",border:"#e2e8f0"};return e.jsxs("button",{className:"doc-fb",onClick:()=>y(o),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${a===o?u.border:"#e2e8f0"}`,background:a===o?u.bg:"transparent",color:a===o?u.text:"#718096",fontWeight:700,fontSize:12},children:[o!=="All"&&(ee[o]?.icon||"📄")+" ",o]},o)}),(d!=="All"||p!=="All"||a!=="All"||h)&&e.jsx("button",{className:"doc-fb",onClick:()=>{f("All"),v("All"),y("All"),N("")},style:{padding:"4px 12px",borderRadius:20,border:"2px solid #FEB2B2",background:"#FFF5F5",color:"#e53e3e",fontWeight:700,fontSize:12},children:"✕ Clear"})]})]}),e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",marginTop:"30px",animationDelay:".2s"},children:[e.jsxs("h2",{className:"section-heading",children:["📚 Official Documents (",c.length,")"]}),e.jsx("div",{className:"heading-underline"}),x?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[e.jsx("div",{style:{width:40,height:40,border:`4px solid ${k}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"Documents load ho rahe hain..."})]}):c.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"50px 20px"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"📂"}),e.jsx("h3",{style:{color:m,fontWeight:800,margin:"0 0 6px"},children:"Koi document nahi mila"}),e.jsx("p",{style:{color:"#718096",fontSize:13.5},children:"Filter ya search change karo"})]}):w==="grid"?e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18},children:c.map(o=>{const u=ee[o.type]||ee.Document;return e.jsxs("div",{className:"doc-card-hover",style:{background:"#fff",borderRadius:14,overflow:"hidden",boxShadow:"0 4px 16px rgba(11,31,78,.06)",border:"1px solid #edf2f7"},children:[e.jsx("div",{style:{height:5,background:`linear-gradient(90deg,${m},${k})`}}),e.jsxs("div",{style:{padding:"18px 20px 16px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14},children:[e.jsx("div",{style:{width:50,height:50,borderRadius:12,background:u.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,border:`1px solid ${u.border}`},children:u.icon}),e.jsx("span",{style:{background:u.bg,color:u.text,border:`1px solid ${u.border}`,padding:"3px 11px",borderRadius:20,fontSize:11.5,fontWeight:700},children:o.type||"Document"})]}),e.jsx("h3",{style:{margin:"0 0 7px",fontSize:14.5,fontWeight:800,color:m,lineHeight:1.4},children:o.title}),e.jsxs("p",{style:{margin:"0 0 16px",fontSize:12,color:"#a0aec0",fontWeight:600},children:["📅 ",ze(o.createdAt)]}),e.jsx("a",{href:o.link,target:"_blank",rel:"noreferrer",className:"dl-btn-hover",style:{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:m,color:"#fff",padding:"10px 16px",borderRadius:9,fontSize:13.5,fontWeight:700,textDecoration:"none",border:"none"},children:"⬇️ Download / View"})]})]},o.id)})}):Object.entries(l).sort((o,u)=>u[0]-o[0]).map(([o,u])=>e.jsxs("div",{style:{marginBottom:28},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg,#16213e,#0a3d62)",color:k,borderRadius:8,padding:"5px 16px",fontWeight:800,fontSize:12.5,whiteSpace:"nowrap"},children:["📂 ",o]}),e.jsx("div",{style:{flex:1,height:1,background:"linear-gradient(90deg,#0f346044,transparent)"}}),e.jsxs("span",{style:{fontSize:11.5,color:"#a0aec0",fontWeight:700},children:[u.length," file",u.length>1?"s":""]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:u.map(S=>{const D=ee[S.type]||ee.Document;return e.jsxs("div",{className:"doc-row-hover",style:{background:"#fff",borderRadius:11,padding:"13px 16px",display:"flex",alignItems:"center",gap:13,border:"1px solid #edf2f7",boxShadow:"0 2px 8px rgba(11,31,78,.04)"},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:10,background:D.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:21,flexShrink:0,border:`1px solid ${D.border}`},children:D.icon}),e.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[e.jsx("div",{style:{fontWeight:700,fontSize:14.5,color:m,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:S.title}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:4,alignItems:"center"},children:[e.jsx("span",{style:{background:D.bg,color:D.text,border:`1px solid ${D.border}`,padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700},children:S.type||"Document"}),e.jsxs("span",{style:{fontSize:12,color:"#a0aec0"},children:["📅 ",ze(S.createdAt)]})]})]}),e.jsx("a",{href:S.link,target:"_blank",rel:"noreferrer",className:"dl-btn-hover",style:{display:"inline-flex",alignItems:"center",gap:6,background:m,color:"#fff",padding:"9px 18px",borderRadius:9,fontSize:13,fontWeight:700,textDecoration:"none",flexShrink:0,whiteSpace:"nowrap"},children:"⬇️ Open"})]},S.id)})})]},o))]})]})}),e.jsx("style",{children:`
        .download-btn { display:inline-block; background:#f8fafc; color:${m}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .download-btn:hover { background:${m}; color:#fff; border-color:${m}; }
      `})]})}const $t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Mt=["All","WORKSHOP","SEMINAR","CULTURAL","SPORTS","NSS","NCC","ACADEMIC"],se={WORKSHOP:{icon:"🛠️",grad:"linear-gradient(135deg,#667eea,#764ba2)",light:"#FAF5FF",text:"#44337a",border:"#E9D8FD",color:"#805ad5"},SEMINAR:{icon:"🎤",grad:"linear-gradient(135deg,#f093fb,#f5576c)",light:"#FFF5F5",text:"#742a2a",border:"#FEB2B2",color:"#e53e3e"},CULTURAL:{icon:"🎭",grad:"linear-gradient(135deg,#4facfe,#00f2fe)",light:"#EBF8FF",text:"#1a365d",border:"#BED0FF",color:"#3182ce"},SPORTS:{icon:"🏆",grad:"linear-gradient(135deg,#43e97b,#38f9d7)",light:"#F0FFF4",text:"#1c4532",border:"#9AE6B4",color:"#38a169"},NSS:{icon:"🤝",grad:"linear-gradient(135deg,#fa709a,#fee140)",light:"#FFFBEB",text:"#744210",border:"#FAF089",color:"#d69e2e"},NCC:{icon:"🎖️",grad:"linear-gradient(135deg,#a18cd1,#fbc2eb)",light:"#FAF5FF",text:"#44337a",border:"#E9D8FD",color:"#805ad5"},ACADEMIC:{icon:"📚",grad:"linear-gradient(135deg,#a18cd1,#fbc2eb)",light:"#FAF5FF",text:"#44337a",border:"#E9D8FD",color:"#805ad5"}},Ce=t=>t?.toDate?t.toDate():new Date(t||Date.now());function Bt(){const[t,s]=n.useState([]),[x,j]=n.useState(!0),[d,f]=n.useState("upcoming"),[p,v]=n.useState("All"),[a,y]=n.useState("All"),[h,N]=n.useState("All"),[w,z]=n.useState(""),[m,k]=n.useState(null),i=g.navy,r=g.gold;n.useEffect(()=>{window.scrollTo(0,0);const b=_(X(O,"events"),K("createdAt","desc"));return P(b,I=>{s(I.docs.map(C=>({id:C.id,...C.data()}))),j(!1)})},[]);const c=n.useMemo(()=>t.filter(b=>b.status==="upcoming"),[t]),l=n.useMemo(()=>t.filter(b=>b.status!=="upcoming"),[t]),o=n.useMemo(()=>{const b=new Set(t.map(I=>Ce(I.createdAt).getFullYear()));return["All",...Array.from(b).sort((I,C)=>C-I)]},[t]),u=n.useMemo(()=>t.filter(b=>!(d==="upcoming"&&b.status!=="upcoming"||d==="past"&&b.status==="upcoming"||p!=="All"&&b.type!==p||a!=="All"&&Ce(b.createdAt).getFullYear()!==Number(a)||h!=="All"&&(b.month||"").toUpperCase()!==h.toUpperCase()||w&&!b.title?.toLowerCase().includes(w.toLowerCase()))),[t,d,p,a,h,w]),S=n.useMemo(()=>{const b={};return u.forEach(I=>{const C=I.month||"Other";b[C]||(b[C]=[]),b[C].push(I)}),b},[u]),D=c[0];return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes glow{0%,100%{box-shadow:0 8px 28px rgba(11,31,78,.1)}50%{box-shadow:0 8px 28px rgba(201,162,39,.25)}}
        .evt-fb{border:none;font-family:inherit;cursor:pointer;transition:all .15s}
        .evt-card{transition:all .22s}
        .evt-card:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(11,31,78,.13)!important}
        .evt-upcoming{animation:glow 3s ease-in-out infinite}
        .evt-img{transition:transform .4s}
        .evt-card:hover .evt-img{transform:scale(1.06)}
      `}),e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"🏛️ Campus Events"}),e.jsx("p",{className:"hero-subtitle",children:"Workshops, seminars, cultural fests aur khel-kud — saari activities ek jagah"})]})]}),e.jsx("div",{style:{maxWidth:"1000px",margin:"-80px auto 40px",padding:"20px",position:"relative",zIndex:10,background:"rgba(255,255,255,0.8)",backdropFilter:"blur(10px)",borderRadius:"16px",boxShadow:"0 10px 30px rgba(0,0,0,0.1)"},children:e.jsx("div",{style:{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"},children:[{val:t.length,label:"Total Events",icon:"📆"},{val:c.length,label:"Upcoming",icon:"🔜",hi:!0},{val:l.length,label:"Past Events",icon:"📜"},{val:[...new Set(t.map(b=>b.type))].filter(Boolean).length,label:"Types",icon:"🏷️"}].map((b,I)=>e.jsxs("div",{style:{background:b.hi?"#fffbeb":"#fff",border:`1px solid ${b.hi?r:"#e2e8f0"}`,borderRadius:11,padding:"10px 20px",textAlign:"center",transition:"all .2s",flex:1,minWidth:"150px"},children:[e.jsx("span",{style:{display:"block",fontSize:17},children:b.icon}),e.jsx("div",{style:{fontSize:24,fontWeight:900,color:b.hi?r:i,lineHeight:1,marginTop:2},children:b.val}),e.jsx("div",{style:{fontSize:11,color:"#64748b",marginTop:2,fontWeight:600},children:b.label})]},I))})}),e.jsx("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"0 20px"},children:e.jsxs("main",{children:[D&&e.jsx("section",{className:"glass-panel profile-section anim-slide-up",style:{padding:"18px 22px",animationDelay:".05s",border:`2px solid ${r}44`},children:(()=>{const b=se[D.type]||{icon:"🏆",grad:`linear-gradient(135deg,${i},#1a3a7c)`,light:"#EBF0FF",text:"#1a365d"};return e.jsxs("div",{style:{display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:11,fontWeight:900,color:r,letterSpacing:1.5,textTransform:"uppercase",flexShrink:0},children:"⭐ Featured"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,background:`linear-gradient(135deg,${i},#1a3a7c)`,borderRadius:13,padding:"14px 20px",flex:1,minWidth:260},children:[e.jsx("div",{style:{width:50,height:50,borderRadius:11,background:b.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0},children:b.icon}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:5,flexWrap:"wrap"},children:[e.jsx("span",{style:{background:b.light,color:b.text,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:700},children:D.type}),D.day&&e.jsxs("span",{style:{background:`${r}22`,color:r,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:700},children:["📅 ",D.day," ",D.month]})]}),e.jsx("h3",{style:{margin:0,fontSize:17,fontWeight:800,color:"#fff"},children:D.title}),e.jsxs("p",{style:{margin:"3px 0 0",fontSize:12.5,color:"rgba(255,255,255,.55)"},children:["📍 ",D.location||"College Campus"]})]})]})]})})()}),e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",marginTop:"30px",animationDelay:".1s"},children:[e.jsx("div",{style:{display:"flex",gap:3,marginBottom:16,background:"#f4f7fa",borderRadius:11,padding:3,width:"fit-content"},children:[{id:"upcoming",label:"🔜 Upcoming",count:c.length},{id:"all",label:"📆 All",count:t.length},{id:"past",label:"📜 Past",count:l.length}].map(b=>e.jsxs("button",{className:"evt-fb",onClick:()=>f(b.id),style:{padding:"8px 18px",borderRadius:9,background:d===b.id?i:"transparent",color:d===b.id?"#fff":"#718096",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:7},children:[b.label,e.jsx("span",{style:{background:d===b.id?r:"#e2e8f0",color:d===b.id?i:"#718096",borderRadius:20,padding:"1px 8px",fontSize:11.5,fontWeight:800},children:b.count})]},b.id))}),e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:12},children:[e.jsxs("div",{style:{flex:1,minWidth:200,position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",opacity:.4,fontSize:16,pointerEvents:"none"},children:"🔍"}),e.jsx("input",{value:w,onChange:b=>z(b.target.value),placeholder:"Event search karo...",style:{width:"100%",padding:"10px 14px 10px 38px",border:"2px solid #e2e8f0",borderRadius:10,fontSize:14,fontFamily:"inherit",background:"#f8fafc",outline:"none",boxSizing:"border-box",transition:"border-color .2s"},onFocus:b=>b.target.style.borderColor=r,onBlur:b=>b.target.style.borderColor="#e2e8f0"})]}),e.jsxs("span",{style:{background:"#f0f4ff",color:i,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800},children:[u.length," events"]})]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"TYPE:"}),Mt.map(b=>{const I=se[b]||{light:"#f4f7fa",text:"#4a5568",border:"#e2e8f0"};return e.jsxs("button",{className:"evt-fb",onClick:()=>v(b),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${p===b&&I.border||"#e2e8f0"}`,background:p===b?I.light:"transparent",color:p===b?I.text:"#718096",fontWeight:700,fontSize:12},children:[b!=="All"&&(se[b]?.icon||"")+" ",b]},b)})]}),e.jsxs("div",{style:{display:"flex",gap:14,flexWrap:"wrap",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"YEAR:"}),o.map(b=>e.jsx("button",{className:"evt-fb",onClick:()=>y(String(b)),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${a===String(b)?r:"#e2e8f0"}`,background:a===String(b)?r:"transparent",color:a===String(b)?i:"#718096",fontWeight:700,fontSize:12},children:b},b))]}),e.jsxs("div",{style:{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"MONTH:"}),["All",...$t].map(b=>e.jsx("button",{className:"evt-fb",onClick:()=>N(b),style:{padding:"3px 9px",borderRadius:6,border:`1.5px solid ${h===b?i:"#e2e8f0"}`,background:h===b?i:"transparent",color:h===b?"#fff":"#718096",fontWeight:600,fontSize:11.5},children:b},b))]}),(p!=="All"||a!=="All"||h!=="All"||w)&&e.jsx("button",{className:"evt-fb",onClick:()=>{v("All"),y("All"),N("All"),z("")},style:{padding:"4px 12px",borderRadius:20,border:"2px solid #FEB2B2",background:"#FFF5F5",color:"#e53e3e",fontWeight:700,fontSize:12},children:"✕ Clear"})]})]}),e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",marginTop:"30px",animationDelay:".2s"},children:[e.jsxs("h2",{className:"section-heading",children:["📅 Events (",u.length,")"]}),e.jsx("div",{className:"heading-underline"}),x?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[e.jsx("div",{style:{width:40,height:40,border:`4px solid ${r}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"Events load ho rahe hain..."})]}):u.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"50px 20px"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"🎭"}),e.jsx("h3",{style:{color:i,fontWeight:800,margin:"0 0 6px"},children:"Koi event nahi mila"}),e.jsx("p",{style:{color:"#718096",fontSize:13.5},children:"Tab ya filter change karo"})]}):Object.entries(S).map(([b,I])=>e.jsxs("div",{style:{marginBottom:32},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:18},children:[e.jsxs("div",{style:{background:`linear-gradient(135deg,${i},#1a3a7c)`,color:r,borderRadius:9,padding:"6px 18px",fontWeight:900,fontSize:13.5,whiteSpace:"nowrap",boxShadow:`0 4px 14px ${i}22`},children:["📅 ",b]}),e.jsx("div",{style:{flex:1,height:2,background:`linear-gradient(90deg,${r}44,transparent)`}}),e.jsxs("span",{style:{fontSize:11.5,color:"#a0aec0",fontWeight:700},children:[I.length," event",I.length>1?"s":""]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18},children:I.map(C=>{const B=se[C.type]||{icon:"🏆",grad:`linear-gradient(135deg,${i},#1a3a7c)`,light:"#EBF0FF",text:"#1a365d"},q=C.status==="upcoming",Q=m===C.id,V=(C.desc||"").replace(/<[^>]*>/g,"");return e.jsxs("div",{className:`evt-card${q?" evt-upcoming":""}`,style:{background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:q?"0 8px 28px rgba(11,31,78,.1)":"0 4px 16px rgba(11,31,78,.06)",border:q?`2px solid ${r}`:"1px solid #edf2f7",position:"relative"},children:[C.imageUrl?e.jsxs("div",{style:{height:190,position:"relative",overflow:"hidden"},children:[e.jsx("img",{src:C.imageUrl,alt:C.title,className:"evt-img",style:{width:"100%",height:"100%",objectFit:"cover"},onError:A=>{A.target.parentElement.style.background=B.grad,A.target.style.display="none"}}),e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 50%,rgba(11,31,78,.75))"}}),e.jsxs("div",{style:{position:"absolute",top:12,left:12,background:"rgba(255,255,255,.92)",borderRadius:9,padding:"6px 10px",textAlign:"center",backdropFilter:"blur(4px)",minWidth:44},children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,color:"#718096",textTransform:"uppercase"},children:C.month}),e.jsx("div",{style:{fontSize:20,fontWeight:900,color:i,lineHeight:1},children:C.day||"?"})]}),e.jsxs("span",{style:{position:"absolute",top:12,right:12,background:B.light,color:B.text,padding:"4px 12px",borderRadius:20,fontSize:11.5,fontWeight:700},children:[B.icon," ",C.type]})]}):e.jsx("div",{style:{background:B.grad,padding:"20px 18px 16px"},children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{style:{background:"rgba(255,255,255,.22)",borderRadius:9,padding:"7px 10px",textAlign:"center",backdropFilter:"blur(4px)",minWidth:44},children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,color:"rgba(255,255,255,.7)",textTransform:"uppercase"},children:C.month||"?"}),e.jsx("div",{style:{fontSize:22,fontWeight:900,color:"#fff",lineHeight:1},children:C.day||"?"})]}),e.jsxs("span",{style:{background:"rgba(255,255,255,.22)",color:"#fff",padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:700,backdropFilter:"blur(4px)"},children:[B.icon," ",C.type]})]})}),q&&e.jsx("div",{style:{background:"linear-gradient(135deg,#f6ad55,#ed8936)",color:"#fff",textAlign:"center",padding:"3px 0",fontSize:10.5,fontWeight:900,letterSpacing:.8},children:"🔜 UPCOMING EVENT"}),e.jsxs("div",{style:{padding:"16px 18px 18px"},children:[e.jsx("h3",{style:{margin:"0 0 6px",fontSize:15.5,fontWeight:800,color:i,lineHeight:1.35},children:C.title}),e.jsxs("p",{style:{margin:"0 0 10px",fontSize:12.5,color:"#718096",display:"flex",alignItems:"center",gap:5},children:[e.jsx("span",{children:"📍"})," ",C.location||"College Campus"]}),V&&e.jsxs(e.Fragment,{children:[e.jsx("p",{style:{margin:0,fontSize:13,color:"#4a5568",lineHeight:1.65},children:Q?V:V.substring(0,100)+(V.length>100?"…":"")}),V.length>100&&e.jsx("button",{onClick:()=>k(Q?null:C.id),style:{background:"none",border:"none",color:r,fontWeight:800,fontSize:12.5,cursor:"pointer",padding:"6px 0 0",fontFamily:"inherit"},children:Q?"▲ Less":"▼ Read More"})]}),C.reportLink&&e.jsx("a",{href:C.reportLink,target:"_blank",rel:"noreferrer",className:"download-btn",style:{marginTop:12,display:"inline-flex",alignItems:"center",gap:6},children:"📄 PDF Report"})]})]},C.id)})})]},b))]})]})}),e.jsx("style",{children:`
        .download-btn { display:inline-block; background:#f8fafc; color:${i}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .download-btn:hover { background:${i}; color:#fff; border-color:${i}; }
      `})]})}const Lt=t=>{try{return new Date(t).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}catch{return""}},Pt=t=>{if(!t)return"";const s=t.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);if(!s)return"";const x=parseInt(s[1]||0),j=parseInt(s[2]||0),d=parseInt(s[3]||0);return x>0?`${x}:${String(j).padStart(2,"0")}:${String(d).padStart(2,"0")}`:`${j}:${String(d).padStart(2,"0")}`},he=t=>{if(!t)return"0";const s=parseInt(t);return s>=1e6?(s/1e6).toFixed(1)+"M":s>=1e3?(s/1e3).toFixed(1)+"K":String(s)};function Ot(){const[t,s]=n.useState(null),[x,j]=n.useState([]),[d,f]=n.useState(!1),[p,v]=n.useState(""),[a,y]=n.useState(null),[h,N]=n.useState("all"),w=g.navy,z=g.gold;n.useEffect(()=>(window.scrollTo(0,0),P(pe(O,"settings","youtube"),r=>{r.exists()&&s(r.data())})),[]);const m=n.useCallback(async()=>{if(!(!t?.apiKey||!t?.channelId)){f(!0),v("");try{const{apiKey:r,channelId:c,maxResults:l=12}=t,u=await(await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${c}&key=${r}`)).json();if(u.error)throw new Error(u.error.message);const S=u.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;if(!S)throw new Error("Channel not found or no uploads");const b=await(await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${S}&maxResults=${l}&key=${r}`)).json();if(b.error)throw new Error(b.error.message);const I=b.items.map(q=>q.snippet.resourceId.videoId).join(","),B=await(await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${I}&key=${r}`)).json();if(B.error)throw new Error(B.error.message);j(B.items||[])}catch(r){v(r.message)}f(!1)}},[t]);n.useEffect(()=>{!t?.apiKey||!t?.channelId||m()},[t,m]);const k=["all","seminar","cultural","sports","nss","ncc","workshop"],i=h==="all"?x:x.filter(r=>r.snippet?.title?.toLowerCase().includes(h)||r.snippet?.description?.toLowerCase().includes(h));return e.jsxs("div",{children:[e.jsx("style",{children:`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes yt-fadein { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .yt-card { transition:all .25s; border-radius:16px; overflow:hidden; background:#fff; box-shadow:0 4px 16px rgba(11,31,78,.07); border:1px solid #edf2f7; animation:yt-fadein .4s ease both; }
        .yt-card:hover { transform:translateY(-5px); box-shadow:0 14px 36px rgba(11,31,78,.13)!important; }
        .yt-thumb { position:relative; aspect-ratio:16/9; overflow:hidden; }
        .yt-thumb img { width:100%; height:100%; object-fit:cover; transition:transform .4s; }
        .yt-card:hover .yt-thumb img { transform:scale(1.06); }
        .yt-play { position:absolute; inset:0; background:rgba(11,31,78,.45); display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity .2s; }
        .yt-card:hover .yt-play { opacity:1; }
        .yt-filter-btn { border:none; font-family:inherit; cursor:pointer; transition:all .15s; }
      `}),e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsxs("nav",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:14,fontSize:13,fontWeight:600},children:[e.jsx(Y,{to:"/",style:{color:"rgba(255,255,255,.55)",textDecoration:"none"},children:"🏠 Home"}),e.jsx("span",{style:{color:"rgba(255,255,255,.3)"},children:"›"}),e.jsx("span",{style:{color:z},children:"Video Gallery"})]}),e.jsx("h1",{className:"hero-title",children:"▶ Video Gallery"}),e.jsx("p",{className:"hero-subtitle",children:"College ke latest events, seminars aur cultural programs — YouTube se live"}),e.jsx("div",{style:{display:"flex",gap:14,flexWrap:"wrap",marginTop:22},children:[{val:x.length,label:"Videos"},{val:he(x.reduce((r,c)=>r+parseInt(c.statistics?.viewCount||0),0)),label:"Total Views"},{val:x.filter(r=>parseInt(r.statistics?.likeCount)>0).length,label:"With Likes"}].map((r,c)=>e.jsxs("div",{style:{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.18)",borderRadius:11,padding:"10px 20px",textAlign:"center",backdropFilter:"blur(8px)"},children:[e.jsx("div",{style:{fontSize:24,fontWeight:900,color:z,lineHeight:1},children:r.val}),e.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,.55)",marginTop:3},children:r.label})]},c))})]})]}),e.jsx("div",{style:{maxWidth:1280,margin:"0 auto",padding:"40px 20px"},children:t?.apiKey?d?e.jsxs("div",{style:{textAlign:"center",padding:"80px 20px"},children:[e.jsx("div",{style:{width:48,height:48,border:`4px solid ${z}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"YouTube se videos fetch ho rahi hain..."})]}):p?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px",background:"#fff5f5",borderRadius:16,border:"1px solid #fed7d7"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:12},children:"⚠️"}),e.jsx("h3",{style:{color:"#c53030",margin:"0 0 8px"},children:"API Error"}),e.jsx("p",{style:{color:"#718096"},children:p}),e.jsx("button",{onClick:m,style:{marginTop:16,padding:"10px 24px",background:w,color:"#fff",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer",fontSize:14,fontFamily:"inherit"},children:"🔄 Retry"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:32,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8},children:"FILTER:"}),k.map(r=>e.jsx("button",{className:"yt-filter-btn",onClick:()=>N(r),style:{padding:"6px 16px",borderRadius:20,border:`2px solid ${h===r?w:"#e2e8f0"}`,background:h===r?w:"transparent",color:h===r?"#fff":"#718096",fontWeight:700,fontSize:12.5,textTransform:"capitalize"},children:r==="all"?"🎬 All":r.charAt(0).toUpperCase()+r.slice(1)},r)),e.jsxs("span",{style:{marginLeft:"auto",background:"#f0f4ff",color:w,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800},children:[i.length," videos"]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:24},children:i.map((r,c)=>{const l=r.id,o=r.snippet||{},u=r.statistics||{},S=r.contentDetails||{},D=a===l;return e.jsxs("div",{className:"yt-card",style:{animationDelay:`${c*.06}s`},children:[e.jsx("div",{className:"yt-thumb",onClick:()=>y(D?null:l),style:{cursor:"pointer"},children:D?e.jsx("iframe",{src:`https://www.youtube.com/embed/${l}?autoplay=1`,title:o.title,allow:"autoplay; encrypted-media",allowFullScreen:!0,style:{width:"100%",height:"100%",border:"none",position:"absolute",inset:0}}):e.jsxs(e.Fragment,{children:[e.jsx("img",{src:o.thumbnails?.maxres?.url||o.thumbnails?.high?.url||o.thumbnails?.medium?.url,alt:o.title}),e.jsx("div",{className:"yt-play",children:e.jsx("div",{style:{width:56,height:56,borderRadius:"50%",background:"#ff0000",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(255,0,0,.4)"},children:e.jsx("span",{style:{color:"#fff",fontSize:20,marginLeft:4},children:"▶"})})}),S.duration&&e.jsx("div",{style:{position:"absolute",bottom:8,right:8,background:"rgba(0,0,0,.8)",color:"#fff",fontSize:11.5,fontWeight:700,padding:"3px 7px",borderRadius:5},children:Pt(S.duration)})]})}),e.jsxs("div",{style:{padding:"16px 18px 18px"},children:[e.jsx("h3",{style:{margin:"0 0 8px",fontSize:15,fontWeight:800,color:w,lineHeight:1.4,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},children:o.title}),e.jsxs("p",{style:{margin:"0 0 12px",fontSize:12,color:"#a0aec0",fontWeight:600},children:["📅 ",Lt(o.publishedAt)]}),e.jsxs("div",{style:{display:"flex",gap:14,fontSize:12,color:"#718096",fontWeight:700},children:[e.jsxs("span",{children:["👁 ",he(u.viewCount)," views"]}),e.jsxs("span",{children:["👍 ",he(u.likeCount)]}),e.jsx("span",{style:{marginLeft:"auto"},children:e.jsx("a",{href:`https://youtube.com/watch?v=${l}`,target:"_blank",rel:"noreferrer",style:{color:"#ff0000",fontWeight:800,textDecoration:"none",fontSize:12},children:"▶ YouTube →"})})]})]})]},l)})}),i.length===0&&e.jsxs("div",{style:{textAlign:"center",padding:"50px",color:"#a0aec0"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"🎬"}),e.jsx("p",{style:{fontWeight:600},children:"Is category mein koi video nahi"})]}),t?.channelId&&e.jsx("div",{style:{textAlign:"center",marginTop:40},children:e.jsx("a",{href:`https://youtube.com/channel/${t.channelId}`,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:10,background:"#ff0000",color:"#fff",padding:"14px 32px",borderRadius:50,fontWeight:900,fontSize:15,textDecoration:"none",boxShadow:"0 6px 20px rgba(255,0,0,.35)",transition:"all .2s"},onMouseEnter:r=>{r.currentTarget.style.transform="translateY(-3px)",r.currentTarget.style.boxShadow="0 10px 28px rgba(255,0,0,.45)"},onMouseLeave:r=>{r.currentTarget.style.transform="",r.currentTarget.style.boxShadow="0 6px 20px rgba(255,0,0,.35)"},children:"▶ Subscribe to Our Channel"})})]}):e.jsxs("div",{style:{textAlign:"center",padding:"80px 20px",background:"#fff",borderRadius:20,boxShadow:"0 8px 30px rgba(11,31,78,.07)"},children:[e.jsx("div",{style:{fontSize:60,marginBottom:16},children:"📺"}),e.jsx("h2",{style:{color:w,fontWeight:900,margin:"0 0 8px"},children:"YouTube Setup Required"}),e.jsx("p",{style:{color:"#64748b",fontSize:15},children:"Admin Panel → YouTube Manager tab → API Key aur Channel ID add karein."})]})})]})}function Yt(){const[t,s]=n.useState([]),[x,j]=n.useState(()=>{try{return JSON.parse(sessionStorage.getItem("gnc_dismissed_alerts")||"[]")}catch{return[]}}),[d,f]=n.useState(!1),[p,v]=n.useState(0),[a,y]=n.useState(0),h=g.navy;n.useEffect(()=>{const m=_(X(O,"alerts"),Ye("isActive","==",!0));return P(m,k=>{const i=k.docs.map(r=>({id:r.id,...r.data()}));s(i)})},[]),n.useEffect(()=>{if(t.length===0||t.filter(i=>!x.includes(i.id)).length===0)return;v(0);const k=setTimeout(()=>f(!0),1200);return()=>clearTimeout(k)},[t]),n.useEffect(()=>{if(t.length<=1)return;const m=setInterval(()=>y(k=>(k+1)%t.length),4e3);return()=>clearInterval(m)},[t.length]);const N=m=>{const k=[...x,m];j(k);try{sessionStorage.setItem("gnc_dismissed_alerts",JSON.stringify(k))}catch{}t.filter(r=>!k.includes(r.id)).length>0?v(0):f(!1)},w=t.filter(m=>!x.includes(m.id)),z=w[p];return t.length===0?null:e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{background:"linear-gradient(90deg, #dc2626, #b91c1c, #dc2626)",color:"#fff",padding:"8px 0",overflow:"hidden",borderBottom:"2px solid #991b1b",zIndex:9998,position:"relative"},children:[e.jsx("style",{children:`
          @keyframes gnc-scroll {
            0%   { transform: translateX(100vw); }
            100% { transform: translateX(-100%); }
          }
          .gnc-alert-scroll {
            display: inline-block;
            white-space: nowrap;
            animation: gnc-scroll 18s linear infinite;
          }
          .gnc-alert-scroll:hover { animation-play-state: paused; }
        `}),e.jsxs("div",{className:"gnc-alert-scroll",style:{fontSize:13.5,fontWeight:700,letterSpacing:.3},children:["🚨  ",t.map((m,k)=>e.jsxs("span",{children:[m.text,k<t.length-1&&e.jsx("span",{style:{margin:"0 32px",opacity:.5},children:"•"})]},m.id)),"      "]})]}),d&&z&&e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:999999,background:"rgba(10,15,30,.75)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20},children:[e.jsx("style",{children:`
            @keyframes gnc-pop {
              from { opacity: 0; transform: scale(.88) translateY(20px); }
              to   { opacity: 1; transform: scale(1)  translateY(0);    }
            }
            .gnc-popup { animation: gnc-pop .35s cubic-bezier(.34,1.56,.64,1) both; }
            @keyframes gnc-ring {
              0%,100% { transform: rotate(-8deg); }
              50%     { transform: rotate( 8deg); }
            }
            .gnc-bell { display: inline-block; animation: gnc-ring .6s ease-in-out 3; }
          `}),e.jsxs("div",{className:"gnc-popup",style:{background:"#fff",borderRadius:20,maxWidth:520,width:"100%",boxShadow:"0 30px 80px rgba(0,0,0,.4)",overflow:"hidden"},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, #dc2626, #991b1b)",padding:"22px 28px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsx("span",{className:"gnc-bell",style:{fontSize:28},children:"🔔"}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"#fff",fontWeight:900,fontSize:17,letterSpacing:-.3},children:"Urgent Notice"}),e.jsx("div",{style:{color:"rgba(255,255,255,.6)",fontSize:12,marginTop:2},children:"Guru Nanak College, Dhanbad"})]})]}),e.jsx("button",{onClick:()=>f(!1),style:{background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.25)",color:"#fff",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s"},onMouseEnter:m=>m.currentTarget.style.background="rgba(255,255,255,.3)",onMouseLeave:m=>m.currentTarget.style.background="rgba(255,255,255,.15)",children:"✕"})]}),e.jsxs("div",{style:{padding:"28px 30px"},children:[e.jsx("p",{style:{fontSize:15.5,color:"#1e293b",lineHeight:1.75,fontWeight:500,margin:"0 0 24px"},children:z.text}),w.length>1&&e.jsx("div",{style:{display:"flex",gap:6,marginBottom:20},children:w.map((m,k)=>e.jsx("div",{onClick:()=>v(k),style:{width:k===p?20:8,height:8,borderRadius:4,background:k===p?"#dc2626":"#e2e8f0",cursor:"pointer",transition:"all .3s"}},m.id))}),e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsx("button",{onClick:()=>N(z.id),style:{flex:1,padding:"12px 20px",borderRadius:10,background:`linear-gradient(135deg, ${h}, #1a3a7c)`,color:"#fff",border:"none",fontWeight:800,fontSize:14,cursor:"pointer",transition:"all .2s"},onMouseEnter:m=>m.currentTarget.style.opacity=".9",onMouseLeave:m=>m.currentTarget.style.opacity="1",children:"✓ Acknowledged"}),e.jsx("button",{onClick:()=>f(!1),style:{padding:"12px 18px",borderRadius:10,background:"#f8fafc",color:"#64748b",border:"1px solid #e2e8f0",fontWeight:700,fontSize:14,cursor:"pointer"},children:"Later"})]})]})]})]})]})}function Ae({faculties:t,staffType:s}){const[x,j]=n.useState(""),[d,f]=n.useState("All");n.useEffect(()=>{window.scrollTo(0,0)},[s]);const p=n.useMemo(()=>(t||[]).filter(a=>!((a.staffType||"Teaching")!==s||d!=="All"&&a.dept!==d||x&&!a.name.toLowerCase().includes(x.toLowerCase()))),[t,s,d,x]),v=n.useMemo(()=>{const a=new Set((t||[]).filter(y=>(y.staffType||"Teaching")===s).map(y=>y.dept));return["All",...Array.from(a).sort()]},[t,s]);return e.jsxs("div",{style:{minHeight:"100vh",background:"#f8fafc",paddingBottom:"80px"},children:[e.jsxs("header",{style:{background:`linear-gradient(135deg, ${g.navy} 0%, #1a365d 100%)`,padding:"80px 20px 60px",textAlign:"center",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundImage:"radial-gradient(#ffffff 1px, transparent 1px)",backgroundSize:"30px 30px",opacity:.05}}),e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:2},children:[e.jsxs("nav",{style:{display:"flex",justifyContent:"center",gap:"10px",fontSize:"13px",color:"#cbd5e1",fontWeight:600,marginBottom:"20px"},children:[e.jsx(Y,{to:"/",style:{color:"#cbd5e1",textDecoration:"none"},children:"Home"}),e.jsx("span",{children:"›"}),e.jsx("span",{children:"About Us"}),e.jsx("span",{children:"›"}),e.jsxs("span",{style:{color:g.gold},children:[s," Staff"]})]}),e.jsxs("h1",{style:{color:"#fff",fontSize:"42px",fontWeight:900,margin:"0 0 15px"},children:[s," Staff Directory"]}),e.jsxs("p",{style:{color:"#94a3b8",fontSize:"16px",maxWidth:"600px",margin:"0 auto"},children:["Meet our dedicated and highly qualified ",s.toLowerCase()," members who shape the future of Guru Nanak College."]})]})]}),e.jsx("div",{style:{maxWidth:1300,margin:"-30px auto 40px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsxs("div",{style:{background:"#fff",padding:"20px",borderRadius:"16px",boxShadow:"0 10px 30px rgba(15,35,71,0.08)",display:"flex",flexWrap:"wrap",gap:"20px",alignItems:"center",border:"1px solid #e2e8f0"},children:[e.jsxs("div",{style:{flex:1,minWidth:"250px",position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:15,top:"50%",transform:"translateY(-50%)",opacity:.5},children:"🔍"}),e.jsx("input",{type:"text",placeholder:`Search ${s.toLowerCase()} by name...`,value:x,onChange:a=>j(a.target.value),style:{width:"100%",padding:"12px 15px 12px 40px",borderRadius:"10px",border:"2px solid #e2e8f0",outline:"none",fontSize:"14px",fontWeight:600,background:"#f8fafc",boxSizing:"border-box"}})]}),e.jsxs("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"12px",fontWeight:800,color:"#64748b",textTransform:"uppercase"},children:"Department:"}),v.map(a=>e.jsx("button",{onClick:()=>f(a),style:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:700,cursor:"pointer",transition:"all 0.2s",background:d===a?g.navy:"#f1f5f9",color:d===a?"#fff":"#475569",border:`1px solid ${d===a?g.navy:"#cbd5e1"}`},children:a},a))]})]})}),e.jsx("div",{style:{maxWidth:1300,margin:"0 auto",padding:"0 20px"},children:p.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px",background:"#fff",borderRadius:"16px",border:"1px dashed #cbd5e1"},children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"15px"},children:"👨‍🏫"}),e.jsx("h3",{style:{color:g.navy,margin:"0 0 10px"},children:"No Staff Found"}),e.jsx("p",{style:{color:"#64748b"},children:"Try adjusting your search or department filter."})]}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:"30px"},children:p.map(a=>e.jsxs("div",{style:{background:"#fff",borderRadius:"20px",overflow:"hidden",boxShadow:"0 10px 25px rgba(0,0,0,0.04)",border:"1px solid #edf2f7",transition:"transform 0.3s ease, box-shadow 0.3s ease",display:"flex",flexDirection:"column"},onMouseOver:y=>{y.currentTarget.style.transform="translateY(-8px)",y.currentTarget.style.boxShadow="0 20px 40px rgba(15,35,71,0.1)",y.currentTarget.style.borderColor=g.gold},onMouseOut:y=>{y.currentTarget.style.transform="translateY(0)",y.currentTarget.style.boxShadow="0 10px 25px rgba(0,0,0,0.04)",y.currentTarget.style.borderColor="#edf2f7"},children:[e.jsxs("div",{style:{padding:"25px 20px 0",textAlign:"center",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",top:15,right:15,background:"#f0fdf4",color:"#166534",fontSize:"10px",fontWeight:800,padding:"4px 10px",borderRadius:"50px",border:"1px solid #bbf7d0"},children:a.dept}),e.jsx("img",{src:a.imageUrl||"/images/college_photo.jpg",alt:a.name,style:{width:"120px",height:"120px",borderRadius:"50%",objectFit:"cover",border:"4px solid #fff",boxShadow:"0 10px 20px rgba(0,0,0,0.1)",margin:"0 auto"}})]}),e.jsxs("div",{style:{padding:"20px",textAlign:"center",flex:1,display:"flex",flexDirection:"column"},children:[e.jsx("h3",{style:{fontSize:"18px",fontWeight:900,color:g.navy,margin:"0 0 5px"},children:a.name}),e.jsx("div",{style:{fontSize:"13px",color:g.gold,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"15px"},children:a.desig}),e.jsxs("div",{style:{marginTop:"auto",background:"#f8fafc",padding:"12px",borderRadius:"12px",border:"1px solid #e2e8f0"},children:[e.jsx("div",{style:{fontSize:"11px",color:"#64748b",fontWeight:700,textTransform:"uppercase",marginBottom:"4px"},children:"Qualification"}),e.jsx("div",{style:{fontSize:"13px",color:g.navy,fontWeight:600},children:a.qual})]})]})]},a.id))})})]})}const ne=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Gt=["All","News","Achievement","Update","Result","Scholarship"],ae={News:{bg:"#EBF0FF",text:"#1a365d",border:"#BED0FF",dot:"#4a7fd4"},Achievement:{bg:"#F0FFF4",text:"#1c4532",border:"#9AE6B4",dot:"#38a169"},Update:{bg:"#FFFBEB",text:"#744210",border:"#FAF089",dot:"#d69e2e"},Result:{bg:"#FFF5F5",text:"#742a2a",border:"#FEB2B2",dot:"#e53e3e"},Scholarship:{bg:"#FAF5FF",text:"#44337a",border:"#E9D8FD",dot:"#805ad5"}},ie=t=>t?.toDate?t.toDate():new Date(t||Date.now()),Ht=t=>{const s=ie(t);return`${s.getDate()} ${ne[s.getMonth()]} ${s.getFullYear()}`},Re=t=>be.sanitize(t||"");function Ut(){const[t,s]=n.useState([]),[x,j]=n.useState(!0),[d,f]=n.useState("All"),[p,v]=n.useState("All"),[a,y]=n.useState("All"),[h,N]=n.useState(""),[w,z]=n.useState("list"),m=g.navy,k=g.gold;n.useEffect(()=>{window.scrollTo(0,0);const l=_(X(O,"announcements"),K("createdAt","desc"));return P(l,o=>{s(o.docs.map(u=>({id:u.id,...u.data()}))),j(!1)})},[]);const i=n.useMemo(()=>{const l=new Set(t.map(o=>ie(o.createdAt).getFullYear()));return["All",...Array.from(l).sort((o,u)=>u-o)]},[t]),r=n.useMemo(()=>t.filter(l=>{const o=ie(l.createdAt);if(d!=="All"&&o.getFullYear()!==Number(d)||p!=="All"&&ne[o.getMonth()]!==p||a!=="All"&&(l.type||"News")!==a)return!1;if(h){const u=h.toLowerCase(),S=l.text?.toLowerCase().includes(u),D=(l.type||"").toLowerCase().includes(u);if(!S&&!D)return!1}return!0}),[t,d,p,a,h]),c=n.useMemo(()=>{const l={};return r.forEach(o=>{const u=ie(o.createdAt),S=`${ne[u.getMonth()]} ${u.getFullYear()}`;l[S]||(l[S]=[]),l[S].push(o)}),l},[r]);return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes spin  { to { transform: rotate(360deg); } }
        .ntf-fb { border: none; font-family: inherit; cursor: pointer; transition: all .15s; }
        .ntf-row-hover { transition: all .15s; }
        .ntf-row-hover:hover { background: #f8fafc !important; transform: translateX(4px); }
        .ntf-card-hover { transition: all .2s; }
        .ntf-card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(11,31,78,.12) !important; }
      `}),e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"📣 News & Updates"}),e.jsx("p",{className:"hero-subtitle",children:"College ke latest achievements, academic news aur recent updates yahan dekhein"})]})]}),e.jsx("div",{style:{maxWidth:"1000px",margin:"-80px auto 40px",padding:"20px",position:"relative",zIndex:10,background:"rgba(255,255,255,0.8)",backdropFilter:"blur(10px)",borderRadius:"16px",boxShadow:"0 10px 30px rgba(0,0,0,0.1)"},children:e.jsx("div",{style:{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"},children:[{val:t.length,label:"Total News"},{val:t.filter(l=>l.type==="Achievement").length,label:"Achievements"},{val:t.filter(l=>l.type==="Result").length,label:"Results"},{val:i.length-1,label:"Active Years"}].map((l,o)=>e.jsxs("div",{style:{background:"#fff",border:"1px solid #e2e8f0",borderRadius:11,padding:"10px 20px",textAlign:"center",flex:1,minWidth:"150px"},children:[e.jsx("div",{style:{fontSize:24,fontWeight:900,color:k,lineHeight:1},children:l.val}),e.jsx("div",{style:{fontSize:11,color:"#64748b",marginTop:3,fontWeight:600},children:l.label})]},o))})}),e.jsx("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"0 20px"},children:e.jsxs("main",{children:[e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)"},children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:16},children:[e.jsxs("div",{style:{flex:1,minWidth:200,position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",opacity:.4,fontSize:16,pointerEvents:"none"},children:"🔍"}),e.jsx("input",{value:h,onChange:l=>N(l.target.value),placeholder:"News search karo...",style:{width:"100%",padding:"10px 14px 10px 38px",border:"2px solid #e2e8f0",borderRadius:10,fontSize:14,fontFamily:"inherit",background:"#f8fafc",outline:"none",boxSizing:"border-box",transition:"border-color .2s"},onFocus:l=>l.target.style.borderColor=k,onBlur:l=>l.target.style.borderColor="#e2e8f0"})]}),e.jsxs("div",{style:{display:"flex",gap:7},children:[["list","card"].map(l=>e.jsx("button",{className:"ntf-fb",onClick:()=>z(l),style:{padding:"9px 16px",borderRadius:9,border:`2px solid ${w===l?m:"#e2e8f0"}`,background:w===l?m:"transparent",color:w===l?"#fff":"#718096",fontWeight:700,fontSize:12.5},children:l==="list"?"☰ List":"⊞ Cards"},l)),e.jsx("span",{style:{background:"#f0f4ff",color:m,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800,alignSelf:"center"},children:r.length})]})]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"YEAR:"}),i.map(l=>e.jsx("button",{className:"ntf-fb",onClick:()=>f(String(l)),style:{padding:"4px 14px",borderRadius:20,border:`2px solid ${d===String(l)?k:"#e2e8f0"}`,background:d===String(l)?k:"transparent",color:d===String(l)?m:"#718096",fontWeight:700,fontSize:12.5},children:l},l))]}),e.jsxs("div",{style:{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"MONTH:"}),["All",...ne].map(l=>e.jsx("button",{className:"ntf-fb",onClick:()=>v(l),style:{padding:"4px 10px",borderRadius:7,border:`1.5px solid ${p===l?m:"#e2e8f0"}`,background:p===l?m:"transparent",color:p===l?"#fff":"#718096",fontWeight:600,fontSize:12},children:l},l))]}),e.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"CATEGORY:"}),Gt.map(l=>{const o=ae[l]||{bg:"#f4f7fa",text:"#4a5568",border:"#e2e8f0"};return e.jsx("button",{className:"ntf-fb",onClick:()=>y(l),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${a===l?o.border:"#e2e8f0"}`,background:a===l?o.bg:"transparent",color:a===l?o.text:"#718096",fontWeight:700,fontSize:12},children:l},l)}),(d!=="All"||p!=="All"||a!=="All"||h)&&e.jsx("button",{className:"ntf-fb",onClick:()=>{f("All"),v("All"),y("All"),N("")},style:{padding:"4px 12px",borderRadius:20,border:"2px solid #FEB2B2",background:"#FFF5F5",color:"#e53e3e",fontWeight:700,fontSize:12},children:"✕ Clear"})]})]}),e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",marginTop:"30px"},children:[e.jsxs("h2",{className:"section-heading",children:["📰 Latest News (",r.length,")"]}),e.jsx("div",{className:"heading-underline"}),x?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[e.jsx("div",{style:{width:40,height:40,border:`4px solid ${k}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"News load ho rahi hain..."})]}):r.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"50px 20px"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"🔍"}),e.jsx("h3",{style:{color:m,fontWeight:800,margin:"0 0 6px"},children:"Koi news nahi mili"}),e.jsx("p",{style:{color:"#718096",fontSize:13.5},children:"Filter ya search change karo"})]}):w==="list"?Object.entries(c).map(([l,o])=>e.jsxs("div",{style:{marginBottom:28},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14},children:[e.jsxs("div",{style:{background:m,color:k,borderRadius:8,padding:"5px 16px",fontWeight:800,fontSize:12.5,whiteSpace:"nowrap",flexShrink:0},children:["📅 ",l]}),e.jsx("div",{style:{flex:1,height:1,background:`linear-gradient(90deg,${m}44,transparent)`}}),e.jsxs("span",{style:{fontSize:11.5,color:"#a0aec0",fontWeight:700,flexShrink:0},children:[o.length," update",o.length>1?"s":""]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:o.map(u=>{const S=ie(u.createdAt),D=ae[u.type]||ae.News;return e.jsxs("div",{className:"ntf-row-hover",style:{background:"#fff",borderRadius:11,padding:"14px 18px",display:"flex",alignItems:"flex-start",gap:14,borderLeft:`4px solid ${D.dot}`,border:"1px solid #edf2f7",boxShadow:"0 2px 10px rgba(11,31,78,.04)"},children:[e.jsxs("div",{style:{textAlign:"center",minWidth:44,flexShrink:0},children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase"},children:ne[S.getMonth()]}),e.jsx("div",{style:{fontSize:22,fontWeight:900,color:m,lineHeight:1},children:S.getDate()}),e.jsx("div",{style:{fontSize:11,color:"#a0aec0"},children:S.getFullYear()})]}),e.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[e.jsx("div",{style:{display:"flex",gap:7,marginBottom:7,flexWrap:"wrap",alignItems:"center"},children:e.jsx("span",{style:{background:D.bg,color:D.text,border:`1px solid ${D.border}`,padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:700},children:u.type||"News"})}),e.jsx("div",{dangerouslySetInnerHTML:{__html:Re(u.text)},style:{fontSize:14.5,color:"#334155",fontWeight:500,lineHeight:1.65}}),u.link&&e.jsx("a",{href:u.link,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:5,marginTop:8,background:"#f8fafc",border:`1px solid ${m}22`,color:m,padding:"5px 12px",borderRadius:7,fontSize:12.5,fontWeight:700,textDecoration:"none"},children:"🔗 Read Full Article"})]})]},u.id)})})]},l)):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16,marginTop:4},children:r.map(l=>{const o=ae[l.type]||ae.News;return e.jsxs("div",{className:"ntf-card-hover",style:{background:"#fff",borderRadius:13,overflow:"hidden",boxShadow:"0 4px 16px rgba(11,31,78,.07)",border:"1px solid #edf2f7"},children:[e.jsxs("div",{style:{background:`linear-gradient(135deg,${m},#1a3a7c)`,padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{background:o.bg,color:o.text,border:`1px solid ${o.border}`,padding:"3px 10px",borderRadius:20,fontSize:11.5,fontWeight:700},children:l.type||"News"}),e.jsxs("span",{style:{color:k,fontSize:11.5,fontWeight:700},children:["📅 ",Ht(l.createdAt)]})]}),e.jsxs("div",{style:{padding:"15px 16px"},children:[e.jsx("div",{dangerouslySetInnerHTML:{__html:Re(l.text)},style:{fontSize:13.5,color:"#334155",lineHeight:1.7,marginBottom:12}}),l.link&&e.jsx("a",{href:l.link,target:"_blank",rel:"noreferrer",className:"ntf-dl-btn",children:"🔗 Read More"})]})]},l.id)})})]})]})}),e.jsx("style",{children:`
        .ntf-dl-btn { display:inline-block; background:#f8fafc; color:${m}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .ntf-dl-btn:hover { background:${m}; color:#fff; border-color:${m}; }
      `})]})}const _t=n.lazy(()=>De(()=>import("./AdminPanel-CZTC_5Zv.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]))),Xt=n.lazy(()=>De(()=>import("./Ticker-D_a4DSEe.js"),__vite__mapDeps([24,1,18,19,20,21,16,17,14,15,22,23,5,6,7,8,9,10,11,12,13]))),We=["/syllabus","/about-us","/about-us/vision-mission","/about-us/principal-message","/about-us/college-management/organogram","/about-us/college-management/presidents","/about-us/college-management/secretaries","/about-us/college-management/principal","/about-us/various-committees/womens-cell","/about-us/various-committees/anti-ragging","/about-us/various-committees/sc-st","/about-us/various-committees/obc","/about-us/various-committees/grievance","/about-us/various-committees/icc","/about-us/various-committees/minority","/about-us/various-committees/placement","/about-us/various-committees/rusa","/about-us/college-staff/teaching-staff","/about-us/college-staff/non-teaching-staff","/about-us/regulations/bbmku/special-ug-regulation","/about-us/regulations/bbmku/ug-regulation-fyugp","/about-us/regulations/bbmku/ug-regulation-cbcs","/about-us/regulations/college-affiliation","/about-us/regulations/ugc-section","/about-us/regulations/vbu/ug-regulation-2015","/about-us/regulations/vbu/bca-regulation","/about-us/regulations/byelaws","/about-us/regulations/exemption","/about-us/audit-report","/campus/visuals/bhuda","/campus/visuals/bank-more","/campus/visuals/vocational-building","/campus/infrastructure","/campus/classroom","/campus/ict-rooms","/campus/green-campus","/academics/iqac","/academics/course-offered","/academics/departments/humanities","/academics/departments/social-science","/academics/departments/commerce","/academics/departments/bca","/academics/departments/bba","/academics/academic-calendar","/admission/rule","/admission/document-required","/admission/fee-structure","/admission/notification/latest","/admission/notification/upcoming","/admission/intake-capacity","/activity/nss","/activity/ncc","/activity/workshop","/activity/games-sports","/activity/collaboration/rotaract-club","/activity/collaboration/sadbhavana-diwas","/naac/ssr-1st-cycle/cycle-1-documents","/naac/ssr-1st-cycle/peer-team-report","/naac/ssr-2nd-cycle/cycle-2-documents","/naac/ssr-2nd-cycle/executive-summary","/naac/aqar","/naac/nirf","/naac/perspective-plan","/publication/college-library","/publication/e-magazine","/publication/examination-results/2024","/publication/examination-results/2023","/publication/sss-report/2023-24","/publication/sss-report/2022-23","/gallery"],qt=({pages:t})=>{const{slug:s}=Ue(),[x,j]=n.useState(null);return n.useEffect(()=>{if(t&&s){const d=t.find(f=>f.slug===s);j(d)}},[s,t]),!t||t.length===0?e.jsx("div",{style:{padding:"40px 20px",textAlign:"center"},children:"Loading pages..."}):e.jsx(Te,{page:x})},Kt=()=>e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",background:"#030b1a",color:"#10b981",fontFamily:"monospace",fontSize:16},children:"⚡ Initializing Secure Admin Panel..."}),Vt=({notices:t,announcements:s,events:x,gallery:j,pdfReports:d,pages:f,sliderSlides:p,placeholderPaths:v,navLinks:a,faculties:y,placements:h,alerts:N})=>{const[w,z]=n.useState(()=>localStorage.getItem("isGncAdmin")==="true");return w?e.jsx(n.Suspense,{fallback:e.jsx(Kt,{}),children:e.jsx(_t,{notices:t,announcements:s,events:x,gallery:j,pdfReports:d,pages:f,sliderSlides:p,placeholderPaths:v,navLinks:a,faculties:y,placements:h,alerts:N,onClose:()=>{z(!1),localStorage.removeItem("isGncAdmin"),window.close()}})}):e.jsx(zt,{onSuccess:()=>{z(!0),localStorage.setItem("isGncAdmin","true")},onClose:()=>window.close()})},Jt=t=>t&&new DOMParser().parseFromString(t,"text/html").body.textContent||"";function Qt(){const[t,s]=n.useState([]),[x,j]=n.useState([]),[d,f]=n.useState([]),[p,v]=n.useState([]),[a,y]=n.useState([]),[h,N]=n.useState([]),[w,z]=n.useState([]),[m,k]=n.useState([]),[i,r]=n.useState([]),[c,l]=n.useState([]),[o,u]=n.useState(null),S=ue(),[D,b]=n.useState(!0),[I,C]=n.useState(window.innerWidth<768),B=S.pathname.startsWith("/admin");n.useEffect(()=>{const W=()=>C(window.innerWidth<768);return window.addEventListener("resize",W),()=>window.removeEventListener("resize",W)},[]),n.useEffect(()=>{const W=setTimeout(()=>b(!1),2e3);return()=>clearTimeout(W)},[]),n.useEffect(()=>{Me.init({duration:800,easing:"ease-in-out",once:!1,mirror:!0,offset:50})},[]),n.useEffect(()=>P(pe(O,"settings","navbar"),W=>{u(W.exists()&&W.data().links?.length>0?W.data().links:ke)}),[]);const q=o||ke,Q=n.useMemo(()=>{const W=h.filter(E=>E.slug&&(!E.path||E.path==="")).sort((E,M)=>(M.createdAt?.toMillis()||0)-(E.createdAt?.toMillis()||0)).map(E=>({label:E.title,href:`/p/${E.slug}`})),T=JSON.parse(JSON.stringify(q));if(W.length>0){let E=T.find(M=>M.label.toLowerCase()==="more");E||(E={label:"More",href:"#",sub:[]},T.push(E)),E.sub||(E.sub=[]),W.forEach(M=>{E.sub.some(R=>R.href===M.href)||E.sub.push(M)})}return T},[h,q]),V=n.useMemo(()=>{const W=new Map;return[...h].sort((T,E)=>(E.createdAt?.toMillis()||0)-(T.createdAt?.toMillis()||0)).forEach(T=>{T.path&&!W.has(T.path)&&W.set(T.path,T)}),W},[h]);n.useEffect(()=>{const T=[["notices",s],["announcements",j],["events",f],["gallery",v],["pdfReports",y],["pages",N],["faculties",k],["placements",r],["alerts",l]].map(([M,R])=>{try{return P(_(X(O,M),K("createdAt","desc")),G=>R(G.docs.map(J=>({id:J.id,...J.data()}))))}catch{return P(_(X(O,M)),G=>R(G.docs.map(J=>({id:J.id,...J.data()}))))}});let E;try{const M=_(X(O,"sliderSlides"),K("order","asc"));E=P(M,R=>z(R.docs.map(G=>({id:G.id,...G.data()}))),()=>{E=P(_(X(O,"sliderSlides"),K("createdAt","asc")),R=>z(R.docs.map(G=>({id:G.id,...G.data()}))))})}catch{E=P(_(X(O,"sliderSlides"),K("createdAt","asc")),M=>z(M.docs.map(R=>({id:R.id,...R.data()}))))}return()=>{T.forEach(M=>M()),E&&E()}},[]);const A=()=>{const W=window.location.href.split("#")[0];window.open(`${W}#/admin`,"_blank")},$=[...t.slice(0,3),...x.slice(0,2)].map(W=>({...W,text:Jt(W.text||W.title)})),te=c.filter(W=>W.isActive);return e.jsxs(e.Fragment,{children:[e.jsx(Be,{position:"top-right",gutter:12,containerStyle:{top:20,right:20,zIndex:999999},toastOptions:{style:{background:"rgba(15,35,71,0.85)",backdropFilter:"blur(12px)",color:"#fff",border:"1px solid rgba(255,255,255,0.15)",boxShadow:"0 8px 32px rgba(0,0,0,0.3)",padding:"16px",borderRadius:"14px",fontSize:"15px",fontWeight:"600"},success:{icon:"✅",duration:3e3},error:{icon:"❌",duration:4e3}}}),e.jsxs("div",{className:`splash-screen ${D?"":"hide"}`,children:[e.jsx("img",{src:"/gncollege-website/images/logo.png",alt:"Guru Nanak College",className:"splash-logo"}),e.jsx("div",{className:"splash-text",children:"Loading Portal..."})]}),!B&&e.jsxs(e.Fragment,{children:[e.jsx(Nt,{}),e.jsx(n.Suspense,{fallback:e.jsx("div",{style:{height:"37px"}}),children:e.jsx(Xt,{items:$})}),te.length>0&&e.jsx(Yt,{}),e.jsx(kt,{onAdminClick:A,navLinks:Q}),e.jsx(Ct,{}),!I&&e.jsx(At,{})]}),e.jsx("div",{className:B?"":"page-transition",children:e.jsxs(He,{location:S,children:[e.jsx(U,{path:"/",element:e.jsx(Ne,{notices:t,announcements:x,pdfReports:a,sliderSlides:w,events:d,gallery:p,placements:i})}),e.jsx(U,{path:"/contact",element:e.jsx(Dt,{})}),e.jsx(U,{path:"/about-us/college-profile",element:e.jsx(Et,{})}),e.jsx(U,{path:"/notifications",element:e.jsx(Tt,{})}),e.jsx(U,{path:"/documents",element:e.jsx(Ft,{})}),e.jsx(U,{path:"/events",element:e.jsx(Bt,{})}),e.jsx(U,{path:"/news",element:e.jsx(Ut,{})}),e.jsx(U,{path:"/video-gallery",element:e.jsx(Ot,{})}),e.jsx(U,{path:"/about-us/college-staff/teaching-staff",element:e.jsx(Ae,{faculties:m,staffType:"Teaching"})}),e.jsx(U,{path:"/about-us/college-staff/non-teaching-staff",element:e.jsx(Ae,{faculties:m,staffType:"Non-Teaching"})}),e.jsx(U,{path:"/gallery",element:e.jsx(Ne,{})}),e.jsx(U,{path:"/admin",element:e.jsx(Vt,{notices:t,announcements:x,events:d,gallery:p,pdfReports:a,pages:h,sliderSlides:w,placeholderPaths:We,navLinks:q,faculties:m,placements:i,alerts:c})}),e.jsx(U,{path:"/p/:slug",element:e.jsx(qt,{pages:h})}),We.map(W=>{const T=V.get(W);return e.jsx(U,{path:W,element:e.jsx(Te,{page:T})},W)})]})},S.pathname),!B&&e.jsxs(e.Fragment,{children:[e.jsx(St,{}),e.jsx("button",{onClick:A,style:{position:"fixed",bottom:25,right:25,background:g.navy,color:"#fff",border:`3px solid ${g.gold}`,borderRadius:"50%",width:60,height:60,cursor:"pointer",zIndex:500,boxShadow:"0 6px 20px rgba(0,0,0,.25)"},children:e.jsx("span",{style:{fontSize:18},children:"⚙️"})})]})]})}function Zt(){const t=ue();return n.useEffect(()=>{"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.scrollTo(0,0)},[]),n.useEffect(()=>{const s=t.hash;if(s){const x=s.replace("#",""),j=document.getElementById(x);j&&j.scrollIntoView({behavior:"smooth"})}else window.scrollTo(0,0)},[t]),e.jsx(Qt,{})}$e.createRoot(document.getElementById("root")).render(e.jsx(Ie.StrictMode,{children:e.jsx(_e,{children:e.jsx(Zt,{})})}));export{g as C,De as _,O as d};
