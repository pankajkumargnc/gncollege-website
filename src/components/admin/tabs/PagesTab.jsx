// src/components/admin/tabs/PagesTab.jsx
import React, { useState, lazy, Suspense } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp, getDocs, query, where, writeBatch } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD, WHITE, useLocalDraft, SectionSearch, BulkBar, MiniLog } from '../AdminShared';
import { clearCache } from '../../../utils/cachedFetch';
import {
  FileText,
  Plus,
  Edit2,
  Edit3,
  Trash2,
  Copy,
  ExternalLink,
  Check,
  Folder,
  RefreshCw,
  Code,
  RotateCcw
} from 'lucide-react';

const JoditEditor = lazy(() => import('jodit-react'));

export default function PagesTab({ pages, logAct, getSectionLog, softDelete, bulkDelete }) {
  const [activeTab, setActiveTab] = useState('manage'); // 'manage' | 'editor'
  const [editItem, setEditItem] = useState(null);
  
  // Editor & Preview Modes
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'code'
  const [previewTab, setPreviewTab] = useState('google'); // 'google' | 'whatsapp' | 'twitter' | 'schema'
  const [googleDevice, setGoogleDevice] = useState('mobile'); // 'mobile' | 'desktop'
  const [showShortcodes, setShowShortcodes] = useState(false);
  const [showScorecard, setShowScorecard] = useState(false);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'published' | 'draft'
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  // Local draft preservation
  const [formData, setFormData, clearDraft] = useLocalDraft('custom_page_v2', {
    title: '',
    slug: '',
    content: '',
    seoTitle: '',
    seoDesc: '',
    keywords: '',
    featuredImage: '',
    status: 'published',
    addToMenu: true,
    template: 'none'
  });

  // Handle title change and auto-slug generation
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (!editItem) {
      const autoSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData({
        ...formData,
        title: newTitle,
        slug: autoSlug,
        seoTitle: `${newTitle} | Guru Nanak College Dhanbad`
      });
    } else {
      setFormData({ ...formData, title: newTitle });
    }
  };

  // Pre-designed institutional templates
  const applyTemplate = (t) => {
    let content = '';
    if (t === 'notice') {
      content = `<div style="padding: 24px; border: 2px solid #0f2347; border-left: 8px solid #f4a023; border-radius: 12px; background: #fff; box-shadow: 0 4px 16px rgba(0,0,0,0.06); font-family: sans-serif;">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 16px;">
    <h2 style="margin: 0; color: #0f2347; font-size: 20px;">📢 OFFICIAL NOTICE</h2>
    <span style="background: #fef3c7; color: #b45309; padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 12px;">DATE: ${new Date().toLocaleDateString('en-GB')}</span>
  </div>
  <p style="font-size: 15px; color: #334155; line-height: 1.7;">Dear Students & Faculty Members,</p>
  <p style="font-size: 14.5px; color: #334155; line-height: 1.7;">This is to notify all concerned that...</p>
  <ul style="font-size: 14px; color: #475569; line-height: 1.8; margin-left: 20px;">
    <li>Important point 1 regarding dates and instructions.</li>
    <li>Important point 2 regarding venue and documentation.</li>
  </ul>
  <div style="margin-top: 24px; text-align: right; border-top: 1px dashed #cbd5e1; padding-top: 14px;">
    <p style="margin: 0; font-weight: 800; color: #0f2347; font-size: 14px;">By Order,</p>
    <p style="margin: 2px 0 0; color: #64748b; font-size: 13px;">Principal / Examination Controller<br/>Guru Nanak College, Dhanbad</p>
  </div>
</div>`;
    } else if (t === 'event') {
      content = `<div style="font-family: sans-serif;">
  <h1 style="color: #0f2347; font-size: 26px; margin-bottom: 8px;">🏆 Event Report: [Event Title]</h1>
  <p style="color: #64748b; font-size: 13px; margin-bottom: 20px;">📅 Organized on: ${new Date().toLocaleDateString('en-GB')} | 📍 Venue: College Auditorium</p>
  
  <p style="font-size: 15px; line-height: 1.8; color: #334155;">Guru Nanak College, Dhanbad successfully conducted the grand event with enthusiasm and active participation from over 500+ students and distinguished faculty members.</p>
  
  <h3 style="color: #0f2347; margin-top: 24px; border-left: 4px solid #f4a023; padding-left: 10px;">🌟 Key Event Highlights</h3>
  <ul style="line-height: 1.8; color: #475569;">
    <li>Inaugural address by the Respected Principal & Chief Guest.</li>
    <li>Felicitation of meritorious students and special performances.</li>
    <li>Vote of thanks delivered by the department coordinator.</li>
  </ul>

  <h3 style="color: #0f2347; margin-top: 24px;">📸 Event Photo Gallery</h3>
  <p style="color: #64748b; font-size: 13px;">The photos below are dynamically pulled from the college central gallery:</p>
  [GALLERY:all]
</div>`;
    } else if (t === 'iqac') {
      content = `<div style="font-family: sans-serif;">
  <div style="background: linear-gradient(135deg, #0f2347, #1e3a8a); color: #fff; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
    <h2 style="margin: 0 0 6px 0; color: #f4a023;">📄 Internal Quality Assurance Cell (IQAC)</h2>
    <p style="margin: 0; opacity: 0.9; font-size: 14px;">Minutes of the Meeting & Action Taken Report</p>
  </div>
  <p><strong>Meeting Date:</strong> ${new Date().toLocaleDateString('en-GB')} | <strong>Chairperson:</strong> Principal, GNC Dhanbad</p>
  
  <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
    <thead>
      <tr style="background: #0f2347; color: #fff; text-align: left;">
        <th style="padding: 10px 14px; border: 1px solid #cbd5e1;">S.No</th>
        <th style="padding: 10px 14px; border: 1px solid #cbd5e1;">Agenda Item</th>
        <th style="padding: 10px 14px; border: 1px solid #cbd5e1;">Discussion & Resolution</th>
        <th style="padding: 10px 14px; border: 1px solid #cbd5e1;">Action Taken</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background: #f8fafc;">
        <td style="padding: 10px 14px; border: 1px solid #cbd5e1;">1</td>
        <td style="padding: 10px 14px; border: 1px solid #cbd5e1;">Curriculum Enhancement & Value Added Courses</td>
        <td style="padding: 10px 14px; border: 1px solid #cbd5e1;">Resolved to introduce Python & Digital Marketing certificate courses.</td>
        <td style="padding: 10px 14px; border: 1px solid #cbd5e1; color: #16a34a; font-weight: 700;">Approved</td>
      </tr>
      <tr>
        <td style="padding: 10px 14px; border: 1px solid #cbd5e1;">2</td>
        <td style="padding: 10px 14px; border: 1px solid #cbd5e1;">NAAC Peer Team Recommendations Follow-up</td>
        <td style="padding: 10px 14px; border: 1px solid #cbd5e1;">Review of smart classroom digitization and research support.</td>
        <td style="padding: 10px 14px; border: 1px solid #cbd5e1; color: #16a34a; font-weight: 700;">In Progress</td>
      </tr>
    </tbody>
  </table>
</div>`;
    } else if (t === 'heritage') {
      content = `<div style="font-family: sans-serif;">
  <div style="border-left: 5px solid #f4a023; background: #fffdf5; padding: 20px; border-radius: 0 12px 12px 0; margin-bottom: 24px;">
    <h3 style="margin: 0 0 6px; color: #b45309; font-size: 16px;">☬ ਵਿਦਿਆ ਵੀਚਾਰੀ ਤਾਂ ਪਰਉਪਕਾਰੀ</h3>
    <p style="margin: 0; font-style: italic; color: #475569; font-size: 14px;">"He is truly learned who engages in the selfless service of humanity."</p>
  </div>
  <h2 style="color: #0f2347;">Sikh Heritage, Values and Moral Excellence</h2>
  <p style="font-size: 15px; line-height: 1.8; color: #334155;">Established in 1970 to mark the 500th Birth Anniversary of Guru Nanak Dev Ji, Guru Nanak College stands as a beacon of quality higher education, interfaith harmony, and egalitarian values in Dhanbad, Jharkhand.</p>
  <p style="font-size: 15px; line-height: 1.8; color: #334155;">We integrate modern science, arts, commerce, and computer technology with timeless Sikh ethics of Kirat Karo (honest labor), Naam Japo (mindfulness), and Vand Chhako (compassionate sharing).</p>
</div>`;
    }
    
    setFormData({ ...formData, content, template: t });
    toast.success(`${t.toUpperCase()} Template applied!`);
  };

  // Inject shortcodes at bottom
  const injectShortcode = (code) => {
    setFormData({ ...formData, content: (formData.content || '') + `\n${code}\n` });
    toast.success(`Shortcode ${code} added!`);
    setShowShortcodes(false);
  };

  // 100-Point SEO Audit Logic
  const getSeoAudit = () => {
    let score = 0;
    const checks = [];

    // Title Check
    if (formData.title && formData.title.length > 3) {
      score += 15;
      checks.push({ label: 'Page title defined', pass: true, hint: `${formData.title.length} characters` });
    } else {
      checks.push({ label: 'Page title missing', pass: false, hint: 'Add a descriptive page title' });
    }

    // SEO Meta Title Check (40-60 characters ideal)
    const titleLen = formData.seoTitle?.length || 0;
    if (titleLen >= 35 && titleLen <= 65) {
      score += 15;
      checks.push({ label: 'Meta title optimal length', pass: true, hint: `${titleLen}/60 chars` });
    } else if (titleLen > 0) {
      score += 8;
      checks.push({ label: 'Meta title needs length tuning', pass: false, hint: `${titleLen}/60 (Aim for 40-60 chars)` });
    } else {
      checks.push({ label: 'Meta title missing', pass: false, hint: 'Required for Google SERP title' });
    }

    // Meta Description Check (120-160 characters ideal)
    const descLen = formData.seoDesc?.length || 0;
    if (descLen >= 110 && descLen <= 165) {
      score += 20;
      checks.push({ label: 'Meta description optimal length', pass: true, hint: `${descLen}/160 chars` });
    } else if (descLen > 0) {
      score += 10;
      checks.push({ label: 'Meta description length warning', pass: false, hint: `${descLen}/160 (Aim for 120-160 chars)` });
    } else {
      checks.push({ label: 'Meta description missing', pass: false, hint: 'Search snippets need description' });
    }

    // Heading Check
    const hasHeading = /<h[1-3]/i.test(formData.content || '');
    if (hasHeading) {
      score += 15;
      checks.push({ label: 'Heading structure (H1/H2/H3)', pass: true, hint: 'Good content hierarchy' });
    } else {
      checks.push({ label: 'Missing H1/H2 headings', pass: false, hint: 'Use headings for better search indexing' });
    }

    // Visual media check
    const hasMedia = /<img|\[GALLERY:/i.test(formData.content || '') || !!formData.featuredImage;
    if (hasMedia) {
      score += 15;
      checks.push({ label: 'Visual media or featured image', pass: true, hint: 'Enhances dwell time and social cards' });
    } else {
      checks.push({ label: 'No images or featured image', pass: false, hint: 'Add image or featured URL' });
    }

    // URL Slug Check
    const slugClean = /^[a-z0-9-]+$/.test(formData.slug || '');
    if (formData.slug && slugClean) {
      score += 15;
      checks.push({ label: 'SEO-friendly clean URL slug', pass: true, hint: `/p/${formData.slug}` });
    } else {
      checks.push({ label: 'Slug is invalid or empty', pass: false, hint: 'Use lowercase letters and dashes only' });
    }

    // Keywords Check
    if (formData.keywords && formData.keywords.trim().length > 0) {
      score += 5;
      checks.push({ label: 'Meta keywords tag defined', pass: true, hint: formData.keywords });
    } else {
      checks.push({ label: 'No target keywords listed', pass: false, hint: 'Add 3-5 comma separated keywords' });
    }

    return { score: Math.min(100, score), checks };
  };

  // Save Page (Create or Update)
  const save = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) return toast.error("Title and URL Slug are required!");
    
    setLoading(true);
    try {
      const cleanSlug = formData.slug.toLowerCase().replace(/[^a-z0-9\-]/g, '');
      const payload = {
        title: formData.title,
        slug: cleanSlug,
        content: formData.content || '',
        seoTitle: formData.seoTitle || formData.title,
        seoDesc: formData.seoDesc || '',
        keywords: formData.keywords || '',
        featuredImage: formData.featuredImage || '',
        status: formData.status || 'published',
      };

      if (editItem && editItem.id) {
        // Update existing page
        await updateDoc(doc(db, 'pages', editItem.id), { ...payload, updatedAt: serverTimestamp() });
        toast.success('📝 Page Updated Successfully!');
        logAct?.('update', `Updated Page: ${payload.title} (${payload.status})`, 'pages');
      } else {
        // Create new page
        await addDoc(collection(db, 'pages'), { ...payload, createdAt: serverTimestamp() });
        
        // Auto-add to navigation "More" if selected
        if (formData.addToMenu) {
          const navRef = collection(db, 'navigation');
          const qMore = query(navRef, where('label', '==', 'More'));
          const moreSnap = await getDocs(qMore);
          
          let moreMenuId = null;
          if (!moreSnap.empty) {
            const topMore = moreSnap.docs.find(d => !d.data().parentId);
            moreMenuId = topMore ? topMore.id : moreSnap.docs[0].id;
          } else {
            const newMore = await addDoc(navRef, {
              label: 'More',
              href: '#',
              parentId: null,
              order: 99,
              icon: '➕',
              isExternal: false,
              createdAt: serverTimestamp()
            });
            moreMenuId = newMore.id;
          }

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
      
      // ⚡ Zero-Lag Instant Live Publishing Sync
      clearCache('pages');
      if (formData.addToMenu) clearCache('navigation');
      
      resetEditor();
      setActiveTab('manage'); 
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  // Start editing a page
  const startEdit = (page) => {
    setEditItem(page);
    setFormData({ 
      title: page.title || '',
      slug: page.slug || '',
      content: page.content || '', 
      seoTitle: page.seoTitle || '',
      seoDesc: page.seoDesc || '',
      keywords: page.keywords || '',
      featuredImage: page.featuredImage || '',
      status: page.status || 'published',
      addToMenu: false
    });
    setActiveTab('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle page status directly (publish/draft)
  const togglePageStatus = async (page) => {
    const newStatus = page.status === 'draft' ? 'published' : 'draft';
    try {
      await updateDoc(doc(db, 'pages', page.id), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      clearCache('pages');
      toast.success(`Page marked as ${newStatus.toUpperCase()}!`);
      logAct?.('update', `Toggled status to ${newStatus}: ${page.title}`, 'pages');
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Copy page public link to clipboard
  const copyPageLink = (slug) => {
    const fullUrl = `${window.location.origin}${window.location.pathname}#/p/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('📋 Public URL copied to clipboard!');
  };

  // Delete page and clean up any matching navbar link
  const handleDeletePage = async (page) => {
    if (!window.confirm(`Are you sure you want to delete "${page.title}"? This will also remove any matching Navbar links.`)) return;
    try {
      const navRef = collection(db, 'navigation');
      const navSnap = await getDocs(navRef);
      const batch = writeBatch(db);
      navSnap.forEach(d => {
        const h = d.data().href || '';
        if (h.includes(page.slug)) batch.delete(d.ref);
      });
      await batch.commit();
      softDelete('pages', page.id, page, page.title);
      triggerAutoCleanup();
      
      // ⚡ Zero-Lag Instant Live Publishing Sync
      clearCache('pages');
      clearCache('navigation');
    } catch (err) {
      softDelete('pages', page.id, page, page.title);
      triggerAutoCleanup();
      clearCache('pages');
    }
  };

  const handleBulkDeletePages = async (selectedIds) => {
    if (!window.confirm(`Delete ${selectedIds.length} pages?`)) return;
    try {
      bulkDelete('pages', selectedIds);
      triggerAutoCleanup();
    } catch (err) {
      bulkDelete('pages', selectedIds);
      triggerAutoCleanup();
    }
  };

  // Cleanup orphaned navbar links
  const handleCleanupNavbar = async (silent = false) => {
    try {
      const navRef = collection(db, 'navigation');
      const navSnap = await getDocs(navRef);
      const batch = writeBatch(db);
      let removed = 0;

      navSnap.forEach(d => {
        const h = d.data().href || '';
        if (h.includes('/p/')) {
          const parts = h.split('/p/');
          const slug = parts[1]?.split('?')[0]?.split('#')[0];
          if (slug && !pages.some(p => p.slug === slug)) {
            batch.delete(d.ref);
            removed++;
          }
        }
      });

      if (removed > 0) {
        await batch.commit();
        localStorage.removeItem('gnc_nav_v1');
        localStorage.removeItem('gnc_nav_v1_ts');
        window.dispatchEvent(new CustomEvent('gnc_nav_updated'));
        if (!silent) toast.success(`Navbar Cleaned: ${removed} orphaned link(s) removed.`);
      } else if (!silent) {
        toast.success("Navbar is already clean and synchronized!");
      }
    } catch (err) {}
  };

  const triggerAutoCleanup = () => setTimeout(() => handleCleanupNavbar(true), 2000);

  const resetEditor = () => {
    setEditItem(null);
    clearDraft();
  };

  // Filtered pages list
  const filtered = (pages || []).filter(p => {
    const matchesSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.slug?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (p.status || 'published') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const seoAudit = getSeoAudit();
  const pagePublicUrl = `${window.location.origin}${window.location.pathname}#/p/${formData.slug || 'page-slug'}`;

  // JSON-LD Schema preview
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": formData.seoTitle || formData.title || "Guru Nanak College Dhanbad",
    "description": formData.seoDesc || "NAAC Accredited Premier Minority Degree College in Dhanbad, Jharkhand.",
    "url": pagePublicUrl,
    "publisher": {
      "@type": "CollegeOrUniversity",
      "name": "Guru Nanak College, Dhanbad",
      "url": "https://gnccollege.ac.in",
      "logo": "https://gnccollege.ac.in/images/logo.webp"
    }
  };

  return (
    <div className="fade-up">
      <style>{`
        .pt-tab-btn {
          padding: 12px 24px;
          border-radius: 8px 8px 0 0;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          transition: 0.25s ease;
          border: none;
          background: transparent;
          color: ${T.t3};
          border-bottom: 3px solid transparent;
        }
        .pt-tab-btn.active {
          color: ${NAVY};
          border-bottom: 3px solid ${GOLD};
          background: ${WHITE};
        }
        .sc-badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          cursor: pointer;
          transition: 0.2s;
          border: 1px solid transparent;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .sc-badge:hover {
          transform: translateY(-1px);
        }
        .short-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 8px;
          margin-top: 10px;
        }
        .short-item {
          padding: 8px 10px;
          background: rgba(255,255,255,0.08);
          color: #f1f5f9;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.15);
          text-align: left;
          transition: 0.2s;
        }
        .short-item:hover {
          background: ${GOLD};
          color: #060e1c;
          border-color: ${GOLD};
        }
        .preview-tab-btn {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          border: 1px solid #cbd5e1;
          background: #fff;
          color: #475569;
          cursor: pointer;
          transition: 0.2s;
        }
        .preview-tab-btn.active {
          background: ${NAVY};
          color: #fff;
          border-color: ${NAVY};
        }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ background: '#fff', padding: 10, borderRadius: 12, boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={28} color={NAVY} />
          </div>
          <div>
            <h2 style={{ margin: 0, color: NAVY, fontSize: 24, fontWeight: 900 }}>Pages & SEO Enterprise CMS</h2>
            <p style={{ margin: '4px 0 0', color: T.t3, fontSize: 13, fontWeight: 600 }}>
              Visual WYSIWYG editor, real-time omni-channel social cards, and instant navbar sync
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="abtn abtn-outline abtn-sm"
            onClick={() => handleCleanupNavbar(false)}
            style={{ fontSize: 12, background: '#fff', display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <RefreshCw size={12} />
            <span>Clean Orphan Links</span>
          </button>
        </div>
      </div>

      {/* ── TAB NAVIGATION ── */}
      <div style={{ display: 'flex', borderBottom: `2px solid #e2e8f0`, marginBottom: 24, gap: 10 }}>
        <button
          className={`pt-tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => { setActiveTab('manage'); resetEditor(); }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          <Folder size={15} />
          <span>All Pages ({pages?.length || 0})</span>
        </button>
        <button
          className={`pt-tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
          onClick={() => { setActiveTab('editor'); if (!editItem) resetEditor(); }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          {editItem ? <><Edit2 size={15} /> Edit Page Content</> : <><Plus size={15} /> Create New Page</>}
        </button>
      </div>

      {/* ==========================================
          TAB 1: CREATE / EDIT PAGE (EDITOR)
      =========================================== */}
      {activeTab === 'editor' && (
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(min(100%, 360px), 1fr)', gap: 24, alignItems: 'start' }}>
          
          {/* LEFT: CONTENT & WYSIWYG EDITOR */}
          <div style={{ background: WHITE, padding: 24, borderRadius: 16, border: `2px solid ${editItem ? GOLD : T.b1}`, boxShadow: '0 8px 30px rgba(15,35,71,0.06)' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 16, borderBottom: `1px solid ${T.b1}`, paddingBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>{editItem ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Edit2 size={16} /> Update Custom Page</span> : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Plus size={16} /> Build New Institutional Page</span>}</span>
                {formData.status === 'draft' && (
                  <span style={{ fontSize: 11, background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: 4, fontWeight: 800 }}>DRAFT</span>
                )}
              </span>
              {editItem && (
                <span style={{ fontSize: 11, background: '#fee2e2', color: '#b91c1c', padding: '4px 8px', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }} onClick={resetEditor}>
                  ✕ Cancel Edit
                </span>
              )}
            </div>

            <form id="pageForm" onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Row 1: Title & Status */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 6 }}>Page Title *</label>
                  <input
                    type="text"
                    className="ainp"
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Annual Placement Report 2026"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 6 }}>Publish Status</label>
                  <select
                    className="ainp"
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    style={{ fontWeight: 700, color: formData.status === 'published' ? '#16a34a' : '#d97706' }}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Row 2: URL Slug */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 6 }}>
                  Page URL Path (Slug) *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: `1px solid ${T.b1}`, borderRadius: 8, overflow: 'hidden' }}>
                  <span style={{ padding: '0 12px', color: T.t3, fontSize: 13, fontWeight: 700, background: '#e2e8f0', height: '100%', display: 'flex', alignItems: 'center' }}>
                    /p/
                  </span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="placement-report-2026"
                    style={{ border: 'none', background: 'transparent', padding: '10px', width: '100%', outline: 'none', fontSize: 13, color: NAVY, fontWeight: 600 }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => copyPageLink(formData.slug)}
                    style={{ background: 'transparent', border: 'none', padding: '0 12px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    title="Copy Link"
                  >
                    <Copy size={14} color="#64748b" />
                  </button>
                </div>
              </div>

              {/* Row 3: Templates & Shortcodes Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 800, color: NAVY }}>Content Editor</label>
                    <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: 6, padding: 2 }}>
                      <button
                        type="button"
                        onClick={() => setEditorMode('visual')}
                        style={{
                          border: 'none',
                          padding: '3px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: 'pointer',
                          background: editorMode === 'visual' ? NAVY : 'transparent',
                          color: editorMode === 'visual' ? '#fff' : '#64748b'
                        }}
                      >
                        🎨 Visual
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditorMode('code')}
                        style={{
                          border: 'none',
                          padding: '3px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: 'pointer',
                          background: editorMode === 'code' ? NAVY : 'transparent',
                          color: editorMode === 'code' ? '#fff' : '#64748b'
                        }}
                      >
                        &lt;/&gt; HTML Code
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 6 }}>
                    <div className="sc-badge" style={{ background: '#fef3c7', color: '#b45309' }} onClick={() => setShowShortcodes(!showShortcodes)}>
                      🧩 Shortcodes ▾
                    </div>
                    <div className="sc-badge" style={{ background: '#e0f2fe', color: '#0369a1' }} onClick={() => setFormData({ ...formData, content: '' })}>
                      🔄 Clear
                    </div>
                  </div>
                </div>

                {/* Shortcode Drawer */}
                {showShortcodes && (
                  <div className="fade-up" style={{ background: '#0f172a', padding: 14, borderRadius: 10, marginBottom: 12, border: `1px solid ${GOLD}` }}>
                    <div style={{ color: GOLD, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>
                      Embed College Central Data Automatically:
                    </div>
                    <div className="short-grid">
                      <button type="button" className="short-item" onClick={() => injectShortcode('[GALLERY:all]')}>🖼️ Full Gallery</button>
                      <button type="button" className="short-item" onClick={() => injectShortcode('[EVENTS:3]')}>📅 Latest 3 Events</button>
                      <button type="button" className="short-item" onClick={() => injectShortcode('[NOTICES:5]')}>📢 Top 5 Notices</button>
                      <button type="button" className="short-item" onClick={() => injectShortcode('[STAFF:all]')}>👨‍🏫 Staff Roster</button>
                      <button type="button" className="short-item" onClick={() => injectShortcode('[TABLE:2x3]')}>📊 Sample Table</button>
                      <button type="button" className="short-item" onClick={() => injectShortcode('[BANNER:hero]')}>🚩 Top Hero Card</button>
                    </div>
                  </div>
                )}

                {/* Templates Quick Insert */}
                <div style={{ marginBottom: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.t3, alignSelf: 'center', marginRight: 4 }}>Templates:</span>
                  <button type="button" className="sc-badge" style={{ background: '#f1f5f9', color: NAVY }} onClick={() => applyTemplate('notice')}>
                    📢 Official Notice
                  </button>
                  <button type="button" className="sc-badge" style={{ background: '#f1f5f9', color: NAVY }} onClick={() => applyTemplate('event')}>
                    🏆 Event Report
                  </button>
                  <button type="button" className="sc-badge" style={{ background: '#f1f5f9', color: NAVY }} onClick={() => applyTemplate('iqac')}>
                    📄 IQAC Minutes
                  </button>
                  <button type="button" className="sc-badge" style={{ background: '#fffbeb', color: '#b45309' }} onClick={() => applyTemplate('heritage')}>
                    ☬ Sikh Heritage Story
                  </button>
                </div>

                {/* Main Visual or Code Editor */}
                {editorMode === 'visual' ? (
                  <div style={{ border: `1.5px solid ${T.b1}`, borderRadius: 10, overflow: 'hidden' }}>
                    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: T.t3, background: '#f8fafc' }}>⏳ Loading Visual WYSIWYG Editor...</div>}>
                      <JoditEditor
                        value={formData.content || ''}
                        config={{
                          readonly: false,
                          height: 380,
                          buttons: 'bold,italic,underline,strikethrough,|,ul,ol,|,paragraph,fontsize,brush,|,table,link,image,|,align,undo,redo,|,source,fullsize',
                          toolbarAdaptive: false,
                          showCharsCounter: true,
                          showWordsCounter: true,
                          showXPathInStatusbar: false,
                        }}
                        onBlur={newContent => setFormData({ ...formData, content: newContent })}
                      />
                    </Suspense>
                  </div>
                ) : (
                  <textarea
                    className="ainp"
                    rows="14"
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Enter standard HTML or Markdown with shortcodes..."
                    style={{ fontFamily: "'JetBrains Mono', Consolas, monospace", fontSize: 12.5, background: '#f8fafc', lineHeight: 1.6 }}
                  />
                )}
              </div>

              {/* Row 4: Featured Image URL */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 6 }}>
                  Featured Banner Image URL (Optional — Used for Social Cards & Header)
                </label>
                <input
                  type="url"
                  className="ainp"
                  value={formData.featuredImage}
                  onChange={e => setFormData({ ...formData, featuredImage: e.target.value })}
                  placeholder="https://images.unsplash.com/... or uploaded image path"
                />
              </div>

              {/* Auto Menu Link Checkbox */}
              {!editItem && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f0fdf4', padding: '12px 14px', borderRadius: 8, border: `1px solid #bbf7d0` }}>
                  <input
                    type="checkbox"
                    id="auto-menu"
                    checked={formData.addToMenu}
                    onChange={e => setFormData({ ...formData, addToMenu: e.target.checked })}
                    style={{ width: 18, height: 18, accentColor: '#16a34a' }}
                  />
                  <label htmlFor="auto-menu" style={{ fontSize: 13, fontWeight: 700, color: '#166534', cursor: 'pointer', userSelect: 'none' }}>
                    Automatically link this page into Navbar "More" dropdown
                  </label>
                </div>
              )}

              <button
                type="submit"
                form="pageForm"
                className="abtn abtn-navy"
                style={{ padding: '14px', fontSize: 15, width: '100%', justifyContent: 'center', marginTop: 6 }}
                disabled={loading}
              >
                {loading ? 'Saving Page...' : (editItem ? '✅ Update & Sync Custom Page' : '🚀 Publish Institutional Page')}
              </button>
            </form>
          </div>

          {/* RIGHT: SEO OPTIMIZER & OMNI-CHANNEL PREVIEWS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            {/* 1. SEO Fields & Scorecard */}
            <div style={{ background: WHITE, padding: 22, borderRadius: 16, border: `1px solid ${T.b1}`, boxShadow: '0 8px 30px rgba(15,35,71,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, borderBottom: `1px solid ${T.b1}`, paddingBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: NAVY }}>🔍 Google SEO & Meta Tags</div>
                  <div style={{ fontSize: 11, color: T.t3 }}>Rank higher with calibrated metadata</div>
                </div>
                <div
                  className="sc-badge"
                  style={{
                    background: seoAudit.score >= 80 ? '#dcfce7' : (seoAudit.score >= 50 ? '#fef3c7' : '#fee2e2'),
                    color: seoAudit.score >= 80 ? '#166534' : (seoAudit.score >= 50 ? '#b45309' : '#b91c1c')
                  }}
                  onClick={() => setShowScorecard(!showScorecard)}
                >
                  Score: {seoAudit.score}% {showScorecard ? '▴' : '▾'}
                </div>
              </div>

              {/* Expandable Scorecard Checklist */}
              {showScorecard && (
                <div className="fade-up" style={{ background: '#f8fafc', padding: 12, borderRadius: 10, marginBottom: 15, border: `1px solid #e2e8f0` }}>
                  <div style={{ height: 6, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden', marginBottom: 10 }}>
                    <div style={{ width: `${seoAudit.score}%`, height: '100%', background: seoAudit.score >= 80 ? '#16a34a' : (seoAudit.score >= 50 ? '#d97706' : '#dc2626'), transition: 'width 0.4s' }} />
                  </div>
                  {seoAudit.checks.map((c, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, marginBottom: 5 }}>
                      <span style={{ fontWeight: 600, color: c.pass ? '#1e293b' : '#64748b' }}>
                        {c.pass ? '✓' : '✗'} {c.label}
                      </span>
                      <span style={{ color: c.pass ? '#16a34a' : '#d97706', fontSize: 10, fontWeight: 700 }}>
                        {c.hint}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Meta Title */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>SERP Meta Title</label>
                    <span style={{ fontSize: 11, fontWeight: 700, color: formData.seoTitle?.length > 65 ? '#dc2626' : (formData.seoTitle?.length >= 35 ? '#16a34a' : '#d97706') }}>
                      {formData.seoTitle?.length || 0} / 60
                    </span>
                  </div>
                  <input
                    type="text"
                    className="ainp"
                    value={formData.seoTitle}
                    onChange={e => setFormData({ ...formData, seoTitle: e.target.value })}
                    placeholder="e.g. Placement Cell | Guru Nanak College Dhanbad"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>SERP Meta Description</label>
                    <span style={{ fontSize: 11, fontWeight: 700, color: formData.seoDesc?.length > 165 ? '#dc2626' : (formData.seoDesc?.length >= 110 ? '#16a34a' : '#d97706') }}>
                      {formData.seoDesc?.length || 0} / 160
                    </span>
                  </div>
                  <textarea
                    className="ainp"
                    rows="3"
                    value={formData.seoDesc}
                    onChange={e => setFormData({ ...formData, seoDesc: e.target.value })}
                    placeholder="Provide a compelling 2-sentence summary that encourages Google searchers to click..."
                  />
                </div>

                {/* Keywords Tag */}
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 4 }}>
                    Meta Keywords (Comma separated)
                  </label>
                  <input
                    type="text"
                    className="ainp"
                    value={formData.keywords}
                    onChange={e => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="dhanbad college, placements, bbmku, bca, bba"
                  />
                </div>
              </div>
            </div>

            {/* 2. Omni-Channel Social Previews */}
            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: `1px solid #e2e8f0` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.6 }}>
                  Live Social & SERP Previews
                </span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button
                    type="button"
                    className={`preview-tab-btn ${previewTab === 'google' ? 'active' : ''}`}
                    onClick={() => setPreviewTab('google')}
                  >
                    🌐 Google
                  </button>
                  <button
                    type="button"
                    className={`preview-tab-btn ${previewTab === 'whatsapp' ? 'active' : ''}`}
                    onClick={() => setPreviewTab('whatsapp')}
                  >
                    💬 WhatsApp
                  </button>
                  <button
                    type="button"
                    className={`preview-tab-btn ${previewTab === 'twitter' ? 'active' : ''}`}
                    onClick={() => setPreviewTab('twitter')}
                  >
                    📱 Social Card
                  </button>
                  <button
                    type="button"
                    className={`preview-tab-btn ${previewTab === 'schema' ? 'active' : ''}`}
                    onClick={() => setPreviewTab('schema')}
                  >
                    🏷️ Schema
                  </button>
                </div>
              </div>

              {/* Preview 1: Google SERP */}
              {previewTab === 'google' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8, gap: 6 }}>
                    <button
                      type="button"
                      onClick={() => setGoogleDevice('mobile')}
                      style={{ fontSize: 11, border: 'none', background: googleDevice === 'mobile' ? '#cbd5e1' : 'transparent', padding: '2px 8px', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }}
                    >
                      📱 Mobile
                    </button>
                    <button
                      type="button"
                      onClick={() => setGoogleDevice('desktop')}
                      style={{ fontSize: 11, border: 'none', background: googleDevice === 'desktop' ? '#cbd5e1' : 'transparent', padding: '2px 8px', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }}
                    >
                      💻 Desktop
                    </button>
                  </div>

                  <div style={{
                    background: '#fff',
                    padding: 16,
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                    maxWidth: googleDevice === 'mobile' ? 360 : '100%',
                    margin: '0 auto'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
                        🎓
                      </div>
                      <div>
                        <div style={{ color: '#202124', fontSize: 12, fontWeight: 600 }}>Guru Nanak College Dhanbad</div>
                        <div style={{ color: '#5f6368', fontSize: 11 }}>https://gnccollege.ac.in › p › {formData.slug || 'page-slug'}</div>
                      </div>
                    </div>
                    <div style={{ color: '#1a0dab', fontSize: googleDevice === 'mobile' ? 16 : 18, fontWeight: 500, lineHeight: 1.3, marginBottom: 4, cursor: 'pointer' }}>
                      {formData.seoTitle || formData.title || 'Institutional Page Title'}
                    </div>
                    <div style={{ color: '#4d5156', fontSize: 13, lineHeight: 1.5 }}>
                      {formData.seoDesc || 'Add a meta description to preview how your page summary will display in Google organic search results.'}
                    </div>
                  </div>
                </div>
              )}

              {/* Preview 2: WhatsApp Share Preview */}
              {previewTab === 'whatsapp' && (
                <div>
                  <div style={{
                    background: '#e5ddd5',
                    padding: 16,
                    borderRadius: 12,
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{
                      background: '#fff',
                      borderRadius: 8,
                      overflow: 'hidden',
                      border: '1px solid #d1d5db',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      maxWidth: 320,
                      marginLeft: 'auto'
                    }}>
                      <div style={{
                        height: 120,
                        background: formData.featuredImage
                          ? `url(${formData.featuredImage}) center/cover no-repeat`
                          : 'linear-gradient(135deg, #0f2347, #f4a023)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: 28
                      }}>
                        {!formData.featuredImage && '☬'}
                      </div>
                      <div style={{ padding: '10px 12px' }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#111827', lineHeight: 1.3, marginBottom: 4 }}>
                          {formData.title || 'Page Title'}
                        </div>
                        <div style={{ fontSize: 11.5, color: '#4b5563', lineHeight: 1.4, maxHeight: 48, overflow: 'hidden' }}>
                          {formData.seoDesc || 'Guru Nanak College Dhanbad — NAAC Accredited Premier Minority Degree College.'}
                        </div>
                        <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          gnccollege.ac.in
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 10, textAlign: 'center' }}>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${formData.title || 'Check this out'}: ${pagePublicUrl}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="abtn abtn-sm"
                      style={{ background: '#25D366', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    >
                      <span>💬</span> Test Share on WhatsApp Web
                    </a>
                  </div>
                </div>
              )}

              {/* Preview 3: Social Large Card (Twitter / OpenGraph) */}
              {previewTab === 'twitter' && (
                <div style={{
                  background: '#fff',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    height: 140,
                    background: formData.featuredImage
                      ? `url(${formData.featuredImage}) center/cover no-repeat`
                      : 'linear-gradient(135deg, #0b1f4e, #1e3a8a)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 32
                  }}>
                    {!formData.featuredImage && '🏛️'}
                  </div>
                  <div style={{ padding: 14 }}>
                    <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>
                      gnccollege.ac.in
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: NAVY, marginBottom: 4, lineHeight: 1.3 }}>
                      {formData.seoTitle || formData.title || 'Institutional Page Headline'}
                    </div>
                    <div style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.45 }}>
                      {formData.seoDesc || 'Discover latest notices, admissions, departments and academic reports from Guru Nanak College Dhanbad.'}
                    </div>
                  </div>
                </div>
              )}

              {/* Preview 4: JSON-LD Rich Snippet Schema */}
              {previewTab === 'schema' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: T.t3, fontWeight: 700 }}>Google Schema.org WebPage Output:</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(jsonLdData, null, 2));
                        toast.success('JSON-LD Schema copied!');
                      }}
                      style={{ fontSize: 11, background: '#e2e8f0', border: 'none', padding: '2px 8px', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }}
                    >
                      📋 Copy
                    </button>
                  </div>
                  <pre style={{
                    background: '#0f172a',
                    color: '#38bdf8',
                    padding: 12,
                    borderRadius: 8,
                    fontSize: 11,
                    lineHeight: 1.4,
                    overflowX: 'auto',
                    maxHeight: 200,
                    margin: 0
                  }}>
                    {JSON.stringify(jsonLdData, null, 2)}
                  </pre>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          TAB 2: MANAGE EXISTING PAGES (LIST)
      =========================================== */}
      {activeTab === 'manage' && (
        <div className="fade-up">
          
          {/* Controls Bar: Search & Status Filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <SectionSearch value={search} onChange={setSearch} placeholder="Search pages by title or /p/slug..." />
            </div>

            <div style={{ display: 'flex', gap: 6 }}>
              <button
                type="button"
                className={`sc-badge ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => setStatusFilter('all')}
                style={{ background: statusFilter === 'all' ? NAVY : '#f1f5f9', color: statusFilter === 'all' ? '#fff' : '#64748b' }}
              >
                All ({pages?.length || 0})
              </button>
              <button
                type="button"
                className={`sc-badge ${statusFilter === 'published' ? 'active' : ''}`}
                onClick={() => setStatusFilter('published')}
                style={{ background: statusFilter === 'published' ? '#16a34a' : '#f1f5f9', color: statusFilter === 'published' ? '#fff' : '#64748b' }}
              >
                🟢 Published ({pages?.filter(p => p.status !== 'draft').length || 0})
              </button>
              <button
                type="button"
                className={`sc-badge ${statusFilter === 'draft' ? 'active' : ''}`}
                onClick={() => setStatusFilter('draft')}
                style={{ background: statusFilter === 'draft' ? '#d97706' : '#f1f5f9', color: statusFilter === 'draft' ? '#fff' : '#64748b' }}
              >
                🟡 Drafts ({pages?.filter(p => p.status === 'draft').length || 0})
              </button>
            </div>
          </div>

          <BulkBar count={selected.length} onDelete={() => { handleBulkDeletePages(selected); setSelected([]); }} onClear={() => setSelected([])} />

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#f8fafc', borderBottom: `1px solid ${T.b1}` }}>
              <div className="actitle" style={{ margin: 0, fontSize: 16 }}>
                Active Institutional Pages ({filtered.length})
              </div>
              <button
                className="abtn abtn-navy abtn-sm"
                onClick={() => { resetEditor(); setActiveTab('editor'); }}
                style={{ fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Plus size={14} />
                <span>Create New Page</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filtered.map(page => {
                const isPublished = page.status !== 'draft';
                const isSeoGood = (page.seoDesc?.length >= 100) && (page.seoTitle?.length >= 30);
                
                return (
                  <div
                    key={page.id}
                    className={`arow ${selected.includes(page.id) ? 'selected' : ''}`}
                    style={{
                      alignItems: 'center',
                      padding: '14px 20px',
                      borderBottom: `1px solid ${T.b1}`,
                      background: selected.includes(page.id) ? 'rgba(244,160,35,0.06)' : '#fff'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(page.id)}
                      onChange={() => setSelected(s => s.includes(page.id) ? s.filter(x => x !== page.id) : [...s, page.id])}
                      style={{ accentColor: NAVY, width: 16, height: 16, marginRight: 4 }}
                    />
                    
                    <div style={{
                      background: isPublished ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                      color: isPublished ? '#10b981' : '#f59e0b',
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isPublished ? <FileText size={22} color="#10b981" /> : <Edit3 size={22} color="#f59e0b" />}
                    </div>

                    <div style={{ flex: 1, minWidth: 0, padding: '0 10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 800, color: NAVY, fontSize: 15 }}>
                          {page.title}
                        </span>
                        
                        {/* Status Badge */}
                        <span
                          onClick={() => togglePageStatus(page)}
                          title="Click to toggle status"
                          style={{
                            fontSize: 10,
                            background: isPublished ? '#dcfce7' : '#fef3c7',
                            color: isPublished ? '#166534' : '#b45309',
                            padding: '2px 8px',
                            borderRadius: 12,
                            fontWeight: 800,
                            cursor: 'pointer',
                            userSelect: 'none'
                          }}
                        >
                          {isPublished ? 'PUBLISHED' : 'DRAFT'}
                        </span>

                        {/* SEO Badge */}
                        {isSeoGood ? (
                          <span style={{ fontSize: 10, background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
                            SEO: Calibrated
                          </span>
                        ) : (
                          <span style={{ fontSize: 10, background: '#fee2e2', color: '#b91c1c', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
                            SEO: Needs Meta
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, fontFamily: 'monospace' }}>
                          /p/{page.slug}
                        </span>
                        <span style={{ fontSize: 11, color: T.t3 }}>
                          • Updated: {page.updatedAt?.toDate()?.toLocaleDateString() || 'Recently'}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                      <button
                        type="button"
                        onClick={() => copyPageLink(page.slug)}
                        className="abtn abtn-outline abtn-sm"
                        style={{ fontSize: 11, padding: '5px 8px', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        title="Copy Public URL"
                      >
                        <Copy size={12} />
                        <span>Copy Link</span>
                      </button>
                      <a
                        href={`${import.meta.env.BASE_URL}#/p/${page.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="abtn abtn-outline abtn-sm"
                        style={{ textDecoration: 'none', fontSize: 11, padding: '5px 8px', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                      >
                        <ExternalLink size={12} />
                        <span>View Live</span>
                      </a>
                      <button
                        type="button"
                        className="abtn abtn-navy abtn-sm"
                        onClick={() => startEdit(page)}
                        style={{ fontSize: 11, padding: '5px 10px', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                      >
                        <Edit2 size={12} />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        className="abtn abtn-red abtn-sm"
                        onClick={() => handleDeletePage(page)}
                        style={{ padding: '6px 8px', display: 'inline-flex', alignItems: 'center' }}
                        aria-label="Delete page"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '48px 20px', color: T.t4 }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>📭</div>
                  <h3 style={{ margin: '0 0 6px', color: NAVY, fontSize: 18 }}>No Custom Pages Found</h3>
                  <p style={{ margin: 0, fontSize: 13 }}>Click "+ Create New Page" to launch your first dynamic institutional page.</p>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <MiniLog logs={getSectionLog('pages')} />
          </div>
        </div>
      )}
    </div>
  );
}