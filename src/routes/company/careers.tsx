import { createFileRoute } from "@tanstack/react-router";
import { EmptyState, PageHero, Pending, SectionIntro } from "@/components/site/ui";

export const Route = createFileRoute("/company/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Convert Group" },
      { name: "description", content: "Work at Convert Group, where commercial and technical people help retail businesses monetise their data." },
      { property: "og:title", content: "Careers — Convert Group" },
      { property: "og:description", content: "Join the Convert Group team." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Careers" title="Work where commerce and data meet.">
        We bring commercial and technical people together to help retail teams build new capabilities.
      </PageHero>
      <section className="section">
        <div className="container-cg grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6"><Pending label="Team and culture photograph" ratio="aspect-[3/2]" /></div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionIntro title="Open roles" />
            <div className="mt-8">
              <EmptyState title="No open roles right now">
                New openings will be listed here with location, work arrangement and how to apply.
              </EmptyState>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
