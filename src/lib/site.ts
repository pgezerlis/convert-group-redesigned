// Shared navigation and CTA configuration — the single place to change labels or destinations.

export type NavLeaf = { label: string; to: string };
export type NavGroup = { label: string; children: NavLeaf[] };
export type NavItem = NavLeaf | NavGroup;

export const PRIMARY_CTA: NavLeaf = { label: "Talk to Sales", to: "/contact" };

export const NAV: NavItem[] = [
  { label: "How we do it", to: "/how-we-do-it" },
  {
    label: "Solutions",
    children: [
      { label: "Retailers", to: "/solutions/retailers" },
      { label: "Marketplaces", to: "/solutions/marketplaces" },
      { label: "Delivery Apps", to: "/solutions/delivery-apps" },
    ],
  },
  { label: "Success Stories", to: "/success-stories" },
  {
    label: "Company",
    children: [
      { label: "About Us", to: "/company/about-us" },
      { label: "News", to: "/company/news" },
      { label: "Careers", to: "/company/careers" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
];

export const isGroup = (i: NavItem): i is NavGroup => "children" in i;

export const POSITIONING =
  "Convert helps retailers, marketplaces and delivery apps make data monetisation a core internal capability.";
