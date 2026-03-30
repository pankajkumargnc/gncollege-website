// src/utils/errorLogger.js — Error Logging System
// 🔐 @Security_Agent — Centralized error tracking with localStorage persistence

const MAX_LOGS = 100;
const STORAGE_KEY = 'gnc_error_logs';

/**
 * Error severity levels
 */
export const ERROR_LEVELS = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  CRITICAL: 'critical',
};

/**
 * Error categories
 */
export const ERROR_CATEGORIES = {
  FIREBASE: 'firebase',
  NETWORK: 'network',
  DRIVE: 'drive',
  AUTH: 'auth',
  RENDER: 'render',
  GENERAL: 'general',
};

/**
 * Get all stored error logs
 */
export function getErrorLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Log an error with metadata
 * @param {string} message — human-readable error description
 * @param {object} options — { level, category, details, stack }
 */
export function logError(message, options = {}) {
  const {
    level = ERROR_LEVELS.ERROR,
    category = ERROR_CATEGORIES.GENERAL,
    details = null,
    stack = null,
  } = options;

  const entry = {
    id: Date.now() + Math.random().toString(36).slice(2, 6),
    timestamp: new Date().toISOString(),
    message,
    level,
    category,
    details: details ? String(details).slice(0, 500) : null,
    stack: stack ? String(stack).slice(0, 1000) : null,
    url: window.location.href,
    userAgent: navigator.userAgent.slice(0, 150),
  };

  try {
    const logs = getErrorLogs();
    logs.unshift(entry);
    
    // Keep only last MAX_LOGS entries
    if (logs.length > MAX_LOGS) logs.length = MAX_LOGS;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch {
    // localStorage full or unavailable — silently fail
  }

  // Also log to console in dev
  if (import.meta.env.DEV) {
    console.warn(`[GNC ${level.toUpperCase()}] [${category}]`, message, details || '');
  }

  return entry;
}

/**
 * Clear all error logs
 */
export function clearErrorLogs() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Log Firebase-specific errors
 */
export function logFirebaseError(operation, error) {
  return logError(`Firebase ${operation} failed: ${error.message || error}`, {
    level: ERROR_LEVELS.ERROR,
    category: ERROR_CATEGORIES.FIREBASE,
    details: error.code || null,
    stack: error.stack || null,
  });
}

/**
 * Log network errors
 */
export function logNetworkError(url, error) {
  return logError(`Network request failed: ${url}`, {
    level: ERROR_LEVELS.WARN,
    category: ERROR_CATEGORIES.NETWORK,
    details: error.message || String(error),
  });
}

export default logError;
