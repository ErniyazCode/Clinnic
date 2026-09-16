import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

const envMap = Object.fromEntries(
  envContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const separator = line.includes('=') ? '=' : ':';
      const idx = line.indexOf(separator);
      if (idx === -1) return [line, ''];
      return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
    })
);

const accessToken = envMap.API_WHATSAPP || envMap['API-WHATSAPP'];
const phoneNumberId = '1055384357659254';

if (!accessToken) {
  console.error('Token not found in .env');
  process.exit(1);
}

// Бери номер ровно как в Meta, только цифрами
const toNumber = (process.argv[2] || '787757401405').replace(/\D/g, '');

const message = process.argv[3] || 'erni kek';

const body = JSON.stringify({
  messaging_product: 'whatsapp',
  to: toNumber,
  type: 'text',
  text: {
    preview_url: false,
    body: message
  }
});

const options = {
  hostname: 'graph.facebook.com',
  port: 443,
  path: `/v25.0/${phoneNumberId}/messages`,
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('HTTP:', res.statusCode);
    console.log(data);
  });
});

req.on('error', (err) => {
  console.error(err);
});

req.write(body);
req.end();