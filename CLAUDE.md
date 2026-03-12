# CLAUDE.md — GNC College Website
## Complete AI Development Reference Guide

> **Ye file Claude AI ke liye hai.** Jab bhi koi change, feature, ya fix karo — is file ke rules strictly follow karo. Kabhi bhi existing working code mat todo. Kabhi bhi speculative ya partial code mat likho.

---

## 0. PROJECT IDENTITY

| Field | Value |
|-------|-------|
| Project Name | GNC College Website |
| College | Guru Nanak College, Dhanbad, Jharkhand |
| Live URL | `https://pankajkumargnc.github.io/gncollege-website/` |
| GitHub Repo | `pankajkumargnc/gncollege-website` |
| Dev Server | `npm run dev` |
| Production Build | `npm run build` |
| Framework | React 18 + Vite |
| Hosting | GitHub Pages |
| Database | Firebase Firestore |
| Auth | Firebase Authentication |
| Storage | ImgBB (Free, Lifetime) — **No Firebase Storage** |
| Router | React Router DOM (HashRouter) — URLs use `#`: `site/#/admin` |
| Sanitization | DOMPurify |
| Notifications | react-hot-toast |
| Animations | AOS (Animate On Scroll) |

---

## 1. PROJECT STRUCTURE

```
gncollege-website/
├── public/
│   ├── images/
│   │   ├── college_photo.jpg  ← DEFAULT FALLBACK IMAGE (always exists)
│   │   ├── logo.png
│   │   ├── principal.jpg
│   │   ├── vice_principal.jpg
│   │   ├── naac.png, bbmku.png, ugc.png
│   │   ├── campus1.jpg, campus2.jpg
│   │   └── library.jpg, lab.jpg, seminar.jpg
│   └── pdfs/
│       ├── prospectus.pdf, syllabus.pdf
│       ├── fee-structure.pdf, admission-form.pdf
│
├── src/
│   ├── App.jsx               ← Root component, all routes, ErrorBoundary wrapper
│   ├── firebase.js           ← Firebase init — exports: db, auth (NO storage)
│   ├── constants.js          ← Central constants (COLORS, COLLEGE, COLLECTIONS, enums)
│   │
│   ├── styles/
│   │   └── colors.js         ← COLORS object
│   │
│   ├── data/
│   │   └── db.js             ← Static data: navLinks, SOCIAL_LINKS
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── Contact.jsx
│   │   ├── CollegeProfile.jsx
│   │   ├── NotificationsPage.jsx
│   │   ├── DocumentsPage.jsx
│   │   ├── EventsPage.jsx
│   │   ├── NewsPage.jsx
│   │   ├── VideoGallery.jsx
│   │   ├── DepartmentPage.jsx   ← Universal template (all 5 depts + hub)
│   │   ├── StaffPage.jsx
│   │   └── LeadershipPage.jsx   ← ✅ NEW: Presidents / Secretaries / Principals
│   │
│   └── components/
│       ├── Navbar.jsx, Footer.jsx, TopBar.jsx
│       ├── Breadcrumbs.jsx, AlertBanner.jsx
│       ├── ErrorBoundary.jsx
│       ├── HeroSlider.jsx, PlacementsSection.jsx
│       ├── NotificationSection.jsx, HomeFeatures.jsx
│       ├── QuickActionNav.jsx, Ticker.jsx (lazy)
│       ├── ImageCropper.jsx (lazy)
│       ├── MediaPicker.jsx      ← Universal image/pdf picker
│       ├── PageViewer.jsx       ← ✅ UPDATED: loading prop, gnc-prose CSS, no standalone mode
│       ├── AdminLogin.jsx
│       ├── AdminPanel.jsx       ← ✅ UPDATED: Jodit resizable, preview modal gnc-prose
│       ├── AdminDepartmentTab.jsx (lazy inside AdminPanel)
│       └── AdminLeadershipTab.jsx ← ✅ NEW: Admin tab for Presidents/Secretaries/Principals
│
├── vite.config.js
├── CLAUDE.md                    ← THIS FILE
└── package.json
```

---

## 2. FIREBASE CONFIGURATION

