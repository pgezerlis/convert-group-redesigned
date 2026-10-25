import type { ReactElement } from "react";

const common = {
  viewBox: "0 0 32 32",
  fill: "none",
  "aria-hidden": true as const,
  focusable: false as const,
};

export function SupplierBrandsIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <rect x="5" y="16" width="6" height="11" rx="1.5" fill="var(--cg-navy)" className="cg-ico-bar cg-ico-bar-1" />
      <rect x="13" y="10" width="6" height="17" rx="1.5" fill="var(--cg-navy)" className="cg-ico-bar cg-ico-bar-2" />
      <rect x="21" y="5" width="6" height="22" rx="1.5" fill="var(--cg-cyan)" className="cg-ico-bar cg-ico-bar-3" />
    </svg>
  );
}

export function MarketplaceSellersIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <circle cx="13.5" cy="13.5" r="8" stroke="var(--cg-navy)" strokeWidth="2" />
      <path d="M19.3 19.3 27 27" stroke="var(--cg-navy)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10.5" cy="13.5" r="1.6" fill="var(--cg-cyan)" className="cg-ico-dot cg-ico-dot-1" />
      <circle cx="14.5" cy="11.5" r="1.6" fill="var(--cg-cyan)" className="cg-ico-dot cg-ico-dot-2" />
      <circle cx="16" cy="15.5" r="1.6" fill="var(--cg-cyan)" className="cg-ico-dot cg-ico-dot-3" />
    </svg>
  );
}

export function DeliveryPartnersIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <ellipse cx="16" cy="28" rx="6" ry="1.8" fill="var(--cg-cyan)" className="cg-ico-halo" />
      <path
        d="M16 4c-4.6 0-8.2 3.7-8.2 8.2 0 6 8.2 15.2 8.2 15.2s8.2-9.2 8.2-15.2C24.2 7.7 20.6 4 16 4Z"
        stroke="var(--cg-navy)"
        strokeWidth="2"
        strokeLinejoin="round"
        className="cg-ico-pin"
      />
      <circle cx="16" cy="12" r="3" fill="var(--cg-cyan)" className="cg-ico-pin-dot" />
    </svg>
  );
}

const ICONS: Record<string, (props: { className?: string }) => ReactElement> = {
  "Supplier brands": SupplierBrandsIcon,
  "Marketplace sellers": MarketplaceSellersIcon,
  "Delivery partners": DeliveryPartnersIcon,
};

export function InsightIcon({ who, className }: { who: string; className?: string }) {
  const Icon = ICONS[who];
  if (!Icon) return null;
  return <Icon className={className} />;
}
