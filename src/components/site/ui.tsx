import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 text-base font-semibold transition-colors duration-150";

export const btn = {
  primary: cn(base, "bg-navy text-primary-foreground hover:bg-ink"),
  cyan: cn(base, "bg-cyan text-ink hover:bg-cyan-hover"),
  secondary: cn(base, "border border-navy text-navy hover:bg-pale"),
};

export function TalkToUs({ variant = "primary", className }: { variant?: "primary" | "cyan"; className?: string }) {
  return (
    <Link to="/contact" className={cn(btn[variant], className)}>
      Talk to us
    </Link>
  );
}

export function ArrowLink({ to, params, children, className }: { to: string; params?: Record<string, string>; children: ReactNode; className?: string }) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Link to={to as any} params={params as any} className={cn("text-link inline-flex items-center gap-1.5 font-medium", className)}>
      {children}
      <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
    </Link>
  );
}

export function SectionIntro({ eyebrow, title, children, className }: { eyebrow?: string; title: string; children?: ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-[44rem]", className)}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <div className="body-lg mt-5 text-muted-foreground">{children}</div>}
    </div>
  );
}

export function PageHero({ eyebrow, title, children, breadcrumb }: { eyebrow?: string; title: string; children?: ReactNode; breadcrumb?: { label: string; current: string } }) {
  return (
    <section className="border-b border-border">
      <div className="container-cg pb-12 pt-8 md:pt-10 lg:pb-20 lg:pt-16">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex gap-2">
              <li><Link to="/" className="text-link">Home</Link></li>
              <li aria-hidden>/</li>
              <li>{breadcrumb.label}</li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">{breadcrumb.current}</li>
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <h1 className="h1-interior max-w-[18ch]">{title}</h1>
        {children && <div className="lede mt-6 max-w-[48ch]">{children}</div>}
      </div>
    </section>
  );
}

/** Explicitly-labelled placeholder for content awaiting approval. */
export function Pending({ label, ratio = "aspect-[4/3]", className }: { label: string; ratio?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={cn("flex items-center justify-center rounded-lg border border-dashed border-control bg-surface p-6 text-center", ratio, className)}
    >
      <span className="data-label text-muted-foreground">
        Content pending
        <br />
        {label}
      </span>
    </div>
  );
}

export function ClosingCTA({ title = "Let’s talk about what your data could become.", body = "Tell us where you are today. We’ll explore the opportunity together and what it would take for your team to own it." }: { title?: string; body?: string }) {
  return (
    <section className="on-dark">
      <div className="container-cg flex flex-col gap-8 py-16 md:py-20 lg:flex-row lg:items-end lg:justify-between lg:py-24">
        <div className="max-w-[40rem]">
          <h2>{title}</h2>
          <p className="body-lg mt-5 opacity-85">{body}</p>
        </div>
        <TalkToUs variant="cyan" className="self-start lg:self-auto" />
      </div>
    </section>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-8 md:p-10">
      <h3 className="text-[1.375rem]">{title}</h3>
      {children && <div className="mt-3 max-w-[60ch] text-muted-foreground">{children}</div>}
    </div>
  );
}
