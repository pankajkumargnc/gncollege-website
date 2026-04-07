// ═══════════════════════════════════════════════════════════════════════════════
// GNC COLLEGE — ADMIN PANEL v11.0 (Split Architecture)
// Main shell — handles nav, global state, lazy tab loading
// ═══════════════════════════════════════════════════════════════════════════════
import React, { useState, useRef, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { db } from '../../firebase';
import {
  collection, addDoc, serverTimestamp, doc, deleteDoc,
  onSnapshot, query, orderBy, getDocs, writeBatch, limit
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { setImgbbKey } from '../MediaPicker';
import { NAVY, GOLD, WHITE, BG, T, GCSS, useDebounce } from './AdminShared';
import "../../styles/admin.css";

// ── Lazy-loaded tab components (Path FIXED: Removed '/admin' as we are already in it) ──
const DashboardTab      = lazy(() => import('./tabs/DashboardTab'));
const QuickPublishTab   = lazy(() => import('./tabs/QuickPublishTab'));
const AlertsTab         = lazy(() => import('./tabs/AlertsTab'));
const PlacementsTab     = lazy(() => import('./tabs/PlacementsTab'));
const FacultyTab        = lazy(() => import('./tabs/FacultyTab'));
const SliderTab         = lazy(() => import('./tabs/SliderTab'));
const MenuBuilderTab    = lazy(() => import('./tabs/MenuBuilderTab'));
const PagesTab          = lazy(() => import('./tabs/PagesTab'));
const GalleryTab        = lazy(() => import('./tabs/GalleryTab'));
const NoticesTab        = lazy(() => import('./tabs/NoticesTab'));
const AnnouncementsTab  = lazy(() => import('./tabs/AnnouncementsTab'));
const DocumentsTab      = lazy(() => import('./tabs/DocumentsTab'));
const EventsTab         = lazy(() => import('./tabs/EventsTab'));
const YouTubeTab        = lazy(() => import('./tabs/YouTubeTab'));
const DriveTab          = lazy(() => import('./tabs/DriveTab'));
const SettingsTab       = lazy(() => import('./tabs/SettingsTab'));
const ContactTab        = lazy(() => import('./tabs/ContactTab'));
const ActivityTab       = lazy(() => import('./tabs/ActivityTab'));
const BackupRestoreTab  = lazy(() => import('./tabs/BackupRestoreTab'));
const SystemTestTab     = lazy(() => import('./tabs/SystemTestTab'));
const MeetingPDFTab     = lazy(() => import('./tabs/MeetingPDFTab'));
const TestimonialsTab   = lazy(() => import('./tabs/TestimonialsTab'));

// Purane Admin Tabs (Jo aapne tabs folder mein move kiye hain)
const AdminNeuralStudioTab = lazy(() => import('./tabs/AdminNeuralStudioTab'));
const AdminCampusTab    = lazy(() => import('./tabs/AdminCampusTab'));
const AdminLeadershipTab= lazy(() => import('./tabs/AdminLeadershipTab'));
const AdminDepartmentTab= lazy(() => import('./tabs/AdminDepartmentTab'));

// Yeh component main 'components' folder mein hai (Ek step peechhe)
const ImageCropper      = lazy(() => import('../ImageCropper'));

// ── Error Boundary ────────────────────────────────────────────────────────────
class AdminErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', width:'100vw', position:'fixed', top:0, left:0, zIndex:99999, background:'#0f2347', flexDirection:'column', gap:16 }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f4a023" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        <div style={{ color:'#f4a023', fontSize:20, fontWeight:900 }}>Admin Panel Error</div>
        <div style={{ color:'rgba(255,255,255,.6)', fontSize:14, maxWidth:500, textAlign:'center', padding:'0 24px' }}>{this.state.error?.message || 'An unexpected error occurred'}</div>
        <button onClick={() => this.setState({ hasError:false, error:null })} style={{ display:'flex', alignItems:'center', gap:8, background:'#f4a023', color:'#0f2347', border:'none', borderRadius:10, padding:'10px 24px', fontWeight:900, cursor:'pointer', fontSize:14 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg> Retry
        </button>
      </div>
    );
    return this.props.children;
  }
}

// ── Tab configuration ─────────────────────────────────────────────────────────
// ── SVG Helper for Tabs ───────────────────────────────────────────────────────
const TabIcon = ({ path }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {path}
  </svg>
);

// ── Tab configuration ─────────────────────────────────────────────────────────
const TABS = [
  { id:'dashboard',     icon: <TabIcon path={<><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></>} />, label:'Dashboard',       section:'OVERVIEW' },
  { id:'quick',         icon: <TabIcon path={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>} />, label:'Quick Publish',    section:'' },
  { id:'alerts',        icon: <TabIcon path={<><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></>} />, label:'Flash Alerts',     section:'CONTENT' },
  { id:'placements',    icon: <TabIcon path={<><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></>} />, label:'Alumni Wall',      section:'' },
  { id:'faculty',       icon: <TabIcon path={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></>} />, label:'Faculty & Staff', section:'' },
  { id:'departments',   icon: <TabIcon path={<><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></>} />, label:'Departments',     section:'' },
  { id:'campus',        icon: <TabIcon path={<><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></>} />, label:'Campus Gallery',   section:'' },
  { id:'leadership',    icon: <TabIcon path={<><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></>} />, label:'Leadership',       section:'' },
  { id:'gb_meetings',   icon: <TabIcon path={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></>} />, label:'GB Meetings',      section:'' },
  { id:'staff_council', icon: <TabIcon path={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></>} />, label:'Staff Council',   section:'' },
  { id:'slider',        icon: <TabIcon path={<><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></>} />, label:'Hero Slider',     section:'' },
  { id:'menu_builder',  icon: <TabIcon path={<><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>} />, label:'Menu Editor',      section:'' },
  { id:'pages',         icon: <TabIcon path={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></>} />, label:'Pages & SEO',      section:'' },
  { id:'gallery',       icon: <TabIcon path={<><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></>} />, label:'Gallery',          section:'' },
  { id:'notices',       icon: <TabIcon path={<><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></>} />, label:'Notices',          section:'' },
  { id:'announcements', icon: <TabIcon path={<><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></>} />, label:'News',             section:'' },
  { id:'neural_studio', icon: <TabIcon path={<><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></>} />, label:'Neural AI Studio', section:'AI CORE v3.0' },
  { id:'documents',     icon: <TabIcon path={<><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></>} />, label:'Documents',        section:'' },
  { id:'events',        icon: <TabIcon path={<><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></>} />, label:'Events',           section:'' },
  { id:'testimonials',  icon: <TabIcon path={<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></>} />, label:'Testimonials',      section:'' },
  { id:'youtube',       icon: <TabIcon path={<><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></>} />, label:'YouTube',          section:'API & INTEGRATIONS' },
  { id:'drive',         icon: <TabIcon path={<><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></>} />, label:'Drive Sync',       section:'' },
  { id:'settings',      icon: <TabIcon path={<><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></>} />, label:'Site Settings',    section:'SYSTEM' },
  { id:'contact',       icon: <TabIcon path={<><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></>} />, label:'Contact Settings', section:'' },
  { id:'activity',      icon: <TabIcon path={<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></>} />, label:'Activity Log',     section:'' },
  { id:'backup',        icon: <TabIcon path={<><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></>} />, label:'Cloud Vault & Backup', section:'' },
  { id:'system_test',   icon: <TabIcon path={<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></>} />, label:'System Test',      section:'' },
];

// ── Tab loading fallback (UUPM Shimmer Skeleton) ───────────────────────────────
const TabLoader = () => (
  <div style={{ display:'flex', flexDirection:'column', gap:20, padding:'40px' }}>
    <div style={{ display:'flex', alignItems:'center', gap:15, marginBottom:20 }}>
      <div style={{ width: 60, height: 60, borderRadius: '14px', background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)', backgroundSize: '200% 100%', animation: 'gnc-shimmer 1.4s ease-in-out infinite' }} />
      <div>
        <div style={{ width: 200, height: 24, borderRadius: 8, background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)', backgroundSize: '200% 100%', animation: 'gnc-shimmer 1.4s ease-in-out infinite', marginBottom: 8 }} />
        <div style={{ width: 120, height: 14, borderRadius: 8, background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)', backgroundSize: '200% 100%', animation: 'gnc-shimmer 1.4s ease-in-out infinite' }} />
      </div>
    </div>
    {Array(3).fill(0).map((_, i) => (
      <div key={i} style={{ width: '100%', height: 80, borderRadius: 12, background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)', backgroundSize: '200% 100%', animation: 'gnc-shimmer 1.4s ease-in-out infinite' }} />
    ))}
  </div>
);

// ── Main AdminPanel Component ─────────────────────────────────────────────────
function AdminPanelInner({
  onClose, notices: noticesProp, pages: pagesProp, events: eventsProp,
  gallery: galleryProp, pdfReports: pdfReportsProp,
  announcements: announcementsProp, sliderSlides: sliderSlidesProp,
  navLinks, faculties: facultiesProp, placements: placementsProp, alerts: alertsProp
}) {
  const [tab, setTab] = useState('dashboard');
  const [sideOpen, setSideOpen] = useState(false);
  const [sideCollapsed, setSideCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  const [globalSearch, setGlobalSearch] = useState('');
  const [showKeyHelp, setShowKeyHelp] = useState(false);
  const contentRef = useRef(null);

  // ── Live data subscriptions ───────────────────────────────────────────────
  const [_pdfReports,   set_pdfReports]   = useState([]);
  const [_pages,        set_pages]        = useState([]);
  const [_placements,   set_placements]   = useState([]);
  const [_alerts,       set_alerts]       = useState([]);
  const [_sliderSlides, set_sliderSlides] = useState([]);
  const [_testimonials, set_testimonials] = useState([]);

  useEffect(() => {
    const subs = [
      ['pdfReports', set_pdfReports], ['pages', set_pages],
      ['placements', set_placements], ['alerts', set_alerts], 
      ['sliderSlides', set_sliderSlides], ['testimonials', set_testimonials],
    ].map(([col, setter]) => {
      try {
        return onSnapshot(query(collection(db, col)), snap => {
          const docs = snap.docs.map(d => ({ ...d.data(), id: d.id }));
          docs.sort((a, b) => (b.createdAt?.toMillis()||0) - (a.createdAt?.toMillis()||0));
          setter(docs);
        }, () => {});
      } catch { return () => {}; }
    });
    return () => subs.forEach(u => u && u());
  }, []);

  const pdfReports   = pdfReportsProp    || _pdfReports;
  const pages        = pagesProp         || _pages;
  const placements   = placementsProp    || _placements;
  const alerts       = alertsProp        || _alerts;
  const sliderSlides = sliderSlidesProp  || _sliderSlides;
  const testimonials = _testimonials;
  const notices      = noticesProp       || [];
  const announcements= announcementsProp || [];
  const events       = eventsProp        || [];
  const gallery      = galleryProp       || [];
  const faculties    = facultiesProp     || [];

  // ── Activity log ──────────────────────────────────────────────────────────
  const [actLog, setActLog] = useState([]);
  useEffect(() => {
    try {
      const q = query(collection(db, 'adminLogs'), orderBy('time','desc'), limit(30));
      return onSnapshot(q, s => setActLog(s.docs.map(d => ({ id: d.id, ...d.data() }))));
    } catch { return () => {}; }
  }, []);

  const logAct = useCallback(async (action, message, section='') => {
    try { await addDoc(collection(db, 'adminLogs'), { action, message, section, time: new Date().toISOString(), createdAt: serverTimestamp() }); } catch (_) {}
  }, []);

  const getSectionLog = useCallback(section => actLog.filter(l => l.section === section).slice(0, 3), [actLog]);

  // ── Crop state ────────────────────────────────────────────────────────────
  const [cropSrc, setCropSrc] = useState(null);
  const [cropCb, setCropCb] = useState(null);
  const handleCrop = async blob => { if (cropCb) await cropCb(blob); setCropSrc(null); setCropCb(null); };

  // ── Shared delete helpers ─────────────────────────────────────────────────
  const softDelete = useCallback(async (colName, id, data, displayName) => {
    await deleteDoc(doc(db, colName, id));
    logAct('delete', `Deleted: ${displayName}`, colName);
    toast(t => (
      <span style={{ display:'flex', alignItems:'center', gap:10 }}>
        <span>🗑️ "{displayName}" deleted</span>
        <button onClick={async () => { try { await addDoc(collection(db, colName), data); toast.success('Restored!'); logAct('add', `Restored: ${displayName}`, colName); } catch {} toast.dismiss(t.id); }}
          style={{ background:GOLD, color:NAVY, border:'none', borderRadius:6, padding:'4px 12px', fontWeight:800, cursor:'pointer', fontSize:12 }}>↩ Undo</button>
      </span>
    ), { duration: 5000 });
  }, [logAct]);

  const bulkDelete = useCallback(async (colName, ids) => {
    if (!window.confirm(`Delete ${ids.length} items permanently?`)) return;
    const batch = writeBatch(db);
    ids.forEach(id => batch.delete(doc(db, colName, id)));
    await batch.commit();
    logAct('delete', `Bulk deleted ${ids.length} from ${colName}`, colName);
    toast.success(`${ids.length} items deleted`);
  }, [logAct]);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    const fn = e => {
      if ((e.ctrlKey||e.metaKey) && e.key==='k') { e.preventDefault(); document.querySelector('.top-search input')?.focus(); }
      if ((e.ctrlKey||e.metaKey) && e.key==='/') { e.preventDefault(); setShowKeyHelp(h=>!h); }
      if (e.key==='Escape') { setSideOpen(false); setShowKeyHelp(false); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  // ── PWA Push Notification Permission ────────────────────────────────────
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      // Delay slightly to avoid blocking initial render
      const timer = setTimeout(() => {
        Notification.requestPermission().catch(() => {});
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // ── Global search ─────────────────────────────────────────────────────────
  const dSearch = useDebounce(globalSearch, 250);
  const allItems = useMemo(() => [
    ...(notices||[]).map(n=>({...n,_t:n.text?.substring(0,50),_type:'Notice',_tab:'notices'})),
    ...(announcements||[]).map(a=>({...a,_t:a.text?.substring(0,50),_type:'News',_tab:'announcements'})),
    ...(events||[]).map(e=>({...e,_t:e.title,_type:'Event',_tab:'events'})),
    ...(pages||[]).map(p=>({...p,_t:p.title,_type:'Page',_tab:'pages'})),
    ...(faculties||[]).map(f=>({...f,_t:f.name,_type:'Staff',_tab:'faculty'})),
    ...(placements||[]).map(p=>({...p,_t:p.name,_type:'Alumni',_tab:'placements'})),
    ...(pdfReports||[]).map(d=>({...d,_t:d.title,_type:'Doc',_tab:'documents'})),
    ...(gallery||[]).map(g=>({...g,_t:g.title,_type:'Photo',_tab:'gallery'})),
  ], [notices,announcements,events,pages,faculties,placements,pdfReports,gallery]);

  const searchResults = useMemo(() =>
    dSearch.length > 1 ? allItems.filter(i => i._t?.toLowerCase().includes(dSearch.toLowerCase())).slice(0,12) : [],
    [allItems, dSearch]
  );

  const liveAlertCount = (alerts||[]).filter(a=>a.isActive).length || null;

  // ── Shared props passed to all tabs ───────────────────────────────────────
  const sharedProps = { logAct, getSectionLog, softDelete, bulkDelete };

  const [isExiting, setIsExiting] = useState(false);

  // ── ✅ PREMIUM LOGOUT FUNCTION WITH ANIMATION ─────────────────────────────
  const handlePremiumLogout = () => {
    setIsExiting(true);
    toast.success('Terminating Session... 👋', {
      duration: 2500,
      style: { background: '#0f2347', color: '#fff', border: '1.5px solid #f4a023' }
    });
    
    // Simulate a secure shutdown sequence
    setTimeout(() => {
      if(onClose) onClose();
    }, 2500);
  };

  // ── Render tab content ────────────────────────────────────────────────────
  const renderTab = () => {
    switch(tab) {
      case 'dashboard':    return <DashboardTab notices={notices} events={events} faculties={faculties} placements={placements} pdfReports={pdfReports} alerts={alerts} gallery={gallery} pages={pages} actLog={actLog} onNavigate={setTab} {...sharedProps} />;
      case 'quick':        return <QuickPublishTab {...sharedProps} />;
      case 'alerts':       return <AlertsTab alerts={alerts} {...sharedProps} />;
      case 'placements':   return <PlacementsTab placements={placements} {...sharedProps} />;
      case 'faculty':      return <FacultyTab faculties={faculties} {...sharedProps} />;
      case 'departments':  return <AdminDepartmentTab />;
      case 'campus':       return <AdminCampusTab />;
      case 'leadership':   return <AdminLeadershipTab />;
      case 'gb_meetings':  return <MeetingPDFTab collectionName="gb_meetings" title="Governing Body (GB) Meetings" subtitle="GB Meeting PDFs — /about-us/governing-body" accentColor="#0f2347" icon="📋" {...sharedProps} />;
      case 'staff_council':return <MeetingPDFTab collectionName="staff_council" title="Staff Council Meetings" subtitle="Staff Council PDFs — /about-us/staff-council" accentColor="#1a3a7c" icon="👨‍🏫" {...sharedProps} />;
      case 'slider':       return <SliderTab sliderSlides={sliderSlides} {...sharedProps} />;
      case 'menu_builder': return <MenuBuilderTab navLinks={navLinks} {...sharedProps} />;
      case 'pages':        return <PagesTab pages={pages} {...sharedProps} />;
      case 'gallery':      return <GalleryTab gallery={gallery} {...sharedProps} />;
      case 'notices':      return <NoticesTab notices={notices} {...sharedProps} />;
      case 'announcements':return <AnnouncementsTab announcements={announcements} {...sharedProps} />;
      case 'neural_studio':return <AdminNeuralStudioTab {...sharedProps} />;
      case 'documents':    return <DocumentsTab pdfReports={pdfReports} {...sharedProps} />;
      case 'events':       return <EventsTab events={events} {...sharedProps} />;
      case 'testimonials': return <TestimonialsTab testimonials={testimonials} {...sharedProps} />;
      case 'youtube':      return <YouTubeTab {...sharedProps} />;
      case 'drive':        return <DriveTab {...sharedProps} />;
      case 'settings':     return <SettingsTab {...sharedProps} />;
      case 'contact':      return <ContactTab {...sharedProps} />;
      case 'activity':     return <ActivityTab actLog={actLog} />;
      case 'backup':       return <BackupRestoreTab {...sharedProps} />;
      case 'system_test':  return <SystemTestTab {...sharedProps} />;
      default: return null;
    }
  };

  return (
    <div className="adm" style={{ display:'flex', height:'100vh', width:'100vw', position:'fixed', top:0, left:0, zIndex:99999, overflow:'hidden', background: '#f8fafc' }}>
      <style>{GCSS + `
        .exit-overlay {
            position: fixed; inset: 0; background: #0f172a; z-index: 1000000;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            opacity: 1; transition: opacity 0.5s;
        }
        .exit-shutter {
            position: absolute; left: 0; right: 0; height: 50%; background: #000;
            transition: all 1s cubic-bezier(0.85, 0, 0.15, 1);
        }
        .exit-top { top: 0; transform: translateY(-100%); }
        .exit-bottom { bottom: 0; transform: translateY(100%); }
        .is-exiting .exit-top { transform: translateY(0); }
        .is-exiting .exit-bottom { transform: translateY(0); }
        
        .exit-monitor {
            width: 300px; padding: 24px; background: rgba(0,0,0,0.4); border: 2px solid rgba(244,160,35,0.4);
            border-radius: 20px; text-align: center; color: #fff; position: relative; z-index: 2;
            backdrop-filter: blur(20px);
        }
        .exit-scan {
            position: absolute; top: 0; left: 0; width: 100%; height: 2px;
            background: #f4a023; opacity: 0.8; box-shadow: 0 0 15px #f4a023;
            animation: exit-scan 1.5s infinite;
        }
        @keyframes exit-scan { 0% { top: 0; } 100% { top: 100%; } }

        /* 💓 HEARTBEAT PULSE */
        .live-pulse {
            width: 8px; height: 8px; background: #22c55e; border-radius: 50%;
            display: inline-block; margin-right: 8px;
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
            animation: pulse-green 2s infinite;
        }
        @keyframes pulse-green {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        /* 🌊 FLUID FILL & BOUNCY BUTTON CUSTOM CSS */
        .fluid-btn {
            position: relative; overflow: hidden; height: 38px !important;
            padding: 0 16px !important; margin: 0 auto !important; width: fit-content !important;
            background: rgba(239, 68, 68, 0.1) !important;
            border: 1px solid rgba(239, 68, 68, 0.3) !important;
            color: #ef4444 !important; font-size: 11.5px !important; font-weight: 800 !important;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            border-radius: 50px !important; cursor: pointer;
            display: flex; align-items: center; gap: 8px; z-index: 1;
        }
        .fluid-btn:hover { transform: scale(1.08); background: transparent !important; color: #fff !important; border-color: #ef4444 !important; }
        .fluid-btn:active { transform: scale(0.95); }
        .fluid-btn::before {
            content: ''; position: absolute; top: 100%; left: 0; width: 100%; height: 100%;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            transition: top 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: -1; border-radius: 50px;
        }
        .fluid-btn:hover::before { top: 0; }
      `}</style>

      {/* 🛡️ ULTRA ADVANCE LOGOUT TRANSITION OVERLAY */}
      {isExiting && (
        <div className={`exit-overlay ${isExiting ? 'is-exiting' : ''}`}>
           <div className="exit-shutter exit-top" />
           <div className="exit-shutter exit-bottom" />
           <div className="exit-monitor fade-up">
              <div className="exit-scan" />
              <div style={{ marginBottom:16 }}>
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#f4a023" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <div style={{ fontWeight: 900, color: '#f4a023', letterSpacing: 2, marginBottom: 8 }}>SESSION TERMINATED</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Disconnecting from GNC Core...</div>
              <div style={{ marginTop: 24, fontSize: 11, fontFamily: 'monospace', color: '#94a3b8' }}>
                CLEANING CACHE... DONE<br/>
                UPLOADING LOGS... DONE<br/>
                SECURE LOGOUT... READY
              </div>
           </div>
        </div>
      )}

      {/* Crop overlay */}
      {cropSrc && (
        <Suspense fallback={<div style={{ position:'fixed', inset:0, zIndex:100010, background:'rgba(15,35,71,.92)', color:WHITE, display:'flex', alignItems:'center', justifyContent:'center' }}>Loading Cropper…</div>}>
          <ImageCropper src={cropSrc} onCrop={handleCrop} onCancel={() => { setCropSrc(null); setCropCb(null); }} />
        </Suspense>
      )}

      {/* ── Sidebar ── */}
      <div className={`adm-side ${sideCollapsed&&!isMobile?'collapsed':''} ${isMobile&&sideOpen?'open':''}`}>
        <div className="adm-brand">
          <img 
            src="images/logo.webp" 
            alt="GNC Logo" 
            style={{ 
              width: 38, height: 38, borderRadius: 8, 
              objectFit: 'contain', background: '#fff', padding: 2, 
              flexShrink: 0, cursor: 'pointer' 
            }}
            onClick={() => isMobile ? setSideOpen(false) : setSideCollapsed(c=>!c)}
          />
          <div className="adm-brand-text" style={{ marginLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontWeight: 900, color: WHITE, fontSize: 13, lineHeight: 1.2, display: 'flex', alignItems: 'center' }}>
              <span className="live-pulse" /> Guru Nanak College
            </div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginTop: 2 }}>
              Dhanbad, Jharkhand - 826001
            </div>
            <div style={{ fontWeight: 900, color: WHITE, fontSize: 15, lineHeight: 1.8 }}>
              GNC Admin Panel
            </div>
          </div>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'8px 0' }}>
          {(() => {
            let lastSec = '';
            return TABS.map(t => {
              const showSec = t.section && t.section !== lastSec;
              if (t.section) lastSec = t.section;
              const badge = t.id === 'alerts' ? liveAlertCount : null;
              return (
                <React.Fragment key={t.id}>
                  {showSec && <div className="adm-sec-label">{t.section}</div>}
                  <div className={`anav ${tab===t.id?'active':''}`} onClick={() => { setTab(t.id); if (isMobile) setSideOpen(false); }} title={t.label}>
                    <span style={{ fontSize:16, width:22, textAlign:'center', flexShrink:0 }}>{t.icon}</span>
                    <span className="nav-label" style={{ flex:1 }}>{t.label}</span>
                    {badge ? <span className="nav-badge">{badge}</span> : null}
                  </div>
                </React.Fragment>
              );
            });
          })()}
        </div>

        <div className="adm-side-footer" style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="fluid-btn" onClick={handlePremiumLogout}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span className="nav-label" style={{ opacity: sideCollapsed && !isMobile ? 0 : 1 }}>EXIT CORE</span>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && sideOpen && <div onClick={()=>setSideOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(15,35,71,.6)', zIndex:10000, backdropFilter:'blur(3px)' }} />}

      {/* ── Main content ── */}
      <div className="adm-main">
        {/* Mobile top bar */}
        <div className="adm-mobile-top">
          <button onClick={()=>setSideOpen(true)} style={{ background:'none', border:'none', fontSize:22, cursor:'pointer', color:NAVY }} aria-label="Open navigation menu">☰</button>
          <span style={{ fontWeight:900, color:NAVY, fontSize:14 }}>GNC Admin Panel</span>
          <div style={{ width: 44 }} />
        </div>

        {/* Top bar */}
        <div className="adm-topbar">
          {!isMobile && <button onClick={()=>setSideCollapsed(c=>!c)} style={{ background:'none', border:'none', fontSize:18, cursor:'pointer', color:T.t3, flexShrink:0 }} aria-label="Toggle sidebar">☰</button>}
          
          <div className="top-search" style={{ position:'relative' }}>
            <input placeholder="Search everything... (Ctrl+K)" value={globalSearch} onChange={(e)=>setGlobalSearch(e.target.value)} />
            {searchResults.length > 0 && (
              <div style={{ position:'absolute', top:'100%', left:0, right:0, background:WHITE, border:`1.5px solid ${T.b1}`, borderRadius:12, boxShadow:T.shadowHov, zIndex:1000, maxHeight:320, overflowY:'auto', marginTop:4 }}>
                {searchResults.map((item,i) => (
                  <div key={i} onClick={()=>{setTab(item._tab);setGlobalSearch('');}} style={{ padding:'10px 14px', display:'flex', alignItems:'center', gap:10, cursor:'pointer', borderBottom:`1px solid ${T.b1}` }}
                    onMouseEnter={e=>e.currentTarget.style.background=BG} onMouseLeave={e=>e.currentTarget.style.background=WHITE}>
                    <span className="abadge" style={{ background:`${NAVY}12`, color:NAVY, fontSize:10 }}>{item._type}</span>
                    <span style={{ fontSize:13, color:T.t1, fontWeight:600, flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item._t}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:T.t3, fontWeight:700 }}>
              <div className="glow" style={{ width:7, height:7, borderRadius:'50%' }} />
              <span style={{ color:T.green }}>Live</span>
            </div>

            <div style={{ background:BG, border:`1.5px solid ${T.b1}`, borderRadius:8, padding:'6px 12px', fontSize:12, fontWeight:700, color:T.t2 }}>
              {new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}
            </div>
            <button className="abtn abtn-outline abtn-sm" onClick={()=>setShowKeyHelp(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="6" y1="8" x2="6.01" y2="8"></line><line x1="10" y1="8" x2="10.01" y2="8"></line><line x1="14" y1="8" x2="14.01" y2="8"></line><line x1="18" y1="8" x2="18.01" y2="8"></line><line x1="8" y1="12" x2="8.01" y2="12"></line><line x1="12" y1="12" x2="12.01" y2="12"></line><line x1="16" y1="12" x2="16.01" y2="12"></line><line x1="7" y1="16" x2="17" y2="16"></line></svg>
              Shortcuts
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="adm-content" ref={contentRef}>
          <Suspense fallback={<TabLoader />}>
            {renderTab()}
          </Suspense>
        </div>
      </div>

      {/* Keyboard shortcuts modal */}
      {showKeyHelp && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,35,71,.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100001, backdropFilter:'blur(4px)' }} onClick={()=>setShowKeyHelp(false)}>
          <div style={{ background:WHITE, borderRadius:18, padding:'28px 32px', width:440, boxShadow:'0 20px 50px rgba(0,0,0,.2)' }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:'flex', alignItems:'center', gap:10, fontWeight:900, color:NAVY, fontSize:18, marginBottom:20 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="6" y1="8" x2="6.01" y2="8"></line><line x1="10" y1="8" x2="10.01" y2="8"></line><line x1="14" y1="8" x2="14.01" y2="8"></line><line x1="18" y1="8" x2="18.01" y2="8"></line><line x1="8" y1="12" x2="8.01" y2="12"></line><line x1="12" y1="12" x2="12.01" y2="12"></line><line x1="16" y1="12" x2="16.01" y2="12"></line><line x1="7" y1="16" x2="17" y2="16"></line></svg>
              Keyboard Shortcuts
            </div>
            {[['Ctrl + K','Global search focus'],['Ctrl + /','Toggle this help panel'],['Escape','Close panels / modals']].map(([key,desc])=>(
              <div key={key} style={{ display:'flex', alignItems:'center', gap:14, padding:'10px 0', borderBottom:`1px solid ${T.b1}` }}>
                <code style={{ background:BG, border:`1.5px solid ${T.b1}`, borderRadius:7, padding:'4px 12px', fontSize:12, fontWeight:800, color:NAVY, fontFamily:"'JetBrains Mono',monospace", flexShrink:0 }}>{key}</code>
                <span style={{ fontSize:13, color:T.t2, fontWeight:600 }}>{desc}</span>
              </div>
            ))}
            <button className="abtn abtn-navy" style={{ marginTop:20, width:'100%', justifyContent:'center' }} onClick={()=>setShowKeyHelp(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPanel(props) {
  return (
    <AdminErrorBoundary>
      <AdminPanelInner {...props} />
    </AdminErrorBoundary>
  );
}