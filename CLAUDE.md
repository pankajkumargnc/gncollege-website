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
| Router | React Router DOM (HashRouter / BrowserRouter with base `/gncollege-website/`) |
| Rich Text | jodit-react |
| Sanitization | DOMPurify |
| Notifications | react-hot-toast |
| Animations | AOS (Animate On Scroll) |

---

## 1. PROJECT STRUCTURE

```
gncollege-website/
├── public/
│   ├── images/               ← College photos, logos, fallback images
│   │   ├── college_photo.jpg ← DEFAULT FALLBACK IMAGE (always exists)
│   │   ├── logo.png
│   │   ├── principal.jpg
│   │   ├── vice_principal.jpg
│   │   ├── naac.png
│   │   ├── bbmku.png
│   │   ├── ugc.png
│   │   ├── campus1.jpg
│   │   ├── campus2.jpg
│   │   ├── library.jpg
│   │   ├── lab.jpg
│   │   └── seminar.jpg
│   └── pdfs/                 ← Static PDFs (prospectus, syllabus, forms)
│       ├── prospectus.pdf
│       ├── syllabus.pdf
│       ├── fee-structure.pdf
│       └── admission-form.pdf
│
├── src/
│   ├── App.jsx               ← Root component, all routes, ErrorBoundary wrapper
│   ├── firebase.js           ← Firebase init — exports: db, auth (NO storage)
│   ├── constants.js          ← Central constants (COLORS, COLLEGE, COLLECTIONS, enums)
│   │
│   ├── styles/
│   │   └── colors.js         ← COLORS object (import from here OR from constants.js)
│   │
│   ├── data/
│   │   └── db.js             ← Static data: navLinks, SOCIAL_LINKS, static content
│   │
│   ├── pages/                ← Public-facing pages
│   │   ├── HomePage.jsx
│   │   ├── Contact.jsx
│   │   ├── CollegeProfile.jsx
│   │   ├── NotificationsPage.jsx
│   │   ├── DocumentsPage.jsx
│   │   ├── EventsPage.jsx
│   │   ├── NewsPage.jsx
│   │   ├── VideoGallery.jsx
│   │   ├── DepartmentPage.jsx ← Universal template (all 5 depts + hub)
│   │   └── StaffPage.jsx
│   │
│   └── components/           ← Reusable components + Admin Panel
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       ├── TopBar.jsx
│       ├── Breadcrumbs.jsx
│       ├── AlertBanner.jsx
│       ├── ErrorBoundary.jsx
│       ├── HeroSlider.jsx
│       ├── PlacementsSection.jsx
│       ├── NotificationSection.jsx
│       ├── HomeFeatures.jsx
│       ├── QuickActionNav.jsx
│       ├── PageViewer.jsx
│       ├── Ticker.jsx (lazy)
│       ├── ImageCropper.jsx (lazy)
│       ├── MediaPicker.jsx    ← Universal image/pdf picker (ImgBB + local + URL)
│       ├── AdminLogin.jsx
│       ├── AdminPanel.jsx     ← Main admin panel (lazy loaded)
│       └── AdminDepartmentTab.jsx ← Departments tab (lazy loaded inside AdminPanel)
│
├── vite.config.js             ← Terser minification, chunks, no sourcemaps
├── CLAUDE.md                  ← THIS FILE
└── package.json
```

---

## 2. FIREBASE CONFIGURATION

### `src/firebase.js` — Required Exports
```js
import { initializeApp } from 'firebase/app';
import { getFirestore }  from 'firebase/firestore';
import { getAuth }       from 'firebase/auth';
// NOTE: getStorage is NOT used — we use ImgBB instead

const firebaseConfig = { /* project config */ };
const app = initializeApp(firebaseConfig);

export const db   = getFirestore(app);
export const auth = getAuth(app);
// export const storage = getStorage(app); // NOT NEEDED — ImgBB use hota hai
```

### ⚠️ Critical: No Firebase Storage
- **Storage = ImgBB only.** Firebase Storage kabhi mat use karo.
- `AdminDepartmentTab.jsx` mein `firebase/storage` import NAHI hai.
- PDF files → Google Drive public link ya `public/pdfs/` local path.
- Images → ImgBB API (key Settings tab se configurable).

---

## 3. ALL FIRESTORE COLLECTIONS

### Collections Map

