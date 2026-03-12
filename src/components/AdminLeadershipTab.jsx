// src/components/AdminLeadershipTab.jsx
// ✅ NEW: Admin tab to manage leadership records (Presidents / Secretaries / Principals)
// Firebase collection: 'leadership'
// Fields: type, name, from, to, photo, note, createdAt
//
// HOW TO ADD TO AdminPanel.jsx:
//   1. Import: import AdminLeadershipTab from './AdminLeadershipTab';
//   2. In TABS array add: { id: 'leadership', icon: '🏛️', label: 'Leadership', section: '' }
//   3. In tab content: {activeTab === 'leadership' && <AdminLeadershipTab />}

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  collection, query, orderBy, onSnapshot,
  addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';

// ── Config ────────────────────────────────────────────────────────────────────
const TYPES = [
  { value: 'president', label: '🏛️ President',  color: '#0f2347' },
  { value: 'secretary', label: '📋 Secretary',   color: '#1a3a7c' },
  { value: 'principal', label: '🎓 Principal',   color: '#155e2d' },
];

const CURRENT_YEAR = String(new Date().getFullYear());

const EMPTY_FORM = {
  type:  'president',
  name:  '',
  from:  '',
  to:    '',
  photo: '',
  note:  '',
};

const FALLBACK = '/images/college_photo.jpg';

