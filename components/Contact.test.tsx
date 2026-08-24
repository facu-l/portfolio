import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";
import { ContactFallback } from "./ContactFallback";
import { ContactForm } from "./ContactForm";
import { CONTACT_INTRO, CONTACT_COPY } from "@/content/contact";
import { SOCIAL_LINKS } from "@/content/site";

describe("Contact", () => {
  it("es un landmark con nombre accesible", () => {
    render(<Contact />);
    expect(screen.getByRole("region", { name: /contact/i })).toBeInTheDocument();
  });

  it("muestra el intro", () => {
    render(<Contact />);
    expect(screen.getByText(CONTACT_INTRO)).toBeInTheDocument();
  });

  /**
   * En los tests no hay NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY, así que este es el
   * estado sin key — que además es el que está publicado hoy. Sin key NO se
   * renderiza un formulario que postea a ninguna parte: se ofrecen los links.
   *
   * Un form muerto es peor que no tener form: el visitante escribe, aprieta
   * enviar, y se va convencido de que el mensaje llegó.
   */
  it("sin access key ofrece los links sociales en vez de un form muerto", () => {
    render(<Contact />);
    expect(screen.queryByRole("button", { name: /send message/i })).toBeNull();
    expect(screen.getByText(CONTACT_COPY.unavailable)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
  });

  /**
   * El intro tiene que servir en los dos estados. La primera versión terminaba
   * en "Drop me a message and I'll get back to you" y, sin key, quedaba seguida
   * del texto del fallback: el sitio se contradecía en dos renglones.
   */
  it("el intro no promete un formulario que puede no estar", () => {
    expect(CONTACT_INTRO).not.toMatch(/form|message me|drop me/i);
  });

  /**
   * EL INTRO Y EL FORMULARIO COMPARTEN BORDE DERECHO, y este test existe porque
   * ese acuerdo vive en dos archivos distintos: el <p> está en Contact.tsx y el
   * <form> en ContactForm.tsx.
   *
   * Estuvieron desincronizados (576px el form, 672px el intro) y no se notaba
   * mientras los dos estaban sobre el fondo de página: alineados a la
   * izquierda, sin nada a la derecha contra qué comparar. Al meter la sección
   * en un panel de 976px quedaron TRES bordes derechos distintos y la
   * diferencia saltó a la vista.
   *
   * Es el modo de falla clásico del valor duplicado: alguien ajusta uno, el
   * otro se queda, y nadie lo ve hasta que cambia el contexto que lo hacía
   * invisible.
   */
  it("el intro y el formulario tienen el mismo ancho máximo", () => {
    /*
      SE RENDERIZAN POR SEPARADO Y NO CON UN SOLO <Contact />, porque en el
      entorno de tests no hay NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: Contact detecta
      que no hay key y renderiza el fallback en vez del formulario. Montar
      ContactForm directamente es lo único que garantiza que el <form> exista
      sin depender de una variable de entorno.
    */
    const { unmount } = render(<Contact />);
    const anchoIntro = screen
      .getByText(CONTACT_INTRO)
      .className.match(/max-w-\S+/)?.[0];
    unmount();

    const { container } = render(<ContactForm accessKey="test-key" />);
    const anchoForm = container
      .querySelector("form")
      ?.className.match(/max-w-\S+/)?.[0];

    expect(anchoIntro, "el intro perdió su max-w").toBeDefined();
    expect(anchoForm, "el formulario perdió su max-w").toBeDefined();
    expect(anchoForm).toBe(anchoIntro);
  });
});

describe("ContactFallback", () => {
  it("lista todos los links sociales abriendo en pestaña nueva", () => {
    render(<ContactFallback message="Contactame acá:" />);

    for (const social of SOCIAL_LINKS) {
      const link = screen.getByRole("link", {
        name: new RegExp(social.label, "i"),
      });
      expect(link).toHaveAttribute("href", social.href);
      expect(link.getAttribute("rel")).toContain("noopener");
    }
  });

  /**
   * role="status" es lo que hace que, cuando el envío falla, un lector de
   * pantalla anuncie el problema en vez de dejar al visitante esperando sin
   * saber qué pasó.
   */
  it("es una región viva para que el error se anuncie solo", () => {
    render(<ContactFallback message="Algo falló" />);
    expect(screen.getByRole("status")).toHaveTextContent("Algo falló");
  });
});
