import fs from 'fs';
import path from 'path';

function parseEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    return {};
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  return Object.fromEntries(
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
}

function getConfig() {
  const fileEnv = parseEnvFile();
  const env = { ...fileEnv, ...process.env };

  const accessToken = env.API_WHATSAPP || env['API-WHATSAPP'];
  const phoneNumberId = env.PHONE_NUMBER_ID || '1055384357659254';
  const toNumber = String(env.WHATSAPP_TO_NUMBER || env.WHATSAPP_RECIPIENT || '787757401405').replace(/\D/g, '');

  return { accessToken, phoneNumberId, toNumber };
}

function formatAlmatyNow() {
  const now = new Date();
  return new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Asia/Almaty',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(now);
}

function normalizeKzPhone(input) {
  const raw = String(input || '').trim();
  const digits = raw.replace(/\D/g, '');

  if (digits.length >= 8 && digits.length <= 15) {
    return `+${digits}`;
  }

  return null;
}

function normalizeRecipientPhone(input) {
  const digits = String(input || '').replace(/\D/g, '');

  if (digits.length < 8 || digits.length > 15) {
    return null;
  }

  return digits;
}

function maskPhone(input) {
  const digits = String(input || '').replace(/\D/g, '');
  if (digits.length <= 4) return digits;
  return `${'*'.repeat(digits.length - 4)}${digits.slice(-4)}`;
}

export default async function handler(req, res) {
  const traceId = `wa-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone } = req.body || {};
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const normalizedPhone = normalizeKzPhone(phone);
  if (!normalizedPhone) {
    return res.status(400).json({ error: 'Invalid phone format. Use international format, e.g. +77771234567' });
  }

  const { accessToken, phoneNumberId, toNumber: rawRecipientPhone } = getConfig();
  const recipientPhone = normalizeRecipientPhone(rawRecipientPhone);

  if (!accessToken) {
    return res.status(500).json({ error: 'WhatsApp API token is missing' });
  }

  if (!recipientPhone) {
    return res.status(500).json({
      error: 'WhatsApp recipient number is invalid. Check WHATSAPP_TO_NUMBER or WHATSAPP_RECIPIENT env variable.'
    });
  }

  const messageText = [
    'Новая заявка с сайта',
    `Имя: ${String(name).trim()}`,
    `Телефон: ${normalizedPhone}`,
    `Дата и время: ${formatAlmatyNow()}`
  ].join('\n');

  try {
    const response = await fetch(`https://graph.facebook.com/v25.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: recipientPhone,
        type: 'template',
        template: {
          name: 'new_lead_from_site',
          language: { code: 'ru' },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: String(name).trim() || 'Клиент' },
                { type: 'text', text: normalizedPhone || 'Без телефона' }
              ]
            }
          ]
        }
      })
    });

    const payload = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: payload?.error?.message || 'WhatsApp API request failed',
        details: payload
      });
    }

    return res.status(200).json({
      ok: true,
      payload,
      debug: {
        traceId,
        recipientPhone: maskPhone(recipientPhone),
        messageId: payload?.messages?.[0]?.id || null,
        messageStatus: payload?.messages?.[0]?.message_status || payload?.messages?.[0]?.status || null
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown server error'
    });
  }
}
