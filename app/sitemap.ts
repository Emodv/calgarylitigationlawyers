import type { MetadataRoute } from "next";
import { directoryEntries } from "@/lib/lawyers";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://calgarylitigationlawyers.com";
  const staticPaths = ["", "/lawyers", "/blog", "/glossary", "/news", "/advertise", "/about", "/faq"];
  const guideSlugs = ["questions-before-contacting-litigation-lawyer", "calgary-litigation-directory-sources"];
  return [
    ...staticPaths.map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly" as const })),
    ...directoryEntries.map((entry) => ({ url: `${base}/lawyers/${entry.slug}`, changeFrequency: "monthly" as const })),
    ...guideSlugs.map((slug) => ({ url: `${base}/blog/${slug}`, changeFrequency: "yearly" as const }))
  ];
}
