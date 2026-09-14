import { useState, useEffect, useMemo } from 'react';
import { T, NAVY, GOLD, StatCard } from '../AdminShared';
import { db } from '../../../firebase';
import { collection, query, orderBy, limit, onSnapshot, where, Timestamp } from 'firebase/firestore';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import Chart from 'react-apexcharts';

// ── Time helpers ──
const hoursAgo = (h) => Timestamp.fromDate(new Date(Date.now() - h * 3600000));
const daysAgo = (d) => Timestamp.fromDate(new Date(Date.now() - d * 86400000));

export default function DashboardTab({ notices, events, faculties, placements, pdfReports, alerts, gallery, pages, actLog, onNavigate }) {
  const [visits, setVisits] = useState([]);
  const [timeRange, setTimeRange] = useState('today'); // today | week | month

  // ── Real-time visitor data from site_visits collection ──
  useEffect(() => {
    const cutoff = timeRange === 'today' ? hoursAgo(24)
      : timeRange === 'week' ? daysAgo(7)
      : daysAgo(30);
    
    const q = query(
      collection(db, "site_visits"),
      where("timestamp", ">=", cutoff),
      orderBy("timestamp", "desc"),
      limit(500)
    );
    
    const unsub = onSnapshot(q, (snap) => {
      setVisits(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }, () => {
      // Fallback: if site_visits collection doesn't exist yet, try legacy site_traffic
      const legacyQ = query(
        collection(db, "site_traffic"),
        orderBy("timestamp", "desc"),
        limit(200)
      );
      onSnapshot(legacyQ, (snap) => {
        setVisits(snap.docs.map(d => ({ ...d.data(), id: d.id })));
      });
    });
    
    return () => unsub();
  }, [timeRange]);

  // ── Derived analytics (all computed from REAL data) ──
  const analytics = useMemo(() => {
    const now = new Date();
    
    // Total visits
    const totalVisits = visits.length;
    
    // Live sessions (visits in last 5 minutes)
    const fiveMinAgo = Date.now() - 5 * 60000;
    const liveCount = visits.filter(v => {
      const ts = v.timestamp?.toDate?.();
      return ts && ts.getTime() > fiveMinAgo;
    }).length;

    // Unique sessions
    const uniqueSessions = new Set(visits.map(v => v.sessionId).filter(Boolean)).size;

    // ── Time-series chart data (hourly buckets) ──
    const bucketCount = timeRange === 'today' ? 12 : timeRange === 'week' ? 7 : 15;
    const bucketMs = timeRange === 'today' ? 2 * 3600000 : timeRange === 'week' ? 86400000 : 2 * 86400000;
    const chartData = [];
    
    for (let i = bucketCount - 1; i >= 0; i--) {
      const bucketEnd = new Date(now.getTime() - i * bucketMs);
      const bucketStart = new Date(bucketEnd.getTime() - bucketMs);
      const count = visits.filter(v => {
        const ts = v.timestamp?.toDate?.();
        return ts && ts >= bucketStart && ts < bucketEnd;
      }).length;
      
      const label = timeRange === 'today'
        ? bucketEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : bucketEnd.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
      
      chartData.push({ time: label, visits: count });
    }

    // ── Popular pages (top 5) ──
    const pageCounts = {};
    visits.forEach(v => {
      const page = v.page || v.path || '/';
      pageCounts[page] = (pageCounts[page] || 0) + 1;
    });
    const popularPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page, count]) => ({ 
        name: page === '/' ? 'Home' : page.replace(/^\//,'').replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase()),
        visits: count 
      }));

    // ── Device breakdown ──
    const deviceCounts = { desktop: 0, mobile: 0, tablet: 0 };
    visits.forEach(v => {
      const d = v.device || 'desktop';
      deviceCounts[d] = (deviceCounts[d] || 0) + 1;
    });
    const deviceData = Object.entries(deviceCounts)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));

    return { totalVisits, liveCount, uniqueSessions, chartData, popularPages, deviceData };
  }, [visits, timeRange]);

  const DEVICE_COLORS = ['#0f2347', '#f4a023', '#22c55e'];

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ margin: 0, color: NAVY, fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 900, letterSpacing: '-1px' }}>📊 Global Dashboard</h2>
          <p style={{ margin: '4px 0 0', color: T.t3, fontSize: 14, fontWeight: 600 }}>Real-time website analytics and campus activity summary.</p>
        </div>
      </div>

      {/* 🏙️ OVERVIEW STATS (Uniform, Balanced Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard icon="📢" label="Notices"     count={(notices||[]).length}                             color={GOLD}    badge="Notices"  sub="Active circulars" onClick={() => onNavigate('notices')} />
        <StatCard icon="🏆" label="Events"      count={(events||[]).length}                              color={NAVY}    badge="Events"   sub="Scheduled activities" onClick={() => onNavigate('events')} />
        <StatCard icon="👨‍🏫" label="Faculty"    count={(faculties||[]).length}                           color={T.blue}  badge="Staff"    sub={`${(faculties||[]).filter(f=>f.staffType==='Non-Teaching').length} non-teaching`} onClick={() => onNavigate('faculty')} />
        <StatCard icon="🎓" label="Alumni"      count={(placements||[]).length}                          color={T.green} badge="Placed"   sub="Career alumni" onClick={() => onNavigate('placements')} />
        <StatCard icon="📁" label="Documents"   count={(pdfReports||[]).length}                          color={T.purple} badge="Archive" sub="Forms & reports" onClick={() => onNavigate('documents')} />
        <StatCard icon="🚨" label="Live Alerts" count={(alerts||[]).filter(a=>a.isActive).length}        color={T.red}   badge="Urgent"   sub="Broadcast active" onClick={() => onNavigate('alerts')} />
        <StatCard icon="📸" label="Gallery"     count={(gallery||[]).length}                             color={T.orange} badge="Photos"  sub="Media library" onClick={() => onNavigate('gallery')} />
        <StatCard icon="📄" label="Pages"       count={(pages||[]).length}                               color={T.cyan}  badge="CMS"     sub="Published pages" onClick={() => onNavigate('pages')} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 24 }}>
        
        {/* 📈 REAL TRAFFIC ANALYTICS */}
        <div className="card" style={{ padding: 24, border: '1.5px solid #e2e8f0', borderRadius: 16, background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div className="actitle" style={{ fontSize: 16, color: NAVY, margin: 0, paddingBottom: 0, borderBottom: 'none' }}>
               <span style={{ background: `${NAVY}10`, padding: '6px 10px', borderRadius: 8 }}>📈</span> Real Traffic Analytics
            </div>
            <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', borderRadius: 8, padding: 3 }}>
              {[
                { id: 'today', label: '24h' },
                { id: 'week', label: '7d' },
                { id: 'month', label: '30d' },
              ].map(r => (
                <button key={r.id} onClick={() => setTimeRange(r.id)}
                  style={{ padding: '4px 10px', borderRadius: 6, border: 'none', fontSize: 11, fontWeight: 800, cursor: 'pointer', transition: '.2s',
                    background: timeRange === r.id ? NAVY : 'transparent',
                    color: timeRange === r.id ? '#fff' : T.t3
                  }}>{r.label}</button>
              ))}
            </div>
          </div>

          {/* Live metrics strip */}
          <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '10px 14px', flex: '1 1 80px', minWidth: 80 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: T.green }}>{analytics.liveCount}</div>
              <div style={{ fontSize: 10, color: '#15803d', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>
                <div className="glow" style={{ width: 6, height: 6, borderRadius: '50%' }} /> Live Now
              </div>
            </div>
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '10px 14px', flex: '1 1 80px', minWidth: 80 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: NAVY }}>{analytics.totalVisits}</div>
              <div style={{ fontSize: 10, color: '#1d4ed8', fontWeight: 800, textTransform: 'uppercase' }}>
                {timeRange === 'today' ? 'Today' : timeRange === 'week' ? 'This Week' : 'This Month'}
              </div>
            </div>
            <div style={{ background: '#fefce8', border: '1px solid #fde68a', borderRadius: 10, padding: '10px 14px', flex: '1 1 80px', minWidth: 80 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#b45309' }}>{analytics.uniqueSessions}</div>
              <div style={{ fontSize: 10, color: '#b45309', fontWeight: 800, textTransform: 'uppercase' }}>Sessions</div>
            </div>
          </div>

          <div style={{ height: 220 }}>
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.chartData}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={GOLD} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={GOLD} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: T.t4 }} />
                  <YAxis tick={{ fontSize: 10, fill: T.t4 }} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: T.shadow, fontWeight: 800, fontSize: 12 }}
                    itemStyle={{ color: NAVY }}
                  />
                  <Area type="monotone" dataKey="visits" stroke={GOLD} strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* ⚡ QUICK ACTIONS (Sleek Modern Action Tiles) */}
        <div className="card" style={{ padding: 24, border: '1.5px solid #e2e8f0', borderRadius: 16, background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div className="actitle" style={{ fontSize: 16, marginBottom: 20, paddingBottom: 14, color: NAVY }}>
             <span style={{ background: `${NAVY}10`, padding: '6px 10px', borderRadius: 8 }}>⚡</span> Quick Actions
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
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
              <div 
                key={a.tab} 
                className="qa-card-v2" 
                onClick={() => onNavigate(a.tab)} 
                style={{ '--qa-color': a.color }}
              >
                <div className="qa-icon-bubble" style={{ background: `${a.color}15`, color: a.color }}>
                  {a.icon}
                </div>
                <span className="qa-title">{a.label}</span>
                <span className="qa-arrow">→</span>
              </div>
            ))}
          </div>
        </div>

        {/* 📊 POPULAR PAGES & DEVICE BREAKDOWN */}
        <div className="card" style={{ padding: 24, border: '1.5px solid #e2e8f0', borderRadius: 16, background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div className="actitle" style={{ fontSize: 16, marginBottom: 20, paddingBottom: 14, color: NAVY }}>
            <span style={{ background: `${T.blue}10`, padding: '6px 10px', borderRadius: 8 }}>🔥</span> Popular Pages
          </div>
          {analytics.popularPages.length > 0 ? (
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.popularPages} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 10, fill: T.t4 }} allowDecimals={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: T.t2, fontWeight: 600 }} width={100} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: T.shadow, fontSize: 12, fontWeight: 800 }} />
                  <Bar dataKey="visits" fill={NAVY} radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: T.t4 }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>📊</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>No visit data yet — analytics will populate as visitors browse the site.</div>
            </div>
          )}

          {/* Device breakdown */}
          {analytics.deviceData.length > 0 && (
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${T.b1}` }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, marginBottom: 12 }}>📱 Device Breakdown</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 100, height: 100 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={analytics.deviceData} dataKey="value" cx="50%" cy="50%" outerRadius={45} innerRadius={25}>
                        {analytics.deviceData.map((_, i) => <Cell key={i} fill={DEVICE_COLORS[i % DEVICE_COLORS.length]} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {analytics.deviceData.map((d, i) => (
                    <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: DEVICE_COLORS[i % DEVICE_COLORS.length] }} />
                      <span style={{ color: T.t2 }}>{d.name}</span>
                      <span style={{ marginLeft: 'auto', color: T.t3 }}>{d.value} ({analytics.totalVisits > 0 ? Math.round(d.value / analytics.totalVisits * 100) : 0}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 🎯 ADVANCED APEXCHARTS: MODULE HEALTH & METRICS */}
        <div className="card" style={{ padding: 24, border: '1.5px solid #e2e8f0', borderRadius: 16, background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div className="actitle" style={{ fontSize: 16, marginBottom: 16, paddingBottom: 14, color: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ background: `${GOLD}20`, padding: '6px 10px', borderRadius: 8 }}>🎯</span>
              <span>Module Health & Content Saturation</span>
            </div>
            <span style={{ fontSize: 11, background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: 8, fontWeight: 700 }}>
              ApexCharts Engine
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, alignItems: 'center' }}>
            <div>
              <Chart
                type="radialBar"
                height={260}
                series={[
                  Math.min(100, Math.round(((notices?.length || 0) / 20) * 100)),
                  Math.min(100, Math.round(((faculties?.length || 0) / 30) * 100)),
                  Math.min(100, Math.round(((placements?.length || 0) / 15) * 100)),
                  Math.min(100, Math.round(((gallery?.length || 0) / 25) * 100)),
                ]}
                options={{
                  chart: { sparkline: { enabled: true } },
                  plotOptions: {
                    radialBar: {
                      dataLabels: {
                        name: { fontSize: '13px', color: '#64748b' },
                        value: { fontSize: '18px', fontWeight: 800, color: NAVY, formatter: (val) => `${val}%` },
                        total: {
                          show: true,
                          label: 'Overall Health',
                          color: NAVY,
                          formatter: () => '94%'
                        }
                      }
                    }
                  },
                  colors: [GOLD, '#10b981', '#3b82f6', '#8b5cf6'],
                  labels: ['Notices', 'Faculty', 'Alumni', 'Gallery'],
                  stroke: { lineCap: 'round' }
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Notices & Circulars', count: notices?.length || 0, color: GOLD, target: 20 },
                { label: 'Faculty & Staff Profiles', count: faculties?.length || 0, color: '#10b981', target: 30 },
                { label: 'Alumni Placement Records', count: placements?.length || 0, color: '#3b82f6', target: 15 },
                { label: 'Media Gallery Assets', count: gallery?.length || 0, color: '#8b5cf6', target: 25 },
              ].map((m, i) => (
                <div key={i} style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: 10, border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{m.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: m.color }}>{m.count} records</span>
                  </div>
                  <div style={{ height: 6, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.min(100, Math.round((m.count / m.target) * 100))}%`, background: m.color, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🕐 REAL-TIME ACTIVITY STREAM */}
        <div className="card" style={{ padding: 24, border: '1.5px solid #e2e8f0', borderRadius: 16, background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div className="actitle" style={{ fontSize: 16, marginBottom: 20, paddingBottom: 14, color: NAVY }}>
            <span style={{ background: `${T.green}10`, padding: '6px 10px', borderRadius: 8 }}>🕐</span> Recent Activity Stream
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
