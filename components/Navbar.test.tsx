import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { SITE } from "@/content/site";

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
  it("muestra el wordmark en mayúsculas", () => {
    render(<Navbar />);
    expect(
      screen.getByRole("link", { name: SITE.name.toUpperCase() })
    ).toBeInTheDocument();
  });

  it("renderiza los 4 links de navegación apuntando a anclas de la página", () => {
    render(<Navbar />);
    const nav = screen.getByRole("navigation", { name: /main/i });
    expect(nav).toBeInTheDocument();

    for (const label of ["About", "Work", "Skills", "Contact"]) {
      const link = screen.getByRole("link", { name: label });
      expect(link.getAttribute("href")).toMatch(/^#/);
    }
  });

  /**
   * El comportamiento que justifica que este componente sea cliente.
   * Si esto no funciona, todo el costo de "use client" fue en vano.
   */
  it("aplica el blur solo después de scrollear", () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector("header");

    expect(header).toHaveAttribute("data-scrolled", "false");
    expect(header?.className).not.toContain("backdrop-blur");

    simularScroll(true);

    expect(header).toHaveAttribute("data-scrolled", "true");
    expect(header?.className).toContain("backdrop-blur");
  });

  it("vuelve al estado inicial al volver arriba", () => {
    const { container } = render(<Navbar />);
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
    const { unmount } = render(<Navbar />);
    expect(desconectado).toBe(false);
    unmount();
    expect(desconectado).toBe(true);
  });
});
