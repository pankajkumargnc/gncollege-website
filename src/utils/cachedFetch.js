// src/utils/cachedFetch.js — Cross-session caching for static Firestore collections

const TTL = {
  gallery:      10 * 60 * 1000,
  faculties:    15 * 60 * 1000,
  sliderSlides: 15 * 60 * 1000,
  pdfReports:   10 * 60 * 1000,
  testimonials: 20 * 60 * 1000,
};

export function getCached(colName) {
  try {
    const data = localStorage.getItem(`gnc_${colName}`);
    const ts   = localStorage.getItem(`gnc_${colName}_ts`);
    const ttl  = TTL[colName] || 5 * 60 * 1000;
    if (data && ts && Date.now() - Number(ts) < ttl) return JSON.parse(data);
  } catch (_) {}
  return null;
}

export function setCache(colName, data) {
  try {
    localStorage.setItem(`gnc_${colName}`, JSON.stringify(data));
    localStorage.setItem(`gnc_${colName}_ts`, String(Date.now()));
  } catch (_) {}
}

export function clearCache(colName) {
  try {
    localStorage.removeItem(`gnc_${colName}`);
    localStorage.removeItem(`gnc_${colName}_ts`);
  } catch (_) {}
}

export function clearAllCache() {
  try {
    Object.keys(localStorage).filter(k => k.startsWith('gnc_')).forEach(k => localStorage.removeItem(k));
  } catch (_) {}
}
