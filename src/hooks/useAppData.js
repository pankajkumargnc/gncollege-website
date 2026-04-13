// src/hooks/useAppData.js — FIXED + CACHED VERSION
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy, limit, getDocs, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { getCached, setCache } from '../utils/cachedFetch';
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

  // Navigation
  useEffect(() => {
    const q = query(collection(db, "navigation"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const flat = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      const buildTree = (list, pid = null) => {
        const mine = list.filter(m => (m.parentId || null) === pid);
        if (!mine.length) return null;
        return mine.map(m => ({
          label: m.label,
          href: m.href,
          sub: buildTree(list, m.id)
        }));
      };
      setNavLinks(buildTree(flat) || []);
    });
    return () => unsub();
  }, []);

  // Live + Cached collections
  useEffect(() => {
    const liveCols = [
      ['notices',       setNotices, 40],
      ['announcements', setAnnouncements, 20],
      ['events',        setEvents, 30],
      ['updates',       setUpdates, 15],
    ];

    const unsubs = liveCols.map(([col, setter, max]) => {
      try {
        const q = query(
          collection(db, col), 
          orderBy('createdAt', 'desc'), 
          limit(max)
        );
        return onSnapshot(q, snap => {
          const docs = snap.docs.map(d => {
            const data = d.data();
            // 🛡️ Auto-sanitize HTML content if present
            if (data.description) data.description = DOMPurify.sanitize(data.description);
            if (data.content) data.content = DOMPurify.sanitize(data.content);
            return { id: d.id, ...data };
          });
          setter(docs);
        }, err => console.error(`[Backend] ${col} subscription failed:`, err));
      } catch (err) { 
        console.error(`[Backend] Error setting up ${col} listener:`, err);
        return () => {}; 
      }
    });

    const staticCols = [
      ['gallery',      setGallery, 100],
      ['faculties',    setFaculties, 150],
      ['sliderSlides', setSliderSlides, 10],
      ['pdfReports',   setPdfReports, 50],
    ];

    staticCols.forEach(([col, setter, max]) => {
      const cached = getCached(col);
      if (cached) { setter(cached); return; }
      
      const q = query(collection(db, col), limit(max));
      getDocs(q)
        .then(snap => {
          const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          // Static collections normally don't need real-time, so we sort once
          docs.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
          setter(docs); 
          setCache(col, docs);
        }).catch(err => console.error(`[Backend] static fetch error for ${col}:`, err));
    });

    // Testimonials Specific logic
    const ct = getCached('testimonials');
    if (ct) { setTestimonials(ct); }
    else {
      getDocs(query(collection(db, 'testimonials'), limit(15), orderBy('createdAt', 'desc')))
        .then(snap => {
          const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setTestimonials(docs); setCache('testimonials', docs);
        }).catch(err => console.error("[Backend] Testimonials fetch error:", err));
    }

    return () => {
      unsubs.forEach(u => u && u());
    };
  }, []);

  return { updates, notices, announcements, events, gallery, faculties, testimonials, sliderSlides, navLinks, pdfReports };
}
