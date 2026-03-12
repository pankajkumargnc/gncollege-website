<div align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/GitHub%20Pages-Live-222222?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />

<br/><br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=13&pause=1000&color=F4A023&center=true&vCenter=true&width=600&lines=Guru+Nanak+College%2C+Dhanbad+%7C+Official+Website;React+18+%2B+Vite+%2B+Firebase+Firestore;Full+CMS+Admin+Panel+%7C+22+Tabs;Dynamic+Departments+%7C+Leadership+%7C+NAAC" alt="Typing SVG" />

<br/>

# 🏛️ GNC College — Official Website

**A modern, full-stack college website with a powerful admin CMS panel, built with React 18, Vite, and Firebase.**

[🌐 Live Demo](https://pankajkumargnc.github.io/gncollege-website/) &nbsp;·&nbsp;
[🔐 Admin Panel](https://pankajkumargnc.github.io/gncollege-website/#/admin) &nbsp;·&nbsp;
[🐛 Report Bug](https://github.com/pankajkumargnc/gncollege-website/issues) &nbsp;·&nbsp;
[✨ Request Feature](https://github.com/pankajkumargnc/gncollege-website/issues)

</div>

---

## 📸 Preview

<div align="center">

| Homepage | Admin Panel | Department Page |
|----------|-------------|-----------------|
| Hero Slider + Alerts | 22-Tab CMS Dashboard | 5 Departments System |
| Placements Wall | Leadership Management | Faculty Directory |
| News + Events | Pages & SEO Editor | Committees & NAAC |

> 🔗 **Live:** [pankajkumargnc.github.io/gncollege-website](https://pankajkumargnc.github.io/gncollege-website/)

</div>

---

## ✨ Key Features

### 🌐 Public Website
- **🎠 Hero Slider** — Dynamic slides managed from admin, with custom CTA buttons
- **📢 Flash Alert Banner** — Live announcements across all pages
- **🎓 Alumni Wall of Fame** — Placement records with auto-scrolling marquee
- **📰 News & Events** — Rich HTML content with DOMPurify sanitization
- **🏛️ 5 Departments** — BCA, BBA, Commerce, Humanities, Social Science — each with full profile
- **👑 Leadership** — Presidents, Secretaries, Principals over the years (Timeline + Table view)
- **📋 Various Committees** — Women's Cell, Anti-Ragging, SC/ST, ICC, RUSA, Grievance, and more
- **📄 NAAC & Regulations** — Dynamic CMS pages with rich text + premium table styling
- **📞 Contact Directory** — Campus-wise contacts with sortable directors list
- **🎥 Video Gallery** — YouTube API integration
- **📁 Documents Archive** — Google Drive PDF links

### 🔐 Admin CMS Panel (22 Tabs)
- **📊 Dashboard** — Live stats from all Firestore collections
- **⚡ Quick Publish** — Fast add for notices, events, announcements
- **👑 Leadership** — Manage Presidents / Secretaries / Principals with photo + tenure
- **🏛️ Departments** — Full department profile editor (HOD, curriculum, fee structure)
- **📄 Pages & SEO** — Rich Jodit editor, meta tags, SEO score calculator
- **📸 Gallery** — Category-based photo management
- **📢 Notices / 📣 News / 🏆 Events** — Full CRUD with rich text
- **🧭 Menu Builder** — Drag-drop navbar editor with nested submenus
- **🔗 MediaPicker** — Universal image uploader (ImgBB + public folder + URL paste)
- **💾 Backup & Restore** — Full JSON export/import of all collections
- **🛡️ System Test** — 18-phase health check for all integrations

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite 5 |
| **Routing** | React Router DOM (HashRouter) |
| **Database** | Firebase Firestore (real-time) |
| **Auth** | Firebase Authentication |
| **Image Upload** | ImgBB API (free, lifetime) |
| **Rich Text Editor** | Jodit React (resizable, full toolbar) |
| **HTML Sanitization** | DOMPurify |
| **Animations** | AOS (Animate On Scroll) |
| **Notifications** | react-hot-toast |
| **Hosting** | GitHub Pages |
| **Build Tool** | Vite + Terser (console.log stripped in prod) |

---

## 📁 Project Structure

```
gncollege-website/
│
├── 📂 public/
│   ├── 🖼️  images/          ← Static images (logo, fallback, campus)
│   └── 📄 pdfs/             ← Static PDFs (prospectus, forms)
│
├── 📂 src/
│   ├── 🗂️  App.jsx           ← All routes + ErrorBoundary wrapper
│   ├── 🔥 firebase.js        ← db + auth exports (no Storage)
│   ├── ⚙️  constants.js      ← COLORS, COLLEGE, COLLECTIONS, enums
│   ├── 📂 data/db.js         ← Static navLinks, social links
│   │
│   ├── 📂 pages/
│   │   ├── HomePage.jsx
│   │   ├── DepartmentPage.jsx     ← Universal (all 5 depts + hub)
│   │   ├── LeadershipPage.jsx     ← Presidents / Secretaries / Principals
│   │   ├── Contact.jsx
│   │   ├── NewsPage.jsx
│   │   ├── EventsPage.jsx
│   │   ├── VideoGallery.jsx
│   │   └── ...more pages
│   │
│   └── 📂 components/
│       ├── AdminPanel.jsx         ← Main CMS (22 tabs, lazy loaded)
│       ├── AdminLeadershipTab.jsx ← Leadership management tab
│       ├── AdminDepartmentTab.jsx ← Department editor (lazy)
│       ├── MediaPicker.jsx        ← Universal media uploader
│       ├── PageViewer.jsx         ← CMS page renderer (gnc-prose CSS)
│       ├── HeroSlider.jsx
│       ├── AlertBanner.jsx
│       └── ErrorBoundary.jsx
│
├── 📄 vite.config.js
├── 📄 CLAUDE.md               ← AI development reference guide
└── 📄 package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:
- **Node.js** `v18+`
- **npm** `v9+`
- A **Firebase project** (Firestore + Auth enabled)
- An **ImgBB API key** (free at [imgbb.com](https://imgbb.com))

### 1. Clone the Repository

```bash
git clone https://github.com/pankajkumargnc/gncollege-website.git
cd gncollege-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ **Never commit `.env` to Git.** It's already in `.gitignore`.

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production

```bash
npm run build
```

### 6. Deploy to GitHub Pages

```bash
npm run deploy
```

---

## 🔥 Firebase Setup

### Firestore Collections

The app uses these collections (auto-created on first use):

| Collection | Purpose |
|------------|---------|
| `notices` | Notice board |
| `announcements` | News & updates |
| `events` | College events |
| `gallery` | Photo gallery |
| `placements` | Alumni Wall of Fame |
| `faculties` | Teaching + Non-Teaching staff |
| `pages` | Dynamic CMS pages |
| `departments` | Department profiles |
| `leadership` | Presidents / Secretaries / Principals |
| `sliderSlides` | Hero slider images |
| `alerts` | Flash alert banner |
| `pdfReports` | Document archive |
| `contactDirectory` | Contact page directors |

### Firestore Security Rules

Paste these in **Firebase Console → Firestore → Rules:**

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Public read — auth required to write
    match /notices/{id}          { allow read; allow write: if request.auth != null; }
    match /announcements/{id}    { allow read; allow write: if request.auth != null; }
    match /events/{id}           { allow read; allow write: if request.auth != null; }
    match /gallery/{id}          { allow read; allow write: if request.auth != null; }
    match /placements/{id}       { allow read; allow write: if request.auth != null; }
    match /faculties/{id}        { allow read; allow write: if request.auth != null; }
    match /pages/{id}            { allow read; allow write: if request.auth != null; }
    match /pdfReports/{id}       { allow read; allow write: if request.auth != null; }
    match /sliderSlides/{id}     { allow read; allow write: if request.auth != null; }
    match /alerts/{id}           { allow read; allow write: if request.auth != null; }
    match /departments/{slug}    { allow read; allow write: if request.auth != null; }
    match /leadership/{id}       { allow read; allow write: if request.auth != null; }
    match /contactDirectory/{id} { allow read; allow write: if request.auth != null; }
    match /settings/{doc}        { allow read; allow write: if request.auth != null; }
    match /adminLogs/{id}        { allow read, write: if request.auth != null; }
    match /_sysTest/{id}         { allow read, write: if request.auth != null; }
  }
}
```

---

## 🔐 Admin Panel Access

1. Go to: `https://your-site/#/admin`
2. Login with your Firebase Auth credentials
3. First time setup:
   - **Site Settings tab** → Add your ImgBB API Key
   - **Menu Editor tab** → Configure navbar links
   - **Departments tab** → Add BCA, BBA, Commerce, Humanities, Social Science data
   - **Leadership tab** → Add Presidents / Secretaries / Principals

---

## 📸 Image Upload Strategy

This project uses **ImgBB** (not Firebase Storage) for image hosting:

| Type | Method |
|------|--------|
| 📷 Photos | ImgBB API via MediaPicker component |
| 📄 PDFs | Google Drive public share link |
| 🖼️ Static assets | `public/images/` folder |

**How to get ImgBB key:**
1. Sign up free at [imgbb.com](https://api.imgbb.com)
2. Go to API → Get API Key
3. Paste in Admin → Site Settings → ImgBB API Key

---

## 🏛️ Department System

5 departments, all handled by a **single universal component:**

| Department | Slug | Color |
|------------|------|-------|
| BCA | `bca` | `#0ea5e9` (Sky Blue) |
| BBA | `bba` | `#f59e0b` (Amber) |
| Commerce | `commerce` | `#10b981` (Emerald) |
| Humanities | `humanities` | `#8b5cf6` (Violet) |
| Social Science | `social-science` | `#ef4444` (Red) |

Each department page includes: HOD Profile, Vision/Mission, Curriculum, Fee Structure, Facilities, Faculty List, and Program Reports.

---

## 👑 Leadership System

Timeline + Table view for:
- **Presidents** — `/about-us/college-management/presidents`
- **Secretaries** — `/about-us/college-management/secretaries`
- **Principals** — `/about-us/college-management/principal`

Managed from **Admin → Leadership tab** with photo, tenure years, and notable achievements.

---

## ⚙️ Available Scripts

```bash
npm run dev        # Start development server (localhost:5173)
npm run build      # Build for production → /dist
npm run preview    # Preview production build locally
npm run deploy     # Deploy to GitHub Pages
```

---

## 🗺️ Routing

This project uses **HashRouter** — all URLs have `#`:

```
https://site.github.io/gncollege-website/#/
https://site.github.io/gncollege-website/#/admin
https://site.github.io/gncollege-website/#/about-us/college-management/presidents
```

> ✅ This ensures GitHub Pages compatibility without a custom 404.html redirect.

---

## 📦 Key Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "firebase": "^10.x",
  "vite": "^5.x",
  "jodit-react": "^4.x",
  "dompurify": "^3.x",
  "html-react-parser": "^5.x",
  "react-hot-toast": "^2.x",
  "aos": "^2.x"
}
```

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📬 Contact

**Guru Nanak College, Dhanbad**

- 🌐 Website: [gncollege-website](https://pankajkumargnc.github.io/gncollege-website/)
- 📍 Bhuda Campus, Dhanbad, Jharkhand
- 📍 Bank More Campus, Dhanbad, Jharkhand

---

<div align="center">

Made with ❤️ for **Guru Nanak College, Dhanbad**

⭐ **Star this repo** if you found it helpful!

<img src="https://img.shields.io/github/stars/pankajkumargnc/gncollege-website?style=social" />
<img src="https://img.shields.io/github/forks/pankajkumargnc/gncollege-website?style=social" />

</div>