"use client";

import { useEffect, useRef, useState } from "react";

type CopyEmailButtonProps = {
  email: string;
  copyLabel: string;
  copiedLabel: string;
  copyFailedLabel: string;
};

type CopyState = "idle" | "copied" | "failed";

/**
 * Cuánto dura cada aviso antes de volver al estado inicial. El de fallo dura
 * más: es más largo de leer y es el único aviso de que algo salió mal.
 */
const FEEDBACK_MS: Record<Exclude<CopyState, "idle">, number> = { copied: 1500, failed: 4000 };

/**
 * El email, visible y copiable con un click.
 *
 * POR QUE EL EMAIL ES UN LINK Y "COPIAR" UN BOTON APARTE: copiar al
 * portapapeles puede fallar (permiso denegado, contexto no seguro, navegador
 * viejo). Si el email solo existiera adentro del botón, ese fallo dejaría al
 * recruiter sin forma de contactar. Así, en el peor caso, sigue teniendo el
 * texto para seleccionar y el `mailto:` para hacer click.
 *
 * El resultado se anuncia en un `role="status"` (aria-live polite): un lector
 * de pantalla dice "Email copiado" sin mover el foco.
 */
export function CopyEmailButton({
  email,
  copyLabel,
  copiedLabel,
  copyFailedLabel,
}: CopyEmailButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Si el componente se desmonta con el timer corriendo, no queremos un
  // setState sobre un componente que ya no existe.
  useEffect(() => () => clearTimer(timer), []);

  async function copy() {
    let next: CopyState = "failed";
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        next = "copied";
      }
    } catch {
      next = "failed";
    }
    setState(next);
    clearTimer(timer);
    timer.current = setTimeout(() => setState("idle"), FEEDBACK_MS[next]);
  }

  const announcement =
    state === "copied" ? copiedLabel : state === "failed" ? copyFailedLabel : "";

  return (
    /*
      Dos píldoras hermanas y no una píldora con dos cosas adentro: en un
      celular no entran en una línea, y así cada una baja entera en vez de
      deformar un contenedor redondeado.
    */
    <div className="inline-flex flex-wrap items-center gap-2">
      <a
        href={`mailto:${email}`}
        className="btn-pill inline-flex min-h-11 items-center rounded-full border border-border px-4 font-mono text-mono text-foreground hover:border-foreground"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="btn-pill inline-flex min-h-11 items-center rounded-full bg-surface px-4 text-sm font-semibold text-foreground hover:bg-border"
      >
        {state === "idle" ? copyLabel : announcement}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </div>
  );
}

function clearTimer(timer: { current: ReturnType<typeof setTimeout> | null }) {
  if (timer.current) clearTimeout(timer.current);
  timer.current = null;
}
