import { CV_FILES } from "@/content/site";

/**
 * Botón "DOWNLOAD CV" que abre un cartel para elegir idioma.
 *
 * ══════════════════════════════════════════════════════════════════════════
 * POR QUE POPOVER NATIVA Y NO UN MODAL EN REACT
 *
 * Esto es un Server Component. NO tiene "use client", no tiene useState, no
 * agrega un byte al JavaScript que descarga el visitante. `popover` y
 * `popovertarget` son atributos de HTML: el browser hace todo el trabajo.
 *
 * Un modal hecho a mano en React necesita, para estar bien hecho:
 *   - estado de abierto/cerrado
 *   - cerrar con Escape
 *   - cerrar al clickear afuera
 *   - mover el foco adentro al abrir y devolverlo al cerrar
 *   - atrapar el foco mientras está abierto (focus trap)
 *   - renderizar por encima de todo sin pelear con z-index
 *
 * La Popover API da las seis cosas gratis. `popover="auto"` además renderiza
 * en el top layer, así que ningún z-index de la página puede taparlo, y la
 * hoja de estilos del browser lo centra en pantalla (`inset: 0; margin: auto`),
 * que es justo el comportamiento de modal que buscabas.
 *
 * SOPORTE: Chrome 114+, Safari 17+, Firefox 125+. Disponible en todos los
 * browsers modernos desde 2024.
 *
 * DEGRADACION: en un browser sin soporte el atributo se ignora y los dos links
 * quedan visibles en vez de ocultos. Se ve distinto, pero se puede descargar
 * igual: degrada a algo funcional, no a algo roto.
 * ══════════════════════════════════════════════════════════════════════════
 */
const POPOVER_ID = "cv-download-popover";

export function CvDownload() {
  return (
    <>
      <button
        type="button"
        popoverTarget={POPOVER_ID}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-cta font-bold text-foreground transition-colors duration-fast hover:border-accent hover:text-accent"
      >
        DOWNLOAD CV ↓
      </button>

      <div
        id={POPOVER_ID}
        popover="auto"
        aria-labelledby={`${POPOVER_ID}-title`}
        /*
          m-auto NO es decorativo: es un fix obligatorio.

          La hoja de estilos del browser centra las popover con
          `position: fixed; inset: 0; margin: auto`. Pero el preflight de
          Tailwind pone `margin: 0` en todos los elementos y pisa ese `auto`,
          así que la popover queda pegada arriba a la izquierda.

          Se detectó mirando una captura del sitio corriendo. Ningún test de
          los que escribimos lo habría encontrado: el DOM estaba perfecto y el
          único síntoma era visual.
        */
        className="m-auto w-[min(20rem,calc(100vw-3rem))] rounded-lg border border-border bg-surface p-6 text-foreground backdrop:bg-background/70 backdrop:backdrop-blur-sm"
      >
        <h2
          id={`${POPOVER_ID}-title`}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-muted"
        >
          Choose a language
        </h2>

        <ul className="mt-block flex flex-col gap-stack">
          {CV_FILES.map((cv) => (
            <li key={cv.lang}>
              <a
                href={cv.href}
                // download fuerza la descarga en vez de abrir el visor de PDF
                // del browser. Solo funciona con archivos del mismo origen,
                // que es el caso: están en /public.
                download
                hrefLang={cv.lang}
                className="flex min-h-11 items-center justify-between rounded-md border border-border px-4 py-3 text-cta font-bold transition-colors duration-fast hover:border-accent hover:text-accent"
              >
                {cv.label}
                <span aria-hidden="true">↓</span>
                <span className="sr-only">{" (PDF download)"}</span>
              </a>
            </li>
          ))}
        </ul>

        {/*
          Botón de cierre explícito. La popover ya cierra con Escape y con un
          click afuera, pero eso son affordances invisibles: alguien que no las
          conoce necesita ver una salida. popovertargetaction="hide" lo resuelve
          sin JavaScript.
        */}
        <button
          type="button"
          popoverTarget={POPOVER_ID}
          popoverTargetAction="hide"
          className="mt-block min-h-11 w-full text-sm font-semibold text-muted transition-colors duration-fast hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </>
  );
}
