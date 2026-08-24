import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { PROJECTS } from "@/content/projects";

/**
 * sitemap.xml generado en el build.
 *
 * LAS RUTAS SE DERIVAN DE LOS DATOS, no están escritas a mano. El día que
 * agregues un segundo case study, `content/projects.ts` gana un objeto con su
 * `caseStudy.slug` y el sitemap lo incluye solo.
 *
 * Un sitemap escrito a mano es el clásico archivo que nadie se acuerda de
 * actualizar: no rompe nada, no falla ningún test, y simplemente deja de
 * mencionar las páginas nuevas.
 *
 * `priority` es una señal débil (Google dice explícitamente que la puede
 * ignorar). Va igual porque expresa la jerarquía real del sitio: la home es lo
 * que se comparte, el case study es evidencia de respaldo.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  const caseStudies = PROJECTS.filter((p) => p.caseStudy).map((p) => ({
    url: `${SITE_URL}/work/${p.caseStudy!.slug}`,
    lastModified: ahora,
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: ahora,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...caseStudies,
  ];
}
