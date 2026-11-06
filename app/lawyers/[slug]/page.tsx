import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { directoryEntries } from "@/lib/lawyers";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return directoryEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = directoryEntries.find((item) => item.slug === slug);
  if (!entry) return { title: "Listing not found" };
  return {
    title: `${entry.name} | Calgary litigation directory`,
    description: `${entry.summary} Practice areas and contact details sourced from the official website.`,
    alternates: { canonical: `/lawyers/${entry.slug}` }
  };
}

export default async function DirectoryProfile({ params }: PageProps) {
  const { slug } = await params;
  const entry = directoryEntries.find((item) => item.slug === slug);
  if (!entry) notFound();

  return (
    <section className="container section profile-page">
      <Link href="/lawyers" className="text-link">← Back to directory</Link>
      <p className="eyebrow">{entry.kind === "firm" ? "Law firm listing" : "Lawyer listing"}</p>
      <h1>{entry.name}</h1>
      {entry.firmName && <p className="profile-firm">{entry.title ? `${entry.title} · ` : ""}{entry.firmName}</p>}
      <p className="page-intro">{entry.summary}</p>
      <div className="profile-columns">
        <article className="card profile-card">
          <h2>Stated practice areas</h2>
          <ul className="practice-list">{entry.practiceAreas.map((area) => <li key={area}>{area}</li>)}</ul>
          <p className="source-note">Practice areas are summarized from the linked first-party source.</p>
        </article>
        <aside className="card contact-card">
          <h2>Contact details</h2>
          {entry.address && <p><strong>Address</strong><br />{entry.address}</p>}
          {entry.phone && <p><strong>Phone</strong><br /><a href={`tel:${entry.phone.replace(/[^+\d]/g, "")}`}>{entry.phone}</a></p>}
          {entry.email && <p><strong>Email</strong><br /><a href={`mailto:${entry.email}`}>{entry.email}</a></p>}
          <p><strong>Website</strong><br /><a href={entry.website} target="_blank" rel="noopener noreferrer">Visit official website ↗</a></p>
        </aside>
      </div>
      <div className="notice source-note-block">
        Source checked {entry.sourceCheckedAt}. This confirms that the listing was compared with its cited website on that date; it is not a Law Society status check or an endorsement.
        <br /><a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer">View source page ↗</a>
      </div>
      <p className="disclaimer">Confirm current contact details and practising status with the lawyer or the <a href="https://www.lawsociety.ab.ca/public/findalawyer/" target="_blank" rel="noopener noreferrer">Law Society of Alberta</a>. This directory does not provide legal advice.</p>
    </section>
  );
}
