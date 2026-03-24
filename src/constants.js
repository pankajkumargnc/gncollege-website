// src/constants.js
// ═══════════════════════════════════════════════════════════════════
// GNC COLLEGE — CENTRAL CONSTANTS FILE
// Ye file import karo, hardcoded values mat likho
//
// Usage:
//   import { COLLEGE, COLORS, LAYOUT, MONTHS_SHORT } from '../constants';
//   import { COLLEGE, LAYOUT } from '../../constants';  // nested folders
// ═══════════════════════════════════════════════════════════════════


// ── College Info ────────────────────────────────────────────────────
// Ye values puri website mein use hoti hain — ek jagah change karo
export const COLLEGE = {
  NAME:          'Guru Nanak College',
  NAME_SHORT:    'GNC',
  CITY:          'Dhanbad',
  STATE:         'Jharkhand',
  PIN:           '826001',
  ESTABLISHED:   1970,

  // Campuses
  BHUDA: {
    NAME:    'Bhuda Campus',
    LABEL:   'Main Campus • Boys Wing',
    ADDRESS: 'Guru Nanak College, Bhuda\nDhanbad, Jharkhand - 826001',
    PHONE:   '+91 79033 40991',
    EMAIL:   'info@gncollege.org',
    MAP_EMBED: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.089853381653!2d86.43232147533682!3d23.797658878638367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69707963d7e8b%3A0x86733221469e7f7b!2sGuru%20Nanak%20College%20Dhanbad!5e0!3m2!1sen!2sin!4v1708688000000!5m2!1sen!2sin',
  },
  BANK_MORE: {
    NAME:    'Bank More Campus',
    LABEL:   'Girls Wing • Vocational Studies',
    ADDRESS: 'Guru Nanak College, Bank More\nDhanbad, Jharkhand - 826001',
    PHONE:   '',  // Admin Panel se add karo
    EMAIL:   'vocational@gncollege.org',
    MAP_EMBED: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.630325992144!2d86.4175863149822!3d23.77601898456687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6a3048817a859%3A0x8d365f7d34c52968!2sGuru%20Nanak%20College%20Womens%20Wing!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
  },

  // Social — real URLs yahan daalo
  SOCIAL: {
    FACEBOOK:  'https://facebook.com/',   // TODO: real URL
    TWITTER:   'https://twitter.com/',    // TODO: real URL
    INSTAGRAM: 'https://instagram.com/', // TODO: real URL
    YOUTUBE:   'https://youtube.com/',   // TODO: real URL
  },
};


// ── Colors ──────────────────────────────────────────────────────────
// COLORS.navy use karo, '#0f2347' mat likhna direct
export const COLORS = {
  navy:      '#0f2347',
  navyDark:  '#060e1c',
  navyLight: '#1a3a7c',
  gold:      '#f4a023',
  goldDark:  '#d4870e',
  goldLight: '#fff8ed',
  red:       '#c0392b',
  white:     '#ffffff',
  lightGray: '#f8f9fa',
  gray:      '#6c757d',
  dark:      '#212529',
  green:     '#27ae60',

  // UI Colors
  text:      '#334155',
  textMid:   '#64748b',
  textLight: '#94a3b8',
  border:    '#e2e8f0',
  bg:        '#f8fafc',
};


// ── Layout ──────────────────────────────────────────────────────────
// maxWidth values — ek jagah se control karo
export const LAYOUT = {
  MAX_WIDTH:         '1200px',  // Most pages
  MAX_WIDTH_WIDE:    '1300px',  // Gallery, Staff grid
  MAX_WIDTH_NARROW:  '1000px',  // Notifications, Contact stats
  MAX_WIDTH_VIDEO:   '1280px',  // VideoGallery
  MAX_WIDTH_STAFF:   '1300px',  // StaffPage
  BORDER_RADIUS:     '16px',    // Cards
  BORDER_RADIUS_SM:  '10px',    // Buttons, inputs
  BORDER_RADIUS_LG:  '24px',    // Hero panels
  CARD_SHADOW:       '0 8px 25px rgba(0,0,0,0.07)',
  CARD_SHADOW_HOVER: '0 14px 36px rgba(11,31,78,0.13)',
};


