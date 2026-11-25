// @vitest-environment node
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy, config } from "./proxy";

function request(acceptLanguage?: string, path = "/") {
  const headers = new Headers();
  if (acceptLanguage !== undefined) headers.set("accept-language", acceptLanguage);
  return new NextRequest(`https://example.com${path}`, { headers });
}

describe("proxy", () => {
  it("redirects / to the browser's language", () => {
    const res = proxy(request("es-AR,es;q=0.9"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://example.com/es");
  });

  it("redirects / to English when there is no Accept-Language", () => {
    const res = proxy(request());
    expect(res.headers.get("location")).toBe("https://example.com/en");
  });

  it("keeps the query string, so UTM parameters from a shared link survive", () => {
    const res = proxy(request("es-AR", "/?utm_source=linkedin"));
    expect(res.headers.get("location")).toBe("https://example.com/es?utm_source=linkedin");
  });

  /*
    En un sistema de archivos que no distingue mayúsculas (Windows, macOS),
    un request a /Es hacía que Next sobrescribiera es.html con un 404 y rompía
    /es hasta el próximo build. Normalizar a minúsculas en el proxy lo evita en
    cualquier plataforma, y además manda a la URL canónica.
  */
  it("redirects a locale written in uppercase to its lowercase URL, keeping the rest", () => {
    const res = proxy(request(undefined, "/ES/work/falber?x=1"));
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("https://example.com/es/work/falber?x=1");
  });

  it("lets an exact lowercase locale through untouched, so a localized URL can never loop", () => {
    const res = proxy(request("es-AR", "/es/work/falber"));
    expect(res.headers.get("location")).toBeNull();
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });

  it("only runs on the root and on locale-looking first segments", () => {
    expect(config.matcher).toEqual(["/", "/(EN|En|eN|ES|Es|eS)", "/(EN|En|eN|ES|Es|eS)/:path*"]);
  });
});
