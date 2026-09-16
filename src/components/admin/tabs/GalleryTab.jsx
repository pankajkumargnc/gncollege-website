// src/components/admin/tabs/GalleryTab.jsx
import { useState } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { Camera, UploadCloud, FolderPlus, LayoutGrid, List, Edit2, Trash2, Plus, CheckCircle2, X, Star, Check } from 'lucide-react';
import MediaPicker from '../../MediaPicker';
import { T, NAVY, GOLD, BG, useLocalDraft, Toggle, SectionSearch, BulkBar, MiniLog } from '../AdminShared';
import { clearCache } from '../../../utils/cachedFetch';
import { resolveUrl } from '../../../utils/resolver';

// ✅ FIXED: Exact categories required for HomePage
const ALBUM_TYPES = ['Seminars', 'Cultural Fest', 'Guest Visit', 'Campus', 'Departments', 'NSS Programs'];

export default function GalleryTab({ gallery, logAct, getSectionLog, softDelete, bulkDelete }) {
  const [editItem, setEditItem]   = useState(null);
  const [formData, setFormData, clearDraft] = useLocalDraft('gallery', {
    title: '', cat: 'Seminars', year: new Date().getFullYear().toString(), image: '', featured: false,
  });
  const [search, setSearch]     = useState('');
  
  // ✅ FIXED: Default tab 'All Moments' set kar diya
  const [albumFilter, setAlbumFilter] = useState('All Moments');
  const [selected, setSelected] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isBulk, setIsBulk]     = useState(false);
  const [progress, setProgress] = useState(0);

  const save = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (!formData.image) { toast.error('Image required!'); setLoading(false); return; }
      
      const payload = {
        title: formData.title,
        cat: formData.cat, // 'cat' field HomePage ke filter se match karta hai
        year: formData.year,
        image: formData.image,
        featured: formData.featured
      };

      if (editItem) {
        await updateDoc(doc(db, 'gallery', editItem.id), { ...payload, updatedAt: serverTimestamp() });
        toast.success('Photo updated!'); clearCache('gallery');
      } else {
        await addDoc(collection(db, 'gallery'), { ...payload, createdAt: serverTimestamp() });
        toast.success('Photo added!'); clearCache('gallery');
      }
      logAct(editItem ? 'update' : 'add', `Gallery: ${formData.title}`, 'gallery');
      setEditItem(null); clearDraft();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const handleBulkUpload = async (files) => {
    if (!files.length) return;
    setLoading(true); setProgress(0);
    const key = window.GN_IMGBB_KEY;
    if (!key) { toast.error('Add ImgBB API Key in the Settings tab!'); setLoading(false); return; }

    let count = 0;
    for (const file of files) {
      try {
        const body = new FormData();
        body.append('image', file);
        const res  = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: 'POST', body });
        const json = await res.json();
        
        if (json.success) {
          await addDoc(collection(db, 'gallery'), {
            title: file.name.split('.')[0],
            cat: formData.cat || 'Campus',
            year: formData.year || new Date().getFullYear().toString(),
            image: json.data.url,
            featured: false,
            createdAt: serverTimestamp()
          });
          count++;
          setProgress(Math.round((count / files.length) * 100));
        }
      } catch (err) { console.error('Upload error:', err); }
    }
    toast.success(`${count} photos uploaded successfully!`); clearCache('gallery');
    logAct('add', `Bulk uploaded ${count} photos to ${formData.cat}`, 'gallery');
    setLoading(false); setProgress(0); setIsBulk(false);
  };

  // Filter logic: If 'All Moments', show all, else filter by matching category
  const albums = ['All Moments', ...ALBUM_TYPES];
  const filtered = (gallery || []).filter(g => {
    const itemCat = g.cat || g.album || 'Other';
    const matchSearch = !search || g.title?.toLowerCase().includes(search.toLowerCase());
    const matchAlbum  = albumFilter === 'All Moments' || itemCat === albumFilter;
    return matchSearch && matchAlbum;
  });

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Camera size={26} color={GOLD} />
            <h2 style={{ margin: 0, fontWeight: 900, color: NAVY, fontSize: 'clamp(20px, 5vw, 24px)', letterSpacing: '-0.5px' }}>Photo Gallery Archive</h2>
          </div>
          <p style={{ margin: '4px 0 20px', color: T.t3, fontSize: 13, fontWeight: 600 }}>Manage college photograph collections, student events, and institutional memories</p>
        </div>
        <button className="abtn abtn-navy" style={{ marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 8 }} onClick={() => setIsBulk(!isBulk)}>
          {isBulk ? <Camera size={15} /> : <UploadCloud size={15} />}
          <span>{isBulk ? 'Single Upload' : 'Bulk Image Dropzone'}</span>
        </button>
      </div>

      {isBulk ? (
        <div className="card-navy pulse-hover" style={{ textAlign: 'center', padding: '40px 20px', border: `2px dashed ${NAVY}` }}
          onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = GOLD; }}
          onDragLeave={e => { e.preventDefault(); e.currentTarget.style.borderColor = NAVY; }}
          onDrop={e => { e.preventDefault(); handleBulkUpload(e.dataTransfer.files); }}>
          
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
            <UploadCloud size={48} color={GOLD} />
          </div>
          <h3 style={{ color: NAVY, fontWeight: 900, margin: '0 0 10px' }}>Bulk Image Dropzone</h3>
          <p style={{ color: T.t3, fontSize: 13, marginBottom: 24 }}>
            Drag multiple images here or browse your system storage.<br/>
            Target Category: <strong>{formData.cat}</strong>
          </p>
          
          <input type="file" multiple accept="image/*" id="bulk-input" hidden onChange={e => handleBulkUpload(e.target.files)} />
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <label htmlFor="bulk-input" className="abtn abtn-navy" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <FolderPlus size={15} /> Choose Images
            </label>
            <select className="abtn abtn-outline" value={formData.cat} onChange={e => setFormData(d => ({ ...d, cat: e.target.value }))}>
              {ALBUM_TYPES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          {loading && (
            <div style={{ marginTop: 24 }}>
              <div style={{ height: 6, background: '#e2e8f0', borderRadius: 10, overflow: 'hidden', maxWidth: 300, margin: '0 auto 10px' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: GOLD, transition: 'width 0.3s' }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 800, color: NAVY, fontVariantNumeric: 'tabular-nums' }}>Uploading... {progress}%</div>
            </div>
          )}
        </div>
      ) : (
        <div className="card-gold">
          <div className="actitle" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {editItem ? <Edit2 size={16} color={GOLD} /> : <Plus size={16} color={GOLD} />}
            <span>{editItem ? 'Edit Photo' : 'Add New Photo'}</span>
          </div>
          <form onSubmit={save}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
              <div>
                <label className="alabel">Caption / Title *</label>
                <input className="ainp" value={formData.title || ''} onChange={e => setFormData(d => ({ ...d, title: e.target.value }))} required placeholder="Annual Sports Day 2025" />
              </div>
              <div>
                <label className="alabel">Album / Category</label>
                <select className="ainp" value={formData.cat || 'Seminars'} onChange={e => setFormData(d => ({ ...d, cat: e.target.value }))}>
                  {ALBUM_TYPES.map(a => <option key={a} value={a}>{a}</option>)}
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
              <MediaPicker 
                label="Photo *" 
                value={formData.image || ''} 
                onChange={url => setFormData(d => ({ ...d, image: url }))} 
                type="image" 
                driveFolderId={import.meta.env.VITE_DRIVE_IMAGES_FOLDER}
              />
            </div>

            {formData.image && (
              <div style={{ marginBottom: 16 }}>
                <img src={resolveUrl(formData.image)} alt="preview" style={{ height: 120, objectFit: 'cover', borderRadius: 10, border: `1.5px solid ${T.b1}` }} />
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="abtn abtn-gold" disabled={loading} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={16} />
                {loading ? 'Saving…' : editItem ? 'Update Photo' : 'Upload Photo'}
              </button>
              {editItem && (
                <button type="button" className="abtn abtn-outline" onClick={() => { setEditItem(null); clearDraft(); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <X size={15} /> Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Album filter Tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        {albums.map(a => (
          <button key={a} onClick={() => setAlbumFilter(a)}
            className="abtn abtn-sm"
            style={{ background: albumFilter === a ? NAVY : 'white', color: albumFilter === a ? 'white' : T.t2, border: `1.5px solid ${albumFilter === a ? NAVY : T.b1}`, fontWeight: albumFilter === a ? 800 : 600 }}>
            {a}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <button className="abtn abtn-sm abtn-outline" onClick={() => setViewMode('grid')} style={{ background: viewMode === 'grid' ? BG : 'white', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <LayoutGrid size={13} /> Grid
          </button>
          <button className="abtn abtn-sm abtn-outline" onClick={() => setViewMode('list')} style={{ background: viewMode === 'list' ? BG : 'white', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <List size={13} /> List
          </button>
        </div>
      </div>

      <SectionSearch value={search} onChange={setSearch} placeholder="Search photos by title..." />
      <BulkBar count={selected.length} onDelete={() => { bulkDelete('gallery', selected); setSelected([]); clearCache('gallery'); }} onClear={() => setSelected([])} />

      <div className="card">
        <div className="actitle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Gallery Media</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.t3, fontVariantNumeric: 'tabular-nums' }}>{filtered.length} photos</span>
        </div>

        {viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12 }}>
            {filtered.map(g => (
              <div key={g.id} style={{ borderRadius: 12, overflow: 'hidden', border: `2px solid ${selected.includes(g.id) ? NAVY : T.b1}`, position: 'relative', cursor: 'pointer' }}
                onClick={() => setSelected(s => s.includes(g.id) ? s.filter(x => x !== g.id) : [...s, g.id])}>
                <img 
                  src={resolveUrl(g) || `${import.meta.env.BASE_URL}images/college_photo.webp`} 
                  alt={g.title} 
                  referrerPolicy="no-referrer"
                  style={{ width: '100%', height: 120, objectFit: 'cover' }} 
                  onError={(e) => {
                    const fallback = `${import.meta.env.BASE_URL}images/college_photo.webp`;
                    if (e.target.src !== fallback) e.target.src = fallback;
                  }}
                />
                <div style={{ padding: '8px 10px', background: 'white' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
                  <div style={{ fontSize: 11, color: T.t3 }}>{g.cat || g.album} · {g.year}</div>
                </div>
                <div style={{ position: 'absolute', top: 6, right: 6, display: 'flex', gap: 4 }}>
                  <button className="abtn abtn-xs" style={{ background: 'rgba(255,255,255,.9)', padding: '4px 6px', display: 'inline-flex', alignItems: 'center' }}
                    onClick={e => { e.stopPropagation(); setEditItem(g); setFormData({ title: g.title||'', cat: g.cat || g.album || 'Seminars', year: g.year||'', image: g.image||'', featured: !!g.featured }); window.scrollTo({top:0,behavior:'smooth'}); }} aria-label="Edit photo">
                    <Edit2 size={12} color={NAVY} />
                  </button>
                  <button className="abtn abtn-xs" style={{ background: 'rgba(239,68,68,.9)', color: 'white', padding: '4px 6px', display: 'inline-flex', alignItems: 'center' }}
                    onClick={e => { e.stopPropagation(); softDelete('gallery', g.id, g, g.title); clearCache('gallery'); }} aria-label="Delete photo">
                    <Trash2 size={12} />
                  </button>
                </div>
                {selected.includes(g.id) && (
                  <div style={{ position: 'absolute', top: 6, left: 6, width: 22, height: 22, borderRadius: 6, background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 900 }}>
                    <Check size={14} color="#fff" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          filtered.map(g => (
            <div key={g.id} className={`arow ${selected.includes(g.id) ? 'selected' : ''}`}>
              <input type="checkbox" checked={selected.includes(g.id)} onChange={() => setSelected(s => s.includes(g.id) ? s.filter(x => x !== g.id) : [...s, g.id])} style={{ accentColor: NAVY }} />
              <img 
                src={resolveUrl(g) || `${import.meta.env.BASE_URL}images/college_photo.webp`} 
                alt={g.title} 
                referrerPolicy="no-referrer"
                style={{ width: 56, height: 44, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} 
                onError={(e) => {
                  const fallback = `${import.meta.env.BASE_URL}images/college_photo.webp`;
                  if (e.target.src !== fallback) e.target.src = fallback;
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: NAVY, fontSize: 14 }}>{g.title}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                  <span className="abadge" style={{ background: BG, color: T.t2 }}>{g.cat || g.album}</span>
                  {g.year && <span className="abadge" style={{ background: BG, color: T.t3, fontVariantNumeric: 'tabular-nums' }}>{g.year}</span>}
                  {g.featured && (
                    <span className="abadge" style={{ background: '#fef3c7', color: '#92400e', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Star size={11} fill="#92400e" /> Featured
                    </span>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="abtn abtn-outline abtn-sm" onClick={() => { setEditItem(g); setFormData({ title: g.title||'', cat: g.cat || g.album || 'Seminars', year: g.year||'', image: g.image||'', featured: !!g.featured }); window.scrollTo({top:0,behavior:'smooth'}); }} aria-label="Edit photo">
                  <Edit2 size={13} />
                </button>
                <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('gallery', g.id, g, g.title)} aria-label="Delete photo">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))
        )}

        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '30px 0', color: T.t4 }}>No photos found</div>}
      </div>

      <MiniLog logs={getSectionLog('gallery')} />
    </div>
  );
}