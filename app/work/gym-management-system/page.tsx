import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TechStack } from "@/components/TechStack";
import { ProjectLinks } from "@/components/ProjectLinks";
import { PROJECTS } from "@/content/projects";

/**
 * Case study del proyecto destacado.
 *
 * RUTA ESTATICA, NO `[slug]`, A PROPOSITO (eng review, Step 0): hay exactamente
 * un case study. Una ruta dinámica para una sola página obliga a escribir
 * generateStaticParams, validación de slug y notFound() que nunca se ejecutan.
 * La migración está documentada en TODOS.md y es barata porque el contenido ya
 * vive en content/projects.ts con su slug.
 *
 * SIN NAVBAR: los links del navbar son anclas (#about, #work) que acá no
 * existen. Un navbar que no navega es peor que no tenerlo — el camino de vuelta
 * es un solo link explícito arriba.
 */
const project = PROJECTS.find((p) => p.slug === "gym-management-system")!;
const caseStudy = project.caseStudy!;

export const metadata: Metadata = {
  title: `${project.title} — Case Study`,
  description: project.summary,
};

/** Los tres bloques del case study tienen la misma forma. Un componente local. */
function CaseStudySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-block border-t border-border pt-block">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
        {title}
      </h2>
      <p className="mt-stack max-w-2xl text-lead leading-relaxed">{children}</p>
    </section>
  );
}

export default function GymManagementSystemCaseStudy() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-section">
      <Link
        href="/#work"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors duration-fast hover:text-foreground"
      >
        <span aria-hidden="true">←</span> Back to work
      </Link>

      <h1 className="mt-stack text-h2 font-black uppercase">{project.title}</h1>

      <p className="mt-stack max-w-2xl text-lead leading-relaxed text-muted">
        {project.summary}
      </p>

      <div className="mt-block">
        <TechStack items={project.stack} label={`Tecnologías de ${project.title}`} />
      </div>

      <ProjectLinks projectTitle={project.title} repoUrl={project.repoUrl} />

      <CaseStudySection title="The Challenge">
        {caseStudy.challenge}
      </CaseStudySection>

      <CaseStudySection title="Team & Workflow">
        {caseStudy.teamAndWorkflow}
      </CaseStudySection>

      <CaseStudySection title="My Role">{caseStudy.myRole}</CaseStudySection>

      {caseStudy.gallery.length > 0 && (
        <section className="mt-block border-t border-border pt-block">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            The System
          </h2>

          {/*
            Las capturas van con figcaption y no solo con alt: acá la imagen es
            el contenido de la página, no un adorno. El texto describe qué mira
            el visitante también cuando la imagen sí se ve.
          */}
          <div className="mt-stack flex flex-col gap-block">
            {caseStudy.gallery.map((shot) => (
              <figure key={shot.src}>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes="(min-width: 1024px) 64rem, 100vw"
                  className="w-full rounded-md border border-border"
                />
                <figcaption className="mt-2 text-sm text-muted">
                  {shot.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
