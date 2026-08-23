import { Section } from "./Section";
import { LEARNING_STATEMENT, NEXT_UP } from "@/content/learning";

/**
 * Currently Learning. Sección propia y no fusionada con About:
 * Education es evidencia del pasado, esto comunica hacia dónde vas.
 *
 * SIN CARDS, como el resto del sitio salvo Projects (ver DESIGN.md).
 *
 * EL ACENTO SE USA ACA Y NO EN LAS TARJETAS: sobre el fondo de página el azul
 * da 4.64:1 y pasa AA; sobre `surface` da 3.97:1 y falla. Esta sección está
 * sobre el fondo, así que "Next up" puede ir en azul. Es el único lugar del
 * sitio donde el acento marca un bloque de texto, y es a propósito: la sección
 * habla del futuro y el color la separa de la evidencia del pasado.
 */
export function CurrentlyLearning() {
  return (
    <Section id="learning" title="CURRENTLY LEARNING">
      <p className="mt-block max-w-2xl text-lead leading-relaxed text-muted">
        {LEARNING_STATEMENT}
      </p>

      <div className="mt-block">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Next up
        </h3>

        <ul className="mt-stack flex flex-col gap-2">
          {NEXT_UP.map((topic) => (
            <li key={topic} className="text-h3 font-bold">
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
