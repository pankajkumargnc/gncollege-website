// src/components/admin/tabs/QuickPublishTab.jsx
// ═══════════════════════════════════════════════════════════════════════════════
// QuickPublishTab — ⚡ Mini Dashboard for Publish, Edit, and Delete
// ═══════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, WHITE } from '../AdminShared';

export default function QuickPublishTab({ logAct }) {
  const [loading, setLoading] = useState(false);

  // ── 1. Live Data Fetching (Top 5 items per category) ──
  const [recentData, setRecentData] = useState({ notices: [], announcements: [], events: [], updates: [], alerts: [] });

  useEffect(() => {
    const cols = ['notices', 'announcements', 'events', 'updates', 'alerts'];
    const unsubs = cols.map(c => onSnapshot(collection(db, c), snap => {
      let docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      // Local Sorting (Sabse naya upar) to bypass Firebase index limit
      docs.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
      setRecentData(prev => ({ ...prev, [c]: docs.slice(0, 5) })); // Sirf top 5 rakhein
    }));
    return () => unsubs.forEach(u => u());
  }, []);

  // ── Generic Delete Handler ──
  const handleDelete = async (col, id, title) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteDoc(doc(db, col, id));
      toast.success('Item deleted successfully!');
      logAct?.('delete', `Deleted: ${title}`, col);
    } catch (err) { toast.error(err.message); }
  };

  // ════════ 1. NOTICES STATE & LOGIC ════════
  const [notData, setNotData] = useState({ id: null, text: '' });
  const saveNotice = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (notData.id) {
        await updateDoc(doc(db, 'notices', notData.id), { text: notData.text, updatedAt: serverTimestamp() });
        toast.success('Notice updated!');
      } else {
        await addDoc(collection(db, 'notices'), { text: notData.text, type: 'General', isNew: true, link: '', date: new Date().toISOString(), createdAt: serverTimestamp() });
        toast.success('📢 Notice published!');
      }
      setNotData({ id: null, text: '' });
    } catch(err) { toast.error(err.message); }
    setLoading(false);
  };

  // ════════ 2. NEWS STATE & LOGIC ════════
  const [newsData, setNewsData] = useState({ id: null, text: '' });
  const saveNews = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (newsData.id) {
        await updateDoc(doc(db, 'announcements', newsData.id), { text: newsData.text, updatedAt: serverTimestamp() });
        toast.success('News updated!');
      } else {
        await addDoc(collection(db, 'announcements'), { text: newsData.text, isNew: true, link: '', date: new Date().toISOString(), createdAt: serverTimestamp() });
        toast.success('📣 News published!');
      }
      setNewsData({ id: null, text: '' });
    } catch(err) { toast.error(err.message); }
    setLoading(false);
  };

  // ════════ 3. EVENTS STATE & LOGIC ════════
  const [evtData, setEvtData] = useState({ id: null, title: '', day: '', month: '', type: 'WORKSHOP' });
  const saveEvent = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = { title: evtData.title, day: evtData.day, month: evtData.month, type: evtData.type };
      if (evtData.id) {
        await updateDoc(doc(db, 'events', evtData.id), { ...payload, updatedAt: serverTimestamp() });
        toast.success('Event updated!');
      } else {
        await addDoc(collection(db, 'events'), { ...payload, status: 'upcoming', location: 'Campus', desc: '', createdAt: serverTimestamp() });
        toast.success('🏆 Event scheduled!');
      }
      setEvtData({ id: null, title: '', day: '', month: '', type: 'WORKSHOP' });
    } catch(err) { toast.error(err.message); }
    setLoading(false);
  };

  // ════════ 4. TICKER UPDATES STATE & LOGIC ════════
  const [updData, setUpdData] = useState({ id: null, text: '', link: '' });
  const saveUpdate = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (updData.id) {
        await updateDoc(doc(db, 'updates', updData.id), { text: updData.text, link: updData.link, updatedAt: serverTimestamp() });
        toast.success('Ticker updated!');
      } else {
        await addDoc(collection(db, 'updates'), { text: updData.text, link: updData.link, createdAt: serverTimestamp() });
        toast.success('🔔 Update published!');
      }
      setUpdData({ id: null, text: '', link: '' });
    } catch(err) { toast.error(err.message); }
    setLoading(false);
  };

  // ════════ 5. FLASH ALERTS STATE & LOGIC ════════
  const [altData, setAltData] = useState({ id: null, text: '' });
  const saveAlert = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (altData.id) {
        await updateDoc(doc(db, 'alerts', altData.id), { text: altData.text, updatedAt: serverTimestamp() });
        toast.success('Alert updated!');
      } else {
        await addDoc(collection(db, 'alerts'), { text: altData.text, isActive: true, type: 'urgent', createdAt: serverTimestamp() });
        toast.success('🚨 Alert is LIVE!');
      }
      setAltData({ id: null, text: '' });
    } catch(err) { toast.error(err.message); }
    setLoading(false);
  };

  // ── Reusable Component for Recent Items List ──
  const RecentList = ({ items, onEdit, onDel, col }) => (
    <div style={{ marginTop: 15, background: '#f8fafc', borderRadius: 8, padding: '8px 12px', maxHeight: 140, overflowY: 'auto', border: `1px solid ${T.b1}` }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: T.t3, marginBottom: 8, textTransform: 'uppercase' }}>Recent 5 Items</div>
      {items.length === 0 ? <div style={{ fontSize: 12, color: T.t4 }}>No items found.</div> : items.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: `1px dashed ${T.b1}` }}>
          <div style={{ fontSize: 12, color: NAVY, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: 10 }}>
            {item.text || item.title}
          </div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <button type="button" onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>✏️</button>
            <button type="button" onClick={() => onDel(col, item.id, item.text || item.title)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ fontSize: 28 }}>⚡</div>
        <div>
          <h2 style={{ margin: 0, color: NAVY, fontSize: 22, fontWeight: 900 }}>Quick Publish & Edit</h2>
          <p style={{ margin: '4px 0 0', color: T.t3, fontSize: 13, fontWeight: 500 }}>Manage live updates, alerts, and news directly from here</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        
        {/* 1. NOTICES */}
        <div style={{ background: WHITE, padding: 20, borderRadius: 16, border: `1.5px solid ${notData.id ? '#3b82f6' : T.b1}`, boxShadow: notData.id ? '0 0 15px rgba(59,130,246,0.1)' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📢</div>
            <div style={{ fontWeight: 800, color: NAVY, fontSize: 15 }}>{notData.id ? '✏️ Edit Notice' : 'Notice Board'}</div>
          </div>
          <form onSubmit={saveNotice} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <textarea className="ainp" rows={2} value={notData.text} onChange={e => setNotData({ ...notData, text: e.target.value })} placeholder="Write notice content..." required />
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" className="abtn abtn-navy" style={{ flex: 1, justifyContent: 'center' }} disabled={loading}>{notData.id ? 'Update' : 'Publish'}</button>
              {notData.id && <button type="button" className="abtn abtn-outline" onClick={() => setNotData({id:null, text:''})}>Cancel</button>}
            </div>
          </form>
          <RecentList items={recentData.notices} col="notices" onDel={handleDelete} onEdit={item => setNotData({ id: item.id, text: item.text })} />
        </div>

        {/* 2. NEWS */}
        <div style={{ background: WHITE, padding: 20, borderRadius: 16, border: `1.5px solid ${newsData.id ? '#8b5cf6' : T.b1}`, boxShadow: newsData.id ? '0 0 15px rgba(139,92,246,0.1)' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: '#f3e8ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📣</div>
            <div style={{ fontWeight: 800, color: NAVY, fontSize: 15 }}>{newsData.id ? '✏️ Edit News' : 'Latest News'}</div>
          </div>
          <form onSubmit={saveNews} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <textarea className="ainp" rows={2} value={newsData.text} onChange={e => setNewsData({ ...newsData, text: e.target.value })} placeholder="Write news announcement..." required />
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" className="abtn" style={{ flex: 1, justifyContent: 'center', background: '#8b5cf6', color: WHITE, border: 'none' }} disabled={loading}>{newsData.id ? 'Update' : 'Publish'}</button>
              {newsData.id && <button type="button" className="abtn abtn-outline" onClick={() => setNewsData({id:null, text:''})}>Cancel</button>}
            </div>
          </form>
          <RecentList items={recentData.announcements} col="announcements" onDel={handleDelete} onEdit={item => setNewsData({ id: item.id, text: item.text })} />
        </div>

        {/* 3. EVENTS */}
        <div style={{ background: WHITE, padding: 20, borderRadius: 16, border: `1.5px solid ${evtData.id ? '#10b981' : T.b1}`, boxShadow: evtData.id ? '0 0 15px rgba(16,185,129,0.1)' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: '#dcfce7', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏆</div>
            <div style={{ fontWeight: 800, color: NAVY, fontSize: 15 }}>{evtData.id ? '✏️ Edit Event' : 'Upcoming Event'}</div>
          </div>
          <form onSubmit={saveEvent} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input type="text" className="ainp" value={evtData.title} onChange={e => setEvtData({...evtData, title: e.target.value})} placeholder="Event Title..." required />
            <div style={{ display: 'flex', gap: 10 }}>
              <input type="text" className="ainp" value={evtData.day} onChange={e => setEvtData({...evtData, day: e.target.value})} placeholder="Day (15)" style={{ flex: 1 }} required />
              <input type="text" className="ainp" value={evtData.month} onChange={e => setEvtData({...evtData, month: e.target.value})} placeholder="Month (MAR)" style={{ flex: 1.5 }} required />
            </div>
            <select className="ainp" value={evtData.type} onChange={e => setEvtData({...evtData, type: e.target.value})}>
              <option value="WORKSHOP">Workshop</option><option value="SEMINAR">Seminar</option><option value="CULTURAL">Cultural</option><option value="SPORTS">Sports</option>
            </select>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" className="abtn" style={{ flex: 1, justifyContent: 'center', background: '#10b981', color: WHITE, border: 'none' }} disabled={loading}>{evtData.id ? 'Update Event' : 'Schedule'}</button>
              {evtData.id && <button type="button" className="abtn abtn-outline" onClick={() => setEvtData({id:null, title:'', day:'', month:'', type:'WORKSHOP'})}>Cancel</button>}
            </div>
          </form>
          <RecentList items={recentData.events} col="events" onDel={handleDelete} onEdit={item => setEvtData({ id: item.id, title: item.title, day: item.day||'', month: item.month||'', type: item.type||'WORKSHOP' })} />
        </div>

        {/* 4. TICKER UPDATES */}
        <div style={{ background: WHITE, padding: 20, borderRadius: 16, border: `1.5px solid ${updData.id ? '#d97706' : T.b1}`, boxShadow: updData.id ? '0 0 15px rgba(244,160,35,0.2)' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🔔</div>
            <div style={{ fontWeight: 800, color: NAVY, fontSize: 15 }}>{updData.id ? '✏️ Edit Ticker' : 'Ticker Update'}</div>
          </div>
          <form onSubmit={saveUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <textarea className="ainp" rows={2} value={updData.text} onChange={e => setUpdData({...updData, text: e.target.value})} placeholder="Ticker text..." required />
            <input type="text" className="ainp" value={updData.link} onChange={e => setUpdData({...updData, link: e.target.value})} placeholder="Link URL (Optional)" />
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" className="abtn abtn-gold" style={{ flex: 1, justifyContent: 'center' }} disabled={loading}>{updData.id ? 'Update' : 'Post'}</button>
              {updData.id && <button type="button" className="abtn abtn-outline" onClick={() => setUpdData({id:null, text:'', link:''})}>Cancel</button>}
            </div>
          </form>
          <RecentList items={recentData.updates} col="updates" onDel={handleDelete} onEdit={item => setUpdData({ id: item.id, text: item.text, link: item.link||'' })} />
        </div>

        {/* 5. FLASH ALERTS */}
        <div style={{ background: '#fff0f0', padding: 20, borderRadius: 16, border: `1.5px solid ${altData.id ? T.red : '#fecaca'}`, boxShadow: altData.id ? '0 0 15px rgba(239,68,68,0.2)' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
            <div className="pulse" style={{ width: 34, height: 34, borderRadius: 10, background: T.red, color: WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🚨</div>
            <div style={{ fontWeight: 900, color: T.red, fontSize: 15 }}>{altData.id ? '✏️ Edit Alert' : 'Flash Alert'}</div>
          </div>
          <form onSubmit={saveAlert} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <textarea className="ainp" rows={2} value={altData.text} onChange={e => setAltData({...altData, text: e.target.value})} placeholder="Urgent banner message..." required />
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" className="abtn" style={{ flex: 1, justifyContent: 'center', background: T.red, color: WHITE, border: 'none' }} disabled={loading}>{altData.id ? 'Update' : '🔴 Go Live'}</button>
              {altData.id && <button type="button" className="abtn abtn-outline" onClick={() => setAltData({id:null, text:''})}>Cancel</button>}
            </div>
          </form>
          {/* Custom style for alert recent list */}
          <div style={{ marginTop: 15, background: '#fff', borderRadius: 8, padding: '8px 12px', maxHeight: 140, overflowY: 'auto', border: `1px solid #fecaca` }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: T.red, marginBottom: 8, textTransform: 'uppercase' }}>Recent Alerts</div>
            {recentData.alerts.length === 0 ? <div style={{ fontSize: 12, color: T.t4 }}>No alerts.</div> : recentData.alerts.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: `1px dashed #fecaca` }}>
                <div style={{ fontSize: 12, color: T.red, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: 10 }}>{item.text}</div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <button type="button" onClick={() => setAltData({ id: item.id, text: item.text })} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>✏️</button>
                  <button type="button" onClick={() => handleDelete('alerts', item.id, item.text)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}