// src/components/admin/tabs/ActivityTab.jsx
import React from 'react';
import { ClipboardList, Plus, Trash2, RotateCcw, Edit2, Activity, Clock } from 'lucide-react';
import { T, NAVY, GOLD } from '../AdminShared';

export default function ActivityTab({ actLog = [] }) {
  return (
    <div className="fade-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <ClipboardList size={22} color={NAVY} />
        <p style={{ margin: 0, fontWeight: 900, color: NAVY, fontSize: 'clamp(20px, 5vw, 24px)', letterSpacing: '-0.5px' }}>
          Activity Log
        </p>
      </div>
      <p style={{ margin: '4px 0 20px', color: T.t3, fontSize: 13, fontWeight: 500 }}>
        Real-time audit log of administrative actions, edits, creations, and restorations.
      </p>

      <div className="card">
        <div className="actitle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Activity size={16} color={NAVY} />
            Recent Activity ({actLog.length})
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="glow" style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: 12, color: T.green, fontWeight: 800 }}>Live Sync</span>
          </div>
        </div>

        {actLog.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px 0', color: T.t4 }}>
            <ClipboardList size={38} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.35 }} />
            <div style={{ fontWeight: 700, marginBottom: 6, color: T.t2 }}>No activity logged yet</div>
            <div style={{ fontSize: 13, color: T.t3 }}>Administrative modifications will appear here in real time.</div>
          </div>
        )}

        {actLog.map(l => (
          <div
            key={l.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 0', borderBottom: `1px solid ${T.b1}`,
            }}>
            {/* Action icon badge */}
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background:
                l.action === 'add'     ? '#dcfce7' :
                l.action === 'delete'  ? '#fee2e2' :
                l.action === 'restore' ? '#dbeafe' : '#fef3c7',
              color:
                l.action === 'add'     ? '#166534' :
                l.action === 'delete'  ? '#991b1b' :
                l.action === 'restore' ? '#1e40af' : '#92400e',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {l.action === 'add'    ? <Plus size={16} /> :
               l.action === 'delete' ? <Trash2 size={16} /> :
               l.action === 'restore'? <RotateCcw size={16} /> : <Edit2 size={16} />}
            </div>

            {/* Log text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: NAVY, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {l.message}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: T.t3, marginTop: 3 }}>
                {l.section && (
                  <span style={{ background: `${NAVY}10`, color: NAVY, padding: '2px 8px', borderRadius: 6, fontWeight: 700, fontSize: 10 }}>
                    {l.section}
                  </span>
                )}
                {l.time && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={11} />
                    {new Date(l.time).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            {/* Action label chip */}
            <div style={{
              fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 6, flexShrink: 0,
              background:
                l.action === 'add'     ? '#dcfce7' :
                l.action === 'delete'  ? '#fee2e2' :
                l.action === 'restore' ? '#dbeafe' : '#fef3c7',
              color:
                l.action === 'add'     ? '#166534' :
                l.action === 'delete'  ? '#991b1b' :
                l.action === 'restore' ? '#1e40af' : '#92400e',
              textTransform: 'uppercase', letterSpacing: 0.5,
            }}>
              {l.action || 'edit'}
            </div>
          </div>
        ))}

        {actLog.length > 0 && (
          <div style={{ textAlign: 'center', padding: '14px 0 4px', fontSize: 12, color: T.t3, fontWeight: 500 }}>
            Showing latest {actLog.length} actions — older records auto-archive safely.
          </div>
        )}
      </div>

      {/* Stats summary */}
      {actLog.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginTop: 16 }}>
          {[
            { label: 'Additions',   icon: Plus,      action: 'add',     bg: '#dcfce7', color: '#166534' },
            { label: 'Updates',     icon: Edit2,     action: 'update',  bg: '#fef3c7', color: '#92400e' },
            { label: 'Deletions',   icon: Trash2,    action: 'delete',  bg: '#fee2e2', color: '#991b1b' },
            { label: 'Restorations',icon: RotateCcw, action: 'restore', bg: '#dbeafe', color: '#1e40af' },
          ].map(s => {
            const count = actLog.filter(l => l.action === s.action).length;
            const StatIcon = s.icon;
            return (
              <div key={s.action} style={{ background: s.bg, borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                  <StatIcon size={20} color={s.color} />
                </div>
                <div style={{ fontSize: 24, fontWeight: 900, color: s.color, lineHeight: 1.2, fontVariantNumeric: 'tabular-nums' }}>
                  {count}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: s.color, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 }}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
