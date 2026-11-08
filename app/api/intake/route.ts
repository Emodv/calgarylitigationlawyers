import { NextResponse } from "next/server";
import { redact } from "@/lib/redact";
import { classifyText, type Classification } from "@/lib/openai";
import { getServiceClient } from "@/lib/supabase";
import { parseInput } from "@/lib/intake-input";
import { scoreLead } from "@/lib/score";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 10_000;

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
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

  const parsed = parseInput(body, true);
  if (!parsed.ok) return json({ error: parsed.error }, 400);
  const v = parsed.value;

  // 1. Redact locally. Only redacted text is sent to OpenAI or stored.
  const knownValues = [v.name, v.email, v.phone].filter((x): x is string => Boolean(x));
  const redaction = redact(v.description, knownValues);

  // 2. Classify. On failure the lead is kept and flagged; it is never silently assigned a practice area.
  let classification: Classification | null = null;
  let classificationStatus: "ok" | "failed" = "ok";
  try {
    classification = await classifyText(redaction.text, v.practiceArea);
  } catch (err) {
    classificationStatus = "failed";
    console.error("[intake] classification failed", err instanceof Error ? err.name : "unknown");
  }

  const aiSummary = classification?.summary ? redact(classification.summary, knownValues).text : null;
  const score = scoreLead({
    urgency: classification?.urgency ?? "low",
    deadlineMentioned: classification?.deadlineMentioned ?? false,
    contactable: Boolean(v.email || v.phone),
  });

  // 3. Store. The raw description is never persisted.
  try {
    const { data, error } = await getServiceClient()
      .from("leads")
      .insert({
        lawyer_id: v.lawyerId ?? null,
        client_name: v.name ?? null,
        client_email: v.email ?? null,
        client_phone: v.phone ?? null,
        practice_area: v.practiceArea ?? classification?.practiceArea ?? "Other / Unclear",
        issue_summary: redaction.text,
        ai_redacted_summary: aiSummary,
        ai_lead_score: score,
        urgency: classification?.urgency ?? null,
        deadline_mentioned: classification?.deadlineMentioned ?? false,
        redaction_counts: redaction.counts,
        classification_status: classificationStatus,
        consent_at: new Date().toISOString(),
        status: "new",
      })
      .select("id")
      .single();

    if (error || !data) throw new Error(error?.code ?? "insert failed");

    return json(
      { id: data.id, score, message: "Your enquiry was received. This directory does not provide legal advice." },
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
