// src/components/admin/tabs/MenuBuilderTab.jsx
import { useState } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, getDocs, writeBatch } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD, BG, WHITE, MiniLog } from '../AdminShared';

export default function MenuBuilderTab({ navLinks, logAct, getSectionLog }) {
  const [editItem, setEditItem]   = useState(null);
  const [formData, setFormData]   = useState({ label: '', path: '', order: 0, icon: '', parent: '', isExternal: false });
  const [loading, setLoading]     = useState(false);
  const [dragOver, setDragOver]   = useState(null);

  const save = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = { ...formData, order: Number(formData.order) || 0 };
      if (editItem) {
        await updateDoc(doc(db, 'navLinks', editItem.id), { ...payload, updatedAt: serverTimestamp() });
        toast.success('Menu item updated!');
      } else {
        await addDoc(collection(db, 'navLinks'), { ...payload, createdAt: serverTimestamp() });
        toast.success('🧭 Menu item added!');
      }
      logAct(editItem ? 'update' : 'add', `Menu: ${formData.label}`, 'navLinks');
      setEditItem(null); setFormData({ label: '', path: '', order: 0, icon: '', parent: '', isExternal: false });
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const deleteItem = async item => {
    if (!window.confirm(`Delete "${item.label}"?`)) return;
    await deleteDoc(doc(db, 'navLinks', item.id));
    logAct('delete', `Menu deleted: ${item.label}`, 'navLinks');
    toast.success('Deleted!');
  };

  // Group by parent
  const topLevel = (navLinks || []).filter(n => !n.parent).sort((a, b) => (a.order || 0) - (b.order || 0));
  const getChildren = parentLabel => (navLinks || []).filter(n => n.parent === parentLabel).sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="fade-up">
      <p className="asec">🧭 Menu Builder</p>
      <p className="asub">Navbar ke links aur dropdown items edit karein</p>

      <div className="card-gold">
        <div className="actitle">{editItem ? '✏️ Edit Menu Item' : '➕ Add Menu Item'}</div>
        <form onSubmit={save}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 14 }}>
            <div>
              <label className="alabel">Label *</label>
              <input className="ainp" value={formData.label || ''} onChange={e => setFormData(d => ({ ...d, label: e.target.value }))} required placeholder="About Us" />
            </div>
            <div>
              <label className="alabel">Path / URL</label>
              <input className="ainp" value={formData.path || ''} onChange={e => setFormData(d => ({ ...d, path: e.target.value }))} placeholder="/about-us" />
            </div>
            <div>
              <label className="alabel">Icon (emoji)</label>
              <input className="ainp" value={formData.icon || ''} onChange={e => setFormData(d => ({ ...d, icon: e.target.value }))} placeholder="🏫" />
            </div>
            <div>
              <label className="alabel">Order</label>
              <input className="ainp" type="number" value={formData.order || 0} onChange={e => setFormData(d => ({ ...d, order: e.target.value }))} />
            </div>
            <div>
              <label className="alabel">Parent Menu (for dropdown)</label>
              <select className="ainp" value={formData.parent || ''} onChange={e => setFormData(d => ({ ...d, parent: e.target.value }))}>
                <option value="">— Top Level —</option>
                {topLevel.map(n => <option key={n.id} value={n.label}>{n.label}</option>)}
              </select>
            </div>
            <div style={{ paddingTop: 22 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, fontWeight: 700, color: T.t2 }}>
                <input type="checkbox" checked={!!formData.isExternal} onChange={() => setFormData(d => ({ ...d, isExternal: !d.isExternal }))} style={{ accentColor: NAVY }} />
                External Link (opens in new tab)
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editItem ? 'Update' : 'Add'}</button>
            {editItem && <button type="button" className="abtn abtn-outline" onClick={() => { setEditItem(null); setFormData({ label: '', path: '', order: 0, icon: '', parent: '', isExternal: false }); }}>Cancel</button>}
          </div>
        </form>
      </div>

      {/* Live preview */}
      <div className="card">
        <div className="actitle">📋 Menu Structure Preview</div>
        <div style={{ background: NAVY, borderRadius: 12, padding: '12px 20px', display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
          {topLevel.map(n => (
            <div key={n.id} style={{ position: 'relative' }}>
              <div style={{ padding: '7px 14px', borderRadius: 8, color: 'rgba(255,255,255,.8)', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                {n.icon && <span>{n.icon}</span>}
                {n.label}
                {getChildren(n.label).length > 0 && <span style={{ fontSize: 10 }}>▾</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="actitle">All Menu Items ({(navLinks||[]).length})</div>

        {topLevel.map(n => (
          <div key={n.id}>
            {/* Top-level item */}
            <div className="arow" style={{ borderLeft: `4px solid ${NAVY}` }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: `${NAVY}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{n.icon || '🔗'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>{n.label}</div>
                <div style={{ fontSize: 12, color: T.t3 }}>{n.path || '(no path)'} {n.isExternal ? '↗' : ''}</div>
              </div>
              <span className="abadge" style={{ background: BG, color: T.t2 }}>Order: {n.order || 0}</span>
              <button className="abtn abtn-outline abtn-sm" onClick={() => { setEditItem(n); setFormData({ label: n.label||'', path: n.path||'', order: n.order||0, icon: n.icon||'', parent: n.parent||'', isExternal: !!n.isExternal }); window.scrollTo({ top:0, behavior:'smooth' }); }}>✏️</button>
              <button className="abtn abtn-red abtn-sm" onClick={() => deleteItem(n)}>🗑️</button>
            </div>

            {/* Children / dropdowns */}
            {getChildren(n.label).map(child => (
              <div key={child.id} className="arow" style={{ marginLeft: 28, borderLeft: `3px dashed ${T.b2}` }}>
                <span style={{ fontSize: 14, color: T.t4 }}>↳</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: T.t1, fontSize: 13 }}>{child.icon && `${child.icon} `}{child.label}</div>
                  <div style={{ fontSize: 11.5, color: T.t3 }}>{child.path}</div>
                </div>
                <span className="abadge" style={{ background: BG, color: T.t3 }}>Order: {child.order || 0}</span>
                <button className="abtn abtn-outline abtn-sm" onClick={() => { setEditItem(child); setFormData({ label: child.label||'', path: child.path||'', order: child.order||0, icon: child.icon||'', parent: child.parent||'', isExternal: !!child.isExternal }); window.scrollTo({ top:0, behavior:'smooth' }); }}>✏️</button>
                <button className="abtn abtn-red abtn-sm" onClick={() => deleteItem(child)}>🗑️</button>
              </div>
            ))}
          </div>
        ))}

        {(navLinks||[]).length === 0 && <div style={{ textAlign: 'center', padding: '30px 0', color: T.t4 }}>Koi menu item nahi hai</div>}
      </div>

      <MiniLog logs={getSectionLog('navLinks')} />
    </div>
  );
}
