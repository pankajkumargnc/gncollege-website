// src/components/admin/tabs/PlacementsTab.jsx
import { useState } from 'react';
import { db } from '../../../firebase'; // ✅ FIXED: Teen folder peechhe
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import MediaPicker from '../../MediaPicker';
import { T, NAVY, GOLD, BG, useLocalDraft, SectionSearch, BulkBar, MiniLog } from '../AdminShared';
import { resolveUrl } from '../../../utils/resolver';
import { exportToExcel } from '../../../utils/excelExport';

const DEPTS = ['B.A.', 'B.Sc.', 'B.Com.', 'M.A.', 'M.Sc.', 'M.Com.', 'B.Ed.', 'Other'];

export default function PlacementsTab({ placements, logAct, getSectionLog, softDelete, bulkDelete }) {
  const [editItem, setEditItem]   = useState(null);
  const [formData, setFormData, clearDraft] = useLocalDraft('placement', {
    name: '', company: '', role: '', department: 'B.A.', batch: '', package: '', photo: '', testimonial: '',
  });
  const [search, setSearch]     = useState('');
  const [selected, setSelected] = useState([]);
  const [loading, setLoading]   = useState(false);

  const save = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (editItem) {
        await updateDoc(doc(db, 'placements', editItem.id), { ...formData, updatedAt: serverTimestamp() });
        toast.success('Alumni updated!');
      } else {
        await addDoc(collection(db, 'placements'), { ...formData, createdAt: serverTimestamp() });
        toast.success('🎓 Alumni added!');
      }
      logAct(editItem ? 'update' : 'add', `Alumni: ${formData.name} at ${formData.company}`, 'placements');
      setEditItem(null); clearDraft();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const filtered = (placements || []).filter(p =>
    !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.company?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-up">
      <p style={{ margin: 0, fontWeight: 900, color: NAVY, fontSize: 'clamp(20px, 5vw, 24px)', letterSpacing: '-0.5px' }}>🎓 Alumni Wall</p>
      <p style={{ margin: '4px 0 20px', color: T.t3, fontSize: 13, fontWeight: 600 }}>Manage placed students and alumni success stories.</p>

      <div className="card-gold">
        <div className="actitle">{editItem ? '✏️ Edit Alumni' : '➕ Add Alumni'}</div>
        <form onSubmit={save}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
            <div>
              <label className="alabel">Student Name *</label>
              <input className="ainp" value={formData.name || ''} onChange={e => setFormData(d => ({ ...d, name: e.target.value }))} required placeholder="Rahul Kumar" />
            </div>
            <div>
              <label className="alabel">Company</label>
              <input className="ainp" value={formData.company || ''} onChange={e => setFormData(d => ({ ...d, company: e.target.value }))} placeholder="TCS / Wipro / Govt. Service" />
            </div>
            <div>
              <label className="alabel">Role / Designation</label>
              <input className="ainp" value={formData.role || ''} onChange={e => setFormData(d => ({ ...d, role: e.target.value }))} placeholder="Software Engineer" />
            </div>
            <div>
              <label className="alabel">Department</label>
              <select className="ainp" value={formData.department || 'B.A.'} onChange={e => setFormData(d => ({ ...d, department: e.target.value }))}>
                {DEPTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="alabel">Batch / Passing Year</label>
              <input className="ainp" value={formData.batch || ''} onChange={e => setFormData(d => ({ ...d, batch: e.target.value }))} placeholder="2023" />
            </div>
            <div>
              <label className="alabel">Package (Optional)</label>
              <input className="ainp" value={formData.package || ''} onChange={e => setFormData(d => ({ ...d, package: e.target.value }))} placeholder="4.5 LPA" />
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label className="alabel">Testimonial / Quote</label>
            <textarea className="ainp" rows={2} value={formData.testimonial || ''} onChange={e => setFormData(d => ({ ...d, testimonial: e.target.value }))} placeholder="E.g. GNC changed my life..." />
          </div>

          <div style={{ marginBottom: 20 }}>
            <MediaPicker 
              label="Student Photo" 
              value={formData.photo || ''} 
              onChange={url => setFormData(d => ({ ...d, photo: url }))} 
              type="image" 
              driveFolderId={import.meta.env.VITE_DRIVE_IMAGES_FOLDER}
              compact 
            />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editItem ? 'Update' : 'Add'}</button>
            {editItem && <button type="button" className="abtn abtn-outline" onClick={() => { setEditItem(null); clearDraft(); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <SectionSearch value={search} onChange={setSearch} placeholder="Search by name or company..." />
      <BulkBar count={selected.length} onDelete={() => { bulkDelete('placements', selected); setSelected([]); }} onClear={() => setSelected([])} />

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div className="actitle" style={{ margin: 0 }}>Alumni ({filtered.length})</div>
          <button 
            type="button" 
            className="abtn abtn-outline abtn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 700 }}
            onClick={() => exportToExcel(
              filtered.map(p => ({
                Name: p.name || '',
                Company: p.company || '',
                Role: p.role || '',
                Department: p.department || '',
                Batch: p.batch || '',
                Package: p.package || '',
                Testimonial: p.testimonial || ''
              })),
              'GNC_Alumni_Placements'
            )}
          >
            📊 Export Excel
          </button>
        </div>
        {filtered.map(p => (
          <div key={p.id} className={`arow ${selected.includes(p.id) ? 'selected' : ''}`}>
            <input type="checkbox" checked={selected.includes(p.id)} onChange={() => setSelected(s => s.includes(p.id) ? s.filter(x => x !== p.id) : [...s, p.id])} style={{ accentColor: NAVY }} />
            {p.photo
              ? <img 
                  src={resolveUrl(p.photo)} 
                  alt={p.name} 
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }}
                  style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} 
                />
              : null
            }
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${NAVY}15`, display: p.photo ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🎓</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>{p.name}</div>
              <div style={{ fontSize: 13, color: T.t2 }}>{p.role}{p.company ? ` @ ${p.company}` : ''}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                <span className="abadge" style={{ background: BG, color: T.t2 }}>{p.department}</span>
                {p.batch && <span className="abadge" style={{ background: BG, color: T.t3 }}>Batch {p.batch}</span>}
                {p.package && <span className="abadge" style={{ background: '#dcfce7', color: T.green }}>💰 {p.package}</span>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="abtn abtn-outline abtn-sm" onClick={() => {
                setEditItem(p);
                setFormData({ name: p.name||'', company: p.company||'', role: p.role||'', department: p.department||'B.A.', batch: p.batch||'', package: p.package||'', photo: p.photo||'', testimonial: p.testimonial||'' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>✏️</button>
              <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('placements', p.id, p, p.name)} aria-label="Delete placement">🗑️</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '30px 0', color: T.t4 }}>No alumni found</div>}
      </div>

      <MiniLog logs={getSectionLog('placements')} />
    </div>
  );
}
