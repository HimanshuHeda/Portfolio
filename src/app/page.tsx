import type { Metadata } from "next";
import Link from "next/link";
import Chapter from "@/components/story/Chapter";
import ChapterArt from "@/components/story/ChapterArt";
import ChapterNav from "@/components/story/ChapterNav";
import SceneLoader from "@/components/story/SceneLoader";
import { personalInfo } from "@/data/portfolio-data";
import { boot, chapters, summary } from "@/data/story";
import { publicFileExists } from "@/lib/assets";
import "./story.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const hasResume = publicFileExists(personalInfo.resumeUrl);
  const [bootChapter, ...rest] = chapters;

  return (
    <div className="story" id="story-root" data-scene="static">
      <header className="story-top">
        <Link href="/" className="story-brand" aria-label={`${personalInfo.name}, home`}>
          <span aria-hidden="true">~/</span>himanshu-heda
        </Link>
        <nav aria-label="Main" className="story-top-nav">
          <a href="#now" className="skip-story">Skip story</a>
          <Link href="/work">Work</Link>
          <Link href="/resume">Resume</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <ChapterNav items={chapters.map(({ id, nav, index }) => ({ id, nav, index }))} />

      <SceneLoader />

      <main id="content" tabIndex={-1} className="story-main">
        {/* 00 / boot: hero. The h1 is the LCP element (text, never the canvas). */}
        <section id={bootChapter.id} className="chapter chapter-boot" data-chapter={0} aria-labelledby="boot-title">
          <div className="chapter-text">
            <p className="terminal">
              <span className="term-line">
                <span className="term-prompt" aria-hidden="true">$</span> <span className="typed">{boot.prompt}</span>
              </span>
              <span className="term-line term-out">{boot.output}</span>
            </p>

            <h1 id="boot-title" className="boot-title">
              <span className="boot-name">{boot.name}.</span> <span className="boot-role">{boot.role}</span>
            </h1>
            <p className="boot-sub">{boot.subheadline}</p>

            <div className="story-actions">
              {/* TODO(me): resume button shows only when public/assets/Resume/Himanshu_Heda_Resume.pdf exists. */}
              {hasResume && (
                <a href={personalInfo.resumeUrl} download className="btn-story btn-story-primary">
                  Download resume
                </a>
              )}
              <Link href="/contact" className="btn-story btn-story-secondary">Contact me</Link>
            </div>

            <p className="availability">
              <span className="availability-dot" aria-hidden="true" /> {boot.availability}
            </p>
          </div>
          <ChapterArt index={0} />
        </section>

        {/* 30-second summary: everything a recruiter needs without scrolling the story. */}
        <section id="summary" className="summary" aria-labelledby="summary-title">
          <h2 id="summary-title" className="summary-title">In 30 seconds</h2>
          <div className="term-block">
            <p className="term-cmd">
              <span className="term-prompt" aria-hidden="true">$</span> {summary.command}
            </p>
            <dl className="facts facts-summary">
              {summary.metrics.map((m) => (
                <div key={m.label} className="fact">
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="summary-line">{summary.line}</p>
          <ul className="chapter-links">
            {summary.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="story-link">
                  {l.label} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {rest.map((c) => (
          <Chapter key={c.id} chapter={c}>
            {c.id === "now" && (
              <div className="story-actions">
                <Link href="/contact" className="btn-story btn-story-primary">Contact me</Link>
                <a href={`mailto:${personalInfo.email}`} className="btn-story btn-story-secondary">
                  {personalInfo.email}
                </a>
                {hasResume && (
                  <a href={personalInfo.resumeUrl} download className="btn-story btn-story-secondary">
                    Download resume
                  </a>
                )}
              </div>
            )}
          </Chapter>
        ))}
      </main>

      <footer className="story-footer">
        <p>
          {personalInfo.name} · {personalInfo.location}
        </p>
        <ul>
          {personalInfo.socials.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
            </li>
          ))}
          <li>
            <a href={`mailto:${personalInfo.email}`}>Email</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
