import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";
import { SITE } from "@/content/site";

describe("Hero", () => {
  /**
   * El h1 es UNO SOLO y contiene las tres partes: saludo, nombre y rol.
   *
   * Podrían ser un h1 y dos <p>, y se vería igual. Pero un lector de pantalla
   * que lista los encabezados de la página leería solo el nombre, sin el rol
   * — que es la afirmación que sostiene todo el sitio. Juntos se anuncian como
   * una frase: "Hi, I'm Facundo Lambertucci, Full Stack Developer".
   */
  it("tiene un único h1 que presenta nombre y rol juntos", () => {
    render(<Hero />);
    const encabezados = screen.getAllByRole("heading", { level: 1 });
    expect(encabezados).toHaveLength(1);

    const texto = encabezados[0].textContent?.replace(/\s+/g, " ") ?? "";
    expect(texto).toContain(SITE.greeting);
    expect(texto).toContain(SITE.name);
    expect(texto).toContain(SITE.role);
  });

  /**
   * El nombre va antes que el rol y no al revés. "Full Stack Developer" lo
   * comparten millones de personas; el nombre es lo único irrepetible de esta
   * página, y es lo que tiene que quedar cuando alguien cierra la pestaña.
   */
  it("el nombre aparece antes que el rol", () => {
    render(<Hero />);
    const texto =
      screen.getByRole("heading", { level: 1 }).textContent?.replace(/\s+/g, " ") ??
      "";
    expect(texto.indexOf(SITE.name)).toBeLessThan(texto.indexOf(SITE.role));
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
   * Lo que se protege CAMBIO, y por eso este test cambió con él.
   *
   * Antes el botón era texto claro sobre azul: 3.57:1, que falla AA para texto
   * normal y solo pasa como "texto grande" de WCAG (>=18.66px en bold). El
   * test fijaba el TAMAÑO en 19px, porque ese tamaño era lo único que hacía
   * legal ese contraste.
   *
   * Ahora el texto es oscuro sobre el mismo azul: 4.64:1, que pasa AA para
   * texto normal. La restricción de tamaño desapareció porque desapareció su
   * causa. Lo que hay que proteger ya no es cuán grande es la letra, sino que
   * el par de colores siga siendo ese.
   *
   * Si alguien le pone `text-foreground` al primario "para que se lea mejor",
   * el contraste vuelve a 3.57:1 y el CTA principal del sitio queda fallando
   * accesibilidad: se ve bien, funciona bien, y está mal.
   */
  it("el CTA principal mantiene el par de colores que le da 4.64:1", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /view my work/i });
    expect(cta.className).toContain("bg-accent");
    expect(cta.className).toContain("text-background");
    expect(cta.className).not.toContain("text-foreground");
  });

  /**
   * 44x44px es el mínimo de touch target de DESIGN.md. Achicar los botones no
   * puede llevarse puesto eso: en un teléfono, un botón más chico que el pulgar
   * es un botón al que se le erra.
   */
  it("los botones conservan el touch target mínimo", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /view my work/i });
    const cvBtn = screen.getByRole("button", { name: /download cv/i });
    const github = screen.getByRole("link", { name: /github/i });

    for (const el of [cta, cvBtn, github]) {
      expect(el.className).toMatch(/min-h-11|size-11/);
    }
  });

  it("los links externos van con noopener y noreferrer", () => {
    render(<Hero />);
    const github = screen.getByRole("link", { name: /github/i });
    expect(github).toHaveAttribute("target", "_blank");
    expect(github.getAttribute("rel")).toContain("noopener");
    expect(github.getAttribute("rel")).toContain("noreferrer");
  });
});
