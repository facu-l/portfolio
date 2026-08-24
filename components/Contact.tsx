import { Section } from "./Section";
import { ContactForm } from "./ContactForm";
import { ContactFallback } from "./ContactFallback";
import {
  CONTACT_INTRO,
  CONTACT_COPY,
  WEB3FORMS_ACCESS_KEY,
} from "@/content/contact";
import { Panel } from "./Panel";

/**
 * Contact. Server Component que decide si hay formulario.
 *
 * ACA SE CONSULTA EL ENTORNO Y EN NINGUN OTRO LADO. Sin access key no se
 * renderiza un formulario que postea a ninguna parte: se ofrecen los links
 * sociales. Un form muerto es peor que no tener form — el visitante escribe,
 * aprieta enviar, y se va convencido de que te llegó el mensaje.
 *
 * EL TEXTO SE RENDERIZA EN EL SERVIDOR. El intro va acá y no adentro de
 * ContactForm a propósito: todo lo que no necesita interactividad se queda del
 * lado del servidor y no viaja como JavaScript al navegador. Es el mismo patrón
 * que Navbar con StickyHeader — el límite del cliente se pone lo más adentro
 * posible, no lo más afuera.
 */
export function Contact() {
  return (
    <Section id="contact" title="CONTACT">
      <Panel className="mt-block">
        <p className="max-w-2xl text-lead leading-relaxed text-muted">
          {CONTACT_INTRO}
        </p>

        {WEB3FORMS_ACCESS_KEY ? (
          <ContactForm accessKey={WEB3FORMS_ACCESS_KEY} />
        ) : (
          <ContactFallback message={CONTACT_COPY.unavailable} />
        )}
      </Panel>
    </Section>
  );
}
