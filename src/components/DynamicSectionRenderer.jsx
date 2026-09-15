// src/components/DynamicSectionRenderer.jsx
import React from 'react';
import DOMPurify from 'dompurify';

// ── Shared Dynamic Section Renderer for CMS Content ─────────────────────────
export function DynamicSectionRenderer({ section }) {
  if (!section) return null;
  const N = '#0f2347';
  const G = '#f4a023';

  let parsed = section.content;
  if (section.type !== 'text' && typeof parsed === 'string') {
    try { parsed = JSON.parse(parsed); } catch {}
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: 20,
      padding: '28px 32px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
      border: '1.5px solid #e2e8f0',
      marginBottom: 24
    }}>
      {section.heading && (
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: N, margin: '0 0 8px' }}>
            {section.heading}
          </h2>
          <div style={{ width: 44, height: 3, background: G, borderRadius: 2 }} />
        </div>
      )}

      {/* 📄 TEXT / HTML */}
      {section.type === 'text' && (
        <div
          className="rich-text-content"
          style={{ fontSize: 15, color: '#475569', lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{ __html: typeof parsed === 'string' ? DOMPurify.sanitize(parsed) : '' }}
        />
      )}

      {/* 📊 STATS */}
      {section.type === 'stats' && Array.isArray(parsed) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
          {parsed.map((st, i) => (
            <div key={i} style={{ background: '#f8fafc', borderRadius: 14, padding: 20, border: '1.5px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 6 }}>{st.icon || '📌'}</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: N }}>{st.value}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginTop: 4 }}>{st.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* 📋 LIST */}
      {section.type === 'list' && Array.isArray(parsed) && (
        <ul style={{ margin: 0, paddingLeft: 22, color: '#334155', fontSize: 15, lineHeight: 1.8 }}>
          {parsed.map((item, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              {typeof item === 'object' ? (
                <span>
                  <strong>{item.title || item.label || item.duration || item.t || ''}</strong>
                  {item.desc || item.d || item.award || item.sub ? ` — ${item.desc || item.d || item.award || item.sub}` : ''}
                </span>
              ) : item}
            </li>
          ))}
        </ul>
      )}

      {/* 👥 TABLE */}
      {section.type === 'table' && parsed?.headers && (
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: N, color: '#fff' }}>
                {parsed.headers.map((h, i) => (
                  <th key={i} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(parsed.rows || []).map((row, rIdx) => (
                <tr key={rIdx} style={{ background: rIdx % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  {Array.isArray(row) && row.map((cell, cIdx) => (
                    <td key={cIdx} style={{ padding: '11px 16px', color: '#334155' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 📅 TIMELINE */}
      {section.type === 'timeline' && Array.isArray(parsed) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {parsed.map((tl, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ background: `${G}20`, color: '#b45309', padding: '6px 12px', borderRadius: 8, fontWeight: 900, fontSize: 13, flexShrink: 0 }}>
                {tl.year || tl.month || `Step ${i + 1}`}
              </div>
              <div>
                <div style={{ fontWeight: 800, color: N, fontSize: 15 }}>{tl.title}</div>
                {tl.desc && <div style={{ color: '#64748b', fontSize: 13.5, marginTop: 4 }}>{tl.desc}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🃏 CARDS */}
      {section.type === 'cards' && Array.isArray(parsed) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
          {parsed.map((c, i) => (
            <div key={i} style={{ background: '#f8fafc', borderRadius: 14, padding: 20, border: '1.5px solid #e2e8f0' }}>
              {c.icon && <div style={{ fontSize: 32, marginBottom: 8 }}>{c.icon}</div>}
              <div style={{ fontWeight: 800, color: N, fontSize: 16, marginBottom: 6 }}>{c.title}</div>
              {c.desc && <div style={{ color: '#64748b', fontSize: 13.5, lineHeight: 1.6 }}>{c.desc}</div>}
              {c.link && (
                <a href={c.link} style={{ display: 'inline-block', marginTop: 12, color: G, fontWeight: 800, fontSize: 13, textDecoration: 'none' }}>
                  Learn more →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Renders any extra sections that are not already handled statically by the page component ──
export function DynamicSectionsContainer({ sections = [], excludeIds = [] }) {
  if (!sections || !Array.isArray(sections) || sections.length === 0) return null;
  const extra = sections.filter(s => s && s.id && !excludeIds.includes(s.id));
  if (extra.length === 0) return null;

  return (
    <div style={{ marginTop: 24 }}>
      {extra.map((sec, idx) => (
        <DynamicSectionRenderer key={sec.id || idx} section={sec} />
      ))}
    </div>
  );
}

export default DynamicSectionRenderer;
