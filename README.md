# 🏫 Guru Nanak College, Dhanbad — Official Web Portal (v200.0)

<div align="center">

![GNC](https://img.shields.io/badge/Guru%20Nanak%20College-Dhanbad%20%7C%20Est.%201970-0f2347?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-10.x-FFCA28?style=for-the-badge&logo=firebase)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge)
![85-Phase Diagnostic](https://img.shields.io/badge/Audit-85--Phase-eab308?style=for-the-badge)

**🎓 A NAAC Accredited Sikh Minority Degree College | Affiliated to B.B.M.K. University**  
**📍 Bhuda Campus + Bank More Campus | Dhanbad, Jharkhand — 826001**

[🌐 Official Site](https://pankajkumargnc.github.io/gncollege-website) · [📋 Architecture Encyclopedia](./public/docs/GNC_MASTER_ARCHITECTURE_BLUEPRINT.html) · [🛡️ Admin Manual](./public/docs/CLAUDE_GNC_Reference.pdf)

---

> **⚡ Designed, Engineered & Deployed by [Pankaj Kumar](https://github.com/pankajkumargnc)**
>
> *"This entire project — including every line of code, every pixel of design, and the complex diagnostic logic — was single-handedly planned, developed, tested, and deployed from scratch. No ready-made templates, no outsourced modules — just 100% original craftsmanship."*

</div>

---

## 📌 Table of Contents

1. [Architectural Vision](#-architectural-vision)
2. [Supreme Diagnostic Hub v200.0](#-supreme-diagnostic-hub-v2000)
3. [Core Tech Stack](#-core-tech-stack)
4. [Master Directory Structure](#-master-directory-structure)
5. [System Workflow & Data Map](#-system-workflow--data-map)
6. [Integrated CMS Modules (25+)](#-integrated-cms-modules-25)
7. [PWA & Service Worker Logic](#-pwa--service-worker-logic)
8. [Performance & Optimization Strategies](#-performance--optimization-strategies)
9. [Security & Compliance Model](#-security--compliance-model)
10. [Authorship & Credits](#-authorship--credits)

---

## 🎯 Architectural Vision

The **GNC Portral** is an ultra-modern, production-grade **React + Firebase + Vite** ecosystem. It is not a mere static brochure; it is a high-performance **CMS-powered platform** designed to handle complex institutional data flows, real-time student notifications, and deep system diagnostics.

### 🏆 Key Technological Advancements

| Aspect | Implementation Details |
|--------|-----------------------|
| 🔥 **Dynamic Data Hub** | Real-time synchronization via Firebase Cloud Firestore |
| 🛡️ **Supreme Audit Engine** | Integrated 85-Phase Core Diagnostic System (v200.0) |
| 📂 **Encyclopedia Generator** | One-click 10-15 page professional HTML/A4 technical reports |
| 📱 **Next-Gen PWA** | Fully installable, offline-capable progressive experience |
| ☁️ **Universal Drive Sync** | Seamless MediaPicker integration with Google Drive (v3) |
| 🎨 **Lumina Design System** | Glassmorphism, fluid typography (clamp), and CSS hardware-acceleration |
| ⚡ **Performance Core** | React Code-splitting, Terser minification, and WebP compression |

---

## 🛠️ Supreme Diagnostic Hub v200.0

The portal includes an industry-first **Architectural Encyclopedia Hub** within the Admin Panel. This tool performs a deep critical scan of the entire codebase and cloud infrastructure.

*   **85+ Diagnostic Phases:** Covers Node.js runtime, Firebase latency, Security header compliance, and UI consistency.
*   **A4 Technical Blueprint:** Generates a massive 10-15 page formal technical document for official college records.
*   **Neural AI Logic:** Real-time optimization advice based on system performance metrics.

---

## 🏗️ Master Tech Stack

### 🖥️ Frontend Architecture
- **React 18.2.0**: Specialized for institutional state management and fast UI reconciliation.
- **Vite 7.3.1**: The high-speed compiler and orchestrator for optimized production builds.
- **React Router 7**: Managing 40+ dynamic and eager routes via HashRouter.
- **Jodit v5**: The primary Rich-Text engine for the Dynamic Page Builder.

### 🔥 Backend & Cloud (Firebase BaaS)
- **Cloud Firestore**: Real-time NoSQL database for the entire CMS.
- **Firebase Auth**: Secure, isolated authentication layer (Lazy-loaded for performance).
- **Firebase Storage**: Robust media and document handling.

### 🔧 Build & Security Tools
- **Terser**: Production-level JavaScript minification (removes consoles/debuggers automatically).
- **DOMPurify**: The non-negotiable sanitization layer for every Firestore HTML render.
- **ImageMin**: Automated WebP conversion and asset compression.

---

## 📂 Master Directory Structure

```text
gncollege-website/
│
├── 📄 index.html             ← Entry point, SEO, PWA meta, and icon packs
├── 📄 vite.config.js         ← Optimization engine, chunks, and Terser setup
├── 📂 public/
│   ├── 📄 sw.js              ← Service Worker (multi-strategy caching)
│   ├── 📂 images/            ← Optimized WebP assets & HeroSlider (15 slides)
│   └── 📂 docs/              ← Technical Audit Reports & Blueprints
│
└── 📂 src/
    ├── 📄 App.jsx            ← Master Routes, Real-time Listeners, and global logic
    ├── 📄 firebase.js        ← Firestore Infrastructure (Auth-isolated)
    ├── 📂 pages/             ← 19+ Page Modules (Academics, Admissions, NAAC, IQAC...)
    ├── 📂 hooks/             ← useAuth, useAppData, useHashFragment logic
    └── 📂 components/
        ├── 📂 home/          ← TopBar, NotificationSection, Statistical Counters
        └── 📂 admin/
            ├── 📄 AdminPanel.jsx ← Central CMS Orchestrator
            └── 📂 tabs/      ← 24+ Integrated Management Modules
```

---

## 🔐 Integrated CMS Modules (25+)

The Admin Panel provides complete control over every pixel of the portal:
*   **Dynamic Builder:** Create rich-text pages with custom slugs inside the `PagesTab`.
*   **Drive Sync v3:** Sync documents and media files directly from Google Drive in one click.
*   **Media Center:** High-speed uploader for Gallery, sliders, and alumni achievements.
*   **Institutional Hub:** Manage Faculty, Departments, Leadership, and Staff rosters live.
*   **System Diagnostics:** Run the 85-Phase Encyclopedia Audit directly from the HUD.

---

## 🔒 Security & Compliance Model

Security is built into the core, not added as an afterthought:
- **XSS Immunity:** Every piece of HTML from the CMS passes through `DOMPurify` before rendering.
- **Auth Isolation:** The Firebase Auth SDK is lazy-loaded, ensuring public visitors never download the security library.
- **Access Guard:** All Firestore write operations are locked down via custom server-side security rules.
- **WCAG Accessibility:** High contrast (AAA ratio), ARIA labels, and `clamp()` typography for universal readability.

---

## 🚀 Performance Optimization

- **Chunk Splitting:** Heavy libraries like Jodit and Firebase/Auth are split into a separate "Admin Chunk".
- **Asset Logic:** 100% of the site's media is serves as optimized `.webp` format.
- **Fluid Layouts:** Uses CSS `clamp()` and `min/max` instead of heavy media queries to prevent layout shifts.

---

## 🧑‍💻 Authorship & Credits

### **Pankaj Kumar**
*Sole Designer, Lead Architect & Full-Stack Developer*

This project is a testament to original engineering. **"Is website ka har ek component, har ek page — mere dwara scratch se design kiya gaya hai."** This represents over two years of iterative development, optimization, and institutional research.

- 🌐 **GitHub:** [@pankajkumargnc](https://github.com/pankajkumargnc)
- 📧 **Email:** pankajkumargnc@gmail.com
- 🏫 **Institution:** Guru Nanak College, Dhanbad

---

*🏫 Built with ❤️ for Guru Nanak College, Dhanbad*  
*© 2024–2026 Pankaj Kumar. All rights reserved. Intellectual Property of the Author.*