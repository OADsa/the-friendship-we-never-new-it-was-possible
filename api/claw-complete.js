let sentDuringThisInstance = false;

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ ok: false });
  }

  const allowedOrigin = process.env.SITE_ORIGIN || 'https://bembun.vercel.app';
  const origin = request.headers.origin;
  if (origin && origin !== allowedOrigin) return response.status(403).json({ ok: false });

  const { completed, total } = request.body || {};
  if (completed !== 1158 || total !== 1158) return response.status(400).json({ ok: false });
  if (sentDuringThisInstance) return response.status(200).json({ ok: true, duplicate: true });

  const webhookUrl = process.env.DISCORD_COMPLETION_WEBHOOK_URL;
  if (!webhookUrl) return response.status(503).json({ ok: false, missingConfiguration: true });

  const discordResponse = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: '🏆 Bembun completed all 1,158 unique capsule messages in the claw machine!',
      allowed_mentions: { parse: [] }
    })
  });

  if (!discordResponse.ok) return response.status(502).json({ ok: false });
  sentDuringThisInstance = true;
  return response.status(200).json({ ok: true });
};
