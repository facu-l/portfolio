"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Aparición al hacer scroll: el bloque entra desde abajo con un fade cuando
 * llega al viewport.
 *
 * "use client" ACA NO CONTAGIA A LAS SECCIONES. Esto es lo importante y es
 * exactamente lo contrario de lo que advierte el comentario de Hero.tsx.
 * La frontera de cliente se hereda hacia abajo en el ÁRBOL DE IMPORTS, no en el
 * árbol de JSX: `Section` es Server Component, renderiza su contenido en el
 * servidor y le pasa el resultado ya armado a `Reveal` como `children`. Este
 * componente nunca importa una sección, así que el HTML inicial sigue teniendo
 * todo el texto del sitio. Lo único que viaja al navegador es este archivo.
 *
 * POR QUE INTERSECTIONOBSERVER Y NO `animation-timeline: view()`: la versión
 * CSS pura no necesitaría JavaScript, pero hoy Firefox no la soporta y el
 * efecto simplemente no existiría ahí. El observer es API nativa, no es una
 * dependencia, y corre una vez por sección.
 *
 * SE DESCONECTA DESPUES DE REVELAR. Sin `disconnect()` el callback sigue
 * disparando en cada scroll por cada sección, para siempre, sin hacer nada.
 *
 * EL ESTADO OCULTO VIVE EN CSS, NO EN REACT (ver globals.css). Dos motivos:
 *   1. `data-revealed` se pone con setAttribute y no con useState, así que
 *      revelar no dispara un re-render de la sección entera.
 *   2. El CSS que oculta está dentro de `@media (scripting: enabled)`. Si el
 *      visitante tiene JavaScript apagado, la regla no aplica y ve todo el
 *      contenido. Ocultar con una clase estática sería dejar la página en
 *      blanco para un crawler sin JS.
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => el.setAttribute("data-revealed", "true");

    // jsdom (y navegadores muy viejos) no implementan IntersectionObserver.
    // Sin esta guarda, los tests renderizarían contenido que nunca se revela.
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal();
          observer.disconnect();
        }
      },
      /*
        -10% abajo: la sección tiene que entrar un poco al viewport, no apenas
        asomar el primer píxel. Con 0 la animación arranca cuando todavía no se
        ve nada y para cuando el bloque está a la vista ya terminó.
      */
      { rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
}
