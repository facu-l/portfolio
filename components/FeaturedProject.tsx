import Image from "next/image";
import { TechStack } from "./TechStack";
import { ProjectLinks } from "./ProjectLinks";
import type { Project } from "@/content/projects";

type FeaturedProjectProps = {
  project: Project;
};

/**
 * El proyecto destacado: ancho completo, con captura.
 *
 * POR QUE ES UN COMPONENTE SEPARADO DE ProjectCard, y no el mismo con props
 * (eng review, issue 6): un `<ProjectCard featured showScreenshot showRole />`
 * son 8 combinaciones posibles de las cuales se usan 2, y cada `{featured && }`
 * dentro del JSX hace más difícil leer cómo queda cualquiera de las dos. Dos
 * componentes chicos que comparten TechStack y ProjectLinks se leen de arriba
 * a abajo sin bifurcaciones.
 *
 * LA CAPTURA NO ES DECORACION: es la prueba de que el sistema existe y funciona.
 * Por eso va acá y no en ProjectCard — el featured es el que tiene que
 * convencer.
 */
export function FeaturedProject({ project }: FeaturedProjectProps) {
  const caseStudyHref = project.caseStudy
    ? `/work/${project.caseStudy.slug}`
    : undefined;

  return (
    <article className="mt-block overflow-hidden rounded-md border border-border bg-surface">
      {project.screenshot && (
        <Image
          src={project.screenshot.src}
          alt={project.screenshot.alt}
          width={project.screenshot.width}
          height={project.screenshot.height}
          sizes="(min-width: 1024px) 64rem, 100vw"
          className="w-full border-b border-border"
        />
      )}

      <div className="p-6 sm:p-8">
        <h3 className="text-h2 font-bold">{project.title}</h3>

        <p className="mt-stack max-w-2xl text-lead leading-relaxed text-muted">
          {project.summary}
        </p>

        {/*
          Las contribuciones propias se etiquetan explícitamente. En un proyecto
          de 5 personas, un párrafo sin etiqueta deja que el lector asuma que
          todo es tuyo — y eso se cae en la primera repregunta.
        */}
        {project.contributions && (
          <div className="mt-block max-w-2xl">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Key contributions
            </h4>
            <ul className="mt-stack flex flex-col gap-2">
              {project.contributions.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  {/*
                    El bullet es un <span> propio y no list-style, porque el
                    marcador nativo se alinea con la primera línea y en un item
                    de dos renglones queda pegado al texto. Con flex, el texto
                    sangra parejo y el bullet no se mueve.
                  */}
                  {/*
                    Gris y no azul: DESIGN.md prohíbe el acento sobre `surface`
                    (3.97:1). Un marcador decorativo técnicamente queda exento
                    del mínimo de contraste, pero la regla existe para que nadie
                    tenga que decidir eso caso por caso.
                  */}
                  <span aria-hidden="true" className="text-muted">
                    ▸
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-block">
          <TechStack
            items={project.stack}
            label={`Tecnologías de ${project.title}`}
          />
        </div>

        <ProjectLinks
          projectTitle={project.title}
          caseStudyHref={caseStudyHref}
          repoUrl={project.repoUrl}
          liveUrl={project.liveUrl}
        />
      </div>
    </article>
  );
}
