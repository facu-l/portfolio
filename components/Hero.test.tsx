import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";
import { SITE } from "@/content/site";

describe("Hero", () => {
  it("tiene un único h1 con el título del SPEC", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent?.replace(/\s+/g, " ")).toMatch(
      /full stack\s*developer/i
    );
  });

  it("muestra el tagline y la ubicación", () => {
    render(<Hero />);
    expect(screen.getByText(SITE.tagline)).toBeInTheDocument();
    expect(screen.getByText(SITE.location)).toBeInTheDocument();
  });

  it("la foto tiene alt descriptivo, no vacío ni genérico", () => {
    render(<Hero />);
    const img = screen.getByRole("img");
    const alt = img.getAttribute("alt") ?? "";
    expect(alt).toContain(SITE.name);
    expect(alt).not.toMatch(/^(foto|image|imagen|picture)$/i);
  });

  it("renderiza los 3 CTAs decididos en el design review", () => {
    render(<Hero />);
    expect(
      screen.getByRole("link", { name: /view my work/i })
    ).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      expect.stringContaining("github.com")
    );
    // El CV ya no es un link: es un boton que abre la popover de idioma.
    expect(
      screen.getByRole("button", { name: /download cv/i })
    ).toBeInTheDocument();
  });

  /**
   * EL TEST QUE PROTEGE LA ACCESIBILIDAD DEL BOTON PRINCIPAL.
   *
   * #F5F7FA sobre #007FFF da 3.57:1: falla AA para texto normal y solo pasa
   * como texto grande de WCAG (>=18.66px en bold). El token text-cta son 19px.
   *
   * Si alguien cambia el botón a text-sm en un refactor de estilos, el CTA
   * principal del sitio queda fallando accesibilidad y nada más lo detecta:
   * se ve bien, funciona bien, y está mal.
   */
  it("los CTAs conservan el tamaño y el peso que exige el contraste", () => {
    render(<Hero />);
    for (const nombre of [/view my work/i, /github/i]) {
      const cta = screen.getByRole("link", { name: nombre });
      expect(cta.className).toContain("text-cta");
      expect(cta.className).toContain("font-bold");
    }
    const cvBtn = screen.getByRole("button", { name: /download cv/i });
    expect(cvBtn.className).toContain("text-cta");
    expect(cvBtn.className).toContain("font-bold");
  });

  it("los links externos van con noopener y noreferrer", () => {
    render(<Hero />);
    const github = screen.getByRole("link", { name: /github/i });
    expect(github).toHaveAttribute("target", "_blank");
    expect(github.getAttribute("rel")).toContain("noopener");
    expect(github.getAttribute("rel")).toContain("noreferrer");
  });
});
