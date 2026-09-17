// scripts/runUnitTests.js — Fast, zero-config ESM test runner for unit test suites
import { runSeoTests } from '../tests/unit/seoManager.test.js';
import { runCacheTests } from '../tests/unit/cachedFetch.test.js';
import { runDocumentRequestTests } from '../tests/unit/documentRequest.test.js';
import { runImageProcessorTests } from '../tests/unit/imageProcessor.test.js';

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

console.log(`══════════════════════════════════════════`);
console.log(`Results: ${passed}/${total} Passed (${failed} Failed)`);
console.log(`══════════════════════════════════════════\n`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
