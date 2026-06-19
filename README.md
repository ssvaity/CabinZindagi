# Cabin Zindagi — The Human Side of Logistics

Marketing site for **Cabin Zindagi**, built with **Next.js 15 + React 19 + Tailwind CSS**.

## Pages
- **Home** (`/`) — interactive boxes hero, "What We Do" spotlight cards, the *"Agar Chakkaa nahi Ghumega…"* quote band, and a Before/After outcome section.
- **Impact** (`/impact`) — scroll-animated timeline, a CTA banner, and a one-time contribution module.
- **Products** (`/products`) — pricing-style product cards (Water Bottle, Driver Travel Kit, Modular Dormitory) plus a dormitory image showcase.
- **Contact** (`/contact`) — two-column layout with a world map and an EmailJS-powered form.

## Features
- **Light / dark mode** — navbar toggle (`next-themes`), respects system preference, remembers choice.
- **English ⇄ Hindi** — navbar toggle swaps the whole site's language. All copy lives in `lib/dictionaries.ts`.
- **Contact form** — sends email via **EmailJS** (no backend); logs to console until keys are added.
- **Interactive effects** — `SplashCursor` (desktop + non-reduced-motion only), Aceternity boxes/timeline, spotlight cards.

## Getting started
```bash
npm install
npm run dev      # http://localhost:3000
```
> Project root is `~/Desktop/cabinzindagi`.

## Enabling the contact form email
1. Create a free account at [emailjs.com](https://www.emailjs.com) and set up an email **service** + **template**.
   - Template variables: `{{from_name}}`, `{{from_email}}`, `{{company}}`, `{{interest}}`, `{{message}}`.
2. Copy `.env.local.example` to `.env.local` and fill in your IDs:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
   ```
3. Restart `npm run dev`.

Until configured, the contact form still "works" in dev — it logs the submission to the browser console.

## Where to edit things
| What | File |
|------|------|
| All site text (EN + HI) | `lib/dictionaries.ts` |
| Products & prices | `data/products.ts` |
| Dormitory / product images | `public/products/`, `public/` |
| Brand colors (orange / green) | `tailwind.config.ts` (`colors.brand`, `accent`) |
| Display font | `lib/fonts.ts` |
| Home page sections / order | `app/page.tsx` |

## Deploy
Push to GitHub and import the repo at [vercel.com](https://vercel.com). Add the three `NEXT_PUBLIC_EMAILJS_*` variables in the Vercel project settings.
