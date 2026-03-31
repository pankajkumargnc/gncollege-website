// src/pages/NaacPages.jsx
import React, { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import PDFModal from '../components/PDFModal'; // ✅ PDF Modal Import

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

/* ─── Shared Scroll Animation ─── */
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
  <header className="premium-hero">
    <div className="kinetic-bg" />
    <Fade>
      <div className="hero-content-wrapper">
        {icon && <div className="hero-icon">{icon}</div>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </Fade>
  </header>
);

/* ─── Document List Component ─── */
function NaacDocumentList({ categoryKey, emptyMsg = "Documents will be available soon." }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewPdf, setPreviewPdf] = useState(null); // ✅ PDF Preview State

  useEffect(() => {
    const q = query(collection(db, 'pdfReports'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setDocs(all.filter(d =>
        (d.targetPage || '').toLowerCase() === categoryKey.toLowerCase() ||
        (d.targetPage || '').toLowerCase().includes(categoryKey.toLowerCase()) ||
        (d.title || '').toLowerCase().includes(categoryKey.toLowerCase())
      ));
      setLoading(false);
    });
    return () => unsub();
  }, [categoryKey]);

  if (loading) return <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Loading Documents...</div>;

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {docs.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60, background: '#fff', borderRadius: 20, border: '2px dashed #e2e8f0', color: '#94a3b8' }}>{emptyMsg}</div>
        ) : (
          docs.map((d, i) => (
            <Fade key={d.id} delay={i * 0.05}>
              <a href={d.link} target="_blank" rel="noreferrer" 
                onClick={(e) => { e.preventDefault(); setPreviewPdf({ url: d.link, title: d.title }); }} // ✅ Modal Trigger
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20, background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', textDecoration: 'none', transition: '0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', cursor: 'pointer' }} 
                onMouseEnter={e=>{e.currentTarget.style.borderColor=GOLD; e.currentTarget.style.transform='translateY(-3px)'}} 
                onMouseLeave={e=>{e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.transform='none'}}>
                <div style={{ fontSize: 32 }}>📄</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: NAVY, fontSize: 15, lineHeight: 1.3 }}>{d.title}</div>
                  <div style={{ fontSize: 12, color: GOLD, fontWeight: 700, marginTop: 4, textTransform: 'uppercase' }}>View PDF ↗</div>
                </div>
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

/* 1. SSR CYCLE 1 & 2 */
export function SsrCyclePage({ cycle = 1 }) {
  const title = `SSR ${cycle}${cycle === 1 ? 'st' : 'nd'} Cycle`;
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title={title} subtitle={`Complete Self Study Report and Peer Team documents for NAAC Accreditation Cycle ${cycle}.`} icon={cycle === 1 ? "🥇" : "🥈"} />
      <div style={{ maxWidth: 1100, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <NaacDocumentList categoryKey={`cycle-${cycle}`} emptyMsg={`SSR Cycle ${cycle} documents are being processed.`} />
      </div>
    </div>
  );
}

/* 2. AQAR */
export function AqarPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="AQAR Reports" subtitle="Annual Quality Assurance Reports submitted to NAAC by the IQAC cell of the college." icon="📊" />
      <div style={{ maxWidth: 1100, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}><NaacDocumentList categoryKey="aqar" emptyMsg="Annual Quality Assurance Reports will appear here." /></div>
    </div>
  );
}

/* 3. NIRF */
export function NirfPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="NIRF Rankings" subtitle="Data submitted for the National Institutional Ranking Framework (Ministry of Education)." icon="🏛️" />
      <div style={{ maxWidth: 1100, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}><NaacDocumentList categoryKey="nirf" emptyMsg="NIRF participation data and reports will be updated here." /></div>
    </div>
  );
}

/* 4. PERSPECTIVE PLAN */
export function PerspectivePlan() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="Perspective Plan" subtitle="The strategic roadmap and future vision of Guru Nanak College for academic and infrastructure growth." icon="🗺️" />
      <div style={{ maxWidth: 900, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Fade>
          <div style={{ background: '#fff', borderRadius: 24, padding: 40, border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.05)' }}>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: NAVY, marginBottom: 20 }}>Strategic Vision</h2>
            <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: 16, marginBottom: 30 }}>Our Perspective Plan outlines the long-term goals including digital transformation, introduction of new vocational courses, and achieving excellence in NAAC 3rd cycle.</p>
            <NaacDocumentList categoryKey="perspective" />
          </div>
        </Fade>
      </div>
    </div>
  );
}