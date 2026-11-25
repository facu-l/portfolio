import type { SiteContent } from "@/content";
import { PERSON, SOCIAL_LINKS } from "@/content/config";
import { ExternalLink } from "./ExternalLink";

type FooterProps = {
  footer: SiteContent["footer"];
  opensInNewTab: string;
};

export function Footer({ footer, opensInNewTab }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-block sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-extrabold tracking-tight">
          {PERSON.name}
          <span aria-hidden="true" className="text-accent">
            .
          </span>
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
          <ul className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <ExternalLink
                  href={link.href}
                  opensInNewTab={opensInNewTab}
                  className="text-sm font-semibold text-muted hover:text-foreground"
                >
                  {link.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
          <p className="font-mono text-mono text-muted">
            © {year} · {footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
