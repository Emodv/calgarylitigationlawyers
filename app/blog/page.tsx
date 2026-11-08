import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description: "Litigation insights for Calgary and Alberta.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  return (
    <div className="container" style={{ padding: "60px 20px" }}>
      <h1>Calgary Litigation Insights</h1>
      <p>Articles on civil and commercial litigation in Calgary and Alberta are in preparation. In the meantime, see the <a href="/glossary">glossary</a> for common terms.</p>
    </div>
  );
}
