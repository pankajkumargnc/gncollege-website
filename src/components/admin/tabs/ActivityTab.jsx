// src/components/admin/tabs/ActivityTab.jsx
import { T, NAVY, GOLD } from '../AdminShared';

export default function ActivityTab({ actLog }) {
  return (
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

        {actLog.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px 0', color: T.t4 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <div style={{ fontWeight: 700, marginBottom: 6, color: T.t2 }}>No activity yet</div>
            <div style={{ fontSize: 13, color: T.t3 }}>Admin actions yahan show honge</div>
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
              width: 34, height: 34, borderRadius: 9, flexShrink: 0,
              background:
                l.action === 'add'     ? '#dcfce7' :
                l.action === 'delete'  ? '#fee2e2' :
                l.action === 'restore' ? '#dbeafe' : '#fef3c7',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
            }}>
              {l.action === 'add'    ? '➕' :
               l.action === 'delete' ? '🗑️' :
               l.action === 'restore'? '🔄' : '✏️'}
            </div>

            {/* Log text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: NAVY, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {l.message}
              </div>
              <div style={{ fontSize: 11, color: T.t3, marginTop: 2 }}>
                {l.section && (
                  <span>
                    <span style={{ background: `${NAVY}12`, color: NAVY, padding: '1px 7px', borderRadius: 20, fontWeight: 700, fontSize: 10, marginRight: 6 }}>
                      {l.section}
                    </span>
                  </span>
                )}
                {l.time ? new Date(l.time).toLocaleString('en-IN') : ''}
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
          <div style={{ textAlign: 'center', padding: '14px 0 4px', fontSize: 12, color: T.t3, fontWeight: 600 }}>
            Showing latest {actLog.length} actions — older logs auto-purge after 30 entries
          </div>
        )}
      </div>

      {/* Stats summary */}
      {actLog.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginTop: 16 }}>
          {[
            { label: 'Adds',    icon: '➕', action: 'add',     bg: '#dcfce7', color: '#166534' },
            { label: 'Edits',   icon: '✏️',  action: 'update',  bg: '#fef3c7', color: '#92400e' },
            { label: 'Deletes', icon: '🗑️', action: 'delete',  bg: '#fee2e2', color: '#991b1b' },
            { label: 'Restores',icon: '🔄', action: 'restore', bg: '#dbeafe', color: '#1e40af' },
          ].map(s => {
            const count = actLog.filter(l => l.action === s.action).length;
            return (
              <div key={s.action} style={{ background: s.bg, borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 22 }}>{s.icon}</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: s.color, lineHeight: 1.2 }}>{count}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: s.color, opacity: 0.75, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
