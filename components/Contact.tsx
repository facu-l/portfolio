import type { SiteContent } from "@/content";
import { CV_FILES, PERSON, SOCIAL_LINKS } from "@/content/config";
import { LOCALES } from "@/lib/locale";
import { Section } from "./Section";
import { CopyEmailButton } from "./CopyEmailButton";
import { ContactForm } from "./ContactForm";
import { ContactFallback } from "./ContactFallback";
import { ExternalLink } from "./ExternalLink";

type ContactProps = {
  contact: SiteContent["contact"];
  /** Las etiquetas del botón de copiar viven en hero: son las mismas. */
  hero: SiteContent["hero"];
  opensInNewTab: string;
  accessKey: string;
};

/** Nombre de cada idioma en su propio idioma: así lo reconoce quien lo habla. */
const LANGUAGE_NAMES = { en: "English", es: "Español" } as const;

/**
 * Contacto: lo que más rápido funciona, primero. Disponibilidad, email (visible
 * y copiable), los dos CV y los perfiles. El formulario queda abajo como
 * opción secundaria: un recruiter prefiere copiar el email.
 */
export function Contact({ contact, hero, opensInNewTab, accessKey }: ContactProps) {
  return (
    <Section id="contact" title={contact.title}>
      <div className="mt-block grid gap-x-12 gap-y-block md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono text-mono text-accent">{contact.availability}</p>
          <p className="mt-3 max-w-[52ch] text-lead leading-relaxed text-foreground/85">{contact.intro}</p>
          <div className="mt-6">
            <CopyEmailButton
              email={PERSON.email}
              copyLabel={hero.copyLabel}
              copiedLabel={hero.copiedLabel}
              copyFailedLabel={hero.copyFailedLabel}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h3 className="font-mono text-mono text-muted">{contact.cvTitle}</h3>
            <ul className="mt-2 flex flex-wrap gap-x-6">
              {LOCALES.map((code) => (
                <li key={code}>
                  <a
                    href={CV_FILES[code]}
                    hrefLang={code}
                    download
                    className="link-evidence inline-flex min-h-11 items-center font-semibold"
                  >
                    {LANGUAGE_NAMES[code]} (PDF)
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-mono text-muted">{contact.elsewhereTitle}</h3>
            <ul className="mt-2 flex flex-wrap gap-x-6">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <ExternalLink href={link.href} opensInNewTab={opensInNewTab} className="link-evidence font-semibold">
                    {link.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-section border-t border-border pt-block">
        <h3 className="text-h3 font-semibold tracking-tight">{contact.formTitle}</h3>
        {accessKey ? (
          <ContactForm accessKey={accessKey} copy={contact.form} opensInNewTab={opensInNewTab} />
        ) : (
          <ContactFallback message={contact.form.unavailable} opensInNewTab={opensInNewTab} />
        )}
      </div>
    </Section>
  );
}
