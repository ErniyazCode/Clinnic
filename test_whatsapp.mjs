import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем текущую директорию
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Читаем .env файл
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const accessToken = envContent.match(/API-WHATSAPP:\s*(.+)/)?.[1]?.trim();

if (!accessToken) {
  console.error('❌ Error: API token not found in .env');
  process.exit(1);
}

console.log('✓ API token loaded from .env');
console.log('Testing WhatsApp API...\n');

// Параметры
const phoneNumberId = '1055384357659254';
const toNumber = '+77761787977'; // Ваш номер
const message = 'Hello! This is a test message from WhatsApp API.';

// Данные сообщения
const messageData = JSON.stringify({
  messaging_product: 'whatsapp',
  to: toNumber,
  type: 'text',
  text: {
    preview_url: false,
    body: message
  }
});

console.log('📤 Sending request to WhatsApp API...');
console.log(`   To: ${toNumber}`);
console.log(`   Message: ${message}\n`);

// Опции для HTTPS запроса
const options = {
  hostname: 'graph.facebook.com',
  port: 443,
  path: `/v22.0/${phoneNumberId}/messages`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(messageData)
  }
};

// Отправляем запрос
const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`\n📊 Response Status: ${res.statusCode}`);
    console.log('📋 Response Headers:', JSON.stringify(res.headers, null, 2));
    
    try {
      const parsedData = JSON.parse(data);
      console.log('\n✅ Response Body:', JSON.stringify(parsedData, null, 2));
      
      if (res.statusCode === 200) {
        console.log('\n✅ SUCCESS! Message sent successfully!');
        console.log(`   Message ID: ${parsedData.messages?.[0]?.id}`);
      } else {
        console.log('\n❌ ERROR! Check the response above for details');
      }
    } catch (e) {
      console.log('\n📝 Response Body (raw):', data);
    }
  });
});

req.on('error', (err) => {
  console.error('❌ Request Error:', err);
  process.exit(1);
});

// Отправляем данные
req.write(messageData);
req.end();
