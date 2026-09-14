import fs from 'fs';

const env = Object.fromEntries(
  fs.readFileSync('.env', 'utf8')
    .split('\n')
    .filter(l => l && !l.startsWith('#'))
    .map(l => {
      const idx = l.indexOf('=');
      return idx === -1 ? [l, ''] : [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const token = env['API_WHATSAPP'] || env['API-WHATSAPP'];
const wabaId = env['WHATSAPP_BUSINESS_ACCOUNT_ID'] || '4364695427111700';

async function run() {
  const res = await fetch(`https://graph.facebook.com/v25.0/${wabaId}/message_templates?limit=100`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

run();