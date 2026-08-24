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
const BASE = "font-semibold uppercase tracking-[0.2em]";

const TONES: Record<EyebrowTone, string> = {
  section: "text-base text-foreground text-shadow-glow",   // 16px
  sub: "text-sm text-foreground text-shadow-glow-sm",
  accent: "text-sm text-accent text-shadow-glow-sm",
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
