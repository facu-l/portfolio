import { NextResponse, type NextRequest } from "next/server";
import { isLocale, negotiateLocale } from "@/lib/locale";

/**
 * Proxy (lo que antes de Next 16 se llamaba middleware). Dos trabajos:
 *
 * 1. "/" -> "/en" o "/es" según el idioma del navegador. Es 307 (temporal):
 *    la respuesta depende de quién pide, y un 308 lo cachearía el navegador.
 *
 * 2. "/ES/..." -> "/es/..." (308). En un sistema de archivos que no distingue
 *    mayúsculas (Windows, macOS), pedir /Es hacía que Next sobrescribiera
 *    es.html con un 404 y rompía /es hasta el próximo build. Normalizar acá
 *    lo evita en cualquier plataforma y manda a la URL canónica.
 *
 * En los dos casos se conserva el query string (?utm_source=linkedin).
 *
 * ANTI-LOOP: un locale ya escrito en minúsculas nunca se redirige. El matcher
 * de abajo solo deja entrar "/" y primeros segmentos que parecen un locale;
 * todo lo demás del sitio es estático y no pasa por acá.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${negotiateLocale(request.headers.get("accept-language"))}`;
    return NextResponse.redirect(url, 307);
  }

  const [first, ...rest] = pathname.split("/").filter(Boolean);
  const lower = first?.toLowerCase() ?? "";
  if (first !== lower && isLocale(lower)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${[lower, ...rest].join("/")}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(EN|En|eN|ES|Es|eS)", "/(EN|En|eN|ES|Es|eS)/:path*"],
};
