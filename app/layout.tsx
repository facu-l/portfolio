import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/content/site";

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
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Facundo Lambertucci — Full Stack Developer",
  description:
    "Systems student at Universidad Nacional de La Plata, focused on building modern web applications and exploring AI engineering.",
  openGraph: {
    title: "Facundo Lambertucci — Full Stack Developer",
    description: "Building software with code, systems & AI.",
    url: SITE_URL,
    siteName: "Facundo Lambertucci",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Facundo Lambertucci — Full Stack Developer",
    description: "Building software with code, systems & AI.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
