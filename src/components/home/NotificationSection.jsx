// src/components/home/NotificationSection.jsx
// ✅ Gradient glow hover on all 3 notif cards (screenshot-style)
// ✅ Trailing arrow on attachment/download links
// ✅ All scroll logic + memory leak fix preserved
// ✅ v2: E-Documents card ab Google Drive se bhi data fetch karta hai
// ✅ v2: PDF items pe click → PDFModal opens (setPreviewPdf fix)

import { useRef, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../../styles/colors';
import SectionTitle from './SectionTitle';
import PDFModal from '../PDFModal';
import { useDriveDocs } from '../../hooks/useDriveDocs'; // ✅ Drive hook

const NotificationSection = ({ notices, announcements, pdfReports, upcomingEvents }) => {
  const noticesRef    = useRef(null);
  const newsRef       = useRef(null);
  const pdfRef        = useRef(null);
  const noticesRafRef = useRef(null);
  const newsRafRef    = useRef(null);
  const pdfRafRef     = useRef(null);

  // ✅ PDF Popup ke liye State
  const [previewPdf, setPreviewPdf] = useState(null);

  // ✅ Drive se E-Documents fetch karo
  // VITE_DRIVE_DOCUMENT_FOLDER .env mein set hai (1a9oCoEq5xpmsL_YeF0UKev9giHE0Eq_X)
  const { docs: driveDocs, loading: driveLoading } = useDriveDocs(
    import.meta.env.VITE_DRIVE_DOCUMENT_FOLDER
  );

  // ── Data prep ──────────────────────────────────────────────────────────────
  const doubledNotices = useMemo(() =>
    [...(notices || []), ...(notices || [])],
  [notices]);

  const combinedNews = useMemo(() => {
    const upcoming = (upcomingEvents || []).map(e => ({
      ...e, text: e.title,
      date: e.createdAt?.toDate?.() || e.date,
      type: e.type || 'Event',
    }));
    const news = (announcements || []).map(a => ({
      ...a,
      date: a.createdAt?.toDate?.() || a.date,
      type: a.type || 'News',
    }));
    return [...upcoming, ...news].sort((a, b) => (b.date || 0) - (a.date || 0));
  }, [upcomingEvents, announcements]);

  const doubledNews = useMemo(() =>
    [...combinedNews, ...combinedNews],
  [combinedNews]);

  // ✅ E-Documents: Drive docs + Firebase pdfReports combined
  const combinedDocs = useMemo(() => {
    // Drive docs ko Firebase format mein convert karo
    const driveFormatted = (driveDocs || []).map(d => ({
      id: `drive_${d.id}`,
      text: d.name,
      title: d.name,
      link: d.previewUrl,      // PDFModal me open hoga (drive iframe mode)
      downloadUrl: d.downloadUrl,
      date: d.date,
      type: 'Document',
      source: 'drive',         // badge ke liye
    }));

    // Firebase pdfReports ko standard format mein
    const fbFormatted = (pdfReports || []).map(p => ({
      ...p,
      text: p.title,
      link: p.link || p.pdfUrl,
      date: p.createdAt?.toDate?.() || p.date,
      type: p.type || 'Document',
      source: 'firebase',
    }));

    // Drive docs pehle dikhao (fresh content), Firebase baad mein
    return [...driveFormatted, ...fbFormatted];
  }, [driveDocs, pdfReports]);

  const doubledPdfReports = useMemo(() => {
    if (combinedDocs.length === 0) return [];
    return [...combinedDocs, ...combinedDocs];
  }, [combinedDocs]);

  // ── Scroll helpers (unchanged) ─────────────────────────────────────────────
  const startScrolling = (ref, rafRef) => {
    const el = ref.current;
    if (!el) return;
    let pos = 0;
    const animate = () => {
      pos -= 0.6;
      if (pos < -el.scrollHeight / 2) pos = 0;
      el.style.transform = `translateY(${pos}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
  };
  const stopScrolling = (rafRef) => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  };

  // ── useEffect 1 — Notices ─────────────────────────────────────────────────
  useEffect(() => {
    const el = noticesRef.current;
    if (!el) return;
    const onEnter = () => stopScrolling(noticesRafRef);
    const onLeave = () => startScrolling(noticesRef, noticesRafRef);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    startScrolling(noticesRef, noticesRafRef);
    return () => {
      stopScrolling(noticesRafRef);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [doubledNotices]);

  // ── useEffect 2 — News ────────────────────────────────────────────────────
  useEffect(() => {
    const el = newsRef.current;
    if (!el) return;
    const onEnter = () => stopScrolling(newsRafRef);
    const onLeave = () => startScrolling(newsRef, newsRafRef);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    startScrolling(newsRef, newsRafRef);
    return () => {
      stopScrolling(newsRafRef);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [doubledNews]);

  // ── useEffect 3 — PDF Reports ─────────────────────────────────────────────
  useEffect(() => {
    const el = pdfRef.current;
    if (!el) return;
    const onEnter = () => stopScrolling(pdfRafRef);
    const onLeave = () => startScrolling(pdfRef, pdfRafRef);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    startScrolling(pdfRef, pdfRafRef);
    return () => {
      stopScrolling(pdfRafRef);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [doubledPdfReports]);

  return (
    <section style={{ padding:'90px 20px', background:'#f8fafc', position:'relative' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'300px', background:'linear-gradient(180deg,#f1f5f9 0%,rgba(248,250,252,0) 100%)', zIndex:0 }} />

      <div style={{ maxWidth:1350, margin:'0 auto', position:'relative', zIndex:1 }}>
        <SectionTitle
          title="Notification & Announcements"
          subtitle="Stay informed with the latest official updates and campus news"
        />

        <style>{`
          /* ── Glow card wrapper ── */
          .nc-glow {
            position: relative;
            z-index: 0;
            border-radius: 26px;
          }
          .nc-glow::before {
            content: '';
            position: absolute;
            inset: -3px;
            border-radius: inherit;
            background: conic-gradient(
              from 0deg,
              #a855f7, #ec4899, #f97316, #eab308,
              #06b6d4, #6366f1, #a855f7
            );
            opacity: 0;
            filter: blur(10px);
            z-index: -1;
            transition: opacity .35s ease;
          }
          .nc-glow:hover::before { opacity: .6; }

          .notif-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 35px;
            margin-top: 40px;
          }
          .notif-card {
            background: #ffffff; border-radius: 24px; overflow: hidden;
            box-shadow: 0 20px 40px -10px rgba(15,23,42,0.08);
            border: 1px solid rgba(226,232,240,0.8);
            transition: transform 0.4s cubic-bezier(0.165,0.84,0.44,1), box-shadow 0.4s, border-color 0.4s;
            display: flex; flex-direction: column; height: 520px; position: relative;
          }
          .nc-glow:hover .notif-card {
            transform: translateY(-8px);
            box-shadow: 0 30px 60px -12px rgba(15,23,42,0.15);
            border-color: transparent;
          }
          .header-notice { background: linear-gradient(135deg,#1e3a8a 0%,#0f172a 100%); }
          .header-news   { background: linear-gradient(135deg,#e11d48 0%,#9f1239 100%); }
          .header-docs   { background: linear-gradient(135deg,#059669 0%,#047857 100%); }
          .notif-header {
            padding: 25px; display: flex; align-items: center; gap: 15px;
            color: #fff; font-weight: 800; font-size: 1.15rem; letter-spacing: 0.5px;
            position: relative; overflow: hidden;
          }
          .notif-header::after {
            content:''; position:absolute; inset:0;
            background: linear-gradient(45deg,transparent 40%,rgba(255,255,255,0.1) 50%,transparent 60%);
            background-size: 200% 200%;
            animation: shine 4s infinite linear;
          }
          @keyframes shine { 0%{background-position:200% center;} 100%{background-position:-200% center;} }
          .notif-body {
            padding: 10px 20px; flex: 1; overflow-y: hidden;
            display: flex; flex-direction: column;
            mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
          }
          .notif-item {
            padding: 18px 15px; border-bottom: 1px dashed #e2e8f0;
            text-align: left; position: relative;
            transition: background 0.25s, padding-left 0.25s, box-shadow 0.25s;
            border-radius: 10px; margin-bottom: 4px;
          }
          .notif-item:hover {
            background: #f8fafc; padding-left: 22px;
            box-shadow: inset 4px 0 0 0 ${COLORS.gold};
          }
          .notif-item:last-child { border-bottom: none; }
          .notif-meta {
            display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
            font-size: 0.7rem; color: #64748b; font-weight: 700;
            margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;
          }
          .cat-badge { padding: 3px 8px; border-radius: 6px; font-weight: 800; font-size: 0.65rem; background: #f1f5f9; }
          .drive-badge { padding: 2px 7px; border-radius: 5px; font-weight: 800; font-size: 0.6rem; background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; }
          .rich-text-title { margin: 0 0 6px; font-size: 0.95rem; color: #0f172a; font-weight: 700; line-height: 1.5; }
          .rich-text-desc  { margin: 0 0 6px; font-size: 0.85rem; color: #475569; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

          /* Attachment links — trailing arrow */
          .notif-alink {
            font-size: 0.8rem; font-weight: 800; text-decoration: none;
            display: inline-flex; align-items: center; gap: 4px;
          }
          .notif-alink .arr { display: inline-block; transition: transform .2s; }
          .notif-alink:hover .arr { transform: translateX(4px); }

          /* ✅ View PDF button for Drive docs */
          .pdf-view-btn {
            display: inline-flex; align-items: center; gap: 5px;
            font-size: 0.78rem; font-weight: 800;
            background: #e8f5e9; color: #2e7d32;
            border: 1px solid #c8e6c9; border-radius: 6px;
            padding: 4px 10px; cursor: pointer;
            transition: background 0.2s, transform 0.15s;
            margin-top: 6px;
          }
          .pdf-view-btn:hover { background: #c8e6c9; transform: translateX(2px); }

          .view-all-wrapper {
            padding: 18px 20px; background: #fff;
            border-top: 1px solid #f1f5f9; position: relative; z-index: 2;
          }
          .view-all-btn {
            display: block; width: 100%; padding: 13px;
            background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px;
            color: #334155; font-weight: 800; font-size: 0.85rem;
            cursor: pointer; transition: background 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s;
            text-align: center; text-transform: uppercase; letter-spacing: 1px; text-decoration: none;
          }
          .nc-glow:hover .view-all-btn {
            background: ${COLORS.navy}; color: #fff;
            border-color: ${COLORS.navy}; box-shadow: 0 8px 20px rgba(15,23,42,0.2);
          }
          @keyframes pulse-red {
            0%   { box-shadow: 0 0 0 0 rgba(239,68,68,0.7); }
            70%  { box-shadow: 0 0 0 6px rgba(239,68,68,0); }
            100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
          }
          .new-badge-pulse {
            background: #ef4444; color: #fff; font-size: 0.6rem;
            padding: 2px 6px; border-radius: 4px;
            animation: pulse-red 2s infinite; font-weight: 900;
          }
          @keyframes drive-spin { to { transform: rotate(360deg); } }
          .drive-loading-dot {
            display: inline-block; width: 8px; height: 8px;
            border: 2px solid #059669; border-top-color: transparent;
            border-radius: 50%; animation: drive-spin 0.7s linear infinite;
            margin-right: 6px; vertical-align: middle;
          }
          @media (max-width: 1100px) { .notif-grid { grid-template-columns: repeat(2,1fr); } }
          @media (max-width: 768px)  {
            .notif-grid { grid-template-columns: 1fr; gap: 20px; margin-top: 20px; }
            .notif-card { height: 420px; }
          }
        `}</style>

        <div className="notif-grid">

          {/* ── 1. OFFICIAL NOTICES ── */}
          <div className="nc-glow">
            <div className="notif-card">
              <div className="notif-header header-notice">
                <span style={{ fontSize:26 }}>🔔</span> Official Notices
              </div>
              <div className="notif-body">
                <div ref={noticesRef}>
                  {doubledNotices.map((n, i) => {
                    const isNew = n.isNew && n.date &&
                      (new Date() - new Date(n.date)) / 86400000 < 5;
                    return (
                      <div key={i} className="notif-item">
                        <div className="notif-meta">
                          <span>📅 {n.date ? new Date(n.date).toLocaleDateString('en-GB') : 'Recently'}</span>
                          <span className="cat-badge" style={{ color:'#1e3a8a' }}>{n.type || 'Notice'}</span>
                          {isNew && <span className="new-badge-pulse">NEW</span>}
                        </div>
                        <div className="rich-text-title" dangerouslySetInnerHTML={{ __html: n.text }} />
                        {n.link && (
                          <a href={n.link} target="_blank" rel="noreferrer"
                            className="notif-alink" style={{ color:'#2563eb' }}>
                            📎 View Attachment <span className="arr">›</span>
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="view-all-wrapper">
                <Link to="/notifications" className="view-all-btn">View All Notices</Link>
              </div>
            </div>
          </div>

          {/* ── 2. NEWS & EVENTS ── */}
          <div className="nc-glow">
            <div className="notif-card">
              <div className="notif-header header-news">
                <span style={{ fontSize:26 }}>📣</span> News & Events
              </div>
              <div className="notif-body">
                <div ref={newsRef}>
                  {doubledNews.map((n, i) => {
                    const isNew = (n.isNew || false) ||
                      (n.date && (new Date() - new Date(n.date)) / 86400000 < 5);
                    return (
                      <div key={i} className="notif-item">
                        <div className="notif-meta">
                          <span>📅 {n.date ? new Date(n.date).toLocaleDateString('en-GB') : 'Recently'}</span>
                          <span className="cat-badge" style={{ color:'#e11d48' }}>{n.type || 'Update'}</span>
                          {isNew && <span className="new-badge-pulse">NEW</span>}
                        </div>
                        <div className="rich-text-title" dangerouslySetInnerHTML={{ __html: n.text || n.title }} />
                        {n.desc && <div className="rich-text-desc" dangerouslySetInnerHTML={{ __html: n.desc }} />}
                        {n.link && (
                          <a href={n.link} target="_blank" rel="noreferrer"
                            className="notif-alink" style={{ color:'#e11d48' }}>
                            🔗 Read More <span className="arr">›</span>
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="view-all-wrapper">
                <Link to="/news" className="view-all-btn">Explore News</Link>
              </div>
            </div>
          </div>

          {/* ── 3. E-DOCUMENTS (Firebase + Google Drive) ── */}
          <div className="nc-glow">
            <div className="notif-card">
              <div className="notif-header header-docs">
                <span style={{ fontSize:26 }}>📄</span>
                E-Documents
                {/* Drive sync indicator */}
                {driveLoading && (
                  <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.85, display: 'flex', alignItems: 'center' }}>
                    <span className="drive-loading-dot" />
                    Syncing Drive...
                  </span>
                )}
                {!driveLoading && driveDocs.length > 0 && (
                  <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.8, background: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: 12 }}>
                    ☁️ {driveDocs.length} Drive
                  </span>
                )}
              </div>
              <div className="notif-body">
                <div ref={pdfRef}>
                  {doubledPdfReports.length > 0 ? (
                    doubledPdfReports.map((n, i) => (
                      <div key={`${n.id || i}-${i}`} className="notif-item">
                        <div className="notif-meta">
                          <span>📅 {n.date ? new Date(n.date).toLocaleDateString('en-GB') : 'Recently'}</span>
                          <span className="cat-badge" style={{ color:'#059669' }}>{n.type || 'Document'}</span>
                          {/* ✅ Show Drive badge for Drive files */}
                          {n.source === 'drive' && (
                            <span className="drive-badge">☁️ Drive</span>
                          )}
                        </div>
                        <div className="rich-text-title" dangerouslySetInnerHTML={{ __html: n.text || n.title }} />

                        {/* ✅ Drive docs → View in PDFModal */}
                        {n.source === 'drive' && n.link && (
                          <button
                            className="pdf-view-btn"
                            onClick={() => setPreviewPdf({ url: n.link, title: n.text || n.title || 'Document' })}
                          >
                            👁️ View PDF <span style={{ fontSize: 10 }}>›</span>
                          </button>
                        )}

                        {/* Firebase docs → Download link + optional view */}
                        {n.source !== 'drive' && n.link && (
                          <a
                            href={n.link}
                            target="_blank"
                            rel="noreferrer"
                            className="notif-alink"
                            style={{ color:'#059669' }}
                            onClick={(e) => {
                              // PDF link ho to modal mein open karo
                              if (n.link.includes('drive.google') ||
                                  n.link.includes('firebase') ||
                                  n.link.toLowerCase().endsWith('.pdf')) {
                                e.preventDefault();
                                setPreviewPdf({ url: n.link, title: n.text || n.title || 'Document' });
                              }
                            }}
                          >
                            ⬇️ Download PDF <span className="arr">›</span>
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    // Empty state — Drive loading or no docs
                    <div style={{ padding: '30px 15px', textAlign: 'center', color: '#94a3b8' }}>
                      {driveLoading ? (
                        <><span className="drive-loading-dot" /> Loading Drive documents...</>
                      ) : (
                        <>
                          <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>
                          <p style={{ fontSize: 13, margin: 0 }}>
                            Drive folder mein PDFs upload karein ya Admin Panel → Documents se add karein
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="view-all-wrapper">
                <Link to="/documents" className="view-all-btn">Document Archive</Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ✅ PDF Modal — Drive ya Firebase dono ke liye */}
      {previewPdf && (
        <PDFModal
          url={previewPdf.url}
          title={previewPdf.title}
          onClose={() => setPreviewPdf(null)}
        />
      )}
    </section>
  );
};

export default NotificationSection;