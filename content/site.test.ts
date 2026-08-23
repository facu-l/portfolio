import { describe, it, expect } from "vitest";
import { SITE, SOCIAL_LINKS, CV_PATH } from "./site";

/**
 * Estos tests NO verifican que los links estén vivos: eso necesita red y sería
 * inestable. Verifican que tengan FORMA válida, que es lo que atrapa el error
 * real: un typo al escribir la URL.
 *
 * El chequeo de links muertos de verdad va en Playwright, contra el sitio
 * deployado.
 */
describe("SOCIAL_LINKS", () => {
  it("todas las URLs son absolutas y usan https", () => {
    for (const link of SOCIAL_LINKS) {
      expect(() => new URL(link.href)).not.toThrow();
      expect(new URL(link.href).protocol).toBe("https:");
    }
  });

  it("ninguna URL tiene espacios ni quedó a medio escribir", () => {
    for (const link of SOCIAL_LINKS) {
      expect(link.href).not.toMatch(/\s/);
      expect(link.href).not.toMatch(/(localhost|example\.com|TODO)/i);
    }
  });

  it("cada link tiene una etiqueta visible", () => {
    for (const link of SOCIAL_LINKS) {
      expect(link.label.trim().length).toBeGreaterThan(0);
    }
  });

  it("no hay hrefs duplicados", () => {
    const hrefs = SOCIAL_LINKS.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe("SITE", () => {
  it("tiene los datos que usan el Hero y el Footer", () => {
    expect(SITE.name).toBeTruthy();
    expect(SITE.role).toBeTruthy();
    expect(SITE.tagline).toBeTruthy();
  });
});

describe("CV_PATH", () => {
  it("es una ruta absoluta del sitio a un PDF", () => {
    expect(CV_PATH.startsWith("/")).toBe(true);
    expect(CV_PATH.endsWith(".pdf")).toBe(true);
  });
});
