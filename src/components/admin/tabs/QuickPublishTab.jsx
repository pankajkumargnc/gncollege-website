// src/components/admin/tabs/QuickPublishTab.jsx
// ═══════════════════════════════════════════════════════════════════════════════
// QuickPublishTab — ⚡ Ultra Modern Mini Dashboard for Publish, Edit, and Delete
// ═══════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD, WHITE } from '../AdminShared';

export default function QuickPublishTab({ logAct }) {
  const [loading, setLoading] = useState(false);
  const [recentData, setRecentData] = useState({ notices: [], announcements: [], events: [], updates: [], alerts: [] });

  useEffect(() => {
    const cols = ['notices', 'announcements', 'events', 'updates', 'alerts'];
    const unsubs = cols.map(c => onSnapshot(collection(db, c), snap => {
      let docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      docs.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
      setRecentData(prev => ({ ...prev, [c]: docs.slice(0, 5) }));
    }));
    return () => unsubs.forEach(u => u());
  }, []);

  const handleDelete = async (col, id, title) => {
    if (!window.confirm('🚨 Are you sure you want to delete this item?')) return;
    try {
      await deleteDoc(doc(db, col, id));
      toast.success('Deleted permanently!', { style:{background:'#ef4444', color:'#fff', fontWeight:800} });
      logAct?.('delete', `Deleted: ${title}`, col);
    } catch (err) { toast.error(err.message); }
  };

  // 1. NOTICES logic
  const [notData, setNotData] = useState({ id: null, text: '' });
  const saveNotice = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (notData.id) {
        await updateDoc(doc(db, 'notices', notData.id), { text: notData.text, updatedAt: serverTimestamp() });
        toast.success('Notice Updated!', { icon: '🔄' });
      } else {
        await addDoc(collection(db, 'notices'), { text: notData.text, type: 'General', isNew: true, link: '', date: new Date().toISOString(), createdAt: serverTimestamp() });
        toast.success('Notice Published!', { icon: '📢' });
      }
      setNotData({ id: null, text: '' });
    } catch(err) { toast.error(err.message); }
    setLoading(false);
  };

  // 2. NEWS logic
  const [newsData, setNewsData] = useState({ id: null, text: '' });
  const saveNews = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (newsData.id) {
        await updateDoc(doc(db, 'announcements', newsData.id), { text: newsData.text, updatedAt: serverTimestamp() });
        toast.success('News Updated!', { icon: '🔄' });
      } else {
        await addDoc(collection(db, 'announcements'), { text: newsData.text, isNew: true, link: '', date: new Date().toISOString(), createdAt: serverTimestamp() });
        toast.success('News Live Now!', { icon: '📣' });
      }
      setNewsData({ id: null, text: '' });
    } catch(err) { toast.error(err.message); }
    setLoading(false);
  };

  // 3. EVENTS logic
  const [evtData, setEvtData] = useState({ id: null, title: '', day: '', month: '', type: 'WORKSHOP' });
  const saveEvent = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = { title: evtData.title, day: evtData.day, month: evtData.month, type: evtData.type };
      if (evtData.id) {
        await updateDoc(doc(db, 'events', evtData.id), { ...payload, updatedAt: serverTimestamp() });
        toast.success('Event Record Updated!');
      } else {
        await addDoc(collection(db, 'events'), { ...payload, status: 'upcoming', location: 'Campus', desc: '', createdAt: serverTimestamp() });
        toast.success('Event Scheduled Successfully!', { icon: '🏆' });
      }
      setEvtData({ id: null, title: '', day: '', month: '', type: 'WORKSHOP' });
    } catch(err) { toast.error(err.message); }
    setLoading(false);
  };

  // 4. TICKER UPDATES logic
  const [updData, setUpdData] = useState({ id: null, text: '', link: '' });
  const saveUpdate = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (updData.id) {
        await updateDoc(doc(db, 'updates', updData.id), { text: updData.text, link: updData.link, updatedAt: serverTimestamp() });
        toast.success('Ticker Item Updated');
      } else {
        await addDoc(collection(db, 'updates'), { text: updData.text, link: updData.link, createdAt: serverTimestamp() });
        toast.success('Ticker Updated!', { icon: '🔔' });
      }
      setUpdData({ id: null, text: '', link: '' });
    } catch(err) { toast.error(err.message); }
    setLoading(false);
  };

  // 5. FLASH ALERTS logic
  const [altData, setAltData] = useState({ id: null, text: '' });
  const saveAlert = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (altData.id) {
        await updateDoc(doc(db, 'alerts', altData.id), { text: altData.text, updatedAt: serverTimestamp() });
        toast.success('Alert Updated');
      } else {
        await addDoc(collection(db, 'alerts'), { text: altData.text, isActive: true, type: 'urgent', createdAt: serverTimestamp() });
        toast.success('🚨 FLASH ALERT IS LIVE!', { duration: 5000 });
      }
      setAltData({ id: null, text: '' });
    } catch(err) { toast.error(err.message); }
    setLoading(false);
  };

  const RecentList = ({ items, onEdit, onDel, col, accent }) => (
    <div style={{ marginTop: 20, background: 'rgba(15,35,71,0.03)', borderRadius: 14, padding: '16px', border: `1px solid ${T.b1}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ fontSize: 11, fontWeight: 900, color: T.t3, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.5, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
        Recently Published
      </div>
      <div style={{ maxHeight: 150, overflowY: 'auto', paddingRight: 4 }} className="adm-scroll">
        {items.length === 0 ? <div style={{ fontSize: 12, color: T.t4, textAlign: 'center', padding: '10px 0' }}>No items yet.</div> : items.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid rgba(15,35,71,0.05)` }}>
            <div style={{ fontSize: 13, color: NAVY, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: 10 }}>
              {item.text || item.title}
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button type="button" onClick={() => onEdit(item)} style={{ background: '#fff', border: '1px solid #e2e8f0', cursor: 'pointer', fontSize: 12, padding: '4px 8px', borderRadius: 6, transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = accent} onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}>✏️</button>
              <button type="button" onClick={() => onDel(col, item.id, item.text || item.title)} style={{ background: '#fff', border: '1px solid #e2e8f0', cursor: 'pointer', fontSize: 12, padding: '4px 8px', borderRadius: 6, transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#ef4444'} onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fade-up" style={{ padding: '2px' }}>
      <style>{`
        .qp-card {
            background: #fff;
            padding: 24px;
            border-radius: 24px;
            border: 1px solid #f1f5f9;
            box-shadow: 0 10px 30px rgba(15, 35, 71, 0.04);
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            position: relative;
            overflow: hidden;
        }
        .qp-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 50px rgba(15, 35, 71, 0.1);
        }
        .qp-card.active {
            border-color: ${GOLD};
            box-shadow: 0 0 0 4px ${GOLD}15, 0 20px 50px rgba(15, 35, 71, 0.1);
        }
        .qp-icon-box {
            width: 44px; height: 44px; border-radius: 12px;
            display: flex; alignItems: center; justify-content: center;
            font-size: 20px; transition: transform 0.3s;
        }
        .qp-card:hover .qp-icon-box { transform: scale(1.1) rotate(-5deg); }
        .qp-label { font-weight: 900; color: ${NAVY}; fontSize: 17px; letterSpacing: -0.5px; }

        .qp-btn-pub {
            background: ${NAVY}; color: #fff; border: none; border-radius: 12px;
            padding: 12px 20px; font-weight: 800; font-size: 14px;
            cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .qp-btn-pub:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(15, 35, 71, 0.2); }
        .qp-btn-pub:active { transform: translateY(0); }
        .qp-btn-pub:disabled { opacity: 0.6; cursor: not-allowed; }

        .qp-btn-cancel {
            background: #f8fafc; color: ${NAVY}; border: 1px solid #e2e8f0; border-radius: 12px;
            padding: 12px 16px; font-weight: 700; font-size: 14px; cursor: pointer; transition: all 0.2s;
        }
        .qp-btn-cancel:hover { background: #fff; border-color: ${NAVY}; }
        
        .pulse-red { animation: pulse-red 2s infinite; }
        @keyframes pulse-red { 0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <div style={{ background: `${GOLD}20`, width: 60, height: 60, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>⚡</div>
        <div>
          <h2 style={{ margin: 0, color: NAVY, fontSize: 26, fontWeight: 900, letterSpacing: '-1px' }}>Quick Publish & Dashboard</h2>
          <p style={{ margin: '4px 0 0', color: T.t3, fontSize: 14, fontWeight: 600, opacity: 0.8 }}>⚡ Ultra-fast content management and live visibility controls.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
        
        {/* 1. NOTICES */}
        <div className={`qp-card ${notData.id ? 'active' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div className="qp-icon-box" style={{ background: '#eff6ff', color: '#3b82f6' }}>📢</div>
            <div className="qp-label">{notData.id ? 'Edit Notice' : 'Notice Board'}</div>
          </div>
          <form onSubmit={saveNotice} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <textarea className="ainp" rows={3} style={{ borderRadius:16, border: '1.5px solid #f1f5f9', background: '#f8fafc' }} value={notData.text} onChange={e => setNotData({ ...notData, text: e.target.value })} placeholder="Write notice content..." required />
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="qp-btn-pub" style={{ flex: 1 }} disabled={loading}>
                {loading ? '...' : notData.id ? '🔄 Update Notice' : '✨ Publish Notice'}
              </button>
              {notData.id && <button type="button" className="qp-btn-cancel" onClick={() => setNotData({id:null, text:''})}>✕</button>}
            </div>
          </form>
          <RecentList items={recentData.notices} col="notices" accent="#3b82f6" onDel={handleDelete} onEdit={item => setNotData({ id: item.id, text: item.text })} />
        </div>

        {/* 2. NEWS */}
        <div className={`qp-card ${newsData.id ? 'active' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div className="qp-icon-box" style={{ background: '#f3e8ff', color: '#8b5cf6' }}>📣</div>
            <div className="qp-label">{newsData.id ? 'Edit Story' : 'Campus News'}</div>
          </div>
          <form onSubmit={saveNews} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <textarea className="ainp" rows={3} style={{ borderRadius:16, border: '1.5px solid #f1f5f9', background: '#f8fafc' }} value={newsData.text} onChange={e => setNewsData({ ...newsData, text: e.target.value })} placeholder="Write news announcement..." required />
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="qp-btn-pub" style={{ flex: 1, background: '#8b5cf6' }} disabled={loading}>
                {loading ? '...' : newsData.id ? '🔄 Update News' : '✨ Push News LIVE'}
              </button>
              {newsData.id && <button type="button" className="qp-btn-cancel" onClick={() => setNewsData({id:null, text:''})}>✕</button>}
            </div>
          </form>
          <RecentList items={recentData.announcements} col="announcements" accent="#8b5cf6" onDel={handleDelete} onEdit={item => setNewsData({ id: item.id, text: item.text })} />
        </div>

        {/* 3. EVENTS */}
        <div className={`qp-card ${evtData.id ? 'active' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div className="qp-icon-box" style={{ background: '#dcfce7', color: '#10b981' }}>🏆</div>
            <div className="qp-label">{evtData.id ? 'Edit Event' : 'Event Scheduler'}</div>
          </div>
          <form onSubmit={saveEvent} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input type="text" className="ainp" style={{ borderRadius:12, background:'#f8fafc' }} value={evtData.title} onChange={e => setEvtData({...evtData, title: e.target.value})} placeholder="Event Title..." required />
            <div style={{ display: 'flex', gap: 12 }}>
              <input type="text" className="ainp" style={{ borderRadius:12, background:'#f8fafc', flex: 1 }} value={evtData.day} onChange={e => setEvtData({...evtData, day: e.target.value})} placeholder="Day (e.g. 15)" required />
              <input type="text" className="ainp" style={{ borderRadius:12, background:'#f8fafc', flex: 1.5 }} value={evtData.month} onChange={e => setEvtData({...evtData, month: e.target.value})} placeholder="Month (e.g. MAR)" required />
            </div>
            <select className="ainp" style={{ borderRadius:12, background:'#f8fafc' }} value={evtData.type} onChange={e => setEvtData({...evtData, type: e.target.value})}>
              <option value="WORKSHOP">Workshop</option><option value="SEMINAR">Seminar</option><option value="CULTURAL">Cultural</option><option value="SPORTS">Sports</option>
            </select>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button type="submit" className="qp-btn-pub" style={{ flex: 1, background: '#10b981' }} disabled={loading}>
                {loading ? '...' : evtData.id ? '🔄 Update Event' : '📅 Schedule Now'}
              </button>
              {evtData.id && <button type="button" className="qp-btn-cancel" onClick={() => setEvtData({id:null, title:'', day:'', month:'', type:'WORKSHOP'})}>✕</button>}
            </div>
          </form>
          <RecentList items={recentData.events} col="events" accent="#10b981" onDel={handleDelete} onEdit={item => setEvtData({ id: item.id, title: item.title, day: item.day||'', month: item.month||'', type: item.type||'WORKSHOP' })} />
        </div>

        {/* 4. TICKER UPDATES */}
        <div className={`qp-card ${updData.id ? 'active' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div className="qp-icon-box" style={{ background: '#fef3c7', color: '#d97706' }}>🔔</div>
            <div className="qp-label">{updData.id ? 'Edit Ticker' : 'Ticker Control'}</div>
          </div>
          <form onSubmit={saveUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <textarea className="ainp" rows={2} style={{ borderRadius:16, border: '1.5px solid #f1f5f9', background: '#f8fafc' }} value={updData.text} onChange={e => setUpdData({...updData, text: e.target.value})} placeholder="Ticker message..." required />
            <input type="text" className="ainp" style={{ borderRadius:12, background:'#f8fafc' }} value={updData.link} onChange={e => setUpdData({...updData, link: e.target.value})} placeholder="Optional Link (http://...)" />
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="qp-btn-pub" style={{ flex: 1, background: '#d97706' }} disabled={loading}>
                {loading ? '...' : updData.id ? '🔄 Update Ticker' : '🚀 Post to Ticker'}
              </button>
              {updData.id && <button type="button" className="qp-btn-cancel" onClick={() => setUpdData({id:null, text:'', link:''})}>✕</button>}
            </div>
          </form>
          <RecentList items={recentData.updates} col="updates" accent="#d97706" onDel={handleDelete} onEdit={item => setUpdData({ id: item.id, text: item.text, link: item.link||'' })} />
        </div>

        {/* 5. FLASH ALERTS */}
        <div className={`qp-card ${altData.id ? 'active' : ''}`} style={{ background: '#fffafa' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div className={`qp-icon-box ${!altData.id ? 'pulse-red' : ''}`} style={{ background: '#ef4444', color: '#fff' }}>🚨</div>
            <div className="qp-label" style={{ color: '#ef4444' }}>{altData.id ? 'Edit Emergency' : 'Flash Alert (Emergency)'}</div>
          </div>
          <form onSubmit={saveAlert} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <textarea className="ainp" rows={3} style={{ borderRadius:16, border: '1.5px solid #ffd1d1', background: '#fff' }} value={altData.text} onChange={e => setAltData({...altData, text: e.target.value})} placeholder="CRITICAL MESSAGE (Will appear at the very top of site)..." required />
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="qp-btn-pub" style={{ flex: 1, background: '#ef4444' }} disabled={loading}>
                {loading ? '...' : altData.id ? '🔄 Update Alert' : '🔴 Broadcast Now'}
              </button>
              {altData.id && <button type="button" className="qp-btn-cancel" style={{ borderColor: '#ef4444', color: '#ef4444' }} onClick={() => setAltData({id:null, text:''})}>✕</button>}
            </div>
          </form>
          <RecentList items={recentData.alerts} col="alerts" accent="#ef4444" onDel={handleDelete} onEdit={item => setAltData({ id: item.id, text: item.text })} />
        </div>

      </div>
    </div>
  );
}