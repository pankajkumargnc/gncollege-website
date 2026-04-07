// src/hooks/useAppData.js — FIXED + CACHED VERSION
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getCached, setCache } from '../utils/cachedFetch';

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

  // Navigation — always live
  useEffect(() => {
    const qNav = query(collection(db, 'navigation'), orderBy('order', 'asc'));
    const unsub = onSnapshot(qNav, snap => {
      const flat = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      const buildTree = pid => {
        const children = flat.filter(m => (m.parentId || null) === (pid || null));
        if (!children.length) return null;
        return children.map(c => ({ label: c.label, href: c.href, sub: buildTree(c.id) }));
      };
      setNavLinks(buildTree(null) || []);
    });
    return () => unsub();
  }, []);

  // Live + Cached collections
  useEffect(() => {
    const liveCols = [
      ['notices',       setNotices],
      ['announcements', setAnnouncements],
      ['events',        setEvents],
      ['updates',       setUpdates],
    ];
    const unsubs = liveCols.map(([col, setter]) => {
      try {
        return onSnapshot(query(collection(db, col), limit(50)), snap => {
          const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          docs.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
          setter(docs);
        }, err => console.error(`[${col}]`, err));
      } catch { return () => {}; }
    });

    const staticCols = [
      ['gallery',      setGallery],
      ['faculties',    setFaculties],
      ['sliderSlides', setSliderSlides],
      ['pdfReports',   setPdfReports],
    ];
    staticCols.forEach(([col, setter]) => {
      const cached = getCached(col);
      if (cached) { setter(cached); return; }
      getDocs(query(collection(db, col), limit(100)))
        .then(snap => {
          const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          docs.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
          setter(docs); setCache(col, docs);
        }).catch(err => console.error(`[${col}] cache error`, err));
    });

    const ct = getCached('testimonials');
    if (ct) { setTestimonials(ct); }
    else {
      getDocs(query(collection(db, 'testimonials'), limit(20), orderBy('createdAt', 'desc')))
        .then(snap => {
          const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setTestimonials(docs); setCache('testimonials', docs);
        }).catch(console.error);
    }

    return () => unsubs.forEach(u => u && u());
  }, []);

  return { updates, notices, announcements, events, gallery, faculties, testimonials, sliderSlides, navLinks, pdfReports };
}
