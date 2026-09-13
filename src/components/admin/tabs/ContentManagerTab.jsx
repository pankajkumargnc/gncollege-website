// src/components/admin/tabs/ContentManagerTab.jsx
// ═══════════════════════════════════════════════════════════════════
// GNC ADMIN — Enhanced Content Manager Tab (Next-Gen CMS Page Builder)
// Features: Live Split-Screen Preview, AI Smart Assist, Section Reordering,
// Templates, SEO SERP Audit, JSON Export/Import, & Revision History
// ═══════════════════════════════════════════════════════════════════
import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense, useRef } from 'react';
import { collection, doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import { NAVY, GOLD, WHITE, BG, T, useDebounce } from '../AdminShared';
import toast from 'react-hot-toast';
import DEFAULT_PAGE_CONTENT from '../../../data/defaultPageContent';
import DOMPurify from 'dompurify';

const JoditEditor = lazy(() => import('jodit-react'));

// ── Page slugs grouped by category ──
const PAGE_CATEGORIES = [
  {
    label: 'About Us',
    icon: '🏛️',
    pages: [
      { slug: 'vision-mission', label: 'Vision & Mission', path: '/about-us/vision-mission' },
      { slug: 'principal-message', label: "Principal's Message", path: '/about-us/principal-message' },
      { slug: 'organogram', label: 'Organogram', path: '/about-us/college-management/organogram' },
      { slug: 'governing-body', label: 'Governing Body', path: '/about-us/governing-body' },
      { slug: 'staff-council', label: 'Staff Council', path: '/about-us/staff-council' },
      { slug: 'sikh-heritage', label: 'Sikh Heritage', path: '/about-us/sikh-heritage' },
    ]
  },
  {
    label: 'Committees',
    icon: '📋',
    pages: [
      { slug: 'womens-cell', label: "Women's Cell", path: '/about-us/various-committees/womens-cell' },
      { slug: 'anti-ragging', label: 'Anti-Ragging', path: '/about-us/various-committees/anti-ragging' },
      { slug: 'sc-st', label: 'SC/ST Cell', path: '/about-us/various-committees/sc-st' },
      { slug: 'obc', label: 'OBC Cell', path: '/about-us/various-committees/obc' },
      { slug: 'grievance', label: 'Grievance Cell', path: '/about-us/various-committees/grievance' },
      { slug: 'icc', label: 'ICC', path: '/about-us/various-committees/icc' },
      { slug: 'minority', label: 'Minority Cell', path: '/about-us/various-committees/minority' },
      { slug: 'placement', label: 'Placement Cell', path: '/about-us/various-committees/placement' },
      { slug: 'rusa', label: 'RUSA Cell', path: '/about-us/various-committees/rusa' },
    ]
  },
  {
    label: 'Academics',
    icon: '🎓',
    pages: [
      { slug: 'course-offered', label: 'Courses Offered', path: '/academics/course-offered' },
      { slug: 'academic-calendar', label: 'Academic Calendar', path: '/academics/academic-calendar' },
    ]
  },
  {
    label: 'Admission',
    icon: '📝',
    pages: [
      { slug: 'admission-rule', label: 'Admission Procedure', path: '/admission/rule' },
      { slug: 'document-required', label: 'Documents Required', path: '/admission/document-required' },
      { slug: 'fee-structure', label: 'Fee Structure', path: '/admission/fee-structure' },
      { slug: 'intake-capacity', label: 'Intake Capacity', path: '/admission/intake-capacity' },
    ]
  },
  {
    label: 'Activities',
    icon: '🏆',
    pages: [
      { slug: 'nss', label: 'NSS', path: '/activity/nss' },
      { slug: 'ncc', label: 'NCC', path: '/activity/ncc' },
      { slug: 'workshop', label: 'Workshops', path: '/activity/workshop' },
      { slug: 'games-sports', label: 'Games & Sports', path: '/activity/games-sports' },
      { slug: 'rotaract-club', label: 'Rotaract Club', path: '/activity/collaboration/rotaract-club' },
      { slug: 'sadbhavana-diwas', label: 'Sadbhavana Diwas', path: '/activity/collaboration/sadbhavana-diwas' },
    ]
  },
  {
    label: 'Campus',
    icon: '🏫',
    pages: [
      { slug: 'infrastructure', label: 'Infrastructure', path: '/campus/infrastructure' },
      { slug: 'classrooms', label: 'Classrooms', path: '/campus/classroom' },
      { slug: 'ict-rooms', label: 'ICT & Computer Labs', path: '/campus/ict-rooms' },
      { slug: 'green-campus', label: 'Green Campus', path: '/campus/green-campus' },
    ]
  },
  {
    label: 'Other',
    icon: '📊',
    pages: [
      { slug: 'site-counters', label: 'Homepage Counters', path: '/' },
    ]
  }
];

// ── Section Template Presets ──
const SECTION_TEMPLATES = [
  {
    type: 'text',
    name: 'Rich Text Article / Callout',
    icon: '📄',
    desc: 'Formatted paragraphs, bold text, links and images',
    defaultHeading: 'Overview & Guidelines',
    defaultContent: '<p>Welcome to <strong>Guru Nanak College</strong>. This section contains official guidelines and information.</p>'
  },
  {
    type: 'stats',
    name: 'Key Metrics & Statistics Grid',
    icon: '📊',
    desc: 'Numbers, percentages, and milestone achievement counters',
    defaultHeading: 'Key Highlights',
    defaultContent: [
      { label: 'Enrolled Students', value: '4,000+', icon: '👨‍🎓' },
      { label: 'Pass Percentage', value: '98.4%', icon: '🏆' },
      { label: 'Campus Placement Rate', value: '85%+', icon: '💼' },
      { label: 'Years of Legacy', value: '56 Years', icon: '🏛️' }
    ]
  },
  {
    type: 'table',
    name: 'Committee / Member Table',
    icon: '👥',
    desc: 'Structured rows and columns for committee or faculty details',
    defaultHeading: 'Committee Members',
    defaultContent: {
      headers: ['Sl No', 'Member Name', 'Designation / Role', 'Department', 'Contact'],
      rows: [
        ['1', 'Dr. Sanjay Prasad', 'Chairman / Principal', 'Administration', 'principal@gncollege.org'],
        ['2', 'Prof. Amarjeet Singh', 'Convener', 'Commerce', 'amarjeet@gncollege.org'],
        ['3', 'Dr. Neha Kumari', 'Member Secretary', 'Science', 'neha@gncollege.org']
      ]
    }
  },
  {
    type: 'timeline',
    name: 'Chronological Timeline',
    icon: '📅',
    desc: 'Milestones, sequence of events, or historic steps',
    defaultHeading: 'Historic Milestones',
    defaultContent: [
      { year: '1970', title: 'College Foundation', desc: 'Established in the heart of Dhanbad under visionary leadership.' },
      { year: '2005', title: 'Vocational BCA / BBA Inception', desc: 'Introduced high-placement professional tech degree courses.' },
      { year: '2022', title: 'NAAC Accreditation Grade B', desc: 'Recognized for high quality teaching and social inclusion.' }
    ]
  },
  {
    type: 'list',
    name: 'Structured Checklist / Points',
    icon: '📋',
    desc: 'Bulleted list of rules, requirements, or objectives',
    defaultHeading: 'Important Instructions',
    defaultContent: [
      'Original Admit Card and Marksheet of qualifying exam (10+2).',
      'Transfer Certificate (TC) / College Leaving Certificate (CLC).',
      'Caste or Minority certificate issued by competent authority if applicable.',
      'Recent passport size colored photographs.'
    ]
  },
  {
    type: 'cards',
    name: 'Feature Information Cards',
    icon: '🃏',
    desc: 'Interactive grid cards with icons, summary, and links',
    defaultHeading: 'Facilities & Resources',
    defaultContent: [
      { title: 'Central Digital Library', desc: 'Access to 40,000+ volumes, DELNET and INFLIBNET N-LIST.', icon: '📚', link: '/publication/college-library' },
      { title: 'High-Tech Computing Lab', desc: 'Equipped with 100+ modern systems and fiber connectivity.', icon: '💻', link: '/campus/ict-rooms' },
      { title: 'Career & Placement Cell', desc: 'Annual campus recruitment and corporate career workshops.', icon: '🎯', link: '/academics/placements' }
    ]
  }
];

const cardStyle = {
  background: WHITE,
  borderRadius: 16,
  padding: 24,
  border: `1.5px solid ${T.b1}`,
  boxShadow: T.shadow,
};

// ── Single Section Editor Component ──
function SectionEditor({
  section,
  index,
  totalSections,
  onChange,
  onRemove,
  onMove,
  onDuplicate,
  onAIAssist
}) {
  const [expanded, setExpanded] = useState(index === 0);
  const [jsonError, setJsonError] = useState(null);

  const update = (key, val) => {
    onChange(index, { ...section, [key]: val });
  };

  const isJsonContent = section.type !== 'text';
  let contentDisplay = section.content || '';
  if (isJsonContent && typeof contentDisplay === 'string') {
    try {
      contentDisplay = JSON.stringify(JSON.parse(contentDisplay), null, 2);
    } catch {}
  } else if (typeof contentDisplay === 'object') {
    contentDisplay = JSON.stringify(contentDisplay, null, 2);
  }

  const handleJsonChange = (rawText) => {
    try {
      JSON.parse(rawText);
      setJsonError(null);
      update('content', rawText);
    } catch (err) {
      setJsonError(err.message);
      update('content', rawText);
    }
  };

  return (
    <div style={{
      background: BG,
      borderRadius: 14,
      border: `1.5px solid ${expanded ? GOLD : T.b1}`,
      overflow: 'hidden',
      marginBottom: 14,
      boxShadow: expanded ? '0 4px 18px rgba(15,35,71,0.06)' : 'none',
      transition: 'all .25s ease'
    }}>
      {/* Header Bar */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          background: expanded ? 'rgba(244,160,35,0.08)' : 'transparent',
          borderBottom: expanded ? `1px solid ${T.b1}` : 'none'
        }}
      >
        <span style={{ fontSize: 11, color: T.t3, transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform .2s' }}>▶</span>
        
        <span style={{
          fontSize: 10.5,
          fontWeight: 800,
          color: GOLD,
          background: `${GOLD}18`,
          padding: '3px 8px',
          borderRadius: 6,
          textTransform: 'uppercase',
          letterSpacing: 0.8
        }}>
          {section.type || 'text'}
        </span>

        <span style={{ fontWeight: 800, color: NAVY, fontSize: 14, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {section.heading || 'Untitled Section'}
        </span>

        <span style={{ fontSize: 11, color: T.t3, fontFamily: 'monospace', opacity: 0.7 }}>
          #{section.id}
        </span>

        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} onClick={e => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => onMove(index, -1)}
            disabled={index === 0}
            style={{
              background: '#fff', border: `1px solid ${T.b1}`, color: index === 0 ? '#cbd5e1' : NAVY,
              width: 26, height: 26, borderRadius: 6, cursor: index === 0 ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11
            }}
            title="Move Up"
          >▲</button>

          <button
            type="button"
            onClick={() => onMove(index, 1)}
            disabled={index === totalSections - 1}
            style={{
              background: '#fff', border: `1px solid ${T.b1}`, color: index === totalSections - 1 ? '#cbd5e1' : NAVY,
              width: 26, height: 26, borderRadius: 6, cursor: index === totalSections - 1 ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11
            }}
            title="Move Down"
          >▼</button>

          <button
            type="button"
            onClick={() => onDuplicate(index)}
            style={{
              background: '#fff', border: `1px solid ${T.b1}`, color: '#0284c7',
              height: 26, padding: '0 8px', borderRadius: 6, cursor: 'pointer',
              fontSize: 11, fontWeight: 700
            }}
            title="Duplicate Section"
          >📑 Copy</button>

          <button
            type="button"
            onClick={() => onAIAssist(index)}
            style={{
              background: 'linear-gradient(135deg, #f4a023, #d97706)',
              border: 'none', color: '#fff', height: 26, padding: '0 8px',
              borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 800,
              display: 'flex', alignItems: 'center', gap: 4
            }}
            title="AI Smart Assist"
          >✨ AI</button>

          <button
            type="button"
            onClick={() => { if (window.confirm(`Delete section "${section.heading || section.id}"?`)) onRemove(index); }}
            style={{
              background: 'rgba(239,68,68,.1)', border: 'none', color: '#ef4444',
              width: 26, height: 26, borderRadius: 6, fontSize: 12, fontWeight: 800, cursor: 'pointer'
            }}
            title="Delete Section"
          >✕</button>
        </div>
      </div>

      {/* Expanded Editor Body */}
      {expanded && (
        <div style={{ padding: '16px 20px', background: WHITE }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 140px', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: T.t3, marginBottom: 4, display: 'block' }}>
                Section ID (Anchor)
              </label>
              <input
                value={section.id || ''}
                onChange={e => update('id', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: `1.5px solid ${T.b1}`, borderRadius: 8, fontSize: 13, fontWeight: 600 }}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: T.t3, marginBottom: 4, display: 'block' }}>
                Section Heading
              </label>
              <input
                value={section.heading || ''}
                onChange={e => update('heading', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: `1.5px solid ${T.b1}`, borderRadius: 8, fontSize: 13, fontWeight: 600 }}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: T.t3, marginBottom: 4, display: 'block' }}>
                Format / Type
              </label>
              <select
                value={section.type || 'text'}
                onChange={e => update('type', e.target.value)}
                style={{ width: '100%', padding: '8px 10px', border: `1.5px solid ${T.b1}`, borderRadius: 8, fontSize: 12.5, fontWeight: 700, background: WHITE }}
              >
                <option value="text">📄 Text (HTML)</option>
                <option value="list">📋 List (JSON)</option>
                <option value="table">👥 Table (JSON)</option>
                <option value="stats">📊 Stats (JSON)</option>
                <option value="timeline">📅 Timeline (JSON)</option>
                <option value="cards">🃏 Cards (JSON)</option>
              </select>
            </div>
          </div>

          {section.type === 'text' ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 11.5, fontWeight: 700, color: T.t2 }}>
                  Rich Text Content (HTML Format)
                </label>
                <button
                  type="button"
                  onClick={() => onAIAssist(index)}
                  style={{ background: 'none', border: 'none', color: '#b45309', fontWeight: 800, fontSize: 11.5, cursor: 'pointer' }}
                >
                  ✨ Polish with AI
                </button>
              </div>

              <Suspense fallback={<div style={{ padding: 20, textAlign: 'center', color: T.t3 }}>Loading Rich Editor...</div>}>
                <JoditEditor
                  value={section.content || ''}
                  config={{
                    readonly: false,
                    height: 280,
                    buttons: 'bold,italic,underline,strikethrough,|,ul,ol,|,paragraph,fontsize,brush,|,table,link,|,align,undo,redo,|,source',
                    toolbarAdaptive: false,
                    showCharsCounter: false,
                    showWordsCounter: false,
                    showXPathInStatusbar: false,
                  }}
                  onBlur={newContent => update('content', newContent)}
                />
              </Suspense>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 11.5, fontWeight: 700, color: T.t2 }}>
                  Structured JSON Data ({section.type})
                </label>
                {jsonError ? (
                  <span style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>
                    ⚠️ Invalid JSON: {jsonError}
                  </span>
                ) : (
                  <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 700 }}>
                    ✓ JSON Valid
                  </span>
                )}
              </div>

              <textarea
                value={contentDisplay}
                onChange={e => handleJsonChange(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: 200,
                  padding: 14,
                  border: `1.5px solid ${jsonError ? '#ef4444' : T.b1}`,
                  borderRadius: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  lineHeight: 1.6,
                  resize: 'vertical',
                  background: '#f8fafc'
                }}
                spellCheck={false}
              />
              <div style={{ fontSize: 11, color: T.t3, marginTop: 4 }}>
                💡 Tip: Edit JSON directly. Changes reflect in real-time in the Live Preview pane.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Live Page Visual Preview Component ──
