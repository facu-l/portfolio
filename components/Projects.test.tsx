import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Projects } from "./Projects";
import { ProjectLinks } from "./ProjectLinks";
import { FEATURED_PROJECT, OTHER_PROJECTS } from "@/content/projects";

describe("Projects", () => {
  it("es un landmark con nombre accesible que coincide con el link del navbar", () => {
    render(<Projects />);
    expect(screen.getByRole("region", { name: /work/i })).toBeInTheDocument();
    expect(document.querySelector("#work")).not.toBeNull();
  });

  it("muestra el proyecto destacado con su captura", () => {
    render(<Projects />);
    expect(
      screen.getByRole("heading", { level: 3, name: FEATURED_PROJECT.title })
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(FEATURED_PROJECT.screenshot!.alt)
    ).toBeInTheDocument();
  });

  it("etiqueta las contribuciones propias en vez de mezclarlas con el resumen", () => {
    render(<Projects />);
    expect(screen.getByText(/key contributions/i)).toBeInTheDocument();
    expect(
      screen.getByText(FEATURED_PROJECT.contributions!)
    ).toBeInTheDocument();
  });

  it("lista el stack completo del destacado", () => {
    render(<Projects />);
    const lista = screen.getByRole("list", {
      name: new RegExp(FEATURED_PROJECT.title, "i"),
    });
    for (const tech of FEATURED_PROJECT.stack) {
      expect(lista).toHaveTextContent(tech);
    }
  });

  it("el CTA del case study apunta a la ruta del slug", () => {
    render(<Projects />);
    const link = screen.getByRole("link", { name: /view case study/i });
    expect(link).toHaveAttribute(
      "href",
      `/work/${FEATURED_PROJECT.caseStudy!.slug}`
    );
  });

  it("renderiza los proyectos secundarios sin captura", () => {
    render(<Projects />);
    for (const p of OTHER_PROJECTS) {
      expect(
        screen.getByRole("heading", { level: 3, name: p.title })
      ).toBeInTheDocument();
    }
    // Solo el destacado tiene imagen: es lo que crea la jerarquía.
    expect(screen.getAllByRole("img")).toHaveLength(1);
  });

  /**
   * "More work" es una etiqueta de agrupación, no un heading. Los headings de
   * la sección son los títulos de los proyectos: si "More work" fuera un h3,
   * alguien navegando por headings encontraría un ítem que no lleva a nada.
   */
  it("los únicos headings de la sección son el h2 y los títulos de proyecto", () => {
    render(<Projects />);
    const h3 = screen.getAllByRole("heading", { level: 3 });
    expect(h3.map((h) => h.textContent)).toEqual([
      FEATURED_PROJECT.title,
      ...OTHER_PROJECTS.map((p) => p.title),
    ]);
  });
});

describe("ProjectLinks", () => {
  /**
   * El comportamiento que importa: sin URL no hay botón. La alternativa —un
   * href placeholder— manda al visitante a un 404, y lo que aprende no es
   * "faltaba el repo" sino "este sitio está roto".
   */
  it("no renderiza nada cuando el proyecto no tiene ningún link", () => {
    const { container } = render(<ProjectLinks projectTitle="Sin links" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("los links externos abren en pestaña nueva con rel de seguridad", () => {
    render(
      <ProjectLinks
        projectTitle="Demo"
        liveUrl="https://ejemplo.dev"
        repoUrl="https://github.com/facu-l/demo"
      />
    );

    for (const nombre of [/live demo/i, /github/i]) {
      const link = screen.getByRole("link", { name: nombre });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link.getAttribute("rel")).toContain("noopener");
    }
  });

  it("el case study es un link interno, no abre pestaña nueva", () => {
    render(<ProjectLinks projectTitle="Demo" caseStudyHref="/work/demo" />);
    const link = screen.getByRole("link", { name: /view case study/i });
    expect(link).toHaveAttribute("href", "/work/demo");
    expect(link).not.toHaveAttribute("target");
  });
});
