// src/firebase-auth.js
// ✅ Sirf tab load hoga jab AdminLogin mount hoga
// ✅ Same Firebase app instance use karta hai (re-initialize nahi hota)

import { getAuth } from "firebase/auth";

// getFirestore se app instance nikaalna direct nahi hota,
// toh ek shared app export karte hain firebase.js se
import { initializeApp, getApps } from "firebase/app";

// App already initialized hai firebase.js mein — sirf getAuth karo
const app = getApps()[0]; // pehli (aur sirf) app instance lo

export const auth = getAuth(app);