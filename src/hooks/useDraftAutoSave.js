// src/hooks/useDraftAutoSave.js — Enterprise Draft Auto-Save & Crash Recovery Hook
// Automatically saves rich-text and form content to localStorage with instant recovery

import { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';

export default function useDraftAutoSave(key, content, onRestore, enabled = true) {
  const [hasDraft, setHasDraft] = useState(false);
  const [draftTimestamp, setDraftTimestamp] = useState(null);
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved'
  const draftContentRef = useRef('');
  const lastSavedRef = useRef(content || '');
  const storageKey = `gnc_draft_${key}`;

  // 1. Inspect on mount or key change
  useEffect(() => {
    if (!key || !enabled) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.content && parsed.content.trim() && parsed.content !== (content || '')) {
          setHasDraft(true);
          setDraftTimestamp(parsed.timestamp ? new Date(parsed.timestamp) : new Date());
          draftContentRef.current = parsed.content;
          return;
        }
      }
    } catch (_) {}
    setHasDraft(false);
  }, [key, enabled]);

  // 2. Debounced auto-save (every 2.5 seconds when content changes)
  useEffect(() => {
    if (!key || !enabled || content === undefined || content === null) return;
    if (content === lastSavedRef.current) return;

    setSaveStatus('saving');
    const timer = setTimeout(() => {
      try {
        if (content && content.trim()) {
          const payload = {
            content,
            timestamp: Date.now()
          };
          localStorage.setItem(storageKey, JSON.stringify(payload));
          lastSavedRef.current = content;
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus('idle'), 2000);
        }
      } catch (err) {
        console.warn('[DraftAutoSave] Storage quota warning:', err.message);
        setSaveStatus('idle');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [content, key, storageKey, enabled]);

  // 3. User actions
  const restoreDraft = useCallback(() => {
    if (draftContentRef.current && typeof onRestore === 'function') {
      onRestore(draftContentRef.current);
      lastSavedRef.current = draftContentRef.current;
      setHasDraft(false);
      toast.success('Unsaved draft restored successfully!', { icon: '📝' });
    }
  }, [onRestore]);

  const discardDraft = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch (_) {}
    setHasDraft(false);
    draftContentRef.current = '';
    toast('Draft discarded', { icon: '🗑️' });
  }, [storageKey]);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch (_) {}
    setHasDraft(false);
    draftContentRef.current = '';
    lastSavedRef.current = '';
  }, [storageKey]);

  return {
    hasDraft,
    draftTimestamp,
    saveStatus,
    restoreDraft,
    discardDraft,
    clearDraft
  };
}
