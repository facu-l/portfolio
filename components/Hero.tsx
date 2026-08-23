/**
 * Hero. SERVER COMPONENT — y tiene que seguir siéndolo.
 *
 * DECISION (eng review, issue 1): la directiva "use client" va SOLO en
 * LiquidGooey.tsx, nunca acá. En el App Router "use client" no marca un
 * componente, marca una frontera: todo lo que cuelga debajo se vuelve cliente.
 * Si sube a este archivo, tu nombre, tu título, tu foto y los CTAs dejan de
 * existir en el HTML inicial y pasan a depender de que cargue JavaScript.
 * Es exactamente el contenido que un recruiter y un crawler tienen que ver.
 *
 * ESQUELETO: falta la foto (next/image con priority), el efecto líquido y el
 * layout de dos columnas. Contenido exacto en SPEC §2.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="py-section">
      <div className="mx-auto w-full max-w-5xl px-6">
        <h1 id="hero-heading" className="text-display font-black leading-[0.95]">
          FULL STACK
          <br />
          DEVELOPER
        </h1>

        <p className="mt-block text-lead text-muted">
          Building software with code, systems &amp; AI.
        </p>

        {/* TODO: los 3 CTAs. El texto va en text-cta (19px) + font-bold.
            NO BAJAR ESE TAMANO: #F5F7FA sobre #007FFF da 3.57:1, que falla AA
            para texto normal y solo pasa como texto grande de WCAG (>=18.66px
            en bold). Ver DESIGN.md. */}

        <p className="mt-block text-sm text-muted">Based in Argentina · UNLP</p>
      </div>
    </section>
  );
}
