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
const toNumber = String(envMap.WHATSAPP_TO_NUMBER || '787757401405').replace(/\D/g, '');

if (!accessToken) {
  console.error('Missing API_WHATSAPP/API-WHATSAPP in .env');
  process.exit(1);
}

async function sendText() {
  const body = {
    messaging_product: 'whatsapp',
    to: toNumber,
    type: 'text',
    text: {
      preview_url: false,
      body: `Lead test ${new Date().toISOString()}`
    }
  };

  const res = await fetch(`https://graph.facebook.com/v25.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const payload = await res.json();
  return { ok: res.ok, status: res.status, payload };
}

async function sendTemplate() {
  const body = {
    messaging_product: 'whatsapp',
    to: toNumber,
    type: 'template',
    template: {
      name: 'hello_world',
      language: { code: 'en_US' }
    }
  };

  const res = await fetch(`https://graph.facebook.com/v25.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const payload = await res.json();
  return { ok: res.ok, status: res.status, payload };
}

async function queryMessageNode(messageId) {
  const encoded = encodeURIComponent(messageId);
  const res = await fetch(`https://graph.facebook.com/v25.0/${encoded}?fields=id,status`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const payload = await res.json();
  return { ok: res.ok, status: res.status, payload };
}

const textResult = await sendText();
console.log('TEXT_RESULT', JSON.stringify(textResult, null, 2));

const templateResult = await sendTemplate();
console.log('TEMPLATE_RESULT', JSON.stringify(templateResult, null, 2));

const messageId = textResult?.payload?.messages?.[0]?.id || templateResult?.payload?.messages?.[0]?.id;
if (messageId) {
  const nodeResult = await queryMessageNode(messageId);
  console.log('MESSAGE_NODE_RESULT', JSON.stringify(nodeResult, null, 2));
}
