import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Litigation glossary",
  description: "Plain-language explanations of common civil and commercial litigation terms. General information only."
};

const terms = [
  ["Litigation", "A process for resolving a dispute through a court. Some disputes may instead be resolved through negotiation, mediation, or arbitration."],
  ["Statement of claim", "A document used to start many civil actions. The applicable court rules and the type of proceeding determine what it must contain."],
  ["Limitation period", "A legal time limit that may apply to starting a claim. The deadline and any exceptions depend on the claim and facts; get legal advice promptly if timing may matter."],
  ["Summary judgment", "A court procedure that may resolve some or all issues without a conventional trial when the applicable legal test is met."],
  ["Class action", "A court proceeding in which a representative plaintiff seeks to advance common claims for a group, subject to the court’s certification process."],
  ["Injunction", "A court order requiring a person to do something or refrain from doing something. The test and procedure depend on the circumstances."],
  ["Discovery", "Court-supervised or court-rule-based steps for exchanging relevant information and evidence before trial."],
  ["Mediation", "A settlement process where a neutral mediator helps participants discuss possible resolution. The mediator does not decide the dispute."],
  ["Arbitration", "A private dispute-resolution process in which an arbitrator hears the parties and may issue a binding decision, depending on the agreement and law."],
  ["Appeal", "A request for a higher court to review a lower court decision on grounds allowed by law and court rules."]
];

export default function Glossary() {
  return (
    <section className="container section">
      <p className="eyebrow">Plain-language reference</p>
      <h1>Litigation glossary</h1>
      <p className="page-intro">These short definitions are general explanations, not legal advice. Court rules and legal tests can change and may depend on the specific matter.</p>
      <div className="card" style={{ marginTop: 24, maxWidth: 900 }}>
        {terms.map(([term, definition]) => <section key={term} style={{ padding: "14px 0", borderBottom: "1px solid #dce2e8" }}><h2>{term}</h2><p>{definition}</p></section>)}
        <p className="source-note">For lawyer status and official public information, use the <a href="https://www.lawsociety.ab.ca/public/findalawyer/" target="_blank" rel="noopener noreferrer">Law Society of Alberta Lawyer Directory</a>. For advice on a specific matter, speak with a lawyer.</p>
      </div>
    </section>
  );
}
