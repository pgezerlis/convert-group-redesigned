import { describe, expect, it } from "vitest";
import { SERVICE_ICON_IDS } from "@/components/site/ServiceIcons";
import { METHOD } from "@/lib/content";

describe("service marks", () => {
  it("gives each of the five current services its own mark", () => {
    expect(SERVICE_ICON_IDS).toEqual(
      ["strategy-consulting", "data-readiness-maintenance", "technology", "customer-success", "selling-support"],
    );
  });

  it("keeps the marks aligned with the services the site lists", () => {
    expect(SERVICE_ICON_IDS).toEqual(METHOD.map((service) => service.id));
  });
});
