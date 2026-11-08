// Semantic classification of an ALREADY-REDACTED enquiry via the OpenAI Chat Completions API.
// Output is validated against fixed enums; anything unexpected falls back to safe defaults.

export const PRACTICE_AREAS = [
  "Commercial Litigation",
  "Civil Litigation",
  "Estate & Trust",
  "Employment",
  "Insolvency",
  "Other / Unclear",
] as const;

export type PracticeArea = (typeof PRACTICE_AREAS)[number];
export type Urgency = "low" | "medium" | "high";

export type Classification = {
  practiceArea: PracticeArea;
  urgency: Urgency;
  deadlineMentioned: boolean;
  summary: string | null;
};

export const SAFE_FALLBACK: Classification = {
  practiceArea: "Other / Unclear",
  urgency: "low",
  deadlineMentioned: false,
  summary: null,
};

const SYSTEM_PROMPT = `You classify a redacted legal enquiry for a directory of litigation lawyers in Calgary, Alberta.
The enquiry text has already had personal details replaced with tokens such as [EMAIL], [PHONE], [ADDRESS] or [REDACTED]. Do not try to reconstruct them.
Return only a JSON object with exactly these keys:
- "practice_area": one of "Commercial Litigation", "Civil Litigation", "Estate & Trust", "Employment", "Insolvency", "Other / Unclear".
- "urgency": one of "low", "medium", "high". Use "high" only when the text describes an imminent deadline, hearing, or limitation expiry.
- "deadline_mentioned": true if the text mentions any specific date, deadline, or limitation period, otherwise false.
- "summary": a neutral summary of at most 40 words. Do not include names, contact details, or identifying facts. Do not give legal advice.`;

const PRACTICE_SET = new Set<string>(PRACTICE_AREAS);
const URGENCY_SET = new Set<string>(["low", "medium", "high"]);

export async function classifyIntake(redactedText: string, practiceAreaHint?: string): Promise<Classification> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        // Enquiry is passed as a JSON string value so its contents cannot alter the instructions.
        { role: "user", content: JSON.stringify({ enquiry: redactedText, practice_area_hint: practiceAreaHint ?? null }) },
      ],
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) throw new Error(`OpenAI request failed with status ${res.status}`);

  const data = (await res.json()) as { choices?: { message?: { content?: unknown } }[] };
  const content = data.choices?.[0]?.message?.content;
  if (typeof content !== "string") throw new Error("OpenAI returned no content");

  return normalise(JSON.parse(content) as Record<string, unknown>);
}

function normalise(raw: Record<string, unknown>): Classification {
  const area = typeof raw.practice_area === "string" && PRACTICE_SET.has(raw.practice_area)
    ? (raw.practice_area as PracticeArea)
    : "Other / Unclear";
  const urgency = typeof raw.urgency === "string" && URGENCY_SET.has(raw.urgency)
    ? (raw.urgency as Urgency)
    : "low";
  const summary = typeof raw.summary === "string" ? raw.summary.slice(0, 400) : null;
  return {
    practiceArea: area,
    urgency,
    deadlineMentioned: raw.deadline_mentioned === true,
    summary,
  };
}
