// ═══════════════════════════════════════════════════════════════════════════════
// GNC ADMIN — SHARED UTILITIES, THEME & COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════
import React, { useState, useEffect, useCallback } from 'react';

// ── Theme ─────────────────────────────────────────────────────────────────────
export const NAVY  = '#0f2347';
export const GOLD  = '#f4a023';
export const WHITE = '#ffffff';
export const BG    = '#f0f4f8';

export const T = {
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

// ── Hooks ─────────────────────────────────────────────────────────────────────
export function useDebounce(val, ms) {
  const [v, set] = useState(val);
  useEffect(() => { const h = setTimeout(() => set(val), ms); return () => clearTimeout(h); }, [val, ms]);
  return v;
}

export function useCountUp(target, dur = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!target) { setV(0); return; }
    let s = 0; const step = target / (dur / 16);
    const t = setInterval(() => { s += step; if (s >= target) { setV(target); clearInterval(t); } else setV(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [target]);
  return v;
}

export const useLocalDraft = (key, init, sensitiveKeys = []) => {
  const [v, set] = useState(() => {
    try { const s = localStorage.getItem(`gnc_draft_${key}`); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  const save = useCallback(nv => {
    set(prev => {
      const next = typeof nv === 'function' ? nv(prev) : nv;
      try {
        // Strip sensitive fields (email, phone, keys) before saving to localStorage
        // This prevents PII exposure detected by security audits
        if (sensitiveKeys.length > 0 && typeof next === 'object' && next !== null) {
          const safe = { ...next };
          sensitiveKeys.forEach(k => delete safe[k]);
          localStorage.setItem(`gnc_draft_${key}`, JSON.stringify(safe));
        } else {
          localStorage.setItem(`gnc_draft_${key}`, JSON.stringify(next));
        }
      } catch { }
      return next;
    });
  }, [key, sensitiveKeys]);
  const clear = useCallback(() => {
    set(init);
    try { localStorage.removeItem(`gnc_draft_${key}`); } catch { }
  }, [key, init]);
  return [v, save, clear];
};

// ── Shared Components ─────────────────────────────────────────────────────────
export const StatCard = React.memo(({ icon, label, count, color, sub, onClick }) => {
  const a = useCountUp(count);
  return (
    <div className="stat-card count-anim" onClick={onClick} 
      style={{ 
        cursor: onClick ? 'pointer' : 'default', 
        borderBottom: `3px solid ${color}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
      <div style={{ position:'absolute', top:-15, right:-15, fontSize:64, opacity:0.05, transform:'rotate(15deg)', pointerEvents:'none' }}>{icon}</div>
      <div className="stat-icon" style={{ background: `${color}15`, color }}>{icon}</div>
      <div className="stat-num" style={{ color }}>{a.toLocaleString()}</div>
      <div className="stat-label">{label}</div>
      {sub && <div style={{ fontSize: 10, color: T.t4, marginTop: 4, fontWeight: 700, textTransform: 'uppercase' }}>{sub}</div>}
      
      {/* Subtle Glow on Hover logic is handled by CSS class .stat-card */}
    </div>
  );
});

export const Toggle = ({ checked, onChange, label, color = T.green }) => {
  return (
    <div
      className="toggle-wrap"
      style={{ userSelect: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange && onChange();
      }}
    >
      <div className="toggle">
        {/* We use a visible checkbox overlayed by the slider but clickable via the div */}
        <input 
          type="checkbox" 
          checked={!!checked} 
          readOnly
          style={{ opacity: 0, position: 'absolute', inset: 0, cursor: 'pointer', zIndex: 1 }}
        />
        <span className="toggle-slider" style={checked ? { background: color } : {}} />
      </div>
      {label && <span style={{ fontSize: 13, fontWeight: 700, color: checked ? color : T.t3 }}>{label}</span>}
    </div>
  );
};

export const SectionSearch = ({ value, onChange, placeholder }) => (
  <div className="sec-search" style={{ marginBottom: 16 }}>
    <input className="ainp" style={{ paddingLeft: 36 }} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || 'Search...'} />
  </div>
);

export const MiniLog = ({ logs }) => {
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

export const BulkBar = ({ count, onDelete, onClear }) => count === 0 ? null : (
  <div className="bulk-bar fade-up">
    <span style={{ fontSize: 13, fontWeight: 700 }}>{count} item{count > 1 ? 's' : ''} selected</span>
    <button className="abtn abtn-red abtn-sm" style={{ background: T.red, color: WHITE, border: 'none' }} onClick={onDelete}>🗑️ Delete Selected</button>
    <button className="abtn abtn-outline abtn-sm" style={{ color: WHITE, borderColor: 'rgba(255,255,255,.3)' }} onClick={onClear}>✕ Clear</button>
  </div>
);

export const joditCfg = {
  readonly: false,
  placeholder: 'Content likhein…',
  height: 420, minHeight: 300, allowResizeY: true, allowResizeX: false,
  theme: 'default', toolbarAdaptive: false, toolbarSticky: true,
  showCharsCounter: false, showWordsCounter: false, showXPathInStatusbar: false,
  buttons: ['bold','italic','underline','strikethrough','|','ul','ol','|','outdent','indent','|','font','fontsize','brush','|','paragraph','|','table','link','image','|','align','|','hr','eraser','|','undo','redo','|','fullsize'],
  style: { fontFamily: "'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif", fontSize: '15px', color: '#334155', lineHeight: '1.8' },
};

// ── CSS ───────────────────────────────────────────────────────────────────────
export const GCSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=JetBrains+Mono:wght@400;700&display=swap');
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
.abtn-red { background:rgba(239,68,68,.05); color:${T.red}; border:1.5px solid rgba(239,68,68,.25); }
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
.sec-search { position:relative; }
.sec-search input { padding-left:36px !important; }
.sec-search::before { content:'🔍'; position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:13px; pointer-events:none; z-index:1; }
.stat-card { 
    background:${WHITE}; border-radius:20px; padding:24px; border:1.5px solid ${T.b1}; 
    box-shadow:${T.shadow}; position:relative; overflow:hidden; transition:all .3s cubic-bezier(.25,.8,.25,1); 
}
.stat-card:hover { transform:translateY(-8px); box-shadow:${T.shadowHov}; border-color:${T.b2}; }
.stat-card:hover .stat-icon { transform:scale(1.1) rotate(-5deg); }
.stat-card .stat-icon { 
    width: 44px; height: 44px; border-radius: 12px; display: flex; 
    align-items: center; justify-content: center; font-size: 20px; 
    margin-bottom: 16px; transition: transform 0.3s; 
}
.stat-card .stat-num { font-size: 32px; font-weight: 900; color:${NAVY}; font-family:'JetBrains Mono',monospace; line-height: 1; margin-bottom: 4px; }
.stat-card .stat-label { font-size: 11px; font-weight: 800; color:${T.t3}; text-transform:uppercase; letter-spacing: 1px; }
.toggle-wrap { display:inline-flex; align-items:center; gap:8px; cursor:pointer; }
.toggle { position:relative; width:44px; height:24px; }
.toggle input { opacity:0; width:0; height:0; }
.toggle-slider { position:absolute; inset:0; background:${T.b2}; border-radius:99px; transition:.2s; }
.toggle input:checked + .toggle-slider { background:${T.green}; }
.toggle-slider:before { content:''; position:absolute; height:18px; width:18px; left:3px; bottom:3px; background:${WHITE}; border-radius:50%; transition:.2s; box-shadow:0 1px 4px rgba(0,0,0,.2); }
.toggle input:checked + .toggle-slider:before { transform:translateX(20px); }
.bulk-bar { background:${NAVY}; color:${WHITE}; padding:12px 20px; border-radius:12px; display:flex; align-items:center; gap:12px; margin-bottom:16px; }
.mini-log { background:${BG}; border-radius:10px; padding:12px 14px; margin-top:20px; }
.mini-log-item { display:flex; align-items:center; gap:8px; padding:5px 0; border-bottom:1px solid ${T.b1}; font-size:12px; color:${T.t2}; }
.mini-log-item:last-child { border-bottom:none; }
.settings-group { border:1.5px solid ${T.b1}; border-radius:14px; overflow:hidden; margin-bottom:20px; }
.settings-group-title { background:${BG}; padding:14px 20px; font-weight:800; color:${NAVY}; font-size:13.5px; border-bottom:1px solid ${T.b1}; display:flex; align-items:center; gap:8px; }
.settings-row { padding:16px 20px; display:flex; align-items:center; gap:16px; border-bottom:1px solid ${T.b1}; }
.settings-row:last-child { border-bottom:none; }
.qa-card { background:${WHITE}; border:1.5px solid ${T.b1}; border-radius:14px; padding:18px; cursor:pointer; transition:all .2s; text-align:center; }
.qa-card:hover { border-color:${GOLD}; transform:translateY(-3px); box-shadow:0 8px 24px rgba(244,160,35,.12); }
.top-search { flex:1; max-width:400px; position:relative; }
.top-search input { width:100%; padding:9px 14px 9px 36px; border-radius:10px; border:1.5px solid ${T.b1}; background:${BG}; font-size:13.5px; outline:none; font-family:'Plus Jakarta Sans',sans-serif; color:${NAVY}; }
.top-search input:focus { border-color:${NAVY}; background:${WHITE}; }
.top-search::before { content:'⌕'; position:absolute; left:11px; top:50%; transform:translateY(-50%); font-size:16px; color:${T.t3}; pointer-events:none; }
.sys-bg { background:#060d1a; border-radius:18px; padding:36px; border:1px solid rgba(15,35,71,.5); box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 20px 50px rgba(0,0,0,.15); }
.sys-term { background:rgba(0,0,0,.6); border:1px solid rgba(244,160,35,.2); border-radius:10px; padding:18px; font-family:'JetBrains Mono',monospace; font-size:12px; color:#a3e635; min-height:200px; overflow-y:auto; }
.sys-term p { margin:3px 0; }
.sys-btn { background:transparent; border:1.5px solid ${GOLD}; color:${GOLD}; font-family:'JetBrains Mono',monospace; font-weight:800; padding:11px 28px; cursor:pointer; border-radius:8px; transition:all .2s; font-size:13px; }
.sys-btn:hover:not(:disabled) { background:${GOLD}; color:${NAVY}; box-shadow:0 0 18px rgba(244,160,35,.35); }
.sys-btn:disabled { opacity:.5; cursor:not-allowed; }
.glow { animation:pulse 2s infinite; box-shadow:0 0 8px ${T.green}; background:${T.green}; }
@keyframes fadeUp { from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);} }
.fade-up { animation:fadeUp .3s ease both; }
@keyframes pulse { 0%,100%{opacity:1;}50%{opacity:.5;} }
@keyframes pulse-red-soft {
  0% { box-shadow: 0 4px 15px rgba(239,68,68,0.3); }
  50% { box-shadow: 0 4px 30px rgba(239,68,68,0.6); }
  100% { box-shadow: 0 4px 15px rgba(239,68,68,0.3); }
}
.pulse-red-soft { animation: pulse-red-soft 2s infinite ease-in-out; }
@media(max-width:1024px) {
  .adm-side { position:fixed !important; z-index:10001; transform:translateX(-100%); transition:transform .3s ease; }
  .adm-side.open { transform:translateX(0); }
  .adm-mobile-top { display:flex; background:${WHITE}; padding:14px 18px; align-items:center; justify-content:space-between; border-bottom:1px solid ${T.b1}; position:sticky; top:0; z-index:100; }
  .adm-content { padding:16px !important; }
}
`;
