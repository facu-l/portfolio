type TechStackProps = {
  items: readonly string[];
  /** Nombre accesible de la lista. Hay más de un stack por página. */
  label: string;
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
export function TechStack({ items, label }: TechStackProps) {
  return (
    <ul aria-label={label} className="flex flex-wrap items-center text-sm text-muted">
      {items.map((item, i) => (
        <li key={item} className="flex items-center">
          {i > 0 && (
            <span aria-hidden="true" className="px-2 text-muted/50">
              ·
            </span>
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}
