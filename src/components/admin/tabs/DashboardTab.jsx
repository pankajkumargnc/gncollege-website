import { T, NAVY, GOLD, StatCard } from '../AdminShared';
import toast from 'react-hot-toast';

export default function DashboardTab({ notices, events, faculties, placements, pdfReports, alerts, gallery, pages, actLog, onNavigate }) {
  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, color: NAVY, fontSize: 28, fontWeight: 900, letterSpacing: '-1px' }}>📊 Global Dashboard</h2>
          <p style={{ margin: '4px 0 0', color: T.t3, fontSize: 15, fontWeight: 600 }}>Real-time website ecosystem metrics aur campus activity summary.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
            <button className="abtn abtn-navy" style={{ borderRadius: 12, height: 42, background: NAVY, color: '#fff', border: 'none' }} onClick={() => toast.success('Gathering news... PDF Newsletter generating!')}>
                🗞️ Generate Monthly Newsletter
            </button>
        </div>
      </div>

      {/* 🏙️ OVERVIEW STATS (Ultra Pro Max Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
        <StatCard icon="📢" label="Notices"     count={(notices||[]).length}                             color={GOLD}    onClick={() => onNavigate('notices')} />
        <StatCard icon="🏆" label="Events"      count={(events||[]).length}                              color={NAVY}    onClick={() => onNavigate('events')} />
        <StatCard icon="👨‍🏫" label="Faculty"    count={(faculties||[]).length}                           color={T.blue}  sub={`${(faculties||[]).filter(f=>f.staffType==='Non-Teaching').length} non-teaching`} onClick={() => onNavigate('faculty')} />
        <StatCard icon="🎓" label="Alumni"      count={(placements||[]).length}                          color={T.green} onClick={() => onNavigate('placements')} />
        <StatCard icon="📁" label="Documents"   count={(pdfReports||[]).length}                          color={T.purple} onClick={() => onNavigate('documents')} />
        <StatCard icon="🚨" label="Live Alerts" count={(alerts||[]).filter(a=>a.isActive).length}        color={T.red}   onClick={() => onNavigate('alerts')} />
        <StatCard icon="📸" label="Gallery"     count={(gallery||[]).length}                             color={T.orange} onClick={() => onNavigate('gallery')} />
        <StatCard icon="📄" label="Pages"       count={(pages||[]).length}                               color={T.cyan}  onClick={() => onNavigate('pages')} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24 }}>
        
        {/* 🗺️ REAL-TIME VISITOR LIVE-MAP (Simulated Ultra Pro) */}
        <div className="card" style={{ padding: 24, border: `1.5px solid #f1f5f9`, background: '#fff', overflow: 'hidden' }}>
          <div className="actitle" style={{ fontSize: 17, marginBottom: 24, paddingBottom: 16, color: NAVY }}>
             <span style={{ background: `${NAVY}10`, padding: 8, borderRadius: 10 }}>🗺️</span> Real-time Visitor Live-Map
          </div>
          <div style={{ height: 260, position: 'relative', background: '#f8fafc', borderRadius: 20, border: `1px solid rgba(15,35,71,0.05)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             {/* SIMULATED MAP SVG OVERLAY */}
             <div style={{ position: 'absolute', inset: 20, opacity: 0.1, background: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg") center/contain no-repeat' }} />
             
             {/* GLOWING DOTS (Simulating Live Traffic) */}
             {[
                { t: '20%', l: '72%', n: 'Dhanbad (You)' },
                { t: '45%', l: '65%', n: 'Delhi' },
                { t: '52%', l: '78%', n: 'Kolkata' },
                { t: '38%', l: '25%', n: 'London' },
                { t: '42%', l: '35%', n: 'Dubai' },
             ].map((dot, i) => (
                <div key={i} style={{ position: 'absolute', top: dot.t, left: dot.l, zIndex: 2 }}>
                    <div className="pulse-green" style={{ width: 10, height: 10, background: i===0?NAVY:'#22c55e', borderRadius: '50%', boxShadow: `0 0 15px ${i===0?NAVY:'#22c55e'}` }} />
                    <div style={{ position: 'absolute', top: 15, left: -20, whiteSpace: 'nowrap', fontSize: 9, color: '#fff', fontWeight: 900, background: 'rgba(15,35,71,0.8)', padding: '2px 6px', borderRadius: 4, backdropFilter: 'blur(4px)' }}>{dot.n}</div>
                </div>
             ))}
             
             <div style={{ position: 'absolute', bottom: 20, left: 20, display: 'flex', gap: 20 }}>
                 <div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: NAVY }}>128</div>
                    <div style={{ fontSize: 10, color: T.t4, fontWeight: 700, textTransform: 'uppercase' }}>Live Sessions</div>
                 </div>
                 <div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: T.green }}>1,442</div>
                    <div style={{ fontSize: 10, color: T.t4, fontWeight: 700, textTransform: 'uppercase' }}>Today's Views</div>
                 </div>
             </div>
          </div>
        </div>

        {/* ⚡ ADVANCED QUICK ACTIONS */}
        <div className="card" style={{ padding: 24, border: '1.5px solid #f1f5f9', background: '#fff' }}>
          <div className="actitle" style={{ fontSize: 17, marginBottom: 24, paddingBottom: 16, color: NAVY }}>
             <span style={{ background: `${NAVY}10`, padding: 8, borderRadius: 10 }}>⚡</span> Quick Actions
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
            {[
              { icon: '📢', label: 'Add Notice',  tab: 'notices', color: GOLD },
              { icon: '📣', label: 'Add News',     tab: 'announcements', color: T.purple },
              { icon: '🏆', label: 'Add Event',    tab: 'events', color: T.green },
              { icon: '📁', label: 'Add Doc',      tab: 'documents', color: T.blue },
              { icon: '👨‍🏫', label: 'Add Staff',  tab: 'faculty', color: T.cyan },
              { icon: '🎓', label: 'Add Alumni',   tab: 'placements', color: T.navyL },
              { icon: '🚨', label: 'New Alert',    tab: 'alerts', color: T.red },
              { icon: '📸', label: 'Add Photo',    tab: 'gallery', color: T.orange },
            ].map(a => (
              <div key={a.tab} className="qa-card" onClick={() => onNavigate(a.tab)} style={{ background: '#fff' }}>
                <div style={{ fontSize: 32, marginBottom: 12, display: 'inline-block', filter: `drop-shadow(0 4px 10px ${a.color}30)` }}>{a.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: NAVY }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 🕐 REAL-TIME ACTIVITY STREAM */}
        <div className="card" style={{ padding: 24, border: '1.5px solid #f1f5f9', background: '#fff' }}>
          <div className="actitle" style={{ fontSize: 17, marginBottom: 24, paddingBottom: 16, color: NAVY }}>
            <span style={{ background: `${T.green}10`, padding: 8, borderRadius: 10 }}>🕐</span> Recent Activity Stream
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, background: `${T.green}10`, padding: '4px 10px', borderRadius: 20 }}>
              <div className="glow" style={{ width: 8, height: 8, borderRadius: '50%' }} />
              <span style={{ fontSize: 11, color: T.green, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>Live Sync</span>
            </div>
          </div>
          
          <div style={{ maxHeight: 420, overflowY: 'auto', paddingRight: 6 }} className="adm-scroll">
            {actLog.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.5 }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>🧊</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.t4 }}>No activity streams detected.</div>
              </div>
            ) : (
              actLog.slice(0, 10).map((l, idx) => (
                <div key={l.id || idx} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: idx === actLog.slice(0,10).length - 1 ? 'none' : `1px dashed #f1f5f9`, transition: 'all 0.2s' }} className="activity-item">
                  <div style={{ 
                    width: 44, height: 44, borderRadius: 12, 
                    background: l.action==='add'?'#dcfce7':l.action==='delete'?'#fee2e2':'#fef3c7', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                    flexShrink: 0
                  }}>
                    {l.action==='add'?'➕':l.action==='delete'?'🗑️':'✏️'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 800, color: NAVY, marginBottom: 2 }}>{l.message}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                       <span style={{ fontSize: 11, color: T.t3, background: '#f8fafc', padding: '2px 8px', borderRadius: 6, fontWeight: 800, textTransform: 'uppercase' }}>{l.section}</span>
                       <span style={{ fontSize: 11, color: T.t4, fontWeight: 600 }}>{l.time ? new Date(l.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
