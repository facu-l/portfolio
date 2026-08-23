import { ButtonLink } from "./Button";
import { ExternalLink } from "./ExternalLink";

type ProjectLinksProps = {
  /** Ruta interna al case study. Si existe, es el CTA principal. */
  caseStudyHref?: string;
  repoUrl?: string;
  liveUrl?: string;
  /** Para distinguir "View Case Study" de "Live Demo" en el nombre accesible. */
  projectTitle: string;
};

/**
 * Fila de links de un proyecto. Compartida por FeaturedProject y ProjectCard.
 *
 * TODOS LOS LINKS SON OPCIONALES A PROPOSITO. Un proyecto sin repo público
 * renderiza sin ese botón. La alternativa —un href placeholder— es peor que no
 * tener el link: el visitante clickea, cae en un 404 y lo que aprende no es
 * "faltaba el repo", es "este sitio está roto".
 *
 * COLOR: los links secundarios van en `text-foreground`, no en azul. El azul
 * sobre `bg-surface` da 3.97:1 y falla AA para texto normal (ver DESIGN.md).
 * El hover subraya en vez de cambiar de color, así el estado hover tampoco
 * cae por debajo del umbral.
 */
export function ProjectLinks({
  caseStudyHref,
  repoUrl,
  liveUrl,
  projectTitle,
}: ProjectLinksProps) {
  const hasAny = caseStudyHref || repoUrl || liveUrl;
  if (!hasAny) return null;

  return (
    <div className="mt-block flex flex-wrap items-center gap-x-6 gap-y-2">
      {caseStudyHref && (
        <ButtonLink href={caseStudyHref}>
          View Case Study
          <span aria-hidden="true">→</span>
          <span className="sr-only">{` for ${projectTitle}`}</span>
        </ButtonLink>
      )}

      {liveUrl && (
        <ExternalLink
          href={liveUrl}
          className="font-semibold text-foreground underline-offset-4 hover:underline"
        >
          Live Demo
          <span className="sr-only">{` for ${projectTitle}`}</span>
        </ExternalLink>
      )}

      {repoUrl && (
        <ExternalLink
          href={repoUrl}
          className="font-semibold text-foreground underline-offset-4 hover:underline"
        >
          GitHub
          <span className="sr-only">{` for ${projectTitle}`}</span>
        </ExternalLink>
      )}
    </div>
  );
}
