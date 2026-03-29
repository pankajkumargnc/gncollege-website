// src/components/admin/tabs/DriveTab.jsx
// 🚀 ULTRA PRO MAX DRIVE MANAGER (All .env Folders Synced)

import { useState, useEffect } from 'react';
import { db } from "../../../firebase";
import { collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD } from '../AdminShared';

// ── 📂 ALL .ENV FOLDERS CONFIGURATION ──
const DRIVE_CATEGORIES = [
  // ── 📄 PDF DOCUMENTS ──
  { 
    id: 'notices', 
    label: '📢 Notices', 
    folderId: import.meta.env.VITE_DRIVE_NOTICE_FOLDER, 
    dbCollection: 'notices',
    type: 'pdf'
  },
  { 
    id: 'regulations', 
    label: '📜 Regulations', 
    folderId: import.meta.env.VITE_DRIVE_REGULATIONS_FOLDER, 
    dbCollection: 'regulations',
    type: 'pdf'
  },
  { 
    id: 'event_reports', 
    label: '🏆 Event Reports', 
    folderId: import.meta.env.VITE_DRIVE_EVENT_REPORT_FOLDER, 
    dbCollection: 'eventReports',
    type: 'pdf'
  },
  { 
    id: 'college_docs', 
    label: '📂 College Docs', 
    folderId: import.meta.env.VITE_DRIVE_COLLEGE_DOCUMENTS_FOLDER, 
    dbCollection: 'collegeDocs',
    type: 'pdf'
  },
  { 
    id: 'main_docs', 
    label: '🗂️ Main Docs Folder', 
    folderId: import.meta.env.VITE_DRIVE_DOCUMENT_FOLDER, 
    dbCollection: 'generalDocs',
    type: 'pdf'
  },
  
  // ── 🖼️ IMAGES ──
  { 
    id: 'slider', 
    label: '🖼️ Hero Slider', 
    folderId: import.meta.env.VITE_DRIVE_HERO_SLIDER_FOLDER, 
    dbCollection: 'slider',
    type: 'image'
  },
  { 
    id: 'main_images', 
    label: '📸 Main Images Gallery', 
    folderId: import.meta.env.VITE_DRIVE_IMAGES_FOLDER, 
    dbCollection: 'gallery',
    type: 'image'
  }
];

