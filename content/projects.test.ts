import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { PROJECTS, FEATURED_PROJECT, OTHER_PROJECTS } from "./projects";

describe("PROJECTS (datos)", () => {
  it("los slugs son únicos", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("el featured es el primero y el resto va en OTHER_PROJECTS", () => {
    expect(FEATURED_PROJECT).toBe(PROJECTS[0]);
    expect(OTHER_PROJECTS).toHaveLength(PROJECTS.length - 1);
  });

  it("el featured tiene case study: es lo que justifica destacarlo", () => {
    expect(FEATURED_PROJECT.caseStudy).toBeDefined();
    expect(FEATURED_PROJECT.caseStudy!.slug).toBe(FEATURED_PROJECT.slug);
  });

  /**
   * Este es el test que más valor tiene del archivo. Los links de proyecto son
   * lo único del portfolio que puede estar roto sin que se note: el sitio
   * compila, se ve bien, y el visitante cae en un 404. Si un href existe, tiene
   * que ser una URL real; si todavía no la hay, el campo va `undefined` y el
   * componente no renderiza el botón.
   */
  it("no hay URLs placeholder ni de ejemplo", () => {
    const sospechosas = /example\.com|localhost|tu-usuario|TODO|#$|^$/i;

    for (const p of PROJECTS) {
      for (const [campo, url] of [
        ["repoUrl", p.repoUrl],
        ["liveUrl", p.liveUrl],
      ] as const) {
        if (url === undefined) continue;
        expect(url, `${p.slug}.${campo}`).not.toMatch(sospechosas);
        expect(() => new URL(url), `${p.slug}.${campo}`).not.toThrow();
        expect(url, `${p.slug}.${campo}`).toMatch(/^https:\/\//);
      }
    }
  });

  /**
   * next/image necesita width y height reales para reservar el espacio antes de
   * que la imagen cargue. Si no coinciden con el archivo, la página salta al
   * cargar (layout shift) y eso penaliza Core Web Vitals.
   */
  it("las capturas apuntan a archivos que existen en public/", () => {
    const publicDir = join(process.cwd(), "public");
    const capturas = PROJECTS.flatMap((p) => [
      ...(p.screenshot ? [p.screenshot] : []),
      ...(p.caseStudy?.gallery ?? []),
    ]);

    expect(capturas.length).toBeGreaterThan(0);

    for (const shot of capturas) {
      expect(existsSync(join(publicDir, shot.src)), shot.src).toBe(true);
      expect(shot.width, shot.src).toBeGreaterThan(0);
      expect(shot.height, shot.src).toBeGreaterThan(0);
      expect(shot.alt.length, `alt de ${shot.src}`).toBeGreaterThan(20);
    }
  });

  /**
   * Decisión de privacidad del design review: `cef-perfil-socio.png` muestra
   * una ficha médica de un socio. El archivo sigue en public/ pero no se
   * publica en ninguna sección del sitio.
   */
  it("no se publica la captura con la ficha médica del socio", () => {
    const todas = JSON.stringify(PROJECTS);
    expect(todas).not.toContain("cef-perfil-socio");
  });

  /**
   * Protege la decisión de honestidad: el backend en Rust del gimnasio lo hizo
   * un compañero. Si el proyecto es de equipo y lista contribuciones propias,
   * esas contribuciones no pueden reclamar el backend.
   */
  it("las contribuciones propias del gym no reclaman el backend", () => {
    const gym = PROJECTS.find((p) => p.slug === "gym-management-system")!;
    expect(gym.contributions).toBeDefined();
    expect(gym.contributions!.join(" ")).not.toMatch(/rust|backend/i);
    expect(gym.caseStudy!.myRole).toMatch(/teammate/i);
  });
});
