"use client";

import { useState } from "react";
import { buttonClasses } from "./Button";
import { ContactFallback } from "./ContactFallback";
import { CONTACT_COPY, HONEYPOT_FIELD } from "@/content/contact";

type Status = "idle" | "submitting" | "success" | "error";

type ContactFormProps = {
  /**
   * La access key llega como prop y no se lee de process.env acá.
   *
   * POR QUE: quien decide si hay formulario o no es Contact, el Server
   * Component. Si este componente también consultara el entorno, la misma
   * decisión viviría en dos archivos y podrían discrepar. Además vuelve al
   * componente testeable sin tocar variables de entorno: se le pasa una key y
   * listo.
   */
  accessKey: string;
};

const INPUT_CLASSES =
  "w-full rounded-sm border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted transition-colors duration-fast hover:border-muted";

const LABEL_CLASSES = "text-sm font-semibold uppercase tracking-[0.2em] text-muted";

/**
 * Formulario de contacto. EL SEGUNDO Y ULTIMO CLIENT COMPONENT DEL SITIO.
 *
 * POR QUE ACA SI HACE FALTA: el formulario tiene estado que cambia en el
 * navegador (enviando / enviado / falló) y ese estado no lo puede calcular el
 * servidor. Es el caso legítimo de "use client", a diferencia de una sección de
 * texto que se renderiza una vez y no cambia más.
 *
 * FETCH DIRECTO A WEB3FORMS, SIN ROUTE HANDLER PROPIO (eng review). El argumento
 * habitual a favor del intermediario —"no exponer la API key"— no aplica: la key
 * de Web3Forms es pública por diseño y su documentación lo dice. Un route
 * handler no escondería nada y convertiría la ruta en dinámica, así que el sitio
 * dejaría de ser 100% estático. Lo que sí compraría es rate limiting, y eso está
 * anotado en TODOS.md con su disparador concreto.
 *
 * SIN LIBRERIA DE FORMULARIOS. Tres campos y una validación no justifican
 * react-hook-form: el navegador ya valida `required` y `type="email"`, y
 * FormData ya sabe leer un form. Meter una dependencia acá sería agregar
 * concepto sin resolver un problema que exista.
 */
export function ContactForm({ accessKey }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      /*
        Web3Forms responde 200 con `success: false` cuando rechaza el envío
        (por ejemplo, cuando el honeypot vino completo). Mirar solo response.ok
        daría por enviado un mensaje que nunca llegó.
      */
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      /*
        role="status" hace que el lector de pantalla anuncie el mensaje sin que
        el visitante tenga que ir a buscarlo. Sin esto, quien no ve la pantalla
        aprieta "Send" y no se entera de que funcionó.
      */
      <p role="status" className="mt-block text-lead text-foreground">
        {CONTACT_COPY.success}
      </p>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="mt-block max-w-xl">
      <div className="flex flex-col gap-block">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className={LABEL_CLASSES}>
            {CONTACT_COPY.nameLabel}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={INPUT_CLASSES}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className={LABEL_CLASSES}>
            {CONTACT_COPY.emailLabel}
          </label>
          {/*
            type="email" no es cosmético: le da al navegador la validación y, en
            mobile, el teclado con la arroba a mano.
          */}
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={INPUT_CLASSES}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className={LABEL_CLASSES}>
            {CONTACT_COPY.messageLabel}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            className={`${INPUT_CLASSES} resize-y`}
          />
        </div>
      </div>

      {/*
        Honeypot. Un campo que un humano no ve y un bot completa por reflejo;
        Web3Forms descarta el envío si viene con algo adentro.

        VA OCULTO CON CSS Y NO CON `type="hidden"`: un input hidden no lo
        completa ningún bot, justamente porque no parece un campo del
        formulario. La trampa depende de que parezca real.

        tabIndex={-1} y aria-hidden lo sacan del camino del teclado y del lector
        de pantalla, así nadie que navegue sin mouse lo completa sin querer y
        queda marcado como bot.
      */}
      <input
        type="checkbox"
        name={HONEYPOT_FIELD}
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="mt-block">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${buttonClasses("primary")} disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {isSubmitting ? CONTACT_COPY.submitting : CONTACT_COPY.submit}
        </button>
      </div>

      {status === "error" && <ContactFallback message={CONTACT_COPY.error} />}
    </form>
  );
}
