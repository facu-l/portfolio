import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRAND } from "@/content/brand";
import { PERSON } from "@/content/config";
import { getContent } from "@/content";
import { LOCALES, isLocale, DEFAULT_LOCALE } from "@/lib/locale";

/**
 * La card que aparece al pegar el link en LinkedIn, WhatsApp o un email. Una
 * por idioma, generadas en el build (estáticas).
 *
 * POR QUE SE GENERA Y NO ES UN PNG SUBIDO A MANO: lee el rol y la frase de
 * valor del mismo contenido que el sitio, y los colores de BRAND. Si cambia
 * el copy, la card cambia sola; un PNG a mano queda viejo sin que nadie lo vea.
 *
 * Satori (el motor de ImageResponse) no lee clases de Tailwind ni variables
 * CSS: todo va en estilos inline con los valores de content/brand.ts, que un
 * test mantiene sincronizados con globals.css.
 */
export const alt = PERSON.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/**
 * next/font entrega woff2 y Satori no soporta woff2. Por eso las fuentes salen
 * de los paquetes @fontsource (dependencia de desarrollo), que traen .woff.
 */
function font(pkg: string, file: string) {
  return readFile(join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const { hero } = getContent(isLocale(lang) ? lang : DEFAULT_LOCALE);

  const [display, mono] = await Promise.all([
    font("schibsted-grotesk", "schibsted-grotesk-latin-800-normal.woff"),
    font("jetbrains-mono", "jetbrains-mono-latin-400-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: BRAND.background,
          color: BRAND.foreground,
          fontFamily: "Schibsted",
        }}
      >
        <div style={{ display: "flex", fontSize: 34 }}>
          {PERSON.name}
          <span style={{ color: BRAND.accent }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/*
            Satori solo conoce flexbox: cada hijo es una caja aparte. Si el rol
            fuera un texto y el punto un <span> hermano, al partirse la línea el
            punto quedaría suelto a la derecha. Por eso va palabra por palabra,
            con el punto pegado a la última: bajan de línea juntos.
          */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: 22,
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
            }}
          >
            {hero.role.split(" ").map((word, i, words) => (
              <div key={i} style={{ display: "flex" }}>
                {word}
                {i === words.length - 1 && <span style={{ color: BRAND.accent }}>.</span>}
              </div>
            ))}
          </div>
          {/*
            El estado se parte SOLO en los separadores " · ". Como texto corrido,
            Satori cortaba en el guion de "part-time" y dejaba "part-" / "time".
            Cada tramo es una caja que no se parte; el separador va pegado al
            tramo anterior para que nunca empiece un renglón.
          */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 28,
              fontFamily: "JetBrains",
              fontSize: 26,
              lineHeight: 1.4,
              color: BRAND.muted,
            }}
          >
            {hero.status.split(" · ").map((part, i, parts) => (
              <div key={i} style={{ display: "flex", whiteSpace: "nowrap" }}>
                {part}
                {i < parts.length - 1 && "\u00a0·\u00a0"}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", height: 6, width: 160, backgroundColor: BRAND.accent }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Schibsted", data: display, weight: 800, style: "normal" },
        { name: "JetBrains", data: mono, weight: 400, style: "normal" },
      ],
    }
  );
}
