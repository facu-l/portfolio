import type { SVGProps } from "react";

/**
 * Iconos del sitio, como SVG inline.
 *
 * POR QUE INLINE Y NO UNA LIBRERIA: son once paths que no van a cambiar nunca.
 * `lucide-react` o `react-icons` traen miles, un paso más de build y una
 * dependencia que mantener, para usar once. La regla del proyecto es no agregar
 * concepto sin resolver un problema que exista.
 *
 * (Este comentario decía "son dos" cuando había dos. Si algún día son treinta,
 * la cuenta cambia y conviene volver a mirarla — pero que la decisión se
 * rediscuta, no que se herede.)
 *
 * POR QUE NO UN <img src="/icono.svg">: un SVG inline hereda `currentColor`, así
 * que el icono cambia de color en hover con la misma clase que el texto. Como
 * imagen sería un archivo de color fijo y habría que duplicarlo por estado.
 *
 * `aria-hidden` en todos: el nombre accesible lo pone el elemento que los
 * envuelve. Un icono al lado de un texto que dice lo mismo no es información
 * para un lector de pantalla, es una repetición.
 *
 * DOS FAMILIAS Y ES A PROPOSITO:
 *   - Logos de marca (GitHub, LinkedIn): silueta rellena, paths de Simple Icons
 *     (CC0). Un logo tiene una forma oficial y no se dibuja de nuevo.
 *   - Iconos de interfaz: contorno de 1.75px, dibujados acá con geometría
 *     simple. Mezclar relleno y contorno en la MISMA familia se ve desprolijo;
 *     que un logo y un icono de UI se traten distinto, no.
 */

type IconProps = SVGProps<SVGSVGElement>;

/* ============================================================================
   Logos de marca — silueta rellena (Simple Icons, CC0)
   ========================================================================= */

export function GitHubIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/** Mapa label -> icono, para recorrer SOCIAL_LINKS sin condicionales sueltos. */
export const SOCIAL_ICONS: Record<
  string,
  (props: IconProps) => React.ReactElement
> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
};

/* ============================================================================
   Iconos de interfaz — contorno

   Todos comparten los mismos atributos de trazo. Van en una constante y no
   repetidos en cada SVG: si un icono queda con otro `strokeWidth`, se ve más
   fino o más grueso que sus vecinos y cuesta darse cuenta de por qué.
   ========================================================================= */

const OUTLINE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
} as const;

/**
 * Birrete. Marca un TITULO DE GRADO.
 *
 * La distinción con la medalla no es decorativa: una carrera universitaria y un
 * curso de 80 horas son cosas distintas, y en una lista de recuadros iguales
 * eso se pierde. El icono lo dice antes de que se lea una palabra.
 */
export function GraduationCapIcon(props: IconProps) {
  return (
    <svg {...OUTLINE} {...props}>
      {/* Tabla del birrete: un rombo visto en perspectiva. */}
      <path d="M12 3.5 2.5 8.25 12 13l9.5-4.75z" />
      {/* Cuerpo: se ensancha hacia abajo, como el pelo bajo la tabla. */}
      <path d="M6.25 10.4v4.35c0 1.55 2.57 2.8 5.75 2.8s5.75-1.25 5.75-2.8V10.4" />
      {/* Borla. */}
      <path d="M21.5 8.25v5.25" />
    </svg>
  );
}

/** Medalla. Marca un CURSO o certificación. Ver el comentario del birrete. */
export function MedalIcon(props: IconProps) {
  return (
    <svg {...OUTLINE} {...props}>
      <circle cx="12" cy="8.5" r="5" />
      {/* Cintas: bajan desde el disco y se cruzan en punta. */}
      <path d="M8.6 12.4 7.2 20.5l4.8-2.6 4.8 2.6-1.4-8.1" />
    </svg>
  );
}

/* --- Iconos de las categorías de Skills ---------------------------------- */

/** Backend: servidores apilados. */
export function ServerIcon(props: IconProps) {
  return (
    <svg {...OUTLINE} {...props}>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  );
}

/** Frontend: los chevrons de una etiqueta. */
export function CodeIcon(props: IconProps) {
  return (
    <svg {...OUTLINE} {...props}>
      <path d="m8.5 8-4.5 4 4.5 4M15.5 8l4.5 4-4.5 4" />
    </svg>
  );
}

/** AI-assisted workflow: destello. Es el signo consensuado de "generado". */
export function SparkleIcon(props: IconProps) {
  return (
    <svg {...OUTLINE} {...props}>
      <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9z" />
      <path d="M18.5 16.5 19 18.5l2 .5-2 .5-.5 2-.5-2-2-.5 2-.5z" />
    </svg>
  );
}

/** Languages: llaves de bloque. */
export function BracesIcon(props: IconProps) {
  return (
    <svg {...OUTLINE} {...props}>
      <path d="M8.5 4h-.75A2.25 2.25 0 0 0 5.5 6.25v2.5A2.25 2.25 0 0 1 3.25 11 2.25 2.25 0 0 1 5.5 13.25v2.5A2.25 2.25 0 0 0 7.75 18h.75" />
      <path d="M15.5 4h.75a2.25 2.25 0 0 1 2.25 2.25v2.5A2.25 2.25 0 0 0 20.75 11 2.25 2.25 0 0 0 18.5 13.25v2.5A2.25 2.25 0 0 1 16.25 18h-.75" />
    </svg>
  );
}

/** Databases: el cilindro de siempre. */
export function DatabaseIcon(props: IconProps) {
  return (
    <svg {...OUTLINE} {...props}>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" />
      <path d="M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
    </svg>
  );
}

/** Tools: llave inglesa. */
export function WrenchIcon(props: IconProps) {
  return (
    <svg {...OUTLINE} {...props}>
      <path d="M15.2 3.4a5.5 5.5 0 0 0-6.9 6.9L3.6 15a2 2 0 0 0 2.8 2.8l4.7-4.7a5.5 5.5 0 0 0 6.9-6.9l-2.9 2.9-2.4-.6-.6-2.4z" />
    </svg>
  );
}

/** Concepts: los planos antes de construir. */
export function BlueprintIcon(props: IconProps) {
  return (
    <svg {...OUTLINE} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 9v12" />
    </svg>
  );
}

/**
 * Nombres de icono válidos para una categoría de Skills.
 *
 * ES UN TIPO Y NO UN STRING SUELTO, y esa es la parte que importa. La
 * alternativa era mapear por el título de la categoría ("Backend" -> icono).
 * Con eso, el día que alguien renombre "Backend" a "Backend & APIs" el icono
 * desaparece en silencio: sin error de TypeScript, sin test roto, sin nada.
 * Con una clave propia, el título es copy y el icono es estructura.
 */
export type SkillIconName =
  | "backend"
  | "frontend"
  | "ai"
  | "languages"
  | "databases"
  | "tools"
  | "concepts";

export const SKILL_ICONS: Record<
  SkillIconName,
  (props: IconProps) => React.ReactElement
> = {
  backend: ServerIcon,
  frontend: CodeIcon,
  ai: SparkleIcon,
  languages: BracesIcon,
  databases: DatabaseIcon,
  tools: WrenchIcon,
  concepts: BlueprintIcon,
};
