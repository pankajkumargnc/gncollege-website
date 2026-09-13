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

const magazinesToSeed = [
  {
    title: 'Vasakhi Magazine 2026',
    category: 'E-Magazine & Publications',
    targetPage: 'magazine',
    year: '2026',
    academicYear: '2025-26',
    volumeIssue: 'Vol. 33 • Annual Edition',
    pdfUrl: 'https://drive.google.com/file/d/18_jD2-pkzvh6KRGnkEHntfDJzawa1FJk/preview',
    link: 'https://drive.google.com/file/d/18_jD2-pkzvh6KRGnkEHntfDJzawa1FJk/preview',
    coverImage: '/images/magazines/vasakhi_2026.jpg',
    description: 'The 2026 annual magazine edition of Guru Nanak College, celebrating heritage, campus milestones, academic achievements, and cultural diversity.',
    isFeatured: true,
    isPublic: true,
    docType: 'Magazine',
    type: 'Magazine',
    views: 185,
    downloads: 72
  },
  {
    title: 'Baisakhi Magazine 2025',
    category: 'E-Magazine & Publications',
    targetPage: 'magazine',
    year: '2025',
    academicYear: '2024-25',
    volumeIssue: 'Vol. 32 • National Youth Fest Edition',
    pdfUrl: 'https://drive.google.com/file/d/18_jD2-pkzvh6KRGnkEHntfDJzawa1FJk/preview',
    link: 'https://drive.google.com/file/d/18_jD2-pkzvh6KRGnkEHntfDJzawa1FJk/preview',
    coverImage: '/images/magazines/baisakhi_2025.jpg',
    description: 'Annual college magazine 2025 edition featuring 38th AIU Inter University National Youth Festival memories, student creative writings, and research papers.',
    isFeatured: false,
    isPublic: true,
    docType: 'Magazine',
    type: 'Magazine',
    views: 240,
    downloads: 98
  },
  {
    title: 'Baisakhi Magazine 2024',
    category: 'E-Magazine & Publications',
    targetPage: 'magazine',
    year: '2024',
    academicYear: '2023-24',
    volumeIssue: 'Vol. 31 • Special Baisakhi Issue',
    pdfUrl: 'https://drive.google.com/file/d/18_jD2-pkzvh6KRGnkEHntfDJzawa1FJk/preview',
    link: 'https://drive.google.com/file/d/18_jD2-pkzvh6KRGnkEHntfDJzawa1FJk/preview',
    coverImage: '/images/magazines/baisakhi_2024.jpg',
    description: 'Official Guru Nanak College Baisakhi Magazine 2024 edition celebrating cultural fest, academic milestones, and student literature.',
    isFeatured: false,
    isPublic: true,
    docType: 'Magazine',
    type: 'Magazine',
    views: 310,
    downloads: 145
  },
  {
    title: 'Baisakhi Magazine 2023',
    category: 'E-Magazine & Publications',
    targetPage: 'magazine',
    year: '2023',
    academicYear: '2022-23',
    volumeIssue: 'Vol. 30 • Golden Heritage Issue',
    pdfUrl: 'https://drive.google.com/file/d/18_jD2-pkzvh6KRGnkEHntfDJzawa1FJk/preview',
    link: 'https://drive.google.com/file/d/18_jD2-pkzvh6KRGnkEHntfDJzawa1FJk/preview',
    coverImage: '/images/magazines/baisakhi_2023.jpg',
    description: 'Commemorative 2023 edition highlighting campus architecture, traditional folk arts, NSS/NCC camps, and departmental annual reviews.',
    isFeatured: false,
    isPublic: true,
    docType: 'Magazine',
    type: 'Magazine',
    views: 420,
    downloads: 190
  },
  {
    title: 'Baisakhi Annual Magazine Souvenir',
    category: 'E-Magazine & Publications',
    targetPage: 'magazine',
    year: '2022',
    academicYear: '2021-22',
    volumeIssue: 'Special Heritage Souvenir',
    pdfUrl: 'https://drive.google.com/file/d/18_jD2-pkzvh6KRGnkEHntfDJzawa1FJk/preview',
    link: 'https://drive.google.com/file/d/18_jD2-pkzvh6KRGnkEHntfDJzawa1FJk/preview',
    coverImage: '/images/magazines/baisakhi_annual.jpg',
    description: 'The Guru Nanak College Annual Magazine souvenir edition featuring faculty accomplishments, sports victories, and creative literature.',
    isFeatured: false,
    isPublic: true,
    docType: 'Magazine',
    type: 'Magazine',
    views: 380,
    downloads: 160
  }
];

async function seed() {
  const colRef = db.collection('pdfReports');
  const snap = await colRef.get();
  console.log(`Current documents in pdfReports: ${snap.size}`);

  // Find existing magazines to update or delete outdated test ones
  for (const mag of magazinesToSeed) {
    const existingDoc = snap.docs.find(d => {
      const data = d.data();
      return (data.year === mag.year && (data.targetPage === 'magazine' || data.category?.includes('Magazine'))) ||
             (data.title?.toLowerCase() === mag.title.toLowerCase());
    });

    if (existingDoc) {
      console.log(`Updating existing doc: ${existingDoc.id} (${mag.title})`);
      await existingDoc.ref.update({
        ...mag,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    } else {
      console.log(`Adding new doc: ${mag.title}`);
      await colRef.add({
        ...mag,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }
  }

  console.log('Seeding completed successfully!');
}

seed().catch(console.error).finally(() => process.exit(0));
