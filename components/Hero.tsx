import Image from "next/image";
import { SITE, SOCIAL_LINKS, CV_PATH } from "@/content/site";
import { ButtonLink } from "./Button";

const GITHUB_URL =
  SOCIAL_LINKS.find((l) => l.label === "GitHub")?.href ?? "https://github.com";

/**
 * Hero. SERVER COMPONENT — y tiene que seguir siéndolo.
 *
 * La directiva "use client" va SOLO en LiquidGooey.tsx, nunca acá. En el App
 * Router "use client" no marca un componente, marca una frontera: todo lo que
 * cuelga debajo se vuelve cliente. Si sube a este archivo, el nombre, el
 * título, la foto y los CTAs dejan de existir en el HTML inicial y pasan a
 * depender de que cargue JavaScript. Es exactamente el contenido que un
 * recruiter y un crawler tienen que ver primero.
 *
 * Nota sobre el copy: el SPEC lista una "descripción corta" además del
 * subtítulo. No está acá a propósito — ya cumple su función como meta
 * description en app/layout.tsx, y dos frases de apoyo en el Hero compiten
 * entre sí. El Hero tiene una sola frase de apoyo; la evidencia larga va en
 * About.
 *
 * PENDIENTE: el efecto líquido alrededor de la foto (SPEC §2). Va último a
 * propósito: es la pieza más riesgosa y el Hero tiene que funcionar sin ella.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="py-section">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="grid gap-block md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16">
          {/* --- Columna de contenido --- */}
          <div>
            <h1
              id="hero-heading"
              className="text-display font-black uppercase leading-[0.92] tracking-tight"
            >
              Full Stack
              <br />
              Developer
            </h1>

            <p className="mt-block max-w-md text-lead text-muted">
              {SITE.tagline}
            </p>

            <div className="mt-block flex flex-wrap gap-4">
              <ButtonLink href="#work">VIEW MY WORK</ButtonLink>
              <ButtonLink href={GITHUB_URL} variant="secondary" external>
                GITHUB ↗
              </ButtonLink>
              <ButtonLink href={CV_PATH} variant="secondary" external>
                DOWNLOAD CV ↓
              </ButtonLink>
            </div>

            <p className="mt-block text-sm text-muted">{SITE.location}</p>
          </div>

          {/* --- Columna de la foto --- */}
          {/*
            En mobile la foto va DEBAJO del contenido, no arriba.
            Con max-w-xs y ratio 3:4 la foto mide ~427px de alto: puesta arriba
            empuja el titular abajo del fold en un teléfono chico, y el titular
            es el mensaje. Además así el orden visual coincide con el orden del
            DOM en todos los viewports.
          */}
          <div className="group relative mx-auto w-full max-w-xs md:max-w-none">
            {/*
              Glow azul detrás de la foto. Aparece en hover (SPEC §2).
              -z-10 lo manda atrás; blur-3xl lo difumina para que sea un
              resplandor y no una forma. Es puro CSS: cero JavaScript.
            */}
            <div
              aria-hidden="true"
              className="absolute inset-4 -z-10 rounded-full bg-accent/25 opacity-0 blur-3xl transition-opacity duration-slow group-hover:opacity-100"
            />

            <div className="overflow-hidden rounded-lg">
              <Image
                src="/foto-facu.jpg"
                alt={`${SITE.name}, ${SITE.role}`}
                width={1200}
                height={1607}
                /*
                  priority: esta imagen es el elemento LCP de la página. Sin
                  esto Next la difiere como cualquier otra y el LCP se dispara.
                  El screenshot del dashboard, que está abajo del fold, va sin
                  priority a propósito: marcar todo como prioritario equivale a
                  no marcar nada.
                */
                priority
                sizes="(max-width: 768px) 20rem, 40vw"
                className="h-auto w-full scale-105 transition-transform duration-slow group-hover:scale-110"
                style={{
                  // Difumina el borde inferior para que la foto se integre con
                  // el fondo grafito en vez de leerse como un recorte pegado
                  // encima (SPEC §2).
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 78%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, black 78%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
