// src/firebase-auth.js — Enterprise Firebase Authentication Hub
// 🛡️ Handles session persistence, secure authentication, and role verification

import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  setPersistence, 
  browserLocalPersistence,
  onAuthStateChanged 
} from "firebase/auth";
import { getApps } from "firebase/app";

// Re-use the existing initialized Firebase app instance
const app = getApps()[0];
export const auth = getAuth(app);

// Enable permanent local browser session persistence
try {
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn("[FirebaseAuth] Persistence setting warning:", err.message);
  });
} catch (_) {}

/**
 * Standard authorized admin email addresses
 */
export const AUTHORIZED_ADMIN_EMAILS = [
  "pankajkumargnc@gmail.com",
  "admin@gncollege.org",
  "principal@gncollege.org"
];

/**
 * Authenticate admin with Firebase Auth.
 * If user does not exist in Firebase Auth yet, auto-provisions the primary admin account.
 */
export async function loginAdmin(usernameOrEmail, password) {
  const cleanInput = (usernameOrEmail || "").trim().toLowerCase();
  const cleanPass = (password || "").trim();

  if (!cleanInput || !cleanPass) {
    throw new Error("Please enter both email/username and password.");
  }

  // Resolve to official email
  let targetEmail = cleanInput;
  if (!cleanInput.includes("@")) {
    // If username is "admin" or similar, map to primary admin email
    targetEmail = "pankajkumargnc@gmail.com";
  }

  try {
    // 1. Attempt standard Firebase Auth sign-in
    const credential = await signInWithEmailAndPassword(auth, targetEmail, cleanPass);
    sessionStorage.removeItem('gnc_admin_auth');
    sessionStorage.setItem('gnc_active_session', '1');
    return credential.user;
  } catch (err) {
    // 2. If user not found and this is the primary authorized email, auto-create account
    if (
      err.code === "auth/user-not-found" ||
      err.code === "auth/invalid-credential"
    ) {
      if (AUTHORIZED_ADMIN_EMAILS.includes(targetEmail)) {
        try {
          const newCredential = await createUserWithEmailAndPassword(auth, targetEmail, cleanPass);
          console.info("[FirebaseAuth] Successfully provisioned primary admin account:", targetEmail);
          sessionStorage.removeItem('gnc_admin_auth');
          sessionStorage.setItem('gnc_active_session', '1');
          return newCredential.user;
        } catch (createErr) {
          if (createErr.code === "auth/email-already-in-use") {
            throw new Error("Incorrect password for this admin account.");
          }
          if (createErr.code === "auth/operation-not-allowed") {
            err = createErr;
          } else {
            throw createErr;
          }
        }
      }
    }

    // 3. Fallback: If Firebase Email/Password is not enabled in Firebase Console (auth/operation-not-allowed)
    // or auth configuration is missing, use environment-configured admin credentials
    if (err.code === "auth/operation-not-allowed" || err.code === "auth/configuration-not-found") {
      console.warn("[FirebaseAuth] Email/Password provider not enabled in Firebase Console. Checking configured admin credentials.");
      const adminUser = (import.meta.env.VITE_ADMIN_USER || "admin").toLowerCase();
      const adminPass = import.meta.env.VITE_ADMIN_PASS;
      
      const isUserMatch = cleanInput === adminUser || AUTHORIZED_ADMIN_EMAILS.includes(targetEmail);
      const isPassMatch = Boolean(adminPass && cleanPass === adminPass);

      if (isUserMatch && isPassMatch) {
        sessionStorage.removeItem('gnc_admin_auth');
        sessionStorage.setItem('gnc_active_session', '1');
        return {
          uid: "gnc-admin-master-bridge",
          email: targetEmail,
          displayName: "College Administrator",
          isLocalBridge: true
        };
      } else {
        throw new Error(adminPass ? "Invalid administrator username or password." : "Authentication service unavailable. Please configure Firebase Authentication or administrative credentials.");
      }
    }

    // Friendly error messages
    if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
      throw new Error("Invalid password. Please verify your credentials.");
    }
    if (err.code === "auth/too-many-requests") {
      throw new Error("Access temporarily blocked due to many failed attempts. Try again later.");
    }
    if (err.code === "auth/network-request-failed") {
      throw new Error("Network connection error. Check your internet.");
    }

    throw new Error(err.message || "Authentication failed.");
  }
}

/**
 * Securely log out current admin and invalidate session
 */
export async function logoutAdmin() {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("[FirebaseAuth] Logout error:", err);
  }
}

/**
 * Check if the currently signed-in user is an authorized college admin
 */
export function isUserAuthorizedAdmin(user) {
  if (!user || !user.email) return false;
  return AUTHORIZED_ADMIN_EMAILS.includes(user.email.toLowerCase());
}

export { onAuthStateChanged };
export default auth;