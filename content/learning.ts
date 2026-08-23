/**
 * Contenido de la sección Currently Learning.
 *
 * POR QUE ES SECCION PROPIA Y NO PARTE DE ABOUT (SPEC §6): Education son
 * certificaciones ya rendidas — evidencia del pasado. Esto comunica hacia dónde
 * vas. Mezclar pasado y futuro en el mismo bloque diluye los dos mensajes.
 *
 * POR QUE EL PARRAFO Y LA LISTA VAN SEPARADOS: el párrafo da contexto (de dónde
 * venís y por qué), la lista es lo escaneable. Alguien que lee 3 segundos se
 * lleva "LLM engineering, RAG pipelines"; alguien que lee 20 se lleva el porqué.
 * En un solo párrafo, el que lee 3 segundos no se lleva nada.
 */

export const LEARNING_STATEMENT = `Building a structured roadmap to grow as an AI Engineer, following up on hands-on certifications in AI fundamentals with Python and backend development with Java and Spring Boot.`;

/**
 * Lo que viene. Temas, no tecnologías: por eso no reusa TechStack, que separa
 * con puntos una lista de nombres de herramientas.
 */
export const NEXT_UP: readonly string[] = [
  "LLM engineering",
  "RAG pipelines",
  "Applied AI systems",
] as const;
