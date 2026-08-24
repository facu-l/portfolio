import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SplitHeading } from "./SplitHeading";

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
 *
 * LA APARICION AL SCROLL VIVE ACA, Y NO EN CADA SECCION. Es la misma razón que
 * el ritmo vertical: si cada sección se acuerda de envolverse en <Reveal>, la
 * quinta no lo va a hacer. Puesto acá, es por construcción.
 */
export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-heading`;

  /*
    EL id Y EL aria-labelledby QUEDAN FUERA DEL REVEAL, a propósito.

    Un ancla del navbar (#about) apunta a este <section>. Si el elemento que
    lleva el id fuera el que se traslada con translateY, el scroll del navbar
    aterrizaría a 24px del lugar correcto mientras dura la animación. El <div>
    animado es interno y no tiene ninguna responsabilidad estructural.
  */
  return (
    <section id={id} aria-labelledby={headingId} className="py-section">
      <Reveal className="mx-auto w-full max-w-5xl px-6">
        {/*
          EL TITULO AHORA MIDE 22-32px, contra los 18px de antes. No es que se
          agrandó porque sí: medía menos de la mitad que el título de un proyecto
          que vive ADENTRO de esta misma sección (40px), así que el nivel del
          encabezado decía una cosa y el tamaño decía la contraria.

          Le entran las letras de a una al aparecer. Eso vive en SplitHeading
          porque necesita JavaScript; la receta tipográfica sigue viniendo de
          Eyebrow, que es la que comparte con "Education" y "More work".
        */}
        <SplitHeading id={headingId}>{title}</SplitHeading>
        {children}
      </Reveal>
    </section>
  );
}
