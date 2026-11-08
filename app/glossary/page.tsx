import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calgary Litigation Glossary",
  description: "Plain-language definitions of litigation terms used in Alberta civil and commercial court proceedings.",
  alternates: { canonical: "/glossary" },
};

const terms = [
  { term: "Affidavit", definition: "A written statement of facts that a person swears or affirms to be true before an authorized person, filed as evidence in a court proceeding." },
  { term: "Costs", definition: "The amount one party may be ordered to pay another toward legal expenses at the end of a proceeding. Costs awards are usually set by a court under the Alberta Rules of Court." },
  { term: "Class Action", definition: "A lawsuit brought by one or more representative plaintiffs on behalf of a group of people with similar claims. Alberta class actions are governed by the Class Proceedings Act." },
  { term: "Interlocutory Injunction", definition: "A temporary court order, made before trial, that requires a party to do or stop doing something until the main claim is decided." },
  { term: "Limitation Period", definition: "The deadline by which a claim must be started. In Alberta, most civil claims have a two-year basic limitation period under the Limitations Act." },
  { term: "Mediation", definition: "A voluntary process in which a neutral third party helps the parties try to reach a settlement. Mediation does not produce a binding decision unless the parties sign an agreement." },
  { term: "Oppression Remedy", definition: "A statutory remedy under the Alberta Business Corporations Act that lets a complainant ask the court for relief when a corporation's affairs are conducted in an oppressive or unfairly prejudicial way." },
  { term: "Questioning", definition: "Pre-trial questioning under oath, in which one party's lawyer asks the other party questions about the matters in dispute. Formerly called examination for discovery." },
  { term: "Receivership", definition: "A process in which a court or secured creditor appoints a receiver to take control of a debtor's property and realize its value, usually to repay creditors." },
  { term: "Statement of Claim", definition: "The document that starts a civil lawsuit in Alberta. It sets out the facts relied on and the remedy sought." },
  { term: "Statement of Defence", definition: "The document a defendant files in response to a statement of claim, setting out which facts are admitted or denied and any defences raised." },
  { term: "Summary Judgment", definition: "A procedure that lets a court decide a claim without a full trial when there is no genuine issue requiring a trial." },
];

type SearchParams = Promise<{ q?: string }>;

export default async function Glossary({ searchParams }: { searchParams: SearchParams }) {
  const { q = "" } = await searchParams;
  const term = q.trim().toLowerCase();
  const results = terms
    .filter((t) => !term || `${t.term} ${t.definition}`.toLowerCase().includes(term))
    .sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="container" style={{ padding: "60px 20px" }}>
      <h1>Calgary Litigation Glossary</h1>
      <p>Plain-language definitions of terms used in Alberta civil and commercial litigation. General information only, not legal advice.</p>

      <form method="get" action="/glossary" style={{ display: "flex", gap: 12, margin: "24px 0" }}>
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search terms or definitions"
          aria-label="Search glossary"
          style={{ flex: 1, padding: "12px 14px", border: "1px solid #ccd", borderRadius: 4 }}
        />
        <button type="submit" className="btn" style={{ border: "none", cursor: "pointer" }}>Search</button>
      </form>

      <p style={{ color: "#555", marginBottom: 20 }}>{results.length} {results.length === 1 ? "term" : "terms"}</p>

      {results.length === 0 ? (
        <p>No terms match your search.</p>
      ) : (
        results.map((t) => (
          <div key={t.term} id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")} style={{ marginBottom: 24 }}>
            <h3>{t.term}</h3>
            <p>{t.definition}</p>
          </div>
        ))
      )}
    </div>
  );
}
