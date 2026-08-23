import type { ReactNode } from "react";

type SectionProps = {
  /** Ancla para los links del navbar. Ej: "about" -> href="#about" */
  id: string;
  /** Título de la sección. Va como <h2>. Ej: "ABOUT", "FEATURED PROJECT" */
  title: string;
  children?: ReactNode;
};

/**
 * Contenedor de sección: ritmo vertical, ancho de contenido y landmark de
 * accesibilidad, en un solo lugar.
 *
 * POR QUE EXISTE: el espaciado entre secciones es una decisión de página, no de
 * componente. Si cada sección declara su propio padding, para la quinta ya se
 * desincronizaron y nadie sabe cuál es el valor correcto. Acá el ritmo se aplica
 * por construcción: no depende de que alguien se acuerde de usar el token.
 *
 * ACCESIBILIDAD: cada <section> se anuncia con su título vía aria-labelledby,
 * así un lector de pantalla puede listar las secciones y saltar entre ellas.
 * Una <section> sin nombre accesible no es un landmark: es un <div> con otro
 * nombre.
 */
export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="py-section">
      <div className="mx-auto w-full max-w-5xl px-6">
        <h2
          id={headingId}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-muted"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
