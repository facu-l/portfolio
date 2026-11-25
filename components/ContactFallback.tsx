import { ExternalLink } from "./ExternalLink";
import { SOCIAL_LINKS } from "@/content/config";

type ContactFallbackProps = {
  message: string;
  opensInNewTab: string;
};

/**
 * El camino alternativo cuando el formulario no está disponible (sin access
 * key) o falló el envío: en vez de un error seco, los links directos.
 *
 * role="status": cuando aparece tras un error, el lector de pantalla lo anuncia.
 */
export function ContactFallback({ message, opensInNewTab }: ContactFallbackProps) {
  return (
    <div role="status" className="mt-6">
      <p className="text-muted">{message}</p>
      <div className="mt-3 flex flex-wrap gap-x-6">
        {SOCIAL_LINKS.map((link) => (
          <ExternalLink
            key={link.href}
            href={link.href}
            opensInNewTab={opensInNewTab}
            className="link-evidence font-semibold"
          >
            {link.label}
          </ExternalLink>
        ))}
      </div>
    </div>
  );
}
