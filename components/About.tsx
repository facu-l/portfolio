import type { SiteContent } from "@/content";
import { Section } from "./Section";
import { ExternalLink } from "./ExternalLink";

type AboutProps = {
  about: SiteContent["about"];
  opensInNewTab: string;
};

/**
 * Quién es, después de haber visto qué hizo. Va DESPUES de Work y Skills a
 * propósito: un recruiter técnico evalúa primero la evidencia.
 *
 * Dos columnas: a la izquierda la bio y cómo trabaja; a la derecha la
 * formación. La línea freelance va al final y sola: es un dato honesto, no
 * el mensaje principal (ver spec §3, relación con Falber Studio).
 */
export function About({ about, opensInNewTab }: AboutProps) {
  return (
    <Section id="about" title={about.title}>
      <div className="mt-block grid gap-x-12 gap-y-block md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="max-w-[62ch] text-lead leading-relaxed text-foreground/85">{about.bio}</p>

          <h3 className="mt-block font-mono text-mono text-muted">{about.howIWorkTitle}</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {about.howIWork.map((line) => (
              <li key={line} className="flex gap-3 leading-relaxed text-foreground/85">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-mono text-muted">{about.educationTitle}</h3>
          <ul className="mt-4 flex flex-col divide-y divide-border border-y border-border">
            <li className="py-5">
              <h4 className="font-semibold">{about.degree.title}</h4>
              <p className="mt-1 text-sm text-muted">
                {about.degree.institution} · {about.degree.detail}
              </p>
            </li>
            {about.certifications.map((cert) => (
              <li key={cert.title} className="py-5">
                <h4 className="font-semibold">{cert.title}</h4>
                <p className="mt-1 text-sm text-muted">
                  {cert.institution} · {cert.detail}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{cert.topics}</p>
                {cert.evidence && (
                  <ExternalLink
                    href={cert.evidence.href}
                    opensInNewTab={opensInNewTab}
                    className="link-evidence font-mono text-mono"
                  >
                    {cert.evidence.label}
                  </ExternalLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-block text-muted">{about.freelance}</p>
    </Section>
  );
}
