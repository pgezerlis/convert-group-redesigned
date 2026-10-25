import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT, LEGAL_LINKS, NAV, POSITIONING, SOCIAL_LINKS, isGroup } from "@/lib/site";
import { Logo } from "./Logo";

const socialIcons = { linkedin: Linkedin, instagram: Instagram, twitter: Twitter, youtube: Youtube };

export function SiteFooter() {
  const groups = [
    // The footer keeps its own curated list: the Home entry is header-only.
    { label: "Explore", children: NAV.filter((i) => !isGroup(i) && i.to !== "/") as { label: string; to: string }[] },
    ...NAV.filter(isGroup),
  ];
  return (
    <footer className="on-dark border-t border-primary-foreground/15">
      <div className="container-cg grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <Logo inverse />
          <p className="mt-6 max-w-[34ch] opacity-85">{POSITIONING}</p>
          <address className="mt-6 not-italic text-sm leading-relaxed">
            <a href={`mailto:${CONTACT.email}`} className="text-cyan hover:underline">
              {CONTACT.email}
            </a>
            <span className="mt-1 block max-w-[34ch] opacity-85">{CONTACT.address}</span>
          </address>
          <nav aria-label="Social media" className="mt-6 flex gap-2">
            {SOCIAL_LINKS.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <Button key={social.icon} asChild variant="ghost" size="icon" className="h-11 w-11 border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 hover:text-cyan">
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} title={social.label}>
                    <Icon aria-hidden="true" className="!size-5" />
                  </a>
                </Button>
              );
            })}
          </nav>
        </div>
        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
          {groups.map((g) => (
            <div key={g.label}>
              <h2 className="eyebrow !text-pale">{g.label}</h2>
              <ul className="mt-4 space-y-1">
                {g.children.map((c) => (
                  <li key={c.to + c.label}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <Link to={c.to as any} className="inline-flex min-h-11 items-center hover:text-cyan hover:underline">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="container-cg flex flex-col gap-2 border-t border-primary-foreground/15 py-6 text-sm opacity-80 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Convert Group</p>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
          {LEGAL_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="inline-flex min-h-11 items-center hover:text-cyan hover:underline">{link.label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
