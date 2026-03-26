// src/components/admin/tabs/EventsTab.jsx
import { useState } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import MediaPicker from '../../MediaPicker';
import { T, NAVY, GOLD, BG, useLocalDraft, SectionSearch, BulkBar, MiniLog } from '../AdminShared';

const TYPES = ['Cultural','Sports','Academic','Technical','Workshop','Seminar','Competition','Other'];

export default function EventsTab({ events, logAct, getSectionLog, softDelete, bulkDelete }) {
  const [editItem, setEditItem]   = useState(null);
  const [formData, setFormData, clearDraft] = useLocalDraft('event', {
    title: '', date: '', venue: '', type: 'Cultural', description: '', image: '', pdfLink: '',
  });
  const [search, setSearch]     = useState('');
  const [selected, setSelected] = useState([]);
  const [loading, setLoading]   = useState(false);

  const save = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (editItem) {
        await updateDoc(doc(db, 'events', editItem.id), { ...formData, updatedAt: serverTimestamp() });
        toast.success('Event updated!');
      } else {
        await addDoc(collection(db, 'events'), { ...formData, createdAt: serverTimestamp() });
        toast.success('🏆 Event published!');
      }
      logAct(editItem ? 'update' : 'add', `Event: ${formData.title}`, 'events');
      setEditItem(null); clearDraft();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const filtered = (events || []).filter(ev =>
    !search || ev.title?.toLowerCase().includes(search.toLowerCase()) || ev.type?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-up">
      <p className="asec">🏆 Events Manager</p>
      <p className="asub">Campus events, competitions aur seminars manage karein</p>

      <div className="card-gold">
        <div className="actitle">{editItem ? '✏️ Edit Event' : '➕ Add Event'}</div>
        <form onSubmit={save}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, marginBottom: 14 }}>
            <div>
              <label className="alabel">Event Title *</label>
              <input className="ainp" value={formData.title || ''} onChange={e => setFormData(d => ({ ...d, title: e.target.value }))} required placeholder="Annual Sports Meet 2025" />
            </div>
            <div>
              <label className="alabel">Date</label>
              <input className="ainp" type="date" value={formData.date || ''} onChange={e => setFormData(d => ({ ...d, date: e.target.value }))} />
            </div>
            <div>
              <label className="alabel">Venue</label>
              <input className="ainp" value={formData.venue || ''} onChange={e => setFormData(d => ({ ...d, venue: e.target.value }))} placeholder="College Ground / Auditorium" />
            </div>
            <div>
              <label className="alabel">Type</label>
              <select className="ainp" value={formData.type || 'Cultural'} onChange={e => setFormData(d => ({ ...d, type: e.target.value }))}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label className="alabel">Description</label>
            <textarea className="ainp" rows={3} value={formData.description || ''} onChange={e => setFormData(d => ({ ...d, description: e.target.value }))} placeholder="Event ke baare mein detail..." />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
            <MediaPicker label="Event Image" value={formData.image || ''} onChange={url => setFormData(d => ({ ...d, image: url }))} type="image" compact />
            <MediaPicker label="PDF Link (optional)" value={formData.pdfLink || ''} onChange={url => setFormData(d => ({ ...d, pdfLink: url }))} type="pdf" compact />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editItem ? 'Update' : 'Publish'}</button>
            {editItem && <button type="button" className="abtn abtn-outline" onClick={() => { setEditItem(null); clearDraft(); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <SectionSearch value={search} onChange={setSearch} placeholder="Search events..." />
      <BulkBar count={selected.length} onDelete={() => { bulkDelete('events', selected); setSelected([]); }} onClear={() => setSelected([])} />

      <div className="card">
        <div className="actitle">All Events ({filtered.length})</div>
        {filtered.map(ev => (
          <div key={ev.id} className={`arow ${selected.includes(ev.id) ? 'selected' : ''}`}>
            <input type="checkbox" checked={selected.includes(ev.id)} onChange={() => setSelected(s => s.includes(ev.id) ? s.filter(x => x !== ev.id) : [...s, ev.id])} style={{ accentColor: NAVY }} />
            {ev.image && <img src={ev.image} alt="" style={{ width: 52, height: 44, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                <span className="abadge" style={{ background: `${NAVY}12`, color: NAVY }}>{ev.type}</span>
                {ev.date && <span className="abadge" style={{ background: BG, color: T.t2 }}>📅 {new Date(ev.date).toLocaleDateString('en-IN')}</span>}
                {ev.venue && <span className="abadge" style={{ background: BG, color: T.t3 }}>📍 {ev.venue}</span>}
              </div>
              <div style={{ fontWeight: 700, color: NAVY, fontSize: 14 }}>{ev.title}</div>
              {ev.description && <div style={{ fontSize: 12, color: T.t3, marginTop: 3 }}>{ev.description.substring(0, 80)}…</div>}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="abtn abtn-outline abtn-sm" onClick={() => {
                setEditItem(ev);
                setFormData({ title: ev.title || '', date: ev.date || '', venue: ev.venue || '', type: ev.type || 'Cultural', description: ev.description || '', image: ev.image || '', pdfLink: ev.pdfLink || '' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>✏️</button>
              <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('events', ev.id, ev, ev.title)}>🗑️</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '30px 0', color: T.t4 }}>Koi event nahi mila</div>}
      </div>

      <MiniLog logs={getSectionLog('events')} />
    </div>
  );
}
