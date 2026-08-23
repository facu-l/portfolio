import { ExternalLink } from "./ExternalLink";
import { SOCIAL_LINKS } from "@/content/site";

type ContactFallbackProps = {
  message: string;
};

/**
 * El camino alternativo cuando el formulario no está disponible o falló.
 *
 * POR QUE EXISTE COMO COMPONENTE Y NO COMO UN <p> SUELTO: se usa en dos
 * situaciones que parecen distintas y son la misma — el visitante quiere
 * escribirte y el formulario no está. Un error que solo dice "algo salió mal"
 * pierde un contacto que ya estaba decidido.
 *
 * role="status" para que el caso de error lo anuncie un lector de pantalla al
 * aparecer. Cuando se renderiza de entrada no anuncia nada, porque una región
 * viva solo avisa de los cambios posteriores al primer render.
 */
export function ContactFallback({ message }: ContactFallbackProps) {
  return (
    <div role="status" className="mt-block">
      <p className="text-muted">{message}</p>
      <div className="mt-stack flex flex-wrap gap-x-6">
        {SOCIAL_LINKS.map((link) => (
          <ExternalLink
            key={link.href}
            href={link.href}
            className="font-semibold text-accent hover:text-foreground"
          >
            {link.label}
          </ExternalLink>
        ))}
      </div>
    </div>
  );
}
