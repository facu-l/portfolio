import type { ElementType, ReactNode } from "react";

/**
 * `section` es el <h2> de una sección. `sub` es una etiqueta interna
 * ("Education", "More work").
 *
 * HUBO UN TERCER TONO, `accent`: `sub` marcada en azul. Lo usaba "Next up" en
 * Currently Learning, y era el único lugar del sitio donde el acento marcaba un
 * bloque de texto. Al sacarse esa lista el tono quedó sin usar y se eliminó.
 * Un tono que nadie usa no es una opción disponible: es una decisión vieja que
 * alguien va a tomar por error creyendo que sigue vigente.
 */
type EyebrowTone = "section" | "sub";

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
 * POR QUE EXISTE: esta receta tipográfica estaba copiada en cinco archivos.
 * Mientras fue solo tipografía la duplicación era barata; dejó de serlo cuando
 * se agregó un efecto en `Section` y quedaron fuera "Education", "More work" y
 * "Next up" — no por una decisión, sino porque nadie fue a los otros archivos.
 * Eso es exactamente lo que un componente compartido evita.
 *
 * SE SACO EL GLOW AZUL (design review, hallazgo 001). Eran letras blancas con
 * un `text-shadow` azul al 85%. Dos razones:
 *
 *   1. El azul había dejado de ser acento. Estaba en el rol del Hero, el CTA, el
 *      glow de la foto, los bordes de panel, los iconos, los links de proyecto Y
 *      las cinco etiquetas. Cuando el acento está en todos lados no acentúa
 *      nada: es el color de fondo con pasos extra.
 *   2. El texto con resplandor es uno de los patrones que delatan una interfaz
 *      generada. Es el mismo que se descartó al copiar la jerarquía del Hero de
 *      una referencia, y volvió a entrar por otra puerta.
 *
 * Los tokens `--text-shadow-glow` y `--text-shadow-glow-sm` se eliminaron de
 * globals.css en el mismo cambio: nadie más los usaba.
 *
 * EL TRACKING VIVE EN CADA TONO, NO EN BASE. No es simetría: a 32px las
 * mayúsculas necesitan MENOS separación que a 18px — el espacio entre letras
 * crece con el tamaño, así que el mismo 0.15em que ordena una etiqueta chica
 * desarma un título grande.
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
const BASE = "font-semibold uppercase text-foreground";

const TONES: Record<EyebrowTone, string> = {
  section: "text-section tracking-[0.08em]", // 22 -> 32px
  sub: "text-lead tracking-[0.15em]", // 18px
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
