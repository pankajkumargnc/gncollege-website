// tests/unit/backupFunction.test.js
// Unit tests and static verification for Cloud Function scheduledFirestoreBackup
import fs from 'fs';
import path from 'path';

export function runBackupFunctionTests() {
  const results = [];
  const assert = (desc, cond) => results.push({ desc, pass: !!cond });

  const functionsPath = path.resolve(process.cwd(), 'functions/index.js');
  const code = fs.readFileSync(functionsPath, 'utf8');

  // 1. Client import
  assert('functions/index.js imports @google-cloud/firestore', code.includes('@google-cloud/firestore'));
  assert('functions/index.js instantiates FirestoreAdminClient', code.includes('new v1.FirestoreAdminClient()'));

  // 2. Export method
  assert('functions/index.js calls exportDocuments', code.includes('client.exportDocuments'));

  // 3. Storage bucket destination
  assert('Backup destination targets gs://.../backups/ path', code.includes('gs://${bucket}/backups/'));

  // 4. All collections included
  assert('Backup exports all collections (empty collectionIds array)', /collectionIds:\s*\[\s*\]/.test(code));

  // 5. Audit logging
  assert('Backup logs SUCCESS status to adminLogs', code.includes("action: 'SCHEDULED_WEEKLY_BACKUP_INITIATED'"));
  assert('Backup logs ERROR status on failure to adminLogs', code.includes("action: 'SCHEDULED_WEEKLY_BACKUP_FAILED'"));

  return results;
}
