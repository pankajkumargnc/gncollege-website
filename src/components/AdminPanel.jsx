import toast from 'react-hot-toast';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { COLORS } from '../styles/colors';
import { db } from '../firebase'; 
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { collection, addDoc, serverTimestamp, doc, deleteDoc, updateDoc, setDoc, getDoc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';

const formatPathToLabel = (path) => path.replace(/^\//, '').replace(/-/g, ' ').split('/').map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)).join(' > ');

// 🌟 FIX: navLinks yahan receive ho raha hai
export default function AdminPanel({ onClose, notices, pages, events, gallery, placeholderPaths, announcements, pdfReports, navLinks }) {
  const [activeTab, setActiveTab] = useState('pages');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const editor = useRef(null);
  const config = useMemo(() => ({ 
    readonly: false, 
    placeholder: 'Start typings...',
    height: 400,
    processPasteHTML: true,
    processPasteFromWord: true,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    buttons: [
      'source', '|', 'bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'table', 'link', '|', 'align', 'undo', 'redo', '|', 'hr', 'eraser', 'fullsize'
    ],
  }), []);

  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const handlePreview = (content) => { setPreviewContent(content); setShowPreview(true); };

  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const [pageCreationMode, setPageCreationMode] = useState('update');
  const [editingPage, setEditingPage] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingNotice, setEditingNotice] = useState(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [editingPdfReport, setEditingPdfReport] = useState(null);

  const [adminLogs, setAdminLogs] = useState([]);

  // ==========================================
  // 🌟 ADVANCED MENU BUILDER STATES
  // ==========================================
  const [navData, setNavData] = useState([]);
  const [editMenuSelection, setEditMenuSelection] = useState('');
  const [editMenuForm, setEditMenuForm] = useState({ label: '', href: '' });
  const [newMenuForm, setNewMenuForm] = useState({ label: '', href: '', parentId: 'top' });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🌟 FIX: Database se check karega, nahi mila toh seedha aapka App.jsx wala menu uthayega
  useEffect(() => {
    const fetchNav = async () => {
      const docSnap = await getDoc(doc(db, 'settings', 'navbar'));
      if (docSnap.exists() && docSnap.data().links && docSnap.data().links.length > 0) {
        setNavData(docSnap.data().links);
      } else if (navLinks && navLinks.length > 0) {
        setNavData(navLinks); // Original menus se load karega!
      }
    };
    fetchNav();
  }, [navLinks]);

  // 🌟 NAYA BUTTON: ORIGINAL MENU WAPAS LAANE KE LIYE
  const handleRestoreOriginalMenu = async () => {
    if (!window.confirm("Kya aap apna original lamba menu wapas laana chahte hain? Yeh live menu ko replace kar dega.")) return;
    if (!navLinks || navLinks.length === 0) {
      return toast.error("Original menu nahi mila!");
    }
    
    setLoading(true);
    const toastId = toast.loading('Restoring Original Menu...');
    try {
      await setDoc(doc(db, 'settings', 'navbar'), { links: navLinks });
      setNavData(navLinks);
      toast.success("Aapka original menu wapas aa gaya!", { id: toastId });
    } catch (err) { toast.error(err.message, { id: toastId }); }
    setLoading(false);
  };

  const flattenedMenus = useMemo(() => {
    const flat = [];
    navData.forEach((l0, i0) => {
      flat.push({ id: `${i0}`, label: l0.label, href: l0.href, pathStr: `[L1: Main] ${l0.label}`, level: 0 });
      if (l0.sub) {
        l0.sub.forEach((l1, i1) => {
          flat.push({ id: `${i0}-${i1}`, label: l1.label, href: l1.href, pathStr: `[L2: Sub] ${l0.label} > ${l1.label}`, level: 1 });
          if (l1.sub) {
            l1.sub.forEach((l2, i2) => {
              flat.push({ id: `${i0}-${i1}-${i2}`, label: l2.label, href: l2.href, pathStr: `[L3: Sub-Sub] ${l0.label} > ${l1.label} > ${l2.label}`, level: 2 });
            });
          }
        });
      }
    });
    return flat;
  }, [navData]);

  const saveNavbarToFirebase = async (newNavArray, successMsg) => {
    setLoading(true);
    const toastId = toast.loading('Saving Menu...');
    try {
      await setDoc(doc(db, 'settings', 'navbar'), { links: newNavArray });
      setNavData(newNavArray);
      toast.success(successMsg, { id: toastId });
    } catch (err) { toast.error(err.message, { id: toastId }); }
    setLoading(false);
  };

  const handleEditSelectChange = (id) => {
    setEditMenuSelection(id);
    const item = flattenedMenus.find(m => m.id === id);
    if(item) setEditMenuForm({ label: item.label, href: item.href || '' });
  };

  const handleUpdateExistingMenu = () => {
    if(!editMenuSelection || !editMenuForm.label) return toast.error("Please select a menu and enter a name.");
    const newNav = [...navData];
    const idx = editMenuSelection.split('-');
    
    if (idx.length === 1) { newNav[idx[0]].label = editMenuForm.label; newNav[idx[0]].href = editMenuForm.href; }
    else if (idx.length === 2) { newNav[idx[0]].sub[idx[1]].label = editMenuForm.label; newNav[idx[0]].sub[idx[1]].href = editMenuForm.href; }
    else if (idx.length === 3) { newNav[idx[0]].sub[idx[1]].sub[idx[2]].label = editMenuForm.label; newNav[idx[0]].sub[idx[1]].sub[idx[2]].href = editMenuForm.href; }
    
    saveNavbarToFirebase(newNav, "Menu Updated Successfully!");
    setEditMenuSelection(''); setEditMenuForm({ label: '', href: '' });
  };

  const handleAddNewMenu = () => {
    if(!newMenuForm.label) return toast.error("Menu Name is required!");
    const newNav = [...navData];
    const newItem = { label: newMenuForm.label, href: newMenuForm.href };

    if (newMenuForm.parentId === 'top') {
      newNav.push(newItem);
    } else {
      const idx = newMenuForm.parentId.split('-');
      if (idx.length === 1) {
        if (!newNav[idx[0]].sub) newNav[idx[0]].sub = [];
        newNav[idx[0]].sub.push(newItem);
      } else if (idx.length === 2) {
        if (!newNav[idx[0]].sub[idx[1]].sub) newNav[idx[0]].sub[idx[1]].sub = [];
        newNav[idx[0]].sub[idx[1]].sub.push(newItem);
      }
    }
    saveNavbarToFirebase(newNav, "New Menu Added Successfully!");
    setNewMenuForm({ label: '', href: '', parentId: 'top' });
  };

  const handleDeleteMenu = (id) => {
    if (!window.confirm("Are you sure you want to delete this menu?")) return;
    const newNav = [...navData];
    const idx = id.split('-');
    
    if (idx.length === 1) newNav.splice(idx[0], 1);
    else if (idx.length === 2) newNav[idx[0]].sub.splice(idx[1], 1);
    else if (idx.length === 3) newNav[idx[0]].sub[idx[1]].sub.splice(idx[2], 1);
    
    saveNavbarToFirebase(newNav, "Menu Deleted!");
    if(editMenuSelection === id) { setEditMenuSelection(''); setEditMenuForm({label:'', href:''}); }
  };

  const [eventData, setEventData] = useState({ title: '', desc: '', type: 'WORKSHOP', day: '', month: '', location: '', status: 'upcoming', imageUrl: '' });
  const [noticeData, setNoticeData] = useState({ text: '', link: '', type: 'General', isNew: true });
  const [pageData, setPageData] = useState({ title: '', content: '', path: '', slug: '', contentType: 'html' });
  const [announcementData, setAnnouncementData] = useState({ text: '', link: '', type: 'News' });
  const [pdfReportData, setPdfReportData] = useState({ title: '', link: '', type: 'Document' });
  const [galleryData, setGalleryData] = useState({ title: '', cat: 'Seminars', src: '' });

  const handleAddGalleryPhoto = async (e) => { e.preventDefault(); if (!galleryData.src.trim()) return alert("Image path is required."); setLoading(true); try { await addDoc(collection(db, 'gallery'), { title: galleryData.title.trim(), cat: galleryData.cat.trim(), src: galleryData.src.trim(), createdAt: serverTimestamp() }); toast.success('Photo published to Gallery!'); setGalleryData({ title: '', cat: 'Seminars', src: '' }); } catch (err) { alert('Upload Error: ' + err.message); } setLoading(false); };
  const handleDeleteGalleryPhoto = async (id) => { if (window.confirm('Are you sure you want to remove this photo?')) { try { await deleteDoc(doc(db, 'gallery', id)); toast.success('Photo removed successfully!'); } catch (err) { toast.error('Error: ' + err.message); } } };
  const handleAddEvent = async (e) => { e.preventDefault(); setLoading(true); try { if (editingEvent) { await updateDoc(doc(db, 'events', editingEvent.id), { ...eventData, updatedAt: serverTimestamp() }); toast.success('Event updated!'); } else { await addDoc(collection(db, 'events'), { ...eventData, createdAt: serverTimestamp() }); toast.success('Event added!'); } handleCancelEditEvent(); } catch (err) { toast.error('Error: ' + err.message); } setLoading(false); };
  const handleAddNotice = async (e) => { e.preventDefault(); if (!noticeData.text.trim()) return alert("Notice text is required"); setLoading(true); try { if (editingNotice) { await updateDoc(doc(db, 'notices', editingNotice.id), { ...noticeData, updatedAt: serverTimestamp() }); toast.success('Notice Updated successfully! 🎉'); } else { await addDoc(collection(db, 'notices'), { ...noticeData, date: new Date().toISOString(), createdAt: serverTimestamp() }); toast.success('Notice published successfully! 🎉'); } handleCancelEditNotice(); } catch (err) { toast.error('Error: ' + err.message); } setLoading(false); };
  const handleAddAnnouncement = async (e) => { e.preventDefault(); if (!announcementData.text.trim()) return alert("Announcement text is required"); setLoading(true); try { if (editingAnnouncement) { await updateDoc(doc(db, 'announcements', editingAnnouncement.id), { ...announcementData, updatedAt: serverTimestamp() }); toast.success('News updated successfully! 🎉'); } else { await addDoc(collection(db, 'announcements'), { ...announcementData, date: new Date().toISOString(), createdAt: serverTimestamp() }); toast.success('News published successfully! 🎉'); } handleCancelEditAnnouncement(); } catch (err) { toast.error('Error: ' + err.message); } setLoading(false); };
  const handleAddPdfReport = async (e) => { e.preventDefault(); if (!pdfReportData.title.trim() || !pdfReportData.link.trim()) return alert("Title and Link are required"); setLoading(true); try { if (editingPdfReport) { await updateDoc(doc(db, 'pdfReports', editingPdfReport.id), { ...pdfReportData, updatedAt: serverTimestamp() }); toast.success('Document updated successfully! 🎉'); } else { await addDoc(collection(db, 'pdfReports'), { ...pdfReportData, date: new Date().toISOString(), createdAt: serverTimestamp() }); toast.success('Document published successfully! 🎉'); } handleCancelEditPdfReport(); } catch (err) { toast.error('Error: ' + err.message); } setLoading(false); };
  const handleAddPage = async (e) => { e.preventDefault(); if (pageCreationMode === 'update' && (!pageData.title || !pageData.path)) return alert("Title and Menu Link required"); if (pageCreationMode === 'create' && (!pageData.title || !pageData.slug)) return alert("Title and Slug required"); setLoading(true); try { const slug = pageData.title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''); const dataToSave = { title: pageData.title.trim(), content: pageData.content, contentType: pageData.contentType, path: pageCreationMode === 'update' ? pageData.path : '', slug: pageCreationMode === 'create' ? slug : '' }; if (editingPage) { await updateDoc(doc(db, 'pages', editingPage.id), { ...dataToSave, updatedAt: serverTimestamp() }); toast.success('Page updated!'); } else { await addDoc(collection(db, 'pages'), { ...dataToSave, createdAt: serverTimestamp() }); toast.success('Page created!'); } handleCancelEdit(); } catch (err) { toast.error('Error: ' + err.message); } setLoading(false); };

  const handleEditEvent = (event) => { setEditingEvent(event); setEventData({ title: event.title || '', desc: event.desc || '', type: event.type || 'WORKSHOP', day: event.day || '', month: event.month || '', location: event.location || '', status: event.status || 'upcoming', imageUrl: event.imageUrl || '' }); };
  const handleEditNotice = (notice) => { setEditingNotice(notice); setNoticeData({ text: notice.text || '', link: notice.link || '', type: notice.type || 'General', isNew: notice.isNew !== false }); };
  const handleEditAnnouncement = (announcement) => { setEditingAnnouncement(announcement); setAnnouncementData({ text: announcement.text || '', link: announcement.link || '', type: announcement.type || 'News' }); };
  const handleEditPdfReport = (report) => { setEditingPdfReport(report); setPdfReportData({ title: report.title || '', link: report.link || '', type: report.type || 'Document' }); };
  const handleEdit = (page) => { setEditingPage(page); setPageData({ title: page.title, content: page.content, path: page.path || '', slug: page.slug || '', contentType: page.contentType || 'html' }); setPageCreationMode(page.path ? 'update' : 'create'); };

  const handleCancelEditEvent = () => { setEditingEvent(null); setEventData({ title: '', desc: '', type: 'WORKSHOP', day: '', month: '', location: '', status: 'upcoming', imageUrl: '' }); };
  const handleCancelEditNotice = () => { setEditingNotice(null); setNoticeData({ text: '', link: '', type: 'General', isNew: true }); };
  const handleCancelEditAnnouncement = () => { setEditingAnnouncement(null); setAnnouncementData({ text: '', link: '', type: 'News' }); };
  const handleCancelEditPdfReport = () => { setEditingPdfReport(null); setPdfReportData({ title: '', link: '', type: 'Document' }); };
  const handleCancelEdit = () => { setEditingPage(null); setPageData({ title: '', content: '', path: '', slug: '', contentType: 'html' }); };

  const handleDeleteEvent = async (id) => { if (window.confirm('Delete this event?')) { try { await deleteDoc(doc(db, 'events', id)); toast.success('Event Deleted!'); if (editingEvent?.id === id) handleCancelEditEvent(); } catch (err) { toast.error(err.message); } } };
  const handleDeleteNotice = async (id) => { if (window.confirm('Delete this notice?')) { try { await deleteDoc(doc(db, 'notices', id)); toast.success('Notice Deleted!'); if (editingNotice?.id === id) handleCancelEditNotice(); } catch (err) { toast.error(err.message); } } };
  const handleDeleteAnnouncement = async (id) => { if (window.confirm('Delete this news?')) { try { await deleteDoc(doc(db, 'announcements', id)); toast.success('News Deleted!'); if (editingAnnouncement?.id === id) handleCancelEditAnnouncement(); } catch (err) { toast.error(err.message); } } };
  const handleDeletePdfReport = async (id) => { if (window.confirm('Delete this Document?')) { try { await deleteDoc(doc(db, 'pdfReports', id)); toast.success('Document Deleted!'); if (editingPdfReport?.id === id) handleCancelEditPdfReport(); } catch (err) { toast.error(err.message); } } };
  const handleDelete = async (id) => { if (window.confirm('Delete this page?')) { try { await deleteDoc(doc(db, 'pages', id)); toast.success('Page Deleted!'); if (editingPage?.id === id) handleCancelEdit(); } catch (err) { toast.error(err.message); } } };

  const menuDocs = flattenedMenus.map(m => ({
    id: `menu-${m.id}`,
    realId: m.id,
    docType: 'Menu',
    contentType: 'Menu',
    title: m.label,
    displayText: `Hierarchy: ${m.pathStr}`,
    createdAt: { toMillis: () => Date.now() + 1000000 },
    path: m.href || 'Dropdown Menu'
  }));

  const allContent = [
    ...pages.map(p => ({ ...p, contentType: 'Page' })),
    ...notices.map(n => ({ ...n, title: n.text.substring(0, 50) + '...', contentType: 'Notice' })),
    ...announcements.map(a => ({ ...a, title: a.text.substring(0, 50) + '...', contentType: 'News' })),
    ...events.map(e => ({ ...e, contentType: 'Event' })),
    ...pdfReports.map(r => ({ ...r, contentType: 'Document' })),
    ...gallery.map(g => ({ ...g, contentType: 'Gallery' })),
    ...menuDocs
  ].sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));

  const filteredContent = allContent.filter(item => {
    const titleMatch = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = filterType === 'all' || item.contentType.toLowerCase() === filterType;
    return titleMatch && typeMatch;
  });

  const handleGenericEdit = (item) => {
    if (item.contentType === 'Menu') {
      setActiveTab('menu_builder');
      handleEditSelectChange(item.realId);
      document.querySelector('.main-scroll-area').scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab(item.contentType.toLowerCase() + 's');
    }
  };

  return (
    <div className="admin-wrapper">
      <style>{`
        .admin-wrapper { display: flex; height: 100vh; width: 100vw; position: fixed; top: 0; left: 0; z-index: 99999; background: #f4f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; overflow: hidden; }
        .admin-sidebar { width: 280px; background: linear-gradient(180deg, ${COLORS.navyDark} 0%, #0a1832 100%); color: white; display: flex; flex-direction: column; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 4px 0 25px rgba(0,0,0,0.15); z-index: 10001; }
        .sidebar-header { padding: 30px 25px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; }
        .sidebar-title { font-size: 20px; font-weight: 800; letter-spacing: 0.5px; margin: 0; color: ${COLORS.gold}; text-transform: uppercase; }
        .nav-menu { flex: 1; padding: 20px 0; overflow-y: auto; }
        .nav-item { padding: 16px 30px; display: flex; align-items: center; gap: 16px; cursor: pointer; transition: all 0.2s ease; font-weight: 600; font-size: 15px; color: #a0aec0; border-left: 4px solid transparent; }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .nav-item.active { background: rgba(244, 160, 35, 0.1); border-left-color: ${COLORS.gold}; color: ${COLORS.gold}; }
        .nav-icon { font-size: 20px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); }
        .admin-main { flex: 1; overflow-y: auto; padding: 40px; position: relative; }
        .card { background: #ffffff; border-radius: 16px; padding: 35px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); margin-bottom: 35px; border: 1px solid #edf2f7; }
        .card-title { font-size: 22px; font-weight: 800; color: ${COLORS.navy}; margin-bottom: 25px; display: flex; align-items: center; gap: 12px; border-bottom: 2px solid #f4f7fa; padding-bottom: 15px; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .form-group { margin-bottom: 20px; }
        .label { display: block; font-size: 12.5px; font-weight: 700; color: #4a5568; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .input { width: 100%; padding: 14px 18px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 15px; outline: none; transition: all 0.2s ease; background: #f8fafc; color: #2d3748; font-family: inherit; box-sizing: border-box; }
        .input:focus { border-color: ${COLORS.gold}; background: #fff; box-shadow: 0 0 0 4px rgba(244,160,35,0.15); }
        .btn-group { display: flex; gap: 15px; margin-top: 10px; }
        .btn { padding: 14px 28px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; border: none; font-size: 14.5px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-primary { background: ${COLORS.navy}; color: white; }
        .btn-primary:hover:not(:disabled) { background: ${COLORS.navyDark}; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(15,35,71,0.25); }
        .btn-gold { background: ${COLORS.gold}; color: ${COLORS.navyDark}; }
        .btn-danger { background: #fee2e2; color: #e53e3e; }
        .btn-secondary { background: #edf2f7; color: #4a5568; }
        .preview-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 10002; backdrop-filter: blur(5px); }
        .preview-modal-content { background: #f4f7fa; width: 90%; max-width: 900px; height: 85vh; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); display: flex; flex-direction: column; overflow: hidden; }
        .preview-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 15px 25px; background: #fff; border-bottom: 1px solid #e2e8f0; }
        .preview-modal-header h3 { margin: 0; color: ${COLORS.navy}; font-size: 18px; }
        .preview-modal-header button { background: transparent; border: none; font-size: 24px; cursor: pointer; color: #666; }
        .preview-modal-body { padding: 30px 40px; overflow-y: auto; flex: 1; }
        .dynamic-rich-content table { width: 100% !important; border-collapse: collapse; margin: 20px 0; display: block; overflow-x: auto; white-space: nowrap; font-size: 14px; }
        .dynamic-rich-content th { background: ${COLORS.navy}; color: white; padding: 12px 15px; text-align: left; }
        .dynamic-rich-content td { padding: 12px 15px; border: 1px solid #e2e8f0; }
        .dynamic-rich-content tr:nth-child(even) { background-color: #f8fafc; }
        .dynamic-rich-content iframe { width: 100%; aspect-ratio: 16 / 9; height: auto; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 20px 0; }
        .dynamic-rich-content img { max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin: 20px 0; display: block; }
        .dynamic-rich-content h1, .dynamic-rich-content h2, .dynamic-rich-content h3 { color: ${COLORS.navy}; margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 800; line-height: 1.3; }
        .dynamic-rich-content p { margin-bottom: 1.5em; line-height: 1.8; color: #334155; font-size: 16px; }
        .dynamic-rich-content ul, .dynamic-rich-content ol { margin-bottom: 1.5em; padding-left: 20px; color: #334155; line-height: 1.8; font-size: 16px;}
        .data-list { display: flex; flex-direction: column; gap: 15px; word-wrap: break-word; overflow-wrap: break-word; }
        .data-item { display: flex; justify-content: space-between; align-items: center; padding: 20px 25px; border: 1px solid #edf2f7; border-radius: 12px; background: #fff; }
        .data-content h4 { margin: 0 0 6px; color: ${COLORS.navy}; font-size: 16px; font-weight: 700; }
        .badge { font-size: 11px; padding: 4px 10px; border-radius: 6px; font-weight: 700; display: inline-block; margin-bottom: 8px; }
        
        .mobile-topbar { display: none; }
        @media (max-width: 1024px) {
          .admin-sidebar { position: fixed; transform: translateX(-100%); height: 100%; }
          .admin-sidebar.open { transform: translateX(0); }
          .mobile-topbar { display: flex; background: ${COLORS.navyDark}; color: white; padding: 15px 20px; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 10000; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .admin-main { padding: 20px; }
          .card { padding: 25px; margin-bottom: 25px; }
          .data-item { flex-direction: column; align-items: flex-start; gap: 15px; }
          .action-btns { width: 100%; display: flex; justify-content: flex-end; }
        }
      `}</style>

      <div className="mobile-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => setSidebarOpen(true)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '28px' }}>☰</button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: COLORS.gold }}>GNC Admin</h2>
        </div>
        <button className="btn btn-danger" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={onClose}>Exit</button>
      </div>

      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Workspace</h2>
          {sidebarOpen && <button onClick={() => setSidebarOpen(false)} style={{background:'transparent', color:'#fff', border:'none', fontSize:'24px'}}>✕</button>}
        </div>
        <div className="nav-menu">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' }, 
            { id: 'menu_builder', label: 'Menu Editor', icon: '🧭' }, 
            { id: 'pages', label: 'Dynamic Pages', icon: '📄' }, 
            { id: 'gallery', label: 'Photo Gallery', icon: '📸' },
            { id: 'notices', label: 'Notice Board', icon: '📢' }, 
            { id: 'announcements', label: 'Academic News', icon: '📣' },
            { id: 'pdfReports', label: 'E-Documents', icon: '📁' }, 
            { id: 'events', label: 'Campus Events', icon: '🏆' }
          ].map(tab => (
            <div key={tab.id} className={`nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}>
              <span className="nav-icon">{tab.icon}</span> <span>{tab.label}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop:'auto', padding:'20px'}}><button onClick={onClose} className="btn btn-primary" style={{width:'100%', background:'red'}}>Logout</button></div>
      </div>

      <div className="admin-main">

        {activeTab === 'menu_builder' && (
          <>
            {/* 🌟 NAYA RESTORE BUTTON */}
            <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #856404', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#856404', fontSize: '18px' }}>Missing your original Menu?</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Click the button to automatically restore all your original menus from your database code.</p>
              </div>
              <button className="btn btn-gold" onClick={handleRestoreOriginalMenu} disabled={loading}>🔄 Restore Original Menu</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              <div className="card" style={{ borderTop: `4px solid ${COLORS.navy}` }}>
                <div className="card-title">✏️ 1. Edit Existing Menu</div>
                <div className="form-group">
                  <label className="label">Select Menu to Edit</label>
                  <select className="input" value={editMenuSelection} onChange={(e) => handleEditSelectChange(e.target.value)}>
                    <option value="">-- Choose an Existing Menu --</option>
                    {flattenedMenus.map(m => (
                      <option key={m.id} value={m.id}>{m.pathStr} {m.href ? `(${m.href})` : ''}</option>
                    ))}
                  </select>
                </div>
                {editMenuSelection && (
                  <>
                    <div className="form-group"><label className="label">Change Menu Name</label><input className="input" value={editMenuForm.label} onChange={e => setEditMenuForm({...editMenuForm, label: e.target.value})} /></div>
                    <div className="form-group"><label className="label">Change Menu Link URL (Optional)</label><input className="input" value={editMenuForm.href} onChange={e => setEditMenuForm({...editMenuForm, href: e.target.value})} placeholder="/#/p/page-slug" /></div>
                    <div className="btn-group"><button className="btn btn-gold" onClick={handleUpdateExistingMenu} disabled={loading}>💾 Update Menu</button><button className="btn btn-secondary" onClick={() => { setEditMenuSelection(''); setEditMenuForm({label:'', href:''}); }}>Cancel</button></div>
                  </>
                )}
              </div>

              <div className="card" style={{ borderTop: `4px solid ${COLORS.gold}` }}>
                <div className="card-title">➕ 2. Add New Menu / Sub-menu</div>
                <div className="form-group"><label className="label">New Menu Name</label><input className="input" value={newMenuForm.label} onChange={e => setNewMenuForm({...newMenuForm, label: e.target.value})} placeholder="e.g. Gallery" /></div>
                <div className="form-group"><label className="label">New Menu Link URL (Optional)</label><input className="input" value={newMenuForm.href} onChange={e => setNewMenuForm({...newMenuForm, href: e.target.value})} placeholder="/#/gallery" /></div>
                <div className="form-group">
                  <label className="label">Select Parent Location</label>
                  <select className="input" value={newMenuForm.parentId} onChange={e => setNewMenuForm({...newMenuForm, parentId: e.target.value})}>
                    <option value="top">--- Make Top Level Menu (Main Navbar) ---</option>
                    {flattenedMenus.filter(m => m.level < 2).map(m => (
                      <option key={m.id} value={m.id}>Add under: {m.pathStr}</option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-primary" onClick={handleAddNewMenu} disabled={loading}>🚀 Add to Website</button>
              </div>
            </div>

            <div className="card">
              <div className="card-title">📂 3. Live Menu Structure List</div>
              <div className="data-list">
                {flattenedMenus.map((m) => (
                  <div key={m.id} className="data-item" style={{ marginLeft: `${m.level * 30}px`, borderLeft: m.level === 0 ? `4px solid ${COLORS.navy}` : m.level === 1 ? `2px dashed ${COLORS.gold}` : `2px dotted #94a3b8` }}>
                    <div className="data-content" style={{ flex: 1 }}>
                      <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: m.level === 0 ? '16px' : '14px' }}>
                        {m.level > 0 && <span style={{color: '#cbd5e1'}}>↳</span>} {m.label}
                      </h4>
                      {m.href && <div style={{ fontSize: '12px', color: COLORS.success, fontWeight: 700, marginTop: '5px' }}>🔗 {m.href}</div>}
                    </div>
                    <div className="btn-group action-btns">
                      <button className="btn btn-secondary" style={{padding:'6px 12px', fontSize:'12px'}} onClick={() => { handleEditSelectChange(m.id); window.scrollTo({top:0, behavior:'smooth'}); }}>✏️ Edit</button>
                      <button className="btn btn-danger" style={{padding:'6px 12px', fontSize:'12px'}} onClick={() => handleDeleteMenu(m.id)}>🗑️ Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* REST OF THE TABS */}
        {activeTab === 'dashboard' && (
          <div className="card">
            <div className="card-title">📊 Content Dashboard</div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <input type="text" placeholder="Search all content..." className="input" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <select className="input" value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="menu">Navbar Menu</option>
                <option value="page">Page</option>
                <option value="notice">Notice</option>
                <option value="news">News</option>
                <option value="event">Event</option>
                <option value="document">Document</option>
                <option value="gallery">Gallery</option>
              </select>
            </div>
            <div className="data-list">
              {filteredContent.map(item => (
                <div key={item.id} className="data-item">
                  <div className="data-content">
                    <span className="badge" style={{ background: '#eee', color: '#333' }}>{item.contentType}</span>
                    <h4 style={{ whiteSpace: 'normal', wordBreak: 'break-all' }}>{item.title}</h4>
                    {item.path && <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#666' }}>{item.displayText || item.path}</p>}
                  </div>
                  <button className="btn btn-secondary" style={{padding:'8px 16px'}} onClick={() => handleGenericEdit(item)}>Go to Edit</button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'gallery' && (
          <>
            <div className="card">
              <div className="card-title">📸 Add to Photo Gallery</div>
              <form onSubmit={handleAddGalleryPhoto}>
                <div className="form-grid">
                  <div className="form-group"><label className="label">Photo Title</label><input className="input" value={galleryData.title} onChange={e => setGalleryData({...galleryData, title: e.target.value})} required /></div>
                  <div className="form-group"><label className="label">Category</label><select className="input" value={galleryData.cat} onChange={e => setGalleryData({...galleryData, cat: e.target.value})}><option value="Seminars">Seminars</option><option value="Cultural Fest">Cultural Fest</option><option value="Guest Visit">Guest Visit</option><option value="Campus">Campus</option><option value="Departments">Departments</option><option value="NSS Programs">NSS Programs</option></select></div>
                </div>
                <div className="form-group"><label className="label">Image Path (from public folder)</label><input className="input" value={galleryData.src} onChange={e => setGalleryData({...galleryData, src: e.target.value})} required /></div>
                <div className="btn-group"><button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Processing...' : '🚀 Publish Photo'}</button></div>
              </form>
            </div>
            <div className="card">
              <div className="card-title">🖼️ Live Cloud Gallery Images</div>
              <div className="data-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', flexDirection: 'unset' }}>
                {(gallery || []).map((img) => (
                  <div key={img.id} style={{ border: '1px solid #edf2f7', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
                    <img src={img.src} alt={img.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                    <div style={{ padding: '15px' }}><span className="badge" style={{ background: '#fff3cd', color: '#856404' }}>{img.cat}</span><h4 style={{ margin: '5px 0', fontSize: '15px', color: COLORS.navy }}>{img.title}</h4><button className="btn btn-danger" style={{ padding: '8px 0', width: '100%', marginTop: '10px', fontSize: '13px' }} onClick={() => handleDeleteGalleryPhoto(img.id)}>🗑️ Remove Photo</button></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'pages' && (
          <>
            <div className="card">
              <div className="card-title">📄 {editingPage ? 'Edit Page Details' : 'Design New Page'}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px', background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #edf2f7' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600, color: COLORS.navy }}><input type="radio" value="update" checked={pageCreationMode === 'update'} onChange={() => setPageCreationMode('update')} /> Update Existing Menu Link</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600, color: COLORS.navy }}><input type="radio" value="create" checked={pageCreationMode === 'create'} onChange={() => setPageCreationMode('create')} /> Create Custom URL Page</label>
              </div>
              <div className="form-grid">
                <div className="form-group"><label className="label">Page Title</label><input className="input" placeholder="e.g. Computer Science" value={pageData.title} onChange={e => setPageData({...pageData, title: e.target.value})} required /></div>
                <div className="form-group"><label className="label">{pageCreationMode === 'update' ? 'Target Menu Link' : 'Custom URL Slug'}</label>
                  {pageCreationMode === 'update' ? (
                    <select className="input" value={pageData.path} onChange={e => setPageData({...pageData, path: e.target.value, slug: '' })} required>
                      <option value="">-- Select Menu --</option>
                      {flattenedMenus.map(m => <option key={m.id} value={m.href}>{m.pathStr} {m.href ? `(${m.href})` : ''}</option>)}
                    </select>
                  ) : (<input className="input" placeholder="e.g. computer-science" value={pageData.slug} onChange={e => setPageData({...pageData, slug: e.target.value.toLowerCase().trim().replace(/\s+/g, '-'), path: '' })} required />)}
                </div>              
              </div>
              <div className="form-group"><label className="label">Page Content</label><JoditEditor ref={editor} value={pageData.content} config={config} tabIndex={1} onBlur={newContent => setPageData({...pageData, content: newContent})} /></div>
              <div className="btn-group">
                <button type="button" className="btn btn-secondary" onClick={() => handlePreview(pageData.content)}>👁️ Preview</button>
                <button className="btn btn-gold" onClick={handleAddPage} disabled={loading}>{loading ? 'Processing...' : (editingPage ? '💾 Save Changes' : '🚀 Publish Page')}</button>
                {editingPage && <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>}
              </div>
            </div>
            <div className="card">
              <div className="card-title">📂 Live Pages Database</div>
              <div className="data-list">
                {(pages || []).map((p) => (
                  <div key={p.id} className="data-item" style={{ borderLeft: `4px solid ${COLORS.navy}` }}>
                    <div className="data-content" style={{ wordBreak: 'break-all' }}><h4>{p.title}</h4><a href={p.path ? `/#${p.path}` : `/#/p/${p.slug}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: COLORS.gold, textDecoration: 'none', fontWeight: 700 }}>🔗 View Live Page</a></div>
                    <div className="btn-group action-btns"><button className="btn btn-secondary" style={{padding:'8px 16px'}} onClick={() => handleEdit(p)}>✏️ Edit</button><button className="btn btn-danger" style={{padding:'8px 16px'}} onClick={() => handleDelete(p.id)}>🗑️</button></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'notices' && (
          <>
            <div className="card">
              <div className="card-title">📢 {editingNotice ? 'Edit Notice' : 'Broadcast New Notice'}</div>
              <form onSubmit={handleAddNotice}>
                <div className="form-grid">
                  <div className="form-group"><label className="label">Category</label><select className="input" value={noticeData.type} onChange={e => setNoticeData({...noticeData, type: e.target.value})}><option>General</option><option>Examination</option><option>Admission</option><option>Holiday</option></select></div>
                  <div className="form-group"><label className="label">Attachment URL (Drive/PDF)</label><input className="input" placeholder="Optional Link" value={noticeData.link} onChange={e => setNoticeData({...noticeData, link: e.target.value})} /></div>
                  <div className="form-group" style={{alignSelf: 'center'}}><label className="label" style={{display: 'flex', alignItems: 'center', gap: '10px'}}><input type="checkbox" checked={noticeData.isNew} onChange={e => setNoticeData({...noticeData, isNew: e.target.checked})} /> Show "NEW" Badge</label></div>
                </div>
                <div className="form-group"><label className="label">Notice Message (Rich Text)</label><JoditEditor ref={editor} value={noticeData.text} config={config} onBlur={newContent => setNoticeData({...noticeData, text: newContent})} /></div>
                <div className="btn-group"><button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Processing...' : (editingNotice ? '💾 Update Notice' : '🚀 Broadcast Notice')}</button>{editingNotice && <button type="button" className="btn btn-secondary" onClick={handleCancelEditNotice}>Cancel</button>}</div>
              </form>
            </div>
            <div className="card">
              <div className="card-title">📋 Recent Notices</div>
              <div className="data-list">
                {(notices || []).map((n) => (
                  <div key={n.id} className="data-item" style={{ borderLeft: `5px solid ${COLORS.gold}` }}>
                    <div className="data-content" style={{ flex: 1 }}><span className="badge" style={{ background: '#fff3cd', color: '#856404' }}>{n.type} {n.isNew && <span style={{color: 'red', marginLeft: '5px'}}> (NEW)</span>}</span><span style={{ fontSize: '12px', marginLeft: '12px', color: '#718096', fontWeight: 600 }}>📅 {n.date ? new Date(n.date).toLocaleDateString('en-GB') : 'N/A'}</span><div dangerouslySetInnerHTML={{ __html: n.text }} style={{ margin: '8px 0', fontSize: '15px', color: '#1a202c', fontWeight: 600 }} />{n.link && <a href={n.link} target="_blank" rel="noreferrer" style={{ fontSize: '12.5px', color: COLORS.navy, fontWeight: 700, textDecoration: 'none' }}>📎 Open Attachment</a>}</div>
                    <div className="btn-group action-btns"><button className="btn btn-secondary" style={{padding:'8px 16px'}} onClick={() => handleEditNotice(n)}>✏️</button><button className="btn btn-danger" style={{padding:'8px 16px'}} onClick={() => handleDeleteNotice(n.id)}>🗑️</button></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'announcements' && (
          <>
            <div className="card">
              <div className="card-title">📣 {editingAnnouncement ? 'Edit News' : 'Publish Academic News'}</div>
              <form onSubmit={handleAddAnnouncement}>
                <div className="form-grid"><div className="form-group"><label className="label">News Category</label><select className="input" value={announcementData.type} onChange={e => setAnnouncementData({...announcementData, type: e.target.value})}><option>News</option><option>Achievement</option><option>Update</option></select></div><div className="form-group"><label className="label">Reference Link (Optional)</label><input className="input" placeholder="URL" value={announcementData.link} onChange={e => setAnnouncementData({...announcementData, link: e.target.value})} /></div></div>
                <div className="form-group"><label className="label">News Content (Rich Text)</label><JoditEditor ref={editor} value={announcementData.text} config={config} onBlur={newContent => setAnnouncementData({...announcementData, text: newContent})} /></div>
                <div className="btn-group"><button type="submit" className="btn btn-primary" disabled={loading}>{editingAnnouncement ? '💾 Update News' : '🚀 Publish News'}</button>{editingAnnouncement && <button type="button" className="btn btn-secondary" onClick={handleCancelEditAnnouncement}>Cancel</button>}</div>
              </form>
            </div>
            <div className="card">
              <div className="card-title">🗞️ Published News</div>
              <div className="data-list">
                {(announcements || []).map((a) => (
                  <div key={a.id} className="data-item" style={{ borderLeft: `5px solid #d32f2f` }}>
                    <div className="data-content" style={{ flex: 1 }}><span className="badge" style={{ background: '#ffe5e5', color: '#d32f2f' }}>{a.type}</span><div dangerouslySetInnerHTML={{ __html: a.text }} style={{ margin: '8px 0', fontSize: '15px', color: '#1a202c', fontWeight: 600 }} /></div>
                    <div className="btn-group action-btns"><button className="btn btn-secondary" style={{padding:'8px 16px'}} onClick={() => handleEditAnnouncement(a)}>✏️</button><button className="btn btn-danger" style={{padding:'8px 16px'}} onClick={() => handleDeleteAnnouncement(a.id)}>🗑️</button></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'pdfReports' && (
          <>
            <div className="card">
              <div className="card-title">📁 {editingPdfReport ? 'Edit Document' : 'Upload E-Document'}</div>
              <form onSubmit={handleAddPdfReport}>
                <div className="form-group"><label className="label">Document Title</label><input className="input" value={pdfReportData.title} onChange={e => setPdfReportData({...pdfReportData, title: e.target.value})} required /></div>
                <div className="form-grid"><div className="form-group"><label className="label">Document URL (Drive/PDF Link)</label><input className="input" value={pdfReportData.link} onChange={e => setPdfReportData({...pdfReportData, link: e.target.value})} required /></div><div className="form-group"><label className="label">Document Type</label><select className="input" value={pdfReportData.type} onChange={e => setPdfReportData({...pdfReportData, type: e.target.value})}><option>Document</option><option>Report</option><option>Syllabus</option></select></div></div>
                <div className="btn-group"><button type="submit" className="btn btn-primary" disabled={loading}>{editingPdfReport ? '💾 Update Doc' : '🚀 Publish Doc'}</button>{editingPdfReport && <button type="button" className="btn btn-secondary" onClick={handleCancelEditPdfReport}>Cancel</button>}</div>
              </form>
            </div>
            <div className="card">
              <div className="card-title">📚 Live Documents</div>
              <div className="data-list">
                {(pdfReports || []).map((p) => (
                  <div key={p.id} className="data-item" style={{ borderLeft: `5px solid #10b981` }}>
                    <div className="data-content" style={{ flex: 1 }}><span className="badge" style={{ background: '#e6f7f1', color: '#047857' }}>{p.type}</span><h4>{p.title}</h4><a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#10b981', textDecoration: 'none', fontWeight: 700 }}>⬇️ View / Download Source</a></div>
                    <div className="btn-group action-btns"><button className="btn btn-secondary" style={{padding:'8px 16px'}} onClick={() => handleEditPdfReport(p)}>✏️</button><button className="btn btn-danger" style={{padding:'8px 16px'}} onClick={() => handleDeletePdfReport(p.id)}>🗑️</button></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'events' && (
          <>
            <div className="card">
              <div className="card-title">🏆 {editingEvent ? 'Edit Campus Event' : 'Add Campus Event'}</div>
              <form onSubmit={handleAddEvent}>
                <div className="form-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                  <div className="form-group"><label className="label">Event Title</label><input className="input" value={eventData.title} onChange={e => setEventData({...eventData, title: e.target.value})} required /></div><div className="form-group"><label className="label">Event Type</label><select className="input" value={eventData.type} onChange={e => setEventData({...eventData, type: e.target.value})}><option>WORKSHOP</option><option>SEMINAR</option><option>CULTURAL</option><option>SPORTS</option></select></div><div className="form-group"><label className="label">Day (e.g. 24)</label><input className="input" value={eventData.day} onChange={e => setEventData({...eventData, day: e.target.value})} /></div><div className="form-group"><label className="label">Month (e.g. MAR)</label><input className="input" value={eventData.month} onChange={e => setEventData({...eventData, month: e.target.value})} /></div><div className="form-group"><label className="label">Location</label><input className="input" value={eventData.location} onChange={e => setEventData({...eventData, location: e.target.value})} /></div><div className="form-group"><label className="label">Status</label><select className="input" value={eventData.status} onChange={e => setEventData({...eventData, status: e.target.value})}><option value="upcoming">Upcoming Event</option><option value="recent">Recent Event</option></select></div>
                </div>
                <div className="form-group"><label className="label">Image Path (from public folder)</label><input className="input" placeholder="e.g. /images/sports-day.jpg" value={eventData.imageUrl} onChange={e => setEventData({...eventData, imageUrl: e.target.value})} /></div>
                <div className="form-group"><label className="label">Event Description (Rich Text)</label><JoditEditor ref={editor} value={eventData.desc} config={config} onBlur={newContent => setEventData({...eventData, desc: newContent})} /></div>
                <div className="btn-group"><button type="submit" className="btn btn-primary" disabled={loading}>{editingEvent ? '💾 Update Event' : '🚀 Publish Event'}</button>{editingEvent && <button type="button" className="btn btn-secondary" onClick={handleCancelEditEvent}>Cancel</button>}</div>
              </form>
            </div>
            <div className="card">
              <div className="card-title">📆 Event Roster</div>
              <div className="data-list">
                {(events || []).map((e) => (
                  <div key={e.id} className="data-item" style={{ borderLeft: `5px solid #8b5cf6` }}>
                    <div className="data-content" style={{ flex: 1 }}><span className="badge" style={{ background: '#ede9fe', color: '#6d28d9' }}>{e.type}</span><h4>{e.title}</h4><div dangerouslySetInnerHTML={{ __html: e.desc }} style={{ fontSize: '13px', color: '#666', marginTop: '5px' }} /><p style={{ marginTop: '5px', fontSize: '12px', fontWeight: 'bold' }}>📍 {e.location || 'Campus'} &nbsp; | &nbsp; 📅 {e.day} {e.month}</p></div>
                    <div className="btn-group action-btns"><button className="btn btn-secondary" style={{padding:'8px 16px'}} onClick={() => handleEditEvent(e)}>✏️</button><button className="btn btn-danger" style={{padding:'8px 16px'}} onClick={() => handleDeleteEvent(e.id)}>🗑️</button></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {showPreview && (
          <div className="preview-modal-overlay">
              <div className="preview-modal-content">
                  <div className="preview-modal-header"><h3>Live Content Preview</h3><button onClick={() => setShowPreview(false)}>✕</button></div>
                  <div className="preview-modal-body dynamic-rich-content">{parse(DOMPurify.sanitize(previewContent, { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] }))}</div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}