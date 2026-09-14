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
const wabaId = envMap.WHATSAPP_BUSINESS_ACCOUNT_ID || '4364695427111700';

if (!accessToken) {
  console.error('Missing API_WHATSAPP/API-WHATSAPP in .env');
  process.exit(1);
}

const url = `https://graph.facebook.com/v25.0/${wabaId}/message_templates?limit=100&fields=name,status,language,category,id`;
const response = await fetch(url, {
  headers: { Authorization: `Bearer ${accessToken}` }
});

const payload = await response.json();
console.log('HTTP:', response.status);
console.log(JSON.stringify(payload, null, 2));
