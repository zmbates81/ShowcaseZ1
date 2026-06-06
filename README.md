# How to Read an Insurer's P&L — An Interactive Field Guide

An interactive, scrollytelling explainer that teaches anyone how to read an
insurance company's profit & loss statement — and lets them *run an insurer
themselves* with a live simulator.

The hook: **insurance is the only business that sells its product before it
knows what it costs.** That single inversion explains reserves, the combined
ratio, and "the float." The guide walks through the income statement of
**Buckeye Mutual**, a fictional Columbus, Ohio property & casualty insurer,
one line at a time.

## What's inside

- **The big idea** — why an insurer's P&L runs backwards, and the two engines
  of profit (underwriting + the float).
- **The annotated statement** — a sticky ledger whose lines light up with
  plain-English notes as you scroll.
- **The scoreboard** — loss ratio, expense ratio, and the all-important
  **combined ratio**, dramatized against the 100% break-even line.
- **The float** — the Buffett insight: getting paid to hold other people's
  money.
- **The simulator** — drag loss ratio, expense ratio, float, and investment
  yield and watch the combined ratio cross 100%. Includes preset scenarios
  (hard market, soft market, catastrophe year, "Buffett's dream") and a live
  profit-bridge waterfall.
- **A 60-second cheat sheet** — a screenshot-friendly reference card.

## Tech

- **Next.js (App Router) + React + TypeScript**
- **Tailwind CSS** for styling
- Custom **SVG** visualizations and a dependency-free animation layer
  (IntersectionObserver + `requestAnimationFrame`), so the bundle stays lean
- Dynamic **Open Graph image** (`app/opengraph-image.tsx`) for a polished
  link preview when shared on LinkedIn
- Fully responsive and `prefers-reduced-motion` aware

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

Build for production:

```bash
npm run build && npm run start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, **New Project → Import** the repo. Vercel auto-detects Next.js;
   no configuration is required.
3. (Optional) set `NEXT_PUBLIC_SITE_URL` to your final domain so the Open
   Graph/Twitter preview URLs are absolute. On Vercel, `VERCEL_URL` is used
   automatically as a fallback.

## Customize

All of the numbers and copy live in one place: **`app/lib/insurer.ts`**.

- Change Buckeye Mutual's figures (they're internally consistent — subtotals
  are computed, so edit the inputs and everything ties out).
- Edit the per-line `annotations`, the `glossary`, the `checklist`, or the
  simulator `PRESETS`.

> Buckeye Mutual is fictional. All figures are illustrative and built for
> teaching, not investment advice.
