import React, { useState, useRef, useCallback } from 'react';

export default function ImageCropper({ src, onCrop, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 100, h: 100 });
  const imgRef = useRef(null);

  const T = {
    gold: '#f4a023',
    navy: '#0f2347',
    b2: '#cbd5e1'
  };

  const handleCrop = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    const canvas = document.createElement('canvas');
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    const ow = (crop.w / 100) * img.width;
    const oh = (crop.h / 100) * img.height;
    canvas.width = ow * scaleX;
    canvas.height = oh * scaleY;
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(
      img,
      (crop.x / 100) * img.naturalWidth,
      (crop.y / 100) * img.naturalHeight,
      ow * scaleX,
      oh * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );
    canvas.toBlob(b => onCrop(b), 'image/jpeg', 0.92);
  }, [crop, onCrop]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,35,71,.95)', zIndex: 100010, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: '90%', maxWidth: 720, boxShadow: '0 25px 50px rgba(0,0,0,.2)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.navy, fontFamily: "'DM Sans', sans-serif" }}>✂️ Crop Image</div>
          <button onClick={onCancel} style={{ padding: '7px 14px', fontSize: 12, borderRadius: 8, background: '#f1f5f9', color: T.navy, border: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>✕ Cancel</button>
        </div>

        <div style={{ position: 'relative', width: '100%', borderRadius: 12, overflow: 'hidden', marginBottom: 24, background: '#f1f5f9' }}>
          <img ref={imgRef} src={src} alt="crop" style={{ width: '100%', display: 'block', borderRadius: 12 }} />
          <div style={{
            position: 'absolute', left: `${crop.x}%`, top: `${crop.y}%`, width: `${crop.w}%`, height: `${crop.h}%`,
            border: `3px solid ${T.gold}`, background: 'rgba(244,160,35,.15)', boxShadow: '0 0 0 9999px rgba(15,35,71,.6)', pointerEvents: 'none'
          }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>
          {[['X Offset (%)', 'x', 0, 50], ['Y Offset (%)', 'y', 0, 50], ['Width (%)', 'w', 30, 100], ['Height (%)', 'h', 30, 100]].map(([lbl, key, min, max]) => (
            <div key={key}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#334155', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.5px' }}>{lbl}</label>
              <input type="range" min={min} max={max} value={crop[key]} onChange={e => setCrop(c => ({ ...c, [key]: +e.target.value }))} style={{ width: '100%', accentColor: T.navy }} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, fontFamily: "'DM Sans', sans-serif" }}>
          <button onClick={handleCrop} style={{ flex: 1, justifyContent: 'center', padding: '11px 24px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', border: 'none', background: `linear-gradient(135deg, ${T.gold}, #c97e10)`, color: '#fff', fontSize: '13.5px' }}>✂️ Apply Crop & Use</button>
          <button onClick={onCancel} style={{ padding: '11px 24px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', background: '#f1f5f9', color: T.navy, border: '1px solid #e2e8f0', fontSize: '13.5px' }}>Use Original</button>
        </div>

      </div>
    </div>
  );
}