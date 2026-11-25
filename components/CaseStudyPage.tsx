import Image from "next/image";
import type { ReactNode } from "react";
import type { CaseStudy, SiteContent } from "@/content";
import type { Locale } from "@/lib/locale";
import { DecisionCard } from "./DecisionCard";
import { ExternalLink } from "./ExternalLink";
import { TechStack } from "./TechStack";

type CaseStudyPageProps = {
  caseStudy: CaseStudy;
  work: SiteContent["work"];
  opensInNewTab: string;
  locale: Locale;
};

/**
 * La página completa de un caso. Orden pensado para un líder técnico que
 * evalúa: el contexto (problema, rol, equipo), cómo se trabajó, TODAS las
 * decisiones con su evidencia, y recién después las pantallas.
 *
 * Las decisiones van antes que la galería a propósito: las capturas muestran
 * que el proyecto existe; las decisiones muestran cómo piensa quien lo hizo.
 */
export function CaseStudyPage({ caseStudy: c, work, opensInNewTab, locale }: CaseStudyPageProps) {
  const { sections } = work;

  return (
    <article className="mx-auto w-full max-w-6xl px-4 pt-8 pb-section sm:px-6 md:pt-12">
      <a
        href={`/${locale}#work`}
        className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors duration-fast hover:text-foreground"
      >
        <span aria-hidden="true">←</span> {work.backToWork}
      </a>

      <header className="mt-6">
        <h1 className="text-display leading-none font-extrabold tracking-[-0.035em]">
          {c.title}
          <span aria-hidden="true" className="text-accent">
            .
          </span>
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 font-mono text-mono text-muted">
          <span>{c.kind}</span>
          {c.links.map((link) => (
            <ExternalLink key={link.href} href={link.href} opensInNewTab={opensInNewTab} className="link-evidence">
              {link.label}
            </ExternalLink>
          ))}
        </div>
        <p className="mt-6 max-w-[62ch] text-lead leading-relaxed text-foreground/80">{c.summary}</p>
      </header>

      <div className="mt-section grid gap-x-12 gap-y-block md:grid-cols-2">
        <Block title={sections.problem}>{c.problem}</Block>
        <Block title={sections.role}>{c.role}</Block>
        {c.team && <Block title={sections.team}>{c.team}</Block>}
        {c.aiWorkflow && (
          <aside aria-label={sections.aiWorkflow} className="rounded-sm border border-border p-6">
            <p className="font-mono text-mono text-accent">{sections.aiWorkflow}</p>
            <p className="mt-3 leading-relaxed text-foreground/85">{c.aiWorkflow}</p>
          </aside>
        )}
      </div>

      <section aria-labelledby="decisions-heading" className="mt-section">
        <SectionHeading id="decisions-heading">{sections.decisions}</SectionHeading>
        <ol className="mt-block grid gap-6 md:grid-cols-2">
          {c.decisions.map((decision, i) => (
            <li
              key={decision.title}
              // Con una cantidad impar, la última ocupa las dos columnas: una
              // grilla con un hueco al final se lee como contenido que falta.
              className={c.decisions.length % 2 === 1 && i === c.decisions.length - 1 ? "md:col-span-2" : undefined}
            >
              <DecisionCard
                decision={decision}
                index={i + 1}
                total={c.decisions.length}
                label={work.decisionLabel}
                ofLabel={work.ofLabel}
                opensInNewTab={opensInNewTab}
                headingLevel={3}
              />
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="gallery-heading" className="mt-section">
        <SectionHeading id="gallery-heading">{sections.gallery}</SectionHeading>
        <div className="mt-block grid gap-8 md:grid-cols-2">
          {c.gallery.map((shot) => (
            <figure key={shot.src}>
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full rounded-sm border border-border"
              />
              {shot.caption && (
                <figcaption className="mt-3 text-sm leading-relaxed text-muted">{shot.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>

      <section aria-labelledby="stack-heading" className="mt-section">
        <SectionHeading id="stack-heading">{sections.stack}</SectionHeading>
        <TechStack items={c.stack} label={sections.stack} variant="pills" className="mt-6 font-mono" />
      </section>
    </article>
  );
}

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-section font-extrabold tracking-tight">
      {children}
      <span aria-hidden="true" className="text-accent">
        .
      </span>
    </h2>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-mono text-muted">{title}</h2>
      <p className="mt-3 leading-relaxed text-foreground/85">{children}</p>
    </div>
  );
}
