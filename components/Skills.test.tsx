import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skills } from "./Skills";
import { FEATURED_SKILLS, OTHER_SKILLS } from "@/content/skills";

describe("Skills", () => {
  it("es un landmark con nombre accesible", () => {
    render(<Skills />);
    expect(screen.getByRole("region", { name: /skills/i })).toBeInTheDocument();
  });

  /**
   * Este test protege la decisión del design review, no el markup. Con 7
   * categorías de peso idéntico un recruiter no elige ninguna. Si alguien
   * "completa" la sección moviendo todo a destacadas, la jerarquía desaparece
   * sin que nada se vea roto — y eso es justo lo que hace difícil detectarlo.
   */
  it("destaca exactamente tres categorías", () => {
    expect(FEATURED_SKILLS).toHaveLength(3);
    render(<Skills />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
  });

  it("las destacadas son las que sostienen la promesa del Hero", () => {
    const titulos = FEATURED_SKILLS.map((c) => c.title);
    expect(titulos).toContain("Backend");
    expect(titulos).toContain("Frontend");
    expect(titulos).toContain("AI-assisted workflow");
  });

  it("cada categoría destacada tiene su nota explicativa", () => {
    render(<Skills />);
    for (const category of FEATURED_SKILLS) {
      expect(category.note).toBeDefined();
      expect(screen.getByText(category.note!)).toBeInTheDocument();
    }
  });

  /**
   * El rediseño a tarjetas con icono hizo que este test cambiara de forma pero
   * no de intención. Antes el título de la categoría ERA el <dt>; ahora es un
   * <span> adentro del <dt>, porque el <dt> además contiene el icono.
   *
   * Lo que se protege es lo mismo y sigue siendo lo importante: que sea un par
   * categoría/items y NO un heading. Convertirlo en <h3> para que se vea igual
   * a las destacadas es el cambio natural al rediseñar, se ve idéntico, y lleva
   * el índice de encabezados de tres entradas (las categorías que importan) a
   * siete.
   */
  it("las secundarias van como pares categoría/items, no como headings", () => {
    render(<Skills />);
    for (const category of OTHER_SKILLS) {
      const titulo = screen.getByText(category.title);
      expect(titulo.closest("dt")).not.toBeNull();
      expect(
        screen.queryByRole("heading", { name: category.title })
      ).toBeNull();
    }
  });

  it("cada categoría renderiza todos sus items", () => {
    render(<Skills />);
    for (const category of [...FEATURED_SKILLS, ...OTHER_SKILLS]) {
      const lista = screen.getByRole("list", {
        name: `${category.title} skills`,
      });
      for (const item of category.items) {
        expect(lista).toHaveTextContent(item);
      }
    }
  });

  /**
   * Una tecnología repetida en dos categorías se lee como relleno. TypeScript
   * en Frontend y en Languages es a propósito (es el lenguaje Y la herramienta
   * del stack), pero cualquier otra duplicación probablemente sea un descuido.
   */
  it("no hay tecnologías duplicadas fuera de las esperadas", () => {
    const todas = [...FEATURED_SKILLS, ...OTHER_SKILLS].flatMap((c) => c.items);
    const repetidas = todas.filter(
      (item, i) => todas.indexOf(item) !== i
    );
    expect([...new Set(repetidas)].sort()).toEqual(["Java", "TypeScript"]);
  });
});
