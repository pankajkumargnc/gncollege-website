import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SERVICE_ACCOUNT_PATH = path.join(__dirname, '../new-project-key.json');

const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function run() {
  const snap = await db.collection('pdfReports').get();
  console.log('Current count in pdfReports:', snap.size);
  snap.docs.forEach(d => console.log('Doc ID:', d.id, d.data().title));

  // Add Baisakhi Magazine 2024 if not present
  const exists = snap.docs.some(d => d.data().title?.includes('Baisakhi'));
  if (!exists) {
    const docRef = await db.collection('pdfReports').add({
      title: 'Baisakhi Magazine 2024',
      category: 'E-Magazine & Publications',
      targetPage: 'magazine',
      year: '2024',
      academicYear: '2023-24',
      volumeIssue: 'Vol. 31 • Special Baisakhi Issue',
      pdfUrl: 'https://drive.google.com/file/d/18_jD2-pkzvh6KRGnkEHntfDJzawa1FJk/preview',
      link: 'https://drive.google.com/file/d/18_jD2-pkzvh6KRGnkEHntfDJzawa1FJk/preview',
      coverImage: 'https://www.googleapis.com/drive/v3/files/1bReeCuwZ_yS5vR7CIHbwQcs6Gw81xB-8?alt=media', // or college image
      description: 'Official Guru Nanak College Baisakhi Magazine 2024 edition celebrating cultural fest, academic milestones, and student literature.',
      isFeatured: true,
      isPublic: true,
      docType: 'Magazine',
      type: 'Magazine',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      views: 120,
      downloads: 45
    });
    console.log('Successfully created Baisakhi Magazine 2024 with ID:', docRef.id);
  }
}

run().catch(console.error).finally(() => process.exit(0));