| Collection | Purpose | Key Fields |
|------------|---------|-----------|
| `notices` | Notice board posts | `text, type, link, isNew, pinned, createdAt` |
| `announcements` | News & updates | `text, type, link, createdAt` |
| `events` | College events | `title, desc, day, month, type, location, status, imageUrl, reportLink, date` |
| `gallery` | Photo gallery | `title, cat, src, createdAt` |
| `placements` | Alumni Wall of Fame | `name, year, company, package, imageUrl, dept, achievement, createdAt` |
| `pdfReports` | Document archive | `title, type, link, targetPage, createdAt` |
| `faculties` | Teaching + Non-Teaching staff | `name, staffType, dept, qual, desig, imageUrl, email, specialization, createdAt` |
| `sliderSlides` | Hero slider images | `title, subtitle, btnText, btnLink, image, order, createdAt` |
| `pages` | Dynamic CMS pages | `title, slug, path, content, metaDesc, isLive, createdAt` |
| `alerts` | Flash alert banner | `text, type, isActive, link, createdAt` |
| `departments` | Dept page data | See schema below |
| `contactDirectory` | Contact page directors list | `icon, title, name, phone, order` |
| `adminLogs` | Admin activity log | `action, message, section, time` |
| `_sysTest` | System test write check | `test, time` |

