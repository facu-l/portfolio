import Image from "next/image";
import { TechStack } from "./TechStack";
import { ProjectLinks } from "./ProjectLinks";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
};

/**
 * Proyecto secundario: compacto, con la captura como miniatura.
 *
 * LA JERARQUIA LA HACE EL TAMAÑO, NO LA AUSENCIA DE IMAGEN. La primera versión
 * de este componente no llevaba captura para que solo el featured la tuviera.
 * Pero un proyecto sin ninguna imagen se lee como "no hay nada que mostrar", y
 * eso es peor que competir un poco con el destacado. Acá la captura ocupa dos
 * quintos del ancho al lado del texto; en el featured va a sangre y ocupa el
 * ancho completo de la tarjeta. La diferencia sigue siendo obvia de un vistazo.
 *
 * EN MOBILE SE APILA. No hay dos quintos de 390px que sirvan para nada: una
 * miniatura de 150px de ancho de un sitio entero no es información, es ruido.
 *
 * Comparte TechStack y ProjectLinks con FeaturedProject, así el stack y los
 * links se ven y se comportan igual en los dos lugares sin que nadie tenga que
 * acordarse de sincronizar clases.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-md border border-border bg-surface p-6">
      <div className="flex flex-col gap-6 sm:flex-row">
        {project.screenshot && (
          <Image
            src={project.screenshot.src}
            alt={project.screenshot.alt}
            width={project.screenshot.width}
            height={project.screenshot.height}
            sizes="(min-width: 640px) 20rem, 100vw"
            className="h-fit w-full rounded-sm border border-border sm:w-2/5"
          />
        )}

        <div className="min-w-0 flex-1">
          <h3 className="text-h3 font-bold">{project.title}</h3>

          <p className="mt-stack leading-relaxed text-muted">
            {project.summary}
          </p>

          <div className="mt-block">
            <TechStack
              items={project.stack}
              label={`Tech stack for ${project.title}`}
            />
          </div>

          <ProjectLinks
            projectTitle={project.title}
            repoUrl={project.repoUrl}
            liveUrl={project.liveUrl}
          />
        </div>
      </div>
    </article>
  );
}
