import { NextResponse, type NextRequest } from "next/server";
import { negotiateLocale } from "@/lib/locale";

/**
 * Proxy (lo que antes de Next 16 se llamaba middleware): manda "/" al idioma
 * del navegador. Es 307 (temporal) y no 308 porque la respuesta depende de
 * quién pide: un 308 lo cachearía el navegador para siempre.
 *
 * CORRE SOLO EN "/". El resto del sitio (/en, /es y los casos) es estático y
 * no pasa por acá: no hay costo por visita, y no hay forma de que una URL que
 * ya tiene idioma entre en un loop de redirects.
 */
export function proxy(request: NextRequest) {
  const locale = negotiateLocale(request.headers.get("accept-language"));
  return NextResponse.redirect(new URL(`/${locale}`, request.url), 307);
}

export const config = {
  matcher: ["/"],
};
