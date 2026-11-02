import Image from "next/image";
import Hero from "./Hero";
import {
  aboutText,
  services,
  certifications,
  badges,
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

      <section className="clients">
        <h2 className="h3 clients-title">Certifications</h2>
        <ul className="clients-list has-scrollbar">
          {certifications.map((c) => (
            <li key={c.alt} className="clients-item">
              <Image src={c.src} alt={c.alt} width={150} height={80} />
            </li>
          ))}
        </ul>
      </section>

      <section className="clients">
        <h2 className="h3 clients-title">Badges</h2>
        <ul className="clients-list has-scrollbar">
          {badges.map((b) => (
            <li key={b.alt} className="clients-item">
              <Image src={b.src} alt={b.alt} width={150} height={80} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
