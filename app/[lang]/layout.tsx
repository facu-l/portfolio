import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { SITE_URL, PERSON } from "@/content/config";
import { getContent } from "@/content";
import { LOCALES, isLocale } from "@/lib/locale";
import { REVEAL_ABOVE_FOLD_SCRIPT } from "@/components/revealAboveFold";

/**
 * Schibsted Grotesk: titulares (800) y texto (400/600). Una grotesca de diario,
 * sobria y con carácter: el tono "cuaderno de ingeniería" del Casebook.
 * JetBrains Mono: solo para datos técnicos (stack, rutas, tablas, links a código).
 *
 * next/font las auto-hospeda en el build: no hay request a Google en runtime
 * (el CSP tiene font-src 'self'), ni layout shift esperando la fuente.
 */
const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/**
 * EL LAYOUT RAIZ VIVE EN app/[lang]/ y no en app/: así cada idioma tiene su
 * propio <html lang>, que es lo que usan los lectores de pantalla para elegir
 * la pronunciación y Google para saber en qué idioma está la página.
 *
 * Las dos versiones se generan en el build (estáticas). `dynamicParams = false`
 * hace que cualquier otro segmento (/fr, /EN) sea un 404 en vez de renderizar
 * una página con un idioma que no existe.
 */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const dynamicParams = false;

const OG_LOCALE = { en: "en_US", es: "es_AR" } as const;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getContent(lang);

  return {
    /*
      metadataBase es la URL absoluta contra la que Next resuelve las imágenes
      de Open Graph. Sin esto, la card al pegar el link en LinkedIn o WhatsApp
      apunta a una ruta relativa y no carga. Definir NEXT_PUBLIC_SITE_URL en
      Vercel.
    */
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    /*
      hreflang: le dice a Google que /en y /es son la misma página en dos
      idiomas, no contenido duplicado. `x-default` es lo que muestra a quien
      no matchea ninguno.
    */
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", es: "/es", "x-default": "/en" },
    },
    /*
      `openGraph` y `twitter` no repiten title ni description: Next los
      completa con los de arriba. La imagen sale de opengraph-image.tsx.
    */
    openGraph: {
      url: `/${lang}`,
      siteName: PERSON.name,
      locale: OG_LOCALE[lang],
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${schibsted.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        {/*
          VA ULTIMO ADENTRO DEL <body>, Y ESO NO ES ESTILO: ES EL REQUISITO.

          El script mide qué bloques quedaron dentro del primer pantallazo, así
          que necesita que ya estén parseados: antes de {children} el documento
          todavía está vacío y mediría cero. Al ser un <script> inline sin
          `defer`, corre apenas el parser lo alcanza, antes del pintado. Un
          useEffect correría después de hidratar, que es justo el retraso que
          esto viene a eliminar.

          `dangerouslySetInnerHTML` es la única forma de escribir un script
          inline en JSX; el contenido es una constante nuestra, no entra nada de
          afuera. El CSP de next.config.ts ya permite 'unsafe-inline'.
        */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_ABOVE_FOLD_SCRIPT }} />
      </body>
    </html>
  );
}
