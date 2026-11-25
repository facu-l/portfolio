"use client";

import { usePathname } from "next/navigation";
import { LOCALES, switchLocalePath, type Locale } from "@/lib/locale";

type LanguageSwitcherProps = {
  locale: Locale;
  /** Nombre accesible del link al otro idioma, escrito en ese idioma. */
  switchTo: string;
};

/**
 * "EN / ES". El idioma actual se marca con aria-current y NO es link (un link
 * a la página donde ya estás no hace nada). El otro lleva a la MISMA página en
 * el otro idioma: si estás leyendo el caso FALBER, seguís en el caso FALBER.
 *
 * Es client component solo por usePathname. Con dos idiomas no hace falta un
 * menú desplegable: los dos códigos entran en la navbar incluso en un celular.
 */
export function LanguageSwitcher({ locale, switchTo }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${locale}`;

  return (
    <div className="flex items-center gap-1.5 font-mono text-mono text-muted">
      {LOCALES.map((code, index) => (
        <span key={code} className="flex items-center gap-1.5">
          {index > 0 && <span aria-hidden="true">/</span>}
          {code === locale ? (
            <span aria-current="true" className="font-medium text-foreground">
              {code.toUpperCase()}
            </span>
          ) : (
            <a
              href={switchLocalePath(pathname, code)}
              hrefLang={code}
              lang={code}
              aria-label={switchTo}
              className="inline-flex min-h-11 items-center transition-colors duration-fast hover:text-foreground"
            >
              {code.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
