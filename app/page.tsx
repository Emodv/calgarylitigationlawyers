import { listLawyers } from "@/lib/lawyers";
import { LawyerCard } from "@/components/LawyerCard";

export default function Home() {
  const lawyers = listLawyers();

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Calgary Litigation Lawyers</h1>
          <p>An independent directory of litigation lawyers in Calgary, Alberta. Contact details and practice areas, listed alphabetically.</p>
          <a href="/lawyers" className="btn">Search the Directory</a>
        </div>
      </section>

      <section id="directory" className="container">
        <h2 style={{ margin: "40px 0 10px" }}>Litigation Lawyers in Calgary</h2>
        <p style={{ marginBottom: 20, color: "#555" }}>
          Listings are sorted alphabetically. Paid advertising does not change order. Each profile shows whether its details have been verified.
        </p>
        <div className="grid">
          {lawyers.map((lawyer) => <LawyerCard key={lawyer.slug} lawyer={lawyer} />)}
        </div>
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <p>Lawyers and firms: <a href="/pricing" className="btn">Claim your profile</a></p>
        </div>
      </section>
    </>
  );
}
