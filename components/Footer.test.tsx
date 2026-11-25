import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { getContent } from "@/content";

describe("Footer", () => {
  it("shows the name, the social links in a new tab and the built-with line in the page language", () => {
    const es = getContent("es");
    render(<Footer footer={es.footer} opensInNewTab={es.a11y.opensInNewTab} />);
    expect(screen.getByText("Facundo Lambertucci", { exact: false })).toBeInTheDocument();
    const github = screen.getByRole("link", { name: /GitHub/ });
    expect(github).toHaveAttribute("href", "https://github.com/facu-l");
    expect(github).toHaveTextContent(es.a11y.opensInNewTab);
    expect(screen.getByText(new RegExp(es.footer.builtWith))).toBeInTheDocument();
  });
});
