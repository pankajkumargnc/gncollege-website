// src/components/admin/tabs/NoticesTab.jsx
import { useState } from 'react';
import { db } from '../../../firebase'; // ✅ FIXED: Teen folder peechhe
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import DOMPurify from 'dompurify';
import MediaPicker from '../../MediaPicker';
import { T, NAVY, GOLD, BG, useLocalDraft, Toggle, SectionSearch, BulkBar, MiniLog } from '../AdminShared';
import { extractNoticeMetadata } from '../../../utils/aiExtractor';

export default function NoticesTab({ notices, logAct, getSectionLog, softDelete, bulkDelete }) {
  const [editNotice, setEditNotice] = useState(null);
  const [noticeData, setNoticeData, clearNoticeDraft] = useLocalDraft('notice', { text: '', link: '', type: 'General', isNew: true, pinned: false, publishDate: '', expiryDate: '' });
  const [noticeSearch, setNoticeSearch] = useState('');
  const [noticeSel, setNoticeSel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleAIExtract = async () => {
    const rawInput = noticeData.text || noticeData.link;
    if (!rawInput) {
      toast.error('Type a rough draft or select a PDF first!');
      return;
    }
    setAiLoading(true);
    const tId = toast.loading('✨ AI polishing notice...');
    try {
      const extracted = await extractNoticeMetadata(rawInput);
      setNoticeData(prev => ({
        ...prev,
        text: extracted.text || prev.text,
        type: extracted.type || prev.type,
        isNew: extracted.isNew,
        pinned: extracted.pinned
      }));
      toast.success(`✨ Formatted as ${extracted.type} notice!`, { id: tId });
    } catch (err) {
      toast.error('AI formatting failed: ' + err.message, { id: tId });
    } finally {
      setAiLoading(false);
    }
  };

  const saveNotice = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = { ...noticeData };
      // Convert date strings to Firestore-friendly format
      if (payload.publishDate) payload.publishDate = payload.publishDate;
      else delete payload.publishDate;
      if (payload.expiryDate) payload.expiryDate = payload.expiryDate;
      else delete payload.expiryDate;

      if (editNotice) await updateDoc(doc(db, 'notices', editNotice.id), { ...payload, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'notices'), { ...payload, date: new Date().toISOString(), createdAt: serverTimestamp() });

      if (noticeData.sendPush) {
        await addDoc(collection(db, 'push_broadcasts'), {
          title: `📢 GNC Notice: ${noticeData.type || 'General'}`,
          body: noticeData.text?.substring(0, 120),
          url: noticeData.link || '/notifications',
          createdAt: serverTimestamp()
        });
        toast.success('📢 Web push notification queued!');
      }

      toast.success('Notice published!');
      logAct(editNotice ? 'update' : 'add', `Notice: ${noticeData.text?.substring(0, 30)}`, 'notices');
      setEditNotice(null); clearNoticeDraft();
    } catch (err) {
      console.error('[NoticesTab] Failed to save notice:', err);
      toast.error('Failed to save notice: ' + (err.message || 'Unknown error'));
    }
    setLoading(false);
  };

  // ── Scheduling status helper ──
  const getScheduleStatus = (n) => {
    const now = new Date();
    if (n.publishDate && new Date(n.publishDate) > now) return { label: '🟡 Scheduled', bg: '#fefce8', color: '#d97706' };
    if (n.expiryDate && new Date(n.expiryDate) < now) return { label: '🔴 Expired', bg: '#fee2e2', color: '#dc2626' };
    return { label: '🟢 Live', bg: '#dcfce7', color: '#16a34a' };
  };

  const filtered = (notices || []).filter(n => !noticeSearch || n.text?.toLowerCase().includes(noticeSearch.toLowerCase()));

  return (
    <div className="fade-up">
      <p style={{ margin: 0, fontWeight: 900, color: NAVY, fontSize: 'clamp(20px, 5vw, 24px)', letterSpacing: '-0.5px' }}>📢 Notice Board</p>
      <p style={{ margin: '4px 0 14px', color: T.t3, fontSize: 13, fontWeight: 600 }}>Publish and manage official notices.</p>

      {/* ── 📌 CLEAR DESTINATION INDICATOR ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'linear-gradient(135deg, rgba(15, 35, 71, 0.05) 0%, rgba(30, 58, 138, 0.08) 100%)',
        border: '1.5px solid rgba(15, 35, 71, 0.15)',
        borderRadius: 14, padding: '12px 16px', margin: '0 0 20px',
      }}>
        <span style={{ fontSize: 24 }}>📌</span>
        <div>
          <div style={{ fontWeight: 800, fontSize: 13, color: NAVY }}>
            Live Destination: Homepage Card 1 (Campus Notices) &amp; /notifications Page
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
            Notices published here appear with 3D Date Tiles, Smart Badges (Exams, Results, Admission), and optional in-app PDF previews.
          </div>
        </div>
      </div>

      <div className="card-gold">
        <div className="actitle">{editNotice ? '✏️ Edit Notice' : '➕ Publish Notice'}</div>
        <form onSubmit={saveNotice}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label className="alabel" style={{ margin: 0 }}>Notice Text *</label>
              <button
                type="button"
                onClick={handleAIExtract}
                disabled={aiLoading}
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(168,85,247,0.3)',
                  transition: 'all 0.2s'
                }}
                title="Polish draft text, detect category and urgency using AI"
              >
                {aiLoading ? '✨ Processing...' : '✨ AI Auto-Fill & Polish'}
              </button>
            </div>
            <textarea 
              className="ainp" 
              rows={3} 
              value={noticeData.text || ''} 
              onChange={(e) => setNoticeData(d=>({...d,text:e.target.value}))} 
              required 
              placeholder="Type rough text or select a PDF below, then click ✨ AI Auto-Fill..." 
            />
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
    label="Link (Drive PDF or URL)" 
    value={noticeData.link || ''} 
    onChange={async (url) => {
      setNoticeData(d => ({ ...d, link: url }));
      if (!noticeData.text && url) {
        const parts = url.split('/');
        const rawName = decodeURIComponent(parts[parts.length - 1] || '');
        if (rawName && rawName.length > 3) {
          const autoData = await extractNoticeMetadata(rawName);
          setNoticeData(d => ({
            ...d,
            link: url,
            text: autoData.text,
            type: autoData.type,
            isNew: autoData.isNew,
            pinned: autoData.pinned
          }));
          toast.success(`✨ Auto-detected: ${autoData.type} Notice`);
        }
      }
    }} 
    type="pdf" 
    compact={true} 
    driveFolderId={import.meta.env.VITE_DRIVE_NOTICE_FOLDER}
  />
</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 22 }}>
              <Toggle checked={!!noticeData.isNew} onChange={()=>setNoticeData(d=>({...d,isNew:!d.isNew}))} label="Mark as NEW" color={T.red} />
              <Toggle checked={!!noticeData.pinned} onChange={()=>setNoticeData(d=>({...d,pinned:!d.pinned}))} label="Pin to Top" color={NAVY} />
              <Toggle checked={!!noticeData.sendPush} onChange={()=>setNoticeData(d=>({...d,sendPush:!d.sendPush}))} label="📢 Broadcast Push Notification" color={T.purple} />
            </div>
          </div>

          {/* ── 📅 Content Scheduling ── */}
          <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16, marginBottom: 14, border: `1px solid ${T.b1}` }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              📅 Scheduling <span style={{ fontSize: 11, color: T.t4, fontWeight: 600 }}>(optional)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
              <div>
                <label className="alabel">Publish Date</label>
                <input className="ainp" type="datetime-local" value={noticeData.publishDate || ''}
                  onChange={(e) => setNoticeData(d=>({...d, publishDate: e.target.value}))}
                />
                <div style={{ fontSize: 10, color: T.t4, marginTop: 4 }}>Leave empty to publish immediately</div>
              </div>
              <div>
                <label className="alabel">Expiry Date</label>
                <input className="ainp" type="datetime-local" value={noticeData.expiryDate || ''}
                  onChange={(e) => setNoticeData(d=>({...d, expiryDate: e.target.value}))}
                />
                <div style={{ fontSize: 10, color: T.t4, marginTop: 4 }}>Leave empty for no expiry</div>
              </div>
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
                {(() => { const s = getScheduleStatus(n); return <span className="abadge" style={{ background: s.bg, color: s.color, fontWeight: 800 }}>{s.label}</span>; })()}
                {n.publishDate && <span className="abadge" style={{ background: '#f0fdf4', color: T.t3, fontSize: 10 }}>📅 {new Date(n.publishDate).toLocaleDateString('en-IN', {day:'2-digit', month:'short'})}</span>}
                {n.expiryDate && <span className="abadge" style={{ background: '#fef3c7', color: '#d97706', fontSize: 10 }}>⏰ {new Date(n.expiryDate).toLocaleDateString('en-IN', {day:'2-digit', month:'short'})}</span>}
              </div>
              <div style={{ fontWeight: 700, color: NAVY, fontSize: 14 }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize((n.text||'').substring(0,100)) }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="abtn abtn-outline abtn-sm" onClick={()=>{setEditNotice(n);setNoticeData({text:n.text||'',link:n.link||'',type:n.type||'General',isNew:!!n.isNew,pinned:!!n.pinned,publishDate:n.publishDate||'',expiryDate:n.expiryDate||''});window.scrollTo({top:0,behavior:'smooth'});}} aria-label="Edit notice">✏️</button>
              <button className="abtn abtn-red abtn-sm" onClick={()=>softDelete('notices',n.id,n,(n.text||'').substring(0,30))} aria-label="Delete notice">🗑️</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign:'center', padding:'30px 0', color: T.t4 }}>No notices found</div>}
      </div>
      <MiniLog logs={getSectionLog('notices')} />
    </div>
  );
}
