import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { eyebrowClasses } from "./Eyebrow";
import { About } from "./About";
import { Projects } from "./Projects";
import { Skills } from "./Skills";

describe("Eyebrow", () => {
  /**
   * EL TEST QUE EXPLICA POR QUE ESTE COMPONENTE EXISTE.
   *
   * La receta tipográfica estaba copiada en cinco archivos. Cuando se le agregó
   * un efecto al <h2> de Section, "Education", "More work" y "Next up" quedaron
   * sin él — no por una decisión, sino porque nadie fue a los otros cuatro
   * archivos. Es el modo de falla clásico del estilo duplicado: no rompe nada,
   * solo queda a medias, y se descubre mirando la página.
   *
   * Ahora todas salen del mismo componente. Este test recorre las secciones
   * reales y verifica que ninguna se quedó afuera.
   */
  it("todas las etiquetas salen del componente compartido", () => {
    render(
      <>
        <About />
        <Projects />
        <Skills />
      </>
    );

    for (const texto of ["ABOUT", "Education", "More work", "SKILLS"]) {
      const el = screen.getByText(texto);
      expect(el.className).toContain("uppercase");
      expect(el.className).toContain("font-semibold");
    }
  });

  /**
   * EL TITULO DE SECCION TIENE QUE VERSE MAS GRANDE QUE SUS ETIQUETAS INTERNAS.
   * Sin esta diferencia, "Education" y "ABOUT" pesan igual y la sección deja de
   * tener adentro y afuera.
   */
  it("el título de sección usa un tamaño mayor que las etiquetas internas", () => {
    expect(eyebrowClasses("section")).toContain("text-section"); // 22 -> 32px
    expect(eyebrowClasses("sub")).toContain("text-lead"); // 18px
    expect(eyebrowClasses("sub")).not.toContain("text-section");
  });

  /**
   * SE SACO EL GLOW AZUL (design review, hallazgo 001) y este test impide que
   * vuelva por descuido.
   *
   * El azul estaba en el rol del Hero, el CTA, el glow de la foto, los bordes de
   * panel, los iconos, los links de proyecto Y las cinco etiquetas. Un acento
   * que está en todos lados no acentúa nada. Si algún día se decide devolverlo,
   * que sea borrando este test a propósito y no sin enterarse.
   */
  it("las etiquetas no llevan resplandor", () => {
    for (const tone of ["section", "sub"] as const) {
      expect(eyebrowClasses(tone)).not.toContain("text-shadow");
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
