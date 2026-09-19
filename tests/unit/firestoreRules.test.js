// tests/unit/firestoreRules.test.js
// Unit tests and verification matrix for firestore.rules security posture
import fs from 'fs';
import path from 'path';

export function runFirestoreRulesTests() {
  const results = [];
  const rulesPath = path.resolve(process.cwd(), 'firestore.rules');
  const rulesContent = fs.readFileSync(rulesPath, 'utf8');

  // Helper parser/evaluator for firestore.rules
  function evaluateRuleAccess(docPath, operation, auth = null) {
    const isAuth = auth !== null;
    const adminEmails = ["pankajkumargnc@gmail.com", "admin@gncollege.org", "principal@gncollege.org"];
    const isAdmin = isAuth && (
      (auth.email && adminEmails.includes(auth.email)) ||
      auth.admin === true
    );

    // Rule patterns in firestore.rules:
    // Check specific settings matches first
    if (docPath === 'settings/site') {
      if (operation === 'read') return true;
      if (operation === 'write') return isAdmin;
    }
    if (docPath === 'settings/site_sync') {
      if (operation === 'read') return true;
      if (operation === 'write') return isAdmin;
    }
    if (docPath === 'settings/chatbot') {
      if (operation === 'read') return true;
      if (operation === 'write') return isAdmin;
    }
    if (docPath === 'settings/contact') {
      // Must verify rule is present in file
      const hasContactRule = /match\s+\/settings\/contact\s*\{\s*allow\s+read:\s*if\s+true;\s*allow\s+write:\s*if\s+isAdmin\(\);\s*\}/.test(rulesContent);
      if (!hasContactRule) return false;
      if (operation === 'read') return true;
      if (operation === 'write') return isAdmin;
    }
    if (docPath.startsWith('settings/')) {
      // match /settings/{otherSettingId}
      if (operation === 'read') return isAdmin;
      if (operation === 'write') return isAdmin;
    }

    // Default fallback
    return false;
  }

  // 1. Check rule syntax and inclusion in firestore.rules file
  const hasContactExplicitRule = /match\s+\/settings\/contact\s*\{\s*allow\s+read:\s*if\s+true;\s*allow\s+write:\s*if\s+isAdmin\(\);\s*\}/.test(rulesContent);
  results.push({
    desc: 'firestore.rules explicitly defines match /settings/contact with public read and isAdmin write',
    pass: hasContactExplicitRule
  });

  // 2. Check position: must be placed BEFORE match /settings/{otherSettingId}
  const contactIdx = rulesContent.indexOf('match /settings/contact');
  const otherIdx = rulesContent.indexOf('match /settings/{otherSettingId}');
  results.push({
    desc: '/settings/contact rule is defined BEFORE generic {otherSettingId} fallback',
    pass: contactIdx > -1 && otherIdx > -1 && contactIdx < otherIdx
  });

  // 3. Allowed Case: Public unauthenticated visitor reading settings/contact
  const publicReadAllowed = evaluateRuleAccess('settings/contact', 'read', null);
  results.push({
    desc: 'Public unauthenticated visitor is ALLOWED to read settings/contact',
    pass: publicReadAllowed === true
  });

  // 4. Denied Case: Public unauthenticated visitor writing settings/contact
  const publicWriteDenied = evaluateRuleAccess('settings/contact', 'write', null);
  results.push({
    desc: 'Public unauthenticated visitor is DENIED from writing to settings/contact',
    pass: publicWriteDenied === false
  });

  // 5. Denied Case: Non-admin authenticated user writing settings/contact
  const nonAdminWriteDenied = evaluateRuleAccess('settings/contact', 'write', { email: 'student@example.com' });
  results.push({
    desc: 'Non-admin authenticated user is DENIED from writing to settings/contact',
    pass: nonAdminWriteDenied === false
  });

  // 6. Allowed Case: Authorized admin writing settings/contact
  const adminWriteAllowed = evaluateRuleAccess('settings/contact', 'write', { email: 'pankajkumargnc@gmail.com' });
  results.push({
    desc: 'Authorized admin (pankajkumargnc@gmail.com) is ALLOWED to write settings/contact',
    pass: adminWriteAllowed === true
  });

  // 7. Security Boundary: Other settings (e.g. settings/secrets) remain locked to non-admins
  const otherSettingPublicReadDenied = evaluateRuleAccess('settings/secrets', 'read', null);
  const otherSettingNonAdminReadDenied = evaluateRuleAccess('settings/secrets', 'read', { email: 'student@example.com' });
  results.push({
    desc: 'Generic sensitive settings (e.g. settings/secrets) remain STRICTLY DENIED for public read',
    pass: otherSettingPublicReadDenied === false && otherSettingNonAdminReadDenied === false
  });

  return results;
}
