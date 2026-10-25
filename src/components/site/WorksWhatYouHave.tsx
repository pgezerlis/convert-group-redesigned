import { SectionIntro } from "@/components/site/ui";
import { NavyRow, useNavy } from "@/components/site/NavySection";
import { MCP_SECTION } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Homepage section: data reaches brand partners through Convert's MCP, in the AI tools they already use. */
export function WorksWhatYouHave() {
  const state = useNavy();

  return (
    <section className={cn("section transition-colors duration-300", state.navy && "on-dark")}>
      <div className="container-cg">
        <NavyRow {...state} />
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionIntro eyebrow={MCP_SECTION.eyebrow} title={MCP_SECTION.title}>
              {MCP_SECTION.body.map((p, i) => (
                <p key={p.slice(0, 24)} className={i > 0 ? "mt-4" : undefined}>{p}</p>
              ))}
            </SectionIntro>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="data-label mb-3 text-muted-foreground">{MCP_SECTION.toolsLabel}</p>
            <ul className="grid grid-cols-3 divide-x divide-border border border-border">
              {MCP_SECTION.tools.map((t) => (
                <li key={t.name} className="flex flex-col items-center justify-center gap-4 px-4 py-8 text-center">
                  <img src={t.mark} alt={t.alt} width={32} height={32} loading="lazy" className="cg-tool-mark h-8 w-8" />
                  <span className="text-sm font-medium text-ink">{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
