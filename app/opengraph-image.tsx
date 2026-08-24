import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/content/site";
import { BRAND } from "@/content/brand";

/**
 * Imagen de Open Graph: la tarjeta que se dibuja al pegar el link del sitio en
 * WhatsApp, LinkedIn, Slack o un mail.
 *
 * POR QUE SE GENERA Y NO ES UN PNG SUBIDO A MANO: lee `SITE` y `BRAND`, los
 * mismos datos que usa el sitio. Si cambia el rol, el nombre o el acento, la
 * tarjeta cambia sola. Un PNG hecho en Figma se desincroniza el primer día que
 * toques algo, y nadie se entera porque esta imagen no se mira navegando: se ve
 * en el chat de otra persona.
 *
 * SE RENDERIZA UNA VEZ EN EL BUILD. Next la prerenderiza como archivo estático
 * junto con el resto del sitio, así que no cuesta nada en runtime.
 *
 * ---
 *
 * DOS COSAS DE SATORI (el motor que convierte este JSX en PNG) QUE NO SON
 * OBVIAS Y ROMPEN EL BUILD:
 *
 * 1. No existen las variables CSS ni Tailwind. Esto se renderiza fuera del
 *    navegador: sin cascada, sin hoja de estilos. Por eso los colores vienen de
 *    BRAND (ver content/brand.ts) y todo va en estilos inline.
 *
 * 2. Todo elemento con más de un hijo necesita `display: flex` explícito.
 *    Satori no asume `display: block` como el navegador. Si falta, el build
 *    falla con un error que no dice qué elemento es.
 */
export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * La fuente se lee del repo y no de `next/font`.
 *
 * `next/font` entrega woff2, y **Satori no soporta woff2**. Por eso `app/fonts`
 * tiene los .woff versionados: 60KB que nunca viajan al navegador, solo los usa
 * el build para dibujar esta imagen.
 */
async function cargarFuente(archivo: string) {
  return readFile(join(process.cwd(), "app", "fonts", archivo));
}

export default async function OpenGraphImage() {
  const [regular, black] = await Promise.all([
    cargarFuente("Inter-Regular.woff"),
    cargarFuente("Inter-Black.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: BRAND.background,
          fontFamily: "Inter",
          /*
            El mismo glow azul que rodea la foto en el Hero, acá como resplandor
            de fondo. Es lo que hace que la tarjeta se reconozca como el sitio y
            no como una placa de texto cualquiera.
          */
          backgroundImage: `radial-gradient(900px 600px at 100% 0%, ${BRAND.accent}33 0%, transparent 60%)`,
        }}
      >
        <div
          style={{
            fontSize: 34,
            color: BRAND.muted,
          }}
        >
          {SITE.greeting}
        </div>

        <div
          style={{
            marginTop: 12,
            fontSize: 104,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            textTransform: "uppercase",
            color: BRAND.foreground,
          }}
        >
          {SITE.name}
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 52,
            fontWeight: 900,
            color: BRAND.accent,
          }}
        >
          {SITE.role}
        </div>

        {/*
          Línea separadora + tagline abajo. El <div> de la línea no lleva hijos,
          así que no necesita display:flex.
        */}
        <div
          style={{
            marginTop: 48,
            width: 120,
            height: 4,
            backgroundColor: BRAND.accent,
          }}
        />

        <div
          style={{
            marginTop: 32,
            fontSize: 32,
            color: BRAND.muted,
          }}
        >
          {SITE.tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: black, weight: 900, style: "normal" },
      ],
    }
  );
}
