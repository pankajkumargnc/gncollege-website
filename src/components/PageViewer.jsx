// src/components/PageViewer.jsx
// ✅ ENHANCED: Premium .gnc-prose styling for ALL Jodit-generated HTML
// Tables, headings, lists, blockquotes, images — sab premium dikhe
// Admin ko kuch alag nahi karna — Jodit se normal content likho, yahan auto-styled

import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import DOMPurify from 'dompurify';

// ─────────────────────────────────────────────────────────────────────────────
// PREMIUM PROSE CSS — injected once, styles ALL Jodit HTML output
// ─────────────────────────────────────────────────────────────────────────────
const PROSE_CSS = `
  /* ── Base ── */
  .gnc-prose {
    font-family: 'Plus Jakarta Sans', 'DM Sans', 'Segoe UI', system-ui, sans-serif;
    font-size: 16px;
    line-height: 1.8;
    color: #334155;
    max-width: 100%;
    word-break: break-word;
  }

  /* ── Headings ── */
  .gnc-prose h1, .gnc-prose h2, .gnc-prose h3,
  .gnc-prose h4, .gnc-prose h5, .gnc-prose h6 {
    font-family: 'Plus Jakarta Sans', 'DM Sans', 'Segoe UI', system-ui, sans-serif;
    color: #0f2347;
    font-weight: 800;
    line-height: 1.3;
    margin: 1.8em 0 0.6em;
    letter-spacing: -0.02em;
  }
  .gnc-prose h1 { font-size: 2rem; }
  .gnc-prose h2 {
    font-size: 1.5rem;
    padding-bottom: 10px;
    border-bottom: 3px solid #f4a023;
    display: inline-block;
  }
  .gnc-prose h3 { font-size: 1.25rem; color: #1a3a7c; }
  .gnc-prose h4 { font-size: 1.1rem; color: #1a3a7c; font-weight: 700; }
  .gnc-prose h5, .gnc-prose h6 { font-size: 1rem; color: #64748b; font-weight: 700; }

  /* ── Paragraphs ── */
  .gnc-prose p {
    margin: 0.9em 0 1em;
    color: #334155;
  }

  /* ── Links ── */
  .gnc-prose a {
    color: #1a3a7c;
    text-decoration: underline;
    text-underline-offset: 3px;
    font-weight: 600;
    transition: color 0.2s;
  }
  .gnc-prose a:hover { color: #f4a023; }

  /* ── Bold / Italic ── */
  .gnc-prose strong, .gnc-prose b { color: #0f2347; font-weight: 700; }
  .gnc-prose em, .gnc-prose i { color: #475569; }

  /* ── Horizontal Rule ── */
  .gnc-prose hr {
    border: none;
    border-top: 2px solid #e2e8f0;
    margin: 2em 0;
  }

  /* ── Lists ── */
  .gnc-prose ul, .gnc-prose ol {
    padding-left: 1.6em;
    margin: 0.8em 0 1.2em;
    color: #334155;
  }
  .gnc-prose ul { list-style: none; }
  .gnc-prose ul li {
    position: relative;
    padding-left: 1.2em;
    margin-bottom: 0.5em;
  }
  .gnc-prose ul li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.65em;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #f4a023;
  }
  .gnc-prose ol li { margin-bottom: 0.5em; }
  .gnc-prose ol li::marker { color: #f4a023; font-weight: 700; }

  /* ── Blockquote ── */
  .gnc-prose blockquote {
    border-left: 4px solid #f4a023;
    background: #fff8ed;
    margin: 1.5em 0;
    padding: 16px 24px;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: #475569;
  }
  .gnc-prose blockquote p { margin: 0; }

  /* ── Inline Code ── */
  .gnc-prose code {
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 2px 7px;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.88em;
    color: #c0392b;
  }
  .gnc-prose pre {
    background: #0f2347;
    border-radius: 10px;
    padding: 20px 24px;
    overflow-x: auto;
    margin: 1.5em 0;
  }
  .gnc-prose pre code {
    background: transparent;
    border: none;
    color: #a8ff78;
    font-size: 0.9em;
    padding: 0;
  }

  /* ── Images ── */
  .gnc-prose img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    margin: 1em 0;
    display: block;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }

  /* ─────────────────────────────────────────────────────────────────────────
     ★ PREMIUM TABLE STYLES ★
     Jodit editor ki plain table ko premium bana deta hai
     Admin ko kuch alag nahi karna — sirf normal table insert karo Jodit mein
  ───────────────────────────────────────────────────────────────────────── */
  .gnc-prose table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0 2em;
    font-size: 0.95rem;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(15, 35, 71, 0.1);
    border: 1px solid #dde8f5;
  }

  /* Header row — navy background */
  .gnc-prose thead tr,
  .gnc-prose table tr:first-child {
    background: linear-gradient(135deg, #0f2347 0%, #1a3a7c 100%) !important;
  }
  .gnc-prose thead th,
  .gnc-prose thead td,
  .gnc-prose table tr:first-child td,
  .gnc-prose table tr:first-child th {
    color: #ffffff !important;
    font-weight: 700 !important;
    font-size: 0.88rem !important;
    letter-spacing: 0.04em !important;
    text-transform: uppercase !important;
    padding: 14px 18px !important;
    border: none !important;
    border-right: 1px solid rgba(255,255,255,0.15) !important;
    background: transparent !important;
  }
  .gnc-prose thead th:last-child,
  .gnc-prose table tr:first-child td:last-child,
  .gnc-prose table tr:first-child th:last-child {
    border-right: none !important;
  }

  /* Gold accent on first column header */
  .gnc-prose thead th:first-child,
  .gnc-prose table tr:first-child td:first-child {
    border-left: 3px solid #f4a023 !important;
  }

  /* Body rows */
  .gnc-prose tbody tr,
  .gnc-prose table tr:not(:first-child) {
    border-bottom: 1px solid #e8f0fa;
    transition: background 0.15s ease;
  }

  /* Zebra striping — odd rows */
  .gnc-prose tbody tr:nth-child(odd),
  .gnc-prose table tr:nth-child(even):not(:first-child) {
    background: #f8faff;
  }

  /* Even rows */
  .gnc-prose tbody tr:nth-child(even),
  .gnc-prose table tr:nth-child(odd):not(:first-child) {
    background: #ffffff;
  }

  /* Row hover */
  .gnc-prose tbody tr:hover,
  .gnc-prose table tr:not(:first-child):hover {
    background: #edf3ff !important;
  }

  /* Body cells */
  .gnc-prose td,
  .gnc-prose tbody th {
    padding: 12px 18px;
    color: #334155;
    font-size: 0.93rem;
    border-right: 1px solid #e8f0fa;
    vertical-align: top;
  }
  .gnc-prose td:last-child { border-right: none; }

  /* First column emphasis */
  .gnc-prose td:first-child {
    font-weight: 600;
    color: #0f2347;
    border-left: 3px solid transparent;
  }
  .gnc-prose tr:hover td:first-child {
    border-left-color: #f4a023;
  }

  /* Responsive table wrapper — horizontal scroll on mobile */
  .gnc-table-wrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 12px;
    margin: 1.5em 0 2em;
  }
  .gnc-table-wrap .gnc-prose table { margin: 0; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .gnc-prose { font-size: 15px; }
    .gnc-prose h1 { font-size: 1.6rem; }
    .gnc-prose h2 { font-size: 1.3rem; }
    .gnc-prose td, .gnc-prose th { padding: 10px 12px; font-size: 0.85rem; }
  }
`;

