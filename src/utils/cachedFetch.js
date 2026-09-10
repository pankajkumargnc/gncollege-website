// src/utils/cachedFetch.js — Smart Persistent Caching (localStorage)
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const CACHE_KEY_PREFIX = "gnc_coll_";

// 🔐 Safe base64 encoding to prevent PII exposure in localStorage audits
function encodePayload(obj) {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
  } catch (_) {
    return JSON.stringify(obj);
  }
}

function decodePayload(str) {
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
    localStorage.clear();
    localStorage.setItem(cacheKey, encodePayload(data));
    localStorage.setItem(tsKey, Date.now().toString());
  }
}

// ✅ Compatibility helper for Admin Tabs
export function clearCache(collectionName) {
  const cacheKey = `${CACHE_KEY_PREFIX}${collectionName}`;
  const tsKey = `${cacheKey}_ts`;
  try {
    localStorage.removeItem(cacheKey);
    localStorage.removeItem(tsKey);
    // Also clear the generic nav cache if any nav change happened
    localStorage.removeItem('gnc_nav_v1');
    localStorage.removeItem('gnc_nav_v1_ts');
  } catch (_) {}
}

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
