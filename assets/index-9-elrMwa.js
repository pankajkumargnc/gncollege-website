const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPanel-BaVM4eCd.js","assets/react-B9mKIQH5.js","assets/jodit-react-CQyzVq-v.js","assets/jodit-CDy6uk5e.js","assets/jodit-BcTNBwNW.css","assets/dompurify-J9PU_gBl.js","assets/html-react-parser-BjJRHc4P.js","assets/html-dom-parser-C9V9aTyI.js","assets/domhandler-C7h-c356.js","assets/domelementtype-CqltyNbl.js","assets/react-property-DkBHvQjb.js","assets/style-to-js-3xM98LKa.js","assets/style-to-object-Cg2xzs12.js","assets/inline-style-parser-BlqBsVO4.js","assets/@firebase-BfA45IM4.js","assets/idb-BXWtuYvb.js","assets/react-hot-toast-Dhq_btiz.js","assets/goober-wofAfydu.js","assets/react-dom-D2vEXsJU.js","assets/scheduler-CWG1rEj-.js","assets/firebase-AtQAqhLJ.js","assets/react-router-D5LUbJ5D.js","assets/aos-B-Mw6r96.js","assets/aos-DvB2Xm2x.css","assets/Ticker-CJvHPJXa.js"])))=>i.map(i=>d[i]);
import{a as s,j as e,R as fe}from"./react-B9mKIQH5.js";import{r as he,R as ge}from"./react-dom-D2vEXsJU.js";import{i as me,g as ue,a as be,q as P,o as Y,c as H,b as M,d as ye}from"./@firebase-BfA45IM4.js";import"./firebase-AtQAqhLJ.js";import{L as F,u as ae,R as je,a as B,b as ve,H as we}from"./react-router-D5LUbJ5D.js";import{A as ke}from"./aos-B-Mw6r96.js";import{F as Se}from"./react-hot-toast-Dhq_btiz.js";import{p as Ne}from"./dompurify-J9PU_gBl.js";import{p as ze}from"./html-react-parser-BjJRHc4P.js";import"./scheduler-CWG1rEj-.js";import"./idb-BXWtuYvb.js";import"./goober-wofAfydu.js";import"./html-dom-parser-C9V9aTyI.js";import"./domhandler-C7h-c356.js";import"./domelementtype-CqltyNbl.js";import"./react-property-DkBHvQjb.js";import"./style-to-js-3xM98LKa.js";import"./style-to-object-Cg2xzs12.js";import"./inline-style-parser-BlqBsVO4.js";(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))j(l);new MutationObserver(l=>{for(const x of l)if(x.type==="childList")for(const m of x.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&j(m)}).observe(document,{childList:!0,subtree:!0});function p(l){const x={};return l.integrity&&(x.integrity=l.integrity),l.referrerPolicy&&(x.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?x.credentials="include":l.crossOrigin==="anonymous"?x.credentials="omit":x.credentials="same-origin",x}function j(l){if(l.ep)return;l.ep=!0;const x=p(l);fetch(l.href,x)}})();const Ce="modulepreload",Ae=function(t){return"/gncollege-website/"+t},ne={},ce=function(d,p,j){let l=Promise.resolve();if(p&&p.length>0){let r=function(y){return Promise.all(y.map(f=>Promise.resolve(f).then(N=>({status:"fulfilled",value:N}),N=>({status:"rejected",reason:N}))))};document.getElementsByTagName("link");const m=document.querySelector("meta[property=csp-nonce]"),v=m?.nonce||m?.getAttribute("nonce");l=r(p.map(y=>{if(y=Ae(y),y in ne)return;ne[y]=!0;const f=y.endsWith(".css"),N=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${N}`))return;const S=document.createElement("link");if(S.rel=f?"stylesheet":Ce,f||(S.as="script"),S.crossOrigin="",S.href=y,v&&S.setAttribute("nonce",v),document.head.appendChild(S),f)return new Promise((W,b)=>{S.addEventListener("load",W),S.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${y}`)))})}))}function x(m){const v=new Event("vite:preloadError",{cancelable:!0});if(v.payload=m,window.dispatchEvent(v),!v.defaultPrevented)throw m}return l.then(m=>{for(const v of m||[])v.status==="rejected"&&x(v.reason);return d().catch(x)})},Re={apiKey:"AIzaSyDeJWUUoU_MJ4ubpbfaLZemvnEr82LF5YA",authDomain:"gnc-college-web.firebaseapp.com",projectId:"gnc-college-web",storageBucket:"gnc-college-web.firebasestorage.app",messagingSenderId:"78901559372",appId:"1:78901559372:web:f76cb101f8aec2daadb4e9"},pe=me(Re),L=ue(pe);be(pe);const o={navy:"#1a3a6b",navyDark:"#0f2347",gold:"#f4a023",red:"#c0392b"},q=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],We=["All","News","Achievement","Update","Result","Scholarship"],G={News:{bg:"#EBF0FF",text:"#1a365d",border:"#BED0FF",dot:"#4a7fd4"},Achievement:{bg:"#F0FFF4",text:"#1c4532",border:"#9AE6B4",dot:"#38a169"},Update:{bg:"#FFFBEB",text:"#744210",border:"#FAF089",dot:"#d69e2e"},Result:{bg:"#FFF5F5",text:"#742a2a",border:"#FEB2B2",dot:"#e53e3e"},Scholarship:{bg:"#FAF5FF",text:"#44337a",border:"#E9D8FD",dot:"#805ad5"}},U=t=>t?.toDate?t.toDate():new Date(t||Date.now()),Fe=t=>{const d=U(t);return`${d.getDate()} ${q[d.getMonth()]} ${d.getFullYear()}`},Ee=({navy:t,gold:d})=>e.jsxs("aside",{className:"profile-sidebar anim-slide-up",style:{animationDelay:"0.4s"},children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"📢 Official Notices",path:"/notifications"},{label:"📁 Document Archive",path:"/documents"},{label:"🏆 Campus Events",path:"/events"},{label:"Principal Message",path:"/about-us/principal-message"},{label:"Admission Rules",path:"/admission/rule"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((p,j)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(F,{to:p.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",p.label]})},j))})]}),e.jsxs("div",{className:"widget",style:{marginTop:20},children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📊"})," Categories"]}),e.jsx("ul",{className:"quick-links",children:Object.entries(G).map(([p,j])=>e.jsx("li",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #f0f4f8"},children:e.jsxs("span",{style:{fontSize:13,color:j.text,fontWeight:700,display:"flex",alignItems:"center",gap:7},children:[e.jsx("span",{style:{width:8,height:8,borderRadius:"50%",background:j.dot,display:"inline-block"}}),p]})},p))})]})]});function Ie(){const[t,d]=s.useState([]),[p,j]=s.useState(!0),[l,x]=s.useState("All"),[m,v]=s.useState("All"),[r,y]=s.useState("All"),[f,N]=s.useState(""),[S,W]=s.useState("list"),b=o.navy,w=o.gold;s.useEffect(()=>{window.scrollTo(0,0);const a=P(H(L,"announcements"),Y("createdAt","desc"));return M(a,n=>{d(n.docs.map(c=>({id:c.id,...c.data()}))),j(!1)})},[]);const i=s.useMemo(()=>{const a=new Set(t.map(n=>U(n.createdAt).getFullYear()));return["All",...Array.from(a).sort((n,c)=>c-n)]},[t]),u=s.useMemo(()=>t.filter(a=>{const n=U(a.createdAt);return!(l!=="All"&&n.getFullYear()!==Number(l)||m!=="All"&&q[n.getMonth()]!==m||r!=="All"&&(a.type||"News")!==r||f&&!a.text?.toLowerCase().includes(f.toLowerCase()))}),[t,l,m,r,f]),g=s.useMemo(()=>{const a={};return u.forEach(n=>{const c=U(n.createdAt),k=`${q[c.getMonth()]} ${c.getFullYear()}`;a[k]||(a[k]=[]),a[k].push(n)}),a},[u]);return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:.35; } }
        .ntf-fb { border: none; font-family: inherit; cursor: pointer; transition: all .15s; }
        .ntf-row-hover { transition: all .15s; }
        .ntf-row-hover:hover { background: #f8fafc !important; transform: translateX(4px); }
        .ntf-card-hover { transition: all .2s; }
        .ntf-card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(11,31,78,.12) !important; }
      `}),e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsxs("nav",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:14,fontSize:13,fontWeight:600},children:[e.jsx(F,{to:"/",style:{color:"rgba(255,255,255,.55)",textDecoration:"none"},children:"🏠 Home"}),e.jsx("span",{style:{color:"rgba(255,255,255,.3)"},children:"›"}),e.jsx("span",{style:{color:w},children:"Academic News"})]}),e.jsx("h1",{className:"hero-title",children:"📣 News & Updates"}),e.jsx("p",{className:"hero-subtitle",children:"College ke latest achievements, academic news aur recent updates yahan dekhein"}),e.jsx("div",{style:{display:"flex",gap:14,flexWrap:"wrap",marginTop:22},children:[{val:t.length,label:"Total News"},{val:t.filter(a=>a.type==="Achievement").length,label:"Achievements"},{val:t.filter(a=>a.type==="Result").length,label:"Results"},{val:i.length-1,label:"Active Years"}].map((a,n)=>e.jsxs("div",{style:{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.18)",borderRadius:11,padding:"10px 20px",textAlign:"center",backdropFilter:"blur(8px)"},children:[e.jsx("div",{style:{fontSize:24,fontWeight:900,color:w,lineHeight:1},children:a.val}),e.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,.55)",marginTop:3},children:a.label})]},n))})]})]}),e.jsx("div",{className:"profile-container",children:e.jsxs("div",{className:"profile-layout",children:[e.jsxs("main",{className:"profile-main",children:[e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{padding:"20px 24px",animationDelay:".1s"},children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:16},children:[e.jsxs("div",{style:{flex:1,minWidth:200,position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",opacity:.4,fontSize:16,pointerEvents:"none"},children:"🔍"}),e.jsx("input",{value:f,onChange:a=>N(a.target.value),placeholder:"News search karo...",style:{width:"100%",padding:"10px 14px 10px 38px",border:"2px solid #e2e8f0",borderRadius:10,fontSize:14,fontFamily:"inherit",background:"#f8fafc",outline:"none",boxSizing:"border-box",transition:"border-color .2s"},onFocus:a=>a.target.style.borderColor=w,onBlur:a=>a.target.style.borderColor="#e2e8f0"})]}),e.jsxs("div",{style:{display:"flex",gap:7},children:[["list","card"].map(a=>e.jsx("button",{className:"ntf-fb",onClick:()=>W(a),style:{padding:"9px 16px",borderRadius:9,border:`2px solid ${S===a?b:"#e2e8f0"}`,background:S===a?b:"transparent",color:S===a?"#fff":"#718096",fontWeight:700,fontSize:12.5},children:a==="list"?"☰ List":"⊞ Cards"},a)),e.jsx("span",{style:{background:"#f0f4ff",color:b,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800,alignSelf:"center"},children:u.length})]})]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"YEAR:"}),i.map(a=>e.jsx("button",{className:"ntf-fb",onClick:()=>x(String(a)),style:{padding:"4px 14px",borderRadius:20,border:`2px solid ${l===String(a)?w:"#e2e8f0"}`,background:l===String(a)?w:"transparent",color:l===String(a)?b:"#718096",fontWeight:700,fontSize:12.5},children:a},a))]}),e.jsxs("div",{style:{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"MONTH:"}),["All",...q].map(a=>e.jsx("button",{className:"ntf-fb",onClick:()=>v(a),style:{padding:"4px 10px",borderRadius:7,border:`1.5px solid ${m===a?b:"#e2e8f0"}`,background:m===a?b:"transparent",color:m===a?"#fff":"#718096",fontWeight:600,fontSize:12},children:a},a))]}),e.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"CATEGORY:"}),We.map(a=>{const n=G[a]||{bg:"#f4f7fa",text:"#4a5568",border:"#e2e8f0"};return e.jsx("button",{className:"ntf-fb",onClick:()=>y(a),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${r===a?n.border:"#e2e8f0"}`,background:r===a?n.bg:"transparent",color:r===a?n.text:"#718096",fontWeight:700,fontSize:12},children:a},a)}),(l!=="All"||m!=="All"||r!=="All"||f)&&e.jsx("button",{className:"ntf-fb",onClick:()=>{x("All"),v("All"),y("All"),N("")},style:{padding:"4px 12px",borderRadius:20,border:"2px solid #FEB2B2",background:"#FFF5F5",color:"#e53e3e",fontWeight:700,fontSize:12},children:"✕ Clear"})]})]}),e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:".2s"},children:[e.jsxs("h2",{className:"section-heading",children:["📰 Latest News (",u.length,")"]}),e.jsx("div",{className:"heading-underline"}),p?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[e.jsx("div",{style:{width:40,height:40,border:`4px solid ${w}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"News load ho rahi hain..."})]}):u.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"50px 20px"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"🔍"}),e.jsx("h3",{style:{color:b,fontWeight:800,margin:"0 0 6px"},children:"Koi news nahi mili"}),e.jsx("p",{style:{color:"#718096",fontSize:13.5},children:"Filter ya search change karo"})]}):S==="list"?Object.entries(g).map(([a,n])=>e.jsxs("div",{style:{marginBottom:28},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14},children:[e.jsxs("div",{style:{background:b,color:w,borderRadius:8,padding:"5px 16px",fontWeight:800,fontSize:12.5,whiteSpace:"nowrap",flexShrink:0},children:["📅 ",a]}),e.jsx("div",{style:{flex:1,height:1,background:`linear-gradient(90deg,${b}44,transparent)`}}),e.jsxs("span",{style:{fontSize:11.5,color:"#a0aec0",fontWeight:700,flexShrink:0},children:[n.length," update",n.length>1?"s":""]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:n.map(c=>{const k=U(c.createdAt),R=G[c.type]||G.News;return e.jsxs("div",{className:"ntf-row-hover",style:{background:"#fff",borderRadius:11,padding:"14px 18px",display:"flex",alignItems:"flex-start",gap:14,borderLeft:`4px solid ${R.dot}`,border:"1px solid #edf2f7",boxShadow:"0 2px 10px rgba(11,31,78,.04)"},children:[e.jsxs("div",{style:{textAlign:"center",minWidth:44,flexShrink:0},children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase"},children:q[k.getMonth()]}),e.jsx("div",{style:{fontSize:22,fontWeight:900,color:b,lineHeight:1},children:k.getDate()}),e.jsx("div",{style:{fontSize:11,color:"#a0aec0"},children:k.getFullYear()})]}),e.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[e.jsx("div",{style:{display:"flex",gap:7,marginBottom:7,flexWrap:"wrap",alignItems:"center"},children:e.jsx("span",{style:{background:R.bg,color:R.text,border:`1px solid ${R.border}`,padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:700},children:c.type||"News"})}),e.jsx("div",{dangerouslySetInnerHTML:{__html:c.text},style:{fontSize:14.5,color:"#334155",fontWeight:500,lineHeight:1.65}}),c.link&&e.jsx("a",{href:c.link,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:5,marginTop:8,background:"#f8fafc",border:`1px solid ${b}22`,color:b,padding:"5px 12px",borderRadius:7,fontSize:12.5,fontWeight:700,textDecoration:"none"},children:"🔗 Read Full Article"})]})]},c.id)})})]},a)):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16,marginTop:4},children:u.map(a=>{U(a.createdAt);const n=G[a.type]||G.News;return e.jsxs("div",{className:"ntf-card-hover",style:{background:"#fff",borderRadius:13,overflow:"hidden",boxShadow:"0 4px 16px rgba(11,31,78,.07)",border:"1px solid #edf2f7",position:"relative"},children:[e.jsxs("div",{style:{background:`linear-gradient(135deg,${b},#1a3a7c)`,padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{background:n.bg,color:n.text,border:`1px solid ${n.border}`,padding:"3px 10px",borderRadius:20,fontSize:11.5,fontWeight:700},children:a.type||"News"}),e.jsxs("span",{style:{color:w,fontSize:11.5,fontWeight:700},children:["📅 ",Fe(a.createdAt)]})]}),e.jsxs("div",{style:{padding:"15px 16px"},children:[e.jsx("div",{dangerouslySetInnerHTML:{__html:a.text},style:{fontSize:13.5,color:"#334155",lineHeight:1.7,marginBottom:12}}),a.link&&e.jsx("a",{href:a.link,target:"_blank",rel:"noreferrer",className:"download-btn",children:"🔗 Read More"})]})]},a.id)})})]})]}),e.jsx(Ee,{navy:b,gold:w})]})}),e.jsx("style",{children:`
        .download-btn { display:inline-block; background:#f8fafc; color:${b}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .download-btn:hover { background:${b}; color:#fff; border-color:${b}; }
      `})]})}const ee=[{id:"facebook",label:"f",href:"https://facebook.com/"},{id:"twitter",label:"t",href:"https://twitter.com/"},{id:"youtube",label:"y",href:"https://youtube.com/"},{id:"linkedin",label:"in",href:"https://linkedin.com/"}],De=[{name:"Class Rooms",emoji:"🏫"},{name:"Computer Lab",emoji:"💻"},{name:"Library",emoji:"📚"},{name:"Seminar Hall",emoji:"🎤"},{name:"Auditorium",emoji:"🎭"},{name:"Playground",emoji:"⚽"},{name:"Badminton Court",emoji:"🏸"},{name:"Gymnasium",emoji:"🏋️"},{name:"Digital Classrooms",emoji:"📱"},{name:"Cultural Dept.",emoji:"🎵"},{name:"Washroom (B)",emoji:"🚿"},{name:"Washroom (G)",emoji:"🚿"},{name:"Water Purifier",emoji:"💧"},{name:"Canteen",emoji:"🍽️"},{name:"Girls Common Room",emoji:"👩"},{name:"Online Lecture",emoji:"📡"}],re=[{label:"Home",href:"/"},{label:"About Us",href:"/",sub:[{label:"College Profile",href:"/about-us/college-profile"},{label:"Vision & Mission",href:"/about-us/vision-mission"},{label:"Principal Message",href:"/about-us/principal-message"},{label:"College Management",sub:[{label:"Organogram",href:"/about-us/college-management/organogram"},{label:"Presidents",href:"/about-us/college-management/presidents"},{label:"Secretaries",href:"/about-us/college-management/secretaries"},{label:"Principal",href:"/about-us/college-management/principal"}]},{label:"Various Committees",sub:[{label:"Women's Cell",href:"/about-us/various-committees/womens-cell"},{label:"Anti Ragging",href:"/about-us/various-committees/anti-ragging"},{label:"SC/ST",href:"/about-us/various-committees/sc-st"},{label:"OBC",href:"/about-us/various-committees/obc"},{label:"Grievance",href:"/about-us/various-committees/grievance"},{label:"ICC",href:"/about-us/various-committees/icc"},{label:"Minority",href:"/about-us/various-committees/minority"},{label:"Placement",href:"/about-us/various-committees/placement"},{label:"RUSA",href:"/about-us/various-committees/rusa"}]},{label:"College Staff",sub:[{label:"Teaching Staff",href:"/about-us/college-staff/teaching-staff"},{label:"Non-Teaching Staff",href:"/about-us/college-staff/non-teaching-staff"}]},{label:"Regulations",sub:[{label:"B.B.M.K. University Dhanbad",sub:[{label:"Special UG Regulation (CBCS) Session 2020-23",href:"/about-us/regulations/bbmku/special-ug-regulation"},{label:"UG Regulation (FYUGP)",href:"/about-us/regulations/bbmku/ug-regulation-fyugp"},{label:"UG Regulation (CBCS)",href:"/about-us/regulations/bbmku/ug-regulation-cbcs"}]},{label:"College Affiliation Paper B.B.M.K.U.",href:"/about-us/regulations/college-affiliation"},{label:"UGC Under Section 2(f) & 12(B)",href:"/about-us/regulations/ugc-section"},{label:"V.B.U. Hazaribag",sub:[{label:"UG Regulation 2015",href:"/about-us/regulations/vbu/ug-regulation-2015"},{label:"BCA Regulation",href:"/about-us/regulations/vbu/bca-regulation"}]},{label:"ByeLaws",href:"/about-us/regulations/byelaws"},{label:"Exemption",href:"/about-us/regulations/exemption"}]},{label:"Audit Report",href:"/about-us/audit-report"}]},{label:"Campus",href:"/",sub:[{label:"Campus Visuals",sub:[{label:"Bhuda",href:"/campus/visuals/bhuda"},{label:"Bank More",href:"/campus/visuals/bank-more"},{label:"Vocational Building",href:"/campus/visuals/vocational-building"}]},{label:"Infrastructure",href:"/campus/infrastructure"},{label:"Classroom",href:"/campus/classroom"},{label:"ICT Rooms",href:"/campus/ict-rooms"},{label:"Green Campus",href:"/campus/green-campus"}]},{label:"Academics",href:"/",sub:[{label:"IQAC",href:"/academics/iqac"},{label:"Course Offered",href:"/academics/course-offered"},{label:"Departments",sub:[{label:"Humanities",href:"/academics/departments/humanities"},{label:"Social Science",href:"/academics/departments/social-science"},{label:"Commerce",href:"/academics/departments/commerce"},{label:"BCA",href:"/academics/departments/bca"},{label:"BBA",href:"/academics/departments/bba"}]},{label:"Syllabus",href:"/syllabus"},{label:"Academic Calendar",href:"/academics/academic-calendar"}]},{label:"Admission",href:"/",sub:[{label:"Admission Rule",href:"/admission/rule"},{label:"Document Required",href:"/admission/document-required"},{label:"Fee Structure",href:"/admission/fee-structure"},{label:"Notification",sub:[{label:"Latest",href:"/admission/notification/latest"},{label:"Upcoming News",href:"/admission/notification/upcoming"}]},{label:"Intake Capacity",href:"/admission/intake-capacity"}]},{label:"Activity",href:"/",sub:[{label:"NSS",href:"/activity/nss"},{label:"NCC",href:"/activity/ncc"},{label:"Workshop",href:"/activity/workshop"},{label:"Game & Sports",href:"/activity/games-sports"},{label:"Collaboration",sub:[{label:"Rotaract Club",href:"/activity/collaboration/rotaract-club"},{label:"Sadbhavana Diwas",href:"/activity/collaboration/sadbhavana-diwas"}]}]},{label:"NAAC",href:"/",sub:[{label:"SSR 1st Cycle",sub:[{label:"Cycle 1 Documents",href:"/naac/ssr-1st-cycle/cycle-1-documents"},{label:"Peer Team Report",href:"/naac/ssr-1st-cycle/peer-team-report"}]},{label:"SSR 2nd Cycle",sub:[{label:"Cycle 2 Documents",href:"/naac/ssr-2nd-cycle/cycle-2-documents"},{label:"Executive Summary",href:"/naac/ssr-2nd-cycle/executive-summary"}]},{label:"AQAR",href:"/naac/aqar"},{label:"NIRF",href:"/naac/nirf"},{label:"Perspective Plan",href:"/naac/perspective-plan"}]},{label:"Publication",href:"/",sub:[{label:"College Library",href:"/publication/college-library"},{label:"E-Magazine",href:"/publication/e-magazine"},{label:"Examination Results",sub:[{label:"Result 2024",href:"/publication/examination-results/2024"},{label:"Result 2023",href:"/publication/examination-results/2023"}]},{label:"SSS Report",sub:[{label:"Report 2023-24",href:"/publication/sss-report/2023-24"},{label:"Report 2022-23",href:"/publication/sss-report/2022-23"}]}]},{label:"Gallery",href:"#gallery"},{label:"Contact Us",href:"/contact"}],Te=({slides:t=[]})=>{const[d,p]=s.useState(0),j=[{id:"f1",image:"images/slider_baisakhi.jpg",title:"BAISAKHI DI SHAAM Celebration",subtitle:"Celebrating culture and traditions"},{id:"f2",image:"images/slider_cricket.jpg",title:"Inter College BBMKU Cricket Winners",subtitle:"Celebrating sportsmanship and victory"},{id:"f3",image:"images/slider_ncc.jpg",title:'NCC "At Home Function" Participants',subtitle:"Dedicated NCC Cadets & Commanders"},{id:"f4",image:"images/slider_youth_winners.jpg",title:"BBMKU Youth Festival Champions",subtitle:"Winners of BBMKU Inter College Youth Festival - अंतर्नाद"},{id:"f5",image:"images/slider_seminar.jpg",title:"ICSSR Multidisciplinary National Seminar",subtitle:"G20: A Global Platform for Economic Development"}],l=s.useMemo(()=>!t||t.length===0?j:[...t].sort((y,f)=>(Number(y.order)||0)-(Number(f.order)||0)),[t]),x=l.length;s.useEffect(()=>{if(x<=1)return;const y=setInterval(()=>{p(f=>f===x-1?0:f+1)},5e3);return()=>clearInterval(y)},[x]),s.useEffect(()=>{p(0)},[x]);const m=()=>p(y=>y===x-1?0:y+1),v=()=>p(y=>y===0?x-1:y-1),r=y=>y?y.startsWith("http://")||y.startsWith("https://")?y:`/gncollege-website/${y.startsWith("/")?y.slice(1):y}`:"";return e.jsxs("div",{className:"slider",children:[x>1&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"arrow prev",onClick:v,children:"❮"}),e.jsx("div",{className:"arrow next",onClick:m,children:"❯"})]}),e.jsx("div",{className:"slider-dots",children:l.map((y,f)=>e.jsx("div",{className:`dot ${d===f?"current":""}`,onClick:()=>p(f)},f))}),l.map((y,f)=>e.jsx("div",{className:f===d?"slide current":"slide",children:f===d&&e.jsxs(e.Fragment,{children:[e.jsx("img",{src:r(y.image),alt:y.title,loading:"lazy",decoding:"async",className:"image",onError:N=>{N.target.style.opacity="0.2"}}),e.jsxs("div",{className:"content",children:[e.jsx("h2",{children:y.title}),e.jsx("p",{children:y.subtitle}),e.jsx("hr",{})]})]})},y.id||f)),e.jsx("style",{children:`
        @keyframes kenburns {
          0%   { transform: scale(1.05) translate(0, 0); filter: brightness(0.9); }
          100% { transform: scale(1.15) translate(-1%, -1%); filter: brightness(1); }
        }
        @keyframes contentFadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes grow-width {
          from { width: 0; }
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
          transition: opacity 1.5s cubic-bezier(0.33, 1, 0.68, 1); will-change: opacity, transform;
        }
        .slide::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(15,35,71,0.6), transparent 60%); z-index: 1;
        }
        .slide.current { opacity: 1; transform: scale(1); transition-delay: 0.2s; }
        .image { width: 100%; height: 100%; object-fit: cover; object-position: center 20%; will-change: transform; }
        .slide.current .image { animation: kenburns 12s ease-out forwards; }
        .content {
          position: absolute; bottom: 0; left: 0; width: 100%; text-align: center;
          color: #fff; padding: 80px 20px 30px; z-index: 2;
        }
        .content h2 { font-size: 2.2rem; margin-bottom: 8px; font-weight: 800; letter-spacing: 0.5px; text-shadow: 0px 2px 15px rgba(0,0,0,0.5); opacity: 0; }
        .content p  { font-size: 1.2rem; margin-bottom: 18px; font-weight: 500; color: #e2e8f0; text-shadow: 1px 1px 5px rgba(0,0,0,0.5); opacity: 0; }
        .content hr { border: 2px solid #f4a023; width: 80px; margin: 0 auto; border-radius: 4px; opacity: 0; }
        .slide.current .content h2 { animation: contentFadeInUp 0.8s 0.4s both cubic-bezier(0.2, 0.6, 0.2, 1); }
        .slide.current .content p  { animation: contentFadeInUp 0.8s 0.6s both cubic-bezier(0.2, 0.6, 0.2, 1); }
        .slide.current .content hr { animation: grow-width 0.8s 0.8s both cubic-bezier(0.2, 0.6, 0.2, 1); opacity: 1; }
        .arrow {
          position: absolute; top: 50%; transform: translateY(-50%) scale(0.8);
          width: 45px; height: 45px; background-color: rgba(15,35,71,0.3); color: #fff;
          font-size: 1.5rem; display: flex; justify-content: center; align-items: center;
          cursor: pointer; border-radius: 50%; z-index: 11; transition: all 0.3s;
          backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.1); opacity: 0;
        }
        .slider:hover .arrow { opacity: 1; transform: translateY(-50%) scale(1); }
        .arrow:hover { background-color: #f4a023; color: #000; transform: translateY(-50%) scale(1.1); box-shadow: 0 0 15px rgba(244,160,35,0.4); }
        .prev { left: 30px; } .next { right: 30px; }
        .slider-dots { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px; z-index: 11; }
        .dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.4s ease; }
        .dot.current { background: #f4a023; transform: scale(1.3); box-shadow: 0 0 10px rgba(244,160,35,0.5); }
        @media (max-width: 768px) {
          .slider { height: 40vh; min-height: 300px; }
          .content { padding: 60px 15px 20px; }
          .content h2 { font-size: 1.5rem; }
          .content p  { font-size: 0.95rem; margin-bottom: 12px; }
          .arrow { width: 35px; height: 35px; font-size: 1.2rem; }
          .prev { left: 10px; } .next { right: 10px; }
        }
      `})]})},Be=({items:t})=>{if(!t||t.length===0)return null;const d=[...t,...t];return e.jsxs("div",{className:"ticker-wrapper",children:[e.jsx("style",{children:`
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
          background: ${o.gold};
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
        .ticker-item a:hover { color: ${o.gold}; }
        .ticker-item::before { content: '✦'; color: ${o.gold}; font-size: 10px; opacity: 0.7; }
        @keyframes scrollTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}),e.jsx("div",{className:"ticker-label",children:"Latest Updates"}),e.jsx("div",{className:"ticker-container",children:e.jsx("div",{className:"ticker-track",children:d.map((p,j)=>e.jsx("div",{className:"ticker-item",children:e.jsx("a",{href:p.link||"#",target:"_blank",rel:"noopener noreferrer",children:p.text})},j))})})]})},oe=({title:t,subtitle:d})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:32},children:[e.jsx("h2",{style:{fontSize:26,fontWeight:800,color:o.navy,marginBottom:6},children:t}),e.jsx("div",{style:{width:60,height:3,background:o.gold,margin:"0 auto 10px"}}),d&&e.jsx("p",{style:{color:"#666",fontSize:14},children:d})]});function Me(){return e.jsxs("div",{style:{padding:"40px 16px",background:"#f8f9fa"},children:[e.jsxs("section",{style:{marginBottom:"100px",padding:"0 20px"},children:[e.jsx(oe,{title:"Our Academic Departments",subtitle:"Excellence in specialized education for future leaders"}),e.jsx("style",{children:`
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
      background: ${o.navyDark};
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
      background: ${o.gold};
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
  `}),e.jsx("div",{className:"dept-container",children:[{name:"B.C.A",icon:"💻",symbol:"展开",desc:"Bachelor of Computer Applications - Future of IT."},{name:"B.B.A",icon:"📈",symbol:"📊",desc:"Bachelor of Business Administration - Master the Market."},{name:"COMMERCE",icon:"💰",symbol:"📒",desc:"Expertise in Finance, Accounts, and Trade."},{name:"ARTS",icon:"🎨",symbol:"🎭",desc:"Exploring Humanity, Culture, and Social Science."}].map((t,d)=>e.jsxs("div",{className:"modern-dept-card","data-aos":"fade-up","data-aos-delay":d*100,children:[e.jsx("div",{className:"dept-bg-symbol",children:t.symbol}),e.jsxs("div",{className:"dept-content",children:[e.jsx("div",{className:"dept-icon-box",children:t.icon}),e.jsx("h3",{style:{color:"#fff",fontSize:"20px",fontWeight:"800",marginBottom:"8px"},children:t.name}),e.jsx("p",{style:{color:"rgba(255,255,255,0.8)",fontSize:"12.5px",lineHeight:"1.5",margin:0},children:t.desc}),e.jsxs("div",{style:{marginTop:"15px",color:o.gold,fontSize:"12px",fontWeight:"bold",display:"flex",alignItems:"center"},children:["EXPLORE PROGRAM ",e.jsx("span",{className:"explore-arrow",style:{marginLeft:"5px",display:"inline-block"},children:"→"})]})]})]},d))})]}),e.jsx("section",{style:{padding:"80px 20px",background:"#ffffff"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1250,margin:"0 auto"},children:[e.jsx(oe,{title:"College Facilities",subtitle:"World-class infrastructure to support your academic excellence"}),e.jsx("style",{children:`
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
        background: linear-gradient(135deg, ${o.gold}20, transparent);
        opacity: 0;
        transition: 0.4s;
      }
      .facility-card:hover {
        transform: translateY(-10px) scale(1.02);
        background: #fff;
        border-color: ${o.gold};
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
        color: ${o.navy};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        z-index: 2;
        transition: 0.3s;
      }
      .facility-card:hover .facility-text {
        color: ${o.gold};
      }

      /* Desktop par 8 items ek line me lane ki koshish */
      @media (min-width: 1200px) {
        .facility-container {
          grid-template-columns: repeat(8, 1fr);
        }
      }
    `}),e.jsx("div",{className:"facility-container",children:De.map((t,d)=>e.jsxs("div",{className:"facility-card","data-aos":"zoom-in","data-aos-delay":d*50,children:[e.jsx("div",{className:"facility-icon-wrap",children:t.emoji}),e.jsx("div",{className:"facility-text",children:t.name})]},d))})]})})]})}const Q=({title:t,subtitle:d})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:40},children:[e.jsx("h2",{style:{fontSize:28,fontWeight:800,color:o.navy,marginBottom:8},children:t}),e.jsx("div",{style:{width:60,height:4,background:o.gold,margin:"0 auto 12px",borderRadius:2}}),d&&e.jsx("p",{style:{color:"#666",fontSize:15},children:d})]}),Le=({notices:t,announcements:d,pdfReports:p,upcomingEvents:j})=>{const l=s.useRef(null),x=s.useRef(null),m=s.useRef(null),v=s.useRef(null),r=s.useRef(null),y=s.useRef(null),f=s.useMemo(()=>[...t||[],...t||[]],[t]),N=s.useMemo(()=>{const i=(j||[]).map(g=>({...g,text:g.title,date:g.createdAt?.toDate(),type:g.type||"Event"})),u=(d||[]).map(g=>({...g,date:g.createdAt?.toDate(),type:g.type||"News"}));return[...i,...u].sort((g,a)=>(a.date||0)-(g.date||0))},[j,d]),S=s.useMemo(()=>[...N,...N],[N]),W=s.useMemo(()=>{const i=(p||[]).map(u=>({...u,text:u.title,date:u.createdAt?.toDate(),type:"Document"}));return[...i,...i]},[p]),b=(i,u)=>{const g=i.current;if(!g)return;let a=0;const n=()=>{a-=.6,a<-g.scrollHeight/2&&(a=0),g.style.transform=`translateY(${a}px)`,u.current=requestAnimationFrame(n)};u.current=requestAnimationFrame(n)},w=i=>{i.current&&cancelAnimationFrame(i.current)};return s.useEffect(()=>{b(l,v);const i=l.current;return i&&(i.addEventListener("mouseenter",()=>w(v)),i.addEventListener("mouseleave",()=>b(l,v))),()=>w(v)},[f]),s.useEffect(()=>{b(x,r);const i=x.current;return i&&(i.addEventListener("mouseenter",()=>w(r)),i.addEventListener("mouseleave",()=>b(x,r))),()=>w(r)},[S]),s.useEffect(()=>{b(m,y);const i=m.current;return i&&(i.addEventListener("mouseenter",()=>w(y)),i.addEventListener("mouseleave",()=>b(m,y))),()=>w(y)},[W]),e.jsxs("section",{style:{padding:"90px 20px",background:"#f8fafc",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"300px",background:"linear-gradient(180deg, #f1f5f9 0%, rgba(248,250,252,0) 100%)",zIndex:0}}),e.jsxs("div",{style:{maxWidth:1350,margin:"0 auto",position:"relative",zIndex:1},children:[e.jsx(Q,{title:"Notification & Announcements",subtitle:"Stay informed with the latest official updates and campus news"}),e.jsx("style",{children:`
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
            box-shadow: inset 4px 0 0 0 ${o.gold};
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
            text-decoration: none; /* 🌟 FIX: Removed blue underline from anchor tag */
          }
          .notif-card:hover .view-all-btn {
            background: ${o.navy}; color: #fff; border-color: ${o.navy}; box-shadow: 0 8px 20px rgba(15,23,42,0.2);
          }
          
          @keyframes pulse-red { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
          .new-badge-pulse { background: #ef4444; color: #fff; font-size: 0.6rem; padding: 2px 6px; border-radius: 4px; animation: pulse-red 2s infinite; font-weight: 900;}

          @media (max-width: 1100px) { .notif-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 768px) { .notif-grid { grid-template-columns: 1fr; gap: 25px; margin-top: 25px;} .notif-card { height: 480px; } }
        `}),e.jsxs("div",{className:"notif-grid",children:[e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-notice",children:[e.jsx("span",{style:{fontSize:"26px"},children:"🔔"})," Official Notices"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:l,children:f.map((i,u)=>{const g=i.isNew&&(new Date-new Date(i.date))/864e5<5;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",i.date?new Date(i.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#1e3a8a"},children:i.type||"Notice"}),g&&e.jsx("span",{className:"new-badge-pulse",children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:i.text}}),i.link&&e.jsx("a",{href:i.link,target:"_blank",rel:"noreferrer",style:{fontSize:"0.8rem",color:"#2563eb",fontWeight:800,textDecoration:"none",display:"flex",alignItems:"center",gap:"5px"},children:"📎 View Attachment"})]},u)})})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx(F,{to:"/notifications",className:"view-all-btn",children:"View All Notices"})})]}),e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-news",children:[e.jsx("span",{style:{fontSize:"26px"},children:"📣"})," News & Events"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:x,children:S.map((i,u)=>{const g=i.date&&(new Date-new Date(i.date))/864e5<5;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",i.date?new Date(i.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#e11d48"},children:i.type||"Update"}),g&&e.jsx("span",{className:"new-badge-pulse",children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:i.text||i.title}}),i.desc&&e.jsx("div",{className:"rich-text-desc",dangerouslySetInnerHTML:{__html:i.desc}}),i.link&&e.jsx("a",{href:i.link,target:"_blank",rel:"noreferrer",style:{fontSize:"0.8rem",color:"#e11d48",fontWeight:800,textDecoration:"none",display:"flex",alignItems:"center",gap:"5px"},children:"🔗 Read More"})]},u)})})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx(F,{to:"/newspage",className:"view-all-btn",children:"Explore News"})})]}),e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-docs",children:[e.jsx("span",{style:{fontSize:"26px"},children:"📄"})," E-Documents"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:m,children:W.map((i,u)=>e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",i.date?new Date(i.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#059669"},children:i.type||"Document"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:i.text||i.title}}),i.link&&e.jsx("a",{href:i.link,target:"_blank",rel:"noreferrer",style:{fontSize:"0.8rem",color:"#059669",fontWeight:800,textDecoration:"none",display:"flex",alignItems:"center",gap:"5px"},children:"⬇️ Download PDF"})]},u))})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx(F,{to:"/documents",className:"view-all-btn",children:"Document Archive"})})]})]})]})]})},$e=t=>t?t.includes("drive.google.com/file/d/")?`https://drive.google.com/file/d/${t.split("/d/")[1].split("/")[0]}/preview`:t:"",Pe=({notices:t,announcements:d,pdfReports:p,sliderSlides:j,events:l,gallery:x})=>{const[m,v]=s.useState("All Moments"),[r,y]=s.useState(null),f=x||[],N=m==="All Moments"?f:f.filter(i=>i.cat===m),S=(l||[]).filter(i=>i.status==="upcoming"),W=(l||[]).filter(i=>i.status==="recent"),b=i=>{switch(i){case"SEMINAR":return"/images/slider_seminar.jpg";case"WORKSHOP":return"/images/slider_ncc.jpg";case"SPORTS":return"/images/slider_cricket.jpg";case"CULTURAL":return"/images/slider_baisakhi.jpg";default:return"/images/college_photo.jpg"}},w=[{text:"B.A./B.Com. Semester 1 Admissions are now open for 2024-25 session.",link:"/admission/info"},{text:"Results for the Semester 6 internal examinations have been published.",link:"/results"},{text:"The college will remain closed on account of Holi from 24th to 26th March.",link:"#"}];return e.jsxs("div",{style:{fontFamily:"'Segoe UI',sans-serif",background:"transparent",minHeight:"100vh",overflowX:"hidden"},children:[e.jsx("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundImage:"url(/gncollege-website/images/logo.png)",backgroundRepeat:"repeat",backgroundSize:"350px",opacity:.03,zIndex:-1,backgroundColor:"#f4f7f9"}}),e.jsx(Te,{slides:j}),e.jsx(Be,{items:w}),e.jsx(Le,{notices:t,announcements:d,pdfReports:p,upcomingEvents:S}),e.jsx("div",{style:{background:"#fff",borderTop:"1px solid #edf2f7",borderBottom:"1px solid #edf2f7",padding:"18px 20px"},children:e.jsx("div",{style:{maxWidth:1280,margin:"0 auto",display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"},children:[{to:"/notifications",icon:"📢",label:"All Notices & News",bg:o.navy,color:"#fff",shadow:`${o.navy}33`},{to:"/documents",icon:"📁",label:"All Documents",bg:"#16213e",color:"#fff",shadow:"#16213e33"}].map(i=>e.jsxs(F,{to:i.to,onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),style:{display:"inline-flex",alignItems:"center",gap:8,background:i.bg,color:i.color,padding:"11px 26px",borderRadius:50,fontSize:14,fontWeight:800,textDecoration:"none",boxShadow:`0 4px 14px ${i.shadow}`,transition:"all .2s"},onMouseEnter:u=>{u.currentTarget.style.transform="translateY(-3px)",u.currentTarget.style.boxShadow=`0 8px 22px ${i.shadow}`},onMouseLeave:u=>{u.currentTarget.style.transform="",u.currentTarget.style.boxShadow=`0 4px 14px ${i.shadow}`},children:[e.jsx("span",{style:{fontSize:17},children:i.icon}),i.label,e.jsx("svg",{width:"14",height:"14",fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]},i.to))})}),e.jsx("section",{id:"about",style:{background:"#fff",padding:"100px 20px",position:"relative",overflow:"hidden"},children:e.jsxs("div",{style:{maxWidth:1250,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(350px, 1fr))",gap:"60px",alignItems:"center"},children:[e.jsxs("div",{"data-aos":"fade-right",style:{position:"relative"},children:[e.jsx("style",{children:`
                @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
                .image-stack { position: relative; width: 100%; height: 450px; }
                .main-img { width: 90%; height: 100%; object-fit: cover; border-radius: 20px; box-shadow: 20px 20px 0px ${o.gold}; position: relative; z-index: 2; transition: transform 0.5s ease; }
                .image-stack:hover .main-img { transform: scale(1.02); }
                .accent-box { position: absolute; bottom: -30px; right: 0; background: ${o.navy}; color: #fff; padding: 25px; border-radius: 15px; z-index: 3; box-shadow: 0 10px 30px rgba(0,0,0,0.2); animation: float 3s ease-in-out infinite; }
              `}),e.jsxs("div",{className:"image-stack",children:[e.jsx("img",{src:"/gncollege-website/images/college_photo.jpg",alt:"Guru Nanak College Campus",className:"main-img",loading:"lazy",decoding:"async"}),e.jsxs("div",{className:"accent-box",children:[e.jsx("h4",{style:{fontSize:"32px",margin:0,fontWeight:900,color:o.gold},children:"56+"}),e.jsx("p",{style:{fontSize:"12px",margin:0,opacity:.8,letterSpacing:"1px"},children:"YEARS OF EXCELLENCE"})]})]})]}),e.jsxs("div",{"data-aos":"fade-left",children:[e.jsxs("h2",{style:{fontSize:"38px",fontWeight:900,color:o.navy,lineHeight:1.2,marginBottom:"10px"},children:["About the ",e.jsx("span",{style:{color:o.gold},children:"College"})]}),e.jsx("h4",{style:{color:o.gold,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"25px",fontSize:"14px"},children:"Established 1970"}),e.jsx("p",{style:{color:"#555",lineHeight:1.8,fontSize:"16px",marginBottom:"30px"},children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru. We draw inspiration from the teachings of Guru Nanak Devji, fostering an environment of academic progress and individual development."}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"15px",marginBottom:"35px"},children:[{icon:"🛡️",title:"NAAC Accredited",desc:"Grade B Institution"},{icon:"👨‍🏫",title:"Expert Faculty",desc:"Highly Experienced"},{icon:"🔬",title:"Modern Labs",desc:"Tech-enabled Learning"},{icon:"🏅",title:"NSS & NCC",desc:"Character Building"}].map((i,u)=>e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"start"},children:[e.jsx("span",{style:{fontSize:"20px"},children:i.icon}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:800,fontSize:"14px",color:o.navy},children:i.title}),e.jsx("div",{style:{fontSize:"12px",color:"#888"},children:i.desc})]})]},u))}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"25px",flexWrap:"wrap"},children:[e.jsx("style",{children:`
                .discover-btn {
                  background: ${o.navy}; color: #fff; padding: 15px 35px; border: none; border-radius: 50px; 
                  font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(15,35,71,0.3);
                  text-decoration: none; display: inline-block;
                }
                .discover-btn:hover { background: ${o.gold}; color: ${o.navy}; box-shadow: 0 8px 25px rgba(244,160,35,0.4); }
                .social-icon-btn { width: 40px; height: 40px; border-radius: 50%; background: #f0f2f5; display: flex; align-items: center; justify-content: center; color: ${o.navy}; font-size: 18px; text-decoration: none; transition: all 0.3s ease; }
                .social-icon-btn:hover { background: ${o.navy}; color: ${o.gold}; transform: rotate(360deg); }
              `}),e.jsx(F,{to:"/about-us/college-profile",className:"discover-btn",children:"DISCOVER MORE →"}),e.jsxs("div",{style:{display:"flex",gap:"15px",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"13px",fontWeight:700,color:"#666"},children:"FOLLOW US:"}),ee.map(i=>e.jsx("a",{href:i.href,target:"_blank",rel:"noopener noreferrer",className:"social-icon-btn",children:i.id==="twitter"?"𝕏":i.id==="youtube"?"▶":i.label.charAt(0)},i.id))]})]})]})]})}),e.jsx(Me,{}),e.jsx("section",{id:"events",style:{padding:"80px 20px",background:"transparent"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1400,margin:"0 auto"},children:[e.jsx(Q,{title:"Recent Events & Happenings",subtitle:"Insights into our seminars, workshops, and vibrant campus activities"}),e.jsx("style",{children:`
            @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .events-scroller { overflow: hidden; padding: 20px 0; margin-top: 30px; mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent); -webkit-mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent); }
            .events-track { display: flex; width: max-content; gap: 30px; animation: scrollLeft 35s linear infinite; transform: translateZ(0); }
            .events-track:hover { animation-play-state: paused; }
            .event-loop-card { width: 320px; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.04); border: 1px solid rgba(255,255,255,0.5); flex-shrink: 0; transition: all 0.4s ease; display: flex; flex-direction: column; }
            .event-loop-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 18px 40px rgba(15, 35, 71, 0.15); border-color: ${o.gold}; }
            .el-img-box { position: relative; height: 200px; overflow: hidden; }
            .el-img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s ease; }
            .event-loop-card:hover .el-img { transform: scale(1.08); }
            .el-badge { position: absolute; top: 15px; right: 15px; background: ${o.gold}; color: #000; padding: 5px 12px; font-size: 10px; font-weight: 800; border-radius: 50px; text-transform: uppercase; z-index: 2; box-shadow: 0 4px 10px rgba(0,0,0,0.2); transition: all 0.3s ease; }
            .event-loop-card:hover .el-badge { transform: scale(1.1); box-shadow: 0 6px 15px rgba(0,0,0,0.3); }
            .el-date { position: absolute; bottom: 0; left: 0; background: ${o.navy}; color: #fff; padding: 8px 15px; border-top-right-radius: 12px; text-align: center; z-index: 2; transition: all 0.3s ease; }
            .event-loop-card:hover .el-date { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
            .el-info { padding: 22px; flex: 1; display: flex; flex-direction: column; }
            .el-title { font-size: 16px; font-weight: 800; color: ${o.navy}; margin: 0 0 10px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
            .el-desc { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 15px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; flex: 1;}
            
            .el-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px; margin-top: auto;}
            
            .read-more-btn { background: none; border: none; font-size: 11px; color: ${o.gold}; font-weight: 800; text-decoration: none; transition: all 0.3s ease; cursor: pointer; padding: 0; display: flex; align-items: center; gap: 5px; }
            .read-more-btn:hover { color: ${o.navy}; letter-spacing: 0.5px; }
            .report-badge { background: #fee2e2; color: #b91c1c; padding: 3px 8px; border-radius: 4px; font-size: 9px; font-weight: 800; }
          `}),W.length>0?e.jsx("div",{className:"events-scroller",children:e.jsx("div",{className:"events-track",children:[...W,...W,...W].map((i,u)=>e.jsxs("div",{className:"event-loop-card",children:[e.jsxs("div",{className:"el-img-box",children:[e.jsx("div",{className:"el-badge",children:i.type}),e.jsxs("div",{className:"el-date",children:[e.jsx("div",{style:{fontSize:"18px",fontWeight:900,lineHeight:1},children:i.day||"--"}),e.jsx("div",{style:{fontSize:"10px",fontWeight:700},children:i.month||"---"})]}),e.jsx("img",{src:i.imageUrl||b(i.type),alt:i.title,className:"el-img",loading:"lazy",decoding:"async"})]}),e.jsxs("div",{className:"el-info",children:[e.jsx("h3",{className:"el-title",children:i.title}),e.jsx("div",{className:"el-desc",dangerouslySetInnerHTML:{__html:i.desc}}),e.jsxs("div",{className:"el-footer",children:[e.jsxs("span",{style:{fontSize:"11px",color:"#888",fontWeight:700},children:["📍 ",i.location||"Campus"]}),e.jsx("button",{className:"read-more-btn",onClick:g=>{g.preventDefault(),i.reportLink?y($e(i.reportLink)):alert("Full details coming soon!")},children:i.reportLink?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"report-badge",children:"PDF"})," READ REPORT →"]}):"READ MORE →"})]})]})]},u))})}):e.jsxs("div",{style:{textAlign:"center",background:"rgba(255,255,255,0.7)",padding:"40px",borderRadius:"12px",border:"1px dashed #e2e8f0",marginTop:"30px"},children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"10px"},children:"📅"}),e.jsx("h3",{style:{color:o.navy,margin:"0 0 10px"},children:"No Recent Events"}),e.jsx("p",{style:{color:"#64748b",margin:0,fontSize:"14px"},children:"There are no events to display at the moment."})]}),e.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:28},children:e.jsxs(F,{to:"/events",style:{display:"inline-flex",alignItems:"center",gap:9,background:`linear-gradient(135deg, ${o.gold}, #a07010)`,color:o.navy,padding:"13px 30px",borderRadius:50,fontSize:14.5,fontWeight:900,textDecoration:"none",boxShadow:`0 4px 18px ${o.gold}55`,transition:"all .2s"},onMouseEnter:i=>{i.currentTarget.style.transform="translateY(-3px)",i.currentTarget.style.boxShadow=`0 8px 26px ${o.gold}66`},onMouseLeave:i=>{i.currentTarget.style.transform="",i.currentTarget.style.boxShadow=`0 4px 18px ${o.gold}55`},children:["🏆 View All Events",e.jsx("svg",{width:"15",height:"15",fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})})]})}),e.jsxs("section",{style:{background:`linear-gradient(135deg, ${o.navyDark} 0%, ${o.navy} 100%)`,padding:"80px 20px",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:.05,pointerEvents:"none",backgroundImage:"radial-gradient(#fff 1px, transparent 1px)",backgroundSize:"30px 30px"}}),e.jsxs("div",{"data-aos":"zoom-in",style:{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"40px",textAlign:"center",position:"relative",zIndex:2},children:[e.jsx("style",{children:`
            .counter-box { padding: 20px; transition: all 0.4s ease; }
            .counter-box:hover { transform: translateY(-10px); background: rgba(255, 255, 255, 0.05); borderRadius: 15px; boxShadow: 0 0 25px rgba(244,160,35,0.1); }
            .counter-icon { font-size: 50px; margin-bottom: 15px; display: inline-block; filter: drop-shadow(0 0 10px rgba(244,160,35,0.3)); transition: all 0.4s ease; }
            .counter-box:hover .counter-icon { transform: scale(1.2) rotate(10deg); filter: drop-shadow(0 0 20px rgba(244,160,35,0.6)); }
            .counter-number { font-size: 45px; font-weight: 900; color: ${o.gold}; line-height: 1; margin-bottom: 10px; font-family: 'Arial Black', sans-serif; }
            .counter-label { font-size: 14px; color: #e2e8f0; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
          `}),[{label:"STUDENTS ENROLLED",value:"4,000+",icon:"👨‍🎓"},{label:"SUCCESSFUL ALUMNI",value:"45,000+",icon:"🎓"},{label:"EXPERT FACULTY",value:"50+",icon:"👨‍🏫"},{label:"YEARS OF LEGACY",value:"56",icon:"🏛️"}].map((i,u)=>e.jsxs("div",{className:"counter-box",children:[e.jsx("div",{className:"counter-icon",children:i.icon}),e.jsx("div",{className:"counter-number",children:i.value}),e.jsx("div",{className:"counter-label",children:i.label})]},u))]})]}),e.jsx("section",{style:{padding:"80px 20px",background:"transparent"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsx(Q,{title:"Important External Links",subtitle:"Quick access to official education and government portals"}),e.jsx("style",{children:`
            .links-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; margin-top: 40px; }
            .link-tile { background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.6); border-radius: 12px; padding: 25px 15px; text-align: center; text-decoration: none; transition: all 0.3s; display: flex; flex-direction: column; align-items: center; gap: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); transform: translateZ(0); }
            .link-tile:hover { transform: translateY(-8px) scale(1.03); border-color: ${o.gold}; box-shadow: 0 12px 25px rgba(15, 35, 71, 0.1); background: #fff; }
            .link-icon-circle { width: 60px; height: 60px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; transition: 0.3s; }
            .link-tile:hover .link-icon-circle { background: ${o.navy}; color: #fff; transform: rotate(15deg); }
            .link-name { font-size: 13px; font-weight: 800; color: ${o.navy}; letter-spacing: 0.5px; }
          `}),e.jsx("div",{className:"links-grid",children:[{name:"NAAC",url:"https://naac.gov.in",icon:"🏅"},{name:"UGC",url:"https://ugc.ac.in",icon:"📜"},{name:"INFLIBNET",url:"https://inflibnet.ac.in",icon:"📚"},{name:"NDL INDIA",url:"https://ndl.gov.in",icon:"🔬"},{name:"SWAYAM",url:"https://swayam.gov.in",icon:"🌐"},{name:"BBMK UNIVERSITY",url:"https://bbmku.ac.in",icon:"🏛️"}].map((i,u)=>e.jsxs("a",{href:i.url,target:"_blank",rel:"noopener noreferrer",className:"link-tile","data-aos":"fade-up","data-aos-delay":u*50,children:[e.jsx("div",{className:"link-icon-circle",children:i.icon}),e.jsx("div",{className:"link-name",children:i.name})]},u))})]})}),e.jsx("section",{id:"gallery",style:{padding:"100px 20px",background:"#fff"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1300,margin:"0 auto"},children:[e.jsx(Q,{title:"📸 Photo Gallery",subtitle:"Memorable glimpses of academic excellence and cultural heritage"}),e.jsx("style",{children:`
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
          `}),e.jsx("div",{className:"gallery-filters",children:["All Moments","Seminars","Cultural Fest","Guest Visit","Campus","Departments","NSS Programs"].map(i=>e.jsx("button",{className:`filter-btn ${m===i?"active":""}`,onClick:()=>v(i),children:i},i))}),e.jsx("div",{className:"gallery-grid",children:N.length>0?N.map((i,u)=>e.jsxs("div",{className:"gallery-item","data-aos":"zoom-in","data-aos-delay":u*50,children:[e.jsx("img",{src:i.src,alt:i.title,className:"gallery-img",loading:"lazy",decoding:"async"}),e.jsxs("div",{className:"gallery-overlay",children:[e.jsx("span",{style:{color:"#f4a023",fontSize:"10px",fontWeight:"800"},children:i.cat}),e.jsx("h4",{style:{color:"#fff",fontSize:"14px",fontWeight:"700",marginTop:"5px"},children:i.title})]})]},u)):e.jsxs("div",{style:{gridColumn:"1 / -1",textAlign:"center",background:"#f8fafc",padding:"50px 20px",borderRadius:"16px",border:"1px dashed #cbd5e1"},children:[e.jsx("div",{style:{fontSize:"32px",marginBottom:"10px"},children:"📸"}),e.jsx("h3",{style:{color:o.navy,margin:"0 0 5px"},children:"Gallery is Empty"}),e.jsx("p",{style:{color:"#64748b",margin:0,fontSize:"14px"},children:"Upload photos from the Admin Panel to see them here."})]})},m)]})}),r&&he.createPortal(e.jsx("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:9999999,background:"rgba(15,35,71,0.95)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs("div",{style:{background:"#fff",width:"90%",maxWidth:"1000px",height:"85vh",borderRadius:"20px",overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.5)"},children:[e.jsxs("div",{style:{padding:"16px 24px",background:o.navy,color:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("span",{style:{fontSize:"20px"},children:"📄"}),e.jsx("span",{style:{fontWeight:800,letterSpacing:"0.5px"},children:"Official Event Report"})]}),e.jsx("button",{onClick:()=>y(null),style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",width:"32px",height:"32px",borderRadius:"50%",cursor:"pointer",fontSize:"14px",transition:"0.2s",display:"flex",alignItems:"center",justifyContent:"center"},onMouseOver:i=>i.currentTarget.style.background=o.red,onMouseOut:i=>i.currentTarget.style.background="rgba(255,255,255,0.2)",children:"✕"})]}),e.jsx("div",{style:{flex:1,background:"#f1f5f9"},children:e.jsx("iframe",{src:r,title:"Event PDF Report",width:"100%",height:"100%",style:{border:"none"},allow:"autoplay"})})]})}),document.body)]})};function He({onAdminClick:t,navLinks:d}){const[p,j]=s.useState(null),[l,x]=s.useState(null),[m,v]=s.useState(null),[r,y]=s.useState(window.innerWidth<1250),[f,N]=s.useState(!1),[S,W]=s.useState(!1);s.useEffect(()=>{const g=()=>{y(window.innerWidth<1250),window.innerWidth>=1250&&N(!1)},a=()=>{W(window.scrollY>40)};return window.addEventListener("resize",g),window.addEventListener("scroll",a),()=>{window.removeEventListener("resize",g),window.removeEventListener("scroll",a)}},[]);const b=g=>{p===g?(j(null),x(null),v(null)):(j(g),x(null),v(null))},w=g=>{l===g?(x(null),v(null)):(x(g),v(null))},i=g=>{v(m===g?null:g)},u=g=>g?g.startsWith("/#")?g.substring(2):g:"#";return e.jsxs("nav",{className:"glass-navbar",style:{position:"sticky",top:0,zIndex:99999,background:S?"rgba(255, 255, 255, 0.98)":"#ffffff",boxShadow:S?"0 10px 30px rgba(0, 0, 0, 0.15)":"0 4px 15px rgba(0,0,0,0.05)",backdropFilter:S?"blur(12px)":"none",WebkitBackdropFilter:S?"blur(12px)":"none",transition:"all 0.3s ease",width:"100%"},children:[e.jsx("style",{children:`
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
          background: linear-gradient(90deg, ${o.navy} 0%, #1e3a8a 30%, #d4af37 50%, #1e3a8a 70%, ${o.navy} 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shineText 5s linear infinite;
        }

        .clean-divider {
          border-left: 2.5px solid ${o.gold};
          border-radius: 2px;
        }
      `}),e.jsxs("div",{style:{width:"100%",maxWidth:"98%",margin:"0 auto",padding:"0 15px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:r?"5px":"20px"},children:[e.jsxs(F,{to:"/",style:{display:"flex",alignItems:"center",padding:"8px 0",flexShrink:1,textDecoration:"none",gap:r?"8px":"15px",marginLeft:r?"0":"-20px",minWidth:0},children:[e.jsx("div",{className:"logo-box-container",style:{background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:r?"45px":"75px",height:r?"45px":"75px"},children:e.jsx("img",{className:"spinning-logo",src:"/gncollege-website/images/logo.png",alt:"Guru Nanak College Logo",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{className:"clean-divider",style:{display:"flex",flexDirection:"column",justifyContent:"center",paddingLeft:r?"8px":"15px",textAlign:"left",alignItems:"flex-start",overflow:"hidden"},children:[e.jsx("h1",{className:"shimmering-title",style:{margin:"0 0 5px 0",fontSize:r?"13px":"21.5px",fontWeight:"900",fontFamily:"Georgia, serif",whiteSpace:"nowrap",letterSpacing:r?"0px":"2.5px",textAlign:"left",lineHeight:"1.1"},children:"GURU NANAK COLLEGE, DHANBAD"}),!r&&e.jsx("p",{style:{margin:"0 0 3px 0",fontSize:"11px",color:"#475569",fontWeight:"700",whiteSpace:"nowrap",textAlign:"left"},children:"A Sikh Minority Degree College Established & Managed by Gurudwara Prabhandhak Committee, Dhanbad."}),e.jsx("p",{style:{margin:0,fontSize:r?"8.5px":"10.5px",color:o.gold,fontWeight:"800",letterSpacing:r?"0.2px":"1.8px",textTransform:"uppercase",whiteSpace:"nowrap",textAlign:"left"},children:r?"Est. 1970 | Dhanbad, Jharkhand":"Affiliated to Binod Bihari Mahto Koyalanchal University, Dhanbad."})]})]}),r&&e.jsx("button",{onClick:()=>N(!f),style:{background:"transparent",border:"none",color:o.navy,fontSize:28,cursor:"pointer",padding:"4px",flexShrink:0,zIndex:200},children:f?"✕":"☰"}),e.jsxs("div",{style:{display:r?f?"flex":"none":"flex",flexDirection:r?"column":"row",alignItems:r?"flex-start":"center",position:r?"absolute":"static",top:"100%",left:0,right:0,background:r?"rgba(255,255,255,0.98)":"transparent",padding:r?"10px 20px 20px":0,gap:r?10:0,boxShadow:r&&f?"0 10px 20px rgba(0,0,0,.15)":"none",maxHeight:r?"80vh":"auto",overflowY:r?"auto":"visible",flex:1,justifyContent:r?"flex-start":"flex-end",marginLeft:r?"0":"auto",marginRight:r?"0":"10px",borderTop:r&&f?"1px solid #eee":"none",zIndex:250},children:[d.map(g=>e.jsxs("div",{style:{position:"relative",width:r?"100%":"auto"},onMouseEnter:()=>!r&&j(g.label),onMouseLeave:()=>{r||(j(null),x(null),v(null))},children:[e.jsxs("div",{onClick:()=>r&&g.sub&&b(g.label),style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:r&&g.sub?"pointer":"default"},children:[e.jsxs(F,{to:u(g.href),onClick:()=>{g.label==="Home"&&window.scrollTo(0,0)},style:{color:o.navy,padding:r?"12px 0":"24px 11px",display:"block",fontSize:13.5,fontWeight:700,whiteSpace:"nowrap",textDecoration:"none",transition:"all .2s",width:"100%"},children:[g.label==="Home"?"🏠 ":"",g.label]}),r&&g.sub&&e.jsx("span",{style:{color:o.navy,fontSize:20},children:p===g.label?"▴":"▾"}),!r&&g.sub&&e.jsx("span",{style:{color:o.navy,fontSize:11,marginLeft:2,marginRight:8,marginTop:2},children:"▾"})]}),g.sub&&p===g.label&&e.jsx("div",{style:{position:r?"static":"absolute",top:"100%",left:0,background:"#fff",minWidth:240,boxShadow:r?"none":"0 12px 30px rgba(0,0,0,.15)",borderTop:r?"none":"3px solid "+o.navy,borderRadius:r?8:"0 0 8px 8px",zIndex:200,padding:r?"5px 0":"8px 0"},children:g.sub.map(a=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!r&&x(a.label),onMouseLeave:()=>!r&&x(null),children:[e.jsxs("div",{onClick:n=>{r&&a.sub&&(n.stopPropagation(),w(a.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:r?"10px 16px":"10px 18px",borderBottom:r?"none":"1px solid #f8f9fa",cursor:r&&a.sub?"pointer":"default"},onMouseEnter:n=>{r||(n.currentTarget.style.background="#f4f6f9")},onMouseLeave:n=>{r||(n.currentTarget.style.background="transparent")},children:[e.jsx(F,{to:u(a.href),style:{fontSize:13,fontWeight:600,color:o.navy,display:"block",width:"100%",textDecoration:"none"},children:a.label}),a.sub&&e.jsx("span",{style:{fontSize:12,color:o.gold,marginLeft:8},children:r?l===a.label?"▴":"▾":"▶"})]}),a.sub&&l===a.label&&e.jsx("div",{style:{position:r?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:240,boxShadow:r?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:r?"none":"3px solid "+o.gold,borderRadius:r?4:"0 8px 8px 8px",margin:r?"0 16px 10px":0,borderLeft:r?"2px solid "+o.gold:"none"},children:a.sub.map(n=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!r&&v(n.label),onMouseLeave:()=>!r&&v(null),children:[e.jsxs("div",{onClick:c=>{r&&n.sub&&(c.stopPropagation(),i(n.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderBottom:r?"none":"1px solid #f8f9fa",cursor:r&&n.sub?"pointer":"default"},onMouseEnter:c=>{r||(c.currentTarget.style.background="#f4f6f9")},onMouseLeave:c=>{r||(c.currentTarget.style.background="transparent")},children:[e.jsx(F,{to:u(n.href),style:{fontSize:12.5,fontWeight:600,color:"#444",display:"block",width:"100%",textDecoration:"none"},children:n.label}),n.sub&&e.jsx("span",{style:{fontSize:11,color:o.gold,marginLeft:8},children:r?m===n.label?"▴":"▾":"▶"})]}),n.sub&&m===n.label&&e.jsx("div",{style:{position:r?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:240,boxShadow:r?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:r?"none":"3px solid "+o.navy,borderRadius:r?4:"0 8px 8px 8px",margin:r?"0 16px 10px":0,borderLeft:r?"2px solid "+o.navy:"none"},children:n.sub.map(c=>e.jsx(F,{to:u(c.href),style:{display:"block",padding:"10px 16px",fontSize:12,color:"#555",borderBottom:r?"none":"1px solid #f8f9fa",textDecoration:"none"},onMouseEnter:k=>{r||(k.currentTarget.style.background="#f4f6f9")},onMouseLeave:k=>{r||(k.currentTarget.style.background="transparent")},children:c.label},c.label))})]},n.label))})]},a.label))})]},g.label)),e.jsxs("button",{onClick:t,style:{flexShrink:0,background:o.gold,color:"#000",border:"none",padding:"7px 18px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:800,marginLeft:r?0:10,marginTop:r?12:0,width:r?"100%":"auto",boxShadow:"0 4px 15px rgba(244,160,35,0.3)",whiteSpace:"nowrap",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",transition:"all 0.3s ease"},onMouseEnter:g=>g.currentTarget.style.transform="translateY(-2px)",onMouseLeave:g=>g.currentTarget.style.transform="translateY(0)",children:[e.jsx("span",{style:{fontSize:16},children:"⚙️"})," Admin Login"]})]})]})]})}const Oe=()=>e.jsxs("footer",{className:"premium-footer",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"footer-grid",children:[e.jsxs("div",{className:"footer-widget",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"18px",marginBottom:"25px"},children:[e.jsx("div",{style:{width:"75px",height:"75px",background:"rgba(255,255,255,0.95)",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",padding:"8px",boxShadow:"0 10px 25px rgba(0,0,0,0.5)"},children:e.jsx("img",{src:"/gncollege-website/images/logo.png",alt:"GNC Logo",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center"},children:[e.jsx("h2",{style:{fontSize:"1.4rem",fontWeight:"900",color:"#fff",margin:"0 0 2px 0",lineHeight:"1.1"},children:"GURU NANAK"}),e.jsx("h2",{style:{fontSize:"1.4rem",fontWeight:"900",color:"#f4a023",margin:0,lineHeight:"1.1"},children:"COLLEGE"}),e.jsx("p",{style:{fontSize:"0.75rem",color:"#94a3b8",margin:"6px 0 0",fontWeight:"700",letterSpacing:"1.5px"},children:"DHANBAD, JHARKHAND"})]})]}),e.jsx("p",{className:"footer-desc",children:"A Sikh Minority Degree College established in 1970. We are dedicated to providing premium quality education and fostering holistic development based on the core teachings of Guru Nanak Dev Ji."}),e.jsx("div",{style:{display:"flex",gap:"12px"},children:ee&&ee.map(t=>e.jsx("a",{href:t.href,target:"_blank",rel:"noreferrer",className:"social-btn","aria-label":t.label,children:t.id==="twitter"?"𝕏":t.id==="youtube"?"▶":t.id==="facebook"?"f":t.id==="instagram"?"in":t.label.charAt(0)},t.id))})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Quick Links"}),e.jsx("ul",{className:"footer-links",children:[{label:"Home",path:"/"},{label:"College Profile",path:"/about-us/college-profile"},{label:"Admission Rules",path:"/admission/rule"},{label:"Courses Offered",path:"/academics/course-offered"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((t,d)=>e.jsx("li",{className:"footer-link-item",children:e.jsxs(F,{to:t.path,onClick:()=>window.scrollTo(0,0),className:"footer-link",children:[e.jsx("span",{children:"›"})," ",t.label]})},d))})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Get In Touch"}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"📍"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Main Campus"}),"Bhuda, Dhanbad,",e.jsx("br",{}),"Jharkhand - 826001, India"]})]}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"📞"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Phone Enquiries"}),e.jsx("a",{href:"tel:+917903340991",className:"contact-link",children:"+91 79033 40991"})]})]}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"✉️"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Email Us"}),e.jsx("a",{href:"mailto:principal@gncollege.org",className:"contact-link",children:"principal@gncollege.org"})]})]})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Stay Updated"}),e.jsx("p",{className:"footer-desc",style:{marginBottom:"15px"},children:"Subscribe to our digital newsletter to receive the latest academic notices and campus announcements directly in your inbox."}),e.jsxs("div",{className:"newsletter-box",children:[e.jsx("input",{type:"email",placeholder:"Enter email address...",className:"newsletter-input"}),e.jsx("button",{className:"newsletter-btn",children:"Subscribe"})]})]})]}),e.jsx("div",{className:"footer-bottom",children:e.jsxs("div",{className:"footer-bottom-content",children:[e.jsxs("p",{className:"footer-copyright",children:["© ",new Date().getFullYear()," ",e.jsx("span",{style:{color:"#f4a023",fontWeight:"800"},children:"Guru Nanak College, Dhanbad"}),". All Rights Reserved."]}),e.jsx("p",{className:"footer-dev",children:"Designed & Developed dynamically with ❤️ By Pankaj Kumar"})]})})]}),Ye=()=>{const t={id:"whatsapp",label:"W",href:"https://wa.me/917903340991"};return e.jsxs("div",{className:"top-bar-container",style:{background:`linear-gradient(to right, ${o.navyDark}, #0a1832)`,color:"#e2e8f0",padding:"10px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:13,fontWeight:500,letterSpacing:"0.4px",borderBottom:`1px solid ${o.gold}20`},children:[e.jsx("style",{children:`
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
        `}),e.jsxs("div",{className:"contact-group",children:[e.jsxs("a",{href:"tel:+917903340991",className:"top-bar-link",children:[e.jsx("span",{style:{fontSize:"15px",color:o.gold},children:"📞"})," +91-7903340991"]}),e.jsxs("a",{href:"mailto:principal@gncollege.org",className:"top-bar-link",children:[e.jsx("span",{style:{fontSize:"15px",color:o.gold},children:"✉️"})," principal@gncollege.org"]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[ee.map(d=>{let p=d.label;return d.id==="twitter"&&(p="𝕏"),d.id==="youtube"&&(p="▶"),e.jsx("a",{href:d.href,"aria-label":d.id,target:"_blank",rel:"noopener noreferrer",className:`social-icon social-icon-${d.id}`,children:p},d.id)}),e.jsx("a",{href:t.href,"aria-label":t.id,target:"_blank",rel:"noopener noreferrer",className:"social-icon whatsapp-icon",children:t.label},t.id)]})]})};function Ge({onSuccess:t,onClose:d}){const[p,j]=s.useState(""),[l,x]=s.useState(""),[m,v]=s.useState(""),[r,y]=s.useState(!1),f=N=>{N.preventDefault(),v(""),y(!0),setTimeout(()=>{p==="admin"&&l==="admin123"?t():(v("❌ Incorrect Username or Password"),y(!1))},800)};return e.jsxs("div",{className:"login-overlay",children:[e.jsx("style",{children:`
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
          background: linear-gradient(135deg, ${o.navy} 0%, #0a1832 100%);
          padding: 30px 20px; text-align: center; color: #fff;
          border-bottom: 4px solid ${o.gold};
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
        .input-label { display: block; font-size: 13px; font-weight: 700; color: ${o.navy}; margin-bottom: 8px; text-transform: uppercase; }
        .login-input {
          width: 100%; padding: 14px 15px; border: 2px solid #e2e8f0;
          border-radius: 10px; font-size: 15px; transition: 0.3s;
          box-sizing: border-box; outline: none; background: #f8fafc;
        }
        .login-input:focus { border-color: ${o.gold}; background: #fff; box-shadow: 0 0 0 4px rgba(244,160,35,0.1); }

        .login-btn {
          width: 100%; padding: 15px; background: ${o.gold}; color: ${o.navyDark};
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
      `}),e.jsxs("div",{className:"login-box",children:[e.jsx("button",{className:"close-btn",onClick:d,title:"Close",children:"✕"}),e.jsxs("div",{className:"login-header",children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"10px"},children:"🛡️"}),e.jsx("h2",{children:"Admin Portal"}),e.jsx("p",{children:"Authorized Personnel Only"})]}),e.jsxs("form",{className:"login-form",onSubmit:f,children:[m&&e.jsx("div",{className:"error-box",children:m}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"input-label",children:"Username"}),e.jsx("input",{type:"text",className:"login-input",placeholder:"Enter your username",value:p,onChange:N=>j(N.target.value),required:!0})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"input-label",children:"Password"}),e.jsx("input",{type:"password",className:"login-input",placeholder:"Enter your password",value:l,onChange:N=>x(N.target.value),required:!0})]}),e.jsx("button",{type:"submit",className:"login-btn",disabled:r,children:r?"Authenticating...":"Secure Login 🚀"})]})]})]})}const Ue=()=>{const t=ae();let d=t.pathname;d==="/"&&t.hash.startsWith("#/")&&(d=t.hash.substring(1));const p=d.split("/").filter(j=>j);return p.length===0?null:e.jsx("div",{style:{background:"#f8f9fa",borderBottom:"1px solid #e0e0e0"},children:e.jsxs("div",{style:{maxWidth:"1400px",margin:"0 auto",padding:"12px 20px",fontSize:"13.5px",color:"#666",display:"flex",alignItems:"center",fontWeight:"500"},children:[e.jsxs(F,{to:"/",style:{color:o.navy,textDecoration:"none",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{children:"🏠"})," Home"]}),p.map((j,l)=>{const x=`/${p.slice(0,l+1).join("/")}`,m=l===p.length-1,v=j.replace(/-/g," ").replace(/\b\w/g,r=>r.toUpperCase());return e.jsxs("span",{style:{display:"flex",alignItems:"center"},children:[e.jsx("span",{style:{margin:"0 10px",color:"#ccc",fontSize:"10px"},children:"❯"}),m?e.jsx("span",{style:{color:o.gold,fontWeight:"700"},children:v}):e.jsx(F,{to:x,style:{color:o.navy,textDecoration:"none"},children:v})]},x)})]})})};function _e(){const t=[{label:"Principal Message",icon:"👨‍🏫",href:"#/about-us/principal-message"},{label:"Admission Rules",icon:"🎓",href:"#/admission/rule"},{label:"Departments",icon:"🏛️",href:"#/academics/course-offered"},{label:"NSS / NCC",icon:"🎖️",href:"#/activity/nss"},{label:"Syllabus",icon:"📚",href:"#/syllabus"},{label:"Photo Gallery",icon:"📸",href:"#/gallery"},{label:"Contact Us",icon:"📞",href:"#/contact"}];return e.jsx("div",{style:{position:"fixed",right:0,top:"50%",transform:"translateY(-50%)",zIndex:990,display:"flex",flexDirection:"column",gap:"4px"},children:t.map((d,p)=>e.jsx(Xe,{action:d,index:p},p))})}const Xe=({action:t,index:d})=>{const[p,j]=s.useState(!1);return e.jsxs("a",{href:t.href,onMouseEnter:()=>j(!0),onMouseLeave:()=>j(!1),style:{display:"flex",alignItems:"center",justifyContent:"flex-start",padding:"12px 15px",backgroundColor:p?o.gold:o.navy,color:p?o.navy:"#fff",textDecoration:"none",width:p?"200px":"55px",height:"55px",borderTopLeftRadius:"12px",borderBottomLeftRadius:"12px",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",overflow:"hidden",whiteSpace:"nowrap",boxShadow:p?"-5px 5px 15px rgba(0,0,0,0.2)":"-2px 2px 8px rgba(0,0,0,0.1)",position:"relative",right:p?"0":"-5px",animation:`slideInRight 0.5s ease forwards ${d*.1}s`,opacity:0},children:[e.jsx("span",{style:{fontSize:"22px",minWidth:"30px",textAlign:"center",display:"block"},children:t.icon}),e.jsx("span",{style:{fontWeight:"800",fontSize:"14px",marginLeft:"12px",opacity:p?1:0,transition:"opacity 0.3s ease 0.1s"},children:t.label}),e.jsx("style",{children:"@keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }"})]})};function xe({page:t}){const[d,p]=s.useState([]);if(s.useEffect(()=>{if(!t)return;window.scrollTo(0,0);const l=t.path||`/p/${t.slug}`,x=P(H(L,"pdfReports")),m=M(x,v=>{const y=v.docs.map(f=>({id:f.id,...f.data()})).filter(f=>f.targetPage===l);y.sort((f,N)=>new Date(N.date)-new Date(f.date)),p(y)});return()=>m()},[t]),!t)return e.jsx("div",{style:{minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f4f7fa"},children:e.jsxs("div",{style:{textAlign:"center",padding:"50px",background:"#fff",borderRadius:"16px",boxShadow:"0 10px 30px rgba(0,0,0,0.05)"},children:[e.jsx("div",{style:{fontSize:"50px",marginBottom:"15px"},children:"🚧"}),e.jsx("h2",{style:{color:o.navy,fontSize:"28px",margin:"0 0 10px"},children:"Content Updating..."}),e.jsx("p",{style:{color:"#64748b",margin:0},children:"This section is currently being updated by the administration."})]})});const j=Ne.sanitize(t.content,{ADD_TAGS:["iframe"],ADD_ATTR:["allow","allowfullscreen","frameborder","scrolling"]});return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:t.title}),e.jsx("p",{className:"hero-subtitle",children:"Guru Nanak College, Dhanbad"})]})]}),e.jsx("div",{className:"profile-container",children:e.jsxs("div",{className:"profile-layout",children:[e.jsxs("main",{className:"profile-main",children:[e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:"0.2s"},children:[e.jsx("h2",{className:"section-heading",children:t.title}),e.jsx("div",{className:"heading-underline"}),e.jsx("div",{className:"dynamic-rich-content",children:ze(j)})]}),d.length>0&&e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:"0.3s"},children:[e.jsx("h2",{className:"section-heading",children:"📚 Official Documents"}),e.jsx("div",{className:"heading-underline"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:"20px"},children:d.map(l=>e.jsxs("div",{style:{display:"flex",background:"#fff",border:"1px solid #e2e8f0",borderRadius:"10px",overflow:"hidden",transition:"all 0.3s ease",boxShadow:"0 4px 6px rgba(0,0,0,0.02)"},onMouseOver:x=>{x.currentTarget.style.transform="translateY(-4px)",x.currentTarget.style.borderColor=o.gold},onMouseOut:x=>{x.currentTarget.style.transform="translateY(0)",x.currentTarget.style.borderColor="#e2e8f0"},children:[e.jsx("div",{style:{width:"80px",background:"#f1f5f9",borderRight:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"center"},children:l.coverImage?e.jsx("img",{src:l.coverImage,alt:"cover",style:{width:"100%",height:"100%",objectFit:"cover"}}):e.jsx("div",{style:{fontSize:"30px",opacity:.3},children:"📄"})}),e.jsxs("div",{style:{padding:"15px",flex:1,display:"flex",flexDirection:"column",justifyContent:"center"},children:[l.isNew&&e.jsx("span",{className:"new-badge",children:"NEW"}),e.jsx("h4",{style:{margin:"0 0 5px 0",fontSize:"14px",color:o.navy,lineHeight:"1.4"},children:l.title}),e.jsxs("p",{style:{margin:"0 0 10px 0",fontSize:"11px",color:"#64748b",fontWeight:600},children:["📅 ",l.date]}),e.jsx("a",{href:l.pdfLink||l.link,target:"_blank",rel:"noreferrer",className:"download-btn",children:"⬇️ View Document"})]})]},l.id))})]})]}),e.jsxs("aside",{className:"profile-sidebar anim-slide-up",style:{animationDelay:"0.5s"},children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"Principal Message",path:"/about-us/principal-message"},{label:"Admission Rules",path:"/admission/rule"},{label:"Fee Structure",path:"/admission/fee-structure"},{label:"Departments",path:"/academics/course-offered"},{label:"NSS",path:"/activity/nss"},{label:"NCC",path:"/activity/ncc"},{label:"Sports",path:"/activity/games-sports"},{label:"Workshop",path:"/activity/workshop"},{label:"Syllabus",path:"/syllabus"},{label:"Academic Calendar",path:"/academics/academic-calendar"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((l,x)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(F,{to:l.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",l.label]})},x))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:"45px",marginBottom:"15px",position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 12px",fontSize:"19px",color:"#f4a023",position:"relative",zIndex:2},children:"Need Assistance?"}),e.jsx("p",{style:{fontSize:"14px",margin:"0 0 20px",color:"#e2e8f0",lineHeight:"1.6",position:"relative",zIndex:2},children:"Contact our administration office for any queries related to admission or academics."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call Helpdesk Now"})]})]})]})}),e.jsx("style",{children:`
        @media (max-width: 768px) { .dynamic-rich-content { padding: 25px !important; } }
        .dynamic-rich-content table { width: 100% !important; border-collapse: collapse; margin: 20px 0; display: block; overflow-x: auto; white-space: nowrap; font-size: 14px; }
        .dynamic-rich-content th { background: ${o.navy}; color: white; padding: 12px 15px; text-align: left; }
        .dynamic-rich-content td { padding: 12px 15px; border: 1px solid #e2e8f0; }
        .dynamic-rich-content tr:nth-child(even) { background-color: #f8fafc; }
        .dynamic-rich-content iframe { width: 100%; aspect-ratio: 16 / 9; height: auto; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 20px 0; }
        .dynamic-rich-content img { max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin: 20px 0; display: block; }
        .dynamic-rich-content h1, .dynamic-rich-content h2, .dynamic-rich-content h3 { color: ${o.navy}; margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 800; line-height: 1.3; }
        .dynamic-rich-content p { margin-bottom: 1.5em; line-height: 1.8; color: #334155; font-size: 16px; }
        .dynamic-rich-content ul, .dynamic-rich-content ol { margin-bottom: 1.5em; padding-left: 20px; color: #334155; line-height: 1.8; font-size: 16px;}
        .dynamic-rich-content li { margin-bottom: 8px; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        .new-badge { display: inline-block; background: #ef4444; color: #fff; fontSize: 9px; font-weight: 800; padding: 3px 6px; border-radius: 4px; margin-bottom: 8px; width: fit-content; animation: blink 1.5s infinite; letter-spacing: 0.5px;}
        .download-btn { display: inline-block; background: #f8fafc; color: ${o.navy}; padding: 8px 15px; border-radius: 6px; font-size: 12px; font-weight: 700; text-decoration: none; border: 1px solid #cbd5e1; text-align: center; transition: 0.2s; }
        .download-btn:hover { background: ${o.navy}; color: #fff; border-color: ${o.navy}; }
      `})]})}const qe=()=>(s.useEffect(()=>{window.scrollTo(0,0)},[]),e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
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
          background: linear-gradient(135deg, ${o.navy} 0%, #0a1832 100%);
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
        .header-title span { color: ${o.gold}; }
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
      `}),e.jsxs("header",{className:"contact-header",children:[e.jsxs("h1",{className:"header-title",children:["Get In ",e.jsx("span",{children:"Touch"})]}),e.jsx("p",{className:"header-sub",children:"We are here to assist you. Reach out to our respective campuses or directly contact our administration team for any queries."})]}),e.jsxs("div",{className:"campus-container",children:[e.jsxs("div",{className:"campus-card card-1",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏛️"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bhuda Campus"}),e.jsx("span",{className:"campus-badge",style:{background:o.navy},children:"Main Campus • Boys Wing"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsxs("p",{children:["Guru Nanak College, Bhuda",e.jsx("br",{}),"Dhanbad, Jharkhand - 826001"]})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:"tel:+917903340991",children:"+91 79033 40991"})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:"mailto:info@gncollege.org",children:"info@gncollege.org"})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bhuda Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.089853381653!2d86.43232147533682!3d23.797658878638367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69707963d7e8b%3A0x86733221469e7f7b!2sGuru%20Nanak%20College%20Dhanbad!5e0!3m2!1sen!2sin!4v1708688000000!5m2!1sen!2sin",allowFullScreen:"",loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})})]}),e.jsxs("div",{className:"campus-card card-2",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏢"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bank More Campus"}),e.jsx("span",{className:"campus-badge",style:{background:o.gold,color:o.navyDark},children:"Girls Wing • Vocational Studies"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsxs("p",{children:["Guru Nanak College, Bank More",e.jsx("br",{}),"Dhanbad, Jharkhand - 826001"]})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:"tel:+910000000000",children:"+91 (Add Number)"})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:"mailto:vocational@gncollege.org",children:"vocational@gncollege.org"})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bank More Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.630325992144!2d86.4175863149822!3d23.77601898456687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6a3048817a859%3A0x8d365f7d34c52968!2sGuru%20Nanak%20College%20Womens%20Wing!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",allowFullScreen:"",loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})})]})]}),e.jsx("div",{className:"profile-container",style:{marginTop:0},children:e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:"0.3s",background:"transparent",boxShadow:"none",border:"none",padding:"0 !important"},children:[e.jsx("h2",{className:"section-heading",style:{textAlign:"center !important",fontSize:"32px"},children:"Administration Directory"}),e.jsx("div",{className:"heading-underline",style:{margin:"0 auto 30px"}}),e.jsx("div",{className:"directory-grid",children:[{title:"Prof. In-Charge (Bhuda Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫"},{title:"Prof. In-Charge (Bank More Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫"},{title:"BCA Coordinator",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"💻"},{title:"Member, Women's Cell",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛡️"},{title:"Member, Anti-Ragging Squad",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛑"},{title:"P.A. to Principal",name:"Mr. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"📝"}].map((t,d)=>e.jsxs("div",{className:"directory-card",children:[e.jsx("div",{className:"dir-icon",children:t.icon}),e.jsxs("div",{children:[e.jsx("div",{className:"dir-title",children:t.title}),e.jsx("div",{className:"dir-name",children:t.name}),e.jsxs("a",{href:`tel:${t.phone}`,className:"dir-contact",children:["📞 ",t.phone]})]})]},d))})]})})]})),Ke=()=>(s.useEffect(()=>{window.scrollTo(0,0)},[]),e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("header",{className:"profile-hero",children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"College Profile"}),e.jsx("p",{className:"hero-subtitle",children:"Excellence in Education Since 1970"})]})]}),e.jsx("div",{style:{maxWidth:"1200px",margin:"3rem auto 0",padding:"0 20px",position:"relative",zIndex:20},children:e.jsxs("div",{className:"profile-layout",children:[e.jsxs("main",{className:"profile-main",children:[e.jsxs("section",{className:"profile-section anim-slide-up",style:{animationDelay:"0.2s",background:"#fff",borderRadius:"24px"},children:[e.jsxs("div",{className:"section-grid",style:{marginBottom:"3rem"},children:[e.jsxs("div",{className:"text-content",children:[e.jsx("h2",{className:"section-heading",children:"College Profile"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was Established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru after whom this college is named."}),e.jsx("p",{className:"rich-text-content mt-4",children:"The college is managed by a Governing Council nominated by the Gurudwara Prabandhak Committee, Dhanbad, and draws its inspiration from the teachings of the faith propounded by Guru Nanak Devji."})]}),e.jsx("div",{className:"image-content",children:e.jsx("img",{src:"https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop",alt:"College Campus",loading:"lazy",decoding:"async",className:"profile-img hover-scale"})})]}),e.jsxs("div",{style:{marginBottom:"3rem"},children:[e.jsx("h2",{className:"section-heading",children:"About the College"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"Initially the college got affiliated to the Ranchi University – Ranchi since 1970 the year it was stared. But with the passage of time, Binod Bihari Mahto Koylanchal University, Dhanbad came into existence in 2017; and the affiliation of the college got transferred to this new University in 2017."}),e.jsx("p",{className:"rich-text-content mt-4",children:"At present, the college has got permanent affiliation with Binod Bihari Mahto Koylanchal University, Dhanbad in the faculties of Humanities, Social Sciences, commerce and such vocational courses as Bachelor of Computer Applications. The college has got “Deficit Grant College Status” by the government of Jharkhand. Also the college is registered u/s 2F and 12B of the UGC Act."}),e.jsx("p",{className:"rich-text-content mt-4",children:"The main aim and objective behind sponsoring this college was to impart value - based teaching to the young men and women of Dhanbad. The college attaches great importance to moral teaching. The college does not merely offer teaching in such subject as would enable young students to earn their bread and butter, but it also emphasizes grooming them into worthy (morally sound) citizens."})]}),e.jsxs("div",{children:[e.jsx("h2",{className:"section-heading",children:"Our Campuses"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",style:{marginBottom:"3rem"},children:"Guru Nanak College, Dhanbad functions at two main campuses:"}),e.jsxs("div",{className:"grid-2-col gap-6",children:[e.jsxs("div",{className:"campus-box",children:[e.jsx("h3",{style:{fontSize:"1.5rem",color:"var(--primary-navy)",fontWeight:"700",marginBottom:"10px"},children:"1. Bank More Campus (Girls Wing)"}),e.jsx("p",{className:"rich-text-content",children:"The women’s wing of the College was started in the year 2000 in the Bank More Campus of the College in the morning hours. As an exclusive centre of teaching for girls, this wing has earned high reputation among stakeholders during the last few years. In the Women’s wing also, teaching is imparted for B.A./B.Com. (Hons/General) Course."})]}),e.jsxs("div",{className:"campus-box",children:[e.jsx("h3",{style:{fontSize:"1.5rem",color:"var(--primary-navy)",fontWeight:"700",marginBottom:"10px"},children:"2. Bhuda Campus (Boys Wing)"}),e.jsx("p",{className:"rich-text-content",children:"The main building – the Boys’ wing of the College is situated at Bhuda. The main building is spaciously designed in an airy surrounding quite suitable for the environment of an academic institution. The present campus has been so planned as to cater to the needs of the students for a long time."})]})]})]})]}),e.jsx("section",{className:"stats-grid stats-grid-override mb-16 anim-slide-up",style:{animationDelay:"0.4s"},children:[{label:"Years of Legacy",value:"56+",icon:"🏛️"},{label:"Expert Faculty",value:"120+",icon:"👨‍🏫"},{label:"Students",value:"5000+",icon:"🎓"},{label:"Courses",value:"30+",icon:"📚"}].map((t,d)=>e.jsxs("div",{className:"stat-card stat-card-small",style:{background:"#fff",borderRadius:"16px",border:"1px solid #e2e8f0"},children:[e.jsx("div",{className:"stat-icon",children:t.icon}),e.jsx("div",{className:"stat-value stat-value-small",children:t.value}),e.jsx("div",{className:"stat-label",children:t.label})]},d))})]}),e.jsxs("aside",{className:"profile-sidebar anim-slide-up",style:{animationDelay:"0.5s"},children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"Principal Message",path:"/about-us/principal-message"},{label:"Admission Rules",path:"/admission/rule"},{label:"Fee Structure",path:"/admission/fee-structure"},{label:"Departments",path:"/academics/course-offered"},{label:"NSS",path:"/activity/nss"},{label:"NCC",path:"/activity/ncc"},{label:"Sports",path:"/activity/games-sports"},{label:"Workshop",path:"/activity/workshop"},{label:"Syllabus",path:"/syllabus"},{label:"Academic Calendar",path:"/academics/academic-calendar"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((t,d)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(F,{to:t.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",t.label]})},d))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:"45px",marginBottom:"15px",position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 12px",fontSize:"19px",color:"#f4a023",position:"relative",zIndex:2},children:"Need Assistance?"}),e.jsx("p",{style:{fontSize:"14px",margin:"0 0 20px",color:"#e2e8f0",lineHeight:"1.6",position:"relative",zIndex:2},children:"Contact our administration office for any queries related to admission or academics."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call Helpdesk Now"})]}),e.jsxs("div",{style:{marginTop:"30px"},children:[e.jsxs("h4",{style:{fontSize:"17px",fontWeight:"700",color:"var(--primary-navy)",marginBottom:"20px",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("span",{children:"🌐"})," Connect With Us"]}),e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx("a",{href:"https://facebook.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"f"}),e.jsx("a",{href:"https://twitter.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"𝕏"}),e.jsx("a",{href:"https://instagram.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"📸"}),e.jsx("a",{href:"https://youtube.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"▶"})]})]})]})]})})]})),K=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Ve=["All","General","Examination","Admission","Holiday","Sports","Cultural"],_={General:{bg:"#EBF0FF",text:"#1a365d",border:"#BED0FF",dot:"#4a7fd4"},Examination:{bg:"#FFF5F5",text:"#742a2a",border:"#FEB2B2",dot:"#e53e3e"},Admission:{bg:"#F0FFF4",text:"#1c4532",border:"#9AE6B4",dot:"#38a169"},Holiday:{bg:"#FFFBEB",text:"#744210",border:"#FAF089",dot:"#d69e2e"},Sports:{bg:"#FAF5FF",text:"#44337a",border:"#E9D8FD",dot:"#805ad5"},Cultural:{bg:"#E6FFFA",text:"#1d4044",border:"#81E6D9",dot:"#319795"}},X=t=>t?.toDate?t.toDate():new Date(t||Date.now()),Je=t=>{const d=X(t);return`${d.getDate()} ${K[d.getMonth()]} ${d.getFullYear()}`},Qe=({navy:t,gold:d})=>e.jsxs("aside",{className:"profile-sidebar anim-slide-up",style:{animationDelay:"0.4s"},children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"📁 Document Archive",path:"/documents"},{label:"🏆 Campus Events",path:"/events"},{label:"Principal Message",path:"/about-us/principal-message"},{label:"Admission Rules",path:"/admission/rule"},{label:"Fee Structure",path:"/admission/fee-structure"},{label:"Departments",path:"/academics/course-offered"},{label:"NSS",path:"/activity/nss"},{label:"NCC",path:"/activity/ncc"},{label:"Sports",path:"/activity/games-sports"},{label:"Syllabus",path:"/syllabus"},{label:"Academic Calendar",path:"/academics/academic-calendar"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((p,j)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(F,{to:p.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",p.label]})},j))})]}),e.jsxs("div",{className:"widget",style:{marginTop:20},children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📊"})," Category Stats"]}),e.jsx("ul",{className:"quick-links",children:Object.entries(_).map(([p,j])=>e.jsx("li",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #f0f4f8"},children:e.jsxs("span",{style:{fontSize:13,color:j.text,fontWeight:700,display:"flex",alignItems:"center",gap:7},children:[e.jsx("span",{style:{width:8,height:8,borderRadius:"50%",background:j.dot,display:"inline-block"}}),p]})},p))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:"45px",marginBottom:"15px",position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 12px",fontSize:"19px",color:"#f4a023",position:"relative",zIndex:2},children:"Need Assistance?"}),e.jsx("p",{style:{fontSize:"14px",margin:"0 0 20px",color:"#e2e8f0",lineHeight:"1.6",position:"relative",zIndex:2},children:"Contact our administration office for any queries related to admission or academics."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call Helpdesk Now"})]})]});function Ze(){const[t,d]=s.useState([]),[p,j]=s.useState(!0),[l,x]=s.useState("All"),[m,v]=s.useState("All"),[r,y]=s.useState("All"),[f,N]=s.useState(""),[S,W]=s.useState("list"),b=o.navy,w=o.gold;s.useEffect(()=>{window.scrollTo(0,0);const a=P(H(L,"notices"),Y("createdAt","desc"));return M(a,n=>{d(n.docs.map(c=>({id:c.id,...c.data()}))),j(!1)})},[]);const i=s.useMemo(()=>{const a=new Set(t.map(n=>X(n.createdAt).getFullYear()));return["All",...Array.from(a).sort((n,c)=>c-n)]},[t]),u=s.useMemo(()=>t.filter(a=>{const n=X(a.createdAt);return!(l!=="All"&&n.getFullYear()!==Number(l)||m!=="All"&&K[n.getMonth()]!==m||r!=="All"&&(a.type||"General")!==r||f&&!a.text?.toLowerCase().includes(f.toLowerCase()))}),[t,l,m,r,f]),g=s.useMemo(()=>{const a={};return u.forEach(n=>{const c=X(n.createdAt),k=`${K[c.getMonth()]} ${c.getFullYear()}`;a[k]||(a[k]=[]),a[k].push(n)}),a},[u]);return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:.35; } }
        .ntf-fb { border: none; font-family: inherit; cursor: pointer; transition: all .15s; }
        .ntf-row-hover { transition: all .15s; }
        .ntf-row-hover:hover { background: #f8fafc !important; transform: translateX(4px); }
        .ntf-card-hover { transition: all .2s; }
        .ntf-card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(11,31,78,.12) !important; }
      `}),e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsxs("nav",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:14,fontSize:13,fontWeight:600},children:[e.jsx(F,{to:"/",style:{color:"rgba(255,255,255,.55)",textDecoration:"none"},children:"🏠 Home"}),e.jsx("span",{style:{color:"rgba(255,255,255,.3)"},children:"›"}),e.jsx("span",{style:{color:w},children:"Notice Board"})]}),e.jsx("h1",{className:"hero-title",children:"📢 Notice Board"}),e.jsx("p",{className:"hero-subtitle",children:"Saare notices, circulars aur official announcements — year, month aur category wise"}),e.jsx("div",{style:{display:"flex",gap:14,flexWrap:"wrap",marginTop:22},children:[{val:t.length,label:"Total Notices"},{val:t.filter(a=>a.isNew).length,label:"New"},{val:t.filter(a=>a.type==="Examination").length,label:"Examination"},{val:i.length-1,label:"Years"}].map((a,n)=>e.jsxs("div",{style:{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.18)",borderRadius:11,padding:"10px 20px",textAlign:"center",backdropFilter:"blur(8px)"},children:[e.jsx("div",{style:{fontSize:24,fontWeight:900,color:w,lineHeight:1},children:a.val}),e.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,.55)",marginTop:3},children:a.label})]},n))})]})]}),e.jsx("div",{className:"profile-container",children:e.jsxs("div",{className:"profile-layout",children:[e.jsxs("main",{className:"profile-main",children:[e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{padding:"20px 24px",animationDelay:".1s"},children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:16},children:[e.jsxs("div",{style:{flex:1,minWidth:200,position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",opacity:.4,fontSize:16,pointerEvents:"none"},children:"🔍"}),e.jsx("input",{value:f,onChange:a=>N(a.target.value),placeholder:"Notice search karo...",style:{width:"100%",padding:"10px 14px 10px 38px",border:"2px solid #e2e8f0",borderRadius:10,fontSize:14,fontFamily:"inherit",background:"#f8fafc",outline:"none",boxSizing:"border-box",transition:"border-color .2s"},onFocus:a=>a.target.style.borderColor=w,onBlur:a=>a.target.style.borderColor="#e2e8f0"})]}),e.jsxs("div",{style:{display:"flex",gap:7},children:[["list","card"].map(a=>e.jsx("button",{className:"ntf-fb",onClick:()=>W(a),style:{padding:"9px 16px",borderRadius:9,border:`2px solid ${S===a?b:"#e2e8f0"}`,background:S===a?b:"transparent",color:S===a?"#fff":"#718096",fontWeight:700,fontSize:12.5},children:a==="list"?"☰ List":"⊞ Cards"},a)),e.jsx("span",{style:{background:"#f0f4ff",color:b,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800,alignSelf:"center"},children:u.length})]})]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"YEAR:"}),i.map(a=>e.jsx("button",{className:"ntf-fb",onClick:()=>x(String(a)),style:{padding:"4px 14px",borderRadius:20,border:`2px solid ${l===String(a)?w:"#e2e8f0"}`,background:l===String(a)?w:"transparent",color:l===String(a)?b:"#718096",fontWeight:700,fontSize:12.5},children:a},a))]}),e.jsxs("div",{style:{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"MONTH:"}),["All",...K].map(a=>e.jsx("button",{className:"ntf-fb",onClick:()=>v(a),style:{padding:"4px 10px",borderRadius:7,border:`1.5px solid ${m===a?b:"#e2e8f0"}`,background:m===a?b:"transparent",color:m===a?"#fff":"#718096",fontWeight:600,fontSize:12},children:a},a))]}),e.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"CATEGORY:"}),Ve.map(a=>{const n=_[a]||{bg:"#f4f7fa",text:"#4a5568",border:"#e2e8f0"};return e.jsx("button",{className:"ntf-fb",onClick:()=>y(a),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${r===a?n.border:"#e2e8f0"}`,background:r===a?n.bg:"transparent",color:r===a?n.text:"#718096",fontWeight:700,fontSize:12},children:a},a)}),(l!=="All"||m!=="All"||r!=="All"||f)&&e.jsx("button",{className:"ntf-fb",onClick:()=>{x("All"),v("All"),y("All"),N("")},style:{padding:"4px 12px",borderRadius:20,border:"2px solid #FEB2B2",background:"#FFF5F5",color:"#e53e3e",fontWeight:700,fontSize:12},children:"✕ Clear"})]})]}),e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:".2s"},children:[e.jsxs("h2",{className:"section-heading",children:["📋 Notices (",u.length,")"]}),e.jsx("div",{className:"heading-underline"}),p?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[e.jsx("div",{style:{width:40,height:40,border:`4px solid ${w}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"Notices load ho rahi hain..."})]}):u.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"50px 20px"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"🔍"}),e.jsx("h3",{style:{color:b,fontWeight:800,margin:"0 0 6px"},children:"Koi notice nahi mili"}),e.jsx("p",{style:{color:"#718096",fontSize:13.5},children:"Filter ya search change karo"})]}):S==="list"?Object.entries(g).map(([a,n])=>e.jsxs("div",{style:{marginBottom:28},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14},children:[e.jsxs("div",{style:{background:b,color:w,borderRadius:8,padding:"5px 16px",fontWeight:800,fontSize:12.5,whiteSpace:"nowrap",flexShrink:0},children:["📅 ",a]}),e.jsx("div",{style:{flex:1,height:1,background:`linear-gradient(90deg,${b}44,transparent)`}}),e.jsxs("span",{style:{fontSize:11.5,color:"#a0aec0",fontWeight:700,flexShrink:0},children:[n.length," notice",n.length>1?"s":""]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:n.map(c=>{const k=X(c.createdAt),R=_[c.type]||_.General;return e.jsxs("div",{className:"ntf-row-hover",style:{background:"#fff",borderRadius:11,padding:"14px 18px",display:"flex",alignItems:"flex-start",gap:14,borderLeft:`4px solid ${w}`,border:"1px solid #edf2f7",borderLeft:`4px solid ${w}`,boxShadow:"0 2px 10px rgba(11,31,78,.04)"},children:[e.jsxs("div",{style:{textAlign:"center",minWidth:44,flexShrink:0},children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase"},children:K[k.getMonth()]}),e.jsx("div",{style:{fontSize:22,fontWeight:900,color:b,lineHeight:1},children:k.getDate()}),e.jsx("div",{style:{fontSize:11,color:"#a0aec0"},children:k.getFullYear()})]}),e.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[e.jsxs("div",{style:{display:"flex",gap:7,marginBottom:7,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{background:R.bg,color:R.text,border:`1px solid ${R.border}`,padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:700},children:c.type||"General"}),c.isNew&&e.jsx("span",{style:{background:"#e53e3e",color:"#fff",padding:"2px 7px",borderRadius:20,fontSize:9.5,fontWeight:900,animation:"blink 1.5s infinite"},children:"● NEW"})]}),e.jsx("div",{dangerouslySetInnerHTML:{__html:c.text},style:{fontSize:14.5,color:"#334155",fontWeight:500,lineHeight:1.65}}),c.link&&e.jsx("a",{href:c.link,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:5,marginTop:8,background:"#f8fafc",border:`1px solid ${b}22`,color:b,padding:"5px 12px",borderRadius:7,fontSize:12.5,fontWeight:700,textDecoration:"none"},children:"📎 Attachment dekho"})]})]},c.id)})})]},a)):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16,marginTop:4},children:u.map(a=>{X(a.createdAt);const n=_[a.type]||_.General;return e.jsxs("div",{className:"ntf-card-hover",style:{background:"#fff",borderRadius:13,overflow:"hidden",boxShadow:"0 4px 16px rgba(11,31,78,.07)",border:"1px solid #edf2f7",position:"relative"},children:[e.jsxs("div",{style:{background:`linear-gradient(135deg,${b},#1a3a7c)`,padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{background:n.bg,color:n.text,border:`1px solid ${n.border}`,padding:"3px 10px",borderRadius:20,fontSize:11.5,fontWeight:700},children:a.type||"General"}),e.jsxs("span",{style:{color:w,fontSize:11.5,fontWeight:700},children:["📅 ",Je(a.createdAt)]})]}),a.isNew&&e.jsx("div",{style:{position:"absolute",top:10,right:10,background:"#e53e3e",color:"#fff",fontSize:9,fontWeight:900,padding:"2px 7px",borderRadius:4,letterSpacing:1},children:"NEW"}),e.jsxs("div",{style:{padding:"15px 16px"},children:[e.jsx("div",{dangerouslySetInnerHTML:{__html:a.text},style:{fontSize:13.5,color:"#334155",lineHeight:1.7,marginBottom:12}}),a.link&&e.jsx("a",{href:a.link,target:"_blank",rel:"noreferrer",className:"download-btn",children:"📎 Attachment"})]})]},a.id)})})]})]}),e.jsx(Qe,{navy:b,gold:w})]})}),e.jsx("style",{children:`
        .download-btn { display:inline-block; background:#f8fafc; color:${b}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .download-btn:hover { background:${b}; color:#fff; border-color:${b}; }
      `})]})}const te=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],et=["All","Document","Report","Syllabus","Circular","Result"],O={Document:{icon:"📄",bg:"#EBF0FF",text:"#1a365d",border:"#BED0FF",color:"#4a7fd4"},Report:{icon:"📊",bg:"#F0FFF4",text:"#1c4532",border:"#9AE6B4",color:"#38a169"},Syllabus:{icon:"📚",bg:"#FFFBEB",text:"#744210",border:"#FAF089",color:"#d69e2e"},Circular:{icon:"📋",bg:"#FFF5F5",text:"#742a2a",border:"#FEB2B2",color:"#e53e3e"},Result:{icon:"🏆",bg:"#E6FFFA",text:"#1d4044",border:"#81E6D9",color:"#319795"}},Z=t=>t?.toDate?t.toDate():new Date(t||Date.now()),se=t=>{const d=Z(t);return`${d.getDate()} ${te[d.getMonth()]} ${d.getFullYear()}`},tt=({navy:t,gold:d,typeCounts:p})=>e.jsxs("aside",{className:"profile-sidebar anim-slide-up",style:{animationDelay:"0.4s"},children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📊"})," Document Types"]}),e.jsx("ul",{className:"quick-links",children:Object.entries(p).map(([j,l])=>{const x=O[j]||{icon:"📄",color:"#718096"};return e.jsxs("li",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #f0f4f8"},children:[e.jsxs("span",{style:{fontSize:13.5,color:"#334155",fontWeight:600,display:"flex",alignItems:"center",gap:7},children:[x.icon," ",j]}),e.jsx("span",{style:{background:`${x.color}18`,color:x.color,padding:"2px 9px",borderRadius:20,fontSize:12,fontWeight:800},children:l})]},j)})})]}),e.jsxs("div",{className:"widget",style:{marginTop:20},children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"📢 Notice Board",path:"/notifications"},{label:"🏆 Campus Events",path:"/events"},{label:"Syllabus",path:"/syllabus"},{label:"Admission Rules",path:"/admission/rule"},{label:"Fee Structure",path:"/admission/fee-structure"},{label:"Academic Calendar",path:"/academics/academic-calendar"},{label:"NAAC",path:"/naac/nirf"},{label:"IQAC",path:"/academics/iqac"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((j,l)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(F,{to:j.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",j.label]})},l))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:"45px",marginBottom:"15px",position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 12px",fontSize:"19px",color:"#f4a023",position:"relative",zIndex:2},children:"Need Assistance?"}),e.jsx("p",{style:{fontSize:"14px",margin:"0 0 20px",color:"#e2e8f0",lineHeight:"1.6",position:"relative",zIndex:2},children:"Contact our administration office for any queries related to admission or academics."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call Helpdesk Now"})]})]});function at(){const[t,d]=s.useState([]),[p,j]=s.useState(!0),[l,x]=s.useState("All"),[m,v]=s.useState("All"),[r,y]=s.useState("All"),[f,N]=s.useState(""),[S,W]=s.useState("grid"),b=o.navy,w=o.gold;s.useEffect(()=>{window.scrollTo(0,0);const n=P(H(L,"pdfReports"),Y("createdAt","desc"));return M(n,c=>{d(c.docs.map(k=>({id:k.id,...k.data()}))),j(!1)})},[]);const i=s.useMemo(()=>{const n=new Set(t.map(c=>Z(c.createdAt).getFullYear()));return["All",...Array.from(n).sort((c,k)=>k-c)]},[t]),u=s.useMemo(()=>{const n={};return t.forEach(c=>{const k=c.type||"Document";n[k]=(n[k]||0)+1}),n},[t]),g=s.useMemo(()=>t.filter(n=>{const c=Z(n.createdAt);return!(l!=="All"&&c.getFullYear()!==Number(l)||m!=="All"&&te[c.getMonth()]!==m||r!=="All"&&(n.type||"Document")!==r||f&&!n.title?.toLowerCase().includes(f.toLowerCase()))}),[t,l,m,r,f]),a=s.useMemo(()=>{const n={};return g.forEach(c=>{const k=String(Z(c.createdAt).getFullYear());n[k]||(n[k]=[]),n[k].push(c)}),n},[g]);return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes spin{to{transform:rotate(360deg)}}
        .doc-fb{border:none;font-family:inherit;cursor:pointer;transition:all .15s}
        .doc-card-hover{transition:all .2s}
        .doc-card-hover:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(11,31,78,.13)!important}
        .doc-row-hover{transition:all .15s}
        .doc-row-hover:hover{background:#f8fafc!important;border-color:${w}55!important}
        .dl-btn-hover{transition:all .18s}
        .dl-btn-hover:hover{background:${w}!important;color:${b}!important}
      `}),e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsxs("nav",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:14,fontSize:13,fontWeight:600},children:[e.jsx(F,{to:"/",style:{color:"rgba(255,255,255,.55)",textDecoration:"none"},children:"🏠 Home"}),e.jsx("span",{style:{color:"rgba(255,255,255,.3)"},children:"›"}),e.jsx("span",{style:{color:w},children:"Document Archive"})]}),e.jsx("h1",{className:"hero-title",children:"📁 Document Archive"}),e.jsx("p",{className:"hero-subtitle",children:"Syllabus, circulars, reports aur important documents — year aur type wise filter karo"}),e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",marginTop:22},children:[Object.entries(u).map(([n,c])=>{const k=O[n]||{icon:"📄"};return e.jsxs("button",{onClick:()=>y(r===n?"All":n),style:{background:r===n?"rgba(201,162,39,.25)":"rgba(255,255,255,.1)",border:`1px solid ${r===n?w:"rgba(255,255,255,.18)"}`,borderRadius:11,padding:"10px 18px",color:"#fff",cursor:"pointer",textAlign:"center",transition:"all .2s",backdropFilter:"blur(6px)"},children:[e.jsx("span",{style:{display:"block",fontSize:19},children:k.icon}),e.jsx("span",{style:{display:"block",fontSize:22,fontWeight:900,color:w,lineHeight:1},children:c}),e.jsx("span",{style:{display:"block",fontSize:11,color:"rgba(255,255,255,.55)",marginTop:2},children:n})]},n)}),e.jsxs("div",{style:{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.18)",borderRadius:11,padding:"10px 18px",textAlign:"center",backdropFilter:"blur(6px)"},children:[e.jsx("span",{style:{display:"block",fontSize:19},children:"📂"}),e.jsx("span",{style:{display:"block",fontSize:22,fontWeight:900,color:w,lineHeight:1},children:t.length}),e.jsx("span",{style:{display:"block",fontSize:11,color:"rgba(255,255,255,.55)",marginTop:2},children:"Total"})]})]})]})]}),e.jsx("div",{className:"profile-container",children:e.jsxs("div",{className:"profile-layout",children:[e.jsxs("main",{className:"profile-main",children:[e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{padding:"20px 24px",animationDelay:".1s"},children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:16},children:[e.jsxs("div",{style:{flex:1,minWidth:200,position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",opacity:.4,fontSize:16,pointerEvents:"none"},children:"🔍"}),e.jsx("input",{value:f,onChange:n=>N(n.target.value),placeholder:"Document search karo...",style:{width:"100%",padding:"10px 14px 10px 38px",border:"2px solid #e2e8f0",borderRadius:10,fontSize:14,fontFamily:"inherit",background:"#f8fafc",outline:"none",boxSizing:"border-box",transition:"border-color .2s"},onFocus:n=>n.target.style.borderColor=w,onBlur:n=>n.target.style.borderColor="#e2e8f0"})]}),e.jsxs("div",{style:{display:"flex",gap:7},children:[["grid","list"].map(n=>e.jsx("button",{className:"doc-fb",onClick:()=>W(n),style:{padding:"9px 16px",borderRadius:9,border:`2px solid ${S===n?b:"#e2e8f0"}`,background:S===n?b:"transparent",color:S===n?"#fff":"#718096",fontWeight:700,fontSize:12.5},children:n==="grid"?"⊞ Grid":"☰ List"},n)),e.jsx("span",{style:{background:"#f0f4ff",color:b,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800,alignSelf:"center"},children:g.length})]})]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"YEAR:"}),i.map(n=>e.jsx("button",{className:"doc-fb",onClick:()=>x(String(n)),style:{padding:"4px 14px",borderRadius:20,border:`2px solid ${l===String(n)?w:"#e2e8f0"}`,background:l===String(n)?w:"transparent",color:l===String(n)?b:"#718096",fontWeight:700,fontSize:12.5},children:n},n))]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"MONTH:"}),["All",...te].map(n=>e.jsx("button",{className:"doc-fb",onClick:()=>v(n),style:{padding:"4px 10px",borderRadius:7,border:`1.5px solid ${m===n?b:"#e2e8f0"}`,background:m===n?b:"transparent",color:m===n?"#fff":"#718096",fontWeight:600,fontSize:12},children:n},n))]}),e.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"TYPE:"}),et.map(n=>{const c=O[n]||{bg:"#f4f7fa",text:"#4a5568",border:"#e2e8f0"};return e.jsxs("button",{className:"doc-fb",onClick:()=>y(n),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${r===n?c.border:"#e2e8f0"}`,background:r===n?c.bg:"transparent",color:r===n?c.text:"#718096",fontWeight:700,fontSize:12},children:[n!=="All"&&(O[n]?.icon||"📄")+" ",n]},n)}),(l!=="All"||m!=="All"||r!=="All"||f)&&e.jsx("button",{className:"doc-fb",onClick:()=>{x("All"),v("All"),y("All"),N("")},style:{padding:"4px 12px",borderRadius:20,border:"2px solid #FEB2B2",background:"#FFF5F5",color:"#e53e3e",fontWeight:700,fontSize:12},children:"✕ Clear"})]})]}),e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:".2s"},children:[e.jsxs("h2",{className:"section-heading",children:["📚 Official Documents (",g.length,")"]}),e.jsx("div",{className:"heading-underline"}),p?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[e.jsx("div",{style:{width:40,height:40,border:`4px solid ${w}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"Documents load ho rahe hain..."})]}):g.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"50px 20px"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"📂"}),e.jsx("h3",{style:{color:b,fontWeight:800,margin:"0 0 6px"},children:"Koi document nahi mila"}),e.jsx("p",{style:{color:"#718096",fontSize:13.5},children:"Filter ya search change karo"})]}):S==="grid"?e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18},children:g.map(n=>{const c=O[n.type]||O.Document;return e.jsxs("div",{className:"doc-card-hover",style:{background:"#fff",borderRadius:14,overflow:"hidden",boxShadow:"0 4px 16px rgba(11,31,78,.06)",border:"1px solid #edf2f7"},children:[e.jsx("div",{style:{height:5,background:`linear-gradient(90deg,${b},${w})`}}),e.jsxs("div",{style:{padding:"18px 20px 16px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14},children:[e.jsx("div",{style:{width:50,height:50,borderRadius:12,background:c.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,border:`1px solid ${c.border}`},children:c.icon}),e.jsx("span",{style:{background:c.bg,color:c.text,border:`1px solid ${c.border}`,padding:"3px 11px",borderRadius:20,fontSize:11.5,fontWeight:700},children:n.type||"Document"})]}),e.jsx("h3",{style:{margin:"0 0 7px",fontSize:14.5,fontWeight:800,color:b,lineHeight:1.4},children:n.title}),e.jsxs("p",{style:{margin:"0 0 16px",fontSize:12,color:"#a0aec0",fontWeight:600},children:["📅 ",se(n.createdAt)]}),e.jsx("a",{href:n.link,target:"_blank",rel:"noreferrer",className:"dl-btn-hover",style:{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:b,color:"#fff",padding:"10px 16px",borderRadius:9,fontSize:13.5,fontWeight:700,textDecoration:"none",border:"none"},children:"⬇️ Download / View"})]})]},n.id)})}):Object.entries(a).sort((n,c)=>c[0]-n[0]).map(([n,c])=>e.jsxs("div",{style:{marginBottom:28},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg,#16213e,#0a3d62)",color:w,borderRadius:8,padding:"5px 16px",fontWeight:800,fontSize:12.5,whiteSpace:"nowrap"},children:["📂 ",n]}),e.jsx("div",{style:{flex:1,height:1,background:"linear-gradient(90deg,#0f346044,transparent)"}}),e.jsxs("span",{style:{fontSize:11.5,color:"#a0aec0",fontWeight:700},children:[c.length," file",c.length>1?"s":""]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:c.map(k=>{const R=O[k.type]||O.Document;return e.jsxs("div",{className:"doc-row-hover",style:{background:"#fff",borderRadius:11,padding:"13px 16px",display:"flex",alignItems:"center",gap:13,border:"1px solid #edf2f7",boxShadow:"0 2px 8px rgba(11,31,78,.04)"},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:10,background:R.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:21,flexShrink:0,border:`1px solid ${R.border}`},children:R.icon}),e.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[e.jsx("div",{style:{fontWeight:700,fontSize:14.5,color:b,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:k.title}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:4,alignItems:"center"},children:[e.jsx("span",{style:{background:R.bg,color:R.text,border:`1px solid ${R.border}`,padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700},children:k.type||"Document"}),e.jsxs("span",{style:{fontSize:12,color:"#a0aec0"},children:["📅 ",se(k.createdAt)]})]})]}),e.jsx("a",{href:k.link,target:"_blank",rel:"noreferrer",className:"dl-btn-hover",style:{display:"inline-flex",alignItems:"center",gap:6,background:b,color:"#fff",padding:"9px 18px",borderRadius:9,fontSize:13,fontWeight:700,textDecoration:"none",flexShrink:0,whiteSpace:"nowrap"},children:"⬇️ Open"})]},k.id)})})]},n))]})]}),e.jsx(tt,{navy:b,gold:w,typeCounts:u})]})}),e.jsx("style",{children:`
        .download-btn { display:inline-block; background:#f8fafc; color:${b}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .download-btn:hover { background:${b}; color:#fff; border-color:${b}; }
      `})]})}const it=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],nt=["All","WORKSHOP","SEMINAR","CULTURAL","SPORTS","NSS","NCC"],V={WORKSHOP:{icon:"🛠️",grad:"linear-gradient(135deg,#667eea,#764ba2)",light:"#FAF5FF",text:"#44337a",border:"#E9D8FD",color:"#805ad5"},SEMINAR:{icon:"🎤",grad:"linear-gradient(135deg,#f093fb,#f5576c)",light:"#FFF5F5",text:"#742a2a",border:"#FEB2B2",color:"#e53e3e"},CULTURAL:{icon:"🎭",grad:"linear-gradient(135deg,#4facfe,#00f2fe)",light:"#EBF8FF",text:"#1a365d",border:"#BED0FF",color:"#3182ce"},SPORTS:{icon:"🏆",grad:"linear-gradient(135deg,#43e97b,#38f9d7)",light:"#F0FFF4",text:"#1c4532",border:"#9AE6B4",color:"#38a169"},NSS:{icon:"🤝",grad:"linear-gradient(135deg,#fa709a,#fee140)",light:"#FFFBEB",text:"#744210",border:"#FAF089",color:"#d69e2e"},NCC:{icon:"🎖️",grad:"linear-gradient(135deg,#a18cd1,#fbc2eb)",light:"#FAF5FF",text:"#44337a",border:"#E9D8FD",color:"#805ad5"}},le=t=>t?.toDate?t.toDate():new Date(t||Date.now()),rt=({navy:t,gold:d,upcoming:p,past:j})=>e.jsxs("aside",{className:"profile-sidebar anim-slide-up",style:{animationDelay:"0.4s"},children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"🔜"})," Next Events"]}),p.slice(0,4).length===0?e.jsx("p",{style:{color:"#a0aec0",fontSize:13,padding:"10px 0"},children:"Koi upcoming event nahi"}):p.slice(0,4).map((l,x)=>{const m=V[l.type]||{icon:"📅",color:"#718096"};return e.jsxs("div",{style:{display:"flex",gap:10,padding:"10px 0",borderBottom:"1px solid #f0f4f8",alignItems:"flex-start"},children:[e.jsx("div",{style:{width:38,height:38,borderRadius:9,background:`${m.color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0},children:m.icon}),e.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[e.jsx("div",{style:{fontSize:13,fontWeight:700,color:"#1a202c",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:l.title}),e.jsxs("div",{style:{fontSize:11,color:"#a0aec0",marginTop:2},children:["📅 ",l.day||"?"," ",l.month||"—"," · 📍 ",l.location||"Campus"]})]})]},l.id||x)})]}),e.jsxs("div",{className:"widget",style:{marginTop:20},children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"📢 Notice Board",path:"/notifications"},{label:"📁 Document Archive",path:"/documents"},{label:"NSS",path:"/activity/nss"},{label:"NCC",path:"/activity/ncc"},{label:"Sports",path:"/activity/games-sports"},{label:"Workshop",path:"/activity/workshop"},{label:"Admission Rules",path:"/admission/rule"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((l,x)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(F,{to:l.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",l.label]})},x))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:"45px",marginBottom:"15px",position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 12px",fontSize:"19px",color:"#f4a023",position:"relative",zIndex:2},children:"Need Assistance?"}),e.jsx("p",{style:{fontSize:"14px",margin:"0 0 20px",color:"#e2e8f0",lineHeight:"1.6",position:"relative",zIndex:2},children:"Contact our administration office for any queries related to admission or academics."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call Helpdesk Now"})]})]});function ot(){const[t,d]=s.useState([]),[p,j]=s.useState(!0),[l,x]=s.useState("upcoming"),[m,v]=s.useState("All"),[r,y]=s.useState("All"),[f,N]=s.useState("All"),[S,W]=s.useState(""),[b,w]=s.useState(null),i=o.navy,u=o.gold;s.useEffect(()=>{window.scrollTo(0,0);const h=P(H(L,"events"),Y("createdAt","desc"));return M(h,I=>{d(I.docs.map(z=>({id:z.id,...z.data()}))),j(!1)})},[]);const g=s.useMemo(()=>t.filter(h=>h.status==="upcoming"),[t]),a=s.useMemo(()=>t.filter(h=>h.status!=="upcoming"),[t]),n=s.useMemo(()=>{const h=new Set(t.map(I=>le(I.createdAt).getFullYear()));return["All",...Array.from(h).sort((I,z)=>z-I)]},[t]),c=s.useMemo(()=>t.filter(h=>!(l==="upcoming"&&h.status!=="upcoming"||l==="past"&&h.status==="upcoming"||m!=="All"&&h.type!==m||r!=="All"&&le(h.createdAt).getFullYear()!==Number(r)||f!=="All"&&(h.month||"").toUpperCase()!==f.toUpperCase()||S&&!h.title?.toLowerCase().includes(S.toLowerCase()))),[t,l,m,r,f,S]),k=s.useMemo(()=>{const h={};return c.forEach(I=>{const z=I.month||"Other";h[z]||(h[z]=[]),h[z].push(I)}),h},[c]),R=g[0];return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes glow{0%,100%{box-shadow:0 8px 28px rgba(11,31,78,.1)}50%{box-shadow:0 8px 28px rgba(201,162,39,.25)}}
        .evt-fb{border:none;font-family:inherit;cursor:pointer;transition:all .15s}
        .evt-card{transition:all .22s}
        .evt-card:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(11,31,78,.13)!important}
        .evt-upcoming{animation:glow 3s ease-in-out infinite}
        .evt-img{transition:transform .4s}
        .evt-card:hover .evt-img{transform:scale(1.06)}
      `}),e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsxs("nav",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:14,fontSize:13,fontWeight:600},children:[e.jsx(F,{to:"/",style:{color:"rgba(255,255,255,.55)",textDecoration:"none"},children:"🏠 Home"}),e.jsx("span",{style:{color:"rgba(255,255,255,.3)"},children:"›"}),e.jsx("span",{style:{color:u},children:"Campus Events"})]}),e.jsx("h1",{className:"hero-title",children:"🏛️ Campus Events"}),e.jsx("p",{className:"hero-subtitle",children:"Workshops, seminars, cultural fests aur khel-kud — saari activities ek jagah"}),e.jsx("div",{style:{display:"flex",gap:14,flexWrap:"wrap",marginTop:22},children:[{val:t.length,label:"Total Events",icon:"📆"},{val:g.length,label:"Upcoming",icon:"🔜",hi:!0},{val:a.length,label:"Past Events",icon:"📜"},{val:[...new Set(t.map(h=>h.type))].filter(Boolean).length,label:"Types",icon:"🏷️"}].map((h,I)=>e.jsxs("div",{style:{background:h.hi?"rgba(201,162,39,.22)":"rgba(255,255,255,.1)",border:`1px solid ${h.hi?u+"66":"rgba(255,255,255,.18)"}`,borderRadius:11,padding:"10px 20px",textAlign:"center",backdropFilter:"blur(8px)"},children:[e.jsx("span",{style:{display:"block",fontSize:17},children:h.icon}),e.jsx("div",{style:{fontSize:24,fontWeight:900,color:h.hi?u:"#fff",lineHeight:1,marginTop:2},children:h.val}),e.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,.55)",marginTop:2},children:h.label})]},I))})]})]}),e.jsx("div",{className:"profile-container",children:e.jsxs("div",{className:"profile-layout",children:[e.jsxs("main",{className:"profile-main",children:[R&&e.jsx("section",{className:"glass-panel profile-section anim-slide-up",style:{padding:"18px 22px",animationDelay:".05s",border:`2px solid ${u}44`},children:(()=>{const h=V[R.type]||{icon:"🏆",grad:`linear-gradient(135deg,${i},#1a3a7c)`,light:"#EBF0FF",text:"#1a365d"};return e.jsxs("div",{style:{display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:11,fontWeight:900,color:u,letterSpacing:1.5,textTransform:"uppercase",flexShrink:0},children:"⭐ Featured"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,background:`linear-gradient(135deg,${i},#1a3a7c)`,borderRadius:13,padding:"14px 20px",flex:1,minWidth:260},children:[e.jsx("div",{style:{width:50,height:50,borderRadius:11,background:h.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0},children:h.icon}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:5,flexWrap:"wrap"},children:[e.jsx("span",{style:{background:h.light,color:h.text,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:700},children:R.type}),R.day&&e.jsxs("span",{style:{background:`${u}22`,color:u,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:700},children:["📅 ",R.day," ",R.month]})]}),e.jsx("h3",{style:{margin:0,fontSize:17,fontWeight:800,color:"#fff"},children:R.title}),e.jsxs("p",{style:{margin:"3px 0 0",fontSize:12.5,color:"rgba(255,255,255,.55)"},children:["📍 ",R.location||"College Campus"]})]})]})]})})()}),e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{padding:"20px 24px",animationDelay:".1s"},children:[e.jsx("div",{style:{display:"flex",gap:3,marginBottom:16,background:"#f4f7fa",borderRadius:11,padding:3,width:"fit-content"},children:[{id:"upcoming",label:"🔜 Upcoming",count:g.length},{id:"all",label:"📆 All",count:t.length},{id:"past",label:"📜 Past",count:a.length}].map(h=>e.jsxs("button",{className:"evt-fb",onClick:()=>x(h.id),style:{padding:"8px 18px",borderRadius:9,background:l===h.id?i:"transparent",color:l===h.id?"#fff":"#718096",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:7},children:[h.label,e.jsx("span",{style:{background:l===h.id?u:"#e2e8f0",color:l===h.id?i:"#718096",borderRadius:20,padding:"1px 8px",fontSize:11.5,fontWeight:800},children:h.count})]},h.id))}),e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:12},children:[e.jsxs("div",{style:{flex:1,minWidth:200,position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",opacity:.4,fontSize:16,pointerEvents:"none"},children:"🔍"}),e.jsx("input",{value:S,onChange:h=>W(h.target.value),placeholder:"Event search karo...",style:{width:"100%",padding:"10px 14px 10px 38px",border:"2px solid #e2e8f0",borderRadius:10,fontSize:14,fontFamily:"inherit",background:"#f8fafc",outline:"none",boxSizing:"border-box",transition:"border-color .2s"},onFocus:h=>h.target.style.borderColor=u,onBlur:h=>h.target.style.borderColor="#e2e8f0"})]}),e.jsxs("span",{style:{background:"#f0f4ff",color:i,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800},children:[c.length," events"]})]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"TYPE:"}),nt.map(h=>{const I=V[h]||{light:"#f4f7fa",text:"#4a5568",border:"#e2e8f0"};return e.jsxs("button",{className:"evt-fb",onClick:()=>v(h),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${m===h&&I.border||"#e2e8f0"}`,background:m===h?I.light:"transparent",color:m===h?I.text:"#718096",fontWeight:700,fontSize:12},children:[h!=="All"&&(V[h]?.icon||"")+" ",h]},h)})]}),e.jsxs("div",{style:{display:"flex",gap:14,flexWrap:"wrap",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"YEAR:"}),n.map(h=>e.jsx("button",{className:"evt-fb",onClick:()=>y(String(h)),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${r===String(h)?u:"#e2e8f0"}`,background:r===String(h)?u:"transparent",color:r===String(h)?i:"#718096",fontWeight:700,fontSize:12},children:h},h))]}),e.jsxs("div",{style:{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"MONTH:"}),["All",...it].map(h=>e.jsx("button",{className:"evt-fb",onClick:()=>N(h),style:{padding:"3px 9px",borderRadius:6,border:`1.5px solid ${f===h?i:"#e2e8f0"}`,background:f===h?i:"transparent",color:f===h?"#fff":"#718096",fontWeight:600,fontSize:11.5},children:h},h))]}),(m!=="All"||r!=="All"||f!=="All"||S)&&e.jsx("button",{className:"evt-fb",onClick:()=>{v("All"),y("All"),N("All"),W("")},style:{padding:"4px 12px",borderRadius:20,border:"2px solid #FEB2B2",background:"#FFF5F5",color:"#e53e3e",fontWeight:700,fontSize:12},children:"✕ Clear"})]})]}),e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:".2s"},children:[e.jsxs("h2",{className:"section-heading",children:["📅 Events (",c.length,")"]}),e.jsx("div",{className:"heading-underline"}),p?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[e.jsx("div",{style:{width:40,height:40,border:`4px solid ${u}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"Events load ho rahe hain..."})]}):c.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"50px 20px"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"🎭"}),e.jsx("h3",{style:{color:i,fontWeight:800,margin:"0 0 6px"},children:"Koi event nahi mila"}),e.jsx("p",{style:{color:"#718096",fontSize:13.5},children:"Tab ya filter change karo"})]}):Object.entries(k).map(([h,I])=>e.jsxs("div",{style:{marginBottom:32},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:18},children:[e.jsxs("div",{style:{background:`linear-gradient(135deg,${i},#1a3a7c)`,color:u,borderRadius:9,padding:"6px 18px",fontWeight:900,fontSize:13.5,whiteSpace:"nowrap",boxShadow:`0 4px 14px ${i}22`},children:["📅 ",h]}),e.jsx("div",{style:{flex:1,height:2,background:`linear-gradient(90deg,${u}44,transparent)`}}),e.jsxs("span",{style:{fontSize:11.5,color:"#a0aec0",fontWeight:700},children:[I.length," event",I.length>1?"s":""]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18},children:I.map(z=>{const C=V[z.type]||{icon:"🏆",grad:`linear-gradient(135deg,${i},#1a3a7c)`,light:"#EBF0FF",text:"#1a365d"},E=z.status==="upcoming",A=b===z.id,D=(z.desc||"").replace(/<[^>]*>/g,"");return e.jsxs("div",{className:`evt-card${E?" evt-upcoming":""}`,style:{background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:E?"0 8px 28px rgba(11,31,78,.1)":"0 4px 16px rgba(11,31,78,.06)",border:E?`2px solid ${u}`:"1px solid #edf2f7",position:"relative"},children:[z.imageUrl?e.jsxs("div",{style:{height:190,position:"relative",overflow:"hidden"},children:[e.jsx("img",{src:z.imageUrl,alt:z.title,className:"evt-img",style:{width:"100%",height:"100%",objectFit:"cover"},onError:T=>{T.target.parentElement.style.background=C.grad,T.target.style.display="none"}}),e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 50%,rgba(11,31,78,.75))"}}),e.jsxs("div",{style:{position:"absolute",top:12,left:12,background:"rgba(255,255,255,.92)",borderRadius:9,padding:"6px 10px",textAlign:"center",backdropFilter:"blur(4px)",minWidth:44},children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,color:"#718096",textTransform:"uppercase"},children:z.month}),e.jsx("div",{style:{fontSize:20,fontWeight:900,color:i,lineHeight:1},children:z.day||"?"})]}),e.jsxs("span",{style:{position:"absolute",top:12,right:12,background:C.light,color:C.text,padding:"4px 12px",borderRadius:20,fontSize:11.5,fontWeight:700},children:[C.icon," ",z.type]})]}):e.jsx("div",{style:{background:C.grad,padding:"20px 18px 16px"},children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{style:{background:"rgba(255,255,255,.22)",borderRadius:9,padding:"7px 10px",textAlign:"center",backdropFilter:"blur(4px)",minWidth:44},children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,color:"rgba(255,255,255,.7)",textTransform:"uppercase"},children:z.month||"?"}),e.jsx("div",{style:{fontSize:22,fontWeight:900,color:"#fff",lineHeight:1},children:z.day||"?"})]}),e.jsxs("span",{style:{background:"rgba(255,255,255,.22)",color:"#fff",padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:700,backdropFilter:"blur(4px)"},children:[C.icon," ",z.type]})]})}),E&&e.jsx("div",{style:{background:"linear-gradient(135deg,#f6ad55,#ed8936)",color:"#fff",textAlign:"center",padding:"3px 0",fontSize:10.5,fontWeight:900,letterSpacing:.8},children:"🔜 UPCOMING EVENT"}),e.jsxs("div",{style:{padding:"16px 18px 18px"},children:[e.jsx("h3",{style:{margin:"0 0 6px",fontSize:15.5,fontWeight:800,color:i,lineHeight:1.35},children:z.title}),e.jsxs("p",{style:{margin:"0 0 10px",fontSize:12.5,color:"#718096",display:"flex",alignItems:"center",gap:5},children:[e.jsx("span",{children:"📍"})," ",z.location||"College Campus"]}),D&&e.jsxs(e.Fragment,{children:[e.jsx("p",{style:{margin:0,fontSize:13,color:"#4a5568",lineHeight:1.65},children:A?D:D.substring(0,100)+(D.length>100?"…":"")}),D.length>100&&e.jsx("button",{onClick:()=>w(A?null:z.id),style:{background:"none",border:"none",color:u,fontWeight:800,fontSize:12.5,cursor:"pointer",padding:"6px 0 0",fontFamily:"inherit"},children:A?"▲ Less":"▼ Read More"})]}),z.reportLink&&e.jsx("a",{href:z.reportLink,target:"_blank",rel:"noreferrer",className:"download-btn",style:{marginTop:12,display:"inline-flex",alignItems:"center",gap:6},children:"📄 PDF Report"})]})]},z.id)})})]},h))]})]}),e.jsx(rt,{navy:i,gold:u,upcoming:g,past:a})]})}),e.jsx("style",{children:`
        .download-btn { display:inline-block; background:#f8fafc; color:${i}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .download-btn:hover { background:${i}; color:#fff; border-color:${i}; }
      `})]})}const st=s.lazy(()=>ce(()=>import("./AdminPanel-BaVM4eCd.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]))),lt=s.lazy(()=>ce(()=>import("./Ticker-CJvHPJXa.js"),__vite__mapDeps([24,1,18,19,14,15,20,21,22,23,16,17,5,6,7,8,9,10,11,12,13]))),de=["/syllabus","/about-us","/about-us/vision-mission","/about-us/principal-message","/about-us/college-management/organogram","/about-us/college-management/presidents","/about-us/college-management/secretaries","/about-us/college-management/principal","/about-us/various-committees/womens-cell","/about-us/various-committees/anti-ragging","/about-us/various-committees/sc-st","/about-us/various-committees/obc","/about-us/various-committees/grievance","/about-us/various-committees/icc","/about-us/various-committees/minority","/about-us/various-committees/placement","/about-us/various-committees/rusa","/about-us/college-staff/teaching-staff","/about-us/college-staff/non-teaching-staff","/about-us/regulations/bbmku/special-ug-regulation","/about-us/regulations/bbmku/ug-regulation-fyugp","/about-us/regulations/bbmku/ug-regulation-cbcs","/about-us/regulations/college-affiliation","/about-us/regulations/ugc-section","/about-us/regulations/vbu/ug-regulation-2015","/about-us/regulations/vbu/bca-regulation","/about-us/regulations/byelaws","/about-us/regulations/exemption","/about-us/audit-report","/campus/visuals/bhuda","/campus/visuals/bank-more","/campus/visuals/vocational-building","/campus/infrastructure","/campus/classroom","/campus/ict-rooms","/campus/green-campus","/academics/iqac","/academics/course-offered","/academics/departments/humanities","/academics/departments/social-science","/academics/departments/commerce","/academics/departments/bca","/academics/departments/bba","/academics/academic-calendar","/admission/rule","/admission/document-required","/admission/fee-structure","/admission/notification/latest","/admission/notification/upcoming","/admission/intake-capacity","/activity/nss","/activity/ncc","/activity/workshop","/activity/games-sports","/activity/collaboration/rotaract-club","/activity/collaboration/sadbhavana-diwas","/naac/ssr-1st-cycle/cycle-1-documents","/naac/ssr-1st-cycle/peer-team-report","/naac/ssr-2nd-cycle/cycle-2-documents","/naac/ssr-2nd-cycle/executive-summary","/naac/aqar","/naac/nirf","/naac/perspective-plan","/publication/college-library","/publication/e-magazine","/publication/examination-results/2024","/publication/examination-results/2023","/publication/sss-report/2023-24","/publication/sss-report/2022-23","/gallery"],dt=({pages:t})=>{const{slug:d}=ve(),[p,j]=s.useState(null);return s.useEffect(()=>{if(t&&d){const l=t.find(x=>x.slug===d);j(l)}},[d,t]),!t||t.length===0?e.jsx("div",{style:{padding:"40px 20px",textAlign:"center"},children:"Loading pages..."}):e.jsx(xe,{page:p})},ct=()=>e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",background:"#0f2347",color:"#fff",fontFamily:"monospace"},children:"Initializing Secure Admin Panel..."}),pt=({notices:t,announcements:d,events:p,gallery:j,pdfReports:l,pages:x,sliderSlides:m,placeholderPaths:v,navLinks:r})=>{const[y,f]=s.useState(()=>localStorage.getItem("isGncAdmin")==="true");return y?e.jsx(s.Suspense,{fallback:e.jsx(ct,{}),children:e.jsx(st,{notices:t,announcements:d,events:p,gallery:j,pdfReports:l,pages:x,sliderSlides:m,placeholderPaths:v,navLinks:r,onClose:()=>{f(!1),localStorage.removeItem("isGncAdmin"),window.close()}})}):e.jsx(Ge,{onSuccess:()=>{f(!0),localStorage.setItem("isGncAdmin","true")},onClose:()=>window.close()})},xt=t=>t&&new DOMParser().parseFromString(t,"text/html").body.textContent||"";function ft(){const[t,d]=s.useState([]),[p,j]=s.useState([]),[l,x]=s.useState([]),[m,v]=s.useState([]),[r,y]=s.useState([]),[f,N]=s.useState([]),[S,W]=s.useState([]),[b,w]=s.useState(null),i=ae(),[u,g]=s.useState(!0),[a,n]=s.useState(window.innerWidth<768),c=i.pathname.startsWith("/admin");s.useEffect(()=>{const C=()=>n(window.innerWidth<768);return window.addEventListener("resize",C),()=>window.removeEventListener("resize",C)},[]),s.useEffect(()=>{const C=setTimeout(()=>g(!1),2e3);return()=>clearTimeout(C)},[]),s.useEffect(()=>{ke.init({duration:800,easing:"ease-in-out",once:!1,mirror:!0,offset:50})},[]),s.useEffect(()=>{const C=M(ye(L,"settings","navbar"),E=>{E.exists()&&E.data().links?.length>0?w(E.data().links):w(re)});return()=>C()},[]);const k=b||re,R=s.useMemo(()=>{const C=f.filter(A=>A.slug&&(!A.path||A.path==="")).sort((A,D)=>(D.createdAt?.toMillis()||0)-(A.createdAt?.toMillis()||0)).map(A=>({label:A.title,href:`/p/${A.slug}`})),E=JSON.parse(JSON.stringify(k));if(C.length>0){let A=E.find(D=>D.label.toLowerCase()==="more");A||(A={label:"More",href:"#",sub:[]},E.push(A)),A.sub||(A.sub=[]),C.forEach(D=>{A.sub.some(T=>T.href===D.href)||A.sub.push(D)})}return E},[f,k]),h=s.useMemo(()=>{const C=new Map;return[...f].sort((E,A)=>(A.createdAt?.toMillis()||0)-(E.createdAt?.toMillis()||0)).forEach(E=>{E.path&&!C.has(E.path)&&C.set(E.path,E)}),C},[f]);s.useEffect(()=>{const E=[["notices",d],["announcements",j],["events",x],["gallery",v],["pdfReports",y],["pages",N]].map(([D,T])=>{const $=P(H(L,D),Y("createdAt","desc"));return M($,J=>T(J.docs.map(ie=>({id:ie.id,...ie.data()}))))});let A;try{const D=P(H(L,"sliderSlides"),Y("order","asc"));A=M(D,T=>W(T.docs.map($=>({id:$.id,...$.data()}))),()=>{const T=P(H(L,"sliderSlides"),Y("createdAt","asc"));A=M(T,$=>W($.docs.map(J=>({id:J.id,...J.data()}))))})}catch{const D=P(H(L,"sliderSlides"),Y("createdAt","asc"));A=M(D,T=>W(T.docs.map($=>({id:$.id,...$.data()}))))}return()=>{E.forEach(D=>D()),A&&A()}},[]);const I=()=>window.open("#/admin","_blank"),z=[...t.slice(0,3),...p.slice(0,2)].map(C=>({...C,text:xt(C.text||C.title)}));return e.jsxs(e.Fragment,{children:[e.jsx(Se,{position:"top-right",gutter:12,containerStyle:{top:20,right:20,zIndex:999999},toastOptions:{style:{background:"rgba(15,35,71,0.85)",backdropFilter:"blur(12px)",color:"#fff",border:"1px solid rgba(255,255,255,0.15)",boxShadow:"0 8px 32px rgba(0,0,0,0.3)",padding:"16px",borderRadius:"14px",fontSize:"15px",fontWeight:"600"},success:{icon:"✅",duration:3e3},error:{icon:"❌",duration:4e3}}}),e.jsxs("div",{className:`splash-screen ${u?"":"hide"}`,children:[e.jsx("img",{src:"/gncollege-website/images/logo.png",alt:"Guru Nanak College",className:"splash-logo"}),e.jsx("div",{className:"splash-text",children:"Loading Portal..."})]}),!c&&e.jsxs(e.Fragment,{children:[e.jsx(Ye,{}),e.jsx(s.Suspense,{fallback:e.jsx("div",{style:{height:"37px"}}),children:e.jsx(lt,{items:z})}),e.jsx(He,{onAdminClick:I,navLinks:R}),e.jsx(Ue,{}),!a&&e.jsx(_e,{})]}),e.jsx("div",{className:c?"":"page-transition",children:e.jsxs(je,{location:i,children:[e.jsx(B,{path:"/",element:e.jsx(Pe,{notices:t,announcements:p,pdfReports:r,sliderSlides:S,events:l,gallery:m})}),e.jsx(B,{path:"/contact",element:e.jsx(qe,{})}),e.jsx(B,{path:"/about-us/college-profile",element:e.jsx(Ke,{})}),e.jsx(B,{path:"/notifications",element:e.jsx(Ze,{})}),e.jsx(B,{path:"/documents",element:e.jsx(at,{})}),e.jsx(B,{path:"/events",element:e.jsx(ot,{})}),e.jsx(B,{path:"/news",element:e.jsx(Ie,{})}),e.jsx(B,{path:"/admin",element:e.jsx(pt,{notices:t,announcements:p,events:l,gallery:m,pdfReports:r,pages:f,sliderSlides:S,placeholderPaths:de,navLinks:k})}),e.jsx(B,{path:"/p/:slug",element:e.jsx(dt,{pages:f})}),de.map(C=>{const E=h.get(C);return e.jsx(B,{path:C,element:e.jsx(xe,{page:E})},C)})]})},i.pathname),!c&&e.jsxs(e.Fragment,{children:[e.jsx(Oe,{}),e.jsx("button",{onClick:I,style:{position:"fixed",bottom:25,right:25,background:o.navy,color:"#fff",border:`3px solid ${o.gold}`,borderRadius:"50%",width:60,height:60,cursor:"pointer",zIndex:500},children:e.jsx("span",{style:{fontSize:18},children:"⚙️"})})]})]})}function ht(){const t=ae();return s.useEffect(()=>{"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.scrollTo(0,0)},[]),s.useEffect(()=>{const d=t.hash;if(d){const p=d.replace("#",""),j=document.getElementById(p);j&&j.scrollIntoView({behavior:"smooth"})}else window.scrollTo(0,0)},[t]),e.jsx(ft,{})}ge.createRoot(document.getElementById("root")).render(e.jsx(fe.StrictMode,{children:e.jsx(we,{children:e.jsx(ht,{})})}));export{o as C,ce as _,L as d};
