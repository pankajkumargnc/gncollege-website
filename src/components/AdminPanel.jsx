// GNC COLLEGE — ADMIN PANEL v8.0
// 🎨 Blue Gradient Dark Theme | YouTube | Drive | 12-Test PDF Report
// Replace: src/components/AdminPanel.jsx

import React, { useState, useRef, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import JoditEditor from 'jodit-react';
import { COLORS } from '../styles/colors';
import { db } from '../firebase';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import {
  collection, addDoc, serverTimestamp, doc, deleteDoc,
  updateDoc, setDoc, getDoc, onSnapshot, query, orderBy,
  getDocs, writeBatch, limit
} from 'firebase/firestore';
import toast from 'react-hot-toast';

const ImageCropper = lazy(() => import('./ImageCropper'));

function useDebounce(value, delay) {
  const [v, setV] = useState(value);
  useEffect(() => { const h = setTimeout(() => setV(value), delay); return () => clearTimeout(h); }, [value, delay]);
  return v;
}

// ── 🎨 BLUE DARK GRADIENT THEME ──────────────────────────────────────────────
const T = {
  bg0: '#030b1a', bg1: '#060f24', bg2: 'linear-gradient(145deg,#030b1a 0%,#07122a 100%)',
  bg3: '#091430', bg4: '#0c1838',
  b1: '#132242', b2: '#1b3260',
  gold: '#f4a023', goldL: '#fbbf45', goldD: '#c97e10',
  blue: '#2563eb', blueL: '#3b82f6', blueD: '#1d4ed8',
  red: '#ef4444', green: '#10b981', purple: '#8b5cf6',
  cyan: '#06b6d4', pink: '#ec4899', teal: '#14b8a6',
  t1: '#dce8ff', t2: '#7fa3d4', t3: '#3d5a8a',
};

// ── 💎 CSS ─────────────────────────────────────────────────────────────────────
const GCSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;800&display=swap');
  .adm * { box-sizing: border-box; }
  .adm { font-family: 'DM Sans', sans-serif; color: ${T.t1}; }
  .adm ::-webkit-scrollbar { width: 5px; height: 5px; }
  .adm ::-webkit-scrollbar-track { background: transparent; }
  .adm ::-webkit-scrollbar-thumb { background: ${T.b2}; border-radius: 99px; }

  .anav { padding: 11px 16px; display: flex; align-items: center; gap: 11px; border-radius: 12px; cursor: pointer; font-size: 13.5px; font-weight: 700; color: ${T.t2}; transition: all .2s; border: 1px solid transparent; margin-bottom: 3px; }
  .anav:hover { background: rgba(37,99,235,.12); color: ${T.t1}; border-color: rgba(37,99,235,.25); }
  .anav.active { background: linear-gradient(135deg,${T.blueD},${T.blue}); color: #fff; box-shadow: 0 6px 18px rgba(37,99,235,.35); border-color: transparent; }

  .glass { background: rgba(9,20,48,.7); border: 1px solid ${T.b1}; border-radius: 16px; backdrop-filter: blur(12px); box-shadow: 0 8px 32px rgba(0,0,0,.25); padding: 28px; margin-bottom: 24px; }
  .glass-gold { background: rgba(9,20,48,.7); border: 1px solid rgba(244,160,35,.3); border-radius: 16px; box-shadow: 0 0 0 1px rgba(244,160,35,.06), 0 12px 32px rgba(244,160,35,.07), inset 0 4px 0 ${T.gold}; padding: 28px; margin-bottom: 24px; }
  .glass-blue { background: rgba(9,20,48,.7); border: 1px solid rgba(37,99,235,.35); border-radius: 16px; box-shadow: 0 12px 32px rgba(37,99,235,.1), inset 0 4px 0 ${T.blue}; padding: 28px; margin-bottom: 24px; }

  .ainp { width: 100%; padding: 11px 15px; background: rgba(3,11,26,.6); border: 1px solid ${T.b2}; border-radius: 10px; font-size: 14px; color: ${T.t1}; outline: none; transition: all .2s; font-weight: 500; font-family: 'DM Sans', sans-serif; }
  .ainp:focus { border-color: ${T.blue}; background: rgba(3,11,26,.9); box-shadow: 0 0 0 3px rgba(37,99,235,.2); }
  .ainp::placeholder { color: ${T.t3}; }
  .ainp option { background: #0c1838; color: ${T.t1}; }

  .abtn { padding: 10px 22px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: all .2s; border: none; font-size: 13.5px; display: inline-flex; align-items: center; gap: 7px; font-family: 'DM Sans', sans-serif; }
  .abtn:disabled { opacity: .5; cursor: not-allowed; }
  .abtn-gold { background: linear-gradient(135deg,${T.gold},${T.goldD}); color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,.25); }
  .abtn-gold:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(244,160,35,.45); }
  .abtn-blue { background: linear-gradient(135deg,${T.blue},${T.blueD}); color: #fff; }
  .abtn-blue:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(37,99,235,.45); }
  .abtn-dark { background: rgba(19,34,66,.8); color: ${T.t2}; border: 1px solid ${T.b2}; }
  .abtn-dark:hover:not(:disabled) { background: rgba(19,34,66,1); color: ${T.t1}; }
  .abtn-danger { background: rgba(239,68,68,.1); color: #ef4444; border: 1px solid rgba(239,68,68,.3); }
  .abtn-danger:hover:not(:disabled) { background: #ef4444; color: #fff; }
  .abtn-green { background: linear-gradient(135deg,#10b981,#059669); color:#fff; }
  .abtn-green:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 22px rgba(16,185,129,.4); }
  .abtn-sm { padding: 6px 13px; font-size: 12px; border-radius: 8px; }

  .abadge { font-size: 11px; padding: 3px 9px; border-radius: 6px; font-weight: 800; display: inline-block; font-family: 'JetBrains Mono', monospace; letter-spacing: .3px; }
  .arow { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border: 1px solid ${T.b1}; border-radius: 12px; background: rgba(9,20,48,.5); transition: all .2s; margin-bottom: 10px; }
  .arow:hover { background: rgba(9,20,48,.8); border-color: ${T.b2}; box-shadow: 0 5px 15px rgba(0,0,0,.2); }

  .asec { font-size: 22px; font-weight: 900; color: ${T.t1}; margin: 0 0 5px; letter-spacing: -.3px; }
  .asub { font-size: 14px; color: ${T.t3}; margin: 0 0 24px; font-weight: 500; }
  .actitle { font-size: 15px; font-weight: 800; color: ${T.t1}; margin: 0 0 18px; padding-bottom: 12px; border-bottom: 1px solid ${T.b1}; display: flex; align-items: center; gap: 8px; }
  .alabel { display: block; font-size: 11.5px; font-weight: 800; color: ${T.t2}; margin-bottom: 7px; text-transform: uppercase; letter-spacing: .5px; }

  .upload-zone { border: 2px dashed ${T.b2}; border-radius: 14px; padding: 28px; text-align: center; cursor: pointer; transition: all .3s; background: rgba(3,11,26,.4); display:block; }
  .upload-zone:hover { border-color: ${T.blue}; background: rgba(37,99,235,.06); }

  .prog-outer { background: ${T.b1}; border-radius: 99px; height: 8px; overflow: hidden; margin-top: 10px; }
  .prog-inner { height: 100%; border-radius: 99px; background: linear-gradient(90deg,${T.gold},${T.goldL}); transition: width .3s; }

  @keyframes countUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  .count-anim { animation: countUp .5s ease both; }
  @keyframes glowPulse { 0%,100%{opacity:.6;}50%{opacity:1;} }
  .glow-dot { width:8px;height:8px;border-radius:50%;background:${T.green};animation:glowPulse 2s infinite;box-shadow:0 0 8px ${T.green}; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
  .fade-up { animation: fadeUp .35s ease both; }

  .ht-bg { background:#040c1a; font-family:'DM Sans',sans-serif; color:#f1f5f9; border-radius:16px; padding:36px; position:relative; overflow:hidden; border:1px solid #10b981; box-shadow:0 0 0 1px rgba(16,185,129,.1),0 20px 50px rgba(0,0,0,.5); }
  .ht-term { background:rgba(0,0,0,.7); border:1px solid rgba(16,185,129,.25); border-radius:10px; padding:18px; font-family:'JetBrains Mono',monospace; font-size:12.5px; color:#10b981; min-height:240px; overflow-y:auto; margin-bottom:20px; }
  .ht-term p { margin:4px 0; }
  .ht-btn { background:transparent; border:1px solid #10b981; color:#10b981; font-family:'JetBrains Mono',monospace; font-weight:800; padding:11px 28px; cursor:pointer; transition:all .25s; border-radius:8px; font-size:13px; }
  .ht-btn:hover { background:#10b981; color:#000; box-shadow:0 0 18px rgba(16,185,129,.4); }
  .ht-btn:disabled { opacity:.5; cursor:not-allowed; }

  .sidebar-brand { padding:20px 18px; border-bottom:1px solid ${T.b1}; }
  .sidebar-section { padding:8px 12px 4px; font-size:10px; font-weight:900; color:${T.t3}; text-transform:uppercase; letter-spacing:1.5px; }

  .amobile-top { display:none; }
  @media(max-width:1024px) {
    .amobile-top { display:flex; background:${T.bg1}; padding:14px 20px; align-items:center; justify-content:space-between; border-bottom:1px solid ${T.b1}; position:sticky; top:0; z-index:9999; }
    .adm-main-pad { padding:16px !important; }
  }
  @keyframes spin80 { to { transform:rotate(360deg); } }
  .spin80 { animation:spin80 .8s linear infinite; }
`;

const IMGBB_API_KEY = '6391ea11ec7aa4e6f3477f373cdd3592';
const uploadToImgBB = (blob, onProgress) => new Promise((resolve, reject) => {
  const formData = new FormData(); formData.append('image', blob);
  const xhr = new XMLHttpRequest(); xhr.open('POST', `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, true);
  xhr.upload.onprogress = e => { if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100)); };
  xhr.onload = () => xhr.status === 200 ? resolve(JSON.parse(xhr.responseText).data.url) : reject(new Error('Upload failed'));
  xhr.onerror = () => reject(new Error('Network error')); xhr.send(formData);
});

function useCountUp(target, dur = 1000) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!target) return; let s = 0; const step = target / (dur / 16);
    const t = setInterval(() => { s += step; if (s >= target) { setV(target); clearInterval(t); } else setV(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [target]); return v;
}

const StatCard = React.memo(({ icon, label, count, color, sub }) => {
  const a = useCountUp(count);
  return (
    <div className="glass count-anim" style={{ padding: '20px', borderBottom: `3px solid ${color}`, margin: 0, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 48, opacity: .06 }}>{icon}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 28 }}>{icon}</div>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}` }} />
      </div>
      <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', fontFamily: "'JetBrains Mono',monospace" }}>{a}</div>
      <div style={{ fontSize: 11, fontWeight: 800, color: T.t3, marginTop: 6, textTransform: 'uppercase', letterSpacing: .5 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: color, marginTop: 4, fontWeight: 700 }}>{sub}</div>}
    </div>
  );
});

const joditCfg = { readonly: false, placeholder: 'Start writing…', height: 280, theme: 'dark', buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'font', 'fontsize', '|', 'link', 'align', 'undo', 'redo'] };

// ══════════════════════════════════════════════════════════════════════════════
export default function AdminPanel({ onClose, notices, pages, events, gallery, pdfReports, announcements, sliderSlides, navLinks, faculties, placements, alerts }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const editor = useRef(null);
  const facRef = useRef(null);
  const placeRef = useRef(null);
  const fileRef = useRef(null);
  const [restoreFile, setRestoreFile] = useState(null);
  const termRef = useRef(null);

  useEffect(() => { const fn = () => setIsMobile(window.innerWidth < 1024); window.addEventListener('resize', fn); return () => window.removeEventListener('resize', fn); }, []);
  useEffect(() => { if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight; }, []);

  // ── ACTIVITY LOG ─────────────────────────────────────────────────────────────
  const [activityLogs, setActivityLogs] = useState([]);
  useEffect(() => {
    const q = query(collection(db, 'adminLogs'), orderBy('time', 'desc'), limit(20));
    return onSnapshot(q, s => setActivityLogs(s.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);
  const logActivity = useCallback(async (action, message) => {
    try { await addDoc(collection(db, 'adminLogs'), { action, message, time: new Date().toISOString(), createdAt: serverTimestamp() }); } catch (_) { }
  }, []);

  // ── IMAGE CROPPER ─────────────────────────────────────────────────────────────
  const [cropSrc, setCropSrc] = useState(null);
  const [cropCb, setCropCb] = useState(null);
  const triggerCrop = (src, cb) => { setCropSrc(src); setCropCb(() => cb); };
  const handleCropDone = async (blob) => { if (cropCb) await cropCb(blob); setCropSrc(null); setCropCb(null); };

  // ── 1. ALERTS ─────────────────────────────────────────────────────────────────
  const [editAlert, setEditAlert] = useState(null);
  const [alertData, setAlertData] = useState({ text: '', isActive: true });
  const saveAlert = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      if (editAlert) await updateDoc(doc(db, 'alerts', editAlert.id), { ...alertData, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'alerts'), { ...alertData, createdAt: serverTimestamp() });
      toast.success(editAlert ? 'Alert updated' : 'Alert published!');
      setEditAlert(null); setAlertData({ text: '', isActive: true });
      logActivity(editAlert ? 'update' : 'add', `Alert: ${alertData.text.substring(0, 40)}`);
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };
  const deleteAlert = async (id) => { if (window.confirm('Delete?')) { await deleteDoc(doc(db, 'alerts', id)); logActivity('delete', 'Alert deleted'); } };
  const toggleAlert = async (a) => {
    await updateDoc(doc(db, 'alerts', a.id), { isActive: !a.isActive, updatedAt: serverTimestamp() });
    toast.success(a.isActive ? 'Alert turned OFF' : 'Alert is LIVE now!');
  };

  // ── 2. PLACEMENTS ─────────────────────────────────────────────────────────────
  const [editPlace, setEditPlace] = useState(null);
  const [placeData, setPlaceData] = useState({ name: '', year: '', company: '', package: '', imageUrl: '' });
  const [placeUp, setPlaceUp] = useState(false); const [placeProg, setPlaceProg] = useState(0);
  const handlePlaceFile = async (file) => { const r = new FileReader(); r.onload = e => triggerCrop(e.target.result, async (blob) => { setPlaceUp(true); setPlaceProg(0); try { const url = await uploadToImgBB(blob, p => setPlaceProg(p)); setPlaceData(d => ({ ...d, imageUrl: url })); toast.success('Photo ready!'); } catch (err) { toast.error(err.message); } setPlaceUp(false); }); r.readAsDataURL(file); };
  const savePlace = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      if (editPlace) await updateDoc(doc(db, 'placements', editPlace.id), { ...placeData, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'placements'), { ...placeData, createdAt: serverTimestamp() });
      toast.success('Placement saved!'); setEditPlace(null); setPlaceData({ name: '', year: '', company: '', package: '', imageUrl: '' });
      logActivity(editPlace ? 'update' : 'add', `Placement: ${placeData.name}`);
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };
  const deletePlace = async (id) => { if (window.confirm('Delete?')) { await deleteDoc(doc(db, 'placements', id)); logActivity('delete', 'Placement deleted'); } };

  // ── 3. FACULTY ────────────────────────────────────────────────────────────────
  const teachingDepts = ['Commerce', 'English', 'Hindi', 'Economics', 'Political Science', 'History', 'Psychology', 'BCA', 'BBA'];
  const nonTeachingDepts = ['General Section', 'Account Section', 'Library', 'Examination', 'Computer Lab Section'];
  const [editFac, setEditFac] = useState(null);
  const [facData, setFacData] = useState({ name: '', staffType: 'Teaching', dept: 'Commerce', qual: '', desig: '', imageUrl: '' });
  const [facUp, setFacUp] = useState(false); const [facProg, setFacProg] = useState(0);
  const handleFacFile = async (file) => { const r = new FileReader(); r.onload = e => triggerCrop(e.target.result, async (blob) => { setFacUp(true); setFacProg(0); try { const url = await uploadToImgBB(blob, p => setFacProg(p)); setFacData(d => ({ ...d, imageUrl: url })); toast.success('Photo ready!'); } catch (err) { toast.error(err.message); } setFacUp(false); }); r.readAsDataURL(file); };
  const saveFac = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      if (editFac) await updateDoc(doc(db, 'faculties', editFac.id), { ...facData, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'faculties'), { ...facData, createdAt: serverTimestamp() });
      toast.success('Staff profile saved!'); setEditFac(null); setFacData({ name: '', staffType: 'Teaching', dept: 'Commerce', qual: '', desig: '', imageUrl: '' });
      logActivity(editFac ? 'update' : 'add', `Staff: ${facData.name}`);
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };
  const deleteFac = async (id) => { if (window.confirm('Delete?')) { await deleteDoc(doc(db, 'faculties', id)); logActivity('delete', 'Staff deleted'); } };

  // ── 4. SLIDER ─────────────────────────────────────────────────────────────────
  const [sliderForm, setSliderForm] = useState({ title: '', subtitle: '', image: '', order: 0 });
  const [editingSlide, setEditingSlide] = useState(null);
  const [sliderUp, setSliderUp] = useState(false); const [sliderProg, setSliderProg] = useState(0);
  const handleSliderFile = async (file) => { const r = new FileReader(); r.onload = e => triggerCrop(e.target.result, async (blob) => { setSliderUp(true); setSliderProg(0); try { const url = await uploadToImgBB(blob, p => setSliderProg(p)); setSliderForm(f => ({ ...f, image: url })); toast.success('Image ready!'); } catch (err) { } setSliderUp(false); }); r.readAsDataURL(file); };
  const saveSlide = async (e) => { e.preventDefault(); setLoading(true); try { if (editingSlide) await updateDoc(doc(db, 'sliderSlides', editingSlide.id), sliderForm); else await addDoc(collection(db, 'sliderSlides'), { ...sliderForm, createdAt: serverTimestamp() }); setEditingSlide(null); setSliderForm({ title: '', subtitle: '', image: '', order: 0 }); toast.success('Slide saved!'); } catch (err) { } setLoading(false); };
  const deleteSlide = async (id) => { if (window.confirm('Delete?')) await deleteDoc(doc(db, 'sliderSlides', id)); };

  // ── 5. MENU ───────────────────────────────────────────────────────────────────
  const [navData, setNavData] = useState([]);
  const [editMenuSel, setEditMenuSel] = useState('');
  const [editMenuForm, setEditMenuForm] = useState({ label: '', href: '' });
  const [newMenuForm, setNewMenuForm] = useState({ label: '', href: '', parentId: 'top' });
  useEffect(() => { getDoc(doc(db, 'settings', 'navbar')).then(s => { if (s.exists() && s.data().links?.length) setNavData(s.data().links); else if (navLinks?.length) setNavData(navLinks); }); }, [navLinks]);
  const flatMenus = useMemo(() => {
    const f = []; (navData || []).forEach((l0, i0) => { f.push({ id: `${i0}`, label: l0.label, href: l0.href, pathStr: `[L1] ${l0.label}`, level: 0 }); if (l0.sub) l0.sub.forEach((l1, i1) => { f.push({ id: `${i0}-${i1}`, label: l1.label, href: l1.href, pathStr: `[L2] ${l0.label} › ${l1.label}`, level: 1 }); if (l1.sub) l1.sub.forEach((l2, i2) => f.push({ id: `${i0}-${i1}-${i2}`, label: l2.label, href: l2.href, pathStr: `[L3] ${l0.label} › ${l1.label} › ${l2.label}`, level: 2 })); }); }); return f;
  }, [navData]);
  const saveNav = async (arr) => { setLoading(true); try { await setDoc(doc(db, 'settings', 'navbar'), { links: arr }); setNavData(arr); toast.success('Nav Saved!'); } catch (err) { } setLoading(false); };
  const addMenu = () => { const nav = JSON.parse(JSON.stringify(navData)); const item = { label: newMenuForm.label, href: newMenuForm.href }; if (newMenuForm.parentId === 'top') nav.push(item); else { const idx = newMenuForm.parentId.split('-'); if (idx.length === 1) { if (!nav[idx[0]].sub) nav[idx[0]].sub = []; nav[idx[0]].sub.push(item); } else { if (!nav[idx[0]].sub[idx[1]].sub) nav[idx[0]].sub[idx[1]].sub = []; nav[idx[0]].sub[idx[1]].sub.push(item); } } saveNav(nav); setNewMenuForm({ label: '', href: '', parentId: 'top' }); };
  const deleteMenu = (id) => { if (!window.confirm('Delete?')) return; const nav = JSON.parse(JSON.stringify(navData)); const idx = id.split('-'); if (idx.length === 1) nav.splice(+idx[0], 1); else if (idx.length === 2) nav[idx[0]].sub.splice(+idx[1], 1); else nav[idx[0]].sub[idx[1]].sub.splice(+idx[2], 1); saveNav(nav); };

  // ── 6. PAGES ──────────────────────────────────────────────────────────────────
  const [pageMode, setPageMode] = useState('update');
  const [editingPage, setEditPage] = useState(null);
  const [pageData, setPageData] = useState({ title: '', content: '', path: '', slug: '' });
  const [seoData, setSeoData] = useState({ metaTitle: '', metaDesc: '', keywords: '', ogImage: '' });
  const getSeoScore = (seo, title) => { let s = 0; if ((title || '').length > 5) s += 20; if ((seo?.metaTitle || '').length > 10) s += 25; if ((seo?.metaDesc || '').length > 50) s += 30; if ((seo?.keywords || '').length > 0) s += 15; if (seo?.ogImage) s += 10; return s; };
  const savePage = async (e) => { e.preventDefault(); setLoading(true); try { const base = { title: pageData.title, content: pageData.content, seo: seoData || {} }; if (editingPage) { const upd = { ...base, updatedAt: serverTimestamp() }; if (pageMode === 'update') upd.path = pageData.path; else upd.slug = pageData.slug; await updateDoc(doc(db, 'pages', editingPage.id), upd); } else await addDoc(collection(db, 'pages'), { ...base, path: pageMode === 'update' ? pageData.path : '', slug: pageMode === 'create' ? pageData.slug : '', createdAt: serverTimestamp() }); setEditPage(null); setPageData({ title: '', content: '', path: '', slug: '' }); setSeoData({ metaTitle: '', metaDesc: '', keywords: '', ogImage: '' }); toast.success('Page saved!'); } catch (err) { toast.error(err.message); } setLoading(false); };
  const deletePage = async (id) => { if (window.confirm('Delete?')) await deleteDoc(doc(db, 'pages', id)); };

  // ── 7. GALLERY ────────────────────────────────────────────────────────────────
  const [galleryData, setGalleryData] = useState({ title: '', cat: 'Seminars', src: '' });
  const [galleryUp, setGalleryUp] = useState(false); const [galleryProg, setGalleryProg] = useState(0);
  const handleGalleryFile = async (file) => { const r = new FileReader(); r.onload = e => triggerCrop(e.target.result, async (blob) => { setGalleryUp(true); setGalleryProg(0); try { const url = await uploadToImgBB(blob, p => setGalleryProg(p)); setGalleryData(d => ({ ...d, src: url })); toast.success('Image ready!'); } catch (err) { } setGalleryUp(false); }); r.readAsDataURL(file); };
  const saveGallery = async (e) => { e.preventDefault(); setLoading(true); try { await addDoc(collection(db, 'gallery'), { ...galleryData, createdAt: serverTimestamp() }); toast.success('Photo saved!'); setGalleryData({ title: '', cat: 'Seminars', src: '' }); } catch (err) { } setLoading(false); };
  const deleteGallery = async (id) => { if (window.confirm('Delete?')) await deleteDoc(doc(db, 'gallery', id)); };

  // ── 8. GENERIC (Notices / News / Docs / Events) ───────────────────────────────
  const genericSave = async (col, editing, data, setEditing, reset, msg, e) => { if (e) e.preventDefault(); setLoading(true); try { if (editing) await updateDoc(doc(db, col, editing.id), { ...data, updatedAt: serverTimestamp() }); else await addDoc(collection(db, col), { ...data, date: new Date().toISOString(), createdAt: serverTimestamp() }); toast.success(msg); setEditing(null); reset(); logActivity(editing ? 'update' : 'add', `${col}: item saved`); } catch (err) { toast.error(err.message); } setLoading(false); };
  const genericDelete = async (col, id) => { if (window.confirm('Delete?')) { await deleteDoc(doc(db, col, id)); logActivity('delete', `${col}: item deleted`); } };
  const [editNotice, setEditNotice] = useState(null); const [noticeData, setNoticeData] = useState({ text: '', link: '', type: 'General', isNew: true });
  const [editAnn, setEditAnn] = useState(null); const [annData, setAnnData] = useState({ text: '', link: '', type: 'News' });
  const [editPdf, setEditPdf] = useState(null); const [pdfData, setPdfData] = useState({ title: '', link: '', type: 'Document' });
  const [editEvent, setEditEvent] = useState(null); const [evtData, setEvtData] = useState({ title: '', desc: '', type: 'WORKSHOP', day: '', month: '', location: '', status: 'upcoming', imageUrl: '', reportLink: '' });
  const [eventUp, setEventUp] = useState(false); const [eventProg, setEventProg] = useState(0);
  const handleEventFile = async (file) => { const r = new FileReader(); r.onload = e => triggerCrop(e.target.result, async (blob) => { setEventUp(true); setEventProg(0); try { const url = await uploadToImgBB(blob, p => setEventProg(p)); setEvtData(d => ({ ...d, imageUrl: url })); } catch (err) { } setEventUp(false); }); r.readAsDataURL(file); };

  // ── 9. YOUTUBE MANAGER ────────────────────────────────────────────────────────
  const [ytCfg, setYtCfg] = useState({ apiKey: '', channelId: '', maxResults: 12 });
  const [ytLoading, setYtLoading] = useState(false);
  const [ytTest, setYtTest] = useState(null);
  useEffect(() => { getDoc(doc(db, 'settings', 'youtube')).then(s => { if (s.exists()) setYtCfg({ apiKey: '', maxResults: 12, ...s.data() }); }); }, []);
  const saveYtConfig = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await setDoc(doc(db, 'settings', 'youtube'), { ...ytCfg, updatedAt: serverTimestamp() }); toast.success('YouTube config saved! Video Gallery ab live hai.'); logActivity('update', 'YouTube config updated'); }
    catch (err) { toast.error(err.message); } setLoading(false);
  };
  const testYtApi = async () => {
    setYtLoading(true); setYtTest(null);
    try {
      const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${ytCfg.channelId}&key=${ytCfg.apiKey}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      if (data.items?.length) {
        setYtTest({ ok: true, msg: `✅ Channel found: "${data.items[0].snippet.title}"` });
      } else throw new Error('Channel not found');
    } catch (e) { setYtTest({ ok: false, msg: `❌ ${e.message}` }); }
    setYtLoading(false);
  };

  // ── 10. GOOGLE DRIVE MANAGER ──────────────────────────────────────────────────
  const [driveCfg, setDriveCfg] = useState({ apiKey: '', folderId: '', folderName: '' });
  const [driveLoading, setDriveLoading] = useState(false);
  const [driveTest, setDriveTest] = useState(null);
  const [driveFiles, setDriveFiles] = useState([]);
  useEffect(() => { getDoc(doc(db, 'settings', 'drive')).then(s => { if (s.exists()) setDriveCfg({ apiKey: '', folderId: '', folderName: '', ...s.data() }); }); }, []);
  const saveDriveConfig = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await setDoc(doc(db, 'settings', 'drive'), { ...driveCfg, updatedAt: serverTimestamp() }); toast.success('Drive config saved! Documents auto-sync active.'); logActivity('update', 'Drive config updated'); }
    catch (err) { toast.error(err.message); } setLoading(false);
  };
  const testDriveApi = async () => {
    setDriveLoading(true); setDriveTest(null); setDriveFiles([]);
    try {
      const res = await fetch(`https://www.googleapis.com/drive/v3/files?q='${driveCfg.folderId}'+in+parents+and+mimeType='application/pdf'&key=${driveCfg.apiKey}&fields=files(id,name,createdTime,size)`);
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setDriveFiles(data.files || []);
      setDriveTest({ ok: true, msg: `✅ Folder accessible! ${data.files?.length || 0} PDFs found.` });
    } catch (e) { setDriveTest({ ok: false, msg: `❌ ${e.message}` }); }
    setDriveLoading(false);
  };

  // ── 11. BACKUP / RESTORE ──────────────────────────────────────────────────────
  const handleBackup = async () => {
    setLoading(true);
    try {
      const cols = ['notices', 'announcements', 'events', 'gallery', 'pdfReports', 'pages', 'faculties', 'placements', 'sliderSlides', 'alerts'];
      const backup = {}; const nb = await getDoc(doc(db, 'settings', 'navbar')); if (nb.exists()) backup.navbar = nb.data();
      for (const col of cols) { const snap = await getDocs(collection(db, col)); backup[col] = snap.docs.map(d => ({ id: d.id, ...d.data() })); }
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `gnc_backup_${new Date().toISOString().split('T')[0]}.json`; a.click();
      toast.success('Backup downloaded!');
    } catch (e) { toast.error(e.message); } setLoading(false);
  };
  const handleRestore = async () => {
    if (!restoreFile || !window.confirm('⚠️ This will ERASE all data. Confirm?')) return;
    setLoading(true);
    try {
      const text = await restoreFile.text(); const backup = JSON.parse(text);
      const cols = ['notices', 'announcements', 'events', 'gallery', 'pdfReports', 'pages', 'faculties', 'placements', 'sliderSlides', 'alerts'];
      for (const col of cols) {
        if (!backup[col]) continue;
        const existing = await getDocs(collection(db, col));
        const batch = writeBatch(db); existing.forEach(d => batch.delete(d.ref));
        await batch.commit();
        const batch2 = writeBatch(db);
        backup[col].forEach(item => { const { id, ...d } = item; batch2.set(doc(collection(db, col)), d); });
        await batch2.commit();
      }
      if (backup.navbar) await setDoc(doc(db, 'settings', 'navbar'), backup.navbar);
      toast.success('Database restored!'); logActivity('restore', 'Full backup restored');
    } catch (e) { toast.error(e.message); } setLoading(false);
  };

  // ── 12. SYSTEM TEST (12 tests + PDF Report) ───────────────────────────────────
  const [testRunning, setTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testResults, setTestResults] = useState([]);
  const [testScore, setTestScore] = useState(null);
  const [sysLog, setSysLog] = useState([]);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const sysTermRef = useRef(null);
  useEffect(() => { if (sysTermRef.current) sysTermRef.current.scrollTop = sysTermRef.current.scrollHeight; }, [sysLog]);

  const addTestLog = (name, status, detail) => setTestResults(prev => [...prev, { name, status, detail, time: new Date().toLocaleTimeString() }]);
  const pushLog = (msg) => setSysLog(prev => [...prev, msg]);

  const runDiagnostics = async () => {
    setTestRunning(true); setTestResults([]); setTestProgress(0); setTestScore(null); setSysLog([]);
    let passed = 0; const total = 12;

    pushLog('[SYS] ▶ GNC WEBSITE SYSTEM DIAGNOSTICS v8.0');
    pushLog('[SYS] Initializing 12-phase test suite...');
    await new Promise(r => setTimeout(r, 400));

    // TEST 1 — Environment
    pushLog('[1/12] Checking Vite environment...');
    try { if (import.meta.env.MODE) { addTestLog('Vite Environment', 'success', `Mode: ${import.meta.env.MODE} | Base: ${import.meta.env.BASE_URL}`); passed++; pushLog('[OK] Vite running correctly'); } } catch (e) { addTestLog('Vite Environment', 'fail', e.message); pushLog('[ERR] ' + e.message); }
    setTestProgress(Math.round((1 / total) * 100)); await new Promise(r => setTimeout(r, 500));

    // TEST 2 — Firebase Init
    pushLog('[2/12] Checking Firebase initialization...');
    try { if (db && db.app) { addTestLog('Firebase Init', 'success', `Project: ${db.app.options.projectId}`); passed++; pushLog('[OK] Firebase project connected'); } else throw new Error('DB object missing'); }
    catch (e) { addTestLog('Firebase Init', 'fail', e.message); pushLog('[ERR] ' + e.message); }
    setTestProgress(Math.round((2 / total) * 100)); await new Promise(r => setTimeout(r, 500));

    // TEST 3 — Firestore Read
    pushLog('[3/12] Testing Firestore read access...');
    try { const snap = await getDocs(query(collection(db, 'pages'), limit(1))); addTestLog('Firestore Read', 'success', `Pages collection: ${snap.size} doc(s) fetched`); passed++; pushLog('[OK] Firestore read permissions active'); }
    catch (e) { addTestLog('Firestore Read', 'fail', 'Permission denied. Check Firebase Rules.'); pushLog('[ERR] Firestore: ' + e.message); }
    setTestProgress(Math.round((3 / total) * 100)); await new Promise(r => setTimeout(r, 500));

    // TEST 4 — Firestore Write
    pushLog('[4/12] Testing Firestore write access...');
    let testDocId = null;
    try { const d = await addDoc(collection(db, '_sysTest'), { t: serverTimestamp(), test: true }); testDocId = d.id; addTestLog('Firestore Write', 'success', `Test doc created: ${d.id.substring(0, 12)}...`); passed++; pushLog('[OK] Write permissions verified'); }
    catch (e) { addTestLog('Firestore Write', 'fail', e.message); pushLog('[ERR] Write: ' + e.message); }
    setTestProgress(Math.round((4 / total) * 100)); await new Promise(r => setTimeout(r, 500));

    // TEST 5 — Firestore Delete
    pushLog('[5/12] Testing Firestore delete access...');
    try {
      if (testDocId) { await deleteDoc(doc(db, '_sysTest', testDocId)); addTestLog('Firestore Delete', 'success', 'Test document cleaned up successfully'); passed++; pushLog('[OK] Delete permissions active'); }
      else throw new Error('No test doc to delete');
    } catch (e) { addTestLog('Firestore Delete', 'fail', e.message); pushLog('[ERR] ' + e.message); }
    setTestProgress(Math.round((5 / total) * 100)); await new Promise(r => setTimeout(r, 500));

    // TEST 6 — Navbar Settings
    pushLog('[6/12] Checking navbar settings structure...');
    try { const nb = await getDoc(doc(db, 'settings', 'navbar')); if (nb.exists()) { addTestLog('Navbar Settings', 'success', `${nb.data().links?.length || 0} top-level links loaded`); passed++; pushLog(`[OK] Navbar: ${nb.data().links?.length} items`); } else { addTestLog('Navbar Settings', 'warning', 'Using static fallback (no DB record)'); passed++; pushLog('[WARN] Navbar using static fallback'); } }
    catch (e) { addTestLog('Navbar Settings', 'fail', e.message); pushLog('[ERR] ' + e.message); }
    setTestProgress(Math.round((6 / total) * 100)); await new Promise(r => setTimeout(r, 500));

    // TEST 7 — ImgBB API
    pushLog('[7/12] Validating ImgBB image upload API...');
    try {
      const dummyB64 = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      const fd = new FormData(); fd.append('image', dummyB64);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: 'POST', body: fd });
      if (res.ok) { addTestLog('ImgBB Upload API', 'success', `Key validated — upload service active`); passed++; pushLog('[OK] ImgBB API key valid'); }
      else throw new Error('Invalid API key or rate limited');
    } catch (e) { addTestLog('ImgBB Upload API', 'fail', e.message); pushLog('[ERR] ' + e.message); }
    setTestProgress(Math.round((7 / total) * 100)); await new Promise(r => setTimeout(r, 500));

    // TEST 8 — Alerts Collection
    pushLog('[8/12] Checking alerts collection...');
    try { const snap = await getDocs(collection(db, 'alerts')); const active = snap.docs.filter(d => d.data().isActive).length; addTestLog('Flash Alerts', 'success', `${snap.size} total | ${active} currently LIVE`); passed++; pushLog(`[OK] Alerts: ${snap.size} records, ${active} active`); }
    catch (e) { addTestLog('Flash Alerts', 'fail', e.message); pushLog('[ERR] ' + e.message); }
    setTestProgress(Math.round((8 / total) * 100)); await new Promise(r => setTimeout(r, 500));

    // TEST 9 — Faculty Collection
    pushLog('[9/12] Checking faculty & staff data...');
    try { const snap = await getDocs(collection(db, 'faculties')); const teaching = snap.docs.filter(d => (d.data().staffType || 'Teaching') === 'Teaching').length; const nonT = snap.docs.filter(d => d.data().staffType === 'Non-Teaching').length; addTestLog('Faculty Directory', 'success', `Teaching: ${teaching} | Non-Teaching: ${nonT}`); passed++; pushLog(`[OK] Faculty: ${teaching} teaching, ${nonT} non-teaching`); }
    catch (e) { addTestLog('Faculty Directory', 'fail', e.message); pushLog('[ERR] ' + e.message); }
    setTestProgress(Math.round((9 / total) * 100)); await new Promise(r => setTimeout(r, 500));

    // TEST 10 — Placements Collection
    pushLog('[10/12] Checking placements (alumni wall)...');
    try { const snap = await getDocs(collection(db, 'placements')); addTestLog('Alumni Placements', 'success', `${snap.size} success stories on Wall of Fame`); passed++; pushLog(`[OK] Placements: ${snap.size} alumni stories`); }
    catch (e) { addTestLog('Alumni Placements', 'fail', e.message); pushLog('[ERR] ' + e.message); }
    setTestProgress(Math.round((10 / total) * 100)); await new Promise(r => setTimeout(r, 500));

    // TEST 11 — YouTube Config
    pushLog('[11/12] Checking YouTube API configuration...');
    try { const snap = await getDoc(doc(db, 'settings', 'youtube')); if (snap.exists() && snap.data().apiKey) { addTestLog('YouTube Config', 'success', `Channel: ${snap.data().channelId || 'not set'} | Max: ${snap.data().maxResults || 12} videos`); passed++; pushLog('[OK] YouTube config found in DB'); } else { addTestLog('YouTube Config', 'warning', 'Not configured (Admin → YouTube Manager)'); pushLog('[WARN] YouTube not yet configured'); } }
    catch (e) { addTestLog('YouTube Config', 'fail', e.message); pushLog('[ERR] ' + e.message); }
    setTestProgress(Math.round((11 / total) * 100)); await new Promise(r => setTimeout(r, 500));

    // TEST 12 — Google Drive Config
    pushLog('[12/12] Checking Google Drive configuration...');
    try { const snap = await getDoc(doc(db, 'settings', 'drive')); if (snap.exists() && snap.data().apiKey) { addTestLog('Google Drive Config', 'success', `Folder: ${snap.data().folderName || snap.data().folderId}`); passed++; pushLog('[OK] Drive config found in DB'); } else { addTestLog('Google Drive Config', 'warning', 'Not configured (Admin → Drive Manager)'); pushLog('[WARN] Drive not yet configured'); } }
    catch (e) { addTestLog('Google Drive Config', 'fail', e.message); pushLog('[ERR] ' + e.message); }
    setTestProgress(100);
    pushLog('');
    pushLog(`[COMPLETE] Score: ${Math.round((passed / total) * 100)}% (${passed}/${total} tests passed)`);
    setTestScore(Math.round((passed / total) * 100));
    setTestRunning(false);
  };

  // ── PDF REPORT GENERATION ─────────────────────────────────────────────────────
  const generatePDFReport = async () => {
    setPdfGenerating(true);
    try {
      // Load jsPDF dynamically
      if (!window.jspdf) {
        await new Promise((res, rej) => {
          const s = document.createElement('script');
          s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
          s.onload = res; s.onerror = rej; document.head.appendChild(s);
        });
      }
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const W = 210; const H = 297;

      // ── HEADER BACKGROUND ──────────────────────────────────────────────────
      pdf.setFillColor(3, 11, 26);
      pdf.rect(0, 0, W, 55, 'F');

      // Gold accent bar
      pdf.setFillColor(244, 160, 35);
      pdf.rect(0, 55, W, 3, 'F');

      // Try to add logo
      try {
        const logoUrl = `${window.location.origin}${import.meta.env.BASE_URL || '/'}images/logo.png`;
        const imgData = await fetch(logoUrl).then(r => r.blob()).then(b => new Promise(res => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(b); }));
        pdf.addImage(imgData, 'PNG', 10, 8, 30, 30);
      } catch (_) {
        // Logo not available — draw placeholder
        pdf.setFillColor(37, 99, 235);
        pdf.circle(25, 23, 12, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(8); pdf.setFont('helvetica', 'bold');
        pdf.text('GNC', 21, 25);
      }

      // College name & address
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18); pdf.setFont('helvetica', 'bold');
      pdf.text('GURU NANAK COLLEGE', 48, 20);
      pdf.setFontSize(9); pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(180, 200, 255);
      pdf.text('Affiliated to B.B.M.K. University, Dhanbad | NAAC Accredited', 48, 28);
      pdf.text('Bank More, Dhanbad — 826001, Jharkhand, India', 48, 35);
      pdf.text('📞 (0326) XXXXXXX | ✉ admin@gncollege.ac.in', 48, 42);

      // Report title
      pdf.setFillColor(244, 160, 35);
      pdf.setTextColor(3, 11, 26);
      pdf.setFontSize(11); pdf.setFont('helvetica', 'bold');
      pdf.roundedRect(10, 60, W - 20, 12, 2, 2, 'F');
      pdf.text('WEBSITE SYSTEM HEALTH DIAGNOSTIC REPORT', W / 2, 68, { align: 'center' });

      // Metadata row
      pdf.setFontSize(8); pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(80, 80, 80);
      const now = new Date();
      pdf.text(`Generated: ${now.toLocaleDateString('en-IN')} at ${now.toLocaleTimeString()}`, 12, 80);
      pdf.text(`Total Tests: 12`, 100, 80);
      pdf.text(`Score: ${testScore}%`, 150, 80);

      // Score badge
      const sc = testScore || 0;
      const bColor = sc >= 90 ? [16, 185, 129] : sc >= 60 ? [245, 158, 11] : [239, 68, 68];
      pdf.setFillColor(...bColor);
      pdf.roundedRect(W - 42, 60, 32, 18, 3, 3, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14); pdf.setFont('helvetica', 'bold');
      pdf.text(`${sc}%`, W - 26, 72, { align: 'center' });

      // ── TABLE HEADER ──────────────────────────────────────────────────────
      let y = 92;
      pdf.setFillColor(3, 11, 26);
      pdf.rect(10, y, W - 20, 10, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(9); pdf.setFont('helvetica', 'bold');
      pdf.text('#', 14, y + 7);
      pdf.text('TEST NAME', 22, y + 7);
      pdf.text('STATUS', 110, y + 7);
      pdf.text('DETAIL', 130, y + 7);
      pdf.text('TIME', 185, y + 7);
      y += 12;

      // ── TEST RESULTS ──────────────────────────────────────────────────────
      testResults.forEach((r, i) => {
        if (y > H - 40) {
          pdf.addPage();
          pdf.setFillColor(3, 11, 26);
          pdf.rect(0, 0, W, 15, 'F');
          pdf.setFillColor(244, 160, 35);
          pdf.rect(0, 15, W, 2, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(8); pdf.setFont('helvetica', 'bold');
          pdf.text('GNC — System Diagnostic Report (continued)', 10, 10);
          y = 25;
        }

        const rowBg = i % 2 === 0 ? [248, 250, 255] : [255, 255, 255];
        pdf.setFillColor(...rowBg);
        pdf.rect(10, y - 3, W - 20, 10, 'F');

        // Status color
        const statusColor = r.status === 'success' ? [16, 185, 129] : r.status === 'warning' ? [245, 158, 11] : [239, 68, 68];
        pdf.setFillColor(...statusColor);
        pdf.roundedRect(108, y - 2, 18, 7, 1, 1, 'F');

        pdf.setTextColor(60, 60, 80);
        pdf.setFontSize(8); pdf.setFont('helvetica', 'normal');
        pdf.text(String(i + 1), 14, y + 4);
        pdf.text(r.name.substring(0, 40), 22, y + 4);

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(7); pdf.setFont('helvetica', 'bold');
        const statusLabel = r.status === 'success' ? 'PASS' : r.status === 'warning' ? 'WARN' : 'FAIL';
        pdf.text(statusLabel, 117, y + 4, { align: 'center' });

        pdf.setTextColor(80, 80, 100);
        pdf.setFontSize(7.5); pdf.setFont('helvetica', 'normal');
        const detail = r.detail?.substring(0, 55) || '';
        pdf.text(detail, 130, y + 4);

        if (r.time) {
          pdf.setTextColor(150, 150, 150);
          pdf.setFontSize(7);
          pdf.text(r.time, 185, y + 4);
        }

        // bottom border
        pdf.setDrawColor(230, 235, 245);
        pdf.line(10, y + 7, W - 10, y + 7);
        y += 11;
      });

      // ── SUMMARY SECTION ───────────────────────────────────────────────────
      y += 8;
      if (y > H - 60) { pdf.addPage(); y = 20; }
      pdf.setFillColor(244, 160, 35);
      pdf.rect(10, y, W - 20, 1, 'F');
      y += 6;
      pdf.setTextColor(3, 11, 26); pdf.setFontSize(10); pdf.setFont('helvetica', 'bold');
      pdf.text('SYSTEM SUMMARY', 12, y + 5);
      y += 10;

      const passed = testResults.filter(r => r.status === 'success').length;
      const warned = testResults.filter(r => r.status === 'warning').length;
      const failed = testResults.filter(r => r.status === 'fail').length;

      const summary = [
        ['Tests Passed', `${passed} / 12`, passed === 12 ? 'Excellent' : passed >= 9 ? 'Good' : 'Needs Attention'],
        ['Warnings', `${warned}`, warned === 0 ? 'None' : 'Review Recommended'],
        ['Failed Tests', `${failed}`, failed === 0 ? 'None' : 'Critical — Fix Required'],
        ['Overall Health', `${testScore}%`, testScore >= 90 ? '🟢 Healthy' : testScore >= 60 ? '🟡 Fair' : '🔴 Critical'],
      ];

      summary.forEach(([key, val, note]) => {
        pdf.setFillColor(248, 250, 255);
        pdf.rect(10, y - 2, W - 20, 10, 'F');
        pdf.setTextColor(80, 80, 100); pdf.setFontSize(8.5); pdf.setFont('helvetica', 'normal');
        pdf.text(key, 14, y + 5);
        pdf.setFont('helvetica', 'bold'); pdf.setTextColor(3, 11, 26);
        pdf.text(val, 80, y + 5);
        pdf.setFont('helvetica', 'italic'); pdf.setTextColor(100, 100, 120);
        pdf.text(note, 130, y + 5);
        y += 12;
      });

      // ── FOOTER ─────────────────────────────────────────────────────────────
      const pages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pages; i++) {
        pdf.setPage(i);
        pdf.setFillColor(3, 11, 26);
        pdf.rect(0, H - 14, W, 14, 'F');
        pdf.setFillColor(244, 160, 35);
        pdf.rect(0, H - 14, W, 1, 'F');
        pdf.setTextColor(140, 160, 200);
        pdf.setFontSize(7); pdf.setFont('helvetica', 'normal');
        pdf.text('Guru Nanak College, Dhanbad | Confidential System Report', 10, H - 5);
        pdf.text(`Page ${i} of ${pages}`, W - 10, H - 5, { align: 'right' });
      }

      // Save
      const filename = `GNC_System_Report_${now.toISOString().split('T')[0]}.pdf`;
      pdf.save(filename);
      toast.success(`📥 "${filename}" downloaded!`);
    } catch (e) {
      toast.error('PDF error: ' + e.message);
    }
    setPdfGenerating(false);
  };

  // ── GLOBAL SEARCH ─────────────────────────────────────────────────────────────
  const debouncedSearch = useDebounce(searchTerm, 300);
  const allContent = useMemo(() => [
    ...(notices || []).map(n => ({ ...n, title: n.text?.substring(0, 40), contentType: 'Notice' })),
    ...(announcements || []).map(a => ({ ...a, title: a.text?.substring(0, 40), contentType: 'News' })),
    ...(events || []).map(e => ({ ...e, contentType: 'Event' })),
    ...(pages || []).map(p => ({ ...p, contentType: 'Page' })),
    ...(placements || []).map(p => ({ ...p, title: p.name, contentType: 'Placement' })),
    ...(faculties || []).map(f => ({ ...f, title: f.name, contentType: 'Faculty' })),
  ], [notices, announcements, events, pages, placements, faculties]);
  const filtered = useMemo(() => allContent.filter(i => i.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) && (filterType === 'all' || i.contentType?.toLowerCase() === filterType)), [allContent, debouncedSearch, filterType]);

  // ── TABS DEFINITION ───────────────────────────────────────────────────────────
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', section: 'OVERVIEW' },
    { id: 'alerts', label: 'Flash Alerts', icon: '🚨', section: 'CONTENT' },
    { id: 'placements', label: 'Alumni Wall', icon: '🎓' },
    { id: 'faculty', label: 'Faculty & Staff', icon: '👨‍🏫' },
    { id: 'slider', label: 'Hero Slider', icon: '🖼️' },
    { id: 'menu_builder', label: 'Menu Editor', icon: '🧭' },
    { id: 'pages', label: 'Pages & SEO', icon: '📄' },
    { id: 'gallery', label: 'Gallery', icon: '📸' },
    { id: 'notices', label: 'Notices', icon: '📢' },
    { id: 'announcements', label: 'News', icon: '📣' },
    { id: 'pdfReports', label: 'Documents', icon: '📁' },
    { id: 'events', label: 'Events', icon: '🏆' },
    { id: 'youtube', label: 'YouTube Manager', icon: '▶️', section: 'API INTEGRATIONS' },
    { id: 'drive', label: 'Drive Docs', icon: '☁️' },
    { id: 'activity', label: 'Activity Log', icon: '📋', section: 'SYSTEM' },
    { id: 'backup', label: 'Backup & Restore', icon: '💾' },
    { id: 'system_test', label: 'System Test', icon: '⚡' },
  ];

  let lastSection = '';

  // ══ RENDER ════════════════════════════════════════════════════════════════════
  return (
    <div className="adm" style={{ display: 'flex', height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 99999, background: T.bg0, overflow: 'hidden' }}>
      <style>{GCSS}</style>

      {cropSrc && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, zIndex: 100010, background: 'rgba(3,11,26,.95)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Cropper...</div>}>
          <ImageCropper src={cropSrc} onCrop={handleCropDone} onCancel={() => { setCropSrc(null); setCropCb(null); }} />
        </Suspense>
      )}

      {/* ── SIDEBAR ──────────────────────────────────────────────────────────── */}
      <div style={{
        width: 248, background: T.bg1, display: 'flex', flexDirection: 'column',
        borderRight: `1px solid ${T.b1}`, zIndex: 10001, flexShrink: 0,
        position: isMobile ? 'fixed' : 'relative', height: '100%',
        boxShadow: '4px 0 24px rgba(0,0,0,.4)',
        transform: isMobile ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
        transition: 'transform .3s ease',
      }}>
        {/* Brand */}
        <div className="sidebar-brand" style={{ background: 'linear-gradient(135deg,#040e22,#071428)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${T.blue},${T.blueD})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🏫</div>
            <div>
              <div style={{ fontWeight: 900, color: '#fff', fontSize: 13, letterSpacing: -.2 }}>GNC Admin</div>
              <div style={{ fontSize: 10, color: T.t3, fontWeight: 600 }}>v8.0 — Blue Series</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 14, background: 'rgba(255,255,255,.04)', border: `1px solid ${T.b1}`, borderRadius: 8, padding: '8px 12px' }}>
            <div className="glow-dot" />
            <span style={{ fontSize: 11, color: T.t2, fontWeight: 700 }}>All systems operational</span>
          </div>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>
          {tabs.map(tab => {
            const showSection = tab.section && tab.section !== lastSection;
            if (tab.section) lastSection = tab.section;
            return (
              <React.Fragment key={tab.id}>
                {showSection && <div className="sidebar-section">{tab.section}</div>}
                <div className={`anav ${activeTab === tab.id ? 'active' : ''}`} onClick={() => { setActiveTab(tab.id); if (isMobile) setSidebarOpen(false); }}>
                  <span style={{ fontSize: 16, width: 24, textAlign: 'center' }}>{tab.icon}</span>
                  <span style={{ flex: 1 }}>{tab.label}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Close btn */}
        <div style={{ padding: '14px 12px', borderTop: `1px solid ${T.b1}` }}>
          <button className="abtn abtn-danger" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>✕ Exit Admin Panel</button>
        </div>
      </div>

      {isMobile && sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(3,11,26,.7)', zIndex: 10000, backdropFilter: 'blur(4px)' }} />}

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Mobile topbar */}
        <div className="amobile-top">
          <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: T.t1 }}>☰</button>
          <span style={{ fontWeight: 900, color: T.t1, fontSize: 14 }}>GNC Admin Panel</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: T.red }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 36px' }} className="adm-main-pad">

          {/* ── DASHBOARD ──────────────────────────────────────────────────────── */}
          {activeTab === 'dashboard' && (
            <div className="fade-up">
              <p className="asec">📊 Admin Dashboard</p>
              <p className="asub">Real-time overview of all website modules</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 16, marginBottom: 28 }}>
                <StatCard icon="👨‍🏫" label="Faculty/Staff" count={(faculties || []).length} color={T.blue} sub={`${(faculties || []).filter(f => f.staffType === 'Non-Teaching').length} non-teaching`} />
                <StatCard icon="🎓" label="Placements" count={(placements || []).length} color={T.cyan} />
                <StatCard icon="🚨" label="Active Alerts" count={(alerts || []).filter(a => a.isActive).length} color={T.red} />
                <StatCard icon="🖼️" label="Slider Slides" count={(sliderSlides || []).length} color={T.gold} />
                <StatCard icon="📄" label="Pages" count={(pages || []).length} color={T.purple} />
                <StatCard icon="📢" label="Notices" count={(notices || []).length} color="#f59e0b" />
                <StatCard icon="🏆" label="Events" count={(events || []).length} color={T.teal} />
                <StatCard icon="📁" label="Documents" count={(pdfReports || []).length} color={T.green} />
              </div>
              <div className="glass">
                <div className="actitle">🔍 Global Search</div>
                <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
                  <input className="ainp" style={{ flex: 1, minWidth: 220 }} placeholder="Type to search anything..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                  <select className="ainp" style={{ minWidth: 160 }} value={filterType} onChange={e => setFilterType(e.target.value)}>
                    {['all', 'Faculty', 'Placement', 'Page', 'Notice', 'News', 'Event'].map(t => <option key={t} value={t.toLowerCase()}>{t}</option>)}
                  </select>
                </div>
                {filtered.slice(0, 30).map(item => {
                  const colors = { Slide: '#f4a023', Page: T.purple, Notice: '#f59e0b', News: T.red, Event: T.purple, Faculty: T.blue, Placement: T.cyan };
                  const c = colors[item.contentType] || T.t2;
                  return (
                    <div key={item.id || Math.random()} className="arow">
                      <span className="abadge" style={{ background: `${c}20`, color: c, minWidth: 70, textAlign: 'center' }}>{item.contentType}</span>
                      <div style={{ flex: 1, fontWeight: 700, color: T.t1, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} dangerouslySetInnerHTML={{ __html: item.title || 'Untitled' }} />
                    </div>
                  );
                })}
                {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 50, color: T.t3 }}>No content found.</div>}
              </div>
            </div>
          )}

          {/* ── ALERTS ─────────────────────────────────────────────────────────── */}
          {activeTab === 'alerts' && (
            <div className="fade-up">
              <p className="asec">🚨 Flash Alert Manager</p>
              <p className="asub">Urgent scrolling banner + popup — sirf toggle karein ON/OFF</p>
              <div className="glass-gold">
                <div className="actitle">{editAlert ? '✏️ Edit Alert' : '➕ Create Alert'}</div>
                <form onSubmit={saveAlert}>
                  <div style={{ marginBottom: 16 }}><label className="alabel">Alert Message *</label><textarea className="ainp" rows={3} value={alertData.text} onChange={e => setAlertData(d => ({ ...d, text: e.target.value }))} required placeholder="Example: College will remain closed tomorrow due to holiday..." /></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, padding: '14px 18px', background: 'rgba(239,68,68,.08)', borderRadius: 12, border: '1px solid rgba(239,68,68,.2)' }}>
                    <div style={{ position: 'relative', width: 48, height: 26, cursor: 'pointer' }} onClick={() => setAlertData(d => ({ ...d, isActive: !d.isActive }))}>
                      <div style={{ position: 'absolute', inset: 0, borderRadius: 13, background: alertData.isActive ? T.red : T.b2, transition: 'background .2s' }} />
                      <div style={{ position: 'absolute', top: 3, left: alertData.isActive ? 26 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left .2s', boxShadow: '0 2px 5px rgba(0,0,0,.3)' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: alertData.isActive ? T.red : T.t3, fontSize: 14 }}>{alertData.isActive ? '🔴 Alert is LIVE (visible to everyone)' : '⚪ Alert is OFF (hidden)'}</div>
                      <div style={{ fontSize: 12, color: T.t3, marginTop: 2 }}>Toggle to show/hide without deleting</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editAlert ? 'Update' : 'Publish'} Alert</button>
                    {editAlert && <button type="button" className="abtn abtn-dark" onClick={() => { setEditAlert(null); setAlertData({ text: '', isActive: true }); }}>Cancel</button>}
                  </div>
                </form>
              </div>
              <div className="glass">
                <div className="actitle">All Alerts ({(alerts || []).length})</div>
                {(alerts || []).map(a => (
                  <div key={a.id} className="arow" style={{ borderLeft: `4px solid ${a.isActive ? T.red : T.b2}` }}>
                    <div style={{ flex: 1 }}>
                      <span className="abadge" style={{ background: a.isActive ? 'rgba(239,68,68,.15)' : 'rgba(100,116,139,.1)', color: a.isActive ? '#ef4444' : T.t3, marginBottom: 6 }}>{a.isActive ? '🔴 LIVE' : '⚪ OFF'}</span>
                      <div style={{ fontWeight: 700, color: T.t1, fontSize: 14 }}>{a.text}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="abtn abtn-dark abtn-sm" onClick={() => toggleAlert(a)}>{a.isActive ? '⏸ Turn OFF' : '▶ Turn ON'}</button>
                      <button className="abtn abtn-dark abtn-sm" onClick={() => { setEditAlert(a); setAlertData({ text: a.text, isActive: a.isActive }); }}>✏️</button>
                      <button className="abtn abtn-danger abtn-sm" onClick={() => deleteAlert(a.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
                {(alerts || []).length === 0 && <div style={{ textAlign: 'center', padding: 50, color: T.t3 }}>No alerts yet.</div>}
              </div>
            </div>
          )}

          {/* ── PLACEMENTS ─────────────────────────────────────────────────────── */}
          {activeTab === 'placements' && (
            <div className="fade-up">
              <p className="asec">🎓 Alumni Wall of Fame</p><p className="asub">Student success stories — homepage par live slider</p>
              <div className="glass-gold">
                <div className="actitle">{editPlace ? '✏️ Edit Story' : '➕ Add Success Story'}</div>
                <form onSubmit={savePlace}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginBottom: 16 }}>
                    <div><label className="alabel">Student Name *</label><input className="ainp" value={placeData.name} onChange={e => setPlaceData(d => ({ ...d, name: e.target.value }))} placeholder="Rahul Kumar" required /></div>
                    <div><label className="alabel">Passing Year *</label><input className="ainp" value={placeData.year} onChange={e => setPlaceData(d => ({ ...d, year: e.target.value }))} placeholder="2024" required /></div>
                    <div><label className="alabel">Company Name *</label><input className="ainp" value={placeData.company} onChange={e => setPlaceData(d => ({ ...d, company: e.target.value }))} placeholder="TCS / Wipro / SBI" required /></div>
                    <div><label className="alabel">Package (Optional)</label><input className="ainp" value={placeData.package} onChange={e => setPlaceData(d => ({ ...d, package: e.target.value }))} placeholder="4.5 LPA" /></div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label className="alabel">Student Photo</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <label className="upload-zone" ref={placeRef}>
                        <div style={{ fontSize: 22, marginBottom: 6 }}>📷</div>
                        <div style={{ fontWeight: 700, color: T.t1, fontSize: 13 }}>{placeUp ? `Uploading ${placeProg}%...` : 'Upload Photo (auto-crop)'}</div>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files[0] && handlePlaceFile(e.target.files[0])} />
                        {placeUp && <div className="prog-outer" style={{ marginTop: 10 }}><div className="prog-inner" style={{ width: `${placeProg}%` }} /></div>}
                      </label>
                      {placeData.imageUrl && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={placeData.imageUrl} alt="prev" style={{ width: 110, height: 110, objectFit: 'cover', borderRadius: '50%', border: `4px solid ${T.gold}`, boxShadow: '0 8px 20px rgba(0,0,0,.3)' }} /></div>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading || placeUp}>🚀 Save Story</button>
                    {editPlace && <button type="button" className="abtn abtn-dark" onClick={() => { setEditPlace(null); setPlaceData({ name: '', year: '', company: '', package: '', imageUrl: '' }); }}>Cancel</button>}
                  </div>
                </form>
              </div>
              <div className="glass">
                <div className="actitle">Wall of Fame ({(placements || []).length} alumni)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
                  {(placements || []).map(p => (
                    <div key={p.id} className="arow" style={{ padding: 18 }}>
                      <img src={p.imageUrl || '/images/college_photo.jpg'} alt="" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${T.gold}` }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 900, color: T.t1, fontSize: 15 }}>{p.name} <span style={{ fontSize: 11, color: T.t3 }}>({p.year})</span></div>
                        <div style={{ fontSize: 13, color: T.green, fontWeight: 800, marginTop: 3 }}>💼 {p.company}{p.package && ` | 💰 ${p.package}`}</div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                          <button className="abtn abtn-dark abtn-sm" onClick={() => { setEditPlace(p); setPlaceData({ name: p.name, year: p.year, company: p.company, package: p.package || '', imageUrl: p.imageUrl || '' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>✏️</button>
                          <button className="abtn abtn-danger abtn-sm" onClick={() => deletePlace(p.id)}>🗑️</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── FACULTY ─────────────────────────────────────────────────────────── */}
          {activeTab === 'faculty' && (
            <div className="fade-up">
              <p className="asec">👨‍🏫 Faculty & Staff Directory</p><p className="asub">Teaching Staff → /about-us/college-staff/teaching-staff | Non-Teaching → /about-us/college-staff/non-teaching-staff</p>
              <div className="glass-gold">
                <div className="actitle">{editFac ? '✏️ Edit Profile' : '➕ Add Staff Member'}</div>
                <form onSubmit={saveFac}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label className="alabel">Staff Type *</label>
                      <select className="ainp" value={facData.staffType} onChange={e => { const t = e.target.value; setFacData(d => ({ ...d, staffType: t, dept: t === 'Teaching' ? 'Commerce' : 'General Section' })); }}>
                        <option value="Teaching">Teaching Staff</option>
                        <option value="Non-Teaching">Non-Teaching Staff</option>
                      </select>
                    </div>
                    <div><label className="alabel">Full Name *</label><input className="ainp" value={facData.name} onChange={e => setFacData(d => ({ ...d, name: e.target.value }))} placeholder="Dr. S.K. Sharma" required /></div>
                    <div>
                      <label className="alabel">Department *</label>
                      <select className="ainp" value={facData.dept} onChange={e => setFacData(d => ({ ...d, dept: e.target.value }))}>
                        {(facData.staffType === 'Teaching' ? teachingDepts : nonTeachingDepts).map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div><label className="alabel">Qualification</label><input className="ainp" value={facData.qual} onChange={e => setFacData(d => ({ ...d, qual: e.target.value }))} placeholder="Ph.D., NET, M.Com..." /></div>
                    <div><label className="alabel">Designation</label><input className="ainp" value={facData.desig} onChange={e => setFacData(d => ({ ...d, desig: e.target.value }))} placeholder="Assistant Professor / Clerk" /></div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label className="alabel">Profile Photo</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <label className="upload-zone" ref={facRef}>
                        <div style={{ fontSize: 22, marginBottom: 6 }}>📷</div>
                        <div style={{ fontWeight: 700, color: T.t1, fontSize: 13 }}>{facUp ? `${facProg}%...` : 'Upload Photo (auto-crop)'}</div>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files[0] && handleFacFile(e.target.files[0])} />
                        {facUp && <div className="prog-outer"><div className="prog-inner" style={{ width: `${facProg}%` }} /></div>}
                      </label>
                      {facData.imageUrl && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={facData.imageUrl} alt="prev" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 14, border: `3px solid ${T.gold}` }} /></div>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading || facUp}>🚀 Save Profile</button>
                    {editFac && <button type="button" className="abtn abtn-dark" onClick={() => { setEditFac(null); setFacData({ name: '', staffType: 'Teaching', dept: 'Commerce', qual: '', desig: '', imageUrl: '' }); }}>Cancel</button>}
                  </div>
                </form>
              </div>
              <div className="glass">
                <div className="actitle">Staff Directory ({(faculties || []).length} total)</div>
                {/* Teaching */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: T.gold, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="abadge" style={{ background: 'rgba(244,160,35,.15)', color: T.gold }}>Teaching Staff ({(faculties || []).filter(f => (f.staffType || 'Teaching') === 'Teaching').length})</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 12 }}>
                    {(faculties || []).filter(f => (f.staffType || 'Teaching') === 'Teaching').map(f => (
                      <div key={f.id} className="arow" style={{ borderLeft: `4px solid ${T.gold}` }}>
                        <img src={f.imageUrl || '/images/college_photo.jpg'} alt="" style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 900, color: T.t1 }}>{f.name}</div>
                          <div style={{ fontSize: 12, color: T.gold, fontWeight: 800, marginTop: 2 }}>{f.desig}</div>
                          <div style={{ fontSize: 12, color: T.t3, marginTop: 4 }}>🏢 {f.dept} | 🎓 {f.qual}</div>
                          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                            <button className="abtn abtn-dark abtn-sm" onClick={() => { setEditFac(f); setFacData({ name: f.name, staffType: f.staffType || 'Teaching', dept: f.dept, qual: f.qual || '', desig: f.desig || '', imageUrl: f.imageUrl || '' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>✏️</button>
                            <button className="abtn abtn-danger abtn-sm" onClick={() => deleteFac(f.id)}>🗑️</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Non-Teaching */}
                <div>
                  <span className="abadge" style={{ background: 'rgba(6,182,212,.15)', color: T.cyan, marginBottom: 12, display: 'inline-block' }}>Non-Teaching Staff ({(faculties || []).filter(f => f.staffType === 'Non-Teaching').length})</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 12, marginTop: 12 }}>
                    {(faculties || []).filter(f => f.staffType === 'Non-Teaching').map(f => (
                      <div key={f.id} className="arow" style={{ borderLeft: `4px solid ${T.cyan}` }}>
                        <img src={f.imageUrl || '/images/college_photo.jpg'} alt="" style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 900, color: T.t1 }}>{f.name}</div>
                          <div style={{ fontSize: 12, color: T.cyan, fontWeight: 800, marginTop: 2 }}>{f.desig}</div>
                          <div style={{ fontSize: 12, color: T.t3, marginTop: 4 }}>🏢 {f.dept} | 🎓 {f.qual}</div>
                          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                            <button className="abtn abtn-dark abtn-sm" onClick={() => { setEditFac(f); setFacData({ name: f.name, staffType: 'Non-Teaching', dept: f.dept, qual: f.qual || '', desig: f.desig || '', imageUrl: f.imageUrl || '' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>✏️</button>
                            <button className="abtn abtn-danger abtn-sm" onClick={() => deleteFac(f.id)}>🗑️</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── SLIDER ──────────────────────────────────────────────────────────── */}
          {activeTab === 'slider' && (
            <div className="fade-up">
              <p className="asec">🖼️ Hero Slider Manager</p><p className="asub">Homepage main banner slides</p>
              <div className="glass-blue">
                <div className="actitle">{editingSlide ? '✏️ Edit Slide' : '➕ Add Slide'}</div>
                <form onSubmit={saveSlide}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 16, marginBottom: 16 }}>
                    <div><label className="alabel">Title *</label><input className="ainp" value={sliderForm.title} onChange={e => setSliderForm(f => ({ ...f, title: e.target.value }))} placeholder="Welcome to GNC" required /></div>
                    <div><label className="alabel">Subtitle</label><input className="ainp" value={sliderForm.subtitle} onChange={e => setSliderForm(f => ({ ...f, subtitle: e.target.value }))} placeholder="NAAC Accredited College" /></div>
                    <div><label className="alabel">Order (1,2,3...)</label><input type="number" className="ainp" value={sliderForm.order} onChange={e => setSliderForm(f => ({ ...f, order: +e.target.value }))} /></div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label className="alabel">Slide Image</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <label className="upload-zone">
                        <div style={{ fontSize: 22, marginBottom: 6 }}>🖼️</div>
                        <div style={{ fontWeight: 700, color: T.t1, fontSize: 13 }}>{sliderUp ? `${sliderProg}%...` : 'Upload Background Image'}</div>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files[0] && handleSliderFile(e.target.files[0])} />
                        {sliderUp && <div className="prog-outer"><div className="prog-inner" style={{ width: `${sliderProg}%` }} /></div>}
                      </label>
                      {sliderForm.image && <img src={sliderForm.image} alt="" style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 12 }} />}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading || sliderUp}>🚀 Save Slide</button>
                    {editingSlide && <button type="button" className="abtn abtn-dark" onClick={() => { setEditingSlide(null); setSliderForm({ title: '', subtitle: '', image: '', order: 0 }); }}>Cancel</button>}
                  </div>
                </form>
              </div>
              <div className="glass">
                <div className="actitle">All Slides ({(sliderSlides || []).length})</div>
                {(sliderSlides || []).map(s => (
                  <div key={s.id} className="arow">
                    {s.image && <img src={s.image} alt="" style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 8 }} />}
                    <div style={{ flex: 1 }}><div style={{ fontWeight: 800, color: T.t1 }}>{s.title}</div><div style={{ fontSize: 12, color: T.t3 }}>{s.subtitle}</div></div>
                    <span style={{ fontSize: 11, color: T.t3, fontWeight: 700 }}>Order: {s.order}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="abtn abtn-dark abtn-sm" onClick={() => { setEditingSlide(s); setSliderForm({ title: s.title || '', subtitle: s.subtitle || '', image: s.image || '', order: s.order || 0 }); }}>✏️</button>
                      <button className="abtn abtn-danger abtn-sm" onClick={() => deleteSlide(s.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── MENU BUILDER ─────────────────────────────────────────────────────── */}
          {activeTab === 'menu_builder' && (
            <div className="fade-up">
              <p className="asec">🧭 Menu Editor</p><p className="asub">Add / edit / delete navbar links</p>
              <div className="glass-blue">
                <div className="actitle">➕ Add New Menu Item</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 16 }}>
                  <div><label className="alabel">Label *</label><input className="ainp" value={newMenuForm.label} onChange={e => setNewMenuForm(d => ({ ...d, label: e.target.value }))} placeholder="Menu Text" /></div>
                  <div><label className="alabel">URL *</label><input className="ainp" value={newMenuForm.href} onChange={e => setNewMenuForm(d => ({ ...d, href: e.target.value }))} placeholder="/about-us/new-page" /></div>
                  <div><label className="alabel">Parent Menu</label><select className="ainp" value={newMenuForm.parentId} onChange={e => setNewMenuForm(d => ({ ...d, parentId: e.target.value }))}><option value="top">Top Level</option>{flatMenus.filter(m => m.level < 2).map(m => <option key={m.id} value={m.id}>{m.pathStr}</option>)}</select></div>
                </div>
                <button className="abtn abtn-blue" onClick={addMenu} disabled={!newMenuForm.label}>➕ Add Item</button>
              </div>
              <div className="glass">
                <div className="actitle">All Menu Items ({flatMenus.length})</div>
                {flatMenus.map(m => (
                  <div key={m.id} className="arow" style={{ paddingLeft: 16 + m.level * 20 }}>
                    <span style={{ fontSize: 11, color: T.blue, fontWeight: 800, minWidth: 28 }}>{'└'.repeat(m.level)}</span>
                    <div style={{ flex: 1 }}><div style={{ fontWeight: 700, color: T.t1 }}>{m.label}</div><div style={{ fontSize: 12, color: T.t3 }}>{m.href}</div></div>
                    <button className="abtn abtn-danger abtn-sm" onClick={() => deleteMenu(m.id)}>🗑️</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PAGES ─────────────────────────────────────────────────────────────── */}
          {activeTab === 'pages' && (
            <div className="fade-up">
              <p className="asec">📄 Pages & SEO</p><p className="asub">Create and update dynamic content pages</p>
              <div className="glass-blue">
                <div className="actitle">{editingPage ? '✏️ Edit Page' : '➕ Create Page'}</div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
                  {['update', 'create'].map(m => <button key={m} className={`abtn ${pageMode === m ? 'abtn-blue' : 'abtn-dark'}`} onClick={() => setPageMode(m)}>{m === 'update' ? '📝 Update Existing Page' : '✨ Create New Slug Page'}</button>)}
                </div>
                <form onSubmit={savePage}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div><label className="alabel">Page Title *</label><input className="ainp" value={pageData.title} onChange={e => setPageData(d => ({ ...d, title: e.target.value }))} required placeholder="About the Principal" /></div>
                    {pageMode === 'update' ? <div><label className="alabel">Page Path *</label><input className="ainp" value={pageData.path} onChange={e => setPageData(d => ({ ...d, path: e.target.value }))} placeholder="/about-us/principal-message" /></div>
                      : <div><label className="alabel">URL Slug *</label><input className="ainp" value={pageData.slug} onChange={e => setPageData(d => ({ ...d, slug: e.target.value }))} placeholder="principal-message" /></div>}
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label className="alabel">SEO Meta Title</label><input className="ainp" value={seoData.metaTitle} onChange={e => setSeoData(d => ({ ...d, metaTitle: e.target.value }))} placeholder="About the Principal — GNC Dhanbad" />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label className="alabel">Page Content</label>
                    <Suspense fallback={<div style={{ padding: 20, textAlign: 'center' }}>Loading editor...</div>}>
                      <JoditEditor ref={editor} value={pageData.content || ''} config={joditCfg} tabIndex={1} onBlur={c => setPageData(d => ({ ...d, content: c }))} />
                    </Suspense>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editingPage ? 'Update' : 'Publish'} Page</button>
                    <button type="button" className="abtn abtn-dark" onClick={() => { setShowPreview(true); setPreviewContent(pageData.content || ''); }}>👁️ Preview</button>
                    {editingPage && <button type="button" className="abtn abtn-dark" onClick={() => { setEditPage(null); setPageData({ title: '', content: '', path: '', slug: '' }); }}>Cancel</button>}
                  </div>
                </form>
              </div>
              <div className="glass">
                <div className="actitle">All Pages ({(pages || []).length})</div>
                {(pages || []).map(p => (
                  <div key={p.id} className="arow">
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, color: T.t1 }}>{p.title}</div>
                      <div style={{ fontSize: 12, color: T.t3, marginTop: 3 }}>{p.path || `/p/${p.slug}` || 'No path'}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="abtn abtn-dark abtn-sm" onClick={() => { setEditPage(p); setPageData({ title: p.title || '', content: p.content || '', path: p.path || '', slug: p.slug || '' }); setSeoData(p.seo || {}); setPageMode(p.path ? 'update' : 'create'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>✏️</button>
                      <button className="abtn abtn-danger abtn-sm" onClick={() => deletePage(p.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── GALLERY ──────────────────────────────────────────────────────────── */}
          {activeTab === 'gallery' && (
            <div className="fade-up">
              <p className="asec">📸 Photo Gallery</p><p className="asub">Upload and manage gallery images</p>
              <div className="glass-blue">
                <form onSubmit={saveGallery}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginBottom: 16 }}>
                    <div><label className="alabel">Title *</label><input className="ainp" value={galleryData.title} onChange={e => setGalleryData(d => ({ ...d, title: e.target.value }))} placeholder="Annual Function 2024" required /></div>
                    <div><label className="alabel">Category</label><select className="ainp" value={galleryData.cat} onChange={e => setGalleryData(d => ({ ...d, cat: e.target.value }))}>{['Seminars', 'Cultural', 'NSS', 'Sports', 'Campus', 'Departments'].map(c => <option key={c}>{c}</option>)}</select></div>
                  </div>
                  <label className="upload-zone">
                    <div style={{ fontSize: 28, marginBottom: 8 }}>📸</div>
                    <div style={{ fontWeight: 700, color: T.t1 }}>{galleryUp ? `${galleryProg}%...` : 'Click to upload image'}</div>
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files[0] && handleGalleryFile(e.target.files[0])} />
                    {galleryUp && <div className="prog-outer" style={{ marginTop: 12, maxWidth: 200, margin: '12px auto 0' }}><div className="prog-inner" style={{ width: `${galleryProg}%` }} /></div>}
                  </label>
                  {galleryData.src && <img src={galleryData.src} alt="" style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 10, marginTop: 12 }} />}
                  <div style={{ marginTop: 20 }}><button type="submit" className="abtn abtn-gold" disabled={loading || galleryUp || !galleryData.src}>🚀 Add to Gallery</button></div>
                </form>
              </div>
              <div className="glass">
                <div className="actitle">Gallery ({(gallery || []).length} photos)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12 }}>
                  {(gallery || []).map(g => (
                    <div key={g.id} style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${T.b1}`, position: 'relative', group: true }}>
                      <img src={g.src} alt={g.title} style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }} />
                      <div style={{ padding: '8px 10px', background: T.bg3 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: T.t1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
                        <button className="abtn abtn-danger abtn-sm" style={{ marginTop: 6, width: '100%', justifyContent: 'center' }} onClick={() => deleteGallery(g.id)}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── NOTICES ──────────────────────────────────────────────────────────── */}
          {activeTab === 'notices' && (
            <div className="fade-up">
              <p className="asec">📢 Notice Board</p><p className="asub">Add, edit and delete official notices</p>
              <div className="glass-gold">
                <div className="actitle">{editNotice ? '✏️ Edit Notice' : '➕ Add Notice'}</div>
                <form onSubmit={e => genericSave('notices', editNotice, noticeData, setEditNotice, () => setNoticeData({ text: '', link: '', type: 'General', isNew: true }), 'Notice saved!', e)}>
                  <div style={{ marginBottom: 14 }}><label className="alabel">Notice Text *</label><textarea className="ainp" rows={3} value={noticeData.text} onChange={e => setNoticeData(d => ({ ...d, text: e.target.value }))} required placeholder="Notice content..." /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
                    <div><label className="alabel">Type</label><select className="ainp" value={noticeData.type} onChange={e => setNoticeData(d => ({ ...d, type: e.target.value }))}>{['General', 'Examination', 'Admission', 'Result', 'Holiday'].map(t => <option key={t}>{t}</option>)}</select></div>
                    <div><label className="alabel">Link (Optional)</label><input className="ainp" value={noticeData.link} onChange={e => setNoticeData(d => ({ ...d, link: e.target.value }))} placeholder="https://..." /></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 20 }}><input type="checkbox" checked={noticeData.isNew} onChange={e => setNoticeData(d => ({ ...d, isNew: e.target.checked }))} style={{ width: 16, height: 16, accentColor: T.red }} /><label style={{ fontWeight: 700, color: T.red, fontSize: 13 }}>Mark as NEW</label></div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editNotice ? 'Update' : 'Publish'}</button>
                    {editNotice && <button type="button" className="abtn abtn-dark" onClick={() => { setEditNotice(null); setNoticeData({ text: '', link: '', type: 'General', isNew: true }); }}>Cancel</button>}
                  </div>
                </form>
              </div>
              <div className="glass">
                <div className="actitle">All Notices ({(notices || []).length})</div>
                {(notices || []).map(n => (
                  <div key={n.id} className="arow" style={{ borderLeft: `4px solid ${n.isNew ? T.red : T.b2}` }}>
                    {n.isNew && <span className="abadge" style={{ background: 'rgba(239,68,68,.15)', color: T.red }}>NEW</span>}
                    <div style={{ flex: 1, fontWeight: 600, color: T.t1 }} dangerouslySetInnerHTML={{ __html: n.text?.substring(0, 80) }} />
                    <span className="abadge" style={{ background: 'rgba(100,116,139,.1)', color: T.t3 }}>{n.type}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="abtn abtn-dark abtn-sm" onClick={() => { setEditNotice(n); setNoticeData({ text: n.text || '', link: n.link || '', type: n.type || 'General', isNew: n.isNew || false }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>✏️</button>
                      <button className="abtn abtn-danger abtn-sm" onClick={() => genericDelete('notices', n.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ANNOUNCEMENTS ─────────────────────────────────────────────────────── */}
          {activeTab === 'announcements' && (
            <div className="fade-up">
              <p className="asec">📣 News & Announcements</p><p className="asub">College news, achievements and updates</p>
              <div className="glass-gold">
                <form onSubmit={e => genericSave('announcements', editAnn, annData, setEditAnn, () => setAnnData({ text: '', link: '', type: 'News' }), 'News saved!', e)}>
                  <div style={{ marginBottom: 14 }}><label className="alabel">News Text *</label><textarea className="ainp" rows={3} value={annData.text} onChange={e => setAnnData(d => ({ ...d, text: e.target.value }))} required /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div><label className="alabel">Type</label><select className="ainp" value={annData.type} onChange={e => setAnnData(d => ({ ...d, type: e.target.value }))}>{['News', 'Achievement', 'Update', 'Result'].map(t => <option key={t}>{t}</option>)}</select></div>
                    <div><label className="alabel">Link</label><input className="ainp" value={annData.link} onChange={e => setAnnData(d => ({ ...d, link: e.target.value }))} placeholder="https://..." /></div>
                  </div>
                  <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editAnn ? 'Update' : 'Publish'}</button>
                </form>
              </div>
              <div className="glass">
                <div className="actitle">All News ({(announcements || []).length})</div>
                {(announcements || []).map(a => (
                  <div key={a.id} className="arow">
                    <span className="abadge" style={{ background: 'rgba(37,99,235,.15)', color: T.blue }}>{a.type}</span>
                    <div style={{ flex: 1, fontWeight: 600, color: T.t1 }} dangerouslySetInnerHTML={{ __html: a.text?.substring(0, 80) }} />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="abtn abtn-dark abtn-sm" onClick={() => { setEditAnn(a); setAnnData({ text: a.text || '', link: a.link || '', type: a.type || 'News' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>✏️</button>
                      <button className="abtn abtn-danger abtn-sm" onClick={() => genericDelete('announcements', a.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PDF REPORTS ───────────────────────────────────────────────────────── */}
          {activeTab === 'pdfReports' && (
            <div className="fade-up">
              <p className="asec">📁 Document Archive</p><p className="asub">PDFs, reports, syllabus and circulars</p>
              <div className="glass-blue">
                <form onSubmit={e => genericSave('pdfReports', editPdf, pdfData, setEditPdf, () => setPdfData({ title: '', link: '', type: 'Document' }), 'Document saved!', e)}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, marginBottom: 14 }}>
                    <div><label className="alabel">Title *</label><input className="ainp" value={pdfData.title} onChange={e => setPdfData(d => ({ ...d, title: e.target.value }))} required placeholder="NAAC Self Study Report" /></div>
                    <div><label className="alabel">PDF Link *</label><input className="ainp" value={pdfData.link} onChange={e => setPdfData(d => ({ ...d, link: e.target.value }))} required placeholder="https://drive.google.com/..." /></div>
                    <div><label className="alabel">Type</label><select className="ainp" value={pdfData.type} onChange={e => setPdfData(d => ({ ...d, type: e.target.value }))}>{['Document', 'Report', 'Syllabus', 'Circular', 'Result'].map(t => <option key={t}>{t}</option>)}</select></div>
                  </div>
                  <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editPdf ? 'Update' : 'Add'} Document</button>
                </form>
              </div>
              <div className="glass">
                <div className="actitle">All Documents ({(pdfReports || []).length})</div>
                {(pdfReports || []).map(d => (
                  <div key={d.id} className="arow">
                    <span style={{ fontSize: 22 }}>📄</span>
                    <div style={{ flex: 1 }}><div style={{ fontWeight: 700, color: T.t1 }}>{d.title}</div><div style={{ fontSize: 12, color: T.t3 }}>{d.type} • <a href={d.link} target="_blank" rel="noreferrer" style={{ color: T.blue }}>View PDF ↗</a></div></div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="abtn abtn-dark abtn-sm" onClick={() => { setEditPdf(d); setPdfData({ title: d.title, link: d.link, type: d.type || 'Document' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>✏️</button>
                      <button className="abtn abtn-danger abtn-sm" onClick={() => genericDelete('pdfReports', d.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── EVENTS ──────────────────────────────────────────────────────────── */}
          {activeTab === 'events' && (
            <div className="fade-up">
              <p className="asec">🏆 Campus Events</p><p className="asub">Manage upcoming and recent campus events</p>
              <div className="glass-gold">
                <div className="actitle">{editEvent ? '✏️ Edit Event' : '🎉 Add Event'}</div>
                <form onSubmit={e => genericSave('events', editEvent, evtData, setEditEvent, () => setEvtData({ title: '', desc: '', type: 'WORKSHOP', day: '', month: '', location: '', status: 'upcoming', imageUrl: '', reportLink: '' }), 'Event saved!', e)}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 14, marginBottom: 16 }}>
                    <div><label className="alabel">Title *</label><input className="ainp" value={evtData.title} onChange={e => setEvtData(d => ({ ...d, title: e.target.value }))} required /></div>
                    <div><label className="alabel">Type</label><select className="ainp" value={evtData.type} onChange={e => setEvtData(d => ({ ...d, type: e.target.value }))}>{['WORKSHOP', 'SEMINAR', 'CULTURAL', 'SPORTS', 'NSS', 'NCC', 'ACADEMIC'].map(t => <option key={t}>{t}</option>)}</select></div>
                    <div><label className="alabel">Day</label><input className="ainp" value={evtData.day} onChange={e => setEvtData(d => ({ ...d, day: e.target.value }))} placeholder="24" /></div>
                    <div><label className="alabel">Month</label><input className="ainp" value={evtData.month} onChange={e => setEvtData(d => ({ ...d, month: e.target.value }))} placeholder="MAR" /></div>
                    <div><label className="alabel">Location</label><input className="ainp" value={evtData.location} onChange={e => setEvtData(d => ({ ...d, location: e.target.value }))} placeholder="Seminar Hall" /></div>
                    <div><label className="alabel">Status</label><select className="ainp" value={evtData.status} onChange={e => setEvtData(d => ({ ...d, status: e.target.value }))}><option value="upcoming">Upcoming</option><option value="recent">Recent</option></select></div>
                  </div>
                  {evtData.status === 'recent' && (
                    <div style={{ marginBottom: 16 }}>
                      <label className="alabel">Event Image</label>
                      <label className="upload-zone">
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files[0] && handleEventFile(e.target.files[0])} />
                        <div style={{ fontSize: 20 }}>{eventUp ? `${eventProg}%...` : '📷 Upload Event Photo'}</div>
                        {eventUp && <div className="prog-outer"><div className="prog-inner" style={{ width: `${eventProg}%` }} /></div>}
                      </label>
                      <div style={{ marginTop: 12 }}><label className="alabel">PDF Report Link</label><input className="ainp" value={evtData.reportLink || ''} onChange={e => setEvtData(d => ({ ...d, reportLink: e.target.value }))} placeholder="https://..." /></div>
                    </div>
                  )}
                  <div style={{ marginBottom: 16 }}><label className="alabel">Description</label><Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}><JoditEditor value={evtData.desc} config={joditCfg} onBlur={c => setEvtData(d => ({ ...d, desc: c }))} /></Suspense></div>
                  <button type="submit" className="abtn abtn-gold" disabled={loading || eventUp}>🚀 {editEvent ? 'Update' : 'Publish'} Event</button>
                </form>
              </div>
              <div className="glass">
                <div className="actitle">Events ({(events || []).length})</div>
                {(events || []).map(e => (
                  <div key={e.id} className="arow" style={{ borderLeft: `4px solid ${T.purple}` }}>
                    <div style={{ flex: 1 }}>
                      <span className="abadge" style={{ background: 'rgba(139,92,246,.15)', color: T.purple, marginBottom: 6 }}>{e.type}</span>
                      <div style={{ fontWeight: 800, color: T.t1 }}>{e.title}</div>
                      <div style={{ fontSize: 12, color: T.t3, marginTop: 4 }}>📅 {e.day} {e.month} | 📍 {e.location || 'Campus'} | {e.status}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="abtn abtn-dark abtn-sm" onClick={() => { setEditEvent(e); setEvtData({ title: e.title || '', desc: e.desc || '', type: e.type || 'WORKSHOP', day: e.day || '', month: e.month || '', location: e.location || '', status: e.status || 'upcoming', imageUrl: e.imageUrl || '', reportLink: e.reportLink || '' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>✏️</button>
                      <button className="abtn abtn-danger abtn-sm" onClick={() => genericDelete('events', e.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── YOUTUBE MANAGER ──────────────────────────────────────────────────── */}
          {activeTab === 'youtube' && (
            <div className="fade-up">
              <p className="asec">▶️ YouTube Manager</p>
              <p className="asub">Auto-fetch latest videos from your YouTube channel → /video-gallery page par live ho jaenge</p>

              <div className="glass-blue">
                <div className="actitle">🔑 YouTube API Configuration</div>
                <div style={{ background: 'rgba(37,99,235,.08)', border: `1px solid rgba(37,99,235,.2)`, borderRadius: 12, padding: '14px 18px', marginBottom: 24 }}>
                  <div style={{ fontWeight: 800, color: T.blue, marginBottom: 8 }}>📋 Setup Guide (3 steps)</div>
                  <ol style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, color: T.t2, lineHeight: 2 }}>
                    <li>Google Cloud Console → APIs & Services → Enable <b style={{ color: T.t1 }}>YouTube Data API v3</b></li>
                    <li>Credentials → Create API Key → Copy karo</li>
                    <li>YouTube Channel URL se Channel ID copy karo (youtube.com/channel/<b style={{ color: T.gold }}>UCxxxxxx</b>)</li>
                  </ol>
                </div>
                <form onSubmit={saveYtConfig}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginBottom: 16 }}>
                    <div><label className="alabel">YouTube API Key *</label><input className="ainp" value={ytCfg.apiKey} onChange={e => setYtCfg(d => ({ ...d, apiKey: e.target.value }))} placeholder="AIzaSyxxxxxxxxxxxxxxxxx" type="password" /></div>
                    <div><label className="alabel">Channel ID *</label><input className="ainp" value={ytCfg.channelId} onChange={e => setYtCfg(d => ({ ...d, channelId: e.target.value }))} placeholder="UCxxxxxxxxxxxxxxxxx" /></div>
                    <div><label className="alabel">Max Videos to Fetch</label><select className="ainp" value={ytCfg.maxResults} onChange={e => setYtCfg(d => ({ ...d, maxResults: +e.target.value }))}>{[6, 9, 12, 15, 18, 24].map(n => <option key={n} value={n}>{n} videos</option>)}</select></div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading}>💾 Save Config</button>
                    <button type="button" className="abtn abtn-blue" disabled={ytLoading || !ytCfg.apiKey} onClick={testYtApi}>{ytLoading ? '⏳ Testing...' : '🧪 Test API'}</button>
                  </div>
                </form>
                {ytTest && (
                  <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 10, background: ytTest.ok ? 'rgba(16,185,129,.1)' : 'rgba(239,68,68,.1)', border: `1px solid ${ytTest.ok ? T.green : T.red}`, fontWeight: 700, fontSize: 14, color: ytTest.ok ? T.green : T.red }}>
                    {ytTest.msg}
                  </div>
                )}
              </div>

              <div className="glass">
                <div className="actitle">ℹ️ How it works on your website</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
                  {[
                    { icon: '📺', title: '/video-gallery', desc: 'New page — YouTube se latest videos auto-load honge' },
                    { icon: '🔄', title: 'Auto-Update', desc: 'YouTube par video daalo, website automatically update ho jayegi' },
                    { icon: '▶️', title: 'In-page Player', desc: 'Visitor click kare to video sidebar bina open hoga' },
                    { icon: '📊', title: 'Stats Show', desc: 'Views, likes aur duration automatically dikhenge' },
                  ].map((f, i) => (
                    <div key={i} style={{ padding: 18, background: 'rgba(9,20,48,.5)', borderRadius: 12, border: `1px solid ${T.b1}` }}>
                      <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
                      <div style={{ fontWeight: 800, color: T.t1, marginBottom: 6 }}>{f.title}</div>
                      <div style={{ fontSize: 13, color: T.t3 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── DRIVE MANAGER ────────────────────────────────────────────────────── */}
          {activeTab === 'drive' && (
            <div className="fade-up">
              <p className="asec">☁️ Google Drive Document Sync</p>
              <p className="asub">Drive folder ko website se connect karein — PDF upload karo Drive pe, website pe auto-appear ho jayega</p>

              <div className="glass-blue">
                <div className="actitle">🔑 Drive API Configuration</div>
                <div style={{ background: 'rgba(37,99,235,.08)', border: `1px solid rgba(37,99,235,.2)`, borderRadius: 12, padding: '14px 18px', marginBottom: 24 }}>
                  <div style={{ fontWeight: 800, color: T.blue, marginBottom: 8 }}>📋 Setup Guide</div>
                  <ol style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, color: T.t2, lineHeight: 2 }}>
                    <li>Google Cloud Console → Enable <b style={{ color: T.t1 }}>Google Drive API</b></li>
                    <li>Create API Key (same key YouTube ke liye bhi use ho sakta hai)</li>
                    <li>Drive mein ek folder banao → Share → <b style={{ color: T.gold }}>"Anyone with link can view"</b></li>
                    <li>Folder URL se ID copy karo: drive.google.com/drive/folders/<b style={{ color: T.gold }}>1BxxxxxFolderID</b></li>
                  </ol>
                </div>
                <form onSubmit={saveDriveConfig}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginBottom: 16 }}>
                    <div><label className="alabel">Google API Key *</label><input className="ainp" value={driveCfg.apiKey} onChange={e => setDriveCfg(d => ({ ...d, apiKey: e.target.value }))} placeholder="AIzaSyxxxxxxxxx" type="password" /></div>
                    <div><label className="alabel">Drive Folder ID *</label><input className="ainp" value={driveCfg.folderId} onChange={e => setDriveCfg(d => ({ ...d, folderId: e.target.value }))} placeholder="1BxxxxxxxxxxxxxFolderID" /></div>
                    <div><label className="alabel">Folder Name (Display)</label><input className="ainp" value={driveCfg.folderName} onChange={e => setDriveCfg(d => ({ ...d, folderName: e.target.value }))} placeholder="GNC Documents 2024" /></div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading}>💾 Save Config</button>
                    <button type="button" className="abtn abtn-blue" disabled={driveLoading || !driveCfg.apiKey} onClick={testDriveApi}>{driveLoading ? '⏳ Testing...' : '🧪 Test & Preview Files'}</button>
                  </div>
                </form>
                {driveTest && (
                  <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 10, background: driveTest.ok ? 'rgba(16,185,129,.1)' : 'rgba(239,68,68,.1)', border: `1px solid ${driveTest.ok ? T.green : T.red}`, fontWeight: 700, fontSize: 14, color: driveTest.ok ? T.green : T.red }}>
                    {driveTest.msg}
                  </div>
                )}
              </div>

              {driveFiles.length > 0 && (
                <div className="glass">
                  <div className="actitle">📄 Files in Drive Folder ({driveFiles.length} PDFs)</div>
                  {driveFiles.map(f => (
                    <div key={f.id} className="arow">
                      <span style={{ fontSize: 22 }}>📄</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, color: T.t1 }}>{f.name}</div>
                        <div style={{ fontSize: 12, color: T.t3 }}>{f.createdTime ? new Date(f.createdTime).toLocaleDateString() : ''} {f.size ? `• ${(f.size / 1024).toFixed(0)} KB` : ''}</div>
                      </div>
                      <a href={`https://drive.google.com/file/d/${f.id}/view`} target="_blank" rel="noreferrer" className="abtn abtn-blue abtn-sm">📥 View</a>
                    </div>
                  ))}
                </div>
              )}

              <div className="glass">
                <div className="actitle">ℹ️ How it works on your website</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
                  {[
                    { icon: '📤', title: 'Upload to Drive', desc: 'Phone ya laptop se Drive folder mein PDF daalo' },
                    { icon: '⚡', title: 'Auto Sync', desc: '/documents page par file automatically appear ho jayegi with download button' },
                    { icon: '🔒', title: 'No Admin Needed', desc: 'Har PDF ke liye admin panel kholne ki zaroorat nahi' },
                    { icon: '📱', title: 'Mobile Friendly', desc: 'Phone se Drive mein upload karo, website pe live' },
                  ].map((f, i) => (
                    <div key={i} style={{ padding: 18, background: 'rgba(9,20,48,.5)', borderRadius: 12, border: `1px solid ${T.b1}` }}>
                      <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
                      <div style={{ fontWeight: 800, color: T.t1, marginBottom: 6 }}>{f.title}</div>
                      <div style={{ fontSize: 13, color: T.t3 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ACTIVITY LOG ─────────────────────────────────────────────────────── */}
          {activeTab === 'activity' && (
            <div className="fade-up">
              <p className="asec">📋 Activity Log</p><p className="asub">Real-time log of all admin actions</p>
              <div className="glass">
                <div className="actitle">🕐 Recent Activity <div className="glow-dot" style={{ marginLeft: 'auto' }} /><span style={{ fontSize: 12, color: T.green, fontWeight: 800 }}>Live</span></div>
                {activityLogs.length === 0 && <div style={{ textAlign: 'center', padding: 80, color: T.t3 }}><div style={{ fontSize: 44, marginBottom: 12 }}>📋</div><div>No activity yet</div></div>}
                {activityLogs.map(log => {
                  const ic = log.action === 'add' ? '➕' : log.action === 'delete' ? '🗑️' : log.action === 'restore' ? '🔄' : '✏️';
                  const co = log.action === 'add' ? T.green : log.action === 'delete' ? T.red : T.blue;
                  return (
                    <div key={log.id} className="arow">
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${co}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{ic}</div>
                      <div style={{ flex: 1 }}><div style={{ fontWeight: 700, color: T.t1, fontSize: 14 }}>{log.message}</div><div style={{ fontSize: 11, color: T.t3 }}>{log.time ? new Date(log.time).toLocaleString() : ''}</div></div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── BACKUP ───────────────────────────────────────────────────────────── */}
          {activeTab === 'backup' && (
            <div className="fade-up">
              <p className="asec">💾 Backup & Restore</p><p className="asub">Full database export/import</p>
              <div className="glass" style={{ borderTop: `4px solid ${T.green}` }}>
                <div className="actitle">⬇️ Download Backup</div>
                <p style={{ color: T.t2, marginBottom: 20, fontSize: 14 }}>Full JSON backup: pages, notices, events, slider, gallery, menu, documents, faculties, placements, alerts & activity log.</p>
                <button className="abtn abtn-green" onClick={handleBackup} disabled={loading}>⬇️ Download Full Backup</button>
              </div>
              <div className="glass" style={{ borderTop: `4px solid ${T.red}` }}>
                <div className="actitle" style={{ color: T.red }}>🔥 Restore from Backup</div>
                <div style={{ background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.2)', borderRadius: 12, padding: '14px 18px', marginBottom: 20 }}><div style={{ fontWeight: 900, color: T.red, marginBottom: 5 }}>⚠️ DANGER ZONE</div><p style={{ color: T.red, margin: 0, fontSize: 13 }}>This will COMPLETELY ERASE all current data. Cannot be undone.</p></div>
                <div style={{ marginBottom: 20 }}><label className="alabel">Select Backup JSON</label><input type="file" accept=".json" className="ainp" ref={fileRef} onChange={e => setRestoreFile(e.target.files[0])} /></div>
                <button className="abtn abtn-danger" onClick={handleRestore} disabled={loading || !restoreFile}>🔥 Restore Database</button>
              </div>
            </div>
          )}

          {/* ── SYSTEM TEST ──────────────────────────────────────────────────────── */}
          {activeTab === 'system_test' && (
            <div className="fade-up">
              <p className="asec">⚡ System Diagnostic Suite</p>
              <p className="asub">12-phase deep scan — sabse last me PDF report download karo college logo ke saath</p>

              <div className="ht-bg">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, borderBottom: '1px solid rgba(16,185,129,.25)', paddingBottom: 18, position: 'relative', zIndex: 2 }}>
                  <div>
                    <h2 style={{ color: '#10b981', margin: '0 0 5px', fontSize: 24, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", letterSpacing: -1 }}>{'>_ GNC.SYSTEM.DIAGNOSTICS'}</h2>
                    <p style={{ color: '#047857', margin: 0, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>[ 12-Phase Test Suite v8.0 — Blue Series ]</p>
                  </div>
                  {testScore !== null && (
                    <div style={{ background: testScore >= 90 ? 'rgba(16,185,129,.12)' : testScore >= 60 ? 'rgba(245,158,11,.12)' : 'rgba(239,68,68,.12)', color: testScore >= 90 ? '#10b981' : testScore >= 60 ? '#f59e0b' : '#ef4444', padding: '10px 20px', borderRadius: 10, border: `1px solid ${testScore >= 90 ? '#10b981' : testScore >= 60 ? '#f59e0b' : '#ef4444'}`, fontWeight: 900, fontSize: 26, fontFamily: "'JetBrains Mono', monospace" }}>{testScore}%</div>
                  )}
                </div>

                {/* Terminal */}
                {(testRunning || sysLog.length > 0) && (
                  <div className="ht-term" ref={sysTermRef}>
                    {sysLog.map((log, i) => (
                      <p key={i} style={{ color: log.includes('[ERR]') ? '#ef4444' : log.includes('[WARN]') ? '#f59e0b' : log.includes('[COMPLETE]') ? '#fbbf45' : '#10b981' }}>{log}</p>
                    ))}
                    {testRunning && <span style={{ animation: 'glowPulse 1s infinite', color: '#10b981' }}>█</span>}
                  </div>
                )}

                {/* Progress bar */}
                {(testRunning || testResults.length > 0) && (
                  <div style={{ background: '#000', borderRadius: 4, height: 6, marginBottom: 24, border: '1px solid #10b981', overflow: 'hidden' }}>
                    <div style={{ width: `${testProgress}%`, height: '100%', background: '#10b981', transition: 'width .3s', boxShadow: '0 0 10px #10b981' }} />
                  </div>
                )}

                {/* Idle state */}
                {!testRunning && testResults.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 20px', position: 'relative', zIndex: 2 }}>
                    <div style={{ fontSize: 56, marginBottom: 16, filter: 'drop-shadow(0 0 15px #10b981)' }}>🛡️</div>
                    <h3 style={{ color: '#10b981', marginBottom: 10, fontSize: 18, fontFamily: "'JetBrains Mono', monospace" }}>12-PHASE DEEP SCAN READY</h3>
                    <p style={{ color: '#64748b', marginBottom: 24, fontSize: 13 }}>Tests: Vite • Firebase • Firestore Read/Write/Delete • Navbar • ImgBB • Alerts • Faculty • Placements • YouTube • Drive</p>
                    <button onClick={runDiagnostics} className="ht-btn">▶ EXECUTE FULL DIAGNOSTIC</button>
                  </div>
                )}

                {/* Results */}
                {!testRunning && testResults.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', zIndex: 2 }}>
                    {testResults.map((r, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', background: 'rgba(26,34,54,.5)', borderRadius: 10, borderLeft: `4px solid ${r.status === 'success' ? '#10b981' : r.status === 'warning' ? '#f59e0b' : '#ef4444'}` }}>
                        <div style={{ fontSize: 18, flexShrink: 0 }}>{r.status === 'success' ? '✅' : r.status === 'warning' ? '⚠️' : '❌'}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 800, color: '#f1f5f9', fontSize: 14 }}>{r.name}</div>
                          <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 3, fontFamily: "'JetBrains Mono', monospace" }}>{r.detail}</div>
                        </div>
                        <div style={{ fontSize: 11, color: '#475569', flexShrink: 0 }}>{r.time}</div>
                      </div>
                    ))}

                    {/* Score summary */}
                    <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', padding: '16px 20px', background: 'rgba(0,0,0,.3)', borderRadius: 12, border: '1px solid rgba(16,185,129,.2)' }}>
                      <div style={{ flex: 1, fontSize: 14, color: '#94a3b8' }}>
                        ✅ {testResults.filter(r => r.status === 'success').length} passed &nbsp;
                        ⚠️ {testResults.filter(r => r.status === 'warning').length} warnings &nbsp;
                        ❌ {testResults.filter(r => r.status === 'fail').length} failed
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={runDiagnostics} className="ht-btn" disabled={testRunning} style={{ borderColor: '#64748b', color: '#94a3b8' }}>🔄 Re-Run</button>
                        <button onClick={generatePDFReport} className="ht-btn" disabled={pdfGenerating} style={{ borderColor: '#f4a023', color: '#f4a023' }}>
                          {pdfGenerating ? <span className="spin80" style={{ display: 'inline-block', marginRight: 6 }}>⚙️</span> : ''}
                          {pdfGenerating ? 'Generating...' : '📥 Download PDF Report'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── PREVIEW MODAL ─────────────────────────────────────────────────────── */}
      {showPreview && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(3,11,26,.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100002, backdropFilter: 'blur(6px)' }}>
          <div style={{ background: '#fff', width: '92%', maxWidth: 900, height: '86vh', borderRadius: 18, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 900, color: '#0f2347', fontSize: 15 }}>👁️ Live Preview</div>
              <button onClick={() => setShowPreview(false)} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontWeight: 700 }}>✕ Close</button>
            </div>
            <div style={{ padding: '24px 32px', overflowY: 'auto', flex: 1, color: '#0f2347' }}>
              {parse(DOMPurify.sanitize(previewContent || '', { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder'] }))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}