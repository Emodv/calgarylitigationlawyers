import Link from "next/link";
import DirectorySearch from "@/components/DirectorySearch";
import { directoryEntries } from "@/lib/lawyers";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow">Independent directory · Calgary, Alberta</p>
          <h1>Find litigation counsel in Calgary</h1>
          <p>Browse law firms and individual lawyer profiles, compare stated practice areas, and go directly to each firm’s published contact channels.</p>
          <a href="#directory" className="btn">Browse the directory</a>
        </div>
      </section>
      <section id="directory" className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Initial source-checked listings</p>
            <h2>Calgary litigation directory</h2>
            <p>Listings are checked against the firm’s or lawyer’s own website. This is an initial directory, not a complete roster or a recommendation.</p>
          </div>
          <Link href="/lawyers" className="text-link">Open full directory →</Link>
        </div>
        <DirectorySearch entries={directoryEntries} />
        <div className="notice"><strong>Choosing counsel:</strong> This directory does not rank or endorse lawyers. Check a lawyer’s status and contact details through the <a href="https://www.lawsociety.ab.ca/public/findalawyer/" target="_blank" rel="noopener noreferrer">Law Society of Alberta directory</a> before making a decision.</div>
      </section>
    </>
  );
}
