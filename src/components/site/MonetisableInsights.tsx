import { MONETISABLE_INSIGHTS } from "@/lib/content";
import { Pending } from "@/components/site/ui";
import { AssistantChat } from "@/components/site/AssistantChat";
import { NavyRow, useNavy } from "@/components/site/NavySection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Advice = { brand: string; trigger: string; text: string };

export function MonetisableInsights() {
  const first = MONETISABLE_INSIGHTS.areas[0]?.slug ?? "market-shares";
  const state = useNavy();

  return (
    <section aria-labelledby="monetisable-insights-heading" className={cn("section border-t border-border transition-colors duration-300", state.navy && "on-dark")}>
      <div className="container-cg">
        <NavyRow {...state} />
        <div className="max-w-[48rem]">
          <h2 id="monetisable-insights-heading" className="tracking-normal">{MONETISABLE_INSIGHTS.title}</h2>
          <p className="body-lg mt-6 text-muted-foreground">{MONETISABLE_INSIGHTS.intro}</p>
        </div>
        <Tabs defaultValue={first} className="mt-10">
          <TabsList aria-label="Data and insight areas" className="grid h-auto w-full grid-cols-2 gap-0 rounded-none border-b border-border bg-transparent p-0 sm:grid-cols-3 lg:grid-cols-6">
            {MONETISABLE_INSIGHTS.areas.map((area) => (
              <TabsTrigger key={area.slug} value={area.slug} className="min-h-16 whitespace-normal rounded-none border-b-2 border-transparent px-3 py-3 text-base leading-snug text-muted-foreground transition-colors data-[state=active]:border-navy data-[state=active]:bg-surface data-[state=active]:text-navy data-[state=active]:shadow-none">
                {area.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {MONETISABLE_INSIGHTS.areas.map((area, index) => {
            const advice = "advice" in area ? (area.advice as readonly Advice[]) : null;
            const shot = !advice && area.screenshot ? area.screenshot : null;
            const label = <p className="data-label mb-4 text-muted-foreground">{String(index + 1).padStart(2, "0")} · {area.status === "planned" ? "Product concept · planned" : "Available today"}</p>;
            const heading = <h3 id={`insight-${area.slug}`} className="tracking-normal">{area.title}</h3>;
            const body = <p className="body-lg mt-5 text-muted-foreground">{area.description}</p>;

            if (shot) {
              return (
                <TabsContent key={area.slug} value={area.slug} className="mt-0">
                  <article aria-labelledby={`insight-${area.slug}`} className="grid min-h-[640px] items-center gap-8 py-10 sm:min-h-[700px] lg:min-h-[480px] lg:grid-cols-12 lg:gap-12">
                    <div className="min-w-0 lg:col-span-5">
                      {label}
                      {heading}
                      {body}
                    </div>
                    <div className="min-w-0 lg:col-span-7">
                      <figure className="cg-shot rounded-lg border border-border bg-background shadow-sm">
                        <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" className="block h-auto w-full" />
                      </figure>
                    </div>
                  </article>
                </TabsContent>
              );
            }

            return (
              <TabsContent key={area.slug} value={area.slug} className="mt-0">
                <article aria-labelledby={`insight-${area.slug}`} className="grid min-h-[640px] items-center gap-8 py-10 sm:min-h-[700px] lg:min-h-[480px] lg:grid-cols-12 lg:gap-12">
                  <div className="min-w-0 lg:col-span-5">
                    {label}
                    {heading}
                    {body}
                  </div>
                  <div className="min-w-0 lg:col-span-7">
                    {advice ? (
                      <AssistantChat items={advice} />
                    ) : (
                      <Pending label={`${area.title} · app screenshot`} ratio="aspect-[1920/1180]" />
                    )}
                  </div>
                </article>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
