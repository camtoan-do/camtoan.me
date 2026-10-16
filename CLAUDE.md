# camtoan.me — project notes

Personal site + security side hustle for Cam Toan Do (Cybersecurity Coordinator, Calgary).
Owner has no coding background: explain plainly, keep things simple, be honest.

## Stack (all free except domain + Proton)
- Astro static site → Cloudflare Workers static assets (`wrangler.jsonc`), deploys on push to `main`.
- DNS: Cloudflare (nameservers seamus/tegan). Domain registered at Namecheap (auto-renew on, expires 2027-07-08).
- Email: Proton Mail, official@camtoan.me. MX/SPF/DKIM(3 CNAMEs)/DMARC must stay **DNS only** in Cloudflare.
- Status page: status.camtoan.me (Upptime, repo camtoan-do/status, CNAME → camtoan-do.github.io, DNS only).
- Substack: camtoando.substack.com, pulled into /blog at build time (`src/substack.ts`).
- Netlify: old host, kept briefly as fallback; to be deleted.

## Where things live
- Text: `src/site.ts` · About timeline: `src/timeline.ts` · Posts: `src/content/blog/`
- Security features page: data `src/features.ts`, page `src/pages/features.astro`, search `public/features.js` (external file, CSP-safe)
- Design: neobrutalism (thick borders, hard shadows, flat bright colors) in `src/styles.css`
- Security headers: `public/_headers` (strict CSP — no inline scripts/styles) · Redirects: `public/_redirects`
- Checks: `scripts/check-build.mjs` (CI) and `scripts/check-live.mjs` (hourly; site, headers, TLS, email DNS)

## Rules
- Run `npm run build && npm run check:build` before pushing.
- Never put secrets in the repo or chat; tokens go in GitHub/Cloudflare secrets.
- Don't invent facts about the owner (certs, clients, dates).

## Open items
- Enable DNSSEC (Cloudflare → DS record in Namecheap).
- Delete Netlify project after a stable week.
- Optional: blameless postmortem of the cutover outage; Lambda "website security check" tool.
- DMARC p=quarantine → p=reject once email is proven stable.
