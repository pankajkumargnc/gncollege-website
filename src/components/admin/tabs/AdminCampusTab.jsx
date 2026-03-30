// src/components/AdminCampusTab.jsx
import React, { useState, useEffect, useRef } from 'react';
import { doc, setDoc, onSnapshot, serverTimestamp, getDoc } from 'firebase/firestore'; // ✅ getDoc added
import { db } from "../../../firebase";
import toast from 'react-hot-toast';
import MediaPicker from '../../MediaPicker';

const NAVY = '#0f2347';
const C    = '#0ea5e9';

const CATEGORIES = [
  { id: 'bank-more',      label: 'Bank More Campus',    icon: '🏛️' },
  { id: 'bhuda',          label: 'Bhuda Campus',         icon: '🌳' },
  { id: 'vocational',     label: 'Vocational Building',  icon: '🏢' },
  { id: 'infrastructure', label: 'Infrastructure',        icon: '🏗️' },
  { id: 'classrooms',     label: 'Classrooms',           icon: '🏫' },
  { id: 'ict-rooms',      label: 'ICT Rooms',            icon: '💻' },
  { id: 'green-campus',   label: 'Green Campus',         icon: '🌿' },
];

export default function AdminCampusTab({ imgbbKey = '' }) {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id);
  const [images,    setImages]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [uploading, setUploading] = useState(false);
  const [prog,      setProg]      = useState(0);
  const [caption,   setCaption]   = useState('');
  
  // ✅ NAYA SYSTEM: Khud ki State jo API key ko track karegi
  const [apiKey, setApiKey] = useState(imgbbKey || window.GN_IMGBB_KEY || '');
  const fileInputRef = useRef(null);

  // ✅ DIRECT FETCH: Agar key nahi hai toh direct Firebase se fetch karke layega
  useEffect(() => {
    if (!apiKey) {
      getDoc(doc(db, 'settings', 'site')).then(s => {
        if (s.exists() && s.data().imgbbKey) {
          setApiKey(s.data().imgbbKey);
        }
      }).catch(()=>{});
    }
  }, [apiKey]);

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

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Key Check
    if (!apiKey) {
      toast.error('ImgBB API key missing! Admin → Site Settings → ImgBB API Key set karein.');
      e.target.value = '';
      return;
    }

    setUploading(true);
    setProg(30);

    const formData = new FormData();
    formData.append('image', file);

    try {
      setProg(60);
      // ✅ Using the local state apiKey
      const res  = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST', body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setProg(90);
        const newPhoto = {
          id:      Date.now().toString(),
          url:     data.data.url,
          caption: caption.trim() || 'Campus View',
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
        toast.error('Upload Failed: ' + (data.error?.message || 'Unknown error'));
      }
    } catch (error) {
      toast.error('Network Error! Internet connection check karein.');
    } finally {
      setUploading(false);
      setProg(0);
      if(fileInputRef.current) fileInputRef.current.value = '';
    }
  };

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

  const activeLabel = CATEGORIES.find(c => c.id === activeCat)?.label;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 1100 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontWeight: 900, fontSize: 22, color: NAVY, margin: '0 0 4px' }}>
          📸 Campus Gallery Manager
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>
          Campus ki photos caption ke sath upload karein.
        </p>
        {/* ✅ Dynamic Warning */}
        {!apiKey && (
          <div style={{ marginTop: 8, padding: '8px 12px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, color: '#b91c1c', fontSize: 12, fontWeight: 700 }}>
            ⚠️ ImgBB API key missing — Admin → Site Settings → ImgBB API Key
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28, paddingBottom: 16, borderBottom: '1.5px solid #f1f5f9' }}>
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActiveCat(cat.id)}
            style={{ padding: '10px 18px', border: '1.5px solid #e2e8f0', borderRadius: 10, background: activeCat === cat.id ? NAVY : '#fff', color: activeCat === cat.id ? '#fff' : '#64748b', fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}>
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Upload + Gallery */}
      <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: 14, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: NAVY }}>{activeLabel} Photos</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) auto', gap: 16, flex: 1, maxWidth: 600, alignItems: 'end' }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 6, display: 'block' }}>Photo Caption</label>
              <input
                type="text"
                placeholder="e.g. Science Lab..."
                value={caption}
                onChange={e => setCaption(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 9, fontSize: 13.5, background: '#fff', outline: 'none' }}
              />
            </div>
            <MediaPicker 
              label="Select/Upload" 
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
              }} 
              type="image" 
              driveFolderId={import.meta.env.VITE_DRIVE_IMAGES_FOLDER}
              compact={true}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8', fontWeight: 600 }}>Loading photos...</div>
        ) : images.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8fafc', borderRadius: 12, border: '2px dashed #e2e8f0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🖼️</div>
            <div style={{ color: NAVY, fontWeight: 700, fontSize: 15, marginBottom: 6 }}>No photos yet</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {images.map((img) => (
              <div key={img.id} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1.5px solid #e2e8f0', background: '#f8fafc' }}>
                <div style={{ position: 'relative', height: 160 }}>
                  <img src={img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.style.display = 'none'; }} />
                  <div
                    style={{ position: 'absolute', inset: 0, background: 'rgba(15,35,71,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                    <button onClick={() => deletePhoto(img.id)}
                      style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 12 }}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                <div style={{ padding: '10px 14px', fontSize: 12, fontWeight: 700, color: NAVY }}>
                  {img.caption}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}