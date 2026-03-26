// ═══════════════════════════════════════════════════════════════════════════════
// DriveTab — ☁️ Google Drive Sync configuration + file preview
// ═══════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import { db } from "../../../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD } from '../AdminShared';

export default function DriveTab({ logAct }) {
  const [driveCfg, setDriveCfg]     = useState({ apiKey: '', folderId: '', folderName: '' });
  const [driveTest, setDriveTest]   = useState(null);
  const [driveFiles, setDriveFiles] = useState([]);
  const [driveLoading, setDriveLoading] = useState(false);
  const [loading, setLoading]       = useState(false);

  useEffect(() => {
    getDoc(doc(db, 'settings', 'drive'))
      .then(s => s.exists() && setDriveCfg(prev => ({ ...prev, ...s.data() })))
      .catch(() => {});
  }, []);

  const saveDrive = async e => {
    e.preventDefault(); setLoading(true);
    try {
      await setDoc(doc(db, 'settings', 'drive'), { ...driveCfg, updatedAt: serverTimestamp() });
      toast.success('Drive config saved!');
      logAct?.('update', 'Drive config updated', 'settings');
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const testDrive = async () => {
    setDriveLoading(true); setDriveTest(null); setDriveFiles([]);
    try {
      const r = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${driveCfg.folderId}'+in+parents+and+mimeType='application/pdf'&key=${driveCfg.apiKey}&fields=files(id,name,createdTime,size)`
      );
      const d = await r.json();
      if (d.error) throw new Error(d.error.message);
      setDriveFiles(d.files || []);
      setDriveTest({ ok: true, msg: `✅ ${d.files?.length || 0} PDFs found in folder` });
    } catch (e) { setDriveTest({ ok: false, msg: `❌ ${e.message}` }); }
    setDriveLoading(false);
  };

  return (
    <div className="fade-up">
      <p className="asec">☁️ Google Drive Sync</p>
      <p className="asub">Drive folder → Website auto documents sync</p>

      <div className="card-navy">
        <div className="actitle">🔑 Drive API Configuration</div>

        {/* Setup guide */}
        <div style={{
          background: `${NAVY}0a`, border: `1.5px solid ${NAVY}25`,
          borderRadius: 12, padding: '14px 18px', marginBottom: 20
        }}>
          <ol style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, color: T.t2, lineHeight: 2 }}>
            <li>Google Cloud Console → Enable <strong>Google Drive API</strong></li>
            <li>Existing YouTube API key use ho sakta hai (same project)</li>
            <li>Drive folder banao → Share → <strong>"Anyone with link can view"</strong></li>
            <li>Folder ID: drive.google.com/drive/folders/<strong>1BxxxxxFolderID</strong></li>
          </ol>
        </div>

        <form onSubmit={saveDrive}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, marginBottom: 14 }}>
            <div>
              <label className="alabel">Google API Key *</label>
              <input className="ainp" value={driveCfg.apiKey}
                onChange={e => setDriveCfg(d => ({ ...d, apiKey: e.target.value }))}
                placeholder="AIzaSyxxxxxxxxx" type="password" />
            </div>
            <div>
              <label className="alabel">Folder ID *</label>
              <input className="ainp" value={driveCfg.folderId}
                onChange={e => setDriveCfg(d => ({ ...d, folderId: e.target.value }))}
                placeholder="1BxxxxxxxxxxxxxFolderID" />
            </div>
            <div>
              <label className="alabel">Folder Display Name</label>
              <input className="ainp" value={driveCfg.folderName}
                onChange={e => setDriveCfg(d => ({ ...d, folderName: e.target.value }))}
                placeholder="GNC Documents 2024" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="submit" className="abtn abtn-navy" disabled={loading}>
              💾 Save Config
            </button>
            <button type="button" className="abtn abtn-gold"
              disabled={driveLoading || !driveCfg.apiKey} onClick={testDrive}>
              {driveLoading ? '⏳ Testing…' : '🧪 Preview Files'}
            </button>
          </div>
        </form>

        {driveTest && (
          <div style={{
            marginTop: 14, padding: '12px 16px', borderRadius: 10,
            background: driveTest.ok ? '#dcfce7' : '#fee2e2',
            color: driveTest.ok ? T.green : T.red, fontWeight: 700
          }}>
            {driveTest.msg}
          </div>
        )}
      </div>

      {/* File list preview */}
      {driveFiles.length > 0 && (
        <div className="card">
          <div className="actitle">📄 Files in Drive Folder ({driveFiles.length})</div>
          {driveFiles.map(f => (
            <div key={f.id} className="arow">
              <span style={{ fontSize: 22 }}>📄</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: NAVY }}>{f.name}</div>
                <div style={{ fontSize: 12, color: T.t3 }}>
                  {f.createdTime ? new Date(f.createdTime).toLocaleDateString() : ''}
                  {f.size ? ` • ${(f.size / 1024).toFixed(0)} KB` : ''}
                </div>
              </div>
              <a href={`https://drive.google.com/file/d/${f.id}/view`}
                target="_blank" rel="noreferrer"
                className="abtn abtn-outline abtn-sm">📥 View</a>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="card">
        <div className="actitle">ℹ️ How Drive Sync Works</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {[
            { icon: '📁', title: 'Folder Based', desc: 'All PDFs in the shared Drive folder appear automatically on your website.' },
            { icon: '🔄', title: 'Live Sync', desc: 'Add files to Drive → they instantly appear on /notifications page.' },
            { icon: '🔒', title: 'Read-only Access', desc: 'API key only reads files. Cannot modify or delete Drive contents.' },
          ].map(item => (
            <div key={item.icon} style={{
              background: `${NAVY}06`, border: `1px solid ${NAVY}12`,
              borderRadius: 12, padding: '14px 16px'
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 800, color: NAVY, fontSize: 13, marginBottom: 5 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: T.t3, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
