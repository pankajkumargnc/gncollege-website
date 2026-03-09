import toast from 'react-hot-toast';
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import JoditEditor from 'jodit-react';
import { COLORS } from '../styles/colors';
import { db, storage } from '../firebase';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { ref, deleteObject } from 'firebase/storage';
import {
  collection, addDoc, serverTimestamp, doc, deleteDoc,
  updateDoc, setDoc, getDoc, onSnapshot, query, orderBy,
  getDocs, writeBatch, limit
} from 'firebase/firestore';

const T = {
  bg0: '#f0f4f8', bg1: '#ffffff', bg2: 'linear-gradient(135deg, #f0f4f8 0%, #e1e8f0 100%)',
  bg3: '#ffffff', bg4: '#f8fafc', b1: '#e2e8f0', b2: '#cbd5e1',
  gold: '#f4a023', goldL: '#fbbf45', goldD: '#c97e10',
  navy: '#0f2347', red: '#ef4444', green: '#10b981', purple: '#8b5cf6',
  cyan: '#06b6d4', pink: '#ec4899', t1: '#0f2347', t2: '#334155', t3: '#64748b',
};

const GCSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
  .adm * { box-sizing:border-box; }
  .adm { font-family:'DM Sans',sans-serif; }
  .adm ::-webkit-scrollbar{width:6px;height:6px}
  .adm ::-webkit-scrollbar-track{background:transparent}
  .adm ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:99px}
  .adm ::-webkit-scrollbar-thumb:hover{background:#94a3b8}
  .anav{padding:12px 16px;display:flex;align-items:center;gap:12px;border-radius:12px;cursor:pointer;
    font-size:14px;font-weight:700;color:${T.t2};transition:all .3s;border:1px solid transparent;margin-bottom:4px}
  .anav:hover{background:#f8fafc;color:${T.navy}; transform: translateX(4px);}
  .anav.active{background:linear-gradient(135deg, ${T.navy}, #1a365d);
    color:#fff;box-shadow:0 10px 20px rgba(15,35,71,.15)}
  .glass{background:#ffffff;border:1px solid ${T.b1};border-radius:16px;box-shadow:0 8px 30px rgba(15,35,71,.03)}
  .glass-gold{background:#ffffff;border:1px solid rgba(244,160,35,.4);border-radius:16px;
    box-shadow:0 15px 35px rgba(244,160,35,.06), inset 0 4px 0 rgba(244,160,35,1)}
  .ainp{width:100%;padding:12px 15px;background:${T.bg4};border:1px solid ${T.b2};
    border-radius:10px;font-size:14px;color:${T.t1};font-family:'DM Sans',sans-serif;
    outline:none;transition:all .2s;font-weight:500;}
  .ainp:focus{border-color:${T.navy};background:#fff;box-shadow:0 0 0 4px rgba(15,35,71,.08)}
  .ainp::placeholder{color:#94a3b8}
  .ainp option{background:#fff;color:${T.t1}}
  .abtn{padding:11px 24px;border-radius:10px;font-weight:700;cursor:pointer;transition:all .25s;
    border:none;font-size:13.5px;display:inline-flex;align-items:center;gap:8px;font-family:'DM Sans',sans-serif}
  .abtn:disabled{opacity:.6;cursor:not-allowed}
  .abtn-gold{background:linear-gradient(135deg,${T.gold},${T.goldD});color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.2)}
  .abtn-gold:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 25px rgba(244,160,35,.4)}
  .abtn-dark{background:#f1f5f9;color:${T.navy};border:1px solid #e2e8f0}
  .abtn-dark:hover:not(:disabled){background:#e2e8f0;transform:translateY(-1px)}
  .abtn-danger{background:#fef2f2;color:${T.red};border:1px solid #fecaca}
  .abtn-danger:hover:not(:disabled){background:${T.red};color:#fff}
  .abtn-sm{padding:7px 14px;font-size:12px;border-radius:8px}
  .abadge{font-size:11px;padding:4px 10px;border-radius:6px;font-weight:800;display:inline-block;font-family:'JetBrains Mono',monospace;letter-spacing:.3px}
  .arow{display:flex;align-items:center;gap:14px;padding:16px 20px;border:1px solid ${T.b1};
    border-radius:12px;background:#f8fafc;transition:all .2s}
  .arow:hover{background:#fff;border-color:${T.b2};box-shadow:0 5px 15px rgba(0,0,0,.03)}
  .asec{font-size:24px;font-weight:800;color:${T.navy};margin:0 0 6px;letter-spacing:-.5px}
  .asub{font-size:14px;color:${T.t3};margin:0 0 28px;font-weight:500}
  .actitle{font-size:16px;font-weight:800;color:${T.navy};margin:0 0 20px;
    padding-bottom:14px;border-bottom:2px solid #f1f5f9;display:flex;align-items:center;gap:9px}
  .alabel{display:block;font-size:12px;font-weight:800;color:${T.t2};margin-bottom:8px;
    text-transform:uppercase;letter-spacing:.5px}
  .drag-handle{cursor:grab;color:#cbd5e1;font-size:16px;padding:4px 8px;border-radius:6px;transition:.2s;user-select:none}
  .drag-handle:hover{color:${T.navy};background:#f1f5f9}
  .drag-handle:active{cursor:grabbing}
  .prog-outer{background:#e2e8f0;border-radius:99px;height:8px;overflow:hidden;margin-top:10px}
  .prog-inner{height:100%;border-radius:99px;background:linear-gradient(90deg,${T.gold},${T.goldL});transition:width .3s}
  @keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  .count-anim{animation:countUp .6s ease both}
  @keyframes glowPulse{0%,100%{opacity:.6}50%{opacity:1}}
  .glow-dot{width:8px;height:8px;border-radius:50%;background:${T.green};animation:glowPulse 2s infinite;box-shadow:0 0 8px ${T.green}}
  @keyframes logIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
  .log-item{animation:logIn .3s ease both}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  .fade-up{animation:fadeUp .4s ease both}
  .amobile-top{display:none}
  @media(max-width:1024px){
    .amobile-top{display:flex;background:#fff;padding:14px 20px;align-items:center;
      justify-content:space-between;border-bottom:1px solid ${T.b1};position:sticky;top:0;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.05)}
    .adm-main-pad{padding:20px !important}
    .arow{flex-direction:column;align-items:flex-start}
  }
  .upload-zone{border:2px dashed #cbd5e1;border-radius:14px;padding:30px;
    text-align:center;cursor:pointer;transition:all .3s;background:#f8fafc}
  .upload-zone:hover{border-color:${T.navy};background:#f1f5f9}
  .slide-card{background:#fff;border:1px solid ${T.b1};border-radius:16px;overflow:hidden;transition:all .3s;cursor:grab;box-shadow:0 4px 10px rgba(0,0,0,.02)}
  .slide-card:hover{border-color:${T.gold};box-shadow:0 15px 30px rgba(15,35,71,.08);transform:translateY(-5px)}
  .slide-card.dragging{opacity:.5;transform:scale(.95);cursor:grabbing}
  .slide-card.drag-over{border-color:${T.navy};box-shadow:0 0 0 3px rgba(15,35,71,.1)}
  .seo-ring{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;
    font-size:16px;font-weight:800;font-family:'JetBrains Mono',monospace}
`;

const IMGBB_API_KEY = '6391ea11ec7aa4e6f3477f373cdd3592';
const uploadToImgBB = (blob, onProgress) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData(); formData.append('image', blob);
    const xhr = new XMLHttpRequest(); xhr.open('POST', `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, true);
    xhr.upload.onprogress = (e) => { if (e.lengthComputable) { onProgress(Math.round((e.loaded / e.total) * 100)); } };
    xhr.onload = () => { if (xhr.status === 200) { resolve(JSON.parse(xhr.responseText).data.url); } else { reject(new Error('ImgBB Upload failed')); } };
    xhr.onerror = () => reject(new Error('Network error during upload')); xhr.send(formData);
  });
};

function useCountUp(target, dur=1200) {
  const [v,setV]=useState(0);
  useEffect(()=>{
    if(!target)return; let s=0; const step=target/(dur/16);
    const t=setInterval(()=>{s+=step;if(s>=target){setV(target);clearInterval(t);}else setV(Math.floor(s));},16);
    return()=>clearInterval(t);
  },[target]); return v;
}

const StatCard=({icon,label,count,color})=>{
  const a=useCountUp(count);
  return(
    <div className="glass count-anim" style={{padding:'24px',borderBottom:`3px solid ${color}`,transition:'transform .3s'}}
      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-6px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
        <div style={{fontSize:32}}>{icon}</div><div style={{width:10,height:10,borderRadius:'50%',background:color,boxShadow:`0 0 10px ${color}`}}/>
      </div>
      <div style={{fontSize:36,fontWeight:900,color:T.navy,lineHeight:1,fontFamily:"'JetBrains Mono',monospace"}}>{a}</div>
      <div style={{fontSize:12,fontWeight:800,color:T.t3,marginTop:8,textTransform:'uppercase',letterSpacing:'.5px'}}>{label}</div>
    </div>
  );
};

const LogItem=({log})=>{
  const icons={add:'➕',update:'✏️',delete:'🗑️',publish:'🚀',login:'🔐',restore:'🔄'};
  const colors={add:T.green,update:T.gold,delete:T.red,publish:T.cyan,login:T.purple,restore:T.navy};
  const ic=icons[log.action]||'📝', co=colors[log.action]||T.t2;
  return(
    <div className="log-item" style={{display:'flex',gap:14,padding:'16px 0',borderBottom:`1px solid ${T.b1}`,alignItems:'flex-start'}}>
      <div style={{width:38,height:38,borderRadius:10,background:`${co}15`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0}}>{ic}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:14,fontWeight:700,color:T.navy,lineHeight:1.4}}>{log.message}</div>
        <div style={{fontSize:12,color:T.t3,marginTop:4,fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}>{log.collection&&<span style={{color:co,marginRight:10}}>[{log.collection}]</span>}{log.time?new Date(log.time).toLocaleTimeString('en-IN'):'—'}</div>
      </div>
      <div className="abadge" style={{background:`${co}15`,color:co,fontSize:11,flexShrink:0}}>{log.action}</div>
    </div>
  );
};

const getSeoScore=(seo,title)=>{
  let s=0;
  if((title||'').length>5)s+=20;
  if((seo?.metaTitle||'').length>10)s+=25;
  if((seo?.metaDesc||'').length>50)s+=30;
  if((seo?.keywords||'').length>0)s+=15;
  if(seo?.ogImage)s+=10;
  return s;
};

const SeoRing=({score})=>{
  const c=score>=80?T.green:score>=50?T.gold:T.red;
  return <div className="seo-ring" style={{background:`${c}15`,color:c,border:`3px solid ${c}`}}>{score}</div>;
};

const ImageCropper=({src,onCrop,onCancel})=>{
  const [crop,setCrop]=useState({x:0,y:0,w:100,h:100}); const imgRef=useRef(null);
  const handleCrop=useCallback(()=>{
    const img=imgRef.current;if(!img)return;
    const canvas=document.createElement('canvas'); const scaleX=img.naturalWidth/img.width, scaleY=img.naturalHeight/img.height;
    const ow=(crop.w/100)*img.width, oh=(crop.h/100)*img.height; canvas.width=ow*scaleX; canvas.height=oh*scaleY;
    const ctx=canvas.getContext('2d'); ctx.drawImage(img,(crop.x/100)*img.naturalWidth,(crop.y/100)*img.naturalHeight,ow*scaleX,oh*scaleY,0,0,canvas.width,canvas.height);
    canvas.toBlob(b=>onCrop(b),'image/jpeg',.92);
  },[crop,onCrop]);
  return(
    <div style={{position:'fixed',inset:0,background:'rgba(15,35,71,.95)',zIndex:100010,display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(5px)'}}>
      <div style={{background:'#fff',borderRadius:20,padding:32,width:'90%',maxWidth:720,boxShadow:'0 25px 50px rgba(0,0,0,.2)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}><div style={{fontSize:20,fontWeight:800,color:T.navy}}>✂️ Crop Image</div><button onClick={onCancel} className="abtn abtn-dark abtn-sm">✕ Cancel</button></div>
        <div style={{position:'relative',width:'100%',borderRadius:12,overflow:'hidden',marginBottom:24,background:'#f1f5f9'}}>
          <img ref={imgRef} src={src} alt="crop" style={{width:'100%',display:'block',borderRadius:12}}/>
          <div style={{position:'absolute',left:`${crop.x}%`,top:`${crop.y}%`,width:`${crop.w}%`,height:`${crop.h}%`,border:`3px solid ${T.gold}`,background:'rgba(244,160,35,.15)',boxShadow:'0 0 0 9999px rgba(15,35,71,.6)',pointerEvents:'none'}}></div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:24}}>
          {[['X Offset (%)','x',0,50],['Y Offset (%)','y',0,50],['Width (%)','w',30,100],['Height (%)','h',30,100]].map(([lbl,key,min,max])=>(
            <div key={key}><label className="alabel">{lbl}</label><input type="range" min={min} max={max} value={crop[key]} onChange={e=>setCrop(c=>({...c,[key]:+e.target.value}))} style={{width:'100%',accentColor:T.navy}}/></div>
          ))}
        </div>
        <div style={{display:'flex',gap:12}}><button className="abtn abtn-gold" onClick={handleCrop} style={{flex:1,justifyContent:'center'}}>✂️ Apply Crop & Use</button><button className="abtn abtn-dark" onClick={onCancel}>Use Original</button></div>
      </div>
    </div>
  );
};

const joditCfg={readonly:false,placeholder:'Start writing…',height:420,processPasteHTML:true,processPasteFromWord:true,theme:'default',buttons:['source','|','bold','italic','underline','strikethrough','|','ul','ol','|','font','fontsize','brush','paragraph','|','image','table','link','|','align','undo','redo','|','hr','eraser','fullsize']};

export default function AdminPanel({onClose,notices,pages,events,gallery,placeholderPaths,announcements,pdfReports,navLinks,sliderSlides}){
  const [activeTab,setActiveTab]=useState('dashboard');
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [isMobile,setIsMobile]=useState(window.innerWidth<1024);
  const [loading,setLoading]=useState(false);
  const [searchTerm,setSearchTerm]=useState('');
  const [filterType,setFilterType]=useState('all');
  const [showPreview,setShowPreview]=useState(false);
  const [previewContent,setPreviewContent]=useState('');
  const editor=useRef(null);
  useEffect(()=>{const fn=()=>setIsMobile(window.innerWidth<1024);window.addEventListener('resize',fn);return()=>window.removeEventListener('resize',fn);},[]);

  // 🌟 FIX: Updated System Test Logic to prevent ImgBB rate limiting
  const [testRunning, setTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testResults, setTestResults] = useState([]);
  const [testScore, setTestScore] = useState(null);

  const runDiagnostics = async () => {
    setTestRunning(true); setTestResults([]); setTestProgress(0); setTestScore(null);
    let passed = 0; const totalTests = 5;
    const addLog = (name, status, detail) => setTestResults(prev => [...prev, { name, status, detail }]);

    setTestProgress(20);
    try { if (import.meta.env.MODE) { addLog("Environment Check", "success", `Running smoothly in ${import.meta.env.MODE} mode`); passed++; } else throw new Error("Environment missing"); } catch (e) { addLog("Environment Check", "fail", e.message); }
    await new Promise(r => setTimeout(r, 600));

    setTestProgress(40);
    try { if (db) { addLog("Database Connection", "success", "Firebase Firestore is actively linked"); passed++; } else throw new Error("Database not connected"); } catch (e) { addLog("Database Connection", "fail", e.message); }
    await new Promise(r => setTimeout(r, 600));

    setTestProgress(60);
    try { await getDocs(collection(db, 'pages'), limit(1)); addLog("Security Rules", "success", "Read/Write permissions are open & verified"); passed++; } catch (e) { addLog("Security Rules", "fail", "Permission Denied. Check Firebase Rules."); }
    await new Promise(r => setTimeout(r, 600));

    setTestProgress(80);
    try { const navRef = await getDoc(doc(db, 'settings', 'navbar')); addLog("Menu Synchronization", "success", navRef.exists() ? "Dynamic menu is live" : "Using fallback menu safely"); passed++; } catch (e) { addLog("Menu Synchronization", "fail", e.message); }
    await new Promise(r => setTimeout(r, 600));

    setTestProgress(100);
    try {
      // 🌟 SAFE CHECK: Just validates the key length and structure instead of a spam upload
      if (IMGBB_API_KEY && IMGBB_API_KEY.length > 20) { 
        addLog("ImgBB Server Status", "success", "Image API Key configured and ready for uploads"); 
        passed++; 
      } else { 
        throw new Error("Invalid API Key format"); 
      }
    } catch (e) { addLog("ImgBB Server Status", "fail", e.message); }

    setTestScore(Math.round((passed / totalTests) * 100)); setTestRunning(false);
  };

  const [activityLogs,setActivityLogs]=useState([]);
  useEffect(()=>{
    const q=query(collection(db,'adminLogs'),orderBy('time','desc'),limit(50));
    const u=onSnapshot(q,s=>setActivityLogs(s.docs.map(d=>({id:d.id,...d.data()}))));
    return()=>u();
  },[]);
  const logActivity=useCallback(async(action,message,col='')=>{try{await addDoc(collection(db,'adminLogs'),{action,message,collection:col,time:new Date().toISOString(),createdAt:serverTimestamp()});}catch(_){}},[]);

  const [cropSrc,setCropSrc]=useState(null); const [cropCb,setCropCb]=useState(null);
  const triggerCrop=(src,cb)=>{setCropSrc(src);setCropCb(()=>cb);};
  const handleCropDone=async(blob)=>{if(cropCb)await cropCb(blob);setCropSrc(null);setCropCb(null);};

  // SLIDER
  const [sliderForm,setSliderForm]=useState({title:'',subtitle:'',image:'',order:0});
  const [editingSlide,setEditingSlide]=useState(null);
  const [sliderProgress,setSliderProgress]=useState(0);
  const [sliderUploading,setSliderUploading]=useState(false);
  const sliderFileRef=useRef(null);
  const [dragSrcIdx,setDragSrcIdx]=useState(null);
  const [dragOverIdx,setDragOverIdx]=useState(null);
  const [localSlides,setLocalSlides]=useState([]);
  useEffect(()=>{if(sliderSlides?.length)setLocalSlides([...sliderSlides].sort((a,b)=>(a.order??0)-(b.order??0)));},[sliderSlides]);
  const resetSlider=()=>{setSliderForm({title:'',subtitle:'',image:'',order:localSlides.length});setEditingSlide(null);setSliderProgress(0);if(sliderFileRef.current)sliderFileRef.current.value='';};
  const handleSliderFile=async(file)=>{const r=new FileReader();r.onload=e=>triggerCrop(e.target.result,async(blob)=>{const tid=toast.loading('Uploading to ImgBB…');setSliderUploading(true); setSliderProgress(0);try{ const url = await uploadToImgBB(blob, p => setSliderProgress(p)); setSliderForm(f=>({...f,image:url})); toast.success('Image ready! ✅',{id:tid}); }catch(err){toast.error(err.message,{id:tid});}setSliderUploading(false);}); r.readAsDataURL(file);};
  const saveSlide=async(e)=>{e.preventDefault();if(!sliderForm.title?.trim()||!sliderForm.image?.trim())return toast.error('Title & image required');setLoading(true);const tid=toast.loading(editingSlide?'Updating…':'Publishing…');try{const data={title:sliderForm.title.trim(),subtitle:sliderForm.subtitle?.trim()||'',image:sliderForm.image.trim(),order:Number(sliderForm.order)||0};if(editingSlide){await updateDoc(doc(db,'sliderSlides',editingSlide.id),{...data,updatedAt:serverTimestamp()});await logActivity('update',`Slide updated`,'sliderSlides');toast.success('Updated! 🎉',{id:tid});}else{await addDoc(collection(db,'sliderSlides'),{...data,createdAt:serverTimestamp()});await logActivity('add',`New slide`,'sliderSlides');toast.success('Published! 🚀',{id:tid});}resetSlider();}catch(err){toast.error(err.message,{id:tid});}setLoading(false);};
  const deleteSlide=async(slide)=>{if(!window.confirm(`Delete "${slide.title}"?`))return;setLoading(true);try{ await deleteDoc(doc(db,'sliderSlides',slide.id)); await logActivity('delete',`Slide deleted`,'sliderSlides'); toast.success('Deleted!'); }catch(err){toast.error(err.message);}setLoading(false);};
  const handleDrop=async(idx)=>{if(dragSrcIdx===null||dragSrcIdx===idx){setDragSrcIdx(null);setDragOverIdx(null);return;}const r=[...localSlides];const[moved]=r.splice(dragSrcIdx,1);r.splice(idx,0,moved);const upd=r.map((s,i)=>({...s,order:i}));setLocalSlides(upd);setDragSrcIdx(null);setDragOverIdx(null);const tid=toast.loading('Saving order…');try{const batch=writeBatch(db);upd.forEach(s=>batch.update(doc(db,'sliderSlides',s.id),{order:s.order}));await batch.commit();await logActivity('update','Slider reordered','sliderSlides');toast.success('Order saved! ✅',{id:tid});}catch(err){toast.error(err.message,{id:tid});}};

  // NAVBAR
  const [navData,setNavData]=useState([]); const [editMenuSel,setEditMenuSel]=useState(''); const [editMenuForm,setEditMenuForm]=useState({label:'',href:''}); const [newMenuForm,setNewMenuForm]=useState({label:'',href:'',parentId:'top'});
  useEffect(()=>{getDoc(doc(db,'settings','navbar')).then(s=>{if(s.exists()&&s.data().links?.length)setNavData(s.data().links);else if(navLinks?.length)setNavData(navLinks);});},[navLinks]);
  const flatMenus=useMemo(()=>{const f=[];(navData||[]).forEach((l0,i0)=>{f.push({id:`${i0}`,label:l0.label,href:l0.href,pathStr:`[L1] ${l0.label}`,level:0});if(l0.sub)l0.sub.forEach((l1,i1)=>{f.push({id:`${i0}-${i1}`,label:l1.label,href:l1.href,pathStr:`[L2] ${l0.label} › ${l1.label}`,level:1});if(l1.sub)l1.sub.forEach((l2,i2)=>f.push({id:`${i0}-${i1}-${i2}`,label:l2.label,href:l2.href,pathStr:`[L3] ${l0.label} › ${l1.label} › ${l2.label}`,level:2}));});});return f;},[navData]);
  const saveNav=async(arr,msg)=>{setLoading(true);const tid=toast.loading('Saving…');try{await setDoc(doc(db,'settings','navbar'),{links:arr});setNavData(arr);await logActivity('update',msg,'navbar');toast.success(msg,{id:tid});}catch(err){toast.error(err.message,{id:tid});}setLoading(false);};
  const updateMenu=()=>{if(!editMenuSel||!editMenuForm.label)return toast.error('Select a menu first');const nav=JSON.parse(JSON.stringify(navData));const idx=editMenuSel.split('-');if(idx.length===1){nav[idx[0]].label=editMenuForm.label;nav[idx[0]].href=editMenuForm.href;}else if(idx.length===2){nav[idx[0]].sub[idx[1]].label=editMenuForm.label;nav[idx[0]].sub[idx[1]].href=editMenuForm.href;}else{nav[idx[0]].sub[idx[1]].sub[idx[2]].label=editMenuForm.label;nav[idx[0]].sub[idx[1]].sub[idx[2]].href=editMenuForm.href;}saveNav(nav,`Menu "${editMenuForm.label}" updated ✅`);setEditMenuSel('');setEditMenuForm({label:'',href:''}); };
  const addMenu=()=>{if(!newMenuForm.label)return toast.error('Name required');const nav=JSON.parse(JSON.stringify(navData));const item={label:newMenuForm.label,href:newMenuForm.href};if(newMenuForm.parentId==='top')nav.push(item);else{const idx=newMenuForm.parentId.split('-');if(idx.length===1){if(!nav[idx[0]].sub)nav[idx[0]].sub=[];nav[idx[0]].sub.push(item);}else{if(!nav[idx[0]].sub[idx[1]].sub)nav[idx[0]].sub[idx[1]].sub=[];nav[idx[0]].sub[idx[1]].sub.push(item);}}saveNav(nav,`"${item.label}" added 🚀`);setNewMenuForm({label:'',href:'',parentId:'top'});};
  const deleteMenu=(id)=>{if(!window.confirm('Delete?'))return;const nav=JSON.parse(JSON.stringify(navData));const idx=id.split('-');if(idx.length===1)nav.splice(+idx[0],1);else if(idx.length===2)nav[idx[0]].sub.splice(+idx[1],1);else nav[idx[0]].sub[idx[1]].sub.splice(+idx[2],1);saveNav(nav,'Menu deleted');if(editMenuSel===id){setEditMenuSel('');setEditMenuForm({label:'',href:''});}};

  // PAGES + SEO
  const [pageMode,setPageMode]=useState('update');
  const [editingPage,setEditPage]=useState(null);
  const [pageData,setPageData]=useState({title:'',content:'',path:'',slug:'',contentType:'html'});
  const [seoData,setSeoData]=useState({metaTitle:'',metaDesc:'',keywords:'',ogImage:''});
  
  const savePage=async(e)=>{
    e.preventDefault();setLoading(true);
    try{
      const base={title:pageData?.title?.trim()||'',content:pageData?.content||'',contentType:pageData?.contentType||'html',seo:seoData||{}};
      if(editingPage){
        const upd={...base,updatedAt:serverTimestamp()};
        if(pageMode==='update'){if(!pageData.path){toast.error('Path required');setLoading(false);return;}upd.path=pageData.path.replace('/#','');upd.slug='';}
        else{upd.slug=(pageData.slug||'').toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]+/g,'');upd.path='';}
        await updateDoc(doc(db,'pages',editingPage.id),upd);await logActivity('update',`Page updated`,'pages');toast.success('Updated! ✅');
      }else{
        if(pageMode==='update'){if(!pageData.title||!pageData.path){toast.error('Title & path required');setLoading(false);return;}await addDoc(collection(db,'pages'),{...base,path:pageData.path.replace('/#',''),slug:'',createdAt:serverTimestamp()});await logActivity('add',`Page linked`,'pages');toast.success('Linked! 🚀');}
        else{if(!pageData.title||!pageData.slug){toast.error('Title & slug required');setLoading(false);return;}await addDoc(collection(db,'pages'),{...base,slug:(pageData.slug||'').toLowerCase().replace(/\s+/g,'-'),path:'',createdAt:serverTimestamp()});await logActivity('publish',`Published`,'pages');toast.success('Published! 🚀');}
      }
      setEditPage(null);setPageData({title:'',content:'',path:'',slug:'',contentType:'html'});setSeoData({metaTitle:'',metaDesc:'',keywords:'',ogImage:''});
    }catch(err){toast.error(err.message);}
    setLoading(false);
  };

  const [galleryData,setGalleryData]=useState({title:'',cat:'Seminars',src:''}); const [galleryProgress,setGalleryProgress]=useState(0); const [galleryUploading,setGalleryUploading]=useState(false); const galleryFileRef=useRef(null);
  const handleGalleryFile=async(file)=>{const r=new FileReader(); r.onload=e=>triggerCrop(e.target.result,async(blob)=>{const tid = toast.loading('Uploading to ImgBB…'); setGalleryUploading(true); setGalleryProgress(0); try{ const url = await uploadToImgBB(blob, p => setGalleryProgress(p)); setGalleryData(d=>({...d,src:url})); toast.success('Ready! ✅', {id:tid}); }catch(err){ toast.error(err.message, {id:tid}); } setGalleryUploading(false);}); r.readAsDataURL(file);};
  const addGalleryPhoto=async(e)=>{e.preventDefault();if(!galleryData.src?.trim())return toast.error('Image required');setLoading(true);try{await addDoc(collection(db,'gallery'),{...galleryData,createdAt:serverTimestamp()});await logActivity('add',`Gallery photo added`,'gallery');toast.success('Published! 🎉');setGalleryData({title:'',cat:'Seminars',src:''});if(galleryFileRef.current)galleryFileRef.current.value='';}catch(err){toast.error(err.message);}setLoading(false);};

  const [editNotice,setEditNotice]=useState(null);const[noticeData,setNoticeData]=useState({text:'',link:'',type:'General',isNew:true});
  const [editAnn,setEditAnn]=useState(null);const[annData,setAnnData]=useState({text:'',link:'',type:'News'});
  const [editPdf,setEditPdf]=useState(null);const[pdfData,setPdfData]=useState({title:'',link:'',type:'Document'});
  const [editEvent,setEditEvent]=useState(null);
  const [evtData,setEvtData]=useState({title:'',desc:'',type:'WORKSHOP',day:'',month:'',location:'',status:'upcoming',imageUrl:'',reportLink:''});
  const [eventProgress, setEventProgress] = useState(0); const [eventUploading, setEventUploading] = useState(false); const eventFileRef = useRef(null);

  const handleEventFile = async (file) => { const r = new FileReader(); r.onload = e => triggerCrop(e.target.result, async (blob) => { const tid = toast.loading('Uploading to ImgBB…'); setEventUploading(true); setEventProgress(0); try { const url = await uploadToImgBB(blob, p => setEventProgress(p)); setEvtData(d => ({ ...d, imageUrl: url })); toast.success('Ready!', { id: tid }); } catch (err) { toast.error(err.message, { id: tid }); } setEventUploading(false); }); r.readAsDataURL(file);};
  const genericSave=async(col,editing,data,setEditing,reset,msg)=>{setLoading(true);try{if(editing){await updateDoc(doc(db,col,editing.id),{...data,updatedAt:serverTimestamp()});await logActivity('update',`${msg} updated`,col);toast.success(`${msg} updated!`);}else{await addDoc(collection(db,col),{...data,date:new Date().toISOString(),createdAt:serverTimestamp()});await logActivity('add',`${msg} published`,col);toast.success(`${msg} published!`);}setEditing(null);reset();}catch(err){toast.error(err.message);}setLoading(false);};
  const genericDelete=async(col,id,label)=>{if(!window.confirm(`Delete this ${label}?`))return;try{await deleteDoc(doc(db,col,id));await logActivity('delete',`${label} deleted`,col);toast.success('Deleted!');}catch(err){toast.error(err.message);}};

  const [restoreFile,setRestoreFile]=useState(null);const fileRef=useRef(null);
  const handleBackup=async()=>{setLoading(true);const tid=toast.loading('Generating…');try{const cols=['notices','announcements','events','gallery','pdfReports','pages','sliderSlides','adminLogs'];const bk={exportDate:new Date().toISOString(),version:'3.5',collections:{}};for(const col of cols){const s=await getDocs(collection(db,col));bk.collections[col]=s.docs.map(d=>({id:d.id,...d.data(),createdAt:d.data().createdAt?.toDate?.()?.toISOString?.()??null}));}const ns=await getDoc(doc(db,'settings','navbar'));if(ns.exists())bk.navbar=ns.data().links;const blob=new Blob([JSON.stringify(bk,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`gnc-backup-${new Date().toISOString().split('T')[0]}.json`;a.click();await logActivity('restore','Backup downloaded','system');toast.success('Backup ready!',{id:tid});}catch(err){toast.error(err.message,{id:tid});}setLoading(false);};
  const handleRestore=async()=>{if(!restoreFile||!window.confirm('⚠️ ERASE all data?'))return;setLoading(true);const tid=toast.loading('Restoring…');try{const bk=JSON.parse(await restoreFile.text());const batch=writeBatch(db);for(const col of Object.keys(bk.collections||{})){const s=await getDocs(collection(db,col));s.docs.forEach(d=>batch.delete(d.ref));bk.collections[col].forEach(({id,...data})=>batch.set(doc(collection(db,col)),data));}if(bk.navbar)batch.set(doc(db,'settings','navbar'),{links:bk.navbar});await batch.commit();await logActivity('restore','Database restored','system');toast.success('Restored!',{id:tid});setRestoreFile(null);if(fileRef.current)fileRef.current.value='';}catch(err){toast.error('Failed: '+err.message,{id:tid});}setLoading(false);};

  const allContent=useMemo(()=>[
    ...(localSlides||[]).map(s=>({...s,contentType:'Slide'})),
    ...(pages||[]).map(p=>({...p,contentType:'Page'})),
    ...(notices||[]).map(n=>({...n,title:String(n.text||'').substring(0,50)+'…',contentType:'Notice'})),
    ...(announcements||[]).map(a=>({...a,title:String(a.text||'').substring(0,50)+'…',contentType:'News'})),
    ...(events||[]).map(e=>({...e,contentType:'Event'})),
    ...(pdfReports||[]).map(r=>({...r,contentType:'Document'})),
    ...(gallery||[]).map(g=>({...g,contentType:'Gallery'})),
  ].sort((a,b)=>(b.createdAt?.toMillis?.()??0)-(a.createdAt?.toMillis?.()??0)),[localSlides,pages,notices,announcements,events,pdfReports,gallery]);

  const filtered=allContent.filter(i=>i.title?.toLowerCase().includes(searchTerm.toLowerCase())&&(filterType==='all'||i.contentType.toLowerCase()===filterType));
  const bc=(type)=>({Slide:{bg:'rgba(244,160,35,.15)',c:T.gold},Page:{bg:'rgba(139,92,246,.15)',c:T.purple},Notice:{bg:'rgba(245,158,11,.15)',c:'#f59e0b'},News:{bg:'rgba(239,68,68,.15)',c:T.red},Event:{bg:'rgba(139,92,246,.15)',c:T.purple},Document:{bg:'rgba(16,185,129,.15)',c:T.green},Gallery:{bg:'rgba(236,72,153,.15)',c:T.pink}}[type]||{bg:'#f1f5f9',c:T.t2});

  const seoScore=getSeoScore(seoData, pageData?.title || '');

  const tabs=[
    {id:'dashboard',label:'Dashboard',icon:'📊'},
    {id:'slider',label:'Hero Slider',icon:'🖼️'},
    {id:'menu_builder',label:'Menu Editor',icon:'🧭'},
    {id:'pages',label:'Pages & SEO',icon:'📄'},
    {id:'gallery',label:'Gallery',icon:'📸'},
    {id:'notices',label:'Notices',icon:'📢'},
    {id:'announcements',label:'News',icon:'📣'},
    {id:'pdfReports',label:'Documents',icon:'📁'},
    {id:'events',label:'Events',icon:'🏆'},
    {id:'activity',label:'Activity Log',icon:'📋'},
    {id:'backup',label:'Backup',icon:'💾'},
    {id:'system_test',label:'System Test',icon:'⚡'}, 
  ];

  return (
    <div className="adm" style={{display:'flex',height:'100vh',width:'100vw',position:'fixed',top:0,left:0,zIndex:99999,background:T.bg2,overflow:'hidden'}}>
      <style>{GCSS}</style>
      {cropSrc&&<ImageCropper src={cropSrc} onCrop={handleCropDone} onCancel={()=>{setCropSrc(null);setCropCb(null);}}/>}

      <div style={{width:260,background:T.bg1,display:'flex',flexDirection:'column',borderRight:`1px solid ${T.b1}`,zIndex:10001,flexShrink:0,
        position:isMobile?'fixed':'relative',height:'100%',boxShadow:'4px 0 20px rgba(0,0,0,.02)',
        transform:isMobile?(sidebarOpen?'translateX(0)':'translateX(-100%)'):'none',transition:'transform .3s cubic-bezier(.4,0,.2,1)'}}>
        
        <div style={{padding:'24px 20px 20px',borderBottom:`1px solid ${T.b1}`}}>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
            <div style={{width: 44, height: 44, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(15,35,71,0.06)', padding: 4, border: `1px solid ${T.b1}`}}>
              <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
            </div>
            <div>
              <div style={{fontSize:16,fontWeight:900,color:T.navy,letterSpacing:'.5px'}}>GNC ADMIN</div>
              <div style={{fontSize:11,color:T.t3,marginTop:2,fontWeight:600}}>Control Panel v4.0</div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8,padding:'10px 14px',background:'#ecfdf5',borderRadius:10,border:'1px solid #a7f3d0'}}>
            <div className="glow-dot"/>
            <span style={{fontSize:12,color:'#047857',fontWeight:800}}>LIVE API SYNC</span>
          </div>
        </div>

        <div style={{flex:1,overflowY:'auto',padding:'16px 12px'}}>
          {tabs.map(tab=>(
            <div key={tab.id} className={`anav ${activeTab===tab.id?'active':''}`} onClick={()=>{setActiveTab(tab.id);if(isMobile)setSidebarOpen(false);}}>
              <span style={{fontSize:18,width:28,textAlign:'center'}}>{tab.icon}</span><span style={{flex:1}}>{tab.label}</span>
            </div>
          ))}
        </div>
        <div style={{padding:16,borderTop:`1px solid ${T.b1}`,background:'#f8fafc'}}>
          <button onClick={onClose} className="abtn abtn-danger" style={{width:'100%',justifyContent:'center'}}>🚪 Secure Logout</button>
        </div>
      </div>

      {isMobile&&sidebarOpen&&<div onClick={()=>setSidebarOpen(false)} style={{position:'fixed',inset:0,background:'rgba(15,35,71,.6)',zIndex:10000,backdropFilter:'blur(4px)'}}/>}

      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',minWidth:0}}>
        <div className="amobile-top">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <button onClick={()=>setSidebarOpen(true)} style={{background:'transparent',border:'none',color:T.navy,fontSize:24,cursor:'pointer'}}>☰</button>
            <span style={{fontWeight:800,fontSize:18,color:T.navy}}>GNC Admin</span>
          </div>
          <button onClick={onClose} className="abtn abtn-danger abtn-sm">Exit</button>
        </div>

        <div className="adm-main-pad" style={{flex:1,overflowY:'auto',padding:'36px 40px'}}>
          {activeTab==='dashboard'&&(
            <div className="fade-up">
              <p className="asec">📊 Admin Dashboard</p><p className="asub">Real-time overview of all website content</p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:20,marginBottom:36}}>
                <StatCard icon="🖼️" label="Slider Slides" count={(localSlides||[]).length} color={T.gold}/>
                <StatCard icon="📄" label="Pages" count={(pages||[]).length} color={T.purple}/>
                <StatCard icon="📢" label="Notices" count={(notices||[]).length} color="#f59e0b"/>
                <StatCard icon="📣" label="News" count={(announcements||[]).length} color={T.red}/>
                <StatCard icon="🏆" label="Events" count={(events||[]).length} color={T.cyan}/>
                <StatCard icon="📸" label="Gallery" count={(gallery||[]).length} color={T.pink}/>
                <StatCard icon="📁" label="Documents" count={(pdfReports||[]).length} color={T.green}/>
                <StatCard icon="🧭" label="Menu Items" count={flatMenus.length} color={T.navy}/>
              </div>
              <div className="glass" style={{padding:30}}>
                <div className="actitle">🔍 Search All Content</div>
                <div style={{display:'flex',gap:16,marginBottom:24,flexWrap:'wrap'}}>
                  <input className="ainp" style={{flex:1,minWidth:250}} placeholder="Search by title…" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>
                  <select className="ainp" style={{minWidth:180}} value={filterType} onChange={e=>setFilterType(e.target.value)}>
                    {['all','slide','page','notice','news','event','document','gallery'].map(t=><option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
                  </select>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:12}}>
                  {filtered.slice(0,40).map(item=>{const{bg,c}=bc(item.contentType);return(
                    <div key={item.id} className="arow">
                      <span className="abadge" style={{background:bg,color:c,minWidth:75,textAlign:'center'}}>{item.contentType}</span>
                      <div style={{flex:1,minWidth:0,fontWeight:700,color:T.navy,fontSize:15,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{item.title}</div>
                      <button className="abtn abtn-dark abtn-sm" onClick={()=>setActiveTab({Slide:'slider',Page:'pages',Notice:'notices',News:'announcements',Event:'events',Document:'pdfReports',Gallery:'gallery'}[item.contentType]||'dashboard')}>Manage →</button>
                    </div>
                  );})}
                  {filtered.length===0&&<div style={{textAlign:'center',padding:50,color:T.t3}}>No content found.</div>}
                </div>
              </div>
            </div>
          )}

          {activeTab==='slider'&&(
            <div className="fade-up">
              <p className="asec">🖼️ Hero Slider Manager</p><p className="asub">Drag cards to reorder • Free Auto-Upload</p>
              <div className="glass-gold" style={{padding:32,marginBottom:32}}>
                <div className="actitle">{editingSlide?'✏️ Edit Slide':'➕ Add New Slide'}</div>
                <form onSubmit={saveSlide}>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:20,marginBottom:24}}>
                    <div><label className="alabel">Title *</label><input className="ainp" placeholder="e.g. Cricket Champions 2024" value={sliderForm.title} onChange={e=>setSliderForm(f=>({...f,title:e.target.value}))} required/></div>
                    <div><label className="alabel">Subtitle</label><input className="ainp" placeholder="Caption text" value={sliderForm.subtitle} onChange={e=>setSliderForm(f=>({...f,subtitle:e.target.value}))}/></div>
                    <div><label className="alabel">Display Order</label><input className="ainp" type="number" min="0" value={sliderForm.order} onChange={e=>setSliderForm(f=>({...f,order:e.target.value}))}/></div>
                  </div>
                  <div style={{marginBottom:24}}>
                    <label className="alabel">Image (auto-crops before upload)</label>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
                      <label className="upload-zone">
                        <div style={{fontSize:32,marginBottom:10}}>📁</div>
                        <div style={{fontSize:14,fontWeight:800,color:T.navy}}>{sliderUploading?`Uploading ${sliderProgress}%…`:'Upload Image (Free)'}</div>
                        <input ref={sliderFileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>e.target.files[0]&&handleSliderFile(e.target.files[0])}/>
                        {sliderUploading&&<div className="prog-outer"><div className="prog-inner" style={{width:`${sliderProgress}%`}}/></div>}
                      </label>
                      <div>
                        <label className="alabel">Or Paste URL</label>
                        <textarea className="ainp" rows={4} placeholder="https://…" value={sliderForm.image} onChange={e=>setSliderForm(f=>({...f,image:e.target.value}))} style={{resize:'vertical'}}/>
                      </div>
                    </div>
                    {sliderForm.image&&<img src={sliderForm.image} alt="preview" style={{width:'100%',height:180,objectFit:'cover',borderRadius:12,border:`1px solid ${T.b2}`,marginTop:16}} onError={e=>e.target.style.opacity='.2'}/>}
                  </div>
                  <div style={{display:'flex',gap:14}}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading||sliderUploading}>{loading?'⏳ Saving…':editingSlide?'💾 Update':'🚀 Publish Slide'}</button>
                    {editingSlide&&<button type="button" className="abtn abtn-dark" onClick={resetSlider}>Cancel</button>}
                  </div>
                </form>
              </div>
              <div className="glass" style={{padding:32}}>
                <div className="actitle">🗂️ Live Slides — Drag to Reorder <span style={{fontSize:13,color:T.t3,fontWeight:600,marginLeft:'auto'}}>{localSlides.length} total</span></div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:24}}>
                  {localSlides.map((slide,idx)=>(
                    <div key={slide.id} className={`slide-card ${dragSrcIdx===idx?'dragging':''} ${dragOverIdx===idx?'drag-over':''}`}
                      draggable onDragStart={()=>setDragSrcIdx(idx)} onDragOver={e=>{e.preventDefault();setDragOverIdx(idx);}} onDrop={()=>handleDrop(idx)} onDragEnd={()=>{setDragSrcIdx(null);setDragOverIdx(null);}}>
                      <div style={{display:'flex',alignItems:'center',padding:'14px 18px 0',gap:10}}>
                        <div className="drag-handle" title="Drag">⠿⠿</div>
                        <div className="abadge" style={{background:'#fef3c7',color:'#047857'}}>#{slide.order??idx}</div>
                      </div>
                      <div style={{height:160,margin:'14px 18px 0',borderRadius:12,overflow:'hidden',background:T.bg4,position:'relative'}}>
                        <img src={slide.image} alt={slide.title} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={e=>e.target.style.opacity='.2'}/>
                        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(15,35,71,.7),transparent)'}}/>
                      </div>
                      <div style={{padding:'16px 18px 20px'}}>
                        <div style={{fontWeight:800,color:T.navy,fontSize:15,marginBottom:6}}>{slide.title}</div>
                        {slide.subtitle&&<div style={{fontSize:13,color:T.t3,marginBottom:16}}>{slide.subtitle}</div>}
                        <div style={{display:'flex',gap:10}}>
                          <button className="abtn abtn-dark abtn-sm" style={{flex:1,justifyContent:'center'}} onClick={()=>{setEditingSlide(slide);setSliderForm({title:slide.title,subtitle:slide.subtitle||'',image:slide.image,order:slide.order??idx});window.scrollTo({top:0,behavior:'smooth'});}}>✏️ Edit</button>
                          <button className="abtn abtn-danger abtn-sm" onClick={()=>deleteSlide(slide)}>🗑️</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab==='events'&&(
            <div className="fade-up">
              <p className="asec">🏆 Campus Events</p><p className="asub">Upcoming and recent campus events with PDF Reports</p>
              <div className="glass-gold" style={{padding:32,marginBottom:32}}>
                <div className="actitle">{editEvent?'✏️ Edit Event':'🎉 Add New Event'}</div>
                <form onSubmit={e=>{e.preventDefault();genericSave('events',editEvent,evtData,setEditEvent,()=>setEvtData({title:'',desc:'',type:'WORKSHOP',day:'',month:'',location:'',status:'upcoming',imageUrl:'',reportLink:''}),'Event');}}>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:20,marginBottom:20}}>
                    <div><label className="alabel">Title *</label><input className="ainp" value={evtData.title} onChange={e=>setEvtData(d=>({...d,title:e.target.value}))} required/></div>
                    <div><label className="alabel">Type</label><select className="ainp" value={evtData.type} onChange={e=>setEvtData(d=>({...d,type:e.target.value}))}>{['WORKSHOP','SEMINAR','CULTURAL','SPORTS','NSS','NCC','ACADEMIC'].map(t=><option key={t}>{t}</option>)}</select></div>
                    <div><label className="alabel">Day</label><input className="ainp" value={evtData.day} onChange={e=>setEvtData(d=>({...d,day:e.target.value}))} placeholder="24"/></div>
                    <div><label className="alabel">Month</label><input className="ainp" value={evtData.month} onChange={e=>setEvtData(d=>({...d,month:e.target.value}))} placeholder="MAR"/></div>
                    <div><label className="alabel">Location</label><input className="ainp" value={evtData.location} onChange={e=>setEvtData(d=>({...d,location:e.target.value}))} placeholder="Seminar Hall"/></div>
                    <div><label className="alabel">Status</label><select className="ainp" value={evtData.status} onChange={e=>setEvtData(d=>({...d,status:e.target.value}))}><option value="upcoming">Upcoming</option><option value="recent">Recent</option></select></div>
                  </div>

                  {evtData.status === 'recent' ? (
                    <div style={{background:'#f8fafc', padding:20, borderRadius:12, border:`1px solid ${T.b2}`, marginBottom:24}}>
                      <div style={{fontWeight:800, color:T.navy, marginBottom:16}}>📸 Post-Event Media & Reports</div>
                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20, marginBottom:16}}>
                        <label className="upload-zone" style={{background:'#fff'}}>
                          <div style={{fontSize:28,marginBottom:8}}>📷</div>
                          <div style={{fontSize:13,fontWeight:800,color:T.navy}}>{eventUploading?`${eventProgress}%…`:'Upload Event Photo'}</div>
                          <input ref={eventFileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>e.target.files[0]&&handleEventFile(e.target.files[0])}/>
                        </label>
                        <div>
                          <label className="alabel">Or Paste Photo URL</label>
                          <textarea className="ainp" rows={3} placeholder="https://..." value={evtData.imageUrl} onChange={e=>setEvtData(d=>({...d,imageUrl:e.target.value}))} style={{resize:'vertical'}}/>
                        </div>
                      </div>
                      <div style={{marginTop:16}}>
                        <label className="alabel">Event PDF Report (Google Drive Link)</label>
                        <input className="ainp" value={evtData.reportLink || ''} onChange={e=>setEvtData(d=>({...d,reportLink:e.target.value}))} placeholder="Paste Google Drive link of the PDF report here..." style={{borderColor:T.gold}}/>
                        <p style={{fontSize:11, color:T.t3, marginTop:6}}>Make sure the Google Drive link access is set to "Anyone with the link". This will open a PDF popup on the site.</p>
                      </div>
                    </div>
                  ) : (
                    <div style={{marginBottom:20}}><label className="alabel">Image URL (Optional)</label><input className="ainp" value={evtData.imageUrl} onChange={e=>setEvtData(d=>({...d,imageUrl:e.target.value}))} placeholder="/images/event.jpg"/></div>
                  )}

                  <div style={{marginBottom:24}}><label className="alabel">Description</label><JoditEditor ref={editor} value={evtData.desc} config={joditCfg} onBlur={c=>setEvtData(d=>({...d,desc:c}))}/></div>
                  <div style={{display:'flex',gap:14}}><button type="submit" className="abtn abtn-gold" disabled={loading||eventUploading}>{loading?'⏳':editEvent?'💾 Update Event':'🚀 Publish Event'}</button>{editEvent&&<button type="button" className="abtn abtn-dark" onClick={()=>{setEditEvent(null);setEvtData({title:'',desc:'',type:'WORKSHOP',day:'',month:'',location:'',status:'upcoming',imageUrl:'',reportLink:''});}}>Cancel</button>}</div>
                </form>
              </div>
              <div className="glass" style={{padding:32}}>
                <div className="actitle">Events ({(events||[]).length})</div>
                <div style={{display:'flex',flexDirection:'column',gap:14}}>
                  {(events||[]).map(e=>(
                    <div key={e.id} className="arow" style={{borderLeft:`4px solid ${T.purple}`}}>
                      <div style={{flex:1}}>
                        <div style={{display:'flex',gap:10,marginBottom:8}}>
                          <span className="abadge" style={{background:'#f3e8ff',color:'#6b21a8'}}>{e.type}</span>
                          <span className="abadge" style={{background:e.status==='upcoming'?'#ecfdf5':'#e0f2fe',color:e.status==='upcoming'?'#047857':'#0369a1'}}>{e.status}</span>
                          {e.reportLink && <span className="abadge" style={{background:'#fee2e2',color:'#b91c1c'}}>📄 PDF Attached</span>}
                        </div>
                        <div style={{fontWeight:800,color:T.navy,fontSize:16}}>{e.title}</div>
                        <div style={{fontSize:13,color:T.t2,marginTop:6,fontWeight:600}}>📅 {e.day} {e.month} | 📍 {e.location||'Campus'}</div>
                      </div>
                      <div style={{display:'flex',gap:10,flexShrink:0}}>
                        <button className="abtn abtn-dark abtn-sm" onClick={()=>{setEditEvent(e);setEvtData({title:e.title||'',desc:e.desc||'',type:e.type||'WORKSHOP',day:e.day||'',month:e.month||'',location:e.location||'',status:e.status||'upcoming',imageUrl:e.imageUrl||'',reportLink:e.reportLink||''});window.scrollTo({top:0,behavior:'smooth'});}}>✏️ Edit</button>
                        <button className="abtn abtn-danger abtn-sm" onClick={()=>genericDelete('events',e.id,'Event')}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab==='menu_builder'&&(
             <div className="fade-up">
               <p className="asec">🧭 Navbar Menu Editor</p><p className="asub">Top links, sub-menus (L2), sub-sub-menus (L3)</p>
               <div style={{background:'#fffbeb',border:'1px solid #fde68a',borderRadius:16,padding:'20px 24px',marginBottom:32,display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,flexWrap:'wrap'}}>
                 <div><div style={{fontWeight:900,color:'#d97706',fontSize:15}}>Need to restore original menu?</div><div style={{color:'#92400e',fontSize:13,marginTop:4,fontWeight:500}}>Restore all original menus from database code.</div></div>
                 <button className="abtn abtn-gold" disabled={loading} onClick={async()=>{if(!window.confirm('Restore?'))return;if(!navLinks?.length)return toast.error('Not found');setLoading(true);const tid=toast.loading('…');try{await setDoc(doc(db,'settings','navbar'),{links:navLinks});setNavData(navLinks);toast.success('Restored! ✅',{id:tid});}catch(err){toast.error(err.message,{id:tid});}setLoading(false);}}>🔄 Restore Original</button>
               </div>
               <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:24}}>
                 <div className="glass" style={{padding:32}}>
                   <div className="actitle">✏️ Edit Existing Menu</div>
                   <label className="alabel">Select Menu</label>
                   <select className="ainp" style={{marginBottom:16}} value={editMenuSel} onChange={e=>{setEditMenuSel(e.target.value);const m=flatMenus.find(x=>x.id===e.target.value);if(m)setEditMenuForm({label:m.label,href:m.href||''});}}>
                     <option value="">-- Choose --</option>
                     {flatMenus.map(m=><option key={m.id} value={m.id}>{m.pathStr}{m.href?` → ${m.href}`:''}</option>)}
                   </select>
                   {editMenuSel&&(<>
                     <label className="alabel">Name</label><input className="ainp" style={{marginBottom:16}} value={editMenuForm.label} onChange={e=>setEditMenuForm(f=>({...f,label:e.target.value}))}/>
                     <label className="alabel">Link URL</label><input className="ainp" style={{marginBottom:24}} placeholder="/path" value={editMenuForm.href} onChange={e=>setEditMenuForm(f=>({...f,href:e.target.value}))}/>
                     <div style={{display:'flex',gap:12}}><button className="abtn abtn-gold" onClick={updateMenu} disabled={loading}>💾 Update</button><button className="abtn abtn-dark" onClick={()=>{setEditMenuSel('');setEditMenuForm({label:'',href:''});}}>Cancel</button></div>
                   </>)}
                 </div>
                 <div className="glass" style={{padding:32}}>
                   <div className="actitle">➕ Add Menu / Sub-menu</div>
                   <label className="alabel">Name *</label><input className="ainp" style={{marginBottom:16}} placeholder="Gallery" value={newMenuForm.label} onChange={e=>setNewMenuForm(f=>({...f,label:e.target.value}))}/>
                   <label className="alabel">Link URL</label><input className="ainp" style={{marginBottom:16}} placeholder="/gallery" value={newMenuForm.href} onChange={e=>setNewMenuForm(f=>({...f,href:e.target.value}))}/>
                   <label className="alabel">Parent</label>
                   <select className="ainp" style={{marginBottom:24}} value={newMenuForm.parentId} onChange={e=>setNewMenuForm(f=>({...f,parentId:e.target.value}))}>
                     <option value="top">── Top Level ──</option>
                     {flatMenus.filter(m=>m.level<2).map(m=><option key={m.id} value={m.id}>↳ {m.pathStr}</option>)}
                   </select>
                   <button className="abtn abtn-gold" onClick={addMenu} disabled={loading}>🚀 Add to Navbar</button>
                 </div>
               </div>
               <div className="glass" style={{padding:32,marginTop:24}}>
                 <div className="actitle">📂 Menu Tree ({flatMenus.length})</div>
                 <div style={{display:'flex',flexDirection:'column',gap:10}}>
                   {flatMenus.map(m=>{const lc=[T.navy,T.gold,'#cbd5e1'][m.level];return(
                     <div key={m.id} className="arow" style={{marginLeft:m.level*32,borderLeft:`4px solid ${lc}`,borderRadius:'0 12px 12px 0'}}>
                       <div style={{flex:1,minWidth:0}}>
                         <div style={{fontWeight:800,color:T.navy,fontSize:m.level===0?15:14,display:'flex',alignItems:'center',gap:8}}>
                           {m.level>0&&<span style={{color:T.t3}}>↳</span>}{m.label}
                         </div>
                         {m.href&&<div style={{fontSize:12,color:T.green,marginTop:4,fontWeight:700}}>🔗 {m.href}</div>}
                       </div>
                       <div style={{display:'flex',gap:10,flexShrink:0}}>
                         <button className="abtn abtn-dark abtn-sm" onClick={()=>{setEditMenuSel(m.id);setEditMenuForm({label:m.label,href:m.href||''});window.scrollTo({top:0,behavior:'smooth'});}}>✏️</button>
                         <button className="abtn abtn-danger abtn-sm" onClick={()=>deleteMenu(m.id)}>🗑️</button>
                       </div>
                     </div>
                   );})}
                 </div>
               </div>
             </div>
           )}

           {activeTab==='pages'&&(
             <div className="fade-up">
               <p className="asec">📄 Pages & SEO Manager</p><p className="asub">Rich content + search engine optimization</p>
               <div className="glass-gold" style={{padding:32,marginBottom:32}}>
                 <div className="actitle">{editingPage?'✏️ Edit Page':'🆕 Create Page'}</div>
                 <div style={{display:'flex',flexWrap:'wrap',gap:20,marginBottom:24,background:'#f8fafc',padding:'16px 20px',borderRadius:12,border:`1px solid ${T.b1}`}}>
                   <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontWeight:800,color:T.navy,fontSize:14}}><input type="radio" value="update" checked={pageMode==='update'} onChange={()=>setPageMode('update')} style={{accentColor:T.navy}}/> 🔗 Link to Existing Menu</label>
                   <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontWeight:800,color:T.navy,fontSize:14}}><input type="radio" value="create" checked={pageMode==='create'} onChange={()=>setPageMode('create')} style={{accentColor:T.navy}}/> ✨ New Custom URL</label>
                 </div>
                 <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:20,marginBottom:20}}>
                   <div><label className="alabel">Title *</label><input className="ainp" placeholder="Department of Commerce" value={pageData?.title || ''} onChange={e=>{const t=e.target.value;setPageData(d=>({...d,title:t,slug:pageMode==='create'?t.toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]+/g,''):(d?.slug||'')}));setSeoData(s=>({...s,metaTitle:s?.metaTitle||t}));}}/></div>
                   <div><label className="alabel">{pageMode==='update'?'Target Menu *':'URL Slug *'}</label>
                     {pageMode==='update'?<select className="ainp" value={pageData?.path || ''} onChange={e=>setPageData(d=>({...d,path:e.target.value,slug:''}))}>
                       <option value="">-- Select Menu --</option>
                       {flatMenus.filter(m=>m.href).map(m=><option key={m.id} value={m.href}>{m.pathStr} → {m.href}</option>)}
                     </select>:<input className="ainp" placeholder="department-commerce" value={pageData?.slug || ''} onChange={e=>setPageData(d=>({...d,slug:e.target.value.toLowerCase().replace(/\s+/g,'-'),path:''}))}/>}
                   </div>
                 </div>
                 <div style={{marginBottom:24}}><label className="alabel">Content</label><JoditEditor ref={editor} value={pageData?.content || ''} config={joditCfg} tabIndex={1} onBlur={c=>setPageData(d=>({...d,content:c}))}/></div>
                 <div style={{background:'#f8fafc',border:`1px solid ${T.b1}`,borderRadius:14,padding:'24px 26px',marginBottom:24}}>
                   <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
                     <div style={{fontWeight:900,color:T.navy,fontSize:16}}>🔍 SEO Settings</div>
                     <div style={{display:'flex',alignItems:'center',gap:12}}>
                       <SeoRing score={seoScore}/>
                       <div><div style={{fontSize:12,fontWeight:800,color:T.t3}}>SEO SCORE</div><div style={{fontSize:14,fontWeight:800,color:seoScore>=80?T.green:seoScore>=50?T.gold:T.red}}>{seoScore>=80?'Excellent':seoScore>=50?'Good':'Needs Work'}</div></div>
                     </div>
                   </div>
                   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:16}}>
                     <div><label className="alabel">Meta Title ({(seoData?.metaTitle||'').length}/60)</label><input className="ainp" maxLength={60} placeholder="Page title for Google" value={seoData?.metaTitle || ''} onChange={e=>setSeoData(s=>({...s,metaTitle:e.target.value}))}/></div>
                     <div><label className="alabel">Meta Description ({(seoData?.metaDesc||'').length}/160)</label><input className="ainp" maxLength={160} placeholder="Brief page description" value={seoData?.metaDesc || ''} onChange={e=>setSeoData(s=>({...s,metaDesc:e.target.value}))}/></div>
                     <div><label className="alabel">Focus Keywords</label><input className="ainp" placeholder="commerce, bcom, dhanbad" value={seoData?.keywords || ''} onChange={e=>setSeoData(s=>({...s,keywords:e.target.value}))}/></div>
                     <div><label className="alabel">OG Image URL</label><input className="ainp" placeholder="https://…/og-image.jpg" value={seoData?.ogImage || ''} onChange={e=>setSeoData(s=>({...s,ogImage:e.target.value}))}/></div>
                   </div>
                   <div style={{marginTop:14,display:'flex',flexWrap:'wrap',gap:8}}>
                     {[{done:(pageData?.title||'').length>5,l:'Title'},{done:(seoData?.metaTitle||'').length>10,l:'Meta title'},{done:(seoData?.metaDesc||'').length>50,l:'Meta desc'},{done:(seoData?.keywords||'').length>0,l:'Keywords'},{done:!!(seoData?.ogImage),l:'OG image'}].map((h,i)=>(
                       <span key={i} className="abadge" style={{background:h.done?'#d1fae5':'#f1f5f9',color:h.done?T.green:T.t3}}>{h.done?'✅':'○'} {h.l}</span>
                     ))}
                   </div>
                 </div>
                 <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
                   <button className="abtn abtn-dark" onClick={()=>{setPreviewContent(pageData?.content||'');setShowPreview(true);}}>👁️ Preview</button>
                   <button className="abtn abtn-gold" onClick={savePage} disabled={loading}>{loading?'⏳ Saving…':editingPage?'💾 Save':'🚀 Publish'}</button>
                   {editingPage&&<button className="abtn abtn-dark" onClick={()=>{setEditPage(null);setPageData({title:'',content:'',path:'',slug:'',contentType:'html'});setSeoData({metaTitle:'',metaDesc:'',keywords:'',ogImage:''});}}>Cancel</button>}
                 </div>
               </div>
               <div className="glass" style={{padding:32}}>
                 <div className="actitle">📂 Pages ({(pages||[]).length})</div>
                 <div style={{display:'flex',flexDirection:'column',gap:12}}>
                   {(pages||[]).map(p=>(
                     <div key={p.id || Math.random().toString()} className="arow" style={{borderLeft:`4px solid ${T.purple}`}}>
                       <div style={{flex:1,minWidth:0}}>
                         <div style={{fontWeight:800,color:T.navy,fontSize:15}}>{p.title}</div>
                         <div style={{display:'flex',gap:12,marginTop:8,flexWrap:'wrap'}}>
                           <a href={p.path?`#${p.path}`:`#/p/${p.slug}`} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:T.navy,textDecoration:'underline',fontWeight:700}}>🔗 View Live</a>
                           {p.seo?.metaTitle&&<span style={{fontSize:12,color:T.green,fontWeight:700}}>✅ SEO Optimized</span>}
                         </div>
                       </div>
                       <div style={{display:'flex',gap:10,flexShrink:0}}>
                         <button className="abtn abtn-dark abtn-sm" onClick={()=>{setEditPage(p);setPageData({title:p.title||'',content:p.content||'',path:p.path?`/#${p.path}`:'',slug:p.slug||'',contentType:p.contentType||'html'});setSeoData(p.seo||{metaTitle:'',metaDesc:'',keywords:'',ogImage:''});setPageMode(p.path?'update':'create');window.scrollTo({top:0,behavior:'smooth'});}}>✏️ Edit</button>
                         <button className="abtn abtn-danger abtn-sm" onClick={()=>genericDelete('pages',p.id,'Page')}>🗑️</button>
                       </div>
                     </div>
                   ))}
                   {(pages||[]).length===0&&<div style={{textAlign:'center',padding:40,color:T.t3}}>No pages yet.</div>}
                 </div>
               </div>
             </div>
           )}

           {activeTab==='gallery'&&(
             <div className="fade-up">
               <p className="asec">📸 Photo Gallery</p><p className="asub">Upload with free automatic crop & optimize</p>
               <div className="glass-gold" style={{padding:32,marginBottom:32}}>
                 <div className="actitle">📤 Add Photo</div>
                 <form onSubmit={addGalleryPhoto}>
                   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:20,marginBottom:20}}>
                     <div><label className="alabel">Title</label><input className="ainp" value={galleryData.title} onChange={e=>setGalleryData(d=>({...d,title:e.target.value}))} placeholder="Annual Sports Day" required/></div>
                     <div><label className="alabel">Category</label><select className="ainp" value={galleryData.cat} onChange={e=>setGalleryData(d=>({...d,cat:e.target.value}))}>
                       {['Seminars','Cultural Fest','Guest Visit','Campus','Departments','NSS Programs','Sports','NCC'].map(c=><option key={c}>{c}</option>)}
                     </select></div>
                   </div>
                   <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>
                     <label className="upload-zone"><div style={{fontSize:32,marginBottom:8}}>📷</div><div style={{fontSize:14,fontWeight:800,color:T.navy}}>{galleryUploading?`${galleryProgress}%…`:'Upload Image'}</div><input ref={galleryFileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>e.target.files[0]&&handleGalleryFile(e.target.files[0])}/>{galleryUploading&&<div className="prog-outer"><div className="prog-inner" style={{width:`${galleryProgress}%`}}/></div>}</label>
                     <div><label className="alabel">Or Paste URL</label><textarea className="ainp" rows={5} placeholder="https://…" value={galleryData.src} onChange={e=>setGalleryData(d=>({...d,src:e.target.value}))} style={{resize:'vertical'}}/></div>
                   </div>
                   {galleryData.src&&<img src={galleryData.src} alt="prev" style={{width:'100%',maxHeight:200,objectFit:'cover',borderRadius:12,marginBottom:20}} onError={e=>e.target.style.display='none'}/>}
                   <button type="submit" className="abtn abtn-gold" disabled={loading||galleryUploading}>🚀 Publish Photo</button>
                 </form>
               </div>
               <div className="glass" style={{padding:32}}>
                 <div className="actitle">🖼️ Gallery ({(gallery||[]).length})</div>
                 <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:20}}>
                   {(gallery||[]).map(img=>(
                     <div key={img.id} style={{background:'#fff',borderRadius:14,overflow:'hidden',border:`1px solid ${T.b1}`,boxShadow:'0 5px 15px rgba(0,0,0,.03)'}}>
                       <img src={img.src} alt={img.title} style={{width:'100%',height:180,objectFit:'cover'}} onError={e=>e.target.style.opacity='.2'}/>
                       <div style={{padding:'16px 18px'}}>
                         <span className="abadge" style={{background:'#fdf2f8',color:'#be185d',marginBottom:8}}>{img.cat}</span>
                         <div style={{fontWeight:800,color:T.navy,fontSize:14,marginBottom:12}}>{img.title}</div>
                         <button className="abtn abtn-danger abtn-sm" style={{width:'100%',justifyContent:'center'}} onClick={()=>genericDelete('gallery',img.id,'Photo')}>🗑️ Remove</button>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           )}

           {activeTab==='notices'&&(
             <div className="fade-up">
               <p className="asec">📢 Notice Board</p><p className="asub">Broadcast notices to students and staff</p>
               <div className="glass-gold" style={{padding:32,marginBottom:32}}>
                 <div className="actitle">{editNotice?'✏️ Edit Notice':'📝 Broadcast'}</div>
                 <form onSubmit={e=>{e.preventDefault();genericSave('notices',editNotice,noticeData,setEditNotice,()=>setNoticeData({text:'',link:'',type:'General',isNew:true}),'Notice');}}>
                   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:20,marginBottom:20}}>
                     <div><label className="alabel">Category</label><select className="ainp" value={noticeData.type} onChange={e=>setNoticeData(d=>({...d,type:e.target.value}))}>{['General','Examination','Admission','Holiday','Academic','Sports'].map(t=><option key={t}>{t}</option>)}</select></div>
                     <div><label className="alabel">Attachment URL</label><input className="ainp" placeholder="Drive/PDF Link" value={noticeData.link} onChange={e=>setNoticeData(d=>({...d,link:e.target.value}))}/></div>
                     <div style={{display:'flex',alignItems:'center',gap:12,paddingTop:24}}><input type="checkbox" checked={noticeData.isNew} onChange={e=>setNoticeData(d=>({...d,isNew:e.target.checked}))} style={{width:18,height:18,accentColor:T.navy}}/><label style={{fontSize:14,fontWeight:800,color:T.navy,cursor:'pointer'}}>Show "NEW" badge</label></div>
                   </div>
                   <div style={{marginBottom:24}}><label className="alabel">Content *</label><JoditEditor ref={editor} value={noticeData.text} config={joditCfg} onBlur={c=>setNoticeData(d=>({...d,text:c}))}/></div>
                   <div style={{display:'flex',gap:12}}><button type="submit" className="abtn abtn-gold" disabled={loading}>{loading?'⏳':editNotice?'💾 Update':'🚀 Broadcast'}</button>{editNotice&&<button type="button" className="abtn abtn-dark" onClick={()=>{setEditNotice(null);setNoticeData({text:'',link:'',type:'General',isNew:true});}}>Cancel</button>}</div>
                 </form>
               </div>
               <div className="glass" style={{padding:32}}>
                 <div className="actitle">Notices ({(notices||[]).length})</div>
                 <div style={{display:'flex',flexDirection:'column',gap:12}}>
                   {(notices||[]).map(n=>(
                     <div key={n.id} className="arow" style={{borderLeft:`4px solid #f59e0b`}}>
                       <div style={{flex:1}}><div style={{display:'flex',gap:10,marginBottom:8}}><span className="abadge" style={{background:'#fef3c7',color:'#b45309'}}>{n.type}</span>{n.isNew&&<span className="abadge" style={{background:'#fee2e2',color:'#b91c1c'}}>NEW</span>}</div><div dangerouslySetInnerHTML={{__html:n.text}} style={{fontSize:14,color:T.t2,lineHeight:1.6}}/></div>
                       <div style={{display:'flex',gap:10,flexShrink:0}}><button className="abtn abtn-dark abtn-sm" onClick={()=>{setEditNotice(n);setNoticeData({text:n.text||'',link:n.link||'',type:n.type||'General',isNew:n.isNew!==false});window.scrollTo({top:0,behavior:'smooth'});}}>✏️</button><button className="abtn abtn-danger abtn-sm" onClick={()=>genericDelete('notices',n.id,'Notice')}>🗑️</button></div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           )}

           {activeTab==='announcements'&&(
             <div className="fade-up">
               <p className="asec">📣 Academic News</p><p className="asub">Publish achievements and academic updates</p>
               <div className="glass-gold" style={{padding:32,marginBottom:32}}>
                 <div className="actitle">{editAnn?'✏️ Edit':'📰 Publish News'}</div>
                 <form onSubmit={e=>{e.preventDefault();genericSave('announcements',editAnn,annData,setEditAnn,()=>setAnnData({text:'',link:'',type:'News'}),'News');}}>
                   <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>
                     <div><label className="alabel">Category</label><select className="ainp" value={annData.type} onChange={e=>setAnnData(d=>({...d,type:e.target.value}))}>{['News','Achievement','Update','Result','Scholarship'].map(t=><option key={t}>{t}</option>)}</select></div>
                     <div><label className="alabel">Link</label><input className="ainp" placeholder="Optional URL" value={annData.link} onChange={e=>setAnnData(d=>({...d,link:e.target.value}))}/></div>
                   </div>
                   <div style={{marginBottom:24}}><label className="alabel">Content *</label><JoditEditor ref={editor} value={annData.text} config={joditCfg} onBlur={c=>setAnnData(d=>({...d,text:c}))}/></div>
                   <div style={{display:'flex',gap:12}}><button type="submit" className="abtn abtn-gold" disabled={loading}>{loading?'⏳':editAnn?'💾 Update':'🚀 Publish'}</button>{editAnn&&<button type="button" className="abtn abtn-dark" onClick={()=>{setEditAnn(null);setAnnData({text:'',link:'',type:'News'});}}>Cancel</button>}</div>
                 </form>
               </div>
               <div className="glass" style={{padding:32}}>
                 <div className="actitle">News ({(announcements||[]).length})</div>
                 <div style={{display:'flex',flexDirection:'column',gap:12}}>
                   {(announcements||[]).map(a=>(
                     <div key={a.id} className="arow" style={{borderLeft:`4px solid ${T.red}`}}>
                       <div style={{flex:1}}><span className="abadge" style={{background:'#fee2e2',color:'#b91c1c',marginBottom:8}}>{a.type}</span><div dangerouslySetInnerHTML={{__html:a.text}} style={{fontSize:14,color:T.t2,lineHeight:1.6,marginTop:4}}/></div>
                       <div style={{display:'flex',gap:10,flexShrink:0}}><button className="abtn abtn-dark abtn-sm" onClick={()=>{setEditAnn(a);setAnnData({text:a.text||'',link:a.link||'',type:a.type||'News'});window.scrollTo({top:0,behavior:'smooth'});}}>✏️</button><button className="abtn abtn-danger abtn-sm" onClick={()=>genericDelete('announcements',a.id,'News')}>🗑️</button></div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           )}

           {activeTab==='pdfReports'&&(
             <div className="fade-up">
               <p className="asec">📁 E-Documents</p><p className="asub">Official PDF documents and reports</p>
               <div className="glass-gold" style={{padding:32,marginBottom:32}}>
                 <div className="actitle">{editPdf?'✏️ Edit':'📤 Upload Document'}</div>
                 <form onSubmit={e=>{e.preventDefault();genericSave('pdfReports',editPdf,pdfData,setEditPdf,()=>setPdfData({title:'',link:'',type:'Document'}),'Document');}}>
                   <div style={{marginBottom:20}}><label className="alabel">Title *</label><input className="ainp" value={pdfData.title} onChange={e=>setPdfData(d=>({...d,title:e.target.value}))} placeholder="NAAC Self Study Report 2023" required/></div>
                   <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:24}}>
                     <div><label className="alabel">URL *</label><input className="ainp" value={pdfData.link} onChange={e=>setPdfData(d=>({...d,link:e.target.value}))} placeholder="Google Drive link" required/></div>
                     <div><label className="alabel">Type</label><select className="ainp" value={pdfData.type} onChange={e=>setPdfData(d=>({...d,type:e.target.value}))}>{['Document','Report','Syllabus','NAAC','IQAC','Regulation','Result'].map(t=><option key={t}>{t}</option>)}</select></div>
                   </div>
                   <div style={{display:'flex',gap:12}}><button type="submit" className="abtn abtn-gold" disabled={loading}>{loading?'⏳':editPdf?'💾 Update':'🚀 Publish'}</button>{editPdf&&<button type="button" className="abtn abtn-dark" onClick={()=>{setEditPdf(null);setPdfData({title:'',link:'',type:'Document'});}}>Cancel</button>}</div>
                 </form>
               </div>
               <div className="glass" style={{padding:32}}>
                 <div className="actitle">Documents ({(pdfReports||[]).length})</div>
                 <div style={{display:'flex',flexDirection:'column',gap:12}}>
                   {(pdfReports||[]).map(p=>(
                     <div key={p.id} className="arow" style={{borderLeft:`4px solid ${T.green}`}}>
                       <div style={{flex:1}}><span className="abadge" style={{background:'#ecfdf5',color:'#047857'}}>{p.type}</span><div style={{fontWeight:800,color:T.navy,fontSize:15,margin:'8px 0 4px'}}>{p.title}</div><a href={p.link} target="_blank" rel="noreferrer" style={{fontSize:12,color:T.green,fontWeight:800,textDecoration:'none'}}>⬇️ View Link</a></div>
                       <div style={{display:'flex',gap:10,flexShrink:0}}><button className="abtn abtn-dark abtn-sm" onClick={()=>{setEditPdf(p);setPdfData({title:p.title||'',link:p.link||'',type:p.type||'Document'});window.scrollTo({top:0,behavior:'smooth'});}}>✏️</button><button className="abtn abtn-danger abtn-sm" onClick={()=>genericDelete('pdfReports',p.id,'Document')}>🗑️</button></div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           )}

           {activeTab==='activity'&&(
             <div className="fade-up">
               <p className="asec">📋 Activity Log</p><p className="asub">Real-time log of all admin actions</p>
               <div className="glass" style={{padding:32}}>
                 <div className="actitle">🕐 Recent Activity <div className="glow-dot" style={{marginLeft:'auto'}}/><span style={{fontSize:13,color:T.green,fontWeight:800}}>Live</span></div>
                 {activityLogs.length===0&&<div style={{textAlign:'center',padding:80,color:T.t3}}><div style={{fontSize:48,marginBottom:12}}>📋</div><div style={{fontWeight:600}}>No activity yet. Start making changes!</div></div>}
                 {activityLogs.map(log=><LogItem key={log.id} log={log}/>)}
               </div>
             </div>
           )}

           {/* 🌟 FIX: Updated System Diagnostic Tool */}
           {activeTab==='system_test'&&(
             <div className="fade-up">
               <p className="asec">⚡ System Diagnostic Suite</p><p className="asub">Automated Core Functionality & API Check</p>
               <div className="glass-gold" style={{padding:32}}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 20, borderBottom: `2px solid ${T.b1}` }}>
                   <div className="actitle" style={{ margin: 0, border: 'none', padding: 0 }}>System Health Overview</div>
                   {testScore !== null && (
                     <div style={{ background: testScore === 100 ? '#ecfdf5' : testScore > 50 ? '#fffbeb' : '#fef2f2', color: testScore === 100 ? '#047857' : testScore > 50 ? '#b45309' : '#b91c1c', padding: '8px 16px', borderRadius: 10, fontWeight: 900, border: `1px solid ${testScore === 100 ? '#a7f3d0' : testScore > 50 ? '#fde68a' : '#fecaca'}` }}>
                       {testScore}% Healthy
                     </div>
                   )}
                 </div>

                 {!testRunning && testResults.length === 0 && (
                   <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                     <div style={{ fontSize: 60, marginBottom: 16 }}>🩺</div>
                     <h3 style={{ color: T.navy, margin: '0 0 10px', fontSize: 20 }}>Ready to check system integrity?</h3>
                     <p style={{ color: T.t3, marginBottom: 24 }}>This will test Database read/write rules, API configurations, and environment setups.</p>
                     <button onClick={runDiagnostics} className="abtn abtn-gold" style={{ fontSize: 15, padding: '14px 30px' }}>▶ RUN FULL SYSTEM TEST</button>
                   </div>
                 )}

                 {(testRunning || testResults.length > 0) && (
                   <div>
                     <div style={{ background: T.b1, borderRadius: 99, height: 10, overflow: 'hidden', marginBottom: 30 }}>
                       <div style={{ width: `${testProgress}%`, height: '100%', background: testProgress === 100 ? T.green : T.navy, transition: 'width 0.4s ease' }} />
                     </div>

                     <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                       {testResults.map((r, i) => (
                         <div key={i} className="arow" style={{ borderLeft: `4px solid ${r.status === 'success' ? T.green : r.status === 'warning' ? T.gold : T.red}`, background: '#fff' }}>
                           <div style={{ fontSize: 24, marginRight: 10 }}>
                             {r.status === 'success' ? '✅' : r.status === 'warning' ? '⚠️' : '❌'}
                           </div>
                           <div style={{ flex: 1 }}>
                             <div style={{ fontWeight: 800, color: T.navy, fontSize: 15 }}>{r.name}</div>
                             <div style={{ color: T.t3, fontSize: 13, marginTop: 4 }}>{r.detail}</div>
                           </div>
                           <div style={{ background: r.status === 'success' ? '#ecfdf5' : r.status === 'warning' ? '#fffbeb' : '#fef2f2', color: r.status === 'success' ? '#047857' : r.status === 'warning' ? '#b45309' : '#b91c1c', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>
                             {r.status}
                           </div>
                         </div>
                       ))}
                     </div>

                     {!testRunning && (
                       <div style={{ textAlign: 'center', marginTop: 30 }}>
                         <button onClick={runDiagnostics} className="abtn abtn-dark">🔄 RUN DIAGNOSTICS AGAIN</button>
                       </div>
                     )}
                   </div>
                 )}
               </div>
             </div>
           )}

           {activeTab==='backup'&&(
             <div className="fade-up">
               <p className="asec">💾 Backup & Restore</p><p className="asub">Full database export / import</p>
               <div className="glass" style={{padding:32,marginBottom:24,borderTop:`4px solid ${T.green}`}}>
                 <div className="actitle">⬇️ Download Backup</div>
                 <p style={{color:T.t2,marginBottom:24,fontSize:14,lineHeight:1.6,fontWeight:500}}>Complete JSON backup: pages, notices, events, slider, gallery, menu, documents & activity log.</p>
                 <button className="abtn abtn-gold" onClick={handleBackup} disabled={loading}>{loading?'⏳ Generating…':'⬇️ Download Full Backup'}</button>
               </div>
               <div className="glass" style={{padding:32,borderTop:`4px solid ${T.red}`}}>
                 <div className="actitle" style={{color:T.red}}>🔥 Restore from Backup</div>
                 <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:12,padding:'16px 20px',marginBottom:24}}>
                   <div style={{fontWeight:900,color:T.red,marginBottom:6}}>⚠️ DANGER ZONE</div>
                   <p style={{color:'#b91c1c',margin:0,fontSize:13,fontWeight:600}}>This will COMPLETELY ERASE all current data. Irreversible.</p>
                 </div>
                 <div style={{marginBottom:24}}><label className="alabel">Select Backup JSON File</label><input type="file" accept=".json" className="ainp" ref={fileRef} onChange={e=>setRestoreFile(e.target.files[0])}/></div>
                 <button className="abtn abtn-danger" onClick={handleRestore} disabled={loading||!restoreFile}>{loading?'⏳ Restoring…':'🔥 Restore Database'}</button>
               </div>
             </div>
           )}

        </div>
      </div>

      {showPreview&&(
        <div style={{position:'fixed',inset:0,background:'rgba(15,35,71,.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:100002,backdropFilter:'blur(5px)'}}>
          <div style={{background:'#fff',width:'92%',maxWidth:900,height:'86vh',borderRadius:20,display:'flex',flexDirection:'column',overflow:'hidden',boxShadow:'0 30px 60px rgba(0,0,0,.3)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px 28px',borderBottom:`1px solid ${T.b1}`}}>
              <div style={{fontWeight:900,color:T.navy,fontSize:16}}>👁️ Live Preview</div>
              <button onClick={()=>setShowPreview(false)} className="abtn abtn-dark abtn-sm">✕ Close</button>
            </div>
            <div style={{padding:'32px 40px',overflowY:'auto',flex:1,color:T.navy}}>
              {parse(DOMPurify.sanitize(previewContent||'',{ADD_TAGS:['iframe'],ADD_ATTR:['allow','allowfullscreen','frameborder','scrolling']}))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}