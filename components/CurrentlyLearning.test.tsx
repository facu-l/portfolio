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

  it("muestra el statement y los temas que vienen", () => {
    render(<CurrentlyLearning />);
    expect(screen.getByText(LEARNING_STATEMENT)).toBeInTheDocument();
  });

  it('"Next up" es un h3, no compite con el h2 de la sección', () => {
    render(<CurrentlyLearning />);
    expect(
      screen.getByRole("heading", { level: 2, name: /currently learning/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /next up/i })
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
