// Agrega los matchers de jest-dom a expect() de Vitest.
// Sin esto, toBeInTheDocument() y compañía no existen.
import "@testing-library/jest-dom/vitest";

/**
 * jsdom no implementa IntersectionObserver.
 *
 * Sin este stub, cualquier test que renderice un componente que lo use tira
 * "IntersectionObserver is not defined" y el test falla por el entorno, no por
 * el código. Este stub no hace nada: solo evita que reviente.
 *
 * Los tests que necesitan CONTROLAR el observer (simular que el usuario
 * scrolleó) lo reemplazan por uno propio con vi.stubGlobal. Ver
 * components/Navbar.test.tsx.
 */
if (typeof globalThis.IntersectionObserver === "undefined") {
  class NoopIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds: readonly number[] = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  globalThis.IntersectionObserver =
    NoopIntersectionObserver as unknown as typeof IntersectionObserver;
}

/**
 * jsdom tampoco implementa ResizeObserver ni matchMedia.
 *
 * Los pide `liquid-gooey` al montarse: ResizeObserver para conocer el tamaño
 * del grupo y matchMedia para consultar `prefers-reduced-motion`. Que la
 * librería consulte esa media query por su cuenta es buena señal — respeta la
 * preferencia sin que haya que pedírselo.
 *
 * Los dos stubs son inertes. No están para probar el efecto: están para que un
 * test del Hero falle por lo que dice el Hero y no porque el entorno de test no
 * es un navegador. El efecto visual se verifica mirando el sitio, que es lo
 * único que puede verificarlo.
 */
if (typeof globalThis.ResizeObserver === "undefined") {
  class NoopResizeObserver implements ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver =
    NoopResizeObserver as unknown as typeof ResizeObserver;
}

if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  window.matchMedia = ((query: string) => ({
    media: query,
    // `false` = sin preferencia de movimiento reducido, que es el caso normal.
    matches: false,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    // addListener/removeListener están deprecadas pero varias librerías todavía
    // las usan como fallback. Sin ellas, el stub revienta en esas ramas.
    addListener() {},
    removeListener() {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
