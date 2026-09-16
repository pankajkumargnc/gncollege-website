// src/components/admin/tabs/FacultyTab.jsx
import { useState } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { Users, User, Edit2, Trash2, Plus, Download } from 'lucide-react';
import MediaPicker from '../../MediaPicker';
import { T, NAVY, GOLD, BG, WHITE, useLocalDraft, Toggle, SectionSearch, BulkBar, MiniLog } from '../AdminShared';
import { clearCache } from '../../../utils/cachedFetch';
import { resolveUrl } from '../../../utils/resolver';
import { exportToExcel } from '../../../utils/excelExport';

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
        toast.success('Staff updated!'); clearCache('faculties');
      } else {
        await addDoc(collection(db, 'faculties'), { ...payload, createdAt: serverTimestamp() });
        toast.success('Staff profile added!'); clearCache('faculties');
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
            ? <img 
                src={resolveUrl(f.photo)} 
                alt={f.name} 
                referrerPolicy="no-referrer"
                onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }}
                style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} 
              />
            : null
          }
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${NAVY}15`, display: f.photo ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <User size={22} color={NAVY} />
          </div>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <div style={{ fontWeight: 800, color: NAVY, fontSize: 'clamp(13px, 4vw, 14px)' }}>{f.name}</div>
            <div style={{ fontSize: 12, color: T.t2 }}>{f.designation}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
              <span className="abadge" style={{ background: BG, color: T.t2, fontSize: 10 }}>{f.department}</span>
              {f.qualification && <span className="abadge" style={{ background: BG, color: T.t3, fontSize: 10 }}>{f.qualification}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
            <button className="abtn abtn-outline abtn-sm" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {
              setEditItem(f);
              setFormData({ name: f.name||'', designation: f.designation||'Assistant Professor', department: f.department||'English', qualification: f.qualification||'', photo: f.photo||'', email: f.email||'', phone: f.phone||'', staffType: f.staffType||'Teaching', order: f.order||0 });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} aria-label="Edit staff member"><Edit2 size={13} /></button>
            <button className="abtn abtn-red abtn-sm" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => { softDelete('faculties', f.id, f, f.name); clearCache('faculties'); }} aria-label="Delete staff member"><Trash2 size={13} /></button>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="fade-up">
      <h2 style={{ margin: 0, fontWeight: 900, color: NAVY, fontSize: 'clamp(20px, 5vw, 24px)', letterSpacing: '-0.5px' }}>Faculty &amp; Staff Directory</h2>
      <p style={{ margin: '4px 0 20px', color: T.t3, fontSize: 13, fontWeight: 600 }}>Manage teaching and non-teaching staff profiles.</p>

      <div className="card-gold">
        <div className="actitle" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {editItem ? <Edit2 size={16} /> : <Plus size={16} />}
          <span>{editItem ? 'Edit Staff Member' : 'Add Staff Member'}</span>
        </div>
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
            <MediaPicker 
              label="Photo" 
              value={formData.photo || ''} 
              onChange={url => setFormData(d => ({ ...d, photo: url }))} 
              type="image" 
              driveFolderId={import.meta.env.VITE_DRIVE_IMAGES_FOLDER}
              compact 
            />
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="submit" className="abtn abtn-gold" style={{ flex: '1 1 120px', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Saving…' : editItem ? 'Update Staff Member' : 'Add Staff Member'}
            </button>
            {editItem && <button type="button" className="abtn abtn-outline" style={{ flex: '1 1 120px', justifyContent: 'center' }} onClick={() => { setEditItem(null); clearDraft(); }}>Cancel</button>}
          </div>
        </form>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['All','Teaching','Non-Teaching'].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} className="abtn abtn-xs"
              style={{ background: typeFilter === t ? NAVY : WHITE, color: typeFilter === t ? WHITE : T.t2, border: `1.5px solid ${typeFilter === t ? NAVY : T.b1}`, height: 32 }}>
              {t}
            </button>
          ))}
        </div>
        <select className="ainp" style={{ width: 'auto', minWidth: 150, fontSize: 12, padding: '4px 10px', height: 32 }} value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
          {depts.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      <SectionSearch value={search} onChange={setSearch} placeholder="Search staff..." />
      <BulkBar count={selected.length} onDelete={() => { bulkDelete('faculties', selected); setSelected([]); clearCache('faculties'); }} onClear={() => setSelected([])} />

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div className="actitle" style={{ margin: 0 }}>Staff ({filtered.length})</div>
          <button 
            type="button" 
            className="abtn abtn-outline abtn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 700 }}
            onClick={() => exportToExcel(
              filtered.map((f, idx) => ({
                'S.No': idx + 1,
                'Name': f.name || '',
                'Type': f.staffType || 'Teaching',
                'Designation': f.designation || '',
                'Department': f.department || '',
                'Qualification': f.qualification || '',
                'Email': f.email || '',
                'Phone': f.phone || '',
                'Order': f.order || 0
              })),
              'GNC_Staff_Faculty'
            )}
          >
            <Download size={14} /> Export Excel
          </button>
        </div>
        {renderList(teaching, 'Teaching Staff')}
        {renderList(nonTeaching, 'Non-Teaching Staff')}
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '30px 0', color: T.t4 }}>No staff found</div>}
      </div>

      <MiniLog logs={getSectionLog('faculties')} />
    </div>
  );
}
