const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPanel-CE3EMdYZ.js","assets/react-B9mKIQH5.js","assets/jodit-react-CQyzVq-v.js","assets/jodit-CDy6uk5e.js","assets/jodit-BcTNBwNW.css","assets/dompurify-J9PU_gBl.js","assets/html-react-parser-BjJRHc4P.js","assets/html-dom-parser-C9V9aTyI.js","assets/domhandler-C7h-c356.js","assets/domelementtype-CqltyNbl.js","assets/react-property-DkBHvQjb.js","assets/style-to-js-3xM98LKa.js","assets/style-to-object-Cg2xzs12.js","assets/inline-style-parser-BlqBsVO4.js","assets/@firebase-DY7AIbDj.js","assets/idb-BXWtuYvb.js","assets/react-hot-toast-Dhq_btiz.js","assets/goober-wofAfydu.js","assets/react-dom-D2vEXsJU.js","assets/scheduler-CWG1rEj-.js","assets/react-router-D5LUbJ5D.js","assets/firebase-K7cEw6OV.js","assets/aos-B-Mw6r96.js","assets/aos-DvB2Xm2x.css","assets/Ticker-DvRvKRZR.js"])))=>i.map(i=>d[i]);
import{a as o,j as e,R as je}from"./react-B9mKIQH5.js";import{r as we,R as ke}from"./react-dom-D2vEXsJU.js";import{L as T,u as se,R as Se,a as B,b as Ne,H as ze}from"./react-router-D5LUbJ5D.js";import{i as Ce,g as Ae,a as Re,q as P,o as G,c as O,b as M,d as he,w as We}from"./@firebase-DY7AIbDj.js";import"./firebase-K7cEw6OV.js";import{A as Ie}from"./aos-B-Mw6r96.js";import{F as Te}from"./react-hot-toast-Dhq_btiz.js";import{p as De}from"./dompurify-J9PU_gBl.js";import{p as Ee}from"./html-react-parser-BjJRHc4P.js";import"./scheduler-CWG1rEj-.js";import"./idb-BXWtuYvb.js";import"./goober-wofAfydu.js";import"./html-dom-parser-C9V9aTyI.js";import"./domhandler-C7h-c356.js";import"./domelementtype-CqltyNbl.js";import"./react-property-DkBHvQjb.js";import"./style-to-js-3xM98LKa.js";import"./style-to-object-Cg2xzs12.js";import"./inline-style-parser-BlqBsVO4.js";(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))w(c);new MutationObserver(c=>{for(const y of c)if(y.type==="childList")for(const b of y.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&w(b)}).observe(document,{childList:!0,subtree:!0});function g(c){const y={};return c.integrity&&(y.integrity=c.integrity),c.referrerPolicy&&(y.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?y.credentials="include":c.crossOrigin==="anonymous"?y.credentials="omit":y.credentials="same-origin",y}function w(c){if(c.ep)return;c.ep=!0;const y=g(c);fetch(c.href,y)}})();const Fe="modulepreload",Be=function(t){return"/gncollege-website/"+t},le={},me=function(d,g,w){let c=Promise.resolve();if(g&&g.length>0){let a=function(x){return Promise.all(x.map(f=>Promise.resolve(f).then(S=>({status:"fulfilled",value:S}),S=>({status:"rejected",reason:S}))))};document.getElementsByTagName("link");const b=document.querySelector("meta[property=csp-nonce]"),j=b?.nonce||b?.getAttribute("nonce");c=a(g.map(x=>{if(x=Be(x),x in le)return;le[x]=!0;const f=x.endsWith(".css"),S=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${S}`))return;const v=document.createElement("link");if(v.rel=f?"stylesheet":Fe,f||(v.as="script"),v.crossOrigin="",v.href=x,j&&v.setAttribute("nonce",j),document.head.appendChild(v),f)return new Promise((z,m)=>{v.addEventListener("load",z),v.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${x}`)))})}))}function y(b){const j=new Event("vite:preloadError",{cancelable:!0});if(j.payload=b,window.dispatchEvent(j),!j.defaultPrevented)throw b}return c.then(b=>{for(const j of b||[])j.status==="rejected"&&y(j.reason);return d().catch(y)})},s={navy:"#1a3a6b",navyDark:"#0f2347",gold:"#f4a023",red:"#c0392b"};function de({faculties:t,staffType:d}){const[g,w]=o.useState(""),[c,y]=o.useState("All");o.useEffect(()=>{window.scrollTo(0,0)},[d]);const b=o.useMemo(()=>(t||[]).filter(a=>!((a.staffType||"Teaching")!==d||c!=="All"&&a.dept!==c||g&&!a.name.toLowerCase().includes(g.toLowerCase()))),[t,d,c,g]),j=o.useMemo(()=>{const a=new Set((t||[]).filter(x=>(x.staffType||"Teaching")===d).map(x=>x.dept));return["All",...Array.from(a).sort()]},[t,d]);return e.jsxs("div",{style:{minHeight:"100vh",background:"#f8fafc",paddingBottom:"80px"},children:[e.jsxs("header",{style:{background:`linear-gradient(135deg, ${s.navy} 0%, #1a365d 100%)`,padding:"80px 20px 60px",textAlign:"center",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundImage:"radial-gradient(#ffffff 1px, transparent 1px)",backgroundSize:"30px 30px",opacity:.05}}),e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:2},children:[e.jsxs("nav",{style:{display:"flex",justifyContent:"center",gap:"10px",fontSize:"13px",color:"#cbd5e1",fontWeight:600,marginBottom:"20px"},children:[e.jsx(T,{to:"/",style:{color:"#cbd5e1",textDecoration:"none"},children:"Home"}),e.jsx("span",{children:"›"}),e.jsx("span",{children:"About Us"}),e.jsx("span",{children:"›"}),e.jsxs("span",{style:{color:s.gold},children:[d," Staff"]})]}),e.jsxs("h1",{style:{color:"#fff",fontSize:"42px",fontWeight:900,margin:"0 0 15px"},children:[d," Staff Directory"]}),e.jsxs("p",{style:{color:"#94a3b8",fontSize:"16px",maxWidth:"600px",margin:"0 auto"},children:["Meet our dedicated and highly qualified ",d.toLowerCase()," members who shape the future of Guru Nanak College."]})]})]}),e.jsx("div",{style:{maxWidth:1300,margin:"-30px auto 40px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsxs("div",{style:{background:"#fff",padding:"20px",borderRadius:"16px",boxShadow:"0 10px 30px rgba(15,35,71,0.08)",display:"flex",flexWrap:"wrap",gap:"20px",alignItems:"center",border:"1px solid #e2e8f0"},children:[e.jsxs("div",{style:{flex:1,minWidth:"250px",position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:15,top:"50%",transform:"translateY(-50%)",opacity:.5},children:"🔍"}),e.jsx("input",{type:"text",placeholder:`Search ${d.toLowerCase()} by name...`,value:g,onChange:a=>w(a.target.value),style:{width:"100%",padding:"12px 15px 12px 40px",borderRadius:"10px",border:"2px solid #e2e8f0",outline:"none",fontSize:"14px",fontWeight:600,background:"#f8fafc",boxSizing:"border-box"}})]}),e.jsxs("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"12px",fontWeight:800,color:"#64748b",textTransform:"uppercase"},children:"Department:"}),j.map(a=>e.jsx("button",{onClick:()=>y(a),style:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:700,cursor:"pointer",transition:"all 0.2s",background:c===a?s.navy:"#f1f5f9",color:c===a?"#fff":"#475569",border:`1px solid ${c===a?s.navy:"#cbd5e1"}`},children:a},a))]})]})}),e.jsx("div",{style:{maxWidth:1300,margin:"0 auto",padding:"0 20px"},children:b.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px",background:"#fff",borderRadius:"16px",border:"1px dashed #cbd5e1"},children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"15px"},children:"👨‍🏫"}),e.jsx("h3",{style:{color:s.navy,margin:"0 0 10px"},children:"No Staff Found"}),e.jsx("p",{style:{color:"#64748b"},children:"Try adjusting your search or department filter."})]}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:"30px"},children:b.map(a=>e.jsxs("div",{style:{background:"#fff",borderRadius:"20px",overflow:"hidden",boxShadow:"0 10px 25px rgba(0,0,0,0.04)",border:"1px solid #edf2f7",transition:"transform 0.3s ease, box-shadow 0.3s ease",display:"flex",flexDirection:"column"},onMouseOver:x=>{x.currentTarget.style.transform="translateY(-8px)",x.currentTarget.style.boxShadow="0 20px 40px rgba(15,35,71,0.1)",x.currentTarget.style.borderColor=s.gold},onMouseOut:x=>{x.currentTarget.style.transform="translateY(0)",x.currentTarget.style.boxShadow="0 10px 25px rgba(0,0,0,0.04)",x.currentTarget.style.borderColor="#edf2f7"},children:[e.jsxs("div",{style:{padding:"25px 20px 0",textAlign:"center",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",top:15,right:15,background:"#f0fdf4",color:"#166534",fontSize:"10px",fontWeight:800,padding:"4px 10px",borderRadius:"50px",border:"1px solid #bbf7d0"},children:a.dept}),e.jsx("img",{src:a.imageUrl||"/images/college_photo.jpg",alt:a.name,style:{width:"120px",height:"120px",borderRadius:"50%",objectFit:"cover",border:"4px solid #fff",boxShadow:"0 10px 20px rgba(0,0,0,0.1)",margin:"0 auto"}})]}),e.jsxs("div",{style:{padding:"20px",textAlign:"center",flex:1,display:"flex",flexDirection:"column"},children:[e.jsx("h3",{style:{fontSize:"18px",fontWeight:900,color:s.navy,margin:"0 0 5px"},children:a.name}),e.jsx("div",{style:{fontSize:"13px",color:s.gold,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"15px"},children:a.desig}),e.jsxs("div",{style:{marginTop:"auto",background:"#f8fafc",padding:"12px",borderRadius:"12px",border:"1px solid #e2e8f0"},children:[e.jsx("div",{style:{fontSize:"11px",color:"#64748b",fontWeight:700,textTransform:"uppercase",marginBottom:"4px"},children:"Qualification"}),e.jsx("div",{style:{fontSize:"13px",color:s.navy,fontWeight:600},children:a.qual})]})]})]},a.id))})})]})}const Me={apiKey:"AIzaSyDeJWUUoU_MJ4ubpbfaLZemvnEr82LF5YA",authDomain:"gnc-college-web.firebaseapp.com",projectId:"gnc-college-web",storageBucket:"gnc-college-web.firebasestorage.app",messagingSenderId:"78901559372",appId:"1:78901559372:web:f76cb101f8aec2daadb4e9"},ue=Ce(Me),L=Ae(ue);Re(ue);const Q=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Le=["All","News","Achievement","Update","Result","Scholarship"],J={News:{bg:"#EBF0FF",text:"#1a365d",border:"#BED0FF",dot:"#4a7fd4"},Achievement:{bg:"#F0FFF4",text:"#1c4532",border:"#9AE6B4",dot:"#38a169"},Update:{bg:"#FFFBEB",text:"#744210",border:"#FAF089",dot:"#d69e2e"},Result:{bg:"#FFF5F5",text:"#742a2a",border:"#FEB2B2",dot:"#e53e3e"},Scholarship:{bg:"#FAF5FF",text:"#44337a",border:"#E9D8FD",dot:"#805ad5"}},X=t=>t?.toDate?t.toDate():new Date(t||Date.now()),$e=t=>{const d=X(t);return`${d.getDate()} ${Q[d.getMonth()]} ${d.getFullYear()}`};function Pe(){const[t,d]=o.useState([]),[g,w]=o.useState(!0),[c,y]=o.useState("All"),[b,j]=o.useState("All"),[a,x]=o.useState("All"),[f,S]=o.useState(""),[v,z]=o.useState("list"),m=s.navy,k=s.gold;o.useEffect(()=>{window.scrollTo(0,0);const l=P(O(L,"announcements"),G("createdAt","desc"));return M(l,n=>{d(n.docs.map(u=>({id:u.id,...u.data()}))),w(!1)})},[]);const r=o.useMemo(()=>{const l=new Set(t.map(n=>X(n.createdAt).getFullYear()));return["All",...Array.from(l).sort((n,u)=>u-n)]},[t]),i=o.useMemo(()=>t.filter(l=>{const n=X(l.createdAt);return!(c!=="All"&&n.getFullYear()!==Number(c)||b!=="All"&&Q[n.getMonth()]!==b||a!=="All"&&(l.type||"News")!==a||f&&!l.text?.toLowerCase().includes(f.toLowerCase()))}),[t,c,b,a,f]),p=o.useMemo(()=>{const l={};return i.forEach(n=>{const u=X(n.createdAt),N=`${Q[u.getMonth()]} ${u.getFullYear()}`;l[N]||(l[N]=[]),l[N].push(n)}),l},[i]);return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:.35; } }
        .ntf-fb { border: none; font-family: inherit; cursor: pointer; transition: all .15s; }
        .ntf-row-hover { transition: all .15s; }
        .ntf-row-hover:hover { background: #f8fafc !important; transform: translateX(4px); }
        .ntf-card-hover { transition: all .2s; }
        .ntf-card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(11,31,78,.12) !important; }
      `}),e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"📣 News & Updates"}),e.jsx("p",{className:"hero-subtitle",children:"College ke latest achievements, academic news aur recent updates yahan dekhein"})]})]}),e.jsx("div",{style:{maxWidth:"1000px",margin:"-80px auto 40px",padding:"20px",position:"relative",zIndex:10,background:"rgba(255,255,255,0.8)",backdropFilter:"blur(10px)",borderRadius:"16px",boxShadow:"0 10px 30px rgba(0,0,0,0.1)"},children:e.jsx("div",{style:{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"},children:[{val:t.length,label:"Total News"},{val:t.filter(l=>l.type==="Achievement").length,label:"Achievements"},{val:t.filter(l=>l.type==="Result").length,label:"Results"},{val:r.length-1,label:"Active Years"}].map((l,n)=>e.jsxs("div",{style:{background:"#fff",border:"1px solid #e2e8f0",borderRadius:11,padding:"10px 20px",textAlign:"center",flex:1,minWidth:"150px"},children:[e.jsx("div",{style:{fontSize:24,fontWeight:900,color:k,lineHeight:1},children:l.val}),e.jsx("div",{style:{fontSize:11,color:"#64748b",marginTop:3,fontWeight:600},children:l.label})]},n))})}),e.jsx("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"0 20px"},children:e.jsxs("main",{children:[e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",animationDelay:".1s"},children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:16},children:[e.jsxs("div",{style:{flex:1,minWidth:200,position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",opacity:.4,fontSize:16,pointerEvents:"none"},children:"🔍"}),e.jsx("input",{value:f,onChange:l=>S(l.target.value),placeholder:"News search karo...",style:{width:"100%",padding:"10px 14px 10px 38px",border:"2px solid #e2e8f0",borderRadius:10,fontSize:14,fontFamily:"inherit",background:"#f8fafc",outline:"none",boxSizing:"border-box",transition:"border-color .2s"},onFocus:l=>l.target.style.borderColor=k,onBlur:l=>l.target.style.borderColor="#e2e8f0"})]}),e.jsxs("div",{style:{display:"flex",gap:7},children:[["list","card"].map(l=>e.jsx("button",{className:"ntf-fb",onClick:()=>z(l),style:{padding:"9px 16px",borderRadius:9,border:`2px solid ${v===l?m:"#e2e8f0"}`,background:v===l?m:"transparent",color:v===l?"#fff":"#718096",fontWeight:700,fontSize:12.5},children:l==="list"?"☰ List":"⊞ Cards"},l)),e.jsx("span",{style:{background:"#f0f4ff",color:m,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800,alignSelf:"center"},children:i.length})]})]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"YEAR:"}),r.map(l=>e.jsx("button",{className:"ntf-fb",onClick:()=>y(String(l)),style:{padding:"4px 14px",borderRadius:20,border:`2px solid ${c===String(l)?k:"#e2e8f0"}`,background:c===String(l)?k:"transparent",color:c===String(l)?m:"#718096",fontWeight:700,fontSize:12.5},children:l},l))]}),e.jsxs("div",{style:{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"MONTH:"}),["All",...Q].map(l=>e.jsx("button",{className:"ntf-fb",onClick:()=>j(l),style:{padding:"4px 10px",borderRadius:7,border:`1.5px solid ${b===l?m:"#e2e8f0"}`,background:b===l?m:"transparent",color:b===l?"#fff":"#718096",fontWeight:600,fontSize:12},children:l},l))]}),e.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"CATEGORY:"}),Le.map(l=>{const n=J[l]||{bg:"#f4f7fa",text:"#4a5568",border:"#e2e8f0"};return e.jsx("button",{className:"ntf-fb",onClick:()=>x(l),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${a===l?n.border:"#e2e8f0"}`,background:a===l?n.bg:"transparent",color:a===l?n.text:"#718096",fontWeight:700,fontSize:12},children:l},l)}),(c!=="All"||b!=="All"||a!=="All"||f)&&e.jsx("button",{className:"ntf-fb",onClick:()=>{y("All"),j("All"),x("All"),S("")},style:{padding:"4px 12px",borderRadius:20,border:"2px solid #FEB2B2",background:"#FFF5F5",color:"#e53e3e",fontWeight:700,fontSize:12},children:"✕ Clear"})]})]}),e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",marginTop:"30px",animationDelay:".2s"},children:[e.jsxs("h2",{className:"section-heading",children:["📰 Latest News (",i.length,")"]}),e.jsx("div",{className:"heading-underline"}),g?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[e.jsx("div",{style:{width:40,height:40,border:`4px solid ${k}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"News load ho rahi hain..."})]}):i.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"50px 20px"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"🔍"}),e.jsx("h3",{style:{color:m,fontWeight:800,margin:"0 0 6px"},children:"Koi news nahi mili"}),e.jsx("p",{style:{color:"#718096",fontSize:13.5},children:"Filter ya search change karo"})]}):v==="list"?Object.entries(p).map(([l,n])=>e.jsxs("div",{style:{marginBottom:28},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14},children:[e.jsxs("div",{style:{background:m,color:k,borderRadius:8,padding:"5px 16px",fontWeight:800,fontSize:12.5,whiteSpace:"nowrap",flexShrink:0},children:["📅 ",l]}),e.jsx("div",{style:{flex:1,height:1,background:`linear-gradient(90deg,${m}44,transparent)`}}),e.jsxs("span",{style:{fontSize:11.5,color:"#a0aec0",fontWeight:700,flexShrink:0},children:[n.length," update",n.length>1?"s":""]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:n.map(u=>{const N=X(u.createdAt),A=J[u.type]||J.News;return e.jsxs("div",{className:"ntf-row-hover",style:{background:"#fff",borderRadius:11,padding:"14px 18px",display:"flex",alignItems:"flex-start",gap:14,borderLeft:`4px solid ${A.dot}`,border:"1px solid #edf2f7",boxShadow:"0 2px 10px rgba(11,31,78,.04)"},children:[e.jsxs("div",{style:{textAlign:"center",minWidth:44,flexShrink:0},children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase"},children:Q[N.getMonth()]}),e.jsx("div",{style:{fontSize:22,fontWeight:900,color:m,lineHeight:1},children:N.getDate()}),e.jsx("div",{style:{fontSize:11,color:"#a0aec0"},children:N.getFullYear()})]}),e.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[e.jsx("div",{style:{display:"flex",gap:7,marginBottom:7,flexWrap:"wrap",alignItems:"center"},children:e.jsx("span",{style:{background:A.bg,color:A.text,border:`1px solid ${A.border}`,padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:700},children:u.type||"News"})}),e.jsx("div",{dangerouslySetInnerHTML:{__html:u.text},style:{fontSize:14.5,color:"#334155",fontWeight:500,lineHeight:1.65}}),u.link&&e.jsx("a",{href:u.link,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:5,marginTop:8,background:"#f8fafc",border:`1px solid ${m}22`,color:m,padding:"5px 12px",borderRadius:7,fontSize:12.5,fontWeight:700,textDecoration:"none"},children:"🔗 Read Full Article"})]})]},u.id)})})]},l)):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16,marginTop:4},children:i.map(l=>{X(l.createdAt);const n=J[l.type]||J.News;return e.jsxs("div",{className:"ntf-card-hover",style:{background:"#fff",borderRadius:13,overflow:"hidden",boxShadow:"0 4px 16px rgba(11,31,78,.07)",border:"1px solid #edf2f7",position:"relative"},children:[e.jsxs("div",{style:{background:`linear-gradient(135deg,${m},#1a3a7c)`,padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{background:n.bg,color:n.text,border:`1px solid ${n.border}`,padding:"3px 10px",borderRadius:20,fontSize:11.5,fontWeight:700},children:l.type||"News"}),e.jsxs("span",{style:{color:k,fontSize:11.5,fontWeight:700},children:["📅 ",$e(l.createdAt)]})]}),e.jsxs("div",{style:{padding:"15px 16px"},children:[e.jsx("div",{dangerouslySetInnerHTML:{__html:l.text},style:{fontSize:13.5,color:"#334155",lineHeight:1.7,marginBottom:12}}),l.link&&e.jsx("a",{href:l.link,target:"_blank",rel:"noreferrer",className:"download-btn",children:"🔗 Read More"})]})]},l.id)})})]})]})}),e.jsx("style",{children:`
        .download-btn { display:inline-block; background:#f8fafc; color:${m}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .download-btn:hover { background:${m}; color:#fff; border-color:${m}; }
      `})]})}const re=[{id:"facebook",label:"f",href:"https://facebook.com/"},{id:"twitter",label:"t",href:"https://twitter.com/"},{id:"youtube",label:"y",href:"https://youtube.com/"},{id:"linkedin",label:"in",href:"https://linkedin.com/"}],Oe=[{name:"Class Rooms",emoji:"🏫"},{name:"Computer Lab",emoji:"💻"},{name:"Library",emoji:"📚"},{name:"Seminar Hall",emoji:"🎤"},{name:"Auditorium",emoji:"🎭"},{name:"Playground",emoji:"⚽"},{name:"Badminton Court",emoji:"🏸"},{name:"Gymnasium",emoji:"🏋️"},{name:"Digital Classrooms",emoji:"📱"},{name:"Cultural Dept.",emoji:"🎵"},{name:"Washroom (B)",emoji:"🚿"},{name:"Washroom (G)",emoji:"🚿"},{name:"Water Purifier",emoji:"💧"},{name:"Canteen",emoji:"🍽️"},{name:"Girls Common Room",emoji:"👩"},{name:"Online Lecture",emoji:"📡"}],ce=[{label:"Home",href:"/"},{label:"About Us",href:"/",sub:[{label:"College Profile",href:"/about-us/college-profile"},{label:"Vision & Mission",href:"/about-us/vision-mission"},{label:"Principal Message",href:"/about-us/principal-message"},{label:"College Management",sub:[{label:"Organogram",href:"/about-us/college-management/organogram"},{label:"Presidents",href:"/about-us/college-management/presidents"},{label:"Secretaries",href:"/about-us/college-management/secretaries"},{label:"Principal",href:"/about-us/college-management/principal"}]},{label:"Various Committees",sub:[{label:"Women's Cell",href:"/about-us/various-committees/womens-cell"},{label:"Anti Ragging",href:"/about-us/various-committees/anti-ragging"},{label:"SC/ST",href:"/about-us/various-committees/sc-st"},{label:"OBC",href:"/about-us/various-committees/obc"},{label:"Grievance",href:"/about-us/various-committees/grievance"},{label:"ICC",href:"/about-us/various-committees/icc"},{label:"Minority",href:"/about-us/various-committees/minority"},{label:"Placement",href:"/about-us/various-committees/placement"},{label:"RUSA",href:"/about-us/various-committees/rusa"}]},{label:"College Staff",sub:[{label:"Teaching Staff",href:"/about-us/college-staff/teaching-staff"},{label:"Non-Teaching Staff",href:"/about-us/college-staff/non-teaching-staff"}]},{label:"Regulations",sub:[{label:"B.B.M.K. University Dhanbad",sub:[{label:"Special UG Regulation (CBCS) Session 2020-23",href:"/about-us/regulations/bbmku/special-ug-regulation"},{label:"UG Regulation (FYUGP)",href:"/about-us/regulations/bbmku/ug-regulation-fyugp"},{label:"UG Regulation (CBCS)",href:"/about-us/regulations/bbmku/ug-regulation-cbcs"}]},{label:"College Affiliation Paper B.B.M.K.U.",href:"/about-us/regulations/college-affiliation"},{label:"UGC Under Section 2(f) & 12(B)",href:"/about-us/regulations/ugc-section"},{label:"V.B.U. Hazaribag",sub:[{label:"UG Regulation 2015",href:"/about-us/regulations/vbu/ug-regulation-2015"},{label:"BCA Regulation",href:"/about-us/regulations/vbu/bca-regulation"}]},{label:"ByeLaws",href:"/about-us/regulations/byelaws"},{label:"Exemption",href:"/about-us/regulations/exemption"}]},{label:"Audit Report",href:"/about-us/audit-report"}]},{label:"Campus",href:"/",sub:[{label:"Campus Visuals",sub:[{label:"Bhuda",href:"/campus/visuals/bhuda"},{label:"Bank More",href:"/campus/visuals/bank-more"},{label:"Vocational Building",href:"/campus/visuals/vocational-building"}]},{label:"Infrastructure",href:"/campus/infrastructure"},{label:"Classroom",href:"/campus/classroom"},{label:"ICT Rooms",href:"/campus/ict-rooms"},{label:"Green Campus",href:"/campus/green-campus"}]},{label:"Academics",href:"/",sub:[{label:"IQAC",href:"/academics/iqac"},{label:"Course Offered",href:"/academics/course-offered"},{label:"Departments",sub:[{label:"Humanities",href:"/academics/departments/humanities"},{label:"Social Science",href:"/academics/departments/social-science"},{label:"Commerce",href:"/academics/departments/commerce"},{label:"BCA",href:"/academics/departments/bca"},{label:"BBA",href:"/academics/departments/bba"}]},{label:"Syllabus",href:"/syllabus"},{label:"Academic Calendar",href:"/academics/academic-calendar"}]},{label:"Admission",href:"/",sub:[{label:"Admission Rule",href:"/admission/rule"},{label:"Document Required",href:"/admission/document-required"},{label:"Fee Structure",href:"/admission/fee-structure"},{label:"Notification",sub:[{label:"Latest",href:"/admission/notification/latest"},{label:"Upcoming News",href:"/admission/notification/upcoming"}]},{label:"Intake Capacity",href:"/admission/intake-capacity"}]},{label:"Activity",href:"/",sub:[{label:"NSS",href:"/activity/nss"},{label:"NCC",href:"/activity/ncc"},{label:"Workshop",href:"/activity/workshop"},{label:"Game & Sports",href:"/activity/games-sports"},{label:"Collaboration",sub:[{label:"Rotaract Club",href:"/activity/collaboration/rotaract-club"},{label:"Sadbhavana Diwas",href:"/activity/collaboration/sadbhavana-diwas"}]}]},{label:"NAAC",href:"/",sub:[{label:"SSR 1st Cycle",sub:[{label:"Cycle 1 Documents",href:"/naac/ssr-1st-cycle/cycle-1-documents"},{label:"Peer Team Report",href:"/naac/ssr-1st-cycle/peer-team-report"}]},{label:"SSR 2nd Cycle",sub:[{label:"Cycle 2 Documents",href:"/naac/ssr-2nd-cycle/cycle-2-documents"},{label:"Executive Summary",href:"/naac/ssr-2nd-cycle/executive-summary"}]},{label:"AQAR",href:"/naac/aqar"},{label:"NIRF",href:"/naac/nirf"},{label:"Perspective Plan",href:"/naac/perspective-plan"}]},{label:"Publication",href:"/",sub:[{label:"College Library",href:"/publication/college-library"},{label:"E-Magazine",href:"/publication/e-magazine"},{label:"Examination Results",sub:[{label:"Result 2024",href:"/publication/examination-results/2024"},{label:"Result 2023",href:"/publication/examination-results/2023"}]},{label:"SSS Report",sub:[{label:"Report 2023-24",href:"/publication/sss-report/2023-24"},{label:"Report 2022-23",href:"/publication/sss-report/2022-23"}]}]},{label:"Gallery",href:"#gallery"},{label:"Contact Us",href:"/contact"}],Ye=({slides:t=[]})=>{const[d,g]=o.useState(0),w=[{id:"f1",image:"images/slider_baisakhi.jpg",title:"BAISAKHI DI SHAAM Celebration",subtitle:"Celebrating culture and traditions"},{id:"f2",image:"images/slider_cricket.jpg",title:"Inter College BBMKU Cricket Winners",subtitle:"Celebrating sportsmanship and victory"},{id:"f3",image:"images/slider_ncc.jpg",title:'NCC "At Home Function" Participants',subtitle:"Dedicated NCC Cadets & Commanders"},{id:"f4",image:"images/slider_youth_winners.jpg",title:"BBMKU Youth Festival Champions",subtitle:"Winners of BBMKU Inter College Youth Festival - अंतर्नाद"},{id:"f5",image:"images/slider_seminar.jpg",title:"ICSSR Multidisciplinary National Seminar",subtitle:"G20: A Global Platform for Economic Development"}],c=o.useMemo(()=>!t||t.length===0?w:[...t].sort((x,f)=>(Number(x.order)||0)-(Number(f.order)||0)),[t]),y=c.length;o.useEffect(()=>{if(y<=1)return;const x=setInterval(()=>{g(f=>f===y-1?0:f+1)},5e3);return()=>clearInterval(x)},[y]),o.useEffect(()=>{g(0)},[y]);const b=()=>g(x=>x===y-1?0:x+1),j=()=>g(x=>x===0?y-1:x-1),a=x=>x?x.startsWith("http://")||x.startsWith("https://")?x:`/gncollege-website/${x.startsWith("/")?x.slice(1):x}`:"";return e.jsxs("div",{className:"slider",children:[y>1&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"arrow prev",onClick:j,children:"❮"}),e.jsx("div",{className:"arrow next",onClick:b,children:"❯"})]}),e.jsx("div",{className:"slider-dots",children:c.map((x,f)=>e.jsx("div",{className:`dot ${d===f?"current":""}`,onClick:()=>g(f)},f))}),c.map((x,f)=>e.jsx("div",{className:f===d?"slide current":"slide",children:f===d&&e.jsxs(e.Fragment,{children:[e.jsx("img",{src:a(x.image),alt:x.title,loading:"lazy",decoding:"async",className:"image",onError:S=>{S.target.style.opacity="0.2"}}),e.jsxs("div",{className:"content",children:[e.jsx("h2",{children:x.title}),e.jsx("p",{children:x.subtitle}),e.jsx("hr",{})]})]})},x.id||f)),e.jsx("style",{children:`
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
      `})]})},He=({items:t})=>{if(!t||t.length===0)return null;const d=[...t,...t];return e.jsxs("div",{className:"ticker-wrapper",children:[e.jsx("style",{children:`
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
          background: ${s.gold};
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
        .ticker-item a:hover { color: ${s.gold}; }
        .ticker-item::before { content: '✦'; color: ${s.gold}; font-size: 10px; opacity: 0.7; }
        @keyframes scrollTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}),e.jsx("div",{className:"ticker-label",children:"Latest Updates"}),e.jsx("div",{className:"ticker-container",children:e.jsx("div",{className:"ticker-track",children:d.map((g,w)=>e.jsx("div",{className:"ticker-item",children:e.jsx("a",{href:g.link||"#",target:"_blank",rel:"noopener noreferrer",children:g.text})},w))})})]})},pe=({title:t,subtitle:d})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:32},children:[e.jsx("h2",{style:{fontSize:26,fontWeight:800,color:s.navy,marginBottom:6},children:t}),e.jsx("div",{style:{width:60,height:3,background:s.gold,margin:"0 auto 10px"}}),d&&e.jsx("p",{style:{color:"#666",fontSize:14},children:d})]});function Ge(){return e.jsxs("div",{style:{padding:"40px 16px",background:"#f8f9fa"},children:[e.jsxs("section",{style:{marginBottom:"100px",padding:"0 20px"},children:[e.jsx(pe,{title:"Our Academic Departments",subtitle:"Excellence in specialized education for future leaders"}),e.jsx("style",{children:`
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
      background: ${s.navyDark};
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
      background: ${s.gold};
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
  `}),e.jsx("div",{className:"dept-container",children:[{name:"B.C.A",icon:"💻",symbol:"展开",desc:"Bachelor of Computer Applications - Future of IT."},{name:"B.B.A",icon:"📈",symbol:"📊",desc:"Bachelor of Business Administration - Master the Market."},{name:"COMMERCE",icon:"💰",symbol:"📒",desc:"Expertise in Finance, Accounts, and Trade."},{name:"ARTS",icon:"🎨",symbol:"🎭",desc:"Exploring Humanity, Culture, and Social Science."}].map((t,d)=>e.jsxs("div",{className:"modern-dept-card","data-aos":"fade-up","data-aos-delay":d*100,children:[e.jsx("div",{className:"dept-bg-symbol",children:t.symbol}),e.jsxs("div",{className:"dept-content",children:[e.jsx("div",{className:"dept-icon-box",children:t.icon}),e.jsx("h3",{style:{color:"#fff",fontSize:"20px",fontWeight:"800",marginBottom:"8px"},children:t.name}),e.jsx("p",{style:{color:"rgba(255,255,255,0.8)",fontSize:"12.5px",lineHeight:"1.5",margin:0},children:t.desc}),e.jsxs("div",{style:{marginTop:"15px",color:s.gold,fontSize:"12px",fontWeight:"bold",display:"flex",alignItems:"center"},children:["EXPLORE PROGRAM ",e.jsx("span",{className:"explore-arrow",style:{marginLeft:"5px",display:"inline-block"},children:"→"})]})]})]},d))})]}),e.jsx("section",{style:{padding:"80px 20px",background:"#ffffff"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1250,margin:"0 auto"},children:[e.jsx(pe,{title:"College Facilities",subtitle:"World-class infrastructure to support your academic excellence"}),e.jsx("style",{children:`
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
        background: linear-gradient(135deg, ${s.gold}20, transparent);
        opacity: 0;
        transition: 0.4s;
      }
      .facility-card:hover {
        transform: translateY(-10px) scale(1.02);
        background: #fff;
        border-color: ${s.gold};
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
        color: ${s.navy};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        z-index: 2;
        transition: 0.3s;
      }
      .facility-card:hover .facility-text {
        color: ${s.gold};
      }

      /* Desktop par 8 items ek line me lane ki koshish */
      @media (min-width: 1200px) {
        .facility-container {
          grid-template-columns: repeat(8, 1fr);
        }
      }
    `}),e.jsx("div",{className:"facility-container",children:Oe.map((t,d)=>e.jsxs("div",{className:"facility-card","data-aos":"zoom-in","data-aos-delay":d*50,children:[e.jsx("div",{className:"facility-icon-wrap",children:t.emoji}),e.jsx("div",{className:"facility-text",children:t.name})]},d))})]})})]})}const te=({title:t,subtitle:d})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:40},children:[e.jsx("h2",{style:{fontSize:28,fontWeight:800,color:s.navy,marginBottom:8},children:t}),e.jsx("div",{style:{width:60,height:4,background:s.gold,margin:"0 auto 12px",borderRadius:2}}),d&&e.jsx("p",{style:{color:"#666",fontSize:15},children:d})]}),Ue=({notices:t,announcements:d,pdfReports:g,upcomingEvents:w})=>{const c=o.useRef(null),y=o.useRef(null),b=o.useRef(null),j=o.useRef(null),a=o.useRef(null),x=o.useRef(null),f=o.useMemo(()=>[...t||[],...t||[]],[t]),S=o.useMemo(()=>{const r=(w||[]).map(p=>({...p,text:p.title,date:p.createdAt?.toDate(),type:p.type||"Event"})),i=(d||[]).map(p=>({...p,date:p.createdAt?.toDate(),type:p.type||"News"}));return[...r,...i].sort((p,l)=>(l.date||0)-(p.date||0))},[w,d]),v=o.useMemo(()=>[...S,...S],[S]),z=o.useMemo(()=>{const r=(g||[]).map(i=>({...i,text:i.title,date:i.createdAt?.toDate(),type:"Document"}));return[...r,...r]},[g]),m=(r,i)=>{const p=r.current;if(!p)return;let l=0;const n=()=>{l-=.6,l<-p.scrollHeight/2&&(l=0),p.style.transform=`translateY(${l}px)`,i.current=requestAnimationFrame(n)};i.current=requestAnimationFrame(n)},k=r=>{r.current&&cancelAnimationFrame(r.current)};return o.useEffect(()=>{m(c,j);const r=c.current;return r&&(r.addEventListener("mouseenter",()=>k(j)),r.addEventListener("mouseleave",()=>m(c,j))),()=>k(j)},[f]),o.useEffect(()=>{m(y,a);const r=y.current;return r&&(r.addEventListener("mouseenter",()=>k(a)),r.addEventListener("mouseleave",()=>m(y,a))),()=>k(a)},[v]),o.useEffect(()=>{m(b,x);const r=b.current;return r&&(r.addEventListener("mouseenter",()=>k(x)),r.addEventListener("mouseleave",()=>m(b,x))),()=>k(x)},[z]),e.jsxs("section",{style:{padding:"90px 20px",background:"#f8fafc",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"300px",background:"linear-gradient(180deg, #f1f5f9 0%, rgba(248,250,252,0) 100%)",zIndex:0}}),e.jsxs("div",{style:{maxWidth:1350,margin:"0 auto",position:"relative",zIndex:1},children:[e.jsx(te,{title:"Notification & Announcements",subtitle:"Stay informed with the latest official updates and campus news"}),e.jsx("style",{children:`
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
            box-shadow: inset 4px 0 0 0 ${s.gold};
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
            background: ${s.navy}; color: #fff; border-color: ${s.navy}; box-shadow: 0 8px 20px rgba(15,23,42,0.2);
          }
          
          @keyframes pulse-red { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
          .new-badge-pulse { background: #ef4444; color: #fff; font-size: 0.6rem; padding: 2px 6px; border-radius: 4px; animation: pulse-red 2s infinite; font-weight: 900;}

          @media (max-width: 1100px) { .notif-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 768px) { .notif-grid { grid-template-columns: 1fr; gap: 25px; margin-top: 25px;} .notif-card { height: 480px; } }
        `}),e.jsxs("div",{className:"notif-grid",children:[e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-notice",children:[e.jsx("span",{style:{fontSize:"26px"},children:"🔔"})," Official Notices"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:c,children:f.map((r,i)=>{const p=r.isNew&&(new Date-new Date(r.date))/864e5<5;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",r.date?new Date(r.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#1e3a8a"},children:r.type||"Notice"}),p&&e.jsx("span",{className:"new-badge-pulse",children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:r.text}}),r.link&&e.jsx("a",{href:r.link,target:"_blank",rel:"noreferrer",style:{fontSize:"0.8rem",color:"#2563eb",fontWeight:800,textDecoration:"none",display:"flex",alignItems:"center",gap:"5px"},children:"📎 View Attachment"})]},i)})})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx(T,{to:"/notifications",className:"view-all-btn",children:"View All Notices"})})]}),e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-news",children:[e.jsx("span",{style:{fontSize:"26px"},children:"📣"})," News & Events"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:y,children:v.map((r,i)=>{const p=r.date&&(new Date-new Date(r.date))/864e5<5;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",r.date?new Date(r.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#e11d48"},children:r.type||"Update"}),p&&e.jsx("span",{className:"new-badge-pulse",children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:r.text||r.title}}),r.desc&&e.jsx("div",{className:"rich-text-desc",dangerouslySetInnerHTML:{__html:r.desc}}),r.link&&e.jsx("a",{href:r.link,target:"_blank",rel:"noreferrer",style:{fontSize:"0.8rem",color:"#e11d48",fontWeight:800,textDecoration:"none",display:"flex",alignItems:"center",gap:"5px"},children:"🔗 Read More"})]},i)})})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx(T,{to:"/news",className:"view-all-btn",children:"Explore News"})})]}),e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-docs",children:[e.jsx("span",{style:{fontSize:"26px"},children:"📄"})," E-Documents"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:b,children:z.map((r,i)=>e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",r.date?new Date(r.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#059669"},children:r.type||"Document"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:r.text||r.title}}),r.link&&e.jsx("a",{href:r.link,target:"_blank",rel:"noreferrer",style:{fontSize:"0.8rem",color:"#059669",fontWeight:800,textDecoration:"none",display:"flex",alignItems:"center",gap:"5px"},children:"⬇️ Download PDF"})]},i))})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx(T,{to:"/documents",className:"view-all-btn",children:"Document Archive"})})]})]})]})]})},_e=t=>t?t.includes("drive.google.com/file/d/")?`https://drive.google.com/file/d/${t.split("/d/")[1].split("/")[0]}/preview`:t:"",Xe=({notices:t,announcements:d,pdfReports:g,sliderSlides:w,events:c,gallery:y})=>{const[b,j]=o.useState("All Moments"),[a,x]=o.useState(null),f=y||[],S=b==="All Moments"?f:f.filter(r=>r.cat===b),v=(c||[]).filter(r=>r.status==="upcoming"),z=(c||[]).filter(r=>r.status==="recent"),m=r=>{switch(r){case"SEMINAR":return"/images/slider_seminar.jpg";case"WORKSHOP":return"/images/slider_ncc.jpg";case"SPORTS":return"/images/slider_cricket.jpg";case"CULTURAL":return"/images/slider_baisakhi.jpg";default:return"/images/college_photo.jpg"}},k=[{text:"B.A./B.Com. Semester 1 Admissions are now open for 2024-25 session.",link:"/admission/info"},{text:"Results for the Semester 6 internal examinations have been published.",link:"/results"},{text:"The college will remain closed on account of Holi from 24th to 26th March.",link:"#"}];return e.jsxs("div",{style:{fontFamily:"'Segoe UI',sans-serif",background:"transparent",minHeight:"100vh",overflowX:"hidden"},children:[e.jsx("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundImage:"url(/gncollege-website/images/logo.png)",backgroundRepeat:"repeat",backgroundSize:"350px",opacity:.03,zIndex:-1,backgroundColor:"#f4f7f9"}}),e.jsx(Ye,{slides:w}),e.jsx(He,{items:k}),e.jsx(Ue,{notices:t,announcements:d,pdfReports:g,upcomingEvents:v}),e.jsx("div",{style:{background:"#fff",borderTop:"1px solid #edf2f7",borderBottom:"1px solid #edf2f7",padding:"18px 20px"},children:e.jsx("div",{style:{maxWidth:1280,margin:"0 auto",display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"},children:[{to:"/notifications",icon:"📢",label:"All Notices & News",bg:s.navy,color:"#fff",shadow:`${s.navy}33`},{to:"/documents",icon:"📁",label:"All Documents",bg:"#16213e",color:"#fff",shadow:"#16213e33"}].map(r=>e.jsxs(T,{to:r.to,onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),style:{display:"inline-flex",alignItems:"center",gap:8,background:r.bg,color:r.color,padding:"11px 26px",borderRadius:50,fontSize:14,fontWeight:800,textDecoration:"none",boxShadow:`0 4px 14px ${r.shadow}`,transition:"all .2s"},onMouseEnter:i=>{i.currentTarget.style.transform="translateY(-3px)",i.currentTarget.style.boxShadow=`0 8px 22px ${r.shadow}`},onMouseLeave:i=>{i.currentTarget.style.transform="",i.currentTarget.style.boxShadow=`0 4px 14px ${r.shadow}`},children:[e.jsx("span",{style:{fontSize:17},children:r.icon}),r.label,e.jsx("svg",{width:"14",height:"14",fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]},r.to))})}),e.jsx("section",{id:"about",style:{background:"#fff",padding:"100px 20px",position:"relative",overflow:"hidden"},children:e.jsxs("div",{style:{maxWidth:1250,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(350px, 1fr))",gap:"60px",alignItems:"center"},children:[e.jsxs("div",{"data-aos":"fade-right",style:{position:"relative"},children:[e.jsx("style",{children:`
                @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
                .image-stack { position: relative; width: 100%; height: 450px; }
                .main-img { width: 90%; height: 100%; object-fit: cover; border-radius: 20px; box-shadow: 20px 20px 0px ${s.gold}; position: relative; z-index: 2; transition: transform 0.5s ease; }
                .image-stack:hover .main-img { transform: scale(1.02); }
                .accent-box { position: absolute; bottom: -30px; right: 0; background: ${s.navy}; color: #fff; padding: 25px; border-radius: 15px; z-index: 3; box-shadow: 0 10px 30px rgba(0,0,0,0.2); animation: float 3s ease-in-out infinite; }
              `}),e.jsxs("div",{className:"image-stack",children:[e.jsx("img",{src:"/gncollege-website/images/college_photo.jpg",alt:"Guru Nanak College Campus",className:"main-img",loading:"lazy",decoding:"async"}),e.jsxs("div",{className:"accent-box",children:[e.jsx("h4",{style:{fontSize:"32px",margin:0,fontWeight:900,color:s.gold},children:"56+"}),e.jsx("p",{style:{fontSize:"12px",margin:0,opacity:.8,letterSpacing:"1px"},children:"YEARS OF EXCELLENCE"})]})]})]}),e.jsxs("div",{"data-aos":"fade-left",children:[e.jsxs("h2",{style:{fontSize:"38px",fontWeight:900,color:s.navy,lineHeight:1.2,marginBottom:"10px"},children:["About the ",e.jsx("span",{style:{color:s.gold},children:"College"})]}),e.jsx("h4",{style:{color:s.gold,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"25px",fontSize:"14px"},children:"Established 1970"}),e.jsx("p",{style:{color:"#555",lineHeight:1.8,fontSize:"16px",marginBottom:"30px"},children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru. We draw inspiration from the teachings of Guru Nanak Devji, fostering an environment of academic progress and individual development."}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"15px",marginBottom:"35px"},children:[{icon:"🛡️",title:"NAAC Accredited",desc:"Grade B Institution"},{icon:"👨‍🏫",title:"Expert Faculty",desc:"Highly Experienced"},{icon:"🔬",title:"Modern Labs",desc:"Tech-enabled Learning"},{icon:"🏅",title:"NSS & NCC",desc:"Character Building"}].map((r,i)=>e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"start"},children:[e.jsx("span",{style:{fontSize:"20px"},children:r.icon}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:800,fontSize:"14px",color:s.navy},children:r.title}),e.jsx("div",{style:{fontSize:"12px",color:"#888"},children:r.desc})]})]},i))}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"25px",flexWrap:"wrap"},children:[e.jsx("style",{children:`
                .discover-btn {
                  background: ${s.navy}; color: #fff; padding: 15px 35px; border: none; border-radius: 50px; 
                  font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(15,35,71,0.3);
                  text-decoration: none; display: inline-block;
                }
                .discover-btn:hover { background: ${s.gold}; color: ${s.navy}; box-shadow: 0 8px 25px rgba(244,160,35,0.4); }
                .social-icon-btn { width: 40px; height: 40px; border-radius: 50%; background: #f0f2f5; display: flex; align-items: center; justify-content: center; color: ${s.navy}; font-size: 18px; text-decoration: none; transition: all 0.3s ease; }
                .social-icon-btn:hover { background: ${s.navy}; color: ${s.gold}; transform: rotate(360deg); }
              `}),e.jsx(T,{to:"/about-us/college-profile",className:"discover-btn",children:"DISCOVER MORE →"}),e.jsxs("div",{style:{display:"flex",gap:"15px",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"13px",fontWeight:700,color:"#666"},children:"FOLLOW US:"}),re.map(r=>e.jsx("a",{href:r.href,target:"_blank",rel:"noopener noreferrer",className:"social-icon-btn",children:r.id==="twitter"?"𝕏":r.id==="youtube"?"▶":r.label.charAt(0)},r.id))]})]})]})]})}),e.jsx(Ge,{}),e.jsx("section",{id:"events",style:{padding:"80px 20px",background:"transparent"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1400,margin:"0 auto"},children:[e.jsx(te,{title:"Recent Events & Happenings",subtitle:"Insights into our seminars, workshops, and vibrant campus activities"}),e.jsx("style",{children:`
            @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .events-scroller { overflow: hidden; padding: 20px 0; margin-top: 30px; mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent); -webkit-mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent); }
            .events-track { display: flex; width: max-content; gap: 30px; animation: scrollLeft 35s linear infinite; transform: translateZ(0); }
            .events-track:hover { animation-play-state: paused; }
            .event-loop-card { width: 320px; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.04); border: 1px solid rgba(255,255,255,0.5); flex-shrink: 0; transition: all 0.4s ease; display: flex; flex-direction: column; }
            .event-loop-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 18px 40px rgba(15, 35, 71, 0.15); border-color: ${s.gold}; }
            .el-img-box { position: relative; height: 200px; overflow: hidden; }
            .el-img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s ease; }
            .event-loop-card:hover .el-img { transform: scale(1.08); }
            .el-badge { position: absolute; top: 15px; right: 15px; background: ${s.gold}; color: #000; padding: 5px 12px; font-size: 10px; font-weight: 800; border-radius: 50px; text-transform: uppercase; z-index: 2; box-shadow: 0 4px 10px rgba(0,0,0,0.2); transition: all 0.3s ease; }
            .event-loop-card:hover .el-badge { transform: scale(1.1); box-shadow: 0 6px 15px rgba(0,0,0,0.3); }
            .el-date { position: absolute; bottom: 0; left: 0; background: ${s.navy}; color: #fff; padding: 8px 15px; border-top-right-radius: 12px; text-align: center; z-index: 2; transition: all 0.3s ease; }
            .event-loop-card:hover .el-date { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
            .el-info { padding: 22px; flex: 1; display: flex; flex-direction: column; }
            .el-title { font-size: 16px; font-weight: 800; color: ${s.navy}; margin: 0 0 10px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
            .el-desc { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 15px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; flex: 1;}
            
            .el-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px; margin-top: auto;}
            
            .read-more-btn { background: none; border: none; font-size: 11px; color: ${s.gold}; font-weight: 800; text-decoration: none; transition: all 0.3s ease; cursor: pointer; padding: 0; display: flex; align-items: center; gap: 5px; }
            .read-more-btn:hover { color: ${s.navy}; letter-spacing: 0.5px; }
            .report-badge { background: #fee2e2; color: #b91c1c; padding: 3px 8px; border-radius: 4px; font-size: 9px; font-weight: 800; }
          `}),z.length>0?e.jsx("div",{className:"events-scroller",children:e.jsx("div",{className:"events-track",children:[...z,...z,...z].map((r,i)=>e.jsxs("div",{className:"event-loop-card",children:[e.jsxs("div",{className:"el-img-box",children:[e.jsx("div",{className:"el-badge",children:r.type}),e.jsxs("div",{className:"el-date",children:[e.jsx("div",{style:{fontSize:"18px",fontWeight:900,lineHeight:1},children:r.day||"--"}),e.jsx("div",{style:{fontSize:"10px",fontWeight:700},children:r.month||"---"})]}),e.jsx("img",{src:r.imageUrl||m(r.type),alt:r.title,className:"el-img",loading:"lazy",decoding:"async"})]}),e.jsxs("div",{className:"el-info",children:[e.jsx("h3",{className:"el-title",children:r.title}),e.jsx("div",{className:"el-desc",dangerouslySetInnerHTML:{__html:r.desc}}),e.jsxs("div",{className:"el-footer",children:[e.jsxs("span",{style:{fontSize:"11px",color:"#888",fontWeight:700},children:["📍 ",r.location||"Campus"]}),e.jsx("button",{className:"read-more-btn",onClick:p=>{p.preventDefault(),r.reportLink?x(_e(r.reportLink)):alert("Full details coming soon!")},children:r.reportLink?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"report-badge",children:"PDF"})," READ REPORT →"]}):"READ MORE →"})]})]})]},i))})}):e.jsxs("div",{style:{textAlign:"center",background:"rgba(255,255,255,0.7)",padding:"40px",borderRadius:"12px",border:"1px dashed #e2e8f0",marginTop:"30px"},children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"10px"},children:"📅"}),e.jsx("h3",{style:{color:s.navy,margin:"0 0 10px"},children:"No Recent Events"}),e.jsx("p",{style:{color:"#64748b",margin:0,fontSize:"14px"},children:"There are no events to display at the moment."})]}),e.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:28},children:e.jsxs(T,{to:"/events",style:{display:"inline-flex",alignItems:"center",gap:9,background:`linear-gradient(135deg, ${s.gold}, #a07010)`,color:s.navy,padding:"13px 30px",borderRadius:50,fontSize:14.5,fontWeight:900,textDecoration:"none",boxShadow:`0 4px 18px ${s.gold}55`,transition:"all .2s"},onMouseEnter:r=>{r.currentTarget.style.transform="translateY(-3px)",r.currentTarget.style.boxShadow=`0 8px 26px ${s.gold}66`},onMouseLeave:r=>{r.currentTarget.style.transform="",r.currentTarget.style.boxShadow=`0 4px 18px ${s.gold}55`},children:["🏆 View All Events",e.jsx("svg",{width:"15",height:"15",fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})})]})}),e.jsxs("section",{style:{background:`linear-gradient(135deg, ${s.navyDark} 0%, ${s.navy} 100%)`,padding:"80px 20px",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:.05,pointerEvents:"none",backgroundImage:"radial-gradient(#fff 1px, transparent 1px)",backgroundSize:"30px 30px"}}),e.jsxs("div",{"data-aos":"zoom-in",style:{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"40px",textAlign:"center",position:"relative",zIndex:2},children:[e.jsx("style",{children:`
            .counter-box { padding: 20px; transition: all 0.4s ease; }
            .counter-box:hover { transform: translateY(-10px); background: rgba(255, 255, 255, 0.05); borderRadius: 15px; boxShadow: 0 0 25px rgba(244,160,35,0.1); }
            .counter-icon { font-size: 50px; margin-bottom: 15px; display: inline-block; filter: drop-shadow(0 0 10px rgba(244,160,35,0.3)); transition: all 0.4s ease; }
            .counter-box:hover .counter-icon { transform: scale(1.2) rotate(10deg); filter: drop-shadow(0 0 20px rgba(244,160,35,0.6)); }
            .counter-number { font-size: 45px; font-weight: 900; color: ${s.gold}; line-height: 1; margin-bottom: 10px; font-family: 'Arial Black', sans-serif; }
            .counter-label { font-size: 14px; color: #e2e8f0; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
          `}),[{label:"STUDENTS ENROLLED",value:"4,000+",icon:"👨‍🎓"},{label:"SUCCESSFUL ALUMNI",value:"45,000+",icon:"🎓"},{label:"EXPERT FACULTY",value:"50+",icon:"👨‍🏫"},{label:"YEARS OF LEGACY",value:"56",icon:"🏛️"}].map((r,i)=>e.jsxs("div",{className:"counter-box",children:[e.jsx("div",{className:"counter-icon",children:r.icon}),e.jsx("div",{className:"counter-number",children:r.value}),e.jsx("div",{className:"counter-label",children:r.label})]},i))]})]}),e.jsx("section",{style:{padding:"80px 20px",background:"transparent"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsx(te,{title:"Important External Links",subtitle:"Quick access to official education and government portals"}),e.jsx("style",{children:`
            .links-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; margin-top: 40px; }
            .link-tile { background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.6); border-radius: 12px; padding: 25px 15px; text-align: center; text-decoration: none; transition: all 0.3s; display: flex; flex-direction: column; align-items: center; gap: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); transform: translateZ(0); }
            .link-tile:hover { transform: translateY(-8px) scale(1.03); border-color: ${s.gold}; box-shadow: 0 12px 25px rgba(15, 35, 71, 0.1); background: #fff; }
            .link-icon-circle { width: 60px; height: 60px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; transition: 0.3s; }
            .link-tile:hover .link-icon-circle { background: ${s.navy}; color: #fff; transform: rotate(15deg); }
            .link-name { font-size: 13px; font-weight: 800; color: ${s.navy}; letter-spacing: 0.5px; }
          `}),e.jsx("div",{className:"links-grid",children:[{name:"NAAC",url:"https://naac.gov.in",icon:"🏅"},{name:"UGC",url:"https://ugc.ac.in",icon:"📜"},{name:"INFLIBNET",url:"https://inflibnet.ac.in",icon:"📚"},{name:"NDL INDIA",url:"https://ndl.gov.in",icon:"🔬"},{name:"SWAYAM",url:"https://swayam.gov.in",icon:"🌐"},{name:"BBMK UNIVERSITY",url:"https://bbmku.ac.in",icon:"🏛️"}].map((r,i)=>e.jsxs("a",{href:r.url,target:"_blank",rel:"noopener noreferrer",className:"link-tile","data-aos":"fade-up","data-aos-delay":i*50,children:[e.jsx("div",{className:"link-icon-circle",children:r.icon}),e.jsx("div",{className:"link-name",children:r.name})]},i))})]})}),e.jsx("section",{id:"gallery",style:{padding:"100px 20px",background:"#fff"},"data-aos":"fade-up",children:e.jsxs("div",{style:{maxWidth:1300,margin:"0 auto"},children:[e.jsx(te,{title:"📸 Photo Gallery",subtitle:"Memorable glimpses of academic excellence and cultural heritage"}),e.jsx("style",{children:`
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
          `}),e.jsx("div",{className:"gallery-filters",children:["All Moments","Seminars","Cultural Fest","Guest Visit","Campus","Departments","NSS Programs"].map(r=>e.jsx("button",{className:`filter-btn ${b===r?"active":""}`,onClick:()=>j(r),children:r},r))}),e.jsx("div",{className:"gallery-grid",children:S.length>0?S.map((r,i)=>e.jsxs("div",{className:"gallery-item","data-aos":"zoom-in","data-aos-delay":i*50,children:[e.jsx("img",{src:r.src,alt:r.title,className:"gallery-img",loading:"lazy",decoding:"async"}),e.jsxs("div",{className:"gallery-overlay",children:[e.jsx("span",{style:{color:"#f4a023",fontSize:"10px",fontWeight:"800"},children:r.cat}),e.jsx("h4",{style:{color:"#fff",fontSize:"14px",fontWeight:"700",marginTop:"5px"},children:r.title})]})]},i)):e.jsxs("div",{style:{gridColumn:"1 / -1",textAlign:"center",background:"#f8fafc",padding:"50px 20px",borderRadius:"16px",border:"1px dashed #cbd5e1"},children:[e.jsx("div",{style:{fontSize:"32px",marginBottom:"10px"},children:"📸"}),e.jsx("h3",{style:{color:s.navy,margin:"0 0 5px"},children:"Gallery is Empty"}),e.jsx("p",{style:{color:"#64748b",margin:0,fontSize:"14px"},children:"Upload photos from the Admin Panel to see them here."})]})},b)]})}),e.jsxs("section",{style:{padding:"80px 20px",background:"#fff",textAlign:"center"},children:[e.jsxs("h2",{style:{fontSize:"36px",fontWeight:900,color:s.navy,margin:"0 0 10px"},children:["🎬 Campus ",e.jsx("span",{style:{color:s.gold},children:"Video Highlights"})]}),e.jsx("p",{style:{color:"#64748b",marginBottom:"40px"},children:"Automatically fetched from our official YouTube Channel"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"30px",maxWidth:1200,margin:"0 auto"},children:[e.jsx("iframe",{width:"100%",height:"250",src:"https://www.youtube.com/embed/YOUR_VIDEO_ID_1",style:{borderRadius:"16px",border:"none",boxShadow:"0 10px 30px rgba(0,0,0,0.1)"},allowFullScreen:!0}),e.jsx("iframe",{width:"100%",height:"250",src:"https://www.youtube.com/embed/YOUR_VIDEO_ID_2",style:{borderRadius:"16px",border:"none",boxShadow:"0 10px 30px rgba(0,0,0,0.1)"},allowFullScreen:!0}),e.jsx("iframe",{width:"100%",height:"250",src:"https://www.youtube.com/embed/YOUR_VIDEO_ID_3",style:{borderRadius:"16px",border:"none",boxShadow:"0 10px 30px rgba(0,0,0,0.1)"},allowFullScreen:!0})]})]}),a&&we.createPortal(e.jsx("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:9999999,background:"rgba(15,35,71,0.95)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs("div",{style:{background:"#fff",width:"90%",maxWidth:"1000px",height:"85vh",borderRadius:"20px",overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.5)"},children:[e.jsxs("div",{style:{padding:"16px 24px",background:s.navy,color:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("span",{style:{fontSize:"20px"},children:"📄"}),e.jsx("span",{style:{fontWeight:800,letterSpacing:"0.5px"},children:"Official Event Report"})]}),e.jsx("button",{onClick:()=>x(null),style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",width:"32px",height:"32px",borderRadius:"50%",cursor:"pointer",fontSize:"14px",transition:"0.2s",display:"flex",alignItems:"center",justifyContent:"center"},onMouseOver:r=>r.currentTarget.style.background=s.red,onMouseOut:r=>r.currentTarget.style.background="rgba(255,255,255,0.2)",children:"✕"})]}),e.jsx("div",{style:{flex:1,background:"#f1f5f9"},children:e.jsx("iframe",{src:a,title:"Event PDF Report",width:"100%",height:"100%",style:{border:"none"},allow:"autoplay"})})]})}),document.body)]})};function qe({onAdminClick:t,navLinks:d}){const[g,w]=o.useState(null),[c,y]=o.useState(null),[b,j]=o.useState(null),[a,x]=o.useState(window.innerWidth<1250),[f,S]=o.useState(!1),[v,z]=o.useState(!1);o.useEffect(()=>{const p=()=>{x(window.innerWidth<1250),window.innerWidth>=1250&&S(!1)},l=()=>{z(window.scrollY>40)};return window.addEventListener("resize",p),window.addEventListener("scroll",l),()=>{window.removeEventListener("resize",p),window.removeEventListener("scroll",l)}},[]);const m=p=>{g===p?(w(null),y(null),j(null)):(w(p),y(null),j(null))},k=p=>{c===p?(y(null),j(null)):(y(p),j(null))},r=p=>{j(b===p?null:p)},i=p=>p?p.startsWith("/#")?p.substring(2):p:"#";return e.jsxs("nav",{className:"glass-navbar",style:{position:"sticky",top:0,zIndex:99999,background:v?"rgba(255, 255, 255, 0.98)":"#ffffff",boxShadow:v?"0 10px 30px rgba(0, 0, 0, 0.15)":"0 4px 15px rgba(0,0,0,0.05)",backdropFilter:v?"blur(12px)":"none",WebkitBackdropFilter:v?"blur(12px)":"none",transition:"all 0.3s ease",width:"100%"},children:[e.jsx("style",{children:`
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
          background: linear-gradient(90deg, ${s.navy} 0%, #1e3a8a 30%, #d4af37 50%, #1e3a8a 70%, ${s.navy} 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shineText 5s linear infinite;
        }

        .clean-divider {
          border-left: 2.5px solid ${s.gold};
          border-radius: 2px;
        }
      `}),e.jsxs("div",{style:{width:"100%",maxWidth:"98%",margin:"0 auto",padding:"0 15px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:a?"5px":"20px"},children:[e.jsxs(T,{to:"/",style:{display:"flex",alignItems:"center",padding:"8px 0",flexShrink:1,textDecoration:"none",gap:a?"8px":"15px",marginLeft:a?"0":"-20px",minWidth:0},children:[e.jsx("div",{className:"logo-box-container",style:{background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:a?"45px":"75px",height:a?"45px":"75px"},children:e.jsx("img",{className:"spinning-logo",src:"/gncollege-website/images/logo.png",alt:"Guru Nanak College Logo",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{className:"clean-divider",style:{display:"flex",flexDirection:"column",justifyContent:"center",paddingLeft:a?"8px":"15px",textAlign:"left",alignItems:"flex-start",overflow:"hidden"},children:[e.jsx("h1",{className:"shimmering-title",style:{margin:"0 0 5px 0",fontSize:a?"13px":"21.5px",fontWeight:"900",fontFamily:"Georgia, serif",whiteSpace:"nowrap",letterSpacing:a?"0px":"2.5px",textAlign:"left",lineHeight:"1.1"},children:"GURU NANAK COLLEGE, DHANBAD"}),!a&&e.jsx("p",{style:{margin:"0 0 3px 0",fontSize:"11px",color:"#475569",fontWeight:"700",whiteSpace:"nowrap",textAlign:"left"},children:"A Sikh Minority Degree College Established & Managed by Gurudwara Prabhandhak Committee, Dhanbad."}),e.jsx("p",{style:{margin:0,fontSize:a?"8.5px":"10.5px",color:s.gold,fontWeight:"800",letterSpacing:a?"0.2px":"1.8px",textTransform:"uppercase",whiteSpace:"nowrap",textAlign:"left"},children:a?"Est. 1970 | Dhanbad, Jharkhand":"Affiliated to Binod Bihari Mahto Koyalanchal University, Dhanbad."})]})]}),a&&e.jsx("button",{onClick:()=>S(!f),style:{background:"transparent",border:"none",color:s.navy,fontSize:28,cursor:"pointer",padding:"4px",flexShrink:0,zIndex:200},children:f?"✕":"☰"}),e.jsxs("div",{style:{display:a?f?"flex":"none":"flex",flexDirection:a?"column":"row",alignItems:a?"flex-start":"center",position:a?"absolute":"static",top:"100%",left:0,right:0,background:a?"rgba(255,255,255,0.98)":"transparent",padding:a?"10px 20px 20px":0,gap:a?10:0,boxShadow:a&&f?"0 10px 20px rgba(0,0,0,.15)":"none",maxHeight:a?"80vh":"auto",overflowY:a?"auto":"visible",flex:1,justifyContent:a?"flex-start":"flex-end",marginLeft:a?"0":"auto",marginRight:a?"0":"10px",borderTop:a&&f?"1px solid #eee":"none",zIndex:250},children:[d.map(p=>e.jsxs("div",{style:{position:"relative",width:a?"100%":"auto"},onMouseEnter:()=>!a&&w(p.label),onMouseLeave:()=>{a||(w(null),y(null),j(null))},children:[e.jsxs("div",{onClick:()=>a&&p.sub&&m(p.label),style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:a&&p.sub?"pointer":"default"},children:[e.jsxs(T,{to:i(p.href),onClick:()=>{p.label==="Home"&&window.scrollTo(0,0)},style:{color:s.navy,padding:a?"12px 0":"24px 11px",display:"block",fontSize:13.5,fontWeight:700,whiteSpace:"nowrap",textDecoration:"none",transition:"all .2s",width:"100%"},children:[p.label==="Home"?"🏠 ":"",p.label]}),a&&p.sub&&e.jsx("span",{style:{color:s.navy,fontSize:20},children:g===p.label?"▴":"▾"}),!a&&p.sub&&e.jsx("span",{style:{color:s.navy,fontSize:11,marginLeft:2,marginRight:8,marginTop:2},children:"▾"})]}),p.sub&&g===p.label&&e.jsx("div",{style:{position:a?"static":"absolute",top:"100%",left:0,background:"#fff",minWidth:240,boxShadow:a?"none":"0 12px 30px rgba(0,0,0,.15)",borderTop:a?"none":"3px solid "+s.navy,borderRadius:a?8:"0 0 8px 8px",zIndex:200,padding:a?"5px 0":"8px 0"},children:p.sub.map(l=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!a&&y(l.label),onMouseLeave:()=>!a&&y(null),children:[e.jsxs("div",{onClick:n=>{a&&l.sub&&(n.stopPropagation(),k(l.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:a?"10px 16px":"10px 18px",borderBottom:a?"none":"1px solid #f8f9fa",cursor:a&&l.sub?"pointer":"default"},onMouseEnter:n=>{a||(n.currentTarget.style.background="#f4f6f9")},onMouseLeave:n=>{a||(n.currentTarget.style.background="transparent")},children:[e.jsx(T,{to:i(l.href),style:{fontSize:13,fontWeight:600,color:s.navy,display:"block",width:"100%",textDecoration:"none"},children:l.label}),l.sub&&e.jsx("span",{style:{fontSize:12,color:s.gold,marginLeft:8},children:a?c===l.label?"▴":"▾":"▶"})]}),l.sub&&c===l.label&&e.jsx("div",{style:{position:a?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:240,boxShadow:a?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:a?"none":"3px solid "+s.gold,borderRadius:a?4:"0 8px 8px 8px",margin:a?"0 16px 10px":0,borderLeft:a?"2px solid "+s.gold:"none"},children:l.sub.map(n=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!a&&j(n.label),onMouseLeave:()=>!a&&j(null),children:[e.jsxs("div",{onClick:u=>{a&&n.sub&&(u.stopPropagation(),r(n.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderBottom:a?"none":"1px solid #f8f9fa",cursor:a&&n.sub?"pointer":"default"},onMouseEnter:u=>{a||(u.currentTarget.style.background="#f4f6f9")},onMouseLeave:u=>{a||(u.currentTarget.style.background="transparent")},children:[e.jsx(T,{to:i(n.href),style:{fontSize:12.5,fontWeight:600,color:"#444",display:"block",width:"100%",textDecoration:"none"},children:n.label}),n.sub&&e.jsx("span",{style:{fontSize:11,color:s.gold,marginLeft:8},children:a?b===n.label?"▴":"▾":"▶"})]}),n.sub&&b===n.label&&e.jsx("div",{style:{position:a?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:240,boxShadow:a?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:a?"none":"3px solid "+s.navy,borderRadius:a?4:"0 8px 8px 8px",margin:a?"0 16px 10px":0,borderLeft:a?"2px solid "+s.navy:"none"},children:n.sub.map(u=>e.jsx(T,{to:i(u.href),style:{display:"block",padding:"10px 16px",fontSize:12,color:"#555",borderBottom:a?"none":"1px solid #f8f9fa",textDecoration:"none"},onMouseEnter:N=>{a||(N.currentTarget.style.background="#f4f6f9")},onMouseLeave:N=>{a||(N.currentTarget.style.background="transparent")},children:u.label},u.label))})]},n.label))})]},l.label))})]},p.label)),e.jsxs("button",{onClick:t,style:{flexShrink:0,background:s.gold,color:"#000",border:"none",padding:"7px 18px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:800,marginLeft:a?0:10,marginTop:a?12:0,width:a?"100%":"auto",boxShadow:"0 4px 15px rgba(244,160,35,0.3)",whiteSpace:"nowrap",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",transition:"all 0.3s ease"},onMouseEnter:p=>p.currentTarget.style.transform="translateY(-2px)",onMouseLeave:p=>p.currentTarget.style.transform="translateY(0)",children:[e.jsx("span",{style:{fontSize:16},children:"⚙️"})," Admin Login"]})]})]})]})}const Ve=()=>e.jsxs("footer",{className:"premium-footer",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"footer-grid",children:[e.jsxs("div",{className:"footer-widget",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"18px",marginBottom:"25px"},children:[e.jsx("div",{style:{width:"75px",height:"75px",background:"rgba(255,255,255,0.95)",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",padding:"8px",boxShadow:"0 10px 25px rgba(0,0,0,0.5)"},children:e.jsx("img",{src:"/gncollege-website/images/logo.png",alt:"GNC Logo",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center"},children:[e.jsx("h2",{style:{fontSize:"1.4rem",fontWeight:"900",color:"#fff",margin:"0 0 2px 0",lineHeight:"1.1"},children:"GURU NANAK"}),e.jsx("h2",{style:{fontSize:"1.4rem",fontWeight:"900",color:"#f4a023",margin:0,lineHeight:"1.1"},children:"COLLEGE"}),e.jsx("p",{style:{fontSize:"0.75rem",color:"#94a3b8",margin:"6px 0 0",fontWeight:"700",letterSpacing:"1.5px"},children:"DHANBAD, JHARKHAND"})]})]}),e.jsx("p",{className:"footer-desc",children:"A Sikh Minority Degree College established in 1970. We are dedicated to providing premium quality education and fostering holistic development based on the core teachings of Guru Nanak Dev Ji."}),e.jsx("div",{style:{display:"flex",gap:"12px"},children:re&&re.map(t=>e.jsx("a",{href:t.href,target:"_blank",rel:"noreferrer",className:"social-btn","aria-label":t.label,children:t.id==="twitter"?"𝕏":t.id==="youtube"?"▶":t.id==="facebook"?"f":t.id==="instagram"?"in":t.label.charAt(0)},t.id))})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Quick Links"}),e.jsx("ul",{className:"footer-links",children:[{label:"Home",path:"/"},{label:"College Profile",path:"/about-us/college-profile"},{label:"Admission Rules",path:"/admission/rule"},{label:"Courses Offered",path:"/academics/course-offered"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((t,d)=>e.jsx("li",{className:"footer-link-item",children:e.jsxs(T,{to:t.path,onClick:()=>window.scrollTo(0,0),className:"footer-link",children:[e.jsx("span",{children:"›"})," ",t.label]})},d))})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Get In Touch"}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"📍"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Main Campus"}),"Bhuda, Dhanbad,",e.jsx("br",{}),"Jharkhand - 826001, India"]})]}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"📞"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Phone Enquiries"}),e.jsx("a",{href:"tel:+917903340991",className:"contact-link",children:"+91 79033 40991"})]})]}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"✉️"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Email Us"}),e.jsx("a",{href:"mailto:principal@gncollege.org",className:"contact-link",children:"principal@gncollege.org"})]})]})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Stay Updated"}),e.jsx("p",{className:"footer-desc",style:{marginBottom:"15px"},children:"Subscribe to our digital newsletter to receive the latest academic notices and campus announcements directly in your inbox."}),e.jsxs("div",{className:"newsletter-box",children:[e.jsx("input",{type:"email",placeholder:"Enter email address...",className:"newsletter-input"}),e.jsx("button",{className:"newsletter-btn",children:"Subscribe"})]})]})]}),e.jsx("div",{className:"footer-bottom",children:e.jsxs("div",{className:"footer-bottom-content",children:[e.jsxs("p",{className:"footer-copyright",children:["© ",new Date().getFullYear()," ",e.jsx("span",{style:{color:"#f4a023",fontWeight:"800"},children:"Guru Nanak College, Dhanbad"}),". All Rights Reserved."]}),e.jsx("p",{className:"footer-dev",children:"Designed & Developed dynamically with ❤️ By Pankaj Kumar"})]})})]}),Ke=()=>{const t={id:"whatsapp",label:"W",href:"https://wa.me/917903340991"};return e.jsxs("div",{className:"top-bar-container",style:{background:`linear-gradient(to right, ${s.navyDark}, #0a1832)`,color:"#e2e8f0",padding:"10px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:13,fontWeight:500,letterSpacing:"0.4px",borderBottom:`1px solid ${s.gold}20`},children:[e.jsx("style",{children:`
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
        `}),e.jsxs("div",{className:"contact-group",children:[e.jsxs("a",{href:"tel:+917903340991",className:"top-bar-link",children:[e.jsx("span",{style:{fontSize:"15px",color:s.gold},children:"📞"})," +91-7903340991"]}),e.jsxs("a",{href:"mailto:principal@gncollege.org",className:"top-bar-link",children:[e.jsx("span",{style:{fontSize:"15px",color:s.gold},children:"✉️"})," principal@gncollege.org"]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[re.map(d=>{let g=d.label;return d.id==="twitter"&&(g="𝕏"),d.id==="youtube"&&(g="▶"),e.jsx("a",{href:d.href,"aria-label":d.id,target:"_blank",rel:"noopener noreferrer",className:`social-icon social-icon-${d.id}`,children:g},d.id)}),e.jsx("a",{href:t.href,"aria-label":t.id,target:"_blank",rel:"noopener noreferrer",className:"social-icon whatsapp-icon",children:t.label},t.id)]})]})};function Je({onSuccess:t,onClose:d}){const[g,w]=o.useState(""),[c,y]=o.useState(""),[b,j]=o.useState(""),[a,x]=o.useState(!1),f=S=>{S.preventDefault(),j(""),x(!0),setTimeout(()=>{g==="admin"&&c==="admin123"?t():(j("❌ Incorrect Username or Password"),x(!1))},800)};return e.jsxs("div",{className:"login-overlay",children:[e.jsx("style",{children:`
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
          background: linear-gradient(135deg, ${s.navy} 0%, #0a1832 100%);
          padding: 30px 20px; text-align: center; color: #fff;
          border-bottom: 4px solid ${s.gold};
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
        .input-label { display: block; font-size: 13px; font-weight: 700; color: ${s.navy}; margin-bottom: 8px; text-transform: uppercase; }
        .login-input {
          width: 100%; padding: 14px 15px; border: 2px solid #e2e8f0;
          border-radius: 10px; font-size: 15px; transition: 0.3s;
          box-sizing: border-box; outline: none; background: #f8fafc;
        }
        .login-input:focus { border-color: ${s.gold}; background: #fff; box-shadow: 0 0 0 4px rgba(244,160,35,0.1); }

        .login-btn {
          width: 100%; padding: 15px; background: ${s.gold}; color: ${s.navyDark};
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
      `}),e.jsxs("div",{className:"login-box",children:[e.jsx("button",{className:"close-btn",onClick:d,title:"Close",children:"✕"}),e.jsxs("div",{className:"login-header",children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"10px"},children:"🛡️"}),e.jsx("h2",{children:"Admin Portal"}),e.jsx("p",{children:"Authorized Personnel Only"})]}),e.jsxs("form",{className:"login-form",onSubmit:f,children:[b&&e.jsx("div",{className:"error-box",children:b}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"input-label",children:"Username"}),e.jsx("input",{type:"text",className:"login-input",placeholder:"Enter your username",value:g,onChange:S=>w(S.target.value),required:!0})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"input-label",children:"Password"}),e.jsx("input",{type:"password",className:"login-input",placeholder:"Enter your password",value:c,onChange:S=>y(S.target.value),required:!0})]}),e.jsx("button",{type:"submit",className:"login-btn",disabled:a,children:a?"Authenticating...":"Secure Login 🚀"})]})]})]})}const Qe=()=>{const t=se();let d=t.pathname;d==="/"&&t.hash.startsWith("#/")&&(d=t.hash.substring(1));const g=d.split("/").filter(w=>w);return g.length===0?null:e.jsx("div",{style:{background:"#f8f9fa",borderBottom:"1px solid #e0e0e0"},children:e.jsxs("div",{style:{maxWidth:"1400px",margin:"0 auto",padding:"12px 20px",fontSize:"13.5px",color:"#666",display:"flex",alignItems:"center",fontWeight:"500"},children:[e.jsxs(T,{to:"/",style:{color:s.navy,textDecoration:"none",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{children:"🏠"})," Home"]}),g.map((w,c)=>{const y=`/${g.slice(0,c+1).join("/")}`,b=c===g.length-1,j=w.replace(/-/g," ").replace(/\b\w/g,a=>a.toUpperCase());return e.jsxs("span",{style:{display:"flex",alignItems:"center"},children:[e.jsx("span",{style:{margin:"0 10px",color:"#ccc",fontSize:"10px"},children:"❯"}),b?e.jsx("span",{style:{color:s.gold,fontWeight:"700"},children:j}):e.jsx(T,{to:y,style:{color:s.navy,textDecoration:"none"},children:j})]},y)})]})})};function Ze(){const t=[{label:"Principal Message",icon:"👨‍🏫",href:"#/about-us/principal-message"},{label:"Admission Rules",icon:"🎓",href:"#/admission/rule"},{label:"Departments",icon:"🏛️",href:"#/academics/course-offered"},{label:"NSS / NCC",icon:"🎖️",href:"#/activity/nss"},{label:"Syllabus",icon:"📚",href:"#/syllabus"},{label:"Photo Gallery",icon:"📸",href:"#/gallery"},{label:"Contact Us",icon:"📞",href:"#/contact"}];return e.jsx("div",{style:{position:"fixed",right:0,top:"50%",transform:"translateY(-50%)",zIndex:990,display:"flex",flexDirection:"column",gap:"4px"},children:t.map((d,g)=>e.jsx(et,{action:d,index:g},g))})}const et=({action:t,index:d})=>{const[g,w]=o.useState(!1);return e.jsxs("a",{href:t.href,onMouseEnter:()=>w(!0),onMouseLeave:()=>w(!1),style:{display:"flex",alignItems:"center",justifyContent:"flex-start",padding:"12px 15px",backgroundColor:g?s.gold:s.navy,color:g?s.navy:"#fff",textDecoration:"none",width:g?"200px":"55px",height:"55px",borderTopLeftRadius:"12px",borderBottomLeftRadius:"12px",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",overflow:"hidden",whiteSpace:"nowrap",boxShadow:g?"-5px 5px 15px rgba(0,0,0,0.2)":"-2px 2px 8px rgba(0,0,0,0.1)",position:"relative",right:g?"0":"-5px",animation:`slideInRight 0.5s ease forwards ${d*.1}s`,opacity:0},children:[e.jsx("span",{style:{fontSize:"22px",minWidth:"30px",textAlign:"center",display:"block"},children:t.icon}),e.jsx("span",{style:{fontWeight:"800",fontSize:"14px",marginLeft:"12px",opacity:g?1:0,transition:"opacity 0.3s ease 0.1s"},children:t.label}),e.jsx("style",{children:"@keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }"})]})};function be({page:t}){const[d,g]=o.useState([]);if(o.useEffect(()=>{if(!t)return;window.scrollTo(0,0);const c=t.path||`/p/${t.slug}`,y=P(O(L,"pdfReports")),b=M(y,j=>{const x=j.docs.map(f=>({id:f.id,...f.data()})).filter(f=>f.targetPage===c);x.sort((f,S)=>new Date(S.date)-new Date(f.date)),g(x)});return()=>b()},[t]),!t)return e.jsx("div",{style:{minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f4f7fa"},children:e.jsxs("div",{style:{textAlign:"center",padding:"50px",background:"#fff",borderRadius:"16px",boxShadow:"0 10px 30px rgba(0,0,0,0.05)"},children:[e.jsx("div",{style:{fontSize:"50px",marginBottom:"15px"},children:"🚧"}),e.jsx("h2",{style:{color:s.navy,fontSize:"28px",margin:"0 0 10px"},children:"Content Updating..."}),e.jsx("p",{style:{color:"#64748b",margin:0},children:"This section is currently being updated by the administration."})]})});const w=De.sanitize(t.content,{ADD_TAGS:["iframe"],ADD_ATTR:["allow","allowfullscreen","frameborder","scrolling"]});return e.jsxs("div",{children:[e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:t.title}),e.jsx("p",{className:"hero-subtitle",children:"Guru Nanak College, Dhanbad"})]})]}),e.jsx("div",{style:{maxWidth:"1200px",margin:"40px auto",padding:"0 20px"},children:e.jsxs("main",{children:[e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)"},children:[e.jsx("h2",{style:{fontSize:"2.2rem",color:s.navy,fontWeight:700,marginBottom:"0.5rem",textAlign:"left"},children:t.title}),e.jsx("div",{style:{width:"80px",height:"5px",background:s.gold,marginBottom:"1.5rem",borderRadius:"10px"}}),e.jsx("div",{className:"dynamic-rich-content",children:Ee(w)})]}),d.length>0&&e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",marginTop:"30px"},children:[e.jsx("h2",{style:{fontSize:"2.2rem",color:s.navy,fontWeight:700,marginBottom:"0.5rem",textAlign:"left"},children:"📚 Official Documents"}),e.jsx("div",{style:{width:"80px",height:"5px",background:s.gold,marginBottom:"1.5rem",borderRadius:"10px"}}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:"20px"},children:d.map(c=>e.jsxs("div",{style:{display:"flex",background:"#fff",border:"1px solid #e2e8f0",borderRadius:"10px",overflow:"hidden",transition:"all 0.3s ease",boxShadow:"0 4px 6px rgba(0,0,0,0.02)"},onMouseOver:y=>{y.currentTarget.style.transform="translateY(-4px)",y.currentTarget.style.borderColor=s.gold},onMouseOut:y=>{y.currentTarget.style.transform="translateY(0)",y.currentTarget.style.borderColor="#e2e8f0"},children:[e.jsx("div",{style:{width:"80px",background:"#f1f5f9",borderRight:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"center"},children:c.coverImage?e.jsx("img",{src:c.coverImage,alt:"cover",style:{width:"100%",height:"100%",objectFit:"cover"}}):e.jsx("div",{style:{fontSize:"30px",opacity:.3},children:"📄"})}),e.jsxs("div",{style:{padding:"15px",flex:1,display:"flex",flexDirection:"column",justifyContent:"center"},children:[c.isNew&&e.jsx("span",{className:"new-badge",children:"NEW"}),e.jsx("h4",{style:{margin:"0 0 5px 0",fontSize:"14px",color:s.navy,lineHeight:"1.4"},children:c.title}),e.jsxs("p",{style:{margin:"0 0 10px 0",fontSize:"11px",color:"#64748b",fontWeight:600},children:["📅 ",c.date]}),e.jsx("a",{href:c.pdfLink||c.link,target:"_blank",rel:"noreferrer",className:"download-btn",children:"⬇️ View Document"})]})]},c.id))})]})]})}),e.jsx("style",{children:`
        @media (max-width: 768px) { .dynamic-rich-content { padding: 25px !important; } }
        .dynamic-rich-content table { width: 100% !important; border-collapse: collapse; margin: 20px 0; display: block; overflow-x: auto; white-space: nowrap; font-size: 14px; }
        .dynamic-rich-content th { background: ${s.navy}; color: white; padding: 12px 15px; text-align: left; }
        .dynamic-rich-content td { padding: 12px 15px; border: 1px solid #e2e8f0; }
        .dynamic-rich-content tr:nth-child(even) { background-color: #f8fafc; }
        .dynamic-rich-content iframe { width: 100%; aspect-ratio: 16 / 9; height: auto; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 20px 0; }
        .dynamic-rich-content img { max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin: 20px 0; display: block; }
        .dynamic-rich-content h1, .dynamic-rich-content h2, .dynamic-rich-content h3 { color: ${s.navy}; margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 800; line-height: 1.3; text-align: left; }
        .dynamic-rich-content p { margin-bottom: 1.5em; line-height: 1.8; color: #334155; font-size: 16px; }
        .dynamic-rich-content ul, .dynamic-rich-content ol { margin-bottom: 1.5em; padding-left: 20px; color: #334155; line-height: 1.8; font-size: 16px;}
        .dynamic-rich-content li { margin-bottom: 8px; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        .new-badge { display: inline-block; background: #ef4444; color: #fff; fontSize: 9px; font-weight: 800; padding: 3px 6px; border-radius: 4px; margin-bottom: 8px; width: fit-content; animation: blink 1.5s infinite; letter-spacing: 0.5px;}
        .download-btn { display: inline-block; background: #f8fafc; color: ${s.navy}; padding: 8px 15px; border-radius: 6px; font-size: 12px; font-weight: 700; text-decoration: none; border: 1px solid #cbd5e1; text-align: center; transition: 0.2s; }
        .download-btn:hover { background: ${s.navy}; color: #fff; border-color: ${s.navy}; }
      `})]})}const tt=()=>(o.useEffect(()=>{window.scrollTo(0,0)},[]),e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
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
          background: linear-gradient(135deg, ${s.navy} 0%, #0a1832 100%);
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
        .header-title span { color: ${s.gold}; }
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
      `}),e.jsxs("header",{className:"contact-header",children:[e.jsxs("h1",{className:"header-title",children:["Get In ",e.jsx("span",{children:"Touch"})]}),e.jsx("p",{className:"header-sub",children:"We are here to assist you. Reach out to our respective campuses or directly contact our administration team for any queries."})]}),e.jsxs("div",{className:"campus-container",children:[e.jsxs("div",{className:"campus-card card-1",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏛️"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bhuda Campus"}),e.jsx("span",{className:"campus-badge",style:{background:s.navy},children:"Main Campus • Boys Wing"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsxs("p",{children:["Guru Nanak College, Bhuda",e.jsx("br",{}),"Dhanbad, Jharkhand - 826001"]})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:"tel:+917903340991",children:"+91 79033 40991"})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:"mailto:info@gncollege.org",children:"info@gncollege.org"})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bhuda Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.089853381653!2d86.43232147533682!3d23.797658878638367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69707963d7e8b%3A0x86733221469e7f7b!2sGuru%20Nanak%20College%20Dhanbad!5e0!3m2!1sen!2sin!4v1708688000000!5m2!1sen!2sin",allowFullScreen:"",loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})})]}),e.jsxs("div",{className:"campus-card card-2",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏢"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bank More Campus"}),e.jsx("span",{className:"campus-badge",style:{background:s.gold,color:s.navyDark},children:"Girls Wing • Vocational Studies"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsxs("p",{children:["Guru Nanak College, Bank More",e.jsx("br",{}),"Dhanbad, Jharkhand - 826001"]})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:"tel:+910000000000",children:"+91 (Add Number)"})]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:"mailto:vocational@gncollege.org",children:"vocational@gncollege.org"})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bank More Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.630325992144!2d86.4175863149822!3d23.77601898456687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6a3048817a859%3A0x8d365f7d34c52968!2sGuru%20Nanak%20College%20Womens%20Wing!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",allowFullScreen:"",loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})})]})]}),e.jsx("div",{className:"profile-container",style:{marginTop:0},children:e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:"0.3s",background:"transparent",boxShadow:"none",border:"none",padding:"0 !important"},children:[e.jsx("h2",{className:"section-heading",style:{textAlign:"center !important",fontSize:"32px"},children:"Administration Directory"}),e.jsx("div",{className:"heading-underline",style:{margin:"0 auto 30px"}}),e.jsx("div",{className:"directory-grid",children:[{title:"Prof. In-Charge (Bhuda Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫"},{title:"Prof. In-Charge (Bank More Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫"},{title:"BCA Coordinator",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"💻"},{title:"Member, Women's Cell",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛡️"},{title:"Member, Anti-Ragging Squad",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛑"},{title:"P.A. to Principal",name:"Mr. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"📝"}].map((t,d)=>e.jsxs("div",{className:"directory-card",children:[e.jsx("div",{className:"dir-icon",children:t.icon}),e.jsxs("div",{children:[e.jsx("div",{className:"dir-title",children:t.title}),e.jsx("div",{className:"dir-name",children:t.name}),e.jsxs("a",{href:`tel:${t.phone}`,className:"dir-contact",children:["📞 ",t.phone]})]})]},d))})]})})]})),at=()=>(o.useEffect(()=>{window.scrollTo(0,0)},[]),e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("header",{className:"profile-hero",children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"College Profile"}),e.jsx("p",{className:"hero-subtitle",children:"Excellence in Education Since 1970"})]})]}),e.jsx("div",{style:{maxWidth:"1200px",margin:"3rem auto 0",padding:"0 20px",position:"relative",zIndex:20},children:e.jsxs("div",{className:"profile-layout",children:[e.jsxs("main",{className:"profile-main",children:[e.jsxs("section",{className:"profile-section anim-slide-up",style:{animationDelay:"0.2s",background:"#fff",borderRadius:"24px"},children:[e.jsxs("div",{className:"section-grid",style:{marginBottom:"3rem"},children:[e.jsxs("div",{className:"text-content",children:[e.jsx("h2",{className:"section-heading",children:"College Profile"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was Established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru after whom this college is named."}),e.jsx("p",{className:"rich-text-content mt-4",children:"The college is managed by a Governing Council nominated by the Gurudwara Prabandhak Committee, Dhanbad, and draws its inspiration from the teachings of the faith propounded by Guru Nanak Devji."})]}),e.jsx("div",{className:"image-content",children:e.jsx("img",{src:"https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop",alt:"College Campus",loading:"lazy",decoding:"async",className:"profile-img hover-scale"})})]}),e.jsxs("div",{style:{marginBottom:"3rem"},children:[e.jsx("h2",{className:"section-heading",children:"About the College"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"Initially the college got affiliated to the Ranchi University – Ranchi since 1970 the year it was stared. But with the passage of time, Binod Bihari Mahto Koylanchal University, Dhanbad came into existence in 2017; and the affiliation of the college got transferred to this new University in 2017."}),e.jsx("p",{className:"rich-text-content mt-4",children:"At present, the college has got permanent affiliation with Binod Bihari Mahto Koylanchal University, Dhanbad in the faculties of Humanities, Social Sciences, commerce and such vocational courses as Bachelor of Computer Applications. The college has got “Deficit Grant College Status” by the government of Jharkhand. Also the college is registered u/s 2F and 12B of the UGC Act."}),e.jsx("p",{className:"rich-text-content mt-4",children:"The main aim and objective behind sponsoring this college was to impart value - based teaching to the young men and women of Dhanbad. The college attaches great importance to moral teaching. The college does not merely offer teaching in such subject as would enable young students to earn their bread and butter, but it also emphasizes grooming them into worthy (morally sound) citizens."})]}),e.jsxs("div",{children:[e.jsx("h2",{className:"section-heading",children:"Our Campuses"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",style:{marginBottom:"3rem"},children:"Guru Nanak College, Dhanbad functions at two main campuses:"}),e.jsxs("div",{className:"grid-2-col gap-6",children:[e.jsxs("div",{className:"campus-box",children:[e.jsx("h3",{style:{fontSize:"1.5rem",color:"var(--primary-navy)",fontWeight:"700",marginBottom:"10px"},children:"1. Bank More Campus (Girls Wing)"}),e.jsx("p",{className:"rich-text-content",children:"The women’s wing of the College was started in the year 2000 in the Bank More Campus of the College in the morning hours. As an exclusive centre of teaching for girls, this wing has earned high reputation among stakeholders during the last few years. In the Women’s wing also, teaching is imparted for B.A./B.Com. (Hons/General) Course."})]}),e.jsxs("div",{className:"campus-box",children:[e.jsx("h3",{style:{fontSize:"1.5rem",color:"var(--primary-navy)",fontWeight:"700",marginBottom:"10px"},children:"2. Bhuda Campus (Boys Wing)"}),e.jsx("p",{className:"rich-text-content",children:"The main building – the Boys’ wing of the College is situated at Bhuda. The main building is spaciously designed in an airy surrounding quite suitable for the environment of an academic institution. The present campus has been so planned as to cater to the needs of the students for a long time."})]})]})]})]}),e.jsx("section",{className:"stats-grid stats-grid-override mb-16 anim-slide-up",style:{animationDelay:"0.4s"},children:[{label:"Years of Legacy",value:"56+",icon:"🏛️"},{label:"Expert Faculty",value:"120+",icon:"👨‍🏫"},{label:"Students",value:"5000+",icon:"🎓"},{label:"Courses",value:"30+",icon:"📚"}].map((t,d)=>e.jsxs("div",{className:"stat-card stat-card-small",style:{background:"#fff",borderRadius:"16px",border:"1px solid #e2e8f0"},children:[e.jsx("div",{className:"stat-icon",children:t.icon}),e.jsx("div",{className:"stat-value stat-value-small",children:t.value}),e.jsx("div",{className:"stat-label",children:t.label})]},d))})]}),e.jsxs("aside",{className:"profile-sidebar anim-slide-up",style:{animationDelay:"0.5s"},children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"Principal Message",path:"/about-us/principal-message"},{label:"Admission Rules",path:"/admission/rule"},{label:"Fee Structure",path:"/admission/fee-structure"},{label:"Departments",path:"/academics/course-offered"},{label:"NSS",path:"/activity/nss"},{label:"NCC",path:"/activity/ncc"},{label:"Sports",path:"/activity/games-sports"},{label:"Workshop",path:"/activity/workshop"},{label:"Syllabus",path:"/syllabus"},{label:"Academic Calendar",path:"/academics/academic-calendar"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((t,d)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(T,{to:t.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",t.label]})},d))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:"45px",marginBottom:"15px",position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 12px",fontSize:"19px",color:"#f4a023",position:"relative",zIndex:2},children:"Need Assistance?"}),e.jsx("p",{style:{fontSize:"14px",margin:"0 0 20px",color:"#e2e8f0",lineHeight:"1.6",position:"relative",zIndex:2},children:"Contact our administration office for any queries related to admission or academics."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call Helpdesk Now"})]}),e.jsxs("div",{style:{marginTop:"30px"},children:[e.jsxs("h4",{style:{fontSize:"17px",fontWeight:"700",color:"var(--primary-navy)",marginBottom:"20px",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("span",{children:"🌐"})," Connect With Us"]}),e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx("a",{href:"https://facebook.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"f"}),e.jsx("a",{href:"https://twitter.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"𝕏"}),e.jsx("a",{href:"https://instagram.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"📸"}),e.jsx("a",{href:"https://youtube.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"▶"})]})]})]})]})})]})),ne=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],rt=["All","General","Examination","Admission","Holiday","Sports","Cultural","Academic"],Z=t=>t?.toDate?t.toDate():new Date(t||Date.now());function nt(){const[t,d]=o.useState([]),[g,w]=o.useState(!0),[c,y]=o.useState("All"),[b,j]=o.useState("All"),[a,x]=o.useState("All"),[f,S]=o.useState(""),v=s.navy,z=s.gold;o.useEffect(()=>{window.scrollTo(0,0);const i=P(O(L,"notices"),G("createdAt","desc"));return M(i,p=>{d(p.docs.map(l=>({id:l.id,...l.data()}))),w(!1)})},[]);const m=o.useMemo(()=>{const i=new Set(t.map(p=>Z(p.createdAt).getFullYear()));return["All",...Array.from(i).sort((p,l)=>l-p)]},[t]),k=o.useMemo(()=>t.filter(i=>{const p=Z(i.createdAt);return!(c!=="All"&&p.getFullYear()!==Number(c)||b!=="All"&&ne[p.getMonth()]!==b||a!=="All"&&(i.type||"General")!==a||f&&!i.text?.toLowerCase().includes(f.toLowerCase()))}),[t,c,b,a,f]),r=o.useMemo(()=>{const i={};return k.forEach(p=>{const l=Z(p.createdAt),n=`${ne[l.getMonth()]} ${l.getFullYear()}`;i[n]||(i[n]=[]),i[n].push(p)}),i},[k]);return e.jsxs("div",{style:{minHeight:"100vh",background:"#fff",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx("style",{children:`
        /* PREMIUM FILTER UI */
        .filter-container { background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px; margin-bottom: 40px; box-shadow: 0 10px 40px -10px rgba(15,23,42,0.05); }
        .search-wrapper { position: relative; flex: 1; }
        .search-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); font-size: 18px; opacity: 0.4; pointer-events: none; }
        .premium-input { width: 100%; padding: 15px 20px 15px 48px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; font-size: 15px; color: ${v}; font-family: inherit; font-weight: 600; outline: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-sizing: border-box; }
        .premium-input:focus { background: #fff; border-color: ${z}; box-shadow: 0 0 0 4px rgba(244,160,35,0.15); }
        .premium-input::placeholder { color: #94a3b8; font-weight: 500; }
        .filter-row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-top: 20px; padding-top: 20px; border-top: 1px dashed #e2e8f0; }
        .filter-label { font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1px; min-width: 80px; }
        .pill-group { display: flex; gap: 10px; flex-wrap: wrap; }
        .premium-pill { background: #f1f5f9; border: 1px solid transparent; color: #475569; padding: 8px 20px; border-radius: 50px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .premium-pill:hover { background: #e2e8f0; color: #0f172a; }
        .premium-pill.active { background: ${v}; color: #fff; box-shadow: 0 6px 15px rgba(15,35,71,0.2); transform: translateY(-2px); }
        .clear-btn { background: #fef2f2; color: #ef4444; border: none; padding: 15px 24px; border-radius: 14px; font-size: 14px; font-weight: 800; cursor: pointer; transition: 0.2s; white-space: nowrap; height: fit-content; }
        .clear-btn:hover { background: #fee2e2; }

        /* FLAT CARD */
        .flat-card { border: 1px solid #e2e8f0; background: #fff; border-radius: 16px; padding: 24px; margin-bottom: 16px; transition: all 0.2s; display: flex; align-items: flex-start; gap: 20px; }
        .flat-card:hover { background: #f8fafc; border-color: ${z}; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
      `}),e.jsxs("header",{style:{position:"relative",padding:"100px 20px 80px",background:"url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop') center/cover",borderBottom:"1px solid #e2e8f0"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:`linear-gradient(to right, ${v}f2, ${v}cc)`}}),e.jsx("div",{style:{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",backgroundSize:"30px 30px"}}),e.jsxs("div",{style:{position:"relative",zIndex:1,maxWidth:"1000px",margin:"0 auto"},children:[e.jsx("div",{style:{display:"inline-block",background:"rgba(244, 160, 35, 0.15)",color:z,padding:"6px 14px",borderRadius:"50px",fontSize:"12px",fontWeight:800,letterSpacing:"1px",marginBottom:"15px",border:"1px solid rgba(244, 160, 35, 0.3)"},children:"GURU NANAK COLLEGE"}),e.jsx("h1",{style:{color:"#fff",fontSize:"48px",fontWeight:900,margin:"0 0 15px",letterSpacing:"-1px"},children:"Notice Board"}),e.jsx("p",{style:{color:"#cbd5e1",fontSize:"18px",maxWidth:"600px",margin:0,lineHeight:1.6},children:"Official announcements, circulars, and administrative updates."})]})]}),e.jsx("div",{style:{maxWidth:"1000px",margin:"-40px auto 40px",position:"relative",zIndex:10,display:"flex",gap:"15px",padding:"0 20px",flexWrap:"wrap"},children:[{val:t.length,label:"Total Notices"},{val:t.filter(i=>i.isNew).length,label:"New Updates"},{val:m.length-1,label:"Years of Data"}].map((i,p)=>e.jsxs("div",{style:{flex:1,minWidth:"150px",background:"#fff",border:"1px solid #e2e8f0",borderRadius:"12px",padding:"20px",display:"flex",alignItems:"center",gap:"15px",boxShadow:"0 4px 15px rgba(0,0,0,0.02)"},children:[e.jsx("div",{style:{width:"4px",height:"40px",background:z,borderRadius:"4px"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"24px",fontWeight:900,color:v,lineHeight:1},children:i.val}),e.jsx("div",{style:{fontSize:"12px",color:"#64748b",fontWeight:700,marginTop:"4px",textTransform:"uppercase"},children:i.label})]})]},p))}),e.jsxs("div",{style:{maxWidth:"1000px",margin:"0 auto 80px",padding:"0 20px"},children:[e.jsxs("div",{className:"filter-container",children:[e.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("div",{className:"search-wrapper",children:[e.jsx("span",{className:"search-icon",children:"🔍"}),e.jsx("input",{className:"premium-input",value:f,onChange:i=>S(i.target.value),placeholder:"Search notices by title, keyword, or subject..."})]}),(c!=="All"||b!=="All"||a!=="All"||f)&&e.jsx("button",{className:"clear-btn",onClick:()=>{y("All"),j("All"),x("All"),S("")},children:"✕ Clear All"})]}),e.jsxs("div",{className:"filter-row",children:[e.jsx("div",{className:"filter-label",children:"Category"}),e.jsx("div",{className:"pill-group",children:rt.map(i=>e.jsx("button",{className:`premium-pill ${a===i?"active":""}`,onClick:()=>x(i),children:i},i))})]}),e.jsxs("div",{className:"filter-row",children:[e.jsx("div",{className:"filter-label",children:"Timeline"}),e.jsx("div",{className:"pill-group",children:m.map(i=>e.jsx("button",{className:`premium-pill ${c===String(i)?"active":""}`,onClick:()=>y(String(i)),children:i},i))})]})]}),g?e.jsx("div",{style:{textAlign:"center",padding:"40px",color:"#64748b",fontWeight:700},children:"Syncing Database..."}):k.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"60px",border:"2px dashed #cbd5e1",borderRadius:"16px",color:"#64748b"},children:[e.jsx("span",{style:{fontSize:"40px",display:"block",marginBottom:"10px"},children:"📭"}),"No notices match your advanced filter."]}):Object.entries(r).map(([i,p])=>e.jsxs("div",{style:{marginBottom:"40px"},children:[e.jsxs("h3",{style:{fontSize:"16px",fontWeight:900,color:v,borderBottom:"2px solid #e2e8f0",paddingBottom:"10px",marginBottom:"20px",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("span",{style:{color:z},children:"📅"})," ",i]}),p.map(l=>{const n=Z(l.createdAt);return e.jsxs("div",{className:"flat-card",children:[e.jsxs("div",{style:{textAlign:"center",minWidth:"65px",background:"#f1f5f9",border:"1px solid #e2e8f0",padding:"14px 10px",borderRadius:"12px"},children:[e.jsx("div",{style:{fontSize:"11px",fontWeight:800,color:"#64748b",textTransform:"uppercase"},children:ne[n.getMonth()]}),e.jsx("div",{style:{fontSize:"26px",fontWeight:900,color:v,lineHeight:1,marginTop:"4px"},children:n.getDate()})]}),e.jsxs("div",{style:{flex:1},children:[e.jsxs("div",{style:{display:"flex",gap:"10px",alignItems:"center",marginBottom:"10px"},children:[e.jsx("span",{style:{fontSize:"11px",fontWeight:800,padding:"4px 12px",background:"#f8fafc",border:"1px solid #cbd5e1",borderRadius:"50px",color:v,textTransform:"uppercase"},children:l.type||"General"}),l.isNew&&e.jsx("span",{style:{fontSize:"10px",fontWeight:900,color:"#fff",background:"#ef4444",padding:"3px 8px",borderRadius:"50px"},children:"NEW"})]}),e.jsx("div",{dangerouslySetInnerHTML:{__html:l.text},style:{fontSize:"15px",color:"#334155",lineHeight:1.6,fontWeight:500}}),l.link&&e.jsx("a",{href:l.link,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"6px",marginTop:"16px",fontSize:"13px",fontWeight:800,color:v,textDecoration:"none",background:"#f1f5f9",padding:"8px 16px",borderRadius:"8px",border:"1px solid #e2e8f0",transition:"all .2s"},onMouseOver:u=>{u.target.style.background=v,u.target.style.color="#fff"},onMouseOut:u=>{u.target.style.background="#f1f5f9",u.target.style.color=v},children:"📎 View Attachment Document"})]})]},l.id)})]},i))]})]})}const oe=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],it=["All","Document","Report","Syllabus","Circular","Result"],_={Document:{icon:"📄",bg:"#EBF0FF",text:"#1a365d",border:"#BED0FF",color:"#4a7fd4"},Report:{icon:"📊",bg:"#F0FFF4",text:"#1c4532",border:"#9AE6B4",color:"#38a169"},Syllabus:{icon:"📚",bg:"#FFFBEB",text:"#744210",border:"#FAF089",color:"#d69e2e"},Circular:{icon:"📋",bg:"#FFF5F5",text:"#742a2a",border:"#FEB2B2",color:"#e53e3e"},Result:{icon:"🏆",bg:"#E6FFFA",text:"#1d4044",border:"#81E6D9",color:"#319795"}},ae=t=>t?.toDate?t.toDate():new Date(t||Date.now()),xe=t=>{const d=ae(t);return`${d.getDate()} ${oe[d.getMonth()]} ${d.getFullYear()}`};function ot(){const[t,d]=o.useState([]),[g,w]=o.useState(!0),[c,y]=o.useState("All"),[b,j]=o.useState("All"),[a,x]=o.useState("All"),[f,S]=o.useState(""),[v,z]=o.useState("grid"),m=s.navy,k=s.gold;o.useEffect(()=>{window.scrollTo(0,0);const n=P(O(L,"pdfReports"),G("createdAt","desc"));return M(n,u=>{d(u.docs.map(N=>({id:N.id,...N.data()}))),w(!1)})},[]);const r=o.useMemo(()=>{const n=new Set(t.map(u=>ae(u.createdAt).getFullYear()));return["All",...Array.from(n).sort((u,N)=>N-u)]},[t]),i=o.useMemo(()=>{const n={};return t.forEach(u=>{const N=u.type||"Document";n[N]=(n[N]||0)+1}),n},[t]),p=o.useMemo(()=>t.filter(n=>{const u=ae(n.createdAt);return!(c!=="All"&&u.getFullYear()!==Number(c)||b!=="All"&&oe[u.getMonth()]!==b||a!=="All"&&(n.type||"Document")!==a||f&&!n.title?.toLowerCase().includes(f.toLowerCase()))}),[t,c,b,a,f]),l=o.useMemo(()=>{const n={};return p.forEach(u=>{const N=String(ae(u.createdAt).getFullYear());n[N]||(n[N]=[]),n[N].push(u)}),n},[p]);return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes spin{to{transform:rotate(360deg)}}
        .doc-fb{border:none;font-family:inherit;cursor:pointer;transition:all .15s}
        .doc-card-hover{transition:all .2s}
        .doc-card-hover:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(11,31,78,.13)!important}
        .doc-row-hover{transition:all .15s}
        .doc-row-hover:hover{background:#f8fafc!important;border-color:${k}55!important}
        .dl-btn-hover{transition:all .18s}
        .dl-btn-hover:hover{background:${k}!important;color:${m}!important}
      `}),e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"📁 Document Archive"}),e.jsx("p",{className:"hero-subtitle",children:"Syllabus, circulars, reports aur important documents — year aur type wise filter karo"})]})]}),e.jsx("div",{style:{maxWidth:"1000px",margin:"-80px auto 40px",padding:"20px",position:"relative",zIndex:10,background:"rgba(255,255,255,0.8)",backdropFilter:"blur(10px)",borderRadius:"16px",boxShadow:"0 10px 30px rgba(0,0,0,0.1)"},children:e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"},children:[Object.entries(i).map(([n,u])=>{const N=_[n]||{icon:"📄"};return e.jsxs("button",{onClick:()=>x(a===n?"All":n),style:{background:a===n?"#fffbeb":"#fff",border:`1px solid ${a===n?k:"#e2e8f0"}`,borderRadius:11,padding:"10px 18px",color:m,cursor:"pointer",textAlign:"center",transition:"all .2s"},children:[e.jsx("span",{style:{display:"block",fontSize:19},children:N.icon}),e.jsx("span",{style:{display:"block",fontSize:22,fontWeight:900,color:k,lineHeight:1},children:u}),e.jsx("span",{style:{display:"block",fontSize:11,color:"#64748b",marginTop:2,fontWeight:600},children:n})]},n)}),e.jsxs("div",{style:{background:"#fff",border:"1px solid #e2e8f0",borderRadius:11,padding:"10px 18px",textAlign:"center"},children:[e.jsx("span",{style:{display:"block",fontSize:19},children:"📂"}),e.jsx("span",{style:{display:"block",fontSize:22,fontWeight:900,color:k,lineHeight:1},children:t.length}),e.jsx("span",{style:{display:"block",fontSize:11,color:"#64748b",marginTop:2,fontWeight:600},children:"Total"})]})]})}),e.jsx("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"0 20px"},children:e.jsxs("main",{children:[e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",animationDelay:".1s"},children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:16},children:[e.jsxs("div",{style:{flex:1,minWidth:200,position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",opacity:.4,fontSize:16,pointerEvents:"none"},children:"🔍"}),e.jsx("input",{value:f,onChange:n=>S(n.target.value),placeholder:"Document search karo...",style:{width:"100%",padding:"10px 14px 10px 38px",border:"2px solid #e2e8f0",borderRadius:10,fontSize:14,fontFamily:"inherit",background:"#f8fafc",outline:"none",boxSizing:"border-box",transition:"border-color .2s"},onFocus:n=>n.target.style.borderColor=k,onBlur:n=>n.target.style.borderColor="#e2e8f0"})]}),e.jsxs("div",{style:{display:"flex",gap:7},children:[["grid","list"].map(n=>e.jsx("button",{className:"doc-fb",onClick:()=>z(n),style:{padding:"9px 16px",borderRadius:9,border:`2px solid ${v===n?m:"#e2e8f0"}`,background:v===n?m:"transparent",color:v===n?"#fff":"#718096",fontWeight:700,fontSize:12.5},children:n==="grid"?"⊞ Grid":"☰ List"},n)),e.jsx("span",{style:{background:"#f0f4ff",color:m,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800,alignSelf:"center"},children:p.length})]})]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"YEAR:"}),r.map(n=>e.jsx("button",{className:"doc-fb",onClick:()=>y(String(n)),style:{padding:"4px 14px",borderRadius:20,border:`2px solid ${c===String(n)?k:"#e2e8f0"}`,background:c===String(n)?k:"transparent",color:c===String(n)?m:"#718096",fontWeight:700,fontSize:12.5},children:n},n))]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"MONTH:"}),["All",...oe].map(n=>e.jsx("button",{className:"doc-fb",onClick:()=>j(n),style:{padding:"4px 10px",borderRadius:7,border:`1.5px solid ${b===n?m:"#e2e8f0"}`,background:b===n?m:"transparent",color:b===n?"#fff":"#718096",fontWeight:600,fontSize:12},children:n},n))]}),e.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"TYPE:"}),it.map(n=>{const u=_[n]||{bg:"#f4f7fa",text:"#4a5568",border:"#e2e8f0"};return e.jsxs("button",{className:"doc-fb",onClick:()=>x(n),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${a===n?u.border:"#e2e8f0"}`,background:a===n?u.bg:"transparent",color:a===n?u.text:"#718096",fontWeight:700,fontSize:12},children:[n!=="All"&&(_[n]?.icon||"📄")+" ",n]},n)}),(c!=="All"||b!=="All"||a!=="All"||f)&&e.jsx("button",{className:"doc-fb",onClick:()=>{y("All"),j("All"),x("All"),S("")},style:{padding:"4px 12px",borderRadius:20,border:"2px solid #FEB2B2",background:"#FFF5F5",color:"#e53e3e",fontWeight:700,fontSize:12},children:"✕ Clear"})]})]}),e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",marginTop:"30px",animationDelay:".2s"},children:[e.jsxs("h2",{className:"section-heading",children:["📚 Official Documents (",p.length,")"]}),e.jsx("div",{className:"heading-underline"}),g?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[e.jsx("div",{style:{width:40,height:40,border:`4px solid ${k}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"Documents load ho rahe hain..."})]}):p.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"50px 20px"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"📂"}),e.jsx("h3",{style:{color:m,fontWeight:800,margin:"0 0 6px"},children:"Koi document nahi mila"}),e.jsx("p",{style:{color:"#718096",fontSize:13.5},children:"Filter ya search change karo"})]}):v==="grid"?e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18},children:p.map(n=>{const u=_[n.type]||_.Document;return e.jsxs("div",{className:"doc-card-hover",style:{background:"#fff",borderRadius:14,overflow:"hidden",boxShadow:"0 4px 16px rgba(11,31,78,.06)",border:"1px solid #edf2f7"},children:[e.jsx("div",{style:{height:5,background:`linear-gradient(90deg,${m},${k})`}}),e.jsxs("div",{style:{padding:"18px 20px 16px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14},children:[e.jsx("div",{style:{width:50,height:50,borderRadius:12,background:u.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,border:`1px solid ${u.border}`},children:u.icon}),e.jsx("span",{style:{background:u.bg,color:u.text,border:`1px solid ${u.border}`,padding:"3px 11px",borderRadius:20,fontSize:11.5,fontWeight:700},children:n.type||"Document"})]}),e.jsx("h3",{style:{margin:"0 0 7px",fontSize:14.5,fontWeight:800,color:m,lineHeight:1.4},children:n.title}),e.jsxs("p",{style:{margin:"0 0 16px",fontSize:12,color:"#a0aec0",fontWeight:600},children:["📅 ",xe(n.createdAt)]}),e.jsx("a",{href:n.link,target:"_blank",rel:"noreferrer",className:"dl-btn-hover",style:{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:m,color:"#fff",padding:"10px 16px",borderRadius:9,fontSize:13.5,fontWeight:700,textDecoration:"none",border:"none"},children:"⬇️ Download / View"})]})]},n.id)})}):Object.entries(l).sort((n,u)=>u[0]-n[0]).map(([n,u])=>e.jsxs("div",{style:{marginBottom:28},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg,#16213e,#0a3d62)",color:k,borderRadius:8,padding:"5px 16px",fontWeight:800,fontSize:12.5,whiteSpace:"nowrap"},children:["📂 ",n]}),e.jsx("div",{style:{flex:1,height:1,background:"linear-gradient(90deg,#0f346044,transparent)"}}),e.jsxs("span",{style:{fontSize:11.5,color:"#a0aec0",fontWeight:700},children:[u.length," file",u.length>1?"s":""]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:u.map(N=>{const A=_[N.type]||_.Document;return e.jsxs("div",{className:"doc-row-hover",style:{background:"#fff",borderRadius:11,padding:"13px 16px",display:"flex",alignItems:"center",gap:13,border:"1px solid #edf2f7",boxShadow:"0 2px 8px rgba(11,31,78,.04)"},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:10,background:A.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:21,flexShrink:0,border:`1px solid ${A.border}`},children:A.icon}),e.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[e.jsx("div",{style:{fontWeight:700,fontSize:14.5,color:m,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:N.title}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:4,alignItems:"center"},children:[e.jsx("span",{style:{background:A.bg,color:A.text,border:`1px solid ${A.border}`,padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700},children:N.type||"Document"}),e.jsxs("span",{style:{fontSize:12,color:"#a0aec0"},children:["📅 ",xe(N.createdAt)]})]})]}),e.jsx("a",{href:N.link,target:"_blank",rel:"noreferrer",className:"dl-btn-hover",style:{display:"inline-flex",alignItems:"center",gap:6,background:m,color:"#fff",padding:"9px 18px",borderRadius:9,fontSize:13,fontWeight:700,textDecoration:"none",flexShrink:0,whiteSpace:"nowrap"},children:"⬇️ Open"})]},N.id)})})]},n))]})]})}),e.jsx("style",{children:`
        .download-btn { display:inline-block; background:#f8fafc; color:${m}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .download-btn:hover { background:${m}; color:#fff; border-color:${m}; }
      `})]})}const st=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],lt=["All","WORKSHOP","SEMINAR","CULTURAL","SPORTS","NSS","NCC","ACADEMIC"],ee={WORKSHOP:{icon:"🛠️",grad:"linear-gradient(135deg,#667eea,#764ba2)",light:"#FAF5FF",text:"#44337a",border:"#E9D8FD",color:"#805ad5"},SEMINAR:{icon:"🎤",grad:"linear-gradient(135deg,#f093fb,#f5576c)",light:"#FFF5F5",text:"#742a2a",border:"#FEB2B2",color:"#e53e3e"},CULTURAL:{icon:"🎭",grad:"linear-gradient(135deg,#4facfe,#00f2fe)",light:"#EBF8FF",text:"#1a365d",border:"#BED0FF",color:"#3182ce"},SPORTS:{icon:"🏆",grad:"linear-gradient(135deg,#43e97b,#38f9d7)",light:"#F0FFF4",text:"#1c4532",border:"#9AE6B4",color:"#38a169"},NSS:{icon:"🤝",grad:"linear-gradient(135deg,#fa709a,#fee140)",light:"#FFFBEB",text:"#744210",border:"#FAF089",color:"#d69e2e"},NCC:{icon:"🎖️",grad:"linear-gradient(135deg,#a18cd1,#fbc2eb)",light:"#FAF5FF",text:"#44337a",border:"#E9D8FD",color:"#805ad5"},ACADEMIC:{icon:"📚",grad:"linear-gradient(135deg,#a18cd1,#fbc2eb)",light:"#FAF5FF",text:"#44337a",border:"#E9D8FD",color:"#805ad5"}},fe=t=>t?.toDate?t.toDate():new Date(t||Date.now());function dt(){const[t,d]=o.useState([]),[g,w]=o.useState(!0),[c,y]=o.useState("upcoming"),[b,j]=o.useState("All"),[a,x]=o.useState("All"),[f,S]=o.useState("All"),[v,z]=o.useState(""),[m,k]=o.useState(null),r=s.navy,i=s.gold;o.useEffect(()=>{window.scrollTo(0,0);const h=P(O(L,"events"),G("createdAt","desc"));return M(h,I=>{d(I.docs.map(C=>({id:C.id,...C.data()}))),w(!1)})},[]);const p=o.useMemo(()=>t.filter(h=>h.status==="upcoming"),[t]),l=o.useMemo(()=>t.filter(h=>h.status!=="upcoming"),[t]),n=o.useMemo(()=>{const h=new Set(t.map(I=>fe(I.createdAt).getFullYear()));return["All",...Array.from(h).sort((I,C)=>C-I)]},[t]),u=o.useMemo(()=>t.filter(h=>!(c==="upcoming"&&h.status!=="upcoming"||c==="past"&&h.status==="upcoming"||b!=="All"&&h.type!==b||a!=="All"&&fe(h.createdAt).getFullYear()!==Number(a)||f!=="All"&&(h.month||"").toUpperCase()!==f.toUpperCase()||v&&!h.title?.toLowerCase().includes(v.toLowerCase()))),[t,c,b,a,f,v]),N=o.useMemo(()=>{const h={};return u.forEach(I=>{const C=I.month||"Other";h[C]||(h[C]=[]),h[C].push(I)}),h},[u]),A=p[0];return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes glow{0%,100%{box-shadow:0 8px 28px rgba(11,31,78,.1)}50%{box-shadow:0 8px 28px rgba(201,162,39,.25)}}
        .evt-fb{border:none;font-family:inherit;cursor:pointer;transition:all .15s}
        .evt-card{transition:all .22s}
        .evt-card:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(11,31,78,.13)!important}
        .evt-upcoming{animation:glow 3s ease-in-out infinite}
        .evt-img{transition:transform .4s}
        .evt-card:hover .evt-img{transform:scale(1.06)}
      `}),e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"🏛️ Campus Events"}),e.jsx("p",{className:"hero-subtitle",children:"Workshops, seminars, cultural fests aur khel-kud — saari activities ek jagah"})]})]}),e.jsx("div",{style:{maxWidth:"1000px",margin:"-80px auto 40px",padding:"20px",position:"relative",zIndex:10,background:"rgba(255,255,255,0.8)",backdropFilter:"blur(10px)",borderRadius:"16px",boxShadow:"0 10px 30px rgba(0,0,0,0.1)"},children:e.jsx("div",{style:{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"},children:[{val:t.length,label:"Total Events",icon:"📆"},{val:p.length,label:"Upcoming",icon:"🔜",hi:!0},{val:l.length,label:"Past Events",icon:"📜"},{val:[...new Set(t.map(h=>h.type))].filter(Boolean).length,label:"Types",icon:"🏷️"}].map((h,I)=>e.jsxs("div",{style:{background:h.hi?"#fffbeb":"#fff",border:`1px solid ${h.hi?i:"#e2e8f0"}`,borderRadius:11,padding:"10px 20px",textAlign:"center",transition:"all .2s",flex:1,minWidth:"150px"},children:[e.jsx("span",{style:{display:"block",fontSize:17},children:h.icon}),e.jsx("div",{style:{fontSize:24,fontWeight:900,color:h.hi?i:r,lineHeight:1,marginTop:2},children:h.val}),e.jsx("div",{style:{fontSize:11,color:"#64748b",marginTop:2,fontWeight:600},children:h.label})]},I))})}),e.jsx("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"0 20px"},children:e.jsxs("main",{children:[A&&e.jsx("section",{className:"glass-panel profile-section anim-slide-up",style:{padding:"18px 22px",animationDelay:".05s",border:`2px solid ${i}44`},children:(()=>{const h=ee[A.type]||{icon:"🏆",grad:`linear-gradient(135deg,${r},#1a3a7c)`,light:"#EBF0FF",text:"#1a365d"};return e.jsxs("div",{style:{display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:11,fontWeight:900,color:i,letterSpacing:1.5,textTransform:"uppercase",flexShrink:0},children:"⭐ Featured"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,background:`linear-gradient(135deg,${r},#1a3a7c)`,borderRadius:13,padding:"14px 20px",flex:1,minWidth:260},children:[e.jsx("div",{style:{width:50,height:50,borderRadius:11,background:h.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0},children:h.icon}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:5,flexWrap:"wrap"},children:[e.jsx("span",{style:{background:h.light,color:h.text,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:700},children:A.type}),A.day&&e.jsxs("span",{style:{background:`${i}22`,color:i,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:700},children:["📅 ",A.day," ",A.month]})]}),e.jsx("h3",{style:{margin:0,fontSize:17,fontWeight:800,color:"#fff"},children:A.title}),e.jsxs("p",{style:{margin:"3px 0 0",fontSize:12.5,color:"rgba(255,255,255,.55)"},children:["📍 ",A.location||"College Campus"]})]})]})]})})()}),e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",marginTop:"30px",animationDelay:".1s"},children:[e.jsx("div",{style:{display:"flex",gap:3,marginBottom:16,background:"#f4f7fa",borderRadius:11,padding:3,width:"fit-content"},children:[{id:"upcoming",label:"🔜 Upcoming",count:p.length},{id:"all",label:"📆 All",count:t.length},{id:"past",label:"📜 Past",count:l.length}].map(h=>e.jsxs("button",{className:"evt-fb",onClick:()=>y(h.id),style:{padding:"8px 18px",borderRadius:9,background:c===h.id?r:"transparent",color:c===h.id?"#fff":"#718096",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:7},children:[h.label,e.jsx("span",{style:{background:c===h.id?i:"#e2e8f0",color:c===h.id?r:"#718096",borderRadius:20,padding:"1px 8px",fontSize:11.5,fontWeight:800},children:h.count})]},h.id))}),e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:12},children:[e.jsxs("div",{style:{flex:1,minWidth:200,position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",opacity:.4,fontSize:16,pointerEvents:"none"},children:"🔍"}),e.jsx("input",{value:v,onChange:h=>z(h.target.value),placeholder:"Event search karo...",style:{width:"100%",padding:"10px 14px 10px 38px",border:"2px solid #e2e8f0",borderRadius:10,fontSize:14,fontFamily:"inherit",background:"#f8fafc",outline:"none",boxSizing:"border-box",transition:"border-color .2s"},onFocus:h=>h.target.style.borderColor=i,onBlur:h=>h.target.style.borderColor="#e2e8f0"})]}),e.jsxs("span",{style:{background:"#f0f4ff",color:r,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800},children:[u.length," events"]})]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"TYPE:"}),lt.map(h=>{const I=ee[h]||{light:"#f4f7fa",text:"#4a5568",border:"#e2e8f0"};return e.jsxs("button",{className:"evt-fb",onClick:()=>j(h),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${b===h&&I.border||"#e2e8f0"}`,background:b===h?I.light:"transparent",color:b===h?I.text:"#718096",fontWeight:700,fontSize:12},children:[h!=="All"&&(ee[h]?.icon||"")+" ",h]},h)})]}),e.jsxs("div",{style:{display:"flex",gap:14,flexWrap:"wrap",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"YEAR:"}),n.map(h=>e.jsx("button",{className:"evt-fb",onClick:()=>x(String(h)),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${a===String(h)?i:"#e2e8f0"}`,background:a===String(h)?i:"transparent",color:a===String(h)?r:"#718096",fontWeight:700,fontSize:12},children:h},h))]}),e.jsxs("div",{style:{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"MONTH:"}),["All",...st].map(h=>e.jsx("button",{className:"evt-fb",onClick:()=>S(h),style:{padding:"3px 9px",borderRadius:6,border:`1.5px solid ${f===h?r:"#e2e8f0"}`,background:f===h?r:"transparent",color:f===h?"#fff":"#718096",fontWeight:600,fontSize:11.5},children:h},h))]}),(b!=="All"||a!=="All"||f!=="All"||v)&&e.jsx("button",{className:"evt-fb",onClick:()=>{j("All"),x("All"),S("All"),z("")},style:{padding:"4px 12px",borderRadius:20,border:"2px solid #FEB2B2",background:"#FFF5F5",color:"#e53e3e",fontWeight:700,fontSize:12},children:"✕ Clear"})]})]}),e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",marginTop:"30px",animationDelay:".2s"},children:[e.jsxs("h2",{className:"section-heading",children:["📅 Events (",u.length,")"]}),e.jsx("div",{className:"heading-underline"}),g?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[e.jsx("div",{style:{width:40,height:40,border:`4px solid ${i}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"Events load ho rahe hain..."})]}):u.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"50px 20px"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"🎭"}),e.jsx("h3",{style:{color:r,fontWeight:800,margin:"0 0 6px"},children:"Koi event nahi mila"}),e.jsx("p",{style:{color:"#718096",fontSize:13.5},children:"Tab ya filter change karo"})]}):Object.entries(N).map(([h,I])=>e.jsxs("div",{style:{marginBottom:32},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:18},children:[e.jsxs("div",{style:{background:`linear-gradient(135deg,${r},#1a3a7c)`,color:i,borderRadius:9,padding:"6px 18px",fontWeight:900,fontSize:13.5,whiteSpace:"nowrap",boxShadow:`0 4px 14px ${r}22`},children:["📅 ",h]}),e.jsx("div",{style:{flex:1,height:2,background:`linear-gradient(90deg,${i}44,transparent)`}}),e.jsxs("span",{style:{fontSize:11.5,color:"#a0aec0",fontWeight:700},children:[I.length," event",I.length>1?"s":""]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18},children:I.map(C=>{const E=ee[C.type]||{icon:"🏆",grad:`linear-gradient(135deg,${r},#1a3a7c)`,light:"#EBF0FF",text:"#1a365d"},Y=C.status==="upcoming",q=m===C.id,U=(C.desc||"").replace(/<[^>]*>/g,"");return e.jsxs("div",{className:`evt-card${Y?" evt-upcoming":""}`,style:{background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:Y?"0 8px 28px rgba(11,31,78,.1)":"0 4px 16px rgba(11,31,78,.06)",border:Y?`2px solid ${i}`:"1px solid #edf2f7",position:"relative"},children:[C.imageUrl?e.jsxs("div",{style:{height:190,position:"relative",overflow:"hidden"},children:[e.jsx("img",{src:C.imageUrl,alt:C.title,className:"evt-img",style:{width:"100%",height:"100%",objectFit:"cover"},onError:V=>{V.target.parentElement.style.background=E.grad,V.target.style.display="none"}}),e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 50%,rgba(11,31,78,.75))"}}),e.jsxs("div",{style:{position:"absolute",top:12,left:12,background:"rgba(255,255,255,.92)",borderRadius:9,padding:"6px 10px",textAlign:"center",backdropFilter:"blur(4px)",minWidth:44},children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,color:"#718096",textTransform:"uppercase"},children:C.month}),e.jsx("div",{style:{fontSize:20,fontWeight:900,color:r,lineHeight:1},children:C.day||"?"})]}),e.jsxs("span",{style:{position:"absolute",top:12,right:12,background:E.light,color:E.text,padding:"4px 12px",borderRadius:20,fontSize:11.5,fontWeight:700},children:[E.icon," ",C.type]})]}):e.jsx("div",{style:{background:E.grad,padding:"20px 18px 16px"},children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{style:{background:"rgba(255,255,255,.22)",borderRadius:9,padding:"7px 10px",textAlign:"center",backdropFilter:"blur(4px)",minWidth:44},children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,color:"rgba(255,255,255,.7)",textTransform:"uppercase"},children:C.month||"?"}),e.jsx("div",{style:{fontSize:22,fontWeight:900,color:"#fff",lineHeight:1},children:C.day||"?"})]}),e.jsxs("span",{style:{background:"rgba(255,255,255,.22)",color:"#fff",padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:700,backdropFilter:"blur(4px)"},children:[E.icon," ",C.type]})]})}),Y&&e.jsx("div",{style:{background:"linear-gradient(135deg,#f6ad55,#ed8936)",color:"#fff",textAlign:"center",padding:"3px 0",fontSize:10.5,fontWeight:900,letterSpacing:.8},children:"🔜 UPCOMING EVENT"}),e.jsxs("div",{style:{padding:"16px 18px 18px"},children:[e.jsx("h3",{style:{margin:"0 0 6px",fontSize:15.5,fontWeight:800,color:r,lineHeight:1.35},children:C.title}),e.jsxs("p",{style:{margin:"0 0 10px",fontSize:12.5,color:"#718096",display:"flex",alignItems:"center",gap:5},children:[e.jsx("span",{children:"📍"})," ",C.location||"College Campus"]}),U&&e.jsxs(e.Fragment,{children:[e.jsx("p",{style:{margin:0,fontSize:13,color:"#4a5568",lineHeight:1.65},children:q?U:U.substring(0,100)+(U.length>100?"…":"")}),U.length>100&&e.jsx("button",{onClick:()=>k(q?null:C.id),style:{background:"none",border:"none",color:i,fontWeight:800,fontSize:12.5,cursor:"pointer",padding:"6px 0 0",fontFamily:"inherit"},children:q?"▲ Less":"▼ Read More"})]}),C.reportLink&&e.jsx("a",{href:C.reportLink,target:"_blank",rel:"noreferrer",className:"download-btn",style:{marginTop:12,display:"inline-flex",alignItems:"center",gap:6},children:"📄 PDF Report"})]})]},C.id)})})]},h))]})]})}),e.jsx("style",{children:`
        .download-btn { display:inline-block; background:#f8fafc; color:${r}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .download-btn:hover { background:${r}; color:#fff; border-color:${r}; }
      `})]})}const ct=t=>{try{return new Date(t).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}catch{return""}},pt=t=>{if(!t)return"";const d=t.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);if(!d)return"";const g=parseInt(d[1]||0),w=parseInt(d[2]||0),c=parseInt(d[3]||0);return g>0?`${g}:${String(w).padStart(2,"0")}:${String(c).padStart(2,"0")}`:`${w}:${String(c).padStart(2,"0")}`},ie=t=>{if(!t)return"0";const d=parseInt(t);return d>=1e6?(d/1e6).toFixed(1)+"M":d>=1e3?(d/1e3).toFixed(1)+"K":String(d)};function xt(){const[t,d]=o.useState(null),[g,w]=o.useState([]),[c,y]=o.useState(!1),[b,j]=o.useState(""),[a,x]=o.useState(null),[f,S]=o.useState("all"),v=s.navy,z=s.gold;o.useEffect(()=>(window.scrollTo(0,0),M(he(L,"settings","youtube"),i=>{i.exists()&&d(i.data())})),[]),o.useEffect(()=>{!t?.apiKey||!t?.channelId||m()},[t]);const m=async()=>{y(!0),j("");try{const{apiKey:i,channelId:p,maxResults:l=12}=t,u=await(await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${p}&key=${i}`)).json();if(u.error)throw new Error(u.error.message);const N=u.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;if(!N)throw new Error("Channel not found or no uploads");const h=await(await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${N}&maxResults=${l}&key=${i}`)).json();if(h.error)throw new Error(h.error.message);const I=h.items.map(Y=>Y.snippet.resourceId.videoId).join(","),E=await(await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${I}&key=${i}`)).json();if(E.error)throw new Error(E.error.message);w(E.items||[])}catch(i){j(i.message)}y(!1)},k=["all","seminar","cultural","sports","nss","ncc","workshop"],r=f==="all"?g:g.filter(i=>i.snippet?.title?.toLowerCase().includes(f)||i.snippet?.description?.toLowerCase().includes(f));return e.jsxs("div",{children:[e.jsx("style",{children:`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes yt-fadein { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .yt-card { transition: all .25s; border-radius: 16px; overflow: hidden; background: #fff; box-shadow: 0 4px 16px rgba(11,31,78,.07); border: 1px solid #edf2f7; animation: yt-fadein .4s ease both; }
        .yt-card:hover { transform: translateY(-5px); box-shadow: 0 14px 36px rgba(11,31,78,.13) !important; }
        .yt-thumb { position: relative; aspect-ratio: 16/9; overflow: hidden; }
        .yt-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
        .yt-card:hover .yt-thumb img { transform: scale(1.06); }
        .yt-play { position: absolute; inset: 0; background: rgba(11,31,78,.45); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .2s; }
        .yt-card:hover .yt-play { opacity: 1; }
        .yt-filter-btn { border: none; font-family: inherit; cursor: pointer; transition: all .15s; }
      `}),e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsxs("nav",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:14,fontSize:13,fontWeight:600},children:[e.jsx(T,{to:"/",style:{color:"rgba(255,255,255,.55)",textDecoration:"none"},children:"🏠 Home"}),e.jsx("span",{style:{color:"rgba(255,255,255,.3)"},children:"›"}),e.jsx("span",{style:{color:z},children:"Video Gallery"})]}),e.jsx("h1",{className:"hero-title",children:"▶ Video Gallery"}),e.jsx("p",{className:"hero-subtitle",children:"College ke latest events, seminars aur cultural programs — YouTube se live"}),e.jsx("div",{style:{display:"flex",gap:14,flexWrap:"wrap",marginTop:22},children:[{val:g.length,label:"Videos"},{val:ie(g.reduce((i,p)=>i+parseInt(p.statistics?.viewCount||0),0)),label:"Total Views"},{val:g.filter(i=>i.statistics?.likeCount>0).length,label:"With Likes"}].map((i,p)=>e.jsxs("div",{style:{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.18)",borderRadius:11,padding:"10px 20px",textAlign:"center",backdropFilter:"blur(8px)"},children:[e.jsx("div",{style:{fontSize:24,fontWeight:900,color:z,lineHeight:1},children:i.val}),e.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,.55)",marginTop:3},children:i.label})]},p))})]})]}),e.jsx("div",{style:{maxWidth:1280,margin:"0 auto",padding:"40px 20px"},children:t?.apiKey?c?e.jsxs("div",{style:{textAlign:"center",padding:"80px 20px"},children:[e.jsx("div",{style:{width:48,height:48,border:`4px solid ${z}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"YouTube se videos fetch ho rahi hain..."})]}):b?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px",background:"#fff5f5",borderRadius:16,border:"1px solid #fed7d7"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:12},children:"⚠️"}),e.jsx("h3",{style:{color:"#c53030",margin:"0 0 8px"},children:"API Error"}),e.jsx("p",{style:{color:"#718096"},children:b}),e.jsx("button",{onClick:m,style:{marginTop:16,padding:"10px 24px",background:v,color:"#fff",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer",fontSize:14},children:"🔄 Retry"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:32,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8},children:"FILTER:"}),k.map(i=>e.jsx("button",{className:"yt-filter-btn",onClick:()=>S(i),style:{padding:"6px 16px",borderRadius:20,border:`2px solid ${f===i?v:"#e2e8f0"}`,background:f===i?v:"transparent",color:f===i?"#fff":"#718096",fontWeight:700,fontSize:12.5,textTransform:"capitalize"},children:i==="all"?"🎬 All":i.charAt(0).toUpperCase()+i.slice(1)},i)),e.jsxs("span",{style:{marginLeft:"auto",background:"#f0f4ff",color:v,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800},children:[r.length," videos"]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:24},children:r.map((i,p)=>{const l=i.id,n=i.snippet||{},u=i.statistics||{},N=i.contentDetails||{},A=a===l;return e.jsxs("div",{className:"yt-card",style:{animationDelay:`${p*.06}s`},children:[e.jsx("div",{className:"yt-thumb",onClick:()=>x(A?null:l),style:{cursor:"pointer"},children:A?e.jsx("iframe",{src:`https://www.youtube.com/embed/${l}?autoplay=1`,title:n.title,allow:"autoplay; encrypted-media",allowFullScreen:!0,style:{width:"100%",height:"100%",border:"none",position:"absolute",inset:0}}):e.jsxs(e.Fragment,{children:[e.jsx("img",{src:n.thumbnails?.maxres?.url||n.thumbnails?.high?.url||n.thumbnails?.medium?.url,alt:n.title}),e.jsx("div",{className:"yt-play",children:e.jsx("div",{style:{width:56,height:56,borderRadius:"50%",background:"#ff0000",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(255,0,0,.4)"},children:e.jsx("span",{style:{color:"#fff",fontSize:20,marginLeft:4},children:"▶"})})}),N.duration&&e.jsx("div",{style:{position:"absolute",bottom:8,right:8,background:"rgba(0,0,0,.8)",color:"#fff",fontSize:11.5,fontWeight:700,padding:"3px 7px",borderRadius:5},children:pt(N.duration)})]})}),e.jsxs("div",{style:{padding:"16px 18px 18px"},children:[e.jsx("h3",{style:{margin:"0 0 8px",fontSize:15,fontWeight:800,color:v,lineHeight:1.4,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},children:n.title}),e.jsxs("p",{style:{margin:"0 0 12px",fontSize:12,color:"#a0aec0",fontWeight:600},children:["📅 ",ct(n.publishedAt)]}),e.jsxs("div",{style:{display:"flex",gap:14,fontSize:12,color:"#718096",fontWeight:700},children:[e.jsxs("span",{children:["👁 ",ie(u.viewCount)," views"]}),e.jsxs("span",{children:["👍 ",ie(u.likeCount)]}),e.jsx("span",{style:{marginLeft:"auto"},children:e.jsx("a",{href:`https://youtube.com/watch?v=${l}`,target:"_blank",rel:"noreferrer",style:{color:"#ff0000",fontWeight:800,textDecoration:"none",fontSize:12},children:"▶ YouTube →"})})]})]})]},l)})}),r.length===0&&e.jsxs("div",{style:{textAlign:"center",padding:"50px",color:"#a0aec0"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"🎬"}),e.jsx("p",{style:{fontWeight:600},children:"Is category mein koi video nahi"})]}),t?.channelId&&e.jsx("div",{style:{textAlign:"center",marginTop:40},children:e.jsx("a",{href:`https://youtube.com/channel/${t.channelId}`,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:10,background:"#ff0000",color:"#fff",padding:"14px 32px",borderRadius:50,fontWeight:900,fontSize:15,textDecoration:"none",boxShadow:"0 6px 20px rgba(255,0,0,.35)",transition:"all .2s"},onMouseEnter:i=>{i.currentTarget.style.transform="translateY(-3px)",i.currentTarget.style.boxShadow="0 10px 28px rgba(255,0,0,.45)"},onMouseLeave:i=>{i.currentTarget.style.transform="",i.currentTarget.style.boxShadow="0 6px 20px rgba(255,0,0,.35)"},children:"▶ Subscribe to Our Channel"})})]}):e.jsxs("div",{style:{textAlign:"center",padding:"80px 20px",background:"#fff",borderRadius:20,boxShadow:"0 8px 30px rgba(11,31,78,.07)"},children:[e.jsx("div",{style:{fontSize:60,marginBottom:16},children:"📺"}),e.jsx("h2",{style:{color:v,fontWeight:900,margin:"0 0 8px"},children:"YouTube Setup Required"}),e.jsx("p",{style:{color:"#64748b",fontSize:15},children:"Admin Panel mein जाएं → YouTube Manager tab → API Key aur Channel ID add karein."})]})})]})}function ft(){const[t,d]=o.useState([]),[g,w]=o.useState(()=>{try{return JSON.parse(sessionStorage.getItem("gnc_dismissed_alerts")||"[]")}catch{return[]}}),[c,y]=o.useState(!1),[b,j]=o.useState(0),[a,x]=o.useState(0),f=s.navy;o.useEffect(()=>{const m=P(O(L,"alerts"),We("isActive","==",!0));return M(m,k=>{const r=k.docs.map(p=>({id:p.id,...p.data()}));d(r),r.filter(p=>!g.includes(p.id)).length>0&&(j(0),setTimeout(()=>y(!0),1200))})},[]),o.useEffect(()=>{if(t.length<=1)return;const m=setInterval(()=>x(k=>(k+1)%t.length),4e3);return()=>clearInterval(m)},[t.length]);const S=m=>{const k=[...g,m];w(k),sessionStorage.setItem("gnc_dismissed_alerts",JSON.stringify(k)),t.filter(i=>!k.includes(i.id)).length>0?j(0):y(!1)},v=t.filter(m=>!g.includes(m.id)),z=v[b];return t[a%Math.max(t.length,1)],t.length===0?null:e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{background:"linear-gradient(90deg, #dc2626, #b91c1c, #dc2626)",color:"#fff",padding:"8px 0",overflow:"hidden",position:"relative",borderBottom:"2px solid #991b1b",zIndex:9998},children:[e.jsx("style",{children:`
          @keyframes gnc-scroll { 0% { transform: translateX(100vw); } 100% { transform: translateX(-100%); } }
          .gnc-alert-scroll { display: inline-block; white-space: nowrap; animation: gnc-scroll 18s linear infinite; }
          .gnc-alert-scroll:hover { animation-play-state: paused; }
        `}),e.jsxs("div",{className:"gnc-alert-scroll",style:{fontSize:13.5,fontWeight:700,letterSpacing:.3},children:["🚨  ",t.map((m,k)=>e.jsxs("span",{children:[m.text,k<t.length-1&&e.jsx("span",{style:{margin:"0 32px",opacity:.5},children:"•"})]},m.id)),"      "]})]}),c&&z&&e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:999999,background:"rgba(10,15,30,.75)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20},children:[e.jsx("style",{children:`
            @keyframes gnc-pop { from { opacity:0; transform:scale(.88) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
            .gnc-popup { animation: gnc-pop .35s cubic-bezier(.34,1.56,.64,1) both; }
            @keyframes gnc-ring { 0%,100%{transform:rotate(-8deg)} 50%{transform:rotate(8deg)} }
            .gnc-bell { display:inline-block; animation:gnc-ring .6s ease-in-out 3; }
          `}),e.jsxs("div",{className:"gnc-popup",style:{background:"#fff",borderRadius:20,maxWidth:520,width:"100%",boxShadow:"0 30px 80px rgba(0,0,0,.4)",overflow:"hidden"},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, #dc2626, #991b1b)",padding:"22px 28px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsx("span",{className:"gnc-bell",style:{fontSize:28},children:"🔔"}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"#fff",fontWeight:900,fontSize:17,letterSpacing:-.3},children:"Urgent Notice"}),e.jsx("div",{style:{color:"rgba(255,255,255,.6)",fontSize:12,marginTop:2},children:"Guru Nanak College, Dhanbad"})]})]}),e.jsx("button",{onClick:()=>{y(!1)},style:{background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.25)",color:"#fff",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s"},onMouseEnter:m=>m.currentTarget.style.background="rgba(255,255,255,.3)",onMouseLeave:m=>m.currentTarget.style.background="rgba(255,255,255,.15)",children:"✕"})]}),e.jsxs("div",{style:{padding:"28px 30px"},children:[e.jsx("p",{style:{fontSize:15.5,color:"#1e293b",lineHeight:1.75,fontWeight:500,margin:"0 0 24px"},children:z.text}),v.length>1&&e.jsx("div",{style:{display:"flex",gap:6,marginBottom:20},children:v.map((m,k)=>e.jsx("div",{onClick:()=>j(k),style:{width:k===b?20:8,height:8,borderRadius:4,background:k===b?"#dc2626":"#e2e8f0",cursor:"pointer",transition:"all .3s"}},m.id))}),e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsx("button",{onClick:()=>S(z.id),style:{flex:1,padding:"12px 20px",borderRadius:10,background:`linear-gradient(135deg, ${f}, #1a3a7c)`,color:"#fff",border:"none",fontWeight:800,fontSize:14,cursor:"pointer",transition:"all .2s"},onMouseEnter:m=>m.currentTarget.style.opacity=".9",onMouseLeave:m=>m.currentTarget.style.opacity="1",children:"✓ Acknowledged"}),e.jsx("button",{onClick:()=>y(!1),style:{padding:"12px 18px",borderRadius:10,background:"#f8fafc",color:"#64748b",border:"1px solid #e2e8f0",fontWeight:700,fontSize:14,cursor:"pointer"},children:"Later"})]})]})]})]})]})}const gt=o.lazy(()=>me(()=>import("./AdminPanel-CE3EMdYZ.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]))),ht=o.lazy(()=>me(()=>import("./Ticker-DvRvKRZR.js"),__vite__mapDeps([24,1,18,19,20,14,15,21,22,23,16,17,5,6,7,8,9,10,11,12,13]))),ge=["/syllabus","/about-us","/about-us/vision-mission","/about-us/principal-message","/about-us/college-management/organogram","/about-us/college-management/presidents","/about-us/college-management/secretaries","/about-us/college-management/principal","/about-us/various-committees/womens-cell","/about-us/various-committees/anti-ragging","/about-us/various-committees/sc-st","/about-us/various-committees/obc","/about-us/various-committees/grievance","/about-us/various-committees/icc","/about-us/various-committees/minority","/about-us/various-committees/placement","/about-us/various-committees/rusa","/about-us/college-staff/teaching-staff","/about-us/college-staff/non-teaching-staff","/about-us/regulations/bbmku/special-ug-regulation","/about-us/regulations/bbmku/ug-regulation-fyugp","/about-us/regulations/bbmku/ug-regulation-cbcs","/about-us/regulations/college-affiliation","/about-us/regulations/ugc-section","/about-us/regulations/vbu/ug-regulation-2015","/about-us/regulations/vbu/bca-regulation","/about-us/regulations/byelaws","/about-us/regulations/exemption","/about-us/audit-report","/campus/visuals/bhuda","/campus/visuals/bank-more","/campus/visuals/vocational-building","/campus/infrastructure","/campus/classroom","/campus/ict-rooms","/campus/green-campus","/academics/iqac","/academics/course-offered","/academics/departments/humanities","/academics/departments/social-science","/academics/departments/commerce","/academics/departments/bca","/academics/departments/bba","/academics/academic-calendar","/admission/rule","/admission/document-required","/admission/fee-structure","/admission/notification/latest","/admission/notification/upcoming","/admission/intake-capacity","/activity/nss","/activity/ncc","/activity/workshop","/activity/games-sports","/activity/collaboration/rotaract-club","/activity/collaboration/sadbhavana-diwas","/naac/ssr-1st-cycle/cycle-1-documents","/naac/ssr-1st-cycle/peer-team-report","/naac/ssr-2nd-cycle/cycle-2-documents","/naac/ssr-2nd-cycle/executive-summary","/naac/aqar","/naac/nirf","/naac/perspective-plan","/publication/college-library","/publication/e-magazine","/publication/examination-results/2024","/publication/examination-results/2023","/publication/sss-report/2023-24","/publication/sss-report/2022-23","/gallery"],mt=({pages:t})=>{const{slug:d}=Ne(),[g,w]=o.useState(null);return o.useEffect(()=>{if(t&&d){const c=t.find(y=>y.slug===d);w(c)}},[d,t]),!t||t.length===0?e.jsx("div",{style:{padding:"40px 20px",textAlign:"center"},children:"Loading pages..."}):e.jsx(be,{page:g})},ut=()=>e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",background:"#030b1a",color:"#10b981",fontFamily:"monospace",fontSize:16},children:"⚡ Initializing Secure Admin Panel..."}),bt=({notices:t,announcements:d,events:g,gallery:w,pdfReports:c,pages:y,sliderSlides:b,placeholderPaths:j,navLinks:a,faculties:x,placements:f,alerts:S})=>{const[v,z]=o.useState(()=>localStorage.getItem("isGncAdmin")==="true");return v?e.jsx(o.Suspense,{fallback:e.jsx(ut,{}),children:e.jsx(gt,{notices:t,announcements:d,events:g,gallery:w,pdfReports:c,pages:y,sliderSlides:b,placeholderPaths:j,navLinks:a,faculties:x,placements:f,alerts:S,onClose:()=>{z(!1),localStorage.removeItem("isGncAdmin"),window.close()}})}):e.jsx(Je,{onSuccess:()=>{z(!0),localStorage.setItem("isGncAdmin","true")},onClose:()=>window.close()})},yt=t=>t&&new DOMParser().parseFromString(t,"text/html").body.textContent||"";function vt(){const[t,d]=o.useState([]),[g,w]=o.useState([]),[c,y]=o.useState([]),[b,j]=o.useState([]),[a,x]=o.useState([]),[f,S]=o.useState([]),[v,z]=o.useState([]),[m,k]=o.useState([]),[r,i]=o.useState([]),[p,l]=o.useState([]),[n,u]=o.useState(null),N=se(),[A,h]=o.useState(!0),[I,C]=o.useState(window.innerWidth<768),E=N.pathname.startsWith("/admin");o.useEffect(()=>{const R=()=>C(window.innerWidth<768);return window.addEventListener("resize",R),()=>window.removeEventListener("resize",R)},[]),o.useEffect(()=>{const R=setTimeout(()=>h(!1),2e3);return()=>clearTimeout(R)},[]),o.useEffect(()=>{Ie.init({duration:800,easing:"ease-in-out",once:!1,mirror:!0,offset:50})},[]),o.useEffect(()=>M(he(L,"settings","navbar"),R=>{u(R.exists()&&R.data().links?.length>0?R.data().links:ce)}),[]);const Y=n||ce,q=o.useMemo(()=>{const R=f.filter(W=>W.slug&&(!W.path||W.path==="")).sort((W,D)=>(D.createdAt?.toMillis()||0)-(W.createdAt?.toMillis()||0)).map(W=>({label:W.title,href:`/p/${W.slug}`})),F=JSON.parse(JSON.stringify(Y));if(R.length>0){let W=F.find(D=>D.label.toLowerCase()==="more");W||(W={label:"More",href:"#",sub:[]},F.push(W)),W.sub||(W.sub=[]),R.forEach(D=>{W.sub.some($=>$.href===D.href)||W.sub.push(D)})}return F},[f,Y]),U=o.useMemo(()=>{const R=new Map;return[...f].sort((F,W)=>(W.createdAt?.toMillis()||0)-(F.createdAt?.toMillis()||0)).forEach(F=>{F.path&&!R.has(F.path)&&R.set(F.path,F)}),R},[f]);o.useEffect(()=>{const F=[["notices",d],["announcements",w],["events",y],["gallery",j],["pdfReports",x],["pages",S],["faculties",k],["placements",i],["alerts",l]].map(([D,$])=>{try{return M(P(O(L,D),G("createdAt","desc")),H=>$(H.docs.map(K=>({id:K.id,...K.data()}))))}catch{return M(P(O(L,D)),H=>$(H.docs.map(K=>({id:K.id,...K.data()}))))}});let W;try{const D=P(O(L,"sliderSlides"),G("order","asc"));W=M(D,$=>z($.docs.map(H=>({id:H.id,...H.data()}))),()=>{W=M(P(O(L,"sliderSlides"),G("createdAt","asc")),$=>z($.docs.map(H=>({id:H.id,...H.data()}))))})}catch{W=M(P(O(L,"sliderSlides"),G("createdAt","asc")),D=>z(D.docs.map($=>({id:$.id,...$.data()}))))}return()=>{F.forEach(D=>D()),W&&W()}},[]);const V=()=>window.open("#/admin","_blank"),ye=[...t.slice(0,3),...g.slice(0,2)].map(R=>({...R,text:yt(R.text||R.title)})),ve=p.filter(R=>R.isActive);return e.jsxs(e.Fragment,{children:[e.jsx(Te,{position:"top-right",gutter:12,containerStyle:{top:20,right:20,zIndex:999999},toastOptions:{style:{background:"rgba(15,35,71,0.85)",backdropFilter:"blur(12px)",color:"#fff",border:"1px solid rgba(255,255,255,0.15)",boxShadow:"0 8px 32px rgba(0,0,0,0.3)",padding:"16px",borderRadius:"14px",fontSize:"15px",fontWeight:"600"},success:{icon:"✅",duration:3e3},error:{icon:"❌",duration:4e3}}}),e.jsxs("div",{className:`splash-screen ${A?"":"hide"}`,children:[e.jsx("img",{src:"/gncollege-website/images/logo.png",alt:"Guru Nanak College",className:"splash-logo"}),e.jsx("div",{className:"splash-text",children:"Loading Portal..."})]}),!E&&e.jsxs(e.Fragment,{children:[e.jsx(Ke,{}),e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{height:"37px"}}),children:e.jsx(ht,{items:ye})}),ve.length>0&&e.jsx(ft,{}),e.jsx(qe,{onAdminClick:V,navLinks:q}),e.jsx(Qe,{}),!I&&e.jsx(Ze,{})]}),e.jsx("div",{className:E?"":"page-transition",children:e.jsxs(Se,{location:N,children:[e.jsx(B,{path:"/",element:e.jsx(Xe,{notices:t,announcements:g,pdfReports:a,sliderSlides:v,events:c,gallery:b,placements:r})}),e.jsx(B,{path:"/contact",element:e.jsx(tt,{})}),e.jsx(B,{path:"/about-us/college-profile",element:e.jsx(at,{})}),e.jsx(B,{path:"/notifications",element:e.jsx(nt,{})}),e.jsx(B,{path:"/documents",element:e.jsx(ot,{})}),e.jsx(B,{path:"/events",element:e.jsx(dt,{})}),e.jsx(B,{path:"/news",element:e.jsx(Pe,{})}),e.jsx(B,{path:"/video-gallery",element:e.jsx(xt,{})}),e.jsx(B,{path:"/about-us/college-staff/teaching-staff",element:e.jsx(de,{faculties:m,staffType:"Teaching"})}),e.jsx(B,{path:"/about-us/college-staff/non-teaching-staff",element:e.jsx(de,{faculties:m,staffType:"Non-Teaching"})}),e.jsx(B,{path:"/admin",element:e.jsx(bt,{notices:t,announcements:g,events:c,gallery:b,pdfReports:a,pages:f,sliderSlides:v,placeholderPaths:ge,navLinks:Y,faculties:m,placements:r,alerts:p})}),e.jsx(B,{path:"/p/:slug",element:e.jsx(mt,{pages:f})}),ge.map(R=>{const F=U.get(R);return e.jsx(B,{path:R,element:e.jsx(be,{page:F})},R)})]})},N.pathname),!E&&e.jsxs(e.Fragment,{children:[e.jsx(Ve,{}),e.jsx("button",{onClick:V,style:{position:"fixed",bottom:25,right:25,background:s.navy,color:"#fff",border:`3px solid ${s.gold}`,borderRadius:"50%",width:60,height:60,cursor:"pointer",zIndex:500,boxShadow:"0 6px 20px rgba(0,0,0,.25)"},children:e.jsx("span",{style:{fontSize:18},children:"⚙️"})})]})]})}function jt(){const t=se();return o.useEffect(()=>{"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.scrollTo(0,0)},[]),o.useEffect(()=>{const d=t.hash;if(d){const g=d.replace("#",""),w=document.getElementById(g);w&&w.scrollIntoView({behavior:"smooth"})}else window.scrollTo(0,0)},[t]),e.jsx(vt,{})}ke.createRoot(document.getElementById("root")).render(e.jsx(je.StrictMode,{children:e.jsx(ze,{children:e.jsx(jt,{})})}));export{s as C,me as _,L as d};
