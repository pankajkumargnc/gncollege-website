// src/components/admin/tabs/DashboardTab.jsx
import { T, NAVY, GOLD, StatCard } from '../AdminShared';

export default function DashboardTab({ notices, events, faculties, placements, pdfReports, alerts, gallery, pages, actLog, onNavigate }) {
  return (
    <div className="fade-up">
      <p className="asec">📊 Dashboard</p>
      <p className="asub">Real-time website overview — sabhi modules at a glance</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr))', gap: 14, marginBottom: 28 }}>
        <StatCard icon="📢" label="Notices"     count={(notices||[]).length}                             color={GOLD}    onClick={() => onNavigate('notices')} />
        <StatCard icon="🏆" label="Events"      count={(events||[]).length}                              color={NAVY}    onClick={() => onNavigate('events')} />
        <StatCard icon="👨‍🏫" label="Faculty"    count={(faculties||[]).length}                           color={T.blue}  sub={`${(faculties||[]).filter(f=>f.staffType==='Non-Teaching').length} non-teaching`} onClick={() => onNavigate('faculty')} />
        <StatCard icon="🎓" label="Alumni"      count={(placements||[]).length}                          color={T.green} onClick={() => onNavigate('placements')} />
        <StatCard icon="📁" label="Documents"   count={(pdfReports||[]).length}                          color={T.purple} onClick={() => onNavigate('documents')} />
        <StatCard icon="🚨" label="Live Alerts" count={(alerts||[]).filter(a=>a.isActive).length}        color={T.red}   onClick={() => onNavigate('alerts')} />
        <StatCard icon="📸" label="Gallery"     count={(gallery||[]).length}                             color={T.orange} onClick={() => onNavigate('gallery')} />
        <StatCard icon="📄" label="Pages"       count={(pages||[]).length}                               color={T.cyan}  onClick={() => onNavigate('pages')} />
      </div>

      <div className="card">
        <div className="actitle">⚡ Quick Actions</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12 }}>
          {[
            { icon: '📢', label: 'Add Notice',  tab: 'notices' },
            { icon: '📣', label: 'Add News',     tab: 'announcements' },
            { icon: '🏆', label: 'Add Event',    tab: 'events' },
            { icon: '📁', label: 'Add Doc',      tab: 'documents' },
            { icon: '👨‍🏫', label: 'Add Staff',  tab: 'faculty' },
            { icon: '🎓', label: 'Add Alumni',   tab: 'placements' },
            { icon: '🚨', label: 'New Alert',    tab: 'alerts' },
            { icon: '📸', label: 'Add Photo',    tab: 'gallery' },
          ].map(a => (
            <div key={a.tab} className="qa-card" onClick={() => onNavigate(a.tab)}>
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
            <div style={{ width: 30, height: 30, borderRadius: 8, background: l.action==='add'?'#dcfce7':l.action==='delete'?'#fee2e2':'#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
              {l.action==='add'?'➕':l.action==='delete'?'🗑️':'✏️'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: NAVY }}>{l.message}</div>
              <div style={{ fontSize: 11, color: T.t3 }}>{l.section} • {l.time ? new Date(l.time).toLocaleString() : ''}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
