export default function FAQ() {
  return (
    <section className="container section">
      <p className="eyebrow">Common questions</p>
      <h1>Frequently asked questions</h1>
      <div className="card" style={{ maxWidth: 850, marginTop: 24 }}>
        <h2>How are listings ordered?</h2>
        <p>Listings are displayed alphabetically. The directory does not rank lawyers by quality or experience.</p>
        <h2>Is this a complete list of Calgary litigation lawyers?</h2>
        <p>No. This is an initial directory and its coverage is incomplete.</p>
        <h2>Are lawyers verified by the Law Society?</h2>
        <p>No. We check listed details against the linked firm or lawyer website. Check a lawyer’s current status in the <a href="https://www.lawsociety.ab.ca/public/findalawyer/" target="_blank" rel="noopener noreferrer">Law Society of Alberta directory</a>.</p>
        <h2>How current is the contact information?</h2>
        <p>Each profile shows the date its first-party source was checked. Confirm current details directly with the firm or lawyer before relying on them.</p>
        <h2>Does this site provide legal advice or refer a specific lawyer?</h2>
        <p>No. It is a directory and general information resource. Visitors choose whom to contact.</p>
      </div>
    </section>
  );
}
