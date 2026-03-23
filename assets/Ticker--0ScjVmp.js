import{j as e}from"./vendor-react-CzOzt2PS.js";import{C as a}from"./page-gallery-DNLXrQFz.js";import"./vendor-firebase-CQO6Ah9N.js";function d({items:r}){if(!r||r.length===0)return null;const t=Math.max(20,r.length*6);return e.jsxs("div",{style:{background:a.gold,color:"#000",padding:"8px 0",display:"flex",alignItems:"center",overflow:"hidden",borderBottom:"1px solid rgba(0,0,0,0.1)",zIndex:10},children:[e.jsx("style",{children:`
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
            flex-shrink: 0;
          }
          .ticker-track {
            display: flex;
            width: max-content;
            animation: tickerScroll ${t}s linear infinite;
          }
          .ticker-track:hover { animation-play-state: paused; }
          .ticker-item {
            padding: 0 30px;
            font-weight: 600;
            font-size: 13.5px;
            color: #0f2347;
            white-space: nowrap;
          }
        `}),e.jsx("div",{className:"ticker-badge",children:"🚨 LATEST"}),e.jsx("div",{style:{flex:1,overflow:"hidden"},children:e.jsx("div",{className:"ticker-track",children:[...r,...r].map((i,n)=>e.jsxs("div",{className:"ticker-item",children:[e.jsx("span",{style:{color:"#d32f2f",marginRight:"8px"},children:"•"}),i.text||i.title]},n))})})]})}export{d as default};
