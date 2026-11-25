import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import { SITE_URL } from "@/content/config";

describe("sitemap", () => {
  it("lists home and every case in both locales, each with hreflang alternates", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);

    for (const path of [
      "/en",
      "/es",
      "/en/work/falber",
      "/es/work/falber",
      "/en/work/gym-management-system",
      "/es/work/gym-management-system",
    ]) {
      expect(urls).toContain(`${SITE_URL}${path}`);
    }

    for (const entry of entries) {
      expect(entry.alternates?.languages?.en, entry.url).toBeDefined();
      expect(entry.alternates?.languages?.es, entry.url).toBeDefined();
    }
  });
});
