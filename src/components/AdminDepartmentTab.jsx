// ═══════════════════════════════════════════════════════════════════════
//  AdminDepartmentTab.jsx  v2 — 100% FREE (No Firebase Storage)
//  Images  → ImgBB (free lifetime hosting)
//  PDFs    → Google Drive public link / local public/ folder
//  Photos  → PC se upload (ImgBB) ya public/images/ ya paste URL
//
//  INTEGRATION: (same as before)
//  1. src/components/AdminDepartmentTab.jsx
//  2. AdminPanel.jsx mein: import AdminDepartmentTab from './AdminDepartmentTab'
//  3. TABS array:  { id: 'departments', icon: '🏛️', label: 'Departments', section: '' }
//  4. Render:      {tab === 'departments' && <Suspense ...><AdminDepartmentTab /></Suspense>}
// ═══════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef } from 'react';
import { doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';           // ✅ No storage needed
import MediaPicker from './MediaPicker';    // ✅ Free upload — ImgBB + local + URL

/* ─── colours ──────────────────────────────────────────────────────────── */
const NAVY = '#0f2347';
const C    = '#0ea5e9';
const GOLD = '#f4a023';

/* ─── departments ──────────────────────────────────────────────────────── */
const DEPTS = [
  { slug: 'bca',           label: 'BCA',           icon: '💻', color: '#0ea5e9' },
  { slug: 'bba',           label: 'BBA',           icon: '📊', color: '#f59e0b' },
  { slug: 'commerce',      label: 'Commerce',      icon: '🏦', color: '#10b981' },
  { slug: 'humanities',    label: 'Humanities',    icon: '📚', color: '#8b5cf6' },
  { slug: 'social-science',label: 'Social Science',icon: '🌍', color: '#ef4444' },
];

/* ─── helpers ───────────────────────────────────────────────────────────── */
const uuid = () => Math.random().toString(36).slice(2, 10);

const INP = {
  width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0',
  borderRadius: 9, fontSize: 13.5, fontFamily: 'inherit', color: '#334155',
  background: '#fff', outline: 'none', boxSizing: 'border-box',
};
const TEA = { ...INP, resize: 'vertical', minHeight: 80 };

const Input = ({ label, ...p }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 6, letterSpacing: '.3px' }}>{label}</div>}
    <input style={INP} {...p} />
  </div>
);
const Textarea = ({ label, ...p }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 6 }}>{label}</div>}
    <textarea style={TEA} {...p} />
  </div>
);
const SubHead = ({ txt }) => (
  <div style={{ fontWeight: 800, fontSize: 13.5, color: NAVY, margin: '24px 0 14px', paddingBottom: 8, borderBottom: '2px solid #f1f5f9' }}>
    {txt}
  </div>
);
const Card = ({ children, style = {} }) => (
  <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: 14, padding: 20, marginBottom: 16, ...style }}>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════
   INLINE DIALOG — window.prompt ka safe replacement
