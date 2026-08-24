import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/**
 * robots.txt generado por Next en el build.
 *
 * POR QUE EXISTE SI PERMITE TODO: sin este archivo la ruta devuelve 404, y un
 * 404 en /robots.txt es ambiguo — el crawler no sabe si el sitio no tiene
 * reglas o si algo está roto. Un archivo que dice "pasá" es una respuesta.
 *
 * LO QUE DE VERDAD APORTA es la línea del sitemap: es el mecanismo estándar
 * para que un buscador encuentre las URLs del sitio sin depender de ir
 * siguiendo links. Acá importa porque el case study
 * (/work/gym-management-system) solo se linkea desde una tarjeta.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
