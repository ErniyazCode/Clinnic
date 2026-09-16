import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function parseEnvFile(): Record<string, string> {
  const envPath = path.join(process.cwd(), '.env')
  if (!fs.existsSync(envPath)) return {}

  const envContent = fs.readFileSync(envPath, 'utf8')
  return Object.fromEntries(
    envContent
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const separator = line.includes('=') ? '=' : ':'
        const idx = line.indexOf(separator)
        if (idx === -1) return [line, '']
        return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()]
      })
  )
}

function formatAlmatyNow(): string {
  return new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Asia/Almaty',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date())
}

function normalizeKzPhone(input: string): string | null {
  const raw = String(input || '').trim()
  const digits = raw.replace(/\D/g, '')

  if (digits.length >= 8 && digits.length <= 15) {
    return `+${digits}`
  }

  return null
}

function normalizeRecipientPhone(input: string): string | null {
  const digits = String(input || '').replace(/\D/g, '')

  if (digits.length < 8 || digits.length > 15) {
    return null
  }

  return digits
}

function maskPhone(input: string): string {
  const digits = String(input || '').replace(/\D/g, '')
  if (digits.length <= 4) return digits
  return `${'*'.repeat(digits.length - 4)}${digits.slice(-4)}`
}

function whatsappDevApiPlugin(): Plugin {
  return {
    name: 'whatsapp-dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/whatsapp-lead', async (req, res) => {
        const traceId = `wa-dev-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        let rawBody = ''
        for await (const chunk of req) {
          rawBody += chunk
        }

        let parsedBody: { name?: string; phone?: string } = {}
        try {
          parsedBody = JSON.parse(rawBody || '{}')
        } catch {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Invalid JSON body' }))
          return
        }

        const name = (parsedBody.name || '').trim()
        const phone = (parsedBody.phone || '').trim()
        const normalizedPhone = normalizeKzPhone(phone)

        if (!name || !phone) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Name and phone are required' }))
          return
        }

        if (!normalizedPhone) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Invalid phone format. Use international format, e.g. +77771234567' }))
          return
        }

        const fileEnv = parseEnvFile()
        const env = { ...fileEnv, ...process.env }
        const accessToken = env.API_WHATSAPP || env['API-WHATSAPP']
        const phoneNumberId = env.PHONE_NUMBER_ID || '1055384357659254'
        const rawRecipientPhone = env.WHATSAPP_TO_NUMBER || env.WHATSAPP_RECIPIENT || '787757401405'
        const recipientPhone = normalizeRecipientPhone(rawRecipientPhone)

        if (!accessToken) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'WhatsApp API token is missing' }))
          return
        }

        if (!recipientPhone) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: 'WhatsApp recipient number is invalid. Check WHATSAPP_TO_NUMBER or WHATSAPP_RECIPIENT env variable.'
            })
          )
          return
        }

        const messageText = [
          'Новая заявка с сайта',
          `Имя: ${name}`,
          `Телефон: ${normalizedPhone}`,
          `Дата и время: ${formatAlmatyNow()}`
        ].join('\n')

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
          })

          const payload = await response.json()

          res.statusCode = response.status
          res.setHeader('Content-Type', 'application/json')

          if (!response.ok) {
            res.end(
              JSON.stringify({
                error: payload?.error?.message || 'WhatsApp API request failed',
                details: payload,
                debug: {
                  traceId,
                  recipientPhone: maskPhone(recipientPhone)
                }
              })
            )
            return
          }

          res.end(
            JSON.stringify({
              ok: true,
              payload,
              debug: {
                traceId,
                recipientPhone: maskPhone(recipientPhone),
                messageId: payload?.messages?.[0]?.id || null,
                messageStatus: payload?.messages?.[0]?.message_status || payload?.messages?.[0]?.status || null
              }
            })
          )
        } catch (error) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : 'Unknown server error'
            })
          )
        }
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), whatsappDevApiPlugin()],
})
