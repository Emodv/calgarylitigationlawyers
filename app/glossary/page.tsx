export default function Glossary() {
  const terms = [
    { term: "Litigation", definition: "The process of taking legal action through the courts to resolve a dispute." },
    { term: "Statement of Claim", definition: "The document that starts a lawsuit in Alberta, setting out the facts and the remedy sought." },
    { term: "Limitation Period", definition: "The deadline by which a claim must be filed. In Alberta most civil claims have a two-year limitation period under the Limitations Act." },
    { term: "Summary Judgment", definition: "A procedure allowing a court to decide a claim without a full trial when there is no genuine issue requiring a trial." },
    { term: "Class Action", definition: "A lawsuit brought by one or more plaintiffs on behalf of a larger group of people with similar claims." },
    { term: "Oppression Remedy", definition: "A statutory remedy under the Alberta Business Corporations Act that allows shareholders to seek relief when a corporation’s affairs are conducted in an oppressive or unfairly prejudicial manner." },
  ];

  return (
    <div className="container" style={{ padding: "60px 20px" }}>
      <h1>Calgary Litigation Glossary</h1>
      <p>Plain-language definitions of terms you will encounter in Alberta civil and commercial litigation.</p>
      <div style={{ marginTop: 30 }}>
        {terms.map((t) => (
          <div key={t.term} style={{ marginBottom: 24 }}>
            <h3>{t.term}</h3>
            <p>{t.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
