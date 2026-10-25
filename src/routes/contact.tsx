import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/ContactForm";
import { Pending } from "@/components/site/ui";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Talk to Convert Group" },
      { name: "description", content: "Tell us what you want to build with your data. Talk to Convert Group about data monetisation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Contact Us — Talk to Convert Group" },
      { property: "og:description", content: "Tell us what you want to build with your data." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <section>
      <div className="container-cg grid gap-12 pb-20 pt-8 md:pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-5">Contact Us</p>
          <h1 className="h1-interior">Tell us what you want to build with your data.</h1>
          <p className="lede mt-6">Share a little about your organisation and what you’d like to explore. A member of our team will pick it up.</p>
          <div className="mt-10 hidden lg:block">
            <Pending label="Real team photograph" ratio="aspect-[4/3]" />
            <p className="data-label mt-4 text-muted-foreground">Verified contact details pending approval.</p>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
