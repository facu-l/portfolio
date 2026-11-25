type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /**
   * Lo que escucha un lector de pantalla después del texto, en el idioma de la
   * página: "(opens in a new tab)" / "(se abre en una pestaña nueva)".
   */
  opensInNewTab?: string;
};

/**
 * Link a otro sitio: pestaña nueva + rel de seguridad + aviso accesible.
 *
 * `noopener` impide que la página abierta controle esta vía window.opener.
 * El aviso existe porque abrir una pestaña sin avisar desorienta a quien usa
 * lector de pantalla: el botón "atrás" de repente no hace nada.
 *
 * La flecha ↗ se desplaza 2px en hover (clase .link-arrow, ver globals.css):
 * es la señal visual de "sale del sitio".
 */
export function ExternalLink({
  href,
  children,
  className = "",
  // TRANSITORIO: el default existe mientras About/Contact/Footer no pasan el
  // texto traducido (Tarea 7). Después la prop vuelve a ser obligatoria.
  opensInNewTab = "(opens in a new tab)",
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center gap-1 transition-colors duration-fast ${className}`}
    >
      {children}
      <span aria-hidden="true" className="link-arrow">
        ↗
      </span>
      <span className="sr-only"> {opensInNewTab}</span>
    </a>
  );
}
