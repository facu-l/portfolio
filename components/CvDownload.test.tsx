import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CvDownload } from "./CvDownload";
import { CV_FILES } from "@/content/site";

/**
 * ══════════════════════════════════════════════════════════════════════════
 * QUE PUEDEN Y QUE NO PUEDEN PROBAR ESTOS TESTS
 *
 * jsdom 29 parsea el atributo `popover` pero NO implementa la API: no existen
 * showPopover(), hidePopover() ni la propiedad .popover. O sea que acá es
 * imposible abrir la popover y verificar su comportamiento real.
 *
 * Es el costo de haber elegido la API nativa del browser en vez de un modal
 * hecho en React: el modal en React sería testeable entero en jsdom, pero
 * costaría estado, focus trap, listener de Escape, listener de click afuera y
 * JavaScript enviado al visitante.
 *
 * Entonces el reparto es:
 *   ACA (unitario)  -> el CABLEADO: que los atributos apunten a donde deben,
 *                      que los href sean correctos, que los links descarguen.
 *   PLAYWRIGHT (E2E) -> el COMPORTAMIENTO: que abra al clickear, que Escape
 *                      cierre, que un click afuera cierre, que baje el PDF.
 *
 * Las consultas usan `hidden: true` porque el contenido de una popover cerrada
 * está fuera del árbol de accesibilidad. Eso no es un bug: es exactamente lo
 * que tiene que pasar, y sin ese flag RTL no lo encuentra (con razón).
 * ══════════════════════════════════════════════════════════════════════════
 */
describe("CvDownload — cableado", () => {
  it("el botón apunta a una popover que existe en el DOM", () => {
    const { container } = render(<CvDownload />);
    const boton = screen.getByRole("button", { name: /download cv/i });
    const target = boton.getAttribute("popovertarget");

    expect(target).toBeTruthy();
    // Un popovertarget que apunta a un id inexistente no da error ni warning:
    // simplemente no abre nada. Por eso se verifica que el id exista.
    expect(container.querySelector(`#${target}`)).toBeInTheDocument();
  });

  it("la popover es de tipo auto, que es lo que da Escape y click-afuera", () => {
    const { container } = render(<CvDownload />);
    const popover = container.querySelector("[popover]");
    // Con popover="manual" habría que cerrarla a mano y perderíamos las dos
    // salidas gratis que da el browser.
    expect(popover).toHaveAttribute("popover", "auto");
  });

  it("ofrece un link por cada idioma, con href y hreflang correctos", () => {
    render(<CvDownload />);
    for (const cv of CV_FILES) {
      const link = screen.getByRole("link", {
        name: new RegExp(cv.label, "i"),
        hidden: true,
      });
      expect(link).toHaveAttribute("href", cv.href);
      expect(link).toHaveAttribute("hreflang", cv.lang);
    }
  });

  /**
   * Sin el atributo `download` el browser abre el PDF en su visor en vez de
   * bajarlo. El botón dice DOWNLOAD: tiene que descargar.
   */
  it("los links descargan en vez de abrir el visor de PDF", () => {
    render(<CvDownload />);
    for (const cv of CV_FILES) {
      const link = screen.getByRole("link", {
        name: new RegExp(cv.label, "i"),
        hidden: true,
      });
      expect(link).toHaveAttribute("download");
    }
  });

  it("tiene una salida visible además de Escape y del click afuera", () => {
    render(<CvDownload />);
    const cancelar = screen.getByRole("button", {
      name: /cancel/i,
      hidden: true,
    });
    // Escape y el click afuera son salidas invisibles: quien no las conoce
    // necesita ver una.
    expect(cancelar).toHaveAttribute("popovertargetaction", "hide");
  });

  it("la popover tiene nombre accesible", () => {
    const { container } = render(<CvDownload />);
    const popover = container.querySelector("[popover]");
    const labelledBy = popover?.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();
    expect(container.querySelector(`#${labelledBy}`)?.textContent).toMatch(
      /language/i
    );
  });
});
