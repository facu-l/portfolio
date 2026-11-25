import type { SiteContent } from "@/content";
import type { Locale } from "@/lib/locale";

type NotFoundViewProps = {
  notFound: SiteContent["notFound"];
  locale: Locale;
};

/**
 * 404 en el idioma de la página. Lo importante es la salida: quien llegó con
 * un link viejo (por ejemplo un caso que cambió de nombre) vuelve al inicio,
 * donde están los proyectos y el contacto.
 */
export function NotFoundView({ notFound, locale }: NotFoundViewProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-section sm:px-6">
      <p className="font-mono text-mono text-muted">404</p>
      <h1 className="mt-3 text-h2 leading-tight font-extrabold tracking-[-0.03em]">
        {notFound.title}
        <span aria-hidden="true" className="text-accent">
          .
        </span>
      </h1>
      <p className="mt-4 max-w-[52ch] text-lead leading-relaxed text-foreground/80">{notFound.body}</p>
      <a href={`/${locale}`} className="link-evidence mt-6 inline-flex min-h-11 items-center font-semibold">
        {notFound.backHome}
      </a>
    </section>
  );
}
