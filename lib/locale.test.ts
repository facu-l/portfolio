import { describe, it, expect } from "vitest";
import { isLocale, negotiateLocale, switchLocalePath } from "./locale";

describe("negotiateLocale", () => {
  /*
    Lo que manda un navegador real. El caso que importa es el de alguien en
    Argentina con el navegador en español: tiene que caer en /es sin tocar nada.
  */
  it.each([
    ["es-AR,es;q=0.9,en;q=0.8", "es"],
    ["en-US,en;q=0.9", "en"],
    ["fr-FR", "en"],
    ["pt-BR, es;q=0.5", "es"],
    ["en;q=0.2, es;q=0.8", "es"],
    ["*", "en"],
    ["garbage;;q=", "en"],
    ["", "en"],
  ])("%s -> %s", (header, expected) => {
    expect(negotiateLocale(header)).toBe(expected);
  });

  it("falls back to English when the header is missing", () => {
    expect(negotiateLocale(null)).toBe("en");
  });
});

describe("switchLocalePath", () => {
  it("swaps the locale segment and keeps the rest of the path", () => {
    expect(switchLocalePath("/es/work/falber", "en")).toBe("/en/work/falber");
    expect(switchLocalePath("/en", "es")).toBe("/es");
  });

  it("prefixes paths that have no locale yet", () => {
    expect(switchLocalePath("/", "es")).toBe("/es");
    expect(switchLocalePath("/work/falber", "es")).toBe("/es/work/falber");
  });
});

describe("isLocale", () => {
  it("only accepts the exact lowercase codes", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(true);
    expect(isLocale("EN")).toBe(false);
    expect(isLocale("fr")).toBe(false);
  });
});
