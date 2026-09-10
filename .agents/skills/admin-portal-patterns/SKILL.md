---
name: admin-portal-patterns
description: Best practices, architecture guidelines, CRUD operations, state synchronization, and UI patterns for the Guru Nanak College Admin Portal (React + Firebase Firestore + Storage).
---

# Admin Portal Architecture & Engineering Patterns

This skill outlines guidelines and conventions specifically tailored to the GNC College Admin Portal.

## 1. Authentication & Route Guarding
- **Auth Flow**: Uses Firebase Authentication (`signInWithEmailAndPassword`, `signOut`, `onAuthStateChanged`).
- **Session State**: Persist auth state using React Context / State (`useAuth` hook or localized admin auth state).
- **Security Check**: Always verify that write operations are permitted for authenticated admin tokens in Firestore security rules.
- **Auto-logout / Inactivity**: Handle token expiration gracefully and redirect back to `#/admin` login overlay without throwing unhandled exceptions.

## 2. CRUD Operations & Firestore Conventions
- **Collection Naming**: Consistent lowercase names: `notices`, `events`, `faculty`, `gallery`, `documents`, `announcements`, `alerts`, `sliders`, `placements`, `testimonials`, `pages`, `settings`.
- **Timestamps**: Always store `createdAt` and `updatedAt` using server timestamps or ISO strings for deterministic sorting:
  ```javascript
  import { serverTimestamp } from 'firebase/firestore';
  const payload = {
    ...formData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  ```
- **Optimistic UI vs Synchronous Feedback**: For critical deletions or updates, display a localized loading indicator or toast notification upon successful completion before re-fetching or modifying state in place.

## 3. Form Validation & Data Integrity
- **Required Fields**: Validate inputs (Title, Category, Dates, URLs, Attachments) before triggering Firestore write queries.
- **Image / File Uploads**:
  - Validate mime types (e.g. `image/jpeg`, `image/png`, `application/pdf`).
  - Size limitation checks (e.g. max 5MB for images, 15MB for documents) before sending payload to Firebase Storage.
  - Return clear inline errors when an invalid file or oversized payload is selected.

## 4. UI/UX Consistency in Admin Portal
- **Tab Switching**: Maintain active tab state without causing layout shifts or losing unsaved draft changes.
- **Search & Pagination / Filtering**: Filter records client-side when dataset is small (<200 items); use compound Firestore queries with limit/startAfter for larger sets.
- **Destructive Actions**: Always show a confirmation dialog or modal before executing `deleteDoc`.
- **Loading & Skeleton States**: Use skeleton placeholders or spinner overlays during initial fetches to avoid jumpy UI.
