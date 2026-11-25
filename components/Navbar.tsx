import type { SiteContent } from "@/content";
import { CV_FILES, PERSON } from "@/content/config";
import type { Locale } from "@/lib/locale";
import { StickyHeader } from "./StickyHeader";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavbarProps = {
  nav: SiteContent["nav"];
  locale: Locale;
};

/**
 * Navbar: nombre (con el punto lima, la firma del Casebook), las cuatro
 * secciones, el selector de idioma y el CV.
 *
 * LOS LINKS SON /${locale}#seccion Y NO #seccion: la misma navbar se usa en las
 * páginas de caso, y ahí "#work" no existe. Desde el home el navegador
 * reconoce que es la misma página y solo hace scroll.
 *
 * En celular las cuatro secciones se ocultan (el home se lee scrolleando); el
 * CV y el idioma quedan siempre visibles porque son las dos acciones que un
 * recruiter busca primero.
 */
export function Navbar({ nav, locale }: NavbarProps) {
  const links = [
    { id: "work", label: nav.work },
    { id: "skills", label: nav.skills },
    { id: "about", label: nav.about },
    { id: "contact", label: nav.contact },
  ];

  return (
    <StickyHeader>
      <nav
        aria-label={nav.label}
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <a
          href={`/${locale}`}
          className="inline-flex min-h-11 items-center text-base font-extrabold tracking-tight whitespace-nowrap"
        >
          {PERSON.name}
          <span aria-hidden="true" className="text-accent">
            .
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`/${locale}#${link.id}`}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-muted transition-colors duration-fast hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} switchTo={nav.switchTo} />
          <a
            href={CV_FILES[locale]}
            download
            className="btn-pill inline-flex min-h-11 items-center rounded-full border border-border px-4 font-mono text-mono text-foreground hover:border-foreground"
          >
            {nav.cv}
          </a>
        </div>
      </nav>
    </StickyHeader>
  );
}
