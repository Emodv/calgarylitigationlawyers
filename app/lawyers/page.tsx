import type { Metadata } from "next";
import DirectorySearch from "@/components/DirectorySearch";
import { directoryEntries } from "@/lib/lawyers";

export const metadata: Metadata = {
  title: "Calgary litigation directory",
  description: "Browse source-checked Calgary law firm and lawyer listings by name and stated litigation practice areas.",
  alternates: { canonical: "/lawyers" }
};

export default function LawyersDirectory() {
  return (
    <section className="container section">
      <p className="eyebrow">Calgary, Alberta</p>
      <h1>Litigation law firms and lawyers</h1>
      <p className="page-intro">Search the initial directory by name, firm, or practice area. Listings link to their first-party source. Coverage is incomplete and is being expanded.</p>
      <DirectorySearch entries={directoryEntries} />
      <div className="notice">We do not rank or endorse listings. Verify a lawyer’s current status directly with the <a href="https://www.lawsociety.ab.ca/public/findalawyer/" target="_blank" rel="noopener noreferrer">Law Society of Alberta</a>.</div>
    </section>
  );
}
