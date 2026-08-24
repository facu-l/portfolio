import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * OJO CON jsdom: implementa IntersectionObserver, pero como un noop que nunca
 * dispara el callback. Es peor que no tenerlo — la guarda del componente no se
 * activa y nada se revela solo. Por eso acá los dos caminos se fuerzan a mano
 * en vez de confiar en lo que trae el entorno.
 */
const REAL_IO = globalThis.IntersectionObserver;

afterEach(() => {
  globalThis.IntersectionObserver = REAL_IO;
});

describe("Reveal", () => {
  /**
   * EL TEST QUE IMPORTA.
   *
   * El riesgo real de un efecto de aparición al scroll no es que se vea feo:
   * es que el contenido quede oculto para siempre si el mecanismo que lo revela
   * no corre. Un crawler sin JavaScript, un navegador sin IntersectionObserver,
   * un error de JS antes del efecto — en cualquiera de esos casos un
   * `opacity-0` estático deja la página en blanco y nadie se entera, porque en
   * el navegador del que lo escribió se ve perfecto.
   *
   * Acá se verifica el eslabón que el código controla: sin
   * IntersectionObserver (jsdom no lo implementa) el contenido se revela igual.
   * El otro eslabón, JS apagado, lo cubre `@media (scripting: enabled)` en
   * globals.css, que por definición no se puede testear desde jsdom.
   */
  it("revela el contenido aunque no exista IntersectionObserver", () => {
    // @ts-expect-error se borra a propósito para simular el navegador viejo.
    delete globalThis.IntersectionObserver;

    render(<Reveal>contenido</Reveal>);

    expect(screen.getByText("contenido")).toHaveAttribute(
      "data-revealed",
      "true"
    );
  });

  /**
   * El camino normal: entra al viewport -> se revela -> el observer se
   * desconecta. Lo último importa: sin `disconnect()` el callback sigue
   * disparando en cada scroll, por cada sección, para siempre y sin hacer nada.
   * Es una fuga que nunca se nota mirando la página.
   */
  it("revela al entrar al viewport y después se desconecta", () => {
    const disconnect = vi.fn();
    let disparar: ((entries: { isIntersecting: boolean }[]) => void) | undefined;

    // Tiene que ser una clase: el componente lo invoca con `new`, y una arrow
    // function no es construible.
    class FakeObserver {
      constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
        disparar = callback;
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = disconnect;
    }
    globalThis.IntersectionObserver =
      FakeObserver as unknown as typeof IntersectionObserver;

    render(<Reveal>contenido</Reveal>);
    const wrapper = screen.getByText("contenido");

    expect(wrapper).not.toHaveAttribute("data-revealed");

    disparar?.([{ isIntersecting: true }]);

    expect(wrapper).toHaveAttribute("data-revealed", "true");
    expect(disconnect).toHaveBeenCalled();
  });

  /**
   * El contenido de una sección tiene que existir en el DOM siempre, revelado o
   * no. Si alguna vez esto se implementa montando/desmontando hijos en vez de
   * animándolos, este test falla — y tiene que fallar: el texto del sitio no
   * puede depender del scroll para existir.
   */
  it("los hijos están en el DOM sin depender del scroll", () => {
    render(
      <Section id="demo" title="DEMO">
        <p>texto de la sección</p>
      </Section>
    );
    expect(screen.getByText("texto de la sección")).toBeInTheDocument();
  });

  /**
   * El ancla del navbar apunta al <section>, no al div animado. Si el id
   * viajara adentro del Reveal, el scroll aterrizaría desplazado mientras dura
   * el translateY.
   */
  it("el id de la sección no queda sobre el elemento animado", () => {
    const { container } = render(
      <Section id="demo" title="DEMO">
        contenido
      </Section>
    );
    const animado = container.querySelector("[data-reveal]");
    expect(animado).not.toBeNull();
    expect(animado).not.toHaveAttribute("id");
    expect(container.querySelector("#demo")?.tagName).toBe("SECTION");
  });
});
