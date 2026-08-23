import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { About } from "./About";
import { BIO, DEGREE, CERTIFICATIONS } from "@/content/about";

describe("About", () => {
  it("es un landmark con nombre accesible", () => {
    render(<About />);
    expect(
      screen.getByRole("region", { name: /about/i })
    ).toBeInTheDocument();
  });

  it("muestra la bio completa", () => {
    render(<About />);
    expect(screen.getByText(BIO)).toBeInTheDocument();
  });

  /**
   * Node.js quedó FUERA de la bio a propósito: el portfolio no tiene ningún
   * artefacto que respalde esa afirmación. Sigue estando en Skills, que es una
   * lista de herramientas conocidas y no una afirmación de haber construido.
   *
   * Este test existe para que si alguien reescribe la bio y vuelve a meter
   * Node.js, la decisión se discuta en vez de colarse.
   */
  it("la bio no promete tecnologías que el portfolio no puede respaldar", () => {
    expect(BIO).not.toMatch(/node\.?js/i);
    expect(BIO).toMatch(/spring boot/i);
  });

  it("muestra el título de grado con institución y año", () => {
    render(<About />);
    expect(screen.getByText(DEGREE.title)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(DEGREE.detail, "i"))
    ).toBeInTheDocument();
  });

  it("lista las certificaciones con su institución", () => {
    render(<About />);
    for (const cert of CERTIFICATIONS) {
      expect(screen.getByText(cert.title)).toBeInTheDocument();
      expect(screen.getByText(cert.topics)).toBeInTheDocument();
    }
  });

  /**
   * Este es el test que protege la decisión de fondo: la certificación de
   * Java linkea al repo que salió de ese curso. Sin ese link, el portfolio
   * afirma experiencia backend sin un solo artefacto que la muestre — que es
   * exactamente el hueco que encontró el review.
   */
  it("la certificación de Java linkea a la API como evidencia", () => {
    render(<About />);
    const conEvidencia = CERTIFICATIONS.filter((c) => c.evidence);
    expect(conEvidencia.length).toBeGreaterThan(0);

    for (const cert of conEvidencia) {
      const link = screen.getByRole("link", {
        name: new RegExp(cert.evidence!.label, "i"),
      });
      expect(link).toHaveAttribute("href", cert.evidence!.href);
      expect(link.getAttribute("rel")).toContain("noopener");
    }
  });

  it("Education es un h3, no compite con el h2 de la sección", () => {
    render(<About />);
    const h2 = screen.getByRole("heading", { level: 2, name: /about/i });
    const h3 = screen.getByRole("heading", { level: 3, name: /education/i });
    expect(h2).toBeInTheDocument();
    expect(h3).toBeInTheDocument();
  });
});
