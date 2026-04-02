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

console.log('✓ API token loaded from .env\n');

// Параметры
const phoneNumberId = '1055384357659254';
const whatsappAccountId = '4364695427111700';

// ИЗМЕНИ ЭТО НА ТВОЙ НОМЕР (должен быть в Recipient List)
let toNumber = process.argv[2] || '+77761787977';

// Убедимся, что номер в правильном формате
if (!toNumber.startsWith('+')) {
  toNumber = '+' + toNumber;
}

const message = process.argv[3] || 'Hello! This is a test message from WhatsApp API.';

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📱 WhatsApp API Test Script');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('📊 Configuration:');
console.log(`   Phone Number ID: ${phoneNumberId}`);
console.log(`   WhatsApp Account: ${whatsappAccountId}`);
console.log(`   API Version: v25.0\n`);

console.log('📤 Message Details:');
console.log(`   To: ${toNumber}`);
console.log(`   Text: ${message}\n`);

console.log('⚙️  Sending request...\n');

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

// Опции для HTTPS запроса
const options = {
  hostname: 'graph.facebook.com',
  port: 443,
  path: `/v25.0/${phoneNumberId}/messages`,
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
    console.log(`📊 HTTP Status: ${res.statusCode}\n`);
    
    try {
      const parsedData = JSON.parse(data);
      
      if (res.statusCode === 200) {
        console.log('✅ ✅ ✅ SUCCESS! Message sent! ✅ ✅ ✅\n');
        console.log('📋 Response:');
        console.log('   Message ID:', parsedData.messages?.[0]?.id);
        console.log('   Status: sent\n');
      } else {
        console.log('❌ ERROR - Message not sent\n');
        
        if (parsedData.error?.code === 131030) {
          console.log('🔴 Error Code #131030: Recipient phone number not in allowed list\n');
          console.log('💡 How to fix:\n');
          console.log('1. Go to Meta Business Manager (https://business.facebook.com)');
          console.log('2. Find your WhatsApp Business Account');
          console.log('3. Go to "Phone Numbers" → "Manage Lists"');
          console.log('4. Add your phone number to the "Recipient List"');
          console.log('5. Wait for approval (usually instant)');
          console.log('6. Run this script again\n');
          console.log(`📱 Phone number to add: ${toNumber}\n`);
        } else if (parsedData.error?.code === 400) {
          console.log('🔴 Error Code #400: Invalid request parameter\n');
          console.log(`   Message: ${parsedData.error.message}\n`);
        } else {
          console.log('Error Details:');
          console.log(JSON.stringify(parsedData.error, null, 2));
          console.log('\n');
        }
      }
    } catch (e) {
      console.log('📝 Response (raw):', data);
    }
  });
});

req.on('error', (err) => {
  console.error('❌ Network Error:', err.message);
  process.exit(1);
});

// Отправляем данные
req.write(messageData);
req.end();

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('💡 Usage:');
console.log('   node test_whatsapp_v2.mjs [phone_number] [message]\n');
console.log('Examples:');
console.log('   node test_whatsapp_v2.mjs +77761787977');
console.log('   node test_whatsapp_v2.mjs +77761787977 "Hello World"');
console.log('   node test_whatsapp_v2.mjs 77761787977 "Test message"\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