### Settings Documents (collection: `settings`)

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
  fullName:       "Bachelor of Computer Applications",
  short:          "BCA",
  tagline:        "Code. Create. Conquer.",
  about:          "Department description...",
  vision:         "Vision statement...",
  mission:        "Mission statement...",

  hod: {
    name:         "Prof. Name",
    desig:        "Head of Department, BCA",
    qual:         "M.Sc. (CS), Ph.D.",
    email:        "hod.bca@gncollege.org",
    phone:        "+91 XXXXX XXXXX",
    message:      "Welcome message...",
    imageUrl:     "https://..."   // ImgBB URL ya public/ path
  },

  stats: [
    { icon: "📅", value: "3 Years", label: "Duration", sub: "6 Semesters" }
  ],

  highlights: [
    { icon: "💻", title: "Modern Labs", desc: "60+ high-end systems..." }
  ],

  facilities: [
    { icon: "🖥️", name: "Computer Lab", desc: "60 workstations, Wi-Fi..." }
  ],

  curriculum: {
    "Semester I":  ["Subject 1", "Subject 2"],
    "Semester II": ["Subject 3", "Subject 4"]
  },

  feeStructure: [
    { category: "Tuition Fee", amount: "15000", note: "Per semester" }
  ],

  programReports: [
    { id: "abc123", title: "Annual Report 2024", year: "2024", pdfUrl: "https://..." }
  ],

  achievements: [
    "100+ students placed since 2020"
  ],

  updatedAt: serverTimestamp()
}
```

---

## 4. REACT ROUTES (App.jsx)

### Public Routes

| Path | Component | Notes |
|------|-----------|-------|
| `/` | `HomePage` | AOS animations, all sections |
| `/contact` | `Contact` | Firebase `settings/contact` + `contactDirectory` |
| `/about-us/college-profile` | `CollegeProfile` | Static content |
| `/notifications` | `NotificationsPage` | `notices` collection |
| `/documents` | `DocumentsPage` | `pdfReports` collection |
| `/events` | `EventsPage` | `events` collection |
| `/news` | `NewsPage` | `announcements` collection + DOMPurify |
| `/video-gallery` | `VideoGallery` | YouTube API (`settings/youtube`) |
| `/about-us/college-staff/teaching-staff` | `StaffPage` | `faculties` where staffType=Teaching |
| `/about-us/college-staff/non-teaching-staff` | `StaffPage` | `faculties` where staffType=Non-Teaching |
| `/gallery` | PhotoGalleryPage | `gallery` collection |
| `/academics/departments` | `DepartmentPage` | Hub page (no slug) |
| `/academics/departments/:deptSlug` | `DepartmentPage` | Individual dept (`bca`, `bba`, `commerce`, `humanities`, `social-science`) |
| `/p/:slug` | `DynamicPageRoute` | CMS pages from `pages` collection |
| `/admin` | `AdminPanel` (lazy) | Auth-protected |

### Placeholder Routes
50+ static paths that render `PageViewer` with content from `pdfReports` collection:
`/syllabus`, `/about-us`, `/about-us/vision-mission`, `/naac/*`, `/admission/*`, `/activity/*`, etc.

**⚠️ RULE:** Department paths (`/academics/departments/bca` etc.) are NOT in `placeholderPaths`. They use the `:deptSlug` param route.

---

## 5. CENTRAL CONSTANTS (constants.js)

**ALWAYS import from `constants.js`. Never hardcode values.**

```js
import {
  COLLEGE,         // College info, addresses, social links
  COLORS,          // All UI colors
  LAYOUT,          // MAX_WIDTH, MAX_WIDTH_WIDE, MAX_WIDTH_NARROW
  BP,              // Breakpoints: SM(480), MD(768), LG(1024), XL(1280)
  MONTHS_SHORT,    // ['Jan','Feb',...,'Dec']
  MONTHS_FULL,     // ['January','February',...,'December']
  getTS,           // Firestore timestamp → Date helper
  fmtDate,         // Format date for display
  COLLECTIONS,     // Firestore collection name strings
  FALLBACK_IMAGE,  // '/images/college_photo.jpg'
  GALLERY_CATEGORIES, // ['Seminars','Cultural Fest','Guest Visit','NSS Programs','Sports','Campus','Departments']
  DOC_TYPES,       // ['Document','Report','Syllabus','Circular','Result','Regulation','Affiliation']
  EVENT_TYPES,     // ['WORKSHOP','SEMINAR','CULTURAL','SPORTS','NSS','NCC','ACADEMIC']
  NOTICE_CATEGORIES, // ['General','Examination','Admission','Holiday','Sports','Cultural','Academic']
  NEWS_TYPES,      // ['News','Achievement','Update','Result','Scholarship']
  DEPARTMENTS,     // All teaching/non-teaching dept names
  ANIM,            // Animation durations: FAST, NORMAL, SLOW, TICKER, BANNER
} from '../constants';
```

### COLORS Object
```js
COLORS = {
  navy:      '#0f2347',   // Primary — all headings, buttons
  navyDark:  '#060e1c',   // Sidebar, deep backgrounds
  navyLight: '#1a3a7c',   // Hover states, gradients
  gold:      '#f4a023',   // Accent — CTA buttons, highlights
  goldDark:  '#d4870e',   // Gold hover
  goldLight: '#fff8ed',   // Gold background tint
  red:       '#c0392b',   // Danger, delete
  white:     '#ffffff',
  lightGray: '#f8f9fa',
  gray:      '#6c757d',
  dark:      '#212529',
  green:     '#27ae60',
  text:      '#334155',   // Body text
  textMid:   '#64748b',   // Secondary text
  textLight: '#94a3b8',   // Placeholders, muted
  border:    '#e2e8f0',   // Borders
  bg:        '#f8fafc',   // Page backgrounds
}
```

---

## 6. COMPONENT REFERENCE

### Public Pages

#### `HomePage.jsx`
- Sections: TopBar → Navbar → HeroSlider → AlertBanner → QuickActionNav → NotificationSection → HomeFeatures → PlacementsSection → VideoGallery → Footer
- AOS animations on section entrance
- Departments section with 5 dept cards
- Gallery link: `'/#gallery'` (with hash, not `'#gallery'`)

#### `DepartmentPage.jsx` — Universal Template
- **Single file handles ALL 5 departments + hub page**
- Uses `useParams()` → `deptSlug` to identify department
- Reads from `departments/{slug}` Firestore document
- Faculty from `faculties` collection filtered by `dept` field
- Color themes per department:
  | Slug | Color |
  |------|-------|
  | `bca` | `#0ea5e9` (sky blue) |
  | `bba` | `#f59e0b` (amber) |
  | `commerce` | `#10b981` (emerald) |
  | `humanities` | `#8b5cf6` (violet) |
  | `social-science` | `#ef4444` (red) |
- CTA buttons use `scrollIntoView({ behavior: 'smooth' })` — NOT `href="#section"` (React Router breaks hash links)
- `resolvedRef` Set prevents faculty race condition

#### `Contact.jsx`
- Firebase connected: reads `settings/contact` and `contactDirectory` collection
- `contactDirectory` ordered by `order` field (ascending)
- DOMPurify on any HTML content

#### `NewsPage.jsx`
- DOMPurify on BOTH list view AND detail view
- Search checks `n.type` before filtering

#### `VideoGallery.jsx`
- `fetchVideos` wrapped in `useCallback` (prevents infinite re-renders)
- YouTube API key from `settings/youtube`

#### `StaffPage.jsx`
- Receives `staffType` prop: `'Teaching'` or `'Non-Teaching'`
- Filter `faculties` collection by `staffType` field

### Components

#### `HeroSlider.jsx`
- `FALLBACK` array defined OUTSIDE component (not inside — avoids recreation on every render)
- Reads from `sliderSlides` collection, sorted by `order`

#### `AlertBanner.jsx`
- `dismissed` ref prevents stale closure
- `setTimeout` cleanup via `useRef` on unmount
- Popup `useEffect` separated from main effect

#### `NotificationSection.jsx`
- ⚠️ PENDING FIX: RAF (requestAnimationFrame) memory leak in 3 useEffects — event listeners never removed

#### `PlacementsSection.jsx`
- Alumni Wall of Fame — marquee/ticker layout
- Fallback: `/images/college_photo.jpg`

#### `ErrorBoundary.jsx`
- Class component (error boundaries must be class-based in React)
- Per-page error messages based on `window.location.pathname`
- `minimal` prop for AlertBanner (renders compact fallback)
- Wraps ALL routes in `App.jsx`

#### `MediaPicker.jsx` — NEW (v2 upload system)
**Universal media picker — use this EVERYWHERE for photo/PDF upload.**

```jsx
import MediaPicker, { setImgbbKey } from './MediaPicker';

// In settings load useEffect:
setImgbbKey(siteCfg.imgbbKey);

// Usage:
<MediaPicker
  label="Profile Photo"
  value={data.imageUrl}
  onChange={url => setData(d => ({ ...d, imageUrl: url }))}
  type="image"     // 'image' | 'pdf' | 'any'
  compact={false}  // compact mode for tight UIs
/>
```

**3 Modes:**
1. `📤 PC se Upload` — File select → ImgBB API → permanent URL (images only)
2. `🗂️ Public Folder` — Grid of presets from `public/images/` or `public/pdfs/` + custom path input
3. `🔗 Paste URL` — Direct URL input + clipboard paste button

**Key behavior:**
- ImgBB key set via `setImgbbKey()` — loaded from `settings/site.imgbbKey`
- Module-level `_imgbbKey` variable
- PDFs cannot go to ImgBB — shows Google Drive guidance
- Progress bar for uploads

#### `PageViewer.jsx`
- Reads `pdfReports` collection with `orderBy('createdAt', 'desc')`
- `pdfLink` fix applied

### Admin Components

#### `AdminLogin.jsx`
- Premium rebuild — glassmorphism design
- Firebase Auth: `signInWithEmailAndPassword`

#### `AdminPanel.jsx`
- **20 tabs total** (see list below)
- Lazy loaded in App.jsx
- `AdminDepartmentTab` lazy loaded inside AdminPanel
- `useLocalDraft` hook for form persistence (localStorage)
- `crop` function for image cropping before upload
- `softDelete` → moves to `_deleted_{collection}` subcollection
- `bulkDelete` → batch delete with WriteBatch
- `logAct` → writes to `adminLogs` collection
- `TABS` array defined OUTSIDE component (never recreate)
- ImgBB key: loaded from `settings/site.imgbbKey` → `setImgbbKey(key)` called in settings useEffect
- `DOMPurify.sanitize()` on announcements delete toast

**Admin Tabs:**

| Tab ID | Icon | Label | Firebase Source |
|--------|------|-------|----------------|
| `dashboard` | 📊 | Dashboard | All collections (stat cards) |
| `quick` | ⚡ | Quick Publish | `events`, `notices`, `announcements` |
| `alerts` | 🚨 | Flash Alerts | `alerts` |
| `placements` | 🎓 | Alumni Wall | `placements` |
| `faculty` | 👨‍🏫 | Faculty & Staff | `faculties` |
| `departments` | 🏛️ | Departments | `departments/{slug}` (lazy: AdminDepartmentTab) |
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
| `backup` | 💾 | Backup & Restore | All collections |
| `system_test` | 🛡️ | System Test | Health checks |

**MediaPicker locations in AdminPanel:**
1. Alumni Wall — Student Photo (`type="image"`)
2. Faculty & Staff — Profile Photo (`type="image"`)
3. Hero Slider — Background Image (`type="image"`)
4. Gallery — Gallery Photo (`type="image"`)
5. Events → Post-Event Photo (`type="image"`, `compact=true`)
6. Events → PDF Report Link (`type="pdf"`, `compact=true`)
7. Notices → Link (`type="pdf"`, `compact=true`)
8. News → Link (`type="any"`, `compact=true`)
9. Documents → PDF Link (`type="pdf"`, `compact=true`)

#### `AdminDepartmentTab.jsx`
- Standalone component, lazy loaded into AdminPanel
- Reads/writes `departments/{slug}` documents
- **NO Firebase Storage** — uses MediaPicker for HOD photo, PdfManager for reports
- `PdfManager` component: Google Drive link or `public/pdfs/` path
- `InlinePrompt` component: replaces `window.prompt` for Semester/Subject input
- `useRef` timer cleanup on unmount (no memory leaks)
- Sticky Save button with `position: sticky; bottom: 0`

---

## 7. SYSTEM TEST SUITE (17 Phases)

Located in `AdminPanel.jsx` → `system_test` tab.

**When adding a new major feature or collection: ADD a new phase here.**

| Phase | Test | Logic |
|-------|------|-------|
| T1 | Vite Build Env | `import.meta.env.MODE` check |
| T2 | Firebase Init | `db` object exists |
| T3 | Firestore Read | `getDocs(_sysTest)` |
| T4 | Firestore Write | `addDoc(_sysTest, {test:true})` |
| T5 | Firestore Delete | delete the T4 doc |
| T6 | Navbar Settings | `settings/navbar` exists |
| T7 | Site Settings | `settings/site` exists |
| T8 | ImgBB API | POST to `api.imgbb.com` with 1x1 PNG |
| T9 | Flash Alerts | `alerts` collection readable |
| T10 | Faculty Directory | `faculties` readable |
| T11 | Alumni Placements | `placements` readable |
| T12 | Content Health | notices + announcements + events + pdfReports all readable |
| T13 | YouTube API | `settings/youtube` apiKey check |
| T14 | Google Drive | `settings/drive` config check |
| T15 | Activity Logging | `adminLogs` write + read |
| T16 | Department Data | 5 slugs in `departments/{slug}` — HOD set, fee structure exists |
| T17 | Contact Settings | `settings/contact` + `contactDirectory` |

**Format for new phase:**
```js
sysLogAdd('[18/18] Checking new feature...');
try {
  // check logic
  addResult('Feature Name', 'pass', 'Details');
  passed++;
  sysLogAdd('  ✓ Working');
} catch (e) {
  addResult('Feature Name', 'fail', e.message);
  failed++;
  sysLogAdd('  ✗ ' + e.message);
}
total++;
// Update [X/18] in all previous labels and header badges
```

---

## 8. CODING RULES (STRICTLY FOLLOW)

### React Rules
```js
// ✅ Always functional components + hooks
const MyComponent = () => {
  const [data, setData] = useState(null);
  useEffect(() => { /* fetch */ }, []);
  return <div />;
};

