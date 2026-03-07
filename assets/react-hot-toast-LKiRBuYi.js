import{a as s}from"./react-B9mKIQH5.js";import{h as l,u as x,w as c,m as v}from"./goober-wofAfydu.js";var w=t=>typeof t=="function",f=(t,e)=>w(t)?t(e):t,$=(()=>{let t=0;return()=>(++t).toString()})(),E=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let e=matchMedia("(prefers-reduced-motion: reduce)");t=!e||e.matches}return t}})(),k=20,y="default",b=(t,e)=>{let{toastLimit:a}=t.settings;switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,a)};case 1:return{...t,toasts:t.toasts.map(r=>r.id===e.toast.id?{...r,...e.toast}:r)};case 2:let{toast:o}=e;return b(t,{type:t.toasts.find(r=>r.id===o.id)?1:0,toast:o});case 3:let{toastId:n}=e;return{...t,toasts:t.toasts.map(r=>r.id===n||n===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return e.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(r=>r.id!==e.toastId)};case 5:return{...t,pausedAt:e.time};case 6:let d=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+d}))}}},z=[],A={toasts:[],pausedAt:void 0,settings:{toastLimit:k}},p={},g=(t,e=y)=>{p[e]=b(p[e]||A,t),z.forEach(([a,o])=>{a===e&&o(p[e])})},h=t=>Object.keys(p).forEach(e=>g(t,e)),I=t=>Object.keys(p).find(e=>p[e].toasts.some(a=>a.id===t)),u=(t=y)=>e=>{g(e,t)},j=(t,e="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...a,id:a?.id||$()}),m=t=>(e,a)=>{let o=j(e,t,a);return u(o.toasterId||I(o.id))({type:2,toast:o}),o.id},i=(t,e)=>m("blank")(t,e);i.error=m("error");i.success=m("success");i.loading=m("loading");i.custom=m("custom");i.dismiss=(t,e)=>{let a={type:3,toastId:t};e?u(e)(a):h(a)};i.dismissAll=t=>i.dismiss(void 0,t);i.remove=(t,e)=>{let a={type:4,toastId:t};e?u(e)(a):h(a)};i.removeAll=t=>i.remove(void 0,t);i.promise=(t,e,a)=>{let o=i.loading(e.loading,{...a,...a?.loading});return typeof t=="function"&&(t=t()),t.then(n=>{let d=e.success?f(e.success,n):void 0;return d?i.success(d,{id:o,...a,...a?.success}):i.dismiss(o),n}).catch(n=>{let d=e.error?f(e.error,n):void 0;d?i.error(d,{id:o,...a,...a?.error}):i.dismiss(o)}),t};var D=l`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,P=l`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,L=l`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,O=c("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${D} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${P} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,S=l`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,F=c("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${S} 1s linear infinite;
`,N=l`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,T=l`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,C=c("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${N} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${T} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,H=c("div")`
  position: absolute;
`,M=c("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Q=l`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,R=c("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,W=({toast:t})=>{let{icon:e,type:a,iconTheme:o}=t;return e!==void 0?typeof e=="string"?s.createElement(R,null,e):e:a==="blank"?null:s.createElement(M,null,s.createElement(F,{...o}),a!=="loading"&&s.createElement(H,null,a==="error"?s.createElement(O,{...o}):s.createElement(C,{...o})))},Y=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Z=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,_="0%{opacity:0;} 100%{opacity:1;}",q="0%{opacity:1;} 100%{opacity:0;}",B=c("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,G=c("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,J=(t,e)=>{let a=t.includes("top")?1:-1,[o,n]=E()?[_,q]:[Y(a),Z(a)];return{animation:e?`${l(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${l(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};s.memo(({toast:t,position:e,style:a,children:o})=>{let n=t.height?J(t.position||e||"top-center",t.visible):{opacity:0},d=s.createElement(W,{toast:t}),r=s.createElement(G,{...t.ariaProps},f(t.message,t));return s.createElement(B,{className:t.className,style:{...n,...a,...t.style}},typeof o=="function"?o({icon:d,message:r}):s.createElement(s.Fragment,null,d,r))});v(s.createElement);x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var V=i;export{V as z};
