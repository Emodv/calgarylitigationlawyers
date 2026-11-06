export default function Blog() {
  return (
    <div className="container" style={{ padding: "60px 20px" }}>
      <h1>Calgary Litigation Insights</h1>
      <p>Practical articles on civil and commercial litigation in Calgary and Alberta.</p>
      
      <div className="grid" style={{ marginTop: 30 }}>
        <div className="card">
          <h3>How to Choose a Litigation Lawyer in Calgary</h3>
          <p>What to look for in experience, practice focus, and courtroom record when hiring for a commercial or civil dispute.</p>
          <a href="/blog/how-to-choose-litigation-lawyer-calgary">Read →</a>
        </div>
        <div className="card">
          <h3>Understanding the Alberta Rules of Court</h3>
          <p>Key timelines and procedures that affect most Calgary civil litigation matters.</p>
          <a href="/blog/alberta-rules-of-court-overview">Read →</a>
        </div>
      </div>
      <p style={{ marginTop: 30 }}>More articles published weekly. Topics cover commercial disputes, construction liens, employment litigation, class actions, and more.</p>
    </div>
  );
}
