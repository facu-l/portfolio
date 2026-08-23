import { Section } from "./Section";

/**
 * Skills.
 *
 * DECISION (design review): las 7 categorías NO pesan igual. Adelante y
 * destacadas van Backend, Frontend y AI-assisted workflow. Languages,
 * Databases, Tools y Concepts van como texto secundario.
 *
 * Por qué: un recruiter escanea en 30 segundos. Con 7 bloques de peso idéntico
 * no elige ninguno y se lleva cero.
 *
 * ESQUELETO: falta el contenido de SPEC §5 con esa jerarquía aplicada.
 */
export function Skills() {
  return <Section id="skills" title="SKILLS" />;
}
