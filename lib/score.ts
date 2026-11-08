// Deterministic lead score. Kept out of the model so the rule is auditable.
//   Hot:  contact details supplied AND (high urgency OR a deadline is mentioned)
//   Warm: contact details supplied, OR medium urgency, OR a deadline is mentioned
//   Cold: everything else
export type LeadScore = "Hot" | "Warm" | "Cold";

export function scoreLead(input: {
  urgency: "low" | "medium" | "high";
  deadlineMentioned: boolean;
  contactable: boolean;
}): LeadScore {
  if (input.contactable && (input.urgency === "high" || input.deadlineMentioned)) return "Hot";
  if (input.contactable || input.urgency === "medium" || input.deadlineMentioned) return "Warm";
  return "Cold";
}
