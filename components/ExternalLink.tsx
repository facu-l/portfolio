type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Link a otro sitio. Server Component.
 *
 * Existe para no repetir tres cosas en cada link externo del portfolio
 * (Hero, Projects, Footer):
 *
 * 1. rel="noopener noreferrer"
 *    Sin `noopener`, la página que abrís puede acceder a `window.opener` y
 *    redirigir tu pestaña a otro lado. Se llama tabnabbing.
 *
 * 2. El aviso de que abre en otra pestaña
 *    La flecha ↗ es información visual: quien usa lector de pantalla no la ve.
 *    Va oculta con aria-hidden y el aviso va en un <span> que solo leen los
 *    lectores. Abrir una pestaña sin avisar desorienta: el botón "atrás" deja
 *    de funcionar y no queda claro por qué.
 *
 * 3. Área de toque
 *    min-h-11 son 44px, el mínimo de WCAG para algo clickeable con el dedo.
 */
export function ExternalLink({
  href,
  children,
  className = "",
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center gap-1 transition-colors duration-fast ${className}`}
    >
      {children}
      <span aria-hidden="true">↗</span>
      <span className="sr-only">{" (opens in a new tab)"}</span>
    </a>
  );
}
