import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { BRAND } from "./brand";

/**
 * ESTE TEST ES LA RAZON POR LA QUE brand.ts PUEDE EXISTIR.
 *
 * Duplicar los hexadecimales fuera de globals.css rompe la regla número uno de
 * DESIGN.md. La excepción se justifica porque Satori no entiende variables CSS
 * (ver brand.ts), pero una excepción sin control es simplemente deriva: alguien
 * ajusta el azul en globals.css, la imagen de Open Graph sigue con el viejo, y
 * nadie lo nota porque esa imagen no se mira nunca — se ve al pegar un link.
 *
 * Acá se lee el CSS de verdad y se compara token por token.
 */
describe("BRAND", () => {
  const css = readFileSync(
    join(process.cwd(), "app", "globals.css"),
    "utf8"
  );

  /** Extrae el valor de un token `--color-x: #hex;` del @theme. */
  function tokenDelCss(nombre: string): string | undefined {
    const match = css.match(
      new RegExp(`--color-${nombre}\\s*:\\s*(#[0-9a-fA-F]{3,8})\\s*;`)
    );
    return match?.[1].toLowerCase();
  }

  it("cada color coincide con su token en globals.css", () => {
    for (const [nombre, valor] of Object.entries(BRAND)) {
      const enCss = tokenDelCss(nombre);
      expect(enCss, `--color-${nombre} no existe en globals.css`).toBeDefined();
      expect(valor.toLowerCase(), `--color-${nombre}`).toBe(enCss);
    }
  });

  /**
   * Si alguien agrega un token de color nuevo a globals.css y la imagen de
   * Open Graph lo necesita, este test no lo puede saber. Lo que sí puede
   * garantizar es que todo lo que está en BRAND siga existiendo del otro lado,
   * que es la mitad que se rompe en silencio.
   */
  it("no quedan colores en BRAND que ya no existan en el CSS", () => {
    const huerfanos = Object.keys(BRAND).filter((n) => !tokenDelCss(n));
    expect(huerfanos).toEqual([]);
  });
});
