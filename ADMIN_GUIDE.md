# GNC Digital Campus — Administrator & Governance Manual (Website 2.0)
**Institution:** Guru Nanak College, Dhanbad  
**Specification Reference:** GNC Website 2.0 Master Prompt — Sections 20, 21, 22, 23, 24, 25, 26, 81, 94  
**Classification:** Administrative Governance & User Operations Manual  

---

## 1. Accessing the Governance Portal

1. **URL:** Navigate to `/admin` (e.g. `https://gncollege.org/admin`).
2. **Authentication:** Enter official institutional credentials. Authentication is verified through Firebase Auth.
3. **Session Security (Section 81):**
   - **Tab-Scoped Session:** Closing your browser tab immediately logs you out. Stored sessions will not persist across browser restarts.
   - **Inactivity Auto-Logout:** If no keyboard, mouse, or touch interaction occurs for 15 minutes, a security warning dialog will pop up with a 60-second countdown. If no action is taken, your session will automatically log out to protect college data.

---

## 2. Role-Based Access Control (RBAC) Matrix (Section 21)

| Role Code | Title | Permissions |
|---|---|---|
| `SUPER_ADMIN` | Root Administrator | Full unrestricted access to all 28 modules, database backup/restore, user roles, and security settings. |
| `PRINCIPAL` | Principal / Institutional Head | Institutional approval, executive messages, NAAC reporting, policy publications, and audit review. |
| `OFFICE_ADMIN` | College Administrative Office | Official notices, examination circulars, document verification, student certificates, and admissions. |
| `DEPARTMENT_ADMIN` | Head of Department | Department-specific courses, faculty listings, lab updates, and syllabus management. |
| `EDITOR` | Content Editor | Drafting and updating articles, event announcements, and gallery albums (requires approval for publishing). |
| `VIEWER` | Auditor / Read-Only | Read-only inspection of visitor analytics, inquiry logs, and audit trails. |

---

## 3. Official Notice Board & Publishing Lifecycle (Section 11 & 25)

### Status Lifecycle:
```
[📝 Draft] ──> [🟡 Scheduled] ──> [🟢 Published / Live] ──> [🔴 Expired] ──> [📦 Archived]
```

### Steps to Publish or Schedule a Notice:
1. Open the **Notices** tab.
2. Enter the notice heading or paste rough text into the editor.
3. Click **AI Auto-Fill & Polish** to automatically format headings, detect urgent keywords, and categorize.
4. Select the **Workflow Status**:
   - `🟢 Published (Live)`: Immediately displays on the homepage notice ticker and `/notifications` page.
   - `🟡 Scheduled`: Specify a future **Publish Date**. The automated Cloud Function (`processScheduledPublishing`) will publish it automatically.
   - `📝 Draft`: Save working progress. Unsaved drafts are also protected locally by the 2.5-second auto-save engine.
5. *(Optional)* Set an **Expiry Date** to automatically transition the notice to `Expired` status once the deadline passes.
6. Check **Send Push Notification** to broadcast the circular to subscribed student mobile devices.

---

## 4. CMS Page Builder & Version History (Section 23)

1. Open the **Content Manager** tab.
2. Select any page from the sidebar (e.g., *Vision & Mission*, *Women's Cell*, *Admission Procedure*).
3. Switch between **Editor View**, **Split-Screen View**, or **Live Visual Preview**.
4. Use `Ctrl + S` or click **Save Content**.
5. **Automatic Revision Snapshotting:** Every save automatically increments the page version (`_version`) and records a historical snapshot in the page's revision archive.

---

## 5. Student Document Request Management (Section 19)

Students submit online applications for Transfer Certificates, Character Certificates, Bonafide letters, or marksheet verifications via `/documents/request`.

### Application Lifecycle:
1. Student receives an automated token: `GNC-DOC-2026-XXXXXX`.
2. Admin opens the **Documents** tab to view pending requests.
3. Admin updates request status:
   - `received` → `under_review` → `processing` → `ready` → `delivered` (or `rejected` with institutional reason).
4. Students can track live status updates at any time by entering their token on `/student-corner` or `/documents/request`.

---

## 6. System Audit Log (Section 24)

Every sensitive administrative action is logged to the `adminLogs` collection:
- Administrator email and role
- Target collection and document identifier
- Timestamp (ISO 8601)
- Action type (`CREATE`, `UPDATE`, `DELETE`, `PUBLISH`, `RESTORE`, `BACKUP_EXPORT`)
