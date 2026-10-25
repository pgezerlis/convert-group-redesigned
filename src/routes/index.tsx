import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientLogo, hasClientMark } from "@/components/site/ClientLogo";
import DataMonetisationHero from "@/components/site/DataMonetisationHero";
import { IllustrativeWorkflow } from "@/components/site/IllustrativeWorkflow";
import { ArrowLink, ClosingCTA, Pending, SectionIntro, TalkToUs } from "@/components/site/ui";
import { CLIENTS, FEATURED_STORY, METHOD, SOLUTIONS, formatNewsDate } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Convert Group — Make data monetisation a core capability" },
      {
        name: "description",
        content:
          "Convert Group helps retailers, marketplaces and delivery apps monetise their data with the commercial framework, know-how and technology to build that capability in-house.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Convert Group — Make data monetisation a core capability" },
      {
        property: "og:description",
        content: "Commercial framework, know-how and, where needed, technology to make data monetisation a core internal capability.",
      },
    ],
  }),
  component: Home,
});

const INSIGHTS = [
  { who: "Supplier brands", what: "Category trends and shopper behaviour in the categories they sell." },
  { who: "Marketplace sellers", what: "Aggregated search demand and assortment gaps in their categories." },
  { who: "Delivery partners", what: "Local demand by area and time, and purchase-mission patterns." },
];

