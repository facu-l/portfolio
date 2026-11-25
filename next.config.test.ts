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
