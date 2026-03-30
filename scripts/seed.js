// scripts/seed.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeJWUUoU_MJ4ubpbfaLZemvnEr82LF5YA",
  authDomain: "gnc-college-web.firebaseapp.com",
  projectId: "gnc-college-web",
  storageBucket: "gnc-college-web.firebasestorage.app",
  messagingSenderId: "78901559372",
  appId: "1:78901559372:web:f76cb101f8aec2daadb4e9",
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

async function seed() {
  console.log('--- GNC SEEDING START ---');
  try {
    // 1. Add Testimonial
    await addDoc(collection(db, 'testimonials'), {
      name: "Aryan Malhotra",
      role: "Current Student (BCA)",
      year: "Batch 2023-26",
      content: "Guru Nanak College provides an excellent platform for learning. The new dynamic testimonials section is a great addition to the site!",
      image: "https://ui-avatars.com/api/?name=Aryan+Malhotra&background=0f2347&color=f4a023",
      active: true,
      createdAt: serverTimestamp()
    });
    console.log('✅ Demo Testimonial added');

    // 2. Add Gallery Image
    await addDoc(collection(db, 'gallery'), {
      title: "GNC College Campus - Morning View",
      cat: "Campus",
      year: "2025",
      image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1000",
      featured: true,
      createdAt: serverTimestamp()
    });
    console.log('✅ Demo Gallery Image added');

  } catch (err) {
    console.error('❌ Error during seeding:', err);
  }
  console.log('--- GNC SEEDING COMPLETE ---');
  process.exit(0);
}

seed();
