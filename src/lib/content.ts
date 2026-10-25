// Content objects. Everything here is proposed website copy or clearly illustrative
// example data — no client results, logos or testimonials are invented.

export const METHOD = [
  {
    n: "01",
    title: "Define the opportunity",
    question: "Which data assets could create value for which commercial partners?",
    output: "Opportunity map",
    owner: "Your commercial and data leads",
    detail:
      "We review the signals you already hold — categories, search, availability, purchase missions — and identify who would value them and what is permitted to share.",
  },
  {
    n: "02",
    title: "Build the commercial model",
    question: "What exactly do we sell, to whom, and at what price?",
    output: "Proposition and pricing framework",
    owner: "Your commercial team, with finance",
    detail:
      "We shape concrete offers with defined buyers, scope, delivery cadence and pricing logic, grounded in what partners actually buy.",
  },
  {
    n: "03",
    title: "Equip the team",
    question: "Who sells it, delivers it and owns the relationships?",
    output: "Sales playbook and operating roles",
    owner: "The team that will run it",
    detail:
      "We transfer the know-how: playbooks, account approach, internal roles and — where your existing stack falls short — the technology to deliver.",
  },
  {
    n: "04",
    title: "Operate and improve",
    question: "Is it working, and what should we change next?",
    output: "Reporting cadence",
    owner: "Your team, with Convert as needed",
    detail:
      "We set up a regular review rhythm so the capability matures inside your organisation and keeps improving after launch.",
  },
] as const;

export type Audience = "retailers" | "marketplaces" | "delivery-apps";

export type SolutionContent = {
  slug: Audience;
  label: string;
  title: string;
  intro: string;
  need: string;
  deliverables: string[];
  situation: { heading: string; body: string }[];
  example: {
    caption: string;
    question: string;
    rows: { label: string; value: string; note?: string }[];
    offer: { k: string; v: string }[];
  };
};

export const SOLUTIONS: SolutionContent[] = [
  {
    slug: "retailers",
    label: "Retailers",
    title: "Turn category knowledge into supplier value.",
    intro:
      "Retailers understand shoppers and categories better than anyone. We help you package that understanding into insight your supplier partners will pay for — run by your own team.",
    need: "Suppliers want clearer category and shopper understanding; retailers want a structured, fair way to provide it.",
    deliverables: ["Category insight packages", "Supplier collaboration model", "Pricing and sales playbook"],
    situation: [
      {
        heading: "The data already exists",
        body: "Sales, baskets and assortment data sit across your systems. Suppliers ask for parts of it informally, often for free.",
      },
      {
        heading: "The offer usually doesn't",
        body: "Without a defined product, buyer and price, insight sharing stays ad hoc — hard to scale and hard to value.",
      },
      {
        heading: "Ownership matters",
        body: "The relationships belong with your commercial team. We build the framework so they can run it confidently.",
      },
    ],
    example: {
      caption: "Category tree · illustrative",
      question: "What could the personal care category offer its suppliers?",
      rows: [
        { label: "Personal care", value: "Category" },
        { label: "Hair care", value: "Sub-category", note: "Shampoo · conditioner · styling" },
        { label: "Everyday shampoo · 250ml", value: "Example SKU", note: "Fictional product" },
      ],
      offer: [
        { k: "Offer", v: "Category intelligence subscription" },
        { k: "Buyer", v: "Supplier brand teams" },
        { k: "Scope", v: "Aggregated category trends and agreed brand-level reporting" },
        { k: "Owner", v: "Your commercial team" },
      ],
    },
  },
  {
    slug: "marketplaces",
    label: "Marketplaces",
    title: "Help sellers and brands grow with what your marketplace sees.",
    intro:
      "Search demand, assortment gaps and promotion performance are valuable to the sellers and brands on your platform. We help you shape that into a reporting offer your team owns.",
    need: "Sellers and brands want to understand demand on your platform; you want a scalable, governed way to serve them.",
    deliverables: ["Seller and brand intelligence offer", "Search-demand reporting", "Tiered commercial model"],
    situation: [
      {
        heading: "Demand is visible to you",
        body: "Searches, zero-result queries and category browsing reveal what shoppers want before sellers do.",
      },
      {
        heading: "Sellers need direction",
        body: "Assortment and promotion decisions improve when sellers can see aggregated demand in their categories.",
      },
      {
        heading: "Governance first",
        body: "Scope is defined carefully: aggregated, permitted and fair across sellers — never unrestricted competitor visibility.",
      },
    ],
    example: {
      caption: "Search-to-category · illustrative",
      question: "Which unmet searches could guide seller assortment?",
      rows: [
        { label: "“refillable cleaning spray”", value: "Search term", note: "Rising monthly searches" },
        { label: "Household › Cleaning", value: "Mapped category" },
        { label: "Limited matching listings", value: "Assortment gap", note: "Example observation" },
      ],
      offer: [
        { k: "Offer", v: "Category demand report" },
        { k: "Buyer", v: "Sellers and brands in the category" },
        { k: "Scope", v: "Aggregated search and conversion trends" },
        { k: "Owner", v: "Your seller success team" },
      ],
    },
  },
  {
    slug: "delivery-apps",
    label: "Delivery Apps",
    title: "Give partners a clearer view of local demand.",
    intro:
      "Purchase missions, availability and local demand by area and time tell partners where and when to act. We help you turn those patterns into partner insight briefs.",
    need: "Brands and partners want to understand fast, local purchase behaviour; you want a commercial model around it.",
    deliverables: ["Partner insight briefs", "Local demand reporting", "Partner commercial framework"],
    situation: [
      {
        heading: "Missions, not baskets",
        body: "Quick-commerce orders reveal intent — a late-evening snack run, a weekly top-up — that partners rarely see.",
      },
      {
        heading: "Availability drives sales",
        body: "Aggregated out-of-stock and substitution patterns help partners plan supply and promotions.",
      },
      {
        heading: "A structured brief",
        body: "A defined, recurring brief turns ad hoc data requests into a product your partnerships team sells.",
      },
    ],
    example: {
      caption: "Demand by area and time · illustrative",
      question: "When does demand for chilled drinks peak by area?",
      rows: [
        { label: "Area A · 18:00–21:00", value: "Peak window", note: "Fictional data" },
        { label: "Area B · 12:00–14:00", value: "Secondary peak" },
        { label: "Weekend evenings", value: "Highest share", note: "Aggregated, not individual" },
      ],
      offer: [
        { k: "Offer", v: "Monthly partner insight brief" },
        { k: "Buyer", v: "Beverage brand partners" },
        { k: "Scope", v: "Aggregated demand by area and time" },
        { k: "Owner", v: "Your partnerships team" },
      ],
    },
  },
];

