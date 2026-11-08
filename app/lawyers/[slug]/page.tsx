import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { lawyers } from "@/lib/lawyers";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return lawyers.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lawyer = lawyers.find((l) => l.slug === slug);
  if (!lawyer) return {};
  return {
    title: lawyer.name,
    description: `Contact details and practice areas for ${lawyer.name} in Calgary, Alberta.`,
    alternates: { canonical: `/lawyers/${lawyer.slug}` },
  };
}

export default async function LawyerProfile({ params }: Props) {
  const { slug } = await params;
  const lawyer = lawyers.find((l) => l.slug === slug);
  if (!lawyer) notFound();

  const digits = lawyer.phone.replace(/\D/g, "");

  return (
    <>
      <section className="profile-hero">
        <div className="container">
          <h1>{lawyer.name}</h1>
          <p>{lawyer.type} · Calgary, Alberta</p>
        </div>
      </section>
      <div className="container">
        <div className="profile-content">
          <h3 style={{ marginTop: 24 }}>Practice Areas</h3>
          <ul style={{ marginLeft: 20, marginTop: 8 }}>
            {lawyer.practiceAreas.map((area) => <li key={area}>{area}</li>)}
          </ul>

          <div className="contact-box">
            <h3>Contact</h3>
            <p><strong>Address:</strong> {lawyer.address}</p>
            <p><strong>Phone:</strong> <a href={`tel:+1${digits}`}>{lawyer.phone}</a></p>
            {lawyer.email && <p><strong>Email:</strong> <a href={`mailto:${lawyer.email}`}>{lawyer.email}</a></p>}
            <p><strong>Website:</strong> <a href={lawyer.website} target="_blank" rel="noopener noreferrer">{lawyer.website}</a></p>
          </div>

          <p style={{ marginTop: 24, color: "#555" }}>
            <strong>Verification status:</strong>{" "}
            {lawyer.verified
              ? "Verified against a primary source."
              : "Not yet verified. Details are taken from the firm's public website."}{" "}
            <a href={lawyer.sourceUrl} target="_blank" rel="noopener noreferrer">View source</a>
          </p>

          <div style={{ marginTop: 30, padding: 20, background: "#fff8e1", borderRadius: 6 }}>
            <p><strong>Is this your firm?</strong> Claiming and verification are free. Verification uses the firm&apos;s own records and public regulator information. Paid advertising never changes listing order or verification status.</p>
            <a href="/advertise" className="btn" style={{ marginTop: 12 }}>Claim Your Profile</a>
          </div>
        </div>
      </div>
    </>
  );
}
