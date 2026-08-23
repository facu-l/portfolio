"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Header pegajoso que aplica fondo semitransparente + blur al scrollear.
 *
 * ────────────────────────────────────────────────────────────────────────
 * POR QUE ESTE COMPONENTE EXISTE, SI EL NAVBAR YA ERA UN SOLO ARCHIVO
 *
 * El blur necesita saber si el usuario scrolleó, o sea estado en el cliente.
 * Lo fácil sería poner "use client" arriba de Navbar.tsx y listo. El problema
 * es el mismo que con el Hero: "use client" no marca un componente, marca una
 * frontera, y todo lo que cuelga debajo se vuelve cliente.
 *
 * Acá la frontera envuelve SOLO la lógica de scroll. El contenido del navbar
 * (el wordmark y los 4 links) entra como `children` desde un Server Component,
 * y por eso sigue renderizándose en el servidor. React lo trata como algo ya
 * renderizado que este componente solo ubica: nunca se vuelve a ejecutar en el
 * browser.
 *
 * Es un patrón que vas a reusar: cuando necesites interactividad alrededor de
 * contenido estático, pasá el contenido como children en vez de importarlo
 * adentro del Client Component.
 *
 * ────────────────────────────────────────────────────────────────────────
 * POR QUE IntersectionObserver Y NO UN LISTENER DE SCROLL
 *
 * Un listener de scroll corre en cada frame mientras el usuario scrollea:
 * decenas de ejecuciones por segundo para responder una pregunta binaria que
 * cambia dos veces.
 *
 * IntersectionObserver observa un elemento centinela de 1px arriba de todo y
 * avisa solo cuando entra o sale del viewport. Dos ejecuciones en vez de
 * cientos, y el trabajo lo hace el browser fuera del hilo principal.
 */
type StickyHeaderProps = {
  children: ReactNode;
};

export function StickyHeader({ children }: StickyHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    // Guarda para entornos sin IntersectionObserver (jsdom viejo, algún bot).
    // Sin esto el componente tira y se lleva puesta la página entera.
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      // El centinela visible = estamos arriba de todo. No visible = scrolleó.
      setScrolled(!entry.isIntersecting);
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Centinela: 1px al principio del documento, invisible y fuera del
          árbol de accesibilidad. No es contenido, es un sensor. */}
      <div ref={sentinelRef} aria-hidden="true" className="h-px" />

      <header
        data-scrolled={scrolled}
        className={[
          "sticky top-0 z-50 w-full transition-colors duration-base",
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        {children}
      </header>
    </>
  );
}
