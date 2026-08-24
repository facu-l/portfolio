import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/**
 * Orden de secciones:
 * Hero -> About (incluye Education) -> Projects -> Skills -> Contact -> Footer
 *
 * About va ANTES que Projects a propósito: el visitante lee quién sos antes de
 * ver qué construiste.
 *
 * EL SPEC TENIA UNA SECCION MAS, "Currently Learning", ENTRE SKILLS Y CONTACT.
 * Se sacó, y no por espacio: su contenido era un roadmap que todavía no había
 * empezado. Un encabezado que dice CURRENTLY LEARNING sobre algo que no arrancó
 * no es contenido flojo, es una afirmación falsa — y este portfolio se sostiene
 * sobre la regla contraria, escrita en content/about.ts: un curso listado es una
 * afirmación, un repo que se puede abrir es evidencia.
 *
 * El mensaje no se perdió: la bio ya cierra con "building toward AI engineering
 * as a deeper specialization", que dice lo mismo como dirección y no como
 * actividad en curso. Las condiciones para que la sección vuelva están en
 * TODOS.md.
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
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-body focus:font-semibold focus:text-foreground"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
