import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Calgary Litigation Lawyers, an independent directory of litigation lawyers in Calgary, Alberta.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <div className="container" style={{ padding: "60px 20px" }}>
      <h1>About Calgary Litigation Lawyers</h1>
      <p>An independent directory for finding litigation lawyers in Calgary, Alberta.</p>
      <p style={{ marginTop: 16 }}>We publish contact details that firms and lawyers make available publicly, with a link to each source. Listings are alphabetical and are not ranked.</p>
      <p style={{ marginTop: 16 }}>This site is not a law firm and does not provide legal advice. Confirm details directly with the firm before hiring counsel.</p>
      <p style={{ marginTop: 16 }}>Lawyers and firms can claim their profiles for free. Sponsored advertising tiers are listed on the pricing page.</p>
    </div>
  );
}
