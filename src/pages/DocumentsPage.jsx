// src/pages/DocumentsPage.jsx
import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import toast from 'react-hot-toast';
import PremiumPagination from '../components/PremiumPagination';

const PDFModal = lazy(() => import('../components/PDFModal'));

const ITEMS_PER_PAGE = 12;
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const DOC_TYPES = [
  'All',
  'Syllabus',
  'Affiliation',
  'Report',
  'Circular',
  'Regulation',
  'Result',
  'Magazine',
  'Poster',
  'Document'
];

const DOC_META = {
  Document:    { icon: '📄', bg: '#EBF0FF', text: '#1a365d', border: '#BED0FF', label: 'Official Doc' },
  Report:      { icon: '📊', bg: '#F0FFF4', text: '#1c4532', border: '#9AE6B4', label: 'Report & Audit' },
  Syllabus:    { icon: '📚', bg: '#FFFBEB', text: '#744210', border: '#FAF089', label: 'NEP Syllabus' },
  Circular:    { icon: '📋', bg: '#FFF5F5', text: '#742a2a', border: '#FEB2B2', label: 'Circular' },
  Result:      { icon: '🏆', bg: '#E6FFFA', text: '#1d4044', border: '#81E6D9', label: 'Results' },
  Regulation:  { icon: '⚖️', bg: '#F5F3FF', text: '#4C1D95', border: '#DDD6FE', label: 'Regulation & RTI' },
  Affiliation: { icon: '🏛️', bg: '#F0F9FF', text: '#0C4A6E', border: '#BAE6FD', label: 'UGC & Affiliation' },
  Magazine:    { icon: '📖', bg: '#FEF3C7', text: '#92400E', border: '#FCD34D', label: 'College Magazine' },
  Poster:      { icon: '🎨', bg: '#FDF2F8', text: '#9D174D', border: '#FBCFE8', label: 'Event Poster' },
};

