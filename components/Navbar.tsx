import { SITE } from "@/content/site";
import { StickyHeader } from "./StickyHeader";

/**
 * Navbar. SERVER COMPONENT.
 *
 * Este archivo no tiene "use client" y no debe tenerlo. La interactividad
 * (el blur al scrollear) vive en StickyHeader; el wordmark y los links entran
 * ahí como children y siguen renderizándose en el servidor.
 *
 * DECISION (design review): en mobile solo el wordmark, sin links.
 * El sitio es una sola página con scroll, así que los links son un atajo y no
 * la única vía. Un menú hamburguesa es una máquina de estados completa
 * (overlay, bloqueo del scroll del body, focus trap, cierre con Escape) para
 * saltar entre 4 secciones de la misma página. No lo vale.
 */
const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export function Navbar() {
  return (
    <StickyHeader>
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5"
      >
        <a
          href="#top"
          className="inline-flex min-h-11 items-center text-sm font-bold tracking-[0.15em] transition-colors duration-fast hover:text-accent"
        >
          {SITE.name.toUpperCase()}
        </a>

        {/* hidden por debajo de md: la decisión de arriba */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-muted transition-colors duration-fast hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </StickyHeader>
  );
}
