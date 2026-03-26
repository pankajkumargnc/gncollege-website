// src/components/MediaPicker.jsx
// ═══════════════════════════════════════════════════════════════════
//  UNIVERSAL MEDIA PICKER
//  3 modes: 📤 Upload (ImgBB) | 🖼️ Browse public/images | 🔗 Paste URL
//  For PDFs: only 🖼️ Browse + 🔗 URL (ImgBB image-only hai)
//
//  SETUP:
//  1. AdminPanel.jsx site-settings load hone ke baad call karo:
//       import { setImgbbKey } from './MediaPicker';
//       setImgbbKey(siteCfg.imgbbKey);
//
//  2. Usage:
//       <MediaPicker
//         value={data.imageUrl}
//         onChange={url => setData(d => ({...d, imageUrl: url}))}
//         type="image"          // 'image' | 'pdf' | 'any'
//         label="Profile Photo"
//       />
// ═══════════════════════════════════════════════════════════════════

import { useState, useRef } from 'react';

// ── ImgBB key (module-level, set by AdminPanelInner on settings load) ─
let _imgbbKey = '';
export const setImgbbKey = (key) => { if (key) _imgbbKey = key; };

// ── Common files in public/ folder ─────────────────────────────────
const LOCAL_IMAGES = [
  { path: '/images/college_photo.webp',  label: 'College Photo' },
  { path: '/images/logo.webp',           label: 'Logo' },
  { path: '/images/principal.jpg',      label: 'Principal' },
  { path: '/images/vice_principal.jpg', label: 'Vice Principal' },
  { path: '/images/naac.png',           label: 'NAAC Badge' },
  { path: '/images/bbmku.png',          label: 'BBMKU Logo' },
  { path: '/images/ugc.png',            label: 'UGC Logo' },
  { path: '/images/campus1.jpg',        label: 'Campus 1' },
  { path: '/images/campus2.jpg',        label: 'Campus 2' },
  { path: '/images/library.jpg',        label: 'Library' },
  { path: '/images/lab.jpg',            label: 'Computer Lab' },
  { path: '/images/seminar.jpg',        label: 'Seminar Hall' },
];

const LOCAL_PDFS = [
  { path: '/pdfs/prospectus.pdf',       label: 'Prospectus' },
  { path: '/pdfs/syllabus.pdf',         label: 'Syllabus' },
  { path: '/pdfs/fee-structure.pdf',    label: 'Fee Structure' },
  { path: '/pdfs/admission-form.pdf',   label: 'Admission Form' },
];

// ── Styles ──────────────────────────────────────────────────────────
const NAVY = '#0f2347';
const GOLD = '#f4a023';

// Upload to ImgBB
const uploadToImgBB = (file, onProg) => new Promise((res, rej) => {
  if (!_imgbbKey) {
    rej(new Error('ImgBB API key missing — Admin → Settings → ImgBB API Key add karein'));
    return;
  }
  const fd = new FormData();
  fd.append('image', file);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `https://api.imgbb.com/1/upload?key=${_imgbbKey}`, true);
  xhr.upload.onprogress = e => e.lengthComputable && onProg(Math.round(e.loaded / e.total * 100));
  xhr.onload = () => {
    if (xhr.status === 200) {
      try { res(JSON.parse(xhr.responseText).data.url); }
      catch { rej(new Error('ImgBB response parse error')); }
    } else {
      const msg = (() => { try { return JSON.parse(xhr.responseText)?.error?.message; } catch { return null; } })();
      rej(new Error(msg || `Upload failed (${xhr.status}) — API key check karein`));
    }
  };
  xhr.onerror = () => rej(new Error('Network error — internet check karein'));
  xhr.send(fd);
});

