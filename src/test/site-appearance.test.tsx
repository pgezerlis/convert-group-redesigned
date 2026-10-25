import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SiteAppearanceProvider, useSiteAppearance } from "@/components/site/SiteAppearance";

function Control({ page }: { page: string }) {
  const { navy, setNavy } = useSiteAppearance();
  return <button onClick={() => setNavy(!navy)} aria-pressed={navy}>{page}</button>;
}

afterEach(cleanup);

describe("Shared site appearance", () => {
  it("one choice remains active when routed page content changes, and switches back to light", () => {
    const view = render(<SiteAppearanceProvider><Control page="Homepage" /></SiteAppearanceProvider>);
    expect(document.documentElement.classList.contains("site-navy")).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: "Homepage" }));
    expect(document.documentElement.classList.contains("site-navy")).toBe(true);
    view.rerender(<SiteAppearanceProvider><Control page="Contact" /></SiteAppearanceProvider>);
    expect(screen.getByRole("button", { name: "Contact" })).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.classList.contains("site-navy")).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Contact" }));
    expect(document.documentElement.classList.contains("site-navy")).toBe(false);
  });
});