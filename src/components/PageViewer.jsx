// src/components/PageViewer.jsx
// ✅ ENHANCED: Premium .gnc-prose styling for ALL Jodit-generated HTML
// Tables, headings, lists, blockquotes, images — sab premium dikhe
// Admin ko kuch alag nahi karna — Jodit se normal content likho, yahan auto-styled

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import PDFModal from './PDFModal'; 
import GalleryPage from '../pages/GalleryPage';
import EventsPage from '../pages/EventsPage';
import StaffPage from '../pages/StaffPage';

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

  /* ─────────────────────────────────────────────────────────────────────────
     ★ PREMIUM TEMPLATES (from Admin Pages) ★
  ───────────────────────────────────────────────────────────────────────── */
  
  /* 1. Notice Card */
  .premium-notice-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;
  }
  .premium-notice-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px;
    background: linear-gradient(90deg, #f4a023, #ffd57e);
  }
  [data-theme="dark"] .premium-notice-card {
    background: #1e293b;
    border-color: #334155;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  }

  /* 2. Event Report */
  .event-report h1 { text-align: left !important; margin-top: 0; }
  .event-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin: 20px 0;
  }
  @media (max-width: 600px) { .event-grid { grid-template-columns: 1fr; } }
  .event-grid img { margin: 0; }

  /* 3. IQAC / Academic Templates */
  .iqac-page h1 { text-align: center; color: #0f2347; }
  .iqac-meta {
    display: flex; justify-content: center; gap: 20px;
    font-size: 0.9rem; color: #64748b; margin-bottom: 20px;
    font-weight: 600; text-transform: uppercase; letter-spacing: 1px;
  }
  [data-theme="dark"] .iqac-meta { color: #94a3b8; }

  /* 4. Support for .premium-table alias */
  .premium-table {
    width: 100%; border-collapse: collapse; margin: 1.5em 0;
    border-radius: 12px; overflow: hidden; border: 1px solid #dde8f5;
  }
  .premium-table th { background: #0f2347; color: #fff; padding: 12px; }
  .premium-table td { padding: 12px; border: 1px solid #e8f0fa; }
  [data-theme="dark"] .premium-table { border-color: #334155; }
  [data-theme="dark"] .premium-table td { border-color: #1e293b; color: #cbd5e1; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .gnc-prose { font-size: 15px; }
    .gnc-prose h1 { font-size: 1.6rem; }
    .gnc-prose h2 { font-size: 1.3rem; }
    .gnc-prose td, .gnc-prose th { padding: 10px 12px; font-size: 0.85rem; }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     ★ DARK MODE COMPATIBILITY ★
  ───────────────────────────────────────────────────────────────────────── */
  [data-theme="dark"] .gnc-prose { color: #cbd5e1; }
  [data-theme="dark"] .gnc-prose h1,
  [data-theme="dark"] .gnc-prose h2,
  [data-theme="dark"] .gnc-prose h3 { color: #f1f5f9; }
  [data-theme="dark"] .gnc-prose h2 { border-bottom-color: #f4a023; }
  [data-theme="dark"] .gnc-prose h4,
  [data-theme="dark"] .gnc-prose h5,
  [data-theme="dark"] .gnc-prose h6 { color: #e2e8f0; }
  [data-theme="dark"] .gnc-prose p { color: #cbd5e1; }
  
  [data-theme="dark"] .gnc-prose a { color: #f4a023; }
  [data-theme="dark"] .gnc-prose a:hover { color: #fff; }
  
  [data-theme="dark"] .gnc-prose strong,
  [data-theme="dark"] .gnc-prose b { color: #fff; }
  [data-theme="dark"] .gnc-prose em,
  [data-theme="dark"] .gnc-prose i { color: #94a3b8; }
  
  [data-theme="dark"] .gnc-prose hr { border-top-color: #334155; }
  
  [data-theme="dark"] .gnc-prose ul li,
  [data-theme="dark"] .gnc-prose ol li { color: #cbd5e1; }
  
  [data-theme="dark"] .gnc-prose blockquote {
    background: rgba(244, 160, 35, 0.05);
    color: #e2e8f0;
    border-left-color: #f4a023;
  }

  [data-theme="dark"] .gnc-prose code { background: #1e293b; border-color: #334155; color: #f4a023; }
  
  [data-theme="dark"] .gnc-prose table {
    border-color: #334155;
    background: #0f172a;
    box-shadow: 0 10px 40px rgba(0,0,0,0.4);
  }
  [data-theme="dark"] .gnc-prose tbody tr,
  [data-theme="dark"] .gnc-prose table tr:not(:first-child) {
    border-bottom-color: #1e293b;
  }
  [data-theme="dark"] .gnc-prose tbody tr:nth-child(odd),
  [data-theme="dark"] .gnc-prose table tr:nth-child(even):not(:first-child) {
    background: #111d35;
  }
  [data-theme="dark"] .gnc-prose tbody tr:nth-child(even),
  [data-theme="dark"] .gnc-prose table tr:nth-child(odd):not(:first-child) {
    background: #0f172a;
  }
  [data-theme="dark"] .gnc-prose td {
    color: #cbd5e1;
    border-right-color: #1e293b;
  }
  [data-theme="dark"] .gnc-prose td:first-child { color: #f1f5f9; border-left-color: #f4a023; }
  
  [data-theme="dark"] .gnc-prose tbody tr:hover,
  [data-theme="dark"] .gnc-prose table tr:not(:first-child):hover {
    background: #1e293b !important;
  }
`;

// Inject CSS once into document head
const injectProseCSS = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('gnc-prose-styles')) return;

  const style = document.createElement('style');
  style.id = 'gnc-prose-styles';
  style.textContent = PROSE_CSS;
  document.head.appendChild(style);
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
// ✅ NEW: PDF Click Interceptor Hook
// Yeh hook CMS content (Jodit HTML) ke andar ke clicks ko dhyan se dekhta hai.
// Agar kisi ne PDF link par click kiya toh ye usse naye tab mein khulne se rok kar PDFModal mein open kar dega.
// ─────────────────────────────────────────────────────────────────────────────
const usePdfInterceptor = () => {
  const [pdfPreview, setPdfPreview] = useState(null);

  const handleContentClick = (e) => {
    let target = e.target;
    // Anchor tag find karne ke liye DOM tree mein thoda upar traverse karte hain
    while (target && target.tagName !== 'A' && target !== e.currentTarget) {
      target = target.parentNode;
    }
    
    // Agar click <a> tag par hua tha
    if (target && target.tagName === 'A') {
      const href = target.getAttribute('href');
      // Agar link PDF ya Google Drive ka hai toh intercept karo
      if (href && (href.includes('drive.google.com') || href.toLowerCase().endsWith('.pdf') || href.includes('firebasestorage'))) {
        e.preventDefault();
        setPdfPreview({ url: href, title: target.innerText || 'Document Preview' });
      }
    }
  };

  return { pdfPreview, setPdfPreview, handleContentClick };
};

// ─────────────────────────────────────────────────────────────────────────────
// Page Hero Banner
// ─────────────────────────────────────────────────────────────────────────────
const PageHero = ({ title }) => (
  <div style={{
    background: 'linear-gradient(135deg, #0f2347 0%, #1a3a7c 60%, #0f2347 100%)',
    padding: 'clamp(50px, 10vw, 80px) 24px clamp(40px, 8vw, 60px)',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderBottom: '4px solid #f4a023'
  }}>
    <div style={{
      position: 'absolute', top: -40, right: -40,
      width: 'clamp(150px, 20vw, 300px)', height: 'clamp(150px, 20vw, 300px)', borderRadius: '50%',
      background: 'rgba(244,160,35,0.08)', pointerEvents: 'none',
    }} />
    <div style={{
      position: 'absolute', bottom: -30, left: -30,
      width: 'clamp(100px, 15vw, 200px)', height: 'clamp(100px, 15vw, 200px)', borderRadius: '50%',
      background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
    }} />
    <div style={{ position: 'relative', zIndex: 2 }}>
      <h1 style={{
        color: '#fff', fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
        fontWeight: 900, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.2,
        fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
        textShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}>
        {title || 'Page'}
      </h1>
      <div style={{
        width: 60, height: 4, background: '#f4a023',
        borderRadius: 10, margin: '20px auto 0',
        boxShadow: '0 2px 8px rgba(244,160,35,0.4)'
      }} />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Empty State & Skeleton Loading
// ─────────────────────────────────────────────────────────────────────────────
const EmptyState = ({ path }) => (
  <div style={{ textAlign: 'center', padding: '80px 24px', color: '#94a3b8' }}>
    <div style={{ fontSize: 56, marginBottom: 16 }}>📄</div>
    <h3 style={{ color: '#64748b', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 8px', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      Content Coming Soon
    </h3>
    <p style={{ margin: 0, fontSize: 14 }}>
      Admin Panel → Pages & SEO → Add content for this page
    </p>
    <code style={{ display: 'inline-block', marginTop: 12, background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 6, padding: '4px 12px', fontSize: 12, color: '#475569' }}>
      path: {path || window.location.hash?.replace('#', '') || '/'}
    </code>
  </div>
);

const Skeleton = () => (
  <div style={{ padding: '32px 24px' }}>
    {[100, 70, 90, 55, 80].map((w, i) => (
      <div key={i} style={{
        height: i === 0 ? 20 : 14, width: `${w}%`,
        background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
        backgroundSize: '200% 100%', borderRadius: 6,
        marginBottom: i === 0 ? 24 : 12, animation: 'gnc-shimmer 1.5s infinite',
      }} />
    ))}
    <style>{`@keyframes gnc-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ✅ NEW: SHORTCODE ENGINE
// ─────────────────────────────────────────────────────────────────────────────
const ShortcodeRenderer = ({ code, gallery, events, faculties }) => {
  const [tag, val] = code.replace('[', '').replace(']', '').split(':');
  
  if (tag === 'GALLERY') return <GalleryPage gallery={gallery} headless />;
  if (tag === 'EVENTS')  return <EventsPage headless />; 
  if (tag === 'STAFF')   return <StaffPage faculties={faculties} type={val === 'non-teaching' ? 'non-teaching-staff' : 'teaching-staff'} headless />;
  if (tag === 'TABLE')   return <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px dashed #ccc', textAlign: 'center', fontSize: 13 }}>[ Table Placeholder - Use Jodit Table Tool instead ]</div>;

  return <span style={{ color: 'red', fontWeight: 800 }}>{code}</span>;
};

const renderWithShortcodes = (html, props) => {
  if (!html) return null;
  
  // Regex to find [TAG:VAL]
  const regex = /(\[GALLERY:[^\]]+\]|\[EVENTS:[^\]]+\]|\[STAFF:[^\]]+\]|\[TABLE:[^\]]+\])/g;
  const parts = html.split(regex);

  return parts.map((part, i) => {
    if (part.match(regex)) {
      return <ShortcodeRenderer key={i} code={part} {...props} />;
    }
    return <div key={i} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(wrapTablesForMobile(part)) }} />;
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// ✅ PageViewer Component (Main)
// ─────────────────────────────────────────────────────────────────────────────
const PageViewer = ({ path, content, title, gallery, events, faculties }) => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(!content);
  const [page, setPage] = useState(content ? { content, title } : null);
  const [siteData, setSiteData] = useState({ gallery: gallery || [], events: events || [], faculties: faculties || [] });
  const { pdfPreview, setPdfPreview, handleContentClick } = usePdfInterceptor();
  
  useEffect(() => {
    injectProseCSS();
    
    let unsubs = [];

    // If we have a slug and no content, fetch it
    if (!content && slug) {
      setLoading(true);
      const q = query(collection(db, 'pages'), orderBy('createdAt', 'desc'));
      const unsubPage = onSnapshot(q, snap => {
        const pages = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Try to match by slug directly or full path
        const found = pages.find(p => p.slug === slug || p.slug === `/p/${slug}` || p.path === `/p/${slug}`);
        setPage(found || null);
        setLoading(false);
      }, () => setLoading(false));
      unsubs.push(unsubPage);

      // Fetch site data if missing
      if (!gallery || gallery.length === 0) {
        unsubs.push(onSnapshot(collection(db, 'gallery'), s => setSiteData(prev => ({ ...prev, gallery: s.docs.map(d => ({ id: d.id, ...d.data() })) }))));
      }
      if (!events || events.length === 0) {
        unsubs.push(onSnapshot(collection(db, 'events'), s => setSiteData(prev => ({ ...prev, events: s.docs.map(d => ({ id: d.id, ...d.data() })) }))));
      }
      if (!faculties || faculties.length === 0) {
        unsubs.push(onSnapshot(collection(db, 'faculty'), s => setSiteData(prev => ({ ...prev, faculties: s.docs.map(d => ({ id: d.id, ...d.data() })) }))));
      }
    }

    return () => unsubs.forEach(u => u && u());
  }, [slug, content, gallery, events, faculties]);

  if (loading) return (
    <div style={{ minHeight: '60vh', background: '#f8fafc' }}>
      <PageHero title="Loading..." />
      <div style={{ maxWidth: 900, margin: '0 auto' }}><Skeleton /></div>
    </div>
  );

  if (!page && !loading) return <EmptyState path={slug || path} />;

  return (
    <div style={{ minHeight: '60vh', background: '#f8fafc' }}>
      <PageHero title={page?.title || title || 'Page'} />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div className="gnc-prose" onClick={handleContentClick}>
           {renderWithShortcodes(page?.content, siteData)}
        </div>
      </div>

      {/* ✅ PDF Modal Render */}
      {pdfPreview && <PDFModal url={pdfPreview.url} title={pdfPreview.title} onClose={() => setPdfPreview(null)} />}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ✅ PageViewerStandalone Component
// ─────────────────────────────────────────────────────────────────────────────
export const PageViewerStandalone = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(null);
  const { pdfPreview, setPdfPreview, handleContentClick } = usePdfInterceptor();
  const [siteData, setSiteData] = useState({ gallery: [], events: [], faculties: [] });

  useEffect(() => {
    injectProseCSS();
    
    // Fetch site data for shortcodes
    const unsubG = onSnapshot(collection(db, 'gallery'), s => setSiteData(prev => ({ ...prev, gallery: s.docs.map(d => ({ id: d.id, ...d.data() })) })));
    const unsubE = onSnapshot(collection(db, 'events'), s => setSiteData(prev => ({ ...prev, events: s.docs.map(d => ({ id: d.id, ...d.data() })) })));
    const unsubF = onSnapshot(collection(db, 'faculty'), s => setSiteData(prev => ({ ...prev, faculties: s.docs.map(d => ({ id: d.id, ...d.data() })) })));

    const hash = window.location.hash?.replace('#', '') || '';
    const currentPath = hash.startsWith('/') ? hash : '/' + hash;

    const q = query(collection(db, 'pages'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      const pages = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      const slugValue = currentPath.split('/p/')[1] || currentPath.replace('/', '');
      const found = pages.find(p => p.slug === slugValue || p.path === currentPath);
      setPage(found || null);
      setLoading(false);
    }, () => setLoading(false));

    return () => { unsub(); unsubG(); unsubE(); unsubF(); };
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', background: '#f8fafc' }}>
        <div style={{ background: 'linear-gradient(135deg, #0f2347 0%, #1a3a7c 100%)', padding: '52px 24px 40px', textAlign: 'center' }}>
          <div style={{ height: 28, width: 240, background: 'rgba(255,255,255,0.15)', borderRadius: 8, margin: '0 auto' }} />
        </div>
        <div style={{ maxWidth: 900, margin: '0 auto' }}><Skeleton /></div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '60vh', background: '#f8fafc' }}>
      <PageHero title={page?.title || 'Page'} />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div className="gnc-prose" onClick={handleContentClick}>
           {renderWithShortcodes(page?.content, siteData)}
        </div>
      </div>

      {/* ✅ PDF Modal Render */}
      {pdfPreview && <PDFModal url={pdfPreview.url} title={pdfPreview.title} onClose={() => setPdfPreview(null)} />}
    </div>
  );
};

export default PageViewer;