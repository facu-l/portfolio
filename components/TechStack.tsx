type TechStackVariant = "inline" | "pills";

type TechStackProps = {
  items: readonly string[];
  /** Nombre accesible de la lista. Hay más de un stack por página. */
  label: string;
  /**
   * `inline` separa con puntos: `React · TypeScript · Rust`. Es la línea de
   * apoyo debajo del título de un proyecto.
   *
   * `pills` dibuja cada item en su propia cápsula. Es para Skills, donde la
   * lista ES el contenido y no un pie de foto.
   *
   * ES UN VARIANT Y NO DOS COMPONENTES a propósito, aunque el archivo lo haya
   * rechazado antes para el tamaño del texto. La diferencia: `className` era
   * una variación de estilo, y esto es una variación de MARCADO. Lo que se
   * comparte no es el look, es la decisión de accesibilidad — el <ul> con
   * aria-label y un <li> por tecnología. Partido en dos archivos, el día que
   * alguien arregle algo del lector de pantalla lo arregla en uno solo.
   */
  variant?: TechStackVariant;
  /**
   * Clases de la <ul>. En `inline` define además tamaño y color del texto,
   * porque ahí el texto es la lista.
   *
   * Es un className y no un prop `size` porque son dos usos, no dos variantes
   * de un sistema: en cuanto haya que inventar nombres como "small" y
   * "prominent" para dos casos, el nombre miente más de lo que aclara.
   */
  className?: string;
};

/**
 * Lista de tecnologías.
 *
 * POR QUE ES UN <ul> Y NO UN STRING CON join(" · "): un lector de pantalla
 * anuncia "lista de 5 elementos" y se puede recorrer item por item. Con un
 * string, lee "React punto medio TypeScript punto medio..." de corrido.
 *
 * SE COMPARTE entre FeaturedProject, ProjectCard y Skills. Es la primitiva que
 * hace que tres lugares distintos no impliquen tres marcados distintos para la
 * misma información (eng review, issue 6).
 */
export function TechStack({
  items,
  label,
  variant = "inline",
  className,
}: TechStackProps) {
  if (variant === "pills") {
    return (
      <ul
        aria-label={label}
        className={`flex flex-wrap gap-2${
          className === undefined ? "" : ` ${className}`
        }`}
      >
        {items.map((item) => (
          /*
            LA CAPSULA SI LLEVA FONDO, Y EL PANEL QUE LA CONTIENE NO.
            Misma razón que el IconBadge: `surface` está a 1.17:1 del fondo, lo
            que no alcanza para separar un panel grande pero sí para separar una
            cápsula de 28px de alto, donde el ojo compara contra el borde que
            tiene pegado. El borde hace la mayor parte del trabajo igual.

            El texto va en `foreground` y nunca en acento: sobre `surface` el
            azul cae a 3.97:1 y falla AA. Es la misma trampa que en las tarjetas
            de proyecto.
          */
          <li
            key={item}
            className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      aria-label={label}
      className={`flex flex-wrap items-center ${className ?? "text-sm text-muted"}`}
    >
      {items.map((item, i) => (
        <li key={item} className="flex items-center">
          {item}
          {/*
            El separador va DESPUES del item, no antes. Puesto antes, cuando la
            lista envuelve el punto queda solo al principio del renglón
            siguiente (`· Express.js`), que se lee como una viñeta rota. Yendo
            al final, se queda pegado al último item de la línea anterior, que
            es donde el ojo lo espera.

            Va en un <span aria-hidden>: es decoración visual, no contenido.
          */}
          {i < items.length - 1 && (
            <span aria-hidden="true" className="px-2 text-muted/50">
              ·
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