// ✅ Constants/config OUTSIDE component (avoid recreation)
const CONFIG = { ... };   // outside
export default function MyComponent() { /* use CONFIG */ }

// ✅ Cleanup in useEffects
useEffect(() => {
  const timer = setTimeout(() => {}, 1000);
  return () => clearTimeout(timer);
}, []);

// ✅ useCallback for functions passed as deps
const fetchData = useCallback(async () => { ... }, [dependency]);
```

### Firebase Rules
```js
// ✅ Always try/catch
try {
  const snap = await getDoc(doc(db, 'settings', 'site'));
  if (snap.exists()) setData(snap.data());
} catch (err) {
  console.error(err);
}

// ✅ onSnapshot for real-time, getDoc for one-time
const unsub = onSnapshot(collection(db, 'notices'), snap => {
  setNotices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
});
return () => unsub(); // ALWAYS cleanup

// ✅ serverTimestamp for time fields
await addDoc(collection(db, 'collection'), {
  ...data,
  createdAt: serverTimestamp(),
});

// ✅ Use COLLECTIONS constants (never hardcode strings)
import { COLLECTIONS } from '../constants';
collection(db, COLLECTIONS.NOTICES)   // not collection(db, 'notices')
```

### Styling Rules
```js
// ✅ Use COLORS (never hardcode hex values)
import { COLORS } from '../constants';
const style = { color: COLORS.navy, background: COLORS.gold };

