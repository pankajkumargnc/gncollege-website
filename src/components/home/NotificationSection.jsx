import { useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom'; // 🌟 FIX: React Router DOM se Link import kiya
import { COLORS } from '../../styles/colors';
import SectionTitle from './SectionTitle';

const NotificationSection = ({ notices, announcements, pdfReports, upcomingEvents }) => {
  const noticesRef = useRef(null);
  const newsRef = useRef(null);
  const pdfRef = useRef(null);
  const noticesRafRef = useRef(null);
  const newsRafRef = useRef(null);
  const pdfRafRef = useRef(null);

  const doubledNotices = useMemo(() => [...(notices || []), ...(notices || [])], [notices]);

  const combinedNews = useMemo(() => {
    const upcoming = (upcomingEvents || []).map(e => ({ ...e, text: e.title, date: e.createdAt?.toDate(), type: e.type || 'Event' }));
    const news = (announcements || []).map(a => ({ ...a, date: a.createdAt?.toDate(), type: a.type || 'News' }));
    return [...upcoming, ...news].sort((a, b) => (b.date || 0) - (a.date || 0));
  }, [upcomingEvents, announcements]);

  const doubledNews = useMemo(() => [...combinedNews, ...combinedNews], [combinedNews]);

  const doubledPdfReports = useMemo(() => {
    const reports = (pdfReports || []).map(p => ({ ...p, text: p.title, date: p.createdAt?.toDate(), type: 'Document' }));
    return [...reports, ...reports];
  }, [pdfReports]);

  // Auto-Scroll Logic
  const startScrolling = (ref, rafRef) => {
    const el = ref.current;
    if (!el) return;
    let pos = 0;
    const animate = () => { 
      pos -= 0.6; // Speed control
      if (pos < -el.scrollHeight / 2) { pos = 0; } 
      el.style.transform = `translateY(${pos}px)`; 
      rafRef.current = requestAnimationFrame(animate); 
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  const stopScrolling = (rafRef) => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };

  useEffect(() => {
    startScrolling(noticesRef, noticesRafRef);
    const el = noticesRef.current;
    if(el) {
      el.addEventListener('mouseenter', () => stopScrolling(noticesRafRef)); 
      el.addEventListener('mouseleave', () => startScrolling(noticesRef, noticesRafRef));
    }
    return () => stopScrolling(noticesRafRef);
  }, [doubledNotices]);

  useEffect(() => {
    startScrolling(newsRef, newsRafRef);
    const el = newsRef.current;
    if(el) {
      el.addEventListener('mouseenter', () => stopScrolling(newsRafRef)); 
      el.addEventListener('mouseleave', () => startScrolling(newsRef, newsRafRef));
    }
    return () => stopScrolling(newsRafRef);
  }, [doubledNews]);

  useEffect(() => {
    startScrolling(pdfRef, pdfRafRef);
    const el = pdfRef.current;
    if(el) {
      el.addEventListener('mouseenter', () => stopScrolling(pdfRafRef)); 
      el.addEventListener('mouseleave', () => startScrolling(pdfRef, pdfRafRef));
    }
    return () => stopScrolling(pdfRafRef);
  }, [doubledPdfReports]);

  return (
    <section style={{ padding: '90px 20px', background: '#f8fafc', position: 'relative' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '300px', background: 'linear-gradient(180deg, #f1f5f9 0%, rgba(248,250,252,0) 100%)', zIndex: 0 }}></div>

      <div style={{ maxWidth: 1350, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionTitle 
          title="Notification & Announcements" 
          subtitle="Stay informed with the latest official updates and campus news" 
        />
        
        <style>{`
          .notif-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 35px;
            margin-top: 40px;
          }
          .notif-card {
            background: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.08);
            border: 1px solid rgba(226, 232, 240, 0.8);
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            display: flex;
            flex-direction: column;
            height: 520px;
            position: relative;
          }
          .notif-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 30px 60px -12px rgba(15, 23, 42, 0.15);
            border-color: rgba(244, 160, 35, 0.3);
          }
          
          /* Premium Gradient Headers */
          .header-notice { background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); }
          .header-news { background: linear-gradient(135deg, #e11d48 0%, #9f1239 100%); }
          .header-docs { background: linear-gradient(135deg, #059669 0%, #047857 100%); }
          
          .notif-header {
            padding: 25px 25px;
            display: flex;
            align-items: center;
            gap: 15px;
            color: #ffffff;
            font-weight: 800;
            font-size: 1.15rem;
            letter-spacing: 0.5px;
            position: relative;
            overflow: hidden;
          }
          .notif-header::after {
            content: ''; position: absolute; top: 0; right: 0; bottom: 0; left: 0;
            background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
            background-size: 200% 200%;
            animation: shine 4s infinite linear;
          }
          @keyframes shine { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }

          .notif-body {
            padding: 10px 20px;
            flex: 1;
            overflow-y: hidden;
            display: flex;
            flex-direction: column;
            mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
          }
          
          /* Interactive Notification Item */
          .notif-item {
            padding: 20px 15px;
            border-bottom: 1px dashed #e2e8f0;
            text-align: left; 
            position: relative;
            transition: all 0.3s ease;
            border-radius: 12px;
            margin-bottom: 5px;
          }
          .notif-item:hover {
            background: #f8fafc;
            padding-left: 22px;
            box-shadow: inset 4px 0 0 0 ${COLORS.gold};
          }
          .notif-item:last-child { border-bottom: none; }

          /* Typography */
          .notif-meta {
            display: flex; align-items: center; justify-content: flex-start; flex-wrap: wrap; gap: 8px;
            font-size: 0.7rem; color: #64748b; font-weight: 700; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;
          }
          .cat-badge {
            padding: 3px 8px; border-radius: 6px; font-weight: 800; font-size: 0.65rem; background: #f1f5f9;
          }
          
          .rich-text-title {
            margin: 0 0 8px; font-size: 0.95rem; color: #0f172a; font-weight: 700; line-height: 1.5;
          }
          .rich-text-desc {
            margin: 0 0 8px; font-size: 0.85rem; color: #475569; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
          }

          /* View All Button */
          .view-all-wrapper {
            padding: 20px; background: #fff; border-top: 1px solid #f1f5f9; position: relative; z-index: 2;
          }
          .view-all-btn {
            display: block; width: 100%; padding: 14px;
            background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px;
            color: #334155; font-weight: 800; font-size: 0.85rem;
            cursor: pointer; transition: all 0.3s ease; text-align: center; text-transform: uppercase; letter-spacing: 1px;
            text-decoration: none; /* 🌟 FIX: Removed blue underline from anchor tag */
          }
          .notif-card:hover .view-all-btn {
            background: ${COLORS.navy}; color: #fff; border-color: ${COLORS.navy}; box-shadow: 0 8px 20px rgba(15,23,42,0.2);
          }
          
          @keyframes pulse-red { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
          .new-badge-pulse { background: #ef4444; color: #fff; font-size: 0.6rem; padding: 2px 6px; border-radius: 4px; animation: pulse-red 2s infinite; font-weight: 900;}

          @media (max-width: 1100px) { .notif-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 768px) { .notif-grid { grid-template-columns: 1fr; gap: 25px; margin-top: 25px;} .notif-card { height: 480px; } }
        `}</style>
    
        <div className="notif-grid">
            
            {/* 1. OFFICIAL NOTICES */}
            <div className="notif-card">
              <div className="notif-header header-notice">
                <span style={{ fontSize: '26px' }}>🔔</span> Official Notices
              </div>
              <div className="notif-body">
                <div ref={noticesRef}>
                  {doubledNotices.map((n, i) => {
                    const isNew = n.isNew && (new Date() - new Date(n.date)) / (1000 * 60 * 60 * 24) < 5;
                    return (
                      <div key={i} className="notif-item">
                        <div className="notif-meta">
                          <span>📅 {n.date ? new Date(n.date).toLocaleDateString('en-GB') : 'Recently'}</span>
                          <span className="cat-badge" style={{ color: '#1e3a8a' }}>{n.type || 'Notice'}</span>
                          {isNew && <span className="new-badge-pulse">NEW</span>}
                        </div>
                        <div className="rich-text-title" dangerouslySetInnerHTML={{ __html: n.text }} />
                        {n.link && <a href={n.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>📎 View Attachment</a>}
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* 🌟 FIX: Updated to Link Tag pointing to /notifications */}
              <div className="view-all-wrapper">
                <Link to="/notifications" className="view-all-btn">View All Notices</Link>
              </div>
            </div>
    
            {/* 2. ACADEMIC NEWS */}
            <div className="notif-card">
              <div className="notif-header header-news">
                <span style={{ fontSize: '26px' }}>📣</span> News & Events
              </div>
              <div className="notif-body">
                <div ref={newsRef}>
                  {doubledNews.map((n, i) => {
                    const isNew = n.date && (new Date() - new Date(n.date)) / (1000 * 60 * 60 * 24) < 5;
                    return (
                      <div key={i} className="notif-item">
                        <div className="notif-meta">
                          <span>📅 {n.date ? new Date(n.date).toLocaleDateString('en-GB') : 'Recently'}</span>
                          <span className="cat-badge" style={{ color: '#e11d48' }}>{n.type || 'Update'}</span>
                          {isNew && <span className="new-badge-pulse">NEW</span>}
                        </div>
                        <div className="rich-text-title" dangerouslySetInnerHTML={{ __html: n.text || n.title }} />
                        {n.desc && <div className="rich-text-desc" dangerouslySetInnerHTML={{ __html: n.desc }} />}
                        {n.link && <a href={n.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#e11d48', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>🔗 Read More</a>}
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* 🌟 FIX: Updated to Link Tag pointing to /notifications */}
              <div className="view-all-wrapper">
                <Link to="/news" className="view-all-btn">Explore News</Link>
              </div>
            </div>
    
            {/* 3. E-DOCUMENTS */}
            <div className="notif-card">
              <div className="notif-header header-docs">
                <span style={{ fontSize: '26px' }}>📄</span> E-Documents
              </div>
              <div className="notif-body">
                <div ref={pdfRef}>
                  {doubledPdfReports.map((n, i) => (
                    <div key={i} className="notif-item">
                      <div className="notif-meta">
                        <span>📅 {n.date ? new Date(n.date).toLocaleDateString('en-GB') : 'Recently'}</span>
                        <span className="cat-badge" style={{ color: '#059669' }}>{n.type || 'Document'}</span>
                      </div>
                      <div className="rich-text-title" dangerouslySetInnerHTML={{ __html: n.text || n.title }} />
                      {n.link && <a href={n.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>⬇️ Download PDF</a>}
                    </div>
                  ))}
                </div>
              </div>
              {/* 🌟 FIX: Updated to Link Tag pointing to /documents */}
              <div className="view-all-wrapper">
                <Link to="/documents" className="view-all-btn">Document Archive</Link>
              </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default NotificationSection;