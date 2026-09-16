// ═══════════════════════════════════════════════════════════════════════════════
// GNC ADMIN — SHARED UTILITIES, THEME & COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Edit2, X, Search, CheckCircle2 } from 'lucide-react';
import '../../styles/admin.css';

// ── Theme ─────────────────────────────────────────────────────────────────────
export const NAVY  = '#0f2347';
export const GOLD  = '#f4a023';
export const WHITE = '#ffffff';
export const BG    = '#f0f4f8';

export const T = {
  navy: NAVY, navyL: '#1a3a6c', navyD: '#07152e',
  gold: GOLD, goldL: '#fbbf45', goldD: '#c97e10',
  white: WHITE, bg: BG, bg2: '#e8eef5',
  red: '#dc2626', green: '#059669', blue: '#2563eb',
  purple: '#7c3aed', cyan: '#0891b2', orange: '#ea580c',
  t1: '#0f2347', t2: '#1e293b', t3: '#334155', t4: '#475569',
  b1: '#cbd5e1', b2: '#94a3b8', b3: '#64748b',
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

// 🔐 Base64 safe storage helper to prevent PII exposure in localStorage audits
const safeDraftEncode = (obj) => {
  try { return btoa(unescape(encodeURIComponent(JSON.stringify(obj)))); }
  catch { return JSON.stringify(obj); }
};
const safeDraftDecode = (str, fallback) => {
  if (!str) return fallback;
  try { return JSON.parse(decodeURIComponent(escape(atob(str)))); }
  catch {
    try { return JSON.parse(str); } catch { return fallback; }
  }
};

export const useLocalDraft = (key, init, sensitiveKeys = []) => {
  const [v, set] = useState(() => {
    try {
      const s = localStorage.getItem(`gnc_draft_${key}`);
      return safeDraftDecode(s, init);
    } catch { return init; }
  });
  const save = useCallback(nv => {
    set(prev => {
      const next = typeof nv === 'function' ? nv(prev) : nv;
      try {
        if (typeof next === 'object' && next !== null) {
          const safe = { ...next };
          sensitiveKeys.forEach(k => delete safe[k]);
          localStorage.setItem(`gnc_draft_${key}`, safeDraftEncode(safe));
        } else {
          localStorage.setItem(`gnc_draft_${key}`, safeDraftEncode(next));
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
export const StatCard = React.memo(({ icon, label, count, color = '#0f2347', sub, badge, onClick }) => {
  const a = useCountUp(count);
  return (
    <div 
      className="adm-stat-card count-anim" 
      onClick={onClick} 
      style={{ 
        cursor: onClick ? 'pointer' : 'default',
        '--accent-color': color,
      }}
    >
      <div className="adm-stat-inner">
        <div className="adm-stat-icon-wrap" style={{ background: `${color}14`, color, border: `1px solid ${color}28` }}>
          <span className="adm-stat-icon">{icon}</span>
        </div>
        <div className="adm-stat-body">
          <div className="adm-stat-header">
            <span className="adm-stat-label">{label}</span>
            <span className="adm-stat-badge" style={{ color, background: `${color}12` }}>
              {badge || 'Active'}
            </span>
          </div>
          <div className="adm-stat-num" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {a.toLocaleString()}
          </div>
          <div className="adm-stat-sub">
            {sub || 'System Records'}
          </div>
        </div>
      </div>
      <div className="adm-stat-bar" style={{ background: color }} />
    </div>
  );
});

export const Toggle = ({ checked, onChange, label, color = T.green }) => {
  return (
    <div
      className="toggle-wrap"
      style={{
        userSelect: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        flexShrink: 0,
        verticalAlign: 'middle'
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange && onChange();
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 44,
          height: 24,
          minWidth: 44,
          minHeight: 24,
          maxWidth: 44,
          maxHeight: 24,
          flexShrink: 0,
          borderRadius: 99,
          background: checked ? color : '#cbd5e1',
          transition: 'background 0.2s ease',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 3,
            left: checked ? 23 : 3,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 2px 5px rgba(0,0,0,0.25)',
            transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>
      {label && (
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: checked ? color : T.t3,
            whiteSpace: 'nowrap',
            lineHeight: 1
          }}
        >
          {label}
        </span>
      )}
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
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18 }}>
            {l.action === 'add' ? <Plus size={13} color={T.green} /> : l.action === 'delete' ? <Trash2 size={13} color={T.red} /> : <Edit2 size={13} color={T.blue} />}
          </span>
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
    <button className="abtn abtn-red abtn-sm" style={{ background: T.red, color: WHITE, border: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }} onClick={onDelete}>
      <Trash2 size={14} /> Delete Selected
    </button>
    <button className="abtn abtn-outline abtn-sm" style={{ color: WHITE, borderColor: 'rgba(255,255,255,.3)', display: 'inline-flex', alignItems: 'center', gap: 6 }} onClick={onClear}>
      <X size={14} /> Clear
    </button>
  </div>
);

export const joditCfg = {
  readonly: false,
  placeholder: 'Write content here...',
  height: 420, minHeight: 300, allowResizeY: true, allowResizeX: false,
  theme: 'default', toolbarAdaptive: false, toolbarSticky: true,
  showCharsCounter: false, showWordsCounter: false, showXPathInStatusbar: false,
  buttons: ['bold','italic','underline','strikethrough','|','ul','ol','|','outdent','indent','|','font','fontsize','brush','|','paragraph','|','table','link','image','|','align','|','hr','eraser','|','undo','redo','|','fullsize'],
  style: { fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '15px', color: '#334155', lineHeight: '1.8' },
};

// ── CSS (Decoupled to src/styles/admin.css) ──────────────────────────────────
export const GCSS = '';
