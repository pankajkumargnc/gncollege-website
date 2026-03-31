// ═══════════════════════════════════════════════════════════════════════
//  AdminDepartmentTab.jsx  v3.1 — Ultra Premium Edition
//  Refined UX with full field synchronization and enhanced save states
// ═══════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef } from 'react';
import { doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from "../../../firebase";
import MediaPicker from "../../MediaPicker";
import toast from 'react-hot-toast';

/* ─── colours ──────────────────────────────────────────────────────────── */
const NAVY = '#0f2347';
const BLUE = '#0ea5e9';
const PURP = '#8b5cf6';
const RED  = '#ef4444';
const GOLD = '#f59e0b';

/* ─── data structures ─────────────────────────────────────────────────── */
const DEPTS = [
  { slug: 'bca',           label: 'BCA',           icon: '💻', color: BLUE },
  { slug: 'bba',           label: 'BBA',           icon: '📊', color: GOLD },
  { slug: 'commerce',      label: 'Commerce',      icon: '🏦', color: '#10b981' },
  { slug: 'humanities',    label: 'Humanities (F)', icon: '📚', color: PURP },
  { slug: 'hindi',         label: 'Hindi',         icon: '📖', color: PURP },
  { slug: 'english',       label: 'English',       icon: '📝', color: PURP },
  { slug: 'social-science',label: 'Social Science (F)',icon: '🌍', color: RED },
  { slug: 'history',       label: 'History',       icon: '🏛️', color: RED },
  { slug: 'political-science', label: 'Pol. Science', icon: '⚖️', color: RED },
  { slug: 'economics',     label: 'Economics',     icon: '📈', color: RED },
  { slug: 'psychology',    label: 'Psychology',    icon: '🧠', color: RED },
];

const STREAMS = [
  { id: 'none', label: 'Standalone' },
  { id: 'humanities', label: 'Humanities' },
  { id: 'social-science', label: 'Social Science' },
];

/* ─── UI components ───────────────────────────────────────────────────── */
const uuid = () => Math.random().toString(36).slice(2, 10);

const INP_BASE = {
  width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0',
  borderRadius: 12, fontSize: 13.5, fontFamily: "'Plus Jakarta Sans',sans-serif", color: '#1e293b',
  background: '#fff', outline: 'none', transition: 'all .2s ease',
};

const SmartInput = ({ label, ...p }) => (
  <div style={{ marginBottom: 18 }}>
    {label && <label style={{ fontSize: 11.5, fontWeight: 800, color: '#64748b', marginBottom: 7, display: 'block', textTransform: 'uppercase', letterSpacing: '.8px' }}>{label}</label>}
    <input style={INP_BASE} {...p} onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
  </div>
);

const SmartArea = ({ label, ...p }) => (
  <div style={{ marginBottom: 18 }}>
    {label && <label style={{ fontSize: 11.5, fontWeight: 800, color: '#64748b', marginBottom: 7, display: 'block', textTransform: 'uppercase', letterSpacing: '.8px' }}>{label}</label>}
    <textarea style={{ ...INP_BASE, resize: 'vertical', minHeight: 100 }} {...p} onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
  </div>
);

const GlassCard = ({ children, title, icon }) => (
  <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: 24, padding: '28px', marginBottom: 24, boxShadow: '0 4px 6px rgba(15,35,71,.02)' }}>
    {title && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 16, borderBottom: '1.5px solid #f8fafc' }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#f8fafc,#f1f5f9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{icon}</div>
        <div style={{ fontWeight: 800, fontSize: 16, color: NAVY }}>{title}</div>
      </div>
    )}
    {children}
  </div>
);

