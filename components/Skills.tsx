import { Section } from "./Section";
import { Panel } from "./Panel";
import { IconBadge } from "./IconBadge";
import { TechStack } from "./TechStack";
import { SKILL_ICONS } from "./icons";
import { FEATURED_SKILLS, OTHER_SKILLS } from "@/content/skills";

/**
 * Skills.
 *
 * DECISION (design review): las 7 categorías NO pesan igual. Adelante y
 * destacadas van Backend, Frontend y AI-assisted workflow. Languages,
 * Databases, Tools y Concepts van después y más compactas.
 *
 * Por qué: un recruiter escanea en 30 segundos. Con 7 bloques de peso idéntico
 * no elige ninguno y se lleva cero. Con 3, se lleva tres.
 *
 * LA JERARQUIA SOBREVIVIO AL REDISEÑO, Y ESO NO ERA GRATIS. Poner las 7 en la
 * misma grilla de recuadros iguales era lo más directo y habría borrado la
 * decisión de arriba sin que se note: se vería prolijo y comunicaría menos.
 * Las tres destacadas son paneles `md` con nota; las otras cuatro son paneles
 * `sm` sin nota, en una grilla de dos columnas.
 *
 * LAS TECNOLOGIAS AHORA VAN EN CAPSULAS y no separadas por puntos. En una lista
 * de seis items la línea con puntos se lee como una oración larga; en cápsulas
 * cada tecnología es un objeto que el ojo cuenta. Es lo que hace escaneable la
 * sección, que es literalmente su trabajo.
 */
export function Skills() {
  return (
    <Section id="skills" title="SKILLS">
      {/*
        DOS COLUMNAS EN TABLET Y TRES RECIEN EN DESKTOP, y esto se midió en el
        navegador. Con tres columnas desde 768px cada panel queda en ~230px:
        "AI-assisted workflow" se parte en tres líneas, la cápsula "Modular
        architecture" se parte adentro de su propia cápsula y las demás caen de
        a una por renglón. La sección existe para escanearse rápido, y una
        columna de cápsulas apiladas es una lista vertical con bordes.
      */}
      <div className="mt-block grid gap-stack md:grid-cols-2 lg:grid-cols-3">
        {FEATURED_SKILLS.map((category) => {
          const Icon = SKILL_ICONS[category.icon];

          return (
            <Panel key={category.title} className="flex flex-col">
              <div className="flex items-center gap-3">
                <IconBadge icon={Icon} />
                <h3 className="text-h3 font-bold">{category.title}</h3>
              </div>

              {/*
                Los items van primero porque son lo que se escanea. La nota va
                debajo y en gris: la lee quien ya se interesó por la categoría.
              */}
              <TechStack
                items={category.items}
                label={`${category.title} skills`}
                variant="pills"
                className="mt-stack"
              />

              {category.note && (
                <p className="mt-stack text-sm leading-relaxed text-muted">
                  {category.note}
                </p>
              )}
            </Panel>
          );
        })}
      </div>

      {/*
        SIGUE SIENDO UN <dl> AUNQUE AHORA PAREZCA UNA GRILLA DE TARJETAS.

        Esto es "categoría → items", una lista de definiciones. La tentación al
        rediseñar era convertirlo en <ul> con un <h3> por tarjeta, como las
        destacadas — se ve idéntico y rompe dos cosas a la vez: la relación
        dt/dd, y el índice de encabezados, que pasa de tres entradas (las
        categorías que importan) a siete.

        Un <dl> acepta <div> como envoltorio de cada par, así que el panel puede
        ser el item de la grilla sin perder la semántica. El título va en el
        <dt> con peso de negrita, no como heading: se ve igual de importante y
        no compite en la navegación por encabezados.
      */}
      <dl className="mt-stack grid gap-stack sm:grid-cols-2">
        {OTHER_SKILLS.map((category) => {
          const Icon = SKILL_ICONS[category.icon];

          return (
            <Panel size="sm" key={category.title}>
              <dt className="flex items-center gap-3">
                <IconBadge icon={Icon} size="sm" />
                <span className="font-bold">{category.title}</span>
              </dt>

              <dd className="mt-stack">
                <TechStack
                  items={category.items}
                  label={`${category.title} skills`}
                  variant="pills"
                />
              </dd>
            </Panel>
          );
        })}
      </dl>
    </Section>
  );
}
