import { timeline } from "@/content/experience";
import { site } from "@/content/site";

/** Person structured data. Only facts that are already on the page. */
export function JsonLd() {
  const current = timeline.filter((t) => t.current && t.id !== "humstage");
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    image: `${site.url}${site.photo.light}`,
    jobTitle: "Software Engineer",
    email: `mailto:${site.contact.email}`,
    telephone: site.contact.phone.label.replace(/\s/g, ""),
    address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
    sameAs: [site.contact.github.href, site.contact.linkedin.href, site.humstage.href],
    worksFor: current.map((t) => ({ "@type": "Organization", name: t.org })),
    alumniOf: { "@type": "CollegeOrUniversity", name: "Enugu State University of Science and Technology" },
    knowsAbout: ["Backend engineering", "TypeScript", "Node.js", "PostgreSQL", "Realtime systems", "AI systems", "Solana", "Solidity", "Web delivery"],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
