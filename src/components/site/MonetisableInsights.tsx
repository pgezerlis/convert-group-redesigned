import { MONETISABLE_INSIGHTS } from "@/lib/content";
import { Pending } from "@/components/site/ui";

export function MonetisableInsights() {
  return (
    <section aria-labelledby="monetisable-insights-heading" className="section border-t border-border">
      <div className="container-cg">
        <div className="max-w-[48rem]">
          <h2 id="monetisable-insights-heading" className="tracking-normal">{MONETISABLE_INSIGHTS.title}</h2>
          <p className="body-lg mt-6 text-muted-foreground">{MONETISABLE_INSIGHTS.intro}</p>
        </div>
        <div className="mt-12 border-t border-navy">
          {MONETISABLE_INSIGHTS.areas.map((area, index) => (
            <article key={area.slug} aria-labelledby={`insight-${area.slug}`} className="grid items-center gap-8 border-b border-border py-10 md:py-16 lg:grid-cols-12 lg:gap-12">
              <div className="min-w-0 lg:col-span-5">
                <p className="data-label mb-4 text-link">{String(index + 1).padStart(2, "0")}</p>
                <h3 id={`insight-${area.slug}`} className="tracking-normal">{area.title}</h3>
                <p className="body-lg mt-5 text-muted-foreground">{area.description}</p>
              </div>
              <div className="min-w-0 lg:col-span-7">
                {area.screenshot ? (
                  <figure>
                    <img src={area.screenshot.src} alt={area.screenshot.alt} width={area.screenshot.width} height={area.screenshot.height} loading="lazy" className="block h-auto w-full" />
                  </figure>
                ) : (
                  <Pending label={`${area.title} · app screenshot`} ratio="aspect-[1920/1180]" />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}