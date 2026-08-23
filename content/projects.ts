/**
 * Contenido de la sección Work (proyectos + case study).
 *
 * POR QUE UN SOLO ARRAY Y NO UN OBJETO POR PROYECTO: el orden importa. El
 * primero es el featured y el resto es "more work". Si cada proyecto fuera una
 * constante suelta, el orden viviría en el JSX y reordenarlos sería tocar
 * componentes en vez de datos.
 *
 * Este archivo es también lo que hace barata la migración a `app/work/[slug]`
 * el día que haya un segundo case study (ver TODOS.md): el slug ya está acá.
 */

export type Screenshot = {
  src: string;
  /**
   * Qué se ve, no "captura del proyecto". El alt lo lee alguien que no puede
   * ver la imagen: tiene que enterarse de lo mismo que se entera quien la ve.
   */
  alt: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  /** Segmento de URL. Hoy alimenta una ruta estática; mañana, `[slug]`. */
  slug: string;
  /** El problema real que había que resolver. */
  challenge: string;
  /** Cómo trabajó el equipo. Un recruiter lee esto tan atento como el stack. */
  teamAndWorkflow: string;
  /** Qué hizo Facundo, separado de lo que hizo el equipo. */
  myRole: string;
  gallery: readonly Screenshot[];
};

export type Project = {
  slug: string;
  title: string;
  /** Una o dos frases. Qué es el proyecto, no cómo está hecho. */
  summary: string;
  /**
   * Qué construyó Facundo, cuando el proyecto es de equipo.
   *
   * POR QUE ES UN CAMPO APARTE Y NO PARTE DEL SUMMARY: en un proyecto grupal,
   * "el sistema hace X" y "yo hice X" son dos afirmaciones distintas. Mezclarlas
   * en un párrafo deja que el lector asuma lo segundo cuando solo dijiste lo
   * primero — y esa es exactamente la pregunta incómoda de la entrevista.
   * `undefined` en proyectos individuales, donde la distinción no existe.
   */
  contributions?: string;
  /** Stack del proyecto completo, no solo de la parte propia. */
  stack: readonly string[];
  screenshot?: Screenshot;
  /**
   * Links opcionales A PROPOSITO. Un proyecto sin repo público renderiza sin
   * botón; nunca un href de mentira. Ver `projects.test.ts`.
   */
  repoUrl?: string;
  liveUrl?: string;
  caseStudy?: CaseStudy;
};

/**
 * NOTA DE HONESTIDAD (gym): el backend en Rust lo implementó un compañero del
 * equipo. Está listado en el stack porque es parte del proyecto, y por eso
 * `contributions` existe: dice qué módulos son de Facundo sin inflar el resto.
 *
 * El SPEC listaba "JWT role-based access control" como contribución propia.
 * Se movió al summary como característica del producto: el control de acceso
 * vive del lado del backend, que no fue suyo. Si además hizo los guards del
 * frontend, vuelve a `contributions` — pero con esa precisión escrita.
 */
export const PROJECTS: readonly Project[] = [
  {
    slug: "gym-management-system",
    title: "Gym Management System",
    summary:
      "A management platform for a real gym client, with separate access for owners, front-desk staff and members: memberships, class scheduling, attendance and payments in one place.",
    contributions:
      "Mercado Pago payments integration and QR-based attendance tracking.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Rust", "SQLite"],
    screenshot: {
      src: "/proyectos/cef-admin-clientes.png",
      alt: "Panel de administración del gimnasio mostrando el listado de clientes con su estado de membresía",
      width: 1902,
      height: 915,
    },
    caseStudy: {
      slug: "gym-management-system",
      challenge:
        "Building a complete system from scratch for a real client, serving three roles with different needs and permissions: the owner, the front-desk staff and the members themselves.",
      teamAndWorkflow:
        "A 5-person team working with Git Flow and agile ceremonies. Every change went through a pull request and code review before reaching the main branch, which meant coordinating branches across five people without blocking each other.",
      myRole:
        "I owned two modules end to end: the Mercado Pago payments integration and the QR-based attendance system. The Rust backend was implemented by a teammate — my work was the client-side integration with it.",
      gallery: [
        {
          src: "/proyectos/cef-landing.png",
          alt: "Landing pública del gimnasio con el llamado a la acción para asociarse",
          width: 1888,
          height: 910,
        },
        {
          src: "/proyectos/cef-clases.png",
          alt: "Grilla de clases del gimnasio con horarios y cupos disponibles",
          width: 1888,
          height: 912,
        },
        {
          src: "/proyectos/cef-membresia.png",
          alt: "Pantalla de gestión de membresías con los planes disponibles y su precio",
          width: 1494,
          height: 911,
        },
      ],
    },
  },
  {
    slug: "personal-trainer-landing",
    title: "Personal Trainer Landing Page",
    summary:
      "A responsive landing page focused on lead generation through WhatsApp and Web3Forms, optimized for SEO and performance and deployed on Vercel.",
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS"],
  },
] as const;

/** El primero del array es el featured. El orden del array es la decisión. */
export const FEATURED_PROJECT = PROJECTS[0];
export const OTHER_PROJECTS = PROJECTS.slice(1);
