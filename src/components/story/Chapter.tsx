import Link from "next/link";
import type { StoryChapter } from "@/data/story";
import ChapterArt from "./ChapterArt";

// One story chapter. Server-rendered so all copy is in the HTML in reading
// order; the 3D scene behind it is decoration only.
export default function Chapter({ chapter, children }: { chapter: StoryChapter; children?: React.ReactNode }) {
  const titleId = `${chapter.id}-title`;

  return (
    <section id={chapter.id} className="chapter" data-chapter={chapter.index} aria-labelledby={titleId}>
      <div className="chapter-text">
        <p className="kicker">{chapter.kicker}</p>
        <h2 id={titleId} className="chapter-title">{chapter.title}</h2>
        {chapter.paragraphs.map((p) => (
          <p key={p} className="chapter-p">{p}</p>
        ))}

        {chapter.facts && (
          <div className="term-block">
            <p className="term-cmd">
              <span className="term-prompt" aria-hidden="true">$</span> metrics --chapter {chapter.id}
            </p>
            <dl className="facts">
              {chapter.facts.map((f) => (
                <div key={f.label} className="fact">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {chapter.links && (
          <ul className="chapter-links">
            {chapter.links.map((l) => (
              <li key={l.href + l.label}>
                {l.external ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="story-link">
                    {l.label} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <Link href={l.href} className="story-link">
                    {l.label} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}

        {children}
      </div>

      <ChapterArt index={chapter.index} />
    </section>
  );
}
