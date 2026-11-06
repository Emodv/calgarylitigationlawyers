import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://calgarylitigationlawyers.com"),
  title: { default: "Calgary Litigation Lawyers Directory", template: "%s | Calgary Litigation Lawyers" },
  description: "An independent, source-checked directory of Calgary litigation law firms and lawyers. Initial coverage; not a complete roster or endorsement.",
  openGraph: {
    title: "Calgary Litigation Lawyers Directory",
    description: "Browse Calgary law firm and lawyer listings by stated practice areas, with links to official contact information.",
    url: "https://calgarylitigationlawyers.com",
    siteName: "Calgary Litigation Lawyers",
    locale: "en_CA",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container header-inner">
            <Link href="/" className="logo">Calgary Litigation Lawyers</Link>
            <nav aria-label="Main navigation">
              <Link href="/lawyers">Directory</Link>
              <Link href="/blog">Guides</Link>
              <Link href="/glossary">Glossary</Link>
              <Link href="/news">News sources</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="container footer-inner">
            <div>
              <p>© {new Date().getFullYear()} Calgary Litigation Lawyers</p>
              <p>Independent directory. Not a law firm, legal advice service, or endorsement service.</p>
            </div>
            <nav aria-label="Footer navigation">
              <Link href="/about">About and sources</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/advertise">Sponsorship information</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
