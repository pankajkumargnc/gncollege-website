import React, { useState, useRef, useEffect } from 'react';
import { COLORS } from '../styles/colors';
import { db } from '../firebase'; 
import { collection, addDoc, serverTimestamp, doc, deleteDoc, updateDoc } from 'firebase/firestore';

// ==========================================
// 🌟 ADVANCED RICH TEXT EDITOR (In-built)
// ==========================================
const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const format = (command, val = null) => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      editorRef.current.focus();
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const addLink = () => {
    const url = prompt('Enter the link URL (e.g., https://google.com): ', 'https://');
    if (url) format('createLink', url);
  };

  const addImage = () => {
    const url = prompt('Enter the Image URL: ', 'https://');
    if (url) format('insertImage', url);
  };

  const btnStyle = { padding: '6px 10px', background: '#fff', border: '1px solid #cbd5e0', borderRadius: '6px', cursor: 'pointer', fontSize: '15px', color: COLORS.navy, fontWeight: 'bold' };
  const selectStyle = { padding: '6px', background: '#fff', border: '1px solid #cbd5e0', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: COLORS.navy, fontWeight: 'bold' };

  return (
    <div style={{ border: '2px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', background: '#fff' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '12px', background: '#f8fafc', borderBottom: '2px solid #e2e8f0', alignItems: 'center' }}>
        <button type="button" onClick={() => format('bold')} style={btnStyle} title="Bold">B</button>
        <button type="button" onClick={() => format('italic')} style={{...btnStyle, fontStyle: 'italic'}} title="Italic">I</button>
        <button type="button" onClick={() => format('underline')} style={{...btnStyle, textDecoration: 'underline'}} title="Underline">U</button>
        <span style={{ width: '1px', background: '#cbd5e0', margin: '0 5px' }}></span>
        <select onChange={(e) => format('formatBlock', e.target.value)} style={selectStyle}>
          <option value="P">Paragraph</option><option value="H1">Heading 1</option><option value="H2">Heading 2</option><option value="H3">Heading 3</option>
        </select>
        <select onChange={(e) => format('fontSize', e.target.value)} style={selectStyle}>
          <option value="">Font Size</option><option value="1">Small</option><option value="3">Normal</option><option value="5">Large</option>
        </select>
        <span style={{ width: '1px', background: '#cbd5e0', margin: '0 5px' }}></span>
        <input type="color" onChange={(e) => format('foreColor', e.target.value)} title="Text Color" style={{ width: '32px', height: '32px', padding: '0', border: 'none', cursor: 'pointer', borderRadius: '6px' }} />
        <span style={{ width: '1px', background: '#cbd5e0', margin: '0 5px' }}></span>
        <button type="button" onClick={() => format('justifyLeft')} style={btnStyle}>⫷</button>
        <button type="button" onClick={() => format('justifyCenter')} style={btnStyle}>≡</button>
        <button type="button" onClick={() => format('justifyRight')} style={btnStyle}>⫸</button>
        <span style={{ width: '1px', background: '#cbd5e0', margin: '0 5px' }}></span>
        <button type="button" onClick={() => format('insertOrderedList')} style={btnStyle}>1.</button>
        <button type="button" onClick={() => format('insertUnorderedList')} style={btnStyle}>•</button>
        <span style={{ width: '1px', background: '#cbd5e0', margin: '0 5px' }}></span>
        <button type="button" onClick={addLink} style={btnStyle}>🔗</button>
        <button type="button" onClick={addImage} style={btnStyle}>🖼️</button>
      </div>
      <div 
        ref={editorRef} contentEditable="true" onInput={handleInput} onBlur={handleInput}
        style={{ minHeight: '200px', maxHeight: '500px', overflowY: 'auto', padding: '20px', outline: 'none', fontSize: '15px', lineHeight: '1.6' }}
        data-placeholder={placeholder}
      />
    </div>
  );
};


