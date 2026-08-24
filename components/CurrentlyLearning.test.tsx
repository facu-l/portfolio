import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CurrentlyLearning } from "./CurrentlyLearning";
import { LEARNING_STATEMENT } from "@/content/learning";
import { CERTIFICATIONS } from "@/content/about";

describe("CurrentlyLearning", () => {
  it("es un landmark con nombre accesible", () => {
    render(<CurrentlyLearning />);
    expect(
      screen.getByRole("region", { name: /currently learning/i })
    ).toBeInTheDocument();
  });

  /**
   * NO ALCANZA CON QUE EL TEXTO ESTE EN LA PAGINA, y este test existe por un
   * bug real que la versión anterior dejaba pasar.
   *
   * El componente quedó un rato con el párrafo VACIO y el texto suelto al lado:
   *   <p className="text-lead text-muted"></p>
   *   {LEARNING_STATEMENT}
   *
   * Renderiza igual, el build pasa, y `getByText(...)` lo encontraba lo mismo
   * — porque el texto seguía estando, solo que como nodo suelto del <div> del
   * panel y sin una sola de sus clases. Se veía a 16px blanco a lo ancho del
   * panel en vez de 18px gris.
   *
   * Por eso ahora se verifica DONDE está el texto, no solo que esté.
   */
  it("el statement va dentro de un <p> con sus estilos, no suelto", () => {
    render(<CurrentlyLearning />);
    const parrafo = screen.getByText(LEARNING_STATEMENT);

    expect(parrafo.tagName).toBe("P");
    expect(parrafo.className).toContain("text-lead");
    expect(parrafo.className).toContain("text-muted");
  });

  it("el título de la sección es el único h2", () => {
    render(<CurrentlyLearning />);
    expect(
      screen.getByRole("heading", { level: 2, name: /currently learning/i })
    ).toBeInTheDocument();
  });

  /**
   * Esta sección habla del FUTURO y Education del PASADO. Si el statement
   * empieza a enumerar las certificaciones ya rendidas, las dos secciones dicen
   * lo mismo y la de futuro deja de aportar. Referenciarlas ("following up on")
   * está bien: repetir sus títulos no.
   *
   * El test compara contra el contenido real de About, así que sigue siendo
   * válido cuando agregues una certificación nueva.
   */
  it("no repite los títulos de las certificaciones de About", () => {
    for (const cert of CERTIFICATIONS) {
      expect(LEARNING_STATEMENT).not.toContain(cert.title);
    }
  });
});