### `src/firebase.js` — Required Exports
```js
import { initializeApp } from 'firebase/app';
import { getFirestore }  from 'firebase/firestore';
import { getAuth }       from 'firebase/auth';
// storage NAHI — ImgBB use hota hai

export const db   = getFirestore(app);
export const auth = getAuth(app);
```

### Firebase Credentials (.env)
```
VITE_FIREBASE_API_KEY=AIzaSyDeJWUUoU_MJ4ubpbfaLZemvnEr82LF5YA
VITE_FIREBASE_AUTH_DOMAIN=gnc-college-web.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gnc-college-web
VITE_FIREBASE_STORAGE_BUCKET=gnc-college-web.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=78901559372
VITE_FIREBASE_APP_ID=1:78901559372:web:f76cb101f8aec2daadb4e9
```

### ⚠️ Critical: No Firebase Storage
- Storage = ImgBB only
- `AdminDepartmentTab.jsx` mein `firebase/storage` import NAHI hai
- PDF → Google Drive public link ya `public/pdfs/`
- Images → ImgBB API (key Settings tab se)

---

## 3. ALL FIRESTORE COLLECTIONS

| Collection | Purpose | Key Fields |
|------------|---------|-----------|
| `notices` | Notice board | `text, type, link, isNew, pinned, createdAt` |
| `announcements` | News & updates | `text, type, link, createdAt` |
| `events` | College events | `title, desc, day, month, type, location, status, imageUrl, reportLink, date` |
| `gallery` | Photo gallery | `title, cat, src, createdAt` |
| `placements` | Alumni Wall | `name, year, company, package, imageUrl, dept, achievement, createdAt` |
| `pdfReports` | Documents | `title, type, link, targetPage, createdAt` |
| `faculties` | Staff | `name, staffType, dept, qual, desig, imageUrl, email, specialization, createdAt` |
| `sliderSlides` | Hero slider | `title, subtitle, btnText, btnLink, image, order, createdAt` |
| `pages` | CMS pages | `title, slug, path, content, seo, createdAt` |
| `alerts` | Flash banner | `text, type, isActive, link, createdAt` |
| `departments` | Dept data | slug as doc ID |
| `contactDirectory` | Contact directors | `icon, title, name, phone, order` |
| `adminLogs` | Activity log | `action, message, section, time` |
| `_sysTest` | System test | `test, time` |
| `leadership` | ✅ NEW: Leaders | `type, name, from, to, photo, note, createdAt` |

### `leadership` Collection Schema ✅ NEW
```js
{
  type:      'president' | 'secretary' | 'principal',
  name:      'Dr. Gurjit Singh',
  from:      '2018',       // year string
  to:        '2022',       // year string, 'Present', ya blank = current
  photo:     'https://...', // ImgBB URL ya /images/ path (optional)
  note:      'NAAC B++ awarded under tenure', // optional
  createdAt: serverTimestamp()
}
```

### Settings Documents

| Document | Fields |
|----------|--------|
| `settings/site` | `name, tagline, address, phone, email, facebook, twitter, youtube, linkedin, footerText, maintenanceMode, imgbbKey` |
| `settings/navbar` | `links: [{label, href, children:[]}]` |
| `settings/youtube` | `apiKey, channelId, maxResults` |
| `settings/drive` | `apiKey, folderId, folderName` |
| `settings/contact` | `bhuda: {phone, email, address}, bankMore: {phone, email, address}` |

### `departments/{slug}` Schema
```js
{
  fullName, short, tagline, about, vision, mission,
  hod: { name, desig, qual, email, phone, message, imageUrl },
  stats: [{ icon, value, label, sub }],
  highlights: [{ icon, title, desc }],
  facilities: [{ icon, name, desc }],
  curriculum: { "Semester I": ["Subject 1"] },
  feeStructure: [{ category, amount, note }],
  programReports: [{ id, title, year, pdfUrl }],
  achievements: ["string"],
  updatedAt: serverTimestamp()
}
```

---

## 4. REACT ROUTES (App.jsx) ✅ UPDATED

### Public Routes

