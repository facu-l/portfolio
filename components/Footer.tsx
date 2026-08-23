import { SITE, SOCIAL_LINKS } from "@/content/site";
import { ExternalLink } from "./ExternalLink";

/**
 * Footer. SERVER COMPONENT — y por eso el año no rompe nada.
 *
 * new Date().getFullYear() en un Client Component es la causa clásica de
 * hydration mismatch: el servidor renderiza un año, el cliente otro, y el 31
 * de diciembre a la medianoche React tira un error en consola. Acá se evalúa
 * una sola vez, cuando Vercel buildea.
 *
 * El costo de esa decisión, para que quede escrito: el año queda congelado al
 * del último build. Con deploy automático en cada push no es un problema real,
 * pero si el sitio no se toca en todo 2027 va a seguir diciendo 2026.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-surface-sunken">
      <div className="mx-auto flex max-w-5xl flex-col gap-stack px-6 py-block sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold tracking-[0.15em]">
          {SITE.name.toUpperCase()}
        </p>

        <div className="flex flex-col gap-stack sm:flex-row sm:items-center sm:gap-8">
          <nav aria-label="Social">
            <ul className="flex items-center gap-6">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <ExternalLink
                    href={link.href}
                    className="text-sm font-semibold text-muted hover:text-foreground"
                  >
                    {link.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-sm text-muted">© {year} · Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
