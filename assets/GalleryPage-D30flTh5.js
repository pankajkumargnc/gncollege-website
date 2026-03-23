var C=Object.defineProperty;var v=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,W=Object.prototype.propertyIsEnumerable;var j=(n,i,a)=>i in n?C(n,i,{enumerable:!0,configurable:!0,writable:!0,value:a}):n[i]=a,k=(n,i)=>{for(var a in i||(i={}))N.call(i,a)&&j(n,a,i[a]);if(v)for(var a of v(i))W.call(i,a)&&j(n,a,i[a]);return n};import{r as d,j as e,L as E,c as $}from"./vendor-react-CzOzt2PS.js";import{q as L,o as P,c as T,a as G,d as I}from"./vendor-firebase-CzUb9nGw.js";import{C as A}from"./page-about-CVuyh2O4.js";var S;const c=(S=A)==null?void 0:S.navy;var z;const g=(z=A)==null?void 0:z.gold,w=["All","Seminars","Cultural","NSS","Sports","Campus","Departments","Achievements"];function q({gallery:n}){const[i,a]=d.useState([]),[s,y]=d.useState("All"),[r,p]=d.useState(null),[f,h]=d.useState(!0);d.useEffect(()=>{if(window.scrollTo(0,0),n){a(n),h(!1);return}const t=L(T(I,"gallery"),P("createdAt","desc"));return G(t,l=>{a(l.docs.map(u=>k({id:u.id},u.data()))),h(!1)},()=>h(!1))},[n]);const o=s==="All"?i:i.filter(t=>t.cat===s),x=d.useCallback(()=>p(null),[]),m=d.useCallback(()=>p(t=>t>0?t-1:o.length-1),[o.length]),b=d.useCallback(()=>p(t=>t<o.length-1?t+1:0),[o.length]);return d.useEffect(()=>{if(r===null)return;const t=l=>{l.key==="Escape"&&x(),l.key==="ArrowLeft"&&m(),l.key==="ArrowRight"&&b()};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[r,x,m,b]),e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:'"Amazon Ember","Inter",sans-serif'},children:[e.jsx("style",{children:`
        /* glow card wrapper — same as homepage */
        .gc { position:relative; z-index:0; display:block; }
        .gc::before {
          content:''; position:absolute; inset:-3px; border-radius:inherit;
          background: conic-gradient(from 0deg,#a855f7,#ec4899,#f97316,#eab308,#06b6d4,#6366f1,#a855f7);
          opacity:0; filter:blur(10px); z-index:-1; transition:opacity .35s ease;
        }
        .gc:hover::before { opacity:.6; }
        .gc.r14 { border-radius:16px; }
        .gal-img-item {
          position:relative; border-radius:14px; overflow:hidden;
          aspect-ratio:4/3; cursor:pointer;
          box-shadow:0 4px 14px rgba(0,0,0,.06);
          transition:box-shadow .3s;
        }
        .gc:hover .gal-img-item { box-shadow:0 8px 24px rgba(0,0,0,.14); }
        .gal-img { width:100%; height:100%; object-fit:cover; transition:transform .5s ease; }
        .gc:hover .gal-img { transform:scale(1.08); }
        .gal-ov {
          position:absolute; inset:0;
          background:linear-gradient(to top,rgba(15,35,71,.88),transparent);
          opacity:0; transition:opacity .35s;
          display:flex; flex-direction:column; justify-content:flex-end; padding:16px;
        }
        .gc:hover .gal-ov { opacity:1; }
        .gal-cat {
          color:${g}; font-size:10px; font-weight:800; letter-spacing:.5px;
          transform:translateY(8px); opacity:0; transition:all .35s .05s;
        }
        .gal-ttl {
          color:#fff; font-size:13px; font-weight:700; margin-top:4px;
          transform:translateY(8px); opacity:0; transition:all .35s .12s;
        }
        .gc:hover .gal-cat, .gc:hover .gal-ttl { transform:translateY(0); opacity:1; }

        /* filter buttons */
        .gal-filter {
          padding:9px 20px; border-radius:50px;
          border:2px solid #e2e8f0; background:#fff;
          color:${c}; font-weight:700; font-size:13px;
          cursor:pointer; transition:all .2s;
          font-family:inherit;
        }
        .gal-filter:hover { border-color:${g}; transform:translateY(-2px); }
        .gal-filter.active {
          background:${c}; color:#fff; border-color:${c};
          box-shadow:0 5px 14px rgba(15,35,71,.2);
        }

        /* lightbox */
        .lb-ov {
          position:fixed; inset:0; z-index:9999999;
          background:rgba(6,14,28,.96); backdrop-filter:blur(8px);
          display:flex; align-items:center; justify-content:center;
        }
        .lb-img { max-width:90vw; max-height:85vh; border-radius:8px; box-shadow:0 30px 60px rgba(0,0,0,.5); }
        .lb-btn {
          position:fixed; top:50%; transform:translateY(-50%);
          background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.2);
          color:#fff; width:50px; height:50px; border-radius:50%; cursor:pointer;
          font-size:20px; display:flex; align-items:center; justify-content:center;
          transition:background .2s;
        }
        .lb-btn:hover { background:rgba(255,255,255,.25); }
        .lb-close {
          position:fixed; top:20px; right:20px;
          background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.2);
          color:#fff; width:42px; height:42px; border-radius:50%; cursor:pointer;
          font-size:18px; display:flex; align-items:center; justify-content:center;
        }

        @keyframes gal-fade { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        .gal-in { animation:gal-fade .5s ease both; }
      `}),e.jsxs("div",{style:{background:`linear-gradient(135deg,${c} 0%,#1a3a7c 100%)`,padding:"70px 20px 60px",textAlign:"center",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(244,160,35,.07) 1px, transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:4,background:g}}),e.jsxs("div",{style:{position:"relative",zIndex:1},children:[e.jsxs("nav",{style:{display:"flex",alignItems:"center",gap:8,justifyContent:"center",marginBottom:16,fontSize:13,fontWeight:600},children:[e.jsx(E,{to:"/",style:{color:"rgba(255,255,255,.5)",textDecoration:"none"},children:"🏠 Home"}),e.jsx("span",{style:{color:"rgba(255,255,255,.3)"},children:"›"}),e.jsx("span",{style:{color:g},children:"Photo Gallery"})]}),e.jsx("h1",{style:{color:"#fff",fontSize:"clamp(28px,5vw,48px)",fontWeight:900,margin:"0 0 12px",letterSpacing:"-1px"},children:"📸 Photo Gallery"}),e.jsx("p",{style:{color:"rgba(255,255,255,.65)",fontSize:15,maxWidth:520,margin:"0 auto 24px"},children:"Campus life, events, achievements aur college ke yaadgar pal"}),e.jsx("div",{style:{display:"flex",justifyContent:"center",gap:24,flexWrap:"wrap"},children:[{n:i.length+"+",l:"Total Photos"},{n:w.length-1,l:"Categories"}].map((t,l)=>e.jsxs("div",{style:{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.15)",borderRadius:10,padding:"10px 22px",backdropFilter:"blur(8px)"},children:[e.jsx("div",{style:{fontSize:22,fontWeight:900,color:g,lineHeight:1},children:t.n}),e.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,.55)",marginTop:3,fontWeight:600},children:t.l})]},l))})]})]}),e.jsxs("div",{style:{maxWidth:1300,margin:"0 auto",padding:"48px 20px"},children:[e.jsx("div",{style:{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap",marginBottom:40},children:w.map(t=>e.jsx("button",{className:`gal-filter${s===t?" active":""}`,onClick:()=>y(t),children:t==="All"?"📸 "+t:t},t))}),e.jsx("div",{style:{textAlign:"center",marginBottom:28},children:e.jsxs("span",{style:{background:`${c}12`,color:c,fontWeight:800,fontSize:13,padding:"5px 16px",borderRadius:20},children:[o.length," photo",o.length!==1?"s":"",s!=="All"?` in ${s}`:" total"]})}),f&&e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[e.jsx("div",{style:{width:44,height:44,border:`4px solid ${g}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}),e.jsx("p",{style:{color:"#94a3b8",fontWeight:600},children:"Gallery load ho rahi hai..."}),e.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg)}}"})]}),!f&&o.length>0&&e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14},children:o.map((t,l)=>e.jsx("div",{className:"gc r14 gal-in",style:{animationDelay:`${l%12*.04}s`},onClick:()=>p(l),children:e.jsxs("div",{className:"gal-img-item",children:[e.jsx("img",{src:t.src,alt:t.title||t.cat||"Gallery",className:"gal-img",loading:"lazy",decoding:"async"}),e.jsxs("div",{className:"gal-ov",children:[e.jsx("div",{className:"gal-cat",children:t.cat}),e.jsx("div",{className:"gal-ttl",children:t.title})]})]})},t.id))}),!f&&o.length===0&&e.jsxs("div",{style:{textAlign:"center",background:"#fff",padding:"60px 20px",borderRadius:16,border:"1px dashed #e2e8f0",maxWidth:500,margin:"0 auto"},children:[e.jsx("div",{style:{fontSize:48,marginBottom:14},children:"📸"}),e.jsx("h3",{style:{color:c,margin:"0 0 8px",fontWeight:800},children:s==="All"?"Gallery Empty":`${s} mein koi photo nahi`}),e.jsx("p",{style:{color:"#94a3b8",fontSize:13},children:s==="All"?"Admin Panel → Gallery tab se photos upload karein":"Doosri category select karein ya Admin Panel se photos add karein"}),s!=="All"&&e.jsx("button",{className:"gal-filter",style:{marginTop:16},onClick:()=>y("All"),children:"Show All Photos"})]})]}),r!==null&&o[r]&&$.createPortal(e.jsxs("div",{className:"lb-ov",onClick:x,children:[e.jsx("button",{className:"lb-close",onClick:x,children:"✕"}),o.length>1&&e.jsx("button",{className:"lb-btn",style:{left:20},onClick:t=>{t.stopPropagation(),m()},children:"‹"}),e.jsxs("div",{onClick:t=>t.stopPropagation(),style:{textAlign:"center"},children:[e.jsx("img",{src:o[r].src,alt:o[r].title||"Photo",className:"lb-img"}),(o[r].title||o[r].cat)&&e.jsxs("div",{style:{marginTop:14,color:"rgba(255,255,255,.8)",fontSize:14,fontWeight:600},children:[o[r].title,o[r].cat&&e.jsxs("span",{style:{color:g,marginLeft:8,fontSize:12},children:["#",o[r].cat]})]}),e.jsxs("div",{style:{marginTop:8,color:"rgba(255,255,255,.35)",fontSize:12},children:[r+1," / ",o.length,"  ·  ← → keys to navigate  ·  Esc to close"]})]}),o.length>1&&e.jsx("button",{className:"lb-btn",style:{right:20},onClick:t=>{t.stopPropagation(),b()},children:"›"})]}),document.body)]})}export{q as default};
