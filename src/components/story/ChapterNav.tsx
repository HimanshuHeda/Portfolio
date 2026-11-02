"use client";

import { useEffect, useRef, useState } from "react";

// Chapter progress: plain #anchor links (work without JS, keyboard reachable).
// JS only marks the chapter currently in the middle of the viewport.
export default function ChapterNav({ items }: { items: { id: string; nav: string; index: number }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  // Narrow screens show the chapters as a horizontal strip: keep the active
  // chip in view (horizontal scroll of the strip only, never the page).
  const listRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>('[aria-current="step"]');
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: link.offsetLeft - 24, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav className="chapter-nav" aria-label="Chapters">
      <ol ref={listRef}>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={active === i.id ? "step" : undefined}>
              <span className="chapter-nav-index">{String(i.index).padStart(2, "0")}</span>
              <span className="chapter-nav-label">{i.nav}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
