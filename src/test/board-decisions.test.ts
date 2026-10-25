import { describe, expect, it } from "vitest";
import { DELIVERY_TERMS, METHOD, MONETISABLE_INSIGHTS, PRODUCT_DIRECTIONS, RETAIL_DATA_HISTORY } from "@/lib/content";

describe("Board-approved offer and terms", () => {
  it("covers all five current services", () => {
    expect(METHOD.map((service) => service.id)).toEqual([
      "strategy-consulting", "data-readiness-maintenance", "technology", "customer-success", "selling-support",
    ]);
  });
  it("uses a one-year contract term", () => {
    expect(DELIVERY_TERMS.contractMonths).toBe(12);
  });
  it("allows an internal platform copy subject to the written agreement", () => {
    expect(DELIVERY_TERMS.permitsInternalPlatformCopy).toBe(true);
  });
  it("records twelve years of retail data", () => {
    expect(RETAIL_DATA_HISTORY.years).toBe(12);
  });
  it("does not claim that history is training algorithms today", () => {
    expect(RETAIL_DATA_HISTORY.usedForAlgorithmTraining).toBe(false);
  });
  it.each(["ai-advice", "mcp", "internal-presentations", "forward-looking-advice"])("keeps %s as planned", (id) => {
    expect(PRODUCT_DIRECTIONS.find((direction) => direction.id === id)?.status).toBe("planned");
  });
  it("separates the proposed assistant from the five available insight areas", () => {
    expect(MONETISABLE_INSIGHTS.areas.find((area) => area.slug === "ai-assistant")?.status).toBe("planned");
    expect(MONETISABLE_INSIGHTS.areas.filter((area) => area.status === "available").map((area) => area.slug)).toEqual([
      "market-shares", "sales-growth-insights", "search-navigation", "customer-insights", "retail-media-strategy",
    ]);
  });
});