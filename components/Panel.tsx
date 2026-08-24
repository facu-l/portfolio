import type { ElementType, ReactNode } from "react";

type PanelSize = "md" | "sm";

type PanelProps = {
  /** Elemento a renderizar. `li` para ítems de lista, `article` para tarjetas. */
  as?: ElementType;
  /** `md` para bloques de sección, `sm` para ítems dentro de un bloque. */
  size?: PanelSize;
  className?: string;
  children: ReactNode;
};

/**
 * Recuadro con borde y un glow azul tenue por detrás.
 *
 * EL PANEL NO TIENE FONDO PROPIO, Y ESA ES LA DECISION DE FONDO.
 *
 * El instinto es `bg-surface`. No se puede, por dos razones distintas que
 * apuntan al mismo lado:
 *
 *   1. NO SEPARARIA NADA. `surface` (#22262C) contra el fondo (#16181C) está a
 *      1.17:1. En un monitor a oscuras se nota; en una notebook con brillo alto
 *      no existe. Es el hallazgo que DESIGN.md ya tenía escrito.
 *   2. ROMPERIA UN CONTRASTE QUE HOY PASA. El azul sobre `surface` da 3.97:1 y
 *      falla AA; sobre el fondo da 4.64:1 y pasa. El link "View the API" de las
 *      certificaciones vive adentro de un panel: rellenarlo lo dejaría fallando
 *      accesibilidad sin que se vea distinto.
 *
 * Entonces el recuadro se define por BORDE + GLOW, que es lo que el ojo lee
 * como panel elevado de todos modos. Sin fondo, además, el grid técnico de
 * `body::before` sigue pasando por detrás en vez de quedar tapado justo donde
 * ocupa más superficie.
 *
 * `size` no es decoración: el ritmo del sitio depende de que un ítem adentro de
 * un bloque se vea claramente menor que el bloque. Radio, padding e intensidad
 * del glow bajan juntos.
 */
const SIZES: Record<PanelSize, string> = {
  md: "rounded-lg p-6 shadow-panel sm:p-8",
  sm: "rounded-md p-5 shadow-panel-sm",
};

export function panelClasses(size: PanelSize = "md") {
  return `border border-border ${SIZES[size]}`;
}

export function Panel({
  as: Tag = "div",
  size = "md",
  className,
  children,
}: PanelProps) {
  return (
    <Tag className={`${panelClasses(size)}${className ? ` ${className}` : ""}`}>
      {children}
    </Tag>
  );
}
