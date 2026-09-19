// scripts/runUnitTests.js — Fast, zero-config ESM test runner for unit test suites
import { runSeoTests } from '../tests/unit/seoManager.test.js';
import { runCacheTests } from '../tests/unit/cachedFetch.test.js';
import { runDocumentRequestTests } from '../tests/unit/documentRequest.test.js';
import { runImageProcessorTests } from '../tests/unit/imageProcessor.test.js';
import { runFirestoreRulesTests } from '../tests/unit/firestoreRules.test.js';
import { runDriveSecurityTests } from '../tests/unit/driveSecurity.test.js';
import { runBackupFunctionTests } from '../tests/unit/backupFunction.test.js';
import { runChatbotIntegrationTests } from '../tests/unit/chatbotIntegration.test.js';
import { runDraftAutoSaveTests } from '../tests/unit/draftAutoSave.test.js';
import { runDashboardBannerTests } from '../tests/unit/dashboardBanner.test.js';
import { runDeadCodeAuditTests } from '../tests/unit/deadCodeAudit.test.js';

console.log('\n🧪 Running GNC College Unit Test Suite...\n');

let total = 0;
let passed = 0;
let failed = 0;

function reportSuite(suiteName, results) {
  console.log(`▶ ${suiteName}`);
  for (const r of results) {
    total++;
    if (r.pass) {
      passed++;
      console.log(`  ✅ PASS: ${r.desc}`);
    } else {
      failed++;
      console.error(`  ❌ FAIL: ${r.desc}`);
    }
  }
  console.log('');
}

reportSuite('Dynamic SEO Manager Tests', runSeoTests());
reportSuite('Persistent Cache & Payload Tests', runCacheTests());
reportSuite('Student Document Request Hub Tests', runDocumentRequestTests());
reportSuite('Client-Side Image Processor & Dimension Tests', runImageProcessorTests());
reportSuite('Firestore Security Rules Matrix Tests', runFirestoreRulesTests());
reportSuite('Google Drive & Asset Security Tests', runDriveSecurityTests());
reportSuite('Automated Cloud Backup Function Tests', runBackupFunctionTests());
reportSuite('AI Chatbot & Server Proxy Integration Tests', runChatbotIntegrationTests());
reportSuite('Draft Auto-Save & Recovery Tests', runDraftAutoSaveTests());
reportSuite('Dashboard Real-Time Architecture Banner Tests', runDashboardBannerTests());
reportSuite('Dead Code Elimination & Audit Tests', runDeadCodeAuditTests());

console.log(`══════════════════════════════════════════`);
console.log(`Results: ${passed}/${total} Passed (${failed} Failed)`);
console.log(`══════════════════════════════════════════\n`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
