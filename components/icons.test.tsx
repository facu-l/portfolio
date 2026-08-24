import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SKILL_ICONS, SOCIAL_ICONS } from "./icons";
import { About } from "./About";
import { FEATURED_SKILLS, OTHER_SKILLS } from "@/content/skills";
import { CERTIFICATIONS } from "@/content/about";

describe("icons", () => {
  /**
   * Todo icono es decoración: al lado siempre hay un texto que dice lo mismo.
   * Sin `aria-hidden`, un lector de pantalla anuncia un gráfico sin nombre
   * antes de cada título, siete veces en Skills y cinco en Education.
   */
  it("todos los iconos están ocultos para el lector de pantalla", () => {
    for (const [nombre, Icon] of Object.entries({
      ...SKILL_ICONS,
      ...SOCIAL_ICONS,
    })) {
      const { container, unmount } = render(<Icon />);
      const svg = container.querySelector("svg");
      expect(svg, `${nombre} no renderizó un <svg>`).not.toBeNull();
      expect(svg!.getAttribute("aria-hidden"), nombre).toBe("true");
      unmount();
    }
  });

  /**
   * El icono se resuelve por CLAVE (`icon: "backend"`), no por título. Este
   * test verifica que toda categoría tenga una clave que exista en el mapa.
   * TypeScript ya lo cubre en compilación; esto lo cubre si el contenido algún
   * día viene de otro lado, y documenta la regla donde se lee.
   */
  it("cada categoría de Skills resuelve a un icono", () => {
    for (const category of [...FEATURED_SKILLS, ...OTHER_SKILLS]) {
      expect(
        SKILL_ICONS[category.icon],
        `${category.title} apunta a un icono inexistente`
      ).toBeDefined();
    }
  });
});

describe("Education", () => {
  /**
   * EL TEST QUE PROTEGE LA DISTINCION QUE PIDIO EL DISEÑO.
   *
   * El birrete marca el título de grado y la medalla los cursos. Es la única
   * cosa que distingue una carrera de cinco años de un curso de 80 horas en una
   * pila de recuadros iguales. Si alguien unifica los iconos "por consistencia",
   * la sección se ve más prolija y comunica menos.
   *
   * Se cuentan los badges: uno por estudio, y el del grado no puede ser el
   * mismo dibujo que el de las certificaciones.
   */
  it("el grado y los cursos llevan iconos distintos", () => {
    const { container } = render(<About />);
    const paths = [...container.querySelectorAll("svg")].map(
      (svg) => svg.innerHTML
    );

    // Un icono por estudio: 1 grado + N certificaciones.
    expect(paths).toHaveLength(1 + CERTIFICATIONS.length);

    const [grado, ...cursos] = paths;
    for (const curso of cursos) {
      expect(curso).not.toBe(grado);
    }
    // Todos los cursos comparten el mismo icono entre sí.
    expect(new Set(cursos).size).toBe(1);
  });

  it("el link de evidencia sigue siendo alcanzable dentro de la tarjeta", () => {
    render(<About />);
    const conEvidencia = CERTIFICATIONS.filter((c) => c.evidence);
    for (const cert of conEvidencia) {
      expect(
        screen.getByRole("link", {
          name: new RegExp(cert.evidence!.label, "i"),
        })
      ).toHaveAttribute("href", cert.evidence!.href);
    }
  });
});
