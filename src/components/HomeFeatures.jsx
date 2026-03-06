import React from 'react';
import { COLORS } from '../styles/colors';
import { departments, facilities } from '../data/db';

const SectionTitle = ({ title, subtitle }) => (
  <div style={{ textAlign: 'center', marginBottom: 32 }}>
    <h2 style={{ fontSize: 26, fontWeight: 800, color: COLORS.navy, marginBottom: 6 }}>{title}</h2>
    <div style={{ width: 60, height: 3, background: COLORS.gold, margin: '0 auto 10px' }} />
    {subtitle && <p style={{ color: '#666', fontSize: 14 }}>{subtitle}</p>}
  </div>
)

const Card = ({ style, children }) => (
  <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,.08)', overflow: 'hidden', ...style }}>
    {children}
  </div>
)

export default function HomeFeatures() {
  return (
    <div style={{ padding: '40px 16px', background: '#f8f9fa' }}>

      
      
      {/* --- PROFESSIONAL SINGLE-LINE DEPARTMENTS SECTION --- */}
<section style={{ marginBottom: '100px', padding: '0 20px' }}>
  <SectionTitle 
    title="Our Academic Departments" 
    subtitle="Excellence in specialized education for future leaders" 
  />
  <style>{`
    .dept-container {
      display: grid;
      /* Force 4 columns on desktop, auto-adjust on mobile */
      grid-template-columns: repeat(4, 1fr); 
      gap: 20px;
      max-width: 1300px;
      margin: 0 auto;
    }
    .modern-dept-card {
      position: relative;
      height: 350px;
      border-radius: 15px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      transition: all 0.4s ease;
      background: ${COLORS.navyDark};
    }
    .dept-bg-symbol {
      position: absolute;
      top: -20px;
      right: -20px;
      font-size: 120px;
      opacity: 0.1;
      color: #fff;
      transform: rotate(-15deg);
      pointer-events: none;
    }
    .dept-content {
      position: absolute;
      inset: 0;
      padding: 25px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background: linear-gradient(to bottom, rgba(15,35,71,0.2) 0%, rgba(15,35,71,0.9) 80%);
      z-index: 2;
    }
    .dept-icon-box {
      width: 50px;
      height: 50px;
      background: ${COLORS.gold};
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      margin-bottom: 15px;
      box-shadow: 0 4px 10px rgba(244,160,35,0.3);
    }
    .modern-dept-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 35px rgba(15,35,71,0.4);
    }
    .modern-dept-card:hover .dept-bg-symbol {
      transform: rotate(0deg) scale(1.1);
      opacity: 0.2;
      transition: 0.5s;
    }

    /* Mobile Responsive */
    @media (max-width: 1024px) {
      .dept-container { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .dept-container { grid-template-columns: 1fr; }
    }
  `}</style>

  <div className="dept-container">
    {[
      { name: 'B.C.A', icon: '💻', symbol: '展开', desc: 'Bachelor of Computer Applications - Future of IT.' },
      { name: 'B.B.A', icon: '📈', symbol: '📊', desc: 'Bachelor of Business Administration - Master the Market.' },
      { name: 'COMMERCE', icon: '💰', symbol: '📒', desc: 'Expertise in Finance, Accounts, and Trade.' },
      { name: 'ARTS', icon: '🎨', symbol: '🎭', desc: 'Exploring Humanity, Culture, and Social Science.' }
    ].map((dept, index) => (
      <div key={index} className="modern-dept-card">
        {/* Background Symbol Layer */}
        <div className="dept-bg-symbol">{dept.symbol}</div>
        
        <div className="dept-content">
          <div className="dept-icon-box">{dept.icon}</div>
          <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>
            {dept.name}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12.5px', lineHeight: '1.5', margin: 0 }}>
            {dept.desc}
          </p>
          <div style={{ marginTop: '15px', color: COLORS.gold, fontSize: '12px', fontWeight: 'bold' }}>
            EXPLORE PROGRAM →
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* --- MODERN & ANIMATED COLLEGE FACILITIES SECTION --- */}
<section style={{ padding: '80px 20px', background: '#ffffff' }}>
  <div style={{ maxWidth: 1250, margin: '0 auto' }}>
    <SectionTitle 
      title="College Facilities" 
      subtitle="World-class infrastructure to support your academic excellence" 
    />
    
    <style>{`
      .facility-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 20px;
        margin-top: 40px;
      }
      .facility-card {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 30px 15px;
        text-align: center;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        position: relative;
        overflow: hidden;
      }
      .facility-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, ${COLORS.gold}20, transparent);
        opacity: 0;
        transition: 0.4s;
      }
      .facility-card:hover {
        transform: translateY(-10px) scale(1.02);
        background: #fff;
        border-color: ${COLORS.gold};
        box-shadow: 0 15px 30px rgba(15, 35, 71, 0.1);
      }
      .facility-card:hover::before {
        opacity: 1;
      }
      .facility-icon-wrap {
        font-size: 38px;
        transition: transform 0.3s ease;
        z-index: 2;
      }
      .facility-card:hover .facility-icon-wrap {
        transform: rotate(10deg) scale(1.2);
      }
      .facility-text {
        font-size: 13px;
        font-weight: 700;
        color: ${COLORS.navy};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        z-index: 2;
        transition: 0.3s;
      }
      .facility-card:hover .facility-text {
        color: ${COLORS.gold};
      }

      /* Desktop par 8 items ek line me lane ki koshish */
      @media (min-width: 1200px) {
        .facility-container {
          grid-template-columns: repeat(8, 1fr);
        }
      }
    `}</style>

    <div className="facility-container">
      {facilities.map((ft, index) => (
        <div key={index} className="facility-card">
          <div className="facility-icon-wrap">{ft.emoji}</div>
          <div className="facility-text">{ft.name}</div>
        </div>
      ))}
    </div>
  </div>
</section>

    </div>
  );
}