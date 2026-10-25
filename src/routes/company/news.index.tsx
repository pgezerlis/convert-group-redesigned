import { createFileRoute, Link } from "@tanstack/react-router";
import { NEWS, formatNewsDate } from "@/lib/content";
import { PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/company/news/")({
  head: () => ({
    meta: [
      { title: "News — Convert Group" },
      { name: "description", content: "Convert Group news: partnerships with Dr. Max, Norman Goodfellows, apo.com Group, Atida and Skroutz." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "News — Convert Group" },
      { property: "og:description", content: "Partnership announcements and updates from Convert Group." },
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
          <ul className="divide-y divide-border border-y border-border">
            {NEWS.map((n) => (
              <li key={n.slug} className="grid gap-4 py-8 lg:grid-cols-12 lg:gap-8">
                <time dateTime={n.date} className="data-label text-muted-foreground lg:col-span-3">{formatNewsDate(n.date)}</time>
                <div className="lg:col-span-9">
                  <h2 className="text-xl font-semibold text-foreground">
                    <Link to="/company/news/$slug" params={{ slug: n.slug }} className="hover:underline underline-offset-4">{n.title}</Link>
                  </h2>
                  <p className="mt-3 text-muted-foreground">{n.summary}</p>
                  <Link to="/company/news/$slug" params={{ slug: n.slug }} className="mt-4 inline-block font-medium text-foreground underline underline-offset-4">Read the article →</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
