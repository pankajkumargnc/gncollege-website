// src/components/admin/tabs/AnnouncementsTab.jsx
import { useState } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import DOMPurify from 'dompurify';
import { Megaphone, Flame, Pin, Edit2, Trash2, Plus } from 'lucide-react';
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
        toast.success('News published!');
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
      <h2 style={{ margin: 0, fontWeight: 900, color: NAVY, fontSize: 'clamp(20px, 5vw, 24px)', letterSpacing: '-0.5px' }}>News &amp; Press Releases</h2>
      <p style={{ margin: '4px 0 14px', color: T.t3, fontSize: 13, fontWeight: 600 }}>Publish college news, press releases, and notifications.</p>

      {/* ── Destination Indicator ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.05) 0%, rgba(220, 38, 38, 0.08) 100%)',
        border: '1.5px solid rgba(220, 38, 38, 0.2)',
        borderRadius: 14, padding: '12px 16px', margin: '0 0 20px',
      }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Flame size={20} color="#b91c1c" />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 13, color: '#991b1b' }}>
            Live Destination: Homepage Card 2 (News &amp; Events) &amp; /news Page
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
            Headlines published here stream directly into Homepage Card 2 alongside upcoming campus events.
          </div>
        </div>
      </div>

      <div className="card-gold">
        <div className="actitle" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {editItem ? <Edit2 size={16} /> : <Plus size={16} />}
          <span>{editItem ? 'Edit News Item' : 'Publish News'}</span>
        </div>
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
                label="Link (PDF or URL — optional)"
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
            <button type="submit" className="abtn abtn-gold" disabled={loading}>
              {loading ? 'Saving…' : editItem ? 'Update News' : 'Publish News'}
            </button>
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
              <div style={{ display: 'flex', gap: 6, marginBottom: 5, flexWrap: 'wrap', alignItems: 'center' }}>
                {n.pinned && <span className="abadge" style={{ background: `${NAVY}15`, color: NAVY, display: 'inline-flex', alignItems: 'center', gap: 4 }}><Pin size={10} /> Pinned</span>}
                {n.isNew  && <span className="abadge" style={{ background: '#fee2e2', color: T.red }}>NEW</span>}
                <span className="abadge" style={{ background: BG, color: T.t2 }}>{n.type}</span>
              </div>
              <div style={{ fontWeight: 700, color: NAVY, fontSize: 14 }}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize((n.text || '').substring(0, 100)) }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="abtn abtn-outline abtn-sm" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {
                setEditItem(n);
                setFormData({ text: n.text || '', link: n.link || '', type: n.type || 'News', isNew: !!n.isNew, pinned: !!n.pinned });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} aria-label="Edit news"><Edit2 size={13} /></button>
              <button className="abtn abtn-red abtn-sm" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => softDelete('announcements', n.id, n, (n.text || '').substring(0, 30))} aria-label="Delete news"><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '30px 0', color: T.t4 }}>No news found</div>}
      </div>

      <MiniLog logs={getSectionLog('announcements')} />
    </div>
  );
}
