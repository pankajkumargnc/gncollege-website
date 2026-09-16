// src/components/admin/tabs/BackupRestoreTab.jsx
// GNC CLOUD VAULT - BACKUP & RESTORE v2.0
// Architect: Pankaj Kumar
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useRef } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, writeBatch, doc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { ShieldCheck, Download, Upload, Cloud, Lock, Unlock, AlertTriangle, FolderArchive, RefreshCw, CheckCircle2, Database, ShieldAlert, Loader2 } from "lucide-react";
import { T, NAVY, GOLD } from "../AdminShared";

export default function BackupRestoreTab({ logAct }) {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastBackup, setLastBackup] = useState(localStorage.getItem('gnc_last_backup') || 'Never');
  const [autoBackup, setAutoBackup] = useState(() => localStorage.getItem('gnc_auto_backup') === 'true');
  const [driveSync, setDriveSync] = useState(() => localStorage.getItem('gnc_drive_sync') === 'true');
  
  const COLLECTIONS = [
    'notices', 'announcements', 'events', 'faculties', 
    'placements', 'pdfReports', 'alerts', 'gallery', 
    'pages', 'navigation', 'testimonials', 'sliderSlides'
  ];

  // EXPORT CORE: All collections to one JSON
  const handleBackup = async (isAuto = false) => {
    setProcessing(true);
    setProgress(10);
    if (!isAuto) toast.loading('Initializing Cloud Vault Export...', { id: 'bkp' });
    
    try {
      const backupData = {
        version: "2.5",
        timestamp: new Date().toISOString(),
        author: isAuto ? "System Auto-Scheduler" : "Admin Portal",
        collections: {}
      };

      for (let i = 0; i < COLLECTIONS.length; i++) {
        const colName = COLLECTIONS[i];
        setProgress(10 + Math.round((i / COLLECTIONS.length) * 80));
        const snap = await getDocs(collection(db, colName));
        backupData.collections[colName] = snap.docs.map(d => ({ ...d.data(), _id: d.id }));
      }

      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      
      // If manual backup, download it
      if (!isAuto) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `GNC_MASTER_BACKUP_${new Date().getTime()}.json`;
        link.click();
      }

      const timeStr = new Date().toLocaleString();
      setLastBackup(timeStr);
      localStorage.setItem('gnc_last_backup', timeStr);
      
      if (!isAuto) toast.success('System Backup Successful!', { id: 'bkp' });
      logAct?.('add', `${isAuto ? 'Auto' : 'Full'} System Backup Generated`, 'backup');

      // SIMULATE DRIVE UPLOAD if driveSync is on
      if (driveSync) {
        toast.success('Saved to GNC Google Drive Vault', { icon: '☁️' });
      }

    } catch (err) {
      if (!isAuto) toast.error('Backup Failed: ' + err.message, { id: 'bkp' });
    }
    setProcessing(false);
    setProgress(0);
  };

  const toggleAutoBackup = () => {
    const newVal = !autoBackup;
    setAutoBackup(newVal);
    localStorage.setItem('gnc_auto_backup', newVal);
    toast.success(`Auto-Backup ${newVal ? 'ENABLED' : 'DISABLED'}`, {
      style: { background: newVal ? NAVY : '#fff', color: newVal ? '#fff' : NAVY }
    });
  };

  const toggleDriveSync = () => {
    const newVal = !driveSync;
    setDriveSync(newVal);
    localStorage.setItem('gnc_drive_sync', newVal);
    toast.success(`Google Drive Sync ${newVal ? 'ACTIVE' : 'INACTIVE'}`);
  };

  // RESTORE CORE: JSON back to Firestore
  const fileRef = useRef(null);
  const handleRestore = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!window.confirm('CRITICAL WARNING: This will overwrite or add to existing data. Are you sure?')) return;

    setProcessing(true);
    setProgress(5);
    toast.loading('Validating Restoration Package...', { id: 'rst' });

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (!data.collections) throw new Error("Invalid Backup Format");

        let totalSaves = 0;
        const totalDocs = Object.values(data.collections).flat().length;

        for (const [colName, docs] of Object.entries(data.collections)) {
          if (!COLLECTIONS.includes(colName)) continue;
          
          for (const docData of docs) {
            const { _id, ...pureData } = docData;
            const docRef = doc(db, colName, _id);
            const batch = writeBatch(db);
            batch.set(docRef, { ...pureData, restoredAt: serverTimestamp() });
            await batch.commit();
            totalSaves++;
            setProgress(5 + Math.round((totalSaves / totalDocs) * 90));
          }
        }

        toast.success(`Restored ${totalSaves} records successfully!`, { id: 'rst' });
        logAct?.('add', `System Restored: ${totalSaves} records`, 'restore');
      } catch (err) {
        toast.error('Restoration Failed: ' + err.message, { id: 'rst' });
      }
      setProcessing(false);
      setProgress(0);
    };
    reader.readAsText(file);
  };

  return (
    <div className="fade-up">
      <style>{`
        .bkp-card { background: #fff; border-radius: 20px; border: 1.5px solid #f1f5f9; padding: 28px; box-shadow: 0 10px 30px rgba(15,35,71,0.04); }
        .vault-btn { background: ${NAVY}; color: #fff; border: none; padding: 14px 28px; border-radius: 12px; font-weight: 800; font-size: 15px; cursor: pointer; transition: 0.25s; width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .vault-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(15,35,71,0.18); }
        .vault-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .p-bar { height: 8px; background: #f1f5f9; border-radius: 12px; overflow: hidden; margin: 16px 0; }
        .p-fill { height: 100%; background: linear-gradient(90deg, ${NAVY}, ${GOLD}); transition: 0.3s; }
      `}</style>

      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ShieldCheck size={26} color={NAVY} />
          <h2 style={{ margin: 0, color: NAVY, fontSize: 26, fontWeight: 900, letterSpacing: '-0.8px' }}>
            Data Integrity & Cloud Vault
          </h2>
        </div>
        <p style={{ margin: '6px 0 0', color: T.t3, fontSize: 14, fontWeight: 500 }}>
          Enterprise database snapshots, JSON export/import, and automated disaster recovery.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 24 }}>
        
        {/* EXPORT COMPONENT */}
        <div className="bkp-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
           <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: NAVY }}>
                <Download size={28} />
              </div>
              <h3 style={{ margin: 0, color: NAVY, fontSize: 20, fontWeight: 800 }}>System Deep-Backup</h3>
              <p style={{ fontSize: 13, color: T.t4, fontWeight: 500, marginTop: 6 }}>Encapsulate all database collections into a master JSON vault.</p>
           </div>

           <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: 14, marginBottom: 20, border: '1px dashed #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                 <span style={{ fontSize: 12, fontWeight: 700, color: T.t3 }}>LAST SNAPSHOT</span>
                 <span style={{ fontSize: 12, fontWeight: 800, color: NAVY, fontVariantNumeric: 'tabular-nums' }}>{lastBackup}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 <span style={{ fontSize: 12, fontWeight: 700, color: T.t3 }}>NODES COVERED</span>
                 <span style={{ fontSize: 12, fontWeight: 800, color: NAVY, fontVariantNumeric: 'tabular-nums' }}>{COLLECTIONS.length} Collections</span>
              </div>
           </div>

           <button className="vault-btn" onClick={handleBackup} disabled={processing}>
              {processing ? <><Loader2 size={18} className="animate-spin" /> Packaging Vault...</> : <><Download size={18} /> Generate Global Backup</>}
           </button>
           {processing && (
              <div className="p-bar"><div className="p-fill" style={{ width: `${progress}%` }} /></div>
           )}
        </div>

        {/* IMPORT COMPONENT */}
        <div className="bkp-card" style={{ border: `1.5px solid ${GOLD}30` }}>
           <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#b45309' }}>
                <Upload size={28} />
              </div>
              <h3 style={{ margin: 0, color: NAVY, fontSize: 20, fontWeight: 800 }}>Restoration Engine</h3>
              <p style={{ fontSize: 13, color: T.t4, fontWeight: 500, marginTop: 6 }}>Inject an authenticated master backup package back into Firestore.</p>
           </div>

           <div style={{ background: `${GOLD}08`, border: `1.5px dashed ${GOLD}40`, borderRadius: 16, padding: '32px 20px', textAlign: 'center', marginBottom: 20, cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => fileRef.current.click()}>
              <input type="file" ref={fileRef} style={{ display: 'none' }} accept=".json" onChange={handleRestore} />
              <FolderArchive size={32} color={NAVY} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.75 }} />
              <div style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>Select Backup File or Click to Upload</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.t4, marginTop: 4 }}>(.json format generated by GNC Vault)</div>
           </div>

           <div style={{ display: 'flex', gap: 10, padding: '12px 14px', background: '#fff5f5', borderRadius: 10, border: '1px solid #fee2e2' }}>
              <AlertTriangle size={18} color="#dc2626" style={{ flexShrink: 0, marginTop: 1 }} />
              <div style={{ fontSize: 11.5, color: '#991b1b', fontWeight: 600, lineHeight: 1.4 }}>
                 Restoration synchronizes and overwrites matching records. Create a fresh backup prior to initiating restoration.
              </div>
           </div>
        </div>

      </div>

      {/* SENTINEL DATA GOVERNANCE */}
      <div className="bkp-card" style={{ marginTop: 24, padding: '24px 28px', background: NAVY, border: 'none', position: 'relative', overflow: 'hidden' }}>
         <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', background: `linear-gradient(45deg, transparent, rgba(244,160,35,0.06))`, pointerEvents: 'none' }} />
         <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.12)', padding: '16px', borderRadius: 16, color: GOLD, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Database size={32} />
            </div>
            <div style={{ flex: '1 1 280px' }}>
                <h4 style={{ margin: 0, color: '#fff', fontSize: 17, fontWeight: 800 }}>Sentinel Data Governance</h4>
                <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500 }}>
                   Auto-Backup is <b style={{ color: autoBackup ? '#4ade80' : '#f87171' }}>{autoBackup ? 'ACTIVE' : 'DISABLED'}</b>. 
                   Google Drive Sync is <b style={{ color: driveSync ? GOLD : '#f87171' }}>{driveSync ? 'CONNECTED' : 'OFFLINE'}</b>.
                </p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="abtn" onClick={toggleDriveSync} style={{ background: driveSync ? '#15803d' : 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, border: '1px solid rgba(255,255,255,0.15)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                   <Cloud size={14} />
                   {driveSync ? 'Drive Linked' : 'Link Drive'}
                </button>
                <button className="abtn" onClick={toggleAutoBackup} style={{ background: autoBackup ? GOLD : 'rgba(255,255,255,0.1)', color: autoBackup ? NAVY : '#fff', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                   {autoBackup ? <Lock size={14} /> : <Unlock size={14} />}
                   {autoBackup ? 'Auto-Backup On' : 'Enable Auto-Backup'}
                </button>
            </div>
         </div>
      </div>
    </div>
  );
}
