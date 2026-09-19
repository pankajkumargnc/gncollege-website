// src/firebase.js
// ✅ Auth HATA diya — ab sirf Firestore
// ✅ Auth ke liye firebase-auth.js use karo (lazy loaded)

import { initializeApp, getApps } from "firebase/app";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFunctions } from "firebase/functions";

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (process.env || {});

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MEASUREMENT_ID,
} = env;

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
  if (typeof window !== 'undefined' && typeof indexedDB !== 'undefined') {
    dbInstance = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    });
  } else {
    dbInstance = getFirestore(app);
  }
} catch (e) {
  // If already initialized during HMR or in Node, just get the instance
  dbInstance = getFirestore(app);
}

export const db = dbInstance;
export const functions = (typeof window !== 'undefined' && app) ? getFunctions(app, 'asia-south1') : null;

// ✅ Web Push Notifications (Firebase Cloud Messaging)
export const requestNotificationPermission = async () => {
  try {
    if (typeof window === 'undefined' || !('Notification' in window) || !('serviceWorker' in navigator)) {
      return null;
    }
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const { getMessaging, getToken } = await import('firebase/messaging');
      const messaging = getMessaging(app);
      const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
      const token = await getToken(messaging, { 
        vapidKey: vapidKey || undefined 
      });
      return token;
    }
    return null;
  } catch (err) {
    console.warn('Notification permission/token error:', err);
    return null;
  }
};

export { logEvent };

// ✅ Firebase App Check — Bot & Scraper Protection (reCAPTCHA v3)
// Only activates in production when VITE_RECAPTCHA_SITE_KEY is provided
const recaptchaSiteKey = env.VITE_RECAPTCHA_SITE_KEY;
if (recaptchaSiteKey && env.PROD) {
  import('firebase/app-check').then(({ initializeAppCheck, ReCaptchaV3Provider }) => {
    try {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(recaptchaSiteKey),
        isTokenAutoRefreshEnabled: true,
      });
    } catch (e) {
      // App Check already initialized (HMR) or provider error — safe to ignore
      console.warn('[AppCheck] Init skipped:', e.message);
    }
  }).catch(() => {
    // firebase/app-check module not available — skip gracefully
  });
} else if (!env.PROD) {
  // In development, enable App Check debug mode if needed
  // self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}