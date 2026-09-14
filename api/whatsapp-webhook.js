export default async function handler(req, res) {
  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'reactive-whatsapp-verify';

  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === verifyToken) {
      console.log('[whatsapp-webhook] Verification passed');
      return res.status(200).send(challenge);
    }

    console.warn('[whatsapp-webhook] Verification failed', { mode, tokenProvided: Boolean(token) });
    return res.status(403).json({ error: 'Verification failed' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body || {};

    const changes = (payload.entry || [])
      .flatMap((entry) => entry.changes || [])
      .map((change) => change.value || {});

    const statuses = changes.flatMap((value) => value.statuses || []);
    const messages = changes.flatMap((value) => value.messages || []);

    if (statuses.length > 0) {
      statuses.forEach((status) => {
        console.log('[whatsapp-webhook] Message status update', {
          messageId: status.id || null,
          status: status.status || null,
          recipientId: status.recipient_id || null,
          conversationId: status?.conversation?.id || null,
          category: status?.conversation?.origin?.type || null,
          pricingModel: status?.pricing?.pricing_model || null,
          errorCode: status?.errors?.[0]?.code || null,
          errorTitle: status?.errors?.[0]?.title || null,
          errorMessage: status?.errors?.[0]?.message || null,
          timestamp: status.timestamp || null
        });
      });
    }

    if (messages.length > 0) {
      messages.forEach((message) => {
        console.log('[whatsapp-webhook] Incoming user message', {
          from: message.from || null,
          id: message.id || null,
          type: message.type || null,
          timestamp: message.timestamp || null
        });
      });
    }

    return res.status(200).send('EVENT_RECEIVED');
  } catch (error) {
    console.error('[whatsapp-webhook] Unexpected error', {
      message: error instanceof Error ? error.message : 'Unknown error'
    });
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}
