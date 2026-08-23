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

export type CvFile = {
  /** Código de idioma para el atributo hreflang */
  lang: string;
  /** Nombre del idioma en su propio idioma, como corresponde en un selector */
  label: string;
  href: string;
};

/**
 * CVs disponibles. Decidido en el design review: el CV va en el Hero, porque
 * es lo que un recruiter quiere apenas le interesás.
 *
 * Los nombres de archivo van en kebab-case: el original tenía un espacio
 * ("CV_Facundo Lambertucci_EN.pdf") y en Vercel, que corre sobre Linux, eso
 * obliga a codificarlo como %20 y se rompe fácil.
 */
export const CV_FILES: readonly CvFile[] = [
  {
    lang: "es",
    label: "Español",
    href: "/cv-facundo-lambertucci-es.pdf",
  },
  {
    lang: "en",
    label: "English",
    href: "/cv-facundo-lambertucci-en.pdf",
  },
] as const;
