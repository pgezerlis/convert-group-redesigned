import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/company/news")({
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

const BASE = "https://convertgroup.com/news_posts/";

const NEWS = [
  {
    date: "2025-01-24",
    title: "Convert Group Teams Up with Norman Goodfellows to Launch Groundbreaking Insights Collaboration Program for South Africa’s Alcohol Industry",
    summary: "Norman Goodfellows, a leading food & beverage re-distributor and premium liquor retailer in South Africa, launches an insights collaboration program for the alcohol industry with Convert Group.",
    slug: "convert-group-teams-up-with-norman-goodfellows",
  },
  {
    date: "2025-01-10",
    title: "Convert Group Empowers Dr. Max with Europe’s Largest Insights Collaboration Program in Retail Pharmacy",
    summary: "Dr. Max, with 3,000 pharmacies across Czechia, Romania, Slovakia, Poland, Serbia and Italy, has signed a 5-year partnership with Convert Group to transform retailer-brand collaboration.",
    slug: "convert-group-empowers-dr-max-with-europes-largest-insights-collaboration-program-in-retail-pharmacy",
  },
  {
    date: "2023-12-21",
    title: "apo.com Group and Convert Group Join Forces, Revolutionizing the Landscape of Retail-brand Collaboration",
    summary: "apo.com Group, the third-largest online pharmacy group in Germany, joins forces with Convert Group to enhance retailer-brand collaboration across all its countries of operation.",
    slug: "apocom-group-and-convert-group-join-forces-revolutionizing-the-landscape-of-retail-brand-collaboration",
  },
  {
    date: "2023-11-13",
    title: "Atida Partners with Convert Group to Disrupt Data Collaboration with Suppliers through Real-time Insights",
    summary: "Atida, one of the largest pan-European online pharmacies, partners with Convert Group across all countries of operation to give brands access to unique eCommerce insights.",
    slug: "atida-partners-with-convert-group-to-disrupt-data-collaboration-with-suppliers-through-real-time-insights",
  },
  {
    date: "2023-07-05",
    title: "Skroutz and Convert Group Join Forces to Empower Brands with Unparalleled Sales Data Insights",
    summary: "Skroutz, the premier marketplace in Greece, and Convert Group introduce Skroutz Market Intelligence, giving brands and distributors access to Skroutz’s sales data.",
    slug: "skroutz-and-convert-group-join-forces-to-empower-brands-with-unparalleled-sales-data-insights",
  },
];

const fmt = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function Page() {
  return (
    <>
      <PageHero eyebrow="News" title="News and updates." />
      <section className="section">
        <div className="container-cg">
          <ul className="divide-y divide-border border-y border-border">
            {NEWS.map((n) => (
              <li key={n.slug} className="grid gap-4 py-8 lg:grid-cols-12 lg:gap-8">
                <time dateTime={n.date} className="data-label text-muted-foreground lg:col-span-3">{fmt(n.date)}</time>
                <div className="lg:col-span-9">
                  <h2 className="text-xl font-semibold text-foreground">
                    <a href={`${BASE}${n.slug}/`} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">{n.title}</a>
                  </h2>
                  <p className="mt-3 text-muted-foreground">{n.summary}</p>
                  <a href={`${BASE}${n.slug}/`} target="_blank" rel="noreferrer" className="mt-4 inline-block font-medium text-foreground underline underline-offset-4">Read the article ↗</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
