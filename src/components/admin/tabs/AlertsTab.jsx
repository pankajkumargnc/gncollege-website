// src/components/admin/tabs/AlertsTab.jsx
import { useState } from 'react';
import { db } from '../../../firebase'; // ✅ FIXED: Teen folder peechhe
import { collection, addDoc, updateDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD, WHITE, BG, useLocalDraft, Toggle, SectionSearch, BulkBar, MiniLog } from '../AdminShared';

export default function AlertsTab({ alerts, logAct, getSectionLog, softDelete, bulkDelete }) {
  const [editAlert, setEditAlert] = useState(null);
  const [alertData, setAlertData, clearAlertDraft] = useLocalDraft('alert', { text: '', isActive: true, type: 'urgent' });
  const [alertSearch, setAlertSearch] = useState('');
  const [alertSel, setAlertSel] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleAlertSel = id => setAlertSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const saveAlert = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (editAlert) await updateDoc(doc(db, 'alerts', editAlert.id), { ...alertData, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'alerts'), { ...alertData, createdAt: serverTimestamp() });
      toast.success(editAlert ? 'Alert updated!' : '🚨 Alert live!');
      logAct(editAlert ? 'update' : 'add', `Alert: ${alertData.text.substring(0, 40)}`, 'alerts');
      setEditAlert(null); clearAlertDraft();
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const toggleAlert = async (a) => {
    try {
      const newStatus = !a.isActive;
      await updateDoc(doc(db, 'alerts', a.id), { 
        isActive: newStatus,
        updatedAt: serverTimestamp()
      });
      toast.success(newStatus ? '🔴 Alert is LIVE!' : 'Alert turned OFF');
      logAct('update', `Alert ${newStatus ? 'activated' : 'deactivated'}: ${a.text?.substring(0,30)}`, 'alerts');
    } catch (err) {
      toast.error('Toggle failed: ' + err.message);
    }
  };

  const filtered = (alerts || []).filter(a => !alertSearch || a.text?.toLowerCase().includes(alertSearch.toLowerCase()));

  return (
    <div className="fade-up">
      <p className="asec">🚨 Flash Alert Manager</p>
      <p className="asub">Scrolling banner + popup — sirf toggle karein ON/OFF</p>

      <div className="card-gold">
        <div className="actitle">{editAlert ? '✏️ Edit Alert' : '➕ Create Alert'}</div>
        <form onSubmit={saveAlert}>
          <div style={{ marginBottom: 14 }}>
            <label className="alabel">Alert Message *</label>
            <textarea className="ainp" rows={3} value={alertData.text || ''} onChange={(e) => setAlertData(d => ({...d, text: e.target.value}))} required placeholder="College will remain closed tomorrow due to holiday..." />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20, padding: '14px 18px', background: BG, borderRadius: 12, flexWrap: 'wrap' }}>
            <Toggle checked={!!alertData.isActive} onChange={() => setAlertData(d => ({...d, isActive: !d.isActive}))} label={alertData.isActive ? '🔴 LIVE — visible to everyone' : '⚪ OFF — hidden'} color={T.red} />
            <div style={{ height: 32, width: 1, background: T.b1 }} />
            <div>
              <label className="alabel">Alert Type</label>
              <select className="ainp" style={{ marginTop: 0 }} value={alertData.type || 'urgent'} onChange={(e) => setAlertData(d => ({...d, type: e.target.value}))}>
                {['urgent','holiday','exam','admission','event'].map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editAlert ? 'Update' : 'Publish'}</button>
            {editAlert && <button type="button" className="abtn abtn-outline" onClick={() => { setEditAlert(null); clearAlertDraft(); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <SectionSearch value={alertSearch} onChange={setAlertSearch} placeholder="Search alerts..." />
      <BulkBar count={alertSel.length} onDelete={() => { bulkDelete('alerts', alertSel); setAlertSel([]); }} onClear={() => setAlertSel([])} />

      <div className="card">
        <div className="actitle">All Alerts ({filtered.length})</div>
        {filtered.map(a => (
          <div key={a.id} className={`arow ${alertSel.includes(a.id) ? 'selected' : ''}`} style={{ borderLeft: `4px solid ${a.isActive ? T.red : T.b2}` }}>
            <input type="checkbox" checked={alertSel.includes(a.id)} onChange={() => toggleAlertSel(a.id)} style={{ width: 16, height: 16, accentColor: NAVY }} />
            <div style={{ flex: 1 }}>
              <span 
                className="abadge" 
                onClick={() => toggleAlert(a)}
                style={{ 
                  background: a.isActive ? '#fee2e2' : BG, 
                  color: a.isActive ? T.red : T.t3, 
                  marginBottom: 5,
                  cursor: 'pointer' 
                }}
              >
                {a.isActive ? '🔴 LIVE' : '⚪ OFF'}
              </span>
              <div style={{ fontWeight: 700, color: NAVY, fontSize: 14, marginTop: 3 }}>{a.text}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Toggle checked={a.isActive} onChange={() => toggleAlert(a)} />
              <button className="abtn abtn-outline abtn-sm" onClick={() => { setEditAlert(a); setAlertData({ text: a.text, isActive: a.isActive, type: a.type||'urgent' }); window.scrollTo({top:0,behavior:'smooth'}); }}>✏️</button>
              <button className="abtn abtn-red abtn-sm" onClick={() => softDelete('alerts', a.id, a, a.text?.substring(0,30))}>🗑️</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign:'center', padding: '30px 0', color: T.t4 }}>Koi alert nahi mila</div>}
      </div>
      <MiniLog logs={getSectionLog('alerts')} />
    </div>
  );
}
