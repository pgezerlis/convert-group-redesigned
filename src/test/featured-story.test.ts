import { describe, expect, it } from "vitest";

import { FEATURED_STORY, NEWS } from "@/lib/content";

// Pan asked the homepage "Success in practice" slot to carry the Dr. Max announcement,
// so it must stay that article and stay reachable from the news archive.
describe("Homepage featured story", () => {
  it("features the Dr. Max partnership announcement", () => {
    expect(FEATURED_STORY.slug).toBe(
      "convert-group-empowers-dr-max-with-europes-largest-insights-collaboration-program-in-retail-pharmacy",
    );
    expect(FEATURED_STORY.title).toContain("Dr. Max");
    expect(FEATURED_STORY.date).toBe("2025-01-10");
  });

  it("is one of the published news articles", () => {
    expect(NEWS.map((n) => n.slug)).toContain(FEATURED_STORY.slug);
  });
});
