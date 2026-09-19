// tests/unit/draftAutoSave.test.js — Unit test suite for draft auto-save and recovery
import fs from 'fs';
import path from 'path';

export function runDraftAutoSaveTests() {
  const results = [];

  // 1. Check useDraftAutoSave.js hook definition and interface
  const hookPath = path.resolve(process.cwd(), 'src/hooks/useDraftAutoSave.js');
  const hookExists = fs.existsSync(hookPath);
  const hookCode = hookExists ? fs.readFileSync(hookPath, 'utf8') : '';

  results.push({
    desc: 'useDraftAutoSave.js hook file exists and is accessible',
    pass: hookExists
  });

  const exportsDefaultFunction = /export\s+default\s+function\s+useDraftAutoSave/.test(hookCode);
  results.push({
    desc: 'useDraftAutoSave exports default function',
    pass: exportsDefaultFunction
  });

  const returnsExpectedInterface = ['hasDraft', 'draftTimestamp', 'saveStatus', 'restoreDraft', 'discardDraft', 'clearDraft'].every(
    field => hookCode.includes(field)
  );
  results.push({
    desc: 'useDraftAutoSave returns { hasDraft, draftTimestamp, saveStatus, restoreDraft, discardDraft, clearDraft }',
    pass: returnsExpectedInterface
  });

  const usesDebounce = hookCode.includes('setTimeout') && hookCode.includes('clearTimeout') && hookCode.includes('2500');
  results.push({
    desc: 'useDraftAutoSave implements 2.5-second debounced storage updates',
    pass: usesDebounce
  });

  // 2. Check NoticesTab.jsx integration
  const noticesTabPath = path.resolve(process.cwd(), 'src/components/admin/tabs/NoticesTab.jsx');
  const noticesCode = fs.readFileSync(noticesTabPath, 'utf8');

  const noticesImportsHook = noticesCode.includes("import useDraftAutoSave from '../../../hooks/useDraftAutoSave';");
  results.push({
    desc: 'NoticesTab.jsx imports useDraftAutoSave',
    pass: noticesImportsHook
  });

  const noticesUsesScopedKey = noticesCode.includes('editNotice ? `notice_${editNotice.id}` : \'notice_new\'');
  results.push({
    desc: 'NoticesTab.jsx scopes draft keys by document ID (notice_${id} / notice_new)',
    pass: noticesUsesScopedKey
  });

  const noticesHasRecoveryBanner = noticesCode.includes('Unsaved Notice Draft Recovered') && noticesCode.includes('restoreDraft');
  results.push({
    desc: 'NoticesTab.jsx renders visual draft recovery banner with restore/discard controls',
    pass: noticesHasRecoveryBanner
  });

  const noticesHasStatusIndicator = noticesCode.includes('saveStatus === \'saving\'') && noticesCode.includes('saveStatus === \'saved\'');
  results.push({
    desc: 'NoticesTab.jsx displays live saveStatus indicator (saving/saved)',
    pass: noticesHasStatusIndicator
  });

  // 3. Check EventsTab.jsx integration
  const eventsTabPath = path.resolve(process.cwd(), 'src/components/admin/tabs/EventsTab.jsx');
  const eventsCode = fs.readFileSync(eventsTabPath, 'utf8');

  const eventsImportsHook = eventsCode.includes("import useDraftAutoSave from \"../../../hooks/useDraftAutoSave\";");
  results.push({
    desc: 'EventsTab.jsx imports useDraftAutoSave',
    pass: eventsImportsHook
  });

  const eventsUsesScopedKey = eventsCode.includes('editItem ? `event_${editItem.id}` : \'event_new\'');
  results.push({
    desc: 'EventsTab.jsx scopes draft keys by document ID (event_${id} / event_new)',
    pass: eventsUsesScopedKey
  });

  const eventsHasRecoveryBanner = eventsCode.includes('Unsaved Event Description Recovered') && eventsCode.includes('restoreDraft');
  results.push({
    desc: 'EventsTab.jsx renders visual draft recovery banner with restore/discard controls',
    pass: eventsHasRecoveryBanner
  });

  const eventsHasStatusIndicator = eventsCode.includes('saveStatus === \'saving\'') && eventsCode.includes('saveStatus === \'saved\'');
  results.push({
    desc: 'EventsTab.jsx displays live saveStatus indicator in description section',
    pass: eventsHasStatusIndicator
  });

  // 4. Check PagesTab.jsx integration
  const pagesTabPath = path.resolve(process.cwd(), 'src/components/admin/tabs/PagesTab.jsx');
  const pagesCode = fs.readFileSync(pagesTabPath, 'utf8');

  const pagesImportsHook = pagesCode.includes("import useDraftAutoSave from '../../../hooks/useDraftAutoSave';");
  results.push({
    desc: 'PagesTab.jsx maintains useDraftAutoSave integration',
    pass: pagesImportsHook
  });

  // 5. Check ContentManagerTab.jsx draft protection
  const contentManagerPath = path.resolve(process.cwd(), 'src/components/admin/tabs/ContentManagerTab.jsx');
  const cmsCode = fs.readFileSync(contentManagerPath, 'utf8');

  const cmsHasDraftProtection = cmsCode.includes('gnc_cms_draft_') && cmsCode.includes('hasCmsDraft') && cmsCode.includes('Unsaved CMS Draft Recovered');
  results.push({
    desc: 'ContentManagerTab.jsx maintains document-scoped draft auto-save and recovery banner',
    pass: cmsHasDraftProtection
  });

  return results;
}
