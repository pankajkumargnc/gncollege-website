// src/components/admin/tabs/AdminCampusTab.jsx
import React, { useState, useEffect, useRef } from 'react';
import { doc, setDoc, onSnapshot, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import toast from 'react-hot-toast';
import { Building, Trees, Building2, Landmark, School, Laptop, Leaf, Plus, Cloud, Upload, Edit2, Copy, Trash2, Check, X, Loader2, Eye } from 'lucide-react';
import MediaPicker from '../../MediaPicker';
import { resolveUrl } from '../../../utils/resolver';

const NAVY = '#0f2347';
const GOLD = '#f4a023';

const CATEGORIES = [
  { id: 'bank-more',      label: 'Bank More Campus',    icon: Building },
  { id: 'bhuda',          label: 'Bhuda Campus',         icon: Trees },
  { id: 'vocational',     label: 'Vocational Building',  icon: Building2 },
  { id: 'infrastructure', label: 'Infrastructure',        icon: Landmark },
  { id: 'classrooms',     label: 'Classrooms',           icon: School },
  { id: 'ict-rooms',      label: 'ICT Rooms',            icon: Laptop },
  { id: 'green-campus',   label: 'Green Campus',         icon: Leaf },
];

export default function AdminCampusTab({ imgbbKey = '' }) {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id);
  const [images,    setImages]    = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading,   setLoading]   = useState(true);
  const [uploading, setUploading] = useState(false);
  const [directUrl, setDirectUrl] = useState('');
  const [caption,   setCaption]   = useState('');
  
  // Inline editing state
  const [editingId, setEditingId] = useState(null);
  const [editingCaption, setEditingCaption] = useState('');

  // Lightbox preview modal state
  const [previewPhoto, setPreviewPhoto] = useState(null);

  // API Key state for ImgBB upload
  const [apiKey, setApiKey] = useState(imgbbKey || window.GN_IMGBB_KEY || '');
  const fileInputRef = useRef(null);

  // Fetch ImgBB key if missing
  useEffect(() => {
    if (!apiKey) {
      getDoc(doc(db, 'settings', 'site')).then(s => {
        if (s.exists() && s.data().imgbbKey) {
          setApiKey(s.data().imgbbKey);
        }
      }).catch(() => {});
    }
  }, [apiKey]);

  // Listen to all category photo counts
  useEffect(() => {
    const unsubs = CATEGORIES.map(cat => {
      return onSnapshot(doc(db, 'campus_gallery', cat.id), (snap) => {
        if (snap.exists()) {
          const photos = snap.data().photos || [];
          setCategoryCounts(prev => ({ ...prev, [cat.id]: photos.length }));
        } else {
          setCategoryCounts(prev => ({ ...prev, [cat.id]: 0 }));
        }
      }, () => {});
    });
    return () => unsubs.forEach(u => u && u());
  }, []);

  // Fetch images for selected category
  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, 'campus_gallery', activeCat), (snap) => {
      if (snap.exists()) setImages(snap.data().photos || []);
      else setImages([]);
      setLoading(false);
    });
    return () => unsub();
  }, [activeCat]);

  // Add photo by direct URL
  const handleAddDirectUrl = async (e) => {
    if (e) e.preventDefault();
    const url = directUrl.trim();
    if (!url) {
      toast.error('Please enter an image URL.');
      return;
    }

    const newPhoto = {
      id: Date.now().toString(),
      url: url,
      caption: caption.trim() || 'Campus View',
      addedAt: new Date().toISOString(),
    };

    try {
      const updatedPhotos = [newPhoto, ...images];
      await setDoc(
        doc(db, 'campus_gallery', activeCat),
        { photos: updatedPhotos, updatedAt: serverTimestamp() },
        { merge: true }
      );
      toast.success('Photo added to gallery!');
      setDirectUrl('');
      setCaption('');
    } catch {
      toast.error('Failed to save photo.');
    }
  };

  // Upload local file via ImgBB
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!apiKey) {
      toast.error('ImgBB API key missing! Configure in Admin → Site Settings or paste direct URL.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        const newPhoto = {
          id: Date.now().toString(),
          url: data.data.url,
          caption: caption.trim() || file.name.replace(/\.[^/.]+$/, "") || 'Campus View',
          addedAt: new Date().toISOString(),
        };
        const updatedPhotos = [newPhoto, ...images];
        await setDoc(
          doc(db, 'campus_gallery', activeCat),
          { photos: updatedPhotos, updatedAt: serverTimestamp() },
          { merge: true }
        );
        toast.success('Photo uploaded successfully!');
        setCaption('');
      } else {
        toast.error('Upload failed: ' + (data.error?.message || 'Unknown error'));
      }
    } catch {
      toast.error('Upload failed! Please check your internet connection.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Save edited caption
  const handleSaveCaption = async (photoId) => {
    const updatedPhotos = images.map(img => {
      if (img.id === photoId) {
        return { ...img, caption: editingCaption.trim() || img.caption };
      }
      return img;
    });

    try {
      await setDoc(
        doc(db, 'campus_gallery', activeCat),
        { photos: updatedPhotos, updatedAt: serverTimestamp() },
        { merge: true }
      );
      toast.success('Caption updated!');
      setEditingId(null);
    } catch {
      toast.error('Failed to update caption.');
    }
  };

  // Delete photo
  const deletePhoto = async (photoId) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    const updatedPhotos = images.filter(img => img.id !== photoId);
    try {
      await setDoc(
        doc(db, 'campus_gallery', activeCat),
        { photos: updatedPhotos, updatedAt: serverTimestamp() },
        { merge: true }
      );
      toast.success('Photo deleted!');
    } catch {
      toast.error('Failed to delete photo.');
    }
  };

  // Copy image URL
  const copyPhotoUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('Image link copied to clipboard!');
  };

  const activeLabel = CATEGORIES.find(c => c.id === activeCat)?.label;

  // Toggle cloud Drive picker modal/section
  const [showDrivePicker, setShowDrivePicker] = useState(false);

  // Category Tabs with Photo Counters
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handlePhotoUpload}
      />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 20, width: '100%' }}>
        <div>
          <h2 style={{ fontWeight: 900, fontSize: 22, color: NAVY, margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📸</span> Campus Gallery Manager
          </h2>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>
            Manage high-resolution photo showcases across all college campuses, classrooms, and facilities.
          </p>
        </div>
        {!apiKey && (
          <div style={{ padding: '6px 12px', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 8, color: '#92400e', fontSize: 12, fontWeight: 700 }}>
            💡 Tip: Direct image links and Drive picker work instantly without API key
          </div>
        )}
      </div>

      {/* Category Tabs with Photo Counters (Full width, wrapping naturally with NO horizontal scroll) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 12px', paddingBottom: 16, marginBottom: 24, borderBottom: '1.5px solid #e2e8f0', width: '100%' }}>
        {CATEGORIES.map(cat => {
          const isActive = activeCat === cat.id;
          const count = categoryCounts[cat.id] ?? 0;
          return (
            <button
              key={cat.id}
              onClick={() => { setActiveCat(cat.id); setEditingId(null); }}
              style={{
                padding: '9px 16px',
                border: isActive ? `1.5px solid ${NAVY}` : '1.5px solid #e2e8f0',
                borderRadius: 10,
                background: isActive ? NAVY : '#fff',
                color: isActive ? '#fff' : '#475569',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 12px rgba(15,35,71,0.15)' : 'none',
              }}
            >
              <cat.icon size={15} />
              <span>{cat.label}</span>
              <span style={{
                background: isActive ? 'rgba(255,255,255,0.22)' : '#f1f5f9',
                color: isActive ? '#fff' : '#64748b',
                padding: '2px 8px',
                borderRadius: 12,
                fontSize: 11,
                fontWeight: 800,
                fontVariantNumeric: 'tabular-nums',
                marginLeft: 4,
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Add Photo Panel */}
      <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '20px 24px', marginBottom: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.02)', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: NAVY, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Plus size={16} color={GOLD} /> Add Photo to <span style={{ color: GOLD }}>{activeLabel}</span>
          </div>
          {uploading && (
            <span style={{ fontSize: 12, color: '#3b82f6', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Loader2 size={13} className="animate-spin" /> Uploading image...
            </span>
          )}
        </div>

        {/* Form Inputs Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, alignItems: 'flex-end', marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 5, display: 'block' }}>Photo Caption</label>
            <input
              type="text"
              placeholder="e.g. Modern Physics Lab with Smart Board"
              value={caption}
              onChange={e => setCaption(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #cbd5e1', borderRadius: 8, fontSize: 13, background: '#fff', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 5, display: 'block' }}>Direct Image URL (or paste link)</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                placeholder="https://... or Google Drive link"
                value={directUrl}
                onChange={e => setDirectUrl(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddDirectUrl(); }}
                style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #cbd5e1', borderRadius: 8, fontSize: 13, background: '#fff', outline: 'none' }}
              />
              <button
                onClick={handleAddDirectUrl}
                disabled={!directUrl.trim()}
                style={{
                  background: directUrl.trim() ? NAVY : '#cbd5e1',
                  color: '#fff',
                  border: 'none',
                  padding: '0 18px',
                  borderRadius: 8,
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: directUrl.trim() ? 'pointer' : 'not-allowed',
                  whiteSpace: 'nowrap',
                }}
              >
                Add Photo
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Options: Cloud Drive Picker & Local Upload */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', paddingTop: 14, borderTop: '1px dashed #e2e8f0' }}>
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Alternative sources:</span>
          
          <button
            onClick={() => setShowDrivePicker(!showDrivePicker)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              background: showDrivePicker ? `${NAVY}10` : '#f8fafc',
              border: `1.5px solid ${showDrivePicker ? NAVY : '#cbd5e1'}`,
              borderRadius: 8,
              color: NAVY,
              fontWeight: 700,
              fontSize: 12.5,
              cursor: 'pointer',
            }}
          >
            <Cloud size={14} /> {showDrivePicker ? 'Hide Drive Library' : 'Browse Google Drive & Cloud Library'}
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              background: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              borderRadius: 8,
              color: NAVY,
              fontWeight: 700,
              fontSize: 12.5,
              cursor: uploading ? 'wait' : 'pointer',
            }}
          >
            <Upload size={14} /> Upload from Computer
          </button>
        </div>

        {/* Expandable Drive MediaPicker Panel */}
        {showDrivePicker && (
          <div style={{ marginTop: 18, padding: 16, background: '#f8fafc', borderRadius: 12, border: '1.5px solid #cbd5e1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>Select Photo from Google Drive / Cloud:</span>
              <button
                onClick={() => setShowDrivePicker(false)}
                style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 14, fontWeight: 700 }}
              >
                ✕ Close
              </button>
            </div>
            <MediaPicker
              label="Select Media"
              value=""
              onChange={async (url) => {
                if (!url) return;
                const newPhoto = {
                  id: Date.now().toString(),
                  url: url,
                  caption: caption.trim() || 'Campus View',
                  addedAt: new Date().toISOString(),
                };
                const updatedPhotos = [newPhoto, ...images];
                await setDoc(
                  doc(db, 'campus_gallery', activeCat),
                  { photos: updatedPhotos, updatedAt: serverTimestamp() },
                  { merge: true }
                );
                toast.success('Photo added to gallery!');
                setCaption('');
                setShowDrivePicker(false);
              }}
              type="image"
              driveFolderId={import.meta.env.VITE_DRIVE_IMAGES_FOLDER}
            />
          </div>
        )}
      </div>

      {/* Gallery Showcase Grid */}
      <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.02)', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: NAVY }}>
            {activeLabel} Showcase ({images.length} {images.length === 1 ? 'photo' : 'photos'})
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', fontWeight: 600 }}>
            <div className="anim-spin" style={{ fontSize: 28, marginBottom: 8 }}>⏳</div>
            Loading campus photos...
          </div>
        ) : images.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8fafc', borderRadius: 12, border: '2px dashed #cbd5e1' }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🖼️</div>
            <div style={{ color: NAVY, fontWeight: 800, fontSize: 16, marginBottom: 6 }}>No photos in {activeLabel} yet</div>
            <p style={{ color: '#64748b', fontSize: 13, maxWidth: 420, margin: '0 auto 16px' }}>
              Add photos using the form above. You can paste image URLs directly, pick from Google Drive, or upload local files.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))', gap: 20 }}>
            {images.map((img) => {
              const displayUrl = resolveUrl(img.url);
              const isEditing = editingId === img.id;

              return (
                <div
                  key={img.id}
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '1.5px solid #e2e8f0',
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,35,71,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  }}
                >
                  {/* Image container */}
                  <div style={{ position: 'relative', height: 180, background: '#f1f5f9', cursor: 'pointer' }} onClick={() => setPreviewPhoto(img)}>
                    <img
                      src={displayUrl}
                      alt={img.caption || 'Campus photo'}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => {
                        e.target.style.display = 'none';
                        e.target.parentNode.style.display = 'flex';
                        e.target.parentNode.style.alignItems = 'center';
                        e.target.parentNode.style.justifyContent = 'center';
                        e.target.parentNode.innerHTML = '<div style="color:#94a3b8;font-size:12px;font-weight:700;">⚠️ Image not reachable</div>';
                      }}
                    />
                    {/* Hover overlay hint */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: 'rgba(15,35,71,0.75)',
                        color: '#fff',
                        borderRadius: 6,
                        padding: '4px 8px',
                        fontSize: 11,
                        fontWeight: 700,
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      🔍 Preview
                    </div>
                  </div>

                  {/* Caption & Controls */}
                  <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 10 }}>
                    {isEditing ? (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <input
                          type="text"
                          value={editingCaption}
                          autoFocus
                          onChange={e => setEditingCaption(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') handleSaveCaption(img.id);
                            if (e.key === 'Escape') setEditingId(null);
                          }}
                          style={{ flex: 1, padding: '6px 8px', border: '1.5px solid #3b82f6', borderRadius: 6, fontSize: 12, outline: 'none' }}
                        />
                        <button
                          onClick={() => handleSaveCaption(img.id)}
                          style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0 10px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          style={{ background: '#e2e8f0', color: '#475569', border: 'none', padding: '0 8px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div style={{ fontWeight: 700, fontSize: 13, color: NAVY, lineHeight: 1.4, wordBreak: 'break-word' }}>
                        {img.caption || 'Campus View'}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: 8 }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          onClick={() => {
                            setEditingId(img.id);
                            setEditingCaption(img.caption || '');
                          }}
                          title="Edit Caption"
                          style={{ background: '#f1f5f9', border: 'none', padding: '5px 9px', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 700, color: NAVY, display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        >
                          <Edit2 size={11} /> Edit
                        </button>
                        <button
                          onClick={() => copyPhotoUrl(img.url)}
                          title="Copy Image URL"
                          style={{ background: '#f1f5f9', border: 'none', padding: '5px 9px', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 700, color: '#475569', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        >
                          <Copy size={11} /> Copy
                        </button>
                      </div>

                      <button
                        onClick={() => deletePhoto(img.id)}
                        title="Delete photo"
                        style={{ background: '#fee2e2', border: 'none', padding: '5px 9px', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 700, color: '#dc2626', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                      >
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Preview Modal */}
      {previewPhoto && (
        <div
          onClick={() => setPreviewPhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.85)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 16,
              maxWidth: 800,
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ position: 'relative', maxHeight: '70vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={resolveUrl(previewPhoto.url)}
                alt={previewPhoto.caption}
                style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
              />
              <button
                onClick={() => setPreviewPhoto(null)}
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  fontSize: 18,
                  cursor: 'pointer',
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: NAVY }}>{previewPhoto.caption || 'Campus View'}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Category: {activeLabel}</div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <a
                  href={resolveUrl(previewPhoto.url)}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: '8px 16px',
                    background: '#f1f5f9',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    color: NAVY,
                    textDecoration: 'none',
                  }}
                >
                  Open Original ↗
                </a>
                <button
                  onClick={() => copyPhotoUrl(previewPhoto.url)}
                  style={{
                    padding: '8px 16px',
                    background: NAVY,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Copy URL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}