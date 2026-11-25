import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, within } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { getContent } from "@/content";

vi.mock("next/navigation", () => ({ usePathname: () => "/en" }));

const en = getContent("en");
const es = getContent("es");

/**
 * Observer controlable: guarda el callback que le pasa el componente para que
 * el test pueda dispararlo a mano y simular que el usuario scrolleó.
 *
 * Es la técnica general para testear código que depende de una API del
 * browser: reemplazás la API por una que vos manejás, en vez de intentar
 * simular el evento real.
 */
let ultimoCallback: IntersectionObserverCallback | null = null;
let desconectado = false;

class ObserverControlable implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];

  constructor(callback: IntersectionObserverCallback) {
    ultimoCallback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {
    desconectado = true;
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

/** Simula que el centinela salió del viewport, o sea que el usuario scrolleó. */
function simularScroll(scrolleado: boolean) {
  act(() => {
    ultimoCallback?.(
      [{ isIntersecting: !scrolleado } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
  });
}

beforeEach(() => {
  ultimoCallback = null;
  desconectado = false;
  vi.stubGlobal("IntersectionObserver", ObserverControlable);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Navbar", () => {
  it("the name ends in an accent period and links home in the current locale", () => {
    render(<Navbar nav={es.nav} locale="es" />);
    const home = screen.getByRole("link", { name: /Facundo Lambertucci/ });
    expect(home).toHaveAttribute("href", "/es");
    const period = within(home).getByText(".");
    expect(period).toHaveClass("text-accent");
  });

  it("renders Work, Skills, About and Contact in that order, pointing to sections of the current locale", () => {
    render(<Navbar nav={en.nav} locale="en" />);
    const nav = screen.getByRole("navigation", { name: en.nav.label });
    const labels = within(nav)
      .getAllByRole("link")
      .map((a) => a.textContent)
      .filter((text) => ["Work", "Skills", "About", "Contact"].includes(text ?? ""));
    expect(labels).toEqual(["Work", "Skills", "About", "Contact"]);
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/en#work");
  });

  it("offers the CV of the current locale as a download", () => {
    render(<Navbar nav={es.nav} locale="es" />);
    const cv = screen.getByRole("link", { name: es.nav.cv });
    expect(cv).toHaveAttribute("href", "/cv-facundo-lambertucci-es.pdf");
    expect(cv).toHaveAttribute("download");
  });

  /**
   * El comportamiento que justifica que este componente sea cliente.
   * Si esto no funciona, todo el costo de "use client" fue en vano.
   */
  it("aplica el blur solo después de scrollear", () => {
    const { container } = render(<Navbar nav={en.nav} locale="en" />);
    const header = container.querySelector("header");

    expect(header).toHaveAttribute("data-scrolled", "false");
    expect(header?.className).not.toContain("backdrop-blur");

    simularScroll(true);

    expect(header).toHaveAttribute("data-scrolled", "true");
    expect(header?.className).toContain("backdrop-blur");
  });

  it("vuelve al estado inicial al volver arriba", () => {
    const { container } = render(<Navbar nav={en.nav} locale="en" />);
    const header = container.querySelector("header");

    simularScroll(true);
    expect(header).toHaveAttribute("data-scrolled", "true");

    simularScroll(false);
    expect(header).toHaveAttribute("data-scrolled", "false");
  });

  /**
   * Un observer que no se desconecta al desmontar el componente queda vivo
   * apuntando a un nodo que ya no existe. Es una fuga de memoria silenciosa:
   * no rompe nada visible y no aparece en ningún test que no la busque.
   */
  it("desconecta el observer al desmontarse", () => {
    const { unmount } = render(<Navbar nav={en.nav} locale="en" />);
    expect(desconectado).toBe(false);
    unmount();
    expect(desconectado).toBe(true);
  });
});