| Path | Component | Notes |
|------|-----------|-------|
| `/` | `HomePage` | AOS, all sections |
| `/contact` | `Contact` | `settings/contact` + `contactDirectory` |
| `/about-us/college-profile` | `CollegeProfile` | Static |
| `/about-us/college-management/presidents` | `LeadershipPage` | ✅ NEW `type="president"` |
| `/about-us/college-management/secretaries` | `LeadershipPage` | ✅ NEW `type="secretary"` |
| `/about-us/college-management/principal` | `LeadershipPage` | ✅ NEW `type="principal"` |
| `/notifications` | `NotificationsPage` | `notices` |
| `/documents` | `DocumentsPage` | `pdfReports` |
| `/events` | `EventsPage` | `events` |
| `/news` | `NewsPage` | `announcements` + DOMPurify |
| `/video-gallery` | `VideoGallery` | YouTube API |
| `/about-us/college-staff/teaching-staff` | `StaffPage` | staffType=Teaching |
| `/about-us/college-staff/non-teaching-staff` | `StaffPage` | staffType=Non-Teaching |
| `/gallery` | PhotoGalleryPage | `gallery` |
| `/academics/departments` | `DepartmentPage` | Hub |
| `/academics/departments/:deptSlug` | `DepartmentPage` | Individual |
| `/p/:slug` | `DynamicPageRoute` | CMS pages |
| `/admin` | `AdminPanel` (lazy) | Auth-protected |

### ⚠️ PlaceholderPaths — Critical Rules
- Leadership paths (`/presidents`, `/secretaries`, `/principal`) → **NOT in placeholderPaths** — use `LeadershipPage`
- Department paths → **NOT in placeholderPaths** — use `:deptSlug` route
- Pages & SEO path **must match exactly** — slash se shuru, no trailing slash, no space

```
✅ /about-us/various-committees/womens-cell
❌ /about-us/various-committees/womens-cell/
❌ about-us/various-committees/womens-cell
```

### `pagesLoaded` State ✅ NEW
```js
// App.jsx — pages ke liye separate listener
const [pagesLoaded, setPagesLoaded] = useState(false);

const unsubPages = onSnapshot(
  query(collection(db, 'pages'), orderBy('createdAt', 'desc')),
  snap => {
    setPages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setPagesLoaded(true);
  },
  () => setPagesLoaded(true) // error pe bhi loaded mark karo
);

// PlaceholderPaths route mein:
<PageViewer page={pageContentByPath.get(path) ?? null} loading={!pagesLoaded} />
//                                               ↑ null, undefined nahi
```

### Jodit Config ✅ UPDATED
```js
const joditCfg = {
  readonly: false,
  placeholder: 'Content likhein…',
  height: 420,           // was 280
  minHeight: 300,
  allowResizeY: true,    // ✅ NEW — drag se resize
  allowResizeX: false,
  theme: 'default',
  toolbarAdaptive: false,
  toolbarSticky: true,
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  buttons: [
    'bold','italic','underline','strikethrough','|',
    'ul','ol','|',
    'outdent','indent','|',
    'font','fontsize','brush','|',
    'paragraph','|',
    'table','link','image','|',
    'align','|',
    'hr','eraser','|',
    'undo','redo','|',
    'fullsize'
  ],
  style: {
    fontFamily: "'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif",
    fontSize: '15px', color: '#334155', lineHeight: '1.8',
  },
};
```

---

## 5. CENTRAL CONSTANTS (constants.js)

```js
import {
  COLLEGE, COLORS, LAYOUT, BP,
  MONTHS_SHORT, MONTHS_FULL,
  getTS, fmtDate,
  COLLECTIONS,
  FALLBACK_IMAGE,        // '/images/college_photo.jpg'
  GALLERY_CATEGORIES,
  DOC_TYPES, EVENT_TYPES,
  NOTICE_CATEGORIES, NEWS_TYPES,
  DEPARTMENTS, ANIM,
} from '../constants';
```

