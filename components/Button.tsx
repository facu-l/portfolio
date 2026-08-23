import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  /** Abre en pestaña nueva. Agrega rel de seguridad automáticamente. */
  external?: boolean;
  children: ReactNode;
};

/**
 * Botón-link del sitio.
 *
 * EL BOTON PRIMARIO LLEVA TEXTO OSCURO SOBRE EL AZUL, Y ESO ES LO QUE PERMITE
 * QUE SEA CHICO.
 *
 * Antes era texto claro (#F5F7FA) sobre el azul #007FFF: **3.57:1**, que falla
 * AA para texto normal (necesita 4.5:1) y solo pasa como "texto grande" de
 * WCAG, definido como 18.66px en bold. Por eso el botón estaba clavado en 19px:
 * no era una decisión estética, era la única forma de que ese contraste fuera
 * legal.
 *
 * Invirtiendo el texto a #16181C (el fondo de la página) sobre el mismo azul,
 * el contraste sube a **4.64:1** y pasa AA para texto normal. La restricción de
 * tamaño desaparece porque desaparece su causa, no porque la ignoremos.
 *
 * POR QUE ES UN COMPONENTE Y NO CLASES SUELTAS EN CADA CTA: para romper el
 * contraste hay que venir a este archivo, donde está escrito el porqué. Con
 * clases sueltas, alguien le pone `text-foreground` al primario en un refactor
 * de estilos y el CTA principal del sitio vuelve a fallar sin que nada avise.
 */
const BASE =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-body font-semibold transition-colors duration-fast";

const VARIANTS: Record<Variant, string> = {
  /*
    Sólido azul con texto OSCURO: 4.64:1, pasa AA para texto normal.
    Ver el comentario de arriba antes de cambiar cualquiera de los dos colores.
  */
  primary: "bg-accent text-background hover:bg-accent/90",
  // Contorno. Acá el texto va sobre el fondo de la página: 16.56:1, sin drama.
  secondary:
    "border border-border text-foreground hover:border-accent hover:text-accent",
};

/**
 * Las clases de un botón, para el caso en que el elemento NO puede ser un <a>.
 *
 * El submit de un formulario tiene que ser un <button type="submit"> de verdad:
 * un <a> con onClick no se dispara con Enter desde un input, no participa del
 * submit nativo y le miente al lector de pantalla sobre lo que va a pasar.
 *
 * Exportar las clases (y no duplicarlas en el form) es lo que mantiene la
 * restricción de los 19px en un solo lugar: el día que alguien la cambie acá,
 * cambia en los dos.
 */
export function buttonClasses(variant: Variant = "primary") {
  return `${BASE} ${VARIANTS[variant]}`;
}

export function ButtonLink({
  href,
  variant = "primary",
  external = false,
  children,
}: ButtonLinkProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a href={href} className={buttonClasses(variant)} {...externalProps}>
      {children}
      {external && (
        <span className="sr-only">{" (opens in a new tab)"}</span>
      )}
    </a>
  );
}
