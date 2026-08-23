import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * SOBRE 'unsafe-inline' EN script-src: no es un descuido, es un trade-off
 * explícito. Next inyecta scripts inline para hidratar la página. La forma
 * correcta de permitirlos sin abrir la puerta a cualquier inline es un nonce
 * distinto por request, y eso obliga a un middleware que genere el nonce — lo
 * que convierte TODAS las rutas en dinámicas y tira a la basura el prerender
 * estático de este sitio.
 *
 * Para este portfolio la cuenta da a favor de quedarse estático: no hay login,
 * no hay cookies de sesión, no hay contenido de terceros y no se renderiza
 * ningún input del visitante. La superficie de XSS es prácticamente nula.
 * El día que exista un backend propio o contenido de usuarios, esta decisión
 * se revisa.
 *
 * connect-src CON api.web3forms.com ES OBLIGATORIO. El formulario hace fetch a
 * ese dominio desde el navegador. Sin esa línea el CSP lo bloquea y el form
 * falla SOLO EN PRODUCCION — en desarrollo no hay headers y todo anda. Es el
 * peor tipo de bug: el que aparece después de deployar.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://api.web3forms.com",
  "form-action 'self' https://api.web3forms.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  /*
    frame-ancestors del CSP ya cubre esto en navegadores modernos. Va igual
    porque no cuesta nada y cubre a los que no soportan CSP nivel 2.
  */
  { key: "X-Frame-Options", value: "DENY" },
  /*
    Sin esto, un navegador puede "adivinar" que un archivo es JavaScript
    aunque el servidor diga que es texto, y ejecutarlo.
  */
  { key: "X-Content-Type-Options", value: "nosniff" },
  /*
    Al salir del sitio se manda el origen, no la URL completa. En un portfolio
    de una sola página cambia poco; es higiene, y es el default que querés
    tener puesto de entrada en cualquier proyecto.
  */
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  /*
    El sitio no usa cámara, micrófono ni ubicación. Declararlo apagado impide
    que un script de terceros los pida en tu nombre.
  */
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
