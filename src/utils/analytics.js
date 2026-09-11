// src/utils/analytics.js
// ═══════════════════════════════════════════════════════════════
// Lightweight Page View Tracker — Real Analytics for GNC College
// No PII collected. Tracks: page, timestamp, device, referrer domain
// ═══════════════════════════════════════════════════════════════

import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// ── Session ID (random per browser session, no PII) ──
const getSessionId = () => {
  let sid = sessionStorage.getItem("gnc_session_id");
  if (!sid) {
    sid = Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    sessionStorage.setItem("gnc_session_id", sid);
  }
  return sid;
};

// ── Device detection ──
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
};

// ── Referrer domain (strip to domain only, no full URL) ──
const getReferrerDomain = () => {
  try {
    if (!document.referrer) return "direct";
    const url = new URL(document.referrer);
    // If referrer is same domain, mark as internal navigation
    if (url.hostname === window.location.hostname) return "internal";
    return url.hostname;
  } catch {
    return "unknown";
  }
};

// ── Deduplication: don't track same page twice in same session ──
const trackedPages = new Set();

/**
 * Track a page view in Firestore `site_visits` collection.
 * Debounced: only fires if user stays on page for 2 seconds.
 * Deduplicated: won't track the same page twice in the same session.
 * 
 * @param {string} pathname - The route path (e.g., "/gallery")
 * @returns {function} Cleanup function to cancel the debounced write
 */
export function trackPageView(pathname) {
  // Don't track admin routes
  if (pathname.startsWith("/admin")) return () => {};
  
  // Create a unique key for this page visit
  const pageKey = pathname;
  
  // Skip if already tracked in this session
  if (trackedPages.has(pageKey)) return () => {};

  const timer = setTimeout(async () => {
    try {
      if (!db) return;
      trackedPages.add(pageKey);
      
      await addDoc(collection(db, "site_visits"), {
        page: pathname,
        timestamp: serverTimestamp(),
        referrer: getReferrerDomain(),
        device: getDeviceType(),
        sessionId: getSessionId(),
      });
    } catch (_) {
      // Silent fail — analytics should never break the app
      trackedPages.delete(pageKey); // Allow retry on error
    }
  }, 2000); // Only write if user stays on this route for 2 seconds

  return () => clearTimeout(timer);
}
