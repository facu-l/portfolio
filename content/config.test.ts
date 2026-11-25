import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { CV_FILES, PERSON, SOCIAL_LINKS } from "./config";
import { LOCALES } from "@/lib/locale";

describe("config", () => {
  it("social links are absolute https URLs with a label and no duplicates", () => {
    for (const link of SOCIAL_LINKS) {
      expect(link.href).toMatch(/^https:\/\/[^\s]+$/);
      expect(link.label.trim()).not.toBe("");
    }
    const hrefs = SOCIAL_LINKS.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("there is one CV per locale and every PDF really exists in public/", () => {
    for (const locale of LOCALES) {
      const href = CV_FILES[locale];
      expect(href).toMatch(/^\/[a-z0-9-]+\.pdf$/);
      expect(existsSync(join(process.cwd(), "public", href)), href).toBe(true);
    }
  });

  it("the public email is the professional one", () => {
    expect(PERSON.email).toBe("faculambertucci98@gmail.com");
  });
});
