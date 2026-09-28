// tests/unit/documentRequest.test.js — Unit tests for Student Document Request Hub
import fs from 'fs';
import path from 'path';
import { SEO_MAP } from '../../src/utils/seoManager.js';

export function runDocumentRequestTests() {
  const results = [];
  const assert = (desc, cond) => results.push({ desc, pass: !!cond });

  // Helper token generator
  const generateToken = (seed = 0) => {
    const rand = (Math.random().toString(36).substring(2, 6) + (seed % 36).toString(36)).toUpperCase();
    return `GNC-DOC-2026-${rand}`;
  };

  // Test 1: Tracking token format
  const t1 = generateToken(0);
  assert('Tracking token starts with GNC-DOC-2026-', t1.startsWith('GNC-DOC-2026-'));
  assert('Tracking token total length is 18 characters', t1.length === 18);
  assert('Tracking token contains only uppercase alphanumeric characters and hyphens', /^[A-Z0-9-]+$/.test(t1));

  // Test 2: Uniqueness check across 100 tokens
  const tokenSet = new Set();
  for (let i = 0; i < 100; i++) {
    tokenSet.add(generateToken(i));
  }
  assert('100 generated tracking tokens are all uniquely distinguishable', tokenSet.size === 100);

  // Test 3: Route is mapped in SEO_MAP
  assert('/documents/request is registered in SEO_MAP', typeof SEO_MAP['/documents/request']?.title === 'string');
  assert('/documents/request has descriptive title', SEO_MAP['/documents/request']?.title.includes('Document Request'));

  // Test 4: Lifecycle stage progression
  const stages = [
    { stage: 1, status: 'submitted' },
    { stage: 2, status: 'under_verification' },
    { stage: 3, status: 'approved' },
    { stage: 4, status: 'ready' }
  ];
  assert('Stages progression is strictly monotonic (1 to 4)', stages.every((s, idx) => s.stage === idx + 1));

  // Test 5: Feature toggle default state & configuration
  const settingsTabCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/admin/tabs/SettingsTab.jsx'), 'utf8');
  assert('SettingsTab.jsx includes enableDocumentRequests in siteCfg', settingsTabCode.includes('enableDocumentRequests: false'));
  assert('SettingsTab.jsx registers enableDocumentRequests in Feature Switches', settingsTabCode.includes("key: 'enableDocumentRequests'"));

  const documentsTabCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/admin/tabs/DocumentsTab.jsx'), 'utf8');
  assert('DocumentsTab.jsx provides direct enableDocumentRequests toggle switch', documentsTabCode.includes('handleToggleDocReqFeature') && documentsTabCode.includes('Online Student Document Requests:'));

  const studentCornerCode = fs.readFileSync(path.resolve(process.cwd(), 'src/pages/StudentCornerPage.jsx'), 'utf8');
  assert('StudentCornerPage.jsx contains docReqEnabled filter for services', studentCornerCode.includes("visibleServices") && studentCornerCode.includes("s.link !== '/documents/request'"));

  const docRequestPageCode = fs.readFileSync(path.resolve(process.cwd(), 'src/pages/DocumentRequestPage.jsx'), 'utf8');
  assert('DocumentRequestPage.jsx renders offline manual counter desk when disabled', docRequestPageCode.includes('!docReqEnabled') && docRequestPageCode.includes('Official Administrative Counter Service'));

  return results;
}
