import type { Locale } from "@/lib/locale";
import type { Link } from "./types";

/**
 * Datos del sitio que NO son copy: no se traducen, valen igual en los dos
 * idiomas. Vivían mezclados con el texto en content/site.ts y contact.ts.
 */

/**
 * URL pública del sitio. La usan metadataBase, robots, sitemap y la imagen de
 * Open Graph. Definir NEXT_PUBLIC_SITE_URL en Vercel.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const PERSON = {
  name: "Facundo Lambertucci",
  email: "faculambertucci98@gmail.com",
} as const;

export const SOCIAL_LINKS: readonly Link[] = [
  { label: "GitHub", href: "https://github.com/facu-l" },
  { label: "LinkedIn", href: "https://linkedin.com/in/facundolambertucci" },
];

/** El CV de cada idioma. El hero ofrece el del idioma actual; Contact, los dos. */
export const CV_FILES: Record<Locale, string> = {
  es: "/cv-facundo-lambertucci-es.pdf",
  en: "/cv-facundo-lambertucci-en.pdf",
};

/**
 * La access key de Web3Forms es pública por diseño (va en el HTML del form);
 * su documentación lo dice. Vive en una variable de entorno para no atarla al
 * repo, no para esconderla.
 */
export const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

/** Campo trampa para bots: un humano no lo ve ni lo completa. */
export const HONEYPOT_FIELD = "botcheck";
