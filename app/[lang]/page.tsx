import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getContent } from "@/content";
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
      {/*
        Skip link: primer elemento focuseable de la página. Invisible hasta que
        alguien tabula. Le permite a quien navega con teclado o lector de
        pantalla saltear la navbar en cada carga.
      */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-sm focus:bg-foreground focus:px-4 focus:py-2 focus:font-semibold focus:text-background"
      >
        {content.nav.skipToContent}
      </a>

      <Navbar nav={content.nav} locale={lang} />

      <main id="main">
        <Hero hero={content.hero} locale={lang} />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
