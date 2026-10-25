import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClosingCTA, EmptyState, PageHero, Pending } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — Convert Group" },
      { name: "description", content: "How retailers, marketplaces and delivery apps have built data monetisation capability with Convert." },
      { property: "og:title", content: "Success Stories — Convert Group" },
      { property: "og:description", content: "Customer stories on building data monetisation as a core capability." },
    ],
  }),
  component: Page,
});

const FILTERS = ["All", "Retailers", "Marketplaces", "Delivery Apps"] as const;

// Only approved stories are listed. None are approved for publication yet.
const STORIES: { audience: (typeof FILTERS)[number]; title: string }[] = [];

function Page() {
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");
  const list = STORIES.filter((s) => f === "All" || s.audience === f);
  return (
    <>
      <PageHero eyebrow="Success Stories" title="Capability built, in practice.">
        Stories from teams that made data monetisation part of how they work — with the context and evidence behind each result.
      </PageHero>
      <section className="section">
        <div className="container-cg">
          <div role="group" aria-label="Filter by audience" className="flex flex-wrap gap-2">
            {FILTERS.map((x) => (
              <button key={x} type="button" aria-pressed={f === x} onClick={() => setF(x)}
                className={cn("min-h-11 rounded-md border px-4 text-sm font-medium", f === x ? "border-navy bg-pale text-navy" : "border-control text-navy hover:bg-surface")}>
                {x}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <Pending label="Featured approved story" className="lg:col-span-2" ratio="aspect-[21/9]" />
          </div>
          <div className="mt-10" aria-live="polite">
            {list.length === 0 && (
              <EmptyState title={f === "All" ? "No published stories yet" : `No published ${f.toLowerCase()} stories yet`}>
                Customer stories are being prepared for approval. Each will show the challenge, Convert’s role and measured results with period, baseline and source.
              </EmptyState>
            )}
          </div>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
