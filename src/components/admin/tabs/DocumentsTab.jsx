// src/components/admin/tabs/DocumentsTab.jsx
import { useState } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import MediaPicker from '../../MediaPicker';
import { T, NAVY, GOLD, BG, useLocalDraft, SectionSearch, BulkBar, MiniLog } from '../AdminShared';

const CATEGORIES = ['Academic', 'Admission', 'Result', 'Syllabus', 'NAAC', 'Government', 'Committee', 'Other'];

export default function DocumentsTab({ pdfReports, logAct, getSectionLog, softDelete, bulkDelete }) {
  const [editItem, setEditItem]   = useState(null);
  const [formData, setFormData, clearDraft] = useLocalDraft('document', {
    title: '', category: 'Academic', year: new Date().getFullYear().toString(), pdfUrl: '', isPublic: true,
  });
  const [search, setSearch]     = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [selected, setSelected] = useState([]);
  const [loading, setLoading]   = useState(false);

  const save = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (!formData.pdfUrl) { toast.error('PDF URL required!'); setLoading(false); return; }
      if (editItem) {
        await updateDoc(doc(db, 'pdfReports', editItem.id), { ...formData, updatedAt: serverTimestamp() });
        toast.success('Document updated!');
      } else {
        await addDoc(collection(db, 'pdfReports'), { ...formData, createdAt: serverTimestamp() });
        toast.success('📁 Document uploaded!');
      }
      logAct(editItem ? 'update' : 'add', `Doc: ${formData.title}`, 'pdfReports');
      setEditItem(null); clearDraft();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const cats = ['All', ...CATEGORIES];
  const filtered = (pdfReports || []).filter(d => {
    const matchSearch = !search || d.title?.toLowerCase().includes(search.toLowerCase());
    const matchCat    = catFilter === 'All' || d.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="fade-up">
      <p className="asec">📁 Documents Archive</p>
      <p className="asub">College PDFs, reports aur official documents manage karein</p>

      <div className="card-gold">
        <div className="actitle">{editItem ? '✏️ Edit Document' : '➕ Upload Document'}</div>
        <form onSubmit={save}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
            <div style={{ gridColumn: '1/-1' }}>
              <label className="alabel">Document Title *</label>
              <input className="ainp" value={formData.title || ''} onChange={e => setFormData(d => ({ ...d, title: e.target.value }))} required placeholder="NAAC Self Study Report 2024-25" />
            </div>
            <div>
              <label className="alabel">Category</label>
              <select className="ainp" value={formData.category || 'Academic'} onChange={e => setFormData(d => ({ ...d, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="alabel">Year</label>
              <input className="ainp" value={formData.year || ''} onChange={e => setFormData(d => ({ ...d, year: e.target.value }))} placeholder="2024-25" />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <MediaPicker label="PDF File *" value={formData.pdfUrl || ''} onChange={url => setFormData(d => ({ ...d, pdfUrl: url }))} type="pdf" />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editItem ? 'Update' : 'Upload'}</button>
            {editItem && <button type="button" className="abtn abtn-outline" onClick={() => { setEditItem(null); clearDraft(); }}>Cancel</button>}
          </div>
        </form>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className="abtn abtn-sm"
            style={{ background: catFilter === c ? NAVY : 'white', color: catFilter === c ? 'white' : T.t2, border: `1.5px solid ${catFilter === c ? NAVY : T.b1}` }}>
            {c}
          </button>
        ))}
      </div>

      <SectionSearch value={search} onChange={setSearch} placeholder="Search documents..." />
      <BulkBar count={selected.length} onDelete={() => { bulkDelete('pdfReports', selected); setSelected([]); }} onClear={() => setSelected([])} />

      <div className="card">
        <div className="actitle">Documents ({filtered.length})</div>
        {filtered.map(d => (
          <div key={d.id} className={`arow ${selected.includes(d.id) ? 'selected' : ''}`}>
            <input type="checkbox" checked={selected.includes(d.id)} onChange={() => setSelected(s => s.includes(d.id) ? s.filter(x => x !== d.id) : [...s, d.id])} style={{ accentColor: NAVY }} />
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${NAVY}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>📄</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: NAVY, fontSize: 14 }}>{d.title}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                <span className="abadge" style={{ background: BG, color: T.t2 }}>{d.category}</span>
                {d.year && <span className="abadge" style={{ background: BG, color: T.t3 }}>{d.year}</span>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {d.pdfUrl && <a href={d.pdfUrl} target="_blank" rel="noreferrer" className="abtn abtn-outline abtn-sm" style={{ textDecoration: 'none' }}>👁️ View</a>}
              <button className="abtn abtn-outline abtn-sm" onClick={() => {
                setEditItem(d);
                setFormData({ title: d.title || '', category: d.category || 'Academic', year: d.year || '', pdfUrl: d.pdfUrl || '', isPublic: d.isPublic !== false });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>✏️</button>
              <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('pdfReports', d.id, d, d.title)}>🗑️</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '30px 0', color: T.t4 }}>Koi document nahi mila</div>}
      </div>

      <MiniLog logs={getSectionLog('pdfReports')} />
    </div>
  );
}
