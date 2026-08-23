import { SOCIAL_LINKS } from "@/content/site";
import { SOCIAL_ICONS } from "./icons";

/**
 * Fila de botones cuadrados con los logos de las redes.
 *
 * VAN DEBAJO DE LOS CTAs Y NO AL LADO. Un Hero con cuatro botones en la misma
 * fila no tiene jerarquía: el visitante elige el que le queda más cerca, no el
 * que importa. Arriba están las dos acciones que querés que haga (ver el
 * trabajo, bajar el CV) y abajo, más chicas, las de siempre.
 *
 * EL NOMBRE ACCESIBLE VIVE EN EL <a>, NO EN EL ICONO. Los SVG son
 * `aria-hidden`, así que sin el `sr-only` estos botones serían links sin texto
 * — un lector de pantalla anunciaría "link" tres veces y nada más.
 *
 * 44x44px (`size-11`) es el mínimo de touch target de DESIGN.md. Un icono de
 * 20px con un botón de 44px es aire, no descuido: es lo que hace que se pueda
 * tocar con el pulgar sin errarle.
 */
export function SocialIconLinks() {
  return (
    <ul className="mt-stack flex items-center gap-3">
      {SOCIAL_LINKS.map((link) => {
        const Icon = SOCIAL_ICONS[link.label];
        if (!Icon) return null;

        return (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-md border border-border text-muted transition-colors duration-fast hover:border-accent hover:text-accent"
            >
              <Icon className="size-5" />
              <span className="sr-only">
                {link.label} (opens in a new tab)
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