// ── Breakpoints ─────────────────────────────────────────────────────
export const BP = {
  MOBILE_SM:  '360px',
  MOBILE:     '480px',
  TABLET:     '768px',
  LAPTOP:     '1024px',
  DESKTOP:    '1200px',
  WIDE:       '1400px',
};


// ── Date / Time Helpers ─────────────────────────────────────────────
// MONTHS_SHORT 4 files mein duplicate tha — ab ek jagah
export const MONTHS_SHORT = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
];

export const MONTHS_FULL = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

// Timestamp → JS Date converter (Firebase Timestamp ya ISO string dono handle karta hai)
export const getTS = ts => ts?.toDate ? ts.toDate() : new Date(ts || Date.now());

// Date formatters
export const fmtDate = ts => {
  const d = getTS(ts);
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
};

export const fmtDateFull = ts => {
  const d = getTS(ts);
  return `${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
};


// ── Firebase Collection Names ───────────────────────────────────────
// Typo se bachne ke liye — 'noticess' type karne ki jagah COLLECTIONS.NOTICES
export const COLLECTIONS = {
  NOTICES:       'notices',
  ANNOUNCEMENTS: 'announcements',
  EVENTS:        'events',
  GALLERY:       'gallery',
  PLACEMENTS:    'placements',
  PDF_REPORTS:   'pdfReports',
  FACULTIES:     'faculties',
  SLIDER:        'sliderSlides',
  NAV_LINKS:     'navLinks',
  PAGES:         'pages',
  ALERTS:        'alerts',
  CONTACT_DIR:   'contactDirectory',
  SETTINGS: {
    YOUTUBE:     'youtube',
    CONTACT:     'contact',
    DRIVE:       'drive',
    SITE:        'site',
  },
};


// ── Fallback Image ──────────────────────────────────────────────────
export const FALLBACK_IMAGE = '/images/college_photo.webp';


// ── Gallery Categories ──────────────────────────────────────────────
// AdminPanel aur HomePage dono mein same list use karo
// Batch 4 critical bug fix — pehle mismatch tha
export const GALLERY_CATEGORIES = [
  'Seminars',
  'Cultural Fest',
  'Guest Visit',
  'NSS Programs',
  'Sports',
  'Campus',
  'Departments',
];


// ── Document Types ──────────────────────────────────────────────────
// Batch 5 warning fix — Regulation + Affiliation missing tha
export const DOC_TYPES = [
  'Document',
  'Report',
  'Syllabus',
  'Circular',
  'Result',
  'Regulation',
  'Affiliation',
];


// ── Event Types ─────────────────────────────────────────────────────
export const EVENT_TYPES = [
  'WORKSHOP',
  'SEMINAR',
  'CULTURAL',
  'SPORTS',
  'NSS',
  'NCC',
  'ACADEMIC',
];


// ── Notice Categories ───────────────────────────────────────────────
export const NOTICE_CATEGORIES = [
  'General',
  'Examination',
  'Admission',
  'Holiday',
  'Sports',
  'Cultural',
  'Academic',
];


// ── News / Announcement Types ───────────────────────────────────────
export const NEWS_TYPES = [
  'News',
  'Achievement',
  'Update',
  'Result',
  'Scholarship',
];


// ── Staff Departments ───────────────────────────────────────────────
export const DEPARTMENTS = [
  'Commerce',
  'Hindi',
  'English',
  'Economics',
  'History',
  'Political Science',
  'Philosophy',
  'Sociology',
  'Geography',
  'Mathematics',
  'Computer Science',
  'BCA',
  'Physical Education',
  'Library',
  'Administration',
];


// ── Animation Durations ─────────────────────────────────────────────
export const ANIM = {
  FAST:   '0.15s',
  NORMAL: '0.22s',
  SLOW:   '0.4s',
  TICKER: '45s',   // PlacementsSection marquee speed
  BANNER: '18s',   // AlertBanner scroll speed
};