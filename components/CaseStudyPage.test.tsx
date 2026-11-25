import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudyPage } from "./CaseStudyPage";
import { getContent } from "@/content";

const en = getContent("en");
const es = getContent("es");
const [falberEn, cefEn] = en.cases;

function renderCase(content: typeof en, slug: string) {
  const caseStudy = content.cases.find((c) => c.slug === slug)!;
  return render(
    <CaseStudyPage
      caseStudy={caseStudy}
      work={content.work}
      opensInNewTab={content.a11y.opensInNewTab}
      locale={content.locale}
    />
  );
}

describe("CaseStudyPage", () => {
  it("has the case title as its only h1", () => {
    renderCase(en, "falber");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(`${falberEn.title}.`);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("FALBER page shows every decision and the AI-workflow sentence", () => {
    renderCase(en, "falber");
    for (const d of falberEn.decisions) {
      expect(screen.getByRole("heading", { level: 3, name: d.title })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: new RegExp(d.evidence.label) })).toHaveAttribute("href", d.evidence.href);
    }
    expect(screen.getByText(falberEn.aiWorkflow!)).toBeInTheDocument();
  });

  it("CEF page shows the team line and credits the Rust backend to a teammate", () => {
    renderCase(en, "gym-management-system");
    expect(screen.getByText(cefEn.team!)).toBeInTheDocument();
    expect(screen.getByText(/built by my teammates/)).toBeInTheDocument();
  });

  it("CEF page has no AI-workflow note", () => {
    renderCase(en, "gym-management-system");
    expect(screen.queryByText(en.work.sections.aiWorkflow)).not.toBeInTheDocument();
  });

  it("the back link targets the work section of the same locale", () => {
    renderCase(es, "falber");
    expect(screen.getByRole("link", { name: new RegExp(es.work.backToWork) })).toHaveAttribute("href", "/es#work");
  });

  it("shows every screenshot with its caption", () => {
    renderCase(es, "falber");
    for (const shot of es.cases[0].gallery) {
      expect(screen.getByRole("img", { name: shot.alt })).toBeInTheDocument();
      expect(screen.getByText(shot.caption!)).toBeInTheDocument();
    }
  });
});