### COLORS Object
```js
COLORS = {
  navy:      '#0f2347',   // Primary
  navyDark:  '#060e1c',   // Sidebar
  navyLight: '#1a3a7c',   // Hover/gradients
  gold:      '#f4a023',   // Accent
  goldDark:  '#d4870e',
  goldLight: '#fff8ed',
  red:       '#c0392b',
  white:     '#ffffff',
  lightGray: '#f8f9fa',
  gray:      '#6c757d',
  dark:      '#212529',
  green:     '#27ae60',
  text:      '#334155',
  textMid:   '#64748b',
  textLight: '#94a3b8',
  border:    '#e2e8f0',
  bg:        '#f8fafc',
}
```

---

## 6. COMPONENT REFERENCE

### `LeadershipPage.jsx` ✅ NEW
**Path:** `src/pages/LeadershipPage.jsx`

```jsx
<LeadershipPage type="president"  title="Presidents Over the Years" />
<LeadershipPage type="secretary"  title="Secretaries Over the Years" />
<LeadershipPage type="principal"  title="Principals Over the Years" />
```

**Features:**
- Toggle: Timeline Cards view / Table view
- Stats strip — count, total years, current leader
- Current leader: pulsing dot + highlighted card/row
- `FALLBACK = '/images/college_photo.jpg'`

**⚠️ Query — No orderBy (avoids composite index):**
```js
// ✅ Correct
const q = query(collection(db, 'leadership'), where('type', '==', type));
// client-side sort:
.sort((a, b) => parseInt(b.from || 0) - parseInt(a.from || 0))

// ❌ Wrong — composite index needed
query(..., where('type','==',type), orderBy('from','desc'))
```

---

### `PageViewer.jsx` ✅ UPDATED
**Path:** `src/components/PageViewer.jsx`

```jsx
<PageViewer
  page={pageObject | null}   // pageContentByPath.get(path) ?? null
  loading={!pagesLoaded}     // ✅ NEW prop
/>
```

- `loading=true` → shimmer skeleton
- `page` has content → `.gnc-prose` rendered HTML
- `page=null` → `EmptyState` with path hint
- **Standalone mode removed**

**`.gnc-prose` CSS covers:**
- h1–h6 (navy, bold, gold underline h2)
- p, a, strong, em, ul, ol, blockquote, hr, code, pre, img
- **Tables:** navy gradient header, gold left accent, zebra rows, hover, mobile wrap
- `wrapTablesForMobile()` wraps `<table>` in `.gnc-table-wrap`

---

### `AdminLeadershipTab.jsx` ✅ NEW
**Path:** `src/components/AdminLeadershipTab.jsx`

3 sub-tabs (Presidents / Secretaries / Principals), Add/Edit/Delete.

**Critical implementation details:**
```jsx
// ✅ React Portal — REQUIRED (AdminPanel transform CSS breaks position:fixed)
import { createPortal } from 'react-dom';
{showModal && createPortal(<ModalJSX />, document.body)}

// ✅ Debounced photo preview — prevents flicker
const [previewUrl, setPreviewUrl] = useState('');
const previewTimer = useRef(null);

onChange={e => {
  const val = e.target.value;
  setForm(f => ({ ...f, photo: val }));
  clearTimeout(previewTimer.current);
  previewTimer.current = setTimeout(() => setPreviewUrl(val), 800);
}}
onBlur={e => {
  e.target.style.borderColor = '#e2e8f0';
  clearTimeout(previewTimer.current);
  setPreviewUrl(form.photo);
}}

// ✅ onError → display:none (not src=FALLBACK — avoids re-render loop)
<img onError={e => { e.target.style.display = 'none'; }} />
```

**Add to AdminPanel.jsx:**
```jsx
// 1. Import
import AdminLeadershipTab from './AdminLeadershipTab';

// 2. TABS array (after departments)
{ id: 'leadership', icon: '👑', label: 'Leadership', section: '' },

// 3. JSX (after departments closing )})
{tab === 'leadership' && (
  <div className="fade-up">
    <AdminLeadershipTab />
  </div>
)}
```

---

### `AdminPanel.jsx` ✅ UPDATED

**Live Preview Modal:**
- Fake page hero banner (navy gradient + title)
- `.prev-prose` CSS — exact same as `PageViewer`'s `.gnc-prose`
- Tables: navy header + zebra rows + gold accent — same as live page
- `wrapTablesForMobile` equivalent applied

