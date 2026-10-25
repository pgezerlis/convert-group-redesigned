import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { NAV, PRIMARY_CTA, isGroup, type NavGroup } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { btn } from "./ui";
import { Switch } from "@/components/ui/switch";
import { useSiteAppearance } from "./SiteAppearance";

const linkCls =
  "relative inline-flex min-h-11 items-center text-base font-medium text-navy hover:text-ink [&[aria-current=page]]:after:absolute [&[aria-current=page]]:after:inset-x-0 [&[aria-current=page]]:after:bottom-1.5 [&[aria-current=page]]:after:h-0.5 [&[aria-current=page]]:after:bg-navy";

function Disclosure({ group, open, onToggle, onClose }: { group: NavGroup; open: boolean; onToggle: () => void; onClose: () => void }) {
  const id = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const active = group.children.some((c) => path.startsWith(c.to));
  return (
    <div
      className="relative"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          onClose();
          btnRef.current?.focus();
        }
      }}
    >
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className={cn(linkCls, "gap-1", active && "after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:bg-navy")}
      >
        {group.label}
        <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-200", open && "rotate-180")} strokeWidth={1.75} />
      </button>
      <div
        id={id}
        hidden={!open}
        className="absolute left-[-16px] top-full mt-2 min-w-[260px] rounded-lg border border-border bg-popover p-2 shadow-[var(--shadow-popover)]"
      >
        <ul>
          {group.children.map((c) => (
            <li key={c.to}>
              <Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                to={c.to as any}
                onClick={onClose}
                className="flex min-h-11 items-center rounded-md px-3 text-base text-navy hover:bg-surface [&[aria-current=page]]:font-semibold [&[aria-current=page]]:underline"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const { navy, setNavy } = useSiteAppearance();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [path]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="border-b border-border">
        <label className="container-cg flex min-h-9 cursor-pointer items-center justify-end gap-3 py-1 text-xs text-muted-foreground">
          Navy background
          <Switch checked={navy} onCheckedChange={setNavy} aria-label="Navy background" />
        </label>
      </div>
      <div className="container-cg flex h-[var(--header-height)] items-center justify-between gap-3">
        <Logo inverse={navy} />
        <nav ref={navRef} aria-label="Main" className="hidden items-center lg:flex">
          <ul className="flex items-center gap-6">
            {NAV.map((item) => (
              <li key={item.label}>
                {isGroup(item) ? (
                  <Disclosure
                    group={item}
                    open={openGroup === item.label}
                    onToggle={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                    onClose={() => setOpenGroup(null)}
                  />
                ) : (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  <Link to={item.to as any} className={linkCls}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link to={PRIMARY_CTA.to} className={cn(btn.primary, "ml-8 min-h-11 px-5")}>
            {PRIMARY_CTA.label}
          </Link>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <Link to={PRIMARY_CTA.to} className={cn(btn.primary, "min-h-11 px-3.5 text-[0.9375rem] min-[360px]:px-4")}>
            {PRIMARY_CTA.label}
          </Link>
          <button
            ref={menuBtn}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex size-11 items-center justify-center rounded-md text-navy hover:bg-surface"
          >
            {mobileOpen ? <X aria-hidden className="size-6" strokeWidth={1.75} /> : <Menu aria-hidden className="size-6" strokeWidth={1.75} />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!mobileOpen}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setMobileOpen(false);
            menuBtn.current?.focus();
          }
        }}
        className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-border bg-background lg:hidden"
      >
        <ul className="container-cg py-4">
          {NAV.map((item) => (
            <li key={item.label} className="border-b border-border last:border-0">
              {isGroup(item) ? (
                <>
                  <button
                    type="button"
                    aria-expanded={mobileGroup === item.label}
                    aria-controls={`m-${item.label}`}
                    onClick={() => setMobileGroup((g) => (g === item.label ? null : item.label))}
                    className="flex min-h-14 w-full items-center justify-between text-lg font-medium text-navy"
                  >
                    {item.label}
                    <ChevronDown aria-hidden className={cn("size-5 transition-transform", mobileGroup === item.label && "rotate-180")} strokeWidth={1.75} />
                  </button>
                  <ul id={`m-${item.label}`} hidden={mobileGroup !== item.label} className="pb-3 pl-4">
                    {item.children.map((c) => (
                      <li key={c.to}>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        <Link to={c.to as any} className="flex min-h-11 items-center text-base text-navy [&[aria-current=page]]:underline">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <Link to={item.to as any} className="flex min-h-14 items-center text-lg font-medium text-navy [&[aria-current=page]]:underline">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
