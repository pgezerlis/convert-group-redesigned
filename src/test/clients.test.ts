import { describe, expect, it } from "vitest";

import { CLIENTS } from "@/lib/content";

// The strip must show exactly the customers Pan approved, and each must carry the
// slug its official mark file is named after (src/assets/logos/<slug>.asset.json).
describe("Trusted-by client list", () => {
  it("lists the approved customers in order", () => {
    expect(CLIENTS.map((c) => c.name)).toEqual(["Dr. Max", "Atida", "PLUS", "Naivas", "Skroutz"]);
  });

  it("gives every customer a unique mark slug", () => {
    const slugs = CLIENTS.map((c) => c.slug);
    expect(slugs).toEqual(["dr-max", "atida", "plus", "naivas", "skroutz"]);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("covers every country Dr. Max operates in", () => {
    const drMax = CLIENTS.find((c) => c.name === "Dr. Max");
    expect(drMax?.countries.map((k) => k.code)).toEqual(["cz", "ro", "it", "sk", "rs", "pl"]);
  });

  it("has an official mark file for every approved customer", () => {
    const marks = import.meta.glob("/src/assets/logos/*.asset.json");
    for (const c of CLIENTS) {
      expect(marks[`/src/assets/logos/${c.slug}.asset.json`], `${c.name} mark`).toBeTruthy();
    }
  });
});