// Inject CSS once into document head
let cssInjected = false;
const injectProseCSS = () => {
  if (cssInjected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.id = 'gnc-prose-styles';
  style.textContent = PROSE_CSS;
  document.head.appendChild(style);
  cssInjected = true;
};

// Wrap all tables in a scrollable div for mobile responsiveness
const wrapTablesForMobile = (html) => {
  if (!html) return '';
  return html.replace(
    /<table/gi,
    '<div class="gnc-table-wrap"><table'
  ).replace(
    /<\/table>/gi,
    '</table></div>'
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Page Hero Banner
// ─────────────────────────────────────────────────────────────────────────────
const PageHero = ({ title }) => (
  <div style={{
    background: 'linear-gradient(135deg, #0f2347 0%, #1a3a7c 60%, #0f2347 100%)',
    padding: '52px 24px 40px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Decorative circles */}
    <div style={{
      position: 'absolute', top: -40, right: -40,
      width: 200, height: 200, borderRadius: '50%',
      background: 'rgba(244,160,35,0.08)', pointerEvents: 'none',
    }} />
    <div style={{
      position: 'absolute', bottom: -30, left: -30,
      width: 140, height: 140, borderRadius: '50%',
      background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
    }} />

    {/* Gold top-bar */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      height: 4,
      background: 'linear-gradient(90deg, #f4a023, #ffd57e, #f4a023)',
    }} />

    <h1 style={{
      color: '#fff',
      fontSize: 'clamp(1.4rem, 4vw, 2rem)',
      fontWeight: 900,
      letterSpacing: '-0.02em',
      margin: 0,
      lineHeight: 1.25,
      fontFamily: "'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif",
    }}>
      {title || 'Page'}
    </h1>

    {/* Gold underline accent */}
    <div style={{
      width: 60, height: 3,
      background: '#f4a023',
      borderRadius: 2,
      margin: '12px auto 0',
    }} />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// "Content not found" empty state
// ─────────────────────────────────────────────────────────────────────────────
const EmptyState = ({ path }) => (
  <div style={{
    textAlign: 'center',
    padding: '80px 24px',
    color: '#94a3b8',
  }}>
    <div style={{ fontSize: 56, marginBottom: 16 }}>📄</div>
    <h3 style={{
      color: '#64748b', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 8px',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    }}>
      Content Coming Soon
    </h3>
    <p style={{ margin: 0, fontSize: 14 }}>
      Admin Panel → Pages & SEO → Add content for this page
    </p>
    <code style={{
      display: 'inline-block', marginTop: 12, background: '#f1f5f9',
      border: '1px solid #e2e8f0', borderRadius: 6, padding: '4px 12px',
      fontSize: 12, color: '#475569',
    }}>
      path: {path || window.location.hash?.replace('#', '') || '/'}
    </code>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Loading Skeleton
// ─────────────────────────────────────────────────────────────────────────────
const Skeleton = () => (
  <div style={{ padding: '32px 24px' }}>
    {[100, 70, 90, 55, 80].map((w, i) => (
      <div key={i} style={{
        height: i === 0 ? 20 : 14,
        width: `${w}%`,
        background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
        backgroundSize: '200% 100%',
        borderRadius: 6,
        marginBottom: i === 0 ? 24 : 12,
        animation: 'gnc-shimmer 1.5s infinite',
      }} />
    ))}
    <style>{`
      @keyframes gnc-shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// PageViewer — Main Export
// ─────────────────────────────────────────────────────────────────────────────
const PageViewer = ({ page }) => {
  // CSS inject on mount
  useEffect(() => { injectProseCSS(); }, []);

  // If page is passed as prop (from App.jsx placeholder routes)
  if (page !== undefined) {
    const content = page?.content;
    const title   = page?.title;
    const safePath = typeof window !== 'undefined'
      ? window.location.hash?.replace('#', '') || '/'
      : '/';

    return (
      <div style={{ minHeight: '60vh', background: '#f8fafc' }}>
        <PageHero title={title || 'Page'} />
        <div style={{
          maxWidth: 900, margin: '0 auto',
          padding: '40px 24px 80px',
        }}>
          {content ? (
            <div
              className="gnc-prose"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(wrapTablesForMobile(content))
              }}
            />
          ) : (
            <EmptyState path={safePath} />
          )}
        </div>
      </div>
    );
  }

  // Standalone mode — reads from pdfReports or pages collection
  // (used when PageViewer is used without a page prop, e.g. directly via route)
  return <PageViewerStandalone />;
};

// Standalone version — fetches its own data
const PageViewerStandalone = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(null);

  useEffect(() => {
    injectProseCSS();
    const hash     = window.location.hash?.replace('#', '') || '';
    const currentPath = hash.startsWith('/') ? hash : '/' + hash;

    const q = query(
      collection(db, 'pages'),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(q, snap => {
      const pages = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      const found = pages.find(p => p.path === currentPath || p.slug === currentPath.replace('/', ''));
      setPage(found || null);
      setLoading(false);
    }, () => setLoading(false));

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', background: '#f8fafc' }}>
        <div style={{
          background: 'linear-gradient(135deg, #0f2347 0%, #1a3a7c 100%)',
          padding: '52px 24px 40px', textAlign: 'center',
        }}>
          <div style={{
            height: 28, width: 240,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 8, margin: '0 auto',
          }} />
        </div>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '60vh', background: '#f8fafc' }}>
      <PageHero title={page?.title || 'Page'} />
      <div style={{
        maxWidth: 900, margin: '0 auto',
        padding: '40px 24px 80px',
      }}>
        {page?.content ? (
          <div
            className="gnc-prose"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(wrapTablesForMobile(page.content))
            }}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default PageViewer;