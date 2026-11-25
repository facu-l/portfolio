import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/config";
import { getContent } from "@/content";
import { LOCALES } from "@/lib/locale";

/**
 * Cada página existe una vez por idioma. Cada entrada declara sus alternativas
 * (hreflang) para que Google entienda que /en y /es son la misma página en
 * dos idiomas y no contenido duplicado.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  const slugs = getContent("en").cases.map((c) => c.slug);

  const paths: Array<{ path: string; priority: number }> = [
    { path: "", priority: 1 },
    ...slugs.map((slug) => ({ path: `/work/${slug}`, priority: 0.8 })),
  ];

  return paths.flatMap(({ path, priority }) => {
    const languages = Object.fromEntries(
      LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])
    );
    return LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: ahora,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
