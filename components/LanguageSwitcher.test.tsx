import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageSwitcher } from "./LanguageSwitcher";

let pathname = "/es/work/falber";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

describe("LanguageSwitcher", () => {
  it("links to the same page in the other locale", () => {
    pathname = "/es/work/falber";
    render(<LanguageSwitcher locale="es" switchTo="Read in English" />);
    const link = screen.getByRole("link", { name: "Read in English" });
    expect(link).toHaveAttribute("href", "/en/work/falber");
    expect(link).toHaveAttribute("hrefLang", "en");
    expect(link).toHaveTextContent("EN");
  });

  it("marks the current locale without linking to it", () => {
    pathname = "/en";
    render(<LanguageSwitcher locale="en" switchTo="Leer en español" />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByText("EN")).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: "Leer en español" })).toHaveAttribute("href", "/es");
  });
});
