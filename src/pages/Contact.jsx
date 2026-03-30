 //src/pages/Contact.jsx
// ✅ FIREBASE CONNECTED — settings/contact + contactDirectory collection
//
// AdminPanel mein ye 2 cheezein manage hoti hain:
//   1. Firestore → settings/contact → { bhuda:{phone,email,address}, bankMore:{phone,email,address} }
//   2. Firestore → contactDirectory collection → { title, name, phone, icon, order }
//
// AdminPanel mein "Contact Settings" tab add karo (neeche structure diya hai)

import React, { useEffect, useState } from 'react';
import { doc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';

// ── Default fallback — jab tak Firebase se data na aaye ────────────────────
const DEFAULT_CONTACT = {
  bhuda:    { phone: '+91 79033 40991', email: 'info@gncollege.org',        address: 'Guru Nanak College, Bhuda\nDhanbad, Jharkhand - 826001'     },
  bankMore: { phone: '',               email: 'vocational@gncollege.org',   address: 'Guru Nanak College, Bank More\nDhanbad, Jharkhand - 826001' },
};

const DEFAULT_DIRECTORY = [
  { id:'1', title:"Prof. In-Charge (Bhuda Campus)",      name:"Prof. [Name Here]", phone:"+91 XXXXX XXXXX", icon:"👩‍🏫", order:1 },
  { id:'2', title:"Prof. In-Charge (Bank More Campus)",  name:"Prof. [Name Here]", phone:"+91 XXXXX XXXXX", icon:"👩‍🏫", order:2 },
  { id:'3', title:"BCA Coordinator",                     name:"Prof. [Name Here]", phone:"+91 XXXXX XXXXX", icon:"💻",  order:3 },
  { id:'4', title:"Member, Women's Cell",                name:"Prof. [Name Here]", phone:"+91 XXXXX XXXXX", icon:"🛡️", order:4 },
  { id:'5', title:"Member, Anti-Ragging Squad",          name:"Prof. [Name Here]", phone:"+91 XXXXX XXXXX", icon:"🛑", order:5 },
  { id:'6', title:"P.A. to Principal",                   name:"Mr. [Name Here]",   phone:"+91 XXXXX XXXXX", icon:"📝", order:6 },
];

export default function Contact() {
  const [contactInfo, setContactInfo] = useState(DEFAULT_CONTACT);
  const [directory,   setDirectory]   = useState(DEFAULT_DIRECTORY);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // ── 1. Campus contact info ─────────────────────────────────────────────
    const unsubContact = onSnapshot(doc(db, 'settings', 'contact'), snap => {
      if (snap.exists()) {
        const d = snap.data();
        setContactInfo({
          bhuda:    { ...DEFAULT_CONTACT.bhuda,    ...(d.bhuda    || {}) },
          bankMore: { ...DEFAULT_CONTACT.bankMore, ...(d.bankMore || {}) },
        });
      }
      setLoading(false);
    }, () => setLoading(false));

    // ── 2. Directory cards ─────────────────────────────────────────────────
    const unsubDir = onSnapshot(
      query(collection(db, 'contactDirectory'), orderBy('order', 'asc')),
      snap => {
        if (!snap.empty) {
          setDirectory(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        }
      },
      () => {} // silent fail — defaults stay
    );

    return () => { unsubContact(); unsubDir(); };
  }, []);

  const { bhuda, bankMore } = contactInfo;

  return (
    <div className="profile-page-wrapper">
      <style>{`
        @keyframes fadeInUp {
          0%   { opacity:0; transform:translateY(30px); }
          100% { opacity:1; transform:translateY(0);    }
        }
        .contact-header {
          background: linear-gradient(135deg, ${COLORS.navy} 0%, #0a1832 100%);
          color: white; padding: 80px 20px 140px; text-align: center; position: relative;
        }
        .header-title { font-size:46px; font-weight:900; margin:0; letter-spacing:-1px; animation:fadeInUp .6s ease-out forwards; }
        .header-title span { color:${COLORS.gold}; }
        .header-sub { font-size:16px; color:#cbd5e1; margin:15px auto 0; max-width:600px; animation:fadeInUp .6s ease-out .2s forwards; opacity:0; line-height:1.6; }

        .campus-container { max-width:1200px; margin:-120px auto 40px; padding:0 20px; display:grid; grid-template-columns:repeat(auto-fit,minmax(400px,1fr)); gap:40px; position:relative; z-index:10; }
        .campus-card { background:#fff; border-radius:20px; overflow:hidden; box-shadow:0 15px 40px rgba(0,0,0,0.07); border:1px solid #e2e8f0; transition:all .4s ease; opacity:0; animation:fadeInUp .8s ease-out forwards; display:flex; flex-direction:column; }
        .campus-card:hover { transform:translateY(-10px); box-shadow:0 25px 50px rgba(15,35,71,.12); border-color:${COLORS.gold}; }
        .card-1 { animation-delay:.3s; } .card-2 { animation-delay:.5s; }

        .card-header { padding:25px 30px; display:flex; align-items:center; gap:15px; background:#fafbfc; border-bottom:1px solid #edf2f7; }
        .campus-icon { width:55px; height:55px; background:rgba(244,160,35,.15); color:${COLORS.gold}; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; flex-shrink:0; }
        .campus-title { font-size:24px; font-weight:800; color:${COLORS.navy}; margin:0; }
        .campus-badge { font-size:11px; padding:4px 10px; border-radius:20px; font-weight:700; margin-top:6px; display:inline-block; letter-spacing:.5px; }

        .card-details { padding:25px 30px; flex-grow:1; }
        .detail-row { display:flex; align-items:flex-start; gap:15px; margin-bottom:20px; }
        .detail-row:last-child { margin-bottom:0; }
        .d-icon { font-size:20px; color:${COLORS.navy}; margin-top:2px; }
        .d-text h4 { margin:0 0 4px; font-size:13px; text-transform:uppercase; letter-spacing:.5px; font-weight:700; color:#718096; }
        .d-text p, .d-text a { margin:0; font-size:15px; color:#2d3748; font-weight:600; text-decoration:none; line-height:1.5; transition:color .2s; white-space:pre-line; }
        .d-text a:hover { color:${COLORS.gold}; }

        .map-container { width:100%; height:250px; border-top:1px solid #edf2f7; }
        .map-container iframe { width:100%; height:100%; border:none; filter:grayscale(10%) contrast(1.05); transition:all .4s; }
        .campus-card:hover .map-container iframe { filter:grayscale(0%) contrast(1); }

        .directory-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:1.5rem; }
        .directory-card { background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:1.5rem; display:flex; align-items:center; gap:1.5rem; transition:all .3s; }
        .directory-card:hover { transform:translateY(-5px); border-color:${COLORS.gold}; box-shadow:0 8px 25px rgba(15,35,71,.08); }
        .dir-icon { font-size:1.8rem; width:50px; height:50px; display:flex; align-items:center; justify-content:center; background:#f1f5f9; border-radius:50%; flex-shrink:0; }
        .dir-title { font-size:.8rem; text-transform:uppercase; letter-spacing:1px; color:#64748b; font-weight:700; margin-bottom:4px; }
        .dir-name  { font-size:1.1rem; font-weight:800; color:${COLORS.navy}; margin-bottom:6px; }
        .dir-contact { font-size:.9rem; font-weight:600; color:#4a5568; text-decoration:none; }
        .dir-contact:hover { color:${COLORS.gold}; }

        @media(max-width:900px) { .campus-container { grid-template-columns:1fr; } }
        @media(max-width:768px) { .contact-header { padding:60px 20px 80px; } .header-title { font-size:36px; } .campus-container { margin-top:-60px; } }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] .campus-card {
          background: rgba(10, 22, 48, 0.9) !important;
          border-color: rgba(244,160,35,0.15) !important;
          box-shadow: 0 15px 40px rgba(0,0,0,0.4) !important;
        }
        [data-theme="dark"] .card-header {
          background: rgba(6,14,28,0.8) !important;
          border-bottom-color: rgba(255,255,255,0.06) !important;
        }
        [data-theme="dark"] .campus-title { color: #f1f5f9 !important; }
        [data-theme="dark"] .d-text h4 { color: #64748b !important; }
        [data-theme="dark"] .d-text p, [data-theme="dark"] .d-text a { color: #cbd5e1 !important; }
        [data-theme="dark"] .d-text a:hover { color: #f4a023 !important; }
        [data-theme="dark"] .map-container { border-top-color: rgba(255,255,255,0.06) !important; }
        [data-theme="dark"] .map-container iframe { filter: invert(90%) hue-rotate(180deg) !important; }
        [data-theme="dark"] .directory-card {
          background: rgba(10, 22, 48, 0.85) !important;
          border-color: rgba(255,255,255,0.08) !important;
        }
        [data-theme="dark"] .directory-card:hover { border-color: #f4a023 !important; }
        [data-theme="dark"] .dir-icon { background: rgba(244,160,35,0.1) !important; }
        [data-theme="dark"] .dir-title { color: #64748b !important; }
        [data-theme="dark"] .dir-name { color: #f1f5f9 !important; }
        [data-theme="dark"] .dir-contact { color: #94a3b8 !important; }
        [data-theme="dark"] .dir-contact:hover { color: #f4a023 !important; }
      `}</style>

      {/* Hero */}
      <header className="contact-header">
        <h1 className="header-title">Get In <span>Touch</span></h1>
        <p className="header-sub">We are here to assist you. Reach out to our respective campuses or directly contact our administration team for any queries.</p>
      </header>

      {/* Campus Cards */}
      <div className="campus-container">

        {/* Bhuda Campus */}
        <div className="campus-card card-1">
          <div className="card-header">
            <div className="campus-icon">🏛️</div>
            <div>
              <h2 className="campus-title">Bhuda Campus</h2>
              <span className="campus-badge" style={{ background:COLORS.navy, color:'#fff' }}>Main Campus • Boys Wing</span>
            </div>
          </div>
          <div className="card-details">
            <div className="detail-row">
              <div className="d-icon">📍</div>
              <div className="d-text"><h4>Location</h4><p>{bhuda.address}</p></div>
            </div>
            {bhuda.phone && (
              <div className="detail-row">
                <div className="d-icon">📞</div>
                <div className="d-text"><h4>Helpdesk</h4><a href={`tel:${bhuda.phone}`}>{bhuda.phone}</a></div>
              </div>
            )}
            {bhuda.email && (
              <div className="detail-row">
                <div className="d-icon">✉️</div>
                <div className="d-text"><h4>Email ID</h4><a href={`mailto:${bhuda.email}`}>{bhuda.email}</a></div>
              </div>
            )}
          </div>
          <div className="map-container">
            <iframe title="Bhuda Campus Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.089853381653!2d86.43232147533682!3d23.797658878638367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69707963d7e8b%3A0x86733221469e7f7b!2sGuru%20Nanak%20College%20Dhanbad!5e0!3m2!1sen!2sin!4v1708688000000!5m2!1sen!2sin"
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>

        {/* Bank More Campus */}
        <div className="campus-card card-2">
          <div className="card-header">
            <div className="campus-icon">🏢</div>
            <div>
              <h2 className="campus-title">Bank More Campus</h2>
              <span className="campus-badge" style={{ background:COLORS.gold, color:COLORS.navyDark || COLORS.navy }}>Girls Wing • Vocational Studies</span>
            </div>
          </div>
          <div className="card-details">
            <div className="detail-row">
              <div className="d-icon">📍</div>
              <div className="d-text"><h4>Location</h4><p>{bankMore.address}</p></div>
            </div>
            {bankMore.phone ? (
              <div className="detail-row">
                <div className="d-icon">📞</div>
                <div className="d-text"><h4>Helpdesk</h4><a href={`tel:${bankMore.phone}`}>{bankMore.phone}</a></div>
              </div>
            ) : (
              <div className="detail-row">
                <div className="d-icon">📞</div>
                <div className="d-text"><h4>Helpdesk</h4><p style={{ color:'#a0aec0', fontStyle:'italic' }}>Admin Panel se number add karein</p></div>
              </div>
            )}
            {bankMore.email && (
              <div className="detail-row">
                <div className="d-icon">✉️</div>
                <div className="d-text"><h4>Email ID</h4><a href={`mailto:${bankMore.email}`}>{bankMore.email}</a></div>
              </div>
            )}
          </div>
          <div className="map-container">
            <iframe title="Bank More Campus Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.630325992144!2d86.4175863149822!3d23.77601898456687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6a3048817a859%3A0x8d365f7d34c52968!2sGuru%20Nanak%20College%20Womens%20Wing!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>

      {/* Directory */}
      <div className="profile-container" style={{ marginTop:0 }}>
        <section className="glass-panel profile-section anim-slide-up" style={{ animationDelay:'.3s', background:'transparent', boxShadow:'none', border:'none' }}>
          <h2 className="section-heading" style={{ textAlign:'center' }}>Administration Directory</h2>
          <div className="heading-underline" style={{ margin:'0 auto 30px' }} />

          {loading ? (
            <div style={{ textAlign:'center', padding:'40px', color:'#64748b', fontWeight:700 }}>Loading directory...</div>
          ) : (
            <div className="directory-grid">
              {directory.map(person => (
                <div key={person.id} className="directory-card">
                  <div className="dir-icon">{person.icon || '👤'}</div>
                  <div>
                    <div className="dir-title">{person.title}</div>
                    <div className="dir-name">{person.name}</div>
                    {person.phone && (
                      <a href={`tel:${person.phone}`} className="dir-contact">📞 {person.phone}</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}