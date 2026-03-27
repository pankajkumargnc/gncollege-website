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
    title: '', date: '', venue: '', type: 'Cultural', description: '', image: '', reportLink: '', status: 'recent'
  });
  
  const [search, setSearch]     = useState('');
  const [selected, setSelected] = useState([]);
  const [loading, setLoading]   = useState(false);
  
  // ✅ NEW: List Tab State (Upcoming vs Recent)
  const [listTab, setListTab]   = useState('upcoming');

  const save = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = { ...formData };
      
      // Agar upcoming hai, toh image aur description blank kar do
      if (payload.status === 'upcoming') {
        payload.image = '';
        payload.description = '';
      }

      if (editItem) {
        await updateDoc(doc(db, 'events', editItem.id), { ...payload, updatedAt: serverTimestamp() });
        toast.success('Event updated!');
      } else {
        await addDoc(collection(db, 'events'), { ...payload, createdAt: serverTimestamp() });
        toast.success(payload.status === 'upcoming' ? '🔜 Upcoming Event Published!' : '📸 Recent Event Published!');
      }
      logAct(editItem ? 'update' : 'add', `Event: ${formData.title}`, 'events');
      setEditItem(null); clearDraft();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const filtered = (events || []).filter(ev =>
    !search || ev.title?.toLowerCase().includes(search.toLowerCase()) || ev.type?.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Filtering the list based on selected Tab
  const displayedEvents = filtered.filter(ev => 
    listTab === 'upcoming' ? ev.status === 'upcoming' : ev.status !== 'upcoming'
  );

  return (
    <div className="fade-up">
      <p className="asec">🏆 Events Manager</p>
      <p className="asub">Campus events, competitions aur seminars manage karein</p>

      {/* ── Add/Edit Event Form ── */}
      <div className="card-gold">
        <div className="actitle">{editItem ? '✏️ Edit Event' : '➕ Add Event'}</div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 20, background: '#f8fafc', padding: 8, borderRadius: 12, border: `1px solid ${T.b1}` }}>
          <button
            type="button"
            onClick={() => setFormData(d => ({ ...d, status: 'upcoming' }))}
            style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', fontWeight: 800, cursor: 'pointer', transition: '.2s', background: formData.status === 'upcoming' ? GOLD : 'transparent', color: formData.status === 'upcoming' ? '#000' : T.t2 }}
          >🔜 Upcoming Event</button>
          <button
            type="button"
            onClick={() => setFormData(d => ({ ...d, status: 'recent' }))}
            style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', fontWeight: 800, cursor: 'pointer', transition: '.2s', background: formData.status === 'recent' ? NAVY : 'transparent', color: formData.status === 'recent' ? '#fff' : T.t2 }}
          >📸 Recent Event</button>
        </div>

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

          {formData.status === 'recent' && (
            <>
              <div style={{ marginBottom: 14 }}>
                <label className="alabel">Description</label>
                <textarea className="ainp" rows={3} value={formData.description || ''} onChange={e => setFormData(d => ({ ...d, description: e.target.value }))} placeholder="Event ke baare mein detail..." />
              </div>
              <div style={{ marginBottom: 20 }}>
                <MediaPicker label="Event Image" value={formData.image || ''} onChange={url => setFormData(d => ({ ...d, image: url }))} type="image" compact />
              </div>
            </>
          )}

          <div style={{ marginBottom: 20 }}>
            <MediaPicker label="PDF Document Link (optional)" value={formData.reportLink || ''} onChange={url => setFormData(d => ({ ...d, reportLink: url }))} type="pdf" compact />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editItem ? 'Update' : 'Publish'}</button>
            {editItem && <button type="button" className="abtn abtn-outline" onClick={() => { setEditItem(null); clearDraft(); setFormData(d => ({ ...d, status: 'recent' })); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <SectionSearch value={search} onChange={setSearch} placeholder="Search events..." />
      <BulkBar count={selected.length} onDelete={() => { bulkDelete('events', selected); setSelected([]); }} onClear={() => setSelected([])} />

      {/* ── Event List Tabs ── */}
      <div className="card">
        <div style={{ display: 'flex', gap: 15, marginBottom: 20, borderBottom: `2px solid ${T.b1}` }}>
          <button
            onClick={() => { setListTab('upcoming'); setSelected([]); }}
            style={{ background: 'none', border: 'none', fontSize: 15, fontWeight: listTab === 'upcoming' ? 900 : 600, color: listTab === 'upcoming' ? NAVY : T.t3, cursor: 'pointer', borderBottom: listTab === 'upcoming' ? `3px solid ${NAVY}` : 'none', paddingBottom: 10, transition: '0.2s' }}
          >
            🔜 Upcoming Events
          </button>
          <button
            onClick={() => { setListTab('recent'); setSelected([]); }}
            style={{ background: 'none', border: 'none', fontSize: 15, fontWeight: listTab === 'recent' ? 900 : 600, color: listTab === 'recent' ? NAVY : T.t3, cursor: 'pointer', borderBottom: listTab === 'recent' ? `3px solid ${NAVY}` : 'none', paddingBottom: 10, transition: '0.2s' }}
          >
            📸 Recent/Past Events
          </button>
        </div>

        <div className="actitle">{listTab === 'upcoming' ? 'Upcoming Events' : 'Recent Events'} ({displayedEvents.length})</div>
        
        {displayedEvents.map(ev => (
          <div key={ev.id} className={`arow ${selected.includes(ev.id) ? 'selected' : ''}`}>
            <input type="checkbox" checked={selected.includes(ev.id)} onChange={() => setSelected(s => s.includes(ev.id) ? s.filter(x => x !== ev.id) : [...s, ev.id])} style={{ accentColor: NAVY }} />
            {ev.image && <img src={ev.image} alt="" style={{ width: 52, height: 44, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                <span className="abadge" style={{ background: ev.status === 'upcoming' ? '#fef3c7' : '#e0e7ff', color: ev.status === 'upcoming' ? '#d97706' : '#3730a3', fontWeight: 900 }}>
                  {ev.status === 'upcoming' ? '🔜 Upcoming' : '📸 Recent'}
                </span>
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
                setFormData({ 
                  title: ev.title || '', date: ev.date || '', venue: ev.venue || '', type: ev.type || 'Cultural', description: ev.description || '', image: ev.image || '', reportLink: ev.reportLink || ev.pdfLink || '', status: ev.status || 'recent' 
                });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>✏️</button>
              <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('events', ev.id, ev, ev.title)}>🗑️</button>
            </div>
          </div>
        ))}
        {displayedEvents.length === 0 && <div style={{ textAlign: 'center', padding: '30px 0', color: T.t4 }}>Iss category mein koi event nahi mila</div>}
      </div>

      <MiniLog logs={getSectionLog('events')} />
    </div>
  );
}