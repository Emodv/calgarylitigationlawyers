import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const articles = {
  "questions-before-contacting-litigation-lawyer": {
    title: "Questions to ask before contacting a litigation lawyer",
    description: "A practical checklist for preparing an initial conversation about a dispute.",
    paragraphs: [
      "Start by identifying the kind of dispute, the people or organizations involved, and any upcoming court or contract dates you already know about. You do not need to send sensitive documents to a directory to find a firm’s public contact details.",
      "Ask whether the lawyer’s stated practice includes disputes like yours, who would handle the file day to day, how the firm charges, what initial steps may be involved, and what information the firm needs to check for conflicts. Ask for the proposed fee arrangement and scope in writing.",
      "Avoid choosing counsel based on a directory label or a promotional claim. Review the firm’s own information and verify the individual lawyer’s status using the Law Society of Alberta’s directory. The Law Society does not endorse individual lawyers.",
      "Deadlines and legal options depend on the facts and documents. If a deadline may be approaching, contact a lawyer promptly rather than relying on a general guide."
    ],
    sources: [{ label: "Law Society of Alberta: Find a Lawyer", href: "https://www.lawsociety.ab.ca/public/findalawyer/" }]
  },
  "calgary-litigation-directory-sources": {
    title: "How to check lawyer and firm information",
    description: "Where to confirm a lawyer’s status and how to read an independent directory listing.",
    paragraphs: [
      "A directory listing is a starting point. Follow its source link to the firm or lawyer’s own website to confirm contact details and stated practice areas.",
      "The source-check date on this site records when the page was compared with the linked first-party source. It is not an independent licensing check, a quality assessment, or a promise that the information has not changed since then.",
      "Use the Law Society of Alberta’s Lawyer Directory to check an individual lawyer’s practising status and available public contact information. The Law Society does not recommend or endorse individual lawyers.",
      "Compare firms based on your needs, ask about relevant experience and fees, and decide whom to contact. This site does not rate, rank, or select counsel for visitors."
    ],
    sources: [{ label: "Law Society of Alberta: Find a Lawyer", href: "https://www.lawsociety.ab.ca/public/findalawyer/" }]
  }
};

type Slug = keyof typeof articles;
type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return Object.keys(articles).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug as Slug];
  return article ? { title: article.title, description: article.description, alternates: { canonical: `/blog/${slug}` } } : { title: "Guide not found" };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles[slug as Slug];
  if (!article) notFound();
  return (
    <article className="container section article-page">
      <Link href="/blog" className="text-link">← All guides</Link>
      <p className="eyebrow">General information · Reviewed 6 November 2026</p>
      <h1>{article.title}</h1>
      {article.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      <h2>Sources</h2>
      <ul>{article.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul>
      <p className="disclaimer">This guide is general information, not legal advice. Laws and procedures can change. Confirm current information with a lawyer or official source.</p>
    </article>
  );
}
