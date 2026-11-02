"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IoBookOutline,
  IoBriefcaseOutline,
  IoGitPullRequestOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import {
  education,
  experience,
  openSource,
  publication,
  skills,
} from "@/data/portfolio-data";

const slideInLeft = {
  hidden: { opacity: 0, x: -25 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: i * 0.05 },
  }),
};

function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="title-wrapper">
      <div className="icon-box" aria-hidden="true">{icon}</div>
      <h2 className="h3">{children}</h2>
    </div>
  );
}

export default function ResumeSection() {
  const [counterDone, setCounterDone] = useState(false);
  const countersRef = useRef<HTMLUListElement>(null);

  // animate skill counters on mount
  useEffect(() => {
    if (counterDone) return;
    setCounterDone(true);
    const timer = setTimeout(() => {
      if (!countersRef.current) return;
      countersRef.current
        .querySelectorAll<HTMLElement>(".skill-counter")
        .forEach((el) => {
          const target = parseInt(el.dataset.value || "0", 10);
          if (isNaN(target)) return;
          let current = 0;
          const increment = Math.max(1, Math.ceil(target / 40));
          const id = setInterval(() => {
            current = Math.min(current + increment, target);
            el.textContent = `${current}%`;
            if (current >= target) clearInterval(id);
          }, 22);
        });
    }, 450);
    return () => clearTimeout(timer);
  }, [counterDone]);

  return (
    <article className="resume">
      <header>
        <h1 className="h2 article-title">Resume</h1>
      </header>

      {/* Experience */}
      <section className="timeline">
        <SectionTitle icon={<IoBriefcaseOutline />}>Experience</SectionTitle>

        <ol className="timeline-list">
          {experience.map((item, i) => (
            <motion.li
              key={`${item.role}-${item.period}`}
              className="timeline-item"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={slideInLeft}
            >
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
            </motion.li>
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

      {/* Education */}
      <section className="timeline">
        <SectionTitle icon={<IoBookOutline />}>Education</SectionTitle>

        <ol className="timeline-list">
          {education.map((item, i) => (
            <motion.li
              key={item.title}
              className="timeline-item"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={slideInLeft}
            >
              <h3 className="h4 timeline-item-title">
                {item.title}, {item.place}
              </h3>
              <span>{item.period}</span>
            </motion.li>
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

      {/* Skills */}
      <section className="skill">
        <h2 className="h3 skills-title">My skills</h2>

        <ul className="skills-list content-card" ref={countersRef}>
          {skills.map((skill, i) => (
            <motion.li
              key={skill.name}
              className="skills-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              <div className="title-wrapper">
                <h3 className="h5">{skill.name}</h3>
                <span
                  className="skill-counter"
                  data-value={skill.value}
                >
                  0%
                </span>
              </div>
              <div className="skill-progress-bg">
                <div
                  className="skill-progress-fill"
                  style={{ width: `${skill.value}%` }}
                />
              </div>
            </motion.li>
          ))}
        </ul>
      </section>
    </article>
  );
}
