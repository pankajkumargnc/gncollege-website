// src/components/admin/tabs/ContactTab.jsx
import { useState, useEffect, useRef } from 'react';
import { db } from "../../../firebase";
import {
  doc, setDoc, serverTimestamp,
  collection, getDocs, writeBatch, onSnapshot, query, orderBy
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD } from '../AdminShared';

export default function ContactTab() {
  const INP = {
    width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0',
    borderRadius: 9, fontSize: 13.5, fontFamily: 'inherit', color: '#334155',
    background: '#fff', outline: 'none', boxSizing: 'border-box',
  };
  const TEA = { ...INP, resize: 'vertical', minHeight: 70 };

  const [campus, setCampus] = useState({
    bhuda:    { phone: '', email: '', address: '' },
    bankMore: { phone: '', email: '', address: '' },
  });
  const [campusSaving, setCampusSaving] = useState(false);
  const [campusSaved,  setCampusSaved]  = useState(false);
  const campusTimerRef = useRef(null);

  const [directory, setDirectory] = useState([]);
  const [dirSaving,  setDirSaving]  = useState(false);
  const [dirSaved,   setDirSaved]   = useState(false);
  const dirTimerRef = useRef(null);

  useEffect(() => () => {
    if (campusTimerRef.current) clearTimeout(campusTimerRef.current);
    if (dirTimerRef.current)    clearTimeout(dirTimerRef.current);
  }, []);

  // Load campus contact settings
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'contact'), snap => {
      if (snap.exists()) {
        const d = snap.data();
        setCampus({
          bhuda:    { phone: d.bhuda?.phone||'',    email: d.bhuda?.email||'',    address: d.bhuda?.address||'' },
          bankMore: { phone: d.bankMore?.phone||'', email: d.bankMore?.email||'', address: d.bankMore?.address||'' },
        });
      }
    });
    return () => unsub();
  }, []);

  // Load contact directory
  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'contactDirectory'), orderBy('order', 'asc')),
      snap => setDirectory(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
      () => setDirectory([])
    );
    return () => unsub();
  }, []);

  const saveCampus = async () => {
    setCampusSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'contact'), { ...campus, updatedAt: serverTimestamp() }, { merge: true });
      setCampusSaved(true);
      toast.success('✅ Campus details saved!');
      if (campusTimerRef.current) clearTimeout(campusTimerRef.current);
      campusTimerRef.current = setTimeout(() => setCampusSaved(false), 2500);
    } catch (e) { toast.error('Save failed: ' + e.message); }
    setCampusSaving(false);
  };

  const saveDirectory = async () => {
    setDirSaving(true);
    try {
      const batch = writeBatch(db);
      const existing = await getDocs(collection(db, 'contactDirectory'));
      existing.docs.forEach(d => batch.delete(doc(db, 'contactDirectory', d.id)));
      directory.forEach((entry, i) => {
        const ref = entry.id
          ? doc(db, 'contactDirectory', entry.id)
          : doc(collection(db, 'contactDirectory'));
        batch.set(ref, {
          icon:  entry.icon  || '📞',
          title: entry.title || '',
          name:  entry.name  || '',
          phone: entry.phone || '',
          order: i,
          updatedAt: serverTimestamp(),
        });
      });
      await batch.commit();
      setDirSaved(true);
      toast.success('✅ Directory saved!');
      if (dirTimerRef.current) clearTimeout(dirTimerRef.current);
      dirTimerRef.current = setTimeout(() => setDirSaved(false), 2500);
    } catch (e) { toast.error('Directory save failed: ' + e.message); }
    setDirSaving(false);
  };

  const setC = (campus_key, field, val) =>
    setCampus(p => ({ ...p, [campus_key]: { ...p[campus_key], [field]: val } }));

  const addDir  = () => setDirectory(p => [...p, { icon: '📞', title: '', name: '', phone: '', order: p.length }]);
  const delDir  = (i) => setDirectory(p => p.filter((_, j) => j !== i));
  const updDir  = (i, k, v) => setDirectory(p => p.map((e, j) => j === i ? { ...e, [k]: v } : e));

  const SH = ({ txt }) => (
    <div style={{ fontWeight: 800, fontSize: 13.5, color: NAVY, margin: '24px 0 12px', paddingBottom: 8, borderBottom: '2px solid #f1f5f9' }}>{txt}</div>
  );

  const SaveBar = ({ saving, saved, onSave, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 20 }}>
      <button
        onClick={onSave}
        disabled={saving}
        style={{
          background: saving ? '#94a3b8' : `linear-gradient(135deg,${NAVY},#1a3a7c)`,
          color: '#fff', border: 'none', padding: '11px 28px', borderRadius: 10,
          cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 800, fontSize: 13.5,
          fontFamily: 'inherit', boxShadow: saving ? 'none' : `0 4px 14px ${NAVY}28`,
        }}>
        {saving ? '⏳ Saving...' : label}
      </button>
      {saved && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#d1fae5', color: '#065f46', padding: '8px 16px', borderRadius: 9, fontSize: 13, fontWeight: 700 }}>
          ✅ Saved! Contact page auto-update ho gaya.
        </div>
      )}
    </div>
  );

  const campusCards = [
    { key: 'bhuda',    label: '🏛️ Bhuda Campus',    sub: 'Main campus contact details' },
    { key: 'bankMore', label: '🏢 Bank More Campus', sub: 'Branch campus contact details' },
  ];

  return (
    <div className="fade-up" style={{ fontFamily: "'DM Sans','Plus Jakarta Sans',sans-serif", maxWidth: 1000 }}>
      <p className="asec">📞 Contact Settings</p>
      <p className="asub">Campus addresses aur contact directory — Contact page pe auto-update hoga</p>

      {/* ── Campus Contact ── */}
      <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: 14, padding: 20, marginBottom: 16 }}>
        <SH txt="🏫 Campus Contact Details" />
        <p style={{ fontSize: 12.5, color: '#94a3b8', margin: '0 0 18px' }}>
          Firebase path: <code style={{ background: '#f1f5f9', padding: '1px 6px', borderRadius: 4, fontSize: 11.5 }}>settings/contact</code>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 16 }}>
          {campusCards.map(({ key, label, sub }) => (
            <div key={key} style={{ background: '#f8fafc', border: '1.5px solid #f1f5f9', borderRadius: 12, padding: '18px 18px 14px' }}>
              <div style={{ fontWeight: 800, color: NAVY, fontSize: 14, marginBottom: 3 }}>{label}</div>
              <div style={{ fontSize: 11.5, color: '#94a3b8', marginBottom: 16 }}>{sub}</div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#64748b', marginBottom: 5 }}>📞 Phone / WhatsApp</div>
                <input style={INP} value={campus[key].phone} onChange={e => setC(key, 'phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#64748b', marginBottom: 5 }}>✉ Email</div>
                <input style={INP} type="email" value={campus[key].email} onChange={e => setC(key, 'email', e.target.value)} placeholder="contact@gnc.ac.in" />
              </div>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#64748b', marginBottom: 5 }}>📍 Full Address</div>
                <textarea style={TEA} value={campus[key].address} onChange={e => setC(key, 'address', e.target.value)} placeholder="Building name, Street, City — PIN" rows={3} />
              </div>
            </div>
          ))}
        </div>
        <SaveBar saving={campusSaving} saved={campusSaved} onSave={saveCampus} label="💾 Save Campus Details" />
      </div>

      {/* ── Contact Directory ── */}
      <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: 14, padding: 20 }}>
        <SH txt="📋 Contact Directory (Officials list)" />
        <p style={{ fontSize: 12.5, color: '#94a3b8', margin: '0 0 16px' }}>
          Firebase path: <code style={{ background: '#f1f5f9', padding: '1px 6px', borderRadius: 4, fontSize: 11.5 }}>contactDirectory/{`{docId}`}</code>
          &nbsp;— Contact page pe yahi list dikhti hai
        </p>

        {directory.map((entry, i) => (
          <div key={entry.id || i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 1fr auto', gap: 10, alignItems: 'center', marginBottom: 10 }}>
            <div>
              {i === 0 && <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 5 }}>Icon</div>}
              <input style={{ ...INP, textAlign: 'center', fontSize: 18 }} value={entry.icon} onChange={e => updDir(i, 'icon', e.target.value)} placeholder="📞" />
            </div>
            <div>
              {i === 0 && <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 5 }}>Title / Role</div>}
              <input style={INP} value={entry.title} onChange={e => updDir(i, 'title', e.target.value)} placeholder="Principal" />
            </div>
            <div>
              {i === 0 && <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 5 }}>Name</div>}
              <input style={INP} value={entry.name} onChange={e => updDir(i, 'name', e.target.value)} placeholder="Dr. S.K. Sharma" />
            </div>
            <div>
              {i === 0 && <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 5 }}>Phone</div>}
              <input style={INP} value={entry.phone} onChange={e => updDir(i, 'phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
            </div>
            <button
              onClick={() => delDir(i)}
              style={{
                background: '#fee2e2', border: 'none', color: '#ef4444',
                width: 30, height: 30, borderRadius: 8, cursor: 'pointer',
                fontSize: 13, fontWeight: 800, marginTop: i === 0 ? 22 : 0, flexShrink: 0,
              }}>✕</button>
          </div>
        ))}

        <button
          onClick={addDir}
          style={{
            width: '100%', padding: '9px 16px', border: '1.5px dashed #cbd5e1',
            background: 'transparent', color: '#64748b', borderRadius: 9, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, marginTop: 8, transition: 'all .16s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = NAVY; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#64748b'; }}>
          + Add Directory Entry
        </button>

        <SaveBar saving={dirSaving} saved={dirSaved} onSave={saveDirectory} label="💾 Save Directory" />
      </div>
    </div>
  );
}
