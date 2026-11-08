import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://calgarylitigationlawyers.com"),
  title: {
    default: "Calgary Litigation Lawyers | Independent Directory",
    template: "%s | Calgary Litigation Lawyers",
  },
  description: "An independent directory of litigation lawyers in Calgary, Alberta. Search contact details and practice areas, plus a litigation glossary.",
  keywords: ["Calgary litigation lawyers", "civil litigation Calgary", "commercial litigation lawyers Calgary", "Alberta lawyers"],
  openGraph: {
    title: "Calgary Litigation Lawyers Directory",
    description: "Contact details and practice areas for litigation lawyers in Calgary.",
    url: "https://calgarylitigationlawyers.com",
    siteName: "Calgary Litigation Lawyers",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <header className="header">
          <div className="container">
            <a href="/" className="logo">Calgary Litigation Lawyers</a>
            <nav>
              <a href="/lawyers">Directory</a>
              <a href="/glossary">Glossary</a>
              <a href="/blog">Insights</a>
              <a href="/news">News</a>
              <a href="/pricing">Pricing</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="container">
            <p>© {new Date().getFullYear()} Calgary Litigation Lawyers. Independent directory. Not a law firm. Nothing on this site is legal advice. Contact details are publicly available information.</p>
            <p><a href="/pricing">Lawyers: claim your profile free. Sponsored advertising from $199.</a></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
