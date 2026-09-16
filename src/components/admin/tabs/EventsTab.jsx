// src/components/admin/tabs/EventsTab.jsx
import { useState } from "react";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { Trophy, Calendar, MapPin, Clock, Plus, Edit2, Trash2, Camera, CalendarDays, CheckCircle2, X } from 'lucide-react';
import MediaPicker from "../../MediaPicker";
import {
  T,
  NAVY,
  GOLD,
  BG,
  useLocalDraft,
  SectionSearch,
  BulkBar,
  MiniLog,
} from "../AdminShared";
import { resolveUrl } from "../../../utils/resolver";

const TYPES = [
  "Cultural",
  "Sports",
  "Academic",
  "Technical",
  "Workshop",
  "Seminar",
  "Competition",
  "Other",
];

export default function EventsTab({
  events,
  logAct,
  getSectionLog,
  softDelete,
  bulkDelete,
}) {
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData, clearDraft] = useLocalDraft("event", {
    title: "",
    date: "",
    venue: "",
    type: "Cultural",
    description: "",
    image: "",
    reportLink: "",
    status: "recent",
    publishDate: "",
    expiryDate: "",
  });
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listTab, setListTab] = useState("upcoming");

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData };
      if (payload.status === "upcoming") {
        payload.image = "";
        payload.description = "";
      }
      // Clean scheduling fields
      if (!payload.publishDate) delete payload.publishDate;
      if (!payload.expiryDate) delete payload.expiryDate;
      if (editItem) {
        await updateDoc(doc(db, "events", editItem.id), {
          ...payload,
          updatedAt: serverTimestamp(),
        });
        toast.success("Event updated!");
      } else {
        await addDoc(collection(db, "events"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        toast.success(
          payload.status === "upcoming"
            ? "Upcoming Event Published!"
            : "Recent Event Published!",
        );
      }
      logAct(editItem ? "update" : "add", `Event: ${formData.title}`, "events");
      setEditItem(null);
      clearDraft();
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  // ── Scheduling status helper ──
  const getScheduleStatus = (ev) => {
    const now = new Date();
    if (ev.publishDate && new Date(ev.publishDate) > now) return { label: 'Scheduled', bg: '#fefce8', color: '#d97706' };
    if (ev.expiryDate && new Date(ev.expiryDate) < now) return { label: 'Expired', bg: '#fee2e2', color: '#dc2626' };
    return { label: 'Live', bg: '#dcfce7', color: '#16a34a' };
  };

  const filtered = (events || []).filter(
    (ev) =>
      !search ||
      ev.title?.toLowerCase().includes(search.toLowerCase()) ||
      ev.type?.toLowerCase().includes(search.toLowerCase()),
  );
  const displayedEvents = filtered.filter((ev) =>
    listTab === "upcoming"
      ? ev.status === "upcoming"
      : ev.status !== "upcoming",
  );

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <Trophy size={24} color={GOLD} />
        <h2 style={{ margin: 0, fontWeight: 900, color: NAVY, fontSize: 'clamp(20px, 5vw, 24px)', letterSpacing: '-0.5px' }}>Events & Activities Manager</h2>
      </div>
      <p style={{ margin: '4px 0 14px', color: T.t3, fontSize: 13, fontWeight: 600 }}>Manage campus events, academic seminars, sports competitions, and cultural celebrations</p>

      {/* ── Destination indicator ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(124, 58, 237, 0.08) 100%)',
        border: '1.5px solid rgba(147, 51, 234, 0.2)',
        borderRadius: 14, padding: '12px 16px', margin: '0 0 20px',
      }}>
        <Trophy size={22} color="#6b21a8" />
        <div>
          <div style={{ fontWeight: 800, fontSize: 13, color: '#6b21a8' }}>
            Live Destination: Homepage Card 2 (Upcoming Events) &amp; /events Page
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
            "Upcoming" events show in Homepage Card 2 (News &amp; Events). "Recent" events show with photo reports in the College Activity gallery.
          </div>
        </div>
      </div>

      <div className="card-gold">
        <div className="actitle" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {editItem ? <Edit2 size={16} color={GOLD} /> : <Plus size={16} color={GOLD} />}
          <span>{editItem ? "Edit Event" : "Create New Event"}</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 20,
            background: "#f8fafc",
            padding: 8,
            borderRadius: 12,
            border: `1px solid ${T.b1}`,
          }}
        >
          <button
            type="button"
            onClick={() => setFormData((d) => ({ ...d, status: "upcoming" }))}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: 8,
              border: "none",
              fontWeight: 800,
              cursor: "pointer",
              transition: ".2s",
              background: formData.status === "upcoming" ? GOLD : "transparent",
              color: formData.status === "upcoming" ? "#000" : T.t2,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
          >
            <CalendarDays size={16} /> Upcoming Event
          </button>
          <button
            type="button"
            onClick={() => setFormData((d) => ({ ...d, status: "recent" }))}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: 8,
              border: "none",
              fontWeight: 800,
              cursor: "pointer",
              transition: ".2s",
              background: formData.status === "recent" ? NAVY : "transparent",
              color: formData.status === "recent" ? "#fff" : T.t2,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
          >
            <Camera size={16} /> Recent / Completed Event
          </button>
        </div>

        <form onSubmit={save}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 14,
              marginBottom: 14,
            }}
          >
            <div>
              <label className="alabel">Event Title *</label>
              <input
                className="ainp"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData((d) => ({ ...d, title: e.target.value }))
                }
                required
                placeholder="Annual Sports Meet 2025"
              />
            </div>
            <div>
              <label className="alabel">Date</label>
              <input
                className="ainp"
                type="date"
                value={formData.date || ""}
                onChange={(e) =>
                  setFormData((d) => ({ ...d, date: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="alabel">Venue</label>
              <input
                className="ainp"
                value={formData.venue || ""}
                onChange={(e) =>
                  setFormData((d) => ({ ...d, venue: e.target.value }))
                }
                placeholder="College Ground / Auditorium"
              />
            </div>
            <div>
              <label className="alabel">Type</label>
              <select
                className="ainp"
                value={formData.type || "Cultural"}
                onChange={(e) =>
                  setFormData((d) => ({ ...d, type: e.target.value }))
                }
              >
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {formData.status === "recent" && (
            <>
              <div style={{ marginBottom: 14 }}>
                <label className="alabel">Description</label>
                <textarea
                  className="ainp"
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, description: e.target.value }))
                  }
                  placeholder="Event details..."
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <MediaPicker
                  label="Event Image (From Drive)"
                  value={formData.image || ""}
                  onChange={(url) => setFormData((d) => ({ ...d, image: url }))}
                  type="image"
                  compact
                  driveFolderId={import.meta.env.VITE_DRIVE_IMAGES_FOLDER}
                />
              </div>
            </>
          )}

          <div style={{ marginBottom: 20 }}>
            {/* ✅ FIX: VITE_DRIVE_EVENT_REPORTS_FOLDER → VITE_DRIVE_EVENT_REPORTS_FOLDER */}
            <MediaPicker
              label="PDF Document Link"
              value={formData.reportLink || ""}
              onChange={(url) =>
                setFormData((d) => ({ ...d, reportLink: url }))
              }
              type="pdf"
              compact
              driveFolderId={import.meta.env.VITE_DRIVE_EVENT_REPORTS_FOLDER}
            />
          </div>

          {/* ── Content Scheduling ── */}
          <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16, marginBottom: 20, border: `1px solid ${T.b1}` }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={15} color={NAVY} /> Scheduling Options <span style={{ fontSize: 11, color: T.t4, fontWeight: 600 }}>(optional)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
              <div>
                <label className="alabel">Publish Date</label>
                <input className="ainp" type="datetime-local" value={formData.publishDate || ''}
                  onChange={(e) => setFormData((d) => ({ ...d, publishDate: e.target.value }))}
                />
                <div style={{ fontSize: 10, color: T.t4, marginTop: 4 }}>Leave empty to publish immediately</div>
              </div>
              <div>
                <label className="alabel">Expiry Date</label>
                <input className="ainp" type="datetime-local" value={formData.expiryDate || ''}
                  onChange={(e) => setFormData((d) => ({ ...d, expiryDate: e.target.value }))}
                />
                <div style={{ fontSize: 10, color: T.t4, marginTop: 4 }}>Leave empty for no expiry</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit" className="abtn abtn-gold" disabled={loading} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={16} />
              {loading ? 'Processing…' : editItem ? "Update Event" : "Publish Event"}
            </button>
            {editItem && (
              <button
                type="button"
                className="abtn abtn-outline"
                onClick={() => {
                  setEditItem(null);
                  clearDraft();
                  setFormData((d) => ({ ...d, status: "recent" }));
                }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <X size={15} /> Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <SectionSearch
        value={search}
        onChange={setSearch}
        placeholder="Search events by title or category..."
      />
      <BulkBar
        count={selected.length}
        onDelete={() => {
          bulkDelete("events", selected);
          setSelected([]);
        }}
        onClear={() => setSelected([])}
      />

      <div className="card">
        <div
          style={{
            display: "flex",
            gap: 15,
            marginBottom: 20,
            borderBottom: `2px solid ${T.b1}`,
          }}
        >
          {[
            { id: "upcoming", label: "Upcoming Events", icon: CalendarDays },
            { id: "recent", label: "Recent / Past Events", icon: Camera },
          ].map(({ id, label, icon: TabIcon }) => (
            <button
              key={id}
              onClick={() => {
                setListTab(id);
                setSelected([]);
              }}
              style={{
                background: "none",
                border: "none",
                fontSize: 15,
                fontWeight: listTab === id ? 900 : 600,
                color: listTab === id ? NAVY : T.t3,
                cursor: "pointer",
                borderBottom: listTab === id ? `3px solid ${NAVY}` : "none",
                paddingBottom: 10,
                transition: "0.2s",
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <TabIcon size={16} />
              {label}
            </button>
          ))}
        </div>
        <div className="actitle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{listTab === "upcoming" ? "Upcoming Events" : "Recent Events"}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.t3, fontVariantNumeric: 'tabular-nums' }}>{displayedEvents.length} records</span>
        </div>
        {displayedEvents.map((ev) => (
          <div
            key={ev.id}
            className={`arow ${selected.includes(ev.id) ? "selected" : ""}`}
          >
            <input
              type="checkbox"
              checked={selected.includes(ev.id)}
              onChange={() =>
                setSelected((s) =>
                  s.includes(ev.id)
                    ? s.filter((x) => x !== ev.id)
                    : [...s, ev.id],
                )
              }
              style={{ accentColor: NAVY }}
            />
            {ev.image && (
              <img
                src={resolveUrl(ev.image)}
                alt=""
                referrerPolicy="no-referrer"
                onError={(e) => { e.target.style.display = 'none'; }}
                style={{
                  width: 52,
                  height: 44,
                  objectFit: "cover",
                  borderRadius: 8,
                  flexShrink: 0,
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  marginBottom: 4,
                  flexWrap: "wrap",
                }}
              >
                <span
                  className="abadge"
                  style={{
                    background:
                      ev.status === "upcoming" ? "#fef3c7" : "#e0e7ff",
                    color: ev.status === "upcoming" ? "#d97706" : "#3730a3",
                    fontWeight: 900,
                  }}
                >
                  {ev.status === "upcoming" ? "Upcoming" : "Recent"}
                </span>
                <span
                  className="abadge"
                  style={{ background: `${NAVY}12`, color: NAVY }}
                >
                  {ev.type}
                </span>
                {ev.date && (
                  <span
                    className="abadge"
                    style={{ background: BG, color: T.t2, display: 'inline-flex', alignItems: 'center', gap: 4, fontVariantNumeric: 'tabular-nums' }}
                  >
                    <Calendar size={12} /> {new Date(ev.date).toLocaleDateString("en-IN")}
                  </span>
                )}
                {ev.venue && (
                  <span
                    className="abadge"
                    style={{ background: BG, color: T.t3, display: 'inline-flex', alignItems: 'center', gap: 4 }}
                  >
                    <MapPin size={12} /> {ev.venue}
                  </span>
                )}
                {(() => { const s = getScheduleStatus(ev); return <span className="abadge" style={{ background: s.bg, color: s.color, fontWeight: 800 }}>{s.label}</span>; })()}
                {ev.publishDate && <span className="abadge" style={{ background: '#f0fdf4', color: T.t3, fontSize: 10, fontVariantNumeric: 'tabular-nums' }}>{new Date(ev.publishDate).toLocaleDateString('en-IN', {day:'2-digit', month:'short'})}</span>}
                {ev.expiryDate && <span className="abadge" style={{ background: '#fefce8', color: '#d97706', fontSize: 10, fontVariantNumeric: 'tabular-nums' }}>{new Date(ev.expiryDate).toLocaleDateString('en-IN', {day:'2-digit', month:'short'})}</span>}
              </div>
              <div style={{ fontWeight: 700, color: NAVY, fontSize: 14 }}>
                {ev.title}
              </div>
              {ev.description && (
                <div style={{ fontSize: 12, color: T.t3, marginTop: 3 }}>
                  {ev.description.substring(0, 80)}…
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="abtn abtn-outline abtn-sm"
                onClick={() => {
                  setEditItem(ev);
                  setFormData({
                    title: ev.title || "",
                    date: ev.date || "",
                    venue: ev.venue || "",
                    type: ev.type || "Cultural",
                    description: ev.description || "",
                    image: ev.image || "",
                    reportLink: ev.reportLink || ev.pdfLink || "",
                    status: ev.status || "recent",
                    publishDate: ev.publishDate || "",
                    expiryDate: ev.expiryDate || "",
                  });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                aria-label="Edit event"
              >
                <Edit2 size={13} />
              </button>
              <button
                className="abtn abtn-red abtn-sm"
                onClick={() => softDelete("events", ev.id, ev, ev.title)}
                aria-label="Delete event"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
        {displayedEvents.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 0", color: T.t4 }}>
            No events found in this category
          </div>
        )}
      </div>
      <MiniLog logs={getSectionLog("events")} />
    </div>
  );
}
