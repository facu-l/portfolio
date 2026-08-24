import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { eyebrowClasses } from "./Eyebrow";
import { About } from "./About";
import { Projects } from "./Projects";
import { CurrentlyLearning } from "./CurrentlyLearning";
import { Skills } from "./Skills";

describe("Eyebrow", () => {
  /**
   * EL TEST QUE EXPLICA POR QUE ESTE COMPONENTE EXISTE.
   *
   * El glow se agregó al <h2> de Section y "Education", "More work" y "Next up"
   * quedaron sin él — no por una decisión, sino porque la receta tipográfica
   * estaba copiada en cinco archivos y nadie fue a los otros cuatro. Es el
   * modo de falla clásico del estilo duplicado: no rompe nada, solo queda a
   * medias, y se descubre mirando la página.
   *
   * Ahora las cuatro etiquetas salen del mismo componente. Este test recorre
   * las secciones reales y verifica que ninguna se quedó afuera.
   */
  it("todas las etiquetas de sección llevan glow", () => {
    render(
      <>
        <About />
        <Projects />
        <Skills />
        <CurrentlyLearning />
      </>
    );

    for (const texto of ["ABOUT", "Education", "More work", "SKILLS"]) {
      const el = screen.getByText(texto);
      expect(el.className).toMatch(/text-shadow-glow/);
    }
  });

  /**
   * La etiqueta interna tiene que verse MENOR que el título de sección. Con el
   * mismo glow, "Education" y "ABOUT" pesan igual y la sección deja de tener
   * adentro y afuera.
   */
  it("las etiquetas internas usan un glow más débil que el h2", () => {
    expect(eyebrowClasses("section")).toContain("text-shadow-glow");
    expect(eyebrowClasses("section")).not.toContain("text-shadow-glow-sm");

    for (const tone of ["sub"] as const) {
      expect(eyebrowClasses(tone)).toContain("text-shadow-glow-sm");
    }
  });

  /**
   * Un glow azul sobre texto gris se lee como un error de renderizado: el halo
   * termina más brillante que la letra que lo genera. Si alguien devuelve las
   * etiquetas a `text-muted` "para bajar el ruido", esto lo frena.
   */
  it("ninguna etiqueta con glow queda en gris", () => {
    for (const tone of ["section", "sub"] as const) {
      expect(eyebrowClasses(tone)).not.toContain("text-muted");
    }
  });
});
