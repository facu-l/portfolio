import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
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
 * LOCALES Y NO next/font/google: con la caché fría, el cargador de Google de
 * Turbopack 16.3.2 falla el build ("queries have exactly one entry"), y Vercel
 * compila con caché fría. Con los archivos en el repo (OFL, copiados de
 * @fontsource, subset latin) el build no depende de la red y es reproducible.
 * Igual que antes: se sirven desde el propio dominio (CSP font-src 'self') y
 * next/font calcula el fallback ajustado para que no haya layout shift.
 */
const schibsted = localFont({
  variable: "--font-schibsted",
  display: "swap",
  src: [
    { path: "../fonts/schibsted-grotesk-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/schibsted-grotesk-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/schibsted-grotesk-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
});

const jetbrains = localFont({
  variable: "--font-jetbrains",
  display: "swap",
  // Sin preload: la mono solo va en textos chicos (estado, stack, links). Se
  // descarga igual, pero no compite en la carga inicial con la del titular.
  preload: false,
  src: [
    { path: "../fonts/jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
});

/**
 * EL LAYOUT RAIZ VIVE EN app/[lang]/ y no en app/: así cada idioma tiene su
 * propio <html lang>, que es lo que usan los lectores de pantalla para elegir
 * la pronunciación y Google para saber en qué idioma está la página.
 *
 * Las dos versiones se generan en el build (estáticas). Un idioma inexistente
 * (/fr) es 404: lo corta el `notFound()` de abajo. Las mayúsculas (/EN) las
 * normaliza proxy.ts antes de llegar acá.
 *
 * dynamicParams = true A PROPOSITO, aunque parezca más estricto ponerlo en
 * false: este valor se hereda a los segmentos hijos, y con false un slug
 * inexistente (/es/work/nope) devolvía el 404 genérico de Next, sin estilos y
 * en inglés. Con true, la página llama a notFound() y se usa
 * app/[lang]/not-found.tsx, en el idioma de la URL. Los idiomas y casos reales
 * se siguen generando estáticos.
 */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const dynamicParams = true;

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
