// src/components/admin/tabs/BackupTab.jsx
import { useState, useRef } from 'react';
import { db } from "../../../firebase";
import {
  collection, getDocs, doc, getDoc,
  addDoc, setDoc, writeBatch, serverTimestamp,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD } from '../AdminShared';

export default function BackupTab({ logAct }) {
  const [loading, setLoading] = useState(false);
  const [restoreFile, setRestoreFile] = useState(null);
  const [backupMeta, setBackupMeta] = useState(null); // info from last backup
  const fileRef = useRef(null);

  // ── Download full backup ──────────────────────────────────────────────────
  const handleBackup = async () => {
    setLoading(true);
    try {
      const cols = [
        'notices', 'announcements', 'events', 'gallery', 'pdfReports',
        'pages', 'faculties', 'placements', 'sliderSlides', 'alerts', 'adminLogs',
      ];
      const backup = {
        _meta: { version: '11.0', date: new Date().toISOString(), college: 'GNC Dhanbad' },
      };

      // Settings docs
      const [nb, yt, dr, site, contact] = await Promise.all([
        getDoc(doc(db, 'settings', 'navbar')),
        getDoc(doc(db, 'settings', 'youtube')),
        getDoc(doc(db, 'settings', 'drive')),
        getDoc(doc(db, 'settings', 'site')),
        getDoc(doc(db, 'settings', 'contact')),
      ]);
      if (nb.exists())      backup.navbar   = nb.data();
      if (yt.exists())      backup.youtube  = yt.data();
      if (dr.exists())      backup.drive    = dr.data();
      if (site.exists())    backup.site     = site.data();
      if (contact.exists()) backup.contact  = contact.data();

      // Collections
      for (const col of cols) {
        const snap = await getDocs(collection(db, col));
        backup[col] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }

      const totalDocs = cols.reduce((n, c) => n + (backup[c]?.length || 0), 0);
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `GNC_Backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();

      setBackupMeta({ date: new Date().toLocaleString('en-IN'), docs: totalDocs, cols: cols.length });
      toast.success('✅ Backup downloaded!');
      logAct?.('add', 'Full backup created', 'backup');
    } catch (e) {
      toast.error(e.message);
    }
    setLoading(false);
  };

  // ── Restore from backup ───────────────────────────────────────────────────
  const handleRestore = async () => {
    if (!restoreFile || !window.confirm('⚠️ This will ERASE ALL data. Are you 100% sure?')) return;
    setLoading(true);
    try {
      const text = await restoreFile.text();
      const data = JSON.parse(text);
      const cols = [
        'notices', 'announcements', 'events', 'gallery', 'pdfReports',
        'pages', 'faculties', 'placements', 'sliderSlides', 'alerts',
      ];

      for (const col of cols) {
        if (!data[col]) continue;
        const existing = await getDocs(collection(db, col));
        const b1 = writeBatch(db);
        existing.forEach(d => b1.delete(d.ref));
        await b1.commit();
        const b2 = writeBatch(db);
        data[col].forEach(({ id, ...d }) => b2.set(doc(collection(db, col)), d));
        await b2.commit();
      }

      if (data.navbar)   await setDoc(doc(db, 'settings', 'navbar'),   data.navbar);
      if (data.youtube)  await setDoc(doc(db, 'settings', 'youtube'),  data.youtube);
      if (data.drive)    await setDoc(doc(db, 'settings', 'drive'),    data.drive);
      if (data.site)     await setDoc(doc(db, 'settings', 'site'),     data.site);
      if (data.contact)  await setDoc(doc(db, 'settings', 'contact'),  data.contact);

      toast.success('✅ Database restored successfully!');
      logAct?.('update', 'Full restore from backup', 'backup');
      setRestoreFile(null);
      if (fileRef.current) fileRef.current.value = '';
    } catch (e) {
      toast.error('Restore failed: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="fade-up">
      <p className="asec">💾 Backup & Restore</p>
      <p className="asub">Full database export/import — Firestore settings included</p>

      {/* ── Download Backup ── */}
      <div className="card" style={{ borderTop: `3px solid ${T.green}` }}>
        <div className="actitle">⬇️ Download Full Backup</div>
        <p style={{ color: T.t2, marginBottom: 16, fontSize: 14, lineHeight: 1.7 }}>
          Includes: notices, announcements, events, gallery, pdfReports, pages,
          faculties, placements, sliderSlides, alerts + all settings (navbar, youtube, drive, site, contact)
        </p>

        {backupMeta && (
          <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13 }}>
            <strong style={{ color: '#166534' }}>✅ Last backup:</strong>
            <span style={{ color: '#166534', marginLeft: 8 }}>{backupMeta.date} — {backupMeta.docs} documents across {backupMeta.cols} collections</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="abtn abtn-green" onClick={handleBackup} disabled={loading}>
            {loading ? '⏳ Preparing...' : '⬇️ Download JSON Backup'}
          </button>
          <span style={{ fontSize: 12, color: T.t3 }}>File: GNC_Backup_YYYY-MM-DD.json</span>
        </div>
      </div>

      {/* ── Restore ── */}
      <div className="card" style={{ borderTop: `3px solid ${T.red}` }}>
        <div className="actitle" style={{ color: T.red }}>🔥 Restore from Backup</div>

        <div style={{
          background: '#fee2e2', border: '1.5px solid #fecaca',
          borderRadius: 12, padding: '14px 18px', marginBottom: 20,
        }}>
          <div style={{ fontWeight: 900, color: T.red, marginBottom: 6 }}>⚠️ DANGER ZONE</div>
          <p style={{ color: '#b91c1c', margin: 0, fontSize: 13, lineHeight: 1.6 }}>
            This will <strong>COMPLETELY ERASE</strong> all current data and replace with backup file contents.
            This action <strong>cannot be undone</strong>. Make sure you have a fresh backup before restoring.
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label className="alabel">Select JSON Backup File</label>
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            className="ainp"
            onChange={e => setRestoreFile(e.target.files[0])}
          />
          {restoreFile && (
            <div style={{ fontSize: 12, color: T.t3, marginTop: 6 }}>
              Selected: <strong>{restoreFile.name}</strong> ({(restoreFile.size / 1024).toFixed(1)} KB)
            </div>
          )}
        </div>

        <button
          className="abtn abtn-red"
          style={{ background: T.red, color: '#fff', border: 'none' }}
          onClick={handleRestore}
          disabled={loading || !restoreFile}>
          {loading ? '⏳ Restoring...' : '🔥 Restore Database'}
        </button>
      </div>

      {/* ── Backup tips ── */}
      <div style={{ background: '#fffbeb', border: '1.5px solid #fcd34d', borderRadius: 12, padding: '16px 20px' }}>
        <div style={{ fontWeight: 800, color: '#92400e', marginBottom: 10, fontSize: 14 }}>💡 Best Practices</div>
        <ul style={{ margin: 0, padding: '0 0 0 18px', color: '#78350f', fontSize: 13, lineHeight: 1.9 }}>
          <li>Har bade update se pehle ek fresh backup download karein</li>
          <li>Backup files safe jagah store karein — Google Drive ya local folder</li>
          <li>Restore sirf emergency mein use karein — data permanently erase ho jaata hai</li>
          <li>Backup file ko manually edit na karein — corrupt JSON restore fail kar sakta hai</li>
        </ul>
      </div>
    </div>
  );
}
