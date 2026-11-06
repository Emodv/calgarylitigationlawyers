import Link from "next/link";

const guides = [
  { slug: "questions-before-contacting-litigation-lawyer", title: "Questions to ask before contacting a litigation lawyer", summary: "A practical checklist for preparing an initial conversation about a dispute." },
  { slug: "calgary-litigation-directory-sources", title: "How to check lawyer and firm information", summary: "Where to confirm a lawyer’s status and how to read an independent directory listing." }
];

export default function Blog() {
  return (
    <section className="container section">
      <p className="eyebrow">Plain-language guides</p>
      <h1>Calgary litigation guides</h1>
      <p className="page-intro">General information to help you prepare to contact legal counsel. These guides are not legal advice.</p>
      <div className="grid">
        {guides.map((guide) => <article className="card" key={guide.slug}><h2>{guide.title}</h2><p>{guide.summary}</p><Link className="text-link" href={`/blog/${guide.slug}`}>Read guide →</Link></article>)}
      </div>
    </section>
  );
}
