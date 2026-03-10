import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

export default function PageViewer({ page }) {
  const [relatedDocs, setRelatedDocs] = useState([]);

  // 🌟 FIREBASE DATA FETCHING
  useEffect(() => {
    if (!page) return;
    window.scrollTo(0, 0); 
    
    const targetPath = page.path || `/p/${page.slug}`;
    const q = query(collection(db, 'pdfReports'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const pageDocs = allDocs.filter(d => d.targetPage === targetPath);
      pageDocs.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRelatedDocs(pageDocs);
    });

    return () => unsubscribe();
  }, [page]);

  // 🚧 PAGE NOT FOUND / LOADING
  if (!page) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f7fa' }}>
        <div style={{ textAlign: 'center', padding: '50px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '50px', marginBottom: '15px' }}>🚧</div>
          <h2 style={{ color: COLORS.navy, fontSize: '28px', margin: '0 0 10px' }}>Content Updating...</h2>
          <p style={{ color: '#64748b', margin: 0 }}>This section is currently being updated by the administration.</p>
        </div>
      </div>
    );
  }

  // 🛡️ SECURITY: Sanitize HTML to prevent attacks
  const cleanHTML = DOMPurify.sanitize(page.content, { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] });

  return (
    <div>
      
      {/* 1. PREMIUM HERO BANNER */}
      <header className="profile-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content anim-fade-in">
          <h1 className="hero-title">{page.title}</h1>
          <p className="hero-subtitle">Guru Nanak College, Dhanbad</p>
        </div>
      </header>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <main>
          <section style={{ background: '#fff', padding: '30px 40px', borderRadius: '16px', boxShadow: '0 8px 25px rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: '2.2rem', color: COLORS.navy, fontWeight: 700, marginBottom: '0.5rem', textAlign: 'left' }}>{page.title}</h2>
            <div style={{ width: '80px', height: '5px', background: COLORS.gold, marginBottom: '1.5rem', borderRadius: '10px' }}></div>
            <div className="dynamic-rich-content">
              {parse(cleanHTML)}
            </div>
          </section>

          {relatedDocs.length > 0 && (
            <section style={{ background: '#fff', padding: '30px 40px', borderRadius: '16px', boxShadow: '0 8px 25px rgba(0,0,0,0.07)', marginTop: '30px' }}>
              <h2 style={{ fontSize: '2.2rem', color: COLORS.navy, fontWeight: 700, marginBottom: '0.5rem', textAlign: 'left' }}>📚 Official Documents</h2>
              <div style={{ width: '80px', height: '5px', background: COLORS.gold, marginBottom: '1.5rem', borderRadius: '10px' }}></div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {relatedDocs.map((doc) => (
                  <div key={doc.id}
                       style={{ display: 'flex', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', transition: 'all 0.3s ease', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}
                       onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = COLORS.gold; }} 
                       onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>
                    <div style={{ width: '80px', background: '#f1f5f9', borderRight: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {doc.coverImage ? <img src={doc.coverImage} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ fontSize: '30px', opacity: 0.3 }}>📄</div>}
                    </div>
                    <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      {doc.isNew && <span className="new-badge">NEW</span>}
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', color: COLORS.navy, lineHeight: '1.4' }}>{doc.title}</h4>
                      <p style={{ margin: '0 0 10px 0', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>📅 {doc.date}</p>
                      <a href={doc.pdfLink || doc.link} target="_blank" rel="noreferrer" className="download-btn">⬇️ View Document</a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) { .dynamic-rich-content { padding: 25px !important; } }
        .dynamic-rich-content table { width: 100% !important; border-collapse: collapse; margin: 20px 0; display: block; overflow-x: auto; white-space: nowrap; font-size: 14px; }
        .dynamic-rich-content th { background: ${COLORS.navy}; color: white; padding: 12px 15px; text-align: left; }
        .dynamic-rich-content td { padding: 12px 15px; border: 1px solid #e2e8f0; }
        .dynamic-rich-content tr:nth-child(even) { background-color: #f8fafc; }
        .dynamic-rich-content iframe { width: 100%; aspect-ratio: 16 / 9; height: auto; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 20px 0; }
        .dynamic-rich-content img { max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin: 20px 0; display: block; }
        .dynamic-rich-content h1, .dynamic-rich-content h2, .dynamic-rich-content h3 { color: ${COLORS.navy}; margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 800; line-height: 1.3; text-align: left; }
        .dynamic-rich-content p { margin-bottom: 1.5em; line-height: 1.8; color: #334155; font-size: 16px; }
        .dynamic-rich-content ul, .dynamic-rich-content ol { margin-bottom: 1.5em; padding-left: 20px; color: #334155; line-height: 1.8; font-size: 16px;}
        .dynamic-rich-content li { margin-bottom: 8px; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        .new-badge { display: inline-block; background: #ef4444; color: #fff; fontSize: 9px; font-weight: 800; padding: 3px 6px; border-radius: 4px; margin-bottom: 8px; width: fit-content; animation: blink 1.5s infinite; letter-spacing: 0.5px;}
        .download-btn { display: inline-block; background: #f8fafc; color: ${COLORS.navy}; padding: 8px 15px; border-radius: 6px; font-size: 12px; font-weight: 700; text-decoration: none; border: 1px solid #cbd5e1; text-align: center; transition: 0.2s; }
        .download-btn:hover { background: ${COLORS.navy}; color: #fff; border-color: ${COLORS.navy}; }
      `}</style>
    </div>
  );
}
