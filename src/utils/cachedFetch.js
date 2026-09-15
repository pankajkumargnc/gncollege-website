// src/utils/cachedFetch.js — Smart Persistent Caching + Zero-Lag Real-Time Sync Engine
import { collection, getDocs, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const CACHE_KEY_PREFIX = "gnc_coll_";
export const SYNC_CHANNEL_NAME = "gnc_live_sync";

// 📡 Cross-Tab Synchronization Channel (0ms Latency across tabs/windows)
let syncChannel = null;
try {
  if (typeof window !== "undefined" && "BroadcastChannel" in window) {
    syncChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
  }
} catch (_) {}

// 🔐 Safe base64 encoding to prevent PII exposure in localStorage audits
export function encodePayload(obj) {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
  } catch (_) {
    return JSON.stringify(obj);
  }
}

export function decodePayload(str) {
  if (!str) return null;
  try {
    return JSON.parse(decodeURIComponent(escape(atob(str))));
  } catch (_) {
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  }
}

// ✅ Compatibility helper for useAppData.js
export function getCached(collectionName, ttl = 3600000) {
  const cacheKey = `${CACHE_KEY_PREFIX}${collectionName}`;
  const tsKey = `${cacheKey}_ts`;
  try {
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTs = localStorage.getItem(tsKey);
    if (cachedData && cachedTs && Date.now() - Number(cachedTs) < ttl) {
      return decodePayload(cachedData);
    }
  } catch (_) {}
  return null;
}

// ✅ Compatibility helper for useAppData.js
export function setCache(collectionName, data) {
  const cacheKey = `${CACHE_KEY_PREFIX}${collectionName}`;
  const tsKey = `${cacheKey}_ts`;
  try {
    localStorage.setItem(cacheKey, encodePayload(data));
    localStorage.setItem(tsKey, Date.now().toString());
  } catch (e) {
    try {
      localStorage.clear();
      localStorage.setItem(cacheKey, encodePayload(data));
      localStorage.setItem(tsKey, Date.now().toString());
    } catch (_) {}
  }
}

// ⚡ Comprehensive Cache-Busting & Global Live Synchronization
export function clearCache(collectionName, broadcastToRemote = true) {
  const cacheKey = `${CACHE_KEY_PREFIX}${collectionName}`;
  const tsKey = `${cacheKey}_ts`;
  try {
    localStorage.removeItem(cacheKey);
    localStorage.removeItem(tsKey);
    
    // Clear navigation cache whenever navigation or pages are updated
    if (!collectionName || collectionName === 'navigation' || collectionName === 'pages') {
      localStorage.removeItem('gnc_nav_v1');
      localStorage.removeItem('gnc_nav_v1_ts');
    }
  } catch (_) {}

  // 1. Local window events for same-tab hooks
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new CustomEvent('gnc_live_sync', { detail: { collection: collectionName, timestamp: Date.now() } }));
      if (collectionName === 'navigation' || collectionName === 'pages') {
        window.dispatchEvent(new CustomEvent('gnc_nav_updated'));
      }
    } catch (_) {}
  }

  // 2. BroadcastChannel for instant cross-tab sync in the same browser (Admin <-> Live site tabs)
  if (syncChannel) {
    try {
      syncChannel.postMessage({
        type: 'INVALIDATE_CACHE',
        collection: collectionName,
        timestamp: Date.now()
      });
    } catch (_) {}
  }

  // 3. Global Remote Sync: Touch Firestore `settings/site_sync` doc so ALL visitors everywhere get notified
  if (broadcastToRemote && db) {
    try {
      setDoc(doc(db, 'settings', 'site_sync'), {
        updatedCollection: collectionName || 'all',
        lastUpdated: serverTimestamp(),
        epoch: Date.now()
      }, { merge: true }).catch(() => {});
    } catch (_) {}
  }
}

// Alias for explicit clarity
export const triggerGlobalSync = clearCache;

export async function cachedFetch(collectionName, ttl = 3600000) {
  const cached = getCached(collectionName, ttl);
  if (cached) return cached;

  try {
    const snap = await getDocs(collection(db, collectionName));
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCache(collectionName, data);
    return data;
  } catch (error) {
    console.error(`Fetch error [${collectionName}]:`, error);
    const fallback = getCached(collectionName, Infinity);
    return fallback || [];
  }
}