const PdfList = ({ reports = [], onUpdate, color = BLUE }) => {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: '', year: '2024', pdfUrl: '' });

  return (
    <div>
      {reports.map((r, i) => (
        <div key={r.id || i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, background: '#f8fafc', borderRadius: 16, marginBottom: 10, border: '1px solid #f1f5f9' }}>
           <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📄</div>
           <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: NAVY }}>{r.title}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{r.year} • <a href={r.pdfUrl} target="_blank" rel="noreferrer" style={{ color }}>View PDF</a></div>
           </div>
           <button onClick={() => onUpdate(reports.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', color: RED, cursor: 'pointer', fontWeight: 900 }}>✕</button>
        </div>
      ))}
      {adding ? (
        <div style={{ background: '#f8fafc', padding: 20, borderRadius: 20, border: `2px dashed ${color}33` }}>
           <SmartInput label="Report Title" value={form.title} placeholder="e.g. Annual Activity Report 2024" onChange={e => setForm({...form, title: e.target.value})} />
           <SmartInput label="Report Year" value={form.year} placeholder="2024" onChange={e => setForm({...form, year: e.target.value})} />
           <MediaPicker label="PDF Path / URL (Google Drive / public path)" value={form.pdfUrl} onChange={u => setForm({...form, pdfUrl: u})} type="pdf" compact />
           <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
              <button onClick={() => { onUpdate([...reports, { ...form, id: uuid() }]); setAdding(false); setForm({title:'', year:'2024', pdfUrl:''}); }} style={{ background: BLUE, color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Add Report</button>
              <button onClick={() => setAdding(false)} style={{ background: '#f1f5f9', color: '#64748b', border: 'none', padding: '10px 20px', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
           </div>
        </div>
      ) : <button onClick={() => setAdding(true)} className="add-dot-btn">+ Add Activity Report (PDF)</button>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN ADMIN WORKSTATION
   ═══════════════════════════════════════════════════════════════════════ */
export default function AdminDepartmentTab() {
  const [activeDept, setActiveDept] = useState('bca');
  const [activeTab,  setActiveTab]  = useState('general'); // general | academics | features | faculty | finance
  const [data,       setData]       = useState({});
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [saved,      setSaved]      = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, 'departments', activeDept), snap => {
      setData(snap.exists() ? snap.data() : {});
      setLoading(false);
    });
    return () => unsub();
  }, [activeDept]);

  const set    = (k, v) => setData(p => ({ ...p, [k]: v }));
  const setHod = (k, v) => setData(p => ({ ...p, hod: { ...(p.hod||{}), [k]: v } }));

  const saveData = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'departments', activeDept), { ...data, updatedAt: serverTimestamp() }, { merge: true });
      toast.success('✨ Updated successfully!');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) { 
      toast.error('Sync Error: ' + e.message); 
    }
    setSaving(false);
  };

  const info = DEPTS.find(d => d.slug === activeDept);
  const C = info?.color || BLUE;

  return (
    <div style={{ display: 'flex', gap: 32, fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", color: '#1e293b' }}>
      <style>{`
        .pbtn{background:${BLUE};color:#fff;border:none;padding:12px 28px;border-radius:14px;font-weight:800;font-size:14px;cursor:pointer;transition:all .2s;box-shadow:0 10px 20px ${BLUE}22;}
        .pbtn:hover{transform:translateY(-2px);box-shadow:0 12px 24px ${BLUE}33;}
        .pbtn.saved{background:#10b981;box-shadow:0 10px 20px rgba(16,185,129,0.22);}
        .add-dot-btn{width:100%;padding:14px;border:2px dashed #e2e8f0;background:transparent;border-radius:16px;color:#94a3b8;font-weight:700;font-size:12.5px;cursor:pointer;transition:all .2s;}
        .add-dot-btn:hover{border-color:${BLUE};color:${BLUE};background:#f0f9ff;}
        .aside-btn{width:100%;display:flex;align-items:center;gap:12px;padding:12px 14px;border:none;background:transparent;border-radius:14px;cursor:pointer;text-align:left;transition:all .2s;color:#64748b;}
        .aside-btn:hover{background:#f1f5f9;color:${NAVY};}
        .aside-btn.on{background:#fff;box-shadow:0 10px 25px rgba(0,0,0,0.06);color:${BLUE};font-weight:800;border:1.5px solid ${BLUE}1a;}
        .tab-btn{padding:10px 18px;border:none;background:transparent;font-weight:700;font-size:13.5px;color:#94a3b8;cursor:pointer;position:relative;transition:all .2s;}
        .tab-btn.on{color:${NAVY};}
        .tab-btn.on::after{content:'';position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);width:24px;height:4px;background:${BLUE};border-radius:10px;}
        .mini-del{width:32px;height:32px;border-radius:10px;background:#fee2e2;color:${RED};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-weight:900;}
        .glass-sel{background:#fff;border:1.5px solid #e2e8f0;padding:12px 14px;border-radius:12px;font-family:inherit;font-weight:600;width:100%;outline:none;}
      `}</style>
      
      {/* 🏛️ LEFT SIDEBAR */}
      <div style={{ width: 230, flexShrink: 0, position: 'sticky', top: 20, alignSelf: 'flex-start' }}>
        <h4 style={{ fontSize: 10, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, paddingLeft: 8 }}>Department Nodes</h4>
        {STREAMS.map(s => {
          const sDepts = DEPTS.filter(d => {
             if (s.id === 'none') return !['humanities','social-science','hindi','english','history','political-science','economics','psychology'].includes(d.slug);
             if (s.id === 'humanities') return ['humanities','hindi','english'].includes(d.slug);
             if (s.id === 'social-science') return ['social-science', 'history', 'political-science', 'economics', 'psychology'].includes(d.slug);
             return false;
          });
          return (
            <div key={s.id} style={{ marginBottom: 24 }}>
               <div style={{ fontSize: 11, fontWeight: 800, color: '#cbd5e1', marginBottom: 10, paddingLeft: 12 }}>{s.label}</div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {sDepts.map(d => (
                    <button key={d.slug} onClick={() => setActiveDept(d.slug)} className={`aside-btn${activeDept === d.slug ? ' on' : ''}`}>
                       <span style={{ fontSize: 18 }}>{d.icon}</span>
                       <span style={{ fontSize: 13.5 }}>{d.label}</span>
                    </button>
                  ))}
               </div>
            </div>
          );
        })}
      </div>

      {/* 🚀 MAIN PANEL */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)', padding: '16px 24px', borderRadius: 24, border: '1.5px solid #fff', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 16, background: `${C}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{info.icon}</div>
              <div>
                 <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: NAVY }}>{info.label} Console</h2>
                 <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Real-time synchronization active</div>
              </div>
           </div>
           <button onClick={saveData} disabled={saving} className={`pbtn ${saved ? 'saved' : ''}`} style={{ minWidth: 180 }}>
              {saving ? '⏳ Syncing...' : saved ? '✅ Saved Successfully' : '💾 Save Content'}
           </button>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 32, overflowX: 'auto', paddingBottom: 10 }}>
           {[
             { id: 'general', label: 'Primary Info', icon: '📝' },
             { id: 'academics', label: 'Curriculum', icon: '📖' },
             { id: 'features', label: 'High-Impact Data', icon: '💎' },
             { id: 'faculty', label: 'Leadership', icon: '👨‍🏫' },
             { id: 'finance', label: 'Financials', icon: '💰' }
           ].map(t => (
             <button key={t.id} onClick={() => setActiveTab(t.id)} className={`tab-btn${activeTab === t.id ? ' on' : ''}`}>
                <span style={{ marginRight: 6 }}>{t.icon}</span> {t.label}
             </button>
           ))}
        </div>

        {loading ? <div style={{ textAlign: 'center', padding: 80, fontSize: 14, fontWeight: 800, color: '#cbd5e1' }}>Mounting Workspace...</div> : (
          <div className="fade-in">
             {activeTab === 'general' && (
               <GlassCard title="Core Identity & Navigation" icon="🏢">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                     <SmartInput label="Full Academic Title" value={data.fullName || ''} onChange={e => set('fullName', e.target.value)} placeholder="e.g. Bachelor of Computer Applications" />
                     <SmartInput label="Department Code" value={data.short || ''} onChange={e => set('short', e.target.value)} placeholder="e.g. BCA" />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                     <label style={{ fontSize: 11.5, fontWeight: 800, color: '#64748b', marginBottom: 8, display: 'block' }}>FACULTY / STREAM PARENT</label>
                     <select className="glass-sel" value={data.parentStream || 'none'} onChange={e => set('parentStream', e.target.value)}>
                        {STREAMS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                     </select>
                  </div>
                  <SmartInput label="Marketing Tagline" value={data.tagline || ''} onChange={e => set('tagline', e.target.value)} placeholder="e.g. Code the Future. Innovate the World." />
                  <SmartArea label="Department Abstract (About)" value={data.about || ''} onChange={e => set('about', e.target.value)} placeholder="Enter a comprehensive overview of the department..." />
                  <div style={{ marginTop: 30, paddingTop: 30, borderTop: '1.5px solid #f1f5f9' }}>
                     <h5 style={{ fontWeight: 800, color: NAVY, marginBottom: 15, fontSize: 13 }}>📋 ACTIVITY REPORTS & DOCUMENTS</h5>
                     <PdfList reports={data.programReports || []} onUpdate={v => set('programReports', v)} color={C} />
                  </div>
               </GlassCard>
             )}

             {activeTab === 'academics' && (
               <>
                 <GlassCard title="Mission-Critical Vision" icon="🎯">
                    <SmartArea label="Strategic Vision" value={data.vision || ''} onChange={e => set('vision', e.target.value)} placeholder="Define the long-term vision for the department..." />
                    <SmartArea label="Academic Mission" value={data.mission || ''} onChange={e => set('mission', e.target.value)} placeholder="Outline the core mission and academic goals..." />
                 </GlassCard>
                 <GlassCard title="Subject Grid / Curriculum" icon="📚">
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 20 }}>Manage semesters and their respective subjects. These appear in nested study plans on the website.</div>
                    {Object.entries(data.curriculum || {}).map(([sem, subjects]) => (
                      <div key={sem} style={{ background: '#f8fafc', padding: 24, borderRadius: 24, border: '1.5px solid #f1f5f9', marginBottom: 18 }}>
                         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <div style={{ fontWeight: 900, fontSize: 15, color: NAVY, letterSpacing: '-0.3px' }}>{sem}</div>
                            <button onClick={() => { const n = {...(data.curriculum||{})}; delete n[sem]; set('curriculum', n); }} className="mini-del">✕</button>
                         </div>
                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12 }}>
                            {subjects.map((s, i) => (
                              <div key={i} style={{ display: 'flex', gap: 10 }}>
                                 <input style={{ ...INP_BASE, padding: '10px 14px', fontSize: 13 }} value={s} placeholder={`Subject ${i+1}`} onChange={e => {
                                    const n = {...(data.curriculum||{})}; n[sem][i] = e.target.value; set('curriculum', n);
                                 }} />
                                 <button onClick={() => { const n = {...(data.curriculum||{})}; n[sem] = n[sem].filter((_,j) => j !== i); set('curriculum', n); }} className="mini-del">-</button>
                              </div>
                            ))}
                            <button onClick={() => { const n = {...(data.curriculum||{})}; n[sem] = [...n[sem], '']; set('curriculum', n); }} className="add-dot-btn" style={{ padding: 10 }}>+ Add Subject</button>
                         </div>
                      </div>
                    ))}
                    <button onClick={() => { const s = window.prompt('Semester Name (e.g. Semester 1):'); if(s) set('curriculum', {...(data.curriculum||{}), [s]: []}); }} className="add-dot-btn">+ Add Semester Group</button>
                 </GlassCard>
               </>
             )}

             {activeTab === 'features' && (
               <>
                 <GlassCard title="Real-time Performance Metrics (Hero Stats)" icon="📈">
                    { (data.stats || []).map((s, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr auto', gap: 12, marginBottom: 14, alignItems: 'end' }}>
                         <SmartInput label="Icon" value={s.icon} onChange={e => { const n = [...data.stats]; n[i].icon = e.target.value; set('stats', n); }} placeholder="e.g. 🎓" />
                         <SmartInput label="Value" value={s.value} onChange={e => { const n = [...data.stats]; n[i].value = e.target.value; set('stats', n); }} placeholder="e.g. 100%" />
                         <SmartInput label="Label" value={s.label} onChange={e => { const n = [...data.stats]; n[i].label = e.target.value; set('stats', n); }} placeholder="e.g. Placements" />
                         <SmartInput label="Sub" value={s.sub || ''} onChange={e => { const n = [...data.stats]; n[i].sub = e.target.value; set('stats', n); }} placeholder="Optional info" />
                         <button onClick={() => set('stats', data.stats.filter((_,j) => j !== i))} className="mini-del" style={{ marginBottom: 18 }}>✕</button>
                      </div>
                    ))}
                    <button onClick={() => set('stats', [...(data.stats||[]), { icon: '📊', value: '', label: '' }])} className="add-dot-btn">+ Add High-Level Stat</button>
                 </GlassCard>

                 <GlassCard title="Programme Highlights" icon="💎">
                    { (data.highlights || []).map((h, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 2fr auto', gap: 12, marginBottom: 14, alignItems: 'end' }}>
                         <SmartInput label="Icon" value={h.icon} onChange={e => { const n = [...data.highlights]; n[i].icon = e.target.value; set('highlights', n); }} placeholder="⭐" />
                         <SmartInput label="Title" value={h.title} onChange={e => { const n = [...data.highlights]; n[i].title = e.target.value; set('highlights', n); }} placeholder="e.g. AICTE Approved" />
                         <SmartInput label="Detail" value={h.desc} onChange={e => { const n = [...data.highlights]; n[i].desc = e.target.value; set('highlights', n); }} placeholder="Brief description..." />
                         <button onClick={() => set('highlights', data.highlights.filter((_,j) => j !== i))} className="mini-del" style={{ marginBottom: 18 }}>✕</button>
                      </div>
                    ))}
                    <button onClick={() => set('highlights', [...(data.highlights||[]), { icon: '⭐', title: '', desc: '' }])} className="add-dot-btn">+ Add Program Highlight</button>
                 </GlassCard>

                 <GlassCard title="Infrastructure & Specialized Labs" icon="🏗️">
                    { (data.facilities || []).map((f, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 2fr auto', gap: 12, marginBottom: 14, alignItems: 'end' }}>
                         <SmartInput label="Icon" value={f.icon} onChange={e => { const n = [...data.facilities]; n[i].icon = e.target.value; set('facilities', n); }} placeholder="🖥️" />
                         <SmartInput label="Name" value={f.name} onChange={e => { const n = [...data.facilities]; n[i].name = e.target.value; set('facilities', n); }} placeholder="e.g. Advanced IT Lab" />
                         <SmartInput label="Description" value={f.desc} onChange={e => { const n = [...data.facilities]; n[i].desc = e.target.value; set('facilities', n); }} placeholder="Details about infrastructure..." />
                         <button onClick={() => set('facilities', data.facilities.filter((_,j) => j !== i))} className="mini-del" style={{ marginBottom: 18 }}>✕</button>
                      </div>
                    ))}
                    <button onClick={() => set('facilities', [...(data.facilities||[]), { icon: '🔬', name: '', desc: '' }])} className="add-dot-btn">+ Add Facility / Lab</button>
                 </GlassCard>

                 <GlassCard title="Notable Achievements" icon="🏆">
                    { (data.achievements || []).map((a, i) => (
                      <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 12, alignItems: 'center' }}>
                        <div style={{ fontWeight: 800, color: '#cbd5e1', fontSize: 13 }}>#{i+1}</div>
                        <input style={INP_BASE} value={a} placeholder="e.g. 100% University Result in 2023" onChange={e => { 
                           const n = [...data.achievements]; n[i] = e.target.value; set('achievements', n); 
                        }} />
                        <button onClick={() => set('achievements', data.achievements.filter((_,j) => j !== i))} className="mini-del">✕</button>
                      </div>
                    ))}
                    <button onClick={() => set('achievements', [...(data.achievements||[]), ''])} className="add-dot-btn">+ Add Milestone / Achievement</button>
                 </GlassCard>
               </>
             )}

             {activeTab === 'faculty' && (
               <GlassCard title="Leadership at the Helm" icon="👨‍🔬">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                     <SmartInput label="HOD Name" value={data.hod?.name || ''} onChange={e => setHod('name', e.target.value)} placeholder="Prof. Name" />
                     <SmartInput label="HOD Title" value={data.hod?.desig || ''} onChange={e => setHod('desig', e.target.value)} placeholder="e.g. Head of Department, BCA" />
                     <SmartInput label="Qualifications" value={data.hod?.qual || ''} onChange={e => setHod('qual', e.target.value)} placeholder="e.g. M.Sc, Ph.D." />
                     <SmartInput label="Direct Email" value={data.hod?.email || ''} onChange={e => setHod('email', e.target.value)} placeholder="hod@gncollege.org" />
                     <SmartInput label="Contact Phone" value={data.hod?.phone || ''} onChange={e => setHod('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div style={{ marginBottom: 24 }}>
                     <MediaPicker label="Profile Image Link / Upload" value={data.hod?.imageUrl || ''} onChange={u => setHod('imageUrl', u)} type="image" compact />
                  </div>
                  <SmartArea label="Head of Department's Message" value={data.hod?.message || ''} onChange={e => setHod('message', e.target.value)} placeholder="Welcome message to students..." />
               </GlassCard>
             )}

             {activeTab === 'finance' && (
               <GlassCard title="Financial Investment Overview" icon="💹">
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 20 }}>Categorize educational costs. These will be automatically summed up on the website.</div>
                  { (data.feeStructure || []).map((f, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 2fr auto', gap: 12, marginBottom: 14, alignItems: 'end' }}>
                       <SmartInput label="Expense Category" value={f.category} onChange={e => { const n = [...data.feeStructure]; n[i].category = e.target.value; set('feeStructure', n); }} placeholder="e.g. Tuition Fee" />
                       <SmartInput label="Amount (₹)" type="number" value={f.amount} onChange={e => { const n = [...data.feeStructure]; n[i].amount = e.target.value; set('feeStructure', n); }} placeholder="15000" />
                       <SmartInput label="Frequency / Note" value={f.note || ''} onChange={e => { const n = [...data.feeStructure]; n[i].note = e.target.value; set('feeStructure', n); }} placeholder="e.g. Per Semester" />
                       <button onClick={() => set('feeStructure', data.feeStructure.filter((_,j) => j !== i))} className="mini-del" style={{ marginBottom: 18 }}>✕</button>
                    </div>
                  ))}
                  <button onClick={() => set('feeStructure', [...(data.feeStructure||[]), { category: '', amount: '', note: '' }])} className="add-dot-btn">+ Add Fee Entry</button>
               </GlassCard>
             )}
          </div>
        )}
      </div>
    </div>
  );
}