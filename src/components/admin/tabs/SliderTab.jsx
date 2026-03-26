// src/components/admin/tabs/SliderTab.jsx
import { useState } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import MediaPicker from '../../MediaPicker';
import { T, NAVY, GOLD, BG, useLocalDraft, Toggle, MiniLog } from '../AdminShared';

export default function SliderTab({ sliderSlides, logAct, getSectionLog, softDelete }) {
  const [editItem, setEditItem]   = useState(null);
  const [formData, setFormData, clearDraft] = useLocalDraft('slider', {
    title: '', subtitle: '', image: '', link: '', isActive: true, order: 0,
  });
  const [loading, setLoading] = useState(false);

  const save = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (!formData.image) { toast.error('Image required!'); setLoading(false); return; }
      const payload = { ...formData, order: Number(formData.order) || 0 };
      if (editItem) {
        await updateDoc(doc(db, 'sliderSlides', editItem.id), { ...payload, updatedAt: serverTimestamp() });
        toast.success('Slide updated!');
      } else {
        await addDoc(collection(db, 'sliderSlides'), { ...payload, createdAt: serverTimestamp() });
        toast.success('🖼️ Slide added!');
      }
      logAct(editItem ? 'update' : 'add', `Slider: ${formData.title}`, 'sliderSlides');
      setEditItem(null); clearDraft();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const toggleActive = async slide => {
    await updateDoc(doc(db, 'sliderSlides', slide.id), { isActive: !slide.isActive });
    toast.success(slide.isActive ? 'Slide hidden' : '🖼️ Slide visible!');
    logAct('update', `Slide ${slide.isActive ? 'hidden' : 'shown'}: ${slide.title}`, 'sliderSlides');
  };

  const sorted = [...(sliderSlides || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="fade-up">
      <p className="asec">🖼️ Hero Slider</p>
      <p className="asub">Homepage ka main banner slider manage karein</p>

      <div className="card-gold">
        <div className="actitle">{editItem ? '✏️ Edit Slide' : '➕ Add Slide'}</div>
        <form onSubmit={save}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
            <div>
              <label className="alabel">Heading</label>
              <input className="ainp" value={formData.title || ''} onChange={e => setFormData(d => ({ ...d, title: e.target.value }))} placeholder="Welcome to GNC" />
            </div>
            <div>
              <label className="alabel">Sub-heading</label>
              <input className="ainp" value={formData.subtitle || ''} onChange={e => setFormData(d => ({ ...d, subtitle: e.target.value }))} placeholder="Excellence in Education" />
            </div>
            <div>
              <label className="alabel">Link (Optional)</label>
              <input className="ainp" value={formData.link || ''} onChange={e => setFormData(d => ({ ...d, link: e.target.value }))} placeholder="/admissions" />
            </div>
            <div>
              <label className="alabel">Display Order</label>
              <input className="ainp" type="number" value={formData.order || 0} onChange={e => setFormData(d => ({ ...d, order: e.target.value }))} placeholder="1" />
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <MediaPicker label="Slide Image *" value={formData.image || ''} onChange={url => setFormData(d => ({ ...d, image: url }))} type="image" />
          </div>

          {formData.image && (
            <div style={{ marginBottom: 16, borderRadius: 12, overflow: 'hidden', border: `1.5px solid ${T.b1}`, position: 'relative' }}>
              <img src={formData.image} alt="preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(15,35,71,.6),transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 20 }}>
                {formData.title && <div style={{ color: 'white', fontWeight: 900, fontSize: 18 }}>{formData.title}</div>}
                {formData.subtitle && <div style={{ color: 'rgba(255,255,255,.8)', fontSize: 13 }}>{formData.subtitle}</div>}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <Toggle checked={!!formData.isActive} onChange={() => setFormData(d => ({ ...d, isActive: !d.isActive }))} label="Visible on site" color={T.green} />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editItem ? 'Update' : 'Add Slide'}</button>
            {editItem && <button type="button" className="abtn abtn-outline" onClick={() => { setEditItem(null); clearDraft(); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="card">
        <div className="actitle">All Slides ({sorted.length}) <span style={{ fontSize: 12, color: T.t3, fontWeight: 600 }}>— order se arrange hain</span></div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
          {sorted.map((s, idx) => (
            <div key={s.id} style={{ borderRadius: 14, overflow: 'hidden', border: `2px solid ${s.isActive ? GOLD : T.b1}`, opacity: s.isActive ? 1 : 0.5 }}>
              <div style={{ position: 'relative' }}>
                {s.image
                  ? <img src={s.image} alt={s.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                  : <div style={{ height: 140, background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🖼️</div>
                }
                <div style={{ position: 'absolute', top: 8, left: 8, background: NAVY, color: 'white', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 900 }}>#{idx + 1}</div>
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                  <Toggle checked={s.isActive} onChange={() => toggleActive(s)} />
                </div>
              </div>
              <div style={{ padding: 14, background: 'white' }}>
                <div style={{ fontWeight: 800, color: NAVY, fontSize: 13, marginBottom: 3 }}>{s.title || '(No title)'}</div>
                {s.subtitle && <div style={{ fontSize: 12, color: T.t3 }}>{s.subtitle}</div>}
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button className="abtn abtn-outline abtn-sm" style={{ flex: 1 }} onClick={() => {
                    setEditItem(s);
                    setFormData({ title: s.title||'', subtitle: s.subtitle||'', image: s.image||'', link: s.link||'', isActive: !!s.isActive, order: s.order||0 });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}>✏️ Edit</button>
                  <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('sliderSlides', s.id, s, s.title || 'Slide')}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sorted.length === 0 && <div style={{ textAlign: 'center', padding: '30px 0', color: T.t4 }}>Koi slide nahi hai</div>}
      </div>

      <MiniLog logs={getSectionLog('sliderSlides')} />
    </div>
  );
}
