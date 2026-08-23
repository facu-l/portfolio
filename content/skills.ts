/**
 * Contenido de la sección Skills.
 *
 * LA JERARQUIA ES DATO, NO ESTILO. Las 7 categorías del SPEC no pesan igual, y
 * eso vive acá en dos arrays separados en vez de en clases de Tailwind dentro
 * del componente. Si mañana AI-assisted workflow deja de ser el diferenciador,
 * se mueve un objeto de un array al otro y no se toca el JSX.
 *
 * POR QUE DOS ARRAYS Y NO UN `featured: boolean`: con un flag, nada impide que
 * las 7 queden en true y la jerarquía desaparezca sin que nadie lo note. Con
 * dos arrays, el largo de cada uno se ve de un vistazo y hay un test que lo
 * fija en 3.
 */

export type SkillCategory = {
  title: string;
  items: readonly string[];
  /**
   * Qué hacés con esas herramientas. Solo en las destacadas.
   *
   * Una lista de nombres dice qué tocaste; esta línea dice para qué. Es la
   * diferencia entre "Claude, ChatGPT, Copilot" y saber integrarlos a un flujo
   * de trabajo, que es lo que la categoría intenta comunicar.
   */
  note?: string;
};

/**
 * Las tres que sostienen la promesa del Hero.
 *
 * Backend y Frontend respaldan "FULL STACK DEVELOPER". AI-assisted workflow es
 * el diferenciador: casi nadie lo escribe como categoría propia todavía.
 */
export const FEATURED_SKILLS: readonly SkillCategory[] = [
  {
    title: "Backend",
    items: [
      "Java",
      "Spring Boot",
      "Node.js",
      "Express.js",
      "REST APIs",
      "Modular architecture",
    ],
    note: "REST APIs with layered architecture, from the data model to the endpoint.",
  },
  {
    title: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Vite", "HTML5", "CSS3"],
    note: "Component-driven UIs, responsive by default and accessible by design.",
  },
  {
    title: "AI-assisted workflow",
    items: ["Claude", "ChatGPT", "GitHub Copilot", "Gemini"],
    note: "Debugging, refactoring and documenting faster — reviewing what the model writes instead of shipping it blind.",
  },
] as const;

/**
 * El resto. Van como texto secundario, en una línea por categoría.
 *
 * No es que no importen: es que un recruiter que escanea 30 segundos se lleva
 * tres cosas o ninguna. Estas están para quien ya decidió leer con atención.
 */
export const OTHER_SKILLS: readonly SkillCategory[] = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Java", "Python", "SQL"],
  },
  {
    title: "Databases",
    items: ["MySQL", "SQLite"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Postman", "Vercel"],
  },
  {
    title: "Concepts",
    items: ["OOP", "Data structures", "Clean code", "API design"],
  },
] as const;
