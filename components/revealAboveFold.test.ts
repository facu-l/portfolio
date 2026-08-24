import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { REVEAL_ABOVE_FOLD_SCRIPT } from "./revealAboveFold";

const ATRIBUTO = "data-reveal-instant";

/**
 * El script se sirve como texto, no se importa: no hay función que llamar. Para
 * testearlo hay que ejecutarlo, y `new Function` es la forma honesta de hacerlo
 * — corre el MISMO string que va a terminar en el HTML, no una copia en
 * TypeScript que podría desincronizarse del original sin que nadie se entere.
 */
const ejecutar = () => new Function(REVEAL_ABOVE_FOLD_SCRIPT)();

/**
 * jsdom no hace layout: getBoundingClientRect() siempre devuelve ceros, así que
 * TODO daría "está a la vista" y el test pasaría por el motivo equivocado. Acá
 * la posición se declara a mano, que además es lo que se quiere probar.
 */
function bloque(top: number) {
  const el = document.createElement("div");
  el.setAttribute("data-reveal", "");
  el.getBoundingClientRect = () => ({ top }) as DOMRect;
  document.body.appendChild(el);
  return el;
}

describe("revealAboveFold", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    window.innerHeight = 900;
  });

  /**
   * EL TEST QUE EXPLICA POR QUE ESTE ARCHIVO EXISTE (design review, 003).
   *
   * Medido en producción con un viewport de 1080px de alto: el primer bloque
   * arranca en y=806, o sea que entran 274px de la sección About en el primer
   * pantallazo. El CSS lo deja en `opacity: 0` desde el pintado y solo
   * JavaScript lo puede revelar, así que ese pedazo se ve en blanco hasta que
   * React hidrata. Esto es lo que lo evita.
   */
  it("marca los bloques que ya estaban a la vista al cargar", () => {
    const visible = bloque(806);

    ejecutar();

    expect(visible.hasAttribute("data-reveal-instant")).toBe(true);
  });

  /**
   * LA OTRA MITAD, Y LA QUE SE ROMPE EN SILENCIO. Si el script marcara todo,
   * nadie lo notaría mirando la página: simplemente el efecto de aparición al
   * scroll dejaría de existir en las cinco secciones y el sitio se vería
   * "normal". Este test es el único lugar donde esa pérdida se hace visible.
   */
  it("no toca los bloques que quedaron abajo del pliegue", () => {
    const abajo = bloque(1780);

    ejecutar();

    expect(abajo.hasAttribute("data-reveal-instant")).toBe(false);
  });

  /**
   * El límite exacto: un bloque que arranca justo en el borde inferior todavía
   * no se ve. Sin este caso, un `<=` en vez de un `<` pasaría desapercibido.
   */
  it("un bloque que arranca justo en el borde no cuenta como visible", () => {
    const borde = bloque(900);

    ejecutar();

    expect(borde.hasAttribute("data-reveal-instant")).toBe(false);
  });

  /**
   * Es el primer JavaScript de la página y corre antes que React: si tira una
   * excepción se lleva puesta la hidratación entera por un detalle decorativo.
   * El try/catch no es defensivo por las dudas, es la diferencia entre "el
   * bloque se anima como antes" y "la página no arranca".
   */
  it("no revienta si medir un bloque falla", () => {
    const roto = bloque(0);
    roto.getBoundingClientRect = () => {
      throw new Error("layout no disponible");
    };

    expect(() => ejecutar()).not.toThrow();
  });

  /**
   * EL CONTRATO ENTRE LOS TRES ARCHIVOS QUE NOMBRAN ESTE ATRIBUTO.
   *
   * El arreglo son tres piezas separadas: el script lo escribe, el CSS lo lee
   * para dejar el bloque visible y sin transición, y Reveal.tsx lo consulta
   * para no observar de más. No hay tipos que las aten — es un string suelto en
   * tres lenguajes distintos.
   *
   * Si alguien renombra el atributo en uno solo, no explota nada: el script
   * marca algo que el CSS ya no mira, y el parpadeo vuelve exactamente como
   * estaba. Nadie lo ve hasta que abre la página en un monitor alto. Este test
   * es lo único que puede avisar, y por eso lee los archivos de verdad en vez
   * de repetir el valor.
   *
   * Es el mismo patrón que content/brand.test.ts usa para los colores de la
   * card de Open Graph, que tampoco pueden compartir constante con el CSS.
   */
  it("el script, el CSS y Reveal nombran el mismo atributo", () => {
    expect(REVEAL_ABOVE_FOLD_SCRIPT).toContain(ATRIBUTO);

    const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");
    expect(css).toContain(`[data-reveal][${ATRIBUTO}]`);
    // Sin `transition: none` el bloque igual entraría con el fade de 400ms,
    // que es justo el retraso que se está sacando.
    expect(css.slice(css.indexOf(`[data-reveal][${ATRIBUTO}]`))).toMatch(
      /^\[data-reveal\]\[data-reveal-instant\]\s*\{[^}]*transition:\s*none/
    );

    const reveal = readFileSync(
      join(process.cwd(), "components", "Reveal.tsx"),
      "utf8"
    );
    expect(reveal).toContain(`hasAttribute("${ATRIBUTO}")`);
  });
});
