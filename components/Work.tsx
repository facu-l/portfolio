import Image from "next/image";
import type { CaseStudy, SiteContent } from "@/content";
import type { Locale } from "@/lib/locale";
import { Section } from "./Section";
import { DecisionCard } from "./DecisionCard";
import { ExternalLink } from "./ExternalLink";

type WorkProps = {
  work: SiteContent["work"];
  cases: CaseStudy[];
  opensInNewTab: string;
  locale: Locale;
};

/**
 * Los dos casos del home. Cada uno muestra lo justo para decidir si vale la
 * pena leer el caso completo: qué es, dónde verlo, una captura y UNA decisión.
 * El resto de las decisiones vive en la página del caso.
 */
export function Work({ work, cases, opensInNewTab, locale }: WorkProps) {
  return (
    <Section id="work" title={work.title}>
      <div className="mt-block flex flex-col gap-section">
        {cases.map((c, i) => (
          <CaseSummary
            key={c.slug}
            caseStudy={c}
            work={work}
            opensInNewTab={opensInNewTab}
            locale={locale}
            // Los casos no repiten el mismo layout: el segundo va espejado.
            mirrored={i % 2 === 1}
          />
        ))}
      </div>
    </Section>
  );
}

type CaseSummaryProps = {
  caseStudy: CaseStudy;
  work: SiteContent["work"];
  opensInNewTab: string;
  locale: Locale;
  mirrored: boolean;
};

function CaseSummary({ caseStudy: c, work, opensInNewTab, locale, mirrored }: CaseSummaryProps) {
  const image = c.gallery[0];

  return (
    <article aria-labelledby={`case-${c.slug}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 id={`case-${c.slug}`} className="text-h2 leading-none font-extrabold tracking-[-0.03em]">
          {c.title}
          <span aria-hidden="true" className="text-accent">
            .
          </span>
        </h3>
        <div className="flex flex-wrap items-center gap-x-5 font-mono text-mono text-muted">
          <span>{c.kind}</span>
          {c.links.map((link) => (
            <ExternalLink
              key={link.href}
              href={link.href}
              opensInNewTab={opensInNewTab}
              className="link-evidence"
            >
              {link.label}
            </ExternalLink>
          ))}
        </div>
      </div>

      <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-foreground/80">{c.summary}</p>

      <div
        className={`mt-8 grid gap-6 ${mirrored ? "md:grid-cols-[1fr_1.3fr]" : "md:grid-cols-[1.3fr_1fr]"}`}
      >
        <figure className={mirrored ? "md:order-2" : undefined}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 768px) 55vw, 100vw"
            className="w-full rounded-sm border border-border"
          />
        </figure>
        <DecisionCard
          decision={c.decisions[0]}
          index={1}
          total={c.decisions.length}
          label={work.decisionLabel}
          ofLabel={work.ofLabel}
          opensInNewTab={opensInNewTab}
        />
      </div>

      <a
        href={`/${locale}/work/${c.slug}`}
        className="link-evidence mt-6 inline-flex min-h-11 items-center gap-2 font-semibold"
      >
        {work.readCase}
        <span aria-hidden="true" className="link-arrow">
          →
        </span>
      </a>
    </article>
  );
}
