import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsorship information",
  description: "Information about potential clearly labeled sponsorships in the Calgary litigation directory."
};

export default function Advertise() {
  return (
    <section className="container section">
      <p className="eyebrow">For law firms and lawyers</p>
      <h1>Sponsorship information</h1>
      <p className="page-intro">The directory is testing whether firms want clearly labeled advertising alongside a neutral, alphabetical directory.</p>
      <div className="card" style={{ maxWidth: 760, marginTop: 24 }}>
        <h2>Proposed pilot</h2>
        <p>A fixed monthly sponsorship price of $1,000 is being considered. No paid placement is currently active, and no lead volume is promised.</p>
        <ul>
          <li>Any paid placement will be clearly labeled “Sponsored.”</li>
          <li>Payment will not change the alphabetical directory order or imply a quality ranking.</li>
          <li>Fees will not be based on a specific client, file, or legal fee.</li>
          <li>Public contact details will remain visible on listings where they are published by the firm or lawyer.</li>
        </ul>
        <p className="source-note">The advertising model and any paid placement are subject to professional-conduct review before sale. Sponsorship inquiries are not yet open.</p>
      </div>
    </section>
  );
}
