import { lawyers } from "@/lib/lawyers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return lawyers.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const lawyer = lawyers.find((l) => l.slug === params.slug);
  if (!lawyer) return {};
  return {
    title: `${lawyer.name} | Calgary Litigation Lawyer`,
    description: `${lawyer.bio} Address, phone, and contact details for ${lawyer.name} in Calgary.`,
  };
}

export default function LawyerProfile({ params }: { params: { slug: string } }) {
  const lawyer = lawyers.find((l) => l.slug === params.slug);
  if (!lawyer) notFound();

  return (
    <>
      <section className="profile-hero">
        <div className="container">
          <h1>{lawyer.name}</h1>
          <p>{lawyer.type} · Ranking Score: {lawyer.rankingScore}</p>
        </div>
      </section>
      <div className="container">
        <div className="profile-content">
          <p>{lawyer.bio}</p>
          
          <h3 style={{ marginTop: 24 }}>Practice Areas</h3>
          <ul style={{ marginLeft: 20, marginTop: 8 }}>
            {lawyer.practiceAreas.map((area) => <li key={area}>{area}</li>)}
          </ul>

          {lawyer.rankings.length > 0 && (
            <>
              <h3 style={{ marginTop: 24 }}>Public Recognition</h3>
              <ul style={{ marginLeft: 20, marginTop: 8 }}>
                {lawyer.rankings.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </>
          )}

          <div className="contact-box">
            <h3>Contact</h3>
            <p><strong>Address:</strong> {lawyer.address}</p>
            <p><strong>Phone:</strong> <a href={`tel:${lawyer.phone}`}>{lawyer.phone}</a></p>
            {lawyer.email && <p><strong>Email:</strong> <a href={`mailto:${lawyer.email}`}>{lawyer.email}</a></p>}
            {lawyer.website && <p><strong>Website:</strong> <a href={lawyer.website} target="_blank" rel="noopener noreferrer">{lawyer.website}</a></p>}
          </div>

          <div style={{ marginTop: 30, padding: 20, background: "#fff8e1", borderRadius: 6 }}>
            <p><strong>Is this your firm?</strong> Claim this profile to add a full bio, team photos, case results, and appear higher in rankings. Featured listings start at $1,000/month and generate qualified leads.</p>
            <a href="/advertise" className="btn" style={{ marginTop: 12 }}>Claim or Upgrade Profile</a>
          </div>
        </div>
      </div>
    </>
  );
}
