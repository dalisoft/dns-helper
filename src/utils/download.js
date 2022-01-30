const fs = require('fs');
const https = require('https');

function download(url) {
  return new Promise((resolve, reject) => {
    const buffers = [];

    const request = https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }

      response.on('data', (chunk) => {
        buffers.push(chunk);
      });
      response.on('error', reject);
      response.on('end', () => {
        resolve(Buffer.concat(buffers).toString('utf-8'));
        buffers.length = 0;
      });
    });

    request.end();
  });
}

module.exports = download;
