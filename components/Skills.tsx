import type { CaseStudy, SiteContent } from "@/content";
import type { Locale } from "@/lib/locale";
import { Section } from "./Section";
import { ExternalLink } from "./ExternalLink";

type SkillsProps = {
  skills: SiteContent["skills"];
  cases: CaseStudy[];
  opensInNewTab: string;
  locale: Locale;
};

/**
 * SKILLS CON EVIDENCIA. Cada grupo dice dónde se usó, con link: un caso de este
 * sitio o un repo. Una lista de tecnologías sin contexto es una afirmación;
 * "usado en FALBER" es algo que el lector puede ir a verificar.
 *
 * Por eso no hay íconos ni niveles ("avanzado", barras de progreso): no dicen
 * nada verificable. Grilla de 2 columnas con filete arriba, sin tarjetas: las
 * tarjetas quedan reservadas para las decisiones, que son lo importante.
 */
export function Skills({ skills, cases, opensInNewTab, locale }: SkillsProps) {
  const caseTitle = (slug: string) => cases.find((c) => c.slug === slug)?.title ?? slug;

  return (
    <Section id="skills" title={skills.title}>
      <div className="mt-block grid gap-x-12 gap-y-10 md:grid-cols-2">
        {skills.groups.map((group) => (
          <div key={group.title} className="border-t border-border pt-5">
            <h3 className="text-h3 font-semibold tracking-tight">{group.title}</h3>
            <p className="mt-3 font-mono text-mono leading-relaxed text-foreground/85">
              {group.items.join(", ")}
            </p>
            <p className="mt-4 flex flex-wrap items-center gap-x-4 text-sm text-muted">
              <span>{skills.usedInLabel}:</span>
              {group.cases.map((slug) => (
                <a
                  key={slug}
                  href={`/${locale}/work/${slug}`}
                  className="link-evidence inline-flex min-h-11 items-center font-semibold"
                >
                  {caseTitle(slug)}
                </a>
              ))}
              {group.links.map((link) => (
                <ExternalLink
                  key={link.href}
                  href={link.href}
                  opensInNewTab={opensInNewTab}
                  className="link-evidence font-semibold"
                >
                  {link.label}
                </ExternalLink>
              ))}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
