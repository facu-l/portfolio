import { Section } from "./Section";
import { Panel } from "./Panel";
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
 * JERARQUIA: Education es visualmente MENOR que la bio. Es contexto de apoyo,
 * no un segundo título de sección con el mismo peso que ABOUT. Con paneles eso
 * se sostiene con el tamaño del recuadro: la bio va en uno grande, cada
 * estudio en uno chico.
 */
export function About() {
  return (
    <Section id="about" title="ABOUT">
      <Panel className="mt-block">
        <p className="max-w-2xl text-lead leading-relaxed text-muted">{BIO}</p>
      </Panel>

      <div className="mt-block">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          Education
        </h3>

        {/*
          EL TITULO DE GRADO VA SOLO Y A ANCHO COMPLETO; las certificaciones van
          en dos columnas. No es un capricho de layout: la carrera es la
          formación principal y las certificaciones son complemento. Ponerlas
          las tres en la misma grilla las haría ver como tres cosas del mismo
          peso, que es exactamente lo que no son.
        */}
        <Panel size="sm" className="mt-stack">
          <p className="text-h3 font-bold">{DEGREE.title}</p>
          <p className="mt-1 text-sm text-muted">
            {DEGREE.institution} · {DEGREE.detail}
          </p>
        </Panel>

        <ul className="mt-stack grid gap-stack sm:grid-cols-2">
          {CERTIFICATIONS.map((cert) => (
            <Panel as="li" size="sm" key={cert.title}>
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
            </Panel>
          ))}
        </ul>
      </div>
    </Section>
  );
}
