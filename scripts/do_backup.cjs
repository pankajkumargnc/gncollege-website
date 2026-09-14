const { execSync } = require('child_process');
const fs = require('fs');

const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const timestamp = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()) + '_' + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());

const src = 'D:\\New folder\\Working\\gnc-college\\gnc-college';
const dst = 'D:\\New folder\\Working\\gnc-college\\gnc-college-backup-' + timestamp;

console.log('Starting full project backup...');
console.log('Source: ' + src);
console.log('Destination: ' + dst);

const startTime = Date.now();
try {
  execSync('robocopy "' + src + '" "' + dst + '" /E /MT:16 /R:1 /W:1 /NFL /NDL /NP /NJH /NJS', { stdio: 'inherit' });
  console.log('Backup completed successfully.');
} catch (e) {
  if (e.status >= 0 && e.status <= 7) {
    console.log('Backup completed successfully (robocopy exit code: ' + e.status + ').');
  } else {
    console.error('Robocopy failed with code: ' + e.status);
    process.exit(1);
  }
}

const duration = ((Date.now() - startTime) / 1000).toFixed(1);
console.log('Time taken: ' + duration + 's');

const files = fs.readdirSync(dst);
console.log('Backup destination items count: ' + files.length);
console.log('Items: ' + files.join(', '));
