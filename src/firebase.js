// src/firebase.js
// ✅ Auth HATA diya — ab sirf Firestore
// ✅ Auth ke liye firebase-auth.js use karo (lazy loaded)

import { initializeApp } from "firebase/app";
import { getFirestore }  from "firebase/firestore";

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
} = import.meta.env;

if (!VITE_FIREBASE_API_KEY || !VITE_FIREBASE_PROJECT_ID) {
  console.error(
    '%c[GNC Firebase] ⚠️  .env file missing ya Firebase config nahi mili!\n' +
    'Project root mein ".env" file banao aur Firebase credentials daalo.',
    'color:#f4a023; font-weight:bold; font-size:13px;'
  );
}

const firebaseConfig = {
  apiKey:            VITE_FIREBASE_API_KEY,
  authDomain:        VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         VITE_FIREBASE_PROJECT_ID,
  storageBucket:     VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// ⚠️  auth yahan export NAHI hoga
// AdminLogin ke liye: import { auth } from './firebase-auth'