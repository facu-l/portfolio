import { Section } from "./Section";
import { FeaturedProject } from "./FeaturedProject";
import { ProjectCard } from "./ProjectCard";
import { FEATURED_PROJECT, OTHER_PROJECTS } from "@/content/projects";

/**
 * Projects. LA UNICA SECCION CON CARDS.
 *
 * Acá la card se gana su existencia: es la unidad que se clickea, no un
 * contenedor decorativo. En el resto del sitio se separa con espacio.
 *
 * UNA SOLA SECCION, NO DOS. El SPEC dibuja "FEATURED PROJECT" y "MORE WORK"
 * como dos bloques, pero dos <Section> apiladas dan el doble de --spacing-
 * section entre los dos proyectos: quedarían más separados entre sí que de
 * About o Skills, que es al revés de lo que son. Acá el <h2> es WORK (el mismo
 * texto del link del navbar) y "More work" es una etiqueta de agrupación, no un
 * heading: los headings de este bloque son los títulos de los proyectos, que es
 * lo que alguien quiere encontrar navegando por headings.
 */
export function Projects() {
  return (
    <Section id="work" title="WORK">
      <FeaturedProject project={FEATURED_PROJECT} />

      {OTHER_PROJECTS.length > 0 && (
        <div className="mt-block">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            More work
          </p>

          <div className="mt-stack flex flex-col gap-stack">
            {OTHER_PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
