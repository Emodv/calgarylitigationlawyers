"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { DirectoryEntry } from "@/lib/lawyers";

export default function DirectorySearch({ entries }: { entries: DirectoryEntry[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesKind = kind === "all" || entry.kind === kind;
      const haystack = [entry.name, entry.firmName, entry.summary, ...entry.practiceAreas].filter(Boolean).join(" ").toLowerCase();
      return matchesKind && (!term || haystack.includes(term));
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [entries, kind, query]);

  return (
    <>
      <div className="directory-controls" role="search">
        <label className="sr-only" htmlFor="directory-search">Search firms, lawyers, or practice areas</label>
        <input id="directory-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, firm, or practice area" />
        <label className="sr-only" htmlFor="directory-kind">Filter by profile type</label>
        <select id="directory-kind" value={kind} onChange={(event) => setKind(event.target.value)}>
          <option value="all">Firms and lawyers</option>
          <option value="firm">Law firms</option>
          <option value="lawyer">Individual lawyers</option>
        </select>
      </div>
      <p className="results-count" aria-live="polite">{results.length} source-checked listings in this initial directory</p>
      <div className="grid">
        {results.map((entry) => (
          <article key={entry.slug} className="card">
            <p className="eyebrow">{entry.kind === "firm" ? "Law firm" : "Individual lawyer"}</p>
            <h3><Link href={`/lawyers/${entry.slug}`}>{entry.name}</Link></h3>
            {entry.firmName && <p className="firm-name">{entry.title ? `${entry.title} · ` : ""}{entry.firmName}</p>}
            <p>{entry.practiceAreas.slice(0, 4).join(" · ")}</p>
            <Link className="text-link" href={`/lawyers/${entry.slug}`}>View listing →</Link>
          </article>
        ))}
        {results.length === 0 && <p className="empty-state">No listings match those filters. Try another name or practice area.</p>}
      </div>
    </>
  );
}