const getTS = ts => ts?.toDate ? ts.toDate() : new Date(ts || Date.now());
const fmtDt = ts => { const d = getTS(ts); return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`; };

export default function DocumentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [docs,     setDocs]     = useState([]);
  const [loading,  setLoading]  = useState(true);

  // Sync state with URL params
  const selType  = searchParams.get('type') || 'All';
  const selYear  = searchParams.get('year') || 'All';
  const search   = searchParams.get('q') || '';
  const view     = searchParams.get('view') || 'grid';

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const navy = COLORS.navy || '#0f2347';
  const gold = COLORS.gold || '#f4a023';

  const updateParams = (newParams) => {
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([k, v]) => {
        if (!v || v === 'All') p.delete(k);
        else p.set(k, v);
      });
      return p;
    }, { replace: true });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const q = collection(db, 'pdfReports');
    const unsub = onSnapshot(q, snap => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => {
        const ta = a.createdAt?.toMillis ? a.createdAt.toMillis() : (new Date(a.createdAt || 0).getTime() || 0);
        const tb = b.createdAt?.toMillis ? b.createdAt.toMillis() : (new Date(b.createdAt || 0).getTime() || 0);
        return tb - ta;
      });
      setDocs(list);
      setLoading(false);
    }, () => setLoading(false));

    return () => unsub();
  }, []);

  const years = useMemo(() => {
    const s = new Set(docs.map(d => getTS(d.createdAt).getFullYear()));
    return ['All', ...Array.from(s).sort((a, b) => b - a)];
  }, [docs]);

  const typeCounts = useMemo(() => {
    const m = {};
    docs.forEach(d => { const t = d.type || 'Document'; m[t] = (m[t] || 0) + 1; });
    return m;
  }, [docs]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selYear, selType, search]);

  const filtered = useMemo(() => {
    return docs.filter(d => {
      const dt = getTS(d.createdAt);
      if (selYear !== 'All' && dt.getFullYear() !== Number(selYear)) return false;
      if (selType !== 'All' && (d.type || 'Document').toLowerCase() !== selType.toLowerCase()) return false;
      if (search) {
        const q = search.toLowerCase();
        const inTitle = d.title?.toLowerCase().includes(q);
        const inDesc = d.description?.toLowerCase().includes(q);
        const inType = (d.type || '').toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inType) return false;
      }
      return true;
    });
  }, [docs, selYear, selType, search]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const grouped = useMemo(() => {
    const map = {};
    paginated.forEach(d => {
      const y = String(getTS(d.createdAt).getFullYear());
      if (!map[y]) map[y] = [];
      map[y].push(d);
    });
    return map;
  }, [paginated]);

  const handleShareWhatsApp = (d) => {
    const pdfLink = d.pdfUrl || d.link || window.location.href;
    const text = `📁 *${d.title}*\nType: ${d.type || 'Official Document'}\nIssued: ${fmtDt(d.createdAt)}\n\n🔗 ${pdfLink}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = (d) => {
    const url = `${window.location.origin}/documents?q=${encodeURIComponent(d.title?.slice(0, 30) || '')}`;
    navigator.clipboard.writeText(url);
    toast.success('Document link copied to clipboard!');
  };

  return (
    <div className="profile-page-wrapper">
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .doc-btn-interactive {
          border: none;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .doc-btn-interactive:hover {
          transform: translateY(-1px);
        }
        .doc-card-hover {
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }
        .doc-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(15, 35, 71, 0.12) !important;
          border-color: ${gold} !important;
        }
        .doc-row-hover {
          transition: all 0.18s ease;
        }
        .doc-row-hover:hover {
          background: #f8fafc !important;
          border-color: ${gold}88 !important;
          transform: translateX(3px);
        }
      `}</style>

      {/* Hero */}
      <header className="profile-hero" style={{ backgroundImage: `url('/images/college_photo.webp')` }}>
        <div className="hero-overlay" style={{ background: 'linear-gradient(135deg, rgba(15, 35, 71, 0.94) 0%, rgba(10, 25, 47, 0.88) 100%)' }} />
        <div className="hero-content anim-fade-in">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244, 160, 35, 0.18)', border: '1px solid rgba(244, 160, 35, 0.4)', borderRadius: 20, padding: '4px 14px', marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: gold, fontWeight: 800, letterSpacing: 0.5 }}>OFFICIAL REPOSITORY</span>
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 900, letterSpacing: '-0.5px' }}>
            Institutional Document Archive
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: 720, margin: '0 auto', fontSize: 15, opacity: 0.9 }}>
            Comprehensive repository of UGC &amp; BBMKU affiliations, NEP syllabi, annual reports, audited financial disclosures, and college publications.
          </p>
        </div>
      </header>

      {/* Counters Section */}
      <div style={{ maxWidth: '1120px', margin: '-50px auto 30px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '18px 24px', boxShadow: '0 12px 36px rgba(15,35,71,0.09)', border: '1px solid #e2e8f0', display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Syllabus', 'Affiliation', 'Report', 'Circular', 'Magazine'].map(type => {
            const m = DOC_META[type] || { icon: '📄' };
            const count = typeCounts[type] || 0;
            const isSel = selType.toLowerCase() === type.toLowerCase();
            return (
              <button
                key={type}
                onClick={() => updateParams({ type: isSel ? 'All' : type })}
                className="doc-btn-interactive"
                style={{
                  background: isSel ? '#fffbeb' : '#fff',
                  border: `1.5px solid ${isSel ? gold : '#e2e8f0'}`,
                  borderRadius: 12,
                  padding: '10px 18px',
                  minWidth: 120,
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  boxShadow: isSel ? '0 4px 12px rgba(244,160,35,0.2)' : 'none',
                }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 10, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {m.icon}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: navy, lineHeight: 1.1 }}>{count}</div>
                  <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, marginTop: 2 }}>{type}</div>
                </div>
              </button>
            );
          })}
          <div style={{ background: navy, color: '#fff', borderRadius: 12, padding: '10px 20px', minWidth: 120, flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 22 }}>📁</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: gold, lineHeight: 1.1 }}>{docs.length}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, marginTop: 2 }}>Total Vault</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px 60px' }}>
        <main>
          {/* Filter Panel */}
          <section style={{ background: '#fff', padding: '24px 28px', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: 28 }}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18 }}>
              {/* Search */}
              <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: 16 }}>🔍</span>
                <input
                  value={search}
                  onChange={e => updateParams({ q: e.target.value })}
                  placeholder="Search repository by keyword, document title, regulation..."
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 40px',
                    border: '2px solid #e2e8f0',
                    borderRadius: 10,
                    fontSize: 14,
                    fontFamily: 'inherit',
                    background: '#f8fafc',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = gold}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
                {search && (
                  <button
                    onClick={() => updateParams({ q: '' })}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: 14, fontWeight: 800 }}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* View Switcher */}
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <button
                  className="doc-btn-interactive"
                  onClick={() => updateParams({ view: 'grid' })}
                  style={{
                    padding: '9px 14px',
                    borderRadius: 8,
                    border: `1.5px solid ${view === 'grid' ? navy : '#e2e8f0'}`,
                    background: view === 'grid' ? navy : '#fff',
                    color: view === 'grid' ? '#fff' : '#64748b',
                    fontWeight: 700,
                    fontSize: 12.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <span>⊞</span> Grid
                </button>
                <button
                  className="doc-btn-interactive"
                  onClick={() => updateParams({ view: 'list' })}
                  style={{
                    padding: '9px 14px',
                    borderRadius: 8,
                    border: `1.5px solid ${view === 'list' ? navy : '#e2e8f0'}`,
                    background: view === 'list' ? navy : '#fff',
                    color: view === 'list' ? '#fff' : '#64748b',
                    fontWeight: 700,
                    fontSize: 12.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <span>☰</span> List
                </button>
                <span style={{ background: '#f1f5f9', color: navy, borderRadius: 20, padding: '6px 14px', fontSize: 12.5, fontWeight: 800 }}>
                  {filtered.length} Docs
                </span>
              </div>
            </div>

            {/* Type Filter Pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.8, flexShrink: 0 }}>
                DOCUMENT TYPE:
              </span>
              {DOC_TYPES.map(t => {
                const isSelected = (selType === 'All' && t === 'All') || selType.toLowerCase() === t.toLowerCase();
                const m = DOC_META[t] || { bg: '#f1f5f9', text: '#334155', border: '#e2e8f0', icon: '📄' };
                return (
                  <button
                    key={t}
                    onClick={() => updateParams({ type: t })}
                    className="doc-btn-interactive"
                    style={{
                      padding: '6px 14px',
                      borderRadius: 20,
                      border: `1.5px solid ${isSelected ? (t === 'All' ? navy : m.border) : '#e2e8f0'}`,
                      background: isSelected ? (t === 'All' ? navy : m.bg) : '#fff',
                      color: isSelected ? (t === 'All' ? '#fff' : m.text) : '#64748b',
                      fontWeight: 700,
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span>{t !== 'All' ? m.icon : '📑'}</span> {t === 'All' ? 'All Archive' : m.label || t}
                  </button>
                );
              })}
            </div>

            {/* Year Secondary Filter */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', paddingTop: 10, borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>YEAR:</span>
                {years.map(y => (
                  <button
                    key={y}
                    onClick={() => updateParams({ year: String(y) })}
                    className="doc-btn-interactive"
                    style={{
                      padding: '3px 10px',
                      borderRadius: 6,
                      border: `1px solid ${selYear === String(y) ? gold : '#e2e8f0'}`,
                      background: selYear === String(y) ? gold : 'transparent',
                      color: selYear === String(y) ? navy : '#64748b',
                      fontWeight: 700,
                      fontSize: 11.5,
                    }}
                  >
                    {y}
                  </button>
                ))}
              </div>

              {(selType !== 'All' || selYear !== 'All' || search) && (
                <button
                  onClick={() => updateParams({ type: 'All', year: 'All', q: '' })}
                  className="doc-btn-interactive"
                  style={{
                    padding: '3px 12px',
                    borderRadius: 6,
                    border: '1px solid #fca5a5',
                    background: '#fef2f2',
                    color: '#dc2626',
                    fontWeight: 700,
                    fontSize: 11.5,
                    marginLeft: 'auto',
                  }}
                >
                  ✕ Reset Filters
                </button>
              )}
            </div>
          </section>

          {/* Results Feed */}
          <section>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 16 }}>
                <div style={{ width: 44, height: 44, border: `4px solid ${gold}`, borderTop: '4px solid transparent', borderRadius: '50%', animation: 'spin .8s linear infinite', margin: '0 auto 16px' }} />
                <p style={{ color: '#64748b', fontWeight: 600 }}>Loading official archives...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 44, marginBottom: 12 }}>📂</div>
                <h3 style={{ color: navy, fontWeight: 800, margin: '0 0 6px' }}>No Documents Found</h3>
                <p style={{ color: '#64748b', fontSize: 14 }}>Try adjusting your search criteria or resetting filters.</p>
              </div>
            ) : view === 'grid' ? (
              /* GRID VIEW */
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 22 }}>
                {paginated.map(d => {
                  const m = DOC_META[d.type] || DOC_META.Document;
                  const pdfLink = d.pdfUrl || d.link;

                  return (
                    <div
                      key={d.id}
                      className="doc-card-hover"
                      style={{
                        background: '#fff',
                        borderRadius: 16,
                        overflow: 'hidden',
                        boxShadow: '0 4px 18px rgba(15,35,71,0.06)',
                        border: '1.5px solid #edf2f7',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {d.coverImage ? (
                        <div
                          style={{
                            width: '100%',
                            height: 190,
                            position: 'relative',
                            overflow: 'hidden',
                            background: '#09172e',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <img
                            src={d.coverImage}
                            alt=""
                            aria-hidden="true"
                            style={{
                              position: 'absolute',
                              inset: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              filter: 'blur(20px) brightness(0.4)',
                              opacity: 0.7,
                            }}
                          />
                          <img
                            src={d.coverImage}
                            alt={d.title}
                            style={{
                              maxHeight: '90%',
                              maxWidth: '90%',
                              objectFit: 'contain',
                              position: 'relative',
                              zIndex: 2,
                              borderRadius: 6,
                              boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                            }}
                          />
                          <span style={{ position: 'absolute', top: 12, right: 12, background: m.bg, color: m.text, border: `1px solid ${m.border}`, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 800, zIndex: 3 }}>
                            {m.icon} {d.type || 'Document'}
                          </span>
                        </div>
                      ) : (
                        <div style={{ height: 6, background: `linear-gradient(90deg, ${navy}, ${gold})` }} />
                      )}

                      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {!d.coverImage && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: `1px solid ${m.border}` }}>
                              {m.icon}
                            </div>
                            <span style={{ background: m.bg, color: m.text, border: `1px solid ${m.border}`, padding: '3px 11px', borderRadius: 20, fontSize: 11.5, fontWeight: 800 }}>
                              {d.type || 'Document'}
                            </span>
                          </div>
                        )}

                        <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 800, color: navy, lineHeight: 1.45 }}>
                          {d.title}
                        </h3>

                        {d.description && (
                          <p style={{ margin: '0 0 12px', fontSize: 12.5, color: '#64748b', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            {d.description}
                          </p>
                        )}

                        <div style={{ marginTop: 'auto', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', marginBottom: 14 }}>
                          <span style={{ fontSize: 11.5, color: '#94a3b8', fontWeight: 600 }}>📅 {fmtDt(d.createdAt)}</span>
                          {d.fileSize && (
                            <span style={{ fontSize: 11, color: '#64748b', background: '#f8fafc', padding: '2px 8px', borderRadius: 6, border: '1px solid #e2e8f0', fontWeight: 700 }}>
                              {d.fileSize}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            type="button"
                            onClick={() => {
                              if (pdfLink && (pdfLink.includes('drive.google') || pdfLink.toLowerCase().endsWith('.pdf') || pdfLink.includes('firebase') || pdfLink.startsWith('blob:'))) {
                                setSelectedPdf({ url: pdfLink, title: d.title || 'Document' });
                              } else if (pdfLink) {
                                window.open(pdfLink, '_blank');
                              } else {
                                toast.error('Document file not attached.');
                              }
                            }}
                            className="doc-btn-interactive"
                            style={{
                              flex: 1,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minHeight: 42,
                              gap: 6,
                              background: navy,
                              color: '#fff',
                              padding: '8px 14px',
                              borderRadius: 8,
                              fontSize: 13,
                              fontWeight: 700,
                            }}
                          >
                            👁️ View PDF
                          </button>

                          <button
                            type="button"
                            onClick={() => handleShareWhatsApp(d)}
                            className="doc-btn-interactive"
                            style={{
                              background: '#f0fdf4',
                              color: '#15803d',
                              border: '1px solid #bbf7d0',
                              borderRadius: 8,
                              width: 42,
                              minHeight: 42,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 16,
                            }}
                            title="Share on WhatsApp"
                          >
                            💬
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyLink(d)}
                            className="doc-btn-interactive"
                            style={{
                              background: '#f8fafc',
                              color: '#64748b',
                              border: '1px solid #e2e8f0',
                              borderRadius: 8,
                              width: 42,
                              minHeight: 42,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 14,
                            }}
                            title="Copy link"
                          >
                            🔗
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* LIST VIEW */
              <div style={{ background: '#fff', padding: '24px 28px', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                {Object.entries(grouped).sort((a, b) => b[0] - a[0]).map(([year, items]) => (
                  <div key={year} style={{ marginBottom: 28 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                      <span style={{ background: navy, color: gold, borderRadius: 8, padding: '5px 16px', fontWeight: 800, fontSize: 12.5 }}>
                        📂 {year}
                      </span>
                      <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                      <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>
                        {items.length} document{items.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {items.map(d => {
                        const m = DOC_META[d.type] || DOC_META.Document;
                        const pdfLink = d.pdfUrl || d.link;
                        return (
                          <div
                            key={d.id}
                            className="doc-row-hover"
                            style={{
                              background: '#fff',
                              borderRadius: 12,
                              padding: '12px 18px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 14,
                              border: '1px solid #edf2f7',
                              boxShadow: '0 2px 8px rgba(15,35,71,0.03)',
                            }}
                          >
                            <div style={{ width: 42, height: 42, borderRadius: 10, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, border: `1px solid ${m.border}` }}>
                              {m.icon}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 800, fontSize: 14.5, color: navy, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {d.title}
                              </div>
                              <div style={{ display: 'flex', gap: 8, marginTop: 4, alignItems: 'center', flexWrap: 'wrap' }}>
                                <span style={{ background: m.bg, color: m.text, border: `1px solid ${m.border}`, padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                                  {d.type || 'Document'}
                                </span>
                                <span style={{ fontSize: 12, color: '#94a3b8' }}>📅 {fmtDt(d.createdAt)}</span>
                                {d.fileSize && <span style={{ fontSize: 11, color: '#64748b' }}>• {d.fileSize}</span>}
                              </div>
                            </div>

                            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                              <button
                                onClick={() => {
                                  if (pdfLink && (pdfLink.includes('drive.google') || pdfLink.toLowerCase().endsWith('.pdf') || pdfLink.includes('firebase') || pdfLink.startsWith('blob:'))) {
                                    setSelectedPdf({ url: pdfLink, title: d.title || 'Document' });
                                  } else if (pdfLink) {
                                    window.open(pdfLink, '_blank');
                                  } else {
                                    toast.error('Document file not attached.');
                                  }
                                }}
                                className="doc-btn-interactive"
                                style={{
                                  background: navy,
                                  color: '#fff',
                                  padding: '8px 16px',
                                  borderRadius: 8,
                                  fontSize: 12.5,
                                  fontWeight: 700,
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                👁️ View PDF
                              </button>
                              <button
                                onClick={() => handleShareWhatsApp(d)}
                                className="doc-btn-interactive"
                                style={{
                                  background: '#f0fdf4',
                                  color: '#15803d',
                                  border: '1px solid #bbf7d0',
                                  borderRadius: 8,
                                  padding: '8px 12px',
                                  fontSize: 13,
                                }}
                                title="Share on WhatsApp"
                              >
                                💬
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && filtered.length > ITEMS_PER_PAGE && (
              <div style={{ marginTop: 28 }}>
                <PremiumPagination
                  totalItems={filtered.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </section>
        </main>
      </div>

      {/* PDF Modal */}
      {selectedPdf && (
        <Suspense fallback={null}>
          <PDFModal
            url={selectedPdf.url}
            title={selectedPdf.title}
            onClose={() => setSelectedPdf(null)}
          />
        </Suspense>
      )}
    </div>
  );
}