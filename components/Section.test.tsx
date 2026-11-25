import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "./Section";

describe("Section", () => {
  it("renders the title as an h2 that names the section, with a trailing accent period", () => {
    render(
      <Section id="work" title="Work">
        <p>contenido</p>
      </Section>
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Work.");

    // El punto es la firma visual: va en el acento y no se lee en voz alta.
    const period = heading.querySelector("span");
    expect(period).toHaveTextContent(".");
    expect(period).toHaveClass("text-accent");
    expect(period).toHaveAttribute("aria-hidden", "true");

    // El landmark se nombra con el título.
    expect(screen.getByRole("region", { name: /Work/ })).toHaveAttribute("id", "work");
  });
});
