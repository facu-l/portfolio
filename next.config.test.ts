import { describe, it, expect } from "vitest";
import config from "./next.config";

describe("next.config redirects", () => {
  /*
    La URL vieja del case study ya circula: está en el CV y en LinkedIn. Si deja
    de existir, el link más visible del portfolio da 404.
  */
  it("the old case-study URL redirects permanently to the English page", async () => {
    const redirects = await config.redirects!();
    expect(redirects).toContainEqual({
      source: "/work/gym-management-system",
      destination: "/en/work/gym-management-system",
      permanent: true,
    });
  });
});

describe("Content-Security-Policy", () => {
  /*
    React en desarrollo usa eval() para reconstruir los stack traces. Sin
    'unsafe-eval' el overlay de Next muestra un error en cada carga, y ese ruido
    tapa los errores reales (así se escondió un desajuste de hidratación).
    En producción React nunca usa eval, así que ahí no se habilita.
  */
  it("allows eval only in development", async () => {
    const { contentSecurityPolicy } = await import("./next.config");
    expect(contentSecurityPolicy({ isDev: true })).toMatch(/script-src [^;]*'unsafe-eval'/);
    expect(contentSecurityPolicy({ isDev: false })).not.toMatch(/unsafe-eval/);
  });
});
