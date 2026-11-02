import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoArrowBack, IoArrowForward, IoOpenOutline } from "react-icons/io5";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import StatusPill from "@/components/StatusPill";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { pageSocial } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    ...pageSocial(study.title, study.summary, `/work/${study.slug}`),
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <article className="case-study">
      <Link href="/work" className="back-link">
        <IoArrowBack aria-hidden="true" /> All work
      </Link>

      <header className="cs-header">
        <div className="cs-card-meta">
          <span className="cs-card-context">{study.context}</span>
          <StatusPill status={study.status} />
        </div>
        <h1 className="cs-title">{study.title}</h1>
        <p className="cs-summary">{study.summary}</p>
      </header>

      {study.results.length > 0 && (
        <ul className="metrics-list" aria-label="Results">
          {study.results.map((r) => (
            <li key={r.label} className="metric-item">
              <span className="metric-value">{r.value}</span>
              <span className="metric-label">{r.label}</span>
            </li>
          ))}
        </ul>
      )}

      {study.links.length > 0 && (
        <div className="hero-actions cs-links">
          {study.links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${i === 0 ? "btn-primary" : "btn-secondary"}`}
            >
              {l.label} <IoOpenOutline aria-hidden="true" />
            </a>
          ))}
        </div>
      )}

      <dl className="cs-facts">
        <div>
          <dt>Problem</dt>
          <dd>{study.problem}</dd>
        </div>
        <div>
          <dt>My role</dt>
          <dd>{study.role}</dd>
        </div>
        {study.stack.length > 0 && (
          <div>
            <dt>Stack</dt>
            <dd>
              <ul className="tag-list">
                {study.stack.map((t) => (
                  <li key={t} className="tag">{t}</li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>

      <section className="cs-section" aria-labelledby="arch-title">
        <h2 id="arch-title" className="h3 section-title">Architecture</h2>
        <ArchitectureDiagram steps={study.architecture} title={study.title} />
      </section>

      {study.outcomes.length > 0 && (
        <section className="cs-section" aria-labelledby="outcome-title">
          <h2 id="outcome-title" className="h3 section-title">
            {study.status === "In progress" ? "Status" : "Result"}
          </h2>
          <ul className="cs-outcomes">
            {study.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>
      )}

      {study.image && (
        <section className="cs-section" aria-labelledby="shot-title">
          <h2 id="shot-title" className="h3 section-title">Screenshot</h2>
          <Image
            src={study.image.src}
            alt={study.image.alt}
            width={study.image.width}
            height={study.image.height}
            sizes="(min-width: 1250px) 820px, 92vw"
            className="cs-image"
          />
        </section>
      )}

      <nav className="cs-next" aria-label="Next case study">
        <Link href={`/work/${next.slug}`} className="cs-next-link">
          <span className="cs-next-label">Next case study</span>
          <span className="cs-next-title">
            {next.title} <IoArrowForward aria-hidden="true" />
          </span>
        </Link>
      </nav>
    </article>
  );
}
