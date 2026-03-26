// src/components/admin/tabs/GalleryTab.jsx
import { useState } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import MediaPicker from '../../MediaPicker';
import { T, NAVY, GOLD, BG, useLocalDraft, Toggle, SectionSearch, BulkBar, MiniLog } from '../AdminShared';

const ALBUM_TYPES = ['Event', 'Campus', 'Sports', 'Cultural', 'Academic', 'Convocation', 'Other'];

export default function GalleryTab({ gallery, logAct, getSectionLog, softDelete, bulkDelete }) {
  const [editItem, setEditItem]   = useState(null);
  const [formData, setFormData, clearDraft] = useLocalDraft('gallery', {
    title: '', album: 'Event', year: new Date().getFullYear().toString(), image: '', featured: false,
  });
  const [search, setSearch]     = useState('');
  const [albumFilter, setAlbumFilter] = useState('All');
  const [selected, setSelected] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const save = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (!formData.image) { toast.error('Image required!'); setLoading(false); return; }
      if (editItem) {
        await updateDoc(doc(db, 'gallery', editItem.id), { ...formData, updatedAt: serverTimestamp() });
        toast.success('Photo updated!');
      } else {
        await addDoc(collection(db, 'gallery'), { ...formData, createdAt: serverTimestamp() });
        toast.success('📸 Photo added!');
      }
      logAct(editItem ? 'update' : 'add', `Gallery: ${formData.title}`, 'gallery');
      setEditItem(null); clearDraft();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const albums = ['All', ...ALBUM_TYPES];
  const filtered = (gallery || []).filter(g => {
    const matchSearch = !search || g.title?.toLowerCase().includes(search.toLowerCase());
    const matchAlbum  = albumFilter === 'All' || g.album === albumFilter;
    return matchSearch && matchAlbum;
  });

  return (
    <div className="fade-up">
      <p className="asec">📸 Photo Gallery</p>
      <p className="asub">College photos aur albums manage karein</p>

      <div className="card-gold">
        <div className="actitle">{editItem ? '✏️ Edit Photo' : '➕ Add Photo'}</div>
        <form onSubmit={save}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
            <div>
              <label className="alabel">Caption / Title *</label>
              <input className="ainp" value={formData.title || ''} onChange={e => setFormData(d => ({ ...d, title: e.target.value }))} required placeholder="Annual Day 2025" />
            </div>
            <div>
              <label className="alabel">Album</label>
              <select className="ainp" value={formData.album || 'Event'} onChange={e => setFormData(d => ({ ...d, album: e.target.value }))}>
                {ALBUM_TYPES.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="alabel">Year</label>
              <input className="ainp" value={formData.year || ''} onChange={e => setFormData(d => ({ ...d, year: e.target.value }))} placeholder="2025" />
            </div>
            <div style={{ paddingTop: 22 }}>
              <Toggle checked={!!formData.featured} onChange={() => setFormData(d => ({ ...d, featured: !d.featured }))} label="Featured Photo" color={GOLD} />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <MediaPicker label="Photo *" value={formData.image || ''} onChange={url => setFormData(d => ({ ...d, image: url }))} type="image" />
          </div>

          {formData.image && (
            <div style={{ marginBottom: 16 }}>
              <img src={formData.image} alt="preview" style={{ height: 120, objectFit: 'cover', borderRadius: 10, border: `1.5px solid ${T.b1}` }} />
            </div>
          )}

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editItem ? 'Update' : 'Upload'}</button>
            {editItem && <button type="button" className="abtn abtn-outline" onClick={() => { setEditItem(null); clearDraft(); }}>Cancel</button>}
          </div>
        </form>
      </div>

      {/* Album filter */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {albums.map(a => (
          <button key={a} onClick={() => setAlbumFilter(a)}
            className="abtn abtn-sm"
            style={{ background: albumFilter === a ? NAVY : 'white', color: albumFilter === a ? 'white' : T.t2, border: `1.5px solid ${albumFilter === a ? NAVY : T.b1}` }}>
            {a}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <button className="abtn abtn-sm abtn-outline" onClick={() => setViewMode('grid')} style={{ background: viewMode === 'grid' ? BG : 'white' }}>⊞ Grid</button>
          <button className="abtn abtn-sm abtn-outline" onClick={() => setViewMode('list')} style={{ background: viewMode === 'list' ? BG : 'white' }}>☰ List</button>
        </div>
      </div>

      <SectionSearch value={search} onChange={setSearch} placeholder="Search photos..." />
      <BulkBar count={selected.length} onDelete={() => { bulkDelete('gallery', selected); setSelected([]); }} onClear={() => setSelected([])} />

      <div className="card">
        <div className="actitle">Gallery ({filtered.length})</div>

        {viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12 }}>
            {filtered.map(g => (
              <div key={g.id} style={{ borderRadius: 12, overflow: 'hidden', border: `2px solid ${selected.includes(g.id) ? NAVY : T.b1}`, position: 'relative', cursor: 'pointer' }}
                onClick={() => setSelected(s => s.includes(g.id) ? s.filter(x => x !== g.id) : [...s, g.id])}>
                <img src={g.image} alt={g.title} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
                <div style={{ padding: '8px 10px', background: 'white' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
                  <div style={{ fontSize: 11, color: T.t3 }}>{g.album} · {g.year}</div>
                </div>
                <div style={{ position: 'absolute', top: 6, right: 6, display: 'flex', gap: 4 }}>
                  <button className="abtn abtn-xs" style={{ background: 'rgba(255,255,255,.9)', padding: '3px 7px' }}
                    onClick={e => { e.stopPropagation(); setEditItem(g); setFormData({ title: g.title||'', album: g.album||'Event', year: g.year||'', image: g.image||'', featured: !!g.featured }); window.scrollTo({top:0,behavior:'smooth'}); }}>✏️</button>
                  <button className="abtn abtn-xs" style={{ background: 'rgba(239,68,68,.9)', color: 'white', padding: '3px 7px' }}
                    onClick={e => { e.stopPropagation(); softDelete('gallery', g.id, g, g.title); }}>🗑️</button>
                </div>
                {selected.includes(g.id) && (
                  <div style={{ position: 'absolute', top: 6, left: 6, width: 22, height: 22, borderRadius: 6, background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 900 }}>✓</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          filtered.map(g => (
            <div key={g.id} className={`arow ${selected.includes(g.id) ? 'selected' : ''}`}>
              <input type="checkbox" checked={selected.includes(g.id)} onChange={() => setSelected(s => s.includes(g.id) ? s.filter(x => x !== g.id) : [...s, g.id])} style={{ accentColor: NAVY }} />
              <img src={g.image} alt={g.title} style={{ width: 56, height: 44, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: NAVY, fontSize: 14 }}>{g.title}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                  <span className="abadge" style={{ background: BG, color: T.t2 }}>{g.album}</span>
                  {g.year && <span className="abadge" style={{ background: BG, color: T.t3 }}>{g.year}</span>}
                  {g.featured && <span className="abadge" style={{ background: '#fef3c7', color: '#92400e' }}>⭐ Featured</span>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="abtn abtn-outline abtn-sm" onClick={() => { setEditItem(g); setFormData({ title: g.title||'', album: g.album||'Event', year: g.year||'', image: g.image||'', featured: !!g.featured }); window.scrollTo({top:0,behavior:'smooth'}); }}>✏️</button>
                <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('gallery', g.id, g, g.title)}>🗑️</button>
              </div>
            </div>
          ))
        )}

        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '30px 0', color: T.t4 }}>Koi photo nahi mila</div>}
      </div>

      <MiniLog logs={getSectionLog('gallery')} />
    </div>
  );
}
