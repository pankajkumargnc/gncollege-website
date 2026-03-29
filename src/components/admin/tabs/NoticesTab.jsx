// src/components/admin/tabs/NoticesTab.jsx
import { useState } from 'react';
import { db } from '../../../firebase'; // ✅ FIXED: Teen folder peechhe
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import DOMPurify from 'dompurify';
import MediaPicker from '../../MediaPicker';
import { T, NAVY, GOLD, BG, useLocalDraft, Toggle, SectionSearch, BulkBar, MiniLog } from '../AdminShared';

export default function NoticesTab({ notices, logAct, getSectionLog, softDelete, bulkDelete }) {
  const [editNotice, setEditNotice] = useState(null);
  const [noticeData, setNoticeData, clearNoticeDraft] = useLocalDraft('notice', { text: '', link: '', type: 'General', isNew: true, pinned: false });
  const [noticeSearch, setNoticeSearch] = useState('');
  const [noticeSel, setNoticeSel] = useState([]);
  const [loading, setLoading] = useState(false);

  const saveNotice = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (editNotice) await updateDoc(doc(db, 'notices', editNotice.id), { ...noticeData, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'notices'), { ...noticeData, date: new Date().toISOString(), createdAt: serverTimestamp() });
      toast.success('Notice published!');
      logAct(editNotice ? 'update' : 'add', `Notice: ${noticeData.text?.substring(0, 30)}`, 'notices');
      setEditNotice(null); clearNoticeDraft();
    } catch { }
    setLoading(false);
  };

  const filtered = (notices || []).filter(n => !noticeSearch || n.text?.toLowerCase().includes(noticeSearch.toLowerCase()));

  return (
    <div className="fade-up">
      <p className="asec">📢 Notice Board</p>
      <p className="asub">Official notices publish aur manage karein</p>

      <div className="card-gold">
        <div className="actitle">{editNotice ? '✏️ Edit Notice' : '➕ Publish Notice'}</div>
        <form onSubmit={saveNotice}>
          <div style={{ marginBottom: 14 }}>
            <label className="alabel">Notice Text *</label>
            <textarea className="ainp" rows={3} value={noticeData.text || ''} onChange={(e) => setNoticeData(d=>({...d,text:e.target.value}))} required placeholder="Notice content..." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 14 }}>
            <div>
              <label className="alabel">Type</label>
              <select className="ainp" value={noticeData.type || 'General'} onChange={(e) => setNoticeData(d=>({...d,type:e.target.value}))}>
                {['General','Examination','Admission','Result','Holiday','Scholarship','Sports'].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1/-1' }}>
  <MediaPicker 
    label="Link (Drive PDF ya URL)" 
    value={noticeData.link || ''} 
    onChange={url => setNoticeData(d => ({ ...d, link: url }))} 
    type="pdf" 
    compact={true} 
    driveFolderId={import.meta.env.VITE_DRIVE_NOTICE_FOLDER} // ✅ MAGIC HAPPPENS HERE
  />
</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 22 }}>
              <Toggle checked={!!noticeData.isNew} onChange={()=>setNoticeData(d=>({...d,isNew:!d.isNew}))} label="Mark as NEW" color={T.red} />
              <Toggle checked={!!noticeData.pinned} onChange={()=>setNoticeData(d=>({...d,pinned:!d.pinned}))} label="Pin to Top" color={NAVY} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading}>🚀 {editNotice?'Update':'Publish'}</button>
            {editNotice && <button type="button" className="abtn abtn-outline" onClick={()=>{setEditNotice(null);clearNoticeDraft();}}>Cancel</button>}
          </div>
        </form>
      </div>

      <SectionSearch value={noticeSearch} onChange={setNoticeSearch} placeholder="Search notices..." />
      <BulkBar count={noticeSel.length} onDelete={() => { bulkDelete('notices', noticeSel); setNoticeSel([]); }} onClear={() => setNoticeSel([])} />

      <div className="card">
        <div className="actitle">All Notices ({filtered.length})</div>
        {filtered.map(n => (
          <div key={n.id} className={`arow ${noticeSel.includes(n.id)?'selected':''}`} style={{ borderLeft: `4px solid ${n.pinned?NAVY:n.isNew?T.red:T.b2}` }}>
            <input type="checkbox" checked={noticeSel.includes(n.id)} onChange={() => setNoticeSel(s=>s.includes(n.id)?s.filter(x=>x!==n.id):[...s,n.id])} style={{ accentColor: NAVY }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 5, flexWrap: 'wrap' }}>
                {n.pinned && <span className="abadge" style={{ background: `${NAVY}15`, color: NAVY }}>📌 Pinned</span>}
                {n.isNew && <span className="abadge" style={{ background: '#fee2e2', color: T.red }}>NEW</span>}
                <span className="abadge" style={{ background: BG, color: T.t2 }}>{n.type}</span>
              </div>
              <div style={{ fontWeight: 700, color: NAVY, fontSize: 14 }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize((n.text||'').substring(0,100)) }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="abtn abtn-outline abtn-sm" onClick={()=>{setEditNotice(n);setNoticeData({text:n.text||'',link:n.link||'',type:n.type||'General',isNew:!!n.isNew,pinned:!!n.pinned});window.scrollTo({top:0,behavior:'smooth'});}}>✏️</button>
              <button className="abtn abtn-red abtn-sm" onClick={()=>softDelete('notices',n.id,n,(n.text||'').substring(0,30))}>🗑️</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign:'center', padding:'30px 0', color: T.t4 }}>Koi notice nahi mila</div>}
      </div>
      <MiniLog logs={getSectionLog('notices')} />
    </div>
  );
}
