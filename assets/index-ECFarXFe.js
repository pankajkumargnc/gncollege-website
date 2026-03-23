const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPanel-DtK4_JC7.js","assets/vendor-admin-BHrqf5m3.js","assets/vendor-react-CMS5BYRq.js","assets/vendor-admin-_rRfbp4A.css","assets/vendor-firebase-CHlLNePr.js","assets/Ticker-BJ3mjO0o.js"])))=>i.map(i=>d[i]);
var Ai=Object.defineProperty,Ri=Object.defineProperties;var Wi=Object.getOwnPropertyDescriptors;var Jt=Object.getOwnPropertySymbols;var Ei=Object.prototype.hasOwnProperty,Ii=Object.prototype.propertyIsEnumerable;var kt=(t,i,n)=>i in t?Ai(t,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[i]=n,R=(t,i)=>{for(var n in i||(i={}))Ei.call(i,n)&&kt(t,n,i[n]);if(Jt)for(var n of Jt(i))Ii.call(i,n)&&kt(t,n,i[n]);return t},Y=(t,i)=>Ri(t,Wi(i));var St=(t,i,n)=>kt(t,typeof i!="symbol"?i+"":i,n);var Nt=(t,i,n)=>new Promise((a,s)=>{var c=d=>{try{f(n.next(d))}catch(l){s(l)}},r=d=>{try{f(n.throw(d))}catch(l){s(l)}},f=d=>d.done?a(d.value):Promise.resolve(d.value).then(c,r);f((n=n.apply(t,i)).next())});import{j as e,p as ut}from"./vendor-admin-BHrqf5m3.js";import{b as Bi,g as Ti,a as o,L as F,u as Pt,R as Mt,c as fi,d as xi,e as $i,f as A,H as Di}from"./vendor-react-CMS5BYRq.js";import{i as Fi,g as Pi,a as Mi,q as X,o as ne,c as K,b as M,d as Re,w as st}from"./vendor-firebase-CHlLNePr.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const r of c.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(s){if(s.ep)return;s.ep=!0;const c=n(s);fetch(s.href,c)}})();var Ke={},Qt;function Li(){if(Qt)return Ke;Qt=1;var t=Bi();return Ke.createRoot=t.createRoot,Ke.hydrateRoot=t.hydrateRoot,Ke}var Hi=Li();const Gi=Ti(Hi),Yi="modulepreload",_i=function(t){return"/gncollege-website/"+t},Zt={},gi=function(i,n,a){let s=Promise.resolve();if(n&&n.length>0){let d=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),f=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));s=d(n.map(l=>{if(l=_i(l),l in Zt)return;Zt[l]=!0;const u=l.endsWith(".css"),g=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${g}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":Yi,u||(m.as="script"),m.crossOrigin="",m.href=l,f&&m.setAttribute("nonce",f),document.head.appendChild(m),u)return new Promise((w,k)=>{m.addEventListener("load",w),m.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${l}`)))})}))}function c(r){const f=new Event("vite:preloadError",{cancelable:!0});if(f.payload=r,window.dispatchEvent(f),!f.defaultPrevented)throw r}return s.then(r=>{for(const f of r||[])f.status==="rejected"&&c(f.reason);return i().catch(c)})},Ui="917903340991",Oi="Namaste! Main Guru Nanak College ke baare mein jaankari chahta hoon.";function qi(){const[t,i]=o.useState(!1),n=`https://wa.me/${Ui}?text=${encodeURIComponent(Oi)}`;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
      `}),e.jsxs("a",{href:n,target:"_blank",rel:"noopener noreferrer",className:"wa-btn",onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),title:"WhatsApp pe contact karein",children:[t&&e.jsx("div",{className:"wa-label",children:"Chat with us!"}),e.jsx("div",{className:"wa-circle",children:e.jsx("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"white",children:e.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})})})]})]})}let Vi={data:""},Xi=t=>{if(typeof window=="object"){let i=(t?t.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return i.nonce=window.__nonce__,i.parentNode||(t||document.head).appendChild(i),i.firstChild}return t||Vi},Ki=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Ji=/\/\*[^]*?\*\/|  +/g,ei=/\n+/g,ue=(t,i)=>{let n="",a="",s="";for(let c in t){let r=t[c];c[0]=="@"?c[1]=="i"?n=c+" "+r+";":a+=c[1]=="f"?ue(r,c):c+"{"+ue(r,c[1]=="k"?"":i)+"}":typeof r=="object"?a+=ue(r,i?i.replace(/([^,])+/g,f=>c.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,f):f?f+" "+d:d)):c):r!=null&&(c=/^--/.test(c)?c:c.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=ue.p?ue.p(c,r):c+":"+r+";")}return n+(i&&s?i+"{"+s+"}":s)+a},xe={},hi=t=>{if(typeof t=="object"){let i="";for(let n in t)i+=n+hi(t[n]);return i}return t},Qi=(t,i,n,a,s)=>{let c=hi(t),r=xe[c]||(xe[c]=(d=>{let l=0,u=11;for(;l<d.length;)u=101*u+d.charCodeAt(l++)>>>0;return"go"+u})(c));if(!xe[r]){let d=c!==t?t:(l=>{let u,g,m=[{}];for(;u=Ki.exec(l.replace(Ji,""));)u[4]?m.shift():u[3]?(g=u[3].replace(ei," ").trim(),m.unshift(m[0][g]=m[0][g]||{})):m[0][u[1]]=u[2].replace(ei," ").trim();return m[0]})(t);xe[r]=ue(s?{["@keyframes "+r]:d}:d,n?"":"."+r)}let f=n&&xe.g?xe.g:null;return n&&(xe.g=xe[r]),((d,l,u,g)=>{g?l.data=l.data.replace(g,d):l.data.indexOf(d)===-1&&(l.data=u?d+l.data:l.data+d)})(xe[r],i,a,f),r},Zi=(t,i,n)=>t.reduce((a,s,c)=>{let r=i[c];if(r&&r.call){let f=r(n),d=f&&f.props&&f.props.className||/^go/.test(f)&&f;r=d?"."+d:f&&typeof f=="object"?f.props?"":ue(f,""):f===!1?"":f}return a+s+(r==null?"":r)},"");function bt(t){let i=this||{},n=t.call?t(i.p):t;return Qi(n.unshift?n.raw?Zi(n,[].slice.call(arguments,1),i.p):n.reduce((a,s)=>Object.assign(a,s&&s.call?s(i.p):s),{}):n,Xi(i.target),i.g,i.o,i.k)}let mi,$t,Dt;bt.bind({g:1});let he=bt.bind({k:1});function en(t,i,n,a){ue.p=i,mi=t,$t=n,Dt=a}function ve(t,i){let n=this||{};return function(){let a=arguments;function s(c,r){let f=Object.assign({},c),d=f.className||s.className;n.p=Object.assign({theme:$t&&$t()},f),n.o=/ *go\d+/.test(d),f.className=bt.apply(n,a)+(d?" "+d:"");let l=t;return t[0]&&(l=f.as||t,delete f.as),Dt&&l[0]&&Dt(f),mi(l,f)}return s}}var tn=t=>typeof t=="function",ft=(t,i)=>tn(t)?t(i):t,nn=(()=>{let t=0;return()=>(++t).toString()})(),ui=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let i=matchMedia("(prefers-reduced-motion: reduce)");t=!i||i.matches}return t}})(),an=20,Lt="default",bi=(t,i)=>{let{toastLimit:n}=t.settings;switch(i.type){case 0:return Y(R({},t),{toasts:[i.toast,...t.toasts].slice(0,n)});case 1:return Y(R({},t),{toasts:t.toasts.map(r=>r.id===i.toast.id?R(R({},r),i.toast):r)});case 2:let{toast:a}=i;return bi(t,{type:t.toasts.find(r=>r.id===a.id)?1:0,toast:a});case 3:let{toastId:s}=i;return Y(R({},t),{toasts:t.toasts.map(r=>r.id===s||s===void 0?Y(R({},r),{dismissed:!0,visible:!1}):r)});case 4:return i.toastId===void 0?Y(R({},t),{toasts:[]}):Y(R({},t),{toasts:t.toasts.filter(r=>r.id!==i.toastId)});case 5:return Y(R({},t),{pausedAt:i.time});case 6:let c=i.time-(t.pausedAt||0);return Y(R({},t),{pausedAt:void 0,toasts:t.toasts.map(r=>Y(R({},r),{pauseDuration:r.pauseDuration+c}))})}},ot=[],yi={toasts:[],pausedAt:void 0,settings:{toastLimit:an}},pe={},ji=(t,i=Lt)=>{pe[i]=bi(pe[i]||yi,t),ot.forEach(([n,a])=>{n===i&&a(pe[i])})},vi=t=>Object.keys(pe).forEach(i=>ji(t,i)),rn=t=>Object.keys(pe).find(i=>pe[i].toasts.some(n=>n.id===t)),yt=(t=Lt)=>i=>{ji(i,t)},sn={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},on=(t={},i=Lt)=>{let[n,a]=o.useState(pe[i]||yi),s=o.useRef(pe[i]);o.useEffect(()=>(s.current!==pe[i]&&a(pe[i]),ot.push([i,a]),()=>{let r=ot.findIndex(([f])=>f===i);r>-1&&ot.splice(r,1)}),[i]);let c=n.toasts.map(r=>{var f,d,l;return Y(R(R(R({},t),t[r.type]),r),{removeDelay:r.removeDelay||((f=t[r.type])==null?void 0:f.removeDelay)||(t==null?void 0:t.removeDelay),duration:r.duration||((d=t[r.type])==null?void 0:d.duration)||(t==null?void 0:t.duration)||sn[r.type],style:R(R(R({},t.style),(l=t[r.type])==null?void 0:l.style),r.style)})});return Y(R({},n),{toasts:c})},ln=(t,i="blank",n)=>Y(R({createdAt:Date.now(),visible:!0,dismissed:!1,type:i,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0},n),{id:(n==null?void 0:n.id)||nn()}),Oe=t=>(i,n)=>{let a=ln(i,t,n);return yt(a.toasterId||rn(a.id))({type:2,toast:a}),a.id},O=(t,i)=>Oe("blank")(t,i);O.error=Oe("error");O.success=Oe("success");O.loading=Oe("loading");O.custom=Oe("custom");O.dismiss=(t,i)=>{let n={type:3,toastId:t};i?yt(i)(n):vi(n)};O.dismissAll=t=>O.dismiss(void 0,t);O.remove=(t,i)=>{let n={type:4,toastId:t};i?yt(i)(n):vi(n)};O.removeAll=t=>O.remove(void 0,t);O.promise=(t,i,n)=>{let a=O.loading(i.loading,R(R({},n),n==null?void 0:n.loading));return typeof t=="function"&&(t=t()),t.then(s=>{let c=i.success?ft(i.success,s):void 0;return c?O.success(c,R(R({id:a},n),n==null?void 0:n.success)):O.dismiss(a),s}).catch(s=>{let c=i.error?ft(i.error,s):void 0;c?O.error(c,R(R({id:a},n),n==null?void 0:n.error)):O.dismiss(a)}),t};var dn=1e3,cn=(t,i="default")=>{let{toasts:n,pausedAt:a}=on(t,i),s=o.useRef(new Map).current,c=o.useCallback((g,m=dn)=>{if(s.has(g))return;let w=setTimeout(()=>{s.delete(g),r({type:4,toastId:g})},m);s.set(g,w)},[]);o.useEffect(()=>{if(a)return;let g=Date.now(),m=n.map(w=>{if(w.duration===1/0)return;let k=(w.duration||0)+w.pauseDuration-(g-w.createdAt);if(k<0){w.visible&&O.dismiss(w.id);return}return setTimeout(()=>O.dismiss(w.id,i),k)});return()=>{m.forEach(w=>w&&clearTimeout(w))}},[n,a,i]);let r=o.useCallback(yt(i),[i]),f=o.useCallback(()=>{r({type:5,time:Date.now()})},[r]),d=o.useCallback((g,m)=>{r({type:1,toast:{id:g,height:m}})},[r]),l=o.useCallback(()=>{a&&r({type:6,time:Date.now()})},[a,r]),u=o.useCallback((g,m)=>{let{reverseOrder:w=!1,gutter:k=8,defaultPosition:z}=m||{},p=n.filter(x=>(x.position||z)===(g.position||z)&&x.height),b=p.findIndex(x=>x.id===g.id),S=p.filter((x,h)=>h<b&&x.visible).length;return p.filter(x=>x.visible).slice(...w?[S+1]:[0,S]).reduce((x,h)=>x+(h.height||0)+k,0)},[n]);return o.useEffect(()=>{n.forEach(g=>{if(g.dismissed)c(g.id,g.removeDelay);else{let m=s.get(g.id);m&&(clearTimeout(m),s.delete(g.id))}})},[n,c]),{toasts:n,handlers:{updateHeight:d,startPause:f,endPause:l,calculateOffset:u}}},pn=he`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,fn=he`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,xn=he`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,gn=ve("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${pn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${fn} 0.15s ease-out forwards;
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
    animation: ${xn} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,hn=he`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,mn=ve("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${hn} 1s linear infinite;
`,un=he`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,bn=he`
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
}`,yn=ve("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${un} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${bn} 0.2s ease-out forwards;
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
`,jn=ve("div")`
  position: absolute;
`,vn=ve("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,wn=he`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,kn=ve("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${wn} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Sn=({toast:t})=>{let{icon:i,type:n,iconTheme:a}=t;return i!==void 0?typeof i=="string"?o.createElement(kn,null,i):i:n==="blank"?null:o.createElement(vn,null,o.createElement(mn,R({},a)),n!=="loading"&&o.createElement(jn,null,n==="error"?o.createElement(gn,R({},a)):o.createElement(yn,R({},a))))},Nn=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,zn=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,Cn="0%{opacity:0;} 100%{opacity:1;}",An="0%{opacity:1;} 100%{opacity:0;}",Rn=ve("div")`
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
`,Wn=ve("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,En=(t,i)=>{let n=t.includes("top")?1:-1,[a,s]=ui()?[Cn,An]:[Nn(n),zn(n)];return{animation:i?`${he(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${he(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},In=o.memo(({toast:t,position:i,style:n,children:a})=>{let s=t.height?En(t.position||i||"top-center",t.visible):{opacity:0},c=o.createElement(Sn,{toast:t}),r=o.createElement(Wn,R({},t.ariaProps),ft(t.message,t));return o.createElement(Rn,{className:t.className,style:R(R(R({},s),n),t.style)},typeof a=="function"?a({icon:c,message:r}):o.createElement(o.Fragment,null,c,r))});en(o.createElement);var Bn=({id:t,className:i,style:n,onHeightUpdate:a,children:s})=>{let c=o.useCallback(r=>{if(r){let f=()=>{let d=r.getBoundingClientRect().height;a(t,d)};f(),new MutationObserver(f).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[t,a]);return o.createElement("div",{ref:c,className:i,style:n},s)},Tn=(t,i)=>{let n=t.includes("top"),a=n?{top:0}:{bottom:0},s=t.includes("center")?{justifyContent:"center"}:t.includes("right")?{justifyContent:"flex-end"}:{};return R(R({left:0,right:0,display:"flex",position:"absolute",transition:ui()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${i*(n?1:-1)}px)`},a),s)},$n=bt`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Je=16,Dn=({reverseOrder:t,position:i="top-center",toastOptions:n,gutter:a,children:s,toasterId:c,containerStyle:r,containerClassName:f})=>{let{toasts:d,handlers:l}=cn(n,c);return o.createElement("div",{"data-rht-toaster":c||"",style:R({position:"fixed",zIndex:9999,top:Je,left:Je,right:Je,bottom:Je,pointerEvents:"none"},r),className:f,onMouseEnter:l.startPause,onMouseLeave:l.endPause},d.map(u=>{let g=u.position||i,m=l.calculateOffset(u,{reverseOrder:t,gutter:a,defaultPosition:i}),w=Tn(g,m);return o.createElement(Bn,{id:u.id,key:u.id,onHeightUpdate:l.updateHeight,className:u.visible?$n:"",style:w},u.type==="custom"?ft(u.message,u):s?s(u):o.createElement(In,{toast:u,position:g}))}))},ts=O;const j={navy:"#0f2347",navyDark:"#060e1c",gold:"#f4a023"};function Fn({onAdminClick:t,navLinks:i}){const[n,a]=o.useState(null),[s,c]=o.useState(null),[r,f]=o.useState(null),d=o.useRef(null),[l,u]=o.useState(window.innerWidth<1250),[g,m]=o.useState(!1),[w,k]=o.useState(!1);o.useEffect(()=>{const x=()=>{u(window.innerWidth<1250),window.innerWidth>=1250&&m(!1)};function h(){k(window.scrollY>40)}return window.addEventListener("resize",x),window.addEventListener("scroll",h),()=>{window.removeEventListener("resize",x),window.removeEventListener("scroll",h)}},[]);const z=x=>{n===x?(a(null),c(null),f(null)):(a(x),c(null),f(null))},p=x=>{s===x?(c(null),f(null)):(c(x),f(null))},b=x=>{f(r===x?null:x)},S=x=>x?x.startsWith("/#")?x.substring(2):x:"#";return e.jsxs("nav",{className:"glass-navbar",style:{position:"sticky",top:0,zIndex:99999,background:w?"rgba(255, 255, 255, 0.98)":"#ffffff",boxShadow:w?"0 10px 30px rgba(0, 0, 0, 0.15)":"0 4px 15px rgba(0,0,0,0.05)",backdropFilter:w?"blur(12px)":"none",WebkitBackdropFilter:w?"blur(12px)":"none",transition:"all 0.3s ease",width:"100%"},children:[e.jsx("style",{children:`
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
          background: linear-gradient(90deg, ${j.navy} 0%, #1e3a8a 30%, #d4af37 50%, #1e3a8a 70%, ${j.navy} 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shineText 5s linear infinite;
        }
        .clean-divider {
          border-left: 2.5px solid ${j.gold};
          border-radius: 2px;
        }
      `}),e.jsxs("div",{style:{width:"100%",maxWidth:"98%",margin:"0 auto",padding:"0 15px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:l?"5px":"20px"},children:[e.jsxs(F,{to:"/",style:{display:"flex",alignItems:"center",padding:"8px 0",flexShrink:0,textDecoration:"none",gap:l?"8px":"15px",marginLeft:l?"0":"-20px"},children:[e.jsx("div",{className:"logo-box-container",style:{background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:l?"45px":"75px",height:l?"45px":"75px"},children:e.jsx("img",{className:"spinning-logo",src:"/gncollege-website/images/logo.png",alt:"Guru Nanak College Logo",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{className:"clean-divider",style:{display:"flex",flexDirection:"column",justifyContent:"center",paddingLeft:l?"8px":"15px",textAlign:"left",alignItems:"flex-start"},children:[e.jsx("h1",{className:"shimmering-title",style:{margin:"0 0 5px 0",fontSize:l?"13px":"21.5px",fontWeight:"900",fontFamily:"Georgia, serif",whiteSpace:"nowrap",letterSpacing:l?"0px":"2.5px",textAlign:"left",lineHeight:"1.1"},children:"GURU NANAK COLLEGE, DHANBAD"}),!l&&e.jsx("p",{style:{margin:"0 0 3px 0",fontSize:"11px",color:"#475569",fontWeight:"700",whiteSpace:"nowrap",textAlign:"left"},children:"A Sikh Minority Degree College Established & Managed by Gurudwara Prabhandhak Committee, Dhanbad."}),e.jsx("p",{style:{margin:0,fontSize:l?"8.5px":"10.5px",color:j.gold,fontWeight:"800",letterSpacing:l?"0.2px":"1.8px",textTransform:"uppercase",whiteSpace:"nowrap",textAlign:"left"},children:l?"Est. 1970 | Dhanbad, Jharkhand":"Affiliated to Binod Bihari Mahto Koyalanchal University, Dhanbad."})]})]}),l&&e.jsx("button",{onClick:()=>m(!g),style:{background:"transparent",border:"none",color:j.navy,fontSize:28,cursor:"pointer",padding:"4px",flexShrink:0,zIndex:200},children:g?"✕":"☰"}),e.jsxs("div",{style:{display:l?g?"flex":"none":"flex",flexDirection:l?"column":"row",alignItems:l?"flex-start":"center",position:l?"absolute":"static",top:"100%",left:0,right:0,background:l?"rgba(255,255,255,0.98)":"transparent",padding:l?"10px 20px 20px":0,gap:l?10:0,boxShadow:l&&g?"0 10px 20px rgba(0,0,0,.15)":"none",maxHeight:l?"80vh":"auto",overflowY:l?"auto":"visible",flex:l?"unset":1,justifyContent:l?"flex-start":"flex-end",marginLeft:l?"0":"auto",marginRight:l?"0":"10px",borderTop:l&&g?"1px solid #eee":"none",zIndex:250},children:[(i||[]).map(x=>e.jsxs("div",{style:{position:"relative",width:l?"100%":"auto"},onMouseEnter:()=>{d.current&&clearTimeout(d.current),l||a(x.label)},onMouseLeave:()=>{l||(d.current=setTimeout(()=>{a(null),c(null),f(null)},200))},children:[e.jsxs("div",{onClick:()=>l&&x.sub&&z(x.label),style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:l&&x.sub?"pointer":"default"},children:[e.jsxs(F,{to:S(x.href),onClick:()=>{x.label==="Home"&&window.scrollTo(0,0)},style:{color:j.navy,padding:l?"12px 0":"24px 11px",display:"block",fontSize:13.5,fontWeight:700,whiteSpace:"nowrap",textDecoration:"none",transition:"all .2s",width:"100%"},children:[x.label==="Home"?"🏠 ":"",x.label]}),l&&x.sub&&e.jsx("span",{style:{color:j.navy,fontSize:20},children:n===x.label?"▴":"▾"}),!l&&x.sub&&e.jsx("span",{style:{color:j.navy,fontSize:11,marginLeft:2,marginRight:8,marginTop:2},children:"▾"})]}),x.sub&&n===x.label&&e.jsx("div",{style:{position:l?"static":"absolute",top:"100%",left:0,background:"#fff",minWidth:240,boxShadow:l?"none":"0 12px 30px rgba(0,0,0,.15)",borderTop:l?"none":"3px solid "+j.navy,borderRadius:l?8:"0 0 8px 8px",zIndex:200,padding:l?"5px 0":"8px 0"},children:x.sub.map(h=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!l&&c(h.label),onMouseLeave:()=>!l&&c(null),children:[e.jsxs("div",{onClick:y=>{l&&h.sub&&(y.stopPropagation(),p(h.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:l?"10px 16px":"10px 18px",borderBottom:l?"none":"1px solid #f8f9fa",cursor:l&&h.sub?"pointer":"default"},onMouseEnter:y=>{l||(y.currentTarget.style.background="#f4f6f9")},onMouseLeave:y=>{l||(y.currentTarget.style.background="transparent")},children:[e.jsx(F,{to:S(h.href),style:{fontSize:13,fontWeight:600,color:j.navy,display:"block",width:"100%",textDecoration:"none"},children:h.label}),h.sub&&e.jsx("span",{style:{fontSize:12,color:j.gold,marginLeft:8},children:l?s===h.label?"▴":"▾":"▶"})]}),h.sub&&s===h.label&&e.jsx("div",{style:{position:l?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:240,boxShadow:l?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:l?"none":"3px solid "+j.gold,borderRadius:l?4:"0 8px 8px 8px",margin:l?"0 16px 10px":0,borderLeft:l?"2px solid "+j.gold:"none"},children:h.sub.map(y=>e.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>!l&&f(y.label),onMouseLeave:()=>!l&&f(null),children:[e.jsxs("div",{onClick:N=>{l&&y.sub&&(N.stopPropagation(),b(y.label))},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderBottom:l?"none":"1px solid #f8f9fa",cursor:l&&y.sub?"pointer":"default"},onMouseEnter:N=>{l||(N.currentTarget.style.background="#f4f6f9")},onMouseLeave:N=>{l||(N.currentTarget.style.background="transparent")},children:[e.jsx(F,{to:S(y.href),style:{fontSize:12.5,fontWeight:600,color:"#444",display:"block",width:"100%",textDecoration:"none"},children:y.label}),y.sub&&e.jsx("span",{style:{fontSize:11,color:j.gold,marginLeft:8},children:l?r===y.label?"▴":"▾":"▶"})]}),y.sub&&r===y.label&&e.jsx("div",{style:{position:l?"static":"absolute",top:0,left:"100%",background:"#fff",minWidth:240,boxShadow:l?"none":"4px 4px 20px rgba(0,0,0,.15)",borderTop:l?"none":"3px solid "+j.navy,borderRadius:l?4:"0 8px 8px 8px",margin:l?"0 16px 10px":0,borderLeft:l?"2px solid "+j.navy:"none"},children:y.sub.map(N=>e.jsx(F,{to:S(N.href),style:{display:"block",padding:"10px 16px",fontSize:12,color:"#555",borderBottom:l?"none":"1px solid #f8f9fa",textDecoration:"none"},onMouseEnter:E=>{l||(E.currentTarget.style.background="#f4f6f9")},onMouseLeave:E=>{l||(E.currentTarget.style.background="transparent")},children:N.label},N.label))})]},y.label))})]},h.label))})]},x.label)),e.jsxs("button",{onClick:t,style:{flexShrink:0,background:j.gold,color:"#000",border:"none",padding:"7px 18px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:800,marginLeft:l?0:10,marginTop:l?12:0,width:l?"100%":"auto",boxShadow:"0 4px 15px rgba(244,160,35,0.3)",whiteSpace:"nowrap",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",transition:"all 0.3s ease"},onMouseEnter:x=>x.currentTarget.style.transform="translateY(-2px)",onMouseLeave:x=>x.currentTarget.style.transform="translateY(0)",children:[e.jsx("span",{style:{fontSize:16},children:"⚙️"})," Admin Login"]})]})]})]})}const xt=[{id:"facebook",label:"f",href:"https://facebook.com/gnc.dhanbad"},{id:"twitter",label:"t",href:"https://twitter.com/"},{id:"youtube",label:"y",href:"https://youtube.com/"},{id:"linkedin",label:"in",href:"https://linkedin.com/"}],Pn=[{name:"Class Rooms",emoji:"🏫"},{name:"Computer Lab",emoji:"💻"},{name:"Library",emoji:"📚"},{name:"Seminar Hall",emoji:"🎤"},{name:"Auditorium",emoji:"🎭"},{name:"Playground",emoji:"⚽"},{name:"Badminton Court",emoji:"🏸"},{name:"Gymnasium",emoji:"🏋️"},{name:"Digital Classrooms",emoji:"📱"},{name:"Cultural Dept.",emoji:"🎵"},{name:"Washroom (B)",emoji:"🚿"},{name:"Washroom (G)",emoji:"🚿"},{name:"Water Purifier",emoji:"💧"},{name:"Canteen",emoji:"🍽️"},{name:"Girls Common Room",emoji:"👩"},{name:"Online Lecture",emoji:"📡"}],Mn=[{label:"Home",href:"/"},{label:"About Us",href:"/",sub:[{label:"College Profile",href:"/about-us/college-profile"},{label:"Vision & Mission",href:"/about-us/vision-mission"},{label:"Principal Message",href:"/about-us/principal-message"},{label:"College Management",sub:[{label:"Organogram",href:"/about-us/college-management/organogram"},{label:"Presidents",href:"/about-us/college-management/presidents"},{label:"Secretaries",href:"/about-us/college-management/secretaries"},{label:"Principal",href:"/about-us/college-management/principal"}]},{label:"Various Committees",sub:[{label:"Women's Cell",href:"/about-us/various-committees/womens-cell"},{label:"Anti Ragging",href:"/about-us/various-committees/anti-ragging"},{label:"SC/ST",href:"/about-us/various-committees/sc-st"},{label:"OBC",href:"/about-us/various-committees/obc"},{label:"Grievance",href:"/about-us/various-committees/grievance"},{label:"ICC",href:"/about-us/various-committees/icc"},{label:"Minority",href:"/about-us/various-committees/minority"},{label:"Placement",href:"/about-us/various-committees/placement"},{label:"RUSA",href:"/about-us/various-committees/rusa"}]},{label:"College Staff",sub:[{label:"Teaching Staff",href:"/about-us/college-staff/teaching-staff"},{label:"Non-Teaching Staff",href:"/about-us/college-staff/non-teaching-staff"}]},{label:"Regulations",sub:[{label:"B.B.M.K. University Dhanbad",sub:[{label:"Special UG Regulation (CBCS) Session 2020-23",href:"/about-us/regulations/bbmku/special-ug-regulation"},{label:"UG Regulation (FYUGP)",href:"/about-us/regulations/bbmku/ug-regulation-fyugp"},{label:"UG Regulation (CBCS)",href:"/about-us/regulations/bbmku/ug-regulation-cbcs"}]},{label:"College Affiliation Paper B.B.M.K.U.",href:"/about-us/regulations/college-affiliation"},{label:"UGC Under Section 2(f) & 12(B)",href:"/about-us/regulations/ugc-section"},{label:"V.B.U. Hazaribag",sub:[{label:"UG Regulation 2015",href:"/about-us/regulations/vbu/ug-regulation-2015"},{label:"BCA Regulation",href:"/about-us/regulations/vbu/bca-regulation"}]},{label:"ByeLaws",href:"/about-us/regulations/byelaws"},{label:"Exemption",href:"/about-us/regulations/exemption"}]},{label:"Audit Report",href:"/about-us/audit-report"}]},{label:"Campus",href:"/",sub:[{label:"Campus Visuals",sub:[{label:"Bhuda",href:"/campus/visuals/bhuda"},{label:"Bank More",href:"/campus/visuals/bank-more"},{label:"Vocational Building",href:"/campus/visuals/vocational-building"}]},{label:"Infrastructure",href:"/campus/infrastructure"},{label:"Classroom",href:"/campus/classroom"},{label:"ICT Rooms",href:"/campus/ict-rooms"},{label:"Green Campus",href:"/campus/green-campus"}]},{label:"Academics",href:"/",sub:[{label:"IQAC",href:"/academics/iqac"},{label:"Course Offered",href:"/academics/course-offered"},{label:"Departments",sub:[{label:"Humanities",href:"/academics/departments/humanities"},{label:"Social Science",href:"/academics/departments/social-science"},{label:"Commerce",href:"/academics/departments/commerce"},{label:"BCA",href:"/academics/departments/bca"},{label:"BBA",href:"/academics/departments/bba"}]},{label:"Syllabus",href:"/syllabus"},{label:"Academic Calendar",href:"/academics/academic-calendar"}]},{label:"Admission",href:"/",sub:[{label:"Admission Rule",href:"/admission/rule"},{label:"Document Required",href:"/admission/document-required"},{label:"Fee Structure",href:"/admission/fee-structure"},{label:"Notification",sub:[{label:"Latest",href:"/admission/notification/latest"},{label:"Upcoming News",href:"/admission/notification/upcoming"}]},{label:"Intake Capacity",href:"/admission/intake-capacity"}]},{label:"Activity",href:"/",sub:[{label:"NSS",href:"/activity/nss"},{label:"NCC",href:"/activity/ncc"},{label:"Workshop",href:"/activity/workshop"},{label:"Game & Sports",href:"/activity/games-sports"},{label:"Collaboration",sub:[{label:"Rotaract Club",href:"/activity/collaboration/rotaract-club"},{label:"Sadbhavana Diwas",href:"/activity/collaboration/sadbhavana-diwas"}]}]},{label:"NAAC",href:"/",sub:[{label:"SSR 1st Cycle",sub:[{label:"Cycle 1 Documents",href:"/naac/ssr-1st-cycle/cycle-1-documents"},{label:"Peer Team Report",href:"/naac/ssr-1st-cycle/peer-team-report"}]},{label:"SSR 2nd Cycle",sub:[{label:"Cycle 2 Documents",href:"/naac/ssr-2nd-cycle/cycle-2-documents"},{label:"Executive Summary",href:"/naac/ssr-2nd-cycle/executive-summary"}]},{label:"AQAR",href:"/naac/aqar"},{label:"NIRF",href:"/naac/nirf"},{label:"Perspective Plan",href:"/naac/perspective-plan"}]},{label:"Publication",href:"/",sub:[{label:"College Library",href:"/publication/college-library"},{label:"E-Magazine",href:"/publication/e-magazine"},{label:"Examination Results",sub:[{label:"Result 2024",href:"/publication/examination-results/2024"},{label:"Result 2023",href:"/publication/examination-results/2023"}]},{label:"SSS Report",sub:[{label:"Report 2023-24",href:"/publication/sss-report/2023-24"},{label:"Report 2022-23",href:"/publication/sss-report/2022-23"}]}]},{label:"Gallery",href:"/gallery",sub:[{label:"Photo Gallery",href:"/gallery/photos"},{label:"Video Gallery",href:"/gallery/videos"}]},{label:"Contact Us",href:"/contact"}],Ln=()=>e.jsxs("footer",{className:"premium-footer",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"footer-grid",children:[e.jsxs("div",{className:"footer-widget",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"18px",marginBottom:"25px"},children:[e.jsx("div",{style:{width:"75px",height:"75px",background:"rgba(255,255,255,0.95)",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",padding:"8px",boxShadow:"0 10px 25px rgba(0,0,0,0.5)"},children:e.jsx("img",{src:"/gncollege-website/images/logo.png",alt:"GNC Logo",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center"},children:[e.jsx("h2",{style:{fontSize:"1.4rem",fontWeight:"900",color:"#fff",margin:"0 0 2px 0",lineHeight:"1.1"},children:"GURU NANAK"}),e.jsx("h2",{style:{fontSize:"1.4rem",fontWeight:"900",color:"#f4a023",margin:0,lineHeight:"1.1"},children:"COLLEGE"}),e.jsx("p",{style:{fontSize:"0.75rem",color:"#94a3b8",margin:"6px 0 0",fontWeight:"700",letterSpacing:"1.5px"},children:"DHANBAD, JHARKHAND"})]})]}),e.jsx("p",{className:"footer-desc",children:"A Sikh Minority Degree College established in 1970. We are dedicated to providing premium quality education and fostering holistic development based on the core teachings of Guru Nanak Dev Ji."}),e.jsx("div",{style:{display:"flex",gap:"12px"},children:xt&&xt.map(t=>e.jsx("a",{href:t.href,target:"_blank",rel:"noreferrer",className:"social-btn","aria-label":t.label,children:t.id==="twitter"?"𝕏":t.id==="youtube"?"▶":t.id==="facebook"?"f":t.id==="instagram"?"in":t.label.charAt(0)},t.id))})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Quick Links"}),e.jsx("ul",{className:"footer-links",children:[{label:"Home",path:"/"},{label:"College Profile",path:"/about-us/college-profile"},{label:"Admission Rules",path:"/admission/rule"},{label:"Courses Offered",path:"/academics/course-offered"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((t,i)=>e.jsx("li",{className:"footer-link-item",children:e.jsxs(F,{to:t.path,onClick:()=>window.scrollTo(0,0),className:"footer-link",children:[e.jsx("span",{children:"›"})," ",t.label]})},i))})]}),e.jsxs("div",{className:"footer-widget",children:[e.jsx("h3",{className:"footer-heading",children:"Get In Touch"}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"📍"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Main Campus"}),"Bhuda, Dhanbad,",e.jsx("br",{}),"Jharkhand - 826001, India"]})]}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"📞"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Phone Enquiries"}),e.jsx("a",{href:"tel:+917903340991",className:"contact-link",children:"+91 79033 40991"})]})]}),e.jsxs("div",{className:"contact-item",children:[e.jsx("div",{className:"contact-icon",children:"✉️"}),e.jsxs("div",{className:"contact-text",children:[e.jsx("strong",{children:"Email Us"}),e.jsx("a",{href:"mailto:principal@gncollege.org",className:"contact-link",children:"principal@gncollege.org"})]})]})]}),e.jsx("button",{className:"newsletter-btn",onClick:()=>alert("Newsletter coming soon!"),children:"Subscribe"})]}),e.jsx("div",{className:"footer-bottom",children:e.jsxs("div",{className:"footer-bottom-content",children:[e.jsxs("p",{className:"footer-copyright",children:["© ",new Date().getFullYear()," ",e.jsx("span",{style:{color:"#f4a023",fontWeight:"800"},children:"Guru Nanak College, Dhanbad"}),". All Rights Reserved."]}),e.jsx("p",{className:"footer-dev",children:"Designed & Developed dynamically with ❤️ By Pankaj Kumar"})]})})]}),Hn=()=>{const t={href:"https://wa.me/917903340991"};return e.jsxs("div",{style:{background:`linear-gradient(to right, ${j.navyDark}, #0a1832)`,color:"#e2e8f0",borderBottom:`1px solid ${j.gold}20`,width:"100%",maxWidth:"100vw",overflow:"hidden",boxSizing:"border-box"},children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"tb-wrap",children:[e.jsxs("div",{className:"tb-left",children:[e.jsxs("a",{href:"tel:+917903340991",className:"tb-link",children:[e.jsx("span",{style:{color:j.gold,fontSize:13},children:"📞"}),e.jsx("span",{children:"+91-7903340991"})]}),e.jsxs("a",{href:"mailto:principal@gncollege.org",className:"tb-link tb-email",children:[e.jsx("span",{style:{color:j.gold,fontSize:13},children:"✉️"}),e.jsx("span",{children:"principal@gncollege.org"})]})]}),e.jsxs("div",{className:"tb-right",children:[e.jsxs("div",{className:"tb-qlinks",children:[e.jsx("a",{href:"https://bbmkuniv.in/login",target:"_blank",rel:"noopener noreferrer",className:"tb-qbtn tb-res",children:"📋 Results"}),e.jsx("a",{href:"https://cimsstudentnewui.mastersofterp.in/",target:"_blank",rel:"noopener noreferrer",className:"tb-qbtn tb-fee",children:"💳 Fee Paymnet"}),e.jsx("a",{href:"https://jharkhanduniversities.nic.in/",target:"_blank",rel:"noopener noreferrer",className:"tb-qbtn tb-adm",children:"🎓 Apply Online"})]}),e.jsx("div",{className:"tb-div"}),xt.map(i=>{let n=i.label,a="";return i.id==="twitter"&&(n="𝕏"),i.id==="youtube"&&(n="▶",a="yt"),i.id==="facebook"&&(a="fb"),i.id==="linkedin"&&(a="li"),e.jsx("a",{href:i.href,target:"_blank",rel:"noopener noreferrer",className:`tb-soc ${a}`,"aria-label":i.id,children:n},i.id)}),e.jsx("a",{href:t.href,target:"_blank",rel:"noopener noreferrer",className:"tb-soc wa","aria-label":"whatsapp",children:"W"})]})]})]})},Gn=()=>{const t=Pt();let i=t.pathname;i==="/"&&t.hash.startsWith("#/")&&(i=t.hash.substring(1));const n=i.split("/").filter(a=>a);return n.length===0?null:e.jsx("div",{style:{background:"#f8f9fa",borderBottom:"1px solid #e0e0e0"},children:e.jsxs("div",{style:{maxWidth:"1400px",margin:"0 auto",padding:"12px 20px",fontSize:"13.5px",color:"#666",display:"flex",alignItems:"center",fontWeight:"500"},children:[e.jsxs(F,{to:"/",style:{color:j.navy,textDecoration:"none",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{children:"🏠"})," Home"]}),n.map((a,s)=>{const c=`/${n.slice(0,s+1).join("/")}`,r=s===n.length-1,f=a.replace(/-/g," ").replace(/\b\w/g,d=>d.toUpperCase());return e.jsxs("span",{style:{display:"flex",alignItems:"center"},children:[e.jsx("span",{style:{margin:"0 10px",color:"#ccc",fontSize:"10px"},children:"❯"}),r?e.jsx("span",{style:{color:j.gold,fontWeight:"700"},children:f}):e.jsx(F,{to:c,style:{color:j.navy,textDecoration:"none"},children:f})]},c)})]})})},Qe=j.navy,ti=j.gold,Yn=[{label:"Principal Message",icon:"👨‍🏫",href:"#/about-us/principal-message"},{label:"Admission Rules",icon:"🎓",href:"#/admission/rule"},{label:"Departments",icon:"🏛️",href:"#/academics/course-offered"},{label:"NSS / NCC",icon:"🎖️",href:"#/activity/nss"},{label:"Syllabus",icon:"📚",href:"#/syllabus"},{label:"Photo Gallery",icon:"📸",href:"#/gallery"},{label:"Contact Us",icon:"📞",href:"#/contact"}];function _n(){const[t,i]=o.useState(()=>window.innerWidth<=768),[n,a]=o.useState(!1),[s,c]=o.useState(null);o.useEffect(()=>{const u=()=>{const g=window.innerWidth<=768;i(g),g||a(!1)};return window.addEventListener("resize",u,{passive:!0}),()=>window.removeEventListener("resize",u)},[]);const r=o.useCallback(()=>{t&&a(!1)},[t]),f=58,d=200,l=32;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
          width:${l}px; height:88px;
          background:${Qe};
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
        .qan-toggle:hover { background:${ti}; color:${Qe}; }

        /* ── Sidebar ── */
        .qan-sidebar {
          position:fixed;
          /* Keep sidebar LEFT of toggle button */
          right:${l}px;
          top:50%;
          z-index:999;               /* below toggle */
          display:flex; flex-direction:column;
          gap:5px;
          transform:translateY(-50%);
          transition:transform .35s cubic-bezier(.4,0,.2,1),
                     opacity   .3s ease;
        }
        .qan-sidebar.mobile-closed {
          transform:translateY(-50%) translateX(calc(100% + ${l}px));
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
      `}),t&&e.jsxs("button",{className:"qan-toggle",onClick:()=>a(u=>!u),"aria-label":n?"Close quick links":"Open quick links","aria-expanded":n,children:[e.jsx("span",{style:{fontSize:20,lineHeight:1},children:n?"✕":"≡"}),!n&&e.jsx("span",{style:{fontSize:8,fontWeight:800,letterSpacing:.5,writingMode:"vertical-rl",textTransform:"uppercase",opacity:.7,marginTop:4},children:"LINKS"})]}),e.jsx("div",{className:t?`qan-sidebar ${n?"":"mobile-closed"}`:"qan-sidebar desktop",children:Yn.map((u,g)=>e.jsxs("a",{href:u.href,className:`qan-item${n||!t?" anim":""}`,onClick:r,onMouseEnter:()=>c(g),onMouseLeave:()=>c(null),style:{width:s===g?`${d}px`:`${f}px`,background:s===g?ti:Qe,color:s===g?Qe:"#fff",boxShadow:s===g?"-5px 5px 16px rgba(0,0,0,.22)":"-2px 2px 8px rgba(0,0,0,.12)",animationDelay:`${g*.07}s`,paddingLeft:"13px",paddingRight:"10px"},children:[e.jsx("span",{style:{fontSize:20,minWidth:30,textAlign:"center",display:"block",flexShrink:0},children:u.icon}),e.jsx("span",{style:{fontWeight:800,fontSize:13,marginLeft:10,flexShrink:0,opacity:s===g?1:0,transform:s===g?"translateX(0)":"translateX(8px)",transition:"opacity .25s ease .05s, transform .25s ease .05s",pointerEvents:"none"},children:u.label})]},g))})]})}const ii={HomePage:{icon:"🏠",msg:"Home page load nahi ho saka."},EventsPage:{icon:"🏆",msg:"Events section mein kuch gadbad."},NotificationsPage:{icon:"📢",msg:"Notice board load nahi ho saka."},DocumentsPage:{icon:"📁",msg:"Documents section mein error."},NewsPage:{icon:"📣",msg:"News section load nahi ho saka."},VideoGallery:{icon:"▶️",msg:"Video gallery load nahi ho saka."},StaffPage:{icon:"👨‍🏫",msg:"Staff directory mein kuch gadbad."},CollegeProfile:{icon:"🏛️",msg:"College profile load nahi ho saka."},Contact:{icon:"📞",msg:"Contact page load nahi ho saka."},PageViewer:{icon:"📄",msg:"Page content load nahi ho saka."},PlacementsSection:{icon:"🎓",msg:"Placements section mein error."},AlertBanner:{icon:"🔔",msg:""},DEFAULT:{icon:"⚠️",msg:"Kuch gadbad ho gayi."}};class Un extends Mt.Component{constructor(n){super(n);St(this,"handleReset",()=>{this.setState({hasError:!1,errorMsg:"",errorStack:""})});this.state={hasError:!1,errorMsg:"",errorStack:""}}static getDerivedStateFromError(n){return{hasError:!0,errorMsg:(n==null?void 0:n.message)||"Unknown error",errorStack:(n==null?void 0:n.stack)||""}}componentDidCatch(n,a){}render(){if(!this.state.hasError)return this.props.children;const n=this.props.page||"DEFAULT",a=ii[n]||ii.DEFAULT,s=j.navy;return this.props.minimal?null:e.jsx("div",{style:{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 20px",background:"#f8fafc",fontFamily:"'DM Sans', sans-serif"},children:e.jsxs("div",{style:{textAlign:"center",background:"#fff",borderRadius:"20px",padding:"50px 40px",maxWidth:"480px",width:"100%",boxShadow:"0 10px 40px rgba(0,0,0,0.06)",border:"1px solid #e2e8f0"},children:[e.jsx("div",{style:{fontSize:"52px",marginBottom:"16px"},children:a.icon}),e.jsx("h2",{style:{color:s,fontSize:"20px",fontWeight:900,margin:"0 0 10px",letterSpacing:"-0.3px"},children:"Oops! Something went wrong"}),e.jsxs("p",{style:{color:"#64748b",fontSize:"14px",margin:"0 0 24px",lineHeight:1.6},children:[a.msg," Please try again or refresh the page."]}),!1,e.jsxs("div",{style:{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"},children:[e.jsx("button",{onClick:this.handleReset,style:{background:`linear-gradient(135deg, ${s}, #1a3a7c)`,color:"#fff",border:"none",borderRadius:"10px",padding:"11px 24px",fontSize:"14px",fontWeight:800,cursor:"pointer",fontFamily:"inherit",transition:"opacity .2s"},onMouseEnter:r=>r.currentTarget.style.opacity=".85",onMouseLeave:r=>r.currentTarget.style.opacity="1",children:"🔄 Try Again"}),e.jsx("button",{onClick:()=>window.location.href="/",style:{background:"#f1f5f9",color:"#475569",border:"1px solid #e2e8f0",borderRadius:"10px",padding:"11px 24px",fontSize:"14px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"},children:"🏠 Go Home"})]})]})})}}const zt="#0f2347",we="#f4a023",Ct="#c97e10";function On({onSuccess:t,onClose:i}){const[n,a]=o.useState(""),[s,c]=o.useState(""),[r,f]=o.useState(""),[d,l]=o.useState(!1),[u,g]=o.useState(!1),[m,w]=o.useState("idle"),[k,z]=o.useState(!1),[p,b]=o.useState(!1),[S,x]=o.useState(!1),[h,y]=o.useState(0),[N,E]=o.useState(!1),v=o.useRef(null),I=o.useRef(null);o.useEffect(()=>{setTimeout(()=>E(!0),50)},[]),o.useEffect(()=>{if(!d)return;const $=setInterval(()=>y(C=>(C+1)%4),350);return()=>clearInterval($)},[d]),o.useEffect(()=>{const $=v.current;if(!$)return;const C=$.getContext("2d");let T=$.width=$.offsetWidth,ae=$.height=$.offsetHeight;const q=Array.from({length:55},()=>({x:Math.random()*T,y:Math.random()*ae,r:Math.random()*1.4+.3,dx:(Math.random()-.5)*.35,dy:(Math.random()-.5)*.35,o:Math.random()*.45+.1})),Xe=()=>{C.clearRect(0,0,T,ae),q.forEach(H=>{H.x+=H.dx,H.y+=H.dy,(H.x<0||H.x>T)&&(H.dx*=-1),(H.y<0||H.y>ae)&&(H.dy*=-1),C.beginPath(),C.arc(H.x,H.y,H.r,0,Math.PI*2),C.fillStyle=`rgba(244,160,35,${H.o})`,C.fill()});for(let H=0;H<q.length;H++)for(let We=H+1;We<q.length;We++){const Vt=q[H].x-q[We].x,Xt=q[H].y-q[We].y,Kt=Math.sqrt(Vt*Vt+Xt*Xt);Kt<90&&(C.beginPath(),C.moveTo(q[H].x,q[H].y),C.lineTo(q[We].x,q[We].y),C.strokeStyle=`rgba(244,160,35,${.07*(1-Kt/90)})`,C.lineWidth=.5,C.stroke())}I.current=requestAnimationFrame(Xe)};Xe();const qt=()=>{T=$.width=$.offsetWidth,ae=$.height=$.offsetHeight};return window.addEventListener("resize",qt),()=>{cancelAnimationFrame(I.current),window.removeEventListener("resize",qt)}},[]);const B=$=>{$.key==="CapsLock"&&z($.getModifierState("CapsLock"))},G=$=>{$.key==="CapsLock"&&z($.getModifierState("CapsLock"))},Q=$=>{if($.preventDefault(),!n.trim()||!s.trim()){f("Please fill in all fields.");return}f(""),l(!0),w("checking"),setTimeout(()=>{n==="admin"&&s==="admin123"?(w("success"),setTimeout(()=>t(),1e3)):(w("fail"),f("Invalid credentials. Please try again."),l(!1),setTimeout(()=>w("idle"),600))},1400)},te=`
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
      width: 42%; background: ${zt};
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
      font-size: 10px; font-weight: 600; color: ${we};
      letter-spacing: 1.5px; text-transform: uppercase;
      width: fit-content;
    }
    .gnc-badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: ${we}; animation: blink 2s infinite;
    }
    @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.2;} }

    .gnc-logo-wrap {
      display: flex; align-items: center; gap: 16px; margin: 36px 0 20px;
    }
    .gnc-logo-icon {
      width: 58px; height: 58px; border-radius: 16px; flex-shrink: 0;
      background: linear-gradient(135deg, ${we} 0%, ${Ct} 100%);
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
    .gnc-left-title span { color: ${we}; }
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
      font-size: 10px; font-weight: 600; color: ${we};
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
      background: linear-gradient(135deg, ${we} 0%, ${Ct} 100%);
      border: none; border-radius: 12px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 15px; font-weight: 700;
      color: ${zt}; cursor: pointer;
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
      border-top-color: ${zt};
      animation: spin .7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── PROGRESS BAR ── */
    .gnc-progress {
      height: 2px; background: rgba(255,255,255,.05);
      border-radius: 99px; overflow: hidden; margin-bottom: 28px;
    }
    .gnc-progress-inner {
      height: 100%; background: linear-gradient(90deg, ${we}, ${Ct});
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
  `,Z=()=>m==="success"?e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"✓"})," Access Granted"]}):m==="fail"?e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"✕"})," Invalid Credentials"]}):m==="checking"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"gnc-spinner"}),e.jsxs("span",{children:["Authenticating",".".repeat(h)]})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"🔐"})," Access Admin Portal"]});return e.jsxs("div",{className:"gnc-login-root",children:[e.jsx("style",{children:te}),e.jsxs("div",{className:"gnc-bg",children:[e.jsx("canvas",{ref:v,style:{width:"100%",height:"100%"}}),e.jsx("div",{className:"gnc-bg-grid"}),e.jsx("div",{className:"gnc-bg-glow1"}),e.jsx("div",{className:"gnc-bg-glow2"})]}),e.jsxs("div",{className:`gnc-wrap ${N?"show":""}`,children:[e.jsxs("div",{className:"gnc-left",children:[e.jsx("div",{className:"gnc-left-pattern"}),e.jsx("div",{className:"gnc-left-circle1"}),e.jsx("div",{className:"gnc-left-circle2"}),e.jsxs("div",{children:[e.jsxs("div",{className:"gnc-badge",children:[e.jsx("div",{className:"gnc-badge-dot"}),"Secured Portal"]}),e.jsxs("div",{className:"gnc-logo-wrap",children:[e.jsx("div",{className:"gnc-logo-icon",children:"🏫"}),e.jsxs("div",{children:[e.jsxs("div",{className:"gnc-college-name",children:["Guru Nanak",e.jsx("br",{}),"College"]}),e.jsx("div",{className:"gnc-college-sub",children:"Dhanbad, Jharkhand"})]})]}),e.jsxs("div",{className:"gnc-left-title",children:["Website",e.jsx("br",{}),e.jsx("span",{children:"Control"}),e.jsx("br",{}),"Center"]}),e.jsx("div",{className:"gnc-left-desc",children:"Manage notices, events, faculty, gallery, documents and all website content from one unified dashboard."}),e.jsx("div",{className:"gnc-features",children:[["📢","Real-time Notice Board"],["👨‍🏫","Faculty & Staff Directory"],["📊","Live Dashboard Analytics"],["🛡️","15-Phase System Diagnostics"]].map(([$,C])=>e.jsxs("div",{className:"gnc-feature",children:[e.jsx("div",{className:"gnc-feature-icon",children:$}),C]},C))})]}),e.jsx("div",{className:"gnc-left-footer",children:"v9.1 · Admin Panel · GNC Dhanbad"})]}),e.jsxs("div",{className:"gnc-right",children:[e.jsx("button",{className:"gnc-close",onClick:i,title:"Close",children:"✕"}),e.jsx("div",{className:"gnc-right-eyebrow",children:"Admin Access"}),e.jsx("div",{className:"gnc-right-title",children:"Welcome Back"}),e.jsx("div",{className:"gnc-right-sub",children:"Sign in to manage your college website"}),e.jsx("div",{className:"gnc-progress",children:e.jsx("div",{className:`gnc-progress-inner ${d?"go":""}`})}),e.jsxs("div",{className:"gnc-security",children:[e.jsx("span",{className:"gnc-security-icon",children:"🔒"}),e.jsx("span",{className:"gnc-security-text",children:"256-bit encrypted · Secure session"}),e.jsx("div",{className:"gnc-security-dot"})]}),e.jsxs("form",{onSubmit:Q,autoComplete:"off",children:[r&&e.jsxs("div",{className:"gnc-error",children:[e.jsx("span",{children:"⚠️"})," ",r]}),e.jsxs("div",{className:"gnc-field",children:[e.jsx("div",{className:"gnc-field-label",children:e.jsx("span",{children:"Username"})}),e.jsxs("div",{className:`gnc-input-wrap ${p?"focused":""}`,children:[e.jsx("span",{className:"gnc-input-icon",children:"👤"}),e.jsx("input",{className:"gnc-input",type:"text",placeholder:"Enter your username",value:n,onChange:$=>a($.target.value),onFocus:()=>b(!0),onBlur:()=>b(!1),onKeyDown:B,onKeyUp:G,autoComplete:"username",required:!0})]})]}),e.jsxs("div",{className:"gnc-field",children:[e.jsxs("div",{className:"gnc-field-label",children:[e.jsx("span",{children:"Password"}),k&&e.jsx("span",{className:"gnc-caps",children:"⇪ Caps Lock ON"})]}),e.jsxs("div",{className:`gnc-input-wrap ${S?"focused":""}`,children:[e.jsx("span",{className:"gnc-input-icon",children:"🔑"}),e.jsx("input",{className:"gnc-input",type:u?"text":"password",placeholder:"Enter your password",value:s,onChange:$=>c($.target.value),onFocus:()=>x(!0),onBlur:()=>x(!1),onKeyDown:B,onKeyUp:G,autoComplete:"current-password",required:!0}),e.jsx("button",{type:"button",className:"gnc-eye-btn",onClick:()=>g($=>!$),tabIndex:-1,title:u?"Hide":"Show",children:u?"🙈":"👁️"})]})]}),e.jsx("button",{type:"submit",className:`gnc-btn ${m==="success"?"success-btn":""} ${m==="fail"?"fail-btn":""}`,disabled:d,children:Z()})]}),e.jsxs("div",{className:"gnc-right-footer",children:[e.jsx("span",{children:"🛡️"}),"Authorized personnel only  ·  GNC Admin v9.1"]})]})]})]})}const qn={VITE_FIREBASE_API_KEY:"AIzaSyDeJWUUoU_MJ4ubpbfaLZemvnEr82LF5YA",VITE_FIREBASE_APP_ID:"1:78901559372:web:f76cb101f8aec2daadb4e9",VITE_FIREBASE_AUTH_DOMAIN:"gnc-college-web.firebaseapp.com",VITE_FIREBASE_MESSAGING_SENDER_ID:"78901559372",VITE_FIREBASE_PROJECT_ID:"gnc-college-web",VITE_FIREBASE_STORAGE_BUCKET:"gnc-college-web.firebasestorage.app"},{VITE_FIREBASE_API_KEY:Vn,VITE_FIREBASE_AUTH_DOMAIN:Xn,VITE_FIREBASE_PROJECT_ID:Kn,VITE_FIREBASE_STORAGE_BUCKET:Jn,VITE_FIREBASE_MESSAGING_SENDER_ID:Qn,VITE_FIREBASE_APP_ID:Zn}=qn,ea={apiKey:Vn,authDomain:Xn,projectId:Kn,storageBucket:Jn,messagingSenderId:Qn,appId:Zn},wi=Fi(ea),L=Pi(wi);Mi(wi);const ta=`
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
`;let ni=!1;const ia=()=>{if(ni||typeof document=="undefined")return;const t=document.createElement("style");t.id="gnc-prose-styles",t.textContent=ta,document.head.appendChild(t),ni=!0},na=t=>t?t.replace(/<table/gi,'<div class="gnc-table-wrap"><table').replace(/<\/table>/gi,"</table></div>"):"",aa=({title:t})=>e.jsxs("div",{style:{background:"linear-gradient(135deg, #0f2347 0%, #1a3a7c 60%, #0f2347 100%)",padding:"52px 24px 40px",textAlign:"center",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:-40,right:-40,width:200,height:200,borderRadius:"50%",background:"rgba(244,160,35,0.08)",pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",bottom:-30,left:-30,width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,0.04)",pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(90deg, #f4a023, #ffd57e, #f4a023)"}}),e.jsx("h1",{style:{color:"#fff",fontSize:"clamp(1.4rem, 4vw, 2rem)",fontWeight:900,letterSpacing:"-0.02em",margin:0,lineHeight:1.25,fontFamily:"'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif"},children:t||"Page"}),e.jsx("div",{style:{width:60,height:3,background:"#f4a023",borderRadius:2,margin:"12px auto 0"}})]}),ra=({path:t})=>{var i;return e.jsxs("div",{style:{textAlign:"center",padding:"80px 24px",color:"#94a3b8"},children:[e.jsx("div",{style:{fontSize:56,marginBottom:16},children:"📄"}),e.jsx("h3",{style:{color:"#64748b",fontWeight:700,fontSize:"1.1rem",margin:"0 0 8px",fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"},children:"Content Coming Soon"}),e.jsx("p",{style:{margin:0,fontSize:14},children:"Admin Panel → Pages & SEO → Add content for this page"}),e.jsxs("code",{style:{display:"inline-block",marginTop:12,background:"#f1f5f9",border:"1px solid #e2e8f0",borderRadius:6,padding:"4px 12px",fontSize:12,color:"#475569"},children:["path: ",t||((i=window.location.hash)==null?void 0:i.replace("#",""))||"/"]})]})},sa=()=>e.jsxs("div",{style:{padding:"32px 24px"},children:[[100,70,90,55,80].map((t,i)=>e.jsx("div",{style:{height:i===0?20:14,width:`${t}%`,background:"linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",backgroundSize:"200% 100%",borderRadius:6,marginBottom:i===0?24:12,animation:"gnc-shimmer 1.5s infinite"}},i)),e.jsx("style",{children:`
      @keyframes gnc-shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `})]}),oa=()=>{const[t,i]=o.useState(!0),[n,a]=o.useState(null);return o.useEffect(()=>{var d;ia();const s=((d=window.location.hash)==null?void 0:d.replace("#",""))||"",c=s.startsWith("/")?s:"/"+s,r=X(K(L,"pages"),ne("createdAt","desc")),f=M(r,l=>{const g=l.docs.map(m=>R({id:m.id},m.data())).find(m=>m.path===c||m.slug===c.replace("/",""));a(g||null),i(!1)},()=>i(!1));return()=>f()},[]),t?e.jsxs("div",{style:{minHeight:"60vh",background:"#f8fafc"},children:[e.jsx("div",{style:{background:"linear-gradient(135deg, #0f2347 0%, #1a3a7c 100%)",padding:"52px 24px 40px",textAlign:"center"},children:e.jsx("div",{style:{height:28,width:240,background:"rgba(255,255,255,0.15)",borderRadius:8,margin:"0 auto"}})}),e.jsx("div",{style:{maxWidth:900,margin:"0 auto"},children:e.jsx(sa,{})})]}):e.jsxs("div",{style:{minHeight:"60vh",background:"#f8fafc"},children:[e.jsx(aa,{title:(n==null?void 0:n.title)||"Page"}),e.jsx("div",{style:{maxWidth:900,margin:"0 auto",padding:"40px 24px 80px"},children:n!=null&&n.content?e.jsx("div",{className:"gnc-prose",dangerouslySetInnerHTML:{__html:ut.sanitize(na(n.content))}}):e.jsx(ra,{})})]})},la=[{id:"f1",image:"images/slider_baisakhi.jpg",title:"BAISAKHI DI SHAAM Celebration",subtitle:"Celebrating culture and traditions"},{id:"f2",image:"images/slider_cricket.jpg",title:"Inter College BBMKU Cricket Winners",subtitle:"Celebrating sportsmanship and victory"},{id:"f3",image:"images/slider_ncc.jpg",title:'NCC "At Home Function" Participants',subtitle:"Dedicated NCC Cadets & Commanders"},{id:"f4",image:"images/slider_youth_winners.jpg",title:"BBMKU Youth Festival Champions",subtitle:"Winners of BBMKU Inter College Youth Festival — अंतर्नाद"},{id:"f5",image:"images/slider_seminar.jpg",title:"ICSSR Multidisciplinary National Seminar",subtitle:"G20: A Global Platform for Economic Development"}],ki=t=>{if(!t)return{webp:"",jpg:""};if(t.startsWith("http://")||t.startsWith("https://"))return{webp:t,jpg:t};const a=`/gncollege-website/${t.startsWith("/")?t.slice(1):t}`;return{webp:a.replace(/\.(jpg|jpeg|png)$/i,".webp"),jpg:a}},da=t=>{const{webp:i,jpg:n}=ki(t),a=document.createElement("link");a.rel="preload",a.as="image",a.href=i,a.type="image/webp";const s=document.createElement("link");s.rel="preload",s.as="image",s.href=n,document.head.appendChild(a),document.head.appendChild(s)},ca=({slides:t=[]})=>{const[i,n]=o.useState(0),[a,s]=o.useState(!1),[c,r]=o.useState(new Set([0])),f=o.useRef(null),d=o.useRef(null),l=o.useMemo(()=>!t||t.length===0?la:[...t].sort((p,b)=>(Number(p.order)||0)-(Number(b.order)||0)),[t]),u=l.length,g=o.useCallback(()=>n(p=>p===u-1?0:p+1),[u]),m=o.useCallback(()=>n(p=>p===0?u-1:p-1),[u]);o.useEffect(()=>{n(0),r(new Set([0]))},[u]),o.useEffect(()=>{var p;(p=l[0])!=null&&p.image&&da(l[0].image)},[]),o.useEffect(()=>{if(u<=1||a)return;const p=setInterval(g,5e3);return()=>clearInterval(p)},[u,a,g]),o.useEffect(()=>{r(p=>{const b=i===u-1?0:i+1,S=i===0?u-1:i-1,x=new Set(p);return x.add(i),x.add(b),x.add(S),x})},[i,u]);const w=p=>{f.current=p.targetTouches[0].clientX},k=p=>{d.current=p.targetTouches[0].clientX},z=()=>{if(!f.current||!d.current)return;const p=f.current-d.current;Math.abs(p)>50&&(p>0?g():m()),f.current=null,d.current=null};return e.jsxs("div",{className:"hs-root",onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),onTouchStart:w,onTouchMove:k,onTouchEnd:z,children:[e.jsx("style",{children:`
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
      `}),l.map((p,b)=>{const S=c.has(b),{webp:x,jpg:h}=ki(p.image);return e.jsx("div",{className:`hs-slide${b===i?" cur":""}`,children:S?e.jsxs(e.Fragment,{children:[e.jsxs("picture",{className:"hs-pic",style:{width:"100%",height:"100%",display:"block"},children:[e.jsx("source",{srcSet:x,type:"image/webp"}),e.jsx("img",{src:h,alt:p.title||`Slide ${b+1}`,className:"hs-img",loading:b===0?"eager":"lazy",fetchpriority:b===0?"high":"low",decoding:b===0?"sync":"async",width:"1920",height:"580",onError:y=>{y.target.style.opacity=".15"}})]}),e.jsxs("div",{className:"hs-content",children:[e.jsx("h2",{className:"hs-title",children:p.title}),e.jsx("p",{className:"hs-subtitle",children:p.subtitle}),e.jsx("hr",{className:"hs-hr"})]})]}):e.jsx("div",{className:"hs-skeleton"})},p.id||b)}),u>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"hs-arrow hs-prev",onClick:m,"aria-label":"Previous slide",children:"❮"}),e.jsx("button",{className:"hs-arrow hs-next",onClick:g,"aria-label":"Next slide",children:"❯"})]}),e.jsx("div",{className:"hs-dots",role:"tablist","aria-label":"Slide navigation",children:l.map((p,b)=>e.jsx("button",{className:`hs-dot${b===i?" cur":""}`,onClick:()=>n(b),"aria-label":`Slide ${b+1}`,role:"tab","aria-selected":b===i},b))})]})},pa=({items:t})=>{if(!t||t.length===0)return null;const i=[...t,...t];return e.jsxs("div",{className:"ticker-wrapper",children:[e.jsx("style",{children:`
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
          background: ${j.gold};
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
        .ticker-item a:hover { color: ${j.gold}; }
        .ticker-item::before { content: '✦'; color: ${j.gold}; font-size: 10px; opacity: 0.7; }
        @keyframes scrollTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}),e.jsx("div",{className:"ticker-label",children:"Latest Updates"}),e.jsx("div",{className:"ticker-container",children:e.jsx("div",{className:"ticker-track",children:i.map((n,a)=>e.jsx("div",{className:"ticker-item",children:e.jsx("a",{href:n.link||"#",target:"_blank",rel:"noopener noreferrer",children:n.text})},a))})})]})},ke=j==null?void 0:j.navy,Ee=j==null?void 0:j.gold;function Ht(t=.1){const i=o.useRef(null),[n,a]=o.useState(!1);return o.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion:reduce)").matches){a(!0);return}const s=i.current;if(!s)return;const c=new IntersectionObserver(([r])=>{r.isIntersecting&&(a(!0),c.unobserve(s))},{threshold:t,rootMargin:"0px 0px -40px 0px"});return c.observe(s),()=>c.disconnect()},[t]),[i,n]}const fa=[{slug:"bca",short:"BCA",full:`Bachelor of Computer
Applications`,icon:"💻",color:"#0ea5e9",gradient:"linear-gradient(145deg,#0c1f5e 0%,#0369a1 55%,#0ea5e9 100%)",tagline:`Programming · Database
Software Development`,symbol:"{ }",path:"/academics/departments/bca"},{slug:"bba",short:"BBA",full:`Bachelor of Business
Administration`,icon:"📊",color:"#f59e0b",gradient:"linear-gradient(145deg,#3b1a02 0%,#b45309 55%,#f59e0b 100%)",tagline:`Management · Finance
Entrepreneurship`,symbol:"↗",path:"/academics/departments/bba"},{slug:"commerce",short:"Commerce",full:`Department of
Commerce`,icon:"🏦",color:"#10b981",gradient:"linear-gradient(145deg,#022c22 0%,#065f46 55%,#10b981 100%)",tagline:`Accounting · Business
Tax & Economics`,symbol:"₹",path:"/academics/departments/commerce"},{slug:"humanities",short:"Humanities",full:`Department of
Humanities`,icon:"📚",color:"#a78bfa",gradient:"linear-gradient(145deg,#1e0a4a 0%,#5b21b6 55%,#a78bfa 100%)",tagline:`English · Hindi
Literature & Philosophy`,symbol:"Aa",path:"/academics/departments/humanities"},{slug:"social-science",short:"Social Sci",full:`Department of
Social Science`,icon:"🌍",color:"#f87171",gradient:"linear-gradient(145deg,#3b0a0a 0%,#991b1b 55%,#f87171 100%)",tagline:`History · Geography
Political Science`,symbol:"⊕",path:"/academics/departments/social-science"}],xa=`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;600;700;800&display=swap');
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
    color:${ke};padding:5px 16px;border-radius:20px;
    font-size:clamp(9px,.75vw,11px);font-weight:800;letter-spacing:2px;
    text-transform:uppercase;margin-bottom:12px;
  }
  .hf-sec-h{
    font-family:'Syne',sans-serif;color:#111827;
    font-size:clamp(22px,3.5vw,42px);font-weight:900;
    margin:0 0 10px;letter-spacing:clamp(-.5px,-.05vw,-1px);line-height:1.1;
  }
  .hf-sec-h span{color:${Ee};}
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
  .hf-viewall{display:inline-flex;align-items:center;gap:9px;background:${ke};border:1px solid ${ke};color:#fff;padding:clamp(10px,1.2vw,13px) clamp(20px,2.5vw,28px);border-radius:4px;font-size:clamp(12px,.9vw,13.5px);font-weight:700;text-decoration:none;transition:background .2s,transform .2s,box-shadow .2s;}
  .hf-viewall .arr{display:inline-block;transition:transform .2s;}
  .hf-viewall:hover{background:${Ee};border-color:${Ee};color:${ke};box-shadow:0 4px 16px rgba(244,160,35,.35);transform:translateY(-2px);}
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
  .hf-fac-label{display:inline-flex;align-items:center;gap:8px;background:rgba(15,35,71,.06);border:1px solid rgba(15,35,71,.12);color:${ke};padding:5px 16px;border-radius:20px;font-size:clamp(9px,.75vw,11px);font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;}
  .hf-fac-h{font-family:'Syne',sans-serif;color:#111827;font-size:clamp(22px,3vw,38px);font-weight:900;margin:0 0 10px;letter-spacing:-.7px;}
  .hf-fac-h span{color:${Ee};}
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
  .hf-fc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${Ee},${ke});opacity:0;transition:opacity .25s;border-radius:16px 16px 0 0;}
  .gc:hover .hf-fc{transform:translateY(-6px) scale(1.03);box-shadow:0 10px 26px rgba(15,35,71,.1);border-color:transparent;}
  .gc:hover .hf-fc::before{opacity:1;}
  .hf-fc-icon{font-size:clamp(26px,3.5vw,38px);line-height:1;transition:transform .3s;filter:drop-shadow(0 3px 6px rgba(0,0,0,.1));}
  .gc:hover .hf-fc-icon{transform:scale(1.25) rotate(-8deg);}
  .hf-fc-name{font-size:clamp(9.5px,.8vw,12px);font-weight:800;color:${ke};text-transform:uppercase;letter-spacing:.5px;line-height:1.3;text-align:center;transition:color .2s;}
  .gc:hover .hf-fc-name{color:${Ee};}

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
`,At=({children:t,variant:i="up",d:n="",tag:a="div",style:s={},className:c=""})=>{const[r,f]=Ht();return e.jsx(a,{ref:r,className:`sa2 ${i}${f?" vis":""}${n?` sa2-${n}`:""}${c?" "+c:""}`,style:s,children:t})},ga=({dept:t,delay:i})=>{const[n,a]=Ht(.08);return e.jsx("div",{ref:n,className:`sa2 up${a?" vis":""} sa2-d${i}`,children:e.jsx("div",{className:"gc r22",children:e.jsxs(F,{to:t.path,className:"hf-dc",children:[e.jsx("div",{className:"hf-dc-bg",style:{background:t.gradient}}),e.jsx("div",{className:"hf-dc-sym",children:t.symbol}),e.jsx("div",{className:"hf-dc-top",children:t.short}),e.jsxs("div",{className:"hf-dc-body",children:[e.jsx("div",{className:"hf-dc-icon",children:t.icon}),e.jsx("div",{className:"hf-dc-name",children:t.full}),e.jsx("div",{className:"hf-dc-tag",children:t.tagline}),e.jsxs("div",{className:"hf-dc-cta",children:["Explore ",e.jsx("span",{className:"arr",children:"›"})]})]})]})})})},ha=({ft:t,delay:i})=>{const[n,a]=Ht(.05);return e.jsx("div",{ref:n,className:`sa2 scale${a?" vis":""} sa2-d${Math.min(i+1,5)}`,children:e.jsx("div",{className:"gc r18",children:e.jsxs("div",{className:"hf-fc",children:[e.jsx("div",{className:"hf-fc-icon",children:t.emoji}),e.jsx("div",{className:"hf-fc-name",children:t.name})]})})})};function ma(){return e.jsxs("div",{className:"hf-wrap",children:[e.jsx("style",{children:xa}),e.jsx("section",{className:"hf-dept-sec",children:e.jsxs("div",{className:"hf-dept-inner",children:[e.jsx(At,{variant:"up",children:e.jsxs("div",{className:"hf-section-header",children:[e.jsx("div",{children:e.jsx("div",{className:"hf-sec-label",children:"🏛️ Academic Excellence"})}),e.jsxs("h2",{className:"hf-sec-h",children:["Our Academic ",e.jsx("span",{children:"Departments"})]}),e.jsx("p",{className:"hf-sec-sub",children:"Har department mein expert faculty, modern curriculum aur career-ready approach"})]})}),e.jsx("div",{className:"hf-dept-grid",children:fa.map((t,i)=>e.jsx(ga,{dept:t,delay:Math.min(i+1,5)},t.slug))}),e.jsx(At,{variant:"fade",children:e.jsx("div",{className:"hf-viewall-wrap",children:e.jsxs(F,{to:"/academics/departments",className:"hf-viewall",children:["View All Departments ",e.jsx("span",{className:"arr",children:"›"})]})})})]})}),e.jsx("section",{className:"hf-fac-sec",children:e.jsxs("div",{className:"hf-fac-inner",children:[e.jsx(At,{variant:"up",children:e.jsxs("div",{className:"hf-section-header",style:{textAlign:"center",marginBottom:"clamp(30px,4vw,46px)"},children:[e.jsx("div",{children:e.jsx("div",{className:"hf-fac-label",children:"⭐ World-Class Infrastructure"})}),e.jsxs("h2",{className:"hf-fac-h",children:["College ",e.jsx("span",{children:"Facilities"})]}),e.jsx("p",{className:"hf-fac-sub",children:"Students ke holistic development ke liye — modern labs, library, sports aur bahut kuch"})]})}),e.jsx("div",{className:"hf-fac-grid",children:(Pn||[]).map((t,i)=>e.jsx(ha,{ft:t,delay:i%5},i))})]})})]})}const lt=({title:t,subtitle:i,darkBg:n=!1})=>e.jsxs("div",{style:{textAlign:"center",marginBottom:40},children:[e.jsx("h2",{style:{fontSize:28,fontWeight:800,color:n?"#fff":j.navy,marginBottom:8},children:t}),e.jsx("div",{style:{width:60,height:4,background:j.gold,margin:"0 auto 12px",borderRadius:2}}),i&&e.jsx("p",{style:{color:n?"rgba(255,255,255,0.72)":"#666",fontSize:15},children:i})]}),ua=({notices:t,announcements:i,pdfReports:n,upcomingEvents:a})=>{const s=o.useRef(null),c=o.useRef(null),r=o.useRef(null),f=o.useRef(null),d=o.useRef(null),l=o.useRef(null),u=o.useMemo(()=>[...t||[],...t||[]],[t]),g=o.useMemo(()=>{const p=(a||[]).map(S=>{var x,h;return Y(R({},S),{text:S.title,date:((h=(x=S.createdAt)==null?void 0:x.toDate)==null?void 0:h.call(x))||S.date,type:S.type||"Event"})}),b=(i||[]).map(S=>{var x,h;return Y(R({},S),{date:((h=(x=S.createdAt)==null?void 0:x.toDate)==null?void 0:h.call(x))||S.date,type:S.type||"News"})});return[...p,...b].sort((S,x)=>(x.date||0)-(S.date||0))},[a,i]),m=o.useMemo(()=>[...g,...g],[g]),w=o.useMemo(()=>{const p=(n||[]).map(b=>{var S,x;return Y(R({},b),{text:b.title,date:((x=(S=b.createdAt)==null?void 0:S.toDate)==null?void 0:x.call(S))||b.date,type:"Document"})});return[...p,...p]},[n]),k=(p,b)=>{const S=p.current;if(!S)return;let x=0;const h=()=>{x-=.6,x<-S.scrollHeight/2&&(x=0),S.style.transform=`translateY(${x}px)`,b.current=requestAnimationFrame(h)};b.current=requestAnimationFrame(h)},z=p=>{p.current&&(cancelAnimationFrame(p.current),p.current=null)};return o.useEffect(()=>{const p=s.current;if(!p)return;const b=()=>z(f),S=()=>k(s,f);return p.addEventListener("mouseenter",b),p.addEventListener("mouseleave",S),k(s,f),()=>{z(f),p.removeEventListener("mouseenter",b),p.removeEventListener("mouseleave",S)}},[u]),o.useEffect(()=>{const p=c.current;if(!p)return;const b=()=>z(d),S=()=>k(c,d);return p.addEventListener("mouseenter",b),p.addEventListener("mouseleave",S),k(c,d),()=>{z(d),p.removeEventListener("mouseenter",b),p.removeEventListener("mouseleave",S)}},[m]),o.useEffect(()=>{const p=r.current;if(!p)return;const b=()=>z(l),S=()=>k(r,l);return p.addEventListener("mouseenter",b),p.addEventListener("mouseleave",S),k(r,l),()=>{z(l),p.removeEventListener("mouseenter",b),p.removeEventListener("mouseleave",S)}},[w]),e.jsxs("section",{style:{padding:"90px 20px",background:"#f8fafc",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"300px",background:"linear-gradient(180deg,#f1f5f9 0%,rgba(248,250,252,0) 100%)",zIndex:0}}),e.jsxs("div",{style:{maxWidth:1350,margin:"0 auto",position:"relative",zIndex:1},children:[e.jsx(lt,{title:"Notification & Announcements",subtitle:"Stay informed with the latest official updates and campus news"}),e.jsx("style",{children:`
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
            box-shadow: inset 4px 0 0 0 ${j.gold};
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
            background: ${j.navy}; color: #fff;
            border-color: ${j.navy}; box-shadow: 0 8px 20px rgba(15,23,42,0.2);
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
        `}),e.jsxs("div",{className:"notif-grid",children:[e.jsx("div",{className:"nc-glow",children:e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-notice",children:[e.jsx("span",{style:{fontSize:26},children:"🔔"})," Official Notices"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:s,children:u.map((p,b)=>{const S=p.isNew&&p.date&&(new Date-new Date(p.date))/864e5<5;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",p.date?new Date(p.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#1e3a8a"},children:p.type||"Notice"}),S&&e.jsx("span",{className:"new-badge-pulse",children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:p.text}}),p.link&&e.jsxs("a",{href:p.link,target:"_blank",rel:"noreferrer",className:"notif-alink",style:{color:"#2563eb"},children:["📎 View Attachment ",e.jsx("span",{className:"arr",children:"›"})]})]},b)})})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx(F,{to:"/notifications",className:"view-all-btn",children:"View All Notices"})})]})}),e.jsx("div",{className:"nc-glow",children:e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-news",children:[e.jsx("span",{style:{fontSize:26},children:"📣"})," News & Events"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:c,children:m.map((p,b)=>{const S=p.isNew||!1||p.date&&(new Date-new Date(p.date))/864e5<5;return e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",p.date?new Date(p.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#e11d48"},children:p.type||"Update"}),S&&e.jsx("span",{className:"new-badge-pulse",children:"NEW"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:p.text||p.title}}),p.desc&&e.jsx("div",{className:"rich-text-desc",dangerouslySetInnerHTML:{__html:p.desc}}),p.link&&e.jsxs("a",{href:p.link,target:"_blank",rel:"noreferrer",className:"notif-alink",style:{color:"#e11d48"},children:["🔗 Read More ",e.jsx("span",{className:"arr",children:"›"})]})]},b)})})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx(F,{to:"/news",className:"view-all-btn",children:"Explore News"})})]})}),e.jsx("div",{className:"nc-glow",children:e.jsxs("div",{className:"notif-card",children:[e.jsxs("div",{className:"notif-header header-docs",children:[e.jsx("span",{style:{fontSize:26},children:"📄"})," E-Documents"]}),e.jsx("div",{className:"notif-body",children:e.jsx("div",{ref:r,children:w.map((p,b)=>e.jsxs("div",{className:"notif-item",children:[e.jsxs("div",{className:"notif-meta",children:[e.jsxs("span",{children:["📅 ",p.date?new Date(p.date).toLocaleDateString("en-GB"):"Recently"]}),e.jsx("span",{className:"cat-badge",style:{color:"#059669"},children:p.type||"Document"})]}),e.jsx("div",{className:"rich-text-title",dangerouslySetInnerHTML:{__html:p.text||p.title}}),p.link&&e.jsxs("a",{href:p.link,target:"_blank",rel:"noreferrer",className:"notif-alink",style:{color:"#059669"},children:["⬇️ Download PDF ",e.jsx("span",{className:"arr",children:"›"})]})]},b))})}),e.jsx("div",{className:"view-all-wrapper",children:e.jsx(F,{to:"/documents",className:"view-all-btn",children:"Document Archive"})})]})})]})]})]})},Be="#0f2347",Me="#f4a023",ba={tcs:"#0066cc",wipro:"#7c3aed",infosys:"#007dc1",accenture:"#a100ff",hcl:"#00b0ea",ibm:"#054ada",bank:"#16a34a",bsnl:"#ea580c",sbi:"#1d4ed8",google:"#4285f4",amazon:"#f59e0b",microsoft:"#0284c7",flipkart:"#2874f0",zomato:"#e23744",cognizant:"#1a77c9",capgemini:"#0070c0"},ya=(t="")=>{const i=t.toLowerCase();for(const[n,a]of Object.entries(ba))if(i.includes(n))return a;return Be},ja=`
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
  .wof-dot{width:6px;height:6px;border-radius:50%;background:${Me};animation:wof-blink 2s infinite;}
  @keyframes wof-blink{0%,100%{opacity:1;}50%{opacity:.3;}}
  .wof-h2{
    font-family:'Space Grotesk',sans-serif;
    font-size:clamp(24px,3.5vw,36px);font-weight:800;
    color:${Be};letter-spacing:-0.5px;line-height:1.2;margin-bottom:8px;
  }
  .wof-h2 span{color:${Me};}
  .wof-sub{font-size:14px;color:#64748b;font-weight:400;max-width:480px;margin:0 auto;}
  .wof-bar{width:44px;height:3px;background:linear-gradient(90deg,${Me},${Be});border-radius:2px;margin:14px auto 0;}

  .wof-stats{display:flex;justify-content:center;gap:32px;flex-wrap:wrap;margin-top:24px;}
  .wof-stat{text-align:center;}
  .wof-stat-num{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:800;color:${Be};}
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
  .wof-gc:hover .wof-avatar{border-color:${Me};}
  .wof-badge{
    position:absolute;bottom:0;right:0;width:20px;height:20px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;font-size:9px;
    border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.12);
  }

  .wof-name{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;color:${Be};margin-bottom:3px;}
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
    margin-top:7px;font-size:11.5px;color:${Me};font-weight:700;
    display:flex;align-items:center;justify-content:center;gap:4px;
  }

  .wof-foot{text-align:center;padding:8px 20px 0;}
  .wof-foot-badge{
    display:inline-flex;align-items:center;gap:8px;
    background:#fff;border:1.5px solid #e2e8f0;color:#64748b;
    padding:8px 20px;border-radius:50px;font-size:12px;font-weight:600;
    box-shadow:0 2px 8px rgba(0,0,0,.04);
  }
  .wof-foot-badge b{color:${Be};font-weight:800;}
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
`,va=o.memo(({p:t})=>{const i=ya(t.company||""),n="/gncollege-website/images/college_photo.jpg";return e.jsx("div",{className:"wof-gc",children:e.jsxs("div",{className:"wof-card",children:[e.jsxs("div",{className:"wof-avatar-wrap",children:[e.jsx("img",{src:t.imageUrl||n,alt:t.name||"Alumni",className:"wof-avatar",loading:"lazy",decoding:"async",onError:a=>{a.currentTarget.src=n}}),e.jsx("div",{className:"wof-badge",style:{background:i},children:"💼"})]}),e.jsx("div",{className:"wof-name",children:t.name}),t.course&&e.jsx("div",{className:"wof-course",children:t.course}),e.jsxs("div",{className:"wof-batch",children:["Batch ",t.year||"—"]}),e.jsxs("div",{className:"wof-company",style:{background:i},children:[e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,.65)",flexShrink:0,display:"inline-block"}}),t.company||"Industry"]}),t.role&&e.jsx("div",{className:"wof-role",children:t.role}),t.package&&e.jsxs("div",{className:"wof-pkg",children:["💰 ",t.package," LPA"]})]})})});function wa(){const[t,i]=o.useState([]),[n,a]=o.useState(!0);if(o.useEffect(()=>{const d=X(K(L,"placements"),ne("createdAt","desc"));return M(d,l=>{i(l.docs.map(u=>R({id:u.id},u.data()))),a(!1)},()=>a(!1))},[]),n)return null;const s=[...new Set(t.map(d=>d.company).filter(Boolean))],c=t.map(d=>parseFloat(d.package)).filter(d=>!isNaN(d)),r=c.length?Math.max(...c):null,f=[...t,...t,...t];return e.jsxs("section",{className:"wof-root",children:[e.jsx("style",{children:ja}),e.jsxs("div",{className:"wof-head",children:[e.jsxs("div",{className:"wof-eyebrow",children:[e.jsx("div",{className:"wof-dot"})," Our Alumni"]}),e.jsxs("h2",{className:"wof-h2",children:["🏆 Wall of ",e.jsx("span",{children:"Fame"})]}),e.jsx("p",{className:"wof-sub",children:"GNC ke alumni — India ki top companies mein apna career bana rahe hain"}),e.jsx("div",{className:"wof-bar"}),t.length>0&&e.jsxs("div",{className:"wof-stats",children:[e.jsxs("div",{className:"wof-stat",children:[e.jsxs("div",{className:"wof-stat-num",children:[t.length,"+"]}),e.jsx("div",{className:"wof-stat-lbl",children:"Placed"})]}),e.jsxs("div",{className:"wof-stat",children:[e.jsxs("div",{className:"wof-stat-num",children:[s.length,"+"]}),e.jsx("div",{className:"wof-stat-lbl",children:"Companies"})]}),r&&e.jsxs("div",{className:"wof-stat",children:[e.jsxs("div",{className:"wof-stat-num",children:[r," LPA"]}),e.jsx("div",{className:"wof-stat-lbl",children:"Highest Pkg"})]})]})]}),t.length===0?e.jsxs("div",{className:"wof-empty",children:[e.jsx("div",{style:{fontSize:40,marginBottom:12,opacity:.4},children:"🎓"}),e.jsx("div",{style:{fontWeight:600,marginBottom:6,color:"#475569"},children:"Alumni stories loading soon"}),e.jsx("div",{style:{fontSize:13},children:"Admin Panel → Alumni Wall tab se data add karein"})]}):e.jsx("div",{className:"wof-mask",children:e.jsx("div",{className:"wof-track",children:f.map((d,l)=>e.jsx(va,{p:d},`${d.id}-${l}`))})}),t.length>0&&e.jsx("div",{className:"wof-foot",children:e.jsxs("div",{className:"wof-foot-badge",children:["✨ ",e.jsx("b",{children:t.length})," success stories — aur badh rahi hain"]})})]})}const P=j.navy,re=j.gold,ka=(t="")=>t.includes("drive.google.com/file/d/")?`https://drive.google.com/file/d/${t.split("/d/")[1].split("/")[0]}/preview`:t,Sa=t=>({SEMINAR:"/images/slider_seminar.jpg",WORKSHOP:"/images/slider_ncc.jpg",SPORTS:"/images/slider_cricket.jpg",CULTURAL:"/images/slider_baisakhi.jpg"})[t]||"/images/college_photo.jpg",Na=[{text:"B.A./B.Com. Semester 1 Admissions are now open for 2024-25 session.",link:"/admission/info"},{text:"Results for the Semester 6 internal examinations have been published.",link:"/results"},{text:"The college will remain closed on account of Holi from 24th to 26th March.",link:"#"}],za=["All Moments","Seminars","Cultural Fest","Guest Visit","Campus","Departments","NSS Programs"],Ca=[{name:"NAAC",url:"https://naac.gov.in",icon:"🏅"},{name:"UGC",url:"https://ugc.ac.in",icon:"📜"},{name:"INFLIBNET",url:"https://inflibnet.ac.in",icon:"📚"},{name:"NDL INDIA",url:"https://ndl.gov.in",icon:"🔬"},{name:"SWAYAM",url:"https://swayam.gov.in",icon:"🌐"},{name:"BBMK UNIV.",url:"https://bbmku.ac.in",icon:"🏛️"}],Aa=[{label:"Students Enrolled",value:"4,000+",icon:"👨‍🎓"},{label:"Successful Alumni",value:"45,000+",icon:"🎓"},{label:"Expert Faculty",value:"50+",icon:"👨‍🏫"},{label:"Years of Legacy",value:"56",icon:"🏛️"}],Ra=[{icon:"🛡️",title:"NAAC Accredited",desc:"Grade B Institution"},{icon:"👨‍🏫",title:"Expert Faculty",desc:"Highly Experienced"},{icon:"🔬",title:"Modern Labs",desc:"Tech-enabled Learning"},{icon:"🏅",title:"NSS & NCC",desc:"Character Building"}],Wa=[{icon:"📋",title:"Exam Results",sub:"BBMKU result portal",href:"https://bbmkuniv.in/login",color:"#f4a023",bg:"#fffbeb",hoverBg:"#fef3c7",iconBg:"linear-gradient(135deg,#fef3c7,#fde68a)",external:!0},{icon:"💳",title:"Fee Payment",sub:"Online fee portal",href:"https://cimsstudentnewui.mastersofterp.in/",color:"#10b981",bg:"#fff",hoverBg:"#f0fdf4",iconBg:"linear-gradient(135deg,#dcfce7,#bbf7d0)",external:!0},{icon:"🎓",title:"Apply for Admission",sub:"Chancellor portal",href:"https://jharkhanduniversities.nic.in/",color:"#3b82f6",bg:"#fff",hoverBg:"#eff6ff",iconBg:"linear-gradient(135deg,#dbeafe,#bfdbfe)",external:!0},{icon:"📢",title:"Notice Board",sub:"Latest updates",href:"#notifications",color:"#8b5cf6",bg:"#fff",hoverBg:"#fdf4ff",iconBg:"linear-gradient(135deg,#f3e8ff,#e9d5ff)",external:!1}];function Si(t={}){const{threshold:i=.12,rootMargin:n="0px 0px -60px 0px"}=t,a=o.useRef(null),[s,c]=o.useState(!1);return o.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){c(!0);return}const r=a.current;if(!r)return;const f=new IntersectionObserver(([d])=>{d.isIntersecting&&(c(!0),f.unobserve(r))},{threshold:i,rootMargin:n});return f.observe(r),()=>f.disconnect()},[i,n]),[a,s]}const Ea=`
  .hp-root {
    font-family: "Amazon Ember","Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap&subset=latin');

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
`,Ia=`
  *,*::before,*::after{box-sizing:border-box;}

  .hp-watermark{position:fixed;inset:0;background-image:url(/gncollege-website/images/logo.png);background-repeat:repeat;background-size:320px;opacity:.025;z-index:-1;background-color:#f4f7f9;pointer-events:none;}

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
  .hp-img-main{width:90%;height:100%;object-fit:cover;border-radius:20px;box-shadow:20px 20px 0 ${re};position:relative;z-index:2;transition:transform .5s;}
  .hp-imgstack:hover .hp-img-main{transform:scale(1.02);}
  .hp-img-accent{position:absolute;bottom:-28px;right:0;background:${P};color:#fff;padding:22px 26px;border-radius:14px;z-index:3;box-shadow:0 10px 30px rgba(0,0,0,.2);animation:float 3s ease-in-out infinite;}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
  .hp-about-text{text-align:center;}
  .hp-at{font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,38px);font-weight:800;color:${P};line-height:1.2;margin-bottom:8px;text-align:center;}
  .hp-at span{color:${re};}
  .hp-asub{color:${re};font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:22px;font-size:13px;text-align:center;display:block;}
  .hp-adesc{color:#555;line-height:1.8;font-size:15.5px;margin-bottom:28px;text-align:center;}
  .hp-afeat-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:32px;}
  .hp-afeat{display:flex;gap:11px;align-items:flex-start;}
  .hp-afeat-t{font-weight:800;font-size:13.5px;color:${P};}
  .hp-afeat-d{font-size:12px;color:#888;}
  .hp-disc{background:${P};color:#fff;padding:14px 32px;border:none;border-radius:50px;font-weight:700;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;font-size:14px;transition:background .3s,box-shadow .3s,transform .2s;box-shadow:0 5px 18px rgba(15,35,71,.25);}
  .hp-disc .arr{display:inline-block;transition:transform .2s;}
  .hp-disc:hover{background:${re};color:${P};transform:translateY(-2px);box-shadow:0 8px 24px rgba(244,160,35,.35);}
  .hp-disc:hover .arr{transform:translateX(5px);}
  .hp-soc{width:38px;height:38px;border-radius:50%;background:#f0f2f5;display:flex;align-items:center;justify-content:center;color:${P};font-size:17px;text-decoration:none;transition:background .3s,transform .3s;}
  .hp-soc:hover{background:${P};color:${re};transform:rotate(360deg);}
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
  .hp-ev-bdg{position:absolute;top:14px;right:14px;background:${re};color:#000;padding:4px 11px;font-size:9.5px;font-weight:800;border-radius:50px;text-transform:uppercase;z-index:2;letter-spacing:.5px;}
  .hp-ev-dt{position:absolute;bottom:0;left:0;background:${P};color:#fff;padding:8px 14px;border-top-right-radius:12px;z-index:2;}
  .hp-ev-info{padding:20px;flex:1;display:flex;flex-direction:column;}
  .hp-ev-title{font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:800;color:${P};margin:0 0 9px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .hp-ev-desc{font-size:13px;color:#64748b;line-height:1.6;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
  .hp-ev-foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #f1f5f9;padding-top:12px;margin-top:14px;}
  .hp-ev-loc{font-size:11px;color:#94a3b8;font-weight:600;}
  .hp-ev-more{background:none;border:none;font-size:11px;color:${re};font-weight:800;cursor:pointer;padding:0;display:flex;align-items:center;gap:4px;}
  .hp-ev-more .arr{display:inline-block;transition:transform .2s;}
  .hp-ev-more:hover{color:${P};}
  .hp-ev-more:hover .arr{transform:translateX(5px);}
  .hp-pdf-bdg{background:#fee2e2;color:#b91c1c;padding:2px 7px;border-radius:4px;font-size:9px;font-weight:800;}
  .hp-ev-empty{text-align:center;background:#f8fafc;padding:40px;border-radius:12px;border:1px solid #e2e8f0;margin-top:28px;}

  /* ── Counters ── */
  .hp-cnt{background:linear-gradient(135deg,#f0f4ff 0%,#e8eef8 100%);padding:clamp(60px,8vw,80px) 20px;position:relative;overflow:hidden;border-top:1px solid #dde8f5;border-bottom:1px solid #dde8f5;}
  .hp-cnt-bg{position:absolute;inset:0;opacity:.4;pointer-events:none;background-image:radial-gradient(${P}18 1px,transparent 1px);background-size:30px 30px;}
  .hp-cnt-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:36px;text-align:center;position:relative;z-index:2;}
  .hp-cnt-box{padding:28px 18px;border-radius:16px;cursor:default;background:#fff;border:1.5px solid #dde8f5;box-shadow:0 4px 16px rgba(15,35,71,.06);transition:transform .35s,box-shadow .35s,border-color .35s;}
  .gc:hover .hp-cnt-box{transform:translateY(-8px);box-shadow:0 16px 36px rgba(15,35,71,.12);border-color:transparent;}
  .hp-cnt-icon{font-size:42px;margin-bottom:14px;display:inline-block;transition:transform .35s;}
  .gc:hover .hp-cnt-icon{transform:scale(1.18) rotate(8deg);}
  .hp-cnt-num{font-family:'Space Grotesk',sans-serif;font-size:40px;font-weight:800;color:${P};line-height:1;margin-bottom:8px;}
  .hp-cnt-lbl{font-size:12.5px;color:#64748b;font-weight:700;letter-spacing:1px;text-transform:uppercase;}

  /* ── Links ── */
  .hp-links{padding:clamp(60px,8vw,80px) 20px;background:#fff;}
  .hp-links-inner{max-width:1200px;margin:0 auto;}
  .hp-links-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:18px;margin-top:38px;}
  .hp-link-tile{background:#fff;border:1.5px solid #edf2f7;border-radius:12px;padding:24px 14px;text-align:center;text-decoration:none;transition:transform .3s,border-color .3s,box-shadow .3s;display:flex;flex-direction:column;align-items:center;gap:10px;box-shadow:0 2px 8px rgba(0,0,0,.04);}
  .gc:hover .hp-link-tile{transform:translateY(-7px) scale(1.03);border-color:transparent;box-shadow:0 12px 28px rgba(15,35,71,.1);}
  .hp-link-icon{width:56px;height:56px;background:#f1f5f9;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;transition:background .3s,transform .3s;}
  .gc:hover .hp-link-icon{background:${P};transform:rotate(15deg);}
  .hp-link-name{font-size:12.5px;font-weight:800;color:${P};letter-spacing:.4px;}

  /* ── Gallery ── */
  .hp-gal{padding:clamp(70px,9vw,100px) 20px;background:#fff;}
  .hp-gal-inner{max-width:1300px;margin:0 auto;}
  .hp-gal-filters{display:flex;justify-content:center;gap:10px;margin-bottom:44px;flex-wrap:wrap;}
  .hp-filter{padding:9px 22px;border-radius:50px;border:2px solid #edf2f7;background:#fff;color:${P};font-weight:700;font-size:13px;cursor:pointer;transition:background .25s,color .25s,border-color .25s,transform .25s,box-shadow .25s;}
  .hp-filter:hover,.hp-filter.active{background:${P};color:#fff;border-color:${P};transform:translateY(-2px);box-shadow:0 5px 14px rgba(15,35,71,.2);}
  .hp-gal-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;}
  .hp-gal-item{position:relative;border-radius:14px;overflow:hidden;aspect-ratio:4/3;box-shadow:0 4px 14px rgba(0,0,0,.06);cursor:pointer;transition:box-shadow .3s;}
  .gc:hover .hp-gal-item{box-shadow:0 8px 24px rgba(0,0,0,.12);}
  .hp-gal-img{width:100%;height:100%;object-fit:cover;transition:transform .55s;}
  .gc:hover .hp-gal-img{transform:scale(1.1);}
  .hp-gal-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(15,35,71,.88),transparent);opacity:0;transition:opacity .35s;display:flex;flex-direction:column;justify-content:flex-end;padding:18px;}
  .gc:hover .hp-gal-ov{opacity:1;}
  .hp-gal-cat{color:${re};font-size:10px;font-weight:800;letter-spacing:.5px;transform:translateY(8px);opacity:0;transition:all .35s .05s;}
  .hp-gal-ttl{color:#fff;font-size:13.5px;font-weight:700;margin-top:4px;transform:translateY(8px);opacity:0;transition:all .35s .12s;}
  .gc:hover .hp-gal-cat,.gc:hover .hp-gal-ttl{transform:translateY(0);opacity:1;}
  .hp-gal-empty{grid-column:1/-1;text-align:center;background:#f8fafc;padding:48px 20px;border-radius:16px;border:1px dashed #cbd5e1;}

  /* ── YouTube ── */
  .hp-yt{padding:clamp(60px,8vw,80px) 20px;background:#f8fafc;text-align:center;}
  .hp-yt-inner{max-width:1200px;margin:0 auto;}
  .hp-yt-h{font-family:'Space Grotesk',sans-serif;font-size:clamp(24px,3.5vw,36px);font-weight:800;color:${P};margin-bottom:10px;text-align:center;}
  .hp-yt-h span{color:${re};}
  .hp-yt-sub{color:#64748b;font-size:14px;margin-bottom:38px;text-align:center;}
  .hp-yt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;}
  .hp-yt-frame{border-radius:16px;border:none;box-shadow:0 10px 32px rgba(0,0,0,.1);width:100%;height:220px;}
  .hp-yt-ph{background:#fff;border:1.5px solid #e2e8f0;border-radius:16px;height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;}
  .hp-yt-ph-icon{font-size:34px;opacity:.35;}
  .hp-yt-ph-txt{color:#94a3b8;font-size:13px;text-align:center;}

  /* ── Modal ── */
  .hp-modal-ov{position:fixed;inset:0;z-index:9999999;background:rgba(15,35,71,.95);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;}
  .hp-modal-box{background:#fff;width:90%;max-width:1000px;height:85vh;border-radius:20px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 30px 60px rgba(0,0,0,.5);}
  .hp-modal-head{padding:14px 22px;background:${P};color:#fff;display:flex;justify-content:space-between;align-items:center;font-weight:800;}
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
`,J=({children:t,variant:i="up",delay:n="",slow:a=!1,className:s="",style:c={},tag:r="div"})=>{const[f,d]=Si();return e.jsx(r,{ref:f,className:`sa sa-${i}${a?" sa-slow":""}${n?` sa-${n}`:""}${d?" visible":""}${s?" "+s:""}`,style:c,children:t})},Ba=()=>e.jsx("div",{className:"hp-qab",children:e.jsx("div",{className:"hp-qab-inner",children:Wa.map(t=>{const i={className:"hp-qab-item",style:{background:t.bg},onMouseEnter:a=>{a.currentTarget.style.background=t.hoverBg,a.currentTarget.querySelector(".hp-qab-arr").style.color=t.color},onMouseLeave:a=>{a.currentTarget.style.background=t.bg,a.currentTarget.querySelector(".hp-qab-arr").style.color="#cbd5e1"}},n=e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`.hp-qab-item[data-id="${t.title}"]::after{background:${t.color};}`}),e.jsx("div",{className:"hp-qab-icon",style:{background:t.iconBg},children:t.icon}),e.jsxs("div",{children:[e.jsx("div",{className:"hp-qab-title",children:t.title}),e.jsx("div",{className:"hp-qab-sub",children:t.sub})]}),e.jsx("div",{className:"hp-qab-arr",style:{color:"#cbd5e1"},children:"›"})]});return t.external?e.jsx("a",Y(R({href:t.href,target:"_blank",rel:"noopener noreferrer"},i),{children:n}),t.title):e.jsx("a",Y(R({href:t.href},i),{children:n}),t.title)})})}),Ta=o.memo(({ev:t,onPdf:i})=>e.jsx("div",{className:"gc r16",style:{flexShrink:0},children:e.jsxs("div",{className:"hp-ev-card",children:[e.jsxs("div",{className:"hp-ev-imgbox",children:[e.jsx("div",{className:"hp-ev-bdg",children:t.type}),e.jsxs("div",{className:"hp-ev-dt",children:[e.jsx("div",{style:{fontSize:18,fontWeight:900,lineHeight:1},children:t.day||"--"}),e.jsx("div",{style:{fontSize:10,fontWeight:700},children:t.month||"---"})]}),e.jsx("img",{src:t.imageUrl||Sa(t.type),alt:t.title,className:"hp-ev-img",loading:"lazy",decoding:"async"})]}),e.jsxs("div",{className:"hp-ev-info",children:[e.jsx("h3",{className:"hp-ev-title",children:t.title}),e.jsx("div",{className:"hp-ev-desc",dangerouslySetInnerHTML:{__html:t.desc}}),e.jsxs("div",{className:"hp-ev-foot",children:[e.jsxs("span",{className:"hp-ev-loc",children:["📍 ",t.location||"Campus"]}),e.jsx("button",{className:"hp-ev-more",onClick:()=>i(t),children:t.reportLink?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"hp-pdf-bdg",children:"PDF"})," READ REPORT ",e.jsx("span",{className:"arr",children:"›"})]}):e.jsxs(e.Fragment,{children:["READ MORE ",e.jsx("span",{className:"arr",children:"›"})]})})]})]})]})})),$a=o.memo(({img:t,index:i})=>{const[n,a]=Si({threshold:.1,rootMargin:"0px 0px -40px 0px"}),s=i%6*.07;return e.jsx("div",{className:"gc r14",ref:n,style:{transitionDelay:`${s}s`},children:e.jsxs("div",{className:`hp-gal-item sa sa-scale${a?" visible":""}`,children:[e.jsx("img",{src:t.src,alt:t.title,className:"hp-gal-img",loading:"lazy",decoding:"async"}),e.jsxs("div",{className:"hp-gal-ov",children:[e.jsx("div",{className:"hp-gal-cat",children:t.cat}),e.jsx("div",{className:"hp-gal-ttl",children:t.title})]})]})})});function Da(){const[t,i]=o.useState(null),[n,a]=o.useState([]),[s,c]=o.useState(!1);if(o.useEffect(()=>M(Re(L,"settings","youtube"),d=>{i(d.exists()?d.data():null),c(!0)},()=>c(!0)),[]),o.useEffect(()=>{if(!(t!=null&&t.apiKey)||!(t!=null&&t.channelId)){if(t!=null&&t.videoIds){const u=t.videoIds.split(/[\n,]/).map(g=>g.trim()).filter(Boolean).slice(0,3);a(u)}return}const{apiKey:d,channelId:l}=t;Nt(null,null,function*(){var u;try{const m=yield(yield fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${l}&key=${d}`)).json();if(m.error||!((u=m.items)!=null&&u.length))return;const w=m.items[0].contentDetails.relatedPlaylists.uploads,z=yield(yield fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${w}&maxResults=3&key=${d}`)).json();if(z.error)return;const p=z.items.map(b=>b.snippet.resourceId.videoId);a(p)}catch(g){}})},[t]),!s)return null;const r=(t==null?void 0:t.channelName)||"GNC College Official",f=n.length>0;return e.jsx("section",{className:"hp-yt",children:e.jsxs("div",{className:"hp-yt-inner",children:[e.jsx(J,{variant:"up",children:e.jsxs("h2",{className:"hp-yt-h",children:["🎬 Campus ",e.jsx("span",{children:"Video Highlights"})]})}),e.jsx(J,{variant:"fade",delay:"d1",children:e.jsxs("p",{className:"hp-yt-sub",children:["Official ",r," channel se latest videos"]})}),e.jsx("div",{className:"hp-yt-grid",children:f?n.map((d,l)=>e.jsx(J,{variant:"up",delay:`d${l+1}`,children:e.jsx("div",{className:"gc r16",children:e.jsx("iframe",{className:"hp-yt-frame",src:`https://www.youtube.com/embed/${d}`,allowFullScreen:!0,title:d,loading:"lazy"})})},d)):[1,2,3].map(d=>e.jsx(J,{variant:"up",delay:`d${d}`,children:e.jsx("div",{className:"gc r16",children:e.jsxs("div",{className:"hp-yt-ph",children:[e.jsx("div",{className:"hp-yt-ph-icon",children:"▶️"}),e.jsxs("div",{className:"hp-yt-ph-txt",children:["Admin Panel → YouTube tab mein",e.jsx("br",{}),"API Key aur Channel ID add karein"]})]})})},d))}),f&&e.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:32},children:e.jsx(F,{to:"/video-gallery",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#ff0000",color:"#fff",padding:"12px 30px",borderRadius:50,fontSize:14,fontWeight:800,textDecoration:"none",boxShadow:"0 4px 18px rgba(255,0,0,.35)",transition:"transform .2s, box-shadow .2s"},onMouseEnter:d=>{d.currentTarget.style.transform="translateY(-2px)",d.currentTarget.style.boxShadow="0 8px 28px rgba(255,0,0,.45)"},onMouseLeave:d=>{d.currentTarget.style.transform="",d.currentTarget.style.boxShadow="0 4px 18px rgba(255,0,0,.35)"},children:"🎬 View All Videos ›"})})]})})}const Fa=({notices:t,announcements:i,pdfReports:n,sliderSlides:a,events:s,gallery:c})=>{const[r,f]=o.useState("All Moments"),[d,l]=o.useState(null),u=c||[],g=r==="All Moments"?u:u.filter(p=>p.cat===r),m=(s||[]).filter(p=>p.status==="recent"),w=(s||[]).filter(p=>p.status==="upcoming"),k=[...m,...m,...m],z=o.useCallback(p=>{p.reportLink?l(ka(p.reportLink)):alert("Full details coming soon!")},[]);return e.jsxs("div",{className:"hp-root",style:{background:"#f8fafc",minHeight:"100vh",overflowX:"hidden"},children:[e.jsx("style",{children:Ea+Ia}),e.jsx("div",{className:"hp-watermark"}),e.jsx(ca,{slides:a}),e.jsx(pa,{items:Na}),e.jsx(Ba,{}),e.jsx(ua,{notices:t,announcements:i,pdfReports:n,upcomingEvents:w}),e.jsx("section",{id:"about",className:"hp-about",children:e.jsxs("div",{className:"hp-about-inner",children:[e.jsx(J,{variant:"left",slow:!0,children:e.jsxs("div",{className:"hp-imgstack",children:[e.jsx("img",{src:"/gncollege-website/images/college_photo.webp",alt:"Guru Nanak College",className:"hp-img-main",loading:"lazy",decoding:"async"}),e.jsxs("div",{className:"hp-img-accent",children:[e.jsx("div",{style:{fontSize:30,fontWeight:900,color:re,lineHeight:1},children:"56+"}),e.jsx("div",{style:{fontSize:11,opacity:.8,letterSpacing:1},children:"YEARS OF EXCELLENCE"})]})]})}),e.jsxs(J,{variant:"right",slow:!0,className:"hp-about-text",children:[e.jsxs("h2",{className:"hp-at",children:["About the ",e.jsx("span",{children:"College"})]}),e.jsx("span",{className:"hp-asub",children:"Established 1970"}),e.jsx("p",{className:"hp-adesc",children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru. We draw inspiration from the teachings of Guru Nanak Devji, fostering an environment of academic progress and individual development."}),e.jsx("div",{className:"hp-afeat-grid",children:Ra.map(p=>e.jsxs("div",{className:"hp-afeat",children:[e.jsx("span",{style:{fontSize:19,marginTop:2},children:p.icon}),e.jsxs("div",{children:[e.jsx("div",{className:"hp-afeat-t",children:p.title}),e.jsx("div",{className:"hp-afeat-d",children:p.desc})]})]},p.title))}),e.jsxs("div",{className:"hp-cta-row",children:[e.jsxs(F,{to:"/about-us/college-profile",className:"hp-disc arr-link",children:["DISCOVER MORE ",e.jsx("span",{className:"arr",children:"›"})]}),e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:12,fontWeight:700,color:"#888"},children:"FOLLOW US:"}),xt.map(p=>e.jsx("a",{href:p.href,target:"_blank",rel:"noopener noreferrer",className:"hp-soc",children:p.id==="twitter"?"𝕏":p.id==="youtube"?"▶":p.label.charAt(0)},p.id))]})]})]})]})}),e.jsx("div",{className:"hp-sec-divider"}),e.jsx(ma,{}),e.jsx("div",{className:"hp-sec-divider"}),e.jsx("section",{id:"events",className:"hp-events",children:e.jsxs("div",{className:"hp-ev-inner",children:[e.jsx(J,{variant:"up",children:e.jsx(lt,{title:"Recent Events & Happenings",subtitle:"Seminars, workshops aur campus activities ki ek jhalak"})}),m.length>0?e.jsx(J,{variant:"fade",delay:"d1",children:e.jsx("div",{className:"hp-ev-scroller",children:e.jsx("div",{className:"hp-ev-track",children:k.map((p,b)=>e.jsx(Ta,{ev:p,onPdf:z},`${p.id||b}-${b}`))})})}):e.jsx(J,{variant:"scale",children:e.jsxs("div",{className:"hp-ev-empty",children:[e.jsx("div",{style:{fontSize:38,marginBottom:10},children:"📅"}),e.jsx("h3",{style:{color:P,margin:"0 0 8px",textAlign:"center"},children:"No Recent Events"}),e.jsx("p",{style:{color:"#64748b",fontSize:13,textAlign:"center"},children:"Admin Panel → Events se data add karein"})]})}),e.jsx(J,{variant:"right",delay:"d2",style:{display:"flex",justifyContent:"center",marginTop:24},children:e.jsxs(F,{to:"/events",className:"arr-link",style:{display:"inline-flex",alignItems:"center",gap:8,background:`linear-gradient(135deg,${re},#a07010)`,color:P,padding:"12px 28px",borderRadius:50,fontSize:14,fontWeight:900,textDecoration:"none",boxShadow:`0 4px 18px ${re}55`},children:["🏆 View All Events ",e.jsx("span",{className:"arr",children:"›"})]})})]})}),e.jsx(wa,{}),e.jsxs("section",{className:"hp-cnt",children:[e.jsx("div",{className:"hp-cnt-bg"}),e.jsx("div",{className:"hp-cnt-grid",children:Aa.map((p,b)=>e.jsx(J,{variant:"rise",delay:`d${b+1}`,children:e.jsx("div",{className:"gc r16",children:e.jsxs("div",{className:"hp-cnt-box",children:[e.jsx("div",{className:"hp-cnt-icon",children:p.icon}),e.jsx("div",{className:"hp-cnt-num",children:p.value}),e.jsx("div",{className:"hp-cnt-lbl",children:p.label})]})})},p.label))})]}),e.jsx("section",{className:"hp-links",children:e.jsxs("div",{className:"hp-links-inner",children:[e.jsx(J,{variant:"up",children:e.jsx(lt,{title:"Important External Links",subtitle:"Official education and government portals ka quick access"})}),e.jsx("div",{className:"hp-links-grid",children:Ca.map((p,b)=>e.jsx(J,{variant:"scale",delay:`d${b%4+1}`,children:e.jsx("div",{className:"gc r12",children:e.jsxs("a",{href:p.url,target:"_blank",rel:"noopener noreferrer",className:"hp-link-tile",children:[e.jsx("div",{className:"hp-link-icon",children:p.icon}),e.jsx("div",{className:"hp-link-name",children:p.name})]})})},p.name))})]})}),e.jsx("section",{id:"gallery",className:"hp-gal",children:e.jsxs("div",{className:"hp-gal-inner",children:[e.jsx(J,{variant:"up",children:e.jsx(lt,{title:"📸 Photo Gallery",subtitle:"Academic excellence aur cultural heritage ki yadgar jhalak"})}),e.jsx(J,{variant:"fade",delay:"d1",children:e.jsx("div",{className:"hp-gal-filters",children:za.map(p=>e.jsx("button",{className:`hp-filter${r===p?" active":""}`,onClick:()=>f(p),children:p},p))})}),e.jsx("div",{className:"hp-gal-grid",children:g.length>0?g.map((p,b)=>e.jsx($a,{img:p,index:b},b)):e.jsxs(J,{variant:"scale",className:"hp-gal-empty",children:[e.jsx("div",{style:{fontSize:32,marginBottom:10,textAlign:"center"},children:"📸"}),e.jsx("h3",{style:{color:P,margin:"0 0 6px",textAlign:"center"},children:"Gallery Empty"}),e.jsx("p",{style:{color:"#64748b",fontSize:13,textAlign:"center"},children:"Admin Panel → Gallery se photos upload karein"})]})}),u.length>0&&e.jsx(J,{variant:"up",delay:"d2",style:{display:"flex",justifyContent:"center",marginTop:32},children:e.jsxs(F,{to:"/gallery",className:"arr-link",style:{display:"inline-flex",alignItems:"center",gap:8,background:P,color:"#fff",padding:"12px 30px",borderRadius:50,fontSize:14,fontWeight:800,textDecoration:"none",boxShadow:`0 4px 18px ${P}44`,transition:"background .2s, transform .2s"},onMouseEnter:p=>{p.currentTarget.style.background=re,p.currentTarget.style.color=P},onMouseLeave:p=>{p.currentTarget.style.background=P,p.currentTarget.style.color="#fff"},children:["📸 View All Photos ",e.jsx("span",{className:"arr",children:"›"})]})})]})}),e.jsx(Da,{}),d&&fi.createPortal(e.jsx("div",{className:"hp-modal-ov",onClick:()=>l(null),children:e.jsxs("div",{className:"hp-modal-box",onClick:p=>p.stopPropagation(),children:[e.jsxs("div",{className:"hp-modal-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{style:{fontSize:20},children:"📄"})," Official Event Report"]}),e.jsx("button",{className:"hp-modal-close",onClick:()=>l(null),children:"✕"})]}),e.jsx("div",{style:{flex:1,background:"#f1f5f9"},children:e.jsx("iframe",{src:d,title:"Event PDF",width:"100%",height:"100%",style:{border:"none"},allow:"autoplay"})})]})}),document.body)]})},Rt={bhuda:{phone:"+91 79033 40991",email:"info@gncollege.org",address:`Guru Nanak College, Bhuda
Dhanbad, Jharkhand - 826001`},bankMore:{phone:"",email:"vocational@gncollege.org",address:`Guru Nanak College, Bank More
Dhanbad, Jharkhand - 826001`}},Pa=[{id:"1",title:"Prof. In-Charge (Bhuda Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫",order:1},{id:"2",title:"Prof. In-Charge (Bank More Campus)",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"👩‍🏫",order:2},{id:"3",title:"BCA Coordinator",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"💻",order:3},{id:"4",title:"Member, Women's Cell",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛡️",order:4},{id:"5",title:"Member, Anti-Ragging Squad",name:"Prof. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"🛑",order:5},{id:"6",title:"P.A. to Principal",name:"Mr. [Name Here]",phone:"+91 XXXXX XXXXX",icon:"📝",order:6}];function Ma(){const[t,i]=o.useState(Rt),[n,a]=o.useState(Pa),[s,c]=o.useState(!0);o.useEffect(()=>{window.scrollTo(0,0);const d=M(Re(L,"settings","contact"),u=>{if(u.exists()){const g=u.data();i({bhuda:R(R({},Rt.bhuda),g.bhuda||{}),bankMore:R(R({},Rt.bankMore),g.bankMore||{})})}c(!1)},()=>c(!1)),l=M(X(K(L,"contactDirectory"),ne("order","asc")),u=>{u.empty||a(u.docs.map(g=>R({id:g.id},g.data())))},()=>{});return()=>{d(),l()}},[]);const{bhuda:r,bankMore:f}=t;return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes fadeInUp {
          0%   { opacity:0; transform:translateY(30px); }
          100% { opacity:1; transform:translateY(0);    }
        }
        .contact-header {
          background: linear-gradient(135deg, ${j.navy} 0%, #0a1832 100%);
          color: white; padding: 80px 20px 140px; text-align: center; position: relative;
        }
        .header-title { font-size:46px; font-weight:900; margin:0; letter-spacing:-1px; animation:fadeInUp .6s ease-out forwards; }
        .header-title span { color:${j.gold}; }
        .header-sub { font-size:16px; color:#cbd5e1; margin:15px auto 0; max-width:600px; animation:fadeInUp .6s ease-out .2s forwards; opacity:0; line-height:1.6; }

        .campus-container { max-width:1200px; margin:-120px auto 40px; padding:0 20px; display:grid; grid-template-columns:repeat(auto-fit,minmax(400px,1fr)); gap:40px; position:relative; z-index:10; }
        .campus-card { background:#fff; border-radius:20px; overflow:hidden; box-shadow:0 15px 40px rgba(0,0,0,0.07); border:1px solid #e2e8f0; transition:all .4s ease; opacity:0; animation:fadeInUp .8s ease-out forwards; display:flex; flex-direction:column; }
        .campus-card:hover { transform:translateY(-10px); box-shadow:0 25px 50px rgba(15,35,71,.12); border-color:${j.gold}; }
        .card-1 { animation-delay:.3s; } .card-2 { animation-delay:.5s; }

        .card-header { padding:25px 30px; display:flex; align-items:center; gap:15px; background:#fafbfc; border-bottom:1px solid #edf2f7; }
        .campus-icon { width:55px; height:55px; background:rgba(244,160,35,.15); color:${j.gold}; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; flex-shrink:0; }
        .campus-title { font-size:24px; font-weight:800; color:${j.navy}; margin:0; }
        .campus-badge { font-size:11px; padding:4px 10px; border-radius:20px; font-weight:700; margin-top:6px; display:inline-block; letter-spacing:.5px; }

        .card-details { padding:25px 30px; flex-grow:1; }
        .detail-row { display:flex; align-items:flex-start; gap:15px; margin-bottom:20px; }
        .detail-row:last-child { margin-bottom:0; }
        .d-icon { font-size:20px; color:${j.navy}; margin-top:2px; }
        .d-text h4 { margin:0 0 4px; font-size:13px; text-transform:uppercase; letter-spacing:.5px; font-weight:700; color:#718096; }
        .d-text p, .d-text a { margin:0; font-size:15px; color:#2d3748; font-weight:600; text-decoration:none; line-height:1.5; transition:color .2s; white-space:pre-line; }
        .d-text a:hover { color:${j.gold}; }

        .map-container { width:100%; height:250px; border-top:1px solid #edf2f7; }
        .map-container iframe { width:100%; height:100%; border:none; filter:grayscale(10%) contrast(1.05); transition:all .4s; }
        .campus-card:hover .map-container iframe { filter:grayscale(0%) contrast(1); }

        .directory-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:1.5rem; }
        .directory-card { background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:1.5rem; display:flex; align-items:center; gap:1.5rem; transition:all .3s; }
        .directory-card:hover { transform:translateY(-5px); border-color:${j.gold}; box-shadow:0 8px 25px rgba(15,35,71,.08); }
        .dir-icon { font-size:1.8rem; width:50px; height:50px; display:flex; align-items:center; justify-content:center; background:#f1f5f9; border-radius:50%; flex-shrink:0; }
        .dir-title { font-size:.8rem; text-transform:uppercase; letter-spacing:1px; color:#64748b; font-weight:700; margin-bottom:4px; }
        .dir-name  { font-size:1.1rem; font-weight:800; color:${j.navy}; margin-bottom:6px; }
        .dir-contact { font-size:.9rem; font-weight:600; color:#4a5568; text-decoration:none; }
        .dir-contact:hover { color:${j.gold}; }

        @media(max-width:900px) { .campus-container { grid-template-columns:1fr; } }
        @media(max-width:768px) { .contact-header { padding:60px 20px 80px; } .header-title { font-size:36px; } .campus-container { margin-top:-60px; } }
      `}),e.jsxs("header",{className:"contact-header",children:[e.jsxs("h1",{className:"header-title",children:["Get In ",e.jsx("span",{children:"Touch"})]}),e.jsx("p",{className:"header-sub",children:"We are here to assist you. Reach out to our respective campuses or directly contact our administration team for any queries."})]}),e.jsxs("div",{className:"campus-container",children:[e.jsxs("div",{className:"campus-card card-1",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏛️"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bhuda Campus"}),e.jsx("span",{className:"campus-badge",style:{background:j.navy,color:"#fff"},children:"Main Campus • Boys Wing"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsx("p",{children:r.address})]})]}),r.phone&&e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:`tel:${r.phone}`,children:r.phone})]})]}),r.email&&e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:`mailto:${r.email}`,children:r.email})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bhuda Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.089853381653!2d86.43232147533682!3d23.797658878638367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69707963d7e8b%3A0x86733221469e7f7b!2sGuru%20Nanak%20College%20Dhanbad!5e0!3m2!1sen!2sin!4v1708688000000!5m2!1sen!2sin",allowFullScreen:!0,loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})})]}),e.jsxs("div",{className:"campus-card card-2",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"campus-icon",children:"🏢"}),e.jsxs("div",{children:[e.jsx("h2",{className:"campus-title",children:"Bank More Campus"}),e.jsx("span",{className:"campus-badge",style:{background:j.gold,color:j.navyDark},children:"Girls Wing • Vocational Studies"})]})]}),e.jsxs("div",{className:"card-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📍"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Location"}),e.jsx("p",{children:f.address})]})]}),f.phone?e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("a",{href:`tel:${f.phone}`,children:f.phone})]})]}):e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"📞"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Helpdesk"}),e.jsx("p",{style:{color:"#a0aec0",fontStyle:"italic"},children:"Admin Panel se number add karein"})]})]}),f.email&&e.jsxs("div",{className:"detail-row",children:[e.jsx("div",{className:"d-icon",children:"✉️"}),e.jsxs("div",{className:"d-text",children:[e.jsx("h4",{children:"Email ID"}),e.jsx("a",{href:`mailto:${f.email}`,children:f.email})]})]})]}),e.jsx("div",{className:"map-container",children:e.jsx("iframe",{title:"Bank More Campus Map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.630325992144!2d86.4175863149822!3d23.77601898456687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6a3048817a859%3A0x8d365f7d34c52968!2sGuru%20Nanak%20College%20Womens%20Wing!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",allowFullScreen:!0,loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})})]})]}),e.jsx("div",{className:"profile-container",style:{marginTop:0},children:e.jsxs("section",{className:"glass-panel profile-section anim-slide-up",style:{animationDelay:".3s",background:"transparent",boxShadow:"none",border:"none"},children:[e.jsx("h2",{className:"section-heading",style:{textAlign:"center"},children:"Administration Directory"}),e.jsx("div",{className:"heading-underline",style:{margin:"0 auto 30px"}}),s?e.jsx("div",{style:{textAlign:"center",padding:"40px",color:"#64748b",fontWeight:700},children:"Loading directory..."}):e.jsx("div",{className:"directory-grid",children:n.map(d=>e.jsxs("div",{className:"directory-card",children:[e.jsx("div",{className:"dir-icon",children:d.icon||"👤"}),e.jsxs("div",{children:[e.jsx("div",{className:"dir-title",children:d.title}),e.jsx("div",{className:"dir-name",children:d.name}),d.phone&&e.jsxs("a",{href:`tel:${d.phone}`,className:"dir-contact",children:["📞 ",d.phone]})]})]},d.id))})]})})]})}const Ie=j.navy,Ze=j.gold;function La({faculties:t}){const{staffType:i}=xi();o.useEffect(()=>{window.scrollTo(0,0)},[]);const n=i==="teaching-staff",a=n?"Teaching":"Non-Teaching",s=(t||[]).filter(r=>(r.staffType||"Teaching")===a),c=s.reduce((r,f)=>{const d=f.dept||"General";return r[d]||(r[d]=[]),r[d].push(f),r},{});return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsxs("div",{style:{background:`linear-gradient(135deg, ${Ie} 0%, #1a3a7c 100%)`,padding:"70px 20px 50px",textAlign:"center",color:"#fff"},children:[e.jsx("div",{style:{fontSize:48,marginBottom:14},children:n?"🎓":"🏢"}),e.jsxs("h1",{style:{fontSize:"clamp(28px,5vw,42px)",fontWeight:900,margin:"0 0 12px",letterSpacing:"-0.5px"},children:[a," Staff"]}),e.jsxs("p",{style:{color:"#cbd5e1",fontSize:15,margin:0},children:["Guru Nanak College, Dhanbad — Total: ",s.length," members"]})]}),e.jsx("div",{style:{maxWidth:1300,margin:"0 auto",padding:"40px 20px"},children:s.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"80px 20px",background:"#fff",borderRadius:20,border:"2px dashed #e2e8f0"},children:[e.jsx("div",{style:{fontSize:52,marginBottom:16},children:"👨‍🏫"}),e.jsx("h3",{style:{color:Ie,fontWeight:800,margin:"0 0 8px"},children:"Koi data nahi mila"}),e.jsxs("p",{style:{color:"#64748b",margin:0},children:["Admin Panel → Faculty & Staff → ",e.jsx("strong",{children:a})," mein staff add karein"]})]}):Object.entries(c).sort(([r],[f])=>r.localeCompare(f)).map(([r,f])=>e.jsxs("div",{style:{marginBottom:40},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,marginBottom:20},children:[e.jsxs("div",{style:{background:`linear-gradient(135deg, ${Ie}, #1a3a7c)`,color:Ze,borderRadius:10,padding:"6px 20px",fontWeight:800,fontSize:13},children:[n?"📚":"🏢"," ",r]}),e.jsx("div",{style:{flex:1,height:1,background:"linear-gradient(90deg,#0f346044,transparent)"}}),e.jsxs("span",{style:{fontSize:12,color:"#94a3b8",fontWeight:700},children:[f.length," member",f.length>1?"s":""]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",gap:20},children:f.map(d=>e.jsxs("div",{style:{background:"#fff",borderRadius:18,overflow:"hidden",boxShadow:"0 4px 20px rgba(15,35,71,0.07)",border:"1px solid #e2e8f0",transition:"transform 0.2s, box-shadow 0.2s"},onMouseEnter:l=>{l.currentTarget.style.transform="translateY(-4px)",l.currentTarget.style.boxShadow="0 12px 30px rgba(15,35,71,0.13)"},onMouseLeave:l=>{l.currentTarget.style.transform="none",l.currentTarget.style.boxShadow="0 4px 20px rgba(15,35,71,0.07)"},children:[e.jsx("div",{style:{height:4,background:`linear-gradient(90deg, ${Ie}, ${Ze})`}}),e.jsxs("div",{style:{padding:"24px 20px",textAlign:"center"},children:[e.jsxs("div",{style:{position:"relative",display:"inline-block",marginBottom:14},children:[e.jsx("img",{src:d.imageUrl||`https://ui-avatars.com/api/?name=${encodeURIComponent(d.name||"Staff")}&background=0f2347&color=f4a023&size=120`,alt:d.name,style:{width:100,height:100,borderRadius:"50%",objectFit:"cover",border:`3px solid ${Ze}`},onError:l=>{l.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(d.name||"S")}&background=0f2347&color=f4a023&size=120`}}),e.jsx("div",{style:{position:"absolute",bottom:2,right:2,width:18,height:18,borderRadius:"50%",background:n?"#10b981":"#3b82f6",border:"2px solid #fff"}})]}),e.jsx("h3",{style:{margin:"0 0 4px",fontSize:15.5,fontWeight:800,color:Ie,lineHeight:1.3},children:d.name}),d.desig&&e.jsx("p",{style:{margin:"0 0 4px",fontSize:13,color:"#64748b",fontWeight:600},children:d.desig}),d.qual&&e.jsxs("p",{style:{margin:"0 0 8px",fontSize:12,color:Ze,fontWeight:700},children:["🎓 ",d.qual]}),d.specialization&&e.jsx("p",{style:{margin:"0 0 8px",fontSize:12,color:"#94a3b8",lineHeight:1.4},children:d.specialization}),d.email&&e.jsxs("a",{href:`mailto:${d.email}`,style:{display:"inline-flex",alignItems:"center",gap:5,fontSize:12,color:Ie,textDecoration:"none",background:"#f0f4ff",borderRadius:20,padding:"4px 12px",fontWeight:600,marginTop:4},children:["✉️ ",d.email]})]})]},d.id))})]},r))})]})}const D=j==null?void 0:j.navy,Ha="/images/college_photo.jpg",dt={bca:{short:"BCA",icon:"💻",color:"#0ea5e9",heroBg:"linear-gradient(145deg,#f0f9ff,#dbeafe 50%,#fef9ec)",facultyKeys:["BCA"]},bba:{short:"BBA",icon:"📊",color:"#f59e0b",heroBg:"linear-gradient(145deg,#fffbeb,#fef3c7 50%,#f0f9ff)",facultyKeys:["BBA"]},commerce:{short:"Commerce",icon:"🏦",color:"#10b981",heroBg:"linear-gradient(145deg,#f0fdf4,#d1fae5 50%,#fef9ec)",facultyKeys:["Commerce"]},humanities:{short:"Humanities",icon:"📚",color:"#8b5cf6",heroBg:"linear-gradient(145deg,#faf5ff,#ede9fe 50%,#f0f9ff)",facultyKeys:["Hindi","English"],tabs:[{label:"Dept. of Hindi",key:"Hindi",icon:"📖"},{label:"Dept. of English",key:"English",icon:"📝"}]},"social-science":{short:"Social Science",icon:"🌍",color:"#ef4444",heroBg:"linear-gradient(145deg,#fff5f5,#fee2e2 50%,#fef9ec)",facultyKeys:["History","Political Science","Economics"],tabs:[{label:"History",key:"History",icon:"🏛️"},{label:"Political Science",key:"Political Science",icon:"⚖️"},{label:"Economics",key:"Economics",icon:"📈"}]}};function Ga(){const t=o.useRef(null),[i,n]=o.useState(!1);return o.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion:reduce)").matches){n(!0);return}const a=t.current;if(!a)return;const s=new IntersectionObserver(([c])=>{c.isIntersecting&&(n(!0),s.unobserve(a))},{threshold:.07,rootMargin:"0px 0px -36px 0px"});return s.observe(a),()=>s.disconnect()},[]),[t,i]}const V=({children:t,delay:i=0,y:n=22,style:a={}})=>{const[s,c]=Ga();return e.jsx("div",{ref:s,style:R({opacity:c?1:0,transform:c?"none":`translateY(${n}px)`,transition:`opacity .58s cubic-bezier(.22,1,.36,1) ${i}s,
                   transform  .58s cubic-bezier(.22,1,.36,1) ${i}s`},a),children:t})},Ni=({txt:t,color:i})=>e.jsx("span",{style:{background:`${i}14`,border:`1px solid ${i}2a`,color:i,fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,display:"inline-block"},children:t}),Gt=({txt:t,color:i})=>e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,marginBottom:6},children:[e.jsx("div",{style:{width:18,height:2,background:`linear-gradient(90deg,${i},transparent)`,borderRadius:2}}),e.jsx("span",{style:{fontSize:11,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:i},children:t})]}),Se=({label:t,title:i,color:n})=>e.jsxs(V,{children:[e.jsx(Gt,{txt:t,color:n}),e.jsx("h2",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"clamp(20px,2.8vw,28px)",fontWeight:800,color:D,margin:"0 0 28px",letterSpacing:"-.4px"},children:i})]}),ct=({icon:t,msg:i,sub:n,color:a})=>e.jsxs("div",{style:{textAlign:"center",padding:"44px 24px",background:`${a}07`,borderRadius:16,border:`1.5px dashed ${a}28`},children:[e.jsx("div",{style:{fontSize:38,marginBottom:10},children:t}),e.jsx("div",{style:{fontWeight:700,color:D,fontSize:14,marginBottom:5},children:i}),n&&e.jsx("div",{style:{color:"#94a3b8",fontSize:12.5},children:n})]}),Yt=({color:t=D})=>e.jsxs(e.Fragment,{children:[e.jsx("style",{children:"@keyframes dp-spin{to{transform:rotate(360deg)}}"}),e.jsx("div",{style:{width:38,height:38,margin:"60px auto",border:`3px solid ${t}22`,borderTopColor:t,borderRadius:"50%",animation:"dp-spin .75s linear infinite"}})]}),Ya=({fac:t,color:i})=>{var c;const[n,a]=o.useState(!1),s=(c=t.desig)==null?void 0:c.toLowerCase().includes("head");return e.jsxs("div",{style:{background:"#fff",borderRadius:18,overflow:"hidden",border:`1.5px solid ${s?i+"40":"#f1f5f9"}`,boxShadow:s?`0 4px 20px ${i}1a`:"0 2px 12px rgba(15,35,71,.06)",transition:"transform .22s, box-shadow .22s"},onMouseEnter:r=>{r.currentTarget.style.transform="translateY(-5px)",r.currentTarget.style.boxShadow=`0 14px 32px ${i}20`},onMouseLeave:r=>{r.currentTarget.style.transform="",r.currentTarget.style.boxShadow=s?`0 4px 20px ${i}1a`:"0 2px 12px rgba(15,35,71,.06)"},children:[e.jsxs("div",{style:{position:"relative",paddingTop:"110%",background:`linear-gradient(160deg,${i}10,${i}05)`,overflow:"hidden"},children:[e.jsx("img",{src:n||!t.imageUrl?Ha:t.imageUrl,alt:t.name,onError:()=>a(!0),style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center"}}),s&&e.jsx("div",{style:{position:"absolute",top:10,left:10,background:i,color:"#fff",fontSize:9,fontWeight:800,padding:"3px 10px",borderRadius:20,letterSpacing:".8px",textTransform:"uppercase",boxShadow:`0 3px 10px ${i}55`},children:"HOD"})]}),e.jsxs("div",{style:{padding:"14px 16px 18px"},children:[e.jsx("div",{style:{fontWeight:800,fontSize:14,color:D,marginBottom:3,lineHeight:1.3},children:t.name||"—"}),e.jsx("div",{style:{fontSize:12,fontWeight:700,color:i,marginBottom:7},children:t.desig||"Faculty"}),t.qual&&e.jsxs("div",{style:{fontSize:11,color:"#64748b",background:`${i}0e`,border:`1px solid ${i}22`,borderRadius:7,padding:"3px 8px",marginBottom:5},children:["🎓 ",t.qual]}),t.specialization&&e.jsxs("div",{style:{fontSize:11,color:"#94a3b8",lineHeight:1.4,marginBottom:4},children:["✦ ",t.specialization]}),t.email&&e.jsxs("a",{href:`mailto:${t.email}`,style:{display:"block",fontSize:10.5,color:"#94a3b8",marginTop:7,textDecoration:"none",wordBreak:"break-all",transition:"color .15s"},onMouseEnter:r=>r.currentTarget.style.color=i,onMouseLeave:r=>r.currentTarget.style.color="#94a3b8",children:["✉ ",t.email]})]})]})},_a=({keys:t=[],tabs:i,color:n})=>{var k;const[a,s]=o.useState({}),[c,r]=o.useState({}),[f,d]=o.useState(((k=i==null?void 0:i[0])==null?void 0:k.key)||t[0]||""),[l,u]=o.useState(!0),g=o.useRef(new Set);o.useEffect(()=>{if(!t.length){u(!1);return}u(!0),g.current=new Set;const z={},p=[],b=S=>{g.current.add(S),g.current.size>=t.length&&u(!1)};return t.forEach(S=>{const x=N=>[...N].sort((E,v)=>{var I,B;return(I=E.desig)!=null&&I.toLowerCase().includes("head")?-1:(B=v.desig)!=null&&B.toLowerCase().includes("head")?1:(E.name||"").localeCompare(v.name||"")}),h=X(K(L,"faculties"),st("dept","==",S),st("staffType","==","Teaching")),y=M(h,N=>{z[S]=x(N.docs.map(E=>R({id:E.id},E.data()))),s(R({},z)),r(E=>Y(R({},E),{[S]:z[S].length})),b(S)},()=>{const N=X(K(L,"faculties"),st("dept","==",S)),E=M(N,v=>{z[S]=x(v.docs.map(I=>R({id:I.id},I.data())).filter(I=>(I.staffType||"Teaching")==="Teaching")),s(R({},z)),r(I=>Y(R({},I),{[S]:z[S].length})),b(S)},()=>b(S));p.push(E)});p.push(y)}),()=>p.forEach(S=>S())},[t.join(",")]);const m=Object.values(c).reduce((z,p)=>z+p,0),w=a[f]||[];return e.jsxs("div",{children:[e.jsx(V,{children:e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:8},children:[e.jsxs("div",{children:[e.jsx(Gt,{txt:"Faculty Roster",color:n}),e.jsx("h2",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"clamp(20px,2.8vw,28px)",fontWeight:800,color:D,margin:"0 0 4px",letterSpacing:"-.4px"},children:"Meet the Faculty"}),e.jsx("p",{style:{color:"#94a3b8",fontSize:12.5,margin:0},children:"Admin Panel se add/remove karein — real-time update hoga"})]}),m>0&&e.jsxs("div",{style:{background:`linear-gradient(135deg,${D},#1a3a7c)`,color:"#fff",padding:"7px 18px",borderRadius:10,fontSize:13,fontWeight:700},children:[m," Member",m!==1?"s":""]})]})}),e.jsx("div",{style:{height:3,borderRadius:99,background:`linear-gradient(90deg,${n},transparent)`,margin:"16px 0 28px"}}),i&&i.length>1&&e.jsx(V,{delay:.06,children:e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:0,marginBottom:32,borderBottom:"2px solid #f1f5f9"},children:i.map(z=>{const p=f===z.key;return e.jsxs("button",{onClick:()=>d(z.key),style:{display:"inline-flex",alignItems:"center",gap:7,padding:"11px 20px",border:"none",fontFamily:"inherit",fontSize:13.5,fontWeight:700,cursor:"pointer",color:p?"#fff":"#64748b",background:p?`linear-gradient(135deg,${D},#1a3a7c)`:"transparent",borderRadius:"8px 8px 0 0",marginBottom:-2,borderBottom:"3px solid transparent",transition:"all .18s"},children:[e.jsx("span",{style:{fontSize:16},children:z.icon}),z.label,(c[z.key]||0)>0&&e.jsx("span",{style:{background:p?"rgba(255,255,255,.22)":"#f1f5f9",color:p?"#fff":"#64748b",fontSize:11,fontWeight:800,padding:"1px 7px",borderRadius:10},children:c[z.key]})]},z.key)})})}),l?e.jsx(Yt,{color:n}):w.length===0?e.jsx(ct,{icon:"👨‍🏫",msg:"Faculty data abhi available nahi",sub:`Admin Panel → Faculty Directory → Dept: ${f} mein add karein`,color:n}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(188px,1fr))",gap:18},children:w.map((z,p)=>e.jsx(V,{delay:p*.05,y:16,children:e.jsx(Ya,{fac:z,color:n})},z.id))})]})},Ua=({pdf:t,onClose:i})=>(o.useEffect(()=>{const n=a=>{a.key==="Escape"&&i()};return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[i]),e.jsx("div",{onClick:i,style:{position:"fixed",inset:0,zIndex:99999,background:"rgba(15,35,71,.72)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20},children:e.jsxs("div",{onClick:n=>n.stopPropagation(),style:{background:"#fff",borderRadius:20,overflow:"hidden",width:"92%",maxWidth:920,height:"88vh",display:"flex",flexDirection:"column",boxShadow:"0 32px 64px rgba(0,0,0,.32)"},children:[e.jsxs("div",{style:{background:D,color:"#fff",padding:"13px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{style:{fontSize:18},children:"📄"}),e.jsx("span",{style:{fontWeight:800,fontSize:14},children:t.title}),t.year&&e.jsxs("span",{style:{fontSize:12,opacity:.7},children:["• ",t.year]})]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("a",{href:t.pdfUrl,target:"_blank",rel:"noreferrer",style:{background:"rgba(255,255,255,.15)",color:"#fff",padding:"5px 13px",borderRadius:8,textDecoration:"none",fontSize:12,fontWeight:700},children:"↗ Open"}),e.jsx("button",{onClick:i,style:{background:"rgba(255,255,255,.15)",border:"none",color:"#fff",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:14},children:"✕"})]})]}),e.jsx("iframe",{src:t.pdfUrl,title:t.title,style:{flex:1,border:"none",width:"100%"}})]})}));function Oa({slug:t}){var y,N,E,v,I,B,G,Q,te,Z,$;const i=dt[t]||{short:t.toUpperCase(),icon:"🏛️",color:D,heroBg:"linear-gradient(145deg,#f8fafc,#f1f5f9)",facultyKeys:[t]},n=i.color,[a,s]=o.useState(null),[c,r]=o.useState(!0),[f,d]=o.useState(null),[l,u]=o.useState(null);if(o.useEffect(()=>{d(null);const C=M(Re(L,"departments",t),T=>{const ae=T.exists()?T.data():{};s(ae);const q=Object.keys(ae.curriculum||{});q.length&&d(q[0]),r(!1)},()=>r(!1));return()=>C()},[t]),c)return e.jsx("div",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif"},children:e.jsx(Yt,{color:n})});const g=a||{},m=g.curriculum||{},w=Object.keys(m),k=g.feeStructure||[],z=g.achievements||[],p=g.programReports||[],b=g.highlights||[],S=g.facilities||[],x=i.facultyKeys||[i.short],h=f||w[0];return e.jsxs("div",{style:{fontFamily:"'Plus Jakarta Sans','DM Sans',sans-serif",background:"#f8fafc",minHeight:"100vh",color:"#334155"},children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        @keyframes dp-spin{to{transform:rotate(360deg)}}

        .dp-hl{background:#fff;border:1.5px solid #f1f5f9;border-radius:16px;padding:22px 20px;height:100%;transition:all .22s;}
        .dp-hl:hover{border-color:${n}3a;box-shadow:0 10px 28px ${n}12;transform:translateY(-3px);}

        .dp-fac-card{background:#fff;border:1.5px solid #f1f5f9;border-radius:14px;padding:20px;
          display:flex;gap:14px;align-items:flex-start;transition:all .2s;}
        .dp-fac-card:hover{border-color:${n}38;box-shadow:0 6px 20px ${n}0e;}

        .dp-rep{display:flex;align-items:center;gap:16px;background:#fff;border:1.5px solid #f1f5f9;
          border-radius:14px;padding:18px 20px;cursor:pointer;transition:all .2s;}
        .dp-rep:hover{border-color:${n}38;box-shadow:0 6px 20px ${n}0e;}

        .dp-ach{display:flex;gap:12px;align-items:flex-start;padding:14px 18px;
          background:#fff;border:1.5px solid #f1f5f9;border-radius:12px;transition:border-color .18s;}
        .dp-ach:hover{border-color:${n}38;}

        .dp-subj{display:flex;align-items:center;gap:11px;padding:11px 15px;
          background:#fff;border:1.5px solid #f1f5f9;border-radius:10px;transition:all .18s;}
        .dp-subj:hover{border-color:${n}38;background:${n}06;transform:translateX(4px);}

        .dp-sem{padding:8px 17px;border:1.5px solid #e2e8f0;border-radius:9px;background:#fff;
          color:#64748b;font-family:inherit;font-size:12.5px;font-weight:600;cursor:pointer;transition:all .18s;}
        .dp-sem:hover{border-color:${n};color:${n};}
        .dp-sem.on{background:linear-gradient(135deg,${D},#1a3a7c);color:#fff;border-color:transparent;box-shadow:0 4px 14px ${n}28;}

        .dp-fee-hd{display:grid;grid-template-columns:2fr 1fr 2fr;
          background:linear-gradient(135deg,${D},#1a3a7c);padding:13px 20px;border-radius:14px 14px 0 0;}
        .dp-fee-row{display:grid;grid-template-columns:2fr 1fr 2fr;padding:14px 20px;border-bottom:1px solid #f1f5f9;}
        .dp-fee-row:last-child{border-bottom:none;}
        .dp-fee-row:nth-child(even){background:#f8fafc;}

        @media(max-width:900px){
          .dp-g3{grid-template-columns:1fr 1fr !important;}
        }
        @media(max-width:640px){
          .dp-g3{grid-template-columns:1fr !important;}
          .dp-g2{grid-template-columns:1fr !important;}
          .dp-fee-hd,.dp-fee-row{grid-template-columns:1fr 1fr !important;}
          .dp-fee-note{display:none;}
        }
      `}),e.jsxs("div",{style:{background:i.heroBg,borderBottom:`1px solid ${n}1a`,padding:"60px 20px 52px",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:-80,right:-70,width:380,height:380,borderRadius:"50%",background:`radial-gradient(circle,${n}16 0%,transparent 70%)`,pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",bottom:-50,left:"8%",width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle,rgba(244,160,35,.07) 0%,transparent 70%)",pointerEvents:"none"}}),e.jsx("div",{style:{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1},children:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:40,alignItems:"center"},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:`${n}16`,color:n,fontSize:12,fontWeight:700,padding:"5px 14px",borderRadius:20,marginBottom:18,letterSpacing:".5px"},children:[i.icon," Academic Department"]}),e.jsx("h1",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"clamp(28px,4.5vw,52px)",fontWeight:800,color:D,lineHeight:1.06,letterSpacing:"-1.5px",margin:"0 0 14px"},children:g.fullName||i.fullName||g.name||i.short}),g.tagline&&e.jsx("p",{style:{fontSize:15.5,color:"#64748b",lineHeight:1.8,maxWidth:480,margin:"0 0 22px",fontWeight:400},children:g.tagline}),x.length>1&&e.jsx("div",{style:{display:"flex",gap:7,flexWrap:"wrap",marginBottom:24},children:x.map(C=>e.jsx(Ni,{txt:C,color:n},C))}),e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>{var C;return(C=document.getElementById("faculty"))==null?void 0:C.scrollIntoView({behavior:"smooth",block:"start"})},style:{background:`linear-gradient(135deg,${D},#1a3a7c)`,color:"#fff",padding:"11px 24px",borderRadius:10,border:"none",fontWeight:700,fontSize:13.5,boxShadow:`0 4px 16px ${D}28`,display:"inline-flex",alignItems:"center",gap:7,cursor:"pointer",fontFamily:"inherit"},children:"👨‍🏫 Faculty Roster"}),k.length>0&&e.jsx("button",{onClick:()=>{var C;return(C=document.getElementById("fees"))==null?void 0:C.scrollIntoView({behavior:"smooth",block:"start"})},style:{background:"#fff",border:`1.5px solid ${n}`,color:n,padding:"11px 24px",borderRadius:10,fontWeight:700,fontSize:13.5,display:"inline-flex",alignItems:"center",gap:7,cursor:"pointer",fontFamily:"inherit"},children:"💰 Fee Structure"})]})]}),e.jsxs("div",{style:{background:"#fff",borderRadius:22,padding:26,boxShadow:`0 8px 36px ${n}16`,border:`1px solid ${n}1e`},children:[e.jsxs("div",{style:{display:"flex",gap:14,alignItems:"center",marginBottom:20,paddingBottom:20,borderBottom:"1px solid #f1f5f9"},children:[e.jsx("div",{style:{width:54,height:54,borderRadius:14,background:`${n}14`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0,overflow:"hidden"},children:(y=g.hod)!=null&&y.imageUrl?e.jsx("img",{src:g.hod.imageUrl,alt:g.hod.name,style:{width:"100%",height:"100%",objectFit:"cover"}}):"👨‍🏫"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,color:"#94a3b8",fontWeight:700,letterSpacing:".6px",textTransform:"uppercase",marginBottom:3},children:"Head of Department"}),e.jsx("div",{style:{fontWeight:800,color:D,fontSize:15},children:((N=g.hod)==null?void 0:N.name)||"Add from Admin Panel"}),((E=g.hod)==null?void 0:E.qual)&&e.jsx("div",{style:{fontSize:12,color:n,fontWeight:600,marginTop:2},children:g.hod.qual})]})]}),(g.stats||[]).length>0?e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1},children:g.stats.slice(0,4).map((C,T)=>e.jsxs("div",{style:{padding:"14px 12px",borderRight:T%2===0?"1px solid #f1f5f9":"none",borderBottom:T<2?"1px solid #f1f5f9":"none",textAlign:"center"},children:[C.icon&&e.jsx("div",{style:{fontSize:20,marginBottom:4},children:C.icon}),e.jsx("div",{style:{fontSize:18,fontWeight:800,color:D,lineHeight:1},children:C.value}),e.jsx("div",{style:{fontSize:11,color:n,fontWeight:700,marginTop:3},children:C.label}),C.sub&&e.jsx("div",{style:{fontSize:10.5,color:"#94a3b8",marginTop:2},children:C.sub})]},T))}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1},children:[{l:"Programme",v:"UG Degree"},{l:"Duration",v:"3 Years"},{l:"University",v:"BBMKU"},{l:"Status",v:"UGC Approved"}].map((C,T)=>e.jsxs("div",{style:{padding:"13px 12px",borderRight:T%2===0?"1px solid #f1f5f9":"none",borderBottom:T<2?"1px solid #f1f5f9":"none",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:15,fontWeight:800,color:D},children:C.v}),e.jsx("div",{style:{fontSize:11,color:"#94a3b8",fontWeight:600,marginTop:2},children:C.l})]},T))})]})]})})]}),e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",padding:"0 20px"},children:[(g.about||g.vision||g.mission)&&e.jsxs("div",{style:{padding:"64px 0 0",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:40},children:[g.about&&e.jsxs(V,{children:[e.jsx(Gt,{txt:"About the Department",color:n}),e.jsxs("h2",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"clamp(20px,2.5vw,28px)",fontWeight:800,color:D,margin:"0 0 14px",letterSpacing:"-.4px"},children:["About ",e.jsx("span",{style:{color:n},children:i.short})]}),e.jsx("p",{style:{color:"#64748b",lineHeight:1.9,fontSize:15,margin:0},children:g.about})]}),(g.vision||g.mission)&&e.jsx(V,{delay:.1,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[g.vision&&e.jsxs("div",{style:{background:`${n}08`,border:`1.5px solid ${n}1e`,borderRadius:16,padding:"20px 22px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:9,marginBottom:10},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:9,background:"#fff",boxShadow:"0 2px 8px rgba(0,0,0,.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16},children:"🎯"}),e.jsx("span",{style:{fontWeight:800,color:D,fontSize:14},children:"Vision"})]}),e.jsx("p",{style:{color:"#64748b",lineHeight:1.8,fontSize:13.5,margin:0},children:g.vision})]}),g.mission&&e.jsxs("div",{style:{background:"#fef9ec",border:"1.5px solid #fed7aa",borderRadius:16,padding:"20px 22px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:9,marginBottom:10},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:9,background:"#fff",boxShadow:"0 2px 8px rgba(0,0,0,.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16},children:"🚀"}),e.jsx("span",{style:{fontWeight:800,color:D,fontSize:14},children:"Mission"})]}),e.jsx("p",{style:{color:"#64748b",lineHeight:1.8,fontSize:13.5,margin:0},children:g.mission})]})]})})]}),b.length>0&&e.jsxs("div",{style:{padding:"64px 0 0"},children:[e.jsx(Se,{label:"Highlights",title:"Why Choose Us?",color:n}),e.jsx("div",{className:"dp-g3",style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14},children:b.map((C,T)=>e.jsx(V,{delay:T*.06,y:18,children:e.jsxs("div",{className:"dp-hl",children:[e.jsx("div",{style:{width:42,height:42,borderRadius:12,background:`${n}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:12},children:C.icon}),e.jsx("div",{style:{fontWeight:700,color:D,fontSize:13.5,marginBottom:6,lineHeight:1.4},children:C.title}),e.jsx("div",{style:{color:"#64748b",fontSize:13,lineHeight:1.65},children:C.desc})]})},T))})]}),S.length>0&&e.jsxs("div",{style:{padding:"64px 0 0"},children:[e.jsx(Se,{label:"Infrastructure",title:"Labs & Facilities",color:n}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14},children:S.map((C,T)=>e.jsx(V,{delay:T*.07,y:16,children:e.jsxs("div",{style:{display:"flex",gap:14,background:"#fff",border:"1.5px solid #f1f5f9",borderRadius:14,padding:"18px 20px",alignItems:"flex-start",transition:"all .2s"},onMouseEnter:ae=>{ae.currentTarget.style.borderColor=`${n}38`,ae.currentTarget.style.boxShadow=`0 6px 18px ${n}0c`},onMouseLeave:ae=>{ae.currentTarget.style.borderColor="#f1f5f9",ae.currentTarget.style.boxShadow="none"},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:12,background:`${n}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0},children:C.icon}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,color:D,fontSize:14,marginBottom:4},children:C.name}),e.jsx("div",{style:{color:"#64748b",fontSize:12.5,lineHeight:1.6},children:C.desc})]})]})},T))})]}),w.length>0&&e.jsxs("div",{id:"curriculum",style:{padding:"64px 0 0"},children:[e.jsx(Se,{label:"Academic Curriculum",title:"Semester-wise Subjects",color:n}),e.jsx(V,{delay:.06,children:e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:22},children:w.map(C=>e.jsx("button",{className:`dp-sem${h===C?" on":""}`,onClick:()=>d(C),children:C},C))})}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:10},children:(m[h]||[]).map((C,T)=>e.jsx(V,{delay:T*.04,y:14,children:e.jsxs("div",{className:"dp-subj",children:[e.jsx("div",{style:{width:27,height:27,borderRadius:7,background:`linear-gradient(135deg,${D},#1a3a7c)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11,fontWeight:700,color:"#fff"},children:String(T+1).padStart(2,"0")}),e.jsx("span",{style:{fontSize:13.5,color:"#334155",fontWeight:500,lineHeight:1.4},children:C})]})},T))})]}),e.jsx("div",{id:"faculty",style:{padding:"64px 0 0"},children:e.jsx(_a,{keys:x,tabs:i.tabs,color:n})}),e.jsxs("div",{id:"fees",style:{padding:"64px 0 0"},children:[e.jsx(Se,{label:"Academic Fees",title:"Fee Structure",color:n}),k.length===0?e.jsx(V,{children:e.jsx(ct,{icon:"💰",msg:"Fee structure abhi add nahi ki gayi",sub:"Admin Panel → Departments → [Dept] → Fee Structure mein add karein",color:n})}):e.jsx(V,{delay:.06,children:e.jsxs("div",{style:{background:"#fff",border:"1.5px solid #f1f5f9",borderRadius:16,overflow:"hidden",boxShadow:"0 4px 20px rgba(15,35,71,.06)"},children:[e.jsx("div",{className:"dp-fee-hd",children:["Fee Category","Amount (₹)","Notes"].map(C=>e.jsx("div",{className:C==="Notes"?"dp-fee-note":"",style:{fontSize:11.5,fontWeight:700,color:"rgba(255,255,255,.75)",letterSpacing:".5px",textTransform:"uppercase"},children:C},C))}),k.map((C,T)=>e.jsxs("div",{className:"dp-fee-row",children:[e.jsx("div",{style:{fontSize:14,fontWeight:600,color:D},children:C.category}),e.jsxs("div",{style:{fontSize:15,fontWeight:800,color:n},children:["₹ ",Number(C.amount).toLocaleString("en-IN")]}),e.jsx("div",{className:"dp-fee-note",style:{fontSize:13,color:"#64748b"},children:C.note||"—"})]},T)),k.length>1&&e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr 2fr",padding:"14px 20px",background:`${n}0a`,borderTop:`2px solid ${n}1e`},children:[e.jsx("div",{style:{fontSize:14,fontWeight:800,color:D},children:"Total Annual Fee"}),e.jsxs("div",{style:{fontSize:15,fontWeight:800,color:n},children:["₹ ",k.reduce((C,T)=>C+(Number(T.amount)||0),0).toLocaleString("en-IN")]}),e.jsx("div",{})]})]})})]}),e.jsxs("div",{style:{padding:"64px 0 0"},children:[e.jsx(Se,{label:"Reports & Documents",title:"Programme & Activity Reports",color:n}),p.length===0?e.jsx(V,{children:e.jsx(ct,{icon:"📋",msg:"Koi report upload nahi ki gayi",sub:"Admin Panel → Departments → [Dept] → Reports mein PDF link add karein",color:n})}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14},children:p.map((C,T)=>e.jsx(V,{delay:T*.06,y:14,children:e.jsxs("div",{className:"dp-rep",onClick:()=>u(C),children:[e.jsx("div",{style:{width:48,height:48,borderRadius:12,background:"#fee2e2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0},children:"📄"}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontWeight:700,color:D,fontSize:13.5,marginBottom:3,lineHeight:1.3},children:C.title}),e.jsx("div",{style:{fontSize:12,color:"#94a3b8"},children:C.year||""})]}),e.jsx("div",{style:{background:`${n}12`,border:`1.5px solid ${n}28`,color:n,fontSize:11.5,fontWeight:800,padding:"5px 12px",borderRadius:8,flexShrink:0},children:"VIEW →"})]})},T))})]}),e.jsxs("div",{style:{padding:"64px 0 0"},children:[e.jsx(Se,{label:"Achievements",title:"Department Milestones",color:n}),z.length===0?e.jsx(V,{children:e.jsx(ct,{icon:"🏆",msg:"Achievements abhi add nahi ki gayi",sub:"Admin Panel → Departments → [Dept] → Achievements mein add karein",color:n})}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12},children:z.map((C,T)=>e.jsx(V,{delay:T*.05,y:14,children:e.jsxs("div",{className:"dp-ach",children:[e.jsx("div",{style:{width:8,height:8,borderRadius:"50%",background:`linear-gradient(135deg,${n},${n}88)`,flexShrink:0,marginTop:7,boxShadow:`0 0 6px ${n}55`}}),e.jsx("span",{style:{color:"#475569",fontSize:13.5,lineHeight:1.65},children:C})]})},T))})]}),e.jsxs("div",{style:{padding:"64px 0 80px"},children:[e.jsx(Se,{label:"From the Head of Department",title:"HOD's Message",color:n}),e.jsx(V,{delay:.08,children:e.jsxs("div",{className:"dp-g2",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24},children:[e.jsxs("div",{style:{background:`linear-gradient(145deg,${n}0a,${n}04)`,border:`1.5px solid ${n}1e`,borderRadius:20,padding:"28px 26px"},children:[e.jsx("div",{style:{width:68,height:68,borderRadius:16,overflow:"hidden",background:`${n}14`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,marginBottom:16,border:`2px solid ${n}28`},children:(v=g.hod)!=null&&v.imageUrl?e.jsx("img",{src:g.hod.imageUrl,alt:(I=g.hod)==null?void 0:I.name,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}):"👨‍🏫"}),e.jsx("div",{style:{fontWeight:800,color:D,fontSize:17,marginBottom:3},children:((B=g.hod)==null?void 0:B.name)||"Prof. [Name]"}),e.jsx("div",{style:{color:n,fontSize:13,fontWeight:700,marginBottom:4},children:((G=g.hod)==null?void 0:G.desig)||`HOD, ${i.short}`}),((Q=g.hod)==null?void 0:Q.qual)&&e.jsx("div",{style:{color:"#94a3b8",fontSize:12.5,marginBottom:16},children:g.hod.qual}),e.jsxs("div",{style:{borderTop:`1px solid ${n}1e`,paddingTop:14,display:"flex",flexDirection:"column",gap:9},children:[((te=g.hod)==null?void 0:te.email)&&e.jsxs("a",{href:`mailto:${g.hod.email}`,style:{display:"flex",alignItems:"center",gap:8,color:"#475569",fontSize:13,textDecoration:"none"},children:[e.jsx("span",{style:{color:n},children:"✉"}),g.hod.email]}),((Z=g.hod)==null?void 0:Z.phone)&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,color:"#475569",fontSize:13},children:[e.jsx("span",{style:{color:n},children:"📞"}),g.hod.phone]})]})]}),e.jsxs("div",{style:{background:"#fff",border:"1.5px solid #f1f5f9",borderRadius:20,padding:"28px 26px",display:"flex",flexDirection:"column",justifyContent:"center"},children:[e.jsx("div",{style:{fontSize:48,color:`${n}35`,fontFamily:"Georgia,serif",lineHeight:1,marginBottom:12},children:'"'}),e.jsx("p",{style:{color:"#475569",lineHeight:1.9,fontSize:15,margin:"0 0 14px",fontStyle:"italic"},children:(($=g.hod)==null?void 0:$.message)||"Admin Panel → Departments → HOD Info → Message mein add karein."}),e.jsx("div",{style:{fontSize:48,color:`${n}35`,fontFamily:"Georgia,serif",lineHeight:1,textAlign:"right"},children:'"'})]})]})})]})]}),e.jsx("div",{style:{borderTop:"1px solid #f1f5f9",padding:"22px 20px",textAlign:"center"},children:e.jsx(F,{to:"/academics/departments",style:{color:"#94a3b8",fontSize:13,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:7,transition:"color .15s"},onMouseEnter:C=>C.currentTarget.style.color=n,onMouseLeave:C=>C.currentTarget.style.color="#94a3b8",children:"← Back to All Departments"})}),l&&e.jsx(Ua,{pdf:l,onClose:()=>u(null)})]})}function qa(){const[t,i]=o.useState([]),[n,a]=o.useState(!0);return o.useEffect(()=>{const s=Object.keys(dt),c={},r=new Set,f=()=>{r.size>=s.length&&(i(s.map(l=>c[l])),a(!1))},d=s.map(l=>M(Re(L,"departments",l),u=>{c[l]=R(R({slug:l},dt[l]),u.exists()?u.data():{}),r.add(l),r.size>=s.length&&(i(s.map(g=>c[g])),a(!1))},()=>{c[l]=R({slug:l},dt[l]),r.add(l),f()}));return()=>d.forEach(l=>l())},[]),e.jsxs("div",{style:{fontFamily:"'Plus Jakarta Sans','DM Sans',sans-serif",background:"#f8fafc",minHeight:"100vh"},children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        @keyframes dp-spin{to{transform:rotate(360deg)}}
        .dp-hcard{border-radius:20px;overflow:hidden;background:#fff;box-shadow:0 4px 20px rgba(15,35,71,.07);border:1.5px solid #f1f5f9;height:100%;transition:transform .22s,box-shadow .22s;text-decoration:none;display:block;color:inherit;}
        .dp-hcard:hover{transform:translateY(-6px);box-shadow:0 18px 40px rgba(15,35,71,.12);}
      `}),e.jsxs("div",{style:{background:"linear-gradient(145deg,#f0f9ff,#e0f2fe 40%,#fef9ec 100%)",borderBottom:"1px solid #e0f2fe",padding:"60px 20px 52px",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:-80,right:-60,width:360,height:360,borderRadius:"50%",background:"radial-gradient(circle,rgba(14,165,233,.1) 0%,transparent 70%)",pointerEvents:"none"}}),e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1,textAlign:"center"},children:[e.jsxs("div",{style:{fontSize:12.5,color:"#94a3b8",marginBottom:22,display:"flex",gap:6,justifyContent:"center"},children:[e.jsx(F,{to:"/",style:{color:"inherit",textDecoration:"none"},children:"Home"}),e.jsx("span",{children:"›"}),e.jsx("span",{style:{color:D,fontWeight:600},children:"Academic Departments"})]}),e.jsx("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:"#e0f2fe",color:"#0ea5e9",fontSize:12,fontWeight:700,padding:"5px 14px",borderRadius:20,marginBottom:16},children:"🏛️ Academics"}),e.jsx("h1",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"clamp(28px,5vw,50px)",fontWeight:800,color:D,lineHeight:1.08,letterSpacing:"-1.5px",margin:"0 0 14px"},children:"Our Academic Departments"}),e.jsx("p",{style:{color:"#64748b",fontSize:15.5,maxWidth:460,margin:"0 auto",lineHeight:1.75},children:"5 vibrant departments — quality education aur career growth ke liye dedicated"})]})]}),e.jsx("div",{style:{maxWidth:1240,margin:"0 auto",padding:"48px 20px 72px"},children:n?e.jsx(Yt,{}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:18},children:t.map((s,c)=>{var r;return e.jsx(V,{delay:c*.07,y:20,children:e.jsxs(F,{to:`/academics/departments/${s.slug}`,className:"dp-hcard",children:[e.jsx("div",{style:{height:4,background:`linear-gradient(90deg,${s.color},${s.color}55)`}}),e.jsxs("div",{style:{padding:"22px 20px 26px"},children:[e.jsx("div",{style:{width:52,height:52,borderRadius:14,background:`${s.color}14`,border:`1.5px solid ${s.color}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,marginBottom:14},children:s.icon}),e.jsx("div",{style:{fontSize:10.5,fontWeight:700,color:s.color,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:5},children:s.short}),e.jsx("div",{style:{fontSize:14,fontWeight:800,color:D,lineHeight:1.35,marginBottom:8},children:s.fullName||s.name||s.full}),s.tagline&&e.jsx("div",{style:{fontSize:12,color:"#94a3b8",lineHeight:1.5,marginBottom:12},children:s.tagline}),((r=s.facultyKeys)==null?void 0:r.length)>1&&e.jsx("div",{style:{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12},children:s.facultyKeys.map(f=>e.jsx(Ni,{txt:f,color:s.color},f))}),e.jsx("div",{style:{display:"inline-flex",alignItems:"center",gap:5,background:`${s.color}12`,border:`1.5px solid ${s.color}28`,color:s.color,padding:"6px 14px",borderRadius:9,fontSize:12,fontWeight:700},children:"Read More →"})]})]})},s.slug)})})})]})}function ai(){const{deptSlug:t}=xi();return t?e.jsx(Oa,{slug:t}):e.jsx(qa,{})}const Ne=j==null?void 0:j.navy,ze=j==null?void 0:j.gold,ri=["All","Seminars","Cultural","NSS","Sports","Campus","Departments","Achievements"];function Wt({gallery:t}){const[i,n]=o.useState([]),[a,s]=o.useState("All"),[c,r]=o.useState(null),[f,d]=o.useState(!0);o.useEffect(()=>{if(window.scrollTo(0,0),t){n(t),d(!1);return}const w=X(K(L,"gallery"),ne("createdAt","desc"));return M(w,k=>{n(k.docs.map(z=>R({id:z.id},z.data()))),d(!1)},()=>d(!1))},[t]);const l=a==="All"?i:i.filter(w=>w.cat===a),u=o.useCallback(()=>r(null),[]),g=o.useCallback(()=>r(w=>w>0?w-1:l.length-1),[l.length]),m=o.useCallback(()=>r(w=>w<l.length-1?w+1:0),[l.length]);return o.useEffect(()=>{if(c===null)return;const w=k=>{k.key==="Escape"&&u(),k.key==="ArrowLeft"&&g(),k.key==="ArrowRight"&&m()};return window.addEventListener("keydown",w),()=>window.removeEventListener("keydown",w)},[c,u,g,m]),e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:'"Amazon Ember","Inter",sans-serif'},children:[e.jsx("style",{children:`
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
          color:${ze}; font-size:10px; font-weight:800; letter-spacing:.5px;
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
          color:${Ne}; font-weight:700; font-size:13px;
          cursor:pointer; transition:all .2s;
          font-family:inherit;
        }
        .gal-filter:hover { border-color:${ze}; transform:translateY(-2px); }
        .gal-filter.active {
          background:${Ne}; color:#fff; border-color:${Ne};
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
      `}),e.jsxs("div",{style:{background:`linear-gradient(135deg,${Ne} 0%,#1a3a7c 100%)`,padding:"70px 20px 60px",textAlign:"center",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(244,160,35,.07) 1px, transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:4,background:ze}}),e.jsxs("div",{style:{position:"relative",zIndex:1},children:[e.jsxs("nav",{style:{display:"flex",alignItems:"center",gap:8,justifyContent:"center",marginBottom:16,fontSize:13,fontWeight:600},children:[e.jsx(F,{to:"/",style:{color:"rgba(255,255,255,.5)",textDecoration:"none"},children:"🏠 Home"}),e.jsx("span",{style:{color:"rgba(255,255,255,.3)"},children:"›"}),e.jsx("span",{style:{color:ze},children:"Photo Gallery"})]}),e.jsx("h1",{style:{color:"#fff",fontSize:"clamp(28px,5vw,48px)",fontWeight:900,margin:"0 0 12px",letterSpacing:"-1px"},children:"📸 Photo Gallery"}),e.jsx("p",{style:{color:"rgba(255,255,255,.65)",fontSize:15,maxWidth:520,margin:"0 auto 24px"},children:"Campus life, events, achievements aur college ke yaadgar pal"}),e.jsx("div",{style:{display:"flex",justifyContent:"center",gap:24,flexWrap:"wrap"},children:[{n:i.length+"+",l:"Total Photos"},{n:ri.length-1,l:"Categories"}].map((w,k)=>e.jsxs("div",{style:{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.15)",borderRadius:10,padding:"10px 22px",backdropFilter:"blur(8px)"},children:[e.jsx("div",{style:{fontSize:22,fontWeight:900,color:ze,lineHeight:1},children:w.n}),e.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,.55)",marginTop:3,fontWeight:600},children:w.l})]},k))})]})]}),e.jsxs("div",{style:{maxWidth:1300,margin:"0 auto",padding:"48px 20px"},children:[e.jsx("div",{style:{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap",marginBottom:40},children:ri.map(w=>e.jsx("button",{className:`gal-filter${a===w?" active":""}`,onClick:()=>s(w),children:w==="All"?"📸 "+w:w},w))}),e.jsx("div",{style:{textAlign:"center",marginBottom:28},children:e.jsxs("span",{style:{background:`${Ne}12`,color:Ne,fontWeight:800,fontSize:13,padding:"5px 16px",borderRadius:20},children:[l.length," photo",l.length!==1?"s":"",a!=="All"?` in ${a}`:" total"]})}),f&&e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[e.jsx("div",{style:{width:44,height:44,border:`4px solid ${ze}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}),e.jsx("p",{style:{color:"#94a3b8",fontWeight:600},children:"Gallery load ho rahi hai..."}),e.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg)}}"})]}),!f&&l.length>0&&e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14},children:l.map((w,k)=>e.jsx("div",{className:"gc r14 gal-in",style:{animationDelay:`${k%12*.04}s`},onClick:()=>r(k),children:e.jsxs("div",{className:"gal-img-item",children:[e.jsx("img",{src:w.src,alt:w.title||w.cat||"Gallery",className:"gal-img",loading:"lazy",decoding:"async"}),e.jsxs("div",{className:"gal-ov",children:[e.jsx("div",{className:"gal-cat",children:w.cat}),e.jsx("div",{className:"gal-ttl",children:w.title})]})]})},w.id))}),!f&&l.length===0&&e.jsxs("div",{style:{textAlign:"center",background:"#fff",padding:"60px 20px",borderRadius:16,border:"1px dashed #e2e8f0",maxWidth:500,margin:"0 auto"},children:[e.jsx("div",{style:{fontSize:48,marginBottom:14},children:"📸"}),e.jsx("h3",{style:{color:Ne,margin:"0 0 8px",fontWeight:800},children:a==="All"?"Gallery Empty":`${a} mein koi photo nahi`}),e.jsx("p",{style:{color:"#94a3b8",fontSize:13},children:a==="All"?"Admin Panel → Gallery tab se photos upload karein":"Doosri category select karein ya Admin Panel se photos add karein"}),a!=="All"&&e.jsx("button",{className:"gal-filter",style:{marginTop:16},onClick:()=>s("All"),children:"Show All Photos"})]})]}),c!==null&&l[c]&&fi.createPortal(e.jsxs("div",{className:"lb-ov",onClick:u,children:[e.jsx("button",{className:"lb-close",onClick:u,children:"✕"}),l.length>1&&e.jsx("button",{className:"lb-btn",style:{left:20},onClick:w=>{w.stopPropagation(),g()},children:"‹"}),e.jsxs("div",{onClick:w=>w.stopPropagation(),style:{textAlign:"center"},children:[e.jsx("img",{src:l[c].src,alt:l[c].title||"Photo",className:"lb-img"}),(l[c].title||l[c].cat)&&e.jsxs("div",{style:{marginTop:14,color:"rgba(255,255,255,.8)",fontSize:14,fontWeight:600},children:[l[c].title,l[c].cat&&e.jsxs("span",{style:{color:ze,marginLeft:8,fontSize:12},children:["#",l[c].cat]})]}),e.jsxs("div",{style:{marginTop:8,color:"rgba(255,255,255,.35)",fontSize:12},children:[c+1," / ",l.length,"  ·  ← → keys to navigate  ·  Esc to close"]})]}),l.length>1&&e.jsx("button",{className:"lb-btn",style:{right:20},onClick:w=>{w.stopPropagation(),m()},children:"›"})]}),document.body)]})}const de=j==null?void 0:j.navy,ge=j==null?void 0:j.gold,Va=t=>{try{return new Date(t).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}catch(i){return""}},Xa=t=>{if(!t)return"";const i=t.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);if(!i)return"";const n=parseInt(i[1]||0),a=parseInt(i[2]||0),s=parseInt(i[3]||0);return n>0?`${n}:${String(a).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${a}:${String(s).padStart(2,"0")}`},Et=t=>{if(!t)return"0";const i=parseInt(t);return i>=1e6?(i/1e6).toFixed(1)+"M":i>=1e3?(i/1e3).toFixed(1)+"K":String(i)};function It(){const[t,i]=o.useState(null),[n,a]=o.useState(!1),[s,c]=o.useState([]),[r,f]=o.useState([]),[d,l]=o.useState(!1),[u,g]=o.useState(""),[m,w]=o.useState(null),[k,z]=o.useState("all");o.useEffect(()=>(window.scrollTo(0,0),M(Re(L,"settings","youtube"),y=>{if(y.exists()){const N=y.data();if(i(N),N.videoIds){const E=N.videoIds.split(/[\n,]/).map(v=>v.trim()).filter(Boolean);f(E)}}a(!0)},()=>a(!0))),[]);const p=o.useCallback(()=>Nt(null,null,function*(){var y,N,E,v;if(!(!(t!=null&&t.apiKey)||!(t!=null&&t.channelId))){l(!0),g("");try{const{apiKey:I,channelId:B,maxResults:G=12}=t,te=yield(yield fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${B}&key=${I}`)).json();if(te.error)throw new Error(te.error.message);const Z=(v=(E=(N=(y=te.items)==null?void 0:y[0])==null?void 0:N.contentDetails)==null?void 0:E.relatedPlaylists)==null?void 0:v.uploads;if(!Z)throw new Error("Channel not found or no uploads");const C=yield(yield fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${Z}&maxResults=${G}&key=${I}`)).json();if(C.error)throw new Error(C.error.message);const T=C.items.map(Xe=>Xe.snippet.resourceId.videoId).join(","),q=yield(yield fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${T}&key=${I}`)).json();if(q.error)throw new Error(q.error.message);c(q.items||[])}catch(I){g(I.message)}l(!1)}}),[t]);o.useEffect(()=>{!(t!=null&&t.apiKey)||!(t!=null&&t.channelId)||p()},[t,p]);const b=!!(t!=null&&t.apiKey&&(t!=null&&t.channelId)),S=r.length>0,x=["all","seminar","cultural","sports","nss","ncc","workshop"],h=k==="all"?s:s.filter(y=>{var N,E,v,I;return((E=(N=y.snippet)==null?void 0:N.title)==null?void 0:E.toLowerCase().includes(k))||((I=(v=y.snippet)==null?void 0:v.description)==null?void 0:I.toLowerCase().includes(k))});if(!n)return null;if(!b&&S){const y=(t==null?void 0:t.channelName)||"GNC College Official";return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:'"Amazon Ember","Inter",sans-serif'},children:[e.jsx("style",{children:`
          .gc{position:relative;z-index:0;display:block;}
          .gc::before{content:'';position:absolute;inset:-3px;border-radius:inherit;background:conic-gradient(from 0deg,#a855f7,#ec4899,#f97316,#eab308,#06b6d4,#6366f1,#a855f7);opacity:0;filter:blur(10px);z-index:-1;transition:opacity .35s ease;}
          .gc:hover::before{opacity:.6;}
          .gc.r16{border-radius:18px;}
          .yt-embed-card{background:#fff;border-radius:16px;overflow:hidden;border:1px solid #edf2f7;box-shadow:0 4px 16px rgba(0,0,0,.07);transition:transform .3s,box-shadow .3s;}
          .gc:hover .yt-embed-card{transform:translateY(-6px);box-shadow:0 16px 36px rgba(15,35,71,.12);border-color:transparent;}
          @keyframes vf{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
          .vf{animation:vf .4s ease both;}
        `}),e.jsxs("div",{style:{background:`linear-gradient(135deg,${de} 0%,#1a3a7c 100%)`,padding:"70px 20px 60px",textAlign:"center",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(244,160,35,.07) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:4,background:ge}}),e.jsxs("div",{style:{position:"relative",zIndex:1},children:[e.jsxs("nav",{style:{display:"flex",alignItems:"center",gap:8,justifyContent:"center",marginBottom:16,fontSize:13,fontWeight:600},children:[e.jsx(F,{to:"/",style:{color:"rgba(255,255,255,.5)",textDecoration:"none"},children:"🏠 Home"}),e.jsx("span",{style:{color:"rgba(255,255,255,.3)"},children:"›"}),e.jsx("span",{style:{color:ge},children:"Video Gallery"})]}),e.jsx("h1",{style:{color:"#fff",fontSize:"clamp(28px,5vw,48px)",fontWeight:900,margin:"0 0 12px",letterSpacing:"-1px"},children:"🎬 Video Gallery"}),e.jsxs("p",{style:{color:"rgba(255,255,255,.65)",fontSize:15,maxWidth:520,margin:"0 auto 24px"},children:["Official ",y," channel ke latest campus videos"]}),e.jsxs("div",{style:{display:"inline-block",background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.15)",borderRadius:10,padding:"10px 22px"},children:[e.jsx("div",{style:{fontSize:22,fontWeight:900,color:ge,lineHeight:1},children:r.length}),e.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,.55)",marginTop:3},children:"Videos"})]})]})]}),e.jsxs("div",{style:{maxWidth:1280,margin:"0 auto",padding:"48px 20px"},children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:24},children:r.map((N,E)=>e.jsx("div",{className:"gc r16 vf",style:{animationDelay:`${E*.06}s`},children:e.jsxs("div",{className:"yt-embed-card",children:[e.jsx("div",{style:{position:"relative",aspectRatio:"16/9"},children:e.jsx("iframe",{src:`https://www.youtube.com/embed/${N}`,title:`Video ${E+1}`,allowFullScreen:!0,loading:"lazy",style:{width:"100%",height:"100%",border:"none",position:"absolute",inset:0}})}),e.jsxs("div",{style:{padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{style:{fontSize:12,color:"#94a3b8",fontWeight:600},children:["Video ",E+1," of ",r.length]}),e.jsx("a",{href:`https://youtube.com/watch?v=${N}`,target:"_blank",rel:"noreferrer",style:{color:"#ff0000",fontWeight:800,textDecoration:"none",fontSize:12},children:"▶ YouTube →"})]})]})},N))}),(t==null?void 0:t.channelId)&&e.jsxs("div",{style:{textAlign:"center",marginTop:48},children:[e.jsx("p",{style:{color:"#94a3b8",fontSize:13,marginBottom:16},children:"Admin Panel → YouTube Settings → API Key add karke full video details unlock karein"}),e.jsx("a",{href:`https://youtube.com/channel/${t.channelId}`,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:10,background:"#ff0000",color:"#fff",padding:"13px 30px",borderRadius:50,fontWeight:900,fontSize:14,textDecoration:"none",boxShadow:"0 6px 20px rgba(255,0,0,.35)"},children:"▶ Subscribe to Our Channel"})]})]})]})}return!b&&!S?e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:'"Amazon Ember","Inter",sans-serif'},children:[e.jsxs("div",{style:{background:`linear-gradient(135deg,${de} 0%,#1a3a7c 100%)`,padding:"70px 20px 60px",textAlign:"center",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:4,background:ge}}),e.jsxs("nav",{style:{display:"flex",alignItems:"center",gap:8,justifyContent:"center",marginBottom:16,fontSize:13,fontWeight:600},children:[e.jsx(F,{to:"/",style:{color:"rgba(255,255,255,.5)",textDecoration:"none"},children:"🏠 Home"}),e.jsx("span",{style:{color:"rgba(255,255,255,.3)"},children:"›"}),e.jsx("span",{style:{color:ge},children:"Video Gallery"})]}),e.jsx("h1",{style:{color:"#fff",fontSize:"clamp(28px,5vw,48px)",fontWeight:900,margin:"0 0 12px"},children:"🎬 Video Gallery"})]}),e.jsx("div",{style:{maxWidth:600,margin:"60px auto",padding:"0 20px",textAlign:"center"},children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:"48px 32px",boxShadow:"0 8px 30px rgba(15,35,71,.07)",border:"1px solid #e2e8f0"},children:[e.jsx("div",{style:{fontSize:60,marginBottom:16},children:"📺"}),e.jsx("h2",{style:{color:de,fontWeight:900,margin:"0 0 8px"},children:"Videos Coming Soon"}),e.jsx("p",{style:{color:"#64748b",fontSize:14,marginBottom:24},children:"Admin Panel → YouTube Manager tab se videos add karein"}),e.jsx(F,{to:"/",style:{display:"inline-block",background:de,color:"#fff",padding:"11px 28px",borderRadius:8,fontWeight:700,textDecoration:"none",fontSize:14},children:"← Back to Home"})]})})]}):e.jsxs("div",{children:[e.jsx("style",{children:`
        .gc{position:relative;z-index:0;display:block;}
        .gc::before{content:'';position:absolute;inset:-3px;border-radius:inherit;background:conic-gradient(from 0deg,#a855f7,#ec4899,#f97316,#eab308,#06b6d4,#6366f1,#a855f7);opacity:0;filter:blur(10px);z-index:-1;transition:opacity .35s ease;}
        .gc:hover::before{opacity:.6;}
        .gc.r16{border-radius:18px;}
        @keyframes yt-fadein { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        .yt-card{transition:all .25s;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 4px 16px rgba(11,31,78,.07);border:1px solid #edf2f7;animation:yt-fadein .4s ease both;}
        .gc:hover .yt-card{transform:translateY(-5px);box-shadow:0 14px 36px rgba(11,31,78,.13)!important;border-color:transparent;}
        .yt-thumb{position:relative;aspect-ratio:16/9;overflow:hidden;}
        .yt-thumb img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
        .gc:hover .yt-thumb img{transform:scale(1.06);}
        .yt-play{position:absolute;inset:0;background:rgba(11,31,78,.45);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s;}
        .gc:hover .yt-play{opacity:1;}
        .yt-filter-btn{border:none;font-family:inherit;cursor:pointer;transition:all .15s;}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}),e.jsxs("div",{style:{background:`linear-gradient(135deg,${de} 0%,#1a3a7c 100%)`,padding:"70px 20px 60px",textAlign:"center",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(244,160,35,.07) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:4,background:ge}}),e.jsxs("div",{style:{position:"relative",zIndex:1},children:[e.jsxs("nav",{style:{display:"flex",alignItems:"center",gap:8,justifyContent:"center",marginBottom:16,fontSize:13,fontWeight:600},children:[e.jsx(F,{to:"/",style:{color:"rgba(255,255,255,.5)",textDecoration:"none"},children:"🏠 Home"}),e.jsx("span",{style:{color:"rgba(255,255,255,.3)"},children:"›"}),e.jsx("span",{style:{color:ge},children:"Video Gallery"})]}),e.jsx("h1",{style:{color:"#fff",fontSize:"clamp(28px,5vw,48px)",fontWeight:900,margin:"0 0 12px"},children:"🎬 Video Gallery"}),e.jsx("p",{style:{color:"rgba(255,255,255,.65)",fontSize:15,maxWidth:520,margin:"0 auto 24px"},children:"College ke latest events, seminars aur cultural programs"}),e.jsx("div",{style:{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"},children:[{val:s.length,label:"Videos"},{val:Et(s.reduce((y,N)=>{var E;return y+parseInt(((E=N.statistics)==null?void 0:E.viewCount)||0)},0)),label:"Total Views"}].map((y,N)=>e.jsxs("div",{style:{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.18)",borderRadius:10,padding:"10px 22px",backdropFilter:"blur(8px)"},children:[e.jsx("div",{style:{fontSize:22,fontWeight:900,color:ge,lineHeight:1},children:y.val}),e.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,.55)",marginTop:3},children:y.label})]},N))})]})]}),e.jsxs("div",{style:{maxWidth:1280,margin:"0 auto",padding:"40px 20px"},children:[d&&e.jsxs("div",{style:{textAlign:"center",padding:"80px 20px"},children:[e.jsx("div",{style:{width:48,height:48,border:`4px solid ${ge}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"YouTube se videos fetch ho rahi hain..."})]}),u&&e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px",background:"#fff5f5",borderRadius:16,border:"1px solid #fed7d7"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:12},children:"⚠️"}),e.jsx("h3",{style:{color:"#c53030",margin:"0 0 8px"},children:"API Error"}),e.jsx("p",{style:{color:"#718096"},children:u}),e.jsx("button",{onClick:p,style:{marginTop:16,padding:"10px 24px",background:de,color:"#fff",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer",fontSize:14,fontFamily:"inherit"},children:"🔄 Retry"})]}),!d&&!u&&s.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:32,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8},children:"FILTER:"}),x.map(y=>e.jsx("button",{className:"yt-filter-btn",onClick:()=>z(y),style:{padding:"6px 16px",borderRadius:20,border:`2px solid ${k===y?de:"#e2e8f0"}`,background:k===y?de:"transparent",color:k===y?"#fff":"#718096",fontWeight:700,fontSize:12.5,textTransform:"capitalize"},children:y==="all"?"🎬 All":y.charAt(0).toUpperCase()+y.slice(1)},y)),e.jsxs("span",{style:{marginLeft:"auto",background:"#f0f4ff",color:de,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800},children:[h.length," videos"]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:24},children:h.map((y,N)=>{var Q,te,Z,$,C,T;const E=y.id,v=y.snippet||{},I=y.statistics||{},B=y.contentDetails||{},G=m===E;return e.jsx("div",{className:"gc r16",style:{animationDelay:`${N*.06}s`},children:e.jsxs("div",{className:"yt-card",style:{animationDelay:`${N*.06}s`},children:[e.jsx("div",{className:"yt-thumb",onClick:()=>w(G?null:E),style:{cursor:"pointer"},children:G?e.jsx("iframe",{src:`https://www.youtube.com/embed/${E}?autoplay=1`,title:v.title,allow:"autoplay; encrypted-media",allowFullScreen:!0,style:{width:"100%",height:"100%",border:"none",position:"absolute",inset:0}}):e.jsxs(e.Fragment,{children:[e.jsx("img",{src:((te=(Q=v.thumbnails)==null?void 0:Q.maxres)==null?void 0:te.url)||(($=(Z=v.thumbnails)==null?void 0:Z.high)==null?void 0:$.url)||((T=(C=v.thumbnails)==null?void 0:C.medium)==null?void 0:T.url),alt:v.title}),e.jsx("div",{className:"yt-play",children:e.jsx("div",{style:{width:56,height:56,borderRadius:"50%",background:"#ff0000",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(255,0,0,.4)"},children:e.jsx("span",{style:{color:"#fff",fontSize:20,marginLeft:4},children:"▶"})})}),B.duration&&e.jsx("div",{style:{position:"absolute",bottom:8,right:8,background:"rgba(0,0,0,.8)",color:"#fff",fontSize:11.5,fontWeight:700,padding:"3px 7px",borderRadius:5},children:Xa(B.duration)})]})}),e.jsxs("div",{style:{padding:"16px 18px 18px"},children:[e.jsx("h3",{style:{margin:"0 0 8px",fontSize:15,fontWeight:800,color:de,lineHeight:1.4,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},children:v.title}),e.jsxs("p",{style:{margin:"0 0 12px",fontSize:12,color:"#a0aec0",fontWeight:600},children:["📅 ",Va(v.publishedAt)]}),e.jsxs("div",{style:{display:"flex",gap:14,fontSize:12,color:"#718096",fontWeight:700},children:[e.jsxs("span",{children:["👁 ",Et(I.viewCount)," views"]}),e.jsxs("span",{children:["👍 ",Et(I.likeCount)]}),e.jsx("span",{style:{marginLeft:"auto"},children:e.jsx("a",{href:`https://youtube.com/watch?v=${E}`,target:"_blank",rel:"noreferrer",style:{color:"#ff0000",fontWeight:800,textDecoration:"none",fontSize:12},children:"▶ YouTube →"})})]})]})]})},E)})}),h.length===0&&e.jsxs("div",{style:{textAlign:"center",padding:"50px",color:"#a0aec0"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"🎬"}),e.jsx("p",{style:{fontWeight:600},children:"Is category mein koi video nahi"})]}),(t==null?void 0:t.channelId)&&e.jsx("div",{style:{textAlign:"center",marginTop:48},children:e.jsx("a",{href:`https://youtube.com/channel/${t.channelId}`,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:10,background:"#ff0000",color:"#fff",padding:"14px 32px",borderRadius:50,fontWeight:900,fontSize:15,textDecoration:"none",boxShadow:"0 6px 20px rgba(255,0,0,.35)",transition:"all .2s"},children:"▶ Subscribe to Our Channel"})})]})]})]})}const Ka=()=>(o.useEffect(()=>{window.scrollTo(0,0)},[]),e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("header",{className:"profile-hero",children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"College Profile"}),e.jsx("p",{className:"hero-subtitle",children:"Excellence in Education Since 1970"})]})]}),e.jsx("div",{style:{maxWidth:"1200px",margin:"3rem auto 0",padding:"0 20px",position:"relative",zIndex:20},children:e.jsxs("div",{className:"profile-layout",children:[e.jsxs("main",{className:"profile-main",children:[e.jsxs("section",{className:"profile-section anim-slide-up",style:{animationDelay:"0.2s",background:"#fff",borderRadius:"24px"},children:[e.jsxs("div",{className:"section-grid",style:{marginBottom:"3rem"},children:[e.jsxs("div",{className:"text-content",children:[e.jsx("h2",{className:"section-heading",children:"College Profile"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was Established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru after whom this college is named."}),e.jsx("p",{className:"rich-text-content mt-4",children:"The college is managed by a Governing Council nominated by the Gurudwara Prabandhak Committee, Dhanbad, and draws its inspiration from the teachings of the faith propounded by Guru Nanak Devji."})]}),e.jsx("div",{className:"image-content",children:e.jsx("img",{src:"https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop",alt:"College Campus",loading:"lazy",decoding:"async",className:"profile-img hover-scale"})})]}),e.jsxs("div",{style:{marginBottom:"3rem"},children:[e.jsx("h2",{className:"section-heading",children:"About the College"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"Initially the college got affiliated to the Ranchi University – Ranchi since 1970 the year it was stared. But with the passage of time, Binod Bihari Mahto Koylanchal University, Dhanbad came into existence in 2017; and the affiliation of the college got transferred to this new University in 2017."}),e.jsx("p",{className:"rich-text-content mt-4",children:"At present, the college has got permanent affiliation with Binod Bihari Mahto Koylanchal University, Dhanbad in the faculties of Humanities, Social Sciences, commerce and such vocational courses as Bachelor of Computer Applications. The college has got “Deficit Grant College Status” by the government of Jharkhand. Also the college is registered u/s 2F and 12B of the UGC Act."}),e.jsx("p",{className:"rich-text-content mt-4",children:"The main aim and objective behind sponsoring this college was to impart value - based teaching to the young men and women of Dhanbad. The college attaches great importance to moral teaching. The college does not merely offer teaching in such subject as would enable young students to earn their bread and butter, but it also emphasizes grooming them into worthy (morally sound) citizens."})]}),e.jsxs("div",{children:[e.jsx("h2",{className:"section-heading",children:"Our Campuses"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",style:{marginBottom:"3rem"},children:"Guru Nanak College, Dhanbad functions at two main campuses:"}),e.jsxs("div",{className:"grid-2-col gap-6",children:[e.jsxs("div",{className:"campus-box",children:[e.jsx("h3",{style:{fontSize:"1.5rem",color:"var(--primary-navy)",fontWeight:"700",marginBottom:"10px"},children:"1. Bank More Campus (Girls Wing)"}),e.jsx("p",{className:"rich-text-content",children:"The women’s wing of the College was started in the year 2000 in the Bank More Campus of the College in the morning hours. As an exclusive centre of teaching for girls, this wing has earned high reputation among stakeholders during the last few years. In the Women’s wing also, teaching is imparted for B.A./B.Com. (Hons/General) Course."})]}),e.jsxs("div",{className:"campus-box",children:[e.jsx("h3",{style:{fontSize:"1.5rem",color:"var(--primary-navy)",fontWeight:"700",marginBottom:"10px"},children:"2. Bhuda Campus (Boys Wing)"}),e.jsx("p",{className:"rich-text-content",children:"The main building – the Boys’ wing of the College is situated at Bhuda. The main building is spaciously designed in an airy surrounding quite suitable for the environment of an academic institution. The present campus has been so planned as to cater to the needs of the students for a long time."})]})]})]})]}),e.jsx("section",{className:"stats-grid stats-grid-override mb-16 anim-slide-up",style:{animationDelay:"0.4s"},children:[{label:"Years of Legacy",value:"56+",icon:"🏛️"},{label:"Expert Faculty",value:"120+",icon:"👨‍🏫"},{label:"Students",value:"5000+",icon:"🎓"},{label:"Courses",value:"30+",icon:"📚"}].map((t,i)=>e.jsxs("div",{className:"stat-card stat-card-small",style:{background:"#fff",borderRadius:"16px",border:"1px solid #e2e8f0"},children:[e.jsx("div",{className:"stat-icon",children:t.icon}),e.jsx("div",{className:"stat-value stat-value-small",children:t.value}),e.jsx("div",{className:"stat-label",children:t.label})]},i))})]}),e.jsxs("aside",{className:"profile-sidebar anim-slide-up",style:{animationDelay:"0.5s"},children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," Quick Links"]}),e.jsx("ul",{className:"quick-links",children:[{label:"Principal Message",path:"/about-us/principal-message"},{label:"Admission Rules",path:"/admission/rule"},{label:"Fee Structure",path:"/admission/fee-structure"},{label:"Departments",path:"/academics/course-offered"},{label:"NSS",path:"/activity/nss"},{label:"NCC",path:"/activity/ncc"},{label:"Sports",path:"/activity/games-sports"},{label:"Workshop",path:"/activity/workshop"},{label:"Syllabus",path:"/syllabus"},{label:"Academic Calendar",path:"/academics/academic-calendar"},{label:"Photo Gallery",path:"/gallery"},{label:"Contact Us",path:"/contact"}].map((t,i)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(F,{to:t.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",t.label]})},i))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:"45px",marginBottom:"15px",position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 12px",fontSize:"19px",color:"#f4a023",position:"relative",zIndex:2},children:"Need Assistance?"}),e.jsx("p",{style:{fontSize:"14px",margin:"0 0 20px",color:"#e2e8f0",lineHeight:"1.6",position:"relative",zIndex:2},children:"Contact our administration office for any queries related to admission or academics."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call Helpdesk Now"})]}),e.jsxs("div",{style:{marginTop:"30px"},children:[e.jsxs("h4",{style:{fontSize:"17px",fontWeight:"700",color:"var(--primary-navy)",marginBottom:"20px",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("span",{children:"🌐"})," Connect With Us"]}),e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx("a",{href:"https://facebook.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"f"}),e.jsx("a",{href:"https://twitter.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"𝕏"}),e.jsx("a",{href:"https://instagram.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"📸"}),e.jsx("a",{href:"https://youtube.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:"▶"})]})]})]})]})})]})),si={president:{icon:"🏛️",color:"#0f2347",accent:"#f4a023",label:"President",plural:"Presidents",subtitle:"Visionary leaders who shaped our institution"},secretary:{icon:"📋",color:"#1a3a7c",accent:"#f4a023",label:"Secretary",plural:"Secretaries",subtitle:"Dedicated administrators who guided our growth"},principal:{icon:"🎓",color:"#0f2347",accent:"#f4a023",label:"Principal",plural:"Principals",subtitle:"Academic leaders who nurtured excellence"}},et="/images/college_photo.jpg",Ja=`
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
`,tt=(t,i)=>{const n=parseInt(t,10),a=(i==null?void 0:i.toLowerCase())==="present"?new Date().getFullYear():parseInt(i,10);if(!n||!a||isNaN(n)||isNaN(a))return null;const s=a-n;return s<=0?"< 1 yr":s===1?"1 yr":`${s} yrs`},Le=t=>!t||t.toLowerCase()==="present",Bt=({type:t="president",title:i})=>{const[n,a]=o.useState([]),[s,c]=o.useState(!0),[r,f]=o.useState("timeline"),d=si[t]||si.president,l=i||`${d.plural} Over the Years`;o.useEffect(()=>{const m=X(K(L,"leadership"),st("type","==",t)),w=M(m,k=>{const z=k.docs.map(p=>R({id:p.id},p.data())).sort((p,b)=>parseInt(b.from||0)-parseInt(p.from||0));a(z),c(!1)},()=>c(!1));return()=>w()},[t]);const u=n.reduce((m,w)=>{const k=tt(w.from,w.to);return!k||k==="< 1 yr"?m+1:m+parseInt(k,10)},0),g=n.find(m=>Le(m.to));return e.jsxs("div",{className:"lp-wrap",style:{minHeight:"60vh",background:"#f8fafc"},children:[e.jsx("style",{children:Ja}),e.jsxs("div",{className:"lp-hero",children:[e.jsx("div",{className:"lp-hero-topbar"}),e.jsx("span",{className:"lp-hero-icon",children:d.icon}),e.jsx("h1",{children:l}),e.jsx("p",{className:"lp-hero-sub",children:d.subtitle}),e.jsx("div",{className:"lp-hero-line"}),e.jsx("span",{className:"lp-hero-badge",children:"Guru Nanak College, Dhanbad"})]}),e.jsxs("div",{className:"lp-content",children:[!s&&n.length>0&&e.jsxs("div",{className:"lp-stats",children:[e.jsxs("div",{className:"lp-stat",children:[e.jsx("div",{className:"lp-stat-num",children:n.length}),e.jsxs("div",{className:"lp-stat-label",children:["Total ",d.plural]})]}),e.jsxs("div",{className:"lp-stat",children:[e.jsxs("div",{className:"lp-stat-num",children:[u,"+"]}),e.jsx("div",{className:"lp-stat-label",children:"Years of Leadership"})]}),g&&e.jsxs("div",{className:"lp-stat",style:{flex:2,textAlign:"left",paddingLeft:20},children:[e.jsxs("div",{style:{fontSize:"0.75rem",color:"#94a3b8",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:4,fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"},children:["Current ",d.label]}),e.jsx("div",{style:{fontWeight:800,color:"#0f2347",fontSize:"1rem",fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"},children:g.name}),e.jsxs("div",{style:{fontSize:"0.8rem",color:"#64748b",marginTop:2,fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"},children:["Since ",g.from]})]})]}),!s&&n.length>0&&e.jsxs("div",{className:"lp-toggle-bar",style:{padding:"0 0 28px",justifyContent:"flex-start"},children:[e.jsxs("button",{className:`lp-toggle-btn${r==="timeline"?" active":""}`,onClick:()=>f("timeline"),children:[e.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",children:[e.jsx("circle",{cx:"3",cy:"4",r:"2",fill:"currentColor",opacity:".4"}),e.jsx("circle",{cx:"3",cy:"7.5",r:"2",fill:"currentColor",opacity:".4"}),e.jsx("circle",{cx:"3",cy:"11",r:"2",fill:"currentColor",opacity:".4"}),e.jsx("rect",{x:"7",y:"3",width:"8",height:"2",rx:"1",fill:"currentColor"}),e.jsx("rect",{x:"7",y:"6.5",width:"8",height:"2",rx:"1",fill:"currentColor"}),e.jsx("rect",{x:"7",y:"10",width:"8",height:"2",rx:"1",fill:"currentColor"})]}),"Timeline Cards"]}),e.jsxs("button",{className:`lp-toggle-btn${r==="table"?" active":""}`,onClick:()=>f("table"),children:[e.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:"13",height:"3",rx:"1",fill:"currentColor",opacity:".5"}),e.jsx("rect",{x:"1",y:"5.5",width:"13",height:"2.5",rx:"1",fill:"currentColor",opacity:".3"}),e.jsx("rect",{x:"1",y:"9.5",width:"13",height:"2.5",rx:"1",fill:"currentColor",opacity:".3"}),e.jsx("rect",{x:"1",y:"13",width:"13",height:"1",rx:".5",fill:"currentColor",opacity:".2"})]}),"Table View"]})]}),s&&e.jsx("div",{style:{paddingLeft:40},children:[1,2,3].map(m=>e.jsxs("div",{style:{background:"#fff",border:"1px solid #e8f0fa",borderRadius:14,padding:24,marginBottom:20,display:"flex",gap:18,alignItems:"flex-start",opacity:1-(m-1)*.2},children:[e.jsx("div",{style:{width:70,height:70,borderRadius:10,background:"#f1f5f9",flexShrink:0}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{height:18,width:"50%",background:"#f1f5f9",borderRadius:6,marginBottom:10}}),e.jsx("div",{style:{height:24,width:"30%",background:"#f4a02333",borderRadius:6,marginBottom:10}}),e.jsx("div",{style:{height:13,width:"70%",background:"#f1f5f9",borderRadius:4}})]})]},m))}),!s&&n.length===0&&e.jsxs("div",{className:"lp-empty",children:[e.jsx("span",{className:"lp-empty-icon",children:"📋"}),e.jsx("h3",{style:{color:"#64748b",fontWeight:700,fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"},children:"No records yet"}),e.jsxs("p",{style:{fontSize:14,margin:"6px 0 0"},children:["Admin Panel → Leadership tab → Add ",d.plural.toLowerCase()]})]}),!s&&n.length>0&&r==="timeline"&&e.jsx("div",{className:"lp-timeline",children:n.map((m,w)=>e.jsxs("div",{className:`lp-card${Le(m.to)?" current":""}`,style:{animationDelay:`${w*.06}s`},children:[e.jsx("div",{className:"lp-dot"}),Le(m.to)&&e.jsxs("div",{className:"lp-current-badge",children:[e.jsx("span",{className:"lp-current-dot"}),"Current ",d.label]}),e.jsxs("div",{className:"lp-card-inner",children:[e.jsx("img",{src:m.photo||et,alt:m.name,className:"lp-avatar",onError:k=>{k.target.src=et}}),e.jsxs("div",{className:"lp-card-body",children:[e.jsx("div",{className:"lp-card-name",children:m.name}),e.jsxs("div",{className:"lp-card-tenure",children:[e.jsxs("span",{children:["📅 ",m.from," – ",m.to||"Present"]}),tt(m.from,m.to)&&e.jsx("span",{className:"lp-card-duration",children:tt(m.from,m.to)})]}),m.note&&e.jsx("p",{className:"lp-card-note",children:m.note})]})]})]},m.id))}),!s&&n.length>0&&r==="table"&&e.jsx("div",{className:"lp-table-wrap",children:e.jsxs("table",{className:"lp-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#"}),e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Tenure"}),e.jsx("th",{children:"Duration"}),e.jsx("th",{children:"Note"})]})}),e.jsx("tbody",{children:n.map((m,w)=>e.jsxs("tr",{className:Le(m.to)?"lp-row-current":"",children:[e.jsx("td",{style:{color:"#94a3b8",fontWeight:700,fontSize:"0.85rem",width:44},children:n.length-w}),e.jsx("td",{children:e.jsxs("div",{className:"lp-tname",children:[e.jsx("img",{src:m.photo||et,alt:m.name,className:"lp-tavatar",onError:k=>{k.target.src=et}}),e.jsxs("div",{children:[e.jsx("div",{children:m.name}),Le(m.to)&&e.jsxs("div",{className:"lp-tcurrent",style:{marginTop:4},children:[e.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:"#4ade80",display:"inline-block"}}),"Current"]})]})]})}),e.jsx("td",{children:e.jsxs("span",{className:"lp-ttenure",children:[m.from," – ",m.to||"Present"]})}),e.jsx("td",{style:{color:"#64748b",fontWeight:600,whiteSpace:"nowrap"},children:tt(m.from,m.to)||"—"}),e.jsx("td",{className:"lp-tnote",children:m.note||"—"})]},m.id))})]})})]})]})},Ye=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Qa=["All","News","Achievement","Update","Result","Scholarship"],He={News:{bg:"#EBF0FF",text:"#1a365d",border:"#BED0FF",dot:"#4a7fd4"},Achievement:{bg:"#F0FFF4",text:"#1c4532",border:"#9AE6B4",dot:"#38a169"},Update:{bg:"#FFFBEB",text:"#744210",border:"#FAF089",dot:"#d69e2e"},Result:{bg:"#FFF5F5",text:"#742a2a",border:"#FEB2B2",dot:"#e53e3e"},Scholarship:{bg:"#FAF5FF",text:"#44337a",border:"#E9D8FD",dot:"#805ad5"}},_e=t=>t!=null&&t.toDate?t.toDate():new Date(t||Date.now()),Za=t=>{const i=_e(t);return`${i.getDate()} ${Ye[i.getMonth()]} ${i.getFullYear()}`},oi=t=>ut.sanitize(t||"");function er(){const[t,i]=o.useState([]),[n,a]=o.useState(!0),[s,c]=o.useState("All"),[r,f]=o.useState("All"),[d,l]=o.useState("All"),[u,g]=o.useState(""),[m,w]=o.useState("list"),k=j.navy,z=j.gold;o.useEffect(()=>{window.scrollTo(0,0);const x=X(K(L,"announcements"),ne("createdAt","desc"));return M(x,h=>{i(h.docs.map(y=>R({id:y.id},y.data()))),a(!1)})},[]);const p=o.useMemo(()=>{const x=new Set(t.map(h=>_e(h.createdAt).getFullYear()));return["All",...Array.from(x).sort((h,y)=>y-h)]},[t]),b=o.useMemo(()=>t.filter(x=>{var y;const h=_e(x.createdAt);if(s!=="All"&&h.getFullYear()!==Number(s)||r!=="All"&&Ye[h.getMonth()]!==r||d!=="All"&&(x.type||"News")!==d)return!1;if(u){const N=u.toLowerCase(),E=(y=x.text)==null?void 0:y.toLowerCase().includes(N),v=(x.type||"").toLowerCase().includes(N);if(!E&&!v)return!1}return!0}),[t,s,r,d,u]),S=o.useMemo(()=>{const x={};return b.forEach(h=>{const y=_e(h.createdAt),N=`${Ye[y.getMonth()]} ${y.getFullYear()}`;x[N]||(x[N]=[]),x[N].push(h)}),x},[b]);return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes spin  { to { transform: rotate(360deg); } }
        .ntf-fb { border: none; font-family: inherit; cursor: pointer; transition: all .15s; }
        .ntf-row-hover { transition: all .15s; }
        .ntf-row-hover:hover { background: #f8fafc !important; transform: translateX(4px); }
        .ntf-card-hover { transition: all .2s; }
        .ntf-card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(11,31,78,.12) !important; }
      `}),e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"📣 News & Updates"}),e.jsx("p",{className:"hero-subtitle",children:"College ke latest achievements, academic news aur recent updates yahan dekhein"})]})]}),e.jsx("div",{style:{maxWidth:"1000px",margin:"-80px auto 40px",padding:"20px",position:"relative",zIndex:10,background:"rgba(255,255,255,0.8)",backdropFilter:"blur(10px)",borderRadius:"16px",boxShadow:"0 10px 30px rgba(0,0,0,0.1)"},children:e.jsx("div",{style:{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"},children:[{val:t.length,label:"Total News"},{val:t.filter(x=>x.type==="Achievement").length,label:"Achievements"},{val:t.filter(x=>x.type==="Result").length,label:"Results"},{val:p.length-1,label:"Active Years"}].map((x,h)=>e.jsxs("div",{style:{background:"#fff",border:"1px solid #e2e8f0",borderRadius:11,padding:"10px 20px",textAlign:"center",flex:1,minWidth:"150px"},children:[e.jsx("div",{style:{fontSize:24,fontWeight:900,color:z,lineHeight:1},children:x.val}),e.jsx("div",{style:{fontSize:11,color:"#64748b",marginTop:3,fontWeight:600},children:x.label})]},h))})}),e.jsx("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"0 20px"},children:e.jsxs("main",{children:[e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)"},children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:16},children:[e.jsxs("div",{style:{flex:1,minWidth:200,position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",opacity:.4,fontSize:16,pointerEvents:"none"},children:"🔍"}),e.jsx("input",{value:u,onChange:x=>g(x.target.value),placeholder:"News search karo...",style:{width:"100%",padding:"10px 14px 10px 38px",border:"2px solid #e2e8f0",borderRadius:10,fontSize:14,fontFamily:"inherit",background:"#f8fafc",outline:"none",boxSizing:"border-box",transition:"border-color .2s"},onFocus:x=>x.target.style.borderColor=z,onBlur:x=>x.target.style.borderColor="#e2e8f0"})]}),e.jsxs("div",{style:{display:"flex",gap:7},children:[["list","card"].map(x=>e.jsx("button",{className:"ntf-fb",onClick:()=>w(x),style:{padding:"9px 16px",borderRadius:9,border:`2px solid ${m===x?k:"#e2e8f0"}`,background:m===x?k:"transparent",color:m===x?"#fff":"#718096",fontWeight:700,fontSize:12.5},children:x==="list"?"☰ List":"⊞ Cards"},x)),e.jsx("span",{style:{background:"#f0f4ff",color:k,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800,alignSelf:"center"},children:b.length})]})]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"YEAR:"}),p.map(x=>e.jsx("button",{className:"ntf-fb",onClick:()=>c(String(x)),style:{padding:"4px 14px",borderRadius:20,border:`2px solid ${s===String(x)?z:"#e2e8f0"}`,background:s===String(x)?z:"transparent",color:s===String(x)?k:"#718096",fontWeight:700,fontSize:12.5},children:x},x))]}),e.jsxs("div",{style:{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"MONTH:"}),["All",...Ye].map(x=>e.jsx("button",{className:"ntf-fb",onClick:()=>f(x),style:{padding:"4px 10px",borderRadius:7,border:`1.5px solid ${r===x?k:"#e2e8f0"}`,background:r===x?k:"transparent",color:r===x?"#fff":"#718096",fontWeight:600,fontSize:12},children:x},x))]}),e.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"CATEGORY:"}),Qa.map(x=>{const h=He[x]||{bg:"#f4f7fa",text:"#4a5568",border:"#e2e8f0"};return e.jsx("button",{className:"ntf-fb",onClick:()=>l(x),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${d===x?h.border:"#e2e8f0"}`,background:d===x?h.bg:"transparent",color:d===x?h.text:"#718096",fontWeight:700,fontSize:12},children:x},x)}),(s!=="All"||r!=="All"||d!=="All"||u)&&e.jsx("button",{className:"ntf-fb",onClick:()=>{c("All"),f("All"),l("All"),g("")},style:{padding:"4px 12px",borderRadius:20,border:"2px solid #FEB2B2",background:"#FFF5F5",color:"#e53e3e",fontWeight:700,fontSize:12},children:"✕ Clear"})]})]}),e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",marginTop:"30px"},children:[e.jsxs("h2",{className:"section-heading",children:["📰 Latest News (",b.length,")"]}),e.jsx("div",{className:"heading-underline"}),n?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[e.jsx("div",{style:{width:40,height:40,border:`4px solid ${z}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"News load ho rahi hain..."})]}):b.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"50px 20px"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"🔍"}),e.jsx("h3",{style:{color:k,fontWeight:800,margin:"0 0 6px"},children:"Koi news nahi mili"}),e.jsx("p",{style:{color:"#718096",fontSize:13.5},children:"Filter ya search change karo"})]}):m==="list"?Object.entries(S).map(([x,h])=>e.jsxs("div",{style:{marginBottom:28},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14},children:[e.jsxs("div",{style:{background:k,color:z,borderRadius:8,padding:"5px 16px",fontWeight:800,fontSize:12.5,whiteSpace:"nowrap",flexShrink:0},children:["📅 ",x]}),e.jsx("div",{style:{flex:1,height:1,background:`linear-gradient(90deg,${k}44,transparent)`}}),e.jsxs("span",{style:{fontSize:11.5,color:"#a0aec0",fontWeight:700,flexShrink:0},children:[h.length," update",h.length>1?"s":""]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:h.map(y=>{const N=_e(y.createdAt),E=He[y.type]||He.News;return e.jsxs("div",{className:"ntf-row-hover",style:{background:"#fff",borderRadius:11,padding:"14px 18px",display:"flex",alignItems:"flex-start",gap:14,borderLeft:`4px solid ${E.dot}`,border:"1px solid #edf2f7",boxShadow:"0 2px 10px rgba(11,31,78,.04)"},children:[e.jsxs("div",{style:{textAlign:"center",minWidth:44,flexShrink:0},children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase"},children:Ye[N.getMonth()]}),e.jsx("div",{style:{fontSize:22,fontWeight:900,color:k,lineHeight:1},children:N.getDate()}),e.jsx("div",{style:{fontSize:11,color:"#a0aec0"},children:N.getFullYear()})]}),e.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[e.jsx("div",{style:{display:"flex",gap:7,marginBottom:7,flexWrap:"wrap",alignItems:"center"},children:e.jsx("span",{style:{background:E.bg,color:E.text,border:`1px solid ${E.border}`,padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:700},children:y.type||"News"})}),e.jsx("div",{dangerouslySetInnerHTML:{__html:oi(y.text)},style:{fontSize:14.5,color:"#334155",fontWeight:500,lineHeight:1.65}}),y.link&&e.jsx("a",{href:y.link,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:5,marginTop:8,background:"#f8fafc",border:`1px solid ${k}22`,color:k,padding:"5px 12px",borderRadius:7,fontSize:12.5,fontWeight:700,textDecoration:"none"},children:"🔗 Read Full Article"})]})]},y.id)})})]},x)):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16,marginTop:4},children:b.map(x=>{const h=He[x.type]||He.News;return e.jsxs("div",{className:"ntf-card-hover",style:{background:"#fff",borderRadius:13,overflow:"hidden",boxShadow:"0 4px 16px rgba(11,31,78,.07)",border:"1px solid #edf2f7"},children:[e.jsxs("div",{style:{background:`linear-gradient(135deg,${k},#1a3a7c)`,padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{background:h.bg,color:h.text,border:`1px solid ${h.border}`,padding:"3px 10px",borderRadius:20,fontSize:11.5,fontWeight:700},children:x.type||"News"}),e.jsxs("span",{style:{color:z,fontSize:11.5,fontWeight:700},children:["📅 ",Za(x.createdAt)]})]}),e.jsxs("div",{style:{padding:"15px 16px"},children:[e.jsx("div",{dangerouslySetInnerHTML:{__html:oi(x.text)},style:{fontSize:13.5,color:"#334155",lineHeight:1.7,marginBottom:12}}),x.link&&e.jsx("a",{href:x.link,target:"_blank",rel:"noreferrer",className:"ntf-dl-btn",children:"🔗 Read More"})]})]},x.id)})})]})]})}),e.jsx("style",{children:`
        .ntf-dl-btn { display:inline-block; background:#f8fafc; color:${k}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .ntf-dl-btn:hover { background:${k}; color:#fff; border-color:${k}; }
      `})]})}const it=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],nt=t=>t!=null&&t.toDate?t.toDate():new Date(t||Date.now());function tr(){const[t,i]=o.useState([]),[n,a]=o.useState(!0),[s,c]=o.useState("All"),[r,f]=o.useState("All"),[d,l]=o.useState("All"),[u,g]=o.useState(""),m=j.navy,w=j.gold;o.useEffect(()=>{window.scrollTo(0,0);const b=X(K(L,"notices"),ne("createdAt","desc"));return M(b,S=>{i(S.docs.map(x=>R({id:x.id},x.data()))),a(!1)})},[]);const k=o.useMemo(()=>{const b=new Set(t.map(S=>nt(S.createdAt).getFullYear()));return["All",...Array.from(b).sort((S,x)=>x-S)]},[t]),z=o.useMemo(()=>t.filter(b=>{var x;const S=nt(b.createdAt);return!(s!=="All"&&S.getFullYear()!==Number(s)||r!=="All"&&it[S.getMonth()]!==r||d!=="All"&&(b.type||"General")!==d||u&&!((x=b.text)!=null&&x.toLowerCase().includes(u.toLowerCase())))}),[t,s,r,d,u]),p=o.useMemo(()=>{const b={};return z.forEach(S=>{const x=nt(S.createdAt),h=`${it[x.getMonth()]} ${x.getFullYear()}`;b[h]||(b[h]=[]),b[h].push(S)}),b},[z]);return e.jsxs("div",{style:{minHeight:"100vh",background:"#fff",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx("style",{children:`
        /* PREMIUM FILTER UI */
        .filter-container { background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px; margin-bottom: 40px; box-shadow: 0 10px 40px -10px rgba(15,23,42,0.05); }
        .search-wrapper { position: relative; flex: 1; }
        .search-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); font-size: 18px; opacity: 0.4; pointer-events: none; }
        .premium-input { width: 100%; padding: 15px 20px 15px 48px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; font-size: 15px; color: ${m}; font-family: inherit; font-weight: 600; outline: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-sizing: border-box; }
        .premium-input:focus { background: #fff; border-color: ${w}; box-shadow: 0 0 0 4px rgba(244,160,35,0.15); }
        .premium-input::placeholder { color: #94a3b8; font-weight: 500; }
        .filter-row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-top: 20px; padding-top: 20px; border-top: 1px dashed #e2e8f0; }
        .filter-label { font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1px; min-width: 80px; }
        .pill-group { display: flex; gap: 10px; flex-wrap: wrap; }
        .premium-pill { background: #f1f5f9; border: 1px solid transparent; color: #475569; padding: 8px 20px; border-radius: 50px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .premium-pill:hover { background: #e2e8f0; color: #0f172a; }
        .premium-pill.active { background: ${m}; color: #fff; box-shadow: 0 6px 15px rgba(15,35,71,0.2); transform: translateY(-2px); }
        .clear-btn { background: #fef2f2; color: #ef4444; border: none; padding: 15px 24px; border-radius: 14px; font-size: 14px; font-weight: 800; cursor: pointer; transition: 0.2s; white-space: nowrap; height: fit-content; }
        .clear-btn:hover { background: #fee2e2; }

        /* FLAT CARD */
        .flat-card { border: 1px solid #e2e8f0; background: #fff; border-radius: 16px; padding: 24px; margin-bottom: 16px; transition: all 0.2s; display: flex; align-items: flex-start; gap: 20px; }
        .flat-card:hover { background: #f8fafc; border-color: ${w}; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
      `}),e.jsxs("header",{style:{position:"relative",padding:"100px 20px 80px",background:"url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop') center/cover",borderBottom:"1px solid #e2e8f0"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:`linear-gradient(to right, ${m}f2, ${m}cc)`}}),e.jsx("div",{style:{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",backgroundSize:"30px 30px"}}),e.jsxs("div",{style:{position:"relative",zIndex:1,maxWidth:"1000px",margin:"0 auto"},children:[e.jsx("div",{style:{display:"inline-block",background:"rgba(244, 160, 35, 0.15)",color:w,padding:"6px 14px",borderRadius:"50px",fontSize:"12px",fontWeight:800,letterSpacing:"1px",marginBottom:"15px",border:"1px solid rgba(244, 160, 35, 0.3)"},children:"GURU NANAK COLLEGE"}),e.jsx("h1",{style:{color:"#fff",fontSize:"48px",fontWeight:900,margin:"0 0 15px",letterSpacing:"-1px"},children:"Notice Board"}),e.jsx("p",{style:{color:"#cbd5e1",fontSize:"18px",maxWidth:"600px",margin:0,lineHeight:1.6},children:"Official announcements, circulars, and administrative updates."})]})]}),e.jsx("div",{style:{maxWidth:"1000px",margin:"-40px auto 40px",position:"relative",zIndex:10,display:"flex",gap:"15px",padding:"0 20px",flexWrap:"wrap"},children:[{val:t.length,label:"Total Notices"},{val:t.filter(b=>b.isNew).length,label:"New Updates"},{val:k.length-1,label:"Years of Data"}].map((b,S)=>e.jsxs("div",{style:{flex:1,minWidth:"150px",background:"#fff",border:"1px solid #e2e8f0",borderRadius:"12px",padding:"20px",display:"flex",alignItems:"center",gap:"15px",boxShadow:"0 4px 15px rgba(0,0,0,0.02)"},children:[e.jsx("div",{style:{width:"4px",height:"40px",background:w,borderRadius:"4px"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"24px",fontWeight:900,color:m,lineHeight:1},children:b.val}),e.jsx("div",{style:{fontSize:"12px",color:"#64748b",fontWeight:700,marginTop:"4px",textTransform:"uppercase"},children:b.label})]})]},S))}),e.jsxs("div",{style:{maxWidth:"1000px",margin:"0 auto 80px",padding:"0 20px"},children:[e.jsxs("div",{className:"filter-container",children:[e.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("div",{className:"search-wrapper",children:[e.jsx("span",{className:"search-icon",children:"🔍"}),e.jsx("input",{className:"premium-input",value:u,onChange:b=>g(b.target.value),placeholder:"Search notices by title, keyword, or subject..."})]}),(s!=="All"||r!=="All"||d!=="All"||u)&&e.jsx("button",{className:"clear-btn",onClick:()=>{c("All"),f("All"),l("All"),g("")},children:"✕ Clear All"})]}),e.jsxs("div",{className:"filter-row",children:[e.jsx("div",{className:"filter-label",children:"Month"}),e.jsx("div",{className:"pill-group",children:["All",...it].map(b=>e.jsx("button",{className:`premium-pill ${r===b?"active":""}`,onClick:()=>f(b),children:b},b))})]}),e.jsxs("div",{className:"filter-row",children:[e.jsx("div",{className:"filter-label",children:"Timeline"}),e.jsx("div",{className:"pill-group",children:k.map(b=>e.jsx("button",{className:`premium-pill ${s===String(b)?"active":""}`,onClick:()=>c(String(b)),children:b},b))})]})]}),n?e.jsx("div",{style:{textAlign:"center",padding:"40px",color:"#64748b",fontWeight:700},children:"Syncing Database..."}):z.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"60px",border:"2px dashed #cbd5e1",borderRadius:"16px",color:"#64748b"},children:[e.jsx("span",{style:{fontSize:"40px",display:"block",marginBottom:"10px"},children:"📭"}),"No notices match your advanced filter."]}):Object.entries(p).map(([b,S])=>e.jsxs("div",{style:{marginBottom:"40px"},children:[e.jsxs("h3",{style:{fontSize:"16px",fontWeight:900,color:m,borderBottom:"2px solid #e2e8f0",paddingBottom:"10px",marginBottom:"20px",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("span",{style:{color:w},children:"📅"})," ",b]}),S.map(x=>{const h=nt(x.createdAt);return e.jsxs("div",{className:"flat-card",children:[e.jsxs("div",{style:{textAlign:"center",minWidth:"65px",background:"#f1f5f9",border:"1px solid #e2e8f0",padding:"14px 10px",borderRadius:"12px"},children:[e.jsx("div",{style:{fontSize:"11px",fontWeight:800,color:"#64748b",textTransform:"uppercase"},children:it[h.getMonth()]}),e.jsx("div",{style:{fontSize:"26px",fontWeight:900,color:m,lineHeight:1,marginTop:"4px"},children:h.getDate()})]}),e.jsxs("div",{style:{flex:1},children:[e.jsxs("div",{style:{display:"flex",gap:"10px",alignItems:"center",marginBottom:"10px"},children:[e.jsx("span",{style:{fontSize:"11px",fontWeight:800,padding:"4px 12px",background:"#f8fafc",border:"1px solid #cbd5e1",borderRadius:"50px",color:m,textTransform:"uppercase"},children:x.type||"General"}),x.isNew&&e.jsx("span",{style:{fontSize:"10px",fontWeight:900,color:"#fff",background:"#ef4444",padding:"3px 8px",borderRadius:"50px"},children:"NEW"})]}),e.jsx("div",{dangerouslySetInnerHTML:{__html:ut.sanitize(x.text)}}),x.link&&e.jsx("a",{href:x.link,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"6px",marginTop:"16px",fontSize:"13px",fontWeight:800,color:m,textDecoration:"none",background:"#f1f5f9",padding:"8px 16px",borderRadius:"8px",border:"1px solid #e2e8f0",transition:"all .2s"},onMouseOver:y=>{y.target.style.background=m,y.target.style.color="#fff"},onMouseOut:y=>{y.target.style.background="#f1f5f9",y.target.style.color=m},children:"📎 View Attachment Document"})]})]},x.id)})]},b))]})]})}const Ft=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],ir=["All","Document","Report","Syllabus","Circular","Result","Regulation","Affiliation"],Ce={Document:{icon:"📄",bg:"#EBF0FF",text:"#1a365d",border:"#BED0FF",color:"#4a7fd4"},Report:{icon:"📊",bg:"#F0FFF4",text:"#1c4532",border:"#9AE6B4",color:"#38a169"},Syllabus:{icon:"📚",bg:"#FFFBEB",text:"#744210",border:"#FAF089",color:"#d69e2e"},Circular:{icon:"📋",bg:"#FFF5F5",text:"#742a2a",border:"#FEB2B2",color:"#e53e3e"},Result:{icon:"🏆",bg:"#E6FFFA",text:"#1d4044",border:"#81E6D9",color:"#319795"},Regulation:{icon:"⚖️",bg:"#F5F3FF",text:"#4C1D95",border:"#DDD6FE",color:"#7C3AED"},Affiliation:{icon:"🏛️",bg:"#F0F9FF",text:"#0C4A6E",border:"#BAE6FD",color:"#0284C7"}},pt=t=>t!=null&&t.toDate?t.toDate():new Date(t||Date.now()),li=t=>{const i=pt(t);return`${i.getDate()} ${Ft[i.getMonth()]} ${i.getFullYear()}`};function nr(){const[t,i]=o.useState([]),[n,a]=o.useState(!0),[s,c]=o.useState("All"),[r,f]=o.useState("All"),[d,l]=o.useState("All"),[u,g]=o.useState(""),[m,w]=o.useState("grid"),k=j.navy,z=j.gold;o.useEffect(()=>{window.scrollTo(0,0);const h=X(K(L,"pdfReports"),ne("createdAt","desc"));return M(h,y=>{i(y.docs.map(N=>R({id:N.id},N.data()))),a(!1)})},[]);const p=o.useMemo(()=>{const h=new Set(t.map(y=>pt(y.createdAt).getFullYear()));return["All",...Array.from(h).sort((y,N)=>N-y)]},[t]),b=o.useMemo(()=>{const h={};return t.forEach(y=>{const N=y.type||"Document";h[N]=(h[N]||0)+1}),h},[t]),S=o.useMemo(()=>t.filter(h=>{var N;const y=pt(h.createdAt);return!(s!=="All"&&y.getFullYear()!==Number(s)||r!=="All"&&Ft[y.getMonth()]!==r||d!=="All"&&(h.type||"Document")!==d||u&&!((N=h.title)!=null&&N.toLowerCase().includes(u.toLowerCase())))}),[t,s,r,d,u]),x=o.useMemo(()=>{const h={};return S.forEach(y=>{const N=String(pt(y.createdAt).getFullYear());h[N]||(h[N]=[]),h[N].push(y)}),h},[S]);return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes spin{to{transform:rotate(360deg)}}
        .doc-fb{border:none;font-family:inherit;cursor:pointer;transition:all .15s}
        .doc-card-hover{transition:all .2s}
        .doc-card-hover:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(11,31,78,.13)!important}
        .doc-row-hover{transition:all .15s}
        .doc-row-hover:hover{background:#f8fafc!important;border-color:${z}55!important}
        .dl-btn-hover{transition:all .18s}
        .dl-btn-hover:hover{background:${z}!important;color:${k}!important}
      `}),e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"📁 Document Archive"}),e.jsx("p",{className:"hero-subtitle",children:"Syllabus, circulars, reports aur important documents — year aur type wise filter karo"})]})]}),e.jsx("div",{style:{maxWidth:"1000px",margin:"-80px auto 40px",padding:"20px",position:"relative",zIndex:10,background:"rgba(255,255,255,0.8)",backdropFilter:"blur(10px)",borderRadius:"16px",boxShadow:"0 10px 30px rgba(0,0,0,0.1)"},children:e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"},children:[Object.entries(b).map(([h,y])=>{const N=Ce[h]||{icon:"📄"};return e.jsxs("button",{onClick:()=>l(d===h?"All":h),style:{background:d===h?"#fffbeb":"#fff",border:`1px solid ${d===h?z:"#e2e8f0"}`,borderRadius:11,padding:"10px 18px",color:k,cursor:"pointer",textAlign:"center",transition:"all .2s"},children:[e.jsx("span",{style:{display:"block",fontSize:19},children:N.icon}),e.jsx("span",{style:{display:"block",fontSize:22,fontWeight:900,color:z,lineHeight:1},children:y}),e.jsx("span",{style:{display:"block",fontSize:11,color:"#64748b",marginTop:2,fontWeight:600},children:h})]},h)}),e.jsxs("div",{style:{background:"#fff",border:"1px solid #e2e8f0",borderRadius:11,padding:"10px 18px",textAlign:"center"},children:[e.jsx("span",{style:{display:"block",fontSize:19},children:"📂"}),e.jsx("span",{style:{display:"block",fontSize:22,fontWeight:900,color:z,lineHeight:1},children:t.length}),e.jsx("span",{style:{display:"block",fontSize:11,color:"#64748b",marginTop:2,fontWeight:600},children:"Total"})]})]})}),e.jsx("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"0 20px"},children:e.jsxs("main",{children:[e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",animationDelay:".1s"},children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:16},children:[e.jsxs("div",{style:{flex:1,minWidth:200,position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",opacity:.4,fontSize:16,pointerEvents:"none"},children:"🔍"}),e.jsx("input",{value:u,onChange:h=>g(h.target.value),placeholder:"Document search karo...",style:{width:"100%",padding:"10px 14px 10px 38px",border:"2px solid #e2e8f0",borderRadius:10,fontSize:14,fontFamily:"inherit",background:"#f8fafc",outline:"none",boxSizing:"border-box",transition:"border-color .2s"},onFocus:h=>h.target.style.borderColor=z,onBlur:h=>h.target.style.borderColor="#e2e8f0"})]}),e.jsxs("div",{style:{display:"flex",gap:7},children:[["grid","list"].map(h=>e.jsx("button",{className:"doc-fb",onClick:()=>w(h),style:{padding:"9px 16px",borderRadius:9,border:`2px solid ${m===h?k:"#e2e8f0"}`,background:m===h?k:"transparent",color:m===h?"#fff":"#718096",fontWeight:700,fontSize:12.5},children:h==="grid"?"⊞ Grid":"☰ List"},h)),e.jsx("span",{style:{background:"#f0f4ff",color:k,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800,alignSelf:"center"},children:S.length})]})]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"YEAR:"}),p.map(h=>e.jsx("button",{className:"doc-fb",onClick:()=>c(String(h)),style:{padding:"4px 14px",borderRadius:20,border:`2px solid ${s===String(h)?z:"#e2e8f0"}`,background:s===String(h)?z:"transparent",color:s===String(h)?k:"#718096",fontWeight:700,fontSize:12.5},children:h},h))]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"MONTH:"}),["All",...Ft].map(h=>e.jsx("button",{className:"doc-fb",onClick:()=>f(h),style:{padding:"4px 10px",borderRadius:7,border:`1.5px solid ${r===h?k:"#e2e8f0"}`,background:r===h?k:"transparent",color:r===h?"#fff":"#718096",fontWeight:600,fontSize:12},children:h},h))]}),e.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"TYPE:"}),ir.map(h=>{var N;const y=Ce[h]||{bg:"#f4f7fa",text:"#4a5568",border:"#e2e8f0"};return e.jsxs("button",{className:"doc-fb",onClick:()=>l(h),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${d===h?y.border:"#e2e8f0"}`,background:d===h?y.bg:"transparent",color:d===h?y.text:"#718096",fontWeight:700,fontSize:12},children:[h!=="All"&&(((N=Ce[h])==null?void 0:N.icon)||"📄")+" ",h]},h)}),(s!=="All"||r!=="All"||d!=="All"||u)&&e.jsx("button",{className:"doc-fb",onClick:()=>{c("All"),f("All"),l("All"),g("")},style:{padding:"4px 12px",borderRadius:20,border:"2px solid #FEB2B2",background:"#FFF5F5",color:"#e53e3e",fontWeight:700,fontSize:12},children:"✕ Clear"})]})]}),e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",marginTop:"30px",animationDelay:".2s"},children:[e.jsxs("h2",{className:"section-heading",children:["📚 Official Documents (",S.length,")"]}),e.jsx("div",{className:"heading-underline"}),n?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[e.jsx("div",{style:{width:40,height:40,border:`4px solid ${z}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"Documents load ho rahe hain..."})]}):S.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"50px 20px"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"📂"}),e.jsx("h3",{style:{color:k,fontWeight:800,margin:"0 0 6px"},children:"Koi document nahi mila"}),e.jsx("p",{style:{color:"#718096",fontSize:13.5},children:"Filter ya search change karo"})]}):m==="grid"?e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18},children:S.map(h=>{const y=Ce[h.type]||Ce.Document;return e.jsxs("div",{className:"doc-card-hover",style:{background:"#fff",borderRadius:14,overflow:"hidden",boxShadow:"0 4px 16px rgba(11,31,78,.06)",border:"1px solid #edf2f7"},children:[e.jsx("div",{style:{height:5,background:`linear-gradient(90deg,${k},${z})`}}),e.jsxs("div",{style:{padding:"18px 20px 16px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14},children:[e.jsx("div",{style:{width:50,height:50,borderRadius:12,background:y.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,border:`1px solid ${y.border}`},children:y.icon}),e.jsx("span",{style:{background:y.bg,color:y.text,border:`1px solid ${y.border}`,padding:"3px 11px",borderRadius:20,fontSize:11.5,fontWeight:700},children:h.type||"Document"})]}),e.jsx("h3",{style:{margin:"0 0 7px",fontSize:14.5,fontWeight:800,color:k,lineHeight:1.4},children:h.title}),e.jsxs("p",{style:{margin:"0 0 16px",fontSize:12,color:"#a0aec0",fontWeight:600},children:["📅 ",li(h.createdAt)]}),e.jsx("a",{href:h.link,target:"_blank",rel:"noreferrer",className:"dl-btn-hover",style:{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:k,color:"#fff",padding:"10px 16px",borderRadius:9,fontSize:13.5,fontWeight:700,textDecoration:"none",border:"none"},children:"⬇️ Download / View"})]})]},h.id)})}):Object.entries(x).sort((h,y)=>y[0]-h[0]).map(([h,y])=>e.jsxs("div",{style:{marginBottom:28},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg,#16213e,#0a3d62)",color:z,borderRadius:8,padding:"5px 16px",fontWeight:800,fontSize:12.5,whiteSpace:"nowrap"},children:["📂 ",h]}),e.jsx("div",{style:{flex:1,height:1,background:"linear-gradient(90deg,#0f346044,transparent)"}}),e.jsxs("span",{style:{fontSize:11.5,color:"#a0aec0",fontWeight:700},children:[y.length," file",y.length>1?"s":""]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:y.map(N=>{const E=Ce[N.type]||Ce.Document;return e.jsxs("div",{className:"doc-row-hover",style:{background:"#fff",borderRadius:11,padding:"13px 16px",display:"flex",alignItems:"center",gap:13,border:"1px solid #edf2f7",boxShadow:"0 2px 8px rgba(11,31,78,.04)"},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:10,background:E.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:21,flexShrink:0,border:`1px solid ${E.border}`},children:E.icon}),e.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[e.jsx("div",{style:{fontWeight:700,fontSize:14.5,color:k,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:N.title}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:4,alignItems:"center"},children:[e.jsx("span",{style:{background:E.bg,color:E.text,border:`1px solid ${E.border}`,padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700},children:N.type||"Document"}),e.jsxs("span",{style:{fontSize:12,color:"#a0aec0"},children:["📅 ",li(N.createdAt)]})]})]}),e.jsx("a",{href:N.link,target:"_blank",rel:"noreferrer",className:"dl-btn-hover",style:{display:"inline-flex",alignItems:"center",gap:6,background:k,color:"#fff",padding:"9px 18px",borderRadius:9,fontSize:13,fontWeight:700,textDecoration:"none",flexShrink:0,whiteSpace:"nowrap"},children:"⬇️ Open"})]},N.id)})})]},h))]})]})}),e.jsx("style",{children:`
        .download-btn { display:inline-block; background:#f8fafc; color:${k}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .download-btn:hover { background:${k}; color:#fff; border-color:${k}; }
      `})]})}const ar=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],rr=["All","WORKSHOP","SEMINAR","CULTURAL","SPORTS","NSS","NCC","ACADEMIC"],at={WORKSHOP:{icon:"🛠️",grad:"linear-gradient(135deg,#667eea,#764ba2)",light:"#FAF5FF",text:"#44337a",border:"#E9D8FD",color:"#805ad5"},SEMINAR:{icon:"🎤",grad:"linear-gradient(135deg,#f093fb,#f5576c)",light:"#FFF5F5",text:"#742a2a",border:"#FEB2B2",color:"#e53e3e"},CULTURAL:{icon:"🎭",grad:"linear-gradient(135deg,#4facfe,#00f2fe)",light:"#EBF8FF",text:"#1a365d",border:"#BED0FF",color:"#3182ce"},SPORTS:{icon:"🏆",grad:"linear-gradient(135deg,#43e97b,#38f9d7)",light:"#F0FFF4",text:"#1c4532",border:"#9AE6B4",color:"#38a169"},NSS:{icon:"🤝",grad:"linear-gradient(135deg,#fa709a,#fee140)",light:"#FFFBEB",text:"#744210",border:"#FAF089",color:"#d69e2e"},NCC:{icon:"🎖️",grad:"linear-gradient(135deg,#a18cd1,#fbc2eb)",light:"#FAF5FF",text:"#44337a",border:"#E9D8FD",color:"#805ad5"},ACADEMIC:{icon:"📚",grad:"linear-gradient(135deg,#a18cd1,#fbc2eb)",light:"#FAF5FF",text:"#44337a",border:"#E9D8FD",color:"#805ad5"}},di=t=>t!=null&&t.toDate?t.toDate():new Date(t||Date.now());function sr(){const[t,i]=o.useState([]),[n,a]=o.useState(!0),[s,c]=o.useState("upcoming"),[r,f]=o.useState("All"),[d,l]=o.useState("All"),[u,g]=o.useState("All"),[m,w]=o.useState(""),[k,z]=o.useState(null),p=j.navy,b=j.gold;o.useEffect(()=>{window.scrollTo(0,0);const v=X(K(L,"events"),ne("createdAt","desc"));return M(v,I=>{i(I.docs.map(B=>R({id:B.id},B.data()))),a(!1)})},[]);const S=o.useMemo(()=>t.filter(v=>v.status==="upcoming"),[t]),x=o.useMemo(()=>t.filter(v=>v.status!=="upcoming"),[t]),h=o.useMemo(()=>{const v=new Set(t.map(I=>di(I.createdAt).getFullYear()));return["All",...Array.from(v).sort((I,B)=>B-I)]},[t]),y=o.useMemo(()=>t.filter(v=>{var I;return!(s==="upcoming"&&v.status!=="upcoming"||s==="past"&&v.status==="upcoming"||r!=="All"&&v.type!==r||d!=="All"&&di(v.createdAt).getFullYear()!==Number(d)||u!=="All"&&(v.month||"").toUpperCase()!==u.toUpperCase()||m&&!((I=v.title)!=null&&I.toLowerCase().includes(m.toLowerCase())))}),[t,s,r,d,u,m]),N=o.useMemo(()=>{const v={};return y.forEach(I=>{const B=I.month||"Other";v[B]||(v[B]=[]),v[B].push(I)}),v},[y]),E=S[0];return e.jsxs("div",{className:"profile-page-wrapper",children:[e.jsx("style",{children:`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes glow{0%,100%{box-shadow:0 8px 28px rgba(11,31,78,.1)}50%{box-shadow:0 8px 28px rgba(201,162,39,.25)}}
        .evt-fb{border:none;font-family:inherit;cursor:pointer;transition:all .15s}
        .evt-card{transition:all .22s}
        .evt-card:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(11,31,78,.13)!important}
        .evt-upcoming{animation:glow 3s ease-in-out infinite}
        .evt-img{transition:transform .4s}
        .evt-card:hover .evt-img{transform:scale(1.06)}
      `}),e.jsxs("header",{className:"profile-hero",style:{backgroundImage:"url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2070&auto=format&fit=crop')"},children:[e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content anim-fade-in",children:[e.jsx("h1",{className:"hero-title",children:"🏛️ Campus Events"}),e.jsx("p",{className:"hero-subtitle",children:"Workshops, seminars, cultural fests aur khel-kud — saari activities ek jagah"})]})]}),e.jsx("div",{style:{maxWidth:"1000px",margin:"-80px auto 40px",padding:"20px",position:"relative",zIndex:10,background:"rgba(255,255,255,0.8)",backdropFilter:"blur(10px)",borderRadius:"16px",boxShadow:"0 10px 30px rgba(0,0,0,0.1)"},children:e.jsx("div",{style:{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"},children:[{val:t.length,label:"Total Events",icon:"📆"},{val:S.length,label:"Upcoming",icon:"🔜",hi:!0},{val:x.length,label:"Past Events",icon:"📜"},{val:[...new Set(t.map(v=>v.type))].filter(Boolean).length,label:"Types",icon:"🏷️"}].map((v,I)=>e.jsxs("div",{style:{background:v.hi?"#fffbeb":"#fff",border:`1px solid ${v.hi?b:"#e2e8f0"}`,borderRadius:11,padding:"10px 20px",textAlign:"center",transition:"all .2s",flex:1,minWidth:"150px"},children:[e.jsx("span",{style:{display:"block",fontSize:17},children:v.icon}),e.jsx("div",{style:{fontSize:24,fontWeight:900,color:v.hi?b:p,lineHeight:1,marginTop:2},children:v.val}),e.jsx("div",{style:{fontSize:11,color:"#64748b",marginTop:2,fontWeight:600},children:v.label})]},I))})}),e.jsx("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"0 20px"},children:e.jsxs("main",{children:[E&&e.jsx("section",{className:"glass-panel profile-section anim-slide-up",style:{padding:"18px 22px",animationDelay:".05s",border:`2px solid ${b}44`},children:(()=>{const v=at[E.type]||{icon:"🏆",grad:`linear-gradient(135deg,${p},#1a3a7c)`,light:"#EBF0FF",text:"#1a365d"};return e.jsxs("div",{style:{display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:11,fontWeight:900,color:b,letterSpacing:1.5,textTransform:"uppercase",flexShrink:0},children:"⭐ Featured"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,background:`linear-gradient(135deg,${p},#1a3a7c)`,borderRadius:13,padding:"14px 20px",flex:1,minWidth:260},children:[e.jsx("div",{style:{width:50,height:50,borderRadius:11,background:v.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0},children:v.icon}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:5,flexWrap:"wrap"},children:[e.jsx("span",{style:{background:v.light,color:v.text,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:700},children:E.type}),E.day&&e.jsxs("span",{style:{background:`${b}22`,color:b,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:700},children:["📅 ",E.day," ",E.month]})]}),e.jsx("h3",{style:{margin:0,fontSize:17,fontWeight:800,color:"#fff"},children:E.title}),e.jsxs("p",{style:{margin:"3px 0 0",fontSize:12.5,color:"rgba(255,255,255,.55)"},children:["📍 ",E.location||"College Campus"]})]})]})]})})()}),e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",marginTop:"30px",animationDelay:".1s"},children:[e.jsx("div",{style:{display:"flex",gap:3,marginBottom:16,background:"#f4f7fa",borderRadius:11,padding:3,width:"fit-content"},children:[{id:"upcoming",label:"🔜 Upcoming",count:S.length},{id:"all",label:"📆 All",count:t.length},{id:"past",label:"📜 Past",count:x.length}].map(v=>e.jsxs("button",{className:"evt-fb",onClick:()=>c(v.id),style:{padding:"8px 18px",borderRadius:9,background:s===v.id?p:"transparent",color:s===v.id?"#fff":"#718096",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:7},children:[v.label,e.jsx("span",{style:{background:s===v.id?b:"#e2e8f0",color:s===v.id?p:"#718096",borderRadius:20,padding:"1px 8px",fontSize:11.5,fontWeight:800},children:v.count})]},v.id))}),e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:12},children:[e.jsxs("div",{style:{flex:1,minWidth:200,position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",opacity:.4,fontSize:16,pointerEvents:"none"},children:"🔍"}),e.jsx("input",{value:m,onChange:v=>w(v.target.value),placeholder:"Event search karo...",style:{width:"100%",padding:"10px 14px 10px 38px",border:"2px solid #e2e8f0",borderRadius:10,fontSize:14,fontFamily:"inherit",background:"#f8fafc",outline:"none",boxSizing:"border-box",transition:"border-color .2s"},onFocus:v=>v.target.style.borderColor=b,onBlur:v=>v.target.style.borderColor="#e2e8f0"})]}),e.jsxs("span",{style:{background:"#f0f4ff",color:p,borderRadius:20,padding:"5px 14px",fontSize:12.5,fontWeight:800},children:[y.length," events"]})]}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center",marginBottom:10},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"TYPE:"}),rr.map(v=>{var B;const I=at[v]||{light:"#f4f7fa",text:"#4a5568",border:"#e2e8f0"};return e.jsxs("button",{className:"evt-fb",onClick:()=>f(v),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${r===v&&I.border||"#e2e8f0"}`,background:r===v?I.light:"transparent",color:r===v?I.text:"#718096",fontWeight:700,fontSize:12},children:[v!=="All"&&(((B=at[v])==null?void 0:B.icon)||"")+" ",v]},v)})]}),e.jsxs("div",{style:{display:"flex",gap:14,flexWrap:"wrap",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"YEAR:"}),h.map(v=>e.jsx("button",{className:"evt-fb",onClick:()=>l(String(v)),style:{padding:"4px 13px",borderRadius:20,border:`2px solid ${d===String(v)?b:"#e2e8f0"}`,background:d===String(v)?b:"transparent",color:d===String(v)?p:"#718096",fontWeight:700,fontSize:12},children:v},v))]}),e.jsxs("div",{style:{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#a0aec0",textTransform:"uppercase",letterSpacing:.8,flexShrink:0},children:"MONTH:"}),["All",...ar].map(v=>e.jsx("button",{className:"evt-fb",onClick:()=>g(v),style:{padding:"3px 9px",borderRadius:6,border:`1.5px solid ${u===v?p:"#e2e8f0"}`,background:u===v?p:"transparent",color:u===v?"#fff":"#718096",fontWeight:600,fontSize:11.5},children:v},v))]}),(r!=="All"||d!=="All"||u!=="All"||m)&&e.jsx("button",{className:"evt-fb",onClick:()=>{f("All"),l("All"),g("All"),w("")},style:{padding:"4px 12px",borderRadius:20,border:"2px solid #FEB2B2",background:"#FFF5F5",color:"#e53e3e",fontWeight:700,fontSize:12},children:"✕ Clear"})]})]}),e.jsxs("section",{style:{background:"#fff",padding:"30px 40px",borderRadius:"16px",boxShadow:"0 8px 25px rgba(0,0,0,0.07)",marginTop:"30px",animationDelay:".2s"},children:[e.jsxs("h2",{className:"section-heading",children:["📅 Events (",y.length,")"]}),e.jsx("div",{className:"heading-underline"}),n?e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[e.jsx("div",{style:{width:40,height:40,border:`4px solid ${b}`,borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}),e.jsx("p",{style:{color:"#718096",fontWeight:600},children:"Events load ho rahe hain..."})]}):y.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"50px 20px"},children:[e.jsx("div",{style:{fontSize:44,marginBottom:10},children:"🎭"}),e.jsx("h3",{style:{color:p,fontWeight:800,margin:"0 0 6px"},children:"Koi event nahi mila"}),e.jsx("p",{style:{color:"#718096",fontSize:13.5},children:"Tab ya filter change karo"})]}):Object.entries(N).map(([v,I])=>e.jsxs("div",{style:{marginBottom:32},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:18},children:[e.jsxs("div",{style:{background:`linear-gradient(135deg,${p},#1a3a7c)`,color:b,borderRadius:9,padding:"6px 18px",fontWeight:900,fontSize:13.5,whiteSpace:"nowrap",boxShadow:`0 4px 14px ${p}22`},children:["📅 ",v]}),e.jsx("div",{style:{flex:1,height:2,background:`linear-gradient(90deg,${b}44,transparent)`}}),e.jsxs("span",{style:{fontSize:11.5,color:"#a0aec0",fontWeight:700},children:[I.length," event",I.length>1?"s":""]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18},children:I.map(B=>{const G=at[B.type]||{icon:"🏆",grad:`linear-gradient(135deg,${p},#1a3a7c)`,light:"#EBF0FF",text:"#1a365d"},Q=B.status==="upcoming",te=k===B.id,Z=(B.desc||"").replace(/<[^>]*>/g,"");return e.jsxs("div",{className:`evt-card${Q?" evt-upcoming":""}`,style:{background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:Q?"0 8px 28px rgba(11,31,78,.1)":"0 4px 16px rgba(11,31,78,.06)",border:Q?`2px solid ${b}`:"1px solid #edf2f7",position:"relative"},children:[B.imageUrl?e.jsxs("div",{style:{height:190,position:"relative",overflow:"hidden"},children:[e.jsx("img",{src:B.imageUrl,alt:B.title,className:"evt-img",style:{width:"100%",height:"100%",objectFit:"cover"},onError:$=>{$.target.parentElement.style.background=G.grad,$.target.style.display="none"}}),e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 50%,rgba(11,31,78,.75))"}}),e.jsxs("div",{style:{position:"absolute",top:12,left:12,background:"rgba(255,255,255,.92)",borderRadius:9,padding:"6px 10px",textAlign:"center",backdropFilter:"blur(4px)",minWidth:44},children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,color:"#718096",textTransform:"uppercase"},children:B.month}),e.jsx("div",{style:{fontSize:20,fontWeight:900,color:p,lineHeight:1},children:B.day||"?"})]}),e.jsxs("span",{style:{position:"absolute",top:12,right:12,background:G.light,color:G.text,padding:"4px 12px",borderRadius:20,fontSize:11.5,fontWeight:700},children:[G.icon," ",B.type]})]}):e.jsx("div",{style:{background:G.grad,padding:"20px 18px 16px"},children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{style:{background:"rgba(255,255,255,.22)",borderRadius:9,padding:"7px 10px",textAlign:"center",backdropFilter:"blur(4px)",minWidth:44},children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,color:"rgba(255,255,255,.7)",textTransform:"uppercase"},children:B.month||"?"}),e.jsx("div",{style:{fontSize:22,fontWeight:900,color:"#fff",lineHeight:1},children:B.day||"?"})]}),e.jsxs("span",{style:{background:"rgba(255,255,255,.22)",color:"#fff",padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:700,backdropFilter:"blur(4px)"},children:[G.icon," ",B.type]})]})}),Q&&e.jsx("div",{style:{background:"linear-gradient(135deg,#f6ad55,#ed8936)",color:"#fff",textAlign:"center",padding:"3px 0",fontSize:10.5,fontWeight:900,letterSpacing:.8},children:"🔜 UPCOMING EVENT"}),e.jsxs("div",{style:{padding:"16px 18px 18px"},children:[e.jsx("h3",{style:{margin:"0 0 6px",fontSize:15.5,fontWeight:800,color:p,lineHeight:1.35},children:B.title}),e.jsxs("p",{style:{margin:"0 0 10px",fontSize:12.5,color:"#718096",display:"flex",alignItems:"center",gap:5},children:[e.jsx("span",{children:"📍"})," ",B.location||"College Campus"]}),Z&&e.jsxs(e.Fragment,{children:[e.jsx("p",{style:{margin:0,fontSize:13,color:"#4a5568",lineHeight:1.65},children:te?Z:Z.substring(0,100)+(Z.length>100?"…":"")}),Z.length>100&&e.jsx("button",{onClick:()=>z(te?null:B.id),style:{background:"none",border:"none",color:b,fontWeight:800,fontSize:12.5,cursor:"pointer",padding:"6px 0 0",fontFamily:"inherit"},children:te?"▲ Less":"▼ Read More"})]}),B.reportLink&&e.jsx("a",{href:B.reportLink,target:"_blank",rel:"noreferrer",className:"download-btn",style:{marginTop:12,display:"inline-flex",alignItems:"center",gap:6},children:"📄 PDF Report"})]})]},B.id)})})]},v))]})]})}),e.jsx("style",{children:`
        .download-btn { display:inline-block; background:#f8fafc; color:${p}; padding:8px 15px; border-radius:6px; font-size:12px; font-weight:700; text-decoration:none; border:1px solid #cbd5e1; transition:.2s; }
        .download-btn:hover { background:${p}; color:#fff; border-color:${p}; }
      `})]})}const U=j.navy,fe=j.gold;function Te(){o.useEffect(()=>{window.scrollTo(0,0)},[])}function ie({children:t,delay:i=0,y:n=20}){const a=o.useRef(null),[s,c]=o.useState(!1);return o.useEffect(()=>{const r=new IntersectionObserver(([f])=>{f.isIntersecting&&(c(!0),r.disconnect())},{threshold:.05});return a.current&&r.observe(a.current),()=>r.disconnect()},[]),e.jsx("div",{ref:a,style:{opacity:s?1:0,transform:s?"none":`translateY(${n}px)`,transition:`all 0.65s cubic-bezier(0.22,1,0.36,1) ${i}s`},children:t})}function $e({title:t,subtitle:i,icon:n}){return e.jsxs("div",{style:{background:`linear-gradient(135deg, ${U} 0%, #1a3a7c 100%)`,padding:"70px 20px 55px",textAlign:"center",color:"#fff"},children:[n&&e.jsx("div",{style:{fontSize:48,marginBottom:14},children:n}),e.jsx("h1",{style:{fontSize:"clamp(28px, 4.5vw, 42px)",fontWeight:900,margin:"0 0 12px",letterSpacing:"-0.5px"},children:t}),i&&e.jsx("p",{style:{color:"#cbd5e1",fontSize:16,maxWidth:600,margin:"0 auto",lineHeight:1.6},children:i})]})}function or(){return e.jsx("aside",{className:"profile-sidebar",children:e.jsxs(ie,{delay:.1,children:[e.jsxs("div",{className:"widget",children:[e.jsxs("h3",{className:"widget-title",children:[e.jsx("span",{children:"📑"})," About Us"]}),e.jsx("ul",{className:"quick-links",children:[{label:"College Profile",path:"/about-us/college-profile"},{label:"Vision & Mission",path:"/about-us/vision-mission"},{label:"Principal's Message",path:"/about-us/principal-message"},{label:"Organogram",path:"/about-us/college-management/organogram"},{label:"Presidents",path:"/about-us/college-management/presidents"},{label:"Secretaries",path:"/about-us/college-management/secretaries"},{label:"Principals",path:"/about-us/college-management/principal"},{label:"Governing Body",path:"/about-us/governing-body"},{label:"Staff Council",path:"/about-us/staff-council"},{label:"Teaching Staff",path:"/about-us/college-staff/teaching-staff"},{label:"Non-Teaching Staff",path:"/about-us/college-staff/non-teaching-staff"},{label:"Audit Report",path:"/about-us/audit-report"}].map((t,i)=>e.jsx("li",{className:"quick-link-item",children:e.jsxs(F,{to:t.path,className:"quick-link",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[e.jsx("span",{className:"link-arrow",children:"›"})," ",t.label]})},i))})]}),e.jsxs("div",{className:"helpdesk-widget",children:[e.jsx("div",{style:{fontSize:42,marginBottom:14,position:"relative",zIndex:2},children:"📞"}),e.jsx("h4",{style:{margin:"0 0 10px",fontSize:18,color:fe,position:"relative",zIndex:2},children:"Need Help?"}),e.jsx("p",{style:{fontSize:13,margin:"0 0 18px",color:"#e2e8f0",lineHeight:1.6,position:"relative",zIndex:2},children:"Contact our admin office for admissions or academic queries."}),e.jsx("a",{href:"tel:+917903340991",className:"helpdesk-btn",children:"Call: 79033 40991"})]})]})})}function be({label:t}){return e.jsxs("div",{style:{margin:"16px 0",padding:"10px 16px",background:"#fffbeb",border:"1.5px dashed #f59e0b",borderRadius:10,color:"#92400e",fontSize:13,fontWeight:700},children:["✏️ DATA YAHAN DALEIN: ",t]})}function De({children:t}){return e.jsx("div",{style:{maxWidth:1200,margin:"0 auto",padding:"50px 20px 80px"},children:e.jsxs("div",{className:"profile-layout",children:[e.jsx("main",{className:"profile-main",children:t}),e.jsx(or,{})]})})}function zi({collectionName:t,accentColor:i,emptyText:n}){const[a,s]=o.useState([]),[c,r]=o.useState(!0);return o.useEffect(()=>{const f=X(K(L,t),ne("date","desc")),d=M(f,l=>{s(l.docs.map(u=>R({id:u.id},u.data()))),r(!1)},()=>r(!1));return()=>d()},[t]),c?e.jsx("div",{style:{padding:20,textAlign:"center",color:"#94a3b8"},children:"⏳ Loading…"}):a.length===0?e.jsxs("div",{style:{padding:32,textAlign:"center",color:"#94a3b8",background:"#f8fafc",borderRadius:12},children:[e.jsx("div",{style:{fontSize:36,marginBottom:8},children:"📂"}),e.jsx("div",{style:{fontWeight:700},children:n||"Koi meetings nahi mili."}),e.jsxs("div",{style:{fontSize:12,marginTop:4},children:["Admin Panel → ",t==="gb_meetings"?"GB Meetings":"Staff Council"," tab se add karein"]})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:a.map(f=>{const d=f.date?new Date(f.date):null;return e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"flex-start",background:"#fff",borderRadius:14,padding:18,border:"1.5px solid #e2e8f0",borderLeft:`5px solid ${i||U}`,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},children:[e.jsxs("div",{style:{background:i||U,color:"#fff",borderRadius:10,padding:"8px 12px",textAlign:"center",flexShrink:0,minWidth:56},children:[e.jsx("div",{style:{fontSize:20,fontWeight:900,lineHeight:1},children:d?d.getDate().toString().padStart(2,"0"):"--"}),e.jsx("div",{style:{fontSize:10,fontWeight:700,marginTop:2,opacity:.85},children:d?d.toLocaleString("en-IN",{month:"short"}).toUpperCase():"--"}),e.jsx("div",{style:{fontSize:9,opacity:.7},children:d?d.getFullYear():""})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontWeight:800,color:U,fontSize:15},children:f.title}),f.notes&&e.jsx("div",{style:{fontSize:13,color:"#64748b",marginTop:4,lineHeight:1.6},children:f.notes}),e.jsx("div",{style:{marginTop:10},children:e.jsx("a",{href:f.pdfUrl,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:7,background:i||U,color:"#fff",padding:"7px 16px",borderRadius:8,fontWeight:700,fontSize:13,textDecoration:"none"},children:"📄 View Meeting PDF"})})]})]},f.id)})})}function lr(){return Te(),e.jsxs("div",{children:[e.jsx($e,{title:"Vision & Mission",subtitle:"Our guiding principles and future aspirations",icon:"🌟"}),e.jsxs(De,{children:[e.jsx(ie,{children:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24,marginBottom:32},children:[e.jsxs("div",{style:{background:"#fff",borderRadius:20,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",overflow:"hidden"},children:[e.jsx("div",{style:{height:6,background:fe}}),e.jsxs("div",{style:{padding:32},children:[e.jsx("div",{style:{fontSize:42,marginBottom:14},children:"🎯"}),e.jsx("h2",{style:{color:U,fontSize:22,fontWeight:800,marginBottom:16},children:"Our Vision"}),e.jsx("p",{style:{color:"#475569",lineHeight:1.8,fontSize:15},children:"To be a premier institution of higher learning that nurtures leaders of tomorrow — intellectually competent, ethically grounded, and socially responsible — drawing inspiration from the teachings of Guru Nanak Devji."})]})]}),e.jsxs("div",{style:{background:"#fff",borderRadius:20,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",overflow:"hidden"},children:[e.jsx("div",{style:{height:6,background:U}}),e.jsxs("div",{style:{padding:32},children:[e.jsx("div",{style:{fontSize:42,marginBottom:14},children:"📌"}),e.jsx("h2",{style:{color:U,fontSize:22,fontWeight:800,marginBottom:16},children:"Our Mission"}),e.jsx("p",{style:{color:"#475569",lineHeight:1.8,fontSize:15},children:"To provide quality and inclusive higher education to all sections of society, with special focus on the underprivileged, empowering students through academic excellence, skill development, and value-based learning."})]})]})]})}),e.jsx(ie,{delay:.15,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:36,boxShadow:"0 8px 30px rgba(0,0,0,0.07)"},children:[e.jsx("h2",{className:"section-heading",children:"Core Values"}),e.jsx("div",{className:"heading-underline"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:16,marginTop:24},children:[{icon:"🕊️",label:"Peace & Harmony"},{icon:"🎓",label:"Academic Excellence"},{icon:"🤝",label:"Inclusivity"},{icon:"💡",label:"Innovation"},{icon:"🌿",label:"Service to Society"},{icon:"⚖️",label:"Integrity"}].map((t,i)=>e.jsxs("div",{style:{textAlign:"center",padding:"20px 12px",background:"#f8fafc",borderRadius:14,border:"1.5px solid #e2e8f0"},children:[e.jsx("div",{style:{fontSize:32,marginBottom:8},children:t.icon}),e.jsx("div",{style:{fontSize:13,fontWeight:700,color:U},children:t.label})]},i))})]})})]})]})}function dr(){return Te(),e.jsxs("div",{children:[e.jsx($e,{title:"Principal's Message",subtitle:"A word from our Principal to students and parents",icon:"🎓"}),e.jsx(De,{children:e.jsx(ie,{children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:40,boxShadow:"0 8px 30px rgba(0,0,0,0.07)"},children:[e.jsxs("div",{style:{display:"flex",gap:36,alignItems:"flex-start",flexWrap:"wrap",marginBottom:36},children:[e.jsxs("div",{style:{textAlign:"center",flexShrink:0},children:[e.jsx(be,{label:"Principal ki photo ka path — src mein dalein"}),e.jsx("div",{style:{width:180,height:180,borderRadius:"50%",border:`6px solid ${fe}`,boxShadow:"0 10px 30px rgba(15,35,71,0.2)",overflow:"hidden",margin:"0 auto",background:"#f1f5f9",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("span",{style:{fontSize:72},children:"👨‍💼"})}),e.jsx(be,{label:"Principal ka naam, qualification, experience"}),e.jsx("div",{style:{marginTop:14,fontWeight:800,fontSize:18,color:U},children:"Prof. [Principal Name]"}),e.jsx("div",{style:{fontSize:13,color:"#64748b",marginTop:4},children:"Principal"}),e.jsx("div",{style:{fontSize:13,color:"#64748b"},children:"Guru Nanak College, Dhanbad"}),e.jsx("div",{style:{fontSize:12,color:"#94a3b8",marginTop:4},children:"[M.A., Ph.D.]"})]}),e.jsx("div",{style:{flex:1,minWidth:260},children:e.jsx("div",{style:{borderLeft:`5px solid ${fe}`,paddingLeft:24,marginBottom:24},children:e.jsx("p",{style:{fontSize:20,fontStyle:"italic",color:U,fontWeight:700,lineHeight:1.6},children:'"Education is not merely the acquisition of knowledge, but the transformation of character and the cultivation of a purposeful life."'})})})]}),e.jsx("h2",{className:"section-heading",children:"Message to Students & Parents"}),e.jsx("div",{className:"heading-underline"}),e.jsx(be,{label:"Principal ka poora sandesh — 3-4 paragraphs"}),e.jsx("p",{className:"rich-text-content",children:"Dear Students and Parents, it gives me immense pleasure to welcome you to Guru Nanak College, Dhanbad — an institution that has been nurturing young minds for over five decades."}),e.jsx("p",{className:"rich-text-content mt-4",children:"Our college stands as a beacon of quality education in Jharkhand, offering a rich blend of academic rigour, co-curricular activities, and personal development."}),e.jsx("p",{className:"rich-text-content mt-4",children:"I invite you to be part of our vibrant community and assure you of our complete support at every step of your academic journey."})]})})})]})}function cr(){return Te(),e.jsxs("div",{children:[e.jsx($e,{title:"Organogram",subtitle:"Organizational structure and hierarchy of Guru Nanak College, Dhanbad",icon:"🏛️"}),e.jsx(De,{children:e.jsx(ie,{delay:.15,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:32,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:24},children:[e.jsx("h2",{className:"section-heading",children:"Official Organogram (Image)"}),e.jsx("div",{className:"heading-underline"}),e.jsx("div",{style:{textAlign:"center",marginTop:20},children:e.jsx("img",{src:"/gncollege-website/images/organogram.jpg",alt:"College Organogram",style:{maxWidth:"100%",borderRadius:10,boxShadow:"0 4px 16px rgba(0,0,0,0.1)"}})}),e.jsx("div",{style:{textAlign:"center",marginTop:20},children:e.jsx("a",{href:"/gncollege-website/images/organogram.jpg",download:!0,style:{display:"inline-flex",alignItems:"center",gap:8,background:"#0f2347",color:"#fff",padding:"10px 22px",borderRadius:10,fontWeight:700,fontSize:14,textDecoration:"none"},children:"📥 Download Organogram PDF"})})]})})})]})}function me({name:t,desc:i,icon:n,purpose:a=[],responsibilities:s=[]}){return Te(),e.jsxs("div",{children:[e.jsx($e,{title:t,subtitle:i,icon:n}),e.jsxs(De,{children:[e.jsx(ie,{children:e.jsx("div",{style:{background:"#fff",borderRadius:20,padding:32,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:20},children:e.jsxs("div",{style:{display:"flex",gap:20,alignItems:"center",padding:20,background:`linear-gradient(135deg,${U},#1a3a7c)`,borderRadius:14,color:"#fff",flexWrap:"wrap"},children:[e.jsx("div",{style:{width:72,height:72,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,border:`3px solid ${fe}`,flexShrink:0},children:n}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:11,color:fe,fontWeight:700,textTransform:"uppercase",letterSpacing:1},children:"Chairperson / Convener"}),e.jsx(be,{label:`${t} ke Chairperson ka naam aur designation`}),e.jsx("div",{style:{fontSize:18,fontWeight:800},children:"✏️ [Chairperson Name]"}),e.jsx("div",{style:{fontSize:13,color:"#cbd5e1",marginTop:4},children:"✏️ [Designation, Department]"})]})]})})}),a.length>0&&e.jsx(ie,{delay:.1,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:32,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:20},children:[e.jsx("h2",{className:"section-heading",children:"Purpose"}),e.jsx("div",{className:"heading-underline"}),e.jsx("ul",{style:{marginTop:12,paddingLeft:20},children:a.map((c,r)=>e.jsx("li",{style:{marginBottom:8,color:"#475569",lineHeight:1.7},children:c},r))})]})}),s.length>0&&e.jsx(ie,{delay:.15,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:32,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:20},children:[e.jsx("h2",{className:"section-heading",children:"Key Responsibilities"}),e.jsx("div",{className:"heading-underline"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:12,marginTop:16},children:s.map((c,r)=>e.jsx("div",{style:{padding:"12px 16px",background:"#f8fafc",borderRadius:10,borderLeft:`4px solid ${fe}`,fontSize:14,color:"#334155"},children:c},r))})]})}),e.jsx(ie,{delay:.2,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:32,boxShadow:"0 8px 30px rgba(0,0,0,0.07)"},children:[e.jsx("h2",{className:"section-heading",children:"Committee Members"}),e.jsx("div",{className:"heading-underline"}),e.jsx(be,{label:`${t} ke members — naam, designation, role`}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:14},children:[e.jsx("thead",{children:e.jsx("tr",{style:{background:U,color:"#fff"},children:["S.No.","Name","Designation","Department","Role"].map(c=>e.jsx("th",{style:{padding:"12px 16px",textAlign:"left",fontWeight:700},children:c},c))})}),e.jsx("tbody",{children:[1,2,3,4,5].map((c,r)=>e.jsxs("tr",{style:{background:r%2===0?"#f8fafc":"#fff",borderBottom:"1px solid #e2e8f0"},children:[e.jsx("td",{style:{padding:"11px 16px",color:"#64748b"},children:r+1}),e.jsx("td",{style:{padding:"11px 16px",fontWeight:600,color:"#94a3b8"},children:"✏️ [Name]"}),e.jsx("td",{style:{padding:"11px 16px",color:"#94a3b8"},children:"✏️ [Designation]"}),e.jsx("td",{style:{padding:"11px 16px",color:"#94a3b8"},children:"✏️ [Dept]"}),e.jsx("td",{style:{padding:"11px 16px"},children:e.jsx("span",{style:{background:r===0?"#fef3c7":"#f1f5f9",color:r===0?"#92400e":"#475569",padding:"3px 10px",borderRadius:6,fontSize:12,fontWeight:700},children:r===0?"Chairperson":r===1?"Member Secretary":"Member"})})]},r))})]})})]})})]})]})}function pr(){return e.jsx(me,{name:"Women's Cell",icon:"👩‍💼",desc:"Dedicated to the safety, empowerment, and welfare of female students and staff at GNC.",purpose:["Ensure a safe and harassment-free environment for women on campus.","Conduct awareness programs on women's rights and legal provisions.","Provide counselling and support to female students in need."],responsibilities:["Monitor campus safety for women","Handle complaints related to women's issues","Organize gender sensitization workshops","Coordinate with ICC for harassment cases"]})}function fr(){return e.jsx(me,{name:"Anti-Ragging Committee",icon:"🚫",desc:"Committed to maintaining a 100% ragging-free campus in compliance with UGC & Supreme Court guidelines.",purpose:["Prevent and prohibit ragging in all forms on campus.","Create awareness among students about legal consequences of ragging.","Investigate complaints and take strict action against offenders."],responsibilities:["Display anti-ragging notices","Collect anti-ragging affidavits","Investigate complaints promptly","Coordinate with police if required","Conduct orientation programs"]})}function xr(){return e.jsx(me,{name:"SC/ST Cell",icon:"🤝",desc:"A dedicated welfare and support centre for Scheduled Caste and Scheduled Tribe students.",purpose:["Ensure equal educational opportunities for SC/ST students.","Guide students about government scholarships and reservations.","Resolve academic and social issues faced by SC/ST students."],responsibilities:["Facilitate scholarship applications","Address grievances of SC/ST students","Organize awareness camps","Maintain data of SC/ST enrollment","Liaison with government welfare departments"]})}function gr(){return e.jsx(me,{name:"OBC Cell",icon:"📚",desc:"Supporting students from Other Backward Classes with their academic and welfare needs.",purpose:["Facilitate awareness of OBC reservations and government schemes.","Guide OBC students for scholarship applications.","Provide academic and career counselling."],responsibilities:["Scholarship guidance for OBC students","Address academic grievances","Facilitate income/caste certificate help","Organize career awareness programs"]})}function hr(){return e.jsx(me,{name:"Grievance Redressal Cell",icon:"⚖️",desc:"An official platform for students and staff to raise and resolve their academic and administrative grievances.",purpose:["Provide a fair and transparent mechanism for addressing grievances.","Ensure prompt redressal of student and staff complaints.","Maintain a record of grievances and their resolution."],responsibilities:["Receive and register grievances","Investigate complaints within stipulated time","Maintain grievance register","Submit reports to Principal","Ensure confidentiality and impartiality"]})}function mr(){return e.jsx(me,{name:"Internal Complaints Committee (ICC)",icon:"🛡️",desc:"Constituted under Sexual Harassment of Women at Workplace Act, 2013.",purpose:["Prevent, prohibit, and redress sexual harassment complaints.","Conduct sensitization programs for students and staff.","Ensure impartial inquiry and fair resolution of complaints."],responsibilities:["Receive complaints of sexual harassment","Conduct inquiry within 90 days","Maintain confidentiality of complainant","Submit annual report to District Officer","Organize prevention workshops"]})}function ur(){return e.jsx(me,{name:"Minority Cell",icon:"🌙",desc:"A welfare cell to support and guide students from minority communities in their academic journey.",purpose:["Guide minority students about government scholarships and schemes.","Create an inclusive environment for minority students.","Address specific academic and personal issues."],responsibilities:["Pre-matric and post-matric scholarship guidance","Address minority student grievances","Organize awareness programs","Maintain enrollment data"]})}function br(){return e.jsx(me,{name:"Placement Cell",icon:"💼",desc:"Bridging students with career opportunities through training, internships, and campus placements.",purpose:["Facilitate campus placements and internship opportunities.","Organize skill development and career guidance programs.","Maintain industry-academia partnerships."],responsibilities:["Coordinate with companies for campus drives","Organize mock interviews and GD sessions","Maintain placement records","Career counselling for final year students","Organize job fairs"]})}function yr(){return e.jsx(me,{name:"RUSA Cell",icon:"🏛️",desc:"Rashtriya Uchchatar Shiksha Abhiyan — implementing central schemes for quality improvement in higher education.",purpose:["Implement RUSA-funded projects and infrastructure development.","Ensure compliance with RUSA guidelines and reporting requirements."],responsibilities:["Coordinate RUSA grant utilization","Maintain RUSA project documentation","Submit utilization certificates","Monitor RUSA-funded activities","Liaison with State Higher Education Council"]})}function jr(){return Te(),e.jsxs("div",{children:[e.jsx($e,{title:"Governing Body",subtitle:"The apex decision-making body of Guru Nanak College, Dhanbad",icon:"🏛️"}),e.jsxs(De,{children:[e.jsx(ie,{children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:36,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:24},children:[e.jsx("h2",{className:"section-heading",children:"About the Governing Body"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"The Governing Body of Guru Nanak College, Dhanbad is the supreme authority responsible for the overall management, policy decisions, and financial matters of the college. It is constituted as per UGC guidelines and the regulations of Binod Bihari Mahto Koylanchal University (BBMKU), Dhanbad."}),e.jsx(be,{label:"Current session, total members, chairperson naam — niche stats box mein dalein"}),e.jsxs("div",{style:{marginTop:20,padding:"16px 24px",background:`linear-gradient(135deg,${U},#1a3a7c)`,borderRadius:12,color:"#fff",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:11,color:fe,fontWeight:700,textTransform:"uppercase"},children:"Current Session"}),e.jsx("div",{style:{fontWeight:800,fontSize:18},children:"✏️ [Session Year]"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:11,color:fe,fontWeight:700,textTransform:"uppercase"},children:"Total Members"}),e.jsx("div",{style:{fontWeight:800,fontSize:18},children:"✏️ [Number]"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:11,color:fe,fontWeight:700,textTransform:"uppercase"},children:"Chairperson"}),e.jsx("div",{style:{fontWeight:800,fontSize:18},children:"✏️ [Name]"})]})]})]})}),e.jsx(ie,{delay:.1,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:36,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:24},children:[e.jsx("h2",{className:"section-heading",children:"Members of Governing Body"}),e.jsx("div",{className:"heading-underline"}),e.jsx(be,{label:"Saare members ka naam, designation, category, role dalein"}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:14},children:[e.jsx("thead",{children:e.jsx("tr",{style:{background:U,color:"#fff"},children:["S.No.","Name","Designation","Category","Role in GB"].map(t=>e.jsx("th",{style:{padding:"12px 16px",textAlign:"left",fontWeight:700},children:t},t))})}),e.jsx("tbody",{children:[{name:"✏️ [Name]",desig:"President, GPC",cat:"Management Nominee",role:"Chairperson"},{name:"✏️ [Name]",desig:"Secretary, GPC",cat:"Management Nominee",role:"Member"},{name:"✏️ [Name]",desig:"Principal, GNC",cat:"Ex-officio",role:"Member Secretary"},{name:"✏️ [Name]",desig:"✏️ [Designation]",cat:"Management Nominee",role:"Member"},{name:"✏️ [Name]",desig:"✏️ [Designation]",cat:"UGC Nominee",role:"Member"},{name:"✏️ [Name]",desig:"✏️ [Designation]",cat:"University Nominee",role:"Member"},{name:"✏️ [Name]",desig:"✏️ [Designation]",cat:"Teaching Staff Rep.",role:"Member"},{name:"✏️ [Name]",desig:"✏️ [Designation]",cat:"Non-Teaching Rep.",role:"Member"}].map((t,i)=>e.jsxs("tr",{style:{background:i%2===0?"#f8fafc":"#fff",borderBottom:"1px solid #e2e8f0"},children:[e.jsx("td",{style:{padding:"11px 16px",color:"#64748b"},children:i+1}),e.jsx("td",{style:{padding:"11px 16px",fontWeight:700,color:U},children:t.name}),e.jsx("td",{style:{padding:"11px 16px",color:"#475569"},children:t.desig}),e.jsx("td",{style:{padding:"11px 16px",fontSize:12},children:e.jsx("span",{style:{background:"#e0f2fe",color:"#0369a1",padding:"3px 8px",borderRadius:5,fontWeight:600},children:t.cat})}),e.jsx("td",{style:{padding:"11px 16px"},children:e.jsx("span",{style:{background:t.role==="Chairperson"?"#fef3c7":t.role==="Member Secretary"?"#dcfce7":"#f1f5f9",color:t.role==="Chairperson"?"#92400e":t.role==="Member Secretary"?"#166534":"#475569",padding:"3px 10px",borderRadius:6,fontSize:12,fontWeight:700},children:t.role})})]},i))})]})})]})}),e.jsx(ie,{delay:.2,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:36,boxShadow:"0 8px 30px rgba(0,0,0,0.07)"},children:[e.jsx("h2",{className:"section-heading",children:"GB Meeting Reports"}),e.jsx("div",{className:"heading-underline"}),e.jsxs("p",{style:{color:"#64748b",fontSize:14,marginBottom:20,lineHeight:1.7},children:["🔒 ",e.jsx("strong",{children:"Admin Panel → GB Meetings"})," tab se date-wise PDF reports yahan automatically dikhte hain."]}),e.jsx(zi,{collectionName:"gb_meetings",accentColor:U,emptyText:"Abhi tak koi GB Meeting report upload nahi ki gayi."})]})})]})]})}function vr(){return Te(),e.jsxs("div",{children:[e.jsx($e,{title:"Staff Council",subtitle:"The collective voice of teaching and non-teaching staff at GNC",icon:"👨‍🏫"}),e.jsxs(De,{children:[e.jsx(ie,{children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:36,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:24},children:[e.jsx("h2",{className:"section-heading",children:"About Staff Council"}),e.jsx("div",{className:"heading-underline"}),e.jsx("p",{className:"rich-text-content",children:"The Staff Council of Guru Nanak College, Dhanbad is a representative body of the teaching and non-teaching staff. It serves as an advisory body to the Principal on academic and administrative matters, and acts as a platform for raising and resolving staff concerns."})]})}),e.jsx(ie,{delay:.1,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:36,boxShadow:"0 8px 30px rgba(0,0,0,0.07)",marginBottom:24},children:[e.jsx("h2",{className:"section-heading",children:"Staff Council Members"}),e.jsx("div",{className:"heading-underline"}),e.jsx(be,{label:"Staff Council ke members — naam, designation, department, role"}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:14},children:[e.jsx("thead",{children:e.jsx("tr",{style:{background:U,color:"#fff"},children:["S.No.","Name","Designation","Department","Role"].map(t=>e.jsx("th",{style:{padding:"12px 16px",textAlign:"left",fontWeight:700},children:t},t))})}),e.jsx("tbody",{children:[{desig:"Principal",dept:"Administration",role:"President / Chairman"},{desig:"✏️ [Designation]",dept:"✏️ [Dept]",role:"Secretary"},{desig:"✏️ [Designation]",dept:"✏️ [Dept]",role:"Joint Secretary"},{desig:"✏️ [Designation]",dept:"✏️ [Dept]",role:"Member"},{desig:"✏️ [Designation]",dept:"✏️ [Dept]",role:"Member"},{desig:"✏️ [Designation]",dept:"✏️ [Dept]",role:"Member"},{desig:"✏️ [Designation]",dept:"✏️ [Dept]",role:"Non-Teaching Rep."}].map((t,i)=>e.jsxs("tr",{style:{background:i%2===0?"#f8fafc":"#fff",borderBottom:"1px solid #e2e8f0"},children:[e.jsx("td",{style:{padding:"11px 16px",color:"#64748b"},children:i+1}),e.jsx("td",{style:{padding:"11px 16px",fontWeight:700,color:U},children:"✏️ [Name]"}),e.jsx("td",{style:{padding:"11px 16px",color:"#475569"},children:t.desig}),e.jsx("td",{style:{padding:"11px 16px",color:"#64748b",fontSize:13},children:t.dept}),e.jsx("td",{style:{padding:"11px 16px"},children:e.jsx("span",{style:{background:t.role.includes("President")?"#fef3c7":t.role==="Secretary"?"#dcfce7":"#f1f5f9",color:t.role.includes("President")?"#92400e":t.role==="Secretary"?"#166534":"#475569",padding:"3px 10px",borderRadius:6,fontSize:12,fontWeight:700},children:t.role})})]},i))})]})}),e.jsxs("div",{style:{marginTop:24,padding:20,background:"#f8fafc",borderRadius:12,border:"1px solid #e2e8f0"},children:[e.jsx("h4",{style:{color:U,fontWeight:800,marginBottom:12,fontSize:16},children:"Key Functions"}),e.jsx("ul",{style:{paddingLeft:20,margin:0},children:["Academic planning and curriculum discussions","Implementation of university and UGC guidelines","Student welfare and discipline matters","Organizing college events and programs","Grievance redressal of staff members","Annual academic calendar preparation"].map((t,i)=>e.jsx("li",{style:{color:"#475569",lineHeight:1.8,marginBottom:4},children:t},i))})]})]})}),e.jsx(ie,{delay:.2,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:36,boxShadow:"0 8px 30px rgba(0,0,0,0.07)"},children:[e.jsx("h2",{className:"section-heading",children:"Staff Council Meeting Reports"}),e.jsx("div",{className:"heading-underline"}),e.jsxs("p",{style:{color:"#64748b",fontSize:14,marginBottom:20,lineHeight:1.7},children:["🔒 ",e.jsx("strong",{children:"Admin Panel → Staff Council"})," tab se date-wise PDF reports yahan automatically dikhte hain."]}),e.jsx(zi,{collectionName:"staff_council",accentColor:"#1a3a7c",emptyText:"Abhi tak koi Staff Council Meeting report upload nahi ki gayi."})]})})]})]})}const ee=j==null?void 0:j.navy,Ae=j==null?void 0:j.gold;function ye({children:t,delay:i=0,y:n=20}){const a=o.useRef(null),[s,c]=o.useState(!1);return o.useEffect(()=>{const r=new IntersectionObserver(([f])=>{f.isIntersecting&&(c(!0),r.disconnect())},{threshold:.1});return a.current&&r.observe(a.current),()=>r.disconnect()},[]),e.jsx("div",{ref:a,style:{opacity:s?1:0,transform:s?"none":`translateY(${n}px)`,transition:`all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i}s`},children:t})}const jt=({title:t,subtitle:i,icon:n})=>e.jsx("div",{style:{background:ee,padding:"80px 20px 60px",textAlign:"center",color:"#fff"},children:e.jsxs(ye,{children:[e.jsx("div",{style:{fontSize:48,marginBottom:16},children:n}),e.jsx("h1",{style:{fontSize:"clamp(32px, 5vw, 48px)",fontWeight:900,margin:"0 0 16px",letterSpacing:"-0.5px"},children:t}),e.jsx("p",{style:{color:"#cbd5e1",fontSize:16,maxWidth:600,margin:"0 auto",lineHeight:1.6},children:i})]})});function wr(){const[t,i]=o.useState([]);return o.useEffect(()=>{const n=X(K(L,"pdfReports"),ne("createdAt","desc")),a=M(n,s=>{const c=s.docs.map(r=>R({id:r.id},r.data()));i(c.filter(r=>(r.title||"").toLowerCase().includes("aqar")||(r.targetPage||"").toLowerCase().includes("iqac")||(r.title||"").toLowerCase().includes("naac")))});return()=>a()},[]),e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(jt,{title:"Internal Quality Assurance Cell",subtitle:"Ensuring and enhancing the academic and administrative performance of the institution.",icon:"📈"}),e.jsxs("div",{style:{maxWidth:1200,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:24,marginBottom:60},children:[{i:"🎯",t:"Quality Benchmarks",d:"Developing parameters for various academic activities."},{i:"📊",t:"Feedback System",d:"Collecting and analyzing feedback from all stakeholders."},{i:"🛠️",t:"Workshops & FDPs",d:"Organizing quality-related seminars and training programs."}].map((n,a)=>e.jsx(ye,{delay:a*.1,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:32,height:"100%",border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(15,35,71,0.04)",transition:"transform 0.3s"},onMouseEnter:s=>s.currentTarget.style.transform="translateY(-5px)",onMouseLeave:s=>s.currentTarget.style.transform="none",children:[e.jsx("div",{style:{fontSize:36,marginBottom:16,background:"#f1f5f9",width:64,height:64,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:16},children:n.i}),e.jsx("h3",{style:{fontSize:20,fontWeight:800,color:ee,margin:"0 0 10px"},children:n.t}),e.jsx("p",{style:{color:"#64748b",fontSize:15,margin:0,lineHeight:1.6},children:n.d})]})},a))}),e.jsx(ye,{delay:.2,children:e.jsxs("div",{style:{background:"#fff",borderRadius:24,padding:40,border:"1px solid #e2e8f0"},children:[e.jsx("h2",{style:{fontSize:28,fontWeight:900,color:ee,margin:"0 0 24px"},children:"AQAR & Quality Reports"}),t.length===0?e.jsx("p",{style:{color:"#94a3b8"},children:"No reports uploaded yet. (Upload from Admin Panel → Documents)"}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:16},children:t.map(n=>e.jsxs("a",{href:n.link,target:"_blank",rel:"noreferrer",style:{display:"flex",alignItems:"center",gap:14,padding:16,border:"1.5px solid #e2e8f0",borderRadius:14,textDecoration:"none",color:ee,transition:"all 0.2s",background:"#f8fafc"},onMouseEnter:a=>{a.currentTarget.style.borderColor=Ae,a.currentTarget.style.background="#fff"},onMouseLeave:a=>{a.currentTarget.style.borderColor="#e2e8f0",a.currentTarget.style.background="#f8fafc"},children:[e.jsx("div",{style:{fontSize:28},children:"📄"}),e.jsx("div",{style:{flex:1,fontWeight:700,fontSize:14},children:n.title}),e.jsx("div",{style:{color:Ae,fontWeight:800},children:"↗"})]},n.id))})]})})]})]})}function kr(){const[t,i]=o.useState("BCA"),n={BCA:["BCA (Computer Application)"],BBA:["BBA (Business Administration)"],Commerce:["Accounting & Finance","Marketing","Human Resource"],Humanities:["Hindi","English"],"Social Science":["History","Political Science","Psychology","Economics"]};return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(jt,{title:"Courses Offered (NEP 2022)",subtitle:"Four Year Undergraduate Programme (FYUGP) with Multiple Entry & Exit Options.",icon:"🎓"}),e.jsxs("div",{style:{maxWidth:1100,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:[e.jsx(ye,{children:e.jsx("div",{style:{background:"#fff",borderRadius:20,padding:"30px 40px",display:"flex",flexWrap:"wrap",gap:30,justifyContent:"space-between",border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(15,35,71,0.05)",marginBottom:40},children:[{t:"1 Year",d:"UG Certificate"},{t:"2 Years",d:"UG Diploma"},{t:"3 Years",d:"Bachelor Degree"},{t:"4 Years",d:"Bachelor with Honours / Research"}].map((a,s)=>e.jsxs("div",{style:{textAlign:"center",flex:"1 1 150px"},children:[e.jsx("div",{style:{fontSize:24,fontWeight:900,color:Ae,marginBottom:4},children:a.t}),e.jsx("div",{style:{fontSize:14,color:ee,fontWeight:700},children:a.d})]},s))})}),e.jsxs(ye,{delay:.2,children:[e.jsx("div",{style:{display:"flex",gap:10,flexWrap:"wrap",marginBottom:24,justifyContent:"center"},children:Object.keys(n).map(a=>e.jsx("button",{onClick:()=>i(a),style:{padding:"12px 24px",border:"none",borderRadius:99,fontWeight:800,fontSize:14,cursor:"pointer",transition:"all 0.3s",background:t===a?ee:"#fff",color:t===a?"#fff":"#64748b",boxShadow:t===a?`0 8px 20px ${ee}40`:"0 2px 10px rgba(0,0,0,0.05)"},children:a},a))}),e.jsx("div",{style:{background:"#fff",borderRadius:24,padding:40,border:"1px solid #e2e8f0",display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))",gap:20},children:n[t].map((a,s)=>e.jsxs("div",{style:{background:"#f8fafc",padding:20,borderRadius:16,border:"1.5px solid #f1f5f9",display:"flex",alignItems:"center",gap:14},children:[e.jsx("div",{style:{background:`${Ae}20`,color:"#b45309",width:40,height:40,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900},children:s+1}),e.jsx("div",{style:{fontWeight:800,color:ee,fontSize:16},children:a})]},s))})]})]})]})}function Sr(){const[t,i]=o.useState([]),[n,a]=o.useState(""),[s,c]=o.useState("All");o.useEffect(()=>{const d=X(K(L,"pdfReports"),ne("createdAt","desc")),l=M(d,u=>{const g=u.docs.map(m=>R({id:m.id},m.data()));i(g.filter(m=>(m.type||"").toLowerCase()==="syllabus"))});return()=>l()},[]);const r=t.filter(d=>(s==="All"||(d.title||"").toLowerCase().includes(s.toLowerCase()))&&(d.title||"").toLowerCase().includes(n.toLowerCase())),f=["All","BCA","BBA","Commerce","Hindi","English","History","Political Science","Psychology","Economics"];return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(jt,{title:"Syllabus Database",subtitle:"Download official FYUGP and CBCS syllabi for all departments.",icon:"📚"}),e.jsxs("div",{style:{maxWidth:1e3,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:[e.jsx(ye,{children:e.jsxs("div",{style:{background:"#fff",padding:20,borderRadius:20,border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(15,35,71,0.05)",marginBottom:30},children:[e.jsx("input",{type:"text",placeholder:"🔍 Search subject or semester... (e.g., BCA Sem 1)",value:n,onChange:d=>a(d.target.value),style:{width:"100%",padding:"16px 20px",borderRadius:12,border:"1.5px solid #e2e8f0",fontSize:16,outline:"none",background:"#f8fafc",color:ee,fontWeight:600,boxSizing:"border-box"}}),e.jsx("div",{style:{display:"flex",gap:10,marginTop:16,flexWrap:"wrap"},children:f.map(d=>e.jsx("button",{onClick:()=>c(d),style:{padding:"8px 16px",borderRadius:8,border:"none",background:s===d?`${ee}15`:"transparent",color:s===d?ee:"#64748b",fontWeight:700,cursor:"pointer",transition:"all 0.2s"},children:d},d))})]})}),e.jsx(ye,{delay:.1,children:r.length===0?e.jsxs("div",{style:{textAlign:"center",padding:60,color:"#94a3b8",background:"#fff",borderRadius:20,border:"2px dashed #e2e8f0"},children:[e.jsx("div",{style:{fontSize:40,marginBottom:12},children:"📂"}),e.jsx("div",{style:{fontWeight:700,fontSize:16,color:ee},children:"No Syllabus Found"}),e.jsx("div",{style:{fontSize:14},children:"Try adjusting your search or upload from Admin Panel."})]}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:16},children:r.map(d=>e.jsxs("div",{style:{background:"#fff",borderRadius:16,padding:24,border:"1px solid #e2e8f0",display:"flex",flexDirection:"column",gap:16,transition:"transform 0.2s"},onMouseEnter:l=>l.currentTarget.style.transform="translateY(-3px)",onMouseLeave:l=>l.currentTarget.style.transform="none",children:[e.jsxs("div",{style:{display:"flex",gap:14,alignItems:"flex-start"},children:[e.jsx("div",{style:{fontSize:32},children:"📘"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:800,color:ee,fontSize:16,lineHeight:1.3},children:d.title}),e.jsx("div",{style:{fontSize:12,color:"#64748b",marginTop:4,fontWeight:600},children:"NEP 2022 Format"})]})]}),e.jsx("a",{href:d.link,target:"_blank",rel:"noreferrer",style:{display:"block",textAlign:"center",background:`linear-gradient(135deg, ${ee}, #1a3a7c)`,color:"#fff",padding:"10px",borderRadius:10,textDecoration:"none",fontWeight:800,fontSize:14},children:"📥 Download PDF"})]},d.id))})})]})]})}function Nr(){const t=[{month:"July - August",title:"Admissions & Orientation",desc:"Commencement of new academic session and induction for Semester 1."},{month:"September - October",title:"Internal Mid-Semester Exams",desc:"First assessment for all UG programs."},{month:"November",title:"Youth Fest & Sports Meet",desc:"Annual cultural and sports week."},{month:"December - January",title:"University End-Semester Exams",desc:"Final theory and practical examinations."},{month:"February - March",title:"Even Semester Commences",desc:"Classes resume for Semester 2, 4, and 6."}];return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(jt,{title:"Academic Calendar",subtitle:"Key dates, examination schedules, and holidays for the current session.",icon:"🗓️"}),e.jsx("div",{style:{maxWidth:900,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(ye,{children:e.jsxs("div",{style:{background:"#fff",padding:40,borderRadius:24,border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(15,35,71,0.05)"},children:[e.jsx("h2",{style:{fontSize:24,fontWeight:900,color:ee,marginBottom:30,borderBottom:`2px solid ${Ae}`,paddingBottom:10,display:"inline-block"},children:"Session Timeline"}),e.jsxs("div",{style:{position:"relative",paddingLeft:30},children:[e.jsx("div",{style:{position:"absolute",top:10,bottom:20,left:9,width:3,background:"#e2e8f0",borderRadius:3}}),t.map((i,n)=>e.jsxs("div",{style:{position:"relative",marginBottom:30},children:[e.jsx("div",{style:{position:"absolute",left:-26,top:4,width:12,height:12,borderRadius:"50%",background:Ae,border:"3px solid #fff",boxShadow:"0 0 0 2px #f4a023"}}),e.jsx("div",{style:{fontSize:13,fontWeight:900,color:Ae,textTransform:"uppercase",letterSpacing:1,marginBottom:4},children:i.month}),e.jsx("div",{style:{fontSize:18,fontWeight:800,color:ee,marginBottom:6},children:i.title}),e.jsx("div",{style:{fontSize:15,color:"#64748b",lineHeight:1.6},children:i.desc})]},n))]}),e.jsxs("div",{style:{marginTop:40,padding:20,background:"#fffbeb",borderRadius:16,border:"1px solid #fde68a",display:"flex",gap:16,alignItems:"center"},children:[e.jsx("div",{style:{fontSize:32},children:"⛱️"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:800,color:"#92400e",fontSize:16},children:"List of Holidays"}),e.jsx("div",{style:{fontSize:14,color:"#b45309",marginTop:4},children:"College strictly follows the holiday calendar issued by BBMKU University. Download the official PDF for exact dates."})]})]})]})})})]})}const _=j==null?void 0:j.navy,gt=j==null?void 0:j.gold;function Fe({children:t,delay:i=0,y:n=20}){const a=o.useRef(null),[s,c]=o.useState(!1);return o.useEffect(()=>{const r=new IntersectionObserver(([f])=>{f.isIntersecting&&(c(!0),r.disconnect())},{threshold:.1});return a.current&&r.observe(a.current),()=>r.disconnect()},[]),e.jsx("div",{ref:a,style:{opacity:s?1:0,transform:s?"none":`translateY(${n}px)`,transition:`all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i}s`},children:t})}const qe=({title:t,subtitle:i,icon:n})=>e.jsx("div",{style:{background:_,padding:"80px 20px 60px",textAlign:"center",color:"#fff"},children:e.jsxs(Fe,{children:[e.jsx("div",{style:{fontSize:48,marginBottom:16},children:n}),e.jsx("h1",{style:{fontSize:"clamp(32px, 5vw, 48px)",fontWeight:900,margin:"0 0 16px",letterSpacing:"-0.5px"},children:t}),e.jsx("p",{style:{color:"#cbd5e1",fontSize:16,maxWidth:600,margin:"0 auto",lineHeight:1.6},children:i})]})});function zr(){const t=[{title:"Apply via Chancellor Portal",desc:"Desirous students must apply through the Chancellor Portal (https://jharkhanduniversities.nic.in/) under NEP-2020.",fee:"Application Fee: Rs. 100/-"},{title:"Merit List & Verification",desc:"Selected students must visit respective campuses (Main/Bhuda/Bank More) with original documents for physical verification.",fee:"Check Document Required Page"},{title:"University Registration",desc:"After verification, pay the BBMKU Registration Fee on Chancellor Portal again.",fee:"JAC Board: Rs. 308/- | Others: Rs. 758/-"},{title:"College Online Admission Form",desc:"Register on www.gncollege.org or enrollonline.co.in. Upload Chancellor Portal fee receipt and marksheet.",fee:"Wait for approval message"},{title:"Final Fee Payment",desc:"After approval, pay the college fee via Student Diary Cloud App or CIMS portal using Card/UPI/NetBanking.",fee:"Online Payment Only"}];return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(qe,{title:"Admission Procedure",subtitle:"Complete step-by-step guide for UG and Vocational admission under NEP 2020.",icon:"📝"}),e.jsx("div",{style:{maxWidth:900,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(Fe,{children:e.jsxs("div",{style:{background:"#fff",padding:40,borderRadius:24,border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(15,35,71,0.05)"},children:[e.jsxs("div",{style:{background:"#fef2f2",borderLeft:"4px solid #ef4444",padding:16,borderRadius:"0 12px 12px 0",marginBottom:30},children:[e.jsx("strong",{style:{color:"#b91c1c"},children:"Important Rule:"})," ",e.jsx("span",{style:{color:"#ef4444"},children:"Students attending less than 75% classes will not be eligible to fill up university examination forms. Violation of discipline may lead to removal."})]}),e.jsxs("div",{style:{position:"relative",paddingLeft:24},children:[e.jsx("div",{style:{position:"absolute",top:10,bottom:20,left:9,width:3,background:"#e2e8f0",borderRadius:3}}),t.map((i,n)=>e.jsxs("div",{style:{position:"relative",marginBottom:30},children:[e.jsx("div",{style:{position:"absolute",left:-24,top:4,width:18,height:18,borderRadius:"50%",background:_,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,border:"3px solid #fff",boxShadow:`0 0 0 2px ${_}`},children:n+1}),e.jsx("div",{style:{fontSize:18,fontWeight:800,color:_,marginBottom:6},children:i.title}),e.jsx("div",{style:{fontSize:15,color:"#64748b",lineHeight:1.6,marginBottom:6},children:i.desc}),e.jsx("div",{style:{display:"inline-block",background:`${gt}15`,color:"#b45309",padding:"4px 10px",borderRadius:6,fontSize:12,fontWeight:700},children:i.fee})]},n))]})]})})})]})}function Cr(){const t=[{t:"Chancellor Portal Form",d:"Printed copy of the submitted application form.",type:"Print"},{t:"Application Fee Receipt",d:"Proof of Rs. 100/- payment on Chancellor Portal.",type:"Print"},{t:"Original CLC/TC",d:"Original copy will be kept by the college (keep photocopies for yourself).",type:"Original"},{t:"Qualifying Marksheet",d:"Self-attested photocopy of previous exam.",type:"Photocopy"},{t:"Admit Card",d:"Self-attested photocopy of qualifying exam admit card.",type:"Photocopy"},{t:"Migration Certificate",d:"Original or Downloaded from Digilocker (Required for non-JAC board).",type:"Original"},{t:"Caste Certificate",d:"If applicable for reservation claims.",type:"Photocopy"}];return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(qe,{title:"Documents Required",subtitle:"Bring these documents during physical verification at the campus.",icon:"📂"}),e.jsx("div",{style:{maxWidth:1e3,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(Fe,{children:e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:16},children:t.map((i,n)=>e.jsxs("div",{style:{background:"#fff",borderRadius:16,padding:24,border:"1px solid #e2e8f0",display:"flex",gap:16,boxShadow:"0 4px 15px rgba(15,35,71,0.03)"},children:[e.jsx("div",{style:{fontSize:32},children:i.type==="Original"?"📜":i.type==="Print"?"s🖨️":"📄"}),e.jsxs("div",{children:[e.jsx("div",{style:{display:"inline-block",fontSize:11,fontWeight:800,padding:"2px 8px",borderRadius:4,background:i.type==="Original"?"#fee2e2":"#f1f5f9",color:i.type==="Original"?"#ef4444":"#64748b",marginBottom:6},children:i.type.toUpperCase()}),e.jsx("div",{style:{fontWeight:800,color:_,fontSize:16,marginBottom:4},children:i.t}),e.jsx("div",{style:{fontSize:13,color:"#64748b",lineHeight:1.5},children:i.d})]})]},n))})})})]})}function Ar(){const[t,i]=o.useState("UG"),n=[{head:"Tuition Fee",b1:"120",b2:"120",g1:"0",g2:"0"},{head:"Admission fee",b1:"20",b2:"0",g1:"20",g2:"0"},{head:"Electric Charge",b1:"30",b2:"30",g1:"30",g2:"30"},{head:"Library Fee",b1:"50",b2:"0",g1:"50",g2:"0"},{head:"NSS",b1:"20",b2:"20",g1:"20",g2:"20"},{head:"Students Union",b1:"20",b2:"0",g1:"20",g2:"0"},{head:"Students Fund",b1:"80",b2:"80",g1:"80",g2:"80"},{head:"Annual Charge",b1:"191",b2:"0",g1:"191",g2:"0"},{head:"College Fund",b1:"1650",b2:"1650",g1:"1650",g2:"1650"},{head:"Internal Exam Fee",b1:"50",b2:"50",g1:"50",g2:"50"},{head:"Development Fund",b1:"500",b2:"500",g1:"500",g2:"500"},{head:"Practical fee (Vocational Paper)",b1:"150",b2:"150",g1:"150",g2:"150"},{head:"ERP & Mobile App Charge",b1:"165",b2:"0",g1:"165",g2:"0"},{head:"Hand Book Charge",b1:"100",b2:"0",g1:"100",g2:"0"}];return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(qe,{title:"Fee Structure",subtitle:"Detailed semester-wise fee breakdown for 4-Year FYUGP (8 Semesters), BCA, and BBA.",icon:"💳"}),e.jsx("div",{style:{maxWidth:1100,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsxs(Fe,{children:[e.jsx("div",{style:{display:"flex",gap:10,justifyContent:"center",marginBottom:24,flexWrap:"wrap"},children:["UG","BCA","BBA"].map(a=>e.jsx("button",{onClick:()=>i(a),style:{padding:"12px 30px",borderRadius:99,border:"none",background:t===a?_:"#fff",color:t===a?"#fff":"#64748b",fontWeight:800,fontSize:15,cursor:"pointer",boxShadow:t===a?`0 8px 20px ${_}40`:"0 2px 10px rgba(0,0,0,0.05)",transition:"0.3s"},children:a==="UG"?"UG Regular (8 Semesters)":`${a} (Vocational)`},a))}),e.jsxs("div",{style:{background:"#fff",borderRadius:24,padding:"30px 40px",border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(15,35,71,0.05)",overflowX:"auto"},children:[t==="UG"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{background:"#eff6ff",borderLeft:"4px solid #3b82f6",padding:"12px 16px",borderRadius:"0 8px 8px 0",marginBottom:20,fontSize:13,color:"#1e3a8a",fontWeight:600},children:"Note: Under NEP 2020 (FYUGP), the undergraduate course is spread over 8 semesters. The fee pattern generally repeats for Odd (1, 3, 5, 7) and Even (2, 4, 6, 8) semesters."}),e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",minWidth:800},children:[e.jsx("thead",{children:e.jsxs("tr",{style:{background:_,color:"#fff",textAlign:"left"},children:[e.jsx("th",{style:{padding:16,borderRadius:"12px 0 0 0"},children:"Fee Head"}),e.jsxs("th",{style:{padding:16},children:["Boys",e.jsx("br",{}),e.jsx("span",{style:{fontSize:11,color:"#cbd5e1"},children:"Odd Sem (1,3,5,7)"})]}),e.jsxs("th",{style:{padding:16},children:["Boys",e.jsx("br",{}),e.jsx("span",{style:{fontSize:11,color:"#cbd5e1"},children:"Even Sem (2,4,6,8)"})]}),e.jsxs("th",{style:{padding:16},children:["Girls",e.jsx("br",{}),e.jsx("span",{style:{fontSize:11,color:"#cbd5e1"},children:"Odd Sem (1,3,5,7)"})]}),e.jsxs("th",{style:{padding:16,borderRadius:"0 12px 0 0"},children:["Girls",e.jsx("br",{}),e.jsx("span",{style:{fontSize:11,color:"#cbd5e1"},children:"Even Sem (2,4,6,8)"})]})]})}),e.jsxs("tbody",{children:[n.map((a,s)=>e.jsxs("tr",{style:{borderBottom:"1px solid #f1f5f9"},children:[e.jsx("td",{style:{padding:12,paddingLeft:16,fontWeight:700,color:_,fontSize:14},children:a.head}),e.jsxs("td",{style:{padding:12,paddingLeft:16,color:"#64748b",fontSize:14},children:["₹",a.b1]}),e.jsxs("td",{style:{padding:12,paddingLeft:16,color:"#64748b",fontSize:14},children:["₹",a.b2]}),e.jsxs("td",{style:{padding:12,paddingLeft:16,color:"#64748b",fontSize:14},children:["₹",a.g1]}),e.jsxs("td",{style:{padding:12,paddingLeft:16,color:"#64748b",fontSize:14},children:["₹",a.g2]})]},s)),e.jsxs("tr",{style:{background:`${gt}15`,fontWeight:900,color:_},children:[e.jsx("td",{style:{padding:16},children:"Grand Total"}),e.jsx("td",{style:{padding:16},children:"₹3146"}),e.jsx("td",{style:{padding:16},children:"₹2600"}),e.jsx("td",{style:{padding:16},children:"₹3026"}),e.jsx("td",{style:{padding:16},children:"₹2480"})]})]})]})]}),(t==="BCA"||t==="BBA")&&e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",minWidth:500},children:[e.jsx("thead",{children:e.jsxs("tr",{style:{background:_,color:"#fff",textAlign:"left"},children:[e.jsx("th",{style:{padding:16,borderRadius:"12px 0 0 0"},children:"Particulars"}),e.jsx("th",{style:{padding:16},children:"Odd Semesters (1,3,5)"}),e.jsx("th",{style:{padding:16,borderRadius:"0 12px 0 0"},children:"Even Semesters (2,4,6)"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{style:{borderBottom:"1px solid #f1f5f9"},children:[e.jsx("td",{style:{padding:16,fontWeight:700,color:_},children:"Course Fee"}),e.jsxs("td",{style:{padding:16,color:"#64748b"},children:["₹",t==="BCA"?"15,000":"13,000"]}),e.jsxs("td",{style:{padding:16,color:"#64748b"},children:["₹",t==="BCA"?"15,000":"13,000"]})]}),e.jsxs("tr",{style:{borderBottom:"1px solid #f1f5f9"},children:[e.jsx("td",{style:{padding:16,fontWeight:700,color:_},children:"Development & ERP Fee"}),e.jsxs("td",{style:{padding:16,color:"#64748b"},children:["₹","916"]}),e.jsxs("td",{style:{padding:16,color:"#64748b"},children:["₹","165"]})]}),e.jsxs("tr",{style:{background:`${gt}15`,fontWeight:900,color:_},children:[e.jsx("td",{style:{padding:16},children:"Grand Total"}),e.jsxs("td",{style:{padding:16},children:["₹",t==="BCA"?"15,916":"13,916"]}),e.jsxs("td",{style:{padding:16},children:["₹",t==="BCA"?"15,165":"13,165"]})]})]})]})]})]})})]})}function ci(){const[t,i]=o.useState([]);return o.useEffect(()=>{const n=X(K(L,"notices"),ne("createdAt","desc")),a=M(n,s=>{const c=s.docs.map(r=>R({id:r.id},r.data()));i(c.filter(r=>r.type==="Admission"))});return()=>a()},[]),e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(qe,{title:"Admission Notifications",subtitle:"Latest updates, merit lists, and announcements regarding admissions.",icon:"📢"}),e.jsx("div",{style:{maxWidth:900,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(Fe,{children:t.length===0?e.jsxs("div",{style:{textAlign:"center",padding:60,background:"#fff",borderRadius:20,border:"2px dashed #e2e8f0"},children:[e.jsx("div",{style:{fontSize:40,marginBottom:12},children:"📭"}),e.jsx("div",{style:{fontWeight:700,fontSize:16,color:_},children:"No Admission Notices"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16},children:t.map((n,a)=>e.jsxs("div",{style:{background:"#fff",padding:24,borderRadius:16,borderLeft:`4px solid ${n.isNew?"#ef4444":_}`,boxShadow:"0 4px 15px rgba(15,35,71,0.03)",display:"flex",justifyContent:"space-between",alignItems:"center",gap:20},children:[e.jsxs("div",{children:[n.isNew&&e.jsx("span",{style:{display:"inline-block",background:"#fee2e2",color:"#ef4444",fontSize:10,fontWeight:900,padding:"2px 8px",borderRadius:4,marginBottom:8,animation:"pulse 2s infinite"},children:"🔴 NEW UPDATE"}),e.jsx("div",{style:{fontWeight:700,fontSize:16,color:_,lineHeight:1.5},dangerouslySetInnerHTML:{__html:ut.sanitize(n.text)}}),e.jsxs("div",{style:{fontSize:12,color:"#94a3b8",marginTop:8},children:["🗓️ ",new Date(n.date).toLocaleDateString()]})]}),n.link&&e.jsx("a",{href:n.link,target:"_blank",rel:"noreferrer",style:{background:`${_}15`,color:_,padding:"10px 20px",borderRadius:10,textDecoration:"none",fontWeight:800,fontSize:13,whiteSpace:"nowrap"},children:"View Details ↗"})]},n.id))})})})]})}function Rr(){const t=[{title:"Commerce",seats:550,icon:"📈",color:gt,sub:"B.Com Honours"},{title:"Arts (History & Pol. Sc)",seats:312,icon:"🏛️",color:_,sub:"156 Seats Each"},{title:"Arts (Eng, Eco, Psy, Hin)",seats:512,icon:"📚",color:"#0ea5e9",sub:"128 Seats Each"},{title:"BCA",seats:90,icon:"💻",color:"#ef4444",sub:"Vocational Course"},{title:"BBA",seats:90,icon:"💼",color:"#10b981",sub:"Vocational Course"}];return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(qe,{title:"Intake Capacity",subtitle:"Subject-wise maximum seat availability for the current academic session.",icon:"🪑"}),e.jsx("div",{style:{maxWidth:1e3,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(Fe,{children:e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:20},children:t.map((i,n)=>e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:30,border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(15,35,71,0.04)",display:"flex",alignItems:"center",gap:20},children:[e.jsx("div",{style:{width:64,height:64,borderRadius:16,background:`${i.color}15`,color:i.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32},children:i.icon}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:13,color:"#64748b",fontWeight:700,textTransform:"uppercase",letterSpacing:1},children:i.title}),e.jsx("div",{style:{fontSize:36,fontWeight:900,color:_,lineHeight:1},children:i.seats}),e.jsx("div",{style:{fontSize:12,color:i.color,fontWeight:800,marginTop:4},children:i.sub})]})]},n))})})})]})}const _t=j==null?void 0:j.navy,pi=j==null?void 0:j.gold;function Ut({children:t,delay:i=0,y:n=20}){const a=o.useRef(null),[s,c]=o.useState(!1);return o.useEffect(()=>{const r=new IntersectionObserver(([f])=>{f.isIntersecting&&(c(!0),r.disconnect())},{threshold:.1});return a.current&&r.observe(a.current),()=>r.disconnect()},[]),e.jsx("div",{ref:a,style:{opacity:s?1:0,transform:s?"none":`translateY(${n}px)`,transition:`all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i}s`},children:t})}const vt=({title:t,subtitle:i,icon:n})=>e.jsx("div",{style:{background:_t,padding:"80px 20px 60px",textAlign:"center",color:"#fff"},children:e.jsxs(Ut,{children:[e.jsx("div",{style:{fontSize:48,marginBottom:16},children:n}),e.jsx("h1",{style:{fontSize:"clamp(32px, 5vw, 48px)",fontWeight:900,margin:"0 0 16px",letterSpacing:"-0.5px"},children:t}),e.jsx("p",{style:{color:"#cbd5e1",fontSize:16,maxWidth:700,margin:"0 auto",lineHeight:1.6},children:i})]})});function wt({categoryKey:t,emptyMsg:i="Documents will be available soon."}){const[n,a]=o.useState([]),[s,c]=o.useState(!0);return o.useEffect(()=>{const r=X(K(L,"pdfReports"),ne("createdAt","desc")),f=M(r,d=>{const l=d.docs.map(u=>R({id:u.id},u.data()));a(l.filter(u=>(u.targetPage||"").toLowerCase()===t.toLowerCase()||(u.targetPage||"").toLowerCase().includes(t.toLowerCase())||(u.title||"").toLowerCase().includes(t.toLowerCase()))),c(!1)});return()=>f()},[t]),s?e.jsx("div",{style:{textAlign:"center",padding:40,color:"#94a3b8"},children:"Loading Documents..."}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:20},children:n.length===0?e.jsx("div",{style:{gridColumn:"1/-1",textAlign:"center",padding:60,background:"#fff",borderRadius:20,border:"2px dashed #e2e8f0",color:"#94a3b8"},children:i}):n.map((r,f)=>e.jsx(Ut,{delay:f*.05,children:e.jsxs("a",{href:r.link,target:"_blank",rel:"noreferrer",style:{display:"flex",alignItems:"center",gap:16,padding:20,background:"#fff",borderRadius:16,border:"1px solid #e2e8f0",textDecoration:"none",transition:"0.2s",boxShadow:"0 4px 12px rgba(0,0,0,0.02)"},onMouseEnter:d=>{d.currentTarget.style.borderColor=pi,d.currentTarget.style.transform="translateY(-3px)"},onMouseLeave:d=>{d.currentTarget.style.borderColor="#e2e8f0",d.currentTarget.style.transform="none"},children:[e.jsx("div",{style:{fontSize:32},children:"📄"}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontWeight:800,color:_t,fontSize:15,lineHeight:1.3},children:r.title}),e.jsx("div",{style:{fontSize:12,color:pi,fontWeight:700,marginTop:4,textTransform:"uppercase"},children:"Download PDF ↗"})]})]})},r.id))})}function rt({cycle:t=1}){const i=`SSR ${t}${t===1?"st":"nd"} Cycle`,n=t===1?"🥇":"🥈";return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(vt,{title:i,subtitle:`Complete Self Study Report and Peer Team documents for NAAC Accreditation Cycle ${t}.`,icon:n}),e.jsx("div",{style:{maxWidth:1100,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(wt,{categoryKey:`cycle-${t}`,emptyMsg:`SSR Cycle ${t} documents are being processed.`})})]})}function Wr(){return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(vt,{title:"AQAR Reports",subtitle:"Annual Quality Assurance Reports submitted to NAAC by the IQAC cell of the college.",icon:"📊"}),e.jsx("div",{style:{maxWidth:1100,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(wt,{categoryKey:"aqar",emptyMsg:"Annual Quality Assurance Reports will appear here."})})]})}function Er(){return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(vt,{title:"NIRF Rankings",subtitle:"Data submitted for the National Institutional Ranking Framework (Ministry of Education).",icon:"🏛️"}),e.jsx("div",{style:{maxWidth:1100,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(wt,{categoryKey:"nirf",emptyMsg:"NIRF participation data and reports will be updated here."})})]})}function Ir(){return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(vt,{title:"Perspective Plan",subtitle:"The strategic roadmap and future vision of Guru Nanak College for academic and infrastructure growth.",icon:"🗺️"}),e.jsx("div",{style:{maxWidth:900,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(Ut,{children:e.jsxs("div",{style:{background:"#fff",borderRadius:24,padding:40,border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(15,35,71,0.05)"},children:[e.jsx("h2",{style:{fontSize:24,fontWeight:900,color:_t,marginBottom:20},children:"Strategic Vision"}),e.jsx("p",{style:{color:"#64748b",lineHeight:1.8,fontSize:16,marginBottom:30},children:"Our Perspective Plan outlines the long-term goals including digital transformation, introduction of new vocational courses, and achieving excellence in NAAC 3rd cycle."}),e.jsx(wt,{categoryKey:"perspective"})]})})})]})}const Ue=j==null?void 0:j.navy,Br=j==null?void 0:j.gold;function ht({children:t,delay:i=0,y:n=20}){const a=o.useRef(null),[s,c]=o.useState(!1);return o.useEffect(()=>{const r=new IntersectionObserver(([f])=>{f.isIntersecting&&(c(!0),r.disconnect())},{threshold:.1});return a.current&&r.observe(a.current),()=>r.disconnect()},[]),e.jsx("div",{ref:a,style:{opacity:s?1:0,transform:s?"none":`translateY(${n}px)`,transition:`all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i}s`},children:t})}const Ci=({title:t,subtitle:i,icon:n})=>e.jsx("div",{style:{background:Ue,padding:"80px 20px 60px",textAlign:"center",color:"#fff"},children:e.jsxs(ht,{children:[e.jsx("div",{style:{fontSize:48,marginBottom:16},children:n}),e.jsx("h1",{style:{fontSize:"clamp(32px, 5vw, 48px)",fontWeight:900,margin:"0 0 16px",letterSpacing:"-0.5px"},children:t}),e.jsx("p",{style:{color:"#cbd5e1",fontSize:16,maxWidth:600,margin:"0 auto",lineHeight:1.6},children:i})]})});function Tr({keyword:t}){const[i,n]=o.useState([]);return o.useEffect(()=>{const a=X(K(L,"pdfReports"),ne("createdAt","desc")),s=M(a,c=>{const r=c.docs.map(f=>R({id:f.id},f.data()));n(r.filter(f=>(f.targetPage||"").toLowerCase()===t.toLowerCase()||(f.title||"").toLowerCase().includes(t.toLowerCase())))});return()=>s()},[t]),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:16},children:i.length===0?e.jsx("div",{style:{gridColumn:"1/-1",textAlign:"center",padding:40,color:"#94a3b8",border:"2px dashed #e2e8f0",borderRadius:20},children:"No documents found in this category."}):i.map((a,s)=>e.jsx(ht,{delay:s*.05,children:e.jsxs("a",{href:a.link,target:"_blank",rel:"noreferrer",style:{display:"flex",alignItems:"center",gap:14,padding:20,background:"#fff",borderRadius:16,border:"1.5px solid #e2e8f0",textDecoration:"none",color:Ue},children:[e.jsx("div",{style:{fontSize:24},children:"📄"}),e.jsx("div",{style:{flex:1,fontWeight:700,fontSize:14},children:a.title}),e.jsx("div",{style:{color:Br,fontWeight:800},children:"↗"})]})},a.id))})}function $r(){const t=[{label:"Books",val:"50,000+",icon:"📚"},{label:"Journals",val:"25+",icon:"📰"},{label:"Digital Access",val:"N-LIST",icon:"💻"},{label:"Reading Hall",val:"200 Seating",icon:"🪑"}];return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(Ci,{title:"College Library",subtitle:"A hub of knowledge equipped with vast resources for research and learning.",icon:"📖"}),e.jsxs("div",{style:{maxWidth:1100,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:20,marginBottom:40},children:t.map((i,n)=>e.jsx(ht,{delay:n*.1,children:e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:30,textAlign:"center",border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(15,35,71,0.05)"},children:[e.jsx("div",{style:{fontSize:36,marginBottom:12},children:i.icon}),e.jsx("div",{style:{fontSize:24,fontWeight:900,color:Ue,marginBottom:4},children:i.val}),e.jsx("div",{style:{fontSize:13,color:"#64748b",fontWeight:700,textTransform:"uppercase"},children:i.label})]})},n))}),e.jsx(ht,{delay:.3,children:e.jsxs("div",{style:{background:"#fff",borderRadius:24,padding:40,border:"1px solid #e2e8f0"},children:[e.jsx("h2",{style:{fontSize:24,fontWeight:800,color:Ue,marginBottom:20},children:"Library Services"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:20},children:["Online Public Access Catalog (OPAC)","Inter-Library Loan Facility","Reprographic Services","Digital Library Section"].map((i,n)=>e.jsxs("div",{style:{padding:16,background:"#f8fafc",borderRadius:12,fontWeight:600,color:Ue,border:"1px solid #f1f5f9"},children:["✓ ",i]},n))})]})})]})]})}function Ge({type:t,title:i,subtitle:n,icon:a,keyword:s}){return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(Ci,{title:i,subtitle:n,icon:a}),e.jsx("div",{style:{maxWidth:1e3,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(Tr,{keyword:s})})]})}const se=j==null?void 0:j.navy,Ot=j==null?void 0:j.gold;function je({children:t,delay:i=0,y:n=20}){const a=o.useRef(null),[s,c]=o.useState(!1);return o.useEffect(()=>{const r=new IntersectionObserver(([f])=>{f.isIntersecting&&(c(!0),r.disconnect())},{threshold:.1});return a.current&&r.observe(a.current),()=>r.disconnect()},[]),e.jsx("div",{ref:a,style:{opacity:s?1:0,transform:s?"none":`translateY(${n}px)`,transition:`all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i}s`},children:t})}const Pe=({title:t,subtitle:i,icon:n,theme:a=se})=>e.jsx("div",{style:{background:a,padding:"80px 20px 60px",textAlign:"center",color:"#fff"},children:e.jsxs(je,{children:[e.jsx("div",{style:{fontSize:48,marginBottom:16},children:n}),e.jsx("h1",{style:{fontSize:"clamp(32px, 5vw, 48px)",fontWeight:900,margin:"0 0 16px",letterSpacing:"-0.5px"},children:t}),e.jsx("p",{style:{color:"rgba(255,255,255,0.8)",fontSize:16,maxWidth:600,margin:"0 auto",lineHeight:1.6},children:i})]})});function Dr(){const t=[{num:"500+",label:"Active Volunteers",icon:"🙋‍♂️"},{num:"50+",label:"Blood Units Donated",icon:"🩸"},{num:"20+",label:"Adopted Villages",icon:"🏡"},{num:"1000+",label:"Trees Planted",icon:"🌳"}];return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(Pe,{title:"National Service Scheme (NSS)",subtitle:'Motto: "Not Me But You". Developing student personality through community service.',icon:"🤝"}),e.jsxs("div",{style:{maxWidth:1100,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:[e.jsx(je,{children:e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:20,marginBottom:40},children:t.map((i,n)=>e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:30,textAlign:"center",border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(15,35,71,0.05)"},children:[e.jsx("div",{style:{fontSize:40,marginBottom:16},children:i.icon}),e.jsx("div",{style:{fontSize:32,fontWeight:900,color:se,marginBottom:4},children:i.num}),e.jsx("div",{style:{fontSize:14,color:"#64748b",fontWeight:700,textTransform:"uppercase"},children:i.label})]},n))})}),e.jsx(je,{delay:.2,children:e.jsxs("div",{style:{background:"#fff",borderRadius:24,padding:40,border:"1px solid #e2e8f0"},children:[e.jsx("h2",{style:{fontSize:24,fontWeight:800,color:se,marginBottom:24},children:"Major Activities"}),e.jsx("ul",{style:{listStyle:"none",padding:0,margin:0,display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:16},children:["Swachh Bharat Abhiyan","Blood Donation Camps","Traffic Awareness Drives","Disaster Relief & Rescue","National Integration Camps"].map((i,n)=>e.jsxs("li",{style:{display:"flex",alignItems:"center",gap:12,padding:"16px",background:"#f8fafc",borderRadius:12,border:"1px solid #f1f5f9"},children:[e.jsx("span",{style:{background:`${Ot}20`,color:"#b45309",padding:8,borderRadius:8,fontSize:18},children:"⭐"}),e.jsx("span",{style:{fontWeight:700,color:se},children:i})]},n))})]})})]})]})}function Fr(){return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(Pe,{title:"National Cadet Corps (NCC)",subtitle:'Motto: "Unity and Discipline". Shaping the youth into patriotic and disciplined citizens.',icon:"🎖️",theme:"#1e3a8a"}),e.jsx("div",{style:{maxWidth:1e3,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(je,{children:e.jsxs("div",{style:{background:"#fff",borderRadius:24,overflow:"hidden",border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(15,35,71,0.05)",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))"},children:[e.jsx("img",{src:"https://images.unsplash.com/photo-1595844730298-b960fad9722a?auto=format&fit=crop&q=80",alt:"NCC Parade",style:{width:"100%",height:"100%",objectFit:"cover",minHeight:300}}),e.jsxs("div",{style:{padding:40},children:[e.jsx("div",{style:{display:"inline-block",background:"#dbeafe",color:"#1d4ed8",padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:800,letterSpacing:1,marginBottom:16},children:"GNC NCC WING"}),e.jsx("h2",{style:{fontSize:28,fontWeight:900,color:se,marginBottom:16},children:"Building Future Leaders"}),e.jsx("p",{style:{color:"#64748b",lineHeight:1.7,marginBottom:24},children:"The NCC unit of Guru Nanak College actively participates in Republic Day Camps (RDC), Combined Annual Training Camps (CATC), and Trekking expeditions. Cadets are trained in drill, map reading, and weapon handling."}),e.jsxs("div",{style:{display:"flex",gap:16},children:[e.jsx("div",{style:{background:"#f8fafc",padding:"10px 20px",borderRadius:12,border:"1px solid #e2e8f0",fontWeight:700,color:se},children:"B-Certificate"}),e.jsx("div",{style:{background:"#f8fafc",padding:"10px 20px",borderRadius:12,border:"1px solid #e2e8f0",fontWeight:700,color:se},children:"C-Certificate"})]})]})]})})})]})}function Pr(){const t=[{title:"Intellectual Property Rights (IPR)",dept:"IQAC Cell",date:"October 2023"},{title:"New Education Policy (NEP 2020) Seminar",dept:"Education Dept",date:"August 2023"},{title:"Cyber Security & Ethical Hacking",dept:"BCA Department",date:"July 2023"},{title:"Financial Literacy for Youth",dept:"Commerce Dept",date:"May 2023"}];return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(Pe,{title:"Workshops & Seminars",subtitle:"Bridging the gap between academia and industry through expert sessions.",icon:"🎤"}),e.jsx("div",{style:{maxWidth:1e3,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(je,{children:e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(350px, 1fr))",gap:20},children:t.map((i,n)=>e.jsxs("div",{style:{background:"#fff",borderRadius:20,padding:30,border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(15,35,71,0.03)",transition:"transform 0.3s"},onMouseEnter:a=>a.currentTarget.style.transform="translateY(-5px)",onMouseLeave:a=>a.currentTarget.style.transform="none",children:[e.jsx("div",{style:{fontSize:12,fontWeight:800,color:Ot,textTransform:"uppercase",letterSpacing:1,marginBottom:8},children:i.date}),e.jsx("h3",{style:{fontSize:20,fontWeight:800,color:se,margin:"0 0 12px",lineHeight:1.4},children:i.title}),e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:"#f1f5f9",color:"#64748b",padding:"6px 12px",borderRadius:8,fontSize:13,fontWeight:700},children:[e.jsx("span",{children:"🏢"})," Organized by ",i.dept]})]},n))})})})]})}function Mr(){return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(Pe,{title:"Games & Sports",subtitle:"Promoting physical fitness, teamwork, and sportsmanship among students.",icon:"🏆"}),e.jsx("div",{style:{maxWidth:1e3,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(je,{children:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:24},children:[e.jsxs("div",{style:{background:"#fff",borderRadius:24,padding:40,border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(15,35,71,0.05)"},children:[e.jsx("div",{style:{fontSize:40,marginBottom:16},children:"🏏"}),e.jsx("h2",{style:{fontSize:24,fontWeight:900,color:se,marginBottom:16},children:"Outdoor Sports"}),e.jsx("p",{style:{color:"#64748b",marginBottom:20,lineHeight:1.6},children:"Our campus features a vast playground suitable for major athletic events and team sports."}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:10},children:["Cricket","Football","Volleyball","Athletics"].map(t=>e.jsx("span",{style:{background:`${se}10`,color:se,padding:"6px 14px",borderRadius:20,fontSize:13,fontWeight:700},children:t},t))})]}),e.jsxs("div",{style:{background:"#fff",borderRadius:24,padding:40,border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(15,35,71,0.05)"},children:[e.jsx("div",{style:{fontSize:40,marginBottom:16},children:"🏓"}),e.jsx("h2",{style:{fontSize:24,fontWeight:900,color:se,marginBottom:16},children:"Indoor Games"}),e.jsx("p",{style:{color:"#64748b",marginBottom:20,lineHeight:1.6},children:"Dedicated indoor facilities for mind games and fast-paced table sports."}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:10},children:["Table Tennis","Chess","Carrom","Badminton"].map(t=>e.jsx("span",{style:{background:`${Ot}20`,color:"#b45309",padding:"6px 14px",borderRadius:20,fontSize:13,fontWeight:700},children:t},t))})]})]})})})]})}function Lr(){return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(Pe,{title:"Rotaract Club",subtitle:'Motto: "Fellowship Through Service". A global movement of young leaders.',icon:"⚙️",theme:"#d91b5c"}),e.jsx("div",{style:{maxWidth:900,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(je,{children:e.jsxs("div",{style:{background:"#fff",borderRadius:24,padding:40,border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(217,27,92,0.08)",textAlign:"center"},children:[e.jsx("h2",{style:{fontSize:28,fontWeight:900,color:"#d91b5c",marginBottom:20},children:"Empowering Youth"}),e.jsx("p",{style:{color:"#64748b",fontSize:16,lineHeight:1.8,marginBottom:30},children:"The Rotaract Club of Guru Nanak College operates under the guidance of Rotary International. It provides an opportunity for young men and women to enhance the knowledge and skills that will assist them in personal development, to address the physical and social needs of their communities."}),e.jsx("div",{style:{display:"flex",justifyContent:"center",gap:20,flexWrap:"wrap"},children:["Leadership Development","Community Service","Professional Networking"].map((t,i)=>e.jsx("div",{style:{background:"#fdf2f8",color:"#be185d",padding:"10px 20px",borderRadius:12,fontWeight:800,fontSize:14},children:t},i))})]})})})]})}function Hr(){return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx(Pe,{title:"Sadbhavana Diwas",subtitle:"Promoting National Integration, Peace, and Communal Harmony.",icon:"🕊️",theme:"#059669"}),e.jsx("div",{style:{maxWidth:900,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(je,{children:e.jsxs("div",{style:{background:"#fff",borderRadius:24,padding:40,border:"1px solid #e2e8f0",boxShadow:"0 10px 30px rgba(5,150,105,0.08)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:20,marginBottom:24,flexWrap:"wrap"},children:[e.jsx("div",{style:{fontSize:48},children:"🕯️"}),e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:24,fontWeight:900,color:se,margin:"0 0 8px"},children:"Harmony & Peace Pledge"}),e.jsx("div",{style:{color:"#059669",fontWeight:700},children:"Observed Annually on 20th August"})]})]}),e.jsx("p",{style:{color:"#64748b",fontSize:16,lineHeight:1.8,fontStyle:"italic",background:"#ecfdf5",padding:24,borderRadius:16,borderLeft:"4px solid #10b981"},children:'"I take this solemn pledge that I will work for the emotional oneness and harmony of all the people of India regardless of caste, region, religion, or language. I further pledge that I shall resolve all differences among us through dialogue and constitutional means without resorting to violence."'})]})})})]})}const oe=j==null?void 0:j.navy,mt=j==null?void 0:j.gold;function le({children:t,delay:i=0,y:n=20}){const a=o.useRef(null),[s,c]=o.useState(!1);return o.useEffect(()=>{const r=new IntersectionObserver(([f])=>{f.isIntersecting&&(c(!0),r.disconnect())},{threshold:.1});return a.current&&r.observe(a.current),()=>r.disconnect()},[]),e.jsx("div",{ref:a,style:{opacity:s?1:0,transform:s?"none":`translateY(${n}px)`,transition:`all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i}s`},children:t})}function Ve({categoryId:t}){const[i,n]=o.useState([]);return o.useEffect(()=>{const a=M(Re(L,"campus_gallery",t),s=>{s.exists()&&n(s.data().photos||[])});return()=>a()},[t]),i.length===0?null:e.jsxs("div",{style:{marginTop:40},children:[e.jsx(le,{children:e.jsx("div",{style:{display:"inline-block",background:`${mt}15`,color:"#b45309",padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:800,letterSpacing:1,marginBottom:16},children:"📸 LIVE GALLERY"})}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:24},children:i.map((a,s)=>e.jsx(le,{delay:s*.1,children:e.jsxs("div",{style:{borderRadius:16,overflow:"hidden",boxShadow:"0 10px 30px rgba(15,35,71,0.06)",border:"1px solid #f1f5f9",background:"#fff",transition:"transform 0.3s"},onMouseEnter:c=>c.currentTarget.style.transform="translateY(-6px)",onMouseLeave:c=>c.currentTarget.style.transform="none",children:[e.jsx("img",{src:a.url,alt:a.caption,style:{width:"100%",height:220,objectFit:"cover"}}),a.caption&&a.caption!=="Campus View"&&e.jsx("div",{style:{padding:"14px 18px",fontSize:13.5,fontWeight:700,color:oe,borderTop:"1px solid #f1f5f9"},children:a.caption})]})},a.id))})]})}function Tt({title:t,desc:i,categoryId:n}){return e.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"},children:[e.jsxs("div",{style:{background:oe,padding:"80px 20px 60px",textAlign:"center",color:"#fff"},children:[e.jsx(le,{children:e.jsx("h1",{style:{fontSize:"clamp(32px, 5vw, 48px)",fontWeight:800,margin:"0 0 16px"},children:t})}),e.jsx(le,{delay:.1,children:e.jsx("p",{style:{color:"#cbd5e1",fontSize:16,maxWidth:600,margin:"0 auto"},children:i})})]}),e.jsx("div",{style:{maxWidth:1200,margin:"-40px auto 80px",padding:"0 20px",position:"relative",zIndex:10},children:e.jsx(Ve,{categoryId:n})})]})}function Gr(){const t=[{title:"Central Library",icon:"📚",span:2,bg:"#fff",color:oe,desc:"Over 50,000 books and digital journals."},{title:"Science Labs",icon:"🔬",span:1,bg:`${oe}0a`,color:oe,desc:"State-of-the-art equipments."},{title:"Auditorium",icon:"🎭",span:1,bg:`${mt}15`,color:"#b45309",desc:"500+ seating capacity."},{title:"Sports Ground",icon:"⚽",span:2,bg:"#fff",color:oe,desc:"Vast playground for outdoor sports."}];return e.jsx("div",{style:{background:"#f8fafc",padding:"80px 20px",fontFamily:"'DM Sans', sans-serif"},children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsxs(le,{children:[e.jsx("div",{style:{color:mt,fontWeight:700,letterSpacing:2,marginBottom:8},children:"OVERVIEW"}),e.jsx("h1",{style:{fontSize:"clamp(32px, 4vw, 42px)",fontWeight:800,color:oe,marginBottom:40},children:"World-Class Infrastructure"})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:24,marginBottom:60},children:t.map((i,n)=>e.jsx(le,{delay:n*.1,style:{gridColumn:`span ${window.innerWidth>768?i.span:1}`},children:e.jsxs("div",{style:{background:i.bg,borderRadius:24,padding:32,height:"100%",border:"1.5px solid #e2e8f0"},children:[e.jsx("div",{style:{fontSize:40,marginBottom:16},children:i.icon}),e.jsx("h3",{style:{fontSize:22,fontWeight:800,color:i.color,margin:"0 0 10px"},children:i.title}),e.jsx("p",{style:{color:"#64748b",fontSize:15,margin:0,lineHeight:1.6},children:i.desc})]})},n))}),e.jsx(Ve,{categoryId:"infrastructure"})]})})}function Yr(){return e.jsx("div",{style:{background:"#fff",padding:"80px 20px",fontFamily:"'DM Sans', sans-serif"},children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(350px, 1fr))",gap:60,alignItems:"center",marginBottom:60},children:[e.jsx(le,{children:e.jsx("div",{style:{borderRadius:24,overflow:"hidden",boxShadow:`0 20px 40px ${oe}15`},children:e.jsx("img",{src:"https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80",alt:"Classroom",style:{width:"100%",display:"block"}})})}),e.jsxs(le,{delay:.2,children:[e.jsx("div",{style:{background:`${mt}15`,padding:"8px 16px",borderRadius:20,color:"#b45309",fontWeight:700,display:"inline-block",marginBottom:16,fontSize:13},children:"MODERN LEARNING"}),e.jsx("h2",{style:{fontSize:"clamp(28px, 4vw, 38px)",fontWeight:800,color:oe,margin:"0 0 24px",lineHeight:1.2},children:"Smart Classrooms"}),e.jsx("p",{style:{color:"#64748b",fontSize:16,lineHeight:1.8,marginBottom:24},children:"Comfortable, well-ventilated, and equipped with smart tech."}),e.jsx("ul",{style:{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:12},children:["Spacious & Well-Ventilated","Ergonomic Seating","Interactive Smart Boards"].map((t,i)=>e.jsxs("li",{style:{display:"flex",alignItems:"center",gap:12,fontSize:15,fontWeight:600,color:oe},children:[e.jsx("span",{style:{background:"#d1fae5",color:"#059669",width:24,height:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12},children:"✓"}),t]},i))})]})]}),e.jsx(Ve,{categoryId:"classrooms"})]})})}function _r(){return e.jsx("div",{style:{background:oe,padding:"80px 20px",color:"#fff",fontFamily:"'DM Sans', sans-serif",minHeight:"100vh"},children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:60},children:[e.jsx(le,{children:e.jsx("h2",{style:{fontSize:"clamp(32px, 4vw, 42px)",fontWeight:800,margin:"0 0 16px"},children:"ICT & Computer Labs"})}),e.jsx(le,{delay:.1,children:e.jsx("p",{style:{color:"#94a3b8",fontSize:16,maxWidth:600,margin:"0 auto",lineHeight:1.7},children:"Empowering students with high-end workstations."})})]}),e.jsx(Ve,{categoryId:"ict-rooms"})]})})}function Ur(){return e.jsx("div",{style:{background:"linear-gradient(145deg, #f0fdf4 0%, #ffffff 100%)",padding:"80px 20px",fontFamily:"'DM Sans', sans-serif",minHeight:"100vh"},children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsx("div",{style:{textAlign:"center",marginBottom:60},children:e.jsxs(le,{children:[e.jsx("div",{style:{fontSize:48,marginBottom:16},children:"🌿"}),e.jsx("h2",{style:{fontSize:"clamp(32px, 4vw, 42px)",fontWeight:800,color:"#064e3b",margin:"0 0 16px"},children:"Our Green Initiatives"})]})}),e.jsx(Ve,{categoryId:"green-campus"})]})})}const Or=o.lazy(()=>gi(()=>import("./AdminPanel-DtK4_JC7.js").then(t=>t.A),__vite__mapDeps([0,1,2,3,4]))),qr=o.lazy(()=>gi(()=>import("./Ticker-BJ3mjO0o.js"),__vite__mapDeps([5,1,2,3,4]))),W=({children:t})=>e.jsx(Un,{children:t}),ce=()=>e.jsx(W,{children:e.jsx(oa,{})});function Vr(){const[t,i]=o.useState([]),[n,a]=o.useState([]),[s,c]=o.useState([]),[r,f]=o.useState([]),[d,l]=o.useState([]),[u,g]=o.useState([]),[m,w]=o.useState(null),[k,z]=o.useState(()=>sessionStorage.getItem("gnc_admin_auth")==="true"),p=()=>{sessionStorage.setItem("gnc_admin_auth","true"),z(!0)},b=()=>{sessionStorage.removeItem("gnc_admin_auth"),z(!1),window.location.hash="/"},x=Pt().pathname.startsWith("/admin")||window.location.hash.startsWith("#/admin");o.useEffect(()=>M(Re(L,"settings","navbar"),N=>{N.exists()&&N.data().links&&w(N.data().links)}),[]),o.useEffect(()=>{const E=[["notices",i],["announcements",a],["events",c],["gallery",f],["faculties",l],["sliderSlides",g]].map(([v,I])=>{const B=X(K(L,v),ne("createdAt","desc"));return M(B,G=>I(G.docs.map(Q=>R({id:Q.id},Q.data()))),G=>console.error(`[${v}]`,G))});return()=>E.forEach(v=>v())},[]);const h=o.useMemo(()=>(m||Mn).map(E=>E.label==="Gallery"?Y(R({},E),{href:"/gallery",sub:[{label:"Photo Gallery",href:"/gallery/photos"},{label:"Video Gallery",href:"/gallery/videos"}]}):E),[m]),y=()=>window.open(`${window.location.origin}${"/gncollege-website/".replace(/\/$/,"")}/#/admin`,"_blank");return e.jsxs(e.Fragment,{children:[e.jsx(Dn,{position:"top-right",containerStyle:{zIndex:999999},toastOptions:{duration:3500,style:{fontFamily:"'Inter', sans-serif",fontWeight:600,fontSize:"14px",borderRadius:"12px",padding:"14px 18px",boxShadow:"0 8px 32px rgba(0,0,0,0.18)"},success:{style:{background:"#0f2347",color:"#fff",border:"1.5px solid #f4a023"},iconTheme:{primary:"#f4a023",secondary:"#0f2347"}},error:{style:{background:"#fff0f0",color:"#b91c1c",border:"1.5px solid #f87171"}}}}),!x&&e.jsxs(e.Fragment,{children:[e.jsx(Hn,{}),e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{height:40}}),children:e.jsx(qr,{items:t})}),e.jsx(Fn,{onAdminClick:y,navLinks:h}),e.jsx(Gn,{}),e.jsx(_n,{})]}),e.jsxs($i,{children:[e.jsx(A,{path:"/",element:e.jsx(W,{children:e.jsx(Fa,{notices:t,announcements:n,sliderSlides:u,events:s,gallery:r})})}),e.jsx(A,{path:"/contact",element:e.jsx(W,{children:e.jsx(Ma,{})})}),e.jsx(A,{path:"/about-us/college-profile",element:e.jsx(W,{children:e.jsx(Ka,{})})}),e.jsx(A,{path:"/about-us/vision-mission",element:e.jsx(W,{children:e.jsx(lr,{})})}),e.jsx(A,{path:"/about-us/principal-message",element:e.jsx(W,{children:e.jsx(dr,{})})}),e.jsx(A,{path:"/about-us/governing-body",element:e.jsx(W,{children:e.jsx(jr,{})})}),e.jsx(A,{path:"/about-us/staff-council",element:e.jsx(W,{children:e.jsx(vr,{})})}),e.jsx(A,{path:"/about-us/audit-report",element:e.jsx(ce,{})}),e.jsx(A,{path:"/about-us/college-management/organogram",element:e.jsx(W,{children:e.jsx(cr,{})})}),e.jsx(A,{path:"/about-us/college-management/presidents",element:e.jsx(W,{children:e.jsx(Bt,{type:"president",title:"Presidents Over the Years"})})}),e.jsx(A,{path:"/about-us/college-management/secretaries",element:e.jsx(W,{children:e.jsx(Bt,{type:"secretary",title:"Secretaries Over the Years"})})}),e.jsx(A,{path:"/about-us/college-management/principal",element:e.jsx(W,{children:e.jsx(Bt,{type:"principal",title:"Principals Over the Years"})})}),e.jsx(A,{path:"/about-us/various-committees/womens-cell",element:e.jsx(W,{children:e.jsx(pr,{})})}),e.jsx(A,{path:"/about-us/various-committees/anti-ragging",element:e.jsx(W,{children:e.jsx(fr,{})})}),e.jsx(A,{path:"/about-us/various-committees/sc-st",element:e.jsx(W,{children:e.jsx(xr,{})})}),e.jsx(A,{path:"/about-us/various-committees/obc",element:e.jsx(W,{children:e.jsx(gr,{})})}),e.jsx(A,{path:"/about-us/various-committees/grievance",element:e.jsx(W,{children:e.jsx(hr,{})})}),e.jsx(A,{path:"/about-us/various-committees/icc",element:e.jsx(W,{children:e.jsx(mr,{})})}),e.jsx(A,{path:"/about-us/various-committees/minority",element:e.jsx(W,{children:e.jsx(ur,{})})}),e.jsx(A,{path:"/about-us/various-committees/placement",element:e.jsx(W,{children:e.jsx(br,{})})}),e.jsx(A,{path:"/about-us/various-committees/rusa",element:e.jsx(W,{children:e.jsx(yr,{})})}),e.jsx(A,{path:"/about-us/college-staff/:staffType",element:e.jsx(W,{children:e.jsx(La,{faculties:d})})}),e.jsx(A,{path:"/about-us/regulations/bbmku/special-ug-regulation",element:e.jsx(ce,{})}),e.jsx(A,{path:"/about-us/regulations/bbmku/ug-regulation-fyugp",element:e.jsx(ce,{})}),e.jsx(A,{path:"/about-us/regulations/bbmku/ug-regulation-cbcs",element:e.jsx(ce,{})}),e.jsx(A,{path:"/about-us/regulations/college-affiliation",element:e.jsx(ce,{})}),e.jsx(A,{path:"/about-us/regulations/ugc-section",element:e.jsx(ce,{})}),e.jsx(A,{path:"/about-us/regulations/vbu/ug-regulation-2015",element:e.jsx(ce,{})}),e.jsx(A,{path:"/about-us/regulations/vbu/bca-regulation",element:e.jsx(ce,{})}),e.jsx(A,{path:"/about-us/regulations/byelaws",element:e.jsx(ce,{})}),e.jsx(A,{path:"/about-us/regulations/exemption",element:e.jsx(ce,{})}),e.jsx(A,{path:"/campus/visuals/bhuda",element:e.jsx(W,{children:e.jsx(Tt,{title:"Bhuda Campus",categoryId:"bhuda",desc:"Bhuda campus ki photos"})})}),e.jsx(A,{path:"/campus/visuals/bank-more",element:e.jsx(W,{children:e.jsx(Tt,{title:"Bank More Campus",categoryId:"bank-more",desc:"Bank More campus ki photos"})})}),e.jsx(A,{path:"/campus/visuals/vocational-building",element:e.jsx(W,{children:e.jsx(Tt,{title:"Vocational Building",categoryId:"vocational",desc:"Vocational building ki photos"})})}),e.jsx(A,{path:"/campus/infrastructure",element:e.jsx(W,{children:e.jsx(Gr,{})})}),e.jsx(A,{path:"/campus/classroom",element:e.jsx(W,{children:e.jsx(Yr,{})})}),e.jsx(A,{path:"/campus/ict-rooms",element:e.jsx(W,{children:e.jsx(_r,{})})}),e.jsx(A,{path:"/campus/green-campus",element:e.jsx(W,{children:e.jsx(Ur,{})})}),e.jsx(A,{path:"/academics/iqac",element:e.jsx(W,{children:e.jsx(wr,{})})}),e.jsx(A,{path:"/academics/course-offered",element:e.jsx(W,{children:e.jsx(kr,{})})}),e.jsx(A,{path:"/academics/departments",element:e.jsx(W,{children:e.jsx(ai,{})})}),e.jsx(A,{path:"/academics/departments/:deptSlug",element:e.jsx(W,{children:e.jsx(ai,{})})}),e.jsx(A,{path:"/syllabus",element:e.jsx(W,{children:e.jsx(Sr,{})})}),e.jsx(A,{path:"/academics/academic-calendar",element:e.jsx(W,{children:e.jsx(Nr,{})})}),e.jsx(A,{path:"/admission/rule",element:e.jsx(W,{children:e.jsx(zr,{})})}),e.jsx(A,{path:"/admission/document-required",element:e.jsx(W,{children:e.jsx(Cr,{})})}),e.jsx(A,{path:"/admission/fee-structure",element:e.jsx(W,{children:e.jsx(Ar,{})})}),e.jsx(A,{path:"/admission/notification/latest",element:e.jsx(W,{children:e.jsx(ci,{type:"latest",title:"Latest Notifications"})})}),e.jsx(A,{path:"/admission/notification/upcoming",element:e.jsx(W,{children:e.jsx(ci,{type:"upcoming",title:"Upcoming Notifications"})})}),e.jsx(A,{path:"/admission/intake-capacity",element:e.jsx(W,{children:e.jsx(Rr,{})})}),e.jsx(A,{path:"/activity/nss",element:e.jsx(W,{children:e.jsx(Dr,{})})}),e.jsx(A,{path:"/activity/ncc",element:e.jsx(W,{children:e.jsx(Fr,{})})}),e.jsx(A,{path:"/activity/workshop",element:e.jsx(W,{children:e.jsx(Pr,{})})}),e.jsx(A,{path:"/activity/games-sports",element:e.jsx(W,{children:e.jsx(Mr,{})})}),e.jsx(A,{path:"/activity/collaboration/rotaract-club",element:e.jsx(W,{children:e.jsx(Lr,{})})}),e.jsx(A,{path:"/activity/collaboration/sadbhavana-diwas",element:e.jsx(W,{children:e.jsx(Hr,{})})}),e.jsx(A,{path:"/naac/ssr-1st-cycle/cycle-1-documents",element:e.jsx(W,{children:e.jsx(rt,{cycle:1})})}),e.jsx(A,{path:"/naac/ssr-1st-cycle/peer-team-report",element:e.jsx(W,{children:e.jsx(rt,{cycle:1})})}),e.jsx(A,{path:"/naac/ssr-2nd-cycle/cycle-2-documents",element:e.jsx(W,{children:e.jsx(rt,{cycle:2})})}),e.jsx(A,{path:"/naac/ssr-2nd-cycle/executive-summary",element:e.jsx(W,{children:e.jsx(rt,{cycle:2})})}),e.jsx(A,{path:"/naac/aqar",element:e.jsx(W,{children:e.jsx(Wr,{})})}),e.jsx(A,{path:"/naac/nirf",element:e.jsx(W,{children:e.jsx(Er,{})})}),e.jsx(A,{path:"/naac/perspective-plan",element:e.jsx(W,{children:e.jsx(Ir,{})})}),e.jsx(A,{path:"/publication/college-library",element:e.jsx(W,{children:e.jsx($r,{})})}),e.jsx(A,{path:"/publication/e-magazine",element:e.jsx(W,{children:e.jsx(Ge,{type:"magazine",title:"E-Magazine",subtitle:"College ki digital publications",icon:"📰",keyword:"magazine"})})}),e.jsx(A,{path:"/publication/examination-results/2024",element:e.jsx(W,{children:e.jsx(Ge,{type:"result",title:"Exam Results 2024",subtitle:"Academic year 2023-24 ke results",icon:"📋",keyword:"result-2024"})})}),e.jsx(A,{path:"/publication/examination-results/2023",element:e.jsx(W,{children:e.jsx(Ge,{type:"result",title:"Exam Results 2023",subtitle:"Academic year 2022-23 ke results",icon:"📋",keyword:"result-2023"})})}),e.jsx(A,{path:"/publication/sss-report/2023-24",element:e.jsx(W,{children:e.jsx(Ge,{type:"sss",title:"SSS Report 2023-24",subtitle:"Student Satisfaction Survey",icon:"📊",keyword:"sss-2023-24"})})}),e.jsx(A,{path:"/publication/sss-report/2022-23",element:e.jsx(W,{children:e.jsx(Ge,{type:"sss",title:"SSS Report 2022-23",subtitle:"Student Satisfaction Survey",icon:"📊",keyword:"sss-2022-23"})})}),e.jsx(A,{path:"/gallery",element:e.jsx(W,{children:e.jsx(Wt,{gallery:r})})}),e.jsx(A,{path:"/gallery/photos",element:e.jsx(W,{children:e.jsx(Wt,{gallery:r})})}),e.jsx(A,{path:"/gallery/photo-gallery",element:e.jsx(W,{children:e.jsx(Wt,{gallery:r})})}),e.jsx(A,{path:"/video-gallery",element:e.jsx(W,{children:e.jsx(It,{})})}),e.jsx(A,{path:"/gallery/videos",element:e.jsx(W,{children:e.jsx(It,{})})}),e.jsx(A,{path:"/gallery/video-gallery",element:e.jsx(W,{children:e.jsx(It,{})})}),e.jsx(A,{path:"/news",element:e.jsx(W,{children:e.jsx(er,{})})}),e.jsx(A,{path:"/notifications",element:e.jsx(W,{children:e.jsx(tr,{})})}),e.jsx(A,{path:"/documents",element:e.jsx(W,{children:e.jsx(nr,{})})}),e.jsx(A,{path:"/events",element:e.jsx(W,{children:e.jsx(sr,{})})}),e.jsx(A,{path:"/admin",element:k?e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center"},children:"Loading Admin..."}),children:e.jsx(Or,{notices:t,announcements:n,events:s,gallery:r,faculties:d,onClose:b})}):e.jsx(On,{onSuccess:p,onClose:()=>{window.location.hash="/"}})})]}),!x&&e.jsxs(e.Fragment,{children:[e.jsx(Ln,{}),e.jsx(qi,{}),e.jsx("button",{onClick:y,title:"Open Admin Panel",style:{position:"fixed",bottom:"clamp(16px, 3vw, 25px)",right:"clamp(16px, 3vw, 25px)",background:j.navy,color:"#fff",border:`3px solid ${j.gold}`,borderRadius:"50%",width:"clamp(48px, 6vw, 60px)",height:"clamp(48px, 6vw, 60px)",cursor:"pointer",zIndex:500,fontSize:"clamp(18px, 2.5vw, 24px)",flexShrink:0},children:"⚙️"})]})]})}function Xr(){const t=Pt();return o.useEffect(()=>{"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.scrollTo(0,0)},[]),o.useEffect(()=>{const i=t.hash;if(i){const n=i.replace("#",""),a=document.getElementById(n);a&&a.scrollIntoView({behavior:"smooth"})}else window.scrollTo(0,0)},[t]),e.jsx(Vr,{})}class Kr extends Mt.Component{constructor(){super(...arguments);St(this,"state",{hasError:!1,error:null})}static getDerivedStateFromError(n){return{hasError:!0,error:n}}componentDidCatch(n,a){}render(){var n,a,s;return this.state.hasError?e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#0f2347",color:"#fff",fontFamily:"sans-serif",padding:"24px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:56,marginBottom:16},children:"⚠️"}),e.jsx("h1",{style:{color:"#f4a023",fontSize:22,marginBottom:10},children:"Website Load Nahi Ho Saka"}),e.jsx("p",{style:{color:"rgba(255,255,255,0.6)",maxWidth:480,lineHeight:1.7,marginBottom:24},children:(a=(n=this.state.error)==null?void 0:n.message)!=null&&a.includes("Firebase")?"🔥 Firebase configuration missing hai. Project root mein .env file banao.":((s=this.state.error)==null?void 0:s.message)||"Ek unexpected error aaya hai."}),e.jsx("button",{onClick:()=>window.location.reload(),style:{background:"#f4a023",color:"#0f2347",border:"none",borderRadius:10,padding:"12px 28px",fontWeight:800,fontSize:15,cursor:"pointer"},children:"🔄 Page Reload Karo"})]}):this.props.children}}Gi.createRoot(document.getElementById("root")).render(e.jsx(Mt.StrictMode,{children:e.jsx(Kr,{children:e.jsx(Di,{children:e.jsx(Xr,{})})})}));export{j as C,gi as _,L as d,ts as z};
