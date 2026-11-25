import { describe, it, expect, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/es", notFound: vi.fn() }));

import { generateMetadata } from "./page";

/*
  Next reemplaza el objeto openGraph entero en vez de mezclarlo con el del
  layout. Si la página de caso no declara el suyo, hereda og:url = /es y la
  card de un caso compartido en LinkedIn lleva al home.
*/
describe("case page metadata", () => {
  it("declares its own og:url so a shared case links to the case, not the home", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ lang: "es", slug: "gym-management-system" }),
    } as Parameters<typeof generateMetadata>[0]);

    expect(meta.openGraph?.url).toBe("/es/work/gym-management-system");
    expect(meta.openGraph).toMatchObject({ type: "article", locale: "es_AR" });
  });
});
