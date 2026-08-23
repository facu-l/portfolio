import Image from "next/image";
import { SITE, SOCIAL_LINKS } from "@/content/site";
import { ButtonLink } from "./Button";
import { CvDownload } from "./CvDownload";

const GITHUB_URL =
  SOCIAL_LINKS.find((l) => l.label === "GitHub")?.href ?? "https://github.com";

/**
 * Hero. SERVER COMPONENT — y tiene que seguir siéndolo.
 *
 * Nada del Hero es Client Component: ni el glow ni el popover del CV necesitan
 * JavaScript. En el App Router "use client" no marca un componente, marca una
 * frontera: todo lo que cuelga debajo se vuelve cliente. Si alguna vez sube a
 * este archivo, el nombre, el título, la foto y los CTAs dejan de existir en el
 * HTML inicial y pasan a depender de que cargue JavaScript. Es exactamente el
 * contenido que un recruiter y un crawler tienen que ver primero.
 *
 * Nota sobre el copy: el SPEC lista una "descripción corta" además del
 * subtítulo. No está acá a propósito — ya cumple su función como meta
 * description en app/layout.tsx, y dos frases de apoyo en el Hero compiten
 * entre sí. El Hero tiene una sola frase de apoyo; la evidencia larga va en
 * About.
 *
 * El glow azul del contorno de la foto (SPEC §2) es puro CSS y vive en este
 * archivo. Hubo una versión con la librería `liquid-gooey`: se descartó porque
 * el efecto de fusión da bordes duros, y lo que se buscaba era un resplandor.
 */
export function Hero() {
  /*
    overflow-x-clip por el glow: se extiende más allá de la caja de la foto, y
    en mobile la foto está centrada con solo 24px de padding. Sin esto, el
    desborde se convierte en scroll horizontal de TODA la página — pasó con la
    versión anterior del efecto y se midió: 419px de contenido en un viewport
    de 390, y 808 en uno de 768.

    `clip` Y NO `hidden`: `overflow-x: hidden` obliga al otro eje a `auto` y
    convierte la sección en un contenedor de scroll, lo que rompe cualquier
    `position: sticky` que quede adentro. `clip` recorta sin crear scroll.
  */
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="overflow-x-clip py-section"
    >
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
              <CvDownload />
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
              Glow azul que rodea el contorno de la foto (SPEC §2).
              Puro CSS: cero JavaScript, cero dependencias.

              -inset-6 Y rounded-lg: el resplandor sale 24px por los CUATRO
              lados y copia el radio de la foto. Antes esto era `inset-4
              rounded-full` — un círculo METIDO ADENTRO de la caja, del que solo
              escapaba el desenfoque. Por eso no rodeaba nada.

              blur-2xl es lo que lo convierte en resplandor. Sin el desenfoque
              esto sería un rectángulo azul con bordes redondeados detrás de la
              foto, que es una forma, no un glow.

              VISIBLE EN REPOSO Y MAS FUERTE EN HOVER: 55% de base, 100% al
              pasar el mouse. Un efecto que solo existe en hover no existe para
              nadie en mobile, y ahí llega la mayoría del tráfico de un link
              compartido. La transición usa --duration-slow, que es la duración
              del sistema para este tipo de cambio.
            */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-lg bg-accent/40 opacity-55 blur-2xl transition-opacity duration-slow group-hover:opacity-100"
            />

            {/*
              bg-background NO ES DECORATIVO: es lo que impide que el glow se
              transparente a través de la foto.

              La máscara de abajo desvanece el 22% inferior de la imagen hasta
              volverlo transparente, y por ese hueco se ve lo que haya detrás.
              Detrás está el glow, así que sin fondo propio el azul teñiría el
              hombro en vez de quedarse en el borde.

              Con el fondo puesto, la máscara desvanece contra
              `--color-background`, que es el mismo color de la página: el
              degradado se ve idéntico, pero ahora tapa.
            */}
            <div className="overflow-hidden rounded-lg bg-background">
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