// ── Styles ────────────────────────────────────────────────────────────────────
const S = {
  wrap: {
    fontFamily: "'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif",
    color: '#334155',
  },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    flexWrap: 'wrap', gap: 12, marginBottom: 24,
  },
  title: {
    fontSize: '1.2rem', fontWeight: 800, color: '#0f2347', margin: 0,
  },
  addBtn: {
    display: 'flex', alignItems: 'center', gap: 7,
    background: '#0f2347', color: '#fff',
    border: 'none', borderRadius: 8, padding: '10px 20px',
    fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
    transition: 'background 0.2s',
  },
  typeTabs: {
    display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap',
  },
  typeTab: (active, color) => ({
    padding: '8px 18px', borderRadius: 8,
    border: `1.5px solid ${active ? color : '#e2e8f0'}`,
    background: active ? color : '#fff',
    color: active ? '#fff' : '#64748b',
    fontSize: '0.85rem', fontWeight: 700,
    cursor: 'pointer', transition: 'all 0.18s',
  }),
  card: {
    background: '#fff', border: '1px solid #e8f0fa',
    borderRadius: 12, padding: '16px 18px',
    marginBottom: 10, display: 'flex',
    gap: 16, alignItems: 'flex-start',
    transition: 'box-shadow 0.2s',
  },
  avatar: {
    width: 56, height: 56, borderRadius: 8,
    objectFit: 'cover', border: '1.5px solid #e2e8f0',
    flexShrink: 0, background: '#f1f5f9',
  },
  cardBody: { flex: 1, minWidth: 0 },
  cardName: { fontWeight: 800, color: '#0f2347', fontSize: '0.98rem', marginBottom: 4 },
  badge: (color) => ({
    display: 'inline-block', background: '#f4a023',
    color: '#fff', fontSize: '0.75rem', fontWeight: 700,
    padding: '2px 10px', borderRadius: 5, marginBottom: 6,
  }),
  currentBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    background: '#0f2347', color: '#fff',
    fontSize: '0.7rem', fontWeight: 700,
    padding: '2px 8px', borderRadius: 20, marginLeft: 6,
  },
  cardNote: { fontSize: '0.83rem', color: '#64748b', margin: 0 },
  actions: { display: 'flex', gap: 7, alignItems: 'center', flexShrink: 0 },
  editBtn: {
    background: '#f1f5f9', border: 'none', borderRadius: 7,
    padding: '6px 13px', fontSize: '0.8rem', fontWeight: 700,
    color: '#334155', cursor: 'pointer',
  },
  delBtn: {
    background: '#fff0f0', border: 'none', borderRadius: 7,
    padding: '6px 13px', fontSize: '0.8rem', fontWeight: 700,
    color: '#c0392b', cursor: 'pointer',
  },
  empty: {
    textAlign: 'center', padding: '48px 24px',
    color: '#94a3b8',
  },

  // Modal
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 999999,
    background: 'rgba(6,14,28,0.65)',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000000,
    background: '#fff',
    borderRadius: 16,
    width: 'calc(100vw - 40px)',
    maxWidth: 560,
    maxHeight: '88vh',
    overflowY: 'auto',
    boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
  },
  modalHead: {
    background: 'linear-gradient(135deg, #0f2347 0%, #1a3a7c 100%)',
    padding: '20px 24px 16px',
    borderRadius: '16px 16px 0 0',
  },
  modalTitle: {
    color: '#fff', fontWeight: 800, fontSize: '1.05rem', margin: 0,
  },
  modalBody: { padding: '24px' },
  label: {
    display: 'block', fontSize: '0.8rem', fontWeight: 700,
    color: '#475569', marginBottom: 6,
    textTransform: 'uppercase', letterSpacing: '0.04em',
  },
  input: {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid #e2e8f0', borderRadius: 8,
    fontSize: '0.92rem', color: '#0f2347', fontWeight: 600,
    background: '#fff', outline: 'none',
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    transition: 'border-color 0.2s',
  },
  select: {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid #e2e8f0', borderRadius: 8,
    fontSize: '0.92rem', color: '#0f2347', fontWeight: 600,
    background: '#fff', outline: 'none', cursor: 'pointer',
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  },
  textarea: {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid #e2e8f0', borderRadius: 8,
    fontSize: '0.88rem', color: '#334155',
    background: '#fff', outline: 'none', resize: 'vertical',
    minHeight: 80, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    lineHeight: 1.6,
  },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  saveBtn: {
    width: '100%', padding: '12px',
    background: '#0f2347', color: '#fff',
    border: 'none', borderRadius: 8,
    fontSize: '0.95rem', fontWeight: 800,
    cursor: 'pointer', marginTop: 4,
    transition: 'background 0.2s',
  },
  cancelBtn: {
    width: '100%', padding: '11px',
    background: '#f1f5f9', color: '#64748b',
    border: 'none', borderRadius: 8,
    fontSize: '0.88rem', fontWeight: 700,
    cursor: 'pointer', marginTop: 8,
  },
  photoPreview: {
    width: 64, height: 64, borderRadius: 8,
    objectFit: 'cover', border: '2px solid #e2e8f0',
    marginTop: 8, background: '#f1f5f9',
  },
  tip: {
    fontSize: '0.75rem', color: '#94a3b8',
    marginTop: 5, fontStyle: 'italic',
  },
};

