import { lang } from "next/root-params";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import { NotFoundView } from "@/components/NotFoundView";
import { getContent } from "@/content";
import { DEFAULT_LOCALE, isLocale } from "@/lib/locale";

/**
 * 404 para rutas bajo un idioma válido que no existen (ej. /es/work/nope).
 * Usa el layout de [lang], así que sale con <html lang> correcto, estilos y
 * navbar. not-found no recibe params: el idioma se lee con next/root-params.
 *
 * Un idioma inexistente (/fr) no llega acá porque no hay layout raíz para él:
 * ese 404 es el genérico de Next (ver TODOS.md).
 */
export default async function NotFound() {
  const current = await lang();
  const locale = isLocale(current) ? current : DEFAULT_LOCALE;
  const content = getContent(locale);

  return (
    <>
      <SkipLink label={content.nav.skipToContent} />
      <Navbar nav={content.nav} locale={locale} />
      <main id="main">
        <NotFoundView notFound={content.notFound} locale={locale} />
      </main>
      <Footer footer={content.footer} opensInNewTab={content.a11y.opensInNewTab} />
    </>
  );
}
