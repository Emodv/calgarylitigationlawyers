// Shared validation for enquiry payloads. Used by /api/intake and /api/match.
import { PRACTICE_AREAS } from "@/lib/practice-areas";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type ParsedInput = {
  description: string;
  name?: string;
  email?: string;
  phone?: string;
  practiceArea?: string;
  lawyerId?: string;
};

export type ParseResult = { ok: true; value: ParsedInput } | { ok: false; error: string };

function text(b: Record<string, unknown>, key: string, max: number): string | undefined | null {
  const v = b[key];
  if (v === undefined || v === null || v === "") return undefined;
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (t.length === 0) return undefined;
  return t.length > max ? null : t;
}

export function parseInput(body: unknown, requireConsent: boolean): ParseResult {
  if (!body || typeof body !== "object") return { ok: false, error: "Request body must be a JSON object." };
  const b = body as Record<string, unknown>;

  if (requireConsent && b.consent !== true) {
    return { ok: false, error: "Consent to the privacy notice is required before submitting." };
  }

  const description = typeof b.description === "string" ? b.description.trim() : "";
  if (description.length < 20 || description.length > 4000) {
    return { ok: false, error: "Description must be between 20 and 4000 characters." };
  }

  const name = text(b, "name", 120);
  const email = text(b, "email", 254);
  const phone = text(b, "phone", 30);
  const practiceArea = text(b, "practiceArea", 60);
  const lawyerId = text(b, "lawyerId", 36);

  if (name === null) return { ok: false, error: "Name is too long." };
  if (email === null || (email !== undefined && !EMAIL_RE.test(email))) return { ok: false, error: "Email address is not valid." };
  if (phone === null || (phone !== undefined && (phone.replace(/\D/g, "").length < 10 || phone.replace(/\D/g, "").length > 15))) {
    return { ok: false, error: "Phone number is not valid." };
  }
  if (practiceArea === null || (practiceArea !== undefined && !(PRACTICE_AREAS as readonly string[]).includes(practiceArea))) {
    return { ok: false, error: "Practice area is not recognised." };
  }
  if (lawyerId === null || (lawyerId !== undefined && !UUID_RE.test(lawyerId))) {
    return { ok: false, error: "Lawyer reference is not valid." };
  }

  return { ok: true, value: { description, name, email, phone, practiceArea, lawyerId } };
}
