export const lawyers = [
  {
    slug: "hmc-lawyers",
    name: "HMC Lawyers LLP",
    type: "Litigation Boutique",
    address: "#1000, 903 8th Ave SW, Calgary, AB T2P 0P7",
    phone: "403-269-7220",
    email: "info@hmclawyers.com",
    website: "https://hmclawyers.com",
    practiceAreas: ["Commercial Litigation", "Construction", "Employment", "Personal Injury", "Insurance"],
    bio: "HMC Lawyers is a Calgary-based litigation boutique with over 130 years of cumulative experience. They handle a wide range of disputes including commercial, construction, employment, and personal injury matters across Alberta and Western Canada.",
    rankingScore: 92,
    rankings: ["Western Canada's Top Litigation Boutiques (Canadian Lawyer)"],
    featured: false
  },
  {
    slug: "jss-barristers",
    name: "JSS Barristers (Jensen Shawa Solomon Duguid Hawkes LLP)",
    type: "Largest Civil Litigation Boutique",
    address: "800, 304 - 8 Avenue SW, Calgary, AB T2P 1C2",
    phone: "403-571-1520",
    email: "inquiries@jssbarristers.ca",
    website: "https://jssbarristers.ca",
    practiceAreas: ["Commercial Litigation", "Class Actions", "Construction", "Arbitration", "Oil & Gas Disputes"],
    bio: "Calgary’s largest civil litigation and advocacy boutique. Award-winning firm recognized for high-quality trial representation and alternative dispute resolution.",
    rankingScore: 95,
    rankings: ["Chambers Band 2 - Litigation: General Commercial", "Lexpert ranked", "CLA Excellence Awardee"],
    featured: true
  },
  {
    slug: "bennett-jones",
    name: "Bennett Jones LLP",
    type: "Full-Service National Firm",
    address: "4500 Bankers Hall East, 855 2nd Street SW, Calgary, AB T2P 4K7",
    phone: "403-298-3100",
    email: null,
    website: "https://www.bennettjones.com",
    practiceAreas: ["Commercial Litigation", "Class Actions", "Securities", "Energy", "Construction"],
    bio: "Consistently ranked Band 1 in Chambers for Litigation: General Commercial in Alberta. Leading choice for complex commercial, energy, and class action disputes.",
    rankingScore: 98,
    rankings: ["Chambers Band 1 - Litigation: General Commercial Alberta", "Multiple Best Lawyers and Lexpert rankings"],
    featured: true
  },
  {
    slug: "kahane-law",
    name: "Kahane Law Office",
    type: "Full-Service Litigation Firm",
    address: "7309 Flint Rd. SE, Calgary, AB T2H 1G3",
    phone: "403-225-8810",
    email: "info@kahanelaw.com",
    website: "https://kahanelaw.com",
    practiceAreas: ["Civil Litigation", "Debt Recovery", "Contract Disputes", "Employment", "Estate Litigation"],
    bio: "Experienced Calgary litigation lawyers handling debt recovery, contract disputes, condominium issues, defamation, and more. Full service across Alberta courts.",
    rankingScore: 85,
    rankings: [],
    featured: false
  },
  {
    slug: "osuji-smith",
    name: "Osuji & Smith",
    type: "Multi-Practice Firm",
    address: "1109 Edmonton Trl, Calgary, AB T2E 3K3",
    phone: "403-283-8018",
    email: null,
    website: "https://osujismith.com",
    practiceAreas: ["Employment Law", "Civil Litigation", "Business Law", "Family Law", "Real Estate"],
    bio: "Serving Calgary since 1980. Handles employment, business, civil litigation, and related disputes with a strong client review base.",
    rankingScore: 80,
    rankings: ["High volume of client reviews"],
    featured: false
  }
];

export type Lawyer = typeof lawyers[number];
