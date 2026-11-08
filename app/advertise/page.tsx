import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise and Claim Your Profile",
  description: "Claim your free profile or choose a flat-fee advertising tier. Placement is the same across all tiers.",
  alternates: { canonical: "/advertise" },
};

const tiers = [
  {
    name: "Verified",
    price: "$199",
    items: [
      "Claimed profile with firm-supplied contact details",
      "Verification badge once a primary source is recorded (verification itself is free)",
    ],
  },
  {
    name: "Pro",
    price: "$499",
    items: [
      "Everything in Verified",
      "Enquiry routing: qualified enquiries in your practice areas forwarded to you, with consent recorded",
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

export default function Advertise() {
  return (
    <div className="container" style={{ padding: "60px 20px" }}>
      <h1>Claim Your Profile</h1>
      <p style={{ fontSize: "1.1rem", margin: "20px 0" }}>
        Claiming a profile and verification are free. Paid tiers buy advertising and enquiry routing. They do not buy placement, rankings, or verification.
      </p>

      <div className="grid" style={{ marginTop: 30 }}>
        {tiers.map((t) => (
          <div key={t.name} className="card">
            <h2>{t.name} — {t.price}</h2>
            <ul style={{ margin: "16px 0 16px 20px" }}>
              {t.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <a href={`mailto:hello@calgarylitigationlawyers.com?subject=${encodeURIComponent(`${t.name} tier enquiry`)}`} className="btn">
              Request {t.name}
            </a>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 40 }}>Our Rules</h2>
      <ul style={{ margin: "16px 0 16px 20px" }}>
        <li>Listing order is alphabetical for every firm, regardless of payment.</li>
        <li>No pay-to-rank, no paid reviews, and no fake ratings.</li>
        <li>We do not take a contingency fee or a share of any matter.  </li>
        <li>Every verified listing cites its primary source.</li>
      </ul>
    </div>
  );
}
