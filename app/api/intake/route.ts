import { NextResponse } from "next/server";
import { redact } from "@/lib/redact";
import { classifyIntake, PRACTICE_AREAS, SAFE_FALLBACK, type Classification } from "@/lib/classify";
import { insertRow } from "@/lib/supabase";
import { scoreLead } from "@/lib/score";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 10_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Intake = {
  description: string;
  name?: string;
  email?: string;
  phone?: string;
  practiceAreaHint?: string;
};

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function parseIntake(body: unknown): { ok: true; value: Intake } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Request body must be a JSON object." };
  const b = body as Record<string, unknown>;

  if (b.consent !== true) {
    return { ok: false, error: "Consent to the privacy notice is required before submitting." };
  }

  const description = typeof b.description === "string" ? b.description.trim() : "";
  if (description.length < 20 || description.length > 4000) {
    return { ok: false, error: "Description must be between 20 and 4000 characters." };
  }

  const optionalText = (key: string, max: number): string | undefined | null => {
    const v = b[key];
    if (v === undefined || v === null || v === "") return undefined;
    if (typeof v !== "string") return null;
    const t = v.trim();
    return t.length === 0 ? undefined : t.length > max ? null : t;
  };

  const name = optionalText("name", 120);
  const email = optionalText("email", 254);
  const phone = optionalText("phone", 30);
  const hint = optionalText("practiceArea", 60);

  if (name === null) return { ok: false, error: "Name is too long." };
  if (email === null || (email !== undefined && !EMAIL_RE.test(email))) {
    return { ok: false, error: "Email address is not valid." };
  }
  if (phone === null || (phone !== undefined && (phone.replace(/\D/g, "").length < 10 || phone.replace(/\D/g, "").length > 15))) {
    return { ok: false, error: "Phone number is not valid." };
  }
  if (hint === null || (hint !== undefined && !(PRACTICE_AREAS as readonly string[]).includes(hint))) {
    return { ok: false, error: "Practice area is not recognised." };
  }

  return {
    ok: true,
    value: { description, name, email, phone, practiceAreaHint: hint },
  };
}

export async function POST(req: Request) {
  const declared = Number(req.headers.get("content-length") ?? "0");
  if (declared > MAX_BYTES) return json({ error: "Request is too large." }, 413);

  const raw = await req.text();
  if (raw.length > MAX_BYTES) return json({ error: "Request is too large." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Request body must be valid JSON." }, 400);
  }

  const parsed = parseIntake(body);
  if (!parsed.ok) return json({ error: parsed.error }, 400);
  const v = parsed.value;

  // 1. Redact locally. Only redacted text leaves this server.
  const knownValues = [v.name, v.email, v.phone].filter((x): x is string => Boolean(x));
  const redaction = redact(v.description, knownValues);

  // 2. Classify the redacted text. Failure is non-fatal: the lead is still stored, flagged for review.
  let classification: Classification = SAFE_FALLBACK;
  let classificationStatus: "ok" | "failed" = "ok";
  try {
    classification = await classifyIntake(redaction.text, v.practiceAreaHint);
  } catch (err) {
    classificationStatus = "failed";
    console.error("[intake] classification failed", err instanceof Error ? err.message : "unknown");
  }

  // 3. Re-redact the model's summary in case it echoed anything identifying.
  const summary = classification.summary ? redact(classification.summary, knownValues).text : null;

  // 4. Deterministic score.
  const contactable = Boolean(v.email || v.phone);
  const score = scoreLead({
    urgency: classification.urgency,
    deadlineMentioned: classification.deadlineMentioned,
    contactable,
  });

  // 5. Store. The raw description is never persisted.
  try {
    const row = await insertRow("leads", {
      score,
      practice_area: classification.practiceArea,
      urgency: classification.urgency,
      deadline_mentioned: classification.deadlineMentioned,
      summary,
      redacted_description: redaction.text,
      redaction_counts: redaction.counts,
      classification_status: classificationStatus,
      contact_name: v.name ?? null,
      contact_email: v.email ?? null,
      contact_phone: v.phone ?? null,
      consent_at: new Date().toISOString(),
      status: "new",
    });

    return json(
      {
        id: row.id,
        score,
        message: "Your enquiry was received. This directory does not provide legal advice.",
      },
      201,
    );
  } catch (err) {
    console.error("[intake] storage failed", err instanceof Error ? err.message : "unknown");
    return json({ error: "We could not save your enquiry. Please try again later." }, 500);
  }
}

export function GET() {
  return json({ error: "Method not allowed." }, 405);
}