export default function DriveTab({ logAct }) {
  const [activeTab, setActiveTab] = useState(DRIVE_CATEGORIES[0]);
  const [driveFiles, setDriveFiles] = useState([]);
  const [publishedIds, setPublishedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  // ── 1. FETCH DRIVE FILES & FIREBASE STATUS ──
  const fetchTabData = async () => {
    if (!API_KEY || !activeTab.folderId) {
      toast.error(`Folder ID for ${activeTab.label} is missing in .env!`);
      return;
    }

    setLoading(true);
    try {
      // A. Fetch from Google Drive (Godown)
      const mimeQuery = activeTab.type === 'image' ? "mimeType contains 'image/'" : "mimeType='application/pdf'";
      const r = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${activeTab.folderId}'+in+parents+and+${mimeQuery}&key=${API_KEY}&fields=files(id,name,createdTime,size,thumbnailLink)`
      );
      const d = await r.json();
      if (d.error) throw new Error(d.error.message);
      
      const files = d.files || [];
      // Sort files by newest first
      files.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
      setDriveFiles(files);

      // B. Fetch from Firebase (Live Shop)
      const querySnapshot = await getDocs(collection(db, activeTab.dbCollection));
      const liveIds = new Set();
      querySnapshot.forEach((doc) => {
        liveIds.add(doc.id); 
      });
      setPublishedIds(liveIds);

    } catch (e) {
      toast.error(`Error fetching data: ${e.message}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTabData();
  }, [activeTab]);

  // ── 2. PUBLISH TO LIVE WEBSITE ──
  const handlePublish = async (file) => {
    setProcessingId(file.id);
    try {
      const publishData = {
        title: file.name.replace('.pdf', ''), 
        link: activeTab.type === 'pdf' ? `https://drive.google.com/file/d/${file.id}/preview` : file.thumbnailLink?.replace('=s220', '=s1000'),
        date: new Date(file.createdTime).toISOString(),
        publishedAt: serverTimestamp(),
        driveId: file.id,
        status: 'active'
      };

      await setDoc(doc(db, activeTab.dbCollection, file.id), publishData);
      
      setPublishedIds(prev => new Set(prev).add(file.id));
      toast.success(`${file.name} published to ${activeTab.label}!`);
      logAct?.('publish', `Published ${file.name} to ${activeTab.label}`, activeTab.dbCollection);
      
    } catch (err) {
      toast.error(`Publish failed: ${err.message}`);
    }
    setProcessingId(null);
  };

  // ── 3. UNPUBLISH FROM LIVE WEBSITE ──
  const handleUnpublish = async (file) => {
    if (!window.confirm(`Are you sure you want to remove "${file.name}" from the live website?`)) return;
    
    setProcessingId(file.id);
    try {
      await deleteDoc(doc(db, activeTab.dbCollection, file.id));
      
      setPublishedIds(prev => {
        const next = new Set(prev);
        next.delete(file.id);
        return next;
      });
      toast.success(`${file.name} removed from live site.`);
      logAct?.('unpublish', `Removed ${file.name} from ${activeTab.label}`, activeTab.dbCollection);
      
    } catch (err) {
      toast.error(`Unpublish failed: ${err.message}`);
    }
    setProcessingId(null);
  };

  return (
    <div className="fade-up" style={{ paddingBottom: '40px' }}>
      
      {/* ── HEADER ── */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 8px 0', color: NAVY, fontSize: '24px', fontWeight: 900 }}>☁️ Central Drive Manager</h2>
        <p style={{ margin: 0, color: '#64748b', fontSize: '14px', fontWeight: 600 }}>
          Manage your Google Drive files. Only published files will appear on the live website.
        </p>
      </div>

      {/* ── CATEGORY TABS (FLEX WRAP FOR MULTIPLE FOLDERS) ── */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {DRIVE_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat)}
            style={{
  padding: '10px 18px', borderRadius: '50px', cursor: 'pointer',
  fontWeight: 800, fontSize: '13px', transition: 'all 0.3s',
  background: activeTab.id === cat.id ? NAVY : '#fff',
  color: activeTab.id === cat.id ? '#fff' : '#64748b',
  boxShadow: activeTab.id === cat.id ? '0 6px 15px rgba(15,35,71,0.2)' : '0 2px 5px rgba(0,0,0,0.05)',
  border: activeTab.id !== cat.id ? '1px solid #e2e8f0' : 'none',
  whiteSpace: 'nowrap'
}}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── FILE LISTING AREA ── */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        
        {/* Toolbar */}
        <div style={{ padding: '16px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, color: NAVY, fontSize: '16px' }}>
            {activeTab.label} Files ({driveFiles.length})
          </div>
          <button onClick={fetchTabData} style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 700, color: NAVY, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }} title="Refresh List">
            🔄 Refresh Drive
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto 16px', borderColor: `${GOLD}40`, borderTopColor: GOLD }}></div>
            <div style={{ color: '#64748b', fontWeight: 700 }}>Scanning Google Drive...</div>
          </div>
        ) : driveFiles.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <h3 style={{ margin: '0 0 8px', color: NAVY }}>Folder is Empty</h3>
            <p style={{ fontSize: '14px' }}>Upload files to your Google Drive folder first.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {driveFiles.map(file => {
              const isPublished = publishedIds.has(file.id);
              const isProcessing = processingId === file.id;

              return (
                <div key={file.id} style={{ 
                  display: 'flex', alignItems: 'center', padding: '16px 24px', 
                  borderBottom: '1px solid #f1f5f9', gap: '16px',
                  background: isPublished ? '#f0fdf4' : '#ffffff',
                  transition: 'background 0.3s',
                  flexWrap: 'wrap' // Mobile support
                }}>
                  
                  {/* File Icon / Thumbnail */}
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', overflow: 'hidden', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #e2e8f0' }}>
                    {activeTab.type === 'image' && file.thumbnailLink ? (
                      <img src={file.thumbnailLink} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: '24px' }}>📄</span>
                    )}
                  </div>

                  {/* File Info */}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ fontWeight: 800, color: NAVY, fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {file.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', fontWeight: 600 }}>
                      {new Date(file.createdTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} 
                      {' '}• {(file.size / 1024).toFixed(0)} KB
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div style={{
                    padding: '6px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 900, letterSpacing: '0.5px',
                    background: isPublished ? '#dcfce7' : '#f1f5f9',
                    color: isPublished ? '#166534' : '#64748b',
                    display: 'flex', alignItems: 'center', gap: '4px'
                  }}>
                    {isPublished ? '🟢 LIVE ON SITE' : '🟡 IN GODOWN'}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <a href={`https://drive.google.com/file/d/${file.id}/view`} target="_blank" rel="noreferrer" 
                       style={{ padding: '8px 16px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', color: NAVY, textDecoration: 'none', fontSize: '13px', fontWeight: 700, transition: '0.2s', display: 'flex', alignItems: 'center' }}>
                      👁️ View
                    </a>
                    
                    {isPublished ? (
                      <button onClick={() => handleUnpublish(file)} disabled={isProcessing}
                        style={{ padding: '8px 16px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px', color: '#b91c1c', cursor: 'pointer', fontSize: '13px', fontWeight: 800, transition: '0.2s', width: '130px' }}>
                        {isProcessing ? '⏳...' : '✖ Unpublish'}
                      </button>
                    ) : (
                      <button onClick={() => handlePublish(file)} disabled={isProcessing}
                        style={{ padding: '8px 16px', background: NAVY, border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 800, transition: '0.2s', boxShadow: '0 4px 10px rgba(15,35,71,0.2)', width: '130px' }}>
                        {isProcessing ? '⏳...' : '🚀 Publish'}
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}