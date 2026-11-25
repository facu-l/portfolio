// @vitest-environment node
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy, config } from "./proxy";

function request(acceptLanguage?: string) {
  const headers = new Headers();
  if (acceptLanguage !== undefined) headers.set("accept-language", acceptLanguage);
  return new NextRequest("https://example.com/", { headers });
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

  /*
    El proxy corre SOLO en "/". Si el matcher se ampliara, /en también pasaría
    por acá y podría redirigir en loop. Es el riesgo #1 del Review Focus.
  */
  it("only runs on the root path, so a localized URL can never loop", () => {
    expect(config.matcher).toEqual(["/"]);
  });
});
