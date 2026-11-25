import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NotFoundView } from "./NotFoundView";
import { getContent } from "@/content";
import { LOCALES } from "@/lib/locale";

describe.each(LOCALES)("NotFoundView (%s)", (locale) => {
  const content = getContent(locale);

  it("explains the page does not exist in the page language and links home in that locale", () => {
    render(<NotFoundView notFound={content.notFound} locale={locale} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(content.notFound.title);
    expect(screen.getByRole("link", { name: content.notFound.backHome })).toHaveAttribute("href", `/${locale}`);
  });
});
