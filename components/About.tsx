import { Section } from "./Section";

/**
 * About. Incluye Education como sub-bloque, no como sección propia del scroll
 * (decisión del SPEC §3: ambos responden la misma pregunta del visitante).
 *
 * SIN CARDS (design review): las tres superficies de la paleta están a 1.17:1
 * entre sí y no separan por color. Acá se separa con espacio y tipografía.
 *
 * ESQUELETO: falta la bio (SPEC §3) y el sub-bloque de Education con las dos
 * certificaciones.
 */
export function About() {
  return <Section id="about" title="ABOUT" />;
}
