import Image from "next/image";
import { SITE } from "@/content/site";
import { ButtonLink } from "./Button";
import { CvDownload } from "./CvDownload";
import { SocialIconLinks } from "./SocialIconLinks";

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
            {/*
              JERARQUIA: saludo → NOMBRE → rol.

              Antes el h1 era "FULL STACK DEVELOPER" a tamaño display. El
              problema no era el tamaño, era qué ocupaba el lugar más grande de
              la página: un puesto que comparten millones de personas. El nombre
              es lo único irrepetible acá, y es lo que tiene que quedar cuando
              alguien cierra la pestaña.

              EL SALUDO NO ES DECORACION NI ES EL TITULO. Va chico y en gris
              porque es tejido conectivo: sin él, "FACUNDO LAMBERTUCCI" solo,
              gigante, se lee como una portada. Con él, se lee como alguien
              presentándose.

              Los tres van DENTRO del h1 con <span> de bloque, no como elementos
              separados. Un lector de pantalla anuncia un solo encabezado:
              "Hi, I'm Facundo Lambertucci, Full Stack Developer". Partirlo en
              h1 + p sueltos rompe esa frase en pedazos sin relación.
            */}
            <h1 id="hero-heading" className="text-balance">
              <span className="block text-lead text-muted">
                {SITE.greeting}
              </span>

              <span className="mt-2 block text-display font-black uppercase leading-[0.95] tracking-tight">
                {SITE.name}
              </span>

              {/*
                El rol en acento: es la promesa del sitio y lo que un recruiter
                busca en los primeros 3 segundos. Sobre el fondo de página el
                azul da 4.64:1 y pasa AA — la restricción de DESIGN.md es no
                usarlo sobre `surface` (3.97:1), y acá no hay surface.
              */}
              <span className="mt-stack block text-h2 font-bold text-accent">
                {SITE.role}
              </span>
            </h1>

            <p className="mt-block max-w-md text-lead text-muted">
              {SITE.tagline}
            </p>

            {/*
              DOS ACCIONES ARRIBA, LAS REDES ABAJO Y MAS CHICAS.

              Antes había tres botones del mismo tamaño en una fila: ver el
              trabajo, GitHub y el CV. Tres CTAs con el mismo peso no son una
              jerarquía, son un menú — el visitante elige el que le queda más
              cerca, no el que importa.

              Arriba quedan las dos acciones que querés que haga alguien que
              recién llega. GitHub bajó a la fila de iconos, que es donde
              cualquiera espera encontrarlo, y de paso dejó de competir con el
              CV por atención.
            */}
            <div className="mt-block flex flex-wrap gap-3">
              <ButtonLink href="#work">VIEW MY WORK</ButtonLink>
              <CvDownload />
            </div>

            <SocialIconLinks />

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
              Glow azul alrededor de la foto (SPEC §2). Puro CSS: cero
              JavaScript, cero dependencias.

              ES UNA CAJA INVISIBLE QUE SOLO PROYECTA SOMBRA, y termina al 80%
              de la altura de la foto. Las dos cosas son deliberadas:

              1. `box-shadow` y no un div relleno y desenfocado. El navegador
                 dibuja la sombra exterior POR FUERA de la caja y nunca por
                 debajo, así que el azul no puede colarse por el hueco que deja
                 la máscara de la foto. Un div relleno obliga a taparlo con un
                 fondo opaco, y ahí se pierde el desvanecimiento.

              2. `bottom-[20%]` en vez de cubrir toda la foto. Si la caja llega
                 hasta abajo, su sombra dibuja un contorno nítido justo donde la
                 imagen se está disolviendo: queda un rectángulo vacío marcado
                 debajo de la foto. Terminándola antes, el glow se apaga en el
                 mismo lugar donde la foto se desvanece.

              Los bordes de esta caja no se ven nunca: no tiene fondo y está
              detrás de la parte opaca de la imagen. Lo único que aporta es la
              sombra.

              Los valores viven como tokens en globals.css: ningún color
              hardcodeado acá (regla número uno de DESIGN.md).
            */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 bottom-[20%] -z-10 rounded-lg shadow-glow transition-shadow duration-slow group-hover:shadow-glow-strong"
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
                  /*
                    Difumina el borde inferior para que la foto se integre con
                    el fondo grafito en vez de leerse como un recorte pegado
                    encima (SPEC §2).

                    TERMINA EN 93% Y NO EN 100%, y eso es lo que hace que el
                    desvanecimiento se vea. `scale-105` agranda la imagen un 5%
                    y el contenedor recorta el sobrante: lo último visible es el
                    ~97.6% de la imagen. Con el degradado terminando en 100%, el
                    corte caía donde todavía quedaba ~11% de opacidad, y ese 11%
                    dibujaba una línea horizontal nítida. Cerrando en 93%, para
                    cuando llega el recorte ya no queda nada que cortar.

                    El 93% también aguanta el hover: con `scale-110` lo visible
                    baja al ~95.2%, y sigue estando después del final.
                  */
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 74%, transparent 93%)",
                  maskImage:
                    "linear-gradient(to bottom, black 74%, transparent 93%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
