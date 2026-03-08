import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';

export default function PageViewer({ page }) {
  const [relatedDocs, setRelatedDocs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    });

    return () => unsubscribe();
  }, [page]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${page.title} - Guru Nanak College`,
          text: `Check out this page: ${page.title}`,
          url: window.location.href,
        });
      } catch (err) { console.log('Share cancelled', err); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // 🚧 PAGE NOT FOUND / LOADING
  if (!page) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '50px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '50px', marginBottom: '15px' }}>🚧</div>
          <h2 style={{ color: COLORS.navy, fontSize: '28px', margin: '0 0 10px' }}>Content Updating...</h2>
          <p style={{ color: '#64748b', margin: 0 }}>This section is currently being updated by the administration.</p>
        </motion.div>
      </div>
    );
  }

  // 🛡️ SECURITY: Sanitize HTML to prevent attacks
  const cleanHTML = DOMPurify.sanitize(page.content, { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] });

  return (
    <div style={{ background: '#f4f7fa', minHeight: '100vh', paddingBottom: '60px', fontFamily: "'Inter', sans-serif" }}>
      
      {/* 1. PREMIUM HERO BANNER */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0a1832 100%)`, padding: '60px 20px', textAlign: 'center', borderBottom: `5px solid ${COLORS.gold}` }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ color: '#cbd5e1', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>
            Guru Nanak College / {page.path ? page.path.split('/')[1] : 'Dynamic Pages'}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} style={{ margin: 0, color: '#fff', fontSize: '42px', fontWeight: 900, textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
            {page.title}
          </motion.h1>
        </div>
      </motion.div>

      <div style={{ maxWidth: '1200px', margin: '-30px auto 0', padding: '0 20px', display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* 2. MAIN CONTENT AREA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ flex: '1 1 700px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', overflow: 'hidden', zIndex: 10 }}
        >
          <div className="dynamic-rich-content" style={{ padding: '40px 50px' }}>
            {parse(cleanHTML)}
          </div>

          {relatedDocs.length > 0 && (
            <div style={{ background: '#f8fafc', padding: '40px 50px', borderTop: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 25px 0', color: COLORS.navy, fontSize: '24px', fontWeight: 800 }}>📚 Official Documents</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {relatedDocs.map((doc, idx) => (
                  <motion.div key={doc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }}
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
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* 3. SMART SIDEBAR */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '100px' }}
        >
          <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderTop: `4px solid ${COLORS.navy}` }}>
            <h3 style={{ margin: '0 0 20px', color: COLORS.navy, fontSize: '18px', fontWeight: 800 }}>⚡ Quick Actions</h3>
            <button onClick={() => window.print()} className="action-btn">🖨️ Print this Page</button>
            <button onClick={handleShare} className="action-btn" style={{ marginTop: '10px' }}>📤 Share on WhatsApp</button>
          </div>
          <div style={{ background: '#fff9eb', borderRadius: '16px', padding: '25px', border: `1px solid ${COLORS.gold}` }}>
            <h3 style={{ margin: '0 0 10px', color: '#b45309', fontSize: '18px', fontWeight: 800 }}>Need Help?</h3>
            <p style={{ fontSize: '14px', color: '#78350f', margin: '0 0 15px', lineHeight: '1.6' }}>If you have any questions regarding {page.title.toLowerCase()}, please reach out to our administration.</p>
            <a href="/#/contact" className="action-btn" style={{ background: COLORS.gold, color: '#000', borderColor: COLORS.gold, display: 'block', textAlign: 'center', textDecoration: 'none' }}>✉️ Contact Us</a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) { .dynamic-rich-content { padding: 25px !important; } }
        .dynamic-rich-content table { width: 100% !important; border-collapse: collapse; margin: 20px 0; display: block; overflow-x: auto; white-space: nowrap; font-size: 14px; }
        .dynamic-rich-content th { background: ${COLORS.navy}; color: white; padding: 12px 15px; text-align: left; }
        .dynamic-rich-content td { padding: 12px 15px; border: 1px solid #e2e8f0; }
        .dynamic-rich-content tr:nth-child(even) { background-color: #f8fafc; }
        .dynamic-rich-content iframe { width: 100%; aspect-ratio: 16 / 9; height: auto; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 20px 0; }
        .dynamic-rich-content img { max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin: 20px 0; display: block; }
        .dynamic-rich-content h1, .dynamic-rich-content h2, .dynamic-rich-content h3 { color: ${COLORS.navy}; margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 800; line-height: 1.3; }
        .dynamic-rich-content p { margin-bottom: 1.5em; line-height: 1.8; color: #334155; font-size: 16px; }
        .dynamic-rich-content ul, .dynamic-rich-content ol { margin-bottom: 1.5em; padding-left: 20px; color: #334155; line-height: 1.8; font-size: 16px;}
        .dynamic-rich-content li { margin-bottom: 8px; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        .new-badge { display: inline-block; background: #ef4444; color: #fff; fontSize: 9px; font-weight: 800; padding: 3px 6px; border-radius: 4px; margin-bottom: 8px; width: fit-content; animation: blink 1.5s infinite; letter-spacing: 0.5px;}
        .download-btn { display: inline-block; background: #f8fafc; color: ${COLORS.navy}; padding: 8px 15px; border-radius: 6px; font-size: 12px; font-weight: 700; text-decoration: none; border: 1px solid #cbd5e1; text-align: center; transition: 0.2s; }
        .download-btn:hover { background: ${COLORS.navy}; color: #fff; border-color: ${COLORS.navy}; }
        .action-btn { width: 100%; background: #fff; color: ${COLORS.navy}; border: 1px solid #cbd5e1; padding: 12px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: 0.2s; font-size: 14px; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .action-btn:hover { background: #f1f5f9; border-color: ${COLORS.navy}; }
      `}</style>
    </div>
  );
}