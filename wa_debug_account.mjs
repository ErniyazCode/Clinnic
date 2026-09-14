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
const phoneNumberId = envMap.PHONE_NUMBER_ID || '1055384357659254';

if (!accessToken) {
  console.error('Token not found in .env');
  process.exit(1);
}

const headers = { Authorization: `Bearer ${accessToken}` };

async function getJson(url) {
  const res = await fetch(url, { headers });
  const text = await res.text();
  let payload = null;
  try {
    payload = JSON.parse(text);
  } catch {
    payload = { raw: text };
  }
  return { ok: res.ok, status: res.status, payload };
}

const phoneInfo = await getJson(`https://graph.facebook.com/v25.0/${phoneNumberId}?fields=id,display_phone_number,verified_name,quality_rating`);
console.log('PHONE_INFO', JSON.stringify(phoneInfo, null, 2));

const wabaLink = await getJson(`https://graph.facebook.com/v25.0/${phoneNumberId}/whatsapp_business_account`);
console.log('PHONE_TO_WABA', JSON.stringify(wabaLink, null, 2));