function LiveVisualPreview({ data, slug }) {
  if (!data) return null;

  return (
    <div style={{
      background: '#f8fafc',
      borderRadius: 16,
      overflow: 'hidden',
      border: '1.5px solid #e2e8f0',
      boxShadow: '0 8px 30px rgba(15,35,71,0.06)'
    }}>
      {/* Simulated Browser Bar */}
      <div style={{
        background: '#0f2347',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        color: '#fff'
      }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.12)',
          padding: '4px 14px',
          borderRadius: 20,
          fontSize: 11.5,
          fontFamily: 'monospace',
          color: '#cbd5e1',
          flex: 1,
          textAlign: 'center'
        }}>
          https://gncollege.org/p/{slug || 'page'}
        </div>
        <span style={{ fontSize: 11, color: '#f4a023', fontWeight: 800 }}>LIVE PREVIEW</span>
      </div>

      {/* Hero Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f2347 0%, #1a3a7c 100%)',
        padding: '40px 32px',
        color: '#fff',
        position: 'relative',
        borderBottom: '4px solid #f4a023'
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(244,160,35,0.2)',
          color: '#f4a023',
          border: '1px solid #f4a023',
          padding: '4px 12px',
          borderRadius: 20,
          fontSize: 11,
          fontWeight: 800,
          textTransform: 'uppercase',
          marginBottom: 10
        }}>
          Guru Nanak College • {slug}
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
          {data.title || 'Page Title'}
        </h1>
        {data.subtitle && (
          <p style={{ margin: 0, fontSize: 14.5, color: 'rgba(255,255,255,0.8)', maxWidth: 640 }}>
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Page Body Content */}
      <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 28 }}>
        {(data.sections || []).length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>
            No sections yet. Add sections to see live rendering.
          </div>
        ) : (
          (data.sections || []).map((sec, idx) => {
            let parsedContent = sec.content;
            if (sec.type !== 'text' && typeof parsedContent === 'string') {
              try { parsedContent = JSON.parse(parsedContent); } catch {}
            }

            return (
              <div key={sec.id || idx} style={{
                background: '#fff',
                borderRadius: 14,
                padding: '22px 26px',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(15,35,71,0.03)'
              }}>
                {sec.heading && (
                  <div style={{ marginBottom: 16 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f2347', margin: '0 0 6px 0' }}>
                      {sec.heading}
                    </h3>
                    <div style={{ width: 42, height: 3, background: '#f4a023', borderRadius: 2 }} />
                  </div>
                )}

                {/* Render by Type */}
                {sec.type === 'text' && (
                  <div
                    style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.7 }}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sec.content || '') }}
                  />
                )}

                {sec.type === 'stats' && Array.isArray(parsedContent) && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
                    {parsedContent.map((st, i) => (
                      <div key={i} style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: 12,
                        padding: 16,
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: 24, marginBottom: 4 }}>{st.icon || '📌'}</div>
                        <div style={{ fontSize: 20, fontWeight: 900, color: '#0f2347' }}>{st.value}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginTop: 2 }}>{st.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {sec.type === 'table' && parsedContent?.headers && (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: '#0f2347', color: '#fff' }}>
                          {parsedContent.headers.map((h, i) => (
                            <th key={i} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 800 }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(parsedContent.rows || []).map((row, rIdx) => (
                          <tr key={rIdx} style={{ background: rIdx % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            {Array.isArray(row) ? row.map((cell, cIdx) => (
                              <td key={cIdx} style={{ padding: '10px 14px', color: '#334155' }}>{cell}</td>
                            )) : null}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {sec.type === 'timeline' && Array.isArray(parsedContent) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', paddingLeft: 20 }}>
                    <div style={{ position: 'absolute', left: 6, top: 4, bottom: 4, width: 2, background: '#f4a023' }} />
                    {parsedContent.map((t, i) => (
                      <div key={i} style={{ position: 'relative' }}>
                        <div style={{
                          position: 'absolute', left: -18, top: 4, width: 10, height: 10,
                          borderRadius: '50%', background: '#0f2347', border: '2px solid #f4a023'
                        }} />
                        <span style={{ fontSize: 12, fontWeight: 900, color: '#b45309' }}>{t.year}</span>
                        <div style={{ fontWeight: 800, color: '#0f2347', fontSize: 14 }}>{t.title}</div>
                        <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{t.desc}</div>
                      </div>
                    ))}
                  </div>
                )}

                {sec.type === 'list' && Array.isArray(parsedContent) && (
                  <ul style={{ margin: 0, paddingLeft: 20, color: '#334155', lineHeight: 1.8, fontSize: 14 }}>
                    {parsedContent.map((li, i) => (
                      <li key={i}>{typeof li === 'string' ? li : JSON.stringify(li)}</li>
                    ))}
                  </ul>
                )}

                {sec.type === 'cards' && Array.isArray(parsedContent) && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
                    {parsedContent.map((c, i) => (
                      <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                        <div style={{ fontSize: 22, marginBottom: 4 }}>{c.icon || '🔗'}</div>
                        <div style={{ fontWeight: 800, color: '#0f2347', fontSize: 13.5 }}>{c.title}</div>
                        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{c.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ── Main Enhanced Content Manager Tab ──
export default function ContentManagerTab({ logAct }) {
  const [allPages, setAllPages] = useState({});
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [editData, setEditData] = useState(null);
  const [historySnapshot, setHistorySnapshot] = useState(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  // View mode: 'editor' | 'split' | 'preview'
  const [viewMode, setViewMode] = useState('editor');

  // Modals
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [aiModal, setAiModal] = useState({ open: false, sectionIndex: null, prompt: '', loading: false });

  // ── Subscribe to all pageContent documents ──
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'pageContent'), snap => {
      const data = {};
      snap.docs.forEach(d => { data[d.id] = { id: d.id, ...d.data() }; });
      setAllPages(data);
    }, err => {
      console.warn('[ContentManager] Error:', err.message);
    });
    return () => unsub();
  }, []);

  // ── Select a page ──
  const selectPage = useCallback(slug => {
    if (isDirty && !window.confirm('You have unsaved changes. Discard them?')) return;
    setSelectedSlug(slug);
    const pageData = allPages[slug];
    if (pageData) {
      const copy = JSON.parse(JSON.stringify(pageData));
      setEditData(copy);
      setHistorySnapshot(JSON.parse(JSON.stringify(copy)));
    } else if (DEFAULT_PAGE_CONTENT[slug]) {
      const defaults = DEFAULT_PAGE_CONTENT[slug];
      const copy = {
        slug,
        ...JSON.parse(JSON.stringify(defaults)),
        _source: 'default'
      };
      setEditData(copy);
      setHistorySnapshot(JSON.parse(JSON.stringify(copy)));
    } else {
      const meta = PAGE_CATEGORIES.flatMap(c => c.pages).find(p => p.slug === slug);
      const copy = {
        slug, title: meta?.label || slug, subtitle: '', sections: [], seo: { title: '', description: '' },
        _source: 'empty'
      };
      setEditData(copy);
      setHistorySnapshot(JSON.parse(JSON.stringify(copy)));
    }
    setIsDirty(false);
  }, [allPages, isDirty]);

  // ── Keyboard shortcut for Ctrl+S / Cmd+S ──
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (isDirty) handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDirty, editData, selectedSlug]);

  // ── Save to Firestore ──
  const handleSave = useCallback(async () => {
    if (!editData || !selectedSlug) return;
    setSaving(true);
    try {
      const processedSections = (editData.sections || []).map(s => {
        if (s.type !== 'text' && typeof s.content === 'string') {
          try { return { ...s, content: JSON.parse(s.content) }; }
          catch { /* keep as is */ }
        }
        return s;
      });

      const payload = {
        ...editData,
        sections: processedSections,
        updatedAt: serverTimestamp(),
        _version: (allPages[selectedSlug]?._version || 0) + 1,
      };
      delete payload.id;

      await setDoc(doc(db, 'pageContent', selectedSlug), payload, { merge: true });
      if (logAct) logAct('update', `Content updated: ${editData.title}`, 'pageContent');
      toast.success(`✅ "${editData.title}" saved successfully!`);
      setHistorySnapshot(JSON.parse(JSON.stringify(payload)));
      setIsDirty(false);
    } catch (err) {
      console.error('[ContentManager] Save error:', err);
      toast.error(`❌ Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }, [editData, selectedSlug, allPages, logAct]);

  // ── Undo to last snapshot ──
  const handleUndo = () => {
    if (!historySnapshot) return;
    if (window.confirm('Restore content back to last saved snapshot?')) {
      setEditData(JSON.parse(JSON.stringify(historySnapshot)));
      setIsDirty(false);
      toast.success('↩ Restored last saved snapshot');
    }
  };

  // ── Section Handlers ──
  const updateSection = useCallback((index, updated) => {
    setEditData(prev => {
      const sections = [...(prev.sections || [])];
      sections[index] = updated;
      return { ...prev, sections };
    });
    setIsDirty(true);
  }, []);

  const removeSection = useCallback(index => {
    setEditData(prev => {
      const sections = [...(prev.sections || [])];
      sections.splice(index, 1);
      return { ...prev, sections };
    });
    setIsDirty(true);
  }, []);

  const moveSection = useCallback((index, direction) => {
    setEditData(prev => {
      const sections = [...(prev.sections || [])];
      const target = index + direction;
      if (target < 0 || target >= sections.length) return prev;
      const temp = sections[index];
      sections[index] = sections[target];
      sections[target] = temp;
      return { ...prev, sections };
    });
    setIsDirty(true);
  }, []);

  const duplicateSection = useCallback((index) => {
    setEditData(prev => {
      const sections = [...(prev.sections || [])];
      const source = sections[index];
      const clone = {
        ...JSON.parse(JSON.stringify(source)),
        id: `${source.id || 'sec'}-copy-${Date.now().toString().slice(-4)}`,
        heading: `${source.heading || 'Section'} (Copy)`
      };
      sections.splice(index + 1, 0, clone);
      return { ...prev, sections };
    });
    setIsDirty(true);
    toast.success('📑 Section duplicated');
  }, []);

  const addTemplateSection = (tmpl) => {
    setEditData(prev => ({
      ...prev,
      sections: [...(prev.sections || []), {
        id: `sec-${Date.now().toString().slice(-5)}`,
        heading: tmpl.defaultHeading,
        type: tmpl.type,
        content: tmpl.defaultContent,
        order: (prev.sections?.length || 0) + 1
      }]
    }));
    setShowTemplatePicker(false);
    setIsDirty(true);
    toast.success(`+ Added ${tmpl.name}`);
  };

  // ── AI Smart Assistant ──
  const openAIAssist = (index) => {
    const sec = editData.sections[index];
    setAiModal({
      open: true,
      sectionIndex: index,
      prompt: `Enhance and format the content for "${sec.heading || 'section'}" with professional academic tone.`,
      loading: false
    });
  };

  const runAIAssist = async () => {
    if (!aiModal.prompt.trim()) return;
    setAiModal(prev => ({ ...prev, loading: true }));

    const apiKey = window.GNC_GEMINI_API_KEY || '';
    const targetSection = editData.sections[aiModal.sectionIndex];

    try {
      if (apiKey) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a professional university copywriter for Guru Nanak College, Dhanbad.
Prompt: ${aiModal.prompt}
Current Heading: ${targetSection.heading}
Format Required: Return HTML suitable for website display without markdown wrappers (\`\`\`html). Keep tone polite, inspiring, and academic.`
              }]
            }]
          })
        });
        const resData = await response.json();
        const generated = resData?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generated) {
          const cleaned = generated.replace(/^```html/i, '').replace(/```$/i, '').trim();
          updateSection(aiModal.sectionIndex, { ...targetSection, content: cleaned });
          toast.success('✨ Content polished with Gemini AI!');
          setAiModal({ open: false, sectionIndex: null, prompt: '', loading: false });
          return;
        }
      }

      // Fallback smart formatter if no Gemini API key set
      const formatted = `<p><strong>${targetSection.heading}:</strong></p>
<p>${aiModal.prompt.replace(/\n/g, '<br/>')}</p>
<ul>
  <li>Accredited academic standard aligned with BBMKU & UGC guidelines.</li>
  <li>Comprehensive student support, mentorship and guidance.</li>
  <li>Transparent procedure and student-centric administration.</li>
</ul>`;
      updateSection(aiModal.sectionIndex, { ...targetSection, content: formatted });
      toast.success('✨ Formatted template applied!');
      setAiModal({ open: false, sectionIndex: null, prompt: '', loading: false });
    } catch (err) {
      toast.error('AI generation error: ' + err.message);
    } finally {
      setAiModal(prev => ({ ...prev, loading: false }));
    }
  };

  // ── JSON Export / Import ──
  const exportJSON = () => {
    if (!editData) return;
    const blob = new Blob([JSON.stringify(editData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gnc-page-${selectedSlug}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    toast.success('📥 Page JSON exported!');
  };

  const importJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        setEditData(parsed);
        setIsDirty(true);
        toast.success('📤 Page JSON imported successfully!');
      } catch (err) {
        toast.error('Invalid JSON file format: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // ── Word count and metrics ──
  const wordMetrics = useMemo(() => {
    if (!editData) return { words: 0, readingMins: 1 };
    let text = `${editData.title || ''} ${editData.subtitle || ''} `;
    (editData.sections || []).forEach(s => {
      if (typeof s.content === 'string') {
        text += s.content.replace(/<[^>]*>?/gm, ' ') + ' ';
      }
    });
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const readingMins = Math.max(1, Math.ceil(words / 200));
    return { words, readingMins };
  }, [editData]);

  // ── Filtered categories ──
  const dSearch = useDebounce(search, 200);
  const filteredCategories = useMemo(() => {
    if (!dSearch) return PAGE_CATEGORIES;
    const lower = dSearch.toLowerCase();
    return PAGE_CATEGORIES.map(cat => ({
      ...cat,
      pages: cat.pages.filter(p => p.label.toLowerCase().includes(lower) || p.slug.includes(lower))
    })).filter(cat => cat.pages.length > 0);
  }, [dSearch]);

  const activePageMeta = PAGE_CATEGORIES.flatMap(c => c.pages).find(p => p.slug === selectedSlug);

  return (
    <div style={{ padding: 'clamp(14px, 2vw, 24px)', maxWidth: 1600, margin: '0 auto' }}>
      {/* ── Top Header Banner ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 20,
        background: `linear-gradient(135deg, ${NAVY} 0%, #1a3a7c 100%)`,
        padding: '20px 24px',
        borderRadius: 16,
        color: '#fff'
      }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>⚡</span> Headless CMS Content Studio
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: '4px 0 0' }}>
            Next-gen visual page builder • Live split preview • Real-time Firestore sync
          </p>
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', padding: 4, borderRadius: 10 }}>
          <button
            onClick={() => setViewMode('editor')}
            style={{
              background: viewMode === 'editor' ? GOLD : 'transparent',
              color: viewMode === 'editor' ? NAVY : '#fff',
              border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 800, cursor: 'pointer'
            }}
          >
            ✏️ Editor
          </button>
          <button
            onClick={() => setViewMode('split')}
            style={{
              background: viewMode === 'split' ? GOLD : 'transparent',
              color: viewMode === 'split' ? NAVY : '#fff',
              border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 800, cursor: 'pointer'
            }}
          >
            ↔️ Split View
          </button>
          <button
            onClick={() => setViewMode('preview')}
            style={{
              background: viewMode === 'preview' ? GOLD : 'transparent',
              color: viewMode === 'preview' ? NAVY : '#fff',
              border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 800, cursor: 'pointer'
            }}
          >
            👁️ Preview
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: viewMode === 'split' ? '260px 1fr 1fr' : (viewMode === 'preview' ? '260px 1fr' : '280px 1fr'),
        gap: 20,
        minHeight: 'calc(100dvh - 220px)',
        alignItems: 'start'
      }}>
        {/* ── Left: Page Directory ── */}
        <div style={{ ...cardStyle, padding: 0, overflow: 'hidden', maxHeight: 'calc(100dvh - 220px)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: `1.5px solid ${T.b1}`, background: BG }}>
            <input
              placeholder="🔍 Search pages..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', border: `1.5px solid ${T.b1}`, borderRadius: 8, fontSize: 13, fontWeight: 600, background: WHITE }}
            />
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
            {filteredCategories.map(cat => (
              <div key={cat.label}>
                <div style={{ padding: '10px 16px 4px', fontSize: 10, fontWeight: 800, color: T.t3, textTransform: 'uppercase', letterSpacing: 1.5, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>{cat.icon}</span> {cat.label}
                </div>
                {cat.pages.map(page => {
                  const isSeeded = !!allPages[page.slug];
                  const isActive = selectedSlug === page.slug;
                  return (
                    <div
                      key={page.slug}
                      onClick={() => selectPage(page.slug)}
                      style={{
                        padding: '10px 16px', margin: '2px 8px', borderRadius: 10, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 600,
                        background: isActive ? `${NAVY}10` : 'transparent',
                        color: isActive ? NAVY : T.t2,
                        borderLeft: isActive ? `3px solid ${GOLD}` : '3px solid transparent',
                        transition: 'all .2s',
                      }}
                    >
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{page.label}</span>
                      {allPages[page.slug] ? (
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} title="Live in Firestore" />
                      ) : DEFAULT_PAGE_CONTENT[page.slug] ? (
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f4a023', flexShrink: 0 }} title="Default ready" />
                      ) : (
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#cbd5e1', flexShrink: 0 }} />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* ── Middle: Editor Area (hidden in preview-only mode) ── */}
        {viewMode !== 'preview' && (
          <div style={{ ...cardStyle, overflow: 'auto', maxHeight: 'calc(100dvh - 220px)' }}>
            {!editData ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 400, gap: 16, opacity: 0.5 }}>
                <span style={{ fontSize: 44 }}>📄</span>
                <div style={{ fontSize: 16, fontWeight: 800, color: NAVY }}>Select a page from the left panel</div>
                <div style={{ fontSize: 13, color: T.t3 }}>Choose any academic, committee, or campus page to start editing</div>
              </div>
            ) : (
              <div>
                {/* ── Page Header Controls & Metrics ── */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16, borderBottom: `1px solid ${T.b1}`, paddingBottom: 16 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 10.5, fontWeight: 800, color: GOLD, background: `${GOLD}20`, padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase' }}>
                        {selectedSlug}
                      </span>
                      <span style={{ fontSize: 11.5, color: '#64748b', fontWeight: 600 }}>
                        📊 {wordMetrics.words} words • ⏱️ ~{wordMetrics.readingMins} min read
                      </span>
                    </div>
                    <input
                      value={editData.title || ''}
                      onChange={e => { setEditData(prev => ({ ...prev, title: e.target.value })); setIsDirty(true); }}
                      placeholder="Page Title"
                      style={{ width: '100%', padding: '8px 12px', border: `1.5px solid ${T.b1}`, borderRadius: 8, fontSize: 18, fontWeight: 800, color: NAVY }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {/* View live page link */}
                    {activePageMeta?.path && (
                      <a
                        href={`#${activePageMeta.path}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          background: '#f1f5f9', border: `1px solid ${T.b1}`, color: NAVY,
                          padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 800,
                          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4
                        }}
                      >
                        ↗ Live Page
                      </a>
                    )}

                    {historySnapshot && isDirty && (
                      <button
                        type="button"
                        onClick={handleUndo}
                        style={{
                          background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c',
                          padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 800, cursor: 'pointer'
                        }}
                      >
                        ↩ Undo
                      </button>
                    )}

                    <button
                      onClick={handleSave}
                      disabled={saving || !isDirty}
                      style={{
                        background: isDirty ? `linear-gradient(135deg, ${NAVY}, #1a3a7c)` : '#e2e8f0',
                        color: isDirty ? WHITE : T.t3, border: 'none', borderRadius: 8, padding: '9px 20px',
                        fontWeight: 900, fontSize: 13, cursor: isDirty ? 'pointer' : 'default',
                        boxShadow: isDirty ? '0 4px 12px rgba(15,35,71,0.2)' : 'none'
                      }}
                    >
                      {saving ? '⏳ Saving...' : isDirty ? '💾 Save (Ctrl+S)' : '✓ Saved'}
                    </button>
                  </div>
                </div>

                {/* Subtitle */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: T.t3, marginBottom: 4, display: 'block' }}>
                    Page Subtitle / Tagline
                  </label>
                  <input
                    value={editData.subtitle || ''}
                    onChange={e => { setEditData(prev => ({ ...prev, subtitle: e.target.value })); setIsDirty(true); }}
                    placeholder="Short summary under page header..."
                    style={{ width: '100%', padding: '8px 12px', border: `1.5px solid ${T.b1}`, borderRadius: 8, fontSize: 13.5, color: T.t2 }}
                  />
                </div>

                {/* ── SEO Snippet & Google SERP Preview ── */}
                <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16, marginBottom: 20, border: `1.5px solid ${T.b1}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: NAVY, textTransform: 'uppercase', letterSpacing: 1 }}>
                      🔍 Google Search Engine Preview (SERP)
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      color: (editData.seo?.title?.length || 0) <= 60 && (editData.seo?.description?.length || 0) <= 160 ? '#15803d' : '#d97706'
                    }}>
                      {(editData.seo?.title?.length || 0) <= 60 ? '🟢 Title Good' : '🟡 Title Long'}
                    </span>
                  </div>

                  {/* Live Google Search Card */}
                  <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px 16px', marginBottom: 12 }}>
                    <div style={{ fontSize: 11, color: '#202124' }}>https://gncollege.org › {selectedSlug}</div>
                    <div style={{ fontSize: 16, color: '#1a0dab', fontWeight: 600, textDecoration: 'underline', marginTop: 2 }}>
                      {editData.seo?.title || editData.title || 'Guru Nanak College, Dhanbad'}
                    </div>
                    <div style={{ fontSize: 12.5, color: '#4d5156', marginTop: 4, lineHeight: 1.4 }}>
                      {editData.seo?.description || editData.subtitle || 'Official academic portal of Guru Nanak College, Dhanbad.'}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.t3, marginBottom: 4 }}>
                        <span>SEO Title</span>
                        <span>{editData.seo?.title?.length || 0}/60</span>
                      </div>
                      <input
                        value={editData.seo?.title || ''}
                        onChange={e => { setEditData(prev => ({ ...prev, seo: { ...prev.seo, title: e.target.value } })); setIsDirty(true); }}
                        placeholder="Google Search Title"
                        maxLength={70}
                        style={{ width: '100%', padding: '7px 10px', border: `1px solid ${T.b1}`, borderRadius: 6, fontSize: 12.5 }}
                      />
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.t3, marginBottom: 4 }}>
                        <span>SEO Meta Description</span>
                        <span>{editData.seo?.description?.length || 0}/160</span>
                      </div>
                      <input
                        value={editData.seo?.description || ''}
                        onChange={e => { setEditData(prev => ({ ...prev, seo: { ...prev.seo, description: e.target.value } })); setIsDirty(true); }}
                        placeholder="Google Search Snippet"
                        maxLength={170}
                        style={{ width: '100%', padding: '7px 10px', border: `1px solid ${T.b1}`, borderRadius: 6, fontSize: 12.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Content Sections List ── */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: NAVY }}>
                    Page Sections ({editData.sections?.length || 0})
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      type="button"
                      onClick={exportJSON}
                      style={{ background: '#f1f5f9', border: `1px solid ${T.b1}`, borderRadius: 8, padding: '5px 12px', fontSize: 11.5, fontWeight: 700, color: NAVY, cursor: 'pointer' }}
                      title="Download JSON Backup"
                    >
                      📥 Export
                    </button>

                    <label style={{ background: '#f1f5f9', border: `1px solid ${T.b1}`, borderRadius: 8, padding: '5px 12px', fontSize: 11.5, fontWeight: 700, color: NAVY, cursor: 'pointer', margin: 0 }}>
                      📤 Import
                      <input type="file" accept=".json" onChange={importJSON} style={{ display: 'none' }} />
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowTemplatePicker(true)}
                      style={{
                        background: 'linear-gradient(135deg, #f4a023, #d97706)',
                        color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px',
                        fontSize: 12, fontWeight: 800, cursor: 'pointer', boxShadow: '0 2px 8px rgba(244,160,35,0.3)'
                      }}
                    >
                      + Add Section Preset
                    </button>
                  </div>
                </div>

                {(editData.sections || []).length === 0 ? (
                  <div style={{ padding: 40, textAlign: 'center', background: BG, borderRadius: 14, border: `1.5px dashed ${T.b1}` }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>📋</div>
                    <div style={{ fontWeight: 800, color: NAVY, fontSize: 15 }}>No sections in this page yet</div>
                    <div style={{ fontSize: 12.5, color: T.t3, marginTop: 4, marginBottom: 14 }}>
                      Choose a template preset to start building rich structured content.
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowTemplatePicker(true)}
                      style={{ background: GOLD, color: NAVY, border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 800, cursor: 'pointer' }}
                    >
                      + Select Section Preset
                    </button>
                  </div>
                ) : (
                  (editData.sections || []).map((sec, i) => (
                    <SectionEditor
                      key={sec.id || i}
                      section={sec}
                      index={i}
                      totalSections={editData.sections.length}
                      onChange={updateSection}
                      onRemove={removeSection}
                      onMove={moveSection}
                      onDuplicate={duplicateSection}
                      onAIAssist={openAIAssist}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Right: Live Visual Preview (Shown in split or preview mode) ── */}
        {viewMode !== 'editor' && (
          <div style={{ maxHeight: 'calc(100dvh - 220px)', overflowY: 'auto' }}>
            <LiveVisualPreview data={editData} slug={selectedSlug} />
          </div>
        )}
      </div>

      {/* ── Template Picker Modal ── */}
      {showTemplatePicker && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100000,
          background: 'rgba(15,35,71,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <div style={{
            background: '#fff', borderRadius: 20, maxWidth: 620, width: '100%',
            padding: 24, boxShadow: '0 20px 50px rgba(0,0,0,0.3)', maxHeight: '85vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: NAVY }}>
                Choose Section Template Preset
              </h3>
              <button
                onClick={() => setShowTemplatePicker(false)}
                style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: T.t3 }}
              >✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {SECTION_TEMPLATES.map(tmpl => (
                <div
                  key={tmpl.type}
                  onClick={() => addTemplateSection(tmpl)}
                  style={{
                    border: `1.5px solid ${T.b1}`, borderRadius: 12, padding: 16,
                    cursor: 'pointer', transition: 'all .2s ease', background: '#fff'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.b1; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{tmpl.icon}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: NAVY }}>{tmpl.name}</div>
                  <div style={{ fontSize: 11.5, color: T.t3, marginTop: 4, lineHeight: 1.4 }}>{tmpl.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── AI Smart Assistant Modal ── */}
      {aiModal.open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100000,
          background: 'rgba(15,35,71,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <div style={{
            background: '#fff', borderRadius: 20, maxWidth: 520, width: '100%',
            padding: 24, boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>✨</span>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: NAVY }}>AI Smart Assistant</h3>
              </div>
              <button
                onClick={() => setAiModal({ open: false, sectionIndex: null, prompt: '', loading: false })}
                style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: T.t3 }}
              >✕</button>
            </div>

            <p style={{ fontSize: 12.5, color: T.t3, margin: '0 0 12px 0' }}>
              Give instructions to polish, expand, or format this section into academic standard content.
            </p>

            {/* Prompt presets */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {[
                'Formal introduction & objectives',
                'Convert to bullet points',
                'Summarize into 3 key takeaways',
                'FAQ list with questions & answers'
              ].map(chip => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setAiModal(p => ({ ...p, prompt: chip }))}
                  style={{
                    background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 20,
                    padding: '4px 10px', fontSize: 11, fontWeight: 700, color: NAVY, cursor: 'pointer'
                  }}
                >
                  + {chip}
                </button>
              ))}
            </div>

            <textarea
              value={aiModal.prompt}
              onChange={e => setAiModal(p => ({ ...p, prompt: e.target.value }))}
              rows={4}
              placeholder="What would you like AI to write or polish for this section?"
              style={{ width: '100%', padding: 12, border: `1.5px solid ${T.b1}`, borderRadius: 10, fontSize: 13, resize: 'none', marginBottom: 16 }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button
                type="button"
                onClick={() => setAiModal({ open: false, sectionIndex: null, prompt: '', loading: false })}
                style={{ background: '#f1f5f9', border: 'none', padding: '9px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={runAIAssist}
                disabled={aiModal.loading || !aiModal.prompt.trim()}
                style={{
                  background: 'linear-gradient(135deg, #f4a023, #d97706)',
                  color: '#fff', border: 'none', padding: '9px 20px', borderRadius: 8,
                  fontSize: 13, fontWeight: 800, cursor: aiModal.loading ? 'not-allowed' : 'pointer'
                }}
              >
                {aiModal.loading ? '⚡ Generating...' : '✨ Generate & Insert'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
