// src/hooks/useFirestoreQuery.js — Reusable hook bridging Firestore with Query Cache
import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useQueryClient } from '../providers/QueryProvider';

/**
 * Custom hook to query a Firestore collection with query caching and stale-while-revalidate
 * @param {string} collectionName
 * @param {object} [options]
 */
export function useFirestoreQuery(collectionName, options = {}) {
  const { staleTime = 5 * 60 * 1000, enabled = true } = options;
  const queryClient = useQueryClient();
  const cacheKey = `firestore:${collectionName}`;

  const cachedData = queryClient.getQueryData(cacheKey);

  const [data, setData] = useState(cachedData || null);
  const [isLoading, setIsLoading] = useState(!cachedData && enabled);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!enabled || !db) return;
    setIsLoading(true);
    setError(null);

    try {
      const snap = await getDocs(collection(db, collectionName));
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      queryClient.setQueryData(cacheKey, list, { staleTime });
      setData(list);
    } catch (err) {
      console.error(`[useFirestoreQuery] Failed to fetch ${collectionName}:`, err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [collectionName, enabled, staleTime, queryClient, cacheKey]);

  useEffect(() => {
    if (!cachedData && enabled) {
      fetchData();
    }
  }, [cachedData, enabled, fetchData]);

  return {
    data: data || cachedData || [],
    isLoading,
    error,
    refetch: fetchData
  };
}

export default useFirestoreQuery;
