import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { SITE, SOCIAL_LINKS, CV_FILES } from "./site";

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

describe("CV_FILES", () => {
  it("cada CV es una ruta absoluta del sitio a un PDF", () => {
    for (const cv of CV_FILES) {
      expect(cv.href.startsWith("/")).toBe(true);
      expect(cv.href.endsWith(".pdf")).toBe(true);
    }
  });

  it("los nombres de archivo no tienen espacios ni mayúsculas", () => {
    // En Vercel (Linux) las mayúsculas importan y los espacios obligan a
    // codificar %20. Un archivo llamado "CV Facundo.pdf" anda en Windows y da
    // 404 en producción.
    for (const cv of CV_FILES) {
      expect(cv.href).not.toMatch(/\s/);
      expect(cv.href).toBe(cv.href.toLowerCase());
    }
  });

  it("cada idioma tiene etiqueta y código distintos", () => {
    const langs = CV_FILES.map((c) => c.lang);
    expect(new Set(langs).size).toBe(langs.length);
    for (const cv of CV_FILES) {
      expect(cv.label.trim().length).toBeGreaterThan(0);
      expect(cv.lang).toMatch(/^[a-z]{2}$/);
    }
  });

  /**
   * EL TEST QUE EVITA UN 404 EN PRODUCCION.
   *
   * Los otros verifican la forma de la ruta; este verifica que el archivo
   * exista de verdad en public/. Si alguien renombra o borra un PDF, el botón
   * de descarga queda apuntando al vacío y nada más lo detecta: el sitio
   * compila, se ve bien, y el link no baja nada.
   */
  it("los PDFs existen realmente en public/", () => {
    for (const cv of CV_FILES) {
      const archivo = path.join(process.cwd(), "public", cv.href);
      expect(existsSync(archivo), `falta el archivo: public${cv.href}`).toBe(
        true
      );
    }
  });
});
