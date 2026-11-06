import { lawyers } from "@/lib/lawyers";

export default function sitemap() {
  const base = "https://calgarylitigationlawyers.com";
  const staticPages = ["", "/blog", "/glossary", "/news", "/advertise", "/about", "/faq"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));

  const lawyerPages = lawyers.map((l) => ({
    url: `${base}/lawyers/${l.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...lawyerPages];
}
