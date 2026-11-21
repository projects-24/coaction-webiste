# Coaction Company Limited website

Corporate website for Coaction Company Limited (Accra, Ghana): professional
training, capacity development and corporate advisory services.

Next.js (App Router) · React · TypeScript · Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm run start   # production build
npm run test                     # catalogue + enquiry tests (Vitest)
npm run typecheck
npm run lint
```

Requires Node.js 20.9 or later (developed on Node 22).

## Configuration

Copy `.env.example` to `.env.local` and fill in what you need. Nothing is
required to run the site locally.

| Setting | Effect |
| --- | --- |
| `SITE_URL` | The confirmed live domain. **While unset the site is kept out of search engines** (`robots.txt` disallows everything, pages carry `noindex`, no canonical URLs, empty sitemap). Set it only on the production deployment. |
| `ENQUIRY_DELIVERY` | `smtp` or `webhook`. **While unset the enquiry form tells visitors their message was not sent** and shows the phone and email alternatives. It never shows a false confirmation. |
| `SMTP_*`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` | SMTP delivery: each enquiry is emailed to the inbox, with Reply-To set to the enquirer. |
| `ENQUIRY_WEBHOOK_URL`, `ENQUIRY_WEBHOOK_SECRET` | Webhook delivery: each enquiry is POSTed as JSON; a 2xx response counts as accepted. |

The enquiry endpoint needs a Node.js server runtime (any Next.js host, or
`npm run start` behind a reverse proxy). A purely static export would not
support the form.

## Where things live

| To change… | Edit… |
| --- | --- |
| A programme's text, topics, audience, category, related links | `src/content/programmes.ts` |
| Services, approach stages, values, vision, mission, home-page selections | `src/content/company.ts` |
| Address, phone numbers, email, navigation | `src/content/site.ts` |
| Photographs, alt text, captions and credits | `src/content/images.ts` (+ files in `src/assets/photos/`) |
| The logo | `src/components/wordmark.tsx` |
| Colours, type scale, spacing tokens | `src/app/globals.css` |
| Enquiry form fields and validation rules | `src/lib/enquiry/schema.ts` |

Programme pages, catalogue cards, search, related programmes, the enquiry
form's programme list and the sitemap are all generated from
`src/content/programmes.ts`. Adding a programme there adds it everywhere.

## Enquiry form: how it works

`src/components/enquiry-form.tsx` → `POST /api/enquiries`
(`src/app/api/enquiries/route.ts`) → `src/lib/enquiry/handle.ts`.

- The same validation runs in the browser and on the server.
- Spam protection: a hidden honeypot field and a minimum fill time.
- Rate limiting: 5 submissions per 10 minutes per IP address, held in memory.
  On serverless or multi-instance hosting each instance counts separately, so
  also enable the host's own rate limiting for `/api/enquiries`.
- The site does not store enquiries. Enquiry content is never logged; only a
  delivery failure reason is.
- Links can pre-fill the form:
  `/contact?type=corporate&programme=<slug>&service=<training|advisory>`.

## Notes on this Next.js version

`next.config.ts` enables Cache Components. `partialPrefetching` is left off so
that unknown programme URLs return a real HTTP 404 rather than a soft 404.
See `AGENTS.md` before changing framework-level code.

## Further documentation

- `docs/HANDOVER.md` — what was built, checks performed, launch checklist.
- `docs/asset-register.md` — provenance and licence of every photograph.
