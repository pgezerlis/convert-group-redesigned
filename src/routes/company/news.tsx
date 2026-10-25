import { createFileRoute } from "@tanstack/react-router";
import { EmptyState, PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/company/news")({
  head: () => ({
    meta: [
      { title: "News — Convert Group" },
      { name: "description", content: "News and updates from Convert Group on data monetisation for retail, marketplaces and delivery apps." },
      { property: "og:title", content: "News — Convert Group" },
      { property: "og:description", content: "Updates from Convert Group." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="News" title="News and updates." />
      <section className="section">
        <div className="container-cg">
          <EmptyState title="No articles published yet">
            Existing articles will move here with their original dates as part of the site migration.
          </EmptyState>
        </div>
      </section>
    </>
  );
}
