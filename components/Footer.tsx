/**
 * Footer. SERVER COMPONENT — y por eso el año no rompe nada.
 *
 * new Date().getFullYear() en un Client Component es la causa clásica de
 * hydration mismatch: el servidor renderiza un año, el cliente otro, y el 31
 * de diciembre a la medianoche React tira un error en consola. Acá se evalúa
 * una sola vez, en el build.
 *
 * ESQUELETO: faltan los links a GitHub y LinkedIn (SPEC §8).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-surface-sunken">
      <div className="mx-auto flex max-w-5xl flex-col gap-stack px-6 py-block sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold tracking-[0.15em]">
          FACUNDO LAMBERTUCCI
        </p>
        <p className="text-sm text-muted">
          © {year} · Built with Next.js
        </p>
      </div>
    </footer>
  );
}
