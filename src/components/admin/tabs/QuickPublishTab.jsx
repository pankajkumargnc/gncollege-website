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

  // AI Modal States
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Form States
  const [notData, setNotData] = useState({ id: null, text: '', img: '' });
  const [newsData, setNewsData] = useState({ id: null, text: '', img: '' });
  const [evtData, setEvtData] = useState({ id: null, title: '', day: '', month: '', type: 'WORKSHOP', img: '' });
  const [updData, setUpdData] = useState({ id: null, text: '', link: '' });
  const [altData, setAltData] = useState({ id: null, text: '' });

  // 🚀 Multi-Channel Broadcast States
  const [mcTitle, setMcTitle] = useState('');
  const [mcCategory, setMcCategory] = useState('EXAMINATION');
  const [mcAudience, setMcAudience] = useState('All Students');
  const [mcDetails, setMcDetails] = useState('');
  const [mcNotice, setMcNotice] = useState(true);
  const [mcAlert, setMcAlert] = useState(true);
  const [mcTicker, setMcTicker] = useState(true);
  const [mcPush, setMcPush] = useState(false);
  const [mcGeneratedWhatsapp, setMcGeneratedWhatsapp] = useState('');
  const [mcSending, setMcSending] = useState(false);

  const handleMultiChannelDispatch = async (e) => {
    e.preventDefault();
    if (!mcTitle.trim() || !mcDetails.trim()) {
      return toast.error('Please provide both Notice Title and Details!');
    }
    setMcSending(true);
    const toastId = toast.loading('Broadcasting across selected college channels...');
    try {
      const now = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      const fullText = `${mcTitle.trim()} — ${mcDetails.trim()}`;

      // 1. Notice Board
      if (mcNotice) {
        await addDoc(collection(db, 'notices'), {
          text: fullText,
          type: mcCategory,
          isNew: true,
          link: '',
          date: new Date().toISOString(),
          createdAt: serverTimestamp()
        });
      }

      // 2. Flash Breaking Alert
      if (mcAlert) {
        await addDoc(collection(db, 'alerts'), {
          text: `🚨 [${mcCategory}] ${mcTitle.trim()}: ${mcDetails.trim()}`,
          isActive: true,
          type: 'urgent',
          createdAt: serverTimestamp()
        });
      }

      // 3. Homepage Live Ticker
      if (mcTicker) {
        await addDoc(collection(db, 'updates'), {
          text: `📢 [${mcCategory}] ${mcTitle.trim()}`,
          link: '/notifications',
          createdAt: serverTimestamp()
        });
      }

      // 4. Browser Push Notification
      if (mcPush && 'Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification('Guru Nanak College Notice', {
            body: mcTitle.trim(),
            icon: 'images/logo.webp'
          });
        }
      }

      // 5. Formatted WhatsApp Broadcast
      const waText = `🎓 *GURU NANAK COLLEGE, DHANBAD*\n📢 *OFFICIAL NOTICE* • ${mcCategory}\n─────────────────────────\n📌 *${mcTitle.trim()}*\n📅 *Date:* ${now}\n👥 *Target:* ${mcAudience}\n\n${mcDetails.trim()}\n\n🔗 *Official Portal:* https://gncollege.org\n─────────────────────────\n_Issued by Office of Administration, GNC Dhanbad_`;

      setMcGeneratedWhatsapp(waText);
      logAct?.('broadcast', `Multi-Channel Notice: ${mcTitle.trim()}`, 'quick');
      toast.success('Multi-Channel Broadcast Live! 🚀', { id: toastId });
    } catch (err) {
      toast.error(err.message, { id: toastId });
    } finally {
      setMcSending(false);
    }
  };

  const handleAiGen = () => {
    if (!aiPrompt.trim()) return toast.error('Please describe what you want to generate!');
    setAiGenerating(true);
    setAiResult(null);
    toast.loading('🧠 AI Neural Matrix searching for best visual...', { id: 'ai-gen' });
    
    setTimeout(() => {
        const p = aiPrompt.toLowerCase();
        let img = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop'; // Corporate Office Default
        
        if (p.includes('admission') || p.includes('apply') || p.includes('college')) {
            img = 'https://images.unsplash.com/photo-152305085306e-88e4a6e029c0?q=80&w=1200&auto=format&fit=crop';
        } else if (p.includes('sport') || p.includes('win') || p.includes('trophy')) {
            img = 'https://images.unsplash.com/photo-1541534741688-611c3015569d?q=80&w=1200&auto=format&fit=crop';
        } else if (p.includes('seminar') || p.includes('workshop') || p.includes('event')) {
            img = 'https://images.unsplash.com/photo-1475721027785-f74dea327912?q=80&w=1200&auto=format&fit=crop';
        } else if (p.includes('news') || p.includes('breaking') || p.includes('official')) {
            img = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop';
        } else if (p.includes('holiday') || p.includes('close') || p.includes('alert')) {
            img = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop';
        }

        setAiResult(img);
        toast.success(`AI Banner for "${aiPrompt.substring(0, 20)}..." generated!`, { id: 'ai-gen', icon: '✨' });
        setAiGenerating(false);
    }, 3000);
  };

  const attachAiImage = (type) => {
    if (type === 'notice') setNotData(p => ({ ...p, img: aiResult }));
    if (type === 'news') setNewsData(p => ({ ...p, img: aiResult }));
    if (type === 'event') setEvtData(p => ({ ...p, img: aiResult }));
    toast.success(`Banner attached to ${type.toUpperCase()}!`);
    setIsAiModalOpen(false);
  };

  // 1. NOTICES logic
  const saveNotice = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = { text: notData.text, img: notData.img || '', updatedAt: serverTimestamp() };
      if (notData.id) {
        await updateDoc(doc(db, 'notices', notData.id), payload);
        toast.success('Notice Updated!');
      } else {
        await addDoc(collection(db, 'notices'), { ...payload, type: 'General', isNew: true, link: '', date: new Date().toISOString(), createdAt: serverTimestamp() });
        toast.success('Notice Published!');
      }
      setNotData({ id: null, text: '', img: '' });
    } catch(err) { toast.error(err.message); }
    setLoading(false);
  };

  // 2. NEWS logic
  const saveNews = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = { text: newsData.text, img: newsData.img || '', updatedAt: serverTimestamp() };
      if (newsData.id) {
        await updateDoc(doc(db, 'announcements', newsData.id), payload);
        toast.success('News Updated!');
      } else {
        await addDoc(collection(db, 'announcements'), { ...payload, isNew: true, link: '', date: new Date().toISOString(), createdAt: serverTimestamp() });
        toast.success('News Live!');
      }
      setNewsData({ id: null, text: '', img: '' });
    } catch(err) { toast.error(err.message); }
    setLoading(false);
  };

  // 3. EVENTS logic
  const saveEvent = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = { title: evtData.title, day: evtData.day, month: evtData.month, type: evtData.type, img: evtData.img || '', updatedAt: serverTimestamp() };
      if (evtData.id) {
        await updateDoc(doc(db, 'events', evtData.id), payload);
        toast.success('Event Updated!');
      } else {
        await addDoc(collection(db, 'events'), { ...payload, status: 'upcoming', location: 'Campus', desc: '', createdAt: serverTimestamp() });
        toast.success('Event Scheduled!', { icon: '🏆' });
      }
      setEvtData({ id: null, title: '', day: '', month: '', type: 'WORKSHOP', img: '' });
    } catch(err) { toast.error(err.message); }
    setLoading(false);
  };

  // 4. TICKER UPDATES logic
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
              <button type="button" onClick={() => onEdit(item)} style={{ background: '#fff', border: '1px solid #e2e8f0', cursor: 'pointer', fontSize: 12, padding: '4px 8px', borderRadius: 6, transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = accent} onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'} aria-label="Edit item">✏️</button>
              <button type="button" onClick={() => onDel(col, item.id, item.text || item.title)} style={{ background: '#fff', border: '1px solid #e2e8f0', cursor: 'pointer', fontSize: 12, padding: '4px 8px', borderRadius: 6, transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#ef4444'} onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'} aria-label="Delete item">🗑️</button>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, position: 'relative', zIndex: 10 }}>
        
        {/* 🤖 AI CREATION CORE (Top Section) */}
        <div className="qp-card" style={{ background: '#f1f5f9', gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: `1.5px solid ${NAVY}15`, flexWrap: 'wrap', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: '1 1 300px' }}>
                <div style={{ fontSize: 'clamp(32px, 8vw, 42px)', animation: 'spin 4s linear infinite', filter: `drop-shadow(0 0 10px ${GOLD}88)` }}>✨</div>
                <div>
                    <h3 style={{ margin: 0, color: NAVY, fontWeight: 900, fontSize: 'clamp(16px, 4vw, 20px)' }}>AI Content Suite</h3>
                    <p style={{ margin: 0, fontSize: 13, color: T.t3, fontWeight: 600 }}>Create custom banners, news posters, and social media assets.</p>
                </div>
            </div>
            <button className="qp-btn-pub" onClick={() => setIsAiModalOpen(true)} style={{ background: NAVY, minWidth: 200, width: '100%', flex: '1 1 200px' }}>
                🚀 Open Neural AI Studio
            </button>
        </div>

        {/* 🚀 1-CLICK MULTI-CHANNEL BROADCAST HUB */}
        <div className="qp-card" style={{
          gridColumn: '1 / -1',
          background: 'linear-gradient(135deg, #ffffff 0%, #fdfbf7 100%)',
          border: `2px solid ${GOLD}40`,
          boxShadow: '0 12px 36px rgba(15,35,71,0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20, borderBottom: `1.5px solid rgba(15,35,71,0.06)`, paddingBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: NAVY, color: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                📢
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 900, color: GOLD, textTransform: 'uppercase', letterSpacing: 1 }}>Official Omnichannel Dispatcher</div>
                <h3 style={{ margin: 0, color: NAVY, fontSize: 20, fontWeight: 900 }}>1-Click Multi-Channel Broadcast</h3>
              </div>
            </div>
            <span style={{ fontSize: 11, background: `${GOLD}18`, color: '#d97706', padding: '4px 12px', borderRadius: 20, fontWeight: 800, border: `1px solid ${GOLD}40` }}>
              ⚡ Syncs 5 Channels Simultaneously
            </span>
          </div>

          <form onSubmit={handleMultiChannelDispatch}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: NAVY, marginBottom: 6, textTransform: 'uppercase' }}>
                  📌 Notice / Announcement Title *
                </label>
                <input 
                  type="text" 
                  className="ainp" 
                  required
                  placeholder="e.g. UG Semester 4 Examination Schedule Released" 
                  value={mcTitle} 
                  onChange={e => setMcTitle(e.target.value)}
                  style={{ width: '100%', borderRadius: 10, padding: '10px 14px', border: '1.5px solid #e2e8f0', fontSize: 13.5, fontWeight: 600, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: NAVY, marginBottom: 6, textTransform: 'uppercase' }}>
                  🏷️ Category
                </label>
                <select 
                  className="ainp" 
                  value={mcCategory} 
                  onChange={e => setMcCategory(e.target.value)}
                  style={{ width: '100%', borderRadius: 10, padding: '10px 14px', border: '1.5px solid #e2e8f0', fontSize: 13, fontWeight: 700, boxSizing: 'border-box' }}
                >
                  <option value="EXAMINATION">📝 EXAMINATION</option>
                  <option value="ADMISSION">🎓 ADMISSION</option>
                  <option value="HOLIDAY">🏖️ HOLIDAY / RECESS</option>
                  <option value="SCHOLARSHIPS">💳 SCHOLARSHIPS & AID</option>
                  <option value="CULTURAL">🎭 CULTURAL & EVENTS</option>
                  <option value="PLACEMENT">💼 PLACEMENT / CAREERS</option>
                  <option value="GENERAL">📢 GENERAL NOTICE</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: NAVY, marginBottom: 6, textTransform: 'uppercase' }}>
                  👥 Target Audience
                </label>
                <select 
                  className="ainp" 
                  value={mcAudience} 
                  onChange={e => setMcAudience(e.target.value)}
                  style={{ width: '100%', borderRadius: 10, padding: '10px 14px', border: '1.5px solid #e2e8f0', fontSize: 13, fontWeight: 700, boxSizing: 'border-box' }}
                >
                  <option value="All Students & Staff">All Students & Staff</option>
                  <option value="UG Semester 1-6 Students">UG Semester 1-6 Students</option>
                  <option value="BCA & Vocational Wing">BCA & Vocational Wing</option>
                  <option value="Girls Wing (Bank More Campus)">Girls Wing (Bank More Campus)</option>
                  <option value="Faculty & Staff Members">Faculty & Staff Members</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: NAVY, marginBottom: 6, textTransform: 'uppercase' }}>
                📄 Full Details / Instructions *
              </label>
              <textarea 
                className="ainp" 
                rows={3} 
                required
                placeholder="Enter complete notice details, dates, room numbers, or links for students..."
                value={mcDetails} 
                onChange={e => setMcDetails(e.target.value)}
                style={{ width: '100%', borderRadius: 10, padding: '12px 14px', border: '1.5px solid #e2e8f0', fontSize: 13.5, boxSizing: 'border-box' }}
              />
            </div>

            {/* CHANNEL TOGGLE CHIPS */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: NAVY, marginBottom: 8, textTransform: 'uppercase' }}>
                📡 Select Dispatch Channels:
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, background: mcNotice ? `${NAVY}10` : '#f8fafc', padding: '8px 14px', borderRadius: 10, border: `1.5px solid ${mcNotice ? NAVY : '#e2e8f0'}`, cursor: 'pointer', fontSize: 12.5, fontWeight: 700, color: NAVY }}>
                  <input type="checkbox" checked={mcNotice} onChange={e => setMcNotice(e.target.checked)} />
                  📌 College Notice Board
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, background: mcAlert ? '#fee2e2' : '#f8fafc', padding: '8px 14px', borderRadius: 10, border: `1.5px solid ${mcAlert ? '#ef4444' : '#e2e8f0'}`, cursor: 'pointer', fontSize: 12.5, fontWeight: 700, color: '#b91c1c' }}>
                  <input type="checkbox" checked={mcAlert} onChange={e => setMcAlert(e.target.checked)} />
                  ⚡ Flash Alert Banner
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, background: mcTicker ? `${GOLD}18` : '#f8fafc', padding: '8px 14px', borderRadius: 10, border: `1.5px solid ${mcTicker ? GOLD : '#e2e8f0'}`, cursor: 'pointer', fontSize: 12.5, fontWeight: 700, color: '#b45309' }}>
                  <input type="checkbox" checked={mcTicker} onChange={e => setMcTicker(e.target.checked)} />
                  📢 Homepage Live Ticker
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, background: mcPush ? '#dcfce7' : '#f8fafc', padding: '8px 14px', borderRadius: 10, border: `1.5px solid ${mcPush ? '#22c55e' : '#e2e8f0'}`, cursor: 'pointer', fontSize: 12.5, fontWeight: 700, color: '#15803d' }}>
                  <input type="checkbox" checked={mcPush} onChange={e => setMcPush(e.target.checked)} />
                  🔔 Browser Push Notification
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <button 
                type="submit" 
                disabled={mcSending} 
                className="qp-btn-pub"
                style={{ background: NAVY, padding: '12px 28px', fontSize: 14, minWidth: 240 }}
              >
                {mcSending ? 'Broadcasting...' : '🚀 Broadcast Across Channels'}
              </button>
            </div>
          </form>

          {/* WHATSAPP BROADCAST PREVIEW & ACTION */}
          {mcGeneratedWhatsapp && (
            <div style={{
              marginTop: 24,
              background: '#f0fdf4',
              border: '1.5px solid #86efac',
              borderRadius: 16,
              padding: '20px',
              animation: 'fade-up 0.3s ease-out'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>💬</span>
                  <span style={{ fontWeight: 900, color: '#166534', fontSize: 14 }}>Official WhatsApp Broadcast Ready</span>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button 
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(mcGeneratedWhatsapp);
                      toast.success('WhatsApp text copied to clipboard! 📋');
                    }}
                    style={{ background: '#15803d', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}
                  >
                    📋 Copy Text
                  </button>
                  <a 
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(mcGeneratedWhatsapp)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ background: '#25D366', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                  >
                    📲 Open WhatsApp
                  </a>
                </div>
              </div>
              <pre style={{ margin: 0, background: '#ffffff', padding: '14px', borderRadius: 10, border: '1px solid #bbf7d0', fontSize: 12, lineHeight: 1.6, color: '#1e293b', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {mcGeneratedWhatsapp}
              </pre>
            </div>
          )}
        </div>

      {/* 🔮 NEURAL AI STUDIO MODAL */}
      {isAiModalOpen && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,35,71,.8)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100002, backdropFilter:'blur(12px)' }} onClick={()=>setIsAiModalOpen(false)}>
          <div style={{ background:WHITE, borderRadius:24, width:680, maxWidth:'90vw', boxShadow:'0 30px 60px rgba(0,0,0,.4)', padding:0, overflow:'hidden', animation: 'fade-up 0.3s ease-out' }} onClick={e=>e.stopPropagation()}>
            {/* Header */}
            <div style={{ background:`linear-gradient(135deg, ${NAVY}, #0a1b38)`, padding:'20px', color:'#fff', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                    <h2 style={{ margin:0, fontSize: 'clamp(16px, 5vw, 22px)', fontWeight:900, letterSpacing:'-0.5px' }}>🧠 Neural AI Studio</h2>
                    <p style={{ margin:0, fontSize:10, color:GOLD, fontWeight:800, textTransform:'uppercase', opacity:0.8 }}>GNC Semantic Engine v3.0</p>
                </div>
                <div style={{ fontSize: 'clamp(24px, 6vw, 32px)' }}>🧬</div>
            </div>

            {/* Body */}
            <div style={{ padding:'20px' }}>
                <div style={{ marginBottom:20 }}>
                    <label style={{ display:'block', fontSize:11, fontWeight:800, color:NAVY, marginBottom:8, textTransform:'uppercase' }}> Describe your Banner / Poster</label>
                    <textarea 
                        className="ainp" rows={3} 
                        style={{ borderRadius:16, border: '1.5px solid #f1f5f9', background: '#f8fafc', width:'100%', padding:12, boxSizing:'border-box', fontSize:14 }} 
                        value={aiPrompt} 
                        onChange={e => setAiPrompt(e.target.value)} 
                        placeholder="e.g. Annual Sports Day 2024..." 
                    />
                </div>

                {!aiResult ? (
                    <button className="abtn abtn-navy" 
                        style={{ width:'100%', height:54, borderRadius:16, justifyContent:'center', fontSize:16 }} 
                        onClick={handleAiGen} disabled={aiGenerating}
                    >
                        {aiGenerating ? '⚡ GENERATING NEURAL MATRIX...' : '✨ Build AI Banner'}
                    </button>
                ) : (
                    <div className="fade-in">
                        <div style={{ position:'relative', borderRadius:16, overflow:'hidden', border:`2px solid ${GOLD}`, boxShadow:'0 10px 20px rgba(0,0,0,0.1)', marginBottom:16 }}>
                            <img src={aiResult} style={{ width:'100%', height: 'clamp(180px, 40vw, 280px)', objectFit:'cover' }} />
                            <div style={{ position:'absolute', top:12, right:12, background:GOLD, color:NAVY, padding:'6px 12px', borderRadius:8, fontSize:10, fontWeight:900 }}>AI PREVIEW</div>
                        </div>
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12 }}>
                            <button className="abtn abtn-navy" style={{ borderRadius:12, fontSize:10, padding:'8px 4px' }} onClick={() => attachAiImage('notice')}>📌 Attach to Notice</button>
                            <button className="abtn abtn-navy" style={{ borderRadius:12, fontSize:10, padding:'8px 4px' }} onClick={() => attachAiImage('news')}>📣 Attach to News</button>
                            <button className="abtn abtn-navy" style={{ borderRadius:12, fontSize:10, padding:'8px 4px' }} onClick={() => attachAiImage('event')}>🏆 Attach to Event</button>
                        </div>
                        <button className="abtn abtn-outline" style={{ width:'100%', marginTop:12, borderRadius:12 }} onClick={() => setAiResult(null)}>🔄 Re-Generate</button>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div style={{ padding:'12px 20px', borderTop:'1px solid #f1f5f9', display:'flex', flexWrap: 'wrap', justifyContent:'space-between', alignItems:'center', background:'#f8fafc', gap: 10 }}>
                <span style={{ fontSize:9, color:T.t4, fontWeight:700 }}>Powered by OpenAI DALL-E (Simulated)</span>
                <button style={{ background:'transparent', border:'none', color:NAVY, fontWeight:800, cursor:'pointer', fontSize: 13 }} onClick={()=>setIsAiModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
        <div className={`qp-card ${notData.id ? 'active' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div className="qp-icon-box" style={{ background: '#eff6ff', color: '#3b82f6' }}>📢</div>
            <div className="qp-label">{notData.id ? 'Edit Notice' : 'Notice Board'}</div>
          </div>
          <form onSubmit={saveNotice} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <textarea className="ainp" rows={3} style={{ borderRadius:16, border: '1.5px solid #f1f5f9', background: '#f8fafc' }} value={notData.text} onChange={e => setNotData({ ...notData, text: e.target.value })} placeholder="Write notice content..." required />
            {notData.img && (
              <div style={{ position:'relative', borderRadius:12, overflow:'hidden', border:'2px solid #3b82f6' }}>
                <img src={notData.img} style={{ width:'100%', height:100, objectFit:'cover' }} />
                <button type="button" onClick={() => setNotData({...notData, img:''})} style={{ position:'absolute', top:4, right:4, background:'red', color:'#fff', border:'none', borderRadius:4, fontSize:10, cursor:'pointer' }} aria-label="Remove banner image">✕ Remove Banner</button>
              </div>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="qp-btn-pub" style={{ flex: 1 }} disabled={loading}>
                {loading ? '...' : notData.id ? '🔄 Update Notice' : '✨ Publish Notice'}
              </button>
              {notData.id && <button type="button" className="qp-btn-cancel" onClick={() => setNotData({id:null, text:'', img:''})}>✕</button>}
            </div>
          </form>
          <RecentList items={recentData.notices} col="notices" accent="#3b82f6" onDel={handleDelete} onEdit={item => setNotData({ id: item.id, text: item.text, img: item.img||'' })} />
        </div>

        {/* 2. NEWS */}
        <div className={`qp-card ${newsData.id ? 'active' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div className="qp-icon-box" style={{ background: '#f3e8ff', color: '#8b5cf6' }}>📣</div>
            <div className="qp-label">{newsData.id ? 'Edit Story' : 'Campus News'}</div>
          </div>
          <form onSubmit={saveNews} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <textarea className="ainp" rows={3} style={{ borderRadius:16, border: '1.5px solid #f1f5f9', background: '#f8fafc' }} value={newsData.text} onChange={e => setNewsData({ ...newsData, text: e.target.value })} placeholder="Write news announcement..." required />
            {newsData.img && (
              <div style={{ position:'relative', borderRadius:12, overflow:'hidden', border:'2px solid #8b5cf6' }}>
                <img src={newsData.img} style={{ width:'100%', height:100, objectFit:'cover' }} />
                <button type="button" onClick={() => setNewsData({...newsData, img:''})} style={{ position:'absolute', top:4, right:4, background:'red', color:'#fff', border:'none', borderRadius:4, fontSize:10, cursor:'pointer' }} aria-label="Remove banner image">✕ Remove Banner</button>
              </div>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="qp-btn-pub" style={{ flex: 1, background: '#8b5cf6' }} disabled={loading}>
                {loading ? '...' : newsData.id ? '🔄 Update News' : '✨ Push News LIVE'}
              </button>
              {newsData.id && <button type="button" className="qp-btn-cancel" onClick={() => setNewsData({id:null, text:'', img:''})}>✕</button>}
            </div>
          </form>
          <RecentList items={recentData.announcements} col="announcements" accent="#8b5cf6" onDel={handleDelete} onEdit={item => setNewsData({ id: item.id, text: item.text, img: item.img||'' })} />
        </div>

        {/* 3. EVENTS */}
        <div className={`qp-card ${evtData.id ? 'active' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div className="qp-icon-box" style={{ background: '#dcfce7', color: '#10b981' }}>🏆</div>
            <div className="qp-label">{evtData.id ? 'Edit Event' : 'Event Scheduler'}</div>
          </div>
          <form onSubmit={saveEvent} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input type="text" className="ainp" style={{ borderRadius:12, background: '#f8fafc' }} value={evtData.title} onChange={e => setEvtData({...evtData, title: e.target.value})} placeholder="Event Title..." required />
            <div style={{ display: 'flex', gap: 12 }}>
              <input type="text" className="ainp" style={{ borderRadius:12, background: '#f8fafc', flex: 1 }} value={evtData.day} onChange={e => setEvtData({...evtData, day: e.target.value})} placeholder="Day (e.g. 15)" required />
              <input type="text" className="ainp" style={{ borderRadius:12, background: '#f8fafc', flex: 1.5 }} value={evtData.month} onChange={e => setEvtData({...evtData, month: e.target.value})} placeholder="Month (e.g. MAR)" required />
            </div>
            <select className="ainp" style={{ borderRadius:12, background: '#f8fafc' }} value={evtData.type} onChange={e => setEvtData({...evtData, type: e.target.value})}>
              <option value="WORKSHOP">Workshop</option><option value="SEMINAR">Seminar</option><option value="CULTURAL">Cultural</option><option value="SPORTS">Sports</option>
            </select>
            {evtData.img && (
              <div style={{ position:'relative', borderRadius:12, overflow:'hidden', border:'2px solid #10b981', marginTop:8 }}>
                <img src={evtData.img} style={{ width:'100%', height:80, objectFit:'cover' }} />
                <button type="button" onClick={() => setEvtData({...evtData, img:''})} style={{ position:'absolute', top:4, right:4, background:'red', color:'#fff', border:'none', borderRadius:4, fontSize:10, cursor:'pointer' }} aria-label="Remove banner image">✕ Remove Banner</button>
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button type="submit" className="qp-btn-pub" style={{ flex: 1, background: '#10b981' }} disabled={loading}>
                {loading ? '...' : evtData.id ? '🔄 Update Event' : '📅 Schedule Now'}
              </button>
              {evtData.id && <button type="button" className="qp-btn-cancel" onClick={() => setEvtData({id:null, title:'', day:'', month:'', type:'WORKSHOP', img:''})}>✕</button>}
            </div>
          </form>
          <RecentList items={recentData.events} col="events" accent="#10b981" onDel={handleDelete} onEdit={item => setEvtData({ id: item.id, title: item.title, day: item.day||'', month: item.month||'', type: item.type||'WORKSHOP', img: item.img||'' })} />
        </div>

        {/* 4. TICKER UPDATES */}
        <div className={`qp-card ${updData.id ? 'active' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div className="qp-icon-box" style={{ background: '#fef3c7', color: '#d97706' }}>🔔</div>
            <div className="qp-label">{updData.id ? 'Edit Ticker' : 'Ticker Control'}</div>
          </div>
          <form onSubmit={saveUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <textarea className="ainp" rows={2} style={{ borderRadius:16, border: '1.5px solid #f1f5f9', background: '#f8fafc' }} value={updData.text} onChange={e => setUpdData({...updData, text: e.target.value})} placeholder="Ticker message..." required />
            <input type="text" className="ainp" style={{ borderRadius:12, background: '#f8fafc' }} value={updData.link} onChange={e => setUpdData({...updData, link: e.target.value})} placeholder="Optional Link (http://...)" />
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