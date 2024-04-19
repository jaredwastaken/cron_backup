const fs = require('fs');
const path = require('path');
const { uploadToGoogleDrive } = require('./gdrive');

const srcPath = path.join(
  '/home',
  'pi',
  'Desktop',
  'blazr',
  'db',
  'blazr-dev.db'
);
const destPath = path.join(
  '/home',
  'pi',
  'Desktop',
  'auto_backups',
  'backup',
  'blazr'
);

if (!fs.existsSync(destPath)) {
  fs.mkdirSync(destPath, { recursive: true });
}

const currentDate = new Date();
const dateString = `blazr-prod-${currentDate.getFullYear()}-${String(
  currentDate.getMonth() + 1
).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

const destFilePath = path.join(destPath, `${dateString}.db`);
fs.copyFileSync(srcPath, destFilePath);

console.log(`${dateString} stored successfully.`);

uploadToGoogleDrive({ dbPath: destFilePath, fileName: dateString });
