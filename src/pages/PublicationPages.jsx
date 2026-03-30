// src/pages/PublicationPages.jsx
import React, { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import PDFModal from '../components/PDFModal'; // ✅ PDF Modal Import

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

function Fade({ children, delay = 0, y = 20 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current); return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : `translateY(${y}px)`, transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s` }}>{children}</div>;
}

const PageHeader = ({ title, subtitle, icon }) => (
  <div style={{ background: NAVY, padding: 'clamp(56px,8vw,80px) clamp(16px,3vw,24px) clamp(44px,6vw,60px)', textAlign: 'center', color: '#fff' }}>
    <Fade>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, margin: '0 0 16px', letterSpacing: '-0.5px' }}>{title}</h1>
      <p style={{ color: '#cbd5e1', fontSize: 16, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>{subtitle}</p>
    </Fade>
  </div>
);

function PublicationDocList({ keyword }) {
  const [docs, setDocs] = useState([]);
  const [previewPdf, setPreviewPdf] = useState(null); // ✅ PDF Preview State

  useEffect(() => {
    const q = query(collection(db, 'pdfReports'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setDocs(all.filter(d =>
        (d.targetPage || '').toLowerCase() === keyword.toLowerCase() ||
        (d.title || '').toLowerCase().includes(keyword.toLowerCase())
      ));
    });
    return () => unsub();
  }, [keyword]);

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {docs.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 40, color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: 20 }}>No documents found in this category.</div>
        ) : (
          docs.map((d, i) => (
            <Fade key={d.id} delay={i * 0.05}>
              <a href={d.link} target="_blank" rel="noreferrer" 
                onClick={(e) => { e.preventDefault(); setPreviewPdf({ url: d.link, title: d.title }); }} // ✅ Modal Trigger
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 20, background: '#fff', borderRadius: 16, border: '1.5px solid #e2e8f0', textDecoration: 'none', color: NAVY, cursor: 'pointer' }}>
                <div style={{ fontSize: 24 }}>📄</div>
                <div style={{ flex: 1, fontWeight: 700, fontSize: 14 }}>{d.title}</div>
                <div style={{ color: GOLD, fontWeight: 800 }}>↗</div>
              </a>
            </Fade>
          ))
        )}
      </div>

      {/* ✅ Modal Render */}
      {previewPdf && <PDFModal url={previewPdf.url} title={previewPdf.title} onClose={() => setPreviewPdf(null)} />}
    </>
  );
}

export function LibraryPage() {
  const stats = [
    { label: 'Books', val: '50,000+', icon: '📚' },
    { label: 'Journals', val: '25+', icon: '📰' },
    { label: 'Digital Access', val: 'N-LIST', icon: '💻' },
    { label: 'Reading Hall', val: '200 Seating', icon: '🪑' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="College Library" subtitle="A hub of knowledge equipped with vast resources for research and learning." icon="📖" />
      <div style={{ maxWidth: 1100, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 40 }}>
          {stats.map((s, i) => (
            <Fade key={i} delay={i * 0.1}>
              <div style={{ background: '#fff', borderRadius: 20, padding: 30, textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.05)' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: NAVY, marginBottom: 4 }}>{s.val}</div>
                <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            </Fade>
          ))}
        </div>
        <Fade delay={0.3}>
          <div style={{ background: '#fff', borderRadius: 24, padding: 40, border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 20 }}>Library Services</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {['Online Public Access Catalog (OPAC)', 'Inter-Library Loan Facility', 'Reprographic Services', 'Digital Library Section'].map((item, i) => (
                <div key={i} style={{ padding: 16, background: '#f8fafc', borderRadius: 12, fontWeight: 600, color: NAVY, border: '1px solid #f1f5f9' }}>✓ {item}</div>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export function PublicationPage({ type, title, subtitle, icon, keyword }) {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title={title} subtitle={subtitle} icon={icon} />
      <div style={{ maxWidth: 1000, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <PublicationDocList keyword={keyword} />
      </div>
    </div>
  );
}