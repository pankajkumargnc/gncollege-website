import{j as r}from"./react-B9mKIQH5.js";import{C as n}from"./index-Dp2ycvbX.js";import"./react-dom-D2vEXsJU.js";import"./scheduler-CWG1rEj-.js";import"./aos-B-Mw6r96.js";import"./react-hot-toast-Dhq_btiz.js";import"./goober-wofAfydu.js";import"./@firebase-CnFuAgCz.js";import"./idb-BXWtuYvb.js";import"./firebase-DuM2HiM-.js";import"./react-router-D5LUbJ5D.js";import"./dompurify-r8glNMJW.js";import"./html-react-parser-BjJRHc4P.js";import"./html-dom-parser-C9V9aTyI.js";import"./domhandler-C7h-c356.js";import"./domelementtype-CqltyNbl.js";import"./react-property-DkBHvQjb.js";import"./style-to-js-3xM98LKa.js";import"./style-to-object-Cg2xzs12.js";import"./inline-style-parser-BlqBsVO4.js";function N({items:i}){if(!i||i.length===0)return null;const e=Math.max(20,i.length*6);return r.jsxs("div",{style:{background:n.gold,color:"#000",padding:"8px 0",display:"flex",alignItems:"center",overflow:"hidden",borderBottom:"1px solid rgba(0,0,0,0.1)",zIndex:10},children:[r.jsx("style",{children:`
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
            animation: tickerScroll ${e}s linear infinite;
          }
          .ticker-track:hover { animation-play-state: paused; }
          .ticker-item {
            padding: 0 30px;
            font-weight: 600;
            font-size: 13.5px;
            color: #0f2347;
            white-space: nowrap;
          }
        `}),r.jsx("div",{className:"ticker-badge",children:"🚨 LATEST"}),r.jsx("div",{style:{flex:1,overflow:"hidden"},children:r.jsx("div",{className:"ticker-track",children:[...i,...i].map((t,o)=>r.jsxs("div",{className:"ticker-item",children:[r.jsx("span",{style:{color:"#d32f2f",marginRight:"8px"},children:"•"}),t.text||t.title]},o))})})]})}export{N as default};
