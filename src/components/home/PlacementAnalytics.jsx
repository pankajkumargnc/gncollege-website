// src/components/home/PlacementAnalytics.jsx — Academic Placement Analytics & Career Trends
// 📊 @UI_Agent — Built with GNC Theme Tokens, Recharts, and WCAG Accessible Table Fallback

import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';

const PLACEMENT_HISTORICAL_DATA = [
  { year: '2021', students: 285, highestCTC: 6.5, avgCTC: 3.2, companies: 28 },
  { year: '2022', students: 340, highestCTC: 7.8, avgCTC: 3.6, companies: 35 },
  { year: '2023', students: 415, highestCTC: 9.2, avgCTC: 4.1, companies: 42 },
  { year: '2024', students: 490, highestCTC: 10.5, avgCTC: 4.5, companies: 51 },
  { year: '2025', students: 565, highestCTC: 11.2, avgCTC: 4.8, companies: 58 },
  { year: '2026', students: 620, highestCTC: 12.0, avgCTC: 5.2, companies: 65 }
];

const GNC_THEME = {
  navy: '#0f2347',
  gold: '#f4a023',
  navyLight: '#1e3f7c',
  goldLight: '#f7b754',
  mutedText: '#64748b',
  gridBorder: 'rgba(15, 35, 71, 0.08)',
  tooltipBg: 'rgba(15, 35, 71, 0.94)'
};

// Custom Glassmorphism Tooltip with Tabular Numbers
function CustomChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div 
      style={{
        background: GNC_THEME.tooltipBg,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(244, 160, 35, 0.3)',
        padding: '12px 16px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
        color: '#fff',
        fontFamily: "'Inter', sans-serif"
      }}
      className="tabular-nums"
    >
      <div style={{ fontWeight: 700, color: GNC_THEME.gold, marginBottom: '6px', fontSize: '13px' }}>
        Session {label}
      </div>
      {payload.map((entry, idx) => (
        <div key={`item-${idx}`} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', fontSize: '12px', marginBottom: '3px' }}>
          <span style={{ color: '#cbd5e1' }}>{entry.name}:</span>
          <span style={{ fontWeight: 600, color: entry.color }}>
            {entry.name.includes('CTC') ? `₹${entry.value} LPA` : `${entry.value} Students`}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function PlacementAnalytics({ siteSettings }) {
  const [metricMode, setMetricMode] = useState('both'); // 'both' | 'students' | 'package'

  const isEnabled = useMemo(() => {
    if (siteSettings && typeof siteSettings.enablePlacementAnalytics === 'boolean') {
      return siteSettings.enablePlacementAnalytics;
    }
    try {
      const cached = localStorage.getItem('gnc_site_settings_cache');
      if (cached) {
        const parsed = JSON.parse(atob(cached));
        if (parsed && typeof parsed.enablePlacementAnalytics === 'boolean') {
          return parsed.enablePlacementAnalytics;
        }
      }
    } catch {}
    return true;
  }, [siteSettings]);

  if (!isEnabled) return null;

  return (
    <div 
      className="placement-analytics-wrap" 
      style={{ 
        maxWidth: '1200px', 
        margin: '40px auto 0', 
        padding: 'clamp(20px, 3vw, 36px)',
        background: 'var(--surface, #ffffff)',
        border: '1px solid rgba(15, 35, 71, 0.08)',
        borderRadius: '24px',
        boxShadow: '0 12px 40px rgba(15, 35, 71, 0.06)'
      }}
    >
      {/* Header and Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: GNC_THEME.gold, background: 'rgba(244, 160, 35, 0.12)', padding: '4px 10px', borderRadius: '9999px' }}>
              Career Intelligence
            </span>
          </div>
          <h3 style={{ margin: 0, fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: 800, color: GNC_THEME.navy, letterSpacing: '-0.02em' }}>
            Year-over-Year Placement Growth
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: GNC_THEME.mutedText }}>
            Corporate recruitment trajectories and annual package evolution at Guru Nanak College
          </p>
        </div>

        {/* View Mode Pills */}
        <div style={{ display: 'flex', background: 'var(--bg, #f1f5f9)', padding: '4px', borderRadius: '12px', gap: '4px' }}>
          {[
            { id: 'both', label: 'Overview' },
            { id: 'students', label: 'Students' },
            { id: 'package', label: 'Highest Package' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setMetricMode(tab.id)}
              className="btn-tactile"
              style={{
                border: 'none',
                background: metricMode === tab.id ? GNC_THEME.navy : 'transparent',
                color: metricMode === tab.id ? '#ffffff' : '#64748b',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              aria-pressed={metricMode === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div style={{ width: '100%', height: '320px', minHeight: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PLACEMENT_HISTORICAL_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gncGoldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={GNC_THEME.gold} stopOpacity={0.35} />
                <stop offset="95%" stopColor={GNC_THEME.gold} stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gncNavyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={GNC_THEME.navy} stopOpacity={0.35} />
                <stop offset="95%" stopColor={GNC_THEME.navy} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={GNC_THEME.gridBorder} vertical={false} />
            <XAxis 
              dataKey="year" 
              stroke={GNC_THEME.mutedText} 
              fontSize={12} 
              tickLine={false} 
              axisLine={{ stroke: GNC_THEME.gridBorder }}
            />
            <YAxis 
              stroke={GNC_THEME.mutedText} 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              className="tabular-nums"
            />
            <Tooltip content={<CustomChartTooltip />} />
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle"
              wrapperStyle={{ paddingBottom: '16px', fontSize: '12px', fontWeight: 600 }}
            />

            {(metricMode === 'both' || metricMode === 'students') && (
              <Area 
                type="monotone" 
                name="Placed Students" 
                dataKey="students" 
                stroke={GNC_THEME.navy} 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#gncNavyGrad)" 
              />
            )}

            {(metricMode === 'both' || metricMode === 'package') && (
              <Area 
                type="monotone" 
                name="Highest CTC (LPA)" 
                dataKey="highestCTC" 
                stroke={GNC_THEME.gold} 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#gncGoldGrad)" 
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Accessible Screen-Reader Data Table (WCAG 2.2 Requirement) */}
      <details className="sr-only-focusable" style={{ marginTop: '16px' }}>
        <summary style={{ fontSize: '12px', cursor: 'pointer', color: GNC_THEME.navy, textDecoration: 'underline' }}>
          Show accessible placement data table for screen readers
        </summary>
        <div style={{ overflowX: 'auto', marginTop: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }} aria-label="Yearly Placement Statistics Data Table">
            <thead>
              <tr style={{ borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '8px' }}>Year</th>
                <th style={{ padding: '8px' }}>Placed Students</th>
                <th style={{ padding: '8px' }}>Highest CTC</th>
                <th style={{ padding: '8px' }}>Average CTC</th>
                <th style={{ padding: '8px' }}>Participating Companies</th>
              </tr>
            </thead>
            <tbody>
              {PLACEMENT_HISTORICAL_DATA.map(d => (
                <tr key={d.year} style={{ borderBottom: '1px solid #e2e8f0' }} className="tabular-nums">
                  <td style={{ padding: '8px', fontWeight: 700 }}>{d.year}</td>
                  <td style={{ padding: '8px' }}>{d.students}</td>
                  <td style={{ padding: '8px' }}>₹{d.highestCTC} LPA</td>
                  <td style={{ padding: '8px' }}>₹{d.avgCTC} LPA</td>
                  <td style={{ padding: '8px' }}>{d.companies}+</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
