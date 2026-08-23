import { Section } from "./Section";

/**
 * Contact.
 *
 * ESQUELETO: falta ContactForm, que va a ser el unico Client Component del
 * sitio junto con LiquidGooey. Decisiones ya tomadas en el eng review:
 *   - 4 estados explícitos: idle | submitting | success | error
 *   - botón bloqueado durante el envío (evita el doble envío)
 *   - honeypot: el campo `botcheck` de Web3Forms, NO uno casero. Un honeypot
 *     con otro nombre no lo filtra nadie y el spam llega igual
 *   - fetch directo al cliente, sin route handler
 *
 * Y una trampa que espera en producción: si se agrega CSP a next.config.js
 * sin `connect-src https://api.web3forms.com`, el formulario deja de enviar.
 * Falla solo en producción, nunca en next dev.
 */
export function Contact() {
  return <Section id="contact" title="CONTACT" />;
}
