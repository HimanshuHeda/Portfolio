"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  aboutText,
  services,
  certifications,
  badges,
} from "@/data/portfolio-data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05 },
  }),
};

export default function AboutSection() {
  return (
    <article className="about active" data-page="about">
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="about-text">
        {aboutText.map((p, i) => (
          <motion.p
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {p}
          </motion.p>
        ))}
      </section>

      {/* Services */}
      <section className="service">
        <h3 className="h3 service-title">What i&apos;m doing</h3>

        <ul className="service-list">
          {services.map((s, i) => (
            <motion.li
              key={s.title}
              className="service-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.1 }}
            >
              <div className="service-icon-box">
                <Image src={s.icon} alt={`${s.title} icon`} width={40} height={40} />
              </div>
              <div className="service-content-box">
                <h4 className="h4 service-item-title">{s.title}</h4>
                <p className="service-item-text">{s.text}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Certifications */}
      <section className="clients">
        <h3 className="h3 clients-title">Certifications</h3>
        <ul className="clients-list has-scrollbar">
          {certifications.map((c, i) => (
            <motion.li
              key={c.alt}
              className="clients-item"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Image src={c.src} alt={c.alt} width={150} height={80} />
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Badges */}
      <section className="clients">
        <h3 className="h3 clients-title">Badges</h3>
        <ul className="clients-list has-scrollbar">
          {badges.map((b, i) => (
            <motion.li
              key={b.alt}
              className="clients-item"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Image src={b.src} alt={b.alt} width={150} height={80} />
            </motion.li>
          ))}
        </ul>
      </section>
    </article>
  );
}
