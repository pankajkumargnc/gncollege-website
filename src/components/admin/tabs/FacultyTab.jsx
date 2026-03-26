// src/components/admin/tabs/FacultyTab.jsx
import { useState } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import MediaPicker from '../../MediaPicker';
import { T, NAVY, GOLD, BG, WHITE, useLocalDraft, Toggle, SectionSearch, BulkBar, MiniLog } from '../AdminShared';

const DEPTS       = ['Botany','Chemistry','Commerce','Computer Science','Economics','Education','English','Geography','Hindi','History','Mathematics','Philosophy','Physics','Political Science','Sociology','Zoology','Library','Physical Education','Other'];
const DESIGNATIONS = ['Professor','Associate Professor','Assistant Professor','Guest Lecturer','Lab Assistant','Librarian','Clerk','Peon','Other'];

export default function FacultyTab({ faculties, logAct, getSectionLog, softDelete, bulkDelete }) {
  const [editItem, setEditItem]   = useState(null);
  const [formData, setFormData, clearDraft] = useLocalDraft('faculty', {
    name: '', designation: 'Assistant Professor', department: 'English',
    qualification: '', photo: '', email: '', phone: '', staffType: 'Teaching', order: 0,
  });
  const [search, setSearch]     = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selected, setSelected] = useState([]);
  const [loading, setLoading]   = useState(false);

  const save = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = { ...formData, order: Number(formData.order) || 0 };
      if (editItem) {
        await updateDoc(doc(db, 'faculties', editItem.id), { ...payload, updatedAt: serverTimestamp() });
        toast.success('Staff updated!');
      } else {
        await addDoc(collection(db, 'faculties'), { ...payload, createdAt: serverTimestamp() });
        toast.success('👨‍🏫 Staff added!');
      }
      logAct(editItem ? 'update' : 'add', `Staff: ${formData.name} (${formData.department})`, 'faculties');
      setEditItem(null); clearDraft();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const depts = ['All', ...new Set((faculties||[]).map(f => f.department).filter(Boolean))];

  const filtered = (faculties || []).filter(f => {
    const matchSearch = !search || f.name?.toLowerCase().includes(search.toLowerCase()) || f.department?.toLowerCase().includes(search.toLowerCase());
    const matchType   = typeFilter === 'All' || f.staffType === typeFilter;
    const matchDept   = deptFilter === 'All' || f.department === deptFilter;
    return matchSearch && matchType && matchDept;
  });

  const teaching    = filtered.filter(f => f.staffType !== 'Non-Teaching');
  const nonTeaching = filtered.filter(f => f.staffType === 'Non-Teaching');

  const renderList = (items, label) => items.length === 0 ? null : (
    <>
      <div style={{ fontWeight: 900, color: T.t3, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, padding: '12px 0 6px' }}>{label} ({items.length})</div>
      {items.map(f => (
        <div key={f.id} className={`arow ${selected.includes(f.id) ? 'selected' : ''}`}>
          <input type="checkbox" checked={selected.includes(f.id)} onChange={() => setSelected(s => s.includes(f.id) ? s.filter(x => x !== f.id) : [...s, f.id])} style={{ accentColor: NAVY }} />
          {f.photo
            ? <img src={f.photo} alt={f.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            : <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${NAVY}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>👨‍🏫</div>
          }
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>{f.name}</div>
            <div style={{ fontSize: 12.5, color: T.t2 }}>{f.designation}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
              <span className="abadge" style={{ background: BG, color: T.t2 }}>{f.department}</span>
              {f.qualification && <span className="abadge" style={{ background: BG, color: T.t3 }}>{f.qualification}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="abtn abtn-outline abtn-sm" onClick={() => {
              setEditItem(f);
              setFormData({ name: f.name||'', designation: f.designation||'Assistant Professor', department: f.department||'English', qualification: f.qualification||'', photo: f.photo||'', email: f.email||'', phone: f.phone||'', staffType: f.staffType||'Teaching', order: f.order||0 });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>✏️</button>
            <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('faculties', f.id, f, f.name)}>🗑️</button>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="fade-up">
      <p className="asec">👨‍🏫 Faculty &amp; Staff</p>
      <p className="asub">Teaching and non-teaching staff manage karein</p>

      <div className="card-gold">
        <div className="actitle">{editItem ? '✏️ Edit Staff' : '➕ Add Staff'}</div>
        <form onSubmit={save}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
            <div>
              <label className="alabel">Full Name *</label>
              <input className="ainp" value={formData.name || ''} onChange={e => setFormData(d => ({ ...d, name: e.target.value }))} required placeholder="Dr. Ramesh Kumar" />
            </div>
            <div>
              <label className="alabel">Staff Type</label>
              <select className="ainp" value={formData.staffType || 'Teaching'} onChange={e => setFormData(d => ({ ...d, staffType: e.target.value }))}>
                <option>Teaching</option>
                <option>Non-Teaching</option>
              </select>
            </div>
            <div>
              <label className="alabel">Designation</label>
              <select className="ainp" value={formData.designation || 'Assistant Professor'} onChange={e => setFormData(d => ({ ...d, designation: e.target.value }))}>
                {DESIGNATIONS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="alabel">Department</label>
              <select className="ainp" value={formData.department || 'English'} onChange={e => setFormData(d => ({ ...d, department: e.target.value }))}>
                {DEPTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="alabel">Qualification</label>
              <input className="ainp" value={formData.qualification || ''} onChange={e => setFormData(d => ({ ...d, qualification: e.target.value }))} placeholder="M.Sc., Ph.D." />
            </div>
            <div>
              <label className="alabel">Email</label>
              <input className="ainp" type="email" value={formData.email || ''} onChange={e => setFormData(d => ({ ...d, email: e.target.value }))} placeholder="ramesh@gnc.ac.in" />
            </div>
            <div>
              <label className="alabel">Phone</label>
              <input className="ainp" value={formData.phone || ''} onChange={e => setFormData(d => ({ ...d, phone: e.target.value }))} placeholder="9876543210" />
            </div>
            <div>
              <label className="alabel">Display Order</label>
              <input className="ainp" type="number" value={formData.order || 0} onChange={e => setFormData(d => ({ ...d, order: e.target.value }))} placeholder="1" />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <MediaPicker label="Photo" value={formData.photo || ''} onChange={url => setFormData(d => ({ ...d, photo: url }))} type="image" compact />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editItem ? 'Update' : 'Add'}</button>
            {editItem && <button type="button" className="abtn abtn-outline" onClick={() => { setEditItem(null); clearDraft(); }}>Cancel</button>}
          </div>
        </form>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        {['All','Teaching','Non-Teaching'].map(t => (
          <button key={t} onClick={() => setTypeFilter(t)} className="abtn abtn-sm"
            style={{ background: typeFilter === t ? NAVY : WHITE, color: typeFilter === t ? WHITE : T.t2, border: `1.5px solid ${typeFilter === t ? NAVY : T.b1}` }}>
            {t}
          </button>
        ))}
        <select className="ainp" style={{ width: 'auto', fontSize: 12, padding: '6px 10px' }} value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
          {depts.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      <SectionSearch value={search} onChange={setSearch} placeholder="Search staff..." />
      <BulkBar count={selected.length} onDelete={() => { bulkDelete('faculties', selected); setSelected([]); }} onClear={() => setSelected([])} />

      <div className="card">
        <div className="actitle">Staff ({filtered.length})</div>
        {renderList(teaching, 'Teaching Staff')}
        {renderList(nonTeaching, 'Non-Teaching Staff')}
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '30px 0', color: T.t4 }}>Koi staff nahi mila</div>}
      </div>

      <MiniLog logs={getSectionLog('faculties')} />
    </div>
  );
}
