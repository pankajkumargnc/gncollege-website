// tests/unit/dashboardBanner.test.js — Unit tests for Dashboard real-time architecture banner
import fs from 'fs';
import path from 'path';

export function runDashboardBannerTests() {
  const results = [];

  const dashboardPath = path.resolve(process.cwd(), 'src/components/admin/tabs/DashboardTab.jsx');
  const dashboardExists = fs.existsSync(dashboardPath);
  results.push({
    desc: 'DashboardTab.jsx exists and is accessible',
    pass: dashboardExists
  });

  if (!dashboardExists) return results;

  const code = fs.readFileSync(dashboardPath, 'utf8');

  const hasBannerHeading = code.includes('Changes Go Live Instantly') && code.includes('No Deploy Needed');
  results.push({
    desc: 'DashboardTab.jsx contains the "Changes Go Live Instantly — No Deploy Needed" info banner',
    pass: hasBannerHeading
  });

  const hasRealtimeBadge = code.includes('Real-Time Cloud Sync');
  results.push({
    desc: 'DashboardTab.jsx displays "Real-Time Cloud Sync" status badge',
    pass: hasRealtimeBadge
  });

  const hasZapIcon = code.includes('<Zap');
  results.push({
    desc: 'DashboardTab.jsx renders Zap icon for real-time visual indicator',
    pass: hasZapIcon
  });

  const hasHelpfulExplanation = code.includes('Cloud Firestore') && code.includes('zero downtime');
  results.push({
    desc: 'DashboardTab.jsx explains zero-downtime automatic synchronization to college staff',
    pass: hasHelpfulExplanation
  });

  return results;
}
