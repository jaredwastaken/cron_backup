const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const fs = require('fs');
const { SECRETS } = require('./sensitive/secrets');

const serviceAccountCredentials = require('./sensitive/backups-420717-7c2f0ec22ad3.json');

async function uploadToGoogleDrive({ dbPath, fileName }) {
  const auth = new GoogleAuth({
    credentials: serviceAccountCredentials,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });
  const drive = google.drive({ version: 'v3', auth });

  const fileMetadata = {
    name: fileName,
    parents: SECRETS.parents,
  };
  const media = {
    mimeType: 'application/octet-stream',
    body: fs.createReadStream(dbPath),
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
    });

    if (response.status == 200) {
      console.log(`File Uploaded Success! ID: ${response.data.id}`);
    } else {
      console.log(`Error! Response: ${response}`);
    }
  } catch (err) {
    console.error('Upload error:', err);
  }
}

module.exports = { uploadToGoogleDrive };
