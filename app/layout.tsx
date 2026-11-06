import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://calgarylitigationlawyers.com"),
  title: {
    default: "Calgary Litigation Lawyers | #1 Directory & Rankings",
    template: "%s | Calgary Litigation Lawyers"
  },
  description: "The definitive hub for Calgary litigation lawyers. Browse ranked profiles, contact details, practice areas, blog, glossary, and news. Find the right litigator in Calgary, Alberta.",
  keywords: ["Calgary litigation lawyers", "civil litigation Calgary", "commercial litigation lawyers Calgary", "best litigation lawyers Calgary", "Alberta lawyers"],
  openGraph: {
    title: "Calgary Litigation Lawyers Directory",
    description: "Ranked profiles and contact information for every litigation lawyer in Calgary.",
    url: "https://calgarylitigationlawyers.com",
    siteName: "Calgary Litigation Lawyers",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container">
            <a href="/" className="logo">Calgary Litigation Lawyers</a>
            <nav>
              <a href="/">Directory</a>
              <a href="/blog">Blog</a>
              <a href="/glossary">Glossary</a>
              <a href="/news">News</a>
              <a href="/advertise">Featured Listing</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="container">
            <p>© {new Date().getFullYear()} Calgary Litigation Lawyers. Independent directory. Not a law firm. Rankings compiled from public sources. Contact details are publicly available information.</p>
            <p><a href="/advertise">Lawyers: Claim or upgrade your profile for $1,000/month</a></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
