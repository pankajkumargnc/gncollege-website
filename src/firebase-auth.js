// src/firebase-auth.js — Enterprise Firebase Authentication Hub
// 🛡️ Handles session persistence, secure authentication, role verification, 2FA Master PIN, and Recovery
// Sole Credit & Primary Administrator: Pankaj Kumar Prasad

import { 
  getAuth, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
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
 * 👑 SOLE SYSTEM OWNER & ROOT ADMINISTRATOR
 * Only Pankaj Kumar Prasad is authorized to administer and recover this system.
 */
export const PRIMARY_OWNER_EMAIL = "pankajkumargnc@gmail.com";
export const PRIMARY_OWNER_NAME = "Pankaj Kumar Prasad";
export const PRIMARY_OWNER_ROLE = "SUPER_ADMIN";

export const AUTHORIZED_ADMIN_EMAILS = [
  PRIMARY_OWNER_EMAIL,
  "admin@gncollege.org",
  "principal@gncollege.org"
];

// Master 2FA PIN (Configurable via VITE_ADMIN_2FA_PIN, defaults to secure 6-digit master code)
const MASTER_2FA_PIN = import.meta.env.VITE_ADMIN_2FA_PIN || "894172";
const MAX_2FA_ATTEMPTS = 5;
const COOLDOWN_SECONDS = 60;

/**
 * Authenticate admin with Firebase Auth (Step 1: Credential Verification).
 */
export async function loginAdmin(usernameOrEmail, password) {
  const cleanInput = (usernameOrEmail || "").trim().toLowerCase();
  const cleanPass = (password || "").trim();

  if (!cleanInput || !cleanPass) {
    throw new Error("Please enter both email/username and password.");
  }

  // Resolve username alias to primary administrator email
  let targetEmail = cleanInput;
  if (!cleanInput.includes("@")) {
    targetEmail = PRIMARY_OWNER_EMAIL;
  }

  if (!AUTHORIZED_ADMIN_EMAILS.includes(targetEmail)) {
    throw new Error("Access Denied: Unrecognized administrator. Only authorized college administrators may sign in.");
  }

  try {
    const credential = await signInWithEmailAndPassword(auth, targetEmail, cleanPass);
    if (!isUserAuthorizedAdmin(credential.user)) {
      await signOut(auth);
      throw new Error("Access denied: This account is not authorized as an administrator.");
    }
    // Set pending 2FA flag
    sessionStorage.setItem('gnc_pending_2fa', '1');
    sessionStorage.removeItem('gnc_2fa_verified');
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
    if (err.code === "auth/too-many-requests") {
      throw new Error("Access temporarily blocked due to multiple failed attempts. Please try again later.");
    }
    if (err.code === "auth/network-request-failed") {
      throw new Error("Network connection error. Please check your internet connection.");
    }
    if (err.code === "auth/operation-not-allowed") {
      throw new Error("Email/Password sign-in is not enabled in Firebase Console.");
    }

    throw new Error(err.message || "Authentication failed. Please check credentials.");
  }
}

/**
 * Step 2: Verify 6-digit Master 2FA PIN
 */
export function verifyTwoFactorPin(enteredPin) {
  const cleanPin = (enteredPin || "").toString().trim();
  
  // Rate-limiting check
  const attemptsStr = sessionStorage.getItem('gnc_2fa_attempts') || '0';
  const lockTimeStr = sessionStorage.getItem('gnc_2fa_lock_until');
  const now = Date.now();

  if (lockTimeStr && now < parseInt(lockTimeStr, 10)) {
    const remainingSecs = Math.ceil((parseInt(lockTimeStr, 10) - now) / 1000);
    throw new Error(`Too many failed attempts. 2FA is locked for ${remainingSecs} seconds.`);
  }

  let attempts = parseInt(attemptsStr, 10);

  if (cleanPin === MASTER_2FA_PIN) {
    // Reset attempt counters on success
    sessionStorage.removeItem('gnc_2fa_attempts');
    sessionStorage.removeItem('gnc_2fa_lock_until');
    sessionStorage.removeItem('gnc_pending_2fa');
    sessionStorage.setItem('gnc_2fa_verified', '1');
    sessionStorage.setItem('gnc_admin_role', PRIMARY_OWNER_ROLE);
    sessionStorage.setItem('gnc_active_session', '1');
    return { success: true };
  } else {
    attempts += 1;
    sessionStorage.setItem('gnc_2fa_attempts', attempts.toString());
    if (attempts >= MAX_2FA_ATTEMPTS) {
      const lockUntil = now + (COOLDOWN_SECONDS * 1000);
      sessionStorage.setItem('gnc_2fa_lock_until', lockUntil.toString());
      throw new Error(`Master PIN incorrect. Account locked for ${COOLDOWN_SECONDS} seconds due to repeated invalid attempts.`);
    }
    const remaining = MAX_2FA_ATTEMPTS - attempts;
    throw new Error(`Incorrect 6-digit Master PIN. (${remaining} attempt${remaining === 1 ? '' : 's'} remaining).`);
  }
}

/**
 * Check whether 2FA has been successfully verified in the current session
 */
export function isTwoFactorVerified() {
  return sessionStorage.getItem('gnc_2fa_verified') === '1';
}

/**
 * Request Password Reset Email for the Primary Administrator (Sole Owner)
 * Strictly sends reset email to pankajkumargnc@gmail.com
 */
export async function sendAdminPasswordReset() {
  try {
    await sendPasswordResetEmail(auth, PRIMARY_OWNER_EMAIL);
    return {
      success: true,
      email: PRIMARY_OWNER_EMAIL,
      message: `Password reset instructions have been dispatched securely to ${PRIMARY_OWNER_EMAIL}.`
    };
  } catch (err) {
    console.error("[FirebaseAuth] Password reset failed:", err);
    throw new Error(err.message || "Failed to dispatch password reset email. Please verify network connection.");
  }
}

/**
 * Recover Administrator Username / Identity using Master Verification Key
 */
export function recoverAdminUsername(verificationKey) {
  const cleanKey = (verificationKey || "").toString().trim();
  if (MASTER_2FA_PIN && cleanKey === MASTER_2FA_PIN) {
    return {
      success: true,
      username: "admin",
      email: PRIMARY_OWNER_EMAIL,
      name: PRIMARY_OWNER_NAME,
      role: "Super Administrator"
    };
  }
  throw new Error("Invalid Master Verification Key. Only authorized college administrators can recover access credentials.");
}

/**
 * Securely log out current admin and invalidate session
 */
export async function logoutAdmin() {
  try {
    sessionStorage.removeItem('gnc_admin_auth');
    sessionStorage.removeItem('gnc_active_session');
    sessionStorage.removeItem('gnc_2fa_verified');
    sessionStorage.removeItem('gnc_pending_2fa');
    sessionStorage.removeItem('gnc_admin_role');
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