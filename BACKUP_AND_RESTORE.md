# GNC Digital Campus — Disaster Recovery & Backup Strategy (Website 2.0)
**Institution:** Guru Nanak College, Dhanbad  
**Specification Reference:** GNC Website 2.0 Master Prompt — Sections 53, 84, 94 & Ground Rule GR-1  
**Classification:** Disaster Recovery & Business Continuity Protocol  

---

## 1. Ground Rule GR-1: Pre-Upgrade Safety Checkpoints

Before any major codebase migration or destructive database write, a dual-layer backup must exist:

### Layer A — Dedicated Git Snapshot:
- **Branch:** `backup/pre-upgrade-2026-09-25`
- **Tag:** `backup-pre-upgrade-2026-09-25`
- *Command to verify:*
  ```powershell
  git tag -l "backup*"
  ```

### Layer B — Full Out-of-Tree Filesystem Archive:
A complete copy of the working project directory — including all local `.env*` files, rules, and configuration — is stored in an external path outside normal git history:
- **Archive Path:** `D:\New folder\Working\gnc-college\gnc-college-backup-2026-09-25_132644`
- **Integrity:** 46 top-level directories and configuration files preserved.

---

## 2. Automated Scheduled Cloud Backups (Section 53)

The production environment executes an automated database backup routine via Firebase Cloud Functions:

- **Function Name:** `scheduledFirestoreBackup` (in `functions/index.js`)
- **Execution Schedule:** Every Sunday at `02:00 AM IST` (`0 2 * * 0`)
- **Execution Engine:** Google Cloud Firestore Admin Client (`@google-cloud/firestore` v1)
- **Destination:** Default Firebase Cloud Storage bucket under `gs://gnc-college-web.appspot.com/backups/{timestamp}`
- **Coverage:** All active collections (`notices`, `events`, `gallery`, `faculties`, `pageContent`, `inquiries`, `settings`, `documents`)
- **Audit Logging:** Every initiated or failed backup is recorded in the `adminLogs` collection.

---

## 3. Manual Administrator Backup & Snapshot Export

Administrators can trigger on-demand backups directly from the Admin Portal:

1. Open **Admin Panel → Backup & Restore** tab (`BackupRestoreTab.jsx`).
2. Click **Create Full Snapshot (JSON Export)**.
3. The system serializes all current Firestore collections into a structured JSON payload and automatically downloads a timestamped file:  
   `gnc_college_backup_YYYY-MM-DD_HHMM.json`
4. The snapshot export is logged in the administrative audit trail.

---

## 4. Database Restoration Protocol (Section 53)

> ⚠️ **MANDATORY SAFETY RULE:** Never restore data over a live collection without generating an automatic pre-restore safety snapshot first!

### Standard Restoration Procedure:
1. Open **Admin Panel → Backup & Restore**.
2. Under **Restore Database**, select a verified JSON backup file.
3. The system automatically creates an immediate pre-restore snapshot of current live documents before applying changes.
4. The system compares document keys and updates collections in batches (500 writes per batch) to maintain Firestore transactional limits.
5. Review the summary log to confirm that all documents were restored cleanly.

### Complete Cold Disaster Recovery:
If the entire hosting environment or repository becomes corrupted:
1. Restore the project from the filesystem archive:
   ```powershell
   Copy-Item -Recurse -Force "D:\New folder\Working\gnc-college\gnc-college-backup-2026-09-25_132644\*" "."
   ```
2. Re-install project dependencies:
   ```bash
   npm ci
   ```
3. Validate test suites:
   ```bash
   npm test
   ```
