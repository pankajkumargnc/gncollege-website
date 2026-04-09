import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replace with your service account key path
// IMPORTANT: Never commit service account keys to GitHub!
const SERVICE_ACCOUNT_PATH = path.join(__dirname, '../new-project-key.json');

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error('❌ Error: Service account key not found at', SERVICE_ACCOUNT_PATH);
  console.error('Please download it from Firebase Console -> Project Settings -> Service Accounts, and save it as "new-project-key.json" in root folder.');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// Collections to backup
const COLLECTIONS = [
  'pageContent',
  'menu',
  'notices',
  'campus_gallery',
  'video_gallery',
  'pdfReports',
  'staff',
  'departments'
];

async function backup() {
  console.log('🔄 Starting Firestore Backup...');
  const backupData = {};
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  for (const collectionName of COLLECTIONS) {
    try {
      const snapshot = await db.collection(collectionName).get();
      backupData[collectionName] = {};
      
      let count = 0;
      snapshot.forEach(doc => {
        backupData[collectionName][doc.id] = doc.data();
        count++;
      });
      
      console.log(`✅ Backed up collection: ${collectionName} (${count} documents)`);
    } catch (e) {
      console.warn(`⚠️ Warning: Failed to backup ${collectionName} - ${e.message}`);
    }
  }

  const backupDir = path.join(__dirname, '../backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  const backupFile = path.join(backupDir, `gnc_backup_${timestamp}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
  
  console.log(`\n🎉 Backup complete! File saved at:\n${backupFile}`);
}

backup().catch(console.error);
