// src/components/admin/tabs/ContentManagerTab.jsx
// ═══════════════════════════════════════════════════════════════════
// GNC ADMIN — Content Manager Tab (CMS Content Editor)
// Allows editing of all page content stored in Firestore pageContent collection
// ═══════════════════════════════════════════════════════════════════
import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { collection, doc, onSnapshot, updateDoc, setDoc, serverTimestamp, deleteField } from 'firebase/firestore';
import { db } from '../../../firebase';
import { NAVY, GOLD, WHITE, BG, T, useDebounce } from '../AdminShared';
import toast from 'react-hot-toast';
import DEFAULT_PAGE_CONTENT from '../../../data/defaultPageContent';

const JoditEditor = lazy(() => import('jodit-react'));

// ── Page slugs grouped by category ──
const PAGE_CATEGORIES = [
  {
    label: 'About Us',
    icon: '🏛️',
    pages: [
      { slug: 'vision-mission', label: 'Vision & Mission' },
      { slug: 'principal-message', label: "Principal's Message" },
      { slug: 'organogram', label: 'Organogram' },
      { slug: 'governing-body', label: 'Governing Body' },
      { slug: 'staff-council', label: 'Staff Council' },
    ]
  },
  {
    label: 'Committees',
    icon: '📋',
    pages: [
      { slug: 'womens-cell', label: "Women's Cell" },
      { slug: 'anti-ragging', label: 'Anti-Ragging' },
      { slug: 'sc-st', label: 'SC/ST Cell' },
      { slug: 'obc', label: 'OBC Cell' },
      { slug: 'grievance', label: 'Grievance Cell' },
      { slug: 'icc', label: 'ICC' },
      { slug: 'minority', label: 'Minority Cell' },
      { slug: 'placement', label: 'Placement Cell' },
      { slug: 'rusa', label: 'RUSA Cell' },
    ]
  },
  {
    label: 'Academics',
    icon: '🎓',
    pages: [
      { slug: 'course-offered', label: 'Courses Offered' },
      { slug: 'academic-calendar', label: 'Academic Calendar' },
    ]
  },
  {
    label: 'Admission',
    icon: '📝',
    pages: [
      { slug: 'admission-rule', label: 'Admission Procedure' },
      { slug: 'document-required', label: 'Documents Required' },
      { slug: 'fee-structure', label: 'Fee Structure' },
      { slug: 'intake-capacity', label: 'Intake Capacity' },
    ]
  },
  {
    label: 'Activities',
    icon: '🏆',
    pages: [
      { slug: 'nss', label: 'NSS' },
      { slug: 'ncc', label: 'NCC' },
      { slug: 'workshop', label: 'Workshops' },
      { slug: 'games-sports', label: 'Games & Sports' },
      { slug: 'rotaract-club', label: 'Rotaract Club' },
      { slug: 'sadbhavana-diwas', label: 'Sadbhavana Diwas' },
    ]
  },
  {
    label: 'Campus',
    icon: '🏫',
    pages: [
      { slug: 'infrastructure', label: 'Infrastructure' },
      { slug: 'classrooms', label: 'Classrooms' },
      { slug: 'ict-rooms', label: 'ICT & Computer Labs' },
      { slug: 'green-campus', label: 'Green Campus' },
    ]
  },
  {
    label: 'Other',
    icon: '📊',
    pages: [
      { slug: 'site-counters', label: 'Homepage Counters' },
    ]
  }
];

const cardStyle = {
  background: WHITE, borderRadius: 16, padding: 24,
  border: `1.5px solid ${T.b1}`, boxShadow: T.shadow,
};

