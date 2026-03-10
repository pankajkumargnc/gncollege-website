import{j as r}from"./react-B9mKIQH5.js";import{C as o}from"./index-DhWdjOiU.js";import"./react-dom-D2vEXsJU.js";import"./scheduler-CWG1rEj-.js";import"./react-router-D5LUbJ5D.js";import"./@firebase-BgvoYcjG.js";import"./idb-BXWtuYvb.js";import"./firebase-DuuqqXcb.js";import"./aos-B-Mw6r96.js";import"./react-hot-toast-Dhq_btiz.js";import"./goober-wofAfydu.js";import"./dompurify-J9PU_gBl.js";import"./html-react-parser-BjJRHc4P.js";import"./html-dom-parser-C9V9aTyI.js";import"./domhandler-C7h-c356.js";import"./domelementtype-CqltyNbl.js";import"./react-property-DkBHvQjb.js";import"./style-to-js-3xM98LKa.js";import"./style-to-object-Cg2xzs12.js";import"./inline-style-parser-BlqBsVO4.js";function z({items:i}){return!i||i.length===0?null:r.jsxs("div",{style:{background:o.gold,color:"#000",padding:"8px 0",display:"flex",alignItems:"center",overflow:"hidden",borderBottom:"1px solid rgba(0,0,0,0.1)",zIndex:10,width:"100%",boxSizing:"border-box"},children:[r.jsx("style",{children:`
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
        `}),r.jsx("div",{className:"ticker-badge",children:"🚨 LATEST"}),r.jsx("div",{style:{flex:1,overflow:"hidden",minWidth:0},children:r.jsx("div",{className:"ticker-track",children:[...i,...i].map((t,e)=>r.jsxs("div",{className:"ticker-item",children:[r.jsx("span",{style:{color:"#d32f2f",marginRight:"8px"},children:"•"}),t.text||t.title]},e))})})]})}export{z as default};
