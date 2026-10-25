import { describe, expect, it } from "vitest";

import { CLIENTS } from "@/lib/content";

// The strip must show exactly the customers Pan approved, and each must carry the
// slug its official mark file is named after (src/assets/logos/<slug>.asset.json).
describe("Trusted-by client list", () => {
  it("lists the approved customers in order", () => {
    expect(CLIENTS.map((c) => c.name)).toEqual(["Dr. Max", "Atida", "PLUS", "Naivas", "Skroutz", "efood", "JD", "Intersport", "Foot Locker"]);
  });

  it("gives every customer a unique mark slug", () => {
    const slugs = CLIENTS.map((c) => c.slug);
    expect(slugs).toEqual(["dr-max", "atida", "plus", "naivas", "skroutz", "efood", "jd", "intersport", "foot-locker"]);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has an official mark file for every approved customer", () => {
    const marks = import.meta.glob("/src/assets/logos/*.asset.json");
    for (const c of CLIENTS) {
      expect(marks[`/src/assets/logos/${c.slug}.asset.json`], `${c.name} mark`).toBeTruthy();
    }
  });
});
