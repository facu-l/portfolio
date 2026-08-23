/**
 * Datos del sitio que se usan en más de un lugar.
 *
 * POR QUE UN ARCHIVO Y NO ESCRIBIRLOS DONDE HACEN FALTA: la URL de GitHub
 * aparece en el Hero y en el Footer. Escrita dos veces, el día que cambie una
 * queda desincronizada de la otra y nadie lo nota hasta que alguien clickea la
 * vieja. Acá hay una sola fuente de verdad.
 *
 * Además esto es testeable: `content/site.test.ts` verifica que todas las URLs
 * tengan forma válida, así un typo no llega a producción.
 */

export const SITE = {
  name: "Facundo Lambertucci",
  role: "Full Stack Developer",
  tagline: "Building software with code, systems & AI.",
  location: "Based in Argentina · UNLP",
} as const;

export type SocialLink = {
  /** Texto visible del link */
  label: string;
  href: string;
};

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: "GitHub", href: "https://github.com/facu-l" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/facundolambertucci",
  },
] as const;

/** Ruta al CV público. Decidido en el design review: va en el Hero. */
export const CV_PATH = "/cv-facundo-lambertucci.pdf";
