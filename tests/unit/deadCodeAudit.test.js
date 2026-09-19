// tests/unit/deadCodeAudit.test.js — Unit test verifying removal of confirmed-dead files
import fs from 'fs';
import path from 'path';

export function runDeadCodeAuditTests() {
  const results = [];

  const firestoreQueryHookPath = path.resolve(process.cwd(), 'src/hooks/useFirestoreQuery.js');
  const errorLoggerUtilPath = path.resolve(process.cwd(), 'src/utils/errorLogger.js');

  const firestoreQueryExists = fs.existsSync(firestoreQueryHookPath);
  results.push({
    desc: 'Dead file src/hooks/useFirestoreQuery.js is permanently removed',
    pass: !firestoreQueryExists
  });

  const errorLoggerExists = fs.existsSync(errorLoggerUtilPath);
  results.push({
    desc: 'Dead file src/utils/errorLogger.js is permanently removed',
    pass: !errorLoggerExists
  });

  // Verify no active source file in src/ imports either deleted module
  function scanDir(dir, pattern, matches = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const fullPath = path.join(dir, e.name);
      if (e.isDirectory()) {
        scanDir(fullPath, pattern, matches);
      } else if (/\.(jsx?|tsx?)$/.test(e.name)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (pattern.test(content)) {
          matches.push(fullPath);
        }
      }
    }
    return matches;
  }

  const srcDir = path.resolve(process.cwd(), 'src');
  const orphanQueryImports = scanDir(srcDir, /from\s+['"][^'"]*useFirestoreQuery['"]/);
  results.push({
    desc: 'Zero active imports of useFirestoreQuery exist across src/',
    pass: orphanQueryImports.length === 0
  });

  const orphanErrorLoggerImports = scanDir(srcDir, /from\s+['"][^'"]*errorLogger['"]/);
  results.push({
    desc: 'Zero active imports of errorLogger exist across src/',
    pass: orphanErrorLoggerImports.length === 0
  });

  return results;
}
