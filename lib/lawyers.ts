// Seed listings. Details are taken from each firm's own public website (sourceUrl).
// verified stays false until a primary-source check is recorded in the lawyers table.
// Rankings, scores and award claims were removed: none had a verifiable source in this repo.
export type Lawyer = {
  slug: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  email: string | null;
  website: string;
  sourceUrl: string;
  practiceAreas: string[];
  verified: boolean;
};

export const lawyers: Lawyer[] = [
  {
    slug: "hmc-lawyers",
    name: "HMC Lawyers LLP",
    type: "Litigation firm",
    address: "#1000, 903 8th Ave SW, Calgary, AB T2P 0P7",
    phone: "403-269-7220",
    email: "info@hmclawyers.com",
    website: "https://hmclawyers.com",
    sourceUrl: "https://hmclawyers.com",
    practiceAreas: ["Commercial Litigation", "Construction", "Employment", "Personal Injury", "Insurance"],
    verified: false,
  },
  {
    slug: "jss-barristers",
    name: "JSS Barristers (Jensen Shawa Solomon Duguid Hawkes LLP)",
    type: "Civil litigation firm",
    address: "800, 304 - 8 Avenue SW, Calgary, AB T2P 1C2",
    phone: "403-571-1520",
    email: "inquiries@jssbarristers.ca",
    website: "https://jssbarristers.ca",
    sourceUrl: "https://jssbarristers.ca",
    practiceAreas: ["Commercial Litigation", "Class Actions", "Construction", "Arbitration", "Oil & Gas Disputes"],
    verified: false,
  },
  {
    slug: "bennett-jones",
    name: "Bennett Jones LLP",
    type: "Full-service law firm",
    address: "4500 Bankers Hall East, 855 2nd Street SW, Calgary, AB T2P 4K7",
    phone: "403-298-3100",
    email: null,
    website: "https://www.bennettjones.com",
    sourceUrl: "https://www.bennettjones.com",
    practiceAreas: ["Commercial Litigation", "Class Actions", "Securities", "Energy", "Construction"],
    verified: false,
  },
  {
    slug: "kahane-law",
    name: "Kahane Law Office",
    type: "Litigation firm",
    address: "7309 Flint Rd. SE, Calgary, AB T2H 1G3",
    phone: "403-225-8810",
    email: "info@kahanelaw.com",
    website: "https://kahanelaw.com",
    sourceUrl: "https://kahanelaw.com",
    practiceAreas: ["Civil Litigation", "Debt Recovery", "Contract Disputes", "Employment", "Estate Litigation"],
    verified: false,
  },
  {
    slug: "osuji-smith",
    name: "Osuji & Smith",
    type: "Multi-practice firm",
    address: "1109 Edmonton Trl, Calgary, AB T2E 3K3",
    phone: "403-283-8018",
    email: null,
    website: "https://osujismith.com",
    sourceUrl: "https://osujismith.com",
    practiceAreas: ["Employment Law", "Civil Litigation", "Business Law", "Family Law", "Real Estate"],
    verified: false,
  },
];

// Alphabetical only. No score, no paid placement.
export function listLawyers(): Lawyer[] {
  return [...lawyers].sort((a, b) => a.name.localeCompare(b.name));
}

export function allPracticeAreas(): string[] {
  return [...new Set(lawyers.flatMap((l) => l.practiceAreas))].sort((a, b) => a.localeCompare(b));
}
