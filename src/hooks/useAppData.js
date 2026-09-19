// src/hooks/useAppData.js — Real-Time Reactive Architecture + Zero-Lag Sync
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  collection, query, onSnapshot, orderBy, limit, getDocs, doc 
} from 'firebase/firestore';
import { db } from '../firebase';
import { getCached, setCache, clearCache, SYNC_CHANNEL_NAME, encodePayload, decodePayload, isCacheOlderThan } from '../utils/cachedFetch';
import DOMPurify from 'dompurify';

export default function useAppData() {
  const [updates, setUpdates]             = useState([]);
  const [notices, setNotices]             = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents]               = useState([]);
  const [gallery, setGallery]             = useState([]);
  const [faculties, setFaculties]         = useState([]);
  const [testimonials, setTestimonials]   = useState([]);
  const [sliderSlides, setSliderSlides]   = useState([]);
  const [navLinks, setNavLinks]           = useState([]);
  const [pdfReports, setPdfReports]       = useState([]);
  const [siteSettings, setSiteSettings]   = useState(() => {
    try {
      const cached = localStorage.getItem('gnc_site_settings_cache');
      return cached ? decodePayload(cached) : null;
    } catch { return null; }
  });

  const initialSyncHandled = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. Navigation Tree Builder & Fetcher
  // ─────────────────────────────────────────────────────────────────────────────
  const fetchNavigation = useCallback((forceBust = false) => {
    const CACHE_KEY = 'gnc_nav_v1';
    const CACHE_TS_KEY = 'gnc_nav_v1_ts';
    const NAV_TTL = 30 * 60 * 1000; // 30 minutes

    const buildTree = (flat, pid = null) => {
      const children = flat.filter(m => (m.parentId || null) === pid && m.isActive !== false);
      if (!children.length) return null;
      return children.map(c => ({
        label: c.label,
        href: c.href,
        icon: c.icon || '',
        badge: c.badge || '',
        badgeColor: c.badgeColor || '',
        subtitle: c.subtitle || '',
        isExternal: c.isExternal || false,
        sub: buildTree(flat, c.id)
      }));
    };

    if (!forceBust) {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        const ts = localStorage.getItem(CACHE_TS_KEY);
        if (cached && ts && Date.now() - Number(ts) < NAV_TTL) {
          const decoded = decodePayload(cached);
          if (decoded) {
            setNavLinks(decoded);
            return;
          }
        }
      } catch (_) {}
    }

    if (!db) return;

    getDocs(query(collection(db, 'navigation'), orderBy('order', 'asc')))
      .then(snap => {
        const flat = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        const tree = buildTree(flat) || [];
        setNavLinks(tree);
        try {
          localStorage.setItem(CACHE_KEY, encodePayload(tree));
          localStorage.setItem(CACHE_TS_KEY, String(Date.now()));
        } catch (_) {}
      })
      .catch(err => console.error('[Backend] navigation fetch error:', err));
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. Fetch Cached Collections (Faculties, Gallery, Testimonials & PDF Reports)
  // ─────────────────────────────────────────────────────────────────────────────
  const fetchStaticCollections = useCallback((forceBust = false) => {
    if (!db) return;

    const collectionsToFetch = [
      ['faculties',    setFaculties,    120],
      ['gallery',      setGallery,      50],
      ['testimonials', setTestimonials, 20],
      ['pdfReports',   setPdfReports,   50]
    ];

    collectionsToFetch.forEach(([col, setter, max]) => {
      if (!forceBust) {
        const cached = getCached(col);
        if (cached && Array.isArray(cached) && cached.length > 0) {
          setter(cached);
          return;
        }
      }

      const q = query(collection(db, col), limit(max));
      getDocs(q)
        .then(snap => {
          const docs = snap.docs.map(d => {
            const docData = d.data();
            if (docData.description) docData.description = DOMPurify.sanitize(docData.description);
            if (docData.content) docData.content = DOMPurify.sanitize(docData.content);
            return { id: d.id, ...docData };
          });
          docs.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
          setter(docs);
          setCache(col, docs);
        })
        .catch(err => console.error(`[Backend] Fetch error for ${col}:`, err));
    });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. Initial Boot & Navigation Mount
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchNavigation(false);
    fetchStaticCollections(false);
  }, [fetchNavigation, fetchStaticCollections]);

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. Real-Time High-Velocity Collections (Focused Snapshots for Live Alerts)
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!db) return;

    // High-priority live collections that truly require instant real-time pushes
    const liveCols = [
      ['notices',       setNotices,       30, 'createdAt', 'desc'],
      ['announcements', setAnnouncements, 15, 'createdAt', 'desc'],
      ['events',        setEvents,        25, 'createdAt', 'desc'],
      ['updates',       setUpdates,       15, 'createdAt', 'desc'],
      ['sliderSlides',  setSliderSlides,  10, 'order',     'asc'],
    ];

    const unsubs = liveCols.map(([col, setter, max, sortField, sortDir]) => {
      try {
        let q;
        if (sortField) {
          q = query(collection(db, col), orderBy(sortField, sortDir || 'desc'), limit(max));
        } else {
          q = query(collection(db, col), limit(max));
        }

        return onSnapshot(q, snap => {
          const docs = snap.docs.map(d => {
            const data = d.data();
            // 🛡️ Auto-sanitize HTML content if present
            if (data.description) data.description = DOMPurify.sanitize(data.description);
            if (data.content) data.content = DOMPurify.sanitize(data.content);
            return { id: d.id, ...data };
          });
          setter(docs);
        }, err => {
          // If orderBy index is building or missing, fallback to unordered limit query
          console.warn(`[Backend] ${col} subscription fallback query:`, err.message);
          try {
            return onSnapshot(query(collection(db, col), limit(max)), fallbackSnap => {
              const docs = fallbackSnap.docs.map(d => ({ id: d.id, ...d.data() }));
              setter(docs);
            });
          } catch (_) {
            return () => {};
          }
        });
      } catch (err) {
        console.error(`[Backend] Error setting up ${col} listener:`, err);
        return () => {};
      }
    });

    // ── Real-Time Site Settings Listener ──
    const unsubSettings = onSnapshot(doc(db, 'settings', 'site'), snap => {
      if (snap.exists()) {
        const d = snap.data();
        setSiteSettings(d);
        try { localStorage.setItem('gnc_site_settings_cache', encodePayload(d)); } catch {}
      }
    }, () => {});

    // Listen to local settings broadcast
    const handleSettingsUpdate = (e) => {
      if (e.detail) {
        setSiteSettings(prev => ({ ...(prev || {}), ...e.detail }));
      }
    };
    window.addEventListener('gnc_settings_updated', handleSettingsUpdate);

    // ───────────────────────────────────────────────────────────────────────────
    // 5. ⚡ Zero-Lag Remote Sync Listener (`settings/site_sync`)
    // When ANY admin updates data on ANY computer, all clients worldwide react immediately!
    // ───────────────────────────────────────────────────────────────────────────
    const unsubSync = onSnapshot(doc(db, 'settings', 'site_sync'), snap => {
      if (!snap.exists()) return;
      
      const syncData = snap.data();
      const updatedCol = syncData?.updatedCollection;
      const remoteEpoch = syncData?.epoch || (typeof syncData?.lastUpdated?.toMillis === 'function' ? syncData.lastUpdated.toMillis() : 0);

      // On initial boot, compare remote epoch with local cache timestamps so returning visitors never serve stale data
      if (!initialSyncHandled.current) {
        initialSyncHandled.current = true;

        if (remoteEpoch > 0) {
          const checkNav = !updatedCol || updatedCol === 'all' || updatedCol === 'navigation' || updatedCol === 'pages';
          if (checkNav && isCacheOlderThan('navigation', remoteEpoch)) {
            fetchNavigation(true);
          }

          const staticCols = ['faculties', 'pdfReports', 'gallery', 'testimonials'];
          staticCols.forEach(col => {
            const matchesCol = !updatedCol || updatedCol === 'all' || updatedCol === col;
            if (matchesCol && isCacheOlderThan(col, remoteEpoch)) {
              fetchStaticCollections(true);
            }
          });
        }
        return;
      }

      // Subsequent real-time snapshots (admin pushed a change while visitor is actively browsing)
      if (!updatedCol || updatedCol === 'all' || updatedCol === 'navigation' || updatedCol === 'pages') {
        fetchNavigation(true);
      }
      if (!updatedCol || updatedCol === 'all' || updatedCol === 'faculties' || updatedCol === 'pdfReports' || updatedCol === 'gallery' || updatedCol === 'testimonials') {
        fetchStaticCollections(true);
      }
    }, () => {});

    // ───────────────────────────────────────────────────────────────────────────
    // 6. 📡 Same-Browser Cross-Tab Sync (BroadcastChannel + Local Window Events)
    // ───────────────────────────────────────────────────────────────────────────
    const handleSyncEvent = (event) => {
      const col = event?.detail?.collection || event?.data?.collection;
      if (!col || col === 'navigation' || col === 'pages') {
        fetchNavigation(true);
      }
      if (!col || col === 'faculties' || col === 'pdfReports' || col === 'gallery' || col === 'testimonials') {
        fetchStaticCollections(true);
      }
    };

    window.addEventListener('gnc_live_sync', handleSyncEvent);
    window.addEventListener('gnc_nav_updated', () => fetchNavigation(true));

    let channel = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
        channel.onmessage = handleSyncEvent;
      }
    } catch (_) {}

    return () => {
      unsubs.forEach(u => u && u());
      if (unsubSettings) unsubSettings();
      if (unsubSync) unsubSync();
      window.removeEventListener('gnc_live_sync', handleSyncEvent);
      window.removeEventListener('gnc_settings_updated', handleSettingsUpdate);
      window.removeEventListener('gnc_nav_updated', () => fetchNavigation(true));
      if (channel) channel.close();
    };
  }, [fetchNavigation, fetchStaticCollections]);

  return { 
    updates, 
    notices, 
    announcements, 
    events, 
    gallery, 
    faculties, 
    testimonials, 
    sliderSlides, 
    navLinks, 
    pdfReports,
    siteSettings,
    refreshNavigation: () => fetchNavigation(true),
    refreshStaticData: () => fetchStaticCollections(true)
  };
}
