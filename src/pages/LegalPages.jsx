import React, { useEffect } from 'react';
import { COLORS } from '../styles/colors';
import { splitHeading } from '../utils/splitTitle';

const N = COLORS?.navy || '#0f2347';

function PageHero({ title, subtitle, icon }) {
  return (
    <div className="premium-hero">
      <div className="kinetic-bg" />
      <div className="hero-content-wrapper">
        {icon && <div className="hero-icon">{icon}</div>}
        <h1 className="hero-title">{splitHeading(title)}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}

export function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <PageHero
        title="Privacy Policy"
        subtitle="Guru Nanak College, Dhanbad commitment to data privacy, student confidentiality, and digital security"
        icon="🔒"
      />
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(36px,5vw,56px) clamp(16px,3vw,24px) clamp(56px,7vw,88px)' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 'clamp(24px, 4vw, 40px)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', lineHeight: 1.75, color: '#334155' }}>
          <h2 style={{ color: N, fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>1. Institutional Commitment</h2>
          <p style={{ marginBottom: 20 }}>
            Guru Nanak College, Dhanbad ("Institution", "We", "Us") respects your privacy and is dedicated to protecting personal information collected through our official portal. This Privacy Policy details how we collect, use, and safeguard personal and academic records of prospective students, enrolled students, faculty, alumni, and visitors.
          </p>

          <h2 style={{ color: N, fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>2. Information We Collect</h2>
          <p style={{ marginBottom: 10 }}>We may collect and process the following information:</p>
          <ul style={{ paddingLeft: 24, marginBottom: 20 }}>
            <li><strong>Personal Information:</strong> Name, date of birth, contact details (email, phone number, residential address) provided during admission inquiries or grievance registrations.</li>
            <li><strong>Academic Information:</strong> Enrollment numbers, prior academic credentials, entrance test scores, and examination results.</li>
            <li><strong>Technical Usage Data:</strong> Anonymized analytical data, including browser user agent, screen resolution, referral URLs, and access timestamps to improve website performance.</li>
          </ul>

          <h2 style={{ color: N, fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>3. Purpose of Processing</h2>
          <p style={{ marginBottom: 20 }}>
            Information is collected strictly for institutional administration, academic scheduling, statutory reporting to Vinoba Bhave University (VBU) and Binod Bihari Mahto Koyalanchal University (BBMKU), conducting examinations, issuing certifications, and responding to authorized requests.
          </p>

          <h2 style={{ color: N, fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>4. Data Security & Storage</h2>
          <p style={{ marginBottom: 20 }}>
            Institutional data is stored using secure cloud infrastructure with encrypted transmission (HTTPS/TLS) and role-based access restrictions. We do not sell, rent, or lease personal records to third-party commercial advertisers.
          </p>

          <h2 style={{ color: N, fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>5. Contact & Grievance Redressal</h2>
          <p style={{ marginBottom: 20 }}>
            For questions regarding this policy or to request updates to your records, please contact:
            <br />
            <strong>The Grievance Redressal Officer</strong><br />
            Guru Nanak College, Post Box - 93, Dhanbad - 826001, Jharkhand<br />
            Email: <a href="mailto:principal@gncollege.org" style={{ color: N, fontWeight: 700 }}>principal@gncollege.org</a>
          </p>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid #e2e8f0', fontSize: 13, color: '#64748b' }}>
            Last Updated: January 2026 | Approved by Governing Body, Guru Nanak College
          </div>
        </div>
      </div>
    </div>
  );
}

export function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <PageHero
        title="Terms of Service"
        subtitle="Institutional regulations, guidelines, and terms governing use of the Guru Nanak College portal"
        icon="⚖️"
      />
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(36px,5vw,56px) clamp(16px,3vw,24px) clamp(56px,7vw,88px)' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 'clamp(24px, 4vw, 40px)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', lineHeight: 1.75, color: '#334155' }}>
          <h2 style={{ color: N, fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>1. Acceptance of Terms</h2>
          <p style={{ marginBottom: 20 }}>
            By accessing or using the official web portal of Guru Nanak College, Dhanbad, you agree to comply with and be bound by these Terms of Service, institutional byelaws, and applicable regulations of BBMKU, UGC, and the Department of Higher Education, Government of Jharkhand.
          </p>

          <h2 style={{ color: N, fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>2. Institutional Digital Code of Conduct</h2>
          <p style={{ marginBottom: 10 }}>Users accessing college digital resources agree to:</p>
          <ul style={{ paddingLeft: 24, marginBottom: 20 }}>
            <li>Provide true, accurate, and complete information on all applications and inquiry forms.</li>
            <li>Refrain from unauthorized attempts to probe, scan, or breach system security or authentication mechanisms.</li>
            <li>Respect academic and institutional copyright on course syllabi, notices, publications, and circulars.</li>
            <li>Adhere strictly to anti-ragging policies, POSH guidelines, and campus codes of ethics.</li>
          </ul>

          <h2 style={{ color: N, fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>3. Intellectual Property Rights</h2>
          <p style={{ marginBottom: 20 }}>
            All logos, emblems, photographic content, video archives, and published materials hosted on this portal are the intellectual property of Guru Nanak College, Dhanbad, or licensed for educational use. Unauthorized commercial reproduction is prohibited.
          </p>

          <h2 style={{ color: N, fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>4. Accuracy of Information & Disclaimers</h2>
          <p style={{ marginBottom: 20 }}>
            While every effort is made to keep circulars, examination schedules, fee structures, and notices updated in real time, official notifications issued on physical college notice boards and signed by the Principal or Controller of Examinations shall prevail in case of any discrepancy.
          </p>

          <h2 style={{ color: N, fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>5. Legal Jurisdiction</h2>
          <p style={{ marginBottom: 20 }}>
            Any dispute arising out of or related to the use of this portal shall be subject to the exclusive jurisdiction of the competent civil courts located in Dhanbad, Jharkhand, India.
          </p>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid #e2e8f0', fontSize: 13, color: '#64748b' }}>
            Last Updated: January 2026 | Approved by Governing Body, Guru Nanak College
          </div>
        </div>
      </div>
    </div>
  );
}
