import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  /** Abre en pestaña nueva. Agrega rel de seguridad automáticamente. */
  external?: boolean;
  /** Descarga el archivo en vez de abrirlo (ej. el CV en PDF). */
  download?: boolean;
  children: ReactNode;
};

/**
 * Botón-link del sitio. Píldora (es la única forma redondeada del sitio: las
 * superficies van a 4px).
 *
 * EL PRIMARIO ES BLANCO, NO LIMA. El lima marca lo verificable (links a código,
 * estado, foco); si el botón más grande de la pantalla fuera lima, el acento
 * dejaría de significar algo. Texto #0c0d0f sobre #eef0f2: ~17:1.
 *
 * POR QUE ES UN COMPONENTE Y NO CLASES SUELTAS EN CADA CTA: para cambiar el par
 * de colores hay que venir a este archivo, donde está escrito el porqué.
 */
const BASE =
  "btn-pill inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-body font-semibold whitespace-nowrap";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-foreground text-background hover:bg-foreground/85",
  // Contorno sobre el fondo de la página: el texto mantiene ~17:1.
  secondary: "border border-border text-foreground hover:border-foreground",
};

/**
 * Las clases de un botón, para el caso en que el elemento NO puede ser un <a>.
 *
 * El submit de un formulario tiene que ser un <button type="submit"> de verdad:
 * un <a> con onClick no se dispara con Enter desde un input y le miente al
 * lector de pantalla sobre lo que va a pasar.
 */
export function buttonClasses(variant: Variant = "primary") {
  return `${BASE} ${VARIANTS[variant]}`;
}

export function ButtonLink({
  href,
  variant = "primary",
  external = false,
  download = false,
  children,
}: ButtonLinkProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <a
      href={href}
      className={buttonClasses(variant)}
      download={download || undefined}
      {...externalProps}
    >
      {children}
    </a>
  );
}
