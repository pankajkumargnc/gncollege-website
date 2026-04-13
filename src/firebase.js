// src/firebase.js
// ✅ Auth HATA diya — ab sirf Firestore
// ✅ Auth ke liye firebase-auth.js use karo (lazy loaded)

import { initializeApp, getApps } from "firebase/app";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MEASUREMENT_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey:            VITE_FIREBASE_API_KEY,
  authDomain:        VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         VITE_FIREBASE_PROJECT_ID,
  storageBucket:     VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             VITE_FIREBASE_APP_ID,
  measurementId:     VITE_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Analytics
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// ✅ Safe initialization of Firestore with offline persistence
let dbInstance;
try {
  // Always try initializeFirst (with config) FIRST to ensure persistence
  dbInstance = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
  });
} catch (e) {
  // If already initialized during HMR, just get the instance
  dbInstance = getFirestore(app);
}

export const db = dbInstance;

export { logEvent };