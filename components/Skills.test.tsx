import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Skills } from "./Skills";
import { getContent } from "@/content";
import { LOCALES } from "@/lib/locale";

describe.each(LOCALES)("Skills (%s)", (locale) => {
  const content = getContent(locale);

  function renderSkills() {
    return render(
      <Skills skills={content.skills} cases={content.cases} opensInNewTab={content.a11y.opensInNewTab} locale={locale} />
    );
  }

  it("every group shows a Used in line whose links are case pages of the current locale or https URLs", () => {
    renderSkills();
    for (const group of content.skills.groups) {
      const block = screen.getByRole("heading", { name: group.title }).closest("div")!;
      expect(within(block).getByText(content.skills.usedInLabel, { exact: false })).toBeInTheDocument();
      const hrefs = within(block).getAllByRole("link").map((a) => a.getAttribute("href")!);
      expect(hrefs.length).toBeGreaterThan(0);
      for (const href of hrefs) {
        expect(href).toMatch(new RegExp(`^(/${locale}/work/[a-z-]+|https://)`));
      }
    }
  });

  it("the Java group links to articulos-api and says it was a course project", () => {
    renderSkills();
    const block = screen.getByRole("heading", { name: "Java" }).closest("div")!;
    const link = within(block).getByRole("link", { name: /articulos-api/ });
    expect(link).toHaveAttribute("href", "https://github.com/facu-l/articulos-api-spring-boot");
    expect(link).toHaveTextContent(/course project|proyecto de curso/);
  });
});
