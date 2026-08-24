import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Panel, panelClasses } from "./Panel";

describe("Panel", () => {
  /**
   * EL TEST QUE PROTEGE LA DECISION DE FONDO DEL COMPONENTE.
   *
   * El instinto de cualquiera que toque esto es "una card necesita un fondo" y
   * agregarle `bg-surface`. Se ve casi igual (1.17:1 contra el fondo de página)
   * y rompe algo que no se ve: el azul sobre `surface` cae a 3.97:1 y falla AA.
   * El link "View the API" de las certificaciones vive adentro de un panel.
   *
   * Es un cambio que pasa cualquier review visual y deja el sitio peor. Por eso
   * lo fija un test y no solo un comentario.
   */
  it("no tiene fondo propio: el borde y el glow hacen el recuadro", () => {
    for (const size of ["md", "sm"] as const) {
      expect(panelClasses(size)).not.toMatch(/\bbg-/);
      expect(panelClasses(size)).toContain("border");
      expect(panelClasses(size)).toMatch(/shadow-panel/);
    }
  });

  /**
   * `sm` tiene que verse MENOR que `md`, no distinto. Si alguien empareja el
   * padding o el glow, la jerarquía "bloque > ítem" desaparece y About vuelve a
   * leerse como tres cosas del mismo peso.
   */
  it("el tamaño sm es visualmente menor que md", () => {
    expect(panelClasses("md")).toContain("rounded-lg");
    expect(panelClasses("sm")).toContain("rounded-md");
    expect(panelClasses("sm")).toContain("shadow-panel-sm");
    expect(panelClasses("md")).not.toContain("shadow-panel-sm");
  });

  it("renderiza el elemento que se le pide, para poder ser un <li>", () => {
    render(
      <ul>
        <Panel as="li">contenido</Panel>
      </ul>
    );
    expect(screen.getByRole("listitem")).toHaveTextContent("contenido");
  });
});
