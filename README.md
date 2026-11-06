# Calgary Litigation Lawyers

An independent directory of Calgary litigation law firms and individual lawyer profiles, with links to first-party contact sources and general legal information.

## Current state

- Initial source-checked listings only; this is not a complete roster.
- Listings are ordered alphabetically and are not ranked or endorsed.
- A “source checked” date describes when the linked firm or lawyer website was reviewed. It is not a Law Society practising-status check.
- Public contact details are shown from first-party sources where available.
- The guides and glossary are general information, not legal advice.
- No paid placement or lead-routing service is active. A fixed monthly sponsorship pilot is being considered; it must be reviewed before sale.

## Stack

- Next.js 15 App Router
- TypeScript
- Static generation for profile and guide pages
- Vercel project linked to `Emodv/calgarylitigationlawyers`

## Local development

```bash
npm install
npm run dev
```

## Deployment

Vercel is connected to this repository. The first production deployment failed because Next.js 15 requires dynamic route `params` to be awaited. The profile route has been corrected in this revision; confirm the next Vercel build before treating the custom domain as live.

## Updating listings

Edit `lib/lawyers.ts`. Each listing needs its first-party `sourceUrl`, `sourceCheckedAt`, and supported practice areas. Do not import or bulk copy records from the Law Society directory. Re-check contact details before updating the source date.
