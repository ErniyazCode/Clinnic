import fs from 'fs';

const env = Object.fromEntries(
  fs.readFileSync('.env', 'utf8')
    .split(/\r?\n/)
    .filter(l => l && !l.startsWith('#'))
    .map(l => {
      const separator = l.includes('=') ? '=' : ':';
      const idx = l.indexOf(separator);
      return idx === -1 ? [l, ''] : [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const token = env['API_WHATSAPP'] || env['API-WHATSAPP'];
const phoneId = env['PHONE_NUMBER_ID'] || '1055384357659254';

async function test(name, lang) {
  const url = `https://graph.facebook.com/v25.0/${phoneId}/messages`;
  const body = {
    messaging_product: 'whatsapp',
    to: (env['WHATSAPP_TO_NUMBER'] || '787757401405').replace(/\D/g, ''),
    type: 'template',
    template: {
      name,
      language: { code: lang },
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: 'Тест' },
            { type: 'text', text: '+77771234567' }
          ]
        }
      ]
    }
  };

  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await r.json();
  console.log(`Test ${name} (${lang}):`, data);
}

async function run() {
  await test('user_lead', 'ru');
  await test('user_lead', 'ru_RU');
  await test('user_lead', 'en');
  await test('user_lead', 'en_US');
  
  await test('user-lead', 'ru'); // Hyphen
}
run();