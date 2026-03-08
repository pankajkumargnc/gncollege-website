import { useRef, useEffect, useMemo } from 'react';
import { COLORS } from '../styles/colors';
import SectionTitle from './SectionTitle';

const NotificationSection = ({ notices, announcements, pdfReports, upcomingEvents }) => {
  const noticesRef = useRef(null);
  const newsRef = useRef(null);
  const pdfRef = useRef(null);

  const combinedNews = useMemo(() => {
    const upcoming = (upcomingEvents || []).map(e => ({ ...e, text: e.title, date: e.createdAt?.toDate(), type: e.type || 'Event' }));
    const news = (announcements || []).map(a => ({ ...a, date: a.createdAt?.toDate(), type: a.type || 'News' }));
    // Sort by date, newest first. Handle cases where date might be null.
    return [...upcoming, ...news].sort((a, b) => (b.date || 0) - (a.date || 0));
  }, [upcomingEvents, announcements]);

  const pdfReportsMapped = useMemo(() => {
    const reports = (pdfReports || []).map(p => ({ ...p, text: p.title, date: p.createdAt?.toDate(), type: 'Document' }));
    return reports;
  }, [pdfReports]);

  return (
    <section style={{ padding: '80px 20px', background: '#f4f7fa' }}>
    <div style={{ maxWidth: 1300, margin: '0 auto' }}>
      <SectionTitle 
        title="Notification & Announcements" 
        subtitle="Stay informed with the latest official updates and campus news" 
      />
      
      <style>{`
        .notif-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .notif-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid #edf2f7;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          flex-direction: column;
          height: 500px; /* Thoda adjust kiya list ke liye */
        }
        .notif-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 40px rgba(15, 35, 71, 0.15);
          border-color: ${COLORS.gold};
        }
        .notif-header {
          padding: 22px;
          display: flex;
          align-items: center;
          gap: 15px;
          color: #fff;
          font-weight: 800;
          font-size: 18px;
          letter-spacing: 0.5px;
        }
        .notif-body {
          padding: 20px;
          flex: 1;
          overflow-y: auto; /* Changed from hidden to auto */
          display: flex;
          flex-direction: column;
        }
        .view-all-btn {
          margin: 15px 20px 25px;
          padding: 12px;
          background: #f8f9fa;
          border: 1.5px solid #eee;
          border-radius: 10px;
          color: ${COLORS.navy};
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          text-transform: uppercase;
        }
        .notif-card:hover .view-all-btn {
          background: ${COLORS.navy};
          color: #fff;
          border-color: ${COLORS.navy};
        }
        .notif-item {
          padding: 15px 0;
          border-bottom: 1px solid #eee;
        }
          
        @media (max-width: 1100px) { .notif-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 700px) { .notif-grid { grid-template-columns: 1fr; } .notif-card { height: 450px; } }
      `}</style>
  
      <div className="notif-grid">
          {/* OFFICIAL NOTICES WITH DATE AND NEW BADGE LOGIC */}
          <div className="notif-card">
            <div className="notif-header" style={{ background: COLORS.navy }}>
              <span style={{ fontSize: '24px' }}>🔔</span> Official Notices
            </div>
            <div className="notif-body">
              <div>
                {notices.map((n, i) => {
                  // Logic for 3-day old "NEW" badge
                  const isNew = n.isNew;
                  return (
                    <div key={i} className="notif-item">
                      {/* Top line: Date, Category, New Badge */}
                      <div style={{ display: 'flex', alignItems: 'center', fontSize: '11px', color: '#888', fontWeight: 700, marginBottom: '8px' }}>
                        <span>📅 {n.date ? new Date(n.date).toLocaleDateString('en-GB') : 'Recently'}</span>
                        <span style={{ margin: '0 8px' }}>|</span>
                        <span style={{ color: COLORS.gold }}>{n.type || 'Notice'}</span>
                        {isNew && <span style={{ marginLeft: '16px', background: 'red', color: '#fff', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', animation: 'blink 1s infinite' }}>NEW</span>}
                      </div>
                      {/* Title */}
                      <div 
                        className="rich-text-title"
                        style={{ margin: '0 0 5px', fontSize: '14px', color: COLORS.navy, fontWeight: 600 }}
                        dangerouslySetInnerHTML={{ __html: n.text }}
                      />
                      {/* Link/Description */}
                      {n.link && <a href={n.link} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: '#007bff', fontWeight: 700, display: 'inline-block' }}>🔗 View Document</a>}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="view-all-btn">View All Notices →</div>
          </div>
  
          {/* ACADEMIC NEWS */}
          <div className="notif-card">
            <div className="notif-header" style={{ background: COLORS.red }}>
              <span style={{ fontSize: '24px' }}>📣</span> Academic News / Upcoming Event
            </div>
            <div className="notif-body">
              <div>
                {combinedNews.map((n, i) => {
                  const isNew = n.isNew;
                  return (
                    <div key={i} className="notif-item">
                      {/* Top line: Date, Category, New Badge */}
                      <div style={{ display: 'flex', alignItems: 'center', fontSize: '11px', color: '#888', fontWeight: 700, marginBottom: '8px' }}>
                        <span>📅 {n.date ? new Date(n.date).toLocaleDateString('en-GB') : 'Recently'}</span>
                        <span style={{ margin: '0 8px' }}>|</span>
                        <span style={{ color: COLORS.red }}>{n.type || 'Update'}</span>
                        {isNew && <span style={{ marginLeft: '16px', background: 'red', color: '#fff', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', animation: 'blink 1s infinite' }}>NEW</span>}
                      </div>
                      {/* Title */}
                      <div 
                        className="rich-text-title"
                        style={{ margin: '0 0 5px', fontSize: '14px', color: COLORS.navy, fontWeight: 600 }}
                        dangerouslySetInnerHTML={{ __html: n.text || n.title }}
                      />
                      {/* Description if it exists */}
                      {n.desc && <div 
                        className="rich-text-desc"
                        style={{ margin: '0 0 5px', fontSize: '13px', color: '#555', lineHeight: 1.4 }}
                        dangerouslySetInnerHTML={{ __html: n.desc }}
                      />}
                      {/* Link if it exists */}
                      {n.link && <a href={n.link} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: '#007bff', fontWeight: 700, display: 'inline-block' }}>🔗 View Document</a>}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="view-all-btn">View All News →</div>
          </div>
  
          {/* E-DOCUMENTS */}
          <div className="notif-card">
            <div className="notif-header" style={{ background: '#10b981' }}>
              <span style={{ fontSize: '24px' }}>📄</span> E-Documents
            </div>
            <div className="notif-body">
              <div>
                {pdfReportsMapped.map((n, i) => (
                  <div key={i} className="notif-item">
                    {/* Top line: Date, Category */}
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '11px', color: '#888', fontWeight: 700, marginBottom: '8px' }}>
                      <span>📅 {n.date ? new Date(n.date).toLocaleDateString('en-GB') : 'Recently'}</span>
                      <span style={{ margin: '0 8px' }}>|</span>
                      <span style={{ color: '#10b981' }}>{n.type || 'Document'}</span>
                    </div>
                    {/* Title */}
                    <p className="rich-text-title" style={{ margin: '0 0 5px', fontSize: '14px', color: COLORS.navy, fontWeight: 600 }}>
                      {n.text || n.title}
                    </p>
                    {/* Link */}
                    {n.link && <a href={n.link} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: '#007bff', fontWeight: 700, display: 'inline-block' }}>🔗 View Document</a>}
                  </div>
                ))}
              </div>
            </div>
            <div className="view-all-btn">View All Documents →</div>
          </div>
      </div>
    </div>
  </section>
  );
};

export default NotificationSection;
