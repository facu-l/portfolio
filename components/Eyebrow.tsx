import type { ElementType, ReactNode } from "react";

/**
 * `section` es el <h2> de una sección. `sub` es una etiqueta interna
 * ("Education", "More work"). `accent` es `sub` marcada en azul ("Next up").
 */
type EyebrowTone = "section" | "sub" | "accent";

type EyebrowProps = {
  as?: ElementType;
  tone?: EyebrowTone;
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Etiqueta en versalitas: el título de una sección y sus etiquetas internas.
 *
 * POR QUE EXISTE: esta receta tipográfica (14px, semibold, mayúsculas, 0.2em de
 * tracking) estaba copiada en cinco archivos. Mientras fue solo tipografía, la
 * duplicación era barata. Dejó de serlo cuando se agregó el glow: se aplicó en
 * `Section` y quedaron fuera "Education", "More work" y "Next up" — no por una
 * decisión, sino porque nadie fue a los otros archivos. Eso es exactamente lo
 * que un componente compartido evita.
 *
 * EL GLOW DE LAS ETIQUETAS INTERNAS ES MAS DEBIL QUE EL DEL <h2>, a propósito.
 * Con el mismo glow, "Education" y "ABOUT" pesan igual y la sección deja de
 * tener adentro y afuera. Misma relación que `shadow-panel` con
 * `shadow-panel-sm`: lo menor se ve menor también en el resplandor.
 *
 * LAS ETIQUETAS INTERNAS PASARON DE GRIS A BLANCO. Un glow azul sobre texto
 * gris se lee como un error de renderizado, no como énfasis: el halo termina
 * más brillante que la letra que lo genera.
 */
/*
  EL TAMAÑO VIVE EN CADA TONO Y NO EN BASE, a propósito.

  Poner `text-sm` en BASE y `text-base` en el tono deja DOS utilidades del mismo
  grupo en el mismo elemento. Cuál gana no lo decide el orden en que se
  escriben, sino el orden en que Tailwind las emite en el CSS: funciona o no
  según qué par de clases toque, y cuando falla no hay nada que leer que lo
  explique. Es el mismo bug que tuvo IconBadge con `size-9` sobre `size-11`.

  SON TAMAÑOS FIJOS Y NO clamp(): estas etiquetas miden lo mismo en un teléfono
  que en un monitor. Es distinto de --text-display o --text-h2, que sí escalan
  con el viewport, y es correcto que sea distinto: un titular de 72px en desktop
  no entra en 390px, pero 18px entran igual en los dos lados. Un clamp acá
  agregaría una variable sin resolver ningún problema.

  USAN LOS TOKENS DEL PROYECTO (`text-lead`, `text-body`) Y NO LOS DE TAILWIND
  (`text-lg`, `text-base`), aunque hoy midan lo mismo. Si mañana se ajusta la
  escala tipográfica en globals.css, estas etiquetas se mueven con ella; con las
  de Tailwind se quedarían quietas y la escala se partiría en dos sin aviso.
  Es la regla número uno de DESIGN.md.
*/
const BASE = "font-semibold uppercase tracking-[0.15em]";

const TONES: Record<EyebrowTone, string> = {
  section: "text-lead text-foreground text-shadow-glow", // 18px
  sub: "text-body text-foreground text-shadow-glow-sm", // 16px
  accent: "text-body text-accent text-shadow-glow-sm", // 16px
};

export function eyebrowClasses(tone: EyebrowTone = "sub") {
  return `${BASE} ${TONES[tone]}`;
}

export function Eyebrow({
  as: Tag = "p",
  tone = "sub",
  id,
  className,
  children,
}: EyebrowProps) {
  return (
    <Tag
      id={id}
      className={`${eyebrowClasses(tone)}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Tag>
  );
}
