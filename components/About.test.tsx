import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { About } from "./About";
import { getContent } from "@/content";
import { LOCALES } from "@/lib/locale";

describe.each(LOCALES)("About (%s)", (locale) => {
  const content = getContent(locale);
  const { about } = content;

  function renderAbout() {
    return render(<About about={about} opensInNewTab={content.a11y.opensInNewTab} />);
  }

  it("shows bio, how-I-work statements, education and the freelance line last", () => {
    const { container } = renderAbout();
    expect(screen.getByText(about.bio)).toBeInTheDocument();
    for (const line of about.howIWork) expect(screen.getByText(line)).toBeInTheDocument();
    expect(screen.getByText(about.degree.title)).toBeInTheDocument();
    for (const cert of about.certifications) expect(screen.getByText(cert.title)).toBeInTheDocument();

    const texts = [...container.querySelectorAll("p")].map((p) => p.textContent);
    expect(texts.at(-1)).toBe(about.freelance);
  });

  it("Talento Tech links to the API repo", () => {
    renderAbout();
    const link = screen.getByRole("link", { name: new RegExp(about.certifications[0].evidence!.label) });
    expect(link).toHaveAttribute("href", "https://github.com/facu-l/articulos-api-spring-boot");
  });
});
