/**
 * Cloudflare Worker — contact form relay for hitesh.dev portfolio.
 *
 * Accepts POST { name, email, message, _gotcha } and forwards to your inbox via Resend.
 * Configure these via `wrangler secret put` (do NOT commit them):
 *   - RESEND_API_KEY   (https://resend.com/api-keys)
 *   - OWNER_EMAIL      (where messages are delivered, e.g. saihitesh01@gmail.com)
 *   - FROM_EMAIL       (verified Resend sender, e.g. contact@hitesh.dev)
 *   - ALLOWED_ORIGIN   (e.g. https://gshitesh.github.io  — set via wrangler.toml [vars])
 */

export interface Env {
  RESEND_API_KEY: string;
  OWNER_EMAIL: string;
  FROM_EMAIL: string;
  ALLOWED_ORIGIN: string;
}

interface Payload {
  name?: string;
  email?: string;
  message?: string;
  _gotcha?: string;
}

const MAX_BODY = 8 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function corsHeaders(env: Env): HeadersInit {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(body: unknown, status: number, env: Env): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...corsHeaders(env) },
  });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(env) });
    }
    if (req.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, env);
    }

    let body: Payload;
    try {
      const text = await req.text();
      if (text.length > MAX_BODY) return json({ error: 'Payload too large' }, 413, env);
      body = JSON.parse(text) as Payload;
    } catch {
      return json({ error: 'Invalid JSON' }, 400, env);
    }

    // Honeypot — bots fill this; humans don't see it.
    if (body._gotcha && body._gotcha.trim().length > 0) {
      return json({ ok: true }, 200, env); // pretend success
    }

    const name = (body.name ?? '').trim().slice(0, 200);
    const email = (body.email ?? '').trim().slice(0, 200);
    const message = (body.message ?? '').trim().slice(0, 5000);

    if (!name || !email || !message) {
      return json({ error: 'Missing name, email, or message.' }, 400, env);
    }
    if (!EMAIL_RE.test(email)) {
      return json({ error: 'Invalid email address.' }, 400, env);
    }

    if (!env.RESEND_API_KEY || !env.OWNER_EMAIL || !env.FROM_EMAIL) {
      return json({ error: 'Server is misconfigured.' }, 500, env);
    }

    const escape = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const html = `
      <h2>New message from hitesh.dev</h2>
      <p><strong>From:</strong> ${escape(name)} &lt;${escape(email)}&gt;</p>
      <hr />
      <pre style="font-family:ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap">${escape(message)}</pre>
    `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: [env.OWNER_EMAIL],
        reply_to: email,
        subject: `[hitesh.dev] ${name}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text().catch(() => '');
      console.error('Resend failure', resendRes.status, detail);
      return json({ error: 'Failed to send. Please email me directly.' }, 502, env);
    }

    return json({ ok: true }, 200, env);
  },
};
