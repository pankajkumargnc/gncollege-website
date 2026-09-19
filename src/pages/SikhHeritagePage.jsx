import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { updateSEO } from '../utils/seoManager';
import { COLORS } from '../styles/colors';
import {
  Bell, Landmark, Scale, HeartHandshake, GraduationCap,
  Sparkles, FileText, Award, ArrowRight
} from 'lucide-react';

const NAVY = COLORS.navy || '#0f2347';
const GOLD = COLORS.gold || '#f4a023';

// ── Web Audio Chime Generator (No external MP3 required) ──────────────────────
function playHarmonicChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Soothing meditative fundamental + harmonics (432Hz tuning)
    const freqs = [432, 648, 864, 1296];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      const volume = idx === 0 ? 0.12 : 0.04 / (idx + 1);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 3.3);
    });
  } catch (_) {}
}

const TABS = [
  { id: 'philosophy', label: 'Eternal Principles', punjabi: 'ਸਿੱਖ ਸਿਧਾਂਤ' },
  { id: 'history', label: 'Founder & Roots', punjabi: 'ਸਾਡਾ ਵਿਰਸਾ' },
  { id: 'minority', label: 'Minority Status & Rights', punjabi: 'ਘੱਟ ਗਿਣਤੀ ਦਰਜਾ' },
  { id: 'spiritual', label: 'Gurudwara & Sewa', punjabi: 'ਸੇਵਾ ਅਤੇ ਅਰਦਾਸ' },
  { id: 'scholarships', label: 'Scholarships & Welfare', punjabi: 'ਵਜ਼ੀਫ਼ੇ ਤੇ ਮਦਦ' },
];

