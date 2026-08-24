"use client";

import { useEffect, useRef } from "react";
import { eyebrowClasses } from "./Eyebrow";

type SplitHeadingProps = {
  id: string;
  children: string;
};

/**
 * El <h2> de una sección, con las letras entrando de a una al aparecer.
 *
 * ---
 *
 * ES CLIENT COMPONENT, Y ES EL TERCERO DEL SITIO. Los otros dos son
 * StickyHeader (observa el scroll) y ContactForm (estado de envío). La frontera
 * se pone acá, en el título solo: el resto de la sección —el contenido, que es
 * lo que un recruiter y un crawler tienen que ver— sigue renderizándose en el
 * servidor.
 *
 * LA LIBRERIA SE DESCARGA RECIEN CUANDO HACE FALTA. El `await import("animejs")`
 * vive DENTRO del callback del observer, así que Anime.js sale en su propio
 * chunk y no se baja hasta que una sección entra en pantalla. Quien nunca
 * scrollea, y quien pidió movimiento reducido, no lo descargan nunca. Importarlo
 * arriba del archivo habría metido ~20KB en el bundle inicial para decorar un
 * título.
 *
 * EL TEXTO ACCESIBLE NO SE ROMPE, y esto era la objeción principal a partir un
 * encabezado en letras: un lector de pantalla puede terminar leyendo
 * "A. B. O. U. T.". Anime.js lo resuelve de fábrica con `accessible: true`
 * (que además es el default): inserta una copia oculta del texto original y le
 * pone `aria-hidden="true"` a los <span> de cada letra. El nombre accesible del
 * encabezado, del que depende el `aria-labelledby` de la sección, queda intacto.
 * Se pasa explícito igual: es la línea que sostiene esa garantía, y un default
 * silencioso es lo que alguien cambia sin saber qué rompe.
 *
 * SI HAY MOVIMIENTO REDUCIDO NO PASA NADA DE ESTO. Ni el observer, ni la
 * descarga, ni el corte del texto: el título se queda como lo mandó el
 * servidor. La regla global de `globals.css` acorta transiciones de CSS y no
 * puede tocar una animación de JavaScript, así que acá se consulta a mano.
 */
export function SplitHeading({ id, children }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // jsdom no implementa ninguna de las dos. Ver vitest.setup.ts.
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let revertir: (() => void) | undefined;
    let cancelado = false;

    const observer = new IntersectionObserver(
      async (entradas) => {
        if (!entradas.some((e) => e.isIntersecting)) return;

        /*
          Se desconecta ANTES del await. El import tarda, y sin esto un scroll
          rápido dispara el callback dos veces y el título se parte dos veces.
        */
        observer.disconnect();

        const { splitText, animate, stagger } = await import("animejs");

        // El componente pudo desmontarse mientras bajaba el chunk.
        if (cancelado || !ref.current) return;

        const partido = splitText(el, { chars: true, accessible: true });

        animate(partido.chars, {
          opacity: [0, 1],
          y: ["0.35em", 0],
          duration: 650,
          delay: stagger(26),
          ease: "outQuad",
        });

        revertir = () => partido.revert();
      },
      /*
        0.6 y no 0.1: el título tiene que estar bien adentro de la pantalla
        cuando arranca. Disparando apenas asoma, la animación se gasta abajo del
        borde inferior y el visitante llega a un título ya armado.
      */
      { threshold: 0.6 }
    );

    observer.observe(el);

    return () => {
      cancelado = true;
      observer.disconnect();
      /*
        revert() devuelve el <h2> a su HTML original. Sin esto, React se
        encuentra con los <span> que le metió la librería en un nodo que cree
        que controla él, y en un re-render el texto puede quedar duplicado.
      */
      revertir?.();
    };
  }, []);

  return (
    <h2 ref={ref} id={id} className={eyebrowClasses("section")}>
      {children}
    </h2>
  );
}
