// src/components/admin/tabs/MenuBuilderTab.jsx
import React, { useState, useEffect } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD, WHITE } from '../AdminShared';

// 🌐 Default Standard Website Routes
const STANDARD_ROUTES = [
  { path: '/', label: '🏠 Home Page' },
  { path: '/about-us/college-profile', label: '🏢 About - College Profile' },
  { path: '/about-us/leadership', label: '👨‍💼 About - Leadership' },
  { path: '/academics/course-offered', label: '📚 Academics - Courses Offered' },
  { path: '/academics/departments', label: '🏫 Academics - All Departments' },
  { path: '/admission/info', label: '🎓 Admission - Info' },
  { path: '/admission/fee-structure', label: '💳 Admission - Fee Structure' },
  { path: '/events', label: '🏆 Campus Events' },
  { path: '/gallery', label: '📸 Photo Gallery' },
  { path: '/video-gallery', label: '🎬 Video Gallery' },
  { path: '/contact', label: '📞 Contact Us' },
  { path: '#', label: '🚫 No Link (Dropdown Only)' }
];

export default function MenuBuilderTab({ logAct }) {
  const [menus, setMenus] = useState([]);
  const [customPages, setCustomPages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    label: '',
    href: '',
    parentId: '',
    order: 0,
    icon: '', // ✅ NEW: Emoji/Icon support
    isExternal: false // ✅ NEW: Open in new tab
  });

  // 1. Fetch Menus & Custom Pages
  useEffect(() => {
    const qMenu = query(collection(db, 'navigation'), orderBy('order', 'asc'));
    const unsubMenu = onSnapshot(qMenu, snap => {
      setMenus(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const qPages = query(collection(db, 'pages'), orderBy('createdAt', 'desc'));
    const unsubPages = onSnapshot(qPages, snap => {
      setCustomPages(snap.docs.map(d => ({ id: d.id, slug: d.data().slug, title: d.data().title })));
    });

    return () => { unsubMenu(); unsubPages(); };
  }, []);

  // 2. Save / Update Menu Item
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.label || !formData.href) return toast.error('Label and URL are required!');
    
    setLoading(true);
    try {
      const payload = {
        label: formData.label,
        href: formData.href,
        parentId: formData.parentId || null,
        order: Number(formData.order) || 0,
        icon: formData.icon || '',
        isExternal: formData.isExternal || false
      };

      if (editId) {
        await updateDoc(doc(db, 'navigation', editId), { ...payload, updatedAt: serverTimestamp() });
        toast.success('Menu Updated!');
      } else {
        // Auto-assign order if not provided manually
        if (payload.order === 0) {
          const siblings = menus.filter(m => m.parentId === payload.parentId);
          payload.order = siblings.length > 0 ? Math.max(...siblings.map(s => s.order || 0)) + 1 : 1;
        }
        await addDoc(collection(db, 'navigation'), { ...payload, createdAt: serverTimestamp() });
        toast.success('Menu Added!');
      }
      resetForm();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  // 3. Delete Menu Item
  const handleDelete = async (id, label) => {
    if (menus.some(m => m.parentId === id)) return toast.error('Pehle iske andar ke sub-menus delete karein!');
    if (!window.confirm(`Are you sure you want to delete "${label}"?`)) return;
    
    try {
      await deleteDoc(doc(db, 'navigation', id));
      toast.success('Deleted!');
      if (editId === id) resetForm();
    } catch (err) { toast.error(err.message); }
  };

  // ✅ 4. ONE-CLICK REORDER LOGIC (Up/Down Arrows)
  const handleMove = async (item, direction) => {
    const siblings = menus.filter(m => (m.parentId || null) === (item.parentId || null)).sort((a, b) => (a.order||0) - (b.order||0));
    const currentIndex = siblings.findIndex(m => m.id === item.id);
    
    if (direction === 'up' && currentIndex > 0) {
      const prevItem = siblings[currentIndex - 1];
      await updateDoc(doc(db, 'navigation', item.id), { order: prevItem.order || currentIndex - 1 });
      await updateDoc(doc(db, 'navigation', prevItem.id), { order: item.order || currentIndex });
    } else if (direction === 'down' && currentIndex < siblings.length - 1) {
      const nextItem = siblings[currentIndex + 1];
      await updateDoc(doc(db, 'navigation', item.id), { order: nextItem.order || currentIndex + 1 });
      await updateDoc(doc(db, 'navigation', nextItem.id), { order: item.order || currentIndex });
    }
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({ label: '', href: '', parentId: '', order: 0, icon: '', isExternal: false });
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({
      label: item.label, href: item.href, parentId: item.parentId || '',
      order: item.order || 0, icon: item.icon || '', isExternal: item.isExternal || false
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const topLevelMenus = menus.filter(m => !m.parentId).sort((a, b) => (a.order||0) - (b.order||0));
  const getChildren = (parentId) => menus.filter(m => m.parentId === parentId).sort((a, b) => (a.order||0) - (b.order||0));

  const parentOptions = [];
  topLevelMenus.forEach(top => {
    parentOptions.push({ id: top.id, label: top.label, level: 0 });
    getChildren(top.id).forEach(sub => {
      parentOptions.push({ id: sub.id, label: `${top.label} > ${sub.label}`, level: 1 });
    });
  });

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ fontSize: 28 }}>⚡</div>
        <div>
          <h2 style={{ margin: 0, color: NAVY, fontSize: 22, fontWeight: 900 }}>Pro Menu Builder</h2>
          <p style={{ margin: '4px 0 0', color: T.t3, fontSize: 13, fontWeight: 500 }}>Advanced routing, ordering and visual tree management</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, alignItems: 'start' }}>
        
        {/* ── LEFT: ADVANCED FORM ── */}
        <div style={{ background: WHITE, padding: 24, borderRadius: 16, border: `2px solid ${editId ? GOLD : T.b1}`, boxShadow: editId ? '0 0 20px rgba(244,160,35,0.15)' : '0 4px 15px rgba(0,0,0,0.05)', position: 'sticky', top: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 16, borderBottom: `1px solid ${T.b1}`, paddingBottom: 10 }}>
            {editId ? '✏️ Update Navigation Item' : '➕ Add New Link'}
          </div>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ width: '80px' }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 6 }}>Icon 😃</label>
                <input type="text" className="ainp" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} placeholder="🎓" style={{ textAlign: 'center' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 6 }}>Menu Label Name *</label>
                <input type="text" className="ainp" value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} placeholder="e.g. Admission" required />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 6 }}>URL / Page Path *</label>
              <input list="url-suggestions" className="ainp" value={formData.href} onChange={e => setFormData({...formData, href: e.target.value})} placeholder="/p/your-page OR https://..." required />
              <datalist id="url-suggestions">
                {STANDARD_ROUTES.map((route, i) => <option key={`std-${i}`} value={route.path}>{route.label}</option>)}
                {customPages.map(page => <option key={page.id} value={`/p/${page.slug}`}>📄 Custom: {page.title}</option>)}
              </datalist>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f8fafc', padding: '10px 14px', borderRadius: 8, border: `1px solid ${T.b1}` }}>
              <input type="checkbox" id="ext-link" checked={formData.isExternal} onChange={e => setFormData({...formData, isExternal: e.target.checked})} style={{ width: 18, height: 18, accentColor: NAVY }} />
              <label htmlFor="ext-link" style={{ fontSize: 13, fontWeight: 600, color: NAVY, cursor: 'pointer', userSelect: 'none' }}>Open link in New Tab (↗)</label>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 6 }}>Assign Parent (For Dropdown)</label>
              <select className="ainp" value={formData.parentId} onChange={e => setFormData({...formData, parentId: e.target.value})}>
                <option value="">🌟 Main Top Level Link</option>
                {parentOptions.map(opt => (
                  <option key={opt.id} value={opt.id} disabled={opt.id === editId}>
                    {opt.level === 1 ? '\u00A0\u00A0\u00A0\u00A0 ↳ ' : ''}{opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" className="abtn abtn-navy" style={{ flex: 1, justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Saving...' : (editId ? '✅ Update Menu' : '🚀 Save Menu')}
              </button>
              {editId && <button type="button" className="abtn abtn-outline" onClick={resetForm}>Cancel</button>}
            </div>
          </form>
        </div>

        {/* ── RIGHT: VISUAL TREE BUILDER ── */}
        <div style={{ background: WHITE, padding: 24, borderRadius: 16, border: `1px solid ${T.b1}`, boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: `1px solid ${T.b1}`, paddingBottom: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: NAVY }}>🗂️ Live Tree Structure</span>
            <span style={{ fontSize: 11, color: T.t3, background: '#f1f5f9', padding: '4px 10px', borderRadius: 20 }}>Drag arrows to reorder</span>
          </div>

          {menus.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: T.t3, fontSize: 14 }}>Start building your menu!</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {topLevelMenus.map((topItem, idx, arr) => (
                <div key={topItem.id}>
                  {/* Top Level Item */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '10px 14px', borderRadius: 8, border: `1px solid ${T.b1}`, borderLeft: `4px solid ${NAVY}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {/* Reorder Arrows */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <button onClick={() => handleMove(topItem, 'up')} disabled={idx===0} style={{ border:'none', background:'none', cursor:idx===0?'not-allowed':'pointer', opacity:idx===0?0.3:1, fontSize:12, padding:0 }} aria-label="Move up">▲</button>
                        <button onClick={() => handleMove(topItem, 'down')} disabled={idx===arr.length-1} style={{ border:'none', background:'none', cursor:idx===arr.length-1?'not-allowed':'pointer', opacity:idx===arr.length-1?0.3:1, fontSize:12, padding:0 }} aria-label="Move down">▼</button>
                      </div>
                      <span style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>{topItem.icon} {topItem.label}</span>
                      {topItem.isExternal && <span style={{ fontSize: 10, background: '#fee2e2', color: '#b91c1c', padding: '2px 6px', borderRadius: 4, fontWeight: 800 }}>↗ EXT</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => handleEdit(topItem)} style={{ background: '#e2e8f0', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>✏️ Edit</button>
                      <button onClick={() => handleDelete(topItem.id, topItem.label)} style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: 4, fontSize: 12 }} aria-label="Delete menu item">🗑️</button>
                    </div>
                  </div>

                  {/* Level 1 */}
                  {getChildren(topItem.id).map((subItem, sIdx, sArr) => (
                    <div key={subItem.id} style={{ marginLeft: 30, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>
                      <div style={{ position: 'absolute', left: -16, top: -10, bottom: 20, width: 2, background: '#cbd5e1' }}></div>
                      <div style={{ position: 'absolute', left: -16, top: 16, width: 14, height: 2, background: '#cbd5e1' }}></div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '8px 12px', borderRadius: 8, border: `1px solid #e2e8f0` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <button onClick={() => handleMove(subItem, 'up')} disabled={sIdx===0} style={{ border:'none', background:'none', cursor:sIdx===0?'not-allowed':'pointer', opacity:sIdx===0?0.3:1, fontSize:10, padding:0 }} aria-label="Move sub-item up">▲</button>
                            <button onClick={() => handleMove(subItem, 'down')} disabled={sIdx===sArr.length-1} style={{ border:'none', background:'none', cursor:sIdx===sArr.length-1?'not-allowed':'pointer', opacity:sIdx===sArr.length-1?0.3:1, fontSize:10, padding:0 }} aria-label="Move sub-item down">▼</button>
                          </div>
                          <span style={{ fontWeight: 600, color: '#334155', fontSize: 13 }}>{subItem.icon} {subItem.label}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button onClick={() => handleEdit(subItem)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }} aria-label="Edit sub-item">✏️</button>
                          <button onClick={() => handleDelete(subItem.id, subItem.label)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }} aria-label="Delete sub-item">🗑️</button>
                        </div>
                      </div>

                      {/* Level 2 */}
                      {getChildren(subItem.id).map((subSubItem, ssIdx, ssArr) => (
                        <div key={subSubItem.id} style={{ marginLeft: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa', padding: '6px 12px', borderRadius: 6, border: `1px solid #f1f5f9`, position: 'relative' }}>
                          <div style={{ position: 'absolute', left: -16, top: -8, bottom: 15, width: 1, background: '#e2e8f0' }}></div>
                          <div style={{ position: 'absolute', left: -16, top: 14, width: 14, height: 1, background: '#e2e8f0' }}></div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                              <button onClick={() => handleMove(subSubItem, 'up')} disabled={ssIdx===0} style={{ border:'none', background:'none', cursor:ssIdx===0?'not-allowed':'pointer', opacity:ssIdx===0?0.3:1, fontSize:9, padding:0 }} aria-label="Move item up">▲</button>
                              <button onClick={() => handleMove(subSubItem, 'down')} disabled={ssIdx===ssArr.length-1} style={{ border:'none', background:'none', cursor:ssIdx===ssArr.length-1?'not-allowed':'pointer', opacity:ssIdx===ssArr.length-1?0.3:1, fontSize:9, padding:0 }} aria-label="Move item down">▼</button>
                            </div>
                            <span style={{ fontWeight: 500, color: '#64748b', fontSize: 12 }}>{subSubItem.icon} {subSubItem.label}</span>
                          </div>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button onClick={() => handleEdit(subSubItem)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }} aria-label="Edit item">✏️</button>
                            <button onClick={() => handleDelete(subSubItem.id, subSubItem.label)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }} aria-label="Delete item">🗑️</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}