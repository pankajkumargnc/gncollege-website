// src/pages/ScholarshipsPage.jsx — Scholarships & Financial Aid
import React, { useEffect } from 'react';
import { updateSEO } from '../utils/seoManager';

const SCHOLARSHIPS = [
  {
    title: 'National Scholarship Portal (NSP)',
    icon: '🇮🇳',
    provider: 'Government of India',
    eligibility: 'SC/ST/OBC/Minority students with annual family income below ₹2.5 lakhs',
    benefits: '₹5,000 – ₹12,000 per year (varies by category)',
    link: 'https://scholarships.gov.in',
    highlight: true,
  },
  {
    title: 'Post Matric Scholarship (SC/ST)',
    icon: '📚',
    provider: 'Ministry of Social Justice',
    eligibility: 'SC/ST students — income limit ₹2.5 lakh per annum',
    benefits: 'Full tuition fee + maintenance allowance',
    link: 'https://scholarships.gov.in',
  },
  {
    title: 'OBC Pre-Matric / Post-Matric',
    icon: '🎯',
    provider: 'Ministry of Social Justice',
    eligibility: 'OBC students — income limit ₹1.5 lakh (Pre-Matric) / ₹1 lakh (Post-Matric)',
    benefits: 'Tuition fees + book allowance',
    link: 'https://scholarships.gov.in',
  },
  {
    title: 'Minority Scholarship (Merit-cum-Means)',
    icon: '☬',
    provider: 'Ministry of Minority Affairs',
    eligibility: 'Sikh, Muslim, Christian, Buddhist, Jain, Parsi students — income ₹2.5 lakh',
    benefits: '₹10,000 – ₹25,000 per year',
    link: 'https://scholarships.gov.in',
    highlight: true,
  },
  {
    title: 'Jharkhand E-Kalyan Scholarship',
    icon: '🏔️',
    provider: 'Government of Jharkhand',
    eligibility: 'SC/ST/OBC students of Jharkhand domicile',
    benefits: 'Tuition fee reimbursement + stipend',
    link: 'https://ekalyan.cgg.gov.in',
  },
  {
    title: 'UGC Scholarship for PG',
    icon: '🎓',
    provider: 'University Grants Commission',
    eligibility: 'Post-graduation students with minimum 60% marks',
    benefits: '₹2,000 – ₹6,000 per month',
    link: 'https://ugc.gov.in',
  },
  {
    title: 'College Merit Scholarship',
    icon: '⭐',
    provider: 'Guru Nanak College',
    eligibility: 'Top 3 rankers in each department (based on previous year results)',
    benefits: 'Partial tuition fee waiver + merit certificate',
    link: null,
  },
  {
    title: 'Sikh Minority Educational Aid',
    icon: '☬',
    provider: 'Shiromani Gurdwara Committee / SGPC',
    eligibility: 'Sikh students from economically weaker sections',
    benefits: 'Financial assistance for education expenses',
    link: null,
  },
];

const STEPS = [
  { step: 1, title: 'Check Eligibility', desc: 'Verify your eligibility on the NSP portal or consult the college administrative office.', icon: '✅' },
  { step: 2, title: 'Gather Documents', desc: 'Prepare your Caste/Income certificate, Aadhaar card, marksheets, and bank passbook.', icon: '📋' },
  { step: 3, title: 'Apply Online', desc: 'Register yourself on the official NSP portal (scholarships.gov.in).', icon: '💻' },
  { step: 4, title: 'Institute Verification', desc: 'Submit your online application number to the college office for verification.', icon: '🏫' },
  { step: 5, title: 'DBT Transfer', desc: 'The scholarship amount is credited to your bank account after final government approval.', icon: '💰' },
];

