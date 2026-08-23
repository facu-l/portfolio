import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";
import { HONEYPOT_FIELD, CONTACT_COPY } from "@/content/contact";

const KEY = "clave-de-prueba";

/** Completa los tres campos y envía. Es el preámbulo de casi todos los tests. */
async function completarYEnviar() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/name/i), "Ana");
  await user.type(screen.getByLabelText(/email/i), "ana@ejemplo.com");
  await user.type(screen.getByLabelText(/message/i), "Hola");
  await user.click(screen.getByRole("button", { name: /send message/i }));
}

describe("ContactForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("los tres campos tienen label asociado y el tipo correcto", () => {
    render(<ContactForm accessKey={KEY} />);
    expect(screen.getByLabelText(/name/i)).toBeRequired();
    expect(screen.getByLabelText(/email/i)).toHaveAttribute("type", "email");
    expect(screen.getByLabelText(/message/i)).toBeRequired();
  });

  /**
   * El honeypot es el único mecanismo antispam del sitio. Este test fija las
   * tres cosas que lo hacen funcionar:
   *
   * - el nombre EXACTO que Web3Forms filtra del lado del servidor. Renombrarlo
   *   a "website" o "nickname" deja el campo oculto y a los bots completándolo,
   *   pero Web3Forms ya no lo filtra: el honeypot queda de adorno.
   * - que esté oculto por CSS y no con type="hidden". Un input hidden no lo
   *   completa ningún bot, que es exactamente lo contrario de lo que se busca.
   * - que esté fuera del camino del teclado, para que nadie navegando sin mouse
   *   lo complete sin querer y quede marcado como bot.
   */
  it("el honeypot conserva el nombre, el tipo y el aislamiento que necesita", () => {
    const { container } = render(<ContactForm accessKey={KEY} />);
    const honeypot = container.querySelector(`[name="${HONEYPOT_FIELD}"]`);

    expect(honeypot).not.toBeNull();
    expect(honeypot!.getAttribute("type")).toBe("checkbox");
    expect(honeypot!.getAttribute("tabindex")).toBe("-1");
    expect(honeypot!.getAttribute("aria-hidden")).toBe("true");
  });

  it("envía a Web3Forms con la access key y muestra el éxito", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm accessKey={KEY} />);
    await completarYEnviar();

    await waitFor(() =>
      expect(screen.getByText(CONTACT_COPY.success)).toBeInTheDocument()
    );

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.web3forms.com/submit");
    const body = options.body as FormData;
    expect(body.get("access_key")).toBe(KEY);
    expect(body.get("name")).toBe("Ana");
    expect(body.get("email")).toBe("ana@ejemplo.com");
    expect(body.get("message")).toBe("Hola");
  });

  /**
   * Web3Forms responde 200 con `success: false` cuando rechaza el envío (por
   * ejemplo, cuando el honeypot vino completo). Mirar solo el status HTTP daría
   * por enviado un mensaje que nunca llegó, y ese es el peor error posible acá:
   * el visitante se va convencido de que te escribió.
   */
  it("un 200 con success:false se trata como error, no como éxito", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: false }) })
    );

    render(<ContactForm accessKey={KEY} />);
    await completarYEnviar();

    await waitFor(() =>
      expect(screen.getByText(CONTACT_COPY.error)).toBeInTheDocument()
    );
    expect(screen.queryByText(CONTACT_COPY.success)).toBeNull();
  });

  it("si la red falla ofrece el camino alternativo en vez de un error seco", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    render(<ContactForm accessKey={KEY} />);
    await completarYEnviar();

    await waitFor(() =>
      expect(screen.getByText(CONTACT_COPY.error)).toBeInTheDocument()
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
  });

  /**
   * Sin deshabilitar el botón, un doble click manda el mensaje dos veces. Con
   * un servicio que cobra por envío eso cuesta plata; acá cuesta que te lleguen
   * mails duplicados y no sepas por qué.
   */
  it("deshabilita el botón mientras envía", async () => {
    let resolver: (value: unknown) => void = () => {};
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(new Promise((res) => (resolver = res)))
    );

    render(<ContactForm accessKey={KEY} />);
    await completarYEnviar();

    const boton = screen.getByRole("button", { name: /sending/i });
    expect(boton).toBeDisabled();

    resolver({ ok: true, json: async () => ({ success: true }) });
    await waitFor(() =>
      expect(screen.getByText(CONTACT_COPY.success)).toBeInTheDocument()
    );
  });
});
