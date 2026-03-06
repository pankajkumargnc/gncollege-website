import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { COLORS } from '../styles/colors';

export default function PageViewer({ slug, page: propPage, onClose }) {
  const [page, setPage] = useState(propPage || null);
  // 🌟 BUG FIX 1: Loading ko hamesha pehle 'true' rakhein
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // 1. Agar App.jsx ne database se page laakar de diya hai
    if (propPage) {
      setPage(propPage);
      setLoading(false); // Data mil gaya, loading band!
      return;
    }
    
    // 2. Agar koi custom Link (slug) click hua hai, toh Firebase se fetch karein
    if (slug) {
      const fetchPage = async () => {
        setLoading(true);
        const q = query(collection(db, 'pages'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setPage(querySnapshot.docs[0].data());
        } else {
          setPage(null);
        }
        setLoading(false);
      };
      fetchPage();
      return;
    }

    // 🌟 BUG FIX 2: "Grace Period" Timer 
    // Agar turant data nahi mila (refresh hone par), toh 1.5 sec wait karein.
    setPage(null);
    const timer = setTimeout(() => {
      setLoading(false); // 1.5 sec baad agar sach me data nahi hai, toh 404 dikhega
    }, 1500);
    
    return () => clearTimeout(timer); // Cleanup function
  }, [slug, propPage]);

  // --- LOADING & 404 STATES ---
  if (loading) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh', background: '#f4f7fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '40px', marginBottom: '15px', animation: 'spin 2s linear infinite' }}>⏳</div>
        <h3 style={{ color: COLORS.navy, fontWeight: 700 }}>Loading Page Content...</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>Please wait while we fetch the latest data from the server.</p>
      </div>
    );
  }

  if (!page) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh', background: '#f4f7fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: COLORS.navy, fontSize: '32px', fontWeight: 800 }}>404 - Page Not Found</h2>
        <p style={{ color: '#666', fontSize: '16px', marginTop: '10px' }}>The page you are looking for is currently being updated or does not exist.</p>
        <p style={{ fontSize: '14px', background: '#e2e8f0', display: 'inline-block', padding: '10px 20px', borderRadius: '8px', marginTop: '20px' }}>
          <strong>Admin Note:</strong> Please create this page from the Admin Dashboard.
        </p>
      </div>
    );
  }

  // --- PREMIUM TWO-COLUMN UI RENDER ---
  return (
    <div className="page-wrapper">
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .page-wrapper { background: #f4f7fa; padding: 60px 20px; min-height: 70vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .page-container { max-width: 1300px; margin: 0 auto; display: flex; gap: 40px; align-items: flex-start; }
        
        .content-col { flex: 1 1 68%; background: #fff; padding: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); min-width: 300px; border: 1px solid #edf2f7; }
        .page-title { color: ${COLORS.navy}; font-size: 36px; font-weight: 800; margin: 0 0 12px; letter-spacing: -0.5px; }
        .title-underline { width: 80px; height: 5px; background: ${COLORS.gold}; margin-bottom: 35px; border-radius: 3px; }
        .rich-content { font-size: 16px; line-height: 1.8; color: #333; text-align: justify; }
        .rich-content h1, .rich-content h2, .rich-content h3 { color: ${COLORS.navy}; margin-top: 30px; margin-bottom: 15px; }
        .rich-content a { color: ${COLORS.gold}; text-decoration: none; font-weight: 600; }
        .rich-content a:hover { text-decoration: underline; }
        .rich-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .rich-content ul, .rich-content ol { margin-left: 20px; margin-bottom: 20px; }
        .rich-content li { margin-bottom: 8px; }

        .sidebar-col { flex: 1 1 28%; min-width: 300px; position: sticky; top: 110px; }
        .widget { background: #fff; padding: 30px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); margin-bottom: 30px; border: 1px solid #edf2f7; }
        .widget-title { color: ${COLORS.navy}; font-size: 20px; font-weight: 800; margin: 0 0 20px; display: flex; align-items: center; gap: 12px; border-bottom: 2px solid #f4f7fa; padding-bottom: 15px; }
        
        .quick-links { list-style: none; padding: 0; margin: 0; }
        .quick-link-item { border-bottom: 1px solid #f4f7fa; }
        .quick-link-item:last-child { border-bottom: none; }
        .quick-link { display: flex; align-items: center; gap: 12px; padding: 14px 0; color: #4a5568; text-decoration: none; font-weight: 600; font-size: 14.5px; transition: all 0.3s ease; }
        .quick-link:hover { color: ${COLORS.gold}; padding-left: 8px; }
        .link-arrow { color: ${COLORS.gold}; font-size: 18px; font-weight: bold; transition: transform 0.3s; }
        .quick-link:hover .link-arrow { transform: translateX(3px); }
        
        .helpdesk-widget { background: linear-gradient(145deg, ${COLORS.navy} 0%, #0a1832 100%); color: #fff; padding: 35px 30px; border-radius: 16px; text-align: center; box-shadow: 0 15px 35px rgba(15,35,71,0.25); position: relative; overflow: hidden; }
        .helpdesk-widget::before { content: '☎'; position: absolute; top: -20px; right: -20px; font-size: 120px; color: rgba(255,255,255,0.05); transform: rotate(15deg); pointer-events: none; }
        .helpdesk-btn { display: inline-block; background: ${COLORS.gold}; color: ${COLORS.navyDark}; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 14px; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(244,160,35,0.3); margin-top: 20px; position: relative; z-index: 2; }
        .helpdesk-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(244,160,35,0.5); background: #e08e1a; }

        @media (max-width: 1024px) { .page-container { flex-direction: column; } .sidebar-col { position: static; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 30px; } }
        @media (max-width: 768px) { .page-wrapper { padding: 30px 15px; } .content-col { padding: 30px 20px; } .page-title { font-size: 28px; } .sidebar-col { grid-template-columns: 1fr; gap: 20px; } }
      `}</style>

      <div className="page-container">
        <div className="content-col">
          {onClose && <button onClick={onClose} style={{ float: 'right', padding: '8px 16px', background: COLORS.red, color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>✕ Close</button>}
          <h1 className="page-title">{page.title}</h1>
          <div className="title-underline"></div>
          <div className="rich-content">
            {page.contentType === 'html' ? (
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
            ) : (
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{page.content}</pre>
            )}
          </div>
        </div>

        <div className="sidebar-col">
          <div className="widget">
            <h3 className="widget-title"><span style={{ color: COLORS.gold, fontSize: '24px' }}>📑</span> Quick Links</h3>
            <ul className="quick-links">
              {[
                { label: 'College Profile', path: '/about-us/college-profile' },
                { label: 'Admission Rules', path: '/admission/rule' },
                { label: 'Fee Structure', path: '/admission/fee-structure' },
                { label: 'Syllabus', path: '/syllabus' },
                { label: 'Academic Calendar', path: '/academics/academic-calendar' },
                { label: 'Photo Gallery', path: '/gallery' },
                { label: 'Contact Helpdesk', path: '/contact' }
              ].map((link, i) => (
                <li key={i} className="quick-link-item">
                  <Link to={link.path} className="quick-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <span className="link-arrow">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="helpdesk-widget">
            <div style={{ fontSize: '45px', marginBottom: '15px', position: 'relative', zIndex: 2 }}>📞</div>
            <h4 style={{ margin: '0 0 12px', fontSize: '19px', color: COLORS.gold, position: 'relative', zIndex: 2 }}>Need Assistance?</h4>
            <p style={{ fontSize: '14px', margin: '0', color: '#e2e8f0', lineHeight: '1.6', position: 'relative', zIndex: 2 }}>
              Contact our administration office for any queries related to admission, examinations, or syllabus.
            </p>
            <a href="tel:+917903340991" className="helpdesk-btn">Call Helpdesk Now</a>
          </div>
        </div>
      </div>
    </div>
  );
}