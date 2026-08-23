import { Section } from "./Section";

/**
 * Projects. LA UNICA SECCION CON CARDS.
 *
 * Acá la card se gana su existencia: es la unidad que se clickea, no un
 * contenedor decorativo. En el resto del sitio se separa con espacio.
 *
 * ESQUELETO: faltan FeaturedProject (ancho completo, screenshot, "View Case
 * Study") y ProjectCard (compacto, "Live Demo"). Son DOS componentes separados
 * a propósito (eng review, issue 6): un solo componente con props booleanas
 * termina en 16 combinaciones posibles de las cuales se usan 2.
 * Datos en content/projects.ts, no hardcodeados acá.
 */
export function Projects() {
  return <Section id="work" title="FEATURED PROJECT" />;
}
