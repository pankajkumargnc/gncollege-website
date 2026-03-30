// scripts/seed_demo_data.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

async function seed() {
  try {
    // 1. Add Testimonial
    await addDoc(collection(db, 'testimonials'), {
      name: "Aryan Malhotra",
      role: "Current Student (BCA)",
      year: "Batch 2023-26",
      content: "Guru Nanak College has provided me with the best environment for coding and personal growth. The new dynamic features on our website are amazing!",
      image: "https://ui-avatars.com/api/?name=Aryan+Malhotra&background=0f2347&color=f4a023",
      active: true,
      createdAt: serverTimestamp()
    });
    console.log('✅ Demo Testimonial added');

    // 2. Add Gallery Image
    await addDoc(collection(db, 'gallery'), {
      title: "GNC Campus Sunrise",
      cat: "Campus",
      year: "2025",
      image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1000",
      featured: true,
      createdAt: serverTimestamp()
    });
    console.log('✅ Demo Gallery Image added');

  } catch (err) {
    console.error('❌ Error seeding data:', err);
  }
}

seed();
