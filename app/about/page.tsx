export default function About() {
  return (
    <section className="container section">
      <p className="eyebrow">About the directory</p>
      <h1>An independent Calgary litigation directory</h1>
      <p className="page-intro">This site helps visitors browse publicly available firm and lawyer information and reach the firm’s own website.</p>
      <div className="card" style={{ maxWidth: 850, marginTop: 24 }}>
        <h2>How listings are prepared</h2>
        <p>Each listing links to a first-party firm or lawyer source. The “source checked” date shows when the displayed details were compared with that source. It does not confirm current Law Society status, recommend a lawyer, or guarantee that every detail remains current.</p>
        <p>The current directory is an initial set of listings and is not a complete list of Calgary litigation counsel. Practice areas are summarized from each source and are not independent assessments.</p>
        <p>For the current practising status of an individual lawyer, use the <a href="https://www.lawsociety.ab.ca/public/findalawyer/" target="_blank" rel="noopener noreferrer">Law Society of Alberta Lawyer Directory</a>. We do not bulk reproduce its directory records.</p>
        <p>This site is not a law firm, does not provide legal advice, and does not endorse or rank lawyers.</p>
      </div>
    </section>
  );
}
