var z=Object.defineProperty;var y=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable;var j=(s,r,a)=>r in s?z(s,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):s[r]=a,w=(s,r)=>{for(var a in r||(r={}))P.call(r,a)&&j(s,a,r[a]);if(y)for(var a of y(r))J.call(r,a)&&j(s,a,r[a]);return s};import{r as x,j as e}from"./vendor-react-CzOzt2PS.js";import{q as L,j as E,c as T,d as I,a as R}from"./vendor-firebase-CzUb9nGw.js";const v={president:{icon:"🏛️",color:"#0f2347",accent:"#f4a023",label:"President",plural:"Presidents",subtitle:"Visionary leaders who shaped our institution"},secretary:{icon:"📋",color:"#1a3a7c",accent:"#f4a023",label:"Secretary",plural:"Secretaries",subtitle:"Dedicated administrators who guided our growth"},principal:{icon:"🎓",color:"#0f2347",accent:"#f4a023",label:"Principal",plural:"Principals",subtitle:"Academic leaders who nurtured excellence"}},h="/images/college_photo.jpg",A=`
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
`,g=(s,r)=>{const a=parseInt(s,10),d=(r==null?void 0:r.toLowerCase())==="present"?new Date().getFullYear():parseInt(r,10);if(!a||!d||isNaN(a)||isNaN(d))return null;const i=d-a;return i<=0?"< 1 yr":i===1?"1 yr":`${i} yrs`},p=s=>!s||s.toLowerCase()==="present",W=({type:s="president",title:r})=>{const[a,d]=x.useState([]),[i,b]=x.useState(!0),[c,u]=x.useState("timeline"),o=v[s]||v.president,k=r||`${o.plural} Over the Years`;x.useEffect(()=>{const t=L(T(I,"leadership"),E("type","==",s)),n=R(t,l=>{const S=l.docs.map(f=>w({id:f.id},f.data())).sort((f,C)=>parseInt(C.from||0)-parseInt(f.from||0));d(S),b(!1)},()=>b(!1));return()=>n()},[s]);const N=a.reduce((t,n)=>{const l=g(n.from,n.to);return!l||l==="< 1 yr"?t+1:t+parseInt(l,10)},0),m=a.find(t=>p(t.to));return e.jsxs("div",{className:"lp-wrap",style:{minHeight:"60vh",background:"#f8fafc"},children:[e.jsx("style",{children:A}),e.jsxs("div",{className:"lp-hero",children:[e.jsx("div",{className:"lp-hero-topbar"}),e.jsx("span",{className:"lp-hero-icon",children:o.icon}),e.jsx("h1",{children:k}),e.jsx("p",{className:"lp-hero-sub",children:o.subtitle}),e.jsx("div",{className:"lp-hero-line"}),e.jsx("span",{className:"lp-hero-badge",children:"Guru Nanak College, Dhanbad"})]}),e.jsxs("div",{className:"lp-content",children:[!i&&a.length>0&&e.jsxs("div",{className:"lp-stats",children:[e.jsxs("div",{className:"lp-stat",children:[e.jsx("div",{className:"lp-stat-num",children:a.length}),e.jsxs("div",{className:"lp-stat-label",children:["Total ",o.plural]})]}),e.jsxs("div",{className:"lp-stat",children:[e.jsxs("div",{className:"lp-stat-num",children:[N,"+"]}),e.jsx("div",{className:"lp-stat-label",children:"Years of Leadership"})]}),m&&e.jsxs("div",{className:"lp-stat",style:{flex:2,textAlign:"left",paddingLeft:20},children:[e.jsxs("div",{style:{fontSize:"0.75rem",color:"#94a3b8",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:4,fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"},children:["Current ",o.label]}),e.jsx("div",{style:{fontWeight:800,color:"#0f2347",fontSize:"1rem",fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"},children:m.name}),e.jsxs("div",{style:{fontSize:"0.8rem",color:"#64748b",marginTop:2,fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"},children:["Since ",m.from]})]})]}),!i&&a.length>0&&e.jsxs("div",{className:"lp-toggle-bar",style:{padding:"0 0 28px",justifyContent:"flex-start"},children:[e.jsxs("button",{className:`lp-toggle-btn${c==="timeline"?" active":""}`,onClick:()=>u("timeline"),children:[e.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",children:[e.jsx("circle",{cx:"3",cy:"4",r:"2",fill:"currentColor",opacity:".4"}),e.jsx("circle",{cx:"3",cy:"7.5",r:"2",fill:"currentColor",opacity:".4"}),e.jsx("circle",{cx:"3",cy:"11",r:"2",fill:"currentColor",opacity:".4"}),e.jsx("rect",{x:"7",y:"3",width:"8",height:"2",rx:"1",fill:"currentColor"}),e.jsx("rect",{x:"7",y:"6.5",width:"8",height:"2",rx:"1",fill:"currentColor"}),e.jsx("rect",{x:"7",y:"10",width:"8",height:"2",rx:"1",fill:"currentColor"})]}),"Timeline Cards"]}),e.jsxs("button",{className:`lp-toggle-btn${c==="table"?" active":""}`,onClick:()=>u("table"),children:[e.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:"13",height:"3",rx:"1",fill:"currentColor",opacity:".5"}),e.jsx("rect",{x:"1",y:"5.5",width:"13",height:"2.5",rx:"1",fill:"currentColor",opacity:".3"}),e.jsx("rect",{x:"1",y:"9.5",width:"13",height:"2.5",rx:"1",fill:"currentColor",opacity:".3"}),e.jsx("rect",{x:"1",y:"13",width:"13",height:"1",rx:".5",fill:"currentColor",opacity:".2"})]}),"Table View"]})]}),i&&e.jsx("div",{style:{paddingLeft:40},children:[1,2,3].map(t=>e.jsxs("div",{style:{background:"#fff",border:"1px solid #e8f0fa",borderRadius:14,padding:24,marginBottom:20,display:"flex",gap:18,alignItems:"flex-start",opacity:1-(t-1)*.2},children:[e.jsx("div",{style:{width:70,height:70,borderRadius:10,background:"#f1f5f9",flexShrink:0}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{height:18,width:"50%",background:"#f1f5f9",borderRadius:6,marginBottom:10}}),e.jsx("div",{style:{height:24,width:"30%",background:"#f4a02333",borderRadius:6,marginBottom:10}}),e.jsx("div",{style:{height:13,width:"70%",background:"#f1f5f9",borderRadius:4}})]})]},t))}),!i&&a.length===0&&e.jsxs("div",{className:"lp-empty",children:[e.jsx("span",{className:"lp-empty-icon",children:"📋"}),e.jsx("h3",{style:{color:"#64748b",fontWeight:700,fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"},children:"No records yet"}),e.jsxs("p",{style:{fontSize:14,margin:"6px 0 0"},children:["Admin Panel → Leadership tab → Add ",o.plural.toLowerCase()]})]}),!i&&a.length>0&&c==="timeline"&&e.jsx("div",{className:"lp-timeline",children:a.map((t,n)=>e.jsxs("div",{className:`lp-card${p(t.to)?" current":""}`,style:{animationDelay:`${n*.06}s`},children:[e.jsx("div",{className:"lp-dot"}),p(t.to)&&e.jsxs("div",{className:"lp-current-badge",children:[e.jsx("span",{className:"lp-current-dot"}),"Current ",o.label]}),e.jsxs("div",{className:"lp-card-inner",children:[e.jsx("img",{src:t.photo||h,alt:t.name,className:"lp-avatar",onError:l=>{l.target.src=h}}),e.jsxs("div",{className:"lp-card-body",children:[e.jsx("div",{className:"lp-card-name",children:t.name}),e.jsxs("div",{className:"lp-card-tenure",children:[e.jsxs("span",{children:["📅 ",t.from," – ",t.to||"Present"]}),g(t.from,t.to)&&e.jsx("span",{className:"lp-card-duration",children:g(t.from,t.to)})]}),t.note&&e.jsx("p",{className:"lp-card-note",children:t.note})]})]})]},t.id))}),!i&&a.length>0&&c==="table"&&e.jsx("div",{className:"lp-table-wrap",children:e.jsxs("table",{className:"lp-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#"}),e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Tenure"}),e.jsx("th",{children:"Duration"}),e.jsx("th",{children:"Note"})]})}),e.jsx("tbody",{children:a.map((t,n)=>e.jsxs("tr",{className:p(t.to)?"lp-row-current":"",children:[e.jsx("td",{style:{color:"#94a3b8",fontWeight:700,fontSize:"0.85rem",width:44},children:a.length-n}),e.jsx("td",{children:e.jsxs("div",{className:"lp-tname",children:[e.jsx("img",{src:t.photo||h,alt:t.name,className:"lp-tavatar",onError:l=>{l.target.src=h}}),e.jsxs("div",{children:[e.jsx("div",{children:t.name}),p(t.to)&&e.jsxs("div",{className:"lp-tcurrent",style:{marginTop:4},children:[e.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:"#4ade80",display:"inline-block"}}),"Current"]})]})]})}),e.jsx("td",{children:e.jsxs("span",{className:"lp-ttenure",children:[t.from," – ",t.to||"Present"]})}),e.jsx("td",{style:{color:"#64748b",fontWeight:600,whiteSpace:"nowrap"},children:g(t.from,t.to)||"—"}),e.jsx("td",{className:"lp-tnote",children:t.note||"—"})]},t.id))})]})})]})]})};export{W as default};
