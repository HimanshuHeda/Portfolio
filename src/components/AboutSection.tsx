import Image from "next/image";
import Hero from "./Hero";
import {
  aboutText,
  services,
  certifications,
  badges,
  type ProofImage,
} from "@/data/portfolio-data";

export default function AboutSection() {
  return (
    <article className="about">
      <Hero />

      <section className="about-text" aria-labelledby="about-title">
        <h2 id="about-title" className="h2 article-title">About me</h2>
        {aboutText.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      <section className="service">
        <h2 className="h3 service-title">What I build</h2>

        <ul className="service-list">
          {services.map((s) => (
            <li key={s.title} className="service-item">
              <div className="service-icon-box">
                <Image src={s.icon} alt="" width={40} height={40} />
              </div>
              <div className="service-content-box">
                <h3 className="h4 service-item-title">{s.title}</h3>
                <p className="service-item-text">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ProofStrip title="Certifications" items={certifications} />
      <ProofStrip title="Badges" items={badges} />
    </article>
  );
}

// Horizontal strip of certificate/badge images. An item links only when it
// has a verification URL; otherwise it is a plain image (never href="#").
function ProofStrip({ title, items }: { title: string; items: ProofImage[] }) {
  return (
    <section className="clients">
      <h2 className="h3 clients-title">{title}</h2>
      <ul className="clients-list has-scrollbar" tabIndex={0} aria-label={`${title} (scrolls sideways)`}>
        {items.map((c) => {
          const img = (
            <Image src={c.src} alt={c.alt} width={c.width} height={c.height} sizes="160px" />
          );
          return (
            <li key={c.src} className="clients-item">
              {c.href ? (
                <a href={c.href} target="_blank" rel="noopener noreferrer" title={`Verify: ${c.alt}`}>
                  {img}
                </a>
              ) : (
                img
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
