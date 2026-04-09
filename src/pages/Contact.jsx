 //src/pages/Contact.jsx
// ✅ FIREBASE CONNECTED — settings/contact + contactDirectory collection
// ✅ UUPM Compliant: Labels, inline validation, toast feedback, free form submission

import React, { useEffect, useState, useRef } from 'react';
import { doc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import toast from 'react-hot-toast';
import { Send, MapPin, Phone, Mail, User, AtSign, FileText, MessageSquare } from 'lucide-react';

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

// ── Contact Form with Labels, Validation, Toast ─────────────────────
function ContactForm() {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);

  const validate = (name, value) => {
    switch(name) {
      case 'name': return value.trim().length < 2 ? 'Please enter your full name' : '';
      case 'email': return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email' : '';
      case 'subject': return value.trim().length < 3 ? 'Subject must be at least 3 characters' : '';
      case 'message': return value.trim().length < 10 ? 'Message must be at least 10 characters' : '';
      default: return '';
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(err => ({ ...err, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const data = new FormData(form);
    
    // Validate all fields
    const newErrors = {};
    let hasError = false;
    for (const [name, value] of data.entries()) {
      const err = validate(name, value);
      if (err) { newErrors[name] = err; hasError = true; }
    }
    setErrors(newErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    if (hasError) {
      // Focus first invalid field
      const firstErrorField = Object.keys(newErrors)[0];
      form.querySelector(`[name="${firstErrorField}"]`)?.focus();
      toast.error('Please fix the errors before submitting');
      return;
    }

    setSending(true);

    try {
      // Free submission via FormSubmit.co — no API key, no signup, free forever
      const res = await fetch('https://formsubmit.co/ajax/info@gncollege.org', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          _subject: `📬 GNC Website: ${data.get('subject')}`,
        }),
      });

      if (res.ok) {
        toast.success('Message sent successfully! We will get back to you soon.', { duration: 5000 });
        form.reset();
        setErrors({});
        setTouched({});
      } else {
        toast.error('Something went wrong. Please try again.', { duration: 4000 });
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.', { duration: 4000 });
    } finally {
      setSending(false);
    }
  };

  const fieldClass = (name) => `form-input${touched[name] && errors[name] ? ' error' : ''}${touched[name] && !errors[name] ? ' valid' : ''}`;

  return (
    <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div className="form-field">
          <label htmlFor="cf-name" className="form-label required-mark">
            <User size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
            Full Name
          </label>
          <input id="cf-name" type="text" name="name" placeholder="Enter your full name" required className={fieldClass('name')} onBlur={handleBlur} autoComplete="name" />
          {touched.name && errors.name && <div className="form-error" role="alert"><span>⚠</span> {errors.name}</div>}
        </div>
        <div className="form-field">
          <label htmlFor="cf-email" className="form-label required-mark">
            <AtSign size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
            Email Address
          </label>
          <input id="cf-email" type="email" name="email" placeholder="you@example.com" required className={fieldClass('email')} onBlur={handleBlur} autoComplete="email" />
          {touched.email && errors.email && <div className="form-error" role="alert"><span>⚠</span> {errors.email}</div>}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="cf-subject" className="form-label required-mark">
          <FileText size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
          Subject
        </label>
        <input id="cf-subject" type="text" name="subject" placeholder="What is your inquiry about?" required className={fieldClass('subject')} onBlur={handleBlur} />
        {touched.subject && errors.subject && <div className="form-error" role="alert"><span>⚠</span> {errors.subject}</div>}
      </div>
      <div className="form-field">
        <label htmlFor="cf-message" className="form-label required-mark">
          <MessageSquare size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
          Message
        </label>
        <textarea id="cf-message" name="message" placeholder="Type your message here..." required rows="5" className={fieldClass('message')} onBlur={handleBlur} style={{ resize: 'vertical' }}></textarea>
        {touched.message && errors.message && <div className="form-error" role="alert"><span>⚠</span> {errors.message}</div>}
      </div>
      
      <button type="submit" className="form-submit-btn" disabled={sending}>
        {sending ? (
          <><span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }}></span> Sending...</>
        ) : (
          <><Send size={16} /> Send Message</>
        )}
      </button>
    </form>
  );
}

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
        .header-title { font-size:clamp(28px, 5vw, 46px); font-weight:900; margin:0; letter-spacing:-1px; animation:fadeInUp .6s ease-out forwards; color: #ffffff; }
        .header-title span { color:${COLORS.gold}; }
        .header-sub { font-size:clamp(14px, 1.8vw, 16px); color:#cbd5e1; margin:15px auto 0; max-width:600px; animation:fadeInUp .6s ease-out .2s forwards; opacity:0; line-height:1.6; text-align: center; }

        .campus-container { max-width:1200px; margin:-120px auto 40px; padding:0 20px; display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%, 400px),1fr)); gap:40px; position:relative; z-index:10; }
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
        .d-text p { margin:0; font-size:15px; color:#2d3748; font-weight:600; line-height:1.5; white-space:pre-line; }
        .d-text a { margin:0; font-size:15px; color:#2d3748; font-weight:600; text-decoration:none; line-height:1.5; transition:color .2s; white-space:pre-line; display: inline-flex; align-items: center; min-height: 44px; }
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
        .dir-contact { font-size:.9rem; font-weight:600; color:#4a5568; text-decoration:none; display: inline-flex; align-items: center; min-height: 44px; margin-top: -6px; }
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
            <div className="directory-grid">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="directory-card" style={{ opacity: 0.7 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',
                    backgroundSize: '200% 100%', animation: 'gnc-shimmer 1.4s ease-in-out infinite',
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ height: 10, borderRadius: 5, width: '60%', marginBottom: 8,
                      background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',
                      backgroundSize: '200% 100%', animation: 'gnc-shimmer 1.4s ease-in-out infinite',
                    }} />
                    <div style={{ height: 14, borderRadius: 7, width: '80%', marginBottom: 8,
                      background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',
                      backgroundSize: '200% 100%', animation: 'gnc-shimmer 1.4s ease-in-out infinite',
                    }} />
                    <div style={{ height: 10, borderRadius: 5, width: '50%',
                      background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',
                      backgroundSize: '200% 100%', animation: 'gnc-shimmer 1.4s ease-in-out infinite',
                    }} />
                  </div>
                </div>
              ))}
            </div>
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

      {/* Contact Form — Free submission via FormSubmit.co (no API key needed) */}
      <div className="profile-container" style={{ marginTop:40, marginBottom:80 }}>
        <section className="glass-panel profile-section anim-slide-up" style={{ animationDelay:'.4s' }}>
          <h2 className="section-heading" style={{ textAlign:'center' }}>Send Us a Message</h2>
          <div className="heading-underline" style={{ margin:'0 auto 30px' }} />
          
          <ContactForm />

          <style>{`
            .contact-form .form-input {
              padding: 14px 18px;
              border-radius: 12px;
              border: 1px solid #e2e8f0;
              background: #f8fafc;
              font-family: inherit;
              font-size: 15px;
              color: ${COLORS.navy};
              transition: all 0.3s;
              outline: none;
              width: 100%;
            }
            .contact-form .form-input:focus {
              border-color: ${COLORS.gold};
              background: #fff;
              box-shadow: 0 0 0 3px rgba(244,160,35,0.15);
            }
            .form-submit-btn {
              background: linear-gradient(135deg, ${COLORS.navy}, #1a365d);
              color: white;
              border: none;
              padding: 14px 30px;
              border-radius: 12px;
              font-size: 16px;
              font-weight: 700;
              cursor: pointer;
              transition: all 0.3s;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              margin: 0 auto;
              min-width: 200px;
              min-height: 48px;
            }
            .form-submit-btn:hover:not(:disabled) {
              transform: translateY(-2px);
              box-shadow: 0 10px 20px rgba(15,35,71,0.2);
              background: ${COLORS.gold};
              color: ${COLORS.navyDark || '#000'};
            }
            .form-submit-btn:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }
            
            [data-theme="dark"] .contact-form .form-input {
              background: rgba(15,35,71,0.4) !important;
              border-color: rgba(255,255,255,0.1) !important;
              color: #f1f5f9 !important;
            }
            [data-theme="dark"] .contact-form .form-input:focus {
              border-color: ${COLORS.gold} !important;
              background: rgba(15,35,71,0.8) !important;
            }
            [data-theme="dark"] .form-submit-btn {
              box-shadow: 0 8px 20px rgba(0,0,0,0.4) !important;
            }
          `}</style>
        </section>
      </div>
    </div>
  );
}