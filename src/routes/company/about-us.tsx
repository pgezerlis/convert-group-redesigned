import { createFileRoute } from "@tanstack/react-router";
import { ClosingCTA, PageHero, SectionIntro } from "@/components/site/ui";

export const Route = createFileRoute("/company/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — Convert Group" },
      { name: "description", content: "Convert Group's mission: be the way retailers and brands collaborate through data in omni-channel retail. Meet the team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "About Us — Convert Group" },
      { property: "og:description", content: "Be the way retailers and brands collaborate through data in omni-channel retail." },
    ],
  }),
  component: Page,
});

const COUNTRIES = ["Czechia", "France", "Germany", "Greece", "Italy", "Poland", "Romania", "Serbia", "South Africa", "Spain", "Sweden"];

const FACTS = [
  { value: "35+", label: "Retailers" },
  { value: "400+", label: "Brands" },
  { value: "€18B", label: "Annual retail sales processed daily" },
  { value: "2.3B", label: "Line items tracked" },
  { value: "7.8M", label: "Search terms analysed daily" },
];

const TEAM = [
  { name: "Panayotis Gezerlis", role: "Founder & CEO", quote: "Integrity, Innovative Thinking, Excellence, Team-work, Working with Joy and Humbleness are the values that shaped our company to what we are today." },
  { name: "Elena Chailazopoulou", role: "Partner, CPO, Deputy CEO", quote: "Our cutting-edge solutions empower brands and retailers to make smarter decisions, optimize performance, and stay ahead in the ever-evolving commerce landscape." },
  { name: "Jacob Levis", role: "CGO", quote: "We’re empowering Retailers and Suppliers to shape the future together—turning insights into impact and fueling data-driven growth that elevates the entire industry." },
  { name: "Yorgos Panzaris", role: "CTO", quote: "Constantly improving our tools and the way we work, pragmatists and explorers at once: to build smart, well-designed, delightful products; and grow as a team." },
  { name: "Aris Stavrianos", role: "COO", quote: "In a data-driven world, our goal is not just to track trends but to anticipate them. Every decision we make is focused on empowering our partners with actionable insights to drive sustainable growth." },
];

function Page() {
  return (
    <>
      <PageHero eyebrow="Our mission" title="Be the way retailers and brands collaborate through data in omni-channel retail." />

      <section className="section">
        <div className="container-cg max-w-3xl">
          <blockquote className="text-2xl font-medium text-foreground">
            “We are revolutionising the way Retailers & Suppliers collaborate, enabling data driven decision-making.”
          </blockquote>
          <p className="mt-4 text-sm text-muted-foreground"><span className="font-semibold text-foreground">Panayotis Gezerlis</span> · Founder & CEO</p>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-cg grid gap-10 lg:grid-cols-2">
          <SectionIntro eyebrow="Where we work" title="We operate in 11 countries">
            <p>Europe is our home base, but our projects know no borders. We have undertaken projects in 11 countries, aspiring to thrive in many more.</p>
          </SectionIntro>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 self-center sm:grid-cols-3">
            {COUNTRIES.map((c) => (
              <li key={c} className="border-b border-border pb-2 text-foreground">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-cg">
          <SectionIntro eyebrow="Facts & figures" title="Determination that shows in the numbers.">
            <p>No matter how significant the success or challenging the setback, our determination to excel remains unabated.</p>
          </SectionIntro>
          <dl className="mt-12 grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {FACTS.map((f) => (
              <div key={f.label} className="border-t border-border pt-4">
                <dd className="text-4xl font-semibold text-foreground">{f.value}</dd>
                <dt className="mt-2 text-sm text-muted-foreground">{f.label}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Leading the Market Intelligence space in omni-channel retail across Europe and the globe.</h3>
              <p className="mt-4 text-muted-foreground">We combine our platform with data & analytics consulting services to unlock the digital potential of manufacturers and retailers across the globe.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Many of the world’s leading brands use our platform to strengthen their retail strategies.</h3>
              <p className="mt-4 text-muted-foreground">Our portfolio includes 15 of the 20 biggest global FMCG & Consumer Healthcare firms, like L’Oréal, Unilever, Bayer, Haleon, Johnson & Johnson, Nestlé, The Coca-Cola Company, Henkel, Beiersdorf, FrieslandCampina, Heineken, Barilla, Colgate-Palmolive, Perrigo and Pierre Fabre.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-cg">
          <SectionIntro eyebrow="Our team" title="Experienced, perceptive, and purpose-driven." />
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <li key={m.name} className="border-t border-border pt-6">
                <p className="font-semibold text-foreground">{m.name}</p>
                <p className="data-label mt-1 text-muted-foreground">{m.role}</p>
                <p className="mt-4 text-muted-foreground">“{m.quote}”</p>
              </li>
            ))}
          </ul>
          <a href="https://apply.workable.com/convertgroup/" target="_blank" rel="noreferrer" className="mt-12 inline-block font-medium text-foreground underline underline-offset-4">
            Want to join our team? View our openings ↗
          </a>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
