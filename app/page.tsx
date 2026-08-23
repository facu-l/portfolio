import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { CurrentlyLearning } from "@/components/CurrentlyLearning";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/**
 * Orden de secciones confirmado en el SPEC:
 * Hero -> About (incluye Education) -> Projects -> Skills ->
 * Currently Learning -> Contact -> Footer
 *
 * About va ANTES que Projects a propósito: el visitante lee quién sos antes de
 * ver qué construiste.
 */
export default function Home() {
  return (
    <>
      {/*
        Skip link: primer elemento focuseable de la página. Invisible hasta que
        alguien tabula, y ahí aparece. Le permite a quien navega con teclado o
        lector de pantalla saltear el navbar en vez de tabular por los 4 links
        en cada carga.
      */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-cta focus:font-bold focus:text-foreground"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <CurrentlyLearning />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
