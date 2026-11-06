export type DirectoryEntry = {
  slug: string;
  kind: "firm" | "lawyer";
  name: string;
  firmName?: string;
  title?: string;
  address?: string;
  phone?: string;
  email?: string;
  website: string;
  sourceUrl: string;
  sourceCheckedAt: string;
  practiceAreas: string[];
  summary: string;
};

// Initial source-checked records. This is not a complete Calgary roster.
// Contact and practice details come from the firm's or lawyer's own website.
export const directoryEntries: DirectoryEntry[] = [
  {
    slug: "dbh-law-group", kind: "firm", name: "DBH Law Group",
    address: "1200, 1015 4 Street SW, Calgary, AB T2R 1J4", phone: "403-252-9937", email: "reception@dbhllp.com",
    website: "https://dbhllp.com/", sourceUrl: "https://dbhllp.com/contact/", sourceCheckedAt: "2026-11-06",
    practiceAreas: ["Commercial litigation", "Civil litigation", "Business disputes", "Real estate disputes"],
    summary: "Calgary law firm whose website describes business, commercial litigation and other dispute services."
  },
  {
    slug: "hmc-lawyers", kind: "firm", name: "HMC Lawyers LLP",
    address: "#1000, 903 8 Avenue SW, Calgary, AB T2P 0P7", phone: "403-269-7220",
    website: "https://hmclawyers.com/", sourceUrl: "https://hmclawyers.com/our-services/advocacy/", sourceCheckedAt: "2026-11-06",
    practiceAreas: ["Civil litigation", "Commercial disputes", "Insurance disputes", "Construction", "Employment", "Mediation and arbitration"],
    summary: "Calgary firm whose advocacy page describes civil litigation and dispute-resolution services."
  },
  {
    slug: "jss-barristers", kind: "firm", name: "JSS Barristers",
    address: "800, 304 8 Avenue SW, Calgary, AB T2P 1C2", phone: "403-571-1520", email: "inquiries@jssbarristers.ca",
    website: "https://jssbarristers.ca/", sourceUrl: "https://jssbarristers.ca/contact/", sourceCheckedAt: "2026-11-06",
    practiceAreas: ["Civil litigation", "Commercial litigation", "Appeals", "Arbitration", "Mediation"],
    summary: "Calgary litigation and advocacy firm. Its website describes work across civil, commercial and other disputes."
  },
  {
    slug: "kahane-law-office", kind: "firm", name: "Kahane Law Office",
    address: "7309 Flint Road SE, Calgary, AB T2H 1G3", phone: "403-225-8810",
    website: "https://kahanelaw.com/", sourceUrl: "https://kahanelaw.com/areas-of-law/litigation/calgary-litigation-lawyers/", sourceCheckedAt: "2026-11-06",
    practiceAreas: ["Civil litigation", "Commercial disputes", "Employment disputes", "Personal injury"],
    summary: "Calgary firm with a litigation practice. Its website describes civil, commercial, employment and personal-injury litigation."
  },
  {
    slug: "bennett-jones-calgary", kind: "firm", name: "Bennett Jones LLP — Calgary office",
    address: "4500 Bankers Hall East, 855 2 Street SW, Calgary, AB T2P 4K7", phone: "403-298-3100",
    website: "https://www.bennettjones.com/Offices/Calgary", sourceUrl: "https://www.bennettjones.com/Services/Litigation-and-Dispute-Resolution", sourceCheckedAt: "2026-11-06",
    practiceAreas: ["Commercial litigation", "Estate litigation", "Class actions", "Energy disputes"],
    summary: "National law firm with a Calgary office and a litigation and dispute-resolution practice."
  },
  {
    slug: "billington-barristers", kind: "firm", name: "Billington Barristers",
    address: "1910 Elveden House, 717 7 Avenue SW, Calgary, AB T2P 0Z3", phone: "403-930-4100",
    website: "https://www.billingtonbarristers.com/", sourceUrl: "https://www.billingtonbarristers.com/contact-us/", sourceCheckedAt: "2026-11-06",
    practiceAreas: ["Commercial litigation", "Civil litigation", "Oil and gas disputes", "Insolvency disputes", "Arbitration"],
    summary: "Calgary litigation firm representing individual and corporate clients in disputes."
  },
  {
    slug: "carbert-waite", kind: "firm", name: "Carbert Waite LLP",
    address: "2300 Encor Place, 645 7 Avenue SW, Calgary, AB T2P 4G8", phone: "403-263-5656",
    website: "https://carbertwaite.com/", sourceUrl: "https://carbertwaite.com/legal-services/calgary-commercial-litigation-lawyers/", sourceCheckedAt: "2026-11-06",
    practiceAreas: ["Commercial litigation", "Construction disputes", "Shareholder disputes", "Insurance disputes", "Estate litigation"],
    summary: "Calgary firm with a commercial litigation group and related dispute practices."
  },
  {
    slug: "plhm-law", kind: "firm", name: "Peacock Linder Halt & Mack LLP (PLHM Law)",
    address: "#530, 600 3 Avenue SW, Calgary, AB T2P 0G5", phone: "403-296-2280", email: "info@plhlaw.ca",
    website: "https://plhlaw.ca/", sourceUrl: "https://plhlaw.ca/contact/", sourceCheckedAt: "2026-11-06",
    practiceAreas: ["Commercial litigation", "Oil and gas disputes", "Securities litigation", "Insolvency disputes", "Arbitration"],
    summary: "Calgary litigation firm whose website describes commercial disputes and alternative dispute resolution."
  },
  {
    slug: "bryan-c-duguid", kind: "lawyer", name: "Bryan C. Duguid, K.C., FCIArb", firmName: "JSS Barristers", title: "Partner",
    phone: "403-571-0746", email: "duguidb@jssbarristers.ca", website: "https://jssbarristers.ca/litigators/bryan-c-duguid/",
    sourceUrl: "https://jssbarristers.ca/litigators/bryan-c-duguid/", sourceCheckedAt: "2026-11-06",
    practiceAreas: ["Commercial litigation", "Energy disputes", "Construction disputes", "Arbitration", "Appeals"],
    summary: "JSS profile describes a practice focused on commercial disputes, advocacy and arbitration."
  },
  {
    slug: "richard-billington", kind: "lawyer", name: "Richard N. Billington, K.C.", firmName: "Billington Barristers", title: "Founder",
    phone: "403-930-4101", email: "Rbillington@BillingtonBarristers.com", website: "https://www.billingtonbarristers.com/the-team/",
    sourceUrl: "https://www.billingtonbarristers.com/the-team/", sourceCheckedAt: "2026-11-06",
    practiceAreas: ["Commercial litigation", "Oil and gas disputes", "Insolvency disputes", "Shareholder disputes", "Civil litigation"],
    summary: "Firm profile lists corporate and commercial litigation, oil and gas disputes, insolvency and civil litigation among his practice areas."
  },
  {
    slug: "susan-billington", kind: "lawyer", name: "Susan V.R. Billington, K.C.", firmName: "Billington Barristers", title: "Counsel",
    phone: "403-930-4100", website: "https://www.billingtonbarristers.com/the-team/",
    sourceUrl: "https://www.billingtonbarristers.com/the-team/", sourceCheckedAt: "2026-11-06",
    practiceAreas: ["Commercial litigation", "Mediation", "Facilitation"],
    summary: "Firm profile lists commercial litigation, mediation and facilitation among her practice areas."
  }
];

export const firms = directoryEntries.filter((entry) => entry.kind === "firm");
export const lawyers = directoryEntries.filter((entry) => entry.kind === "lawyer");
