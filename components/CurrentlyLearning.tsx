import { Section } from "./Section";
import { Panel } from "./Panel";
import { LEARNING_STATEMENT } from "@/content/learning";

/**
 * Currently Learning. Sección propia y no fusionada con About:
 * Education es evidencia del pasado, esto comunica hacia dónde vas.
 *
 * YA NO ESTA "NEXT UP" NI LA LISTA DE TEMAS. Era la parte escaneable de la
 * sección — quien leía 3 segundos se llevaba "LLM engineering, RAG pipelines"
 * sin leer el párrafo. Sacarla deja un solo párrafo, así que ahora la sección
 * se lee entera o no se lleva nada. Es una decisión de contenido válida y está
 * tomada a propósito; queda anotada acá para que si algún día la sección se
 * siente muda, se sepa qué se quitó y por qué.
 *
 * Con eso también se fue el único uso del acento como marca de bloque en el
 * sitio: el tono `accent` de Eyebrow quedó sin usar y se eliminó.
 */
export function CurrentlyLearning() {
  return (
    <Section id="learning" title="CURRENTLY LEARNING">
      <Panel className="mt-block">
        {/*
          EL TEXTO VA ADENTRO DEL <p>, no al lado.

          Estuvo un rato así:
            <p className="text-lead text-muted"></p>
            {LEARNING_STATEMENT}

          El párrafo vacío y el texto suelto como nodo hermano. Renderiza, no
          rompe el build y ningún test lo vio: el texto seguía estando en la
          página, solo que sin ninguna de sus clases — 16px blanco a lo ancho
          del panel en vez de 18px gris limitado a max-w-2xl. Es el tipo de bug
          que solo se ve mirando la página al lado de otra sección.
        */}
        <p className="max-w-2xl text-lead leading-relaxed text-muted">
          {LEARNING_STATEMENT}
        </p>
      </Panel>
    </Section>
  );
}
