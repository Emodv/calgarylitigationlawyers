import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing: Claim Your Profile and Sponsored Advertising",
  description: "Claiming and verification are free. Sponsored advertising is a separate flat fee and never changes directory search order.",
  alternates: { canonical: "/pricing" },
};

const tiers = [
  {
    name: "Verified",
    price: "$199",
    items: [
      "Sponsored label on your profile (search order is unchanged)",
      "Firm-supplied details shown on your profile after verification",
    ],
  },
  {
    name: "Pro",
    price: "$499",
    items: [
      "Everything in Verified",
      "Enquiry routing: client enquiries in your practice areas are sent to your firm, with client consent recorded",
    ],
  },
  {
    name: "Elite",
    price: "$999",
    items: [
      "Everything in Pro",
      "Enhanced profile: biography, team, case highlights and photos, each subject to verification",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="container" style={{ padding: "60px 20px" }}>
      <h1>Pricing</h1>
      <p style={{ fontSize: "1.1rem", margin: "20px 0" }}>
        Claiming a profile is free. Verification is free. Your verified public contact details are always shown.
        Sponsored advertising is a separate flat fee for extra features. It is labeled Sponsored and is kept separate from directory search.
      </p>

      <div className="grid" style={{ marginTop: 30 }}>
        {tiers.map((t) => (
          <div key={t.name} className="card sponsored">
            <span className="badge-sponsored">Sponsored</span>
            <h2 style={{ marginTop: 12 }}>{t.name}: {t.price} flat fee</h2>
            <ul style={{ margin: "16px 0 16px 20px" }}>
              {t.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <a href={`mailto:hello@calgarylitigationlawyers.com?subject=${encodeURIComponent(`${t.name} advertising enquiry`)}`} className="btn">
              Enquire about {t.name}
            </a>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 40 }}>How the directory works</h2>
      <ul style={{ margin: "16px 0 16px 20px" }}>
        <li>Search results are alphabetical or filtered by practice area. Sponsored status does not change order.</li>
        <li>Verification is separate from payment and is based on the firm's own records and public regulator information.</li>
        <li>Public contact details for verified listings are not behind a paywall.</li>
      </ul>
    </div>
  );
}
