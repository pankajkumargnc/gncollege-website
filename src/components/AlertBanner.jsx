// src/components/AlertBanner.jsx
// ✅ FIXED: setTimeout cleanup, popup logic alag useEffect mein, stale closure fix

import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';

export default function AlertBanner() {
  const [alerts,     setAlerts]     = useState([]);
  const [dismissed,  setDismissed]  = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('gnc_dismissed_alerts') || '[]'); }
    catch { return []; }
  });
  const [showPopup,  setShowPopup]  = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [bannerIdx,  setBannerIdx]  = useState(0);

  const navy = COLORS.navy || '#0f2347';
  const gold = COLORS.gold || '#f4a023';

  // ── Step 1: Firestore se active alerts fetch karo ─────────────────────────
  // FIX: Sirf alerts set karo — popup logic alag useEffect mein
  useEffect(() => {
    const q = query(collection(db, 'alerts'), where('isActive', '==', true));
    return onSnapshot(q, snap => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setAlerts(data);
    });
  }, []); // ← dismissed dependency nahi — onSnapshot har naye alert pe trigger hoga

  // ── Step 2: Popup logic — alerts change hone par chalao ──────────────────
  // FIX: Alag useEffect + setTimeout cleanup
  useEffect(() => {
    if (alerts.length === 0) return;

    const undismissed = alerts.filter(a => !dismissed.includes(a.id));
    if (undismissed.length === 0) return;

    setCurrentIdx(0);

    // FIX: clearTimeout se memory leak band
    const t = setTimeout(() => setShowPopup(true), 1200);
    return () => clearTimeout(t);
  }, [alerts]); // ← dismissed intentionally omit — sirf naye alerts pe popup

  // ── Banner ticker — har 4 second mein cycle karo ─────────────────────────
  useEffect(() => {
    if (alerts.length <= 1) return;
    const t = setInterval(() => setBannerIdx(i => (i + 1) % alerts.length), 4000);
    return () => clearInterval(t);
  }, [alerts.length]);

  // ── Alert dismiss karo (session mein save hoga) ───────────────────────────
  const dismissAlert = (id) => {
    const next = [...dismissed, id];
    setDismissed(next);
    try { sessionStorage.setItem('gnc_dismissed_alerts', JSON.stringify(next)); } catch { }

    const remaining = alerts.filter(a => !next.includes(a.id));
    if (remaining.length > 0) {
      setCurrentIdx(0);
    } else {
      setShowPopup(false);
    }
  };

  const undismissedAlerts = alerts.filter(a => !dismissed.includes(a.id));
  const popupAlert        = undismissedAlerts[currentIdx];

  if (alerts.length === 0) return null;

  return (
    <>
      {/* ── Scrolling Red Banner ─────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(90deg, #dc2626, #b91c1c, #dc2626)',
        color: '#fff', padding: '8px 0', overflow: 'hidden',
        borderBottom: '2px solid #991b1b', zIndex: 9998, position: 'relative',
      }}>
        <style>{`
          @keyframes gnc-scroll {
            0%   { transform: translateX(100vw); }
            100% { transform: translateX(-100%); }
          }
          .gnc-alert-scroll {
            display: inline-block;
            white-space: nowrap;
            animation: gnc-scroll 18s linear infinite;
          }
          .gnc-alert-scroll:hover { animation-play-state: paused; }
        `}</style>
        <div className="gnc-alert-scroll"
          style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: .3 }}>
          🚨&nbsp;&nbsp;
          {alerts.map((a, i) => (
            <span key={a.id}>
              {a.text}
              {i < alerts.length - 1 && (
                <span style={{ margin: '0 32px', opacity: .5 }}>•</span>
              )}
            </span>
          ))}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>

      {/* ── Popup Modal ──────────────────────────────────────────────────── */}
      {showPopup && popupAlert && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999999,
          background: 'rgba(10,15,30,.75)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }}>
          <style>{`
            @keyframes gnc-pop {
              from { opacity: 0; transform: scale(.88) translateY(20px); }
              to   { opacity: 1; transform: scale(1)  translateY(0);    }
            }
            .gnc-popup { animation: gnc-pop .35s cubic-bezier(.34,1.56,.64,1) both; }
            @keyframes gnc-ring {
              0%,100% { transform: rotate(-8deg); }
              50%     { transform: rotate( 8deg); }
            }
            .gnc-bell { display: inline-block; animation: gnc-ring .6s ease-in-out 3; }
          `}</style>

          <div className="gnc-popup" style={{
            background: '#fff', borderRadius: 20, maxWidth: 520, width: '100%',
            boxShadow: '0 30px 80px rgba(0,0,0,.4)', overflow: 'hidden',
          }}>

            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              padding: '22px 28px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="gnc-bell" style={{ fontSize: 28 }}>🔔</span>
                <div>
                  <div style={{ color: '#fff', fontWeight: 900, fontSize: 17, letterSpacing: -.3 }}>
                    Urgent Notice
                  </div>
                  <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 12, marginTop: 2 }}>
                    Guru Nanak College, Dhanbad
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)',
                  color: '#fff', width: 32, height: 32, borderRadius: '50%',
                  cursor: 'pointer', fontSize: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.15)'}
              >✕</button>
            </div>

            {/* Body */}
            <div style={{ padding: '28px 30px' }}>
              <p style={{
                fontSize: 15.5, color: '#1e293b', lineHeight: 1.75,
                fontWeight: 500, margin: '0 0 24px',
              }}>
                {popupAlert.text}
              </p>

              {/* Multiple alerts dots */}
              {undismissedAlerts.length > 1 && (
                <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
                  {undismissedAlerts.map((a, i) => (
                    <div key={a.id} onClick={() => setCurrentIdx(i)}
                      style={{
                        width: i === currentIdx ? 20 : 8, height: 8, borderRadius: 4,
                        background: i === currentIdx ? '#dc2626' : '#e2e8f0',
                        cursor: 'pointer', transition: 'all .3s',
                      }}
                    />
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => dismissAlert(popupAlert.id)}
                  style={{
                    flex: 1, padding: '12px 20px', borderRadius: 10,
                    background: `linear-gradient(135deg, ${navy}, #1a3a7c)`,
                    color: '#fff', border: 'none', fontWeight: 800, fontSize: 14,
                    cursor: 'pointer', transition: 'all .2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '.9'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  ✓ Acknowledged
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  style={{
                    padding: '12px 18px', borderRadius: 10,
                    background: '#f8fafc', color: '#64748b',
                    border: '1px solid #e2e8f0', fontWeight: 700,
                    fontSize: 14, cursor: 'pointer',
                  }}
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}