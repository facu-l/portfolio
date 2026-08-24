import { Section } from "./Section";
import { Panel } from "./Panel";
import { Eyebrow } from "./Eyebrow";
import { IconBadge } from "./IconBadge";
import { GraduationCapIcon, MedalIcon } from "./icons";
import { ExternalLink } from "./ExternalLink";
import { BIO, DEGREE, CERTIFICATIONS } from "@/content/about";

/**
 * About. Incluye Education como sub-bloque, no como sección propia del scroll.
 *
 * DECISION (SPEC §3): ambos responden la misma pregunta del visitante —
 * "¿quién es y qué formación tiene?". Separarlos en dos paradas de scroll
 * distintas diluía algo que se lee junto.
 *
 * SOBRE LOS RECUADROS: el design review original había decidido que About no
 * llevara cards, y el argumento sigue siendo válido — las tres superficies de
 * la paleta están a 1.17:1 y una card RELLENA no separaría nada. Lo que cambió
 * no es la conclusión sino la herramienta: estos paneles no tienen fondo, se
 * definen con borde y un glow tenue. Ver components/Panel.tsx.
 *
 * EL BIRRETE Y LA MEDALLA NO SON DECORACION. Una carrera universitaria de cinco
 * años y un curso de 80 horas son cosas distintas, y en una pila de recuadros
 * iguales esa diferencia se pierde: quedan como cinco líneas del mismo peso.
 * El icono la comunica antes de que se lea una palabra, y por eso el birrete va
 * SOLO en el título de grado.
 *
 * El icono no viaja en los datos (`content/about.ts`) porque no hace falta: la
 * distinción ya existe en la estructura — DEGREE es un objeto y CERTIFICATIONS
 * es un array. Un campo `icon` sería repetir en cada fila algo que el tipo ya
 * dice, y algo repetido es algo que puede quedar mal.
 *
 * JERARQUIA: Education es visualmente MENOR que la bio. Es contexto de apoyo,
 * no un segundo título de sección con el mismo peso que ABOUT.
 */
export function About() {
  return (
    <Section id="about" title="ABOUT">
      <Panel className="mt-block">
        <p className="max-w-2xl text-lead leading-relaxed text-muted">{BIO}</p>
      </Panel>

      <div className="mt-block">
        <Eyebrow as="h3">Education</Eyebrow>

        {/*
          EL TITULO DE GRADO VA SOLO Y A ANCHO COMPLETO; las certificaciones van
          en dos columnas. No es un capricho de layout: la carrera es la
          formación principal y las certificaciones son complemento. Ponerlas
          las tres en la misma grilla las haría ver como tres cosas del mismo
          peso, que es exactamente lo que no son.
        */}
        <Panel size="sm" className="mt-stack flex items-start gap-4">
          <IconBadge icon={GraduationCapIcon} />

          <div className="min-w-0">
            <p className="text-h3 font-bold">{DEGREE.title}</p>
            <p className="mt-1 text-sm text-muted">
              {DEGREE.institution} · {DEGREE.detail}
            </p>
          </div>
        </Panel>

        <ul className="mt-stack grid gap-stack sm:grid-cols-2">
          {CERTIFICATIONS.map((cert) => (
            <Panel
              as="li"
              size="sm"
              key={cert.title}
              className="flex items-start gap-4"
            >
              <IconBadge icon={MedalIcon} />

              {/*
                min-w-0 en la columna de texto: sin esto, un item de flex no
                baja de su ancho de contenido y el título más largo desborda la
                tarjeta en vez de partirse en dos líneas.
              */}
              <div className="min-w-0">
                <p className="font-semibold">{cert.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {cert.institution} · {cert.detail}
                </p>
                <p className="mt-1 text-sm text-muted">{cert.topics}</p>

                {/*
                  El link al repo es lo que convierte una certificación en
                  evidencia. "Hice un curso de Spring Boot" es una afirmación;
                  "acá está la API que construí en ese curso" se puede verificar.

                  ESTE LINK ES LA RAZON POR LA QUE EL PANEL NO TIENE FONDO: el
                  azul sobre el fondo de página da 4.64:1 y pasa AA; sobre
                  `surface` da 3.97:1 y falla. Rellenar el recuadro rompería un
                  contraste que hoy está bien, y no se vería distinto.
                */}
                {cert.evidence && (
                  <ExternalLink
                    href={cert.evidence.href}
                    className="mt-1 text-sm font-semibold text-accent hover:text-foreground"
                  >
                    {cert.evidence.label}
                  </ExternalLink>
                )}
              </div>
            </Panel>
          ))}
        </ul>
      </div>
    </Section>
  );
}
