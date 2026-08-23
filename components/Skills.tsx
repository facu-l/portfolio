import { Section } from "./Section";
import { TechStack } from "./TechStack";
import { FEATURED_SKILLS, OTHER_SKILLS } from "@/content/skills";

/**
 * Skills.
 *
 * DECISION (design review): las 7 categorías NO pesan igual. Adelante y
 * destacadas van Backend, Frontend y AI-assisted workflow. Languages,
 * Databases, Tools y Concepts van como texto secundario.
 *
 * Por qué: un recruiter escanea en 30 segundos. Con 7 bloques de peso idéntico
 * no elige ninguno y se lleva cero. Con 3, se lleva tres.
 *
 * SIN CARDS (DESIGN.md): las tres superficies de la paleta están a 1.17:1 entre
 * sí y no separan por color. Acá la jerarquía la hacen el tamaño del título, el
 * color del texto y una línea de 1px. En dark UI el aire es la estructura.
 *
 * ACA SI SE PUEDE USAR EL ACENTO: el azul sobre el fondo de página da 4.64:1 y
 * pasa AA. Lo que no se puede es azul sobre `surface` (3.97:1), que es por qué
 * en las tarjetas de proyecto los links van en blanco. Misma paleta, distinta
 * regla según el fondo.
 */
export function Skills() {
  return (
    <Section id="skills" title="SKILLS">
      <div className="mt-block grid gap-block md:grid-cols-3">
        {FEATURED_SKILLS.map((category) => (
          <div key={category.title}>
            <h3 className="text-h3 font-bold">{category.title}</h3>

            {/*
              Los items van primero y en el color principal porque son lo que
              se escanea. La nota va debajo y en gris: la lee quien ya se
              interesó por la categoría.
            */}
            <TechStack
              items={category.items}
              label={`${category.title} skills`}
              className="mt-stack text-body text-foreground"
            />

            {category.note && (
              <p className="mt-stack text-sm leading-relaxed text-muted">
                {category.note}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Separador: una línea, no un cambio de fondo. Igual que en About. */}
      <dl className="mt-block border-t border-border pt-block">
        {OTHER_SKILLS.map((category) => (
          /*
            <dl> y no <ul>: esto es "categoría → items", una lista de
            definiciones. Un <ul> con el nombre de la categoría metido adentro
            del <li> pierde esa relación, y un lector de pantalla anuncia el
            label como si fuera un item más.
          */
          <div
            key={category.title}
            className="flex flex-col gap-1 py-2 sm:flex-row sm:gap-6"
          >
            <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-muted sm:w-40 sm:shrink-0">
              {category.title}
            </dt>
            <dd className="text-sm">
              <TechStack
                items={category.items}
                label={`${category.title} skills`}
                className="text-sm text-muted"
              />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
