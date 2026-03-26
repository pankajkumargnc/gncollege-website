// src/components/AlertBanner.jsx
import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';

export default function AlertBanner() {
  const [alerts, setAlerts] = useState([]);
  const [dismissed, setDismissed] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('gnc_dismissed_alerts') || '[]'); }
    catch { return []; }
  });
  const [showPopup, setShowPopup] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const navy = COLORS.navy || '#0f2347';
  const gold = COLORS.gold || '#f4a023';

  useEffect(() => {
    const q = query(collection(db, 'alerts'), where('isActive', '==', true));
    return onSnapshot(q, snap => {
      setAlerts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  // ✅ FIXED: Only trigger popup timer once when a new urgent alert arrives
  const urgentAlerts = alerts.filter(a => a.type === 'urgent' && !dismissed.includes(a.id));
  const popupAlertId = urgentAlerts.length > 0 ? urgentAlerts[0].id : null;

  useEffect(() => {
    if (popupAlertId) {
      const timer = setTimeout(() => setShowPopup(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setShowPopup(false);
    }
  }, [popupAlertId]);

  const dismissAlert = (id) => {
    const newDismissed = [...dismissed, id];
    setDismissed(newDismissed);
    sessionStorage.setItem('gnc_dismissed_alerts', JSON.stringify(newDismissed));
    setShowPopup(false);
  };

  const visibleAlerts = alerts.filter(a => !dismissed.includes(a.id) && a.type !== 'urgent');
  
  useEffect(() => {
    if (visibleAlerts.length <= 1) return;
    const interval = setInterval(() => setCurrentIdx(p => (p + 1) % visibleAlerts.length), 5000);
    return () => clearInterval(interval);
  }, [visibleAlerts.length]);

  return (
    <>
      {visibleAlerts.length > 0 && (
        <div style={{ background: '#ef4444', color: '#fff', padding: '8px 20px', textAlign: 'center', fontSize: 13, fontWeight: 700, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          <span style={{ animation: 'pulse 1.5s infinite' }}>🚨</span>
          <span style={{ flex: 1 }}>{visibleAlerts[currentIdx].text}</span>
        </div>
      )}

      {/* URGENT POPUP MODAL */}
      {showPopup && urgentAlerts.length > 0 && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999999, background: 'rgba(15,35,71,0.85)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 24, width: '100%', maxWidth: 450, padding: 30, textAlign: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', animation: 'slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <div style={{ fontSize: 60, marginBottom: 15, animation: 'shake 0.5s ease-in-out' }}>⚠️</div>
            <h2 style={{ color: navy, fontSize: 22, fontWeight: 900, marginBottom: 10 }}>Important Alert</h2>
            <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.6, marginBottom: 25 }}>
              {urgentAlerts[0].text}
            </p>
            <button onClick={() => dismissAlert(urgentAlerts[0].id)} style={{ width: '100%', padding: '14px', borderRadius: 12, background: `linear-gradient(135deg, ${navy}, #1a3a7c)`, color: '#fff', border: 'none', fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: '0 8px 20px rgba(15,35,71,0.2)' }}>
              ✓ I Understand
            </button>
          </div>
          <style>{`
            @keyframes slideUp { from { opacity: 0; transform: translateY(40px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
            @keyframes shake { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-10deg); } 75% { transform: rotate(10deg); } }
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
          `}</style>
        </div>
      )}
    </>
  );
}