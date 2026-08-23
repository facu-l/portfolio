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
