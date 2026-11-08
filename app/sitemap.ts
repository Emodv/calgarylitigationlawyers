import type { MetadataRoute } from "next";
import { lawyers } from "@/lib/lawyers";

const base = "https://calgarylitigationlawyers.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/lawyers", "/glossary", "/news", "/pricing", "/about", "/faq", "/blog"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));

  const lawyerPages = lawyers.map((l) => ({
    url: `${base}/lawyers/${l.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...lawyerPages];
}
