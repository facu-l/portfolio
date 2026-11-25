import type { Decision } from "@/content";
import { ExternalLink } from "./ExternalLink";

type DecisionCardProps = {
  decision: Decision;
  /** Posición, empezando en 1. */
  index: number;
  total: number;
  /** "Decision" / "Decisión" */
  label: string;
  /** "of" / "de" */
  ofLabel: string;
  opensInNewTab: string;
  /** 4 en el home (bajo el h3 del caso), 3 en la página del caso (bajo un h2). */
  headingLevel?: 3 | 4;
};

/**
 * EL ELEMENTO CENTRAL DEL CASEBOOK: una decisión técnica real, por qué se tomó
 * y el link al código que la prueba.
 *
 * Es lo que convierte "sé Postgres" (una afirmación) en "acá está la migración
 * donde el stock solo se mueve por un ledger" (evidencia), y lo que le da al
 * líder técnico una pregunta concreta para la entrevista.
 *
 * El rótulo "Decision 1 of 5" va en mono y en lima: es dato verificable. La
 * tarjeta usa `surface` porque es la única elevación real de la página.
 */
export function DecisionCard({
  decision,
  index,
  total,
  label,
  ofLabel,
  opensInNewTab,
  headingLevel = 4,
}: DecisionCardProps) {
  const Heading = headingLevel === 3 ? "h3" : "h4";

  return (
    <div className="flex h-full flex-col gap-3 rounded-sm border border-border bg-surface p-6">
      <p className="font-mono text-mono text-accent">
        {label} {index} {ofLabel} {total}
      </p>
      <Heading className="text-h3 leading-snug font-semibold tracking-tight text-foreground">
        {decision.title}
      </Heading>
      <p className="leading-relaxed text-muted">{decision.why}</p>
      <ExternalLink
        href={decision.evidence.href}
        opensInNewTab={opensInNewTab}
        className="link-evidence mt-auto self-start font-mono text-mono"
      >
        {decision.evidence.label}
      </ExternalLink>
    </div>
  );
}