// ✅ Responsive with media queries
const styles = `
  @media (max-width: 768px) {
    .container { flex-direction: column; }
  }
`;

// ✅ Flat 2.0 aesthetic — no card shadows, clean borders
border: `1px solid ${COLORS.border}`   // ✅
boxShadow: '0 20px 60px rgba(0,0,0,0.3)'  // ❌ too heavy
```

### Security Rules
```js
// ✅ DOMPurify on ALL HTML from Firestore
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />

// ❌ Never render raw HTML without sanitization
<div dangerouslySetInnerHTML={{ __html: content }} />  // WRONG
```

### Image Rules
```js
// ✅ Always provide fallback
<img
  src={item.imageUrl || FALLBACK_IMAGE}
  onError={e => { e.target.src = FALLBACK_IMAGE; }}
  alt="description"
/>

// FALLBACK_IMAGE = '/images/college_photo.jpg'
```

### MediaPicker Rules
```js
// ✅ ALWAYS use MediaPicker for photo/PDF inputs
<MediaPicker
  label="Photo"
  value={data.imageUrl}
  onChange={url => setData(d => ({ ...d, imageUrl: url }))}
  type="image"
/>

// ❌ Never create plain <input type="file"> for uploads
// ❌ Never use Firebase Storage (getStorage, uploadBytes, getDownloadURL)
```

---

## 9. MEDIA / IMAGE STRATEGY

### Free Stack (No Paid Services)
| Type | How | Where |
|------|-----|-------|
| Photos | ImgBB API upload | `https://api.imgbb.com/1/upload?key={KEY}` |
| PDFs | Google Drive public link | User pastes URL |
| Static assets | `public/images/` | Direct path `/images/file.jpg` |
| Static PDFs | `public/pdfs/` | Direct path `/pdfs/file.pdf` |

