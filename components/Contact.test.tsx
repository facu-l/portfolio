import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";
import { getContent } from "@/content";
import { LOCALES } from "@/lib/locale";

describe.each(LOCALES)("Contact (%s)", (locale) => {
  const content = getContent(locale);

  function renderContact(accessKey = "test-key") {
    return render(
      <Contact
        contact={content.contact}
        hero={content.hero}
        opensInNewTab={content.a11y.opensInNewTab}
        accessKey={accessKey}
      />
    );
  }

  it("shows availability, the email with copy button, both CVs and the form below", () => {
    const { container } = renderContact();
    expect(screen.getByText(content.contact.availability)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "faculambertucci98@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:faculambertucci98@gmail.com"
    );
    expect(screen.getByRole("button", { name: content.hero.copyLabel })).toBeInTheDocument();

    const cvs = [...container.querySelectorAll('a[href$=".pdf"]')];
    expect(cvs.map((a) => a.getAttribute("href")).sort()).toEqual([
      "/cv-facundo-lambertucci-en.pdf",
      "/cv-facundo-lambertucci-es.pdf",
    ]);
    for (const cv of cvs) expect(cv).toHaveAttribute("download");

    const formHeading = screen.getByRole("heading", { name: content.contact.formTitle });
    const form = container.querySelector("form")!;
    expect(formHeading.compareDocumentPosition(form) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("without an access key, shows the direct links instead of a broken form", () => {
    const { container } = renderContact("");
    expect(container.querySelector("form")).toBeNull();
    expect(screen.getAllByRole("link", { name: /LinkedIn/ }).length).toBeGreaterThan(0);
  });
});
