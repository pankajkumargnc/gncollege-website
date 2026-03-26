// src/components/admin/tabs/PagesTab.jsx
import { useState, lazy, Suspense } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD, BG, WHITE, useLocalDraft, SectionSearch, MiniLog, joditCfg } from '../AdminShared';

// Lazy-load heavy Jodit editor
const JoditEditor = lazy(() => import('jodit-react'));

export default function PagesTab({ pages, logAct, getSectionLog, softDelete }) {
  const [editItem, setEditItem]   = useState(null);
  const [formData, setFormData, clearDraft] = useLocalDraft('page', {
    title: '', slug: '', content: '', metaDesc: '', metaKeywords: '', isPublished: true,
  });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const toSlug = str => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const save = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = { ...formData, slug: formData.slug || toSlug(formData.title) };
      if (editItem) {
        await updateDoc(doc(db, 'pages', editItem.id), { ...payload, updatedAt: serverTimestamp() });
        toast.success('Page updated!');
      } else {
        await addDoc(collection(db, 'pages'), { ...payload, createdAt: serverTimestamp() });
        toast.success('📄 Page published!');
      }
      logAct(editItem ? 'update' : 'add', `Page: ${formData.title}`, 'pages');
      setEditItem(null); clearDraft();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const filtered = (pages || []).filter(p =>
    !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.slug?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-up">
      <p className="asec">📄 Pages &amp; SEO</p>
      <p className="asub">Dynamic pages create aur manage karein with rich text editor</p>

      {/* Preview modal */}
      {preview && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: WHITE, borderRadius: 16, maxWidth: 800, width: '100%', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 24px', borderBottom: `1px solid ${T.b1}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 900, color: NAVY, fontSize: 16 }}>👁️ Preview — {preview.title}</div>
              <button className="abtn abtn-outline abtn-sm" onClick={() => setPreview(null)}>✕ Close</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}
              dangerouslySetInnerHTML={{ __html: preview.content }} />
          </div>
        </div>
      )}

      <div className="card-gold">
        <div className="actitle">{editItem ? '✏️ Edit Page' : '➕ Create Page'}</div>
        <form onSubmit={save}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
            <div>
              <label className="alabel">Page Title *</label>
              <input className="ainp" value={formData.title || ''} onChange={e => setFormData(d => ({
                ...d, title: e.target.value, slug: d.slug || toSlug(e.target.value)
              }))} required placeholder="About Us" />
            </div>
            <div>
              <label className="alabel">URL Slug</label>
              <input className="ainp" value={formData.slug || ''} onChange={e => setFormData(d => ({ ...d, slug: toSlug(e.target.value) }))} placeholder="about-us" />
            </div>
          </div>

          {/* SEO */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label className="alabel">Meta Description</label>
              <textarea className="ainp" rows={2} value={formData.metaDesc || ''} onChange={e => setFormData(d => ({ ...d, metaDesc: e.target.value }))} placeholder="160 chars max..." maxLength={160} />
            </div>
            <div>
              <label className="alabel">Meta Keywords</label>
              <textarea className="ainp" rows={2} value={formData.metaKeywords || ''} onChange={e => setFormData(d => ({ ...d, metaKeywords: e.target.value }))} placeholder="gnc, college, naac, jharkhand" />
            </div>
          </div>

          {/* Rich editor */}
          <div style={{ marginBottom: 20 }}>
            <label className="alabel">Page Content</label>
            <Suspense fallback={<div className="ainp" style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.t4 }}>Loading editor…</div>}>
              <JoditEditor value={formData.content || ''} config={joditCfg} onBlur={v => setFormData(d => ({ ...d, content: v }))} />
            </Suspense>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editItem ? 'Update' : 'Publish'}</button>
            {editItem && <button type="button" className="abtn abtn-outline" onClick={() => { setEditItem(null); clearDraft(); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <SectionSearch value={search} onChange={setSearch} placeholder="Search pages..." />

      <div className="card">
        <div className="actitle">All Pages ({filtered.length})</div>
        {filtered.map(p => (
          <div key={p.id} className="arow">
            <div style={{ width: 36, height: 36, borderRadius: 9, background: `${NAVY}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>📄</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: NAVY, fontSize: 14 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: T.t3, marginTop: 2 }}>/{p.slug}</div>
              {p.metaDesc && <div style={{ fontSize: 11.5, color: T.t4, marginTop: 2 }}>{p.metaDesc.substring(0, 80)}…</div>}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="abtn abtn-outline abtn-sm" onClick={() => setPreview(p)}>👁️</button>
              <button className="abtn abtn-outline abtn-sm" onClick={() => {
                setEditItem(p);
                setFormData({ title: p.title||'', slug: p.slug||'', content: p.content||'', metaDesc: p.metaDesc||'', metaKeywords: p.metaKeywords||'', isPublished: p.isPublished !== false });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>✏️</button>
              <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('pages', p.id, p, p.title)}>🗑️</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '30px 0', color: T.t4 }}>Koi page nahi mila</div>}
      </div>

      <MiniLog logs={getSectionLog('pages')} />
    </div>
  );
}
