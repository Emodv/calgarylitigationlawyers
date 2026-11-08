import type { Metadata } from "next";
import { listLawyers, allPracticeAreas } from "@/lib/lawyers";
import { LawyerCard } from "@/components/LawyerCard";

export const metadata: Metadata = {
  title: "Calgary Litigation Lawyers Directory",
  description: "Search Calgary litigation lawyers by name, firm type or practice area. Alphabetical listing with public contact details.",
  alternates: { canonical: "/lawyers" },
};

type SearchParams = Promise<{ q?: string; area?: string }>;

export default async function DirectoryPage({ searchParams }: { searchParams: SearchParams }) {
  const { q = "", area = "" } = await searchParams;
  const term = q.trim().toLowerCase();
  const areas = allPracticeAreas();

  const results = listLawyers().filter((l) => {
    if (area && !l.practiceAreas.includes(area)) return false;
    if (!term) return true;
    const haystack = [l.name, l.type, l.address, ...l.practiceAreas].join(" ").toLowerCase();
    return haystack.includes(term);
  });

  return (
    <div className="container" style={{ padding: "60px 20px" }}>
      <h1>Calgary Litigation Lawyers</h1>
      <p style={{ margin: "10px 0 24px", color: "#555" }}>
        Listed alphabetically. Search by name, firm type or practice area.
      </p>

      <form method="get" action="/lawyers" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 30 }}>
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Name, firm or keyword"
          aria-label="Search lawyers"
          style={{ flex: "1 1 260px", padding: "12px 14px", border: "1px solid #ccd", borderRadius: 4 }}
        />
        <select
          name="area"
          defaultValue={area}
          aria-label="Filter by practice area"
          style={{ flex: "1 1 240px", padding: "12px 14px", border: "1px solid #ccd", borderRadius: 4 }}
        >
          <option value="">All practice areas</option>
          {areas.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <button type="submit" className="btn" style={{ border: "none", cursor: "pointer" }}>Search</button>
        {(q || area) && <a href="/lawyers" style={{ alignSelf: "center", color: "var(--navy)" }}>Clear</a>}
      </form>

      <p style={{ marginBottom: 16, color: "#555" }}>
        {results.length} {results.length === 1 ? "listing" : "listings"}
      </p>

      {results.length === 0 ? (
        <p>No listings match your search. Try a broader term or clear the filters.</p>
      ) : (
        <div className="grid">
          {results.map((lawyer) => <LawyerCard key={lawyer.slug} lawyer={lawyer} />)}
        </div>
      )}
    </div>
  );
}
