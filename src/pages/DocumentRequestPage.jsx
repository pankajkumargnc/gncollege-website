// src/pages/DocumentRequestPage.jsx — Student Self-Service Document Request Hub
import React, { useState, useEffect } from 'react';
import { 
  FileText, CheckCircle2, Clock, Building2, Search, Copy, Check, 
  ArrowRight, ShieldCheck, AlertCircle, Sparkles, HelpCircle, PhoneCall
} from 'lucide-react';
import { collection, setDoc, addDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import toast from 'react-hot-toast';

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

const DOCUMENT_TYPES = [
  { id: 'bonafide', title: 'Bonafide Certificate', fee: 'Free', turnaround: '2 Working Days', desc: 'Required for scholarship, education loan, or passport application' },
  { id: 'character', title: 'Character Certificate', fee: 'Free', turnaround: '3 Working Days', desc: 'Attestation of good moral character and academic conduct' },
  { id: 'fee_clearance', title: 'Fee Clearance NOC', fee: 'Free', turnaround: '1 Working Day', desc: 'No-dues clearance certificate from accounts division' },
  { id: 'migration_noc', title: 'Migration & Transfer NOC', fee: 'Institutional', turnaround: '4 Working Days', desc: 'Required for university transfer or higher degree admissions' },
  { id: 'duplicate_admit', title: 'Duplicate Admit Card / Marksheet', fee: 'Institutional', turnaround: '2 Working Days', desc: 'Replacement for misplaced examination credentials' },
];

export const generateTrackingToken = () => {
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `GNC-DOC-2026-${rand}`;
};

export default function DocumentRequestPage() {
  const [activeTab, setActiveTab] = useState('apply'); // 'apply' | 'track'
  
  // Application Form State
  const [formData, setFormData] = useState({
    studentName: '',
    rollNo: '',
    department: 'BCA',
    semester: 'Semester 4',
    session: '2024-2028',
    docType: 'bonafide',
    phone: '',
    email: '',
    purpose: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedToken, setSubmittedToken] = useState(null);
  const [copied, setCopied] = useState(false);

  // Tracker State
  const [searchToken, setSearchToken] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackedRecord, setTrackedRecord] = useState(null);
  const [trackingError, setTrackingError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.rollNo.trim() || !formData.phone.trim()) {
      toast.error('Please fill in all mandatory fields');
      return;
    }

    setSubmitting(true);
    const trackingToken = generateTrackingToken();

    const requestPayload = {
      trackingToken,
      studentName: formData.studentName.trim(),
      rollNo: formData.rollNo.trim(),
      department: formData.department,
      semester: formData.semester,
      session: formData.session,
      docType: formData.docType,
      docTitle: DOCUMENT_TYPES.find(d => d.id === formData.docType)?.title || formData.docType,
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      purpose: formData.purpose.trim(),
      status: 'submitted', // 'submitted' | 'under_verification' | 'approved' | 'ready' | 'rejected'
      stage: 1, // 1: Submitted, 2: Verification, 3: Principal Approval, 4: Ready at Counter
      createdAt: new Date().toISOString(),
      statusRemark: 'Application submitted successfully. Under preliminary scrutiny at college administrative desk.'
    };

    try {
      if (db) {
        await setDoc(doc(db, 'document_requests', trackingToken), {
          ...requestPayload,
          id: trackingToken,
          serverTimestamp: serverTimestamp()
        });
      }

      // Save locally as backup
      try {
        const existing = JSON.parse(localStorage.getItem('gnc_my_document_requests') || '[]');
        existing.unshift(requestPayload);
        localStorage.setItem('gnc_my_document_requests', JSON.stringify(existing));
      } catch {}

      setSubmittedToken(trackingToken);
      toast.success('Application submitted successfully!');
    } catch (err) {
      console.warn('Firestore write fallback:', err);
      // Offline fallback
      try {
        const existing = JSON.parse(localStorage.getItem('gnc_my_document_requests') || '[]');
        existing.unshift(requestPayload);
        localStorage.setItem('gnc_my_document_requests', JSON.stringify(existing));
      } catch {}

      setSubmittedToken(trackingToken);
      toast.success('Application saved locally! Your tracking token is generated.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    const token = searchToken.trim().toUpperCase();
    if (!token) {
      toast.error('Please enter a valid tracking ID');
      return;
    }

    setTrackingLoading(true);
    setTrackingError(null);
    setTrackedRecord(null);

    try {
      // 1. Check live Firestore first
      let record = null;
      if (db) {
        try {
          const docSnap = await getDoc(doc(db, 'document_requests', token));
          if (docSnap.exists()) {
            record = { id: docSnap.id, ...docSnap.data() };
          }
        } catch (dbErr) {
          console.warn('Live tracking lookup error:', dbErr);
        }
      }

      // 2. Check local backup if not found online or offline
      if (!record) {
        const localRequests = JSON.parse(localStorage.getItem('gnc_my_document_requests') || '[]');
        const foundLocal = localRequests.find(r => r.trackingToken === token);
        if (foundLocal) {
          record = foundLocal;
        }
      }

      if (record) {
        setTrackedRecord(record);
      } else {
        setTrackingError('No document application found matching this Tracking ID. Please verify your token.');
      }
    } catch (err) {
      setTrackingError('Unable to fetch status. Please check your connection and try again.');
    } finally {
      setTrackingLoading(false);
    }
  };

  const copyToken = (tok) => {
    navigator.clipboard.writeText(tok);
    setCopied(true);
    toast.success('Tracking ID copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'Inter', sans-serif", paddingBottom: 60 }}>
      {/* Unified Hero Skeleton */}
      <section className="premium-hero">
        <div className="kinetic-bg" />
        <div className="hero-content-wrapper anim-fade-in">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(244,160,35,0.18)',
            border: '1px solid rgba(244,160,35,0.4)',
            color: GOLD,
            padding: '4px 14px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: 'uppercase',
            marginBottom: 12
          }}>
            <ShieldCheck size={14} /> Student Services Hub
          </div>
          <h1 className="hero-title" style={{ margin: '0 0 10px' }}>
            Student Document Request &amp; <span>Tracking Hub</span>
          </h1>
          <p className="hero-subtitle" style={{ margin: 0, color: 'rgba(255,255,255,0.9)', maxWidth: 680 }}>
            Apply online for official institutional certificates, clearance NOCs, and track your application lifecycle in real-time.
          </p>
        </div>
      </section>

      {/* Tab Switcher - Cleanly positioned below hero */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '32px auto 0', padding: '0 16px', position: 'relative', zIndex: 10 }}>
        <div style={{
          display: 'inline-flex',
          background: '#ffffff',
          padding: 6,
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(15,35,71,0.06)',
          border: '1px solid #e2e8f0',
          gap: 6
        }}>
          <button
            onClick={() => { setActiveTab('apply'); setSubmittedToken(null); }}
            style={{
              padding: '10px 24px',
              borderRadius: 10,
              border: 'none',
              background: activeTab === 'apply' ? GOLD : 'transparent',
              color: activeTab === 'apply' ? NAVY : '#64748b',
              fontWeight: 800,
              fontSize: 13.5,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s'
            }}
          >
            <FileText size={16} /> Apply for Document
          </button>
          <button
            onClick={() => setActiveTab('track')}
            style={{
              padding: '10px 24px',
              borderRadius: 10,
              border: 'none',
              background: activeTab === 'track' ? GOLD : 'transparent',
              color: activeTab === 'track' ? NAVY : '#64748b',
              fontWeight: 800,
              fontSize: 13.5,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s'
            }}
          >
            <Search size={16} /> Track Status
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: 1000, margin: '24px auto 0', padding: '0 16px', position: 'relative', zIndex: 2 }}>
        
        {/* ── TAB 1: APPLY FOR DOCUMENT ── */}
        {activeTab === 'apply' && (
          <div style={{ background: '#ffffff', borderRadius: 20, boxShadow: '0 12px 36px rgba(15,35,71,0.08)', border: '1px solid #e2e8f0', padding: 'clamp(20px, 4vw, 36px)' }}>
            
            {submittedToken ? (
              <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: NAVY, margin: '0 0 8px' }}>Application Submitted Successfully!</h2>
                <p style={{ color: '#64748b', fontSize: 14, maxWidth: 500, margin: '0 auto 24px' }}>
                  Your document request has been logged. Save your unique tracking ID to check approval status.
                </p>

                <div style={{
                  background: '#f8fafc',
                  border: '2px dashed #cbd5e1',
                  borderRadius: 14,
                  padding: '18px 24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 16,
                  marginBottom: 24
                }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Your Tracking Token</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: NAVY, letterSpacing: 1.5, fontFamily: 'monospace' }}>{submittedToken}</div>
                  </div>
                  <button
                    onClick={() => copyToken(submittedToken)}
                    style={{
                      background: copied ? '#10b981' : NAVY,
                      color: '#fff',
                      border: 'none',
                      borderRadius: 10,
                      padding: '10px 16px',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? 'Copied' : 'Copy ID'}
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setSearchToken(submittedToken);
                      setActiveTab('track');
                      handleTrack();
                    }}
                    style={{
                      background: `linear-gradient(135deg, ${GOLD}, #d97706)`,
                      color: NAVY,
                      border: 'none',
                      borderRadius: 10,
                      padding: '12px 28px',
                      fontSize: 14,
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    Track Status Now →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FileText size={22} color={GOLD} /> 1. Select Document Type
                </h2>
                <p style={{ color: '#64748b', fontSize: 13, margin: '0 0 20px' }}>
                  Choose the official academic record or certificate you require:
                </p>

                {/* Document Type Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 28 }}>
                  {DOCUMENT_TYPES.map(doc => {
                    const isSelected = formData.docType === doc.id;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setFormData(prev => ({ ...prev, docType: doc.id }))}
                        style={{
                          border: `2px solid ${isSelected ? GOLD : '#e2e8f0'}`,
                          background: isSelected ? 'rgba(244,160,35,0.06)' : '#ffffff',
                          borderRadius: 14,
                          padding: 14,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          position: 'relative'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 13.5, fontWeight: 800, color: NAVY }}>{doc.title}</span>
                          <span style={{ fontSize: 10.5, fontWeight: 800, background: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: 10 }}>{doc.turnaround}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 12, color: '#64748b', lineHeight: 1.4 }}>{doc.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <h2 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Building2 size={22} color={GOLD} /> 2. Student Identification Details
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: NAVY, marginBottom: 6 }}>
                      Full Student Name *
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      required
                      value={formData.studentName}
                      onChange={handleInputChange}
                      placeholder="e.g. Gurpreet Singh"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 13.5, outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: NAVY, marginBottom: 6 }}>
                      College Roll / Reg Number *
                    </label>
                    <input
                      type="text"
                      name="rollNo"
                      required
                      value={formData.rollNo}
                      onChange={handleInputChange}
                      placeholder="e.g. 24GNCBCA012"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 13.5, outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: NAVY, marginBottom: 6 }}>
                      Department / Course *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 13.5, outline: 'none' }}
                    >
                      <option value="BCA">BCA — Computer Applications</option>
                      <option value="BBA">BBA — Business Administration</option>
                      <option value="BCOM">B.Com — Commerce</option>
                      <option value="BSC">B.Sc — Science</option>
                      <option value="BA">B.A. — Arts & Humanities</option>
                      <option value="MCOM">M.Com — Post Graduate</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: NAVY, marginBottom: 6 }}>
                      Current Semester
                    </label>
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 13.5, outline: 'none' }}
                    >
                      <option value="Semester 1">Semester 1</option>
                      <option value="Semester 2">Semester 2</option>
                      <option value="Semester 3">Semester 3</option>
                      <option value="Semester 4">Semester 4</option>
                      <option value="Semester 5">Semester 5</option>
                      <option value="Semester 6">Semester 6</option>
                      <option value="Semester 7/8">Semester 7 / 8</option>
                      <option value="Alumni/Passed Out">Alumni / Course Completed</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: NAVY, marginBottom: 6 }}>
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 13.5, outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: NAVY, marginBottom: 6 }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. student@gmail.com"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 13.5, outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: NAVY, marginBottom: 6 }}>
                    Purpose of Certificate / Special Remarks
                  </label>
                  <textarea
                    name="purpose"
                    rows={3}
                    value={formData.purpose}
                    onChange={handleInputChange}
                    placeholder="e.g. Applying for e-Kalyan Post-Matric Scholarship 2026..."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 13.5, outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: `linear-gradient(135deg, ${NAVY}, #1e3a8a)`,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 12,
                    padding: '14px 32px',
                    fontSize: 15,
                    fontWeight: 800,
                    cursor: submitting ? 'wait' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 4px 16px rgba(15,35,71,0.25)'
                  }}
                >
                  {submitting ? 'Submitting Application...' : 'Submit Document Request →'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* ── TAB 2: TRACK STATUS ── */}
        {activeTab === 'track' && (
          <div style={{ background: '#ffffff', borderRadius: 20, boxShadow: '0 12px 36px rgba(15,35,71,0.08)', border: '1px solid #e2e8f0', padding: 'clamp(20px, 4vw, 36px)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: '0 0 6px' }}>
              Track Document Processing Status
            </h2>
            <p style={{ color: '#64748b', fontSize: 13, margin: '0 0 20px' }}>
              Enter your unique tracking token (e.g. GNC-DOC-2026-XXXX) to monitor the verification and approval stages:
            </p>

            <form onSubmit={handleTrack} style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
              <input
                type="text"
                value={searchToken}
                onChange={e => setSearchToken(e.target.value)}
                placeholder="Enter GNC-DOC-2026-XXXX"
                style={{
                  flex: 1,
                  minWidth: 260,
                  padding: '12px 18px',
                  borderRadius: 12,
                  border: '2px solid #cbd5e1',
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  letterSpacing: 1,
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                disabled={trackingLoading}
                style={{
                  background: NAVY,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 24px',
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <Search size={16} /> {trackingLoading ? 'Searching...' : 'Track'}
              </button>
            </form>

            {trackingError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: 14, borderRadius: 12, color: '#b91c1c', fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertCircle size={18} /> {trackingError}
              </div>
            )}

            {trackedRecord && (
              <div style={{ border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, background: '#f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Tracking Token</span>
                    <div style={{ fontSize: 18, fontWeight: 900, color: NAVY, fontFamily: 'monospace' }}>{trackedRecord.trackingToken}</div>
                  </div>

                  <span style={{
                    background: trackedRecord.stage >= 4 ? '#dcfce7' : '#fef3c7',
                    color: trackedRecord.stage >= 4 ? '#15803d' : '#b45309',
                    border: `1px solid ${trackedRecord.stage >= 4 ? '#86efac' : '#fde68a'}`,
                    padding: '6px 14px',
                    borderRadius: 20,
                    fontWeight: 800,
                    fontSize: 12.5
                  }}>
                    {trackedRecord.stage >= 4 ? 'Ready for Collection' : 'Under Verification'}
                  </span>
                </div>

                {/* 4-Step Lifecycle Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, margin: '24px 0', textAlign: 'center' }}>
                  {[
                    { step: 1, title: 'Submitted' },
                    { step: 2, title: 'Scrutiny' },
                    { step: 3, title: 'Principal Approval' },
                    { step: 4, title: 'Ready at Counter' },
                  ].map(s => {
                    const isPassed = (trackedRecord.stage || 1) >= s.step;
                    return (
                      <div key={s.step}>
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: isPassed ? '#10b981' : '#cbd5e1',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 6px',
                          fontWeight: 800,
                          fontSize: 12
                        }}>
                          {isPassed ? <Check size={16} /> : s.step}
                        </div>
                        <div style={{ fontSize: 11, fontWeight: isPassed ? 800 : 500, color: isPassed ? NAVY : '#94a3b8' }}>
                          {s.title}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ background: '#ffffff', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0', marginTop: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>Office Remarks / Instructions</div>
                  <p style={{ margin: 0, fontSize: 13.5, color: NAVY, fontWeight: 600 }}>
                    {trackedRecord.statusRemark || 'Your application is being processed at the administrative counter.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FAQ & Guidelines Section */}
        <div style={{ marginTop: 40, background: '#ffffff', borderRadius: 20, padding: 24, border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: 17, fontWeight: 900, color: NAVY, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <HelpCircle size={18} color={GOLD} /> Important Guidelines for Document Collection
          </h3>
          <ul style={{ margin: 0, paddingLeft: 20, color: '#475569', fontSize: 13.5, lineHeight: 1.8 }}>
            <li>Students must bring their <strong>Original College Identity Card</strong> or Fee Receipt when collecting certificates from Counter #2.</li>
            <li>Office counter timings: <strong>Monday to Saturday, 10:00 AM to 3:00 PM</strong> (closed on Sundays and BBMKU University holidays).</li>
            <li>For urgent queries or document dispatch status, call the administrative helpdesk at <strong>+91 79033 40991</strong>.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
