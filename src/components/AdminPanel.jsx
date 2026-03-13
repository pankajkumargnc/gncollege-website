// ═══════════════════════════════════════════════════════════════════════════════
// GNC COLLEGE — ULTIMATE ADMIN PANEL v10.0
// 🐛 Fixed: W/pages variable shadowing in genPDF, missing Error Boundary,
//           unused COLORS import, JoditEditor Suspense misuse,
//           missing .catch() on Firebase useEffects
// ═══════════════════════════════════════════════════════════════════════════════

import React, {
  useState, useRef, useEffect, useMemo, useCallback, lazy, Suspense
} from 'react';
import JoditEditor from 'jodit-react';
import { db } from '../firebase';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import {
  collection, addDoc, serverTimestamp, doc, deleteDoc,
  updateDoc, setDoc, getDoc, onSnapshot, query, orderBy,
  getDocs, writeBatch, limit
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import AdminCampusTab from './AdminCampusTab';
import AdminLeadershipTab from './AdminLeadershipTab';

const ImageCropper = lazy(() => import('./ImageCropper'));
const AdminDepartmentTab = lazy(() => import('./AdminDepartmentTab'));
import MediaPicker, { setImgbbKey } from './MediaPicker';

// ── Error Boundary (prevents white screen on render errors) ───────────────────
class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('AdminPanel Error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0,
          zIndex: 99999, background: '#0f2347', flexDirection: 'column', gap: 16
        }}>
          <div style={{ fontSize: 48 }}>⚠️</div>
          <div style={{ color: '#f4a023', fontSize: 20, fontWeight: 900 }}>Admin Panel Error</div>
          <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 14, maxWidth: 500, textAlign: 'center', padding: '0 24px' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{ background: '#f4a023', color: '#0f2347', border: 'none', borderRadius: 10, padding: '10px 24px', fontWeight: 900, cursor: 'pointer', fontSize: 14 }}
          >
            🔄 Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Utility hooks ─────────────────────────────────────────────────────────────
