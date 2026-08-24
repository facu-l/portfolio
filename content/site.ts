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

/**
 * URL absoluta del sitio.
 *
 * LA NECESITAN CUATRO ARCHIVOS: layout.tsx (metadataBase y og:url), robots.ts,
 * sitemap.ts y la imagen de Open Graph. Escrita cuatro veces, el día que cambie
 * el dominio quedan tres desactualizadas y el síntoma es una card rota o un
 * sitemap que apunta a otro lado — cosas que nadie mira hasta que fallan.
 *
 * OJO: NEXT_PUBLIC_ se reemplaza en tiempo de BUILD. Cambiarla en Vercel no
 * hace efecto hasta redeployar. Ya nos pasó con og:url apuntando a un dominio
 * que devolvía 404.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE = {
  /**
   * Saludo que abre el Hero. Va separado del nombre y no como un solo string
   * ("Hi, I'm Facundo Lambertucci") porque en pantalla tienen pesos distintos:
   * el saludo es tejido conectivo y el nombre es el dato. Si fueran un solo
   * string habría que partirlo en el JSX, que es donde no debe vivir el copy.
   */
  greeting: "Hi, I'm",
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
