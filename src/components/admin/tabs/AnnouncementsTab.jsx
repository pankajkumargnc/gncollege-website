// src/components/admin/tabs/AnnouncementsTab.jsx
import { useState } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import DOMPurify from 'dompurify';
import MediaPicker from '../../MediaPicker';
import { T, NAVY, GOLD, BG, useLocalDraft, Toggle, SectionSearch, BulkBar, MiniLog } from '../AdminShared';

export default function AnnouncementsTab({ announcements, logAct, getSectionLog, softDelete, bulkDelete }) {
  const [editItem, setEditItem]   = useState(null);
  const [formData, setFormData, clearDraft] = useLocalDraft('announcement', {
    text: '', link: '', type: 'News', isNew: true, pinned: false,
  });
  const [search, setSearch]     = useState('');
  const [selected, setSelected] = useState([]);
  const [loading, setLoading]   = useState(false);

  const toggleSel = id => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const save = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (editItem) {
        await updateDoc(doc(db, 'announcements', editItem.id), { ...formData, updatedAt: serverTimestamp() });
        toast.success('News updated!');
      } else {
        await addDoc(collection(db, 'announcements'), { ...formData, date: new Date().toISOString(), createdAt: serverTimestamp() });
        toast.success('📣 News published!');
      }
      logAct(editItem ? 'update' : 'add', `News: ${formData.text?.substring(0, 40)}`, 'announcements');
      setEditItem(null); clearDraft();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const filtered = (announcements || []).filter(n =>
    !search || n.text?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-up">
      <p className="asec">📣 News &amp; Announcements</p>
      <p className="asub">College news aur announcements publish karein</p>

      <div className="card-gold">
        <div className="actitle">{editItem ? '✏️ Edit News' : '➕ Publish News'}</div>
        <form onSubmit={save}>
          <div style={{ marginBottom: 14 }}>
            <label className="alabel">Headline / Text *</label>
            <textarea
              className="ainp" rows={3}
              value={formData.text || ''}
              onChange={e => setFormData(d => ({ ...d, text: e.target.value }))}
              required placeholder="Admission notice for session 2025-26..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 14 }}>
            <div>
              <label className="alabel">Category</label>
              <select className="ainp" value={formData.type || 'News'} onChange={e => setFormData(d => ({ ...d, type: e.target.value }))}>
                {['News', 'Admission', 'Examination', 'Result', 'Placement', 'Achievement', 'Sports', 'Other'].map(t =>
                  <option key={t}>{t}</option>
                )}
              </select>
            </div>

            <div style={{ gridColumn: '1/-1' }}>
              <MediaPicker
                label="Link (PDF ya URL — optional)"
                value={formData.link || ''}
                onChange={url => setFormData(d => ({ ...d, link: url }))}
                type="pdf" compact
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 22 }}>
              <Toggle checked={!!formData.isNew}   onChange={() => setFormData(d => ({ ...d, isNew: !d.isNew }))}   label="Mark as NEW" color={T.red} />
              <Toggle checked={!!formData.pinned}  onChange={() => setFormData(d => ({ ...d, pinned: !d.pinned }))} label="Pin to Top"  color={NAVY} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editItem ? 'Update' : 'Publish'}</button>
            {editItem && (
              <button type="button" className="abtn abtn-outline" onClick={() => { setEditItem(null); clearDraft(); }}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      <SectionSearch value={search} onChange={setSearch} placeholder="Search news..." />
      <BulkBar count={selected.length} onDelete={() => { bulkDelete('announcements', selected); setSelected([]); }} onClear={() => setSelected([])} />

      <div className="card">
        <div className="actitle">All News ({filtered.length})</div>
        {filtered.map(n => (
          <div key={n.id} className={`arow ${selected.includes(n.id) ? 'selected' : ''}`}
            style={{ borderLeft: `4px solid ${n.pinned ? NAVY : n.isNew ? T.red : T.b2}` }}>
            <input type="checkbox" checked={selected.includes(n.id)} onChange={() => toggleSel(n.id)}
              style={{ accentColor: NAVY }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 5, flexWrap: 'wrap' }}>
                {n.pinned && <span className="abadge" style={{ background: `${NAVY}15`, color: NAVY }}>📌 Pinned</span>}
                {n.isNew  && <span className="abadge" style={{ background: '#fee2e2', color: T.red }}>NEW</span>}
                <span className="abadge" style={{ background: BG, color: T.t2 }}>{n.type}</span>
              </div>
              <div style={{ fontWeight: 700, color: NAVY, fontSize: 14 }}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize((n.text || '').substring(0, 100)) }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="abtn abtn-outline abtn-sm" onClick={() => {
                setEditItem(n);
                setFormData({ text: n.text || '', link: n.link || '', type: n.type || 'News', isNew: !!n.isNew, pinned: !!n.pinned });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>✏️</button>
              <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('announcements', n.id, n, (n.text || '').substring(0, 30))}>🗑️</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '30px 0', color: T.t4 }}>Koi news nahi mili</div>}
      </div>

      <MiniLog logs={getSectionLog('announcements')} />
    </div>
  );
}
