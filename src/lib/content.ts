// Content objects. Everything here is proposed website copy or clearly illustrative
// example data — no client results, logos or testimonials are invented.
import bundleOpportunities from "@/assets/insights/bundle-opportunities-clean-transparent.png.asset.json";
import marketShares from "@/assets/insights/brand-performance-clean-transparent.png.asset.json";
import salesGrowth from "@/assets/insights/kpi-tree-clean-transparent.png.asset.json";
import siteNavigation from "@/assets/insights/site-navigation-clean-transparent.png.asset.json";
import retailMedia from "@/assets/insights/retail-media-strategy.png.asset.json";
import drMaxPartnership from "@/assets/news/dr-max-partnership.asset.json";
import claudeMark from "@/assets/tools/claude.svg";
import chatgptMark from "@/assets/tools/openai.svg";
import copilotMark from "@/assets/tools/microsoftcopilot.svg";

/** The 12 countries where Convert Group operates (shared by About Us and the presence map). */
export const COUNTRIES = ["Czechia", "France", "Germany", "Greece", "Italy", "Kenya", "Netherlands", "Poland", "Romania", "Serbia", "Slovakia", "Spain"];


/** Original homepage copy; only user-supplied application captures are shown. */
export const MONETISABLE_INSIGHTS = {
  title: "Data & Insights Retailers can Monetise",
  intro: "Leverage data to fuel smarter, more effective strategies. With Convert Group, you can offer brands comprehensive insights across key areas of the customer journey, enabling them to optimise campaigns, increase ROI, and drive growth.",
  areas: [
    {
      slug: "market-shares",
      title: "Market Shares",
      description: "Provide Brands with a clear understanding of their position in the market. Offer detailed, SKU-level insights that highlight performance trends across categories, brands, and products. Include metrics such as conversion rates, page views, and stock availability, allowing them to make data-driven decisions and optimise their product offerings in real-time.",
      screenshot: { src: marketShares.url, alt: "Market Shares: brand performance overview with share metrics", width: 1920, height: 1200 },
    },
    {
      slug: "sales-growth-insights",
      title: "Sales Growth Insights",
      description: "Every Brand needs to understand the “why” behind fluctuations in their sales figures. With our platform, brands gain instant, in-depth insights into their performance, breaking down sales data into granular components. Our intuitive, visual reports uncover the key drivers of sales changes—whether it’s promotions, seasonality, or market shifts—empowering brands to refine their strategies, optimise inventory, and seize new growth opportunities with confidence.",
      screenshot: { src: salesGrowth.url, alt: "Sales Growth Insights: KPI tree breaking down sales growth drivers", width: 1920, height: 1152 },
    },
    {
      slug: "search-navigation",
      title: "Search & Navigation",
      description: "Share real-time insights into how customers discover, research, and purchase products across your platform. Track and analyse consumer behaviors—from search queries and navigation patterns to purchase pathways. This data empowers brands to refine their digital marketing strategies, personalise customer experiences, and optimise their retail media campaigns for higher engagement.",
      screenshot: { src: siteNavigation.url, alt: "Search & Navigation: site search and navigation demand in the app", width: 1920, height: 1104 },
    },
    {
      slug: "customer-insights",
      title: "Customer Insights",
      description: "Unlock powerful data on your audience—whether for your brand, competitors, or categories. Analyse segments like age, gender, income, lifestyle, and buying behavior to spot cross-sell opportunities, high-value bundles, and category affinities that drive sales. With this, brands can fine-tune targeting, personalise offers, and optimise product assortments for better conversions.",
      screenshot: { src: bundleOpportunities.url, alt: "Bundle Opportunities: product affinities in a basket analysis heatmap", width: 1920, height: 1104 },
    },
    {
      slug: "retail-media-strategy",
      title: "Retail Media Strategy",
      description: "Measure the effectiveness of retail media campaigns with real-time, data-backed insights that show clear results. We provide detailed attribution level metrics, ROAS, incremental ROAS, ROI and campaign post impact, ensuring brands have full transparency. By offering detailed and incremental measurement, brands can fine-tune their media strategies, build trust with suppliers, and drive increased media budgets over time.",
      screenshot: { src: retailMedia.url, alt: "Retail Media Strategy: campaign results with estimated incremental sales in the app", width: 1920, height: 1080 },
    },
  ],
};

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

