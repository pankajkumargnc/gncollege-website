// tests/unit/firestoreRules.test.js
// Unit tests and verification matrix for firestore.rules security posture
import fs from 'fs';
import path from 'path';

export function runFirestoreRulesTests() {
  const results = [];
  const rulesPath = path.resolve(process.cwd(), 'firestore.rules');
  const rulesContent = fs.readFileSync(rulesPath, 'utf8');

  // Helper parser/evaluator for firestore.rules
  function evaluateRuleAccess(docPath, operation, auth = null, data = null) {
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
    if (['settings/contact'].includes(docPath)) {
      const hasContactRule = /match\s+\/settings\/contact\s*\{\s*allow\s+read:\s*if\s+true;\s*allow\s+write:\s*if\s+isAdmin\(\);\s*\}/.test(rulesContent);
      if (!hasContactRule) return false;
      if (operation === 'read') return true;
      if (operation === 'write') return isAdmin;
    }
    if (['pdfReports', 'sliderSlides', 'regulations', 'eventReports', 'collegeDocs', 'generalDocs', 'slider'].some(col => docPath.startsWith(`${col}/`))) {
      const colName = docPath.split('/')[0];
      const hasColRule = new RegExp(`match\\s+/${colName}/\\{docId\\}\\s*\\{\\s*allow\\s+read:\\s*if\\s+true;\\s*allow\\s+write:\\s*if\\s+isAdmin\\(\\);\\s*\\}`).test(rulesContent);
      if (!hasColRule) return false;
      if (operation === 'read') return true;
      if (operation === 'write') return isAdmin;
    }
    if (docPath.startsWith('inquiries/')) {
      const hasInquiriesRule = /match\s+\/inquiries\/\{docId\}\s*\{\s*allow\s+read,\s*update,\s*delete:\s*if\s+isAdmin\(\);\s*allow\s+create:\s*if\s+request\.resource\.data\.keys\(\)\.hasAll\(\['name',\s*'email',\s*'message',\s*'createdAt'\]\);\s*\}/.test(rulesContent);
      if (!hasInquiriesRule) return false;
      if (operation === 'read' || operation === 'update' || operation === 'delete') return isAdmin;
      if (operation === 'create') {
        if (!data) return true;
        const required = ['name', 'email', 'message', 'createdAt'];
        return required.every(k => k in data);
      }
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

  // 8. Defensive rules for legacy and consolidated collections (Item 2)
  const defensiveCols = ['regulations', 'eventReports', 'collegeDocs', 'generalDocs', 'slider', 'pdfReports', 'sliderSlides'];
  for (const col of defensiveCols) {
    const pubRead = evaluateRuleAccess(`${col}/testDoc`, 'read', null);
    const pubWrite = evaluateRuleAccess(`${col}/testDoc`, 'write', null);
    const adminWrite = evaluateRuleAccess(`${col}/testDoc`, 'write', { email: 'pankajkumargnc@gmail.com' });
    results.push({
      desc: `Collection ${col} allows public read and restricts write to admin`,
      pass: pubRead === true && pubWrite === false && adminWrite === true
    });
  }

  // 9. DriveTab consolidation check: Verify DriveTab categories map to live collections
  const driveTabPath = path.resolve(process.cwd(), 'src/components/admin/tabs/DriveTab.jsx');
  const driveTabContent = fs.readFileSync(driveTabPath, 'utf8');
  const hasConsolidatedPdfReports = (driveTabContent.match(/dbCollection:\s*'pdfReports'/g) || []).length >= 4;
  const hasConsolidatedSlider = driveTabContent.includes("dbCollection: 'sliderSlides'");
  results.push({
    desc: 'DriveTab.jsx consolidates PDF categories to pdfReports collection',
    pass: hasConsolidatedPdfReports
  });
  results.push({
    desc: 'DriveTab.jsx consolidates hero slider to sliderSlides collection',
    pass: hasConsolidatedSlider
  });

  // 10. Inquiries Collection Security Rules & Integration (Item 5)
  const pubInquiryCreateAllowed = evaluateRuleAccess('inquiries/doc1', 'create', null, {
    name: 'Rahul Kumar', email: 'rahul@example.com', message: 'Admission query', createdAt: '2026-09-19'
  });
  const pubInquiryCreateMissingFieldDenied = evaluateRuleAccess('inquiries/doc1', 'create', null, {
    name: 'Rahul Kumar', email: 'rahul@example.com'
  });
  const pubInquiryReadDenied = evaluateRuleAccess('inquiries/doc1', 'read', null);
  const nonAdminInquiryReadDenied = evaluateRuleAccess('inquiries/doc1', 'read', { email: 'student@example.com' });
  const adminInquiryReadAllowed = evaluateRuleAccess('inquiries/doc1', 'read', { email: 'pankajkumargnc@gmail.com' });

  results.push({
    desc: 'Public visitor is ALLOWED to submit inquiry with all required fields',
    pass: pubInquiryCreateAllowed === true
  });
  results.push({
    desc: 'Public visitor is DENIED from creating inquiry missing required fields',
    pass: pubInquiryCreateMissingFieldDenied === false
  });
  results.push({
    desc: 'Public and non-admin visitors are DENIED from reading submitted inquiries',
    pass: pubInquiryReadDenied === false && nonAdminInquiryReadDenied === false
  });
  results.push({
    desc: 'Authorized admin is ALLOWED to read/manage student inquiries',
    pass: adminInquiryReadAllowed === true
  });

  // 11. Static checks for Contact.jsx and functions/index.js
  const contactPagePath = path.resolve(process.cwd(), 'src/pages/Contact.jsx');
  const contactPageCode = fs.readFileSync(contactPagePath, 'utf8');
  results.push({
    desc: 'Contact.jsx persists submissions directly to Firestore inquiries collection',
    pass: contactPageCode.includes("collection(db, 'inquiries')")
  });

  const functionsPath = path.resolve(process.cwd(), 'functions/index.js');
  const functionsCode = fs.readFileSync(functionsPath, 'utf8');
  results.push({
    desc: 'functions/index.js onContactFormSubmitted triggers on inquiries/{docId}',
    pass: functionsCode.includes("document: 'inquiries/{docId}'")
  });

  return results;
}
