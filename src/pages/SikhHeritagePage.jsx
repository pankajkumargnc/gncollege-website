// src/pages/SikhHeritagePage.jsx — Sikh Heritage & History of Guru Nanak College
import React, { useEffect } from 'react';
import { updateSEO } from '../utils/seoManager';

const HERITAGE_DATA = {
  hero: {
    title: 'Sikh Heritage',
    subtitle: 'ਸਿੱਖ ਵਿਰਾਸਤ — The Teachings of Guru Nanak Dev Ji and our College Legacy',
    bg: 'linear-gradient(135deg, #0f2347 0%, #1a3a6b 50%, #f4a023 100%)'
  },
  sections: [
    {
      title: 'ਵਾਹਿਗੁਰੂ — Guru Nanak Dev Ji',
      icon: '🙏',
      content: 'Guru Nanak Dev Ji (1469–1539), the founder of Sikhism, spread the message of equality, compassion, and honest living. His philosophy — "Kirat Karo, Naam Japo, Vand Chhako" — remains the foundation of our institution\'s values.',
      image: null,
      highlight: true
    },
    {
      title: 'College History',
      icon: '🏛️',
      content: 'Guru Nanak College was established in 1970 by the Sikh community of Dhanbad. It is a Sikh Minority institution affiliated with B.B.M.K. University (formerly VBU). The college mission is to provide quality education to all, regardless of caste, creed, or religion.',
    },
    {
      title: 'Minority Status',
      icon: '📜',
      content: 'The college is recognized as a Sikh Minority Institution by the National Commission for Minority Educational Institutions (NCMEI). It is further recognized under UGC Section 2(f) & 12(B).',
    },
    {
      title: 'Core Values — Sikh Principles',
      icon: '☬',
      content: null,
      values: [
        { name: 'ਨਾਮ ਜਪੋ (Naam Japo)', desc: 'Spiritual awareness and meditation — fostering moral values among students' },
        { name: 'ਕਿਰਤ ਕਰੋ (Kirat Karo)', desc: 'Honest hard work — practical education and skill development' },
        { name: 'ਵੰਡ ਛਕੋ (Vand Chhako)', desc: 'Sharing with others — community service and social responsibility' },
        { name: 'ਸਰਬੱਤ ਦਾ ਭਲਾ (Sarbat Da Bhala)', desc: 'Welfare of all — inclusive education regardless of background' },
      ]
    },
    {
      title: 'Gurudwara & Spiritual Life',
      icon: '🕌',
      content: 'The college campus houses a Gurudwara Sahib where regular Kirtan, Ardaas, and Gurpurb celebrations are held. Guru Nanak Jayanti, Baisakhi, and Prakash Purbs are special occasions for the entire college community.',
    },
    {
      title: 'Langar & Community Service',
      icon: '🍲',
      content: 'Following the Sikh tradition of Langar (community kitchen), the college organizes free meals on various occasions. Regular NSS activities and community outreach programs are also conducted.',
    },
  ]
};

export default function SikhHeritagePage() {
  useEffect(() => {
    updateSEO('/about-us/sikh-heritage', {
      title: 'Sikh Heritage | Guru Nanak College Dhanbad',
      description: 'Learn about the Sikh heritage, values, and traditions that form the foundation of Guru Nanak College, Dhanbad.'
    });
  }, []);

  return (
    <div className="profile-page-wrapper" style={{ minHeight: '80vh' }}>
      <style>{`
        .heritage-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .heritage-card:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(15,35,71,0.12) !important; }
        [data-theme="dark"] .heritage-card { background: rgba(10,22,48,0.85) !important; border-color: rgba(244,160,35,0.15) !important; }
        [data-theme="dark"] .heritage-card h2 { color: #f1f5f9 !important; }
        [data-theme="dark"] .heritage-card p { color: #94a3b8 !important; }
        [data-theme="dark"] .heritage-val { background: rgba(15,35,71,0.6) !important; border-color: rgba(255,255,255,0.08) !important; }
        [data-theme="dark"] .heritage-val div:first-child { color: #f1f5f9 !important; }
        [data-theme="dark"] .heritage-quote { color: #cbd5e1 !important; }
      `}</style>
      {/* Hero Section */}
      <section style={{
        background: HERITAGE_DATA.hero.bg,
        padding: 'clamp(60px, 10vw, 120px) 20px clamp(40px, 8vw, 80px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ctext y=\'50\' x=\'50\' text-anchor=\'middle\' dominant-baseline=\'central\' font-size=\'60\'%3E☬%3C/text%3E%3C/svg%3E")',
          backgroundSize: '120px', backgroundRepeat: 'repeat'
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 'clamp(48px, 8vw, 72px)', marginBottom: 16 }}>☬</div>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 900, color: '#fff', marginBottom: 12,
            letterSpacing: '-0.02em'
          }}>
            {HERITAGE_DATA.hero.title}
          </h1>
          <p style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
            color: 'rgba(255,255,255,0.75)', maxWidth: 600, margin: '0 auto',
            lineHeight: 1.7,
          }}>
            {HERITAGE_DATA.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(30px, 5vw, 60px) 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 4vw, 40px)' }}>
          {HERITAGE_DATA.sections.map((section, idx) => (
            <article key={idx} className="heritage-card" style={{
              background: section.highlight ? 'linear-gradient(135deg, #0f234708, #f4a02308)' : '#fff',
              borderRadius: 16, padding: 'clamp(24px, 4vw, 36px)',
              border: `1.5px solid ${section.highlight ? '#f4a023' : '#e2e8f0'}`,
              boxShadow: '0 2px 12px rgba(15,35,71,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <span style={{
                  fontSize: 'clamp(28px, 4vw, 36px)',
                  width: 56, height: 56,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#0f234710', borderRadius: 14,
                }}>{section.icon}</span>
                <h2 style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  fontWeight: 800, color: '#0f2347', margin: 0,
                }}>{section.title}</h2>
              </div>

              {section.content && (
                <p style={{
                  fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
                  color: '#475569', lineHeight: 1.8, margin: 0,
                }}>{section.content}</p>
              )}

              {section.values && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 8 }}>
                  {section.values.map((v, i) => (
                    <div key={i} className="heritage-val" style={{
                      background: '#f8fafc', borderRadius: 12, padding: '18px 20px',
                      border: '1px solid #e2e8f0',
                    }}>
                      <div style={{ fontWeight: 800, color: '#0f2347', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', marginBottom: 6 }}>{v.name}</div>
                      <div style={{ color: '#64748b', fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)', lineHeight: 1.6 }}>{v.desc}</div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Quote */}
        <blockquote style={{
          margin: 'clamp(30px, 5vw, 50px) auto',
          maxWidth: 700, textAlign: 'center', position: 'relative',
          padding: '30px 20px',
        }}>
          <div style={{ fontSize: 40, color: '#f4a023', marginBottom: 10 }}>"</div>
          <p className="heritage-quote" style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            fontStyle: 'italic', color: '#0f2347',
            lineHeight: 1.8, fontWeight: 500,
          }}>
            ਨਾਨਕ ਨਾਮ ਚੜ੍ਹਦੀ ਕਲਾ, ਤੇਰੇ ਭਾਣੇ ਸਰਬੱਤ ਦਾ ਭਲਾ
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: 8 }}>
            — Ardaas (Sikh Prayer): "May all prosper by Thy Grace"
          </p>
        </blockquote>
      </section>
    </div>
  );
}
