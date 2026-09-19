// tests/unit/driveSecurity.test.js
// Unit tests verifying that Google Drive URLs do not expose Google API keys
import fs from 'fs';
import path from 'path';
import { driveToDirectUrl, driveToThumbnailUrl } from '../../src/utils/resolver.js';

export function runDriveSecurityTests() {
  const results = [];

  // 1. Resolver tests
  const testId = '1AbCdEfGhIjKlMnOpQrStUvWxYz123456';
  const directUrl = driveToDirectUrl(testId);
  results.push({
    desc: 'driveToDirectUrl produces high-speed CDN URL (lh3.googleusercontent.com/d/ID=w1200)',
    pass: directUrl === `https://lh3.googleusercontent.com/d/${testId}=w1200`
  });

  const thumbUrl = driveToThumbnailUrl(testId, 200);
  results.push({
    desc: 'driveToThumbnailUrl produces properly sized thumbnail CDN URL',
    pass: thumbUrl === `https://lh3.googleusercontent.com/d/${testId}=w200`
  });

  results.push({
    desc: 'driveToDirectUrl does not contain any API key parameter',
    pass: !directUrl.includes('key=') && !directUrl.includes('alt=media')
  });

  results.push({
    desc: 'driveToDirectUrl gracefully handles null or empty input',
    pass: driveToDirectUrl(null) === '' && driveToDirectUrl('') === ''
  });

  // 2. DriveTab.jsx source security scan
  const driveTabPath = path.resolve(process.cwd(), 'src/components/admin/tabs/DriveTab.jsx');
  const driveTabContent = fs.readFileSync(driveTabPath, 'utf8');

  // Verify no `alt=media&key=` in DriveTab.jsx
  const hasAltMediaApiKey = /alt=media&key=/.test(driveTabContent);
  results.push({
    desc: 'DriveTab.jsx does NOT embed alt=media&key= in any image URLs',
    pass: !hasAltMediaApiKey
  });

  // Verify driveToDirectUrl is used for publish
  const usesDirectUrlForPublish = driveTabContent.includes('driveToDirectUrl(file.id)');
  results.push({
    desc: 'DriveTab.jsx uses driveToDirectUrl for publishing images',
    pass: usesDirectUrlForPublish
  });

  // Verify repairLiveImages purges exposed keys
  const repairPurgesKeys = driveTabContent.includes("d.image.includes('key=')") && driveTabContent.includes('secureDirectUrl');
  results.push({
    desc: 'DriveTab.jsx handleRepairLiveImages detects and purges exposed keys from Firestore docs',
    pass: repairPurgesKeys
  });

  // Verify thumbnail img src does not embed API_KEY
  const thumbnailEmbedsKey = /<img[^>]*src=\{API_KEY \?/.test(driveTabContent);
  results.push({
    desc: 'DriveTab.jsx thumbnail preview does NOT embed API_KEY in img src',
    pass: !thumbnailEmbedsKey
  });

  return results;
}
