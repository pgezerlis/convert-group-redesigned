import { createFileRoute } from "@tanstack/react-router";
import { ClosingCTA, PageHero, SectionIntro } from "@/components/site/ui";
import { METHOD } from "@/lib/content";

export const Route = createFileRoute("/how-we-do-it")({
  head: () => ({
    meta: [
      { title: "How we do it — Convert Group" },
      { name: "description", content: "Four stages to make data monetisation a capability your own team runs: define, model, equip, operate." },
      { property: "og:title", content: "How we do it — Convert Group" },
      { property: "og:description", content: "From first opportunity to a data monetisation capability your team owns." },
    ],
  }),
  component: Page,
});

const MODEL = [
  { k: "Convert brings", v: ["Commercial framework", "Know-how from prior programmes", "Technology where needed"] },
  { k: "Your team owns", v: ["Offers and pricing decisions", "Partner relationships", "Ongoing delivery and growth"] },
];

function Page() {
  return (
    <>
      <PageHero eyebrow="How we do it" title="A capability your team runs — not a project we hand over.">
        We work alongside your commercial, data and partnership teams until data monetisation is part of how your business operates.
      </PageHero>

      <section className="section">
        <div className="container-cg">
          <ol className="border-t border-navy">
            {METHOD.map((m) => (
              <li key={m.n} className="grid gap-4 border-b border-border py-10 lg:grid-cols-12 lg:gap-8">
                <span className="data-label text-lg font-medium text-navy lg:col-span-1">{m.n}</span>
                <div className="lg:col-span-5">
                  <h2 className="text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-[1.2]">{m.title}</h2>
                  <p className="body-lg mt-4 text-muted-foreground">{m.detail}</p>
                </div>
                <dl className="grid gap-4 text-sm sm:grid-cols-3 lg:col-span-6 lg:grid-cols-1 lg:pl-8">
                  <div><dt className="data-label text-muted-foreground">Business question</dt><dd className="mt-1 text-base text-ink">{m.question}</dd></div>
                  <div><dt className="data-label text-muted-foreground">Deliverable</dt><dd className="mt-1 text-base font-medium text-ink">{m.output}</dd></div>
                  <div><dt className="data-label text-muted-foreground">Client-team involvement</dt><dd className="mt-1 text-base text-ink">{m.owner}</dd></div>
                </dl>
              </li>
            ))}
          </ol>
          <p className="data-label mt-6 text-muted-foreground">Stages describe our proposed approach; scope and timing are agreed with each client.</p>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-cg grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionIntro eyebrow="Operating model" title="Who does what.">
              <p>Convert provides structure and experience. Ownership sits with your people from the first workshop.</p>
            </SectionIntro>
          </div>
          <figure className="lg:col-span-7" aria-label="Operating model: what Convert brings and what your team owns">
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
              {MODEL.map((c, idx) => (
                <div key={c.k} className={idx ? "bg-pale p-6 md:p-8" : "bg-background p-6 md:p-8"}>
                  <h3 className="text-[1.25rem] tracking-normal">{c.k}</h3>
                  <ul className="mt-4 space-y-3">
                    {c.v.map((v) => (
                      <li key={v} className="border-t border-border pt-3 text-ink">{v}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <figcaption className="data-label mt-3 text-muted-foreground">Responsibilities shift toward your team as the capability matures.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="container-cg grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionIntro eyebrow="Technology" title="Use what you have. Add only what’s missing." />
          </div>
          <div className="body-lg space-y-5 text-muted-foreground lg:col-span-6 lg:col-start-7">
            <p>Many organisations already have the data platform and reporting tools to deliver a first offer. In that case, we focus on the commercial model and the team.</p>
            <p>Where delivering insight to partners needs capabilities you don’t have — secure partner reporting, aggregation, governed access — Convert technology can help. The decision follows the offer, not the other way round.</p>
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
