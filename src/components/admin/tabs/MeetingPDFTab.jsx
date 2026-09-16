// src/components/admin/tabs/MeetingPDFTab.jsx
// Shared tab — used for both GB Meetings (gb_meetings) and Staff Council (staff_council)
// Usage in AdminPanel.jsx:
//   <MeetingPDFTab collectionName="gb_meetings"   title="Governing Body (GB) Meetings" subtitle="..." accentColor="#0f2347" icon="📋" {...sharedProps} />
//   <MeetingPDFTab collectionName="staff_council" title="Staff Council Meetings"        subtitle="..." accentColor="#1a3a7c" icon="👨‍🏫" {...sharedProps} />

import { useState, useEffect, useRef } from 'react';
import { db } from "../../../firebase";
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, onSnapshot, query, orderBy,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { FileText, Calendar, ExternalLink, Edit2, Trash2, Plus, Info, UploadCloud } from 'lucide-react';
import { T, NAVY, GOLD, WHITE } from '../AdminShared';

export default function MeetingPDFTab({
  collectionName,
  title,
  subtitle,
  accentColor,
  icon,
  logAct,
  getSectionLog,
}) {
  const [meetings, setMeetings] = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [search,   setSearch]   = useState('');
  const [form,     setForm]     = useState({ title: '', date: '', pdfUrl: '', notes: '' });

  const topRef = useRef(null);

  // Live snapshot
  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy('date', 'desc'));
    const unsub = onSnapshot(
      q,
      snap => setMeetings(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
      () => {}
    );
    return () => unsub();
  }, [collectionName]);

  const resetForm = () => {
    setForm({ title: '', date: '', pdfUrl: '', notes: '' });
    setEditItem(null);
  };

  const save = async e => {
    e.preventDefault();
    if (!form.title || !form.date || !form.pdfUrl) {
      toast.error('Title, Date, and PDF Link are required!');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        title:     form.title.trim(),
        date:      form.date,
        pdfUrl:    form.pdfUrl.trim(),
        notes:     form.notes.trim(),
        updatedAt: serverTimestamp(),
      };
      if (editItem) {
        await updateDoc(doc(db, collectionName, editItem.id), payload);
        toast.success('Meeting updated!');
        logAct?.('update', `Updated: ${form.title}`, collectionName);
      } else {
        await addDoc(collection(db, collectionName), { ...payload, createdAt: serverTimestamp() });
        toast.success('Meeting added!');
        logAct?.('add', `Added: ${form.title}`, collectionName);
      }
      resetForm();
    } catch (err) {
      toast.error('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    await deleteDoc(doc(db, collectionName, id));
    toast.success('Deleted!');
    logAct?.('delete', `Deleted: ${name}`, collectionName);
  };

  const startEdit = m => {
    setEditItem(m);
    setForm({ title: m.title, date: m.date, pdfUrl: m.pdfUrl, notes: m.notes || '' });
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filtered = meetings.filter(m =>
    !search ||
    m.title?.toLowerCase().includes(search.toLowerCase()) ||
    m.date?.includes(search) ||
    m.notes?.toLowerCase().includes(search.toLowerCase())
  );

  const publicPath = collectionName === 'gb_meetings'
    ? '/about-us/governing-body'
    : '/about-us/staff-council';

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        {icon && <span style={{ color: accentColor || GOLD, display: 'inline-flex' }}>{icon}</span>}
        <h2 className="asec" ref={topRef} style={{ margin: 0 }}>{title}</h2>
      </div>
      <p className="asub">{subtitle}</p>

      {/* ── Form ── */}
      <div className="card-gold">
        <div className="actitle" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {editItem ? <Edit2 size={16} /> : <Plus size={16} />}
          <span>{editItem ? 'Edit Meeting Record' : 'Add Meeting PDF'}</span>
        </div>
        <form onSubmit={save}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 14 }}>
            <div style={{ gridColumn: '1/-1' }}>
              <label className="alabel">Meeting Title *</label>
              <input
                className="ainp"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. GB Meeting — Quarterly Review Q1 2025"
                required
              />
            </div>
            <div>
              <label className="alabel">Meeting Date *</label>
              <input
                className="ainp"
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                required
              />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label className="alabel">PDF Link * (Google Drive or Direct URL)</label>
              <input
                className="ainp"
                value={form.pdfUrl}
                onChange={e => setForm(f => ({ ...f, pdfUrl: e.target.value }))}
                placeholder="https://drive.google.com/file/d/... or direct PDF URL"
                required
              />
              {form.pdfUrl && (
                <a
                  href={form.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 12, color: accentColor || GOLD, marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 700 }}>
                  <ExternalLink size={12} /> PDF Preview Test
                </a>
              )}
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label className="alabel">Notes / Agenda (optional)</label>
              <textarea
                className="ainp"
                rows={2}
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="e.g. Discussed budget approval, new admissions, NAAC preparation..."
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading}>
              {loading ? 'Saving…' : editItem ? 'Update Meeting' : 'Add Meeting'}
            </button>
            {editItem && (
              <button type="button" className="abtn abtn-outline" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      {/* ── Search ── */}
      <div className="sec-search" style={{ marginBottom: 16 }}>
        <input
          className="ainp"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by title, date, or notes..."
          style={{ paddingLeft: 36 }}
        />
      </div>

      {/* ── Info Banner ── */}
      <div style={{ background: '#fffbeb', border: '1.5px solid #f59e0b', borderRadius: 12, padding: '12px 18px', marginBottom: 20, fontSize: 13, color: '#92400e', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <Info size={18} style={{ flexShrink: 0, marginTop: 2, color: '#d97706' }} />
        <div>
          <strong>How to use:</strong> Upload the meeting PDF to Google Drive → Share → Anyone with link → Paste the link here.
          These meetings will automatically show on the <code style={{ background: '#fef3c7', padding: '1px 4px', borderRadius: 4 }}>{publicPath}</code> page.
        </div>
      </div>

      {/* ── List ── */}
      <div className="card">
        <div className="actitle" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {icon && <span style={{ color: accentColor || GOLD }}>{icon}</span>}
          <span>All Meetings ({filtered.length})</span>
          {filtered.length !== meetings.length && (
            <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 8 }}>filtered from {meetings.length}</span>
          )}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <FileText size={42} strokeWidth={1.5} color="#94a3b8" />
            </div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>No meetings found</div>
            <div style={{ fontSize: 13 }}>{search ? 'Clear search' : 'Add your first meeting using the form above'}</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(m => (
              <div key={m.id} className="arow" style={{ borderLeft: `4px solid ${accentColor || GOLD}` }}>
                {/* Date Badge */}
                <div style={{
                  background: accentColor || GOLD, color: WHITE,
                  borderRadius: 10, padding: '8px 12px', textAlign: 'center',
                  flexShrink: 0, minWidth: 60,
                }}>
                  <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                    {m.date ? new Date(m.date).getDate().toString().padStart(2, '0') : '--'}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, marginTop: 3, opacity: 0.85 }}>
                    {m.date ? new Date(m.date).toLocaleString('en-IN', { month: 'short' }).toUpperCase() : '--'}
                  </div>
                  <div style={{ fontSize: 9, opacity: 0.7, fontVariantNumeric: 'tabular-nums' }}>
                    {m.date ? new Date(m.date).getFullYear() : ''}
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>{m.title}</div>
                  {m.notes && (
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 4, lineHeight: 1.5 }}>{m.notes}</div>
                  )}
                  <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <a
                      href={m.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: 12, color: accentColor || GOLD, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <FileText size={13} /> View PDF
                    </a>
                    <span style={{ fontSize: 11, color: '#cbd5e1' }}>•</span>
                    <span style={{ fontSize: 11, color: '#94a3b8', fontVariantNumeric: 'tabular-nums' }}>
                      Added: {m.createdAt?.toDate?.()?.toLocaleDateString('en-IN') || 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                  <button className="abtn abtn-outline abtn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }} onClick={() => startEdit(m)}>
                    <Edit2 size={12} /> Edit
                  </button>
                  <button className="abtn abtn-red abtn-sm" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => remove(m.id, m.title)} aria-label="Delete meeting">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