export default function ScholarshipsPage() {
  useEffect(() => {
    updateSEO('/scholarships', {
      title: 'Scholarships & Financial Aid | Guru Nanak College Dhanbad',
      description: 'Complete guide to scholarships available for students at Guru Nanak College — NSP, Minority, SC/ST/OBC, Jharkhand E-Kalyan, and college merit scholarships.'
    });
  }, []);

  return (
    <div className="profile-page-wrapper" style={{ minHeight: '80vh' }}>
      <style>{`
        .sch-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .sch-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(15,35,71,0.12) !important; }
        .sch-btn { transition: background 0.2s, transform 0.2s !important; min-height: 44px; }
        .sch-btn:hover { background: #1a3a7c !important; transform: translateY(-1px); }
        .sch-step { transition: transform 0.2s, box-shadow 0.2s; }
        .sch-step:hover { transform: translateX(4px); box-shadow: 0 4px 16px rgba(15,35,71,0.08); }
        .sch-help-btn { transition: transform 0.2s, box-shadow 0.2s !important; min-height: 44px; display: inline-flex; align-items: center; }
        .sch-help-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.15); }
        [data-theme="dark"] .sch-card { background: rgba(10,22,48,0.85) !important; border-color: rgba(255,255,255,0.08) !important; }
        [data-theme="dark"] .sch-card h3 { color: #f1f5f9 !important; }
        [data-theme="dark"] .sch-step { background: rgba(10,22,48,0.85) !important; border-color: rgba(255,255,255,0.08) !important; }
        [data-theme="dark"] .sch-helpdesk { background: rgba(244,160,35,0.08) !important; border-color: rgba(244,160,35,0.2) !important; }
      `}</style>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0f2347 0%, #1d4ed8 60%, #f4a023 100%)',
        padding: 'clamp(50px, 8vw, 100px) 20px clamp(40px, 6vw, 70px)',
        textAlign: 'center', position: 'relative',
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 'clamp(40px, 7vw, 64px)', marginBottom: 12 }}>🎓</div>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 900,
            color: '#fff', marginBottom: 10, letterSpacing: '-0.02em'
          }}>Scholarships & Financial Aid</h1>
          <p style={{
            fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
            color: 'rgba(255,255,255,0.7)', maxWidth: 560, margin: '0 auto', lineHeight: 1.6
          }}>
            Available scholarships and financial support for SC/ST/OBC and Minority students at Guru Nanak College, Dhanbad.
          </p>
        </div>
      </section>

      {/* Scholarship Cards */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(30px, 5vw, 50px) 20px' }}>
        <h2 style={{
          fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 900, color: '#0f2347',
          marginBottom: 'clamp(20px, 3vw, 30px)', textAlign: 'center'
        }}>Available Scholarships</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(16px, 2vw, 24px)',
        }}>
          {SCHOLARSHIPS.map((s, idx) => (
            <div key={idx} className="sch-card" style={{
              background: '#fff', borderRadius: 16, overflow: 'hidden',
              border: `1.5px solid ${s.highlight ? '#f4a023' : '#e2e8f0'}`,
              boxShadow: s.highlight ? '0 4px 20px rgba(244,160,35,0.12)' : '0 2px 10px rgba(15,35,71,0.04)',
              display: 'flex', flexDirection: 'column',
            }}>
              {s.highlight && (
                <div style={{ background: '#f4a023', color: '#0f2347', padding: '6px 16px', fontSize: 11, fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 }}>
                  ⭐ Recommended for GNC Students
                </div>
              )}
              <div style={{ padding: 'clamp(20px, 3vw, 28px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <span style={{
                    fontSize: 28, width: 48, height: 48, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    background: '#0f234708', borderRadius: 12,
                  }}>{s.icon}</span>
                  <div>
                    <h3 style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', fontWeight: 800, color: '#0f2347', margin: 0 }}>{s.title}</h3>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>{s.provider}</p>
                  </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <InfoRow label="Eligibility" value={s.eligibility} />
                  <InfoRow label="Benefits" value={s.benefits} color="#059669" />
                </div>

                {s.link && (
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="sch-btn" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    marginTop: 16, padding: '10px 18px',
                    background: '#0f2347', color: '#fff', borderRadius: 10,
                    textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700,
                    justifyContent: 'center',
                  }}>
                    Apply Now →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Steps */}
      <section style={{
        background: '#f8fafc', padding: 'clamp(30px, 5vw, 50px) 20px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 900,
            color: '#0f2347', textAlign: 'center', marginBottom: 'clamp(20px, 3vw, 36px)',
          }}>How to Apply — Step by Step</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {STEPS.map(s => (
              <div key={s.step} className="sch-step" style={{
                display: 'flex', alignItems: 'center', gap: 'clamp(14px, 2vw, 20px)',
                background: '#fff', borderRadius: 14, padding: 'clamp(16px, 2.5vw, 24px)',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0f2347, #1d4ed8)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 18, flexShrink: 0,
                }}>{s.step}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: '#0f2347', fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}>
                    {s.icon} {s.title}
                  </div>
                  <div style={{ color: '#64748b', fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)', marginTop: 4, lineHeight: 1.5 }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{
        textAlign: 'center', padding: 'clamp(30px, 5vw, 50px) 20px',
        maxWidth: 700, margin: '0 auto',
      }}>
        <div className="sch-helpdesk" style={{
          background: 'linear-gradient(135deg, #0f234710, #f4a02310)',
          borderRadius: 20, padding: 'clamp(24px, 4vw, 40px)',
          border: '1.5px solid #f4a023',
        }}>
          <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', fontWeight: 800, color: '#0f2347', marginBottom: 12 }}>
            🏫 Scholarship Helpdesk
          </h3>
          <p style={{ color: '#475569', fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)', lineHeight: 1.7, marginBottom: 16 }}>
            For any assistance regarding scholarship applications, eligibility criteria, or documentation, please contact the college scholarships helpdesk.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+913262301234" className="sch-help-btn" style={{
              padding: '10px 20px', background: '#0f2347', color: '#fff',
              borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem',
            }}>📞 Call Office</a>
            <a href="/#/contact" className="sch-help-btn" style={{
              padding: '10px 20px', background: '#f4a023', color: '#0f2347',
              borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem',
            }}>✉️ Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoRow({ label, value, color = '#475569' }) {
  return (
    <div style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.88rem)', lineHeight: 1.5 }}>
      <span style={{ fontWeight: 700, color: '#0f2347', marginRight: 6 }}>{label}:</span>
      <span style={{ color }}>{value}</span>
    </div>
  );
}
