import { Section } from "./Section";
import { ExternalLink } from "./ExternalLink";
import { BIO, DEGREE, CERTIFICATIONS } from "@/content/about";

/**
 * About. Incluye Education como sub-bloque, no como sección propia del scroll.
 *
 * DECISION (SPEC §3): ambos responden la misma pregunta del visitante —
 * "¿quién es y qué formación tiene?". Separarlos en dos paradas de scroll
 * distintas diluía algo que se lee junto.
 *
 * SIN CARDS (design review): las tres superficies de la paleta están a 1.17:1
 * entre sí y no separan por color. Acá la separación es una línea de 1px y el
 * aire de --spacing-block. En dark UI el aire es la estructura.
 *
 * JERARQUIA: Education es visualmente MENOR que la bio. Es contexto de apoyo,
 * no un segundo título de sección con el mismo peso que ABOUT.
 */
export function About() {
  return (
    <Section id="about" title="ABOUT">
      <p className="mt-block max-w-2xl text-lead leading-relaxed text-muted">
        {BIO}
      </p>

      {/* Separador: una línea, no un cambio de fondo. Ver DESIGN.md. */}
      <div className="mt-block border-t border-border pt-block">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          Education
        </h3>

        <div className="mt-stack">
          <p className="text-h3 font-bold">{DEGREE.title}</p>
          <p className="mt-1 text-sm text-muted">
            {DEGREE.institution} · {DEGREE.detail}
          </p>
        </div>

        <ul className="mt-block flex flex-col gap-block">
          {CERTIFICATIONS.map((cert) => (
            <li key={cert.title}>
              <p className="font-semibold">{cert.title}</p>
              <p className="mt-1 text-sm text-muted">
                {cert.institution} · {cert.detail}
              </p>
              <p className="mt-1 text-sm text-muted">{cert.topics}</p>

              {/*
                El link al repo es lo que convierte una certificación en
                evidencia. "Hice un curso de Spring Boot" es una afirmación;
                "acá está la API que construí en ese curso" se puede verificar.
              */}
              {cert.evidence && (
                <ExternalLink
                  href={cert.evidence.href}
                  className="mt-1 text-sm font-semibold text-accent hover:text-foreground"
                >
                  {cert.evidence.label}
                </ExternalLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
