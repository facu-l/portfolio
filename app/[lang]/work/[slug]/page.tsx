import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import { CaseStudyPage } from "@/components/CaseStudyPage";
import { getContent } from "@/content";
import { PERSON } from "@/content/config";
import { isLocale } from "@/lib/locale";

/**
 * Una página por caso y por idioma, generadas en el build. El `lang` lo aporta
 * el layout padre; acá solo se listan los slugs. Cualquier otro slug es 404.
 */
export function generateStaticParams() {
  return getContent("en").cases.map((c) => ({ slug: c.slug }));
}

// Slugs desconocidos SI llegan a la página (ver el comentario de dynamicParams
// en app/[lang]/layout.tsx): así notFound() usa app/[lang]/not-found.tsx
export const dynamicParams = true;

const OG_LOCALE = { en: "en_US", es: "es_AR" } as const;

function findCase(lang: string, slug: string) {
  if (!isLocale(lang)) return undefined;
  const content = getContent(lang);
  const caseStudy = content.cases.find((c) => c.slug === slug);
  return caseStudy ? { content, caseStudy, lang } : undefined;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const found = findCase(lang, slug);
  if (!found) return {};

  return {
    title: `${found.caseStudy.title} · ${PERSON.name}`,
    description: found.caseStudy.summary,
    alternates: {
      canonical: `/${lang}/work/${slug}`,
      languages: { en: `/en/work/${slug}`, es: `/es/work/${slug}`, "x-default": `/en/work/${slug}` },
    },
    /*
      Next REEMPLAZA el openGraph del layout en vez de mezclarlo. Sin esto, la
      página hereda og:url = /es y la card de un caso compartido lleva al home.
      Por eso se repiten siteName y locale.
    */
    openGraph: {
      url: `/${lang}/work/${slug}`,
      siteName: PERSON.name,
      locale: OG_LOCALE[found.lang],
      type: "article",
    },
  };
}

export default async function CaseStudyRoute({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  const found = findCase(lang, slug);
  if (!found) notFound();
  const { content, caseStudy } = found;

  return (
    <>
      <SkipLink label={content.nav.skipToContent} />
      <Navbar nav={content.nav} locale={found.lang} />
      <main id="main">
        <CaseStudyPage
          caseStudy={caseStudy}
          work={content.work}
          opensInNewTab={content.a11y.opensInNewTab}
          locale={found.lang}
        />
      </main>
      <Footer footer={content.footer} opensInNewTab={content.a11y.opensInNewTab} />
    </>
  );
}
