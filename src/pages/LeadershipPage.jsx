// src/pages/LeadershipPage.jsx
// ✅ NEW: Handles Presidents, Secretaries, and Principals — 1 component, 3 routes
// Usage in App.jsx:
//   <Route path="/about-us/college-management/presidents"
//     element={<LeadershipPage type="president" title="Presidents Over the Years" />} />
//   <Route path="/about-us/college-management/secretaries"
//     element={<LeadershipPage type="secretary" title="Secretaries Over the Years" />} />
//   <Route path="/about-us/college-management/principal"
//     element={<LeadershipPage type="principal" title="Principals Over the Years" />} />

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

// ── Config per type ──────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  president: {
    icon: '🏛️',
    color: '#0f2347',
    accent: '#f4a023',
    label: 'President',
    plural: 'Presidents',
    subtitle: 'Visionary leaders who shaped our institution',
  },
  secretary: {
    icon: '📋',
    color: '#1a3a7c',
    accent: '#f4a023',
    label: 'Secretary',
    plural: 'Secretaries',
    subtitle: 'Dedicated administrators who guided our growth',
  },
  principal: {
    icon: '🎓',
    color: '#0f2347',
    accent: '#f4a023',
    label: 'Principal',
    plural: 'Principals',
    subtitle: 'Academic leaders who nurtured excellence',
  },
};

const FALLBACK = '/images/college_photo.jpg';

// ── Styles ───────────────────────────────────────────────────────────────────
const css = `
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
`;

// ── Helper ───────────────────────────────────────────────────────────────────
const calcDuration = (from, to) => {
  const f = parseInt(from, 10);
  const t = to?.toLowerCase() === 'present' ? new Date().getFullYear() : parseInt(to, 10);
  if (!f || !t || isNaN(f) || isNaN(t)) return null;
  const yrs = t - f;
  if (yrs <= 0) return '< 1 yr';
  return yrs === 1 ? '1 yr' : `${yrs} yrs`;
};

const isCurrent = (to) => !to || to.toLowerCase() === 'present';

