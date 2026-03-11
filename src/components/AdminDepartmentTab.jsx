// ═══════════════════════════════════════════════════════════════════════
//  AdminDepartmentTab.jsx
//  AdminPanel.jsx ke andar DEPARTMENTS tab ka complete code
// ═══════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef } from 'react';
import { doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

/* ─── colour constants ─────────────────────────────────────────────────── */
const NAVY = '#0f2347';
const C    = '#0ea5e9';
const IMGBB_API_KEY = '6391ea11ec7aa4e6f3477f373cdd3592'; // Auto-upload API

/* ─── all departments ──────────────────────────────────────────────────── */
const DEPTS = [
  { slug: 'bca',          label: 'BCA',          icon: '💻', color: '#0ea5e9' },
  { slug: 'bba',          label: 'BBA',          icon: '📊', color: '#f59e0b' },
  { slug: 'commerce',     label: 'Commerce',     icon: '🏦', color: '#10b981' },
  { slug: 'humanities',   label: 'Humanities',   icon: '📚', color: '#8b5cf6' },
  { slug: 'social-science', label: 'Social Science', icon: '🌍', color: '#ef4444' },
];

/* ─── helpers ───────────────────────────────────────────────────────────── */
const uuid = () => Math.random().toString(36).slice(2, 10);
const btn  = (label, onClick, col = NAVY, outline = false) => (
  <button onClick={onClick} style={{
    padding: '9px 20px', border: outline ? `1.5px solid ${col}` : 'none',
    background: outline ? 'transparent' : col, color: outline ? col : '#fff',
    borderRadius: 9, cursor: 'pointer', fontWeight: 700, fontSize: 13,
    fontFamily: 'inherit', transition: 'opacity .15s',
  }}
    onMouseEnter={e => e.currentTarget.style.opacity = '.82'}
    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
  >{label}</button>
);

/* ─── input styles ─────────────────────────────────────────────────────── */
const INP = {
  width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0',
  borderRadius: 9, fontSize: 13.5, fontFamily: 'inherit', color: '#334155',
  background: '#fff', outline: 'none', boxSizing: 'border-box',
};
const TEA = { ...INP, resize: 'vertical', minHeight: 80 };

const Input  = ({ label, ...p }) => (
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
   PDF UPLOAD component
═══════════════════════════════════════════════════════════════════════ */
const PdfUploader = ({ slug, reports = [], onUpdate }) => {
  const [title,    setTitle]   = useState('');
  const [year,     setYear]    = useState(new Date().getFullYear().toString());
  const [file,     setFile]    = useState(null);
  const [prog,     setProg]    = useState(0);
  const [uploading, setUpl]    = useState(false);
  const fileRef = useRef();

  const upload = async () => {
    if (!file && !title) return;
    setUpl(true);
    try {
      if (file) {
        const path = `departments/${slug}/reports/${Date.now()}_${file.name}`;
        const sRef = storageRef(storage, path);
        const task = uploadBytesResumable(sRef, file);
        task.on('state_changed', s => setProg(Math.round(s.bytesTransferred / s.totalBytes * 100)));
        await task;
        const url = await getDownloadURL(sRef);
        onUpdate([...reports, { id: uuid(), title, year, pdfUrl: url }]);
      }
      setTitle(''); setYear(new Date().getFullYear().toString()); setFile(null); setProg(0);
      if (fileRef.current) fileRef.current.value = '';
    } catch (e) { alert('Upload failed: ' + e.message); }
    setUpl(false);
  };

  const addUrl = (url) => {
    if (!title || !url) return;
    onUpdate([...reports, { id: uuid(), title, year, pdfUrl: url }]);
    setTitle(''); setYear(new Date().getFullYear().toString());
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
        <input style={INP} placeholder="Report title (e.g. Annual Activity Report 2024)" value={title} onChange={e => setTitle(e.target.value)} />
        <input style={{ ...INP, width: 90 }} placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
        <input style={INP} type="file" accept=".pdf" ref={fileRef} onChange={e => setFile(e.target.files[0])} />
      </div>
      {uploading && (
        <div style={{ background: '#f0f9ff', borderRadius: 8, padding: '8px 12px', marginBottom: 10, fontSize: 13 }}>
          Uploading... {prog}%
          <div style={{ height: 4, borderRadius: 4, background: '#e0f2fe', marginTop: 6 }}>
            <div style={{ height: '100%', borderRadius: 4, background: C, width: `${prog}%`, transition: 'width .3s' }} />
          </div>
        </div>
      )}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {btn('📤 Upload PDF', upload, C)}
        {btn('+ Add via URL', () => {
          const url = window.prompt('PDF URL paste karo (Google Drive / ImgBB link):');
          if (url) addUrl(url.trim());
        }, '#64748b', true)}
      </div>

      {reports.map((rep, i) => (
        <div key={rep.id || i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', background: '#f8fafc', borderRadius: 10, marginBottom: 8, border: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: 20 }}>📄</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: NAVY }}>{rep.title}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{rep.year}</div>
          </div>
          <a href={rep.pdfUrl} target="_blank" rel="noreferrer" style={{ color: C, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>Preview</a>
          <button onClick={() => onUpdate(reports.filter((_, j) => j !== i))}
            style={{ background: '#fee2e2', border: 'none', color: '#ef4444', width: 28, height: 28, borderRadius: 7, cursor: 'pointer', fontSize: 12, fontWeight: 800 }}>✕</button>
        </div>
      ))}
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

  // Auto-upload states for HOD Photo
  const [hodUp, setHodUp] = useState(false);
  const [hodProg, setHodProg] = useState(0);

  /* Load from Firestore */
  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, 'departments', activeDept), snap => {
      setData(snap.exists() ? snap.data() : {});
      setLoading(false);
    });
    return () => unsub();
  }, [activeDept]);

  const set = (key, val) => setData(p => ({ ...p, [key]: val }));
  const setHod = (k, v) => setData(p => ({ ...p, hod: { ...(p.hod || {}), [k]: v } }));

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'departments', activeDept), { ...data, updatedAt: serverTimestamp() }, { merge: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) { alert('Save failed: ' + e.message); }
    setSaving(false);
  };

  const addAch  = () => set('achievements',  [...(data.achievements  || []), '']);
  const addFee  = () => set('feeStructure',  [...(data.feeStructure  || []), { category: '', amount: '', note: '' }]);
  const addHl   = () => set('highlights',    [...(data.highlights    || []), { icon: '⭐', title: '', desc: '' }]);
  const addFac  = () => set('facilities',    [...(data.facilities    || []), { icon: '🔬', name: '', desc: '' }]);
  const addStat = () => set('stats',         [...(data.stats         || []), { icon: '', value: '', label: '', sub: '' }]);

  const addSem  = () => {
    const key = window.prompt('Semester name (e.g. Semester I):');
    if (!key) return;
    set('curriculum', { ...(data.curriculum || {}), [key]: [] });
  };
  const addSubj = (sem) => {
    const subj = window.prompt(`Subject name for ${sem}:`);
    if (!subj) return;
    const cur = { ...(data.curriculum || {}) };
    cur[sem] = [...(cur[sem] || []), subj];
    set('curriculum', cur);
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

  // 🔥 FINAL FIX: User ki original API key ke sath auto-upload
  const handleHodPhotoUpload = async (file) => {
    setHodUp(true); 
    setHodProg(30); // Uploading shuru
    
    // 👇 Aapki di hui original API Key yahan set ho gayi hai
    const MY_IMGBB_KEY = 'ddf5f47dac2ed473aab5b70d08ae5a7a'; 

    const formData = new FormData(); 
    formData.append('image', file);
    
    try {
      setHodProg(60);
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${MY_IMGBB_KEY}`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setHodProg(100);
        setHod('imageUrl', data.data.url); // Photo URL form mein set ho jayega
      } else {
        alert('Upload Failed Reason: ' + data.error.message);
      }
    } catch (error) {
      alert('Network Error! Kripya apna internet connection check karein.');
    } finally {
      setTimeout(() => setHodUp(false), 1000);
    }
  };
  const deptInfo = DEPTS.find(d => d.slug === activeDept);

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
        <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Department ka sara data yahan se manage karo — website pe automatically update hoga</p>
      </div>

      {/* Dept selector tabs */}
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
          {/* ─── BASIC INFO ─────────────────────────────────────────── */}
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

          {/* ─── HOD INFORMATION ─────────────────────────────────────── */}
          <Card>
            <SubHead txt="👨‍🏫 Head of Department (HOD) Info" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <Input label="HOD Full Name" value={data.hod?.name || ''} onChange={e => setHod('name', e.target.value)} placeholder="Prof. Name" />
              <Input label="Designation" value={data.hod?.desig || ''} onChange={e => setHod('desig', e.target.value)} placeholder="Head of Department, BCA" />
              <Input label="Qualification" value={data.hod?.qual || ''} onChange={e => setHod('qual', e.target.value)} placeholder="M.Sc. (CS), Ph.D." />
              <Input label="Email" type="email" value={data.hod?.email || ''} onChange={e => setHod('email', e.target.value)} placeholder="hod.bca@gncollege.org" />
              <Input label="Phone" value={data.hod?.phone || ''} onChange={e => setHod('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
            </div>

            {/* 🔥 NEW: Smart HOD Photo Input + Auto Upload */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 6, letterSpacing: '.3px' }}>
                  HOD Photo URL (Google Drive links auto-convert)
                </div>
                <input style={INP} value={data.hod?.imageUrl || ''} onChange={e => {
                  let val = e.target.value;
                  // Magic Regex: Automatically converts Google Drive share link to image link
                  const match = val.match(/drive\.google\.com\/file\/d\/([^\/]+)/);
                  if (match && match[1]) {
                    val = `https://drive.google.com/uc?export=view&id=${match[1]}`;
                  }
                  setHod('imageUrl', val);
                }} placeholder="Paste Drive link or upload from PC 👉" />
              </div>
              
              <div style={{ flexShrink: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 6 }}>.</div>
                <label className="adt-dtab" style={{ display: 'inline-flex', padding: '10px 16px', background: '#f8fafc', margin: 0, textAlign: 'center', height: '40px', alignItems: 'center' }}>
                  {hodUp ? `⏳ ${hodProg}%` : '📁 Upload Photo'}
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files[0] && handleHodPhotoUpload(e.target.files[0])} />
                </label>
              </div>
            </div>
            
            {data.hod?.imageUrl && (
              <div style={{ marginBottom: 16 }}>
                <img src={data.hod.imageUrl} alt="HOD Preview" style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', border: '2px solid #e2e8f0' }} />
              </div>
            )}

            <Textarea label="HOD Message (shown on page as quote)" rows={4} value={data.hod?.message || ''} onChange={e => setHod('message', e.target.value)} placeholder="Welcome message from HOD..." />
          </Card>

          {/* ─── STATS / KEY NUMBERS ──────────────────────────────────── */}
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

          {/* ─── HIGHLIGHTS ───────────────────────────────────────────── */}
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

          {/* ─── FACILITIES ───────────────────────────────────────────── */}
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

          {/* ─── CURRICULUM ───────────────────────────────────────────── */}
          <Card>
            <SubHead txt="📖 Curriculum (Semester-wise)" />
            {Object.entries(data.curriculum || {}).map(([sem, subjects]) => (
              <div key={sem} style={{ marginBottom: 20, background: '#f8fafc', borderRadius: 12, padding: '14px 16px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ fontWeight: 800, color: NAVY, fontSize: 13.5 }}>{sem}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => addSubj(sem)} style={{ background: C, border: 'none', color: '#fff', padding: '4px 12px', borderRadius: 7, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>+ Subject</button>
                    <button onClick={() => delSem(sem)} style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '4px 10px', borderRadius: 7, cursor: 'pointer', fontSize: 12 }}>Delete Sem</button>
                  </div>
                </div>
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
            <button className="adt-add" onClick={addSem}>+ Add Semester</button>
          </Card>

          {/* ─── FEE STRUCTURE ────────────────────────────────────────── */}
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

          {/* ─── PROGRAMME / ACTIVITY REPORTS ─────────────────────────── */}
          <Card>
            <SubHead txt="📋 Programme & Activity Reports (PDF)" />
            <p style={{ fontSize: 12.5, color: '#94a3b8', margin: '0 0 16px' }}>
              PDF file upload karo (Firebase Storage) ya Google Drive link paste karo
            </p>
            <PdfUploader
              slug={activeDept}
              reports={data.programReports || []}
              onUpdate={v => set('programReports', v)}
            />
          </Card>

          {/* ─── ACHIEVEMENTS ─────────────────────────────────────────── */}
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

          {/* ─── SAVE BUTTON ──────────────────────────────────────────── */}
          <div style={{ position: 'sticky', bottom: 0, background: '#f8fafc', padding: '16px 0', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={save}
              disabled={saving}
              style={{
                background: saving ? '#94a3b8' : `linear-gradient(135deg,${NAVY},#1a3a7c)`,
                color: '#fff', border: 'none', padding: '12px 32px',
                borderRadius: 11, cursor: saving ? 'not-allowed' : 'pointer',
                fontWeight: 800, fontSize: 14, fontFamily: 'inherit',
                boxShadow: saving ? 'none' : '0 4px 16px rgba(15,35,71,.25)',
              }}
            >
              {saving ? '⏳ Saving...' : `💾 Save ${deptInfo?.label} Data`}
            </button>
            {saved && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#d1fae5', color: '#065f46', padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
                ✅ Saved successfully! Page ab update ho gaya hoga.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}