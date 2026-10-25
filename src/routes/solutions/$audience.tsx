import { createFileRoute, notFound } from "@tanstack/react-router";
import { ClosingCTA, PageHero, Pending, SectionIntro } from "@/components/site/ui";
import { ServiceIcon } from "@/components/site/ServiceIcons";
import { METHOD, getSolution } from "@/lib/content";


export const Route = createFileRoute("/solutions/$audience")({
  loader: ({ params }) => {
    const s = getSolution(params.audience);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.label} — Data monetisation | Convert Group` : "Solutions | Convert Group";
    const d = loaderData?.intro ?? "Data monetisation solutions from Convert Group.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: t },
        { property: "og:description", content: d },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: Page,
});

function Page() {
  const s = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow={`Solutions · ${s.label}`} title={s.title} breadcrumb={{ label: "Solutions", current: s.label }}>
        {s.intro}
      </PageHero>

      <section className="section">
        <div className="container-cg">
          <SectionIntro eyebrow="The commercial situation" title="Where the opportunity sits." />
          <div className="mt-12 grid gap-10 border-t border-navy pt-8 md:grid-cols-3 md:gap-8">
            {s.situation.map((x) => (
              <div key={x.heading}>
                <h3 className="text-[1.375rem]">{x.heading}</h3>
                <p className="body-lg mt-3 text-muted-foreground">{x.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-cg grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionIntro eyebrow="From data to offer" title={s.example.question} />
          </div>
          <figure className="rounded-lg border-t-2 border-navy bg-background p-5 sm:p-8 lg:col-span-7">
            <figcaption className="data-label mb-6 font-medium uppercase tracking-[0.04em] text-ink">
              {s.example.caption} — not client results
            </figcaption>
            <p className="data-label text-navy">01 · Signal</p>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {s.example.rows.map((r) => (
                <li key={r.label} className="grid gap-1 py-3 sm:grid-cols-[1fr_auto] sm:gap-4">
                  <span className="text-ink">{r.label}{r.note && <span className="data-label block text-muted-foreground">{r.note}</span>}</span>
                  <span className="data-label text-muted-foreground sm:text-right">{r.value}</span>
                </li>
              ))}
            </ul>
            <p className="data-label mt-8 text-navy">02 · Commercial offer</p>
            <dl className="mt-3 divide-y divide-border border-y border-border text-sm">
              {s.example.offer.map((o) => (
                <div key={o.k} className="grid gap-1 py-3 sm:grid-cols-[110px_1fr] sm:gap-3">
                  <dt className="text-muted-foreground">{o.k}</dt>
                  <dd className="text-ink">{o.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">Example data is fictional and aggregated. Scope, pricing and permitted data use need validation.</p>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="container-cg grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionIntro eyebrow="Capability and approach" title="What we build with your team." />
            <ul className="mt-8 space-y-2">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-ink"><span aria-hidden className="mt-[0.75em] h-px w-4 shrink-0 bg-navy" />{d}</li>
              ))}
            </ul>
          </div>
          <ol className="border-t border-navy lg:col-span-6 lg:col-start-7">
            {METHOD.map((m) => (
              <li key={m.n} className="cg-service grid grid-cols-[40px_1fr] gap-3 border-b border-border py-5">
                <span className="data-label font-medium text-navy">{m.n}</span>
                <div className="flex items-start gap-3">
                  <ServiceIcon id={m.id} className="mt-0.5 h-5 w-5 shrink-0" />
                  <div><p className="font-semibold text-navy">{m.title}</p><p className="text-sm text-muted-foreground">Output: {m.output}</p></div>
                </div>
              </li>

            ))}
          </ol>
        </div>
      </section>

      <section className="section border-t border-border">
        <div className="container-cg grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5"><SectionIntro eyebrow="Proof" title={`${s.label} we’ve worked with`} /></div>
          <div className="lg:col-span-7"><Pending label={`Approved ${s.label.toLowerCase()} story`} ratio="aspect-[3/1]" /></div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
