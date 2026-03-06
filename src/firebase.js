// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // 🌟 YE NAYI LINE ADD KI GAYI HAI

// Apni Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDeJWUUoU_MJ4ubpbfaLZemvnEr82LF5YA",
  authDomain: "gnc-college-web.firebaseapp.com",
  projectId: "gnc-college-web",
  storageBucket: "gnc-college-web.firebasestorage.app",
  messagingSenderId: "78901559372",
  appId: "1:78901559372:web:f76cb101f8aec2daadb4e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage (Images upload karne ke liye)
export const storage = getStorage(app); // 🌟 YE NAYI LINE ADD KI GAYI HAI