export const getSolution = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);

export const WORKFLOW_EXAMPLES = [
  {
    label: "Supplier partners",
    question: "What could we offer our supplier partners?",
    evidence: [
      { k: "Category sales trends", v: "Source: sales data · category level" },
      { k: "Shopper basket patterns", v: "Source: transactions · aggregated" },
      { k: "Promotion response", v: "Source: campaign calendar · by brand, agreed scope" },
    ],
    option: "Category intelligence subscription — supplier brand teams, monthly review, owned by your commercial team.",
  },
  {
    label: "Marketplace sellers",
    question: "How could sellers benefit from our search data?",
    evidence: [
      { k: "Search demand by category", v: "Source: site search · aggregated" },
      { k: "Zero-result queries", v: "Source: site search · monthly" },
      { k: "Listing conversion", v: "Source: platform analytics · category level" },
    ],
    option: "Category demand report — sellers and brands, monthly, owned by your seller success team.",
  },
  {
    label: "Delivery partners",
    question: "What would brand partners want to know about local demand?",
    evidence: [
      { k: "Orders by area and time", v: "Source: order data · aggregated" },
      { k: "Purchase missions", v: "Source: basket composition · modelled" },
      { k: "Availability gaps", v: "Source: inventory events · by category" },
    ],
    option: "Partner insight brief — beverage and snack brands, monthly, owned by your partnerships team.",
  },
] as const;

/** Approved clients (confirmed by Pan) with countries of operation (ISO 3166-1 alpha-2). */
export const CLIENTS: { name: string; countries: { code: string; name: string }[] }[] = [
  { name: "Dr. Max", countries: [
    { code: "cz", name: "Czechia" }, { code: "ro", name: "Romania" }, { code: "it", name: "Italy" },
    { code: "sk", name: "Slovakia" }, { code: "rs", name: "Serbia" }, { code: "pl", name: "Poland" } ] },
  { name: "Atida", countries: [ { code: "it", name: "Italy" }, { code: "fr", name: "France" }, { code: "es", name: "Spain" } ] },
  { name: "PLUS", countries: [ { code: "nl", name: "Netherlands" } ] },
  { name: "Naivas", countries: [ { code: "ke", name: "Kenya" } ] },
  { name: "Skroutz", countries: [ { code: "gr", name: "Greece" } ] },
  { name: "efood", countries: [ { code: "gr", name: "Greece" } ] },
];