### ImgBB Setup
1. Admin → Site Settings → ImgBB API Key field
2. Key saved to `settings/site.imgbbKey`
3. `AdminPanel.jsx` loads key → calls `setImgbbKey(key)` from `MediaPicker.jsx`
4. All MediaPicker instances use this key automatically

### Google Drive PDF
1. Upload PDF to Google Drive
2. Share → "Anyone with the link" → Copy link
3. Paste in MediaPicker URL mode
4. Format: `https://drive.google.com/file/d/{ID}/view?usp=sharing`

---

## 10. DEPARTMENT SYSTEM

### 5 Departments
| Page | Slug | Color | Faculty `dept` value |
|------|------|-------|---------------------|
| BCA | `bca` | `#0ea5e9` | `BCA` |
| BBA | `bba` | `#f59e0b` | `BBA` |
| Commerce | `commerce` | `#10b981` | `Commerce` |
| Humanities | `humanities` | `#8b5cf6` | `Hindi` or `English` |
| Social Science | `social-science` | `#ef4444` | `History` or `Political Science` or `Economics` |

### Routes
```jsx
<Route path="/academics/departments"          element={<DepartmentPage />} />
<Route path="/academics/departments/:deptSlug" element={<DepartmentPage />} />
```
**⚠️ These paths must NOT be in `placeholderPaths` array in App.jsx.**

### Adding New Department
1. Add entry to `DEPTS` array in `DepartmentPage.jsx`
2. Add entry to `DEPTS` array in `AdminDepartmentTab.jsx`
3. Add route if using custom slug
4. Populate `departments/{slug}` document via Admin Panel

---

## 11. ADMIN PANEL — KEY PATTERNS

### `useLocalDraft` Hook
Persists form state in localStorage — survives page refresh.
```js
const [data, setData, clearDraft] = useLocalDraft('fac', {
  name: '', dept: 'Commerce', imageUrl: '', /* etc */
});
// clearDraft() called after successful save
```

### `softDelete` Pattern
```js
// Moves deleted item to _deleted_collectionName subcollection
// Never permanently deletes — restorable from Backup tab
softDelete('faculties', faculty.id, faculty, faculty.name);
```

### `logAct` Pattern
```js
// Writes to adminLogs collection
logAct('add',    'Placement: John Doe', 'placements');
logAct('update', 'Slide: Welcome',      'sliderSlides');
logAct('delete', 'Notice: Exam Alert',  'notices');
```

### Contact Settings Tab
- Campus section: `settings/contact` → `{ bhuda, bankMore }` each with `{ phone, email, address }`
- Directory section: `contactDirectory` collection → `writeBatch` (delete-all + re-add pattern)
- `useRef` timer cleanup on unmount

---

## 12. PENDING FIXES (Must do before production)

> Ye sab issues detected hain. Naya code likhte waqt in par dhyan rakhna.

### 🔴 Critical
- [ ] `colors.js`: navy → `#0f2347`, navyDark → `#060e1c` (was wrong before)
- [ ] `firebase.js`: Confirm `storage` export removed (we use ImgBB now)
- [ ] Firestore Security Rules: Verify public write blocked
  ```js
  match /departments/{slug} { allow read: if true; allow write: if request.auth != null; }
  match /contactDirectory/{id} { allow read: if true; allow write: if request.auth != null; }
  match /settings/{doc} { allow read: if true; allow write: if request.auth != null; }
  ```

### 🟡 Important
- [ ] `db.js`: Gallery link `'#gallery'` → `'/#gallery'`
- [ ] `db.js`: Update `SOCIAL_LINKS` with real GNC Facebook/Twitter/YouTube URLs
- [ ] `Footer.jsx`: Newsletter button — add handler or remove input
- [ ] `NotificationSection.jsx`: Fix RAF memory leak — 3 useEffects never remove event listeners
- [ ] `AdminPanel.jsx` Gallery tab: Categories must match `GALLERY_CATEGORIES` from constants.js
- [ ] `NotificationsPage.jsx`: Month filter pills missing from JSX + DOMPurify on content
- [ ] Navbar: Add Academics → Departments submenu with 5 dept links
- [ ] Google Console: YouTube + ImgBB API keys — add HTTP Referrer restriction
- [ ] Delete `BCADepartmentPage.jsx` (replaced by universal `DepartmentPage.jsx`)

