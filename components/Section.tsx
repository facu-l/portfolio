import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  /** Ancla para los links del navbar. Ej: "work" -> href="#work" */
  id: string;
  /** Título de la sección, sin punto final: el punto lo agrega el componente. */
  title: string;
  children?: ReactNode;
};

/**
 * Contenedor de sección: ritmo vertical, ancho de contenido y landmark de
 * accesibilidad, en un solo lugar.
 *
 * ACCESIBILIDAD: cada <section> se anuncia con su título vía aria-labelledby,
 * así un lector de pantalla puede listar las secciones y saltar entre ellas.
 *
 * EL PUNTO FINAL EN LIMA es la firma del Casebook (igual que en el nombre de la
 * navbar). Va en un <span aria-hidden>: es un gesto visual, un lector de
 * pantalla no tiene por qué leer "Work punto".
 *
 * ANTES el título entraba letra por letra con anime.js. Se sacó: demoraba la
 * lectura de lo único que un recruiter escanea (los títulos) y no comunicaba
 * nada. El título ahora es HTML del servidor, sin JavaScript.
 */
export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-heading`;

  /*
    EL id Y EL aria-labelledby QUEDAN FUERA DEL REVEAL, a propósito: si el
    elemento con el id se trasladara con translateY, el scroll del navbar
    aterrizaría corrido mientras dura la animación.
  */
  return (
    <section id={id} aria-labelledby={headingId} className="py-section">
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2
          id={headingId}
          className="text-section font-extrabold tracking-tight text-foreground"
        >
          {title}
          <span aria-hidden="true" className="text-accent">
            .
          </span>
        </h2>
        {children}
      </Reveal>
    </section>
  );
}
