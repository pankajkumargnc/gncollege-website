// src/components/admin/tabs/MenuBuilderTab.jsx
import React, { useState, useEffect } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD, WHITE } from '../AdminShared';
import { clearCache } from '../../../utils/cachedFetch';

// 🌐 Default Standard Website Routes (Comprehensive College Sitemap)
const STANDARD_ROUTES = [
  { path: '/', label: '🏠 Home Page' },
  // Sikh Heritage & About
  { path: '/about-us/sikh-heritage', label: '☬ About - Sikh Heritage Hub (Divine)' },
  { path: '/about-us/principal-message', label: '👨‍💼 About - Principal Message' },
  { path: '/about-us/vision-mission', label: '🎯 About - Vision & Mission' },
  { path: '/about-us/college-profile', label: '🏢 About - College Profile' },
  { path: '/about-us/college-management/principal', label: '🏛️ Management - Principal Desk' },
  { path: '/about-us/college-management/organogram', label: '📊 Management - Organogram' },
  { path: '/about-us/college-management/presidents', label: '📜 Management - Presidents' },
  { path: '/about-us/college-management/secretaries', label: '✍️ Management - Secretaries' },
  { path: '/about-us/college-staff/teaching-staff', label: '👨‍🏫 Staff - Teaching Faculty' },
  { path: '/about-us/college-staff/non-teaching-staff', label: '👥 Staff - Non-Teaching Staff' },
  // Committees
  { path: '/about-us/various-committees/placement', label: '💼 Committee - Placement Cell' },
  { path: '/about-us/various-committees/womens-cell', label: '👩 Committee - Women\'s Cell' },
  { path: '/about-us/various-committees/grievance', label: '⚖️ Committee - Grievance Redressal' },
  { path: '/about-us/various-committees/anti-ragging', label: '🛡️ Committee - Anti-Ragging' },
  { path: '/about-us/various-committees/sc-st', label: '🤝 Committee - SC / ST Cell' },
  { path: '/about-us/various-committees/obc', label: '🤝 Committee - OBC Cell' },
  { path: '/about-us/various-committees/icc', label: '⚖️ Committee - ICC' },
  { path: '/about-us/various-committees/minority', label: '☬ Committee - Minority Cell' },
  { path: '/about-us/various-committees/rusa', label: '🏛️ Committee - RUSA' },
  // Regulations
  { path: '/about-us/regulations/fyugp-nep', label: '📜 Regulations - BBMKU FYUGP (NEP)' },
  { path: '/about-us/regulations/bbmku-ug', label: '📜 Regulations - BBMKU UG (CBCS)' },
  { path: '/about-us/regulations/bbmku-circular', label: '📜 Regulations - BBMKU Circulars' },
  { path: '/about-us/regulations/college-affiliation', label: '📜 Regulations - Affiliation Paper' },
  { path: '/about-us/regulations/ugc-certificate', label: '📜 Regulations - UGC 2(f) & 12(B)' },
  { path: '/about-us/regulations/vbu-bca', label: '📜 Regulations - VBU BCA' },
  { path: '/about-us/regulations/vbu-ug', label: '📜 Regulations - VBU UG 2015' },
  { path: '/about-us/regulations/college-byelaws', label: '📜 Regulations - College ByeLaws' },
  { path: '/about-us/regulations/minority-exemption', label: '📜 Regulations - Minority Exemption' },
  // Academics
  { path: '/academics/departments/bca', label: '💻 Academics - BCA Department' },
  { path: '/academics/departments/bba', label: '📈 Academics - BBA Department' },
  { path: '/academics/departments/commerce', label: '📊 Academics - Commerce Dept' },
  { path: '/academics/departments/social-science', label: '🌍 Academics - Social Science' },
  { path: '/academics/departments/humanities', label: '📖 Academics - Humanities' },
  { path: '/academics/course-offered', label: '📚 Academics - Courses Offered' },
  { path: '/academics/academic-calendar', label: '📅 Academics - Academic Calendar' },
  { path: '/syllabus', label: '📝 Academics - Syllabus' },
  { path: '/academics/iqac', label: '🏅 Academics - IQAC Cell' },
  { path: '/academics/placements', label: '💼 Academics - Placements' },
  // Admission
  { path: '/admission/notification/latest', label: '⚡ Admission - Latest Notices' },
  { path: '/admission/notification/upcoming', label: '⚡ Admission - Upcoming News' },
  { path: '/admission/fee-structure', label: '💳 Admission - Fee Structure' },
  { path: '/admission/rule', label: '📋 Admission - Admission Rules' },
  { path: '/admission/document-required', label: '📁 Admission - Documents Required' },
  { path: '/admission/intake-capacity', label: '🔢 Admission - Intake Capacity' },
  { path: '/scholarships', label: '🎓 Admission - Scholarships & Aid' },
  // NAAC
  { path: '/naac/ssr-2nd-cycle/cycle-2-documents', label: '🏅 NAAC - SSR 2nd Cycle' },
  { path: '/naac/ssr-2nd-cycle/executive-summary', label: '🏅 NAAC - Executive Summary' },
  { path: '/naac/ssr-1st-cycle/cycle-1-documents', label: '🏅 NAAC - SSR 1st Cycle' },
  { path: '/naac/ssr-1st-cycle/peer-team-report', label: '🏅 NAAC - Peer Team Report' },
  { path: '/naac/aqar', label: '📜 NAAC - AQAR Reports' },
  { path: '/naac/nirf', label: '🏆 NAAC - NIRF' },
  { path: '/naac/perspective-plan', label: '🎯 NAAC - Perspective Plan' },
  // Activities
  { path: '/activity/nss', label: '🌟 Activity - NSS Unit' },
  { path: '/activity/ncc', label: '🎖️ Activity - NCC Wing' },
  { path: '/activity/workshop', label: '💡 Activity - Workshops' },
  { path: '/activity/games-sports', label: '⚽ Activity - Games & Sports' },
  { path: '/activity/collaboration/rotaract-club', label: '🤝 Activity - Rotaract Club' },
  { path: '/activity/collaboration/sadbhavana-diwas', label: '🕊️ Activity - Sadbhavana Diwas' },
  // Publications
  { path: '/publication/examination-results/2024', label: '📊 Publication - Results 2024' },
  { path: '/publication/examination-results/2023', label: '📊 Publication - Results 2023' },
  { path: '/publication/college-library', label: '📚 Publication - College Library' },
  { path: '/publication/e-magazine', label: '📰 Publication - E-Magazine' },
  { path: '/publication/sss-report/2023-24', label: '📋 Publication - SSS 2023-24' },
  { path: '/publication/sss-report/2022-23', label: '📋 Publication - SSS 2022-23' },
  // Campus & Media
  { path: '/campus/infrastructure', label: '🏛️ Campus - Infrastructure' },
  { path: '/campus/classroom', label: '🖥️ Campus - Classrooms' },
  { path: '/campus/ict-rooms', label: '📡 Campus - ICT Rooms' },
  { path: '/campus/green-campus', label: '🌿 Campus - Green Campus' },
  { path: '/campus/visuals/bhuda', label: '📸 Campus - Bhuda Boys Wing' },
  { path: '/campus/visuals/bank-more', label: '📸 Campus - Bank More Girls Wing' },
  { path: '/campus/visuals/vocational-building', label: '🏢 Campus - Vocational IT Wing' },
  { path: '/gallery', label: '📸 Photo Gallery' },
  { path: '/gallery/videos', label: '🎬 Video Gallery' },
  { path: '/events', label: '🏆 Campus Events' },
  { path: '/news', label: '📰 News & Circulars' },
  { path: '/notifications', label: '📢 Notices' },
  { path: '/contact', label: '📞 Contact Us' },
  { path: '#', label: '🚫 No Link (Dropdown Menu Header Only)' }
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
    icon: '',
    badge: '',
    badgeColor: 'gold',
    subtitle: '',
    isExternal: false,
    isActive: true
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

  // ⚡ Cache-Buster & Global Live Synchronizer
  const triggerSync = () => {
    clearCache('navigation');
  };

  // 2. Save / Update Menu Item
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.label || !formData.href) return toast.error('Label and URL are required!');
    
    setLoading(true);
    try {
      const payload = {
        label: formData.label.trim(),
        href: formData.href.trim(),
        parentId: formData.parentId || null,
        order: Number(formData.order) || 0,
        icon: formData.icon?.trim() || '',
        badge: formData.badge?.trim() || '',
        badgeColor: formData.badgeColor || 'gold',
        subtitle: formData.subtitle?.trim() || '',
        isExternal: Boolean(formData.isExternal),
        isActive: formData.isActive !== false
      };

      if (editId) {
        await updateDoc(doc(db, 'navigation', editId), { ...payload, updatedAt: serverTimestamp() });
        toast.success('Menu Updated & Synced!');
        logAct?.('update', `Updated Menu: ${payload.label}`, 'navigation');
      } else {
        // Auto-assign order if not provided manually
        if (payload.order === 0) {
          const siblings = menus.filter(m => m.parentId === payload.parentId);
          payload.order = siblings.length > 0 ? Math.max(...siblings.map(s => s.order || 0)) + 1 : 1;
        }
        await addDoc(collection(db, 'navigation'), { ...payload, createdAt: serverTimestamp() });
        toast.success('Menu Added & Live Synced!');
        logAct?.('add', `Added Menu: ${payload.label}`, 'navigation');
      }
      triggerSync();
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
      triggerSync();
      toast.success('Deleted & Synced!');
      logAct?.('delete', `Deleted Menu: ${label}`, 'navigation');
      if (editId === id) resetForm();
    } catch (err) { toast.error(err.message); }
  };

  // 4. Quick Visibility Toggle (Active / Hidden)
  const handleToggleActive = async (item) => {
    const nextState = item.isActive === false ? true : false;
    try {
      await updateDoc(doc(db, 'navigation', item.id), { isActive: nextState, updatedAt: serverTimestamp() });
      triggerSync();
      toast.success(nextState ? `"${item.label}" is now visible` : `"${item.label}" is now hidden`);
    } catch (err) { toast.error(err.message); }
  };

  // 5. Quick Duplicate
  const handleDuplicate = (item) => {
    setEditId(null);
    setFormData({
      label: `${item.label} (Copy)`,
      href: item.href,
      parentId: item.parentId || '',
      order: (item.order || 0) + 1,
      icon: item.icon || '',
      badge: item.badge || '',
      badgeColor: item.badgeColor || 'gold',
      subtitle: item.subtitle || '',
      isExternal: item.isExternal || false,
      isActive: true
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.success('Duplicated to editor! Adjust and click Save.');
  };

  // 6. ONE-CLICK REORDER LOGIC (Up/Down Arrows)
  const handleMove = async (item, direction) => {
    const siblings = menus.filter(m => (m.parentId || null) === (item.parentId || null)).sort((a, b) => (a.order||0) - (b.order||0));
    const currentIndex = siblings.findIndex(m => m.id === item.id);
    
    if (direction === 'up' && currentIndex > 0) {
      const prevItem = siblings[currentIndex - 1];
      await updateDoc(doc(db, 'navigation', item.id), { order: prevItem.order || currentIndex - 1 });
      await updateDoc(doc(db, 'navigation', prevItem.id), { order: item.order || currentIndex });
      triggerSync();
    } else if (direction === 'down' && currentIndex < siblings.length - 1) {
      const nextItem = siblings[currentIndex + 1];
      await updateDoc(doc(db, 'navigation', item.id), { order: nextItem.order || currentIndex + 1 });
      await updateDoc(doc(db, 'navigation', nextItem.id), { order: item.order || currentIndex });
      triggerSync();
    }
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      label: '', href: '', parentId: '', order: 0, icon: '',
      badge: '', badgeColor: 'gold', subtitle: '', isExternal: false, isActive: true
    });
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({
      label: item.label,
      href: item.href,
      parentId: item.parentId || '',
      order: item.order || 0,
      icon: item.icon || '',
      badge: item.badge || '',
      badgeColor: item.badgeColor || 'gold',
      subtitle: item.subtitle || '',
      isExternal: item.isExternal || false,
      isActive: item.isActive !== false
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const topLevelMenus = menus.filter(m => !m.parentId).sort((a, b) => (a.order||0) - (b.order||0));
  const getChildren = (parentId) => menus.filter(m => m.parentId === parentId).sort((a, b) => (a.order||0) - (b.order||0));

  // ── 3-LEVEL RECURSIVE PARENT SELECTOR ──
  const parentOptions = [];
  topLevelMenus.forEach(top => {
    parentOptions.push({ id: top.id, label: top.label, level: 0 });
    getChildren(top.id).forEach(sub => {
      parentOptions.push({ id: sub.id, label: `${top.label} > ${sub.label}`, level: 1 });
      getChildren(sub.id).forEach(subSub => {
        parentOptions.push({ id: subSub.id, label: `${top.label} > ${sub.label} > ${subSub.label}`, level: 2 });
      });
    });
  });

  const getBadgeStyle = (color) => {
    switch (color) {
      case 'red': return { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5' };
      case 'green': return { bg: '#dcfce7', text: '#15803d', border: '#86efac' };
      case 'blue': return { bg: '#dbeafe', text: '#1d4ed8', border: '#93c5fd' };
      case 'purple': return { bg: '#f3e8ff', text: '#7e22ce', border: '#d8b4fe' };
      default: return { bg: '#fef3c7', text: '#b45309', border: '#fcd34d' };
    }
  };

  return (
    <div className="fade-up">
      {/* ── HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 28, background: '#fff', padding: 8, borderRadius: 12, boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>🧭</div>
          <div>
            <h2 style={{ margin: 0, color: NAVY, fontSize: 22, fontWeight: 900 }}>Menu & Mega-Navigation Builder</h2>
            <p style={{ margin: '4px 0 0', color: T.t3, fontSize: 13, fontWeight: 500 }}>
              Full 3-level recursive hierarchy, Mega-Menu badges, and instant cache-busting
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={triggerSync}
          className="abtn abtn-outline abtn-sm"
          style={{ background: '#fff', border: `1px solid ${GOLD}`, color: NAVY, fontWeight: 700 }}
          title="Force-clear browser navigation cache"
        >
          ⚡ Force Instant Sync
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))', gap: 24, alignItems: 'start' }}>
        
        {/* ── LEFT: ADVANCED FORM ── */}
        <div style={{
          background: WHITE,
          padding: 24,
          borderRadius: 16,
          border: `2px solid ${editId ? GOLD : T.b1}`,
          boxShadow: editId ? '0 0 20px rgba(244,160,35,0.15)' : '0 4px 15px rgba(0,0,0,0.05)',
          position: 'sticky',
          top: 20
        }}>
          <div style={{
            fontSize: 16,
            fontWeight: 800,
            color: NAVY,
            marginBottom: 16,
            borderBottom: `1px solid ${T.b1}`,
            paddingBottom: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{editId ? '✏️ Update Navigation Item' : '➕ Add Navigation Link'}</span>
            {editId && (
              <span
                style={{ fontSize: 11, color: '#dc2626', cursor: 'pointer', fontWeight: 700 }}
                onClick={resetForm}
              >
                ✕ Cancel Edit
              </span>
            )}
          </div>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            
            {/* Row 1: Icon & Label */}
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ width: '75px' }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 5 }}>Icon / Emoji</label>
                <input
                  type="text"
                  className="ainp"
                  value={formData.icon}
                  onChange={e => setFormData({...formData, icon: e.target.value})}
                  placeholder="☬"
                  style={{ textAlign: 'center', fontSize: 16 }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 5 }}>Menu Label *</label>
                <input
                  type="text"
                  className="ainp"
                  value={formData.label}
                  onChange={e => setFormData({...formData, label: e.target.value})}
                  placeholder="e.g. Sikh Heritage Hub"
                  required
                />
              </div>
            </div>

            {/* Row 2: Subtitle / Description */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 5 }}>
                Mega-Menu Subtitle <span style={{ color: T.t3, fontWeight: 500 }}>(Optional description)</span>
              </label>
              <input
                type="text"
                className="ainp"
                value={formData.subtitle}
                onChange={e => setFormData({...formData, subtitle: e.target.value})}
                placeholder="e.g. NCMEI minority status & 50% reservation quota"
              />
            </div>

            {/* Row 3: URL Path with Suggestions */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 5 }}>URL Path / Page Route *</label>
              <input
                list="url-suggestions"
                className="ainp"
                value={formData.href}
                onChange={e => setFormData({...formData, href: e.target.value})}
                placeholder="/about-us/sikh-heritage OR /p/page-slug OR #"
                required
              />
              <datalist id="url-suggestions">
                {STANDARD_ROUTES.map((route, i) => (
                  <option key={`std-${i}`} value={route.path}>{route.label}</option>
                ))}
                {customPages.map(page => (
                  <option key={page.id} value={`/p/${page.slug}`}>📄 Custom: {page.title}</option>
                ))}
              </datalist>
            </div>

            {/* Row 4: Badge & Badge Color */}
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 5 }}>Badge Tag (e.g. NEW, DIVINE)</label>
                <input
                  type="text"
                  className="ainp"
                  value={formData.badge}
                  onChange={e => setFormData({...formData, badge: e.target.value.toUpperCase()})}
                  placeholder="DIVINE"
                  maxLength={12}
                />
              </div>
              <div style={{ width: '120px' }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 5 }}>Badge Color</label>
                <select
                  className="ainp"
                  value={formData.badgeColor}
                  onChange={e => setFormData({...formData, badgeColor: e.target.value})}
                >
                  <option value="gold">Gold</option>
                  <option value="green">Green</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="purple">Purple</option>
                </select>
              </div>
            </div>

            {/* Row 5: 3-Level Parent Selector */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 5 }}>
                Hierarchy Placement (Parent Dropdown)
              </label>
              <select
                className="ainp"
                value={formData.parentId}
                onChange={e => setFormData({...formData, parentId: e.target.value})}
              >
                <option value="">🌟 Main Top-Level Bar Link</option>
                {parentOptions.map(opt => (
                  <option key={opt.id} value={opt.id} disabled={opt.id === editId}>
                    {opt.level === 0 ? '📁 ' : (opt.level === 1 ? '  ↳ 📂 ' : '    ↳ 📄 ')}
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 6: Toggles (External Link & Active Visibility) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <label style={{
                display: 'flex', alignItems: 'center', gap: 8, background: '#f8fafc',
                padding: '9px 12px', borderRadius: 8, border: `1px solid ${T.b1}`, cursor: 'pointer', fontSize: 12, fontWeight: 600, color: NAVY
              }}>
                <input
                  type="checkbox"
                  checked={formData.isExternal}
                  onChange={e => setFormData({...formData, isExternal: e.target.checked})}
                  style={{ accentColor: NAVY }}
                />
                <span>Open in Tab (↗)</span>
              </label>

              <label style={{
                display: 'flex', alignItems: 'center', gap: 8, background: '#f0fdf4',
                padding: '9px 12px', borderRadius: 8, border: '1px solid #bbf7d0', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#166534'
              }}>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={e => setFormData({...formData, isActive: e.target.checked})}
                  style={{ accentColor: '#16a34a' }}
                />
                <span>Visible in Menu</span>
              </label>
            </div>

            {/* Submit & Reset Buttons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
              <button
                type="submit"
                className="abtn abtn-navy"
                style={{ flex: 1, justifyContent: 'center', padding: '12px', fontWeight: 800 }}
                disabled={loading}
              >
                {loading ? 'Saving & Syncing...' : (editId ? '✅ Update & Sync Menu' : '🚀 Publish Link to Navbar')}
              </button>
              {editId && (
                <button type="button" className="abtn abtn-outline" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ── RIGHT: VISUAL TREE BUILDER ── */}
        <div style={{ background: WHITE, padding: 24, borderRadius: 16, border: `1px solid ${T.b1}`, boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: `1px solid ${T.b1}`, paddingBottom: 10 }}>
            <div>
              <span style={{ fontSize: 16, fontWeight: 800, color: NAVY }}>🗂️ Live Menu Tree ({menus.length} Links)</span>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: T.t3 }}>Changes sync live across all visitors instantly</p>
            </div>
            <span style={{ fontSize: 11, color: T.t3, background: '#f1f5f9', padding: '4px 10px', borderRadius: 20 }}>
              Use ▲ / ▼ to reorder
            </span>
          </div>

          {menus.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: T.t3, fontSize: 14 }}>
              No navigation items found in Firestore. Start building your custom menu links!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {topLevelMenus.map((topItem, idx, arr) => (
                <div key={topItem.id}>
                  {/* Top Level Item */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: topItem.isActive === false ? '#f1f5f9' : '#f8fafc',
                    padding: '10px 14px', borderRadius: 10,
                    border: `1px solid ${T.b1}`,
                    borderLeft: `4px solid ${topItem.isActive === false ? '#94a3b8' : NAVY}`,
                    opacity: topItem.isActive === false ? 0.7 : 1
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {/* Reorder Arrows */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <button onClick={() => handleMove(topItem, 'up')} disabled={idx===0} style={{ border:'none', background:'none', cursor:idx===0?'not-allowed':'pointer', opacity:idx===0?0.25:1, fontSize:11, padding:0 }} aria-label="Move up">▲</button>
                        <button onClick={() => handleMove(topItem, 'down')} disabled={idx===arr.length-1} style={{ border:'none', background:'none', cursor:idx===arr.length-1?'not-allowed':'pointer', opacity:idx===arr.length-1?0.25:1, fontSize:11, padding:0 }} aria-label="Move down">▼</button>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>
                            {topItem.icon || '📁'} {topItem.label}
                          </span>
                          {topItem.badge && (
                            <span style={{
                              fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 4,
                              background: getBadgeStyle(topItem.badgeColor).bg,
                              color: getBadgeStyle(topItem.badgeColor).text,
                              border: `1px solid ${getBadgeStyle(topItem.badgeColor).border}`
                            }}>
                              {topItem.badge}
                            </span>
                          )}
                          {topItem.isExternal && <span style={{ fontSize: 9, background: '#fee2e2', color: '#b91c1c', padding: '1px 5px', borderRadius: 3, fontWeight: 800 }}>↗ EXT</span>}
                          {topItem.isActive === false && <span style={{ fontSize: 9, background: '#e2e8f0', color: '#64748b', padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>HIDDEN</span>}
                        </div>
                        {topItem.subtitle && <div style={{ fontSize: 11, color: T.t3, marginTop: 1 }}>{topItem.subtitle}</div>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <button onClick={() => handleToggleActive(topItem)} title={topItem.isActive === false ? 'Click to show' : 'Click to hide'} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>
                        {topItem.isActive === false ? '🙈' : '👁️'}
                      </button>
                      <button onClick={() => handleDuplicate(topItem)} title="Duplicate link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>
                        📋
                      </button>
                      <button onClick={() => handleEdit(topItem)} style={{ background: '#e2e8f0', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: 5, fontSize: 12, fontWeight: 600 }}>
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDelete(topItem.id, topItem.label)} style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: 5, fontSize: 12 }} aria-label="Delete menu item">
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* Level 1 Children */}
                  {getChildren(topItem.id).map((subItem, sIdx, sArr) => (
                    <div key={subItem.id} style={{ marginLeft: 28, marginTop: 6, display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>
                      <div style={{ position: 'absolute', left: -16, top: -8, bottom: 18, width: 2, background: '#cbd5e1' }}></div>
                      <div style={{ position: 'absolute', left: -16, top: 16, width: 14, height: 2, background: '#cbd5e1' }}></div>
                      
                      <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        background: subItem.isActive === false ? '#f8fafc' : '#ffffff',
                        padding: '8px 12px', borderRadius: 8,
                        border: `1px solid ${T.b1}`,
                        opacity: subItem.isActive === false ? 0.7 : 1
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <button onClick={() => handleMove(subItem, 'up')} disabled={sIdx===0} style={{ border:'none', background:'none', cursor:sIdx===0?'not-allowed':'pointer', opacity:sIdx===0?0.25:1, fontSize:10, padding:0 }} aria-label="Move sub-item up">▲</button>
                            <button onClick={() => handleMove(subItem, 'down')} disabled={sIdx===sArr.length-1} style={{ border:'none', background:'none', cursor:sIdx===sArr.length-1?'not-allowed':'pointer', opacity:sIdx===sArr.length-1?0.25:1, fontSize:10, padding:0 }} aria-label="Move sub-item down">▼</button>
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontWeight: 600, color: '#334155', fontSize: 13 }}>
                                {subItem.icon || '📂'} {subItem.label}
                              </span>
                              {subItem.badge && (
                                <span style={{
                                  fontSize: 8.5, fontWeight: 800, padding: '1px 5px', borderRadius: 3,
                                  background: getBadgeStyle(subItem.badgeColor).bg,
                                  color: getBadgeStyle(subItem.badgeColor).text,
                                  border: `1px solid ${getBadgeStyle(subItem.badgeColor).border}`
                                }}>
                                  {subItem.badge}
                                </span>
                              )}
                              {subItem.isExternal && <span style={{ fontSize: 8.5, background: '#fee2e2', color: '#b91c1c', padding: '1px 4px', borderRadius: 3, fontWeight: 800 }}>↗ EXT</span>}
                              {subItem.isActive === false && <span style={{ fontSize: 8.5, background: '#e2e8f0', color: '#64748b', padding: '1px 4px', borderRadius: 3, fontWeight: 700 }}>HIDDEN</span>}
                            </div>
                            {subItem.subtitle && <div style={{ fontSize: 10.5, color: T.t3 }}>{subItem.subtitle}</div>}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                          <button onClick={() => handleToggleActive(subItem)} title={subItem.isActive === false ? 'Click to show' : 'Click to hide'} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }}>
                            {subItem.isActive === false ? '🙈' : '👁️'}
                          </button>
                          <button onClick={() => handleDuplicate(subItem)} title="Duplicate link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }}>
                            📋
                          </button>
                          <button onClick={() => handleEdit(subItem)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }} aria-label="Edit sub-item">✏️</button>
                          <button onClick={() => handleDelete(subItem.id, subItem.label)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }} aria-label="Delete sub-item">🗑️</button>
                        </div>
                      </div>

                      {/* Level 2 Children */}
                      {getChildren(subItem.id).map((subSubItem, ssIdx, ssArr) => (
                        <div key={subSubItem.id} style={{ marginLeft: 26, display: 'flex', flexDirection: 'column', gap: 4, position: 'relative' }}>
                          <div style={{ position: 'absolute', left: -14, top: -6, bottom: 14, width: 1.5, background: '#e2e8f0' }}></div>
                          <div style={{ position: 'absolute', left: -14, top: 12, width: 12, height: 1.5, background: '#e2e8f0' }}></div>
                          
                          <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            background: subSubItem.isActive === false ? '#f8fafc' : '#fafafa',
                            padding: '6px 10px', borderRadius: 6,
                            border: '1px solid #f1f5f9',
                            opacity: subSubItem.isActive === false ? 0.7 : 1
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <button onClick={() => handleMove(subSubItem, 'up')} disabled={ssIdx===0} style={{ border:'none', background:'none', cursor:ssIdx===0?'not-allowed':'pointer', opacity:ssIdx===0?0.25:1, fontSize:9, padding:0 }} aria-label="Move item up">▲</button>
                                <button onClick={() => handleMove(subSubItem, 'down')} disabled={ssIdx===ssArr.length-1} style={{ border:'none', background:'none', cursor:ssIdx===ssArr.length-1?'not-allowed':'pointer', opacity:ssIdx===ssArr.length-1?0.25:1, fontSize:9, padding:0 }} aria-label="Move item down">▼</button>
                              </div>
                              <span style={{ fontWeight: 500, color: '#475569', fontSize: 12 }}>
                                {subSubItem.icon || '📄'} {subSubItem.label}
                              </span>
                              {subSubItem.badge && (
                                <span style={{
                                  fontSize: 8, fontWeight: 800, padding: '1px 4px', borderRadius: 2,
                                  background: getBadgeStyle(subSubItem.badgeColor).bg,
                                  color: getBadgeStyle(subSubItem.badgeColor).text
                                }}>
                                  {subSubItem.badge}
                                </span>
                              )}
                              {subSubItem.isActive === false && <span style={{ fontSize: 8, background: '#e2e8f0', color: '#64748b', padding: '1px 3px', borderRadius: 2 }}>HIDDEN</span>}
                            </div>

                            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                              <button onClick={() => handleToggleActive(subSubItem)} title={subSubItem.isActive === false ? 'Click to show' : 'Click to hide'} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11 }}>
                                {subSubItem.isActive === false ? '🙈' : '👁️'}
                              </button>
                              <button onClick={() => handleDuplicate(subSubItem)} title="Duplicate link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11 }}>
                                📋
                              </button>
                              <button onClick={() => handleEdit(subSubItem)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }} aria-label="Edit item">✏️</button>
                              <button onClick={() => handleDelete(subSubItem.id, subSubItem.label)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }} aria-label="Delete item">🗑️</button>
                            </div>
                          </div>

                          {/* Level 3 Children (Ultra Deep) */}
                          {getChildren(subSubItem.id).map((l3Item) => (
                            <div key={l3Item.id} style={{
                              marginLeft: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                              background: '#fff', padding: '4px 8px', borderRadius: 4, border: '1px dashed #e2e8f0', fontSize: 11.5
                            }}>
                              <span style={{ color: '#64748b' }}>↳ {l3Item.label}</span>
                              <div style={{ display: 'flex', gap: 4 }}>
                                <button onClick={() => handleEdit(l3Item)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11 }}>✏️</button>
                                <button onClick={() => handleDelete(l3Item.id, l3Item.label)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11 }}>🗑️</button>
                              </div>
                            </div>
                          ))}
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