import { describe, expect, it } from "vitest";
import { SOLUTIONS } from "@/lib/content";

const clientsFor = (slug: string) => SOLUTIONS.find((s) => s.slug === slug)?.clients ?? [];

describe("approved marks per audience", () => {
  it("shows Skroutz on the marketplaces page", () => {
    expect(clientsFor("marketplaces")).toEqual(["skroutz"]);
  });

  it("shows efood on the delivery apps page", () => {
    expect(clientsFor("delivery-apps")).toEqual(["efood"]);
  });

  it("shows the approved marks except the sports brands on the retailers page", () => {
    expect(clientsFor("retailers")).toEqual(["dr-max", "atida", "apo-com", "plus", "naivas"]);
  });

  it("hides the proof strip where only one client has approved a mark", () => {
    expect(clientsFor("marketplaces").length).toBe(1);
    expect(clientsFor("delivery-apps").length).toBe(1);
    expect(clientsFor("retailers").length).toBeGreaterThan(1);
  });
});
