// The five verified practice categories plus an explicit "unclear" bucket.
// The database enforces this list. Unclear matches must be resolved by the user, never defaulted.
export const PRACTICE_AREAS = [
  "Commercial Litigation",
  "Civil Litigation",
  "Estate & Trust",
  "Employment",
  "Insolvency",
  "Other / Unclear",
] as const;

export type PracticeArea = (typeof PRACTICE_AREAS)[number];

export const SELECTABLE_AREAS = PRACTICE_AREAS.filter((a) => a !== "Other / Unclear");
