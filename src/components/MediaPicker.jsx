// src/components/MediaPicker.jsx
// 🚀 ULTRA PRO MAX PREMIUM MEDIA PICKER WITH GOOGLE DRIVE ENGINE
// 🛡️ 100% Crash-Free | Lag-Free | Backward Compatible

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';
import { useDriveDocs } from '../hooks/useDriveDocs';
import { COLORS } from '../styles/colors';
import { resolveUrl } from '../utils/resolver';
import { validateDocumentFile } from '../utils/documentValidator';
import { optimizeDocumentOrImage, DPI_PROFILES } from '../utils/pdfOptimizer';

// 🛑 CRASH FIX: Preserving legacy exports so AdminPanel doesn't crash on import
export let imgbbAPIKey = '';
export const setImgbbKey = (key) => {
  imgbbAPIKey = key;
};
// ─────────────────────────────────────────────────────────────

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

export default function MediaPicker({
  value = '',
  onChange,
  type = 'image', // 'image', 'pdf', or 'any'
  label = 'Select Media',
  compact = false,
  driveFolderId = '' // ☁️ Dynamic Google Drive Folder Integration
}) {
  const isImage = type === 'image' || type === 'any';
  const isPdf   = type === 'pdf'   || type === 'any';

  // ── SMART DEFAULT TABS ──
  const defaultTab = driveFolderId ? 'drive' : (isImage || isPdf ? 'upload' : 'url');
  const [mode, setMode] = useState(defaultTab);
  const [tempUrl, setTempUrl] = useState(value || '');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dpiMode, setDpiMode] = useState('web'); // 'web' (150 DPI) or 'print' (300 DPI)
  const [validationInfo, setValidationInfo] = useState(null);
  const [compressionStats, setCompressionStats] = useState(null);
  const [processingStatus, setProcessingStatus] = useState('');

  useEffect(() => {
    setTempUrl(value || '');
  }, [value]);

  // ── ☁️ DRIVE ENGINE (Error-Safe) ──
  const { docs: driveFiles, loading: driveLoading, error: driveError } = useDriveDocs(
    mode === 'drive' ? driveFolderId : null, 
    type
  );

  const cleanMediaUrl = (input) => {
    if (!input) return '';
    const trimmed = String(input).trim();
    if (isImage && (trimmed.includes('drive.google.com') || trimmed.includes('googleusercontent.com'))) {
      return resolveUrl(trimmed);
    }
    return trimmed;
  };

  const handleUrlSubmit = (e) => {
    if (e) e.preventDefault();
    if (tempUrl.trim()) onChange(cleanMediaUrl(tempUrl));
  };

  // ── DYNAMIC NAVIGATION TABS ──
  const tabs = [
    ...(driveFolderId ? [{ id: 'drive', icon: '☁️', label: 'Google Drive' }] : []),
    { id: 'upload', icon: '📤', label: isPdf && !isImage ? 'Upload PDF' : 'Upload' },
    { id: 'local', icon: '🗂️', label: 'Local (Public)' },
    { id: 'url', icon: '🔗', label: 'Direct URL' },
  ];

  return (
    <div style={S.container(compact)} className="media-picker-root">
      
      {/* ── HEADER ── */}
      {label && <label style={S.label}>{label}</label>}
      
      <div style={S.tabHeader}>
        {tabs.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setMode(t.id)}
            style={mode === t.id ? S.activeTab : S.tab}
          >
            <span style={{ fontSize: '15px' }}>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      <div style={S.body}>
        
        {/* ═════════ 1. GOOGLE DRIVE VAULT ═════════ */}
        {mode === 'drive' && (
          <div style={S.panel}>
            <p style={S.hint}>☁️ Fetching live documents from synced Google Drive folder...</p>
            
            {/* Loading State */}
            {driveLoading && (
              <div style={S.messageBox}>
                <div className="mp-spinner" style={S.spinner}></div>
                <div style={{ color: NAVY, fontWeight: 700 }}>Connecting to Google Drive...</div>
              </div>
            )}
            
            {/* Error State */}
            {driveError && (
              <div style={S.errorBox}>
                ⚠️ Connection Failed: {driveError}
              </div>
            )}
            
            {/* Empty State */}
            {!driveLoading && !driveError && driveFiles.length === 0 && (
              <div style={S.messageBox}>📭 No compatible files found in this specific folder.</div>
            )}

            {/* Smooth File List */}
            {!driveLoading && !driveError && driveFiles.length > 0 && (
              <div style={S.fileList} className="mp-scroll">
                {driveFiles.map(file => {
                  const isSelected = value === file.previewUrl;
                  return (
                    <div 
                      key={file.id} 
                      onClick={() => onChange(isImage ? (file.imageUrl || file.previewUrl) : file.previewUrl)}
                      style={isSelected ? S.fileItemActive : S.fileItem}
                      className="mp-file-item"
                    >
                      <div style={S.fileThumbWrap}>
                        {file.mimeType?.startsWith('image/') ? (
                          <>
                            <img 
                              src={file.thumbnailUrl || file.imageUrl || `https://lh3.googleusercontent.com/d/${file.id}=w200`} 
                              alt={file.name}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              style={S.fileThumbImg}
                              onError={(e) => {
                                if (!e.target.dataset.triedFallback) {
                                  e.target.dataset.triedFallback = 'true';
                                  e.target.src = `https://lh3.googleusercontent.com/d/${file.id}=w200`;
                                } else {
                                  e.target.style.display = 'none';
                                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                }
                              }}
                            />
                            <div style={{ ...S.fileThumbFallback, display: 'none' }}>
                              🖼️
                            </div>
                          </>
                        ) : file.thumbnailUrl ? (
                          <>
                            <img 
                              src={file.thumbnailUrl} 
                              alt={file.name}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              style={S.fileThumbImg}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div style={S.fileThumbPdf}>
                              <span style={{ fontSize: '18px' }}>📄</span>
                              <span style={S.fileThumbPdfTag}>PDF</span>
                            </div>
                          </>
                        ) : (
                          <div style={S.fileThumbPdf}>
                            <span style={{ fontSize: '18px' }}>📄</span>
                            <span style={S.fileThumbPdfTag}>PDF</span>
                          </div>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={S.fileName}>{file.name}</div>
                        <div style={S.fileMeta}>{file.date} • {file.size}</div>
                      </div>
                      {isSelected && <div style={S.checkIcon}>✅</div>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ═════════ 2. URL MODE ═════════ */}
        {mode === 'url' && (
          <div style={S.panel}>
            <p style={S.hint}>🔗 Paste any link (Google Drive, Web URL, Cloud PDF/Image)</p>
            <div style={S.inputGroup}>
              <input 
                type="text" 
                value={tempUrl} 
                onChange={e => {
                  const val = e.target.value;
                  setTempUrl(val);
                  if (val.trim()) {
                    onChange(cleanMediaUrl(val));
                  }
                }}
                onBlur={e => {
                  if (e.target.value.trim()) onChange(cleanMediaUrl(e.target.value));
                }}
                placeholder="Paste URL here (auto-applies immediately)..." 
                style={S.input} 
              />
              <button type="button" onClick={handleUrlSubmit} style={S.actionBtn}>Apply Link</button>
            </div>
          </div>
        )}

        {/* ═════════ 3. UPLOAD MODE (Enterprise DPI Engine + Magic Byte Security) ═════════ */}
        {mode === 'upload' && (
          <div style={S.panel}>
            {/* ── DPI RESOLUTION SELECTOR ── */}
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: NAVY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  🎯 Document / Image Quality Preset (DPI)
                </span>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                  Active: {DPI_PROFILES[dpiMode]?.badgeText}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {/* 1. Web-Optimized (150 DPI) */}
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => setDpiMode('web')}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: dpiMode === 'web' ? `2px solid ${GOLD}` : '1.5px solid #cbd5e1',
                    background: dpiMode === 'web' ? '#fffbeb' : '#ffffff',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '12.5px', color: NAVY, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    📱 Web-Optimized
                    <span style={{ fontSize: '10px', background: '#e0f2fe', color: '#0369a1', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      72–150 DPI
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>
                    Screen reading, notices and circulars. Smallest file size (under 1–2 MB).
                  </div>
                </button>

                {/* 2. Print-Ready (300 DPI) */}
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => setDpiMode('print')}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: dpiMode === 'print' ? `2px solid ${GOLD}` : '1.5px solid #cbd5e1',
                    background: dpiMode === 'print' ? '#fffbeb' : '#ffffff',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '12.5px', color: NAVY, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    🖨️ Print-Ready
                    <span style={{ fontSize: '10px', background: '#dcfce7', color: '#15803d', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      300 DPI
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>
                    Admit cards, certificates & reports. Ultra-crisp vector printing.
                  </div>
                </button>
              </div>
            </div>

            {/* ── DROP ZONE & FILE INPUT ── */}
            <div style={S.dropZone}>
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>
                {uploading ? '⚙️' : (isPdf && !isImage ? '📄' : '📤')}
              </div>
              <div style={{ fontWeight: 700, color: NAVY, fontSize: '14px' }}>
                {uploading ? (processingStatus || `Processing... ${uploadProgress}%`) : `Click to select ${isPdf && !isImage ? 'PDF / Document' : 'file'}`}
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
                Supported: {isPdf ? '.pdf, .docx, .xlsx' : 'Images (.jpg, .png, .webp)'} • Limit: {dpiMode === 'print' ? '15 MB (300 DPI)' : '5 MB (150 DPI)'}
              </div>

              <input 
                type="file" 
                accept={isImage && !isPdf ? "image/*" : (isPdf && !isImage ? ".pdf,application/pdf" : ".pdf,image/*,.docx,.xlsx")}
                style={S.hiddenFileInput}
                disabled={uploading}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setUploading(true);
                  setUploadProgress(10);
                  setProcessingStatus('Inspecting security signature...');
                  setValidationInfo(null);
                  setCompressionStats(null);

                  try {
                    // 1. Binary Magic Bytes & Security Validation
                    const validation = await validateDocumentFile(file, {
                      dpiMode,
                      expectedType: type,
                    });

                    if (!validation.isValid) {
                      toast.error(validation.error || 'Upload validation failed');
                      setUploading(false);
                      setProcessingStatus('');
                      return;
                    }

                    if (validation.warning) {
                      toast(validation.warning, { icon: '⚠️', duration: 4000 });
                    }

                    setValidationInfo(validation);
                    setUploadProgress(25);

                    // 2. DPI Optimization & Compression Pipeline
                    setProcessingStatus(`Optimizing for ${DPI_PROFILES[dpiMode]?.name || 'Web'}...`);
                    const optResult = await optimizeDocumentOrImage(file, dpiMode, (pct, status) => {
                      setUploadProgress(Math.min(75, 25 + Math.round(pct * 0.5)));
                      setProcessingStatus(status);
                    });

                    const fileToUpload = optResult.file;
                    setCompressionStats(optResult.stats);

                    if (optResult.stats?.reductionPercent > 0) {
                      toast.success(`⚡ Compressed: ${optResult.stats.originalSizeMB}MB → ${optResult.stats.optimizedSizeMB}MB (-${optResult.stats.reductionPercent}%)!`);
                    }

                    // 3. Cloud Storage Upload (Firebase Storage)
                    setProcessingStatus('Uploading securely to Cloud Storage...');
                    setUploadProgress(80);

                    try {
                      const { getStorage, ref, uploadBytesResumable, getDownloadURL } = await import('firebase/storage');
                      const storage = getStorage();
                      const isDocFile = fileToUpload.name?.toLowerCase().endsWith('.pdf') || 
                                        fileToUpload.type === 'application/pdf' || 
                                        fileToUpload.name?.toLowerCase().endsWith('.docx');
                      const subFolder = isDocFile ? 'documents' : 'images';
                      const sanitizedName = fileToUpload.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
                      const fileRef = ref(storage, `${subFolder}/${Date.now()}_${sanitizedName}`);

                      const uploadMetadata = {
                        contentType: fileToUpload.type || (isDocFile ? 'application/pdf' : 'image/jpeg'),
                        customMetadata: {
                          dpiMode,
                          dpi: String(DPI_PROFILES[dpiMode]?.targetDpi || 150),
                          originalName: file.name,
                          originalSizeMB: String(optResult.stats?.originalSizeMB || ''),
                          optimizedSizeMB: String(optResult.stats?.optimizedSizeMB || ''),
                          savingsPercent: String(optResult.stats?.reductionPercent || '0'),
                        },
                      };

                      const uploadTask = uploadBytesResumable(fileRef, fileToUpload, uploadMetadata);

                      uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                          const progress = 80 + Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 20);
                          setUploadProgress(Math.min(99, progress));
                        },
                        async (storageErr) => {
                          console.warn('Firebase Storage upload error:', storageErr);
                          toast.error(`Upload error: ${storageErr.message}`);
                          setUploading(false);
                          setProcessingStatus('');
                        },
                        async () => {
                          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                          onChange(downloadURL);
                          setUploadProgress(100);
                          setProcessingStatus('Upload complete!');
                          toast.success(`${isDocFile ? 'Document' : 'Image'} uploaded & attached! ✅`);
                          setUploading(false);
                        }
                      );
                      return;
                    } catch (storageInitErr) {
                      console.warn('Firebase Storage init error, attempting direct URL fallback:', storageInitErr);
                      toast.error('Firebase Storage unavailable: ' + storageInitErr.message);
                      setUploading(false);
                      setProcessingStatus('');
                    }
                  } catch (err) {
                    console.error('File process error:', err);
                    toast.error('File processing error: ' + err.message);
                    setUploading(false);
                    setProcessingStatus('');
                  }
                }}
              />
            </div>

            {/* ── PROGRESS BAR ── */}
            {uploading && (
              <div style={{ marginTop: 10, width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: NAVY, marginBottom: 4 }}>
                  <span>{processingStatus || 'Processing file...'}</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div style={{ width: '100%', background: '#e2e8f0', borderRadius: 6, overflow: 'hidden', height: 7 }}>
                  <div style={{ width: `${uploadProgress}%`, background: GOLD, height: '100%', transition: 'width 0.3s ease' }} />
                </div>
              </div>
            )}

            {/* ── SECURITY VALIDATION & COMPRESSION SUMMARY CARD ── */}
            {(validationInfo || compressionStats) && (
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '12px',
                color: '#166534',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                {validationInfo?.magicVerified && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                    <span>🛡️</span>
                    <span>Binary Signature Verified ({validationInfo.fileType.toUpperCase()}) • Authenticated Safe File</span>
                  </div>
                )}
                {compressionStats && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: '#15803d' }}>
                    <span>📊</span>
                    <span>
                      Size: <strong>{compressionStats.originalSizeMB} MB</strong> → <strong>{compressionStats.optimizedSizeMB} MB</strong>
                      {compressionStats.reductionPercent > 0 ? ` (${compressionStats.reductionPercent}% reduction @ ${compressionStats.dpi} DPI)` : ` (${compressionStats.profile})`}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ═════════ 4. LOCAL MODE ═════════ */}
        {mode === 'local' && (
          <div style={S.panel}>
            <p style={S.hint}>🗂️ Type the exact path if the file exists in your website's 'public' folder.</p>
            <div style={S.inputGroup}>
              <input 
                type="text" value={tempUrl} onChange={e => setTempUrl(e.target.value)}
                placeholder={isPdf ? "/docs/ug_regulation.pdf" : "/images/campus.jpg"} style={S.input} 
              />
              <button type="button" onClick={handleUrlSubmit} style={S.actionBtn}>Apply Path</button>
            </div>
          </div>
        )}
      </div>

      {/* ── PREMIUM SELECTION PREVIEW ── */}
      {value && (
        <div style={S.previewWrap}>
          <div style={S.previewBox}>
            <div style={S.previewBadge}>SELECTED</div>
            {isImage && !String(value).toLowerCase().includes('.pdf') ? (
              <img 
                src={resolveUrl(value)} 
                alt="Selected" 
                referrerPolicy="no-referrer"
                style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'cover', flexShrink: 0, border: '1px solid #cbd5e1' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div style={{ width: 36, height: 36, borderRadius: 6, background: '#fee2e2', color: '#dc2626', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #fca5a5' }}>
                <span style={{ fontSize: '14px', lineHeight: 1 }}>📄</span>
                <span style={{ fontSize: '8px', fontWeight: 900, marginTop: 2 }}>PDF</span>
              </div>
            )}
            <a href={value} target="_blank" rel="noreferrer" style={S.previewLink} title={value}>
              {value}
            </a>
            <button type="button" onClick={() => onChange('')} style={S.clearBtn} title="Remove Selection">
              ✖
            </button>
          </div>
        </div>
      )}

      {/* ── CSS ANIMATIONS & SCROLLBARS ── */}
      <style>{`
        .media-picker-root * { box-sizing: border-box; }
        @keyframes mp-spin { to { transform: rotate(360deg); } }
        .mp-spinner { animation: mp-spin 1s linear infinite; }
        
        /* Smooth Scrollbar for Drive List */
        .mp-scroll::-webkit-scrollbar { width: 6px; }
        .mp-scroll::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
        .mp-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .mp-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        /* Hover effect for file items */
        .mp-file-item:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
      `}</style>

    </div>
  );
}

// ── 🎨 ULTRA PRO STYLESHEET ──
const S = {
  container: (compact) => ({
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
    marginBottom: compact ? '0' : '24px',
    transition: 'all 0.3s ease',
  }),
  label: {
    display: 'block', fontSize: '13px', fontWeight: 800, color: NAVY,
    padding: '14px 18px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0',
    textTransform: 'uppercase', letterSpacing: '0.5px'
  },
  tabHeader: {
    display: 'flex', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0',
  },
  tab: {
    flex: 1, padding: '12px', background: 'transparent', border: 'none',
    borderBottom: '3px solid transparent', color: '#64748b', fontSize: '13px',
    fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center',
    justifyContent: 'center', gap: '8px', transition: 'all 0.2s',
  },
  activeTab: {
    flex: 1, padding: '12px', background: '#ffffff', border: 'none',
    borderBottom: `3px solid ${GOLD}`, color: NAVY, fontSize: '13px',
    fontWeight: 800, cursor: 'default', display: 'flex', alignItems: 'center',
    justifyContent: 'center', gap: '8px',
  },
  body: { padding: '20px' },
  panel: { display: 'flex', flexDirection: 'column', gap: '14px', animation: 'fadeIn 0.3s ease' },
  hint: { margin: 0, fontSize: '12.5px', color: '#64748b', fontWeight: 600 },
  inputGroup: { display: 'flex', gap: '10px' },
  input: {
    flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1.5px solid #cbd5e1',
    fontSize: '13.5px', outline: 'none', color: NAVY, fontWeight: 600, transition: '0.2s',
  },
  actionBtn: {
    background: NAVY, color: '#fff', border: 'none', padding: '0 24px',
    borderRadius: '8px', fontWeight: 800, cursor: 'pointer', fontSize: '13.5px',
    transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(15, 35, 71, 0.2)',
  },
  messageBox: {
    padding: '30px 20px', textAlign: 'center', color: '#64748b', fontWeight: 700,
    fontSize: '14px', background: '#f8fafc', borderRadius: '10px',
    border: '2px dashed #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'
  },
  spinner: { width: '24px', height: '24px', border: `3px solid ${GOLD}40`, borderTopColor: GOLD, borderRadius: '50%' },
  errorBox: {
    padding: '16px', color: '#b91c1c', background: '#fef2f2', border: '1px solid #f87171',
    borderRadius: '8px', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px'
  },
  fileList: {
    display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px',
    overflowY: 'auto', paddingRight: '8px',
  },
  fileItem: {
    display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', background: '#f8fafc',
    border: '1px solid #e2e8f0', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s',
  },
  fileItemActive: {
    display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', background: '#fffbeb',
    border: `2px solid ${GOLD}`, borderRadius: '10px', cursor: 'default',
    boxShadow: '0 8px 20px rgba(244,160,35,0.15)', transform: 'scale(1.01)', transition: 'all 0.2s'
  },
  fileThumbWrap: {
    width: '46px', height: '46px', borderRadius: '8px', overflow: 'hidden',
    background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, border: '1px solid #e2e8f0', position: 'relative'
  },
  fileThumbImg: {
    width: '100%', height: '100%', objectFit: 'cover', display: 'block'
  },
  fileThumbFallback: {
    width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#f8fafc', fontSize: '20px'
  },
  fileThumbPdf: {
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', background: '#fee2e2', color: '#dc2626'
  },
  fileThumbPdfTag: {
    fontSize: '8px', fontWeight: 900, lineHeight: 1, marginTop: '2px', letterSpacing: '0.5px'
  },
  fileIcon: { fontSize: '26px', background: '#fff', padding: '8px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  fileName: { fontSize: '14px', fontWeight: 800, color: NAVY, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  fileMeta: { fontSize: '11.5px', color: '#64748b', marginTop: '4px', fontWeight: 600 },
  checkIcon: { fontSize: '20px', color: GOLD },
  previewWrap: { padding: '0 20px 20px' },
  previewBox: {
    background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px',
    display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px',
  },
  previewBadge: { background: '#16a34a', color: '#fff', fontSize: '10px', fontWeight: 900, padding: '4px 8px', borderRadius: '4px', letterSpacing: '1px' },
  previewLink: {
    flex: 1, fontSize: '13px', color: '#166534', fontWeight: 700, textDecoration: 'none',
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', direction: 'rtl', textAlign: 'left'
  },
  clearBtn: {
    background: '#fee2e2', border: 'none', color: '#ef4444', borderRadius: '6px',
    fontWeight: 900, cursor: 'pointer', width: '28px', height: '28px', display: 'flex',
    alignItems: 'center', justifyContent: 'center', transition: '0.2s', fontSize: '14px'
  },
  dropZone: {
    border: '2px dashed #cbd5e1', borderRadius: '10px', background: '#f8fafc',
    textAlign: 'center', padding: '30px', position: 'relative', cursor: 'pointer', transition: 'all 0.2s'
  },
  hiddenFileInput: {
    position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer'
  }
};