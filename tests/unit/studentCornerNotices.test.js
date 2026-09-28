// tests/unit/studentCornerNotices.test.js
// Unit tests for Student Corner Notice & Circulars Hub and Admin Style Switcher
import fs from 'node:fs';
import path from 'node:path';

export function runStudentCornerNoticeTests() {
  const results = [];
  const componentPath = path.resolve('src/components/student-corner/StudentCornerNoticeSection.jsx');
  const pagePath = path.resolve('src/pages/StudentCornerPage.jsx');
  const adminTabPath = path.resolve('src/components/admin/tabs/NoticesTab.jsx');

  const assertCheck = (desc, fn) => {
    try {
      fn();
      results.push({ desc, pass: true });
    } catch (err) {
      results.push({ desc: `${desc} — ${err.message}`, pass: false });
    }
  };

  assertCheck('StudentCornerNoticeSection component exists and is accessible', () => {
    if (!fs.existsSync(componentPath)) throw new Error('StudentCornerNoticeSection.jsx must exist');
  });

  assertCheck('StudentCornerNoticeSection exports default component function', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    if (!/export\s+default\s+function\s+StudentCornerNoticeSection/.test(content)) {
      throw new Error('Must export default function');
    }
  });

  assertCheck('StudentCornerNoticeSection supports all 3 selectable styles (feed, columns, ticker_modal)', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    if (!content.includes('renderFeedStyle')) throw new Error('Missing renderFeedStyle');
    if (!content.includes('renderColumnsStyle')) throw new Error('Missing renderColumnsStyle');
    if (!content.includes('renderTickerModalStyle')) throw new Error('Missing renderTickerModalStyle');
  });

  assertCheck('StudentCornerNoticeSection integrates multi-source notices (notices, events, announcements, drive)', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    if (!content.includes('fbNotices')) throw new Error('Must process Firestore notices');
    if (!content.includes('driveNotices')) throw new Error('Must process Google Drive circulars');
    if (!content.includes('fbEvents')) throw new Error('Must process Campus Events');
    if (!content.includes('fbAnnouncements')) throw new Error('Must process Announcements');
  });

  assertCheck('StudentCornerNoticeSection includes PDFModal and WhatsApp share capabilities', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    if (!content.includes('PDFModal')) throw new Error('Must include PDFModal for 1-click preview');
    if (!content.includes('api.whatsapp.com')) throw new Error('Must support WhatsApp sharing');
  });

  assertCheck('StudentCornerPage.jsx imports and mounts StudentCornerNoticeSection', () => {
    const content = fs.readFileSync(pagePath, 'utf8');
    if (!content.includes("import StudentCornerNoticeSection from '../components/student-corner/StudentCornerNoticeSection'")) {
      throw new Error('Must import component');
    }
    if (!/<StudentCornerNoticeSection\s+noticeStyle=\{noticeStyle\}\s*\/>/.test(content)) {
      throw new Error('Must mount component with noticeStyle prop');
    }
  });

  assertCheck('StudentCornerPage.jsx listens for studentCornerNoticeStyle settings in real-time', () => {
    const content = fs.readFileSync(pagePath, 'utf8');
    if (!content.includes('studentCornerNoticeStyle')) throw new Error('Must maintain noticeStyle state');
    if (!content.includes('gnc_settings_updated')) throw new Error('Must listen to zero-lag custom event');
  });

  assertCheck('NoticesTab.jsx provides interactive Student Corner Notice Style switcher', () => {
    const content = fs.readFileSync(adminTabPath, 'utf8');
    if (!content.includes('Student Corner Hub — Notice Board Display Style')) {
      throw new Error('Must render title for style switcher');
    }
    if (!content.includes('handleUpdateNoticeStyle')) {
      throw new Error('Must provide handler to update notice style');
    }
    if (!content.includes('studentCornerNoticeStyle')) {
      throw new Error('Must persist studentCornerNoticeStyle to Firestore settings/site');
    }
  });

  return results;
}