═══════════════════════════════════════════════════════════════════════ */
function InlinePrompt({ prompt, placeholder = '', onConfirm, onCancel }) {
  const [val, setVal] = useState('');
  const ref = useRef();
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div style={{ background: '#fffbeb', border: `1.5px solid ${GOLD}`, borderRadius: 12, padding: '14px 16px', marginBottom: 12 }}>
      <div style={{ fontSize: 12.5, fontWeight: 700, color: NAVY, marginBottom: 8 }}>{prompt}</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          ref={ref}
          style={{ ...INP, flex: 1, padding: '8px 12px', fontSize: 13 }}
          placeholder={placeholder}
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && val.trim()) onConfirm(val.trim()); if (e.key === 'Escape') onCancel(); }}
        />
        <button onClick={() => val.trim() && onConfirm(val.trim())}
          style={{ background: NAVY, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 700, fontSize: 12, fontFamily: 'inherit' }}>
          ✓ Add
        </button>
        <button onClick={onCancel}
          style={{ background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>
          ✕
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PDF REPORT MANAGER — 100% Free (No Firebase Storage)
   Uses MediaPicker — paste Google Drive link ya public/ folder path
═══════════════════════════════════════════════════════════════════════ */
const PdfManager = ({ reports = [], onUpdate, color = C }) => {
  const [adding,   setAdding]   = useState(false);
  const [title,    setTitle]    = useState('');
  const [year,     setYear]     = useState(new Date().getFullYear().toString());
  const [pdfUrl,   setPdfUrl]   = useState('');

  const addReport = () => {
    if (!title.trim() || !pdfUrl.trim()) return;
    onUpdate([...reports, { id: uuid(), title: title.trim(), year, pdfUrl: pdfUrl.trim() }]);
    setTitle(''); setYear(new Date().getFullYear().toString()); setPdfUrl(''); setAdding(false);
  };

  return (
    <div>
      {/* Existing reports */}
      {reports.map((rep, i) => (
        <div key={rep.id || i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', background: '#f8fafc', borderRadius: 10, marginBottom: 8, border: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: 20 }}>📄</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: NAVY }}>{rep.title}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{rep.year} — <a href={rep.pdfUrl} target="_blank" rel="noreferrer" style={{ color, textDecoration: 'none' }}>Preview ↗</a></div>
          </div>
          <button onClick={() => onUpdate(reports.filter((_, j) => j !== i))}
            style={{ background: '#fee2e2', border: 'none', color: '#ef4444', width: 28, height: 28, borderRadius: 7, cursor: 'pointer', fontSize: 12, fontWeight: 800 }}>✕
          </button>
        </div>
      ))}

      {/* Add form */}
      {adding ? (
        <div style={{ background: '#f8fafc', border: `1.5px solid ${color}33`, borderRadius: 12, padding: '16px 16px 12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px', gap: 10, marginBottom: 12 }}>
            <Input label="Report Title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Annual Activity Report 2024" />
            <Input label="Year" value={year} onChange={e => setYear(e.target.value)} placeholder="2024" />
          </div>
          <MediaPicker
            label="PDF File (Google Drive link ya public/pdfs/ path)"
            value={pdfUrl}
            onChange={setPdfUrl}
            type="pdf"
            compact={true}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button onClick={addReport} disabled={!title.trim() || !pdfUrl.trim()}
              style={{ background: !title.trim() || !pdfUrl.trim() ? '#94a3b8' : color, color: '#fff', border: 'none', borderRadius: 9, padding: '9px 20px', cursor: !title.trim() || !pdfUrl.trim() ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 13, fontFamily: 'inherit' }}>
              ✓ Add Report
            </button>
            <button onClick={() => { setAdding(false); setTitle(''); setPdfUrl(''); }}
              style={{ background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: 9, padding: '9px 16px', cursor: 'pointer', fontWeight: 700, fontSize: 13, fontFamily: 'inherit' }}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAdding(true)}
          style={{ width: '100%', padding: '9px 16px', border: '1.5px dashed #cbd5e1', background: 'transparent', color: '#64748b', borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, transition: 'all .16s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#64748b'; }}>
          + Add Report / PDF
        </button>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════ */
export default function AdminDepartmentTab() {
  const [activeDept, setActiveDept] = useState('bca');
  const [data,       setData]       = useState({});
  const [saving,     setSaving]     = useState(false);
  const [saved,      setSaved]      = useState(false);
  const [loading,    setLoading]    = useState(true);
  const savedTimerRef               = useRef(null);

  // cleanup
  useEffect(() => () => { if (savedTimerRef.current) clearTimeout(savedTimerRef.current); }, []);

  // Load from Firestore
  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, 'departments', activeDept), snap => {
      setData(snap.exists() ? snap.data() : {});
      setLoading(false);
    });
    return () => unsub();
  }, [activeDept]);

  const set    = (key, val) => setData(p => ({ ...p, [key]: val }));
  const setHod = (k, v)    => setData(p => ({ ...p, hod: { ...(p.hod || {}), [k]: v } }));

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'departments', activeDept), { ...data, updatedAt: serverTimestamp() }, { merge: true });
      setSaved(true);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      savedTimerRef.current = setTimeout(() => setSaved(false), 2500);
    } catch (e) { alert('Save failed: ' + e.message); }
    setSaving(false);
  };

  // List helpers
  const addAch  = () => set('achievements', [...(data.achievements || []), '']);
  const addFee  = () => set('feeStructure', [...(data.feeStructure || []), { category: '', amount: '', note: '' }]);
  const addHl   = () => set('highlights',   [...(data.highlights   || []), { icon: '⭐', title: '', desc: '' }]);
  const addFac  = () => set('facilities',   [...(data.facilities   || []), { icon: '🔬', name: '', desc: '' }]);
  const addStat = () => set('stats',        [...(data.stats        || []), { icon: '', value: '', label: '', sub: '' }]);

  // Inline dialog state for Sem + Subject
  const [semPrompt,  setSemPrompt]  = useState(false);
  const [subjPrompt, setSubjPrompt] = useState(null); // sem key or null

  const addSem  = (name) => { set('curriculum', { ...(data.curriculum || {}), [name]: [] }); setSemPrompt(false); };
  const addSubj = (sem, subj) => {
    const cur = { ...(data.curriculum || {}) };
    cur[sem] = [...(cur[sem] || []), subj];
    set('curriculum', cur);
    setSubjPrompt(null);
  };
  const delSubj = (sem, i) => {
    const cur = { ...(data.curriculum || {}) };
    cur[sem] = cur[sem].filter((_, j) => j !== i);
    set('curriculum', cur);
  };
  const delSem = (sem) => {
    const cur = { ...(data.curriculum || {}) };
    delete cur[sem];
    set('curriculum', cur);
  };

  const deptInfo = DEPTS.find(d => d.slug === activeDept);
  const C_dept   = deptInfo?.color || C;

  return (
    <div style={{ fontFamily: "'DM Sans','Plus Jakarta Sans',sans-serif", maxWidth: 1100 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        .adt-dtab{padding:10px 18px;border:1.5px solid #e2e8f0;border-radius:10px;background:#fff;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;transition:all .16s;color:#64748b;}
        .adt-dtab:hover{border-color:${NAVY};color:${NAVY};}
        .adt-dtab.on{color:#fff;border-color:transparent;}
        .adt-del{background:#fee2e2;border:none;color:#ef4444;width:28px;height:28px;border-radius:7px;cursor:pointer;font-size:13px;font-weight:800;flex-shrink:0;}
        .adt-add{padding:8px 16px;border:1.5px dashed #cbd5e1;background:transparent;color:#64748b;border-radius:9px;cursor:pointer;font-family:inherit;font-size:12.5px;font-weight:600;transition:all .16s;width:100%;}
        .adt-add:hover{border-color:${C};color:${C};}
      `}</style>

      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontWeight: 900, fontSize: 22, color: NAVY, margin: '0 0 4px' }}>🏛️ Department Management</h2>
        <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>
          Saara department data yahan se manage karo — website pe automatically update hoga
          <span style={{ marginLeft: 10, background: '#d1fae5', color: '#065f46', padding: '2px 9px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
            100% Free — No Storage Cost
          </span>
        </p>
      </div>

      {/* Dept selector */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
        {DEPTS.map(d => (
          <button key={d.slug} className={`adt-dtab${activeDept === d.slug ? ' on' : ''}`}
            style={activeDept === d.slug ? { background: d.color } : {}}
            onClick={() => setActiveDept(d.slug)}
          >
            {d.icon} {d.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Loading {deptInfo?.label} data...</div>
      ) : (
        <>
          {/* ─── BASIC INFO ────────────────────────────────────────────── */}
          <Card>
            <SubHead txt={`${deptInfo?.icon} Basic Information — ${deptInfo?.label}`} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <Input label="Full Department Name" value={data.fullName || ''} onChange={e => set('fullName', e.target.value)} placeholder="e.g. Bachelor of Computer Applications" />
              <Input label="Short Name / Code" value={data.short || ''} onChange={e => set('short', e.target.value)} placeholder="e.g. BCA" />
            </div>
            <Input label="Tagline (one line)" value={data.tagline || ''} onChange={e => set('tagline', e.target.value)} placeholder="e.g. Code. Create. Conquer." />
            <Textarea label="About the Department" rows={4} value={data.about || ''} onChange={e => set('about', e.target.value)} placeholder="Department ke baare mein 3-4 lines..." />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <Textarea label="Vision" rows={3} value={data.vision || ''} onChange={e => set('vision', e.target.value)} placeholder="Department vision..." />
              <Textarea label="Mission" rows={3} value={data.mission || ''} onChange={e => set('mission', e.target.value)} placeholder="Department mission..." />
            </div>
          </Card>

          {/* ─── HOD INFORMATION ────────────────────────────────────────── */}
          <Card>
            <SubHead txt="👨‍🏫 Head of Department (HOD) Info" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <Input label="HOD Full Name" value={data.hod?.name || ''} onChange={e => setHod('name', e.target.value)} placeholder="Prof. Name" />
              <Input label="Designation" value={data.hod?.desig || ''} onChange={e => setHod('desig', e.target.value)} placeholder="Head of Department, BCA" />
              <Input label="Qualification" value={data.hod?.qual || ''} onChange={e => setHod('qual', e.target.value)} placeholder="M.Sc. (CS), Ph.D." />
              <Input label="Email" type="email" value={data.hod?.email || ''} onChange={e => setHod('email', e.target.value)} placeholder="hod.bca@gncollege.org" />
              <Input label="Phone" value={data.hod?.phone || ''} onChange={e => setHod('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
            </div>

            {/* ✅ HOD Photo — MediaPicker (ImgBB upload / public/ / URL) */}
            <MediaPicker
              label="HOD Photo"
              value={data.hod?.imageUrl || ''}
              onChange={url => setHod('imageUrl', url)}
              type="image"
              compact={true}
            />

            <Textarea label="HOD Message (shown on page as quote)" rows={4} value={data.hod?.message || ''} onChange={e => setHod('message', e.target.value)} placeholder="Welcome message from HOD..." />
          </Card>

          {/* ─── STATS ──────────────────────────────────────────────────── */}
          <Card>
            <SubHead txt="📊 Key Stats (Hero card pe dikhte hain)" />
            {(data.stats || []).map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 1fr auto', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                <Input label={i === 0 ? 'Icon' : ''} value={s.icon} onChange={e => { const a = [...data.stats]; a[i] = { ...a[i], icon: e.target.value }; set('stats', a); }} placeholder="📅" />
                <Input label={i === 0 ? 'Value' : ''} value={s.value} onChange={e => { const a = [...data.stats]; a[i] = { ...a[i], value: e.target.value }; set('stats', a); }} placeholder="3 Years" />
                <Input label={i === 0 ? 'Label' : ''} value={s.label} onChange={e => { const a = [...data.stats]; a[i] = { ...a[i], label: e.target.value }; set('stats', a); }} placeholder="Duration" />
                <Input label={i === 0 ? 'Sub-text' : ''} value={s.sub || ''} onChange={e => { const a = [...data.stats]; a[i] = { ...a[i], sub: e.target.value }; set('stats', a); }} placeholder="6 Semesters" />
                <button className="adt-del" style={{ marginTop: i === 0 ? 24 : 0 }} onClick={() => set('stats', data.stats.filter((_, j) => j !== i))}>✕</button>
              </div>
            ))}
            <button className="adt-add" onClick={addStat}>+ Add Stat</button>
          </Card>

          {/* ─── HIGHLIGHTS ─────────────────────────────────────────────── */}
          <Card>
            <SubHead txt="⭐ Programme Highlights (Why Choose Us)" />
            {(data.highlights || []).map((h, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 2fr auto', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                <Input label={i === 0 ? 'Icon' : ''} value={h.icon} onChange={e => { const a = [...data.highlights]; a[i] = { ...a[i], icon: e.target.value }; set('highlights', a); }} placeholder="💻" />
                <Input label={i === 0 ? 'Title' : ''} value={h.title} onChange={e => { const a = [...data.highlights]; a[i] = { ...a[i], title: e.target.value }; set('highlights', a); }} placeholder="Modern Labs" />
                <Input label={i === 0 ? 'Description' : ''} value={h.desc} onChange={e => { const a = [...data.highlights]; a[i] = { ...a[i], desc: e.target.value }; set('highlights', a); }} placeholder="60+ high-end systems..." />
                <button className="adt-del" style={{ marginTop: i === 0 ? 24 : 0 }} onClick={() => set('highlights', data.highlights.filter((_, j) => j !== i))}>✕</button>
              </div>
            ))}
            <button className="adt-add" onClick={addHl}>+ Add Highlight</button>
          </Card>

          {/* ─── FACILITIES ─────────────────────────────────────────────── */}
          <Card>
            <SubHead txt="🔬 Labs & Facilities" />
            {(data.facilities || []).map((f, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 2fr auto', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                <Input label={i === 0 ? 'Icon' : ''} value={f.icon} onChange={e => { const a = [...data.facilities]; a[i] = { ...a[i], icon: e.target.value }; set('facilities', a); }} placeholder="🖥️" />
                <Input label={i === 0 ? 'Name' : ''} value={f.name} onChange={e => { const a = [...data.facilities]; a[i] = { ...a[i], name: e.target.value }; set('facilities', a); }} placeholder="Computer Lab" />
                <Input label={i === 0 ? 'Description' : ''} value={f.desc} onChange={e => { const a = [...data.facilities]; a[i] = { ...a[i], desc: e.target.value }; set('facilities', a); }} placeholder="60 workstations, Wi-Fi..." />
                <button className="adt-del" style={{ marginTop: i === 0 ? 24 : 0 }} onClick={() => set('facilities', data.facilities.filter((_, j) => j !== i))}>✕</button>
              </div>
            ))}
            <button className="adt-add" onClick={addFac}>+ Add Facility</button>
          </Card>

          {/* ─── CURRICULUM ─────────────────────────────────────────────── */}
          <Card>
            <SubHead txt="📖 Curriculum (Semester-wise)" />
            {semPrompt && (
              <InlinePrompt
                prompt="Semester ka naam likhein:"
                placeholder="Semester I"
                onConfirm={addSem}
                onCancel={() => setSemPrompt(false)}
              />
            )}
            {Object.entries(data.curriculum || {}).map(([sem, subjects]) => (
              <div key={sem} style={{ marginBottom: 20, background: '#f8fafc', borderRadius: 12, padding: '14px 16px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ fontWeight: 800, color: NAVY, fontSize: 13.5 }}>{sem}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setSubjPrompt(sem)}
                      style={{ background: C_dept, border: 'none', color: '#fff', padding: '4px 12px', borderRadius: 7, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                      + Subject
                    </button>
                    <button onClick={() => delSem(sem)}
                      style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '4px 10px', borderRadius: 7, cursor: 'pointer', fontSize: 12 }}>
                      Delete Sem
                    </button>
                  </div>
                </div>
                {subjPrompt === sem && (
                  <div style={{ marginBottom: 10 }}>
                    <InlinePrompt
                      prompt={`${sem} mein subject add karein:`}
                      placeholder="e.g. Data Structures"
                      onConfirm={subj => addSubj(sem, subj)}
                      onCancel={() => setSubjPrompt(null)}
                    />
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 8 }}>
                  {(subjects || []).map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input style={{ ...INP, flex: 1, padding: '7px 12px', fontSize: 13 }} value={s}
                        onChange={e => {
                          const c = { ...(data.curriculum || {}) };
                          c[sem] = c[sem].map((x, j) => j === i ? e.target.value : x);
                          set('curriculum', c);
                        }} />
                      <button className="adt-del" style={{ width: 26, height: 26 }} onClick={() => delSubj(sem, i)}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button className="adt-add" onClick={() => setSemPrompt(true)}>+ Add Semester</button>
          </Card>

          {/* ─── FEE STRUCTURE ──────────────────────────────────────────── */}
          <Card>
            <SubHead txt="💰 Fee Structure" />
            {(data.feeStructure || []).map((f, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr auto', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                <Input label={i === 0 ? 'Fee Category' : ''} value={f.category} onChange={e => { const a = [...data.feeStructure]; a[i] = { ...a[i], category: e.target.value }; set('feeStructure', a); }} placeholder="Tuition Fee" />
                <Input label={i === 0 ? 'Amount (₹)' : ''} type="number" value={f.amount} onChange={e => { const a = [...data.feeStructure]; a[i] = { ...a[i], amount: e.target.value }; set('feeStructure', a); }} placeholder="15000" />
                <Input label={i === 0 ? 'Note / Remark' : ''} value={f.note || ''} onChange={e => { const a = [...data.feeStructure]; a[i] = { ...a[i], note: e.target.value }; set('feeStructure', a); }} placeholder="Per semester" />
                <button className="adt-del" style={{ marginTop: i === 0 ? 24 : 0 }} onClick={() => set('feeStructure', data.feeStructure.filter((_, j) => j !== i))}>✕</button>
              </div>
            ))}
            <button className="adt-add" onClick={addFee}>+ Add Fee Row</button>
          </Card>

          {/* ─── PROGRAMME / ACTIVITY REPORTS (PDF) ────────────────────── */}
          <Card>
            <SubHead txt="📋 Programme & Activity Reports (PDF)" />
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 9, padding: '10px 14px', marginBottom: 16, fontSize: 12.5, color: '#166534' }}>
              ✅ <strong>100% FREE</strong> — Google Drive ka public link paste karo ya <code style={{ background: '#dcfce7', padding: '1px 5px', borderRadius: 3 }}>public/pdfs/</code> mein PDF rakh ke path use karo. Firebase Storage ki zaroorat nahi!
            </div>
            <PdfManager
              reports={data.programReports || []}
              onUpdate={v => set('programReports', v)}
              color={C_dept}
            />
          </Card>

          {/* ─── ACHIEVEMENTS ───────────────────────────────────────────── */}
          <Card>
            <SubHead txt="🏆 Achievements & Milestones" />
            {(data.achievements || []).map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                <span style={{ color: '#94a3b8', fontSize: 14, flexShrink: 0 }}>#{i + 1}</span>
                <input style={{ ...INP, flex: 1 }} value={a}
                  onChange={e => { const arr = [...data.achievements]; arr[i] = e.target.value; set('achievements', arr); }}
                  placeholder="e.g. 100+ students placed in IT companies since 2020" />
                <button className="adt-del" onClick={() => set('achievements', data.achievements.filter((_, j) => j !== i))}>✕</button>
              </div>
            ))}
            <button className="adt-add" onClick={addAch}>+ Add Achievement</button>
          </Card>

          {/* ─── SAVE BUTTON ────────────────────────────────────────────── */}
          <div style={{ position: 'sticky', bottom: 0, background: '#f8fafc', padding: '16px 0', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 16, zIndex: 10 }}>
            <button onClick={save} disabled={saving}
              style={{
                background: saving ? '#94a3b8' : `linear-gradient(135deg,${NAVY},#1a3a7c)`,
                color: '#fff', border: 'none', padding: '12px 32px',
                borderRadius: 11, cursor: saving ? 'not-allowed' : 'pointer',
                fontWeight: 800, fontSize: 14, fontFamily: 'inherit',
                boxShadow: saving ? 'none' : '0 4px 16px rgba(15,35,71,.25)',
              }}>
              {saving ? '⏳ Saving...' : `💾 Save ${deptInfo?.label} Data`}
            </button>
            {saved && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#d1fae5', color: '#065f46', padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
                ✅ Saved! Website pe live ho gaya.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}