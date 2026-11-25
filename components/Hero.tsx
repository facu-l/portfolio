import Image from "next/image";
import type { SiteContent } from "@/content";
import { CV_FILES, PERSON } from "@/content/config";
import type { Locale } from "@/lib/locale";
import { ButtonLink } from "./Button";
import { CopyEmailButton } from "./CopyEmailButton";

type HeroProps = {
  hero: SiteContent["hero"];
  locale: Locale;
};

/**
 * El primer pantallazo responde lo que un recruiter busca en 10 segundos:
 * qué rol, qué hace, si está buscando, y cómo bajar el CV o escribirle.
 *
 * CUATRO ELEMENTOS DE TEXTO COMO MAXIMO (rol, frase de valor, estado, CTAs).
 * "Disponible ahora" vive en Contact: acá sería un quinto renglón compitiendo
 * con el CTA.
 *
 * EL h1 ES EL ROL, NO EL NOMBRE. El nombre ya está en la navbar y en el
 * <title>; el h1 es lo que se lee primero y "Junior Full Stack Developer" es
 * la respuesta a la pregunta que el recruiter trae.
 *
 * El punto de estado (lima) es el único punto de color del sitio: comunica un
 * estado real (está buscando trabajo), no es decoración.
 */
export function Hero({ hero, locale }: HeroProps) {
  return (
    <section id="top" aria-labelledby="hero-heading" className="mx-auto w-full max-w-6xl px-4 pt-10 pb-section sm:px-6 md:pt-16">
      <div className="grid items-end gap-10 md:grid-cols-[1.5fr_1fr] md:gap-12">
        <div className="hero-enter">
          <h1
            id="hero-heading"
            className="text-display leading-[0.98] font-extrabold tracking-[-0.035em] text-balance"
          >
            {hero.role}
            <span aria-hidden="true" className="text-accent">
              .
            </span>
          </h1>

          <p className="mt-6 max-w-[40ch] text-lead leading-relaxed text-foreground/80">
            {hero.valueProp}
          </p>

          <p className="mt-7 flex items-center gap-2.5 font-mono text-mono text-muted">
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-accent)_22%,transparent)]"
            />
            <span>{hero.status}</span>
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <ButtonLink href={CV_FILES[locale]} download>
              {hero.cvLabel}
            </ButtonLink>
            <CopyEmailButton
              email={PERSON.email}
              copyLabel={hero.copyLabel}
              copiedLabel={hero.copiedLabel}
              copyFailedLabel={hero.copyFailedLabel}
            />
          </div>
        </div>

        <div className="hero-enter relative mx-auto w-full max-w-[220px] md:mx-0 md:max-w-none">
          <Image
            src="/foto-facu.jpg"
            alt={hero.photoAlt}
            width={1200}
            height={1607}
            /*
              priority: esta imagen es el elemento LCP de la página. Sin esto
              Next la difiere como cualquier otra y el LCP se dispara.
            */
            priority
            sizes="(min-width: 768px) 40vw, 220px"
            className="aspect-[4/5] w-full rounded-sm object-cover grayscale"
          />
          {/* Filete lima en la base de la foto: el mismo acento que el punto final. */}
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-accent" />
        </div>
      </div>
    </section>
  );
}