// ═══════════════════════════════════════════════════════════════════
//  MEDIAPICKER COMPONENT
// ═══════════════════════════════════════════════════════════════════
export default function MediaPicker({
  value      = '',
  onChange,
  type       = 'image',   // 'image' | 'pdf' | 'any'
  label      = '',
  compact    = false,     // compact mode — smaller card
}) {
  const isImage = type === 'image' || type === 'any';
  const isPdf   = type === 'pdf'   || type === 'any';

  const [mode,      setMode]      = useState(isImage ? 'upload' : 'url');
  const [uploading, setUploading] = useState(false);
  const [prog,      setProg]      = useState(0);
  const [error,     setError]     = useState('');
  const [urlInput,  setUrlInput]  = useState('');
  const [localPath, setLocalPath] = useState('');
  const [dragging,  setDragging]  = useState(false);
  const fileRef = useRef();

  const localList = isPdf && !isImage ? LOCAL_PDFS : LOCAL_IMAGES;

  const modes = [
    ...(isImage ? [{ id: 'upload', icon: '📤', label: 'PC se Upload' }] : []),
    { id: 'local',  icon: '🗂️',  label: 'Public Folder' },
    { id: 'url',    icon: '🔗',  label: 'Paste URL' },
  ];

  // ── Handle file from PC ──────────────────────────────────────────
  const handleFile = async (file) => {
    if (!file) return;
    const validImage = file.type.startsWith('image/');
    const validPdf   = file.type === 'application/pdf';
    if (isImage && !isPdf && !validImage) { setError('Sirf image files allowed (JPG, PNG, WEBP...)'); return; }
    if (isPdf   && !isImage && !validPdf)  { setError('Sirf PDF files allowed'); return; }

    setError(''); setUploading(true); setProg(0);
    try {
      if (validImage) {
        // Images → ImgBB
        const url = await uploadToImgBB(file, setProg);
        onChange(url);
      } else if (validPdf) {
        // PDFs can't go to ImgBB — show error with guidance
        setError('PDFs ImgBB pe upload nahi ho sakte. "Paste URL" mode use karein — Google Drive public link paste karein.');
      }
    } catch (e) {
      setError(e.message);
    }
    setUploading(false); setProg(0);
  };

  // ── Drag & Drop ─────────────────────────────────────────────────
  const onDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const S = {
    wrap: {
      border: `1.5px solid #e2e8f0`,
      borderRadius: 14,
      background: '#fafbfc',
      overflow: 'hidden',
      marginBottom: compact ? 8 : 16,
      fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif",
    },
    header: {
      padding: compact ? '8px 14px' : '12px 16px',
      borderBottom: '1px solid #f1f5f9',
      display: 'flex', alignItems: 'center', gap: 10,
    },
    modes: {
      display: 'flex', gap: 0,
      borderBottom: '1px solid #f1f5f9',
      background: '#f8fafc',
    },
    modeBtn: (active) => ({
      flex: 1, padding: compact ? '8px 6px' : '10px 8px',
      border: 'none', cursor: 'pointer', fontFamily: 'inherit',
      fontSize: compact ? 11 : 12, fontWeight: 700,
      color: active ? NAVY : '#94a3b8',
      background: active ? '#fff' : 'transparent',
      borderBottom: `2px solid ${active ? GOLD : 'transparent'}`,
      transition: 'all .15s',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
    }),
    body: { padding: compact ? '12px 14px' : '16px 16px' },
    dropZone: (drag) => ({
      border: `2px dashed ${drag ? GOLD : uploading ? '#10b981' : '#cbd5e1'}`,
      borderRadius: 12,
      padding: compact ? '20px 16px' : '28px 20px',
      textAlign: 'center',
      cursor: 'pointer',
      background: drag ? '#fffbeb' : uploading ? '#f0fdf4' : '#fff',
      transition: 'all .2s',
    }),
    localGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
      gap: 8, marginBottom: 12,
    },
    localItem: (selected) => ({
      cursor: 'pointer', borderRadius: 9, overflow: 'hidden',
      border: `2px solid ${selected ? GOLD : '#f1f5f9'}`,
      background: '#fff', transition: 'all .15s',
      boxShadow: selected ? `0 0 0 3px ${GOLD}33` : 'none',
    }),
    inp: {
      width: '100%', padding: '10px 12px',
      border: '1.5px solid #e2e8f0', borderRadius: 9,
      fontSize: 13, fontFamily: 'inherit', color: '#334155',
      background: '#fff', outline: 'none', boxSizing: 'border-box',
    },
    preview: {
      padding: '12px 16px',
      borderTop: '1px solid #f1f5f9',
      background: '#fff',
      display: 'flex', alignItems: 'center', gap: 12,
    },
    clearBtn: {
      background: '#fee2e2', border: 'none', color: '#ef4444',
      borderRadius: 7, padding: '5px 10px', cursor: 'pointer',
      fontSize: 11, fontWeight: 700, fontFamily: 'inherit',
    },
  };

  return (
    <div style={S.wrap}>
      {/* Header */}
      {label && (
        <div style={S.header}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', letterSpacing: '.3px' }}>{label}</span>
        </div>
      )}

      {/* Mode switcher */}
      <div style={S.modes}>
        {modes.map(m => (
          <button key={m.id} style={S.modeBtn(mode === m.id)} onClick={() => setMode(m.id)}>
            <span>{m.icon}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Body */}
      <div style={S.body}>

        {/* ── UPLOAD MODE ─────────────────────────────────────── */}
        {mode === 'upload' && (
          <div>
            <div
              style={S.dropZone(dragging)}
              onClick={() => !uploading && fileRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
            >
              <input
                ref={fileRef}
                type="file"
                accept={isImage && !isPdf ? 'image/*' : isPdf && !isImage ? '.pdf' : 'image/*,.pdf'}
                style={{ display: 'none' }}
                onChange={e => e.target.files[0] && handleFile(e.target.files[0])}
              />
              {uploading ? (
                <div>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>⏫</div>
                  <div style={{ fontWeight: 700, color: NAVY, fontSize: 13, marginBottom: 10 }}>
                    Uploading to ImgBB... {prog}%
                  </div>
                  <div style={{ height: 6, borderRadius: 6, background: '#e2e8f0', overflow: 'hidden', maxWidth: 200, margin: '0 auto' }}>
                    <div style={{ height: '100%', borderRadius: 6, background: `linear-gradient(90deg,${NAVY},${GOLD})`, width: `${prog}%`, transition: 'width .3s' }} />
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: compact ? 26 : 34, marginBottom: 8 }}>
                    {dragging ? '⬇️' : '📤'}
                  </div>
                  <div style={{ fontWeight: 700, color: NAVY, fontSize: 13, marginBottom: 4 }}>
                    {dragging ? 'Drop karo!' : 'Click karo ya file drag karein'}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>
                    ImgBB pe free upload — lifetime hosted
                  </div>
                </div>
              )}
            </div>
            <p style={{ fontSize: 11, color: '#94a3b8', margin: '8px 0 0', textAlign: 'center' }}>
              💡 Apni ImgBB API key lagayen: Admin → Site Settings → ImgBB Key
            </p>
          </div>
        )}

        {/* ── LOCAL / PUBLIC FOLDER MODE ───────────────────────── */}
        {mode === 'local' && (
          <div>
            <p style={{ fontSize: 11.5, color: '#64748b', margin: '0 0 12px', fontWeight: 600 }}>
              📁 <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>public/</code> folder ke files — koi bhi path type karein ya neeche se choose karein
            </p>

            {/* Predefined thumbnails */}
            <div style={S.localGrid}>
              {localList.map(item => (
                <div key={item.path} style={S.localItem(value === item.path)}
                  onClick={() => onChange(item.path)}
                  title={item.path}
                >
                  {isPdf && !isImage ? (
                    <div style={{ padding: '10px 6px', textAlign: 'center' }}>
                      <div style={{ fontSize: 20 }}>📄</div>
                      <div style={{ fontSize: 9, color: '#64748b', marginTop: 3, lineHeight: 1.3 }}>{item.label}</div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={item.path}
                        alt={item.label}
                        style={{ width: '100%', height: 56, objectFit: 'cover', display: 'block' }}
                        onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                      />
                      <div style={{ display: 'none', width: '100%', height: 56, alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontSize: 18 }}>📷</div>
                      <div style={{ padding: '4px 5px', fontSize: 9, color: '#64748b', textAlign: 'center', lineHeight: 1.3, background: '#fafafa' }}>{item.label}</div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Custom path input */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                style={S.inp}
                placeholder={isPdf && !isImage ? '/pdfs/report.pdf ya /documents/file.pdf' : '/images/photo.jpg ya /images/logo.webp'}
                value={localPath}
                onChange={e => setLocalPath(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && localPath.trim()) { onChange(localPath.trim()); setLocalPath(''); } }}
              />
              <button
                onClick={() => { if (localPath.trim()) { onChange(localPath.trim()); setLocalPath(''); } }}
                style={{ background: NAVY, color: '#fff', border: 'none', borderRadius: 9, padding: '10px 16px', cursor: 'pointer', fontWeight: 700, fontSize: 12, fontFamily: 'inherit', whiteSpace: 'nowrap' }}
              >
                ✓ Use
              </button>
            </div>
            <p style={{ fontSize: 10.5, color: '#94a3b8', margin: '7px 0 0' }}>
              Enter press karo ya ✓ Use click karo • Path `/` se shuru hona chahiye
            </p>
          </div>
        )}

        {/* ── URL PASTE MODE ───────────────────────────────────── */}
        {mode === 'url' && (
          <div>
            <p style={{ fontSize: 11.5, color: '#64748b', margin: '0 0 10px', fontWeight: 600 }}>
              {isPdf && !isImage
                ? '🔗 Google Drive public link ya koi bhi direct PDF URL paste karein'
                : '🔗 ImgBB, Google Drive, ya koi bhi direct image URL paste karein'}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                style={S.inp}
                placeholder={isPdf && !isImage
                  ? 'https://drive.google.com/file/d/... ya direct PDF URL'
                  : 'https://i.ibb.co/... ya https://drive.google.com/...'}
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && urlInput.trim()) { onChange(urlInput.trim()); setUrlInput(''); } }}
              />
              <button
                onClick={async () => {
                  if (urlInput.trim()) { onChange(urlInput.trim()); setUrlInput(''); }
                  else {
                    // Try clipboard paste
                    try {
                      const text = await navigator.clipboard.readText();
                      if (text.startsWith('http')) { setUrlInput(text); }
                    } catch { /* clipboard permission denied */ }
                  }
                }}
                style={{ background: urlInput.trim() ? NAVY : '#64748b', color: '#fff', border: 'none', borderRadius: 9, padding: '10px 14px', cursor: 'pointer', fontWeight: 700, fontSize: 12, fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'background .15s' }}
              >
                {urlInput.trim() ? '✓ Set' : '📋 Paste'}
              </button>
            </div>
            {isPdf && !isImage && (
              <div style={{ marginTop: 10, background: '#fffbeb', border: '1px solid #fed7aa', borderRadius: 9, padding: '10px 13px', fontSize: 11.5, color: '#92400e', lineHeight: 1.7 }}>
                <strong>Google Drive PDF link kaise banayein:</strong><br />
                Drive → File → Share → "Anyone with the link" → Copy Link → Paste here
              </div>
            )}
          </div>
        )}

        {/* ── Error ───────────────────────────────────────────── */}
        {error && (
          <div style={{ marginTop: 10, background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 9, padding: '9px 13px', fontSize: 12, color: '#991b1b', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span>⚠️</span>
            <div>{error}</div>
          </div>
        )}
      </div>

      {/* ── Preview ─────────────────────────────────────────────── */}
      {value && (
        <div style={S.preview}>
          {(type === 'image' || type === 'any') && value.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)(\?|$)/i) ? (
            <img src={value} alt="preview"
              style={{ width: compact ? 48 : 64, height: compact ? 36 : 48, objectFit: 'cover', borderRadius: 8, border: `2px solid ${GOLD}33`, flexShrink: 0 }}
              onError={e => e.target.style.display='none'}
            />
          ) : (
            <div style={{ width: compact ? 40 : 52, height: compact ? 36 : 44, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: compact ? 18 : 24, flexShrink: 0 }}>
              {value.endsWith('.pdf') ? '📄' : '🔗'}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#10b981', marginBottom: 2 }}>✓ Set</div>
            <a href={value} target="_blank" rel="noreferrer"
              style={{ fontSize: 11, color: '#64748b', wordBreak: 'break-all', textDecoration: 'none' }}
              title={value}
            >
              {value.length > 55 ? value.slice(0, 52) + '…' : value}
            </a>
          </div>
          <button style={S.clearBtn} onClick={() => onChange('')}>✕ Clear</button>
        </div>
      )}
    </div>
  );
}