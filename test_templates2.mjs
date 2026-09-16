import fs from 'fs';

const env = Object.fromEntries(
  fs.readFileSync('.env', 'utf8')
    .split(/\r?\n/)
    .filter(l => l && !l.startsWith('#'))
    .map(l => {
      const idx = l.indexOf(l.includes('=') ? '=' : ':');
      return idx === -1 ? [l, ''] : [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const token = env['API_WHATSAPP'] || env['API-WHATSAPP'];
const phoneId = env['PHONE_NUMBER_ID'] || '1055384357659254';

async function run() {
  const r = await fetch(`https://graph.facebook.com/v25.0/${phoneId}?fields=name_status,status,quality_rating,name`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await r.json();
  console.log('Phone details:', data);
}
run();