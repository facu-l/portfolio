/**
 * Contenido de la sección About (bio + education).
 *
 * Está acá y no dentro del componente porque education es una LISTA que va a
 * crecer: cada certificación nueva es un objeto más, sin tocar el JSX. La bio
 * es prosa que aparece una sola vez, pero se guarda al lado para que todo el
 * copy de la sección viva junto.
 */

/**
 * NOTA SOBRE EL COPY: el SPEC decía "REST APIs in Node.js and Spring Boot".
 * Se cambió a Java y Spring Boot porque es lo que el portfolio puede respaldar:
 * hay un repo de API REST en Spring Boot, y no hay ninguno en Node.
 *
 * Node.js sigue estando en Skills, que es una lista de herramientas conocidas.
 * Una bio afirma "construí esto"; una lista de skills afirma "sé usar esto".
 * La diferencia importa cuando un entrevistador pregunta por el proyecto.
 */
export const BIO = `Full Stack Developer and 3rd-year Systems student at Universidad Nacional de La Plata (UNLP). I build web applications end to end — from REST APIs in Java and Spring Boot to React frontends with modular architecture and clean code. I've worked with a real client on a group project (gym management system) covering requirements gathering, payments integration and role-based access control, and shipped a production landing page from scratch. I bring AI tools (Claude, ChatGPT, Copilot) into my own workflow to debug, refactor and document faster — and I'm now building toward AI engineering as a deeper specialization.`;

export type Degree = {
  title: string;
  institution: string;
  detail: string;
};

export type Certification = {
  title: string;
  institution: string;
  detail: string;
  /** Qué se construyó en el curso. Concreto, no el temario. */
  topics: string;
  /**
   * Link al proyecto que salió del curso, si existe.
   *
   * Un curso listado es una afirmación; un repo que se puede abrir es evidencia.
   * Esta es la diferencia entre "hice un curso de Spring Boot" y "acá está la
   * API que construí en ese curso".
   */
  evidence?: { label: string; href: string };
};

export const DEGREE: Degree = {
  title: "Licenciatura en Sistemas",
  institution: "Facultad de Informática, Universidad Nacional de La Plata",
  detail: "3rd year",
};

export const CERTIFICATIONS: readonly Certification[] = [
  {
    title: "Back-End Development with Java",
    institution: "Talento Tech · Ministerio de Educación (GCBA)",
    detail: "80 hours · July 2026",
    topics: "REST APIs with Spring Boot and MySQL, OOP applied to backend",
    evidence: {
      label: "View the API",
      href: "https://github.com/facu-l/articulos-api-spring-boot",
    },
  },
  {
    title: "AI Engineering Fundamentals with Python",
    institution: "Código Facilito",
    detail: "12 weeks · August 2026",
    topics: "Python for AI, model fundamentals and applied workflows",
  },
] as const;