// ── Section Editor Component ──
function SectionEditor({ section, index, onChange, onRemove }) {
  const [expanded, setExpanded] = useState(false);

  const update = (key, val) => {
    onChange(index, { ...section, [key]: val });
  };

  const isJsonContent = section.type !== 'text';
  let contentDisplay = section.content || '';
  if (isJsonContent && typeof contentDisplay === 'string') {
    try { contentDisplay = JSON.stringify(JSON.parse(contentDisplay), null, 2); } catch {}
  } else if (typeof contentDisplay === 'object') {
    contentDisplay = JSON.stringify(contentDisplay, null, 2);
  }

  return (
    <div style={{ background: BG, borderRadius: 12, border: `1.5px solid ${T.b1}`, overflow: 'hidden', marginBottom: 12 }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: expanded ? `${NAVY}08` : 'transparent', transition: 'background .2s' }}
      >
        <span style={{ fontSize: 10, color: T.t3, transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform .2s' }}>▶</span>
        <span style={{ fontSize: 11, color: GOLD, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, flexShrink: 0 }}>
          {section.type || 'text'}
        </span>
        <span style={{ fontWeight: 700, color: T.t1, fontSize: 14, flex: 1 }}>{section.heading || section.id}</span>
        <span style={{ fontSize: 11, color: T.t3, fontFamily: 'monospace' }}>#{section.id}</span>
        <button
          onClick={e => { e.stopPropagation(); if (window.confirm('Delete this section?')) onRemove(index); }}
          style={{ background: 'rgba(239,68,68,.1)', border: 'none', color: '#ef4444', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
        >✕</button>
      </div>

      {expanded && (
        <div style={{ padding: '16px 18px', borderTop: `1px solid ${T.b1}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: T.t3, marginBottom: 4, display: 'block' }}>Section ID</label>
              <input value={section.id || ''} onChange={e => update('id', e.target.value)} style={{ width: '100%', padding: '8px 12px', border: `1.5px solid ${T.b1}`, borderRadius: 8, fontSize: 13, fontWeight: 600 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: T.t3, marginBottom: 4, display: 'block' }}>Heading</label>
              <input value={section.heading || ''} onChange={e => update('heading', e.target.value)} style={{ width: '100%', padding: '8px 12px', border: `1.5px solid ${T.b1}`, borderRadius: 8, fontSize: 13, fontWeight: 600 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: T.t3, marginBottom: 4, display: 'block' }}>Type</label>
              <select value={section.type || 'text'} onChange={e => update('type', e.target.value)} style={{ width: '100%', padding: '8px 12px', border: `1.5px solid ${T.b1}`, borderRadius: 8, fontSize: 13, fontWeight: 600, background: WHITE }}>
                <option value="text">Text (HTML)</option>
                <option value="list">List (JSON Array)</option>
                <option value="table">Table (JSON)</option>
                <option value="stats">Stats (JSON)</option>
                <option value="timeline">Timeline (JSON)</option>
                <option value="cards">Cards (JSON)</option>
              </select>
            </div>
          </div>

          {section.type === 'text' ? (
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: T.t3, marginBottom: 4, display: 'block' }}>Content (Rich Text HTML)</label>
              <Suspense fallback={<div style={{ padding: 20, textAlign: 'center', color: T.t3 }}>Loading Editor...</div>}>
                <JoditEditor
                  value={section.content || ''}
                  config={{
                    readonly: false,
                    height: 250,
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
              <label style={{ fontSize: 11, fontWeight: 700, color: T.t3, marginBottom: 4, display: 'block' }}>Content (JSON)</label>
              <textarea
                value={contentDisplay}
                onChange={e => update('content', e.target.value)}
                style={{ width: '100%', minHeight: 200, padding: 14, border: `1.5px solid ${T.b1}`, borderRadius: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, lineHeight: 1.6, resize: 'vertical', background: '#f8fafc' }}
                spellCheck={false}
              />
              <div style={{ fontSize: 11, color: T.t3, marginTop: 4 }}>
                💡 JSON format — edit carefully. For lists: use array [...]. For tables: use {`{headers:[], rows:[]}`}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Content Manager Tab ──
export default function ContentManagerTab({ logAct }) {
  const [allPages, setAllPages] = useState({});
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [editData, setEditData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [isDirty, setIsDirty] = useState(false);

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
      // ✅ Firestore data exists — use it
      setEditData(JSON.parse(JSON.stringify(pageData)));
    } else if (DEFAULT_PAGE_CONTENT[slug]) {
      // ✅ No Firestore data but DEFAULT exists — show pre-filled defaults
      const defaults = DEFAULT_PAGE_CONTENT[slug];
      setEditData({
        slug,
        ...JSON.parse(JSON.stringify(defaults)),
        _source: 'default' // marker to show "Not saved to Firestore yet"
      });
    } else {
      // No data at all — blank structure
      const meta = PAGE_CATEGORIES.flatMap(c => c.pages).find(p => p.slug === slug);
      setEditData({
        slug, title: meta?.label || slug, subtitle: '', sections: [], seo: { title: '', description: '' },
        _source: 'empty'
      });
    }
    setIsDirty(false);
  }, [allPages, isDirty]);

  // ── Save to Firestore ──
  const handleSave = useCallback(async () => {
    if (!editData || !selectedSlug) return;
    setSaving(true);
    try {
      // Parse JSON content strings back to objects for structured sections
      const processedSections = (editData.sections || []).map(s => {
        if (s.type !== 'text' && typeof s.content === 'string') {
          try { return { ...s, content: JSON.parse(s.content) }; }
          catch { /* keep as string */ }
        }
        return s;
      });

      const payload = {
        ...editData,
        sections: processedSections,
        updatedAt: serverTimestamp(),
        _version: (allPages[selectedSlug]?._version || 0) + 1,
      };
      delete payload.id; // Don't store id inside the document

      await setDoc(doc(db, 'pageContent', selectedSlug), payload, { merge: true });
      if (logAct) logAct('update', `Content updated: ${editData.title}`, 'pageContent');
      toast.success(`✅ "${editData.title}" saved successfully!`);
      setIsDirty(false);
    } catch (err) {
      console.error('[ContentManager] Save error:', err);
      toast.error(`❌ Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }, [editData, selectedSlug, allPages, logAct]);

  // ── Section handlers ──
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

  const addSection = useCallback(() => {
    setEditData(prev => ({
      ...prev,
      sections: [...(prev.sections || []), {
        id: `section-${Date.now()}`, heading: 'New Section', type: 'text', content: '', order: (prev.sections?.length || 0) + 1
      }]
    }));
    setIsDirty(true);
  }, []);

  // ── Load defaults into current page ──
  const loadDefaults = useCallback(() => {
    if (!selectedSlug || !DEFAULT_PAGE_CONTENT[selectedSlug]) return;
    if (!window.confirm('Load default content? This will replace current editor content (unsaved changes will be lost).')) return;
    const defaults = DEFAULT_PAGE_CONTENT[selectedSlug];
    setEditData({
      slug: selectedSlug,
      ...JSON.parse(JSON.stringify(defaults)),
      _source: 'default'
    });
    setIsDirty(true);
    toast.success('📋 Default content loaded — click Save to push to Firestore');
  }, [selectedSlug]);

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

  const seededCount = Object.keys(allPages).length;
  const totalExpected = PAGE_CATEGORIES.reduce((a, c) => a + c.pages.length, 0);

  return (
    <div style={{ padding: 'clamp(16px,2vw,24px)' }}>
      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: NAVY, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Content Manager
          </h2>
          <p style={{ fontSize: 13, color: T.t3, margin: '4px 0 0' }}>Edit page content directly — changes reflect instantly on the website</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ background: seededCount >= totalExpected ? '#dcfce7' : '#fef3c7', color: seededCount >= totalExpected ? '#166534' : '#92400e', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
            {seededCount}/{totalExpected} in Firestore
          </div>
          <div style={{ background: '#e0f2fe', color: '#0369a1', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
            {Object.keys(DEFAULT_PAGE_CONTENT).length} Defaults Ready
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, minHeight: 'calc(100dvh - 200px)' }}>
        {/* ── Left: Page List ── */}
        <div style={{ ...cardStyle, padding: 0, overflow: 'hidden', maxHeight: 'calc(100dvh - 200px)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: `1.5px solid ${T.b1}`, background: BG }}>
            <input
              placeholder="Search pages..."
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
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = `${NAVY}06`; }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                    >
                    <span style={{ flex: 1 }}>{page.label}</span>
                      {allPages[page.slug] ? (
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} title="Saved in Firestore" />
                      ) : DEFAULT_PAGE_CONTENT[page.slug] ? (
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f4a023', flexShrink: 0 }} title="Default content available (not saved yet)" />
                      ) : (
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#e2e8f0', flexShrink: 0 }} title="No content yet" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Editor ── */}
        <div style={{ ...cardStyle, overflow: 'auto', maxHeight: 'calc(100dvh - 200px)' }}>
          {!editData ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16, opacity: 0.5 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={T.t3} strokeWidth="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              <div style={{ fontSize: 16, fontWeight: 700, color: T.t3 }}>Select a page to edit</div>
              <div style={{ fontSize: 13, color: T.t3, textAlign: 'center', maxWidth: 300 }}>Choose any page from the left panel to view and edit its content</div>
            </div>
          ) : (
            <div>
              {/* ── Page Header Fields ── */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: GOLD, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>EDITING — {selectedSlug}</div>
                  <input
                    value={editData.title || ''}
                    onChange={e => { setEditData(prev => ({ ...prev, title: e.target.value })); setIsDirty(true); }}
                    placeholder="Page Title"
                    style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.b1}`, borderRadius: 10, fontSize: 18, fontWeight: 800, color: NAVY }}
                  />
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving || !isDirty}
                  style={{
                    background: isDirty ? `linear-gradient(135deg, ${NAVY}, #1a3a7c)` : '#e2e8f0',
                    color: isDirty ? WHITE : T.t3, border: 'none', borderRadius: 10, padding: '12px 24px',
                    fontWeight: 800, fontSize: 13, cursor: isDirty ? 'pointer' : 'default', flexShrink: 0,
                    opacity: saving ? 0.6 : 1, transition: 'all .3s',
                  }}
                >
                  {saving ? '⏳ Saving...' : isDirty ? '💾 Save Changes' : '✓ Saved'}
                </button>
              </div>

              {/* ── Source Indicator ── */}
              {editData._source === 'default' && !allPages[selectedSlug] && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: '#fef3c7', borderRadius: 10, marginBottom: 16, border: '1.5px solid #fcd34d' }}>
                  <span style={{ fontSize: 16 }}>📋</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#92400e', flex: 1 }}>Showing default content from codebase — Click <strong>"Save Changes"</strong> to push to Firestore and make it editable from Admin Panel.</span>
                </div>
              )}
              {allPages[selectedSlug] && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: '#dcfce7', borderRadius: 10, marginBottom: 16, border: '1.5px solid #86efac' }}>
                  <span style={{ fontSize: 16 }}>✅</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#166534', flex: 1 }}>Live from Firestore — Changes auto-reflect on the website.</span>
                  {DEFAULT_PAGE_CONTENT[selectedSlug] && (
                    <button onClick={loadDefaults} style={{ background: '#fff', border: '1.5px solid #86efac', borderRadius: 8, padding: '4px 12px', fontSize: 11, fontWeight: 700, color: '#166534', cursor: 'pointer', flexShrink: 0 }}>↩ Reset to Defaults</button>
                  )}
                </div>
              )}

              <input
                value={editData.subtitle || ''}
                onChange={e => { setEditData(prev => ({ ...prev, subtitle: e.target.value })); setIsDirty(true); }}
                placeholder="Page Subtitle"
                style={{ width: '100%', padding: '8px 14px', border: `1.5px solid ${T.b1}`, borderRadius: 8, fontSize: 14, color: T.t2, marginBottom: 20 }}
              />

              {/* ── SEO Fields ── */}
              <div style={{ background: BG, borderRadius: 12, padding: 16, marginBottom: 20, border: `1.5px solid ${T.b1}` }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: T.t3, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  🔍 SEO Settings
                </div>
                <input
                  value={editData.seo?.title || ''}
                  onChange={e => { setEditData(prev => ({ ...prev, seo: { ...prev.seo, title: e.target.value } })); setIsDirty(true); }}
                  placeholder="SEO Title (60 chars max)"
                  maxLength={70}
                  style={{ width: '100%', padding: '8px 12px', border: `1.5px solid ${T.b1}`, borderRadius: 8, fontSize: 13, marginBottom: 8 }}
                />
                <textarea
                  value={editData.seo?.description || ''}
                  onChange={e => { setEditData(prev => ({ ...prev, seo: { ...prev.seo, description: e.target.value } })); setIsDirty(true); }}
                  placeholder="SEO Description (160 chars max)"
                  maxLength={170}
                  rows={2}
                  style={{ width: '100%', padding: '8px 12px', border: `1.5px solid ${T.b1}`, borderRadius: 8, fontSize: 13, resize: 'none' }}
                />
              </div>

              {/* ── Sections ── */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>
                  Content Sections ({editData.sections?.length || 0})
                </div>
                <button
                  onClick={addSection}
                  style={{ background: `${GOLD}20`, color: '#92400e', border: `1.5px solid ${GOLD}40`, borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}
                >
                  + Add Section
                </button>
              </div>

              {(editData.sections || []).length === 0 && (
                <div style={{ padding: 32, textAlign: 'center', color: T.t3, fontSize: 14, background: BG, borderRadius: 12, border: `1.5px dashed ${T.b1}` }}>
                  No sections yet. Click "+ Add Section" to start building content.
                </div>
              )}

              {(editData.sections || []).map((section, i) => (
                <SectionEditor
                  key={section.id || i}
                  section={section}
                  index={i}
                  onChange={updateSection}
                  onRemove={removeSection}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
