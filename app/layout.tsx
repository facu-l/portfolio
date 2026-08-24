import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE, SITE_URL } from "@/content/site";
import { REVEAL_ABOVE_FOLD_SCRIPT } from "@/components/revealAboveFold";

/**
 * Inter como fuente variable: un solo archivo cubre los pesos 100-900,
 * incluidos los cuatro que usa el SPEC (400 / 600 / 700 / 900).
 * Un request en vez de cuatro.
 *
 * next/font la auto-hospeda en el build: no hay request a Google en runtime,
 * ni el layout shift de esperar a que llegue la fuente.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * metadataBase es la URL absoluta contra la que Next resuelve las imágenes de
 * Open Graph. Sin esto, la card que se ve al pegar el link en LinkedIn o
 * WhatsApp apunta a una ruta relativa y no carga.
 *
 * SITE_URL vive en content/site.ts porque también la usan robots.ts, sitemap.ts
 * y la imagen de Open Graph. Definir NEXT_PUBLIC_SITE_URL en Vercel.
 *
 * NO SE DECLARA `openGraph.images` ACA. `app/opengraph-image.tsx` existe, y Next
 * inyecta `og:image` y `twitter:image` solo, con la URL absoluta y las
 * dimensiones correctas. Escribirlo a mano además pisaría lo generado y sería
 * un segundo lugar donde la URL puede quedar vieja.
 */
const TITLE = `${SITE.name} — ${SITE.role}`;

/**
 * UNA SOLA DESCRIPCION PARA TODO, Y DE MAS DE 100 CARACTERES.
 *
 * Antes había dos: esta, y una más corta repetida en `openGraph` y `twitter`
 * que la pisaba. El resultado era que la card al compartir el link mostraba 46
 * caracteres — "Building software with code, systems & AI." — y el Post
 * Inspector de LinkedIn lo marcaba: pide un mínimo de 100.
 *
 * El tagline corto ya está en el Hero y en la imagen de la card. Repetirlo acá
 * gastaba el único renglón donde se puede decir algo que el título no dice.
 */
const DESCRIPTION =
  "Systems student at Universidad Nacional de La Plata, focused on building modern web applications and exploring AI engineering.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  /*
    `openGraph` y `twitter` NO repiten title ni description: Next los completa
    con los de arriba cuando faltan. Escritos a mano estaban tres veces cada
    uno, y así fue como la description de la card quedó desincronizada de la
    del sitio sin que nadie lo viera — el HTML se veía bien, solo que decía
    otra cosa.
  */
  openGraph: {
    url: SITE_URL,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        {/*
          VA ULTIMO ADENTRO DEL <body>, Y ESO NO ES ESTILO: ES EL REQUISITO.

          El script mide qué bloques quedaron dentro del primer pantallazo, así
          que necesita que ya estén parseados — antes de {children} el documento
          todavía está vacío y mediría cero. Y al ser un <script> inline sin
          `defer`, corre apenas el parser lo alcanza, todavía antes del pintado.
          Un componente de React con useEffect no serviría: correría después de
          hidratar, que es justo el retraso que esto viene a eliminar.

          `dangerouslySetInnerHTML` es la única forma de escribir un script
          inline en JSX, y acá el nombre asusta más de lo que corresponde: el
          contenido es una constante nuestra, no entra nada de afuera. El CSP de
          next.config.ts ya permite 'unsafe-inline' en script-src.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: REVEAL_ABOVE_FOLD_SCRIPT }}
        />
      </body>
    </html>
  );
}
