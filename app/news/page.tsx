import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description: "Updates from Calgary Litigation Lawyers.",
  alternates: { canonical: "/news" },
};

export default function News() {
  return (
    <div className="container" style={{ padding: "60px 20px" }}>
      <h1>News</h1>
      <div className="card" style={{ marginTop: 30 }}>
        <h3>Directory Launch</h3>
        <p>The directory is live with initial profiles drawn from firm websites. Profiles marked &ldquo;not yet verified&rdquo; are pending a primary-source check.</p>
      </div>
    </div>
  );
}
