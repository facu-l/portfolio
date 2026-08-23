import { TechStack } from "./TechStack";
import { ProjectLinks } from "./ProjectLinks";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
};

/**
 * Proyecto secundario: compacto, sin captura.
 *
 * NO LLEVA CAPTURA A PROPOSITO. Si los dos proyectos se ven igual, no hay
 * featured: hay dos proyectos. La jerarquía la crea la diferencia, y acá la
 * diferencia es la imagen y el tamaño del título (text-h3 contra text-h2).
 *
 * Comparte TechStack y ProjectLinks con FeaturedProject, así el stack y los
 * links se ven y se comportan igual en los dos lugares sin que nadie tenga que
 * acordarse de sincronizar clases.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-md border border-border bg-surface p-6">
      <h3 className="text-h3 font-bold">{project.title}</h3>

      <p className="mt-stack max-w-2xl leading-relaxed text-muted">
        {project.summary}
      </p>

      <div className="mt-block">
        <TechStack
          items={project.stack}
          label={`Tecnologías de ${project.title}`}
        />
      </div>

      <ProjectLinks
        projectTitle={project.title}
        repoUrl={project.repoUrl}
        liveUrl={project.liveUrl}
      />
    </article>
  );
}
