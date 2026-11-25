/**
 * Primer elemento focuseable de cada página. Invisible hasta que alguien
 * tabula. Le permite a quien navega con teclado o lector de pantalla saltear
 * la navbar en cada carga. Apunta a <main id="main">.
 */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-sm focus:bg-foreground focus:px-4 focus:py-2 focus:font-semibold focus:text-background"
    >
      {label}
    </a>
  );
}
