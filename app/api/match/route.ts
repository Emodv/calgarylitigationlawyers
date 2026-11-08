import { NextResponse } from "next/server";
import { redact } from "@/lib/redact";
import { classifyText } from "@/lib/openai";
import { getServiceClient, ConfigError } from "@/lib/supabase";
import { parseInput } from "@/lib/intake-input";
import { SELECTABLE_AREAS, type PracticeArea } from "@/lib/practice-areas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 10_000;

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

// Maps a dispute description to a verified practice area, then returns verified lawyers in that area.
// Never guesses: if classification fails or is unclear, the caller must choose a category and resend.
export async function POST(req: Request) {
  const raw = await req.text();
  if (raw.length > MAX_BYTES) return json({ error: "Request is too large." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Request body must be valid JSON." }, 400);
  }

  const parsed = parseInput(body, false);
  if (!parsed.ok) return json({ error: parsed.error }, 400);
  const v = parsed.value;

  let area: PracticeArea | null = null;

  // An explicit user selection always wins over the model.
  if (v.practiceArea && v.practiceArea !== "Other / Unclear") {
    area = v.practiceArea as PracticeArea;
  } else {
    const redaction = redact(v.description, [v.name, v.email, v.phone].filter((x): x is string => Boolean(x)));
    try {
      const result = await classifyText(redaction.text);
      if (result.practiceArea !== "Other / Unclear") area = result.practiceArea;
    } catch (err) {
      console.error("[match] classification failed", err instanceof Error ? err.name : "unknown");
    }
  }

  if (!area) {
    return json(
      {
        needsCategory: true,
        message: "We could not confidently match your issue. Please choose a practice area.",
        categories: SELECTABLE_AREAS,
      },
      422,
    );
  }

  try {
    const { data, error } = await getServiceClient()
      .from("lawyers")
      .select("name, slug, address, phone, email, website, source_url, verified_at, practice_areas")
      .eq("is_verified", true)
      .contains("practice_areas", [area])
      .order("name", { ascending: true });

    if (error) throw new Error(error.code ?? "query failed");

    return json({ practiceArea: area, lawyers: data ?? [] });
  } catch (err) {
    if (err instanceof ConfigError) return json({ error: "Directory is temporarily unavailable." }, 503);
    console.error("[match] lookup failed", err instanceof Error ? err.message : "unknown");
    return json({ error: "Directory is temporarily unavailable." }, 503);
  }
}

export function GET() {
  return json({ error: "Method not allowed." }, 405);
}

