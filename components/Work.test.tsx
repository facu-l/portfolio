import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Work } from "./Work";
import { getContent } from "@/content";
import { LOCALES } from "@/lib/locale";

describe.each(LOCALES)("Work (%s)", (locale) => {
  const content = getContent(locale);

  function renderWork() {
    return render(
      <Work work={content.work} cases={content.cases} opensInNewTab={content.a11y.opensInNewTab} locale={locale} />
    );
  }

  it("renders both cases in order with exactly one decision each", () => {
    renderWork();
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(2);

    articles.forEach((article, i) => {
      const c = content.cases[i];
      expect(within(article).getByRole("heading", { level: 3 })).toHaveTextContent(c.title);
      const label = `${content.work.decisionLabel} 1 ${content.work.ofLabel} ${c.decisions.length}`;
      expect(within(article).getAllByText(label)).toHaveLength(1);
      expect(within(article).getByText(c.decisions[0].title)).toBeInTheDocument();
      expect(within(article).queryByText(c.decisions[1].title)).not.toBeInTheDocument();
    });
  });

  it("each case links to its case page in the current locale", () => {
    renderWork();
    const links = screen.getAllByRole("link", { name: new RegExp(content.work.readCase) });
    expect(links.map((a) => a.getAttribute("href"))).toEqual([
      `/${locale}/work/falber`,
      `/${locale}/work/gym-management-system`,
    ]);
  });

  it("external links open in a new tab with rel noopener and say so to screen readers", () => {
    renderWork();
    const live = screen.getAllByRole("link", { name: /falber\.com\.ar/ })[0];
    expect(live).toHaveAttribute("target", "_blank");
    expect(live).toHaveAttribute("rel", "noopener noreferrer");
    expect(live).toHaveTextContent(content.a11y.opensInNewTab);
  });

  it("the home image of each case is the first of its gallery, with its alt", () => {
    renderWork();
    for (const c of content.cases) {
      expect(screen.getByRole("img", { name: c.gallery[0].alt })).toBeInTheDocument();
    }
  });
});
