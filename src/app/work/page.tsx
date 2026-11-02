import type { Metadata } from "next";
import Image from "next/image";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies, earlierWork } from "@/data/case-studies";
import { designProjects } from "@/data/portfolio-data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies by Himanshu Heda: FabVision AI on Google Play, workflow automation that cut manual processing by 80%, a 60 min to under 5 sec pump selector, and more.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <article className="work">
      <header>
        <h1 className="h2 article-title">Work</h1>
        <p className="page-intro">
          Production systems I have built, flagship first. Client work is described without client names or data.
        </p>
      </header>

      <ul className="cs-grid">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </ul>

      <section className="earlier-work" aria-labelledby="earlier-title">
        <h2 id="earlier-title" className="h3 section-title">Earlier work</h2>
        <ul className="earlier-list">
          {earlierWork.map((p) => (
            <li key={p.title}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="earlier-link">
                <span className="earlier-title">{p.title}</span>
                <span className="earlier-tech">{p.tech}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="design-row" aria-labelledby="design-title">
        <h2 id="design-title" className="h3 section-title">Design (Figma)</h2>
        <ul className="design-list">
          {designProjects.map((d) => (
            <li key={d.title} className="design-item">
              <a href={d.url} target="_blank" rel="noopener noreferrer" className="design-thumb">
                <Image
                  src={d.image}
                  alt={`${d.title} design in Figma`}
                  width={320}
                  height={200}
                  sizes="(min-width: 1024px) 200px, 45vw"
                />
                <span className="design-title">{d.title}</span>
              </a>
              {d.prototypeUrl && (
                <a
                  href={d.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-link design-proto"
                >
                  Prototype
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
