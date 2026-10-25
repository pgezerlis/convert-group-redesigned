import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { NEWS, formatNewsDate } from "@/lib/content";

export const Route = createFileRoute("/company/news/$slug")({
  loader: ({ params }) => {
    const article = NEWS.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData: article }) => ({
    meta: article ? [
      { title: `${article.title} — Convert Group` },
      { name: "description", content: article.summary },
      { property: "og:title", content: `${article.title} — Convert Group` },
      { property: "og:description", content: article.summary },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ] : [],
  }),
  component: Article,
});

function Article() {
  const article = Route.useLoaderData();
  return (
    <article className="container-cg py-10 md:py-16">
      <Link to="/company/news" className="text-link inline-flex items-center gap-2">
        <ArrowLeft aria-hidden className="size-4" /> Back to all News
      </Link>
      <header className="mx-auto my-10 max-w-4xl">
        <time dateTime={article.date} className="data-label text-muted-foreground">{formatNewsDate(article.date)}</time>
        <h1 className="mt-5 text-3xl leading-tight tracking-normal md:text-4xl lg:text-5xl">{article.title}</h1>
      </header>
      <img src={article.image} alt="" className="mx-auto mb-12 max-h-[32rem] w-full max-w-4xl object-contain" />
      <div className="mx-auto max-w-[72ch] text-lg leading-relaxed">
        <ReactMarkdown components={{
          p: ({ children }) => <p className="mb-6">{children}</p>,
          ul: ({ children }) => <ul className="mb-8 list-disc space-y-3 pl-6">{children}</ul>,
          a: ({ children, href }) => <a href={href} className="text-link" target="_blank" rel="noreferrer">{children}</a>,
          img: ({ src, alt }) => <img src={src} alt={alt ?? ""} loading="lazy" className="my-8 h-auto w-full" />,
        }}>{article.body}</ReactMarkdown>
      </div>
      <div className="mx-auto mt-12 max-w-[72ch] border-t border-border pt-8">
        <Link to="/company/news" className="text-link inline-flex items-center gap-2"><ArrowLeft aria-hidden className="size-4" /> All news</Link>
      </div>
    </article>
  );
}