/** FAQ answers reuse existing site copy rather than adding new product claims. */
/** Homepage MCP section copy; official tool marks only (simple-icons / Microsoft's own SVG), never redrawn. */
export const MCP_SECTION = {
  eyebrow: "Built on MCP",
  title: "Works with what you have.",
  body: [
    "Your brand partners don’t need another dashboard. Through Convert’s MCP, the data you share reaches the AI tools their teams already use — Claude, ChatGPT, Copilot — and becomes part of the work they do there.",
    "You keep control of what each partner can reach; they bring their own tools to it.",
  ],
  toolsLabel: "Tools your partners already use",
  tools: [
    { name: "Claude", mark: claudeMark, alt: "Claude logo" },
    { name: "ChatGPT", mark: chatgptMark, alt: "ChatGPT logo" },
    { name: "Copilot", mark: copilotMark, alt: "Copilot logo" },
  ],
};

export const FAQS = [
  {
    id: "what-we-do",
    question: "What does Convert Group do?",
    answer: "We help retailers, marketplaces and delivery apps monetise their data with the commercial framework, know-how and, where needed, technology to build that capability in-house.",
  },
  {
    id: "partners",
    question: "Who can benefit from our data?",
    answer: "Suppliers, sellers and brand partners make better decisions with what you see every day. Most organisations share fragments of it informally. A defined offer, buyer and price turns that into a revenue line your team runs.",
  },
  {
    id: "insights",
    question: "What kinds of insights can retailers monetise?",
    answer: MONETISABLE_INSIGHTS.areas.map((area) => area.title).join(", ") + ".",
  },
  {
    id: "commercial-model",
    question: "How is the commercial model developed?",
    answer: METHOD[1].detail,
  },
  {
    id: "team-ownership",
    question: "Who runs the capability inside our business?",
    answer: SOLUTIONS[0]?.situation[2]?.body ?? "The relationships belong with your commercial team. We build the framework so they can run it confidently.",
  },
  {
    id: "getting-started",
    question: "Where do we start?",
    answer: METHOD[0].detail,
  },
] as const;

/** Abstract homepage animation labels, not performance data or product claims. */
export const HERO_ANIMATION = {
  label: "Data. Collaboration. Commercial value.",
  stages: ["01 · Your data", "02 · Shared with partners", "03 · New commercial value"],
  description: "An abstract sphere of data points that splits into three linked partners exchanging data, then builds into rising columns of commercial value, and flows back together.",
} as const;

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

/** Approved clients (confirmed by Pan), in display order.
 *  slug matches the official mark at src/assets/logos/<slug>.asset.json. */
export type Client = { name: string; slug: string };

export const CLIENTS: Client[] = [
  { name: "Dr. Max", slug: "dr-max" },
  { name: "Atida", slug: "atida" },
  { name: "apo.com", slug: "apo-com" },
  { name: "PLUS", slug: "plus" },
  { name: "Naivas", slug: "naivas" },
  { name: "Skroutz", slug: "skroutz" },
  { name: "efood", slug: "efood" },
  { name: "JD", slug: "jd" },
  { name: "Intersport", slug: "intersport" },
  { name: "Foot Locker", slug: "foot-locker" },
];


