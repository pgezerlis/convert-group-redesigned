import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

const common = {
  viewBox: "0 0 32 32",
  fill: "none",
  "aria-hidden": true as const,
  focusable: false as const,
};

const stroke = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Service marks: brand ink structure (currentColor, so a navy section shows it in pale blue) with one cyan accent that opens up on hover. */
export function StrategyConsultingIcon({ className }: { className?: string | undefined }) {
  return (
    <svg {...common} className={cn("cg-svc text-navy", className)}>
      <circle cx="16" cy="16" r="10.5" {...stroke} />
      <circle cx="16" cy="16" r="5" {...stroke} />
      <circle cx="16" cy="16" r="2" fill="var(--cg-cyan)" className="cg-svc-accent" />
    </svg>
  );
}

export function DataReadinessIcon({ className }: { className?: string | undefined }) {
  return (
    <svg {...common} className={cn("cg-svc text-navy", className)}>
      <rect x="5" y="5.5" width="22" height="7" rx="2.5" {...stroke} />
      <rect x="5" y="19.5" width="22" height="7" rx="2.5" {...stroke} />
      <rect x="9" y="14" width="14" height="4" rx="2" fill="var(--cg-cyan)" className="cg-svc-accent" />
    </svg>
  );
}

export function TechnologyIcon({ className }: { className?: string | undefined }) {
  return (
    <svg {...common} className={cn("cg-svc text-navy", className)}>
      <circle cx="8" cy="8" r="3" {...stroke} />
      <circle cx="8" cy="24" r="3" {...stroke} />
      <path d="M10.6 9.8 20.4 14.8M10.6 22.2 20.4 17.2" {...stroke} />
      <circle cx="24" cy="16" r="3.5" fill="var(--cg-cyan)" className="cg-svc-accent" />
    </svg>
  );
}

export function CustomerSuccessIcon({ className }: { className?: string | undefined }) {
  return (
    <svg {...common} className={cn("cg-svc text-navy", className)}>
      <circle cx="9" cy="23" r="3" fill="var(--cg-cyan)" className="cg-svc-accent" />
      <path d="M15.5 23a6.5 6.5 0 0 0-6.5-6.5" {...stroke} />
      <path d="M22 23a13 13 0 0 0-13-13" {...stroke} />
    </svg>
  );
}

export function SellingSupportIcon({ className }: { className?: string | undefined }) {
  return (
    <svg {...common} className={cn("cg-svc text-navy", className)}>
      <path d="M4 25 11.5 17.5l4.5 4.5L26 9" {...stroke} />
      <path d="M20 9h6v6" {...stroke} />
      <circle cx="26" cy="9" r="2.2" fill="var(--cg-cyan)" className="cg-svc-accent" />
    </svg>
  );
}

const ICONS: Record<string, (props: { className?: string | undefined }) => ReactElement> = {
  "strategy-consulting": StrategyConsultingIcon,
  "data-readiness-maintenance": DataReadinessIcon,
  technology: TechnologyIcon,
  "customer-success": CustomerSuccessIcon,
  "selling-support": SellingSupportIcon,
};

export const SERVICE_ICON_IDS = Object.keys(ICONS);

export function ServiceIcon({ id, className }: { id: string; className?: string }) {
  const Icon = ICONS[id];
  if (!Icon) return null;
  return <Icon className={className} />;
}