### 🟢 Data Population (one-time)
- [ ] Admin → Departments tab → Populate all 5 department documents
- [ ] Admin → Contact Settings → Add real director names to contactDirectory
- [ ] Admin → Site Settings → Add real ImgBB API key
- [ ] Admin → Faculty tab → Add real faculty with `dept` field matching table above

---

## 13. VITE CONFIG (vite.config.js)

```js
// Key settings:
minify: 'terser'                  // Production only
drop_console: true                // All console.log removed in build
drop_debugger: true               // All debugger; removed
sourcemap: false                  // No source maps (security)
manualChunks: {
  'vendor-react':    ['react','react-dom','react-router-dom'],
  'vendor-firebase': ['firebase/app','firebase/firestore','firebase/auth'],
  'vendor-ui':       ['dompurify','html-react-parser','react-hot-toast'],
}
chunkSizeWarningLimit: 500        // 500KB warning threshold
```
Development mein `console.log` kaam karta hai — sirf `npm run build` pe remove hota hai.

---

## 14. ROUTING — CRITICAL RULES

### ❌ Hash-based Navigation (Never Use)
```js
// ❌ WRONG — React Router ke saath breaks
window.open('#/admin')
href="#gallery"
<button onClick={() => window.location.href = '#/admin'} />
```

### ✅ Correct Navigation
```js
// ✅ Correct
window.open('/admin', '_blank')
href="/#gallery"
navigate('/admin')
scrollIntoView({ behavior: 'smooth' })  // for same-page anchor links
```

### ErrorBoundary Wrapping (Required)
```jsx
// Every Route must be wrapped
<Route path="/contact" element={
  <ErrorBoundary>
    <Contact />
  </ErrorBoundary>
} />
```

---

## 15. DESIGN SYSTEM

### Aesthetic: Flat 2.0 / Apple / Vercel
- **No heavy shadows** (max `0 2px 8px rgba(0,0,0,0.06)`)
- **Thin borders** (`1px solid ${COLORS.border}`)
- **Generous white space**
- **Bold typography** for headings (font-weight: 800-900)
- **Smooth transitions** (`transition: all 0.2s ease`)
- **Borderless tables** where possible

### Typography
- Primary font: `'Plus Jakarta Sans'` or `'DM Sans'`
- Monospace (code/keys): `'JetBrains Mono'`
- Heading weight: 800-900
- Body weight: 400-500
- Caption/label weight: 600-700

### Responsive Breakpoints
```js
BP = {
  SM: 480,   // Mobile
  MD: 768,   // Tablet
  LG: 1024,  // Desktop
  XL: 1280,  // Wide desktop
}
```

### Spacing System
- Section padding: `80px 0` (desktop), `40px 0` (mobile)
- Card padding: `24px` (desktop), `16px` (mobile)
- Grid gap: `24px` (desktop), `16px` (mobile)
- Max width: `1200px` (standard), `1300px` (wide), `1000px` (narrow)

---

## 16. TESTING CHECKLIST (Before any PR/commit)

- [ ] `npm run build` completes without errors
- [ ] No `console.error` in browser dev tools
- [ ] All Firestore reads wrapped in `try/catch`
- [ ] All `useEffect` with subscriptions return cleanup function
- [ ] All images have `onError` fallback to `FALLBACK_IMAGE`
- [ ] All HTML from Firestore passes through `DOMPurify.sanitize()`
- [ ] New features have System Test phase added (AdminPanel → system_test tab)
- [ ] Mobile responsive (check at 375px and 768px widths)
- [ ] MediaPicker used for all photo/PDF inputs (no plain `<input type="file">`)
- [ ] No `#/admin` style hash routing
- [ ] `COLORS.*` used (no hardcoded hex values)
- [ ] `COLLECTIONS.*` used (no hardcoded collection name strings)

---

## 17. HOW TO ADD A NEW FEATURE (Checklist)

### New Public Page
1. Create `src/pages/NewPage.jsx`
2. Add route in `App.jsx` with `<ErrorBoundary>` wrapper
3. Import and use `COLORS`, `COLLECTIONS`, `FALLBACK_IMAGE` from constants
4. If data from Firestore → use `onSnapshot` + `try/catch` + cleanup
5. If new collection needed → add to `COLLECTIONS` in `constants.js`
6. Add System Test phase in `AdminPanel.jsx`

