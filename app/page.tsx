import { lawyers } from "@/lib/lawyers";

export default function Home() {
  const sorted = [...lawyers].sort((a, b) => b.rankingScore - a.rankingScore);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Calgary Litigation Lawyers</h1>
          <p>The #1 independent directory and ranking hub for litigation lawyers in Calgary, Alberta. Every profile includes public contact details so you can reach them directly.</p>
          <a href="#directory" className="btn">Browse Ranked Lawyers</a>
        </div>
      </section>

      <section id="directory" className="container">
        <h2 style={{ margin: "40px 0 10px" }}>Ranked Calgary Litigation Lawyers</h2>
        <p style={{ marginBottom: 20, color: "#555" }}>Rankings compiled from public sources including Chambers, Lexpert, Best Lawyers, and firm recognition. Scores are directional and updated as new data appears. Lawyers can claim profiles to add bios, photos, and case highlights.</p>
        
        <div className="grid">
          {sorted.map((lawyer) => (
            <a key={lawyer.slug} href={`/lawyers/${lawyer.slug}`} className={`card ${lawyer.featured ? "featured" : ""}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <h3>{lawyer.name}</h3>
                <span className="score">{lawyer.rankingScore}</span>
              </div>
              <p style={{ color: "#666", margin: "8px 0" }}>{lawyer.type}</p>
              <p style={{ fontSize: "0.9rem" }}>{lawyer.practiceAreas.slice(0, 3).join(" · ")}</p>
              <p style={{ marginTop: 12, fontWeight: 600, color: "var(--navy)" }}>View Profile →</p>
            </a>
          ))}
        </div>

        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <p>More lawyers being added. <a href="/advertise" className="btn">Get Your Firm Listed & Featured</a></p>
        </div>
      </section>
    </>
  );
}
