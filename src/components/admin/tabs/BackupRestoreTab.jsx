// src/components/admin/tabs/BackupRestoreTab.jsx
// 🛡️ GNC CLOUD VAULT - BACKUP & RESTORE v2.0 (Ultra Pro Advance)
// 👑 Architect: Pankaj Kumar
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useRef } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, writeBatch, doc, serverTimestamp, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { T, NAVY, GOLD } from "../AdminShared";

export default function BackupRestoreTab({ logAct }) {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastBackup, setLastBackup] = useState(localStorage.getItem('gnc_last_backup') || 'Never');
  
  const COLLECTIONS = [
    'notices', 'announcements', 'events', 'faculties', 
    'placements', 'pdfReports', 'alerts', 'gallery', 
    'pages', 'navigation', 'testimonials', 'sliderSlides'
  ];

  // 🏛️ EXPORT CORE: All collections to one JSON
  const handleBackup = async () => {
    setProcessing(true);
    setProgress(10);
    toast.loading('Initializing Cloud Vault Export...', { id: 'bkp' });
    
    try {
      const backupData = {
        version: "2.0",
        timestamp: new Date().toISOString(),
        author: "Admin Portal",
        collections: {}
      };

      for (let i = 0; i < COLLECTIONS.length; i++) {
        const colName = COLLECTIONS[i];
        setProgress(10 + Math.round((i / COLLECTIONS.length) * 80));
        const snap = await getDocs(collection(db, colName));
        backupData.collections[colName] = snap.docs.map(d => ({ ...d.data(), _id: d.id }));
      }

      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `GNC_MASTER_BACKUP_${new Date().getTime()}.json`;
      link.click();

      const timeStr = new Date().toLocaleString();
      setLastBackup(timeStr);
      localStorage.setItem('gnc_last_backup', timeStr);
      
      toast.success('System Backup Successful!', { id: 'bkp' });
      logAct?.('add', 'Full System Backup Generated', 'backup');
    } catch (err) {
      toast.error('Backup Failed: ' + err.message, { id: 'bkp' });
    }
    setProcessing(false);
    setProgress(0);
  };

  // 🧬 RESTORE CORE: JSON back to Firestore
  const fileRef = useRef(null);
  const handleRestore = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!window.confirm('⚠️ CRITICAL WARNING: This will overwrite or add to existing data. Are you sure?')) return;

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
        .bkp-card { background: #fff; border-radius: 24px; border: 1.5px solid #f1f5f9; padding: 32px; box-shadow: 0 15px 40px rgba(15,35,71,0.05); }
        .vault-btn { background: ${NAVY}; color: #fff; border: none; padding: 18px 40px; border-radius: 16px; font-weight: 900; fontSize: 16px; cursor: pointer; transition: 0.3s; width: 100%; display: flex; align-items: center; justify-content: center; gap: 12px; }
        .vault-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(15,35,71,0.2); }
        .vault-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .p-bar { height: 10px; background: #f1f5f9; border-radius: 20px; overflow: hidden; margin: 20px 0; }
        .p-fill { height: 100%; background: linear-gradient(90deg, ${NAVY}, ${GOLD}); transition: 0.3s; }
      `}</style>

      <div style={{ marginBottom: 40 }}>
        <h2 style={{ margin: 0, color: NAVY, fontSize: 32, fontWeight: 900, letterSpacing: '-1.5px' }}>🛡️ Data Integrity & Cloud Vault</h2>
        <p style={{ margin: '8px 0 0', color: T.t3, fontSize: 15, fontWeight: 600 }}>Manage infinite snapshots and ultra-secure system restoration.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: 32 }}>
        
        {/* EXPORT COMPONENT */}
        <div className="bkp-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
           <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>📤</div>
              <h3 style={{ margin: 0, color: NAVY, fontSize: 22, fontWeight: 900 }}>System Deep-Backup</h3>
              <p style={{ fontSize: 13, color: T.t4, fontWeight: 700, marginTop: 8 }}>Encapsulate all database nodes into a master JSON vault.</p>
           </div>

           <div style={{ background: '#f8fafc', padding: '20px', borderRadius: 16, marginBottom: 24, border: '1px dashed #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                 <span style={{ fontSize: 12, fontWeight: 800, color: T.t3 }}>LAST SNAPSHOT</span>
                 <span style={{ fontSize: 12, fontWeight: 900, color: NAVY }}>{lastBackup}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 <span style={{ fontSize: 12, fontWeight: 800, color: T.t3 }}>NODES COVERED</span>
                 <span style={{ fontSize: 12, fontWeight: 900, color: NAVY }}>{COLLECTIONS.length} Collections</span>
              </div>
           </div>

           <button className="vault-btn" onClick={handleBackup} disabled={processing}>
              {processing ? '⚙️ PACKAGING VAULT...' : '🏛️ Generate Global Backup'}
           </button>
           {processing && (
              <div className="p-bar"><div className="p-fill" style={{ width: `${progress}%` }} /></div>
           )}
        </div>

        {/* IMPORT COMPONENT */}
        <div className="bkp-card" style={{ border: `2px solid ${GOLD}15` }}>
           <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>📥</div>
              <h3 style={{ margin: 0, color: NAVY, fontSize: 22, fontWeight: 900 }}>Ultra Restoration Engine</h3>
              <p style={{ fontSize: 13, color: T.t4, fontWeight: 700, marginTop: 8 }}>Inject a master package back into the system grid.</p>
           </div>

           <div style={{ background: `${GOLD}08`, border: `1.5px dashed ${GOLD}30`, borderRadius: 20, padding: '40px 20px', textAlign: 'center', marginBottom: 24, cursor: 'pointer' }} onClick={() => fileRef.current.click()}>
              <input type="file" ref={fileRef} style={{ display: 'none' }} accept=".json" onChange={handleRestore} />
              <div style={{ fontSize: 32, marginBottom: 10 }}>📂</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>Drop Backup File or Click to Upload</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.t4, marginTop: 4 }}>(.json format generated by GNC Vault)</div>
           </div>

           <div style={{ display: 'flex', gap: 12, padding: '12px 16px', background: '#fff5f5', borderRadius: 12, border: '1px solid #fee2e2' }}>
              <div style={{ fontSize: 18 }}>⚠️</div>
              <div style={{ fontSize: 11, color: '#991b1b', fontWeight: 700, lineHeight: 1.4 }}>
                 Restoration is a destructive process. It is highly recommended to perform a backup of the current state before initiating.
              </div>
           </div>
        </div>

      </div>

      {/* ADDITIONAL ANALYTICS */}
      <div className="bkp-card" style={{ marginTop: 32, padding: 24, background: NAVY, border: 'none' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: 20, fontSize: 40 }}>🏰</div>
            <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, color: '#fff', fontSize: 18, fontWeight: 900 }}>Sentinel Data Governance</h4>
                <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600 }}>
                   Your campus data is encrypted and partitioned for maximum safety. Automate these backups to external storage for absolute redundancy.
                </p>
            </div>
            <button className="abtn" style={{ background: GOLD, color: NAVY, fontWeight: 900 }}>🔒 Configure Auto-Backup</button>
         </div>
      </div>
    </div>
  );
}
