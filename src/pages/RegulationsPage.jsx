// src/pages/RegulationsPage.jsx
// ✅ BUG FIX: VITE_DRIVE_REGULATION_FOLDER → VITE_DRIVE_REGULATIONS_FOLDER

import React, { useState, useEffect } from 'react';
import { useDriveDocs } from '../hooks/useDriveDocs';
import PDFModal from '../components/PDFModal';
import { COLORS } from '../styles/colors';

export default function RegulationsPage() {
  const [selectedPdf, setSelectedPdf] = useState(null);

  // ✅ FIX: REGULATION_FOLDER → REGULATIONS_FOLDER (matches .env key)
  const REGULATION_FOLDER_ID = import.meta.env.VITE_DRIVE_REGULATIONS_FOLDER;
  const { docs: regulations, loading, error } = useDriveDocs(REGULATION_FOLDER_ID, 'pdf');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', fontFamily:"'DM Sans', sans-serif" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* Hero */}
      <header style={{
        position:'relative', padding:'80px 20px',
        background:`url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop') center/cover`,
        borderBottom:'1px solid #e2e8f0',
      }}>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(to right, ${COLORS.navy}f2, ${COLORS.navy}cc)` }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:'1000px', margin:'0 auto', textAlign:'center' }}>
          <h1 style={{ color:'#fff', fontSize:'42px', fontWeight:900, margin:'0 0 15px', letterSpacing:'-1px' }}>
            📜 College Regulations &amp; Byelaws
          </h1>
          <p style={{ color:'#cbd5e1', fontSize:'18px', maxWidth:'650px', margin:'0 auto', lineHeight:1.6 }}>
            Official guidelines, academic rules, and administrative byelaws of Guru Nanak College and Universities (BBMKU/VBU).
          </p>
        </div>
      </header>

      {/* Main */}
      <div style={{ maxWidth:'1000px', margin:'-30px auto 80px', padding:'0 20px', position:'relative', zIndex:10 }}>
        <div style={{ background:'#fff', borderRadius:'16px', padding:'30px', boxShadow:'0 10px 40px rgba(0,0,0,0.05)', border:'1px solid #e2e8f0' }}>

          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'25px', borderBottom:'2px solid #f1f5f9', paddingBottom:'15px' }}>
            <span style={{ fontSize:'24px' }}>📂</span>
            <h2 style={{ fontSize:'20px', fontWeight:800, color:COLORS.navy, margin:0 }}>Official Documents</h2>
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ textAlign:'center', padding:'40px', color:COLORS.navy, fontWeight:800 }}>
              <span style={{ display:'inline-block', animation:'spin 1s linear infinite', marginRight:10 }}>⏳</span>
              Syncing with Google Drive...
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div style={{ textAlign:'center', padding:'30px', background:'#fef2f2', color:'#ef4444', borderRadius:'12px', fontWeight:'bold' }}>
              ⚠️ Failed to fetch regulations: {error}
              <br />
              <span style={{ fontSize:12, fontWeight:500 }}>
                Check VITE_DRIVE_REGULATIONS_FOLDER in your .env file and ensure folder is shared publicly.
              </span>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && regulations.length === 0 && (
            <div style={{ textAlign:'center', padding:'60px', border:'2px dashed #cbd5e1', borderRadius:'12px', color:'#64748b' }}>
              No regulations uploaded yet. Please add PDFs to the Drive folder.
            </div>
          )}

          {/* Document list */}
          <div style={{ display:'flex', flexDirection:'column', gap:'15px' }}>
            {regulations.map(doc => (
              <div key={doc.id}
                style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:'12px', padding:'20px', display:'flex', justifyContent:'space-between', alignItems:'center', transition:'all 0.2s', flexWrap:'wrap', gap:'15px' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=COLORS.gold; e.currentTarget.style.boxShadow='0 5px 15px rgba(0,0,0,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.boxShadow='none'; }}
              >
                <div>
                  <h3 style={{ margin:'0 0 8px 0', color:COLORS.navy, fontSize:'17px', fontWeight:800 }}>{doc.name}</h3>
                  <div style={{ display:'flex', gap:'12px', fontSize:'12px', color:'#64748b', fontWeight:700 }}>
                    <span style={{ background:'#f1f5f9', padding:'4px 10px', borderRadius:'6px' }}>📅 {doc.date}</span>
                    <span style={{ background:'#f1f5f9', padding:'4px 10px', borderRadius:'6px' }}>💾 {doc.size}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPdf({ url: doc.previewUrl, title: doc.name })}
                  style={{ background:COLORS.navy, color:'#fff', border:'none', padding:'10px 20px', borderRadius:'8px', fontWeight:800, fontSize:'13px', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', transition:'0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background=COLORS.gold}
                  onMouseLeave={e => e.currentTarget.style.background=COLORS.navy}
                >
                  📄 Read PDF ›
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>

      {selectedPdf && (
        <PDFModal url={selectedPdf.url} title={selectedPdf.title} onClose={() => setSelectedPdf(null)} />
      )}
    </div>
  );
}