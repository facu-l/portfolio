import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { SOCIAL_LINKS } from "@/content/site";

describe("Footer", () => {
  it("muestra el año actual y no uno hardcodeado", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${year} · Built with Next\\.js`))
    ).toBeInTheDocument();
  });

  it("renderiza un link por cada red configurada", () => {
    render(<Footer />);
    for (const link of SOCIAL_LINKS) {
      const anchor = screen.getByRole("link", {
        name: new RegExp(link.label, "i"),
      });
      expect(anchor).toHaveAttribute("href", link.href);
    }
  });

  /**
   * Este es el test que más vale del archivo.
   *
   * Sin rel="noopener", la página que se abre puede acceder a window.opener y
   * redirigir la pestaña original a otro sitio (tabnabbing). Es el tipo de
   * atributo que alguien borra sin querer en un refactor de estilos, porque no
   * se ve y no rompe nada visible.
   */
  it("los links externos van con noopener y noreferrer", () => {
    render(<Footer />);
    for (const link of SOCIAL_LINKS) {
      const anchor = screen.getByRole("link", {
        name: new RegExp(link.label, "i"),
      });
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor.getAttribute("rel")).toContain("noopener");
      expect(anchor.getAttribute("rel")).toContain("noreferrer");
    }
  });

  it("avisa que los links abren en otra pestaña", () => {
    render(<Footer />);
    expect(
      screen.getAllByText(/opens in a new tab/i).length
    ).toBe(SOCIAL_LINKS.length);
  });

  it("el footer es un landmark y las redes un nav con nombre", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /social/i })).toBeInTheDocument();
  });
});