/** Original Convert Group news articles, copied with their publication dates. */
export const NEWS = [
  {
    date: "2025-01-24",
    title: "Convert Group Teams Up with Norman Goodfellows to Launch Groundbreaking Insights Collaboration Program for South Africa’s Alcohol Industry",
    summary: "Norman Goodfellows, a leading food & beverage re-distributor and premium liquor retailer in South Africa, launches an insights collaboration program for the alcohol industry with Convert Group.",
    slug: "convert-group-teams-up-with-norman-goodfellows",
    image: "/__l5e/assets-v1/bc272e04-2137-4064-86a6-db6482b6be69/norman-goodfellows-0.png",
    body: "**Norman Goodfellows (NGF)**, a leading food & beverage re-distributor & premium liquor retailer in **South Africa** is proud to announce the launch of a groundbreaking insights collaboration program for the alcohol industry in partnership with **Convert Group**, a global leader in data monetization solutions. This transformative initiative is set to redefine retailer-brand collaboration by delivering near real-time, actionable insights that drive growth and operational efficiency. The program has already garnered the attention of major industry players which ha​ve committed to participating in this innovative data-driven collaboration.\n\nThrough Convert Group’s all-in-one, user-friendly platform, Norman Goodfellows Suppliers will gain access to powerful insights, including:\n\n- **Granular Data Access:** Suppliers can view highly detailed data, down to the SKU level, with updates as recent as two days prior. Meaningful category and competition benchmarks in value and quantity are also available for a comprehensive market view.\n- **Daily Stock Alerts:** Suppliers stay ahead with daily updates on product availability, pinpointing stockouts and stock replenishment opportunities across all stores and warehouses.\n- **Promotion Performance Analysis:** Advanced AI algorithms evaluate the impact of both online and offline promotions, including Retail Media campaigns, and measure their effect on incremental sales.\n- **Basket Analysis:** Suppliers unlock cross-selling opportunities, category affinities, bundling potential, and insights into new, repeat, and lapsed customers, while identifying missed sales opportunities.\n- **Automated Alerts:** Suppliers receive notifications for issues such as declining SKU sales or emerging growth opportunities.\n- Sales Decomposition Reports: Automated reports break down the key drivers of growth and decline in sales, including price, volume, and product mix, providing suppliers with deeper insights for more informed decision-making.\n- **Shopping Mission Analytics:** Suppliers gain a deeper understanding of consumer behavior to refine product offerings, focus their sales focus on particular clients and enhance the overall shopping experience.\n- **Consumer Journey & eMerchandising Insights:** Suppliers analyze how customers interact online with products, from browsing to purchase, for a more tailored approach to digital engagement.\n- **AI-Powered Recommendations:** Insights and data are also delivered through an intuitive, AI-powered interface that simplifies access and decision-making.\n\nThis partnership marks a significant milestone for both Convert Group and Norman Goodfellows, paving the way for unprecedented collaboration and innovation in the omni-channel alcohol industry.",
  },
  {
    date: "2025-01-10",
    title: "Convert Group Empowers Dr. Max with Europe’s Largest Insights Collaboration Program in Retail Pharmacy",
    summary: "Dr. Max, with 3,000 pharmacies across Czechia, Romania, Slovakia, Poland, Serbia and Italy, has signed a 5-year partnership with Convert Group to transform retailer-brand collaboration.",
    slug: "convert-group-empowers-dr-max-with-europes-largest-insights-collaboration-program-in-retail-pharmacy",
    image: drMaxPartnership.url,
    body: "**Dr. Max**, a market leader in the European pharmacy operation industry with a network of 3,000 pharmacies spanning **Czechia, Romania, Slovakia, Poland, Serbia,** and **Italy**, has signed a **5-year partnership** with Convert Group. This collaboration aims to revolutionize **retailer-brand collaboration** by leveraging near-real-time actionable insights to drive growth and efficiency.\n\nThrough Convert Group’s all-in-one, user-friendly platform, Dr. Max suppliers will gain access to powerful insights, including:\n\n- **Granular Data Access:** Suppliers can view highly detailed data, down to the SKU level, with updates as recent as two days prior. Meaningful category and competition benchmarks in value and quantity are also available for a comprehensive market view.\n- **Daily Stock Alerts:** Suppliers stay ahead with daily updates on product availability, pinpointing stockouts and stock replenishment opportunities.\n- **Promotion Performance Analysis:** Advanced AI algorithms evaluate the impact of both online and offline promotions, including Retail Media campaigns, and measure their effect on incremental sales.\n- **Basket Analysis:** Suppliers unlock cross-selling opportunities, category affinities, bundling potential, and insights into new, repeat, and lapsed customers, while identifying missed sales opportunities.\n- **Automated Alerts:** Suppliers receive notifications for issues such as declining SKU sales or emerging growth opportunities.\n- **Sales Decomposition Reports:** Automated reports break down the key drivers of growth and decline in sales, including price, volume, and product mix, providing suppliers with deeper insights for more informed decision-making.\n- **Shopping Mission Analytics:** Suppliers gain a deeper understanding of consumer behavior to refine product offerings and enhance the overall shopping experience.\n- **Consumer Journey & eMerchandising Insights:** Suppliers analyze how customers interact online with products, from browsing to purchase, for a more tailored approach to digital engagement.\n- **AI-Powered Recommendations:** Insights and data are also delivered through an intuitive, AI-powered interface that simplifies access and decision-making.\n\nThe collaboration kicks off with the launch of the Data Collaboration Platform, offering insights from Dr. Max’s e-commerce operations. Over time, this will expand to include data from Dr. Max’s physical pharmacy network across its six core markets.\n\nThis partnership marks a significant milestone for both Convert Group and Dr. Max, paving the way for unprecedented collaboration and innovation in the retail pharmacy sector.",
  },
  {
    date: "2023-12-21",
    title: "apo.com Group and Convert Group Join Forces, Revolutionizing the Landscape of Retail-brand Collaboration",
    summary: "apo.com Group, the third-largest online pharmacy group in Germany, joins forces with Convert Group to enhance retailer-brand collaboration across all its countries of operation.",
    slug: "apocom-group-and-convert-group-join-forces-revolutionizing-the-landscape-of-retail-brand-collaboration",
    image: "/__l5e/assets-v1/e0428018-5493-4ca1-b6e9-855fa05aabdf/apo-com-0.jpg",
    body: "**apo.com Group**, the third-largest online pharmacy group in the German market, is joining forces with Convert Group to enhance **retailer-brand collaboration** across Germany and all countries of operation. Convert Group will support apo.com Group’s growth journey with **eRetail Audit Marketplace** – the SaaS platform of the company – by onboarding brands onto an exciting growth path, **transforming raw data into actionable eCommerce insights**.\n\nConvert Group’s all-in-one intuitive platform will provide both apo.com Group and their suppliers with valuable insights into **sales, category performance, basket share, buy rate,** and the **intention to purchase**. All the data from nine operating online pharmacies will be available to **300 manufacturers** of more than **1,500 brands** collaborating with apo.com Group across Germany, Austria, and Poland. Brands will potentially gain transparency for more than **50,000 non-prescription (OTC) products**.\n\nBrands will now have the opportunity to access daily insights for apo.com Group and stay on top of their key performance indicators by answering critical business questions like:\n\n- Are we on track to meet or exceed the **JBQ plan** this year?\n- Which are the top and worst performing products driving **category** change?\n- What’s the **incremental revenue** from marketing activations?\n- Which **consumer journey** leads to more visibility for my brand?\n- Are there any missed opportunities for **cross-sells**?\n\n**Dr. Oliver Scheel**, **CEO** of **apo.com Group** comments on the partnership: _“We are very honored regarding our collaboration with Convert Group. This strategic partnership facilitates closer cooperation with our esteemed brand partners, reinforcing our mission to drive innovation and create positive change in the industry.”_\n\n**Panayotis Gezerlis**, **President** of **Convert Group**, added: _“We’re really excited about teaming up with apo.com Group, a major retailer in Germany. We’re happy to help them work closely with their suppliers and make the most of data collaboration. This partnership holds **great promise**, and we’re looking forward to achieving success together.”_\n\n**About apo.com Group**\n\nThe apo.com Group is a pan-European health tech group of companies based near Leipzig, Germany. It operates the online pharmacy store apodiscounter.de and the healthcare platform apo.com with two highly automated pharmaceutical logistics centers. To support people in their health management, the apo.com Group relies on AI-supported logistics technology, digital services and individual pharmaceutical advice. More than 75,000 products are available in a total of nine domains, including 25,000 prescription and 50,000 non-prescription items. The apo.com Group’s long-standing partners include a network of over 300 manufacturers in Europe.",
  },
  {
    date: "2023-11-13",
    title: "Atida Partners with Convert Group to Disrupt Data Collaboration with Suppliers through Real-time Insights",
    summary: "Atida, one of the largest pan-European online pharmacies, partners with Convert Group across all countries of operation to give brands access to unique eCommerce insights.",
    slug: "atida-partners-with-convert-group-to-disrupt-data-collaboration-with-suppliers-through-real-time-insights",
    image: "/__l5e/assets-v1/e08c0dc0-1bd8-47a9-8652-ea0e3472a33a/atida-0.jpg",
    body: "[**Atida**](https://about.atida.com/), one of the largest pan-European online pharmacies, partners with [**Convert Group**](https://convertgroup.com/)  across all countries of operation to enable Brands access unique eCommerce insights.\n\nConvert Group will support Atida’s growth journey through the deployment of eRetail Audit Marketplace – the SaaS platform of the company – that enables **data monetisation and retailer-brand collaboration.**\n\nThrough Convert Group’s all-in-one intuitive platform, insights such as sales, category performance, basket share, buy rate and intention to purchase will be available for both Atida and their suppliers, optimizing sales efforts and marketing campaigns.\n\nMore than **140 brands** across Spain, Italy, France, and Germany have already adopted the new collaboration model by investing in a more data driven strategy that’s now an integral way of working with Atida’s teams.\n\n![AtidaxConvertGroup 1 Atida Partners with Convert Group to Disrupt Data Collaboration with Suppliers through Real-time Insights](/__l5e/assets-v1/0b3499bf-564c-4479-b1b9-61c9416327ad/atida-1.png)\n\nFor Brands, Convert Group’s powerful platform holds several benefits including:\n\n- **Improving their understanding of the shopper**, strengthening their marketing strategy and campaign effectiveness\n- **Identifying levels of short & long-term sales growth** through product and category performance metrics\n- **Planning and measuring** the impact of **retail media**\n- **Giving actionable insights** allowing brands to turn to a more action-driven data collaboration\n\n**Hugues Pitre**, CEO of Southern Europe at **Atida**, commented, “We take pride in this innovative collaboration with Convert Group as we move closer to our mission of revolutionizing health and well-being across Europe. This cross-market partnership allows us to work more closely with our brand partners.”\n\n**Andreas Petropoulos**, CEO of **Convert Group**, added, “We are truly honored that Atida, one of the largest pan-European online health and well-being groups, has chosen our innovative eRetail Suite platform. We are extremely enthusiastic about supporting them in strengthening their supplier relationships.”\n\n**About Atida**\n\nAtida is **one of the largest groups of pharmacies online leading the way in transforming the digital health landscape across Europe.** With over 16 years of experience in the market, the company is continuously expanding and bringing pharmacist expertise online with a personal and trustworthy customer experience **. Atida is active in 9 countries and has more than 5 million active customers who have placed more than 19+ million orders**. Besides historical presence in Germany, the company is now operating in Spain and Portugal with [Atida \\| Mifarma](https://www.mifarma.es/) and [Dosfarma](https://www.dosfarma.com/), in France with [Atida \\| Santediscount](https://www.santediscount.com/) and finally in Italy with [Atida \\| efarma](https://www.efarma.com/). For more information visit: [about.atida.com](https://about.atida.com/)",
  },
  {
    date: "2023-07-05",
    title: "Skroutz and Convert Group Join Forces to Empower Brands with Unparalleled Sales Data Insights",
    summary: "Skroutz, the premier marketplace in Greece, and Convert Group introduce Skroutz Market Intelligence, giving brands and distributors access to Skroutz’s sales data.",
    slug: "skroutz-and-convert-group-join-forces-to-empower-brands-with-unparalleled-sales-data-insights",
    image: "/__l5e/assets-v1/132c81de-27a7-4594-9039-e1cb75f60356/skroutz-0.jpg",
    body: "[Skroutz](https://www.skroutz.gr/), the premier marketplace in Greece, and **Convert Group** have joined forces to introduce a groundbreaking service: **Skroutz Market Intelligence**. This collaboration aims to provide brands and distributors with unparalleled access to Skroutz’s sales data. Leveraging Convert Group’s cutting-edge platform, eRetail Audit Marketplace, Skroutz offers brands that manufacture and distribute products exclusive access to valuable sales data.\n\nThrough this transformative partnership, Skroutz’s ecosystem of **33,000 brands** can now benefit from daily, real-time data insights through a commercial agreement. These insights encompass a wide range of information, including sales data (SKUs, orders, average value, average price), basket intelligence data, competition category market shares, consumer search terms by SKU and category, shopper navigation data, and marketing performance data, such as Skroutz Ads- all in strict compliance with GDPR regulations.\n\nWith Skroutz’s sales data accounting for up to 65% of the country’s online sales in some categories, brands gain a significant strategic advantage. The newly introduced service provides them with a comprehensive understanding of the entire market landscape, equipping them with invaluable market insights. The data resolution, ranging from the past two years to just two days ago, enables brands to swiftly identify emerging trends, discern patterns, evaluate and redirect advertising campaigns, and make data-driven decisions with unwavering confidence.\n\nNumerous industry-leading brands have already embraced the Skroutz Market Intelligence service, positioning themselves as pioneers in the eCommerce market. Among these forward-thinking companies are **ALTEX (Funky Buddha), BIAN, BIC, Frezyderm, Kärcher, Mattel,** and **2XM Hellas**.\n\nMs. **Yota Tzavara**, **Head of Partner Success** at Skroutz, stated: “Since Skroutz’s foundation, our mission has been clear: to generate value within the Retail ecosystem by utilizing technology and equipping our partner stores and brands with the appropriate tools. Today, with the launch of Skroutz Market Intelligence, we provide an unparalleled opportunity for sales development through the data we offer. Our collaboration with Convert Group opens up new horizons in this direction. For the first time, our partners can gain a comprehensive understanding of consumer purchasing needs and behaviours in an exceptionally user-friendly manner. By utilizing tools that enable informed decision-making and optimize their online presence, businesses can enhance profitability without relying on speculation or incomplete data.”\n\nMr. **Andreas Petropoulos**, **CEO** of Convert Group, stated: “By enabling Skroutz’s data democratization through Convert Group’s interactive eRetail Audit Marketplace platform, our goal is to enhance support for the retail ecosystem in Greece. This will help foster and strengthen trusted relationships with thousands of brands. Our platform, eRetail Audit Marketplace, utilizes Artificial Intelligence to process, enrich, and transform raw data into actionable insights, that cater to the needs of Greek and international consumers on Skroutz.”",
  },
];

/** The customer story the homepage features: the Dr. Max partnership announcement. */
export const FEATURED_STORY_SLUG =
  "convert-group-empowers-dr-max-with-europes-largest-insights-collaboration-program-in-retail-pharmacy";

export const FEATURED_STORY = NEWS.find((n) => n.slug === FEATURED_STORY_SLUG)!;




export const formatNewsDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
