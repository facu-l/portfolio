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
 * POR QUE ES UN COMPONENTE Y NO CLASES SUELTAS EN CADA CTA:
 *
 * `text-cta` son 19px y NO es una decisión estética, es una restricción de
 * accesibilidad. El texto #F5F7FA sobre el azul #007FFF da 3.57:1, que falla
 * AA para texto normal (necesita 4.5:1) y solo pasa como "texto grande" de
 * WCAG, definido como 18.66px en bold.
 *
 * Escrito como clases sueltas en cada botón, alguien lo achica a text-sm en un
 * refactor de estilos y el CTA principal del sitio queda fallando accesibilidad
 * sin que nada avise. Acá el tamaño y el peso son parte del componente: para
 * romperlo hay que venir a este archivo, donde está escrito el porqué.
 */
const BASE =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-6 py-3 text-cta font-bold transition-colors duration-fast";

const VARIANTS: Record<Variant, string> = {
  // Sólido azul. El texto claro sobre este fondo es el caso de los 3.57:1.
  primary: "bg-accent text-foreground hover:bg-accent/90",
  // Contorno. Acá el texto va sobre el fondo de la página: 16.56:1, sin drama.
  secondary:
    "border border-border text-foreground hover:border-accent hover:text-accent",
};

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
    <a href={href} className={`${BASE} ${VARIANTS[variant]}`} {...externalProps}>
      {children}
      {external && (
        <span className="sr-only">(abre en una pestaña nueva)</span>
      )}
    </a>
  );
}
