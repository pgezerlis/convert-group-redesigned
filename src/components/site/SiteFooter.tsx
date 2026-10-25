import { Link } from "@tanstack/react-router";
import { NAV, POSITIONING, isGroup } from "@/lib/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  const groups = [
    { label: "Explore", children: NAV.filter((i) => !isGroup(i)) as { label: string; to: string }[] },
    ...NAV.filter(isGroup),
  ];
  return (
    <footer className="on-dark border-t border-white/15">
      <div className="container-cg grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <Logo inverse />
          <p className="mt-6 max-w-[34ch] opacity-85">{POSITIONING}</p>
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
      <div className="container-cg flex flex-col gap-2 border-t border-white/15 py-6 text-sm opacity-80 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Convert Group</p>
        <p className="data-label">Preview · privacy, cookie, terms links and social profiles pending approval</p>
      </div>
    </footer>
  );
}