function Home() {
  return (
    <>
      {/* 1 · Hero */}
      <section>
        <div className="container-cg grid gap-12 pb-12 pt-8 md:pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-16">
          <div className="lg:col-span-6 lg:pt-6">
            <p className="eyebrow mb-6">Data monetisation. Built into your business.</p>
            <h1 className="max-w-[13ch]">Make data monetisation a core internal capability.</h1>
            <p className="lede mt-6 max-w-[48ch]">
              We help retailers, marketplaces and delivery apps monetise their data with the commercial framework, know-how and, where needed, technology to build that capability in-house.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <TalkToUs />
              <ArrowLink to="/how-we-do-it">See how we do it</ArrowLink>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-6 lg:flex lg:items-center lg:justify-end">
            {/* Brand tokens: ink = --cg-navy, accent = --cg-link, glow = --cg-cyan */}
            <DataMonetisationHero
              className="h-[380px] w-full sm:h-[460px] lg:h-[540px]"
              ink="#1e3257"
              accent="#006b93"
              glow="#00b7fa"
            />
          </div>
        </div>
      </section>

      {/* 2 · Credibility strip */}
      <section aria-labelledby="proof-h" className="border-y border-border">
        <div className="container-cg flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:gap-12">
          <h2 id="proof-h" className="eyebrow shrink-0 !text-[0.8125rem] !tracking-[0.06em]">Trusted by retail teams across 12 countries</h2>
          <div className="flex flex-1 flex-col gap-3">
            <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {CLIENTS.map((c) => (
                <li key={c.slug} className="flex min-h-16 w-[calc(50%-0.375rem)] items-center justify-center px-3 py-3 text-center sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(20%-0.8rem)]">
                  <ClientLogo client={c} />
                </li>
              ))}
            </ul>
            {CLIENTS.some((c) => !hasClientMark(c.slug)) && (
              <p className="data-label text-muted-foreground">
                Names stand in for each client’s official mark until the files are supplied.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 3 · Opportunity */}
      <section className="section">
        <div className="container-cg grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionIntro eyebrow="The commercial opportunity" title="Your data is already valuable to your partners.">
              <p>
                Suppliers, sellers and brand partners make better decisions with what you see every day. Most organisations share fragments of it informally. A defined offer, buyer and price turns that into a revenue line your team runs.
              </p>
            </SectionIntro>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="data-label mb-3 text-muted-foreground">Examples of monetisable insight</p>
            <ul className="border-t border-navy">
              {INSIGHTS.map((i) => (
                <li key={i.who} className="grid gap-2 border-b border-border py-6 sm:grid-cols-[180px_1fr] sm:gap-6">
                  <h3 className="text-[1.25rem] tracking-normal">{i.who}</h3>
                  <p className="body-lg text-muted-foreground">{i.what}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 · How we do it */}
      <section className="section bg-surface">
        <div className="container-cg">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionIntro eyebrow="How we do it" title="From first opportunity to a capability you own." />
            <ArrowLink to="/how-we-do-it" className="shrink-0">Our approach in detail</ArrowLink>
          </div>
          <ol className="mt-12 border-t border-navy">
            {METHOD.map((m) => (
              <li key={m.n} className="grid gap-3 border-b border-border py-8 lg:grid-cols-12 lg:gap-8">
                <span className="data-label text-lg font-medium text-navy lg:col-span-1">{m.n}</span>
                <h3 className="lg:col-span-4">{m.title}</h3>
                <p className="body-lg text-muted-foreground lg:col-span-4">{m.detail}</p>
                <dl className="text-sm lg:col-span-3">
                  <dt className="data-label text-muted-foreground">Output</dt>
                  <dd className="font-medium text-ink">{m.output}</dd>
                  <dt className="data-label mt-3 text-muted-foreground">Owned by</dt>
                  <dd className="text-ink">{m.owner}</dd>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 · Solutions */}
      <section className="section">
        <div className="container-cg">
          <SectionIntro eyebrow="Solutions" title="Built around how your business works." />
          <ul className="mt-12 border-t border-navy">
            {SOLUTIONS.map((s) => (
              <li key={s.slug} className="grid gap-4 border-b border-border py-10 lg:grid-cols-12 lg:gap-8">
                <h3 className="lg:col-span-3">{s.label}</h3>
                <p className="body-lg lg:col-span-5">{s.need}</p>
                <div className="lg:col-span-4">
                  <ul className="space-y-1.5 text-muted-foreground">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-navy" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <ArrowLink to="/solutions/$audience" params={{ audience: s.slug }} className="mt-4">
                    Explore {s.label.toLowerCase()}
                  </ArrowLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 · Featured story */}
      <section className="section bg-pale">
        <div className="container-cg grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Link to="/company/news/$slug" params={{ slug: FEATURED_STORY.slug }} className="block">
              <img
                src={FEATURED_STORY.image}
                alt="Dr. Max and Convert Group partnership announcement"
                loading="lazy"
                className="h-auto w-full rounded-lg"
              />
            </Link>
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <p className="eyebrow mb-4">Success in practice</p>
            <time dateTime={FEATURED_STORY.date} className="data-label text-muted-foreground">
              {formatNewsDate(FEATURED_STORY.date)}
            </time>
            <h2 className="mt-4 text-[1.75rem] leading-[1.15] md:text-[2.25rem]">{FEATURED_STORY.title}</h2>
            <p className="body-lg mt-5 text-muted-foreground">{FEATURED_STORY.summary}</p>
            <ArrowLink to="/company/news/$slug" params={{ slug: FEATURED_STORY.slug }} className="mt-8">
              Read the story
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* 7 · Capability stays */}
      <section className="section">
        <div className="container-cg grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Pending label="Real photograph: Convert and client team working session" ratio="aspect-[4/5]" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionIntro eyebrow="Capability that stays" title="Your team owns it. We make sure they can.">
              <p>
                We bring the commercial framework and the know-how from doing this before. Your people lead the offers, the relationships and the decisions. Where your current stack is enough, we use it; where it isn’t, Convert technology fills the gap.
              </p>
            </SectionIntro>
            <dl className="mt-10 grid gap-6 border-t border-navy pt-6 sm:grid-cols-3">
              {[
                ["Framework", "Offers, pricing and governance"],
                ["Know-how", "Playbooks and practical coaching"],
                ["Technology", "Only where it’s needed"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-semibold text-navy">{k}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-12">
              <IllustrativeWorkflow />
            </div>
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
