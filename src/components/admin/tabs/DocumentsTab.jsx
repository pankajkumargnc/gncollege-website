// src/components/admin/tabs/DocumentsTab.jsx
// ═══════════════════════════════════════════════════════════════════════════════
// 🏛️ UNIVERSAL DOCUMENT & PUBLICATION VAULT — PRO-MAX ENTERPRISE HUB
// Handles E-Magazines, Annual Publications, Posters, NAAC, Audit, Syllabi & Results
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useState, useMemo, useEffect } from 'react';
import { db } from '../../../firebase';
import {
  collection, addDoc, updateDoc, doc, serverTimestamp, onSnapshot, query, orderBy
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { 
  FolderArchive, FileText, BookOpen, Download, Eye, EyeOff, Edit2, Trash2, 
  Plus, CheckCircle2, ExternalLink, FileSpreadsheet, Star, X, Image as ImageIcon,
  ShieldCheck, Clock, Search, PhoneCall
} from 'lucide-react';
import MediaPicker from '../../MediaPicker';
import {
  T, NAVY, GOLD, BG, useLocalDraft, SectionSearch, BulkBar, MiniLog,
} from '../AdminShared';
import { clearCache } from '../../../utils/cachedFetch';
import { resolveUrl } from '../../../utils/resolver';

export const DOCUMENT_CATEGORIES = [
  'E-Magazine & Publications',
  'Examination Results',
  'NAAC, SSR & IQAC Reports',
  'Academic Syllabus & Regulations',
  'Audit Reports & Financials',
  'Circulars, Orders & Event Posters',
  'General College Documents',
];

export const TARGET_DESTINATIONS = [
  { id: 'magazine',       label: 'E-Magazine Portal (/publication/e-magazine)', defaultCat: 'E-Magazine & Publications' },
  { id: 'documents',      label: 'Universal Document Archive (/documents)',     defaultCat: 'General College Documents' },
  { id: 'audit-report',   label: 'Audit Reports Page (/about-us/audit-report)',  defaultCat: 'Audit Reports & Financials' },
  { id: 'naac',           label: 'NAAC SSR & IQAC Repository (/naac)',          defaultCat: 'NAAC, SSR & IQAC Reports' },
  { id: 'iqac',           label: 'IQAC Quality Benchmarks (/academics/iqac)',   defaultCat: 'NAAC, SSR & IQAC Reports' },
  { id: 'result-2024',    label: 'Exam Results 2024 (/publication/results)',    defaultCat: 'Examination Results' },
  { id: 'result-2023',    label: 'Exam Results 2023 (/publication/results)',    defaultCat: 'Examination Results' },
  { id: 'sss-2023-24',    label: 'SSS Report 2023-24 (/publication/sss-report)', defaultCat: 'NAAC, SSR & IQAC Reports' },
  { id: 'syllabus',       label: 'Department Syllabus & Regulations',           defaultCat: 'Academic Syllabus & Regulations' },
];

export default function DocumentsTab({
  pdfReports, logAct, getSectionLog, softDelete, bulkDelete,
}) {
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData, clearDraft] = useLocalDraft('doc_vault_v2', {
    title:        '',
    category:     'E-Magazine & Publications',
    targetPage:   'magazine',
    year:         new Date().getFullYear().toString(),
    volumeIssue:  '',
    pdfUrl:       '',
    coverImage:   '',
    description:  '',
    isFeatured:   false,
    isPublic:     true,
    docType:      'Magazine',
  });

  const [search,    setSearch]    = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [selected,  setSelected]  = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // Student Document Requests State
  const [vaultSection, setVaultSection] = useState('publications'); // 'publications' | 'requests'
  const [docRequests, setDocRequests] = useState([]);
  const [reqSearch, setReqSearch] = useState('');
  const [reqFilter, setReqFilter] = useState('All');

  useEffect(() => {
    if (!db) return;
    try {
      const q = query(collection(db, 'document_requests'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, (snap) => {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setDocRequests(list);
      }, () => {});
      return () => unsub();
    } catch {}
  }, []);

  const updateRequestStatus = async (reqId, newStatus, newStage, remark) => {
    try {
      if (db) {
        await updateDoc(doc(db, 'document_requests', reqId), {
          status: newStatus,
          stage: newStage,
          statusRemark: remark,
          updatedAt: serverTimestamp(),
        });
      }
      setDocRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: newStatus, stage: newStage, statusRemark: remark } : r));
      toast.success(`Request marked as ${newStatus}!`);
      logAct?.('update', `Document request ${reqId} marked ${newStatus}`, 'documents');
    } catch (err) {
      toast.error('Failed to update status: ' + err.message);
    }
  };

  // Auto-sync targetPage and default Category when selected
  const handleDestinationChange = (destId) => {
    const dest = TARGET_DESTINATIONS.find(d => d.id === destId);
    setFormData(prev => ({
      ...prev,
      targetPage: destId,
      category: dest?.defaultCat || prev.category,
      docType: destId === 'magazine' ? 'Magazine' : (destId.includes('result') ? 'Result' : prev.docType)
    }));
  };

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.pdfUrl && !formData.coverImage) {
        toast.error('Kripya kam se kam PDF link ya Poster image URL dalein!');
        setLoading(false);
        return;
      }

      const resolvedCover = formData.coverImage ? resolveUrl(formData.coverImage) : '';
      const resolvedPdf   = (formData.pdfUrl || '').trim();

      const payload = {
        title:       (formData.title || '').trim(),
        category:    formData.category || 'General College Documents',
        targetPage:  formData.targetPage || 'documents',
        year:        formData.year || new Date().getFullYear().toString(),
        volumeIssue: formData.volumeIssue || '',
        pdfUrl:      resolvedPdf,
        link:        resolvedPdf, // Backward-compatibility
        coverImage:  resolvedCover,
        description: formData.description || '',
        isFeatured:  Boolean(formData.isFeatured),
        isPublic:    formData.isPublic !== false,
        docType:     formData.docType || 'Document',
        type:        formData.docType || 'Document',
        updatedAt:   serverTimestamp(),
      };

      if (editItem) {
        await updateDoc(doc(db, 'pdfReports', editItem.id), payload);
        toast.success('Document / Magazine updated successfully! 🚀');
      } else {
        await addDoc(collection(db, 'pdfReports'), {
          ...payload,
          createdAt: serverTimestamp(),
          views: 0,
          downloads: 0
        });
        toast.success('📁 Document / Magazine published live across website! 🎉');
      }

      // Live cross-tab sync broadcast
      clearCache('pdfReports');
      window.dispatchEvent(new CustomEvent('gnc_live_sync', { detail: { collection: 'pdfReports' } }));
      logAct(editItem ? 'update' : 'add', `Doc/Pub: ${payload.title} (${payload.category})`, 'pdfReports');

      setEditItem(null);
      clearDraft();
    } catch (err) {
      toast.error('Save failed: ' + err.message);
    }
    setLoading(false);
  };

  const cats = ['All', ...DOCUMENT_CATEGORIES];
  const filtered = (pdfReports || []).filter(d => {
    const matchSearch = !search ||
      d.title?.toLowerCase().includes(search.toLowerCase()) ||
      d.category?.toLowerCase().includes(search.toLowerCase()) ||
      d.targetPage?.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'All' || d.category === catFilter;
    return matchSearch && matchCat;
  });

  // Export to CSV / Excel for NAAC & IQAC Audits
  const exportDocumentsToCSV = () => {
    if (!pdfReports?.length) {
      toast.error('No documents to export!');
      return;
    }
    const headers = ['Title', 'Category', 'Target Page', 'Year', 'Doc Type', 'PDF Link', 'Cover Image', 'Created At'];
    const rows = pdfReports.map(d => [
      `"${(d.title || '').replace(/"/g, '""')}"`,
      `"${d.category || ''}"`,
      `"${d.targetPage || ''}"`,
      `"${d.year || ''}"`,
      `"${d.docType || d.type || ''}"`,
      `"${d.pdfUrl || d.link || ''}"`,
      `"${d.coverImage || ''}"`,
      `"${d.createdAt?.toDate ? d.createdAt.toDate().toISOString() : ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GNC_Documents_Vault_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Document Vault exported for NAAC audit!');
  };

  const isMagazine = formData.targetPage === 'magazine' || formData.category?.includes('Magazine');

  return (
    <div className="fade-up">
      {/* ── HEADER RIBBON ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <FolderArchive size={26} color={GOLD} />
            <h2 className="asec" style={{ margin: 0, fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 900, color: NAVY }}>
              Universal Document &amp; Publication Vault
            </h2>
          </div>
          <p className="asub" style={{ margin: '4px 0 0', color: T.t3, fontSize: 13, fontWeight: 600 }}>
            Upload E-Magazines, Annual Publications, Posters, Circulars, NAAC &amp; Syllabi from one single command center
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            type="button"
            onClick={exportDocumentsToCSV}
            className="abtn abtn-outline abtn-sm"
            style={{ fontWeight: 800, borderColor: GOLD, color: NAVY, display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <FileSpreadsheet size={14} color={NAVY} /> Export for NAAC Audit (.CSV)
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="abtn abtn-outline abtn-sm"
            style={{ fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
            {showPreview ? 'Hide Live Card' : 'Show Live Card'}
          </button>
        </div>
      </div>

      {/* ── SECTION SWITCHER: PUBLICATIONS VAULT vs STUDENT DOCUMENT REQUESTS ── */}
      <div style={{ display: 'flex', gap: 10, margin: '0 0 20px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setVaultSection('publications')}
          style={{
            background: vaultSection === 'publications' ? NAVY : '#ffffff',
            color: vaultSection === 'publications' ? '#ffffff' : NAVY,
            border: `2px solid ${NAVY}`,
            fontWeight: 800,
            padding: '9px 20px',
            borderRadius: 12,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            boxShadow: vaultSection === 'publications' ? '0 4px 14px rgba(15,35,71,0.2)' : 'none'
          }}
        >
          <FolderArchive size={16} /> Publications Vault ({pdfReports?.length || 0})
        </button>

        <button
          type="button"
          onClick={() => setVaultSection('requests')}
          style={{
            background: vaultSection === 'requests' ? NAVY : '#ffffff',
            color: vaultSection === 'requests' ? '#ffffff' : NAVY,
            border: `2px solid ${NAVY}`,
            fontWeight: 800,
            padding: '9px 20px',
            borderRadius: 12,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            boxShadow: vaultSection === 'requests' ? '0 4px 14px rgba(15,35,71,0.2)' : 'none'
          }}
        >
          <FileText size={16} /> Student Document Requests ({docRequests.length})
        </button>
      </div>

      {vaultSection === 'requests' ? (
        <div className="card-gold fade-up" style={{ padding: 24, margin: '0 0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ShieldCheck size={20} color={GOLD} /> Student Document Verification &amp; Approval Desk
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: 12.5, color: '#64748b' }}>
                Manage online applications for Bonafide, Character, Fee Clearance, and Transfer NOC certificates.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input
                className="ainp"
                placeholder="Search Student, Roll, or Token..."
                value={reqSearch}
                onChange={e => setReqSearch(e.target.value)}
                style={{ width: 240, margin: 0 }}
              />
              <select
                className="ainp"
                value={reqFilter}
                onChange={e => setReqFilter(e.target.value)}
                style={{ width: 160, margin: 0 }}
              >
                <option value="All">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="under_verification">Under Verification</option>
                <option value="approved">Approved</option>
                <option value="ready">Ready at Counter</option>
              </select>
            </div>
          </div>

          {docRequests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
              <FileText size={40} color="#cbd5e1" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontWeight: 800, fontSize: 15, color: NAVY }}>No Student Document Requests Yet</div>
              <p style={{ margin: '4px 0 0', fontSize: 13 }}>Requests submitted at /documents/request will appear here in real time.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {docRequests
                .filter(r => {
                  if (reqFilter !== 'All' && r.status !== reqFilter) return false;
                  if (reqSearch) {
                    const q = reqSearch.toLowerCase();
                    return (
                      r.studentName?.toLowerCase().includes(q) ||
                      r.rollNo?.toLowerCase().includes(q) ||
                      r.trackingToken?.toLowerCase().includes(q)
                    );
                  }
                  return true;
                })
                .map(r => (
                  <div
                    key={r.id || r.trackingToken}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: 14,
                      padding: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 900, color: NAVY, fontSize: 14, background: '#f1f5f9', padding: '4px 10px', borderRadius: 8 }}>
                          {r.trackingToken}
                        </span>
                        <span style={{ fontWeight: 800, color: NAVY, fontSize: 14.5 }}>
                          {r.studentName}
                        </span>
                        <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                          ({r.rollNo} • {r.department} {r.semester})
                        </span>
                      </div>

                      <span style={{
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontSize: 11.5,
                        fontWeight: 800,
                        background: r.stage >= 4 ? '#dcfce7' : (r.stage >= 3 ? '#e0e7ff' : '#fef3c7'),
                        color: r.stage >= 4 ? '#15803d' : (r.stage >= 3 ? '#3730a3' : '#b45309'),
                        border: `1px solid ${r.stage >= 4 ? '#86efac' : (r.stage >= 3 ? '#c7d2fe' : '#fde68a')}`
                      }}>
                        {r.status?.toUpperCase() || 'SUBMITTED'} (STAGE {r.stage || 1}/4)
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, fontSize: 12.5, color: '#475569' }}>
                      <div>
                        <strong>Certificate:</strong> {r.docTitle || r.docType} | <strong>Purpose:</strong> {r.purpose || 'Not specified'} | <strong>Contact:</strong> {r.phone || 'N/A'}
                      </div>

                      <div style={{ display: 'flex', gap: 8 }}>
                        {r.stage < 2 && (
                          <button
                            type="button"
                            onClick={() => updateRequestStatus(r.id, 'under_verification', 2, 'Under scrutiny by college administrative staff.')}
                            className="abtn abtn-sm abtn-outline"
                            style={{ fontSize: 11.5, fontWeight: 700 }}
                          >
                            Mark Verifying
                          </button>
                        )}
                        {r.stage < 3 && (
                          <button
                            type="button"
                            onClick={() => updateRequestStatus(r.id, 'approved', 3, 'Approved by Principal Office. Sent for official seal.')}
                            className="abtn abtn-sm"
                            style={{ background: '#3b82f6', color: '#fff', border: 'none', fontSize: 11.5, fontWeight: 700 }}
                          >
                            Approve
                          </button>
                        )}
                        {r.stage < 4 && (
                          <button
                            type="button"
                            onClick={() => updateRequestStatus(r.id, 'ready', 4, 'Certificate signed and ready for collection at Counter #2.')}
                            className="abtn abtn-sm"
                            style={{ background: '#10b981', color: '#fff', border: 'none', fontSize: 11.5, fontWeight: 700 }}
                          >
                            Ready at Counter #2
                          </button>
                        )}
                        {r.stage >= 4 && (
                          <span style={{ fontSize: 12, color: '#10b981', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <CheckCircle2 size={14} /> Ready for Handover
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      ) : (
        <>
      {/* ── CLEAR DESTINATION INDICATOR ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'linear-gradient(135deg, rgba(6, 95, 70, 0.05) 0%, rgba(5, 150, 105, 0.08) 100%)',
        border: '1.5px solid rgba(5, 150, 105, 0.2)',
        borderRadius: 14, padding: '12px 16px', margin: '0 0 20px',
      }}>
        <FolderArchive size={24} color="#065f46" />
        <div>
          <div style={{ fontWeight: 800, fontSize: 13, color: '#065f46' }}>
            Live Destination: Homepage Card 3 (E-Documents) &amp; /documents Archive
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
            Documents uploaded here appear with instant 1-click in-app PDF preview on Homepage Card 3 and inside the official document archive.
          </div>
        </div>
      </div>

      {/* ── MAIN UPLOADER / EDITOR (SPLIT VIEW WITH LIVE CARD PREVIEW) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: showPreview ? 'minmax(0, 1.4fr) minmax(0, 1fr)' : '1fr', gap: 20, marginBottom: 24 }}>
        
        {/* Left Form Column */}
        <div className="card-gold" style={{ margin: 0 }}>
          <div className="actitle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {editItem ? <Edit2 size={16} color={GOLD} /> : <Plus size={16} color={GOLD} />}
              {editItem ? 'Edit Document / Publication' : 'Upload New Document or E-Magazine'}
            </span>
            <span style={{ fontSize: 11, fontWeight: 800, color: GOLD, background: `${NAVY}11`, padding: '3px 10px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {isMagazine ? <BookOpen size={12} /> : <FileText size={12} />}
              {isMagazine ? 'E-Magazine Mode' : 'Official Document Mode'}
            </span>
          </div>

          <form onSubmit={save}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
              
              {/* Document Title */}
              <div style={{ gridColumn: '1/-1' }}>
                <label className="alabel">Document / Publication Title *</label>
                <input
                  className="ainp"
                  value={formData.title || ''}
                  onChange={e => setFormData(d => ({ ...d, title: e.target.value }))}
                  required
                  placeholder={isMagazine ? 'e.g. Gurupradeep Annual College Magazine 2024-25' : 'e.g. NAAC Self Study Report (SSR) 2nd Cycle'}
                />
              </div>

              {/* Website Target Destination */}
              <div>
                <label className="alabel">🎯 Target Page on Website *</label>
                <select
                  className="ainp"
                  value={formData.targetPage || 'magazine'}
                  onChange={e => handleDestinationChange(e.target.value)}
                  style={{ fontWeight: 700, borderColor: GOLD }}
                >
                  {TARGET_DESTINATIONS.map(d => (
                    <option key={d.id} value={d.id}>{d.label}</option>
                  ))}
                </select>
                <span style={{ fontSize: 11, color: T.t4, display: 'block', marginTop: 3 }}>
                  Determines which public page this file will automatically route to.
                </span>
              </div>

              {/* Category */}
              <div>
                <label className="alabel">📁 Archive Category</label>
                <select
                  className="ainp"
                  value={formData.category || 'E-Magazine & Publications'}
                  onChange={e => setFormData(d => ({ ...d, category: e.target.value }))}
                >
                  {DOCUMENT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Academic Year */}
              <div>
                <label className="alabel">📅 Academic Year</label>
                <input
                  className="ainp"
                  value={formData.year || ''}
                  onChange={e => setFormData(d => ({ ...d, year: e.target.value }))}
                  placeholder="2024-25"
                />
              </div>

              {/* Volume / Issue (Useful for Magazines, Journals, Newsletters) */}
              <div>
                <label className="alabel">📑 Volume / Edition (Optional)</label>
                <input
                  className="ainp"
                  value={formData.volumeIssue || ''}
                  onChange={e => setFormData(d => ({ ...d, volumeIssue: e.target.value }))}
                  placeholder="Vol. 14, Issue 1"
                />
              </div>
            </div>

            {/* Description / Summary */}
            <div style={{ marginBottom: 14 }}>
              <label className="alabel">Brief Excerpt / Description</label>
              <textarea
                className="ainp"
                style={{ height: 60, resize: 'vertical' }}
                value={formData.description || ''}
                onChange={e => setFormData(d => ({ ...d, description: e.target.value }))}
                placeholder="Brief summary of highlights, committee members, or circular guidelines..."
              />
            </div>

            {/* ── DUAL MEDIA UPLOADER: PDF + POSTER COVER IMAGE ── */}
            <div style={{ background: '#f8fafc', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: NAVY, marginBottom: 10 }}>
                📎 Media Attachments (PDF Document + Visual Poster)
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
                {/* 1. PDF Picker */}
                <div>
                  <MediaPicker
                    label="📄 Select PDF Document (Google Drive / Cloud URL)"
                    value={formData.pdfUrl || ''}
                    onChange={url => setFormData(d => ({ ...d, pdfUrl: url }))}
                    type="pdf"
                    driveFolderId={import.meta.env.VITE_DRIVE_COLLEGE_DOCUMENTS_FOLDER}
                  />
                </div>

                {/* 2. Poster / Front Cover Image */}
                <div>
                  <MediaPicker
                    label="🖼️ Front Cover Poster / Thumbnail Image (Drive / Upload / ImgBB)"
                    value={formData.coverImage || ''}
                    onChange={url => setFormData(d => ({ ...d, coverImage: url }))}
                    type="image"
                    driveFolderId={import.meta.env.VITE_DRIVE_IMAGES_FOLDER || import.meta.env.VITE_DRIVE_COLLEGE_DOCUMENTS_FOLDER || '1bReeCuwZ_yS5vR7CIHbwQcs6Gw81xB-8'}
                  />
                  <span style={{ fontSize: 11, color: '#0284c7', marginTop: 4, display: 'block', fontWeight: 600 }}>
                    ✨ Auto-Fit Ready: Magazine covers are automatically presented in full portrait mode without cropping.
                  </span>
                </div>
              </div>
            </div>

            {/* E-Magazine Special Toggle: Featured / Latest Issue */}
            {isMagazine && (
              <div style={{
                background: 'rgba(244,160,35,0.1)',
                border: '1.5px solid rgba(244,160,35,0.4)',
                borderRadius: 12,
                padding: '12px 16px',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 13.5, color: NAVY, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Star size={15} fill={GOLD} color={GOLD} /> Mark as Featured / Latest Issue on Bookshelf
                  </div>
                  <div style={{ fontSize: 11.5, color: T.t3, marginTop: 2 }}>
                    Displays a prominent 'LATEST ISSUE' badge on the digital bookshelf card.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(formData.isFeatured)}
                  onChange={e => setFormData(d => ({ ...d, isFeatured: e.target.checked }))}
                  style={{ width: 18, height: 18, accentColor: GOLD, cursor: 'pointer' }}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="abtn abtn-gold" disabled={loading} style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <CheckCircle2 size={16} />
                {loading ? 'Publishing…' : (editItem ? 'Update Document' : 'Publish Live to Website')}
              </button>
              {editItem && (
                <button
                  type="button"
                  className="abtn abtn-outline"
                  onClick={() => { setEditItem(null); clearDraft(); }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <X size={15} /> Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Live Interactive Preview Card */}
        {showPreview && (
          <div style={{
            background: '#ffffff',
            borderRadius: 16,
            padding: 20,
            border: `1.5px dashed ${GOLD}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(15,35,71,0.06)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, color: GOLD }}>
                  Live Visitor Card Preview
                </span>
                <span style={{ fontSize: 11, color: T.t3, background: '#f1f5f9', padding: '2px 8px', borderRadius: 99 }}>
                  {formData.targetPage ? `Routes to: /${formData.targetPage}` : 'Universal Archive'}
                </span>
              </div>

              {/* Simulated Card Presentation */}
              <div style={{
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: 14,
                overflow: 'hidden',
                boxShadow: '0 6px 18px rgba(15,35,71,0.05)',
                transition: 'all 0.2s ease'
              }}>
                {/* Visual Cover Poster Thumbnail (if provided) */}
                {formData.coverImage ? (
                  <div style={{
                    height: isMagazine ? 280 : 180,
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'radial-gradient(ellipse at 50% 100%, rgba(244, 160, 35, 0.12) 0%, transparent 65%), linear-gradient(160deg, #071326 0%, #0c1d3b 60%, #152d59 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px'
                  }}>
                    {/* Ambient Glow */}
                    <img
                      src={formData.coverImage}
                      alt=""
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: -15,
                        width: 'calc(100% + 30px)',
                        height: 'calc(100% + 30px)',
                        objectFit: 'cover',
                        filter: 'blur(24px) saturate(2) brightness(0.35)',
                        opacity: 0.65,
                        pointerEvents: 'none',
                        zIndex: 1
                      }}
                    />
                    {/* Uncropped Book/Cover Presentation */}
                    <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        src={formData.coverImage}
                        alt="Cover Preview"
                        style={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain',
                          borderRadius: isMagazine ? '3px 8px 8px 3px' : '6px',
                          boxShadow: '-4px 4px 14px rgba(0,0,0,0.5), 6px 10px 20px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.2)',
                          borderLeft: isMagazine ? '3px solid rgba(255,255,255,0.4)' : 'none'
                        }}
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                    <span style={{
                      position: 'absolute', top: 10, right: 10, zIndex: 3,
                      background: formData.isFeatured ? `linear-gradient(135deg, ${GOLD}, #d97706)` : GOLD, 
                      color: NAVY,
                      fontSize: 10, fontWeight: 900, padding: '3px 10px', borderRadius: 20
                    }}>
                      {isMagazine ? (formData.isFeatured ? '⭐ LATEST ISSUE' : 'BOOKSHELF CARD') : 'VERIFIED DOC'}
                    </span>
                  </div>
                ) : (
                  <div style={{
                    height: isMagazine ? 200 : 90,
                    background: `linear-gradient(145deg, #09172e 0%, ${NAVY} 60%, #1a3a7c 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: 32,
                    flexDirection: 'column', gap: 6
                  }}>
                    <span>{isMagazine ? '📖' : '📄'}</span>
                    {isMagazine && <span style={{ fontSize: 11, color: GOLD, fontWeight: 800 }}>Add Coverpage to Preview Bookshelf</span>}
                  </div>
                )}

                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                    <span style={{ background: '#f0f4ff', color: NAVY, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>
                      {formData.category}
                    </span>
                    {formData.year && (
                      <span style={{ background: '#f8fafc', color: T.t3, fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>
                        {formData.year}
                      </span>
                    )}
                    {formData.volumeIssue && (
                      <span style={{ background: `${GOLD}18`, color: '#b45309', fontSize: 10, fontWeight: 800, padding: '2px 6px', borderRadius: 4 }}>
                        {formData.volumeIssue}
                      </span>
                    )}
                  </div>

                  <div style={{ fontWeight: 800, fontSize: 15, color: NAVY, lineHeight: 1.35, marginBottom: 6, textTransform: 'uppercase' }}>
                    {formData.title || 'Untitled Document / E-Magazine'}
                  </div>

                  <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 14px', lineHeight: 1.4, textAlign: 'justify', textJustify: 'inter-word' }}>
                    {formData.description || 'Official college digital document, circular guidelines or annual publication issue.'}
                  </p>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{
                      flex: 1, padding: '8px 12px', background: NAVY, color: '#fff',
                      borderRadius: 8, fontSize: 12, fontWeight: 700, textAlign: 'center'
                    }}>
                      {isMagazine ? '👁️ View Online' : '👁️ View Document'}
                    </div>
                    {formData.pdfUrl && (
                      <div style={{
                        padding: '8px 12px', background: '#f1f5f9', color: NAVY,
                        borderRadius: 8, fontSize: 12, fontWeight: 700
                      }}>
                        📥 Download
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 12, padding: '8px 12px', background: '#f8fafc', borderRadius: 8, fontSize: 11, color: T.t3 }}>
              💡 <strong>Smart Note:</strong> Bookshelf par student is card par click karke direct online read kar sakte hain ya PDF download kar sakte hain.
            </div>
          </div>
        )}
      </div>

      {/* ── FILTER & SEARCH BAR ── */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {cats.map(c => (
          <button
            key={c}
            onClick={() => setCatFilter(c)}
            className="abtn abtn-sm"
            style={{
              background: catFilter === c ? NAVY : 'white',
              color:      catFilter === c ? 'white' : T.t2,
              border:     `1.5px solid ${catFilter === c ? NAVY : T.b1}`,
              fontSize: 11.5,
              fontWeight: 700,
              padding: '4px 10px'
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <SectionSearch value={search} onChange={setSearch} placeholder="Search title, category, target page or year..." />
      
      <BulkBar
        count={selected.length}
        onDelete={() => { bulkDelete('pdfReports', selected); setSelected([]); clearCache('pdfReports'); }}
        onClear={() => setSelected([])}
      />

      {/* ── DOCUMENT INVENTORY TABLE / LIST ── */}
      <div className="card" style={{ marginTop: 14 }}>
        <div className="actitle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Published Repository ({filtered.length} Items)</span>
          <span style={{ fontSize: 12, color: T.t3 }}>Auto-Synced with Public Pages</span>
        </div>

        {filtered.map(d => {
          const isDocMagazine = d.targetPage === 'magazine' || d.category?.includes('Magazine');
          return (
            <div key={d.id} className={`arow ${selected.includes(d.id) ? 'selected' : ''}`} style={{ alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={selected.includes(d.id)}
                onChange={() => setSelected(s => s.includes(d.id) ? s.filter(x => x !== d.id) : [...s, d.id])}
                style={{ accentColor: NAVY }}
              />

              {/* Poster Thumbnail or Icon */}
              {d.coverImage ? (
                <div style={{
                  width: isDocMagazine ? 38 : 44,
                  height: isDocMagazine ? 50 : 44,
                  borderRadius: isDocMagazine ? '2px 6px 6px 2px' : 8,
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '1px solid #cbd5e1',
                  borderLeft: isDocMagazine ? '3px solid #f4a023' : '1px solid #e2e8f0',
                  background: '#09172e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={resolveUrl(d.coverImage)}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: isDocMagazine ? 'contain' : 'cover'
                    }}
                  />
                </div>
              ) : (
                <div style={{
                  width: isDocMagazine ? 38 : 44,
                  height: isDocMagazine ? 50 : 44,
                  borderRadius: isDocMagazine ? '2px 6px 6px 2px' : 8,
                  background: isDocMagazine ? `${GOLD}22` : `${NAVY}12`,
                  color: isDocMagazine ? GOLD : NAVY,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0,
                  borderLeft: isDocMagazine ? '3px solid #f4a023' : 'none'
                }}>
                  {isDocMagazine ? '📖' : '📄'}
                </div>
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 800, color: NAVY, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {d.title}
                  </span>
                  {d.isFeatured && (
                    <span style={{ background: '#fef3c7', color: '#b45309', fontSize: 10, fontWeight: 900, padding: '1px 6px', borderRadius: 10 }}>
                      ⭐ Latest Issue
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className="abadge" style={{ background: BG, color: T.t2, fontSize: 11 }}>
                    {d.category}
                  </span>
                  <span className="abadge" style={{ background: '#e0f2fe', color: '#0369a1', fontSize: 10.5, fontWeight: 700 }}>
                    /{d.targetPage || 'documents'}
                  </span>
                  {d.year && <span className="abadge" style={{ background: BG, color: T.t3 }}>{d.year}</span>}
                  {d.volumeIssue && <span className="abadge" style={{ background: '#fef9c3', color: '#854d0e' }}>{d.volumeIssue}</span>}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
                {(d.pdfUrl || d.link) && (
                  <a
                    href={d.pdfUrl || d.link}
                    target="_blank"
                    rel="noreferrer"
                    className="abtn abtn-outline abtn-sm"
                    style={{ textDecoration: 'none', padding: '4px 8px', fontSize: 11, display: 'inline-flex', alignItems: 'center', gap: 4 }}
                  >
                    <FileText size={12} /> View PDF
                  </a>
                )}
                {d.coverImage && (
                  <a
                    href={d.coverImage}
                    target="_blank"
                    rel="noreferrer"
                    className="abtn abtn-outline abtn-sm"
                    style={{ textDecoration: 'none', padding: '4px 8px', fontSize: 11, display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    title="View Poster"
                  >
                    <ImageIcon size={12} /> Poster
                  </a>
                )}
                <button
                  className="abtn abtn-outline abtn-sm"
                  onClick={() => {
                    setEditItem(d);
                    setFormData({
                      title:        d.title        || '',
                      category:     d.category     || 'E-Magazine & Publications',
                      targetPage:   d.targetPage   || 'magazine',
                      year:         d.year         || '',
                      volumeIssue:  d.volumeIssue  || '',
                      pdfUrl:       d.pdfUrl       || d.link || '',
                      coverImage:   d.coverImage   || '',
                      description:  d.description  || '',
                      isFeatured:   Boolean(d.isFeatured),
                      isPublic:     d.isPublic !== false,
                      docType:      d.docType      || d.type || 'Magazine',
                    });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ padding: '6px 8px', display: 'inline-flex', alignItems: 'center' }}
                  title="Edit document"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  className="abtn abtn-red abtn-sm"
                  onClick={() => { softDelete('pdfReports', d.id, d, d.title); clearCache('pdfReports'); }}
                  style={{ padding: '6px 8px', display: 'inline-flex', alignItems: 'center' }}
                  title="Delete document"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: T.t4 }}>
            <FolderArchive size={36} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.4 }} />
            No documents found matching this filter.
          </div>
        )}
      </div>
        </>
      )}

      <MiniLog logs={getSectionLog('pdfReports')} />
    </div>
  );
}