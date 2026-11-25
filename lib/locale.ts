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
