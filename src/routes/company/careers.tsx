import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionIntro } from "@/components/site/ui";

const OPENINGS_URL = "https://apply.workable.com/convertgroup/";

export const Route = createFileRoute("/company/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Convert Group" },
      { name: "description", content: "Join the Converters: hybrid working, real perks and a talented team. See open roles at Convert Group." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Careers — Convert Group" },
      { property: "og:description", content: "We are not just a company, we are Converters. Join our team." },
    ],
  }),
  component: Page,
});

const STATS = [
  { value: "40", label: "Current employees" },
  { value: "1200", label: "Hours giving back to the community per year" },
  { value: "4", label: "Giving back teams" },
];

const PERKS: { title: string; items: string[] }[] = [
  {
    title: "Time & flexibility",
    items: [
      "Hybrid working environment",
      "20% extra time off",
      "3 months work from anywhere in the world",
      "Birthday leave & rest days",
      "Unlimited sick & mental health days off",
      "3 days paid time off for volunteerism",
      "Flexible working hours",
      "Early Fridays during summer & every last Friday of the month",
    ],
  },
  {
    title: "Health & growth",
    items: [
      "Private health & medical insurance",
      "Life insurance",
      "Employee Assistance Program (EAP) 24/7",
      "Employees own part of the company through stock options",
      "Learning & development budget",
      "Mentoring program",
      "New parent's extra perks",
    ],
  },
  {
    title: "Office life",
    items: [
      "Daily free lunches, fruits and snacks at the office",
      "Annual company trip to a secret location",
      "Playroom with ping-pong, soccer table & electronics",
      "Kids & pets are welcome at the office",
      "Welcome kit with laptop, headset & office equipment",
    ],
  },
];

const STEPS = [
  { title: "Review", text: "All applications are thoroughly reviewed and screened for a variety of criteria." },
  { title: "Video / intro call", text: "A video call with one of our recruiters to get to know you and your previous experience." },
  { title: "Interview", text: "An interview so our recruiters can see whether you are a good fit for the job." },
  { title: "Assessment", text: "Finalists complete assessments or technical assignments, depending on the role." },
  { title: "Offer", text: "Our recruiters make an offer to the candidate they believe is the best fit." },
  { title: "Onboarding", text: "Welcome to Convert Group! Get to know the rest of our talented team." },
];

const QUOTES = [
  {
    quote:
      "Convert Group is a company that places the human factor above all, and that's why I am thrilled to be a part of it. In Convert Group, we don't work. We create. We develop our products and, most importantly, ourselves through everyday learning.",
    name: "Vassiliki Bei",
    role: "Service Delivery Engineer",
  },
  {
    quote:
      "I started working at Convert Group as a product management intern. The supportive and nurturing environment of the company enabled me to gain new skills, adapt to the challenges, take initiative, and become a junior product manager.",
    name: "Christi Kogiou",
    role: "Product Manager",
  },
];

function OpeningsButton() {
  return (
    <a
      href={OPENINGS_URL}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
    >
      View our openings ↗
    </a>
  );
}

function Page() {
  return (
    <>
      <PageHero eyebrow="Careers" title="We are not just a company, we are Converters.">
        Ready to work with passion, in an innovative team that is creating the standards in measuring omni-channel retail? Join our talented team today.
      </PageHero>

      <section className="section">
        <div className="container-cg">
          <OpeningsButton />
          <dl className="mt-12 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-sm text-muted-foreground">{s.label}</dt>
                <dd className="mt-2 text-4xl font-semibold text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-secondary">
        <div className="container-cg">
          <SectionIntro title="Some of the perks we provide" />
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {PERKS.map((g) => (
              <div key={g.title}>
                <h3 className="font-semibold text-foreground">{g.title}</h3>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  {g.items.map((i) => (
                    <li key={i} className="border-b border-border pb-2">{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-cg">
          <SectionIntro title="The steps to join our team" />
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-secondary">
        <div className="container-cg grid gap-10 md:grid-cols-2">
          {QUOTES.map((q) => (
            <figure key={q.name}>
              <blockquote className="text-lg text-foreground">“{q.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{q.name}</span> · {q.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-cg grid gap-10 lg:grid-cols-2">
          <div>
            <SectionIntro title="Creating an inclusive environment" />
            <p className="mt-6 text-muted-foreground">
              Our hiring process ensures that all candidates are treated equally and respectfully. Discrimination on the basis of age, gender, race, religion, political beliefs, sexual preference, family circumstances or physical disability is not tolerated at any stage. Hiring decisions are made based on skills, experience and abilities, and all personal data is treated as confidential.
            </p>
          </div>
          <div>
            <SectionIntro title="Career opportunities" />
            <p className="mt-6 text-muted-foreground">
              Discover our open positions and join our team totally remotely, from the office or somewhere in between.
            </p>
            <div className="mt-6"><OpeningsButton /></div>
          </div>
        </div>
      </section>
    </>
  );
}