// ==========================================
// 🌟 MAIN ADMIN PANEL COMPONENT
// ==========================================
const formatPathToLabel = (path) => path.replace(/^\//, '').replace(/-/g, ' ').split('/').map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)).join(' > ');

export default function AdminPanel({ onClose, notices, pages, events, gallery, placeholderPaths, announcements, pdfReports }) {
  const [activeTab, setActiveTab] = useState('pages');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const [pageCreationMode, setPageCreationMode] = useState('update');
  const [editingPage, setEditingPage] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingNotice, setEditingNotice] = useState(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [editingPdfReport, setEditingPdfReport] = useState(null);

  const [eventData, setEventData] = useState({ title: '', desc: '', type: 'WORKSHOP', day: '', month: '', location: '', status: 'upcoming', imageUrl: '' });
  const [noticeData, setNoticeData] = useState({ text: '', link: '', type: 'General' });
  const [pageData, setPageData] = useState({ title: '', content: '', path: '', slug: '', contentType: 'html' });
  const [announcementData, setAnnouncementData] = useState({ text: '', link: '', type: 'News' });
  const [pdfReportData, setPdfReportData] = useState({ title: '', link: '', type: 'Document' });

  // 🌟 NAYA GALLERY STATE (Sirf Text Path Save Karega)
  const [galleryData, setGalleryData] = useState({ title: '', cat: 'Seminars', src: '' });

  const handleAddGalleryPhoto = async (e) => {
    e.preventDefault();
    if (!galleryData.src.trim()) return alert("Image path is required.");
    setLoading(true);
    try {
      await addDoc(collection(db, 'gallery'), { 
        title: galleryData.title, 
        cat: galleryData.cat, 
        src: galleryData.src, // Seedha manual path jayega
        createdAt: serverTimestamp() 
      });
      alert('Photo published to Gallery successfully!');
      setGalleryData({ title: '', cat: 'Seminars', src: '' }); // Form Reset
    } catch (err) { alert('Upload Error: ' + err.message); }
    setLoading(false);
  };

  const handleDeleteGalleryPhoto = async (id) => {
    if (window.confirm('Are you sure you want to remove this photo?')) {
      try { await deleteDoc(doc(db, 'gallery', id)); alert('Photo removed successfully!'); } catch (err) { alert('Error: ' + err.message); }
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingEvent) { await updateDoc(doc(db, 'events', editingEvent.id), { ...eventData, updatedAt: serverTimestamp() }); alert('Event updated!'); } 
      else { await addDoc(collection(db, 'events'), { ...eventData, createdAt: serverTimestamp() }); alert('Event added!'); }
      handleCancelEditEvent();
    } catch (err) { alert('Error: ' + err.message); }
    setLoading(false);
  };

  const handleAddNotice = async (e) => {
    e.preventDefault();
    if (!noticeData.text.trim()) return alert("Notice text is required");
    setLoading(true);
    try {
      if (editingNotice) { await updateDoc(doc(db, 'notices', editingNotice.id), { ...noticeData, updatedAt: serverTimestamp() }); alert('Notice updated!'); } 
      else { await addDoc(collection(db, 'notices'), { ...noticeData, date: new Date().toISOString(), isNew: true, createdAt: serverTimestamp() }); alert('Notice published!'); }
      handleCancelEditNotice();
    } catch (err) { alert('Error: ' + err.message); }
    setLoading(false);
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    if (!announcementData.text.trim()) return alert("Announcement text is required");
    setLoading(true);
    try {
      if (editingAnnouncement) { await updateDoc(doc(db, 'announcements', editingAnnouncement.id), { ...announcementData, updatedAt: serverTimestamp() }); alert('News updated!'); } 
      else { await addDoc(collection(db, 'announcements'), { ...announcementData, date: new Date().toISOString(), createdAt: serverTimestamp() }); alert('News published!'); }
      handleCancelEditAnnouncement();
    } catch (err) { alert('Error: ' + err.message); }
    setLoading(false);
  };

  const handleAddPdfReport = async (e) => {
    e.preventDefault();
    if (!pdfReportData.title.trim() || !pdfReportData.link.trim()) return alert("Title and Link are required");
    setLoading(true);
    try {
      if (editingPdfReport) { await updateDoc(doc(db, 'pdfReports', editingPdfReport.id), { ...pdfReportData, updatedAt: serverTimestamp() }); alert('Document updated!'); } 
      else { await addDoc(collection(db, 'pdfReports'), { ...pdfReportData, date: new Date().toISOString(), createdAt: serverTimestamp() }); alert('Document published!'); }
      handleCancelEditPdfReport();
    } catch (err) { alert('Error: ' + err.message); }
    setLoading(false);
  };

  const handleAddPage = async (e) => {
    e.preventDefault();
    if (pageCreationMode === 'update' && (!pageData.title || !pageData.path)) return alert("Title and Menu Link required");
    if (pageCreationMode === 'create' && (!pageData.title || !pageData.slug)) return alert("Title and Slug required");
    setLoading(true);
    try {
      const dataToSave = { title: pageData.title.trim(), content: pageData.content, contentType: pageData.contentType, path: pageCreationMode === 'update' ? pageData.path : '', slug: pageCreationMode === 'create' ? pageData.slug.trim() : '' };
      if (editingPage) { await updateDoc(doc(db, 'pages', editingPage.id), { ...dataToSave, updatedAt: serverTimestamp() }); alert('Page updated!'); } 
      else { await addDoc(collection(db, 'pages'), { ...dataToSave, createdAt: serverTimestamp() }); alert('Page created!'); }
      handleCancelEdit(); 
    } catch (err) { alert('Error: ' + err.message); }
    setLoading(false);
  };

  const handleEditEvent = (event) => { setEditingEvent(event); setEventData({ title: event.title || '', desc: event.desc || '', type: event.type || 'WORKSHOP', day: event.day || '', month: event.month || '', location: event.location || '', status: event.status || 'upcoming', imageUrl: event.imageUrl || '' }); };
  const handleEditNotice = (notice) => { setEditingNotice(notice); setNoticeData({ text: notice.text || '', link: notice.link || '', type: notice.type || 'General' }); };
  const handleEditAnnouncement = (announcement) => { setEditingAnnouncement(announcement); setAnnouncementData({ text: announcement.text || '', link: announcement.link || '', type: announcement.type || 'News' }); };
  const handleEditPdfReport = (report) => { setEditingPdfReport(report); setPdfReportData({ title: report.title || '', link: report.link || '', type: report.type || 'Document' }); };
  const handleEdit = (page) => { setEditingPage(page); setPageData({ title: page.title, content: page.content, path: page.path || '', slug: page.slug || '', contentType: page.contentType || 'html' }); setPageCreationMode(page.path ? 'update' : 'create'); };

  const handleCancelEditEvent = () => { setEditingEvent(null); setEventData({ title: '', desc: '', type: 'WORKSHOP', day: '', month: '', location: '', status: 'upcoming', imageUrl: '' }); };
  const handleCancelEditNotice = () => { setEditingNotice(null); setNoticeData({ text: '', link: '', type: 'General' }); };
  const handleCancelEditAnnouncement = () => { setEditingAnnouncement(null); setAnnouncementData({ text: '', link: '', type: 'News' }); };
  const handleCancelEditPdfReport = () => { setEditingPdfReport(null); setPdfReportData({ title: '', link: '', type: 'Document' }); };
  const handleCancelEdit = () => { setEditingPage(null); setPageData({ title: '', content: '', path: '', slug: '', contentType: 'html' }); };

  const handleDeleteEvent = async (id) => { if (window.confirm('Delete this event?')) { try { await deleteDoc(doc(db, 'events', id)); alert('Deleted!'); if (editingEvent?.id === id) handleCancelEditEvent(); } catch (err) { alert(err.message); } } };
  const handleDeleteNotice = async (id) => { if (window.confirm('Delete this notice?')) { try { await deleteDoc(doc(db, 'notices', id)); alert('Deleted!'); if (editingNotice?.id === id) handleCancelEditNotice(); } catch (err) { alert(err.message); } } };
  const handleDeleteAnnouncement = async (id) => { if (window.confirm('Delete this news?')) { try { await deleteDoc(doc(db, 'announcements', id)); alert('Deleted!'); if (editingAnnouncement?.id === id) handleCancelEditAnnouncement(); } catch (err) { alert(err.message); } } };
  const handleDeletePdfReport = async (id) => { if (window.confirm('Delete this Document?')) { try { await deleteDoc(doc(db, 'pdfReports', id)); alert('Deleted!'); if (editingPdfReport?.id === id) handleCancelEditPdfReport(); } catch (err) { alert(err.message); } } };
  const handleDelete = async (id) => { if (window.confirm('Delete this page?')) { try { await deleteDoc(doc(db, 'pages', id)); alert('Deleted!'); if (editingPage?.id === id) handleCancelEdit(); } catch (err) { alert(err.message); } } };

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
        .data-list { display: flex; flex-direction: column; gap: 15px; }
        .data-item { display: flex; justify-content: space-between; align-items: center; padding: 20px 25px; border: 1px solid #edf2f7; border-radius: 12px; background: #fff; }
        .data-content h4 { margin: 0 0 6px; color: ${COLORS.navy}; font-size: 16px; font-weight: 700; }
        .badge { font-size: 11px; padding: 4px 10px; border-radius: 6px; font-weight: 700; display: inline-block; margin-bottom: 8px; }
        
        .mobile-topbar { display: none; }
        .overlay { display: none; }
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

      {/* MOBILE TOPBAR & SIDEBAR */}
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
            { id: 'pages', label: 'Dynamic Pages', icon: '📄' }, { id: 'gallery', label: 'Photo Gallery', icon: '📸' },
            { id: 'notices', label: 'Notice Board', icon: '📢' }, { id: 'announcements', label: 'Academic News', icon: '📣' },
            { id: 'pdfReports', label: 'E-Documents', icon: '📁' }, { id: 'events', label: 'Campus Events', icon: '🏆' }
          ].map(tab => (
            <div key={tab.id} className={`nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}>
              <span className="nav-icon">{tab.icon}</span> <span>{tab.label}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '25px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button className="btn btn-danger" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>🚪 Logout Dashboard</button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="admin-main">
        
        {/* ==========================================
            0. PHOTO GALLERY (Ab Image Path ke zariye)
        ========================================== */}
        {activeTab === 'gallery' && (
          <>
            <div className="card">
              <div className="card-title">📸 Add to Photo Gallery</div>
              <form onSubmit={handleAddGalleryPhoto}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="label">Photo Title</label>
                    <input className="input" placeholder="e.g. Independence Day Celebration" value={galleryData.title} onChange={e => setGalleryData({...galleryData, title: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label className="label">Category</label>
                    <select className="input" value={galleryData.cat} onChange={e => setGalleryData({...galleryData, cat: e.target.value})}>
                      <option value="Seminars">Seminars</option><option value="Cultural Fest">Cultural Fest</option><option value="Guest Visit">Guest Visit</option><option value="Campus">Campus</option><option value="Departments">Departments</option><option value="NSS Programs">NSS Programs</option>
                    </select>
                  </div>
                </div>
                
                {/* 🌟 NAYA SIMPLE TEXT INPUT FOR IMAGE PATH */}
                <div className="form-group">
                  <label className="label">Image Path (from public folder)</label>
                  <input 
                    className="input" 
                    placeholder="e.g. /images/pf10.jpeg" 
                    value={galleryData.src} 
                    onChange={e => setGalleryData({...galleryData, src: e.target.value})} 
                    required 
                  />
                </div>

                <div className="btn-group">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Processing...' : '🚀 Publish Photo'}
                  </button>
                </div>
              </form>
            </div>
            <div className="card">
              <div className="card-title">🖼️ Live Cloud Gallery Images</div>
              <div className="data-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', flexDirection: 'unset' }}>
                {(gallery || []).map((img) => (
                  <div key={img.id} style={{ border: '1px solid #edf2f7', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
                    <img src={img.src} alt={img.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                    <div style={{ padding: '15px' }}>
                      <span className="badge" style={{ background: '#fff3cd', color: '#856404' }}>{img.cat}</span>
                      <h4 style={{ margin: '5px 0', fontSize: '15px', color: COLORS.navy }}>{img.title}</h4>
                      <button className="btn btn-danger" style={{ padding: '8px 0', width: '100%', marginTop: '10px', fontSize: '13px' }} onClick={() => handleDeleteGalleryPhoto(img.id)}>🗑️ Remove Photo</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* PAGES */}
        {activeTab === 'pages' && (
          <>
            <div className="card">
              <div className="card-title">📄 {editingPage ? 'Edit Page Details' : 'Design New Page'}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px', background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #edf2f7' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600, color: COLORS.navy }}><input type="radio" value="update" checked={pageCreationMode === 'update'} onChange={() => setPageCreationMode('update')} /> Update Existing Menu Link</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600, color: COLORS.navy }}><input type="radio" value="create" checked={pageCreationMode === 'create'} onChange={() => setPageCreationMode('create')} /> Create Custom URL Page</label>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="label">Page Title</label>
                  <input className="input" placeholder="e.g. Computer Science" value={pageData.title} onChange={e => setPageData({...pageData, title: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="label">{pageCreationMode === 'update' ? 'Target Menu Link' : 'Custom URL Slug'}</label>
                  {pageCreationMode === 'update' ? (
                    <select className="input" value={pageData.path} onChange={e => setPageData({...pageData, path: e.target.value, slug: '' })} required>
                      <option value="">-- Select Menu --</option>
                      {(placeholderPaths || []).map(path => <option key={path} value={path}>{formatPathToLabel(path)}</option>)}
                    </select>
                  ) : (
                    <input className="input" placeholder="e.g. computer-science" value={pageData.slug} onChange={e => setPageData({...pageData, slug: e.target.value.toLowerCase().trim().replace(/\s+/g, '-'), path: '' })} required />
                  )}
                </div>
              </div>
              <div className="form-group">
                <label className="label">Page Content</label>
                <RichTextEditor value={pageData.content} onChange={(content) => setPageData({...pageData, content})} />
              </div>
              <div className="btn-group">
                <button className="btn btn-gold" onClick={handleAddPage} disabled={loading}>{loading ? 'Processing...' : (editingPage ? '💾 Save Changes' : '🚀 Publish Page')}</button>
                {editingPage && <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>}
              </div>
            </div>
            <div className="card">
              <div className="card-title">📂 Live Pages Database</div>
              <div className="data-list">
                {(pages || []).map((p) => (
                  <div key={p.id} className="data-item" style={{ borderLeft: `4px solid ${COLORS.navy}` }}>
                    <div className="data-content">
                      <h4>{p.title}</h4>
                      <a href={p.path ? `/#${p.path}` : `/#/p/${p.slug}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: COLORS.gold, textDecoration: 'none', fontWeight: 700 }}>🔗 View Live Page</a>
                    </div>
                    <div className="btn-group action-btns">
                      <button className="btn btn-secondary" style={{padding:'8px 16px'}} onClick={() => handleEdit(p)}>✏️ Edit</button>
                      <button className="btn btn-danger" style={{padding:'8px 16px'}} onClick={() => handleDelete(p.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* NOTICES */}
        {activeTab === 'notices' && (
          <>
            <div className="card">
              <div className="card-title">📢 {editingNotice ? 'Edit Notice' : 'Broadcast New Notice'}</div>
              <form onSubmit={handleAddNotice}>
                <div className="form-grid">
                  <div className="form-group"><label className="label">Category</label><select className="input" value={noticeData.type} onChange={e => setNoticeData({...noticeData, type: e.target.value})}><option>General</option><option>Examination</option><option>Admission</option><option>Holiday</option></select></div>
                  <div className="form-group"><label className="label">Attachment URL (Drive/PDF)</label><input className="input" placeholder="Optional Link" value={noticeData.link} onChange={e => setNoticeData({...noticeData, link: e.target.value})} /></div>
                </div>
                <div className="form-group">
                  <label className="label">Notice Message (Rich Text)</label>
                  <RichTextEditor value={noticeData.text} onChange={(text) => setNoticeData({...noticeData, text})} />
                </div>
                <div className="btn-group">
                  <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Processing...' : (editingNotice ? '💾 Update Notice' : '🚀 Broadcast Notice')}</button>
                  {editingNotice && <button type="button" className="btn btn-secondary" onClick={handleCancelEditNotice}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="card">
              <div className="card-title">📋 Recent Notices</div>
              <div className="data-list">
                {(notices || []).map((n) => (
                  <div key={n.id} className="data-item" style={{ borderLeft: `5px solid ${COLORS.gold}` }}>
                    <div className="data-content" style={{ flex: 1 }}>
                      <span className="badge" style={{ background: '#fff3cd', color: '#856404' }}>{n.type}</span>
                      <span style={{ fontSize: '12px', marginLeft: '12px', color: '#718096', fontWeight: 600 }}>📅 {n.date ? new Date(n.date).toLocaleDateString('en-GB') : 'N/A'}</span>
                      <div dangerouslySetInnerHTML={{ __html: n.text }} style={{ margin: '8px 0', fontSize: '15px', color: '#1a202c', fontWeight: 600 }} />
                      {n.link && <a href={n.link} target="_blank" rel="noreferrer" style={{ fontSize: '12.5px', color: COLORS.navy, fontWeight: 700, textDecoration: 'none' }}>📎 Open Attachment</a>}
                    </div>
                    <div className="btn-group action-btns">
                      <button className="btn btn-secondary" style={{padding:'8px 16px'}} onClick={() => handleEditNotice(n)}>✏️</button>
                      <button className="btn btn-danger" style={{padding:'8px 16px'}} onClick={() => handleDeleteNotice(n.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <>
            <div className="card">
              <div className="card-title">📣 {editingAnnouncement ? 'Edit News' : 'Publish Academic News'}</div>
              <form onSubmit={handleAddAnnouncement}>
                <div className="form-grid">
                  <div className="form-group"><label className="label">News Category</label><select className="input" value={announcementData.type} onChange={e => setAnnouncementData({...announcementData, type: e.target.value})}><option>News</option><option>Achievement</option><option>Update</option></select></div>
                  <div className="form-group"><label className="label">Reference Link (Optional)</label><input className="input" placeholder="URL" value={announcementData.link} onChange={e => setAnnouncementData({...announcementData, link: e.target.value})} /></div>
                </div>
                <div className="form-group">
                  <label className="label">News Content (Rich Text)</label>
                  <RichTextEditor value={announcementData.text} onChange={(text) => setAnnouncementData({...announcementData, text})} />
                </div>
                <div className="btn-group">
                  <button type="submit" className="btn btn-primary" disabled={loading}>{editingAnnouncement ? '💾 Update News' : '🚀 Publish News'}</button>
                  {editingAnnouncement && <button type="button" className="btn btn-secondary" onClick={handleCancelEditAnnouncement}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="card">
              <div className="card-title">🗞️ Published News</div>
              <div className="data-list">
                {(announcements || []).map((a) => (
                  <div key={a.id} className="data-item" style={{ borderLeft: `5px solid #d32f2f` }}>
                    <div className="data-content" style={{ flex: 1 }}>
                      <span className="badge" style={{ background: '#ffe5e5', color: '#d32f2f' }}>{a.type}</span>
                      <div dangerouslySetInnerHTML={{ __html: a.text }} style={{ margin: '8px 0', fontSize: '15px', color: '#1a202c', fontWeight: 600 }} />
                    </div>
                    <div className="btn-group action-btns">
                      <button className="btn btn-secondary" style={{padding:'8px 16px'}} onClick={() => handleEditAnnouncement(a)}>✏️</button>
                      <button className="btn btn-danger" style={{padding:'8px 16px'}} onClick={() => handleDeleteAnnouncement(a.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* PDF REPORTS */}
        {activeTab === 'pdfReports' && (
          <>
            <div className="card">
              <div className="card-title">📁 {editingPdfReport ? 'Edit Document' : 'Upload E-Document'}</div>
              <form onSubmit={handleAddPdfReport}>
                <div className="form-group">
                  <label className="label">Document Title</label>
                  <input className="input" value={pdfReportData.title} onChange={e => setPdfReportData({...pdfReportData, title: e.target.value})} required />
                </div>
                <div className="form-grid">
                  <div className="form-group"><label className="label">Document URL (Drive/PDF Link)</label><input className="input" value={pdfReportData.link} onChange={e => setPdfReportData({...pdfReportData, link: e.target.value})} required /></div>
                  <div className="form-group"><label className="label">Document Type</label><select className="input" value={pdfReportData.type} onChange={e => setPdfReportData({...pdfReportData, type: e.target.value})}><option>Document</option><option>Report</option><option>Syllabus</option></select></div>
                </div>
                <div className="btn-group">
                  <button type="submit" className="btn btn-primary" disabled={loading}>{editingPdfReport ? '💾 Update Doc' : '🚀 Publish Doc'}</button>
                  {editingPdfReport && <button type="button" className="btn btn-secondary" onClick={handleCancelEditPdfReport}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="card">
              <div className="card-title">📚 Live Documents</div>
              <div className="data-list">
                {(pdfReports || []).map((p) => (
                  <div key={p.id} className="data-item" style={{ borderLeft: `5px solid #10b981` }}>
                    <div className="data-content" style={{ flex: 1 }}>
                      <span className="badge" style={{ background: '#e6f7f1', color: '#047857' }}>{p.type}</span>
                      <h4>{p.title}</h4>
                      <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#10b981', textDecoration: 'none', fontWeight: 700 }}>⬇️ View / Download Source</a>
                    </div>
                    <div className="btn-group action-btns">
                      <button className="btn btn-secondary" style={{padding:'8px 16px'}} onClick={() => handleEditPdfReport(p)}>✏️</button>
                      <button className="btn btn-danger" style={{padding:'8px 16px'}} onClick={() => handleDeletePdfReport(p.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* EVENTS */}
        {activeTab === 'events' && (
          <>
            <div className="card">
              <div className="card-title">🏆 {editingEvent ? 'Edit Campus Event' : 'Add Campus Event'}</div>
              <form onSubmit={handleAddEvent}>
                <div className="form-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                  <div className="form-group"><label className="label">Event Title</label><input className="input" value={eventData.title} onChange={e => setEventData({...eventData, title: e.target.value})} required /></div>
                  <div className="form-group"><label className="label">Event Type</label><select className="input" value={eventData.type} onChange={e => setEventData({...eventData, type: e.target.value})}><option>WORKSHOP</option><option>SEMINAR</option><option>CULTURAL</option><option>SPORTS</option></select></div>
                  <div className="form-group"><label className="label">Day (e.g. 24)</label><input className="input" value={eventData.day} onChange={e => setEventData({...eventData, day: e.target.value})} /></div>
                  <div className="form-group"><label className="label">Month (e.g. MAR)</label><input className="input" value={eventData.month} onChange={e => setEventData({...eventData, month: e.target.value})} /></div>
                  <div className="form-group"><label className="label">Location</label><input className="input" value={eventData.location} onChange={e => setEventData({...eventData, location: e.target.value})} /></div>
                  <div className="form-group"><label className="label">Status</label><select className="input" value={eventData.status} onChange={e => setEventData({...eventData, status: e.target.value})}><option value="upcoming">Upcoming Event</option><option value="recent">Recent Event</option></select></div>
                </div>
                <div className="form-group"><label className="label">Image Path (from public folder)</label><input className="input" placeholder="e.g. /images/sports-day.jpg" value={eventData.imageUrl} onChange={e => setEventData({...eventData, imageUrl: e.target.value})} /></div>
                <div className="form-group">
                  <label className="label">Event Description (Rich Text)</label>
                  <RichTextEditor value={eventData.desc} onChange={(desc) => setEventData({...eventData, desc})} />
                </div>
                <div className="btn-group">
                  <button type="submit" className="btn btn-primary" disabled={loading}>{editingEvent ? '💾 Update Event' : '🚀 Publish Event'}</button>
                  {editingEvent && <button type="button" className="btn btn-secondary" onClick={handleCancelEditEvent}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="card">
              <div className="card-title">📆 Event Roster</div>
              <div className="data-list">
                {(events || []).map((e) => (
                  <div key={e.id} className="data-item" style={{ borderLeft: `5px solid #8b5cf6` }}>
                    <div className="data-content" style={{ flex: 1 }}>
                      <span className="badge" style={{ background: '#ede9fe', color: '#6d28d9' }}>{e.type}</span>
                      <h4>{e.title}</h4>
                      <div dangerouslySetInnerHTML={{ __html: e.desc }} style={{ fontSize: '13px', color: '#666', marginTop: '5px' }} />
                      <p style={{ marginTop: '5px', fontSize: '12px', fontWeight: 'bold' }}>📍 {e.location || 'Campus'} &nbsp; | &nbsp; 📅 {e.day} {e.month}</p>
                    </div>
                    <div className="btn-group action-btns">
                      <button className="btn btn-secondary" style={{padding:'8px 16px'}} onClick={() => handleEditEvent(e)}>✏️</button>
                      <button className="btn btn-danger" style={{padding:'8px 16px'}} onClick={() => handleDeleteEvent(e.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}