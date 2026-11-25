import type { Locale } from "@/lib/locale";
import type { SiteContent } from "./types";
import { en } from "./en";
import { es } from "./es";

const CONTENT: Record<Locale, SiteContent> = { en, es };

/**
 * Todo el texto del sitio para un idioma. Las páginas lo leen una vez y lo
 * pasan como props: los componentes no saben de idiomas, reciben texto. Eso es
 * lo que permite testear cada componente en los dos idiomas sin simular Next.
 */
export function getContent(locale: Locale): SiteContent {
  return CONTENT[locale];
}

export type * from "./types";
