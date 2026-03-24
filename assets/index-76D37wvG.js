const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/StaffPage-D2Ijt6PM.js","assets/vendor-react-CzOzt2PS.js","assets/page-gallery-DNLXrQFz.js","assets/vendor-firebase-CQO6Ah9N.js","assets/DepartmentPage-ndiYdwKt.js","assets/page-about-DcXewUUK.js","assets/page-about-BjgwLtep.css","assets/NewsPage-BgA7HhNa.js","assets/vendor-admin-D6IP6iy7.js","assets/vendor-admin-_rRfbp4A.css","assets/NotificationsPage-C8kJTkL3.js","assets/DocumentsPage-BTz38VLm.js","assets/EventsPage-DPKJyPCp.js","assets/chunk-admin-D-0VY8_W.js","assets/Ticker--0ScjVmp.js","assets/page-academics-DAw_MrFd.js","assets/page-admission-i6KGRcmi.js","assets/page-naac-D4oSiITq.js","assets/page-publication-Cx2LXeBl.js","assets/page-activity-kufJTwBV.js","assets/page-campus-BEd6n1vv.js"])))=>i.map(i=>d[i]);
var Je=Object.defineProperty,Qe=Object.defineProperties;var Ze=Object.getOwnPropertyDescriptors;var De=Object.getOwnPropertySymbols;var et=Object.prototype.hasOwnProperty,tt=Object.prototype.propertyIsEnumerable;var ue=(t,n,i)=>n in t?Je(t,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[n]=i,D=(t,n)=>{for(var i in n||(n={}))et.call(n,i)&&ue(t,i,n[i]);if(De)for(var i of De(n))tt.call(n,i)&&ue(t,i,n[i]);return t},F=(t,n)=>Qe(t,Ze(n));var be=(t,n,i)=>ue(t,typeof n!="symbol"?n+"":n,i);var Me=(t,n,i)=>new Promise((o,l)=>{var x=g=>{try{m(i.next(g))}catch(r){l(r)}},p=g=>{try{m(i.throw(g))}catch(r){l(r)}},m=g=>g.done?o(g.value):Promise.resolve(g.value).then(x,p);m((i=i.apply(t,n)).next())});import{r as s,j as e,L as _,u as Ce,R as Ae,c as at,F as nt,d as it,e as c,f as st,H as rt}from"./vendor-react-CzOzt2PS.js";import{_ as P}from"./chunk-admin-D-0VY8_W.js";import{C as b}from"./page-gallery-DNLXrQFz.js";import{q as xe,o as fe,c as ge,d as H,a as U,b as Ee}from"./vendor-firebase-CQO6Ah9N.js";import{p as ot}from"./vendor-admin-D6IP6iy7.js";import"./page-about-DcXewUUK.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))o(l);new MutationObserver(l=>{for(const x of l)if(x.type==="childList")for(const p of x.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&o(p)}).observe(document,{childList:!0,subtree:!0});function i(l){const x={};return l.integrity&&(x.integrity=l.integrity),l.referrerPolicy&&(x.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?x.credentials="include":l.crossOrigin==="anonymous"?x.credentials="omit":x.credentials="same-origin",x}function o(l){if(l.ep)return;l.ep=!0;const x=i(l);fetch(l.href,x)}})();const lt="917903340991",ct="Namaste! Main Guru Nanak College ke baare mein jaankari chahta hoon.";function dt(){const[t,n]=s.useState(!1),i=`https://wa.me/${lt}?text=${encodeURIComponent(ct)}`;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @keyframes wa-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          70%  { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        .wa-btn {
          position: fixed;
          bottom: 'clamp(80px, 12vw, 110px)',
          right:  'clamp(16px, 3vw, 25px)',
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          transition: transform 0.2s ease;
        }
        .wa-btn:hover { transform: translateY(-3px); }
        .wa-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #25d366;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          animation: wa-pulse 2s infinite;
          transition: background 0.2s;
        }
        .wa-circle:hover { background: #1ebe57; }
        .wa-label {
          background: #0f2347;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 7px 13px;
          border-radius: 8px;
          white-space: nowrap;
          font-family: 'Inter', sans-serif;
          position: relative;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .wa-label::after {
          content: '';
          position: absolute;
          right: -6px;
          top: 50%;
          transform: translateY(-50%);
          border: 6px solid transparent;
          border-left-color: #0f2347;
          border-right: none;
        }
      `}),e.jsxs("a",{href:i,target:"_blank",rel:"noopener noreferrer",className:"wa-btn",onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),title:"WhatsApp pe contact karein",children:[t&&e.jsx("div",{className:"wa-label",children:"Chat with us!"}),e.jsx("div",{className:"wa-circle",children:e.jsx("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"white",children:e.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})})})]})]})}function pt({onAdminClick:t,navLinks:n}){const[i,o]=s.useState(null),[l,x]=s.useState(null),[p,m]=s.useState(null),g=s.useRef(null),[r,v]=s.useState(window.innerWidth<1250),[f,w]=s.useState(!1),[S,L]=s.useState(!1);s.useEffect(()=>{const d=()=>{v(window.innerWidth<1250),window.innerWidth>=1250&&w(!1)};function j(){L(window.scrollY>40)}return window.addEventListener("resize",d),window.addEventListener("scroll",j),()=>{window.removeEventListener("resize",d),window.removeEventListener("scroll",j)}},[]);const C=d=>{i===d?(o(null),x(null),m(null)):(o(d),x(null),m(null))},a=d=>{l===d?(x(null),m(null)):(x(d),m(null))},u=d=>{m(p===d?null:d)},y=d=>d?d.startsWith("/#")?d.substring(2):d:"#";return e.jsxs("nav",{className:"glass-navbar",style:{position:"sticky",top:0,zIndex:99999,background:S?"rgba(255, 255, 255, 0.98)":"#ffffff",boxShadow:S?"0 10px 30px rgba(0, 0, 0, 0.15)":"0 4px 15px rgba(0,0,0,0.05)",backdropFilter:S?"blur(12px)":"none",WebkitBackdropFilter:S?"blur(12px)":"none",transition:"all 0.3s ease",width:"100%"},children:[e.jsx("style",{children:`
        @keyframes coinSpin {
          0%   { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes shineText {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
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
          background: linear-gradient(90deg, ${b.navy} 0%, #1e3a8a 30%, #d4af37 50%, #1e3a8a 70%, ${b.navy} 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shineText 5s linear infinite;
        }
        .clean-divider {
          border-left: 2.5px solid ${b.gold};
          border-radius: 2px;
        }
      `}),e.jsxs("div",{style:{width:"100%",maxWidth:"98%",margin:"0 auto",padding:"0 15px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:r?"5px":"20px"},children:[e.jsxs(_,{to:"/",style:{display:"flex",alignItems:"center",padding:"8px 0",flexShrink:0,textDecoration:"none",gap:r?"8px":"15px",marginLeft:r?"0":"-20px"},children:[e.jsx("div",{className:"logo-box-container",style:{background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:r?"45px":"75px",height:r?"45px":"75px"},children:e.jsx("img",{className:"spinning-logo",src:"/gncollege-website/images/logo.webp",alt:"Guru Nanak College Logo",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{className:"clean-divider",style:{display:"flex",flexDirection:"column",justifyContent:"center",paddingLeft:r?"8px":"15px",textAlign:"left",alignItems:"flex-start"},children:[e.jsx("h1",{className:"shimmering-title",style:{margin:"0 0 5px 0",fontSize:r?"13px":"21.5px",fontWeight:"900",fontFamily:"Georgia, serif",whiteSpace:"nowrap",letterSpacing:r?"0px":"2.5px",textAlign:"left",lineHeight:"1.1"},children:"GURU NANAK COLLEGE, DHANBAD"}),!r&&e.jsx("p",{style:{margin:"0 0 3px 0",fontSize:"11px",color:"#475569",fontWeight:"700",whiteSpace:"nowrap",textAlign:"left"},children:"A Sikh Minority Degree College Established & Managed by Gurudwara Prabhandhak Committee, Dhanbad."}),e.jsx("p",{style:{margin:0,fontSize:r?"8.5px":"10.5px",color:b.gold,fontWeight:"800",letterSpacing:r?"0.2px":"1.8px",textTransform:"uppercase",whiteSpace:"nowrap",textAlign:"left"},children:r?"Est. 1970 | Dhanbad, Jharkhand":"Affiliated to Binod Bihari Mahto Koyalanchal University, Dhanbad."})]})]}),r&&e.jsx("button",{onClick:()=>w(!f),style:{background:"transparent",border:"none",color:b.navy,fontSize:28,cursor:"pointer",padding:"4px",flexShrink:0,zIndex:200},children:f?"✕":"☰"}),e.jsxs("div",{style:{display:r?f?"flex":"none":"flex",flexDirection:r?"column":"row",alignItems:r?"flex-start":"center",position:r?"absolute":"static",top:"100%",left:0,right:0,background:r?"rgba(255,255,255,0.98)":"transparent",padding:r?"10px 20px 20px":0,gap:r?10:0,boxShadow:r&&f?"0 10px 20px rgba(0,0,0,.15)":"none",maxHeight:r?"80vh":"auto",overflowY:r?"auto":"visible",flex:r?"unset":1,justifyContent:r?"flex-start":"flex-end",marginLeft:r?"0":"auto",marginRight:r?"0":"10px",borderTop:r&&f?"1px solid #eee":"none",zIndex:250},children:[(n||[]).map(d=>e.jsxs("div",{style:{position:"relative",width:r?"100%":"auto"},onMouseEnter:()=>{g.current&&clearTimeout(g.current),r||o(d.label)},onMouseLeave:()=>{r||(g.current=setTimeout(()=>{o(null),x(null),m(null)},200))},children:[e.jsxs("div",{onClick:()=>r&&d.sub&&C(d.label),style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:r&&d.sub?"pointer":"default"},children:[e.jsxs(_,{to:y(d.href),onClick:()=>{d.label==="Home"&&window.scrollTo(0,0)},style:{color:b.navy,padding:r?"12px 0":"24px 11px",display:"block",fontSize:13.5,fontWeight:700,whiteSpace:"nowrap",textDecoration:"none",transition:"all .2s",width:"100%"},children:[d.label==="Home"?"🏠 ":"",d.label]}),r&&d.sub&&e.jsx("span",{style:{color:b.navy,fontSize:20},children:i===d.label?"▴":"▾"}),!r&&d.sub&&e.jsx("span",{style:{color:b.navy,fontSize:11,marginLeft:2,marginRight:8,marginTop:2},children:"▾"})]}),d.sub&&i===d.label&&e.jsx("div",{style:{position:r?"static":"absolute",top:"100%",left:0,background:"#fff",minWidth:240,boxShadow:r?"none":"0 12px 30px rgba(0,0,0,.15)",borderTop:r?"none":"3px solid "+b.navy,borderRadius:r?8:"0 0 8px 8px",zIndex:200,padding:r?"5px 0":"8px 0"},children:d.sub.map(j=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!r&&x(j.label),onMouseLeave:()=>!r&&x(null),children:[e.jsxs("div",{onClick:z=>{r&&j.sub&&(z.stopPropagation(),a(j.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:r?"10px 16px":"10px 18px",borderBottom:r?"none":"1px solid #f8f9fa",cursor:r&&j.sub?"pointer":"default"},onMouseEnter:z=>{r||(z.currentTarget.style.background="#f4f6f9")},onMouseLeave:z=>{r||(z.currentTarget.style.background="transparent")},children:[e.jsx(_,{to:y(j.href),style:{fontSize:13,fontWeight:600,color:b.navy,display:"block",width:"100%",textDecoration:"none"},children:j.label}),j.sub&&e.jsx("span",{style:{fontSize:12,color:b.gold,marginLeft:8},children:r?l===j.label?"▴":"▾":"▶"})]}),j.sub&&l===j.label&&e.jsx("div",{style:{position:r?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:240,boxShadow:r?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:r?"none":"3px solid "+b.gold,borderRadius:r?4:"0 8px 8px 8px",margin:r?"0 16px 10px":0,borderLeft:r?"2px solid "+b.gold:"none"},children:j.sub.map(z=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!r&&m(z.label),onMouseLeave:()=>!r&&m(null),children:[e.jsxs("div",{onClick:A=>{r&&z.sub&&(A.stopPropagation(),u(z.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderBottom:r?"none":"1px solid #f8f9fa",cursor:r&&z.sub?"pointer":"default"},onMouseEnter:A=>{r||(A.currentTarget.style.background="#f4f6f9")},onMouseLeave:A=>{r||(A.currentTarget.style.background="transparent")},children:[e.jsx(_,{to:y(z.href),style:{fontSize:12.5,fontWeight:600,color:"#444",display:"block",width:"100%",textDecoration:"none"},children:z.label}),z.sub&&e.jsx("span",{style:{fontSize:11,color:b.gold,marginLeft:8},children:r?p===z.label?"▴":"▾":"▶"})]}),z.sub&&p===z.label&&e.jsx("div",{style:{position:r?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:240,boxShadow:r?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:r?"none":"3px solid "+b.navy,borderRadius:r?4:"0 8px 8px 8px",margin:r?"0 16px 10px":0,borderLeft:r?"2px solid "+b.navy:"none"},children:z.sub.map(A=>e.jsx(_,{to:y(A.href),style:{display:"block",padding:"10px 16px",fontSize:12,color:"#555",borderBottom:r?"none":"1px solid #f8f9fa",textDecoration:"none"},onMouseEnter:B=>{r||(B.currentTarget.style.background="#f4f6f9")},onMouseLeave:B=>{r||(B.currentTarget.style.background="transparent")},children:A.label},A.label))})]},z.label))})]},j.label))})]},d.label)),e.jsxs("button",{onClick:t,style:{flexShrink:0,background:b.gold,color:"#000",border:"none",padding:"7px 18px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:800,marginLeft:r?0:10,marginTop:r?12:0,width:r?"100%":"auto",boxShadow:"0 4px 15px rgba(244,160,35,0.3)",whiteSpace:"nowrap",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",transition:"all 0.3s ease"},onMouseEnter:d=>d.currentTarget.style.transform="translateY(-2px)",onMouseLeave:d=>d.currentTarget.style.transform="translateY(0)",children:[e.jsx("span",{style:{fontSize:16},children:"⚙️"})," Admin Login"]})]})]})]})}const de=[{id:"facebook",label:"f",href:"https://facebook.com/gnc.dhanbad"},{id:"twitter",label:"t",href:"https://twitter.com/"},{id:"youtube",label:"y",href:"https://youtube.com/"},{id:"linkedin",label:"in",href:"https://linkedin.com/"}],xt=[{name:"Class Rooms",emoji:"🏫"},{name:"Computer Lab",emoji:"💻"},{name:"Library",emoji:"📚"},{name:"Seminar Hall",emoji:"🎤"},{name:"Auditorium",emoji:"🎭"},{name:"Playground",emoji:"⚽"},{name:"Badminton Court",emoji:"🏸"},{name:"Gymnasium",emoji:"🏋️"},{name:"Digital Classrooms",emoji:"📱"},{name:"Cultural Dept.",emoji:"🎵"},{name:"Washroom (B)",emoji:"🚿"},{name:"Washroom (G)",emoji:"🚿"},{name:"Water Purifier",emoji:"💧"},{name:"Canteen",emoji:"🍽️"},{name:"Girls Common Room",emoji:"👩"},{name:"Online Lecture",emoji:"📡"}],ft=[{label:"Home",href:"/"},{label:"About Us",href:"/",sub:[{label:"College Profile",href:"/about-us/college-profile"},{label:"Vision & Mission",href:"/about-us/vision-mission"},{label:"Principal Message",href:"/about-us/principal-message"},{label:"College Management",sub:[{label:"Organogram",href:"/about-us/college-management/organogram"},{label:"Presidents",href:"/about-us/college-management/presidents"},{label:"Secretaries",href:"/about-us/college-management/secretaries"},{label:"Principal",href:"/about-us/college-management/principal"}]},{label:"Various Committees",sub:[{label:"Women's Cell",href:"/about-us/various-committees/womens-cell"},{label:"Anti Ragging",href:"/about-us/various-committees/anti-ragging"},{label:"SC/ST",href:"/about-us/various-committees/sc-st"},{label:"OBC",href:"/about-us/various-committees/obc"},{label:"Grievance",href:"/about-us/various-committees/grievance"},{label:"ICC",href:"/about-us/various-committees/icc"},{label:"Minority",href:"/about-us/various-committees/minority"},{label:"Placement",href:"/about-us/various-committees/placement"},{label:"RUSA",href:"/about-us/various-committees/rusa"}]},{label:"College Staff",sub:[{label:"Teaching Staff",href:"/about-us/college-staff/teaching-staff"},{label:"Non-Teaching Staff",href:"/about-us/college-staff/non-teaching-staff"}]},{label:"Regulations",sub:[{label:"B.B.M.K. University Dhanbad",sub:[{label:"Special UG Regulation (CBCS) Session 2020-23",href:"/about-us/regulations/bbmku/special-ug-regulation"},{label:"UG Regulation (FYUGP)",href:"/about-us/regulations/bbmku/ug-regulation-fyugp"},{label:"UG Regulation (CBCS)",href:"/about-us/regulations/bbmku/ug-regulation-cbcs"}]},{label:"College Affiliation Paper B.B.M.K.U.",href:"/about-us/regulations/college-affiliation"},{label:"UGC Under Section 2(f) & 12(B)",href:"/about-us/regulations/ugc-section"},{label:"V.B.U. Hazaribag",sub:[{label:"UG Regulation 2015",href:"/about-us/regulations/vbu/ug-regulation-2015"},{label:"BCA Regulation",href:"/about-us/regulations/vbu/bca-regulation"}]},{label:"ByeLaws",href:"/about-us/regulations/byelaws"},{label:"Exemption",href:"/about-us/regulations/exemption"}]},{label:"Audit Report",href:"/about-us/audit-report"}]},{label:"Campus",href:"/",sub:[{label:"Campus Visuals",sub:[{label:"Bhuda",href:"/campus/visuals/bhuda"},{label:"Bank More",href:"/campus/visuals/bank-more"},{label:"Vocational Building",href:"/campus/visuals/vocational-building"}]},{label:"Infrastructure",href:"/campus/infrastructure"},{label:"Classroom",href:"/campus/classroom"},{label:"ICT Rooms",href:"/campus/ict-rooms"},{label:"Green Campus",href:"/campus/green-campus"}]},{label:"Academics",href:"/",sub:[{label:"IQAC",href:"/academics/iqac"},{label:"Course Offered",href:"/academics/course-offered"},{label:"Departments",sub:[{label:"Humanities",href:"/academics/departments/humanities"},{label:"Social Science",href:"/academics/departments/social-science"},{label:"Commerce",href:"/academics/departments/commerce"},{label:"BCA",href:"/academics/departments/bca"},{label:"BBA",href:"/academics/departments/bba"}]},{label:"Syllabus",href:"/syllabus"},{label:"Academic Calendar",href:"/academics/academic-calendar"}]},{label:"Admission",href:"/",sub:[{label:"Admission Rule",href:"/admission/rule"},{label:"Document Required",href:"/admission/document-required"},{label:"Fee Structure",href:"/admission/fee-structure"},{label:"Notification",sub:[{label:"Latest",href:"/admission/notification/latest"},{label:"Upcoming News",href:"/admission/notification/upcoming"}]},{label:"Intake Capacity",href:"/admission/intake-capacity"}]},{label:"Activity",href:"/",sub:[{label:"NSS",href:"/activity/nss"},{label:"NCC",href:"/activity/ncc"},{label:"Workshop",href:"/activity/workshop"},{label:"Game & Sports",href:"/activity/games-sports"},{label:"Collaboration",sub:[{label:"Rotaract Club",href:"/activity/collaboration/rotaract-club"},{label:"Sadbhavana Diwas",href:"/activity/collaboration/sadbhavana-diwas"}]}]},{label:"NAAC",href:"/",sub:[{label:"SSR 1st Cycle",sub:[{label:"Cycle 1 Documents",href:"/naac/ssr-1st-cycle/cycle-1-documents"},{label:"Peer Team Report",href:"/naac/ssr-1st-cycle/peer-team-report"}]},{label:"SSR 2nd Cycle",sub:[{label:"Cycle 2 Documents",href:"/naac/ssr-2nd-cycle/cycle-2-documents"},{label:"Executive Summary",href:"/naac/ssr-2nd-cycle/executive-summary"}]},{label:"AQAR",href:"/naac/aqar"},{label:"NIRF",href:"/naac/nirf"},{label:"Perspective Plan",href:"/naac/perspective-plan"}]},{label:"Publication",href:"/",sub:[{label:"College Library",href:"/publication/college-library"},{label:"E-Magazine",href:"/publication/e-magazine"},{label:"Examination Results",sub:[{label:"Result 2024",href:"/publication/examination-results/2024"},{label:"Result 2023",href:"/publication/examination-results/2023"}]},{label:"SSS Report",sub:[{label:"Report 2023-24",href:"/publication/sss-report/2023-24"},{label:"Report 2022-23",href:"/publication/sss-report/2022-23"}]}]},{label:"Gallery",href:"/gallery",sub:[{label:"Photo Gallery",href:"/gallery/photos"},{label:"Video Gallery",href:"/gallery/videos"}]},{label:"Contact Us",href:"/contact"}],gt=()=>e.jsxs("footer",{className:"premium-footer",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"footer-grid",children:[e.jsxs("div",{className:"footer-widget",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"18px",marginBottom:"25px"},children:[e.jsx("div",{style:{width:"75px",height:"75px",background:"rgba(255,255,255,0.95)",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",padding:"8px",boxShadow:"0 10px 25px rgba(0,0,0,0.5)"},children:e.jsx("img",{src:"/gncollege-website/images/logo.png",alt:"GNC Logo",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center"},children:[e.jsx("h2",{style:{fontSize:"1.4rem",fontWeight:"900",color:"#fff",margin:"0 0 2px 0",lineHeight:"1.1"},children:"GURU NANAK"}),e.jsx("h2",{style:{fontSize:"1.4rem",fontWeight:"900",color:"#f4a023",margin:0,lineHeight:"1.1"},children:"COLLEGE"}),e.jsx("p",{style:{fontSize:"0.75rem",color:"#94a3b8",margin:"6px 0 0",fontWeight:"700",letterSpacing:"1.5px"},children:"DHANBAD, JHARKHAND"})]})]}),e.jsx("p",{className:"footer-desc",children:"A Sikh Minority Degree College established in 1970. We are dedicated to providing premium quality education and fostering holistic development based on the core teachings of Guru Nanak Dev Ji."}),e.jsx("div",{style:{display:"flex",gap:"12px"},children:de&&de.map(t=>e.jsx("a",{href:t.href,target:"_blank",rel:"noreferrer",className:"social-btn","aria-label":t.label,children:t.id==="twitter"?"𝕏":t.id==="youtube"?"▶":t.id==="facebook"?"f":t.id==="instagram"?"in":t.label.charAt(0)},t.id))})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Quick Links"}),e.jsx("ul",{className:"footer-links",children:[{label:"Home",path:"/"},{label:"College Profile",path:"/about-us/college-profile"},{label:"Admission Rules",path:"/admission/rule"},{label:"Courses Offered",path:"/academics/course-offered"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((t,n)=>e.jsx("li",{className:"footer-link-item",children:e.jsxs(_,{to:t.path,onClick:()=>window.scrollTo(0,0),className:"footer-link",children:[e.jsx("span",{children:"›"})," ",t.label]})},n))})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Get In Touch"}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"📍"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Main Campus"}),"Bhuda, Dhanbad,",e.jsx("br",{}),"Jharkhand - 826001, India"]})]}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"📞"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Phone Enquiries"}),e.jsx("a",{href:"tel:+917903340991",className:"contact-link",children:"+91 79033 40991"})]})]}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"✉️"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Email Us"}),e.jsx("a",{href:"mailto:principal@gncollege.org",className:"contact-link",children:"principal@gncollege.org"})]})]})]}),e.jsx("button",{className:"newsletter-btn",onClick:()=>alert("Newsletter coming soon!"),children:"Subscribe"})]}),e.jsx("div",{className:"footer-bottom",children:e.jsxs("div",{className:"footer-bottom-content",children:[e.jsxs("p",{className:"footer-copyright",children:["© ",new Date().getFullYear()," ",e.jsx("span",{style:{color:"#f4a023",fontWeight:"800"},children:"Guru Nanak College, Dhanbad"}),". All Rights Reserved."]}),e.jsx("p",{className:"footer-dev",children:"Designed & Developed dynamically with ❤️ By Pankaj Kumar"})]})})]}),ht=()=>{const t={href:"https://wa.me/917903340991"};return e.jsxs("div",{style:{background:`linear-gradient(to right, ${b.navyDark}, #0a1832)`,color:"#e2e8f0",borderBottom:`1px solid ${b.gold}20`,width:"100%",maxWidth:"100vw",overflow:"hidden",boxSizing:"border-box"},children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"tb-wrap",children:[e.jsxs("div",{className:"tb-left",children:[e.jsxs("a",{href:"tel:+917903340991",className:"tb-link",children:[e.jsx("span",{style:{color:b.gold,fontSize:13},children:"📞"}),e.jsx("span",{children:"+91-7903340991"})]}),e.jsxs("a",{href:"mailto:principal@gncollege.org",className:"tb-link tb-email",children:[e.jsx("span",{style:{color:b.gold,fontSize:13},children:"✉️"}),e.jsx("span",{children:"principal@gncollege.org"})]})]}),e.jsxs("div",{className:"tb-right",children:[e.jsxs("div",{className:"tb-qlinks",children:[e.jsx("a",{href:"https://bbmkuniv.in/login",target:"_blank",rel:"noopener noreferrer",className:"tb-qbtn tb-res",children:"📋 Results"}),e.jsx("a",{href:"https://cimsstudentnewui.mastersofterp.in/",target:"_blank",rel:"noopener noreferrer",className:"tb-qbtn tb-fee",children:"💳 Fee Paymnet"}),e.jsx("a",{href:"https://jharkhanduniversities.nic.in/",target:"_blank",rel:"noopener noreferrer",className:"tb-qbtn tb-adm",children:"🎓 Apply Online"})]}),e.jsx("div",{className:"tb-div"}),de.map(n=>{let i=n.label,o="";return n.id==="twitter"&&(i="𝕏"),n.id==="youtube"&&(i="▶",o="yt"),n.id==="facebook"&&(o="fb"),n.id==="linkedin"&&(o="li"),e.jsx("a",{href:n.href,target:"_blank",rel:"noopener noreferrer",className:`tb-soc ${o}`,"aria-label":n.id,children:i},n.id)}),e.jsx("a",{href:t.href,target:"_blank",rel:"noopener noreferrer",className:"tb-soc wa","aria-label":"whatsapp",children:"W"})]})]})]})},mt=()=>{const t=Ce();let n=t.pathname;n==="/"&&t.hash.startsWith("#/")&&(n=t.hash.substring(1));const i=n.split("/").filter(o=>o);return i.length===0?null:e.jsx("div",{style:{background:"#f8f9fa",borderBottom:"1px solid #e0e0e0"},children:e.jsxs("div",{style:{maxWidth:"1400px",margin:"0 auto",padding:"12px 20px",fontSize:"13.5px",color:"#666",display:"flex",alignItems:"center",fontWeight:"500"},children:[e.jsxs(_,{to:"/",style:{color:b.navy,textDecoration:"none",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{children:"🏠"})," Home"]}),i.map((o,l)=>{const x=`/${i.slice(0,l+1).join("/")}`,p=l===i.length-1,m=o.replace(/-/g," ").replace(/\b\w/g,g=>g.toUpperCase());return e.jsxs("span",{style:{display:"flex",alignItems:"center"},children:[e.jsx("span",{style:{margin:"0 10px",color:"#ccc",fontSize:"10px"},children:"❯"}),p?e.jsx("span",{style:{color:b.gold,fontWeight:"700"},children:m}):e.jsx(_,{to:x,style:{color:b.navy,textDecoration:"none"},children:m})]},x)})]})})},oe=b.navy,Te=b.gold,ut=[{label:"Principal Message",icon:"👨‍🏫",href:"#/about-us/principal-message"},{label:"Admission Rules",icon:"🎓",href:"#/admission/rule"},{label:"Departments",icon:"🏛️",href:"#/academics/course-offered"},{label:"NSS / NCC",icon:"🎖️",href:"#/activity/nss"},{label:"Syllabus",icon:"📚",href:"#/syllabus"},{label:"Photo Gallery",icon:"📸",href:"#/gallery"},{label:"Contact Us",icon:"📞",href:"#/contact"}];function bt(){const[t,n]=s.useState(()=>window.innerWidth<=768),[i,o]=s.useState(!1),[l,x]=s.useState(null);s.useEffect(()=>{const v=()=>{const f=window.innerWidth<=768;n(f),f||o(!1)};return window.addEventListener("resize",v,{passive:!0}),()=>window.removeEventListener("resize",v)},[]);const p=s.useCallback(()=>{t&&o(!1)},[t]),m=58,g=200,r=32;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        /* ── Slide in items ── */
        @keyframes qan-slide {
          from { opacity:0; transform:translateX(60px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .qan-item {
          display:flex; align-items:center;
          height:52px; border-radius:12px 0 0 12px;
          text-decoration:none; overflow:hidden;
          white-space:nowrap; cursor:pointer;
          transition: width .35s cubic-bezier(.175,.885,.32,1.275),
                      background .2s, color .2s,
                      box-shadow .2s;
          position:relative;
        }
        .qan-item.anim { animation: qan-slide .45s ease both; }

        /* ── Toggle button ── */
        .qan-toggle {
          position:fixed;
          right:0; top:50%;
          transform:translateY(-50%);
          z-index:1001;               /* always on top */
          width:${r}px; height:88px;
          background:${oe};
          color:#fff; border:none;
          border-radius:10px 0 0 10px;
          cursor:pointer;
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          gap:3px;
          box-shadow:-3px 0 12px rgba(0,0,0,.22);
          transition:background .25s;
          font-size:18px;
        }
        .qan-toggle:hover { background:${Te}; color:${oe}; }

        /* ── Sidebar ── */
        .qan-sidebar {
          position:fixed;
          /* Keep sidebar LEFT of toggle button */
          right:${r}px;
          top:50%;
          z-index:999;               /* below toggle */
          display:flex; flex-direction:column;
          gap:5px;
          transform:translateY(-50%);
          transition:transform .35s cubic-bezier(.4,0,.2,1),
                     opacity   .3s ease;
        }
        .qan-sidebar.mobile-closed {
          transform:translateY(-50%) translateX(calc(100% + ${r}px));
          opacity:0; pointer-events:none;
        }

        /* Desktop — no toggle, sidebar at right:0 */
        .qan-sidebar.desktop {
          right:0;
          transform:translateY(-50%);
          opacity:1; pointer-events:auto;
        }

        @media(max-width:768px) {
          /* On very small phones shrink items */
          .qan-item { height:46px; }
        }
      `}),t&&e.jsxs("button",{className:"qan-toggle",onClick:()=>o(v=>!v),"aria-label":i?"Close quick links":"Open quick links","aria-expanded":i,children:[e.jsx("span",{style:{fontSize:20,lineHeight:1},children:i?"✕":"≡"}),!i&&e.jsx("span",{style:{fontSize:8,fontWeight:800,letterSpacing:.5,writingMode:"vertical-rl",textTransform:"uppercase",opacity:.7,marginTop:4},children:"LINKS"})]}),e.jsx("div",{className:t?`qan-sidebar ${i?"":"mobile-closed"}`:"qan-sidebar desktop",children:ut.map((v,f)=>e.jsxs("a",{href:v.href,className:`qan-item${i||!t?" anim":""}`,onClick:p,onMouseEnter:()=>x(f),onMouseLeave:()=>x(null),style:{width:l===f?`${g}px`:`${m}px`,background:l===f?Te:oe,color:l===f?oe:"#fff",boxShadow:l===f?"-5px 5px 16px rgba(0,0,0,.22)":"-2px 2px 8px rgba(0,0,0,.12)",animationDelay:`${f*.07}s`,paddingLeft:"13px",paddingRight:"10px"},children:[e.jsx("span",{style:{fontSize:20,minWidth:30,textAlign:"center",display:"block",flexShrink:0},children:v.icon}),e.jsx("span",{style:{fontWeight:800,fontSize:13,marginLeft:10,flexShrink:0,opacity:l===f?1:0,transform:l===f?"translateX(0)":"translateX(8px)",transition:"opacity .25s ease .05s, transform .25s ease .05s",pointerEvents:"none"},children:v.label})]},f))})]})}const Be={HomePage:{icon:"🏠",msg:"Home page load nahi ho saka."},EventsPage:{icon:"🏆",msg:"Events section mein kuch gadbad."},NotificationsPage:{icon:"📢",msg:"Notice board load nahi ho saka."},DocumentsPage:{icon:"📁",msg:"Documents section mein error."},NewsPage:{icon:"📣",msg:"News section load nahi ho saka."},VideoGallery:{icon:"▶️",msg:"Video gallery load nahi ho saka."},StaffPage:{icon:"👨‍🏫",msg:"Staff directory mein kuch gadbad."},CollegeProfile:{icon:"🏛️",msg:"College profile load nahi ho saka."},Contact:{icon:"📞",msg:"Contact page load nahi ho saka."},PageViewer:{icon:"📄",msg:"Page content load nahi ho saka."},PlacementsSection:{icon:"🎓",msg:"Placements section mein error."},AlertBanner:{icon:"🔔",msg:""},DEFAULT:{icon:"⚠️",msg:"Kuch gadbad ho gayi."}};class yt extends Ae.Component{constructor(i){super(i);be(this,"handleReset",()=>{this.setState({hasError:!1,errorMsg:"",errorStack:""})});this.state={hasError:!1,errorMsg:"",errorStack:""}}static getDerivedStateFromError(i){return{hasError:!0,errorMsg:(i==null?void 0:i.message)||"Unknown error",errorStack:(i==null?void 0:i.stack)||""}}componentDidCatch(i,o){}render(){if(!this.state.hasError)return this.props.children;const i=this.props.page||"DEFAULT",o=Be[i]||Be.DEFAULT,l=b.navy;return this.props.minimal?null:e.jsx("div",{style:{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 20px",background:"#f8fafc",fontFamily:"'DM Sans', sans-serif"},children:e.jsxs("div",{style:{textAlign:"center",background:"#fff",borderRadius:"20px",padding:"50px 40px",maxWidth:"480px",width:"100%",boxShadow:"0 10px 40px rgba(0,0,0,0.06)",border:"1px solid #e2e8f0"},children:[e.jsx("div",{style:{fontSize:"52px",marginBottom:"16px"},children:o.icon}),e.jsx("h2",{style:{color:l,fontSize:"20px",fontWeight:900,margin:"0 0 10px",letterSpacing:"-0.3px"},children:"Oops! Something went wrong"}),e.jsxs("p",{style:{color:"#64748b",fontSize:"14px",margin:"0 0 24px",lineHeight:1.6},children:[o.msg," Please try again or refresh the page."]}),!1,e.jsxs("div",{style:{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"},children:[e.jsx("button",{onClick:this.handleReset,style:{background:`linear-gradient(135deg, ${l}, #1a3a7c)`,color:"#fff",border:"none",borderRadius:"10px",padding:"11px 24px",fontSize:"14px",fontWeight:800,cursor:"pointer",fontFamily:"inherit",transition:"opacity .2s"},onMouseEnter:p=>p.currentTarget.style.opacity=".85",onMouseLeave:p=>p.currentTarget.style.opacity="1",children:"🔄 Try Again"}),e.jsx("button",{onClick:()=>window.location.href="/",style:{background:"#f1f5f9",color:"#475569",border:"1px solid #e2e8f0",borderRadius:"10px",padding:"11px 24px",fontSize:"14px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"},children:"🏠 Go Home"})]})]})})}}const ye="#0f2347",q="#f4a023",ve="#c97e10";function vt({onSuccess:t,onClose:n}){const[i,o]=s.useState(""),[l,x]=s.useState(""),[p,m]=s.useState(""),[g,r]=s.useState(!1),[v,f]=s.useState(!1),[w,S]=s.useState("idle"),[L,C]=s.useState(!1),[a,u]=s.useState(!1),[y,d]=s.useState(!1),[j,z]=s.useState(0),[A,B]=s.useState(!1),W=s.useRef(null),I=s.useRef(null);s.useEffect(()=>{setTimeout(()=>B(!0),50)},[]),s.useEffect(()=>{if(!g)return;const k=setInterval(()=>z($=>($+1)%4),350);return()=>clearInterval(k)},[g]),s.useEffect(()=>{const k=W.current;if(!k)return;const $=k.getContext("2d");let Z=k.width=k.offsetWidth,re=k.height=k.offsetHeight;const G=Array.from({length:55},()=>({x:Math.random()*Z,y:Math.random()*re,r:Math.random()*1.4+.3,dx:(Math.random()-.5)*.35,dy:(Math.random()-.5)*.35,o:Math.random()*.45+.1})),Pe=()=>{$.clearRect(0,0,Z,re),G.forEach(E=>{E.x+=E.dx,E.y+=E.dy,(E.x<0||E.x>Z)&&(E.dx*=-1),(E.y<0||E.y>re)&&(E.dy*=-1),$.beginPath(),$.arc(E.x,E.y,E.r,0,Math.PI*2),$.fillStyle=`rgba(244,160,35,${E.o})`,$.fill()});for(let E=0;E<G.length;E++)for(let V=E+1;V<G.length;V++){const Ie=G[E].x-G[V].x,$e=G[E].y-G[V].y,_e=Math.sqrt(Ie*Ie+$e*$e);_e<90&&($.beginPath(),$.moveTo(G[E].x,G[E].y),$.lineTo(G[V].x,G[V].y),$.strokeStyle=`rgba(244,160,35,${.07*(1-_e/90)})`,$.lineWidth=.5,$.stroke())}I.current=requestAnimationFrame(Pe)};Pe();const Re=()=>{Z=k.width=k.offsetWidth,re=k.height=k.offsetHeight};return window.addEventListener("resize",Re),()=>{cancelAnimationFrame(I.current),window.removeEventListener("resize",Re)}},[]);const ie=k=>{k.key==="CapsLock"&&C(k.getModifierState("CapsLock"))},Y=k=>{k.key==="CapsLock"&&C(k.getModifierState("CapsLock"))},se=k=>{if(k.preventDefault(),!i.trim()||!l.trim()){m("Please fill in all fields.");return}m(""),r(!0),S("checking"),setTimeout(()=>{i==="admin"&&l==="admin123"?(S("success"),setTimeout(()=>t(),1e3)):(S("fail"),m("Invalid credentials. Please try again."),r(!1),setTimeout(()=>S("idle"),600))},1400)},Ve=`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap&subset=latin');

    .gnc-login-root *, .gnc-login-root *::before, .gnc-login-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .gnc-login-root {
      position: fixed; inset: 0; z-index: 100000;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Inter', sans-serif;
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
      width: 42%; background: ${ye};
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
      font-size: 10px; font-weight: 600; color: ${q};
      letter-spacing: 1.5px; text-transform: uppercase;
      width: fit-content;
    }
    .gnc-badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: ${q}; animation: blink 2s infinite;
    }
    @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.2;} }

    .gnc-logo-wrap {
      display: flex; align-items: center; gap: 16px; margin: 36px 0 20px;
    }
    .gnc-logo-icon {
      width: 58px; height: 58px; border-radius: 16px; flex-shrink: 0;
      background: linear-gradient(135deg, ${q} 0%, ${ve} 100%);
      display: flex; align-items: center; justify-content: center;
      font-size: 26px;
      box-shadow: 0 8px 24px rgba(244,160,35,.3);
    }
    .gnc-college-name {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 19px; font-weight: 800;
      color: #fff; line-height: 1.2; letter-spacing: -.3px;
    }
    .gnc-college-sub {
      font-size: 11px; color: rgba(255,255,255,.35);
      font-weight: 400; margin-top: 4px; line-height: 1.5;
    }

    .gnc-left-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 28px; font-weight: 800; color: #fff;
      line-height: 1.25; letter-spacing: -.5px; margin-bottom: 14px;
    }
    .gnc-left-title span { color: ${q}; }
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
      font-size: 10px; font-weight: 600; color: ${q};
      letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;
      opacity: .7;
    }
    .gnc-right-title {
      font-family: 'Space Grotesk', sans-serif;
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
      color: #fff; font-family: 'Inter', sans-serif;
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
      background: linear-gradient(135deg, ${q} 0%, ${ve} 100%);
      border: none; border-radius: 12px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 15px; font-weight: 700;
      color: ${ye}; cursor: pointer;
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
      border-top-color: ${ye};
      animation: spin .7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── PROGRESS BAR ── */
    .gnc-progress {
      height: 2px; background: rgba(255,255,255,.05);
      border-radius: 99px; overflow: hidden; margin-bottom: 28px;
    }
    .gnc-progress-inner {
      height: 100%; background: linear-gradient(90deg, ${q}, ${ve});
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
  `,Ke=()=>w==="success"?e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"✓"})," Access Granted"]}):w==="fail"?e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"✕"})," Invalid Credentials"]}):w==="checking"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"gnc-spinner"}),e.jsxs("span",{children:["Authenticating",".".repeat(j)]})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"🔐"})," Access Admin Portal"]});return e.jsxs("div",{className:"gnc-login-root",children:[e.jsx("style",{children:Ve}),e.jsxs("div",{className:"gnc-bg",children:[e.jsx("canvas",{ref:W,style:{width:"100%",height:"100%"}}),e.jsx("div",{className:"gnc-bg-grid"}),e.jsx("div",{className:"gnc-bg-glow1"}),e.jsx("div",{className:"gnc-bg-glow2"})]}),e.jsxs("div",{className:`gnc-wrap ${A?"show":""}`,children:[e.jsxs("div",{className:"gnc-left",children:[e.jsx("div",{className:"gnc-left-pattern"}),e.jsx("div",{className:"gnc-left-circle1"}),e.jsx("div",{className:"gnc-left-circle2"}),e.jsxs("div",{children:[e.jsxs("div",{className:"gnc-badge",children:[e.jsx("div",{className:"gnc-badge-dot"}),"Secured Portal"]}),e.jsxs("div",{className:"gnc-logo-wrap",children:[e.jsx("div",{className:"gnc-logo-icon",children:"🏫"}),e.jsxs("div",{children:[e.jsxs("div",{className:"gnc-college-name",children:["Guru Nanak",e.jsx("br",{}),"College"]}),e.jsx("div",{className:"gnc-college-sub",children:"Dhanbad, Jharkhand"})]})]}),e.jsxs("div",{className:"gnc-left-title",children:["Website",e.jsx("br",{}),e.jsx("span",{children:"Control"}),e.jsx("br",{}),"Center"]}),e.jsx("div",{className:"gnc-left-desc",children:"Manage notices, events, faculty, gallery, documents and all website content from one unified dashboard."}),e.jsx("div",{className:"gnc-features",children:[["📢","Real-time Notice Board"],["👨‍🏫","Faculty & Staff Directory"],["📊","Live Dashboard Analytics"],["🛡️","15-Phase System Diagnostics"]].map(([k,$])=>e.jsxs("div",{className:"gnc-feature",children:[e.jsx("div",{className:"gnc-feature-icon",children:k}),$]},$))})]}),e.jsx("div",{className:"gnc-left-footer",children:"v9.1 · Admin Panel · GNC Dhanbad"})]}),e.jsxs("div",{className:"gnc-right",children:[e.jsx("button",{className:"gnc-close",onClick:n,title:"Close",children:"✕"}),e.jsx("div",{className:"gnc-right-eyebrow",children:"Admin Access"}),e.jsx("div",{className:"gnc-right-title",children:"Welcome Back"}),e.jsx("div",{className:"gnc-right-sub",children:"Sign in to manage your college website"}),e.jsx("div",{className:"gnc-progress",children:e.jsx("div",{className:`gnc-progress-inner ${g?"go":""}`})}),e.jsxs("div",{className:"gnc-security",children:[e.jsx("span",{className:"gnc-security-icon",children:"🔒"}),e.jsx("span",{className:"gnc-security-text",children:"256-bit encrypted · Secure session"}),e.jsx("div",{className:"gnc-security-dot"})]}),e.jsxs("form",{onSubmit:se,autoComplete:"off",children:[p&&e.jsxs("div",{className:"gnc-error",children:[e.jsx("span",{children:"⚠️"})," ",p]}),e.jsxs("div",{className:"gnc-field",children:[e.jsx("div",{className:"gnc-field-label",children:e.jsx("span",{children:"Username"})}),e.jsxs("div",{className:`gnc-input-wrap ${a?"focused":""}`,children:[e.jsx("span",{className:"gnc-input-icon",children:"👤"}),e.jsx("input",{className:"gnc-input",type:"text",placeholder:"Enter your username",value:i,onChange:k=>o(k.target.value),onFocus:()=>u(!0),onBlur:()=>u(!1),onKeyDown:ie,onKeyUp:Y,autoComplete:"username",required:!0})]})]}),e.jsxs("div",{className:"gnc-field",children:[e.jsxs("div",{className:"gnc-field-label",children:[e.jsx("span",{children:"Password"}),L&&e.jsx("span",{className:"gnc-caps",children:"⇪ Caps Lock ON"})]}),e.jsxs("div",{className:`gnc-input-wrap ${y?"focused":""}`,children:[e.jsx("span",{className:"gnc-input-icon",children:"🔑"}),e.jsx("input",{className:"gnc-input",type:v?"text":"password",placeholder:"Enter your password",value:l,onChange:k=>x(k.target.value),onFocus:()=>d(!0),onBlur:()=>d(!1),onKeyDown:ie,onKeyUp:Y,autoComplete:"current-password",required:!0}),e.jsx("button",{type:"button",className:"gnc-eye-btn",onClick:()=>f(k=>!k),tabIndex:-1,title:v?"Hide":"Show",children:v?"🙈":"👁️"})]})]}),e.jsx("button",{type:"submit",className:`gnc-btn ${w==="success"?"success-btn":""} ${w==="fail"?"fail-btn":""}`,disabled:g,children:Ke()})]}),e.jsxs("div",{className:"gnc-right-footer",children:[e.jsx("span",{children:"🛡️"}),"Authorized personnel only  ·  GNC Admin v9.1"]})]})]})]})}const wt=`
  /* ── Base ── */
  .gnc-prose {
    font-family: 'Plus Jakarta Sans', 'DM Sans', 'Segoe UI', system-ui, sans-serif;
    font-size: 16px;
    line-height: 1.8;
    color: #334155;
    max-width: 100%;
    word-break: break-word;
  }

  /* ── Headings ── */
  .gnc-prose h1, .gnc-prose h2, .gnc-prose h3,
  .gnc-prose h4, .gnc-prose h5, .gnc-prose h6 {
    font-family: 'Plus Jakarta Sans', 'DM Sans', 'Segoe UI', system-ui, sans-serif;
    color: #0f2347;
    font-weight: 800;
    line-height: 1.3;
    margin: 1.8em 0 0.6em;
    letter-spacing: -0.02em;
  }
  .gnc-prose h1 { font-size: 2rem; }
  .gnc-prose h2 {
    font-size: 1.5rem;
    padding-bottom: 10px;
    border-bottom: 3px solid #f4a023;
    display: inline-block;
  }
  .gnc-prose h3 { font-size: 1.25rem; color: #1a3a7c; }
  .gnc-prose h4 { font-size: 1.1rem; color: #1a3a7c; font-weight: 700; }
  .gnc-prose h5, .gnc-prose h6 { font-size: 1rem; color: #64748b; font-weight: 700; }

  /* ── Paragraphs ── */
  .gnc-prose p {
    margin: 0.9em 0 1em;
    color: #334155;
  }

  /* ── Links ── */
  .gnc-prose a {
    color: #1a3a7c;
    text-decoration: underline;
    text-underline-offset: 3px;
    font-weight: 600;
    transition: color 0.2s;
  }
  .gnc-prose a:hover { color: #f4a023; }

  /* ── Bold / Italic ── */
  .gnc-prose strong, .gnc-prose b { color: #0f2347; font-weight: 700; }
  .gnc-prose em, .gnc-prose i { color: #475569; }

  /* ── Horizontal Rule ── */
  .gnc-prose hr {
    border: none;
    border-top: 2px solid #e2e8f0;
    margin: 2em 0;
  }

  /* ── Lists ── */
  .gnc-prose ul, .gnc-prose ol {
    padding-left: 1.6em;
    margin: 0.8em 0 1.2em;
    color: #334155;
  }
  .gnc-prose ul { list-style: none; }
  .gnc-prose ul li {
    position: relative;
    padding-left: 1.2em;
    margin-bottom: 0.5em;
  }
  .gnc-prose ul li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.65em;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #f4a023;
  }
  .gnc-prose ol li { margin-bottom: 0.5em; }
  .gnc-prose ol li::marker { color: #f4a023; font-weight: 700; }

  /* ── Blockquote ── */
  .gnc-prose blockquote {
    border-left: 4px solid #f4a023;
    background: #fff8ed;
    margin: 1.5em 0;
    padding: 16px 24px;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: #475569;
  }
  .gnc-prose blockquote p { margin: 0; }

  /* ── Inline Code ── */
  .gnc-prose code {
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 2px 7px;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.88em;
    color: #c0392b;
  }
  .gnc-prose pre {
    background: #0f2347;
    border-radius: 10px;
    padding: 20px 24px;
    overflow-x: auto;
    margin: 1.5em 0;
  }
  .gnc-prose pre code {
    background: transparent;
    border: none;
    color: #a8ff78;
    font-size: 0.9em;
    padding: 0;
  }

  /* ── Images ── */
  .gnc-prose img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    margin: 1em 0;
    display: block;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }

  /* ─────────────────────────────────────────────────────────────────────────
     ★ PREMIUM TABLE STYLES ★
     Jodit editor ki plain table ko premium bana deta hai
     Admin ko kuch alag nahi karna — sirf normal table insert karo Jodit mein
  ───────────────────────────────────────────────────────────────────────── */
  .gnc-prose table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0 2em;
    font-size: 0.95rem;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(15, 35, 71, 0.1);
    border: 1px solid #dde8f5;
  }

  /* Header row — navy background */
  .gnc-prose thead tr,
  .gnc-prose table tr:first-child {
    background: linear-gradient(135deg, #0f2347 0%, #1a3a7c 100%) !important;
  }
  .gnc-prose thead th,
  .gnc-prose thead td,
  .gnc-prose table tr:first-child td,
  .gnc-prose table tr:first-child th {
    color: #ffffff !important;
    font-weight: 700 !important;
    font-size: 0.88rem !important;
    letter-spacing: 0.04em !important;
    text-transform: uppercase !important;
    padding: 14px 18px !important;
    border: none !important;
    border-right: 1px solid rgba(255,255,255,0.15) !important;
    background: transparent !important;
  }
  .gnc-prose thead th:last-child,
  .gnc-prose table tr:first-child td:last-child,
  .gnc-prose table tr:first-child th:last-child {
    border-right: none !important;
  }

  /* Gold accent on first column header */
  .gnc-prose thead th:first-child,
  .gnc-prose table tr:first-child td:first-child {
    border-left: 3px solid #f4a023 !important;
  }

  /* Body rows */
  .gnc-prose tbody tr,
  .gnc-prose table tr:not(:first-child) {
    border-bottom: 1px solid #e8f0fa;
    transition: background 0.15s ease;
  }

  /* Zebra striping — odd rows */
  .gnc-prose tbody tr:nth-child(odd),
  .gnc-prose table tr:nth-child(even):not(:first-child) {
    background: #f8faff;
  }

  /* Even rows */
  .gnc-prose tbody tr:nth-child(even),
  .gnc-prose table tr:nth-child(odd):not(:first-child) {
    background: #ffffff;
  }

  /* Row hover */
  .gnc-prose tbody tr:hover,
  .gnc-prose table tr:not(:first-child):hover {
    background: #edf3ff !important;
  }

  /* Body cells */
  .gnc-prose td,
  .gnc-prose tbody th {
    padding: 12px 18px;
    color: #334155;
    font-size: 0.93rem;
    border-right: 1px solid #e8f0fa;
    vertical-align: top;
  }
  .gnc-prose td:last-child { border-right: none; }

  /* First column emphasis */
  .gnc-prose td:first-child {
    font-weight: 600;
    color: #0f2347;
    border-left: 3px solid transparent;
  }
  .gnc-prose tr:hover td:first-child {
    border-left-color: #f4a023;
  }

  /* Responsive table wrapper — horizontal scroll on mobile */
  .gnc-table-wrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 12px;
    margin: 1.5em 0 2em;
  }
  .gnc-table-wrap .gnc-prose table { margin: 0; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .gnc-prose { font-size: 15px; }
    .gnc-prose h1 { font-size: 1.6rem; }
    .gnc-prose h2 { font-size: 1.3rem; }
    .gnc-prose td, .gnc-prose th { padding: 10px 12px; font-size: 0.85rem; }
  }
`;let Ge=!1;const jt=()=>{if(Ge||typeof document=="undefined")return;const t=document.createElement("style");t.id="gnc-prose-styles",t.textContent=wt,document.head.appendChild(t),Ge=!0},kt=t=>t?t.replace(/<table/gi,'<div class="gnc-table-wrap"><table').replace(/<\/table>/gi,"</table></div>"):"",Nt=({title:t})=>e.jsxs("div",{style:{background:"linear-gradient(135deg, #0f2347 0%, #1a3a7c 60%, #0f2347 100%)",padding:"52px 24px 40px",textAlign:"center",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:-40,right:-40,width:200,height:200,borderRadius:"50%",background:"rgba(244,160,35,0.08)",pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",bottom:-30,left:-30,width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,0.04)",pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(90deg, #f4a023, #ffd57e, #f4a023)"}}),e.jsx("h1",{style:{color:"#fff",fontSize:"clamp(1.4rem, 4vw, 2rem)",fontWeight:900,letterSpacing:"-0.02em",margin:0,lineHeight:1.25,fontFamily:"'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif"},children:t||"Page"}),e.jsx("div",{style:{width:60,height:3,background:"#f4a023",borderRadius:2,margin:"12px auto 0"}})]}),St=({path:t})=>{var n;return e.jsxs("div",{style:{textAlign:"center",padding:"80px 24px",color:"#94a3b8"},children:[e.jsx("div",{style:{fontSize:56,marginBottom:16},children:"📄"}),e.jsx("h3",{style:{color:"#64748b",fontWeight:700,fontSize:"1.1rem",margin:"0 0 8px",fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"},children:"Content Coming Soon"}),e.jsx("p",{style:{margin:0,fontSize:14},children:"Admin Panel → Pages & SEO → Add content for this page"}),e.jsxs("code",{style:{display:"inline-block",marginTop:12,background:"#f1f5f9",border:"1px solid #e2e8f0",borderRadius:6,padding:"4px 12px",fontSize:12,color:"#475569"},children:["path: ",t||((n=window.location.hash)==null?void 0:n.replace("#",""))||"/"]})]})},zt=()=>e.jsxs("div",{style:{padding:"32px 24px"},children:[[100,70,90,55,80].map((t,n)=>e.jsx("div",{style:{height:n===0?20:14,width:`${t}%`,background:"linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",backgroundSize:"200% 100%",borderRadius:6,marginBottom:n===0?24:12,animation:"gnc-shimmer 1.5s infinite"}},n)),e.jsx("style",{children:`
      @keyframes gnc-shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `})]}),Ct=()=>{const[t,n]=s.useState(!0),[i,o]=s.useState(null);return s.useEffect(()=>{var g;jt();const l=((g=window.location.hash)==null?void 0:g.replace("#",""))||"",x=l.startsWith("/")?l:"/"+l,p=xe(ge(H,"pages"),fe("createdAt","desc")),m=U(p,r=>{const f=r.docs.map(w=>D({id:w.id},w.data())).find(w=>w.path===x||w.slug===x.replace("/",""));o(f||null),n(!1)},()=>n(!1));return()=>m()},[]),t?e.jsxs("div",{style:{minHeight:"60vh",background:"#f8fafc"},children:[e.jsx("div",{style:{background:"linear-gradient(135deg, #0f2347 0%, #1a3a7c 100%)",padding:"52px 24px 40px",textAlign:"center"},children:e.jsx("div",{style:{height:28,width:240,background:"rgba(255,255,255,0.15)",borderRadius:8,margin:"0 auto"}})}),e.jsx("div",{style:{maxWidth:900,margin:"0 auto"},children:e.jsx(zt,{})})]}):e.jsxs("div",{style:{minHeight:"60vh",background:"#f8fafc"},children:[e.jsx(Nt,{title:(i==null?void 0:i.title)||"Page"}),e.jsx("div",{style:{maxWidth:900,margin:"0 auto",padding:"40px 24px 80px"},children:i!=null&&i.content?e.jsx("div",{className:"gnc-prose",dangerouslySetInnerHTML:{__html:ot.sanitize(kt(i.content))}}):e.jsx(St,{})})]})},At=[{id:"f1",image:"images/slider_baisakhi.webp",title:"BAISAKHI DI SHAAM Celebration",subtitle:"Celebrating culture and traditions"},{id:"f2",image:"images/slider_cricket.webp",title:"Inter College BBMKU Cricket Winners",subtitle:"Celebrating sportsmanship and victory"},{id:"f3",image:"images/slider_ncc.webp",title:'NCC "At Home Function" Participants',subtitle:"Dedicated NCC Cadets & Commanders"},{id:"f4",image:"images/slider_youth_winners.webp",title:"BBMKU Youth Festival Champions",subtitle:"Winners of BBMKU Inter College Youth Festival — अंतर्नाद"},{id:"f5",image:"images/slider_seminar.webp",title:"ICSSR Multidisciplinary National Seminar",subtitle:"G20: A Global Platform for Economic Development"}],Xe=t=>{if(!t)return{webp:"",jpg:""};if(t.startsWith("http://")||t.startsWith("https://"))return{webp:t,jpg:t};const o=`/gncollege-website/${t.startsWith("/")?t.slice(1):t}`;return{webp:o.replace(/\.(jpg|jpeg|png)$/i,".webp"),jpg:o}},Et=t=>{const{webp:n,jpg:i}=Xe(t),o=document.querySelectorAll('link[rel="preload"][as="image"]');if(Array.from(o).map(m=>m.href).some(m=>m.includes("slider_baisakhi")))return;const x=document.createElement("link");x.rel="preload",x.as="image",x.href=n,x.type="image/webp";const p=document.createElement("link");p.rel="preload",p.as="image",p.href=i,document.head.appendChild(x),document.head.appendChild(p)},Lt=({slides:t=[]})=>{const[n,i]=s.useState(0),[o,l]=s.useState(!1),[x,p]=s.useState(new Set([0])),m=s.useRef(null),g=s.useRef(null),r=s.useMemo(()=>!t||t.length===0?At:[...t].sort((a,u)=>(Number(a.order)||0)-(Number(u.order)||0)),[t]),v=r.length,f=s.useCallback(()=>i(a=>a===v-1?0:a+1),[v]),w=s.useCallback(()=>i(a=>a===0?v-1:a-1),[v]);s.useEffect(()=>{i(0),p(new Set([0]))},[v]),s.useEffect(()=>{var a;(a=r[0])!=null&&a.image&&Et(r[0].image)},[]),s.useEffect(()=>{if(v<=1||o)return;const a=setInterval(f,5e3);return()=>clearInterval(a)},[v,o,f]),s.useEffect(()=>{p(a=>{const u=n===v-1?0:n+1,y=n===0?v-1:n-1,d=new Set(a);return d.add(n),d.add(u),d.add(y),d})},[n,v]);const S=a=>{m.current=a.targetTouches[0].clientX},L=a=>{g.current=a.targetTouches[0].clientX},C=()=>{if(!m.current||!g.current)return;const a=m.current-g.current;Math.abs(a)>50&&(a>0?f():w()),m.current=null,g.current=null};return e.jsxs("div",{className:"hs-root",onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),onTouchStart:S,onTouchMove:L,onTouchEnd:C,children:[e.jsx("style",{children:`
        @keyframes hs-kenburns {
          0%   { transform: scale(1.05); filter: brightness(.88); }
          100% { transform: scale(1.15) translate(-1%,-1%); filter: brightness(1); }
        }
        @keyframes hs-fadeup {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes hs-hr {
          from { width:0; }
          to   { width: clamp(50px,8vw,80px); }
        }

        .hs-root {
          width:100%; position:relative; overflow:hidden;
          background:#0f2347;
          height: clamp(260px,52vw,580px);
          max-height: 600px;
          contain: layout style;
        }
        @media(max-width:480px) { .hs-root { height: clamp(220px,55vw,340px); } }

        .hs-slide {
          position:absolute; inset:0;
          opacity:0;
          transition: opacity 1.4s cubic-bezier(.33,1,.68,1);
          will-change: opacity;
          pointer-events:none;
        }
        .hs-slide::after {
          content:''; position:absolute; inset:0; z-index:1;
          background: linear-gradient(to top, rgba(15,35,71,.75) 0%, rgba(15,35,71,.25) 50%, transparent 100%);
        }
        .hs-slide.cur {
          opacity:1; transition-delay:.1s; pointer-events:auto;
        }

        /* ── Picture/Image ── */
        .hs-pic { width:100%; height:100%; display:block; }
        .hs-img {
          width:100%; height:100%; object-fit:cover;
          object-position: center 20%;
          will-change: transform;
          display:block;
        }
        .hs-slide.cur .hs-img { animation: hs-kenburns 12s ease-out forwards; }

        /* ── Skeleton loader while image loading ── */
        .hs-skeleton {
          position:absolute; inset:0;
          background: linear-gradient(90deg, #0f2347 25%, #1a3a6c 50%, #0f2347 75%);
          background-size: 200% 100%;
          animation: hs-shimmer 1.5s infinite;
        }
        @keyframes hs-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Content ── */
        .hs-content {
          position:absolute; bottom:0; left:0; right:0; z-index:2;
          padding: clamp(40px,8vw,90px) clamp(16px,4vw,48px) clamp(20px,3.5vw,36px);
          text-align:center; color:#fff;
        }
        .hs-title {
          font-size: clamp(16px,3.5vw,34px);
          font-weight:800; letter-spacing:.4px;
          text-shadow: 0 2px 14px rgba(0,0,0,.5);
          margin-bottom: clamp(6px,.8vw,10px);
          line-height:1.25; opacity:0;
        }
        .hs-subtitle {
          font-size: clamp(12px,1.8vw,19px);
          font-weight:500; color:#e2e8f0;
          text-shadow: 1px 1px 5px rgba(0,0,0,.45);
          margin-bottom: clamp(12px,2vw,20px);
          opacity:0; line-height:1.4;
        }
        .hs-hr {
          border: 2px solid #f4a023;
          width: clamp(50px,8vw,80px); margin:0 auto;
          border-radius:4px; opacity:0;
        }
        .hs-slide.cur .hs-title    { animation: hs-fadeup .8s .4s both cubic-bezier(.2,.6,.2,1); }
        .hs-slide.cur .hs-subtitle { animation: hs-fadeup .8s .6s both cubic-bezier(.2,.6,.2,1); }
        .hs-slide.cur .hs-hr       { animation: hs-hr    .8s .8s both cubic-bezier(.2,.6,.2,1); opacity:1; }

        /* ── Arrows ── */
        .hs-arrow {
          position:absolute; top:50%; transform:translateY(-50%) scale(.85);
          width: clamp(36px,4.5vw,48px); height: clamp(36px,4.5vw,48px);
          background:rgba(15,35,71,.32); color:#fff;
          font-size: clamp(14px,2vw,20px);
          display:flex; justify-content:center; align-items:center;
          cursor:pointer; border-radius:50%; z-index:11;
          transition:all .3s; backdrop-filter:blur(4px);
          border:1px solid rgba(255,255,255,.12); opacity:0;
        }
        .hs-root:hover .hs-arrow { opacity:1; transform:translateY(-50%) scale(1); }
        .hs-arrow:hover { background:#f4a023; color:#000; transform:translateY(-50%) scale(1.1); }
        .hs-prev { left: clamp(10px,2vw,28px); }
        .hs-next { right: clamp(10px,2vw,28px); }
        @media(hover:none) { .hs-arrow { opacity:.7 !important; } }

        /* ── Dots ── */
        .hs-dots {
          position:absolute; bottom: clamp(12px,2vw,20px);
          left:50%; transform:translateX(-50%);
          display:flex; gap: clamp(7px,1vw,12px); z-index:11;
        }
        .hs-dot {
          width: clamp(7px,1vw,10px); height: clamp(7px,1vw,10px);
          border-radius:50%; background:rgba(255,255,255,.4);
          cursor:pointer; transition:all .4s; border:none; padding:0;
        }
        .hs-dot.cur { background:#f4a023; transform:scale(1.3); box-shadow:0 0 10px rgba(244,160,35,.5); }
      `}),r.map((a,u)=>{const y=x.has(u),{webp:d,jpg:j}=Xe(a.image);return e.jsx("div",{className:`hs-slide${u===n?" cur":""}`,children:y?e.jsxs(e.Fragment,{children:[e.jsxs("picture",{className:"hs-pic",style:{width:"100%",height:"100%",display:"block"},children:[e.jsx("source",{srcSet:d,type:"image/webp"}),e.jsx("img",{src:j,alt:a.title||`Slide ${u+1}`,className:"hs-img",loading:u===0?"eager":"lazy",fetchpriority:u===0?"high":"low",decoding:u===0?"sync":"async",width:"1920",height:"580",sizes:"100vw",onError:z=>{z.target.style.opacity=".15"}})]}),e.jsxs("div",{className:"hs-content",children:[e.jsx("h2",{className:"hs-title",children:a.title}),e.jsx("p",{className:"hs-subtitle",children:a.subtitle}),e.jsx("hr",{className:"hs-hr"})]})]}):e.jsx("div",{className:"hs-skeleton"})},a.id||u)}),v>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"hs-arrow hs-prev",onClick:w,"aria-label":"Previous slide",children:"❮"}),e.jsx("button",{className:"hs-arrow hs-next",onClick:f,"aria-label":"Next slide",children:"❯"})]}),e.jsx("div",{className:"hs-dots",role:"tablist","aria-label":"Slide navigation",children:r.map((a,u)=>e.jsx("button",{className:`hs-dot${u===n?" cur":""}`,onClick:()=>i(u),"aria-label":`Slide ${u+1}`,role:"tab","aria-selected":u===n},u))})]})},Pt=({items:t})=>{if(!t||t.length===0)return null;const n=[...t,...t];return e.jsxs("div",{className:"ticker-wrapper",children:[e.jsx("style",{children:`
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
          background: ${b.gold};
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
        .ticker-item a:hover { color: ${b.gold}; }
        .ticker-item::before { content: '✦'; color: ${b.gold}; font-size: 10px; opacity: 0.7; }
        @keyframes scrollTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}),e.jsx("div",{className:"ticker-label",children:"Latest Updates"}),e.jsx("div",{className:"ticker-container",children:e.jsx("div",{className:"ticker-track",children:n.map((i,o)=>e.jsx("div",{className:"ticker-item",children:e.jsx("a",{href:i.link||"#",target:"_blank",rel:"noopener noreferrer",children:i.text})},o))})})]})};var Fe;const X=(Fe=b)==null?void 0:Fe.navy;var qe;const K=(qe=b)==null?void 0:qe.gold;function Le(t=.1){const n=s.useRef(null),[i,o]=s.useState(!1);return s.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion:reduce)").matches){o(!0);return}const l=n.current;if(!l)return;const x=new IntersectionObserver(([p])=>{p.isIntersecting&&(o(!0),x.unobserve(l))},{threshold:t,rootMargin:"0px 0px -40px 0px"});return x.observe(l),()=>x.disconnect()},[t]),[n,i]}const Rt=[{slug:"bca",short:"BCA",full:`Bachelor of Computer
Applications`,icon:"💻",color:"#0ea5e9",gradient:"linear-gradient(145deg,#0c1f5e 0%,#0369a1 55%,#0ea5e9 100%)",tagline:`Programming · Database
Software Development`,symbol:"{ }",path:"/academics/departments/bca"},{slug:"bba",short:"BBA",full:`Bachelor of Business
Administration`,icon:"📊",color:"#f59e0b",gradient:"linear-gradient(145deg,#3b1a02 0%,#b45309 55%,#f59e0b 100%)",tagline:`Management · Finance
Entrepreneurship`,symbol:"↗",path:"/academics/departments/bba"},{slug:"commerce",short:"Commerce",full:`Department of
Commerce`,icon:"🏦",color:"#10b981",gradient:"linear-gradient(145deg,#022c22 0%,#065f46 55%,#10b981 100%)",tagline:`Accounting · Business
Tax & Economics`,symbol:"₹",path:"/academics/departments/commerce"},{slug:"humanities",short:"Humanities",full:`Department of
Humanities`,icon:"📚",color:"#a78bfa",gradient:"linear-gradient(145deg,#1e0a4a 0%,#5b21b6 55%,#a78bfa 100%)",tagline:`English · Hindi
Literature & Philosophy`,symbol:"Aa",path:"/academics/departments/humanities"},{slug:"social-science",short:"Social Sci",full:`Department of
Social Science`,icon:"🌍",color:"#f87171",gradient:"linear-gradient(145deg,#3b0a0a 0%,#991b1b 55%,#f87171 100%)",tagline:`History · Geography
Political Science`,symbol:"⊕",path:"/academics/departments/social-science"}],It=`
  .hf-wrap { font-family:"Amazon Ember","DM Sans",-apple-system,BlinkMacSystemFont,sans-serif; }

  /* ── Glow card ── */
  .gc{position:relative;z-index:0;display:block;}
  .gc::before{content:'';position:absolute;inset:-3px;border-radius:inherit;background:conic-gradient(from 0deg,#a855f7,#ec4899,#f97316,#eab308,#06b6d4,#6366f1,#a855f7);opacity:0;filter:blur(10px);z-index:-1;transition:opacity .35s ease;}
  .gc:hover::before{opacity:.55;}
  .gc.r18{border-radius:20px;} .gc.r22{border-radius:24px;}

  /* ── Scroll anim ── */
  .sa2{opacity:0;transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1);}
  .sa2.up{transform:translateY(32px);} .sa2.scale{transform:scale(.94);} .sa2.fade{transform:none;}
  .sa2.vis{opacity:1;transform:none;}
  .sa2-d1{transition-delay:.06s;} .sa2-d2{transition-delay:.12s;} .sa2-d3{transition-delay:.18s;}
  .sa2-d4{transition-delay:.24s;} .sa2-d5{transition-delay:.30s;}
  @media(max-width:600px){
    .sa2{transition-duration:.4s;}
    .sa2-d1,.sa2-d2,.sa2-d3,.sa2-d4,.sa2-d5{transition-delay:0s;}
    .sa2.up{transform:translateY(18px);}
  }

  /* ── Section header ── */
  .hf-section-header{text-align:center;margin-bottom:clamp(32px,5vw,52px);}
  .hf-sec-label{
    display:inline-flex;align-items:center;gap:8px;
    background:rgba(15,35,71,.06);border:1px solid rgba(15,35,71,.12);
    color:${X};padding:5px 16px;border-radius:20px;
    font-size:clamp(9px,.75vw,11px);font-weight:800;letter-spacing:2px;
    text-transform:uppercase;margin-bottom:12px;
  }
  .hf-sec-h{
    font-family:'Syne',sans-serif;color:#111827;
    font-size:clamp(22px,3.5vw,42px);font-weight:900;
    margin:0 0 10px;letter-spacing:clamp(-.5px,-.05vw,-1px);line-height:1.1;
  }
  .hf-sec-h span{color:${K};}
  .hf-sec-sub{
    color:#6b7280;font-size:clamp(13px,.95vw,15px);
    max-width:520px;line-height:1.65;margin:0 auto;
  }

  /* ═══════════════════════════
     DEPARTMENTS SECTION
  ═══════════════════════════ */
  .hf-dept-sec{
    padding:clamp(50px,8vw,110px) clamp(16px,3vw,32px);
    background:#fff;position:relative;overflow:hidden;
  }
  .hf-dept-sec::before{
    content:'';position:absolute;inset:0;
    background-image:radial-gradient(#e5e7eb 1px,transparent 1px);
    background-size:28px 28px;opacity:.5;pointer-events:none;
  }
  .hf-dept-inner{max-width:1360px;margin:0 auto;position:relative;z-index:1;}

  /* Fluid 5-col grid */
  .hf-dept-grid{
    display:grid;
    grid-template-columns:repeat(5,1fr);
    gap:clamp(10px,1.5vw,18px);
  }

  /* Dept card */
  .hf-dc{
    position:relative;border-radius:22px;overflow:hidden;
    height:clamp(260px,28vw,360px);
    cursor:pointer;text-decoration:none;display:block;
    transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s;
  }
  .gc:hover .hf-dc{transform:translateY(-7px) scale(1.02);box-shadow:0 10px 32px rgba(0,0,0,.18);}
  .hf-dc-bg{position:absolute;inset:0;}
  .hf-dc::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 20%,rgba(0,0,0,.72) 100%);z-index:1;}
  .hf-dc-sym{position:absolute;top:10px;right:12px;font-size:clamp(44px,6vw,72px);font-weight:900;font-family:'Syne',sans-serif;color:rgba(255,255,255,.12);line-height:1;transition:transform .4s,opacity .4s;pointer-events:none;z-index:2;user-select:none;}
  .gc:hover .hf-dc-sym{transform:scale(1.2) rotate(-8deg);opacity:.22;}
  .hf-dc-top{position:absolute;top:14px;left:14px;z-index:3;background:rgba(255,255,255,.12);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.18);color:#fff;font-size:clamp(8px,.65vw,10px);font-weight:800;letter-spacing:1.5px;text-transform:uppercase;padding:4px 10px;border-radius:20px;}
  .hf-dc-body{position:absolute;bottom:0;left:0;right:0;padding:clamp(14px,2vw,22px);z-index:3;}
  .hf-dc-icon{width:clamp(36px,4vw,46px);height:clamp(36px,4vw,46px);border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:clamp(18px,2.2vw,23px);margin-bottom:10px;background:rgba(255,255,255,.18);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.25);transition:transform .3s;flex-shrink:0;}
  .gc:hover .hf-dc-icon{transform:rotate(-8deg) scale(1.1);}
  .hf-dc-name{font-family:'Syne',sans-serif;font-size:clamp(13px,1.3vw,17px);font-weight:900;color:#fff;white-space:pre-line;line-height:1.2;margin-bottom:7px;}
  .hf-dc-tag{font-size:clamp(10px,.85vw,12px);color:rgba(255,255,255,.65);white-space:pre-line;line-height:1.45;margin-bottom:14px;}
  .hf-dc-cta{display:inline-flex;align-items:center;gap:5px;font-size:clamp(9px,.75vw,11px);font-weight:800;letter-spacing:1px;text-transform:uppercase;padding:6px 12px;border-radius:7px;background:rgba(255,255,255,.14);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.2);color:#fff;transition:background .2s;}
  .gc:hover .hf-dc-cta{background:rgba(255,255,255,.26);}
  .hf-dc-cta .arr{display:inline-block;transition:transform .2s;}
  .gc:hover .hf-dc-cta .arr{transform:translateX(5px);}

  /* View all */
  .hf-viewall-wrap{display:flex;justify-content:center;margin-top:clamp(24px,3vw,38px);}
  .hf-viewall{display:inline-flex;align-items:center;gap:9px;background:${X};border:1px solid ${X};color:#fff;padding:clamp(10px,1.2vw,13px) clamp(20px,2.5vw,28px);border-radius:4px;font-size:clamp(12px,.9vw,13.5px);font-weight:700;text-decoration:none;transition:background .2s,transform .2s,box-shadow .2s;}
  .hf-viewall .arr{display:inline-block;transition:transform .2s;}
  .hf-viewall:hover{background:${K};border-color:${K};color:${X};box-shadow:0 4px 16px rgba(244,160,35,.35);transform:translateY(-2px);}
  .hf-viewall:hover .arr{transform:translateX(5px);}

  /* ═══════════════════════════
     FACILITIES SECTION
  ═══════════════════════════ */
  .hf-fac-sec{
    padding:clamp(50px,8vw,110px) clamp(16px,3vw,32px);
    background:#fff;position:relative;
    border-top:1px solid #f3f4f6;overflow:hidden;
  }
  .hf-fac-sec::before{content:'';position:absolute;inset:0;background-image:radial-gradient(#e5e7eb 1px,transparent 1px);background-size:28px 28px;opacity:.45;pointer-events:none;}
  .hf-fac-inner{max-width:1300px;margin:0 auto;position:relative;z-index:1;}
  .hf-fac-label{display:inline-flex;align-items:center;gap:8px;background:rgba(15,35,71,.06);border:1px solid rgba(15,35,71,.12);color:${X};padding:5px 16px;border-radius:20px;font-size:clamp(9px,.75vw,11px);font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;}
  .hf-fac-h{font-family:'Syne',sans-serif;color:#111827;font-size:clamp(22px,3vw,38px);font-weight:900;margin:0 0 10px;letter-spacing:-.7px;}
  .hf-fac-h span{color:${K};}
  .hf-fac-sub{color:#6b7280;font-size:clamp(13px,.95vw,15px);margin:0 auto clamp(30px,4vw,46px);max-width:500px;line-height:1.65;}

  /* Fluid facility grid */
  .hf-fac-grid{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(clamp(100px,11vw,145px),1fr));
    gap:clamp(10px,1.2vw,16px);
  }

  /* Facility card */
  .hf-fc{
    background:rgba(255,255,255,.9);backdrop-filter:blur(12px);
    border:1px solid #e5e7eb;border-radius:16px;
    padding:clamp(18px,2.5vw,28px) clamp(8px,1.2vw,14px) clamp(16px,2vw,22px);
    text-align:center;display:flex;flex-direction:column;align-items:center;
    gap:clamp(8px,1vw,12px);position:relative;overflow:hidden;
    transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s,border-color .25s;
    cursor:default;box-shadow:0 1px 4px rgba(0,0,0,.06);
  }
  .hf-fc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${K},${X});opacity:0;transition:opacity .25s;border-radius:16px 16px 0 0;}
  .gc:hover .hf-fc{transform:translateY(-6px) scale(1.03);box-shadow:0 10px 26px rgba(15,35,71,.1);border-color:transparent;}
  .gc:hover .hf-fc::before{opacity:1;}
  .hf-fc-icon{font-size:clamp(26px,3.5vw,38px);line-height:1;transition:transform .3s;filter:drop-shadow(0 3px 6px rgba(0,0,0,.1));}
  .gc:hover .hf-fc-icon{transform:scale(1.25) rotate(-8deg);}
  .hf-fc-name{font-size:clamp(9.5px,.8vw,12px);font-weight:800;color:${X};text-transform:uppercase;letter-spacing:.5px;line-height:1.3;text-align:center;transition:color .2s;}
  .gc:hover .hf-fc-name{color:${K};}

  /* ═══════════════════════════
     RESPONSIVE BREAKPOINTS
  ═══════════════════════════ */
  /* Large tablets */
  @media(max-width:1200px){
    .hf-dept-grid{grid-template-columns:repeat(3,1fr);}
    .hf-dc{height:clamp(240px,26vw,300px);}
  }
  /* Small tablets */
  @media(max-width:768px){
    .hf-dept-grid{grid-template-columns:repeat(2,1fr);}
    .hf-dc{height:clamp(220px,40vw,280px);}
    .hf-fac-grid{grid-template-columns:repeat(auto-fill,minmax(90px,1fr));}
  }
  /* Large phones */
  @media(max-width:480px){
    .hf-dept-grid{grid-template-columns:1fr 1fr;}
    .hf-dc{height:clamp(200px,48vw,250px);}
    .hf-dc-tag{display:none;}
    .hf-fac-grid{grid-template-columns:repeat(3,1fr);}
  }
  /* Small phones */
  @media(max-width:360px){
    .hf-dept-grid{grid-template-columns:1fr;}
    .hf-dc{height:200px;}
    .hf-fac-grid{grid-template-columns:repeat(2,1fr);}
  }
  /* Wide screens */
  @media(min-width:1400px){
    .hf-fac-grid{grid-template-columns:repeat(8,1fr);}
  }
`,we=({children:t,variant:n="up",d:i="",tag:o="div",style:l={},className:x=""})=>{const[p,m]=Le();return e.jsx(o,{ref:p,className:`sa2 ${n}${m?" vis":""}${i?` sa2-${i}`:""}${x?" "+x:""}`,style:l,children:t})},$t=({dept:t,delay:n})=>{const[i,o]=Le(.08);return e.jsx("div",{ref:i,className:`sa2 up${o?" vis":""} sa2-d${n}`,children:e.jsx("div",{className:"gc r22",children:e.jsxs(_,{to:t.path,className:"hf-dc",children:[e.jsx("div",{className:"hf-dc-bg",style:{background:t.gradient}}),e.jsx("div",{className:"hf-dc-sym",children:t.symbol}),e.jsx("div",{className:"hf-dc-top",children:t.short}),e.jsxs("div",{className:"hf-dc-body",children:[e.jsx("div",{className:"hf-dc-icon",children:t.icon}),e.jsx("div",{className:"hf-dc-name",children:t.full}),e.jsx("div",{className:"hf-dc-tag",children:t.tagline}),e.jsxs("div",{className:"hf-dc-cta",children:["Explore ",e.jsx("span",{className:"arr",children:"›"})]})]})]})})})},_t=({ft:t,delay:n})=>{const[i,o]=Le(.05);return e.jsx("div",{ref:i,className:`sa2 scale${o?" vis":""} sa2-d${Math.min(n+1,5)}`,children:e.jsx("div",{className:"gc r18",children:e.jsxs("div",{className:"hf-fc",children:[e.jsx("div",{className:"hf-fc-icon",children:t.emoji}),e.jsx("div",{className:"hf-fc-name",children:t.name})]})})})};function Dt(){return e.jsxs("div",{className:"hf-wrap",children:[e.jsx("style",{children:It}),e.jsx("section",{className:"hf-dept-sec",children:e.jsxs("div",{className:"hf-dept-inner",children:[e.jsx(we,{variant:"up",children:e.jsxs("div",{className:"hf-section-header",children:[e.jsx("div",{children:e.jsx("div",{className:"hf-sec-label",children:"🏛️ Academic Excellence"})}),e.jsxs("h2",{className:"hf-sec-h",children:["Our Academic ",e.jsx("span",{children:"Departments"})]}),e.jsx("p",{className:"hf-sec-sub",children:"Har department mein expert faculty, modern curriculum aur career-ready approach"})]})}),e.jsx("div",{className:"hf-dept-grid",children:Rt.map((t,n)=>e.jsx($t,{dept:t,delay:Math.min(n+1,5)},t.slug))}),e.jsx(we,{variant:"fade",children:e.jsx("div",{className:"hf-viewall-wrap",children:e.jsxs(_,{to:"/academics/departments",className:"hf-viewall",children:["View All Departments ",e.jsx("span",{className:"arr",children:"›"})]})})})]})}),e.jsx("section",{className:"hf-fac-sec",children:e.jsxs("div",{className:"hf-fac-inner",children:[e.jsx(we,{variant:"up",children:e.jsxs("div",{className:"hf-section-header",style:{textAlign:"center",marginBottom:"clamp(30px,4vw,46px)"},children:[e.jsx("div",{children:e.jsx("div",{className:"hf-fac-label",children:"⭐ World-Class Infrastructure"})}),e.jsxs("h2",{className:"hf-fac-h",children:["College ",e.jsx("span",{children:"Facilities"})]}),e.jsx("p",{className:"hf-fac-sub",children:"Students ke holistic development ke liye — modern labs, library, sports aur bahut kuch"})]})}),e.jsx("div",{className:"hf-fac-grid",children:(xt||[]).map((t,n)=>e.jsx(_t,{ft:t,delay:n%5},n))})]})})]})}const ce=({title:t,subtitle:n,darkBg:i=!1})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:40},children:[e.jsx("h2",{style:{fontSize:28,fontWeight:800,color:i?"#fff":b.navy,marginBottom:8},children:t}),e.jsx("div",{style:{width:60,height:4,background:b.gold,margin:"0 auto 12px",borderRadius:2}}),n&&e.jsx("p",{style:{color:i?"rgba(255,255,255,0.72)":"#666",fontSize:15,textAlign:"center",maxWidth:600,margin:"0 auto"},children:n})]}),Mt=({notices:t,announcements:n,pdfReports:i,upcomingEvents:o})=>{const l=s.useRef(null),x=s.useRef(null),p=s.useRef(null),m=s.useRef(null),g=s.useRef(null),r=s.useRef(null),v=s.useMemo(()=>[...t||[],...t||[]],[t]),f=s.useMemo(()=>{const a=(o||[]).map(y=>{var d,j;return F(D({},y),{text:y.title,date:((j=(d=y.createdAt)==null?void 0:d.toDate)==null?void 0:j.call(d))||y.date,type:y.type||"Event"})}),u=(n||[]).map(y=>{var d,j;return F(D({},y),{date:((j=(d=y.createdAt)==null?void 0:d.toDate)==null?void 0:j.call(d))||y.date,type:y.type||"News"})});return[...a,...u].sort((y,d)=>(d.date||0)-(y.date||0))},[o,n]),w=s.useMemo(()=>[...f,...f],[f]),S=s.useMemo(()=>{const a=(i||[]).map(u=>{var y,d;return F(D({},u),{text:u.title,date:((d=(y=u.createdAt)==null?void 0:y.toDate)==null?void 0:d.call(y))||u.date,type:"Document"})});return[...a,...a]},[i]),L=(a,u)=>{const y=a.current;if(!y)return;let d=0;const j=()=>{d-=.6,d<-y.scrollHeight/2&&(d=0),y.style.transform=`translateY(${d}px)`,u.current=requestAnimationFrame(j)};u.current=requestAnimationFrame(j)},C=a=>{a.current&&(cancelAnimationFrame(a.current),a.current=null)};return s.useEffect(()=>{const a=l.current;if(!a)return;const u=()=>C(m),y=()=>L(l,m);return a.addEventListener("mouseenter",u),a.addEventListener("mouseleave",y),L(l,m),()=>{C(m),a.removeEventListener("mouseenter",u),a.removeEventListener("mouseleave",y)}},[v]),s.useEffect(()=>{const a=x.current;if(!a)return;const u=()=>C(g),y=()=>L(x,g);return a.addEventListener("mouseenter",u),a.addEventListener("mouseleave",y),L(x,g),()=>{C(g),a.removeEventListener("mouseenter",u),a.removeEventListener("mouseleave",y)}},[w]),s.useEffect(()=>{const a=p.current;if(!a)return;const u=()=>C(r),y=()=>L(p,r);return a.addEventListener("mouseenter",u),a.addEventListener("mouseleave",y),L(p,r),()=>{C(r),a.removeEventListener("mouseenter",u),a.removeEventListener("mouseleave",y)}},[S]),e.jsxs("section",{style:{padding:"90px 20px",background:"#f8fafc",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"300px",background:"linear-gradient(180deg,#f1f5f9 0%,rgba(248,250,252,0) 100%)",zIndex:0}}),e.jsxs("div",{style:{maxWidth:1350,margin:"0 auto",position:"relative",zIndex:1},children:[e.jsx(ce,{title:"Notification & Announcements",subtitle:"Stay informed with the latest official updates and campus news"}),e.jsx("style",{children:`
          /* ── Glow card wrapper ── */
          .nc-glow {
            position: relative;
            z-index: 0;
            border-radius: 26px;      /* must be 2px bigger than inner card */
          }
          .nc-glow::before {
            content: '';
            position: absolute;
            inset: -3px;
            border-radius: inherit;
            background: conic-gradient(
              from 0deg,
              #a855f7, #ec4899, #f97316, #eab308,
              #06b6d4, #6366f1, #a855f7
            );
            opacity: 0;
            filter: blur(10px);
            z-index: -1;
            transition: opacity .35s ease;
          }
          .nc-glow:hover::before { opacity: .6; }

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
          .nc-glow:hover .notif-card {
            transform: translateY(-8px);
            box-shadow: 0 30px 60px -12px rgba(15,23,42,0.15);
            border-color: transparent;
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
            box-shadow: inset 4px 0 0 0 ${b.gold};
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

          /* Attachment links — trailing arrow */
          .notif-alink {
            font-size: 0.8rem; font-weight: 800; text-decoration: none;
            display: inline-flex; align-items: center; gap: 4px;
          }
          .notif-alink .arr { display: inline-block; transition: transform .2s; }
          .notif-alink:hover .arr { transform: translateX(4px); }

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
          .nc-glow:hover .view-all-btn {
            background: ${b.navy}; color: #fff;
            border-color: ${b.navy}; box-shadow: 0 8px 20px rgba(15,23,42,0.2);
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
          @media (max-width: 768px)  {
            .notif-grid { grid-template-columns: 1fr; gap: 20px; margin-top: 20px; }
            .notif-card { height: 420px; }
          }
        `}),e.jsxs("div",{className:"notif-grid",children:[e.jsx("div",{className:"nc-glow",children:e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-notice",children:[e.jsx("span",{style:{fontSize:26},children:"🔔"})," Official Notices"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:l,children:v.map((a,u)=>{const y=a.isNew&&a.date&&(new Date-new Date(a.date))/864e5<5;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",a.date?new Date(a.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#1e3a8a"},children:a.type||"Notice"}),y&&e.jsx("span",{className:"new-badge-pulse",children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:a.text}}),a.link&&e.jsxs("a",{href:a.link,target:"_blank",rel:"noreferrer",className:"notif-alink",style:{color:"#2563eb"},children:["📎 View Attachment ",e.jsx("span",{className:"arr",children:"›"})]})]},u)})})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx(_,{to:"/notifications",className:"view-all-btn",children:"View All Notices"})})]})}),e.jsx("div",{className:"nc-glow",children:e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-news",children:[e.jsx("span",{style:{fontSize:26},children:"📣"})," News & Events"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:x,children:w.map((a,u)=>{const y=a.isNew||!1||a.date&&(new Date-new Date(a.date))/864e5<5;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",a.date?new Date(a.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#e11d48"},children:a.type||"Update"}),y&&e.jsx("span",{className:"new-badge-pulse",children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:a.text||a.title}}),a.desc&&e.jsx("div",{className:"rich-text-desc",dangerouslySetInnerHTML:{__html:a.desc}}),a.link&&e.jsxs("a",{href:a.link,target:"_blank",rel:"noreferrer",className:"notif-alink",style:{color:"#e11d48"},children:["🔗 Read More ",e.jsx("span",{className:"arr",children:"›"})]})]},u)})})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx(_,{to:"/news",className:"view-all-btn",children:"Explore News"})})]})}),e.jsx("div",{className:"nc-glow",children:e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-docs",children:[e.jsx("span",{style:{fontSize:26},children:"📄"})," E-Documents"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:p,children:S.map((a,u)=>e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",a.date?new Date(a.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#059669"},children:a.type||"Document"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:a.text||a.title}}),a.link&&e.jsxs("a",{href:a.link,target:"_blank",rel:"noreferrer",className:"notif-alink",style:{color:"#059669"},children:["⬇️ Download PDF ",e.jsx("span",{className:"arr",children:"›"})]})]},u))})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx(_,{to:"/documents",className:"view-all-btn",children:"Document Archive"})})]})})]})]})]})},J="#0f2347",ee="#f4a023",Tt={tcs:"#0066cc",wipro:"#7c3aed",infosys:"#007dc1",accenture:"#a100ff",hcl:"#00b0ea",ibm:"#054ada",bank:"#16a34a",bsnl:"#ea580c",sbi:"#1d4ed8",google:"#4285f4",amazon:"#f59e0b",microsoft:"#0284c7",flipkart:"#2874f0",zomato:"#e23744",cognizant:"#1a77c9",capgemini:"#0070c0"},Bt=(t="")=>{const n=t.toLowerCase();for(const[i,o]of Object.entries(Tt))if(n.includes(i))return o;return J},Gt=`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap&subset=latin');
  .wof-root,.wof-root *{box-sizing:border-box;}
  .wof-root{
    padding:72px 0 60px;
    background:#f8fafc;
    border-top:1px solid #e8eef5;
    border-bottom:1px solid #e8eef5;
    overflow:hidden;position:relative;
    font-family:'Inter',sans-serif;
  }

  .wof-head{text-align:center;padding:0 20px 44px;position:relative;z-index:2;}
  .wof-eyebrow{
    display:inline-flex;align-items:center;gap:8px;
    background:#fff;border:1.5px solid #e2e8f0;color:#64748b;
    padding:6px 16px;border-radius:50px;font-size:11px;font-weight:700;
    letter-spacing:1.5px;text-transform:uppercase;margin-bottom:16px;
    box-shadow:0 2px 8px rgba(0,0,0,.04);
  }
  .wof-dot{width:6px;height:6px;border-radius:50%;background:${ee};animation:wof-blink 2s infinite;}
  @keyframes wof-blink{0%,100%{opacity:1;}50%{opacity:.3;}}
  .wof-h2{
    font-family:'Space Grotesk',sans-serif;
    font-size:clamp(24px,3.5vw,36px);font-weight:800;
    color:${J};letter-spacing:-0.5px;line-height:1.2;margin-bottom:8px;
  }
  .wof-h2 span{color:${ee};}
  .wof-sub{font-size:14px;color:#64748b;font-weight:400;max-width:480px;margin:0 auto;}
  .wof-bar{width:44px;height:3px;background:linear-gradient(90deg,${ee},${J});border-radius:2px;margin:14px auto 0;}

  .wof-stats{display:flex;justify-content:center;gap:32px;flex-wrap:wrap;margin-top:24px;}
  .wof-stat{text-align:center;}
  .wof-stat-num{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:800;color:${J};}
  .wof-stat-lbl{font-size:10px;color:#94a3b8;letter-spacing:1px;text-transform:uppercase;margin-top:2px;font-weight:600;}

  .wof-mask{
    overflow:hidden;
    mask:linear-gradient(90deg,transparent 0%,#fff 8%,#fff 92%,transparent 100%);
    -webkit-mask:linear-gradient(90deg,transparent 0%,#fff 8%,#fff 92%,transparent 100%);
    padding:16px 0;
  }
  .wof-track{
    display:flex;width:max-content;gap:16px;
    animation:wof-scroll 40s linear infinite;will-change:transform;
  }
  .wof-track:hover{animation-play-state:paused;}
  @keyframes wof-scroll{0%{transform:translateX(0);}100%{transform:translateX(-33.3333%)}}

  /* ── Glow wrapper for each card ── */
  .wof-gc {
    position: relative;
    z-index: 0;
    border-radius: 18px;   /* 2px bigger than inner card's 16px */
    flex-shrink: 0;
  }
  .wof-gc::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: inherit;
    background: conic-gradient(
      from 0deg,
      #a855f7, #ec4899, #f97316, #eab308,
      #06b6d4, #6366f1, #a855f7
    );
    opacity: 0;
    filter: blur(10px);
    z-index: -1;
    transition: opacity .35s ease;
  }
  .wof-gc:hover::before { opacity: .6; }

  /* ── Inner card ── */
  .wof-card{
    width:220px;
    background:#fff;border:1.5px solid #e8eef5;border-radius:16px;
    padding:22px 18px 18px;text-align:center;cursor:default;
    transition:transform .3s,box-shadow .3s,border-color .3s;
    position:relative;overflow:hidden;
  }
  .wof-gc:hover .wof-card{
    transform:translateY(-6px);
    box-shadow:0 16px 36px rgba(15,35,71,.09);
    border-color:transparent;
  }

  .wof-avatar-wrap{position:relative;width:64px;height:64px;margin:0 auto 14px;}
  .wof-avatar{
    width:64px;height:64px;border-radius:50%;object-fit:cover;
    border:2px solid #e8eef5;transition:border-color .3s;
  }
  .wof-gc:hover .wof-avatar{border-color:${ee};}
  .wof-badge{
    position:absolute;bottom:0;right:0;width:20px;height:20px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;font-size:9px;
    border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.12);
  }

  .wof-name{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;color:${J};margin-bottom:3px;}
  .wof-course{font-size:11px;color:#94a3b8;font-weight:500;margin-bottom:5px;}
  .wof-batch{
    display:inline-block;background:#f1f5f9;color:#475569;
    font-size:10px;font-weight:700;padding:2px 10px;border-radius:50px;
    letter-spacing:.5px;margin-bottom:11px;
  }
  .wof-company{
    display:inline-flex;align-items:center;gap:6px;
    padding:6px 14px;border-radius:50px;font-size:12px;font-weight:700;color:#fff;
  }
  .wof-role{font-size:11px;color:#94a3b8;margin-top:5px;font-weight:500;}
  .wof-pkg{
    margin-top:7px;font-size:11.5px;color:${ee};font-weight:700;
    display:flex;align-items:center;justify-content:center;gap:4px;
  }

  .wof-foot{text-align:center;padding:8px 20px 0;}
  .wof-foot-badge{
    display:inline-flex;align-items:center;gap:8px;
    background:#fff;border:1.5px solid #e2e8f0;color:#64748b;
    padding:8px 20px;border-radius:50px;font-size:12px;font-weight:600;
    box-shadow:0 2px 8px rgba(0,0,0,.04);
  }
  .wof-foot-badge b{color:${J};font-weight:800;}
  .wof-empty{text-align:center;padding:48px 20px;color:#94a3b8;}

  @media(max-width:768px){
    .wof-root{padding:52px 0 40px;}
    .wof-card{width:192px;padding:18px 14px 15px;}
    .wof-stats{gap:20px;}
  }
  @media(max-width:480px){
    .wof-h2{font-size:22px;}
    .wof-card{width:175px;}
    .wof-stats{gap:14px;}
    .wof-stat-num{font-size:18px;}
  }
`,Ot=s.memo(({p:t})=>{const n=Bt(t.company||""),i="/gncollege-website/images/college_photo.jpg";return e.jsx("div",{className:"wof-gc",children:e.jsxs("div",{className:"wof-card",children:[e.jsxs("div",{className:"wof-avatar-wrap",children:[e.jsx("img",{src:t.imageUrl||i,alt:t.name||"Alumni",className:"wof-avatar",loading:"lazy",decoding:"async",onError:o=>{o.currentTarget.src=i}}),e.jsx("div",{className:"wof-badge",style:{background:n},children:"💼"})]}),e.jsx("div",{className:"wof-name",children:t.name}),t.course&&e.jsx("div",{className:"wof-course",children:t.course}),e.jsxs("div",{className:"wof-batch",children:["Batch ",t.year||"—"]}),e.jsxs("div",{className:"wof-company",style:{background:n},children:[e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,.65)",flexShrink:0,display:"inline-block"}}),t.company||"Industry"]}),t.role&&e.jsx("div",{className:"wof-role",children:t.role}),t.package&&e.jsxs("div",{className:"wof-pkg",children:["💰 ",t.package," LPA"]})]})})});function Wt(){const[t,n]=s.useState([]),[i,o]=s.useState(!0);if(s.useEffect(()=>{const g=xe(ge(H,"placements"),fe("createdAt","desc"));return U(g,r=>{n(r.docs.map(v=>D({id:v.id},v.data()))),o(!1)},()=>o(!1))},[]),i)return null;const l=[...new Set(t.map(g=>g.company).filter(Boolean))],x=t.map(g=>parseFloat(g.package)).filter(g=>!isNaN(g)),p=x.length?Math.max(...x):null,m=[...t,...t,...t];return e.jsxs("section",{className:"wof-root",children:[e.jsx("style",{children:Gt}),e.jsxs("div",{className:"wof-head",children:[e.jsxs("div",{className:"wof-eyebrow",children:[e.jsx("div",{className:"wof-dot"})," Our Alumni"]}),e.jsxs("h2",{className:"wof-h2",children:["🏆 Wall of ",e.jsx("span",{children:"Fame"})]}),e.jsx("p",{className:"wof-sub",children:"GNC ke alumni — India ki top companies mein apna career bana rahe hain"}),e.jsx("div",{className:"wof-bar"}),t.length>0&&e.jsxs("div",{className:"wof-stats",children:[e.jsxs("div",{className:"wof-stat",children:[e.jsxs("div",{className:"wof-stat-num",children:[t.length,"+"]}),e.jsx("div",{className:"wof-stat-lbl",children:"Placed"})]}),e.jsxs("div",{className:"wof-stat",children:[e.jsxs("div",{className:"wof-stat-num",children:[l.length,"+"]}),e.jsx("div",{className:"wof-stat-lbl",children:"Companies"})]}),p&&e.jsxs("div",{className:"wof-stat",children:[e.jsxs("div",{className:"wof-stat-num",children:[p," LPA"]}),e.jsx("div",{className:"wof-stat-lbl",children:"Highest Pkg"})]})]})]}),t.length===0?e.jsxs("div",{className:"wof-empty",children:[e.jsx("div",{style:{fontSize:40,marginBottom:12,opacity:.4},children:"🎓"}),e.jsx("div",{style:{fontWeight:600,marginBottom:6,color:"#475569"},children:"Alumni stories loading soon"}),e.jsx("div",{style:{fontSize:13},children:"Admin Panel → Alumni Wall tab se data add karein"})]}):e.jsx("div",{className:"wof-mask",children:e.jsx("div",{className:"wof-track",children:m.map((g,r)=>e.jsx(Ot,{p:g},`${g.id}-${r}`))})}),t.length>0&&e.jsx("div",{className:"wof-foot",children:e.jsxs("div",{className:"wof-foot-badge",children:["✨ ",e.jsx("b",{children:t.length})," success stories — aur badh rahi hain"]})})]})}const N=b.navy,T=b.gold,Ft=(t="")=>t.includes("drive.google.com/file/d/")?`https://drive.google.com/file/d/${t.split("/d/")[1].split("/")[0]}/preview`:t,qt=t=>({SEMINAR:"/images/slider_seminar.webp",WORKSHOP:"/images/slider_ncc.webp",SPORTS:"/images/slider_cricket.webp",CULTURAL:"/images/slider_baisakhi.webp"})[t]||"/images/college_photo.webp",Xt=[{text:"B.A./B.Com. Semester 1 Admissions are now open for 2024-25 session.",link:"/admission/info"},{text:"Results for the Semester 6 internal examinations have been published.",link:"/results"},{text:"The college will remain closed on account of Holi from 24th to 26th March.",link:"#"}],Ht=["All Moments","Seminars","Cultural Fest","Guest Visit","Campus","Departments","NSS Programs"],Ut=[{name:"NAAC",url:"https://naac.gov.in",icon:"🏅"},{name:"UGC",url:"https://ugc.ac.in",icon:"📜"},{name:"INFLIBNET",url:"https://inflibnet.ac.in",icon:"📚"},{name:"NDL INDIA",url:"https://ndl.gov.in",icon:"🔬"},{name:"SWAYAM",url:"https://swayam.gov.in",icon:"🌐"},{name:"BBMK UNIV.",url:"https://bbmku.ac.in",icon:"🏛️"}],Yt=[{label:"Students Enrolled",value:"4,000+",icon:"👨‍🎓"},{label:"Successful Alumni",value:"45,000+",icon:"🎓"},{label:"Expert Faculty",value:"50+",icon:"👨‍🏫"},{label:"Years of Legacy",value:"56",icon:"🏛️"}],Vt=[{icon:"🛡️",title:"NAAC Accredited",desc:"Grade B Institution"},{icon:"👨‍🏫",title:"Expert Faculty",desc:"Highly Experienced"},{icon:"🔬",title:"Modern Labs",desc:"Tech-enabled Learning"},{icon:"🏅",title:"NSS & NCC",desc:"Character Building"}],Kt=[{icon:"📋",title:"Exam Results",sub:"BBMKU result portal",href:"https://bbmkuniv.in/login",color:"#f4a023",bg:"#fffbeb",hoverBg:"#fef3c7",iconBg:"linear-gradient(135deg,#fef3c7,#fde68a)",external:!0},{icon:"💳",title:"Fee Payment",sub:"Online fee portal",href:"https://cimsstudentnewui.mastersofterp.in/",color:"#10b981",bg:"#fff",hoverBg:"#f0fdf4",iconBg:"linear-gradient(135deg,#dcfce7,#bbf7d0)",external:!0},{icon:"🎓",title:"Apply for Admission",sub:"Chancellor portal",href:"https://jharkhanduniversities.nic.in/",color:"#3b82f6",bg:"#fff",hoverBg:"#eff6ff",iconBg:"linear-gradient(135deg,#dbeafe,#bfdbfe)",external:!0},{icon:"📢",title:"Notice Board",sub:"Latest updates",href:"#notifications",color:"#8b5cf6",bg:"#fff",hoverBg:"#fdf4ff",iconBg:"linear-gradient(135deg,#f3e8ff,#e9d5ff)",external:!1}];function He(t={}){const{threshold:n=.12,rootMargin:i="0px 0px -60px 0px"}=t,o=s.useRef(null),[l,x]=s.useState(!1);return s.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){x(!0);return}const p=o.current;if(!p)return;const m=new IntersectionObserver(([g])=>{g.isIntersecting&&(x(!0),m.unobserve(p))},{threshold:n,rootMargin:i});return m.observe(p),()=>m.disconnect()},[n,i]),[o,l]}const Jt=`
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

  /* ── Global glow card system ── */
  .gc{position:relative;z-index:0;display:block;}
  .gc::before{
    content:'';position:absolute;inset:-3px;border-radius:inherit;
    background:conic-gradient(from 0deg,#a855f7,#ec4899,#f97316,#eab308,#06b6d4,#6366f1,#a855f7);
    opacity:0;filter:blur(10px);z-index:-1;transition:opacity .35s ease;
  }
  .gc:hover::before{opacity:.6;}
  .gc.r4{border-radius:6px;} .gc.r12{border-radius:14px;}
  .gc.r14{border-radius:16px;} .gc.r16{border-radius:18px;} .gc.r50{border-radius:52px;}

  /* ── Trailing arrow ── */
  .arr-link .arr{display:inline-block;transition:transform .2s ease;}
  .arr-link:hover .arr{transform:translateX(5px);}
`,Qt=`
  *,*::before,*::after{box-sizing:border-box;}

  p { text-align: justify; }
  h1 + p, h2 + p, h3 + p, h4 + p, h5 + p, h6 + p { text-align: center !important; }

  .hp-watermark{position:fixed;inset:0;background-image:url(/gncollege-website/images/logo.webp);background-repeat:repeat;background-size:320px;opacity:.025;z-index:-1;background-color:#f4f7f9;pointer-events:none;}

  /* ── Quick Action Bar ── */
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
  @media(max-width:768px){
    .hp-qab-inner{grid-template-columns:repeat(2,1fr);}
    .hp-qab-item{padding:13px 16px;border-right:none;border-bottom:1px solid #f1f5f9;}
    .hp-qab-item:nth-child(odd){border-right:1px solid #f1f5f9;}
    .hp-qab-item:nth-last-child(-n+2){border-bottom:none;}
  }
  @media(max-width:420px){
    .hp-qab-inner{grid-template-columns:1fr;}
    .hp-qab-item{border-right:none !important;}
    .hp-qab-item:last-child{border-bottom:none;}
  }

  /* ── About ── */
  .hp-about{background:#fff;padding:clamp(60px,8vw,100px) 20px;overflow:hidden;}
  .hp-about-inner{max-width:1250px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:56px;align-items:center;}
  .hp-imgstack{position:relative;width:100%;height:420px;}
  .hp-img-main{width:90%;height:100%;object-fit:cover;border-radius:20px;box-shadow:20px 20px 0 ${T};position:relative;z-index:2;transition:transform .5s;}
  .hp-imgstack:hover .hp-img-main{transform:scale(1.02);}
  .hp-img-accent{position:absolute;bottom:-28px;right:0;background:${N};color:#fff;padding:22px 26px;border-radius:14px;z-index:3;box-shadow:0 10px 30px rgba(0,0,0,.2);animation:float 3s ease-in-out infinite;}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
  .hp-about-text{text-align:center;}
  .hp-at{font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,38px);font-weight:800;color:${N};line-height:1.2;margin-bottom:8px;text-align:center;}
  .hp-at span{color:${T};}
  .hp-asub{color:${T};font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:22px;font-size:13px;text-align:center;display:block;}
  .hp-adesc{color:#555;line-height:1.8;font-size:15.5px;margin-bottom:28px;text-align:justify;}
  .hp-afeat-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:32px;}
  .hp-afeat{display:flex;gap:11px;align-items:flex-start;}
  .hp-afeat-t{font-weight:800;font-size:13.5px;color:${N};}
  .hp-afeat-d{font-size:12px;color:#888;}
  .hp-disc{background:${N};color:#fff;padding:14px 32px;border:none;border-radius:50px;font-weight:700;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;font-size:14px;transition:background .3s,box-shadow .3s,transform .2s;box-shadow:0 5px 18px rgba(15,35,71,.25);}
  .hp-disc .arr{display:inline-block;transition:transform .2s;}
  .hp-disc:hover{background:${T};color:${N};transform:translateY(-2px);box-shadow:0 8px 24px rgba(244,160,35,.35);}
  .hp-disc:hover .arr{transform:translateX(5px);}
  .hp-soc{width:38px;height:38px;border-radius:50%;background:#f0f2f5;display:flex;align-items:center;justify-content:center;color:${N};font-size:17px;text-decoration:none;transition:background .3s,transform .3s;}
  .hp-soc:hover{background:${N};color:${T};transform:rotate(360deg);}
  .hp-cta-row{display:flex;align-items:center;gap:22px;flex-wrap:wrap;justify-content:center;}

  /* ── Section divider ── */
  .hp-sec-divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(15,35,71,.08),transparent);}

  /* ── Events ── */
  .hp-events{padding:clamp(60px,8vw,80px) 20px;background:#f8fafc;}
  .hp-ev-inner{max-width:1400px;margin:0 auto;}
  @keyframes hp-ev-scroll{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
  .hp-ev-scroller{overflow:hidden;padding:20px 0;margin-top:28px;mask:linear-gradient(90deg,transparent,#fff 5%,#fff 95%,transparent);-webkit-mask:linear-gradient(90deg,transparent,#fff 5%,#fff 95%,transparent);}
  .hp-ev-track{display:flex;width:max-content;gap:28px;animation:hp-ev-scroll 36s linear infinite;will-change:transform;}
  .hp-ev-track:hover{animation-play-state:paused;}
  .hp-ev-card{width:310px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.07);border:1px solid #edf2f7;transition:transform .35s,box-shadow .35s,border-color .35s;display:flex;flex-direction:column;}
  .gc:hover .hp-ev-card{transform:translateY(-10px) scale(1.02);box-shadow:0 20px 40px rgba(15,35,71,.14);border-color:transparent;}
  .hp-ev-imgbox{position:relative;height:190px;overflow:hidden;}
  .hp-ev-img{width:100%;height:100%;object-fit:cover;transition:transform .55s;}
  .gc:hover .hp-ev-img{transform:scale(1.08);}
  .hp-ev-bdg{position:absolute;top:14px;right:14px;background:${T};color:#000;padding:4px 11px;font-size:9.5px;font-weight:800;border-radius:50px;text-transform:uppercase;z-index:2;letter-spacing:.5px;}
  .hp-ev-dt{position:absolute;bottom:0;left:0;background:${N};color:#fff;padding:8px 14px;border-top-right-radius:12px;z-index:2;}
  .hp-ev-info{padding:20px;flex:1;display:flex;flex-direction:column;}
  .hp-ev-title{font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:800;color:${N};margin:0 0 9px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .hp-ev-desc{font-size:13px;color:#64748b;line-height:1.6;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;text-align:justify;}
  .hp-ev-foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #f1f5f9;padding-top:12px;margin-top:14px;}
  .hp-ev-loc{font-size:11px;color:#94a3b8;font-weight:600;}
  .hp-ev-more{background:none;border:none;font-size:11px;color:${T};font-weight:800;cursor:pointer;padding:0;display:flex;align-items:center;gap:4px;}
  .hp-ev-more .arr{display:inline-block;transition:transform .2s;}
  .hp-ev-more:hover{color:${N};}
  .hp-ev-more:hover .arr{transform:translateX(5px);}
  .hp-pdf-bdg{background:#fee2e2;color:#b91c1c;padding:2px 7px;border-radius:4px;font-size:9px;font-weight:800;}
  .hp-ev-empty{text-align:center;background:#f8fafc;padding:40px;border-radius:12px;border:1px solid #e2e8f0;margin-top:28px;}

  /* ── Counters ── */
  .hp-cnt{background:linear-gradient(135deg,#f0f4ff 0%,#e8eef8 100%);padding:clamp(60px,8vw,80px) 20px;position:relative;overflow:hidden;border-top:1px solid #dde8f5;border-bottom:1px solid #dde8f5;}
  .hp-cnt-bg{position:absolute;inset:0;opacity:.4;pointer-events:none;background-image:radial-gradient(${N}18 1px,transparent 1px);background-size:30px 30px;}
  .hp-cnt-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:36px;text-align:center;position:relative;z-index:2;}
  .hp-cnt-box{padding:28px 18px;border-radius:16px;cursor:default;background:#fff;border:1.5px solid #dde8f5;box-shadow:0 4px 16px rgba(15,35,71,.06);transition:transform .35s,box-shadow .35s,border-color .35s;}
  .gc:hover .hp-cnt-box{transform:translateY(-8px);box-shadow:0 16px 36px rgba(15,35,71,.12);border-color:transparent;}
  .hp-cnt-icon{font-size:42px;margin-bottom:14px;display:inline-block;transition:transform .35s;}
  .gc:hover .hp-cnt-icon{transform:scale(1.18) rotate(8deg);}
  .hp-cnt-num{font-family:'Space Grotesk',sans-serif;font-size:40px;font-weight:800;color:${N};line-height:1;margin-bottom:8px;}
  .hp-cnt-lbl{font-size:12.5px;color:#64748b;font-weight:700;letter-spacing:1px;text-transform:uppercase;}

  /* ── Links ── */
  .hp-links{padding:clamp(60px,8vw,80px) 20px;background:#fff;}
  .hp-links-inner{max-width:1200px;margin:0 auto;}
  .hp-links-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:18px;margin-top:38px;}
  .hp-link-tile{background:#fff;border:1.5px solid #edf2f7;border-radius:12px;padding:24px 14px;text-align:center;text-decoration:none;transition:transform .3s,border-color .3s,box-shadow .3s;display:flex;flex-direction:column;align-items:center;gap:10px;box-shadow:0 2px 8px rgba(0,0,0,.04);}
  .gc:hover .hp-link-tile{transform:translateY(-7px) scale(1.03);border-color:transparent;box-shadow:0 12px 28px rgba(15,35,71,.1);}
  .hp-link-icon{width:56px;height:56px;background:#f1f5f9;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;transition:background .3s,transform .3s;}
  .gc:hover .hp-link-icon{background:${N};transform:rotate(15deg);}
  .hp-link-name{font-size:12.5px;font-weight:800;color:${N};letter-spacing:.4px;}

  /* ── Gallery ── */
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
  .hp-gal-cat{color:${T};font-size:10px;font-weight:800;letter-spacing:.5px;transform:translateY(8px);opacity:0;transition:all .35s .05s;}
  .hp-gal-ttl{color:#fff;font-size:13.5px;font-weight:700;margin-top:4px;transform:translateY(8px);opacity:0;transition:all .35s .12s;}
  .gc:hover .hp-gal-cat,.gc:hover .hp-gal-ttl{transform:translateY(0);opacity:1;}
  .hp-gal-empty{grid-column:1/-1;text-align:center;background:#f8fafc;padding:48px 20px;border-radius:16px;border:1px dashed #cbd5e1;}

  /* ── YouTube ── */
  .hp-yt{padding:clamp(60px,8vw,80px) 20px;background:#f8fafc;text-align:center;}
  .hp-yt-inner{max-width:1200px;margin:0 auto;}
  .hp-yt-h{font-family:'Space Grotesk',sans-serif;font-size:clamp(24px,3.5vw,36px);font-weight:800;color:${N};margin-bottom:10px;text-align:center;}
  .hp-yt-h span{color:${T};}
  .hp-yt-sub{color:#64748b;font-size:14px;margin-bottom:38px;text-align:center;}
  .hp-yt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;}
  .hp-yt-frame{border-radius:16px;border:none;box-shadow:0 10px 32px rgba(0,0,0,.1);width:100%;height:220px;}
  .hp-yt-ph{background:#fff;border:1.5px solid #e2e8f0;border-radius:16px;height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;}
  .hp-yt-ph-icon{font-size:34px;opacity:.35;}
  .hp-yt-ph-txt{color:#94a3b8;font-size:13px;text-align:center;}

  /* ── Modal ── */
  .hp-modal-ov{position:fixed;inset:0;z-index:9999999;background:rgba(15,35,71,.95);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;}
  .hp-modal-box{background:#fff;width:90%;max-width:1000px;height:85vh;border-radius:20px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 30px 60px rgba(0,0,0,.5);}
  .hp-modal-head{padding:14px 22px;background:${N};color:#fff;display:flex;justify-content:space-between;align-items:center;font-weight:800;}
  .hp-modal-close{background:rgba(255,255,255,.15);border:none;color:#fff;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:background .2s;}
  .hp-modal-close:hover{background:#e53e3e;}

  /* ── Responsive ── */
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
`,R=({children:t,variant:n="up",delay:i="",slow:o=!1,className:l="",style:x={},tag:p="div"})=>{const[m,g]=He();return e.jsx(p,{ref:m,className:`sa sa-${n}${o?" sa-slow":""}${i?` sa-${i}`:""}${g?" visible":""}${l?" "+l:""}`,style:x,children:t})},Zt=()=>e.jsx("div",{className:"hp-qab",children:e.jsx("div",{className:"hp-qab-inner",children:Kt.map(t=>{const n={className:"hp-qab-item",style:{background:t.bg},onMouseEnter:o=>{o.currentTarget.style.background=t.hoverBg,o.currentTarget.querySelector(".hp-qab-arr").style.color=t.color},onMouseLeave:o=>{o.currentTarget.style.background=t.bg,o.currentTarget.querySelector(".hp-qab-arr").style.color="#cbd5e1"}},i=e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`.hp-qab-item[data-id="${t.title}"]::after{background:${t.color};}`}),e.jsx("div",{className:"hp-qab-icon",style:{background:t.iconBg},children:t.icon}),e.jsxs("div",{children:[e.jsx("div",{className:"hp-qab-title",children:t.title}),e.jsx("div",{className:"hp-qab-sub",children:t.sub})]}),e.jsx("div",{className:"hp-qab-arr",style:{color:"#cbd5e1"},children:"›"})]});return t.external?e.jsx("a",F(D({href:t.href,target:"_blank",rel:"noopener noreferrer"},n),{children:i}),t.title):e.jsx("a",F(D({href:t.href},n),{children:i}),t.title)})})}),ea=s.memo(({ev:t,onPdf:n})=>e.jsx("div",{className:"gc r16",style:{flexShrink:0},children:e.jsxs("div",{className:"hp-ev-card",children:[e.jsxs("div",{className:"hp-ev-imgbox",children:[e.jsx("div",{className:"hp-ev-bdg",children:t.type}),e.jsxs("div",{className:"hp-ev-dt",children:[e.jsx("div",{style:{fontSize:18,fontWeight:900,lineHeight:1},children:t.day||"--"}),e.jsx("div",{style:{fontSize:10,fontWeight:700},children:t.month||"---"})]}),e.jsx("img",{src:t.imageUrl||qt(t.type),alt:t.title,className:"hp-ev-img",loading:"lazy",decoding:"async"})]}),e.jsxs("div",{className:"hp-ev-info",children:[e.jsx("h3",{className:"hp-ev-title",children:t.title}),e.jsx("div",{className:"hp-ev-desc",dangerouslySetInnerHTML:{__html:t.desc}}),e.jsxs("div",{className:"hp-ev-foot",children:[e.jsxs("span",{className:"hp-ev-loc",children:["📍 ",t.location||"Campus"]}),e.jsx("button",{className:"hp-ev-more",onClick:()=>n(t),children:t.reportLink?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"hp-pdf-bdg",children:"PDF"})," READ REPORT ",e.jsx("span",{className:"arr",children:"›"})]}):e.jsxs(e.Fragment,{children:["READ MORE ",e.jsx("span",{className:"arr",children:"›"})]})})]})]})]})})),ta=s.memo(({img:t,index:n})=>{const[i,o]=He({threshold:.1,rootMargin:"0px 0px -40px 0px"}),l=n%6*.07;return e.jsx("div",{className:"gc r14",ref:i,style:{transitionDelay:`${l}s`},children:e.jsxs("div",{className:`hp-gal-item sa sa-scale${o?" visible":""}`,children:[e.jsx("img",{src:t.src,alt:t.title,className:"hp-gal-img",loading:"lazy",decoding:"async"}),e.jsxs("div",{className:"hp-gal-ov",children:[e.jsx("div",{className:"hp-gal-cat",children:t.cat}),e.jsx("div",{className:"hp-gal-ttl",children:t.title})]})]})})});function aa(){const[t,n]=s.useState(null),[i,o]=s.useState([]),[l,x]=s.useState(!1),[p,m]=s.useState(!1),g=s.useRef(null);s.useEffect(()=>{const f=g.current;if(!f)return;const w=new IntersectionObserver(([S])=>{S.isIntersecting&&(m(!0),w.unobserve(f))},{rootMargin:"200px"});return w.observe(f),()=>w.disconnect()},[]),s.useEffect(()=>{if(p)return U(Ee(H,"settings","youtube"),f=>{n(f.exists()?f.data():null),x(!0)},()=>x(!0))},[p]),s.useEffect(()=>{if(!p||!t)return;if(!(t!=null&&t.apiKey)||!(t!=null&&t.channelId)){if(t!=null&&t.videoIds){const S=t.videoIds.split(/[\n,]/).map(L=>L.trim()).filter(Boolean).slice(0,3);o(S)}return}const{apiKey:f,channelId:w}=t;Me(null,null,function*(){var S;try{const C=yield(yield fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${w}&key=${f}`)).json();if(C.error||!((S=C.items)!=null&&S.length))return;const a=C.items[0].contentDetails.relatedPlaylists.uploads,y=yield(yield fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${a}&maxResults=3&key=${f}`)).json();if(y.error)return;o(y.items.map(d=>d.snippet.resourceId.videoId))}catch(L){}})},[p,t]);const r=(t==null?void 0:t.channelName)||"GNC College Official",v=i.length>0;return e.jsxs("section",{className:"hp-yt",ref:g,children:["  ",e.jsxs("div",{className:"hp-yt-inner",children:[e.jsx(R,{variant:"up",children:e.jsxs("h2",{className:"hp-yt-h",children:["🎬 Campus ",e.jsx("span",{children:"Video Highlights"})]})}),e.jsx(R,{variant:"fade",delay:"d1",children:e.jsxs("p",{className:"hp-yt-sub",children:["Official ",r," channel se latest videos"]})}),e.jsx("div",{className:"hp-yt-grid",children:p?l?v?i.map((f,w)=>e.jsx(R,{variant:"up",delay:`d${w+1}`,children:e.jsx("div",{className:"gc r16",children:e.jsx("iframe",{className:"hp-yt-frame",src:`https://www.youtube.com/embed/${f}`,allowFullScreen:!0,title:f,loading:"lazy"})})},f)):[1,2,3].map(f=>e.jsx(R,{variant:"up",delay:`d${f}`,children:e.jsx("div",{className:"gc r16",children:e.jsxs("div",{className:"hp-yt-ph",children:[e.jsx("div",{className:"hp-yt-ph-icon",children:"▶️"}),e.jsxs("div",{className:"hp-yt-ph-txt",children:["Admin Panel → YouTube tab mein",e.jsx("br",{}),"API Key aur Channel ID add karein"]})]})})},f)):[1,2,3].map(f=>e.jsx(R,{variant:"up",delay:`d${f}`,children:e.jsx("div",{className:"gc r16",children:e.jsxs("div",{className:"hp-yt-ph",children:[e.jsx("div",{className:"hp-yt-ph-icon",children:"⏳"}),e.jsx("div",{className:"hp-yt-ph-txt",children:"Loading..."})]})})},f)):[1,2,3].map(f=>e.jsx(R,{variant:"up",delay:`d${f}`,children:e.jsx("div",{className:"gc r16",children:e.jsxs("div",{className:"hp-yt-ph",style:{background:"#f1f5f9",animation:"yt-shimmer 1.5s infinite"},children:[e.jsx("style",{children:`
                      @keyframes yt-shimmer {
                        0%   { opacity: 1; }
                        50%  { opacity: 0.5; }
                        100% { opacity: 1; }
                      }
                    `}),e.jsx("div",{className:"hp-yt-ph-icon",style:{opacity:.3},children:"▶️"})]})})},f))}),v&&e.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:32},children:e.jsx(_,{to:"/video-gallery",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#ff0000",color:"#fff",padding:"12px 30px",borderRadius:50,fontSize:14,fontWeight:800,textDecoration:"none",boxShadow:"0 4px 18px rgba(255,0,0,.35)",transition:"transform .2s, box-shadow .2s"},onMouseEnter:f=>{f.currentTarget.style.transform="translateY(-2px)",f.currentTarget.style.boxShadow="0 8px 28px rgba(255,0,0,.45)"},onMouseLeave:f=>{f.currentTarget.style.transform="",f.currentTarget.style.boxShadow="0 4px 18px rgba(255,0,0,.35)"},children:"🎬 View All Videos ›"})})]})]})}const na=({notices:t,announcements:n,pdfReports:i,sliderSlides:o,events:l,gallery:x})=>{const[p,m]=s.useState("All Moments"),[g,r]=s.useState(null),v=x||[],f=p==="All Moments"?v:v.filter(a=>a.cat===p),w=(l||[]).filter(a=>a.status==="recent"),S=(l||[]).filter(a=>a.status==="upcoming"),L=[...w,...w,...w],C=s.useCallback(a=>{a.reportLink?r(Ft(a.reportLink)):alert("Full details coming soon!")},[]);return e.jsxs("div",{className:"hp-root",style:{background:"#f8fafc",minHeight:"100vh",overflowX:"hidden"},children:[e.jsx("style",{children:Jt+Qt}),e.jsx("div",{className:"hp-watermark"}),e.jsx(Lt,{slides:o}),e.jsx(Pt,{items:Xt}),e.jsx(Zt,{}),e.jsx(Mt,{notices:t,announcements:n,pdfReports:i,upcomingEvents:S}),e.jsx("section",{id:"about",className:"hp-about",children:e.jsxs("div",{className:"hp-about-inner",children:[e.jsx(R,{variant:"left",slow:!0,children:e.jsxs("div",{className:"hp-imgstack",children:[e.jsx("img",{src:"/gncollege-website/images/college_photo.webp",alt:"Guru Nanak College",className:"hp-img-main",loading:"lazy",decoding:"async"}),e.jsxs("div",{className:"hp-img-accent",children:[e.jsx("div",{style:{fontSize:30,fontWeight:900,color:T,lineHeight:1},children:"56+"}),e.jsx("div",{style:{fontSize:11,opacity:.8,letterSpacing:1},children:"YEARS OF EXCELLENCE"})]})]})}),e.jsxs(R,{variant:"right",slow:!0,className:"hp-about-text",children:[e.jsxs("h2",{className:"hp-at",children:["About the ",e.jsx("span",{children:"College"})]}),e.jsx("span",{className:"hp-asub",children:"Established 1970"}),e.jsx("p",{className:"hp-adesc",children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru. We draw inspiration from the teachings of Guru Nanak Devji, fostering an environment of academic progress and individual development."}),e.jsx("div",{className:"hp-afeat-grid",children:Vt.map(a=>e.jsxs("div",{className:"hp-afeat",children:[e.jsx("span",{style:{fontSize:19,marginTop:2},children:a.icon}),e.jsxs("div",{children:[e.jsx("div",{className:"hp-afeat-t",children:a.title}),e.jsx("div",{className:"hp-afeat-d",children:a.desc})]})]},a.title))}),e.jsxs("div",{className:"hp-cta-row",children:[e.jsxs(_,{to:"/about-us/college-profile",className:"hp-disc arr-link",children:["DISCOVER MORE ",e.jsx("span",{className:"arr",children:"›"})]}),e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:12,fontWeight:700,color:"#888"},children:"FOLLOW US:"}),de.map(a=>e.jsx("a",{href:a.href,target:"_blank",rel:"noopener noreferrer",className:"hp-soc",children:a.id==="twitter"?"𝕏":a.id==="youtube"?"▶":a.label.charAt(0)},a.id))]})]})]})]})}),e.jsx("div",{className:"hp-sec-divider"}),e.jsx(Dt,{}),e.jsx("div",{className:"hp-sec-divider"}),e.jsx("section",{id:"events",className:"hp-events",children:e.jsxs("div",{className:"hp-ev-inner",children:[e.jsx(R,{variant:"up",children:e.jsx(ce,{title:"Recent Events & Happenings",subtitle:"Seminars, workshops aur campus activities ki ek jhalak"})}),w.length>0?e.jsx(R,{variant:"fade",delay:"d1",children:e.jsx("div",{className:"hp-ev-scroller",children:e.jsx("div",{className:"hp-ev-track",children:L.map((a,u)=>e.jsx(ea,{ev:a,onPdf:C},`${a.id||u}-${u}`))})})}):e.jsx(R,{variant:"scale",children:e.jsxs("div",{className:"hp-ev-empty",children:[e.jsx("div",{style:{fontSize:38,marginBottom:10},children:"📅"}),e.jsx("h3",{style:{color:N,margin:"0 0 8px",textAlign:"center"},children:"No Recent Events"}),e.jsx("p",{style:{color:"#64748b",fontSize:13,textAlign:"center"},children:"Admin Panel → Events se data add karein"})]})}),e.jsx(R,{variant:"right",delay:"d2",style:{display:"flex",justifyContent:"center",marginTop:24},children:e.jsxs(_,{to:"/events",className:"arr-link",style:{display:"inline-flex",alignItems:"center",gap:8,background:`linear-gradient(135deg,${T},#a07010)`,color:N,padding:"12px 28px",borderRadius:50,fontSize:14,fontWeight:900,textDecoration:"none",boxShadow:`0 4px 18px ${T}55`},children:["🏆 View All Events ",e.jsx("span",{className:"arr",children:"›"})]})})]})}),e.jsx(Wt,{}),e.jsxs("section",{className:"hp-cnt",children:[e.jsx("div",{className:"hp-cnt-bg"}),e.jsx("div",{className:"hp-cnt-grid",children:Yt.map((a,u)=>e.jsx(R,{variant:"rise",delay:`d${u+1}`,children:e.jsx("div",{className:"gc r16",children:e.jsxs("div",{className:"hp-cnt-box",children:[e.jsx("div",{className:"hp-cnt-icon",children:a.icon}),e.jsx("div",{className:"hp-cnt-num",children:a.value}),e.jsx("div",{className:"hp-cnt-lbl",children:a.label})]})})},a.label))})]}),e.jsx("section",{className:"hp-links",children:e.jsxs("div",{className:"hp-links-inner",children:[e.jsx(R,{variant:"up",children:e.jsx(ce,{title:"Important External Links",subtitle:"Official education and government portals ka quick access"})}),e.jsx("div",{className:"hp-links-grid",children:Ut.map((a,u)=>e.jsx(R,{variant:"scale",delay:`d${u%4+1}`,children:e.jsx("div",{className:"gc r12",children:e.jsxs("a",{href:a.url,target:"_blank",rel:"noopener noreferrer",className:"hp-link-tile",children:[e.jsx("div",{className:"hp-link-icon",children:a.icon}),e.jsx("div",{className:"hp-link-name",children:a.name})]})})},a.name))})]})}),e.jsx("section",{id:"gallery",className:"hp-gal",children:e.jsxs("div",{className:"hp-gal-inner",children:[e.jsx(R,{variant:"up",children:e.jsx(ce,{title:"📸 Photo Gallery",subtitle:"Academic excellence aur cultural heritage ki yadgar jhalak"})}),e.jsx(R,{variant:"fade",delay:"d1",children:e.jsx("div",{className:"hp-gal-filters",children:Ht.map(a=>e.jsx("button",{className:`hp-filter${p===a?" active":""}`,onClick:()=>m(a),children:a},a))})}),e.jsx("div",{className:"hp-gal-grid",children:f.length>0?f.map((a,u)=>e.jsx(ta,{img:a,index:u},u)):e.jsxs(R,{variant:"scale",className:"hp-gal-empty",children:[e.jsx("div",{style:{fontSize:32,marginBottom:10,textAlign:"center"},children:"📸"}),e.jsx("h3",{style:{color:N,margin:"0 0 6px",textAlign:"center"},children:"Gallery Empty"}),e.jsx("p",{style:{color:"#64748b",fontSize:13,textAlign:"center"},children:"Admin Panel → Gallery se photos upload karein"})]})}),v.length>0&&e.jsx(R,{variant:"up",delay:"d2",style:{display:"flex",justifyContent:"center",marginTop:32},children:e.jsxs(_,{to:"/gallery",className:"arr-link",style:{display:"inline-flex",alignItems:"center",gap:8,background:N,color:"#fff",padding:"12px 30px",borderRadius:50,fontSize:14,fontWeight:800,textDecoration:"none",boxShadow:`0 4px 18px ${N}44`,transition:"background .2s, transform .2s"},onMouseEnter:a=>{a.currentTarget.style.background=T,a.currentTarget.style.color=N},onMouseLeave:a=>{a.currentTarget.style.background=N,a.currentTarget.style.color="#fff"},children:["📸 View All Photos ",e.jsx("span",{className:"arr",children:"›"})]})})]})}),e.jsx(aa,{}),g&&at.createPortal(e.jsx("div",{className:"hp-modal-ov",onClick:()=>r(null),children:e.jsxs("div",{className:"hp-modal-box",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"hp-modal-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{style:{fontSize:20},children:"📄"})," Official Event Report"]}),e.jsx("button",{className:"hp-modal-close",onClick:()=>r(null),children:"✕"})]}),e.jsx("div",{style:{flex:1,background:"#f1f5f9"},children:e.jsx("iframe",{src:g,title:"Event PDF",width:"100%",height:"100%",style:{border:"none"},allow:"autoplay"})})]})}),document.body)]})},je={bhuda:{phone:"+91 79033 40991",email:"info@gncollege.org",address:`Guru Nanak College, Bhuda
Dhanbad, Jharkhand - 826001`},bankMore:{phone:"",email:"vocational@gncollege.org",address:`Guru Nanak College, Bank More
Dhanbad, Jharkhand - 826001`}},ia=[{id:"1",title:"Prof. In-Charge (Bhuda Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫",order:1},{id:"2",title:"Prof. In-Charge (Bank More Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫",order:2},{id:"3",title:"BCA Coordinator",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"💻",order:3},{id:"4",title:"Member, Women's Cell",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛡️",order:4},{id:"5",title:"Member, Anti-Ragging Squad",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛑",order:5},{id:"6",title:"P.A. to Principal",name:"Mr. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"📝",order:6}];function sa(){const[t,n]=s.useState(je),[i,o]=s.useState(ia),[l,x]=s.useState(!0);s.useEffect(()=>{window.scrollTo(0,0);const g=U(Ee(H,"settings","contact"),v=>{if(v.exists()){const f=v.data();n({bhuda:D(D({},je.bhuda),f.bhuda||{}),bankMore:D(D({},je.bankMore),f.bankMore||{})})}x(!1)},()=>x(!1)),r=U(xe(ge(H,"contactDirectory"),fe("order","asc")),v=>{v.empty||o(v.docs.map(f=>D({id:f.id},f.data())))},()=>{});return()=>{g(),r()}},[]);const{bhuda:p,bankMore:m}=t;return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes fadeInUp {
          0%   { opacity:0; transform:translateY(30px); }
          100% { opacity:1; transform:translateY(0);    }
        }
        .contact-header {
          background: linear-gradient(135deg, ${b.navy} 0%, #0a1832 100%);
          color: white; padding: 80px 20px 140px; text-align: center; position: relative;
        }
        .header-title { font-size:46px; font-weight:900; margin:0; letter-spacing:-1px; animation:fadeInUp .6s ease-out forwards; }
        .header-title span { color:${b.gold}; }
        .header-sub { font-size:16px; color:#cbd5e1; margin:15px auto 0; max-width:600px; animation:fadeInUp .6s ease-out .2s forwards; opacity:0; line-height:1.6; }

        .campus-container { max-width:1200px; margin:-120px auto 40px; padding:0 20px; display:grid; grid-template-columns:repeat(auto-fit,minmax(400px,1fr)); gap:40px; position:relative; z-index:10; }
        .campus-card { background:#fff; border-radius:20px; overflow:hidden; box-shadow:0 15px 40px rgba(0,0,0,0.07); border:1px solid #e2e8f0; transition:all .4s ease; opacity:0; animation:fadeInUp .8s ease-out forwards; display:flex; flex-direction:column; }
        .campus-card:hover { transform:translateY(-10px); box-shadow:0 25px 50px rgba(15,35,71,.12); border-color:${b.gold}; }
        .card-1 { animation-delay:.3s; } .card-2 { animation-delay:.5s; }

        .card-header { padding:25px 30px; display:flex; align-items:center; gap:15px; background:#fafbfc; border-bottom:1px solid #edf2f7; }
        .campus-icon { width:55px; height:55px; background:rgba(244,160,35,.15); color:${b.gold}; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; flex-shrink:0; }
        .campus-title { font-size:24px; font-weight:800; color:${b.navy}; margin:0; }
        .campus-badge { font-size:11px; padding:4px 10px; border-radius:20px; font-weight:700; margin-top:6px; display:inline-block; letter-spacing:.5px; }

        .card-details { padding:25px 30px; flex-grow:1; }
        .detail-row { display:flex; align-items:flex-start; gap:15px; margin-bottom:20px; }
        .detail-row:last-child { margin-bottom:0; }
        .d-icon { font-size:20px; color:${b.navy}; margin-top:2px; }
        .d-text h4 { margin:0 0 4px; font-size:13px; text-transform:uppercase; letter-spacing:.5px; font-weight:700; color:#718096; }
        .d-text p, .d-text a { margin:0; font-size:15px; color:#2d3748; font-weight:600; text-decoration:none; line-height:1.5; transition:color .2s; white-space:pre-line; }
        .d-text a:hover { color:${b.gold}; }

        .map-container { width:100%; height:250px; border-top:1px solid #edf2f7; }
        .map-container iframe { width:100%; height:100%; border:none; filter:grayscale(10%) contrast(1.05); transition:all .4s; }
        .campus-card:hover .map-container iframe { filter:grayscale(0%) contrast(1); }

        .directory-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:1.5rem; }
        .directory-card { background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:1.5rem; display:flex; align-items:center; gap:1.5rem; transition:all .3s; }
        .directory-card:hover { transform:translateY(-5px); border-color:${b.gold}; box-shadow:0 8px 25px rgba(15,35,71,.08); }
        .dir-icon { font-size:1.8rem; width:50px; height:50px; display:flex; align-items:center; justify-content:center; background:#f1f5f9; border-radius:50%; flex-shrink:0; }
        .dir-title { font-size:.8rem; text-transform:uppercase; letter-spacing:1px; color:#64748b; font-weight:700; margin-bottom:4px; }
        .dir-name  { font-size:1.1rem; font-weight:800; color:${b.navy}; margin-bottom:6px; }
        .dir-contact { font-size:.9rem; font-weight:600; color:#4a5568; text-decoration:none; }
        .dir-contact:hover { color:${b.gold}; }

        @media(max-width:900px) { .campus-container { grid-template-columns:1fr; } }
        @media(max-width:768px) { .contact-header { padding:60px 20px 80px; } .header-title { font-size:36px; } .campus-container { margin-top:-60px; } }
      `}),e.jsxs("header",{className:"contact-header",children:[e.jsxs("h1",{className:"header-title",children:["Get In ",e.jsx("span",{children:"Touch"})]}),e.jsx("p",{className:"header-sub",children:"We are here to assist you. Reach out to our respective campuses or directly contact our administration team for any queries."})]}),e.jsxs("div",{className:"campus-container",children:[e.jsxs("div",{className:"campus-card card-1",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏛️"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bhuda Campus"}),e.jsx("span",{className:"campus-badge",style:{background:b.navy,color:"#fff"},children:"Main Campus • Boys Wing"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsx("p",{children:p.address})]})]}),p.phone&&e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:`tel:${p.phone}`,children:p.phone})]})]}),p.email&&e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:`mailto:${p.email}`,children:p.email})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bhuda Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.089853381653!2d86.43232147533682!3d23.797658878638367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69707963d7e8b%3A0x86733221469e7f7b!2sGuru%20Nanak%20College%20Dhanbad!5e0!3m2!1sen!2sin!4v1708688000000!5m2!1sen!2sin",allowFullScreen:!0,loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})})]}),e.jsxs("div",{className:"campus-card card-2",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏢"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bank More Campus"}),e.jsx("span",{className:"campus-badge",style:{background:b.gold,color:b.navyDark},children:"Girls Wing • Vocational Studies"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsx("p",{children:m.address})]})]}),m.phone?e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:`tel:${m.phone}`,children:m.phone})]})]}):e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("p",{style:{color:"#a0aec0",fontStyle:"italic"},children:"Admin Panel se number add karein"})]})]}),m.email&&e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:`mailto:${m.email}`,children:m.email})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bank More Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.630325992144!2d86.4175863149822!3d23.77601898456687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6a3048817a859%3A0x8d365f7d34c52968!2sGuru%20Nanak%20College%20Womens%20Wing!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",allowFullScreen:!0,loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})})]})]}),e.jsx("div",{className:"profile-container",style:{marginTop:0},children:e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:".3s",background:"transparent",boxShadow:"none",border:"none"},children:[e.jsx("h2",{className:"section-heading",style:{textAlign:"center"},children:"Administration Directory"}),e.jsx("div",{className:"heading-underline",style:{margin:"0 auto 30px"}}),l?e.jsx("div",{style:{textAlign:"center",padding:"40px",color:"#64748b",fontWeight:700},children:"Loading directory..."}):e.jsx("div",{className:"directory-grid",children:i.map(g=>e.jsxs("div",{className:"directory-card",children:[e.jsx("div",{className:"dir-icon",children:g.icon||"👤"}),e.jsxs("div",{children:[e.jsx("div",{className:"dir-title",children:g.title}),e.jsx("div",{className:"dir-name",children:g.name}),g.phone&&e.jsxs("a",{href:`tel:${g.phone}`,className:"dir-contact",children:["📞 ",g.phone]})]})]},g.id))})]})})]})}const ra=s.lazy(()=>P(()=>import("./StaffPage-D2Ijt6PM.js"),__vite__mapDeps([0,1,2,3]))),Oe=s.lazy(()=>P(()=>import("./DepartmentPage-ndiYdwKt.js"),__vite__mapDeps([4,1,3,2]))),ke=s.lazy(()=>P(()=>import("./page-gallery-DNLXrQFz.js").then(t=>t.G),__vite__mapDeps([2,1,3]))),Ne=s.lazy(()=>P(()=>import("./page-gallery-DNLXrQFz.js").then(t=>t.V),__vite__mapDeps([2,1,3]))),oa=s.lazy(()=>P(()=>import("./page-about-DcXewUUK.js").then(t=>t.C),__vite__mapDeps([5,1,3,2,6]))),Se=s.lazy(()=>P(()=>import("./page-about-DcXewUUK.js").then(t=>t.L),__vite__mapDeps([5,1,3,2,6]))),la=s.lazy(()=>P(()=>import("./NewsPage-BgA7HhNa.js"),__vite__mapDeps([7,1,3,2,8,9]))),ca=s.lazy(()=>P(()=>import("./NotificationsPage-C8kJTkL3.js"),__vite__mapDeps([10,1,3,2,8,9]))),da=s.lazy(()=>P(()=>import("./DocumentsPage-BTz38VLm.js"),__vite__mapDeps([11,1,3,2]))),pa=s.lazy(()=>P(()=>import("./EventsPage-DPKJyPCp.js"),__vite__mapDeps([12,1,3,2]))),xa=s.lazy(()=>P(()=>import("./chunk-admin-D-0VY8_W.js").then(t=>t.A),__vite__mapDeps([13,1,8,9,3]))),fa=s.lazy(()=>P(()=>import("./Ticker--0ScjVmp.js"),__vite__mapDeps([14,1,2,3]))),M=t=>s.lazy(()=>P(()=>import("./page-about-DcXewUUK.js").then(n=>n.A),__vite__mapDeps([5,1,3,2,6])).then(n=>({default:n[t]}))),he=t=>s.lazy(()=>P(()=>import("./page-academics-DAw_MrFd.js"),__vite__mapDeps([15,1,3,2])).then(n=>({default:n[t]}))),ae=t=>s.lazy(()=>P(()=>import("./page-admission-i6KGRcmi.js"),__vite__mapDeps([16,1,3,2,8,9])).then(n=>({default:n[t]}))),me=t=>s.lazy(()=>P(()=>import("./page-naac-D4oSiITq.js"),__vite__mapDeps([17,1,3,2])).then(n=>({default:n[t]}))),Ue=t=>s.lazy(()=>P(()=>import("./page-publication-Cx2LXeBl.js"),__vite__mapDeps([18,1,3,2])).then(n=>({default:n[t]}))),Q=t=>s.lazy(()=>P(()=>import("./page-activity-kufJTwBV.js"),__vite__mapDeps([19,1,3,2])).then(n=>({default:n[t]}))),ne=t=>s.lazy(()=>P(()=>import("./page-campus-BEd6n1vv.js"),__vite__mapDeps([20,1,3,2])).then(n=>({default:n[t]}))),ga=M("VisionMission"),ha=M("PrincipalMessage"),ma=M("Organogram"),ua=M("WomensCell"),ba=M("AntiRagging"),ya=M("ScStCell"),va=M("ObcCell"),wa=M("GrievanceCell"),ja=M("IccCell"),ka=M("MinorityCell"),Na=M("PlacementCell"),Sa=M("RusaCell"),za=M("GoverningBody"),Ca=M("StaffCouncil"),Aa=he("IqacPage"),Ea=he("CourseOffered"),La=he("Syllabus"),Pa=he("AcademicCalendar"),Ra=ae("AdmissionRule"),Ia=ae("DocumentRequired"),$a=ae("FeeStructure"),We=ae("AdmissionNotification"),_a=ae("IntakeCapacity"),le=me("SsrCyclePage"),Da=me("AqarPage"),Ma=me("NirfPage"),Ta=me("PerspectivePlan"),Ba=Ue("LibraryPage"),te=Ue("PublicationPage"),Ga=Q("NssPage"),Oa=Q("NccPage"),Wa=Q("WorkshopPage"),Fa=Q("SportsPage"),qa=Q("RotaractClub"),Xa=Q("SadbhavanaDiwas"),ze=ne("CampusVisuals"),Ha=ne("Infrastructure"),Ua=ne("Classrooms"),Ya=ne("IctRooms"),Va=ne("GreenCampus"),Ye=()=>e.jsxs("div",{style:{minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12},children:[e.jsx("div",{style:{width:40,height:40,border:`4px solid ${b.gold}`,borderTop:`4px solid ${b.navy}`,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),e.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg)}}"}),e.jsx("span",{style:{color:b.navy,fontSize:13,fontWeight:600},children:"Loading..."})]}),pe=({children:t})=>e.jsx(yt,{children:t}),O=()=>e.jsx(pe,{children:e.jsx(Ct,{})}),h=({el:t})=>e.jsx(s.Suspense,{fallback:e.jsx(Ye,{}),children:e.jsx(pe,{children:t})});function Ka(){const[t,n]=s.useState([]),[i,o]=s.useState([]),[l,x]=s.useState([]),[p,m]=s.useState([]),[g,r]=s.useState([]),[v,f]=s.useState([]),[w,S]=s.useState(null),[L,C]=s.useState(()=>sessionStorage.getItem("gnc_admin_auth")==="true"),a=()=>{sessionStorage.setItem("gnc_admin_auth","true"),C(!0)},u=()=>{sessionStorage.removeItem("gnc_admin_auth"),C(!1),window.location.hash="/"},d=Ce().pathname.startsWith("/admin")||window.location.hash.startsWith("#/admin");s.useEffect(()=>{if(!d||document.querySelector("link[data-jodit-css]"))return;const A=document.createElement("link");if(A.rel="stylesheet",A.type="text/css",A.setAttribute("data-jodit-css","true"),A.onerror=()=>{const I=document.createElement("link");I.rel="stylesheet",I.type="text/css",I.href="https://cdnjs.cloudflare.com/ajax/libs/jodit/4.0.0-beta.76/jodit.min.css",I.setAttribute("data-jodit-css","true"),document.head.appendChild(I)},!Array.from(document.querySelectorAll('link[rel="stylesheet"]')).find(I=>I.href.includes("vendor-ad")||I.href.includes("jodit")))return P(()=>import("./vendor-admin-D6IP6iy7.js").then(I=>I.a),__vite__mapDeps([8,1,9])).then(()=>{}).catch(()=>{}),()=>{const I=document.querySelector("link[data-jodit-css]");I&&I.remove()}},[d]),s.useEffect(()=>U(Ee(H,"settings","navbar"),A=>{A.exists()&&A.data().links&&S(A.data().links)}),[]),s.useEffect(()=>{const B=[["notices",n],["announcements",o],["events",x],["gallery",m],["faculties",r],["sliderSlides",f]].map(([W,I])=>{const ie=xe(ge(H,W),fe("createdAt","desc"));return U(ie,Y=>I(Y.docs.map(se=>D({id:se.id},se.data()))),Y=>console.error(`[${W}]`,Y))});return()=>B.forEach(W=>W())},[]);const j=s.useMemo(()=>(w||ft).map(B=>B.label==="Gallery"?F(D({},B),{href:"/gallery",sub:[{label:"Photo Gallery",href:"/gallery/photos"},{label:"Video Gallery",href:"/gallery/videos"}]}):B),[w]),z=()=>window.open(`${window.location.origin}${"/gncollege-website/".replace(/\/$/,"")}/#/admin`,"_blank");return e.jsxs(e.Fragment,{children:[e.jsx(nt,{position:"top-right",containerStyle:{zIndex:999999},toastOptions:{duration:3500,style:{fontFamily:"'Inter', sans-serif",fontWeight:600,fontSize:"14px",borderRadius:"12px",padding:"14px 18px",boxShadow:"0 8px 32px rgba(0,0,0,0.18)"},success:{style:{background:"#0f2347",color:"#fff",border:"1.5px solid #f4a023"},iconTheme:{primary:"#f4a023",secondary:"#0f2347"}},error:{style:{background:"#fff0f0",color:"#b91c1c",border:"1.5px solid #f87171"}}}}),!d&&e.jsxs(e.Fragment,{children:[e.jsx(ht,{}),e.jsx(s.Suspense,{fallback:e.jsx("div",{style:{height:40}}),children:e.jsx(fa,{items:t})}),e.jsx(pt,{onAdminClick:z,navLinks:j}),e.jsx(mt,{}),e.jsx(bt,{})]}),e.jsx("main",{id:"main-content",children:e.jsxs(it,{children:[e.jsx(c,{path:"/",element:e.jsx(pe,{children:e.jsx(na,{notices:t,announcements:i,sliderSlides:v,events:l,gallery:p})})}),e.jsx(c,{path:"/contact",element:e.jsx(pe,{children:e.jsx(sa,{})})}),e.jsx(c,{path:"/about-us/college-profile",element:e.jsx(h,{el:e.jsx(oa,{})})}),e.jsx(c,{path:"/about-us/vision-mission",element:e.jsx(h,{el:e.jsx(ga,{})})}),e.jsx(c,{path:"/about-us/principal-message",element:e.jsx(h,{el:e.jsx(ha,{})})}),e.jsx(c,{path:"/about-us/governing-body",element:e.jsx(h,{el:e.jsx(za,{})})}),e.jsx(c,{path:"/about-us/staff-council",element:e.jsx(h,{el:e.jsx(Ca,{})})}),e.jsx(c,{path:"/about-us/audit-report",element:e.jsx(O,{})}),e.jsx(c,{path:"/about-us/college-management/organogram",element:e.jsx(h,{el:e.jsx(ma,{})})}),e.jsx(c,{path:"/about-us/college-management/presidents",element:e.jsx(h,{el:e.jsx(Se,{type:"president",title:"Presidents Over the Years"})})}),e.jsx(c,{path:"/about-us/college-management/secretaries",element:e.jsx(h,{el:e.jsx(Se,{type:"secretary",title:"Secretaries Over the Years"})})}),e.jsx(c,{path:"/about-us/college-management/principal",element:e.jsx(h,{el:e.jsx(Se,{type:"principal",title:"Principals Over the Years"})})}),e.jsx(c,{path:"/about-us/various-committees/womens-cell",element:e.jsx(h,{el:e.jsx(ua,{})})}),e.jsx(c,{path:"/about-us/various-committees/anti-ragging",element:e.jsx(h,{el:e.jsx(ba,{})})}),e.jsx(c,{path:"/about-us/various-committees/sc-st",element:e.jsx(h,{el:e.jsx(ya,{})})}),e.jsx(c,{path:"/about-us/various-committees/obc",element:e.jsx(h,{el:e.jsx(va,{})})}),e.jsx(c,{path:"/about-us/various-committees/grievance",element:e.jsx(h,{el:e.jsx(wa,{})})}),e.jsx(c,{path:"/about-us/various-committees/icc",element:e.jsx(h,{el:e.jsx(ja,{})})}),e.jsx(c,{path:"/about-us/various-committees/minority",element:e.jsx(h,{el:e.jsx(ka,{})})}),e.jsx(c,{path:"/about-us/various-committees/placement",element:e.jsx(h,{el:e.jsx(Na,{})})}),e.jsx(c,{path:"/about-us/various-committees/rusa",element:e.jsx(h,{el:e.jsx(Sa,{})})}),e.jsx(c,{path:"/about-us/college-staff/:staffType",element:e.jsx(h,{el:e.jsx(ra,{faculties:g})})}),e.jsx(c,{path:"/about-us/regulations/bbmku/special-ug-regulation",element:e.jsx(O,{})}),e.jsx(c,{path:"/about-us/regulations/bbmku/ug-regulation-fyugp",element:e.jsx(O,{})}),e.jsx(c,{path:"/about-us/regulations/bbmku/ug-regulation-cbcs",element:e.jsx(O,{})}),e.jsx(c,{path:"/about-us/regulations/college-affiliation",element:e.jsx(O,{})}),e.jsx(c,{path:"/about-us/regulations/ugc-section",element:e.jsx(O,{})}),e.jsx(c,{path:"/about-us/regulations/vbu/ug-regulation-2015",element:e.jsx(O,{})}),e.jsx(c,{path:"/about-us/regulations/vbu/bca-regulation",element:e.jsx(O,{})}),e.jsx(c,{path:"/about-us/regulations/byelaws",element:e.jsx(O,{})}),e.jsx(c,{path:"/about-us/regulations/exemption",element:e.jsx(O,{})}),e.jsx(c,{path:"/campus/visuals/bhuda",element:e.jsx(h,{el:e.jsx(ze,{title:"Bhuda Campus",categoryId:"bhuda",desc:"Bhuda campus ki photos"})})}),e.jsx(c,{path:"/campus/visuals/bank-more",element:e.jsx(h,{el:e.jsx(ze,{title:"Bank More Campus",categoryId:"bank-more",desc:"Bank More campus ki photos"})})}),e.jsx(c,{path:"/campus/visuals/vocational-building",element:e.jsx(h,{el:e.jsx(ze,{title:"Vocational Building",categoryId:"vocational",desc:"Vocational building ki photos"})})}),e.jsx(c,{path:"/campus/infrastructure",element:e.jsx(h,{el:e.jsx(Ha,{})})}),e.jsx(c,{path:"/campus/classroom",element:e.jsx(h,{el:e.jsx(Ua,{})})}),e.jsx(c,{path:"/campus/ict-rooms",element:e.jsx(h,{el:e.jsx(Ya,{})})}),e.jsx(c,{path:"/campus/green-campus",element:e.jsx(h,{el:e.jsx(Va,{})})}),e.jsx(c,{path:"/academics/iqac",element:e.jsx(h,{el:e.jsx(Aa,{})})}),e.jsx(c,{path:"/academics/course-offered",element:e.jsx(h,{el:e.jsx(Ea,{})})}),e.jsx(c,{path:"/academics/departments",element:e.jsx(h,{el:e.jsx(Oe,{})})}),e.jsx(c,{path:"/academics/departments/:deptSlug",element:e.jsx(h,{el:e.jsx(Oe,{})})}),e.jsx(c,{path:"/syllabus",element:e.jsx(h,{el:e.jsx(La,{})})}),e.jsx(c,{path:"/academics/academic-calendar",element:e.jsx(h,{el:e.jsx(Pa,{})})}),e.jsx(c,{path:"/admission/rule",element:e.jsx(h,{el:e.jsx(Ra,{})})}),e.jsx(c,{path:"/admission/document-required",element:e.jsx(h,{el:e.jsx(Ia,{})})}),e.jsx(c,{path:"/admission/fee-structure",element:e.jsx(h,{el:e.jsx($a,{})})}),e.jsx(c,{path:"/admission/notification/latest",element:e.jsx(h,{el:e.jsx(We,{type:"latest",title:"Latest Notifications"})})}),e.jsx(c,{path:"/admission/notification/upcoming",element:e.jsx(h,{el:e.jsx(We,{type:"upcoming",title:"Upcoming Notifications"})})}),e.jsx(c,{path:"/admission/intake-capacity",element:e.jsx(h,{el:e.jsx(_a,{})})}),e.jsx(c,{path:"/activity/nss",element:e.jsx(h,{el:e.jsx(Ga,{})})}),e.jsx(c,{path:"/activity/ncc",element:e.jsx(h,{el:e.jsx(Oa,{})})}),e.jsx(c,{path:"/activity/workshop",element:e.jsx(h,{el:e.jsx(Wa,{})})}),e.jsx(c,{path:"/activity/games-sports",element:e.jsx(h,{el:e.jsx(Fa,{})})}),e.jsx(c,{path:"/activity/collaboration/rotaract-club",element:e.jsx(h,{el:e.jsx(qa,{})})}),e.jsx(c,{path:"/activity/collaboration/sadbhavana-diwas",element:e.jsx(h,{el:e.jsx(Xa,{})})}),e.jsx(c,{path:"/naac/ssr-1st-cycle/cycle-1-documents",element:e.jsx(h,{el:e.jsx(le,{cycle:1})})}),e.jsx(c,{path:"/naac/ssr-1st-cycle/peer-team-report",element:e.jsx(h,{el:e.jsx(le,{cycle:1})})}),e.jsx(c,{path:"/naac/ssr-2nd-cycle/cycle-2-documents",element:e.jsx(h,{el:e.jsx(le,{cycle:2})})}),e.jsx(c,{path:"/naac/ssr-2nd-cycle/executive-summary",element:e.jsx(h,{el:e.jsx(le,{cycle:2})})}),e.jsx(c,{path:"/naac/aqar",element:e.jsx(h,{el:e.jsx(Da,{})})}),e.jsx(c,{path:"/naac/nirf",element:e.jsx(h,{el:e.jsx(Ma,{})})}),e.jsx(c,{path:"/naac/perspective-plan",element:e.jsx(h,{el:e.jsx(Ta,{})})}),e.jsx(c,{path:"/publication/college-library",element:e.jsx(h,{el:e.jsx(Ba,{})})}),e.jsx(c,{path:"/publication/e-magazine",element:e.jsx(h,{el:e.jsx(te,{type:"magazine",title:"E-Magazine",subtitle:"College ki digital publications",icon:"📰",keyword:"magazine"})})}),e.jsx(c,{path:"/publication/examination-results/2024",element:e.jsx(h,{el:e.jsx(te,{type:"result",title:"Exam Results 2024",subtitle:"Academic year 2023-24 ke results",icon:"📋",keyword:"result-2024"})})}),e.jsx(c,{path:"/publication/examination-results/2023",element:e.jsx(h,{el:e.jsx(te,{type:"result",title:"Exam Results 2023",subtitle:"Academic year 2022-23 ke results",icon:"📋",keyword:"result-2023"})})}),e.jsx(c,{path:"/publication/sss-report/2023-24",element:e.jsx(h,{el:e.jsx(te,{type:"sss",title:"SSS Report 2023-24",subtitle:"Student Satisfaction Survey",icon:"📊",keyword:"sss-2023-24"})})}),e.jsx(c,{path:"/publication/sss-report/2022-23",element:e.jsx(h,{el:e.jsx(te,{type:"sss",title:"SSS Report 2022-23",subtitle:"Student Satisfaction Survey",icon:"📊",keyword:"sss-2022-23"})})}),e.jsx(c,{path:"/gallery",element:e.jsx(h,{el:e.jsx(ke,{gallery:p})})}),e.jsx(c,{path:"/gallery/photos",element:e.jsx(h,{el:e.jsx(ke,{gallery:p})})}),e.jsx(c,{path:"/gallery/photo-gallery",element:e.jsx(h,{el:e.jsx(ke,{gallery:p})})}),e.jsx(c,{path:"/video-gallery",element:e.jsx(h,{el:e.jsx(Ne,{})})}),e.jsx(c,{path:"/gallery/videos",element:e.jsx(h,{el:e.jsx(Ne,{})})}),e.jsx(c,{path:"/gallery/video-gallery",element:e.jsx(h,{el:e.jsx(Ne,{})})}),e.jsx(c,{path:"/news",element:e.jsx(h,{el:e.jsx(la,{})})}),e.jsx(c,{path:"/notifications",element:e.jsx(h,{el:e.jsx(ca,{})})}),e.jsx(c,{path:"/documents",element:e.jsx(h,{el:e.jsx(da,{})})}),e.jsx(c,{path:"/events",element:e.jsx(h,{el:e.jsx(pa,{})})}),e.jsx(c,{path:"/admin",element:L?e.jsx(s.Suspense,{fallback:e.jsx("div",{style:{minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(Ye,{})}),children:e.jsx(xa,{notices:t,announcements:i,events:l,gallery:p,faculties:g,onClose:u})}):e.jsx(vt,{onSuccess:a,onClose:()=>{window.location.hash="/"}})})]})}),!d&&e.jsxs(e.Fragment,{children:[e.jsx(gt,{}),e.jsx(dt,{}),e.jsx("button",{onClick:z,title:"Open Admin Panel",style:{position:"fixed",bottom:"clamp(16px, 3vw, 25px)",right:"clamp(16px, 3vw, 25px)",background:b.navy,color:"#fff",border:`3px solid ${b.gold}`,borderRadius:"50%",width:"clamp(48px, 6vw, 60px)",height:"clamp(48px, 6vw, 60px)",cursor:"pointer",zIndex:500,fontSize:"clamp(18px, 2.5vw, 24px)",flexShrink:0},children:"⚙️"})]})]})}function Ja(){const t=Ce();return s.useEffect(()=>{"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.scrollTo(0,0)},[]),s.useEffect(()=>{const n=t.hash;if(n){const i=n.replace("#",""),o=document.getElementById(i);o&&o.scrollIntoView({behavior:"smooth"})}else window.scrollTo(0,0)},[t]),e.jsx(Ka,{})}class Qa extends Ae.Component{constructor(){super(...arguments);be(this,"state",{hasError:!1,error:null})}static getDerivedStateFromError(i){return{hasError:!0,error:i}}componentDidCatch(i,o){}render(){var i,o,l;return this.state.hasError?e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#0f2347",color:"#fff",fontFamily:"sans-serif",padding:"24px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:56,marginBottom:16},children:"⚠️"}),e.jsx("h1",{style:{color:"#f4a023",fontSize:22,marginBottom:10},children:"Website Load Nahi Ho Saka"}),e.jsx("p",{style:{color:"rgba(255,255,255,0.6)",maxWidth:480,lineHeight:1.7,marginBottom:24},children:(o=(i=this.state.error)==null?void 0:i.message)!=null&&o.includes("Firebase")?"🔥 Firebase configuration missing hai. Project root mein .env file banao.":((l=this.state.error)==null?void 0:l.message)||"Ek unexpected error aaya hai."}),e.jsx("button",{onClick:()=>window.location.reload(),style:{background:"#f4a023",color:"#0f2347",border:"none",borderRadius:10,padding:"12px 28px",fontWeight:800,fontSize:15,cursor:"pointer"},children:"🔄 Page Reload Karo"})]}):this.props.children}}st.createRoot(document.getElementById("root")).render(e.jsx(Ae.StrictMode,{children:e.jsx(Qa,{children:e.jsx(rt,{children:e.jsx(Ja,{})})})}));
