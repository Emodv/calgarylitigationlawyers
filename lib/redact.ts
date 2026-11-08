// Redacts personal information from enquiry text BEFORE it leaves the server.
// Rules run locally; the redacted text is the only text sent to OpenAI or stored.
// Dates are intentionally NOT redacted: limitation and filing deadlines drive lead urgency.
// Limits: names that are not supplied as knownValues are not detectable by regex.

type Rule = { kind: string; pattern: RegExp; replacement: string };

const RULES: Rule[] = [
  { kind: "email", pattern: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, replacement: "[EMAIL]" },
  { kind: "long_number", pattern: /\b(?:\d[ -]?){13,19}\b/g, replacement: "[NUMBER]" },
  { kind: "phone", pattern: /(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/g, replacement: "[PHONE]" },
  { kind: "id_number", pattern: /\b\d{3}[\s-]?\d{3}[\s-]?\d{3}\b/g, replacement: "[NUMBER]" },
  { kind: "postal_code", pattern: /\b[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d\b/gi, replacement: "[POSTAL_CODE]" },
  {
    kind: "street_address",
    pattern: /\b\d{1,6}\s+(?:[NSEW]\.?\s+)?(?:[A-Za-z][A-Za-z.'-]*\s+){0,3}(?:St|Street|Ave|Avenue|Rd|Road|Dr|Drive|Blvd|Boulevard|Way|Trl|Trail|Cres|Crescent|Close|Lane|Ln|Hwy|Highway|Pl|Place|Court|Ct)\b\.?(?:\s+[NSEW]{1,2}\b)?/gi,
    replacement: "[ADDRESS]",
  },
];

export type RedactionResult = {
  text: string;
  counts: Record<string, number>; // counts only, never the removed values
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function redact(input: string, knownValues: string[] = []): RedactionResult {
  let text = input;
  const counts: Record<string, number> = {};

  for (const value of knownValues) {
    const trimmed = value.trim();
    if (trimmed.length < 3) continue;
    const re = new RegExp(escapeRegExp(trimmed), "gi");
    text = text.replace(re, () => {
      counts.known_value = (counts.known_value ?? 0) + 1;
      return "[REDACTED]";
    });
  }

  for (const rule of RULES) {
    text = text.replace(rule.pattern, () => {
      counts[rule.kind] = (counts[rule.kind] ?? 0) + 1;
      return rule.replacement;
    });
  }

  return { text, counts };
}
