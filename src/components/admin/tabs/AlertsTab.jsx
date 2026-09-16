// src/components/admin/tabs/AlertsTab.jsx
import { useState } from 'react';
import { db } from '../../../firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { AlertTriangle, Radio, Sparkles, Edit2, Trash2, Send, Search, X } from 'lucide-react';
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
      toast.success(editAlert ? 'Alert updated!' : 'Alert broadcast live!');
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
      toast.success(newStatus ? 'Alert activated live!' : 'Alert turned off');
      logAct('update', `Alert ${newStatus ? 'activated' : 'deactivated'}: ${a.text?.substring(0,30)}`, 'alerts');
    } catch (err) {
      toast.error('Toggle failed: ' + err.message);
    }
  };

  const filtered = (alerts || []).filter(a => !alertSearch || a.text?.toLowerCase().includes(alertSearch.toLowerCase()));

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <AlertTriangle size={26} color={GOLD} />
          <h2 style={{ margin: 0, color: NAVY, fontSize: 28, fontWeight: 900, letterSpacing: '-1px' }}>Flash Alert Manager</h2>
        </div>
        <p style={{ margin: '4px 0 0', color: T.t3, fontSize: 15, fontWeight: 600 }}>Emergency scrolling banner and site-wide notification broadcast center</p>
      </div>

      <div className="card-gold" style={{ border: `1.5px solid ${GOLD}44`, boxShadow: `0 20px 40px ${GOLD}10` }}>
        <div className="actitle" style={{ fontSize: 17, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={18} color={GOLD} />
          <span>{editAlert ? 'Update Live Flash Alert' : 'Create New Flash Alert'}</span>
        </div>
        <form onSubmit={saveAlert}>
          <div style={{ marginBottom: 18 }}>
            <label className="alabel">Alert Message *</label>
            <textarea className="ainp" rows={3} style={{ borderRadius: 14, background: '#f8fafc', border: `1.5px solid #edf2f7` }} value={alertData.text || ''} onChange={(e) => setAlertData(d => ({...d, text: e.target.value}))} required placeholder="College will remain closed tomorrow due to official holiday..." />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: '16px 18px', background: '#f8fafc', borderRadius: 16, border: '1.5px solid #edf2f7', flexWrap: 'wrap' }}>
            <div style={{ flexShrink: 0 }}>
              <Toggle checked={!!alertData.isActive} onChange={() => setAlertData(d => ({...d, isActive: !d.isActive}))} label={alertData.isActive ? 'SIGNAL ACTIVE' : 'SIGNAL OFF'} color={T.red} />
            </div>
            <div style={{ flex: '1 1 180px', minWidth: 160 }}>
              <label className="alabel">Notification Type</label>
              <select className="ainp" style={{ marginTop: 0, borderRadius: 10 }} value={alertData.type || 'urgent'} onChange={(e) => setAlertData(d => ({...d, type: e.target.value}))}>
                {['urgent','holiday','exam','admission','event'].map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)} Notification</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button type="submit" className="abtn abtn-gold" style={{ height: 48, padding: '0 28px', flex: '1 1 auto', minWidth: 180, justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: 8 }} disabled={loading}>
              <Send size={16} />
              {editAlert ? 'Save & Sync Updates' : 'Broadcast Live Now'}
            </button>
            {editAlert && (
              <button type="button" className="abtn abtn-outline" style={{ height: 48, flex: '1 1 auto', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: 8 }} onClick={() => { setEditAlert(null); clearAlertDraft(); }}>
                <X size={16} /> Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{ marginTop: 40 }}>
        <SectionSearch value={alertSearch} onChange={setAlertSearch} placeholder="Search through broadcast history..." />
        <BulkBar count={alertSel.length} onDelete={() => { bulkDelete('alerts', alertSel); setAlertSel([]); }} onClear={() => setAlertSel([])} />

        <div className="card" style={{ border: '1.5px solid #f1f5f9' }}>
          <div className="actitle" style={{ fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Live & Historical Alerts</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.t3, fontVariantNumeric: 'tabular-nums' }}>{filtered.length} entries</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(a => (
              <div key={a.id} className={`arow ${alertSel.includes(a.id) ? 'selected' : ''}`} 
                style={{ 
                    borderLeft: `5px solid ${a.isActive ? T.red : '#cbd5e1'}`,
                    padding: '20px 24px',
                    borderRadius: 16
                }}>
                <input type="checkbox" checked={alertSel.includes(a.id)} onChange={() => toggleAlertSel(a.id)} style={{ width: 18, height: 18, accentColor: NAVY, cursor: 'pointer' }} />
                <div style={{ flex: 1, padding: '0 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span 
                        className="abadge" 
                        onClick={() => toggleAlert(a)}
                        style={{ 
                            background: a.isActive ? '#fee2e2' : '#f1f5f9', 
                            color: a.isActive ? T.red : '#64748b', 
                            cursor: 'pointer',
                            fontSize: 10,
                            padding: '4px 10px',
                            borderRadius: 8,
                            fontWeight: 800,
                            letterSpacing: '0.04em'
                        }}
                    >
                        {a.isActive ? 'LIVE BROADCAST' : 'STANDBY'}
                    </span>
                    <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Type: {a.type || 'General'}</span>
                  </div>
                  <div style={{ fontWeight: 800, color: NAVY, fontSize: 15, lineHeight: 1.5 }}>{a.text}</div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <button className="abtn abtn-outline abtn-sm" style={{ padding: '8px 12px', display: 'inline-flex', alignItems: 'center', gap: 6 }} onClick={() => { setEditAlert(a); setAlertData({ text: a.text, isActive: a.isActive, type: a.type||'urgent' }); window.scrollTo({top:0,behavior:'smooth'}); }}>
                    <Edit2 size={13} /> Edit
                  </button>
                  <button className="abtn abtn-red abtn-sm" style={{ padding: '8px 12px' }} onClick={() => softDelete('alerts', a.id, a, a.text?.substring(0,30))} aria-label="Delete alert">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign:'center', padding: '60px 0', opacity: 0.5 }}>
                <Search size={36} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: T.t4 }}>No match found in alert history.</div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: 24 }}>
        <MiniLog logs={getSectionLog('alerts')} />
      </div>
    </div>
  );
}
