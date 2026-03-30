// src/utils/backup.js — Auto-Backup System
// 🔐 @Security_Agent — Firebase collection backup with localStorage & JSON download

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const BACKUP_KEY = 'gnc_backup_data';
const BACKUP_TIME_KEY = 'gnc_backup_timestamp';
const BACKUP_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Collections to backup
 */
const BACKUP_COLLECTIONS = [
  'notices',
  'announcements',
  'events',
  'gallery',
  'faculties',
  'sliderSlides',
  'updates',
  'navigation',
];

/**
 * Create a full backup of all collections
 * @returns {object} { timestamp, collections: { [name]: docs[] } }
 */
export async function createBackup() {
  const backup = {
    timestamp: new Date().toISOString(),
    version: '1.0',
    site: 'GNC College Website',
    collections: {},
  };

  for (const colName of BACKUP_COLLECTIONS) {
    try {
      const snap = await getDocs(collection(db, colName));
      backup.collections[colName] = snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
      }));
    } catch (err) {
      backup.collections[colName] = { error: err.message };
    }
  }

  // Save to localStorage
  try {
    localStorage.setItem(BACKUP_KEY, JSON.stringify(backup));
    localStorage.setItem(BACKUP_TIME_KEY, backup.timestamp);
  } catch {
    // localStorage full — skip
  }

  return backup;
}

/**
 * Check if auto-backup is needed (24hr interval)
 */
export function isBackupNeeded() {
  try {
    const lastBackup = localStorage.getItem(BACKUP_TIME_KEY);
    if (!lastBackup) return true;
    return Date.now() - new Date(lastBackup).getTime() > BACKUP_INTERVAL;
  } catch {
    return true;
  }
}

/**
 * Get last backup from localStorage
 */
export function getLastBackup() {
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Download backup as JSON file
 */
export function downloadBackup(backup) {
  if (!backup) return;
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gnc-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Auto-backup check — call on app mount
 */
export async function autoBackupCheck() {
  if (isBackupNeeded()) {
    try {
      await createBackup();
    } catch {
      // Silent fail — backup is non-critical
    }
  }
}

export default createBackup;