### New Admin Tab
1. Add `{ id: 'tabid', icon: '🎯', label: 'Tab Name', section: '' }` to `TABS` array
2. Add state + Firebase handlers in `AdminPanelInner`
3. Add JSX section `{tab === 'tabid' && (...)}`
4. Use `MediaPicker` for any image/PDF fields
5. Use `logAct()` for all add/update/delete actions
6. Use `softDelete()` not `deleteDoc()` directly
7. Add System Test phase

### New Firestore Collection
1. Add to `COLLECTIONS` in `constants.js`
2. Define schema in this CLAUDE.md (Section 3)
3. Add Firestore security rule
4. Add System Test phase in AdminPanel
5. Create Admin tab (or add fields to existing tab)

---

## 18. KNOWN BUGS (Permanent Reference)

> These bugs were found and fixed during development. DO NOT reintroduce them.

| # | Location | Bug | Fix Applied |
|---|----------|-----|------------|
| B1 | App.jsx | Dept pages used static routes → `useParams()` returned `{}` | 5 static routes → 1 `:deptSlug` param route |
| B2 | App.jsx | Dept paths were in `placeholderPaths` | Removed 5 dept paths from placeholderPaths |
| B3 | App.jsx | `window.open('#/admin')` | → `window.open('/admin')` |
| B4 | HeroSlider.jsx | `FALLBACK` array inside component — recreated every render | Moved outside component |
| B5 | AlertBanner.jsx | `dismissed` stale closure | → `useRef` for dismissed state |
| B6 | AlertBanner.jsx | `setTimeout` memory leak | `useRef` + `clearTimeout` on unmount |
| B7 | VideoGallery.jsx | `fetchVideos` not memoized → infinite loop | → `useCallback` |
| B8 | NewsPage.jsx | Raw HTML rendered without DOMPurify | → DOMPurify on both list + detail views |
| B9 | NewsPage.jsx | Search checked wrong field | → check `n.type` |
| B10 | PageViewer.jsx | `pdfReports` query no `orderBy` | → `orderBy('createdAt', 'desc')` |
| B11 | DepartmentPage.jsx | Faculty race condition on multi-filter | → `resolvedRef` Set tracking |
| B12 | DepartmentPage.jsx | `semTab` not reset on dept switch | → `setSem(null)` on slug change |
| B13 | DepartmentPage.jsx | CTA `href="#faculty"` breaks React Router | → `scrollIntoView()` |
| B14 | DepartmentPage.jsx | `orderBy` unused import | Removed |
| B15 | AdminDepartmentTab.jsx | `window.prompt` for Sem/Subject | → `InlinePrompt` component |
| B16 | AdminDepartmentTab.jsx | PDF upload used Firebase Storage | → ImgBB + Google Drive (MediaPicker) |
| B17 | AdminPanel.jsx | Gallery categories mismatch with HomePage | → Use `GALLERY_CATEGORIES` from constants |
| B18 | AdminPanel.jsx | Announcement delete toast had raw HTML | → DOMPurify strip before toast |

---

## 19. QUICK REFERENCE — FILE PATHS

| What | Path |
|------|------|
| Colors | `src/styles/colors.js` or `src/constants.js` |
| College info | `src/constants.js` → `COLLEGE` |
| Firebase | `src/firebase.js` |
| Static nav data | `src/data/db.js` |
| Fallback image | `public/images/college_photo.jpg` |
| Department hub | `/academics/departments` |
| Admin panel | `/admin` |
| MediaPicker | `src/components/MediaPicker.jsx` |
| ImgBB key storage | Firestore: `settings/site.imgbbKey` |

---

## 20. ENVIRONMENT & DEPLOYMENT

### Dev
```bash
npm run dev          # Vite dev server (localhost:5173)
```

### Production Build
```bash
npm run build        # outputs to /dist
npm run preview      # preview built version locally
```

### Deploy to GitHub Pages
```bash
npm run deploy       # gh-pages package (if configured)
# OR push to main, GitHub Actions deploys automatically
```

### Base URL
- **GitHub Pages**: `/gncollege-website/`
- Make sure `vite.config.js` has `base: '/gncollege-website/'` if needed
- All `public/` assets accessible at `/gncollege-website/images/...` in prod

---

*Last updated: March 2026 — Session covers AdminPanel v9.1+ with MediaPicker v2, 17-phase System Test, Departments tab, Contact Settings tab, and universal DepartmentPage.*