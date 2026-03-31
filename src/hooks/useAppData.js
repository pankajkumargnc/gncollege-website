import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

export default function useAppData() {
  const [updates, setUpdates] = useState([]);
  const [notices, setNotices] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [sliderSlides, setSliderSlides] = useState([]);
  const [navLinks, setNavLinks] = useState([]);
  const [pdfReports, setPdfReports] = useState([]);

  // 1. Navigation Menu Builder
  useEffect(() => {
    const qNav = query(collection(db, "navigation"), orderBy("order", "asc"));
    const unsubNav = onSnapshot(qNav, (snap) => {
      const flatMenus = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      const buildNavTree = (parentId) => {
        const children = flatMenus.filter(
          (m) => (m.parentId || null) === (parentId || null),
        );
        if (children.length === 0) return null;
        return children.map((child) => ({
          label: child.label,
          href: child.href,
          sub: buildNavTree(child.id),
        }));
      };

      setNavLinks(buildNavTree(null) || []);
    });
    return () => unsubNav();
  }, []);

  // 2. Standard Content Collections
  useEffect(() => {
    const cols = [
      ["notices", setNotices],
      ["announcements", setAnnouncements],
      ["events", setEvents],
      ["gallery", setGallery],
      ["faculties", setFaculties],
      ["sliderSlides", setSliderSlides],
      ["updates", setUpdates],
      ["reports", setPdfReports],
    ];

    const unsubs = [
      ...cols.map(([col, setter]) => {
        let collectionQuery;
        if (col === "gallery" || col === "events" || col === "reports") {
          collectionQuery = query(collection(db, col), limit(30));
        } else if (["notices", "announcements", "faculties", "updates"].includes(col)) {
          collectionQuery = query(collection(db, col), limit(50));
        } else {
          collectionQuery = collection(db, col);
        }

        return onSnapshot(
          collectionQuery,
          (snap) => {
            const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            docs.sort(
              (a, b) =>
                (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0),
            );
            setter(docs);
          },
          (err) => console.error(`[${col}] fetching error:`, err),
        );
      }),
      onSnapshot(query(collection(db, "testimonials"), limit(20), orderBy("createdAt", "desc")), snap =>
        setTestimonials(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
    ];
    return () => unsubs.forEach((u) => u && u());
  }, []);

  return {
    updates, notices, announcements, events, gallery, 
    faculties, testimonials, sliderSlides, navLinks, pdfReports
  };
}
