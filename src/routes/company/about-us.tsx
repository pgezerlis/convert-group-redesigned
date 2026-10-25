import { createFileRoute } from "@tanstack/react-router";
import { ClosingCTA, PageHero, Pending, SectionIntro } from "@/components/site/ui";

export const Route = createFileRoute("/company/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — Convert Group" },
      { name: "description", content: "Convert combines commercial expertise, data monetisation know-how and technology to help retail businesses build lasting capability." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "About Us — Convert Group" },
      { property: "og:description", content: "Commercial and technical disciplines, working together with retail teams." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Commercial people who understand data.">
        Convert brings commercial expertise, data monetisation know-how and technology together — so retail businesses can build a capability that lasts.
      </PageHero>
      <section className="section">
        <div className="container-cg grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6"><Pending label="Real team photograph" ratio="aspect-[3/2]" /></div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionIntro eyebrow="Our purpose" title="Make data a business, not a side project.">
              <p>Our work sits where commercial strategy, partner relationships and data meet. We combine those disciplines in one team, so offers are both commercially sound and practical to deliver.</p>
            </SectionIntro>
          </div>
        </div>
      </section>
      <section className="section bg-surface">
        <div className="container-cg">
          <SectionIntro eyebrow="People" title="The team" />
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <li key={n}>
                <Pending label={`Approved team profile ${n}`} ratio="aspect-[4/5]" />
              </li>
            ))}
          </ul>
          <p className="data-label mt-6 text-muted-foreground">Profiles, milestones and portraits will be added once approved.</p>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