**Admin Tabs (22 total):**

| Tab ID | Icon | Label | Firebase |
|--------|------|-------|---------|
| `dashboard` | 📊 | Dashboard | All |
| `quick` | ⚡ | Quick Publish | events, notices, announcements |
| `alerts` | 🚨 | Flash Alerts | `alerts` |
| `placements` | 🎓 | Alumni Wall | `placements` |
| `faculty` | 👨‍🏫 | Faculty & Staff | `faculties` |
| `departments` | 🏛️ | Departments | `departments/{slug}` |
| `leadership` | 👑 | Leadership | `leadership` ✅ NEW |
| `slider` | 🖼️ | Hero Slider | `sliderSlides` |
| `menu_builder` | 🧭 | Menu Editor | `settings/navbar` |
| `pages` | 📄 | Pages & SEO | `pages` |
| `gallery` | 📸 | Gallery | `gallery` |
| `notices` | 📢 | Notices | `notices` |
| `announcements` | 📣 | News | `announcements` |
| `documents` | 📁 | Documents | `pdfReports` |
| `events` | 🏆 | Events | `events` |
| `youtube` | ▶️ | YouTube | `settings/youtube` |
| `drive` | ☁️ | Drive Sync | `settings/drive` |
| `settings` | ⚙️ | Site Settings | `settings/site` |
| `contact` | 📞 | Contact Settings | `settings/contact` + `contactDirectory` |
| `activity` | 📋 | Activity Log | `adminLogs` |
| `backup` | 💾 | Backup & Restore | All |
| `system_test` | 🛡️ | System Test | Health checks |

**MediaPicker locations (9):** Alumni Wall, Faculty, Hero Slider, Gallery, Events photo, Events PDF, Notices link, News link, Documents PDF

---

### Other Components

#### `MediaPicker.jsx`
```jsx
<MediaPicker label="Photo" value={url} onChange={url => ...} type="image" compact={false} />
// type: 'image' | 'pdf' | 'any'
```

#### `HeroSlider.jsx` — `FALLBACK` array OUTSIDE component
#### `AlertBanner.jsx` — `dismissed` useRef, setTimeout cleanup
#### `ErrorBoundary.jsx` — class component, wraps ALL routes
#### `DepartmentPage.jsx` — `resolvedRef` Set, `scrollIntoView()`, no `href="#section"`

---

## 7. SYSTEM TEST SUITE (18 Phases)

| Phase | Test |
|-------|------|
| T1 | Vite Build Env |
| T2 | Firebase Init |
| T3 | Firestore Read |
| T4 | Firestore Write |
| T5 | Firestore Delete |
| T6 | Navbar Settings |
| T7 | Site Settings |
| T8 | ImgBB API |
| T9 | Flash Alerts |
| T10 | Faculty Directory |
| T11 | Alumni Placements |
| T12 | Content Health |
| T13 | YouTube API |
| T14 | Google Drive |
| T15 | Activity Logging |
| T16 | Department Data |
| T17 | Contact Settings |
| T18 | Leadership ✅ NEW — `leadership` collection readable |

---

## 8. CODING RULES (STRICTLY FOLLOW)

### React
```js
// ✅ Constants OUTSIDE component
const CONFIG = {};
export default function MyComp() { /* use CONFIG */ }

// ✅ useEffect cleanup
useEffect(() => {
  const t = setTimeout(() => {}, 1000);
  return () => clearTimeout(t);
}, []);

// ✅ useCallback for deps
const fn = useCallback(async () => {}, [dep]);
```

### Firebase
```js
// ✅ try/catch always
try {
  const snap = await getDoc(doc(db, 'settings', 'site'));
  if (snap.exists()) setData(snap.data());
} catch (e) { console.error(e); }

// ✅ onSnapshot cleanup
const unsub = onSnapshot(q, snap => { ... });
return () => unsub();

// ✅ serverTimestamp
await addDoc(collection(db, 'x'), { ...data, createdAt: serverTimestamp() });

// ✅ where + orderBy → composite index issue
// AVOID mixing — sort client-side instead:
.sort((a, b) => parseInt(b.from) - parseInt(a.from))
```

