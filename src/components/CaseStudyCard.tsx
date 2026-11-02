import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import type { CaseStudy } from "@/data/case-studies";
import StatusPill from "./StatusPill";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const headline = study.results[0];

  return (
    <li className={`cs-card${study.featured ? " cs-card-featured" : ""}`}>
      <div className="cs-card-meta">
        <span className="cs-card-context">{study.context}</span>
        <StatusPill status={study.status} />
      </div>

      <h2 className="cs-card-title">
        <Link href={`/work/${study.slug}`} className="cs-card-link">
          {study.title}
        </Link>
      </h2>

      <p className="cs-card-summary">{study.summary}</p>

      {headline && (
        <p className="cs-card-result">
          <span className="metric-value">{headline.value}</span>
          <span className="metric-label">{headline.label}</span>
        </p>
      )}

      {study.stack.length > 0 && (
        <ul className="tag-list" aria-label="Stack">
          {study.stack.slice(0, 5).map((t) => (
            <li key={t} className="tag">{t}</li>
          ))}
        </ul>
      )}

      <span className="cs-card-cta" aria-hidden="true">
        Read case study <IoArrowForward />
      </span>
    </li>
  );
}
