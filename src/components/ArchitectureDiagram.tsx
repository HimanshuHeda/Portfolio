import type { CaseStudy } from "@/data/case-studies";

// Simple top-to-bottom flow. Used instead of screenshots so no client UI or
// data is ever shown.
export default function ArchitectureDiagram({
  steps,
  title,
}: {
  steps: CaseStudy["architecture"];
  title: string;
}) {
  return (
    <figure className="arch">
      <ol className="arch-list">
        {steps.map((s, i) => (
          <li key={s.label} className="arch-step">
            <span className="arch-index" aria-hidden="true">{i + 1}</span>
            <div>
              <p className="arch-label">{s.label}</p>
              {s.detail && <p className="arch-detail">{s.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="sr-only">Architecture of {title}, in order</figcaption>
    </figure>
  );
}
