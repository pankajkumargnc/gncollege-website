// scripts/scheduledBackup.mjs — Enterprise Automated Firestore Snapshot Script
// Architect & Primary Administrator: Pankaj Kumar Prasad
// Usage: node scripts/scheduledBackup.mjs
// Compatible with Windows Task Scheduler, PM2, Cron, or manual execution

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SERVICE_ACCOUNT_PATH = path.join(ROOT_DIR, 'new-project-key.json');
const SNAPSHOTS_DIR = path.join(ROOT_DIR, 'backups', 'snapshots');

const COLLECTIONS = [
  'notices',
  'announcements',
  'events',
  'faculties',
  'placements',
  'pdfReports',
  'alerts',
  'gallery',
  'pages',
  'navigation',
  'testimonials',
  'sliderSlides',
  'pageContent',
  'departments'
];

async function runScheduledBackup() {
  console.log('════════════════════════════════════════════════════════════════');
  console.log('🏛️  GURU NANAK COLLEGE (DHANBAD) — AUTOMATED CLOUD BACKUP ENGINE');
  console.log('👑  Architect & Root Administrator: Pankaj Kumar Prasad');
  console.log(`⏰  Timestamp: ${new Date().toLocaleString()}`);
  console.log('════════════════════════════════════════════════════════════════');

  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error(`❌ Error: Service account key not found at: ${SERVICE_ACCOUNT_PATH}`);
    console.error('Please ensure "new-project-key.json" is located in the root directory.');
    process.exit(1);
  }

  // Ensure snapshots directory exists
  if (!fs.existsSync(SNAPSHOTS_DIR)) {
    fs.mkdirSync(SNAPSHOTS_DIR, { recursive: true });
  }

  const { default: admin } = await import('firebase-admin');
  const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  const db = admin.firestore();
  const backupData = {
    version: '3.0',
    system: 'Guru Nanak College Dhanbad — Cloud Vault',
    author: 'Pankaj Kumar Prasad',
    timestamp: new Date().toISOString(),
    collections: {},
    metadata: {
      totalCollections: 0,
      totalDocuments: 0,
      executionDurationMs: 0
    }
  };

  const startTime = Date.now();
  let totalDocs = 0;

  for (const colName of COLLECTIONS) {
    process.stdout.write(`📦 Backing up [${colName}]... `);
    try {
      const snap = await db.collection(colName).get();
      const docs = [];
      snap.forEach(doc => {
        docs.push({ _id: doc.id, ...doc.data() });
      });
      backupData.collections[colName] = docs;
      totalDocs += docs.length;
      console.log(`✅ (${docs.length} docs)`);
    } catch (err) {
      console.log(`⚠️ Failed: ${err.message}`);
      backupData.collections[colName] = [];
    }
  }

  const duration = Date.now() - startTime;
  backupData.metadata.totalCollections = COLLECTIONS.length;
  backupData.metadata.totalDocuments = totalDocs;
  backupData.metadata.executionDurationMs = duration;

  // Format filename: gnc_snapshot_YYYYMMDD_HHmmss.json
  const pad = n => String(n).padStart(2, '0');
  const d = new Date();
  const dateStr = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  const outPath = path.join(SNAPSHOTS_DIR, `gnc_snapshot_${dateStr}.json`);

  const serialized = JSON.stringify(backupData, null, 2);
  fs.writeFileSync(outPath, serialized, 'utf8');
  const sizeMB = (Buffer.byteLength(serialized, 'utf8') / (1024 * 1024)).toFixed(2);

  console.log('────────────────────────────────────────────────────────────────');
  console.log(`🎉 Master Backup Successfully Archived!`);
  console.log(`📁 File: ${path.relative(ROOT_DIR, outPath)}`);
  console.log(`📊 Size: ${sizeMB} MB`);
  console.log(`📑 Total Documents: ${totalDocs}`);
  console.log(`⏱️  Duration: ${(duration / 1000).toFixed(2)}s`);

  // Retention: keep last 30 snapshots, purge older
  try {
    const allSnapshots = fs.readdirSync(SNAPSHOTS_DIR)
      .filter(f => f.startsWith('gnc_snapshot_') && f.endsWith('.json'))
      .map(f => ({ name: f, time: fs.statSync(path.join(SNAPSHOTS_DIR, f)).mtime.getTime() }))
      .sort((a, b) => b.time - a.time);

    if (allSnapshots.length > 30) {
      const toDelete = allSnapshots.slice(30);
      console.log(`🧹 Rotating older snapshots (purging ${toDelete.length} legacy files)...`);
      toDelete.forEach(f => {
        try {
          fs.unlinkSync(path.join(SNAPSHOTS_DIR, f.name));
        } catch (_) {}
      });
    }
  } catch (err) {
    console.warn('Snapshot retention rotation warning:', err.message);
  }

  console.log('════════════════════════════════════════════════════════════════');
}

runScheduledBackup().catch(err => {
  console.error('❌ Critical Failure in Scheduled Backup Engine:', err);
  process.exit(1);
});
