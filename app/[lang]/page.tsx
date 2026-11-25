import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import { getContent } from "@/content";
import { WEB3FORMS_ACCESS_KEY } from "@/content/config";
import { isLocale } from "@/lib/locale";

/**
 * Home. Lee el contenido del idioma una vez y lo reparte como props: los
 * componentes no saben de idiomas, reciben texto.
 *
 * Orden (spec §4.1): Hero -> Work -> Skills -> About -> Contact. Primero lo que
 * se evalúa (el trabajo), después quién es.
 */
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const content = getContent(lang);

  return (
    <>
      <SkipLink label={content.nav.skipToContent} />

      <Navbar nav={content.nav} locale={lang} />

      <main id="main">
        <Hero hero={content.hero} locale={lang} />
        <Work work={content.work} cases={content.cases} opensInNewTab={content.a11y.opensInNewTab} locale={lang} />
        <Skills skills={content.skills} cases={content.cases} opensInNewTab={content.a11y.opensInNewTab} locale={lang} />
        <About about={content.about} opensInNewTab={content.a11y.opensInNewTab} />
        <Contact contact={content.contact} hero={content.hero} opensInNewTab={content.a11y.opensInNewTab} accessKey={WEB3FORMS_ACCESS_KEY} />
      </main>

      <Footer footer={content.footer} opensInNewTab={content.a11y.opensInNewTab} />
    </>
  );
}
