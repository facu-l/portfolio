import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageSwitcher } from "./LanguageSwitcher";

let pathname = "/es/work/falber";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

describe("LanguageSwitcher", () => {
  it("links to the same page in the other locale", () => {
    pathname = "/es/work/falber";
    render(<LanguageSwitcher locale="es" switchTo="Read in English" />);
    const link = screen.getByRole("link", { name: /Read in English/ });
    expect(link).toHaveAttribute("href", "/en/work/falber");
    expect(link).toHaveAttribute("hrefLang", "en");
    expect(link).toHaveTextContent("EN");
  });

  /*
    WCAG 2.5.3 (label in name): quien usa control por voz dice lo que VE ("EN").
    Si el nombre accesible fuera solo "Read in English", ese comando no
    encuentra el link. Lighthouse lo marcó como label-content-name-mismatch.
  */
  it("the accessible name starts with the visible text, so voice control can find it", () => {
    pathname = "/es";
    render(<LanguageSwitcher locale="es" switchTo="Read in English" />);
    const link = screen.getByRole("link", { name: /Read in English/ });
    expect(link).not.toHaveAttribute("aria-label");
    expect(link.textContent?.startsWith("EN")).toBe(true);
  });

  it("marks the current locale without linking to it", () => {
    pathname = "/en";
    render(<LanguageSwitcher locale="en" switchTo="Leer en español" />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByText("EN")).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: /Leer en español/ })).toHaveAttribute("href", "/es");
  });
});
