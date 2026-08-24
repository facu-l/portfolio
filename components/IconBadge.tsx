import type { ComponentType, SVGProps } from "react";

type IconBadgeSize = "md" | "sm";

type IconBadgeProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** `md` al lado de un título de panel, `sm` al lado de un subtítulo. */
  size?: IconBadgeSize;
};

/**
 * Cuadrado redondeado con un icono adentro. Va al lado del título de un panel.
 *
 * LLEVA FONDO Y EL PANEL NO, y no es una contradicción: son dos problemas
 * distintos. Un panel ocupa media pantalla, así que un fondo a 1.17:1 del
 * fondo de página no lo separa de nada (ver Panel.tsx). Este cuadrado mide
 * 44px: a esa escala el ojo compara el parche contra lo que tiene pegado al
 * lado, y la diferencia sí se percibe. La misma diferencia de color rinde
 * distinto según el tamaño de la superficie.
 *
 * EL FONDO ES ACENTO DILUIDO, NO `surface`. Con `surface` el badge se lee como
 * un hueco gris; con el acento al 12% se lee como el icono encendido. El icono
 * va en `text-accent` a plena intensidad — el fondo sigue siendo casi el de la
 * página, así que el contraste es el de 4.64:1 y no el de una superficie clara.
 *
 * EL TAMAÑO ES UN PROP Y NO UN className, y esto es lo que arregla un bug real.
 * La primera versión aceptaba `className="size-9"` sobre un `size-11` de base.
 * Dos utilidades del mismo grupo en el mismo elemento: cuál gana no lo decide
 * el orden en que se escriben sino el orden en que Tailwind las emite en el
 * CSS. Funciona o no según el número, y cuando falla no hay nada que leer que
 * lo explique. Con un prop, cada tamaño emite un solo juego de clases.
 *
 * `shrink-0`: sin esto, en un panel angosto el flex le come ancho al badge
 * antes que al texto y el icono queda ovalado. Es el bug clásico de un icono
 * dentro de un flex row.
 */
const SIZES: Record<IconBadgeSize, { box: string; glyph: string }> = {
  md: { box: "size-11", glyph: "size-5" },
  sm: { box: "size-9", glyph: "size-4" },
};

export function IconBadge({ icon: Icon, size = "md" }: IconBadgeProps) {
  const { box, glyph } = SIZES[size];

  return (
    <span
      aria-hidden="true"
      className={`inline-flex ${box} shrink-0 items-center justify-center rounded-md border border-accent/25 bg-accent/12 text-accent`}
    >
      <Icon className={glyph} />
    </span>
  );
}
