// src/components/admin/tabs/TestimonialsTab.jsx
import { useState } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import MediaPicker from '../../MediaPicker';
import { T, NAVY, GOLD, BG, useLocalDraft, Toggle, SectionSearch, BulkBar, MiniLog } from '../AdminShared';

const TYPES = ['Student', 'Alumni'];

export default function TestimonialsTab({ testimonials, logAct, getSectionLog }) {
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData, clearDraft] = useLocalDraft('testimonials', {
    name: '', role: 'Student', content: '', image: '', active: true, year: ''
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        role: formData.role,
        content: formData.content,
        image: formData.image,
        active: formData.active,
        year: formData.year,
        updatedAt: serverTimestamp()
      };

      if (editItem) {
        await updateDoc(doc(db, 'testimonials', editItem.id), payload);
        toast.success('Testimonial updated!');
      } else {
        await addDoc(collection(db, 'testimonials'), { ...payload, createdAt: serverTimestamp() });
        toast.success('💬 Testimonial added!');
      }
      logAct(editItem ? 'update' : 'add', `Testimonial: ${formData.name}`, 'testimonials');
      setEditItem(null); clearDraft();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const del = async (id, name) => {
    if (!window.confirm(`Delete testimonial from ${name}?`)) return;
    try {
      await deleteDoc(doc(db, 'testimonials', id));
      toast.success('Deleted!');
      logAct('delete', `Testimonial: ${name}`, 'testimonials');
    } catch (err) { toast.error(err.message); }
  };

  const filtered = (testimonials || []).filter(t => 
    !search || t.name?.toLowerCase().includes(search.toLowerCase()) || t.content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-up">
      <p className="asec">💬 Student & Alumni Testimonials</p>
      <p className="asub">Home page par aane wale reviews manage karein</p>

      <div className="card-gold">
        <div className="actitle">{editItem ? '✏️ Edit Testimonial' : '➕ Add Testimonial'}</div>
        <form onSubmit={save}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
            <div>
              <label className="alabel">Full Name *</label>
              <input className="ainp" value={formData.name || ''} onChange={e => setFormData(d => ({ ...d, name: e.target.value }))} required />
            </div>
            <div>
              <label className="alabel">Type</label>
              <select className="ainp" value={formData.role || 'Student'} onChange={e => setFormData(d => ({ ...d, role: e.target.value }))}>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="alabel">Batch / Year</label>
              <input className="ainp" value={formData.year || ''} onChange={e => setFormData(d => ({ ...d, year: e.target.value }))} placeholder="Batch 2020-23" />
            </div>
          </div>
          
          <div style={{ marginBottom: 14 }}>
            <label className="alabel">Testimonial Content *</label>
            <textarea className="ainp" style={{ height: 100, resize: 'vertical' }} value={formData.content || ''} onChange={e => setFormData(d => ({ ...d, content: e.target.value }))} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'end', marginBottom: 20 }}>
            <MediaPicker 
              label="Profile Image" 
              value={formData.image || ''} 
              onChange={url => setFormData(d => ({ ...d, image: url }))} 
              type="image" 
              driveFolderId={import.meta.env.VITE_DRIVE_IMAGES_FOLDER}
            />
            <div style={{ paddingBottom: 12 }}>
              <Toggle checked={!!formData.active} onChange={() => setFormData(d => ({ ...d, active: !d.active }))} label="Visible on Site" color={GOLD} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editItem ? 'Update' : 'Save Testimonial'}</button>
            {editItem && <button type="button" className="abtn abtn-outline" onClick={() => { setEditItem(null); clearDraft(); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <SectionSearch value={search} onChange={setSearch} placeholder="Search testimonials..." />

      <div className="card">
        <div className="actitle">All Testimonials ({filtered.length})</div>
        {filtered.map(t => (
          <div key={t.id} className="arow">
            <img src={t.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0f2347&color=f4a023`} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${GOLD}` }} alt="" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: NAVY }}>{t.name} <span style={{ fontSize: 11, color: T.t4, marginLeft: 6 }}>{t.role}</span></div>
              <div style={{ fontSize: 12, color: T.t3, marginTop: 2, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{t.content}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="abtn abtn-sm abtn-outline" onClick={() => { setEditItem(t); setFormData(t); window.scrollTo({top:0, behavior:'smooth'}); }}>✏️</button>
              <button className="abtn abtn-sm abtn-red" onClick={() => del(t.id, t.name)}>🗑️</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '30px 0', color: T.t4 }}>No testimonials found.</div>}
      </div>

      <MiniLog logs={getSectionLog('testimonials')} />
    </div>
  );
}
