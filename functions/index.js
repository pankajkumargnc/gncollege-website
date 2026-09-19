// functions/index.js — Guru Nanak College Cloud Functions
// ═══════════════════════════════════════════════════════════════════
// 1. geminiProxy: HTTPS Callable function for zero-client API key
// 2. onContactFormSubmitted: Firestore trigger for admission inquiries
// 3. scheduledFirestoreBackup: Weekly automated backup export
// ═══════════════════════════════════════════════════════════════════

import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import firestorePkg from '@google-cloud/firestore';

const { v1 } = firestorePkg;

if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();

/**
 * 1. geminiProxy — Secure AI Chatbot Proxy
 * Keeps GEMINI_API_KEY completely on server-side environment.
 */
export const geminiProxy = onCall(
  {
    cors: true,
    region: 'asia-south1',
    maxInstances: 10,
    secrets: ['GEMINI_API_KEY']
  },
  async (request) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new HttpsError('failed-precondition', 'GEMINI_API_KEY is not configured on server.');
    }

    const { prompt, systemInstruction, history } = request.data || {};
    if (!prompt || typeof prompt !== 'string') {
      throw new HttpsError('invalid-argument', 'Prompt string is required.');
    }

    // Prepare payload
    const contents = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text || '' }]
        });
      }
    }
    contents.push({ role: 'user', parts: [{ text: prompt }] });

    const body = {
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024
      }
    };
    if (systemInstruction) {
      body.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    try {
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      );

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Gemini API responded with status ${resp.status}: ${errText}`);
      }

      const data = await resp.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return { success: true, reply };
    } catch (err) {
      console.error('[geminiProxy] Error:', err);
      throw new HttpsError('internal', err.message || 'AI generation failed.');
    }
  }
);

/**
 * 2. onContactFormSubmitted — Firestore Trigger for new inquiries
 */
export const onContactFormSubmitted = onDocumentCreated(
  {
    document: 'inquiries/{docId}',
    region: 'asia-south1'
  },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const data = snap.data();
    console.log(`[Contact] New inquiry received from: ${data.name || 'Anonymous'} (${data.email || 'No email'}) - Subject: ${data.subject || 'General Inquiry'}`);
    
    // Log audit entry
    await db.collection('adminLogs').add({
      action: 'NEW_CONTACT_INQUIRY',
      timestamp: new Date().toISOString(),
      inquiryId: event.params.docId,
      name: data.name || 'Anonymous',
      email: data.email || '',
      subject: data.subject || 'General Inquiry'
    });
  }
);

/**
 * 3. scheduledFirestoreBackup — Weekly automated backup
 * Runs every Sunday at 02:00 AM IST
 * Exports all Firestore collections to default Firebase Storage bucket under /backups/
 */
export const scheduledFirestoreBackup = onSchedule(
  {
    schedule: '0 2 * * 0',
    timeZone: 'Asia/Kolkata',
    region: 'asia-south1',
    timeoutSeconds: 300,
    memory: '512MiB'
  },
  async () => {
    console.log('[Backup] Initiating weekly scheduled Firestore database export...');
    try {
      const client = new v1.FirestoreAdminClient();
      const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT || 'gnc-college-web';
      const databaseName = client.databasePath(projectId, '(default)');
      const bucket = process.env.BACKUP_STORAGE_BUCKET || `${projectId}.appspot.com` || `${projectId}.firebasestorage.app`;
      const timestampStr = new Date().toISOString().replace(/[:.]/g, '-');
      const outputUriPrefix = `gs://${bucket}/backups/${timestampStr}`;

      console.log(`[Backup] Exporting ${databaseName} to ${outputUriPrefix}...`);
      const [operation] = await client.exportDocuments({
        name: databaseName,
        outputUriPrefix,
        collectionIds: [] // Exports all collections
      });

      console.log(`[Backup] Export operation successfully initiated: ${operation?.name || 'QUEUED'}`);
      await db.collection('adminLogs').add({
        action: 'SCHEDULED_WEEKLY_BACKUP_INITIATED',
        timestamp: new Date().toISOString(),
        operationName: operation?.name || '',
        outputUriPrefix,
        status: 'SUCCESS'
      });
    } catch (err) {
      console.error('[Backup] Scheduled backup export failed:', err);
      await db.collection('adminLogs').add({
        action: 'SCHEDULED_WEEKLY_BACKUP_FAILED',
        timestamp: new Date().toISOString(),
        error: err.message,
        status: 'ERROR'
      });
    }
  }
);
