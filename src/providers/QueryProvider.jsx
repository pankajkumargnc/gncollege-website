// src/providers/QueryProvider.jsx — Unified Query Context & Cache Provider
// Bridges with TanStack Query concepts: caching, deduplication, stale-while-revalidate
import React, { createContext, useContext, useRef, useState, useCallback } from 'react';

const QueryContext = createContext(null);

export function QueryProvider({ children }) {
  const cacheRef = useRef(new Map());
  const [, setTick] = useState(0);

  const getQueryData = useCallback((key) => {
    const entry = cacheRef.current.get(key);
    if (!entry) return undefined;
    // Check if expired
    if (Date.now() - entry.timestamp > entry.staleTime) {
      return undefined;
    }
    return entry.data;
  }, []);

  const setQueryData = useCallback((key, data, options = {}) => {
    const staleTime = options.staleTime ?? 5 * 60 * 1000; // 5 min default
    cacheRef.current.set(key, {
      data,
      timestamp: Date.now(),
      staleTime
    });
    setTick((t) => t + 1);
  }, []);

  const invalidateQueries = useCallback((keyPrefix) => {
    for (const key of cacheRef.current.keys()) {
      if (key.startsWith(keyPrefix)) {
        cacheRef.current.delete(key);
      }
    }
    setTick((t) => t + 1);
  }, []);

  const value = {
    getQueryData,
    setQueryData,
    invalidateQueries
  };

  return (
    <QueryContext.Provider value={value}>
      {children}
    </QueryContext.Provider>
  );
}

export function useQueryClient() {
  const ctx = useContext(QueryContext);
  if (!ctx) {
    throw new Error('useQueryClient must be used within a QueryProvider');
  }
  return ctx;
}

export default QueryProvider;
