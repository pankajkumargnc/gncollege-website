// src/pages/AcademicsPages.jsx
import React, { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import PDFModal from '../components/PDFModal'; // ✅ PDF Modal Import

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

/* ─── Shared Scroll Animation (Fade In) ─── */
function Fade({ children, delay = 0, y = 20 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0, transform: vis ? 'none' : `translateY(${y}px)`,
      transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`
    }}>
      {children}
    </div>
  );
}

/* ─── Shared Hero Header ─── */
const PageHeader = ({ title, subtitle, icon }) => (
  <div style={{ background: NAVY, padding: '80px 20px 60px', textAlign: 'center', color: '#fff' }}>
    <Fade>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, margin: '0 0 16px', letterSpacing: '-0.5px' }}>{title}</h1>
      <p style={{ color: '#cbd5e1', fontSize: 16, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>{subtitle}</p>
    </Fade>
  </div>
);

/* ════════════════════════════════════════════════════════════
   1. IQAC (Internal Quality Assurance Cell)
════════════════════════════════════════════════════════════ */
export function IqacPage() {
  const [docs, setDocs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null); // ✅ PDF Modal State
  
  useEffect(() => {
    const q = query(collection(db, 'pdfReports'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      const allDocs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setDocs(allDocs.filter(d => 
        (d.title || '').toLowerCase().includes('aqar') || 
        (d.targetPage || '').toLowerCase().includes('iqac') ||
        (d.title || '').toLowerCase().includes('naac')
      ));
    });
    return () => unsub();
  }, []);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="Internal Quality Assurance Cell" subtitle="Ensuring and enhancing the academic and administrative performance of the institution." icon="📈" />
      
      <div style={{ maxWidth: 1200, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 60 }}>
          {[{ i:'🎯', t:'Quality Benchmarks', d:'Developing parameters for various academic activities.' },
            { i:'📊', t:'Feedback System', d:'Collecting and analyzing feedback from all stakeholders.' },
            { i:'🛠️', t:'Workshops & FDPs', d:'Organizing quality-related seminars and training programs.' }].map((b, i) => (
            <Fade key={i} delay={i * 0.1}>
              <div style={{ background: '#fff', borderRadius: 20, padding: 32, height: '100%', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.04)', transition: 'transform 0.3s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-5px)'} onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                <div style={{ fontSize: 36, marginBottom: 16, background: '#f1f5f9', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 16 }}>{b.i}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, margin: '0 0 10px' }}>{b.t}</h3>
                <p style={{ color: '#64748b', fontSize: 15, margin: 0, lineHeight: 1.6 }}>{b.d}</p>
              </div>
            </Fade>
          ))}
        </div>

        <Fade delay={0.2}>
          <div style={{ background: '#fff', borderRadius: 24, padding: 40, border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: NAVY, margin: '0 0 24px' }}>AQAR & Quality Reports</h2>
            {docs.length === 0 ? (
              <p style={{ color: '#94a3b8' }}>No reports uploaded yet. (Upload from Admin Panel → Documents)</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {docs.map(d => (
                  <a key={d.id} href={d.link} target="_blank" rel="noreferrer" 
                    onClick={(e) => { 
                      if (d.link && (d.link.includes('drive.google') || d.link.toLowerCase().endsWith('.pdf') || d.link.includes('firebase'))) {
                        e.preventDefault(); 
                        setSelectedPdf({ url: d.link, title: d.title || 'IQAC Report' }); 
                      }
                    }} 
                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, border: '1.5px solid #e2e8f0', borderRadius: 14, textDecoration: 'none', color: NAVY, transition: 'all 0.2s', background: '#f8fafc' }} 
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=GOLD;e.currentTarget.style.background='#fff'}} 
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='#e2e8f0';e.currentTarget.style.background='#f8fafc'}}>
                    <div style={{ fontSize: 28 }}>📄</div>
                    <div style={{ flex: 1, fontWeight: 700, fontSize: 14 }}>{d.title}</div>
                    <div style={{ color: GOLD, fontWeight: 800 }}>↗</div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </Fade>
      </div>

      {/* ✅ Modal Render */}
      {selectedPdf && (
        <PDFModal 
          url={selectedPdf.url} 
          title={selectedPdf.title} 
          onClose={() => setSelectedPdf(null)} 
        />
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   2. COURSE OFFERED (NEP 2022 / FYUGP)
════════════════════════════════════════════════════════════ */
export function CourseOffered() {
  const [activeTab, setActiveTab] = useState('BCA');
  
  const courses = {
    'BCA': ['BCA (Computer Application)'],
    'BBA': ['BBA (Business Administration)'],
    'Commerce': ['Accounting & Finance', 'Marketing', 'Human Resource'],
    'Humanities': ['Hindi', 'English'],
    'Social Science': ['History', 'Political Science', 'Psychology', 'Economics']
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="Courses Offered (NEP 2022)" subtitle="Four Year Undergraduate Programme (FYUGP) with Multiple Entry & Exit Options." icon="🎓" />
      
      <div style={{ maxWidth: 1100, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Fade>
          <div style={{ background: '#fff', borderRadius: 20, padding: '30px 40px', display: 'flex', flexWrap: 'wrap', gap: 30, justifyContent: 'space-between', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.05)', marginBottom: 40 }}>
            {[{t:'1 Year', d:'UG Certificate'}, {t:'2 Years', d:'UG Diploma'}, {t:'3 Years', d:'Bachelor Degree'}, {t:'4 Years', d:'Bachelor with Honours / Research'}].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', flex: '1 1 150px' }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: GOLD, marginBottom: 4 }}>{item.t}</div>
                <div style={{ fontSize: 14, color: NAVY, fontWeight: 700 }}>{item.d}</div>
              </div>
            ))}
          </div>
        </Fade>

        <Fade delay={0.2}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24, justifyContent: 'center' }}>
            {Object.keys(courses).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '12px 24px', border: 'none', borderRadius: 99, fontWeight: 800, fontSize: 14, cursor: 'pointer', transition: 'all 0.3s', background: activeTab === tab ? NAVY : '#fff', color: activeTab === tab ? '#fff' : '#64748b', boxShadow: activeTab === tab ? `0 8px 20px ${NAVY}40` : '0 2px 10px rgba(0,0,0,0.05)' }}>
                {tab}
              </button>
            ))}
          </div>

          <div style={{ background: '#fff', borderRadius: 24, padding: 40, border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20 }}>
            {courses[activeTab].map((subject, i) => (
              <div key={i} style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1.5px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ background: `${GOLD}20`, color: '#b45309', width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>{i+1}</div>
                <div style={{ fontWeight: 800, color: NAVY, fontSize: 16 }}>{subject}</div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   3. SYLLABUS (Live from Firebase)
════════════════════════════════════════════════════════════ */
export function Syllabus() {
  const [syllabusList, setSyllabusList] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedPdf, setSelectedPdf] = useState(null); // ✅ PDF Modal State

  useEffect(() => {
    const q = query(collection(db, 'pdfReports'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      const allDocs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setSyllabusList(allDocs.filter(d => (d.type || '').toLowerCase() === 'syllabus'));
    });
    return () => unsub();
  }, []);

  const filtered = syllabusList.filter(s => 
    (filter === 'All' || (s.title || '').toLowerCase().includes(filter.toLowerCase())) &&
    (s.title || '').toLowerCase().includes(search.toLowerCase())
  );

  const filterOptions = [
    'All', 'BCA', 'BBA', 'Commerce', 'Hindi', 'English', 
    'History', 'Political Science', 'Psychology', 'Economics'
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="Syllabus Database" subtitle="Download official FYUGP and CBCS syllabi for all departments." icon="📚" />
      
      <div style={{ maxWidth: 1000, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Fade>
          <div style={{ background: '#fff', padding: 20, borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.05)', marginBottom: 30 }}>
            <input type="text" placeholder="🔍 Search subject or semester... (e.g., BCA Sem 1)" value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '16px 20px', borderRadius: 12, border: '1.5px solid #e2e8f0', fontSize: 16, outline: 'none', background: '#f8fafc', color: NAVY, fontWeight: 600, boxSizing: 'border-box' }} />
            
            <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
              {filterOptions.map(f => (
                <button 
                  key={f} 
                  onClick={() => setFilter(f)} 
                  style={{ 
                    padding: '8px 16px', borderRadius: 8, border: 'none', 
                    background: filter === f ? `${NAVY}15` : 'transparent', 
                    color: filter === f ? NAVY : '#64748b', 
                    fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' 
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </Fade>

        <Fade delay={0.1}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8', background: '#fff', borderRadius: 20, border: '2px dashed #e2e8f0' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: NAVY }}>No Syllabus Found</div>
              <div style={{ fontSize: 14 }}>Try adjusting your search or upload from Admin Panel.</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {filtered.map(s => (
                <div key={s.id} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 16, transition: 'transform 0.2s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'} onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 32 }}>📘</div>
                    <div>
                      <div style={{ fontWeight: 800, color: NAVY, fontSize: 16, lineHeight: 1.3 }}>{s.title}</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 4, fontWeight: 600 }}>NEP 2022 Format</div>
                    </div>
                  </div>
                  <a href={s.link} target="_blank" rel="noreferrer" 
                    onClick={(e) => { 
                      if (s.link && (s.link.includes('drive.google') || s.link.toLowerCase().endsWith('.pdf') || s.link.includes('firebase'))) {
                        e.preventDefault(); 
                        setSelectedPdf({ url: s.link, title: s.title || 'Syllabus' }); 
                      }
                    }} 
                    style={{ display: 'block', textAlign: 'center', background: `linear-gradient(135deg, ${NAVY}, #1a3a7c)`, color: '#fff', padding: '10px', borderRadius: 10, textDecoration: 'none', fontWeight: 800, fontSize: 14 }}>
                    📥 Download PDF
                  </a>
                </div>
              ))}
            </div>
          )}
        </Fade>
      </div>

      {/* ✅ Modal Render */}
      {selectedPdf && (
        <PDFModal 
          url={selectedPdf.url} 
          title={selectedPdf.title} 
          onClose={() => setSelectedPdf(null)} 
        />
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   4. ACADEMIC CALENDAR (Timeline)
════════════════════════════════════════════════════════════ */
export function AcademicCalendar() {
  const events = [
    { month: 'July - August', title: 'Admissions & Orientation', desc: 'Commencement of new academic session and induction for Semester 1.' },
    { month: 'September - October', title: 'Internal Mid-Semester Exams', desc: 'First assessment for all UG programs.' },
    { month: 'November', title: 'Youth Fest & Sports Meet', desc: 'Annual cultural and sports week.' },
    { month: 'December - January', title: 'University End-Semester Exams', desc: 'Final theory and practical examinations.' },
    { month: 'February - March', title: 'Even Semester Commences', desc: 'Classes resume for Semester 2, 4, and 6.' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="Academic Calendar" subtitle="Key dates, examination schedules, and holidays for the current session." icon="🗓️" />
      
      <div style={{ maxWidth: 900, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Fade>
          <div style={{ background: '#fff', padding: 40, borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.05)' }}>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: NAVY, marginBottom: 30, borderBottom: `2px solid ${GOLD}`, paddingBottom: 10, display: 'inline-block' }}>Session Timeline</h2>
            
            <div style={{ position: 'relative', paddingLeft: 30 }}>
              <div style={{ position: 'absolute', top: 10, bottom: 20, left: 9, width: 3, background: '#e2e8f0', borderRadius: 3 }} />
              
              {events.map((ev, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: 30 }}>
                  <div style={{ position: 'absolute', left: -26, top: 4, width: 12, height: 12, borderRadius: '50%', background: GOLD, border: '3px solid #fff', boxShadow: '0 0 0 2px #f4a023' }} />
                  <div style={{ fontSize: 13, fontWeight: 900, color: GOLD, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{ev.month}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: NAVY, marginBottom: 6 }}>{ev.title}</div>
                  <div style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6 }}>{ev.desc}</div>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: 40, padding: 20, background: '#fffbeb', borderRadius: 16, border: '1px solid #fde68a', display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ fontSize: 32 }}>⛱️</div>
              <div>
                <div style={{ fontWeight: 800, color: '#92400e', fontSize: 16 }}>List of Holidays</div>
                <div style={{ fontSize: 14, color: '#b45309', marginTop: 4 }}>College strictly follows the holiday calendar issued by BBMKU University. Download the official PDF for exact dates.</div>
              </div>
            </div>

          </div>
        </Fade>
      </div>
    </div>
  );
}