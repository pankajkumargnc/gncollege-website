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
        <div style={{ fontSize:48 }}>⚠️</div>
        <div style={{ color:'#f4a023', fontSize:20, fontWeight:900 }}>Admin Panel Error</div>
        <div style={{ color:'rgba(255,255,255,.6)', fontSize:14, maxWidth:500, textAlign:'center', padding:'0 24px' }}>{this.state.error?.message || 'An unexpected error occurred'}</div>
        <button onClick={() => this.setState({ hasError:false, error:null })} style={{ background:'#f4a023', color:'#0f2347', border:'none', borderRadius:10, padding:'10px 24px', fontWeight:900, cursor:'pointer', fontSize:14 }}>🔄 Retry</button>
      </div>
    );
    return this.props.children;
  }
}

// ── Tab configuration ─────────────────────────────────────────────────────────
const TABS = [
  { id:'dashboard',     icon:'📊', label:'Dashboard',       section:'OVERVIEW' },
  { id:'quick',         icon:'⚡', label:'Quick Publish',    section:'' },
  { id:'alerts',        icon:'🚨', label:'Flash Alerts',     section:'CONTENT' },
  { id:'placements',    icon:'🎓', label:'Alumni Wall',      section:'' },
  { id:'faculty',       icon:'👨‍🏫',label:'Faculty & Staff', section:'' },
  { id:'departments',   icon:'🏛️', label:'Departments',     section:'' },
  { id:'campus',        icon:'📸', label:'Campus Gallery',   section:'' },
  { id:'leadership',    icon:'👑', label:'Leadership',       section:'' },
  { id:'gb_meetings',   icon:'📋', label:'GB Meetings',      section:'' },
  { id:'staff_council', icon:'👨‍🏫',label:'Staff Council',   section:'' },
  { id:'slider',        icon:'🖼️', label:'Hero Slider',     section:'' },
  { id:'menu_builder',  icon:'🧭', label:'Menu Editor',      section:'' },
  { id:'pages',         icon:'📄', label:'Pages & SEO',      section:'' },
  { id:'gallery',       icon:'📸', label:'Gallery',          section:'' },
  { id:'notices',       icon:'📢', label:'Notices',          section:'' },
  { id:'announcements', icon:'📣', label:'News',             section:'' },
  { id:'neural_studio', icon:'🧠', label:'Neural AI Studio', section:'AI CORE v3.0' },
  { id:'documents',     icon:'📁', label:'Documents',        section:'' },
  { id:'events',        icon:'🏆', label:'Events',           section:'' },
  { id:'testimonials',  icon:'💬', label:'Testimonials',      section:'' },
  { id:'youtube',       icon:'▶️', label:'YouTube',          section:'API & INTEGRATIONS' },
  { id:'drive',         icon:'☁️', label:'Drive Sync',       section:'' },
  { id:'settings',      icon:'⚙️', label:'Site Settings',    section:'SYSTEM' },
  { id:'contact',       icon:'📞', label:'Contact Settings', section:'' },
  { id:'activity',      icon:'📋', label:'Activity Log',     section:'' },
  { id:'backup',        icon:'🏰', label:'Cloud Vault & Backup', section:'' },
  { id:'system_test',   icon:'🛡️', label:'System Test',      section:'' },
];

// ── Tab loading fallback ───────────────────────────────────────────────────────
const TabLoader = () => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:80, flexDirection:'column', gap:14 }}>
    <div style={{ fontSize:32, animation:'spin .8s linear infinite', display:'inline-block' }}>⚙️</div>
    <div style={{ color:T.t3, fontSize:13, fontWeight:700 }}>Loading tab…</div>
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
    ...(notices||[]).map(n=>({...n,_t:n.text?.substring(0,50),_type:'📢 Notice',_tab:'notices'})),
    ...(announcements||[]).map(a=>({...a,_t:a.text?.substring(0,50),_type:'📣 News',_tab:'announcements'})),
    ...(events||[]).map(e=>({...e,_t:e.title,_type:'🏆 Event',_tab:'events'})),
    ...(pages||[]).map(p=>({...p,_t:p.title,_type:'📄 Page',_tab:'pages'})),
    ...(faculties||[]).map(f=>({...f,_t:f.name,_type:'👨‍🏫 Staff',_tab:'faculty'})),
    ...(placements||[]).map(p=>({...p,_t:p.name,_type:'🎓 Alumni',_tab:'placements'})),
    ...(pdfReports||[]).map(d=>({...d,_t:d.title,_type:'📁 Doc',_tab:'documents'})),
    ...(gallery||[]).map(g=>({...g,_t:g.title,_type:'📸 Photo',_tab:'gallery'})),
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
              <div style={{ fontSize: 42, marginBottom:16 }}>🔒</div>
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
            <span style={{ fontSize: 14 }}>🚪</span>
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
            <button className="abtn abtn-outline abtn-sm" onClick={()=>setShowKeyHelp(true)}>⌨ Shortcuts</button>
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
            <div style={{ fontWeight:900, color:NAVY, fontSize:18, marginBottom:20 }}>⌨️ Keyboard Shortcuts</div>
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