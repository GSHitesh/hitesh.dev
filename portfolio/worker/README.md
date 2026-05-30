# Contact Worker

A tiny Cloudflare Worker that powers the contact form on the portfolio site. Validates the payload, drops bot submissions via a honeypot, and relays the message to my inbox through [Resend](https://resend.com).

## Deploy

```bash
cd portfolio/worker
npm i -g wrangler           # one-time
wrangler login

# secrets
wrangler secret put RESEND_API_KEY
wrangler secret put OWNER_EMAIL    # e.g. saihitesh01@gmail.com
wrangler secret put FROM_EMAIL     # e.g. contact@hitesh.dev (verified Resend sender)

wrangler deploy
```

After deploy, set the resulting URL as the contact endpoint for the site:

```bash
# in portfolio/.env.local
VITE_CONTACT_ENDPOINT=https://hitesh-contact.<your-subdomain>.workers.dev
```

`portfolio/src/data/resume.ts` reads `VITE_CONTACT_ENDPOINT` and falls back to the default Worker URL.

## Local dev

```bash
wrangler dev
```

Then point Vite at it:

```bash
# portfolio/.env.local
VITE_CONTACT_ENDPOINT=http://127.0.0.1:8787
```
