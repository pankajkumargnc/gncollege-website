// src/components/home/AdmissionTimeline.jsx
import React from 'react';
import { COLORS } from '../../styles/colors';

const N = COLORS.navy;
const G = COLORS.gold;

const STEPS = [
  { id: 1, icon: '📝', title: 'Registration', desc: 'Fill the online application form on Chancellor Portal.', status: 'current' },
  { id: 2, icon: '🏆', title: 'Merit List', desc: 'Check if you are selected in the department merit list.', status: 'next' },
  { id: 3, icon: '🔍', title: 'Verification', desc: 'College verifies your documents and marks.', status: 'next' },
  { id: 4, icon: '💳', title: 'Fee Payment', desc: 'Submit your admission fee online to confirm seat.', status: 'next' },
  { id: 5, icon: '🎉', title: 'Final Admission', desc: 'Visit college with original documents for final roll number.', status: 'next' },
];

export default function AdmissionTimeline() {
  return (
    <section className="at-root">
      <style>{`
        .at-root { 
          padding: clamp(60px, 10vw, 120px) 20px; 
          background: #f8fafc; 
          position: relative; 
          overflow: hidden; 
        }
        
        /* Background Decorations */
        .at-root::before {
          content: ''; position: absolute; top: -10%; right: -5%; width: 400px; height: 400px;
          background: radial-gradient(circle, ${G}10 0%, transparent 70%);
          pointer-events: none;
        }
        .at-root::after {
          content: ''; position: absolute; bottom: -10%; left: -5%; width: 400px; height: 400px;
          background: radial-gradient(circle, ${N}05 0%, transparent 70%);
          pointer-events: none;
        }

        .at-inner { max-width: 1400px; margin: 0 auto; position: relative; z-index: 2; }
        
        .at-header { margin-bottom: 70px; text-align: center; }
        .at-label { 
          display: inline-block; background: #fff; color: ${N}; 
          padding: 7px 18px; border-radius: 50px; font-size: 11px; font-weight: 800; 
          letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 16px;
          box-shadow: 0 4px 12px rgba(15,35,71,0.05);
          border: 1px solid rgba(15,35,71,0.08);
        }
        .at-title { 
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(32px, 5vw, 52px); 
          font-weight: 800; color: ${N}; line-height: 1.1; letter-spacing: -1.5px; 
        }
        .at-title span { color: ${G}; }

        .at-grid { 
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          position: relative;
          margin-top: 50px;
        }
        
        /* The Connection Line Layer */
        .at-line-container {
          position: absolute; top: 45px; left: 10%; right: 10%; height: 2px;
          background: rgba(15,35,71,0.08); z-index: 1;
        }
        .at-line-progress {
          height: 100%; width: 25%; background: ${G};
          box-shadow: 0 0 15px ${G}50;
        }

        /* Step Card Styling */
        .at-step { 
          position: relative; z-index: 2; 
          display: flex; flex-direction: column; align-items: center; text-align: center;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .at-circle-wrap {
            position: relative; margin-bottom: 30px;
        }
        
        .at-circle {
          width: 90px; height: 90px; background: #fff; border: 2px solid #eef2f6;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 34px; transition: all 0.5s;
          box-shadow: 0 15px 35px rgba(0,0,0,0.06);
          z-index: 2; position: relative;
        }
        
        .at-step.current .at-circle { 
          border-color: ${G}; 
          background: #fff;
          transform: scale(1.15); 
          box-shadow: 0 20px 40px rgba(244,160,35,0.25); 
        }
        
        .at-step-glow {
            position: absolute; inset: -10px; background: ${G}20; border-radius: 50%;
            filter: blur(15px); opacity: 0; transition: opacity 0.5s;
        }
        .at-step.current .at-step-glow { opacity: 1; }

        .at-step-info {
           background: #fff; padding: 25px 20px; border-radius: 24px;
           border: 1px solid #f1f5f9; transition: all 0.5s;
           box-shadow: 0 4px 15px rgba(15,35,71,0.02);
           flex: 1; width: 100%;
        }
        .at-step:hover .at-step-info {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(15,35,71,0.1);
            border-color: ${G}40;
        }

        .at-step-num {
           font-size: 11px; font-weight: 900; color: ${G}; 
           background: ${G}15; padding: 4px 10px; border-radius: 12px;
           margin-bottom: 12px; display: inline-block;
        }

        .at-step-title { 
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 18px; font-weight: 800; color: ${N}; 
            margin-bottom: 10px; letter-spacing: -0.3px;
        }
        .at-step-desc { font-size: 14px; color: #64748b; line-height: 1.6; }

        @media(max-width: 1100px) {
            .at-grid { grid-template-columns: repeat(3, 1fr); gap: 40px; }
            .at-line-container { display: none; }
        }

        @media(max-width: 768px) {
          .at-grid { grid-template-columns: 1fr; gap: 30px; }
          .at-step { flex-direction: row; text-align: left; align-items: flex-start; gap: 25px; }
          .at-circle-wrap { margin-bottom: 0; }
          .at-circle { width: 70px; height: 70px; font-size: 28px; }
          .at-step-info { padding: 20px; }
        }

        [data-theme="dark"] .at-root { background: #0b1121; }
        [data-theme="dark"] .at-step-info { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08); }
        [data-theme="dark"] .at-circle { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }
        [data-theme="dark"] .at-label { background: rgba(255,255,255,0.05); color: #fff; border-color: rgba(255,255,255,0.1); }
        [data-theme="dark"] .at-title { color: #fff; }
      `}</style>
      
      <div className="at-inner">
        <div className="at-header">
          <div className="at-label">Student Journey</div>
          <h2 className="at-title">Admission <span>Process Roadmap</span></h2>
        </div>

        <div className="at-grid">
          <div className="at-line-container">
            <div className="at-line-progress"></div>
          </div>
          {STEPS.map((step) => (
            <div key={step.id} className={`at-step ${step.status}`}>
              <div className="at-circle-wrap">
                  <div className="at-step-glow"></div>
                  <div className="at-circle">{step.icon}</div>
              </div>
              <div className="at-step-info">
                <span className="at-step-num">Step 0{step.id}</span>
                <h3 className="at-step-title">{step.title}</h3>
                <p className="at-step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
