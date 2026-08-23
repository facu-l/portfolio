/**
 * Navbar. Server Component.
 *
 * DECISION (design review): en mobile solo el wordmark, sin links.
 * El sitio es una sola página con scroll, así que los links son un atajo, no
 * la única vía. Un menú hamburguesa es una máquina de estados completa
 * (overlay, bloqueo de scroll, focus trap, cierre con Escape) para saltar
 * entre 4 secciones de la misma página. No lo vale.
 *
 * TODO: el fondo semitransparente + blur al scrollear (SPEC §2) necesita un
 * listener de scroll, o sea "use client". Se agrega al implementar, no antes:
 * hoy este componente no envía JavaScript al browser.
 */
const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5"
      >
        <a href="#top" className="text-sm font-bold tracking-[0.15em]">
          FACUNDO LAMBERTUCCI
        </a>

        {/* hidden por debajo de md: la decisión de arriba */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-semibold text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
