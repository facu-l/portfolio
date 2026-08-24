/**
 * Los colores de la marca como valores literales.
 *
 * POR QUE EXISTE ESTE ARCHIVO SI YA ESTAN EN globals.css: la imagen de Open
 * Graph la dibuja Satori, que renderiza JSX a PNG **fuera del navegador**. No
 * hay hoja de estilos, no hay cascada y no existen las variables CSS: un
 * `var(--color-accent)` ahí adentro no resuelve a nada.
 *
 * Eso rompe la regla número uno de DESIGN.md ("ningún hexadecimal fuera de
 * globals.css") por una limitación real del motor, no por comodidad. La forma
 * de que la excepción no se convierta en deriva es un test:
 * `content/brand.test.ts` lee globals.css y compara. Si alguien cambia el azul
 * en un solo lado, falla.
 *
 * NO USAR ESTOS VALORES EN COMPONENTES. En el sitio los colores se toman de las
 * utilidades de Tailwind (`text-accent`, `bg-background`). Este archivo existe
 * solo para lo que se renderiza fuera del navegador.
 */
export const BRAND = {
  background: "#16181c",
  surface: "#22262c",
  accent: "#007fff",
  foreground: "#f5f7fa",
  muted: "#9299a5",
  border: "#30353d",
} as const;