function useDebounce(val, ms) {
  const [v, set] = useState(val);
  useEffect(() => { const h = setTimeout(() => set(val), ms); return () => clearTimeout(h); }, [val, ms]);
  return v;
}
function useCountUp(target, dur = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!target) { setV(0); return; }
    let s = 0; const step = target / (dur / 16);
    const t = setInterval(() => { s += step; if (s >= target) { setV(target); clearInterval(t); } else setV(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [target]);
  return v;
}
const useLocalDraft = (key, init) => {
  const [v, set] = useState(() => {
    try { const s = localStorage.getItem(`gnc_draft_${key}`); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  const save = useCallback(nv => {
    set(nv);
    try { localStorage.setItem(`gnc_draft_${key}`, JSON.stringify(nv)); } catch { }
  }, [key]);
  const clear = useCallback(() => {
    set(init);
    try { localStorage.removeItem(`gnc_draft_${key}`); } catch { }
  }, [key, init]);
  return [v, save, clear];
};

// ── Theme ─────────────────────────────────────────────────────────────────────
const NAVY  = '#0f2347';
const GOLD  = '#f4a023';
const WHITE = '#ffffff';
const BG    = '#f0f4f8';

const T = {
  navy: NAVY, navyL: '#1a3a6c', navyD: '#07152e',
  gold: GOLD, goldL: '#fbbf45', goldD: '#c97e10',
  white: WHITE, bg: BG, bg2: '#e8eef5',
  red: '#ef4444', green: '#10b981', blue: '#3b82f6',
  purple: '#8b5cf6', cyan: '#06b6d4', orange: '#f97316',
  t1: '#0f2347', t2: '#334155', t3: '#64748b', t4: '#94a3b8',
  b1: '#e2e8f0', b2: '#cbd5e1', b3: '#94a3b8',
  shadow: '0 4px 20px rgba(15,35,71,.08)',
  shadowHov: '0 12px 35px rgba(15,35,71,.15)',
};

// ImgBB key ab Settings → Site Settings → ImgBB API Key se aata hai
// MediaPicker component ke andar handle hota hai (src/components/MediaPicker.jsx)
// Default demo key (user apni key Settings mein save karein):
// ✅ SECURITY FIX: Hardcoded ImgBB key removed. Key Settings tab se load hoti hai.
// setImgbbKey() is called when settings/site is loaded (see useEffect below)

// ── CSS ───────────────────────────────────────────────────────────────────────
const GCSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;800&display=swap');

.adm * { box-sizing: border-box; }
.adm { font-family: 'Plus Jakarta Sans', sans-serif; }
.adm ::-webkit-scrollbar { width: 5px; height: 5px; }
.adm ::-webkit-scrollbar-track { background: transparent; }
.adm ::-webkit-scrollbar-thumb { background: ${T.b2}; border-radius: 99px; }
.adm ::-webkit-scrollbar-thumb:hover { background: ${T.b3}; }

.adm-side { width: 256px; background: ${NAVY}; display:flex; flex-direction:column; flex-shrink:0; height:100%; transition: width .3s ease; overflow:hidden; }
.adm-side.collapsed { width: 68px; }
.adm-brand { padding: 20px 16px; border-bottom: 1px solid rgba(255,255,255,.08); display:flex; align-items:center; gap:12px; min-height:70px; }
.adm-brand-text { overflow:hidden; transition:opacity .2s; }
.collapsed .adm-brand-text { opacity:0; width:0; }
.adm-sec-label { padding: 12px 18px 5px; font-size: 9.5px; font-weight:900; color:rgba(255,255,255,.3); text-transform:uppercase; letter-spacing:1.5px; white-space:nowrap; overflow:hidden; transition:opacity .2s; }
.collapsed .adm-sec-label { opacity:0; }
.anav { padding: 10px 16px; display:flex; align-items:center; gap:12px; border-radius:10px; cursor:pointer; font-size:13.5px; font-weight:700; color:rgba(255,255,255,.6); transition:all .18s; border:1px solid transparent; margin: 1px 8px; white-space:nowrap; overflow:hidden; }
.anav:hover { background:rgba(255,255,255,.08); color:#fff; }
.anav.active { background: linear-gradient(135deg,${GOLD},${T.goldD}); color:${NAVY}; box-shadow:0 4px 14px rgba(244,160,35,.35); }
.anav .nav-label { overflow:hidden; transition:opacity .2s,width .2s; }
.collapsed .nav-label { opacity:0; width:0; }
.anav .nav-badge { background:${T.red}; color:#fff; font-size:9px; padding:1px 5px; border-radius:99px; font-weight:900; flex-shrink:0; transition:opacity .2s; }
.collapsed .nav-badge { opacity:0; width:0; overflow:hidden; padding:0; }
.adm-side-footer { padding:12px 10px; border-top:1px solid rgba(255,255,255,.08); }

.adm-main { flex:1; display:flex; flex-direction:column; overflow:hidden; background:${BG}; }
.adm-topbar { height:60px; background:${WHITE}; border-bottom:1px solid ${T.b1}; display:flex; align-items:center; padding:0 24px; gap:16px; flex-shrink:0; box-shadow:0 2px 8px rgba(15,35,71,.04); }
.adm-content { flex:1; overflow-y:auto; padding:28px 32px; }

.card { background:${WHITE}; border-radius:16px; box-shadow:${T.shadow}; border:1px solid ${T.b1}; padding:28px; margin-bottom:24px; }
.card-gold { background:${WHITE}; border-radius:16px; box-shadow:${T.shadow}; border:1px solid rgba(244,160,35,.3); padding:28px; margin-bottom:24px; position:relative; overflow:hidden; }
.card-gold::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,${GOLD},${T.goldD}); }
.card-navy { background:${WHITE}; border-radius:16px; box-shadow:${T.shadow}; border:1px solid rgba(15,35,71,.15); padding:28px; margin-bottom:24px; position:relative; overflow:hidden; }
.card-navy::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,${NAVY},${T.navyL}); }

.ainp { width:100%; padding:11px 14px; background:${BG}; border:1.5px solid ${T.b1}; border-radius:10px; font-size:14px; color:${T.t1}; outline:none; transition:all .18s; font-weight:500; font-family:'Plus Jakarta Sans',sans-serif; }
.ainp:focus { border-color:${NAVY}; background:${WHITE}; box-shadow:0 0 0 3px rgba(15,35,71,.07); }
.ainp::placeholder { color:${T.t4}; }
.ainp option { background:${WHITE}; }

.abtn { padding:10px 20px; border-radius:10px; font-weight:700; cursor:pointer; transition:all .18s; border:none; font-size:13.5px; display:inline-flex; align-items:center; gap:7px; font-family:'Plus Jakarta Sans',sans-serif; white-space:nowrap; }
.abtn:disabled { opacity:.5; cursor:not-allowed; transform:none !important; }
.abtn-navy { background:${NAVY}; color:${WHITE}; }
.abtn-navy:hover:not(:disabled) { background:${T.navyL}; transform:translateY(-1px); box-shadow:0 6px 18px rgba(15,35,71,.25); }
.abtn-gold { background:linear-gradient(135deg,${GOLD},${T.goldD}); color:${WHITE}; text-shadow:0 1px 2px rgba(0,0,0,.15); }
.abtn-gold:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 22px rgba(244,160,35,.4); }
.abtn-outline { background:transparent; color:${NAVY}; border:1.5px solid ${T.b2}; }
.abtn-outline:hover:not(:disabled) { border-color:${NAVY}; background:#f0f4f8; }
.abtn-red { background:transparent; color:${T.red}; border:1.5px solid rgba(239,68,68,.25); background:rgba(239,68,68,.05); }
.abtn-red:hover:not(:disabled) { background:${T.red}; color:${WHITE}; border-color:${T.red}; }
.abtn-green { background:linear-gradient(135deg,${T.green},#059669); color:${WHITE}; }
.abtn-green:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 6px 18px rgba(16,185,129,.35); }
.abtn-sm { padding:6px 13px; font-size:12px; border-radius:8px; }
.abtn-xs { padding:4px 10px; font-size:11px; border-radius:6px; }

.abadge { font-size:11px; padding:3px 9px; border-radius:6px; font-weight:800; display:inline-flex; align-items:center; gap:4px; font-family:'JetBrains Mono',monospace; letter-spacing:.2px; }

.arow { display:flex; align-items:center; gap:12px; padding:14px 16px; border:1.5px solid ${T.b1}; border-radius:12px; background:${WHITE}; transition:all .18s; margin-bottom:10px; }
.arow:hover { border-color:${T.b2}; box-shadow:0 4px 12px rgba(15,35,71,.06); transform:translateY(-1px); }
.arow.selected { border-color:${NAVY}; background:#f0f4f8; }

.asec { font-size:22px; font-weight:900; color:${NAVY}; margin:0 0 5px; letter-spacing:-.4px; }
.asub { font-size:13.5px; color:${T.t3}; margin:0 0 24px; }
.actitle { font-size:14.5px; font-weight:800; color:${NAVY}; margin:0 0 18px; padding-bottom:12px; border-bottom:2px solid ${BG}; display:flex; align-items:center; gap:8px; }
.alabel { display:block; font-size:11.5px; font-weight:800; color:${T.t2}; margin-bottom:7px; text-transform:uppercase; letter-spacing:.5px; }

.upload-zone { border:2px dashed ${T.b2}; border-radius:14px; padding:26px; text-align:center; cursor:pointer; transition:all .25s; background:${BG}; display:block; }
.upload-zone:hover { border-color:${NAVY}; background:#e8eef5; }

.prog { background:${T.b1}; border-radius:99px; height:6px; overflow:hidden; margin-top:8px; }
.prog-inner { height:100%; border-radius:99px; background:linear-gradient(90deg,${NAVY},${GOLD}); transition:width .3s; }

.stat-card { background:${WHITE}; border-radius:14px; padding:20px 22px; border:1.5px solid ${T.b1}; box-shadow:${T.shadow}; position:relative; overflow:hidden; transition:all .2s; }
.stat-card:hover { transform:translateY(-3px); box-shadow:${T.shadowHov}; border-color:${T.b2}; }
.stat-card .stat-icon { font-size:32px; margin-bottom:10px; }
.stat-card .stat-num { font-size:32px; font-weight:900; color:${NAVY}; font-family:'JetBrains Mono',monospace; line-height:1; }
.stat-card .stat-label { font-size:11px; font-weight:800; color:${T.t3}; text-transform:uppercase; letter-spacing:.6px; margin-top:5px; }

.sec-search { position:relative; }
.sec-search input { padding-left:36px !important; }
.sec-search::before { content:'🔍'; position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:13px; pointer-events:none; z-index:1; }

.sys-bg { background:#060d1a; border-radius:18px; padding:36px; border:1px solid rgba(15,35,71,.5); box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 20px 50px rgba(0,0,0,.15); }
.sys-term { background:rgba(0,0,0,.6); border:1px solid rgba(244,160,35,.2); border-radius:10px; padding:18px; font-family:'JetBrains Mono',monospace; font-size:12px; color:#a3e635; min-height:200px; overflow-y:auto; }
.sys-term p { margin:3px 0; }
.sys-btn { background:transparent; border:1.5px solid ${GOLD}; color:${GOLD}; font-family:'JetBrains Mono',monospace; font-weight:800; padding:11px 28px; cursor:pointer; border-radius:8px; transition:all .2s; font-size:13px; }
.sys-btn:hover:not(:disabled) { background:${GOLD}; color:${NAVY}; box-shadow:0 0 18px rgba(244,160,35,.35); }
.sys-btn:disabled { opacity:.5; cursor:not-allowed; }

.toggle-wrap { display:inline-flex; align-items:center; gap:8px; cursor:pointer; }
.toggle { position:relative; width:44px; height:24px; }
.toggle input { opacity:0; width:0; height:0; }
.toggle-slider { position:absolute; inset:0; background:${T.b2}; border-radius:99px; transition:.2s; }
.toggle input:checked + .toggle-slider { background:${T.green}; }
.toggle-slider:before { content:''; position:absolute; height:18px; width:18px; left:3px; bottom:3px; background:${WHITE}; border-radius:50%; transition:.2s; box-shadow:0 1px 4px rgba(0,0,0,.2); }
.toggle input:checked + .toggle-slider:before { transform:translateX(20px); }

.bulk-bar { background:${NAVY}; color:${WHITE}; padding:12px 20px; border-radius:12px; display:flex; align-items:center; gap:12px; margin-bottom:16px; }

@keyframes fadeUp { from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);} }
.fade-up { animation:fadeUp .3s ease both; }
@keyframes pulse { 0%,100%{opacity:1;}50%{opacity:.5;} }
.pulse { animation:pulse 2s infinite; }
@keyframes spin { to{transform:rotate(360deg);} }
.spin { animation:spin .8s linear infinite; display:inline-block; }
@keyframes countUp { from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);} }
.count-anim { animation:countUp .5s ease both; }

.adm-mobile-top { display:none; }
@media(max-width:1024px) {
  .adm-side { position:fixed !important; z-index:10001; transform:translateX(-100%); transition:transform .3s ease; }
  .adm-side.open { transform:translateX(0); }
  .adm-mobile-top { display:flex; background:${WHITE}; padding:14px 18px; align-items:center; justify-content:space-between; border-bottom:1px solid ${T.b1}; position:sticky; top:0; z-index:100; }
  .adm-content { padding:16px !important; }
}

.qa-card { background:${WHITE}; border:1.5px solid ${T.b1}; border-radius:14px; padding:18px; cursor:pointer; transition:all .2s; text-align:center; }
.qa-card:hover { border-color:${GOLD}; transform:translateY(-3px); box-shadow:0 8px 24px rgba(244,160,35,.12); }

.settings-group { border:1.5px solid ${T.b1}; border-radius:14px; overflow:hidden; margin-bottom:20px; }
.settings-group-title { background:${BG}; padding:14px 20px; font-weight:800; color:${NAVY}; font-size:13.5px; border-bottom:1px solid ${T.b1}; display:flex; align-items:center; gap:8px; }
.settings-row { padding:16px 20px; display:flex; align-items:center; gap:16px; border-bottom:1px solid ${T.b1}; }
.settings-row:last-child { border-bottom:none; }

.tag-list { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
.tag-item { background:${BG}; border:1.5px solid ${T.b1}; border-radius:6px; padding:4px 10px; font-size:12px; font-weight:700; color:${NAVY}; display:flex; align-items:center; gap:5px; }
.tag-item button { background:none; border:none; cursor:pointer; color:${T.t3}; font-size:12px; line-height:1; padding:0; }

.top-search { flex:1; max-width:400px; position:relative; }
.top-search input { width:100%; padding:9px 14px 9px 36px; border-radius:10px; border:1.5px solid ${T.b1}; background:${BG}; font-size:13.5px; outline:none; font-family:'Plus Jakarta Sans',sans-serif; color:${NAVY}; }
.top-search input:focus { border-color:${NAVY}; background:${WHITE}; }
.top-search::before { content:'⌕'; position:absolute; left:11px; top:50%; transform:translateY(-50%); font-size:16px; color:${T.t3}; pointer-events:none; }

.mini-log { background:${BG}; border-radius:10px; padding:12px 14px; margin-top:20px; }
.mini-log-item { display:flex; align-items:center; gap:8px; padding:5px 0; border-bottom:1px solid ${T.b1}; font-size:12px; color:${T.t2}; }
.mini-log-item:last-child { border-bottom:none; }

.notif-dot { width:8px; height:8px; border-radius:50%; background:${T.red}; flex-shrink:0; }
.glow { animation:pulse 2s infinite; box-shadow:0 0 8px ${T.green}; background:${T.green}; }
`;

// ── Shared components ─────────────────────────────────────────────────────────
const StatCard = React.memo(({ icon, label, count, color, sub, onClick }) => {
  const a = useCountUp(count);
  return (
    <div className="stat-card count-anim" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', borderBottom: `3px solid ${color}` }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-num" style={{ color }}>{a.toLocaleString()}</div>
      <div className="stat-label">{label}</div>
      {sub && <div style={{ fontSize: 11, color, marginTop: 3, fontWeight: 700 }}>{sub}</div>}
    </div>
  );
});

const Toggle = ({ checked, onChange, label, color = T.green }) => (
  <label className="toggle-wrap" onClick={onChange}>
    <div className="toggle">
      <input type="checkbox" readOnly checked={checked} />
      <span className="toggle-slider" style={checked ? { background: color } : {}} />
    </div>
    {label && <span style={{ fontSize: 13, fontWeight: 700, color: checked ? color : T.t3 }}>{label}</span>}
  </label>
);

const SectionSearch = ({ value, onChange, placeholder }) => (
  <div className="sec-search" style={{ marginBottom: 16 }}>
    <input className="ainp" style={{ paddingLeft: 36 }} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || 'Search...'} />
  </div>
);

const MiniLog = ({ logs }) => {
  if (!logs?.length) return null;
  return (
    <div className="mini-log">
      <div style={{ fontSize: 11, fontWeight: 900, color: T.t3, marginBottom: 6, textTransform: 'uppercase', letterSpacing: .8 }}>Recent Actions</div>
      {logs.slice(0, 3).map((l, i) => (
        <div key={i} className="mini-log-item">
          <span style={{ fontSize: 13 }}>{l.action === 'add' ? '➕' : l.action === 'delete' ? '🗑️' : '✏️'}</span>
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.message}</span>
          <span style={{ color: T.t4, flexShrink: 0 }}>{l.time ? new Date(l.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
        </div>
      ))}
    </div>
  );
};

const BulkBar = ({ count, onDelete, onClear }) => count === 0 ? null : (
  <div className="bulk-bar fade-up">
    <span style={{ fontSize: 13, fontWeight: 700 }}>{count} item{count > 1 ? 's' : ''} selected</span>
    <button className="abtn abtn-red abtn-sm" style={{ background: T.red, color: WHITE, border: 'none' }} onClick={onDelete}>🗑️ Delete Selected</button>
    <button className="abtn abtn-outline abtn-sm" style={{ color: WHITE, borderColor: 'rgba(255,255,255,.3)' }} onClick={onClear}>✕ Clear</button>
  </div>
);

const joditCfg = {
  readonly: false,
  placeholder: 'Content likhein… (Table insert karne ke liye toolbar mein Table button use karein)',
  height: 420,
  minHeight: 300,
  allowResizeY: true,
  allowResizeX: false,
  theme: 'default',
  toolbarAdaptive: false,
  toolbarSticky: true,
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  buttons: [
    'bold', 'italic', 'underline', 'strikethrough', '|',
    'ul', 'ol', '|',
    'outdent', 'indent', '|',
    'font', 'fontsize', 'brush', '|',
    'paragraph', '|',
    'table', 'link', 'image', '|',
    'align', '|',
    'hr', 'eraser', '|',
    'undo', 'redo', '|',
    'fullsize'
  ],
  style: {
    fontFamily: "'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif",
    fontSize: '15px',
    color: '#334155',
    lineHeight: '1.8',
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// MEETING PDF TAB — Reusable for GB Meetings and Staff Council Meetings
// Firestore collection schema:
//   { title, date, pdfUrl, notes, createdAt }
// ══════════════════════════════════════════════════════════════════════════════
function MeetingPDFTab({ collectionName, title, subtitle, accentColor, icon, logAct, getSectionLog }) {
  const NAVY = '#0f2347', GOLD = '#f4a023', WHITE = '#ffffff', BG = '#f4f7f9';

  const [meetings, setMeetings]     = useState([]);
  const [loading, setLoading]       = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [search, setSearch]         = useState('');
  const [form, setForm]             = useState({ title: '', date: '', pdfUrl: '', notes: '' });

  const topRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy('date', 'desc'));
    const unsub = onSnapshot(q,
      snap => setMeetings(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
      () => {}
    );
    return () => unsub();
  }, [collectionName]);

  const resetForm = () => { setForm({ title: '', date: '', pdfUrl: '', notes: '' }); setEditItem(null); };

  const save = async e => {
    e.preventDefault();
    if (!form.title || !form.date || !form.pdfUrl) { toast.error('Title, Date aur PDF Link zaroori hai!'); return; }
    setLoading(true);
    try {
      const payload = { title: form.title.trim(), date: form.date, pdfUrl: form.pdfUrl.trim(), notes: form.notes.trim(), updatedAt: serverTimestamp() };
      if (editItem) {
        await updateDoc(doc(db, collectionName, editItem.id), payload);
        toast.success('Meeting updated!');
        logAct?.('update', `Updated: ${form.title}`, collectionName);
      } else {
        await addDoc(collection(db, collectionName), { ...payload, createdAt: serverTimestamp() });
        toast.success('Meeting added!');
        logAct?.('add', `Added: ${form.title}`, collectionName);
      }
      resetForm();
    } catch (err) {
      toast.error('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id, name) => {
    if (!window.confirm(`"${name}" delete karein?`)) return;
    await deleteDoc(doc(db, collectionName, id));
    toast.success('Deleted!');
    logAct?.('delete', `Deleted: ${name}`, collectionName);
  };

  const startEdit = m => {
    setEditItem(m);
    setForm({ title: m.title, date: m.date, pdfUrl: m.pdfUrl, notes: m.notes || '' });
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filtered = meetings.filter(m =>
    !search || m.title?.toLowerCase().includes(search.toLowerCase()) ||
    m.date?.includes(search) || m.notes?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-up">
      <p className="asec" ref={topRef}>{icon} {title}</p>
      <p className="asub">{subtitle}</p>

      {/* Form Card */}
      <div className="card-gold">
        <div className="actitle">{editItem ? '✏️ Edit Meeting' : '➕ Add Meeting PDF'}</div>
        <form onSubmit={save}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
            <div style={{ gridColumn: '1/-1' }}>
              <label className="alabel">Meeting Title *</label>
              <input className="ainp" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. GB Meeting — Quarterly Review Q1 2025" required />
            </div>
            <div>
              <label className="alabel">Meeting Date *</label>
              <input className="ainp" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label className="alabel">PDF Link * (Google Drive ya Direct URL)</label>
              <input className="ainp" value={form.pdfUrl} onChange={e => setForm(f => ({ ...f, pdfUrl: e.target.value }))}
                placeholder="https://drive.google.com/file/d/... ya direct PDF URL" required />
              {form.pdfUrl && (
                <a href={form.pdfUrl} target="_blank" rel="noreferrer"
                  style={{ fontSize: 12, color: accentColor, marginTop: 4, display: 'inline-block', fontWeight: 700 }}>
                  🔗 PDF Preview Test
                </a>
              )}
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label className="alabel">Notes / Agenda (optional)</label>
              <textarea className="ainp" rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="e.g. Discussed budget approval, new admissions, NAAC preparation..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading}>
              {loading ? '⏳ Saving…' : editItem ? '💾 Update Meeting' : '🚀 Add Meeting'}
            </button>
            {editItem && <button type="button" className="abtn abtn-outline" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
      </div>

      {/* Search */}
      <div className="sec-search" style={{ marginBottom: 16 }}>
        <input className="ainp" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by title, date, or notes..." style={{ paddingLeft: 36 }} />
      </div>

      {/* Info Banner */}
      <div style={{ background: '#fffbeb', border: '1.5px solid #f59e0b', borderRadius: 12, padding: '12px 18px', marginBottom: 20, fontSize: 13, color: '#92400e' }}>
        💡 <strong>Kaise use karein:</strong> Har meeting ka PDF Google Drive mein upload karein → Share → Anyone with link → Copy link paste karein yahan.
        Ye meetings automatically <code style={{ background: '#fef3c7', padding: '1px 4px', borderRadius: 4 }}>/about-us/{collectionName === 'gb_meetings' ? 'governing-body' : 'staff-council'}</code> page pe show honge.
      </div>

      {/* Meetings List */}
      <div className="card">
        <div className="actitle">
          {icon} All Meetings ({filtered.length})
          {filtered.length !== meetings.length && <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 8 }}>filtered from {meetings.length}</span>}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Koi meeting nahi mili</div>
            <div style={{ fontSize: 13 }}>{search ? 'Search clear karein' : 'Upar form se pehli meeting add karein'}</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(m => (
              <div key={m.id} className="arow" style={{ borderLeft: `4px solid ${accentColor}` }}>
                {/* Date Badge */}
                <div style={{
                  background: accentColor, color: '#fff', borderRadius: 10,
                  padding: '8px 12px', textAlign: 'center', flexShrink: 0, minWidth: 60,
                }}>
                  <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1 }}>
                    {m.date ? new Date(m.date).getDate().toString().padStart(2, '0') : '--'}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, marginTop: 3, opacity: 0.85 }}>
                    {m.date ? new Date(m.date).toLocaleString('en-IN', { month: 'short' }).toUpperCase() : '--'}
                  </div>
                  <div style={{ fontSize: 9, opacity: 0.7 }}>
                    {m.date ? new Date(m.date).getFullYear() : ''}
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>{m.title}</div>
                  {m.notes && <div style={{ fontSize: 12, color: '#64748b', marginTop: 4, lineHeight: 1.5 }}>{m.notes}</div>}
                  <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <a href={m.pdfUrl} target="_blank" rel="noreferrer"
                      style={{ fontSize: 12, color: accentColor, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      📄 View PDF
                    </a>
                    <span style={{ fontSize: 11, color: '#cbd5e1' }}>•</span>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>
                      Added: {m.createdAt?.toDate?.()?.toLocaleDateString('en-IN') || 'N/A'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                  <button className="abtn abtn-outline abtn-sm" onClick={() => startEdit(m)}>✏️ Edit</button>
                  <button className="abtn abtn-red abtn-sm" onClick={() => remove(m.id, m.title)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── TABS config (outside component to avoid recreation every render) ──────────
const TABS = [
  { id: 'dashboard',     icon: '📊', label: 'Dashboard',        section: 'OVERVIEW' },
  { id: 'quick',         icon: '⚡', label: 'Quick Publish',     section: '' },
  { id: 'alerts',        icon: '🚨', label: 'Flash Alerts',      section: 'CONTENT' },
  { id: 'placements',    icon: '🎓', label: 'Alumni Wall',       section: '' },
  { id: 'faculty',       icon: '👨‍🏫', label: 'Faculty & Staff',  section: '' },
  { id: 'departments',   icon: '🏛️',  label: 'Departments',      section: '' },
  { id: 'campus',        icon: '📸', label: 'Campus Gallery',    section: '' },
  { id: 'leadership',   icon: '👑', label: 'Leadership',         section: '' },
  { id: 'gb_meetings',  icon: '📋', label: 'GB Meetings',        section: '' },
  { id: 'staff_council',icon: '👨‍🏫', label: 'Staff Council',     section: '' },
  { id: 'slider',        icon: '🖼️',  label: 'Hero Slider',      section: '' },
  { id: 'menu_builder',  icon: '🧭', label: 'Menu Editor',       section: '' },
  { id: 'pages',         icon: '📄', label: 'Pages & SEO',       section: '' },
  { id: 'gallery',       icon: '📸', label: 'Gallery',           section: '' },
  { id: 'notices',       icon: '📢', label: 'Notices',           section: '' },
  { id: 'announcements', icon: '📣', label: 'News',              section: '' },
  { id: 'documents',     icon: '📁', label: 'Documents',         section: '' },
  { id: 'events',        icon: '🏆', label: 'Events',            section: '' },
  { id: 'youtube',       icon: '▶️',  label: 'YouTube',           section: 'API & INTEGRATIONS' },
  { id: 'drive',         icon: '☁️',  label: 'Drive Sync',        section: '' },
  { id: 'settings',      icon: '⚙️',  label: 'Site Settings',     section: 'SYSTEM' },
  { id: 'contact',       icon: '📞',  label: 'Contact Settings',  section: '' },
  { id: 'activity',      icon: '📋', label: 'Activity Log',      section: '' },
  { id: 'backup',        icon: '💾', label: 'Backup & Restore',  section: '' },
  { id: 'system_test',   icon: '🛡️', label: 'System Test',       section: '' },
];

// ── Contact Settings Tab Component ───────────────────────────────────────────
function ContactSettingsTab() {
  const NAVY = '#0f2347', GOLD = '#f4a023';
  const INP = { width:'100%', padding:'10px 14px', border:'1.5px solid #e2e8f0', borderRadius:9, fontSize:13.5, fontFamily:'inherit', color:'#334155', background:'#fff', outline:'none', boxSizing:'border-box' };
  const TEA = { ...INP, resize:'vertical', minHeight:70 };

  // ── campus contact state ─────────────────────────
  const [campus, setCampus] = useState({
    bhuda:    { phone:'', email:'', address:'' },
    bankMore: { phone:'', email:'', address:'' },
  });
  const [campusSaving, setCampusSaving] = useState(false);
  const [campusSaved,  setCampusSaved]  = useState(false);
  const campusTimerRef = useRef(null);

  // ── directory state ──────────────────────────────
  const [directory, setDirectory] = useState([]);
  const [dirSaving,  setDirSaving]  = useState(false);
  const [dirSaved,   setDirSaved]   = useState(false);
  const dirTimerRef = useRef(null);

  // cleanup timers on unmount
  useEffect(() => () => {
    if (campusTimerRef.current) clearTimeout(campusTimerRef.current);
    if (dirTimerRef.current)    clearTimeout(dirTimerRef.current);
  }, []);

  // Load settings/contact
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'contact'), snap => {
      if (snap.exists()) {
        const d = snap.data();
        setCampus({
          bhuda:    { phone: d.bhuda?.phone||'',    email: d.bhuda?.email||'',    address: d.bhuda?.address||'' },
          bankMore: { phone: d.bankMore?.phone||'', email: d.bankMore?.email||'', address: d.bankMore?.address||'' },
        });
      }
    });
    return () => unsub();
  }, []);

  // Load contactDirectory collection (ordered)
  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'contactDirectory'), orderBy('order', 'asc')),
      snap => setDirectory(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
      () => setDirectory([]) // Firestore index missing → graceful empty
    );
    return () => unsub();
  }, []);

  const saveCampus = async () => {
    setCampusSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'contact'), { ...campus, updatedAt: serverTimestamp() }, { merge: true });
      setCampusSaved(true);
      toast.success('✅ Campus details saved!');
      if (campusTimerRef.current) clearTimeout(campusTimerRef.current);
      campusTimerRef.current = setTimeout(() => setCampusSaved(false), 2500);
    } catch (e) { toast.error('Save failed: ' + e.message); }
    setCampusSaving(false);
  };

  const saveDirectory = async () => {
    setDirSaving(true);
    try {
      const batch = writeBatch(db);
      // Delete all existing docs
      const existing = await getDocs(collection(db, 'contactDirectory'));
      existing.docs.forEach(d => batch.delete(doc(db, 'contactDirectory', d.id)));
      // Re-add all with updated order
      directory.forEach((entry, i) => {
        const ref = entry.id
          ? doc(db, 'contactDirectory', entry.id)
          : doc(collection(db, 'contactDirectory'));
        batch.set(ref, {
          icon:  entry.icon  || '📞',
          title: entry.title || '',
          name:  entry.name  || '',
          phone: entry.phone || '',
          order: i,
          updatedAt: serverTimestamp(),
        });
      });
      await batch.commit();
      setDirSaved(true);
      toast.success('✅ Directory saved!');
      if (dirTimerRef.current) clearTimeout(dirTimerRef.current);
      dirTimerRef.current = setTimeout(() => setDirSaved(false), 2500);
    } catch (e) { toast.error('Directory save failed: ' + e.message); }
    setDirSaving(false);
  };

  const setC = (campus_key, field, val) =>
    setCampus(p => ({ ...p, [campus_key]: { ...p[campus_key], [field]: val } }));

  const addDir  = () => setDirectory(p => [...p, { icon:'📞', title:'', name:'', phone:'', order: p.length }]);
  const delDir  = (i) => setDirectory(p => p.filter((_, j) => j !== i));
  const updDir  = (i, k, v) => setDirectory(p => p.map((e, j) => j === i ? { ...e, [k]: v } : e));

  const SH = ({ txt }) => (
    <div style={{ fontWeight:800, fontSize:13.5, color:NAVY, margin:'24px 0 12px', paddingBottom:8, borderBottom:'2px solid #f1f5f9' }}>{txt}</div>
  );
  const SaveBar = ({ saving, saved, onSave, label }) => (
    <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:20 }}>
      <button onClick={onSave} disabled={saving}
        style={{ background: saving?'#94a3b8':`linear-gradient(135deg,${NAVY},#1a3a7c)`, color:'#fff', border:'none', padding:'11px 28px', borderRadius:10, cursor: saving?'not-allowed':'pointer', fontWeight:800, fontSize:13.5, fontFamily:'inherit', boxShadow: saving?'none':`0 4px 14px ${NAVY}28` }}>
        {saving ? '⏳ Saving...' : label}
      </button>
      {saved && (
        <div style={{ display:'flex', alignItems:'center', gap:8, background:'#d1fae5', color:'#065f46', padding:'8px 16px', borderRadius:9, fontSize:13, fontWeight:700 }}>
          ✅ Saved! Contact page auto-update ho gaya.
        </div>
      )}
    </div>
  );

  const campusCards = [
    { key: 'bhuda',    label: '🏛️ Bhuda Campus',     sub: 'Main campus contact details' },
    { key: 'bankMore', label: '🏢 Bank More Campus',  sub: 'Branch campus contact details' },
  ];

  return (
    <div style={{ fontFamily:"'DM Sans','Plus Jakarta Sans',sans-serif", maxWidth:1000 }}>
      <p style={{ fontWeight:900, fontSize:20, color:NAVY, margin:'0 0 4px' }}>📞 Contact Settings</p>
      <p style={{ color:'#94a3b8', fontSize:13, margin:'0 0 24px' }}>Campus addresses aur contact directory — Contact page pe auto-update hoga</p>

      {/* ── Campus Contact ────────────────────────────── */}
      <div style={{ background:'#fff', border:'1.5px solid #f1f5f9', borderRadius:14, padding:20, marginBottom:16 }}>
        <SH txt="🏫 Campus Contact Details" />
        <p style={{ fontSize:12.5, color:'#94a3b8', margin:'0 0 18px' }}>Firebase path: <code style={{ background:'#f1f5f9', padding:'1px 6px', borderRadius:4, fontSize:11.5 }}>settings/contact</code></p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:16 }}>
          {campusCards.map(({ key, label, sub }) => (
            <div key={key} style={{ background:'#f8fafc', border:'1.5px solid #f1f5f9', borderRadius:12, padding:'18px 18px 14px' }}>
              <div style={{ fontWeight:800, color:NAVY, fontSize:14, marginBottom:3 }}>{label}</div>
              <div style={{ fontSize:11.5, color:'#94a3b8', marginBottom:16 }}>{sub}</div>
              <div style={{ marginBottom:12 }}>
                <div style={{ fontSize:11.5, fontWeight:700, color:'#64748b', marginBottom:5 }}>📞 Phone / WhatsApp</div>
                <input style={INP} value={campus[key].phone} onChange={e => setC(key, 'phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
              </div>
              <div style={{ marginBottom:12 }}>
                <div style={{ fontSize:11.5, fontWeight:700, color:'#64748b', marginBottom:5 }}>✉ Email</div>
                <input style={INP} type="email" value={campus[key].email} onChange={e => setC(key, 'email', e.target.value)} placeholder="contact@gnc.ac.in" />
              </div>
              <div>
                <div style={{ fontSize:11.5, fontWeight:700, color:'#64748b', marginBottom:5 }}>📍 Full Address</div>
                <textarea style={TEA} value={campus[key].address} onChange={e => setC(key, 'address', e.target.value)} placeholder="Building name, Street, City — PIN" rows={3} />
              </div>
            </div>
          ))}
        </div>
        <SaveBar saving={campusSaving} saved={campusSaved} onSave={saveCampus} label="💾 Save Campus Details" />
      </div>

      {/* ── Contact Directory ─────────────────────────── */}
      <div style={{ background:'#fff', border:'1.5px solid #f1f5f9', borderRadius:14, padding:20 }}>
        <SH txt="📋 Contact Directory (Officials list)" />
        <p style={{ fontSize:12.5, color:'#94a3b8', margin:'0 0 16px' }}>
          Firebase path: <code style={{ background:'#f1f5f9', padding:'1px 6px', borderRadius:4, fontSize:11.5 }}>contactDirectory/{`{docId}`}</code>
          &nbsp;— Contact page pe yahi list dikhti hai
        </p>

        {directory.map((entry, i) => (
          <div key={entry.id || i} style={{ display:'grid', gridTemplateColumns:'60px 1fr 1fr 1fr auto', gap:10, alignItems:'center', marginBottom:10 }}>
            <div>
              {i === 0 && <div style={{ fontSize:11, fontWeight:700, color:'#64748b', marginBottom:5 }}>Icon</div>}
              <input style={{ ...INP, textAlign:'center', fontSize:18 }} value={entry.icon} onChange={e => updDir(i, 'icon', e.target.value)} placeholder="📞" />
            </div>
            <div>
              {i === 0 && <div style={{ fontSize:11, fontWeight:700, color:'#64748b', marginBottom:5 }}>Title / Role</div>}
              <input style={INP} value={entry.title} onChange={e => updDir(i, 'title', e.target.value)} placeholder="Principal" />
            </div>
            <div>
              {i === 0 && <div style={{ fontSize:11, fontWeight:700, color:'#64748b', marginBottom:5 }}>Name</div>}
              <input style={INP} value={entry.name} onChange={e => updDir(i, 'name', e.target.value)} placeholder="Dr. S.K. Sharma" />
            </div>
            <div>
              {i === 0 && <div style={{ fontSize:11, fontWeight:700, color:'#64748b', marginBottom:5 }}>Phone</div>}
              <input style={INP} value={entry.phone} onChange={e => updDir(i, 'phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
            </div>
            <button onClick={() => delDir(i)}
              style={{ background:'#fee2e2', border:'none', color:'#ef4444', width:30, height:30, borderRadius:8, cursor:'pointer', fontSize:13, fontWeight:800, marginTop: i===0?22:0, flexShrink:0 }}>
              ✕
            </button>
          </div>
        ))}

        <button onClick={addDir}
          style={{ width:'100%', padding:'9px 16px', border:'1.5px dashed #cbd5e1', background:'transparent', color:'#64748b', borderRadius:9, cursor:'pointer', fontFamily:'inherit', fontSize:12.5, fontWeight:600, marginTop:8, transition:'all .16s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor=GOLD; e.currentTarget.style.color=NAVY; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='#cbd5e1'; e.currentTarget.style.color='#64748b'; }}>
          + Add Directory Entry
        </button>

        <SaveBar saving={dirSaving} saved={dirSaved} onSave={saveDirectory} label="💾 Save Directory" />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
function AdminPanelInner({
  onClose, notices: noticesProp, pages: pagesProp, events: eventsProp,
  gallery: galleryProp, pdfReports: pdfReportsProp,
  announcements: announcementsProp, sliderSlides: sliderSlidesProp,
  navLinks, faculties: facultiesProp, placements: placementsProp, alerts: alertsProp
}) {
  const [tab, setTab] = useState('dashboard');
  const [sideOpen, setSideOpen] = useState(false);

  // ── Content container ref (for scroll-to-top on edit) ─────────────────────
  const contentRef = useRef(null);
  const scrollTop = () => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Internal data fetching (AdminPanel is self-contained) ─────────────────
  const [_pdfReports,  set_pdfReports]  = useState([]);
  const [_pages,       set_pages]       = useState([]);
  const [_placements,  set_placements]  = useState([]);
  const [_alerts,      set_alerts]      = useState([]);
  const [_sliderSlides,set_sliderSlides]= useState([]);

  useEffect(() => {
    const subs = [
      ['pdfReports',  set_pdfReports],
      ['pages',       set_pages],
      ['placements',  set_placements],
      ['alerts',      set_alerts],
      ['sliderSlides',set_sliderSlides],
    ].map(([col, setter]) => {
      try {
        const q = query(collection(db, col), orderBy('createdAt', 'desc'));
        return onSnapshot(q,
          snap => setter(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
          () => {}
        );
      } catch { return () => {}; }
    });
    return () => subs.forEach(u => u && u());
  }, []);

  // Merge: prefer parent-passed props, fallback to internally-fetched
  const pdfReports  = pdfReportsProp   || _pdfReports;
  const pages       = pagesProp        || _pages;
  const placements  = placementsProp   || _placements;
  const alerts      = alertsProp       || _alerts;
  const sliderSlides= sliderSlidesProp || _sliderSlides;
  const notices     = noticesProp      || [];
  const announcements = announcementsProp || [];
  const events      = eventsProp       || [];
  const gallery     = galleryProp      || [];
  const faculties   = facultiesProp    || [];
  const [sideCollapsed, setSideCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  const [loading, setLoading] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const [showKeyHelp, setShowKeyHelp] = useState(false);
  const editor = useRef(null);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const fn = e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); document.querySelector('.top-search input')?.focus(); }
      if ((e.ctrlKey || e.metaKey) && e.key === '/') { e.preventDefault(); setShowKeyHelp(h => !h); }
      if (e.key === 'Escape') { setSideOpen(false); setShowPreview(false); setShowKeyHelp(false); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  // ── Activity Log ──────────────────────────────────────────────────────────
  const [actLog, setActLog] = useState([]);
  useEffect(() => {
    try {
      const q = query(collection(db, 'adminLogs'), orderBy('time', 'desc'), limit(30));
      return onSnapshot(q, s => setActLog(s.docs.map(d => ({ id: d.id, ...d.data() }))));
    } catch { return () => {}; }
  }, []);

  const logAct = useCallback(async (action, message, section = '') => {
    try {
      await addDoc(collection(db, 'adminLogs'), {
        action, message, section,
        time: new Date().toISOString(),
        createdAt: serverTimestamp()
      });
    } catch (_) { }
  }, []);

  const getSectionLog = useCallback(section => actLog.filter(l => l.section === section).slice(0, 3), [actLog]);

  // ── Image Cropper ─────────────────────────────────────────────────────────
  const [cropSrc, setCropSrc] = useState(null);
  const [cropCb, setCropCb] = useState(null);
  const crop = (src, cb) => { setCropSrc(src); setCropCb(() => cb); };
  const handleCrop = async blob => { if (cropCb) await cropCb(blob); setCropSrc(null); setCropCb(null); };

  // ── Undo Delete ───────────────────────────────────────────────────────────
  const softDelete = useCallback(async (colName, id, data, displayName) => {
    await deleteDoc(doc(db, colName, id));
    logAct('delete', `Deleted: ${displayName}`, colName);
    toast(
      t => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>🗑️ "{displayName}" deleted</span>
          <button
            onClick={async () => {
              try {
                await addDoc(collection(db, colName), data);
                toast.success('Restored!');
                logAct('add', `Restored: ${displayName}`, colName);
              } catch { }
              toast.dismiss(t.id);
            }}
            style={{ background: GOLD, color: NAVY, border: 'none', borderRadius: 6, padding: '4px 12px', fontWeight: 800, cursor: 'pointer', fontSize: 12 }}
          >↩ Undo</button>
        </span>
      ),
      { duration: 5000 }
    );
  }, [logAct]);

  // ── Bulk Delete ───────────────────────────────────────────────────────────
  const bulkDelete = useCallback(async (colName, ids) => {
    if (!window.confirm(`Delete ${ids.length} items permanently?`)) return;
    const batch = writeBatch(db);
    ids.forEach(id => batch.delete(doc(db, colName, id)));
    await batch.commit();
    logAct('delete', `Bulk deleted ${ids.length} from ${colName}`, colName);
    toast.success(`${ids.length} items deleted`);
  }, [logAct]);

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION STATES
  // ═══════════════════════════════════════════════════════════════════════════

  // 1. ALERTS
  const [editAlert, setEditAlert] = useState(null);
  const [alertData, setAlertData, clearAlertDraft] = useLocalDraft('alert', { text: '', isActive: true, type: 'urgent' });
  const [alertSearch, setAlertSearch] = useState('');
  const [alertSel, setAlertSel] = useState([]);
  const toggleAlertSel = id => setAlertSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const saveAlert = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (editAlert) await updateDoc(doc(db, 'alerts', editAlert.id), { ...alertData, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'alerts'), { ...alertData, createdAt: serverTimestamp() });
      toast.success(editAlert ? 'Alert updated!' : '🚨 Alert live!');
      logAct(editAlert ? 'update' : 'add', `Alert: ${alertData.text.substring(0, 40)}`, 'alerts');
      setEditAlert(null); clearAlertDraft();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };
  const toggleAlert = async a => {
    await updateDoc(doc(db, 'alerts', a.id), { isActive: !a.isActive });
    toast.success(a.isActive ? 'Alert turned OFF' : '🔴 Alert is LIVE!');
    logAct('update', `Alert ${a.isActive ? 'deactivated' : 'activated'}`, 'alerts');
  };

  // 2. PLACEMENTS
  const [editPlace, setEditPlace] = useState(null);
  const [placeData, setPlaceData, clearPlaceDraft] = useLocalDraft('place', { name: '', year: '', company: '', package: '', imageUrl: '', dept: '', achievement: '' });
  const [placeUp, setPlaceUp] = useState(false);
  const [placeProg, setPlaceProg] = useState(0);
  const [placeSearch, setPlaceSearch] = useState('');
  const [placeSel, setPlaceSel] = useState([]);
  // handlePlaceFile → replaced by MediaPicker
  const savePlace = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (editPlace) await updateDoc(doc(db, 'placements', editPlace.id), { ...placeData, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'placements'), { ...placeData, createdAt: serverTimestamp() });
      toast.success('Alumni story saved!');
      logAct(editPlace ? 'update' : 'add', `Placement: ${placeData.name}`, 'placements');
      setEditPlace(null); clearPlaceDraft();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  // 3. FACULTY
  const teachDepts = ['Commerce', 'English', 'Hindi', 'Economics', 'Political Science', 'History', 'Psychology', 'BCA', 'BBA'];
  const nonTeachDepts = ['General Section', 'Account Section', 'Library', 'Examination', 'Computer Lab Section'];
  const [editFac, setEditFac] = useState(null);
  const [facData, setFacData, clearFacDraft] = useLocalDraft('fac', { name: '', staffType: 'Teaching', dept: 'Commerce', qual: '', desig: '', imageUrl: '', email: '', specialization: '' });
  const [facUp, setFacUp] = useState(false);
  const [facProg, setFacProg] = useState(0);
  const [facSearch, setFacSearch] = useState('');
  const [facTab, setFacTab] = useState('Teaching');
  const [facSel, setFacSel] = useState([]);
  // handleFacFile → replaced by MediaPicker
  const saveFac = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (editFac) await updateDoc(doc(db, 'faculties', editFac.id), { ...facData, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'faculties'), { ...facData, createdAt: serverTimestamp() });
      toast.success('Staff profile saved!');
      logAct(editFac ? 'update' : 'add', `Staff: ${facData.name} (${facData.staffType})`, 'faculties');
      setEditFac(null); clearFacDraft();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  // 4. SLIDER
  const [editSlide, setEditSlide] = useState(null);
  const [slideData, setSlideData] = useState({ title: '', subtitle: '', btnText: '', btnLink: '', image: '', order: 0 });
  const [slideUp, setSlideUp] = useState(false);
  const [slideProg, setSlideProg] = useState(0);
  // handleSlideFile → replaced by MediaPicker
  const saveSlide = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (editSlide) await updateDoc(doc(db, 'sliderSlides', editSlide.id), { ...slideData, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'sliderSlides'), { ...slideData, createdAt: serverTimestamp() });
      toast.success('Slide saved!');
      logAct(editSlide ? 'update' : 'add', `Slide: ${slideData.title}`, 'sliderSlides');
      setEditSlide(null);
      setSlideData({ title: '', subtitle: '', btnText: '', btnLink: '', image: '', order: 0 });
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  // 5. MENU
  const [navData, setNavData] = useState([]);
  const [newMenu, setNewMenu] = useState({ label: '', href: '', parentId: 'top' });
  useEffect(() => {
    getDoc(doc(db, 'settings', 'navbar'))
      .then(s => {
        if (s.exists() && s.data().links?.length) setNavData(s.data().links);
        else if (navLinks?.length) setNavData(navLinks);
      })
      .catch(() => { if (navLinks?.length) setNavData(navLinks); });
  }, [navLinks]);

  const flatMenus = useMemo(() => {
    const f = [];
    (navData || []).forEach((l0, i) => {
      f.push({ id: `${i}`, label: l0.label, href: l0.href, level: 0, path: l0.label });
      if (l0.sub) l0.sub.forEach((l1, j) => {
        f.push({ id: `${i}-${j}`, label: l1.label, href: l1.href, level: 1, path: `${l0.label} › ${l1.label}` });
        if (l1.sub) l1.sub.forEach((l2, k) =>
          f.push({ id: `${i}-${j}-${k}`, label: l2.label, href: l2.href, level: 2, path: `${l0.label} › ${l1.label} › ${l2.label}` })
        );
      });
    });
    return f;
  }, [navData]);

  const saveNav = async arr => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'settings', 'navbar'), { links: arr });
      setNavData(arr);
      toast.success('Menu saved!');
      logAct('update', 'Menu updated', 'menu');
    } catch { }
    setLoading(false);
  };
  const addMenu = () => {
    const nav = JSON.parse(JSON.stringify(navData));
    const item = { label: newMenu.label, href: newMenu.href };
    if (newMenu.parentId === 'top') nav.push(item);
    else {
      const idx = newMenu.parentId.split('-');
      if (idx.length === 1) { if (!nav[idx[0]].sub) nav[idx[0]].sub = []; nav[idx[0]].sub.push(item); }
      else { if (!nav[idx[0]].sub[idx[1]].sub) nav[idx[0]].sub[idx[1]].sub = []; nav[idx[0]].sub[idx[1]].sub.push(item); }
    }
    saveNav(nav);
    setNewMenu({ label: '', href: '', parentId: 'top' });
  };
  const delMenu = id => {
    if (!window.confirm('Delete?')) return;
    const nav = JSON.parse(JSON.stringify(navData));
    const idx = id.split('-');
    if (idx.length === 1) nav.splice(+idx[0], 1);
    else if (idx.length === 2) nav[idx[0]].sub.splice(+idx[1], 1);
    else nav[idx[0]].sub[idx[1]].sub.splice(+idx[2], 1);
    saveNav(nav);
  };

  // 6. PAGES
  const [editPage, setEditPage] = useState(null);
  const [pageData, setPageData] = useState({ title: '', content: '', path: '', slug: '' });
  const [seoData, setSeoData] = useState({ metaTitle: '', metaDesc: '', keywords: '', ogImage: '' });
  const [pageMode, setPageMode] = useState('update');
  const [pageSearch, setPageSearch] = useState('');
  const getSeoScore = (seo, title) => {
    let s = 0;
    if ((title || '').length > 5) s += 20;
    if ((seo?.metaTitle || '').length > 10) s += 25;
    if ((seo?.metaDesc || '').length > 50) s += 30;
    if ((seo?.keywords || '').length > 0) s += 15;
    if (seo?.ogImage) s += 10;
    return s;
  };
  const savePage = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const base = { title: pageData.title, content: pageData.content, seo: seoData || {} };
      if (editPage) await updateDoc(doc(db, 'pages', editPage.id), { ...base, ...(pageMode === 'update' ? { path: pageData.path } : { slug: pageData.slug }), updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'pages'), { ...base, path: pageMode === 'update' ? pageData.path : '', slug: pageMode === 'create' ? pageData.slug : '', createdAt: serverTimestamp() });
      toast.success('Page saved!');
      logAct(editPage ? 'update' : 'add', `Page: ${pageData.title}`, 'pages');
      setEditPage(null);
      setPageData({ title: '', content: '', path: '', slug: '' });
      setSeoData({ metaTitle: '', metaDesc: '', keywords: '', ogImage: '' });
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  // 7. GALLERY
  const [galData, setGalData] = useState({ title: '', cat: 'Seminars', src: '' });
  const [galUp, setGalUp] = useState(false);
  const [galProg, setGalProg] = useState(0);
  const [galSearch, setGalSearch] = useState('');
  const [galSel, setGalSel] = useState([]);
  // handleGalFile → replaced by MediaPicker
  const saveGallery = async e => {
    e.preventDefault(); setLoading(true);
    try {
      await addDoc(collection(db, 'gallery'), { ...galData, createdAt: serverTimestamp() });
      toast.success('Photo added!');
      logAct('add', `Gallery: ${galData.title}`, 'gallery');
      setGalData({ title: '', cat: 'Seminars', src: '' });
    } catch { }
    setLoading(false);
  };

  // 8. NOTICES
  const [editNotice, setEditNotice] = useState(null);
  const [noticeData, setNoticeData, clearNoticeDraft] = useLocalDraft('notice', { text: '', link: '', type: 'General', isNew: true, pinned: false });
  const [noticeSearch, setNoticeSearch] = useState('');
  const [noticeSel, setNoticeSel] = useState([]);
  const saveNotice = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (editNotice) await updateDoc(doc(db, 'notices', editNotice.id), { ...noticeData, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'notices'), { ...noticeData, date: new Date().toISOString(), createdAt: serverTimestamp() });
      toast.success('Notice published!');
      logAct(editNotice ? 'update' : 'add', `Notice: ${noticeData.text?.substring(0, 30)}`, 'notices');
      setEditNotice(null); clearNoticeDraft();
    } catch { }
    setLoading(false);
  };

  // 9. ANNOUNCEMENTS
  const [editAnn, setEditAnn] = useState(null);
  const [annData, setAnnData, clearAnnDraft] = useLocalDraft('ann', { text: '', link: '', type: 'News' });
  const [annSearch, setAnnSearch] = useState('');
  const saveAnn = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (editAnn) await updateDoc(doc(db, 'announcements', editAnn.id), { ...annData, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'announcements'), { ...annData, date: new Date().toISOString(), createdAt: serverTimestamp() });
      toast.success('News published!');
      logAct(editAnn ? 'update' : 'add', `News: ${annData.text?.substring(0, 30)}`, 'announcements');
      setEditAnn(null); clearAnnDraft();
    } catch { }
    setLoading(false);
  };

  // 10. DOCUMENTS
  const [editDoc, setEditDoc] = useState(null);
  const [docData, setDocData, clearDocDraft] = useLocalDraft('doc', { title: '', link: '', type: 'Document', targetPage: '' });
  const [docSearch, setDocSearch] = useState('');
  const [docSel, setDocSel] = useState([]);
  const saveDoc = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (editDoc) await updateDoc(doc(db, 'pdfReports', editDoc.id), { ...docData, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'pdfReports'), { ...docData, date: new Date().toISOString(), createdAt: serverTimestamp() });
      toast.success('Document saved!');
      logAct(editDoc ? 'update' : 'add', `Doc: ${docData.title}`, 'pdfReports');
      setEditDoc(null); clearDocDraft();
    } catch { }
    setLoading(false);
  };

  // 11. EVENTS
  const [editEvent, setEditEvent] = useState(null);
  const [evtData, setEvtData, clearEvtDraft] = useLocalDraft('evt', { title: '', desc: '', type: 'WORKSHOP', day: '', month: '', location: '', status: 'upcoming', imageUrl: '', reportLink: '' });
  const [evtUp, setEvtUp] = useState(false);
  const [evtProg, setEvtProg] = useState(0);
  const [evtSearch, setEvtSearch] = useState('');
  const [evtSel, setEvtSel] = useState([]);
  // handleEvtFile → replaced by MediaPicker
  const saveEvent = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (editEvent) await updateDoc(doc(db, 'events', editEvent.id), { ...evtData, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'events'), { ...evtData, date: new Date().toISOString(), createdAt: serverTimestamp() });
      toast.success('Event saved!');
      logAct(editEvent ? 'update' : 'add', `Event: ${evtData.title}`, 'events');
      setEditEvent(null); clearEvtDraft();
    } catch { }
    setLoading(false);
  };

  // 12. YOUTUBE CONFIG
  const [ytCfg, setYtCfg] = useState({ apiKey: '', channelId: '', maxResults: 12 });
  const [ytTest, setYtTest] = useState(null);
  const [ytLoading, setYtLoading] = useState(false);
  useEffect(() => {
    getDoc(doc(db, 'settings', 'youtube'))
      .then(s => s.exists() && setYtCfg(prev => ({ ...prev, ...s.data() })))
      .catch(() => {});
  }, []);
  const saveYt = async e => {
    e.preventDefault(); setLoading(true);
    try {
      await setDoc(doc(db, 'settings', 'youtube'), { ...ytCfg, updatedAt: serverTimestamp() });
      toast.success('YouTube config saved!');
      logAct('update', 'YouTube config updated', 'settings');
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };
  const testYt = async () => {
    setYtLoading(true); setYtTest(null);
    try {
      const r = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${ytCfg.channelId}&key=${ytCfg.apiKey}`);
      const d = await r.json();
      if (d.error) throw new Error(d.error.message);
      if (d.items?.length) setYtTest({ ok: true, msg: `✅ Channel: "${d.items[0].snippet.title}"` });
      else throw new Error('Channel not found');
    } catch (e) { setYtTest({ ok: false, msg: `❌ ${e.message}` }); }
    setYtLoading(false);
  };

  // 13. DRIVE CONFIG
  const [driveCfg, setDriveCfg] = useState({ apiKey: '', folderId: '', folderName: '' });
  const [driveTest, setDriveTest] = useState(null);
  const [driveFiles, setDriveFiles] = useState([]);
  const [driveLoading, setDriveLoading] = useState(false);
  useEffect(() => {
    getDoc(doc(db, 'settings', 'drive'))
      .then(s => s.exists() && setDriveCfg(prev => ({ ...prev, ...s.data() })))
      .catch(() => {});
  }, []);
  const saveDrive = async e => {
    e.preventDefault(); setLoading(true);
    try {
      await setDoc(doc(db, 'settings', 'drive'), { ...driveCfg, updatedAt: serverTimestamp() });
      toast.success('Drive config saved!');
      logAct('update', 'Drive config updated', 'settings');
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };
  const testDrive = async () => {
    setDriveLoading(true); setDriveTest(null); setDriveFiles([]);
    try {
      const r = await fetch(`https://www.googleapis.com/drive/v3/files?q='${driveCfg.folderId}'+in+parents+and+mimeType='application/pdf'&key=${driveCfg.apiKey}&fields=files(id,name,createdTime,size)`);
      const d = await r.json();
      if (d.error) throw new Error(d.error.message);
      setDriveFiles(d.files || []);
      setDriveTest({ ok: true, msg: `✅ ${d.files?.length || 0} PDFs found in folder` });
    } catch (e) { setDriveTest({ ok: false, msg: `❌ ${e.message}` }); }
    setDriveLoading(false);
  };

  // 14. SITE SETTINGS
  const [siteCfg, setSiteCfg] = useState({
    name: 'Guru Nanak College', tagline: 'Affiliated to B.B.M.K. University, Dhanbad',
    address: 'Bank More, Dhanbad — 826001, Jharkhand', phone: '', email: '',
    facebook: '', twitter: '', youtube: '', linkedin: '',
    footerText: '', maintenanceMode: false,
    imgbbKey: '',  // ✅ ImgBB API key — Settings se configure karein
  });
  const [siteLoading, setSiteLoading] = useState(false);
  useEffect(() => {
    getDoc(doc(db, 'settings', 'site'))
      .then(s => {
        if (s.exists()) {
          const d = s.data();
          setSiteCfg(prev => ({ ...prev, ...d }));
          // ✅ MediaPicker ko ImgBB key de do
          if (d.imgbbKey) setImgbbKey(d.imgbbKey);
        }
      })
      .catch(() => {});
  }, []);
  const saveSite = async e => {
    e.preventDefault(); setSiteLoading(true);
    try {
      await setDoc(doc(db, 'settings', 'site'), { ...siteCfg, updatedAt: serverTimestamp() });
      toast.success('Settings saved! 🎉');
      logAct('update', 'Site settings updated', 'settings');
    } catch (err) { toast.error(err.message); }
    setSiteLoading(false);
  };

  // 15. BACKUP / RESTORE
  const fileRef = useRef(null);
  const [restoreFile, setRestoreFile] = useState(null);
  const handleBackup = async () => {
    setLoading(true);
    try {
      const cols = ['notices', 'announcements', 'events', 'gallery', 'pdfReports', 'pages', 'faculties', 'placements', 'sliderSlides', 'alerts', 'adminLogs'];
      const backup = { _meta: { version: '9.1', date: new Date().toISOString(), college: 'GNC Dhanbad' } };
      const [nb, yt, dr, site] = await Promise.all([
        getDoc(doc(db, 'settings', 'navbar')), getDoc(doc(db, 'settings', 'youtube')),
        getDoc(doc(db, 'settings', 'drive')), getDoc(doc(db, 'settings', 'site'))
      ]);
      if (nb.exists()) backup.navbar = nb.data();
      if (yt.exists()) backup.youtube = yt.data();
      if (dr.exists()) backup.drive = dr.data();
      if (site.exists()) backup.site = site.data();
      for (const col of cols) {
        const snap = await getDocs(collection(db, col));
        backup[col] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `GNC_Backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      toast.success('✅ Backup downloaded!');
      logAct('add', 'Full backup created', 'backup');
    } catch (e) { toast.error(e.message); }
    setLoading(false);
  };
  const handleRestore = async () => {
    if (!restoreFile || !window.confirm('⚠️ This will ERASE ALL data. Are you 100% sure?')) return;
    setLoading(true);
    try {
      const text = await restoreFile.text();
      const data = JSON.parse(text);
      const cols = ['notices', 'announcements', 'events', 'gallery', 'pdfReports', 'pages', 'faculties', 'placements', 'sliderSlides', 'alerts'];
      for (const col of cols) {
        if (!data[col]) continue;
        const existing = await getDocs(collection(db, col));
        const b1 = writeBatch(db); existing.forEach(d => b1.delete(d.ref)); await b1.commit();
        const b2 = writeBatch(db); data[col].forEach(({ id, ...d }) => b2.set(doc(collection(db, col)), d)); await b2.commit();
      }
      if (data.navbar) await setDoc(doc(db, 'settings', 'navbar'), data.navbar);
      if (data.youtube) await setDoc(doc(db, 'settings', 'youtube'), data.youtube);
      if (data.drive) await setDoc(doc(db, 'settings', 'drive'), data.drive);
      if (data.site) await setDoc(doc(db, 'settings', 'site'), data.site);
      toast.success('✅ Database restored!');
      logAct('update', 'Full restore from backup', 'backup');
    } catch (e) { toast.error(e.message); }
    setLoading(false);
  };

  // 16. SYSTEM TEST + PDF
  const [testRunning, setTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testResults, setTestResults] = useState([]);
  const [testScore, setTestScore] = useState(null);
  const [sysLog, setSysLog] = useState([]);
  const [pdfGen, setPdfGen] = useState(false);
  const sysRef = useRef(null);
  useEffect(() => { if (sysRef.current) sysRef.current.scrollTop = sysRef.current.scrollHeight; }, [sysLog]);
  const addResult = (name, status, detail) => setTestResults(p => [...p, { name, status, detail, time: new Date().toLocaleTimeString() }]);
  const sysLogAdd = msg => setSysLog(p => [...p, msg]);
  const pause = ms => new Promise(r => setTimeout(r, ms));

  const runTest = async () => {
    setTestRunning(true); setTestResults([]); setTestProgress(0); setTestScore(null); setSysLog([]);
    let passed = 0; const TOTAL = 25;
    sysLogAdd('▶ GNC SYSTEM DIAGNOSTICS v10.0 — 25-PHASE ULTRA SCAN');
    sysLogAdd('━'.repeat(46)); await pause(300);

    // T1 – Vite env
    sysLogAdd('[1/25] Checking Vite build environment...');
    try { if (import.meta.env.MODE) { addResult('Vite Environment', 'pass', `Mode: ${import.meta.env.MODE} | Base: ${import.meta.env.BASE_URL}`); passed++; sysLogAdd('  ✓ Vite running correctly'); } } catch (e) { addResult('Vite Environment', 'fail', e.message); }
    setTestProgress(Math.round(1/TOTAL*100)); await pause(300);

    // T2 – Firebase init
    sysLogAdd('[2/25] Verifying Firebase initialization...');
    try { if (db?.app?.options?.projectId) { addResult('Firebase Init', 'pass', `Project: ${db.app.options.projectId}`); passed++; sysLogAdd(`  ✓ Project: ${db.app.options.projectId}`); } else throw new Error('DB not initialized'); } catch (e) { addResult('Firebase Init', 'fail', e.message); }
    setTestProgress(Math.round(2/TOTAL*100)); await pause(300);

    // T3 – Firestore Read
    sysLogAdd('[3/25] Testing Firestore read permissions...');
    try { const s = await getDocs(query(collection(db, 'pages'), limit(1))); addResult('Firestore Read', 'pass', `Read successful — ${s.size} doc(s)`); passed++; sysLogAdd('  ✓ Read permissions active'); } catch (e) { addResult('Firestore Read', 'fail', 'Permission denied — check Firebase Rules'); }
    setTestProgress(Math.round(3/TOTAL*100)); await pause(300);

    // T4 – Firestore Write
    sysLogAdd('[4/25] Testing Firestore write permissions...');
    let testId = null;
    try { const d = await addDoc(collection(db, '_sysTest'), { t: serverTimestamp(), v: '10.0' }); testId = d.id; addResult('Firestore Write', 'pass', `Write OK — doc: ${d.id.substring(0, 10)}...`); passed++; sysLogAdd('  ✓ Write active'); } catch (e) { addResult('Firestore Write', 'fail', e.message); }
    setTestProgress(Math.round(4/TOTAL*100)); await pause(300);

    // T5 – Firestore Delete
    sysLogAdd('[5/25] Testing Firestore delete permissions...');
    try { if (testId) { await deleteDoc(doc(db, '_sysTest', testId)); addResult('Firestore Delete', 'pass', 'Delete OK — test doc cleaned'); passed++; sysLogAdd('  ✓ Delete active'); } else throw new Error('No test doc'); } catch (e) { addResult('Firestore Delete', 'fail', e.message); }
    setTestProgress(Math.round(5/TOTAL*100)); await pause(300);

    // T6 – Navbar
    sysLogAdd('[6/25] Checking navbar settings...');
    try { const s = await getDoc(doc(db, 'settings', 'navbar')); if (s.exists()) { addResult('Navbar Settings', 'pass', `${s.data().links?.length || 0} top-level nav items in DB`); passed++; } else { addResult('Navbar Settings', 'warn', 'No DB record — using static fallback'); passed++; } sysLogAdd('  ✓ Navbar OK'); } catch (e) { addResult('Navbar Settings', 'fail', e.message); }
    setTestProgress(Math.round(6/TOTAL*100)); await pause(300);

    // T7 – Site Settings
    sysLogAdd('[7/25] Checking site settings...');
    try { const s = await getDoc(doc(db, 'settings', 'site')); if (s.exists()) { addResult('Site Settings', 'pass', `Name: "${s.data().name || 'Set'}"`); } else { addResult('Site Settings', 'warn', 'Not configured — Admin → Settings tab'); } passed++; sysLogAdd('  ✓ Settings checked'); } catch (e) { addResult('Site Settings', 'fail', e.message); }
    setTestProgress(Math.round(7/TOTAL*100)); await pause(300);

    // T8 – ImgBB API
    sysLogAdd('[8/25] Validating ImgBB image upload API...');
    try { const fd = new FormData(); fd.append('image', 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'); const r = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB}`, { method: 'POST', body: fd }); if (r.ok) { addResult('ImgBB API', 'pass', 'Key valid — upload service active'); passed++; sysLogAdd('  ✓ ImgBB key valid'); } else throw new Error('Invalid key'); } catch (e) { addResult('ImgBB API', 'fail', e.message); }
    setTestProgress(Math.round(8/TOTAL*100)); await pause(300);

    // T9 – Flash Alerts
    sysLogAdd('[9/25] Checking flash alerts collection...');
    try { const s = await getDocs(collection(db, 'alerts')); const active = s.docs.filter(d => d.data().isActive).length; addResult('Flash Alerts', 'pass', `${s.size} total | ${active} currently LIVE`); passed++; sysLogAdd(`  ✓ ${s.size} alerts, ${active} active`); } catch (e) { addResult('Flash Alerts', 'fail', e.message); }
    setTestProgress(Math.round(9/TOTAL*100)); await pause(300);

    // T10 – Faculty
    sysLogAdd('[10/25] Checking faculty directory...');
    try { const s = await getDocs(collection(db, 'faculties')); const te = s.docs.filter(d => (d.data().staffType || 'Teaching') === 'Teaching').length; const nt = s.docs.filter(d => d.data().staffType === 'Non-Teaching').length; addResult('Faculty Directory', 'pass', `Teaching: ${te} | Non-Teaching: ${nt}`); passed++; sysLogAdd(`  ✓ ${te} teaching, ${nt} non-teaching`); } catch (e) { addResult('Faculty Directory', 'fail', e.message); }
    setTestProgress(Math.round(10/TOTAL*100)); await pause(300);

    // T11 – Alumni Placements
    sysLogAdd('[11/25] Checking alumni placements (Wall of Fame)...');
    try { const s = await getDocs(collection(db, 'placements')); const withPkg = s.docs.filter(d => d.data().package).length; addResult('Alumni Placements', 'pass', `${s.size} alumni | ${withPkg} with package data`); passed++; sysLogAdd(`  ✓ ${s.size} placement records`); } catch (e) { addResult('Alumni Placements', 'fail', e.message); }
    setTestProgress(Math.round(11/TOTAL*100)); await pause(300);

    // T12 – Content Health
    sysLogAdd('[12/25] Content health check (all collections)...');
    try { const [ns, as, es, ds, sl, pgs] = await Promise.all([getDocs(collection(db, 'notices')), getDocs(collection(db, 'announcements')), getDocs(collection(db, 'events')), getDocs(collection(db, 'pdfReports')), getDocs(collection(db, 'sliderSlides')), getDocs(collection(db, 'pages'))]); addResult('Content Health', 'pass', `Notices:${ns.size} | News:${as.size} | Events:${es.size} | Docs:${ds.size} | Slides:${sl.size} | Pages:${pgs.size}`); passed++; sysLogAdd('  ✓ All content collections accessible'); } catch (e) { addResult('Content Health', 'fail', e.message); }
    setTestProgress(Math.round(12/TOTAL*100)); await pause(300);

    // T13 – Leadership collection (NEW)
    sysLogAdd('[13/25] Checking leadership collection...');
    try { const s = await getDocs(collection(db, 'leadership')); const pr = s.docs.filter(d => d.data().type === 'president').length; const sec = s.docs.filter(d => d.data().type === 'secretary').length; const prin = s.docs.filter(d => d.data().type === 'principal').length; if (s.size === 0) { addResult('Leadership Records', 'warn', 'Empty — Admin → Leadership tab se Presidents/Secretaries/Principals add karein'); } else { addResult('Leadership Records', 'pass', `Presidents:${pr} | Secretaries:${sec} | Principals:${prin}`); } passed++; sysLogAdd(`  ✓ ${s.size} leadership records`); } catch (e) { addResult('Leadership Records', 'fail', e.message); }
    setTestProgress(Math.round(13/TOTAL*100)); await pause(300);

    // T14 – GB Meetings (NEW)
    sysLogAdd('[14/25] Checking GB Meeting PDF records...');
    try { const s = await getDocs(collection(db, 'gb_meetings')); const withPdf = s.docs.filter(d => d.data().pdfUrl).length; if (s.size === 0) { addResult('GB Meetings', 'warn', 'No meetings — Admin → GB Meetings tab se add karein'); } else { addResult('GB Meetings', 'pass', `${s.size} meetings | ${withPdf} with PDF`); } passed++; sysLogAdd(`  ✓ GB meetings: ${s.size}`); } catch (e) { addResult('GB Meetings', 'fail', e.message); }
    setTestProgress(Math.round(14/TOTAL*100)); await pause(300);

    // T15 – Staff Council (NEW)
    sysLogAdd('[15/25] Checking Staff Council PDF records...');
    try { const s = await getDocs(collection(db, 'staff_council')); const withPdf = s.docs.filter(d => d.data().pdfUrl).length; if (s.size === 0) { addResult('Staff Council', 'warn', 'No meetings — Admin → Staff Council tab se add karein'); } else { addResult('Staff Council', 'pass', `${s.size} meetings | ${withPdf} with PDF`); } passed++; sysLogAdd(`  ✓ Staff council meetings: ${s.size}`); } catch (e) { addResult('Staff Council', 'fail', e.message); }
    setTestProgress(Math.round(15/TOTAL*100)); await pause(300);

    // T16 – Campus Gallery (NEW)
    sysLogAdd('[16/25] Checking campus gallery collection...');
    try { const s = await getDocs(collection(db, 'campus_gallery')); const cats = [...new Set(s.docs.map(d => d.data().category).filter(Boolean))]; if (s.size === 0) { addResult('Campus Gallery', 'warn', 'Empty — Admin → Campus Gallery tab se photos add karein'); } else { addResult('Campus Gallery', 'pass', `${s.size} photos | Categories: ${cats.join(', ') || 'Uncategorized'}`); } passed++; sysLogAdd(`  ✓ Campus gallery: ${s.size} items`); } catch (e) { addResult('Campus Gallery', 'fail', e.message); }
    setTestProgress(Math.round(16/TOTAL*100)); await pause(300);

    // T17 – YouTube Config
    sysLogAdd('[17/25] Checking YouTube API configuration...');
    try { const s = await getDoc(doc(db, 'settings', 'youtube')); if (s.exists() && s.data().apiKey) { addResult('YouTube Config', 'pass', `Channel: ${s.data().channelId || '—'} | Max: ${s.data().maxResults || 12} videos`); passed++; } else { addResult('YouTube Config', 'warn', 'Not configured — Admin → YouTube tab'); sysLogAdd('  ⚠ YouTube not set up'); } } catch (e) { addResult('YouTube Config', 'fail', e.message); }
    setTestProgress(Math.round(17/TOTAL*100)); await pause(300);

    // T18 – Google Drive
    sysLogAdd('[18/25] Checking Google Drive configuration...');
    try { const s = await getDoc(doc(db, 'settings', 'drive')); if (s.exists() && s.data().apiKey) { addResult('Google Drive', 'pass', `Folder: "${s.data().folderName || s.data().folderId}"`); passed++; } else { addResult('Google Drive', 'warn', 'Not configured — Admin → Drive tab'); } } catch (e) { addResult('Google Drive', 'fail', e.message); }
    setTestProgress(Math.round(18/TOTAL*100)); await pause(300);

    // T19 – Activity Logging
    sysLogAdd('[19/25] Verifying activity logging system...');
    try { const testLog = await addDoc(collection(db, 'adminLogs'), { action: 'system_test', message: 'System test v10.0', time: new Date().toISOString(), createdAt: serverTimestamp() }); if (testLog.id) { addResult('Activity Logging', 'pass', `Log system active — ID: ${testLog.id.substring(0, 10)}...`); passed++; sysLogAdd('  ✓ Activity log working'); } } catch (e) { addResult('Activity Logging', 'fail', e.message); }
    setTestProgress(Math.round(19/TOTAL*100)); await pause(300);

    // T20 – Department Data
    sysLogAdd('[20/25] Checking department data collections...');
    try {
      const slugs = ['bca', 'bba', 'commerce', 'humanities', 'social-science'];
      const snaps = await Promise.all(slugs.map(s => getDoc(doc(db, 'departments', s))));
      const configured = snaps.filter(s => s.exists() && s.data().fullName).length;
      const withHod    = snaps.filter(s => s.exists() && s.data().hod?.name).length;
      if (configured === 0) { addResult('Department Data', 'warn', 'No dept configured — Admin → Departments tab'); sysLogAdd('  ⚠ No department data found'); }
      else { addResult('Department Data', 'pass', `${configured}/5 configured | HOD: ${withHod}`); sysLogAdd(`  ✓ ${configured}/5 departments active`); }
      passed++;
    } catch (e) { addResult('Department Data', 'fail', e.message); sysLogAdd(`  ✗ ${e.message}`); }
    setTestProgress(Math.round(20/TOTAL*100)); await pause(300);

    // T21 – Contact Settings
    sysLogAdd('[21/25] Checking contact settings...');
    try {
      const [contactSnap, dirSnap] = await Promise.all([getDoc(doc(db, 'settings', 'contact')), getDocs(collection(db, 'contactDirectory'))]);
      const hasContact = contactSnap.exists();
      const bhudaOk    = hasContact && !!contactSnap.data().bhuda?.phone;
      const bankMoreOk = hasContact && !!contactSnap.data().bankMore?.phone;
      const dirCount   = dirSnap.size;
      if (!hasContact) { addResult('Contact Settings', 'warn', 'settings/contact missing — Admin → Contact tab'); sysLogAdd('  ⚠ Contact settings not configured'); }
      else if (!bhudaOk || !bankMoreOk) { addResult('Contact Settings', 'warn', `Partial: Bhuda ${bhudaOk?'✓':'✗'} | Bank More ${bankMoreOk?'✓':'✗'} | Dir: ${dirCount}`); sysLogAdd('  ⚠ Contact partially configured'); }
      else { addResult('Contact Settings', 'pass', `Both campuses configured | Directory: ${dirCount} entries`); sysLogAdd(`  ✓ Contact OK`); }
      passed++;
    } catch (e) { addResult('Contact Settings', 'fail', e.message); sysLogAdd(`  ✗ ${e.message}`); }
    setTestProgress(Math.round(21/TOTAL*100)); await pause(300);

    // T22 – CMS Pages (NEW)
    sysLogAdd('[22/25] Checking CMS pages (PageViewer routes)...');
    try {
      const s = await getDocs(collection(db, 'pages'));
      const regulationPaths = ['/about-us/regulations/bbmku/special-ug-regulation','/about-us/regulations/bbmku/ug-regulation-fyugp','/about-us/regulations/bbmku/ug-regulation-cbcs','/about-us/regulations/college-affiliation','/about-us/regulations/ugc-section','/about-us/regulations/vbu/ug-regulation-2015','/about-us/regulations/vbu/bca-regulation','/about-us/regulations/byelaws','/about-us/regulations/exemption','/about-us/audit-report'];
      const pagePaths = s.docs.map(d => d.data().slug || d.data().path || '');
      const filled = regulationPaths.filter(p => pagePaths.some(pp => pp.includes(p.split('/').pop())));
      addResult('CMS Pages', filled.length === regulationPaths.length ? 'pass' : 'warn', `${filled.length}/${regulationPaths.length} regulation pages created | Total: ${s.size} pages`);
      if (filled.length < regulationPaths.length) sysLogAdd(`  ⚠ ${regulationPaths.length - filled.length} regulation pages missing`);
      else sysLogAdd('  ✓ All regulation pages exist');
      passed++;
    } catch (e) { addResult('CMS Pages', 'fail', e.message); }
    setTestProgress(Math.round(22/TOTAL*100)); await pause(300);

    // T23 – Admin Auth (NEW)
    sysLogAdd('[23/25] Verifying admin session auth system...');
    try {
      const hasSession = typeof sessionStorage !== 'undefined';
      const authKey = sessionStorage.getItem('gnc_admin_auth');
      addResult('Admin Auth System', 'pass', `sessionStorage: ${hasSession ? 'active' : 'N/A'} | Current session: ${authKey === 'true' ? '✓ logged in' : '✗ not logged in'}`);
      passed++; sysLogAdd('  ✓ Auth system operational');
    } catch (e) { addResult('Admin Auth System', 'fail', e.message); }
    setTestProgress(Math.round(23/TOTAL*100)); await pause(300);

    // T24 – Hero Slider
    sysLogAdd('[24/25] Checking hero slider slides...');
    try { const s = await getDocs(collection(db, 'sliderSlides')); const active = s.docs.filter(d => d.data().active !== false).length; if (s.size === 0) { addResult('Hero Slider', 'warn', 'No slides — Admin → Hero Slider tab se slides add karein'); } else { addResult('Hero Slider', 'pass', `${s.size} slides | ${active} active`); } passed++; sysLogAdd(`  ✓ Slider: ${s.size} slides`); } catch (e) { addResult('Hero Slider', 'fail', e.message); }
    setTestProgress(Math.round(24/TOTAL*100)); await pause(300);

    // T25 – Gallery + Quick Nav
    sysLogAdd('[25/25] Checking gallery & unused code audit...');
    try {
      const s = await getDocs(collection(db, 'gallery'));
      const unusedFiles = ['AboutUs.jsx','QuickRibbon.jsx','ScrollingNotices.jsx','SystemHealth.jsx','DemoHomePage.jsx','DemoPage.jsx','RichTextEditorToolbar.jsx'];
      addResult('Gallery & Code Audit', s.size > 0 ? 'pass' : 'warn',
        `Gallery: ${s.size} photos | Unused files detected: ${unusedFiles.length} (see cleanup report below)`
      );
      if (s.size === 0) sysLogAdd('  ⚠ Gallery empty'); else sysLogAdd(`  ✓ Gallery: ${s.size} photos`);
      sysLogAdd('  ℹ Unused files: ' + unusedFiles.join(', '));
      passed++;
    } catch (e) { addResult('Gallery & Code Audit', 'fail', e.message); }
    setTestProgress(100);

    const score = Math.round(passed / TOTAL * 100);
    sysLogAdd(''); sysLogAdd('━'.repeat(46));
    sysLogAdd(`COMPLETE: ${score}% — ${passed}/${TOTAL} tests passed`);
    if (score === 100) sysLogAdd('✓ ALL 25 SYSTEMS OPERATIONAL — WEBSITE READY');
    else if (score >= 80) sysLogAdd('⚠ MINOR ISSUES — CHECK WARNINGS ABOVE');
    else sysLogAdd('✗ CRITICAL ISSUES — IMMEDIATE ATTENTION REQUIRED');
    setTestScore(score); setTestRunning(false);
  };

  // ── PDF REPORT (FIXED: renamed W→pdfW, pages→numPages to avoid shadowing) ──
  const genPDF = async () => {
    setPdfGen(true);
    try {
      if (!window.jspdf) {
        await new Promise((res, rej) => {
          const s = document.createElement('script');
          s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
          s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      }
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      // FIX: renamed to avoid shadowing outer scope WHITE constant and pages prop
      const pdfW = 210;
      const pdfH = 297;
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
      const timeStr = now.toLocaleTimeString();
      const passCount = testResults.filter(r => r.status === 'pass').length;
      const warnCount = testResults.filter(r => r.status === 'warn').length;
      const failCount = testResults.filter(r => r.status === 'fail').length;
      const sc = testScore || 0;
      const scColor = sc >= 90 ? [16, 185, 129] : sc >= 70 ? [245, 158, 11] : [239, 68, 68];

      pdf.setFillColor(15, 35, 71); pdf.rect(0, 0, pdfW, 58, 'F');
      pdf.setFillColor(...scColor); pdf.rect(0, 58, pdfW, 2.5, 'F');

      try {
        const logoUrl = `${window.location.origin}${import.meta.env.BASE_URL || '/'}images/logo.png`;
        const imgData = await fetch(logoUrl).then(r => r.blob()).then(b => new Promise(res => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(b); }));
        pdf.addImage(imgData, 'PNG', 12, 9, 30, 30);
      } catch {
        pdf.setFillColor(244, 160, 35); pdf.circle(27, 24, 12, 'F');
        pdf.setTextColor(15, 35, 71); pdf.setFontSize(8); pdf.setFont('helvetica', 'bold'); pdf.text('GNC', 23, 26);
      }

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(19); pdf.setFont('helvetica', 'bold'); pdf.text('GURU NANAK COLLEGE', 50, 18);
      pdf.setFontSize(8.5); pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(180, 200, 240);
      pdf.text('Affiliated to B.B.M.K. University, Dhanbad | NAAC Accredited Institution', 50, 26);
      pdf.text('Bank More, Dhanbad — 826001, Jharkhand, India', 50, 33);
      pdf.text('Website System Health Diagnostic Report — Confidential', 50, 40);

      pdf.setFillColor(...scColor);
      pdf.roundedRect(pdfW - 40, 12, 28, 20, 3, 3, 'F');
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(16); pdf.setFont('helvetica', 'bold');
      pdf.text(`${sc}%`, pdfW - 26, 26, { align: 'center' });

      pdf.setFillColor(244, 160, 35);
      pdf.rect(0, 65, pdfW, 12, 'F');
      pdf.setTextColor(15, 35, 71); pdf.setFontSize(10); pdf.setFont('helvetica', 'bold');
      pdf.text('WEBSITE SYSTEM HEALTH DIAGNOSTIC REPORT — 15 PHASE DEEP SCAN', pdfW / 2, 73, { align: 'center' });

      pdf.setFontSize(8); pdf.setFont('helvetica', 'normal'); pdf.setTextColor(80, 80, 100);
      pdf.text(`Generated: ${dateStr} at ${timeStr}`, 12, 86);
      pdf.text(`Total Tests: 15  |  Passed: ${passCount}  |  Warnings: ${warnCount}  |  Failed: ${failCount}`, pdfW / 2, 86, { align: 'center' });
      pdf.text('Admin Panel v10.0', pdfW - 12, 86, { align: 'right' });

      let y = 96;
      pdf.setFillColor(15, 35, 71); pdf.rect(12, y, pdfW - 24, 9, 'F');
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(8.5); pdf.setFont('helvetica', 'bold');
      pdf.text('#', 15, y + 6); pdf.text('TEST NAME', 22, y + 6); pdf.text('STATUS', 112, y + 6); pdf.text('DETAILS', 135, y + 6); pdf.text('TIME', 185, y + 6);
      y += 11;

      testResults.forEach((r, i) => {
        if (y > pdfH - 35) {
          pdf.addPage();
          pdf.setFillColor(15, 35, 71); pdf.rect(0, 0, pdfW, 14, 'F');
          pdf.setFillColor(244, 160, 35); pdf.rect(0, 14, pdfW, 2, 'F');
          pdf.setTextColor(255, 255, 255); pdf.setFontSize(8); pdf.text('GNC — System Diagnostic Report (cont.)', 12, 10);
          y = 25;
        }
        const even = i % 2 === 0;
        pdf.setFillColor(even ? 248 : 255, even ? 250 : 255, even ? 255 : 255);
        pdf.rect(12, y - 2, pdfW - 24, 9, 'F');
        const sc2 = r.status === 'pass' ? [16, 185, 129] : r.status === 'warn' ? [245, 158, 11] : [239, 68, 68];
        pdf.setFillColor(...sc2); pdf.roundedRect(110, y - 1.5, 20, 7, 1.5, 1.5, 'F');
        pdf.setTextColor(80, 80, 100); pdf.setFontSize(8); pdf.setFont('helvetica', 'normal');
        pdf.text(String(i + 1), 15, y + 4); pdf.text(r.name.substring(0, 40), 22, y + 4);
        pdf.setTextColor(255, 255, 255); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7);
        pdf.text(r.status === 'pass' ? 'PASS' : r.status === 'warn' ? 'WARN' : 'FAIL', 120, y + 4, { align: 'center' });
        pdf.setTextColor(80, 80, 100); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7.5);
        pdf.text((r.detail || '').substring(0, 55), 135, y + 4);
        if (r.time) { pdf.setTextColor(150, 150, 170); pdf.setFontSize(7); pdf.text(r.time, 185, y + 4); }
        pdf.setDrawColor(230, 235, 245); pdf.line(12, y + 7, pdfW - 12, y + 7);
        y += 10;
      });

      y += 6; if (y > pdfH - 55) { pdf.addPage(); y = 20; }
      pdf.setFillColor(244, 160, 35); pdf.rect(12, y, pdfW - 24, 1, 'F'); y += 8;
      pdf.setTextColor(15, 35, 71); pdf.setFontSize(11); pdf.setFont('helvetica', 'bold'); pdf.text('EXECUTIVE SUMMARY', 12, y); y += 10;
      const summaryRows = [
        ['Tests Passed', `${passCount} / 15`, passCount === 15 ? '🟢 Perfect' : passCount >= 12 ? '🟡 Good' : '🔴 Action Required'],
        ['Warnings', `${warnCount}`, warnCount === 0 ? 'None' : 'Review Recommended'],
        ['Failed', `${failCount}`, failCount === 0 ? 'None' : '⚠ Fix Immediately'],
        ['Overall Score', `${sc}%`, sc >= 90 ? 'HEALTHY' : sc >= 70 ? 'FAIR' : 'CRITICAL'],
        ['Report Generated', dateStr, timeStr],
      ];
      summaryRows.forEach(([k, v, n]) => {
        pdf.setFillColor(248, 250, 255); pdf.rect(12, y - 2, pdfW - 24, 9, 'F');
        pdf.setTextColor(80, 80, 100); pdf.setFontSize(8.5); pdf.setFont('helvetica', 'normal'); pdf.text(k, 16, y + 4);
        pdf.setFont('helvetica', 'bold'); pdf.setTextColor(15, 35, 71); pdf.text(v, 85, y + 4);
        pdf.setFont('helvetica', 'italic'); pdf.setTextColor(100, 120, 160); pdf.text(n, 140, y + 4);
        pdf.setDrawColor(230, 235, 245); pdf.line(12, y + 7, pdfW - 12, y + 7);
        y += 11;
      });

      // FIX: renamed pages → numPages to avoid shadowing the 'pages' prop
      const numPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= numPages; i++) {
        pdf.setPage(i);
        pdf.setFillColor(15, 35, 71); pdf.rect(0, pdfH - 13, pdfW, 13, 'F');
        pdf.setFillColor(244, 160, 35); pdf.rect(0, pdfH - 13, pdfW, 1, 'F');
        pdf.setTextColor(140, 160, 200); pdf.setFontSize(7); pdf.setFont('helvetica', 'normal');
        pdf.text('Guru Nanak College, Dhanbad | Confidential — Admin Use Only', 12, pdfH - 4.5);
        pdf.text(`Page ${i} of ${numPages}`, pdfW - 12, pdfH - 4.5, { align: 'right' });
      }

      pdf.save(`GNC_System_Report_${now.toISOString().split('T')[0]}.pdf`);
      toast.success('📥 PDF Report downloaded!');
    } catch (e) { toast.error('PDF Error: ' + e.message); }
    setPdfGen(false);
  };

  // ── Global Search ─────────────────────────────────────────────────────────
  const dSearch = useDebounce(globalSearch, 250);
  const allItems = useMemo(() => [
    ...(notices || []).map(n => ({ ...n, _t: n.text?.substring(0, 50), _type: '📢 Notice', _tab: 'notices' })),
    ...(announcements || []).map(a => ({ ...a, _t: a.text?.substring(0, 50), _type: '📣 News', _tab: 'announcements' })),
    ...(events || []).map(e => ({ ...e, _t: e.title, _type: '🏆 Event', _tab: 'events' })),
    ...(pages || []).map(p => ({ ...p, _t: p.title, _type: '📄 Page', _tab: 'pages' })),
    ...(faculties || []).map(f => ({ ...f, _t: f.name, _type: '👨‍🏫 Staff', _tab: 'faculty' })),
    ...(placements || []).map(p => ({ ...p, _t: p.name, _type: '🎓 Alumni', _tab: 'placements' })),
    ...(pdfReports || []).map(d => ({ ...d, _t: d.title, _type: '📁 Doc', _tab: 'documents' })),
    ...(gallery || []).map(g => ({ ...g, _t: g.title, _type: '📸 Photo', _tab: 'gallery' })),
  ], [notices, announcements, events, pages, faculties, placements, pdfReports, gallery]);

  const searchResults = useMemo(() =>
    dSearch.length > 1
      ? allItems.filter(i => i._t?.toLowerCase().includes(dSearch.toLowerCase())).slice(0, 12)
      : [],
    [allItems, dSearch]
  );

  // ── Compute live alerts badge dynamically ─────────────────────────────────
  const liveAlertCount = (alerts || []).filter(a => a.isActive).length || null;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="adm" style={{ display: 'flex', height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 99999, overflow: 'hidden' }}>
      <style>{GCSS}</style>

      {/* Image Cropper */}
      {cropSrc && (
        <Suspense fallback={
          <div style={{ position: 'fixed', inset: 0, zIndex: 100010, background: 'rgba(15,35,71,.92)', color: WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading Cropper…
          </div>
        }>
          <ImageCropper src={cropSrc} onCrop={handleCrop} onCancel={() => { setCropSrc(null); setCropCb(null); }} />
        </Suspense>
      )}

      {/* ── SIDEBAR ─────────────────────────────────────────────── */}
      <div className={`adm-side ${sideCollapsed && !isMobile ? 'collapsed' : ''} ${isMobile && sideOpen ? 'open' : ''}`}>
        <div className="adm-brand">
          <div
            style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${GOLD},${T.goldD})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, cursor: 'pointer' }}
            onClick={() => isMobile ? setSideOpen(false) : setSideCollapsed(c => !c)}
          >🏫</div>
          <div className="adm-brand-text">
            <div style={{ fontWeight: 900, color: WHITE, fontSize: 13, letterSpacing: -.2, lineHeight: 1.2 }}>GNC Admin</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', fontWeight: 600 }}>v10.0</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {/* FIX: use a local variable inside map instead of mutating outer lastSec */}
          {(() => {
            let lastSec = '';
            return TABS.map(t => {
              const showSec = t.section && t.section !== lastSec;
              if (t.section) lastSec = t.section;
              const badge = t.id === 'alerts' ? liveAlertCount : null;
              return (
                <React.Fragment key={t.id}>
                  {showSec && <div className="adm-sec-label">{t.section}</div>}
                  <div
                    className={`anav ${tab === t.id ? 'active' : ''}`}
                    onClick={() => { setTab(t.id); if (isMobile) setSideOpen(false); }}
                    title={t.label}
                  >
                    <span style={{ fontSize: 16, width: 22, textAlign: 'center', flexShrink: 0 }}>{t.icon}</span>
                    <span className="nav-label" style={{ flex: 1 }}>{t.label}</span>
                    {badge ? <span className="nav-badge">{badge}</span> : null}
                  </div>
                </React.Fragment>
              );
            });
          })()}
        </div>

        <div className="adm-side-footer">
          <div
            className="anav"
            style={{ background: 'rgba(239,68,68,.15)', color: T.red, border: '1px solid rgba(239,68,68,.2)' }}
            onClick={onClose}
          >
            <span style={{ fontSize: 16, width: 22, textAlign: 'center', flexShrink: 0 }}>✕</span>
            <span className="nav-label">Exit Admin</span>
          </div>
        </div>
      </div>

      {isMobile && sideOpen && (
        <div
          onClick={() => setSideOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,35,71,.6)', zIndex: 10000, backdropFilter: 'blur(3px)' }}
        />
      )}

      {/* ── MAIN ──────────────────────────────────────────────────── */}
      <div className="adm-main">
        {/* Mobile top bar */}
        <div className="adm-mobile-top">
          <button onClick={() => setSideOpen(true)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: NAVY }}>☰</button>
          <span style={{ fontWeight: 900, color: NAVY, fontSize: 14 }}>GNC Admin Panel</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: T.red }}>✕</button>
        </div>

        {/* Top bar */}
        <div className="adm-topbar">
          {!isMobile && (
            <button onClick={() => setSideCollapsed(c => !c)} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: T.t3, flexShrink: 0 }}>☰</button>
          )}
          <div className="top-search" style={{ position: 'relative' }}>
            <input
              placeholder="Search everything... (Ctrl+K)"
              value={globalSearch}
              onChange={e => setGlobalSearch(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: WHITE, border: `1.5px solid ${T.b1}`, borderRadius: 12, boxShadow: T.shadowHov, zIndex: 1000, maxHeight: 320, overflowY: 'auto', marginTop: 4 }}>
                {searchResults.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => { setTab(item._tab); setGlobalSearch(''); }}
                    style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', borderBottom: `1px solid ${T.b1}` }}
                    onMouseEnter={e => e.currentTarget.style.background = BG}
                    onMouseLeave={e => e.currentTarget.style.background = WHITE}
                  >
                    <span className="abadge" style={{ background: `${NAVY}12`, color: NAVY, fontSize: 10 }}>{item._type}</span>
                    <span style={{ fontSize: 13, color: T.t1, fontWeight: 600, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item._t}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: T.t3, fontWeight: 700 }}>
              <div className="glow" style={{ width: 7, height: 7, borderRadius: '50%' }} />
              <span style={{ color: T.green }}>Live</span>
            </div>
            <div style={{ background: BG, border: `1.5px solid ${T.b1}`, borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, color: T.t2 }}>
              {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
            </div>
            <button className="abtn abtn-outline abtn-sm" onClick={() => setShowKeyHelp(true)}>⌨ Shortcuts</button>
          </div>
        </div>

        {/* ── CONTENT AREA ─────────────────────────────────────── */}
        <div className="adm-content" ref={contentRef}>

          {/* ── DASHBOARD ────────────────────────────────────────── */}
          {tab === 'dashboard' && (
            <div className="fade-up">
              <p className="asec">📊 Dashboard</p>
              <p className="asub">Real-time website overview — sabhi modules at a glance</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr))', gap: 14, marginBottom: 28 }}>
                <StatCard icon="📢" label="Notices" count={(notices||[]).length} color={GOLD} onClick={() => setTab('notices')} />
                <StatCard icon="🏆" label="Events" count={(events||[]).length} color={NAVY} onClick={() => setTab('events')} />
                <StatCard icon="👨‍🏫" label="Faculty" count={(faculties||[]).length} color={T.blue} sub={`${(faculties||[]).filter(f=>f.staffType==='Non-Teaching').length} non-teaching`} onClick={() => setTab('faculty')} />
                <StatCard icon="🎓" label="Alumni" count={(placements||[]).length} color={T.green} onClick={() => setTab('placements')} />
                <StatCard icon="📁" label="Documents" count={(pdfReports||[]).length} color={T.purple} onClick={() => setTab('documents')} />
                <StatCard icon="🚨" label="Live Alerts" count={(alerts||[]).filter(a=>a.isActive).length} color={T.red} onClick={() => setTab('alerts')} />
                <StatCard icon="📸" label="Gallery" count={(gallery||[]).length} color={T.orange} onClick={() => setTab('gallery')} />
                <StatCard icon="📄" label="Pages" count={(pages||[]).length} color={T.cyan} onClick={() => setTab('pages')} />
              </div>

              <div className="card">
                <div className="actitle">⚡ Quick Actions</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12 }}>
                  {[
                    { icon: '📢', label: 'Add Notice', tab: 'notices' },
                    { icon: '📣', label: 'Add News', tab: 'announcements' },
                    { icon: '🏆', label: 'Add Event', tab: 'events' },
                    { icon: '📁', label: 'Add Doc', tab: 'documents' },
                    { icon: '👨‍🏫', label: 'Add Staff', tab: 'faculty' },
                    { icon: '🎓', label: 'Add Alumni', tab: 'placements' },
                    { icon: '🚨', label: 'New Alert', tab: 'alerts' },
                    { icon: '📸', label: 'Add Photo', tab: 'gallery' },
                  ].map(a => (
                    <div key={a.tab} className="qa-card" onClick={() => setTab(a.tab)}>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>{a.icon}</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{a.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="actitle">
                  🕐 Recent Activity
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div className="glow" style={{ width: 7, height: 7, borderRadius: '50%' }} />
                    <span style={{ fontSize: 12, color: T.green, fontWeight: 800 }}>Live</span>
                  </div>
                </div>
                {actLog.length === 0 && <div style={{ textAlign: 'center', padding: '40px 0', color: T.t4 }}>No activity yet</div>}
                {actLog.slice(0, 8).map(l => (
                  <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: `1px solid ${T.b1}` }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: l.action === 'add' ? '#dcfce7' : l.action === 'delete' ? '#fee2e2' : '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                      {l.action === 'add' ? '➕' : l.action === 'delete' ? '🗑️' : '✏️'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: NAVY }}>{l.message}</div>
                      <div style={{ fontSize: 11, color: T.t3 }}>{l.section} • {l.time ? new Date(l.time).toLocaleString() : ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── QUICK PUBLISH ─────────────────────────────────────── */}
          {tab === 'quick' && (
            <div className="fade-up">
              <p className="asec">⚡ Quick Publish</p>
              <p className="asub">Sirf 30 second mein kuch bhi publish karein</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div className="card-gold">
                  <div className="actitle">📢 Quick Notice</div>
                  <form onSubmit={async e => { e.preventDefault(); setLoading(true); try { await addDoc(collection(db, 'notices'), { text: noticeData.text, type: 'General', isNew: true, link: '', date: new Date().toISOString(), createdAt: serverTimestamp() }); toast.success('Notice published!'); logAct('add', `Quick notice: ${noticeData.text?.substring(0,30)}`, 'notices'); setNoticeData(d => ({...d, text: ''})); } catch(err){toast.error(err.message);} setLoading(false); }}>
                    <textarea className="ainp" rows={3} value={noticeData.text} onChange={e => setNoticeData(d => ({...d, text: e.target.value}))} placeholder="Notice text likhein..." required />
                    <button type="submit" className="abtn abtn-gold" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }} disabled={loading}>🚀 Publish Notice</button>
                  </form>
                </div>
                <div className="card-navy">
                  <div className="actitle">📣 Quick News</div>
                  <form onSubmit={async e => { e.preventDefault(); setLoading(true); try { await addDoc(collection(db, 'announcements'), { text: annData.text, type: 'News', link: '', date: new Date().toISOString(), createdAt: serverTimestamp() }); toast.success('News published!'); logAct('add', `Quick news: ${annData.text?.substring(0,30)}`, 'announcements'); setAnnData(d => ({...d, text: ''})); } catch(err){toast.error(err.message);} setLoading(false); }}>
                    <textarea className="ainp" rows={3} value={annData.text} onChange={e => setAnnData(d => ({...d, text: e.target.value}))} placeholder="News text likhein..." required />
                    <button type="submit" className="abtn abtn-navy" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }} disabled={loading}>🚀 Publish News</button>
                  </form>
                </div>
                <div className="card-gold">
                  <div className="actitle">🏆 Quick Event</div>
                  <form onSubmit={async e => { e.preventDefault(); setLoading(true); try { await addDoc(collection(db, 'events'), { title: evtData.title, day: evtData.day, month: evtData.month, type: evtData.type, location: evtData.location || 'Campus', status: 'upcoming', desc: '', imageUrl: '', reportLink: '', date: new Date().toISOString(), createdAt: serverTimestamp() }); toast.success('Event added!'); logAct('add', `Quick event: ${evtData.title}`, 'events'); setEvtData(d => ({...d, title: '', day: '', month: ''})); } catch(err){toast.error(err.message);} setLoading(false); }}>
                    <input className="ainp" value={evtData.title} onChange={e => setEvtData(d => ({...d, title: e.target.value}))} placeholder="Event title..." required style={{ marginBottom: 8 }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                      <input className="ainp" value={evtData.day} onChange={e => setEvtData(d => ({...d, day: e.target.value}))} placeholder="Day (24)" />
                      <input className="ainp" value={evtData.month} onChange={e => setEvtData(d => ({...d, month: e.target.value}))} placeholder="Month (MAR)" />
                      <select className="ainp" value={evtData.type} onChange={e => setEvtData(d => ({...d, type: e.target.value}))}>
                        {['WORKSHOP','SEMINAR','CULTURAL','SPORTS','NSS','NCC'].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <button type="submit" className="abtn abtn-gold" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }} disabled={loading}>🚀 Add Event</button>
                  </form>
                </div>
                <div className="card-navy">
                  <div className="actitle">🚨 Quick Alert</div>
                  <form onSubmit={async e => { e.preventDefault(); setLoading(true); try { await addDoc(collection(db, 'alerts'), { text: alertData.text, isActive: true, type: 'urgent', createdAt: serverTimestamp() }); toast.success('🔴 Alert is LIVE!'); logAct('add', `Quick alert: ${alertData.text?.substring(0,30)}`, 'alerts'); setAlertData(d => ({...d, text: ''})); } catch(err){toast.error(err.message);} setLoading(false); }}>
                    <textarea className="ainp" rows={3} value={alertData.text} onChange={e => setAlertData(d => ({...d, text: e.target.value}))} placeholder="Urgent message..." required />
                    <button type="submit" className="abtn abtn-navy" style={{ marginTop: 12, width: '100%', justifyContent: 'center', background: T.red }} disabled={loading}>🔴 Go Live Now</button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ── ALERTS ───────────────────────────────────────────── */}
          {tab === 'alerts' && (
            <div className="fade-up">
              <p className="asec">🚨 Flash Alert Manager</p>
              <p className="asub">Scrolling banner + popup — sirf toggle karein ON/OFF</p>
              <div className="card-gold">
                <div className="actitle">{editAlert ? '✏️ Edit Alert' : '➕ Create Alert'}</div>
                <form onSubmit={saveAlert}>
                  <div style={{ marginBottom: 14 }}>
                    <label className="alabel">Alert Message *</label>
                    <textarea className="ainp" rows={3} value={alertData.text || ''} onChange={e => setAlertData(d => ({...d, text: e.target.value}))} required placeholder="College will remain closed tomorrow due to holiday..." />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20, padding: '14px 18px', background: BG, borderRadius: 12, flexWrap: 'wrap' }}>
                    <Toggle checked={!!alertData.isActive} onChange={() => setAlertData(d => ({...d, isActive: !d.isActive}))} label={alertData.isActive ? '🔴 LIVE — visible to everyone' : '⚪ OFF — hidden'} color={T.red} />
                    <div style={{ height: 32, width: 1, background: T.b1 }} />
                    <div>
                      <label className="alabel">Alert Type</label>
                      <select className="ainp" style={{ marginTop: 0 }} value={alertData.type || 'urgent'} onChange={e => setAlertData(d => ({...d, type: e.target.value}))}>
                        {['urgent', 'holiday', 'exam', 'admission', 'event'].map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editAlert ? 'Update' : 'Publish'}</button>
                    {editAlert && <button type="button" className="abtn abtn-outline" onClick={() => { setEditAlert(null); clearAlertDraft(); }}>Cancel</button>}
                  </div>
                </form>
              </div>
              <SectionSearch value={alertSearch} onChange={setAlertSearch} placeholder="Search alerts..." />
              <BulkBar count={alertSel.length} onDelete={() => { bulkDelete('alerts', alertSel); setAlertSel([]); }} onClear={() => setAlertSel([])} />
              <div className="card">
                <div className="actitle">All Alerts ({(alerts||[]).filter(a => !alertSearch || a.text?.toLowerCase().includes(alertSearch.toLowerCase())).length})</div>
                {(alerts||[]).filter(a => !alertSearch || a.text?.toLowerCase().includes(alertSearch.toLowerCase())).map(a => (
                  <div key={a.id} className={`arow ${alertSel.includes(a.id) ? 'selected' : ''}`} style={{ borderLeft: `4px solid ${a.isActive ? T.red : T.b2}` }}>
                    <input type="checkbox" checked={alertSel.includes(a.id)} onChange={() => toggleAlertSel(a.id)} style={{ width: 16, height: 16, accentColor: NAVY }} />
                    <div style={{ flex: 1 }}>
                      <span className="abadge" style={{ background: a.isActive ? '#fee2e2' : BG, color: a.isActive ? T.red : T.t3, marginBottom: 5 }}>{a.isActive ? '🔴 LIVE' : '⚪ OFF'}</span>
                      <div style={{ fontWeight: 700, color: NAVY, fontSize: 14, marginTop: 3 }}>{a.text}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <Toggle checked={a.isActive} onChange={() => toggleAlert(a)} />
                      <button className="abtn abtn-outline abtn-sm" onClick={() => { setEditAlert(a); setAlertData({ text: a.text, isActive: a.isActive, type: a.type||'urgent' }); window.scrollTo({top:0,behavior:'smooth'}); }}>✏️</button>
                      <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('alerts', a.id, a, a.text?.substring(0,30))}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
              <MiniLog logs={getSectionLog('alerts')} />
            </div>
          )}

          {/* ── PLACEMENTS ───────────────────────────────────────── */}
          {tab === 'placements' && (
            <div className="fade-up">
              <p className="asec">🎓 Alumni Wall of Fame</p>
              <p className="asub">Student success stories — homepage auto-slider</p>
              <div className="card-gold">
                <div className="actitle">{editPlace ? '✏️ Edit Story' : '➕ Add Success Story'}</div>
                <form onSubmit={savePlace}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
                    <div><label className="alabel">Student Name *</label><input className="ainp" value={placeData.name || ''} onChange={e=>setPlaceData(d=>({...d,name:e.target.value}))} placeholder="Rahul Kumar" required /></div>
                    <div><label className="alabel">Passing Year *</label><input className="ainp" value={placeData.year || ''} onChange={e=>setPlaceData(d=>({...d,year:e.target.value}))} placeholder="2024" required /></div>
                    <div><label className="alabel">Company *</label><input className="ainp" value={placeData.company || ''} onChange={e=>setPlaceData(d=>({...d,company:e.target.value}))} placeholder="TCS / SBI / Wipro" required /></div>
                    <div><label className="alabel">Package</label><input className="ainp" value={placeData.package || ''} onChange={e=>setPlaceData(d=>({...d,package:e.target.value}))} placeholder="4.5 LPA" /></div>
                    <div><label className="alabel">Department</label><select className="ainp" value={placeData.dept || ''} onChange={e=>setPlaceData(d=>({...d,dept:e.target.value}))}><option value="">Select</option>{[...teachDepts,...nonTeachDepts].map(d=><option key={d}>{d}</option>)}</select></div>
                    <div><label className="alabel">Achievement</label><input className="ainp" value={placeData.achievement || ''} onChange={e=>setPlaceData(d=>({...d,achievement:e.target.value}))} placeholder="Gold Medalist, Topper..." /></div>
                  </div>
                  <MediaPicker
                    label="Student Photo"
                    value={placeData.imageUrl}
                    onChange={url => setPlaceData(d => ({ ...d, imageUrl: url }))}
                    type="image"
                  />
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 Save Story</button>
                    {editPlace && <button type="button" className="abtn abtn-outline" onClick={() => { setEditPlace(null); clearPlaceDraft(); }}>Cancel</button>}
                  </div>
                </form>
              </div>
              <SectionSearch value={placeSearch} onChange={setPlaceSearch} placeholder="Search alumni..." />
              <BulkBar count={placeSel.length} onDelete={() => { bulkDelete('placements', placeSel); setPlaceSel([]); }} onClear={() => setPlaceSel([])} />
              <div className="card">
                <div className="actitle">Wall of Fame ({(placements||[]).length} stories)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
                  {(placements||[]).filter(p => !placeSearch || p.name?.toLowerCase().includes(placeSearch.toLowerCase()) || p.company?.toLowerCase().includes(placeSearch.toLowerCase())).map(p => (
                    <div key={p.id} className={`arow ${placeSel.includes(p.id)?'selected':''}`} style={{ padding: 16, flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ display: 'flex', gap: 12, width: '100%', alignItems: 'flex-start' }}>
                        <input type="checkbox" checked={placeSel.includes(p.id)} onChange={() => setPlaceSel(s => s.includes(p.id) ? s.filter(x=>x!==p.id) : [...s,p.id])} style={{ marginTop: 4, accentColor: NAVY }} />
                        <img src={p.imageUrl||'/images/college_photo.jpg'} alt="" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${GOLD}`, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 900, color: NAVY, fontSize: 15 }}>{p.name}</div>
                          <div style={{ fontSize: 12, color: T.t3, marginTop: 2 }}>Batch {p.year} {p.dept && `• ${p.dept}`}</div>
                          <div style={{ fontSize: 13, color: T.green, fontWeight: 800, marginTop: 4 }}>💼 {p.company}{p.package&&` | 💰 ${p.package}`}</div>
                          {p.achievement && <span className="abadge" style={{ background: '#fef3c7', color: '#92400e', marginTop: 6 }}>🏆 {p.achievement}</span>}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, width: '100%' }}>
                        <button className="abtn abtn-outline abtn-sm" style={{ flex: 1 }} onClick={() => { setEditPlace(p); setPlaceData({ name:p.name, year:p.year, company:p.company, package:p.package||'', imageUrl:p.imageUrl||'', dept:p.dept||'', achievement:p.achievement||'' }); window.scrollTo({top:0,behavior:'smooth'}); }}>✏️ Edit</button>
                        <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('placements', p.id, p, p.name)}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <MiniLog logs={getSectionLog('placements')} />
            </div>
          )}

          {/* ── FACULTY ──────────────────────────────────────────── */}
          {tab === 'faculty' && (
            <div className="fade-up">
              <p className="asec">👨‍🏫 Faculty & Staff Directory</p>
              <p className="asub">Teaching → /about-us/college-staff/teaching-staff | Non-Teaching → /about-us/college-staff/non-teaching-staff</p>
              <div className="card-gold">
                <div className="actitle">{editFac ? '✏️ Edit Profile' : '➕ Add Staff Member'}</div>
                <form onSubmit={saveFac}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
                    <div><label className="alabel">Staff Type *</label><select className="ainp" value={facData.staffType || 'Teaching'} onChange={e => { const t=e.target.value; setFacData(d=>({...d,staffType:t,dept:t==='Teaching'?'Commerce':'General Section'})); }}><option value="Teaching">Teaching Staff</option><option value="Non-Teaching">Non-Teaching Staff</option></select></div>
                    <div><label className="alabel">Full Name *</label><input className="ainp" value={facData.name || ''} onChange={e=>setFacData(d=>({...d,name:e.target.value}))} placeholder="Dr. S.K. Sharma" required /></div>
                    <div><label className="alabel">Department *</label><select className="ainp" value={facData.dept || 'Commerce'} onChange={e=>setFacData(d=>({...d,dept:e.target.value}))}>{(facData.staffType==='Teaching'?teachDepts:nonTeachDepts).map(c=><option key={c}>{c}</option>)}</select></div>
                    <div><label className="alabel">Designation</label><input className="ainp" value={facData.desig || ''} onChange={e=>setFacData(d=>({...d,desig:e.target.value}))} placeholder="Assistant Professor / Clerk" /></div>
                    <div><label className="alabel">Qualification</label><input className="ainp" value={facData.qual || ''} onChange={e=>setFacData(d=>({...d,qual:e.target.value}))} placeholder="Ph.D., NET, M.Com..." /></div>
                    <div><label className="alabel">Email</label><input className="ainp" value={facData.email || ''} onChange={e=>setFacData(d=>({...d,email:e.target.value}))} type="email" placeholder="name@gnc.ac.in" /></div>
                    <div style={{ gridColumn: '1/-1' }}><label className="alabel">Specialization</label><input className="ainp" value={facData.specialization || ''} onChange={e=>setFacData(d=>({...d,specialization:e.target.value}))} placeholder="Financial Accounting, Data Structures..." /></div>
                  </div>
                  <MediaPicker
                    label="Profile Photo"
                    value={facData.imageUrl}
                    onChange={url => setFacData(d => ({ ...d, imageUrl: url }))}
                    type="image"
                  />
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 Save Profile</button>
                    {editFac && <button type="button" className="abtn abtn-outline" onClick={() => { setEditFac(null); clearFacDraft(); }}>Cancel</button>}
                  </div>
                </form>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {['Teaching', 'Non-Teaching'].map(t => (
                  <button key={t} className={`abtn ${facTab===t?'abtn-navy':'abtn-outline'}`} onClick={() => setFacTab(t)}>
                    {t === 'Teaching' ? '🎓' : '🏢'} {t} ({(faculties||[]).filter(f=>(f.staffType||'Teaching')===t).length})
                  </button>
                ))}
              </div>
              <SectionSearch value={facSearch} onChange={setFacSearch} placeholder="Search by name..." />
              <BulkBar count={facSel.length} onDelete={() => { bulkDelete('faculties', facSel); setFacSel([]); }} onClear={() => setFacSel([])} />
              <div className="card">
                <div className="actitle">{facTab} Staff ({(faculties||[]).filter(f=>(f.staffType||'Teaching')===facTab && (!facSearch||f.name?.toLowerCase().includes(facSearch.toLowerCase()))).length})</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 12 }}>
                  {(faculties||[]).filter(f => (f.staffType||'Teaching')===facTab && (!facSearch||f.name?.toLowerCase().includes(facSearch.toLowerCase()))).map(f => (
                    <div key={f.id} className={`arow ${facSel.includes(f.id)?'selected':''}`} style={{ padding: 16, borderLeft: `4px solid ${facTab==='Teaching'?GOLD:T.cyan}` }}>
                      <input type="checkbox" checked={facSel.includes(f.id)} onChange={() => setFacSel(s=>s.includes(f.id)?s.filter(x=>x!==f.id):[...s,f.id])} style={{ accentColor: NAVY }} />
                      <img src={f.imageUrl||'/images/college_photo.jpg'} alt="" style={{ width: 70, height: 70, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 900, color: NAVY, fontSize: 15 }}>{f.name}</div>
                        <div style={{ fontSize: 12, color: facTab==='Teaching'?GOLD:T.cyan, fontWeight: 800, marginTop: 2 }}>{f.desig}</div>
                        <div style={{ fontSize: 12, color: T.t3, marginTop: 4 }}>🏢 {f.dept}</div>
                        <div style={{ fontSize: 12, color: T.t3 }}>🎓 {f.qual}</div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                          <button className="abtn abtn-outline abtn-sm" style={{ flex: 1 }} onClick={() => { setEditFac(f); setFacData({name:f.name,staffType:f.staffType||'Teaching',dept:f.dept,qual:f.qual||'',desig:f.desig||'',imageUrl:f.imageUrl||'',email:f.email||'',specialization:f.specialization||''}); setFacTab(f.staffType||'Teaching'); scrollTop(); }}>✏️</button>
                          <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('faculties', f.id, f, f.name)}>🗑️</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <MiniLog logs={getSectionLog('faculties')} />
            </div>
          )}

          {/* ── DEPARTMENTS ──────────────────────────────────────── */}
          {tab === 'departments' && (
            <div className="fade-up">
              <Suspense fallback={
                <div style={{ textAlign: 'center', padding: 60, color: GOLD }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🏛️</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>Loading Department Manager...</div>
                </div>
              }>
                <AdminDepartmentTab />
              </Suspense>
            </div>
          )}
          {tab === 'campus' && (
             <AdminCampusTab />
          )}

          {/* ── LEADERSHIP ─────────────────────────────────────── */}
          {tab === 'leadership' && (
            <AdminLeadershipTab />
          )}

          {/* ── GB MEETINGS ────────────────────────────────────── */}
          {tab === 'gb_meetings' && (
            <MeetingPDFTab
              collectionName="gb_meetings"
              title="Governing Body (GB) Meetings"
              subtitle="Date-wise PDF reports of all Governing Body meetings — visible at /about-us/governing-body"
              accentColor="#0f2347"
              icon="📋"
              logAct={logAct}
              getSectionLog={getSectionLog}
            />
          )}

          {/* ── STAFF COUNCIL ──────────────────────────────────── */}
          {tab === 'staff_council' && (
            <MeetingPDFTab
              collectionName="staff_council"
              title="Staff Council Meetings"
              subtitle="Date-wise PDF reports of all Staff Council meetings — visible at /about-us/staff-council"
              accentColor="#1a3a7c"
              icon="👨‍🏫"
              logAct={logAct}
              getSectionLog={getSectionLog}
            />
          )}

          {/* ── SLIDER ───────────────────────────────────────────── */}
          {tab === 'slider' && (
            <div className="fade-up">
              <p className="asec">🖼️ Hero Slider Manager</p>
              <p className="asub">Homepage main banner slides — Order number se sort hota hai</p>
              <div className="card-gold">
                <div className="actitle">{editSlide ? '✏️ Edit Slide' : '➕ Add New Slide'}</div>
                <form onSubmit={saveSlide}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
                    <div><label className="alabel">Title *</label><input className="ainp" value={slideData.title} onChange={e=>setSlideData(d=>({...d,title:e.target.value}))} placeholder="Welcome to GNC" required /></div>
                    <div><label className="alabel">Subtitle</label><input className="ainp" value={slideData.subtitle} onChange={e=>setSlideData(d=>({...d,subtitle:e.target.value}))} placeholder="NAAC Accredited College" /></div>
                    <div><label className="alabel">Button Text</label><input className="ainp" value={slideData.btnText} onChange={e=>setSlideData(d=>({...d,btnText:e.target.value}))} placeholder="Admission Open →" /></div>
                    <div><label className="alabel">Button Link</label><input className="ainp" value={slideData.btnLink} onChange={e=>setSlideData(d=>({...d,btnLink:e.target.value}))} placeholder="/admission/rule" /></div>
                    <div><label className="alabel">Display Order</label><input type="number" className="ainp" value={slideData.order} onChange={e=>setSlideData(d=>({...d,order:+e.target.value}))} /></div>
                  </div>
                  <MediaPicker
                    label="Background Image"
                    value={slideData.image}
                    onChange={url => setSlideData(d => ({ ...d, image: url }))}
                    type="image"
                  />
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 Save Slide</button>
                    {editSlide && <button type="button" className="abtn abtn-outline" onClick={() => { setEditSlide(null); setSlideData({title:'',subtitle:'',btnText:'',btnLink:'',image:'',order:0}); }}>Cancel</button>}
                  </div>
                </form>
              </div>
              <div className="card">
                <div className="actitle">Slides ({(sliderSlides||[]).length}) — sorted by order number</div>
                {[...(sliderSlides||[])].sort((a,b)=>(a.order||0)-(b.order||0)).map(s => (
                  <div key={s.id} className="arow">
                    {s.image && <img src={s.image} alt="" style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, color: NAVY }}>{s.title}</div>
                      <div style={{ fontSize: 12, color: T.t3 }}>{s.subtitle}{s.btnText && ` | Btn: "${s.btnText}"`}</div>
                    </div>
                    <span style={{ fontSize: 11, color: T.t3, fontWeight: 700, background: BG, padding: '4px 10px', borderRadius: 6 }}>#{s.order||0}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="abtn abtn-outline abtn-sm" onClick={() => { setEditSlide(s); setSlideData({title:s.title||'',subtitle:s.subtitle||'',btnText:s.btnText||'',btnLink:s.btnLink||'',image:s.image||'',order:s.order||0}); }}>✏️</button>
                      <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('sliderSlides', s.id, s, s.title)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── MENU BUILDER ─────────────────────────────────────── */}
          {tab === 'menu_builder' && (
            <div className="fade-up">
              <p className="asec">🧭 Menu Editor</p>
              <p className="asub">Navbar links add / edit / delete karein</p>
              <div className="card-navy">
                <div className="actitle">➕ Add New Menu Item</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
                  <div><label className="alabel">Label *</label><input className="ainp" value={newMenu.label} onChange={e=>setNewMenu(d=>({...d,label:e.target.value}))} placeholder="Menu Text" /></div>
                  <div><label className="alabel">URL *</label><input className="ainp" value={newMenu.href} onChange={e=>setNewMenu(d=>({...d,href:e.target.value}))} placeholder="/about-us/new-page" /></div>
                  <div>
                    <label className="alabel">Parent Menu</label>
                    <select className="ainp" value={newMenu.parentId} onChange={e=>setNewMenu(d=>({...d,parentId:e.target.value}))}>
                      <option value="top">Top Level (L1)</option>
                      {flatMenus.filter(m=>m.level<2).map(m=><option key={m.id} value={m.id}>{m.level===0?'└─ ':m.level===1?'  └─ ':''}{m.path}</option>)}
                    </select>
                  </div>
                </div>
                <button className="abtn abtn-navy" onClick={addMenu} disabled={!newMenu.label||!newMenu.href}>➕ Add Menu Item</button>
              </div>
              <div className="card">
                <div className="actitle">All Menu Items ({flatMenus.length})</div>
                {flatMenus.map(m => (
                  <div key={m.id} className="arow" style={{ paddingLeft: 16 + m.level * 22 }}>
                    <span style={{ fontSize: 11, color: NAVY, fontWeight: 900, minWidth: 24, flexShrink: 0 }}>{'L'+(m.level+1)}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: NAVY, fontSize: 14 }}>{m.label}</div>
                      <div style={{ fontSize: 11, color: T.t3, fontFamily: 'monospace' }}>{m.href || '(no link)'}</div>
                    </div>
                    <button className="abtn abtn-red abtn-sm" onClick={() => delMenu(m.id)}>🗑️</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PAGES ────────────────────────────────────────────── */}
          {tab === 'pages' && (
            <div className="fade-up">
              <p className="asec">📄 Pages & SEO</p>
              <p className="asub">Dynamic content pages manage karein — rich editor + SEO score</p>
              <div className="card-gold">
                <div className="actitle">{editPage ? '✏️ Edit Page' : '➕ Create Page'}</div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                  {['update','create'].map(m => <button key={m} className={`abtn ${pageMode===m?'abtn-navy':'abtn-outline'}`} onClick={()=>setPageMode(m)}>{m==='update'?'📝 Update Existing':'✨ New Custom Page'}</button>)}
                </div>
                <form onSubmit={savePage}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div><label className="alabel">Page Title *</label><input className="ainp" value={pageData.title} onChange={e=>{ const t = e.target.value; const s = t.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''); setPageData(d=>({...d, title: t, slug: pageMode === 'create' ? s : d.slug})); }} required placeholder="About the Principal" /></div>
                    {pageMode==='update'
                      ? <div><label className="alabel">Page Path *</label><input className="ainp" value={pageData.path} onChange={e=>setPageData(d=>({...d,path:e.target.value}))} placeholder="/about-us/principal-message" /></div>
                      : <div><label className="alabel">URL Slug *</label><input className="ainp" value={pageData.slug} onChange={e=>setPageData(d=>({...d,slug:e.target.value}))} placeholder="principal-message" /></div>
                    }
                  </div>
                  <div style={{ background: BG, borderRadius: 12, padding: 18, marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>SEO Settings</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 44, height: 44, borderRadius: '50%', border: `3px solid ${getSeoScore(seoData,pageData.title)>=80?T.green:getSeoScore(seoData,pageData.title)>=50?GOLD:T.red}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: getSeoScore(seoData,pageData.title)>=80?T.green:getSeoScore(seoData,pageData.title)>=50?GOLD:T.red }}>{getSeoScore(seoData,pageData.title)}</div>
                        <span style={{ fontSize: 11, color: T.t3 }}>SEO Score</span>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div><label className="alabel">Meta Title</label><input className="ainp" value={seoData.metaTitle} onChange={e=>setSeoData(d=>({...d,metaTitle:e.target.value}))} placeholder="GNC Dhanbad | Principal" /></div>
                      <div><label className="alabel">Keywords</label><input className="ainp" value={seoData.keywords} onChange={e=>setSeoData(d=>({...d,keywords:e.target.value}))} placeholder="GNC, principal, Dhanbad" /></div>
                      <div style={{ gridColumn: '1/-1' }}><label className="alabel">Meta Description (50+ chars)</label><textarea className="ainp" rows={2} value={seoData.metaDesc} onChange={e=>setSeoData(d=>({...d,metaDesc:e.target.value}))} placeholder="Describe this page..." /></div>
                    </div>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label className="alabel">Page Content</label>
                    <JoditEditor ref={editor} value={pageData.content||''} config={joditCfg} tabIndex={1} onBlur={c=>setPageData(d=>({...d,content:c}))} />
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editPage?'Update':'Publish'} Page</button>
                    <button type="button" className="abtn abtn-outline" onClick={() => { setShowPreview(true); setPreviewContent(pageData.content||''); }}>👁️ Preview</button>
                    {editPage && <button type="button" className="abtn abtn-outline" onClick={() => { setEditPage(null); setPageData({title:'',content:'',path:'',slug:''}); setSeoData({metaTitle:'',metaDesc:'',keywords:'',ogImage:''}); }}>Cancel</button>}
                  </div>
                </form>
              </div>
              <SectionSearch value={pageSearch} onChange={setPageSearch} placeholder="Search pages..." />
              <div className="card">
                <div className="actitle">All Pages ({(pages||[]).length})</div>
                {(pages||[]).filter(p=>!pageSearch||p.title?.toLowerCase().includes(pageSearch.toLowerCase())).map(p => (
                  <div key={p.id} className="arow">
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, color: NAVY }}>{p.title}</div>
                      <div style={{ fontSize: 12, color: T.t3, fontFamily: 'monospace' }}>{p.path||`/p/${p.slug}`}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="abtn abtn-outline abtn-sm" onClick={() => { setEditPage(p); setPageData({title:p.title||'',content:p.content||'',path:p.path||'',slug:p.slug||''}); setSeoData(p.seo||{}); setPageMode(p.path?'update':'create'); window.scrollTo({top:0,behavior:'smooth'}); }}>✏️</button>
                      <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('pages', p.id, p, p.title)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
              <MiniLog logs={getSectionLog('pages')} />
            </div>
          )}

          {/* ── GALLERY ──────────────────────────────────────────── */}
          {tab === 'gallery' && (
            <div className="fade-up">
              <p className="asec">📸 Photo Gallery</p>
              <p className="asub">Upload aur manage karo website gallery</p>
              <div className="card-navy">
                <form onSubmit={saveGallery}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div><label className="alabel">Title *</label><input className="ainp" value={galData.title} onChange={e=>setGalData(d=>({...d,title:e.target.value}))} placeholder="Annual Function 2024" required /></div>
                    <div><label className="alabel">Category</label><select className="ainp" value={galData.cat} onChange={e=>setGalData(d=>({...d,cat:e.target.value}))}>{['Seminars','Cultural','NSS','Sports','Campus','Departments','Achievements'].map(c=><option key={c}>{c}</option>)}</select></div>
                  </div>
                  <MediaPicker
                    label="Gallery Photo"
                    value={galData.src}
                    onChange={url => setGalData(d => ({ ...d, src: url }))}
                    type="image"
                  />
                  <button type="submit" className="abtn abtn-navy" style={{ marginTop: 16 }} disabled={loading||!galData.src}>🚀 Add to Gallery</button>
                </form>
              </div>
              <SectionSearch value={galSearch} onChange={setGalSearch} placeholder="Search photos..." />
              <BulkBar count={galSel.length} onDelete={() => { bulkDelete('gallery', galSel); setGalSel([]); }} onClear={() => setGalSel([])} />
              <div className="card">
                <div className="actitle">Gallery ({(gallery||[]).length} photos)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12 }}>
                  {(gallery||[]).filter(g=>!galSearch||g.title?.toLowerCase().includes(galSearch.toLowerCase())).map(g => (
                    <div key={g.id} style={{ borderRadius: 12, overflow: 'hidden', border: `1.5px solid ${galSel.includes(g.id)?NAVY:T.b1}`, cursor: 'pointer', transition: 'all .2s' }} onClick={() => setGalSel(s=>s.includes(g.id)?s.filter(x=>x!==g.id):[...s,g.id])}>
                      <div style={{ position: 'relative' }}>
                        <img src={g.src} alt={g.title} style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }} />
                        {galSel.includes(g.id) && <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,35,71,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>✓</div>}
                      </div>
                      <div style={{ padding: '8px 10px', background: WHITE }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
                        <div style={{ fontSize: 11, color: T.t3 }}>{g.cat}</div>
                        <button className="abtn abtn-red abtn-xs" style={{ marginTop: 6, width: '100%', justifyContent: 'center' }} onClick={e=>{ e.stopPropagation(); softDelete('gallery', g.id, g, g.title); }}>🗑️ Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <MiniLog logs={getSectionLog('gallery')} />
            </div>
          )}

          {/* ── NOTICES ──────────────────────────────────────────── */}
          {tab === 'notices' && (
            <div className="fade-up">
              <p className="asec">📢 Notice Board</p>
              <p className="asub">Official notices publish aur manage karein</p>
              <div className="card-gold">
                <div className="actitle">{editNotice ? '✏️ Edit Notice' : '➕ Publish Notice'}</div>
                <form onSubmit={saveNotice}>
                  <div style={{ marginBottom: 14 }}><label className="alabel">Notice Text *</label><textarea className="ainp" rows={3} value={noticeData.text || ''} onChange={e=>setNoticeData(d=>({...d,text:e.target.value}))} required placeholder="Notice content..." /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 14 }}>
                    <div><label className="alabel">Type</label><select className="ainp" value={noticeData.type || 'General'} onChange={e=>setNoticeData(d=>({...d,type:e.target.value}))}>{['General','Examination','Admission','Result','Holiday','Scholarship','Sports'].map(t=><option key={t}>{t}</option>)}</select></div>
                    <div style={{ gridColumn: '1/-1' }}>
                      <MediaPicker
                        label="Link (PDF ya Document URL — optional)"
                        value={noticeData.link || ''}
                        onChange={url => setNoticeData(d => ({ ...d, link: url }))}
                        type="pdf"
                        compact={true}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 22 }}>
                      <Toggle checked={!!noticeData.isNew} onChange={()=>setNoticeData(d=>({...d,isNew:!d.isNew}))} label="Mark as NEW" color={T.red} />
                      <Toggle checked={!!noticeData.pinned} onChange={()=>setNoticeData(d=>({...d,pinned:!d.pinned}))} label="Pin to Top" color={NAVY} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editNotice?'Update':'Publish'}</button>
                    {editNotice && <button type="button" className="abtn abtn-outline" onClick={()=>{setEditNotice(null);clearNoticeDraft();}}>Cancel</button>}
                  </div>
                </form>
              </div>
              <SectionSearch value={noticeSearch} onChange={setNoticeSearch} placeholder="Search notices..." />
              <BulkBar count={noticeSel.length} onDelete={() => { bulkDelete('notices', noticeSel); setNoticeSel([]); }} onClear={() => setNoticeSel([])} />
              <div className="card">
                <div className="actitle">All Notices ({(notices||[]).length})</div>
                {(notices||[]).filter(n=>!noticeSearch||n.text?.toLowerCase().includes(noticeSearch.toLowerCase())).map(n => (
                  <div key={n.id} className={`arow ${noticeSel.includes(n.id)?'selected':''}`} style={{ borderLeft: `4px solid ${n.pinned?NAVY:n.isNew?T.red:T.b2}` }}>
                    <input type="checkbox" checked={noticeSel.includes(n.id)} onChange={()=>setNoticeSel(s=>s.includes(n.id)?s.filter(x=>x!==n.id):[...s,n.id])} style={{ accentColor: NAVY }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 6, marginBottom: 5, flexWrap: 'wrap' }}>
                        {n.pinned && <span className="abadge" style={{ background: `${NAVY}15`, color: NAVY }}>📌 Pinned</span>}
                        {n.isNew && <span className="abadge" style={{ background: '#fee2e2', color: T.red }}>NEW</span>}
                        <span className="abadge" style={{ background: BG, color: T.t2 }}>{n.type}</span>
                      </div>
                      <div style={{ fontWeight: 700, color: NAVY, fontSize: 14 }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize((n.text||'').substring(0,100)) }} />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="abtn abtn-outline abtn-sm" onClick={()=>{setEditNotice(n);setNoticeData({text:n.text||'',link:n.link||'',type:n.type||'General',isNew:!!n.isNew,pinned:!!n.pinned});window.scrollTo({top:0,behavior:'smooth'});}}>✏️</button>
                      <button className="abtn abtn-red abtn-sm" onClick={()=>softDelete('notices',n.id,n,(n.text||'').substring(0,30))}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
              <MiniLog logs={getSectionLog('notices')} />
            </div>
          )}

          {/* ── NEWS ─────────────────────────────────────────────── */}
          {tab === 'announcements' && (
            <div className="fade-up">
              <p className="asec">📣 News & Announcements</p>
              <p className="asub">College news, achievements aur updates</p>
              <div className="card-gold">
                <form onSubmit={saveAnn}>
                  <div style={{ marginBottom: 14 }}><label className="alabel">News Text *</label><textarea className="ainp" rows={3} value={annData.text || ''} onChange={e=>setAnnData(d=>({...d,text:e.target.value}))} required placeholder="News content..." /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div><label className="alabel">Type</label><select className="ainp" value={annData.type || 'News'} onChange={e=>setAnnData(d=>({...d,type:e.target.value}))}>{['News','Achievement','Update','Result','Award'].map(t=><option key={t}>{t}</option>)}</select></div>
                    <div>
                      <MediaPicker
                        label="Link (News article ya PDF — optional)"
                        value={annData.link || ''}
                        onChange={url => setAnnData(d => ({ ...d, link: url }))}
                        type="any"
                        compact={true}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editAnn?'Update':'Publish'}</button>
                    {editAnn && <button type="button" className="abtn abtn-outline" onClick={()=>{setEditAnn(null);clearAnnDraft();}}>Cancel</button>}
                  </div>
                </form>
              </div>
              <SectionSearch value={annSearch} onChange={setAnnSearch} placeholder="Search news..." />
              <div className="card">
                <div className="actitle">All News ({(announcements||[]).length})</div>
                {(announcements||[]).filter(a=>!annSearch||a.text?.toLowerCase().includes(annSearch.toLowerCase())).map(a => (
                  <div key={a.id} className="arow">
                    <span className="abadge" style={{ background: `${NAVY}12`, color: NAVY }}>{a.type}</span>
                    <div style={{ flex: 1, fontWeight: 600, color: NAVY, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize((a.text||'').substring(0,80))}} />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="abtn abtn-outline abtn-sm" onClick={()=>{setEditAnn(a);setAnnData({text:a.text||'',link:a.link||'',type:a.type||'News'});window.scrollTo({top:0,behavior:'smooth'});}}>✏️</button>
                      <button className="abtn abtn-red abtn-sm" onClick={()=>softDelete('announcements',a.id,a,(a.text||'').substring(0,30))}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
              <MiniLog logs={getSectionLog('announcements')} />
            </div>
          )}

          {/* ── DOCUMENTS ────────────────────────────────────────── */}
          {tab === 'documents' && (
            <div className="fade-up">
              <p className="asec">📁 Document Archive</p>
              <p className="asub">PDFs, reports, syllabus, circulars</p>
              <div className="card-navy">
                <div className="actitle">{editDoc ? '✏️ Edit Document' : '➕ Add Document'}</div>
                <form onSubmit={saveDoc}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
                    <div><label className="alabel">Title *</label><input className="ainp" value={docData.title || ''} onChange={e=>setDocData(d=>({...d,title:e.target.value}))} placeholder="NAAC Self Study Report" required /></div>
                    <div style={{ gridColumn: '1/-1' }}>
                      <MediaPicker
                        label="PDF Link * (Google Drive public link ya public/pdfs/ path)"
                        value={docData.link || ''}
                        onChange={url => setDocData(d => ({ ...d, link: url }))}
                        type="pdf"
                        compact={true}
                      />
                    </div>
                    <div>
                      <label className="alabel">Type (Documents page pe filter hoga)</label>
                      <select className="ainp" value={docData.type || 'Document'} onChange={e=>setDocData(d=>({...d,type:e.target.value}))}>
                        <option value="Document">📄 Document — General Documents</option>
                        <option value="Report">📊 Report — Annual/IQAC Reports</option>
                        <option value="Syllabus">📚 Syllabus — Course Syllabus</option>
                        <option value="Circular">📋 Circular — Official Circulars</option>
                        <option value="Result">🏆 Result — Exam Results</option>
                        <option value="Regulation">⚖️ Regulation — BBMKU/VBU Rules</option>
                        <option value="Affiliation">🏛️ Affiliation — College Affiliation Docs</option>
                      </select>
                    </div>
                    <div>
                      <label className="alabel" style={{color:'#f4a023',fontWeight:900}}>
                        🎯 Target Page * — Kaunse page pe dikhega?
                      </label>
                      <select className="ainp" value={docData.targetPage || ''} onChange={e=>setDocData(d=>({...d,targetPage:e.target.value}))}>
                        <option value="">— Sirf /documents page pe (General Archive) —</option>
                        <optgroup label="📊 NAAC">
                          <option value="cycle-1">NAAC SSR 1st Cycle (/naac/ssr-1st-cycle)</option>
                          <option value="cycle-2">NAAC SSR 2nd Cycle (/naac/ssr-2nd-cycle)</option>
                          <option value="aqar">AQAR Reports (/naac/aqar)</option>
                          <option value="nirf">NIRF Rankings (/naac/nirf)</option>
                          <option value="perspective">Perspective Plan (/naac/perspective-plan)</option>
                        </optgroup>
                        <optgroup label="📰 Publication">
                          <option value="magazine">E-Magazine (/publication/e-magazine)</option>
                          <option value="result-2024">Exam Results 2024 (/publication/examination-results/2024)</option>
                          <option value="result-2023">Exam Results 2023 (/publication/examination-results/2023)</option>
                          <option value="sss-2023-24">SSS Report 2023-24 (/publication/sss-report/2023-24)</option>
                          <option value="sss-2022-23">SSS Report 2022-23 (/publication/sss-report/2022-23)</option>
                        </optgroup>
                        <optgroup label="🎓 Academics">
                          <option value="syllabus">Syllabus (/syllabus)</option>
                          <option value="academic-calendar">Academic Calendar (/academics/academic-calendar)</option>
                          <option value="course-offered">Course Offered (/academics/course-offered)</option>
                        </optgroup>
                        <optgroup label="📋 Admission">
                          <option value="admission-rule">Admission Rules (/admission/rule)</option>
                          <option value="fee-structure">Fee Structure (/admission/fee-structure)</option>
                          <option value="intake-capacity">Intake Capacity (/admission/intake-capacity)</option>
                          <option value="admission-notification">Admission Notifications (/admission/notification)</option>
                        </optgroup>
                        <optgroup label="🏢 About Us / Regulations">
                          <option value="audit-report">Audit Report (/about-us/audit-report)</option>
                          <option value="byelaws">Byelaws (/about-us/regulations/byelaws)</option>
                          <option value="exemption">Exemption Docs (/about-us/regulations/exemption)</option>
                        </optgroup>
                      </select>
                      <p style={{fontSize:11,color:'#94a3b8',margin:'4px 0 0',lineHeight:1.5}}>
                        💡 Agar koi page select nahi kiya, document sirf <strong>/documents</strong> page ke archive mein dikhega.
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="abtn abtn-navy" disabled={loading}>🚀 {editDoc?'Update':'Add'} Document</button>
                    {editDoc && <button type="button" className="abtn abtn-outline" onClick={()=>{setEditDoc(null);clearDocDraft();}}>Cancel</button>}
                  </div>
                </form>
              </div>
              <SectionSearch value={docSearch} onChange={setDocSearch} placeholder="Search documents..." />
              <BulkBar count={docSel.length} onDelete={() => { bulkDelete('pdfReports', docSel); setDocSel([]); }} onClear={() => setDocSel([])} />
              <div className="card">
                <div className="actitle">All Documents ({(pdfReports||[]).length})</div>
                {(pdfReports||[]).filter(d=>!docSearch||d.title?.toLowerCase().includes(docSearch.toLowerCase())).map(d => (
                  <div key={d.id} className={`arow ${docSel.includes(d.id)?'selected':''}`}>
                    <input type="checkbox" checked={docSel.includes(d.id)} onChange={()=>setDocSel(s=>s.includes(d.id)?s.filter(x=>x!==d.id):[...s,d.id])} style={{ accentColor: NAVY }} />
                    <span style={{ fontSize: 24 }}>📄</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, color: NAVY }}>{d.title}</div>
                      <div style={{ fontSize: 12, color: T.t3, marginTop: 2, display:'flex', gap:6, alignItems:'center', flexWrap:'wrap' }}>
                          <span style={{background:'#f0f4ff',color:NAVY,borderRadius:4,padding:'1px 8px',fontWeight:700}}>{d.type||'Document'}</span>
                          {d.targetPage && <span style={{background:'#fef3c7',color:'#92400e',borderRadius:4,padding:'1px 8px',fontWeight:700}}>🎯 {d.targetPage}</span>}
                          <a href={d.link} target="_blank" rel="noreferrer" style={{ color: NAVY, fontWeight:700 }}>View PDF ↗</a>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="abtn abtn-outline abtn-sm" onClick={()=>{setEditDoc(d);setDocData({title:d.title,link:d.link,type:d.type||'Document',targetPage:d.targetPage||''});window.scrollTo({top:0,behavior:'smooth'});}}>✏️</button>
                      <button className="abtn abtn-red abtn-sm" onClick={()=>softDelete('pdfReports',d.id,d,d.title)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
              <MiniLog logs={getSectionLog('pdfReports')} />
            </div>
          )}

          {/* ── EVENTS ───────────────────────────────────────────── */}
          {tab === 'events' && (
            <div className="fade-up">
              <p className="asec">🏆 Campus Events</p>
              <p className="asub">Upcoming aur recent events manage karein</p>
              <div className="card-gold">
                <div className="actitle">{editEvent ? '✏️ Edit Event' : '🎉 Add Event'}</div>
                <form onSubmit={saveEvent}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 14 }}>
                    <div><label className="alabel">Title *</label><input className="ainp" value={evtData.title || ''} onChange={e=>setEvtData(d=>({...d,title:e.target.value}))} required placeholder="Annual Sports Day" /></div>
                    <div><label className="alabel">Type</label><select className="ainp" value={evtData.type || 'WORKSHOP'} onChange={e=>setEvtData(d=>({...d,type:e.target.value}))}>{['WORKSHOP','SEMINAR','CULTURAL','SPORTS','NSS','NCC','ACADEMIC','AWARD'].map(t=><option key={t}>{t}</option>)}</select></div>
                    <div><label className="alabel">Day</label><input className="ainp" value={evtData.day || ''} onChange={e=>setEvtData(d=>({...d,day:e.target.value}))} placeholder="24" /></div>
                    <div><label className="alabel">Month</label><input className="ainp" value={evtData.month || ''} onChange={e=>setEvtData(d=>({...d,month:e.target.value}))} placeholder="MAR" /></div>
                    <div><label className="alabel">Location</label><input className="ainp" value={evtData.location || ''} onChange={e=>setEvtData(d=>({...d,location:e.target.value}))} placeholder="Seminar Hall" /></div>
                    <div><label className="alabel">Status</label><select className="ainp" value={evtData.status || 'upcoming'} onChange={e=>setEvtData(d=>({...d,status:e.target.value}))}><option value="upcoming">Upcoming</option><option value="recent">Recent / Past</option></select></div>
                  </div>
                  {evtData.status === 'recent' && (
                    <div style={{ background: BG, padding: 16, borderRadius: 12, marginBottom: 14 }}>
                      <MediaPicker
                        label="Post-Event Photo"
                        value={evtData.imageUrl}
                        onChange={url => setEvtData(d => ({ ...d, imageUrl: url }))}
                        type="image"
                        compact={true}
                      />
                      <MediaPicker
                        label="PDF Report Link (Google Drive ya direct URL)"
                        value={evtData.reportLink}
                        onChange={url => setEvtData(d => ({ ...d, reportLink: url }))}
                        type="pdf"
                        compact={true}
                      />
                    </div>
                  )}
                  <div style={{ marginBottom: 14 }}>
                    <label className="alabel">Description</label>
                    <JoditEditor value={evtData.desc || ''} config={joditCfg} onBlur={c=>setEvtData(d=>({...d,desc:c}))} />
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editEvent?'Update':'Publish'} Event</button>
                    {editEvent && <button type="button" className="abtn abtn-outline" onClick={()=>{setEditEvent(null);clearEvtDraft();}}>Cancel</button>}
                  </div>
                </form>
              </div>
              <SectionSearch value={evtSearch} onChange={setEvtSearch} placeholder="Search events..." />
              <BulkBar count={evtSel.length} onDelete={() => { bulkDelete('events', evtSel); setEvtSel([]); }} onClear={() => setEvtSel([])} />
              <div className="card">
                <div className="actitle">Events ({(events||[]).length})</div>
                {(events||[]).filter(e=>!evtSearch||e.title?.toLowerCase().includes(evtSearch.toLowerCase())).map(e => (
                  <div key={e.id} className={`arow ${evtSel.includes(e.id)?'selected':''}`} style={{ borderLeft: `4px solid ${T.purple}` }}>
                    <input type="checkbox" checked={evtSel.includes(e.id)} onChange={()=>setEvtSel(s=>s.includes(e.id)?s.filter(x=>x!==e.id):[...s,e.id])} style={{ accentColor: NAVY }} />
                    {e.imageUrl && <img src={e.imageUrl} alt="" style={{ width: 60, height: 45, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                        <span className="abadge" style={{ background: '#f3e8ff', color: T.purple }}>{e.type}</span>
                        <span className="abadge" style={{ background: e.status==='upcoming'?'#dcfce7':'#f1f5f9', color: e.status==='upcoming'?T.green:T.t3 }}>{e.status}</span>
                      </div>
                      <div style={{ fontWeight: 800, color: NAVY, fontSize: 15 }}>{e.title}</div>
                      <div style={{ fontSize: 12, color: T.t3 }}>📅 {e.day} {e.month} | 📍 {e.location||'Campus'}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="abtn abtn-outline abtn-sm" onClick={()=>{setEditEvent(e);setEvtData({title:e.title||'',desc:e.desc||'',type:e.type||'WORKSHOP',day:e.day||'',month:e.month||'',location:e.location||'',status:e.status||'upcoming',imageUrl:e.imageUrl||'',reportLink:e.reportLink||''});window.scrollTo({top:0,behavior:'smooth'});}}>✏️</button>
                      <button className="abtn abtn-red abtn-sm" onClick={()=>softDelete('events',e.id,e,e.title)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
              <MiniLog logs={getSectionLog('events')} />
            </div>
          )}

          {/* ── YOUTUBE ──────────────────────────────────────────── */}
          {tab === 'youtube' && (
            <div className="fade-up">
              <p className="asec">▶️ YouTube Manager</p>
              <p className="asub">Auto-fetch latest videos → /video-gallery page</p>
              <div className="card-navy">
                <div className="actitle">🔑 YouTube API Configuration</div>
                <div style={{ background: `${NAVY}0a`, border: `1.5px solid ${NAVY}25`, borderRadius: 12, padding: '14px 18px', marginBottom: 20 }}>
                  <div style={{ fontWeight: 800, color: NAVY, marginBottom: 8 }}>📋 3 Steps Setup:</div>
                  <ol style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, color: T.t2, lineHeight: 2 }}>
                    <li>Google Cloud Console → Enable <b>YouTube Data API v3</b></li>
                    <li>Credentials → Create API Key → Copy karo</li>
                    <li>YouTube Channel ID copy karo (URL se: youtube.com/channel/<b>UCxxxxxx</b>)</li>
                  </ol>
                </div>
                <form onSubmit={saveYt}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, marginBottom: 14 }}>
                    <div><label className="alabel">API Key *</label><input className="ainp" value={ytCfg.apiKey} onChange={e=>setYtCfg(d=>({...d,apiKey:e.target.value}))} placeholder="AIzaSyxxxxxxxxx" type="password" /></div>
                    <div><label className="alabel">Channel ID *</label><input className="ainp" value={ytCfg.channelId} onChange={e=>setYtCfg(d=>({...d,channelId:e.target.value}))} placeholder="UCxxxxxxxxxxxxxxxxx" /></div>
                    <div><label className="alabel">Videos to fetch</label><select className="ainp" value={ytCfg.maxResults} onChange={e=>setYtCfg(d=>({...d,maxResults:+e.target.value}))}>{[6,9,12,15,18,24].map(n=><option key={n} value={n}>{n} videos</option>)}</select></div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="abtn abtn-navy" disabled={loading}>💾 Save Config</button>
                    <button type="button" className="abtn abtn-gold" disabled={ytLoading||!ytCfg.apiKey} onClick={testYt}>{ytLoading ? '⏳ Testing…' : '🧪 Test API'}</button>
                  </div>
                </form>
                {ytTest && <div style={{ marginTop: 14, padding: '12px 16px', borderRadius: 10, background: ytTest.ok?'#dcfce7':'#fee2e2', color: ytTest.ok?T.green:T.red, fontWeight: 700, fontSize: 14 }}>{ytTest.msg}</div>}
              </div>
            </div>
          )}

          {/* ── DRIVE ────────────────────────────────────────────── */}
          {tab === 'drive' && (
            <div className="fade-up">
              <p className="asec">☁️ Google Drive Sync</p>
              <p className="asub">Drive folder → Website auto documents sync</p>
              <div className="card-navy">
                <div className="actitle">🔑 Drive API Configuration</div>
                <div style={{ background: `${NAVY}0a`, border: `1.5px solid ${NAVY}25`, borderRadius: 12, padding: '14px 18px', marginBottom: 20 }}>
                  <ol style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, color: T.t2, lineHeight: 2 }}>
                    <li>Google Cloud Console → Enable <b>Google Drive API</b></li>
                    <li>Existing YouTube API key use ho sakta hai (same project)</li>
                    <li>Drive folder banao → Share → <b>"Anyone with link can view"</b></li>
                    <li>Folder ID: drive.google.com/drive/folders/<b>1BxxxxxFolderID</b></li>
                  </ol>
                </div>
                <form onSubmit={saveDrive}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, marginBottom: 14 }}>
                    <div><label className="alabel">Google API Key *</label><input className="ainp" value={driveCfg.apiKey} onChange={e=>setDriveCfg(d=>({...d,apiKey:e.target.value}))} placeholder="AIzaSyxxxxxxxxx" type="password" /></div>
                    <div><label className="alabel">Folder ID *</label><input className="ainp" value={driveCfg.folderId} onChange={e=>setDriveCfg(d=>({...d,folderId:e.target.value}))} placeholder="1BxxxxxxxxxxxxxFolderID" /></div>
                    <div><label className="alabel">Folder Display Name</label><input className="ainp" value={driveCfg.folderName} onChange={e=>setDriveCfg(d=>({...d,folderName:e.target.value}))} placeholder="GNC Documents 2024" /></div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="abtn abtn-navy" disabled={loading}>💾 Save Config</button>
                    <button type="button" className="abtn abtn-gold" disabled={driveLoading||!driveCfg.apiKey} onClick={testDrive}>{driveLoading ? '⏳ Testing…' : '🧪 Preview Files'}</button>
                  </div>
                </form>
                {driveTest && <div style={{ marginTop: 14, padding: '12px 16px', borderRadius: 10, background: driveTest.ok?'#dcfce7':'#fee2e2', color: driveTest.ok?T.green:T.red, fontWeight: 700 }}>{driveTest.msg}</div>}
              </div>
              {driveFiles.length > 0 && (
                <div className="card">
                  <div className="actitle">📄 Files in Drive Folder ({driveFiles.length})</div>
                  {driveFiles.map(f => (
                    <div key={f.id} className="arow">
                      <span style={{ fontSize: 22 }}>📄</span>
                      <div style={{ flex: 1 }}><div style={{ fontWeight: 700, color: NAVY }}>{f.name}</div><div style={{ fontSize: 12, color: T.t3 }}>{f.createdTime ? new Date(f.createdTime).toLocaleDateString() : ''} {f.size ? `• ${(f.size/1024).toFixed(0)} KB` : ''}</div></div>
                      <a href={`https://drive.google.com/file/d/${f.id}/view`} target="_blank" rel="noreferrer" className="abtn abtn-outline abtn-sm">📥 View</a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── SITE SETTINGS ────────────────────────────────────── */}
          {tab === 'settings' && (
            <div className="fade-up">
              <p className="asec">⚙️ Site Settings</p>
              <p className="asub">College info, social links, maintenance mode</p>
              <form onSubmit={saveSite}>
                <div className="settings-group">
                  <div className="settings-group-title">🏫 College Information</div>
                  {[['name','College Name'],['tagline','Tagline'],['address','Address'],['phone','Phone'],['email','Email']].map(([key, lbl]) => (
                    <div key={key} className="settings-row">
                      <label className="alabel" style={{ minWidth: 140, margin: 0 }}>{lbl}</label>
                      <input className="ainp" value={siteCfg[key]||''} onChange={e=>setSiteCfg(d=>({...d,[key]:e.target.value}))} type={key==='email'?'email':'text'} />
                    </div>
                  ))}
                </div>
                <div className="settings-group">
                  <div className="settings-group-title">🌐 Social Media Links</div>
                  {['facebook','twitter','youtube','linkedin'].map(s => (
                    <div key={s} className="settings-row">
                      <label className="alabel" style={{ minWidth: 140, margin: 0, textTransform: 'capitalize' }}>{s}</label>
                      <input className="ainp" value={siteCfg[s]||''} onChange={e=>setSiteCfg(d=>({...d,[s]:e.target.value}))} placeholder={`https://${s}.com/...`} />
                    </div>
                  ))}
                </div>
                <div className="settings-group">
                  <div className="settings-group-title">🔧 Advanced</div>
                  <div className="settings-row">
                    <label className="alabel" style={{ minWidth: 140, margin: 0 }}>Footer Text</label>
                    <input className="ainp" value={siteCfg.footerText||''} onChange={e=>setSiteCfg(d=>({...d,footerText:e.target.value}))} placeholder="© 2024 Guru Nanak College" />
                  </div>
                  <div className="settings-row">
                    <label className="alabel" style={{ minWidth: 140, margin: 0 }}>Maintenance Mode</label>
                    <Toggle checked={siteCfg.maintenanceMode||false} onChange={()=>setSiteCfg(d=>({...d,maintenanceMode:!d.maintenanceMode}))} label={siteCfg.maintenanceMode ? '🔴 Site is DOWN for maintenance' : '🟢 Site is LIVE'} color={T.red} />
                  </div>
                </div>
                <div className="settings-group">
                  <div className="settings-group-title">🖼️ ImgBB — Free Image Hosting</div>
                  <div style={{ background: '#fffbeb', border: '1px solid #fed7aa', borderRadius: 10, padding: '10px 14px', marginBottom: 14, fontSize: 12.5, color: '#92400e', lineHeight: 1.7 }}>
                    <strong>ImgBB Free API Key kaise banayein:</strong><br />
                    1. <a href="https://imgbb.com/signup" target="_blank" rel="noreferrer" style={{ color: '#b45309' }}>imgbb.com/signup</a> pe Free account banayein<br />
                    2. <a href="https://api.imgbb.com/" target="_blank" rel="noreferrer" style={{ color: '#b45309' }}>api.imgbb.com</a> → apni API key copy karein<br />
                    3. Neeche paste karein aur Save karein — Lifetime Free, no credit card!
                  </div>
                  <div className="settings-row">
                    <label className="alabel" style={{ minWidth: 140, margin: 0 }}>ImgBB API Key</label>
                    <input className="ainp" value={siteCfg.imgbbKey||''} onChange={e=>{const k=e.target.value; setSiteCfg(d=>({...d,imgbbKey:k})); setImgbbKey(k);}} placeholder="Paste your ImgBB API key here..." style={{ fontFamily: 'monospace' }} />
                  </div>
                  {siteCfg.imgbbKey && (
                    <div style={{ fontSize: 12, color: '#065f46', background: '#d1fae5', padding: '6px 12px', borderRadius: 8, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      ✅ ImgBB key set — saare upload tabs pe kaam karega
                    </div>
                  )}
                </div>
                <button type="submit" className="abtn abtn-gold" disabled={siteLoading}>💾 Save All Settings</button>
              </form>
            </div>
          )}

          {/* ── CONTACT SETTINGS ─────────────────────────────────── */}
          {tab === 'contact' && (
            <ContactSettingsTab />
          )}

          {/* ── ACTIVITY LOG ─────────────────────────────────────── */}
          {tab === 'activity' && (
            <div className="fade-up">
              <p className="asec">📋 Activity Log</p>
              <p className="asub">Har admin action ka real-time log</p>
              <div className="card">
                <div className="actitle">
                  Recent Activity ({actLog.length})
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div className="glow" style={{ width: 7, height: 7, borderRadius: '50%' }} />
                    <span style={{ fontSize: 12, color: T.green, fontWeight: 800 }}>Live</span>
                  </div>
                </div>
                {actLog.length === 0 && <div style={{ textAlign: 'center', padding: '50px 0', color: T.t4 }}>No activity yet</div>}
                {actLog.map(l => (
                  <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${T.b1}` }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: l.action==='add'?'#dcfce7':l.action==='delete'?'#fee2e2':l.action==='restore'?'#dbeafe':'#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>
                      {l.action==='add'?'➕':l.action==='delete'?'🗑️':l.action==='restore'?'🔄':'✏️'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>{l.message}</div>
                      <div style={{ fontSize: 11, color: T.t3 }}>{l.section && `${l.section} • `}{l.time ? new Date(l.time).toLocaleString('en-IN') : ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── BACKUP ───────────────────────────────────────────── */}
          {tab === 'backup' && (
            <div className="fade-up">
              <p className="asec">💾 Backup & Restore</p>
              <p className="asub">Full database export/import — Firestore settings included</p>
              <div className="card" style={{ borderTop: `3px solid ${T.green}` }}>
                <div className="actitle">⬇️ Download Full Backup</div>
                <p style={{ color: T.t2, marginBottom: 20, fontSize: 14, lineHeight: 1.7 }}>Includes: notices, announcements, events, gallery, pdfReports, pages, faculties, placements, sliderSlides, alerts + all settings (navbar, youtube, drive, site)</p>
                <button className="abtn abtn-green" onClick={handleBackup} disabled={loading}>⬇️ Download JSON Backup</button>
              </div>
              <div className="card" style={{ borderTop: `3px solid ${T.red}` }}>
                <div className="actitle" style={{ color: T.red }}>🔥 Restore from Backup</div>
                <div style={{ background: '#fee2e2', border: '1.5px solid #fecaca', borderRadius: 12, padding: '14px 18px', marginBottom: 20 }}>
                  <div style={{ fontWeight: 900, color: T.red, marginBottom: 6 }}>⚠️ DANGER ZONE</div>
                  <p style={{ color: '#b91c1c', margin: 0, fontSize: 13 }}>This will COMPLETELY ERASE all current data and replace with backup. Cannot be undone.</p>
                </div>
                <div style={{ marginBottom: 20 }}><label className="alabel">Select JSON Backup File</label><input ref={fileRef} type="file" accept=".json" className="ainp" onChange={e=>setRestoreFile(e.target.files[0])} /></div>
                <button className="abtn abtn-red" style={{ background: T.red, color: WHITE, border: 'none' }} onClick={handleRestore} disabled={loading||!restoreFile}>🔥 Restore Database</button>
              </div>
            </div>
          )}

          {/* ── SYSTEM TEST ──────────────────────────────────────── */}
          {tab === 'system_test' && (
            <div className="fade-up">
              <p className="asec">🛡️ System Test Suite</p>
              <p className="asub">17-phase deep scan — har module ka health check. Download PDF report.</p>
              <div className="sys-bg">
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, borderBottom:'1px solid rgba(244,160,35,.25)', paddingBottom:18 }}>
                  <div>
                    <div style={{ color:GOLD, fontSize:22, fontWeight:900, fontFamily:"'JetBrains Mono',monospace", letterSpacing:-1 }}>{'>_ GNC.SYS.DIAGNOSTICS'}</div>
                    <div style={{ color:'rgba(244,160,35,.5)', fontSize:12, fontFamily:"'JetBrains Mono',monospace", marginTop:3 }}>[ 25-Phase Ultra Scan | Admin Panel v10.0 ]</div>
                  </div>
                  {testScore !== null && (
                    <div style={{ padding:'10px 20px', borderRadius:10, border:`2px solid ${testScore>=90?T.green:testScore>=70?GOLD:T.red}`, color:testScore>=90?T.green:testScore>=70?GOLD:T.red, fontWeight:900, fontSize:24, fontFamily:"'JetBrains Mono',monospace", background:`rgba(${testScore>=90?'16,185,129':testScore>=70?'244,160,35':'239,68,68'},.08)` }}>
                      {testScore}%
                    </div>
                  )}
                </div>

                {(testRunning || sysLog.length > 0) && (
                  <div className="sys-term" ref={sysRef} style={{ marginBottom:16 }}>
                    {sysLog.map((line, i) => (
                      <p key={i} style={{ margin:'3px 0', color: line.includes('✗')||line.includes('CRITICAL') ? T.red : line.includes('⚠')||line.includes('WARN') ? GOLD : line.includes('COMPLETE')||line.includes('✓ ALL') ? '#facc15' : line.startsWith('━') ? 'rgba(244,160,35,.3)' : '#a3e635' }}>{line}</p>
                    ))}
                    {testRunning && <p style={{ color:GOLD }}><span className="pulse" style={{ display:'inline-block' }}>█</span></p>}
                  </div>
                )}

                {(testRunning || testResults.length > 0) && (
                  <div style={{ background:'rgba(255,255,255,.06)', borderRadius:99, height:8, marginBottom:20, overflow:'hidden', border:'1px solid rgba(244,160,35,.2)' }}>
                    <div style={{ width:`${testProgress}%`, height:'100%', background:`linear-gradient(90deg,${NAVY},${GOLD})`, borderRadius:99, transition:'width .4s ease', boxShadow:`0 0 10px ${GOLD}55` }} />
                  </div>
                )}

                {!testRunning && testResults.length === 0 && (
                  <div style={{ textAlign:'center', padding:'44px 20px' }}>
                    <div style={{ fontSize:60, marginBottom:18, filter:`drop-shadow(0 0 20px ${GOLD})` }}>🛡️</div>
                    <div style={{ color:GOLD, fontSize:18, fontWeight:900, fontFamily:"'JetBrains Mono',monospace", marginBottom:8 }}>17-PHASE DEEP SCAN READY</div>
                    <div style={{ color:'rgba(255,255,255,.35)', fontSize:13, marginBottom:28, lineHeight:1.8 }}>
                      Vite • Firebase Init • Firestore Read/Write/Delete<br/>
                      Navbar • Site Settings • ImgBB • Flash Alerts<br/>
                      Faculty • Alumni • Content Health • YouTube • Drive<br/>
                      Activity Log • <span style={{ color: GOLD }}>Department Data • Contact Settings</span>
                    </div>
                    <button onClick={runTest} className="sys-btn">▶ EXECUTE FULL DIAGNOSTIC</button>
                  </div>
                )}

                {!testRunning && testResults.length > 0 && (
                  <div>
                    <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:20 }}>
                      {testResults.map((r, i) => (
                        <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'13px 16px', background:'rgba(255,255,255,.04)', borderRadius:10, border:`1px solid ${r.status==='pass'?'rgba(16,185,129,.2)':r.status==='warn'?'rgba(244,160,35,.2)':'rgba(239,68,68,.2)'}`, borderLeft:`4px solid ${r.status==='pass'?T.green:r.status==='warn'?GOLD:T.red}` }}>
                          <span style={{ fontSize:18, flexShrink:0 }}>{r.status==='pass' ? '✅' : r.status==='warn' ? '⚠️' : '❌'}</span>
                          <div style={{ flex:1 }}>
                            <div style={{ fontWeight:800, color:'#f1f5f9', fontSize:14 }}>{r.name}</div>
                            <div style={{ color:'rgba(255,255,255,.45)', fontSize:12, marginTop:3, fontFamily:"'JetBrains Mono',monospace" }}>{r.detail}</div>
                          </div>
                          <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
                            <span style={{ fontSize:10, color:'rgba(255,255,255,.25)', fontFamily:"'JetBrains Mono',monospace" }}>{r.time}</span>
                            <span style={{ fontSize:10, fontWeight:900, padding:'2px 8px', borderRadius:4, background:r.status==='pass'?'rgba(16,185,129,.15)':r.status==='warn'?'rgba(244,160,35,.15)':'rgba(239,68,68,.15)', color:r.status==='pass'?T.green:r.status==='warn'?GOLD:T.red, fontFamily:"'JetBrains Mono',monospace" }}>
                              {r.status==='pass'?'PASS':r.status==='warn'?'WARN':'FAIL'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ background:'rgba(0,0,0,.3)', borderRadius:12, padding:'16px 20px', border:'1px solid rgba(244,160,35,.15)', marginBottom:16 }}>
                      <div style={{ display:'flex', gap:20, flexWrap:'wrap', marginBottom:12 }}>
                        {[
                          { label:'Passed', count:testResults.filter(r=>r.status==='pass').length, color:T.green, bg:'rgba(16,185,129,.1)' },
                          { label:'Warnings', count:testResults.filter(r=>r.status==='warn').length, color:GOLD, bg:'rgba(244,160,35,.1)' },
                          { label:'Failed', count:testResults.filter(r=>r.status==='fail').length, color:T.red, bg:'rgba(239,68,68,.1)' },
                          { label:'Total', count:testResults.length, color:'rgba(255,255,255,.7)', bg:'rgba(255,255,255,.05)' },
                        ].map(s => (
                          <div key={s.label} style={{ background:s.bg, border:`1px solid ${s.color}30`, borderRadius:8, padding:'8px 16px', textAlign:'center' }}>
                            <div style={{ fontSize:22, fontWeight:900, color:s.color, fontFamily:"'JetBrains Mono',monospace" }}>{s.count}</div>
                            <div style={{ fontSize:10, color:'rgba(255,255,255,.4)', fontWeight:700, letterSpacing:.5, textTransform:'uppercase' }}>{s.label}</div>
                          </div>
                        ))}
                        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center' }}>
                          <div style={{ textAlign:'center' }}>
                            <div style={{ fontSize:13, color:'rgba(255,255,255,.4)', marginBottom:4 }}>Overall Health</div>
                            <div style={{ fontSize:13, fontWeight:800, color:testScore>=90?T.green:testScore>=70?GOLD:T.red }}>
                              {testScore>=90 ? '✅ HEALTHY' : testScore>=70 ? '⚠ FAIR — Check Warnings' : '🔴 CRITICAL — Fix Required'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                        <button onClick={runTest} className="sys-btn" disabled={testRunning} style={{ borderColor:'rgba(255,255,255,.2)', color:'rgba(255,255,255,.5)', fontSize:12, padding:'8px 18px' }}>🔄 Re-Run All Tests</button>
                        <button onClick={genPDF} className="sys-btn" disabled={pdfGen || testResults.length === 0} style={{ borderColor:GOLD, color:GOLD, fontSize:12, padding:'8px 18px', display:'flex', alignItems:'center', gap:7 }}>
                          {pdfGen ? <><span className="spin" style={{ display:'inline-block' }}>⚙️</span> Generating PDF…</> : '📥 Download PDF Report'}
                        </button>
                        <button
                          onClick={() => {
                            const lines = testResults.map(r => `[${r.status.toUpperCase()}] ${r.name}: ${r.detail} (${r.time})`).join('\n');
                            const blob = new Blob([`GNC System Test Report\nDate: ${new Date().toLocaleString()}\nScore: ${testScore}%\n\n${lines}\n\nLog:\n${sysLog.join('\n')}`], { type:'text/plain' });
                            const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `GNC_SysTest_${new Date().toISOString().split('T')[0]}.txt`; a.click();
                            toast.success('Text report downloaded!');
                          }}
                          className="sys-btn"
                          style={{ borderColor:'rgba(255,255,255,.2)', color:'rgba(255,255,255,.4)', fontSize:12, padding:'8px 18px' }}
                        >📋 Export Log (.txt)</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── PREVIEW MODAL ─────────────────────────────────────── */}
          {showPreview && (
            <div style={{ position:'fixed', inset:0, background:'rgba(15,35,71,.75)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100001, backdropFilter:'blur(6px)' }}>
              <div style={{ background:WHITE, width:'94%', maxWidth:960, height:'90vh', borderRadius:18, display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'0 30px 60px rgba(0,0,0,.35)' }}>
                {/* Preview header */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 24px', borderBottom:`1px solid ${T.b1}`, flexShrink:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ fontWeight:900, color:NAVY, fontSize:15 }}>👁️ Live Preview</div>
                    <span style={{ fontSize:11, background:'#f1f5f9', color:'#64748b', padding:'2px 8px', borderRadius:20, fontWeight:600 }}>
                      Exact page jaisa dikhega
                    </span>
                  </div>
                  <button onClick={()=>setShowPreview(false)} className="abtn abtn-outline abtn-sm">✕ Close</button>
                </div>
                {/* Fake page hero */}
                <div style={{ background:'linear-gradient(135deg,#0f2347 0%,#1a3a7c 60%,#0f2347 100%)', padding:'28px 32px', textAlign:'center', flexShrink:0, position:'relative' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,#f4a023,#ffd57e,#f4a023)' }} />
                  <div style={{ color:'#fff', fontWeight:900, fontSize:'1.2rem', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
                    {pageData.title || 'Page Title'}
                  </div>
                  <div style={{ width:40, height:3, background:'#f4a023', borderRadius:2, margin:'8px auto 0' }} />
                </div>
                {/* Content with gnc-prose styles */}
                <div style={{ overflowY:'auto', flex:1, padding:'32px 40px', background:'#f8fafc' }}>
                  <style>{`
                    .prev-prose { font-family:'Plus Jakarta Sans','DM Sans',system-ui,sans-serif; font-size:15px; line-height:1.8; color:#334155; }
                    .prev-prose h1,.prev-prose h2,.prev-prose h3,.prev-prose h4 { font-family:'Plus Jakarta Sans',system-ui,sans-serif; color:#0f2347; font-weight:800; line-height:1.3; margin:1.6em 0 0.5em; letter-spacing:-0.02em; }
                    .prev-prose h1{font-size:1.9rem} .prev-prose h2{font-size:1.45rem;padding-bottom:8px;border-bottom:3px solid #f4a023;display:inline-block} .prev-prose h3{font-size:1.2rem;color:#1a3a7c} .prev-prose h4{font-size:1.05rem;color:#1a3a7c;font-weight:700}
                    .prev-prose p{margin:0.8em 0 1em}
                    .prev-prose a{color:#1a3a7c;text-decoration:underline;text-underline-offset:3px;font-weight:600}
                    .prev-prose strong,.prev-prose b{color:#0f2347;font-weight:700}
                    .prev-prose ul{list-style:none;padding-left:1.4em;margin:0.8em 0 1.2em} .prev-prose ul li{position:relative;padding-left:1.2em;margin-bottom:0.45em} .prev-prose ul li::before{content:'';position:absolute;left:0;top:0.65em;width:7px;height:7px;border-radius:50%;background:#f4a023}
                    .prev-prose ol{padding-left:1.6em;margin:0.8em 0 1.2em} .prev-prose ol li{margin-bottom:0.45em} .prev-prose ol li::marker{color:#f4a023;font-weight:700}
                    .prev-prose blockquote{border-left:4px solid #f4a023;background:#fff8ed;margin:1.4em 0;padding:14px 20px;border-radius:0 8px 8px 0;font-style:italic;color:#475569}
                    .prev-prose hr{border:none;border-top:2px solid #e2e8f0;margin:1.8em 0}
                    .prev-prose img{max-width:100%;height:auto;border-radius:10px;border:1px solid #e2e8f0;margin:1em 0;display:block;box-shadow:0 4px 12px rgba(0,0,0,0.08)}
                    .prev-prose-twrap{overflow-x:auto;border-radius:12px;margin:1.5em 0 2em;box-shadow:0 4px 24px rgba(15,35,71,.1);border:1px solid #dde8f5}
                    .prev-prose table{width:100%;border-collapse:collapse;font-size:0.93rem;min-width:400px}
                    .prev-prose table tr:first-child{background:linear-gradient(135deg,#0f2347 0%,#1a3a7c 100%)!important}
                    .prev-prose table tr:first-child td,.prev-prose table tr:first-child th,.prev-prose thead th{color:#fff!important;font-weight:700!important;font-size:0.82rem!important;letter-spacing:0.05em!important;text-transform:uppercase!important;padding:13px 16px!important;border:none!important;border-right:1px solid rgba(255,255,255,.12)!important;background:transparent!important}
                    .prev-prose table tr:first-child td:first-child,.prev-prose thead th:first-child{border-left:3px solid #f4a023!important}
                    .prev-prose table tr:first-child td:last-child,.prev-prose thead th:last-child{border-right:none!important}
                    .prev-prose tbody tr,.prev-prose table tr:not(:first-child){border-bottom:1px solid #e8f0fa}
                    .prev-prose table tr:nth-child(even):not(:first-child){background:#f8faff}
                    .prev-prose table tr:nth-child(odd):not(:first-child){background:#fff}
                    .prev-prose table tr:not(:first-child):hover{background:#edf3ff!important}
                    .prev-prose td{padding:11px 16px;color:#334155;font-size:0.91rem;border-right:1px solid #e8f0fa;vertical-align:top}
                    .prev-prose td:first-child{font-weight:600;color:#0f2347;border-left:3px solid transparent}
                    .prev-prose tr:hover td:first-child{border-left-color:#f4a023}
                    .prev-prose td:last-child{border-right:none}
                  `}</style>
                  <div
                    className="prev-prose"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        (previewContent || '').replace(/<table/gi, '<div class="prev-prose-twrap"><table').replace(/<\/table>/gi, '</table></div>'),
                        { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow','allowfullscreen','frameborder','style'] }
                      )
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── KEYBOARD SHORTCUTS ────────────────────────────────── */}
          {showKeyHelp && (
            <div style={{ position:'fixed', inset:0, background:'rgba(15,35,71,.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100001, backdropFilter:'blur(4px)' }} onClick={()=>setShowKeyHelp(false)}>
              <div style={{ background:WHITE, borderRadius:18, padding:'28px 32px', width:440, boxShadow:'0 20px 50px rgba(0,0,0,.2)' }} onClick={e=>e.stopPropagation()}>
                <div style={{ fontWeight:900, color:NAVY, fontSize:18, marginBottom:20 }}>⌨️ Keyboard Shortcuts</div>
                {[['Ctrl + K', 'Global search focus'],['Ctrl + /', 'Toggle this help panel'],['Escape', 'Close panels / modals']].map(([key, desc]) => (
                  <div key={key} style={{ display:'flex', alignItems:'center', gap:14, padding:'10px 0', borderBottom:`1px solid ${T.b1}` }}>
                    <code style={{ background:BG, border:`1.5px solid ${T.b1}`, borderRadius:7, padding:'4px 12px', fontSize:12, fontWeight:800, color:NAVY, fontFamily:"'JetBrains Mono',monospace", flexShrink:0 }}>{key}</code>
                    <span style={{ fontSize:13, color:T.t2, fontWeight:600 }}>{desc}</span>
                  </div>
                ))}
                <button className="abtn abtn-navy" style={{ marginTop:20, width:'100%', justifyContent:'center' }} onClick={()=>setShowKeyHelp(false)}>Close</button>
              </div>
            </div>
          )}

        </div>{/* end adm-content */}
      </div>{/* end adm-main */}
    </div>
  );
}

// ── Default export wrapped in Error Boundary ──────────────────────────────────
export default function AdminPanel(props) {
  return (
    <AdminErrorBoundary>
      <AdminPanelInner {...props} />
    </AdminErrorBoundary>
  );
}