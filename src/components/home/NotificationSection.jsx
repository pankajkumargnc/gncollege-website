// src/components/home/NotificationSection.jsx
import { useRef, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { COLORS } from '../../styles/colors';
import PDFModal from '../PDFModal';
import { useDriveDocs } from '../../hooks/useDriveDocs';

const N = COLORS.navy;
const G = COLORS.gold;

const NotificationSection = ({ notices, announcements, pdfReports, upcomingEvents }) => {
  const noticesRef    = useRef(null);
  const newsRef       = useRef(null);
  const pdfRef        = useRef(null);
  const noticesRafRef = useRef(null);
  const newsRafRef    = useRef(null);
  const pdfRafRef     = useRef(null);

  const [previewPdf, setPreviewPdf] = useState(null);

  const { docs: driveDocs, loading: driveLoading } = useDriveDocs(
    import.meta.env.VITE_DRIVE_DOCUMENT_FOLDER
  );

  const doubledNotices = useMemo(() => [...(notices || []), ...(notices || [])], [notices]);

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

  const doubledNews = useMemo(() => [...combinedNews, ...combinedNews], [combinedNews]);

  const combinedDocs = useMemo(() => {
    const driveFormatted = (driveDocs || []).map(d => ({
      id: `drive_${d.id}`,
      text: d.name, title: d.name, link: d.previewUrl, downloadUrl: d.downloadUrl,
      date: d.date, type: 'Document', source: 'drive',
    }));
    const fbFormatted = (pdfReports || []).map(p => ({
      ...p, text: p.title, link: p.link || p.pdfUrl,
      date: p.createdAt?.toDate?.() || p.date, type: p.type || 'Document', source: 'firebase',
    }));
    return [...driveFormatted, ...fbFormatted];
  }, [driveDocs, pdfReports]);

  const doubledPdfReports = useMemo(() => combinedDocs.length === 0 ? [] : [...combinedDocs, ...combinedDocs], [combinedDocs]);

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
  const stopScrolling = (rafRef) => { if (rafRef.current) cancelAnimationFrame(rafRef.current); rafRef.current = null; };

  useEffect(() => {
    const el = noticesRef.current; if (!el) return;
    const onEnter = () => stopScrolling(noticesRafRef);
    const onLeave = () => startScrolling(noticesRef, noticesRafRef);
    el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave);
    startScrolling(noticesRef, noticesRafRef);
    return () => { stopScrolling(noticesRafRef); el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); };
  }, [doubledNotices]);

  useEffect(() => {
    const el = newsRef.current; if (!el) return;
    const onEnter = () => stopScrolling(newsRafRef);
    const onLeave = () => startScrolling(newsRef, newsRafRef);
    el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave);
    startScrolling(newsRef, newsRafRef);
    return () => { stopScrolling(newsRafRef); el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); };
  }, [doubledNews]);

  useEffect(() => {
    const el = pdfRef.current; if (!el) return;
    const onEnter = () => stopScrolling(pdfRafRef);
    const onLeave = () => startScrolling(pdfRef, pdfRafRef);
    el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave);
    startScrolling(pdfRef, pdfRafRef);
    return () => { stopScrolling(pdfRafRef); el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); };
  }, [doubledPdfReports]);

  return (
    <section className="ns-root" id="notifications">
      <style>{`
        .ns-root {
          padding: clamp(60px, 10vw, 120px) 20px;
          background: #f8fafc;
          position: relative;
          overflow: hidden;
        }
        
        .ns-inner { max-width: 1400px; margin: 0 auto; position: relative; z-index: 2; }

        .ns-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 2.5vw, 40px);
          margin-top: 50px;
        }

        .ns-card {
          background: #fff;
          border-radius: 32px;
          overflow: hidden;
          height: 580px;
          display: flex;
          flex-direction: column;
          border: 1px solid #f1f5f9;
          box-shadow: 0 10px 40px rgba(15, 35, 71, 0.05);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .ns-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 30px 60px rgba(15, 35, 71, 0.12);
            border-color: ${G}30;
        }

        .ns-header {
          padding: 25px 30px;
          display: flex;
          align-items: center;
          gap: 15px;
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 18px;
          letter-spacing: 0.5px;
          position: relative;
        }
        .ns-header::after {
          content: ''; position: absolute; top: 0; right: 0; width: 100px; height: 100px;
          background: rgba(255,255,255,0.1); border-radius: 50%; transform: translate(30%, -30%);
        }

        .nh-notice { background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); }
        .nh-news   { background: linear-gradient(135deg, #e11d48 0%, #9f1239 100%); }
        .nh-docs   { background: linear-gradient(135deg, #059669 0%, #047857 100%); }

        .ns-body {
          flex: 1;
          padding: 10px 20px;
          overflow: hidden;
          mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
        }

        .ns-item {
          padding: 20px 15px;
          border-bottom: 1px dashed #e2e8f0;
          transition: all 0.3s;
          border-radius: 16px;
          margin-bottom: 5px;
        }
        .ns-item:hover {
          background: #f8fafc;
          padding-left: 20px;
          box-shadow: inset 4px 0 0 ${G};
        }

        .ns-meta {
          display: flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 800; color: #94a3b8;
          text-transform: uppercase; letter-spacing: 1px;
          margin-bottom: 10px;
        }
        .ns-type-badge {
            padding: 3px 8px; background: rgba(15,35,71,0.05); color: ${N};
            border-radius: 6px; font-size: 10px;
        }

        .ns-title {
          font-size: 15px; font-weight: 700; color: ${N};
          line-height: 1.5; margin-bottom: 8px;
        }
        .ns-title span { color: #ef4444; font-size: 10px; margin-left: 8px; }

        .ns-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 800; color: ${G};
          text-decoration: none; margin-top: 5px;
          transition: all 0.3s;
        }
        .ns-link:hover { transform: translateX(5px); color: ${N}; }

        .ns-footer {
          padding: 20px 25px;
          background: #fff;
          border-top: 1px solid #f1f5f9;
        }
        .ns-all-btn {
          display: flex; align-items: center; justify-content: center;
          width: 100%; padding: 14px; border-radius: 16px;
          background: #f8fafc; color: ${N}; font-size: 13px; font-weight: 800;
          text-decoration: none; text-transform: uppercase; letter-spacing: 1px;
          border: 1px solid #e2e8f0; transition: all 0.3s;
        }
        .ns-all-btn:hover {
          background: ${N}; color: #fff; border-color: ${N};
          box-shadow: 0 10px 20px rgba(15,35,71,0.2);
        }

        [data-theme="dark"] .ns-root { background: #0b1121; }
        [data-theme="dark"] .ns-card { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08); }
        [data-theme="dark"] .ns-title { color: #fff; }
        [data-theme="dark"] .ns-all-btn { background: rgba(255,255,255,0.05); color: #fff; border-color: rgba(255,255,255,0.1); }

        @media (max-width: 1100px) { .ns-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .ns-grid { grid-template-columns: 1fr; } .ns-card { height: 500px; } }
      `}</style>
      
      <div className="ns-inner">
        <div className="wof-head" style={{ marginBottom: 40 }}>
           <div className="uni-label">📢 Stay Updated</div>
           <h2 className="uni-h">Campus <span>Notices & News</span></h2>
           <p className="uni-sub">Late-breaking news, announcements aur crucial notifications hamesha aapki pahunch mein.</p>
        </div>

        <div className="ns-grid">
          {/* NOTICES */}
          <div className="ns-card">
            <div className="ns-header nh-notice">
               <span style={{fontSize:24}}>📄</span> Notices
            </div>
            <div className="ns-body">
              <div ref={noticesRef}>
                {doubledNotices.map((n, i) => {
                  const isNew = n.isNew || (n.date && (new Date() - new Date(n.date)) / 86400000 < 5);
                  return (
                    <div key={i} className="ns-item">
                      <div className="ns-meta">
                        <span>📅 {n.date ? new Date(n.date).toLocaleDateString('en-GB') : 'Recently'}</span>
                        <span className="ns-type-badge">{n.type || 'Notice'}</span>
                      </div>
                      <div className="ns-title">
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(n.text || '') }} />
                        {isNew && <span style={{ color: '#ef4444', fontWeight: 900 }}>[NEW]</span>}
                      </div>
                      {n.link && <a href={n.link} target="_blank" rel="noreferrer" className="ns-link">View Document →</a>}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="ns-footer">
               <Link to="/notifications" className="ns-all-btn">View All Notices</Link>
            </div>
          </div>

          {/* NEWS & EVENTS */}
          <div className="ns-card">
            <div className="ns-header nh-news">
               <span style={{fontSize:24}}>🔥</span> News & Events
            </div>
            <div className="ns-body">
              <div ref={newsRef}>
                {doubledNews.map((n, i) => {
                  const isNew = n.isNew || (n.date && (new Date() - new Date(n.date)) / 86400000 < 5);
                  return (
                    <div key={i} className="ns-item">
                      <div className="ns-meta">
                        <span>📅 {n.date ? new Date(n.date).toLocaleDateString('en-GB') : 'Recently'}</span>
                        <span className="ns-type-badge" style={{ color: '#e11d48' }}>{n.type || 'News'}</span>
                      </div>
                      <div className="ns-title">
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(n.text || n.title || '') }} />
                        {isNew && <span style={{ color: '#ef4444', fontWeight: 900 }}>[NEW]</span>}
                      </div>
                      {n.link && <a href={n.link} target="_blank" rel="noreferrer" className="ns-link">Read Story →</a>}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="ns-footer">
               <Link to="/news" className="ns-all-btn">Explore News</Link>
            </div>
          </div>

          {/* E-DOCUMENTS */}
          <div className="ns-card">
            <div className="ns-header nh-docs">
               <span style={{fontSize:24}}>📊</span> E-Documents
               {driveLoading && <span style={{ marginLeft: 'auto', fontSize: 10 }}>Syncing...</span>}
            </div>
            <div className="ns-body">
              <div ref={pdfRef}>
                {doubledPdfReports.map((n, i) => (
                  <div key={i} className="ns-item">
                    <div className="ns-meta">
                      <span>📅 {n.date ? new Date(n.date).toLocaleDateString('en-GB') : 'Recently'}</span>
                      <span className="ns-type-badge" style={{ color: '#059669' }}>{n.source === 'drive' ? 'Drive' : 'Doc'}</span>
                    </div>
                    <div className="ns-title">{n.text || n.title}</div>
                    {n.link && (
                      <button 
                        className="ns-link" 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        onClick={() => setPreviewPdf({ url: n.link, title: n.text || n.title })}
                      >
                        Open PDF →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="ns-footer">
               <Link to="/documents" className="ns-all-btn">Doc Archive</Link>
            </div>
          </div>
        </div>
      </div>

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