export default function SikhHeritagePage() {
  const [activeTab, setActiveTab] = useState('philosophy');
  const [isPlayingChime, setIsPlayingChime] = useState(false);

  useEffect(() => {
    updateSEO('/about-us/sikh-heritage', {
      title: 'Sikh Heritage & Minority Legacy | Guru Nanak College, Dhanbad',
      description: 'Discover the rich Sikh heritage, philosophy of Guru Nanak Dev Ji, NCMEI minority institution status, and scholarship opportunities at Guru Nanak College, Dhanbad.'
    });
  }, []);

  const handleChimeClick = () => {
    setIsPlayingChime(true);
    playHarmonicChime();
    setTimeout(() => setIsPlayingChime(false), 3300);
  };

  return (
    <div className="sikh-heritage-hub" style={{ minHeight: '90vh', background: 'var(--bg, #f8fafc)' }}>
      <style>{`
        /* ── Hero Banner Keyframes ── */
        @keyframes khandaGlow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 16px rgba(244,160,35,0.45)); }
          50% { transform: scale(1.05); filter: drop-shadow(0 0 28px rgba(244,160,35,0.75)); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .sh-hero {
          background: linear-gradient(135deg, #0a1730 0%, #0f2347 50%, #0a1730 100%);
          background-size: 250% 250%;
          animation: deepNavyFlow 10s ease-in-out infinite alternate;
          min-height: clamp(260px, 26vw, 340px);
          padding: clamp(48px, 5.5vw, 68px) clamp(20px, 4vw, 32px);
          color: #fff;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .sh-hero-pattern {
          position: absolute; inset: 0; opacity: 0.05;
          background-image: radial-gradient(#f4a023 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .sh-khanda-emblem {
          font-size: clamp(52px, 8vw, 76px);
          display: inline-block;
          color: #f4a023;
          animation: khandaGlow 5s ease-in-out infinite;
          margin-bottom: 12px;
          user-select: none;
        }
        .sh-gurmukhi-lead {
          font-family: 'Noto Sans Gurmukhi', serif, sans-serif;
          color: #fbd38d;
          font-size: clamp(16px, 2.2vw, 22px);
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }
        .sh-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(24px, 3.6vw, 44px);
          font-weight: 900;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
          line-height: 1.15;
          color: #ffffff;
          text-shadow: 0 2px 14px rgba(0,0,0,0.6);
          white-space: nowrap;
        }
        @media (max-width: 768px) {
          .sh-title {
            white-space: normal;
          }
        }
        .sh-title-white {
          color: #ffffff !important;
          text-shadow: 0 2px 14px rgba(0,0,0,0.6);
        }
        .sh-title-gold {
          color: #f4a023;
          text-shadow: 0 0 24px rgba(244,160,35,0.45);
        }
        .sh-title span { color: #f4a023; }
        .sh-subtitle {
          max-width: 780px;
          margin: 0 auto 24px;
          font-size: clamp(14px, 1.2vw, 17px);
          line-height: 1.7;
          color: rgba(255,255,255,0.85);
        }

        /* ── Audio Contemplation Button ── */
        .sh-chime-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(244,160,35,0.5);
          color: #fff;
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }
        .sh-chime-btn:hover {
          background: #f4a023;
          color: #060e1c;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(244,160,35,0.4);
        }
        .sh-chime-btn.active {
          animation: floatSlow 1.5s ease-in-out infinite;
          border-color: #fff;
          background: rgba(244,160,35,0.35);
        }

        /* ── Tabs Navigation ── */
        .sh-nav-wrap {
          max-width: 1200px;
          margin: 32px auto 40px;
          padding: 0 20px;
          position: relative;
          z-index: 10;
        }
        .sh-tabs-row {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          padding: 10px;
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(15,35,71,0.08);
          border: 1px solid #e2e8f0;
          overflow-x: auto;
          scrollbar-width: thin;
        }
        .sh-tab-btn {
          flex: 1;
          min-width: 180px;
          padding: 12px 16px;
          border-radius: 12px;
          border: none;
          background: transparent;
          color: #475569;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .sh-tab-btn:hover {
          background: #f8fafc;
          color: #0f2347;
        }
        .sh-tab-btn.active {
          background: #0f2347;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(15,35,71,0.25);
        }
        .sh-tab-btn.active .sh-tab-punjabi {
          color: #f4a023;
        }
        .sh-tab-label {
          font-weight: 800;
          font-size: 13.5px;
          white-space: nowrap;
        }
        .sh-tab-punjabi {
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
        }

        /* ── Content Container & Cards ── */
        .sh-main-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px 70px;
        }
        .sh-card {
          background: #ffffff;
          border-radius: 20px;
          border: 1.5px solid #edf2f7;
          padding: clamp(24px, 4vw, 44px);
          box-shadow: 0 6px 24px rgba(15,35,71,0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .sh-card:hover {
          box-shadow: 0 12px 36px rgba(15,35,71,0.08);
        }

        .sh-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          border-bottom: 1.5px solid #f1f5f9;
          padding-bottom: 18px;
        }
        .sh-card-icon {
          width: 52px; height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, #0f2347, #1a3a6b);
          color: #f4a023;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          flex-shrink: 0;
        }
        .sh-card-title {
          margin: 0;
          font-size: clamp(20px, 2.5vw, 26px);
          font-weight: 900;
          color: #0f2347;
          letter-spacing: -0.02em;
        }
        .sh-card-subtitle {
          margin: 3px 0 0;
          color: #64748b;
          font-size: 13.5px;
          font-weight: 600;
        }

        /* ── Principle Pill Grids ── */
        .sh-principles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: 20px;
          margin-top: 24px;
        }
        .sh-principle-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .sh-principle-card:hover {
          transform: translateY(-4px);
          background: #ffffff;
          border-color: #f4a023;
          box-shadow: 0 10px 25px rgba(244,160,35,0.12);
        }
        .sh-principle-card::before {
          content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%;
          background: #f4a023;
        }
        .sh-principle-name {
          font-size: 17px;
          font-weight: 800;
          color: #0f2347;
          margin-bottom: 4px;
        }
        .sh-principle-punjabi {
          font-size: 13px;
          font-weight: 700;
          color: #d97706;
          margin-bottom: 12px;
          font-family: serif;
        }
        .sh-principle-desc {
          color: #475569;
          font-size: 13.5px;
          line-height: 1.7;
          margin: 0;
        }

        /* ── Timeline ── */
        .sh-timeline {
          position: relative;
          padding-left: 28px;
          margin-top: 30px;
        }
        .sh-timeline::before {
          content: ''; position: absolute; top: 0; bottom: 0; left: 8px; width: 2px;
          background: #e2e8f0;
        }
        .sh-timeline-item {
          position: relative;
          margin-bottom: 28px;
        }
        .sh-timeline-dot {
          position: absolute; left: -28px; top: 3px; width: 18px; height: 18px;
          background: #f4a023; border: 3px solid #ffffff; border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(244,160,35,0.25);
        }
        .sh-timeline-year {
          display: inline-block;
          background: #0f2347;
          color: #ffffff;
          font-size: 11.5px;
          font-weight: 800;
          padding: 2px 10px;
          border-radius: 20px;
          margin-bottom: 6px;
        }
        .sh-timeline-title {
          font-size: 16px;
          font-weight: 800;
          color: #0f2347;
          margin: 0 0 6px;
        }
        .sh-timeline-desc {
          color: #475569;
          font-size: 13.5px;
          line-height: 1.7;
          margin: 0;
        }

        /* ── Badges & Quotas ── */
        .sh-badge-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
          gap: 16px;
          margin: 24px 0;
        }
        .sh-stat-box {
          background: linear-gradient(135deg, rgba(15,35,71,0.03), rgba(244,160,35,0.06));
          border: 1px solid rgba(15,35,71,0.08);
          border-radius: 14px;
          padding: 20px;
          text-align: center;
        }
        .sh-stat-val {
          font-size: 28px;
          font-weight: 900;
          color: #0f2347;
          margin-bottom: 4px;
        }
        .sh-stat-lbl {
          font-size: 12.5px;
          color: #64748b;
          font-weight: 600;
        }

        /* ── Mool Mantar Golden Box ── */
        .sh-mantar-box {
          background: linear-gradient(135deg, #0a1730 0%, #0f2347 100%);
          border: 1.5px solid #f4a023;
          border-radius: 20px;
          padding: clamp(26px, 4vw, 40px);
          color: #fff;
          text-align: center;
          margin-top: 36px;
          position: relative;
          overflow: hidden;
        }
        .sh-mantar-box::after {
          content: '☬';
          position: absolute; right: 20px; bottom: -20px; font-size: 140px;
          color: rgba(244,160,35,0.06); pointer-events: none;
        }
        .sh-mantar-gurmukhi {
          font-family: 'Noto Sans Gurmukhi', serif;
          font-size: clamp(20px, 2.8vw, 30px);
          color: #fbd38d;
          line-height: 1.6;
          margin-bottom: 16px;
          font-weight: 700;
        }
        .sh-mantar-trans {
          font-size: 14px;
          color: #cbd5e1;
          font-style: italic;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.8;
        }

        /* ── Dark Mode Parity ── */
        [data-theme="dark"] .sh-tabs-row { background: #0b172e; border-color: rgba(255,255,255,0.08); }
        [data-theme="dark"] .sh-tab-btn { color: #cbd5e1; }
        [data-theme="dark"] .sh-tab-btn:hover { background: #132240; }
        [data-theme="dark"] .sh-tab-btn.active { background: #f4a023; color: #060e1c; }
        [data-theme="dark"] .sh-tab-btn.active .sh-tab-punjabi { color: #060e1c; }
        [data-theme="dark"] .sh-card { background: #0b172e; border-color: rgba(255,255,255,0.08); }
        [data-theme="dark"] .sh-card-title { color: #f1f5f9; }
        [data-theme="dark"] .sh-card-header { border-bottom-color: rgba(255,255,255,0.06); }
        [data-theme="dark"] .sh-principle-card { background: #081224; border-color: rgba(255,255,255,0.06); }
        [data-theme="dark"] .sh-principle-name { color: #f1f5f9; }
        [data-theme="dark"] .sh-principle-desc { color: #94a3b8; }
        [data-theme="dark"] .sh-timeline-title { color: #f1f5f9; }
        [data-theme="dark"] .sh-timeline-desc { color: #94a3b8; }
        [data-theme="dark"] .sh-stat-box { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.06); }
        [data-theme="dark"] .sh-stat-val { color: #f4a023; }

        @media(max-width: 768px) {
          .sh-tabs-row { justify-content: flex-start; }
          .sh-tab-btn { min-width: 150px; padding: 10px 12px; }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="premium-hero">
        <div className="kinetic-bg" />
        <div className="hero-content-wrapper anim-fade-in">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244, 160, 35, 0.18)', border: '1px solid rgba(244, 160, 35, 0.4)', borderRadius: 20, padding: '4px 14px', marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: '#f4a023', fontWeight: 800, letterSpacing: 0.5 }}>☬ ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ • SIKH MINORITY INSTITUTION</span>
          </div>
          <h1 className="hero-title" style={{ margin: '0 0 10px' }}>
            Sikh Heritage &amp; <span>Minority Excellence</span>
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: 740, margin: '0 auto' }}>
            Founded in 1970 under the eternal light of Guru Nanak Dev Ji, Guru Nanak College, Dhanbad stands as Jharkhand's premier Sikh Minority Institution.
          </p>
        </div>
      </section>

      {/* TABS NAVIGATION & CONTEMPLATION CHIME */}
      <div className="sh-nav-wrap">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <button 
            onClick={handleChimeClick} 
            className={`sh-chime-btn ${isPlayingChime ? 'active' : ''}`}
            title="Listen to peaceful meditative chime"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#0f2347', border: '1.5px solid #f4a023', boxShadow: '0 4px 14px rgba(15,35,71,0.06)' }}
          >
            <Bell size={15} color="#f4a023" />
            <span>{isPlayingChime ? 'Playing Harmonic Chime...' : 'Contemplate (Harmonic Chime)'}</span>
          </button>
        </div>
        <div className="sh-tabs-row">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`sh-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="sh-tab-label">{tab.label}</span>
              <span className="sh-tab-punjabi">{tab.punjabi}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN TAB CONTENT */}
      <main className="sh-main-container">
        {/* TAB 1: ETERNAL PRINCIPLES */}
        {activeTab === 'philosophy' && (
          <article className="sh-card">
            <header className="sh-card-header">
              <div className="sh-card-icon">☬</div>
              <div>
                <h2 className="sh-card-title">Foundational Sikh Principles</h2>
                <div className="sh-card-subtitle">ਸਿੱਖ ਸਿਧਾਂਤ — Guiding every classroom, lecture hall, and laboratory</div>
              </div>
            </header>

            <p style={{ color: 'var(--text-mid, #475569)', lineHeight: 1.8, fontSize: 15, margin: '0 0 20px' }}>
              The pedagogical philosophy of Guru Nanak College is anchored in the universal teachings of Sri Guru Nanak Dev Ji 
              (1469–1539). These timeless tenets transcend religious boundaries, emphasizing truth, equality of all humanity, 
              dignity of labor, and shared community welfare.
            </p>

            <div className="sh-principles-grid">
              <div className="sh-principle-card">
                <div className="sh-principle-name">Naam Japo</div>
                <div className="sh-principle-punjabi">ਨਾਮ ਜਪੋ • Spiritual Awareness</div>
                <p className="sh-principle-desc">
                  Cultivating mental mindfulness, ethical integrity, and spiritual groundedness among students through regular contemplation and moral character building.
                </p>
              </div>

              <div className="sh-principle-card">
                <div className="sh-principle-name">Kirat Karo</div>
                <div className="sh-principle-punjabi">ਕਿਰਤ ਕਰੋ • Honest Hard Work</div>
                <p className="sh-principle-desc">
                  Commitment to rigorous academic effort, technical skill acquisition, and honest professional careers without resorting to deceit or shortcut paths.
                </p>
              </div>

              <div className="sh-principle-card">
                <div className="sh-principle-name">Vand Chhako</div>
                <div className="sh-principle-punjabi">ਵੰਡ ਛਕੋ • Selfless Sharing</div>
                <p className="sh-principle-desc">
                  Sharing fruits of knowledge, resources, and kindness with the marginalized. Embodied through college NSS drives, blood donation, and free Langar.
                </p>
              </div>

              <div className="sh-principle-card">
                <div className="sh-principle-name">Sarbat Da Bhala</div>
                <div className="sh-principle-punjabi">ਸਰਬੱਤ ਦਾ ਭਲਾ • Welfare of All</div>
                <p className="sh-principle-desc">
                  Universal inclusivity. GNC welcomes students of every caste, creed, gender, and economic status, maintaining absolute non-discrimination on campus.
                </p>
              </div>

              <div className="sh-principle-card">
                <div className="sh-principle-name">Vidya Vichari</div>
                <div className="sh-principle-punjabi">ਵਿਦਿਆ ਵੀਚਾਰੀ ਤਾਂ ਪਰਉਪਕਾਰੀ</div>
                <p className="sh-principle-desc">
                  "True education is that which makes a person an altruistic benefactor to others." This sacred hymn is the official academic motto of our institution.
                </p>
              </div>

              <div className="sh-principle-card">
                <div className="sh-principle-name">Deg Tegh Fateh</div>
                <div className="sh-principle-punjabi">ਦੇਗ ਤੇਗ ਫ਼ਤਿਹ • Sustenance & Justice</div>
                <p className="sh-principle-desc">
                  Empowering youth with the ladle (Deg: nurturing the hungry) and the sword of wisdom (Tegh: defending righteousness and truth in public life).
                </p>
              </div>
            </div>

            {/* GOLDEN MOOL MANTAR CALLOUT */}
            <div className="sh-mantar-box">
              <div className="sh-mantar-gurmukhi">
                ੴ ਸਤਿਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥
              </div>
              <div className="sh-mantar-trans">
                "One Universal Creator God. The Name Is Truth. Creative Being Personified. No Fear. No Hatred. 
                Image Of The Undying, Beyond Birth, Self-Existent. By Guru's Grace." — Opening Hymn of Sri Guru Granth Sahib Ji
              </div>
            </div>
          </article>
        )}

        {/* TAB 2: FOUNDER & ROOTS */}
        {activeTab === 'history' && (
          <article className="sh-card">
            <header className="sh-card-header">
              <div className="sh-card-icon"><Landmark size={26} color="#f4a023" /></div>
              <div>
                <h2 className="sh-card-title">Founding Fathers & Historical Odyssey</h2>
                <div className="sh-card-subtitle">ਸਾਡਾ ਵਿਰਸਾ — From a bold community initiative in 1970 to a premier degree institution</div>
              </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 30, alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f2347', margin: '0 0 12px' }}>
                  The Vision of Sardar Pritam Singh Sahni
                </h3>
                <p style={{ color: 'var(--text-mid, #475569)', lineHeight: 1.68, fontSize: 15, textAlign: 'justify', textJustify: 'inter-word', textWrap: 'pretty' }}>
                  In the late 1960s, Dhanbad was burgeoning as the coal capital of India, yet higher education facilities for middle-class 
                  and underprivileged families were scarce. Led by visionary philanthropist <strong>Sardar Pritam Singh Sahni</strong> alongside 
                  esteemed leaders of the local Sikh Gurudwara Prabandhak Committee, the Sikh community resolved to establish an institution 
                  of national stature.
                </p>
                <p style={{ color: 'var(--text-mid, #475569)', lineHeight: 1.68, fontSize: 15, textAlign: 'justify', textJustify: 'inter-word', textWrap: 'pretty' }}>
                  Founded in 1970, Guru Nanak College began with a singular resolve: high-quality higher education accessible to everyone, 
                  preserving ethical virtues while fostering contemporary scientific and commerce disciplines.
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(15,35,71,0.06), rgba(244,160,35,0.12))',
                borderRadius: 18, padding: '26px', border: '1.5px solid rgba(244,160,35,0.3)'
              }}>
                <div style={{ fontSize: 13, fontWeight: 900, color: '#d97706', textTransform: 'uppercase', letterSpacing: 1 }}>Official Recognition</div>
                <h4 style={{ fontSize: 18, fontWeight: 900, color: '#0f2347', margin: '8px 0 14px' }}>University Grants Commission</h4>
                <p style={{ color: '#475569', fontSize: 13.5, lineHeight: 1.7, margin: '0 0 14px' }}>
                  The college was formally recognized under <strong>Section 2(f) & 12(B)</strong> of the UGC Act 1956 in 1972, rendering it eligible 
                  for central grants, faculty development initiatives, and research funding.
                </p>
                <Link to="/about-us/regulations/ugc-certificate" style={{ color: '#0f2347', fontWeight: 800, fontSize: 13, textDecoration: 'none' }}>
                  View UGC 2(f) & 12(B) Certificate →
                </Link>
              </div>
            </div>

            {/* TIMELINE */}
            <div style={{ marginTop: '2.5rem' }}>
              <VerticalTimeline lineColor="#e2e8f0" layout="1-column-left">
                <VerticalTimelineElement
                  date="1970"
                  contentStyle={{ background: '#0f2347', color: '#fff', borderRadius: '14px', boxShadow: '0 8px 25px rgba(15,35,71,0.15)' }}
                  contentArrowStyle={{ borderRight: '7px solid #0f2347' }}
                  iconStyle={{ background: '#f4a023', color: '#0f2347', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  icon={<Landmark size={18} color="#0f2347" />}
                >
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#f4a023', margin: '0 0 6px' }}>Establishment of Guru Nanak College</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6 }}>
                    Inaugurated by the Sikh community of Dhanbad under the patronage of Sardar Pritam Singh Sahni to empower local youth with value-based higher education.
                  </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                  date="1972"
                  contentStyle={{ background: '#ffffff', color: '#0f2347', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 8px 25px rgba(0,0,0,0.05)' }}
                  contentArrowStyle={{ borderRight: '7px solid #ffffff' }}
                  iconStyle={{ background: '#0f2347', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  icon={<FileText size={18} color="#ffffff" />}
                >
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f2347', margin: '0 0 6px' }}>UGC 2(f) & 12(B) Status</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                    Secured permanent UGC recognition under sections 2(f) and 12(B), establishing recognized academic credibility across the nation.
                  </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                  date="1992"
                  contentStyle={{ background: '#ffffff', color: '#0f2347', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 8px 25px rgba(0,0,0,0.05)' }}
                  contentArrowStyle={{ borderRight: '7px solid #ffffff' }}
                  iconStyle={{ background: '#3b82f6', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  icon={<GraduationCap size={18} color="#ffffff" />}
                >
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f2347', margin: '0 0 6px' }}>Affiliation with Vinoba Bhave University (VBU)</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                    Transferred from Ranchi University to the newly chartered Vinoba Bhave University, Hazaribagh as a premier affiliated college.
                  </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                  date="2017"
                  contentStyle={{ background: '#ffffff', color: '#0f2347', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 8px 25px rgba(0,0,0,0.05)' }}
                  contentArrowStyle={{ borderRight: '7px solid #ffffff' }}
                  iconStyle={{ background: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  icon={<Sparkles size={18} color="#ffffff" />}
                >
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f2347', margin: '0 0 6px' }}>B.B.M. Koyalanchal University (BBMKU)</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                    Became one of the cornerstone institutions of BBMKU Dhanbad upon the university’s establishment.
                  </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                  date="Present"
                  contentStyle={{ background: 'linear-gradient(135deg, #0f2347, #1e3a8a)', color: '#fff', borderRadius: '14px', boxShadow: '0 8px 25px rgba(15,35,71,0.2)' }}
                  contentArrowStyle={{ borderRight: '7px solid #0f2347' }}
                  iconStyle={{ background: '#f4a023', color: '#0f2347', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  icon={<Award size={18} color="#0f2347" />}
                >
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#f4a023', margin: '0 0 6px' }}>56 Years of Unbroken Academic Legacy</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6 }}>
                    Over 4,000 enrolled students across two vibrant campuses: Bhuda Campus (Main & Boys Wing) and Bank More Campus (Girls & Vocational Wing).
                  </p>
                </VerticalTimelineElement>
              </VerticalTimeline>
            </div>
          </article>
        )}

        {/* TAB 3: MINORITY STATUS & RIGHTS */}
        {activeTab === 'minority' && (
          <article className="sh-card">
            <header className="sh-card-header">
              <div className="sh-card-icon"><Scale size={26} color="#f4a023" /></div>
              <div>
                <h2 className="sh-card-title">Sikh Minority Status & Legal Protections</h2>
                <div className="sh-card-subtitle">ਘੱਟ ਗਿਣਤੀ ਦਰਜਾ — Recognized by NCMEI under Constitutional Article 30(1)</div>
              </div>
            </header>

            <div className="sh-badge-grid">
              <div className="sh-stat-box">
                <div className="sh-stat-val">50%</div>
                <div className="sh-stat-lbl">Minority Quota Provision</div>
              </div>
              <div className="sh-stat-box">
                <div className="sh-stat-val">NCMEI</div>
                <div className="sh-stat-lbl">Statutory Minority Certification</div>
              </div>
              <div className="sh-stat-box">
                <div className="sh-stat-val">Art. 30(1)</div>
                <div className="sh-stat-lbl">Constitutional Safeguard</div>
              </div>
              <div className="sh-stat-box">
                <div className="sh-stat-val">NAAC</div>
                <div className="sh-stat-lbl">Accredited Institution</div>
              </div>
            </div>

            <h3 style={{ fontSize: 19, fontWeight: 800, color: '#0f2347', margin: '24px 0 12px' }}>
              Constitutional Basis & Autonomous Administration
            </h3>
            <p style={{ color: 'var(--text-mid, #475569)', lineHeight: 1.68, fontSize: 15, textAlign: 'justify', textJustify: 'inter-word', textWrap: 'pretty' }}>
              Guru Nanak College is formally recognized as a <strong>Religious Minority Educational Institution</strong> by the 
              <strong> National Commission for Minority Educational Institutions (NCMEI)</strong>, a statutory body established by the 
              Government of India under the NCMEI Act 2004.
            </p>
            <p style={{ color: 'var(--text-mid, #475569)', lineHeight: 1.68, fontSize: 15, textAlign: 'justify', textJustify: 'inter-word', textWrap: 'pretty' }}>
              Under <strong>Article 30(1) of the Constitution of India</strong>, minority communities have the fundamental right to establish 
              and administer educational institutions of their choice. This grants the Governing Body autonomous authority in faculty appointments, 
              institutional governance, and strategic curriculum enhancement while strictly adhering to university academic schedules.
            </p>

            <div style={{
              background: '#f8fafc', borderRadius: 16, padding: '24px', border: '1px solid #e2e8f0', marginTop: 24
            }}>
              <h4 style={{ fontSize: 16, fontWeight: 800, color: '#0f2347', margin: '0 0 10px' }}>
                Minority Reservation & Admission Guidance
              </h4>
              <ul style={{ paddingLeft: 20, margin: 0, color: '#475569', fontSize: 14, lineHeight: 1.8 }}>
                <li>Up to <strong>50% of total intake capacity</strong> across UG programs (BA, B.Sc, B.Com, BCA) is reserved for Sikh community candidates.</li>
                <li>Unfilled minority quota seats are converted to the general merit pool in subsequent admission counseling rounds.</li>
                <li>Minority candidates must upload their Minority Certificate / Community Declaration during Chancellor Portal registration.</li>
              </ul>
              
              <div style={{ marginTop: 18, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link to="/about-us/regulations/minority-exemption" style={{
                  background: '#0f2347', color: '#fff', padding: '10px 18px', borderRadius: 10,
                  fontSize: 13, fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7
                }}>
                  <FileText size={14} /> View Minority Exemption Regulations
                </Link>
                <Link to="/about-us/various-committees/minority" style={{
                  background: 'rgba(244,160,35,0.15)', color: '#d97706', border: '1px solid rgba(244,160,35,0.4)',
                  padding: '10px 18px', borderRadius: 10, fontSize: 13, fontWeight: 800, textDecoration: 'none'
                }}>
                  Minority Cell Committee →
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* TAB 4: GURUDWARA & SEWA */}
        {activeTab === 'spiritual' && (
          <article className="sh-card">
            <header className="sh-card-header">
              <div className="sh-card-icon"><HeartHandshake size={26} color="#f4a023" /></div>
              <div>
                <h2 className="sh-card-title">Gurudwara Sahib & Community Sewa</h2>
                <div className="sh-card-subtitle">ਸੇਵਾ ਅਤੇ ਅਰਦਾਸ — Nurturing compassion, brotherhood, and selfless dedication</div>
              </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 24 }}>
              <div style={{ background: '#f8fafc', borderRadius: 16, padding: '24px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f2347', margin: '0 0 10px' }}>
                  Campus Gurudwara Sahib
                </h3>
                <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.7 }}>
                  The college campus features a serene Gurudwara Sahib serving as a spiritual oasis where daily Ardaas (prayer), 
                  Kirtan recitations, and peaceful reflection take place. Students of all faiths are welcome to visit for contemplation and mental clarity.
                </p>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: 16, padding: '24px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f2347', margin: '0 0 10px' }}>
                  Langar Tradition (Free Community Kitchen)
                </h3>
                <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.7 }}>
                  Instituted by Guru Nanak Dev Ji to abolish caste distinctions, Langar is served during Prakash Purab, Baisakhi, 
                  and College Foundation Day, where faculty, management, and students sit together on the floor as equals.
                </p>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: 16, padding: '24px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f2347', margin: '0 0 10px' }}>
                  Gurpurb & Cultural Celebrations
                </h3>
                <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.7 }}>
                  Annual celebrations honoring Sri Guru Nanak Dev Ji’s Prakash Parv, Baisakhi, and communal Sadbhavana Diwas, 
                  featuring devotional music, poetic symposia, and academic debates on ethical philosophy.
                </p>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: 16, padding: '24px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f2347', margin: '0 0 10px' }}>
                  NSS & Community Outreach
                </h3>
                <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.7 }}>
                  Active National Service Scheme (NSS) units conducting disaster relief, cleanliness drives, blood donation camps, 
                  and free tutorial support for underprivileged children in Dhanbad colliery settlements.
                </p>
              </div>
            </div>
          </article>
        )}

        {/* TAB 5: SCHOLARSHIPS & WELFARE */}
        {activeTab === 'scholarships' && (
          <article className="sh-card">
            <header className="sh-card-header">
              <div className="sh-card-icon"><GraduationCap size={26} color="#f4a023" /></div>
              <div>
                <h2 className="sh-card-title">Minority & Merit Scholarships</h2>
                <div className="sh-card-subtitle">ਵਜ਼ੀਫ਼ੇ ਤੇ ਮਦਦ — Ensuring no deserving student is denied higher education</div>
              </div>
            </header>

            <p style={{ color: 'var(--text-mid, #475569)', lineHeight: 1.8, fontSize: 15, margin: '0 0 24px' }}>
              In accordance with Sikh philanthropic traditions and Government of India mandates, multiple scholarship schemes 
              and fee relief policies are accessible to students enrolled at Guru Nanak College:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ background: '#f8fafc', borderRadius: 16, padding: '20px 24px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f2347', margin: 0 }}>
                    1. Post-Matric Scholarship Scheme for Minorities (MoMA)
                  </h3>
                  <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 800 }}>Central Govt</span>
                </div>
                <p style={{ color: '#475569', fontSize: 13.5, lineHeight: 1.7, margin: '8px 0 10px' }}>
                  Administered by Ministry of Minority Affairs (MoMA) via the National Scholarship Portal (NSP) for Sikh, Muslim, Christian, Jain, Buddhist, and Parsi students. Covers tuition fees and maintenance allowances.
                </p>
                <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#0f2347', fontWeight: 800, fontSize: 12.5 }}>
                  Apply on NSP Portal (scholarships.gov.in) →
                </a>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: 16, padding: '20px 24px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f2347', margin: 0 }}>
                    2. Jharkhand E-Kalyan Welfare Scholarships
                  </h3>
                  <span style={{ background: '#fef3c7', color: '#92400e', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 800 }}>State Govt</span>
                </div>
                <p style={{ color: '#475569', fontSize: 13.5, lineHeight: 1.7, margin: '8px 0 10px' }}>
                  Welfare department financial assistance for SC, ST, OBC, and minority students domiciled in Jharkhand, with online institutional verification done right from the college desk.
                </p>
                <a href="https://ekalyan.cgg.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#0f2347', fontWeight: 800, fontSize: 12.5 }}>
                  Apply on E-Kalyan Portal →
                </a>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: 16, padding: '20px 24px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f2347', margin: 0 }}>
                    3. College Management Fee Relief & Gurudwara Prabandhak Aid
                  </h3>
                  <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 800 }}>Institutional</span>
                </div>
                <p style={{ color: '#475569', fontSize: 13.5, lineHeight: 1.7, margin: '8px 0 10px' }}>
                  Direct tuition fee concessions provided by Guru Nanak College Management for economically disadvantaged students, orphaned scholars, and outstanding sports achievers.
                </p>
                <Link to="/scholarships" style={{ color: '#0f2347', fontWeight: 800, fontSize: 12.5 }}>
                  Check College Scholarship Details →
                </Link>
              </div>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
