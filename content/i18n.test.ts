import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { getContent } from "./index";
import { LOCALES } from "@/lib/locale";

/**
 * EL RIESGO DE UN SITIO BILINGÜE NO ES TRADUCIR MAL: ES QUE UN IDIOMA QUEDE
 * ATRAS. El tipo SiteContent obliga a que los dos tengan las mismas claves;
 * estos tests cubren lo que el tipo no ve: mismos casos en el mismo orden,
 * misma cantidad de decisiones, los mismos links y ningún texto vacío.
 */

const en = getContent("en");
const es = getContent("es");

/** Recorre un objeto y devuelve todos los strings con su ruta. */
function strings(value: unknown, path = ""): Array<[string, string]> {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => strings(v, path ? `${path}.${k}` : k));
  }
  return [];
}

/** Todos los href de un contenido, en orden. */
function hrefs(value: unknown): string[] {
  return strings(value)
    .filter(([path]) => path.endsWith(".href"))
    .map(([, v]) => v);
}

const AI_WORKFLOW_EN =
  "Built with an AI-assisted workflow: I made and documented the architecture decisions (more than 120 in the decision log), reviewed every change, and kept the business rules under test so that generated code couldn't silently break them.";

describe("bilingual content", () => {
  it("each locale knows which locale it is", () => {
    for (const locale of LOCALES) {
      expect(getContent(locale).locale).toBe(locale);
    }
  });

  it("both locales list the same case slugs in the same order", () => {
    const slugs = ["falber", "gym-management-system"];
    expect(en.cases.map((c) => c.slug)).toEqual(slugs);
    expect(es.cases.map((c) => c.slug)).toEqual(slugs);
  });

  it("each case has the same number of decisions and gallery images in both locales, at least 3 decisions", () => {
    en.cases.forEach((c, i) => {
      expect(c.decisions.length).toBeGreaterThanOrEqual(3);
      expect(es.cases[i].decisions.length).toBe(c.decisions.length);
      expect(es.cases[i].gallery.length).toBe(c.gallery.length);
      expect(c.gallery.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("evidence and link hrefs are identical across locales", () => {
    expect(hrefs(es)).toEqual(hrefs(en));
  });

  it("no string is empty", () => {
    for (const content of [en, es]) {
      for (const [path, value] of strings(content)) {
        expect(value.trim(), `${content.locale}.${path}`).not.toBe("");
      }
    }
  });

  it("no em-dash or en-dash anywhere", () => {
    for (const content of [en, es]) {
      for (const [path, value] of strings(content)) {
        expect(value, `${content.locale}.${path}`).not.toMatch(/[—–]/);
      }
    }
  });

  it("FALBER carries the fixed AI-workflow sentence in English", () => {
    expect(en.cases[0].aiWorkflow).toBe(AI_WORKFLOW_EN);
    expect(es.cases[0].aiWorkflow).toBeTruthy();
    expect(en.cases[1].aiWorkflow).toBeUndefined();
  });

  it("the bio no longer promises AI engineering", () => {
    expect(en.about.bio).not.toMatch(/AI engineering/i);
    expect(es.about.bio).not.toMatch(/AI engineering|ingenier[ií]a de IA/i);
  });

  it("the CEF case credits the Rust backend to a teammate", () => {
    expect(en.cases[1].role).toMatch(/teammate/);
    expect(es.cases[1].role).toMatch(/compañer/);
  });

  /*
    VERDAD DEL CONTENIDO (revisión final). Cada test fija una afirmación que la
    evidencia NO respalda, para que no vuelva:
  */
  it("the CEF QR decision describes what commit 8890f71 does: booking id instead of the member's DNI", () => {
    const [enQr, esQr] = [en.cases[1].decisions[1], es.cases[1].decisions[1]];
    expect(enQr.why).toMatch(/DNI/);
    expect(esQr.why).toMatch(/DNI/);
    // El vencimiento es un contador en pantalla: el backend no valida tiempo.
    expect(enQr.why).not.toMatch(/screenshot|reus/i);
    expect(esQr.why).not.toMatch(/captura|reutilice/i);
  });

  it("CEF decision 3 only claims what pull request 278 contains (no waiting list)", () => {
    expect(en.cases[1].decisions[2].why).not.toMatch(/waiting list/i);
    expect(es.cases[1].decisions[2].why).not.toMatch(/lista de espera/i);
  });

  it("CEF decision 1 does not overstate a two-line frontend change as a single source of truth", () => {
    expect(en.cases[1].decisions[0].why).not.toMatch(/single source of truth/i);
    expect(es.cases[1].decisions[0].why).not.toMatch(/una sola fuente de verdad/i);
  });

  it("the CEF team line does not claim every change went through a pull request", () => {
    expect(en.cases[1].team).not.toMatch(/Every change/i);
    expect(es.cases[1].team).not.toMatch(/Cada cambio/i);
  });

  it("no caption claims real-time behavior there is no evidence for", () => {
    for (const content of [en, es]) {
      for (const c of content.cases) {
        for (const shot of c.gallery) {
          expect(shot.caption ?? "").not.toMatch(/live availability|tiempo real/i);
        }
      }
    }
  });

  it("every gallery src exists in public/", () => {
    for (const c of en.cases) {
      for (const shot of c.gallery) {
        expect(existsSync(join(process.cwd(), "public", shot.src)), shot.src).toBe(true);
      }
    }
  });

  it("evidence links point to public GitHub code, never to placeholders", () => {
    for (const c of en.cases) {
      for (const d of c.decisions) {
        expect(d.evidence.href).toMatch(/^https:\/\/github\.com\/(facu-l|canizafa)\//);
      }
    }
  });
});
