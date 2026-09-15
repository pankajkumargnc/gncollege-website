// src/firebase-auth.js — Enterprise Firebase Authentication Hub
// 🛡️ Handles session persistence, secure authentication, and role verification

import { 
  getAuth, 
  signInWithEmailAndPassword, 
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
    if (!isUserAuthorizedAdmin(credential.user)) {
      await signOut(auth);
      throw new Error("Access denied: This account is not authorized as an administrator.");
    }
    sessionStorage.removeItem('gnc_admin_auth');
    sessionStorage.setItem('gnc_active_session', '1');
    return credential.user;
  } catch (err) {
    if (err.message && err.message.startsWith("Access denied")) {
      throw err;
    }
    if (
      err.code === "auth/wrong-password" ||
      err.code === "auth/invalid-credential" ||
      err.code === "auth/user-not-found"
    ) {
      throw new Error("Invalid email/username or password. Please verify your credentials.");
    }

    // Handle friendly error messages
    if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
      throw new Error("Invalid email/username or password. Please verify your credentials.");
    }
    if (err.code === "auth/too-many-requests") {
      throw new Error("Access temporarily blocked due to multiple failed attempts. Please try again later.");
    }
    if (err.code === "auth/network-request-failed") {
      throw new Error("Network connection error. Please check your internet connection.");
    }
    if (err.code === "auth/operation-not-allowed") {
      throw new Error("Email/Password sign-in is not enabled in the Firebase Console. Please enable it under Authentication > Sign-in method.");
    }

    throw new Error(err.message || "Authentication failed. Please check credentials.");
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