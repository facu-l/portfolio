import type { Locale } from "@/lib/locale";

/**
 * Forma de TODO el texto del sitio. `content/en.ts` y `content/es.ts` exportan
 * un `SiteContent` cada uno: si a un idioma le falta una clave, no compila.
 *
 * REGLA EDITORIAL (spec §1): un curso listado es una afirmación; un repo que se
 * puede abrir es evidencia. Por eso cada decisión técnica lleva un link al
 * código que la prueba, y los href son idénticos en los dos idiomas (solo se
 * traducen las etiquetas). Lo verifica content/i18n.test.ts.
 */

export type Link = { label: string; href: string };

export type CaseSlug = "falber" | "gym-management-system";

/** Una decisión técnica real: qué se decidió, por qué y dónde verificarlo. */
export type Decision = {
  title: string;
  why: string;
  evidence: Link;
};

export type Screenshot = {
  /** Ruta absoluta del sitio, ej: "/proyectos/falber-home.png" */
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  slug: CaseSlug;
  title: string;
  /** Contexto en una línea, ej: "Solo project · in production" */
  kind: string;
  summary: string;
  problem: string;
  role: string;
  /** Solo para proyectos en equipo. */
  team?: string;
  /** Solo FALBER: la frase acordada sobre el uso de IA. */
  aiWorkflow?: string;
  stack: string[];
  links: Link[];
  /** Al menos 3. `decisions[0]` es la que se muestra en el home. */
  decisions: Decision[];
  /** `gallery[0]` es la imagen del home. */
  gallery: Screenshot[];
};

/**
 * Un grupo de skills dice DONDE se usó: casos de este sitio (`cases`, el link
 * se arma con el idioma actual) o links externos (`links`, ej. un repo).
 */
export type SkillGroup = {
  title: string;
  items: string[];
  cases: CaseSlug[];
  links: Link[];
};

export type Degree = { title: string; institution: string; detail: string };

export type Certification = {
  title: string;
  institution: string;
  detail: string;
  /** Qué se construyó en el curso. Concreto, no el temario. */
  topics: string;
  evidence?: Link;
};

export type ContactFormCopy = {
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
  unavailable: string;
};

export type SiteContent = {
  locale: Locale;
  meta: { title: string; description: string };
  nav: {
    label: string;
    work: string;
    skills: string;
    about: string;
    contact: string;
    cv: string;
    /** Texto accesible del link al otro idioma, escrito EN el otro idioma. */
    switchTo: string;
  };
  hero: {
    role: string;
    valueProp: string;
    status: string;
    cvLabel: string;
    copyLabel: string;
    copiedLabel: string;
    copyFailedLabel: string;
    photoAlt: string;
  };
  work: {
    title: string;
    readCase: string;
    backToWork: string;
    decisionLabel: string;
    /** "of" en "Decision 1 of 5". */
    ofLabel: string;
    sections: {
      problem: string;
      role: string;
      team: string;
      aiWorkflow: string;
      decisions: string;
      gallery: string;
      stack: string;
    };
  };
  cases: CaseStudy[];
  skills: { title: string; usedInLabel: string; groups: SkillGroup[] };
  about: {
    title: string;
    bio: string;
    howIWorkTitle: string;
    howIWork: string[];
    freelance: string;
    educationTitle: string;
    degree: Degree;
    certifications: Certification[];
  };
  contact: {
    title: string;
    availability: string;
    intro: string;
    cvTitle: string;
    elsewhereTitle: string;
    formTitle: string;
    form: ContactFormCopy;
  };
  footer: { builtWith: string };
};
