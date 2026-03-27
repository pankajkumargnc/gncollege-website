// src/components/admin/tabs/PagesTab.jsx
import React, { useState } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD, WHITE, useLocalDraft, SectionSearch, BulkBar, MiniLog } from '../AdminShared';

export default function PagesTab({ pages, logAct, getSectionLog, softDelete, bulkDelete }) {
  const [activeTab, setActiveTab] = useState('manage'); 
  const [editItem, setEditItem] = useState(null);
  
  const [formData, setFormData, clearDraft] = useLocalDraft('custom_page', {
    title: '', slug: '', content: '', seoTitle: '', seoDesc: '', addToMenu: true // ✅ Naya Checkbox State
  });
  
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (!editItem) { 
      const autoSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData({ ...formData, title: newTitle, slug: autoSlug, seoTitle: newTitle });
    } else {
      setFormData({ ...formData, title: newTitle });
    }
  };

  const save = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) return toast.error("Title aur Slug (URL) zaroori hai!");
    
    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        slug: formData.slug.toLowerCase().replace(/[^a-z0-9\-]/g, ''),
        content: formData.content || '',
        seoTitle: formData.seoTitle || formData.title,
        seoDesc: formData.seoDesc || '',
      };

      if (editItem && editItem.id) {
        // UPDATE EXISTING PAGE
        await updateDoc(doc(db, 'pages', editItem.id), { ...payload, updatedAt: serverTimestamp() });
        toast.success('📝 Page Updated Successfully!');
        logAct?.('update', `Updated Page: ${payload.title}`, 'pages');
      } else {
        // CREATE NEW PAGE
        await addDoc(collection(db, 'pages'), { ...payload, createdAt: serverTimestamp() });
        
        // ✅ AUTO ADD TO "MORE" MENU LOGIC
        if (formData.addToMenu) {
          const navRef = collection(db, 'navigation');
          const qMore = query(navRef, where('label', '==', 'More'));
          const moreSnap = await getDocs(qMore);
          
          let moreMenuId = null;

          if (!moreSnap.empty) {
            // Agar "More" pehle se hai, toh top-level wala dhoondho
            const topMore = moreSnap.docs.find(d => !d.data().parentId);
            moreMenuId = topMore ? topMore.id : moreSnap.docs[0].id;
          } else {
            // Agar nahi hai, toh ek naya "More" Dropdown banao
            const newMore = await addDoc(navRef, {
              label: 'More',
              href: '#',
              parentId: null,
              order: 99, // Sabse last me rakhne ke liye
              icon: '➕',
              isExternal: false,
              createdAt: serverTimestamp()
            });
            moreMenuId = newMore.id;
          }

          // Ab naye page ko us "More" dropdown ke andar add kar do
          await addDoc(navRef, {
            label: payload.title,
            href: `/p/${payload.slug}`,
            parentId: moreMenuId,
            order: 99,
            icon: '📄',
            isExternal: false,
            createdAt: serverTimestamp()
          });
        }

        toast.success(formData.addToMenu ? '🚀 Page Created & Added to Navbar!' : '🚀 Page Created Successfully!');
        logAct?.('add', `Created Page: ${payload.title}`, 'pages');
      }
      
      resetEditor();
      setActiveTab('manage'); 
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  const startEdit = (page) => {
    setEditItem(page);
    setFormData({ 
      title: page.title || '', slug: page.slug || '', content: page.content || '', 
      seoTitle: page.seoTitle || '', seoDesc: page.seoDesc || '', addToMenu: false // Edit mode me iski zaroorat nahi
    });
    setActiveTab('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetEditor = () => {
    setEditItem(null);
    clearDraft();
  };

  const filtered = (pages || []).filter(p =>
    !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.slug?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-up">
      <style>{`
        .pt-tab-btn { padding: 12px 24px; border-radius: 8px 8px 0 0; font-weight: 800; font-size: 14px; cursor: pointer; transition: 0.3s; border: none; background: transparent; color: ${T.t3}; border-bottom: 3px solid transparent; }
        .pt-tab-btn.active { color: ${NAVY}; border-bottom: 3px solid ${GOLD}; background: ${WHITE}; }
        .g-preview { background: #fff; padding: 18px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
        .g-url { color: #202124; font-size: 13px; display: flex; alignItems: center; gap: 8px; margin-bottom: 4px; }
        .g-url span { color: #5f6368; }
        .g-title { color: #1a0dab; font-size: 20px; font-weight: 500; cursor: pointer; line-height: 1.3; margin-bottom: 4px; }
        .g-title:hover { text-decoration: underline; }
        .g-desc { color: #4d5156; font-size: 14px; line-height: 1.58; word-wrap: break-word; }
        .char-count { font-size: 11px; font-weight: 700; margin-top: 4px; display: block; text-align: right; }
        .count-good { color: #16a34a; }
        .count-warn { color: #d97706; }
        .count-err { color: #dc2626; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ fontSize: 32, background: '#fff', padding: 10, borderRadius: 12, boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>📄</div>
        <div>
          <h2 style={{ margin: 0, color: NAVY, fontSize: 24, fontWeight: 900 }}>Pages & SEO (Pro)</h2>
          <p style={{ margin: '4px 0 0', color: T.t3, fontSize: 13, fontWeight: 600 }}>Create custom dynamic pages with advanced SEO optimization</p>
        </div>
      </div>

      {/* ── TAB NAVIGATION ── */}
      <div style={{ display: 'flex', borderBottom: `2px solid #e2e8f0`, marginBottom: 24, gap: 10 }}>
        <button className={`pt-tab-btn ${activeTab === 'manage' ? 'active' : ''}`} onClick={() => { setActiveTab('manage'); resetEditor(); }}>
          📂 Existing Pages ({pages?.length || 0})
        </button>
        <button className={`pt-tab-btn ${activeTab === 'editor' ? 'active' : ''}`} onClick={() => { setActiveTab('editor'); if(!editItem) resetEditor(); }}>
          {editItem ? '✏️ Edit Page' : '✨ Create New Page'}
        </button>
      </div>

      {/* ==========================================
          TAB 1: CREATE / EDIT PAGE (EDITOR)
      =========================================== */}
      {activeTab === 'editor' && (
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
          
          {/* LEFT: CONTENT EDITOR */}
          <div style={{ background: WHITE, padding: 24, borderRadius: 16, border: `2px solid ${editItem ? GOLD : T.b1}`, boxShadow: '0 8px 30px rgba(15,35,71,0.06)' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 16, borderBottom: `1px solid ${T.b1}`, paddingBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
              <span>{editItem ? '✏️ Update Content' : '📝 Page Details'}</span>
              {editItem && <span style={{ fontSize: 11, background: '#fee2e2', color: '#b91c1c', padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }} onClick={resetEditor}>✕ Cancel Edit</span>}
            </div>

            <form id="pageForm" onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 6 }}>Page Title *</label>
                <input type="text" className="ainp" value={formData.title} onChange={handleTitleChange} placeholder="e.g. Placements 2026" required />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 6 }}>URL Path (Slug) *</label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: `1px solid ${T.b1}`, borderRadius: 8, overflow: 'hidden' }}>
                  <span style={{ padding: '0 12px', color: T.t3, fontSize: 13, fontWeight: 600, background: '#e2e8f0', height: '100%', display: 'flex', alignItems: 'center' }}>/p/</span>
                  <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} placeholder="placements-2026" style={{ border: 'none', background: 'transparent', padding: '10px', width: '100%', outline: 'none', fontSize: 14, color: NAVY, fontWeight: 600 }} required />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>Page Content (HTML Supported) *</label>
                  <span style={{ fontSize: 11, color: T.t3 }}>{formData.content?.length || 0} chars</span>
                </div>
                <textarea className="ainp" rows="12" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} placeholder="<h1>Heading</h1><p>Start writing your page content here...</p>" style={{ fontFamily: 'monospace', fontSize: 13, background: '#f8fafc', lineHeight: 1.6 }} required></textarea>
              </div>

              {/* ✅ AUTO MENU LINK CHECKBOX */}
              {!editItem && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f0fdf4', padding: '12px 14px', borderRadius: 8, border: `1px solid #bbf7d0` }}>
                  <input type="checkbox" id="auto-menu" checked={formData.addToMenu} onChange={e => setFormData({ ...formData, addToMenu: e.target.checked })} style={{ width: 18, height: 18, accentColor: '#16a34a' }} />
                  <label htmlFor="auto-menu" style={{ fontSize: 13, fontWeight: 700, color: '#166534', cursor: 'pointer', userSelect: 'none' }}>
                    Automatically add this page to Navbar's "More" menu
                  </label>
                </div>
              )}

              <button type="submit" form="pageForm" className="abtn abtn-navy" style={{ padding: '14px', fontSize: 15, width: '100%', justifyContent: 'center', marginTop: 5 }} disabled={loading}>
                {loading ? 'Saving...' : (editItem ? '✅ Update Custom Page' : '🚀 Publish New Page')}
              </button>
            </form>
          </div>

          {/* RIGHT: SEO & GOOGLE PREVIEW */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ background: WHITE, padding: 24, borderRadius: 16, border: `1px solid ${T.b1}`, boxShadow: '0 8px 30px rgba(15,35,71,0.06)' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 16, borderBottom: `1px solid ${T.b1}`, paddingBottom: 10 }}>
                🔍 SEO Optimizer
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 6 }}>Meta Title</label>
                  <input type="text" className="ainp" value={formData.seoTitle} onChange={e => setFormData({ ...formData, seoTitle: e.target.value })} placeholder="Title for Google Search" />
                  <span className={`char-count ${formData.seoTitle?.length > 60 ? 'count-err' : (formData.seoTitle?.length > 40 ? 'count-good' : 'count-warn')}`}>
                    {formData.seoTitle?.length || 0} / 60 (Optimal: 40-60)
                  </span>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 6 }}>Meta Description</label>
                  <textarea className="ainp" rows="3" value={formData.seoDesc} onChange={e => setFormData({ ...formData, seoDesc: e.target.value })} placeholder="Brief description to attract visitors on Google..."></textarea>
                  <span className={`char-count ${formData.seoDesc?.length > 160 ? 'count-err' : (formData.seoDesc?.length > 120 ? 'count-good' : 'count-warn')}`}>
                    {formData.seoDesc?.length || 0} / 160 (Optimal: 120-160)
                  </span>
                </div>
              </div>
            </div>

            {/* LIVE GOOGLE PREVIEW WIDGET */}
            <div style={{ background: '#f8fafc', padding: '24px 20px', borderRadius: 16, border: `1px dashed #cbd5e1` }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
                Live Search Preview
              </div>
              <div className="g-preview">
                <div className="g-url">
                  <div style={{ background: '#e2e8f0', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🌐</div>
                  <div>
                    <div style={{ color: '#202124', fontSize: 14 }}>Guru Nanak College</div>
                    <div style={{ color: '#4d5156', fontSize: 12 }}>https://gnccollege.ac.in › p › {formData.slug || 'page-slug'}</div>
                  </div>
                </div>
                <div className="g-title">{formData.seoTitle || formData.title || 'Your Page Title Will Appear Here'}</div>
                <div className="g-desc">{formData.seoDesc || 'Provide a meta description in the SEO optimizer above to see how it looks to users searching on Google.'}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 2: MANAGE EXISTING PAGES (LIST)
      =========================================== */}
      {activeTab === 'manage' && (
        <div className="fade-up">
          <SectionSearch value={search} onChange={setSearch} placeholder="Search pages by title or URL..." />
          <BulkBar count={selected.length} onDelete={() => { bulkDelete('pages', selected); setSelected([]); }} onClear={() => setSelected([])} />

          <div className="card">
            <div className="actitle">All Custom Pages ({filtered.length})</div>
            {filtered.map(page => {
              const isSeoGood = page.seoDesc?.length > 100 && page.seoTitle?.length > 0;
              
              return (
                <div key={page.id} className={`arow ${selected.includes(page.id) ? 'selected' : ''}`} style={{ alignItems: 'center' }}>
                  <input type="checkbox" checked={selected.includes(page.id)} onChange={() => setSelected(s => s.includes(page.id) ? s.filter(x => x !== page.id) : [...s, page.id])} style={{ accentColor: NAVY }} />
                  
                  <div style={{ background: '#f1f5f9', width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>📄</div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, color: NAVY, fontSize: 15 }}>{page.title}</span>
                      {isSeoGood ? 
                        <span style={{ fontSize: 10, background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>SEO: Good</span> :
                        <span style={{ fontSize: 10, background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>SEO: Needs Work</span>
                      }
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ background: '#e2e8f0', color: '#475569', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, fontFamily: 'monospace' }}>/p/{page.slug}</span>
                      <span style={{ fontSize: 11, color: T.t3 }}>• Updated: {page.updatedAt?.toDate()?.toLocaleDateString() || 'Recently'}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <a href={`${import.meta.env.BASE_URL}#/p/${page.slug}`} target="_blank" rel="noreferrer" className="abtn abtn-outline abtn-sm" style={{ textDecoration: 'none' }}>👁️ View</a>
                    <button className="abtn abtn-navy abtn-sm" onClick={() => startEdit(page)}>✏️ Edit</button>
                    <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('pages', page.id, page, page.title)}>🗑️</button>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 0', color: T.t4 }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>📭</div>
                <h3 style={{ margin: '0 0 5px', color: NAVY }}>No Pages Found</h3>
                <p style={{ margin: 0, fontSize: 13 }}>'Create New Page' tab par jaakar apna pehla page banayein.</p>
              </div>
            )}
          </div>
          <MiniLog logs={getSectionLog('pages')} />
        </div>
      )}
    </div>
  );
}