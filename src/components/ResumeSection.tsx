import Link from "next/link";
import {
  IoBookOutline,
  IoBriefcaseOutline,
  IoGitPullRequestOutline,
  IoDocumentTextOutline,
  IoCodeSlashOutline,
  IoRibbonOutline,
} from "react-icons/io5";
import {
  achievements,
  education,
  experience,
  openSource,
  publication,
  skillGroups,
} from "@/data/portfolio-data";

function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="title-wrapper">
      <div className="icon-box" aria-hidden="true">{icon}</div>
      <h2 className="h3">{children}</h2>
    </div>
  );
}

export default function ResumeSection() {
  return (
    <article className="resume">
      <header>
        <h1 className="h2 article-title">Resume</h1>
      </header>

      {/* Experience */}
      <section className="timeline">
        <SectionTitle icon={<IoBriefcaseOutline />}>Experience</SectionTitle>

        <ol className="timeline-list">
          {experience.map((item) => (
            <li key={`${item.role}-${item.period}`} className="timeline-item">
              <h3 className="h4 timeline-item-title">
                {item.role}, {item.org}
                {item.place ? `, ${item.place}` : ""}
              </h3>
              <span>{item.period}</span>
              <ul className="timeline-points">
                {item.points.map((p) => (
                  <li key={p} className="timeline-text">{p}</li>
                ))}
                {item.projects?.map((p) => (
                  <li key={p.name} className="timeline-text">
                    {p.href ? (
                      <Link href={p.href} className="inline-link">{p.name}</Link>
                    ) : (
                      <strong>{p.name}</strong>
                    )}
                    {p.inProgress && <span className="status-pill">In progress</span>}
                    {": "}
                    {p.text}
                  </li>
                ))}
                {item.additional && (
                  <li className="timeline-text">
                    <strong className="additional-label">Additional contributions:</strong>{" "}
                    {item.additional}
                  </li>
                )}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Open source: one compact block instead of separate timeline entries */}
      <section className="timeline">
        <SectionTitle icon={<IoGitPullRequestOutline />}>{openSource.title}</SectionTitle>
        <div className="open-source-card">
          <p className="timeline-text">{openSource.roles}</p>
          <ul className="open-source-stats">
            {openSource.stats.map((s) => (
              <li key={s.label}>
                <span className="metric-value">{s.value}</span>
                <span className="metric-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Skills: grouped tags, no percentages */}
      <section className="timeline">
        <SectionTitle icon={<IoCodeSlashOutline />}>Skills</SectionTitle>
        <dl className="skill-groups">
          {skillGroups.map((g) => (
            <div key={g.name} className="skill-group">
              <dt className="skill-group-name">{g.name}</dt>
              <dd>
                <ul className="tag-list">
                  {g.items.map((s) => (
                    <li key={s} className="tag">{s}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Education */}
      <section className="timeline">
        <SectionTitle icon={<IoBookOutline />}>Education</SectionTitle>
        <ol className="timeline-list">
          {education.map((item) => (
            <li key={item.title} className="timeline-item">
              <h3 className="h4 timeline-item-title">
                {item.title}, {item.place}
              </h3>
              <span>{item.period}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Publication */}
      <section className="timeline">
        <SectionTitle icon={<IoDocumentTextOutline />}>Publication</SectionTitle>
        <ol className="timeline-list">
          <li className="timeline-item">
            <h3 className="h4 timeline-item-title publication-title">
              <a href={publication.links[0].href} target="_blank" rel="noopener noreferrer">
                {publication.title}
              </a>
            </h3>
            <span>
              {publication.venue}, {publication.year}
            </span>
            <p className="timeline-text">
              {publication.result}. With {publication.coAuthors}.
            </p>
            <p className="timeline-text publication-links">
              {publication.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-link">
                  {l.label}
                </a>
              ))}
            </p>
          </li>
        </ol>
      </section>

      {/* Achievements & certifications: link only where a verification URL exists */}
      <section className="timeline">
        <SectionTitle icon={<IoRibbonOutline />}>Achievements &amp; certifications</SectionTitle>
        <ul className="achievement-list">
          {achievements.map((a) => (
            <li key={a.title} className="timeline-text">
              {a.href ? (
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="inline-link">
                  {a.title}
                </a>
              ) : (
                <span className="achievement-title">{a.title}</span>
              )}
              {a.issuer && <>, {a.issuer}</>}
              {a.date && <> ({a.date})</>}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
