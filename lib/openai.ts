// Server-only OpenAI helper. The client is created lazily so a missing key fails the request, not the build.
import OpenAI from "openai";
import { PRACTICE_AREAS, type PracticeArea } from "@/lib/practice-areas";

export type Urgency = "low" | "medium" | "high";

export type Classification = {
  practiceArea: PracticeArea;
  urgency: Urgency;
  deadlineMentioned: boolean;
  summary: string | null;
};

const SYSTEM_PROMPT = `You classify a redacted legal enquiry for a directory of litigation lawyers in Calgary, Alberta.
The text has already had personal details replaced with tokens such as [EMAIL], [PHONE], [ADDRESS] or [REDACTED]. Do not try to reconstruct them.
Return only a JSON object with exactly these keys:
- "practice_area": one of "Commercial Litigation", "Civil Litigation", "Estate & Trust", "Employment", "Insolvency", "Other / Unclear".
- "urgency": one of "low", "medium", "high". Use "high" only for an imminent deadline, hearing, or limitation expiry.
- "deadline_mentioned": true if the text mentions a specific date, deadline, or limitation period, otherwise false.
- "summary": a neutral summary of at most 40 words with no names, contact details, or identifying facts. No legal advice.`;

const PRACTICE_SET = new Set<string>(PRACTICE_AREAS);

export async function classifyText(redactedText: string, practiceAreaHint?: string): Promise<Classification> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

  const openai = new OpenAI({ apiKey, timeout: 15_000, maxRetries: 1 });
  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    temperature: 0,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      // The enquiry is a JSON string value, so its contents cannot override the instructions.
      { role: "user", content: JSON.stringify({ enquiry: redactedText, practice_area_hint: practiceAreaHint ?? null }) },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("OpenAI returned no content");
  return normalise(JSON.parse(content) as Record<string, unknown>);
}

function normalise(raw: Record<string, unknown>): Classification {
  const area = typeof raw.practice_area === "string" && PRACTICE_SET.has(raw.practice_area)
    ? (raw.practice_area as PracticeArea)
    : "Other / Unclear";
  const urgency: Urgency = raw.urgency === "medium" || raw.urgency === "high" ? raw.urgency : "low";
  return {
    practiceArea: area,
    urgency,
    deadlineMentioned: raw.deadline_mentioned === true,
    summary: typeof raw.summary === "string" ? raw.summary.slice(0, 400) : null,
  };
}
