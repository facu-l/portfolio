import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DecisionCard } from "./DecisionCard";

const decision = {
  title: "Stock only changes through a ledger, never by editing a number.",
  why: "Every change is a row in stock_movements.",
  evidence: { label: "See migration 0001", href: "https://github.com/facu-l/landing-falber/blob/main/x.sql" },
};

describe("DecisionCard", () => {
  it("shows label, title, why and an evidence link with its href", () => {
    render(
      <DecisionCard decision={decision} index={1} total={5} label="Decision" ofLabel="of" opensInNewTab="(opens in a new tab)" />
    );
    expect(screen.getByText("Decision 1 of 5")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: decision.title })).toBeInTheDocument();
    expect(screen.getByText(decision.why)).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /See migration 0001/ });
    expect(link).toHaveAttribute("href", decision.evidence.href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("uses the heading level it is given, so it fits under h3 on home and h2 on case pages", () => {
    render(
      <DecisionCard decision={decision} index={1} total={5} label="Decisión" ofLabel="de" opensInNewTab="(se abre en una pestaña nueva)" headingLevel={3} />
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(decision.title);
    expect(screen.getByText("Decisión 1 de 5")).toBeInTheDocument();
  });
});