### Admin Modals — Portal Required
```js
// ✅ ALWAYS for Admin Panel modals
import { createPortal } from 'react-dom';
{showModal && createPortal(<div style={S.overlay}>...</div>, document.body)}
// Reason: AdminPanel has transform CSS → breaks position:fixed containing block
```

### Security
```js
// ✅ DOMPurify on ALL Firestore HTML
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
```

### Images
```js
// ✅ Fallback — onError sets display:none (not src=FALLBACK — avoids flicker loop)
<img
  src={item.imageUrl || FALLBACK_IMAGE}
  onError={e => { e.target.style.display = 'none'; }}
  alt="desc"
/>
// Exception: card images where replacement is desired:
onError={e => { e.target.src = FALLBACK_IMAGE; }}
```

### Styling
```js
// ✅ COLORS — no hardcoded hex
import { COLORS } from '../constants';
color: COLORS.navy

// ✅ Flat 2.0 — no heavy shadows
border: `1px solid ${COLORS.border}` // ✅
boxShadow: '0 20px 60px rgba(0,0,0,0.3)' // ❌
```

### MediaPicker
```js
// ✅ ALWAYS use for uploads
<MediaPicker label="Photo" value={url} onChange={url => ...} type="image" />
// ❌ Never <input type="file"> directly
// ❌ Never Firebase Storage
```

---

## 9. MEDIA / IMAGE STRATEGY

| Type | How |
|------|-----|
| Photos | ImgBB API via MediaPicker |
| PDFs | Google Drive public link |
| Static assets | `public/images/` → `/images/file.jpg` |
| Static PDFs | `public/pdfs/` → `/pdfs/file.pdf` |

**ImgBB key:** Admin → Site Settings → `settings/site.imgbbKey` → `setImgbbKey(key)`

---

## 10. DEPARTMENT SYSTEM

| Page | Slug | Color | Faculty `dept` |
|------|------|-------|---------------|
| BCA | `bca` | `#0ea5e9` | `BCA` |
| BBA | `bba` | `#f59e0b` | `BBA` |
| Commerce | `commerce` | `#10b981` | `Commerce` |
| Humanities | `humanities` | `#8b5cf6` | `Hindi` or `English` |
| Social Science | `social-science` | `#ef4444` | `History`, `Political Science`, `Economics` |

```jsx
// Routes — NOT in placeholderPaths
<Route path="/academics/departments"           element={<DepartmentPage />} />
<Route path="/academics/departments/:deptSlug" element={<DepartmentPage />} />
```

---

## 11. ADMIN PANEL — KEY PATTERNS

```js
// useLocalDraft
const [data, setData, clearDraft] = useLocalDraft('fac', { name: '' });
clearDraft(); // after save

// softDelete
softDelete('faculties', id, obj, obj.name);
// → moves to _deleted_faculties

// logAct
logAct('add',    'Name', 'section');
logAct('update', 'Name', 'section');
logAct('delete', 'Name', 'section');
```

---

## 12. PENDING FIXES

### 🔴 Critical
- [ ] `colors.js`: navy → `#0f2347`, navyDark → `#060e1c`
- [ ] `firebase.js`: Confirm storage export removed
- [ ] Firestore Security Rules:
  ```js
  match /leadership/{id}       { allow read: if true; allow write: if request.auth != null; }
  match /departments/{slug}    { allow read: if true; allow write: if request.auth != null; }
  match /contactDirectory/{id} { allow read: if true; allow write: if request.auth != null; }
  match /settings/{doc}        { allow read: if true; allow write: if request.auth != null; }
  ```

### 🟡 Important
- [ ] `db.js`: Gallery link `'#gallery'` → `'/#gallery'`
- [ ] `db.js`: Real GNC social media URLs
- [ ] `Footer.jsx`: Newsletter button handler or remove
- [ ] `NotificationSection.jsx`: RAF memory leak fix (3 useEffects)
- [ ] `AdminPanel.jsx`: Gallery categories → `GALLERY_CATEGORIES` from constants
- [ ] `NotificationsPage.jsx`: Month filter pills + DOMPurify
- [ ] Navbar: Academics → Departments submenu (5 links)
- [ ] Google Console: YouTube + ImgBB API keys → HTTP Referrer restriction
- [ ] Delete `BCADepartmentPage.jsx`

