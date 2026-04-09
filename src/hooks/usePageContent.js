// src/hooks/usePageContent.js
// ═══════════════════════════════════════════════════════════════════
// FIRESTORE CMS CONTENT HOOK — Fetches page content from pageContent/{slug}
// Provides real-time updates + fallback support (if no Firestore data, returns null)
// ═══════════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import DOMPurify from 'dompurify';

// ── In-memory cache to prevent re-fetching on component re-mount ──
const contentCache = {};

/**
 * usePageContent — Fetches structured content from Firestore pageContent collection
 * 
 * @param {string} slug - The page slug (e.g., 'vision-mission', 'fee-structure')
 * @returns {{ content: object|null, loading: boolean, getSection: function, getText: function }}
 * 
 * Usage:
 *   const { content, loading, getSection, getText } = usePageContent('vision-mission');
 *   const visionText = getText('vision', 'Default fallback text');
 */
export default function usePageContent(slug) {
  const [content, setContent] = useState(contentCache[slug] || null);
  const [loading, setLoading] = useState(!contentCache[slug]);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    // If cached, use it immediately (still subscribe for live updates)
    if (contentCache[slug]) {
      setContent(contentCache[slug]);
      setLoading(false);
    }

    const docRef = doc(db, 'pageContent', slug);
    const unsub = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          const data = { id: snap.id, ...snap.data() };
          
          // 🛡️ Sanitize all HTML content in sections
          if (data.sections && Array.isArray(data.sections)) {
            data.sections = data.sections.map(section => ({
              ...section,
              content: typeof section.content === 'string'
                ? DOMPurify.sanitize(section.content)
                : section.content
            }));
          }

          contentCache[slug] = data;
          setContent(data);
        } else {
          // Document doesn't exist — page will use hardcoded fallback
          setContent(null);
        }
        setLoading(false);
      },
      (err) => {
        console.warn(`[usePageContent] Error fetching "${slug}":`, err.message);
        setContent(null);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [slug]);

  /**
   * getSection — Find a section by its ID
   * @param {string} sectionId - The section ID to find
   * @returns {object|null} The section object or null
   */
  const getSection = (sectionId) => {
    if (!content?.sections) return null;
    return content.sections.find(s => s.id === sectionId) || null;
  };

  /**
   * getText — Get text content of a section with fallback
   * @param {string} sectionId - The section ID
   * @param {string} fallback - Fallback text if section not found
   * @returns {string} The section content or fallback
   */
  const getText = (sectionId, fallback = '') => {
    const section = getSection(sectionId);
    return section?.content || fallback;
  };

  /**
   * getList — Get list/array content of a section with fallback
   * @param {string} sectionId - The section ID
   * @param {Array} fallback - Fallback array if section not found
   * @returns {Array} The section items or fallback
   */
  const getList = (sectionId, fallback = []) => {
    const section = getSection(sectionId);
    if (!section?.content) return fallback;
    // Content can be an array directly, or stringified JSON
    if (Array.isArray(section.content)) return section.content;
    try { return JSON.parse(section.content); } catch { return fallback; }
  };

  /**
   * getTable — Get table data of a section with fallback
   * @param {string} sectionId - The section ID
   * @param {object} fallback - Fallback { headers: [], rows: [] }
   * @returns {object} { headers: string[], rows: string[][] }
   */
  const getTable = (sectionId, fallback = { headers: [], rows: [] }) => {
    const section = getSection(sectionId);
    if (!section?.content) return fallback;
    if (typeof section.content === 'object' && section.content.headers) return section.content;
    try { return JSON.parse(section.content); } catch { return fallback; }
  };

  return { content, loading, getSection, getText, getList, getTable };
}

/**
 * Invalidate cache for a specific slug (useful after admin edits)
 */
export function invalidatePageContentCache(slug) {
  if (slug) {
    delete contentCache[slug];
  } else {
    Object.keys(contentCache).forEach(k => delete contentCache[k]);
  }
}
