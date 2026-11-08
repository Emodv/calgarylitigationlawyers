import Link from "next/link";
import type { Lawyer } from "@/lib/lawyers";

export function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  return (
    <Link href={`/lawyers/${lawyer.slug}`} className="card" style={{ textDecoration: "none", color: "inherit" }}>
      <h3>{lawyer.name}</h3>
      <p style={{ color: "#666", margin: "8px 0" }}>{lawyer.type}</p>
      <p style={{ fontSize: "0.9rem" }}>{lawyer.practiceAreas.slice(0, 3).join(" · ")}</p>
      <p style={{ marginTop: 12, fontWeight: 600, color: "var(--navy)" }}>
        {lawyer.verified ? "Verified listing" : "Listing not yet verified"} · View profile →
      </p>
    </Link>
  );
}
