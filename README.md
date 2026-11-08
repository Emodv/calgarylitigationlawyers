# Calgary Litigation Lawyers

An independent directory of litigation lawyers in Calgary, Alberta.

## Stack
- Next.js 15 (App Router), TypeScript
- Supabase (PostgreSQL, RLS enabled)
- OpenAI API for enquiry classification (after local PII redaction)
- Vercel for hosting

## Local setup
```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

## Database setup
Run `supabase/schema.sql` once in Supabase > SQL Editor.
- `lawyers`: public read only where `is_verified = true`. Every row requires a `source_url`.
- `leads`: no public access. Written and read only by the server with the service-role key.

## Environment variables (Vercel > Settings > Environment Variables)
| Name | Scope | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Project URL. Not secret. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Never prefix with `NEXT_PUBLIC_`. |
| `OPENAI_API_KEY` | Server only | Used by `/api/intake`. |
| `OPENAI_MODEL` | Server only | Optional. Defaults to `gpt-4o-mini`. |

## Enquiry intake: `POST /api/intake`
Body (JSON): `{ "description": string (20–4000 chars), "consent": true, "name"?, "email"?, "phone"?, "practiceArea"? }`
Flow: validate, redact PII locally, classify the redacted text, score (Hot / Warm / Cold), store.
- The raw description is never stored. Only the redacted text is stored.
- Names, emails and phone numbers the enquirer supplies are removed from the text before any external call.
- Regex redaction covers emails, phone numbers, postal codes, street addresses and long digit strings. Names not supplied in the form are not detected.
- Classification failure does not drop the lead. It is stored with `classification_status = 'failed'`.

## Compliance rules (enforced in code and copy)
- Listings are alphabetical. No scores, no pay-to-rank, no fake ratings.
- Verification is free and never tied to payment.
- Every listing shows its source and verification status.
- No contingency fees, matter splitting, or referral fees.

## Deploy
Pushing to the production branch triggers a Vercel build. Run `npm run build` locally first.
