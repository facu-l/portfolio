import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";
import { getContent } from "@/content";
import { LOCALES } from "@/lib/locale";

describe.each(LOCALES)("Hero (%s)", (locale) => {
  const { hero } = getContent(locale);

  it("has a single h1 with the role and the accent period", () => {
    render(<Hero hero={hero} locale={locale} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(`${hero.role}.`);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("shows value prop and status from content", () => {
    render(<Hero hero={hero} locale={locale} />);
    expect(screen.getByText(hero.valueProp)).toBeInTheDocument();
    expect(screen.getByText(hero.status)).toBeInTheDocument();
  });

  it("the CV link points to the PDF of the current locale and has the download attribute", () => {
    render(<Hero hero={hero} locale={locale} />);
    const cv = screen.getByRole("link", { name: hero.cvLabel });
    expect(cv).toHaveAttribute("href", `/cv-facundo-lambertucci-${locale}.pdf`);
    expect(cv).toHaveAttribute("download");
  });

  it("the email is visible as text", () => {
    render(<Hero hero={hero} locale={locale} />);
    expect(screen.getByText("faculambertucci98@gmail.com")).toBeVisible();
  });

  it("the photo has a descriptive alt", () => {
    render(<Hero hero={hero} locale={locale} />);
    expect(screen.getByRole("img", { name: hero.photoAlt })).toBeInTheDocument();
  });
});