// ── Main Component ────────────────────────────────────────────────────────────
const LeadershipPage = ({ type = 'president', title }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView]       = useState('timeline'); // 'timeline' | 'table'

  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.president;
  const pageTitle = title || `${cfg.plural} Over the Years`;

  useEffect(() => {
    const q = query(
      collection(db, 'leadership'),
      where('type', '==', type),
      orderBy('from', 'desc')
    );
    const unsub = onSnapshot(q, snap => {
      setRecords(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, [type]);

  // Stats
  const totalYears = records.reduce((acc, r) => {
    const d = calcDuration(r.from, r.to);
    if (!d || d === '< 1 yr') return acc + 1;
    return acc + parseInt(d, 10);
  }, 0);
  const currentLeader = records.find(r => isCurrent(r.to));

  return (
    <div className="lp-wrap" style={{ minHeight: '60vh', background: '#f8fafc' }}>
      <style>{css}</style>

      {/* Hero */}
      <div className="lp-hero">
        <div className="lp-hero-topbar" />
        <span className="lp-hero-icon">{cfg.icon}</span>
        <h1>{pageTitle}</h1>
        <p className="lp-hero-sub">{cfg.subtitle}</p>
        <div className="lp-hero-line" />
        <span className="lp-hero-badge">Guru Nanak College, Dhanbad</span>
      </div>

      {/* Content */}
      <div className="lp-content">

        {/* Stats strip */}
        {!loading && records.length > 0 && (
          <div className="lp-stats">
            <div className="lp-stat">
              <div className="lp-stat-num">{records.length}</div>
              <div className="lp-stat-label">Total {cfg.plural}</div>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-num">{totalYears}+</div>
              <div className="lp-stat-label">Years of Leadership</div>
            </div>
            {currentLeader && (
              <div className="lp-stat" style={{ flex: 2, textAlign: 'left', paddingLeft: 20 }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
                  Current {cfg.label}
                </div>
                <div style={{ fontWeight: 800, color: '#0f2347', fontSize: '1rem', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
                  {currentLeader.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 2, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
                  Since {currentLeader.from}
                </div>
              </div>
            )}
          </div>
        )}

        {/* View toggle */}
        {!loading && records.length > 0 && (
          <div className="lp-toggle-bar" style={{ padding: '0 0 28px', justifyContent: 'flex-start' }}>
            <button
              className={`lp-toggle-btn${view === 'timeline' ? ' active' : ''}`}
              onClick={() => setView('timeline')}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="3" cy="4" r="2" fill="currentColor" opacity=".4"/>
                <circle cx="3" cy="7.5" r="2" fill="currentColor" opacity=".4"/>
                <circle cx="3" cy="11" r="2" fill="currentColor" opacity=".4"/>
                <rect x="7" y="3" width="8" height="2" rx="1" fill="currentColor"/>
                <rect x="7" y="6.5" width="8" height="2" rx="1" fill="currentColor"/>
                <rect x="7" y="10" width="8" height="2" rx="1" fill="currentColor"/>
              </svg>
              Timeline Cards
            </button>
            <button
              className={`lp-toggle-btn${view === 'table' ? ' active' : ''}`}
              onClick={() => setView('table')}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect x="1" y="1" width="13" height="3" rx="1" fill="currentColor" opacity=".5"/>
                <rect x="1" y="5.5" width="13" height="2.5" rx="1" fill="currentColor" opacity=".3"/>
                <rect x="1" y="9.5" width="13" height="2.5" rx="1" fill="currentColor" opacity=".3"/>
                <rect x="1" y="13" width="13" height="1" rx=".5" fill="currentColor" opacity=".2"/>
              </svg>
              Table View
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div style={{ paddingLeft: 40 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{
                background: '#fff', border: '1px solid #e8f0fa',
                borderRadius: 14, padding: 24, marginBottom: 20,
                display: 'flex', gap: 18, alignItems: 'flex-start',
                opacity: 1 - (i - 1) * 0.2,
              }}>
                <div style={{ width: 70, height: 70, borderRadius: 10, background: '#f1f5f9', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: 18, width: '50%', background: '#f1f5f9', borderRadius: 6, marginBottom: 10 }} />
                  <div style={{ height: 24, width: '30%', background: '#f4a02333', borderRadius: 6, marginBottom: 10 }} />
                  <div style={{ height: 13, width: '70%', background: '#f1f5f9', borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && records.length === 0 && (
          <div className="lp-empty">
            <span className="lp-empty-icon">📋</span>
            <h3 style={{ color: '#64748b', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
              No records yet
            </h3>
            <p style={{ fontSize: 14, margin: '6px 0 0' }}>
              Admin Panel → Leadership tab → Add {cfg.plural.toLowerCase()}
            </p>
          </div>
        )}

        {/* ── TIMELINE VIEW ── */}
        {!loading && records.length > 0 && view === 'timeline' && (
          <div className="lp-timeline">
            {records.map((r, idx) => (
              <div
                key={r.id}
                className={`lp-card${isCurrent(r.to) ? ' current' : ''}`}
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <div className="lp-dot" />
                {isCurrent(r.to) && (
                  <div className="lp-current-badge">
                    <span className="lp-current-dot" />
                    Current {cfg.label}
                  </div>
                )}
                <div className="lp-card-inner">
                  <img
                    src={r.photo || FALLBACK}
                    alt={r.name}
                    className="lp-avatar"
                    onError={e => { e.target.src = FALLBACK; }}
                  />
                  <div className="lp-card-body">
                    <div className="lp-card-name">{r.name}</div>
                    <div className="lp-card-tenure">
                      <span>📅 {r.from} – {r.to || 'Present'}</span>
                      {calcDuration(r.from, r.to) && (
                        <span className="lp-card-duration">
                          {calcDuration(r.from, r.to)}
                        </span>
                      )}
                    </div>
                    {r.note && <p className="lp-card-note">{r.note}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TABLE VIEW ── */}
        {!loading && records.length > 0 && view === 'table' && (
          <div className="lp-table-wrap">
            <table className="lp-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Tenure</th>
                  <th>Duration</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, idx) => (
                  <tr
                    key={r.id}
                    className={isCurrent(r.to) ? 'lp-row-current' : ''}
                  >
                    <td style={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.85rem', width: 44 }}>
                      {records.length - idx}
                    </td>
                    <td>
                      <div className="lp-tname">
                        <img
                          src={r.photo || FALLBACK}
                          alt={r.name}
                          className="lp-tavatar"
                          onError={e => { e.target.src = FALLBACK; }}
                        />
                        <div>
                          <div>{r.name}</div>
                          {isCurrent(r.to) && (
                            <div className="lp-tcurrent" style={{ marginTop: 4 }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                              Current
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="lp-ttenure">
                        {r.from} – {r.to || 'Present'}
                      </span>
                    </td>
                    <td style={{ color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {calcDuration(r.from, r.to) || '—'}
                    </td>
                    <td className="lp-tnote">{r.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default LeadershipPage;