import { Section } from "./Section";
import { Panel } from "./Panel";
import { Eyebrow } from "./Eyebrow";
import { LEARNING_STATEMENT } from "@/content/learning";

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
      <Panel className="mt-block">
        <p className="max-w-2xl text-lead leading-relaxed text-muted"></p>
        {LEARNING_STATEMENT}
      </Panel>
    </Section>
  );
}
