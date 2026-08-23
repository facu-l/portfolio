type TechStackProps = {
  items: readonly string[];
  /** Nombre accesible de la lista. Hay más de un stack por página. */
  label: string;
  /**
   * Tamaño y color del texto. El default es el de una línea de apoyo debajo del
   * título de un proyecto; en Skills, donde la lista ES el contenido de la
   * sección, se pasa una más prominente.
   *
   * Es un className y no un prop `variant` porque son dos usos, no dos
   * variantes de un sistema: en cuanto haya que inventar nombres como "small"
   * y "prominent" para dos casos, el nombre miente más de lo que aclara.
   */
  className?: string;
};

/**
 * Lista de tecnologías separadas por puntos: `React · TypeScript · Rust`.
 *
 * POR QUE ES UN <ul> Y NO UN STRING CON join(" · "): un lector de pantalla
 * anuncia "lista de 5 elementos" y se puede recorrer item por item. Con un
 * string, lee "React punto medio TypeScript punto medio..." de corrido.
 *
 * El separador va en un <span aria-hidden>: es decoración visual, no contenido.
 *
 * SE COMPARTE entre FeaturedProject y ProjectCard. Es la primitiva que hace que
 * dos componentes de tarjeta distintos no impliquen dos estilos distintos para
 * la misma información (eng review, issue 6).
 */
export function TechStack({
  items,
  label,
  className = "text-sm text-muted",
}: TechStackProps) {
  return (
    <ul
      aria-label={label}
      className={`flex flex-wrap items-center ${className}`}
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