### 🟢 Data Population
- [ ] Admin → Leadership → Add Presidents / Secretaries / Principals
- [ ] Admin → Pages & SEO → Committee pages (path exact match!)
- [ ] Admin → Departments → All 5 slugs
- [ ] Admin → Contact Settings → Real director names
- [ ] Admin → Site Settings → Real ImgBB key

---

## 13. VITE CONFIG

```js
base: '/gncollege-website/'
minify: 'terser'
drop_console: true   // prod only
sourcemap: false
manualChunks: {
  'vendor-react':    ['react','react-dom','react-router-dom'],
  'vendor-firebase': ['firebase/app','firebase/firestore','firebase/auth'],
  'vendor-ui':       ['dompurify','html-react-parser','react-hot-toast'],
}
chunkSizeWarningLimit: 500
```

---

## 14. ROUTING — CRITICAL RULES

```js
// ✅ HashRouter — correct navigation
navigate('/admin')
window.open(`${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/,'')}/#/admin`, '_blank')
scrollIntoView({ behavior: 'smooth' })
href="/#gallery"

// ❌ Never
window.open('#/admin')
href="#gallery"
```

**ErrorBoundary on every route — required:**
```jsx
<Route path="/x" element={<ErrorBoundary><MyPage /></ErrorBoundary>} />
```

---

## 15. DESIGN SYSTEM

- **Aesthetic:** Flat 2.0 / Apple / Vercel
- **Shadows:** max `0 2px 8px rgba(0,0,0,0.06)`
- **Borders:** `1px solid ${COLORS.border}`
- **Fonts:** `'Plus Jakarta Sans'` / `'DM Sans'` (body), `'JetBrains Mono'` (code)
- **Heading weight:** 800–900, Body: 400–500, Label: 600–700
- **Breakpoints:** SM:480, MD:768, LG:1024, XL:1280
- **Section padding:** `80px 0` desktop / `40px 0` mobile
- **Card padding:** `24px` desktop / `16px` mobile
- **Max width:** 1200px standard / 1300px wide / 1000px narrow

---

## 16. TESTING CHECKLIST

- [ ] `npm run build` no errors
- [ ] No `console.error` in browser
- [ ] Firestore reads in `try/catch`
- [ ] `useEffect` subscriptions return cleanup
- [ ] Images have `onError` fallback
- [ ] HTML from Firestore → `DOMPurify.sanitize()`
- [ ] New features → System Test phase
- [ ] Mobile responsive (375px + 768px)
- [ ] MediaPicker for uploads (no `<input type="file">`)
- [ ] No `#/admin` hash routing
- [ ] `COLORS.*` used (no hardcoded hex)
- [ ] `COLLECTIONS.*` used (no hardcoded strings)
- [ ] Admin modals → `createPortal(modal, document.body)`

---

## 17. HOW TO ADD A NEW FEATURE

### New Public Page
1. `src/pages/NewPage.jsx`
2. Route in `App.jsx` with `<ErrorBoundary>`
3. `COLORS`, `COLLECTIONS`, `FALLBACK_IMAGE` from constants
4. `onSnapshot` + `try/catch` + cleanup
5. System Test phase

### New Admin Tab
1. Add to `TABS` array (outside component)
2. State + handlers in `AdminPanelInner`
3. JSX `{tab === 'tabid' && (...)}`
4. `MediaPicker` for images/PDFs
5. `logAct()` for mutations
6. `softDelete()` not `deleteDoc()`
7. **Modals → `createPortal(modal, document.body)`**
8. System Test phase

### New Firestore Collection
1. Add to `COLLECTIONS` in `constants.js`
2. Schema in CLAUDE.md Section 3
3. Firestore security rule
4. System Test phase
5. Admin tab

---

## 18. KNOWN BUGS (Permanent Reference)

