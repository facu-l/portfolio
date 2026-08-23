/**
 * Contenido y configuración de la sección Contact.
 *
 * SOBRE LA ACCESS KEY DE WEB3FORMS: es pública por diseño. La documentación de
 * Web3Forms lo dice explícitamente — viaja en el body de un POST desde el
 * navegador y cualquiera puede leerla en las devtools. NO es un secret.
 *
 * Aun así va en una variable de entorno y no hardcodeada, por dos razones que
 * no tienen nada que ver con esconderla:
 *
 * 1. Rotarla no requiere tocar código. Si alguien la usa para spamear tu
 *    inbox, la cambiás en Vercel y redeployás.
 * 2. El repo del portfolio es público. Una key hardcodeada en GitHub es una
 *    invitación a que un bot la copie y mande formularios a tu casilla.
 *
 * OJO CON NEXT_PUBLIC_: se reemplaza en tiempo de BUILD, no de runtime.
 * Agregarla en Vercel no alcanza — hay que redeployar para que entre. Es el
 * mismo error que ya nos pasó con NEXT_PUBLIC_SITE_URL y el og:url.
 */
export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

/**
 * El intro NO promete el formulario. Dice para qué estás disponible y nada más.
 *
 * La primera versión terminaba en "Drop me a message and I'll get back to you"
 * y, cuando falta la access key, quedaba seguida de "the contact form isn't set
 * up yet": el sitio se contradecía a sí mismo en dos renglones. Un texto que
 * sirve en los dos estados es más corto Y no se puede desincronizar.
 */
export const CONTACT_INTRO = `Open to internships and junior developer roles, and happy to talk about a project.`;

export const CONTACT_COPY = {
  nameLabel: "Name",
  emailLabel: "Email",
  messageLabel: "Message",
  submit: "SEND MESSAGE",
  submitting: "SENDING...",
  success: "Thanks — your message is on its way. I'll get back to you soon.",
  /**
   * El error no deja al visitante en un callejón sin salida: le ofrece el
   * camino alternativo. Un formulario que falla y solo dice "error" pierde el
   * contacto que ya estaba decidido a escribirte.
   */
  error: "Something went wrong sending your message. You can reach me on LinkedIn instead:",
  /** Cuando falta la access key. Ver la nota de arriba. */
  unavailable: "The fastest way to reach me:",
} as const;

/**
 * Nombre del campo honeypot que Web3Forms filtra del lado del servidor.
 *
 * NO ES UN NOMBRE CUALQUIERA: Web3Forms busca específicamente `botcheck`. Si lo
 * renombrás a `website` o `nickname` el campo sigue estando oculto, los bots lo
 * siguen completando, y Web3Forms deja de filtrarlo — el honeypot queda de
 * adorno sin que nada avise.
 */
export const HONEYPOT_FIELD = "botcheck";
