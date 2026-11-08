import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about listings, verification, claiming a profile and advertising on Calgary Litigation Lawyers.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "How are lawyers ordered in the directory?",
    a: "Alphabetically. Advertising, tier and claim status do not change order.",
  },
  {
    q: "Is the contact information accurate?",
    a: "Listings use public information from each firm's own website. Each profile links to its source and states whether it has been verified. Firms can claim a profile to correct or add details.",
  },
  {
    q: "What does verified mean?",
    a: "A listing is verified only after its details are checked against a primary source, such as the firm's own records or the Law Society of Alberta directory, and that source is recorded.",
  },
  {
    q: "Can I get a free profile?",
    a: "Yes. Claiming and verification are free.",
  },
  {
    q: "How much does advertising cost?",
    a: "Verified $199, Pro $499, Elite $999. Each tier is a flat fee. Tiers do not change listing order. See the advertise page for what each tier includes.",
  },
  {
    q: "Does this site provide legal advice?",
    a: "No. This is an independent directory and general information resource. Speak with a lawyer about your own situation.",
  },
];

export default function FAQ() {
  return (
    <div className="container" style={{ padding: "60px 20px" }}>
      <h1>FAQ</h1>
      {faqs.map((f) => (
        <div key={f.q}>
          <h3 style={{ marginTop: 24 }}>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
    </div>
  );
}
