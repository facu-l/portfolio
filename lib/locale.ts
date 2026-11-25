/**
 * Idiomas del sitio. Fuente única: rutas (`/en`, `/es`), contenido
 * (`content/en.ts`, `content/es.ts`) y metadata salen de esta lista.
 *
 * El orden importa: el primero es el idioma por defecto.
 */
export const LOCALES = ["en", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/**
 * Type guard para el segmento `[lang]` de la URL, que llega como string.
 * Distingue mayúsculas a propósito: `/EN` no es una ruta válida, es un 404.
 */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Elige el idioma a partir del header Accept-Language del navegador.
 *
 * Toma los rangos en orden de preferencia (q más alto primero; a igual q, el
 * orden en que vienen) y se queda con el primero cuyo idioma base soportamos:
 * "es-AR" cuenta como "es". Un header ausente, vacío o mal formado nunca
 * rompe: devuelve el idioma por defecto.
 *
 * Se escribió a mano en vez de sumar @formatjs/intl-localematcher + negotiator
 * (lo que sugiere la guía de Next): con dos idiomas, 20 líneas testeadas
 * cuestan menos que dos dependencias.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const ranges = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return {
        base: tag.trim().toLowerCase().split("-")[0],
        q: Number.isNaN(q) ? 1 : q,
        index,
      };
    })
    .filter((range) => range.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);

  const match = ranges.find((range) => isLocale(range.base));
  return match ? (match.base as Locale) : DEFAULT_LOCALE;
}

/**
 * La misma página en otro idioma: cambia el primer segmento si es un idioma,
 * o lo antepone si no hay ninguno. La usa el selector EN/ES de la navbar.
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) segments.shift();
  return `/${[target, ...segments].join("/")}`;
}