| # | Location | Bug | Fix |
|---|----------|-----|-----|
| B1 | App.jsx | Static dept routes → `useParams()` returned `{}` | 5 routes → 1 `:deptSlug` |
| B2 | App.jsx | Dept paths in `placeholderPaths` | Removed |
| B3 | App.jsx | `window.open('#/admin')` | → proper URL construction |
| B4 | HeroSlider.jsx | `FALLBACK` inside component | Moved outside |
| B5 | AlertBanner.jsx | `dismissed` stale closure | → `useRef` |
| B6 | AlertBanner.jsx | `setTimeout` leak | → `useRef` + `clearTimeout` |
| B7 | VideoGallery.jsx | `fetchVideos` → infinite loop | → `useCallback` |
| B8 | NewsPage.jsx | Raw HTML | → DOMPurify both views |
| B9 | NewsPage.jsx | Search checked wrong field | → `n.type` |
| B10 | PageViewer.jsx | No `orderBy` | → `orderBy('createdAt','desc')` |
| B11 | DepartmentPage.jsx | Faculty race condition | → `resolvedRef` Set |
| B12 | DepartmentPage.jsx | `semTab` not reset on slug change | → `setSem(null)` |
| B13 | DepartmentPage.jsx | `href="#faculty"` breaks Router | → `scrollIntoView()` |
| B14 | DepartmentPage.jsx | Unused `orderBy` import | Removed |
| B15 | AdminDepartmentTab.jsx | `window.prompt` | → `InlinePrompt` |
| B16 | AdminDepartmentTab.jsx | Firebase Storage | → MediaPicker + ImgBB |
| B17 | AdminPanel.jsx | Gallery category mismatch | → `GALLERY_CATEGORIES` |
| B18 | AdminPanel.jsx | Delete toast raw HTML | → DOMPurify |
| B19 | LeadershipPage.jsx | `where + orderBy` composite index error | → client-side sort |
| B20 | App.jsx | Leadership paths in `placeholderPaths` | → Removed, added proper routes |
| B21 | App.jsx | `pageContentByPath.get()` → `undefined` → standalone mode | → `?? null` + `pagesLoaded` |
| B22 | PageViewer.jsx | `page !== undefined` check broke rendering | → loading prop, direct render |
| B23 | AdminLeadershipTab.jsx | Modal broken by AdminPanel `transform` CSS | → `createPortal(modal, document.body)` |
| B24 | AdminLeadershipTab.jsx | Photo preview flicker on typing | → debounced `previewUrl` (800ms), `onError → display:none` |
| B25 | AdminPanel.jsx | Jodit `height:280` fixed, not resizable | → `height:420`, `allowResizeY:true` |
| B26 | AdminPanel.jsx | Preview modal no CSS → tables plain | → `.prev-prose` full CSS |

---

## 19. QUICK REFERENCE — FILE PATHS

| What | Path |
|------|------|
| Colors | `src/styles/colors.js` or `src/constants.js` |
| College info | `src/constants.js` → `COLLEGE` |
| Firebase | `src/firebase.js` |
| Static nav | `src/data/db.js` |
| Fallback image | `public/images/college_photo.jpg` |
| Leadership page | `src/pages/LeadershipPage.jsx` |
| Leadership admin | `src/components/AdminLeadershipTab.jsx` |
| Dept hub | `/academics/departments` |
| Admin | `/admin` |
| MediaPicker | `src/components/MediaPicker.jsx` |
| ImgBB key | Firestore: `settings/site.imgbbKey` |

---

## 20. ENVIRONMENT & DEPLOYMENT

```bash
npm run dev       # localhost:5173
npm run build     # /dist
npm run preview   # preview build
npm run deploy    # → GitHub Pages
```

**Base URL:** `base: '/gncollege-website/'` in vite.config.js

Public assets in prod: `/gncollege-website/images/...`

---

*Last updated: March 12, 2026 — Session: LeadershipPage.jsx (new), AdminLeadershipTab.jsx (new), App.jsx pagesLoaded + leadership routes, PageViewer loading prop, AdminPanel Jodit resizable + preview gnc-prose. Bugs B1–B26 documented.*