import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alberta court and law updates",
  description: "Official sources for Alberta court notices, decisions and Law Society updates."
};

const sources = [
  { title: "Law Society of Alberta", description: "Regulator resources, public notices and professional updates.", url: "https://www.lawsociety.ab.ca/" },
  { title: "Court of King's Bench of Alberta", description: "Court information, announcements and resources.", url: "https://albertacourts.ca/kb" },
  { title: "Alberta Court of Appeal", description: "Court information, decisions and announcements.", url: "https://albertacourts.ca/ca" },
  { title: "Alberta Courts", description: "Official information about Alberta's courts and services.", url: "https://albertacourts.ca/" }
];

export default function News() {
  return (
    <section className="container section">
      <p className="eyebrow">Official source links</p>
      <h1>Alberta court and legal updates</h1>
      <p className="page-intro">This page links to official sources. It is not a live news feed, and no current legal update is represented here as independently reviewed.</p>
      <div className="grid">{sources.map((source) => <article className="card" key={source.url}><h2>{source.title}</h2><p>{source.description}</p><a className="text-link" href={source.url} target="_blank" rel="noopener noreferrer">Visit official source ↗</a></article>)}</div>
    </section>
  );
}