// ── Main Component ─────────────────────────────────────────────────────────────
const AdminLeadershipTab = () => {
  const [records,  setRecords]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [activeType, setActiveType] = useState('president');
  const [showModal, setShowModal] = useState(false);
  const [editing,  setEditing]  = useState(null); // null = new, else record
  const [form,     setForm]     = useState({ ...EMPTY_FORM });
  const [saving,   setSaving]   = useState(false);
  const [confirmDel, setConfirmDel] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const previewTimer = useRef(null);
  const modalRef = useRef(null);

  // Fetch all leadership records
  useEffect(() => {
    const q = query(
      collection(db, 'leadership'),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, snap => {
      setRecords(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  // Filter by active type
  const filtered = records
    .filter(r => r.type === activeType)
    .sort((a, b) => parseInt(b.from || 0) - parseInt(a.from || 0));

  const typeInfo = TYPES.find(t => t.value === activeType) || TYPES[0];

  // ── Open modal ──
  const openAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM, type: activeType });
    setPreviewUrl('');
    setShowModal(true);
  };

  const openEdit = (r) => {
    setEditing(r);
    setForm({
      type:  r.type  || activeType,
      name:  r.name  || '',
      from:  r.from  || '',
      to:    r.to    || '',
      photo: r.photo || '',
      note:  r.note  || '',
    });
    setPreviewUrl(r.photo || '');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
    setForm({ ...EMPTY_FORM, type: activeType });
    setPreviewUrl('');
    clearTimeout(previewTimer.current);
  };

  // ── Save ──
  const handleSave = async () => {
    if (!form.name.trim()) return toast.error('Name is required');
    if (!form.from.trim()) return toast.error('From year is required');
    setSaving(true);
    try {
      const data = {
        type:  form.type,
        name:  form.name.trim(),
        from:  form.from.trim(),
        to:    form.to.trim() || 'Present',
        photo: form.photo.trim(),
        note:  form.note.trim(),
      };
      if (editing) {
        await updateDoc(doc(db, 'leadership', editing.id), {
          ...data, updatedAt: serverTimestamp(),
        });
        toast.success('Record updated ✅');
      } else {
        await addDoc(collection(db, 'leadership'), {
          ...data, createdAt: serverTimestamp(),
        });
        toast.success('Record added ✅');
      }
      closeModal();
    } catch (e) {
      toast.error('Save failed: ' + e.message);
    }
    setSaving(false);
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'leadership', id));
      toast.success('Deleted');
    } catch (e) {
      toast.error('Delete failed: ' + e.message);
    }
    setConfirmDel(null);
  };

  // ── Counts ──
  const countsByType = TYPES.reduce((acc, t) => {
    acc[t.value] = records.filter(r => r.type === t.value).length;
    return acc;
  }, {});

  return (
    <div style={S.wrap}>

      {/* Header */}
      <div style={S.header}>
        <div>
          <h3 style={S.title}>🏛️ Leadership Management</h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.83rem', color: '#94a3b8' }}>
            Manage Presidents, Secretaries &amp; Principals over the years
          </p>
        </div>
        <button
          style={S.addBtn}
          onClick={openAdd}
          onMouseOver={e => e.currentTarget.style.background = '#1a3a7c'}
          onMouseOut={e => e.currentTarget.style.background = '#0f2347'}
        >
          <span style={{ fontSize: 16 }}>＋</span>
          Add {typeInfo.label.split(' ')[1]}
        </button>
      </div>

      {/* Type tabs */}
      <div style={S.typeTabs}>
        {TYPES.map(t => (
          <button
            key={t.value}
            style={S.typeTab(activeType === t.value, t.color)}
            onClick={() => setActiveType(t.value)}
          >
            {t.label}
            <span style={{
              marginLeft: 7, background: activeType === t.value ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
              color: activeType === t.value ? '#fff' : '#94a3b8',
              fontSize: '0.72rem', fontWeight: 800, borderRadius: 20, padding: '1px 7px',
            }}>
              {countsByType[t.value] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ padding: '32px 0' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              ...S.card,
              opacity: 1 - (i - 1) * 0.25,
              background: 'linear-gradient(90deg,#f8f9fa 25%,#f1f5f9 50%,#f8f9fa 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
            }}>
              <div style={{ width: 56, height: 56, borderRadius: 8, background: '#e2e8f0', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 14, width: '45%', background: '#e2e8f0', borderRadius: 4, marginBottom: 10 }} />
                <div style={{ height: 20, width: '28%', background: '#fde8c8', borderRadius: 4, marginBottom: 10 }} />
                <div style={{ height: 11, width: '60%', background: '#e2e8f0', borderRadius: 4 }} />
              </div>
            </div>
          ))}
          <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
        </div>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <div style={S.empty}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>📋</div>
          <p style={{ fontWeight: 700, color: '#64748b', margin: '0 0 6px', fontSize: '0.95rem' }}>
            No {typeInfo.label.split(' ')[1].toLowerCase()}s added yet
          </p>
          <p style={{ margin: 0, fontSize: '0.83rem' }}>
            Click "Add {typeInfo.label.split(' ')[1]}" to get started
          </p>
        </div>
      )}

      {/* Records list */}
      {!loading && filtered.map(r => (
        <div
          key={r.id}
          style={{
            ...S.card,
            borderLeft: r.to === 'Present' || !r.to ? '3px solid #f4a023' : '3px solid transparent',
          }}
          onMouseOver={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(15,35,71,0.1)'}
          onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
        >
          <img
            src={r.photo || FALLBACK}
            alt={r.name}
            style={S.avatar}
            onError={e => { e.target.src = FALLBACK; }}
          />
          <div style={S.cardBody}>
            <div style={S.cardName}>
              {r.name}
              {(r.to === 'Present' || !r.to) && (
                <span style={S.currentBadge}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80' }} />
                  Current
                </span>
              )}
            </div>
            <div style={S.badge()}>
              📅 {r.from} – {r.to || 'Present'}
              {(() => {
                const f = parseInt(r.from, 10);
                const t = r.to?.toLowerCase() === 'present' || !r.to
                  ? new Date().getFullYear()
                  : parseInt(r.to, 10);
                const d = !isNaN(f) && !isNaN(t) ? t - f : 0;
                return d > 0 ? ` · ${d} yr${d > 1 ? 's' : ''}` : '';
              })()}
            </div>
            {r.note && <p style={S.cardNote}>{r.note}</p>}
          </div>
          <div style={S.actions}>
            <button
              style={S.editBtn}
              onClick={() => openEdit(r)}
            >✏️ Edit</button>
            <button
              style={S.delBtn}
              onClick={() => setConfirmDel(r)}
            >🗑️</button>
          </div>
        </div>
      ))}

      {/* ── Add/Edit Modal ── */}
      {showModal && createPortal(
        <div style={S.overlay} onClick={e => e.target === e.currentTarget && closeModal()}>
          <div style={S.modal} ref={modalRef}>

            {/* Modal header */}
            <div style={S.modalHead}>
              <h3 style={S.modalTitle}>
                {editing ? '✏️ Edit Record' : `＋ Add ${typeInfo.label.split(' ')[1]}`}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', margin: '4px 0 0' }}>
                Firestore collection: leadership
              </p>
            </div>

            <div style={S.modalBody}>
              {/* Type selector */}
              <div style={{ marginBottom: 16 }}>
                <label style={S.label}>Type</label>
                <select
                  style={S.select}
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                >
                  {TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div style={{ marginBottom: 16 }}>
                <label style={S.label}>Full Name *</label>
                <input
                  style={S.input}
                  placeholder="Dr. Gurjit Singh"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = '#0f2347'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* From / To */}
              <div style={{ ...S.row2, marginBottom: 16 }}>
                <div>
                  <label style={S.label}>From Year *</label>
                  <input
                    style={S.input}
                    placeholder="2018"
                    value={form.from}
                    maxLength={4}
                    onChange={e => setForm(f => ({ ...f, from: e.target.value.replace(/\D/g, '') }))}
                    onFocus={e => e.target.style.borderColor = '#0f2347'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
                <div>
                  <label style={S.label}>To Year</label>
                  <input
                    style={S.input}
                    placeholder="2022 or Present"
                    value={form.to}
                    onChange={e => setForm(f => ({ ...f, to: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = '#0f2347'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <p style={S.tip}>Leave blank or type "Present" for current</p>
                </div>
              </div>

              {/* Photo URL */}
              <div style={{ marginBottom: 16 }}>
                <label style={S.label}>Photo URL (optional)</label>
                <input
                  style={S.input}
                  placeholder="https://i.ibb.co/... or /images/principal.jpg"
                  value={form.photo}
                  onChange={e => {
                    const val = e.target.value;
                    setForm(f => ({ ...f, photo: val }));
                    // Debounce preview — update only after user stops typing 800ms
                    clearTimeout(previewTimer.current);
                    previewTimer.current = setTimeout(() => setPreviewUrl(val), 800);
                  }}
                  onFocus={e => e.target.style.borderColor = '#0f2347'}
                  onBlur={e => {
                    e.target.style.borderColor = '#e2e8f0';
                    // Update preview immediately on blur
                    clearTimeout(previewTimer.current);
                    setPreviewUrl(form.photo);
                  }}
                />
                {previewUrl && (
                  <img
                    key={previewUrl}
                    src={previewUrl}
                    alt="preview"
                    style={S.photoPreview}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                )}
                <p style={S.tip}>ImgBB link paste karo ya /images/ local path use karo</p>
              </div>

              {/* Note / Achievement */}
              <div style={{ marginBottom: 20 }}>
                <label style={S.label}>Notable Achievement / Note (optional)</label>
                <textarea
                  style={S.textarea}
                  placeholder="e.g. Under whose tenure NAAC B++ grade was awarded..."
                  value={form.note}
                  onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = '#0f2347'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Live preview */}
              {form.name && (
                <div style={{
                  background: '#f8fafc', border: '1px solid #e8f0fa',
                  borderRadius: 10, padding: '14px 16px', marginBottom: 20,
                }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 10px' }}>
                    Preview
                  </p>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <img
                      key={previewUrl}
                      src={previewUrl || FALLBACK}
                      alt="preview"
                      style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', border: '1.5px solid #e2e8f0', background: '#f1f5f9' }}
                      onError={e => { e.target.src = FALLBACK; }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f2347', fontSize: '0.95rem' }}>{form.name}</div>
                      <div style={{
                        display: 'inline-block', background: '#f4a023',
                        color: '#fff', fontSize: '0.75rem', fontWeight: 700,
                        padding: '2px 9px', borderRadius: 5, marginTop: 4,
                      }}>
                        {form.from || 'YYYY'} – {form.to || 'Present'}
                      </div>
                      {form.note && (
                        <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '6px 0 0' }}>
                          {form.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <button
                style={{ ...S.saveBtn, opacity: saving ? 0.7 : 1 }}
                onClick={handleSave}
                disabled={saving}
                onMouseOver={e => !saving && (e.currentTarget.style.background = '#1a3a7c')}
                onMouseOut={e => !saving && (e.currentTarget.style.background = '#0f2347')}
              >
                {saving ? '⏳ Saving...' : editing ? '✅ Update Record' : '✅ Save Record'}
              </button>
              <button style={S.cancelBtn} onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      , document.body)}

      {/* ── Confirm Delete Modal ── */}
      {confirmDel && createPortal(
        <div style={S.overlay} onClick={e => e.target === e.currentTarget && setConfirmDel(null)}>
          <div style={{
            position: 'fixed',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000000,
            background: '#fff', borderRadius: 14,
            width: 'calc(100% - 32px)', maxWidth: 400,
            padding: 28, textAlign: 'center',
            boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h4 style={{ color: '#0f2347', fontWeight: 800, margin: '0 0 8px', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
              Delete Record?
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 20px', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
              "<strong>{confirmDel.name}</strong>" ({confirmDel.from}–{confirmDel.to || 'Present'}) will be permanently deleted.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                style={{ ...S.cancelBtn, flex: 1, margin: 0 }}
                onClick={() => setConfirmDel(null)}
              >
                Cancel
              </button>
              <button
                style={{
                  flex: 1, padding: '11px',
                  background: '#c0392b', color: '#fff',
                  border: 'none', borderRadius: 8,
                  fontSize: '0.88rem', fontWeight: 800, cursor: 'pointer',
                }}
                onClick={() => handleDelete(confirmDel.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      , document.body)}

    </div>
  );
};

export default AdminLeadershipTab;