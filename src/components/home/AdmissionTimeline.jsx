// src/components/home/AdmissionTimeline.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { COLORS } from '../../styles/colors';

const N = COLORS.navy;
const G = COLORS.gold;

const STEPS = [
  {
    id: 1,
    icon: '📝',
    title: 'Registration',
    subtitle: 'Chancellor Portal',
    desc: 'Fill the online application form on Jharkhand Chancellor Portal selecting Guru Nanak College.',
    tag: 'Step 01'
  },
  {
    id: 2,
    icon: '🏆',
    title: 'Merit List',
    subtitle: 'Cut-off & Selection',
    desc: 'Check departmental merit lists published on our website and notice boards.',
    tag: 'Step 02'
  },
  {
    id: 3,
    icon: '🔍',
    title: 'Verification',
    subtitle: 'Document Screening',
    desc: 'College admission committee verifies your academic marks, certificates and reservations.',
    tag: 'Step 03'
  },
  {
    id: 4,
    icon: '💳',
    title: 'Fee Payment',
    subtitle: 'Online Confirmation',
    desc: 'Submit your semester admission fee securely online to lock in your confirmed seat.',
    tag: 'Step 04'
  },
  {
    id: 5,
    icon: '🎉',
    title: 'Final Admission',
    subtitle: 'Welcome to GNC',
    desc: 'Collect your official admission slip, college roll number and college ID card.',
    tag: 'Step 05'
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const CSS = `
  /* ═════════════════════════════════════════════════════════
     PREMIUM ADMISSION TIMELINE — HYBRID RESPONSIVE DESIGN
     (1 Single Row on Desktop/Tablet + Balanced Vertical Spine on Mobile)
  ═════════════════════════════════════════════════════════ */

  .atl-root {
    padding: clamp(64px, 9vw, 120px) 20px;
    background: linear-gradient(175deg, #070c1a 0%, #0d162f 42%, #0b1a38 100%);
    position: relative;
    overflow: hidden;
    font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
  }

  /* ── Ambient Radial Orbs ── */
  .atl-root::before {
    content: '';
    position: absolute;
    top: -15%;
    right: -8%;
    width: 650px;
    height: 650px;
    background: radial-gradient(circle, rgba(244, 160, 35, 0.14) 0%, transparent 68%);
    pointer-events: none;
    animation: atl-ambient-glow 9s ease-in-out infinite alternate;
  }
  .atl-root::after {
    content: '';
    position: absolute;
    bottom: -15%;
    left: -8%;
    width: 550px;
    height: 550px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.09) 0%, transparent 65%);
    pointer-events: none;
    animation: atl-ambient-glow 11s ease-in-out 1.5s infinite alternate-reverse;
  }
  @keyframes atl-ambient-glow {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(35px, -25px) scale(1.18); }
  }

  /* ── Floating Background Particles ── */
  .atl-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .atl-dot {
    position: absolute;
    border-radius: 50%;
    background: ${G};
    opacity: 0;
    animation: atl-float-dot 7s ease-in-out infinite;
  }
  .atl-dot:nth-child(1) { width: 4px; height: 4px; top: 18%; left: 14%; animation-delay: 0s; }
  .atl-dot:nth-child(2) { width: 3px; height: 3px; top: 62%; left: 82%; animation-delay: 1.8s; }
  .atl-dot:nth-child(3) { width: 5px; height: 5px; top: 28%; left: 62%; animation-delay: 3.2s; }
  .atl-dot:nth-child(4) { width: 3px; height: 3px; top: 78%; left: 22%; animation-delay: 4.6s; }
  .atl-dot:nth-child(5) { width: 4px; height: 4px; top: 48%; left: 91%; animation-delay: 2.2s; }

  @keyframes atl-float-dot {
    0%, 100% { opacity: 0; transform: translateY(0) scale(0.6); }
    35% { opacity: 0.55; }
    50% { opacity: 0.35; transform: translateY(-32px) scale(1.1); }
    75% { opacity: 0.55; }
  }

  .atl-inner {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ── Header ── */
  .atl-header {
    text-align: center;
    margin-bottom: clamp(38px, 5vw, 64px);
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s cubic-bezier(.22, 1, .36, 1), transform 0.8s cubic-bezier(.22, 1, .36, 1);
  }
  .atl-header.vis { opacity: 1; transform: none; }

  .atl-badge {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: rgba(244, 160, 35, 0.1);
    border: 1px solid rgba(244, 160, 35, 0.25);
    color: ${G};
    padding: 7px 20px;
    border-radius: 50px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 18px;
    backdrop-filter: blur(10px);
  }
  .atl-badge-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${G};
    animation: atl-pulse-badge 1.8s ease-in-out infinite;
  }
  @keyframes atl-pulse-badge {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(244, 160, 35, 0.7); }
    50% { transform: scale(1.3); box-shadow: 0 0 0 8px rgba(244, 160, 35, 0); }
  }

  .atl-title {
    font-size: clamp(30px, 4.5vw, 52px);
    font-weight: 900;
    color: #fff;
    line-height: 1.1;
    letter-spacing: -1.8px;
    margin: 0 0 14px;
  }
  .atl-title span {
    background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #fef08a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .atl-sub {
    color: rgba(255, 255, 255, 0.58);
    font-size: clamp(13.5px, 1vw, 16.5px);
    max-width: 580px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* ═════════════════════════════════════════════════════════
     DESKTOP & TABLET: 1 SINGLE ROW WITH GENEROUS PADDING
  ═════════════════════════════════════════════════════════ */
  .atl-timeline-scroll {
    overflow-x: auto;
    overflow-y: visible;
    padding: 32px 10px 48px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(244, 160, 35, 0.35) transparent;
  }
  .atl-timeline-scroll::-webkit-scrollbar {
    height: 5px;
  }
  .atl-timeline-scroll::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.04);
    border-radius: 4px;
  }
  .atl-timeline-scroll::-webkit-scrollbar-thumb {
    background: rgba(244, 160, 35, 0.4);
    border-radius: 4px;
  }

  .atl-timeline-inner {
    min-width: 1040px;
    max-width: 1240px;
    margin: 0 auto;
    position: relative;
    padding: 20px 0 10px;
  }
  @media (min-width: 1120px) {
    .atl-timeline-inner {
      min-width: 100%;
    }
  }

  /* ── Horizontal Animated Progress Track (Desktop/Tablet) ── */
  .atl-track-wrap {
    position: relative;
    max-width: 100%;
    margin: 24px auto 58px;
    height: 36px;
    display: flex;
    align-items: center;
  }

  /* Static background line (spans col 1 center 10% to col 5 center 90%) */
  .atl-track-line-bg {
    position: absolute;
    left: 10%;
    right: 10%;
    height: 4px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 4px;
  }

  /* Glowing continuous beam fill */
  .atl-track-line-fill {
    position: absolute;
    left: 10%;
    height: 4px;
    background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 70%, #fff 100%);
    border-radius: 4px;
    box-shadow: 0 0 16px rgba(245, 158, 11, 0.85), 0 0 32px rgba(251, 191, 36, 0.5);
    transition: width 0.85s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.35s ease;
  }

  /* Leading glowing beam head (comet point) */
  .atl-beam-head {
    position: absolute;
    right: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    pointer-events: none;
    z-index: 5;
  }
  .atl-beam-core {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 0 10px #ffffff, 0 0 22px #fbbf24, 0 0 38px #f59e0b;
    animation: atl-core-pulse 1.4s ease-in-out infinite alternate;
  }
  @keyframes atl-core-pulse {
    0% { transform: scale(0.9); }
    100% { transform: scale(1.2); }
  }

  /* ── Milestone Checkpoint Nodes (Desktop & Tablet) ── */
  .atl-track-node {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #0f1a34;
    border: 2px solid rgba(255, 255, 255, 0.16);
    transition: all 0.45s cubic-bezier(.22, 1, .36, 1);
    z-index: 4;
    padding: 0;
    outline: none;
  }
  .atl-track-node:hover {
    transform: translate(-50%, -50%) scale(1.25);
    border-color: #fbbf24;
  }

  /* Upcoming Node */
  .atl-track-node.upcoming {
    border-color: rgba(255, 255, 255, 0.18);
    background: #101c3d;
  }
  .atl-node-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    transition: all 0.35s ease;
  }

  /* Passed / Completed Node */
  .atl-track-node.passed {
    background: #f59e0b;
    border-color: #fbbf24;
    box-shadow: 0 0 16px rgba(245, 158, 11, 0.65);
  }
  .atl-track-node.passed .atl-node-check {
    color: #0b1120;
    font-size: 13px;
    font-weight: 900;
    line-height: 1;
  }

  /* Active Node (Current Beam Position) */
  .atl-track-node.active {
    background: #ffffff;
    border-color: #f59e0b;
    border-width: 3px;
    transform: translate(-50%, -50%) scale(1.35);
    box-shadow: 0 0 24px rgba(245, 158, 11, 0.95), 0 0 45px rgba(251, 191, 36, 0.6);
  }
  .atl-track-node.active .atl-node-dot {
    background: #f59e0b;
    width: 10px;
    height: 10px;
    animation: atl-active-inner 1.2s ease-in-out infinite alternate;
  }
  @keyframes atl-active-inner {
    0% { transform: scale(0.85); opacity: 0.8; }
    100% { transform: scale(1.25); opacity: 1; }
  }

  /* Radiating ripple on active node */
  .atl-node-ripple {
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    border: 2px solid rgba(245, 158, 11, 0.6);
    pointer-events: none;
    animation: atl-ripple-anim 2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
  }
  @keyframes atl-ripple-anim {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2.2); opacity: 0; }
  }

  /* ═════════════════════════════════════════════════════════
     5 CARDS GRID
  ═════════════════════════════════════════════════════════ */
  .atl-cards {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    width: 100%;
  }

  .atl-card {
    opacity: 0;
    transform: translateY(32px) scale(0.96);
    transition: opacity 0.7s cubic-bezier(.22, 1, .36, 1),
                transform 0.7s cubic-bezier(.22, 1, .36, 1);
    cursor: pointer;
  }
  .atl-card.vis {
    opacity: 1;
    transform: none;
  }

  .atl-card-inner {
    background: rgba(255, 255, 255, 0.035);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 22px;
    padding: 24px 16px 22px;
    text-align: center;
    position: relative;
    overflow: hidden;
    transition: all 0.45s cubic-bezier(.22, 1, .36, 1);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Top accent shimmer border */
  .atl-card-inner::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2.5px;
    background: linear-gradient(90deg, transparent, rgba(244, 160, 35, 0.5), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  /* Hover state */
  .atl-card-inner:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(244, 160, 35, 0.35);
    transform: translateY(-7px);
    box-shadow: 0 22px 48px rgba(0, 0, 0, 0.38), 0 0 35px rgba(244, 160, 35, 0.1);
  }
  .atl-card-inner:hover::before { opacity: 1; }

  /* ── ACTIVE CARD STYLING (Current beam location) ── */
  .atl-card.active .atl-card-inner {
    background: rgba(244, 160, 35, 0.08);
    border-color: rgba(244, 160, 35, 0.45);
    transform: translateY(-9px);
    box-shadow: 0 24px 50px rgba(0, 0, 0, 0.45), 0 0 40px rgba(244, 160, 35, 0.22);
  }
  .atl-card.active .atl-card-inner::before {
    opacity: 1;
    background: linear-gradient(90deg, transparent, #fbbf24, transparent);
    height: 3px;
  }

  /* Passed Card Styling */
  .atl-card.passed .atl-card-inner {
    border-color: rgba(244, 160, 35, 0.18);
    background: rgba(255, 255, 255, 0.045);
  }

  /* Icon circle wrap */
  .atl-icon-wrap {
    position: relative;
    margin-bottom: 16px;
  }
  .atl-icon-ring {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02));
    border: 1.5px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    position: relative;
    z-index: 2;
    transition: all 0.45s cubic-bezier(.22, 1, .36, 1);
  }
  .atl-card-inner:hover .atl-icon-ring {
    transform: scale(1.08) rotate(-4deg);
    border-color: rgba(244, 160, 35, 0.45);
    background: rgba(244, 160, 35, 0.12);
  }
  .atl-card.active .atl-icon-ring {
    border-color: #fbbf24;
    background: rgba(244, 160, 35, 0.18);
    box-shadow: 0 0 28px rgba(244, 160, 35, 0.4);
    transform: scale(1.12);
  }
  .atl-card.passed .atl-icon-ring {
    border-color: rgba(244, 160, 35, 0.3);
    background: rgba(244, 160, 35, 0.08);
  }

  /* Pulsing icon glow */
  .atl-icon-glow {
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    background: ${G};
    filter: blur(18px);
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .atl-card.active .atl-icon-glow {
    opacity: 0.35;
    animation: atl-glow-breath 2.2s ease-in-out infinite alternate;
  }
  @keyframes atl-glow-breath {
    0% { transform: scale(0.9); opacity: 0.25; }
    100% { transform: scale(1.25); opacity: 0.45; }
  }

  /* Step Badge Pill */
  .atl-step-num {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3.5px 11px;
    border-radius: 20px;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 1.1px;
    text-transform: uppercase;
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.07);
    transition: all 0.35s ease;
  }
  .atl-card.active .atl-step-num {
    color: #0b1120;
    background: #fbbf24;
    border-color: #fbbf24;
    font-weight: 900;
    box-shadow: 0 0 14px rgba(251, 191, 36, 0.5);
  }
  .atl-card.passed .atl-step-num {
    color: #fbbf24;
    background: rgba(244, 160, 35, 0.12);
    border-color: rgba(244, 160, 35, 0.3);
  }

  .atl-step-title {
    font-size: 16px;
    font-weight: 800;
    color: #fff;
    margin: 0 0 4px;
    letter-spacing: -0.3px;
  }
  .atl-step-subtitle {
    font-size: 10px;
    font-weight: 700;
    color: #fbbf24;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 8px;
    opacity: 0.9;
  }
  .atl-step-desc {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.52);
    line-height: 1.55;
    margin: 0;
  }
  .atl-card.active .atl-step-desc {
    color: rgba(255, 255, 255, 0.8);
  }

  /* ── CTA Button ── */
  .atl-cta-wrap {
    display: flex;
    justify-content: center;
    margin-top: clamp(36px, 5vw, 56px);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s 0.6s, transform 0.8s 0.6s;
  }
  .atl-cta-wrap.vis { opacity: 1; transform: none; }
  .atl-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 15px 38px;
    border-radius: 50px;
    border: none;
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
    color: ${N};
    font-size: 14.5px;
    font-weight: 900;
    letter-spacing: 0.3px;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 8px 28px rgba(245, 158, 11, 0.4);
    transition: all 0.35s cubic-bezier(.22, 1, .36, 1);
  }
  .atl-cta:hover {
    transform: translateY(-3px) scale(1.025);
    box-shadow: 0 14px 40px rgba(245, 158, 11, 0.55);
    background: linear-gradient(135deg, #fbbf24, #fef08a);
  }
  .atl-cta-arr {
    display: inline-block;
    transition: transform 0.3s;
    font-size: 19px;
  }
  .atl-cta:hover .atl-cta-arr { transform: translateX(5px); }

  /* ═════════════════════════════════════════════════════════
     RESPONSIVE DESIGN — MULTI-BREAKPOINT SYSTEM
     Covers: iPad landscape → tablets → large phones → phones → small phones
  ═════════════════════════════════════════════════════════ */
  .atl-mobile-spine { display: none; }
  .atl-mobile-node { display: none; }

  /* ── TABLET LANDSCAPE (≤ 1100px): Tighten desktop cards ── */
  @media (max-width: 1100px) {
    .atl-card-inner {
      padding: 20px 12px 18px;
    }
    .atl-icon-ring {
      width: 58px;
      height: 58px;
      font-size: 24px;
    }
    .atl-step-title { font-size: 14.5px; }
    .atl-step-desc { font-size: 11.5px; }
  }

  /* ═════════════════════════════════════════════════════════
     MOBILE & SMALL TABLET (≤ 768px): VERTICAL SPINE LAYOUT
  ═════════════════════════════════════════════════════════ */
  @media (max-width: 768px) {
    .atl-root {
      padding: clamp(40px, 7vw, 68px) clamp(10px, 3vw, 20px) !important;
      overflow-x: hidden !important;
    }
    
    .atl-header {
      margin-bottom: 28px !important;
    }
    .atl-badge {
      font-size: 10px !important;
      padding: 6px 14px !important;
      gap: 7px !important;
      letter-spacing: 1.2px !important;
    }
    .atl-title {
      font-size: clamp(24px, 6.5vw, 34px) !important;
      letter-spacing: -1px !important;
    }
    .atl-sub {
      font-size: clamp(11.5px, 3vw, 13.5px) !important;
      padding: 0 4px;
    }

    .atl-timeline-scroll {
      overflow-x: visible !important;
      overflow-y: visible !important;
      padding: 0 !important;
    }

    .atl-timeline-inner {
      min-width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* Hide desktop horizontal track */
    .atl-track-wrap { display: none !important; }

    /* Vertical cards stack with spine on left */
    .atl-cards {
      display: flex !important;
      flex-direction: column !important;
      gap: clamp(10px, 3vw, 16px) !important;
      position: relative !important;
      padding-left: clamp(30px, 9vw, 42px) !important;
      padding-right: 0 !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }

    /* Background continuous vertical spine line */
    .atl-mobile-spine {
      display: block !important;
      position: absolute !important;
      left: clamp(11px, 3.4vw, 17px) !important;
      top: 24px !important;
      bottom: 28px !important;
      width: 3px !important;
      background: rgba(255, 255, 255, 0.08) !important;
      border-radius: 3px !important;
      pointer-events: none !important;
      z-index: 1 !important;
    }

    /* Animated vertical fill */
    .atl-mobile-spine-fill {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 3px !important;
      background: linear-gradient(180deg, #f59e0b 0%, #fbbf24 70%, #fff 100%) !important;
      border-radius: 3px !important;
      box-shadow: 0 0 14px rgba(245, 158, 11, 0.85) !important;
      transition: height 0.85s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.35s ease !important;
    }

    /* Vertical beam head on mobile */
    .atl-mobile-beam-head {
      position: absolute !important;
      bottom: -6px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      width: 12px !important;
      height: 12px !important;
      border-radius: 50% !important;
      background: #ffffff !important;
      box-shadow: 0 0 10px #ffffff, 0 0 18px #fbbf24 !important;
    }

    /* Mobile milestone dot on vertical spine */
    .atl-mobile-node {
      display: flex !important;
      position: absolute !important;
      left: clamp(-30px, -8vw, -24px) !important;
      top: 18px !important;
      width: clamp(17px, 5vw, 21px) !important;
      height: clamp(17px, 5vw, 21px) !important;
      border-radius: 50% !important;
      background: #0f1b3a !important;
      border: 2px solid rgba(255, 255, 255, 0.15) !important;
      align-items: center !important;
      justify-content: center !important;
      z-index: 5 !important;
      transition: all 0.4s ease !important;
    }
    .atl-card.upcoming .atl-mobile-node {
      background: #111e40 !important;
      border-color: rgba(255, 255, 255, 0.2) !important;
    }
    .atl-card.passed .atl-mobile-node {
      background: #f59e0b !important;
      border-color: #fbbf24 !important;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.6) !important;
      color: #080d1a !important;
      font-size: 10px !important;
      font-weight: 900 !important;
    }
    .atl-card.active .atl-mobile-node {
      background: #ffffff !important;
      border-color: #f59e0b !important;
      border-width: 2.5px !important;
      transform: scale(1.25) !important;
      box-shadow: 0 0 18px rgba(245, 158, 11, 0.95) !important;
    }
    .atl-mobile-node-inner {
      width: 5px !important;
      height: 5px !important;
      border-radius: 50% !important;
      background: #f59e0b !important;
    }

    .atl-card {
      opacity: 1 !important;
      transform: none !important;
      width: 100% !important;
    }

    .atl-card-inner {
      padding: 14px 14px !important;
      flex-direction: row !important;
      gap: 12px !important;
      text-align: left !important;
      align-items: flex-start !important;
      border-radius: 16px !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }
    .atl-icon-wrap {
      margin-bottom: 0 !important;
      flex-shrink: 0 !important;
    }
    .atl-icon-ring {
      width: 46px !important;
      height: 46px !important;
      font-size: 20px !important;
    }
    .atl-card-text {
      flex: 1 !important;
      min-width: 0 !important;
    }
    .atl-step-title {
      font-size: clamp(13px, 3.6vw, 15px) !important;
      margin-bottom: 2px !important;
      letter-spacing: -0.2px !important;
    }
    .atl-step-subtitle {
      font-size: clamp(8.5px, 2.4vw, 10px) !important;
      margin-bottom: 4px !important;
    }
    .atl-step-desc {
      font-size: clamp(10.5px, 2.9vw, 12px) !important;
      line-height: 1.5 !important;
    }
    .atl-step-num {
      font-size: clamp(7.5px, 2vw, 9px) !important;
      padding: 2.5px 9px !important;
      margin-bottom: 4px !important;
    }

    .atl-card.active .atl-card-inner {
      transform: translateX(2px) !important;
    }

    .atl-cta-wrap {
      margin-top: 28px !important;
    }
    .atl-cta {
      padding: 12px 28px !important;
      font-size: 13px !important;
      width: auto !important;
      max-width: 100% !important;
    }

    /* Glow effects should not cause overflow */
    .atl-icon-glow {
      inset: -6px !important;
    }
    .atl-node-ripple {
      inset: -6px !important;
    }
  }

  /* ── SMALL PHONES (≤ 480px): Further tighten spacing ── */
  @media (max-width: 480px) {
    .atl-root {
      padding: clamp(32px, 8vw, 52px) clamp(8px, 2.5vw, 14px) !important;
    }

    .atl-badge {
      font-size: 9px !important;
      padding: 5px 12px !important;
      gap: 6px !important;
      letter-spacing: 1px !important;
    }

    .atl-cards {
      gap: 10px !important;
      padding-left: clamp(28px, 8.5vw, 36px) !important;
    }

    .atl-mobile-spine {
      left: clamp(10px, 3vw, 14px) !important;
    }

    .atl-mobile-node {
      left: clamp(-28px, -8vw, -22px) !important;
      width: 17px !important;
      height: 17px !important;
    }

    .atl-card-inner {
      padding: 12px 10px !important;
      gap: 10px !important;
      border-radius: 14px !important;
    }

    .atl-icon-ring {
      width: 40px !important;
      height: 40px !important;
      font-size: 18px !important;
    }

    .atl-cta {
      padding: 11px 22px !important;
      font-size: 12.5px !important;
    }
  }

  /* ── VERY SMALL PHONES (≤ 360px): iPhone SE, Galaxy Fold etc. ── */
  @media (max-width: 360px) {
    .atl-root {
      padding: 28px 6px !important;
    }

    .atl-header {
      margin-bottom: 20px !important;
    }
    .atl-badge {
      font-size: 8px !important;
      padding: 4px 10px !important;
      gap: 5px !important;
      letter-spacing: 0.8px !important;
    }
    .atl-title {
      font-size: 22px !important;
      letter-spacing: -0.8px !important;
    }
    .atl-sub {
      font-size: 11px !important;
    }

    .atl-cards {
      gap: 8px !important;
      padding-left: 26px !important;
    }

    .atl-mobile-spine {
      left: 9px !important;
    }

    .atl-mobile-node {
      left: -24px !important;
      top: 14px !important;
      width: 15px !important;
      height: 15px !important;
    }
    .atl-card.passed .atl-mobile-node {
      font-size: 8px !important;
    }
    .atl-mobile-node-inner {
      width: 4px !important;
      height: 4px !important;
    }

    .atl-card-inner {
      padding: 10px 8px !important;
      gap: 8px !important;
      border-radius: 12px !important;
    }

    .atl-icon-ring {
      width: 36px !important;
      height: 36px !important;
      font-size: 16px !important;
    }

    .atl-step-title {
      font-size: 12.5px !important;
    }
    .atl-step-subtitle {
      font-size: 8px !important;
      margin-bottom: 3px !important;
    }
    .atl-step-desc {
      font-size: 10px !important;
      line-height: 1.45 !important;
    }
    .atl-step-num {
      font-size: 7px !important;
      padding: 2px 7px !important;
    }

    .atl-card.active .atl-card-inner {
      transform: translateX(1px) !important;
    }

    .atl-cta {
      padding: 10px 18px !important;
      font-size: 11.5px !important;
      gap: 6px !important;
    }
    .atl-cta-arr {
      font-size: 15px !important;
    }
  }

  /* ── GLOBAL: Prevent any horizontal overflow on mobile ── */
  @media (max-width: 768px) {
    .atl-root,
    .atl-inner,
    .atl-timeline-scroll,
    .atl-timeline-inner,
    .atl-cards {
      overflow-x: hidden !important;
    }
    /* Ambient orbs should not cause overflow */
    .atl-root::before {
      width: min(450px, 90vw) !important;
      height: min(450px, 90vw) !important;
      right: -15% !important;
    }
    .atl-root::after {
      width: min(380px, 80vw) !important;
      height: min(380px, 80vw) !important;
      left: -15% !important;
    }
  }

  /* ══ Dark Theme ══ */
  [data-theme="dark"] .atl-root {
    background: linear-gradient(175deg, #04070f 0%, #070e20 40%, #08142c 100%);
  }
`;

export default function AdmissionTimeline() {
  const [sectionRef, sectionVis] = useInView(0.08);
  const [cardsRef, cardsVis] = useInView(0.05);

  // Active step index (0 to 4)
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isRewinding, setIsRewinding] = useState(false);
  const resumeTimerRef = useRef(null);

  // Continuous auto-advancing loop across all 5 steps:
  // 0 -> 1 -> 2 -> 3 -> 4 -> 0
  useEffect(() => {
    if (!cardsVis || isPaused) return;

    // Step 5 (Final Admission) stays longer to celebrate full completion
    const stepDuration = activeStep === STEPS.length - 1 ? 3800 : 2800;

    const timer = setTimeout(() => {
      if (activeStep === STEPS.length - 1) {
        // Complete cycle! Briefly fade and restart from step 0
        setIsRewinding(true);
        setTimeout(() => {
          setActiveStep(0);
          setIsRewinding(false);
        }, 360);
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }, stepDuration);

    return () => clearTimeout(timer);
  }, [activeStep, cardsVis, isPaused]);

  // Click on a step or dot jumps immediately and pauses auto-cycle for 6 seconds
  const handleStepClick = useCallback((index) => {
    setActiveStep(index);
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 6000);
  }, []);

  // Desktop horizontal beam width:
  // Spans between 10% (Node 1) and 90% (Node 5) -> total span = 80%
  const desktopBeamWidth = isRewinding
    ? 0
    : (activeStep / (STEPS.length - 1)) * 80;

  // Mobile vertical beam height: 0% to 100%
  const mobileBeamHeight = isRewinding
    ? 0
    : (activeStep / (STEPS.length - 1)) * 100;

  return (
    <section className="atl-root" ref={sectionRef}>
      <style>{CSS}</style>

      {/* Ambient background particles */}
      <div className="atl-particles">
        <div className="atl-dot" />
        <div className="atl-dot" />
        <div className="atl-dot" />
        <div className="atl-dot" />
        <div className="atl-dot" />
      </div>

      <div className="atl-inner">
        {/* Header with live dynamic step counter */}
        <div className={`atl-header${sectionVis ? ' vis' : ''}`}>
          <div className="atl-badge">
            <span className="atl-badge-dot" />
            Student Journey &bull; Step {activeStep + 1} of {STEPS.length}: {STEPS[activeStep].title}
          </div>
          <h2 className="atl-title">
            Admission <span>Process Roadmap</span>
          </h2>
          <p className="atl-sub">
            Your step-by-step interactive roadmap from application to final enrollment at Guru Nanak College, Dhanbad.
          </p>
        </div>

        {/* Timeline Container */}
        <div
          className="atl-timeline-scroll"
          ref={cardsRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="atl-timeline-inner">
            {/* DESKTOP/TABLET: Animated Progress Beam Track */}
            <div className="atl-track-wrap" aria-hidden="true">
              {/* Background track line */}
              <div className="atl-track-line-bg" />

              {/* Glowing animated fill */}
              <div
                className="atl-track-line-fill"
                style={{
                  width: `${desktopBeamWidth}%`,
                  opacity: isRewinding ? 0 : 1,
                }}
              >
                {/* Glowing comet head at the leading edge of the beam */}
                <div className="atl-beam-head">
                  <div className="atl-beam-core" />
                </div>
              </div>

              {/* 5 Milestone Checkpoint Nodes aligned with the 5 card centers */}
              {STEPS.map((step, i) => {
                const leftPct = 10 + i * 20; // 10%, 30%, 50%, 70%, 90%
                const isPassed = i < activeStep;
                const isActive = i === activeStep;
                const stateClass = isActive ? 'active' : isPassed ? 'passed' : 'upcoming';

                return (
                  <button
                    key={step.id}
                    type="button"
                    className={`atl-track-node ${stateClass}`}
                    style={{ left: `${leftPct}%` }}
                    onClick={() => handleStepClick(i)}
                    aria-label={`Jump to Step ${step.id}: ${step.title}`}
                    title={`Step ${step.id}: ${step.title}`}
                  >
                    {isPassed ? (
                      <span className="atl-node-check">✓</span>
                    ) : (
                      <span className="atl-node-dot" />
                    )}
                    {isActive && <span className="atl-node-ripple" />}
                  </button>
                );
              })}
            </div>

            {/* Cards Grid */}
            <div className="atl-cards">
              {/* MOBILE: Continuous Vertical Spine */}
              <div className="atl-mobile-spine" aria-hidden="true">
                <div
                  className="atl-mobile-spine-fill"
                  style={{
                    height: `${mobileBeamHeight}%`,
                    opacity: isRewinding ? 0 : 1,
                  }}
                >
                  <div className="atl-mobile-beam-head" />
                </div>
              </div>

              {STEPS.map((step, i) => {
                const isPassed = i < activeStep;
                const isActive = i === activeStep;
                const stateClass = isActive ? 'active' : isPassed ? 'passed' : 'upcoming';

                return (
                  <div
                    key={step.id}
                    className={`atl-card ${stateClass}${cardsVis ? ' vis' : ''}`}
                    style={{ transitionDelay: cardsVis ? `${0.1 + i * 0.08}s` : '0s' }}
                    onClick={() => handleStepClick(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleStepClick(i);
                      }
                    }}
                    aria-label={`Step ${step.id}: ${step.title}`}
                  >
                    {/* Mobile Milestone Checkpoint Node */}
                    <div className="atl-mobile-node" aria-hidden="true">
                      {isPassed ? (
                        '✓'
                      ) : isActive ? (
                        <span className="atl-mobile-node-inner" />
                      ) : null}
                    </div>

                    <div className="atl-card-inner">
                      <div className="atl-icon-wrap">
                        <div className="atl-icon-glow" />
                        <div className="atl-icon-ring">{step.icon}</div>
                      </div>
                      <div className="atl-card-text">
                        <span className="atl-step-num">
                          {isPassed ? `✓ ${step.tag}` : isActive ? `● ${step.tag} Active` : step.tag}
                        </span>
                        <h3 className="atl-step-title">{step.title}</h3>
                        <div className="atl-step-subtitle">{step.subtitle}</div>
                        <p className="atl-step-desc">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className={`atl-cta-wrap${cardsVis ? ' vis' : ''}`}>
          <a
            href="https://universities.jharkhand.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="atl-cta"
          >
            🎓 Apply on Chancellor Portal <span className="atl-cta-arr">&rsaquo;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
